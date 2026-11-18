# Banco de Dados + PagBank — Google Sheets + Apps Script

A planilha ativa fica no seu Google Drive, dentro da pasta **db**:
- **Planilha:** `Casamento Anna Beatriz & Daniel — Banco de Dados`
- **Link:** https://docs.google.com/spreadsheets/d/1d022ZfHSXqCLvUWTIOqmw6Myi55NpxtdTlihghQoDGk/edit

## Como funciona o registro de pagamentos
- Ao clicar em **Pagar com PagBank**, o pedido fica apenas guardado temporariamente até o pagamento ser aprovado (`PAID`).
- **Só entra na aba `Presentes` (como `Conferido`) e só dá baixa em `Cotas` se o pagamento for confirmado** pela API do PagBank:
  1. Via webhook (`payment_notification_urls` no PagBank → `doPost`);
  2. No retorno do convidado pela `redirect_url` (`doGet?confirmar=...`);
  3. Via acionador automático de tempo (`verificarPagamentosPendentes`), caso o convidado feche a aba antes de redirecionar.
- Se o convidado desistir ou o cartão for recusado, **nada** é gravado na planilha.

## Configuração no Apps Script
1. Abra a planilha → **Extensões → Apps Script**.
2. Em **Configurações do projeto** (engrenagem) → **Propriedades do script**:
   - **Propriedade:** `PAGBANK_TOKEN`
   - **Valor:** seu token de produção do PagBank
3. No **Editor** (`</>`), cole o conteúdo de [`Code.gs`](./Code.gs) em `Código.gs` e salve.
4. Clique em **Implantar → Gerenciar implantações → Editar (lápis) → Versão: Nova versão → Implantar**.
5. *(Recomendado)* Em **Acionadores** (ícone de relógio à esquerda) → **Adicionar acionador**:
   - Função: `verificarPagamentosPendentes`
   - Origem do evento: `Baseado no tempo` → `Contador de minutos` → `A cada 5 minutos` (ou `10 minutos`).
