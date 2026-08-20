# Modelo de dados proposto

Status: implementado em `supabase/schema.sql`; aplicação no ambiente Supabase ainda pendente.

## Princípios

- Supabase/Postgres é a fonte de verdade.
- `auth.users.id` é a identidade imutável do aluno.
- Dados pessoais pertencem a um único `user_id` e usam RLS.
- IDs de escrita são UUIDs gerados antes da requisição para permitir repetição segura.
- Eventos de utilização são imutáveis e idempotentes.
- Conteúdo usa IDs estáveis definidos pelo pipeline editorial.

## Entidades

### `profiles`

Um perfil por usuário do Supabase Auth.

| Campo | Tipo | Regra |
|---|---|---|
| `id` | `uuid` | PK e FK para `auth.users`, cascade delete |
| `name` | `text` | obrigatório, exibido na interface/ranking |
| `avatar` | `text` | opcional |
| `created_at` | `timestamptz` | padrão `now()` |
| `updated_at` | `timestamptz` | atualizado por trigger |

`xp`, `streak_current`, `streak_best` e `class_code` do schema atual tornam-se campos legados. XP passa a ser derivado de utilização; streak e níveis deixam de existir. Como existe apenas uma turma, `class_code` não participa da v1.

### `study_sessions`

Representa uma tentativa retomável.

| Campo | Tipo | Regra |
|---|---|---|
| `id` | `uuid` | PK, criado pelo cliente |
| `user_id` | `uuid` | FK para perfil, obrigatório |
| `subject_id` | `text` | ID estável da matéria |
| `content_id` | `text` | ID estável do conteúdo/revisão |
| `question_ids` | `text[]` | ordem sorteada e congelada |
| `current_index` | `integer` | mínimo zero |
| `status` | `text` | `active`, `review`, `completed` |
| `started_at` | `timestamptz` | obrigatório |
| `completed_at` | `timestamptz` | somente quando concluída |
| `updated_at` | `timestamptz` | resolução de versão |

Uma conta pode ter mais de uma tentativa histórica, mas no máximo uma sessão `active` por `user_id + content_id`.

### `session_answers`

| Campo | Tipo | Regra |
|---|---|---|
| `id` | `uuid` | PK, criado pelo cliente |
| `session_id` | `uuid` | FK para sessão, cascade delete |
| `user_id` | `uuid` | proprietário redundante para RLS simples |
| `question_id` | `text` | ID editorial estável |
| `answer` | `jsonb` | resposta normalizada por tipo |
| `is_correct` | `boolean` | resultado no momento da resposta |
| `answered_at` | `timestamptz` | horário do servidor quando possível |

Restrição única: `session_id + question_id`. Repetir a mesma escrita atualiza a resposta, mas não cria novo evento de utilização.

### `topic_progress`

Resumo materializado para telas, reconstruível a partir das sessões.

| Campo | Tipo | Regra |
|---|---|---|
| `user_id` | `uuid` | parte da PK |
| `subject_id` | `text` | parte da PK |
| `content_id` | `text` | parte da PK |
| `sessions_completed` | `integer` | padrão zero |
| `questions_answered` | `integer` | padrão zero |
| `last_studied_at` | `timestamptz` | nullable |
| `updated_at` | `timestamptz` | obrigatório |

PK composta: `user_id + content_id`. Não armazena estrelas ou percentual como incentivo.

### `homework`

| Campo | Tipo | Regra |
|---|---|---|
| `id` | `uuid` | PK, criado pelo cliente |
| `user_id` | `uuid` | proprietário |
| `description` | `text` | obrigatório, tamanho limitado |
| `pages` | `text` | opcional |
| `due_date` | `date` | obrigatório |
| `completed` | `boolean` | padrão falso |
| `completed_at` | `timestamptz` | nullable |
| `created_at` | `timestamptz` | obrigatório |
| `updated_at` | `timestamptz` | obrigatório |

### `usage_events`

Registro canônico para XP e ranking.

| Campo | Tipo | Regra |
|---|---|---|
| `id` | `uuid` | PK |
| `user_id` | `uuid` | proprietário |
| `event_type` | `text` | `question_answered` ou `session_completed` |
| `source_id` | `uuid` | ID da resposta ou sessão |
| `occurred_at` | `timestamptz` | definido no servidor |
| `study_date` | `date` | data em `America/Sao_Paulo` |

Restrição única: `user_id + event_type + source_id`. Eventos são inseridos por função SQL transacional, não diretamente pelo cliente.

### `school_events`

Calendário oficial somente leitura para alunos. Não possui `user_id` porque é igual para toda a turma. Escrita ocorre apenas pelo pipeline editorial com credencial de servidor.

## Ranking

Uma função segura agrega `usage_events` por aluno e dia:

- considera no máximo 60 eventos `question_answered` por dia;
- considera no máximo dois eventos `session_completed` por dia;
- não utiliza `is_correct`;
- retorna nome e total de utilização no período definido;
- não expõe e-mail, ID interno ou respostas.

O peso exato entre uma questão e uma sessão será definido em `TASK-033`. Até lá, a ordenação pode usar duas colunas explícitas em vez de uma pontuação artificial.

## RLS

Para tabelas com `user_id`:

- `select`: `auth.uid() = user_id`;
- `insert`: `auth.uid() = user_id`;
- `update/delete`: `auth.uid() = user_id`;
- validar também que respostas pertencem a uma sessão do mesmo usuário.

Exceções:

- `school_events`: leitura para usuários autenticados, sem escrita pelo cliente;
- ranking: acesso somente por função que retorna campos públicos mínimos;
- `usage_events`: leitura própria; inserção somente por função transacional validada.

## Índices mínimos

- `study_sessions(user_id, status, updated_at desc)`.
- `session_answers(session_id, answered_at)`.
- `topic_progress(user_id, last_studied_at desc)`.
- `homework(user_id, completed, due_date)`.
- `usage_events(user_id, study_date, event_type)`.
- `school_events(date)`.
