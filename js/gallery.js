/* ============================================================
   gallery.js — page Gallery : toutes les photos en bandes 35mm,
   filtrables par type. Clic sur une vue → visionneuse « appareil ».
   ============================================================ */
import { CATEGORIES, buildViewer } from "./photo-wheel.js";
import { t } from "./i18n.js";

/* toutes les photos, avec leur catégorie + index global (pour la visionneuse) */
const ALL = [];
Object.entries(CATEGORIES).forEach(([cat, data]) => {
  data.photos.forEach((p) => ALL.push({ ...p, cat, idx: ALL.length }));
});

const pad = (n) => String(n).padStart(2, "0");

function initGallery() {
  const root = document.querySelector("[data-gallery]");
  if (!root) return;
  root.classList.add("film");

  const viewer = buildViewer(ALL, t("work.title"));

  function frame(p) {
    const b = document.createElement("button");
    b.className = "film-frame";
    b.dataset.cat = p.cat;
    b.setAttribute("aria-label", p.alt);
    b.innerHTML =
      `<img src="${p.src}" alt="" loading="lazy" decoding="async">` +
      `<span class="film-frame__no">${pad(p.idx + 1)}</span>` +
      `<span class="film-frame__cat" data-i18n="cat.${p.cat}">${t(`cat.${p.cat}`)}</span>`;
    b.addEventListener("click", () => viewer.open(p.idx, b));
    return b;
  }

  function render(filter) {
    const list = filter === "all" ? ALL : ALL.filter((p) => p.cat === filter);
    root.innerHTML = "";
    // réparti en ~3 bandes horizontales
    const strips = Math.min(3, Math.max(1, Math.ceil(list.length / 6)));
    const per = Math.ceil(list.length / strips);
    for (let s = 0; s < strips; s++) {
      const strip = document.createElement("div");
      strip.className = "filmstrip";
      const track = document.createElement("div");
      track.className = "filmstrip__track";
      list.slice(s * per, s * per + per).forEach((p) => track.appendChild(frame(p)));
      strip.appendChild(track);
      root.appendChild(strip);
    }
  }

  // filtres
  const btns = [...document.querySelectorAll("[data-filter]")];
  btns.forEach((btn) =>
    btn.addEventListener("click", () => {
      btns.forEach((x) => x.setAttribute("aria-pressed", String(x === btn)));
      render(btn.dataset.filter);
    })
  );

  render("all");
}

document.addEventListener("DOMContentLoaded", initGallery);
