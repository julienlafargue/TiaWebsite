/* ============================================================
   rack.js — Portfolio : cadres suspendus à la barre métal par
   de grosses pinces (bulldog clips). Survol → ça balance.
   Clic → series.html?cat=…
   ============================================================ */
import { SERIES, SERIES_ORDER, cover } from "./photos.js?v=1";

/* Pince type « bulldog » : mâchoire + deux bras métalliques. */
const CLIP_SVG = `
<svg class="clip" viewBox="0 0 64 52" aria-hidden="true">
  <defs>
    <linearGradient id="clipMetal" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"  stop-color="#f2f2f4"/>
      <stop offset="35%" stop-color="#b9bcc2"/>
      <stop offset="60%" stop-color="#6f747c"/>
      <stop offset="100%" stop-color="#3d4148"/>
    </linearGradient>
    <linearGradient id="clipArm" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"  stop-color="#9aa0a8"/>
      <stop offset="50%" stop-color="#e8eaed"/>
      <stop offset="100%" stop-color="#7c828a"/>
    </linearGradient>
  </defs>
  <!-- bras (poignées relevées) -->
  <path d="M20 16 L9 3"  stroke="url(#clipArm)" stroke-width="3.5" stroke-linecap="round" fill="none"/>
  <path d="M44 16 L55 3" stroke="url(#clipArm)" stroke-width="3.5" stroke-linecap="round" fill="none"/>
  <circle cx="9"  cy="3" r="3" fill="#cfd3d8"/>
  <circle cx="55" cy="3" r="3" fill="#cfd3d8"/>
  <!-- mâchoire -->
  <path d="M14 14 H50 L44 46 H20 Z" fill="url(#clipMetal)"/>
  <path d="M14 14 H50 L48.5 22 H15.5 Z" fill="#ffffff" opacity=".35"/>
  <path d="M20 46 H44 L43 49 H21 Z" fill="#2b2e33"/>
</svg>`;

function buildRack(root) {
  SERIES_ORDER.forEach((key, i) => {
    const s = SERIES[key];
    const a = document.createElement("a");
    a.className = "hang";
    a.href = `series.html?cat=${key}`;
    a.setAttribute("aria-label", `${s.label} — open the series`);
    a.style.setProperty("--i", i);
    a.innerHTML = `
      <span class="hang__cord" aria-hidden="true"></span>
      ${CLIP_SVG}
      <span class="hang__frame">
        <span class="hang__photo" style="background-image:url('${cover(key)}')"></span>
        <span class="hang__cap">
          <span class="hang__label" data-i18n="series.${key}">${s.label}</span>
          <span class="hang__meta">${s.meta}</span>
        </span>
      </span>`;
    root.appendChild(a);
  });
}

const root = document.querySelector("[data-rack]");
if (root) buildRack(root);
