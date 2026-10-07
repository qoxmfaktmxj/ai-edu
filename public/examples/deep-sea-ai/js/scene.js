// Motion pieces: the opening sequence, marine snow, and the one-shot reactions
// (ripple, Atolla alarm). Scroll-linked motion lives in CSS through --p set by app.js.

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const EASE = 'cubic-bezier(0.2, 0, 0, 1)';

// ---------- opening: about 12s, deep glimpses rising to the sunlit surface, then the title ----------
// Every animation uses fill "backwards" and is cancelled at the end, so the CSS final frame
// (surface, title, buttons) is what stays. Without JS or with reduced motion that frame is all you see.
export function createOpening(section) {
  const q = (s) => section.querySelector(s);
  const parts = {
    shade: q('.op-shade'), surface: q('.op-surface'), rays: q('.op-rays'),
    glimpses: [...section.querySelectorAll('.op-glimpse')],
    t1: q('.t1'), t2: q('.t2'), lead: q('.op-lead'), actions: q('.op-actions'), skip: q('[data-skip]'),
  };
  let anims = [];
  let onEnd = () => {};

  function add(el, frames, opts) { anims.push(el.animate(frames, { fill: 'backwards', easing: EASE, ...opts })); }

  function play() {
    stop();
    const G = 1000, STEP = 1250;
    add(parts.shade, [{ opacity: 1 }, { opacity: 1, offset: 0.78 }, { opacity: 0 }], { duration: 9400, easing: 'linear' });
    parts.glimpses.forEach((g, i) => add(g, [
      { opacity: 0, transform: 'translate(-50%, -46%) scale(1.08)' },
      { opacity: 1, transform: 'translate(-50%, -50%) scale(1.02)', offset: 0.28 },
      { opacity: 1, transform: 'translate(-50%, -50%) scale(1)', offset: 0.72 },
      { opacity: 0, transform: 'translate(-50%, -53%) scale(0.98)' },
    ], { duration: STEP + 150, delay: G + i * STEP, easing: 'ease-in-out' }));
    add(parts.surface, [{ opacity: 0, transform: 'translateY(14%) scale(1.2)' }, { opacity: 1, transform: 'none' }], { duration: 2600, delay: 7100 });
    add(parts.rays, [{ opacity: 0 }, { opacity: 1 }], { duration: 1800, delay: 8000 });
    [[parts.t1, 9100], [parts.t2, 9500], [parts.lead, 10200], [parts.actions, 10700]].forEach(([el, d]) =>
      add(el, [{ opacity: 0, transform: 'translateY(28px)' }, { opacity: 1, transform: 'none' }], { duration: 900, delay: d }));
    parts.skip.hidden = false;
    section.classList.add('is-playing');
    Promise.all(anims.map((a) => a.finished)).then(end, () => {});
  }

  function end() {
    anims.forEach((a) => a.cancel());
    anims = [];
    parts.skip.hidden = true;
    section.classList.remove('is-playing');
    onEnd();
  }
  function stop() { anims.forEach((a) => a.cancel()); anims = []; }

  return {
    play,
    finish: () => { if (anims.length) end(); },
    get playing() { return anims.length > 0; },
    set onEnd(fn) { onEnd = fn; },
  };
}

// ---------- marine snow ----------
// Sinks slowly on its own (as real marine snow does) and slides up the screen as we descend.
// Seeded positions, so the field looks the same on every load.
export function createSnow(canvas) {
  const ctx = canvas.getContext('2d');
  let seed = 4000;
  const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const all = Array.from({ length: 70 }, () => ({ x: rand(), y: rand(), z: rand(), ph: rand() * 6.28 }));
  let w = 0, h = 0, dpr = 1, depth = 0, count = 70, t = 0, raf = 0, last = 0, running = false;

  function resize() {
    dpr = Math.min(2, devicePixelRatio || 1);
    w = innerWidth; h = innerHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    count = w < 768 ? 35 : 70;
    draw();
  }

  function draw() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const show = 0.15 + 0.85 * smooth(120, 900, depth);     // barely visible in bright water
    const thin = 1 - 0.5 * smooth(3300, 4000, depth);        // fewer at the last point
    const n = Math.round(count * thin);
    const scrollShift = scrollY;
    ctx.fillStyle = '#E8F4F6';
    for (let i = 0; i < n; i++) {
      const p = all[i];
      const sink = t * (0.004 + 0.012 * p.z);                 // screens per second, slow
      const climb = scrollShift * (0.00012 + 0.0007 * p.z);   // camera going down
      const y = ((((p.y + sink - climb) % 1) + 1) % 1) * (h + 20) - 10;
      const x = (p.x + Math.sin(t * 0.25 + p.ph) * 0.006 * (1 + p.z)) * w;
      ctx.globalAlpha = (0.08 + 0.42 * p.z) * show;
      ctx.beginPath(); ctx.arc(x, y, 0.6 + 1.8 * p.z, 0, 6.2832); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function frame(now) {
    t += Math.min(0.05, (now - last) / 1000); last = now;
    draw();
    raf = requestAnimationFrame(frame);
  }

  return {
    resize, draw,
    setDepth(d) { depth = d; if (!running) draw(); },
    start() { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); },
    stop() { running = false; cancelAnimationFrame(raf); draw(); },
  };
}

// ---------- one-shot reactions ----------
export function ripple(layer, x, y, reduced) {
  if (layer.childElementCount > 8) layer.firstElementChild.remove();
  [0, 180, 360].forEach((delay) => {
    const r = document.createElement('span');
    r.className = 'ripple';
    r.style.left = `${x}px`; r.style.top = `${y}px`;
    layer.append(r);
    const a = r.animate(
      [{ opacity: 0.8, transform: 'scale(0.08)' }, { opacity: 0, transform: `scale(${reduced ? 0.5 : 1.5})` }],
      { duration: reduced ? 600 : 1500, delay, easing: 'cubic-bezier(0.1, 0.6, 0.3, 1)', fill: 'both' },
    );
    a.finished.then(() => r.remove(), () => r.remove());
  });
}

// Atolla's "burglar alarm": a blue light runs around the bell like a pinwheel.
export function alarm(ring, reduced) {
  ring.getAnimations().forEach((a) => a.cancel());
  if (reduced) {
    return ring.animate([{ opacity: 0 }, { opacity: 1, offset: 0.2 }, { opacity: 1, offset: 0.8 }, { opacity: 0 }], { duration: 1600 });
  }
  return ring.animate([
    { opacity: 0, transform: 'rotate(0turn)' },
    { opacity: 1, transform: 'rotate(0.3turn)', offset: 0.12 },
    { opacity: 1, transform: 'rotate(2.2turn)', offset: 0.8 },
    { opacity: 0, transform: 'rotate(2.6turn)' },
  ], { duration: 2800, easing: 'linear' });
}
