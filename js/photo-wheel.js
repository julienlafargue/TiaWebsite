/* ============================================================
   photo-wheel.js — composant signature : roue View-Master + visionneuse.
   - Une ROUE par catégorie (disque crème, vignettes en cercle, façon reel)
   - Clic sur une vignette → VISIONNEUSE « dans l'appareil » :
     grande image couleur + description, prev/next, fermer
   - Shutter (clip-path) au changement d'image · clavier ←/→/Échap
   - prefers-reduced-motion : ni rotation ni shutter
   ============================================================ */
import { reducedMotion } from "./main.js";
import { t } from "./i18n.js";

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

/* ---------- VISIONNEUSE en forme d'APPAREIL PHOTO ---------- */
function buildViewer(photos, title) {
  const overlay = document.createElement("div");
  overlay.className = "viewer";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", `Appareil — ${title}`);
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="camera">
      <div class="camera__deck">
        <span class="camera__finder"></span>
        <span class="camera__brand">TIA-LANA · 35MM</span>
        <button class="camera__release" data-i18n-attr="aria-label:viewer.close" aria-label="Close">✕</button>
      </div>
      <div class="camera__window">
        <img class="viewer__img" alt="" />
        <span class="viewer__veil" aria-hidden="true"></span>
      </div>
      <div class="camera__base">
        <span class="camera__lens"></span>
        <p class="viewer__counter" aria-live="polite"></p>
        <span class="camera__dial"></span>
      </div>
    </div>
    <div class="viewer__meta">
      <p class="viewer__desc"></p>
      <div class="viewer__nav">
        <button class="viewer__prev" data-i18n="viewer.prev">${t("viewer.prev")}</button>
        <button class="viewer__next" data-i18n="viewer.next">${t("viewer.next")}</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const img = overlay.querySelector(".viewer__img");
  const veil = overlay.querySelector(".viewer__veil");
  const win = overlay.querySelector(".camera__window");
  const counter = overlay.querySelector(".viewer__counter");
  const desc = overlay.querySelector(".viewer__desc");
  const closeBtn = overlay.querySelector(".camera__release");

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

  /* ouverture : la pellicule cliquée se glisse dans l'appareil */
  function open(i, slotEl) {
    lastFocus = document.activeElement;
    idx = (i + photos.length) % photos.length;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    paint();
    closeBtn.focus();
    if (reducedMotion() || !slotEl) return;

    const slotImg = slotEl.querySelector("img") || slotEl;
    const s = slotImg.getBoundingClientRect();
    const w = win.getBoundingClientRect();
    const fly = document.createElement("img");
    fly.src = photos[idx].src;
    fly.className = "viewer__fly";
    fly.style.cssText =
      `position:fixed;left:${s.left}px;top:${s.top}px;width:${s.width}px;height:${s.height}px;` +
      `object-fit:cover;z-index:10002;border-radius:8px;box-shadow:0 20px 40px rgba(0,0,0,.6);`;
    document.body.appendChild(fly);
    img.style.opacity = "0";
    fly.animate(
      [
        { left: `${s.left}px`, top: `${s.top}px`, width: `${s.width}px`, height: `${s.height}px` },
        { left: `${w.left}px`, top: `${w.top}px`, width: `${w.width}px`, height: `${w.height}px` },
      ],
      { duration: 470, easing: "cubic-bezier(0.7,0,0.2,1)", fill: "forwards" }
    ).onfinish = () => { fly.remove(); img.style.opacity = "1"; };
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

/* ---------- ROUE View-Master (disque crème) ---------- */
function buildReel(root, cat) {
  const data = CATEGORIES[cat] || CATEGORIES.photographie;
  const photos = data.photos;
  const title = t(`cat.${cat}`);
  const viewer = buildViewer(photos, title);

  root.classList.add("reel");
  const n = photos.length;

  // bloc crédits central (façon réf)
  const stars = "✦".repeat(data.stars);
  const center = document.createElement("div");
  center.className = "reel__center";
  center.innerHTML = `
    <span class="reel__arrow reel__arrow--up" aria-hidden="true">↑</span>
    <p class="reel__kicker">TIA-LANA CHINAPYEL</p>
    <h2 class="reel__title" data-i18n="cat.${cat}">${title}</h2>
    <p class="reel__sub">${data.meta}</p>
    <p class="reel__stars" aria-label="${data.stars}/5">${stars}</p>
    <span class="reel__proj" aria-hidden="true">▼ PROJECTOR · UP FOR ${pad(n)}</span>`;
  root.appendChild(center);

  // vignettes + numéros de pourtour
  photos.forEach((p, i) => {
    const angle = (i / n) * 360;

    const slot = document.createElement("button");
    slot.className = "reel__slot";
    slot.style.setProperty("--ang", `${angle}deg`);
    slot.setAttribute("aria-label", p.alt);
    slot.innerHTML = `
      <span class="reel__win">
        <img src="${p.src}" alt="" loading="lazy" decoding="async" />
      </span>`;
    slot.addEventListener("click", () => viewer.open(i, slot));
    root.appendChild(slot);

    // numéro gravé sur le disque, en retrait vers le centre
    const num = document.createElement("span");
    num.className = "reel__rimnum";
    num.style.setProperty("--ang", `${angle}deg`);
    num.setAttribute("aria-hidden", "true");
    num.textContent = i + 1;
    root.appendChild(num);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-reel]").forEach((root) => {
    const cat = root.dataset.cat || param() || "photographie";
    buildReel(root, cat);
    // titre de page dynamique (traduit + se met à jour au changement de langue)
    const h = document.querySelector("[data-reel-title]");
    if (h) h.dataset.i18n = `cat.${cat}`;
    const sync = () => {
      h && (h.textContent = t(`cat.${cat}`));
      document.title = `${t(`cat.${cat}`)} — TIA-LANA`;
    };
    sync();
    document.addEventListener("langchange", sync);
  });
});

export { CATEGORIES, buildViewer };
