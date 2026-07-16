/**
 * Home — mosaïque de polaroïds : une seule photo est découpée en une grille
 * de cadres carrés (façon polaroïds serrés) qui recomposent l'image et
 * remplissent l'écran. La photo change régulièrement en se ré-éclatant.
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

const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// rotation stable par cellule (petit désordre, mais reproductible au resize)
function rotFor(i) {
  const r = Math.sin(i * 12.9898) * 43758.5453;
  return ((r - Math.floor(r)) * 5 - 2.5).toFixed(2); // ~ -2.5° … +2.5°
}

function buildCollage(root) {
  const queue = shuffle(FILES);
  let idx = 0;
  const pool = [];        // réservoir de cadres réutilisés
  let visible = 0;

  function ensure(n) {
    while (pool.length < n) {
      const el = document.createElement("a");
      el.className = "shard";
      el.href = "work.html";
      el.setAttribute("aria-label", "See the portfolio");
      el.style.setProperty("--rot", rotFor(pool.length) + "deg");
      root.appendChild(el);
      pool.push(el);
    }
    pool.forEach((el, i) => { el.style.display = i < n ? "" : "none"; });
    visible = n;
  }

  let gridW = 0, gridH = 0, cols = 0, rows = 0, cell = 0, bx = 0, by = 0;

  function layout() {
    const W = root.clientWidth;
    const H = root.clientHeight;
    if (!W || !H) return;

    cols = Math.max(3, Math.min(5, Math.round(W / 300)));
    const areaW = W * 0.99;
    const areaH = H * 0.99;
    cell = areaW / cols;
    rows = Math.max(2, Math.round(areaH / cell));
    cell = Math.min(areaW / cols, areaH / rows); // carré, tient dans la zone
    gridW = cols * cell;
    gridH = rows * cell;
    bx = (W - gridW) / 2;
    by = (H - gridH) / 2;

    const b = Math.max(3, Math.round(cell * 0.028));   // liseré fin
    const bb = b + Math.round(cell * 0.05);            // menton polaroïd léger

    ensure(cols * rows);
    for (let i = 0; i < visible; i++) {
      const el = pool[i];
      const c = i % cols;
      const r = Math.floor(i / cols);
      const sx = c * cell;
      const sy = r * cell;
      el.style.borderWidth = `${b}px ${b}px ${bb}px ${b}px`;
      el.style.left = (bx + sx - b) + "px";
      el.style.top = (by + sy - b) + "px";
      el.style.width = cell + "px";
      el.style.height = cell + "px";
      el.style.backgroundSize = gridW + "px " + gridH + "px";
      el.style.backgroundPosition = (-sx) + "px " + (-sy) + "px";
    }
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

    // éclatement : chaque polaroïd s'écarte et s'efface
    for (let i = 0; i < visible; i++) {
      const el = pool[i];
      const dx = (Math.random() * 2 - 1) * 26;
      const dy = (Math.random() * 2 - 1) * 26;
      const sc = 0.92 + Math.random() * 0.05;
      el.style.transitionDelay = (i * 16) + "ms";
      el.style.setProperty("--tx", dx + "px");
      el.style.setProperty("--ty", dy + "px");
      el.style.setProperty("--sc", sc);
      el.style.opacity = "0";
    }

    // recomposition avec la nouvelle photo
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
    }, 560);
  }, 4200);
}

const root = document.querySelector("[data-collage]");
if (root) buildCollage(root);
