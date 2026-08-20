-- ============================================================
-- Patito — Schema Supabase
-- Colar no SQL Editor do Supabase e executar
-- ============================================================

-- Tabela de perfis (estende auth.users)
create table if not exists public.profiles (
  id             uuid references auth.users on delete cascade primary key,
  name           text not null default 'Estudante',
  avatar         text default '🦆',
  xp             integer default 0,
  streak_current integer default 0,
  streak_best    integer default 0,
  class_code     text default 'turma43',
  created_at     timestamptz default now()
);

-- RLS
alter table public.profiles enable row level security;

-- Evita recursão de RLS ao descobrir a turma do usuário atual.
create or replace function public.current_user_class_code()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select class_code from public.profiles where id = auth.uid();
$$;

revoke all on function public.current_user_class_code() from public;
grant execute on function public.current_user_class_code() to authenticated;

drop policy if exists "profiles_select" on public.profiles;

-- Cada aluno vê apenas os perfis da própria turma (para o ranking).
create policy "profiles_select"
  on public.profiles for select
  to authenticated
  using (id = auth.uid() or class_code = public.current_user_class_code());

-- Cada aluno só edita o próprio perfil
drop policy if exists "profiles_upsert" on public.profiles;
create policy "profiles_upsert"
  on public.profiles for all
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

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

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
