# F009 — Pipeline editorial

## Requisitos

`REQ-017`, `REQ-018`, `REQ-020`, `REQ-022`, `REQ-038`, `REQ-046`–`REQ-048`

## Resultado

A mantenedora transforma fontes autorizadas em conteúdo e calendário validados sem expor credenciais no sistema web.

## Fontes previstas

- Edebê.
- Richmond College.
- PDF de calendário fornecido pela professora.

## Regras

- Tokens ficam somente em ambiente seguro e nunca usam prefixo `VITE_`.
- Importação e publicação são processos editoriais fora da interface do aluno.
- Todo conteúdo passa por validação estrutural antes de ser publicado.
- A origem e a versão de cada lote são registradas.

## Critérios de aceite

- Um lote inválido não é publicado parcialmente.
- Cada conteúdo publicado mantém origem, data e versão.
- Nenhuma credencial aparece no bundle, logs públicos ou repositório.
- O pipeline pode ser repetido sem duplicar eventos ou conteúdos.

## Dependências externas

Endpoints, autenticação, limites e permissões de uso serão especificados quando as configurações forem fornecidas.
