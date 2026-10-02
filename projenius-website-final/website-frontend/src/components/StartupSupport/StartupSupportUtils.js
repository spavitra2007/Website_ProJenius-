/* =====================================================
   StartupSupportUtils.js — small pure helpers
   ===================================================== */
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const pad = (n) => String(n).padStart(2, '0');
export const cx = (...names) => names.filter(Boolean).join(' ');

/* Smooth curve through points (Catmull-Rom -> cubic Bezier).
   Returns the SVG path `d`, the total length, and `marks`:
   the 0..1 position of each point along the path. */
export function buildPath(pts, k = 6) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  let total = 0;
  const marks = [0];
  const poly = [[pts[0][0], pts[0][1], 0]];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / k, p1[1] + (p2[1] - p0[1]) / k];
    const c2 = [p2[0] - (p3[0] - p1[0]) / k, p2[1] - (p3[1] - p1[1]) / k];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0]} ${p2[1]}`;
    let prev = p1;
    for (let s = 1; s <= 40; s++) {
      const t = s / 40, m = 1 - t;
      const x = m * m * m * p1[0] + 3 * m * m * t * c1[0] + 3 * m * t * t * c2[0] + t * t * t * p2[0];
      const y = m * m * m * p1[1] + 3 * m * m * t * c1[1] + 3 * m * t * t * c2[1] + t * t * t * p2[1];
      total += Math.hypot(x - prev[0], y - prev[1]);
      prev = [x, y];
      poly.push([x, y, total]);
    }
    marks.push(total);
  }
  return { d, total, marks: marks.map((m) => m / total), poly };
}

/* Point at fraction f (0..1) along a path built by buildPath. */
export function pointAt(P, f) {
  const target = clamp(f, 0, 1) * P.total;
  const a = P.poly;
  let lo = 0, hi = a.length - 1;
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1;
    if (a[mid][2] <= target) lo = mid; else hi = mid;
  }
  const s = a[lo], e = a[hi];
  const t = e[2] === s[2] ? 0 : (target - s[2]) / (e[2] - s[2]);
  return { x: s[0] + (e[0] - s[0]) * t, y: s[1] + (e[1] - s[1]) * t };
}

/* Arrow-key navigation for tab / radio style lists. */
export function handleListKeys(e, count, current, setCurrent, itemRefs) {
  const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
  let next = null;
  if (step) next = (current + step + count) % count;
  else if (e.key === 'Home') next = 0;
  else if (e.key === 'End') next = count - 1;
  if (next === null) return;
  e.preventDefault();
  setCurrent(next);
  const el = itemRefs.current[next];
  if (el) el.focus();
}
