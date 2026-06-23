/* ============================================================
   photo-wheel.js — composant signature : roue View-Master + visionneuse.
   - Une ROUE par catégorie (disque crème, vignettes en cercle, façon reel)
   - Clic sur une vignette → VISIONNEUSE « dans l'appareil » :
     grande image couleur + description, prev/next, fermer
   - Shutter (clip-path) au changement d'image · clavier ←/→/Échap
   - prefers-reduced-motion : ni rotation ni shutter
   ============================================================ */
import { reducedMotion } from "./main.js";

const DIR = "img/photography/pro/";
/* fabrique une entrée photo. desc = placeholder éditorial [TODO]. */
const P = (file, alt, desc) => ({ src: DIR + file, alt, desc });

/* Photos curées PAR TYPE. Remplir les `desc` (voir CONTENU.md). */
const CATEGORIES = {
  photographie: {
    title: "PHOTOGRAPHIE", meta: "SÉRIE · 2024–26", stars: 4,
    photos: [
      P("photo-c.png", "Portrait en lumière naturelle, toit-terrasse.", "[TODO: description — où, quand, l'intention.]"),
      P("photo-e.png", "Sourire attrapé entre deux prises.", "[TODO: description.]"),
      P("photo-r.png", "Portrait noir et blanc, contraste doux.", "[TODO: description.]"),
      P("photo-m.png", "Cheveux au vent, fin d'après-midi.", "[TODO: description.]"),
      P("photo-i.png", "Repérage, banc et pétales.", "[TODO: description.]"),
      P("photo-w.png", "Ville côtière, lumière basse.", "[TODO: description.]"),
      P("photo-a.png", "Portrait studio, main au menton.", "[TODO: description.]"),
      P("photo-n.png", "Visage en tons chauds.", "[TODO: description.]"),
    ],
  },
  affiches: {
    title: "AFFICHES CINÉMA", meta: "POSTERS · 2024–26", stars: 5,
    photos: [
      P("photo-u.png", "Affiche — HENRY, figure rouge.", "[TODO: film, rôle, intention typographique.]"),
      P("photo-ae.png", "Affiche graphique — HAUTE, lèvres néon.", "[TODO: description.]"),
      P("photo-s.png", "Grille de visages, montage éditorial.", "[TODO: description.]"),
      P("photo-ad.png", "Collage PING, matière analogique.", "[TODO: description.]"),
      P("photo-d.jpg", "Gros plan lèvres, traitement couleur.", "[TODO: description.]"),
      P("photo-y.png", "Image-concept, cœur anatomique.", "[TODO: description.]"),
    ],
  },
  identites: {
    title: "IDENTITÉS DE MARQUE", meta: "BRANDING · 2024–26", stars: 4,
    photos: [
      P("photo-ae.png", "Direction visuelle, lèvres néon.", "[TODO: marque, ton, livrables.]"),
      P("photo-ad.png", "Système graphique, collage.", "[TODO: description.]"),
      P("photo-d.jpg", "Détail couleur, matière de marque.", "[TODO: description.]"),
      P("photo-s.png", "Déclinaison éditoriale, grille.", "[TODO: description.]"),
      P("photo-q.png", "Portrait de marque, rouge.", "[TODO: description.]"),
    ],
  },
  editions: {
    title: "ÉDITIONS", meta: "PRINT · 2024–26", stars: 4,
    photos: [
      P("photo-c.png", "Double page, portrait toit-terrasse.", "[TODO: édition, format, tirage.]"),
      P("photo-b.png", "Portrait noir et blanc, pleine page.", "[TODO: description.]"),
      P("photo-g.png", "Visage en N&B, grain marqué.", "[TODO: description.]"),
      P("photo-o.png", "Portrait sombre, contre-jour.", "[TODO: description.]"),
      P("photo-p.png", "Mains levées, ton sable.", "[TODO: description.]"),
      P("photo-x.png", "Coupe courte, portrait franc.", "[TODO: description.]"),
    ],
  },
  portraits: {
    title: "PORTRAITS", meta: "FACES · 2024–26", stars: 5,
    photos: [
      P("photo-g.png", "Regard caméra, lumière dure.", "[TODO: qui, contexte, intention.]"),
      P("photo-f.png", "Coupe courte, fond noir.", "[TODO: description.]"),
      P("photo-h.png", "Portrait apaisé, N&B.", "[TODO: description.]"),
      P("photo-o.png", "Contre-jour, silhouette.", "[TODO: description.]"),
      P("photo-x.png", "Portrait franc, studio.", "[TODO: description.]"),
      P("photo-z.png", "Portrait N&B, douceur.", "[TODO: description.]"),
      P("photo-q.png", "Assise, haut rouge.", "[TODO: description.]"),
      P("photo-b.png", "Portrait N&B classique.", "[TODO: description.]"),
    ],
  },
  encours: {
    title: "EN COURS", meta: "WIP · 2026", stars: 3,
    photos: [
      P("photo-t.png", "Côte de nuit, repérage.", "[TODO: projet en cours, où ça va.]"),
      P("photo-v.png", "Plage, lumière rasante.", "[TODO: description.]"),
      P("photo-aa.png", "Baie, point de vue.", "[TODO: description.]"),
      P("photo-ab.png", "Coucher de soleil, mer.", "[TODO: description.]"),
      P("photo-f.png", "Essai portrait, fond noir.", "[TODO: description.]"),
      P("photo-i.png", "Extérieur, test lumière.", "[TODO: description.]"),
    ],
  },
};

const pad = (n) => String(n).padStart(2, "0");
const param = () => new URLSearchParams(location.search).get("cat");

/* ---------- VISIONNEUSE « dans l'appareil » ---------- */
function buildViewer(photos, title) {
  const overlay = document.createElement("div");
  overlay.className = "viewer";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", `Visionneuse — ${title}`);
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="viewer__frame">
      <button class="viewer__close" aria-label="Fermer la visionneuse">✕ Fermer</button>
      <div class="viewer__screen">
        <img class="viewer__img" alt="" />
        <span class="viewer__veil" aria-hidden="true"></span>
      </div>
      <div class="viewer__meta">
        <p class="viewer__counter" aria-live="polite"></p>
        <p class="viewer__desc"></p>
        <div class="viewer__nav">
          <button class="viewer__prev" aria-label="Photo précédente">‹ Précédente</button>
          <button class="viewer__next" aria-label="Photo suivante">Suivante ›</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const img = overlay.querySelector(".viewer__img");
  const veil = overlay.querySelector(".viewer__veil");
  const counter = overlay.querySelector(".viewer__counter");
  const desc = overlay.querySelector(".viewer__desc");
  const closeBtn = overlay.querySelector(".viewer__close");

  let idx = 0;
  let lastFocus = null;

  function paint() {
    const p = photos[idx];
    img.src = p.src;
    img.alt = p.alt;
    counter.textContent = `${pad(idx + 1)} / ${pad(photos.length)} — ${title}`;
    desc.textContent = p.desc;
  }

  function show(i, withFx = true) {
    idx = (i + photos.length) % photos.length;
    if (reducedMotion() || !withFx) { paint(); return; }
    // shutter : volet descend (couvre) → swap → remonte
    veil.animate(
      [{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)" }],
      { duration: 120, easing: "cubic-bezier(0.65,0,0.35,1)", fill: "forwards" }
    ).onfinish = () => {
      paint();
      veil.animate(
        [{ clipPath: "inset(0 0 0% 0)" }, { clipPath: "inset(100% 0 0 0)" }],
        { duration: 120, easing: "cubic-bezier(0.65,0,0.35,1)", fill: "forwards" }
      ).onfinish = () => { veil.style.clipPath = "inset(0 0 100% 0)"; };
    };
  }

  function open(i) {
    lastFocus = document.activeElement;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    show(i, false);
    closeBtn.focus();
  }
  function close() {
    overlay.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  closeBtn.addEventListener("click", close);
  overlay.querySelector(".viewer__prev").addEventListener("click", () => show(idx - 1));
  overlay.querySelector(".viewer__next").addEventListener("click", () => show(idx + 1));
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  document.addEventListener("keydown", (e) => {
    if (overlay.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(idx + 1);
    if (e.key === "ArrowLeft") show(idx - 1);
  });

  return { open };
}

/* ---------- ROUE ---------- */
function buildReel(root, cat) {
  const data = CATEGORIES[cat] || CATEGORIES.photographie;
  const photos = data.photos;
  const viewer = buildViewer(photos, data.title);

  root.classList.add("reel");
  // centre
  const stars = "★".repeat(data.stars) + "☆".repeat(5 - data.stars);
  const center = document.createElement("div");
  center.className = "reel__center";
  center.innerHTML = `
    <span class="reel__arrow" aria-hidden="true">↑</span>
    <h2 class="reel__title">${data.title}</h2>
    <p class="reel__sub">${data.meta}</p>
    <p class="reel__stars" aria-label="${data.stars} sur 5">${stars}</p>
    <p class="reel__hint">Clique une vignette →</p>`;
  root.appendChild(center);

  // vignettes en cercle
  const n = photos.length;
  photos.forEach((p, i) => {
    const angle = (i / n) * 360;
    const slot = document.createElement("button");
    slot.className = "reel__slot";
    slot.style.setProperty("--ang", `${angle}deg`);
    slot.setAttribute("aria-label", `Voir : ${p.alt}`);
    slot.innerHTML = `
      <span class="reel__win">
        <img src="${p.src}" alt="" loading="lazy" decoding="async" />
        <span class="reel__num">${pad(i + 1)}</span>
      </span>`;
    slot.addEventListener("click", () => viewer.open(i));
    root.appendChild(slot);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-reel]").forEach((root) => {
    const cat = root.dataset.cat || param() || "photographie";
    buildReel(root, cat);
    // titre de page dynamique
    const t = (CATEGORIES[cat] || CATEGORIES.photographie).title;
    document.title = `${t} — TIA`;
    const h = document.querySelector("[data-reel-title]");
    if (h) h.textContent = t;
  });
});

export { CATEGORIES };
