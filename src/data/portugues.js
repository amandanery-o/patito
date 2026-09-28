import portugueseP1Content from './generated/portuguesP1Content.json'

export const PORTUGUESE_TOPICS =
  portugueseP1Content.status === 'approved'
    ? [
        {
          id: 'portugues-p1-leitura-lingua',
          title: 'Revisão P1 — Leitura e língua em uso',
          chapter: 'P1',
          reviewLabel: 'Revisão para a P1',
          summary: portugueseP1Content.summary,
          source: portugueseP1Content.source,
          summarySections: [
            {
              title: 'Ler e encontrar pistas',
              text: 'Comece pelo que o texto diz claramente: quem participa, onde acontece e o que ocorreu. Depois, junte pistas para entender informações que não aparecem escritas de forma direta. A resposta sempre precisa combinar com o texto.',
            },
            {
              title: 'Adjetivos em -oso e -osa',
              text: 'Muitos adjetivos terminam em -oso ou -osa e são escritos com s. Eles indicam uma característica: carinho forma carinhoso ou carinhosa; cuidado forma cuidadoso ou cuidadosa.',
            },
            {
              title: 'Substantivos em -agem e -eza',
              text: 'Muitos substantivos terminados em -agem são escritos com g, como viagem, paisagem e coragem. Alguns substantivos que nomeiam qualidades terminam em -eza: belo forma beleza; gentil forma gentileza.',
            },
            {
              title: 'Como usar a vírgula',
              text: 'A vírgula pode separar itens de uma lista, o nome de quem está sendo chamado e uma expressão colocada no início da frase. Não separe com vírgula quem faz a ação do verbo que mostra a ação.',
            },
            {
              title: 'Concordância nominal',
              text: 'Artigo, substantivo e adjetivo devem combinar em gênero e número. Dizemos “a menina curiosa”, “as meninas curiosas”, “o menino curioso” e “os meninos curiosos”.',
            },
            {
              title: 'Plural das palavras em -ão',
              text: 'O plural de palavras terminadas em -ão pode aparecer de três formas. Balão vira balões, pão vira pães e irmão vira irmãos. Observe e memorize a forma correta de cada palavra.',
            },
          ],
          keyIdeas: [
            'Procure no texto a pista que sustenta sua resposta.',
            'Adjetivos em -oso e -osa são escritos com s.',
            'Muitos substantivos em -agem são femininos: a viagem, a paisagem e a coragem.',
            'Substantivos como beleza e gentileza terminam em -eza.',
            'A vírgula organiza a frase, mas não separa o sujeito do verbo.',
            'Artigo, substantivo e adjetivo combinam em gênero e número.',
            'O plural em -ão pode terminar em -ões, -ães ou -ãos.',
          ],
          questions: portugueseP1Content.questions,
        },
      ]
    : []
