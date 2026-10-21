/* Presença Pro — interações do site (sem bibliotecas) */
(function () {
  var S = window.SITE || {};
  var get = function (path) {
    return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, S);
  };

  /* ---------- Dados da config nos elementos ---------- */
  document.querySelectorAll("[data-cfg]").forEach(function (el) {
    var v = get(el.getAttribute("data-cfg"));
    if (typeof v === "string") el.textContent = v;
  });
  document.querySelectorAll("[data-cfg-mail]").forEach(function (el) {
    if (S.email) el.href = "mailto:" + S.email;
  });
  document.querySelectorAll("[data-ano]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Links de WhatsApp ---------- */
  var waUrl = function (i, msgKey) {
    var n = S.whatsapp && S.whatsapp[i];
    if (!n) return null;
    var msg = (S.mensagens && (S.mensagens[msgKey] || S.mensagens.geral)) || "";
    return n.link + (msg ? "?text=" + encodeURIComponent(msg) : "");
  };

  // Links diretos para um número específico
  document.querySelectorAll("[data-wa-num]").forEach(function (a) {
    var url = waUrl(+a.getAttribute("data-wa-num"), a.getAttribute("data-msg") || "geral");
    if (url) a.href = url;
  });

  // Botões gerais: abrem a escolha entre os dois números
  var pick = document.createElement("div");
  pick.className = "wa-pick";
  pick.setAttribute("role", "dialog");
  pick.setAttribute("aria-modal", "true");
  pick.setAttribute("aria-labelledby", "wa-pick-title");
  pick.innerHTML =
    '<div class="wa-pick__box">' +
      '<div class="wa-pick__head"><b id="wa-pick-title">Falar com a Presença Pro</b>' +
      '<button class="wa-pick__close" type="button" aria-label="Fechar">×</button></div>' +
      "<p>Escolha um dos nossos números de WhatsApp:</p>" +
      '<div class="wa-cards"></div>' +
    "</div>";
  document.body.appendChild(pick);
  var list = pick.querySelector(".wa-cards");
  var lastFocus = null;

  var openPick = function (msgKey, trigger) {
    lastFocus = trigger;
    list.innerHTML = "";
    (S.whatsapp || []).forEach(function (n, i) {
      var a = document.createElement("a");
      a.className = "wa-card";
      a.href = waUrl(i, msgKey);
      a.target = "_blank";
      a.rel = "noopener";
      a.innerHTML =
        '<span class="wa-card__icon"><svg width="24" height="24"><use href="#i-wa"/></svg></span>' +
        "<span><small></small><b></b></span>" +
        '<span class="arrow" aria-hidden="true">↗</span>';
      a.querySelector("small").textContent = n.rotulo;
      a.querySelector("b").textContent = n.numero;
      a.addEventListener("click", closePick);
      list.appendChild(a);
    });
    pick.classList.add("is-open");
    list.querySelector("a").focus();
  };
  var closePick = function () {
    pick.classList.remove("is-open");
    if (lastFocus) lastFocus.focus();
  };
  pick.addEventListener("click", function (e) { if (e.target === pick) closePick(); });
  pick.querySelector(".wa-pick__close").addEventListener("click", closePick);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && pick.classList.contains("is-open")) closePick();
  });

  document.querySelectorAll("[data-wa]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      closeMenu();
      openPick(el.getAttribute("data-wa"), el);
    });
  });

  /* ---------- Menu mobile ---------- */
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  function closeMenu() {
    if (!nav || !nav.classList.contains("is-open")) return;
    nav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Abrir menu");
    document.body.classList.remove("menu-open");
  }
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      document.body.classList.toggle("menu-open", open);
    });
    nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    window.addEventListener("resize", function () { if (window.innerWidth > 860) closeMenu(); });
  }

  /* ---------- Cabeçalho ao rolar ---------- */
  var header = document.querySelector(".header");
  var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 10); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Revelação ao rolar ---------- */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-in"); });
  }
})();
