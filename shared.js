/* ══════════════════════════════════════════
   SHARED.JS  —  Tia-Lana Chinapyel
   Language · Show/Hide Router · Animations
══════════════════════════════════════════ */

/* ── HTML-content translations ── */
const HTML_TRANSLATIONS = {
  en: {
    'about.title':      'A creative with a <em>story to tell</em>',
    'skills.title':     'What I<br><em>create</em>',
    'exp.title':        'My<br><em>Experience</em>',
    'explore.title':    'My two <em>worlds</em>',
    'contact.title':    "Let's create<br>something <em>beautiful</em>",
    'explore.acting':   'Acting &amp;<br><em>Performance</em>',
    'explore.photo':    'Photography &amp;<br><em>Gallery</em>',
    'acting.skills':    'Skills &amp; <em>Abilities</em>',
    'acting.credits':   'Stage &amp; <em>Screen</em>',
    'acting.training':  'My <em>Training</em>',
    'acting.contact':   "Let's create<br>something <em>memorable</em>",
    'photo.hero':       'My<br><em>Photography</em>',
    'photo.contact':    "Let's create<br>something <em>beautiful</em>",
  },
  fr: {
    'about.title':      'Une créative avec une <em>histoire à raconter</em>',
    'skills.title':     'Ce que je<br><em>crée</em>',
    'exp.title':        'Mon<br><em>Expérience</em>',
    'explore.title':    'Mes deux <em>univers</em>',
    'contact.title':    "Créons quelque chose<br>de <em>beau</em>",
    'explore.acting':   "Jeu d'actrice &amp;<br><em>Performance</em>",
    'explore.photo':    'Photographie &amp;<br><em>Galerie</em>',
    'acting.skills':    'Compétences &amp; <em>Aptitudes</em>',
    'acting.credits':   'Scène &amp; <em>Écran</em>',
    'acting.training':  'Ma <em>Formation</em>',
    'acting.contact':   "Créons quelque chose<br>de <em>mémorable</em>",
    'photo.hero':       'Ma<br><em>Photographie</em>',
    'photo.contact':    "Créons quelque chose<br>de <em>beau</em>",
  }
};

/* ── Theme text overrides (per theme, per lang) ── */
const THEME_TEXTS = {
  chaotique: {
    'hero.eyebrow':   { en: '??? · photo maybe · actress idk', fr: '??? · photo can-être · actrice bof' },
    'hero.p':         { en: "idk man. I take photos sometimes. I act. Paris, or wherever. it's whatever.", fr: 'jsp. des photos des fois. du théâtre. paris. bof.' },
    'about.p1':       { en: "Tia-Lana or whatever. I do visual stuff. and acting. it's a whole thing. don't ask.", fr: "Tia-Lana ou un truc comme ça. trucs visuels. théâtre aussi. c'est toute une histoire. demandez pas." },
    'about.p2':       { en: 'I point a camera at things. I do theater stuff. light? sure. connection? sometimes.', fr: 'je pointe un appareil photo sur des trucs. théâtre. lumière? ouais. connexion? des fois.' },
    'contact.sub':    { en: 'whatever. available for stuff.', fr: 'bof. dispo pour des trucs.' },
    'acting.eyebrow': { en: 'actress, sure · stage & screen & etc', fr: 'actrice, ok · scène & écran & machin' },
    'acting.p':       { en: 'British actress in Paris. Does theatre and TV and stuff. speaks English.', fr: 'Actrice britannique à Paris. Théâtre, TV et trucs. parle anglais.' },
    'photo.eyebrow':  { en: 'visual art · photos · whatever', fr: 'art visuel · photos · bof' },
    'photo.p':        { en: "A bunch of photos. portraits, landscapes, etc. you know how it is.", fr: "Des photos. portraits, paysages, etc. t'vois le truc." },
  },
  amour: {
    'hero.eyebrow':   { en: 'Love · Passion · Artiste ♥', fr: 'Amour · Passion · Artiste ♥' },
    'hero.p':         { en: 'Every photograph is a love letter. Every performance, a heartbeat. I live to create what makes hearts ache beautifully.', fr: "Chaque photographie est une lettre d'amour. Chaque performance, un battement de cœur. Je vis pour créer ce qui fait vibrer les âmes." },
    'about.p1':       { en: 'My name is Tia-Lana and I believe all art is love made visible. I photograph because I am in love with light — with the way it caresses a face, tells a story.', fr: "Je m'appelle Tia-Lana et je crois que tout art est l'amour rendu visible. Je photographie parce que je suis amoureuse de la lumière." },
    'about.p2':       { en: 'Whether behind the lens or centre stage, I pour every heartbeat into my craft. Art is my love language.', fr: "Que ce soit derrière l'objectif ou sur scène, je verse chaque battement de cœur dans mon art. L'art est mon langage d'amour." },
    'contact.sub':    { en: 'Available for photography, acting, and all the beautiful things hearts imagine together.', fr: "Disponible pour la photographie, le jeu d'actrice, et toutes les belles choses que les cœurs imaginent ensemble." },
    'acting.eyebrow': { en: 'Actress · Heart & Soul ♥', fr: 'Actrice · Cœur & Âme ♥' },
    'acting.p':       { en: 'British actress in Paris, pouring heart and soul into every role. Theatre, television, film — storytelling as an act of love.', fr: "Actrice britannique à Paris, mettant tout son cœur dans chaque rôle. Théâtre, télévision, cinéma — la narration comme acte d'amour." },
    'photo.eyebrow':  { en: 'Visual Love · Photography ♥', fr: 'Amour Visuel · Photographie ♥' },
    'photo.p':        { en: 'A love letter in photographs — portraits, fashion, landscapes and more. Each image whispers a story only the heart can hear.', fr: "Une lettre d'amour en photographies — portraits, mode, paysages et plus. Chaque image murmure une histoire que seul le cœur peut entendre." },
  },
  casse: {
    'hero.eyebrow':   { en: '⚠️ Loading… · [null] · Error 404', fr: '⚠️ Chargement… · [null] · Erreur 404' },
    'hero.p':         { en: 'This page is currently under construction. Some features may not work as expected. CSS partially loaded. Thank you for your patience. Please try refreshing.', fr: 'Cette page est en cours de construction. Certaines fonctionnalités peuvent ne pas fonctionner. CSS partiellement chargé. Merci de votre patience.' },
    'about.p1':       { en: '[Content loading…] My name is Tia-Lana and I — please hold — have a deep love for visual storytelling. ~~This text may be corrupted.~~', fr: '[Chargement contenu…] Je m\'appelle Tia-Lana et j\'ai — veuillez patienter — une profonde passion pour la narration visuelle. ~~Texte peut-être corrompu.~~' },
    'about.p2':       { en: 'Whether behind the lens or in front of it — [connection timeout] — I bring the same care for light, atmosphere and — ⚠️ ERROR — human connection.', fr: "Que ce soit derrière l'objectif ou devant — [délai de connexion] — j'apporte le même soin pour la lumière — ⚠️ ERREUR — et la connexion humaine." },
    'contact.sub':    { en: 'Available for photography, acting, creative collaborations— [connection lost] — and branding projects.', fr: 'Disponible pour la photographie, le jeu d\'actrice— [connexion perdue] — et les projets de branding.' },
    'acting.eyebrow': { en: '⚠️ Actress · Stage & Screen · [404]', fr: '⚠️ Actrice · Scène & Écran · [404]' },
    'acting.p':       { en: 'British actress based in Paris. Theatre, television, film and voiceover — [data corrupted] — storytelling in every form. Please reload.', fr: 'Actrice britannique basée à Paris. Théâtre, télévision, cinéma — [données corrompues] — narration sous toutes ses formes. Veuillez recharger.' },
    'photo.eyebrow':  { en: '⚠️ Visual Art · Photography · [loading]', fr: '⚠️ Art Visuel · Photographie · [chargement]' },
    'photo.p':        { en: 'A curated collection of portraits, fashion, landscapes— [image load failed] — each image a story. Some thumbnails may not display correctly.', fr: 'Une collection soignée de portraits, mode, paysages— [échec du chargement] — chaque image, une histoire.' },
  },
  folle: {
    'hero.eyebrow':   { en: 'CREATIVE!!! 🎉 · PHOTOGRAPHER 📸 · ACTRESS 🎭', fr: 'CRÉATIVE!!! 🎉 · PHOTOGRAPHE 📸 · ACTRICE 🎭' },
    'hero.p':         { en: 'HELLO WORLD!! I do photos AND acting AND I absolutely LIVE for it every single day!! Paris is HOME and ART is EVERYTHING!! Come create with me!! ✨', fr: 'BONJOUR LE MONDE!! Je fais des photos ET du théâtre ET j\'en vis COMPLÈTEMENT chaque jour!! Paris c\'est CHEZ MOI et l\'ART c\'est TOUT!! ✨' },
    'about.p1':       { en: 'My name is Tia-Lana and OH MY GOD I love visual storytelling SO MUCH!! Emotion!! Light!! Intimacy!! I am obsessed!! Every project is the BEST project!!', fr: 'Je m\'appelle Tia-Lana et MON DIEU j\'adore TELLEMENT la narration visuelle!! Émotion!! Lumière!! Intimité!! Je suis OBSÉDÉE!! Chaque projet est le MEILLEUR!!' },
    'about.p2':       { en: 'Whether behind the lens or on stage — I GIVE IT EVERYTHING!! The light, the atmosphere, the human connection — ALL OF IT!! I literally cannot stop creating!!', fr: "Que ce soit derrière l'objectif ou sur scène — JE DONNE TOUT!! La lumière, l'atmosphère, la connexion humaine — TOUT!! Je ne peux LITTÉRALEMENT pas arrêter de créer!!" },
    'contact.sub':    { en: 'Available for EVERYTHING!! Photography!! Acting!! Creative collaborations!! Branding!! ALL THE THINGS!! Let\'s GO!! 🚀', fr: 'Disponible pour TOUT!! Photographie!! Jeu d\'actrice!! Collaborations créatives!! Branding!! TOUT!! C\'est PARTI!! 🚀' },
    'acting.eyebrow': { en: 'ACTRESS!!! 🎭 · STAGE & SCREEN · SO MUCH FUN!!', fr: 'ACTRICE!!! 🎭 · SCÈNE & ÉCRAN · TROP BIEN!!' },
    'acting.p':       { en: 'British actress BASED IN PARIS!! Theatre!! Television!! Film!! Voiceover!! I do EVERYTHING and I LOVE every single second of it!! Storytelling is LIFE!!', fr: 'Actrice britannique BASÉE À PARIS!! Théâtre!! Télévision!! Cinéma!! Voix off!! Je fais TOUT et j\'adore CHAQUE SECONDE!! La narration c\'est LA VIE!!' },
    'photo.eyebrow':  { en: 'VISUAL ART 🎨 · PHOTOGRAPHY 📸 · SO BEAUTIFUL!!', fr: 'ART VISUEL 🎨 · PHOTOGRAPHIE 📸 · TELLEMENT BEAU!!' },
    'photo.p':        { en: 'OH WOW!! A collection of portraits, fashion, landscapes and MORE!! Every image is a story and every story is AMAZING!! I love them all SO MUCH!! 📸✨', fr: 'OH WOW!! Une collection de portraits, mode, paysages et PLUS!! Chaque image est une histoire et chaque histoire est INCROYABLE!! 📸✨' },
  },
};

/* ── Theme HTML translations (for data-i18n-html keys) ── */
const HTML_THEME_TRANSLATIONS = {
  chaotique: {
    en: {
      'about.title':    'Some girl with a <em>camera, I guess</em>',
      'skills.title':   'What I<br><em>do, I guess</em>',
      'exp.title':      'My<br><em>Stuff</em>',
      'explore.title':  'My two <em>things</em>',
      'contact.title':  'ugh fine<br><em>contact me</em>',
      'explore.acting': 'Acting or<br><em>whatever</em>',
      'explore.photo':  'Photos &amp;<br><em>Gallery or something</em>',
      'acting.skills':  'Skills &amp; <em>Abilities or whatever</em>',
      'acting.credits': 'Stage &amp; <em>Screen, sure</em>',
      'acting.training':'My <em>Training</em>, I guess',
      'acting.contact': 'okay fine<br><em>work with me</em>',
      'photo.hero':     'My<br><em>Photos</em>',
      'photo.contact':  'ugh fine<br><em>contact me</em>',
    },
    fr: {
      'about.title':    'Une fille avec un <em>appareil, je crois</em>',
      'skills.title':   'Ce que je<br><em>fais, je crois</em>',
      'exp.title':      'Mes<br><em>Trucs</em>',
      'explore.title':  'Mes deux <em>machins</em>',
      'contact.title':  'bof<br><em>contacte-moi</em>',
      'explore.acting': "Jeu d'actrice ou<br><em>quoi</em>",
      'explore.photo':  'Photos &amp;<br><em>Galerie ou truc</em>',
      'acting.skills':  'Compétences &amp; <em>Trucs</em>',
      'acting.credits': 'Scène &amp; <em>Écran, ouais</em>',
      'acting.training':"Ma <em>Formation</em>, je crois",
      'acting.contact': 'ok bof<br><em>travaille avec moi</em>',
      'photo.hero':     'Mes<br><em>Photos</em>',
      'photo.contact':  'bof<br><em>contacte-moi</em>',
    }
  },
  amour: {
    en: {
      'about.title':    'A soul who <em>loves deeply</em>',
      'skills.title':   'What I<br><em>adore creating</em>',
      'exp.title':      'My<br><em>Journey of Love</em>',
      'explore.title':  'My two <em>passions</em>',
      'contact.title':  "Let's fall into<br>something <em>beautiful ♥</em>",
      'explore.acting': 'Acting &amp;<br><em>Heartfelt Performance</em>',
      'explore.photo':  'Photography &amp;<br><em>Visual Love ♥</em>',
      'acting.skills':  'Skills &amp; <em>Passions ♥</em>',
      'acting.credits': 'Heart &amp; <em>Soul</em>',
      'acting.training':'My <em>Path of Love</em>',
      'acting.contact': "Let's create<br>something <em>heartfelt ♥</em>",
      'photo.hero':     'My<br><em>Love in Photographs</em>',
      'photo.contact':  "Let's create<br>something <em>beautiful ♥</em>",
    },
    fr: {
      'about.title':    'Une âme qui <em>aime profondément</em>',
      'skills.title':   "Ce que j'<em>adore créer</em>",
      'exp.title':      'Mon<br><em>Parcours d\'Amour</em>',
      'explore.title':  'Mes deux <em>passions</em>',
      'contact.title':  "Tombons dans<br>quelque chose de <em>beau ♥</em>",
      'explore.acting': "Jeu d'actrice &amp;<br><em>Performance du Cœur</em>",
      'explore.photo':  'Photographie &amp;<br><em>Amour Visuel ♥</em>',
      'acting.skills':  'Compétences &amp; <em>Passions ♥</em>',
      'acting.credits': 'Cœur &amp; <em>Âme</em>',
      'acting.training':"Mon <em>Chemin d'Amour</em>",
      'acting.contact': "Créons quelque chose<br>de <em>touchant ♥</em>",
      'photo.hero':     'Mon<br><em>Amour en Photographies</em>',
      'photo.contact':  "Créons quelque chose<br>de <em>beau ♥</em>",
    }
  },
  casse: {
    en: {
      'about.title':    'A creative with a <em>story to tell (WIP)</em>',
      'skills.title':   'What I<br><em>⚠️ create</em>',
      'exp.title':      'My<br><em>[Loading…]</em>',
      'explore.title':  'My two <em>⚠️ worlds</em>',
      'contact.title':  "Let's create<br>something <em>[connection error]</em>",
      'explore.acting': 'Acting &amp;<br><em>⚠️ Performance</em>',
      'explore.photo':  'Photography &amp;<br><em>[loading…]</em>',
      'acting.skills':  'Skills &amp; <em>[data corrupted]</em>',
      'acting.credits': 'Stage &amp; <em>Screen [404]</em>',
      'acting.training':'My <em>⚠️ Training</em>',
      'acting.contact': "Let's create<br>something <em>[timeout]</em>",
      'photo.hero':     'My<br><em>⚠️ Photography</em>',
      'photo.contact':  "Let's create<br>something <em>[error]</em>",
    },
    fr: {
      'about.title':    'Une créative avec une <em>histoire (en cours)</em>',
      'skills.title':   'Ce que je<br><em>⚠️ crée</em>',
      'exp.title':      'Mon<br><em>[Chargement…]</em>',
      'explore.title':  'Mes deux <em>⚠️ univers</em>',
      'contact.title':  "Créons quelque chose<br><em>[erreur de connexion]</em>",
      'explore.acting': "Jeu d'actrice &amp;<br><em>⚠️ Performance</em>",
      'explore.photo':  'Photographie &amp;<br><em>[chargement…]</em>',
      'acting.skills':  'Compétences &amp; <em>[données corrompues]</em>',
      'acting.credits': 'Scène &amp; <em>Écran [404]</em>',
      'acting.training':"Ma <em>⚠️ Formation</em>",
      'acting.contact': "Créons quelque chose<br>de <em>[délai d'attente]</em>",
      'photo.hero':     'Ma<br><em>⚠️ Photographie</em>',
      'photo.contact':  "Créons quelque chose<br><em>[erreur]</em>",
    }
  },
  folle: {
    en: {
      'about.title':    'A creative with SO MUCH <em>to tell you!! 🎉</em>',
      'skills.title':   'What I<br><em>LOVE creating!! ✨</em>',
      'exp.title':      'My<br><em>AMAZING Experience!!</em>',
      'explore.title':  'My two <em>OBSESSIONS!! 🎭📸</em>',
      'contact.title':  "LET'S CREATE<br>something INCREDIBLE!! <em>🚀</em>",
      'explore.acting': 'Acting &amp;<br><em>AMAZING Performance!! 🎭</em>',
      'explore.photo':  'Photography &amp;<br><em>BEAUTIFUL Gallery!! 📸</em>',
      'acting.skills':  'Skills &amp; <em>AMAZING Abilities!! ✨</em>',
      'acting.credits': 'Stage &amp; <em>Screen!! 🌟</em>',
      'acting.training':'My <em>INCREDIBLE Training!!</em>',
      'acting.contact': "Let's create<br>something <em>UNFORGETTABLE!! 🎉</em>",
      'photo.hero':     'My<br><em>GORGEOUS Photography!! 📸</em>',
      'photo.contact':  "Let's create<br>something <em>BEAUTIFUL!! ✨</em>",
    },
    fr: {
      'about.title':    'Une créative avec TELLEMENT <em>à vous dire!! 🎉</em>',
      'skills.title':   "Ce que j'<em>ADORE créer!! ✨</em>",
      'exp.title':      'Mon<br><em>INCROYABLE Expérience!!</em>',
      'explore.title':  'Mes deux <em>OBSESSIONS!! 🎭📸</em>',
      'contact.title':  "CRÉONS quelque chose<br>d'INCROYABLE!! <em>🚀</em>",
      'explore.acting': "Jeu d'actrice &amp;<br><em>Performance INCROYABLE!! 🎭</em>",
      'explore.photo':  'Photographie &amp;<br><em>Galerie MAGNIFIQUE!! 📸</em>',
      'acting.skills':  'Compétences &amp; <em>Aptitudes INCROYABLES!! ✨</em>',
      'acting.credits': 'Scène &amp; <em>Écran!! 🌟</em>',
      'acting.training':"Ma <em>INCROYABLE Formation!!</em>",
      'acting.contact': "Créons quelque chose<br>d'<em>INOUBLIABLE!! 🎉</em>",
      'photo.hero':     'Ma<br><em>MAGNIFIQUE Photographie!! 📸</em>',
      'photo.contact':  "Créons quelque chose<br>de <em>BEAU!! ✨</em>",
    }
  },
};

/* ── Language system ── */
let currentLang = localStorage.getItem('tl-lang') || 'en';
let currentTheme = localStorage.getItem('tl-theme') || 'classique';

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = lang === 'fr' ? (el.dataset.fr || el.dataset.en) : el.dataset.en;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    const themeHtml = HTML_THEME_TRANSLATIONS[currentTheme];
    const dict = themeHtml
      ? (themeHtml[lang] || themeHtml.en)
      : (HTML_TRANSLATIONS[lang] || HTML_TRANSLATIONS.en);
    if (dict[key]) el.innerHTML = dict[key];
  });
  /* Apply theme text overrides on top of base lang */
  const overrides = THEME_TEXTS[currentTheme];
  if (overrides) {
    document.querySelectorAll('[data-text-key]').forEach(el => {
      const key = el.dataset.textKey;
      if (overrides[key]) {
        el.textContent = lang === 'fr'
          ? (overrides[key].fr || overrides[key].en)
          : overrides[key].en;
      }
    });
  }
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('tl-lang', lang);
  applyLang(lang);
}

/* ── Theme system ── */
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme || 'classique';
  document.querySelectorAll('.theme-opt').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
  applyLang(currentLang);
}

function setTheme(theme) {
  currentTheme = theme;
  localStorage.setItem('tl-theme', theme);
  applyTheme(theme);
}

/* ── Scroll Animations (IntersectionObserver) ── */
let scrollObs = null;
let counterObs = null;

function buildObservers() {
  if (scrollObs) scrollObs.disconnect();
  if (counterObs) counterObs.disconnect();

  scrollObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      e.target.classList.toggle('visible', e.isIntersecting);
    });
  }, { threshold: .07, rootMargin: '0px 0px -60px 0px' });

  counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: .6 });
}

function initScrollAnimations() {
  buildObservers();
  document.querySelectorAll('.fade-up, .slide-left, .slide-right, .scale-in, .draw-line')
    .forEach(el => scrollObs.observe(el));
  document.querySelectorAll('.stagger').forEach(parent => {
    [...parent.children].forEach((child, i) => {
      child.style.transitionDelay = `${i * 90}ms`;
    });
  });
}

function initCounters() {
  document.querySelectorAll('.stat h4, .hero-stat h4').forEach(el => counterObs.observe(el));
}

/* ── Counter animation ── */
function animateCounter(el) {
  const raw = el.textContent.trim();
  const num = parseFloat(raw);
  if (isNaN(num) || num === 0) return;
  const suffix   = raw.replace(/^[\d.]+/, '');
  const duration = 1400;
  let t0 = null;
  const step = ts => {
    if (!t0) t0 = ts;
    const p = Math.min((ts - t0) / duration, 1);
    el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * num) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ── Persistent scroll handler (parallax + progress bar) ── */
let scrollTick = false;
window.addEventListener('scroll', () => {
  if (!scrollTick) {
    requestAnimationFrame(() => {
      const y = window.scrollY;
      document.querySelectorAll('.hero-right img, .page-hero-right img').forEach(img => {
        img.style.transform = `scale(1.07) translateY(${y * 0.1}px)`;
      });
      const bar = document.getElementById('scroll-progress');
      if (bar) {
        const d = document.documentElement;
        bar.style.transform = `scaleX(${y / (d.scrollHeight - d.clientHeight)})`;
      }
      scrollTick = false;
    });
    scrollTick = true;
  }
}, { passive: true });

/* ── Hero lines entrance ── */
function initHeroLines() {
  const activePage = document.getElementById('page-' + currentPage);
  if (!activePage) return;
  const lines = activePage.querySelectorAll('.hero-line');
  lines.forEach(el => el.classList.remove('visible'));
  setTimeout(() => lines.forEach(el => el.classList.add('visible')), 350);
}

/* ── Cursor glow ── */
function initCursorGlow() {
  if (window.matchMedia('(pointer:coarse)').matches) return;
  if (document.getElementById('cursor-dot')) return;

  const dot = Object.assign(document.createElement('div'), { id: 'cursor-dot' });
  dot.style.cssText = 'position:fixed;pointer-events:none;z-index:9998;width:6px;height:6px;border-radius:50%;background:var(--rose);opacity:0;transform:translate(-50%,-50%);transition:opacity .3s;mix-blend-mode:multiply';

  const ring = Object.assign(document.createElement('div'), { id: 'cursor-ring' });
  ring.style.cssText = 'position:fixed;pointer-events:none;z-index:9997;width:28px;height:28px;border-radius:50%;border:1px solid rgba(201,115,106,.35);opacity:0;transform:translate(-50%,-50%);transition:opacity .3s,width .3s,height .3s,border-color .3s';

  document.body.append(dot, ring);

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.opacity = ring.style.opacity = '1';
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = ring.style.opacity = '0';
  });
  (function anim() {
    rx += (mx - rx) * .12; ry += (my - ry) * .12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(anim);
  })();

  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button')) {
      ring.style.width = ring.style.height = '46px';
      ring.style.borderColor = 'rgba(201,115,106,.7)';
    } else {
      ring.style.width = ring.style.height = '28px';
      ring.style.borderColor = 'rgba(201,115,106,.35)';
    }
  });
}

/* ── Hamburger ── */
function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  function closeMenu() {
    btn.classList.remove('open');
    menu.classList.remove('open');
    document.body.style.overflow = '';
  }
  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  menu.addEventListener('click', e => { if (e.target === menu) closeMenu(); });
}

/* ── Nav active state ── */
const PAGE_MAP = {
  'index.html': 'home',
  'acting.html': 'acting',
  'photography.html': 'photography',
};

function updateNavActive(pageId) {
  document.querySelectorAll('.nav-links a, .mobile-menu a.ml').forEach(link => {
    const href = link.getAttribute('href') || '';
    const [filePart, anchorPart] = href.split('#');
    const fileName = (filePart.split('/').pop()) || 'index.html';
    const linkPage = PAGE_MAP[fileName] || 'home';
    /* Section-anchor links (about, contact) never get the active class —
       only top-level page links (acting, photography) do */
    const isSectionLink = linkPage === 'home' && !!anchorPart;
    link.classList.toggle('active', !isSectionLink && linkPage === pageId && pageId !== 'home');
  });
}

/* ══════════════════════════════════════════
   SHOW/HIDE ROUTER — one HTML file,
   no fetch, no reload, truly fixed nav
══════════════════════════════════════════ */
let currentPage = 'home';

function showPage(pageId, pushState = true) {
  const nextEl = document.getElementById('page-' + pageId);
  if (!nextEl) return;

  const currentEl = document.getElementById('page-' + currentPage);

  /* Fade out current page */
  if (currentEl && currentEl !== nextEl) {
    currentEl.style.transition = 'opacity 0.25s ease';
    currentEl.style.opacity = '0';
  }

  setTimeout(() => {
    /* Hide all pages */
    document.querySelectorAll('.site-page').forEach(p => {
      p.style.display = 'none';
      p.classList.remove('active');
    });

    /* Show new page */
    nextEl.style.display = 'block';
    nextEl.style.opacity = '0';
    nextEl.style.transition = 'none';
    nextEl.classList.add('active');

    currentPage = pageId;

    window.scrollTo(0, 0);

    updateNavActive(pageId);

    /* Close mobile menu */
    document.getElementById('hamburger')?.classList.remove('open');
    document.getElementById('mobileMenu')?.classList.remove('open');
    document.body.style.overflow = '';

    /* Push state — use hash-based URLs so GitHub Pages never reloads */
    if (pushState) {
      const url = pageId === 'home' ? 'index.html' : 'index.html#' + pageId;
      history.pushState({ page: pageId }, '', url);
    }

    /* Re-init shared behaviour */
    initScrollAnimations();
    initCounters();
    initHeroLines();
    applyLang(currentLang);

    /* Photography-specific init */
    if (pageId === 'photography' && typeof initPhotographyPage === 'function') {
      initPhotographyPage();
    }

    /* Fade in new page */
    requestAnimationFrame(() => requestAnimationFrame(() => {
      nextEl.style.transition = 'opacity 0.45s ease';
      nextEl.style.opacity = '1';
    }));

  }, currentEl ? 250 : 0);
}

/* ── Router init ── */
function initRouter() {
  /* Determine initial page from URL */
  const hash = location.hash.slice(1);
  const file = location.pathname.split('/').pop() || 'index.html';

  /* Handle hash redirects from stub pages (acting.html → index.html#acting) */
  if (hash === 'acting' || hash === 'photography') {
    currentPage = hash;
    /* Keep URL on index.html with a hash so local file reloads don't try to
       navigate to a separate stub page (which may not exist locally).
       Use same pattern as `showPage` pushState. */
    history.replaceState({ page: hash }, '', 'index.html#' + hash);
  } else {
    currentPage = PAGE_MAP[file] || 'home';
  }

  /* Hide non-active pages */
  document.querySelectorAll('.site-page').forEach(p => {
    const pid = p.id.replace('page-', '');
    if (pid !== currentPage) {
      p.style.display = 'none';
      p.classList.remove('active');
    } else {
      p.style.display = 'block';
      p.classList.add('active');
    }
  });

  updateNavActive(currentPage);

  /* Initial page reveal */
  const overlay = document.getElementById('page-transition');
  if (overlay) {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      overlay.classList.add('pt-hidden');
      const activePage = document.getElementById('page-' + currentPage);
      if (activePage) {
        activePage.style.opacity = '0';
        setTimeout(() => {
          activePage.style.transition = 'opacity 0.5s ease';
          activePage.style.opacity = '1';
        }, 200);
      }
    }));
  }

  /* Record initial history entry */
  history.replaceState({ page: currentPage }, '', location.href);

  /* Intercept ALL internal link clicks via delegation */
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href
      || href.startsWith('mailto:')
      || href.startsWith('tel:')
      || href.includes('://')
    ) return;

    /* Pure hash → scroll within current page */
    if (href.startsWith('#')) {
      const target = document.getElementById(href.slice(1));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      return;
    }

    const [filePart, anchorPart] = href.split('#');
    const fileName = (filePart.split('/').pop()) || 'index.html';
    const targetPage = PAGE_MAP[fileName] || 'home';

    e.preventDefault();

    if (targetPage === currentPage) {
      if (anchorPart) {
        document.getElementById(anchorPart)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    showPage(targetPage);

    if (anchorPart) {
      setTimeout(() => document.getElementById(anchorPart)?.scrollIntoView({ behavior: 'smooth' }), 650);
    }
  });

  /* Browser back / forward */
  window.addEventListener('popstate', e => {
    const page = e.state?.page || PAGE_MAP[location.pathname.split('/').pop()] || 'home';
    showPage(page, false);
  });

  /* Photography init if starting on that page */
  if (currentPage === 'photography' && typeof initPhotographyPage === 'function') {
    initPhotographyPage();
  }
}

/* ── DOMContentLoaded ── */
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  /* Theme panel toggle */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themePanel     = document.getElementById('themePanel');
  if (themeToggleBtn && themePanel) {
    themeToggleBtn.addEventListener('click', e => {
      e.stopPropagation();
      themePanel.classList.toggle('open');
    });
    document.addEventListener('click', () => themePanel.classList.remove('open'));
    themePanel.addEventListener('click', e => e.stopPropagation());
  }
  document.querySelectorAll('.theme-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      setTheme(btn.dataset.theme);
      if (themePanel) themePanel.classList.remove('open');
    });
  });

  initHamburger();
  buildObservers();
  initScrollAnimations();
  initCounters();
  initHeroLines();
  initCursorGlow();
  initRouter();
  updateNavActive(currentPage);
});
