/* ============================================================
   main.js — orchestration globale (nav, scroll-reveal, grain).
   Composants lourds : fichiers dédiés (series.js, work.js).
   ============================================================ */
import { t } from "./i18n.js?v=12";

/** true si l'utilisateur préfère moins d'animations */
export const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- Navigation : menu plein écran (mobile) + fond au scroll ---- */
function initNav() {
  const nav = document.querySelector(".nav");
  if (!nav) return;
  const burger = nav.querySelector(".nav__burger");

  if (burger) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("nav--open");
      burger.setAttribute("aria-expanded", String(open));
      burger.textContent = open ? t("nav.close") : t("nav.menu");
    });
    nav.querySelectorAll(".nav__menu a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("nav--open");
        burger.setAttribute("aria-expanded", "false");
        burger.textContent = t("nav.menu");
      })
    );
  }

  // fond noir dès qu'on quitte le haut de page
  const onScroll = () => nav.classList.toggle("nav--solid", window.scrollY > 48);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
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
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  els.forEach((el) => io.observe(el));
}

/* ---- Parallaxe très légère du grain ---- */
function initGrainDrift() {
  const grain = document.querySelector(".grain");
  if (!grain || reducedMotion()) return;
  let raf;
  window.addEventListener(
    "scroll",
    () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = (window.scrollY * 0.04) % 180;
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
