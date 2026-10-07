// Strawberry art kit. Every illustration in the film is drawn here as SVG markup:
// no photos, no generated images. Light comes from the upper left, a thin rim
// light sits on the right edge. All "random" placement uses a fixed-seed PRNG,
// so the art is identical on every load and every rendered frame.
(function () {
  const BODY =
    "M300 176 C350 162 436 164 492 204 C548 244 564 326 548 410 C530 506 470 616 392 704 " +
    "C352 748 320 770 300 770 C280 770 250 750 212 708 C134 622 70 512 56 412 " +
    "C44 326 56 246 110 206 C164 166 250 162 300 176 Z";
  const CORE =
    "M300 222 C338 230 350 304 340 400 C330 500 314 590 300 652 C286 590 270 500 260 400 C250 304 262 230 300 222 Z";

  function prng(seed) {
    return function () {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const n = (v) => Math.round(v * 100) / 100;

  // Body geometry helpers (setup time only).
  const ctx = document.createElement("canvas").getContext("2d");
  const bodyPath = new Path2D(BODY);
  const inside = (x, y) => ctx.isPointInPath(bodyPath, x, y);
  const rows = {};
  function extent(y) {
    y = Math.round(y / 2) * 2;
    if (rows[y] !== undefined) return rows[y];
    let l = -1, r = -1;
    for (let x = 0; x <= 600; x += 2) if (inside(x, y)) { if (l < 0) l = x; r = x; }
    return (rows[y] = l < 0 ? null : [l, r]);
  }
  function edgeAlong(cx, cy, ang) {
    const dx = Math.cos(ang), dy = Math.sin(ang);
    let d = 0;
    while (d < 700 && inside(cx + dx * d, cy + dy * d)) d += 2;
    return d;
  }

  // ---------- shared defs ----------
  const defs = `
  <radialGradient id="bodyBase" cx="0.36" cy="0.3" r="0.82">
    <stop offset="0" stop-color="#ff737b"/><stop offset="0.18" stop-color="#f43a4b"/>
    <stop offset="0.44" stop-color="#e3283f"/><stop offset="0.74" stop-color="#ad1029"/>
    <stop offset="1" stop-color="#650a1a"/></radialGradient>
  <radialGradient id="bodyOcc" cx="0.74" cy="0.86" r="0.7">
    <stop offset="0" stop-color="#28000a" stop-opacity="0.5"/><stop offset="1" stop-color="#28000a" stop-opacity="0"/></radialGradient>
  <radialGradient id="bodyShade" cx="0.3" cy="0.26" r="0.95">
    <stop offset="0.5" stop-color="#1e0008" stop-opacity="0"/><stop offset="1" stop-color="#1e0008" stop-opacity="0.55"/></radialGradient>
  <radialGradient id="dimpleDark"><stop offset="0" stop-color="#3c000c" stop-opacity="0.78"/>
    <stop offset="0.62" stop-color="#50000f" stop-opacity="0.4"/><stop offset="1" stop-color="#50000f" stop-opacity="0"/></radialGradient>
  <radialGradient id="dimpleLit"><stop offset="0.45" stop-color="#ffb0aa" stop-opacity="0"/>
    <stop offset="0.78" stop-color="#ff8f88" stop-opacity="0.28"/><stop offset="1" stop-color="#ff8f88" stop-opacity="0"/></radialGradient>
  <linearGradient id="seedA" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stop-color="#f6dc86"/>
    <stop offset="0.55" stop-color="#cfa137"/><stop offset="1" stop-color="#7d5814"/></linearGradient>
  <linearGradient id="seedB" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stop-color="#e9e08a"/>
    <stop offset="0.55" stop-color="#b59a35"/><stop offset="1" stop-color="#6a5314"/></linearGradient>
  <linearGradient id="rimLight" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0.4" stop-color="#ffd2c4" stop-opacity="0"/>
    <stop offset="1" stop-color="#ffcfc2" stop-opacity="0.8"/></linearGradient>
  <linearGradient id="leafFront" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1a4524"/>
    <stop offset="0.6" stop-color="#2d7638"/><stop offset="1" stop-color="#4f9c4c"/></linearGradient>
  <linearGradient id="leafBack" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#11341a"/>
    <stop offset="1" stop-color="#2a6631"/></linearGradient>
  <linearGradient id="stemG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7aa84c"/>
    <stop offset="1" stop-color="#2c5524"/></linearGradient>
  <radialGradient id="flesh" cx="0.5" cy="0.47" r="0.55"><stop offset="0" stop-color="#fff3ee"/>
    <stop offset="0.2" stop-color="#ffd3cf"/><stop offset="0.48" stop-color="#ff929a"/>
    <stop offset="0.8" stop-color="#f04b5c"/><stop offset="1" stop-color="#df2942"/></radialGradient>
  <radialGradient id="coreG" cx="0.5" cy="0.42" r="0.6"><stop offset="0" stop-color="#fffaf5"/>
    <stop offset="0.7" stop-color="#ffe6e1"/><stop offset="1" stop-color="#ffd2cd"/></radialGradient>
  <linearGradient id="fleshBand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe7e2"/>
    <stop offset="1" stop-color="#f6808a"/></linearGradient>
  <radialGradient id="dropBody" cx="0.5" cy="0.56" r="0.5"><stop offset="0" stop-color="#ffffff" stop-opacity="0.04"/>
    <stop offset="0.72" stop-color="#ffffff" stop-opacity="0.08"/><stop offset="1" stop-color="#ffffff" stop-opacity="0.34"/></radialGradient>
  <linearGradient id="dropDark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a0a14" stop-opacity="0.2"/>
    <stop offset="0.55" stop-color="#17090f" stop-opacity="0"/></linearGradient>
  <linearGradient id="sweepG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/>
    <stop offset="0.5" stop-color="#fff3e8" stop-opacity="0.55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <radialGradient id="glintG"><stop offset="0" stop-color="#fff"/><stop offset="0.45" stop-color="#fff" stop-opacity="0.85"/>
    <stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  <filter id="b2" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2"/></filter>
  <filter id="b4" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4"/></filter>
  <filter id="b8" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="8"/></filter>
  <filter id="b14" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="14"/></filter>
  <filter id="grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/></filter>
  <filter id="wet" filterUnits="userSpaceOnUse" x="40" y="200" width="380" height="300">
    <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="11" result="t"/>
    <feSpecularLighting in="t" surfaceScale="2.4" specularConstant="0.9" specularExponent="38" lighting-color="#ffd6d0">
      <feDistantLight azimuth="225" elevation="48"/></feSpecularLighting>
    <feComponentTransfer><feFuncA type="linear" slope="1"/></feComponentTransfer></filter>
  <clipPath id="bodyClip"><path d="${BODY}"/></clipPath>
  <clipPath id="cutL"><rect x="0" y="0" width="300" height="800"/></clipPath>
  <clipPath id="cutR"><rect x="300" y="0" width="300" height="800"/></clipPath>
  <clipPath id="bandL"><rect x="289" y="0" width="11" height="800"/></clipPath>
  <clipPath id="bandR"><rect x="300" y="0" width="11" height="800"/></clipPath>
  <mask id="rimMask" maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="800">
    <path d="${BODY}" fill="#fff"/><path d="${BODY}" fill="#000" transform="translate(-9 -3)" filter="url(#b2)"/></mask>
  <clipPath id="dropClip"><circle cx="50" cy="52" r="44"/></clipPath>`;

  // ---------- seeds, dimples, glints ----------
  function seeds() {
    const R = prng(20261007);
    let lit = "", dark = "", seed = "", glint = "";
    const sp = 36;
    let row = 0;
    for (let y = 206; y < 760; y += 31, row++) {
      const e = extent(y);
      if (!e) continue;
      for (let x = e[0] + (row % 2 ? sp / 2 : 4); x < e[1]; x += sp) {
        const px = x + (R() - 0.5) * 15, py = y + (R() - 0.5) * 12;
        const ee = extent(py);
        if (!ee) continue;
        const cx = (ee[0] + ee[1]) / 2, hw = (ee[1] - ee[0]) / 2;
        const nx = (px - cx) / hw;
        if (Math.abs(nx) > 0.93) continue;
        if (py < 240 && Math.abs(px - 300) < 170) continue; // hidden under the calyx
        const v = (py - 176) / 594;
        const fx = Math.sqrt(1 - nx * nx) * 0.78 + 0.22;
        const fy = 0.72 + 0.28 * Math.sin(Math.PI * Math.min(1, v * 1.3));
        const s = 0.8 + R() * 0.45;
        const rot = n(nx * 30 + (R() - 0.5) * 18);
        const sx = n(fx * s), sy = n(fy * s);
        lit += `<g transform="translate(${n(px - 1.8)} ${n(py - 2.2)}) rotate(${rot}) scale(${sx} ${sy})"><ellipse rx="8" ry="10" fill="url(#dimpleLit)"/></g>`;
        dark += `<g transform="translate(${n(px + 0.9)} ${n(py + 1.3)}) rotate(${rot}) scale(${sx} ${sy})"><ellipse rx="6.6" ry="8.6" fill="url(#dimpleDark)"/></g>`;
        seed += `<g transform="translate(${n(px)} ${n(py)}) rotate(${rot}) scale(${sx} ${sy})">` +
          `<path d="M0 -6.2 C3.3 -5.6 3.7 1.4 1.7 5.2 C0.8 6.7 -0.8 6.7 -1.7 5.2 C-3.7 1.4 -3.3 -5.6 0 -6.2 Z" fill="url(#seed${R() < 0.7 ? "A" : "B"})" stroke="#5a3d0c" stroke-opacity="0.45" stroke-width="0.4"/>` +
          `<ellipse cx="-1" cy="-3" rx="0.9" ry="1.7" fill="#fff8dc" opacity="0.8"/></g>`;
        if (nx < 0.15 && py < 560 && R() < 0.42) {
          const gr = 1.4 + R() * 1.4;
          glint += `<ellipse cx="${n(px - 7.5 * fx)}" cy="${n(py - 6)}" rx="${n(gr * 2.2)}" ry="${n(gr * 1.3)}" transform="rotate(-35 ${n(px - 7.5 * fx)} ${n(py - 6)})" fill="url(#glintG)" opacity="${n(0.6 + R() * 0.35)}"/>`;
        }
      }
    }
    return { lit, dark, seed, glint };
  }

  // ---------- calyx ----------
  function leaf(ang, len, w, bend, fill, front) {
    const p = `M0 ${-w * 0.22} C${len * 0.3} ${-w * 0.78} ${len * 0.72} ${-w * 0.5 + bend} ${len} ${bend} ` +
      `C${len * 0.7} ${w * 0.42 + bend} ${len * 0.3} ${w * 0.72} 0 ${w * 0.22} Z`;
    const t = `translate(300 196) rotate(${ang})`;
    const shadow = front
      ? `<g clip-path="url(#bodyClip)"><path d="${p}" transform="translate(5 10) ${t}" fill="#2a0008" opacity="0.5" filter="url(#b4)"/></g>`
      : "";
    return {
      shadow,
      leaf: `<g transform="${t}"><path d="${p}" fill="url(#${fill})" stroke="#a6dd92" stroke-opacity="0.45" stroke-width="1.4"/>` +
        `<path d="M6 0 Q${len * 0.5} ${bend * 0.45} ${len * 0.9} ${bend * 0.92}" fill="none" stroke="#86c06f" stroke-opacity="0.55" stroke-width="2"/></g>`,
    };
  }
  function calyx() {
    const back = [[-24, 118, 36, 8], [-62, 98, 32, 6], [-118, 100, 32, -6], [-156, 120, 36, -8]];
    const front = [[12, 162, 44, 22], [52, 100, 38, 10], [128, 104, 38, -10], [168, 160, 44, -22]];
    let shadows = "", out = "";
    back.forEach((a) => (out += leaf(a[0], a[1], a[2], a[3], "leafBack", false).leaf));
    out += `<path d="M288 198 C285 160 292 112 312 74 L331 80 C315 116 309 160 311 198 Z" fill="url(#stemG)"/>` +
      `<ellipse cx="321.5" cy="77" rx="10.5" ry="5" transform="rotate(18 321.5 77)" fill="#b4d184"/>`;
    front.forEach((a) => {
      const l = leaf(a[0], a[1], a[2], a[3], "leafFront", true);
      shadows += l.shadow;
      out += l.leaf;
    });
    out += `<ellipse cx="300" cy="198" rx="24" ry="11" fill="#1d4724"/><ellipse cx="296" cy="195" rx="10" ry="4" fill="#4e8d45" opacity="0.7"/>`;
    return { shadows, out };
  }

  // ---------- whole berry (shared by hero and both halves) ----------
  function berryArt() {
    const s = seeds();
    const c = calyx();
    return `<g id="berryArt">
      <path d="${BODY}" fill="url(#bodyBase)"/>
      <path d="${BODY}" fill="url(#bodyOcc)"/>
      <g clip-path="url(#bodyClip)">${s.lit}${s.dark}${s.seed}</g>
      <path d="${BODY}" fill="url(#bodyShade)"/>
      <g clip-path="url(#bodyClip)">
        <rect x="0" y="150" width="600" height="650" filter="url(#grain)" opacity="0.1" style="mix-blend-mode:overlay"/>
        <ellipse cx="300" cy="214" rx="200" ry="40" fill="#2a0008" opacity="0.45" filter="url(#b8)"/>
        ${c.shadows}
        <ellipse cx="190" cy="318" rx="62" ry="104" transform="rotate(24 190 318)" fill="#fff" opacity="0.13" filter="url(#b14)"/>
        <ellipse cx="160" cy="296" rx="16" ry="38" transform="rotate(24 160 296)" fill="#fff" opacity="0.42" filter="url(#b4)"/>
        ${s.glint}
      </g>
      <path d="${BODY}" fill="url(#rimLight)" mask="url(#rimMask)"/>
      ${c.out}
    </g>`;
  }

  // Extra close-up texture, only visible at extreme zoom (scene 1).
  function macroArt() {
    let drops = "";
    [[236, 392, 7], [192, 448, 4.5], [304, 456, 5.5], [212, 362, 3.2], [334, 402, 3.6]].forEach(([x, y, r]) => {
      drops += `<use href="#dropA" x="${x - r}" y="${y - r}" width="${r * 2}" height="${r * 2}"/>`;
    });
    return `<g id="macro" clip-path="url(#bodyClip)">
      <rect x="40" y="200" width="380" height="300" filter="url(#wet)" style="mix-blend-mode:screen" opacity="0.18"/>
      ${drops}</g>`;
  }

  // ---------- longitudinal section ----------
  function sectionArt() {
    const R = prng(4242);
    const C = [300, 446];
    let fibers = "", threads = "", rimSeeds = "", juice = "";
    for (let i = 0; i < 64; i++) {
      const a = (i / 64) * Math.PI * 2 + (R() - 0.5) * 0.08;
      const ca = Math.cos(a), sa = Math.sin(a);
      const rc = 1 / Math.sqrt((ca * ca) / (40 * 40) + (sa * sa) / (205 * 205));
      const re = edgeAlong(C[0], C[1], a) * 0.9;
      if (re <= rc + 8) continue;
      const x0 = C[0] + ca * rc, y0 = C[1] + sa * rc;
      const x1 = C[0] + ca * re, y1 = C[1] + sa * re;
      const mx = (x0 + x1) / 2 - sa * (R() - 0.5) * 18, my = (y0 + y1) / 2 + ca * (R() - 0.5) * 18;
      fibers += `<path d="M${n(x0)} ${n(y0)} Q${n(mx)} ${n(my)} ${n(x1)} ${n(y1)}" stroke="#fff1ec" stroke-opacity="${n(0.32 + R() * 0.3)}" stroke-width="${n(1.4 + R() * 2.8)}" fill="none" stroke-linecap="round"/>`;
      if (i % 3 === 0)
        threads += `<path d="M${n(x0)} ${n(y0)} Q${n(mx + 6)} ${n(my + 4)} ${n(x1)} ${n(y1)}" stroke="#c2122c" stroke-opacity="0.32" stroke-width="1.2" fill="none"/>`;
    }
    for (let i = 0; i < 40; i++) {
      const a = (i / 40) * Math.PI * 2 + 0.05;
      const d = edgeAlong(C[0], C[1], a) - 7;
      const x = C[0] + Math.cos(a) * d, y = C[1] + Math.sin(a) * d;
      if (y < 210) continue;
      rimSeeds += `<ellipse cx="${n(x)}" cy="${n(y)}" rx="2.6" ry="4" transform="rotate(${n((a * 180) / Math.PI + 90)} ${n(x)} ${n(y)})" fill="#e9c35a"/>`;
    }
    for (let i = 0; i < 26; i++) {
      const x = 120 + R() * 360, y = 240 + R() * 440;
      if (!inside(x, y)) continue;
      juice += `<circle cx="${n(x)}" cy="${n(y)}" r="${n(1.2 + R() * 2.4)}" fill="#fff" opacity="${n(0.45 + R() * 0.4)}"/>`;
    }
    return `
      <path d="${BODY}" fill="#b30f29"/>
      <path d="${BODY}" fill="url(#flesh)" transform="translate(300 470) scale(0.955) translate(-300 -470)"/>
      <g clip-path="url(#bodyClip)">${threads}${fibers}
        <path d="${CORE}" fill="#ffc9c4" filter="url(#b8)" transform="translate(300 437) scale(1.25) translate(-300 -437)"/>
        <path d="${CORE}" fill="url(#coreG)"/>
        <rect x="0" y="150" width="600" height="650" filter="url(#grain)" opacity="0.07" style="mix-blend-mode:overlay"/>
        <ellipse cx="205" cy="330" rx="70" ry="120" transform="rotate(20 205 330)" fill="#fff" opacity="0.2" filter="url(#b14)"/>
        ${juice}
      </g>
      ${rimSeeds}
      <path d="M248 190 C270 174 330 174 352 190 L344 202 C320 192 280 192 256 202 Z" fill="#2d6a34"/>
      <path d="M292 120 L308 120 L310 188 L290 188 Z" fill="#5b8a3c"/><path d="M299 122 L301 122 L301 186 L299 186 Z" fill="#a8cc7c"/>
      <path id="secLine" d="${BODY}" fill="none" stroke="#ff6d75" stroke-width="7" vector-effect="non-scaling-stroke"
        transform="translate(300 470) scale(1.035) translate(-300 -470)"
        stroke-linecap="round" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`;
  }

  // ---------- small fruit pieces (each different) ----------
  const PIECES = [
    { flesh: "M18 94 C30 68 42 40 58 18 C84 26 104 58 106 100 C80 106 44 104 18 94 Z", skin: "M58 18 C84 26 104 58 106 100", g: [92, 50, 44, 92] },
    { flesh: "M20 32 C46 12 86 16 102 40 L84 104 L28 92 Z", skin: "M20 32 C46 12 86 16 102 40", g: [60, 18, 56, 90] },
    { flesh: "M14 72 C30 28 80 18 108 34 C86 42 50 54 30 88 Z", skin: "M14 72 C30 28 80 18 108 34", g: [50, 30, 52, 70] },
    { flesh: "M30 24 L92 30 C104 56 98 84 86 98 L26 90 Z", skin: "M92 30 C104 56 98 84 86 98", g: [100, 62, 40, 60] },
  ];
  function pieceSymbols() {
    const R = prng(99);
    return PIECES.map((p, i) => {
      let dots = "";
      // seeds along the skin edge, from a hidden measuring path
      const m = document.createElementNS("http://www.w3.org/2000/svg", "path");
      m.setAttribute("d", p.skin);
      const tmp = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      tmp.appendChild(m);
      document.body.appendChild(tmp);
      const L = m.getTotalLength();
      [0.22, 0.5, 0.78].forEach((f) => {
        const q = m.getPointAtLength(L * (f + (R() - 0.5) * 0.08));
        dots += `<ellipse cx="${n(q.x)}" cy="${n(q.y)}" rx="1.8" ry="2.8" fill="#eac25a"/>`;
      });
      tmp.remove();
      const [x1, y1, x2, y2] = p.g;
      return `<symbol id="piece${i}" viewBox="0 0 120 120">
        <linearGradient id="pg${i}" gradientUnits="userSpaceOnUse" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
          <stop offset="0" stop-color="#e3283f"/><stop offset="0.45" stop-color="#ff8f97"/><stop offset="1" stop-color="#ffe2dc"/></linearGradient>
        <clipPath id="pc${i}"><path d="${p.flesh}"/></clipPath>
        <path d="${p.flesh}" fill="url(#pg${i})"/>
        <g clip-path="url(#pc${i})"><path d="${p.skin}" fill="none" stroke="#c4142f" stroke-width="15"/>
          <path d="${p.skin}" fill="none" stroke="#ff8a8f" stroke-width="2" stroke-opacity="0.7" transform="translate(-2 -2)"/></g>
        ${dots}
        <ellipse cx="${(x1 + x2) / 2}" cy="${(y1 + y2) / 2}" rx="9" ry="5" fill="#fff" opacity="0.5" filter="url(#b2)"/>
      </symbol>`;
    }).join("");
  }

  // ---------- water drops (three variants) ----------
  function dropSymbol(id, hx, hy, hrot, cx2, cy2) {
    return `<symbol id="${id}" viewBox="0 0 100 100" overflow="visible">
      <circle cx="50" cy="52" r="44" fill="url(#dropBody)"/>
      <g clip-path="url(#dropClip)">
        <rect x="0" y="0" width="100" height="100" fill="url(#dropDark)"/>
        <ellipse cx="${cx2}" cy="${cy2}" rx="26" ry="11" fill="#fff" opacity="0.5" filter="url(#b4)"/>
      </g>
      <circle cx="50" cy="52" r="43.2" fill="none" stroke="#17090f" stroke-opacity="0.28" stroke-width="1.6"/>
      <path d="M86 70 A43 43 0 0 1 40 94" fill="none" stroke="#fff" stroke-opacity="0.55" stroke-width="2"/>
      <ellipse cx="${hx}" cy="${hy}" rx="12" ry="6.5" transform="rotate(${hrot} ${hx} ${hy})" fill="#fff" opacity="0.96"/>
      <circle cx="${hx + 26}" cy="${hy - 8}" r="2.8" fill="#fff" opacity="0.75"/>
    </symbol>`;
  }

  const drops =
    dropSymbol("dropA", 33, 30, -38, 56, 80) +
    dropSymbol("dropB", 38, 26, -24, 50, 82) +
    dropSymbol("dropC", 30, 36, -50, 60, 78);

  window.StrawberryArt = {
    BODY,
    defs: defs + drops,
    pieceSymbols,
    berry: () => berryArt() + macroArt(),
    section: sectionArt,
  };
})();
