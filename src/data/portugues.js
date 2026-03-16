export const subject = {
  id: 'portugues',
  name: 'Português',
  icon: '📝',
  color: 'blue',
  topics: [
    {
      id: 'topico-1',
      title: 'Tipos de Texto',
      questions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: 'Qual tipo de texto conta uma história com personagens?',
          options: ['Descritivo', 'Narrativo', 'Instrucional', 'Argumentativo'],
          correct: 1,
          explanation: 'O texto narrativo conta uma história com personagens, tempo e lugar.'
        },
        {
          id: 'q2',
          type: 'true-false',
          question: 'O texto instrucional ensina como fazer alguma coisa, como uma receita.',
          correct: true,
          explanation: 'Sim! O texto instrucional dá instruções passo a passo, como receitas e manuais.'
        },
        {
          id: 'q3',
          type: 'multiple-choice',
          question: 'Uma bula de remédio é um exemplo de texto:',
          options: ['Narrativo', 'Poético', 'Instrucional', 'Jornalístico'],
          correct: 2,
          explanation: 'A bula de remédio é um texto instrucional que informa como usar o medicamento.'
        },
        {
          id: 'q4',
          type: 'fill-blank',
          question: 'Um texto que descreve como é um lugar ou pessoa é chamado de texto ___.',
          options: ['Narrativo', 'Descritivo', 'Argumentativo', 'Poético'],
          correct: 1,
          explanation: 'O texto descritivo descreve características de pessoas, lugares ou objetos.'
        },
        {
          id: 'q5',
          type: 'true-false',
          question: 'Uma notícia de jornal é um exemplo de texto narrativo.',
          correct: false,
          explanation: 'Não! Uma notícia é um texto jornalístico/informativo. O texto narrativo conta histórias fictícias.'
        },
        {
          id: 'q6',
          type: 'multiple-choice',
          question: 'Em um texto narrativo, quem realiza as ações da história são os:',
          options: ['Narradores', 'Personagens', 'Leitores', 'Autores'],
          correct: 1,
          explanation: 'Os personagens são quem realiza as ações em um texto narrativo.'
        },
        {
          id: 'q7',
          type: 'flashcard',
          question: 'O que é um texto poético?',
          correct: 'É um texto que usa linguagem especial, rimas e ritmo para expressar sentimentos e emoções.',
          explanation: 'O texto poético usa recursos como rima, ritmo e metáfora.'
        },
        {
          id: 'q8',
          type: 'fill-blank',
          question: 'O texto que tenta convencer o leitor de algo é chamado de texto ___.',
          options: ['Descritivo', 'Narrativo', 'Argumentativo', 'Instrucional'],
          correct: 2,
          explanation: 'O texto argumentativo usa argumentos para persuadir o leitor.'
        },
        {
          id: 'q9',
          type: 'true-false',
          question: 'Um conto de fadas é um exemplo de texto narrativo.',
          correct: true,
          explanation: 'Sim! O conto de fadas é um texto narrativo que conta histórias com personagens fantásticos.'
        },
        {
          id: 'q10',
          type: 'multiple-choice',
          question: 'Qual destes é um exemplo de texto descritivo?',
          options: ['Uma receita de bolo', 'A descrição de um personagem', 'Uma notícia sobre futebol', 'Uma história de aventura'],
          correct: 1,
          explanation: 'A descrição de um personagem é um texto descritivo porque mostra suas características.'
        }
      ]
    },
    {
      id: 'topico-2',
      title: 'Substantivos',
      questions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: 'Qual das palavras abaixo é um substantivo coletivo?',
          options: ['Bonito', 'Correr', 'Cardume', 'Rapidamente'],
          correct: 2,
          explanation: 'Cardume é o coletivo de peixes. Substantivos coletivos nomeiam um conjunto de seres da mesma espécie.'
        },
        {
          id: 'q2',
          type: 'true-false',
          question: 'A palavra "Brasil" é um substantivo próprio.',
          correct: true,
          explanation: 'Sim! Substantivos próprios nomeiam seres específicos e são escritos com letra maiúscula.'
        },
        {
          id: 'q3',
          type: 'multiple-choice',
          question: 'Qual palavra é um substantivo comum?',
          options: ['Rio de Janeiro', 'Pedro', 'Cachorro', 'Amazônia'],
          correct: 2,
          explanation: 'Cachorro é um substantivo comum, pois nomeia qualquer animal da espécie canina.'
        },
        {
          id: 'q4',
          type: 'fill-blank',
          question: 'O coletivo de abelhas é ___.',
          options: ['Bando', 'Enxame', 'Matilha', 'Cardume'],
          correct: 1,
          explanation: 'Enxame é o coletivo de abelhas.'
        },
        {
          id: 'q5',
          type: 'true-false',
          question: 'Substantivos comuns sempre começam com letra maiúscula.',
          correct: false,
          explanation: 'Não! Apenas os substantivos próprios começam com letra maiúscula. Os comuns são escritos com minúscula.'
        },
        {
          id: 'q6',
          type: 'multiple-choice',
          question: 'Qual destes é um substantivo próprio?',
          options: ['cidade', 'menino', 'Brasília', 'escola'],
          correct: 2,
          explanation: 'Brasília é um substantivo próprio porque é o nome específico de uma cidade.'
        },
        {
          id: 'q7',
          type: 'flashcard',
          question: 'O que é um substantivo concreto?',
          correct: 'É o substantivo que nomeia seres que existem de forma real ou imaginária, como mesa, fada e cachorro.',
          explanation: 'Substantivos concretos têm existência real (mesa, cadeira) ou imaginária (fada, dragão).'
        },
        {
          id: 'q8',
          type: 'fill-blank',
          question: 'O substantivo que nomeia sentimentos, como alegria, é chamado de substantivo ___.',
          options: ['Comum', 'Próprio', 'Abstrato', 'Coletivo'],
          correct: 2,
          explanation: 'Substantivos abstratos nomeiam sentimentos, estados e qualidades que não têm existência física.'
        },
        {
          id: 'q9',
          type: 'true-false',
          question: 'A palavra "frota" é o coletivo de navios.',
          correct: true,
          explanation: 'Sim! Frota é o substantivo coletivo usado para designar um conjunto de navios.'
        },
        {
          id: 'q10',
          type: 'multiple-choice',
          question: 'Em qual alternativa há apenas substantivos?',
          options: ['correr, bonito, casa', 'livro, escola, amigo', 'feliz, grande, pequeno', 'cantar, dançar, pular'],
          correct: 1,
          explanation: 'Livro, escola e amigo são todos substantivos. As outras alternativas contêm verbos ou adjetivos.'
        }
      ]
    }
  ]
}
