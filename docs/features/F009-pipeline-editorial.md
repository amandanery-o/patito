# F009 — Pipeline editorial

## Requisitos

`REQ-017`, `REQ-018`, `REQ-020`, `REQ-022`, `REQ-038`, `REQ-046`–`REQ-048`

## Resultado

O pipeline transforma fontes autorizadas em conteúdo e calendário validados, usando agentes editoriais sem expor credenciais no sistema web. A mantenedora é acionada somente quando o revisor independente não consegue resolver uma dúvida com segurança.

## Fontes previstas

- Edebê.
- Richmond College.
- PDF de calendário fornecido pela professora.

## Regras

- Tokens ficam somente em ambiente seguro e nunca usam prefixo `VITE_`.
- Importação e publicação são processos editoriais fora da interface do aluno.
- Todo conteúdo passa por validação estrutural antes de ser publicado.
- A origem e a versão de cada lote são registradas.
- A IA produz rascunhos estruturados de resumo, questões, respostas, explicações e referências ao trecho de origem.
- O agente autor e o agente revisor exercem papéis separados.
- O agente autor nunca publica diretamente; validação automática e aprovação auditável do revisor independente são obrigatórias.
- O revisor corrige problemas sustentados pela fonte e escala somente dúvidas que não podem ser resolvidas com alta confiança.
- Um conteúdo aprovado contém ao menos 60 questões e cada sessão consome aproximadamente 30.
- Dados ou respostas dos alunos nunca são enviados ao modelo de geração.

## Critérios de aceite

- Um lote inválido não é publicado parcialmente.
- Cada conteúdo publicado mantém origem, data e versão.
- Nenhuma credencial aparece no bundle, logs públicos ou repositório.
- O pipeline pode ser repetido sem duplicar eventos ou conteúdos.
- Cada questão mantém referência à seção de origem, modelo usado e versão do prompt.

## Dependências externas

Endpoints, autenticação, limites e permissões de uso serão especificados quando as configurações forem fornecidas.
