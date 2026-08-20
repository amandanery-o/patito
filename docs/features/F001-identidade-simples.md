# F001 — Conta do aluno com Supabase Auth

## Requisitos

`REQ-003`, `REQ-006`, `REQ-009`, `REQ-011`, `REQ-012`, `REQ-062`, `REQ-063`

## Resultado

Uma criança cria e acessa sua conta usando nome, e-mail e senha com o fluxo padrão do Supabase, e somente seus próprios dados são carregados.

## Regras

- Nome, e-mail e senha são obrigatórios no cadastro.
- Cada aluno utiliza seu próprio endereço de e-mail.
- O Supabase Auth gerencia credenciais, sessão e identidade interna imutável.
- A senha nunca é armazenada pela aplicação.
- Recuperação de senha utiliza o fluxo padrão por e-mail.
- A interface traduz mensagens técnicas de autenticação para linguagem simples.

## Critérios de aceite

- O aluno consegue criar uma conta com nome, e-mail e senha válidos.
- O aluno consegue entrar novamente com as mesmas credenciais.
- Uma senha incorreta não abre a conta.
- O aluno consegue solicitar recuperação de senha pelo e-mail cadastrado.
- Nenhuma consulta do cliente retorna progresso de outro aluno.
- O fluxo funciona confortavelmente em tela de celular.

## Não objetivos

Autenticação customizada, PIN, OTP, responsáveis, papéis administrativos ou gestão de turmas.
