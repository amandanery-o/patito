# Checklist de ativação externa

O Patito está publicado em produção. Os itens abaixo dependem de decisão editorial, credenciais ou configuração em serviços externos e não podem ser concluídos apenas pelo repositório.

## Concluído

- Projeto Supabase remoto criado, schema aplicado e RLS validado.
- Calendário oficial com 27 eventos publicado.
- Geografia P1 aprovada e publicada; a revisão antiga de capítulos 11 e 12 foi retirada da experiência ativa após o comunicado de 30/10. A revisão de novembro usa capítulos 10 e 11 e mostra a data de 16/11 do cronograma escolar, confirmada pela mantenedora em 11/11.
- Matemática T2 e P1 aprovadas e publicadas, com 60 questões por material.
- As seis revisões de novembro estão publicadas na produção, com 60 questões cada: Português (12/11), Inglês (13/11), Geografia (16/11), Matemática (17/11), Ciências (18/11) e História (19/11). Educação Física foi excluída conforme orientação da mantenedora.
- Login, perfil, calendário, Temas, sessão e ranking validados remotamente.
- Produção Vercel publicada em `https://patito-mauve.vercel.app`, conectada ao Supabase.
- URL principal e retornos de autenticação configurados no Supabase para o domínio de produção.
- Relatos anônimos ativados com token restrito ao repositório e à permissão de Issues; smoke test criou a issue `#4` em 28/09/2026.

## 1. Ativar entrega de e-mails de autenticação

O SMTP personalizado está desligado. O serviço padrão do Supabase envia somente para endereços que pertencem à equipe do projeto e limita o volume. Para permitir novos acessos de qualquer família, configurar SMTP próprio em **Authentication → Emails → SMTP Settings**, trocar o template de Magic Link para `{{ .Token }}` e validar, com um endereço externo de teste:

- criação de conta nova e coleta do nome;
- entrada em conta existente;
- código inválido e reenvio.

## 2. Preparar avaliações futuras

Para avaliações futuras, seguir `docs/operations/next-subject-playbook.md`. Cada entrega precisa conter fonte registrada, material de leitura, pelo menos 60 questões, revisão independente, aprovação auditável e testes.

## 3. Preparar novas avaliações

Quando a escola divulgar uma avaliação fora do recorte publicado de novembro, registrar a fonte e seguir `docs/operations/next-subject-playbook.md`. Antes de automatizar Edebê ou Richmond College, confirmar permissões de uso e o mecanismo oficial disponível. Login de aluno não deve ser convertido em integração oculta nem ter sessão, senha ou cookies extraídos.

## Evidência de conclusão

A versão estará pronta para uso remoto quando:

- os gates locais estiverem verdes;
- cada novo material aprovado estiver visível somente após publicação;
- duas contas remotas permanecerem isoladas por RLS;
- calendário, temas, progresso e ranking sobreviverem a recarga e novo dispositivo;
- um relato criar issue sanitizada;
- cada matéria publicada possuir fonte, resumo e pelo menos 60 questões aprovadas.
