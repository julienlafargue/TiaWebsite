/* ============================================================
   gallery.js — page Work : toutes les photos, filtrables par type.
   Réutilise CATEGORIES + la visionneuse « appareil » de photo-wheel.js.
   ============================================================ */
import { CATEGORIES, buildViewer } from "./photo-wheel.js";
import { t } from "./i18n.js";

/* toutes les photos, avec leur catégorie */
const ALL = [];
Object.entries(CATEGORIES).forEach(([cat, data]) => {
  data.photos.forEach((p) => ALL.push({ ...p, cat }));
});

function initGallery() {
  const grid = document.querySelector("[data-gallery]");
  if (!grid) return;

  const viewer = buildViewer(ALL, t("work.title"));

  ALL.forEach((p, i) => {
    const b = document.createElement("button");
    b.className = "gallery-item";
    b.dataset.cat = p.cat;
    b.setAttribute("aria-label", p.alt);
    b.innerHTML =
      `<img src="${p.src}" alt="" loading="lazy" decoding="async">` +
      `<span class="gallery-item__cat" data-i18n="cat.${p.cat}">${t(`cat.${p.cat}`)}</span>`;
    b.addEventListener("click", () => viewer.open(i, b));
    grid.appendChild(b);
  });

  // filtres
  const btns = [...document.querySelectorAll("[data-filter]")];
  btns.forEach((btn) =>
    btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      btns.forEach((x) => x.setAttribute("aria-pressed", String(x === btn)));
      grid.querySelectorAll(".gallery-item").forEach((it) => {
        it.hidden = !(f === "all" || it.dataset.cat === f);
      });
    })
  );
}

document.addEventListener("DOMContentLoaded", initGallery);
