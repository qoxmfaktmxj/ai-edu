// AI 사이트 교실 - page behavior (no dependencies)
(() => {
  const root = document.documentElement;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };

  // Theme toggle: system by default, manual choice remembered per viewer
  const saved = store.get('theme');
  if (saved) root.dataset.theme = saved;
  const themeBtn = document.querySelector('[data-theme-toggle]');
  if (themeBtn) {
    const isDark = () => root.dataset.theme
      ? root.dataset.theme === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;
    const paint = () => {
      themeBtn.innerHTML = isDark() ? '<i class="ph ph-sun"></i>' : '<i class="ph ph-moon"></i>';
      themeBtn.setAttribute('aria-label', isDark() ? '밝은 화면으로 바꾸기' : '어두운 화면으로 바꾸기');
    };
    paint();
    themeBtn.addEventListener('click', () => {
      root.dataset.theme = isDark() ? 'light' : 'dark';
      store.set('theme', root.dataset.theme);
      paint();
    });
  }

  // Mobile table of contents
  const tocBtn = document.querySelector('[data-toc-toggle]');
  const toc = document.getElementById('toc');
  if (tocBtn && toc) {
    const setToc = (open) => {
      toc.classList.toggle('is-open', open);
      tocBtn.setAttribute('aria-expanded', String(open));
      tocBtn.setAttribute('aria-label', open ? '목차 닫기' : '목차 열기');
      tocBtn.innerHTML = open ? '<i class="ph ph-x"></i>' : '<i class="ph ph-list"></i>';
    };
    tocBtn.addEventListener('click', () => setToc(!toc.classList.contains('is-open')));
    toc.addEventListener('click', (e) => { if (e.target.closest('a')) setToc(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && toc.classList.contains('is-open')) { setToc(false); tocBtn.focus(); } });
  }

  // Copy buttons on prompt / command blocks
  document.querySelectorAll('.prompt, .cmd').forEach((block) => {
    const code = block.querySelector('pre');
    if (!code || block.querySelector('.copy')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy';
    btn.innerHTML = '<i class="ph ph-copy"></i>복사';
    btn.addEventListener('click', async () => {
      const text = code.innerText.replace(/\n$/, '');
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const r = document.createRange();
        r.selectNodeContents(code);
        const s = getSelection();
        s.removeAllRanges();
        s.addRange(r);
        document.execCommand('copy');
        s.removeAllRanges();
      }
      btn.classList.add('is-done');
      btn.innerHTML = '<i class="ph ph-check"></i>복사됨';
      setTimeout(() => { btn.classList.remove('is-done'); btn.innerHTML = '<i class="ph ph-copy"></i>복사'; }, 1600);
    });
    block.appendChild(btn);
  });

  // Screenshot slots: hide missing images on the live site, show labeled slots locally or with ?slots
  if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || location.protocol === 'file:' || /[?&]slots/.test(location.search)) {
    root.classList.add('show-slots');
  }
  document.querySelectorAll('.shot img').forEach((img) => {
    const miss = () => img.closest('.shot').classList.add('is-missing');
    if (img.complete && img.naturalWidth === 0) miss();
    img.addEventListener('error', miss);
  });

  // Reveal on enter + roadmap draw
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal, .roadmap').forEach((el) => io.observe(el));

  // TOC scroll spy
  const links = new Map();
  document.querySelectorAll('.toc a[href^="#"]').forEach((a) => links.set(a.getAttribute('href').slice(1), a));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.remove('is-active'));
      links.get(e.target.id)?.classList.add('is-active');
    });
  }, { rootMargin: '-30% 0px -65% 0px' });
  document.querySelectorAll('.chapter[id]').forEach((s) => spy.observe(s));

  // Checklists remember ticks per viewer
  document.querySelectorAll('.checklist input[type="checkbox"]').forEach((box, i) => {
    const key = 'check:' + (box.id || i);
    box.checked = store.get(key) === '1';
    box.addEventListener('change', () => store.set(key, box.checked ? '1' : '0'));
  });

  // Hero video: respect reduced motion
  const vid = document.querySelector('.hero-media video');
  if (vid && matchMedia('(prefers-reduced-motion: reduce)').matches) {
    vid.removeAttribute('autoplay');
    vid.pause();
    vid.setAttribute('controls', '');
  }
})();
