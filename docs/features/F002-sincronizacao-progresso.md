# F002 — Sincronização de progresso

## Requisitos

`REQ-011`–`REQ-013`, `REQ-027`, `REQ-031`, `REQ-044`, `REQ-052`, `REQ-053`

## Resultado

Respostas, sessões, progresso e deveres sobrevivem a recarregamentos e troca de dispositivo.

## Escopo de dados

- Sessões e estado de retomada.
- Respostas por questão.
- Questões erradas pendentes de revisão.
- Progresso por conteúdo.
- Deveres de casa.
- Eventos de utilização contabilizados.

## Regras

- Supabase é a fonte persistente principal.
- O cliente pode manter cache transitório, mas não existe requisito offline.
- Escritas devem ser idempotentes para evitar XP ou respostas duplicadas.
- Toda linha pertencente ao aluno deve ser protegida por RLS.
- O cliente avança de questão somente depois da confirmação remota da resposta.
- A ordem sorteada da sessão é persistida e reutilizada na retomada.
- Conflitos entre abas/dispositivos recarregam o estado canônico mais recente.

## Critérios de aceite

- Uma resposta confirmada reaparece após recarregar a página.
- Uma sessão interrompida pode ser retomada em outro dispositivo.
- Retentativas não duplicam respostas nem eventos de utilização.
- Um aluno autenticado não consegue ler ou alterar dados de outro.
- Falhas de sincronização são mostradas sem fingir que o progresso foi salvo.

## Desenho técnico

- [Modelo de dados](../architecture/data-model.md)
- [Estratégia de sincronização](../architecture/synchronization.md)
