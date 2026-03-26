// Olimpíada Brasileira de Língua Inglesa (OBLI) — Nível 4º e 5º anos
// Questões adaptadas das edições 2024.1, 2024.2, 2025.1 e 2025.2
// Linguagem simplificada para 4º ano com instruções em português

export const obli = {
  id: 'obli',
  name: 'Olimpíada de Língua Inglesa (OBLI)',
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
            '🇧🇷 Qual palavra NÃO combina com as outras?\n\nAngry — Happy — Joyful — Cheerful — Glad',
          options: ['Angry', 'Happy', 'Joyful', 'Cheerful', 'Glad'],
          correctIndex: 0,
          explanation:
            '"Angry" significa raiva — uma emoção negativa. As outras quatro (Happy, Joyful, Cheerful, Glad) são todas palavras que expressam alegria e felicidade. Por isso "Angry" não pertence ao grupo.',
        },
        {
          id: 'obli-1-q2',
          type: 'multipleChoice',
          question:
            '🇧🇷 Complete a frase com a forma correta do verbo:\n\nMy sister loves books. She ______ a new book every day after school.',
          options: ['read', 'reading', 'reads', 'will read', 'readed'],
          correctIndex: 2,
          explanation:
            'No Simple Present, para "she/he/it" adicionamos -s ao verbo: "She reads". "Readed" não existe — "read" já é o passado de "read" (verbo irregular).',
        },
        {
          id: 'obli-1-q3',
          type: 'multipleChoice',
          question:
            '🇧🇷 Tem um erro de gramática neste texto. Qual é?\n\nLast weekend, my family and I goed to the beach. We played in the sand and swam in the ocean.',
          options: [
            '"Last" está no lugar errado.',
            '"beach" precisa de "the".',
            '"goed" deveria ser "went".',
            '"played" está errado.',
            '"shining" está errado.',
          ],
          correctIndex: 2,
          explanation:
            '"Go" é um verbo irregular! No passado, "go" vira "went" — não "goed". A frase correta é: "we went to the beach".',
        },
        {
          id: 'obli-1-q4',
          type: 'multipleChoice',
          question:
            '🇧🇷 Qual palavra tem o mesmo significado de "tiny" (pequenininho)?\n\nGrandma placed a tiny glass bird on the shelf.',
          options: ['huge', 'small', 'noisy', 'quick', 'smooth'],
          correctIndex: 1,
          explanation:
            '"Tiny" significa muito pequeno. "Small" é seu sinônimo — também significa pequeno. "Huge" é o contrário (enorme). As outras palavras têm significados bem diferentes.',
        },
        {
          id: 'obli-1-q5',
          type: 'multipleChoice',
          question:
            '🇧🇷 Qual preposição completa a frase corretamente?\n\nMy cat, Leo, likes to hide ______ the table.',
          options: ['in', 'on', 'near', 'under', 'beside'],
          correctIndex: 3,
          explanation:
            '"Under" significa embaixo de. O gato se esconde embaixo da mesa — "under the table". "On" = em cima, "in" = dentro, "near" = perto, "beside" = ao lado.',
        },
        {
          id: 'obli-1-q6',
          type: 'multipleChoice',
          question:
            '🇧🇷 Qual é o erro com o artigo nesta frase?\n\nI saw a big elephant at the zoo. A elephant is a very smart animal.',
          options: [
            '"big" está no lugar errado.',
            '"zoo" precisa de "the".',
            '"a" antes de "elephant" deveria ser "an".',
            '"smart" está escrito errado.',
            '"plants" deveria ser singular.',
          ],
          correctIndex: 2,
          explanation:
            'Em inglês, usamos "an" antes de palavras que começam com vogal (a, e, i, o, u). "Elephant" começa com "e", então o correto é "an elephant".',
        },
        {
          id: 'obli-1-q7',
          type: 'multipleChoice',
          question:
            '🇧🇷 O verbo "read" é irregular e tem a mesma escrita no presente e no passado. Qual opção abaixo tem um verbo com essa mesma característica?',
          options: [
            'She broke the vase yesterday.',
            'Josh ate his lunch quickly.',
            'I put my car in the garage last Sunday.',
            'The singers wrote a song last year.',
            'The students bought three books.',
          ],
          correctIndex: 2,
          explanation:
            '"Put" é igual no presente e no passado: "I put" → "I put". Assim como "read → read". Os outros verbos mudam: go/went, eat/ate, write/wrote, buy/bought.',
        },
        {
          id: 'obli-1-q8',
          type: 'multipleChoice',
          question:
            '🇧🇷 Complete a frase usando o comparativo correto:\n\nJulia tem 1,48m e Luis tem 1,52m.\n"Luis is ___ Julia."',
          options: ['tall', 'more tall', 'tallest', 'tall than', 'taller than'],
          correctIndex: 4,
          explanation:
            'Para comparar duas pessoas, usamos: adjetivo + "-er than". "Tall" vira "taller than". "More tall" está errado, "tallest" é superlativo (o mais alto de todos).',
        },
        {
          id: 'obli-1-q9',
          type: 'multipleChoice',
          question:
            '🇧🇷 Tem um erro de gramática neste texto. Qual é?\n\nYesterday, I drinked a lot of water. It was a very hot day.',
          options: [
            '"lot" está errado.',
            '"played" está errado.',
            '"hours" está errado.',
            '"drinked" deveria ser "drank".',
            '"healthy" está escrito errado.',
          ],
          correctIndex: 3,
          explanation:
            '"Drink" é irregular! No passado, "drink" vira "drank" — não "drinked". A frase correta é: "I drank a lot of water".',
        },
        {
          id: 'obli-1-q10',
          type: 'multipleChoice',
          question:
            '🇧🇷 Complete o diálogo com as palavras do quadro:\nYOU — VERY — AM — PLAY\n\nLENA: I _____ happy to have you here. How are _____ ?\nSANDRA: I\'m _____ happy too!\nLENA: I started to _____ soccer for the school team.\n\nQual é a sequência correta?',
          options: [
            'VERY — YOU — PLAY — AM',
            'AM — PLAY — YOU — VERY',
            'PLAY — YOU — VERY — AM',
            'AM — YOU — VERY — PLAY',
            'AM — YOU — PLAY — VERY',
          ],
          correctIndex: 3,
          explanation:
            'A sequência é AM — YOU — VERY — PLAY: "I AM happy", "How are YOU?", "I\'m VERY happy too!", "I started to PLAY soccer". Cada palavra preenche o espaço que faz sentido.',
        },
        {
          id: 'obli-1-q11',
          type: 'multipleChoice',
          question:
            '🇧🇷 Como se fala esses números em inglês?\n\n100 — 1.000',
          options: [
            'One million / One billion',
            'One hundred / One million',
            'One thousand / One billion',
            'One thousand / One million',
            'One hundred / One thousand',
          ],
          correctIndex: 4,
          explanation:
            '100 = "one hundred" e 1.000 = "one thousand". Million = 1.000.000 e Billion = 1.000.000.000 — são números muito maiores!',
        },
        {
          id: 'obli-1-q12',
          type: 'multipleChoice',
          question:
            '🇧🇷 Qual frase tem o mesmo significado de:\n"Paula has an apartment." (Paula tem um apartamento.)',
          options: [
            'It is Paula\'s apartment.',
            'The apartment has Paula.',
            'Does she have an apartment?',
            'Paula doesn\'t have an apartment.',
            'Paula would like to have an apartment.',
          ],
          correctIndex: 0,
          explanation:
            '"Paula has an apartment" = "It is Paula\'s apartment" — as duas frases dizem que o apartamento pertence à Paula. O \'s (apóstrofo + s) indica posse em inglês.',
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
            '🇧🇷 Leia o diálogo e responda:\n\nAnna: "I finally have time to read again. I\'m reading mystery novels."\nJulia: "I\'ve been learning to play the guitar. It\'s hard, but I love it."\n\nO que podemos concluir sobre Anna e Julia?',
          options: [
            'They have the same favorite hobby.',
            'Julia finds learning the guitar very easy.',
            'They graduated from high school together.',
            'Anna enjoys musical activities more than reading.',
            'They both enjoy spending time doing things they love.',
          ],
          correctIndex: 4,
          explanation:
            'Anna ama ler e Julia ama tocar violão — hobbies diferentes, mas as duas são apaixonadas pelo que fazem. A conclusão correta é que elas gostam de dedicar tempo às suas atividades favoritas.',
        },
        {
          id: 'obli-2-q2',
          type: 'multipleChoice',
          question:
            '🇧🇷 Uma professora mandou este e-mail:\n"Your assignment is due this Friday. Please submit it on time."\n\nQual é a resposta mais educada e adequada do aluno?',
          options: [
            'Thank you, I\'ll submit it on time.',
            'I\'ll do it when I feel ready.',
            'Got it. I\'ll think about it.',
            'Chill, I\'ll send it soon.',
            'Okay, I\'ll try my best.',
          ],
          correctIndex: 0,
          explanation:
            '"Thank you, I\'ll submit it on time" é a resposta perfeita: agradece, demonstra respeito e confirma o compromisso. As outras são informais demais ou vagas demais para uma resposta a um professor.',
        },
        {
          id: 'obli-2-q3',
          type: 'multipleChoice',
          question:
            '🇧🇷 "Passed away" é uma expressão mais delicada para dizer que alguém morreu.\n\nQual palavra tem o mesmo significado?',
          options: ['died', 'retired', 'debuted', 'returned', 'disappeared'],
          correctIndex: 0,
          explanation:
            '"Passed away" é uma forma gentil de dizer "died" (morreu). É usada para suavizar a mensagem. As outras palavras têm significados diferentes: retired = aposentou, debuted = estreou, returned = voltou.',
        },
        {
          id: 'obli-2-q4',
          type: 'multipleChoice',
          question:
            '🇧🇷 Leia o diálogo e marque Verdadeiro (V) ou Falso (F):\n\nHunk: "I haven\'t got a brain… only straw."\nDorothy: "How can you talk if you haven\'t got a brain?"\nHunk: "Some people without brains do an awful lot of talking."\nDorothy: "Yes, I guess you\'re right."\n\n1. Hunk says he doesn\'t have a brain. ___\n2. Dorothy thinks Hunk is the smartest person she knows. ___\n3. Hunk believes people without brains talk a lot. ___\n4. Dorothy disagrees with Hunk at the end. ___',
          options: ['V F V F', 'V F F V', 'F V F V', 'V V V F', 'F F F V'],
          correctIndex: 0,
          explanation:
            '1-V: Hunk diz que não tem cérebro. 2-F: Dorothy não diz isso. 3-V: "people without brains do an awful lot of talking". 4-F: Dorothy concorda ("I guess you\'re right"). Resultado: V F V F.',
        },
        {
          id: 'obli-2-q5',
          type: 'multipleChoice',
          question:
            '🇧🇷 Leia o texto sobre Minecraft e responda:\n\n"Minecraft has no set goal. This is why it\'s called a sandbox game — you can build things from your imagination, explore the world, and face challenges."\n\nQuais afirmações são Verdadeiras (V) ou Falsas (F)?\n1. Minecraft has one main goal every player must follow.\n2. Players can build things using their imagination.\n3. Exploring the world can include facing challenges.\n4. It\'s called "sandbox game" because it has lots of limitations.',
          options: ['V V V F', 'F V V F', 'F F V V', 'F V F V', 'V V F F'],
          correctIndex: 1,
          explanation:
            '1-F: O texto diz "no set goal". 2-V: "build things from your imagination". 3-V: "explore the world and face challenges". 4-F: É "sandbox" por ter liberdade, não limitações. Resultado: F V V F.',
        },
        {
          id: 'obli-2-q6',
          type: 'multipleChoice',
          question:
            '🇧🇷 Leia o texto e ligue os benefícios ao tipo correto:\n\n"In the short term, exercise improves sleep and boosts mood. In the long term, it reduces the risk of depression. Aerobic exercise lowers blood sugar and makes you breathe faster."\n\n1. Improve sleep → ?\n2. Lower blood sugar → ?\n3. Reduce risk of depression → ?\n4. Breathe faster → ?\n\n(A=Aeróbico · B=Longo prazo · C=Curto prazo · D=Esforço cardíaco)',
          options: [
            '1–C, 2–D, 3–B, 4–A',
            '1–C, 2–A, 3–B, 4–D',
            '1–B, 2–A, 3–C, 4–D',
            '1–A, 2–B, 3–D, 4–C',
            '1–A, 2–D, 3–C, 4–B',
          ],
          correctIndex: 1,
          explanation:
            'Melhorar o sono = efeito de curto prazo (C). Reduzir açúcar no sangue = exercício aeróbico (A). Menor risco de depressão = longo prazo (B). Respiração mais rápida = resultado do esforço (D). Sequência: 1-C, 2-A, 3-B, 4-D.',
        },
        {
          id: 'obli-2-q7',
          type: 'multipleChoice',
          question:
            '🇧🇷 Leia e complete a frase com a melhor opção:\n\n"We need food science to help make food easier to grow, safer, and healthier for everyone on the planet."\n\nFood science helps us _______.',
          options: [
            'make food fun and tasty',
            'eat at restaurants every day',
            'sell more food in supermarkets',
            'understand why people eat snacks',
            'grow food safely and help the planet',
          ],
          correctIndex: 4,
          explanation:
            'O texto diz que a ciência dos alimentos torna os alimentos mais fáceis de cultivar, mais seguros e mais saudáveis. A opção E resume isso perfeitamente.',
        },
        {
          id: 'obli-2-q8',
          type: 'multipleChoice',
          question:
            '🇧🇷 Leia a resenha e escolha o melhor título:\n\n"Duolingo is fun, but it has limitations. If you want to be fluent, you\'ll need to use books, other apps, and real-world practice — not just Duolingo."\n\nQual título combina melhor com esse texto?',
          options: [
            'The History of Language Learning',
            'How to Learn Any Language Without Practice',
            'Using Duolingo and Other Tools to Learn a Language',
            'Why Duolingo Is the Best Language App in the World',
            'Language Is Hard: Stop Trying to Learn English',
          ],
          correctIndex: 2,
          explanation:
            'O texto fala sobre o Duolingo como uma ferramenta útil, mas que precisa ser combinada com outros recursos. O título C captura essa ideia central perfeitamente.',
        },
        {
          id: 'obli-2-q9',
          type: 'multipleChoice',
          question:
            '🇧🇷 Leia a notícia e escolha a frase de mesmo sentido:\n\n"Men in the UK are working fewer hours, while women are working more."\n\nQual frase tem o mesmo significado?',
          options: [
            'In the UK, men worked less than women last year.',
            'In the UK, the number of hours men work is decreasing.',
            'In the UK, men are not allowed to work as much as women.',
            'In the UK, men and women work the same amount of hours.',
            'In the UK, men are spending more time at work than women.',
          ],
          correctIndex: 1,
          explanation:
            '"Men are working fewer hours" = o número de horas dos homens está diminuindo. A opção B diz exatamente isso. As outras distorcem o significado.',
        },
        {
          id: 'obli-2-q10',
          type: 'multipleChoice',
          question:
            '🇧🇷 Leia a história e responda:\n\nUm pássaro tinha sede, mas o copo d\'água estava alto demais. Uma formiga empurrou uma pedra e a água subiu — o pássaro pôde beber. Depois, o pássaro salvou a formiga de uma aranha.\n\nQual lição a história ensina?',
          options: [
            'Birds are smarter than ants.',
            'Spiders are dangerous.',
            'Helping others is a good thing.',
            'Water is always too high.',
            'Stones are important.',
          ],
          correctIndex: 2,
          explanation:
            'A formiga ajudou o pássaro, e o pássaro retribuiu salvando a formiga. A lição é: ajudar os outros é algo bom, e a bondade se repete.',
        },
        {
          id: 'obli-2-q11',
          type: 'multipleChoice',
          question:
            '🇧🇷 Leia a história e responda:\n\nLily estava brincando em seu quarto quando sentiu cheiro de fumaça e ouviu o alarme disparar. Ela correu rapidamente para fora de casa.\n\nPor que Lily correu para fora?',
          options: [
            'She was tired of playing.',
            'Her house might have been in danger.',
            'She wanted to play outside.',
            'Her mom called her from outside.',
            'She saw a small animal.',
          ],
          correctIndex: 1,
          explanation:
            'Lily sentiu fumaça e ouviu o alarme — sinais de perigo. Ela correu porque a casa poderia estar em perigo. As outras opções não fazem parte da história.',
        },
        {
          id: 'obli-2-q12',
          type: 'multipleChoice',
          question:
            '🇧🇷 Leia sobre a rotina do Leo e marque a opção correta:\n\n"I go to school in the morning, do my homework in the afternoon and wait for my dad so we can play together. My mom always makes us a snack after the game."\n\nO que é verdade sobre a rotina do Leo?',
          options: [
            'Leo\'s father plays with him in the morning.',
            'Leo doesn\'t like playing with his father.',
            'Leo invites his parents and brothers to play.',
            'Leo\'s mother plays the game with them.',
            'Leo studies in the morning, does homework in the afternoon and plays with his dad.',
          ],
          correctIndex: 4,
          explanation:
            'O texto confirma: Leo vai à escola de manhã, faz a lição à tarde e joga com o pai quando ele chega. A mãe faz um lanche — ela não joga. A opção E resume a rotina corretamente.',
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
            '🇧🇷 Leia o diálogo e escolha a resposta mais educada para Lucas:\n\nMãe: "Lucas, seu quarto está uma bagunça. Quando você vai arrumar?"\nLucas: "Eu tive muito dever e saí com amigos..."\nMãe: "Quando você vai se organizar?"\nLucas: ___________',
          options: [
            '"You can clean it if it bothers you."',
            '"Why does it matter? It\'s my room."',
            '"I\'m too tired. Maybe next weekend."',
            '"It\'s not a big deal. I\'ll leave it that way."',
            '"Sorry, Mom. I\'ll clean it right after dinner today."',
          ],
          correctIndex: 4,
          explanation:
            '"Sorry, Mom. I\'ll clean it right after dinner today" é a resposta mais madura: pede desculpas, demonstra respeito e oferece uma solução concreta. As outras opções são desrespeitosas ou evasivas.',
        },
        {
          id: 'obli-3-q2',
          type: 'multipleChoice',
          question:
            '🇧🇷 Você vê um senhor idoso com dificuldade para carregar uma sacola pesada. Qual é a forma mais educada de oferecer ajuda em inglês?',
          options: [
            'Carry your bag!',
            'Can I help you?',
            'Your bag is heavy!',
            'I need to carry that.',
            'Help me now!',
          ],
          correctIndex: 1,
          explanation:
            '"Can I help you?" é a forma mais natural e educada de oferecer ajuda — é uma pergunta gentil que dá à pessoa a opção de aceitar ou recusar. As outras são ordens ou comentários, não ofertas de ajuda.',
        },
        {
          id: 'obli-3-q3',
          type: 'multipleChoice',
          question:
            '🇧🇷 Seu amigo está jogando futebol no calor e parece esgotado. Qual é o melhor conselho em inglês?',
          options: [
            'You must play more.',
            'You should drink water and rest.',
            'Play, play, play!',
            'Are you tired?',
            'Don\'t stop playing!',
          ],
          correctIndex: 1,
          explanation:
            '"You should drink water and rest" usa o modal "should" para dar um conselho gentil e adequado — beber água e descansar é o certo quando alguém está exausto no calor.',
        },
        {
          id: 'obli-3-q4',
          type: 'multipleChoice',
          question:
            '🇧🇷 Passe a frase para a forma NEGATIVA no passado:\n\n"Yesterday, I lost my favorite ball."',
          options: [
            "Yesterday, I didn't lose my favorite ball.",
            "Yesterday, I don't lose my favorite ball.",
            "Yesterday, I did not lose my favorite ball.",
            "Yesterday, I no lost my favorite ball.",
            "Yesterday, I didn't lost my favorite ball.",
          ],
          correctIndex: 0,
          explanation:
            'Para negar no Simple Past: didn\'t + verbo no infinitivo. "I didn\'t lose" está correto. A opção E tem erro: "didn\'t lost" está errado — após "didn\'t" o verbo fica no infinitivo (lose, não lost).',
        },
        {
          id: 'obli-3-q5',
          type: 'multipleChoice',
          question:
            '🇧🇷 Qual palavra NÃO é um material escolar?\n\nPencil — Book — Notebook — Chair — Eraser',
          options: ['Pencil', 'Book', 'Notebook', 'Chair', 'Eraser'],
          correctIndex: 3,
          explanation:
            'Pencil (lápis), Book (livro), Notebook (caderno) e Eraser (borracha) são materiais usados para estudar. "Chair" (cadeira) é onde você senta — não é um material de aprendizado.',
        },
        {
          id: 'obli-3-q6',
          type: 'multipleChoice',
          question:
            '🇧🇷 Coloque as frases na ordem correta para contar a história:\n\n1. Dad cleaned the wound with cool water.\n2. Tom slipped on wet grass and fell.\n3. A soft bandage covered the scrape.\n4. Red scratches appeared on Tom\'s knee.',
          options: ['2-3-1-4', '4-2-1-3', '2-4-1-3', '1-2-4-3', '3-2-4-1'],
          correctIndex: 2,
          explanation:
            'Tom escorregou e caiu (2) → apareceram arranhões no joelho (4) → o pai limpou a ferida (1) → a bandagem cobriu o machucado (3). Ordem: 2-4-1-3.',
        },
        {
          id: 'obli-3-q7',
          type: 'multipleChoice',
          question:
            '🇧🇷 O que significa a palavra "glimpse" nesta frase?\n\n"She caught a brief glimpse of the audience through the curtains."',
          options: ['loud song', 'quick look', 'heavy push', 'long walk', 'sad cry'],
          correctIndex: 1,
          explanation:
            '"Glimpse" significa uma rápida olhada, uma visão breve. "Quick look" é o sinônimo mais preciso. Ela olhou rapidamente pelo espaço entre as cortinas.',
        },
        {
          id: 'obli-3-q8',
          type: 'multipleChoice',
          question:
            '🇧🇷 Qual palavra substitui "happy" na frase abaixo sem mudar o sentido?\n\n"I felt very happy when I received my birthday gift."',
          options: ['sad', 'glad', 'angry', 'tired', 'bored'],
          correctIndex: 1,
          explanation:
            '"Glad" é sinônimo de "happy" — as duas expressam alegria e satisfação. "Sad" é o contrário, "angry" = com raiva, "tired" = cansado, "bored" = entediado.',
        },
        {
          id: 'obli-3-q9',
          type: 'multipleChoice',
          question:
            '🇧🇷 Monte a pergunta correta com as palavras embaralhadas:\n\nSundays — beach — going — on — like — ? — the — you — Do — to',
          options: [
            'Like do you to going the beach on Sundays?',
            'Do you like going to the beach on Sundays?',
            'Sundays like going on the beach to Do you?',
            'Do Sundays like you to going on the beach?',
            'Like you to go on Sundays to Do the beach?',
          ],
          correctIndex: 1,
          explanation:
            'A estrutura correta em inglês é: Do + sujeito + like + verbo-ing + complemento. "Do you like going to the beach on Sundays?" é a pergunta completa e gramaticalmente correta.',
        },
        {
          id: 'obli-3-q10',
          type: 'multipleChoice',
          question:
            '🇧🇷 Complete a frase com a palavra mais adequada:\n\n"Thanksgiving is celebrated every year. People all over the US celebrate this ________ in many different ways."',
          options: ['year', 'party', 'festival', 'holiday', 'resolution'],
          correctIndex: 3,
          explanation:
            '"Holiday" significa feriado ou data comemorativa oficial. É a palavra mais adequada para descrever o Thanksgiving, que é um feriado nacional americano.',
        },
        {
          id: 'obli-3-q11',
          type: 'multipleChoice',
          question:
            '🇧🇷 Qual das opções é a versão mais FORMAL desta frase?\n\n"I really, really hate baths! I don\'t wanna take one!"',
          options: [
            'I really, really hate baths!',
            'Baths? No thanks. I\'m out.',
            'I\'m not in the mood for a bath. I dislike them.',
            'I does not to want to bathing. Baths are the worse!',
            'I would prefer not to take baths. I strongly dislike them.',
          ],
          correctIndex: 4,
          explanation:
            '"I would prefer not to take baths. I strongly dislike them" usa linguagem formal: "would prefer not to" substitui "don\'t wanna", e "strongly dislike" substitui "hate". É correto gramaticalmente e adequado para contextos formais.',
        },
      ],
    },
  ],
}
