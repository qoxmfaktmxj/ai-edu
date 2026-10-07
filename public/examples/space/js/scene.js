// Motion pieces: star-streak warp (canvas), the opening sequence, and the travel transition.

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

// ---------- warp: stars stream out from the center while level > 0 ----------
export function createWarp(canvas) {
  const ctx = canvas.getContext('2d');
  let seed = 7;
  const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const stars = Array.from({ length: 170 }, () => ({ a: rand() * Math.PI * 2, d: rand(), s: 0.4 + rand() * 0.9 }));
  let w = 0, h = 0, dpr = 1, level = 0, target = 0, raf = 0, last = 0, t = 0;

  function resize() {
    dpr = Math.min(2, devicePixelRatio || 1); w = innerWidth; h = innerHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
  }
  function draw() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    if (level < 0.01) return;
    const cx = w / 2, cy = h / 2, R = Math.hypot(w, h) / 2;
    ctx.lineCap = 'round';
    for (const st of stars) {
      const r = ((st.d + t * 0.6 * st.s) % 1) ** 2 * R;
      const len = level * (20 + r * 0.35);
      const x1 = cx + Math.cos(st.a) * r, y1 = cy + Math.sin(st.a) * r;
      const x0 = cx + Math.cos(st.a) * Math.max(0, r - len), y0 = cy + Math.sin(st.a) * Math.max(0, r - len);
      ctx.strokeStyle = `rgba(214, 226, 255, ${clamp(level * (0.25 + r / R), 0, 0.9)})`;
      ctx.lineWidth = 0.6 + st.s * 1.2 * (r / R);
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
    }
  }
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    level += (target - level) * Math.min(1, dt * 5);
    t += dt * (0.2 + level * 1.4);
    draw();
    if (level > 0.01 || target > 0) raf = requestAnimationFrame(frame); else { raf = 0; level = 0; draw(); }
  }
  function to(v) { target = v; if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  resize();
  return {
    resize,
    to,
    burst(ms = 900) { to(1); setTimeout(() => to(0), ms); },
    stop() { target = 0; level = 0; cancelAnimationFrame(raf); raf = 0; draw(); },
  };
}

// ---------- opening, about 12 seconds ----------
// From Earth's orbit, through streaking stars past each world, to the Sun and the title.
// The last frame (faint orbit, Sun, title) is plain CSS, so reduced motion simply shows it.
export function createOpening(layer, warp, flyImages) {
  const q = (s) => layer.querySelector(s);
  const orbit = q('[data-orbit]'), fly = q('[data-fly]'), sun = q('.op-sun');
  const parts = [q('.t1'), q('.t2'), q('.op-lead'), q('.op-actions')];
  const skip = q('[data-skip]');
  let anims = [], timers = [];
  fly.replaceChildren(...flyImages.map((src) => Object.assign(document.createElement('img'), { src, alt: '' })));

  function add(el, frames, opts) { anims.push(el.animate(frames, { fill: 'backwards', easing: 'cubic-bezier(0.2, 0, 0, 1)', ...opts })); }
  function play() {
    stop();
    layer.classList.remove('is-closed');
    add(orbit, [{ opacity: 1, scale: 1 }, { opacity: 1, scale: 1.1, offset: 0.78 }, { opacity: 0.35, scale: 1.12 }], { duration: 4200, easing: 'ease-in' });
    timers.push(setTimeout(() => warp.to(1), 3100), setTimeout(() => warp.to(0.15), 8200), setTimeout(() => warp.to(0), 9400));
    [...fly.children].forEach((img, i) => {
      const a = -Math.PI / 2 + (i - 4) * 0.7, dx = Math.cos(a) * 70, dy = Math.sin(a) * 50;
      add(img, [
        { opacity: 0, transform: 'translate(0, 0) scale(0.05)' },
        { opacity: 1, transform: `translate(${dx * 0.25}vmax, ${dy * 0.25}vmax) scale(0.7)`, offset: 0.45 },
        { opacity: 0, transform: `translate(${dx}vmax, ${dy}vmax) scale(3)` },
      ], { duration: 950, delay: 4100 + i * 420, easing: 'cubic-bezier(0.55, 0, 1, 0.45)' });
    });
    add(sun, [{ opacity: 0, scale: 0.25 }, { opacity: 1, scale: 1 }], { duration: 1500, delay: 8200 });
    [[parts[0], 9300], [parts[1], 9700], [parts[2], 10300], [parts[3], 10800]].forEach(([el, d]) =>
      add(el, [{ opacity: 0, transform: 'translateY(28px)' }, { opacity: 1, transform: 'none' }], { duration: 900, delay: d }));
    skip.hidden = false;
    Promise.all(anims.map((a) => a.finished)).then(end, () => {});
  }
  function end() { stop(); skip.hidden = true; }
  function stop() { anims.forEach((a) => a.cancel()); anims = []; timers.forEach(clearTimeout); timers = []; warp.stop(); }
  return {
    play,
    finish() { if (anims.length) end(); },
    close() { stop(); skip.hidden = true; layer.classList.add('is-closed'); },
    showFinal() { stop(); skip.hidden = true; layer.classList.remove('is-closed'); },
    get open() { return !layer.classList.contains('is-closed'); },
  };
}

// ---------- travel between worlds ----------
// The current world shrinks away, stars streak, the new one grows in from far away.
// A newer request cancels the older one, so the last chosen world is always where we land.
export function createTravel(bodyEl, warp) {
  let token = 0;
  return function travel(apply, reduced) {
    const my = ++token;
    bodyEl.getAnimations().forEach((a) => a.cancel());
    if (reduced) { apply(); return; }
    warp.burst(950);
    const out = bodyEl.animate(
      [{ opacity: 1, scale: 1, translate: '0 0' }, { opacity: 0, scale: 0.5, translate: '-22vw 5vh' }],
      { duration: 420, easing: 'cubic-bezier(0.4, 0, 1, 1)', fill: 'forwards' },
    );
    out.finished.then(() => {
      if (my !== token) return;
      apply();
      out.cancel();
      bodyEl.animate(
        [{ opacity: 0, scale: 0.12, translate: '16vw -6vh', filter: 'blur(6px)' }, { opacity: 1, scale: 1, translate: '0 0', filter: 'blur(0px)' }],
        { duration: 900, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      );
    }, () => {});
  };
}
