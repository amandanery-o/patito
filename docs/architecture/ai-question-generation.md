# Geração editorial de questões com Claude

O gerador roda apenas na máquina da mantenedora. A API do Claude não é chamada pelo navegador e a chave nunca recebe o prefixo `VITE_`.

## Fluxo

1. Os capítulos autorizados são lidos e resumidos editorialmente.
2. O script envia somente o mapa conceitual, sem dados ou respostas de alunos.
3. Claude produz dois lotes estruturados de 30 questões.
4. O script exige o total de 45 questões de múltipla escolha e 15 de associação.
5. O validador verifica formatos, explicações, referências e IDs.
6. O resultado é salvo em `editorial/drafts/`, diretório ignorado pelo Git.
7. Uma pessoa revisa conteúdo, alternativas, respostas e explicações antes de aprovar e publicar.

Os prompts são artefatos editoriais versionados:

- `scripts/editorial/prompts/question-author-system-v1.md`: papel, princípios pedagógicos, proibições e checklist do Claude;
- `scripts/editorial/prompts/geography-p1-batch-v1.md`: objetivo, quantidades, focos e material de cada lote.

Alterações de prompt exigem uma nova versão e nova geração; não se modifica silenciosamente o prompt de um lote já produzido.

## Configuração local

Configure as variáveis no terminal ou em um gerenciador seguro de segredos:

```bash
export ANTHROPIC_API_KEY="..."
export ANTHROPIC_MODEL="..."
npm run editorial:generate:geografia-p1
```

Não cole a chave em arquivos do projeto, no chat, em issues ou em commits.

Por padrão, o resultado é criado em `editorial/drafts/geografia-p1.json`. O script não sobrescreve um rascunho existente: para gerar novamente, mova o arquivo anterior para um local seguro ou informe outro caminho como argumento.

## Limites de segurança

- Não há publicação automática.
- O provedor e o modelo ficam registrados no lote.
- Cada questão deve referenciar seção e páginas da fonte.
- Uma falha em qualquer lote impede a criação do arquivo final.
- A resposta da API não é tratada como conteúdo aprovado.
