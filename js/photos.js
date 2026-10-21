/* ============================================================
   photos.js - source unique des séries du Portfolio.
   5 vraies catégories (portfolio de Tia-Lana) :
   Portrait · Product & Fashion · Landscape · Creative series · Posters.
   Photos et descriptions tirées du portfolio PDF.
   ============================================================ */

const DIR = "img/portfolio/";
const P = (file, title, desc) => ({ src: DIR + file, title, desc });

export const SERIES = {
  portrait: {
    label: "Portrait",
    meta: "People · Light",
    intro:
      "More than a face - I look for the essence of the person in front of the lens. A fleeting expression, a subtle gesture, a moment of stillness, in a space where the subject can simply be themselves.",
    photos: [
      P("portrait-01.jpg", "White shirt", "Natural light, white on white. The frame built entirely on one soft source."),
      P("portrait-02.jpg", "Stillness", "A quiet moment held just long enough - the breath between two frames."),
      P("portrait-03.jpg", "Gesture", "A subtle gesture says more than the pose. I kept the in-between."),
      P("portrait-04.jpg", "Presence", "Straight to camera. Nothing to hide behind, nothing added."),
      P("portrait-05.jpg", "Expression", "The detail that makes someone unique - caught, not directed."),
      P("portrait-06.jpg", "Light study", "Working the fall-off across the face until it felt honest."),
      P("portrait-07.jpg", "Character", "Personality allowed to come through, in its own time."),
      P("portrait-08.jpg", "Soft", "A softer, warmer read - comfort before the camera."),
    ],
  },

  "product-fashion": {
    label: "Product & Fashion",
    meta: "Studio · Styling",
    intro:
      "Precision meets creativity. For product I chase clean composition and styling that suits the object; for fashion I play with light and movement to capture the mood and attitude of each look.",
    photos: [
      P("fashion-01.jpg", "Attitude", "Fashion as visual storytelling - mood, movement and a bit of defiance."),
      P("product-01.jpg", "Line-up", "Clean warm light across a product line. Form, function, appeal in one frame."),
      P("product-02.jpg", "Hero shot", "A single object given room to breathe - minimal and deliberate."),
      P("product-03.jpg", "Detail", "Close styling that lets the material speak."),
      P("fashion-02.jpg", "Look", "Styling and lighting tuned to the character of the piece."),
      P("fashion-03.jpg", "Motion", "Experimenting with movement to bring the concept to life."),
      P("product-04.jpg", "Still life", "Polished, professional, quietly editorial."),
    ],
  },

  landscape: {
    label: "Landscape",
    meta: "Nature · Travel",
    intro:
      "Landscape lets me slow down and connect with a place - not just its beauty, but the atmosphere that makes it feel alive. Composition and perspective as an invitation into the scene.",
    photos: [
      P("landscape-01.jpg", "Lagoon", "A wide open vista - reef, island and sky, waiting for the light to settle."),
      P("landscape-02.jpg", "Coastline", "The shape of the shore read from above."),
      P("landscape-03.jpg", "Horizon", "Stillness and distance - room for the eye to wander."),
      P("landscape-04.jpg", "Detail", "An intimate detail in nature, close to the ground."),
    ],
  },

  creative: {
    label: "Creative Series",
    meta: "Narrative · Concept",
    intro:
      "Narrative photography - triptychs that carry an idea across three frames: the weight of performance, the framing of innocence, and pure experimentation with colour.",
    photos: [
      P("clown-01.jpg", "Lemons - I", "The clown triptych: the weight of constant performance, the painted smile over the fatigue beneath."),
      P("clown-02.jpg", "Lemons - II", "The contrast between the persona and the self, blurring the line between the act and the person."),
      P("clown-03.jpg", "Lemons - III", "The pressure to always 'put on a face', even when disconnected from it."),
      P("doll-01.jpg", "Doll - I", "Innocence and premature expectation: the model styled as a doll, a white teddy bear as a symbol of youth."),
      P("doll-02.jpg", "Doll - II", "Soft tones and deliberate styling - a reflection on how femininity is framed from a young age."),
      P("doll-03.jpg", "Doll - III", "Vulnerability placed beside adult symbols, unsettling by design."),
      P("editing-01.jpg", "Editing - I", "Experimental grading in Photoshop: loud, exaggerated, surreal."),
      P("editing-02.jpg", "Editing - II", "Stepping outside realism to see how manipulation amplifies mood."),
      P("editing-03.jpg", "Editing - III", "Bold colour pushed for maximum visual impact."),
    ],
  },

  posters: {
    label: "Posters & Design",
    meta: "Procreate · Photoshop",
    intro:
      "Beyond the lens - drawn and designed work. Bold composition, symbolic imagery and sharp typography, built in Procreate, Photoshop and Canva.",
    photos: [
      P("poster-henry.jpg", "Henry V", "A poster for Shakespeare's Henry V, drawn in Procreate. Bold composition and symbolic imagery around war and identity."),
      P("poster-editorial.jpg", "Editorial", "A loud, editorial-style poster built in Photoshop and Canva - layered graphics and fashion-forward type."),
    ],
  },
};

export const SERIES_ORDER = ["portrait", "product-fashion", "landscape", "creative", "posters"];

/* image de couverture d'une série (première photo) */
export const cover = (key) => SERIES[key].photos[0].src;
