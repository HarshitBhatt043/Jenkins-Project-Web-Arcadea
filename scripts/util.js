const TWO_PI = 2 * Math.PI,
  HALF_PI = Math.PI / 2,
  QUARTER_PI = Math.PI / 4,
  EIGHTH_PI = Math.PI / 8,
  SIXTEENTH_PI = Math.PI / 16,
  EIGHTEENTH_PI = Math.PI / 18,
  __num_rand_ints = 8192,
  __rand_ints = new Uint8Array(8192);
for (var __next_rand = 0, i = 0; i < 8192; i++)
  __rand_ints[i] = Math.floor(100 * Math.random());
function random() {
  const t = __rand_ints[__next_rand];
  return 8192 === ++__next_rand && (__next_rand = 0), t;
}
function executeAndTime(t) {
  const n = performance.now();
  t();
  return performance.now() - n;
}
function displayPerformance(t, n) {
  const r = executeAndTime(t);
  console.log(n, ": ", r, "ms");
}
function docOffsetLeft(t) {
  var n = 0;
  do {
    isNaN(t.offsetLeft) || (n += t.offsetLeft);
  } while ((t = t.offsetParent));
  return n;
}
function docOffsetTop(t) {
  var n = 0;
  do {
    isNaN(t.offsetTop) || (n += t.offsetTop);
  } while ((t = t.offsetParent));
  return n;
}
function distance(t, n, r, e) {
  const o = t - r,
    i = n - e;
  return Math.sqrt(o * o + i * i);
}
function fastItoXYBorderingAdjacent(t, n, r, e) {
  const o = r + width;
  if (o === e) return [t, n + 1];
  if (o - 1 === e) return [t - 1, n + 1];
  if (o + 1 === e) return [t + 1, n + 1];
  if (r - 1 === e) return [t - 1, n];
  if (r + 1 === e) return [t + 1, n];
  const i = r - width;
  if (i === e) return [t, n - 1];
  if (i - 1 === e) return [t - 1, n - 1];
  if (i + 1 === e) return [t + 1, n - 1];
  throw "Not passed a bordering coordinate";
}
function fastItoXYBordering(t, n, r, e) {
  if (r + width === e) return [t, n + 1];
  if (r - 1 === e) return [t - 1, n];
  if (r + 1 === e) return [t + 1, n];
  if (r - width === e) return [t, n - 1];
  throw "Not passed a bordering coordinate";
}
