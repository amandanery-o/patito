export const subject = {
  id: 'matematica',
  name: 'Matemática',
  icon: '🔢',
  color: 'green',
  topics: [
    {
      id: 'topico-1',
      title: 'Multiplicação e Divisão',
      questions: [
        {
          id: 'q1',
          type: 'fill-blank',
          question: 'O resultado de 7 × 8 é ___.',
          options: ['54', '56', '63', '48'],
          correct: 1,
          explanation: '7 × 8 = 56. Você pode calcular: 7 × 8 = 7 + 7 + 7 + 7 + 7 + 7 + 7 + 7 = 56.'
        },
        {
          id: 'q2',
          type: 'multiple-choice',
          question: 'Qual é o resultado de 9 × 6?',
          options: ['48', '54', '56', '63'],
          correct: 1,
          explanation: '9 × 6 = 54. A tabuada do 9: 9×6 = 54.'
        },
        {
          id: 'q3',
          type: 'true-false',
          question: 'O resultado de 8 × 8 é igual a 64.',
          correct: true,
          explanation: 'Sim! 8 × 8 = 64. A tabuada do 8 no 8 dá 64.'
        },
        {
          id: 'q4',
          type: 'multiple-choice',
          question: 'Quantos é 48 ÷ 6?',
          options: ['6', '7', '8', '9'],
          correct: 2,
          explanation: '48 ÷ 6 = 8, porque 6 × 8 = 48.'
        },
        {
          id: 'q5',
          type: 'fill-blank',
          question: 'Se tenho 36 balas para dividir em 4 crianças, cada uma recebe ___ balas.',
          options: ['8', '9', '7', '6'],
          correct: 1,
          explanation: '36 ÷ 4 = 9. Cada criança recebe 9 balas.'
        },
        {
          id: 'q6',
          type: 'true-false',
          question: '5 × 12 = 60',
          correct: true,
          explanation: 'Sim! 5 × 12 = 60. Ou seja, 5 doze vezes = 60.'
        },
        {
          id: 'q7',
          type: 'multiple-choice',
          question: 'Uma fazenda tem 7 currais com 9 vacas cada. Quantas vacas há no total?',
          options: ['56', '54', '63', '72'],
          correct: 2,
          explanation: '7 × 9 = 63. Multiplicamos o número de currais pelo número de vacas em cada um.'
        },
        {
          id: 'q8',
          type: 'fill-blank',
          question: '72 ÷ 9 = ___',
          options: ['7', '8', '9', '6'],
          correct: 1,
          explanation: '72 ÷ 9 = 8, porque 9 × 8 = 72.'
        },
        {
          id: 'q9',
          type: 'true-false',
          question: 'O resultado de 6 × 7 é maior que 40.',
          correct: true,
          explanation: 'Sim! 6 × 7 = 42, que é maior que 40.'
        },
        {
          id: 'q10',
          type: 'flashcard',
          question: 'O que é divisão com resto?',
          correct: 'É quando não conseguimos dividir igualmente e sobra um número menor que o divisor. Por exemplo: 17 ÷ 5 = 3 com resto 2.',
          explanation: 'Divisão com resto acontece quando o dividendo não é múltiplo do divisor.'
        }
      ]
    },
    {
      id: 'topico-2',
      title: 'Frações',
      questions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: 'Se uma pizza foi cortada em 4 pedaços iguais e você comeu 1 pedaço, que fração você comeu?',
          options: ['1/2', '1/3', '1/4', '2/4'],
          correct: 2,
          explanation: '1/4 = um quarto. Você comeu 1 de 4 partes iguais.'
        },
        {
          id: 'q2',
          type: 'true-false',
          question: '1/2 é maior que 1/4.',
          correct: true,
          explanation: 'Sim! Um meio (1/2) é maior que um quarto (1/4). Quanto maior o denominador, menor a fração.'
        },
        {
          id: 'q3',
          type: 'fill-blank',
          question: 'A metade de 20 é ___.',
          options: ['5', '8', '10', '15'],
          correct: 2,
          explanation: 'A metade de 20 = 20 ÷ 2 = 10.'
        },
        {
          id: 'q4',
          type: 'multiple-choice',
          question: 'Qual fração representa três quartos?',
          options: ['3/2', '1/4', '3/4', '4/3'],
          correct: 2,
          explanation: 'Três quartos é escrito como 3/4. O numerador (3) indica as partes e o denominador (4) o total.'
        },
        {
          id: 'q5',
          type: 'true-false',
          question: '2/4 é igual a 1/2.',
          correct: true,
          explanation: 'Sim! 2/4 = 1/2 são frações equivalentes. Dividindo numerador e denominador por 2: 2÷2 = 1 e 4÷2 = 2.'
        },
        {
          id: 'q6',
          type: 'multiple-choice',
          question: 'Qual é o terço de 12?',
          options: ['2', '3', '4', '6'],
          correct: 2,
          explanation: '1/3 de 12 = 12 ÷ 3 = 4.'
        },
        {
          id: 'q7',
          type: 'fill-blank',
          question: 'Uma barra de chocolate tem 8 quadradinhos. Se você comer 4, você comeu ___ da barra.',
          options: ['1/4', '1/3', '1/2', '3/4'],
          correct: 2,
          explanation: '4/8 = 1/2. Você comeu metade da barra de chocolate.'
        },
        {
          id: 'q8',
          type: 'true-false',
          question: '3/3 é igual a 1 inteiro.',
          correct: true,
          explanation: 'Sim! Quando o numerador e o denominador são iguais, a fração equivale a 1 inteiro.'
        },
        {
          id: 'q9',
          type: 'multiple-choice',
          question: 'Em uma turma de 20 alunos, 1/4 faltou. Quantos alunos faltaram?',
          options: ['4', '5', '8', '10'],
          correct: 1,
          explanation: '1/4 de 20 = 20 ÷ 4 = 5 alunos faltaram.'
        },
        {
          id: 'q10',
          type: 'flashcard',
          question: 'O que é o denominador de uma fração?',
          correct: 'O denominador é o número de baixo da fração. Ele indica em quantas partes iguais o todo foi dividido.',
          explanation: 'Em 3/4, o 4 é o denominador — significa que o todo foi dividido em 4 partes iguais.'
        }
      ]
    },
    {
      id: 'topico-3',
      title: 'Medidas e Geometria',
      questions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: 'Quantos centímetros tem 1 metro?',
          options: ['10', '100', '1000', '50'],
          correct: 1,
          explanation: '1 metro = 100 centímetros. O prefixo "centi" significa centésima parte.'
        },
        {
          id: 'q2',
          type: 'true-false',
          question: 'Um quilômetro é maior que um metro.',
          correct: true,
          explanation: 'Sim! 1 km = 1.000 metros. O quilômetro é muito maior que o metro.'
        },
        {
          id: 'q3',
          type: 'fill-blank',
          question: 'Uma figura com 3 lados é chamada de ___.',
          options: ['Quadrado', 'Triângulo', 'Pentágono', 'Hexágono'],
          correct: 1,
          explanation: 'O triângulo tem 3 lados e 3 ângulos. "Tri" significa três.'
        },
        {
          id: 'q4',
          type: 'multiple-choice',
          question: 'Qual é a figura geométrica com 4 lados iguais e 4 ângulos retos?',
          options: ['Retângulo', 'Losango', 'Quadrado', 'Trapézio'],
          correct: 2,
          explanation: 'O quadrado tem 4 lados iguais e 4 ângulos retos (90°).'
        },
        {
          id: 'q5',
          type: 'true-false',
          question: '1 quilograma = 1000 gramas.',
          correct: true,
          explanation: 'Sim! 1 kg = 1.000 g. O prefixo "kilo" significa mil.'
        },
        {
          id: 'q6',
          type: 'multiple-choice',
          question: 'Qual é a unidade de medida de capacidade?',
          options: ['Metro', 'Quilo', 'Litro', 'Segundo'],
          correct: 2,
          explanation: 'O litro (L) é a unidade de medida de capacidade. Usamos para medir líquidos.'
        },
        {
          id: 'q7',
          type: 'fill-blank',
          question: 'Um cubo tem ___ faces.',
          options: ['4', '6', '8', '12'],
          correct: 1,
          explanation: 'O cubo tem 6 faces, todas quadradas e iguais.'
        },
        {
          id: 'q8',
          type: 'true-false',
          question: 'O círculo é uma figura geométrica plana.',
          correct: true,
          explanation: 'Sim! O círculo é uma figura plana (2D) com todos os pontos à mesma distância do centro.'
        },
        {
          id: 'q9',
          type: 'multiple-choice',
          question: 'Quantos mililitros tem 1 litro?',
          options: ['10', '100', '500', '1000'],
          correct: 3,
          explanation: '1 litro = 1.000 mililitros. O prefixo "mili" significa milésima parte.'
        },
        {
          id: 'q10',
          type: 'flashcard',
          question: 'Qual é a diferença entre figuras planas e figuras espaciais?',
          correct: 'Figuras planas (2D) têm apenas comprimento e largura, como quadrado e círculo. Figuras espaciais (3D) têm comprimento, largura e altura, como cubo e esfera.',
          explanation: 'Planas = 2 dimensões. Espaciais = 3 dimensões.'
        }
      ]
    }
  ]
}
