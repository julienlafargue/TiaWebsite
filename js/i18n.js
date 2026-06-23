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
    "nav.work": "Gallery",
    "nav.about": "About",
    "nav.process": "Process",
    "nav.booking": "Booking",
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
    "work.eyebrow": "Every frame, one place",
    "work.title": "Gallery",
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
    "nav.work": "Galerie",
    "nav.about": "À propos",
    "nav.process": "Process",
    "nav.booking": "Réserver",
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
    "work.eyebrow": "Tout le travail, au même endroit",
    "work.title": "Galerie",
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
