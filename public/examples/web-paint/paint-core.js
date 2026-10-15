// Pure logic for the web paint app. Fill rules come from REA analysis of Windows Paint 11.2605.81.0
// (BasePaint.dll); see REA_분석결과.md for the evidence behind each rule.
(function (root) {
  const HISTORY_MAX = 10;

  // Paint compares premultiplied ARGB (PixelFormat32bppPARGB, 0xE200B).
  const pre = (c) => [(c[0] * c[3]) / 255, (c[1] * c[3]) / 255, (c[2] * c[3]) / 255, c[3]];

  // BasePaint!0x18000c160: equal -> match; tolerance 0 -> no match;
  // otherwise squared distance over A,R,G,B <= tolerance^2 * 510^2 (260100).
  function colorMatch(a, b, tolerance) {
    if (a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3]) return true;
    if (tolerance === 0) return false;
    const p = pre(a), q = pre(b);
    const d = (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2 + (p[3] - q[3]) ** 2;
    return d <= tolerance * tolerance * 260100;
  }

  // BasePaint!0x18000c5a0 + 0x18000c390: scanline fill, 4-connected, FIFO queue of spans.
  // Every pixel is compared with the original seed color. Fill alpha is forced to 255.
  // A visited map is used only when tolerance > 0 (observed: `if (0.0 < param_3)` in 0x18000c5a0).
  // With tolerance 0 a filled pixel can never equal the seed again, so no map is needed.
  function floodFill(image, sx, sy, color, tolerance) {
    const { width: w, height: h, data } = image;
    if (sx < 0 || sy < 0 || sx >= w || sy >= h) return false;
    const fill = [color[0], color[1], color[2], 255];
    const at = (x, y) => (y * w + x) * 4;
    const get = (i) => [data[i], data[i + 1], data[i + 2], data[i + 3]];
    const seed = get(at(sx, sy));
    if (colorMatch(seed, fill, 0)) return false;

    const visited = tolerance > 0 ? new Uint8Array(w * h) : null;
    // Test-and-set like the original bit vector: a pixel is examined once.
    const take = (x, y) => {
      if (!visited) return true;
      const k = y * w + x;
      if (visited[k]) return false;
      visited[k] = 1;
      return true;
    };
    const paint = (x, y) => {
      if (!take(x, y)) return false;
      const i = at(x, y);
      if (!colorMatch(get(i), seed, tolerance)) return false;
      data.set(fill, i);
      return true;
    };
    const span = (x, y) => {
      let l = x, r = x;
      while (l - 1 >= 0 && paint(l - 1, y)) l--;
      while (r + 1 < w && paint(r + 1, y)) r++;
      return [l, r, y];
    };

    if (!paint(sx, sy)) return false;
    const queue = [span(sx, sy)];
    for (let head = 0; head < queue.length; head++) {
      const [l, r, y] = queue[head];
      for (const ny of [y - 1, y + 1]) {
        if (ny < 0 || ny >= h) continue;
        for (let x = l; x <= r; x++) {
          if (paint(x, ny)) {
            const s = span(x, ny);
            queue.push(s);
            x = s[1];
          }
        }
      }
    }
    return true;
  }

  // Pasted image history: newest first, at most HISTORY_MAX, oldest replaced.
  // The same image (same hash) moves to the top instead of taking a second slot.
  function pushHistory(list, item) {
    const rest = item.hash === undefined ? list : list.filter((x) => x.hash !== item.hash);
    return [item, ...rest].slice(0, HISTORY_MAX);
  }

  const api = { HISTORY_MAX, colorMatch, floodFill, pushHistory };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.PaintCore = api;
})(this);
