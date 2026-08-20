# PRD — Patito

Status: Draft v1 — pronto para decomposição  
Última atualização: 2026-08-20

## 1. Visão

O Patito é um sistema web mobile-first que facilita o estudo de crianças de aproximadamente 10 anos. Ele deve transformar conteúdo escolar em uma experiência digital simples, divertida e autônoma, familiar a crianças que já utilizam produtos como o Duolingo.

O escopo inicial é uma única turma com aproximadamente 25 alunos. O projeto não possui objetivo comercial, não será distribuído em lojas de aplicativos e não terá estruturas administrativas para escola, professores ou responsáveis.

## 2. Problema

O estudo tradicional pode ter pouca aderência à rotina de crianças nativas digitais. O aluno precisa consultar conteúdos, temas e avaliações e praticar exercícios em um ambiente atraente, sem depender continuamente de um adulto e sem perder seu progresso.

## 3. Usuário

### Usuário único: aluno

- Criança de aproximadamente 10 anos.
- Cria sua própria conta informando nome, e-mail e senha.
- Visualiza somente o próprio progresso.
- Usa o sistema principalmente pelo celular.

Não existirão perfis de responsável, professor, coordenador ou administrador dentro do produto.

## 4. Objetivos e requisitos

### Experiência central

- `REQ-001` Facilitar o estudo das crianças.
- `REQ-002` Tornar a experiência de estudo mais divertida e atraente.
- `REQ-003` Permitir uso autônomo por uma criança de 10 anos, com pouca ou nenhuma ajuda recorrente de adulto.
- `REQ-004` Oferecer experiência coerente com produtos digitais familiares às crianças.
- `REQ-006` Atender inicialmente uma única turma de aproximadamente 25 crianças.
- `REQ-008` Funcionar como sistema web mobile-first, sem distribuição em lojas de aplicativos.
- `REQ-009` Manter a experiência simples, sem papéis ou estruturas administrativas visíveis.

### Identidade e dados

- `REQ-010` Permitir que o aluno registre a própria identificação — **substituído por `REQ-062`**.
- `REQ-011` Associar o progresso salvo à identidade escolhida pelo aluno.
- `REQ-012` Permitir que cada aluno visualize somente o próprio progresso.
- `REQ-013` Sincronizar o progresso para impedir perda de respostas e sessões concluídas.
- `REQ-059` Ao esquecer o PIN, permitir criar uma nova conta — **retirado após adoção do Supabase Auth padrão**.
- `REQ-062` Permitir cadastro e login com nome, e-mail e senha usando o Supabase Auth padrão.
- `REQ-063` Utilizar o fluxo padrão de recuperação de senha por e-mail do Supabase.

### Conteúdo pedagógico

- `REQ-014` Exibir conteúdo igual para todos os alunos da turma.
- `REQ-015` Restringir os exercícios a formatos objetivos, principalmente múltipla escolha e associação.
- `REQ-016` Não oferecer exercícios discursivos nesta versão.
- `REQ-017` Permitir publicação centralizada de conteúdo obtido de livros digitais por integrações autenticadas.
- `REQ-018` Manter credenciais e tokens das integrações fora do navegador e inacessíveis aos alunos.
- `REQ-019` Permitir que questões sejam reportadas para a mantenedora do conteúdo.
- `REQ-020` Manter o controle editorial e de versão do conteúdo fora da interface dos alunos.
- `REQ-021` Remover conteúdo e estudos referentes ao primeiro semestre da experiência ativa.
- `REQ-022` Disponibilizar as matérias e conteúdos atualizados do segundo semestre.
- `REQ-064` Iniciar a nova versão sem migrar progresso, XP, streak, estrelas, sessões ou calendário do primeiro semestre.
- `REQ-065` Manter a estrutura de matérias pronta para receber gradualmente os novos resumos e exercícios.
- `REQ-066` Remover OBICT, OBLI e toda experiência relacionada a olimpíadas do produto.

### Sessões de estudo

- `REQ-023` Oferecer sessões com aproximadamente 30 questões, admitindo variação conforme o conteúdo.
- `REQ-024` Apresentar questões em ordem aleatória.
- `REQ-025` Permitir tentativas ilimitadas e acesso sem limite diário.
- `REQ-026` Remover o sistema de vidas.
- `REQ-027` Permitir abandonar e retomar uma sessão posteriormente.
- `REQ-052` Ao retomar uma sessão, preservar as respostas anteriores e continuar do ponto interrompido.
- `REQ-053` Permitir que o aluno volte à página inicial sem descartar a sessão em andamento.
- `REQ-028` Criar revisão automática das questões respondidas incorretamente.
- `REQ-054` Apresentar a revisão das respostas incorretas ao final da própria sessão.
- `REQ-029` Não adaptar automaticamente a dificuldade ao desempenho.
- `REQ-030` Remover flashcards nesta versão.

### Progresso e incentivo

- `REQ-031` Preservar o progresso de questionários e revisões já realizados.
- `REQ-032` Conceder XP com base na utilização do sistema, não na quantidade de respostas corretas.
- `REQ-033` Remover sequência diária, níveis e mecanismos competitivos baseados em acerto.
- `REQ-034` Exibir um ranking baseado em utilização, nunca em desempenho ou quantidade de acertos.
- `REQ-035` Não oferecer relatórios analíticos nesta versão.
- `REQ-050` Calcular utilização a partir de questões respondidas e sessões concluídas.
- `REQ-051` Aplicar limites diários de contabilização para impedir geração artificial de XP ou posição no ranking.
- `REQ-060` Contabilizar no máximo 60 questões respondidas e duas sessões concluídas por aluno por dia para XP e ranking, sem impedir estudo adicional.

### Calendário e alertas

- `REQ-036` Manter calendário de provas, trabalhos e outros compromissos escolares.
- `REQ-037` Exibir alertas como “prova em N dias”.
- `REQ-038` Atualizar o calendário a partir de PDF enviado pela professora e processado pela mantenedora.
- `REQ-039` Não permitir administração do calendário pelos alunos.

### Temas

- `REQ-040` Oferecer uma área em que a criança cadastre seus temas (tarefas de casa).
- `REQ-041` Permitir informar descrição ou atividade a realizar.
- `REQ-042` Permitir informar páginas do livro quando aplicável.
- `REQ-043` Permitir informar data de entrega.
- `REQ-044` Preservar os temas cadastrados pelo aluno.
- `REQ-055` Permitir criar, visualizar, editar e excluir temas.
- `REQ-056` Permitir marcar um tema como concluído.

### Revisão de conteúdo

- `REQ-045` Oferecer uma área de revisão organizada por matéria, livro e conteúdo.
- `REQ-046` Apresentar um resumo do conteúdo do livro antes dos exercícios.
- `REQ-047` Disponibilizar questões relacionadas ao conteúdo revisado.
- `REQ-048` Manter relação explícita entre resumo, livro/conteúdo e conjunto de questões.
- `REQ-057` Utilizar somente texto nos resumos de conteúdo nesta versão.

### Erros e suporte

- `REQ-007` Disponibilizar mecanismo para registrar erros técnicos e permitir relatos de problemas.
- `REQ-049` Direcionar problemas e questões reportadas para a mantenedora do Patito.
- `REQ-058` Registrar problemas reportados como issues no repositório GitHub do Patito.
- `REQ-061` Não incluir nome ou outra identificação da criança nas issues enviadas ao GitHub.

## 5. Requisitos retirados

- `REQ-005` Permitir acompanhamento por pais ou responsáveis — **retirado**. Não haverá perfil de responsável nem acompanhamento dentro do produto.

## 6. Não objetivos

- Comercialização ou suporte a planos e pagamentos.
- Publicação em lojas de aplicativos.
- Múltiplas escolas, turmas administráveis ou anos letivos configuráveis.
- Perfis e permissões de responsáveis, professores ou administradores.
- OBICT, OBLI ou outras áreas de olimpíadas.
- Painel administrativo dentro do sistema.
- Criação de conteúdo pedagógico por usuários.
- Exercícios discursivos, flashcards ou dificuldade adaptativa.
- Sequência diária, níveis ou competição baseada em desempenho.
- Relatórios pedagógicos ou exportações.
- Funcionamento offline.
- Integrações de calendário com Google ou Outlook.

## 7. Fluxo principal proposto

1. O aluno informa sua identidade.
2. A página inicial mostra alertas, matérias, temas e acessos de estudo.
3. O aluno pode consultar um resumo de conteúdo.
4. O aluno inicia ou retoma uma sessão relacionada.
5. O sistema apresenta aproximadamente 30 questões aleatórias.
6. Respostas erradas alimentam uma revisão posterior.
7. Uso e progresso são sincronizados sem depender do dispositivo atual.
8. O ranking reflete utilização, sem comparar desempenho.

## 8. Dados que precisam ser preservados

- Identidade do aluno.
- Sessões iniciadas, abandonadas, retomadas e concluídas.
- Respostas por questão e questões pendentes de revisão.
- Progresso por conteúdo.
- Eventos escolares publicados.
- Temas cadastrados pelo aluno.
- Registros de utilização necessários para XP e ranking.
- Relatos de problemas e questões reportadas.

## 9. Segurança e integrações

- Tokens de livros digitais e APIs autenticadas devem existir somente em ambiente seguro de servidor ou processo editorial.
- As integrações de conteúdo previstas são Edebê e Richmond College.
- O navegador não pode receber credenciais privilegiadas.
- Mesmo sem papéis distintos, cada aluno deve acessar somente os próprios dados.
- A publicação de conteúdo e calendário pode ocorrer fora da interface, por scripts ou processo técnico mantido pela responsável pelo Patito.
- A criação de issues no GitHub deve acontecer por integração segura no servidor; nenhum token de escrita do GitHub pode ser enviado ao navegador.

## 10. Indicadores operacionais

- Erros técnicos relevantes podem ser consultados pela mantenedora.
- Alunos conseguem reportar problemas.
- Progresso não é perdido entre sessões e dispositivos.
- Conteúdo, calendário e alertas refletem o segundo semestre.

Não serão usadas métricas comerciais.

## 11. Decisões confirmadas

- Há somente um tipo de usuário: aluno.
- Não há permissionamento funcional por papéis.
- O produto atende uma única turma de aproximadamente 25 alunos.
- Conteúdo e calendário são mantidos centralmente fora da experiência do aluno.
- O sistema requer internet.
- O foco é celular, mas a entrega é web.
- XP e ranking medem utilização, não desempenho.
- A utilização considera questões respondidas e sessões concluídas, com limite diário contra uso artificial.
- O acesso do aluno usa nome, e-mail e senha por meio do Supabase Auth padrão.
- Cada aluno utiliza seu próprio endereço de e-mail no cadastro.
- Edebê e Richmond College são as fontes digitais previstas; configurações e credenciais serão fornecidas posteriormente.
- O ranking exibirá o nome do aluno.
- Sessões interrompidas preservam respostas e podem coexistir com a navegação pela página inicial.
- A revisão de erros acontece ao final da sessão.
- Temas possuem CRUD completo e estado de conclusão.
- Resumos de conteúdo contêm somente texto nesta versão.
- Relatos de problemas são encaminhados ao GitHub.
- A recuperação de senha utiliza o fluxo padrão por e-mail do Supabase.
- O ranking contabiliza até 60 questões e duas sessões concluídas por dia, sem limitar o uso adicional.
- Issues de problemas nunca incluem o nome ou identificação da criança.
- Não há vidas, streak, níveis, relatórios ou flashcards.
- O conteúdo ativo deve corresponder ao segundo semestre.
- A nova versão começa com dados acadêmicos e progresso limpos; o primeiro semestre permanece apenas no histórico do Git.
- Olimpíadas não fazem parte do novo escopo do Patito.

## 12. Questões abertas prioritárias

1. O ranking mostrará o nome completo informado ou somente o primeiro nome?
2. Quais permissões os termos da Edebê e Richmond College concedem para transformação e publicação do conteúdo?
3. Quais endpoints, autenticação e limites técnicos serão usados nas integrações Edebê e Richmond College?

## 13. Priorização inicial

### Essencial para a próxima versão

- Cadastro/login padrão por e-mail e isolamento de progresso.
- Sincronização de progresso.
- Conteúdo completo do segundo semestre.
- Estrutura vazia e validada para publicação gradual do novo semestre.
- Calendário atualizado e alertas.
- Temas.
- Resumos de revisão seguidos por exercícios.
- Sessões retomáveis, sem vidas e com revisão de erros.
- XP e ranking por utilização.
- Registro e relato de problemas.

### Fora de escopo nesta versão

- Os itens descritos na seção “Não objetivos”.
