# Revisão independente — Intensivão de Matemática

Revisão de 17/11/2026 por agente lógico independente `/root/review_science`. Conteúdo aprovado editorialmente; este revisor não publicou o banco.

## Fontes e artefatos

- Configuração: `matematica-intensivao-novembro`; capítulos 9, 10 e 11.
- Notas autorizadas: [frações](../sources/edebe-matematica-capitulo-9.md), [decimais](../sources/edebe-matematica-capitulo-10.md) e [tratamento da informação](../sources/edebe-matematica-capitulo-11.md).
- Rascunho final: `editorial/drafts/matematica-intensivao-novembro-2026.json`.
- Original preservado: `editorial/drafts/matematica-intensivao-novembro-2026.original-before-review.json`.
- Manifesto auditável: `editorial/reviews/matematica-intensivao-novembro-2026-review.json`.
- SHA-256 de JSON.stringify do rascunho final: `be3ca14c46da860d8ac8106f20e81fbf42ae2c076acae8619167717a2a078f9f`.
- Autoria: Codex in-session, sem uso de API externa de geração.

## Resultado

60 questões aprovadas, sendo 45 de múltipla escolha e 15 de associação. Dificuldade final: 20 fáceis, 39 intermediárias e 1 desafiadora. Leitura integral dos enunciados, alternativas, respostas, explicações, resumo, pontos essenciais e fontes em duas passagens. Todos os gabaritos estavam corretos.

Os cálculos de frações foram refeitos, preservando denominadores iguais nas operações. Foram recalculados decimais, centavos, trocos, totais, diferenças, escalas e pictogramas. Correspondências das 15 associações são exclusivas no contexto, inclusive com as colunas embaralhadas. Nenhuma questão depende de imagem externa. As situações numéricas são aplicações autossuficientes dos conceitos das fontes.

## Correções

- 004: enunciado simplificado para perguntar diretamente pelo numerador de 7/10, removendo menção desnecessária a uma coleção.
- 006: explicitadas as marcas da reta; a pergunta trata da segunda marca após zero, não de um ponto arbitrário.
- 018: substituído distrator com 0,004 por 0,44, mantendo a cobrança em décimos e centésimos.
- 024: substituído R$ 0,525 por R$ 0,55; alternativas monetárias agora usam duas casas decimais.
- Níveis reclassificados de intermediário para fácil por reconhecimento direto: 003, 017, 024, 025, 029, 031, 032, 033, 036, 044, 046, 047, 051, 056.
- Todos os IDs usam o prefixo `matematica-intensivao-novembro-2026-`.

## Validações

Execução com Node 22.23.4: `validateEditorialContent({...draft,status:'approved'})` e `validateReviewManifest(draft,manifest,{requireAllApproved:true})` passaram sem erros nem alertas. As contas foram adicionalmente verificadas por asserções aritméticas, usando centavos inteiros para valores monetários e tolerância apenas para representação computacional de decimais.

Comparação normalizada dos 60 enunciados contra `matematicaP2Content.json`: zero duplicações literais e zero IDs compartilhados. Também verificada unicidade interna dos enunciados e dos dois lados de todas as associações. As referências foram comparadas ao mapa de seções e páginas das três notas autorizadas, incluindo cálculo/comparação (178–181), troco (182–185) e análise (194–195).

## Decisões por questão

| ID                                      | Decisão  | Resposta ou relações conferidas                                                                                                           | Páginas |
| --------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| matematica-intensivao-novembro-2026-001 | approved | 4/9                                                                                                                                       | 148–153 |
| matematica-intensivao-novembro-2026-002 | approved | Porque os quatro pedaços precisariam ter tamanhos iguais.                                                                                 | 148–153 |
| matematica-intensivao-novembro-2026-003 | approved | O total de partes iguais do inteiro.                                                                                                      | 154–157 |
| matematica-intensivao-novembro-2026-004 | approved | 7                                                                                                                                         | 154–157 |
| matematica-intensivao-novembro-2026-005 | approved | Três oitavos.                                                                                                                             | 154–157 |
| matematica-intensivao-novembro-2026-006 | approved | 2/6                                                                                                                                       | 154–157 |
| matematica-intensivao-novembro-2026-007 | approved | A de 5/7.                                                                                                                                 | 158–161 |
| matematica-intensivao-novembro-2026-008 | approved | Joana.                                                                                                                                    | 158–161 |
| matematica-intensivao-novembro-2026-009 | approved | 2/9, 5/9, 8/9                                                                                                                             | 158–161 |
| matematica-intensivao-novembro-2026-010 | approved | 8/11                                                                                                                                      | 162–165 |
| matematica-intensivao-novembro-2026-011 | approved | 5/12                                                                                                                                      | 162–165 |
| matematica-intensivao-novembro-2026-012 | approved | Manter o denominador 7 e escrever 6/7.                                                                                                    | 162–165 |
| matematica-intensivao-novembro-2026-013 | approved | 6/10                                                                                                                                      | 162–165 |
| matematica-intensivao-novembro-2026-014 | approved | 8/8                                                                                                                                       | 148–153 |
| matematica-intensivao-novembro-2026-015 | approved | 4/10                                                                                                                                      | 162–165 |
| matematica-intensivao-novembro-2026-016 | approved | 0,7                                                                                                                                       | 168–169 |
| matematica-intensivao-novembro-2026-017 | approved | 36/100                                                                                                                                    | 168–169 |
| matematica-intensivao-novembro-2026-018 | approved | 0,4 e 0,40                                                                                                                                | 168–169 |
| matematica-intensivao-novembro-2026-019 | approved | 6                                                                                                                                         | 170–171 |
| matematica-intensivao-novembro-2026-020 | approved | 4 + 0,5 + 0,03                                                                                                                            | 170–171 |
| matematica-intensivao-novembro-2026-021 | approved | 2,5, pois equivale a 2,50.                                                                                                                | 178–181 |
| matematica-intensivao-novembro-2026-022 | approved | 4,65                                                                                                                                      | 178–181 |
| matematica-intensivao-novembro-2026-023 | approved | 5,45                                                                                                                                      | 178–181 |
| matematica-intensivao-novembro-2026-024 | approved | R$ 0,75                                                                                                                                   | 172–177 |
| matematica-intensivao-novembro-2026-025 | approved | Nove reais e seis centavos.                                                                                                               | 172–177 |
| matematica-intensivao-novembro-2026-026 | approved | R$ 6,25                                                                                                                                   | 182–185 |
| matematica-intensivao-novembro-2026-027 | approved | R$ 4,45                                                                                                                                   | 182–185 |
| matematica-intensivao-novembro-2026-028 | approved | R$ 2,65                                                                                                                                   | 182–185 |
| matematica-intensivao-novembro-2026-029 | approved | 1,3                                                                                                                                       | 170–171 |
| matematica-intensivao-novembro-2026-030 | approved | R$ 0,35                                                                                                                                   | 182–185 |
| matematica-intensivao-novembro-2026-031 | approved | Numérica.                                                                                                                                 | 188     |
| matematica-intensivao-novembro-2026-032 | approved | Qual é sua fruta preferida?                                                                                                               | 188     |
| matematica-intensivao-novembro-2026-033 | approved | Terça-feira.                                                                                                                              | 189     |
| matematica-intensivao-novembro-2026-034 | approved | 25                                                                                                                                        | 189     |
| matematica-intensivao-novembro-2026-035 | approved | 5                                                                                                                                         | 189     |
| matematica-intensivao-novembro-2026-036 | approved | 15                                                                                                                                        | 189     |
| matematica-intensivao-novembro-2026-037 | approved | 12                                                                                                                                        | 190–193 |
| matematica-intensivao-novembro-2026-038 | approved | 4                                                                                                                                         | 190–193 |
| matematica-intensivao-novembro-2026-039 | approved | 15                                                                                                                                        | 190–193 |
| matematica-intensivao-novembro-2026-040 | approved | Porque as legendas atribuem valores diferentes a cada estrela.                                                                            | 190–193 |
| matematica-intensivao-novembro-2026-041 | approved | 6, 10 e 4                                                                                                                                 | 190–193 |
| matematica-intensivao-novembro-2026-042 | approved | Aumentou 3 empréstimos em cada passagem.                                                                                                  | 194–195 |
| matematica-intensivao-novembro-2026-043 | approved | Houve 6 visitantes a menos na terça.                                                                                                      | 194–195 |
| matematica-intensivao-novembro-2026-044 | approved | O valor representado por cada desenho.                                                                                                    | 190–193 |
| matematica-intensivao-novembro-2026-045 | approved | Água recebeu 3 votos a mais que suco.                                                                                                     | 189     |
| matematica-intensivao-novembro-2026-046 | approved | 2/5 → Dois quintos; 4/7 → Quatro sétimos; 5/9 → Cinco nonos                                                                               | 154–157 |
| matematica-intensivao-novembro-2026-047 | approved | 3 de 10 partes → 3/10; 5 de 8 partes → 5/8; 2 de 6 partes → 2/6                                                                           | 148–153 |
| matematica-intensivao-novembro-2026-048 | approved | 1/6 + 3/6 → 4/6; 2/9 + 5/9 → 7/9; 3/10 + 2/10 → 5/10                                                                                      | 162–165 |
| matematica-intensivao-novembro-2026-049 | approved | 7/8 − 2/8 → 5/8; 9/10 − 6/10 → 3/10; 6/7 − 2/7 → 4/7                                                                                      | 162–165 |
| matematica-intensivao-novembro-2026-050 | approved | 3/8 ___ 5/8 → <; 7/9 ___ 2/9 → >; 4/6 ___ 4/6 → =                                                                                         | 158–161 |
| matematica-intensivao-novembro-2026-051 | approved | 9/10 → 0,9; 9/100 → 0,09; 47/100 → 0,47                                                                                                   | 168–169 |
| matematica-intensivao-novembro-2026-052 | approved | 2 + 0,6 + 0,04 → 2,64; 5 + 0,02 → 5,02; 7 + 0,3 → 7,3                                                                                     | 170–171 |
| matematica-intensivao-novembro-2026-053 | approved | 85 centavos → R$ 0,85; 150 centavos → R$ 1,50; 205 centavos → R$ 2,05                                                                     | 172–177 |
| matematica-intensivao-novembro-2026-054 | approved | 2,50 + 1,25 → 3,75; 6,40 − 2,10 → 4,30; 0,65 + 0,25 → 0,90                                                                                | 178–181 |
| matematica-intensivao-novembro-2026-055 | approved | Preço de R$ 6,70 → Troco de R$ 3,30; Preço de R$ 8,25 → Troco de R$ 1,75; Preço de R$ 4,90 → Troco de R$ 5,10                             | 182–185 |
| matematica-intensivao-novembro-2026-056 | approved | Turma A → 8 livros; Turma B → 13 livros; Turma C → 10 livros                                                                              | 189     |
| matematica-intensivao-novembro-2026-057 | approved | 2 quadrados → 6 votos; 4 quadrados → 12 votos; 5 quadrados → 15 votos                                                                     | 190–193 |
| matematica-intensivao-novembro-2026-058 | approved | Título → Apresenta o assunto; Escala → Mostra os valores usados para medir as barras; Legenda pictórica → Informa o valor de cada desenho | 190–193 |
| matematica-intensivao-novembro-2026-059 | approved | Total das três opções → 25 votos; Diferença entre bicicleta e caminhada → 4 votos; Caminhada e patins juntos → 13 votos                   | 189     |
| matematica-intensivao-novembro-2026-060 | approved | Passou de 5 para 9 → Aumento de 4; Passou de 12 para 7 → Diminuição de 5; Passou de 8 para 8 → Sem mudança                                | 194–195 |
