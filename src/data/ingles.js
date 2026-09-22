import englishP1Content from './generated/inglesP1Content.json'

export const ENGLISH_TOPICS =
  englishP1Content.status === 'approved'
    ? [
        {
          id: 'ingles-p1-acoes-horas',
          title: 'Revisão P1 — Ações e horas',
          chapter: '5 e 6',
          reviewLabel: 'Revisão para a P1',
          summary: englishP1Content.summary,
          source: englishP1Content.source,
          summarySections: [
            {
              title: 'O que alguém está fazendo?',
              text: 'Para perguntar sobre uma pessoa, use “What is he doing?” (O que ele está fazendo?) ou “What is she doing?” (O que ela está fazendo?). Para mais de uma pessoa, use “What are they doing?” (O que eles estão fazendo?).',
            },
            {
              title: 'Respostas sobre ações',
              text: 'Para dizer o que acontece agora, use “I am”, “he/she is” ou “they are” antes de uma ação terminada em -ing. Exemplos: “She is cooking” (Ela está cozinhando) e “They are talking” (Eles estão conversando).',
            },
            {
              title: 'Palavras de ação',
              text: 'A unidade 5 trabalha ações como studying (estudando), eating (comendo), cleaning (limpando), sleeping (dormindo), listening to music (ouvindo música) e using the computer (usando o computador).',
            },
            {
              title: 'Informações de um ingresso',
              text: 'Um ingresso de cinema pode informar movie (filme), movie theater (cinema), date (data), time (horário) e seat number (número do assento). Leia cada campo para encontrar a informação pedida.',
            },
            {
              title: 'Perguntar as horas',
              text: '“What time is it?” quer dizer “Que horas são?”. Responda com “It’s” e o horário. Para uma hora cheia, você pode dizer “It’s six o’clock” (São seis horas).',
            },
            {
              title: 'a.m. e p.m.',
              text: 'Em horários digitais, a.m. indica o período da meia-noite até antes do meio-dia; p.m. indica do meio-dia até antes da meia-noite. “12:00 a.m.” é meia-noite, e “12:00 p.m.” é meio-dia.',
            },
          ],
          keyIdeas: [
            'Use “is” com he/she e “are” com they.',
            'Use “am” com I: “I am studying”.',
            'A forma -ing ajuda a falar de uma ação acontecendo agora.',
            '“What time is it?” pergunta as horas; “It’s...” inicia a resposta.',
            '“o’clock” aparece nas horas cheias.',
            '12:00 a.m. é meia-noite; 12:00 p.m. é meio-dia.',
          ],
          questions: englishP1Content.questions,
        },
      ]
    : []
