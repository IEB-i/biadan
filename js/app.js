/* =====================================================================
   Lógica do site (não precisa editar — use config.js)
   ===================================================================== */
(() => {
  const $ = (id) => document.getElementById(id);
  const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const CATS = { casa: "Casa", cozinha: "Cozinha", "lua-de-mel": "Lua de mel" };
  const fuso = { timeZone: "America/Recife" };

  /* ---------- Cabeçalho, fotos e textos ---------- */
  const data = new Date(CONFIG.dataCasamento);
  const diaLongo = data
    .toLocaleDateString("pt-BR", { ...fuso, day: "2-digit", month: "long", year: "numeric" })
    .replace(/\bde ([a-zç])/g, (_, l) => "de " + l.toUpperCase());
  const hora = data
    .toLocaleTimeString("pt-BR", { ...fuso, hour: "2-digit", minute: "2-digit" })
    .replace(":00", "h")
    .replace(":", "h");

  $("nomeNoiva").textContent = CONFIG.noiva;
  $("nomeNoivo").textContent = CONFIG.noivo;
  $("topLogo").textContent = `${CONFIG.noiva[0]} & ${CONFIG.noivo[0]}`;
  $("rodapeNomes").textContent = `${CONFIG.noiva} & ${CONFIG.noivo}`;
  $("dataTexto").textContent = `${diaLongo} · ${hora}`;
  $("rodapeData").textContent = `${diaLongo} · ${hora} · ${CONFIG.localCerimonia}`;
  document.title = `${CONFIG.noiva} & ${CONFIG.noivo} — Casamento`;

  $("fotoCasal").src = CONFIG.fotoCasal || "img/hero.jpg";
  $("banner").style.backgroundImage = `url("${CONFIG.fotoBanner || "img/hero.jpg"}")`;

  const renderParagrafos = (el, lista) => {
    el.innerHTML = (lista || []).map((t) => `<p>${t}</p>`).join("");
  };
  renderParagrafos($("textoBoasVindas"), CONFIG.textoBoasVindas);
  renderParagrafos($("textoCasal"), CONFIG.textoCasal);
  renderParagrafos($("textoPadrinhos"), CONFIG.textoPadrinhos);
  renderParagrafos($("textoCerimonia"), CONFIG.textoCerimonia);

  /* Galeria de fotos (O Casal) */
  if (CONFIG.galeria && CONFIG.galeria.length) {
    $("galeria").innerHTML = CONFIG.galeria
      .map(
        (src) =>
          `<img src="${src || "img/foto-placeholder.svg"}" alt="Foto do casal" loading="lazy" onerror="this.src='img/foto-placeholder.svg'" />`
      )
      .join("");
  } else {
    $("galeria").classList.add("oculto");
  }

  /* Padrinhos */
  if (CONFIG.padrinhos && CONFIG.padrinhos.length) {
    $("listaPadrinhos").innerHTML = CONFIG.padrinhos
      .map(
        (p) =>
          `<div class="padrinho"><img src="${p.foto || "img/padrinho-placeholder.svg"}" alt="${p.nomes}" loading="lazy" onerror="this.src='img/padrinho-placeholder.svg'" /><p>${p.nomes}</p></div>`
      )
      .join("");
  }

  /* Cerimônia e Mapa */
  $("tituloCerimonia").textContent = CONFIG.localCerimonia.split("—")[0].trim() || "Cerimônia";
  const qMapa = encodeURIComponent(CONFIG.enderecoMapa || CONFIG.localCerimonia);
  $("mapa").src = `https://maps.google.com/maps?q=${qMapa}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  $("btnComoChegar").href = `https://www.google.com/maps/search/?api=1&query=${qMapa}`;

  /* Contagem regressiva */
  function contagem() {
    let diff = Math.max(0, data - new Date());
    const d = Math.floor(diff / 864e5); diff -= d * 864e5;
    const h = Math.floor(diff / 36e5); diff -= h * 36e5;
    const m = Math.floor(diff / 6e4); diff -= m * 6e4;
    $("cdDias").textContent = d;
    $("cdHoras").textContent = h;
    $("cdMin").textContent = m;
    $("cdSeg").textContent = Math.floor(diff / 1e3);
  }
  contagem();
  setInterval(contagem, 1000);

  /* Barra fixa ao rolar + menu mobile */
  window.addEventListener("scroll", () => {
    $("topbar").classList.toggle("visivel", window.scrollY > 360);
  });
  $("menuToggle").addEventListener("click", () => $("menu").classList.toggle("aberto"));
  $("menu").querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => $("menu").classList.remove("aberto"))
  );

  /* ---------- Lista de Presentes e Carrinho ---------- */
  let filtro = "todos";
  let ordem = "padrao";
  const carrinho = []; // { id, nome, imagem, unitario, qtd, max, livre }

  const valorUnitario = (p) => (p.cotas > 1 ? Math.round((p.valor / p.cotas) * 100) / 100 : p.valor);

  function renderLista() {
    let lista = PRESENTES.filter((p) => filtro === "todos" || p.categoria === filtro);
    if (ordem === "az") lista = [...lista].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    if (ordem === "menor") lista = [...lista].sort((a, b) => valorUnitario(a) - valorUnitario(b));
    if (ordem === "maior") lista = [...lista].sort((a, b) => valorUnitario(b) - valorUnitario(a));

    const grade = $("grade");
    grade.innerHTML = "";
    lista.forEach((p) => {
      const cota = p.cotas > 1;
      const unit = valorUnitario(p);
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div class="card-img">
          <img src="${p.imagem}" alt="${p.nome}" loading="lazy" />
          <span class="badge">${CATS[p.categoria] || ""}</span>
        </div>
        <h3>${p.nome}</h3>
        <p class="card-desc">${p.descricao}</p>
        <div class="preco">
          ${brl(unit)}
          ${cota ? `<small>por cota · ${p.cotas} cotas de ${brl(p.valor)}</small>` : ""}
        </div>
        <button class="btn">Presentear</button>`;
      card.querySelector(".btn").addEventListener("click", () => adicionarAoCarrinho(p));
      grade.appendChild(card);
    });
  }

  document.querySelectorAll(".filtro").forEach((b) =>
    b.addEventListener("click", () => {
      document.querySelectorAll(".filtro").forEach((x) => x.classList.remove("ativo"));
      b.classList.add("ativo");
      filtro = b.dataset.cat;
      renderLista();
    })
  );
  $("ordem").addEventListener("change", (e) => {
    ordem = e.target.value;
    renderLista();
  });
  renderLista();

  function totalDoCarrinho() {
    return Math.round(carrinho.reduce((s, it) => s + it.unitario * it.qtd, 0) * 100) / 100;
  }

  function atualizarBotaoCarrinho() {
    const totalItens = carrinho.reduce((s, it) => s + it.qtd, 0);
    $("carrinhoTexto").textContent = totalItens
      ? `Ver carrinho (${totalItens} · ${brl(totalDoCarrinho())})`
      : "Carrinho vazio";
  }

  function adicionarAoCarrinho(p) {
    const existente = carrinho.find((it) => it.id === p.id);
    if (existente) {
      if (!existente.max || existente.qtd < existente.max) existente.qtd++;
      else toast(`Limite de ${existente.max} cotas atingido para este item.`);
    } else {
      carrinho.push({
        id: p.id,
        nome: p.nome,
        imagem: p.imagem,
        unitario: valorUnitario(p),
        qtd: 1,
        max: p.cotas > 1 ? p.cotas : 10,
        livre: false,
      });
    }
    atualizarBotaoCarrinho();
    abrirModal(1);
  }

  $("btnLivre").addEventListener("click", () => {
    if (!carrinho.some((it) => it.livre)) {
      carrinho.push({
        id: "livre",
        nome: "Contribuição livre",
        imagem: "",
        unitario: 100,
        qtd: 1,
        max: 1,
        livre: true,
      });
      atualizarBotaoCarrinho();
    }
    abrirModal(1);
  });

  $("btnCarrinho").addEventListener("click", () => abrirModal(1));

  /* ---------- Modal (Carrinho -> Dados -> Pix -> Obrigado) ---------- */
  function mostrarEtapa(n) {
    const etapas = ["etapaCarrinho", "etapaDados", "etapaPix", "etapaObrigado"];
    etapas.forEach((id, i) => $(id).classList.toggle("oculto", i !== n - 1));
    $("modal").querySelector(".modal-box").scrollTop = 0;
  }

  function renderCarrinho() {
    const box = $("itensCarrinho");
    if (!carrinho.length) {
      box.innerHTML = `<p class="c-vazio">Seu carrinho está vazio. Escolha um presente na lista!</p>`;
      $("totalCarrinho").textContent = brl(0);
      $("btnFinalizar").classList.add("oculto");
      return;
    }
    $("btnFinalizar").classList.remove("oculto");
    box.innerHTML = "";
    carrinho.forEach((it, idx) => {
      const row = document.createElement("div");
      row.className = "c-item";
      row.innerHTML = `
        ${it.imagem ? `<img src="${it.imagem}" alt="" />` : ""}
        <div class="c-info">
          <strong>${it.nome}</strong>
          <small>${it.livre ? "Escolha o valor em R$" : brl(it.unitario) + " cada"}</small>
        </div>
        ${it.livre
          ? `<input type="number" class="c-livre-input" min="1" step="0.01" value="${it.unitario}" aria-label="Valor da contribuição livre" />`
          : `<div class="c-qty">
                 <button type="button" class="menos" aria-label="Menos">−</button>
                 <span>${it.qtd}</span>
                 <button type="button" class="mais" aria-label="Mais">+</button>
               </div>`
        }
        <button type="button" class="c-remover" title="Remover" aria-label="Remover item">&times;</button>`;

      if (it.livre) {
        row.querySelector(".c-livre-input").addEventListener("input", (e) => {
          it.unitario = Math.max(0, parseFloat(String(e.target.value).replace(",", ".")) || 0);
          $("totalCarrinho").textContent = brl(totalDoCarrinho());
          atualizarBotaoCarrinho();
        });
      } else {
        row.querySelector(".menos").addEventListener("click", () => {
          if (it.qtd > 1) it.qtd--;
          else carrinho.splice(idx, 1);
          atualizarBotaoCarrinho();
          renderCarrinho();
        });
        row.querySelector(".mais").addEventListener("click", () => {
          if (it.qtd < it.max) it.qtd++;
          atualizarBotaoCarrinho();
          renderCarrinho();
        });
      }
      row.querySelector(".c-remover").addEventListener("click", () => {
        carrinho.splice(idx, 1);
        atualizarBotaoCarrinho();
        renderCarrinho();
      });
      box.appendChild(row);
    });
    $("totalCarrinho").textContent = brl(totalDoCarrinho());
  }

  function abrirModal(etapa) {
    renderCarrinho();
    mostrarEtapa(etapa);
    $("modal").classList.add("aberto");
    $("modal").setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function fecharModal() {
    $("modal").classList.remove("aberto");
    $("modal").setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  $("modalFechar").addEventListener("click", fecharModal);
  $("btnMais").addEventListener("click", fecharModal);
  $("btnConcluir").addEventListener("click", fecharModal);
  $("modal").addEventListener("click", (e) => { if (e.target === $("modal")) fecharModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") fecharModal(); });

  $("btnFinalizar").addEventListener("click", () => {
    const tot = totalDoCarrinho();
    if (tot < 1) { toast("O valor mínimo é R$ 1,00."); return; }
    $("totalDados").textContent = brl(tot);
    mostrarEtapa(2);
  });
  $("voltarCarrinho").addEventListener("click", () => { renderCarrinho(); mostrarEtapa(1); });
  $("voltarDados").addEventListener("click", () => mostrarEtapa(2));

  /* ---------- Gerar Pix ---------- */
  let ultimoTotalPix = 0;
  $("btnGerarPix").addEventListener("click", () => {
    ultimoTotalPix = totalDoCarrinho();
    if (ultimoTotalPix < 1) { toast("O valor mínimo é R$ 1,00."); return; }

    const desc =
      carrinho.length === 1
        ? `Presente ${carrinho[0].nome}`
        : `Presentes casamento (${carrinho.length} itens)`;

    const codigo = Pix.gerar({
      chave: CONFIG.pix.chave,
      nome: CONFIG.pix.nomeRecebedor,
      cidade: CONFIG.pix.cidade,
      valor: ultimoTotalPix,
      descricao: desc,
    });

    const qr = qrcode(0, "M");
    qr.addData(codigo);
    qr.make();
    $("qr").innerHTML = qr.createSvgTag({ cellSize: 6, margin: 2, scalable: true });

    $("pixCodigo").value = codigo;
    $("totalPix").textContent = brl(ultimoTotalPix);
    $("recebedor").textContent = `Recebedor: ${CONFIG.pix.nomeRecebedor}`;
    $("btnWhats").classList.toggle("oculto", !CONFIG.whatsapp);
    mostrarEtapa(3);
  });

  $("btnCopiar").addEventListener("click", async () => {
    const txt = $("pixCodigo").value;
    try {
      await navigator.clipboard.writeText(txt);
    } catch {
      $("pixCodigo").select();
      document.execCommand("copy");
    }
    toast("Código Pix copiado! Cole no app do seu banco.");
  });

  $("btnWhats").addEventListener("click", () => {
    const nome = $("nomeConvidado").value.trim() || "Um convidado";
    const recado = $("recado").value.trim();
    const resumo = carrinho
      .map((it) => `${it.qtd > 1 ? it.qtd + "x " : ""}${it.nome}`)
      .join(", ");
    let msg = `Olá, ${CONFIG.noiva} e ${CONFIG.noivo}! 💍\n\n${nome} acabou de presentear vocês com *${resumo}* no valor de *${brl(ultimoTotalPix)}* via Pix.`;
    if (recado) msg += `\n\nRecado: "${recado}"`;
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
    carrinho.length = 0;
    atualizarBotaoCarrinho();
    mostrarEtapa(4);
  });

  /* ---------- Confirmação de Presença (RSVP via WhatsApp) ---------- */
  for (let i = 1; i <= 10; i++) $("rAdultos").add(new Option(i, i));
  for (let i = 0; i <= 10; i++) $("rCriancas").add(new Option(i, i));

  document.querySelectorAll('input[name="vai"]').forEach((r) =>
    r.addEventListener("change", () => {
      const vai = document.querySelector('input[name="vai"]:checked').value === "sim";
      $("rQtd").classList.toggle("oculto", !vai);
    })
  );

  $("rsvp").addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = $("rNome").value.trim();
    if (!nome) { $("rNome").focus(); return; }
    const vai = document.querySelector('input[name="vai"]:checked').value === "sim";
    const adultos = $("rAdultos").value;
    const criancas = $("rCriancas").value;
    const obs = $("rObs").value.trim();

    let msg = `Olá, ${CONFIG.noiva} e ${CONFIG.noivo}! 💌\n\nConfirmação de presença — *${nome}*\n`;
    msg += vai
      ? `Presença: *Sim, estarei lá!* (${adultos} adulto${adultos > 1 ? "s" : ""}${criancas > 0 ? `, ${criancas} criança${criancas > 1 ? "s" : ""}` : ""})`
      : "Presença: *Infelizmente não poderei comparecer.*";
    if (obs) msg += `\nObservações: ${obs}`;

    if (CONFIG.whatsapp) {
      window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
    } else {
      toast("Confirmação registrada!");
    }
    e.target.reset();
    $("rQtd").classList.remove("oculto");
  });

  /* ---------- Toast ---------- */
  let tId;
  function toast(msg) {
    const t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(tId);
    tId = setTimeout(() => t.classList.remove("show"), 2600);
  }
})();
