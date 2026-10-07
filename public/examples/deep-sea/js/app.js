// Turns real scroll, buttons and pointer into state, then renders once per frame.
import { SCENES, MAX_DEPTH, LAMP_FROM, SPECIES } from './data.js';
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

  const present = renderDeepSea(state);
  updateMarks(present);
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

// ---------- field guide ----------
const byId = Object.fromEntries(SPECIES.map((sp) => [sp.id, sp]));
const marks = [...document.querySelectorAll('.mark')];
const guide = document.querySelector('[data-guide]');
const g = (name) => guide.querySelector(`[data-guide-${name}]`);
let opener = null;

marks.forEach((m) => {
  const sp = byId[m.dataset.spec];
  m.querySelector('[data-mark-name]').textContent = sp.nameKo;
  m.setAttribute('aria-label', `${sp.nameKo} 도감 카드 열기`);
});
document.querySelectorAll('.spec-chip').forEach((c) => {
  const sp = byId[c.dataset.spec];
  c.textContent = sp.nameKo;
  c.setAttribute('aria-haspopup', 'dialog');
});

// A mark shows only while its creature is clearly in view. hidden is touched only when it changes.
function updateMarks(present) {
  for (const m of marks) {
    const show = present[m.dataset.k] > 0.45;
    if (m.hidden === show) m.hidden = !show;
  }
}

function el(tag, text, attrs = {}) {
  const e = document.createElement(tag);
  if (text) e.textContent = text;
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  return e;
}

function openGuide(id, from) {
  const sp = byId[id];
  opener = from;
  g('no').textContent = `No. ${sp.no}`;
  g('group').textContent = sp.group;
  g('name').textContent = sp.nameKo;
  g('sci').textContent = sp.sci;
  g('en').textContent = sp.nameEn;
  g('depth').textContent = sp.depth;
  g('size').textContent = sp.size;
  g('facts').replaceChildren(...sp.facts.map((f) => el('li', f)));
  g('src').replaceChildren(...sp.sources.map((s) => {
    const li = el('li'); li.append(el('a', s.label, { href: s.url, target: '_blank', rel: 'noopener' })); return li;
  }));
  // Card picture: the same drawing as on stage, silhouette plus the lit detail.
  const art = el('div', '', { class: `art-stack art-${sp.art}` });
  document.querySelectorAll(`.stage > .creature.${sp.art} svg, .detail .creature.${sp.art} svg`)
    .forEach((svg) => art.append(svg.cloneNode(true)));
  g('art').replaceChildren(art);
  guide.showModal();
  g('name').focus();
}
guide.addEventListener('close', () => { opener?.focus({ preventScroll: true }); opener = null; });
// Click on the dimmed backdrop closes the card.
guide.addEventListener('click', (e) => { if (e.target === guide) guide.close(); });
document.querySelectorAll('[data-spec]').forEach((b) =>
  b.addEventListener('click', () => openGuide(b.dataset.spec, b)));

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
