// Layout of the photo frames, the opening sequence and the one-shot reactions.
// Overlays are placed in pixels from fractions of the photo, so they stay on their spot at any screen size.

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const EASE = 'cubic-bezier(0.2, 0, 0, 1)';

// Cover the box with the photo like object-fit: cover, but keep the chosen focus point in view.
export function placeFrame(frame, scene, box, compact) {
  const [fx, fy] = compact ? scene.mFocus : scene.focus;
  // Phones: a wide photo would have to zoom far in to cover a tall screen and lose the subject.
  // Show it moderately cropped in the upper part instead; the text sits in the dark area below.
  const fw = compact ? box.w * 1.7 : Math.max(box.w, box.h * scene.ar), fh = fw / scene.ar;
  const left = clamp(box.w / 2 - fx * fw, box.w - fw, 0);
  const top = compact ? Math.max(56, box.h * 0.36 - fy * fh) : clamp(box.h / 2 - fy * fh, box.h - fh, 0);
  Object.assign(frame.style, { width: `${fw}px`, height: `${fh}px`, left: `${left}px`, top: `${top}px` });
  frame.style.setProperty('--fx', `${fx * 100}%`);
  frame.style.setProperty('--fy', `${fy * 100}%`);
  return { fw, fh };
}

export function put(el, { x, y, w = 0, h = 0 }) {
  Object.assign(el.style, { left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px` });
}

// ---------- opening, about 10 seconds ----------
export function createOpening(section) {
  const q = (s) => section.querySelector(s);
  const shots = [...section.querySelectorAll('.op-shot')];
  const final = q('.op-final');
  const parts = { shade: q('.op-shade'), t1: q('.t1'), t2: q('.t2'), lead: q('.op-lead'), actions: q('.op-actions'), skip: q('[data-skip]') };
  let anims = [];
  const add = (el, frames, opts) => anims.push(el.animate(frames, { fill: 'backwards', easing: EASE, ...opts }));

  function play() {
    stop();
    add(parts.shade, [{ opacity: 1 }, { opacity: 0 }], { duration: 700, delay: 200 });
    shots.forEach((s, i) => add(s, [
      { opacity: 0, scale: 1.14 },
      { opacity: 1, scale: 1.09, offset: 0.2 },
      { opacity: 1, scale: 1.03, offset: 0.8 },
      { opacity: 0, scale: 1.0 },
    ], { duration: 2100, delay: 300 + i * 1650, easing: 'linear' }));
    add(final, [{ scale: 1.1 }, { scale: 1 }], { duration: 3200, delay: 6600 });
    [[parts.t1, 7900], [parts.t2, 8300], [parts.lead, 8900], [parts.actions, 9300]].forEach(([el, d]) =>
      add(el, [{ opacity: 0, transform: 'translateY(28px)' }, { opacity: 1, transform: 'none' }], { duration: 900, delay: d }));
    parts.skip.hidden = false;
    Promise.all(anims.map((a) => a.finished)).then(end, () => {});
  }
  function end() { stop(); parts.skip.hidden = true; }
  function stop() { anims.forEach((a) => a.cancel()); anims = []; }
  return { play, finish: () => { if (anims.length) end(); }, get playing() { return anims.length > 0; } };
}

// ---------- press and hold, for mouse, touch and keyboard ----------
export function holdButton(btn, onStart, onStop) {
  let held = false;
  const start = (e) => { if (held) return; held = true; btn.classList.add('is-on'); onStart(); e?.preventDefault?.(); };
  const stop = () => { if (!held) return; held = false; btn.classList.remove('is-on'); onStop(); };
  btn.addEventListener('pointerdown', (e) => { btn.setPointerCapture?.(e.pointerId); start(e); });
  ['pointerup', 'pointercancel', 'lostpointercapture', 'blur'].forEach((t) => btn.addEventListener(t, stop));
  btn.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) start(e); else if (e.key === ' ' || e.key === 'Enter') e.preventDefault(); });
  btn.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') stop(); });
  btn.addEventListener('contextmenu', (e) => e.preventDefault());
}

// ---------- one-shot reactions ----------
export function fallDrops(spans, height, { color, reduced }) {
  spans.forEach((s, i) => {
    s.getAnimations().forEach((a) => a.cancel());
    if (reduced) return;
    s.animate([
      { opacity: 0, transform: 'translateY(0)' }, { opacity: 1, offset: 0.1 },
      { opacity: 1, offset: 0.9 }, { opacity: 0, transform: `translateY(${height}px)` },
    ], { duration: 650, delay: 250 + i * 380, easing: 'cubic-bezier(0.5, 0, 1, 1)' });
  });
}

export function sweep(el, reduced) {
  el.getAnimations().forEach((a) => a.cancel());
  el.animate([{ opacity: 0 }, { opacity: 1, offset: 0.2 }, { opacity: 1, offset: 0.8 }, { opacity: 0 }], { duration: reduced ? 900 : 1700 });
  if (!reduced) el.firstElementChild?.animate?.([{ backgroundPosition: '100% 0' }, { backgroundPosition: '-60% 0' }], { duration: 1700, easing: 'ease-in-out' });
}

// Bloom: bubbles rise over the bed, the bed swells a little and settles, then the bubbles pop.
let seed = 2024;
const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
export function makeBubbles(layer, n = 30) {
  layer.replaceChildren(...Array.from({ length: n }, () => {
    const a = rand() * Math.PI * 2, r = Math.sqrt(rand()) * 0.48;
    const s = document.createElement('span');
    const size = 6 + rand() * 18;
    Object.assign(s.style, { left: `${50 + Math.cos(a) * r * 100}%`, top: `${50 + Math.sin(a) * r * 100}%`, width: `${size}px`, height: `${size}px`, margin: `${-size / 2}px 0 0 ${-size / 2}px` });
    s.dataset.pop = String(2200 + rand() * 2400);
    return s;
  }));
}
export function bloom(frame, layer, reduced) {
  frame.getAnimations().forEach((a) => a.cancel());
  if (!reduced) frame.animate([{ scale: 1 }, { scale: 1.035, offset: 0.35 }, { scale: 1.015 }], { duration: 3200, easing: 'ease-out' });
  [...layer.children].forEach((b, i) => {
    b.getAnimations().forEach((a) => a.cancel());
    const pop = Number(b.dataset.pop);
    b.animate([
      { opacity: 0, transform: 'scale(0)' }, { opacity: 1, transform: 'scale(1)', offset: 0.18 },
      { opacity: 1, transform: 'scale(1.05)', offset: 0.85 }, { opacity: 0, transform: 'scale(1.3)' },
    ], { duration: reduced ? 2500 : pop + 900, delay: reduced ? 0 : i * 60, easing: 'ease-out' });
  });
}
