# report-problem

Função autenticada que recebe somente o payload anônimo permitido e cria uma issue no GitHub.

Secrets necessários no Supabase:

- `GITHUB_ISSUES_TOKEN`: fine-grained token com permissão apenas de criar issues neste repositório;
- `GITHUB_ISSUES_REPOSITORY`: `amandanery-o/patito` (opcional; este é o padrão).

O token nunca usa o prefixo `VITE_` e nunca é enviado ao navegador.
