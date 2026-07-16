/**
 * Home — collage de polaroïds carrés : une seule photo est découpée en
 * plusieurs cadres carrés (façon polaroïds éparpillés) qui, mis bout à bout,
 * recomposent l'image. La photo change régulièrement en se ré-éclatant.
 */

const DIR = "img/photography/pro/";
const FILES = [
  "photo-a.png", "photo-b.png", "photo-c.png", "photo-d.jpg", "photo-f.png",
  "photo-g.png", "photo-h.png", "photo-i.png", "photo-j.png", "photo-k.png",
  "photo-l.png", "photo-m.png", "photo-o.png", "photo-p.png", "photo-q.png",
  "photo-r.png", "photo-s.png", "photo-v.png", "photo-w.png", "photo-x.png",
  "photo-y.png", "photo-z.png", "photo-aa.png", "photo-ab.png", "photo-ac.png",
  "photo-ad.png"
];

/* Découpe carrée : 6 polaroïds répartis sur une image carrée (3 colonnes ×
   2 rangées), légèrement pivotés → l'effet « en désordre ».
   fx, fy = coin de la tranche (fraction de l'image carrée) ; s = côté ; rot. */
const FRAMES = [
  { fx: 0.02, fy: 0.05, s: 0.32, rot: -5 },
  { fx: 0.35, fy: 0.00, s: 0.30, rot:  4 },
  { fx: 0.66, fy: 0.06, s: 0.32, rot: -4 },
  { fx: 0.04, fy: 0.44, s: 0.30, rot:  5 },
  { fx: 0.36, fy: 0.40, s: 0.33, rot: -3 },
  { fx: 0.67, fy: 0.46, s: 0.30, rot:  4 }
];

const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function buildCollage(root) {
  const queue = shuffle(FILES);
  let idx = 0;

  const shards = FRAMES.map(() => {
    const el = document.createElement("a");
    el.className = "shard";
    el.href = "work.html";
    el.setAttribute("aria-label", "See the gallery");
    root.appendChild(el);
    return el;
  });

  function layout() {
    const W = root.clientWidth;
    const H = root.clientHeight;
    // image carrée assemblée, ajustée pour tenir dans la zone
    const IMG = Math.min(W * 0.92, H * 0.92, 660);
    const bx = (W - IMG) / 2;
    const by = (H - IMG) / 2;
    const b = Math.max(5, Math.round(IMG * 0.009)); // épaisseur du cadre

    shards.forEach((el, i) => {
      const f = FRAMES[i];
      const S = f.s * IMG;
      const sx = f.fx * IMG;
      const sy = f.fy * IMG;
      const bb = Math.round(b + S * 0.15);          // menton polaroïd (bas plus épais)
      el.style.borderWidth = `${b}px ${b}px ${bb}px ${b}px`;
      el.style.left = (bx + sx - b) + "px";
      el.style.top = (by + sy - b) + "px";
      el.style.width = S + "px";
      el.style.height = S + "px";
      el.style.backgroundSize = IMG + "px " + IMG + "px";
      el.style.backgroundPosition = (-sx) + "px " + (-sy) + "px";
      el.style.setProperty("--rot", f.rot + "deg");
    });
  }

  function setImage(src) {
    shards.forEach((el) => { el.style.backgroundImage = `url("${src}")`; });
  }

  layout();
  setImage(DIR + queue[idx]);
  { const p = new Image(); p.src = DIR + queue[(idx + 1) % queue.length]; }

  let rt;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(layout, 120);
  });

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  setInterval(() => {
    idx = (idx + 1) % queue.length;
    const next = DIR + queue[idx];
    const after = DIR + queue[(idx + 1) % queue.length];

    if (reduce) {
      shards.forEach((el) => { el.style.opacity = "0"; });
      setTimeout(() => {
        setImage(next);
        shards.forEach((el) => { el.style.opacity = "1"; });
        const p = new Image(); p.src = after;
      }, 380);
      return;
    }

    // éclatement : chaque polaroïd s'écarte et s'efface
    shards.forEach((el, i) => {
      const dx = (Math.random() * 2 - 1) * 42;
      const dy = (Math.random() * 2 - 1) * 42;
      const sc = 0.9 + Math.random() * 0.06;
      el.style.transitionDelay = (i * 45) + "ms";
      el.style.setProperty("--tx", dx + "px");
      el.style.setProperty("--ty", dy + "px");
      el.style.setProperty("--sc", sc);
      el.style.opacity = "0";
    });

    // puis recomposition avec la nouvelle photo
    setTimeout(() => {
      setImage(next);
      shards.forEach((el) => {
        el.style.setProperty("--tx", "0px");
        el.style.setProperty("--ty", "0px");
        el.style.setProperty("--sc", "1");
        el.style.opacity = "1";
        el.style.transitionDelay = "0ms";
      });
      const p = new Image(); p.src = after;
    }, 560);
  }, 4200);
}

const root = document.querySelector("[data-collage]");
if (root) buildCollage(root);
