# Roteiro editorial para as próximas matérias

Este é o procedimento obrigatório para publicar qualquer novo material de prova no Patito. Geografia P1 e P2 são a implementação de referência, mas scripts e identificadores novos devem ser genéricos para matéria, prova e fonte.

## Ordem recomendada

A prioridade acompanha a primeira prova ainda sem material publicado:

1. Matemática P1 — capítulos 5, 6 e 7 — prova em 22/09/2026.
2. História P1 — capítulos 9 e 10 — prova em 24/09/2026.
3. Inglês P1 — unidades 5 e 6 — prova em 25/09/2026.
4. Português P1 — tópicos e páginas do calendário — prova em 28/09/2026.
5. Ciências P1 — capítulos 8 e 9 — prova em 30/09/2026.
6. Demais trabalhos e materiais P2, em ordem de data.

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
- registro do modelo, versão do prompt, data, hash e aprovação editorial.

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

- Usar os prompts versionados em `scripts/editorial/prompts/`.
- Enviar ao modelo somente o mapa conceitual autorizado, nunca dados de alunos.
- Gerar em lotes retomáveis e manter IDs estáveis por matéria e prova.
- Distribuir alternativas corretas sem padrão previsível.
- Rejeitar questões ambíguas, discursivas, dependentes de imagem ausente ou de memorização não prevista.

### 5. Revisar e aprovar

- Um agente revisor independente confere as 60 questões contra a fonte.
- O revisor pode corrigir problemas sustentados claramente pela fonte.
- Dúvidas sem solução segura bloqueiam a questão e são escaladas à mantenedora.
- A aprovação é auditável e vinculada ao hash exato do rascunho.
- Autor e revisor não são o mesmo agente lógico.

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
