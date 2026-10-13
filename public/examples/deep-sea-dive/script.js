'use strict';
/* 심해 다이브: 상태 진행, 입력, 계기판, 설명 글. 그림은 scene.js, 소리는 audio.js. */

const $ = id => document.getElementById(id);
const body = document.body;
const el = {
  hero: $('hero'), vDepth: $('v-depth'), vPress: $('v-press'), vSun: $('v-sun'), vLayer: $('v-layer'),
  gmark: $('gmark'), caption: $('caption'), capLayer: $('cap-layer'), capText: $('cap-text'), capTag: $('cap-tag'),
  centerLine: $('center-line'), btnSkip: $('btn-skip'), btnSound: $('btn-sound'), btnSonar: $('btn-sonar'), btnReturn: $('btn-return')
};

const LAYERS = [
  { name: '햇빛층', text: '햇빛이 닿아 바다가 가장 밝은 층입니다. 화면을 누르면 물결이 퍼지고 물고기 떼가 흩어집니다.' },
  { name: '박명층', text: '빛이 점점 줄어 푸른 물이 남색으로 가라앉습니다. 이 층의 끝, 1,000m에서 햇빛이 완전히 사라집니다.' },
  { name: '자정층', text: '햇빛이 닿지 않는 어둠입니다. 마우스나 손가락으로 비추고, 소나로 소리를 보내 보세요.' },
  { name: '심해저층', text: '빛 없는 진흙 바닥 위를 천천히 지나갑니다. 관측등 안에서만 모습을 드러내는 생물이 있습니다.' },
  { name: '초심해층', text: '양쪽 벽이 좁아지는 해구입니다. 더 깊이 내려갈수록 물이 누르는 힘은 계속 커집니다.' }
];
const layerOf = d => (d < 200 ? 0 : d < 1000 ? 1 : d < 4000 ? 2 : d < 6000 ? 3 : 4);
const fmt = n => n.toLocaleString('en-US');

let rafId = 0, lastTs = 0;
let openSpeed = 1, plungeDone = false;
let blackT = -1, blackShown = false, blackFired = false;
let bottomT = 0, bottomUI = false;
let shown = { depth: -1, press: -1, sun: -1, layer: -1 };
let capLayer = -1, capShown = false, capTimer = 0, capPending = false;
let tagText = '', tagTimer = 0;

/* ---------- 크기 ---------- */
function measure() {
  const old = RANGE;
  resizeScene();
  RANGE = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  if (old > 1) ST.scroll = ST.scroll / old * RANGE;
}

/* ---------- 오프닝 ---------- */
function endIntro() {
  ST.mode = 'dive';
  ST.openT = 4;
  ST.scroll = 0; ST.speed = 0; ST.depth = 0;
  body.classList.remove('is-intro', 'show-skip');
}

let inputLockUntil = 0;
function userInput() {
  if (ST.mode !== 'intro' || performance.now() < inputLockUntil) return;
  // 귀환 직후의 첫 입력은 잠수를 시작한다 (이어지는 스크롤 관성은 잠깐 무시)
  if (ST.hold) { ST.hold = false; ST.openT = 0.9; openSpeed = 1; plungeDone = false; inputLockUntil = performance.now() + 1000; return; }
  if (ST.rm) { endIntro(); return; }
  if (ST.openT < 1.2) ST.openT = 1.2;
  openSpeed = 4;
}

function stepIntro(dt) {
  ST.depth = 0; ST.scroll = 0; ST.speed = 0;
  ST.wdt = dt;
  if (!ST.hold) ST.openT += dt * openSpeed;
  if (!plungeDone && ST.openT >= 1) { plungeDone = true; spawnPlunge(); AudioFX.thud(false); }
  if (ST.openT >= 4) endIntro();
}

/* ---------- 하강 ---------- */
function stepDive(dt) {
  const target = window.scrollY || document.documentElement.scrollTop || 0;
  const prev = ST.scroll;
  ST.scroll += (target - ST.scroll) * (1 - Math.exp(-dt * (ST.rm ? 30 : 5.5)));
  if (target >= RANGE - 1 && RANGE - ST.scroll < 2.5) ST.scroll = RANGE;
  const inst = (ST.scroll - prev) / dt;
  ST.speed += (inst - ST.speed) * (1 - Math.exp(-dt * 12));
  ST.depth = depthFromS(ST.scroll);
  ST.wdt = ST.rm ? 0 : dt;

  if (ST.depth >= 1000 && !blackFired) { blackFired = true; blackT = 0; blackShown = false; }
  if (ST.depth < 950) blackFired = false;

  if (ST.scroll >= RANGE - 0.5) enterBottom();
}

function enterBottom() {
  ST.mode = 'bottom';
  ST.scroll = RANGE; ST.speed = 0; ST.depth = MAXD;
  bottomT = 0; bottomUI = false;
  ST.frozen = true;
  blackT = -1; ST.black = 0; blackShown = false;
  el.centerLine.classList.remove('show');
  document.documentElement.style.overflow = 'hidden';
  AudioFX.duck(0);
  AudioFX.thud(true);
}

function stepBottom(dt) {
  ST.scroll = RANGE; ST.speed = 0; ST.depth = MAXD;
  bottomT += dt;
  if (bottomT < 2) { ST.frozen = true; ST.wdt = 0; }
  else {
    ST.frozen = false;
    ST.wdt = ST.rm ? 0 : dt * 0.25;
    if (!bottomUI) { bottomUI = true; body.classList.add('is-final-ui'); AudioFX.duck(1); }
  }
}

/* ---------- 귀환 ---------- */
function startReturn() {
  if (ST.mode !== 'bottom' || !bottomUI) return;
  body.classList.remove('is-final-ui');
  if (ST.rm) { finishReturn(); return; }
  ST.mode = 'return';
  ST.retT = 0;
  ST.frozen = false;
  breakDone = false;
  AudioFX.whoosh();
}
let breakDone = false;

function stepReturn(dt) {
  ST.retT += dt;
  const u = Math.min(1, ST.retT / RET_ASC);
  const e = u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
  const prev = ST.scroll;
  ST.depth = MAXD * (1 - e);
  ST.scroll = sFromDepth(ST.depth);
  const inst = (ST.scroll - prev) / dt;
  ST.speed += (inst - ST.speed) * (1 - Math.exp(-dt * 14));
  ST.wdt = dt;
  if (!breakDone && ST.retT >= RET_ASC) { breakDone = true; spawnBreak(); AudioFX.thud(false); }
  if (ST.retT >= RET_END) finishReturn();
}

function finishReturn() {
  ST.mode = 'intro';
  ST.hold = true; ST.openT = 0; openSpeed = 1; plungeDone = false;
  ST.depth = 0; ST.scroll = 0; ST.speed = 0; ST.frozen = false; ST.black = 0;
  bubbles.length = 0; spray.length = 0; ripples.length = 0; minis.length = 0; trail.length = 0;
  sonar.on = false;
  for (const a of anglers) { a.st = -1; a.cool = 0; a.armed = true; }
  for (const a of atollas) { a.act = 0; }
  blackT = -1; blackFired = false; blackShown = false;
  el.centerLine.classList.remove('show');
  bottomT = 0; bottomUI = false;
  document.documentElement.style.overflow = '';
  AudioFX.duck(1);
  window.scrollTo(0, 0);
  body.classList.remove('is-final-ui');
  body.classList.add('is-intro');
  capShown = false; capLayer = -1;
  el.caption.classList.remove('on');
}

/* ---------- 암전 ---------- */
function stepBlackout(dt) {
  if (blackT < 0) { ST.black = 0; return; }
  blackT += dt;
  const up = ST.rm ? 0.4 : 0.15, hold = ST.rm ? 0.9 : 1.0, down = ST.rm ? 0.5 : 0.6;
  ST.black = blackT < up ? blackT / up : blackT < hold ? 1 : Math.max(0, 1 - (blackT - hold) / down);
  if (blackT > 0.35 && !blackShown) { el.centerLine.classList.add('show'); blackShown = true; }
  if (blackT > 5) { el.centerLine.classList.remove('show'); blackShown = false; blackT = -1; ST.black = 0; }
}

/* ---------- 화면 글자와 계기판 ---------- */
function updateUI() {
  const d = ST.depth, mode = ST.mode;

  const di = Math.round(d);
  if (di !== shown.depth) { shown.depth = di; el.vDepth.textContent = fmt(di); }
  const pr = Math.round(1 + d / 10);
  if (pr !== shown.press) { shown.press = pr; el.vPress.textContent = '약 ' + fmt(pr); }
  const sp = Math.round(sunAt(d) * 100);
  if (sp !== shown.sun) { shown.sun = sp; el.vSun.textContent = sp; }
  const li = layerOf(d);
  if (li !== shown.layer) { shown.layer = li; el.vLayer.textContent = LAYERS[li].name; }
  el.gmark.style.top = 'calc(' + (Math.min(1, ST.scroll / RANGE) * 100).toFixed(2) + '% - 1.5px)';

  const fast = Math.abs(ST.speed) > 1400 ? true : Math.abs(ST.speed) < 900 ? false : body.classList.contains('fast');
  body.classList.toggle('fast', fast);
  body.classList.toggle('dark', d >= 1000);

  const hud = mode !== 'intro';
  body.classList.toggle('hud-on', hud);
  body.classList.toggle('sub-on', mode !== 'intro' || ST.hold || ST.openT >= 2.2);
  const hint = (mode === 'intro' && (ST.hold || ST.openT >= 3.0)) || (mode === 'dive' && ST.scroll < window.innerHeight * 0.12);
  body.classList.toggle('hint-on', hint);
  body.classList.toggle('show-skip', mode === 'intro' && !ST.hold && ST.openT < 4);

  // 제목
  if (mode === 'intro') {
    const t = ST.openT, dip = t > 1 && t < 2 ? 0.45 * Math.sin((t - 1) * Math.PI) : 0;
    el.hero.style.visibility = 'visible';
    el.hero.style.opacity = String(1 - dip);
    el.hero.style.transform = 'translate(' + ST.shx.toFixed(1) + 'px,' + ST.shy.toFixed(1) + 'px)';
  } else {
    const p = Math.min(1, ST.scroll / (window.innerHeight * 0.55));
    el.hero.style.visibility = p >= 1 ? 'hidden' : 'visible';
    el.hero.style.opacity = String(1 - p);
    el.hero.style.transform = 'translateY(' + (-p * 40).toFixed(1) + 'px)';
  }

  // 설명 글 (층이 바뀔 때 부드럽게 교체)
  const want = (mode === 'dive' || mode === 'bottom') && !(blackT >= 0 && blackT < 1.2);
  if (li !== capLayer) {
    capLayer = li;
    clearTimeout(capTimer);
    if (capShown) {
      el.caption.classList.remove('on'); capShown = false; capPending = true;
      capTimer = setTimeout(() => setCaption(li), 450);
    } else setCaption(li);
  }
  if (!want && capShown) { el.caption.classList.remove('on'); capShown = false; }
  else if (want && !capShown && !capPending) { el.caption.classList.add('on'); capShown = true; }

  // 생물 한 줄 설명
  const tg = want && mode === 'dive' ? ST.tag : '';
  if (tg !== tagText) {
    tagText = tg;
    clearTimeout(tagTimer);
    el.capTag.classList.remove('on');
    if (tg) tagTimer = setTimeout(() => { el.capTag.textContent = tg; el.capTag.classList.add('on'); }, 260);
  }
}
function setCaption(i) {
  el.capLayer.textContent = LAYERS[i].name;
  el.capText.textContent = LAYERS[i].text;
  capPending = false;
}

/* ---------- 한 프레임 ---------- */
function step(dt) {
  ST.dt = dt;
  switch (ST.mode) {
    case 'intro': stepIntro(dt); break;
    case 'dive': stepDive(dt); break;
    case 'bottom': stepBottom(dt); break;
    case 'return': stepReturn(dt); break;
  }
  ST.T += ST.wdt;
  stepBlackout(dt);
  updateScene(dt);
  updateUI();
  AudioFX.update(ST.depth, ST.speed);
}

function tick(now) {
  rafId = requestAnimationFrame(tick);
  let dt = (now - lastTs) / 1000;
  lastTs = now;
  if (!(dt > 0)) dt = 0.016;
  dt = Math.min(dt, 0.05);
  step(dt);
  renderScene();
}

/* ---------- 입력 ---------- */
function fireSonar() {
  if (ST.mode !== 'dive' && ST.mode !== 'bottom') return;
  if (sonarStart()) {
    el.btnSonar.classList.remove('firing');
    void el.btnSonar.offsetWidth;
    el.btnSonar.classList.add('firing');
  }
}

function bindInput() {
  window.addEventListener('resize', measure);
  window.addEventListener('scroll', () => { if (ST.mode === 'intro' && (window.scrollY || 0) > 2) userInput(); }, { passive: true });
  window.addEventListener('wheel', userInput, { passive: true });

  window.addEventListener('pointermove', e => { if (e.pointerType === 'mouse' || e.pointerType === 'pen') lampMove(e.clientX, e.clientY, false); }, { passive: true });
  window.addEventListener('touchstart', e => {
    userInput();
    const t = e.touches[0];
    if (t) lampMove(t.clientX, t.clientY, true);
  }, { passive: true });
  window.addEventListener('touchmove', e => {
    const t = e.touches[0];
    if (t) lampMove(t.clientX, t.clientY, true);
  }, { passive: true });

  // 마우스는 누르는 즉시, 손가락은 짧게 톡 두드렸을 때만 (스크롤하려는 손짓은 제외)
  let down = null;
  document.addEventListener('pointerdown', e => {
    if (e.target.closest && e.target.closest('button')) return;
    if (ST.mode === 'intro') { userInput(); return; }
    if (e.pointerType === 'mouse') sceneTap(e.clientX, e.clientY);
    else down = { x: e.clientX, y: e.clientY, t: performance.now() };
  });
  document.addEventListener('pointerup', e => {
    if (!down || e.pointerType === 'mouse') return;
    const ok = Math.hypot(e.clientX - down.x, e.clientY - down.y) < 14 && performance.now() - down.t < 500;
    if (ok) sceneTap(down.x, down.y);
    down = null;
  });
  document.addEventListener('pointercancel', () => { down = null; });

  window.addEventListener('keydown', e => {
    if (e.code === 'Space' || e.key === ' ') {
      const ae = document.activeElement;
      if (ae && ae.tagName === 'BUTTON') return;
      e.preventDefault();
      if (e.repeat) return;
      if (ST.mode === 'intro') userInput(); else fireSonar();
    }
  });
  window.addEventListener('keyup', e => {
    if ((e.code === 'Space' || e.key === ' ') && !(document.activeElement && document.activeElement.tagName === 'BUTTON')) e.preventDefault();
  });

  const clickBtn = (btn, fn) => btn.addEventListener('click', e => { fn(); if (e.detail > 0) btn.blur(); });
  clickBtn(el.btnSkip, userInput);
  clickBtn(el.btnSonar, fireSonar);
  clickBtn(el.btnReturn, startReturn);
  clickBtn(el.btnSound, () => {
    const on = AudioFX.toggle();
    el.btnSound.textContent = on ? '소리 끄기' : '소리 켜기';
    el.btnSound.setAttribute('aria-pressed', on ? 'true' : 'false');
  });

  // 탭이 숨겨지면 멈춘다
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(rafId); rafId = 0; AudioFX.suspend(); }
    else if (!rafId) { lastTs = performance.now(); rafId = requestAnimationFrame(tick); AudioFX.resume(); }
  });

  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  const onMq = () => { ST.rm = mq.matches; if (ST.rm && ST.mode === 'intro') endIntro(); };
  if (mq.addEventListener) mq.addEventListener('change', onMq);
}

/* ---------- 시작 ---------- */
(function init() {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  ST.rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  measure();
  buildWorld();
  bindInput();
  if (ST.rm) endIntro();
  else body.classList.add('show-skip');
  lastTs = performance.now();
  rafId = requestAnimationFrame(tick);
})();
