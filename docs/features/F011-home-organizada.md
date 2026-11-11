# F011 — Continuação organizada da tela inicial

## Requisitos relacionados

`REQ-036`–`REQ-037`, `REQ-045`–`REQ-048`, `REQ-073`, `REQ-078`

## Resultado para o aluno

Depois de ver as aulas do dia e o foco de provas do mês, o aluno encontra opções de estudo claras, com menos blocos grandes e sem repetir os alertas que já aparecem no destaque mensal.

## Atores

- Aluno autenticado que abre a tela inicial.

## Escopo

- Manter a saudação, o destaque de provas do mês e o cartão de aulas de hoje no início da página.
- Mostrar no máximo um cartão compacto para o próximo compromisso fora do conjunto de provas já destacado; o cartão abre a Agenda escolar.
- Organizar matérias com revisões publicadas em uma grade adaptável, com nome e progresso resumido; tocar em uma matéria abre seus materiais.
- Recolher matérias sem material publicado em **Matérias em preparação**.
- Preservar a ordem dos demais compromissos dentro da Agenda escolar.

## Regras e dados

- A home não duplica, em alertas genéricos, as provas já apresentadas no destaque mensal.
- O resumo de progresso conta apenas revisões publicadas com resumo e questões, seguindo `REQ-071`.
- A grade não altera progresso, fontes, datas, contas ou permissões.
- Os dados vêm do catálogo estático de matérias, do calendário oficial e do progresso do aluno já carregado pela aplicação.

## Permissões, sincronização e conexão

- Eventos oficiais são somente de leitura para o aluno.
- O progresso segue sincronizado por conta no Supabase; a mudança não cria armazenamento ou modo offline adicional.
- Sem conexão, mantém-se o comportamento existente de carregamento e erro dos repositórios.

## Critérios de aceite

- Saudação, destaque de avaliações do mês e calendário de aulas continuam no topo na ordem atual.
- Abaixo das aulas, compromissos fora do destaque aparecem em um único cartão que abre a Agenda.
- O mesmo exame não aparece duplicado no destaque mensal e no cartão de próximos compromissos.
- Matérias com revisão ficam em cartões compactos responsivos; ao tocar, abrem a matéria correta.
- Matérias em preparação não competem visualmente com as revisões disponíveis e continuam acessíveis por expansão.
- Os controles têm nomes acessíveis e funcionam em telas pequenas.

## Casos de borda

- Sem compromissos adicionais próximos, não mostrar cartão vazio nem espaço reservado.
- Sem revisões publicadas, não mostrar grade vazia; matérias em preparação permanecem recolhidas.
- Progresso indisponível não pode impedir a navegação até a matéria.

## Observabilidade e rollout

- Validar o carregamento da home com dados de calendário vazios, com eventos adicionais e com matérias em preparação.
- Confirmar a navegação em tela pequena e o acesso aos materiais de cada matéria.
- A alteração é somente de interface e pode ser publicada junto ao bundle do frontend.

## Dependências

- `F010` fornece o destaque mensal de provas.
- `F005` fornece eventos oficiais e navegação para a Agenda.
- `F004` fornece as revisões publicadas e seu progresso.

## Não objetivos

- Alterar a posição do destaque mensal ou do calendário de aulas.
- Mudar a Agenda, seu calendário oficial ou sua política de edição.
- Remover matérias sem conteúdo ou reorganizar as telas internas das matérias.

## Questões abertas

- Nenhuma.
