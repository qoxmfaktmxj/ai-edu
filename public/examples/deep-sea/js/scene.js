// Draws every stage layer as a pure function of state, so scrolling back up restores the same picture.
// state: { depth, lampOn, lampX, lampY, compact, reduced } with lampX/lampY as 0..1 fractions of the stage.
import { WATER, MAX_DEPTH } from './data.js';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
// Rises over [a,b], holds, falls over [c,d].
const band = (a, b, c, d, x) => smooth(a, b, x) * (1 - smooth(c, d, x));

function hex(h) { return [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); }
function mix(h1, h2, t) {
  const a = hex(h1), b = hex(h2);
  return `rgb(${a.map((v, i) => Math.round(lerp(v, b[i], t))).join(',')})`;
}
function waterAt(d) {
  let i = 0;
  while (i < WATER.length - 2 && d >= WATER[i + 1].d) i++;
  const lo = WATER[i], hi = WATER[i + 1];
  const t = smooth(lo.d, hi.d, d);
  return lo.c.map((c, k) => mix(c, hi.c[k], t));
}

// Seeded generator so particles sit in the same place on every load.
function mulberry32(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(4000);
const PARTICLES = Array.from({ length: 40 }, () => {
  const z = rand(); // 0 far .. 1 near
  return { x: rand(), y: rand(), z, phase: rand() * 6.28 };
});

// Creature placement in stage fractions, keyed by the CSS variable prefix each drawing reads.
// Lamp targets and field-guide marks use the same numbers, so light, label and body stay aligned on resize.
// d -> { x, y, scale, present (0..1), base (opacity of the unlit silhouette) }
const CREATURES = {
  // sardine school, 0 - 200m scene
  f: (d, c, r) => ({ x: r ? 0.66 : lerp(0.82, 0.5, smooth(0, 300, d)), y: 0.62, scale: 1, present: band(10, 70, 170, 300, d), base: 0.6 }),
  // lanternfish, 200 - 1,000m scene
  n: (d, c) => { const t = smooth(200, 1000, d); return { x: lerp(c ? 0.7 : 0.76, c ? 0.62 : 0.6, t), y: lerp(0.86, 0.3, t), scale: 1, present: band(220, 380, 820, 1000, d), base: 0.95 }; },
  // Atolla, 1,000 - 2,200m scene
  j: (d, c) => { const t = smooth(1000, 2200, d); return { x: c ? 0.6 : 0.64, y: lerp(0.86, 0.34, t), scale: lerp(0.86, 1, t), present: band(850, 1250, 1950, 2250, d), base: 0.95 }; },
  // anglerfish, late in the 1,000 - 2,200m scene
  a: (d, c) => { const t = smooth(1550, 2300, d); return { x: c ? 0.32 : 0.42, y: lerp(0.92, 0.56, t), scale: 1, present: band(1550, 1800, 2150, 2350, d), base: 1 }; },
  // gulper eel, 2,200 - 3,500m scene
  p: (d, c) => { const t = smooth(2200, 3500, d); return { x: c ? 0.62 : 0.7, y: lerp(0.78, 0.46, t), scale: lerp(0.94, 1, t), present: band(2150, 2550, 3300, 3600, d), base: 0.85 }; },
  // dumbo octopus, last observation point
  u: (d, c) => { const t = smooth(3400, 3950, d); return { x: c ? 0.56 : 0.58, y: lerp(0.86, 0.52, t), scale: 1, present: smooth(3400, 3750, d), base: 0.9 }; },
};

// Where the lamp points when it is not following a mouse: the subject of the current part of the descent.
export function lampTarget(d, compact) {
  const k = d < 1950 ? 'j' : d < 2250 ? 'a' : d < 3450 ? 'p' : 'u';
  return CREATURES[k](d, compact, false);
}

export function initDeepSea(stage) {
  const el = {
    canvas: stage.querySelector('[data-particles]'),
  };
  const ctx = el.canvas.getContext('2d');
  let w = 0, h = 0, dpr = 1;

  function resize() {
    dpr = Math.min(2, devicePixelRatio || 1);
    w = stage.clientWidth; h = stage.clientHeight;
    el.canvas.width = Math.round(w * dpr); el.canvas.height = Math.round(h * dpr);
  }

  function drawParticles(s) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const d = s.depth;
    const total = s.compact ? 20 : 40;
    const count = Math.round(total * (1 - 0.55 * smooth(3500, 4000, d))); // fewer at the last point
    const lampR = lampRadius(s);
    const lx = s.lampX * w, ly = s.lampY * h;
    const lit = s.lampOn && d >= 900;
    for (let i = 0; i < count; i++) {
      const p = PARTICLES[i];
      // Camera descends, so particles slide up the screen; near ones (z~1) move faster than far ones.
      const travel = s.reduced ? 0 : d * (0.00035 + p.z * 0.0016);
      const y = (((p.y - travel) % 1) + 1) % 1 * (h + 40) - 20;
      const x = (p.x + (s.reduced ? 0 : Math.sin(d * 0.002 + p.phase) * 0.012 * p.z)) * w;
      let r = 0.6 + p.z * 2.2;
      let a = 0.1 + p.z * 0.32;
      if (lit) {
        const dist = Math.hypot(x - lx, y - ly) / lampR;
        if (dist < 1) { const k = (1 - dist) ** 1.5; a += k * 0.6 * (0.4 + p.z); r *= 1 + k * 0.5; }
      }
      ctx.globalAlpha = clamp(a);
      ctx.fillStyle = '#E8F4F6';
      ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function lampRadius(s) {
    return Math.min(w, h) * (s.compact ? 0.3 : 0.22);
  }

  resize();
  stageEl = stage;
  rootEl = stage.parentElement; // variables live on <main> so the field-guide marks can read them too
  api = { resize, drawParticles, lampRadius };
  return api;
}

let stageEl = null;
let rootEl = null;
let api = null;

export function renderDeepSea(s) {
  const stage = stageEl;
  const d = clamp(s.depth, 0, MAX_DEPTH);
  const set = (k, v) => rootEl.style.setProperty(k, v);

  const [w0, w1, w2] = waterAt(d);
  set('--w0', w0); set('--w1', w1); set('--w2', w2);

  // Surface recedes upward and fades by ~260m.
  set('--sy', `${(-clamp(d / 220) * 120).toFixed(1)}%`);
  set('--so', (1 - smooth(60, 260, d)).toFixed(3));

  // Sun rays: broad at the top, narrower and dimmer through the twilight zone, gone near 1,000m.
  set('--ro', (lerp(1, 0.55, smooth(0, 200, d)) * (1 - smooth(450, 1000, d))).toFixed(3));
  set('--rs', lerp(1, 0.45, smooth(150, 1000, d)).toFixed(3));

  // Creatures. Returns how present each one is, for the field-guide marks.
  const present = {};
  for (const [k, pose] of Object.entries(CREATURES)) {
    const c = pose(d, s.compact, s.reduced);
    present[k] = c.present;
    set(`--${k}x`, c.x.toFixed(3)); set(`--${k}y`, c.y.toFixed(3));
    set(`--${k}s`, (s.reduced ? 1 : c.scale).toFixed(3));
    set(`--${k}o`, (c.present * c.base).toFixed(3)); set(`--${k}p`, c.present.toFixed(3));
  }

  // Scene 5: a narrow observation window.
  set('--vig', smooth(3350, 3950, d).toFixed(3));

  // Lamp.
  const lampOn = s.lampOn && d >= 900;
  stage.dataset.lamp = lampOn ? 'on' : 'off';
  set('--lx', `${(s.lampX * 100).toFixed(2)}%`);
  set('--ly', `${(s.lampY * 100).toFixed(2)}%`);
  set('--lr', `${Math.round(api.lampRadius(s))}px`);

  api.drawParticles({ ...s, depth: d });
  return present;
}
