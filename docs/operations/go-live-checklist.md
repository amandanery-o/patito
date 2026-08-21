# Checklist de ativação externa

O código local está pronto e testado. Os itens abaixo dependem de decisão editorial, credenciais ou configuração em serviços externos e não podem ser concluídos com segurança apenas pelo repositório.

## 1. Aprovar e publicar Geografia P2

1. Abrir `http://127.0.0.1:4180/geografia-p2.html` enquanto o servidor editorial estiver ativo.
2. Conferir as 60 questões, registrar o nome da revisora e marcar cada item.
3. Exportar `geografia-p2-capitulos-11-12-review.json`.
4. Salvar o arquivo exportado como `editorial/reviews/geografia-p2-review.json`.
5. Executar, nessa ordem:

```bash
npm run editorial:approve:geografia-p2
npm run editorial:publish:geografia-p2
npm test
npm run test:e2e
npm run build
```

Os comandos rejeitam automaticamente revisão incompleta, rascunho alterado, conteúdo sem rastreabilidade ou banco menor que 60 questões.

## 2. Ativar o Supabase remoto

São necessários a URL pública e a chave pública `anon` do projeto. Elas devem ser salvas somente em `.env.local`:

```dotenv
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA-CHAVE-ANON-PUBLICA
```

Depois:

1. Executar `supabase/schema.sql` no SQL Editor.
2. Executar `supabase/seed.sql` no SQL Editor.
3. Habilitar e-mail/senha e configurar a URL de recuperação no Supabase Auth.
4. Testar cadastro, login, recuperação, temas, sessão, retomada e ranking com duas contas.
5. Auditar identidades existentes; migrar somente se alguma conta antiga for encontrada.

A chave `service_role` nunca deve ser enviada ao navegador nem armazenada em variável `VITE_`.

## 3. Ativar relatos no GitHub

No ambiente das Edge Functions do Supabase, configurar:

- `GITHUB_ISSUES_TOKEN`: token restrito a criar issues neste repositório;
- `GITHUB_ISSUES_REPOSITORY=amandanery-o/patito`.

Em seguida, publicar `supabase/functions/report-problem` e realizar um relato de teste sem dados pessoais.

## 4. Entregar fontes editoriais restantes

Para cada prova ainda sem conteúdo, fornecer o material autorizado ou abrir a plataforma autenticada no capítulo correspondente:

- Matemática: capítulos 6–11;
- Português: páginas e tópicos registrados no calendário;
- Inglês: unidades 5–8 da Richmond College;
- Ciências: capítulos 7–11;
- História: capítulos 7–12;
- Ensino Religioso: trecho sobre ritos e tradições religiosas.

Antes de automatizar Edebê ou Richmond College, também é necessário confirmar permissões de uso e o mecanismo oficial disponível. Login de aluno não deve ser convertido em integração oculta nem ter sessão, senha ou cookies extraídos.

## Evidência de conclusão

A versão estará pronta para uso remoto quando:

- os gates locais estiverem verdes;
- a P2 aprovada estiver visível somente após publicação;
- duas contas remotas permanecerem isoladas por RLS;
- calendário, temas, progresso e ranking sobreviverem a recarga e novo dispositivo;
- um relato criar issue sanitizada;
- cada matéria publicada possuir fonte, resumo e pelo menos 60 questões aprovadas.
