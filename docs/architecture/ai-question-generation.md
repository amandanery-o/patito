# Geração editorial de questões com Claude

O gerador roda apenas na máquina da mantenedora. A API do Claude não é chamada pelo navegador e a chave nunca recebe o prefixo `VITE_`.

## Fluxo

O procedimento completo e genérico para uma nova matéria está em [`docs/operations/next-subject-playbook.md`](../operations/next-subject-playbook.md). Este documento detalha a etapa técnica de geração com Claude.

1. Os capítulos autorizados são lidos e resumidos editorialmente.
2. O script envia somente o mapa conceitual, sem dados ou respostas de alunos.
3. Claude produz seis lotes estruturados de 10 questões usando JSON Schema.
4. Cada lote aprovado é salvo como checkpoint para permitir retomada após uma falha de rede.
5. O script exige o total de 45 questões de múltipla escolha e 15 de associação.
6. O validador verifica formatos, explicações, referências, alternativas, associações e IDs.
7. O resultado é salvo em `editorial/drafts/`, diretório ignorado pelo Git.
8. Um agente revisor independente confere conteúdo, alternativas, respostas, explicações e referências; dúvidas sem solução segura são escaladas à mantenedora.
9. O comando de aprovação registra o parecer auditável e publica somente as questões validadas em `src/data/generated/`.

Os prompts são artefatos editoriais versionados:

- `scripts/editorial/prompts/question-author-system-v1.md`: papel, princípios pedagógicos, proibições e checklist do Claude;
- `scripts/editorial/prompts/question-batch-v2.md`: modelo genérico para qualquer matéria, com escopo, quantidades, dificuldade, focos, habilidades curriculares e material de cada lote.

Alterações de prompt exigem uma nova versão e nova geração; não se modifica silenciosamente o prompt de um lote já produzido.

## Configuração local

Crie o arquivo local `.env.editorial`, que é ignorado pelo Git:

```bash
ANTHROPIC_API_KEY=...
ANTHROPIC_MODEL=claude-sonnet-4-6
```

Os comandos atuais de Geografia são a referência já implementada:

```bash
npm run editorial:generate:geografia-p1
npm run editorial:approve:geografia-p1
```

Para criar o rascunho da P2 de Geografia (capítulos 11 e 12):

```bash
npm run editorial:generate:geografia-p2
npm run editorial:review:geografia-p2
```

O segundo comando cria uma página local em `editorial/reviews/geografia-p2.html` para inspeção opcional. Por padrão, um agente independente revisa todas as questões e produz o mesmo manifesto auditável. O manifesto contém o hash exato do rascunho: qualquer alteração posterior invalida a aprovação.

Depois de salvar o manifesto exportado como `editorial/reviews/geografia-p2-review.json`, a aprovação final é criada com:

```bash
npm run editorial:approve:geografia-p2
npm run editorial:publish:geografia-p2
```

O primeiro comando recusa questões pendentes ou com ajuste solicitado. O segundo valida novamente o conteúdo e a aprovação e substitui o pacote publicado de forma atômica; assim, a aplicação nunca recebe apenas parte das 60 questões. O mesmo gerador escolhe a configuração editorial pelo nome do conteúdo, mantendo IDs, fontes, focos e checkpoints separados entre P1 e P2.

As configurações ficam no catálogo `scripts/editorial/editorial-configs.mjs`, identificado por matéria e prova. Novos scripts não devem copiar e renomear regras de Geografia: matéria, fonte, capítulos, prefixo de IDs, focos, habilidades e arquivo de saída entram como configuração validada. Uma configuração só pode ser habilitada depois que seus mapas de fonte estiverem conferidos.

Não cole a chave em arquivos do projeto, no chat, em issues ou em commits.

Por padrão, o resultado é criado em `editorial/drafts/geografia-p1.json`. O script não sobrescreve um rascunho existente: para gerar novamente, mova o arquivo anterior para um local seguro ou informe outro caminho como argumento.

## Limites de segurança

- Não há publicação direta após a geração; revisão, aprovação e publicação são etapas separadas e reproduzíveis.
- A aprovação pode ser automatizada por um agente independente, mas falha de forma fechada: qualquer dúvida ou ajuste pendente impede a publicação e é escalado.
- O provedor e o modelo ficam registrados no lote.
- Cada questão deve referenciar seção e páginas da fonte.
- Uma falha em qualquer lote impede a criação do arquivo final.
- A resposta da API não é tratada como conteúdo aprovado.
