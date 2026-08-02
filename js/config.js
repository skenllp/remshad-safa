// ==========================================================================
//  CONFIG.JS — Single source of truth for all wedding data
//  Edit this file to update names, dates, venues, and links.
// ==========================================================================
'use strict';

const WEDDING_CONFIG = {

  // ---- Couple ----
  groom: {
    name:        'Muhammed Remshad',
    firstName:   'Remshad',
    relation:    'Son of',
    father:      'T.P. Abdul Razak',
    mother:      'Samsiya K.P.',
    houseName:   "Shamsiya's",
    address:     'Koodali, Kannur',
  },

  bride: {
    name:        'Fathimath Safa',
    firstName:   'Safa',
    relation:    'Daughter of',
    father:      'Rahoof C.C.',
    mother:      'Sabira K.P.',
    houseName:   'Safa Baith',
    address:     'Ayippuzha, Irikkur, Kannur',
  },

  // ---- Events ----
  nikah: {
    date:        'Friday, 21 August 2026',
    dateShort:   '21 · 08 · 2026',
    dateParts:   ['21', '08', '2026'],
    time:        'After Asr Prayer',
    venue:       'Ayippuzha Juma Masjid',
    address:     'Irikkur, Kannur',
    mapsUrl:     'https://maps.app.goo.gl/SxBCr3Ny3t1PT5yR9',
    // ISO datetime used by countdown (Asr on that day ≈ 6:00 PM IST)
    isoDateTime: '2026-08-21T18:00:00+05:30',
  },

  reception: {
    date:        'Saturday, 22 August 2026',
    dateShort:   '22 · 08 · 2026',
    dateParts:   ['22', '08', '2026'],
    time:        '12:00 PM – 2:30 PM',
    venue:       "Shamsiya's",
    address:     'Koodali, Kannur',
    mapsUrl:     'https://maps.google.com/?q=Koodali+Kannur+Kerala',
  },

  // ---- SEO / Social ----
  seo: {
    title:       'Muhammed Remshad & Fathimath Safa — Nikah Invitation',
    description: 'With the blessings of Allah, we joyfully invite you to the Nikah of Muhammed Remshad & Fathimath Safa on 21 August 2026 at Ayippuzha Juma Masjid, Irikkur, Kannur.',
    url:         'https://remshad-safa.vercel.app/',
    ogImage:     'https://remshad-safa.vercel.app/assets/images/og-image.png',
  },

  // ---- Music ----
  music: {
    src:    'assets/music.mp3',
    volume: 0.5,
  },

};

// Make available globally
if (typeof module !== 'undefined') module.exports = WEDDING_CONFIG;
