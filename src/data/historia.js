export const subject = {
  id: 'historia',
  name: 'História',
  icon: '📜',
  color: 'amber',
  topics: [
    {
      id: 'topico-1',
      title: 'Brasil Colonial',
      questions: [
        {
          id: 'q1',
          type: 'fill-blank',
          question: 'O Brasil foi "descoberto" em ___ por Pedro Álvares Cabral.',
          options: ['1492', '1500', '1822', '1888'],
          correct: 1,
          explanation: 'Pedro Álvares Cabral chegou ao Brasil em 22 de abril de 1500.'
        },
        {
          id: 'q2',
          type: 'true-false',
          question: 'Os portugueses foram os primeiros europeus a chegar ao Brasil.',
          correct: true,
          explanation: 'Sim! Os portugueses chegaram ao Brasil em 1500, iniciando o processo de colonização.'
        },
        {
          id: 'q3',
          type: 'multiple-choice',
          question: 'Quem foram os primeiros habitantes do Brasil?',
          options: ['Portugueses', 'Africanos', 'Povos Indígenas', 'Holandeses'],
          correct: 2,
          explanation: 'Os povos indígenas habitavam o Brasil muito antes da chegada dos europeus. Eram diversas nações com culturas ricas.'
        },
        {
          id: 'q4',
          type: 'fill-blank',
          question: 'O sistema de trabalho forçado de africanos trazidos para o Brasil era chamado de ___.',
          options: ['Feudalismo', 'Escravidão', 'Capitalismo', 'Colonialismo'],
          correct: 1,
          explanation: 'A escravidão foi um sistema brutal em que africanos eram capturados e forçados a trabalhar sem receber nada.'
        },
        {
          id: 'q5',
          type: 'true-false',
          question: 'O pau-brasil foi o primeiro produto explorado pelos portugueses no Brasil.',
          correct: true,
          explanation: 'Sim! O pau-brasil (árvore que dava uma madeira avermelhada) foi muito explorado pelos portugueses no início da colonização.'
        },
        {
          id: 'q6',
          type: 'multiple-choice',
          question: 'Qual era o principal produto exportado pelo Brasil no período colonial?',
          options: ['Café', 'Soja', 'Açúcar', 'Borracha'],
          correct: 2,
          explanation: 'O açúcar foi o principal produto do período colonial brasileiro, produzido principalmente no Nordeste.'
        },
        {
          id: 'q7',
          type: 'true-false',
          question: 'A Inconfidência Mineira foi uma tentativa de independência do Brasil em 1789.',
          correct: true,
          explanation: 'Sim! A Inconfidência Mineira foi um movimento que tentou libertar Minas Gerais da coroa portuguesa. Tiradentes foi seu principal líder.'
        },
        {
          id: 'q8',
          type: 'multiple-choice',
          question: 'Quem foi Tiradentes?',
          options: [
            'Um rei português',
            'Um herói da Inconfidência Mineira',
            'O primeiro presidente do Brasil',
            'Um explorador espanhol'
          ],
          correct: 1,
          explanation: 'Tiradentes (Joaquim José da Silva Xavier) foi o principal líder da Inconfidência Mineira e é considerado herói nacional.'
        },
        {
          id: 'q9',
          type: 'fill-blank',
          question: 'Os africanos escravizados que fugiam e formavam comunidades livres criavam os chamados ___.',
          options: ['Aldeamentos', 'Quilombos', 'Engenhos', 'Sesmarias'],
          correct: 1,
          explanation: 'Os quilombos eram comunidades de pessoas negras que fugiam da escravidão. Quilombo dos Palmares é o mais famoso.'
        },
        {
          id: 'q10',
          type: 'flashcard',
          question: 'O que foi o Quilombo dos Palmares?',
          correct: 'O Quilombo dos Palmares foi a maior comunidade de pessoas negras que fugiram da escravidão no Brasil, localizado em Alagoas, liderado por Zumbi dos Palmares.',
          explanation: 'O Quilombo dos Palmares existiu por quase 100 anos, até ser destruído em 1694.'
        }
      ]
    },
    {
      id: 'topico-2',
      title: 'Independência e República',
      questions: [
        {
          id: 'q1',
          type: 'fill-blank',
          question: 'A Independência do Brasil foi proclamada em ___.',
          options: ['1500', '1822', '1888', '1889'],
          correct: 1,
          explanation: 'A Independência do Brasil foi proclamada em 7 de setembro de 1822, por Dom Pedro I.'
        },
        {
          id: 'q2',
          type: 'true-false',
          question: 'Dom Pedro I proclamou a Independência do Brasil no Rio de Janeiro.',
          correct: false,
          explanation: 'Não! A Independência foi proclamada às margens do Rio Ipiranga, em São Paulo, no episódio conhecido como "Grito do Ipiranga".'
        },
        {
          id: 'q3',
          type: 'multiple-choice',
          question: 'Quando foi abolida a escravidão no Brasil?',
          options: ['1822', '1850', '1888', '1889'],
          correct: 2,
          explanation: 'A escravidão foi abolida no Brasil em 13 de maio de 1888, com a assinatura da Lei Áurea pela Princesa Isabel.'
        },
        {
          id: 'q4',
          type: 'fill-blank',
          question: 'A Proclamação da República do Brasil ocorreu em ___.',
          options: ['1822', '1888', '1889', '1900'],
          correct: 2,
          explanation: 'A República foi proclamada em 15 de novembro de 1889, pelo Marechal Deodoro da Fonseca.'
        },
        {
          id: 'q5',
          type: 'true-false',
          question: 'A Princesa Isabel assinou a Lei Áurea que aboliu a escravidão no Brasil.',
          correct: true,
          explanation: 'Sim! A Princesa Isabel assinou a Lei Áurea em 13 de maio de 1888, libertando todos os escravizados do Brasil.'
        },
        {
          id: 'q6',
          type: 'multiple-choice',
          question: 'O que representa o "Grito do Ipiranga"?',
          options: [
            'A chegada dos portugueses ao Brasil',
            'A abolição da escravidão',
            'A proclamação da Independência do Brasil',
            'O início da República'
          ],
          correct: 2,
          explanation: 'O "Grito do Ipiranga" representa o momento em que Dom Pedro I proclamou a Independência do Brasil em 7 de setembro de 1822.'
        },
        {
          id: 'q7',
          type: 'true-false',
          question: 'O Brasil foi uma monarquia antes de se tornar uma república.',
          correct: true,
          explanation: 'Sim! Após a independência em 1822, o Brasil foi uma monarquia (Império) até 1889, quando virou república.'
        },
        {
          id: 'q8',
          type: 'multiple-choice',
          question: 'Quem foi o primeiro presidente do Brasil?',
          options: ['Dom Pedro II', 'Tiradentes', 'Deodoro da Fonseca', 'Getúlio Vargas'],
          correct: 2,
          explanation: 'Marechal Deodoro da Fonseca foi o primeiro presidente do Brasil após a Proclamação da República em 1889.'
        },
        {
          id: 'q9',
          type: 'fill-blank',
          question: 'O dia 7 de setembro é celebrado no Brasil como o dia da ___.',
          options: ['República', 'Independência', 'Abolição', 'Descoberta'],
          correct: 1,
          explanation: 'O 7 de setembro é o Dia da Independência do Brasil, feriado nacional celebrado com desfiles militares.'
        },
        {
          id: 'q10',
          type: 'flashcard',
          question: 'O que foi a Era Vargas?',
          correct: 'A Era Vargas foi o período em que Getúlio Vargas governou o Brasil (1930-1945 e 1950-1954). Ele criou leis trabalhistas, a CLT e o salário mínimo.',
          explanation: 'Getúlio Vargas é chamado de "Pai dos Pobres" por criar direitos trabalhistas no Brasil.'
        }
      ]
    }
  ]
}
