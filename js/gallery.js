/* ============================================================
   gallery.js — page Gallery : toutes les photos en bandes 35mm,
   filtrables par type. Clic sur une vue → visionneuse « appareil ».
   ============================================================ */
import { CATEGORIES, buildViewer } from "./photo-wheel.js?v=7";
import { t } from "./i18n.js?v=7";

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
    // bandes de pellicule VERTICALES (négatifs suspendus) — réparties en colonnes
    const cols = Math.min(5, Math.max(2, Math.round(list.length / 5)));
    const columns = Array.from({ length: cols }, () => {
      const v = document.createElement("div");
      v.className = "vstrip";
      return v;
    });
    list.forEach((p, i) => columns[i % cols].appendChild(frame(p)));
    columns.forEach((v) => { if (v.children.length) root.appendChild(v); });
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
