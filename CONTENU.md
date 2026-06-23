# CONTENU — TODO à remplir

Tous les contenus à personnaliser, regroupés par page. Le nom (**Tia**) et la
ville (**Paris**) sont déjà posés ; cherche `[TODO:` dans le code pour le reste.

> Astuce : `grep -rn "\[TODO" .` à la racine pour tout lister d'un coup.

---

## Global
- [ ] **Images réelles** : les pages réutilisent `img/photography/pro/*.png`.
      Remplace par tes propres `.webp` (+ fallback `.jpg`) pour la prod.
- [ ] **Grain** : `assets/grain.png` est généré automatiquement — remplaçable.
- [ ] **Vidéos d'aperçu TV** : actuellement des images poster. Voir README → « Remplacer les vidéos ».

## index.html (Accueil)
- [ ] `img/home/hero-home.png` → portrait hero définitif
- [ ] Sticker « WTF » : garder ou changer le clin d'œil

## about.html
- [ ] Photo polaroid (`photo-b.png`)
- [ ] Bio 2 colonnes (texte éditorial)
- [ ] Ligne manuscrite : `LOVES …` / centres d'intérêt
- [ ] Citation bleue

## work.html — mur de télés
- [ ] Posters / labels / tags des 6 chaînes → `js/tv-grid.js` (`CATS`)
- [ ] Disposition du mur (catégories + cellules décor + index) → `WALL`
      (chaque chaîne ouvre `reel.html?cat=<catégorie>`)

## reel.html — Roue / descriptions photo
Tout est dans l'objet `CATEGORIES` de `js/photo-wheel.js`, une roue par catégorie
(`photographie`, `affiches`, `identites`, `editions`, `portraits`, `encours`).
Pour chaque photo : `{ src, alt, desc }`.
- [ ] **`desc`** de chaque photo (texte affiché dans la visionneuse) — actuellement `[TODO]`
- [ ] **`alt`** descriptif (a11y) si tu changes les images
- [ ] `title` / `meta` / `stars` au centre de chaque roue

## process.html
- [ ] 4 blocs : Collecter / Cadrer / Repérer / Déclencher (textes + images)
- [ ] Annotations manuscrites (`.annot`)

## booking.html
- [ ] Prix et contenu des 3 formules
- [ ] Galerie d'exemples (6 images)
- [ ] **Formspree** : remplacer `YOUR_FORM_ID` dans `action="https://formspree.io/f/YOUR_FORM_ID"`
- [ ] Email `mailto:` (hello@tia.example)

## contact.html
- [ ] Email réel
- [ ] Handle Instagram `@tia.[TODO]`
- [ ] Liens Behance / Vimeo / LinkedIn
