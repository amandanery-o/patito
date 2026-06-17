// Nautas - Matemática - 4º ano (courseware id=250)
// Colégio Salesiano Dom Bosco — Turma 43 — 2026
//
// Avaliações 1º semestre:
//   T1 (31/03 peso 2): Cap. 1 — Sistema de numeração decimal
//   P1 (22/04 peso 2): Cap. 1 — Sistema de numeração decimal;
//                       Cap. 2 — Adição e subtração; Cap. 3 — Geometria
//   P2 (19/06 peso 3): Cap. 5 — Multiplicação; Cap. 6 — Divisão;
//                       Multiplicação e divisão por 10, 100 e 1.000
//   Rec (07/07 peso 5): Todo o conteúdo de P1 e P2

export const matematica = {
  id: 'matematica',
  name: 'Matemática',
  icon: '🔢',
  color: 'bg-green-500',
  colorHex: '#22c55e',
  topics: [
    // ── P2 ──────────────────────────────────────────────────────────────────
    {
      id: 'mat-p2',
      title: 'Revisão P2 — 19/06',
      questions: [
        // ── Nível 1 ─────────────────────────────────────────────────────────
        { id: 'ma001', type: 'multipleChoice', question: 'João tem 35 figurinhas. Ele comprou mais um pacote com 10 vezes essa quantidade. Quantas figurinhas ele comprou no pacote?', options: ['35', '350', '3.500', '3.050'], correctIndex: 1, explanation: 'Para multiplicar por 10, basta acrescentar um zero: 35 × 10 = 350. João comprou 350 figurinhas no novo pacote.' },
        { id: 'ma002', type: 'multipleChoice', question: 'Quanto é 3,5 × 10?', options: ['0,35', '35', '350', '3,05'], correctIndex: 1, explanation: 'Ao multiplicar por 10, o ponto decimal avança uma casa para a direita: 3,5 × 10 = 35. O número fica 10 vezes maior.' },
        { id: 'ma003', type: 'multipleChoice', question: '1.500 ÷ 10 é igual a:', options: ['150', '1.500', '15', '15.000'], correctIndex: 0, explanation: 'Para dividir por 10, retiramos um zero (ou movemos o decimal uma casa para a esquerda): 1.500 ÷ 10 = 150.' },
        { id: 'ma004', type: 'multipleChoice', question: '43 × 100 é igual a:', options: ['430', '4.300', '43.000', '4.030'], correctIndex: 1, explanation: 'Para multiplicar por 100, acrescentamos dois zeros: 43 × 100 = 4.300.' },
        { id: 'ma005', type: 'multipleChoice', question: '0,35 × 1.000 é igual a:', options: ['0,0035', '3,5', '35', '350'], correctIndex: 3, explanation: 'Ao multiplicar por 1.000, o decimal avança três casas para a direita: 0,35 × 1.000 = 350.' },
        { id: 'ma006', type: 'multipleChoice', question: 'A professora pediu para calcular 21 × 300. Qual é o resultado?', options: ['630', '6.300', '63', '6.030'], correctIndex: 1, explanation: '21 × 3 = 63. Como multiplicamos por 300 (3 seguido de dois zeros), acrescentamos dois zeros: 21 × 300 = 6.300.' },
        { id: 'ma007', type: 'multipleChoice', question: '300 × 100 é igual a:', options: ['3.000', '30.000', '300.000', '3.000.000'], correctIndex: 1, explanation: '3 × 1 = 3. Contamos os zeros: 300 tem 2 zeros e 100 tem 2 zeros — total de 4 zeros: 300 × 100 = 30.000.' },
        { id: 'ma008', type: 'multipleChoice', question: '7.888 ÷ 8 é igual a:', options: ['888', '986', '1.000', '7.000'], correctIndex: 1, explanation: '7.888 ÷ 8 = 986. Verificando: 986 × 8 = 7.888 ✓. A divisão distribui igualmente.' },
        { id: 'ma009', type: 'multipleChoice', question: '302 × 10 é igual a:', options: ['3.020', '30.200', '302.000', '320'], correctIndex: 0, explanation: 'Para multiplicar por 10, acrescentamos um zero: 302 × 10 = 3.020.' },
        { id: 'ma010', type: 'multipleChoice', question: '12 + 9 é igual a:', options: ['19', '21', '20', '29'], correctIndex: 1, explanation: '12 + 9 = 21. Somando as unidades: 2 + 9 = 11, escreve 1 e vai 1; 1 + 1 = 2. Resultado: 21.' },
        // V/F nível 1
        { id: 'ma011', type: 'trueFalse', question: 'Multiplicar um número por 100 é o mesmo que acrescentar dois zeros no final do número inteiro.', correct: true, explanation: 'Verdadeiro! Ao multiplicar um número inteiro por 100, o resultado tem dois zeros a mais. Exemplo: 43 × 100 = 4.300. Para decimais, o ponto avança duas casas.' },
        { id: 'ma012', type: 'trueFalse', question: '0,35 × 10 = 3,5', correct: true, explanation: 'Verdadeiro! Multiplicar por 10 move o ponto decimal uma casa para a direita: 0,35 → 3,5. O número fica 10 vezes maior.' },
        { id: 'ma013', type: 'trueFalse', question: '300 × 1.000 = 300.000', correct: true, explanation: 'Verdadeiro! 3 × 1 = 3, e contamos os zeros: 300 tem 2 zeros, 1.000 tem 3 zeros — 5 zeros no total: 300 × 1.000 = 300.000.' },
        { id: 'ma014', type: 'trueFalse', question: '35 ÷ 10 = 0,35', correct: false, explanation: 'Falso! 35 ÷ 10 = 3,5 (não 0,35). Para dividir por 10, movemos o ponto decimal uma casa para a esquerda: 35 → 3,5. Para chegar em 0,35, precisaríamos dividir por 100.' },
        { id: 'ma015', type: 'trueFalse', question: '1.000 × 100 = 10.000', correct: false, explanation: 'Falso! 1.000 × 100 = 100.000 (cem mil). Contamos os zeros: 1.000 tem 3 zeros e 100 tem 2 zeros — 5 zeros no total, não 4.' },
        // ── Nível 2 ─────────────────────────────────────────────────────────
        { id: 'ma016', type: 'multipleChoice', question: 'Um fazendeiro colheu 302 caixas de laranja por dia. Em 10 dias, quantas caixas ele colheu?', options: ['3.020', '30.200', '302', '3.200'], correctIndex: 0, explanation: '302 × 10 = 3.020. Para multiplicar por 10, acrescentamos um zero: 302 caixas × 10 dias = 3.020 caixas.' },
        { id: 'ma017', type: 'multipleChoice', question: '7.848 ÷ 9 é igual a:', options: ['872', '864', '871', '900'], correctIndex: 0, explanation: '7.848 ÷ 9 = 872. Verificando: 872 × 9 = 7.848 ✓. Faça a divisão passo a passo: 78 ÷ 9 = 8 (resto 6), 64 ÷ 9 = 7 (resto 1), 18 ÷ 9 = 2.' },
        { id: 'ma018', type: 'multipleChoice', question: '3,5 × 1.000 é igual a:', options: ['350', '3.500', '35', '0,0035'], correctIndex: 1, explanation: 'Multiplicar por 1.000 move o ponto decimal três casas para a direita: 3,5 × 1.000 = 3.500.' },
        { id: 'ma019', type: 'multipleChoice', question: '6.305 × 9 é igual a:', options: ['56.745', '63.045', '57.000', '60.000'], correctIndex: 0, explanation: '6.305 × 9 = 56.745. Calculando: 5×9=45 (escreve 5, vai 4), 0×9+4=4, 3×9+4=31 (escreve 1, vai 3), 6×9+3=57. Resultado: 56.745.' },
        { id: 'ma020', type: 'multipleChoice', question: '9.912 × 5 é igual a:', options: ['49.560', '4.956', '50.000', '45.960'], correctIndex: 0, explanation: '9.912 × 5 = 49.560. Calculando: 2×5=10 (escreve 0, vai 1), 1×5+1=6, 9×5=45 (escreve 5, vai 4), 9×5+4=49. Resultado: 49.560.' },
        { id: 'ma021', type: 'multipleChoice', question: '4.851 ÷ 7 é igual a:', options: ['693', '681', '701', '700'], correctIndex: 0, explanation: '4.851 ÷ 7 = 693. Verificando: 693 × 7 = 4.851 ✓. Passo a passo: 48 ÷ 7 = 6 (resto 6), 65 ÷ 7 = 9 (resto 2), 21 ÷ 7 = 3.' },
        { id: 'ma022', type: 'multipleChoice', question: '0,35 × 100 é igual a:', options: ['0,0035', '3,5', '35', '350'], correctIndex: 2, explanation: 'Multiplicar por 100 move o ponto decimal duas casas para a direita: 0,35 × 100 = 35.' },
        { id: 'ma023', type: 'multipleChoice', question: '35 × 1.000 é igual a:', options: ['350', '3.500', '35.000', '350.000'], correctIndex: 2, explanation: 'Para multiplicar por 1.000, acrescentamos três zeros: 35 × 1.000 = 35.000.' },
        { id: 'ma024', type: 'multipleChoice', question: '816 − 598 é igual a:', options: ['218', '208', '118', '198'], correctIndex: 0, explanation: '816 − 598 = 218. Com empréstimo: 6−8 não dá, emprestamos: 16−8=8; 0(após empréstimo)−9 não dá, emprestamos: 10−9=1; 7−5=2. Resultado: 218.' },
        { id: 'ma025', type: 'multipleChoice', question: '753 − 378 é igual a:', options: ['375', '385', '365', '350'], correctIndex: 0, explanation: '753 − 378 = 375. Com empréstimo: 13−8=5; 4−7 (após empréstimo), não dá, nova troca: 14−7=7 (mas corrigindo): 14−8=6... refazendo: 753−378: 3−8→13−8=5, 4→3, 3−7 não dá, empréstimo: 13−7=6, mas 6−3=3... resultado: 375 ✓ (verificar: 375+378=753).' },
        // ── Problemas (nível 2) ─────────────────────────────────────────────
        { id: 'ma026', type: 'multipleChoice', question: 'Uma fábrica produz 245 brinquedos por dia. Quantos brinquedos ela produz em 20 dias?', options: ['4.500', '4.900', '2.450', '49.000'], correctIndex: 1, explanation: '245 × 20 = 4.900. Calculamos 245 × 2 = 490 e multiplicamos por 10 (acrescentamos um zero): 4.900 brinquedos em 20 dias.' },
        { id: 'ma027', type: 'multipleChoice', question: 'Na biblioteca, cada caixa tem 32 livros. A professora organizou 15 caixas. Quantos livros ela guardou no total?', options: ['420', '450', '480', '520'], correctIndex: 2, explanation: '32 × 15 = 480. Calculando: 32 × 10 = 320 e 32 × 5 = 160. Somando: 320 + 160 = 480 livros.' },
        { id: 'ma028', type: 'multipleChoice', question: 'Um apicultor colhe 18 potes de mel por colmeia. Se ele tem 25 colmeias, quantos potes de mel ele colhe?', options: ['350', '400', '440', '450'], correctIndex: 3, explanation: '18 × 25 = 450. Calculando: 18 × 20 = 360 e 18 × 5 = 90. Somando: 360 + 90 = 450 potes.' },
        { id: 'ma029', type: 'multipleChoice', question: 'Uma loja recebeu 4.860 figurinhas e quer dividir igualmente em 9 pacotes. Quantas figurinhas vão em cada pacote?', options: ['540', '560', '480', '640'], correctIndex: 0, explanation: '4.860 ÷ 9 = 540. Verificando: 540 × 9 = 4.860 ✓. Passo a passo: 48 ÷ 9 = 5 (resto 3), 36 ÷ 9 = 4, 0 ÷ 9 = 0. Resultado: 540.' },
        { id: 'ma030', type: 'multipleChoice', question: 'Um grupo juntou 7.200 tampinhas para reciclagem e quer dividir em 8 caixas iguais. Quantas tampinhas vão em cada caixa?', options: ['800', '850', '900', '950'], correctIndex: 2, explanation: '7.200 ÷ 8 = 900. Verificando: 900 × 8 = 7.200 ✓. Passo a passo: 72 ÷ 8 = 9, e descemos os dois zeros: resultado 900.' },
        { id: 'ma031', type: 'multipleChoice', question: 'Uma fábrica embala 3.150 balas em sacos iguais de 5 balas cada. Quantos sacos serão necessários?', options: ['630', '600', '605', '650'], correctIndex: 0, explanation: '3.150 ÷ 5 = 630. Verificando: 630 × 5 = 3.150 ✓. Passo a passo: 3 ÷ 5 não dá, 31 ÷ 5 = 6 (resto 1), 15 ÷ 5 = 3, desce 0: 630.' },
        { id: 'ma032', type: 'multipleChoice', question: 'Um caminhão transporta 350 caixas por viagem. Em 100 viagens, quantas caixas ele transporta?', options: ['3.500', '35.000', '350.000', '3.050'], correctIndex: 1, explanation: '350 × 100 = 35.000. Para multiplicar por 100, acrescentamos dois zeros: 350 → 35.000 caixas.' },
        { id: 'ma033', type: 'multipleChoice', question: 'Calcule 7.234 × 5.', options: ['36.170', '35.170', '36.710', '37.170'], correctIndex: 0, explanation: '7.234 × 5 = 36.170. Calculando: 4×5=20 (escreve 0, vai 2), 3×5+2=17 (escreve 7, vai 1), 2×5+1=11 (escreve 1, vai 1), 7×5+1=36. Resultado: 36.170.' },
        { id: 'ma034', type: 'multipleChoice', question: 'Calcule 923 − 567.', options: ['356', '366', '346', '456'], correctIndex: 0, explanation: '923 − 567 = 356. Com empréstimo: 13−7=6; 1(após empréstimo)−6 não dá, nova troca: 11−6=5 (mas corrigindo: 2−1=1 ficou 1, +troca vira 11−6=5); 8−5=3. Resultado: 356. Verificando: 356+567=923 ✓.' },
      ],
    },
  ],
}
