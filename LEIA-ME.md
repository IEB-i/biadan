# Site de Casamento — Anna Beatriz & Daniel

## Como funciona
1. O convidado navega pelo site (apresentação, história do casal, mapa da cerimônia, lista de presentes e confirmação de presença).
2. Na **Lista de Presentes**, escolhe um ou mais itens (ou cotas) e clica em **Presentear** para colocar no carrinho.
3. No carrinho, clica em **Finalizar com Pix**, preenche o nome e um recado opcional.
4. O site gera na hora um **QR Code Pix** e o **Pix Copia e Cola** com o valor total já preenchido.
5. O dinheiro cai **direto na conta dos noivos**, sem taxa. Ao clicar em **"Já paguei — avisar os noivos"**, abre o WhatsApp com a mensagem pronta.
6. Em **Confirme sua presença**, o convidado preenche se vai e quantos adultos/crianças vão com ele, e envia direto pelo WhatsApp.

## Como personalizar (só um arquivo)
Abra `js/config.js` no Bloco de Notas e altere:
- `fotoCasal`, `fotoBanner`, `galeria` e `padrinhos` (coloque as fotos reais dos noivos na pasta `img/`);
- `textoBoasVindas`, `textoCasal`, `textoCerimonia` e `enderecoMapa`;
- **chave Pix**, nome do titular e cidade (confira com cuidado!);
- WhatsApp que recebe os avisos e confirmações;
- a lista `PRESENTES` (nome, descrição, foto, valor, categoria e, se quiser, `cotas`).

Para trocar as fotos, coloque as imagens na pasta `img/` e use o nome do arquivo no `config.js`
(também dá para colar um link de imagem, por exemplo `https://...jpg`).

## Como testar
Dê dois cliques em `index.html` para abrir no navegador.
**Antes de divulgar:** gere um Pix de R$ 1,00 e pague você mesmo para confirmar que caiu na conta certa.

## Como publicar de graça
- **Netlify Drop:** acesse https://app.netlify.com/drop e arraste a pasta `site`. Você recebe um link para mandar aos convidados.
- **GitHub Pages** ou **Cloudflare Pages** também funcionam (o site é só HTML, CSS e JS).
