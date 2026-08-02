// ==========================================================================
//  ANIMATIONS.JS — Premium Islamic Wedding Invitation
//  Handles: scroll-reveal (AOS), RSVP form, lazy images, ornament stagger
// ==========================================================================
(function () {
  'use strict';

  /* ============================================================
     SCROLL REVEAL (AOS-like, no external library)
     ============================================================ */
  function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    if (!elements.length) return;

    // Skip animations entirely for users who prefer reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach(el => el.classList.add('aos-animate'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el    = entry.target;
        const delay = parseInt(el.getAttribute('data-aos-delay') || '0', 10);
        setTimeout(() => el.classList.add('aos-animate'), delay);
        observer.unobserve(el);
      });
    }, {
      threshold:  0.10,
      rootMargin: '0px 0px -48px 0px',
    });

    elements.forEach(el => observer.observe(el));
  }

  /* ============================================================
     ORNAMENT DIVIDER — trigger line-grow + gem-pop
     The CSS animation is tied to `.aos-animate` on the divider
     itself, so the IntersectionObserver above handles it.
     This function makes sure orphaned dividers without data-aos
     also animate once in view.
     ============================================================ */
  function initOrnamentsWithoutAOS() {
    const dividers = document.querySelectorAll('.ornament-divider:not([data-aos])');
    if (!dividers.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dividers.forEach(el => el.classList.add('aos-animate'));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    dividers.forEach(el => obs.observe(el));
  }

  /* ============================================================
     LAZY IMAGE LOADING — images with data-src attribute
     ============================================================ */
  function initLazyImages() {
    const lazyImgs = document.querySelectorAll('img[data-src]');
    if (!lazyImgs.length) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          obs.unobserve(img);
        }
      });
    });
    lazyImgs.forEach(img => obs.observe(img));
  }

  /* ============================================================
     RSVP FORM
     ============================================================ */
  function initRSVP() {
    const form      = document.getElementById('rsvp-form');
    const success   = document.getElementById('rsvp-success');
    const submitBtn = document.getElementById('rsvp-submit');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      const nameField = form.querySelector('#rsvp-name');
      const attended  = form.querySelector('input[name="attendance"]:checked');

      if (nameField && !nameField.value.trim()) {
        nameField.focus();
        nameField.classList.add('rsvp__input--error');
        nameField.addEventListener('input', () => nameField.classList.remove('rsvp__input--error'), { once: true });
        return;
      }

      if (!attended) {
        const firstRadio = form.querySelector('input[name="attendance"]');
        if (firstRadio) firstRadio.focus();
        return;
      }

      // Animate button to loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.querySelector('.rsvp__btn-text').textContent = 'Sending…';
      }

      // Simulate async submission (replace with real fetch/API if needed)
      setTimeout(() => {
        // Hide form, show success
        form.style.transition  = 'opacity 0.4s ease, transform 0.4s ease';
        form.style.opacity     = '0';
        form.style.transform   = 'translateY(-12px)';

        setTimeout(() => {
          form.hidden = true;
          if (success) {
            success.hidden = false;
            success.style.opacity = '0';
            success.style.transform = 'translateY(12px)';
            success.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            // Force reflow
            void success.offsetWidth;
            success.style.opacity   = '1';
            success.style.transform = 'translateY(0)';
          }
        }, 420);
      }, 900);
    });

    // Input error state — clear on input
    form.querySelectorAll('.rsvp__input').forEach(input => {
      input.addEventListener('input', () => input.classList.remove('rsvp__input--error'));
    });
  }

  /* ============================================================
     COUPLE CARD — subtle parallax tilt on mouse move (desktop)
     ============================================================ */
  function initCardTilt() {
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch devices

    document.querySelectorAll('.couple-card, .event-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect  = card.getBoundingClientRect();
        const cx    = rect.left + rect.width  / 2;
        const cy    = rect.top  + rect.height / 2;
        const dx    = (e.clientX - cx) / (rect.width  / 2);
        const dy    = (e.clientY - cy) / (rect.height / 2);
        const tiltX = (-dy * 4).toFixed(2);
        const tiltY = ( dx * 4).toFixed(2);
        card.style.transform = `translateY(-6px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        card.style.transition = 'transform 0.1s linear';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform  = '';
        card.style.transition = 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)';
      });
    });
  }

  /* ============================================================
     SECTION BG SUBTLE PARALLAX (bismillah + rsvp pattern layers)
     ============================================================ */
  function initPatternParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const layers = [
      document.querySelector('.bismillah__pattern'),
      document.querySelector('.rsvp__pattern'),
    ].filter(Boolean);

    if (!layers.length) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          layers.forEach(layer => {
            const parent = layer.parentElement;
            if (!parent) return;
            const rect   = parent.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const vhalf  = window.innerHeight / 2;
            const shift  = ((center - vhalf) / vhalf) * 14;
            layer.style.transform = `translateY(${shift.toFixed(1)}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ============================================================
     INIT ALL
     ============================================================ */
  function init() {
    initAOS();
    initOrnamentsWithoutAOS();
    initLazyImages();
    initRSVP();
    initCardTilt();
    initPatternParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
