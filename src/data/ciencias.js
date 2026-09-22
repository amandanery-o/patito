import scienceP1Content from './generated/cienciasP1Content.json'

export const SCIENCE_TOPICS =
  scienceP1Content.status === 'approved'
    ? [
        {
          id: 'ciencias-p1-transformacoes',
          title: 'Revisão P1 — Transformações dos materiais',
          chapter: '8 e 9',
          reviewLabel: 'Revisão para a P1',
          summary: scienceP1Content.summary,
          source: scienceP1Content.source,
          summarySections: [
            {
              title: 'Transformações físicas e químicas',
              text: 'Uma transformação física muda a forma ou o estado de um material sem formar outro. Uma transformação química forma materiais diferentes. O gelo derretendo é um exemplo físico; um bolo assando é um exemplo químico.',
            },
            {
              title: 'Estados da matéria',
              text: 'Um sólido tem forma própria. Um líquido assume a forma do recipiente. Um gás se espalha pelo espaço disponível. Aquecer ou resfriar um material pode mudar seu estado físico.',
            },
            {
              title: 'Como observar uma mudança',
              text: 'Mudança de cor, formação de gás ou de um sólido, luz e calor podem indicar uma transformação química. Para ter certeza, precisamos observar se surgiu outro material.',
            },
            {
              title: 'Transformações reversíveis',
              text: 'Uma mudança é reversível quando o material pode voltar à condição anterior. A água pode congelar, derreter, evaporar e condensar. Essas mudanças de estado recebem os nomes solidificação, fusão, vaporização e condensação.',
            },
            {
              title: 'Transformações irreversíveis',
              text: 'Uma mudança é irreversível quando o material não volta à condição anterior. Cozinhar um ovo, queimar papel e apodrecer uma fruta são exemplos. Rasgar papel também é irreversível, mesmo sendo uma transformação física.',
            },
            {
              title: 'Materiais e ambiente',
              text: 'A reciclagem permite aproveitar materiais de novo. O alumínio pode derreter e endurecer sem mudar sua composição. Evitar desperdícios e cuidar dos resíduos plásticos ajuda a proteger o ambiente.',
            },
          ],
          keyIdeas: [
            'Física ou química: pergunte se surgiu outro material.',
            'Reversível ou irreversível: pergunte se o mesmo material pode voltar à condição anterior.',
            'Uma transformação física também pode ser irreversível, como rasgar papel.',
            'Fusão, solidificação, vaporização e condensação são mudanças de estado.',
            'Derreter gelo pode ser revertido ao congelar a água novamente.',
            'Cozinhar um ovo e queimar papel são irreversíveis.',
          ],
          questions: scienceP1Content.questions,
        },
      ]
    : []
