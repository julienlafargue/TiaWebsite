/* ============================================================
   book.js — magazine feuilletable : les feuilles se tournent
   (flip 3D) une à une via les flèches ou en cliquant les pages.
   ============================================================ */
const book = document.querySelector("[data-book]");
if (book) {
  const leaves = [...book.querySelectorAll("[data-leaf]")];
  const prevBtn = document.querySelector("[data-book-prev]");
  const nextBtn = document.querySelector("[data-book-next]");
  const N = leaves.length;
  let flipped = 0;                 // nombre de feuilles tournées

  function update() {
    leaves.forEach((lf, i) => {
      const isF = i < flipped;
      lf.classList.toggle("is-flipped", isF);
      // empilement : non tournées → la 1re au-dessus ; tournées → la dernière au-dessus
      lf.style.zIndex = isF ? (i + 1) : (N - i);
    });
    if (prevBtn) prevBtn.disabled = flipped <= 0;
    if (nextBtn) nextBtn.disabled = flipped >= N;
    book.classList.toggle("book--start", flipped === 0);
    book.classList.toggle("book--end", flipped === N);
  }

  const next = () => { if (flipped < N) { flipped++; update(); } };
  const prev = () => { if (flipped > 0) { flipped--; update(); } };

  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);

  // clic sur la moitié droite = page suivante, moitié gauche = précédente
  book.addEventListener("click", (e) => {
    if (e.target.closest("a")) return;            // laisse les liens fonctionner
    const r = book.getBoundingClientRect();
    if (e.clientX > r.left + r.width / 2) next(); else prev();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
  });

  update();
}
