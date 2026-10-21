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
    "booking.form_eyebrow": "Reservation",
    "booking.form_title": "Lock your date",
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
    "rd.bio1": "I make images — sometimes I capture them, sometimes I invent them.",
    "rd.bio2": "Photographer in the morning, art director in the afternoon. Between portrait, headshot and design, I like faces that don't lie.",
    "rd.read_more": "Read the full story",
    "rd.selected": "Selected series",
    "rd.view_all": "See all work",
    "rd.quote1": "A good image is a well-framed secret.",
    "rd.quote2": "Direct, wait, miss, start again, catch the instant.",
    "rd.cta_title": "Let's make something that looks like no one else.",
    "rd.pick": "Pick a series",
    "rd.interview": "The interview",
    "rd.about_h1": "Making images, morning & night.",
    "rd.about_p1": "I make images. Sometimes I capture them, sometimes I invent them. Photographer in the morning, art director in the afternoon — and the other way around the next day.",
    "rd.about_p2": "I work between portrait, headshot and design. I like brands that have something to say and faces that don't lie. It starts with a notebook, a location scout, an idea jotted down too fast.",
    "rd.about_p3": "Based in Paris, in love with grain and 35mm. A curious mind, always building.",
    "rd.career": "The career so far.",
    "rd.ways": "Three ways to look.",
    "rd.way_portrait": "Editorial & personal, shot on 35mm.",
    "rd.way_headshot": "Studio — clean, honest, timeless.",
    "rd.way_design": "Posters, brand systems, editions.",
    "rd.tools": "35mm · medium format · print.",
    "rd.wall": "On the wall.",
    "rd.contact_h": "Get in touch.",
    "rd.sign": "Thanks for looking. — T.L.",
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
    "booking.form_eyebrow": "Réservation",
    "booking.form_title": "Bloque ta date",
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
    "rd.bio1": "Je fais des images — parfois je les capture, parfois je les invente.",
    "rd.bio2": "Photographe le matin, directrice artistique l'après-midi. Entre portrait, headshot et design, j'aime les visages qui ne mentent pas.",
    "rd.read_more": "Lire toute l'histoire",
    "rd.selected": "Séries choisies",
    "rd.view_all": "Voir tout le travail",
    "rd.quote1": "Une bonne image est un secret bien cadré.",
    "rd.quote2": "Diriger, attendre, rater, recommencer, saisir l'instant.",
    "rd.cta_title": "Créons quelque chose qui ne ressemble à personne d'autre.",
    "rd.pick": "Choisis une série",
    "rd.interview": "L'interview",
    "rd.about_h1": "Faire des images, matin et soir.",
    "rd.about_p1": "Je fais des images. Parfois je les capture, parfois je les invente. Photographe le matin, directrice artistique l'après-midi — et l'inverse le lendemain.",
    "rd.about_p2": "Je travaille entre portrait, headshot et design. J'aime les marques qui ont quelque chose à dire et les visages qui ne mentent pas. Tout part d'un carnet, d'un repérage, d'une idée notée trop vite.",
    "rd.about_p3": "Basée à Paris, amoureuse du grain et du 35mm. Un esprit curieux, qui construit sans cesse.",
    "rd.career": "Le parcours jusqu'ici.",
    "rd.ways": "Trois façons de regarder.",
    "rd.way_portrait": "Éditorial & personnel, au 35mm.",
    "rd.way_headshot": "Studio — net, honnête, intemporel.",
    "rd.way_design": "Affiches, systèmes de marque, éditions.",
    "rd.tools": "35mm · moyen format · tirage.",
    "rd.wall": "Au mur.",
    "rd.contact_h": "On se parle.",
    "rd.sign": "Merci d'avoir regardé. — T.L.",
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
