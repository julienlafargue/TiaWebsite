/* ============================================================
   services.js - pré-remplit la formule dans le formulaire
   quand on clique « Book → » sur une offre, puis scrolle au form.
   ============================================================ */
const select = document.getElementById("formula");

document.querySelectorAll("[data-package]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const wanted = btn.dataset.package;
    if (!select || !wanted) return;
    const opt = [...select.options].find((o) => o.value === wanted || o.textContent.trim() === wanted);
    if (opt) select.value = opt.value || opt.textContent;
    // le lien href="#form" gère déjà le défilement
  });
});
