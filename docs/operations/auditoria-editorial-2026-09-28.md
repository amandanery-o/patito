# Auditoria editorial completa — 28/09/2026

## Escopo

Revisão das 420 questões publicadas nos sete materiais ativos:

- Geografia P1 e P2;
- Matemática T2 e P1;
- Ciências P1;
- Inglês P1;
- Português P1.

Cada banco contém 60 questões, sendo 45 de múltipla escolha e 15 de associação.

## Método

- leitura integral de enunciado, alternativas ou pares, resposta e explicação;
- conferência de cálculos e conversões das duas avaliações de Matemática;
- comparação de conceitos e referências com os mapas das fontes autorizadas;
- procura de alternativas simultaneamente verdadeiras, generalizações e pistas que aceitem mais de uma associação;
- validação automática de IDs, contagens, referências, alternativas distintas, índices e pares únicos;
- execução dos gates do repositório e das jornadas E2E antes da publicação.

## Correções aplicadas

| Questão      | Risco encontrado                                                                            | Correção                                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `mat-t2-026` | Quilograma e tonelada podiam ser defendidos como unidades para a massa de um elefante.      | A pergunta passou a fornecer `5 000 kg` e pedir a unidade equivalente a `5`, tornando **toneladas** inequívoca. |
| `cie-p1-011` | A frase dizia de forma absoluta que a forma de um sólido “não muda”.                        | O enunciado agora trata especificamente da troca de recipiente.                                                 |
| `cie-p1-013` | Dobrar papel podia ser entendido como reversível ou irreversível conforme o critério usado. | O exemplo foi trocado por moldar e desfazer o formato de uma massinha.                                          |
| `cie-p1-016` | Esfriamento também pode acompanhar uma reação, deixando um distrator discutível.            | Os distratores agora descrevem mudanças físicas simples e a formação inesperada de gás permanece como indício.  |
| `cie-p1-049` | A explicação dizia “fumaça” onde a associação correta dizia “vapor”.                        | A explicação agora descreve a condensação do vapor.                                                             |
| `eng-p1-011` | `They` foi apresentado como obrigatoriamente plural sem contexto.                           | João e Maria foram incluídos no enunciado, fixando o referente plural.                                          |
| `eng-p1-028` | Um distrator sobre a forma em `-ing` também podia ser considerado verdadeiro.               | O distrator foi substituído por uma afirmação inequivocamente falsa.                                            |
| `por-p1-060` | A ausência de vírgula depois do adjunto curto “Ontem” não era necessariamente erro.         | A frase agora usa uma expressão inicial longa, conforme o recorte estudado.                                     |
| `geo-p1-018` | A explicação afirmava confinamento sem que o enunciado fornecesse essa informação.          | O espaço controlado e o uso de tecnologia passaram a aparecer no caso descrito.                                 |
| `geo-p1-024` | A questão tratava toda pesca artesanal como automaticamente sustentável.                    | O caso passou a exigir respeito à reprodução, aos tamanhos permitidos e aos limites de retirada.                |

## Resultado

As demais 410 questões permaneceram sem alteração após a nova leitura. A suíte `publishedQuestionsAudit.test.js` mantém cobertura estrutural sobre as 420 questões e fixa os principais casos corrigidos contra regressão.

O manifesto `docs/operations/published-content-audit-2026-09-28.json` registra uma decisão por questão e o SHA-256 exato de cada banco publicado. Um teste separado falha se qualquer arquivo mudar sem uma nova auditoria.
