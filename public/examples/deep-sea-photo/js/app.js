// Wires pictures, scroll, buttons and pointer to the page. Version differences come only from data.js.
import { SCENES, SPECIES, ASSETS, CREDITS, VERSION } from './data.js';
import { createOpening, createSnow, ripple, alarm } from './scene.js';

const reducedMq = matchMedia('(prefers-reduced-motion: reduce)');
const reduced = () => reducedMq.matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const byId = Object.fromEntries(SPECIES.map((s) => [s.id, s]));

// ---------- pictures ----------
function setImg(img, key) {
  const a = ASSETS[key];
  if (!a) return;
  img.src = a.src;
  if (img.alt !== '' || img.closest('.creature, .bg')) img.alt = a.alt || '';
  // Blend on the outermost layer of the picture: a transformed or fading parent would otherwise
  // isolate the blend and show the photo's dark rectangle.
  const host = img.closest('.creature, .op-glimpse') || img;
  host.style.mixBlendMode = a.blend === 'screen' ? 'screen' : 'normal';
  img.hidden = false;
}
$$('img[data-asset]').forEach((img) => setImg(img, img.dataset.asset));
$$('.op-glimpse').forEach((g) => {
  const sp = byId[g.dataset.glimpse];
  setImg($('img', g), sp.img);
  $('img', g).alt = '';
  $('figcaption', g).textContent = sp.nameKo;
});
const tail = $('[data-tail]');
if (ASSETS.gulper.tail) { tail.style.setProperty('--tx', `${ASSETS.gulper.tail[0] * 100}%`); tail.style.setProperty('--tyy', `${ASSETS.gulper.tail[1] * 100}%`); }
else tail.hidden = true;

// ---------- opening ----------
const openingEl = $('.opening');
const opening = createOpening(openingEl);
opening.onEnd = () => {};
$('[data-skip]').addEventListener('click', () => { opening.finish(); $('#title').focus?.(); });
$('[data-replay]').addEventListener('click', () => { if (reduced()) return; scrollTo({ top: 0, behavior: 'auto' }); opening.play(); });
if (!reduced() && scrollY < 40) opening.play();

// ---------- scroll: per-scene progress (--p) and depth ----------
const sections = SCENES.map((s) => ({ ...s, el: document.getElementById(s.id) }));
const depthEl = $('[data-depth]');
const zoneEl = $('[data-zone]');
const snow = createSnow($('[data-snow]'));
let frame = 0;
function schedule() { if (!frame) frame = requestAnimationFrame(render); }

function render() {
  frame = 0;
  const vh = innerHeight;
  let depth = 0, zone = '수면';
  for (const s of sections) {
    const r = s.el.getBoundingClientRect();
    const run = Math.max(1, r.height - vh);
    const p = Math.min(1, Math.max(0, -r.top / run));
    s.el.style.setProperty('--p', p.toFixed(4));
    if (r.top <= vh * 0.5) { depth = s.start + p * (s.end - s.start); zone = s.zone; }
  }
  // At the very bottom the descent is complete, whatever the browser bars did to innerHeight.
  if (scrollY + vh >= document.documentElement.scrollHeight - 4) { depth = SCENES[SCENES.length - 1].end; zone = SCENES[SCENES.length - 1].zone; }
  const shown = Math.round(depth);
  depthEl.textContent = shown.toLocaleString('ko-KR');
  zoneEl.textContent = shown <= 0 ? '수면' : zone;
  snow.setDepth(depth);
  if (opening.playing && scrollY > 60) opening.finish();
}
addEventListener('scroll', schedule, { passive: true });

// Idle loops and marine snow run only while visible.
const live = new IntersectionObserver((entries) => entries.forEach((e) => e.target.classList.toggle('is-live', e.isIntersecting)));
[openingEl, ...sections.map((s) => s.el)].forEach((el) => live.observe(el));
function snowState() { if (reduced() || document.hidden) snow.stop(); else snow.start(); }
document.addEventListener('visibilitychange', snowState);

// ---------- 1. ripple ----------
const rippleArea = $('[data-ripple-area]');
const rippleLayer = $('[data-ripples]');
rippleArea.addEventListener('click', (e) => {
  if (e.target.closest('button, a')) return;
  const r = rippleArea.getBoundingClientRect();
  ripple(rippleLayer, e.clientX - r.left, e.clientY - r.top, reduced());
});
$('[data-ripple-btn]').addEventListener('click', () => {
  const r = rippleArea.getBoundingClientRect();
  ripple(rippleLayer, r.width * 0.62, r.height * 0.42, reduced());
});

// ---------- 2. day / night ----------
const s2 = $('#s2');
const timeStatus = $('[data-time-status]');
$$('[data-time-btn]').forEach((b) => b.addEventListener('click', () => {
  const t = b.dataset.timeBtn;
  s2.dataset.time = t;
  $$('[data-time-btn]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  timeStatus.textContent = t === 'night' ? '밤: 위쪽 바다로 올라온 시간' : '낮: 깊은 곳에 머무는 시간';
}));

// ---------- 3. Atolla alarm ----------
const ring = $('[data-alarm]');
$$('[data-alarm-btn]').forEach((b) => b.addEventListener('click', () => alarm(ring, reduced())));

// ---------- 4. lamp over the anglerfish ----------
const s4 = $('#s4');
const lampArea = $('[data-lamp-area]');
const lampBtn = $('[data-lamp-btn]');
const anglerImg = $('[data-angler] img');
const lureTop = $('[data-lure-top]');
let lampFollow = false;
function placeLure() {
  const box = lampArea.getBoundingClientRect(), im = anglerImg.getBoundingClientRect();
  const [fx, fy] = ASSETS.anglerfish.lure || [0.5, 0.5];
  lampArea.style.setProperty('--gx', `${im.left - box.left + im.width * fx}px`);
  lampArea.style.setProperty('--gy', `${im.top - box.top + im.height * fy}px`);
  lampArea.style.setProperty('--lr', `${Math.round(Math.min(box.width, box.height) * 0.3)}px`);
  if (!lampFollow) {
    lampArea.style.setProperty('--lx', `${im.left - box.left + im.width * 0.55}px`);
    lampArea.style.setProperty('--ly', `${im.top - box.top + im.height * 0.55}px`);
  }
}
lampBtn.addEventListener('click', () => {
  const on = s4.dataset.lamp !== 'on';
  s4.dataset.lamp = on ? 'on' : 'off';
  lampBtn.setAttribute('aria-pressed', String(on));
  lampBtn.textContent = on ? '관측등 끄기' : '관측등 켜기';
  lampFollow = false;
  placeLure();
});
let lampFrame = 0, lx = 0, ly = 0;
lampArea.addEventListener('pointermove', (e) => {
  if (s4.dataset.lamp !== 'on' || e.pointerType !== 'mouse' || reduced()) return;
  const box = lampArea.getBoundingClientRect();
  lx = e.clientX - box.left; ly = e.clientY - box.top; lampFollow = true;
  if (!lampFrame) lampFrame = requestAnimationFrame(() => {
    lampFrame = 0;
    lampArea.style.setProperty('--lx', `${lx}px`); lampArea.style.setProperty('--ly', `${ly}px`);
  });
});
anglerImg.addEventListener('load', placeLure);

// ---------- field guide ----------
const guide = $('[data-guide]');
const g = (n) => guide.querySelector(`[data-guide-${n}]`);
let opener = null;
function el(tag, text, attrs = {}) {
  const e = document.createElement(tag);
  if (text) e.textContent = text;
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  return e;
}
function picture(sp) {
  const a = ASSETS[sp.img];
  const im = el('img', '', { src: a.src, alt: '' });
  if (sp.img === 's1') im.className = 'cover';
  return im;
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
  g('src').replaceChildren(...sp.sources.map((s) => { const li = el('li'); li.append(el('a', s.label, { href: s.url, target: '_blank', rel: 'noopener' })); return li; }));
  g('art').replaceChildren(picture(sp));
  guide.showModal();
  g('name').focus();
}
guide.addEventListener('close', () => { opener?.focus({ preventScroll: true }); opener = null; });
guide.addEventListener('click', (e) => { if (e.target === guide) guide.close(); });

$('[data-dex]').replaceChildren(...SPECIES.map((sp) => {
  const li = el('li');
  const b = el('button', '', { type: 'button', 'data-spec': sp.id });
  const th = el('span', '', { class: 'thumb' }); th.append(picture(sp));
  b.append(th, el('b', sp.nameKo), el('small', sp.sci));
  li.append(b);
  return li;
}));
$$('[data-spec]').forEach((b) => b.addEventListener('click', () => openGuide(b.dataset.spec, b)));

// ---------- end: credits, version, return ----------
$('[data-version]').replaceChildren(
  document.createTextNode(`이 페이지는 ${VERSION}입니다. 같은 이야기를 다른 이미지로 만든 버전: `),
  el('a', VERSION === '실제 사진판' ? 'AI 생성 이미지판 보기' : '실제 사진판 보기', { href: VERSION === '실제 사진판' ? '../deep-sea-ai/' : '../deep-sea-photo/' }),
);
$('[data-credits]').replaceChildren(...CREDITS.map((c) => {
  const li = el('li');
  li.append(`${c.what}: ${c.by}, `);
  li.append(c.licenseUrl ? el('a', c.license, { href: c.licenseUrl }) : c.license);
  if (c.url) { li.append(', '); li.append(el('a', '원본', { href: c.url })); }
  if (c.note) li.append(`. ${c.note}`);
  return li;
}));
$('[data-return]').addEventListener('click', () => {
  scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' });
  openingEl.focus({ preventScroll: true });
});

// ---------- environment ----------
function remeasure() { snow.resize(); placeLure(); schedule(); }
addEventListener('resize', remeasure);
addEventListener('orientationchange', remeasure);
addEventListener('pageshow', remeasure);
document.fonts?.ready.then(remeasure);
reducedMq.addEventListener('change', () => { if (reduced()) opening.finish(); snowState(); });
remeasure();
snowState();
