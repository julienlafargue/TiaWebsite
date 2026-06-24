/* ============================================================
   main.js — orchestration globale, petit et non monolithique.
   Charge : nav mobile, scroll-reveal, parallaxe légère du grain.
   Les composants lourds vivent dans leurs propres fichiers.
   ============================================================ */

import { t } from "./i18n.js";

/** true si l'utilisateur préfère moins d'animations */
export const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- Menu mobile ---- */
function initNav() {
  const nav = document.querySelector(".site-nav");
  const toggle = nav?.querySelector(".nav-toggle");
  if (!nav || !toggle) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.removeAttribute("data-i18n"); // texte géré manuellement quand ouvert
    toggle.textContent = open ? t("nav.close") : t("nav.menu");
  });
  // referme au clic sur un lien
  nav.querySelectorAll(".nav-links a").forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("open"))
  );
}

/* ---- Scroll-reveal via IntersectionObserver ---- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length || reducedMotion()) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  els.forEach((el) => io.observe(el));
}

/* ---- Parallaxe très légère du grain (vie organique) ---- */
function initGrainDrift() {
  const grain = document.querySelector(".grain");
  if (!grain || reducedMotion()) return;
  let raf;
  window.addEventListener(
    "scroll",
    () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = (window.scrollY * 0.04) % 160;
        grain.style.backgroundPosition = `0 ${y}px`;
      });
    },
    { passive: true }
  );
}

/* ---- Bouton flottant « Booker un shooting » (toutes les pages sauf booking) ---- */
function initBookFab() {
  const page = location.pathname.split("/").pop();
  if (page === "booking.html") return;
  const a = document.createElement("a");
  a.className = "book-fab";
  a.href = "booking.html";
  a.setAttribute("aria-label", t("fab.book"));
  a.setAttribute("data-i18n-attr", "aria-label:fab.book");
  a.innerHTML = `<span class="book-fab__ico" aria-hidden="true">📷</span><span class="book-fab__txt" data-i18n="fab.book">${t("fab.book")}</span>`;
  document.body.appendChild(a);
}

/* ---- Invitation à descendre : clic = scroll fluide, 1er geste = descente douce ---- */
function initScrollCue() {
  const cue = document.querySelector(".scroll-cue");
  const wall = cue && cue.getAttribute("href")
    ? document.querySelector(cue.getAttribute("href"))
    : document.getElementById("wall");
  if (!cue || !wall) return;

  // scroll animé maison (le `behavior:smooth` natif n'est pas fiable partout)
  let scrolling = false;
  const goDown = () => {
    const target = window.scrollY + wall.getBoundingClientRect().top;
    if (reducedMotion()) { window.scrollTo(0, target); return; }
    if (scrolling) return;
    scrolling = true;
    const start = window.scrollY;
    const dist = target - start;
    const dur = 380;
    let t0;
    const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
    const step = (ts) => {
      t0 = t0 ?? ts;
      const p = Math.min((ts - t0) / dur, 1);
      window.scrollTo(0, start + dist * ease(p));
      if (p < 1) requestAnimationFrame(step);
      else scrolling = false;
    };
    requestAnimationFrame(step);
  };

  if (cue) {
    cue.addEventListener("click", (e) => { e.preventDefault(); goDown(); });
  }

}

/* ---- Scroll fluide GLOBAL (partout, tout le temps) ---- */
function initSmoothScroll() {
  if (reducedMotion()) return;
  if (!window.matchMedia("(pointer: fine)").matches) return; // souris uniquement

  let target = window.scrollY;
  let current = target;
  let active = false;
  const maxScroll = () =>
    document.documentElement.scrollHeight - window.innerHeight;

  function loop() {
    current += (target - current) * 0.14;
    if (Math.abs(target - current) < 0.4) {
      current = target;
      window.scrollTo(0, current);
      active = false;
      return;
    }
    window.scrollTo(0, current);
    requestAnimationFrame(loop);
  }

  window.addEventListener(
    "wheel",
    (e) => {
      // ne pas intercepter quand une modale est ouverte (body figé)
      if (document.body.style.overflow === "hidden") return;
      if (e.ctrlKey) return; // zoom navigateur
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      target = Math.max(0, Math.min(maxScroll(), target + e.deltaY * unit));
      if (!active) { active = true; requestAnimationFrame(loop); }
    },
    { passive: false }
  );

  // resync si l'utilisateur scrolle autrement (barre, clavier, ancre)
  window.addEventListener("scroll", () => {
    if (!active) { target = window.scrollY; current = window.scrollY; }
  }, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initReveal();
  initGrainDrift();
  initBookFab();
  initScrollCue();
  initSmoothScroll();
});
