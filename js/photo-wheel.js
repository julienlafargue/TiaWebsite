/* ============================================================
   photo-wheel.js — composant signature : appareil 35mm / View-Master.
   - SVG inline (boîtier, viseur, déclencheur, molette, optique)
   - L'écran arrière reçoit l'image courante (<image href>)
   - Déclencheur : scale 1→0.9→1 + volet shutter (clip-path) + swap
   - Molette : compteur 01/12 → 02/12
   - Clavier ←/→ · aria-live sur la légende · son optionnel (Web Audio)
   - prefers-reduced-motion : pas d'anim, pas de son
   ============================================================ */
import { reducedMotion } from "./main.js";

/* Jeu d'images par défaut (vraies photos). Surcharge possible via
   data-images="a.webp,b.webp" sur l'élément [data-camera]. */
const DEFAULT_IMAGES = [
  "img/photography/pro/photo-a.png",
  "img/photography/pro/photo-c.png",
  "img/photography/pro/photo-f.png",
  "img/photography/pro/photo-k.png",
  "img/photography/pro/photo-p.png",
  "img/photography/pro/photo-s.png",
  "img/photography/pro/photo-w.png",
];

function cameraSVG(uid) {
  return `
  <svg class="camera__svg" viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg"
       role="img" aria-label="Appareil photo 35mm — déclencher pour changer l'image">
    <defs>
      <clipPath id="scr-${uid}"><rect x="70" y="92" width="320" height="236" rx="8"/></clipPath>
    </defs>
    <!-- boîtier -->
    <rect x="40" y="70" width="520" height="300" rx="22" fill="#E8E4D8" stroke="#0A0A0A" stroke-width="4"/>
    <rect x="40" y="70" width="520" height="60" rx="22" fill="#0A0A0A"/>
    <!-- viseur -->
    <rect x="78" y="40" width="80" height="34" rx="6" fill="#0A0A0A"/>
    <!-- déclencheur rond proéminent -->
    <g class="camera__btn" data-shutter tabindex="0" role="button"
       aria-label="Déclencher — image suivante">
      <circle cx="470" cy="50" r="26" fill="#D6263A" stroke="#0A0A0A" stroke-width="4"/>
      <circle cx="470" cy="50" r="11" fill="#0A0A0A"/>
    </g>
    <!-- écran arrière : image courante -->
    <rect x="70" y="92" width="320" height="236" rx="8" fill="#05060a"/>
    <image data-photo href="" x="70" y="92" width="320" height="236"
           preserveAspectRatio="xMidYMid slice" clip-path="url(#scr-${uid})"/>
    <!-- volet shutter -->
    <rect data-shutter-veil x="70" y="92" width="320" height="236" rx="8" fill="#0A0A0A"
          style="clip-path:inset(0 0 100% 0)"/>
    <!-- optique / molette d'avancement crantée -->
    <circle cx="478" cy="200" r="66" fill="#F2EFE7" stroke="#0A0A0A" stroke-width="4"/>
    <circle cx="478" cy="200" r="44" fill="#0A0A0A"/>
    <circle cx="478" cy="200" r="30" fill="#1E3FFF"/>
    <circle cx="478" cy="200" r="14" fill="#05060a"/>
    <!-- molette crantée (compteur) -->
    <g data-wheel transform-origin="478 320">
      <circle cx="478" cy="320" r="34" fill="#E8E4D8" stroke="#0A0A0A" stroke-width="3"/>
      ${Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x1 = 478 + Math.cos(a) * 26, y1 = 320 + Math.sin(a) * 26;
        const x2 = 478 + Math.cos(a) * 34, y2 = 320 + Math.sin(a) * 34;
        return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#0A0A0A" stroke-width="2"/>`;
      }).join("")}
    </g>
  </svg>`;
}

let audioCtx;
function click35mm() {
  if (reducedMotion()) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const t = audioCtx.currentTime;
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = "square";
    o.frequency.setValueAtTime(900, t);
    o.frequency.exponentialRampToValueAtTime(120, t + 0.05);
    g.gain.setValueAtTime(0.08, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    o.connect(g).connect(audioCtx.destination);
    o.start(t); o.stop(t + 0.09);
  } catch (_) { /* audio indispo : on ignore */ }
}

function initCamera(root) {
  const images = (root.dataset.images
    ? root.dataset.images.split(",").map((s) => s.trim())
    : DEFAULT_IMAGES
  ).filter(Boolean);
  const uid = Math.random().toString(36).slice(2, 7);

  root.classList.add("camera");
  root.innerHTML = `
    ${cameraSVG(uid)}
    <p class="camera__counter" data-counter aria-live="polite"></p>
    <p class="camera__hint">Déclenche · ← → · ${images.length} vues</p>
  `;

  const photo = root.querySelector("[data-photo]");
  const veil = root.querySelector("[data-shutter-veil]");
  const btnG = root.querySelector("[data-shutter]");
  const btnCircle = btnG.querySelector("circle");
  const wheel = root.querySelector("[data-wheel]");
  const counter = root.querySelector("[data-counter]");

  const state = { i: 0 };
  const pad = (n) => String(n).padStart(2, "0");

  function render() {
    photo.setAttribute("href", images[state.i]);
    counter.textContent = `${pad(state.i + 1)} / ${pad(images.length)} — déclenché`;
  }

  let busy = false;
  function shoot(dir = 1, withFx = true) {
    if (busy) return;
    state.i = (state.i + dir + images.length) % images.length;

    if (reducedMotion() || !withFx) { render(); return; }
    busy = true;
    click35mm();

    // 1. bouton scale 1→0.9→1
    btnCircle.animate(
      [{ transform: "scale(1)" }, { transform: "scale(0.85)" }, { transform: "scale(1)" }],
      { duration: 280, easing: "cubic-bezier(0.16,1,0.3,1)", transformOrigin: "470px 50px" }
    );
    // molette : rotation crantée d'un pas
    wheel.animate(
      [{ transform: "rotate(0deg)" }, { transform: `rotate(${dir * 30}deg)` }],
      { duration: 280, easing: "cubic-bezier(0.65,0,0.35,1)", transformOrigin: "478px 320px" }
    );
    // 2+3. volet descend (couvre) → swap → remonte
    const down = veil.animate(
      [{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)" }],
      { duration: 130, easing: "cubic-bezier(0.65,0,0.35,1)", fill: "forwards" }
    );
    down.onfinish = () => {
      render(); // swap pendant que c'est couvert
      const up = veil.animate(
        [{ clipPath: "inset(0 0 0% 0)" }, { clipPath: "inset(100% 0 0 0)" }],
        { duration: 130, easing: "cubic-bezier(0.65,0,0.35,1)", fill: "forwards" }
      );
      up.onfinish = () => {
        veil.style.clipPath = "inset(0 0 100% 0)";
        busy = false;
      };
    };
  }

  // déclencheur (souris + clavier)
  btnG.addEventListener("click", () => shoot(1));
  btnG.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); shoot(1); }
  });
  // flèches clavier quand le composant a le focus interne
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); shoot(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); shoot(-1); }
  });

  render(); // image initiale sans fx
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-camera]").forEach(initCamera);
});
