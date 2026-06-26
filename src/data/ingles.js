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
    // Unit 3: Can/Can't + Animals & Activities
    // Unit 4: Present Continuous (is/are wearing) + Clothes & Adjectives
    {
      id: 'ing-p2',
      title: 'Revisão P2 — 26/06',
      questions: [
        // ── UNIT 3: CAN / CAN'T ─────────────────────────────────────────────
        { id: 'en036', type: 'multipleChoice', question: 'What can a MOOSE do?', options: ['Climb trees', 'Run fast', 'Sing', 'Swim'], correctIndex: 1, explanation: 'Um MOOSE (alce) consegue correr rápido (run fast). Não sobe em árvores como um esquilo!' },
        { id: 'en037', type: 'multipleChoice', question: 'What can FROGS do?', options: ['Run fast', 'Climb trees', 'Sing', 'Dance'], correctIndex: 2, explanation: 'FROGS (sapos/rãs) conseguem cantar (sing). Aquela coaxada é o canto deles!' },
        { id: 'en038', type: 'multipleChoice', question: 'What can RACCOONS do?', options: ['Sing', 'Dance', 'Swim', 'Run fast'], correctIndex: 2, explanation: 'RACCOONS (guaxinins) conseguem nadar (swim). São ótimos nadadores!' },
        { id: 'en039', type: 'multipleChoice', question: 'What can SALAMANDERS do?', options: ['Run fast', 'Climb trees', 'Sing', 'Dance'], correctIndex: 3, explanation: 'SALAMANDERS (salamandras) conseguem dançar (dance). Que animal curioso!' },
        { id: 'en040', type: 'multipleChoice', question: 'What can SQUIRRELS do?', options: ['Swim', 'Dance', 'Climb trees', 'Sing'], correctIndex: 2, explanation: 'SQUIRRELS (esquilos) conseguem subir em árvores (climb trees). É o que eles fazem o tempo todo!' },
        { id: 'en041', type: 'multipleChoice', question: 'What can WOLVES do?', options: ['Swim', 'Climb trees', 'Play', 'Dance'], correctIndex: 2, explanation: 'WOLVES (lobos) conseguem brincar (play). Os filhotes de lobo adoram brincar juntos!' },
        { id: 'en042', type: 'fillBlank', question: 'Hares ___ run fast. (Lebres conseguem correr rápido.)', options: ["can't", 'can', 'is', 'are'], correctIndex: 1, explanation: 'CAN significa consegue/pode. Lebres (hares) são famosas por correr muito rápido!' },
        { id: 'en043', type: 'fillBlank', question: 'Ferrets ___ sit on shoulders. (Furões conseguem sentar em ombros.)', options: ["can't", 'is', 'can', 'are'], correctIndex: 2, explanation: 'CAN indica habilidade. Furões (ferrets) são pequenos e conseguem ficar em cima dos ombros!' },
        { id: 'en044', type: 'fillBlank', question: 'Beavers ___ swim. (Castores conseguem nadar.)', options: ['is', "can't", 'are', 'can'], correctIndex: 3, explanation: 'CAN é o verbo modal de habilidade. Castores (beavers) são ótimos nadadores!' },
        { id: 'en045', type: 'fillBlank', question: "Crickets ___ dance. (Grilos não conseguem dançar.)", options: ['can', 'is', "can't", 'are'], correctIndex: 2, explanation: "CAN'T é a forma negativa de CAN. Grilos (crickets) fazem barulho, mas não dançam!" },
        { id: 'en046', type: 'trueFalse', question: "We use CAN'T to say an animal is NOT able to do something.", correct: true, explanation: "Certo! CAN'T (cannot) é a negação de CAN. Exemplo: Crickets can't dance — Grilos não conseguem dançar." },
        { id: 'en047', type: 'trueFalse', question: 'SQUIRRELS can swim.', correct: false, explanation: "Não! Squirrels (esquilos) can CLIMB TREES — sobem em árvores. Eles não nadam!" },
        { id: 'en048', type: 'trueFalse', question: 'WOLVES can play.', correct: true, explanation: "Certo! Wolves (lobos) can play — conseguem brincar. Os filhotes de lobo são muito brincalhões!" },
        // ── UNIT 3: ACTIVITIES VOCABULARY ───────────────────────────────────
        { id: 'en049', type: 'multipleChoice', question: 'Como se diz ANDAR DE BICICLETA em inglês?', options: ['Ride a horse', 'Play handball', 'Ride a bike', 'Roller-skate'], correctIndex: 2, explanation: 'RIDE A BIKE significa andar de bicicleta. RIDE é usado para montar/andar em veículos ou animais.' },
        { id: 'en050', type: 'multipleChoice', question: 'Como se diz ANDAR A CAVALO em inglês?', options: ['Ride a bike', 'Ride a horse', 'Play soccer', 'Draw'], correctIndex: 1, explanation: 'RIDE A HORSE significa andar a cavalo. O mesmo verbo RIDE é usado para bicicleta e cavalo!' },
        { id: 'en051', type: 'multipleChoice', question: 'Como se diz TOCAR BATERIA em inglês?', options: ['Play the guitar', 'Draw', 'Play handball', 'Play the drums'], correctIndex: 3, explanation: 'PLAY THE DRUMS significa tocar bateria. Para instrumentos musicais usamos PLAY THE + instrumento.' },
        { id: 'en052', type: 'multipleChoice', question: 'Como se diz TOCAR GUITARRA em inglês?', options: ['Play the drums', 'Play soccer', 'Play the guitar', 'Roller-skate'], correctIndex: 2, explanation: 'PLAY THE GUITAR significa tocar guitarra/violão. Lembre: THE antes do instrumento!' },
        { id: 'en053', type: 'multipleChoice', question: 'Como se diz JOGAR HANDEBOL em inglês?', options: ['Play soccer', 'Play handball', 'Roller-skate', 'Draw'], correctIndex: 1, explanation: 'PLAY HANDBALL significa jogar handebol. Para esportes com bola usamos PLAY (sem the).' },
        { id: 'en054', type: 'multipleChoice', question: 'Como se diz ANDAR DE PATINS em inglês?', options: ['Ride a bike', 'Draw', 'Ride a horse', 'Roller-skate'], correctIndex: 3, explanation: 'ROLLER-SKATE significa andar de patins. É uma só palavra (composta)!' },
        { id: 'en055', type: 'fillBlank', question: 'She can ___. (Ela consegue desenhar.)', options: ['play soccer', 'draw', 'ride a horse', 'roller-skate'], correctIndex: 1, explanation: 'DRAW significa desenhar. É um verbo simples, sem artigo nem complemento.' },
        { id: 'en056', type: 'trueFalse', question: 'We say PLAY THE SOCCER (with THE) when talking about the sport.', correct: false, explanation: "Não! Para esportes NÃO usamos THE. Dizemos PLAY SOCCER, PLAY HANDBALL. O THE só aparece com instrumentos: play THE guitar, play THE drums." },
        { id: 'en057', type: 'trueFalse', question: 'RIDE A BIKE and RIDE A HORSE use the same verb RIDE.', correct: true, explanation: 'Certo! RIDE é usado para montar/andar em bicicletas e cavalos. Ride a bike = andar de bicicleta. Ride a horse = andar a cavalo.' },
        // ── UNIT 4: PRESENT CONTINUOUS ──────────────────────────────────────
        { id: 'en058', type: 'fillBlank', question: '___ Robin and Daniel wearing T-shirts? — Yes, they are.', options: ['Is', 'Do', 'Are', 'Does'], correctIndex: 2, explanation: 'Para perguntas no Present Continuous com sujeito plural (Robin AND Daniel = they), usamos ARE. Are + sujeito plural + verbo-ing?' },
        { id: 'en059', type: 'fillBlank', question: 'Robin and Daniel are ___ T-shirts. (Estão usando camisetas.)', options: ['wear', 'wore', 'wears', 'wearing'], correctIndex: 3, explanation: 'No Present Continuous usamos verbo + ING. WEAR → WEARING. Indica o que está acontecendo agora.' },
        { id: 'en060', type: 'fillBlank', question: '___ René wearing a white cap? — Yes, she is.', options: ['Are', 'Do', 'Does', 'Is'], correctIndex: 3, explanation: 'Para perguntas no Present Continuous com sujeito singular (René = she), usamos IS. Is + sujeito singular + verbo-ing?' },
        { id: 'en061', type: 'fillBlank', question: 'What is Charles ___? — He is wearing brown shoes.', options: ['wear', 'wore', 'wearing', 'wears'], correctIndex: 2, explanation: 'Perguntas com WHAT IS + sujeito + VERBO-ING? Usamos WEARING porque é Present Continuous.' },
        { id: 'en062', type: 'multipleChoice', question: 'Noah is wearing a black jacket and black ___. (Sapatos)', options: ['shorts', 'socks', 'shoes', 'skirt'], correctIndex: 2, explanation: 'No exercício, Noah usa uma jaqueta preta e sapatos pretos (black shoes). SHOES = sapatos.' },
        { id: 'en063', type: 'multipleChoice', question: 'Brownie is wearing a gray jacket and a red ___. (Chapéu)', options: ['cap', 'hat', 'dress', 'skirt'], correctIndex: 1, explanation: 'Brownie usa uma jaqueta cinza e um chapéu vermelho (red hat). HAT = chapéu de abas largas.' },
        { id: 'en064', type: 'trueFalse', question: 'Joanna is wearing a blue skirt and white socks.', correct: false, explanation: "Não confunda! No exercício, a alternativa correta era a de NOAH (black jacket + black shoes) e BROWNIE (gray jacket + red hat). Joanna não estava com essa combinação." },
        { id: 'en065', type: 'trueFalse', question: "In Present Continuous we use IS for he/she/it and ARE for they/we/you.", correct: true, explanation: 'Certo! IS = he, she, it (singular). ARE = they, we, you (plural ou você). Exemplo: She IS wearing / They ARE wearing.' },
        // ── UNIT 4: CLOTHES & ADJECTIVES ────────────────────────────────────
        { id: 'en066', type: 'multipleChoice', question: 'The shoes are ___ (usadas, antigas). (Oposto de new)', options: ['big', 'short', 'long', 'old'], correctIndex: 3, explanation: 'OLD significa velho/antigo. O oposto é NEW (novo). Exemplo: old brown shoes = sapatos marrons velhos.' },
        { id: 'en067', type: 'multipleChoice', question: 'The hat is ___. (Grande — oposto de small)', options: ['old', 'short', 'big', 'new'], correctIndex: 2, explanation: 'BIG significa grande. O oposto é SMALL (pequeno). Exemplo: a big blue hat = um chapéu azul grande.' },
        { id: 'en068', type: 'multipleChoice', question: 'The dress is ___. (Comprida — oposto de short)', options: ['big', 'long', 'old', 'small'], correctIndex: 1, explanation: 'LONG significa comprido/longo. O oposto é SHORT (curto). Exemplo: a long red dress = um vestido vermelho comprido.' },
        { id: 'en069', type: 'fillBlank', question: 'The yellow dress is ___. (Curta — oposto de long)', options: ['long', 'big', 'old', 'short'], correctIndex: 3, explanation: 'SHORT significa curto/curta. O oposto é LONG (comprido). Exemplo: a short yellow dress = um vestido amarelo curto.' },
        { id: 'en070', type: 'fillBlank', question: 'The green hat is ___. (Pequeno — oposto de big)', options: ['big', 'old', 'small', 'long'], correctIndex: 2, explanation: 'SMALL significa pequeno. O oposto é BIG (grande). Exemplo: a small green hat = um chapéu verde pequeno.' },
        { id: 'en071', type: 'fillBlank', question: 'The black shoes are ___. (Novas — oposto de old)', options: ['small', 'long', 'old', 'new'], correctIndex: 3, explanation: 'NEW significa novo. O oposto é OLD (velho). Exemplo: new black shoes = sapatos pretos novos.' },
        { id: 'en072', type: 'trueFalse', question: 'BIG and SMALL are opposites.', correct: true, explanation: 'Certo! BIG (grande) e SMALL (pequeno) são opostos. Outros pares: long/short, old/new, hot/cold.' },
        { id: 'en073', type: 'trueFalse', question: 'A SKIRT and SHORTS are the same clothing item.', correct: false, explanation: 'Não! SKIRT é saia e SHORTS são bermudas/shorts. São roupas diferentes!' },
        // ── UNIT 4: THE PLAY (leitura) ───────────────────────────────────────
        { id: 'en074', type: 'multipleChoice', question: 'Where is the play? (Onde é a peça?)', options: ["It's at the Sports Club.", "It's at the Arts Centre.", "It's at the school.", "It's at the park."], correctIndex: 1, explanation: "A peça de teatro é no Arts Centre (Centro de Artes). Pergunta: WHERE IS THE PLAY? Resposta: It's at the Arts Centre." },
        { id: 'en075', type: 'multipleChoice', question: 'Where is the theater? (Onde fica o teatro?)', options: ['In Baker Street, London.', 'In Oxford Street, London.', 'In Lavender Hill, London.', 'In Bond Street, London.'], correctIndex: 2, explanation: "O teatro fica em Lavender Hill, Londres. Pergunta: WHERE IS THE THEATER? Resposta: It's in Lavender Hill, London." },
        { id: 'en076', type: 'multipleChoice', question: "What's the play about? (Sobre o que é a peça?)", options: ["It's about animals.", "It's about two seasons.", "It's about school.", "It's about sports."], correctIndex: 1, explanation: "A peça é sobre duas estações do ano (two seasons). Pergunta: WHAT'S THE PLAY ABOUT? Resposta: It's about two seasons." },
        { id: 'en077', type: 'multipleChoice', question: 'How much is the ticket? (Quanto custa o ingresso?)', options: ['£10', '£12', '£20', '£15'], correctIndex: 3, explanation: "O ingresso custa £15 (quinze libras). Pergunta: HOW MUCH IS THE TICKET? Resposta: It's £15." },
        { id: 'en078', type: 'multipleChoice', question: "When is the play on? (Quando é a peça?)", options: ['Monday to Wednesday', 'Saturday and Sunday only', 'From Friday to Sunday', 'Every day'], correctIndex: 2, explanation: "A peça acontece de sexta a domingo (From Friday to Sunday). Pergunta: WHEN IS THE PLAY ON?" },
        { id: 'en079', type: 'multipleChoice', question: 'A program of a play...', options: ['...explains why the play is good.', '...is very long with no pictures.', '...gives basic information about the play.', '...is only for adults.'], correctIndex: 2, explanation: 'O programa de uma peça de teatro dá informações básicas sobre o espetáculo (gives basic information about the play).' },
        { id: 'en080', type: 'trueFalse', question: "The play is about animals.", correct: false, explanation: "Não! A peça de teatro é sobre TWO SEASONS (duas estações). Não sobre animais!" },
        { id: 'en081', type: 'trueFalse', question: 'The ticket costs £15.', correct: true, explanation: 'Certo! O ingresso custa £15 (quinze libras esterlinas). HOW MUCH IS THE TICKET? — It\'s £15.' },
      ],
    },
  ],
}
