/* PLUMBING_V 4 — Bespoke Studio · meccanica invisibile canonica.
   ────────────────────────────────────────────────────────────────
   CONFINE (inviolabile): questo file contiene SOLO plumbing — la meccanica
   che il visitatore non percepisce come design. NIENTE markup di sezioni,
   NIENTE stile, NIENTE struttura: concept, griglia, tipografia, hero e
   animazioni-firma si progettano DA ZERO per ogni cliente (GATE #3).
   Se qui dentro scivola del layout, questo diventa il nuovo scheletro
   condiviso — cioè il difetto "copia-incolla" che il metodo combatte.

   Come si usa: si COPIA nella cartella js/ del sito e si adatta la sola
   costante SITE. Le animazioni-firma del sito si scrivono nel proprio
   main.js DOPO questo file (o in coda a questo file, sotto il marcatore).
   Ogni bug nuovo si corregge QUI (bump PLUMBING_V + changelog nel README)
   e poi nel sito: mai il contrario.

   Fix già incorporati (non rimuovere):
   - ScrollTrigger registrato SUBITO allo script load, MAI dentro l'intro
     o un setTimeout (bug APF #5 del 16/7: race col watchdog → sezioni
     che sparivano allo scroll).
   - Reveal con once:true (niente re-animazioni da zero ri-scorrendo).
   - Watchdog 1,5s che forza visibile e UCCIDE i trigger non scattati.
   - Lightbox su [hidden] + override CSS !important (bug: display:flex
     batteva [hidden] e la lightbox restava visibile).
   - Foto-contenuto MAI lazy (regola workflow §8): il plumbing non tocca
     il loading, ma il lint lo verifica.
   - Orari Europe/Rome con finestre multiple e scavalco di mezzanotte
     (pattern Il Cavallante 18:00–00:30). */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO — l'unica parte da adattare ══════════ */
  var SITE = {
    slug: 'pasto-zecca-vecchia',
    /* nessun WhatsApp pubblicato: solo il telefono */
    whatsapp: { number: '', message: '', ids: [] },
    /* Google (30/9/2026) e bio Instagram: lunedì–sabato 12–15:30; domenica chiuso */
    hours: {
      0: [], 1: [['12:00', '15:30']], 2: [['12:00', '15:30']], 3: [['12:00', '15:30']],
      4: [['12:00', '15:30']], 5: [['12:00', '15:30']], 6: [['12:00', '15:30']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1800,
    revealSelector: '.reveal',
    inViewClass: 'in-view',
    breakpointMenu: 1060,
    EN: {
      "m.salta": "Skip to the content",
      "m.top": "Pasto: back to the top",
      "m.nav": "The sections",
      "m.lingua": "Language",
      "m.menu": "Open the menu",
      "m.ingrandisci": "Enlarge the photo",
      "m.lightbox": "Enlarged photo",
      "m.chiudi": "Close",
      "n.come": "How it works",
      "n.oggi": "Today",
      "n.posto": "The place",
      "n.dicono": "Reviews",
      "n.orari": "Hours and where",
      "n.domande": "Questions",
      "t.chiama": "Call",
      "t.indicazioni": "Directions",
      "h.sopra": "Fresh pasta workshop with kitchen · Via Zecca Vecchia 4, Milan",
      "h.titolo": "Fresh pasta in the heart of Milan, every day.",
      "h.testo": "For your lunch break with colleagues or friends: fresh pasta every day, ancient grains, excellent seasonal ingredients. Monday to Saturday, from 12 noon to 3:30 pm, in the Cinque Vie, between Via Torino and Cordusio.",
      "h.google": "on Google, 2,632 reviews",
      "p.titolo": "The forkful",
      "p.desc": "The word PAST, as on their shop window, and in place of the O a plate of pasta on the red table: the fork comes down, turns and winds up the strands, then the forkful rises and becomes the O of PASTO. Three dishes from their chalkboards: tagliatelle with tomato and basil, tagliatelle all'amatriciana, spaghetti with citrus pesto.",
      "p.d0": "Tagliatelle with tomato and basil.",
      "p.d1": "Tagliatelle all'amatriciana.",
      "p.d2": "Spaghetti with citrus pesto: orange, lemon, almonds, basil and capers.",
      "p.modi": "Which dish",
      "p.b0": "Tomato and basil",
      "p.b1": "Amatriciana",
      "p.b2": "Citrus pesto",
      "p.nota": "The O in their logo is a forkful of pasta. The three dishes come from their chalkboards.",
      "c.titolo": "One thing only, made every day",
      "c.1": "Lunch only",
      "c.1t": "Monday to Saturday, from 12 noon to 3:30 pm. Closed on Sunday.",
      "c.2": "A few pasta dishes, different every day",
      "c.2t": "The fresh pasta is made every day: flour, eggs and water, as they write on the sheet. Usually four pasta dishes, a starter and a dessert, and they change from one day to the next.",
      "c.3": "Inside, outside, to take away",
      "c.3t": "Tables inside and outdoors, and the pasta to take away too. The place is small: at lunchtime it is best to book, by phone.",
      "c.chi": "Matteo Filippo Balduzzi, in a review on Google (in Italian: «the goodness of simplicity»)",
      "o2.etichetta": "The sheet of the day",
      "o2.titolo": "Today we have made",
      "o2.sotto": "The menu changes every day: you will find it on the sheet at your table and on the chalkboard in the room. Here, five real days, copied from their chalkboards and their sheet. To know what is on today, give them a call.",
      "o2.testa": "Today we have made:",
      "o2.pasta": "Pasta — fresh every day",
      "o2.dolce": "Dessert",
      "o2.f0": "From their sheet of the day, in a customer's photo (2026).",
      "o2.testa2": "Today, with love, we have made:",
      "o2.pasta2": "Pasta",
      "o2.f1": "From the chalkboard in the room, in a customer's photo (2025).",
      "o2.f2": "From the «Oggi si mangia» (today we eat) chalkboard, on their Facebook page (2022).",
      "o2.altro": "Another day →",
      "o2.giorno": "Day",
      "o2.di": "of",
      "o2.nota": "The real sheet also lists the ingredients, in Italian and in English, with the allergens in capitals; the allergen list is at the till. No prices here: you will find them there.",
      "k2.etichetta": "From their chalkboards",
      "k2.titolo": "The pasta shapes that keep coming back",
      "k2.1": "cacio e pepe, alla gricia, alla burina",
      "k2.2": "with pesto, Trapani-style, with seasonal creams",
      "k2.3": "tomato and basil, all'amatriciana",
      "k2.4": "with tomato, with citrus pesto, alla Ferdinando II",
      "k2.5": "chickpea cream and sausage, chestnut cream and luganega",
      "k2.6": "with tuna, Taggiasca olives and capers",
      "g.etichetta": "The place",
      "g.titolo": "Under the burgundy sign",
      "g.testo": "The salmon-pink façade in Via Zecca Vecchia, the wooden shelves in the room, the chalkboard above the kitchen pass. And the dishes.",
      "a.vetrina": "Their shop window: «PAST» in thin white letters and the big ochre curl of the O.",
      "k.vetrina": "The window, January 2025: «See you tomorrow!»",
      "a.facciata": "The salmon-pink façade with the burgundy «PASTO» sign, the red door and the white umbrellas.",
      "k.facciata": "Via Zecca Vecchia 4.",
      "a.gigli": "A plate of gigli with pesto and burrata, on the red table.",
      "k.gigli": "Gigli with pesto and burrata.",
      "a.sala": "The wall of the room: the interlocking wooden shelves with the clock, zinc jugs, plants and wooden spoons.",
      "k.sala": "The shelves in the room.",
      "a.lavagna": "The chalkboard «Oggi con amore abbiamo preparato» (today, with love, we have made) above the kitchen pass.",
      "k.lavagna": "«Today, with love, we have made».",
      "a.gnocchetti": "A plate of gnocchetti with a cream and chopped mortadella, on the red table.",
      "k.gnocchetti": "Gnocchetti.",
      "a.tiramisu": "The tiramisù in a glass, with cocoa.",
      "k.tiramisu": "The tiramisù.",
      "a.oggi": "The «Oggi si mangia» chalkboard: paccheri cacio e pepe, tagliatelle with tomato and basil, paccheri alla gricia, gigli with Roman cauliflower cream, Taggiasca olives and chilli.",
      "k.oggi": "A chalkboard from 2022.",
      "a.tagliatelle": "Fresh tagliatelle in a bowl.",
      "k.tagliatelle": "Fresh tagliatelle.",
      "a.attrezzi": "The rolling pin, basil in a tin bucket and their card on a wooden shelf.",
      "k.attrezzi": "«One of the tools of our trade».",
      "a.cucchiai": "The numbered wooden spoons in a zinc jug, and their card with the logo.",
      "k.cucchiai": "The numbered wooden spoons.",
      "a.ripiena": "A plate of filled pasta with pepper.",
      "k.ripiena": "Filled pasta.",
      "g.nota": "The photos come from their Instagram and Facebook pages and from Google reviews by customers who gave five stars.",
      "d.etichetta": "Reviews",
      "d.titolo": "Simple, generous, handmade",
      "d.google": "on Google, 2,632 reviews",
      "d.g6m": "Google, 6 months ago",
      "d.g2a": "Google, 2 years ago",
      "d.g1a": "Google, a year ago",
      "d.nota": "From the reviews on Google, as they were written (in Italian); cuts are marked […]. The line at the top also comes from a review on Google.",
      "d.tutte": "All the reviews on Google",
      "o.etichetta": "Hours and where",
      "o.titolo": "Monday to Saturday, at lunchtime",
      "o.cap": "Opening hours",
      "g.lun": "Monday",
      "g.mar": "Tuesday",
      "g.mer": "Wednesday",
      "g.gio": "Thursday",
      "g.ven": "Friday",
      "g.sab": "Saturday",
      "g.dom": "Sunday",
      "o.chiuso": "Closed",
      "o.nota": "Hours from their Google listing and their Instagram page (September 2026). In summer and between Christmas and Epiphany they take a break: on those days it is best to call.",
      "o.mappa": "Map: Pasto, Via Zecca Vecchia 4, Milan",
      "o.dove": "Where",
      "o.dovev": "Via Zecca Vecchia 4, 20123 Milan: in the Cinque Vie, between Via Torino and Cordusio",
      "o.metro": "By metro",
      "o.metrov": "M1 Cordusio, about 350 metres away; M1 and M3 Duomo, about 360; M3 Missori, about 470",
      "o.tram": "By tram",
      "o.tramv": "the trams on Via Torino: Via Torino / Via Palla stop, about 150 metres away",
      "o.tel": "Phone",
      "o.social": "Social",
      "q.etichetta": "Questions",
      "q.titolo": "Before you come",
      "q.1": "Do I need to book?",
      "q.1r": "It is a good idea: the place is small and fills up at lunchtime, and more than one customer suggests booking. You book by phone, on 389 035 6309.",
      "q.2": "What is on today?",
      "q.2r": "The menu changes every day: you will find it on the sheet at your table and on the chalkboard in the room. To know in advance, give them a call.",
      "q.3": "Can I take it away?",
      "q.3r": "Yes, the pasta can be ordered to take away too: they say so themselves.",
      "q.4": "Are there vegan dishes? And allergens?",
      "q.4r": "Their Google listing says «offers vegan dishes». On the sheet of the day the ingredients are written in Italian and in English, with the allergens in capitals, and the allergen list is displayed at the till: if you have an allergy, tell them.",
      "q.5": "Are you open in the evening?",
      "q.5r": "No: Pasto is open for lunch only, Monday to Saturday from 12 noon to 3:30 pm. Closed on Sunday.",
      "f2.orario": "Monday–Saturday 12 noon–3:30 pm · closed on Sunday",
      "f2.cred": "Demo website made by <a href=\"https://bespokestud.io\" rel=\"noopener\">Bespoke Studio</a> · the photos come from their Instagram and Facebook pages and from Google reviews; hours and reviews from their Google listing (September 2026). We drew the forkful and the pasta shapes ourselves, from their logo and their chalkboards.",
      "f2.su": "Back to the top ↑"
    },
    LANGS: null,
    RTL: ['ar', 'he', 'fa', 'ur'],
    HOURS_I18N: null,
  };
  /* normalizzazione: EN storico -> LANGS */
  if (!SITE.LANGS) SITE.LANGS = SITE.EN && Object.keys(SITE.EN).length ? { en: SITE.EN } : {};
  var LANG_CODES = Object.keys(SITE.LANGS);   // senza 'it', che è il DOM
  /* ═════════════════════════════════════════════════════════════════ */

  /* ---------- WhatsApp wiring ---------- */
  if (SITE.whatsapp.number) {
    var waHref = 'https://wa.me/' + SITE.whatsapp.number + '?text=' +
      encodeURIComponent(SITE.whatsapp.message);
    SITE.whatsapp.ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.href = waHref; el.target = '_blank'; el.rel = 'noopener'; }
    });
  }

  /* ---------- GSAP: registrazione IMMEDIATA + reveal + watchdog ---------- */
  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll(SITE.revealSelector);
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) {
      if (hasST) {
        els.forEach(function (el) {
          ScrollTrigger.getAll().forEach(function (st) {
            if (st.trigger === el && !st.progress) st.kill();
          });
        });
      }
      gsap.set(els, { opacity: 1, y: 0, x: 0 });
    }
  }
  // FIX FOUC (18/7): il watchdog è SOLO un fallback se GSAP non c'è (o reduced-motion).
  // Rivelare in anticipo tutti i .reveal mentre gli scroll-trigger sono attivi causava il
  // flash (scompaiono/ricompaiono) sotto la piega. Con GSAP attivo, rivelano gli ScrollTrigger.
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    // reveal generico: le animazioni-FIRMA del sito vanno oltre questo,
    // ma si registrano ANCHE LORO subito, mai dopo l'intro.
    // ⚠️ REGOLA ANTI-FLASH (18/7): un elemento .reveal deve avere UNA SOLA animazione che
    // ne porta l'opacità a 1. Se un elemento ha una FIRMA che ne anima l'opacità (stagger,
    // timeline, ecc.), ESCLUDILO da qui via SITE.revealSelector (es. '.reveal:not(.mondo)'),
    // altrimenti il reveal generico + la firma si sovrappongono e l'elemento FLASHA.
    // immediateRender:false → lo stato "from" (opacity:0) NON viene ri-applicato ad ogni
    // ScrollTrigger.refresh() (che scatta al window.load mentre scrolli) → niente flash su refresh.
    gsap.utils.toArray(SITE.revealSelector).forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
  } else {
    // fallback senza GSAP: IntersectionObserver + classe
    if ('IntersectionObserver' in window && !reducedMotion) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add(SITE.inViewClass); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(SITE.revealSelector).forEach(function (el) { io.observe(el); });
    } else {
      showAllReveals();
    }
  }

  /* ---------- intro skippabile (NON gate-a nulla) ---------- */
  var intro = document.getElementById(SITE.introId);
  /* ⚠️ L'hook si legge AL MOMENTO DELLA CHIAMATA, mai catturato per valore
     qui. Il codice-firma vive sotto il marcatore di fine plumbing — cioè
     gira DOPO questa riga — quindi `window.bespokeHeroEntrance ||
     function(){}` congelava la funzione vuota e l'entrata dell'hero non
     partiva più: titolo a opacity 0 per sempre, hero vuota sul live.
     (20/7/2026, riprodotto a schermo su Benessere Futuro #159.) */
  function heroEntrance() {
    if (typeof window.bespokeHeroEntrance === 'function') window.bespokeHeroEntrance();
  }
  function hideIntro() {
    if (!intro) return;
    var el = intro; intro = null;
    el.classList.add('hide');
    setTimeout(function () { el.remove(); }, 700);
    heroEntrance();
  }
  // rimozione IMMEDIATA (niente fade): serve quando qualcosa deve stare sopra
  // l'intro subito, es. l'apertura del menu. Durante il fade l'intro resta
  // hit-testable e i link del drawer non sono cliccabili.
  function killIntroNow() {
    if (!intro) return;
    var el = intro; intro = null;
    el.remove();
    heroEntrance();
  }
  if (reducedMotion || !intro) {
    if (intro) { intro.remove(); intro = null; }
    /* ⚠️ setTimeout 0 NON è decorativo: senza intro questo ramo gira in modo
       SINCRONO, cioè PRIMA che il codice-firma — che sta sotto il marcatore
       di fine plumbing, dentro questa stessa IIFE — abbia assegnato
       `window.bespokeHeroEntrance`. Il risultato è un'entrata dell'hero MUTA:
       nessun errore, elementi visibili, animazione semplicemente mai partita.
       Rimandando di un tick la IIFE è conclusa e l'hook esiste.
       (14/8/2026, A.S.FA. Sicilia: misurato h1 a opacity 1 già al load.)
       Cugino del bug `hero-hook-congelato` del 20/7: lì l'hook era catturato
       troppo presto, qui è CHIAMATO troppo presto. */
    setTimeout(heroEntrance, 0);
  } else {
    setTimeout(hideIntro, SITE.introDuration);
    setTimeout(hideIntro, 6000); // safety net: l'intro non può incastrarsi
    intro.addEventListener('click', hideIntro);
  }

  /* ---------- burger menu (inert + focus + Escape + resize) ---------- */
  var burger = document.getElementById('burger');
  /* 26/7/2026 (Il Papiro #168) — IL PANNELLO SI RISOLVE DA `aria-controls`.
     Il canone apriva sempre `#mainNav`, dando per scontato che la nav
     desktop FOSSE anche il drawer. Molti siti invece hanno un drawer
     separato (`#mobile-menu`) con `hidden`, mentre `#mainNav` su mobile è
     `display:none`: il burger aggiungeva `nav-open` a un elemento nascosto
     e il menu non si apriva. È la stessa decisione già presa il 20/7 per
     qa-motion — «è lì che il markup accessibile dice qual è il pannello» —
     che però non era mai rientrata qui. */
  var nav = (function () {
    var byAria = burger && burger.getAttribute('aria-controls');
    return (byAria && document.getElementById(byAria)) || document.getElementById('mainNav');
  })();
  if (burger && nav) {
    var navUsaHidden = nav.hasAttribute('hidden');
    var lastFocus = null;
    var closeNav = function () {
      nav.classList.remove('nav-open');
      if (navUsaHidden) nav.hidden = true;
      burger.setAttribute('aria-expanded', 'false');
      if (lastFocus) { lastFocus.focus(); lastFocus = null; }
    };
    var openNav = function () {
      // L'intro ha z-index alto ed è figlia del body: se è ancora a schermo
      // copre il drawer (che vive nello stacking context dell'header) e i link
      // risultano non cliccabili. Aprire il menu chiude l'intro.
      // (bug trovato da qa-motion su Linea Uomo, 19/7/2026 → PLUMBING_V 2)
      if (typeof killIntroNow === 'function') killIntroNow();
      lastFocus = document.activeElement;
      if (navUsaHidden) nav.hidden = false;
      nav.classList.add('nav-open');
      burger.setAttribute('aria-expanded', 'true');
      var first = nav.querySelector('a, button');
      if (first) first.focus();
    };
    burger.addEventListener('click', function () {
      nav.classList.contains('nav-open') ? closeNav() : openNav();
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > SITE.breakpointMenu) closeNav();
    });
  }

  /* ---------- lightbox accessibile ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) {
      lightboxImg.src = src; lightboxImg.alt = alt || '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      if (lightboxClose) lightboxClose.focus();
    };
    var closeLb = function () {
      lightbox.hidden = true; lightboxImg.src = '';
      document.body.style.overflow = '';
      if (opener) { opener.focus(); opener = null; }
    };
    document.querySelectorAll('[data-full]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        opener = btn;
        var img = btn.querySelector('img');
        openLb(btn.getAttribute('data-full'), img ? img.alt : '');
      });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !lightbox.hidden) closeLb();
    });
  }

  /* ---------- orari dinamici Europe/Rome (finestre multiple + scavalco) ---------- */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
      });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var get = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[get('weekday')], mins: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  }
  var toMin = function (hm) {
    var a = hm.split(':');
    return parseInt(a[0], 10) * 60 + parseInt(a[1], 10);
  };
  var fmt = function (m) {
    m = m % 1440;
    return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2);
  };
  var DAYS_IT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var HOURS_BASE = {
    it: { open: 'Aperto ora', closesAt: 'chiude alle ', opensToday: 'Chiuso · apre oggi alle ',
          opensOn: 'Chiuso · apre {day} alle ', closed: 'Chiuso', days: DAYS_IT },
    en: { open: 'Open now', closesAt: 'closes at ', opensToday: 'Closed · opens today at ',
          opensOn: 'Closed · opens {day} at ', closed: 'Closed', days: DAYS_EN },
  };
  /* risolve le etichette orari per la lingua richiesta, con fallback en -> it */
  function strings(lang) {
    var custom = (SITE.HOURS_I18N && SITE.HOURS_I18N[lang]) || null;
    var base = HOURS_BASE[lang] || HOURS_BASE.en;
    if (!custom) return base;
    var outp = {};
    Object.keys(HOURS_BASE.it).forEach(function (k) {
      outp[k] = custom[k] !== undefined ? custom[k] : base[k];
    });
    return outp;
  }

  function hoursState() {
    var now = romeNow();
    // finestra del giorno corrente
    var wins = SITE.hours[now.day] || [];
    for (var i = 0; i < wins.length; i++) {
      var s = toMin(wins[i][0]), e = toMin(wins[i][1]);
      if (now.mins >= s && now.mins < Math.min(e, 1440)) {
        return { open: true, day: now.day, closesAt: fmt(e) };
      }
    }
    // coda dopo mezzanotte della sera PRIMA
    var prev = (now.day + 6) % 7;
    var pw = SITE.hours[prev] || [];
    for (var j = 0; j < pw.length; j++) {
      var pe = toMin(pw[j][1]);
      if (pe > 1440 && now.mins < pe - 1440) {
        return { open: true, day: prev, closesAt: fmt(pe) };
      }
    }
    // chiuso: prossima apertura (oggi o nei prossimi 7 giorni)
    for (var k = 0; k < wins.length; k++) {
      if (now.mins < toMin(wins[k][0])) {
        return { open: false, day: now.day, opensToday: fmt(toMin(wins[k][0])) };
      }
    }
    for (var d = 1; d <= 7; d++) {
      var nd = (now.day + d) % 7;
      var nw = SITE.hours[nd] || [];
      if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) };
    }
    return { open: false, day: now.day };
  }

  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId);
    var st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) {
      row.classList.toggle(SITE.todayClass,
        parseInt(row.getAttribute('data-day'), 10) === st.day);
    });
    if (!el) return;
    /* V4: le etichette si risolvono per lingua corrente, non con un booleano
       en/it. Fallback a catena lingua -> en -> it, così un sito con AR o FR
       che non traduce lo stato orari resta comunque leggibile. */
    var L = strings(root.lang);
    var txt;
    if (st.open) {
      txt = L.open + ' · ' + L.closesAt + st.closesAt;
    } else if (st.opensToday) {
      txt = L.opensToday + st.opensToday;
    } else if (st.opensAt !== undefined) {
      txt = L.opensOn.replace('{day}', L.days[st.opensDay]) + st.opensAt;
    } else {
      txt = L.closed;
    }
    el.textContent = txt;
  }
  renderHours();
  setInterval(renderHours, 60000);

  /* ---------- i18n overlay (EN sopra l'IT del DOM) ---------- */
  var originals = {}; // attr -> key -> testo IT
  var I18N_ATTRS = [
    ['data-i18n', null],
    ['data-i18n-aria', 'aria-label'],
    ['data-i18n-alt', 'alt'],
    ['data-i18n-placeholder', 'placeholder'],
    ['data-i18n-title', 'title'],
  ];
  function setLang(lang) {
    /* V4: qualunque lingua dichiarata in SITE.LANGS, non più solo 'en'.
       'it' resta la lingua del DOM: nessun dizionario, nessuna sostituzione.
       Una lingua sconosciuta ricade su 'it' invece di rompere la pagina. */
    root.lang = (lang === 'it' || LANG_CODES.indexOf(lang) !== -1) ? lang : 'it';
    root.dir = SITE.RTL.indexOf(root.lang) !== -1 ? 'rtl' : 'ltr';
    var dict = SITE.LANGS[root.lang] || null;
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr);
        var store = originals[dattr];
        /* innerHTML, NON textContent: gli elementi tradotti contengono
           quasi sempre markup (<strong>, <br>) e con textContent il primo
           passaggio a EN lo appiattisce — tornando in italiano il grassetto
           non torna più. I valori del dizionario sono statici e scritti da
           noi. (20/7/2026: la flotta era già così, il boilerplate no.) */
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = dict && dict[key] !== undefined ? dict[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    /* stato visivo della coppia di bottoni lingua, se il sito la usa */
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      var on = b.getAttribute('data-lang') === root.lang;
      b.classList.toggle('is-on', on);
      if (b.tagName === 'BUTTON') b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  /* 26/7/2026 (Il Papiro #168) — SI CABLANO ENTRAMBE LE FORME DI SELETTORE.
     Il canone conosceva solo il toggle singolo `#langToggle`, ma nella
     flotta esiste da tempo anche la COPPIA di bottoni `[data-lang]`
     (Warsa, Mido…): `i18n-roundtrip` era già stato insegnato a riconoscerle
     il 20/7, il plumbing no. Chi copiava il boilerplate e usava la coppia
     si ritrovava il cambio lingua MORTO, e nessun lint statico se ne
     accorgeva (lo becca solo qa-motion, a runtime). */
  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    /* V4: il toggle singolo CICLA sull'anello ['it', ...LANG_CODES].
       Con due lingue il comportamento è identico a prima (it <-> en). */
    var RING = ['it'].concat(LANG_CODES);
    langToggle.addEventListener('click', function () {
      var i = RING.indexOf(root.lang);
      setLang(RING[(i + 1) % RING.length]);
    });
  }
  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });
  try {
    var saved = localStorage.getItem(SITE.slug + '-lang');
    if (saved && saved !== 'it' && LANG_CODES.indexOf(saved) !== -1) setLang(saved);
  } catch (e) {}

  /* ---------- action-bar mobile (opzionale: #actionBar) ---------- */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () {
      actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ══════════ FINE PLUMBING — da qui in giù SOLO il codice-firma
     del sito (animazioni e interazioni uniche del cliente), che si
     registra comunque SUBITO, mai dentro setTimeout/intro. ══════════ */

  /* ══════════ PASTO — Laboratorio di pasta con cucina, Via Zecca Vecchia 4 ══════════
     la FIRMA — «la forchettata»: la parola PAST e, al posto della O, un piatto sul tavolo rosso. La forchetta scende, gira e arrotola i
     fili (si accorciano dal fondo mentre il nido cresce), poi il boccone sale e diventa la O di PASTO, e sopra cade il condimento. Lo
     stato è M (il piatto), T (0…1) e V (0 al suo posto; fino a 1 il boccone finito esce in alto; da −1 a 0 compaiono i fili del piatto
     nuovo). Senza JS e alla fine: pomodoro e basilico, T = 1, V = 0 (l'HTML). L'attesa (classe nell'head): il piatto coi fili, niente
     forchetta. Reduced-motion: tutto subito. rAF a tempo, guardia 1,5 s, IO al 60 %, resize solo se cambia la larghezza; un gesto
     durante l'animazione la ferma dov'è. */
  var DATI = {"vb":[640,440],"o":{"x":466,"y":167,"R":90},"gira":{"x":466,"y":336},"y":{"su":-250,"piatto":336,"o":167},"fasi":{"scendi":{"t":0,"d":0.12},"gira":{"t":0.12,"d":0.64},"sali":{"t":0.78,"d":0.12},"condisci":{"t":0.9,"d":0.1}},"tempi":{"inizio":300,"forchettata":4200,"servi":420,"arriva":360,"forchettataV":3600,"via":420},"giri":5,"piatti":[{"nome":"Tagliatelle pomodoro e basilico","fili":6},{"nome":"Tagliatelle all'amatriciana","fili":6},{"nome":"Spaghetti al pesto di agrumi","fili":10}]};
  /* la forchettata a (M, T, V) — una sola fonte: la usa main.js (via pst_main.cjs) e la prova (firma-prova.mjs).
     T = 1, V = 0 dà gli stessi attributi dell'HTML; T = 0 gli stessi pixel dell'attesa (il CSS .firma-attesa). */
  function creaForchetta(svg, D) {
    var c01 = function (t) { return Math.max(0, Math.min(1, t)); };
    var r3 = function (n) { return Math.round(n * 1000) / 1000; };
    /* la fine di una fase arriva a 1 esatto (#256) */
    var fase = function (t, w) { return t >= w.t + w.d - 1e-9 ? 1 : c01((t - w.t) / w.d); };
    var dolce = function (u) { return u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; };
    var esce = function (u) { return 1 - Math.pow(1 - u, 3); };
    var boccone = svg.querySelector('.boccone'), rebbi = svg.querySelector('.forchetta__rebbi');
    var P = D.piatti.map(function (_, m) {
      var fi = svg.querySelector('.piatto__fili[data-m="' + m + '"]'), ni = svg.querySelector('.nido[data-m="' + m + '"]');
      return {
        fili: fi ? [].slice.call(fi.querySelectorAll('.filo')) : [],
        nido: ni ? [].slice.call(ni.querySelectorAll(':scope > path')) : [],
        cond: ni ? ni.querySelector('.condimento') : null
      };
    });
    function disegna(m, t, v) {
      var F = D.fasi, q = P[m];
      var pS = fase(t, F.scendi), w = fase(t, F.gira), pR = fase(t, F.sali), pC = fase(t, F.condisci);
      /* il boccone: scende nel piatto, ci gira, sale al posto della O; col V > 0 esce in alto */
      var y = pR > 0 ? D.y.piatto + (D.y.o - D.y.piatto) * dolce(pR) : D.y.su + (D.y.piatto - D.y.su) * esce(pS);
      if (v > 0) y -= 420 * v;
      boccone.setAttribute('transform', 'translate(' + D.o.x + ' ' + r3(y) + ')');
      /* la forchetta gira: di taglio i rebbi si stringono */
      var sx = w >= 1 ? 1 : 0.3 + 0.7 * Math.abs(Math.cos(w * D.giri * 2 * Math.PI));
      rebbi.setAttribute('transform', 'scale(' + r3(sx) + ' 1)');
      /* il nido cresce dall'interno */
      q.nido.forEach(function (p) { p.setAttribute('stroke-dashoffset', String(r3(1 - w))); });
      /* i fili si accorciano dal fondo, uno dopo l'altro; col V < 0 (il piatto nuovo) compaiono */
      q.fili.forEach(function (g, i) {
        var s = i * 0.025, pull = c01((w - s) / (0.9 - s));
        g.setAttribute('opacity', String(pull >= 1 ? 0 : r3(v < 0 ? 1 + v : 1)));
        for (var k = 0; k < g.children.length; k++) g.children[k].setAttribute('stroke-dashoffset', String(r3(pull)));
      });
      /* il condimento cade sul nido */
      q.cond.setAttribute('opacity', String(r3(pC)));
      q.cond.setAttribute('transform', 'translate(0 ' + r3(-12 * Math.pow(1 - pC, 2)) + ')');
    }
    var completo = !!boccone && !!rebbi && P.length === D.piatti.length && P.every(function (q, m) { return q.fili.length === D.piatti[m].fili && q.nido.length === 3 && q.cond; });
    return { disegna: disegna, pezzi: P, completo: completo };
  }

  var prendi = function (id) { return document.getElementById(id); };
  var figuraF = prendi('forchettata-firma'), svgF = prendi('forchettaSvg'), leggiF = prendi('forchettaLeggi');
  var FORCH = svgF ? creaForchetta(svgF, DATI) : null;
  var BOTTONI = [].slice.call(document.querySelectorAll('.forchettata__modi button[data-modo]'));
  var TF = DATI.tempi;
  var faseF = 'fatta', modoF = '', rafF = 0, guardiaF = 0, larghezzaAvvioF = 0, corseF = 0, pianoF = null;
  var MF = 0, TT = 1, VF = 0;
  var destinazioneF = { m: 0 };
  var c01 = function (t) { return Math.max(0, Math.min(1, t)); };
  var CURVE = {
    dolce: function (u) { return u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; },
    lineare: function (u) { return u; }
  };
  function annunciaF(m) {
    var el = document.querySelector('.forchettata__d[data-m="' + m + '"]');
    if (leggiF) leggiF.textContent = el ? el.textContent : '';
  }
  function disegnaF(m, t, v) {
    if (m !== MF || figuraF.getAttribute('data-modo') !== String(m)) {
      MF = m;
      figuraF.setAttribute('data-modo', String(m));
      BOTTONI.forEach(function (bt) { bt.setAttribute('aria-pressed', String(+bt.getAttribute('data-modo') === m)); });
    }
    TT = t; VF = v;
    FORCH.disegna(m, t, v);
  }
  /* un piano: tratti { da, a, m, x0: {t, v}, x1: {…}, curva } */
  function fotogrammaF(t) {
    var P = pianoF.piano, cur = null;
    for (var i = 0; i < P.length; i++) if (t >= P[i].da) cur = P[i];
    if (!cur) return;
    var q = t < cur.a ? c01((t - cur.da) / Math.max(1, cur.a - cur.da)) : 1, e = CURVE[cur.curva](q), A = cur.x0, B = cur.x1;
    disegnaF(cur.m, A.t + (B.t - A.t) * e, A.v + (B.v - A.v) * e);
  }
  var st2 = function (t, v) { return { t: t, v: v }; };
  function sorvegliaF() { clearTimeout(guardiaF); guardiaF = setTimeout(chiudiF, 1500); }
  function chiudiF() {
    cancelAnimationFrame(rafF); rafF = 0;
    clearTimeout(guardiaF);
    disegnaF(destinazioneF.m, 1, 0);
    /* i piatti nascosti tornano come nell'HTML (#257) */
    DATI.piatti.forEach(function (_, k) { if (k !== destinazioneF.m) FORCH.disegna(k, 1, 0); });
    FORCH.disegna(destinazioneF.m, 1, 0);
    if (figuraF) figuraF.setAttribute('data-firma', 'fatta');
    root.classList.remove('firma-attesa');
    faseF = 'fatta';
  }
  /* un gesto durante un'animazione (o nell'attesa): tutto si ferma dov'è (#244); dall'attesa resta il piatto coi fili */
  function fermaF() {
    cancelAnimationFrame(rafF); rafF = 0;
    clearTimeout(guardiaF);
    if (root.classList.contains('firma-attesa')) { disegnaF(MF, 0, 0); root.classList.remove('firma-attesa'); }
    else disegnaF(MF, TT, VF);
    if (figuraF) figuraF.setAttribute('data-firma', 'fatta');
    faseF = 'fatta';
  }
  function avviaF(modo, piano) {
    cancelAnimationFrame(rafF); rafF = 0;
    modoF = modo; pianoF = piano;
    root.classList.remove('firma-attesa');
    faseF = 'corre'; if (figuraF) figuraF.setAttribute('data-firma', 'corre');
    larghezzaAvvioF = window.innerWidth;
    var t0 = null, corsa = ++corseF;
    function fotogramma(ts) {
      rafF = 0;
      /* un fotogramma rimasto in coda dopo la chiusura (o di una corsa vecchia) non riapre niente */
      if (faseF !== 'corre' || corsa !== corseF) return;
      if (t0 === null) t0 = ts;
      var t = ts - t0;
      fotogrammaF(t);
      if (t >= pianoF.fine) { chiudiF(); return; }
      sorvegliaF();
      rafF = requestAnimationFrame(fotogramma);
    }
    sorvegliaF();
    rafF = requestAnimationFrame(fotogramma);
  }
  function avviaIntroF() {
    /* dalla classe d'attesa agli attributi senza cambiare un pixel: il piatto coi fili */
    disegnaF(0, 0, 0);
    destinazioneF = { m: 0 };
    var P = [{ da: 0, a: TF.inizio, m: 0, x0: st2(0, 0), x1: st2(0, 0), curva: 'lineare' }, { da: TF.inizio, a: TF.inizio + TF.forchettata, m: 0, x0: st2(0, 0), x1: st2(1, 0), curva: 'lineare' }];
    avviaF('intro', { piano: P, fine: TF.inizio + TF.forchettata });
  }
  /* il gesto: scegliere un piatto. Se è quello che si sta già preparando, niente; altrimenti tutto si ferma dov'è, il boccone esce in
     alto, compaiono i fili del piatto nuovo e la forchetta ricomincia. */
  function sceltaF(m) {
    if (faseF === 'corre' && destinazioneF.m === m) return;
    if (faseF === 'corre' || root.classList.contains('firma-attesa')) fermaF();
    destinazioneF = { m: m };
    annunciaF(m);
    if (reducedMotion) { chiudiF(); return; }
    var P = [], t = 0, mm = MF, a = st2(TT, VF);
    var passo = function (dura, m2, b, curva) { P.push({ da: t, a: t + dura, m: m2, x0: a, x1: b, curva: curva }); t += dura; a = b; };
    if (a.v >= 0) {
      passo(TF.servi, mm, st2(a.t, 1), 'dolce');
      a = st2(0, -1);
    }
    passo(TF.arriva, m, st2(0, 0), 'dolce');
    passo(TF.forchettataV, m, st2(1, 0), 'lineare');
    avviaF('prepara', { piano: P, fine: t });
  }

  /* ══════════ il foglio del giorno: «un altro giorno» sfila il foglio e ne infila un altro ══════════ */
  var fogli = [].slice.call(document.querySelectorAll('#giorni .giorno'));
  var bottoneGiorno = prendi('giornoAltro'), numeroGiorno = prendi('giornoN');
  var giornoOra = 0, cambioGiorno = 0;
  function mostraGiorno(n) {
    fogli.forEach(function (f, k) { f.classList.remove('esce', 'entra'); f.classList.toggle('is-on', k === n); });
    giornoOra = n;
    if (numeroGiorno) numeroGiorno.textContent = String(n + 1);
  }
  if (fogli.length && bottoneGiorno) {
    bottoneGiorno.addEventListener('click', function () {
      var dopo = (giornoOra + 1) % fogli.length;
      clearTimeout(cambioGiorno);
      if (reducedMotion) { mostraGiorno(dopo); return; }
      var ora = fogli[giornoOra];
      fogli.forEach(function (f) { f.classList.remove('entra'); });
      ora.classList.add('esce');
      cambioGiorno = setTimeout(function () { mostraGiorno(dopo); fogli[dopo].classList.add('entra'); }, 260);
    });
  }

  /* la testata segna la sezione in cui ti trovi */
  var linkVoci = [].slice.call(document.querySelectorAll('#mainNav a'));
  var bersagliVoci = linkVoci.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  function aggiornaVoci() {
    var y = (document.getElementById('testata') || { offsetHeight: 80 }).offsetHeight + 40, ora = -1;
    for (var i = 0; i < bersagliVoci.length; i++) { if (bersagliVoci[i] && bersagliVoci[i].getBoundingClientRect().top <= y) ora = i; }
    linkVoci.forEach(function (a, k) { if (k === ora) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
  }
  var tickVoci = 0;
  window.addEventListener('scroll', function () {
    if (tickVoci) return;
    tickVoci = requestAnimationFrame(function () { tickVoci = 0; aggiornaVoci(); });
  }, { passive: true });
  aggiornaVoci();

  /* lo stato degli orari anche sopra la tabella */
  function copiaStato() {
    var primo = document.getElementById(SITE.hoursStatusId);
    if (!primo) return;
    var aperto = hoursState().open;
    ['orarioStato', 'orarioStato2'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (el !== primo) el.textContent = primo.textContent;
      el.classList.toggle('is-aperto', aperto);
    });
  }
  copiaStato();
  setInterval(copiaStato, 60000);
  /* la copia segue lo stato principale a ogni cambio, anche di lingua (#243, stato-lingua-check) */
  (function () {
    var primoS = document.getElementById(SITE.hoursStatusId);
    if (primoS && window.MutationObserver) new MutationObserver(copiaStato).observe(primoS, { childList: true, characterData: true, subtree: true });
  })();

  /* la firma è «in vista» quando se ne vede almeno il 60% (o il 60% della finestra, se è più alta della finestra); l'altezza è quella
     del documento: all'avvio innerHeight di un telefono può non essere ancora quella vera (#233) */
  function altezzaVista() { return document.documentElement.clientHeight || window.innerHeight || 800; }
  function abbastanza(top, bottom, alto, vh) { return Math.min(bottom, vh) - Math.max(top, 0) >= 0.6 * Math.min(alto, vh); }
  function inVistaF() { var r = svgF.getBoundingClientRect(); return abbastanza(r.top, r.bottom, r.height, altezzaVista()); }

  if (figuraF && svgF && FORCH && FORCH.completo && BOTTONI.length === DATI.piatti.length) {
    try { clearTimeout(window.__attesaForchetta); } catch (e) {}
    window.__forchetta = {
      stato: function () {
        return { fase: faseF, modo: modoF, corse: corseF, m: MF, t: TT, v: VF, meta: destinazioneF.m };
      },
      tempi: TF,
    };
    var daFareF = !reducedMotion && root.classList.contains('firma-attesa');
    /* la pagina aperta su una sezione (#orari): il browser ci scorre dopo, la firma non si vedrebbe */
    var ancoraF = location.hash && location.hash.length > 1 && location.hash !== '#inizio';
    var inVista = inVistaF();
    /* perché la firma è partita o no (lo legge il check) */
    window.__forchetta.avvio = { daFare: daFareF, ancora: !!ancoraF, inVista: inVista, top: svgF.getBoundingClientRect().top, vh: altezzaVista() };
    if (!daFareF || ancoraF) chiudiF();
    else if (inVista) avviaIntroF();
    else if ('IntersectionObserver' in window) {
      /* la firma sotto la piega (sul telefono): parte quando se ne vede abbastanza; fino ad allora resta il piatto coi fili */
      var soglie = []; for (var sg = 0; sg <= 20; sg++) soglie.push(sg / 20);
      var ioF = new IntersectionObserver(function (voci) {
        if (!voci.some(function (v) { return v.isIntersecting && abbastanza(v.boundingClientRect.top, v.boundingClientRect.bottom, v.boundingClientRect.height, altezzaVista()); })) return;
        ioF.disconnect();
        if (faseF === 'fatta' && root.classList.contains('firma-attesa')) avviaIntroF();
      }, { threshold: soglie });
      ioF.observe(svgF);
      window.__forchetta.avvio.aspetta = true;
    } else chiudiF();
    /* un resize chiude la firma solo se cambia la LARGHEZZA (sul telefono arrivano resize della sola altezza, #228) */
    window.addEventListener('resize', function () {
      if (faseF !== 'corre' || Math.abs(window.innerWidth - larghezzaAvvioF) <= 1) return;
      chiudiF();
    });
    BOTTONI.forEach(function (b) { b.addEventListener('click', function () { sceltaF(+b.getAttribute('data-modo')); }); });
  }
})();
