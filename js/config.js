/* =====================================================================
   CONFIGURAÇÃO DO SITE — EDITE APENAS ESTE ARQUIVO
   ===================================================================== */

const CONFIG = {
  // ---- Dados do casal ----
  noiva: "Anna Beatriz",
  noivo: "Daniel",
  dataCasamento: "2026-12-12T18:00:00-03:00",    // formato AAAA-MM-DDTHH:MM:SS-03:00 (horário de Brasília)
  localCerimonia: "Igreja Evangélica Batista em Intermares — Cabedelo/PB",

  // ---- Fotos ----
  fotoCasal: "img/hero.jpg",      // foto redonda do topo (troque por uma foto dos noivos, ex.: img/casal.jpg)
  fotoBanner: "img/hero.jpg",     // foto grande, de ponta a ponta, logo abaixo da apresentação
  galeria: [                      // 3 fotos da seção "O Casal" (troque pelos arquivos reais na pasta img/)
    "img/foto-placeholder.svg",
    "img/foto-placeholder.svg",
    "img/foto-placeholder.svg",
  ],

  // ---- Textos (cada item da lista é um parágrafo) ----
  textoBoasVindas: [
    "<b>Criamos este site para compartilhar com vocês os detalhes do nosso casamento.</b>",
    "Estamos muito felizes e contamos com a presença de todos no nosso grande dia! " +
    "Não esqueça de confirmar sua presença no menu “Confirme sua presença”.",
    "Para nos presentear, escolha qualquer item da Lista de Presentes. " +
    "O valor é enviado via Pix diretamente para nós e vai nos ajudar a montar o nosso lar e a viver nossa lua de mel.",
    "<b>Fiquem à vontade! Aguardamos vocês no nosso grande dia!</b>",
  ],
  textoCasal: [
    "Histórias de amor existem e, às vezes, nem nós mesmos acreditamos em todo o tempo que já estamos juntos.",
    "Mas o brilho dos nossos olhares nos faz lembrar o porquê de chegarmos até aqui sem sentir o tempo passar... Vamos nos casar!",
    "Estamos preparando tudo com muito carinho para celebrar cada momento com nossos amigos e familiares queridos!",
  ],
  textoCerimonia: [
    "Esperamos por vocês às <b>18h</b>!",
    "Contamos com a sua presença para celebrar esse momento tão especial ao nosso lado.",
  ],
  // Endereço usado no mapa do Google (pode ajustar se o pino não cair no lugar certo)
  enderecoMapa: "Igreja Evangélica Batista em Intermares, Cabedelo - PB",

  // ---- Padrinhos (edite os nomes e coloque as fotos reais em img/) ----
  textoPadrinhos: [
    "<b>Aos nossos queridos padrinhos:</b>",
    "É uma emoção única e indescritível tê-los ao nosso lado e poder partilhar com vocês toda a felicidade dessa nova etapa em nossas vidas: nosso casamento! Por isso, desejamos tê-los como testemunhas do nosso sonho e do nosso amor!",
  ],
  padrinhos: [
    { nomes: "Padrinhos 1", foto: "img/padrinho-placeholder.svg" },
    { nomes: "Padrinhos 2", foto: "img/padrinho-placeholder.svg" },
    { nomes: "Padrinhos 3", foto: "img/padrinho-placeholder.svg" },
    { nomes: "Padrinhos 4", foto: "img/padrinho-placeholder.svg" },
  ],

  // ---- Dados do Pix (quem recebe o dinheiro) ----
  pix: {
    chave: "seuemail@exemplo.com",   // CPF (só números), e-mail, celular (+5511999999999) ou chave aleatória
    nomeRecebedor: "Beatriz Silva",  // nome do titular da conta (máx. 25 letras)
    cidade: "Sao Paulo",             // cidade do titular (máx. 15 letras)
  },

  // ---- WhatsApp para o convidado avisar que presenteou (opcional) ----
  // Use DDI + DDD + número, só dígitos. Deixe "" para esconder o botão.
  whatsapp: "5511999999999",
};

/* =====================================================================
   LISTA DE PRESENTES
   - imagem: arquivo dentro da pasta img/ (ou um link https://...)
   - valor: preço total em reais
   - cotas: (opcional) divide o presente em N partes iguais;
            o convidado escolhe quantas cotas quer dar
   - categoria: "casa", "cozinha" ou "lua-de-mel" (usado no filtro)
   ===================================================================== */

const PRESENTES = [
  {
    id: "panelas",
    nome: "Jogo de Panelas",
    descricao: "Conjunto de panelas antiaderentes para as primeiras receitas a dois.",
    imagem: "img/panelas.jpg",
    valor: 450,
    categoria: "cozinha",
  },
  {
    id: "cafeteira",
    nome: "Cafeteira Expresso",
    descricao: "Para começar todas as manhãs com aquele cafezinho especial.",
    imagem: "img/cafeteira.jpg",
    valor: 600,
    categoria: "cozinha",
  },
  {
    id: "jogo-cama",
    nome: "Jogo de Cama King",
    descricao: "Lençóis de algodão egípcio 400 fios para noites de sono tranquilas.",
    imagem: "img/jogo-cama.jpg",
    valor: 320,
    categoria: "casa",
  },
  {
    id: "jantar",
    nome: "Aparelho de Jantar",
    descricao: "Aparelho de porcelana com 30 peças para receber a família e os amigos.",
    imagem: "img/jantar.jpg",
    valor: 380,
    categoria: "cozinha",
  },
  {
    id: "liquidificador",
    nome: "Liquidificador",
    descricao: "Potente e silencioso, perfeito para sucos e vitaminas.",
    imagem: "img/liquidificador.jpg",
    valor: 250,
    categoria: "cozinha",
  },
  {
    id: "airfryer",
    nome: "Air Fryer",
    descricao: "Fritadeira sem óleo para refeições rápidas e saudáveis.",
    imagem: "img/airfryer.jpg",
    valor: 500,
    categoria: "cozinha",
  },
  {
    id: "tacas",
    nome: "Jogo de Taças de Cristal",
    descricao: "Para brindar todas as conquistas da nossa nova vida.",
    imagem: "img/tacas.jpg",
    valor: 280,
    categoria: "casa",
  },
  {
    id: "toalhas",
    nome: "Kit de Toalhas",
    descricao: "Toalhas de banho felpudas e macias para o nosso lar.",
    imagem: "img/toalhas.jpg",
    valor: 200,
    categoria: "casa",
  },
  {
    id: "aspirador",
    nome: "Aspirador Robô",
    descricao: "Para a casa ficar limpinha enquanto aproveitamos o tempo juntos.",
    imagem: "img/aspirador.jpg",
    valor: 1500,
    cotas: 10,
    categoria: "casa",
  },
  {
    id: "lua-jantar",
    nome: "Jantar Romântico na Lua de Mel",
    descricao: "Um jantar à luz de velas, pé na areia, durante a nossa viagem.",
    imagem: "img/lua-jantar.jpg",
    valor: 350,
    categoria: "lua-de-mel",
  },
  {
    id: "lua-barco",
    nome: "Passeio de Barco",
    descricao: "Um dia inteiro navegando pelas águas cristalinas do nosso destino.",
    imagem: "img/lua-barco.jpg",
    valor: 600,
    cotas: 4,
    categoria: "lua-de-mel",
  },
  {
    id: "lua-hotel",
    nome: "Diárias no Hotel",
    descricao: "Ajude-nos com as diárias do hotel com vista para o mar.",
    imagem: "img/lua-hotel.jpg",
    valor: 4000,
    cotas: 20,
    categoria: "lua-de-mel",
  },
];

