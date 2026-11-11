# Roteiro editorial para as próximas matérias

Este é o procedimento obrigatório para publicar qualquer novo material de prova no Patito. Geografia P1 e a revisão P2 histórica são exemplos de referência; a P2 foi retirada da experiência ativa após a atualização do escopo para P3. Scripts e identificadores novos devem ser genéricos para matéria, prova e fonte.

## Ordem recomendada

A prioridade acompanha a primeira prova ainda sem material publicado. Matemática T2 e P1 foram concluídas em 21/08/2026 e permanecem como implementação de referência:

1. Geografia — capítulos 10 e 11 — material aprovado localmente em 11/11/2026; prova em 16/11 conforme cronograma escolar.
2. Ciências — capítulos 10 e 11 — material aprovado localmente em 11/11/2026.
3. História — capítulos 11 e 12 — material aprovado localmente em 11/11/2026.
4. Demais avaliações sem material, em ordem de data.

Se a fonte autorizada de uma matéria não estiver disponível, o agente registra o bloqueio e avança para a próxima fonte disponível. Não inventa conteúdo nem usa páginas não conferidas.

## Contrato de uma entrega

Cada prova publicada precisa formar uma única unidade de **Material de revisão**:

- matéria e nome da avaliação, como Matemática P1;
- livro/plataforma, edição ou versão, capítulos/unidades e páginas;
- resumo textual próprio, adequado ao 4º ano;
- pontos principais que a criança deve lembrar;
- banco mínimo de 60 questões aprovadas;
- alvo de 45 questões de múltipla escolha e 15 associações;
- referência de seção e página em cada questão;
- registro do método de autoria e, quando aplicável, modelo/provedor, versão do prompt, data, hash e aprovação editorial.

O texto integral do livro, imagens protegidas, credenciais, cookies e dados do aluno não entram no Git nem são enviados ao aplicativo.

## Processo obrigatório

### 1. Confirmar o escopo da prova

- Conferir `docs/sources/avaliacoes-segundo-semestre-2026.md`.
- Registrar matéria, prova, data, capítulos, unidades e páginas.
- Conferir se o material corresponde à edição usada pela turma.

### 2. Conferir a fonte autorizada

- Acessar somente a sessão que a mantenedora abriu legitimamente.
- Preferir HTML ou mecanismo oficial da plataforma quando disponível.
- Não extrair senha, cookie ou sessão do aluno.
- Criar um arquivo em `docs/sources/` com metadados, objetivos, mapa conceitual, seções/páginas e pontos de atenção.
- Redigir conceitos com palavras próprias; não reproduzir o capítulo integralmente.

### 3. Preparar o material de leitura

- Criar um resumo curto da prova e seções textuais escaneáveis no celular.
- Usar frases adequadas a crianças de aproximadamente 10 anos.
- Explicar vocabulário novo e evitar informações que dependam de imagem ausente.
- Listar os pontos essenciais em **O que lembrar**.
- Manter vínculo explícito entre cada seção do resumo e a fonte.

### 4. Gerar o rascunho de questões

- Por padrão, redigir as questões no fluxo ativo do Codex a partir do mapa conceitual autorizado e salvar o rascunho no repo. Esse caminho não chama uma API externa.
- Os prompts versionados em `scripts/editorial/prompts/` podem orientar a autoria nos dois caminhos.
- O gerador local com API da Anthropic é opcional. Só usar após pedido explícito da mantenedora, pois pode consumir créditos cobrados separadamente; a assinatura do ChatGPT/Codex não é uma credencial para esse script.
- Se a mantenedora autorizar uma API, enviar somente o mapa conceitual autorizado, nunca dados de alunos, e registrar provedor, modelo e versão do prompt.
- Em qualquer caminho, gerar em lotes retomáveis e manter IDs estáveis por matéria e prova.
- Distribuir alternativas corretas sem padrão previsível.
- Rejeitar questões ambíguas, discursivas, dependentes de imagem ausente ou de memorização não prevista.

### 5. Revisar e aprovar

- Um agente revisor independente confere as 60 questões contra a fonte.
- O revisor pode corrigir problemas sustentados claramente pela fonte.
- Dúvidas sem solução segura bloqueiam a questão e são escaladas à mantenedora.
- A aprovação é auditável e vinculada ao hash exato do rascunho.
- Autor e revisor não são o mesmo agente lógico. Usar `.claude/agents/editorial-reviewer.md` como agente revisor independente do rascunho salvo.

### 6. Publicar na experiência infantil

- Mostrar um cartão por prova dentro de **Material de revisão**.
- Oferecer ações separadas: **Ler material** e **Praticar 30 questões**.
- Não repetir capítulos cobertos como cartões concorrentes.
- No cartão da matéria, contar somente revisões publicadas: por exemplo, **0 de 1 revisão concluída**.
- Uma sessão usa cerca de 30 questões; o banco completo continua disponível para novas tentativas e reforço.

### 7. Validar e registrar

- Testar material, início da prática, retomada, conclusão e nova tentativa.
- Atualizar PRD, F004, F009, backlog e rastreabilidade quando o status mudar.
- Rodar `npm test`, `npm run test:e2e`, `npm run lint`, `npm run typecheck`, `npm run format:check` e `npm run build`.
- Commitar somente fonte editorial própria, conteúdo aprovado, código, testes e documentação; manter rascunhos e credenciais ignorados.

## Definição de pronto

Uma nova matéria/prova está pronta somente quando:

- a fonte e o escopo estão registrados;
- o resumo pode ser lido sem apoio adulto;
- existem pelo menos 60 questões aprovadas e rastreáveis;
- leitura e prática estão claramente separadas na interface;
- o progresso conta a revisão publicada, não capítulos internos;
- todos os gates estão verdes;
- documentação, testes e conteúdo foram commitados juntos.
