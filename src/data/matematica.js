import mathematicsP1Content from './generated/matematicaP1Content.json'
import mathematicsP2Content from './generated/matematicaP2Content.json'
import mathematicsT2Content from './generated/matematicaT2Content.json'

export const MATHEMATICS_TOPICS = [
  ...(mathematicsT2Content.status === 'approved'
    ? [
        {
          id: 'matematica-t2-grandezas-medidas',
          title: 'Revisão T2 — Grandezas e medidas',
          chapter: '4 e 8',
          reviewLabel: 'Revisão para o T2',
          summary: mathematicsT2Content.summary,
          source: mathematicsT2Content.source,
          summarySections: [
            {
              title: 'Comprimento e perímetro',
              text: 'Comprimento indica quanto algo mede de uma ponta a outra. Metro, centímetro, milímetro e quilômetro são usados em escalas diferentes. O perímetro é a soma das medidas de todo o contorno de uma figura.',
            },
            {
              title: 'Massa',
              text: 'Quilograma, grama, miligrama e tonelada medem massa. A unidade escolhida depende do que será medido: objetos muito leves pedem unidades menores, enquanto cargas grandes podem ser medidas em toneladas.',
            },
            {
              title: 'Capacidade',
              text: 'Capacidade indica quanto cabe em um recipiente. Litro e mililitro são unidades de capacidade: um litro corresponde a mil mililitros. Capacidade e massa são grandezas diferentes.',
            },
            {
              title: 'Tempo',
              text: 'Relógios mostram horas, minutos e segundos. Uma hora possui 60 minutos e um minuto possui 60 segundos. Para descobrir um intervalo, comparamos o horário de início com o horário de término.',
            },
            {
              title: 'Temperatura',
              text: 'O termômetro mede a temperatura. No Brasil, ela costuma ser registrada em graus Celsius. Podemos comparar temperaturas observando qual valor é maior ou menor.',
            },
          ],
          keyIdeas: [
            '1 metro = 100 centímetros = 1000 milímetros.',
            '1 quilômetro = 1000 metros.',
            '1 quilograma = 1000 gramas e 1 tonelada = 1000 quilogramas.',
            '1 litro = 1000 mililitros.',
            '1 hora = 60 minutos e 1 minuto = 60 segundos.',
            'O instrumento e a unidade precisam combinar com a grandeza medida.',
          ],
          questions: mathematicsT2Content.questions,
        },
      ]
    : []),
  ...(mathematicsP1Content.status === 'approved'
    ? [
        {
          id: 'matematica-p1-operacoes-igualdade',
          title: 'Revisão P1 — Multiplicação, divisão e igualdade',
          chapter: '5, 6 e 7',
          reviewLabel: 'Revisão para a P1',
          summary: mathematicsP1Content.summary,
          source: mathematicsP1Content.source,
          summarySections: [
            {
              title: 'Multiplicação',
              text: 'A multiplicação ajuda a calcular parcelas iguais e organizações em linhas e colunas. Podemos decompor um fator para facilitar a conta e usar estimativas para conferir se o produto faz sentido.',
            },
            {
              title: 'Multiplicação, área e perímetro',
              text: 'Multiplicar por 10, 100 e 1000 segue as regularidades do sistema decimal. Em uma malha, a multiplicação pode ajudar a encontrar a área. Área mede a parte interna; perímetro mede o contorno.',
            },
            {
              title: 'Divisão',
              text: 'A divisão pode repartir uma quantidade em grupos iguais ou mostrar quantos grupos cabem nela. O resultado é o quociente, e pode existir resto. O resto sempre precisa ser menor que o divisor.',
            },
            {
              title: 'Operações inversas',
              text: 'Multiplicação e divisão são operações inversas, assim como adição e subtração. Por isso, uma operação pode ajudar a conferir o resultado da outra.',
            },
            {
              title: 'Igualdade e valor desconhecido',
              text: 'O sinal de igual mostra que os dois lados têm o mesmo valor. Para descobrir um valor desconhecido, podemos usar uma operação inversa e depois substituir o valor encontrado para conferir a igualdade.',
            },
          ],
          keyIdeas: [
            'Decompor números pode facilitar uma multiplicação.',
            'Estimar ajuda a perceber se um resultado é possível.',
            'Área e perímetro não medem a mesma coisa.',
            'Uma divisão pode ser exata ou apresentar resto.',
            'Multiplicação e divisão ajudam a conferir uma à outra.',
            'O valor desconhecido precisa tornar verdadeira a igualdade inteira.',
          ],
          questions: mathematicsP1Content.questions,
        },
      ]
    : []),
  ...(mathematicsP2Content.status === 'approved'
    ? [
        {
          id: 'matematica-p2-fracoes-decimais-dados',
          title: 'Revisão P2 — Frações, decimais, tabelas e gráficos',
          chapter: '9, 10 e 11',
          reviewLabel: 'Revisão para a P2',
          summary: mathematicsP2Content.summary,
          source: mathematicsP2Content.source,
          summarySections: [
            {
              title: 'Frações e partes iguais',
              text: 'Uma fração representa uma ou mais partes iguais de um inteiro. O numerador mostra quantas partes são consideradas, e o denominador mostra em quantas partes iguais o inteiro foi dividido.',
            },
            {
              title: 'Comparar e calcular com frações',
              text: 'Frações podem ser representadas em figuras e na reta numérica. Quando os denominadores são iguais, a fração com maior numerador é maior. Para somar ou subtrair frações com denominadores iguais, operamos os numeradores e mantemos o denominador.',
            },
            {
              title: 'Décimos e centésimos',
              text: 'Décimos e centésimos podem ser escritos como frações ou números decimais. Um décimo é 0,1 e um centésimo é 0,01. Dez centésimos formam um décimo, e dez décimos formam uma unidade.',
            },
            {
              title: 'Ler e comparar decimais',
              text: 'A vírgula separa a parte inteira da parte decimal. Para comparar números decimais, observamos primeiro a parte inteira e depois décimos e centésimos. Zeros à direita podem não mudar o valor: 0,5 e 0,50 são equivalentes.',
            },
            {
              title: 'Dinheiro e troco',
              text: 'No sistema monetário brasileiro, cem centavos formam um real. Preços podem ser somados e subtraídos para encontrar o total de uma compra, quanto falta para pagar ou o valor do troco.',
            },
            {
              title: 'Tabelas e variáveis',
              text: 'Tabelas organizam dados em linhas e colunas. Variáveis numéricas apresentam números como resposta; variáveis categóricas apresentam categorias ou características, como cor ou preferência.',
            },
            {
              title: 'Ler gráficos',
              text: 'Para interpretar um gráfico, conferimos título, categorias, escala, legenda e fonte. Em um gráfico pictórico, cada figura pode valer mais de uma unidade. As conclusões precisam ser sustentadas pelos dados mostrados.',
            },
          ],
          keyIdeas: [
            'As partes de uma fração precisam ter o mesmo tamanho.',
            'Numerador indica as partes consideradas; denominador indica o total de partes iguais.',
            '0,1 é um décimo; 0,01 é um centésimo.',
            '0,5 e 0,50 representam o mesmo valor.',
            'Cem centavos formam um real.',
            'Título, escala, legenda e fonte ajudam a interpretar gráficos corretamente.',
          ],
          questions: mathematicsP2Content.questions,
        },
      ]
    : []),
]
