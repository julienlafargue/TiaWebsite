/* ============================================================
   series.js — carrousel 3D d'une série.
   - Photos en perspective, défilement molette / drag / flèches
   - Clic sur une photo : elle s'agrandit + description à droite
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

let current = 0;
let open = false;
const slides = [];

function build() {
  titleEl.textContent = data.label;
  document.title = `${data.label} — TIA-LANA`;

  data.photos.forEach((p, i) => {
    const b = document.createElement("button");
    b.className = "slide";
    b.type = "button";
    b.setAttribute("aria-label", p.title);
    b.innerHTML = `<img src="${p.src}" alt="${p.title}" loading="lazy" />`;
    b.addEventListener("click", () => {
      if (i === current) toggleOpen(true);
      else { current = i; if (open) renderDetail(); layout(); }
    });
    stage.appendChild(b);
    slides.push(b);
  });
  layout();
}

/* place chaque photo dans l'espace 3D selon son écart au centre */
function layout() {
  const n = slides.length;
  slides.forEach((el, i) => {
    const off = i - current;
    const a = Math.abs(off);
    const spacing = open ? 46 : 30;          // % de largeur entre deux photos
    const x = off * spacing;
    const rot = open ? 0 : Math.max(-42, Math.min(42, -off * 26));
    const z = open ? -a * 260 : -a * 140;
    const sc = off === 0 ? (open ? 1 : 1) : (open ? 0.6 : 0.86);
    el.style.transform =
      `translate(-50%, -50%) translateX(${x}%) translateZ(${z}px) rotateY(${rot}deg) scale(${sc})`;
    el.style.opacity = a > 3 ? "0" : (off === 0 ? "1" : open ? "0.25" : "0.75");
    el.style.zIndex = String(50 - a);
    el.style.pointerEvents = a > 3 ? "none" : "auto";
    el.classList.toggle("is-current", off === 0);
  });
  root.classList.toggle("is-open", open);
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
  if (open) renderDetail(); else detail.innerHTML = "";
  layout();
}

function move(d) {
  current = Math.max(0, Math.min(slides.length - 1, current + d));
  if (open) renderDetail();
  layout();
}

/* ---- navigation : molette, drag, clavier ---- */
let acc = 0;
stage.addEventListener("wheel", (e) => {
  e.preventDefault();
  acc += Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
  if (Math.abs(acc) > 60) { move(acc > 0 ? 1 : -1); acc = 0; }
}, { passive: false });

let dragX = null;
stage.addEventListener("pointerdown", (e) => { dragX = e.clientX; });
window.addEventListener("pointerup", (e) => {
  if (dragX === null) return;
  const dx = e.clientX - dragX;
  if (Math.abs(dx) > 60) move(dx < 0 ? 1 : -1);
  dragX = null;
});

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") move(1);
  else if (e.key === "ArrowLeft") move(-1);
  else if (e.key === "Escape" && open) toggleOpen(false);
});

if (stage && detail) build();
