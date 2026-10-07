// Turns scroll, the step shortcuts and "처음부터 다시" into one progress value, then draws it.
import { STEPS } from './data.js';
import { initCoffee, renderCoffee } from './scene.js';

const reducedMq = matchMedia('(prefers-reduced-motion: reduce)');
const navLinks = [...document.querySelectorAll('[data-go]')];
const sections = STEPS.map((s) => document.getElementById(s.id));
initCoffee(document.querySelector('[data-scene]'));

// Each real section owns one story range. A section starts when its text reaches its sticky spot,
// so the drawing never shows the next step while the current text is being read.
let starts = [];
let end = 1;
function measure() {
  const card = sections[0].querySelector('.card');
  const offset = parseFloat(getComputedStyle(card).top) || innerHeight * 0.32;
  starts = sections.map((sec, i) => (i === 0 ? 0 : Math.max(0, sec.getBoundingClientRect().top + scrollY - offset)));
  end = Math.max(starts[starts.length - 1] + 1, document.documentElement.scrollHeight - innerHeight);
}

function progressAt(y) {
  for (let i = STEPS.length - 1; i >= 0; i--) {
    if (y >= starts[i]) {
      const next = i + 1 < STEPS.length ? starts[i + 1] : end;
      const t = Math.min(1, (y - starts[i]) / Math.max(1, next - starts[i]));
      return { index: i, progress: STEPS[i].from + t * (STEPS[i].to - STEPS[i].from) };
    }
  }
  return { index: 0, progress: 0 };
}

let frame = 0;
let current = -1;
function schedule() { if (!frame) frame = requestAnimationFrame(render); }
function render() {
  frame = 0;
  const { index, progress } = progressAt(scrollY);
  renderCoffee(progress, { reduced: reducedMq.matches });
  if (index !== current) {
    current = index;
    navLinks.forEach((a, i) => (i === index ? a.setAttribute('aria-current', 'step') : a.removeAttribute('aria-current')));
    sections.forEach((sec, i) => sec.classList.toggle('is-active', i === index));
  }
}

// Shortcuts and restart jump to the same starts the progress is computed from.
function go(i) {
  scrollTo({ top: i === 0 ? 0 : starts[i] + 1, behavior: reducedMq.matches ? 'auto' : 'smooth' });
  sections[i].focus({ preventScroll: true });
}
navLinks.forEach((a, i) => a.addEventListener('click', (e) => { e.preventDefault(); go(i); }));
document.querySelector('[data-restart]').addEventListener('click', () => go(0));

function remeasure() { measure(); schedule(); }
addEventListener('scroll', schedule, { passive: true });
addEventListener('resize', remeasure);
addEventListener('orientationchange', remeasure);
addEventListener('pageshow', remeasure);
document.fonts?.ready.then(remeasure);
reducedMq.addEventListener('change', schedule);
remeasure();
