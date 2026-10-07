// Draws the whole pour-over from one number. renderCoffee(progress) touches only attributes,
// so the same progress always gives the same picture: scrolling back, jumping or reloading mid-page.
// Motion patterns (hyperframes-animation rules, re-timed to scroll progress instead of a clock):
//   nudge-curve          -> cup, dripper and filter settle on one axis (slow, fast, long soft tail)
//   control-target-sync  -> one driver (pour amount) moves kettle angle, stream, pooled water and cup level together
//   layer order + clip   -> beans sink behind the grinder mouth; liquid and coffee bed stay inside their vessels
import { T, CUP_FILL } from './data.js';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const win = ([a, b], x) => smooth(a, b, x);
const frac = (x) => x - Math.floor(x);

// nudge-curve: 20% time for 10% distance (ease in), 18% for 65% (linear), 62% for 25% (power4 out).
function nudge(t) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  if (t < 0.2) { const u = t / 0.2; return 0.1 * u * u * u; }
  if (t < 0.38) return 0.1 + 0.65 * ((t - 0.2) / 0.18);
  const u = (t - 0.38) / 0.62;
  return 0.75 + 0.25 * (1 - (1 - u) ** 4);
}
const nudgeIn = ([a, b], x) => nudge(clamp((x - a) / (b - a)));

function mix(h1, h2, t) {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const a = p(h1), b = p(h2);
  return `rgb(${a.map((v, i) => Math.round(lerp(v, b[i], t))).join(',')})`;
}

// Bean start poses (scene 1) and their spots at the grinder mouth.
const BEANS = [
  { x: 400, y: 430, s: 2.3, r: -12, hx: 400, hy: 356 },
  { x: 236, y: 300, s: 0.95, r: 20, hx: 378, hy: 362 },
  { x: 578, y: 286, s: 0.85, r: -35, hx: 422, hy: 360 },
  { x: 262, y: 594, s: 0.9, r: 40, hx: 389, hy: 348 },
  { x: 562, y: 604, s: 1, r: 10, hx: 411, hy: 350 },
];
const HOP_SCALE = 0.62;

// Fixed geometry (viewBox units).
const PIVOT = { x: 640, y: 330 };      // kettle turns around its body
const TIP = { x: 475, y: 247 };        // spout tip at rest (end of the down-turned nozzle)
const BED_TOP = 452;                   // dry coffee surface inside the filter
const BED_X = [360, 440];              // stream must land inside this part of the coffee surface
const OUTLET_Y = 570;                  // dripper outlet, start of drops
const CUP_BOTTOM = 806, CUP_INNER = 806 - 563;

function rotate(pt, deg) {
  const r = (deg * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r);
  const dx = pt.x - PIVOT.x, dy = pt.y - PIVOT.y;
  return { x: PIVOT.x + dx * c - dy * s, y: PIVOT.y + dx * s + dy * c };
}

// Pour amount 0..1: kettle tilts a moment before water leaves and returns right after.
function pourAmount(p) {
  let v = 0;
  for (const [a, b] of T.pours) v = Math.max(v, smooth(a - 0.006, a + 0.002, p) * (1 - smooth(b - 0.003, b + 0.006, p)));
  return v;
}

let el = null;

export function initCoffee(svg) {
  const q = (s) => svg.querySelector(s);
  const qa = (s) => [...svg.querySelectorAll(s)];
  el = {
    beans: q('[data-beans]'), bean: qa('[data-bean]'),
    grinder: q('[data-grinder]'), crank: q('[data-crank]'), grounds: qa('[data-grounds] circle'), pile: q('[data-pile]'),
    saucer: q('[data-saucer]'),
    cup: q('[data-cup]'), liquid: q('[data-liquid]'), surface: q('[data-surface]'),
    drops: qa('[data-drops] ellipse'), ripples: qa('[data-ripples] ellipse'),
    inner: q('[data-dripper-inner]'), front: q('[data-dripper-front]'), filter: q('[data-filter]'),
    bed: q('[data-bed]'), bedFill: q('[data-bed-fill]'), pool: q('[data-pool]'), bubbles: qa('[data-bubbles] circle'),
    stream: q('[data-stream]'), kettle: q('[data-kettle]'), tilt: q('[data-kettle-tilt]'), steam: q('[data-steam]'),
  };
}

const set = (node, attrs) => { for (const k in attrs) node.setAttribute(k, attrs[k]); };
const op = (node, v) => node.setAttribute('opacity', clamp(v).toFixed(3));

export function renderCoffee(progress, { reduced = false } = {}) {
  const p = clamp(progress);

  // ---- 1. beans travel to the grinder mouth, then sink behind it ----
  const travel = win(T.beansToHopper, p);
  const sink = win(T.beansDrop, p);
  el.beans.setAttribute('clip-path', p >= T.beansDrop[0] - 0.005 ? 'url(#aboveHopper)' : 'none');
  op(el.beans, p < T.beansDrop[1] + 0.01 ? 1 : 0);
  el.bean.forEach((g, i) => {
    const b = BEANS[i];
    const x = lerp(b.x, b.hx, travel);
    const y = lerp(b.y, b.hy, travel) + sink * 70;
    const s = lerp(b.s, HOP_SCALE, travel);
    const r = reduced ? 0 : b.r + 80 * travel;
    g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${r.toFixed(1)}) scale(${s.toFixed(3)})`);
  });

  // ---- 2. grinder ----
  const gIn = win(T.grinderIn, p), gOut = win(T.grinderOut, p);
  el.grinder.setAttribute('transform', `translate(${(-380 * gOut).toFixed(1)} ${(70 * (1 - gIn)).toFixed(1)})`);
  op(el.grinder, gIn * (1 - gOut));
  el.crank.setAttribute('transform', `rotate(${reduced ? 0 : (720 * win(T.crank, p)).toFixed(1)} 400 342)`);
  const grinding = p >= T.grounds[0] && p <= T.grounds[1] && !reduced;
  el.grounds.forEach((c, i) => {
    if (!grinding) return op(c, 0);
    const ph = frac(p * 40 + i / el.grounds.length);
    set(c, { cx: (400 + (((i * 37) % 17) - 8) * 0.9 + ph * ((i % 5) - 2) * 3).toFixed(1), cy: (662 + ph * 116).toFixed(1) });
    op(c, 1 - ph * 0.4);
  });
  const heap = win(T.grounds, p);
  set(el.pile, { rx: (18 + 34 * heap).toFixed(1), ry: (2 + 12 * heap).toFixed(1), cy: (790 - 6 * heap).toFixed(1) });
  op(el.pile, heap > 0.01 ? 1 : 0);

  // ---- 3. cup, dripper and filter settle on one axis ----
  const show = win([0.28, 0.31], p);
  const align = nudgeIn(T.align, p);
  const alignFilter = nudgeIn([T.align[0] + 0.02, T.align[1]], p);
  const aside = nudgeIn(T.dripperAside, p);
  const cupX = -170 * (1 - align) + 40 * aside;
  el.cup.setAttribute('transform', `translate(${cupX.toFixed(1)} 0)`);
  el.steam.setAttribute('transform', `translate(${cupX.toFixed(1)} 0)`);
  op(el.cup, show);
  // Dripper parts share one transform so the filter mask, coffee bed and water move with the body.
  const dx = 150 * (1 - align) - 250 * aside, dy = -120 * (1 - align) + 246 * aside;
  const dripT = `translate(${dx.toFixed(1)} ${dy.toFixed(1)})`;
  el.inner.setAttribute('transform', dripT);
  el.front.setAttribute('transform', dripT);
  op(el.inner, show); op(el.front, show);
  el.filter.setAttribute('transform', `translate(0 ${(-110 * (1 - alignFilter)).toFixed(1)})`);
  const bedIn = win(T.bedIn, p);
  el.bed.setAttribute('transform', `translate(0 ${(-30 * (1 - bedIn)).toFixed(1)})`);
  op(el.bed, bedIn);
  op(el.saucer, win([0.9, 0.93], p));

  // ---- 4/5. kettle, stream, pooled water, wet bed (control-target-sync: one pour amount drives them) ----
  const kIn = win(T.kettleIn, p), kOut = win(T.kettleOut, p);
  const pour = pourAmount(p);
  // The kettle leans in while pouring so the spout sits over the coffee and the stream falls straight.
  const tx = 260 * (1 - kIn) + 260 * kOut - 24 * pour;
  const ty = -80 * pour; // and lifts, so the gooseneck clears the dripper rim
  const angle = -20 * pour;
  el.kettle.setAttribute('transform', `translate(${tx.toFixed(1)} ${ty.toFixed(1)})`);
  el.tilt.setAttribute('transform', `rotate(${angle.toFixed(2)} ${PIVOT.x} ${PIVOT.y})`);
  op(el.kettle, kIn * (1 - kOut));

  const pool = Math.max(
    0.25 * smooth(0.47, 0.5, p) * (1 - smooth(0.5, 0.55, p)),
    smooth(0.615, 0.7, p) * (1 - smooth(0.72, 0.775, p)),
    0.9 * smooth(0.765, 0.82, p) * (1 - smooth(0.83, 0.885, p)),
  );
  const poolH = 60 * pool;
  set(el.pool, { y: (BED_TOP - poolH).toFixed(1), height: (poolH + 2).toFixed(1) });
  el.bedFill.setAttribute('fill', mix('#7B5236', '#3D2416', win(T.wet, p)));
  el.bubbles.forEach((c, i) => op(c, smooth(0.48 + i * 0.008, 0.5 + i * 0.008, p) * (1 - smooth(0.58, 0.62, p)) * 0.9));

  // Stream: starts at the current spout tip, ends on the current coffee or water surface.
  // It grows down when a pour starts and its tail falls when the pour stops, so no water hangs in the air.
  const tip = rotate(TIP, angle);
  const A = { x: tip.x + tx, y: tip.y + ty };
  const Bp = { x: clamp(A.x, BED_X[0] + dx, BED_X[1] + dx), y: BED_TOP - poolH + dy };
  let head = 0, tail = 1;
  for (const [a, b] of T.pours) {
    const g = smooth(a, a + 0.01, p), t = smooth(b - 0.001, b + 0.01, p);
    if (g > 0 && t < 1) { head = g; tail = t; }
  }
  if (head > 0 && tail < 1) {
    set(el.stream, {
      x1: lerp(A.x, Bp.x, tail).toFixed(1), y1: lerp(A.y, Bp.y, tail).toFixed(1),
      x2: lerp(A.x, Bp.x, head).toFixed(1), y2: lerp(A.y, Bp.y, head).toFixed(1),
    });
    op(el.stream, 1);
  } else op(el.stream, 0);

  // ---- 5. drops from the outlet to the current cup level, and the level itself ----
  const fill = CUP_FILL * win(T.drip, p);
  const levelY = CUP_BOTTOM - fill * CUP_INNER;
  set(el.liquid, { y: levelY.toFixed(1), height: (CUP_BOTTOM - levelY).toFixed(1) });
  const leftX = 296 + 19 * ((levelY - 563) / 235);
  set(el.surface, { cy: levelY.toFixed(1), rx: (400 - leftX).toFixed(1) });
  op(el.surface, fill > 0.005 ? 1 : 0);

  const dripOn = p >= T.drip[0] && p <= T.drip[1];
  const density = smooth(T.drip[0], T.drip[0] + 0.015, p) * (1 - smooth(T.drip[1] - 0.045, T.drip[1], p));
  const count = Math.round(el.drops.length * density);
  el.drops.forEach((d, i) => {
    const r = el.ripples[i];
    if (!dripOn || i >= count || (reduced && i > 0)) { op(d, 0); op(r, 0); return; }
    const ph = reduced ? 0.5 : frac(p * 90 + i / el.drops.length);
    set(d, { cx: 400, cy: lerp(OUTLET_Y, levelY - 4, ph).toFixed(1) });
    op(d, 1);
    if (ph > 0.85 && !reduced) {
      const k = (ph - 0.85) / 0.15;
      set(r, { cy: levelY.toFixed(1), rx: (4 + 18 * k).toFixed(1), ry: (1 + 4 * k).toFixed(1) });
      op(r, 1 - k);
    } else op(r, 0);
  });

  // ---- 6. steam: a few thin lines, tied to scroll ----
  op(el.steam, win(T.steam, p) * 0.8);
  el.steam.style.strokeDasharray = '8 10';
  el.steam.style.strokeDashoffset = reduced ? '0' : String((-p * 600).toFixed(1));
}
