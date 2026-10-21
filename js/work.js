/* ============================================================
   work.js — Portfolio : image qui suit le curseur au survol
   des entrées de la liste (desktop uniquement).
   ============================================================ */
const list = document.querySelector("[data-worklist]");
const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (list && fine) {
  const follower = document.createElement("div");
  follower.className = "worklist__cursor";
  const img = document.createElement("img");
  img.alt = "";
  follower.appendChild(img);
  document.body.appendChild(follower);

  let raf, tx = 0, ty = 0, cx = 0, cy = 0, active = false;

  const loop = () => {
    cx += (tx - cx) * 0.18;
    cy += (ty - cy) * 0.18;
    follower.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    raf = requestAnimationFrame(loop);
  };

  list.querySelectorAll(".worklist__item").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const src = item.dataset.img;
      if (src && img.src.indexOf(src) === -1) img.src = src;
      follower.classList.add("show");
      active = true;
    });
    item.addEventListener("mouseleave", () => {
      follower.classList.remove("show");
    });
  });

  window.addEventListener("mousemove", (e) => {
    tx = e.clientX; ty = e.clientY;
    if (!active) { cx = tx; cy = ty; }
    if (!raf) loop();
  }, { passive: true });
}
