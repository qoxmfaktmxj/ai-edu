'use strict';
/* 장면 그리기, 생물, 입자. 모두 Canvas 2D 코드로 그린다. 이미지 파일은 없다. */

const cv = document.getElementById('scene');
const ctx = cv.getContext('2d');
let W = 1, H = 1, DPR = 1, RANGE = 1, U = 1, MOBILE = false;
const MAXD = 11000, EXP = 1.8;
const RET_ASC = 2.4, RET_END = 3.3;

// script.js 가 매 프레임 갱신하는 공유 상태
const ST = {
  mode: 'intro',     // intro | dive | bottom | return
  openT: 0, hold: false, retT: 0,
  rm: false,
  depth: 0, scroll: 0, speed: 0, T: 0,
  wdt: 0, dt: 0.016,
  frozen: false,
  shake: 0, shx: 0, shy: 0, black: 0, flow: 0, flashCool: 0,
  tag: ''
};

/* ---------- 도우미 ---------- */
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, t) => a + (b - a) * t;
function smooth(a, b, v) { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hash(i) { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
function noise1(x) { return 0.5 * Math.sin(x * 0.011) + 0.3 * Math.sin(x * 0.027 + 1.7) + 0.2 * Math.sin(x * 0.071 + 3.1); }
function sFromDepth(d) { return Math.pow(clamp(d, 0, MAXD) / MAXD, 1 / EXP) * RANGE; }
function depthFromS(s) { return MAXD * Math.pow(clamp(s / RANGE, 0, 1), EXP); }
function sunAt(d) { return d >= 1000 ? 0 : Math.pow(1 - d / 1000, 3); }
function wrapX(v, span, margin) { return (((v % span) + span) % span) - margin; }
function rgba(r, g, b, a) { return 'rgba(' + (r | 0) + ',' + (g | 0) + ',' + (b | 0) + ',' + a.toFixed(3) + ')'; }

/* 빛 번짐용 스프라이트 (색마다 한 번만 그린다) */
const spriteCache = {};
function sprite(r, g, b) {
  const k = r + ',' + g + ',' + b;
  if (spriteCache[k]) return spriteCache[k];
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const x = c.getContext('2d');
  const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, rgba(r, g, b, 1));
  gr.addColorStop(0.16, rgba(r, g, b, 0.6));
  gr.addColorStop(0.48, rgba(r, g, b, 0.15));
  gr.addColorStop(1, rgba(r, g, b, 0));
  x.fillStyle = gr;
  x.fillRect(0, 0, 64, 64);
  spriteCache[k] = c;
  return c;
}
const SP = {
  cyan: sprite(90, 230, 255), teal: sprite(80, 255, 215), blue: sprite(60, 140, 255),
  white: sprite(235, 248, 255), amber: sprite(255, 196, 110), green: sprite(120, 255, 160),
  lure: sprite(170, 255, 190), red: sprite(255, 80, 70), ice: sprite(170, 220, 255)
};
function glow(sp, x, y, rad, a) {
  if (a <= 0.004) return;
  ctx.globalAlpha = a > 1 ? 1 : a;
  ctx.drawImage(sp, x - rad, y - rad, rad * 2, rad * 2);
}

/* ---------- 입력 상태: 관측등 ---------- */
const lamp = { x: 0, y: 0, tx: 0, ty: 0, has: false, r: 200, lx: 0, ly: 0, lt: 0, speed: 0 };

/* ---------- 입자 ---------- */
const SNOWL = [
  { par: 0.35, fall: 6, size: 1.1, a: 0.32 },
  { par: 0.75, fall: 12, size: 1.9, a: 0.46 },
  { par: 1.35, fall: 22, size: 3.2, a: 0.6 }
];
let snow = [], plank = [];
const trail = [], bubbles = [], spray = [], ripples = [], minis = [];
let schools = [], lanterns = [], atollas = [], siphons = [], anglers = [], dumbos = [], hiddens = [];
const sonar = { on: false, t: 0, r: 0, cx: 0, cy: 0, id: 0, speed: 700, maxR: 900 };

function initParticles() {
  const r = rng(11);
  const cnt = MOBILE ? [230, 150, 70] : [560, 360, 160];
  snow = [];
  for (let l = 0; l < 3; l++) {
    for (let i = 0; i < cnt[l]; i++) {
      snow.push({ x: r() * W, y: r() * H, l, s: SNOWL[l].size * (0.6 + r() * 0.9) * (MOBILE ? 0.9 : 1), ph: r() * 6.28, v: 0.7 + r() * 0.6 });
    }
  }
  plank = [];
  const np = MOBILE ? 70 : 120;
  for (let i = 0; i < np; i++) plank.push({ x: r() * W, y: r() * H, e: 0, ph: r() * 6.28, s: 0.6 + r() * 0.8 });
}

function buildWorld() {
  // 햇빛층 물고기 떼
  schools = [
    mkSchool(8, 1, 46, 3, 34), mkSchool(70, -1, 40, 5, 28), mkSchool(150, 1, 36, 9, 40)
  ];
  schools[0].off = W * 0.3 + 300 - 4 * schools[0].speed; // 오프닝이 끝날 즈음 화면 왼쪽 가운데쯤에 있도록
  // 샛비늘치 무리
  lanterns = [mkLantern(330, 1, 6), mkLantern(560, -1, 8), mkLantern(800, 1, 10)];
  // 아톨라해파리
  atollas = [
    { d: 1260, xf: 0.72, ph: 0.4 }, { d: 1950, xf: 0.3, ph: 2.1 }, { d: 2700, xf: 0.68, ph: 4.0 },
    { d: 9200, xf: 0.58, ph: 1.3 }
  ].map(a => Object.assign(a, { act: 0, t: 0 }));
  // 관해파리 (빛 구슬 사슬)
  siphons = [
    { d: 1450, ph: 0.2, dir: 1 }, { d: 2300, ph: 2.4, dir: -1 }, { d: 3350, ph: 4.4, dir: 1 },
    { d: 7600, ph: 1.0, dir: -1 }, { d: 10100, ph: 3.2, dir: 1 }
  ];
  // 초롱아귀
  anglers = [
    { d: 1760, xf: 0.36, ph: 0.8 }, { d: 3100, xf: 0.66, ph: 3.3 }
  ].map(a => Object.assign(a, { st: -1, cool: 0, armed: true }));
  // 덤보문어
  dumbos = [{ d: 4450, xf: 0.4, ph: 0.5 }, { d: 4950, xf: 0.68, ph: 2.6 }, { d: 5450, xf: 0.3, ph: 4.4 }];
  // 소나로 드러나는 숨은 생물
  const K = ['squid', 'fish', 'school'];
  const hd = [1150, 1620, 2120, 2520, 2900, 3500, 3800, 4200, 4700, 5100, 5700, 6400, 7000, 7800, 8600, 9400, 10200, 10700];
  hiddens = hd.map((d, i) => ({
    d, xf: 0.22 + 0.56 * hash(i + 3), kind: K[i % 3], dir: i % 2 ? -1 : 1, rev: -1, pid: 0, ph: i * 1.7
  }));
}

function mkSchool(d, dir, n, seed, speed) {
  const r = rng(seed * 101 + d);
  const fish = [];
  for (let i = 0; i < n; i++) {
    fish.push({ ox: (r() + r() - 1) * 190, oy: (r() + r() - 1) * 70, ph: r() * 6.28, sz: 5 + r() * 4, dx: 0, dy: 0, vx: 0, vy: 0 });
  }
  return { d, dir, fish, speed, off: r() * 3000 };
}
function mkLantern(d, dir, seed) {
  const r = rng(seed * 77 + d);
  const fish = [];
  for (let i = 0; i < 30; i++) {
    fish.push({ ox: (r() + r() - 1) * 200, oy: (r() + r() - 1) * 80, ph: r() * 6.28, len: 20 + r() * 10 });
  }
  return { d, dir, fish, speed: 34 + seed * 2, off: r() * 3000 };
}

function resizeScene() {
  W = window.innerWidth; H = window.innerHeight;
  DPR = Math.min(2, window.devicePixelRatio || 1);
  cv.width = Math.round(W * DPR);
  cv.height = Math.round(H * DPR);
  cv.style.width = W + 'px';
  cv.style.height = H + 'px';
  MOBILE = W <= 700;
  U = clamp(0.45 + Math.min(W, H) / 1100, 0.7, 1.3);
  lamp.r = clamp(Math.min(W, H) * 0.3, 150, 300);
  if (!lamp.has) { lamp.x = lamp.tx = W / 2; lamp.y = lamp.ty = H / 2; }
  initParticles();
}

/* ---------- 입력에서 들어오는 호출 ---------- */
function lampMove(x, y, touch) {
  const now = performance.now();
  const ty = touch ? y - 46 : y;
  if (lamp.has) {
    const dx = x - lamp.lx, dy = ty - lamp.ly;
    const dist = Math.hypot(dx, dy);
    const sp = dist / (Math.max(8, now - lamp.lt) / 1000);
    lamp.speed = sp;
    if (sp > (MOBILE ? 380 : 600) && ST.depth >= 980 && !ST.frozen && dist > 3) {
      const n = Math.min(9, Math.ceil(dist / 20));
      for (let i = 0; i < n; i++) {
        const k = (i + Math.random()) / n;
        emitTrail(lamp.lx + dx * k, lamp.ly + dy * k);
      }
    }
  }
  lamp.tx = x; lamp.ty = ty; lamp.has = true;
  lamp.lx = x; lamp.ly = ty; lamp.lt = now;
}
function emitTrail(x, y) {
  const cap = MOBILE ? 110 : 240;
  if (trail.length >= cap) trail.shift();
  const life = 0.9 + Math.random() * 0.9;
  trail.push({ x: x + (Math.random() - 0.5) * 12, y: y + (Math.random() - 0.5) * 12, vx: (Math.random() - 0.5) * 22, vy: (Math.random() - 0.5) * 22 - 6, life, max: life, s: (3 + Math.random() * 6) * U });
}

function sonarStart() {
  if (ST.frozen || sonar.on) return false;
  sonar.on = true; sonar.t = 0; sonar.id++;
  sonar.cx = W / 2; sonar.cy = H / 2;
  sonar.speed = 520 + Math.min(W, H) * 0.35;
  sonar.maxR = Math.hypot(W, H) * 0.55 + 40;
  AudioFX.ping();
  return true;
}

function sceneTap(x, y) {
  if (ST.mode !== 'dive' && ST.mode !== 'bottom') return;
  if (ST.depth >= 900) {
    for (const a of atollas) {
      const p = atollaPos(a);
      if (Math.hypot(x - p.x, y - p.y) < Math.max(80 * U, 46)) {
        a.act = 4.2; a.t = 0;
        AudioFX.blip();
        return;
      }
    }
    // 어두운 물을 휘저으면 생물 발광이 번진다
    if (!ST.frozen) for (let i = 0; i < 12; i++) emitTrail(x, y);
  } else if (ST.depth < 320) {
    ripples.push({ x, y, t: 0 });
    for (const s of schools) {
      const cy = ey(s, 0.9), cx = schoolX(s);
      for (const f of s.fish) {
        const fx = cx + f.ox + f.dx, fy = cy + f.oy + f.dy;
        const dist = Math.hypot(fx - x, fy - y);
        const R = 280 * U;
        if (dist < R && dist > 0.5) {
          const k = (1 - dist / R) * 760;
          f.vx += (fx - x) / dist * k; f.vy += (fy - y) / dist * k;
        }
      }
    }
    if (!ST.rm) {
      for (let i = 0; i < 14; i++) {
        const a = Math.random() * 6.283, v = 160 + Math.random() * 260;
        minis.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1.7, max: 1.7, s: (4 + Math.random() * 3) * U });
      }
    }
  }
}

/* ---------- 위치 계산 ---------- */
function ey(e, par) { return H * 0.5 + (sFromDepth(e.d) - ST.scroll) * par; }
function schoolX(s) { return wrapX(ST.T * s.speed * s.dir + s.off, W + 600, 300); }
function atollaPos(a) { return { x: W * a.xf + Math.sin(ST.T * 0.31 + a.ph) * 20 * U, y: ey(a, 0.9) + Math.sin(ST.T * 0.5 + a.ph) * 12 * U }; }
function anglerPos(a) { return { x: W * a.xf + Math.sin(ST.T * 0.6 + a.ph) * 22 * U, y: ey(a, 0.9) + Math.sin(ST.T * 0.9 + a.ph) * 12 * U }; }
function dumboPos(e) { return { x: W * e.xf + Math.sin(ST.T * 0.25 + e.ph) * 70 * U, y: ey(e, 0.8) + Math.sin(ST.T * 0.45 + e.ph) * 16 * U }; }
function hiddenPos(h) { return { x: W * h.xf + Math.sin(ST.T * 0.2 + h.ph) * 40 * U, y: ey(h, 0.85) }; }
function groundH(d) {
  const plain = smooth(3900, 4700, d) * (1 - smooth(5700, 6400, d)) * 0.32;
  const bot = smooth(10400, 11000, d) * 0.38;
  return Math.max(plain, bot);
}
function wallEdge(side, y) {
  const t = clamp((ST.depth - 6000) / 5000, 0, 1);
  const half = 0.62 - 0.46 * Math.pow(t, 0.7);
  const base = W * (0.5 + side * half);
  const amp = W * 0.05 * (0.5 + t);
  return base + noise1(y * 0.9 + ST.scroll * 0.95 + side * 600) * amp;
}

/* ---------- 갱신 ---------- */
function updateScene(dt) {
  const w = ST.wdt, sp = ST.mode === 'return' ? Math.abs(ST.speed) : ST.speed;
  ST.flow = sp;
  ST.dt = dt;
  const T = ST.T;

  // 흔들림 크기
  let sh = 0;
  if (!ST.rm) {
    if (ST.mode === 'intro' && ST.openT > 1 && ST.openT < 2.1) sh = 18 * Math.pow(1 - (ST.openT - 1) / 1.1, 2);
    if (ST.mode === 'return' && ST.retT > RET_ASC) { const u = (ST.retT - RET_ASC) / (RET_END - RET_ASC); if (u > 0.1 && u < 0.7) sh = 14 * Math.pow(1 - (u - 0.1) / 0.6, 2); }
    if (ST.mode === 'return' && ST.retT < RET_ASC) sh = 2.5 * smooth(0.2, 1.6, ST.retT);
    for (const a of anglers) if (a.st >= 0 && a.st < 0.35) sh = Math.max(sh, 7 * (1 - a.st / 0.35));
  }
  ST.shake = sh;
  ST.shx = (Math.random() - 0.5) * 2 * sh;
  ST.shy = (Math.random() - 0.5) * 2 * sh;

  // 관측등
  if (!lamp.has) {
    lamp.tx = W * 0.5 + Math.sin(T * 0.5) * W * 0.1;
    lamp.ty = H * 0.5 + Math.cos(T * 0.37) * H * 0.08;
  }
  const k = 1 - Math.exp(-dt * 16);
  lamp.x += (lamp.tx - lamp.x) * k;
  lamp.y += (lamp.ty - lamp.y) * k;

  // 해양설 (속도만큼 위로 흐른다)
  for (const p of snow) {
    const L = SNOWL[p.l];
    p.y += (L.fall * p.v - sp * L.par) * w;
    p.x += Math.sin(T * 0.4 + p.ph) * 6 * w * L.par;
    if (p.y < -30) { p.y += H + 60; p.x = Math.random() * W; }
    else if (p.y > H + 30) { p.y -= H + 60; p.x = Math.random() * W; }
    if (p.x < -10) p.x += W + 20; else if (p.x > W + 10) p.x -= W + 20;
  }

  // 발광 플랑크톤
  const dark = ST.depth >= 1000;
  for (const p of plank) {
    p.y += (-sp * 0.9 + 4) * w;
    if (p.y < -20) { p.y += H + 40; p.x = Math.random() * W; }
    else if (p.y > H + 20) { p.y -= H + 40; p.x = Math.random() * W; }
    if (dark && !ST.rm && p.e < 0.1 && Math.random() < Math.min(0.06, Math.abs(sp) * 0.00002)) p.e = 1;
    p.e *= Math.exp(-dt * 1.7);
  }

  // 기포
  if (ST.mode === 'dive' || ST.mode === 'bottom') {
    if (!ST.frozen && !ST.rm) {
      const rate = 3.5 + Math.min(70, Math.abs(sp) / 80);
      let n = rate * w;
      while (n > 0) {
        if (Math.random() < n) {
          addBubble(Math.random() * W, Math.abs(sp) > 600 ? Math.random() * H : H + 20, (1.6 + Math.random() * 5) * U, -(30 + Math.random() * 50), false);
        }
        n -= 1;
      }
    }
  }
  if (ST.mode === 'return' && ST.retT < RET_ASC - 0.1 && Math.random() < 0.9) {
    const n = 7;
    for (let i = 0; i < n; i++) addBubble(Math.random() * W, H + 30 + Math.random() * 120, (2 + Math.random() * 12) * U, -(900 + Math.random() * 1700), true);
  }
  for (let i = bubbles.length - 1; i >= 0; i--) {
    const b = bubbles[i];
    if (b.top) { b.vy -= (ST.mode === 'intro' ? 420 : 0) * w; b.y += b.vy * w; }
    else b.y += (b.vy - sp) * w;
    b.x += Math.sin(T * 2.2 + b.ph) * 14 * w;
    if (b.y < -b.r * 2 - 20 || b.y > H + 200) bubbles.splice(i, 1);
  }
  for (let i = spray.length - 1; i >= 0; i--) {
    const p = spray[i];
    p.vy += 900 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt;
    if (p.life <= 0) spray.splice(i, 1);
  }

  // 햇빛층 물고기 떼
  for (const s of schools) {
    for (const f of s.fish) {
      f.vx += -f.dx * 7 * dt; f.vy += -f.dy * 7 * dt;
      const damp = Math.exp(-dt * 2.6);
      f.vx *= damp; f.vy *= damp;
      f.dx += f.vx * dt; f.dy += f.vy * dt;
    }
  }
  for (let i = minis.length - 1; i >= 0; i--) {
    const m = minis[i];
    const damp = Math.exp(-dt * 2.2);
    m.vx *= damp; m.vy *= damp;
    m.x += m.vx * dt; m.y += m.vy * dt; m.life -= dt;
    if (m.life <= 0) minis.splice(i, 1);
  }
  for (let i = ripples.length - 1; i >= 0; i--) { ripples[i].t += dt; if (ripples[i].t > 2) ripples.splice(i, 1); }

  // 생물 발광 흔적
  for (let i = trail.length - 1; i >= 0; i--) {
    const p = trail[i];
    p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt;
    if (p.life <= 0) trail.splice(i, 1);
  }

  // 아톨라
  for (const a of atollas) { if (a.act > 0) { a.act -= dt; a.t += dt; } }

  // 소나
  if (sonar.on) {
    sonar.t += dt;
    sonar.r = sonar.t * sonar.speed;
    for (const h of hiddens) {
      const p = hiddenPos(h);
      if (p.y < -260 || p.y > H + 260) continue;
      if (sonar.r >= Math.hypot(p.x - sonar.cx, p.y - sonar.cy) - 30 && h.pid !== sonar.id) { h.pid = sonar.id; h.rev = 0; }
    }
    if (sonar.r > sonar.maxR) sonar.on = false;
  }
  for (const h of hiddens) { if (h.rev >= 0) { h.rev += dt; if (h.rev > 1.5) h.rev = -1; } }

  // 초롱아귀: 관측등이 미끼에 가까워지면 입이 드러난다
  const trig = 118 * U;
  if (ST.flashCool > 0) ST.flashCool -= dt;
  for (const a of anglers) {
    const p = anglerPos(a);
    if (a.st >= 0) {
      a.st += dt;
      if (a.st > (ST.rm ? 2.2 : 1.4)) { a.st = -1; a.cool = 6; }
    } else {
      if (a.cool > 0) a.cool -= dt;
      const dd = Math.hypot(lamp.x - p.x, lamp.y - p.y);
      a.near = dd < trig * 2.4 ? 1 - dd / (trig * 2.4) : 0;
      if (dd > trig * 2.2) a.armed = true;
      if (a.armed && a.cool <= 0 && ST.flashCool <= 0 && dd < trig && ST.depth >= 1000 && p.y > 0 && p.y < H && (ST.mode === 'dive' || ST.mode === 'bottom') && !ST.frozen) {
        a.st = 0; a.armed = false; ST.flashCool = 1.5;
        AudioFX.thud(false);
      }
    }
  }
}

function addBubble(x, y, r, vy, top) {
  if (bubbles.length > 560) return;
  bubbles.push({ x, y, r, vy, ph: Math.random() * 6.28, top });
}
function spawnPlunge() {
  if (ST.rm) return;
  const y0 = H * 0.56;
  for (let i = 0; i < 330; i++) {
    spray.push({ x: Math.random() * W, y: y0 + (Math.random() - 0.3) * 30, vx: (Math.random() - 0.5) * 260, vy: -(180 + Math.random() * 760), life: 0.7 + Math.random() * 1.1, s: (1.5 + Math.random() * 6) * U });
  }
  for (let i = 0; i < (MOBILE ? 150 : 260); i++) {
    addBubble(Math.random() * W, y0 + Math.random() * (H - y0 + 120), (2 + Math.pow(Math.random(), 2.2) * 30) * U, -(60 + Math.random() * 380), true);
  }
}
function spawnBreak() {
  if (ST.rm) return;
  const y0 = H * 0.3;
  for (let i = 0; i < 300; i++) {
    spray.push({ x: Math.random() * W, y: y0 + Math.random() * 60, vx: (Math.random() - 0.5) * 300, vy: -(260 + Math.random() * 820), life: 0.8 + Math.random() * 1.2, s: (1.5 + Math.random() * 6) * U });
  }
}

/* ---------- 그리기: 배경 ---------- */
const BG = [
  [0, [34, 176, 208], [10, 92, 148]], [120, [16, 120, 176], [8, 66, 118]], [250, [8, 76, 138], [4, 42, 92]],
  [500, [4, 38, 86], [2, 20, 52]], [750, [2, 18, 44], [1, 9, 24]], [920, [1, 6, 16], [0, 2, 7]], [1000, [0, 0, 0], [0, 0, 0]]
];
function drawBackground(d) {
  let a = BG[0], b = BG[0], t = 0;
  if (d >= 1000) { a = b = BG[BG.length - 1]; }
  else {
    for (let i = 0; i < BG.length - 1; i++) {
      if (d >= BG[i][0] && d < BG[i + 1][0]) { a = BG[i]; b = BG[i + 1]; t = (d - a[0]) / (b[0] - a[0]); break; }
    }
  }
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, rgba(lerp(a[1][0], b[1][0], t), lerp(a[1][1], b[1][1], t), lerp(a[1][2], b[1][2], t), 1));
  g.addColorStop(1, rgba(lerp(a[2][0], b[2][0], t), lerp(a[2][1], b[2][1], t), lerp(a[2][2], b[2][2], t), 1));
  ctx.fillStyle = g;
  ctx.fillRect(-30, -30, W + 60, H + 60);
}

function drawRays(sun, boost) {
  const a = sun * boost;
  if (a < 0.01) return;
  const T = ST.T;
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 8; i++) {
    const fl = 0.62 + 0.38 * Math.sin(T * 0.55 + i * 2.3);
    const bx = W * (0.04 + i * 0.135) + Math.sin(T * 0.17 + i * 1.7) * W * 0.03;
    const wt = W * (0.018 + 0.03 * hash(i + 40));
    const wb = wt * (3 + 2 * hash(i + 60));
    const sl = H * 0.3;
    const x1 = bx - sl;
    const g = ctx.createLinearGradient(bx, 0, x1, H * 0.95);
    g.addColorStop(0, rgba(200, 248, 255, Math.min(0.5, 0.36 * a * fl)));
    g.addColorStop(0.6, rgba(120, 210, 255, 0.1 * a * fl));
    g.addColorStop(1, rgba(100, 190, 255, 0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(bx - wt, -10); ctx.lineTo(bx + wt, -10);
    ctx.lineTo(x1 + wb, H); ctx.lineTo(x1 - wb, H);
    ctx.closePath();
    ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';
}

// 빛 무늬 (물결 아래 일렁이는 빛 그물)
const CW = 112, CH = 64;
const ccan = document.createElement('canvas');
ccan.width = CW; ccan.height = CH;
const cctx = ccan.getContext('2d');
const cimg = cctx.createImageData(CW, CH);
let cFrame = 0;
function updateCaustics(t) {
  const data = cimg.data, TAU = 6.283185307, tt = t * 0.45 + 23.0;
  let k = 0;
  for (let j = 0; j < CH; j++) {
    const py = ((j / CH) * TAU * 2) % TAU - 250;
    for (let i = 0; i < CW; i++) {
      const px = ((i / CW) * TAU * 2) % TAU - 250;
      let ix = px, iy = py, c = 1;
      for (let n = 0; n < 4; n++) {
        const tn = tt * (1 - 3.5 / (n + 1));
        const ox = ix, oy = iy;
        ix = px + Math.cos(tn - ox) + Math.sin(tn + oy);
        iy = py + Math.sin(tn - oy) + Math.cos(tn + ox);
        c += 1 / Math.hypot(px / (Math.sin(ix + tn) / 0.005), py / (Math.cos(iy + tn) / 0.005));
      }
      c /= 4;
      c = 1.17 - Math.pow(c, 1.4);
      let v = Math.pow(Math.abs(c), 8);
      if (v > 1) v = 1;
      data[k++] = 170; data[k++] = 240; data[k++] = 255; data[k++] = v * 255;
    }
  }
  cctx.putImageData(cimg, 0, 0);
}
function drawCaustics(sun) {
  const a = sun * 0.55;
  if (a < 0.02) return;
  if ((cFrame++ % 3) === 0) updateCaustics(ST.T);
  ctx.globalCompositeOperation = 'lighter';
  ctx.globalAlpha = Math.min(0.5, a);
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(ccan, 0, 0, W, H);
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
}

// 수면 아래에서 올려다본 반짝이는 수면
function drawSurface(boost) {
  const sy = -ST.scroll;
  if (sy < -H * 0.35) return;
  const T = ST.T;
  ctx.globalCompositeOperation = 'lighter';
  const g = ctx.createLinearGradient(0, sy - 20, 0, sy + H * 0.3);
  g.addColorStop(0, rgba(220, 252, 255, 0.62 * boost));
  g.addColorStop(0.35, rgba(150, 230, 255, 0.2 * boost));
  g.addColorStop(1, rgba(100, 200, 255, 0));
  ctx.fillStyle = g;
  ctx.fillRect(0, sy - 20, W, H * 0.3 + 20);
  ctx.lineWidth = 2;
  for (let k = 0; k < 6; k++) {
    ctx.strokeStyle = rgba(255, 255, 255, (0.3 - k * 0.04) * boost);
    ctx.beginPath();
    const yy = sy + 16 + k * 20;
    for (let x = 0; x <= W; x += 14) {
      const y = yy + Math.sin(x * 0.012 * (1 + k * 0.3) + T * (0.8 + k * 0.2)) * (5 + k * 2) + Math.sin(x * 0.031 - T * 1.3) * 2;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.globalCompositeOperation = 'source-over';
}

/* ---------- 수면 위 (오프닝, 귀환) ---------- */
function waterState() {
  if (ST.mode === 'intro') {
    const t = ST.openT;
    if (t < 1) return { y0: H * 0.56 + Math.sin(ST.T * 1.1) * 3, cover: 1, amp: 1.8, foam: 0 };
    if (t < 2.05) {
      const u = t - 1, e = u * u * (3 - 2 * u);
      const foam = u < 0.16 ? u / 0.16 * 0.82 : Math.max(0, 0.82 * (1 - (u - 0.16) / 0.8));
      return { y0: lerp(H * 0.56, -H * 0.32, e), cover: clamp(1 - u / 0.22, 0, 1), amp: 2 + 9 * Math.sin(Math.min(1, u) * Math.PI), foam: ST.rm ? 0 : foam };
    }
    return null;
  }
  if (ST.mode === 'return' && ST.retT > RET_ASC - 0.05) {
    const u = clamp((ST.retT - RET_ASC) / (RET_END - RET_ASC), 0, 1), e = u * u * (3 - 2 * u);
    const foam = u < 0.2 ? u / 0.2 * 0.82 : Math.max(0, 0.82 * (1 - (u - 0.2) / 0.7));
    return { y0: lerp(-H * 0.32, H * 0.56, e), cover: clamp((u - 0.6) / 0.4, 0, 1), amp: 2 + 9 * Math.sin(u * Math.PI), foam };
  }
  return null;
}

function drawAbove(ws) {
  const y0 = ws.y0, T = ST.T, sunX = W * 0.64;
  // 바다 표면 (수면 위에서 본 모습)
  if (ws.cover > 0.002 && y0 < H) {
    ctx.globalAlpha = ws.cover;
    const g = ctx.createLinearGradient(0, y0, 0, H);
    g.addColorStop(0, '#6b6f96'); g.addColorStop(0.07, '#2f4d78'); g.addColorStop(0.4, '#0f2c4d'); g.addColorStop(1, '#051a30');
    ctx.fillStyle = g;
    ctx.fillRect(0, y0, W, H - y0 + 2);
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 64; i++) {
      const k = i / 64, yy = y0 + 4 + Math.pow(k, 1.7) * (H - y0);
      const wd = (8 + k * 80) * (0.4 + 0.6 * hash(i + 9));
      const xx = sunX + (hash(i + 21) - 0.5) * (30 + k * 360);
      const al = (0.16 + 0.3 * hash(i + 33)) * (0.5 + 0.5 * Math.sin(T * 2 + i)) * (1 - k * 0.5);
      ctx.fillStyle = rgba(255, 214, 160, al * ws.cover);
      ctx.fillRect(xx - wd / 2, yy, wd, 1.5 + k * 2.4);
    }
    ctx.lineWidth = 1;
    for (let j = 0; j < 12; j++) {
      const yy = y0 + 10 + Math.pow(j / 12, 1.7) * (H - y0);
      ctx.strokeStyle = rgba(190, 210, 245, 0.09 * ws.cover);
      ctx.beginPath();
      for (let x = 0; x <= W; x += 20) {
        const y = yy + Math.sin(x * 0.01 + T * 0.8 + j) * (1 + j * 0.8);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
  }
  // 하늘
  if (y0 > 2) {
    const g = ctx.createLinearGradient(0, 0, 0, y0);
    g.addColorStop(0, '#0a1030'); g.addColorStop(0.35, '#2b2f6e'); g.addColorStop(0.62, '#8b4f86'); g.addColorStop(0.82, '#ef8a78'); g.addColorStop(1, '#ffd49a');
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(-10, -10); ctx.lineTo(W + 10, -10);
    for (let x = W + 10; x >= -10; x -= 18) ctx.lineTo(x, y0 + Math.sin(x * 0.018 + T * 2.2) * ws.amp);
    ctx.closePath();
    ctx.fillStyle = g;
    ctx.fill();
    ctx.clip();
    // 별
    for (let i = 0; i < 46; i++) {
      const sx = hash(i + 1) * W, sy = hash(i + 77) * y0 * 0.55;
      const al = (0.25 + 0.5 * hash(i + 5)) * (0.6 + 0.4 * Math.sin(T * 1.3 + i)) * (1 - sy / (y0 * 0.6));
      ctx.fillStyle = rgba(255, 255, 255, Math.max(0, al));
      ctx.fillRect(sx, sy, 1.6, 1.6);
    }
    // 구름
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 6; i++) {
      const cy = y0 * (0.45 + 0.07 * i), cx = wrapX(T * (3 + i) + i * 400, W + 600, 300);
      const gc = ctx.createRadialGradient(cx, cy, 0, cx, cy, 260 + i * 30);
      gc.addColorStop(0, rgba(255, 170, 150, 0.2)); gc.addColorStop(1, rgba(255, 170, 150, 0));
      ctx.fillStyle = gc;
      ctx.save(); ctx.translate(cx, cy); ctx.scale(1, 0.09); ctx.translate(-cx, -cy);
      ctx.fillRect(cx - 360, cy - 360, 720, 720);
      ctx.restore();
    }
    // 해돋이 빛
    glow(SP.amber, sunX, y0, W * 0.55, 0.85);
    glow(SP.white, sunX, y0, W * 0.12, 0.55);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(255,240,205,0.96)';
    ctx.beginPath(); ctx.arc(sunX, y0 + 8, W * 0.032, 0, 6.283); ctx.fill();
    ctx.restore();
    // 수평선 / 수면선
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255,236,208,0.75)';
    ctx.beginPath();
    for (let x = -10; x <= W + 10; x += 18) {
      const y = y0 + Math.sin(x * 0.018 + T * 2.2) * ws.amp;
      if (x === -10) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    if (ws.cover < 0.98) {
      const gf = ctx.createLinearGradient(0, y0, 0, y0 + 60);
      gf.addColorStop(0, 'rgba(255,255,255,0.7)'); gf.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gf;
      ctx.fillRect(0, y0, W, 60);
    }
  }
}

/* ---------- 층 A: 햇빛 또는 관측등을 받아 보이는 것들 ---------- */
function drawSnow() {
  const sp = ST.flow;
  const streakK = ST.rm ? 0 : 0.022;
  for (let l = 0; l < 3; l++) {
    const L = SNOWL[l];
    ctx.fillStyle = rgba(205, 236, 255, L.a);
    ctx.beginPath();
    const st = Math.min(150, Math.abs(sp) * L.par * streakK);
    for (const p of snow) {
      if (p.l !== l) continue;
      const y = sp > 0 ? p.y + st * 0.5 : p.y - st * 0.5;
      ctx.moveTo(p.x + p.s * 0.5, y);
      ctx.ellipse(p.x, y, p.s * 0.5, (p.s + st) * 0.5, 0, 0, 6.283);
    }
    ctx.fill();
  }
}

function drawBubblesAmbient() {
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(205,238,255,0.5)';
  ctx.beginPath();
  for (const b of bubbles) {
    if (b.top) continue;
    ctx.moveTo(b.x + b.r, b.y);
    ctx.arc(b.x, b.y, b.r, 0, 6.283);
  }
  ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,0.1)';
  ctx.beginPath();
  for (const b of bubbles) {
    if (b.top) continue;
    ctx.moveTo(b.x + b.r, b.y);
    ctx.arc(b.x, b.y, b.r, 0, 6.283);
  }
  ctx.fill();
}

function drawFishSchools() {
  const T = ST.T;
  for (const s of schools) {
    const cy = ey(s, 0.9);
    if (cy < -200 || cy > H + 200) continue;
    const cx = schoolX(s), dir = s.dir;
    for (const f of s.fish) {
      const x = cx + f.ox + f.dx, y = cy + f.oy + f.dy + Math.sin(T * 1.7 + f.ph) * 5;
      if (x < -30 || x > W + 30) continue;
      const sz = f.sz * U * 1.3;
      const wag = Math.sin(T * 9 + f.ph) * 0.35;
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(dir, 1);
      ctx.rotate(Math.atan2(f.vy, Math.abs(f.vx) + 60) * 0.5);
      ctx.fillStyle = 'rgba(214,242,252,0.88)';
      ctx.beginPath(); ctx.ellipse(0, 0, sz, sz * 0.36, 0, 0, 6.283); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-sz * 0.85, 0); ctx.lineTo(-sz * 1.6, -sz * (0.4 + wag * 0.4)); ctx.lineTo(-sz * 1.6, sz * (0.4 - wag * 0.4)); ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(40,110,150,0.55)';
      ctx.beginPath(); ctx.ellipse(sz * 0.05, -sz * 0.16, sz * 0.85, sz * 0.14, 0, 0, 6.283); ctx.fill();
      ctx.restore();
    }
  }
  // 흩어지는 작은 물고기
  for (const m of minis) {
    const a = Math.max(0, m.life / m.max);
    const ang = Math.atan2(m.vy, m.vx);
    ctx.save();
    ctx.translate(m.x, m.y); ctx.rotate(ang);
    ctx.fillStyle = rgba(225, 248, 255, 0.9 * a);
    ctx.beginPath(); ctx.ellipse(0, 0, m.s, m.s * 0.36, 0, 0, 6.283); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-m.s * 0.8, 0); ctx.lineTo(-m.s * 1.6, -m.s * 0.4); ctx.lineTo(-m.s * 1.6, m.s * 0.4); ctx.closePath(); ctx.fill();
    ctx.restore();
  }
  // 물결
  ctx.globalCompositeOperation = 'lighter';
  for (const r of ripples) {
    for (let k = 0; k < 3; k++) {
      const t = r.t - k * 0.22;
      if (t <= 0) continue;
      const rad = t * 380 * U, a = Math.max(0, 1 - t / 1.5);
      ctx.strokeStyle = rgba(210, 248, 255, 0.55 * a);
      ctx.lineWidth = 3 - k * 0.8;
      ctx.beginPath(); ctx.ellipse(r.x, r.y, rad, rad * 0.62, 0, 0, 6.283); ctx.stroke();
    }
  }
  ctx.globalCompositeOperation = 'source-over';
}

function drawGround(layerB) {
  const gh = groundH(ST.depth);
  if (gh < 0.003) return;
  const yTop = H * (1 - gh), ox = ST.T * 26 + ST.scroll * 0.15;
  const prof = (x, f, a) => yTop + noise1((x + ox) * f) * a - Math.max(0, noise1(x * 0.4 + 90 + ox * 0.5)) * 8;
  if (layerB) {
    ctx.strokeStyle = 'rgba(90,120,140,0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = -10; x <= W + 10; x += 14) { const y = prof(x, 0.8, H * 0.035); if (x === -10) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
    ctx.stroke();
    return;
  }
  // 먼 능선
  ctx.fillStyle = 'rgb(24,22,30)';
  ctx.beginPath(); ctx.moveTo(-10, H + 10);
  for (let x = -10; x <= W + 10; x += 16) ctx.lineTo(x, yTop - H * 0.035 + noise1((x + ox * 0.5) * 0.5 + 40) * H * 0.04);
  ctx.lineTo(W + 10, H + 10); ctx.closePath(); ctx.fill();
  // 진흙 바닥
  const g = ctx.createLinearGradient(0, yTop - 20, 0, H);
  g.addColorStop(0, 'rgb(74,66,70)'); g.addColorStop(0.3, 'rgb(48,42,48)'); g.addColorStop(1, 'rgb(22,19,24)');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.moveTo(-10, H + 10);
  for (let x = -10; x <= W + 10; x += 14) ctx.lineTo(x, prof(x, 0.8, H * 0.035));
  ctx.lineTo(W + 10, H + 10); ctx.closePath(); ctx.fill();
  // 잔물결 무늬와 자국
  ctx.strokeStyle = 'rgba(150,136,142,0.3)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let i = 0; i < 60; i++) {
    const x = wrapX(hash(i) * (W + 200) - ox * (0.6 + 0.8 * hash(i + 5)), W + 200, 100);
    const y = yTop + 18 + hash(i + 9) * (H - yTop - 24);
    const len = 14 + hash(i + 13) * 46;
    ctx.moveTo(x, y); ctx.quadraticCurveTo(x + len * 0.5, y - 3, x + len, y);
  }
  ctx.stroke();
  ctx.fillStyle = 'rgba(120,108,114,0.35)';
  for (let i = 0; i < 18; i++) {
    const x = wrapX(hash(i + 100) * (W + 200) - ox * 1.1, W + 200, 100);
    const y = yTop + 24 + hash(i + 120) * (H - yTop - 30);
    ctx.beginPath(); ctx.ellipse(x, y, 3 + hash(i + 140) * 8, 2 + hash(i + 150) * 3, 0, 0, 6.283); ctx.fill();
  }
}

function drawWalls(layerB) {
  if (ST.depth < 5800) return;
  for (const side of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(side < 0 ? -20 : W + 20, -10);
    for (let y = -10; y <= H + 14; y += 14) ctx.lineTo(wallEdge(side, y), y);
    ctx.lineTo(side < 0 ? -20 : W + 20, H + 14);
    ctx.closePath();
    if (layerB) {
      ctx.fillStyle = 'rgba(22,34,52,0.55)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(90,140,180,0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let y = -10; y <= H + 14; y += 14) { const x = wallEdge(side, y); if (y === -10) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
      ctx.stroke();
    } else {
      const wg = ctx.createLinearGradient(side < 0 ? 0 : W, 0, W / 2, 0);
      wg.addColorStop(0, 'rgb(34,42,56)'); wg.addColorStop(1, 'rgb(58,70,88)');
      ctx.fillStyle = wg;
      ctx.fill();
      ctx.strokeStyle = 'rgba(140,165,190,0.42)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      for (let i = 0; i < 46; i++) {
        const y = wrapX(hash(i + side * 30 + 200) * (H + 120) - ST.scroll * 0.95, H + 120, 60);
        const ex = wallEdge(side, y);
        const len = 30 + hash(i + 300) * 130;
        ctx.moveTo(ex, y);
        ctx.lineTo(ex + side * len, y + (hash(i + 330) - 0.5) * 50);
      }
      ctx.stroke();
      ctx.strokeStyle = 'rgba(175,200,220,0.6)';
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      for (let y = -10; y <= H + 14; y += 14) { const x = wallEdge(side, y); if (y === -10) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
      ctx.stroke();
    }
  }
}

function drawDumbo(e) {
  const p = dumboPos(e);
  if (p.y < -140 || p.y > H + 140) return;
  const T = ST.T, s = 58 * U;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(-0.22 + Math.sin(T * 0.4 + e.ph) * 0.09);
  const breath = Math.sin(T * 1.1 + e.ph);
  // 얇은 지느러미가 서로 조금 다른 박자로 물을 민다.
  for (const sd of [-1, 1]) {
    ctx.save();
    ctx.translate(sd * 0.51 * s, -0.43 * s);
    ctx.scale(sd, 1);
    ctx.rotate(-0.35 + Math.sin(T * 1.35 + e.ph + sd * 0.45) * 0.3);
    const fin = ctx.createLinearGradient(0, 0, s, -s * 0.5);
    fin.addColorStop(0, 'rgba(130,67,76,0.85)');
    fin.addColorStop(0.55, 'rgba(222,150,142,0.75)');
    fin.addColorStop(1, 'rgba(244,195,178,0.2)');
    ctx.fillStyle = fin;
    ctx.beginPath(); ctx.moveTo(0, 0.25 * s);
    ctx.bezierCurveTo(0.2 * s, -0.42 * s, 0.78 * s, -0.67 * s, 1.03 * s, -0.48 * s);
    ctx.bezierCurveTo(1.17 * s, -0.2 * s, 0.55 * s, 0.37 * s, 0, 0.25 * s);
    ctx.fill();
    ctx.strokeStyle = 'rgba(246,199,176,0.2)'; ctx.lineWidth = 0.7 * U;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath(); ctx.moveTo(0.05 * s, 0.15 * s);
      ctx.quadraticCurveTo(0.44 * s, -i * 0.065 * s, (0.64 + i * 0.1) * s, (-0.08 - i * 0.12) * s); ctx.stroke();
    }
    ctx.restore();
  }
  // 팔 사이의 막. 아래 가장자리를 비대칭으로 접어 깊이를 만든다.
  const web = ctx.createLinearGradient(-s, 0, s * 0.4, s * 1.2);
  web.addColorStop(0, 'rgba(201,124,115,0.9)');
  web.addColorStop(0.45, 'rgba(150,77,86,0.8)');
  web.addColorStop(1, 'rgba(56,39,55,0.5)');
  ctx.fillStyle = web;
  ctx.beginPath(); ctx.moveTo(-0.57 * s, 0.05 * s);
  ctx.bezierCurveTo(-0.73 * s, 0.5 * s, -1.04 * s, 0.71 * s, -0.9 * s, 0.92 * s);
  ctx.bezierCurveTo(-0.56 * s, 0.64 * s, -0.48 * s, 1.27 * s, -0.23 * s, 1.05 * s);
  ctx.bezierCurveTo(0.03 * s, (0.86 + breath * 0.06) * s, 0.22 * s, 1.32 * s, 0.42 * s, 1.02 * s);
  ctx.bezierCurveTo(0.69 * s, 0.75 * s, 0.85 * s, 1.08 * s, 0.78 * s, 0.57 * s);
  ctx.lineTo(0.53 * s, 0.08 * s); ctx.closePath(); ctx.fill();
  // 몇 개의 팔만 앞쪽에 드러나고 나머지는 막 아래 어둠에 묻힌다.
  ctx.lineCap = 'round';
  for (let i = 0; i < 5; i++) {
    const x = (-0.49 + i * 0.25) * s;
    const tip = (0.92 + 0.13 * Math.sin(T * 1.1 + e.ph + i * 1.7)) * s;
    ctx.strokeStyle = rgba(224 - i * 20, 156 - i * 15, 145 - i * 10, 0.55);
    ctx.lineWidth = (3.2 - i * 0.32) * U;
    ctx.beginPath(); ctx.moveTo(x * 0.7, 0.26 * s);
    ctx.bezierCurveTo(x, 0.55 * s, x * 1.65, tip + 0.18 * s, x * 1.65 + 0.1 * s, tip); ctx.stroke();
  }
  // 한쪽으로 빛을 받는 외투막. 정면의 둥근 얼굴처럼 보이지 않게 한다.
  const g = ctx.createRadialGradient(-0.29 * s, -0.53 * s, 0.03 * s, -0.08 * s, -0.28 * s, s);
  g.addColorStop(0, '#efd1b7'); g.addColorStop(0.3, '#cf9986');
  g.addColorStop(0.67, '#975967'); g.addColorStop(1, '#352c40');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.moveTo(-0.55 * s, 0.38 * s);
  ctx.bezierCurveTo(-0.67 * s, -0.04 * s, -0.72 * s, -0.78 * s, -0.19 * s, -0.94 * s);
  ctx.bezierCurveTo(0.5 * s, -1.06 * s, 0.71 * s, -0.2 * s, 0.49 * s, 0.38 * s);
  ctx.bezierCurveTo(0.27 * s, 0.56 * s, -0.28 * s, 0.5 * s, -0.55 * s, 0.38 * s); ctx.fill();
  ctx.fillStyle = 'rgba(241,193,162,0.1)';
  for (let i = 0; i < 30; i++) {
    const x = (hash(i + 70) - 0.5) * 0.85 * s, y = (-0.65 + hash(i + 120) * 0.9) * s;
    ctx.beginPath(); ctx.ellipse(x, y, 0.7 * U, 1.2 * U, -0.3, 0, 6.283); ctx.fill();
  }
  // 사선 구도에서 보이는 작은 눈과 희미한 반사광.
  ctx.fillStyle = '#342b35';
  ctx.beginPath(); ctx.ellipse(-0.48 * s, 0.1 * s, 0.063 * s, 0.075 * s, -0.25, 0, 6.283); ctx.fill();
  ctx.fillStyle = 'rgba(225,232,214,0.55)';
  ctx.beginPath(); ctx.arc(-0.495 * s, 0.074 * s, 0.016 * s, 0, 6.283); ctx.fill();
  ctx.restore();
}

function drawAtollaBody(a) {
  const p = atollaPos(a);
  if (p.y < -140 || p.y > H + 160) return;
  const T = ST.T, R = 44 * U * (0.96 + 0.04 * Math.sin(T * 1.5 + a.ph));
  ctx.strokeStyle = 'rgba(175,32,52,0.55)';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const ang = (i / 10) * 6.283, bx = p.x + Math.cos(ang) * R * 0.9, by = p.y + Math.sin(ang) * R * 0.5;
    const len = (40 + 40 * hash(i + a.d)) * U;
    ctx.moveTo(bx, by);
    ctx.quadraticCurveTo(bx + Math.sin(T * 1.2 + i) * 12 * U, by + len * 0.5, bx + Math.sin(T * 0.9 + i * 2) * 16 * U, by + len);
  }
  ctx.stroke();
  const g = ctx.createRadialGradient(p.x, p.y - R * 0.1, R * 0.1, p.x, p.y, R);
  g.addColorStop(0, 'rgba(232,70,66,0.97)'); g.addColorStop(0.65, 'rgba(160,26,42,0.95)'); g.addColorStop(1, 'rgba(92,12,30,0.9)');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.ellipse(p.x, p.y, R, R * 0.56, 0, 0, 6.283); ctx.fill();
  ctx.fillStyle = 'rgba(70,6,22,0.6)';
  ctx.beginPath(); ctx.ellipse(p.x, p.y + R * 0.02, R * 0.42, R * 0.2, 0, 0, 6.283); ctx.fill();
}

function drawLampHaze() {
  const R = lampRadius();
  const g = ctx.createRadialGradient(lamp.x, lamp.y, 0, lamp.x, lamp.y, R * 0.95);
  g.addColorStop(0, 'rgba(130,205,230,0.18)');
  g.addColorStop(0.5, 'rgba(70,140,180,0.07)');
  g.addColorStop(1, 'rgba(40,100,140,0)');
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = g;
  ctx.fillRect(lamp.x - R, lamp.y - R, R * 2, R * 2);
  ctx.globalCompositeOperation = 'source-over';
}
function lampRadius() {
  let R = lamp.r;
  if (ST.mode === 'return') R *= 1 + 4.5 * smooth(0.15, 2.2, ST.retT);
  return R;
}
function drawDarkness(dk) {
  if (dk <= 0.003) return;
  const R = lampRadius();
  const g = ctx.createRadialGradient(lamp.x, lamp.y, 0, lamp.x, lamp.y, R);
  g.addColorStop(0, 'rgba(0,0,0,0.02)');
  g.addColorStop(0.3, 'rgba(0,0,0,0.1)');
  g.addColorStop(0.62, 'rgba(0,0,0,0.62)');
  g.addColorStop(1, 'rgba(0,0,0,1)');
  ctx.globalAlpha = dk;
  ctx.fillStyle = g;
  ctx.fillRect(-30, -30, W + 60, H + 60);
  ctx.globalAlpha = 1;
}

/* ---------- 층 B: 스스로 빛나는 것들 ---------- */
function drawLanterns() {
  const T = ST.T;
  for (const L of lanterns) {
    const cy = ey(L, 0.8);
    if (cy < -170 || cy > H + 170) continue;
    const cx = wrapX(T * L.speed * L.dir + L.off, W + 700, 350), dir = L.dir;
    for (const f of L.fish) {
      const x = cx + f.ox + Math.sin(T * 0.9 + f.ph) * 10 * U, y = cy + f.oy + Math.sin(T * 1.3 + f.ph * 2) * 8 * U;
      if (x < -40 || x > W + 40) continue;
      const len = f.len * U * 1.15;
      ctx.globalAlpha = 1;
      const hx = x + dir * len * 0.5, tx = x - dir * len * 0.5;
      ctx.fillStyle = 'rgba(60,160,190,0.08)';
      ctx.strokeStyle = 'rgba(90,210,230,0.13)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(hx, y);
      ctx.quadraticCurveTo(x, y - len * 0.22, tx + dir * len * 0.06, y - len * 0.03);
      ctx.lineTo(tx - dir * len * 0.22, y - len * 0.17); ctx.lineTo(tx - dir * len * 0.22, y + len * 0.17); ctx.lineTo(tx + dir * len * 0.06, y + len * 0.03);
      ctx.quadraticCurveTo(x, y + len * 0.24, hx, y);
      ctx.fill(); ctx.stroke();
      for (let k = 0; k < 6; k++) {
        const pu = 0.62 + 0.45 * Math.sin(T * 2.2 + f.ph + k * 0.8) * 0.5;
        glow(SP.teal, x + dir * len * (0.34 - k * 0.12), y + len * 0.1 + Math.sin(k) * 0.4, 4 * U + 1.6, 0.95 * pu);
      }
      glow(SP.cyan, x + dir * len * 0.44, y - len * 0.02, 4 * U + 1.2, 0.7);
      glow(SP.ice, x - dir * len * 0.52, y + len * 0.02, 2.8 * U + 1, 0.4 + 0.3 * Math.sin(T * 3 + f.ph));
    }
  }
  ctx.globalAlpha = 1;
}

function drawAtollaRing(a) {
  const p = atollaPos(a);
  if (p.y < -160 || p.y > H + 160) return;
  const T = ST.T, R = 44 * U * (0.96 + 0.04 * Math.sin(T * 1.5 + a.ph));
  const act = a.act > 0 ? Math.min(1, a.act / 0.5) : 0;
  const level = 0.6 + 0.4 * act;
  const rot = (a.act > 0 ? a.t * 1.5 : T * 0.22) + a.ph;
  const N = 24;
  for (let i = 0; i < N; i++) {
    const th = (i / N) * 6.283;
    const ph = (((th / 6.283 - rot) * 3) % 1 + 1) % 1; // 팔 3개
    const head = Math.pow(1 - ph, 3);
    const b = 0.12 + 0.88 * head;
    const x = p.x + Math.cos(th) * R * 1.04, y = p.y + Math.sin(th) * R * 0.58;
    glow(SP.blue, x, y, (5 + 10 * head * level) * U, b * level * 1.25);
    if (head > 0.45) glow(SP.white, x, y, (2.2 + 3.2 * head * level) * U, head * level * 0.9);
  }
  if (a.act > 0) {
    for (let k = 0; k < 3; k++) {
      const t = (a.t - k * 0.45) % 1.35;
      if (a.t - k * 0.45 < 0) continue;
      const rad = R * (1.1 + t * 1.9), al = Math.max(0, 1 - t / 1.35) * Math.min(1, a.act / 0.6);
      ctx.strokeStyle = rgba(90, 170, 255, 0.6 * al);
      ctx.lineWidth = 2.4;
      ctx.beginPath(); ctx.ellipse(p.x, p.y, rad, rad * 0.58, 0, 0, 6.283); ctx.stroke();
    }
    glow(SP.blue, p.x, p.y, R * 2.2, 0.35 * act);
  }
  ctx.globalAlpha = 1;
}

function drawSiphon(e) {
  const cy = ey(e, 0.9);
  if (cy < -180 || cy > H + 180) return;
  const T = ST.T, n = 58, L = W * 1.18;
  const x0 = W * 0.5 - L / 2 + Math.sin(T * 0.15 + e.ph) * W * 0.05;
  const pts = [];
  for (let i = 0; i < n; i++) {
    const u = i / (n - 1);
    const x = x0 + u * L;
    const y = cy + Math.sin(u * 8.5 - T * 0.9 * e.dir + e.ph) * 36 * U * (0.5 + u) + Math.sin(u * 3.3 + T * 0.4 + e.ph) * 24 * U;
    pts.push([x, y, u]);
  }
  ctx.strokeStyle = 'rgba(120,190,255,0.24)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  for (let i = 0; i < n; i++) { const q = pts[i]; if (i === 0) ctx.moveTo(q[0], q[1]); else ctx.lineTo(q[0], q[1]); }
  ctx.stroke();
  ctx.strokeStyle = 'rgba(130,200,255,0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 1; i < n; i += 3) {
    const q = pts[i];
    if (q[0] < -30 || q[0] > W + 30) continue;
    const len = (22 + 30 * hash(i + e.d)) * U;
    ctx.moveTo(q[0], q[1]);
    ctx.quadraticCurveTo(q[0] + Math.sin(T * 1.1 + i) * 9 * U, q[1] + len * 0.5, q[0] + Math.sin(T * 0.8 + i * 2) * 14 * U, q[1] + len);
  }
  ctx.stroke();
  for (let i = 0; i < n; i++) {
    const q = pts[i], u = q[2];
    if (q[0] < -30 || q[0] > W + 30) continue;
    const pulse = Math.pow(0.5 + 0.5 * Math.sin(u * 17 - T * 2.4 * e.dir + e.ph), 2);
    const a = 0.42 + 0.58 * pulse;
    const r = (3.6 + 3.2 * Math.pow(Math.sin(i * 0.9) * 0.5 + 0.5, 2)) * U;
    const warm = i % 7 === 3;
    glow(warm ? SP.amber : SP.cyan, q[0], q[1], r * 3.4, a * 0.75);
    glow(SP.white, q[0], q[1], r * 1.15, a * 0.9);
  }
  ctx.globalAlpha = 1;
}

function drawLure(a) {
  const p = anglerPos(a);
  if (p.y < -60 || p.y > H + 60) return;
  const T = ST.T, near = a.st < 0 ? a.near || 0 : 0;
  const fl = 0.78 + 0.22 * Math.sin(T * (6 + near * 8) + a.ph);
  glow(SP.lure, p.x, p.y, (26 + near * 14) * U, 0.85 * fl);
  glow(SP.white, p.x, p.y, 6.5 * U, 0.95);
  glow(SP.green, p.x, p.y, 62 * U, 0.14 + near * 0.12);
  ctx.globalAlpha = 1;
}

function drawPlankton() {
  const dark = ST.depth >= 900;
  if (!dark) return;
  for (const p of plank) {
    glow(SP.cyan, p.x, p.y, 3.2 * p.s, 0.2);
    if (p.e > 0.03) glow(SP.blue, p.x, p.y, (6 + 12 * p.e) * p.s * U, p.e * 0.9);
  }
  ctx.globalAlpha = 1;
}

function drawTrail() {
  for (const p of trail) {
    const a = Math.pow(Math.max(0, p.life / p.max), 1.3);
    glow(SP.blue, p.x, p.y, p.s * 3.2, a * 0.9);
    glow(SP.cyan, p.x, p.y, p.s * 1.1, a * 0.9);
  }
  ctx.globalAlpha = 1;
}

/* 소나로 드러나는 숨은 생물: 초록 윤곽선 */
function strokeGreen(alpha, wide) {
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.strokeStyle = rgba(90, 255, 160, alpha * 0.22); ctx.lineWidth = wide; ctx.stroke();
  ctx.strokeStyle = rgba(160, 255, 200, alpha); ctx.lineWidth = 1.8; ctx.stroke();
}
function drawHiddenOutline(h, alpha) {
  const p = hiddenPos(h), T = ST.T;
  ctx.save();
  ctx.translate(p.x, p.y);
  if (h.kind === 'squid') {
    const s = 58 * U;
    ctx.rotate(Math.sin(T * 0.5 + h.ph) * 0.12 + (h.dir > 0 ? 0.25 : -0.25));
    ctx.beginPath();
    ctx.moveTo(0, -2.6 * s);
    ctx.bezierCurveTo(0.55 * s, -2.2 * s, 0.62 * s, -1.0 * s, 0.42 * s, 0);
    ctx.lineTo(-0.42 * s, 0);
    ctx.bezierCurveTo(-0.62 * s, -1.0 * s, -0.55 * s, -2.2 * s, 0, -2.6 * s);
    ctx.moveTo(0, -2.6 * s); ctx.lineTo(0.95 * s, -2.05 * s); ctx.lineTo(0.5 * s, -1.55 * s);
    ctx.moveTo(0, -2.6 * s); ctx.lineTo(-0.95 * s, -2.05 * s); ctx.lineTo(-0.5 * s, -1.55 * s);
    ctx.moveTo(-0.42 * s, 0); ctx.quadraticCurveTo(0, 0.5 * s, 0.42 * s, 0);
    ctx.moveTo(0.36 * s, 0.14 * s); ctx.arc(0.3 * s, 0.14 * s, 0.07 * s, 0, 6.283);
    ctx.moveTo(-0.24 * s, 0.14 * s); ctx.arc(-0.3 * s, 0.14 * s, 0.07 * s, 0, 6.283);
    for (let i = 0; i < 8; i++) {
      const x0 = (i - 3.5) * 0.11 * s, w = Math.sin(T * 1.2 + i) * 0.22 * s;
      ctx.moveTo(x0, 0.28 * s);
      ctx.bezierCurveTo(x0 * 2 + w, 0.8 * s, x0 * 3 - w, 1.2 * s, x0 * 2.5 + w, (1.5 + (i % 2) * 0.55) * s);
    }
    ctx.moveTo(-0.14 * s, 0.3 * s); ctx.bezierCurveTo(-0.3 * s, 1.2 * s, 0.2 * s, 1.9 * s, 0, 2.7 * s);
    ctx.moveTo(0.14 * s, 0.3 * s); ctx.bezierCurveTo(0.3 * s, 1.2 * s, -0.2 * s, 1.9 * s, 0.1 * s, 2.6 * s);
    strokeGreen(alpha, 6);
  } else if (h.kind === 'fish') {
    const s = 82 * U;
    ctx.scale(h.dir, 1);
    ctx.rotate(Math.sin(T * 0.6 + h.ph) * 0.05);
    ctx.beginPath();
    ctx.moveTo(-1.6 * s, 0);
    ctx.bezierCurveTo(-1.1 * s, -0.55 * s, 0.7 * s, -0.7 * s, 1.45 * s, -0.12 * s);
    ctx.lineTo(1.95 * s, 0.1 * s); ctx.lineTo(1.5 * s, 0.3 * s);
    ctx.bezierCurveTo(0.6 * s, 0.75 * s, -1.1 * s, 0.55 * s, -1.6 * s, 0);
    ctx.moveTo(-1.6 * s, 0); ctx.lineTo(-2.25 * s, -0.55 * s); ctx.lineTo(-2.05 * s, 0); ctx.lineTo(-2.25 * s, 0.55 * s); ctx.closePath();
    ctx.moveTo(-0.3 * s, -0.58 * s); ctx.lineTo(-0.05 * s, -1.0 * s); ctx.lineTo(0.45 * s, -0.62 * s);
    ctx.moveTo(-1.5 * s, 0); ctx.lineTo(1.3 * s, 0.02 * s);
    for (let k = 0; k < 8; k++) { const x = -1.2 * s + k * 0.3 * s; ctx.moveTo(x, 0); ctx.lineTo(x + 0.12 * s, 0.34 * s - Math.abs(k - 4) * 0.02 * s); }
    ctx.moveTo(1.2 * s + 0.09 * s, -0.12 * s); ctx.arc(1.2 * s, -0.12 * s, 0.09 * s, 0, 6.283);
    strokeGreen(alpha, 6);
  } else {
    const s = 12 * U;
    ctx.beginPath();
    for (let i = 0; i < 16; i++) {
      const x = ((i % 4) - 1.5) * 4.6 * s + Math.sin(T * 0.8 + i) * s * 0.6, y = (Math.floor(i / 4) - 1.5) * 2.3 * s + Math.cos(T * 0.7 + i * 1.3) * s * 0.4;
      ctx.moveTo(x - s, y); ctx.quadraticCurveTo(x, y - s * 0.55, x + s, y); ctx.quadraticCurveTo(x, y + s * 0.55, x - s, y);
      ctx.moveTo(x - s, y); ctx.lineTo(x - s * 1.6, y - s * 0.45); ctx.lineTo(x - s * 1.6, y + s * 0.45); ctx.closePath();
    }
    strokeGreen(alpha, 4);
  }
  ctx.restore();
}

function drawSonar() {
  if (sonar.on) {
    const r = sonar.r, a = Math.max(0, 1 - r / sonar.maxR);
    ctx.globalCompositeOperation = 'lighter';
    if (r > 6) {
      const g = ctx.createRadialGradient(sonar.cx, sonar.cy, Math.max(0, r * 0.72), sonar.cx, sonar.cy, r);
      g.addColorStop(0, 'rgba(90,255,160,0)');
      g.addColorStop(1, rgba(90, 255, 160, 0.2 * a));
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(sonar.cx, sonar.cy, r, 0, 6.283); ctx.fill();
      ctx.lineWidth = 2.6; ctx.strokeStyle = rgba(150, 255, 190, 0.75 * a);
      ctx.beginPath(); ctx.arc(sonar.cx, sonar.cy, r, 0, 6.283); ctx.stroke();
      ctx.lineWidth = 1; ctx.strokeStyle = rgba(150, 255, 190, 0.35 * a);
      ctx.beginPath(); ctx.arc(sonar.cx, sonar.cy, r * 0.84, 0, 6.283); ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';
  }
  ctx.globalCompositeOperation = 'lighter';
  for (const h of hiddens) {
    if (h.rev < 0) continue;
    const t = h.rev / 1.5;
    const a = t < 0.08 ? t / 0.08 : Math.pow(1 - (t - 0.08) / 0.92, 1.2);
    if (a <= 0.01) continue;
    const p = hiddenPos(h);
    if (p.y < -300 || p.y > H + 300) continue;
    drawHiddenOutline(h, a);
  }
  ctx.globalCompositeOperation = 'source-over';
}

/* ---------- 초롱아귀의 입 ---------- */
function drawMouth(a, alpha, scale) {
  const p = anglerPos(a);
  const w = Math.max(W * 0.92, H * 1.02) * scale, h = w * 0.3;
  const cx = p.x, cy = clamp(p.y + h * 0.2, H * 0.45, H * 0.58);
  ctx.save();
  ctx.globalAlpha = 1;
  // 머리 윤곽 (번쩍임 위에 어둡게 얹힌다)
  const hg = ctx.createRadialGradient(cx, cy, h * 0.2, cx, cy - h * 0.1, w * 0.66);
  hg.addColorStop(0, rgba(5, 9, 15, 0.9 * alpha)); hg.addColorStop(0.65, rgba(10, 20, 32, 0.78 * alpha)); hg.addColorStop(1, rgba(20, 34, 50, 0));
  ctx.fillStyle = hg;
  ctx.beginPath(); ctx.ellipse(cx, cy - h * 0.1, w * 0.66, h * 1.5, 0, 0, 6.283); ctx.fill();
  // 입 안
  const up = (t) => [lerp(cx - w / 2, cx + w / 2, t), cy - Math.sin(t * Math.PI) * h * (0.96 + 0.05 * Math.sin(t * 17))];
  const lo = (t) => [lerp(cx - w / 2, cx + w / 2, t), cy + Math.sin(t * Math.PI) * h * (0.82 + 0.04 * Math.sin(t * 21 + 1))];
  ctx.beginPath();
  for (let i = 0; i <= 40; i++) { const q = up(i / 40); if (i === 0) ctx.moveTo(q[0], q[1]); else ctx.lineTo(q[0], q[1]); }
  for (let i = 40; i >= 0; i--) { const q = lo(i / 40); ctx.lineTo(q[0], q[1]); }
  ctx.closePath();
  const mg = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.5);
  mg.addColorStop(0, rgba(58, 6, 12, alpha)); mg.addColorStop(1, rgba(0, 0, 0, alpha));
  ctx.fillStyle = mg; ctx.fill();
  ctx.lineWidth = 2 * U; ctx.strokeStyle = rgba(114, 151, 165, 0.4 * alpha); ctx.stroke();
  ctx.save(); ctx.clip();
  // 이빨: 휘어진 송곳니와 작은 이빨
  const teeth = (fn, dirSign, count, seed) => {
    for (let i = 0; i < count; i++) {
      const t = 0.04 + 0.92 * (i + 0.25 + hash(i + seed * 3) * 0.5) / count;
      const q = fn(t), mid = 1 - Math.abs(t - 0.5) * 1.5;
      const len = h * (0.18 + 0.52 * hash(i + seed)) * (0.55 + mid * 0.65);
      const bw = w * (0.0015 + hash(i + seed + 60) * 0.0025);
      const lean = (cx - q[0]) * 0.1 + (hash(i + seed + 90) - 0.5) * w * 0.018;
      const tipx = q[0] + lean, tipy = q[1] + dirSign * len;
      const g = ctx.createLinearGradient(0, q[1], 0, tipy);
      g.addColorStop(0, rgba(117, 144, 149, 0.65 * alpha));
      g.addColorStop(0.38, rgba(215, 226, 214, 0.9 * alpha));
      g.addColorStop(1, rgba(161, 185, 185, 0.65 * alpha));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(q[0] - bw, q[1]);
      ctx.quadraticCurveTo(q[0] - bw * 0.5 + lean * 0.3, q[1] + dirSign * len * 0.55, tipx, tipy);
      ctx.quadraticCurveTo(q[0] + bw * 0.6 + lean * 0.3, q[1] + dirSign * len * 0.5, q[0] + bw, q[1]);
      ctx.closePath(); ctx.fill();
    }
  };
  teeth(up, 1, 34, 7);
  teeth(lo, -1, 29, 31);
  ctx.restore();
  // 눈
  glow(SP.ice, cx - w * 0.32, cy - h * 1.2, 10 * U, 0.24 * alpha);
  glow(SP.ice, cx + w * 0.32, cy - h * 1.2, 8 * U, 0.14 * alpha);
  ctx.globalAlpha = 1;
  ctx.restore();
}
function drawAnglerStrikes() {
  let flash = 0;
  for (const a of anglers) {
    if (a.st < 0) continue;
    const t = a.st;
    let alpha, sc;
    if (ST.rm) {
      alpha = Math.sin(Math.min(1, t / 2.2) * Math.PI) * 0.8; sc = 1;
    } else if (t < 0.2) {
      alpha = 1; sc = 0.88 + 0.28 * (1 - Math.pow(1 - t / 0.2, 2));
      flash = Math.max(flash, 0.62 * (t < 0.04 ? t / 0.04 : 1 - (t - 0.04) / 0.16));
    } else {
      const u = (t - 0.2) / 1.2;
      alpha = Math.max(0, 1 - Math.pow(u, 0.7)); sc = lerp(1.16, 0.8, u);
    }
    if (alpha <= 0.005) continue;
    if (flash > 0) { ctx.fillStyle = rgba(196, 228, 255, flash); ctx.fillRect(-30, -30, W + 60, H + 60); flash = 0; }
    drawMouth(a, alpha, sc);
    const p = anglerPos(a);
    ctx.globalCompositeOperation = 'lighter';
    glow(SP.lure, p.x, p.y, 34 * U, 0.9 * alpha);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }
}

/* ---------- 오프닝/귀환 그림 ---------- */
function drawTopBubbles() {
  ctx.lineWidth = 1.3;
  for (const b of bubbles) {
    if (!b.top) continue;
    ctx.strokeStyle = 'rgba(225,246,255,0.62)';
    ctx.fillStyle = 'rgba(255,255,255,0.07)';
    ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 6.283); ctx.fill(); ctx.stroke();
    if (b.r > 5) {
      ctx.strokeStyle = 'rgba(255,255,255,0.75)';
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r * 0.68, 3.6, 4.5); ctx.stroke();
    }
  }
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  for (const p of spray) {
    ctx.globalAlpha = Math.max(0, Math.min(1, p.life * 1.4));
    ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, 6.283); ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawSpeedLines() {
  if (ST.rm) return;
  const sp = Math.abs(ST.speed);
  if (sp < 700) return;
  const k = clamp((sp - 700) / 3600, 0, 1);
  const dark = ST.depth >= 900;
  const up = 1;
  ctx.lineWidth = 1.4;
  ctx.strokeStyle = dark ? rgba(140, 205, 255, 0.5 * k) : rgba(255, 255, 255, 0.45 * k);
  ctx.beginPath();
  const n = MOBILE ? 26 : 46;
  const T = ST.T * 7;
  for (let i = 0; i < n; i++) {
    const side = i % 2 ? 1 : -1;
    const bx = side < 0 ? hash(i + 400) * W * 0.16 : W - hash(i + 400) * W * 0.16;
    const len = (60 + hash(i + 440) * 220) * (0.4 + k);
    const y = wrapX(hash(i + 480) * (H + 400) - up * T * 160 * (0.7 + hash(i + 520)), H + 400, 200);
    ctx.moveTo(bx, y); ctx.lineTo(bx, y + len);
  }
  ctx.stroke();
  const g = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.35, W / 2, H / 2, Math.hypot(W, H) * 0.62);
  g.addColorStop(0, 'rgba(150,220,255,0)');
  g.addColorStop(1, rgba(150, 220, 255, 0.16 * k));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
}

/* ---------- 장면 전체 ---------- */
function renderScene() {
  const d = ST.depth, S = ST.scroll, T = ST.T;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
  ctx.save();
  ctx.translate(ST.shx, ST.shy);

  const ws = waterState();
  const skipUnder = ST.mode === 'intro' && ST.openT < 1;
  const sun = sunAt(d);
  let tagBest = '', tagDist = 1e9;
  const offer = (txt, y) => { const dd = Math.abs(y - H * 0.5); if (dd < H * 0.38 && dd < tagDist) { tagDist = dd; tagBest = txt; } };

  if (!skipUnder) {
    drawBackground(d);

    // 햇빛
    let boost = 1;
    if (ST.mode === 'intro') boost = 0.15 + 0.85 * smooth(1.6, 3.6, ST.openT);
    drawRays(sun, boost);
    if (d < 420) drawCaustics(sun * boost);
    if (d < 260) drawSurface(boost * sun);
    if (ST.mode === 'return') {
      const u = clamp(ST.retT / RET_ASC, 0, 1);
      const gl = smooth(0.3, 1, u) * 0.9;
      if (gl > 0.01) {
        ctx.globalCompositeOperation = 'lighter';
        const g = ctx.createLinearGradient(0, 0, 0, H * 0.9);
        g.addColorStop(0, rgba(200, 240, 255, 0.85 * gl)); g.addColorStop(1, rgba(120, 200, 255, 0));
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        ctx.globalCompositeOperation = 'source-over';
      }
    }

    // 층 A
    drawGround(false);
    drawWalls(false);
    drawSnow();
    drawBubblesAmbient();
    if (d >= 850) drawLampHaze();
    if (d < 340) drawFishSchools();
    if (d > 3900 && d < 6300) for (const e of dumbos) { const p = dumboPos(e); if (p.y > -140 && p.y < H + 140) { drawDumbo(e); if (Math.hypot(lamp.x - p.x, lamp.y - p.y) < lampRadius() * 0.9) offer('덤보문어 - 귀처럼 생긴 지느러미로 천천히 떠다닙니다.', p.y); } }
    if (d > 900) for (const a of atollas) drawAtollaBody(a);

    // 어둠 (관측등 둘레만 밝다)
    const dk = smooth(880, 1000, d);
    drawDarkness(dk);

    // 층 B (스스로 빛나는 것)
    drawWalls(true);
    drawGround(true);
    ctx.globalCompositeOperation = 'lighter';
    if (d > 200 && d < 1100) { drawLanterns(); for (const L of lanterns) { const y = ey(L, 0.8); if (d > 250 && d < 1000) offer('샛비늘치 - 배 쪽에 줄지은 발광점이 특징입니다.', y); } }
    if (d > 900) {
      for (const a of atollas) { drawAtollaRing(a); if (d > 1000) offer('아톨라해파리 - 붉은 몸 둘레로 푸른 빛이 바퀴처럼 돕니다.', atollaPos(a).y); }
      for (const e of siphons) { drawSiphon(e); if (d > 1000) offer('관해파리 - 빛나는 구슬이 사슬처럼 길게 이어진 군체입니다.', ey(e, 0.9)); }
      for (const a of anglers) { drawLure(a); if (d > 1000) offer('초롱아귀 - 머리 위 미끼 빛으로 먹이를 유인합니다.', anglerPos(a).y); }
    }
    drawPlankton();
    drawTrail();
    ctx.globalCompositeOperation = 'source-over';
    drawSonar();
    ctx.globalAlpha = 1;
  }
  ST.tag = tagBest;

  // 수면 위 하늘과 바다
  if (ws) drawAbove(ws);
  drawTopBubbles();
  drawSpeedLines();
  drawAnglerStrikes();

  if (ws && ws.foam > 0.005) {
    ctx.fillStyle = rgba(236, 249, 255, ws.foam);
    ctx.fillRect(-30, -30, W + 60, H + 60);
  }
  if (ST.black > 0.002) {
    ctx.fillStyle = rgba(0, 0, 0, ST.black);
    ctx.fillRect(-30, -30, W + 60, H + 60);
  }
  ctx.restore();
}
