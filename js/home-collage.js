/**
 * Home — cascade de polaroïds éparpillés (façon éditorial) : une même photo
 * est lue à travers plusieurs cadres carrés inclinés, disposés en diagonale
 * et en désordre. La photo change régulièrement en se ré-éclatant.
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

// Étirement de l'image assemblée (permet le « panoramique » d'un cadre à l'autre)
const AR = 1.6;

/* Cascade horizontale (écrans larges) : les cadres avancent de gauche à droite
   (px), montent/descendent en zigzag (py), tournent dans tous les sens (rot).
   t = position lue dans l'image (0 = gauche … 1 = droite). s = côté du carré. */
const FRAMES_H = [
  { px: 0.00, py: 0.06, s: 0.22, rot: -13, t: 0.00 },
  { px: 0.10, py: 0.44, s: 0.19, rot:   7, t: 0.13 },
  { px: 0.19, py: 0.16, s: 0.24, rot:  -6, t: 0.26 },
  { px: 0.30, py: 0.50, s: 0.20, rot:  12, t: 0.38 },
  { px: 0.40, py: 0.10, s: 0.25, rot:  -9, t: 0.50 },
  { px: 0.51, py: 0.46, s: 0.21, rot:   8, t: 0.62 },
  { px: 0.61, py: 0.18, s: 0.24, rot: -12, t: 0.74 },
  { px: 0.71, py: 0.48, s: 0.20, rot:   6, t: 0.86 },
  { px: 0.78, py: 0.08, s: 0.23, rot: -10, t: 1.00 }
];

/* Cascade verticale (écrans étroits) : les cadres descendent (py), zigzag en x. */
const FRAMES_V = [
  { px: 0.04, py: 0.00, s: 0.40, rot: -11, t: 0.00 },
  { px: 0.44, py: 0.12, s: 0.34, rot:   8, t: 0.16 },
  { px: 0.10, py: 0.24, s: 0.38, rot:  -6, t: 0.32 },
  { px: 0.46, py: 0.38, s: 0.36, rot:  11, t: 0.48 },
  { px: 0.06, py: 0.52, s: 0.40, rot:  -9, t: 0.64 },
  { px: 0.42, py: 0.66, s: 0.34, rot:   7, t: 0.80 },
  { px: 0.14, py: 0.80, s: 0.38, rot: -10, t: 1.00 }
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
  const pool = [];
  let visible = 0;

  function ensure(n) {
    while (pool.length < n) {
      const el = document.createElement("a");
      el.className = "shard";
      el.href = "work.html";
      el.setAttribute("aria-label", "See the portfolio");
      root.appendChild(el);
      pool.push(el);
    }
    pool.forEach((el, i) => { el.style.display = i < n ? "" : "none"; });
    visible = n;
  }

  function layout() {
    const W = root.clientWidth;
    const H = root.clientHeight;
    if (!W || !H) return;

    const portrait = W / H < 0.9;
    const FRAMES = portrait ? FRAMES_V : FRAMES_H;

    // zone plus petite que l'écran, dégagée du header
    const zoneW = portrait ? W * 0.94 : Math.min(W * 0.9, 1180);
    const zoneH = portrait
      ? Math.min(H * 0.74, zoneW * 1.5)
      : Math.min(H * 0.6, zoneW * 0.52);
    const zoneX = (W - zoneW) / 2;
    const zoneY = Math.max(92, (H - zoneH) / 2); // ≥92px → sous le header

    ensure(FRAMES.length);
    FRAMES.forEach((f, i) => {
      const el = pool[i];
      const S = f.s * zoneW;                       // côté de la fenêtre photo (carré)
      const b = Math.max(4, Math.round(S * 0.05)); // liseré
      const bb = b + Math.round(S * 0.16);         // menton polaroïd (bien visible)
      const left = zoneX + f.px * zoneW;
      const top = zoneY + f.py * zoneH;
      el.style.borderWidth = `${b}px ${b}px ${bb}px ${b}px`;
      el.style.left = (left - b) + "px";
      el.style.top = (top - b) + "px";
      el.style.width = S + "px";
      el.style.height = S + "px";
      el.style.zIndex = i;                          // cascade : les suivants par-dessus
      // panoramique : chaque cadre montre une bande différente de l'image étirée
      const imgW = S * AR;
      el.style.backgroundSize = imgW + "px " + S + "px";
      el.style.backgroundPosition = (-(f.t * (imgW - S))) + "px 0px";
      el.style.setProperty("--rot", f.rot + "deg");
    });
  }

  function setImage(src) {
    for (let i = 0; i < visible; i++) pool[i].style.backgroundImage = `url("${src}")`;
  }

  layout();
  setImage(DIR + queue[idx]);
  { const p = new Image(); p.src = DIR + queue[(idx + 1) % queue.length]; }

  let rt;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(() => { layout(); setImage(DIR + queue[idx]); }, 120);
  });

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  setInterval(() => {
    idx = (idx + 1) % queue.length;
    const next = DIR + queue[idx];
    const after = DIR + queue[(idx + 1) % queue.length];

    if (reduce) {
      for (let i = 0; i < visible; i++) pool[i].style.opacity = "0";
      setTimeout(() => {
        setImage(next);
        for (let i = 0; i < visible; i++) pool[i].style.opacity = "1";
        const p = new Image(); p.src = after;
      }, 380);
      return;
    }

    for (let i = 0; i < visible; i++) {
      const el = pool[i];
      const dx = (Math.random() * 2 - 1) * 44;
      const dy = (Math.random() * 2 - 1) * 44;
      const sc = 0.88 + Math.random() * 0.06;
      el.style.transitionDelay = (i * 40) + "ms";
      el.style.setProperty("--tx", dx + "px");
      el.style.setProperty("--ty", dy + "px");
      el.style.setProperty("--sc", sc);
      el.style.opacity = "0";
    }

    setTimeout(() => {
      setImage(next);
      for (let i = 0; i < visible; i++) {
        const el = pool[i];
        el.style.setProperty("--tx", "0px");
        el.style.setProperty("--ty", "0px");
        el.style.setProperty("--sc", "1");
        el.style.opacity = "1";
        el.style.transitionDelay = "0ms";
      }
      const p = new Image(); p.src = after;
    }, 600);
  }, 4200);
}

const root = document.querySelector("[data-collage]");
if (root) buildCollage(root);
