/* ============================================================
   i18n.js — bilingue Anglais (défaut) / Français.
   - Le texte écrit dans le HTML = anglais (fallback).
   - data-i18n="key" → remplace textContent selon la langue.
   - data-i18n-attr="attr:key,attr2:key2" → traduit des attributs
     (placeholder, aria-label, alt, title…).
   - Langue mémorisée dans localStorage ; bouton [data-lang-toggle] bascule.
   ============================================================ */

export const DICT = {
  en: {
    "skip": "Skip to content",
    "nav.work": "Portfolio",
    "nav.about": "About",
    "nav.booking": "Services",
    "nav.contact": "Contact",
    "nav.menu": "Menu",
    "nav.close": "Close",
    "fab.book": "Book a shoot",
    "footer.brand": "TIA-LANA — PARIS",
    "footer.role": "PHOTOGRAPHY · ART DIRECTION",
    "cover.name": "Tia-Lana Chinapyel — Photography & Art Direction",
    "cover.enter": "Enter the gallery →",
    "cover.scroll": "Scroll ↓",
    "home.eyebrow": "Pick a channel → step inside",
    "home.title": "Turn on a TV.",
    "home.tag": "Photographer & art director, based in Paris.",
    "series.portrait": "Portrait",
    "series.headshot": "Headshot",
    "series.design": "Design",
    "series.back": "All series",
    "series.hint": "Scroll or drag · click a photo",
    "series.close": "Close",
    "work.eyebrow": "Every frame, one place",
    "work.title": "Portfolio",
    "work.intro": "All the work in one place. Filter by type of creation, click a frame to slide it into the camera.",
    "filter.all": "All",
    "filter.photographie": "Photography",
    "filter.affiches": "Film posters",
    "filter.identites": "Brand identities",
    "filter.editions": "Editions",
    "filter.portraits": "Portraits",
    "filter.encours": "In progress",
    "about.eyebrow": "The brain, open",
    "about.title": "About",
    "about.teaser_eyebrow": "Behind the scenes",
    "about.teaser_title": "Want to see how it's made?",
    "about.process_cta": "My process →",
    "process.eyebrow": "Field notes",
    "process.title": "Process",
    "process.lead": "Nothing comes from nothing. Here's how an image arrives — from scribble to print.",
    "booking.eyebrow": "Tourist shooting · Paris",
    "booking.title_a": "Shoot your",
    "booking.title_b": "stop in Paris.",
    "booking.hello": "Book a shoot.",
    "booking.lead": "One hour, one light, your face in the city. You leave with images that look like no one else.",
    "booking.book": "Book →",
    "booking.popular": "POPULAR",
    "booking.packages_cue": "The packages, below",
    "booking.packages_kicker": "Choose a package",
    "booking.form_eyebrow": "Reservation",
    "booking.form_title": "Lock your date",
    "booking.form_intro": "Tell me what you have in mind and I'll get back to you.",
    "booking.f_name": "Name",
    "booking.f_email": "Email",
    "booking.f_formula": "Package",
    "booking.f_msg": "Your idea, your date",
    "booking.send": "Send request →",
    "booking.or": "Or directly:",
    "contact.eyebrow": "Colophon",
    "contact.title": "Let's talk?",
    "contact.cta": "Book a shoot →",
    "reel.hint": "Click a frame →",
    "viewer.close": "Close",
    "viewer.prev": "‹ Previous",
    "viewer.next": "Next ›",
    "lang.other": "FR",
    // ---- refonte éditoriale ----
    "rd.hi": "Hi, I'm Tia-Lana",
    "rd.bio1": "A UK-born creative based in Paris, in love with visual storytelling.",
    "rd.bio2": "I shoot portrait, product & fashion, landscape and creative series — images that look beautiful and tell a story.",
    "rd.read_more": "Read the full story",
    "rd.selected": "Selected series",
    "rd.view_all": "See all work",
    "rd.quote1": "A good image is a well-framed secret.",
    "rd.quote2": "Direct, wait, miss, start again, catch the instant.",
    "rd.cta_title": "Let's make something that looks like no one else.",
    "rd.pick": "Pick a series",
    "rd.interview": "In her words",
    "rd.about_h1": "Visual storytelling, from Paris.",
    "rd.about_p1": "My name is Tia-Lana — a UK-born creative based in Paris, with a deep love for visual storytelling.",
    "rd.about_p2": "Through photography I explore emotion, narrative and aesthetics — work that doesn't just look beautiful but tells a story.",
    "rd.about_p3": "I love experimenting with light and atmosphere to craft visuals that feel personal and emotionally resonant.",
    "rd.quals_eyebrow": "Background",
    "rd.quals_title": "Qualifications & skills.",
    "rd.qual1": "A-Level Photography — A*",
    "rd.qual2": "GCSE Photography — 9 · Art — 7",
    "rd.qual3": "Inside LVMH — Creation & Branding / Customer Experience",
    "rd.qual4": "Oxford Inspire Programme",
    "rd.qual5": "Tools — Photoshop · Procreate · Canva · Capcut",
    "rd.ways": "What I shoot.",
    "rd.way_portrait": "Portraits that reveal the person, not just the face.",
    "rd.way_headshot": "Product & fashion — styling, mood and movement.",
    "rd.way_design": "Creative series & posters — narrative and concept.",
    "rd.tools": "Photography · editing · design.",
    "rd.wall": "Selected frames.",
    "rd.contact_h": "Get in touch.",
    "rd.sign": "Thanks for looking. — T.L.",
    "series.productfashion": "Product & Fashion",
    "series.landscape": "Landscape",
    "series.creative": "Creative Series",
    "series.posters": "Posters & Design",
    "work.m_portrait": "People · Light",
    "work.d_portrait": "More than a face — the essence of the person, caught in natural light.",
    "work.m_productfashion": "Studio · Styling",
    "work.d_productfashion": "Products styled with intent; fashion shot for mood and movement.",
    "work.m_landscape": "Nature · Travel",
    "work.d_landscape": "Places and atmospheres — from wide vistas to quiet details.",
    "work.m_creative": "Narrative · Concept",
    "work.d_creative": "Narrative triptychs: performance, innocence, and bold experimentation.",
    "work.m_posters": "Procreate · Photoshop",
    "work.d_posters": "Drawn and designed work — posters, type and symbol.",
    // catégories
    "cat.photographie": "PHOTOGRAPHY",
    "cat.affiches": "FILM POSTERS",
    "cat.identites": "BRAND IDENTITIES",
    "cat.editions": "EDITIONS",
    "cat.portraits": "PORTRAITS",
    "cat.encours": "IN PROGRESS",
  },
  fr: {
    "skip": "Aller au contenu",
    "nav.work": "Portfolio",
    "nav.about": "À propos",
    "nav.booking": "Services",
    "nav.contact": "Contact",
    "nav.menu": "Menu",
    "nav.close": "Fermer",
    "fab.book": "Booker un shooting",
    "footer.brand": "TIA-LANA — PARIS",
    "footer.role": "PHOTOGRAPHIE · DIRECTION ARTISTIQUE",
    "cover.name": "Tia-Lana Chinapyel — Photographie & Direction artistique",
    "cover.enter": "Entrer dans la galerie →",
    "cover.scroll": "Défiler ↓",
    "home.eyebrow": "Choisis ta chaîne → entre dedans",
    "home.title": "Allume une télé.",
    "home.tag": "Photographe & directrice artistique, basée à Paris.",
    "series.portrait": "Portrait",
    "series.headshot": "Headshot",
    "series.design": "Design",
    "series.back": "Toutes les séries",
    "series.hint": "Fais défiler ou glisse · clique une photo",
    "series.close": "Fermer",
    "work.eyebrow": "Tout le travail, au même endroit",
    "work.title": "Portfolio",
    "work.intro": "Tout le travail réuni. Filtre par type de création, clique une vignette pour la glisser dans l'appareil.",
    "filter.all": "Tout",
    "filter.photographie": "Photographie",
    "filter.affiches": "Affiches ciné",
    "filter.identites": "Identités",
    "filter.editions": "Éditions",
    "filter.portraits": "Portraits",
    "filter.encours": "En cours",
    "about.eyebrow": "Le cerveau, ouvert",
    "about.title": "À propos",
    "about.teaser_eyebrow": "Dans les coulisses",
    "about.teaser_title": "Envie de voir comment ça se fabrique ?",
    "about.process_cta": "Mon process →",
    "process.eyebrow": "Carnet de bord",
    "process.title": "Process",
    "process.lead": "Rien ne sort du néant. Voilà comment une image arrive — du gribouillis au tirage.",
    "booking.eyebrow": "Shooting touriste · Paris",
    "booking.title_a": "Shoote ton",
    "booking.title_b": "passage à Paris.",
    "booking.hello": "Réserver un shooting.",
    "booking.lead": "Une heure, une lumière, ton visage dans la ville. Tu repars avec des images qui ne ressemblent à personne d'autre.",
    "booking.book": "Réserver →",
    "booking.popular": "POPULAIRE",
    "booking.packages_cue": "Les formules, ci-dessous",
    "booking.packages_kicker": "Choisis une formule",
    "booking.form_eyebrow": "Réservation",
    "booking.form_title": "Bloque ta date",
    "booking.form_intro": "Dis-moi ce que tu as en tête et je te réponds.",
    "booking.f_name": "Nom",
    "booking.f_email": "Email",
    "booking.f_formula": "Formule",
    "booking.f_msg": "Ton idée, ta date",
    "booking.send": "Envoyer la demande →",
    "booking.or": "Ou directement :",
    "contact.eyebrow": "Ours / Colophon",
    "contact.title": "On parle ?",
    "contact.cta": "Réserver un shooting →",
    "reel.hint": "Clique une vignette →",
    "viewer.close": "Fermer",
    "viewer.prev": "‹ Précédente",
    "viewer.next": "Suivante ›",
    "lang.other": "EN",
    // ---- refonte éditoriale ----
    "rd.hi": "Moi, c'est Tia-Lana",
    "rd.bio1": "Créative née au Royaume-Uni, basée à Paris, passionnée par le récit visuel.",
    "rd.bio2": "Je photographie le portrait, le produit & la mode, le paysage et les séries créatives — des images belles qui racontent.",
    "rd.read_more": "Lire toute l'histoire",
    "rd.selected": "Séries choisies",
    "rd.view_all": "Voir tout le travail",
    "rd.quote1": "Une bonne image est un secret bien cadré.",
    "rd.quote2": "Diriger, attendre, rater, recommencer, saisir l'instant.",
    "rd.cta_title": "Créons quelque chose qui ne ressemble à personne d'autre.",
    "rd.pick": "Choisis une série",
    "rd.interview": "En quelques mots",
    "rd.about_h1": "Le récit par l'image, depuis Paris.",
    "rd.about_p1": "Je m'appelle Tia-Lana — créative née au Royaume-Uni, basée à Paris, passionnée par le récit visuel.",
    "rd.about_p2": "À travers la photographie, j'explore l'émotion, la narration et l'esthétique — un travail qui ne se contente pas d'être beau, mais qui raconte.",
    "rd.about_p3": "J'aime expérimenter la lumière et l'atmosphère pour créer des images personnelles, qui résonnent.",
    "rd.quals_eyebrow": "Parcours",
    "rd.quals_title": "Qualifications & compétences.",
    "rd.qual1": "A-Level Photographie — A*",
    "rd.qual2": "GCSE Photographie — 9 · Art — 7",
    "rd.qual3": "Inside LVMH — Création & Branding / Expérience client",
    "rd.qual4": "Programme Oxford Inspire",
    "rd.qual5": "Outils — Photoshop · Procreate · Canva · Capcut",
    "rd.ways": "Ce que je photographie.",
    "rd.way_portrait": "Des portraits qui révèlent la personne, pas seulement le visage.",
    "rd.way_headshot": "Produit & mode — style, ambiance et mouvement.",
    "rd.way_design": "Séries créatives & affiches — récit et concept.",
    "rd.tools": "Photographie · retouche · design.",
    "rd.wall": "Images choisies.",
    "rd.contact_h": "On se parle.",
    "rd.sign": "Merci d'avoir regardé. — T.L.",
    "series.productfashion": "Produit & Mode",
    "series.landscape": "Paysage",
    "series.creative": "Séries créatives",
    "series.posters": "Affiches & Design",
    "work.m_portrait": "Gens · Lumière",
    "work.d_portrait": "Plus qu'un visage — l'essence de la personne, saisie en lumière naturelle.",
    "work.m_productfashion": "Studio · Style",
    "work.d_productfashion": "Des produits stylisés avec intention ; la mode pour l'attitude et le mouvement.",
    "work.m_landscape": "Nature · Voyage",
    "work.d_landscape": "Des lieux et des atmosphères — du grand large au détail intime.",
    "work.m_creative": "Récit · Concept",
    "work.d_creative": "Triptyques narratifs : la performance, l'innocence, l'expérimentation.",
    "work.m_posters": "Procreate · Photoshop",
    "work.d_posters": "Travail dessiné et composé — affiches, typographie et symbole.",
    // catégories
    "cat.photographie": "PHOTOGRAPHIE",
    "cat.affiches": "AFFICHES CINÉMA",
    "cat.identites": "IDENTITÉS DE MARQUE",
    "cat.editions": "ÉDITIONS",
    "cat.portraits": "PORTRAITS",
    "cat.encours": "EN COURS",
  },
};

let current = localStorage.getItem("lang") || "en";

export const lang = () => current;
export const t = (key) => (DICT[current] && DICT[current][key]) || DICT.en[key] || key;

/* applique la langue à tout le document (éléments tagués) */
export function applyI18n(root = document) {
  root.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = t(el.dataset.i18n);
    if (v != null) el.textContent = v;
  });
  root.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    el.dataset.i18nAttr.split(",").forEach((pair) => {
      const [attr, key] = pair.split(":").map((s) => s.trim());
      if (attr && key) el.setAttribute(attr, t(key));
    });
  });
  document.documentElement.lang = current;
  // libellé du bouton = langue opposée
  document.querySelectorAll("[data-lang-toggle]").forEach((b) => {
    b.textContent = t("lang.other");
    b.setAttribute("aria-label", current === "en" ? "Passer en français" : "Switch to English");
  });
}

export function setLang(l) {
  current = l === "fr" ? "fr" : "en";
  localStorage.setItem("lang", current);
  applyI18n();
  document.dispatchEvent(new CustomEvent("langchange", { detail: current }));
}

function initI18n() {
  applyI18n();
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-lang-toggle]");
    if (!b) return;
    e.preventDefault();
    setLang(current === "en" ? "fr" : "en");
  });
}

document.addEventListener("DOMContentLoaded", initI18n);
