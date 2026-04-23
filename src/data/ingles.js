// Nautas - Língua Inglesa - 4º ano (courseware id=254)
// Colégio Salesiano Dom Bosco — Turma 43 — 2026
//
// Avaliações 1º semestre:
//   P1 (24/04 peso 2): Prepositions of place; There is/There are;
//                       Communication media vocabulary; Seasons & months;
//                       Weather; Numbers 30–99; How old are you?

export const ingles = {
  id: 'ingles',
  name: 'Inglês',
  icon: '🇬🇧',
  color: 'bg-purple-500',
  colorHex: '#a855f7',
  topics: [
    // ── P1 ──────────────────────────────────────────────────────────────────
    {
      id: 'ing-p1',
      title: 'Revisão P1 — 24/04',
      questions: [
        { id: 'en001', type: 'fillBlank', question: 'The ball is ___ the box. (A bola está embaixo da caixa.)', options: ['under', 'on', 'in', 'next to'], correctIndex: 0, explanation: 'UNDER significa embaixo de. Quando algo está abaixo de outro objeto, usamos UNDER.' },
        { id: 'en002', type: 'fillBlank', question: 'The ball is ___ the box. (A bola está em cima da caixa.)', options: ['behind', 'on', 'in', 'next to'], correctIndex: 1, explanation: 'ON significa em cima de. Quando algo está sobre outro objeto, usamos ON.' },
        { id: 'en003', type: 'fillBlank', question: 'The ball is ___ the box. (A bola está dentro da caixa.)', options: ['on', 'next to', 'in', 'in front of'], correctIndex: 2, explanation: 'IN significa dentro de. Quando algo está no interior de outro objeto, usamos IN.' },
        { id: 'en004', type: 'fillBlank', question: 'The ball is ___ the box. (A bola está atrás da caixa.)', options: ['in front of', 'next to', 'between', 'behind'], correctIndex: 3, explanation: 'BEHIND significa atrás de. Quando algo está do lado de trás de outro objeto, usamos BEHIND.' },
        { id: 'en005', type: 'fillBlank', question: 'The ball is ___ the box. (A bola está na frente da caixa.)', options: ['in front of', 'behind', 'under', 'in'], correctIndex: 0, explanation: 'IN FRONT OF significa na frente de. Quando algo está à frente de outro objeto, usamos IN FRONT OF.' },
        { id: 'en006', type: 'fillBlank', question: 'The ball is ___ the box. (A bola está ao lado da caixa.)', options: ['in front of', 'next to', 'on', 'behind'], correctIndex: 1, explanation: 'NEXT TO significa ao lado de. Quando dois objetos estão lado a lado, usamos NEXT TO.' },
        { id: 'en007', type: 'fillBlank', question: 'The ball is ___ the two boxes. (A bola está entre as duas caixas.)', options: ['next to', 'under', 'between', 'on'], correctIndex: 2, explanation: 'BETWEEN significa entre. Quando algo está no meio de dois objetos, usamos BETWEEN.' },
        { id: 'en008', type: 'trueFalse', question: 'BEHIND means atrás de.', correct: true, explanation: 'Verdade! BEHIND significa atrás de. Exemplo: The cat is behind the chair — O gato está atrás da cadeira.' },
        { id: 'en009', type: 'trueFalse', question: 'IN FRONT OF and BEHIND mean the same thing.', correct: false, explanation: 'Não! IN FRONT OF significa na frente de e BEHIND significa atrás de. São preposições opostas!' },
        { id: 'en010', type: 'multipleChoice', question: 'Como se diz EM CIMA DE em inglês?', options: ['In', 'Under', 'Between', 'On'], correctIndex: 3, explanation: 'ON significa em cima de. Exemplo: The book is on the table — O livro está em cima da mesa.' },
        { id: 'en011', type: 'multipleChoice', question: 'Como se diz ENTRE em inglês?', options: ['Between', 'Next to', 'Behind', 'In front of'], correctIndex: 0, explanation: 'BETWEEN significa entre. Exemplo: The cat is between the boxes — O gato está entre as caixas.' },
        { id: 'en012', type: 'multipleChoice', question: 'There ___ a newspaper on the table. (Há um jornal em cima da mesa.)', options: ['are', 'is', 'am', 'be'], correctIndex: 1, explanation: 'Usamos THERE IS para uma coisa só (singular). Um jornal = there IS a newspaper.' },
        { id: 'en013', type: 'multipleChoice', question: 'There ___ two magazines on the chair. (Há duas revistas na cadeira.)', options: ['is', 'am', 'are', 'be'], correctIndex: 2, explanation: 'Usamos THERE ARE para mais de uma coisa (plural). Duas revistas = there ARE two magazines.' },
        { id: 'en014', type: 'trueFalse', question: 'We use THERE IS for one thing and THERE ARE for two or more things.', correct: true, explanation: 'Certo! THERE IS é para singular (uma coisa) e THERE ARE é para plural (duas ou mais coisas).' },
        { id: 'en015', type: 'fillBlank', question: 'There ___ a letter next to the computer.', options: ['is', 'are', 'am', 'be'], correctIndex: 0, explanation: 'Uma carta (a letter) é singular, então usamos THERE IS.' },
        { id: 'en016', type: 'multipleChoice', question: 'Como se diz JORNAL em inglês?', options: ['Magazine', 'Letter', 'Radio', 'Newspaper'], correctIndex: 3, explanation: 'NEWSPAPER significa jornal. Não confunda com MAGAZINE, que é revista.' },
        { id: 'en017', type: 'multipleChoice', question: 'Como se diz REVISTA em inglês?', options: ['Newspaper', 'Magazine', 'Letter', 'Smartphone'], correctIndex: 1, explanation: 'MAGAZINE significa revista. NEWSPAPER é jornal e LETTER é carta.' },
        { id: 'en018', type: 'trueFalse', question: 'LETTER means carta in Portuguese.', correct: true, explanation: 'Certo! LETTER significa carta. É um meio de comunicação escrito que mandamos para outras pessoas.' },
        { id: 'en019', type: 'trueFalse', question: 'A RADIO and a TV are the same thing.', correct: false, explanation: 'Não são a mesma coisa! No RADIO você ouve e na TV você vê e ouve. São meios de comunicação diferentes.' },
        { id: 'en020', type: 'multipleChoice', question: 'Which one do you READ? (Qual você LÊ?)', options: ['Radio', 'TV', 'Newspaper', 'Telephone'], correctIndex: 2, explanation: 'Você lê (read) o jornal. O rádio você ouve, a TV você assiste, e o telefone você usa para ligar.' },
        { id: 'en021', type: 'multipleChoice', question: 'Which months are in WINTER? (Hemisfério Norte — como no livro)', options: ['December, January, February', 'June, July, August', 'March, April, May', 'September, October, November'], correctIndex: 0, explanation: 'No hemisfério norte (como na China do livro), o inverno (winter) é em dezembro, janeiro e fevereiro.' },
        { id: 'en022', type: 'multipleChoice', question: 'Which months are in SUMMER? (Hemisfério Norte)', options: ['December, January, February', 'March, April, May', 'September, October, November', 'June, July, August'], correctIndex: 3, explanation: 'No hemisfério norte, o verão (summer) acontece em junho, julho e agosto.' },
        { id: 'en023', type: 'multipleChoice', question: 'Which months are in SPRING? (Hemisfério Norte)', options: ['June, July, August', 'March, April, May', 'September, October, November', 'December, January, February'], correctIndex: 1, explanation: 'No hemisfério norte, a primavera (spring) acontece em março, abril e maio.' },
        { id: 'en024', type: 'multipleChoice', question: 'Which months are in FALL? (Hemisfério Norte)', options: ['March, April, May', 'June, July, August', 'September, October, November', 'December, January, February'], correctIndex: 2, explanation: 'No hemisfério norte, o outono (fall) acontece em setembro, outubro e novembro.' },
        { id: 'en025', type: 'trueFalse', question: 'SUMMER is the hottest season.', correct: true, explanation: 'Certo! O verão (summer) é a estação mais quente do ano.' },
        { id: 'en026', type: 'trueFalse', question: 'SNOWY means it is very hot outside.', correct: false, explanation: 'Não! SNOWY significa nevando. Neve cai quando está muito frio, não quente.' },
        { id: 'en027', type: 'fillBlank', question: "What's the weather like? — It's ___ and cold. (Está nevando e frio.)", options: ['sunny', 'rainy', 'windy', 'snowy'], correctIndex: 3, explanation: 'SNOWY significa nevando. Faz sentido combinar snowy com cold (frio), como no inverno.' },
        { id: 'en028', type: 'fillBlank', question: "What's the weather like? — It's ___ and warm. (Está ensolarado e quente.)", options: ['sunny', 'cloudy', 'snowy', 'rainy'], correctIndex: 0, explanation: 'SUNNY significa ensolarado. Combinamos sunny com warm (quente) para descrever um dia de sol.' },
        { id: 'en029', type: 'multipleChoice', question: 'Como perguntamos sobre o tempo em inglês?', options: ["What's the weather like?", 'How old are you?', 'Where are you?', "What's your name?"], correctIndex: 0, explanation: "Para perguntar sobre o tempo dizemos WHAT'S THE WEATHER LIKE? E respondemos com It's sunny, rainy, cold, etc." },
        { id: 'en030', type: 'multipleChoice', question: 'How do you say 44 in English?', options: ['Fourteen', 'Forty-four', 'Forty', 'Four'], correctIndex: 1, explanation: '44 em inglês é FORTY-FOUR. Forty = 40 e four = 4. Juntamos os dois com hífen.' },
        { id: 'en031', type: 'multipleChoice', question: 'How do you say 32 in English?', options: ['Thirty-two', 'Twenty-three', 'Thirteen', 'Thirty'], correctIndex: 0, explanation: '32 em inglês é THIRTY-TWO. Thirty = 30 e two = 2.' },
        { id: 'en032', type: 'trueFalse', question: 'The number 58 in English is FIFTY-EIGHT.', correct: true, explanation: 'Certo! Fifty = 50 e eight = 8. Então 58 = FIFTY-EIGHT.' },
        { id: 'en033', type: 'fillBlank', question: "He's ___ years old. (Ele tem 49 anos.)", options: ['fourteen', 'ninety-four', 'forty-nine', 'forty'], correctIndex: 2, explanation: '49 em inglês é FORTY-NINE. Usamos HE\'S porque é um homem.' },
        { id: 'en034', type: 'multipleChoice', question: 'Como perguntamos a idade de alguém em inglês?', options: ["What's the weather like?", 'Where are you?', 'How are you?', 'How old are you?'], correctIndex: 3, explanation: 'HOW OLD ARE YOU? significa Quantos anos você tem? Respondemos com I\'m + número + years old.' },
        { id: 'en035', type: 'trueFalse', question: "We say SHE'S thirty years old to talk about a woman's age.", correct: true, explanation: "Certo! SHE'S é usado para mulheres. HE'S é usado para homens. Exemplo: She's thirty years old — Ela tem trinta anos." },
      ],
    },
    // ── P2 ──────────────────────────────────────────────────────────────────
    {
      id: 'ing-p2',
      title: 'Revisão P2',
      questions: [],
    },
  ],
}
