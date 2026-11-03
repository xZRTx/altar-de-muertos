/* Dibuja la página a partir de data.js y maneja el cambio de idioma */
var lang = "es";
var $ = function (id) { return document.getElementById(id); };
var PLAY = '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21"/><path d="M20 16l13 8-13 8z"/></svg>';
function videoHTML(L, u) {
  if (L.yt)   return '<iframe src="https://www.youtube-nocookie.com/embed/' + L.yt + '" title="' + L[lang].n + '" allowfullscreen loading="lazy"></iframe>';
  if (L.file) return '<video controls preload="metadata" src="' + L.file + '"></video>';
  return '<div class="ph">' + PLAY + '<span>' + u.ph + '</span></div>';
}
function render() {
  var u = UI[lang], n = LEVELS.length, i, L, altar = "", idx = "", chips = "", h = "";
  document.documentElement.lang = lang;
  document.title = u.title;
  $("brand").textContent = u.brand; $("t-title").textContent = u.title;
  $("t-intro").textContent = u.intro; $("t-cta").textContent = u.cta; $("t-foot").textContent = u.foot;
  document.querySelectorAll(".seg button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.l === lang); });
  for (i = n - 1; i >= 0; i--) {
    L = LEVELS[i];
    altar += '<a href="#n' + (i+1) + '" style="--c:' + L.c + ';width:' + (38 + (n-1-i) * (62/(n-1))) + '%" aria-label="' + u.lvl + ' ' + (i+1) + ': ' + L[lang].n + '"></a>';
  }
  for (i = 0; i < n; i++) {
    L = LEVELS[i];
    idx   += '<li><a href="#n' + (i+1) + '" data-i="n' + (i+1) + '">' + (i+1) + '. ' + L[lang].n + '</a></li>';
    chips += '<a class="chip" href="#n' + (i+1) + '">' + (i+1) + '</a>';
    h += '<section class="level" id="n' + (i+1) + '"><div class="kicker">' + u.lvl + ' ' + (i+1) + '</div>' +
         '<h2>' + L[lang].n + '</h2><p class="lead">' + L[lang].d + '</p>' +
         '<div class="media">' + videoHTML(L, u) + '</div>' +
         '<details><summary>' + u.tx + '</summary><div class="tx">' +
         L[lang].t.map(function (p) { return "<p>" + p + "</p>"; }).join("") + '</div></details></section>';
  }
  $("altar").innerHTML = altar; $("index").innerHTML = idx; $("chips").innerHTML = chips; $("levels").innerHTML = h;
  observe();
  document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
}
var io;
function observe() {
  if (io) io.disconnect();
  if (!("IntersectionObserver" in window)) return;
  io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) document.querySelectorAll(".index a").forEach(function (a) { a.classList.toggle("on", a.dataset.i === e.target.id); });
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  document.querySelectorAll(".level").forEach(function (s) { io.observe(s); });
}
document.querySelectorAll(".seg button").forEach(function (b) {
  b.addEventListener("click", function () { if (lang !== b.dataset.l) { lang = b.dataset.l; render(); } });
});
render();
