/* ============================================================
   series.js — page série : grille éditoriale asymétrique
   + lightbox maison (← → Échap, swipe, compteur).
   ============================================================ */
import { SERIES, SERIES_ORDER } from "./photos.js?v=2";

const key = (() => {
  const c = new URLSearchParams(location.search).get("cat");
  return SERIES_ORDER.includes(c) ? c : SERIES_ORDER[0];
})();
const data = SERIES[key];
const photos = data.photos;

/* rythme asymétrique : classes de taille + décalage vertical */
const PATTERN = ["--wide", "--narrow", "", "--push", "--narrow", "--wide --push"];

const gallery = document.querySelector("[data-gallery]");
const titleEl = document.querySelector("[data-series-title]");
const metaEl = document.querySelector("[data-series-meta]");
const introEl = document.querySelector("[data-series-intro]");

function build() {
  titleEl.textContent = data.label;
  metaEl.textContent = data.meta;
  if (introEl) introEl.textContent = data.intro || "";
  document.title = `${data.label} — TIA-LANA`;

  photos.forEach((p, i) => {
    const fig = document.createElement("figure");
    const mods = PATTERN[i % PATTERN.length].trim().split(/\s+/).filter(Boolean);
    fig.className = ["gallery__fig", ...mods.map((m) => "gallery__fig" + m)].join(" ");
    fig.innerHTML =
      `<img src="${p.src}" alt="${p.title}" loading="lazy" decoding="async" />` +
      `<figcaption class="gallery__cap">${String(i + 1).padStart(2, "0")} · ${p.title}</figcaption>`;
    fig.addEventListener("click", () => open(i));
    gallery.appendChild(fig);
  });
}

/* ---- lightbox ---- */
const lb = document.querySelector("[data-lightbox]");
const lbImg = lb.querySelector("[data-lb-img]");
const lbTitle = lb.querySelector("[data-lb-title]");
const lbDesc = lb.querySelector("[data-lb-desc]");
const lbCount = lb.querySelector("[data-lb-count]");
let idx = 0;

function render() {
  const p = photos[idx];
  lbImg.src = p.src;
  lbImg.alt = p.title;
  lbTitle.textContent = p.title;
  lbDesc.textContent = p.desc;
  lbCount.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;
}
function open(i) {
  idx = i; render();
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
}
function close() {
  lb.classList.remove("open");
  document.body.style.overflow = "";
}
function go(d) { idx = (idx + d + photos.length) % photos.length; render(); }

lb.querySelector("[data-lb-close]").addEventListener("click", close);
lb.querySelector("[data-lb-prev]").addEventListener("click", () => go(-1));
lb.querySelector("[data-lb-next]").addEventListener("click", () => go(1));
lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lightbox__stage")) close(); });

window.addEventListener("keydown", (e) => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") close();
  else if (e.key === "ArrowRight") go(1);
  else if (e.key === "ArrowLeft") go(-1);
});

/* swipe tactile */
let sx = null;
lb.addEventListener("pointerdown", (e) => { sx = e.clientX; });
lb.addEventListener("pointerup", (e) => {
  if (sx === null) return;
  const dx = e.clientX - sx;
  if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  sx = null;
});

if (gallery) build();
