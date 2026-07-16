/**
 * Home — collage éclaté : une seule photo est découpée en plusieurs cadres
 * (façon polaroïds éparpillés), et l'image change régulièrement en se
 * recomposant. Chaque cadre est une « fenêtre » sur une portion de l'image.
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

/* Découpe en paysage : 6 cadres qui défilent de gauche à droite,
   décalés verticalement et pivotés (le « désordre »).            */
const FRAMES_WIDE = [
  { fx: 0.00, fy: 0.06, fw: 0.22, fh: 0.74, rot: -6 },
  { fx: 0.19, fy: 0.00, fw: 0.21, fh: 0.60, rot:  4 },
  { fx: 0.37, fy: 0.18, fw: 0.19, fh: 0.74, rot: -3 },
  { fx: 0.53, fy: 0.03, fw: 0.21, fh: 0.58, rot:  5 },
  { fx: 0.70, fy: 0.20, fw: 0.18, fh: 0.72, rot: -5 },
  { fx: 0.83, fy: 0.05, fw: 0.19, fh: 0.66, rot:  3 }
];

/* Découpe en portrait (écrans étroits) : cadres empilés, éparpillés. */
const FRAMES_TALL = [
  { fx: 0.08, fy: 0.00, fw: 0.74, fh: 0.20, rot: -4 },
  { fx: 0.00, fy: 0.17, fw: 0.60, fh: 0.19, rot:  3 },
  { fx: 0.24, fy: 0.33, fw: 0.74, fh: 0.20, rot: -3 },
  { fx: 0.03, fy: 0.51, fw: 0.62, fh: 0.19, rot:  4 },
  { fx: 0.26, fy: 0.68, fw: 0.70, fh: 0.20, rot: -5 },
  { fx: 0.06, fy: 0.84, fw: 0.66, fh: 0.16, rot:  3 }
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
  let frames = FRAMES_WIDE;

  // crée 6 cadres <a> (max entre les deux jeux)
  const shards = [];
  const count = Math.max(FRAMES_WIDE.length, FRAMES_TALL.length);
  for (let i = 0; i < count; i++) {
    const el = document.createElement("a");
    el.className = "shard";
    el.href = "work.html";
    el.setAttribute("aria-label", "See the gallery");
    root.appendChild(el);
    shards.push(el);
  }

  function layout() {
    const W = root.clientWidth;
    const H = root.clientHeight;
    const portrait = W / H < 0.95;
    frames = portrait ? FRAMES_TALL : FRAMES_WIDE;
    const targetAR = portrait ? 0.72 : 1.55; // largeur / hauteur de l'image assemblée

    let IW = W * (portrait ? 0.94 : 0.97);
    let IH = IW / targetAR;
    if (IH > H * 0.99) { IH = H * 0.99; IW = IH * targetAR; }
    const bx = (W - IW) / 2;
    const by = (H - IH) / 2;

    shards.forEach((el, i) => {
      const f = frames[i];
      if (!f) { el.style.display = "none"; return; }
      el.style.display = "";
      const sx = f.fx * IW, sy = f.fy * IH;
      const sw = f.fw * IW, sh = f.fh * IH;
      el.style.left = (bx + sx) + "px";
      el.style.top = (by + sy) + "px";
      el.style.width = sw + "px";
      el.style.height = sh + "px";
      el.style.backgroundSize = IW + "px " + IH + "px";
      el.style.backgroundPosition = (-sx) + "px " + (-sy) + "px";
      el.style.setProperty("--rot", f.rot + "deg");
    });
  }

  function setImage(src) {
    shards.forEach((el) => { el.style.backgroundImage = `url("${src}")`; });
  }

  // init
  layout();
  setImage(DIR + queue[idx]);
  // précharge la suivante
  const pre = new Image(); pre.src = DIR + queue[(idx + 1) % queue.length];

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
      setTimeout(() => { setImage(next); shards.forEach((el) => { el.style.opacity = "1"; }); }, 380);
      const p = new Image(); p.src = after;
      return;
    }

    // éclatement : chaque cadre s'écarte et s'efface
    shards.forEach((el, i) => {
      if (el.style.display === "none") return;
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
      const p = new Image(); p.src = after; // précharge la suivante
    }, 560);
  }, 4200);
}

const root = document.querySelector("[data-collage]");
if (root) buildCollage(root);
