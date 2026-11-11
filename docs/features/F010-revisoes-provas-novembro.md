# F010 — Revisões para as provas de novembro

## Estado

Conteúdo de novembro publicado em produção em 11/11/2026. O destaque das avaliações na tela inicial está em implementação. A mantenedora confirmou que o foco deve ficar nas provas de novembro; avaliações já ocorridas ficam recolhidas nessa mesma seção e continuam acessíveis para revisão.

## Requisitos relacionados

`REQ-014`, `REQ-022`, `REQ-036`–`REQ-039`, `REQ-045`–`REQ-048`, `REQ-067`–`REQ-071`, `REQ-073`, `REQ-076`–`REQ-077`

## Resultado para o aluno

O aluno encontra a revisão de novembro dentro da matéria correspondente, sem precisar entender rótulos conflitantes como P2 e P3. A tela inicial destaca as provas do mês e permite abrir diretamente cada revisão publicada.

## Escopo

- Cada matéria apresenta um cartão **Prova de novembro — [matéria]**, com etiqueta **NOVEMBRO**, data confirmada e duas ações: **Ler material** e **Praticar 30 questões**.
- A tela inicial mostra uma seção em destaque **Provas de novembro**, ordenada por data, com acesso direto às revisões publicadas.
- Provas já realizadas aparecem recolhidas em **Já aconteceram**, somente dentro do grupo de novembro, e continuam acessíveis para revisão.
- A Agenda oficial continua mostrando eventos e datas da escola; ela não é substituída pelo destaque de estudos.
- Materiais sem banco aprovado permanecem em **Em preparação** e não iniciam prática.
- Não incluir Educação Física no banco de revisão: sua avaliação é prática e acompanhada em aula.

## Materiais publicados

| Matéria    | Data       | Conteúdo                              |
| ---------- | ---------- | ------------------------------------- |
| Português  | 12/11/2026 | Escopo registrado nas fontes da Edebê |
| Inglês     | 13/11/2026 | Unidades 7 e 8 do Richmond            |
| Geografia  | 16/11/2026 | Capítulos 10 e 11                     |
| Matemática | 17/11/2026 | Capítulos 9, 10 e 11                  |
| Ciências   | 18/11/2026 | Capítulos 10 e 11                     |
| História   | 19/11/2026 | Capítulos 11 e 12                     |

Cada material publicado tem resumo, fonte e 60 questões aprovadas. As datas foram verificadas na versão pública; Geografia permanece em 16/11 e Matemática foi atualizada para 17/11.

## Regras e dados

- “Novembro” é uma forma de navegação do Patito. Os números oficiais da avaliação podem permanecer nas fontes e registros editoriais, sem aparecer como rótulo nos cartões de estudo.
- Matéria, conteúdo e data vêm das fontes versionadas e do calendário escolar. Quando a data não está confirmada, a interface não a inventa.
- O destaque usa os materiais publicados da matéria como destino. Datas passadas não removem nem arquivam o conteúdo.
- O progresso conta somente revisões publicadas e usa IDs novos quando o escopo do material muda, evitando misturar tentativas antigas com um banco novo.
- Dados do aluno e permissões não mudam. O conteúdo é igual para toda a turma; progresso individual continua associado ao aluno no Supabase.
- A experiência exige conexão, como as demais revisões do Patito.

## Critérios de aceite

- A revisão de novembro aparece dentro da matéria correspondente e usa linguagem simples sem P2/P3 no cartão.
- A tela inicial destaca as provas de novembro em ordem de data e oferece acesso direto aos materiais publicados.
- Datas passadas deixam de aparecer como próximas e ficam recolhidas em **Já aconteceram**, com botão para rever o material.
- A Agenda mantém todos os compromissos oficiais e suas datas, sem confundir o calendário com o arquivo de estudos.
- Cada cartão usa apenas capítulos/unidades confirmados pelas fontes escolares atuais.
- Materiais publicados oferecem leitura, prática, retomada, conclusão e progresso sem misturar sessões antigas.
- A navegação funciona em tela pequena e os controles têm nomes acessíveis.

## Dependências e rollout

- Materiais e datas de todas as seis provas estão publicados na Vercel e ligados ao Supabase já existente.
- O destaque é uma mudança somente de interface; não requer alteração de schema ou de permissões.
- Validar em tela pequena, inclusive o acesso a materiais cuja data já passou.

## Não objetivos

- Renomear retroativamente provas P1 ou alterar o histórico de avaliações.
- Criar notas, resultados ou comparação de desempenho.
- Automatizar acesso a portais escolares ou livros sem permissão e mecanismo oficial.
- Remover materiais do histórico editorial ou do banco de conteúdo depois que uma prova passar.

## Decisão de escopo

- O foco atual são as provas de novembro. O grupo **Já aconteceram** abrange somente essas avaliações; não arquiva os outros eventos da Agenda.
