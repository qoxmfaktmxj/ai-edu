// Turns real scroll, buttons and pointer into state, then renders once per frame.
import { SCENES, MAX_DEPTH, LAMP_FROM } from './data.js';
import { initDeepSea, renderDeepSea, lampTarget } from './scene.js';

const stage = document.querySelector('[data-stage]');
const depthEl = document.querySelector('[data-depth]');
const zoneEl = document.querySelector('[data-zone]');
const lampBtn = document.querySelector('[data-lamp-btn]');
const lampLabel = document.querySelector('[data-lamp-label]');
const reducedMq = matchMedia('(prefers-reduced-motion: reduce)');
const compactMq = matchMedia('(max-width: 767px)');

const maskOk = CSS.supports('mask-image', 'radial-gradient(#000, transparent)') ||
  CSS.supports('-webkit-mask-image', 'radial-gradient(#000, transparent)');
if (!maskOk) document.documentElement.classList.add('no-mask');

const state = {
  depth: 0,
  lampOn: false,
  lampFollow: 'target', // 'target' (button, keyboard, touch) or 'pointer' (mouse)
  lampX: 0.5,
  lampY: 0.5,
  compact: compactMq.matches,
  reduced: reducedMq.matches,
};

const api = initDeepSea(stage);

// ---------- scroll -> depth ----------
// Each scene section's real scroll range maps onto its own depth range (not progress x 4000).
let ranges = [];
function measure() {
  ranges = SCENES.filter((s) => s.id !== 'surface').map((s) => {
    const el = document.getElementById(s.id);
    const r = el.getBoundingClientRect();
    return { ...s, top: r.top + scrollY, height: r.height };
  });
  api.resize();
}

function depthAt(line) {
  if (!ranges.length || line < ranges[0].top) return 0;
  for (const r of ranges) {
    if (line < r.top + r.height) {
      let t = (line - r.top) / r.height;
      if (r.reachAt) t = Math.min(1, t / r.reachAt);
      return r.start + t * (r.end - r.start);
    }
  }
  return MAX_DEPTH;
}

function zoneFor(d) {
  if (d <= 0) return SCENES[0].title;
  return (SCENES.find((s) => s.id !== 'surface' && d <= s.end) || SCENES[SCENES.length - 1]).title;
}

// ---------- one render per frame ----------
let frame = 0;
function schedule() { if (!frame) frame = requestAnimationFrame(render); }

function render() {
  frame = 0;
  state.depth = depthAt(scrollY + innerHeight * 0.5);

  // Lamp is offered from scene 3. Going back above it turns the lamp off.
  const lampAvailable = state.depth >= LAMP_FROM;
  if (!lampAvailable && state.lampOn) setLamp(false);
  lampBtn.hidden = !lampAvailable;

  if (state.lampFollow === 'target' || state.reduced) {
    const t = lampTarget(state.depth, state.compact);
    state.lampX = t.x; state.lampY = t.y;
  }

  // Number and zone name read the same state.depth. At 4,000m the zone line marks the last observation point.
  const shown = Math.round(state.depth);
  depthEl.textContent = shown.toLocaleString('ko-KR');
  zoneEl.textContent = shown >= MAX_DEPTH ? '이번 탐험의 마지막 관측 지점' : zoneFor(shown);

  renderDeepSea(state);
}

// ---------- lamp ----------
function setLamp(on) {
  state.lampOn = on;
  state.lampFollow = 'target'; // turning on always starts on the main subject
  lampBtn.setAttribute('aria-pressed', String(on));
  lampLabel.textContent = on ? '관측등 끄기' : '관측등 켜기';
}
lampBtn.addEventListener('click', () => { setLamp(!state.lampOn); schedule(); });

// Mouse only: the light follows the pointer. Touch never steers it, so vertical scroll stays free.
addEventListener('pointermove', (e) => {
  if (!state.lampOn || e.pointerType !== 'mouse' || state.reduced) return;
  const r = stage.getBoundingClientRect();
  state.lampFollow = 'pointer';
  state.lampX = (e.clientX - r.left) / r.width;
  state.lampY = (e.clientY - r.top) / r.height;
  schedule();
}, { passive: true });

// ---------- return to surface ----------
document.querySelector('[data-return]').addEventListener('click', () => {
  scrollTo({ top: 0, behavior: state.reduced ? 'auto' : 'smooth' });
  document.getElementById('top').focus({ preventScroll: true });
});

// ---------- environment ----------
function remeasure() { measure(); schedule(); }
addEventListener('scroll', schedule, { passive: true });
addEventListener('resize', remeasure);
addEventListener('orientationchange', remeasure);
addEventListener('pageshow', remeasure);
document.fonts?.ready.then(remeasure);
reducedMq.addEventListener('change', (e) => { state.reduced = e.matches; schedule(); });
compactMq.addEventListener('change', (e) => { state.compact = e.matches; remeasure(); });

remeasure(); // also restores the right depth after a reload in the middle of the page
