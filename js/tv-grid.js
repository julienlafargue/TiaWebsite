/* ============================================================
   tv-grid.js — mur de CRT réaliste (cadres + écrans en CSS).
   - 6 chaînes catégories cliquables (mode `photo`) + cellules décor
     (static / glitch) + panneau central « index » (tracklist).
   - Clic chaîne → effet zapping (flash → static canvas) → reel.html?cat=
   - Hover : vibration ±1px (GSAP sinon WAAPI) · reduced-motion respecté
   ============================================================ */
import { reducedMotion } from "./main.js";
import { t } from "./i18n.js";

/* Les 6 catégories (mode photo, poster = vraie image). Le libellé vient de l'i18n. */
const CATS = [
  { cat: "photographie", ch: "01", tag: "REC",  rec: true, poster: "img/photography/pro/photo-b.png" },
  { cat: "affiches",     ch: "02", tag: "PLAY",            poster: "img/photography/pro/photo-u.png" },
  { cat: "portraits",    ch: "03", tag: "LIVE", rec: true, poster: "img/photography/pro/photo-g.png" },
  { cat: "identites",    ch: "04", tag: "01",              poster: "img/photography/pro/photo-ae.png" },
  { cat: "editions",     ch: "05", tag: "RUSH",            poster: "img/photography/pro/photo-s.png" },
  { cat: "encours",      ch: "06", tag: "WIP",             poster: "img/photography/pro/photo-f.png" },
];

/* Disposition du mur (3×3). Le centre est le panneau index. */
const WALL = [
  { type: "cat", i: 0 },
  { type: "cat", i: 1 },
  { type: "decor", mode: "static", tag: "NO SIGNAL", label: "CH 99" },
  { type: "cat", i: 2 },
  { type: "index" },
  { type: "cat", i: 3 },
  { type: "decor", mode: "glitch", tag: "VHS", label: "CH 00", poster: "img/photography/pro/photo-ad.png" },
  { type: "cat", i: 4 },
  { type: "cat", i: 5 },
];

/* Contenu de l'écran selon le mode. `band` = nom de catégorie affiché clairement. */
function screenHTML(mode, poster, tag, rec, word, band) {
  const img = poster ? `<img src="${poster}" alt="" loading="lazy" decoding="async">` : "";
  const fx = mode === "static" || mode === "glitch" || mode === "bars"
    ? `<div class="crt__fx"></div>` : "";
  const w = word ? `<div class="crt__word">${word}</div>` : "";
  const b = band ? `<span class="crt__cat">${band}</span>` : "";
  const t = tag ? `<span class="crt__tag${rec ? " is-rec" : ""}">${tag}</span>` : "";
  return `<div class="crt__screen">${img}${fx}${w}${b}</div>${t}`;
}

const controlsHTML = `
  <div class="crt__controls">
    <span class="crt__knob"></span>
    <span class="crt__grille"></span>
    <span class="crt__knob"></span>
  </div>`;

/* ---- Clic : on « entre dans toute la télé » (boîtier zoomé) → navigation ---- */
function zap(cat, cellEl) {
  const dest = `reel.html?cat=${cat}`;
  if (reducedMotion() || !cellEl) { location.href = dest; return; }

  const r = cellEl.getBoundingClientRect();
  const vw = window.innerWidth, vh = window.innerHeight;

  // clone de la cellule entière (boîtier + écran), agrandi jusqu'au plein écran
  const zoom = cellEl.cloneNode(true);
  zoom.classList.add("tv-zoom");
  zoom.style.cssText =
    `position:fixed;left:0;top:0;width:${vw}px;height:${vh}px;margin:0;z-index:9000;` +
    `transform-origin:top left;will-change:transform;`;
  document.body.appendChild(zoom);

  const sx = r.width / vw, sy = r.height / vh;
  const anim = zoom.animate(
    [
      { transform: `translate(${r.left}px,${r.top}px) scale(${sx},${sy})` },
      { transform: `translate(${vw * 0.5 - r.width * 0.5}px,${vh * 0.5 - r.height * 0.5}px) scale(${sx * 1.05},${sy * 1.05})`, offset: 0.18 },
      { transform: `translate(0,0) scale(1,1)` },
    ],
    { duration: 560, easing: "cubic-bezier(0.7,0,0.25,1)", fill: "forwards" }
  );
  anim.onfinish = () => {
    const flash = document.createElement("div");
    flash.className = "page-fx flash";
    flash.style.opacity = "1";
    document.body.appendChild(flash);
    setTimeout(() => { location.href = dest; }, 90);
  };
}

/* vibration au survol */
function vibrate(el) {
  let vib;
  el.addEventListener("mouseenter", () => {
    if (reducedMotion()) return;
    if (window.gsap) {
      vib = window.gsap.to(el, { x: "+=1", y: "-=1", duration: 0.05, repeat: -1, yoyo: true, ease: "none" });
    } else {
      el.animate(
        [{ transform: "translate3d(0,0,0)" }, { transform: "translate3d(1px,-1px,0)" }],
        { duration: 90, direction: "alternate", iterations: Infinity }
      );
    }
  });
  el.addEventListener("mouseleave", () => { if (vib) { vib.kill(); vib = null; } });
}

function makeCat(spec) {
  const ch = CATS[spec.i];
  const el = document.createElement("article");
  el.className = "crt";
  el.setAttribute("role", "link");
  el.tabIndex = 0;
  el.dataset.cat = ch.cat;
  const name = t(`cat.${ch.cat}`);
  el.setAttribute("aria-label", `${name}`);
  el.innerHTML =
    screenHTML("photo", ch.poster, ch.tag, ch.rec, null, `<span data-i18n="cat.${ch.cat}">${name}</span>`) +
    controlsHTML +
    `<span class="crt__label">CH ${ch.ch}</span>`;
  const go = () => zap(ch.cat, el);
  el.addEventListener("click", go);
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
  });
  vibrate(el);
  return el;
}

function makeDecor(spec) {
  const el = document.createElement("div");
  el.className = `crt crt--${spec.mode}`;
  el.setAttribute("aria-hidden", "true");
  el.innerHTML =
    screenHTML(spec.mode, spec.poster || "", spec.tag) +
    controlsHTML +
    `<span class="crt__label">${spec.label || ""}</span>`;
  return el;
}

function makeIndex() {
  const el = document.createElement("div");
  el.className = "crt crt--index";
  el.innerHTML = `
    <h3>Index</h3>
    <ol>
      ${CATS.map((c) => `<li><span>#${c.ch}</span><a href="reel.html?cat=${c.cat}" data-i18n="cat.${c.cat}">${t(`cat.${c.cat}`)}</a></li>`).join("")}
    </ol>`;
  return el;
}

function initTVGrid() {
  document.querySelectorAll("[data-tv-grid]").forEach((grid) => {
    grid.classList.add("tv-grid");
    WALL.forEach((spec) => {
      const node =
        spec.type === "cat" ? makeCat(spec) :
        spec.type === "index" ? makeIndex() :
        makeDecor(spec);
      grid.appendChild(node);
    });
  });
}

document.addEventListener("DOMContentLoaded", initTVGrid);
export { CATS };
