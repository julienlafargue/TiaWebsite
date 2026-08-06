/**
 * Home — UNE seule photo éclatée : chaque polaroïd est une fenêtre sur une
 * portion différente de la même image. Les cadres sont ESPACÉS (peu de
 * superposition) et écartés depuis le centre → l'image reste lisible, la
 * composition est large et irrégulière. La photo change régulièrement.
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

// angles variés + décalages stables (désordre reproductible au resize)
const ROT = [-11, 6, -4, 9, -8, 3, -6, 12, -3, 7, -9, 5, -12, 4, -5, 10, -7, 8];
const hash = (i) => { const r = Math.sin(i * 12.9898 + 4.1) * 43758.5453; return r - Math.floor(r); };

/* Grille de régions qui pavent l'image (fenêtres carrées).
   `skip` = cases volontairement absentes → silhouette irrégulière, pas un bloc.
   AR = étirement de l'image assemblée (pour que les cellules soient carrées). */
function grid(cols, rows, AR, skip) {
  const fw = 1 / cols;
  const fh = fw * AR;                    // hauteur de région (fenêtre carrée)
  const gapY = (1 - fh * rows) / (rows + 1);
  const a = [];
  let i = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++, i++) {
      if (skip.includes(i)) continue;    // trou volontaire (coins cassés, respiration)
      a.push({ fx: c * fw, fy: gapY * (r + 1) + fh * r, fw, fh, k: i });
    }
  }
  return a;
}

/* Beaucoup de petits polaroïds, bien serrés.  Desktop 9×4 · mobile 4×6.
   spread ≈ 1 → les cadres restent collés les uns aux autres.
   skip : UNIQUEMENT des cases de bord/coin → silhouette irrégulière sans
   trou au milieu (un trou intérieur ressemble à un bug, pas à un parti pris). */
const LAYOUT_H = {
  cols: 9, rows: 4, AR: 1.7, spreadX: 1.03, spreadY: 0.92,
  skip: [0, 1, 8, 9, 26, 27, 34, 35]
};
const LAYOUT_V = {
  cols: 4, rows: 6, AR: 0.62, spreadX: 1.02, spreadY: 0.95,
  skip: [0, 3, 4, 19, 20, 23]
};

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

  /* mode CADRE : polaroïds en vrac qui couvrent toute la vue (empilés, de travers) */
  function layoutFill(W, H) {
    const cols = Math.max(5, Math.min(9, Math.round(W / 46)));  // polaroïds plus petits
    const cell = W / cols;
    const rows = Math.ceil(H / cell) + 1;    // +1 rangée : couvre malgré le désordre
    const IW = cols * cell;
    const IH = (rows - 1) * cell;
    const by = (H - IH) / 2;
    const n = cols * rows;
    ensure(n);
    for (let i = 0; i < n; i++) {
      const el = pool[i];
      const c = i % cols, r = Math.floor(i / cols);
      const sx = c * cell, sy = r * cell;
      // désordre stable (reproductible au resize)
      const S = cell * (1.2 + hash(i * 2 + 1) * 0.22);       // fort chevauchement + tailles variées
      const off = (S - cell) / 2;
      const jx = (hash(i * 3 + 2) - 0.5) * cell * 0.24;      // décalage aléatoire
      const jy = (hash(i * 3 + 5) - 0.5) * cell * 0.24;
      const rot = (hash(i * 5 + 3) - 0.5) * 16;              // ~ -8° … +8°
      const b = Math.max(2, Math.round(cell * 0.035));
      const bb = b + Math.round(cell * 0.07);
      el.style.borderWidth = `${b}px ${b}px ${bb}px ${b}px`;
      el.style.left = (sx - off - b + jx) + "px";
      el.style.top = (by + sy - off - b + jy) + "px";
      el.style.width = S + "px";
      el.style.height = S + "px";
      el.style.zIndex = Math.round(hash(i * 7 + 4) * 100);   // empilement désordonné
      el.style.backgroundSize = IW + "px " + IH + "px";
      el.style.backgroundPosition = (off - sx) + "px " + (off - sy) + "px";
      el.style.setProperty("--rot", rot.toFixed(2) + "deg");
    }
  }

  function layout() {
    const W = root.clientWidth;
    const H = root.clientHeight;
    if (!W || !H) return;

    // plein écran (variante polaroïd) → mosaïque éparpillée ;
    // intégré dans le cadre → on REMPLIT toute la vue de polaroïds.
    const full = H > window.innerHeight * 0.8;
    if (!full) { layoutFill(W, H); return; }

    const portrait = W / H < 0.9;
    const L = portrait ? LAYOUT_V : LAYOUT_H;
    const frames = grid(L.cols, L.rows, L.AR, L.skip);

    const cx = W / 2;                              // centre horizontal
    const availTop = full ? 100 : H * 0.03;
    const availBot = full ? H - 74 : H * 0.97;
    const cy = (availTop + availBot) / 2;          // centre vertical utile
    const availH = availBot - availTop;

    let IW = portrait ? Math.min(W * 0.92, 460) : Math.min(W * 0.85, 1250);
    let IH = IW / L.AR;
    // garde-fou : si la composition dépasse la hauteur utile, on réduit
    const footprint = 0.72 * IH * L.spreadY + (IW / L.cols) * 1.2;
    if (footprint > availH) { const k = availH / footprint; IW *= k; IH *= k; }

    ensure(frames.length);
    frames.forEach((f, i) => {
      const el = pool[i];
      const k = f.k;                                // clé stable de la case
      const regionS = f.fw * IW;                    // taille de la région (carrée)
      const S = regionS * (0.9 + hash(k + 13) * 0.1);    // tailles variées, cadres serrés
      const off = (regionS - S) / 2;                // on montre le centre de la région
      const sx = f.fx * IW + off;
      const sy = f.fy * IH + off;
      // centre de la région, écarté depuis le centre (spread) + décalage (désordre)
      const rcx = (f.fx + f.fw / 2 - 0.5) * IW;
      const rcy = (f.fy + f.fh / 2 - 0.5) * IH;
      const jx = (hash(k) - 0.5) * 0.025 * IW;
      const jy = (hash(k + 7) - 0.5) * 0.025 * IH;
      const dcx = cx + rcx * L.spreadX + jx;
      const dcy = cy + rcy * L.spreadY + jy;

      const b = Math.max(3, Math.round(S * 0.05));
      const bb = b + Math.round(S * 0.13);          // menton polaroïd
      el.style.borderWidth = `${b}px ${b}px ${bb}px ${b}px`;
      el.style.left = (dcx - S / 2 - b) + "px";
      el.style.top = (dcy - S / 2 - b) + "px";
      el.style.width = S + "px";
      el.style.height = S + "px";
      el.style.zIndex = i;
      el.style.backgroundSize = IW + "px " + IH + "px";
      el.style.backgroundPosition = (-sx) + "px " + (-sy) + "px";
      el.style.setProperty("--rot", ROT[k % ROT.length] + "deg");
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
