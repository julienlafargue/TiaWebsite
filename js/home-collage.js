/**
 * Home — UNE seule photo éclatée : chaque polaroïd est une fenêtre sur une
 * portion différente de la même image. Mis ensemble, les cadres recomposent
 * la photo (pas de duplication). Disposition irrégulière, centrée, inclinée.
 * La photo change régulièrement.
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

/* Chaque cadre = une fenêtre carrée sur l'image assemblée (fraction 0..1) :
   fx,fy = coin de la portion montrée ; fw = largeur (la hauteur = fw*AR pour
   que la fenêtre soit carrée). ox,oy = léger décalage (désordre). rot = angle.
   Les portions se recouvrent et couvrent toute l'image → une seule photo. */

// --- large (paysage), image assemblée AR ≈ 1.45 ---
const AR_H = 1.45;
const FRAMES_H = [
  { fx: 0.00, fy: 0.05, fw: 0.30, ox: -0.015, oy: -0.02, rot: -8 },
  { fx: 0.02, fy: 0.52, fw: 0.26, ox: -0.02,  oy:  0.03, rot:  6 },
  { fx: 0.26, fy: 0.26, fw: 0.30, ox:  0.00,  oy:  0.00, rot: -4 },
  { fx: 0.27, fy: -0.02, fw: 0.22, ox:  0.01, oy: -0.02, rot:  9 },
  { fx: 0.50, fy: 0.42, fw: 0.30, ox:  0.00,  oy:  0.03, rot: -7 },
  { fx: 0.50, fy: 0.00, fw: 0.26, ox:  0.00,  oy: -0.01, rot:  5 },
  { fx: 0.72, fy: 0.22, fw: 0.30, ox:  0.02,  oy:  0.00, rot: -9 },
  { fx: 0.74, fy: 0.56, fw: 0.22, ox:  0.02,  oy:  0.03, rot:  7 },
  { fx: 0.75, fy: -0.02, fw: 0.22, ox:  0.02, oy: -0.02, rot: -5 }
];

// --- étroit (portrait), image assemblée AR ≈ 0.85 ---
const AR_V = 0.85;
const FRAMES_V = [
  { fx: 0.00, fy: 0.00, fw: 0.54, ox: -0.01, oy: -0.01, rot: -7 },
  { fx: 0.46, fy: 0.14, fw: 0.52, ox:  0.01, oy: -0.01, rot:  6 },
  { fx: 0.01, fy: 0.31, fw: 0.54, ox: -0.01, oy:  0.00, rot: -5 },
  { fx: 0.44, fy: 0.47, fw: 0.54, ox:  0.01, oy:  0.01, rot:  8 },
  { fx: 0.00, fy: 0.62, fw: 0.54, ox: -0.01, oy:  0.01, rot: -6 },
  { fx: 0.42, fy: 0.78, fw: 0.56, ox:  0.01, oy:  0.01, rot:  7 }
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
    const AR = portrait ? AR_V : AR_H;

    // image assemblée, centrée, dégagée du header
    const IW = portrait ? Math.min(W * 0.9, 460) : Math.min(W * 0.8, 1000);
    const IH = IW / AR;
    const bx = (W - IW) / 2;
    const by = Math.max(96, (H - IH) / 2);   // ≥96px → sous le header, centré

    ensure(FRAMES.length);
    FRAMES.forEach((f, i) => {
      const el = pool[i];
      const S = f.fw * IW;                         // côté carré (= fw*IW = fh*IH)
      const sx = f.fx * IW;
      const sy = f.fy * IH;
      const b = Math.max(4, Math.round(S * 0.05));
      const bb = b + Math.round(S * 0.15);         // menton polaroïd
      el.style.borderWidth = `${b}px ${b}px ${bb}px ${b}px`;
      el.style.left = (bx + sx + f.ox * IW - b) + "px";
      el.style.top = (by + sy + f.oy * IH - b) + "px";
      el.style.width = S + "px";
      el.style.height = S + "px";
      el.style.zIndex = i;
      // fenêtre sur l'image assemblée complète → une seule photo
      el.style.backgroundSize = IW + "px " + IH + "px";
      el.style.backgroundPosition = (-sx) + "px " + (-sy) + "px";
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
      const dx = (Math.random() * 2 - 1) * 42;
      const dy = (Math.random() * 2 - 1) * 42;
      const sc = 0.9 + Math.random() * 0.05;
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
