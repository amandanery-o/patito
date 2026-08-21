-- ============================================================
-- Patito — Schema Supabase
-- Colar no SQL Editor do Supabase e executar
-- ============================================================

grant usage on schema public to authenticated;

-- Tabela de perfis (estende auth.users)
create table if not exists public.profiles (
  id             uuid references auth.users on delete cascade primary key,
  name           text not null default 'Estudante' check (char_length(trim(name)) between 1 and 60),
  avatar         text default '🦆',
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Corte de versão: remove do ambiente existente as métricas do produto antigo.
drop function if exists public.current_user_class_code();
alter table public.profiles drop column if exists xp;
alter table public.profiles drop column if exists streak_current;
alter table public.profiles drop column if exists streak_best;
alter table public.profiles drop column if exists class_code;
alter table public.profiles add column if not exists updated_at timestamptz not null default now();

-- RLS
alter table public.profiles enable row level security;

drop policy if exists "profiles_select" on public.profiles;

-- O perfil completo é privado. O ranking usa uma função de campos mínimos.
create policy "profiles_select"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

-- Cada aluno só edita o próprio perfil
drop policy if exists "profiles_upsert" on public.profiles;
create policy "profiles_upsert"
  on public.profiles for all
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

grant select on public.profiles to authenticated;

-- O navegador pode editar somente os campos visuais do próprio perfil.
-- Pontuação e demais métricas serão atualizadas por funções transacionais.
revoke update on public.profiles from authenticated;
grant update (name, avatar) on public.profiles to authenticated;
revoke insert, delete on public.profiles from authenticated;

-- ── Trigger: criar perfil automaticamente no cadastro ──────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

revoke all on function public.handle_new_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function public.touch_updated_at() from public, anon, authenticated;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute procedure public.touch_updated_at();

-- ── Estado de estudo sincronizado ──────────────────────────
create table if not exists public.study_sessions (
  id uuid primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  subject_id text not null,
  content_id text not null,
  question_ids text[] not null check (cardinality(question_ids) > 0),
  current_index integer not null default 0 check (current_index >= 0),
  status text not null default 'active' check (status in ('active', 'review', 'completed')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  check ((status = 'completed') = (completed_at is not null))
);

drop index if exists public.study_sessions_one_active_content;
drop index if exists public.study_sessions_one_open_content;
create unique index study_sessions_one_open_content
  on public.study_sessions(user_id, content_id) where status in ('active', 'review');
create index if not exists study_sessions_user_status_updated
  on public.study_sessions(user_id, status, updated_at desc);

create table if not exists public.session_answers (
  id uuid primary key,
  session_id uuid not null references public.study_sessions(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  question_id text not null,
  answer jsonb not null,
  is_correct boolean not null,
  answered_at timestamptz not null default now(),
  unique (session_id, question_id)
);
create index if not exists session_answers_session_answered
  on public.session_answers(session_id, answered_at);

create table if not exists public.topic_progress (
  user_id uuid not null references public.profiles(id) on delete cascade,
  subject_id text not null,
  content_id text not null,
  sessions_completed integer not null default 0 check (sessions_completed >= 0),
  questions_answered integer not null default 0 check (questions_answered >= 0),
  last_studied_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, content_id)
);
create index if not exists topic_progress_user_studied
  on public.topic_progress(user_id, last_studied_at desc);

create table if not exists public.homework (
  id uuid primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  description text not null check (char_length(trim(description)) between 1 and 500),
  pages text check (pages is null or char_length(pages) <= 100),
  due_date date not null,
  completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (completed = (completed_at is not null))
);
create index if not exists homework_user_completed_due
  on public.homework(user_id, completed, due_date);

create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  event_type text not null check (event_type in ('question_answered', 'session_completed')),
  source_id uuid not null,
  occurred_at timestamptz not null default now(),
  study_date date not null default (timezone('America/Sao_Paulo', now()))::date,
  unique (user_id, event_type, source_id)
);
create index if not exists usage_events_user_date_type
  on public.usage_events(user_id, study_date, event_type);

create table if not exists public.school_events (
  id uuid primary key default gen_random_uuid(),
  external_id text not null unique,
  subject_id text not null,
  type text not null check (type in ('trabalho', 'prova', 'recuperacao', 'evento')),
  date date not null,
  end_date date,
  time time,
  weight numeric(4,2),
  content text check (content is null or char_length(content) <= 1000),
  notes text check (notes is null or char_length(notes) <= 500),
  source_file text not null,
  source_version text not null,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date is null or end_date >= date)
);
create index if not exists school_events_date on public.school_events(date);

alter table public.school_events enable row level security;
drop policy if exists authenticated_read_school_events on public.school_events;
create policy authenticated_read_school_events on public.school_events for select to authenticated using (true);
revoke insert, update, delete on public.school_events from authenticated;
grant select on public.school_events to authenticated;

-- Todas as tabelas pessoais são isoladas pelo usuário autenticado.
alter table public.study_sessions enable row level security;
alter table public.session_answers enable row level security;
alter table public.topic_progress enable row level security;
alter table public.homework enable row level security;
alter table public.usage_events enable row level security;

do $$
declare table_name text;
begin
  foreach table_name in array array['study_sessions', 'session_answers', 'topic_progress', 'homework']
  loop
    execute format('drop policy if exists own_rows on public.%I', table_name);
    execute format(
      'create policy own_rows on public.%I for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id)',
      table_name
    );
  end loop;
end $$;

-- Sessões só podem ser criadas pelo cliente; avanço, respostas, progresso e
-- eventos passam exclusivamente pelas funções transacionais abaixo.
revoke update, delete on public.study_sessions from authenticated;
revoke insert, update, delete on public.session_answers from authenticated;
revoke insert, update, delete on public.topic_progress from authenticated;
grant select, insert on public.study_sessions to authenticated;
grant select on public.session_answers to authenticated;
grant select on public.topic_progress to authenticated;
grant select, insert, update, delete on public.homework to authenticated;
grant select on public.usage_events to authenticated;

drop policy if exists own_usage_events on public.usage_events;
create policy own_usage_events on public.usage_events for select to authenticated
  using (auth.uid() = user_id);
revoke insert, update, delete on public.usage_events from authenticated;

-- Salva uma resposta e seu evento de uso na mesma transação.
drop function if exists public.save_session_answer(uuid, uuid, text, jsonb, boolean);
create or replace function public.save_session_answer(
  p_session_id uuid,
  p_answer_id uuid,
  p_question_id text,
  p_answer jsonb,
  p_is_correct boolean,
  p_expected_updated_at timestamptz default null
) returns public.study_sessions
language plpgsql security definer set search_path = public
as $$
declare
  current_session public.study_sessions;
  saved_answer_id uuid;
  answer_count integer;
begin
  select * into current_session from public.study_sessions
    where id = p_session_id and user_id = auth.uid() for update;
  if not found then raise exception 'session_not_found'; end if;
  if current_session.status <> 'active' then raise exception 'session_not_active'; end if;
  if p_expected_updated_at is not null and current_session.updated_at <> p_expected_updated_at then
    raise exception 'session_stale';
  end if;
  if not (p_question_id = any(current_session.question_ids)) then raise exception 'question_not_in_session'; end if;

  insert into public.session_answers(id, session_id, user_id, question_id, answer, is_correct)
    values (p_answer_id, p_session_id, auth.uid(), p_question_id, p_answer, p_is_correct)
  on conflict (session_id, question_id) do update
    set answer = excluded.answer, is_correct = excluded.is_correct, answered_at = now()
  returning id into saved_answer_id;

  insert into public.usage_events(user_id, event_type, source_id)
    values (auth.uid(), 'question_answered', saved_answer_id)
  on conflict (user_id, event_type, source_id) do nothing;

  select count(*) into answer_count from public.session_answers where session_id = p_session_id;
  update public.study_sessions set
    current_index = least(answer_count, cardinality(question_ids)),
    status = case when answer_count >= cardinality(question_ids) then 'review' else 'active' end,
    updated_at = now()
  where id = p_session_id returning * into current_session;
  return current_session;
end;
$$;

-- Finaliza uma sessão uma única vez e atualiza o resumo reconstruível.
create or replace function public.complete_study_session(p_session_id uuid)
returns public.study_sessions
language plpgsql security definer set search_path = public
as $$
declare completed_session public.study_sessions;
begin
  update public.study_sessions set status = 'completed', completed_at = now(), updated_at = now()
    where id = p_session_id and user_id = auth.uid() and status = 'review'
    returning * into completed_session;
  if not found then
    select * into completed_session from public.study_sessions
      where id = p_session_id and user_id = auth.uid() and status = 'completed';
    if not found then raise exception 'session_not_ready'; end if;
    return completed_session;
  end if;

  insert into public.topic_progress(user_id, subject_id, content_id, sessions_completed, questions_answered, last_studied_at)
    values (auth.uid(), completed_session.subject_id, completed_session.content_id, 1,
      cardinality(completed_session.question_ids), now())
  on conflict (user_id, content_id) do update set
    sessions_completed = topic_progress.sessions_completed + 1,
    questions_answered = topic_progress.questions_answered + excluded.questions_answered,
    last_studied_at = now(), updated_at = now();

  insert into public.usage_events(user_id, event_type, source_id)
    values (auth.uid(), 'session_completed', completed_session.id)
  on conflict (user_id, event_type, source_id) do nothing;
  return completed_session;
end;
$$;

revoke all on function public.save_session_answer(uuid, uuid, text, jsonb, boolean, timestamptz) from public, anon;
revoke all on function public.complete_study_session(uuid) from public, anon;
grant execute on function public.save_session_answer(uuid, uuid, text, jsonb, boolean, timestamptz) to authenticated;
grant execute on function public.complete_study_session(uuid) to authenticated;

-- Ranking por utilização: 1 ponto por questão e 10 por sessão, limitado a
-- 60 questões e duas sessões por aluno/dia. Acertos nunca entram no cálculo.
create or replace function public.get_usage_ranking()
returns table (
  "position" bigint,
  name text,
  avatar text,
  questions_count bigint,
  sessions_count bigint,
  activity_points bigint,
  is_current_user boolean
)
language sql stable security definer set search_path = public
as $$
  with daily as (
    select
      user_id,
      study_date,
      least(count(*) filter (where event_type = 'question_answered'), 60)::bigint as questions,
      least(count(*) filter (where event_type = 'session_completed'), 2)::bigint as sessions
    from public.usage_events
    group by user_id, study_date
  ), totals as (
    select user_id, sum(questions)::bigint as questions, sum(sessions)::bigint as sessions
    from daily group by user_id
  ), ranked as (
    select
      p.id,
      split_part(trim(p.name), ' ', 1) as display_name,
      p.avatar,
      coalesce(t.questions, 0)::bigint as questions,
      coalesce(t.sessions, 0)::bigint as sessions,
      (coalesce(t.questions, 0) + coalesce(t.sessions, 0) * 10)::bigint as points
    from public.profiles p
    join totals t on t.user_id = p.id
  )
  select
    row_number() over (order by points desc, sessions desc, questions desc, display_name),
    display_name,
    avatar,
    questions,
    sessions,
    points,
    id = auth.uid()
  from ranked
  order by points desc, sessions desc, questions desc, display_name
  limit 50;
$$;

revoke all on function public.get_usage_ranking() from public, anon;
grant execute on function public.get_usage_ranking() to authenticated;
