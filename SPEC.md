# SPEC.md — App de Estudos: 4º Ano do Ensino Fundamental

## 1. Visão Geral

App educacional gamificado para auxiliar alunos do 4º ano do Ensino Fundamental brasileiro a revisar e fixar conteúdos de todas as matérias da grade curricular. Inspirado na experiência do Duolingo: sessões curtas, feedback imediato, recompensas e progresso visível.

**Usuário primário:** Criança de 9–10 anos  
**Plataforma:** Web responsiva (mobile-first), deploy via Netlify ou Vercel  
**Stack:** React + Vite, Tailwind CSS, localStorage para persistência  

---

## 2. Matérias

| Matéria | Ícone sugerido | Cor |
|---|---|---|
| Português | 📝 | Azul |
| Matemática | 🔢 | Verde |
| Geografia | 🌍 | Laranja |
| Inglês | 🇬🇧 | Roxo |
| Ciências | 🔬 | Ciano |
| História | 📜 | Marrom |
| Ensino Religioso | ✨ | Amarelo |

---

## 3. Tipos de Exercício

Todos os tipos devem funcionar em todas as matérias:

### 3.1 Múltipla Escolha
- 1 pergunta + 4 alternativas (A, B, C, D)
- Feedback imediato: verde (acerto) / vermelho (erro) + explicação curta
- Avança automaticamente após 1.5s

### 3.2 Verdadeiro ou Falso
- 1 afirmação + 2 botões grandes (✅ Verdadeiro / ❌ Falso)
- Feedback imediato com explicação

### 3.3 Complete a Frase
- Frase com lacuna ( ___ )
- 4 opções de palavra/número para preencher
- Feedback imediato

### 3.4 Flashcard
- Frente: pergunta ou conceito
- Verso: resposta (virar com animação flip)
- Botões: "Errei" / "Acertei" para tracking
- Usado principalmente para vocabulário (Inglês, Português) e datas (História)

---

## 4. Fluxo de Navegação

```
Tela Inicial (Home)
├── Header: avatar do usuário, XP total, streak atual
├── Grid de matérias (7 cards)
│   └── Cada card: nome, ícone, barra de progresso, % concluído
└── Botão "Sessão Rápida" (mix aleatório de matérias)

Tela da Matéria
├── Nome + ícone da matéria
├── Lista de tópicos desbloqueados
│   └── Cada tópico: título, estrelas conquistadas (0–3), locked/unlocked
└── Botão "Começar" no tópico selecionado

Tela de Exercício
├── Barra de progresso da sessão (ex: 4/10)
├── Coração de vidas (3 vidas por sessão)
├── Contador de XP da sessão
├── Enunciado da questão
├── Tipo de exercício (múltipla escolha / V-F / complete / flashcard)
└── Feedback visual imediato

Tela de Resultado (fim de sessão)
├── Estrelas conquistadas (1–3)
├── XP ganho
├── Mensagem de encorajamento
├── Botão "Continuar" (próximo tópico) e "Início"
```

---

## 5. Sistema de Gamificação

### 5.1 XP (Pontuação)
- Acerto simples: +10 XP
- Acerto sem errar nenhuma na sessão (perfeito): +50 XP bônus
- Cada sessão completa: +20 XP base

### 5.2 Estrelas por Tópico
- ⭐ = completou o tópico (qualquer resultado)
- ⭐⭐ = acertou ≥ 70%
- ⭐⭐⭐ = acertou 100% (sessão perfeita)

### 5.3 Streak Diário
- Incrementa ao completar pelo menos 1 sessão por dia
- Exibido no header com ícone de chama 🔥
- Quebrando o streak: reseta para 0 (aviso amigável, não punitivo)
- Milestones de streak: 3, 7, 15, 30 dias → troféu desbloqueado

### 5.4 Troféus
| Troféu | Condição |
|---|---|
| 🥇 Primeiros Passos | Completar a primeira sessão |
| 🔥 Em Chamas | Streak de 7 dias |
| 🌟 Perfeito! | Fazer 5 sessões perfeitas |
| 📚 Curioso | Completar 1 tópico em cada matéria |
| 🏆 Mestre do 4º Ano | Completar todos os tópicos de todas as matérias |
| 🧠 Gênio | Acumular 1000 XP |

---

## 6. Conteúdo por Matéria

> **IMPORTANTE:** Este é o conteúdo base alinhado com a BNCC para o 4º ano.
> Adaptar conforme apostila/currículo específico da escola quando disponível.

### 6.1 Português
**Tópicos:**
1. Tipos de texto (narrativo, descritivo, instrucional)
2. Substantivos (próprios, comuns, coletivos)
3. Adjetivos e locuções adjetivas
4. Verbos (ação, estado, fenômeno)
5. Pontuação (ponto, vírgula, exclamação, interrogação)
6. Sílabas e divisão silábica
7. Acentuação gráfica (agudo, circunflexo, til, crase)
8. Sinônimos e antônimos
9. Interpretação de texto
10. Ortografia (por que / porque / por quê / porquê)

**Exemplo de questão (Múltipla Escolha):**
> "Qual das palavras abaixo é um substantivo coletivo?"
> A) Bonito  B) Correr  C) Cardume  D) Rapidamente  
> ✅ C — Cardume é o coletivo de peixes

### 6.2 Matemática
**Tópicos:**
1. Números até 100.000 (leitura e escrita)
2. Operações: adição e subtração com reserva
3. Multiplicação (tabuada e além)
4. Divisão exata e com resto
5. Frações (metade, terço, quarto)
6. Medidas de comprimento (m, cm, km)
7. Medidas de massa (kg, g)
8. Medidas de capacidade (l, ml)
9. Figuras geométricas (planas e espaciais)
10. Problemas de raciocínio lógico

**Exemplo de questão (Complete a Frase):**
> "O resultado de 7 × 8 é ___"
> Opções: 54 / 56 / 63 / 48  
> ✅ 56

### 6.3 Geografia
**Tópicos:**
1. Regiões do Brasil (Norte, Nordeste, Centro-Oeste, Sudeste, Sul)
2. Estados e capitais brasileiras
3. Biomas brasileiros (Amazônia, Cerrado, Caatinga, Mata Atlântica, Pampa, Pantanal)
4. Rios principais do Brasil
5. Relevo e clima do Brasil
6. Cartografia: pontos cardeais, mapas e escalas
7. Urbanização e êxodo rural
8. Preservação ambiental

**Exemplo de questão (V ou F):**
> "Brasília é a capital do Brasil e fica na região Centro-Oeste."
> ✅ Verdadeiro

### 6.4 Inglês
**Tópicos:**
1. Vocabulário: cores (colors)
2. Vocabulário: animais (animals)
3. Vocabulário: escola (school objects)
4. Números (numbers 1–100)
5. Dias da semana (days of the week)
6. Meses do ano (months of the year)
7. Cumprimentos (greetings)
8. Família (family members)
9. Verbo to be (am, is, are)
10. Presente simples — frases básicas

**Exemplo de questão (Flashcard):**
> Frente: 🐘 What's this animal?
> Verso: Elephant — Elefante

### 6.5 Ciências
**Tópicos:**
1. Seres vivos: características gerais
2. Cadeia alimentar
3. Fotossíntese
4. Sistema solar e planetas
5. Estados físicos da matéria (sólido, líquido, gasoso)
6. Ciclo da água
7. Corpo humano: sistemas (digestório, respiratório, circulatório)
8. Animais vertebrados e invertebrados
9. Saúde e higiene
10. Preservação do meio ambiente

**Exemplo de questão (Múltipla Escolha):**
> "Qual planeta fica mais próximo do Sol?"
> A) Terra  B) Marte  C) Mercúrio  D) Vênus  
> ✅ C — Mercúrio é o planeta mais próximo do Sol

### 6.6 História
**Tópicos:**
1. História do Brasil: povos indígenas
2. Chegada dos portugueses (1500)
3. Período colonial
4. Escravidão no Brasil
5. Independência do Brasil (1822)
6. Proclamação da República (1889)
7. Era Vargas
8. Brasil contemporâneo
9. Patrimônio histórico e cultural
10. Datas comemorativas e efemérides

**Exemplo de questão (Complete a Frase):**
> "O Brasil foi descoberto em ___ por Pedro Álvares Cabral."
> Opções: 1500 / 1492 / 1822 / 1888  
> ✅ 1500

### 6.7 Ensino Religioso
**Tópicos:**
1. O que é religião?
2. Religiões do mundo (visão panorâmica, sem hierarquia)
3. Símbolos religiosos
4. Festas e celebrações culturais/religiosas do Brasil
5. Valores humanos: respeito, solidariedade, empatia
6. Diversidade cultural e religiosa
7. Cuidado com a natureza (perspectiva ética)

**Exemplo de questão (V ou F):**
> "O respeito às diferenças é um valor importante em todas as culturas."
> ✅ Verdadeiro

---

## 7. Estrutura de Arquivos React

```
/src
  /components
    Header.jsx          # Avatar, XP, streak
    SubjectCard.jsx     # Card de matéria com progresso
    ExerciseCard.jsx    # Container de exercício
    Flashcard.jsx       # Flip card com animação
    MultipleChoice.jsx  # Questão com 4 opções
    TrueFalse.jsx       # Botões V/F grandes
    FillBlank.jsx       # Complete a frase
    ProgressBar.jsx     # Barra de progresso
    TrophyModal.jsx     # Modal de troféu desbloqueado
    ResultScreen.jsx    # Tela de resultado com estrelas
  /data
    portugues.js        # Conteúdo e questões
    matematica.js
    geografia.js
    ingles.js
    ciencias.js
    historia.js
    ensino-religioso.js
  /hooks
    useProgress.js      # Hook para ler/salvar progresso no localStorage
    useStreak.js        # Hook para controle de streak diário
    useXP.js            # Hook para XP e troféus
  /utils
    shuffle.js          # Embaralhar questões
    scoring.js          # Cálculo de estrelas e XP
  App.jsx
  main.jsx
```

---

## 8. Persistência de Dados (localStorage)

```json
{
  "user": {
    "name": "Bento",
    "avatar": "🦁",
    "xp": 0,
    "streak": {
      "current": 0,
      "lastStudyDate": null,
      "best": 0
    },
    "trophies": []
  },
  "progress": {
    "portugues": {
      "topico-1": { "stars": 0, "completed": false, "bestScore": 0 },
      ...
    },
    ...
  }
}
```

---

## 9. Design e UX

- **Visual:** Colorido, amigável, personagens/emojis como feedback
- **Tipografia:** Fonte grande e legível (min 18px para enunciados)
- **Feedback positivo:** Animações de confete, som (opcional), mensagens encorajadoras
- **Mensagens de erro:** Nunca punitivas — "Quase lá! A resposta certa era X porque..."
- **Mobile-first:** Touch targets mínimos de 44px, sem hover necessário
- **Acessibilidade:** Contraste alto, sem dependência exclusiva de cor

---

## 10. Fora do Escopo (v1)

- Login/autenticação (sem backend, tudo local)
- Multiplayer ou ranking entre usuários
- Criação de questões pelo usuário
- Integração com calendário escolar
- App nativo (iOS/Android)
- Sons e música de fundo

---

## 11. Critérios de Aceite (v1 pronta quando...)

- [ ] Todas as 7 matérias com pelo menos 2 tópicos e 10 questões cada
- [ ] Todos os 4 tipos de exercício funcionando
- [ ] XP, streak e troféus sendo salvos no localStorage
- [ ] Responsivo: funciona bem em iPhone SE e desktop
- [ ] Sem erros no console
- [ ] Deploy funcionando no Netlify/Vercel com URL pública

---

## 12. Prompt de Kickoff para o Claude Code

Cole este prompt no Claude Code para começar:

```
Leia o SPEC.md neste repositório. 

Vamos construir o app de estudos para o 4º ano do ensino fundamental brasileiro conforme especificado.

Comece pelo seguinte:
1. Configure o projeto com Vite + React + Tailwind CSS
2. Crie a estrutura de pastas conforme /src descrita na spec
3. Crie o arquivo /src/data/matematica.js com 3 tópicos completos (10 questões cada, mix dos 4 tipos de exercício)
4. Implemente o componente ExerciseCard.jsx que suporte todos os tipos de exercício
5. Implemente a Home com o grid de matérias

Após cada etapa, rode npm run dev e confirme que está funcionando antes de avançar.
```

---

## 13. Mascote — Patito 🐥

O app tem um mascote oficial: **Patito**, um patinho amarelo (🐥), análogo à coruja do Duolingo.

### Usos do Patito
- **Feedback positivo:** Patito comemora com animação ao acertar questões
- **Encorajamento:** Patito aparece na tela de resultado com mensagem animada
- **Streak:** Patito fica triste (😢) quando o streak é quebrado, alegre (🎉) nos milestones
- **Onboarding:** Patito dá as boas-vindas ao usuário na primeira visita
- **Erro/Dica:** Patito explica a resposta correta após erros

### Representação Visual (v1)
- Usar emoji 🐥 como representação do mascote (sem assets externos necessários)
- Futuramente pode ser substituído por ilustração SVG personalizada

### Personalidade
- Animado, encorajador, nunca punitivo
- Fala com a criança em linguagem simples e divertida
- Frases de exemplo: "Boa! 🐥", "Quase lá! Você consegue!", "Incrível! Você é demais!"

---

## 14. Calendário de Provas 📅

### Visão Geral
O aluno pode registrar as datas das provas e receber lembretes do Patito quando estiver próximo de uma avaliação.

### 14.1 Cadastro de Provas
Duas formas de entrada:
- **Manual:** formulário com campos: matéria (dropdown das 7 matérias), data, hora (opcional), observações
- **PDF:** upload de arquivo PDF com o cronograma escolar → parsing automático das datas e matérias

### 14.2 Lembretes (in-app apenas)
- Verificação das datas ao abrir o app (sem push notifications — v1)
- Exibe banner do Patito no topo da Home quando há prova em ≤7 dias
- Exemplos: "📅 Prova de Matemática em 2 dias! Vamos estudar? 🐥"
- Push notifications ficam para v2

### 14.3 Calendário
- Tela dedicada acessível pelo header (ícone 📅)
- Visualização mensal com marcadores nas datas de prova
- Cores das matérias (da seção 2) identificam cada prova no calendário
- Ao clicar na data: detalhes da prova + sugestão "Estudar agora 📚"

### 14.4 Schema localStorage (extensão da seção 8)
```json
"exams": [
  {
    "id": "exam-1",
    "subject": "matematica",
    "date": "2026-03-20",
    "time": "09:00",
    "notes": "Capítulos 1-3"
  }
]
```

### 14.5 Parsing de PDF (v1 simplificado)
- Usar biblioteca `pdfjs-dist` para extrair texto do PDF
- Buscar padrões de data (dd/mm/aaaa) e nomes de matérias no texto extraído
- Apresentar resultado para confirmação manual antes de salvar
- Fallback: se parsing falhar, mostrar texto extraído para o usuário inserir manualmente
