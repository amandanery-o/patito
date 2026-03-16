export const subject = {
  id: 'ensino-religioso',
  name: 'Ensino Religioso',
  icon: '✨',
  color: 'yellow',
  topics: [
    {
      id: 'topico-1',
      title: 'Valores e Diversidade',
      questions: [
        {
          id: 'q1',
          type: 'true-false',
          question: 'O respeito às diferenças é um valor importante em todas as culturas.',
          correct: true,
          explanation: 'Sim! Respeitar as diferenças é fundamental para uma sociedade justa e harmoniosa.'
        },
        {
          id: 'q2',
          type: 'multiple-choice',
          question: 'O que significa "solidariedade"?',
          options: [
            'Pensar só em si mesmo',
            'Ajudar e apoiar outras pessoas',
            'Competir com os outros',
            'Ignorar quem precisa de ajuda'
          ],
          correct: 1,
          explanation: 'Solidariedade é ajudar e apoiar outras pessoas, especialmente quem está em dificuldade.'
        },
        {
          id: 'q3',
          type: 'fill-blank',
          question: 'A capacidade de entender e sentir o que o outro sente é chamada de ___.',
          options: ['Inveja', 'Empatia', 'Indiferença', 'Arrogância'],
          correct: 1,
          explanation: 'Empatia é a capacidade de se colocar no lugar do outro e entender seus sentimentos.'
        },
        {
          id: 'q4',
          type: 'true-false',
          question: 'Todas as religiões têm o mesmo valor e merecem respeito.',
          correct: true,
          explanation: 'Sim! Em um país democrático, todas as religiões têm o mesmo direito de existir e merecem respeito.'
        },
        {
          id: 'q5',
          type: 'multiple-choice',
          question: 'O que é diversidade cultural?',
          options: [
            'Quando todos pensam igual',
            'A variedade de costumes, línguas, religiões e tradições dos povos',
            'A cultura de um único povo',
            'Apenas as danças e músicas'
          ],
          correct: 1,
          explanation: 'Diversidade cultural é a variedade de costumes, línguas, religiões, tradições e formas de vida dos diferentes povos.'
        },
        {
          id: 'q6',
          type: 'fill-blank',
          question: 'Tratar as pessoas com gentileza e consideração é chamado de ___.',
          options: ['Grosseria', 'Respeito', 'Intolerância', 'Preconceito'],
          correct: 1,
          explanation: 'Respeito é tratar as pessoas com gentileza, consideração e dignidade.'
        },
        {
          id: 'q7',
          type: 'true-false',
          question: 'É correto discriminar pessoas por causa de sua religião.',
          correct: false,
          explanation: 'Não! Discriminar pessoas por causa da religião é errado e vai contra os direitos humanos. Todas as pessoas merecem respeito.'
        },
        {
          id: 'q8',
          type: 'multiple-choice',
          question: 'O que podemos aprender com diferentes culturas e religiões?',
          options: [
            'Que algumas culturas são superiores às outras',
            'Que não há nada a aprender',
            'Valores, sabedorias e formas diferentes de ver o mundo',
            'Que devemos seguir apenas uma cultura'
          ],
          correct: 2,
          explanation: 'Diferentes culturas e religiões nos ensinam valores, sabedorias e formas diferentes de ver o mundo, enriquecendo nossas vidas.'
        },
        {
          id: 'q9',
          type: 'true-false',
          question: 'Cuidar da natureza é um valor presente em muitas tradições religiosas e culturais.',
          correct: true,
          explanation: 'Sim! Muitas religiões e tradições culturais ensinam a importância de cuidar da natureza como parte do respeito pela vida.'
        },
        {
          id: 'q10',
          type: 'flashcard',
          question: 'Por que é importante conhecer diferentes religiões e culturas?',
          correct: 'Conhecer diferentes religiões e culturas nos ajuda a entender o mundo, respeitar as pessoas, combater o preconceito e viver melhor em sociedade.',
          explanation: 'O conhecimento sobre diversidade cultural e religiosa promove a tolerância e o respeito mútuo.'
        }
      ]
    },
    {
      id: 'topico-2',
      title: 'Festas e Tradições Brasileiras',
      questions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: 'O Carnaval é uma festa que tem origem em qual tradição?',
          options: ['Indígena', 'Africana e Europeia', 'Asiática', 'Norte-americana'],
          correct: 1,
          explanation: 'O Carnaval brasileiro mistura tradições europeias (cristãs) e africanas, criando uma festa única e colorida.'
        },
        {
          id: 'q2',
          type: 'true-false',
          question: 'A festa Junina tem influência europeia e é celebrada principalmente no Nordeste.',
          correct: true,
          explanation: 'Sim! A Festa Junina tem origem europeia (Portugal) e foi adaptada no Brasil, sendo muito popular no Nordeste.'
        },
        {
          id: 'q3',
          type: 'fill-blank',
          question: 'O dia dos Finados é celebrado em ___ de novembro.',
          options: ['1', '2', '7', '15'],
          correct: 1,
          explanation: 'O Dia de Finados é celebrado em 2 de novembro. É uma data para lembrar as pessoas que já morreram.'
        },
        {
          id: 'q4',
          type: 'multiple-choice',
          question: 'Qual é a origem da capoeira brasileira?',
          options: ['Europeia', 'Indígena', 'Afro-brasileira', 'Asiática'],
          correct: 2,
          explanation: 'A capoeira é uma manifestação cultural afro-brasileira, criada pelos africanos escravizados no Brasil.'
        },
        {
          id: 'q5',
          type: 'true-false',
          question: 'O candomblé é uma religião afro-brasileira.',
          correct: true,
          explanation: 'Sim! O candomblé é uma religião afro-brasileira que homenageia divindades chamadas Orixás, trazida pelos africanos escravizados.'
        },
        {
          id: 'q6',
          type: 'fill-blank',
          question: 'As contribuições dos ___ para a cultura brasileira incluem línguas, alimentos e rituais espirituais.',
          options: ['Europeus', 'Povos Indígenas', 'Asiáticos', 'Norte-americanos'],
          correct: 1,
          explanation: 'Os povos indígenas contribuíram muito para a cultura brasileira: palavras, alimentos como a mandioca, e seus rituais espirituais.'
        },
        {
          id: 'q7',
          type: 'multiple-choice',
          question: 'O que é o Círio de Nazaré?',
          options: [
            'Uma dança popular',
            'Uma grande procissão religiosa no Pará',
            'Um festival de música',
            'Uma festa indígena'
          ],
          correct: 1,
          explanation: 'O Círio de Nazaré é uma grande procissão religiosa que acontece em Belém (PA), sendo uma das maiores do mundo.'
        },
        {
          id: 'q8',
          type: 'true-false',
          question: 'O Brasil é um país com apenas uma religião.',
          correct: false,
          explanation: 'Não! O Brasil é um país laico (sem religião oficial) com grande diversidade religiosa: catolicismo, protestantismo, candomblé, umbanda, espiritismo e outras.'
        },
        {
          id: 'q9',
          type: 'multiple-choice',
          question: 'O que são os Bumba Meu Boi?',
          options: [
            'Uma dança do Sul do Brasil',
            'Uma manifestação cultural do Nordeste com música e dança',
            'Uma religião afro-brasileira',
            'Uma festa europeia transplantada'
          ],
          correct: 1,
          explanation: 'O Bumba Meu Boi é uma manifestação cultural do Nordeste (especialmente Maranhão) com música, dança e teatro popular.'
        },
        {
          id: 'q10',
          type: 'flashcard',
          question: 'O que é patrimônio cultural imaterial?',
          correct: 'Patrimônio cultural imaterial são as tradições, celebrações, saberes, músicas, danças e festas que um povo transmite de geração em geração, como o frevo, a capoeira e o Círio de Nazaré.',
          explanation: 'O patrimônio imaterial não é algo físico, mas sim as práticas e tradições culturais de um povo.'
        }
      ]
    }
  ]
}
