/* ============================================================
   home-museum.js — la photo « exposée » dans le cadre change en
   fondu enchaîné (deux calques d'image superposés).
   ============================================================ */
import { SERIES, SERIES_ORDER } from "./photos.js?v=1";

/* toutes les photos des 3 séries, dédupliquées, mélangées */
const all = [];
SERIES_ORDER.forEach((k) => SERIES[k].photos.forEach((p) => all.push(p.src)));
const seen = new Set();
const POOL = all.filter((s) => (seen.has(s) ? false : seen.add(s)));
for (let i = POOL.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [POOL[i], POOL[j]] = [POOL[j], POOL[i]];
}

const a = document.querySelector("[data-img-a]");
const b = document.querySelector("[data-img-b]");

if (a && b && POOL.length) {
  let idx = 0;
  let top = a;           // calque visible
  let bottom = b;        // calque caché (prépare la suivante)
  a.src = POOL[0];
  a.classList.add("is-shown");

  const pre = new Image(); pre.src = POOL[1 % POOL.length];

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  setInterval(() => {
    idx = (idx + 1) % POOL.length;
    bottom.src = POOL[idx];
    // laisse l'image se charger avant le fondu
    const swap = () => {
      bottom.classList.add("is-shown");
      top.classList.remove("is-shown");
      const t = top; top = bottom; bottom = t;
      const p = new Image(); p.src = POOL[(idx + 1) % POOL.length];
    };
    if (bottom.complete) swap();
    else bottom.onload = swap;
  }, reduce ? 6000 : 4600);
}
