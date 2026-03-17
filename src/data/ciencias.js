export const subject = {
  id: 'ciencias',
  name: 'Ciências',
  icon: '🔬',
  color: 'cyan',
  topics: [
    {
      id: 'topico-1',
      title: 'Sistema Solar',
      questions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: 'Qual planeta fica mais próximo do Sol?',
          options: ['Terra', 'Marte', 'Mercúrio', 'Vênus'],
          correct: 2,
          explanation: 'Mercúrio é o planeta mais próximo do Sol. Por isso é muito quente durante o dia.'
        },
        {
          id: 'q2',
          type: 'true-false',
          question: 'A Terra é o único planeta do sistema solar.',
          correct: false,
          explanation: 'Não! O sistema solar tem 8 planetas: Mercúrio, Vênus, Terra, Marte, Júpiter, Saturno, Urano e Netuno.'
        },
        {
          id: 'q3',
          type: 'fill-blank',
          question: 'O planeta com os anéis famosos é ___.',
          options: ['Júpiter', 'Marte', 'Saturno', 'Urano'],
          correct: 2,
          explanation: 'Saturno é famoso por seus anéis brilhantes, feitos de gelo e poeira.'
        },
        {
          id: 'q4',
          type: 'multiple-choice',
          question: 'Quantos planetas tem o sistema solar?',
          options: ['7', '8', '9', '10'],
          correct: 1,
          explanation: 'O sistema solar tem 8 planetas. Plutão foi reclassificado como planeta anão em 2006.'
        },
        {
          id: 'q5',
          type: 'true-false',
          question: 'O Sol é uma estrela.',
          correct: true,
          explanation: 'Sim! O Sol é uma estrela — uma enorme bola de gás que produz luz e calor por fusão nuclear.'
        },
        {
          id: 'q6',
          type: 'multiple-choice',
          question: 'Qual é o maior planeta do sistema solar?',
          options: ['Saturno', 'Terra', 'Júpiter', 'Netuno'],
          correct: 2,
          explanation: 'Júpiter é o maior planeta do sistema solar. Ele é tão grande que caberiam mais de 1.000 Terras dentro dele!'
        },
        {
          id: 'q7',
          type: 'fill-blank',
          question: 'A Terra leva ___ para dar uma volta completa ao redor do Sol.',
          options: ['1 dia', '1 mês', '1 semana', '1 ano'],
          correct: 3,
          explanation: 'A Terra leva 365 dias (1 ano) para completar uma volta ao redor do Sol. Isso é chamado de translação.'
        },
        {
          id: 'q8',
          type: 'true-false',
          question: 'A Lua é um satélite natural da Terra.',
          correct: true,
          explanation: 'Sim! A Lua é o satélite natural da Terra. Ela orbita a Terra e causa as marés nos oceanos.'
        },
        {
          id: 'q9',
          type: 'multiple-choice',
          question: 'O que causa o dia e a noite na Terra?',
          options: ['A órbita ao redor do Sol', 'A rotação da Terra em torno de si mesma', 'As fases da Lua', 'As estações do ano'],
          correct: 1,
          explanation: 'O dia e a noite são causados pela rotação da Terra em torno de si mesma, levando 24 horas.'
        },
        {
          id: 'q10',
          type: 'flashcard',
          question: 'O que é um eclipse solar?',
          correct: 'Um eclipse solar acontece quando a Lua passa entre a Terra e o Sol, bloqueando parcialmente ou totalmente a luz do Sol.',
          explanation: 'O eclipse solar ocorre durante o dia quando a Lua cobre o Sol.'
        }
      ]
    },
    {
      id: 'topico-2',
      title: 'Seres Vivos e Meio Ambiente',
      questions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: 'O que as plantas produzem durante a fotossíntese?',
          options: ['Água e sal', 'Glicose e oxigênio', 'Dióxido de carbono', 'Nitrogênio'],
          correct: 1,
          explanation: 'As plantas produzem glicose (alimento) e oxigênio durante a fotossíntese, usando luz solar, água e CO₂.'
        },
        {
          id: 'q2',
          type: 'true-false',
          question: 'Todos os animais são vertebrados.',
          correct: false,
          explanation: 'Não! Existem animais vertebrados (com espinha dorsal) e invertebrados (sem espinha dorsal), como minhocas e insetos.'
        },
        {
          id: 'q3',
          type: 'fill-blank',
          question: 'Na cadeia alimentar, as plantas são chamadas de ___.',
          options: ['Consumidores', 'Decompositores', 'Produtores', 'Predadores'],
          correct: 2,
          explanation: 'As plantas são chamadas de produtores porque produzem seu próprio alimento através da fotossíntese.'
        },
        {
          id: 'q4',
          type: 'multiple-choice',
          question: 'Qual órgão do corpo humano é responsável por bombear o sangue?',
          options: ['Pulmão', 'Estômago', 'Coração', 'Fígado'],
          correct: 2,
          explanation: 'O coração é o órgão responsável por bombear o sangue para todo o corpo, fazendo parte do sistema circulatório.'
        },
        {
          id: 'q5',
          type: 'true-false',
          question: 'A água pode existir nos estados sólido, líquido e gasoso.',
          correct: true,
          explanation: 'Sim! A água pode ser gelo (sólido), água líquida e vapor d\'água (gasoso), dependendo da temperatura.'
        },
        {
          id: 'q6',
          type: 'multiple-choice',
          question: 'O que os pulmões fazem no corpo humano?',
          options: ['Digerem os alimentos', 'Fazem a troca gasosa (respiração)', 'Filtram o sangue', 'Produzem bile'],
          correct: 1,
          explanation: 'Os pulmões realizam a troca gasosa: absorvem oxigênio do ar e eliminam dióxido de carbono.'
        },
        {
          id: 'q7',
          type: 'fill-blank',
          question: 'O ciclo da água começa com a ___ da água dos oceanos pelo calor do Sol.',
          options: ['Precipitação', 'Infiltração', 'Evaporação', 'Condensação'],
          correct: 2,
          explanation: 'O ciclo da água começa com a evaporação: o Sol aquece a água e ela se transforma em vapor.'
        },
        {
          id: 'q8',
          type: 'true-false',
          question: 'Os fungos são vegetais.',
          correct: false,
          explanation: 'Não! Os fungos formam um reino separado (Reino Fungi). Eles não fazem fotossíntese e se alimentam de matéria orgânica.'
        },
        {
          id: 'q9',
          type: 'multiple-choice',
          question: 'Qual é a principal causa do aquecimento global?',
          options: [
            'Erupções vulcânicas',
            'Emissão de gases de efeito estufa pelo ser humano',
            'Tempestades no oceano',
            'Atividade solar'
          ],
          correct: 1,
          explanation: 'A principal causa do aquecimento global é a emissão de gases de efeito estufa, como CO₂, pela queima de combustíveis fósseis.'
        },
        {
          id: 'q10',
          type: 'flashcard',
          question: 'O que é a cadeia alimentar?',
          correct: 'A cadeia alimentar mostra a relação de alimentação entre os seres vivos: começa nos produtores (plantas), passa pelos consumidores (herbívoros, carnívoros) e termina nos decompositores (fungos e bactérias).',
          explanation: 'A cadeia alimentar representa o fluxo de energia entre os seres vivos de um ecossistema.'
        }
      ]
    }
  ]
}
