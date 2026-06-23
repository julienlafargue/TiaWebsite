/* ============================================================
   tv-grid.js — composant signature : grille de télés CRT.
   - Cadre TV en SVG inline (boutons, antennes, étiquettes)
   - Écran <video> muet en boucle (fallback <img>)
   - Scanlines + distorsion CRT (filtre SVG feDisplacementMap)
   - Hover : vibration ±1px (GSAP si présent, sinon WAAPI)
   - Click : flash blanc 80ms → static canvas 200ms → navigation
   ============================================================ */
import { reducedMotion } from "./main.js";

/* Données des 6 télés. Remplacer `video` par de vraies boucles .webm/.mp4 ;
   `poster` sert d'image de repli (réutilise les vraies photos). */
const CHANNELS = [
  { cat: "photographie",  label: "PHOTOGRAPHIE",      tag: "REC",  poster: "img/photography/pro/photo-a.png" },
  { cat: "affiches",      label: "AFFICHES CINÉMA",   tag: "PLAY", poster: "img/photography/pro/photo-h.png" },
  { cat: "identites",     label: "IDENTITÉS DE MARQUE",tag: "01",  poster: "img/photography/pro/photo-m.png" },
  { cat: "editions",      label: "ÉDITIONS",          tag: "RUSH", poster: "img/photography/pro/photo-r.png" },
  { cat: "portraits",     label: "PORTRAITS",         tag: "LIVE", poster: "img/photography/pro/photo-v.png" },
  { cat: "encours",       label: "EN COURS",          tag: "WIP",  poster: "img/photography/pro/photo-z.png" },
];

/* Cadre TV en SVG inline. id unique pour le filtre de distorsion CRT. */
function tvSVG(i, tag) {
  const fid = `crt-${i}`;
  return `
  <svg class="tv__svg" viewBox="0 0 320 280" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <defs>
      <filter id="${fid}">
        <feTurbulence type="fractalNoise" baseFrequency="0.9 0.02" numOctaves="1" seed="${i}" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="2.5"/>
      </filter>
    </defs>
    <!-- antennes -->
    <line x1="120" y1="34" x2="86" y2="2" stroke="#0A0A0A" stroke-width="3"/>
    <line x1="150" y1="34" x2="190" y2="2" stroke="#0A0A0A" stroke-width="3"/>
    <circle cx="86" cy="2" r="4" fill="#D6263A"/>
    <circle cx="190" cy="2" r="4" fill="#1E3FFF"/>
    <!-- boîtier -->
    <rect x="6" y="30" width="308" height="244" rx="18" fill="#E8E4D8" stroke="#0A0A0A" stroke-width="3"/>
    <!-- cadre écran -->
    <rect x="20" y="44" width="222" height="190" rx="14" fill="#05060a" stroke="#0A0A0A" stroke-width="3"/>
    <!-- panneau de contrôle droit -->
    <circle cx="280" cy="78" r="16" fill="#F2EFE7" stroke="#0A0A0A" stroke-width="3"/>
    <circle cx="280" cy="78" r="4" fill="#0A0A0A"/>
    <circle cx="280" cy="128" r="10" fill="#1E3FFF" stroke="#0A0A0A" stroke-width="3"/>
    <rect x="266" y="156" width="28" height="8" rx="4" fill="#0A0A0A"/>
    <rect x="266" y="172" width="28" height="8" rx="4" fill="#0A0A0A"/>
    <!-- pied -->
    <rect x="60" y="270" width="40" height="8" rx="4" fill="#0A0A0A"/>
    <rect x="220" y="270" width="40" height="8" rx="4" fill="#0A0A0A"/>
    <!-- étiquette tag -->
    <g transform="rotate(-3 268 214)">
      <rect x="252" y="202" width="50" height="22" rx="3" fill="#D6263A"/>
      <text x="277" y="217" font-family="'Space Mono',monospace" font-size="11"
            fill="#F2EFE7" text-anchor="middle" letter-spacing="1">${tag}</text>
    </g>
  </svg>`;
}

function makeTV(ch, i) {
  const tv = document.createElement("article");
  tv.className = "tv";
  tv.style.setProperty("--tv-rot", `${[-2, 1.5, -1, 2, -1.5, 1][i % 6]}deg`);
  tv.tabIndex = 0;
  tv.setAttribute("role", "link");
  tv.setAttribute("aria-label", `Catégorie ${ch.label} — ouvrir`);
  tv.dataset.cat = ch.cat;

  tv.innerHTML = `
    ${tvSVG(i, ch.tag)}
    <div class="tv__screen">
      <img src="${ch.poster}" alt="Aperçu : ${ch.label}" loading="lazy" decoding="async">
    </div>
    <span class="tv__label">CH ${String(i + 1).padStart(2, "0")} · ${ch.label}</span>
  `;

  // applique la distorsion CRT à l'image (pas en reduced-motion)
  if (!reducedMotion()) {
    const img = tv.querySelector("img");
    img.style.filter += "";
    img.closest(".tv__screen").style.filter = `url(#crt-${i})`;
  }

  // hover : vibration ±1px
  let vib;
  const startVib = () => {
    if (reducedMotion()) return;
    if (window.gsap) {
      vib = window.gsap.to(tv, {
        x: "+=1", y: "-=1",
        duration: 0.05, repeat: -1, yoyo: true, ease: "none",
      });
    } else {
      tv.animate(
        [{ transform: "translate3d(0,0,0)" }, { transform: "translate3d(1px,-1px,0)" }],
        { duration: 90, direction: "alternate", iterations: Infinity }
      );
    }
  };
  const stopVib = () => { if (vib) { vib.kill(); vib = null; } };
  tv.addEventListener("mouseenter", startVib);
  tv.addEventListener("mouseleave", stopVib);

  // navigation
  const go = () => zap(ch.cat);
  tv.addEventListener("click", go);
  tv.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
  });

  return tv;
}

/* ---- Effet zapping : flash → static → navigation ---- */
function zap(cat) {
  const dest = `work.html?cat=${cat}`;
  if (reducedMotion()) { location.href = dest; return; }

  // 1. flash blanc 80ms
  const flash = document.createElement("div");
  flash.className = "page-fx flash";
  flash.style.opacity = "1";
  document.body.appendChild(flash);

  setTimeout(() => {
    flash.remove();
    // 2. static canvas 200ms
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
      else {
        // 3. navigation
        location.href = dest;
      }
    };
    noise();
  }, 80);
}

function initTVGrid() {
  document.querySelectorAll("[data-tv-grid]").forEach((grid) => {
    grid.classList.add("tv-grid");
    CHANNELS.forEach((ch, i) => grid.appendChild(makeTV(ch, i)));
  });
}

document.addEventListener("DOMContentLoaded", initTVGrid);
export { CHANNELS };
