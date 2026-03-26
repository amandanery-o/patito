// Olimpíada Brasileira de Língua Inglesa (OBLI) — Nível 4º e 5º anos
// Questões adaptadas das edições 2024.1, 2024.2, 2025.1 e 2025.2
// Apenas questões 100% funcionais em texto (excluídas as que dependem de áudio/vídeo/imagem)

export const obli = {
  id: 'obli',
  name: 'Olimpíada Brasileira de Língua Inglesa (OBLI)',
  icon: '🏅',
  color: 'bg-blue-600',
  colorHex: '#2563eb',
  topics: [

    // ─── FASE 1: Vocabulary & Grammar ────────────────────────────────────────
    {
      id: 'obli-1',
      title: 'Vocabulary & Grammar',
      questions: [
        {
          id: 'obli-1-q1',
          type: 'multipleChoice',
          question:
            'Read the list of words:\nAngry — Happy — Joyful — Cheerful — Glad\n\nThree of them describe a positive feeling. Which word does NOT belong in this group?',
          options: ['Angry', 'Happy', 'Joyful', 'Cheerful', 'Glad'],
          correctIndex: 0,
          explanation:
            '"Angry" descreve uma emoção negativa (raiva), enquanto Happy, Joyful, Cheerful e Glad são todas palavras positivas. Por isso "Angry" é a que não pertence ao grupo.',
        },
        {
          id: 'obli-1-q2',
          type: 'multipleChoice',
          question:
            'My sister loves books. She ______ a new book every day after school. Her favorite books are about animals and magic.\n\nWhich verb form correctly fills the blank?',
          options: ['read', 'reading', 'reads', 'will read', 'readed'],
          correctIndex: 2,
          explanation:
            '"She reads" — para a 3ª pessoa do singular (he/she/it) no Simple Present, adicionamos -s ao verbo. "Readed" não existe — o passado de "read" é "read" (irregular).',
        },
        {
          id: 'obli-1-q3',
          type: 'multipleChoice',
          question:
            'Last weekend, my family and I goed to the beach. We played in the sand and swam in the ocean. The water was warm, and the sun was shining.\n\nIdentify the grammatical error in the text:',
          options: [
            'The word "Last" is misplaced.',
            'The word "beach" needs "the".',
            'The verb "goed" should be "went".',
            'The word "played" is wrong.',
            'The word "shining" is wrong.',
          ],
          correctIndex: 2,
          explanation:
            '"Go" é um verbo irregular. No passado simples, "go" vira "went" — não "goed". Formas como "goed" ou "goied" não existem em inglês.',
        },
        {
          id: 'obli-1-q4',
          type: 'multipleChoice',
          question:
            'Grandma placed a tiny glass bird on the shelf. Although it was little, its blue wings caught the morning light and sparkled like ice.\n\nWhich word from the options is a synonym for "tiny"?',
          options: ['huge', 'small', 'noisy', 'quick', 'smooth'],
          correctIndex: 1,
          explanation:
            '"Tiny" significa muito pequeno. "Small" é seu sinônimo mais próximo entre as opções. "Huge" é o antônimo (enorme). As demais (noisy, quick, smooth) têm significados completamente diferentes.',
        },
        {
          id: 'obli-1-q5',
          type: 'multipleChoice',
          question:
            'My cat, Leo, likes to hide ______ the table. He is very playful. When I call his name, he sometimes comes out, and sometimes he stays hidden.\n\nWhich preposition best fills the blank?',
          options: ['in', 'on', 'near', 'under', 'beside'],
          correctIndex: 3,
          explanation:
            '"Under" significa embaixo de. O gato se esconde embaixo da mesa — "under the table". As outras preposições indicam posições diferentes: "on" = em cima, "in" = dentro, "near" = perto, "beside" = ao lado.',
        },
        {
          id: 'obli-1-q6',
          type: 'multipleChoice',
          question:
            'I saw a big elephant at the zoo. It had a long trunk and big ears. A elephant is a very smart animal.\n\nIdentify the grammatical error related to the use of articles:',
          options: [
            'The word "big" is misplaced.',
            'The word "zoo" needs "the".',
            'The word "a" before "elephant" should be "an".',
            'The word "smart" is misspelled.',
            'The word "plants" should be singular.',
          ],
          correctIndex: 2,
          explanation:
            'Em inglês, usamos "an" (e não "a") antes de palavras que começam com vogal ou som de vogal. "Elephant" começa com "e" (vogal), então o correto é "an elephant".',
        },
        {
          id: 'obli-1-q7',
          type: 'multipleChoice',
          question:
            'Read the song excerpt by Taylor Swift:\n"I just wanna know you better, know you better now. I read you once..."\n\nThe verb "read" is irregular and written the same in the present and past. Choose the item in which the verb has the same spelling in present and past forms:',
          options: [
            'She broke the vase yesterday.',
            'Josh ate his lunch quickly last night.',
            'I put my car in the garage last Sunday.',
            'The singers wrote a song together last year.',
            'The students bought three books last weekend.',
          ],
          correctIndex: 2,
          explanation:
            '"Put" é um verbo irregular uniforme: seu passado também é "put" (igual ao presente). Assim como "read → read", "put → put". Os outros verbos mudam no passado: broke, ate, wrote, bought.',
        },
        {
          id: 'obli-1-q8',
          type: 'multipleChoice',
          question:
            'During the health check-up, nurse Olivia measured Luis and his sister Julia. Julia stood at 1.48 m, while Luis reached 1.52 m. Luis joked, "I\'m eating more spinach!"\n\nChoose the correct option to complete the sentence:\n"Luis is ___ Julia."',
          options: ['tall', 'more tall', 'tallest', 'tall than', 'taller than'],
          correctIndex: 4,
          explanation:
            'Para comparar duas pessoas em inglês, usamos o comparativo de superioridade: adjetivo + "-er than". "Tall" vira "taller than". "More tall" e "tallest" estão errados para esta construção.',
        },
        {
          id: 'obli-1-q9',
          type: 'multipleChoice',
          question:
            'Yesterday, I drinked a lot of water. It was a very hot day, and I played outside for many hours. After playing, I drinked two big glasses of water.\n\nIdentify the grammatical error in the text:',
          options: [
            'The word "lot" is wrong.',
            'The word "played" is wrong.',
            'The word "hours" is wrong.',
            'The word "drinked" should be "drank".',
            'The word "healthy" is misspelled.',
          ],
          correctIndex: 3,
          explanation:
            '"Drink" é um verbo irregular. No passado simples, "drink" vira "drank" — não "drinked". A forma correta é: "I drank a lot of water."',
        },
        {
          id: 'obli-1-q10',
          type: 'multipleChoice',
          question:
            'Lena and Sandra meet again after a while. Complete the dialog with the words in the box:\nYOU — VERY — AM — PLAY\n\nLENA: Hi, Sandra! I _____ very happy to have you here. How are _____ ?\nSANDRA: I\'m _____ happy too!\nLENA: I started to _____ soccer for the school team.\n\nChoose the correct sequence:',
          options: [
            'VERY — YOU — PLAY — AM',
            'AM — PLAY — YOU — VERY',
            'PLAY — YOU — VERY — AM',
            'AM — YOU — VERY — PLAY',
            'AM — YOU — PLAY — VERY',
          ],
          correctIndex: 3,
          explanation:
            'A sequência correta é AM — YOU — VERY — PLAY: "I AM very happy", "How are YOU?", "I\'m VERY happy too!", "I started to PLAY soccer". Cada espaço pede a palavra que faz sentido gramatical e semântico.',
        },
        {
          id: 'obli-1-q11',
          type: 'multipleChoice',
          question:
            'Look at the numbers below and select the item where the name of BOTH appears:\n100 — 1.000',
          options: [
            'One million / One billion',
            'One hundred / One million',
            'One thousand / One billion',
            'One thousand / One million',
            'One hundred / One thousand',
          ],
          correctIndex: 4,
          explanation:
            '100 em inglês é "one hundred" e 1.000 é "one thousand". As opções com "million" e "billion" representam números muito maiores (1.000.000 e 1.000.000.000).',
        },
        {
          id: 'obli-1-q12',
          type: 'multipleChoice',
          question:
            'Paula has an apartment.\n\nChoose the sentence that expresses the same meaning:',
          options: [
            'It is Paula\'s apartment.',
            'The apartment has Paula.',
            'Does she have an apartment?',
            'Paula doesn\'t have an apartment.',
            'Paula would like to have an apartment.',
          ],
          correctIndex: 0,
          explanation:
            '"Paula has an apartment" = "It is Paula\'s apartment" — ambas indicam posse. O apóstrofo + s (\'s) é uma forma de indicar pertencimento em inglês. As outras opções mudam o sentido: negativa, pergunta ou desejo futuro.',
        },
      ],
    },

    // ─── FASE 2: Reading Comprehension ───────────────────────────────────────
    {
      id: 'obli-2',
      title: 'Reading Comprehension',
      questions: [
        {
          id: 'obli-2-q1',
          type: 'multipleChoice',
          question:
            'Read the dialogue:\nAnna: Hey, Julia! I haven\'t seen you since graduation!\nJulia: What have you been up to lately?\nAnna: Well, I finally have time to read again. I\'m going through a bunch of mystery novels.\nJulia: I\'ve been learning to play the guitar. It\'s hard, but I love it.\n\nWhat can be inferred about Anna and Julia?',
          options: [
            'They have the same favorite hobby.',
            'Julia finds learning the guitar very easy.',
            'They graduated from high school together.',
            'Anna enjoys musical activities more than reading.',
            'They both enjoy spending time doing things they love.',
          ],
          correctIndex: 4,
          explanation:
            'Anna ama ler mistérios e Julia ama tocar violão — hobbies diferentes, mas ambas são apaixonadas pelo que fazem. A inferência correta é que as duas gostam de dedicar tempo às atividades que amam.',
        },
        {
          id: 'obli-2-q2',
          type: 'multipleChoice',
          question:
            'A teacher sent this email to a student:\n"Your assignment is due this Friday. Please make sure to submit it on time."\n\nWhich is the most polite and appropriate response from the student?',
          options: [
            'Thank you, I\'ll submit it on time.',
            'I\'ll do it when I feel ready.',
            'Got it. I\'ll think about it.',
            'Chill, I\'ll send it soon.',
            'Okay, I\'ll try my best.',
          ],
          correctIndex: 0,
          explanation:
            '"Thank you, I\'ll submit it on time" é a resposta mais adequada: demonstra gratidão, respeito e compromisso. As outras opções são informais demais, vagas ou desrespeitosas para uma comunicação com um professor.',
        },
        {
          id: 'obli-2-q3',
          type: 'multipleChoice',
          question:
            'What is the best synonym for the expression "passed away"?\n\n(Hint: "passed away" is a common and respectful expression used instead of a more direct word.)',
          options: ['died', 'retired', 'debuted', 'returned', 'disappeared'],
          correctIndex: 0,
          explanation:
            '"Passed away" é um eufemismo elegante para "died" (morreu). É usado para suavizar a mensagem em situações delicadas. As outras opções têm significados completamente diferentes.',
        },
        {
          id: 'obli-2-q4',
          type: 'multipleChoice',
          question:
            'Read the dialogue from The Wizard of Oz:\nHunk: I haven\'t got a brain… only straw.\nDorothy: How can you talk if you haven\'t got a brain?\nHunk: I don\'t know… But some people without brains do an awful lot of talking… don\'t they?\nDorothy: Yes, I guess you\'re right.\n\nMark True (T) or False (F):\n1. Hunk says he doesn\'t have a brain.\n2. Dorothy thinks Hunk is the smartest person she knows.\n3. Hunk believes people without brains still talk a lot.\n4. Dorothy disagrees with Hunk at the end.',
          options: ['T F T F', 'T F F T', 'F T F T', 'T T T F', 'F F F T'],
          correctIndex: 0,
          explanation:
            '1-V: Hunk diz "I haven\'t got a brain". 2-F: Dorothy nunca diz isso. 3-V: "some people without brains do an awful lot of talking". 4-F: Dorothy concorda ("I guess you\'re right"). Portanto: T F T F.',
        },
        {
          id: 'obli-2-q5',
          type: 'multipleChoice',
          question:
            'What is Minecraft?\nMinecraft is a game made up of blocks, creatures, and community. Minecraft has no set goal and can be played however you\'d like! This is why it\'s sometimes called a "sandbox game" — there are lots of things for you to do. If you like being creative, you can use the blocks to build things from your imagination.\n\nWhich statements are True (T) or False (F)?\n1. Minecraft has one main goal every player must follow.\n2. Players can use blocks to create things using their imagination.\n3. Exploring the world in Minecraft can include facing challenges.\n4. Minecraft is called "sandbox game" because it has lots of limitations.',
          options: ['T T T F', 'F T T F', 'F F T T', 'F T F T', 'T T F F'],
          correctIndex: 1,
          explanation:
            '1-F: O texto diz "no set goal". 2-V: "use blocks to build things from your imagination". 3-V: "explore the world and face daring challenges". 4-F: É chamado sandbox justamente por não ter limitações. Portanto: F T T F.',
        },
        {
          id: 'obli-2-q6',
          type: 'multipleChoice',
          question:
            'Exercise & fitness:\nExercising regularly is the most important thing you can do for your health. In the short term, exercise helps control appetite, boost mood, and improve sleep. In the long term, it reduces the risk of heart disease, depression, and many cancers. Aerobic exercise is marked by an increased heart rate — it burns fat, improves mood, reduces inflammation, and lowers blood sugar.\n\nMatch each benefit:\n1. Improve sleep → ?\n2. Lower blood sugar → ?\n3. Lower risk of depression → ?\n4. Faster breathing → ?\n\n(A=Aerobic, B=Long-term, C=Short-term, D=Result of cardio)',
          options: [
            '1–C, 2–D, 3–B, 4–A',
            '1–C, 2–A, 3–B, 4–D',
            '1–B, 2–A, 3–C, 4–D',
            '1–A, 2–B, 3–D, 4–C',
            '1–A, 2–D, 3–C, 4–B',
          ],
          correctIndex: 1,
          explanation:
            'Melhorar o sono é efeito de curto prazo (C). Reduzir açúcar no sangue é mencionado como benefício do exercício aeróbico (A). Menor risco de depressão é efeito de longo prazo (B). Respiração mais rápida é resultado do esforço cardiovascular (D).',
        },
        {
          id: 'obli-2-q7',
          type: 'multipleChoice',
          question:
            'Food Science:\nFood is one of the most essential resources on our planet. We need food science to ensure a sustainable future. Using technology and scientific principles from biology and chemistry, food scientists can make food easier to grow, safer, and healthier.\n\nComplete the sentence based on the text:\nFood science helps us _______.',
          options: [
            'make food fun and tasty',
            'eat at restaurants every day',
            'sell more food in supermarkets',
            'understand why people eat snacks',
            'grow food safely and help the planet',
          ],
          correctIndex: 4,
          explanation:
            'O texto destaca que a ciência dos alimentos torna os alimentos mais fáceis de cultivar, mais seguros e mais saudáveis — resumido em "grow food safely and help the planet". As outras opções não refletem o conteúdo do texto.',
        },
        {
          id: 'obli-2-q8',
          type: 'multipleChoice',
          question:
            '"Duolingo is a fun, accessible tool for language learning, but it has its limitations. For beginners, it\'s a great way to maintain daily contact with a language. However, if your goal is to become fluent, you\'ll need to pair Duolingo with other resources. I recommend using a combination of books, apps like LingQ, and real-world practice."\n\nWhich title is most appropriate for this text?',
          options: [
            'The History of Language Learning',
            'How to Learn Any Language Without Practice',
            'Using Duolingo and Other Tools to Learn a Language',
            'Why Duolingo Is the Best Language App in the World',
            'Language Is Hard: Stop Trying to Learn English at All',
          ],
          correctIndex: 2,
          explanation:
            'O texto analisa o Duolingo como uma ferramenta útil mas limitada, recomendando combiná-lo com outros recursos. "Using Duolingo and Other Tools to Learn a Language" resume perfeitamente essa ideia central.',
        },
        {
          id: 'obli-2-q9',
          type: 'multipleChoice',
          question:
            'Women working more since pandemic:\nMen in the UK are working fewer hours, while women are working more. Since the pandemic, the average number of hours worked has dropped, especially in men. At the same time, the number of women working full time has increased.\n\nChoose the item that best keeps the same meaning as the first sentence:',
          options: [
            'In the UK, men worked less than women last year.',
            'In the UK, the number of hours men work is decreasing.',
            'In the UK, men are not allowed to work as much as women.',
            'In the UK, men and women work the same amount of hours.',
            'In the UK, men are spending more time at work than women.',
          ],
          correctIndex: 1,
          explanation:
            '"Men are working fewer hours" significa que o número de horas dos homens está diminuindo — ou seja, "the number of hours men work is decreasing". As outras opções adicionam informações falsas ou distorcem o significado.',
        },
        {
          id: 'obli-2-q10',
          type: 'multipleChoice',
          question:
            'A little bird was thirsty. It saw a glass of water, but it was too high. A small ant saw the bird. The ant pushed a small stone, and the stone fell, making the water move up. The bird could then drink the water. Later, the bird saw the ant in danger near a spider. The bird quickly helped the ant escape.\n\nWhat lesson does this story teach?',
          options: [
            'Birds are smarter than ants.',
            'Spiders are dangerous.',
            'Helping others is a good thing.',
            'Water is always too high.',
            'Stones are important.',
          ],
          correctIndex: 2,
          explanation:
            'A história mostra um ciclo de ajuda mútua: a formiga ajuda o pássaro a beber água e o pássaro salva a formiga da aranha. A lição é que ajudar os outros é algo bom e que a gentileza se multiplica.',
        },
        {
          id: 'obli-2-q11',
          type: 'multipleChoice',
          question:
            'One afternoon, Lily was playing in her room. Suddenly, she smelled something strange, like smoke. She looked up and saw the smoke alarm making a loud noise. Lily quickly stood up and ran out of her house. She called for her mom and waited outside.\n\nWhy did Lily run out of her house quickly?',
          options: [
            'She was tired of playing.',
            'Her house might have been in danger.',
            'She wanted to play outside.',
            'Her mom called her from outside.',
            'She saw a small animal.',
          ],
          correctIndex: 1,
          explanation:
            'Lily cheirou fumaça e ouviu o alarme de incêndio — sinais de perigo. Ela correu para fora porque a casa poderia estar em perigo. As outras opções contradizem o texto ou adicionam informações inventadas.',
        },
        {
          id: 'obli-2-q12',
          type: 'multipleChoice',
          question:
            'Read the text about Leo:\n"I go to school in the morning, do my homework in the afternoon and watch TV while I wait for my dad so we can play together. Sometimes I invite some friends to play with me and my dad. My mom always makes us a snack to eat after the game."\n\nIt is correct to say about Leo\'s routine:',
          options: [
            'Leo\'s father plays basketball with him in the morning.',
            'Leo doesn\'t like playing with his father.',
            'Leo plays basketball with his friends and invites his parents.',
            'Leo\'s mother plays basketball with him and her husband.',
            'Leo studies in the morning, does his homework in the afternoon and plays with his father when he arrives.',
          ],
          correctIndex: 4,
          explanation:
            'O texto confirma: Leo vai à escola de manhã, faz a lição à tarde, assiste TV esperando o pai e depois jogam juntos. A opção E resume isso fielmente. As outras opções adicionam informações que não estão no texto.',
        },
      ],
    },

    // ─── FASE 3: Communication & Usage ───────────────────────────────────────
    {
      id: 'obli-3',
      title: 'Communication & Usage',
      questions: [
        {
          id: 'obli-3-q1',
          type: 'multipleChoice',
          question:
            'Read the dialogue:\nMom: "Hey Lucas, I saw your room this morning. It\'s a complete mess again. You promised you\'d clean it during the weekend."\nLucas: "Yeah, I know, Mom. I had a lot of homework and then I went out with my friends. I didn\'t get to it yet."\nMom: "I understand you\'ve been busy, but keeping your space clean is important. When do you plan to take care of it?"\nLucas: ____________\n\nChoose the most polite and appropriate response:',
          options: [
            '"You can clean it if it bothers you."',
            '"Why does it matter? It\'s my room."',
            '"I\'m too tired. Maybe next weekend."',
            '"It\'s not a big deal. I\'ll leave it that way."',
            '"Sorry, Mom. I\'ll clean it right after dinner today."',
          ],
          correctIndex: 4,
          explanation:
            '"Sorry, Mom. I\'ll clean it right after dinner today" reconhece o erro, demonstra respeito e oferece uma solução concreta. As outras respostas são desrespeitosas, evasivas ou não resolvem o problema.',
        },
        {
          id: 'obli-3-q2',
          type: 'multipleChoice',
          question:
            'You see an elderly person trying to carry a heavy bag. They look like they are having difficulty. You want to offer to help them politely.\n\nWhat is the best way to offer help?',
          options: [
            'Carry your bag!',
            'Can I help you?',
            'Your bag is heavy!',
            'I need to carry that.',
            'Help me now!',
          ],
          correctIndex: 1,
          explanation:
            '"Can I help you?" é a forma mais natural e educada de oferecer ajuda em inglês — é uma pergunta gentil que dá à pessoa a opção de aceitar ou recusar. As outras opções são ordens, comentários ou pedidos de ajuda para si mesmo.',
        },
        {
          id: 'obli-3-q3',
          type: 'multipleChoice',
          question:
            'Your friend is playing soccer outside, but it is very hot. They look tired and are breathing heavily. You want to give them some good advice.\n\nWhich phrase is the best way to give advice to your friend?',
          options: [
            'You must play more.',
            'You should drink water and rest.',
            'Play, play, play!',
            'Are you tired?',
            'Don\'t stop playing!',
          ],
          correctIndex: 1,
          explanation:
            '"You should drink water and rest" usa o modal "should" para dar um conselho gentil e adequado. É a resposta mais útil e cuidadosa para alguém que parece exausto no calor.',
        },
        {
          id: 'obli-3-q4',
          type: 'multipleChoice',
          question:
            'Yesterday, I lost my favorite ball. I looked for it everywhere, but I could not find it.\n\nChoose the option that correctly rewrites the sentence "Yesterday, I lost my favorite ball" in the NEGATIVE form:',
          options: [
            "Yesterday, I didn't lose my favorite ball.",
            "Yesterday, I don't lose my favorite ball.",
            "Yesterday, I did not lose my favorite ball.",
            "Yesterday, I no lost my favorite ball.",
            "Yesterday, I didn't lost my favorite ball.",
          ],
          correctIndex: 0,
          explanation:
            'Para negar no Simple Past, usamos "didn\'t + infinitivo": "didn\'t lose". A opção C também é gramaticalmente correta ("did not lose"), mas A é a mais natural e comum. D e E estão erradas (estrutura incorreta).',
        },
        {
          id: 'obli-3-q5',
          type: 'multipleChoice',
          question:
            'Here is a list of words. Three of them are things you use at school to learn. One word is something you sit on.\n\nPencil — Book — Notebook — Chair — Eraser\n\nWhich word does NOT belong in this group?',
          options: ['Pencil', 'Book', 'Notebook', 'Chair', 'Eraser'],
          correctIndex: 3,
          explanation:
            'Pencil (lápis), Book (livro), Notebook (caderno) e Eraser (borracha) são materiais escolares usados para aprender. "Chair" (cadeira) é onde você senta — não é um material de aprendizado.',
        },
        {
          id: 'obli-3-q6',
          type: 'multipleChoice',
          question:
            'Look at these 4 sentences and arrange them to tell the story in the correct order:\n1. Dad cleaned the wound with cool water.\n2. Tom slipped on wet grass and fell.\n3. A soft bandage covered the scrape.\n4. Red scratches appeared on Tom\'s knee.',
          options: ['2-3-1-4', '4-2-1-3', '2-4-1-3', '1-2-4-3', '3-2-4-1'],
          correctIndex: 2,
          explanation:
            'A ordem lógica é: Tom escorregou e caiu (2) → apareceram arranhões (4) → o pai limpou a ferida (1) → a bandagem cobriu o machucado (3). Sequência: 2-4-1-3.',
        },
        {
          id: 'obli-3-q7',
          type: 'multipleChoice',
          question:
            'While rehearsing backstage, Mia peeked through a tiny gap between curtains. She caught a brief glimpse of the full audience applauding. Her heart raced, yet excitement sparkled like stage lights.\n\nThe word "glimpse" most nearly means ___.',
          options: ['loud song', 'quick look', 'heavy push', 'long walk', 'sad cry'],
          correctIndex: 1,
          explanation:
            '"Glimpse" significa uma rápida olhada, uma visão breve. "Quick look" é o sinônimo mais preciso. O contexto confirma isso: ela olhou por uma pequena fresta entre as cortinas.',
        },
        {
          id: 'obli-3-q8',
          type: 'multipleChoice',
          question:
            'I felt very ______ when I received a new toy for my birthday. I jumped and smiled. It was the toy I wanted for a long time. My parents were happy to see me so excited.\n\nWhich word is a synonym for "happy" that also fits the context?',
          options: ['sad', 'glad', 'angry', 'tired', 'bored'],
          correctIndex: 1,
          explanation:
            '"Glad" é um sinônimo direto de "happy" — ambas expressam alegria e satisfação. "Sad" é o antônimo, "angry" significa com raiva, "tired" = cansado, "bored" = entediado. Nenhuma das outras se encaixa no contexto de receber um presente.',
        },
        {
          id: 'obli-3-q9',
          type: 'multipleChoice',
          question:
            'Unscramble the words to form a question about routine activities:\n\nSundays — beach — going — on — like — ? — the — you — Do — to',
          options: [
            'Like do you to going the beach on Sundays?',
            'Do you like going to the beach on Sundays?',
            'Sundays like going on the beach to Do you?',
            'Do Sundays like you to going on the beach?',
            'Like you to go on Sundays to Do the beach?',
          ],
          correctIndex: 1,
          explanation:
            'A estrutura correta é: Do + sujeito + like + verbo-ing + complemento. "Do you like going to the beach on Sundays?" é a pergunta completa e gramaticalmente correta.',
        },
        {
          id: 'obli-3-q10',
          type: 'multipleChoice',
          question:
            'Thanksgiving is celebrated in America every year on the fourth Thursday in November. People all over the United States celebrate this ________ in many different ways. For many families, it\'s a day to reflect on the positive things in life.\n\nChoose the correct word to complete the sentence:',
          options: ['year', 'party', 'festival', 'holiday', 'resolution'],
          correctIndex: 3,
          explanation:
            '"Holiday" é a palavra mais adequada — refere-se a um feriado ou data comemorativa oficial. "Festival" poderia funcionar, mas "holiday" é o termo padrão para esse tipo de celebração nacional americana.',
        },
        {
          id: 'obli-3-q11',
          type: 'multipleChoice',
          question:
            'Read and decide: which sentence is the most FORMAL version of:\n"I really, really hate baths! I don\'t wanna take one!"\n\n(Think about replacing slang and informal expressions with proper English)',
          options: [
            'I really, really hate baths!',
            'Baths? No thanks. I\'m out.',
            'I\'m not in the mood for a bath. I dislike them.',
            'I does not to want to bathing. Baths are the worse!',
            'I would prefer not to take baths. I strongly dislike them.',
          ],
          correctIndex: 4,
          explanation:
            '"I would prefer not to take baths. I strongly dislike them" usa linguagem formal: "would prefer not to" substitui "don\'t wanna", e "strongly dislike" substitui "hate". É polido, correto gramaticalmente e adequado para contextos formais.',
        },
      ],
    },
  ],
}
