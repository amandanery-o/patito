# Matriz de rastreabilidade

| Requisitos                          | Feature          | Tasks                 | Cobertura de aceite                            | Status                                                     |
| ----------------------------------- | ---------------- | --------------------- | ---------------------------------------------- | ---------------------------------------------------------- |
| REQ-001–004, 006, 008–009           | F001, F003, F004 | TASK-005–009, 016–024 | Unitários, PostgreSQL e E2E                    | Fluxos prontos; conteúdos restantes aguardam fontes        |
| REQ-011–012, 062–063                | F001             | TASK-005–009          | UI de Auth, schema e isolamento                | Implementado localmente; ativação remota pendente          |
| REQ-011–013, 027, 031, 044, 052–053 | F002             | TASK-010–015          | PostgreSQL real + hooks de sincronização       | Implementado e testado localmente                          |
| REQ-015–016, 023–030, 052–054       | F003             | TASK-016–020          | Unitários + jornada E2E completa               | Implementado e testado                                     |
| REQ-014–022, 045–048, 057           | F004, F009       | TASK-021–024, 042–051 | Validação editorial e 60 questões de Geografia | Parcial; demais matérias e adaptadores aguardam fontes     |
| REQ-064–065                         | F002, F004       | TASK-013, 021–024     | Corte versionado + teste de estado local       | Implementado                                               |
| REQ-066                             | F004             | TASK-021              | Busca de conteúdo antigo + E2E                 | Implementado                                               |
| REQ-036–039                         | F005, F009       | TASK-025–028, 047     | Importador, manifesto e testes de alerta/fuso  | Implementado; publicação remota pendente                   |
| REQ-040–044, 055–056                | F006             | TASK-029–032          | CRUD, persistência e isolamento                | Implementado e testado                                     |
| REQ-032–035, 050–051, 060           | F007             | TASK-033–037          | Função real executada em PostgreSQL            | Implementado e testado                                     |
| REQ-007, 019, 049, 058, 061         | F008             | TASK-038–041          | Sanitização, UI e falhas do GitHub             | Implementado; deploy/configuração da função ainda pendente |

`REQ-005` e `REQ-059` foram retirados; `REQ-010` foi substituído por `REQ-062`. Eles permanecem registrados para preservar o histórico.
