# F010 — Revisões para as provas de novembro

## Estado

Decisão confirmada pela mantenedora em 09/11/2026; implementação local concluída. A nomenclatura P2/P3 fica fora das chamadas de estudo de novembro.

## Requisitos relacionados

`REQ-014`, `REQ-022`, `REQ-045`–`REQ-048`, `REQ-067`–`REQ-071`, `REQ-073`, `REQ-076` (proposto)

## Resultado para o aluno

O aluno encontra, em cada matéria, a revisão da avaliação de novembro sem precisar entender rótulos conflitantes como P2 e P3. Cada material mostra matéria, data confirmada e conteúdos cobrados.

## Escopo proposto

- Adicionar na matéria um cartão chamado **Prova de novembro — [matéria]** e uma etiqueta **NOVEMBRO**.
- Manter o padrão atual de duas ações: **Ler material** e **Praticar 30 questões**.
- Reutilizar a matéria como ponto de entrada, sem criar uma nova área geral concorrente com Agenda e matérias.
- A Agenda continua mostrando a data oficial disponível. O cartão de revisão não afirma uma data que a escola ainda não confirmou.
- Manter cartões sem material completo em **Em preparação**; não iniciar prática sem banco aprovado.
- Preservar o histórico editorial dos materiais anteriores, mas não deixar conteúdo fora do escopo atual acessível como revisão de novembro.

## Regras e dados

- A classificação de novembro é uma forma de navegação do Patito; os números oficiais da avaliação podem permanecer nas fontes e nos registros editoriais, sem aparecer como rótulo nos cartões de estudo.
- Matéria, conteúdo e data vêm do calendário escolar versionado. Quando a data não estiver confirmada, a interface não a inventa.
- Cada cartão aponta para material, fonte e questões da avaliação daquela matéria.
- O progresso conta somente revisões publicadas e usa IDs novos quando o escopo do material muda, evitando misturar tentativas antigas com um banco novo.
- Conteúdo publicado continua igual para toda a turma e segue o pipeline de fonte, resumo, 60 questões, revisão e aprovação editorial.
- Dados de aluno e permissões não mudam. O conteúdo continua centralizado; progresso individual segue associado ao aluno no Supabase.
- A experiência exige conexão, como as demais revisões do Patito.

## Critérios de aceite

- A revisão de novembro aparece dentro da matéria correspondente e usa linguagem simples sem P2/P3 no cartão.
- Matemática apresenta o material aprovado dos capítulos 9, 10 e 11 e usa a data atualizada de 17/11.
- Português, Inglês, Geografia, Ciências e História têm materiais aprovados localmente, com escopo confirmado; as datas do calendário aparecem somente quando confirmadas. A publicação externa ainda não foi feita.
- Geografia tem material aprovado localmente para os capítulos 10 e 11 e exibe a data de 16/11 do cronograma escolar.
- Ciências e História têm materiais aprovados localmente para os capítulos 10–11 e 11–12, respectivamente.
- Cartões listam somente capítulos/unidades confirmados pela fonte escolar atual.
- A data só aparece como confirmada quando há fonte escolar para ela.
- Sem resumo ou banco aprovado, a avaliação fica em **Em preparação** e não inicia sessão.
- Conteúdo com escopo substituído não aparece como material de novembro.
- Materiais completos oferecem leitura, prática, retomada, conclusão e progresso sem misturar sessões antigas.
- A navegação funciona em tela pequena e os botões têm nomes acessíveis.

## Dependências e bloqueios atuais

- Matemática tem banco aprovado para capítulos 9, 10 e 11.
- Português (12/11) tem 60 questões revisadas e aprovadas localmente, baseadas nas páginas confirmadas na Edebê.
- Inglês (13/11) tem 60 questões revisadas e aprovadas localmente, baseadas nas unidades 7 e 8 do Richmond.
- Ciências (18/11) e História (19/11) têm fontes conferidas e materiais aprovados localmente.
- Ciências P2 e História P2 ainda precisam de fonte editorial dos capítulos indicados no calendário.
- Geografia para novembro está aprovada localmente para os capítulos 10 e 11 e usa 16/11, data mantida do cronograma escolar quando o comunicado de 30/10 atualizou o conteúdo. O banco anterior de capítulos 11 e 12 está fora da experiência ativa.
- Educação Física tem avaliação de novembro, mas o calendário descreve habilidades práticas acompanhadas em aula. Não criar um banco de questões sem orientação docente apropriada.

## Observabilidade e rollout

- Revisar a fonte, a lista de matérias e os estados de preparação antes de publicar.
- Publicar os materiais disponíveis sem marcar como pronta uma prova cujo conteúdo esteja incompleto.
- Após publicação, confirmar no site que cada botão abre a revisão da matéria certa e que a Agenda mantém a proveniência das datas.

## Não objetivos

- Renomear retroativamente provas P1 ou alterar o histórico de avaliações.
- Criar notas, resultados ou comparação de desempenho.
- Automatizar acesso a portais escolares ou livros sem permissão e mecanismo oficial.

## Questões abertas

1. Nenhuma pendência editorial de conteúdo ou data para Geografia.
