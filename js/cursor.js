/* ============================================================
   cursor.js — curseur custom crème inversé.
   Grossit + label mono sur les éléments cliquables.
   Désactivé < 768px et si pointeur grossier (tactile).
   ============================================================ */
import { reducedMotion } from "./main.js";

function initCursor() {
  const fine = window.matchMedia("(min-width: 769px) and (pointer: fine)").matches;
  if (!fine) return;

  const cursor = document.createElement("div");
  cursor.className = "cursor";
  const label = document.createElement("span");
  label.className = "cursor__label";
  cursor.appendChild(label);
  document.body.appendChild(cursor);
  document.body.classList.add("has-cursor");

  let x = window.innerWidth / 2,
    y = window.innerHeight / 2,
    cx = x,
    cy = y;

  window.addEventListener("mousemove", (e) => {
    x = e.clientX;
    y = e.clientY;
  });

  // suivi lissé (sauf reduced-motion : suivi direct)
  function loop() {
    if (reducedMotion()) {
      cx = x;
      cy = y;
    } else {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
    }
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  }
  loop();

  // label par défaut selon le type d'élément
  const labelFor = (el) =>
    el.dataset.cursor ||
    (el.closest(".tv") ? "zaper" : el.matches("a, .cta") ? "voir" : "");

  document.addEventListener("mouseover", (e) => {
    const t = e.target.closest("a, button, .tv, .camera__btn, [data-cursor]");
    if (t) {
      cursor.classList.add("grow");
      label.textContent = labelFor(t);
    }
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest("a, button, .tv, .camera__btn, [data-cursor]")) {
      cursor.classList.remove("grow");
    }
  });
}

document.addEventListener("DOMContentLoaded", initCursor);
