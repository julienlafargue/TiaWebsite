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

/* ── Mood texts (for theme=humeur sub-system) ── */
const MOOD_TEXTS = {
  legere: {
    'hero.eyebrow':   { en: 'Sunshine · Creating · Smiling ☀️', fr: 'Soleil · Créer · Sourire ☀️' },
    'hero.p':         { en: 'Today everything feels light. Creating with joy, shooting with a smile, living fully.', fr: "Aujourd'hui tout est léger. Créer avec joie, photographier en souriant, vivre pleinement." },
    'about.p1':       { en: "My name is Tia-Lana and right now I feel like the world is bright. I create because it makes me happy — and I hope it makes you happy too.", fr: "Je m'appelle Tia-Lana et en ce moment le monde me semble lumineux. Je crée parce que ça me rend heureuse — et j'espère que ça vous rend heureux aussi." },
    'about.p2':       { en: 'Light, atmosphere, connection — today everything flows. Come create something joyful with me.', fr: "Lumière, atmosphère, connexion — aujourd'hui tout coule. Venez créer quelque chose de joyeux avec moi." },
    'contact.sub':    { en: 'In a good mood and ready to create something bright and beautiful together.', fr: 'De bonne humeur et prête à créer quelque chose de lumineux et beau ensemble.' },
    'acting.eyebrow': { en: 'Actress · Full of Light ☀️', fr: 'Actrice · Pleine de Lumière ☀️' },
    'acting.p':       { en: 'British actress in Paris, today filled with light and ready to bring joy to every role and every frame.', fr: "Actrice britannique à Paris, aujourd'hui pleine de lumière et prête à apporter de la joie à chaque rôle et chaque plan." },
    'photo.eyebrow':  { en: 'Visual Joy · Photography ☀️', fr: 'Joie Visuelle · Photographie ☀️' },
    'photo.p':        { en: 'A collection made with light in my eyes — every portrait a smile, every landscape a breath of fresh air.', fr: "Une collection faite avec de la lumière dans les yeux — chaque portrait un sourire, chaque paysage un souffle d'air frais." },
  },
  melancolique: {
    'hero.eyebrow':   { en: 'Quietly · Dreaming · Feeling 🌙', fr: 'Doucement · Rêvant · Ressentant 🌙' },
    'hero.p':         { en: 'Some days the light is softer. The shadows have stories too. And sometimes, the most honest art comes from stillness.', fr: "Certains jours la lumière est plus douce. Les ombres aussi racontent des histoires. Et parfois, l'art le plus honnête vient du silence." },
    'about.p1':       { en: "My name is Tia-Lana and I'm in a quieter place today. Visual storytelling feels more intimate from here — closer, truer.", fr: "Je m'appelle Tia-Lana et je suis dans un endroit plus tranquille aujourd'hui. La narration visuelle semble plus intime d'ici — plus proche, plus vraie." },
    'about.p2':       { en: 'In quieter moments, I find the images that matter most. The light is gentler. The connection, deeper.', fr: "Dans les moments plus tranquilles, je trouve les images qui comptent le plus. La lumière est plus douce. La connexion, plus profonde." },
    'contact.sub':    { en: 'Available for intimate, introspective and thoughtful creative projects.', fr: 'Disponible pour des projets créatifs intimes, introspectifs et réfléchis.' },
    'acting.eyebrow': { en: 'Actress · Quietly Present 🌙', fr: 'Actrice · Doucement Présente 🌙' },
    'acting.p':       { en: 'British actress in Paris, in a pensive and present place. The quieter roles feel most true today.', fr: "Actrice britannique à Paris, dans un état pensif et présent. Les rôles plus silencieux semblent les plus vrais aujourd'hui." },
    'photo.eyebrow':  { en: 'Quiet Light · Photography 🌙', fr: 'Lumière Douce · Photographie 🌙' },
    'photo.p':        { en: 'A collection seen through quieter eyes — where every shadow is as important as every light.', fr: "Une collection vue avec des yeux plus tranquilles — où chaque ombre est aussi importante que chaque lumière." },
  },
  intense: {
    'hero.eyebrow':   { en: 'Fire · Passion · Alive 🔥', fr: 'Feu · Passion · Vivante 🔥' },
    'hero.p':         { en: 'Burning with something to say. Every frame, every role — with everything I have. No half measures.', fr: "Brûlant de quelque chose à dire. Chaque cliché, chaque rôle — avec tout ce que j'ai. Pas de demi-mesures." },
    'about.p1':       { en: 'My name is Tia-Lana and right now I am on fire. The kind of creative energy that demands to be expressed — in every image, every performance.', fr: "Je m'appelle Tia-Lana et en ce moment je suis en feu. Le genre d'énergie créative qui exige d'être exprimée — dans chaque image, chaque performance." },
    'about.p2':       { en: "When I feel this intensely, the work becomes something else entirely. Raw, real, powerful. Come find out what that looks like.", fr: "Quand je ressens avec cette intensité, le travail devient quelque chose d'autre. Brut, réel, puissant. Venez voir à quoi ça ressemble." },
    'contact.sub':    { en: 'Ready for bold, powerful, unforgettable projects. Let\'s make something that burns.', fr: "Prête pour des projets audacieux, puissants, inoubliables. Créons quelque chose qui brûle." },
    'acting.eyebrow': { en: 'Actress · On Fire 🔥', fr: 'Actrice · En Feu 🔥' },
    'acting.p':       { en: 'British actress in Paris, burning at full intensity. Every role taken on with raw, unfiltered energy.', fr: "Actrice britannique à Paris, brûlant à pleine intensité. Chaque rôle abordé avec une énergie brute et sans filtre." },
    'photo.eyebrow':  { en: 'Raw Power · Photography 🔥', fr: 'Puissance Brute · Photographie 🔥' },
    'photo.p':        { en: 'A collection made in the heat of the moment — dramatic, visceral, unafraid of shadow or contrast.', fr: "Une collection faite dans le feu de l'action — dramatique, viscérale, sans peur de l'ombre ou du contraste." },
  },
  douce: {
    'hero.eyebrow':   { en: 'Gently · Tenderly · Softly 🌸', fr: 'Doucement · Tendrement · Délicatement 🌸' },
    'hero.p':         { en: 'In a soft and tender moment, where every image is a gentle breath of air and every word is chosen with care.', fr: "Dans un moment doux et tendre, où chaque image est un souffle léger et chaque mot est choisi avec soin." },
    'about.p1':       { en: "My name is Tia-Lana and today I feel tender. There's a softness to the way I see the world right now — in the light, in people's faces, in the spaces between words.", fr: "Je m'appelle Tia-Lana et aujourd'hui je me sens tendre. Il y a une douceur dans ma façon de voir le monde en ce moment — dans la lumière, dans les visages, dans les espaces entre les mots." },
    'about.p2':       { en: 'Some of my most beautiful work comes from these soft, unhurried moments. A quiet light. A gentle gaze. A tender connection.', fr: "Certains de mes plus beaux travaux viennent de ces moments doux et sans hâte. Une lumière tranquille. Un regard doux. Une connexion tendre." },
    'contact.sub':    { en: 'Available for soft, heartfelt and delicate creative projects. Let\'s create something gentle together.', fr: "Disponible pour des projets créatifs doux, sincères et délicats. Créons quelque chose de tendre ensemble." },
    'acting.eyebrow': { en: 'Actress · Tenderly Present 🌸', fr: 'Actrice · Tendrement Présente 🌸' },
    'acting.p':       { en: 'British actress in Paris, in a tender and gentle state. Drawn today to roles that ask for softness and care.', fr: "Actrice britannique à Paris, dans un état tendre et doux. Attirée aujourd'hui par les rôles qui demandent de la douceur et du soin." },
    'photo.eyebrow':  { en: 'Soft Light · Photography 🌸', fr: 'Lumière Douce · Photographie 🌸' },
    'photo.p':        { en: 'A collection made with a gentle hand — where softness is strength and tenderness is the whole point.', fr: "Une collection faite avec une main douce — où la douceur est une force et la tendresse est l'essentiel." },
  },
  electrique: {
    'hero.eyebrow':   { en: 'Energy · Power · Now ⚡', fr: 'Énergie · Puissance · Maintenant ⚡' },
    'hero.p':         { en: 'Charged and ready. Something electric is building and it\'s time to create. Everything feels possible right now.', fr: "Chargée et prête. Quelque chose d'électrique se prépare et il est temps de créer. Tout semble possible en ce moment." },
    'about.p1':       { en: "My name is Tia-Lana and I'm buzzing with creative energy. The kind where ideas come faster than I can capture them and every project feels electric.", fr: "Je m'appelle Tia-Lana et je déborde d'énergie créative. Le genre où les idées viennent plus vite que je ne peux les capturer et chaque projet semble électrique." },
    'about.p2':       { en: 'In this state, I bring a current to every project — sharp, fast, charged. The work crackles with it.', fr: "Dans cet état, j'apporte un courant à chaque projet — vif, rapide, chargé. Le travail en est traversé." },
    'contact.sub':    { en: 'Ready to spark something bold and electric. Let\'s create before the energy fades.', fr: "Prête à faire jaillir quelque chose d'audacieux et d'électrique. Créons avant que l'énergie disparaisse." },
    'acting.eyebrow': { en: 'Actress · Fully Charged ⚡', fr: 'Actrice · Pleinement Chargée ⚡' },
    'acting.p':       { en: 'British actress in Paris, fully charged and crackling. High-energy roles feel like home today.', fr: "Actrice britannique à Paris, pleinement chargée et crépitante. Les rôles à haute énergie semblent naturels aujourd'hui." },
    'photo.eyebrow':  { en: 'Electric Vision · Photography ⚡', fr: 'Vision Électrique · Photographie ⚡' },
    'photo.p':        { en: 'A collection shot with electric intensity — sharp contrasts, charged moments, and images that crackle.', fr: "Une collection prise avec une intensité électrique — contrastes tranchants, moments chargés, et des images qui crépitent." },
  },
};

/* ── Language system ── */
let currentLang  = localStorage.getItem('tl-lang')  || 'en';
let currentTheme = localStorage.getItem('tl-theme') || 'classique';
let currentMood  = localStorage.getItem('tl-mood')  || 'legere';

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
  const overrides = currentTheme === 'humeur'
    ? MOOD_TEXTS[currentMood]
    : THEME_TEXTS[currentTheme];
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
  const moodBar = document.getElementById('moodBar');
  if (moodBar) moodBar.classList.toggle('visible', theme === 'humeur');
  applyLang(currentLang);
}

function setTheme(theme) {
  currentTheme = theme;
  localStorage.setItem('tl-theme', theme);
  applyTheme(theme);
}

/* ── Mood system (sub-system of theme=humeur) ── */
function applyMood(mood) {
  currentMood = mood;
  document.documentElement.dataset.mood = mood || 'legere';
  document.querySelectorAll('.mood-opt').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mood === mood);
  });
  applyLang(currentLang);
}

function setMood(mood) {
  currentMood = mood;
  localStorage.setItem('tl-mood', mood);
  applyMood(mood);
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

  /* Mood bar init */
  applyMood(currentMood);
  document.querySelectorAll('.mood-opt').forEach(btn => {
    btn.addEventListener('click', () => setMood(btn.dataset.mood));
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
