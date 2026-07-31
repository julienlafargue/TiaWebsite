/* ============================================================
   series.js — carrousel 3D fluide (boucle rAF, position continue).
   - Photos en perspective ; molette / drag / flèches
   - Clic sur la photo centrale : elle s'agrandit + description à droite
   ============================================================ */
import { SERIES, SERIES_ORDER } from "./photos.js?v=1";

const key = (() => {
  const c = new URLSearchParams(location.search).get("cat");
  return SERIES_ORDER.includes(c) ? c : SERIES_ORDER[0];
})();
const data = SERIES[key];
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const stage = document.querySelector("[data-stage]");
const detail = document.querySelector("[data-detail]");
const root = document.querySelector("[data-series]");
const titleEl = document.querySelector("[data-series-title]");

const slides = [];
let pos = 0;        // position continue (fractionnaire)
let target = 0;     // index visé (entier)
let openAmt = 0;    // 0 = fermé, 1 = ouvert (continu)
let open = false;
let current = 0;

function build() {
  titleEl.textContent = data.label;
  document.title = `${data.label} — TIA-LANA`;

  data.photos.forEach((p, i) => {
    const b = document.createElement("button");
    b.className = "slide";
    b.type = "button";
    b.setAttribute("aria-label", p.title);
    b.innerHTML = `<img src="${p.src}" alt="${p.title}" loading="lazy" draggable="false" />`;
    b.addEventListener("click", () => {
      if (i === Math.round(pos)) toggleOpen(!open);
      else { target = i; if (open) { current = i; renderDetail(); } }
    });
    stage.appendChild(b);
    slides.push(b);
  });
  requestAnimationFrame(frame);
}

/* rendu d'une frame : chaque photo placée selon son écart (fractionnaire) au centre */
function render() {
  const n = slides.length;
  const spacing = 30 + openAmt * 16;      // écartement horizontal (%)
  for (let i = 0; i < n; i++) {
    const el = slides[i];
    const off = i - pos;                  // écart continu
    const a = Math.abs(off);
    const x = off * spacing;
    const rot = Math.max(-44, Math.min(44, -off * 24)) * (1 - openAmt * 0.6);
    const z = -a * (140 + openAmt * 120);
    const isCenter = a < 0.5;
    const grow = isCenter ? openAmt * 0.42 : 0;   // la centrale grossit à l'ouverture
    const sc = (off === 0 ? 1 : Math.max(0.55, 0.86 - a * 0.04)) * (1 - (isCenter ? 0 : openAmt * 0.35)) + grow;
    el.style.transform =
      `translate(-50%, -50%) translateX(${x}%) translateZ(${z}px) rotateY(${rot}deg) scale(${sc})`;
    el.style.opacity = a > 3.2 ? "0" : String(Math.max(0, 1 - a * 0.16 - (isCenter ? 0 : openAmt * 0.6)));
    el.style.zIndex = String(60 - Math.round(a * 10));
    el.style.pointerEvents = a > 3.2 ? "none" : "auto";
    el.classList.toggle("is-current", isCenter);
  }
  const narrow = window.innerWidth < 860;
  const shift = narrow ? `translateY(${-openAmt * 20}%) scale(${1 - openAmt * 0.18})`
                       : `translateX(${-openAmt * 22}%)`;
  stage.style.transform = `translate(-50%, -50%) ${shift}`;
  root.classList.toggle("is-open", openAmt > 0.5);
  // panneau description piloté aussi par le rAF (évite une transition CSS figée)
  detail.style.opacity = String(openAmt);
  detail.style.pointerEvents = openAmt > 0.6 ? "auto" : "none";
  // la légende du bas et le titre s'estompent à l'ouverture
  document.querySelector(".series__hint").style.opacity = String(1 - openAmt);
}

function frame() {
  const k = reduce ? 1 : 0.16;
  pos += (target - pos) * k;
  openAmt += ((open ? 1 : 0) - openAmt) * (reduce ? 1 : 0.18);
  if (Math.abs(target - pos) < 0.001) pos = target;
  if (Math.abs((open ? 1 : 0) - openAmt) < 0.001) openAmt = open ? 1 : 0;
  render();
  requestAnimationFrame(frame);
}

function renderDetail() {
  const p = data.photos[current];
  detail.innerHTML = `
    <p class="series__meta">${data.meta} · ${String(current + 1).padStart(2, "0")}/${String(data.photos.length).padStart(2, "0")}</p>
    <h2 class="series__ph-title">${p.title}</h2>
    <p class="series__desc">${p.desc}</p>
    <button class="series__close" type="button" data-close>✕ <span data-i18n="series.close">Close</span></button>`;
  detail.querySelector("[data-close]").addEventListener("click", () => toggleOpen(false));
}

function toggleOpen(v) {
  open = v;
  if (open) { current = Math.round(pos); target = current; renderDetail(); }
  else detail.innerHTML = "";
}

function move(d) {
  target = Math.max(0, Math.min(slides.length - 1, Math.round(target) + d));
  if (open) { current = target; renderDetail(); }
}

/* ---- navigation ---- */
let acc = 0, wheelLock = false;
stage.addEventListener("wheel", (e) => {
  e.preventDefault();
  acc += Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
  if (!wheelLock && Math.abs(acc) > 40) {
    move(acc > 0 ? 1 : -1);
    acc = 0; wheelLock = true;
    setTimeout(() => { wheelLock = false; }, 130);
  }
}, { passive: false });

let dragX = null, dragged = false;
stage.addEventListener("pointerdown", (e) => { dragX = e.clientX; dragged = false; });
stage.addEventListener("pointermove", (e) => {
  if (dragX === null) return;
  const dx = e.clientX - dragX;
  if (Math.abs(dx) > 8) dragged = true;
});
window.addEventListener("pointerup", (e) => {
  if (dragX === null) return;
  const dx = e.clientX - dragX;
  if (Math.abs(dx) > 55) move(dx < 0 ? 1 : -1);
  dragX = null;
});
/* un drag ne doit pas déclencher le clic d'ouverture */
stage.addEventListener("click", (e) => { if (dragged) { e.preventDefault(); e.stopPropagation(); } }, true);

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") move(1);
  else if (e.key === "ArrowLeft") move(-1);
  else if (e.key === "Escape" && open) toggleOpen(false);
});

if (stage && detail) build();
