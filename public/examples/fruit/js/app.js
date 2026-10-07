// Turns clicks, keys and scroll into state, then asks scene.js to draw it.
import { PHOTOS, PREFS } from './data.js';
import { createScene } from './scene.js';

const scene = createScene();
const reducedMq = matchMedia('(prefers-reduced-motion: reduce)');
const compactMq = matchMedia('(max-width: 767px)');

const state = {
  photo: 'whole',
  pref: 'plain',
  zoom: 0,
  reduced: reducedMq.matches,
  compact: compactMq.matches,
  goingToObserve: false,
};

// ---------- hero: photo button and "가까이 보기" ----------
const observe = document.getElementById('observe');

async function goToObserve(event) {
  event.preventDefault();
  if (state.goingToObserve) return; // repeated clicks do not stack the pulse or the scroll
  state.goingToObserve = true;
  await scene.heroPulse(state.reduced);
  observe.scrollIntoView({ behavior: state.reduced ? 'auto' : 'smooth', block: 'start' });
  observe.focus({ preventScroll: true });
  state.goingToObserve = false;
}
document.querySelectorAll('[data-go-observe]').forEach((b) => b.addEventListener('click', goToObserve));

// ---------- observe: photo choice ----------
document.querySelectorAll('[data-pick-photo]').forEach((b) =>
  b.addEventListener('click', () => {
    state.photo = b.dataset.pickPhoto;
    scene.renderPhoto(state.photo, PHOTOS[state.photo]);
  }),
);

// ---------- taste: preference choice ----------
document.querySelectorAll('[data-pick-pref]').forEach((b) =>
  b.addEventListener('click', () => {
    if (state.pref === b.dataset.pickPref) return;
    state.pref = b.dataset.pickPref;
    scene.renderPref(state.pref, PREFS[state.pref], state.reduced);
  }),
);

// ---------- zoom: scroll progress, batched to one frame ----------
const zoom = scene.el.zoom;
let frame = 0;
let zoomVisible = false;

function measureZoom() {
  frame = 0;
  const r = zoom.getBoundingClientRect();
  const vh = innerHeight;
  // Desktop: progress across the sticky run. Phone: progress while the section passes through the viewport.
  const p = state.compact ? (vh - r.top) / (vh + r.height) : -r.top / Math.max(1, r.height - vh);
  state.zoom = Math.min(1, Math.max(0, p));
  scene.renderZoom(state.zoom, state.compact, state.reduced);
}
function schedule() {
  if (!frame) frame = requestAnimationFrame(measureZoom);
}

new IntersectionObserver(([entry]) => {
  zoomVisible = entry.isIntersecting;
  schedule();
}).observe(zoom);
addEventListener('scroll', () => { if (zoomVisible) schedule(); }, { passive: true });
addEventListener('resize', schedule);
addEventListener('orientationchange', schedule);
document.fonts?.ready.then(schedule);

reducedMq.addEventListener('change', (e) => { state.reduced = e.matches; schedule(); });
compactMq.addEventListener('change', (e) => { state.compact = e.matches; schedule(); });

schedule(); // also restores the right zoom when the page reloads mid-scroll
