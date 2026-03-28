# QUESTIONS.md — Revisão Técnica do Projeto Patito

> Revisão realizada por: Tech Lead / Code Reviewer
> Respostas baseadas em: melhores práticas de desenvolvimento de software
> Escopo: Arquitetura, performance, segurança, bugs, qualidade de código e dívida técnica

---

## 🏗️ ARQUITETURA

---

### Q1 — App.jsx como God Component

`src/App.jsx` tem **756 linhas** e concentra: gerenciamento de todas as views, toda a lógica de navegação, cálculo de sessão, renderização condicional de 6 telas distintas, listas de dados estáticos e handlers de eventos. Isso viola o princípio de responsabilidade única e torna o arquivo extremamente difícil de manter e testar.

**Opções:**
- A) Dividir em componentes de página separados por view (HomeView, SubjectView, SessionView, ResultView, CalendarView, ScheduleView, AddExamView)
- B) Manter como está por ser um projeto pequeno
- C) Outro approach

> ✅ **Resposta (melhor prática):** Opção A. Mesmo em projetos pequenos, o God Component é a principal causa de dívida técnica acumulada. Cada view deve ser seu próprio componente em `src/pages/` (HomeView.jsx, SubjectView.jsx, SessionView.jsx, ResultView.jsx, CalendarView.jsx, ScheduleView.jsx, AddExamView.jsx). O App.jsx deve ficar com menos de 100 linhas, responsável apenas por: montar o Provider de estado global, renderizar o roteador e exibir o componente de página correto. **Prioridade: Alta.**

---

### Q2 — Ausência de React Router

A navegação entre views é feita inteiramente via `useState` e `setView(VIEWS.X)`. Isso significa que: não há histórico de navegação, o botão Voltar do browser não funciona, URLs não mudam, não há deep-linking (impossível enviar link para uma tela específica), e o código condicional de renderização fica gigante.

**Pergunta:** Quer implementar React Router (ou similar) para navegação real com URLs?

> ✅ **Resposta (melhor prática):** Sim, adotar `react-router-dom` v6. URLs semânticas (`/`, `/materia/matematica`, `/sessao`, `/calendario`, `/horario`) resolvem: botão Voltar do browser, deep-linking, histórico de navegação e remoção do if/else gigante de renderização. Para um app que roda no Vercel, basta configurar `vercel.json` com rewrite de `/*` → `/index.html`. O custo de adoção é baixo e o ganho em manutenibilidade é alto. **Prioridade: Alta.**

---

### Q3 — Dados Estáticos Misturados com Lógica de Aplicação

O array `SUBJECTS` (11 matérias) e `EXAM_TYPES` estão definidos diretamente dentro de `App.jsx`, no corpo do módulo. Toda vez que o App.jsx é importado em testes, esses arrays são recriados. Eles deveriam estar em `src/data/subjects.js` e `src/data/examTypes.js`.

**Pergunta:** Posso mover esses dados estáticos para arquivos de dados separados?

> ✅ **Resposta (melhor prática):** Sim, mover imediatamente. Dados estáticos jamais devem viver em componentes. `src/data/subjects.js` e `src/data/examTypes.js` tornam os dados testáveis isoladamente, reutilizáveis por outros componentes futuros e mais fáceis de atualizar sem tocar na lógica da aplicação. **Prioridade: Alta.**

---

### Q4 — Ausência de Context API ou Gerenciamento de Estado

Estado como `userName`, progresso, XP, streaks e provas estão espalhados entre 3 hooks separados (`useProgress`, `useStreak`, `useXP`) e o estado local do `App.jsx`. Não há um estado global centralizado. Isso causa prop drilling e dificulta compartilhar estado entre componentes.

**Pergunta:** Quer adotar Context API (ou Zustand/Jotai) para centralizar o estado global da aplicação?

> ✅ **Resposta (melhor prática):** Sim, adotar **Context API + useReducer** (nativo do React, sem dependência extra). Um `AppContext` que exponha `{ userName, progress, xp, streak, exams }` e as actions para modificá-los. Zustand seria mais elegante, mas adiciona dependência. Para o tamanho atual do projeto, Context + useReducer é a solução de menor custo e maior benefício. Jotai é uma boa segunda opção se o Context ficar complexo. **Prioridade: Alta.**

---

### Q5 — Prop Drilling Profundo

Funções como `onSelect`, `onContinue`, `feedback`, `lives`, `xp`, `currentIndex` são passadas do `App.jsx` para `ExerciseCard`, que as repassa internamente para os componentes de questão. À medida que o app cresce, essa cadeia vai se tornar insustentável.

**Pergunta:** Faz sentido resolver isso com Context ou refatorar `ExerciseCard` para ser mais autônomo?

> ✅ **Resposta (melhor prática):** As duas abordagens, combinadas. Criar um `SessionContext` que encapsula o estado da sessão em andamento (vidas, XP, questão atual, feedback) e um `useSession` hook que os componentes filhos consomem diretamente, sem prop drilling. Isso resolve Q4 e Q5 juntos. **Prioridade: Alta, resolver junto com Q4.**

---

### Q6 — Ausência de Tipos (TypeScript ou PropTypes)

Nenhum componente usa PropTypes. Nenhum arquivo usa TypeScript. Isso significa que passar a prop errada, chamar uma função com o argumento errado, ou ter um typo em um campo de dados não gera nenhum erro nem em desenvolvimento nem em CI. Já existe `@types/react` e `@types/react-dom` no `package.json` (instalados mas não usados).

**Pergunta:** Quer migrar para TypeScript ou adicionar PropTypes nos componentes críticos?

> ✅ **Resposta (melhor prática):** Migrar para **TypeScript** progressivamente. O projeto já tem `@types/react` e `@types/react-dom` instalados — o setup está meio-pronto. A estratégia é renomear arquivos de `.jsx` → `.tsx` gradualmente, começando pelos hooks e utils (que são mais fáceis de tipar) e depois os componentes. TypeScript pega erros de estrutura de dados (como o bug do correctIndex e os IDs duplicados) em tempo de compilação, antes de chegar em produção. PropTypes é uma solução pior porque não ajuda em tempo de desenvolvimento no editor. **Prioridade: Média — implementar progressivamente.**

---

## 🐛 BUGS E COMPORTAMENTOS QUESTIONÁVEIS

---

### Q7 — Bug de Fuso Horário no CalendarIcon e daysUntil

Em `src/utils/dates.js`, `daysUntil('2026-04-05')` faz `new Date('2026-04-05')` que interpreta a string como **UTC midnight**. No Brasil (UTC-3), isso significa que o dia 05/04 às 00h UTC = 04/04 às 21h local. Resultado: a contagem de dias fica errada por 1 dia para datas em UTC.

O mesmo problema ocorre em `CalendarIcon` ao fazer `new Date(date)`.

**Pergunta:** Confirma que esse bug existe e quer corrigi-lo? A correção seria fazer `new Date(dateStr + 'T00:00:00')` ou parsear manualmente os componentes da string.

> ✅ **Resposta (melhor prática):** Sim, é um bug real e clássico de JavaScript. A correção correta é parsear a string manualmente para evitar qualquer interpretação de timezone: `const [y, m, d] = dateStr.split('-').map(Number); return new Date(y, m-1, d)` — o construtor `new Date(year, month, day)` sempre usa timezone local. Aplicar em `daysUntil`, `formatDate`, `CalendarMonth` e `CalendarIcon`. **Prioridade: Alta — afeta exibição de datas para todos os usuários no Brasil.**

---

### Q8 — Vidas: O Que Acontece Quando Chegam a Zero?

Em `ExerciseCard`, as vidas (`lives`) começam em 3 e decrementam a cada erro. Porém, não há nenhuma verificação do tipo "se `lives === 0`, encerre a sessão". O estudante pode continuar respondendo com 0 vidas indefinidamente. O resultado apenas acumula menos pontuação.

**Pergunta:** Qual é o comportamento esperado quando as vidas chegam a zero? Encerrar a sessão forçadamente? Mostrar um estado especial? Ou vidas são apenas cosméticas e o estudante sempre pode terminar?

> ✅ **Resposta (melhor prática):** Para um app educacional voltado a crianças, **não encerrar a sessão forçadamente**. Encerramento forçado é frustrante e desmotivador para o público-alvo. A melhor prática de gamificação educacional (Duolingo, Khan Academy) é: quando vidas chegam a zero, exibir uma tela de encorajamento ("Não desista! Você ainda pode terminar 💪") e permitir continuar, mas sem ganhar estrela 3 (resultado máximo passa a ser 2 estrelas). Isso mantém a motivação sem punir excessivamente. Vidas servem como feedback de performance, não como barreira. **Prioridade: Média.**

---

### Q9 — shuffle() Aplicado às Opções de MultipleChoice Quebra o correctIndex

Em `App.jsx`, as questões são embaralhadas com `shuffle(questions)` ao iniciar a sessão. Isso embaralha a **ordem das questões**, não as opções — isso está correto. Porém, nenhum lugar embaralha as opções dentro de cada questão. O `correctIndex` referencia sempre a posição fixa da resposta correta no array `options[]`. Se alguém resolver embaralhar as opções também no futuro, o `correctIndex` ficará errado para sempre.

**Pergunta:** Deseja adicionar embaralhamento de opções? Se sim, o `correctIndex` precisa ser recalculado dinamicamente, ou as questões precisam usar um campo `correctAnswer: 'texto da resposta'` em vez de índice.

> ✅ **Resposta (melhor prática):** Sim, embaralhar as opções é importante pedagogicamente — evita que o aluno memorize a posição da resposta em vez de aprender o conteúdo. A solução correta é **substituir `correctIndex` por `correctAnswer` (o texto da resposta certa)**. No componente, após embaralhar as opções, compara-se `option === question.correctAnswer` para identificar a correta. Isso é mais robusto e resiliente a qualquer reordenação futura. Migrar todos os arquivos de dados. **Prioridade: Média — requer atualização de todos os arquivos de questões.**

---

### Q10 — FillBlank: Detecção do Blank por String '____'

Em `FillBlank.jsx`, o enunciado com blank é detectado procurando `'____'` (4 underscores) no texto da questão para dividir em prefix/suffix e exibir o input no meio. Se uma questão tiver `___` (3 underscores) ou `_____` (5 underscores), o componente quebra silenciosamente e mostra o texto errado.

**Pergunta:** Quer padronizar com um marcador explícito como `{{BLANK}}` em vez de contar underscores?

> ✅ **Resposta (melhor prática):** Sim. Marcadores explícitos são a forma padrão da indústria (usado por i18next, Handlebars, etc.). Usar `{{BLANK}}` como marcador: é impossível aparecer acidentalmente no texto, é óbvio para quem escrever questões no futuro, e pode suportar múltiplos blanks (`{{BLANK1}}`, `{{BLANK2}}`) se necessário. Atualizar `FillBlank.jsx` e todos os dados de questões que usam `____`. **Prioridade: Média.**

---

### Q11 — SEED_VERSION: Migração Não Tem Rollback e Não é Testada

O sistema de seed em `useProgress.js` compara `stored.version` com `SEED_VERSION`. Se a versão armazenada for menor, as provas padrão são re-injetadas. Porém:
- Não há lógica de migração incremental (v1→v2→v3)
- Se uma versão futura mudar a estrutura de progresso, o progresso do usuário pode ser silenciosamente perdido ou corrompido
- Não há testes para esse sistema

**Pergunta:** Quer implementar migrações versionadas com fallback seguro?

> ✅ **Resposta (melhor prática):** Sim. Implementar um sistema de migrações no padrão `migrate(data, fromVersion, toVersion)` com funções incrementais: `migrations = { 1: (data) => {...}, 2: (data) => {...} }`. Se a migração falhar (try/catch), usar o estado inicial limpo em vez de dados corrompidos — nunca travar o app. Adicionar testes para cada função de migração. Esse padrão é usado por bases de dados móveis (como SQLite no React Native) e é a forma mais segura de evoluir dados persistidos. **Prioridade: Alta — risco de perda de progresso dos usuários.**

---

### Q12 — useStreak: Streak Não é Resetada Corretamente em Dias Perdidos

Em `useStreak.js`, `recordStudy()` verifica se o último estudo foi ontem para manter o streak. Se o usuário estudou há 3 dias, o streak cai para 0 na próxima vez que estudar. Porém, a função só é chamada quando o usuário **completa uma sessão**. Se o usuário entrar no app mas não completar nenhuma sessão (só olhar), o streak não é atualizado nem quebrado — fica "congelado" no último valor.

**Pergunta:** O comportamento atual de streak por sessão completada é intencional? Ou o streak deveria ser baseado em acesso diário (qualquer interação)?

> ✅ **Resposta (melhor prática):** Streak por **sessão completada** é a melhor prática para apps educacionais (é o modelo do Duolingo). Simplesmente abrir o app não deve contar como estudo. Porém, o bug de "streak congelado" deve ser corrigido: ao abrir o app (no `useEffect` inicial), verificar se o último estudo foi há mais de 1 dia — se sim, mostrar uma mensagem de "Sua sequência foi perdida 😢" e resetar o streak. A verificação de quebra de streak deve acontecer na abertura do app, não só na conclusão de sessão. **Prioridade: Média.**

---

### Q13 — TrophyModal: Está Sendo Exibido em Algum Lugar?

O componente `TrophyModal.jsx` existe e está implementado, mas no `App.jsx` não há nenhum import ou uso dele. O sistema de troféus em `useXP.js` tem lógica para detectar quando um troféu é desbloqueado (`unlockedTrophy`), mas esse valor nunca é consumido para mostrar o modal.

**Pergunta:** O TrophyModal é uma feature inacabada? Quer implementar o trigger para exibi-lo quando um troféu é desbloqueado?

> ✅ **Resposta (melhor prática):** Sim, é dead code e deve ser conectado. Código morto é pior do que código inexistente — ocupa espaço mental e pode ser confundido com código funcional. A correção é simples: importar `TrophyModal` no App.jsx, consumir o `unlockedTrophy` retornado por `useXP`, e exibir o modal quando `unlockedTrophy !== null`. Deletar código morto ou implementá-lo — nunca deixar no meio do caminho. **Prioridade: Alta — é uma feature de engajamento importante para crianças.**

---

### Q14 — pdfjs-dist na Dependência de Produção

`pdfjs-dist` está listado em `dependencies` (não `devDependencies`) e tem ~1.3MB. Buscando em todo o código-fonte, **não há nenhum import ou uso de pdfjs-dist** no projeto. É uma dependência morta que aumenta o bundle e a superfície de ataque.

**Pergunta:** Posso remover pdfjs-dist do package.json?

> ✅ **Resposta (melhor prática):** Remover imediatamente. Dependências não utilizadas são um risco de segurança (superfície de ataque desnecessária), aumentam o tempo de `npm install` no CI e confundem desenvolvedores futuros. A regra é: se não usa, remove. Nunca manter dependências "por precaução". **Prioridade: Alta.**

---

### Q15 — CalendarMonth: Navegação de Mês com daysUntil Usando Data Local

Em `CalendarMonth.jsx`, ao colorir os dias com provas, a função que mapeia `exam.date` para uma célula do grid usa `new Date(exam.date)` e compara com o índice do dia no grid. Pelo mesmo problema de fuso horário do Q7, a prova do dia 1 de um mês pode aparecer no dia 31 do mês anterior no calendário.

**Pergunta:** Confirma que quer corrigir junto com o Q7?

> ✅ **Resposta (melhor prática):** Sim, corrigir junto com Q7 em um único commit. Criar uma função utilitária centralizada `parseLocalDate(dateStr)` em `src/utils/dates.js` que todos os componentes usam — evita corrigir o mesmo bug em múltiplos lugares. **Prioridade: Alta.**

---

### Q16 — AddExam: Formulário Aceita Datas no Passado

O formulário de adicionar prova em `App.jsx` não valida se a data inserida é no passado. Um usuário pode adicionar uma "prova" para 01/01/2020, que vai aparecer no calendário e gerar alertas confusos.

**Pergunta:** Quer adicionar validação de data mínima (hoje ou amanhã) no formulário?

> ✅ **Resposta (melhor prática):** Sim. Validação de dados na entrada é uma prática fundamental — nunca confiar que o usuário vai inserir dados válidos. Usar `min={new Date().toISOString().split('T')[0]}` no input date (nativo HTML5) para bloquear datas passadas no seletor. Adicionar também validação programática antes de salvar. **Prioridade: Média.**

---

### Q17 — getUpcomingExams: Exames com endDate Não São Exibidos Corretamente

Em `useProgress.js`, `getUpcomingExams(30)` retorna provas nos próximos 30 dias. Para o OBICT (que tem `date: '2026-03-23'` e `endDate: '2026-04-05'`), o alerta de home mostra a data de início como referência. Se hoje for 01/04, o exame já passou da data de início mas ainda está no prazo — e pode não aparecer nos alertas porque `daysUntil(exam.date)` seria negativo.

**Pergunta:** Como deveria funcionar o alerta para exames com período? Usar `endDate` como referência para o alerta enquanto o período estiver ativo?

> ✅ **Resposta (melhor prática):** Lógica correta: se o exame tem `endDate`, ele está "ativo" enquanto `hoje >= date && hoje <= endDate`. O alerta deve aparecer durante todo esse período, usando `endDate` como referência para a contagem regressiva ("X dias para o prazo final"). Se não tem `endDate`, funciona como hoje — alerta só aparece antes da data. **Prioridade: Alta — afeta diretamente o OBICT que está em andamento.**

---

## ⚡ PERFORMANCE

---

### Q18 — Imagens de Mascote Não Otimizadas (1.2MB–1.5MB cada)

O build atual inclui 5 imagens PNG do Patito com tamanho entre **1.27MB e 1.49MB cada** — total de ~7MB apenas no mascote. Em conexões móveis lentas (o público-alvo pode usar celulares básicos), o app vai demorar para carregar.

**Pergunta:** Quer converter as imagens para WebP e/ou reduzir resolução? Posso automatizar isso no processo de build.

> ✅ **Resposta (melhor prática):** Sim, conversão para WebP é imprescindível. WebP reduz o tamanho em 70-80% vs PNG com qualidade visual equivalente — as 5 imagens passariam de ~7MB para ~1.5MB total. Usar `vite-plugin-imagemin` para automatizar no build. Além disso, usar `loading="lazy"` e `<picture>` com fallback para navegadores que não suportam WebP. Para mascotes que aparecem em tamanhos menores (sm, md), servir versões redimensionadas. **Prioridade: Alta — impacto direto no tempo de carregamento para o público-alvo.**

---

### Q19 — Sem Code Splitting / Lazy Loading

Todo o código (todos os componentes, todos os dados das 11 matérias) é carregado em um único bundle de 243KB (gzip: 78KB). À medida que o conteúdo crescer (mais matérias, mais questões), esse bundle vai crescer linearmente sem nenhum mecanismo de divisão de código.

**Pergunta:** Quer implementar `React.lazy()` e `Suspense` para carregar views e dados de matérias sob demanda?

> ✅ **Resposta (melhor prática):** Sim, mas com priorização. O bundle atual de 78KB (gzip) é aceitável agora. A prioridade é fazer lazy loading dos **dados de questões** (que vão crescer muito mais que o código). Cada matéria deve ser um import dinâmico: `const { matematica } = await import('./data/matematica')` — carregado só quando o usuário abrir aquela matéria. Para os componentes de view, `React.lazy()` é a segunda etapa. **Prioridade: Média — implementar quando o bundle ultrapassar 150KB gzip.**

---

### Q20 — Todos os Dados de Matérias São Importados na Inicialização

`App.jsx` importa `matematica`, `obict` e `obli` diretamente no topo. As outras matérias (`portugues`, `ingles`, etc.) existem como arquivos mas ainda não são importadas. Quando forem adicionadas, o bundle vai crescer. Nenhuma matéria é carregada sob demanda.

**Pergunta:** Confirma que isso deve ser resolvido junto com o Q19 (lazy loading)?

> ✅ **Resposta (melhor prática):** Sim, resolver junto com Q19. O design correto é: `SUBJECTS` contém apenas metadados (id, nome, cor, ícone, calendarOnly) e um `loader: () => import('./data/matematica')`. Quando o usuário navega para uma matéria, o loader é chamado e os tópicos são injetados dinamicamente. **Prioridade: Média.**

---

### Q21 — CalendarMonth Sem Memoização

`CalendarMonth` é um componente que renderiza um grid de até 42 células com lógica complexa de posicionamento de dias e dots de provas. Ele é filho de `App.jsx` e re-renderiza toda vez que qualquer estado do App muda (inclusive estados não relacionados ao calendário). Não há `React.memo()` ou `useMemo()` aplicados.

**Pergunta:** Quer aplicar memoização nos componentes pesados (CalendarMonth, SubjectCard, TopicTrail)?

> ✅ **Resposta (melhor prática):** Sim, mas com cuidado. A regra de ouro de performance em React é: **medir antes de otimizar**. `React.memo()` deve ser aplicado em componentes que: (a) renderizam frequentemente, (b) recebem as mesmas props na maioria das re-renderizações e (c) têm renderização cara. CalendarMonth claramente atende os três critérios. SubjectCard e TopicTrail também. Usar React DevTools Profiler para medir antes e depois. **Prioridade: Baixa — resolver após Q1/Q4 que eliminam re-renders desnecessários.**

---

## 🔒 SEGURANÇA

---

### Q22 — Nenhuma Sanitização de Input do Usuário

O nome do usuário inserido no Onboarding é armazenado diretamente no localStorage e exibido com `{userName}` em JSX. Como o JSX automaticamente escapa HTML, isso não é uma vulnerabilidade de XSS no contexto atual. Porém, não há limite de tamanho para o campo (poderia armazenar milhares de caracteres), e nenhum filtro de caracteres especiais.

**Pergunta:** Quer adicionar validação de tamanho máximo (ex: 30 caracteres) e caracteres permitidos no campo de nome?

> ✅ **Resposta (melhor prática):** Sim. Validação de inputs é prática padrão independente do risco de XSS. Aplicar: `maxLength={30}` no input (HTML nativo), trim() antes de salvar (evita nomes com apenas espaços), e regex básico para permitir apenas letras, espaços e acentos (`/^[a-zA-ZÀ-ÿ\s]{1,30}$/`). Simples, efetivo e não é over-engineering. **Prioridade: Média.**

---

### Q23 — exam.content e exam.notes Sem Validação

Ao adicionar uma prova manualmente, os campos `content` e `notes` aceitam qualquer texto sem limite de tamanho. Esses valores são armazenados no localStorage e exibidos diretamente no app. Embora não sejam enviados para servidor, podem ser usados para explorar edge cases de layout.

**Pergunta:** Quer adicionar validação de tamanho máximo nos campos do formulário de prova?

> ✅ **Resposta (melhor prática):** Sim, limites de tamanho são boa prática independente do contexto. `content` máximo de 200 caracteres, `notes` máximo de 150 caracteres. Usar `maxLength` no input e trim() ao salvar. **Prioridade: Baixa.**

---

### Q24 — localStorage Como Único Armazenamento

Todo o estado persistido (progresso, XP, streaks, provas, nome) fica no localStorage. Isso significa:
- Limpar dados do browser apaga tudo (sem aviso)
- Não há backup
- Não há sincronização entre dispositivos
- Não há separação por usuário (se duas pessoas usarem o mesmo browser, compartilham progresso)

**Pergunta:** Há planos de implementar um backend com autenticação para sincronizar progresso entre dispositivos? Ou o app deve continuar sendo 100% local?

> ✅ **Resposta (melhor prática):** Para o estágio atual, manter 100% local é a decisão correta — um backend adicionaria: custo de infraestrutura, complexidade de autenticação, LGPD/privacidade de dados de menores, e tempo de desenvolvimento. A melhoria de curto prazo é: (a) mostrar aviso antes de limpar dados do browser (Q46 — tela de configurações com aviso), e (b) oferecer export/import de progresso em JSON para backup manual. Backend pode ser considerado no futuro se o app escalar para múltiplas turmas. **Prioridade: Baixa para backend. Média para aviso de perda de dados.**

---

## 🧪 TESTES

---

### Q25 — App.jsx Sem Nenhum Teste

O componente mais crítico do sistema — `App.jsx` com 756 linhas — não tem nenhum teste. Não há testes para: fluxo de onboarding, navegação entre views, início e conclusão de sessão, cálculo de resultado, adição de provas ao calendário.

**Pergunta:** Quer que eu crie testes de integração para os fluxos principais de App.jsx?

> ✅ **Resposta (melhor prática):** Sim. Os fluxos críticos que devem ter testes de integração: (1) Onboarding → Home (nome salvo corretamente), (2) Home → Subject → Session → Result (fluxo completo de estudo), (3) Adicionar prova → aparece no calendário, (4) Sessão com 3 erros (comportamento de vidas). Após a refatoração de Q1 (pages separadas), cada page pode ser testada de forma isolada, o que facilita muito. **Prioridade: Alta — resolver após Q1.**

---

### Q26 — Hooks Sem Testes

`useProgress.js`, `useStreak.js` e `useXP.js` são os hooks mais importantes do sistema e nenhum deles tem testes. Qualquer mudança neles pode quebrar o progresso silenciosamente.

**Pergunta:** Quer testes unitários para os hooks usando `renderHook` do Testing Library?

> ✅ **Resposta (melhor prática):** Sim, é prioridade máxima em testes. Hooks de negócio são o coração da aplicação. Testes para: `useProgress` (salvar progresso, recuperar, migrar versão), `useStreak` (manter streak, quebrar streak, resetar), `useXP` (acumular XP, subir de nível, desbloquear troféu). Usar `renderHook` + mock de localStorage. **Prioridade: Alta.**

---

### Q27 — Sem Medição de Cobertura de Testes

O projeto tem 33 testes mas não mede cobertura. Não sabemos que % do código é coberto por testes. O Vitest suporta coverage nativo com `--coverage`.

**Pergunta:** Quer adicionar relatório de coverage ao script de testes e ao CI?

> ✅ **Resposta (melhor prática):** Sim. Adicionar `@vitest/coverage-v8` e configurar: `"test:coverage": "vitest run --coverage"` no package.json. No CI, exibir o relatório como artefato. Definir threshold mínimo de 60% para começar (subindo gradualmente para 80%). Coverage sem threshold é apenas relatório — threshold é o que cria responsabilidade. **Prioridade: Média.**

---

### Q28 — Sem Testes E2E

Não há testes end-to-end (Playwright ou Cypress). O único teste de integração existente simula interação via Testing Library, mas não testa o fluxo real no browser.

**Pergunta:** Quer adicionar testes E2E com Playwright para os fluxos críticos?

> ✅ **Resposta (melhor prática):** Playwright é a melhor escolha (mais rápido que Cypress, suporte nativo a múltiplos browsers). Porém, E2E tem custo alto de manutenção — para o tamanho atual do projeto, priorizar os testes de integração (Q25) e hooks (Q26) primeiro. E2E deve cobrir apenas os 2-3 fluxos mais críticos: onboarding completo e sessão de estudo completa. Adicionar ao roadmap para quando o app tiver mais usuários. **Prioridade: Baixa — implementar após Q25 e Q26.**

---

### Q29 — Dados das Matérias Sem Validação de Estrutura

As matérias (`matematica.js`, `obli.js`, `obict.js`) exportam objetos com questões. Não há validação que garanta que cada questão tem os campos obrigatórios (`id`, `type`, `question`, `options`, `correctIndex`). Um typo em um campo pode causar erro silencioso em runtime.

**Pergunta:** Quer criar um schema de validação (ex: com Zod) ou pelo menos um teste que valide a estrutura de todas as questões?

> ✅ **Resposta (melhor prática):** Sim. A solução pragmática (sem adicionar Zod): um único arquivo de teste `src/data/__tests__/questions.test.js` que importa todos os arquivos de dados e verifica que cada questão tem os campos obrigatórios com os tipos corretos. Isso cobre o risco sem overhead de uma biblioteca de schema. Se o projeto migrar para TypeScript (Q6), os tipos substituem esse teste. **Prioridade: Alta — previne bugs silenciosos em produção.**

---

## 📦 QUALIDADE DE CÓDIGO

---

### Q30 — Fórmula de XP Hardcoded e Não Documentada

`calcXP` em `scoring.js`: `base(20) + correct*10 + perfectBonus(50)`. Para uma sessão de 10 questões com tudo certo: 20 + 100 + 50 = **170 XP**. Para uma sessão de 18 questões (OBLI): 20 + 180 + 50 = **250 XP**. Para 0 acertos: 20 XP. Esses valores não têm documentação explicando a intenção por trás deles.

**Pergunta:** A fórmula de XP está como você quer? Devo documentar os valores com comentários explicando o design?

> ✅ **Resposta (melhor prática):** Documentar com constantes nomeadas e comentário de design. Extrair os valores mágicos para constantes: `const XP_BASE = 20`, `const XP_PER_CORRECT = 10`, `const XP_PERFECT_BONUS = 50`. Adicionar um comentário explicando a intenção: "Base garante que qualquer participação gera XP. Bonus por acerto incentiva qualidade. Bônus de perfeição incentiva excelência." Código deve comunicar intenção, não apenas mecanismo. **Prioridade: Baixa.**

---

### Q31 — calcStars com Limiar Arbitrário de 70%

`calcStars` dá 3 estrelas para 100%, 2 estrelas para ≥70%, e 1 estrela para abaixo de 70%. Não há 0 estrelas (o aluno sempre ganha pelo menos 1). O limiar de 70% para 2 estrelas não é documentado.

**Pergunta:** Esses valores estão corretos? Faz sentido ter uma categoria de 0 estrelas (sessão reprovada)?

> ✅ **Resposta (melhor prática):** 0 estrelas não deve existir para o público-alvo (crianças de 10 anos). Psicologicamente, sempre ganhar pelo menos 1 estrela mantém a motivação. O limiar de 70% é um padrão educacional (nota de aprovação no Brasil = 5/10 = 50%, mas apps gamificados usam 70% para 2 estrelas e 100% para 3 — isso é correto e alinhado com o Duolingo). Documentar os limiares com constantes nomeadas igual ao Q30. **Prioridade: Baixa.**

---

### Q32 — IDs de Questões São Strings Manuais e Podem Colidir

As questões têm IDs como `'obli-1-q1'`, `'obict-2-q3'`, `'mat-1-q5'`. Esses IDs são definidos manualmente em cada arquivo de dados. Se dois arquivos usarem o mesmo ID, o progresso de uma matéria pode sobrescrever o de outra no localStorage sem nenhum aviso.

**Pergunta:** Quer implementar geração automática de IDs ou pelo menos um teste que verifique unicidade de IDs entre todas as questões?

> ✅ **Resposta (melhor prática):** Teste de unicidade de IDs (resolver junto com Q29). É o custo mais baixo com o maior benefício: um teste que importa todos os arquivos de dados, coleta todos os IDs de questões e verifica se há duplicatas. Geração automática de IDs com UUID adicionaria complexidade desnecessária — os IDs manuais com convenção de nomenclatura clara (`{materia}-{fase}-q{numero}`) são suficientes, contanto que sejam verificados por teste. **Prioridade: Alta — resolver junto com Q29.**

---

### Q33 — Componente ExerciseCard Faz Coisas Demais

`ExerciseCard.jsx` (75 linhas) renderiza: barra de vidas, contador de XP, barra de progresso, questão (delegando para MultipleChoice/TrueFalse/FillBlank/Flashcard), FeedbackPanel e XPToast. São responsabilidades demais para um único componente.

**Pergunta:** Quer refatorar ExerciseCard para separar a lógica de sessão da renderização?

> ✅ **Resposta (melhor prática):** Sim, resolver junto com Q5. O ExerciseCard deve ser um componente "burro" de UI que recebe dados via SessionContext e apenas renderiza. A lógica de sessão (controlar vidas, acumular XP, avançar questão, detectar fim) deve estar em um `useSession` hook. Isso torna ExerciseCard testável e permite reutilizar a lógica de sessão em outros contextos futuros. **Prioridade: Alta — resolver junto com Q1 e Q4.**

---

### Q34 — Espaço Reservado para FeedbackPanel com Altura Hardcoded

Em `ExerciseCard`, quando o feedback aparece, é adicionado um `<div className="h-40" />` (160px) para compensar o painel fixo. Esse valor é hardcoded e pode não corresponder à altura real do FeedbackPanel em diferentes tamanhos de tela ou quando a explicação é longa.

**Pergunta:** Quer implementar um cálculo dinâmico da altura do placeholder baseado no tamanho real do painel?

> ✅ **Resposta (melhor prática):** Sim. Usar `useRef` no FeedbackPanel e `ResizeObserver` para medir a altura real do painel, sincronizando com o placeholder via CSS custom property ou passando o valor via Context. Alternativa mais simples: usar `padding-bottom` no scroll container igual à altura do painel medida com `getBoundingClientRect()`. Heights hardcoded são frágeis — quebram com mudanças de conteúdo ou tamanho de tela. **Prioridade: Média.**

---

### Q35 — Animação de Confetti Usa Posições Aleatórias em Cada Render

`Confetti.jsx` gera 40 peças com `Math.random()` para posição e delay diretamente no JSX, sem `useMemo`. Isso significa que em React StrictMode (que renderiza duas vezes em desenvolvimento), o confetti é gerado com valores diferentes entre renders, podendo causar inconsistência visual.

**Pergunta:** Quer aplicar `useMemo` para memoizar as peças de confetti?

> ✅ **Resposta (melhor prática):** Sim. `useMemo(() => generatePieces(), [])` é a solução correta — as peças são geradas uma única vez na montagem do componente e não mudam entre re-renders. É uma correção de 2 linhas com impacto visual significativo em StrictMode (development). **Prioridade: Baixa.**

---

### Q36 — XPToast Usa setTimeout Sem Cleanup

`XPToast.jsx` provavelmente usa `setTimeout` para sumir após alguns segundos. Se o componente for desmontado antes do timeout expirar (usuário navega para outra tela), o callback ainda será chamado em um componente já desmontado — gerando warning de memory leak.

**Pergunta:** Quer revisar e adicionar cleanup (`clearTimeout` no useEffect return) em todos os componentes que usam setTimeout?

> ✅ **Resposta (melhor prática):** Sim, é uma prática obrigatória. Todo `setTimeout` dentro de `useEffect` deve ter `return () => clearTimeout(id)` no cleanup. O mesmo vale para `setInterval`, `requestAnimationFrame`, subscriptions e event listeners. Fazer uma varredura em todos os componentes que usam timers. **Prioridade: Média.**

---

## 📚 CONTEÚDO E DADOS

---

### Q37 — Conteúdo das Matérias: Fidelidade ao Currículo do 4º Ano

Os arquivos `portugues.js`, `ingles.js`, `historia.js`, `ciencias.js`, `geografia.js` e `ensino-religioso.js` existem como arquivos mas seus tópicos e questões **podem não corresponder ao conteúdo real das provas do Colégio Salesiano Dom Bosco**. Por exemplo, `historia.js` tem tópicos "Brasil Colonial" e "Império Brasileiro" — é isso mesmo que está no currículo do 4º ano?

**Pergunta:** Esses conteúdos foram validados com o material escolar real do Bento? Quais matérias precisam de revisão de conteúdo?

> ✅ **Resposta (melhor prática):** O conteúdo educacional deve sempre ser validado com a fonte primária — neste caso, o material didático real do Bento e o cronograma de conteúdos das provas (que já existe no `semesterExams.js`). O `semesterExams.js` é a fonte mais confiável que temos: ele já lista os conteúdos exatos de cada prova. Os arquivos de questões devem ser alinhados com esses conteúdos. Todas as matérias sem questões validadas (`portugues`, `historia`, `ciencias`, `geografia`, `ingles`, `ensino-religioso`) precisam ser revisadas e preenchidas com questões baseadas no material real da escola. **Prioridade: Alta — é o core value do produto.**

---

### Q38 — matematica.js: Apenas 2 dos 6 Tópicos Implementados

O plano original era 6 fases para Matemática (Números até 100k, Adição/Subtração, Multiplicação, Divisão, Frações/Geometria, Medidas/Dinheiro/Gráficos). O arquivo atual tem apenas 2 tópicos. Os outros 4 tópicos não existem ainda.

**Pergunta:** Quer que eu implemente os 4 tópicos restantes de Matemática?

> ✅ **Resposta (melhor prática):** Sim. Conteúdo incompleto reduz o valor do produto. Os 4 tópicos restantes (Multiplicação, Divisão, Frações/Geometria, Medidas/Dinheiro/Gráficos) devem ser implementados com 10 questões cada, baseados no conteúdo das provas listado em `semesterExams.js`. **Prioridade: Alta.**

---

### Q39 — Matérias Sem Conteúdo Aparecem Como "Em Breve"

Matérias com `topics: []` aparecem em dois lugares: na seção "Em Breve" (chips) E no SubjectCard de "Outras Matérias" se tiverem OBICT/OBLI com conteúdo. A lógica de quais matérias aparecem onde pode ser confusa.

**Pergunta:** A divisão atual entre "Em Breve" (sem tópicos) e "Outras Matérias" (com tópicos) está como você quer? Quer ajustar a lógica de exibição?

> ✅ **Resposta (melhor prática):** A lógica atual é correta conceitualmente — "Em Breve" comunica expectativa de conteúdo futuro, que é melhor do que simplesmente esconder as matérias. Porém, conforme as matérias forem sendo preenchidas (Q37, Q38), a seção "Em Breve" vai naturalmente desaparecer. Nenhuma mudança de lógica necessária além de preencher o conteúdo. **Prioridade: Baixa — resolver organicamente com Q37.**

---

### Q40 — ScheduleView Não Trata Robótica Quinzenal com Informação de Semana

O horário de Quarta (dia 3) tem `{ time: '16h20', subject: 'Robótica/Matemática', quinzenal: true }`. O badge "Quinzenal" aparece, mas não há como o app saber **se esta semana específica é semana de Robótica ou de Matemática**.

**Pergunta:** Quer implementar um sistema para definir a semana de referência (ímpar/par) e mostrar qual aula será em cada dia específico? Ou o badge "Quinzenal" como aviso é suficiente?

> ✅ **Resposta (melhor prática):** Implementar paridade de semana. A solução é simples: definir uma "semana de referência" (ex: semana do início das aulas = semana A) em `schedule.js`, calcular se a semana atual é A ou B com base no número de semanas desde a referência, e exibir "Robótica" ou "Matemática" conforme a paridade. O badge "Quinzenal" sozinho deixa o aluno sem informação útil. **Prioridade: Média.**

---

### Q41 — Schedule Não Trata Feriados ou Recessos Escolares

`ScheduleView` e o card "Aulas de hoje" na Home mostram as aulas de qualquer dia sem considerar feriados nacionais, recessos ou eventos do colégio.

**Pergunta:** Quer adicionar um arquivo `src/data/holidays.js` com os feriados do ano letivo para que o app exiba "Sem aulas hoje — Feriado" nesses dias?

> ✅ **Resposta (melhor prática):** Sim. Um `src/data/holidays.js` com as datas de feriados nacionais e do calendário escolar do Salesiano é simples de implementar e muito útil. O card "Aulas de hoje" deve exibir "🎉 Sem aulas hoje — Feriado!" nesses dias. A lista de feriados nacionais de 2026 é pública e pode ser hardcoded. **Prioridade: Média.**

---

## 🚀 DEPLOY E INFRAESTRUTURA

---

### Q42 — CI Não Verifica Cobertura de Testes nem Roda Lint

O workflow atual faz: install → test → build. Não há lint no CI, coverage mínima exigida, nem verificação de bundle size.

**Pergunta:** Quer enriquecer o CI com lint e coverage mínima?

> ✅ **Resposta (melhor prática):** Sim. Pipeline ideal: install → **lint** → test + coverage → build → **verificar bundle size**. Adicionar `eslint` ao script de CI (com `--max-warnings 0` para que warnings quebrem o build), `vitest --coverage` com threshold de 60%, e `bundlesize` ou `size-limit` para alertar se o bundle ultrapassar um limite definido. CI deve ser a rede de segurança automática que impede regressões. **Prioridade: Alta.**

---

### Q43 — Sem PWA (Progressive Web App)

O app não tem Service Worker, manifest.json adequado, nem suporte offline.

**Pergunta:** Quer transformar o Patito em PWA com suporte a offline?

> ✅ **Resposta (melhor prática):** Sim, PWA é altamente recomendado para este tipo de app. Usar `vite-plugin-pwa` (Workbox) para: (a) Service Worker que cacheia assets estáticos — o app funciona offline após o primeiro acesso, (b) `manifest.json` com ícones para "Adicionar à tela inicial" no iOS e Android, (c) splash screen com o Patito. Para crianças que estudam em locais com Wi-Fi instável (sala de aula, casa), offline-first é uma funcionalidade crítica. **Prioridade: Alta.**

---

### Q44 — Sem Variáveis de Ambiente

Não há `.env` nem `import.meta.env` usado em nenhum lugar. `SEED_VERSION` e outras configurações são hardcoded.

**Pergunta:** Quer adotar variáveis de ambiente para configurações que podem variar por ambiente?

> ✅ **Resposta (melhor prática):** Sim para o futuro, mas sem over-engineering agora. O próximo passo é criar `.env.development` e `.env.production` para: `VITE_SEED_VERSION`, `VITE_SENTRY_DSN` (Q45), e eventuais feature flags (`VITE_ENABLE_BETA_FEATURES`). Por enquanto, apenas mover `SEED_VERSION` para variável de ambiente é suficiente. Não criar arquivos `.env` vazios "por precaução". **Prioridade: Baixa.**

---

### Q45 — Sem Monitoramento de Erros em Produção

O app está em produção no Vercel mas não tem sistema de monitoramento de erros.

**Pergunta:** Quer integrar Sentry ou similar?

> ✅ **Resposta (melhor prática):** Sim. Sentry tem tier gratuito generoso e integração trivial com Vite (`@sentry/vite-plugin`). Um `ErrorBoundary` no nível do App.jsx captura erros de renderização e os envia ao Sentry com stacktrace completo. Sem monitoramento, é impossível saber se usuários estão encontrando erros em produção. Para um app com crianças como usuários (que não vão reportar bugs), monitoramento é essencial. **Prioridade: Alta.**

---

## 🎮 UX E FUNCIONALIDADES

---

### Q46 — Sem Forma de Resetar o Progresso

Não há botão de "Recomeçar" na UI — só via DevTools.

**Pergunta:** Quer adicionar uma tela de configurações com opção de resetar o progresso?

> ✅ **Resposta (melhor prática):** Sim. Uma tela de Configurações (acessível pelo Header ou BottomNav) com: trocar nome de usuário, exportar progresso como JSON, importar progresso de JSON, e "Resetar tudo" (com confirmação dupla — "Tem certeza? Isso apaga todo seu progresso"). É uma feature de básica de produto que qualquer app com persistência local deve ter. **Prioridade: Média.**

---

### Q47 — Sem Suporte a Múltiplos Usuários

Se dois alunos usarem o mesmo dispositivo, o progresso se mistura.

**Pergunta:** Isso é um cenário real? Quer suporte a múltiplos perfis locais?

> ✅ **Resposta (melhor prática):** Para o cenário atual (app pessoal do Bento), múltiplos perfis não são necessários. Porém, se o app for usado em um tablet compartilhado na sala de aula, isso seria um problema. A solução pragmática de curto prazo: prefixar as chaves do localStorage com o nome do usuário (`patito_Bento_progress`). Isso cria separação implícita entre usuários sem implementar um sistema de contas. **Prioridade: Baixa — reavaliar se o uso expandir para sala de aula.**

---

### Q48 — ResultScreen: "Continuar" Volta Para Onde?

"Continuar" sempre vai para o subject, independente de onde o usuário veio.

**Pergunta:** Quer implementar navegação com histórico?

> ✅ **Resposta (melhor prática):** Sim. Implementar uma pilha de navegação simples (stack de `[view, params]`) ou usar o histórico do React Router (Q2). Quando o usuário clica "Continuar", deve voltar ao contexto anterior (trilha de tópicos se veio de lá, Home se veio da Home). É a experiência esperada em qualquer app mobile — o usuário não deve perder o contexto após completar uma ação. **Prioridade: Média — resolver junto com Q2.**

---

### Q49 — Header: CalendarIcon Clicável Sem Affordance Visual

O ícone de calendário no Header parece idêntico aos alertas de prova — o usuário não percebe que é clicável.

**Pergunta:** Quer adicionar affordance visual mais claro?

> ✅ **Resposta (melhor prática):** Sim. Adicionar `cursor-pointer`, `hover:scale-110` e `aria-label="Ver calendário de provas"`. Considerar adicionar um label de texto "Provas" abaixo do ícone, similar ao BottomNav. A affordance visual é uma das regras mais fundamentais de UX — elementos interativos devem parecer interativos. **Prioridade: Baixa.**

---

### Q50 — Sem Acessibilidade (a11y) Mínima

Sem `aria-label`, roles, ou suporte a leitores de tela.

**Pergunta:** Quer implementar acessibilidade mínima (WCAG AA)?

> ✅ **Resposta (melhor prática):** Sim, implementar o mínimo viável de acessibilidade: `aria-label` em todos os botões com apenas ícone, `role="main"` nas áreas de conteúdo principal, `alt` descritivo nas imagens do mascote, navegação por teclado no Flashcard (tecla `Space` para virar), e verificação básica de contraste com `eslint-plugin-jsx-a11y`. WCAG AA completo é um esforço maior, mas o mínimo descrito acima cobre os casos mais críticos. **Prioridade: Média.**

---

### Q51 — Flashcard Sem Instrução Sobre Como Interagir

Não há indicação visual de que o card é clicável para virar.

**Pergunta:** Quer adicionar uma dica visual?

> ✅ **Resposta (melhor prática):** Sim. Adicionar: `cursor-pointer` no card, um hint "👆 Toque para ver a resposta" na primeira vez que o Flashcard aparece (exibido uma vez, salvo no localStorage), e uma animação sutil de "wiggle" na primeira aparição. Componentes com interações não-óbvias sempre precisam de affordance explícita, especialmente para o público infantil. **Prioridade: Média.**

---

### Q52 — Sem Persistência da Aba Ativa do BottomNav

Recarregar a página sempre volta para a Home.

**Pergunta:** Quer persistir a aba ativa?

> ✅ **Resposta (melhor prática):** Resolver junto com Q2 (React Router) — com URLs reais, o browser gerencia isso automaticamente. Sem React Router, salvar a view ativa no `sessionStorage` (não localStorage — deve resetar ao fechar o browser) é a solução. `sessionStorage` mantém o estado durante a sessão do browser sem persistir para sempre. **Prioridade: Baixa — resolver junto com Q2.**

---

### Q53 — Sem Feedback Quando Tópico é Desbloqueado

O cadeado simplesmente some na próxima vez que o usuário abre a tela de tópicos.

**Pergunta:** Quer adicionar micro-animação de desbloqueio?

> ✅ **Resposta (melhor prática):** Sim. Momentos de desbloqueio são oportunidades de engajamento e motivação — especialmente para crianças. Implementar: ao entrar na tela de Subject após completar um tópico, o próximo tópico bloqueado exibe uma animação de "unlock" (cadeado se abrindo, brilho dourado, som opcional). Salvar no estado qual tópico acabou de ser desbloqueado para disparar a animação apenas uma vez. **Prioridade: Média.**

---

### Q54 — Sem Indicação de Progresso em Retentativa

Ao refazer um tópico já completado, parece que está começando do zero.

**Pergunta:** Quer exibir o melhor resultado anterior?

> ✅ **Resposta (melhor prática):** Sim. Na tela de Subject (TopicTrail), já existe a indicação de estrelas para tópicos completados. Ao iniciar uma retentativa, exibir no cabeçalho da sessão: "🌟 Seu recorde: 2 estrelas. Consegue 3?" — isso cria motivação para melhorar. No ResultScreen após retentativa, comparar com o melhor anterior: "🎉 Novo recorde! Você melhorou de 2 para 3 estrelas!" É uma feature de engajamento de alto impacto com implementação simples. **Prioridade: Média.**

---

## 📊 Resumo de Prioridades

### 🔴 Alta Prioridade (implementar primeiro)
| # | Título |
|---|--------|
| Q1 | Dividir App.jsx em pages |
| Q2 | Adicionar React Router |
| Q3 | Mover dados estáticos para arquivos separados |
| Q4 | Implementar Context API + useReducer |
| Q5 | Resolver prop drilling com SessionContext |
| Q7 | Corrigir bug de fuso horário |
| Q11 | Migrações versionadas do localStorage |
| Q13 | Conectar TrophyModal ao useXP |
| Q14 | Remover pdfjs-dist |
| Q15 | Corrigir CalendarMonth (junto com Q7) |
| Q17 | Lógica de endDate nos alertas |
| Q18 | Otimizar imagens do mascote para WebP |
| Q25 | Testes de integração para App.jsx |
| Q26 | Testes unitários para os hooks |
| Q29 | Validação de estrutura das questões + unicidade de IDs |
| Q32 | Teste de unicidade de IDs (junto com Q29) |
| Q33 | Refatorar ExerciseCard (junto com Q1) |
| Q37 | Validar conteúdo das matérias com currículo real |
| Q38 | Implementar 4 tópicos restantes de Matemática |
| Q42 | Enriquecer CI com lint e coverage |
| Q43 | Implementar PWA com suporte offline |
| Q45 | Integrar Sentry para monitoramento em produção |

### 🟡 Média Prioridade (próxima sprint)
| # | Título |
|---|--------|
| Q6 | Migrar para TypeScript progressivamente |
| Q8 | Comportamento de vidas zeradas |
| Q9 | Embaralhar opções + migrar para correctAnswer |
| Q10 | Marcador `{{BLANK}}` no FillBlank |
| Q12 | Verificação de quebra de streak na abertura |
| Q16 | Validação de data mínima no AddExam |
| Q22 | Validação de tamanho e formato do nome |
| Q27 | Coverage report com threshold |
| Q34 | Altura dinâmica do FeedbackPanel placeholder |
| Q36 | Cleanup de setTimeout em todos os componentes |
| Q40 | Paridade de semana para Robótica quinzenal |
| Q41 | Feriados e recessos no ScheduleView |
| Q46 | Tela de configurações com reset de progresso |
| Q48 | Histórico de navegação no ResultScreen |
| Q50 | Acessibilidade mínima (aria-labels, contraste) |
| Q51 | Dica visual no Flashcard |
| Q53 | Micro-animação de desbloqueio de tópico |
| Q54 | Indicação de recorde em retentativas |

### 🟢 Baixa Prioridade (backlog)
| # | Título |
|---|--------|
| Q19 | Code splitting / Lazy loading |
| Q20 | Lazy loading de dados de matérias |
| Q21 | Memoização de componentes pesados |
| Q23 | Validação de tamanho de exam.content/notes |
| Q24 | Backend / sincronização (avaliar no futuro) |
| Q28 | Testes E2E com Playwright |
| Q30 | Documentar fórmula de XP com constantes nomeadas |
| Q31 | Documentar limiares de estrelas |
| Q35 | useMemo no Confetti |
| Q39 | Lógica de "Em Breve" (resolve organicamente) |
| Q44 | Variáveis de ambiente |
| Q47 | Múltiplos perfis (reavaliar com expansão) |
| Q49 | Affordance visual do CalendarIcon no Header |
| Q52 | Persistência da aba ativa (resolve com Q2) |

---

*Total: 54 questões respondidas com base em melhores práticas de desenvolvimento de software.*
*Próximo passo: implementar itens de Alta Prioridade em ordem, começando por Q1→Q2→Q3→Q4.*
