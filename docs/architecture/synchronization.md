# Estratégia de sincronização

Status: implementada e validada localmente; ativação e teste no projeto Supabase remoto ainda pendentes.

## Responsabilidades

- Supabase Auth mantém sessão e identidade.
- Postgres mantém o estado canônico.
- O React mantém apenas estado de interface e cache transitório.
- `localStorage` não é mais a fonte de verdade e não garante uso offline.

## Início de sessão de estudo

1. O cliente busca sessão `active` para `user_id + content_id`.
2. Se existir, carrega `question_ids`, `current_index` e respostas.
3. Se não existir, sorteia aproximadamente 30 IDs, gera UUID e insere a sessão.
4. A ordem é congelada em `question_ids` para permanecer igual em qualquer dispositivo.

## Registro de resposta

1. O cliente gera o ID da resposta e envia um upsert por `session_id + question_id`.
2. Uma função transacional valida propriedade da sessão.
3. A resposta é persistida.
4. A função cria `usage_event(question_answered)` com chave idempotente.
5. A sessão avança somente depois da confirmação.
6. Em falha, a interface mantém a questão aberta e oferece tentar novamente.

Isso usa confirmação remota antes de avançar porque não há requisito offline e evita mostrar progresso que ainda não foi salvo.

## Saída e retomada

- Voltar à página inicial não muda a sessão para concluída.
- A home mostra acesso para continuar a sessão ativa.
- Outro dispositivo recupera o mesmo estado do servidor.
- Se duas abas responderem simultaneamente, `updated_at` e a restrição por questão impedem duplicação; o cliente mais antigo deve recarregar o estado canônico.

## Conclusão e revisão

1. Ao responder a última questão, uma função muda a sessão para `review`.
2. A revisão busca respostas com `is_correct = false`.
3. O aluno revisa os erros sem gerar novos eventos de questão.
4. Ao finalizar a revisão, a função marca `completed`, atualiza `topic_progress` e cria um único evento `session_completed`.

## Idempotência

- Todos os registros mutáveis usam UUID estável gerado antes da requisição.
- Resposta: única por `session_id + question_id`.
- Conclusão: transição aceita somente de `active/review` para `completed`.
- Utilização: única por `user_id + event_type + source_id`.
- Repetir uma chamada após timeout deve retornar o estado já aplicado.

## Estado visual

O cliente diferencia:

- `loading`: buscando estado remoto;
- `saving`: escrita em andamento;
- `saved`: servidor confirmou;
- `error`: progresso não confirmado, com ação de repetir;
- `stale`: servidor possui versão mais recente e o cliente deve recarregar.

Não exibir “salvo” antes da confirmação do Supabase.

## Corte do estado atual

O estado atual mistura progresso do primeiro semestre, XP por acerto, streak e calendário local. Esses conceitos serão removidos ou redefinidos.

Decisão confirmada:

- não migrar XP, streak, estrelas ou sessões do primeiro semestre;
- não enviar o calendário seed/local para tabelas pessoais;
- iniciar sessões e ranking da nova versão com dados do segundo semestre;
- não migrar dados acadêmicos locais para o novo schema;
- preservar o estado anterior somente no histórico do Git, sem carregá-lo pela nova versão;
- marcar a versão de dados para impedir qualquer importação automática do formato antigo.

O novo semestre começa com estrutura vazia e será populado gradualmente pela mantenedora.

## Observabilidade

Registrar sem dados pessoais:

- tipo de operação;
- tabela/função;
- código de erro Supabase;
- versão do app;
- timestamp;
- ID técnico de correlação não publicado no GitHub.

Relatos enviados ao GitHub usam payload anonimizado definido em `F008`.

## Rollout

1. Criar migrações e RLS em ambiente de desenvolvimento.
2. Executar testes de isolamento com dois usuários.
3. Publicar cliente atrás de flag de versão.
4. Validar criação, resposta, saída, retomada e conclusão em dois dispositivos.
5. Ativar para a turma.
6. Manter rollback do cliente durante uma versão.
