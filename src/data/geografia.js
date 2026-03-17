export const subject = {
  id: 'geografia',
  name: 'Geografia',
  icon: '🌍',
  color: 'orange',
  topics: [
    {
      id: 'topico-1',
      title: 'Regiões do Brasil',
      questions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: 'Quantas regiões tem o Brasil?',
          options: ['3', '4', '5', '6'],
          correct: 2,
          explanation: 'O Brasil é dividido em 5 regiões: Norte, Nordeste, Centro-Oeste, Sudeste e Sul.'
        },
        {
          id: 'q2',
          type: 'true-false',
          question: 'Brasília é a capital do Brasil e fica na região Centro-Oeste.',
          correct: true,
          explanation: 'Sim! Brasília é a capital federal do Brasil e está no Distrito Federal, na região Centro-Oeste.'
        },
        {
          id: 'q3',
          type: 'fill-blank',
          question: 'A cidade de São Paulo fica na região ___ do Brasil.',
          options: ['Norte', 'Nordeste', 'Sudeste', 'Sul'],
          correct: 2,
          explanation: 'São Paulo é a maior cidade do Brasil e fica na região Sudeste.'
        },
        {
          id: 'q4',
          type: 'multiple-choice',
          question: 'Qual região tem a maior parte da Floresta Amazônica?',
          options: ['Nordeste', 'Norte', 'Centro-Oeste', 'Sul'],
          correct: 1,
          explanation: 'A maior parte da Floresta Amazônica está na região Norte do Brasil.'
        },
        {
          id: 'q5',
          type: 'true-false',
          question: 'O Rio Grande do Sul fica na região Sul do Brasil.',
          correct: true,
          explanation: 'Sim! O Rio Grande do Sul, Santa Catarina e Paraná formam a região Sul do Brasil.'
        },
        {
          id: 'q6',
          type: 'multiple-choice',
          question: 'Qual é a capital do estado de Minas Gerais?',
          options: ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Vitória'],
          correct: 2,
          explanation: 'Belo Horizonte é a capital de Minas Gerais, estado da região Sudeste.'
        },
        {
          id: 'q7',
          type: 'fill-blank',
          question: 'O estado do Amazonas fica na região ___ do Brasil.',
          options: ['Sul', 'Nordeste', 'Norte', 'Centro-Oeste'],
          correct: 2,
          explanation: 'O Amazonas é o maior estado do Brasil e fica na região Norte.'
        },
        {
          id: 'q8',
          type: 'true-false',
          question: 'A região Nordeste do Brasil faz fronteira com o oceano Atlântico.',
          correct: true,
          explanation: 'Sim! O Nordeste tem uma extensa faixa litorânea banhada pelo oceano Atlântico.'
        },
        {
          id: 'q9',
          type: 'multiple-choice',
          question: 'Qual região é conhecida por ter o sertão e o clima semiárido?',
          options: ['Sul', 'Norte', 'Sudeste', 'Nordeste'],
          correct: 3,
          explanation: 'O Nordeste é conhecido pelo sertão, clima semiárido e fenômeno da seca.'
        },
        {
          id: 'q10',
          type: 'flashcard',
          question: 'Quais estados formam a região Sul do Brasil?',
          correct: 'A região Sul é formada por 3 estados: Paraná, Santa Catarina e Rio Grande do Sul.',
          explanation: 'A região Sul tem o clima mais frio do Brasil e influência europeia na cultura.'
        }
      ]
    },
    {
      id: 'topico-2',
      title: 'Biomas Brasileiros',
      questions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: 'Qual é o maior bioma do Brasil?',
          options: ['Cerrado', 'Caatinga', 'Mata Atlântica', 'Amazônia'],
          correct: 3,
          explanation: 'A Amazônia é o maior bioma do Brasil, ocupando mais de 49% do território nacional.'
        },
        {
          id: 'q2',
          type: 'true-false',
          question: 'A Caatinga é o único bioma exclusivamente brasileiro.',
          correct: true,
          explanation: 'Sim! A Caatinga existe apenas no Brasil, principalmente na região Nordeste.'
        },
        {
          id: 'q3',
          type: 'fill-blank',
          question: 'O bioma predominante no Centro-Oeste do Brasil é o ___.',
          options: ['Pampa', 'Pantanal', 'Cerrado', 'Amazônia'],
          correct: 2,
          explanation: 'O Cerrado é o bioma predominante no Centro-Oeste, conhecido como "savana brasileira".'
        },
        {
          id: 'q4',
          type: 'multiple-choice',
          question: 'Qual bioma é encontrado principalmente no sul do Brasil?',
          options: ['Cerrado', 'Pantanal', 'Pampa', 'Caatinga'],
          correct: 2,
          explanation: 'O Pampa (ou Campos Sulinos) é encontrado no sul do Brasil, principalmente no Rio Grande do Sul.'
        },
        {
          id: 'q5',
          type: 'true-false',
          question: 'O Pantanal é a maior planície alagável do mundo.',
          correct: true,
          explanation: 'Sim! O Pantanal é a maior planície alagável tropical do mundo, localizado no Centro-Oeste.'
        },
        {
          id: 'q6',
          type: 'multiple-choice',
          question: 'Qual bioma tem mais biodiversidade por km²?',
          options: ['Cerrado', 'Amazônia', 'Mata Atlântica', 'Caatinga'],
          correct: 2,
          explanation: 'A Mata Atlântica é um dos biomas com maior biodiversidade por km², apesar de restar apenas 12% da cobertura original.'
        },
        {
          id: 'q7',
          type: 'fill-blank',
          question: 'A vegetação da Caatinga é adaptada ao clima ___ do Nordeste.',
          options: ['úmido', 'frio', 'seco', 'tropical'],
          correct: 2,
          explanation: 'A Caatinga tem vegetação adaptada ao clima seco (semiárido) do Nordeste.'
        },
        {
          id: 'q8',
          type: 'true-false',
          question: 'O rio Amazonas é o mais longo do mundo.',
          correct: false,
          explanation: 'O rio Amazonas é o maior do mundo em volume de água, mas o Nilo é considerado o mais longo em extensão.'
        },
        {
          id: 'q9',
          type: 'multiple-choice',
          question: 'O que significa "biodiversidade"?',
          options: [
            'Apenas animais de uma região',
            'Variedade de seres vivos em um ambiente',
            'Plantas medicinais',
            'Rios e lagos'
          ],
          correct: 1,
          explanation: 'Biodiversidade é a variedade de seres vivos (animais, plantas, fungos, etc.) em um ambiente.'
        },
        {
          id: 'q10',
          type: 'flashcard',
          question: 'Por que é importante preservar os biomas brasileiros?',
          correct: 'Os biomas abrigam milhares de espécies de animais e plantas, regulam o clima, fornecem água e ar limpos, e garantem a vida no planeta.',
          explanation: 'Preservar os biomas é essencial para manter o equilíbrio ambiental e a biodiversidade.'
        }
      ]
    }
  ]
}
