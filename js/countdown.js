// ==========================================================================
//  COUNTDOWN.JS — Premium Islamic Wedding Invitation
//  Target: Nikah on Friday 21 August 2026, after Asr (≈ 6:00 PM IST)
//  All date/time config sourced from WEDDING_CONFIG in config.js
// ==========================================================================
(function () {
  'use strict';

  /* ---- Config ---- */
  const ISO =
    (typeof WEDDING_CONFIG !== 'undefined' && WEDDING_CONFIG.nikah && WEDDING_CONFIG.nikah.isoDateTime)
      ? WEDDING_CONFIG.nikah.isoDateTime
      : '2026-08-21T18:00:00+05:30';   // Asr ≈ 6 PM IST on that day

  const WEDDING_DATE = new Date(ISO);

  /* ---- Element refs ---- */
  const elDays    = document.getElementById('cd-days');
  const elHours   = document.getElementById('cd-hours');
  const elMinutes = document.getElementById('cd-minutes');
  const elSeconds = document.getElementById('cd-seconds');

  if (!elDays || !elHours || !elMinutes || !elSeconds) return;

  /* ---- Pad numbers to 2 digits ---- */
  function pad(n) { return String(n).padStart(2, '0'); }

  /* ---- Animate number change with flip class ---- */
  function setVal(el, newVal) {
    if (el.textContent === newVal) return;
    el.classList.remove('flip');
    // Force reflow so re-adding the class triggers animation
    void el.offsetWidth;
    el.classList.add('flip');
    el.textContent = newVal;
  }

  /* ---- Main tick ---- */
  function tick() {
    const now  = Date.now();
    const diff = WEDDING_DATE.getTime() - now;

    if (diff <= 0) {
      // Wedding day / past — freeze at zero
      setVal(elDays,    '00');
      setVal(elHours,   '00');
      setVal(elMinutes, '00');
      setVal(elSeconds, '00');
      return; // stop ticking
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days    = Math.floor(totalSeconds / 86400);
    const hours   = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600)  /   60);
    const seconds =              totalSeconds % 60;

    setVal(elDays,    pad(days));
    setVal(elHours,   pad(hours));
    setVal(elMinutes, pad(minutes));
    setVal(elSeconds, pad(seconds));

    // Schedule next tick
    setTimeout(tick, 1000);
  }

  // Kick off immediately, then every ~1 s via recursive setTimeout
  // (more accurate than setInterval for long-running timers)
  tick();
})();
