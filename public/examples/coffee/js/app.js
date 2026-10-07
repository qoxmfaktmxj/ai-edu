// Wires photos, overlays, scroll and buttons.
import { SCENES, CREDITS } from './data.js';
import { placeFrame, put, createOpening, holdButton, fallDrops, sweep, makeBubbles, bloom } from './scene.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reducedMq = matchMedia('(prefers-reduced-motion: reduce)');
const reduced = () => reducedMq.matches;
const compactMq = matchMedia('(max-width: 767px)');

// ---------- photos ----------
const frames = [];   // { frame, scene, box element, overlay placer }
$$('[data-shot]').forEach((f) => { const s = SCENES[f.dataset.shot]; $('img', f).src = s.src; frames.push({ frame: f, scene: s, host: $('.op-stage') }); });
$$('.scene').forEach((sec) => {
  const s = SCENES[sec.dataset.scene];
  const f = $('[data-frame]', sec);
  $('img', f).src = s.src;
  frames.push({ frame: f, scene: s, host: $('.sticky', sec), id: sec.dataset.scene });
});

// Overlay positions, in pixels of the frame, recomputed on every layout.
function placeOverlays(id, frame, { fw, fh }) {
  const s = SCENES[id];
  const P = ([x, y]) => ({ x: x * fw, y: y * fh });
  if (id === 'bean') put($('[data-wisps]', frame), { x: 0.14 * fw, y: -0.06 * fh, w: 0.32 * fw, h: 0.3 * fh });
  if (id === 'grind') {
    const c = P(s.crank), d = 0.2 * fw;
    put($('[data-ring]', frame), { x: c.x - d / 2, y: c.y - d / 2, w: d, h: d });
    put($('[data-grounds]', frame), P(s.drawer));
  }
  if (id === 'setup') {
    const f = P(s.filter), o = P(s.outlet), fl = P(s.floor);
    put($('[data-sheen]', frame), { x: f.x - 0.1 * fw, y: f.y - 0.04 * fh, w: 0.2 * fw, h: 0.08 * fh });
    put($('[data-setup-drops]', frame), { x: o.x, y: o.y, h: fl.y - o.y });
  }
  if (id === 'bloom') {
    const b = P(s.bed);
    put($('[data-bubbles]', frame), { x: b.x - s.bedR[0] * fw, y: b.y - s.bedR[1] * fh, w: 2 * s.bedR[0] * fw, h: 2 * s.bedR[1] * fh });
  }
  if (id === 'pour') {
    const a = P(s.spout), b = P(s.land), o = P(s.outlet), su = P(s.surface);
    const len = Math.hypot(b.x - a.x, b.y - a.y), ang = Math.atan2(b.x - a.x, b.y - a.y);
    const st = $('[data-stream]', frame);
    put(st, { x: a.x, y: a.y, h: len });
    st.style.width = ''; // width comes from CSS so the pouring state can thicken it
    st.style.transform = `rotate(${(-ang * 180) / Math.PI}deg)`;
    const drops = $('[data-pour-drops]', frame);
    put(drops, { x: o.x, y: o.y, h: su.y - o.y });
    drops.style.setProperty('--fall', `${su.y - o.y}px`);
    put($('[data-wave]', frame), { x: su.x - 0.05 * fw, y: su.y - 0.012 * fw, w: 0.1 * fw, h: 0.024 * fw });
  }
  if (id === 'cup') put($('[data-steam]', frame), { x: (s.steam[0] - 0.07) * fw, y: (s.steam[1] - 0.3) * fh, w: 0.14 * fw, h: 0.3 * fh });
}
function placeOpeningSteam(frame, { fw, fh }) {
  const s = SCENES.cup;
  put($('[data-steam]', frame), { x: (s.steam[0] - 0.07) * fw, y: (s.steam[1] - 0.3) * fh, w: 0.14 * fw, h: 0.3 * fh });
}

function layout() {
  const compact = compactMq.matches;
  frames.forEach(({ frame, scene, host, id }) => {
    const size = placeFrame(frame, scene, { w: host.clientWidth, h: host.clientHeight }, compact);
    if (id) placeOverlays(id, frame, size);
    else if (frame.dataset.shot === 'cup') placeOpeningSteam(frame, size);
  });
}

// ---------- opening ----------
const openingEl = $('.opening');
const opening = createOpening(openingEl);
$('[data-skip]').addEventListener('click', () => opening.finish());
$('[data-replay]').addEventListener('click', () => { if (!reduced()) { scrollTo({ top: 0, behavior: 'auto' }); opening.play(); } });
if (!reduced() && scrollY < 40) opening.play();

// ---------- scroll: --p per scene, current step ----------
const sections = $$('.scene');
const nav = $$('[data-go]');
let frameReq = 0, current = -1;
function render() {
  frameReq = 0;
  const vh = innerHeight;
  let active = -1;
  sections.forEach((sec, i) => {
    const r = sec.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)));
    sec.style.setProperty('--p', p.toFixed(4));
    if (r.top <= vh * 0.5) active = i;
  });
  if (active !== current) {
    current = active;
    nav.forEach((a, i) => (i === active ? a.setAttribute('aria-current', 'step') : a.removeAttribute('aria-current')));
  }
  if (opening.playing && scrollY > 60) opening.finish();
}
const schedule = () => { if (!frameReq) frameReq = requestAnimationFrame(render); };
addEventListener('scroll', schedule, { passive: true });
nav.forEach((a) => a.addEventListener('click', (e) => {
  e.preventDefault();
  const sec = document.getElementById(a.dataset.go);
  scrollTo({ top: sec.getBoundingClientRect().top + scrollY, behavior: reduced() ? 'auto' : 'smooth' });
  sec.setAttribute('tabindex', '-1'); sec.focus({ preventScroll: true });
}));
const live = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('is-live', e.isIntersecting)));
[openingEl, ...sections].forEach((s) => live.observe(s));

// ---------- 1. aroma ----------
const wisps = $('[data-wisps]');
$('[data-aroma]').addEventListener('click', () => {
  wisps.classList.remove('is-on'); void wisps.getBoundingClientRect(); wisps.classList.add('is-on');
});

// ---------- 2. grind (press and hold) ----------
const grindFrame = $('#grind [data-frame]');
const ring = $('[data-ring]'), ringFill = $('[data-ring-fill]'), grounds = $('[data-grounds]'), grindStatus = $('[data-grind-status]');
let ground = 0, grindRaf = 0, lastT = 0, lastSpawn = 0;
function grindTick(t) {
  const dt = Math.min(0.05, (t - lastT) / 1000); lastT = t;
  ground = Math.min(1, ground + dt / 3.2);
  ringFill.style.strokeDashoffset = String(276.5 * (1 - ground));
  grindStatus.textContent = ground < 1 ? `갈리는 중 ${Math.round(ground * 100)}%` : '고르게 갈렸습니다. 다음 단계로 내려가 보세요.';
  if (!reduced() && t - lastSpawn > 70 && ground < 1) { lastSpawn = t; spawnGround(); }
  if (ground < 1) grindRaf = requestAnimationFrame(grindTick); else stopGrind();
}
function spawnGround() {
  if (grounds.childElementCount > 24) grounds.firstElementChild.remove();
  const s = document.createElement('span');
  s.style.left = `${(Math.random() - 0.5) * 26}px`;
  grounds.append(s);
  s.animate([{ opacity: 0, transform: 'translate(0, 0)' }, { opacity: 1, offset: 0.15 }, { opacity: 0, transform: `translate(${(Math.random() - 0.5) * 30}px, ${30 + Math.random() * 30}px)` }],
    { duration: 700, easing: 'cubic-bezier(0.5, 0, 1, 1)' }).finished.then(() => s.remove(), () => s.remove());
}
function stopGrind() { cancelAnimationFrame(grindRaf); grindRaf = 0; grindFrame.classList.remove('is-jitter'); }
holdButton($('[data-grind]'), () => {
  if (ground >= 1) { ground = 0; }
  ring.classList.add('is-on'); grindFrame.classList.add('is-jitter');
  lastT = performance.now(); grindRaf = requestAnimationFrame(grindTick);
}, () => { stopGrind(); if (ground < 1) grindStatus.textContent = `잠시 멈춤 ${Math.round(ground * 100)}%. 다시 누르면 이어서 갈립니다.`; });

// ---------- 3. rinse the filter ----------
const sheen = $('[data-sheen]');
const setupDrops = $$('[data-setup-drops] span');
$('[data-rinse]').addEventListener('click', () => {
  sweep(sheen, reduced());
  fallDrops(setupDrops, $('[data-setup-drops]').clientHeight, { reduced: reduced() });
});

// ---------- 4. bloom ----------
const bubbles = $('[data-bubbles]');
makeBubbles(bubbles);
$('[data-bloom]').addEventListener('click', () => bloom($('#bloom [data-frame]'), bubbles, reduced()));

// ---------- 5. pour (press and hold) ----------
const pourSec = $('#pour'), pourStatus = $('[data-pour-status]');
holdButton($('[data-pour]'), () => { pourSec.classList.add('is-pouring'); pourStatus.textContent = '붓는 중'; },
  () => { pourSec.classList.remove('is-pouring'); pourStatus.textContent = '잠시 멈춤. 물을 나눠 붓는 사이 커피가 내려옵니다.'; });

// ---------- 6. end ----------
$('[data-credits]').replaceChildren(...CREDITS.map((c) => { const li = document.createElement('li'); li.textContent = `${c.what}: ${c.by}. 실제 도구와 모양이 다를 수 있습니다.`; return li; }));
$('[data-restart]').addEventListener('click', () => { scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' }); openingEl.focus({ preventScroll: true }); });

// ---------- environment ----------
function remeasure() { layout(); schedule(); }
addEventListener('resize', remeasure);
addEventListener('orientationchange', remeasure);
addEventListener('pageshow', remeasure);
document.fonts?.ready.then(remeasure);
compactMq.addEventListener('change', remeasure);
reducedMq.addEventListener('change', () => { if (reduced()) opening.finish(); });
remeasure();
