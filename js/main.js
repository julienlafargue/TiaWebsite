/* ============================================================
   main.js — orchestration globale, petit et non monolithique.
   Charge : nav mobile, scroll-reveal, parallaxe légère du grain.
   Les composants lourds vivent dans leurs propres fichiers.
   ============================================================ */

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
    toggle.textContent = open ? "Fermer" : "Menu";
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

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initReveal();
  initGrainDrift();
});
