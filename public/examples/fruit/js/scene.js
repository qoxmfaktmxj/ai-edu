// Draws the page from state. Nothing here decides state; app.js owns it.
// Motion patterns (adapted from hyperframes-animation rules to live web input):
//   press-release-spring  -> heroPulse: quick rise to 1.04, spring settle, ~400ms
//   theme-crossfade-morph -> photo layers and taste colors: opacity / color crossfade, anchor text stays put
//   ambient-glow-bloom (traveling sweep) -> zoom: one highlight band crosses once, scrubbed by scroll

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

export function createScene() {
  const el = {
    heroPhoto: $('.hero-photo'),
    layers: $$('[data-photo]'),
    photoChips: $$('[data-pick-photo]'),
    caption: $('[data-photo-caption]'),
    zoom: $('[data-zoom]'),
    zoomImg: $('[data-zoom-img]'),
    zoomSweep: $('[data-zoom-sweep]'),
    taste: $('#taste'),
    prefChips: $$('[data-pick-pref]'),
    prefLine: $('[data-pref-line]'),
  };

  let wantedPhoto = 'whole';

  function showLayer(id) {
    el.layers.forEach((img) => img.classList.toggle('is-on', img.dataset.photo === id));
  }

  return {
    el,

    renderPhoto(id, caption) {
      wantedPhoto = id;
      el.photoChips.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.pickPhoto === id)));
      el.caption.textContent = caption;
      const img = el.layers.find((i) => i.dataset.photo === id);
      if (img.complete && img.naturalWidth) return showLayer(id);
      // Not loaded yet: keep the current photo until this one decodes, and only show it if it is still the latest pick.
      img.loading = 'eager';
      img.decode().catch(() => {}).then(() => { if (wantedPhoto === id) showLayer(id); });
    },

    renderPref(id, pref, reduced) {
      el.taste.dataset.pref = id;
      el.taste.style.setProperty('--accent', pref.accent);
      el.taste.style.setProperty('--base', pref.base);
      el.taste.style.setProperty('--dot', pref.dot);
      el.prefChips.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.pickPref === id)));
      el.prefLine.textContent = pref.line;
      if (reduced) return;
      el.prefLine.getAnimations().forEach((a) => a.cancel());
      el.prefLine.animate(
        [{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }],
        { duration: 240, easing: 'cubic-bezier(0.2, 0, 0, 1)' },
      );
    },

    // p: 0..1 progress through the zoom section. compact: phone layout (smaller zoom).
    renderZoom(p, compact, reduced) {
      if (reduced) {
        el.zoomImg.style.setProperty('--z', '1');
        el.zoomSweep.style.setProperty('--so', '0');
        return;
      }
      const max = compact ? 0.06 : 0.15;
      el.zoomImg.style.setProperty('--z', (1 + max * p).toFixed(4));
      // Band is ~1/3 of the frame wide: -100% .. 300% of its own width crosses the frame exactly once.
      el.zoomSweep.style.setProperty('--sx', `${(-100 + 400 * p).toFixed(2)}%`);
      el.zoomSweep.style.setProperty('--so', (Math.sin(Math.PI * p) * 0.9).toFixed(3));
    },

    // 1.00 -> 1.04 -> 1.00 within 400ms. Resolves when done (immediately under reduced motion).
    heroPulse(reduced) {
      if (reduced) return Promise.resolve();
      const base = 'rotate(-2deg)';
      const anim = el.heroPhoto.animate(
        [
          { transform: `${base} scale(1)`, easing: 'cubic-bezier(0.2, 0, 0, 1)' },
          { transform: `${base} scale(1.04)`, offset: 0.35, easing: 'cubic-bezier(0.34, 1.4, 0.64, 1)' },
          { transform: `${base} scale(1)` },
        ],
        { duration: 400 },
      );
      return anim.finished.catch(() => {});
    },
  };
}
