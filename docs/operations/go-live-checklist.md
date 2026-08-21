# Checklist de ativação externa

O código local está pronto e testado. Os itens abaixo dependem de decisão editorial, credenciais ou configuração em serviços externos e não podem ser concluídos com segurança apenas pelo repositório.

## Concluído

- Projeto Supabase remoto criado, schema aplicado e RLS validado.
- Calendário oficial com 27 eventos publicado.
- Geografia P1 e P2 aprovadas e publicadas.
- Matemática T2 e P1 aprovadas e publicadas, com 60 questões por material.
- Login, perfil, calendário, Temas, sessão e ranking validados remotamente.
- Produção Vercel publicada em `https://patito-mauve.vercel.app`, conectada ao Supabase.
- URL principal e retornos de autenticação configurados no Supabase para o domínio de produção.

## 1. Publicar as próximas matérias

Seguir `docs/operations/next-subject-playbook.md`, começando por História P1. Cada entrega precisa conter fonte registrada, material de leitura, pelo menos 60 questões, revisão independente, aprovação auditável e testes.

## 2. Ativar relatos no GitHub

No ambiente das Edge Functions do Supabase, configurar:

- `GITHUB_ISSUES_TOKEN`: token restrito a criar issues neste repositório;
- `GITHUB_ISSUES_REPOSITORY=amandanery-o/patito`.

Em seguida, publicar `supabase/functions/report-problem` e realizar um relato de teste sem dados pessoais.

## 3. Entregar fontes editoriais restantes

Para cada prova ainda sem conteúdo, fornecer o material autorizado ou abrir a plataforma autenticada no capítulo correspondente:

- Matemática: capítulos 9–11 para P2 (capítulos 4–8 necessários para T2/P1 já foram conferidos);
- Português: páginas e tópicos registrados no calendário;
- Inglês: unidades 5–8 da Richmond College;
- Ciências: capítulos 7–11;
- História: capítulos 7–12;
- Ensino Religioso: trecho sobre ritos e tradições religiosas.

Antes de automatizar Edebê ou Richmond College, também é necessário confirmar permissões de uso e o mecanismo oficial disponível. Login de aluno não deve ser convertido em integração oculta nem ter sessão, senha ou cookies extraídos.

## Evidência de conclusão

A versão estará pronta para uso remoto quando:

- os gates locais estiverem verdes;
- cada novo material aprovado estiver visível somente após publicação;
- duas contas remotas permanecerem isoladas por RLS;
- calendário, temas, progresso e ranking sobreviverem a recarga e novo dispositivo;
- um relato criar issue sanitizada;
- cada matéria publicada possuir fonte, resumo e pelo menos 60 questões aprovadas.
