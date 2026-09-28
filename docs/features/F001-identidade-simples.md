# F001 — Conta do aluno com Supabase Auth

## Requisitos

`REQ-003`, `REQ-006`, `REQ-009`, `REQ-011`, `REQ-012`, `REQ-074`, `REQ-075`

## Resultado

Uma criança informa o e-mail e recebe um código temporário. O mesmo fluxo entra em uma conta existente ou cria uma nova, sem revelar previamente se o endereço está cadastrado. Somente os dados da própria conta são carregados.

## Regras

- O primeiro passo solicita somente o e-mail.
- O Supabase cria a conta automaticamente quando o endereço ainda não existe e envia o mesmo tipo de mensagem nos dois casos.
- O código possui seis números, é temporário e pode ser reenviado.
- Depois da primeira autenticação, o perfil padrão **Estudante** abre a coleta do nome dentro da sessão.
- Cada aluno utiliza seu próprio endereço de e-mail.
- O Supabase Auth gerencia credenciais, sessão e identidade interna imutável.
- A aplicação não solicita nem armazena senha.
- A interface traduz mensagens técnicas de autenticação para linguagem simples.
- Depois do envio, a interface mantém o e-mail visível, explica onde procurar a mensagem e oferece reenvio e correção do endereço.
- O ambiente publicado usa SMTP próprio para entregar códigos a endereços externos à equipe do Supabase.

## Critérios de aceite

- Um endereço novo recebe um código, cria a conta e solicita o nome depois da autenticação.
- Um endereço existente recebe um código e entra na conta já criada.
- Antes da autenticação, a resposta da interface não informa se o endereço já existia.
- Código inválido ou vencido não abre a conta e produz orientação simples.
- O aluno consegue reenviar o código e corrigir o e-mail.
- Códigos chegam a endereços externos à equipe do projeto.
- Nenhuma consulta do cliente retorna progresso de outro aluno.
- O fluxo funciona confortavelmente em tela de celular.

## Não objetivos

Senha, recuperação de senha, PIN, responsáveis, papéis administrativos ou gestão de turmas.

## Dados e permissões

- A aplicação envia ao Supabase o e-mail e o código temporário; o nome é salvo no perfil autenticado.
- A credencial SMTP permanece no ambiente seguro do Supabase e nunca é enviada ao navegador.

## Offline

Envio e confirmação do código exigem conexão com a internet.

## Observabilidade e rollout

- Validar conta nova, conta existente, código inválido e reenvio com endereço externo antes da publicação.
- Consultar logs de autenticação e do provedor SMTP quando uma mensagem não for entregue.
