// ==========================================================================
//  MAIN.JS — Premium Islamic Wedding Invitation
//  Handles: gate, music toggle, side-nav, top-nav, hero reveal, parallax,
//           smooth scroll, section active tracking
// ==========================================================================
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initGate();
  initMusicToggle();
  initTopNav();
  initSideNav();
  initHeroParallax();
  initSmoothScroll();
});

/* ============================================================
   GATE — tap-to-enter overlay
   ============================================================ */
function initGate() {
  const gate     = document.getElementById('gate');
  const enterBtn = document.getElementById('gate-enter');
  if (!gate || !enterBtn) return;

  let opened = false;

  function openGate() {
    if (opened) return;
    opened = true;

    // 1. Begin closing animation
    gate.classList.add('gate-closing');

    // 2. Unlock scroll immediately so reveal is visible
    document.body.classList.remove('gate-active');
    document.body.classList.add('page-loaded');

    // 3. Reveal hero content
    revealHero();

    // 4. Remove gate from DOM after transition finishes
    setTimeout(() => {
      gate.classList.add('gate-hidden');
      gate.setAttribute('aria-hidden', 'true');
    }, 1050);

    // 5. Attempt autoplay music
    startMusic();
  }

  enterBtn.addEventListener('click', openGate);
  enterBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openGate();
    }
  });
}

/* ============================================================
   HERO REVEAL — animate hero content after gate closes
   ============================================================ */
function revealHero() {
  const stage     = document.getElementById('heroStage');
  const scrollCue = document.getElementById('scrollCue');
  if (!stage) return;

  // Small delay so gate fade-out is visible first
  setTimeout(() => {
    stage.classList.add('hero-revealed');
  }, 300);

  // Show scroll cue after names fully appear
  setTimeout(() => {
    if (scrollCue) scrollCue.classList.add('is-visible');
  }, 1800);
}

/* ============================================================
   MUSIC TOGGLE
   ============================================================ */
function startMusic() {
  const music    = document.getElementById('bgMusic');
  const musicBtn = document.getElementById('musicToggle');
  if (!music || !musicBtn) return;

  const cfg = (typeof WEDDING_CONFIG !== 'undefined') ? WEDDING_CONFIG.music : null;
  music.volume = cfg ? cfg.volume : 0.5;

  music.play()
    .then(() => musicBtn.classList.add('is-playing'))
    .catch(() => {
      // Autoplay blocked — button visible for manual start
    });
}

function initMusicToggle() {
  const btn   = document.getElementById('musicToggle');
  const music = document.getElementById('bgMusic');
  if (!btn || !music) return;

  btn.addEventListener('click', () => {
    if (music.paused) {
      music.play()
        .then(() => {
          btn.classList.add('is-playing');
          btn.setAttribute('aria-label', 'Pause background music');
        })
        .catch(() => {});
    } else {
      music.pause();
      btn.classList.remove('is-playing');
      btn.setAttribute('aria-label', 'Play background music');
    }
  });
}

/* ============================================================
   TOP NAV — add scrolled class for glass effect
   ============================================================ */
function initTopNav() {
  const nav = document.querySelector('.top-nav');
  if (!nav) return;

  const update = () => nav.classList.toggle('scrolled', window.pageYOffset > 80);
  window.addEventListener('scroll', update, { passive: true });
  update(); // run once on load
}

/* ============================================================
   SIDE NAV DOTS — highlight active section
   ============================================================ */
function initSideNav() {
  const dots    = Array.from(document.querySelectorAll('.side-nav__dot'));
  if (!dots.length) return;

  const targets = dots.map(d => {
    const href = d.getAttribute('href');
    return href ? document.querySelector(href) : null;
  });

  // Mark first dot as current initially
  dots[0]?.setAttribute('aria-current', 'true');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = targets.indexOf(entry.target);
        if (idx === -1) return;
        dots.forEach((d, i) => {
          if (i === idx) d.setAttribute('aria-current', 'true');
          else d.removeAttribute('aria-current');
        });
      }
    });
  }, { threshold: 0.35, rootMargin: '0px 0px -30% 0px' });

  targets.forEach(t => { if (t) observer.observe(t); });
}

/* ============================================================
   HERO PARALLAX — subtle bg photo drift on scroll
   ============================================================ */
function initHeroParallax() {
  const photo = document.querySelector('.hero__bg-photo');
  const hero  = document.getElementById('hero');
  if (!photo || !hero) return;

  // Respect reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY      = window.pageYOffset;
        const heroHeight   = hero.offsetHeight;
        if (scrollY < heroHeight * 1.2) {
          const shift = scrollY * 0.22;
          photo.style.transform = `translateY(${shift}px) scale(1.06)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ============================================================
   SMOOTH SCROLL — all internal anchor links
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id     = this.getAttribute('href');
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 0; // adjust if sticky header overlaps
      const top    = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}
