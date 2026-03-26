// Olimpíada Brasileira de Inovação, Ciência e Tecnologia — I OBICT (1ª Fase)
// 14 questões adaptadas para texto (originalmente 20; 6 dependiam 100% de imagem/vídeo)

export const obict = {
  id: 'obict',
  name: 'OBICT',
  icon: '🚀',
  color: 'bg-violet-600',
  colorHex: '#7c3aed',
  topics: [
    // ─── FASE 1: Tecnologia e Inovação ──────────────────────────────────────
    {
      id: 'obict-1',
      title: 'Tecnologia e Inovação',
      questions: [
        {
          id: 'obict-1-q1',
          type: 'multipleChoice',
          question: 'Qual das tecnologias abaixo é considerada a mais recente e sofisticada?',
          options: [
            'Máquina a vapor',
            'Televisão em cores',
            'Computador pessoal (PC)',
            'Smartphone',
            'Inteligência Artificial Generativa',
          ],
          correctIndex: 4,
          explanation:
            'A Inteligência Artificial Generativa (como ChatGPT e similares) é a tecnologia mais recente entre as listadas, surgida em larga escala apenas nos anos 2020.',
        },
        {
          id: 'obict-1-q2',
          type: 'multipleChoice',
          question:
            'Atualmente todos os celulares vêm com GPS. Em inglês, GPS significa Global Positioning System. Qual é uma das principais funções de um GPS?',
          options: [
            'Tirar fotos.',
            'Encontrar o caminho para chegar a um lugar.',
            'Converter textos em áudios.',
            'Resolver problemas de Matemática.',
            'Escrever textos automaticamente.',
          ],
          correctIndex: 1,
          explanation:
            'O GPS usa satélites para determinar sua localização exata e traçar rotas, sendo a ferramenta essencial para navegação em tempo real.',
        },
        {
          id: 'obict-1-q3',
          type: 'multipleChoice',
          question:
            'Um jogo online se tornou um fenômeno mundial por permitir comunicação global instantânea entre jogadores de diferentes países. Qual tecnologia tornou isso possível?',
          options: [
            'Motores foguete.',
            'Energia solar.',
            'Reatores atômicos.',
            'Internet.',
            'Robótica avançada.',
          ],
          correctIndex: 3,
          explanation:
            'A Internet é a rede global que conecta computadores e dispositivos, permitindo comunicação instantânea e o desenvolvimento de tecnologias como IA e realidade virtual.',
        },
        {
          id: 'obict-1-q4',
          type: 'multipleChoice',
          question:
            'Em Star Wars, Darth Vader sobreviveu a graves queimaduras graças a tecnologias que hoje já existem na medicina real. Qual alternativa melhor descreve essa tecnologia?',
          options: [
            'Cirurgias feitas com auxílio de robôs.',
            'Transfusão de sangue.',
            'Engenharia genética.',
            'Uso de células-tronco.',
            'Transplante de córneas.',
          ],
          correctIndex: 0,
          explanation:
            'Robôs cirúrgicos como o Da Vinci já realizam operações com alta precisão. Próteses robóticas e exoesqueletos também são realidade, tornando a ficção científica cada vez mais presente na medicina.',
        },
        {
          id: 'obict-1-q5',
          type: 'multipleChoice',
          question:
            'Qual dos telescópios abaixo NÃO evita a interferência da atmosfera da Terra nas suas observações?',
          options: [
            'Observatório Gemini',
            'IRAS',
            'Observatório Chandra',
            'Telescópio Espacial James Webb',
            'Telescópio Espacial Hubble',
          ],
          correctIndex: 0,
          explanation:
            'O Observatório Gemini fica na superfície da Terra (no Chile e no Havaí), portanto sofre interferência da atmosfera. Os demais — IRAS, Chandra, James Webb e Hubble — são telescópios espaciais.',
        },
        {
          id: 'obict-1-q6',
          type: 'multipleChoice',
          question:
            'O Skyglass em Canela (RS) tem um piso de vidro suspenso sobre um abismo, dando aos visitantes a sensação de flutuar. Qual propriedade do vidro torna possível ver o que está abaixo dos pés?',
          options: [
            'Transparência.',
            'Opacidade.',
            'Condutividade térmica.',
            'Condutividade elétrica.',
            'Resistência à tração.',
          ],
          correctIndex: 0,
          explanation:
            'A transparência do vidro permite que a luz atravesse o material, tornando possível enxergar o que está abaixo. Sem essa propriedade, o piso seria opaco e o efeito visual não existiria.',
        },
        {
          id: 'obict-1-q7',
          type: 'multipleChoice',
          question:
            'Um cientista brasileiro foi o primeiro a transmitir sons por ondas eletromagnéticas, invenção que daria origem ao telefone e ao rádio. Quem foi esse inventor?',
          options: [
            'Albert Einstein',
            'Elon Musk',
            'Isaac Newton',
            'Roberto Landell de Moura',
            'Steve Jobs',
          ],
          correctIndex: 3,
          explanation:
            'Roberto Landell de Moura (1861–1928) foi um padre e inventor brasileiro que realizou a primeira transmissão de voz por ondas de rádio antes de Marconi, sendo pioneiro das telecomunicações.',
        },
      ],
    },

    // ─── FASE 2: Ciência e Natureza ─────────────────────────────────────────
    {
      id: 'obict-2',
      title: 'Ciência e Natureza',
      questions: [
        {
          id: 'obict-2-q1',
          type: 'multipleChoice',
          question:
            'Algumas reações químicas causam mudança de estado e rápido aumento de volume. Em qual das situações abaixo isso acontece?',
          options: [
            'Dissolução de açúcar na água.',
            'Enferrujamento lento de um prego.',
            'Mistura de limão com sal.',
            'Aquecimento lento de água até 100°C.',
            'Estouro de uma pipoca no micro-ondas.',
          ],
          correctIndex: 4,
          explanation:
            'Na pipoca, a água dentro do grão vira vapor (mudança de estado) e expande rapidamente, causando o estouro — exatamente uma mudança de estado com aumento abrupto de volume.',
        },
        {
          id: 'obict-2-q2',
          type: 'multipleChoice',
          question:
            'Um dos grandes problemas das cidades é o trânsito e a poluição. Qual dos veículos abaixo é o mais prejudicial ao meio ambiente?',
          options: [
            'Bicicleta.',
            'Carro movido a gasolina.',
            'Ônibus elétrico.',
            'Trem movido a energia solar.',
            'Patinete elétrico.',
          ],
          correctIndex: 1,
          explanation:
            'Carros a gasolina emitem CO₂ e outros poluentes diretamente na atmosfera, sendo responsáveis por grande parte da poluição urbana. Os demais veículos não emitem gases ou emitem muito menos.',
        },
        {
          id: 'obict-2-q3',
          type: 'multipleChoice',
          question:
            'Lagartos conseguem correr sobre a superfície da água sem afundar. Por que esses répteis fazem isso?',
          options: [
            'Para não gastar energia voando.',
            'Apenas fazem isso quando são muito jovens.',
            'Para ganhar agilidade e fugir de predadores.',
            'Para se divertir.',
            'Lagartos não conseguem andar sobre a água — a imagem é fake.',
          ],
          correctIndex: 2,
          explanation:
            'Lagartos como o basilisco usam a tensão superficial da água e o movimento rápido das patas para correr sobre ela. É uma estratégia de sobrevivência para escapar de predadores com rapidez.',
        },
        {
          id: 'obict-2-q4',
          type: 'multipleChoice',
          question:
            'Energia eólica é gerada pelo aproveitamento dos ventos. O que é necessário para transformar energia do vento em energia elétrica?',
          options: [
            'Grandes reservatórios de água.',
            'Turbinas movidas pelo vento (aerogeradores).',
            'Painéis solares instalados no telhado.',
            'Queima controlada de combustíveis fósseis.',
            'Reações nucleares em reatores.',
          ],
          correctIndex: 1,
          explanation:
            'Aerogeradores (turbinas eólicas) captam a energia cinética do vento e a convertem em energia elétrica por meio de um gerador. É uma das principais fontes de energia limpa do mundo.',
        },
        {
          id: 'obict-2-q5',
          type: 'multipleChoice',
          question:
            'Uma pessoa vê uma explosão à distância e percebe a luz antes de ouvir o barulho. Qual a melhor explicação para isso?',
          options: [
            'O observador vê a explosão, mas demora a ouvir por problema de gravação.',
            'O som e a luz viajam à mesma velocidade.',
            'Caso a explosão fosse na Lua, o observador não veria a luz.',
            'Caso fosse na Lua, perceberia a explosão da mesma forma, com luz e som.',
            'A luz viaja muito mais rápido que o som, por isso vemos a explosão antes de ouvi-la.',
          ],
          correctIndex: 4,
          explanation:
            'A luz viaja a ~300.000 km/s, enquanto o som viaja a ~340 m/s no ar — cerca de 1 milhão de vezes mais devagar. Por isso sempre vemos o relâmpago antes de ouvir o trovão.',
        },
        {
          id: 'obict-2-q6',
          type: 'multipleChoice',
          question:
            'A inclinação do eixo da Terra em relação ao plano de sua órbita tem impacto direto nas variações de temperatura ao longo do ano. Qual alternativa melhor descreve esse impacto?',
          options: [
            'O hemisfério norte sempre recebe mais luz solar direta que o hemisfério sul.',
            'A inclinação do eixo da Terra não tem efeito sobre a temperatura.',
            'Em certos momentos do ano, um hemisfério recebe mais luz solar que o outro — são as estações.',
            'As variações de temperatura independem do eixo da Terra e são causadas por correntes marinhas.',
            'As variações são causadas pelo efeito estufa, não pela inclinação.',
          ],
          correctIndex: 2,
          explanation:
            'A inclinação de ~23,5° faz com que, em diferentes momentos do ano, cada hemisfério receba mais ou menos luz solar direta — gerando verão, outono, inverno e primavera.',
        },
        {
          id: 'obict-2-q7',
          type: 'multipleChoice',
          question:
            'Alguns peixes possuem manchas claras no corpo que parecem olhos quando vistas de longe. Qual é a melhor explicação evolutiva para essas manchas?',
          options: [
            'Os peixes ficam mais bonitos para atrair parceiros.',
            'As manchas iluminam o ambiente ao redor.',
            'Os peixes atraem outros de sua espécie para reprodução.',
            'As manchas parecem olhos a predadores, inibindo ataques.',
            'São causadas por uma doença que atinge todo o cardume.',
          ],
          correctIndex: 3,
          explanation:
            'As manchas em forma de olhos são uma adaptação evolutiva de camuflagem chamada "olhos falsos". Confundem predadores sobre a localização real da cabeça do peixe, dificultando o ataque.',
        },
      ],
    },
  ],
}
