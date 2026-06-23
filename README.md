# TIA — Portfolio éditorial

Galerie numérique pour Tia : **photographie** + **direction artistique**.
HTML / CSS / JS vanilla. Une seule dépendance externe : **GSAP** (CDN).
Statique, prêt pour **GitHub Pages**. Aucun build obligatoire.

```
index.html          Accueil + grille TV (couverture magazine)
about.html          Le cerveau d'artiste (collage polaroid)
work.html           Grille TV + liste filtrable
projet/template.html Page projet + View-Master (à dupliquer)
process.html        Carnet de bord (scroll narratif)
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

## Ajouter un nouveau projet

1. Dupliquer `projet/template.html` → `projet/mon-projet.html`.
2. Remplir les `[TODO: …]` (titre, client, année, textes, making-of).
3. Renseigner les images du View-Master via l'attribut `data-images`
   (liste de chemins séparés par des virgules, en `../img/...`).
4. Ajouter une entrée dans le tableau `PROJECTS` en bas de `work.html`
   (nom, année, `cat`, `thumb`, et pointer le lien vers la nouvelle page).

## Remplacer les vidéos d'aperçu TV

Les 6 chaînes sont définies dans `js/tv-grid.js` (`CHANNELS`). Chaque entrée
utilise actuellement une image `poster`. Pour une vraie boucle vidéo :

1. Exporter une boucle silencieuse courte en `.webm` (+ `.mp4` fallback).
2. Dans `makeTV()`, remplacer le `<img>` de `.tv__screen` par :
   ```html
   <video autoplay loop muted playsinline poster="..."><source src="loop.webm" type="video/webm"></video>
   ```
3. Garder `muted` + `playsinline` (autoplay mobile + a11y).

## Choix techniques

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
