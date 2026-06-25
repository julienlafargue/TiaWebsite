/**
 * Génère une texture de mur peint vieilli (peinture écaillée) via Canvas.
 * Inspiré des ref : bleu ardoise dominant, crépi beige sous-jacent, couches multiples.
 */
export function buildWallTexture(el) {
  const W = 1400, H = 960;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // ─── 1. Fond : crépi / plâtre beige-crème ───────────────────────────
  ctx.fillStyle = '#c2b49a';
  ctx.fillRect(0, 0, W, H);

  // Variations de teinte du plâtre
  _patch(ctx, W * 0.2, H * 0.3, W * 0.5, H * 0.45, 'rgba(180,165,135,0.35)');
  _patch(ctx, W * 0.7, H * 0.1, W * 0.45, H * 0.5, 'rgba(210,198,172,0.3)');
  _patch(ctx, W * 0.1, H * 0.75, W * 0.6, H * 0.4, 'rgba(165,150,120,0.3)');
  _patch(ctx, W * 0.85, H * 0.6, W * 0.4, H * 0.5, 'rgba(195,182,155,0.25)');

  // ─── 2. Première couche de peinture (bleu ardoise sombre) ───────────
  // Grosse couverture avec des trous (zones écaillées)
  const NAVY = ['#1a2535', '#1c2840', '#182232', '#1e2b3c', '#162030'];
  _blobs(ctx, W, H, 55, 120, 420, NAVY, 0.92);

  // ─── 3. Deuxième couche partielle (bleu plus clair, peeling avancé) ──
  const SLATE = ['#253347', '#2a3a52', '#21304a', '#1f2e44'];
  _blobs(ctx, W, H, 30, 60, 260, SLATE, 0.85);

  // ─── 4. Zones de rouille / ancienne couche chaude ───────────────────
  const RUST = ['rgba(160,100,70,0.55)', 'rgba(180,120,80,0.45)', 'rgba(140,85,55,0.4)'];
  _blobs(ctx, W, H, 12, 30, 130, RUST, 0.7);

  // ─── 5. Ombres de bords (relief des écailles) ───────────────────────
  // Appliquée globalement avec un léger gradient radial d'obscurcissement
  const vignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.1, W / 2, H / 2, W * 0.85);
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.55)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, W, H);

  // ─── 6. Grain photographique ────────────────────────────────────────
  const imgData = ctx.getImageData(0, 0, W, H);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * 22;
    d[i]     = Math.max(0, Math.min(255, d[i]     + n));
    d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + n));
    d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + n));
  }
  ctx.putImageData(imgData, 0, 0);

  el.style.backgroundImage  = `url(${canvas.toDataURL('image/jpeg', 0.88)})`;
  el.style.backgroundSize   = 'cover';
  el.style.backgroundPosition = 'center';
}

/** Blob organique : forme irrégulière dessinée avec quadratic bezier */
function _blob(ctx, cx, cy, size) {
  const nPts = 7 + Math.floor(Math.random() * 6);
  ctx.beginPath();
  for (let j = 0; j <= nPts; j++) {
    const a  = (j / nPts) * Math.PI * 2;
    const r  = size * (0.25 + Math.random() * 0.75);
    const x  = cx + Math.cos(a) * r;
    const y  = cy + Math.sin(a) * r;
    if (j === 0) {
      ctx.moveTo(x, y);
    } else {
      const ca = ((j - 0.5) / nPts) * Math.PI * 2;
      const cr = size * (0.4 + Math.random() * 0.6);
      ctx.quadraticCurveTo(cx + Math.cos(ca) * cr, cy + Math.sin(ca) * cr, x, y);
    }
  }
  ctx.closePath();
}

/** Dessine N blobs aléatoires d'une palette de couleurs */
function _blobs(ctx, W, H, count, minSize, maxSize, colors, alpha) {
  for (let i = 0; i < count; i++) {
    const cx   = Math.random() * W;
    const cy   = Math.random() * H;
    const size = minSize + Math.random() * (maxSize - minSize);
    _blob(ctx, cx, cy, size);

    const col = colors[Math.floor(Math.random() * colors.length)];
    ctx.globalAlpha = alpha * (0.7 + Math.random() * 0.3);
    ctx.fillStyle = col;
    ctx.fill();

    // Ombre interne sur le bord pour simuler l'épaisseur de la peinture
    ctx.save();
    ctx.clip();
    ctx.globalAlpha = 0.5;
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowBlur  = 10 + Math.random() * 10;
    ctx.shadowOffsetX = 1 + Math.random() * 3;
    ctx.shadowOffsetY = 2 + Math.random() * 4;
    ctx.strokeStyle = 'rgba(0,0,0,0)';
    ctx.lineWidth   = 20;
    ctx.stroke();
    ctx.restore();

    ctx.globalAlpha = 1;
  }
}

/** Patch radial de variation de teinte */
function _patch(ctx, cx, cy, rx, ry, color) {
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
  g.addColorStop(0, color);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
