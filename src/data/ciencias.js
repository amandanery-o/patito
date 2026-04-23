// Nautas - Ciências - 4º ano (courseware id=249)
// Colégio Salesiano Dom Bosco — Turma 43 — 2026
//
// Avaliações 1º semestre:
//   T1 (01/04 peso 2): Cap. 1 — Alimentação dos seres vivos
//   P1 (29/04 peso 2): Cap. 1 — Alimentação dos seres vivos; Cap. 2 — Fungos
//   P2 (17/06 peso 3): Cap. 5 — Vírus; Cap. 6 — Prevenção de doenças
//   Rec (08/07 peso 5): Caps. 1, 2, 5 e 6

export const ciencias = {
  id: 'ciencias',
  name: 'Ciências',
  icon: '🔬',
  color: 'bg-cyan-500',
  colorHex: '#06b6d4',
  topics: [
    {
      id: 'cie-cap-1',
      title: 'Cap. 1 — Alimentação dos seres vivos',
      questions: [],
    },
    {
      id: 'cie-cap-2',
      title: 'Cap. 2 — Fungos',
      questions: [
        // ── Conhecendo os fungos ─────────────────────────────────────────────
        {
          id: 'cie-cap2-q01',
          type: 'multipleChoice',
          question: 'Os fungos se alimentam de matéria orgânica e a transformam em quê?',
          options: [
            'Matéria inorgânica, como água, gases e minerais',
            'Fotossíntese e luz solar',
            'Proteínas e vitaminas',
            'Sementes e flores',
          ],
          correctIndex: 0,
          explanation: 'Os fungos são decompositores: transformam matéria orgânica em matéria inorgânica, como água, gases e minerais.',
        },
        {
          id: 'cie-cap2-q02',
          type: 'trueFalse',
          question: 'Os fungos são muito parecidos com as plantas.',
          correct: false,
          explanation: 'Muitos estudiosos afirmam que os fungos não são nada parecidos com as plantas — eles são seres decompositores.',
        },
        {
          id: 'cie-cap2-q03a',
          type: 'fillBlank',
          question: 'Os fungos são feitos de ___, que se espalham pelo substrato onde o fungo se desenvolve.',
          options: ['hifas', 'esporos', 'cogumelos', 'raízes'],
          correctIndex: 0,
          explanation: 'As hifas são as ramificações dos fungos responsáveis por absorver e distribuir nutrientes.',
        },
        {
          id: 'cie-cap2-q03b',
          type: 'fillBlank',
          question: 'As ___ absorvem nutrientes para todo o fungo.',
          options: ['hifas', 'esporos', 'cogumelos', 'raízes'],
          correctIndex: 0,
          explanation: 'As hifas são as estruturas responsáveis pela absorção de nutrientes no fungo.',
        },
        {
          id: 'cie-cap2-q14',
          type: 'multipleChoice',
          question: 'Em que tipo de ambiente os fungos costumam ser encontrados?',
          options: [
            'Ambientes com pouca luz e muita umidade',
            'Ambientes com muito sol e pouca água',
            'Apenas dentro do mar',
            'Somente em regiões frias e secas',
          ],
          correctIndex: 0,
          explanation: 'Os fungos costumam ser encontrados em ambientes com pouca luz e muita umidade, condições ideais para o seu crescimento.',
        },

        // ── Reprodução dos fungos ────────────────────────────────────────────
        {
          id: 'cie-cap2-q04',
          type: 'multipleChoice',
          question: 'Qual é o nome da reprodução em que partes do corpo do fungo produzem partículas minúsculas que se espalham no substrato?',
          options: [
            'Reprodução por esporos',
            'Fragmentação',
            'Germinação',
            'Fotossíntese',
          ],
          correctIndex: 0,
          explanation: 'A reprodução por esporos acontece quando partes do fungo produzem partículas minúsculas chamadas esporos, que germinam e formam novos indivíduos.',
        },
        {
          id: 'cie-cap2-q05',
          type: 'orderSteps',
          question: 'Coloque as etapas da formação de um cogumelo na ordem correta:',
          steps: [
            'Os esporos são liberados no ambiente',
            'Ocorre a germinação dos esporos e crescimento das hifas',
            'As hifas se ramificam e formam o micélio',
            'Na fase de reprodução, o cogumelo cresce',
            'O cogumelo se desenvolve e libera novos esporos',
          ],
          explanation: 'Primeiro os esporos são liberados, depois germinam, formam o micélio, o cogumelo cresce e, por fim, libera novos esporos.',
        },
        {
          id: 'cie-cap2-q15a',
          type: 'fillBlank',
          question: 'Quando as hifas se ramificam formando uma rede, esse conjunto recebe o nome de ___.',
          options: ['micélio', 'cogumelos', 'esporos', 'hifas'],
          correctIndex: 0,
          explanation: 'O micélio é a rede densa formada pelas hifas de um fungo.',
        },
        {
          id: 'cie-cap2-q15b',
          type: 'fillBlank',
          question: 'Os fungos que possuem ___ usam essa estrutura para liberar esporos.',
          options: ['micélio', 'cogumelos', 'esporos', 'hifas'],
          correctIndex: 1,
          explanation: 'Os cogumelos são as estruturas reprodutoras dos fungos, responsáveis por liberar esporos no ambiente.',
        },

        // ── Doenças causadas por fungos ──────────────────────────────────────
        {
          id: 'cie-cap2-q06',
          type: 'multipleChoice',
          question: 'O sapinho é uma micose que aparece na boca. Como ela se manifesta?',
          options: [
            'Manchas brancas na língua e outras regiões da boca',
            'Descamações esbranquiçadas na cabeça',
            'Unhas amareladas e quebradiças',
            'Manchas avermelhadas nos pés',
          ],
          correctIndex: 0,
          explanation: 'A candidíase (sapinho) se manifesta por manchas brancas na língua e em outras regiões da boca.',
        },
        {
          id: 'cie-cap2-q07',
          type: 'matchColumns',
          question: 'Relacione cada parte do corpo com o tipo de micose que pode ocorrer:',
          pairs: [
            { left: 'Cabeça',  right: 'Caspa e descamações esbranquiçadas' },
            { left: 'Unhas',   right: 'Unhas amareladas e quebradiças' },
            { left: 'Boca',    right: 'Manchas brancas na língua (sapinho)' },
            { left: 'Pés',     right: 'Frieiras entre os dedos' },
          ],
          explanation: 'Cada parte do corpo pode ser afetada por um tipo diferente de micose causada por fungos.',
        },
        {
          id: 'cie-cap2-q08',
          type: 'trueFalse',
          question: 'Compartilhar toalhas com outras pessoas ajuda a prevenir as micoses.',
          correct: false,
          explanation: 'Compartilhar toalhas facilita a transmissão de micoses — devemos evitar esse hábito.',
        },

        // ── Importância dos fungos ───────────────────────────────────────────
        {
          id: 'cie-cap2-q09',
          type: 'multipleChoice',
          question: 'A levedura Saccharomyces cerevisiae é usada para fazer o pão crescer. O que ela produz ao fermentar o amido?',
          options: [
            'Bolhas de gás carbônico',
            'Esporos coloridos',
            'Vitaminas e proteínas',
            'Água e sal',
          ],
          correctIndex: 0,
          explanation: 'Ao fermentar o amido, a levedura produz milhões de pequenas bolhas de gás carbônico, que fazem o pão crescer.',
        },
        {
          id: 'cie-cap2-q10a',
          type: 'fillBlank',
          question: 'A ___ é uma molécula produzida por um fungo do gênero Penicillium.',
          options: ['penicilina', 'bacterianas', 'virais', 'fúngicas'],
          correctIndex: 0,
          explanation: 'A penicilina foi descoberta por Alexander Fleming a partir do fungo Penicillium.',
        },
        {
          id: 'cie-cap2-q10b',
          type: 'fillBlank',
          question: 'A penicilina é usada para combater infecções ___.',
          options: ['penicilina', 'bacterianas', 'virais', 'fúngicas'],
          correctIndex: 1,
          explanation: 'A penicilina salva muitas vidas combatendo infecções bacterianas.',
        },
        {
          id: 'cie-cap2-q12',
          type: 'matchColumns',
          question: 'Relacione cada uso dos fungos com o produto ou resultado correspondente:',
          pairs: [
            { left: 'Levedura no pão',      right: 'Faz o pão crescer' },
            { left: 'Levedura na indústria', right: 'Produz etanol (combustível)' },
            { left: 'Penicillium',           right: 'Produz penicilina' },
            { left: 'Cogumelo shitake',      right: 'Usado na culinária' },
          ],
          explanation: 'Os fungos têm usos variados: na alimentação, na indústria de combustíveis e na produção de remédios.',
        },

        // ── Propagação e curiosidades ────────────────────────────────────────
        {
          id: 'cie-cap2-q11',
          type: 'multipleChoice',
          question: 'No experimento do livro, as crianças colocaram um frasco com alimento na geladeira e outro fora dela. O que elas queriam descobrir?',
          options: [
            'Se o frio ajuda a preservar os alimentos e impede o crescimento de fungos',
            'Se a luz do sol acelera a decomposição',
            'Se a água faz os fungos crescerem mais rápido',
            'Se os alimentos mudam de cor na geladeira',
          ],
          correctIndex: 0,
          explanation: 'O experimento comparava o alimento na geladeira com o de fora para verificar se o frio ajuda a preservar os alimentos impedindo o crescimento de fungos.',
        },
        {
          id: 'cie-cap2-q13',
          type: 'trueFalse',
          question: 'Existem fungos que brilham no escuro. Esse brilho pode atrair organismos que ajudam na reprodução do fungo.',
          correct: true,
          explanation: 'Existem mais de 100 tipos de fungos bioluminescentes. Acredita-se que sua luz atrai organismos que auxiliam na reprodução ou afastam predadores.',
        },
      ],
    },
    {
      id: 'cie-cap-5',
      title: 'Cap. 5 — Vírus',
      questions: [],
    },
    {
      id: 'cie-cap-6',
      title: 'Cap. 6 — Prevenção de doenças',
      questions: [],
    },
  ],
}
