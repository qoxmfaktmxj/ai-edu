// Wires the map, travel, per-world actions and the opening.
import { BODIES, EARTH_KM, BACKDROP, CREDITS } from './data.js';
import { createWarp, createOpening, createTravel } from './scene.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reducedMq = matchMedia('(prefers-reduced-motion: reduce)');
const reduced = () => reducedMq.matches;

const el = {
  stage: $('[data-stage]'), body: $('[data-body]'), zoom: $('[data-zoom]'), img: $('[data-body-img]'),
  flares: $('[data-flares]'), night: $('[data-night]'), axis: $('[data-axis]'),
  compare: $('[data-compare]'), compareImg: $('[data-compare] img'),
  kind: $('[data-kind]'), name: $('[data-name]'), intro: $('[data-intro]'), action: $('[data-action]'), compareBtn: $('[data-compare-btn]'),
  status: $('[data-status]'), stats: $('[data-stats]'), facts: $('[data-facts]'), src: $('[data-src]'), panel: $('#panel'),
};
$('[data-stars]').src = BACKDROP.stars;
$('[data-orbit]').src = BACKDROP.orbit;
$('[data-op-sun]').src = BODIES[0].img;
$('[data-credits]').textContent = CREDITS;
const earth = BODIES.find((b) => b.id === 'earth');
el.compareImg.src = earth.img;
BODIES.forEach((b) => { const i = new Image(); i.src = b.img; }); // preload so travel never waits on the network

// ---------- map ----------
const map = $('[data-map]');
map.replaceChildren(...BODIES.map((b, i) => {
  const li = document.createElement('li');
  const btn = Object.assign(document.createElement('button'), { type: 'button' });
  btn.dataset.go = String(i);
  btn.setAttribute('aria-label', `${b.nameKo}로 이동`);
  btn.append(Object.assign(document.createElement('img'), { src: b.img, alt: '' }), b.nameKo);
  li.append(btn);
  return li;
}));
const mapBtns = $$('[data-go]');

// Korean object particle: 을 after a final consonant, 를 otherwise.
const eul = (w) => { const c = w.charCodeAt(w.length - 1) - 0xac00; return c >= 0 && c <= 11171 && c % 28 ? `${w}을` : `${w}를`; };

// ---------- state ----------
let current = 0;
const warp = createWarp($('[data-warp]'));
const travel = createTravel(el.body, warp);

function resetActions() {
  el.zoom.classList.remove('is-zoomed');
  el.flares.classList.remove('is-on');
  el.night.classList.remove('is-on');
  el.axis.classList.remove('is-on');
  el.compare.classList.remove('is-on');
  el.action.setAttribute('aria-pressed', 'false');
  el.compareBtn.setAttribute('aria-pressed', 'false');
  el.status.textContent = '';
}

function render(i) {
  const b = BODIES[i];
  resetActions();
  el.img.src = b.img;
  el.img.alt = `${b.nameKo}(AI 생성 이미지)`;
  el.body.classList.toggle('is-wide', !!b.wide);
  el.kind.textContent = b.kind;
  el.name.textContent = b.nameKo;
  el.intro.textContent = b.intro;
  el.stats.replaceChildren(...Object.entries(b.stats).map(([k, v]) => {
    const d = document.createElement('div');
    d.append(Object.assign(document.createElement('dt'), { textContent: k }), Object.assign(document.createElement('dd'), { textContent: v }));
    return d;
  }));
  el.facts.replaceChildren(...b.facts.map((f) => Object.assign(document.createElement('li'), { textContent: f })));
  el.src.replaceChildren('출처: ', ...b.sources.flatMap((s, k) => [k ? ', ' : '', Object.assign(document.createElement('a'), { href: s.url, textContent: s.label, target: '_blank', rel: 'noopener' })]));
  el.action.hidden = !b.action;
  if (b.action) el.action.textContent = b.action.label;
  el.compareBtn.hidden = b.id === 'earth';
  mapBtns.forEach((m, k) => m.setAttribute('aria-current', String(k === i)));
  const list = map, cur = mapBtns[i].parentElement; // keep the current world visible in a scrolled map (phones)
  list.scrollTo({ left: cur.offsetLeft - (list.clientWidth - cur.clientWidth) / 2, behavior: reduced() ? 'auto' : 'smooth' });
  [el.kind, el.name, el.intro, el.stats, el.facts].forEach((n) => { n.classList.remove('swap'); void n.offsetWidth; n.classList.add('swap'); });
}

function go(i) {
  i = (i + BODIES.length) % BODIES.length;
  if (i === current && !opening.open) return;
  current = i;
  history.replaceState(null, '', `#${BODIES[i].id}`);
  if (opening.open) opening.close();
  travel(() => render(i), reduced());
}

// ---------- per-world actions ----------
el.action.addEventListener('click', () => {
  const b = BODIES[current], a = b.action;
  if (a.type === 'flare') {
    el.flares.classList.remove('is-on'); void el.flares.getBoundingClientRect(); el.flares.classList.add('is-on');
    el.status.textContent = '태양 가장자리로 솟아오르는 홍염을 표현했습니다.';
  } else if (a.type === 'day') {
    el.night.classList.remove('is-on'); void el.night.getBoundingClientRect(); el.night.classList.add('is-on');
    el.status.textContent = '낮과 밤의 경계선이 지구 위를 지나갑니다. 지구의 하루는 약 23.9시간입니다.';
  } else if (a.type === 'zoom') {
    const on = !el.zoom.classList.contains('is-zoomed');
    el.compare.classList.remove('is-on'); el.compareBtn.setAttribute('aria-pressed', 'false');
    el.zoom.style.setProperty('--zx', `${a.at[0] * 100}%`); el.zoom.style.setProperty('--zy', `${a.at[1] * 100}%`); el.zoom.style.setProperty('--zs', String(a.scale));
    el.zoom.classList.toggle('is-zoomed', on);
    el.action.setAttribute('aria-pressed', String(on));
    el.status.textContent = on ? `${a.label}: 다시 누르면 원래 크기로 돌아갑니다.` : '';
  } else if (a.type === 'axis') {
    const on = !el.axis.classList.contains('is-on');
    el.axis.classList.toggle('is-on', on);
    el.action.setAttribute('aria-pressed', String(on));
    el.status.textContent = on ? '자전축이 약 98도 기울어 거의 옆으로 누운 채 돕니다.' : '';
  }
});

// Earth at the true diameter ratio. When the world is smaller than Earth, the world shrinks instead.
el.compareBtn.addEventListener('click', () => {
  const on = el.compareBtn.getAttribute('aria-pressed') !== 'true';
  el.compareBtn.setAttribute('aria-pressed', String(on));
  const b = BODIES[current];
  el.zoom.classList.remove('is-zoomed'); el.action.setAttribute('aria-pressed', 'false');
  if (!on) { el.compare.classList.remove('is-on'); el.status.textContent = ''; return; }
  const ratio = b.diameterKm / EARTH_KM;
  const bw = el.body.clientWidth, discPx = bw * b.disc;
  const sb = el.stage.getBoundingClientRect(), bb = el.body.getBoundingClientRect();
  let ew, x, y;
  if (ratio >= 1) {
    // Earth at its true size next to the bigger world, by the lower left of its disc.
    ew = Math.max(4, discPx / ratio / earth.disc);
    x = Math.max(8, bb.left - sb.left + bw * (0.5 - b.disc / 2) - ew * 0.9);
    y = Math.min(sb.height - ew - 40, bb.top - sb.top + bb.height * 0.72);
  } else {
    // The world is smaller than Earth: shrink it toward the right and show Earth on the left at the same scale.
    const k = 0.58;
    el.zoom.style.setProperty('--zx', '96%'); el.zoom.style.setProperty('--zy', '50%'); el.zoom.style.setProperty('--zs', String(ratio * k));
    el.zoom.classList.add('is-zoomed');
    ew = (discPx * k) / earth.disc;
    x = Math.max(8, bb.left - sb.left);
    y = bb.top - sb.top + (bb.height - ew) / 2;
  }
  el.compareImg.style.width = `${ew}px`;
  Object.assign(el.compare.style, { left: `${x}px`, top: `${y}px` });
  el.compare.classList.add('is-on');
  const n = ratio >= 1 ? `약 ${ratio >= 10 ? Math.round(ratio) : ratio.toFixed(1)}배` : `약 ${ratio.toFixed(2)}배`;
  el.status.textContent = ratio >= 1 ? `${b.nameKo}의 지름은 지구의 ${n}입니다.` : `${b.nameKo}의 지름은 지구의 ${n}입니다. 이번에는 ${eul(b.nameKo)} 줄여서 보여 줍니다.`;
});

// ---------- tilt by dragging, gentle star parallax ----------
let drag = null;
el.body.addEventListener('pointerdown', (e) => { drag = { x: e.clientX, y: e.clientY }; el.body.setPointerCapture(e.pointerId); });
el.body.addEventListener('pointermove', (e) => {
  if (!drag || reduced()) return;
  el.body.style.setProperty('--tx', `${Math.max(-28, Math.min(28, (e.clientX - drag.x) * 0.15))}deg`);
  el.body.style.setProperty('--ty', `${Math.max(-28, Math.min(28, -(e.clientY - drag.y) * 0.15))}deg`);
});
['pointerup', 'pointercancel', 'lostpointercapture'].forEach((t) => el.body.addEventListener(t, () => { drag = null; el.body.style.setProperty('--tx', '0deg'); el.body.style.setProperty('--ty', '0deg'); }));
let pf = 0;
addEventListener('pointermove', (e) => {
  if (e.pointerType !== 'mouse' || reduced() || pf) return;
  pf = requestAnimationFrame(() => {
    pf = 0;
    const sp = $('.space');
    sp.style.setProperty('--sx', `${(e.clientX / innerWidth - 0.5) * -1.6}%`);
    sp.style.setProperty('--sy', `${(e.clientY / innerHeight - 0.5) * -1.6}%`);
  });
}, { passive: true });

// ---------- navigation ----------
mapBtns.forEach((m) => m.addEventListener('click', () => go(Number(m.dataset.go))));
$('[data-prev]').addEventListener('click', () => go(current - 1));
$('[data-next]').addEventListener('click', () => go(current + 1));
addEventListener('keydown', (e) => {
  if (e.target.closest('input, textarea, summary') || e.altKey || e.ctrlKey || e.metaKey) return;
  if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); }
});

// ---------- opening ----------
const opening = createOpening($('[data-intro-layer]'), warp, BODIES.slice(1).map((b) => b.img));
$('[data-skip]').addEventListener('click', () => opening.finish());
$('[data-start]').addEventListener('click', () => { opening.close(); render(current); el.panel.focus({ preventScroll: true }); });
$('[data-replay]').addEventListener('click', () => { if (reduced()) opening.showFinal(); else opening.play(); });

const fromHash = BODIES.findIndex((b) => `#${b.id}` === location.hash);
if (fromHash >= 0) { current = fromHash; render(current); opening.close(); }
else { render(0); if (reduced()) opening.showFinal(); else opening.play(); }
$('.viewer').classList.add('is-live');

addEventListener('resize', () => warp.resize());
reducedMq.addEventListener('change', () => { if (reduced()) opening.finish(); });
