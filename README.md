# TIA — Portfolio éditorial

Galerie numérique pour Tia : **photographie** + **direction artistique**.
HTML / CSS / JS vanilla. Une seule dépendance externe : **GSAP** (CDN).
Statique, prêt pour **GitHub Pages**. Aucun build obligatoire.

```
index.html          Accueil (couverture + mur de télés)
about.html          Le cerveau d'artiste (collage polaroid)
work.html           Galerie filtrable (toutes les photos par type) + visionneuse
reel.html           Roue View-Master par catégorie (?cat=) + visionneuse
process.html        Carnet de bord (process général)
booking.html        Shooting touristes Paris + formulaire
contact.html        Colophon
css/                reset · tokens · typography · styles
js/                 main · cursor · transitions · tv-grid · photo-wheel
assets/grain.png    Texture grain globale
img/                Images
CONTENU.md          Tous les TODO à remplir
```

## Lancer en local

Un serveur statique suffit (les modules ES nécessitent `http://`, pas `file://`) :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

Alternatives : `npx serve` · extension « Live Server » de VS Code.

## Déployer sur GitHub Pages (< 5 min)

1. Pousser le code sur la branche `main`.
2. Repo → **Settings → Pages**.
3. **Source** : `Deploy from a branch`.
4. **Branch** : `main` · **Folder** : `/ (root)` → **Save**.
5. Attendre ~1 min : le site est en ligne sur `https://<user>.github.io/<repo>/`.

> Les chemins sont relatifs : pas de config supplémentaire nécessaire.
> Pour un domaine custom, ajouter un fichier `CNAME` à la racine.

## Parcours du site

`work.html` affiche 6 télés (catégories). Cliquer une télé déclenche l'effet
zapping puis ouvre `reel.html?cat=<catégorie>` : une **roue** de photos du même
type. Cliquer une vignette ouvre la **visionneuse** (grande image + description).

## Ajouter / modifier une photo dans une roue

Tout vit dans l'objet `CATEGORIES` de `js/photo-wheel.js`. Pour ajouter une photo
à une catégorie, ajoute une entrée à son tableau `photos` :

```js
P("photo-xx.png", "Texte alt descriptif", "Description affichée dans la visionneuse")
```

Les 6 catégories : `photographie`, `affiches`, `identites`, `editions`,
`portraits`, `encours`. Le centre de chaque roue (`title`, `meta`, `stars`) se
règle au même endroit.

## Mur de télés (CRT)

Les 6 catégories sont dans `CATS` (`js/tv-grid.js`) : `label`, `tag`, `poster`.
La disposition 3×3 du mur est dans `WALL` (catégories + cellules décor
`static`/`glitch` + panneau `index`). Pour une vraie boucle vidéo à la place d'une
image, remplacer le `<img>` de `.crt__screen` par :
```html
<video autoplay loop muted playsinline poster="..."><source src="loop.webm" type="video/webm"></video>
```
Garder `muted` + `playsinline` (autoplay mobile + a11y).

## Choix techniques

- **Thème sombre, bleu électrique dominant.** Tout passe par les tokens : inverser le thème
  ou la teinte se fait dans `css/tokens.css` (`--paper` = fond, `--ink` = texte, `--blue` /
  `--blue-bright`).
- **Typo** : Syne (display) · Space Grotesk (corps) · Space Mono (méta).
- **Mur de télés** : `js/tv-grid.js` — les 6 catégories sont dans `CATS`, la disposition du
  mur (catégories + cellules décor static/glitch + panneau index) dans `WALL`. Chaque cellule
  est un CRT 100 % CSS (pas d'image de cadre).
- **Bilingue EN/FR** : anglais par défaut. Le texte des pages est en anglais (fallback) +
  attributs `data-i18n`. Les traductions vivent dans le dictionnaire de `js/i18n.js`. Le
  sélecteur EN/FR de la nav (`[data-lang-toggle]`) mémorise le choix dans `localStorage`.
- **Galerie** : `js/gallery.js` agrège toutes les photos de `CATEGORIES` (photo-wheel.js) et
  gère les filtres ; clic = visionneuse « appareil ».
- **Tokens CSS** (`css/tokens.css`) = source unique pour couleurs et tailles.
- **JS modulaire** : un fichier par composant, modules ES (`type="module"`).
- **Accessibilité** : focus visibles, nav clavier, `prefers-reduced-motion`
  respecté (scanlines, shutter, vibrations et blur désactivés), alt-text partout.
- **Pas de tracker, pas de cookie.**

## Images en production

Optimiser en `.webp` avec fallback `.jpg`, via `<picture>` :

```html
<picture>
  <source srcset="img/x.webp" type="image/webp" />
  <img src="img/x.jpg" alt="…" loading="lazy" decoding="async" />
</picture>
```

---

> L'ancien site est archivé dans `old/` (non lié, conservé par sécurité).
