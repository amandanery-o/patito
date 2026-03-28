# QUESTIONS.md — Revisão Técnica do Projeto Patito

> Revisão realizada por: Tech Lead / Code Reviewer
> Data: 2026-03-26
> Escopo: Arquitetura, performance, segurança, bugs, qualidade de código e dívida técnica
>
> **Como usar este arquivo:** Responda cada pergunta diretamente abaixo de cada bloco `> 🔲 Sua resposta:`. Ao terminar, me repasse o arquivo para que eu implemente as melhorias com base nas suas respostas.

---

## 🏗️ ARQUITETURA

---

### Q1 — App.jsx como God Component
`src/App.jsx` tem **756 linhas** e concentra: gerenciamento de todas as views, toda a lógica de navegação, cálculo de sessão, renderização condicional de 6 telas distintas, listas de dados estáticos e handlers de eventos. Isso viola o princípio de responsabilidade única e torna o arquivo extremamente difícil de manter e testar.

**Opções:**
- A) Dividir em componentes de página separados por view (HomeView, SubjectView, SessionView, ResultView, CalendarView, ScheduleView, AddExamView)
- B) Manter como está por ser um projeto pequeno
- C) Outro approach

> 🔲 Sua resposta:

---

### Q2 — Ausência de React Router
A navegação entre views é feita inteiramente via `useState` e `setView(VIEWS.X)`. Isso significa que: não há histórico de navegação, o botão Voltar do browser não funciona, URLs não mudam, não há deep-linking (impossível enviar link para uma tela específica), e o código condicional de renderização fica gigante.

**Pergunta:** Quer implementar React Router (ou similar) para navegação real com URLs?

> 🔲 Sua resposta:

---

### Q3 — Dados Estáticos Misturados com Lógica de Aplicação
O array `SUBJECTS` (11 matérias) e `EXAM_TYPES` estão definidos diretamente dentro de `App.jsx`, no corpo do módulo. Toda vez que o App.jsx é importado em testes, esses arrays são recriados. Eles deveriam estar em `src/data/subjects.js` e `src/data/examTypes.js`.

**Pergunta:** Posso mover esses dados estáticos para arquivos de dados separados?

> 🔲 Sua resposta:

---

### Q4 — Ausência de Context API ou Gerenciamento de Estado
Estado como `userName`, progresso, XP, streaks e provas estão espalhados entre 3 hooks separados (`useProgress`, `useStreak`, `useXP`) e o estado local do `App.jsx`. Não há um estado global centralizado. Isso causa prop drilling e dificulta compartilhar estado entre componentes.

**Pergunta:** Quer adotar Context API (ou Zustand/Jotai) para centralizar o estado global da aplicação?

> 🔲 Sua resposta:

---

### Q5 — Prop Drilling Profundo
Funções como `onSelect`, `onContinue`, `feedback`, `lives`, `xp`, `currentIndex` são passadas do `App.jsx` para `ExerciseCard`, que as repassa internamente para os componentes de questão. À medida que o app cresce, essa cadeia vai se tornar insustentável.

**Pergunta:** Faz sentido resolver isso com Context ou refatorar `ExerciseCard` para ser mais autônomo?

> 🔲 Sua resposta:

---

### Q6 — Ausência de Tipos (TypeScript ou PropTypes)
Nenhum componente usa PropTypes. Nenhum arquivo usa TypeScript. Isso significa que passar a prop errada, chamar uma função com o argumento errado, ou ter um typo em um campo de dados não gera nenhum erro nem em desenvolvimento nem em CI. Já existe `@types/react` e `@types/react-dom` no `package.json` (instalados mas não usados).

**Pergunta:** Quer migrar para TypeScript ou adicionar PropTypes nos componentes críticos?

> 🔲 Sua resposta:

---

## 🐛 BUGS E COMPORTAMENTOS QUESTIONÁVEIS

---

### Q7 — Bug de Fuso Horário no CalendarIcon e daysUntil
Em `src/utils/dates.js`, `daysUntil('2026-04-05')` faz `new Date('2026-04-05')` que interpreta a string como **UTC midnight**. No Brasil (UTC-3), isso significa que o dia 05/04 às 00h UTC = 04/04 às 21h local. Resultado: a contagem de dias fica errada por 1 dia para datas em UTC.

O mesmo problema ocorre em `CalendarIcon` ao fazer `new Date(date)`.

**Pergunta:** Confirma que esse bug existe e quer corrigi-lo? A correção seria fazer `new Date(dateStr + 'T00:00:00')` ou parsear manualmente os componentes da string.

> 🔲 Sua resposta:

---

### Q8 — Vidas: O Que Acontece Quando Chegam a Zero?
Em `ExerciseCard`, as vidas (`lives`) começam em 3 e decrementam a cada erro. Porém, não há nenhuma verificação do tipo "se `lives === 0`, encerre a sessão". O estudante pode continuar respondendo com 0 vidas indefinidamente. O resultado apenas acumula menos pontuação.

**Pergunta:** Qual é o comportamento esperado quando as vidas chegam a zero? Encerrar a sessão forçadamente? Mostrar um estado especial? Ou vidas são apenas cosméticas e o estudante sempre pode terminar?

> 🔲 Sua resposta:

---

### Q9 — shuffle() Aplicado às Opções de MultipleChoice Quebra o correctIndex
Em `App.jsx`, as questões são embaralhadas com `shuffle(questions)` ao iniciar a sessão. Isso embaralha a **ordem das questões**, não as opções — isso está correto. Porém, nenhum lugar embaralha as opções dentro de cada questão. O `correctIndex` referencia sempre a posição fixa da resposta correta no array `options[]`. Se alguém resolver embaralhar as opções também no futuro, o `correctIndex` ficará errado para sempre.

**Pergunta:** Deseja adicionar embaralhamento de opções? Se sim, o `correctIndex` precisa ser recalculado dinamicamente, ou as questões precisam usar um campo `correctAnswer: 'texto da resposta'` em vez de índice.

> 🔲 Sua resposta:

---

### Q10 — FillBlank: Detecção do Blank por String '____'
Em `FillBlank.jsx`, o enunciado com blank é detectado procurando `'____'` (4 underscores) no texto da questão para dividir em prefix/suffix e exibir o input no meio. Se uma questão tiver `___` (3 underscores) ou `_____` (5 underscores), o componente quebra silenciosamente e mostra o texto errado.

**Pergunta:** Quer padronizar com um marcador explícito como `{{BLANK}}` em vez de contar underscores?

> 🔲 Sua resposta:

---

### Q11 — SEED_VERSION: Migração Não Tem Rollback e Não é Testada
O sistema de seed em `useProgress.js` compara `stored.version` com `SEED_VERSION`. Se a versão armazenada for menor, as provas padrão são re-injetadas. Porém:
- Não há lógica de migração incremental (v1→v2→v3)
- Se uma versão futura mudar a estrutura de progresso, o progresso do usuário pode ser silenciosamente perdido ou corrompido
- Não há testes para esse sistema

**Pergunta:** Quer implementar migrações versionadas com fallback seguro?

> 🔲 Sua resposta:

---

### Q12 — useStreak: Streak Não é Resetada Corretamente em Dias Perdidos
Em `useStreak.js`, `recordStudy()` verifica se o último estudo foi ontem para manter o streak. Se o usuário estudou há 3 dias, o streak cai para 0 na próxima vez que estudar. Porém, a função só é chamada quando o usuário **completa uma sessão**. Se o usuário entrar no app mas não completar nenhuma sessão (só olhar), o streak não é atualizado nem quebrado — fica "congelado" no último valor.

**Pergunta:** O comportamento atual de streak por sessão completada é intencional? Ou o streak deveria ser baseado em acesso diário (qualquer interação)?

> 🔲 Sua resposta:

---

### Q13 — TrophyModal: Está Sendo Exibido em Algum Lugar?
O componente `TrophyModal.jsx` existe e está implementado, mas no `App.jsx` não há nenhum import ou uso dele. O sistema de troféus em `useXP.js` tem lógica para detectar quando um troféu é desbloqueado (`unlockedTrophy`), mas esse valor nunca é consumido para mostrar o modal.

**Pergunta:** O TrophyModal é uma feature inacabada? Quer implementar o trigger para exibi-lo quando um troféu é desbloqueado?

> 🔲 Sua resposta:

---

### Q14 — pdfjs-dist na Dependência de Produção
`pdfjs-dist` está listado em `dependencies` (não `devDependencies`) e tem ~1.3MB. Buscando em todo o código-fonte, **não há nenhum import ou uso de pdfjs-dist** no projeto. É uma dependência morta que aumenta o bundle e a superfície de ataque.

**Pergunta:** Posso remover pdfjs-dist do package.json?

> 🔲 Sua resposta:

---

### Q15 — CalendarMonth: Navegação de Mês com daysUntil Usando Data Local
Em `CalendarMonth.jsx`, ao colorir os dias com provas, a função que mapeia `exam.date` para uma célula do grid usa `new Date(exam.date)` e compara com o índice do dia no grid. Pelo mesmo problema de fuso horário do Q7, a prova do dia 1 de um mês pode aparecer no dia 31 do mês anterior no calendário.

**Pergunta:** Confirma que quer corrigir junto com o Q7?

> 🔲 Sua resposta:

---

### Q16 — AddExam: Formulário Aceita Datas no Passado
O formulário de adicionar prova em `App.jsx` não valida se a data inserida é no passado. Um usuário pode adicionar uma "prova" para 01/01/2020, que vai aparecer no calendário e gerar alertas confusos.

**Pergunta:** Quer adicionar validação de data mínima (hoje ou amanhã) no formulário?

> 🔲 Sua resposta:

---

### Q17 — getUpcomingExams: Exames com endDate Não São Exibidos Corretamente
Em `useProgress.js`, `getUpcomingExams(30)` retorna provas nos próximos 30 dias. Para o OBICT (que tem `date: '2026-03-23'` e `endDate: '2026-04-05'`), o alerta de home mostra a data de início como referência. Se hoje for 01/04, o exame já passou da data de início mas ainda está no prazo — e pode não aparecer nos alertas porque `daysUntil(exam.date)` seria negativo.

**Pergunta:** Como deveria funcionar o alerta para exames com período? Usar `endDate` como referência para o alerta enquanto o período estiver ativo?

> 🔲 Sua resposta:

---

## ⚡ PERFORMANCE

---

### Q18 — Imagens de Mascote Não Otimizadas (1.2MB–1.5MB cada)
O build atual inclui 5 imagens PNG do Patito com tamanho entre **1.27MB e 1.49MB cada** — total de ~7MB apenas no mascote. Em conexões móveis lentas (o público-alvo pode usar celulares básicos), o app vai demorar para carregar.

**Pergunta:** Quer converter as imagens para WebP e/ou reduzir resolução? Posso automatizar isso no processo de build.

> 🔲 Sua resposta:

---

### Q19 — Sem Code Splitting / Lazy Loading
Todo o código (todos os componentes, todos os dados das 11 matérias) é carregado em um único bundle de 243KB (gzip: 78KB). À medida que o conteúdo crescer (mais matérias, mais questões), esse bundle vai crescer linearmente sem nenhum mecanismo de divisão de código.

**Pergunta:** Quer implementar `React.lazy()` e `Suspense` para carregar views e dados de matérias sob demanda?

> 🔲 Sua resposta:

---

### Q20 — Todos os Dados de Matérias São Importados na Inicialização
`App.jsx` importa `matematica`, `obict` e `obli` diretamente no topo. As outras matérias (`portugues`, `ingles`, etc.) existem como arquivos mas ainda não são importadas. Quando forem adicionadas, o bundle vai crescer. Nenhuma matéria é carregada sob demanda.

**Pergunta:** Confirma que isso deve ser resolvido junto com o Q19 (lazy loading)?

> 🔲 Sua resposta:

---

### Q21 — CalendarMonth Sem Memoização
`CalendarMonth` é um componente que renderiza um grid de até 42 células com lógica complexa de posicionamento de dias e dots de provas. Ele é filho de `App.jsx` e re-renderiza toda vez que qualquer estado do App muda (inclusive estados não relacionados ao calendário). Não há `React.memo()` ou `useMemo()` aplicados.

**Pergunta:** Quer aplicar memoização nos componentes pesados (CalendarMonth, SubjectCard, TopicTrail)?

> 🔲 Sua resposta:

---

## 🔒 SEGURANÇA

---

### Q22 — Nenhuma Sanitização de Input do Usuário
O nome do usuário inserido no Onboarding é armazenado diretamente no localStorage e exibido com `{userName}` em JSX. Como o JSX automaticamente escapa HTML, isso não é uma vulnerabilidade de XSS no contexto atual. Porém, não há limite de tamanho para o campo (poderia armazenar milhares de caracteres), e nenhum filtro de caracteres especiais.

**Pergunta:** Quer adicionar validação de tamanho máximo (ex: 30 caracteres) e caracteres permitidos no campo de nome?

> 🔲 Sua resposta:

---

### Q23 — exam.content e exam.notes Sem Validação
Ao adicionar uma prova manualmente, os campos `content` e `notes` aceitam qualquer texto sem limite de tamanho. Esses valores são armazenados no localStorage e exibidos diretamente no app. Embora não sejam enviados para servidor, podem ser usados para explorar edge cases de layout.

**Pergunta:** Quer adicionar validação de tamanho máximo nos campos do formulário de prova?

> 🔲 Sua resposta:

---

### Q24 — localStorage Como Único Armazenamento
Todo o estado persistido (progresso, XP, streaks, provas, nome) fica no localStorage. Isso significa:
- Limpar dados do browser apaga tudo (sem aviso)
- Não há backup
- Não há sincronização entre dispositivos
- Não há separação por usuário (se duas pessoas usarem o mesmo browser, compartilham progresso)

**Pergunta:** Há planos de implementar um backend com autenticação para sincronizar progresso entre dispositivos? Ou o app deve continuar sendo 100% local?

> 🔲 Sua resposta:

---

## 🧪 TESTES

---

### Q25 — App.jsx Sem Nenhum Teste
O componente mais crítico do sistema — `App.jsx` com 756 linhas — não tem nenhum teste. Não há testes para: fluxo de onboarding, navegação entre views, início e conclusão de sessão, cálculo de resultado, adição de provas ao calendário.

**Pergunta:** Quer que eu crie testes de integração para os fluxos principais de App.jsx?

> 🔲 Sua resposta:

---

### Q26 — Hooks Sem Testes
`useProgress.js`, `useStreak.js` e `useXP.js` são os hooks mais importantes do sistema e nenhum deles tem testes. Qualquer mudança neles pode quebrar o progresso silenciosamente.

**Pergunta:** Quer testes unitários para os hooks usando `renderHook` do Testing Library?

> 🔲 Sua resposta:

---

### Q27 — Sem Medição de Cobertura de Testes
O projeto tem 33 testes mas não mede cobertura. Não sabemos que % do código é coberto por testes. O Vitest suporta coverage nativo com `--coverage`.

**Pergunta:** Quer adicionar relatório de coverage ao script de testes e ao CI?

> 🔲 Sua resposta:

---

### Q28 — Sem Testes E2E
Não há testes end-to-end (Playwright ou Cypress). O único teste de integração existente simula interação via Testing Library, mas não testa o fluxo real no browser.

**Pergunta:** Quer adicionar testes E2E com Playwright para os fluxos críticos?

> 🔲 Sua resposta:

---

### Q29 — Dados das Matérias Sem Validação de Estrutura
As matérias (`matematica.js`, `obli.js`, `obict.js`) exportam objetos com questões. Não há validação que garanta que cada questão tem os campos obrigatórios (`id`, `type`, `question`, `options`, `correctIndex`). Um typo em um campo pode causar erro silencioso em runtime.

**Pergunta:** Quer criar um schema de validação (ex: com Zod) ou pelo menos um teste que valide a estrutura de todas as questões?

> 🔲 Sua resposta:

---

## 📦 QUALIDADE DE CÓDIGO

---

### Q30 — Fórmula de XP Hardcoded e Não Documentada
`calcXP` em `scoring.js`: `base(20) + correct*10 + perfectBonus(50)`. Para uma sessão de 10 questões com tudo certo: 20 + 100 + 50 = **170 XP**. Para uma sessão de 18 questões (OBLI): 20 + 180 + 50 = **250 XP**. Para 0 acertos: 20 XP. Esses valores não têm documentação explicando a intenção por trás deles.

**Pergunta:** A fórmula de XP está como você quer? Devo documentar os valores com comentários explicando o design?

> 🔲 Sua resposta:

---

### Q31 — calcStars com Limiar Arbitrário de 70%
`calcStars` dá 3 estrelas para 100%, 2 estrelas para ≥70%, e 1 estrela para abaixo de 70%. Não há 0 estrelas (o aluno sempre ganha pelo menos 1). O limiar de 70% para 2 estrelas não é documentado.

**Pergunta:** Esses valores estão corretos? Faz sentido ter uma categoria de 0 estrelas (sessão reprovada)?

> 🔲 Sua resposta:

---

### Q32 — IDs de Questões São Strings Manuais e Podem Colidir
As questões têm IDs como `'obli-1-q1'`, `'obict-2-q3'`, `'mat-1-q5'`. Esses IDs são definidos manualmente em cada arquivo de dados. Se dois arquivos usarem o mesmo ID, o progresso de uma matéria pode sobrescrever o de outra no localStorage sem nenhum aviso.

**Pergunta:** Quer implementar geração automática de IDs ou pelo menos um teste que verifique unicidade de IDs entre todas as questões?

> 🔲 Sua resposta:

---

### Q33 — Componente ExerciseCard Faz Coisas Demais
`ExerciseCard.jsx` (75 linhas) renderiza: barra de vidas, contador de XP, barra de progresso, questão (delegando para MultipleChoice/TrueFalse/FillBlank/Flashcard), FeedbackPanel e XPToast. São responsabilidades demais para um único componente.

**Pergunta:** Quer refatorar ExerciseCard para separar a lógica de sessão da renderização?

> 🔲 Sua resposta:

---

### Q34 — Espaço Reservado para FeedbackPanel com Altura Hardcoded
Em `ExerciseCard`, quando o feedback aparece, é adicionado um `<div className="h-40" />` (160px) para compensar o painel fixo. Esse valor é hardcoded e pode não corresponder à altura real do FeedbackPanel em diferentes tamanhos de tela ou quando a explicação é longa.

**Pergunta:** Quer implementar um cálculo dinâmico da altura do placeholder baseado no tamanho real do painel?

> 🔲 Sua resposta:

---

### Q35 — Animação de Confetti Usa Posições Aleatórias em Cada Render
`Confetti.jsx` gera 40 peças com `Math.random()` para posição e delay diretamente no JSX, sem `useMemo`. Isso significa que em React StrictMode (que renderiza duas vezes em desenvolvimento), o confetti é gerado com valores diferentes entre renders, podendo causar inconsistência visual.

**Pergunta:** Quer aplicar `useMemo` para memoizar as peças de confetti?

> 🔲 Sua resposta:

---

### Q36 — XPToast Usa setTimeout Sem Cleanup
`XPToast.jsx` provavelmente usa `setTimeout` para sumir após alguns segundos. Se o componente for desmontado antes do timeout expirar (usuário navega para outra tela), o callback ainda será chamado em um componente já desmontado — gerando warning de memory leak.

**Pergunta:** Quer revisar e adicionar cleanup (`clearTimeout` no useEffect return) em todos os componentes que usam setTimeout?

> 🔲 Sua resposta:

---

## 📚 CONTEÚDO E DADOS

---

### Q37 — Conteúdo das Matérias: Fidelidade ao Currículo do 4º Ano
Os arquivos `portugues.js`, `ingles.js`, `historia.js`, `ciencias.js`, `geografia.js` e `ensino-religioso.js` existem como arquivos mas seus tópicos e questões **podem não corresponder ao conteúdo real das provas do Colégio Salesiano Dom Bosco**. Por exemplo, `historia.js` tem tópicos "Brasil Colonial" e "Império Brasileiro" — é isso mesmo que está no currículo do 4º ano?

**Pergunta:** Esses conteúdos foram validados com o material escolar real do Bento? Quais matérias precisam de revisão de conteúdo?

> 🔲 Sua resposta:

---

### Q38 — matematica.js: Apenas 2 dos 6 Tópicos Implementados
O plano original era 6 fases para Matemática (Números até 100k, Adição/Subtração, Multiplicação, Divisão, Frações/Geometria, Medidas/Dinheiro/Gráficos). O arquivo atual tem apenas 2 tópicos. Os outros 4 tópicos não existem ainda.

**Pergunta:** Quer que eu implemente os 4 tópicos restantes de Matemática?

> 🔲 Sua resposta:

---

### Q39 — Matérias Sem Conteúdo Aparecem Como "Em Breve" — Mas Não São Removidas da Lista de Outras Matérias
Matérias com `topics: []` aparecem em dois lugares: na seção "Em Breve" (chips) E no SubjectCard de "Outras Matérias" se tiverem OBICT/OBLI com conteúdo. A lógica de quais matérias aparecem onde pode ser confusa.

**Pergunta:** A divisão atual entre "Em Breve" (sem tópicos) e "Outras Matérias" (com tópicos) está como você quer? Quer ajustar a lógica de exibição?

> 🔲 Sua resposta:

---

### Q40 — ScheduleView Não Trata Robótica Quinzenal com Informação de Semana
O horário de Quarta (dia 3) tem `{ time: '16h20', subject: 'Robótica/Matemática', quinzenal: true }`. O badge "Quinzenal" aparece, mas não há como o app saber **se esta semana específica é semana de Robótica ou de Matemática**. O app não sabe a paridade da semana escolar.

**Pergunta:** Quer implementar um sistema para definir a semana de referência (ímpar/par) e mostrar qual aula será em cada dia específico? Ou o badge "Quinzenal" como aviso é suficiente?

> 🔲 Sua resposta:

---

### Q41 — Schedule Não Trata Feriados ou Recessos Escolares
`ScheduleView` e o card "Aulas de hoje" na Home mostram as aulas de qualquer dia sem considerar: feriados nacionais (Tiradentes, Corpus Christi, etc.), recessos escolares, dias de reunião pedagógica ou eventos do colégio.

**Pergunta:** Quer adicionar um arquivo `src/data/holidays.js` com os feriados do ano letivo para que o app exiba "Sem aulas hoje — Feriado" nesses dias?

> 🔲 Sua resposta:

---

## 🚀 DEPLOY E INFRAESTRUTURA

---

### Q42 — CI Não Verifica Cobertura de Testes nem Roda Lint
O workflow atual faz: install → test → build. Não há: lint (ESLint está instalado mas não configurado para rodar no CI), coverage mínima exigida, verificação de bundle size, nem preview deployment automático para PRs.

**Pergunta:** Quer enriquecer o CI com lint e coverage mínima?

> 🔲 Sua resposta:

---

### Q43 — Sem PWA (Progressive Web App)
O app é voltado para crianças que podem acessar em dispositivos com conexão instável. Não há Service Worker, não há manifest.json com ícone de app, não há suporte a offline, e não há "Adicionar à tela inicial" funcionando adequadamente.

**Pergunta:** Quer transformar o Patito em PWA com suporte a offline (pelo menos cache das assets)?

> 🔲 Sua resposta:

---

### Q44 — Sem Variáveis de Ambiente
Não há `.env` ou `import.meta.env` usado em nenhum lugar. Configurações como `SEED_VERSION`, URLs de API futuras, ou flags de feature deveriam ser gerenciadas via variáveis de ambiente.

**Pergunta:** Quer adotar variáveis de ambiente para configurações que podem variar por ambiente (dev/prod)?

> 🔲 Sua resposta:

---

### Q45 — Sem Monitoramento de Erros em Produção
O app está em produção no Vercel mas não tem nenhum sistema de monitoramento de erros (Sentry, LogRocket, etc.). Se um usuário encontrar um erro em produção, não há como saber o que aconteceu.

**Pergunta:** Quer integrar Sentry ou similar para capturar erros em produção?

> 🔲 Sua resposta:

---

## 🎮 UX E FUNCIONALIDADES

---

### Q46 — Sem Forma de Resetar o Progresso
Não há botão de "Recomeçar" ou "Resetar progresso" no app. O único jeito de zerar é abrindo o DevTools e limpando o localStorage manualmente. Para um app educacional, pode ser útil ter um reset de progresso acessível nas configurações.

**Pergunta:** Quer adicionar uma tela de configurações com opção de resetar o progresso?

> 🔲 Sua resposta:

---

### Q47 — Sem Suporte a Múltiplos Usuários
Se Bento e um amigo usarem o mesmo dispositivo (tablet escolar), o progresso de ambos é misturado no mesmo localStorage sem separação. Não há conceito de "trocar de usuário".

**Pergunta:** Isso é um cenário real? Quer suporte a múltiplos perfis locais?

> 🔲 Sua resposta:

---

### Q48 — ResultScreen: "Continuar" Volta Para Onde?
Após concluir uma sessão, o botão "Continuar" leva de volta ao subject (tela da trilha de tópicos). O botão "Início" leva para a Home. Porém, se o usuário chegou na sessão vindo de um alerta de prova na Home, ao clicar "Continuar" ele vai para o subject — perdendo o contexto de onde veio.

**Pergunta:** Quer implementar navegação com histórico para que "Continuar" leve de volta ao ponto de origem?

> 🔲 Sua resposta:

---

### Q49 — Header Mostra CalendarIcon que Abre Calendário, mas a Ação Não é Clara
O `CalendarIcon` no Header (canto superior direito) é um botão que abre o calendário de provas. Porém, ele está visualmente idêntico ao CalendarIcon usado nos alertas de prova na Home. Um usuário novo pode não perceber que é clicável.

**Pergunta:** Quer adicionar um label ou affordance visual mais claro para o botão de calendário no Header?

> 🔲 Sua resposta:

---

### Q50 — Sem Acessibilidade (a11y) Mínima
Não há: `aria-label` em botões com apenas ícone, `role` nos componentes interativos customizados, suporte a navegação por teclado no Flashcard (flip), contraste verificado sistematicamente, ou suporte a leitores de tela. O público do app inclui crianças que podem ter necessidades especiais.

**Pergunta:** Quer implementar acessibilidade mínima (WCAG AA) nos componentes críticos?

> 🔲 Sua resposta:

---

### Q51 — Flashcard Sem Instrução Sobre Como Interagir
O componente `Flashcard.jsx` tem um card que "vira" ao ser clicado (efeito flip). Não há instrução visual indicando que o card é clicável (sem cursor pointer, sem hint de "Clique para ver a resposta"). Um estudante novo pode não saber o que fazer.

**Pergunta:** Quer adicionar uma dica visual ("Clique para ver a resposta ↓") no Flashcard?

> 🔲 Sua resposta:

---

### Q52 — Sem Persistência da Aba Ativa do BottomNav
Quando o usuário está no Horário ou em Provas e recarrega a página, ele volta sempre para a Home. Isso é especialmente inconveniente em mobile onde recarregar por acidente é comum.

**Pergunta:** Quer persistir a aba ativa no localStorage (ou URL) para sobreviver a recarregamentos?

> 🔲 Sua resposta:

---

### Q53 — Sem Feedback Quando o Progresso de um Tópico é Desbloqueado
Quando o usuário completa o Tópico 1 e o Tópico 2 é desbloqueado, não há nenhuma animação, notificação ou celebração indicando esse evento. O cadeado simplesmente some na próxima vez que o usuário entra na tela.

**Pergunta:** Quer adicionar uma micro-animação de desbloqueio ao acessar a tela de tópicos após completar o anterior?

> 🔲 Sua resposta:

---

### Q54 — Sem Indicação de Progresso de Retentativa
Se um tópico já foi completado (ex: 2 estrelas) e o usuário faz de novo e tira 3 estrelas, o sistema atualiza o melhor resultado. Porém, não há indicação visual de que o usuário está "tentando melhorar" um tópico já completado — parece que está iniciando do zero.

**Pergunta:** Quer exibir o melhor resultado anterior (estrelas) ao iniciar uma retentativa de um tópico já completado?

> 🔲 Sua resposta:

---

*Total: 54 questões identificadas.*
*Responda diretamente neste arquivo e reenvie para implementação.*
