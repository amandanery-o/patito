# Geração editorial de questões com Claude

O gerador roda apenas na máquina da mantenedora. A API do Claude não é chamada pelo navegador e a chave nunca recebe o prefixo `VITE_`.

## Fluxo

1. Os capítulos autorizados são lidos e resumidos editorialmente.
2. O script envia somente o mapa conceitual, sem dados ou respostas de alunos.
3. Claude produz seis lotes estruturados de 10 questões usando JSON Schema.
4. Cada lote aprovado é salvo como checkpoint para permitir retomada após uma falha de rede.
5. O script exige o total de 45 questões de múltipla escolha e 15 de associação.
6. O validador verifica formatos, explicações, referências, alternativas, associações e IDs.
7. O resultado é salvo em `editorial/drafts/`, diretório ignorado pelo Git.
8. Uma pessoa revisa conteúdo, alternativas, respostas e explicações.
9. O comando de aprovação aplica os ajustes editoriais registrados e publica somente as questões validadas em `src/data/generated/`.

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

Depois execute:

```bash
npm run editorial:generate:geografia-p1
npm run editorial:approve:geografia-p1
```

Não cole a chave em arquivos do projeto, no chat, em issues ou em commits.

Por padrão, o resultado é criado em `editorial/drafts/geografia-p1.json`. O script não sobrescreve um rascunho existente: para gerar novamente, mova o arquivo anterior para um local seguro ou informe outro caminho como argumento.

## Limites de segurança

- Não há publicação automática após a geração; a aprovação é uma etapa separada e reproduzível.
- O provedor e o modelo ficam registrados no lote.
- Cada questão deve referenciar seção e páginas da fonte.
- Uma falha em qualquer lote impede a criação do arquivo final.
- A resposta da API não é tratada como conteúdo aprovado.
