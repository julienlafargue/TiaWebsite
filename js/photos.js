/* ============================================================
   photos.js — source unique des séries du Portfolio.
   3 séries : Portrait · Headshot · Design.
   NOTE : les `desc` sont des textes de placement (descriptifs, neutres).
          À remplacer par la vraie copie éditoriale de Tia-Lana.
   ============================================================ */

const DIR = "img/photography/pro/";
const P = (file, title, desc) => ({ src: DIR + file, title, desc });

export const SERIES = {
  portrait: {
    label: "Portrait",
    meta: "Editorial · 35mm",
    photos: [
      P("photo-c.png", "Rooftop", "Natural light on a rooftop, late afternoon. Shot on 35mm, no reflector — the whole frame lives on one soft source."),
      P("photo-m.png", "Wind", "Hair caught by the wind at the end of the day. Kept the movement rather than the pose."),
      P("photo-q.png", "Red", "Seated, red top against a warm wall. Colour does the talking here."),
      P("photo-e.png", "Between takes", "A smile caught between two frames — the shot that wasn't planned."),
      P("photo-r.png", "Soft contrast", "Black and white, soft contrast. Printed grain kept intentionally visible."),
      P("photo-a.png", "Studio", "Studio portrait, hand to chin. One light, one reflector, nothing else."),
      P("photo-i.png", "Petals", "Location scouting: a bench, petals, and the light we came back for."),
      P("photo-w.png", "Low light", "Coastal town at low light. Waited for the sun to drop behind the roofline.")
    ]
  },
  headshot: {
    label: "Headshot",
    meta: "Faces · Studio",
    photos: [
      P("photo-g.png", "Direct", "Straight to camera under hard light. Nothing to hide behind."),
      P("photo-f.png", "Crop", "Short crop against black. Built entirely on the edge light."),
      P("photo-h.png", "Calm", "A quieter headshot in black and white — the breath between two takes."),
      P("photo-x.png", "Frank", "Studio, frank and square to the lens."),
      P("photo-z.png", "Softness", "Black and white with a softer falloff. Diffusion right against the light."),
      P("photo-b.png", "Classic", "A classic black and white headshot. Clean, timeless, no tricks."),
      P("photo-o.png", "Backlight", "Backlit silhouette — the face read through the rim, not the fill."),
      P("photo-n.png", "Warm", "Warm tones across the face. Gelled key, kept subtle.")
    ]
  },
  design: {
    label: "Design",
    meta: "Posters · Brand",
    photos: [
      P("photo-u.png", "HENRY", "Film poster — a red figure carrying the whole composition. Type built around the silhouette."),
      P("photo-ae.png", "HAUTE", "Graphic poster, neon lips. Direction, colour and type as one system."),
      P("photo-s.png", "Grid", "A grid of faces, editorial montage. Repetition as rhythm."),
      P("photo-ad.png", "PING", "Collage with analogue texture — scanned, torn, reassembled."),
      P("photo-d.jpg", "Colour", "Close-up on lips, pushed colour treatment. A brand's material detail."),
      P("photo-y.png", "Concept", "Concept image, anatomical heart. Made for a campaign key visual.")
    ]
  }
};

export const SERIES_ORDER = ["portrait", "headshot", "design"];

/* image de couverture d'une série (première photo) */
export const cover = (key) => SERIES[key].photos[0].src;
