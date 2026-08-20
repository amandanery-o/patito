# Mapa de features

| Prioridade | Feature | Resultado esperado | Dependências |
|---|---|---|---|
| 0 | `F000` Engineering Harness | Mudanças verificáveis e rastreáveis | — |
| 1 | `F001` Conta do aluno | Aluno usa nome, e-mail e senha e vê somente seus dados | F000 |
| 1 | `F002` Sincronização de progresso | Nenhuma sessão ou resposta concluída é perdida | F001 |
| 1 | `F003` Sessão de estudos v2 | Sessões retomáveis, sem vidas e com revisão de erros | F002 |
| 1 | `F004` Conteúdo do segundo semestre | Resumos textuais e exercícios atualizados | F003, F009 |
| 1 | `F005` Calendário do segundo semestre | Datas e alertas atualizados centralmente | F009 |
| 1 | `F006` Temas | Aluno gerencia e conclui seus próprios temas | F001, F002 |
| 2 | `F007` XP e ranking por utilização | Incentivo sem comparar desempenho | F002, F003 |
| 2 | `F008` Relato seguro de problemas | Problemas chegam ao GitHub sem identificar crianças | F001 |
| 1 | `F009` Pipeline editorial | Conteúdo de Edebê/Richmond e PDFs é publicado com segurança | F000 |

As features de prioridade 1 formam a próxima versão utilizável. A prioridade 2 pode entrar depois que os fluxos centrais estiverem estáveis.
