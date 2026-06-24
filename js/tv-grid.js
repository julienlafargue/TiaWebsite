/* ============================================================
   tv-grid.js — mur de CRT réaliste (cadres + écrans en CSS).
   - 6 chaînes catégories cliquables (mode `photo`) + cellules décor
     (static / glitch) + panneau central « index » (tracklist).
   - Clic chaîne → effet zapping (flash → static canvas) → reel.html?cat=
   - Hover : vibration ±1px (GSAP sinon WAAPI) · reduced-motion respecté
   ============================================================ */
import { reducedMotion } from "./main.js?v=7";
import { t } from "./i18n.js?v=7";

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
  { type: "contact" },
  { type: "cat", i: 2 },
  { type: "index" },
  { type: "cat", i: 3 },
  { type: "decor", mode: "glitch", tag: "VHS", label: "CH 00", poster: "img/photography/pro/photo-ad.png" },
  { type: "cat", i: 4 },
  { type: "cat", i: 5 },
];

/* coordonnées de contact (à personnaliser) */
const CONTACT = {
  email: "hello@tia-lana.example",
  insta: "@tia-lana",
  city: "PARIS",
};

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

/* ---- Clic : GLITCH plein écran (déchirure numérique) → navigation ---- */
function zap(cat, cellEl) {
  const dest = `reel.html?cat=${cat}`;
  if (reducedMotion()) { location.href = dest; return; }

  const img = cellEl && cellEl.querySelector(".crt__screen img");
  const src = img ? img.src : "";
  const fx = document.createElement("div");
  fx.className = "glitch-fx";
  if (src) fx.style.setProperty("--gimg", `url("${src}")`);
  fx.innerHTML =
    `<div class="glitch-fx__base"></div>` +
    `<div class="glitch-fx__layer glitch-fx__layer--r"></div>` +
    `<div class="glitch-fx__layer glitch-fx__layer--g"></div>` +
    `<div class="glitch-fx__layer glitch-fx__layer--b"></div>` +
    `<div class="glitch-fx__scan"></div>`;
  document.body.appendChild(fx);
  setTimeout(() => { location.href = dest; }, 470);
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

function makeContact() {
  const el = document.createElement("a");
  el.className = "crt crt--contact";
  el.href = `mailto:${CONTACT.email}`;
  el.setAttribute("aria-label", `Contact — ${CONTACT.email}`);
  const ticker = `EMAIL ${CONTACT.email} · INSTA ${CONTACT.insta} · ${CONTACT.city} · `;
  el.innerHTML =
    `<div class="crt__screen">
       <div class="crt__contact-marquee" aria-hidden="true"><span>${ticker.repeat(2)}</span></div>
       <span class="crt__cat">CONTACT</span>
     </div>` +
    controlsHTML +
    `<span class="crt__tag is-rec">LIVE</span><span class="crt__label">CH 07</span>`;
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
        spec.type === "contact" ? makeContact() :
        makeDecor(spec);
      grid.appendChild(node);
    });
  });
}

document.addEventListener("DOMContentLoaded", initTVGrid);
export { CATS };
