/* ============================================================
   tv-grid.js — mur de CRT réaliste (cadres + écrans en CSS).
   - 6 chaînes catégories cliquables (mode `photo`) + cellules décor
     (static / glitch) + panneau central « index » (tracklist).
   - Clic chaîne → effet zapping (flash → static canvas) → reel.html?cat=
   - Hover : vibration ±1px (GSAP sinon WAAPI) · reduced-motion respecté
   ============================================================ */
import { reducedMotion } from "./main.js";

/* Les 6 catégories (mode photo, poster = vraie image). */
const CATS = [
  { cat: "photographie", label: "CH 01 · PHOTOGRAPHIE",       tag: "REC",  rec: true,  poster: "img/photography/pro/photo-b.png" },
  { cat: "affiches",     label: "CH 02 · AFFICHES CINÉMA",    tag: "PLAY", poster: "img/photography/pro/photo-u.png" },
  { cat: "portraits",    label: "CH 03 · PORTRAITS",          tag: "LIVE", rec: true,  poster: "img/photography/pro/photo-g.png" },
  { cat: "identites",    label: "CH 04 · IDENTITÉS",          tag: "01",   poster: "img/photography/pro/photo-ae.png" },
  { cat: "editions",     label: "CH 05 · ÉDITIONS",           tag: "RUSH", poster: "img/photography/pro/photo-s.png" },
  { cat: "encours",      label: "CH 06 · EN COURS",           tag: "WIP",  poster: "img/photography/pro/photo-f.png" },
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

/* Contenu de l'écran selon le mode. */
function screenHTML(mode, poster, tag, rec, word) {
  const img = poster ? `<img src="${poster}" alt="" loading="lazy" decoding="async">` : "";
  const fx = mode === "static" || mode === "glitch" || mode === "bars"
    ? `<div class="crt__fx"></div>` : "";
  const w = word ? `<div class="crt__word">${word}</div>` : "";
  const t = tag ? `<span class="crt__tag${rec ? " is-rec" : ""}">${tag}</span>` : "";
  return `<div class="crt__screen">${img}${fx}${w}</div>${t}`;
}

const controlsHTML = `
  <div class="crt__controls">
    <span class="crt__knob"></span>
    <span class="crt__grille"></span>
    <span class="crt__knob"></span>
  </div>`;

/* ---- Effet zapping : flash → static → navigation ---- */
function zap(cat) {
  const dest = `reel.html?cat=${cat}`;
  if (reducedMotion()) { location.href = dest; return; }

  const flash = document.createElement("div");
  flash.className = "page-fx flash";
  flash.style.opacity = "1";
  document.body.appendChild(flash);

  setTimeout(() => {
    flash.remove();
    const canvas = document.createElement("canvas");
    canvas.className = "zap-static on";
    canvas.width = 320;
    canvas.height = Math.round((window.innerHeight / window.innerWidth) * 320);
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    let frames = 0;
    const noise = () => {
      const img = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      if (++frames < 12) requestAnimationFrame(noise);
      else location.href = dest;
    };
    noise();
  }, 80);
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
  el.setAttribute("aria-label", `Catégorie ${ch.label.split("· ")[1] || ch.label} — ouvrir la roue`);
  el.innerHTML =
    screenHTML("photo", ch.poster, ch.tag, ch.rec) +
    controlsHTML +
    `<span class="crt__label">${ch.label}</span>`;
  const go = () => zap(ch.cat);
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
      ${CATS.map((c, i) => `<li><span>#${String(i + 1).padStart(2, "0")}</span><a href="reel.html?cat=${c.cat}">${(c.label.split("· ")[1] || "").trim()}</a></li>`).join("")}
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
