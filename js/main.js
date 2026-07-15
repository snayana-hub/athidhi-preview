// Athidhi site — language toggle, mobile nav, dropdowns, promo carousel (vanilla JS)
(function () {
  var STORE = "athidhi_lang";
  function apply(lang) {
    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll("[data-de]").forEach(function (el) {
      var v = el.getAttribute("data-" + lang); if (v !== null) el.textContent = v;
    });
    document.querySelectorAll("[data-de-href]").forEach(function (el) {
      var h = el.getAttribute("data-" + lang + "-href"); if (h) el.setAttribute("href", h);
    });
    document.querySelectorAll("[data-only]").forEach(function (el) {
      if (el.getAttribute("data-only") === lang) el.removeAttribute("data-lang-hide");
      else el.setAttribute("data-lang-hide", "");
    });
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
    });
    try { localStorage.setItem(STORE, lang); } catch (e) {}
    buildFlip();
  }
  function initLang() {
    var saved; try { saved = localStorage.getItem(STORE); } catch (e) {}
    var q = (location.search.match(/[?&]lang=(de|en)/) || [])[1];
    apply(q || (saved === "en" ? "en" : "de"));
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.addEventListener("click", function () { apply(b.getAttribute("data-lang")); });
    });
  }
  function initNav() {
    var burger = document.querySelector(".hamburger");
    var links = document.querySelector(".nav-links");
    if (burger && links) {
      burger.addEventListener("click", function () { links.classList.toggle("open"); });
    }
    // dropdown: hover on desktop (CSS), tap/click on mobile
    document.querySelectorAll(".nav-links li.has-dd > .dd-toggle").forEach(function (t) {
      t.addEventListener("click", function (e) {
        if (window.matchMedia("(max-width:640px)").matches) {
          e.preventDefault();
          t.parentElement.classList.toggle("open");
        }
      });
    });
    if (links) links.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && !e.target.classList.contains("dd-toggle"))
        links.classList.remove("open");
    });
  }
  function initPromo() {
    var track = document.querySelector(".promo-track");
    if (!track) return;
    var slides = track.querySelectorAll(".promo-slide");
    var dots = document.querySelectorAll(".promo-dots button");
    var i = 0, timer;
    function go(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle("active", k === i); });
      dots.forEach(function (d, k) { d.classList.toggle("active", k === i); });
    }
    function start() { timer = setInterval(function () { go(i + 1); }, 5500); }
    function reset() { clearInterval(timer); start(); }
    dots.forEach(function (d, k) { d.addEventListener("click", function () { go(k); reset(); }); });
    var prev = document.querySelector(".promo-arrow.prev"), next = document.querySelector(".promo-arrow.next");
    if (prev) prev.addEventListener("click", function () { go(i - 1); reset(); });
    if (next) next.addEventListener("click", function () { go(i + 1); reset(); });
    go(0); start();
  }
  var flipCur = 0;
  function buildFlip() {
    var fb = document.querySelector(".flipbook"); if (!fb) return;
    var stage = fb.querySelector(".fb-stage");
    var lang = document.documentElement.getAttribute("lang") || "de";
    var cfg = window.ATHIDHI_MENU_PAGES, pages;
    if (cfg && !Array.isArray(cfg) && (cfg.de || cfg.en)) pages = cfg[lang] || cfg.de || cfg.en;
    else if (Array.isArray(cfg) && cfg.length) pages = cfg;
    else pages = [null, null, null, null, null, null];
    stage.innerHTML = ""; var els = [];
    pages.forEach(function (src, i) {
      var d = document.createElement("div"); d.className = "fb-page";
      if (src) { var im = document.createElement("img"); im.src = src; im.alt = "Menu page " + (i + 1); im.loading = "lazy"; d.appendChild(im); }
      else {
        var mk = lang === "en" ? "Menu" : "Speisekarte";
        var t = lang === "en" ? ("Page " + (i + 1) + " — image coming") : ("Seite " + (i + 1) + " — Foto folgt");
        d.innerHTML = '<div class="fb-ph"><div><div class="mk">' + mk + '</div><div class="n">Athidhi</div><div class="s">' + t + '</div><div class="di"></div></div></div>';
      }
      stage.appendChild(d); els.push(d);
    });
    var N = pages.length;
    if (flipCur > N - 1) flipCur = N - 1; if (flipCur < 0) flipCur = 0;
    var prev = fb.querySelector(".fb-nav.prev"), next = fb.querySelector(".fb-nav.next");
    var curEl = fb.querySelector(".fb-cur"), totEl = fb.querySelector(".fb-total");
    if (totEl) totEl.textContent = N;
    function layout() {
      els.forEach(function (d, i) {
        var turned = i < flipCur; d.classList.toggle("turned", turned);
        d.style.zIndex = turned ? i : (N - i);
      });
      if (curEl) curEl.textContent = Math.min(flipCur + 1, N);
      if (prev) prev.disabled = flipCur === 0;
      if (next) next.disabled = flipCur === N - 1;
    }
    if (next) next.onclick = function () { if (flipCur < N - 1) { flipCur++; layout(); } };
    if (prev) prev.onclick = function () { if (flipCur > 0) { flipCur--; layout(); } };
    layout();
  }
  function init() { initLang(); initNav(); initPromo();
    var yr = document.getElementById("yr"); if (yr) yr.textContent = new Date().getFullYear(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
