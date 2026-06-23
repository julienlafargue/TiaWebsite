/* ============================================================
   transitions.js — coupes cinéma entre pages.
   Utilise View Transitions API si dispo, sinon fallback manuel
   (fade noir 200ms + flash blanc 60ms en sortie).
   ============================================================ */
import { reducedMotion } from "./main.js";

function isInternal(a) {
  return (
    a &&
    a.href &&
    a.origin === location.origin &&
    !a.hasAttribute("target") &&
    !a.hasAttribute("download") &&
    !a.href.includes("#") &&
    a.getAttribute("href") !== null &&
    !a.dataset.noTransition
  );
}

function manualExit(href) {
  const fx = document.createElement("div");
  fx.className = "page-fx";
  document.body.appendChild(fx);
  // fade noir 200ms puis flash blanc 60ms puis navigation
  fx.animate(
    [{ opacity: 0 }, { opacity: 1 }],
    { duration: 200, easing: "cubic-bezier(0.65,0,0.35,1)", fill: "forwards" }
  ).onfinish = () => {
    fx.classList.add("flash");
    fx.animate([{ opacity: 1 }, { opacity: 1 }], { duration: 60 }).onfinish = () => {
      location.href = href;
    };
  };
}

function initTransitions() {
  // animation d'entrée (depuis blanc + blur)
  if (!reducedMotion() && !sessionStorage.getItem("noEnter")) {
    const enter = document.createElement("div");
    enter.className = "page-enter";
    document.body.appendChild(enter);
    enter.addEventListener("animationend", () => enter.remove());
  }
  sessionStorage.removeItem("noEnter");

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!isInternal(a)) return;
    e.preventDefault();
    const href = a.href;

    if (reducedMotion()) {
      location.href = href;
      return;
    }
    // View Transitions natif si dispo
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        location.href = href;
      });
      // certains navigateurs ne suspendent pas la nav : fallback direct
      setTimeout(() => (location.href = href), 250);
    } else {
      manualExit(href);
    }
  });
}

document.addEventListener("DOMContentLoaded", initTransitions);
