/* ============================================================
   love.js — easter egg : le petit cœur à côté du logo.
   Au clic : le cœur dérive vers le centre en battant, puis un
   grand cœur rose s'ouvre en plein écran et mène à love.html.
   ============================================================ */

const ROSE = "#c9736a";
const heart = document.getElementById("loveHeart");

/* grand cœur SVG qui s'agrandit depuis le centre */
function makeLoveHeart(vcx, vcy) {
  const size = 64;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("id", "loveOverlay");
  svg.setAttribute("viewBox", "0 0 100 90");
  svg.style.cssText = `
    position:fixed; overflow:visible; pointer-events:none; z-index:9998;
    width:${size}px; height:${size}px;
    left:${vcx - size / 2}px; top:${vcy - size / 2}px;
    transform:scale(0.001); transform-origin:center center;
    transition:transform 5.5s cubic-bezier(.12,0,.08,1);
  `;
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M50 82 C28 65, 2 50, 2 28 C2 14, 14 4, 28 4 C37 4, 44 9, 50 16 C56 9, 63 4, 72 4 C86 4, 98 14, 98 28 C98 50, 72 65, 50 82Z"
  );
  path.setAttribute("fill", ROSE);
  svg.appendChild(path);
  document.body.appendChild(svg);
  return svg;
}

/* nettoyage au retour arrière (bfcache) ou restauration de page */
function resetLoveHeart() {
  const ov = document.getElementById("loveOverlay");
  if (ov) { ov.style.transition = "none"; ov.remove(); }
  if (heart) heart.removeAttribute("style");
}

if (heart) {
  heart.addEventListener("click", function () {
    const el = this;
    el.style.pointerEvents = "none";

    const r = el.getBoundingClientRect();
    const ex = r.left + r.width / 2;
    const ey = r.top + r.height / 2;
    const vcx = window.innerWidth / 2;
    const vcy = window.innerHeight / 2;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { location.href = "love.html"; return; }

    /* Phase 1 — le cœur dérive vers le centre en battant */
    el.style.transition = "transform .7s cubic-bezier(.4,0,.2,1)";
    el.style.transform = `translate(${vcx - ex}px,${vcy - ey}px) scale(2)`;
    el.style.animation = "heartbeat .22s ease-in-out infinite";

    /* Phase 2 — le grand cœur s'ouvre depuis le centre */
    setTimeout(() => {
      el.style.opacity = "0";
      const svg = makeLoveHeart(vcx, vcy);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          svg.style.transform = "scale(75)";
          setTimeout(() => { location.href = "love.html"; }, 1600);
        })
      );
    }, 680);
  });

  window.addEventListener("pageshow", resetLoveHeart);
  window.addEventListener("DOMContentLoaded", resetLoveHeart);
}
