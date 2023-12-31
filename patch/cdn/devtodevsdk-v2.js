(function (scope) {
  function _defineProperty(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r),
      e
    );
  }
  function _typeof(e) {
    return (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  !(function (e) {
    "object" ===
      ("undefined" == typeof exports ? "undefined" : _typeof(exports)) &&
    "undefined" != typeof module
      ? (module.exports = e())
      : "function" == typeof define && define.amd
      ? define([], e)
      : (("undefined" != typeof window
          ? window
          : "undefined" != typeof global
          ? global
          : "undefined" != typeof self
          ? self
          : this
        ).iampakopako = e());
  })(function () {
    return (function n(i, a, o) {
      function s(t, e) {
        if (!a[t]) {
          if (!i[t]) {
            var r = "function" == typeof require && require;
            if (!e && r) return r(t, !0);
            if (u) return u(t, !0);
            throw (
              (((r = new Error("Cannot find module '" + t + "'")).code =
                "MODULE_NOT_FOUND"),
              r)
            );
          }
          (r = a[t] = { exports: {} }),
            i[t][0].call(
              r.exports,
              function (e) {
                return s(i[t][1][e] || e);
              },
              r,
              r.exports,
              n,
              i,
              a,
              o
            );
        }
        return a[t].exports;
      }
      for (
        var u = "function" == typeof require && require, e = 0;
        e < o.length;
        e++
      )
        s(o[e]);
      return s;
    })(
      {
        1: [
          function (e, t, r) {
            "use strict";
            var n =
              "undefined" != typeof Uint8Array &&
              "undefined" != typeof Uint16Array &&
              "undefined" != typeof Int32Array;
            (r.assign = function (e) {
              for (
                var t, r, n = Array.prototype.slice.call(arguments, 1);
                n.length;

              ) {
                var i = n.shift();
                if (i) {
                  if ("object" !== _typeof(i))
                    throw new TypeError(i + "must be non-object");
                  for (var a in i)
                    (t = i),
                      (r = a),
                      Object.prototype.hasOwnProperty.call(t, r) &&
                        (e[a] = i[a]);
                }
              }
              return e;
            }),
              (r.shrinkBuf = function (e, t) {
                return e.length === t
                  ? e
                  : e.subarray
                  ? e.subarray(0, t)
                  : ((e.length = t), e);
              });
            var i = {
                arraySet: function (e, t, r, n, i) {
                  if (t.subarray && e.subarray) e.set(t.subarray(r, r + n), i);
                  else for (var a = 0; a < n; a++) e[i + a] = t[r + a];
                },
                flattenChunks: function (e) {
                  for (var t, r, n, i = 0, a = 0, o = e.length; a < o; a++)
                    i += e[a].length;
                  for (
                    n = new Uint8Array(i), a = t = 0, o = e.length;
                    a < o;
                    a++
                  )
                    (r = e[a]), n.set(r, t), (t += r.length);
                  return n;
                },
              },
              a = {
                arraySet: function (e, t, r, n, i) {
                  for (var a = 0; a < n; a++) e[i + a] = t[r + a];
                },
                flattenChunks: function (e) {
                  return [].concat.apply([], e);
                },
              };
            (r.setTyped = function (e) {
              e
                ? ((r.Buf8 = Uint8Array),
                  (r.Buf16 = Uint16Array),
                  (r.Buf32 = Int32Array),
                  r.assign(r, i))
                : ((r.Buf8 = Array),
                  (r.Buf16 = Array),
                  (r.Buf32 = Array),
                  r.assign(r, a));
            }),
              r.setTyped(n);
          },
          {},
        ],
        2: [
          function (e, t, r) {
            "use strict";
            var u = e("./common"),
              i = !0,
              a = !0;
            try {
              String.fromCharCode.apply(null, [0]);
            } catch (e) {
              i = !1;
            }
            try {
              String.fromCharCode.apply(null, new Uint8Array(1));
            } catch (e) {
              a = !1;
            }
            for (var d = new u.Buf8(256), n = 0; n < 256; n++)
              d[n] =
                252 <= n
                  ? 6
                  : 248 <= n
                  ? 5
                  : 240 <= n
                  ? 4
                  : 224 <= n
                  ? 3
                  : 192 <= n
                  ? 2
                  : 1;
            function c(e, t) {
              if (t < 65534 && ((e.subarray && a) || (!e.subarray && i)))
                return String.fromCharCode.apply(null, u.shrinkBuf(e, t));
              for (var r = "", n = 0; n < t; n++)
                r += String.fromCharCode(e[n]);
              return r;
            }
            (d[254] = d[254] = 1),
              (r.string2buf = function (e) {
                for (var t, r, n, i, a = e.length, o = 0, s = 0; s < a; s++)
                  55296 == (64512 & (r = e.charCodeAt(s))) &&
                    s + 1 < a &&
                    56320 == (64512 & (n = e.charCodeAt(s + 1))) &&
                    ((r = 65536 + ((r - 55296) << 10) + (n - 56320)), s++),
                    (o += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4);
                for (t = new u.Buf8(o), s = i = 0; i < o; s++)
                  55296 == (64512 & (r = e.charCodeAt(s))) &&
                    s + 1 < a &&
                    56320 == (64512 & (n = e.charCodeAt(s + 1))) &&
                    ((r = 65536 + ((r - 55296) << 10) + (n - 56320)), s++),
                    r < 128
                      ? (t[i++] = r)
                      : (r < 2048
                          ? (t[i++] = 192 | (r >>> 6))
                          : (r < 65536
                              ? (t[i++] = 224 | (r >>> 12))
                              : ((t[i++] = 240 | (r >>> 18)),
                                (t[i++] = 128 | ((r >>> 12) & 63))),
                            (t[i++] = 128 | ((r >>> 6) & 63))),
                        (t[i++] = 128 | (63 & r)));
                return t;
              }),
              (r.buf2binstring = function (e) {
                return c(e, e.length);
              }),
              (r.binstring2buf = function (e) {
                for (
                  var t = new u.Buf8(e.length), r = 0, n = t.length;
                  r < n;
                  r++
                )
                  t[r] = e.charCodeAt(r);
                return t;
              }),
              (r.buf2string = function (e, t) {
                for (
                  var r,
                    n,
                    i = t || e.length,
                    a = new Array(2 * i),
                    o = 0,
                    s = 0;
                  s < i;

                )
                  if ((r = e[s++]) < 128) a[o++] = r;
                  else if (4 < (n = d[r])) (a[o++] = 65533), (s += n - 1);
                  else {
                    for (r &= 2 === n ? 31 : 3 === n ? 15 : 7; 1 < n && s < i; )
                      (r = (r << 6) | (63 & e[s++])), n--;
                    1 < n
                      ? (a[o++] = 65533)
                      : r < 65536
                      ? (a[o++] = r)
                      : ((r -= 65536),
                        (a[o++] = 55296 | ((r >> 10) & 1023)),
                        (a[o++] = 56320 | (1023 & r)));
                  }
                return c(a, o);
              }),
              (r.utf8border = function (e, t) {
                for (
                  var r =
                    (t = (t = t || e.length) > e.length ? e.length : t) - 1;
                  0 <= r && 128 == (192 & e[r]);

                )
                  r--;
                return !(r < 0) && 0 !== r && r + d[e[r]] > t ? r : t;
              });
          },
          { "./common": 1 },
        ],
        3: [
          function (e, t, r) {
            "use strict";
            t.exports = function (e, t, r, n) {
              for (
                var i = (65535 & e) | 0, a = ((e >>> 16) & 65535) | 0, o = 0;
                0 !== r;

              ) {
                for (
                  r -= o = 2e3 < r ? 2e3 : r;
                  (a = (a + (i = (i + t[n++]) | 0)) | 0), --o;

                );
                (i %= 65521), (a %= 65521);
              }
              return i | (a << 16) | 0;
            };
          },
          {},
        ],
        4: [
          function (e, t, r) {
            "use strict";
            var s = (function () {
              for (var e = [], t = 0; t < 256; t++) {
                for (var r = t, n = 0; n < 8; n++)
                  r = 1 & r ? 3988292384 ^ (r >>> 1) : r >>> 1;
                e[t] = r;
              }
              return e;
            })();
            t.exports = function (e, t, r, n) {
              var i = s,
                a = n + r;
              e ^= -1;
              for (var o = n; o < a; o++) e = (e >>> 8) ^ i[255 & (e ^ t[o])];
              return -1 ^ e;
            };
          },
          {},
        ],
        5: [
          function (e, t, r) {
            "use strict";
            var s,
              l = e("../utils/common"),
              u = e("./trees"),
              f = e("./adler32"),
              p = e("./crc32"),
              n = e("./messages"),
              d = 0,
              c = 4,
              h = 0,
              g = -2,
              _ = -1,
              v = 4,
              i = 2,
              y = 8,
              m = 9,
              a = 286,
              o = 30,
              D = 19,
              T = 2 * a + 1,
              E = 15,
              C = 3,
              I = 258,
              b = I + C + 1,
              A = 42,
              P = 113,
              w = 1,
              k = 2,
              S = 3,
              U = 4;
            function O(e, t) {
              return (e.msg = n[t]), t;
            }
            function x(e) {
              return (e << 1) - (4 < e ? 9 : 0);
            }
            function R(e) {
              for (var t = e.length; 0 <= --t; ) e[t] = 0;
            }
            function N(e) {
              var t = e.state,
                r = t.pending;
              0 !== (r = r > e.avail_out ? e.avail_out : r) &&
                (l.arraySet(
                  e.output,
                  t.pending_buf,
                  t.pending_out,
                  r,
                  e.next_out
                ),
                (e.next_out += r),
                (t.pending_out += r),
                (e.total_out += r),
                (e.avail_out -= r),
                (t.pending -= r),
                0 === t.pending && (t.pending_out = 0));
            }
            function V(e, t) {
              u._tr_flush_block(
                e,
                0 <= e.block_start ? e.block_start : -1,
                e.strstart - e.block_start,
                t
              ),
                (e.block_start = e.strstart),
                N(e.strm);
            }
            function L(e, t) {
              e.pending_buf[e.pending++] = t;
            }
            function M(e, t) {
              (e.pending_buf[e.pending++] = (t >>> 8) & 255),
                (e.pending_buf[e.pending++] = 255 & t);
            }
            function B(e, t) {
              var r,
                n,
                i = e.max_chain_length,
                a = e.strstart,
                o = e.prev_length,
                s = e.nice_match,
                u = e.strstart > e.w_size - b ? e.strstart - (e.w_size - b) : 0,
                d = e.window,
                c = e.w_mask,
                l = e.prev,
                f = e.strstart + I,
                p = d[a + o - 1],
                h = d[a + o];
              e.prev_length >= e.good_match && (i >>= 2),
                s > e.lookahead && (s = e.lookahead);
              do {
                if (
                  d[(r = t) + o] === h &&
                  d[r + o - 1] === p &&
                  d[r] === d[a] &&
                  d[++r] === d[a + 1]
                ) {
                  for (
                    a += 2, r++;
                    d[++a] === d[++r] &&
                    d[++a] === d[++r] &&
                    d[++a] === d[++r] &&
                    d[++a] === d[++r] &&
                    d[++a] === d[++r] &&
                    d[++a] === d[++r] &&
                    d[++a] === d[++r] &&
                    d[++a] === d[++r] &&
                    a < f;

                  );
                  if (((n = I - (f - a)), (a = f - I), o < n)) {
                    if (((e.match_start = t), s <= (o = n))) break;
                    (p = d[a + o - 1]), (h = d[a + o]);
                  }
                }
              } while ((t = l[t & c]) > u && 0 != --i);
              return o <= e.lookahead ? o : e.lookahead;
            }
            function z(e) {
              var t,
                r,
                n,
                i,
                a,
                o,
                s,
                u,
                d,
                c = e.w_size;
              do {
                if (
                  ((d = e.window_size - e.lookahead - e.strstart),
                  e.strstart >= c + (c - b))
                ) {
                  for (
                    l.arraySet(e.window, e.window, c, c, 0),
                      e.match_start -= c,
                      e.strstart -= c,
                      e.block_start -= c,
                      t = r = e.hash_size;
                    (n = e.head[--t]), (e.head[t] = c <= n ? n - c : 0), --r;

                  );
                  for (
                    t = r = c;
                    (n = e.prev[--t]), (e.prev[t] = c <= n ? n - c : 0), --r;

                  );
                  d += c;
                }
                if (0 === e.strm.avail_in) break;
                if (
                  ((a = e.strm),
                  (o = e.window),
                  (s = e.strstart + e.lookahead),
                  (u = d),
                  (d = void 0),
                  (d = a.avail_in),
                  (r =
                    0 === (d = u < d ? u : d)
                      ? 0
                      : ((a.avail_in -= d),
                        l.arraySet(o, a.input, a.next_in, d, s),
                        1 === a.state.wrap
                          ? (a.adler = f(a.adler, o, d, s))
                          : 2 === a.state.wrap &&
                            (a.adler = p(a.adler, o, d, s)),
                        (a.next_in += d),
                        (a.total_in += d),
                        d)),
                  (e.lookahead += r),
                  e.lookahead + e.insert >= C)
                )
                  for (
                    i = e.strstart - e.insert,
                      e.ins_h = e.window[i],
                      e.ins_h =
                        ((e.ins_h << e.hash_shift) ^ e.window[i + 1]) &
                        e.hash_mask;
                    e.insert &&
                    ((e.ins_h =
                      ((e.ins_h << e.hash_shift) ^ e.window[i + C - 1]) &
                      e.hash_mask),
                    (e.prev[i & e.w_mask] = e.head[e.ins_h]),
                    (e.head[e.ins_h] = i),
                    i++,
                    e.insert--,
                    !(e.lookahead + e.insert < C));

                  );
              } while (e.lookahead < b && 0 !== e.strm.avail_in);
            }
            function F(e, t) {
              for (var r, n; ; ) {
                if (e.lookahead < b) {
                  if ((z(e), e.lookahead < b && t === d)) return w;
                  if (0 === e.lookahead) break;
                }
                if (
                  ((r = 0),
                  e.lookahead >= C &&
                    ((e.ins_h =
                      ((e.ins_h << e.hash_shift) ^
                        e.window[e.strstart + C - 1]) &
                      e.hash_mask),
                    (r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
                    (e.head[e.ins_h] = e.strstart)),
                  0 !== r &&
                    e.strstart - r <= e.w_size - b &&
                    (e.match_length = B(e, r)),
                  e.match_length >= C)
                )
                  if (
                    ((n = u._tr_tally(
                      e,
                      e.strstart - e.match_start,
                      e.match_length - C
                    )),
                    (e.lookahead -= e.match_length),
                    e.match_length <= e.max_lazy_match && e.lookahead >= C)
                  ) {
                    for (
                      e.match_length--;
                      e.strstart++,
                        (e.ins_h =
                          ((e.ins_h << e.hash_shift) ^
                            e.window[e.strstart + C - 1]) &
                          e.hash_mask),
                        (r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
                        (e.head[e.ins_h] = e.strstart),
                        0 != --e.match_length;

                    );
                    e.strstart++;
                  } else
                    (e.strstart += e.match_length),
                      (e.match_length = 0),
                      (e.ins_h = e.window[e.strstart]),
                      (e.ins_h =
                        ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + 1]) &
                        e.hash_mask);
                else
                  (n = u._tr_tally(e, 0, e.window[e.strstart])),
                    e.lookahead--,
                    e.strstart++;
                if (n && (V(e, !1), 0 === e.strm.avail_out)) return w;
              }
              return (
                (e.insert = e.strstart < C - 1 ? e.strstart : C - 1),
                t === c
                  ? (V(e, !0), 0 === e.strm.avail_out ? S : U)
                  : e.last_lit && (V(e, !1), 0 === e.strm.avail_out)
                  ? w
                  : k
              );
            }
            function H(e, t) {
              for (var r, n, i; ; ) {
                if (e.lookahead < b) {
                  if ((z(e), e.lookahead < b && t === d)) return w;
                  if (0 === e.lookahead) break;
                }
                if (
                  ((r = 0),
                  e.lookahead >= C &&
                    ((e.ins_h =
                      ((e.ins_h << e.hash_shift) ^
                        e.window[e.strstart + C - 1]) &
                      e.hash_mask),
                    (r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
                    (e.head[e.ins_h] = e.strstart)),
                  (e.prev_length = e.match_length),
                  (e.prev_match = e.match_start),
                  (e.match_length = C - 1),
                  0 !== r &&
                    e.prev_length < e.max_lazy_match &&
                    e.strstart - r <= e.w_size - b &&
                    ((e.match_length = B(e, r)),
                    e.match_length <= 5 &&
                      (1 === e.strategy ||
                        (e.match_length === C &&
                          4096 < e.strstart - e.match_start)) &&
                      (e.match_length = C - 1)),
                  e.prev_length >= C && e.match_length <= e.prev_length)
                ) {
                  for (
                    i = e.strstart + e.lookahead - C,
                      n = u._tr_tally(
                        e,
                        e.strstart - 1 - e.prev_match,
                        e.prev_length - C
                      ),
                      e.lookahead -= e.prev_length - 1,
                      e.prev_length -= 2;
                    ++e.strstart <= i &&
                      ((e.ins_h =
                        ((e.ins_h << e.hash_shift) ^
                          e.window[e.strstart + C - 1]) &
                        e.hash_mask),
                      (r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
                      (e.head[e.ins_h] = e.strstart)),
                      0 != --e.prev_length;

                  );
                  if (
                    ((e.match_available = 0),
                    (e.match_length = C - 1),
                    e.strstart++,
                    n && (V(e, !1), 0 === e.strm.avail_out))
                  )
                    return w;
                } else if (e.match_available) {
                  if (
                    ((n = u._tr_tally(e, 0, e.window[e.strstart - 1])) &&
                      V(e, !1),
                    e.strstart++,
                    e.lookahead--,
                    0 === e.strm.avail_out)
                  )
                    return w;
                } else (e.match_available = 1), e.strstart++, e.lookahead--;
              }
              return (
                e.match_available &&
                  ((n = u._tr_tally(e, 0, e.window[e.strstart - 1])),
                  (e.match_available = 0)),
                (e.insert = e.strstart < C - 1 ? e.strstart : C - 1),
                t === c
                  ? (V(e, !0), 0 === e.strm.avail_out ? S : U)
                  : e.last_lit && (V(e, !1), 0 === e.strm.avail_out)
                  ? w
                  : k
              );
            }
            function j(e, t, r, n, i) {
              (this.good_length = e),
                (this.max_lazy = t),
                (this.nice_length = r),
                (this.max_chain = n),
                (this.func = i);
            }
            function q() {
              (this.strm = null),
                (this.status = 0),
                (this.pending_buf = null),
                (this.pending_buf_size = 0),
                (this.pending_out = 0),
                (this.pending = 0),
                (this.wrap = 0),
                (this.gzhead = null),
                (this.gzindex = 0),
                (this.method = y),
                (this.last_flush = -1),
                (this.w_size = 0),
                (this.w_bits = 0),
                (this.w_mask = 0),
                (this.window = null),
                (this.window_size = 0),
                (this.prev = null),
                (this.head = null),
                (this.ins_h = 0),
                (this.hash_size = 0),
                (this.hash_bits = 0),
                (this.hash_mask = 0),
                (this.hash_shift = 0),
                (this.block_start = 0),
                (this.match_length = 0),
                (this.prev_match = 0),
                (this.match_available = 0),
                (this.strstart = 0),
                (this.match_start = 0),
                (this.lookahead = 0),
                (this.prev_length = 0),
                (this.max_chain_length = 0),
                (this.max_lazy_match = 0),
                (this.level = 0),
                (this.strategy = 0),
                (this.good_match = 0),
                (this.nice_match = 0),
                (this.dyn_ltree = new l.Buf16(2 * T)),
                (this.dyn_dtree = new l.Buf16(2 * (2 * o + 1))),
                (this.bl_tree = new l.Buf16(2 * (2 * D + 1))),
                R(this.dyn_ltree),
                R(this.dyn_dtree),
                R(this.bl_tree),
                (this.l_desc = null),
                (this.d_desc = null),
                (this.bl_desc = null),
                (this.bl_count = new l.Buf16(E + 1)),
                (this.heap = new l.Buf16(2 * a + 1)),
                R(this.heap),
                (this.heap_len = 0),
                (this.heap_max = 0),
                (this.depth = new l.Buf16(2 * a + 1)),
                R(this.depth),
                (this.l_buf = 0),
                (this.lit_bufsize = 0),
                (this.last_lit = 0),
                (this.d_buf = 0),
                (this.opt_len = 0),
                (this.static_len = 0),
                (this.matches = 0),
                (this.insert = 0),
                (this.bi_buf = 0),
                (this.bi_valid = 0);
            }
            function Y(e) {
              var t;
              return e && e.state
                ? ((e.total_in = e.total_out = 0),
                  (e.data_type = i),
                  ((t = e.state).pending = 0),
                  (t.pending_out = 0),
                  t.wrap < 0 && (t.wrap = -t.wrap),
                  (t.status = t.wrap ? A : P),
                  (e.adler = 2 === t.wrap ? 0 : 1),
                  (t.last_flush = d),
                  u._tr_init(t),
                  h)
                : O(e, g);
            }
            function K(e) {
              var t = Y(e);
              return (
                t === h &&
                  (((e = e.state).window_size = 2 * e.w_size),
                  R(e.head),
                  (e.max_lazy_match = s[e.level].max_lazy),
                  (e.good_match = s[e.level].good_length),
                  (e.nice_match = s[e.level].nice_length),
                  (e.max_chain_length = s[e.level].max_chain),
                  (e.strstart = 0),
                  (e.block_start = 0),
                  (e.lookahead = 0),
                  (e.insert = 0),
                  (e.match_length = e.prev_length = C - 1),
                  (e.match_available = 0),
                  (e.ins_h = 0)),
                t
              );
            }
            function G(e, t, r, n, i, a) {
              if (!e) return g;
              var o = 1;
              if (
                (t === _ && (t = 6),
                n < 0 ? ((o = 0), (n = -n)) : 15 < n && ((o = 2), (n -= 16)),
                i < 1 ||
                  m < i ||
                  r !== y ||
                  n < 8 ||
                  15 < n ||
                  t < 0 ||
                  9 < t ||
                  a < 0 ||
                  v < a)
              )
                return O(e, g);
              8 === n && (n = 9);
              var s = new q();
              return (
                ((e.state = s).strm = e),
                (s.wrap = o),
                (s.gzhead = null),
                (s.w_bits = n),
                (s.w_size = 1 << s.w_bits),
                (s.w_mask = s.w_size - 1),
                (s.hash_bits = i + 7),
                (s.hash_size = 1 << s.hash_bits),
                (s.hash_mask = s.hash_size - 1),
                (s.hash_shift = ~~((s.hash_bits + C - 1) / C)),
                (s.window = new l.Buf8(2 * s.w_size)),
                (s.head = new l.Buf16(s.hash_size)),
                (s.prev = new l.Buf16(s.w_size)),
                (s.lit_bufsize = 1 << (i + 6)),
                (s.pending_buf_size = 4 * s.lit_bufsize),
                (s.pending_buf = new l.Buf8(s.pending_buf_size)),
                (s.d_buf = +s.lit_bufsize),
                (s.l_buf = 3 * s.lit_bufsize),
                (s.level = t),
                (s.strategy = a),
                (s.method = r),
                K(e)
              );
            }
            (s = [
              new j(0, 0, 0, 0, function (e, t) {
                var r = 65535;
                for (
                  r > e.pending_buf_size - 5 && (r = e.pending_buf_size - 5);
                  ;

                ) {
                  if (e.lookahead <= 1) {
                    if ((z(e), 0 === e.lookahead && t === d)) return w;
                    if (0 === e.lookahead) break;
                  }
                  (e.strstart += e.lookahead), (e.lookahead = 0);
                  var n = e.block_start + r;
                  if (
                    (0 === e.strstart || e.strstart >= n) &&
                    ((e.lookahead = e.strstart - n),
                    (e.strstart = n),
                    V(e, !1),
                    0 === e.strm.avail_out)
                  )
                    return w;
                  if (
                    e.strstart - e.block_start >= e.w_size - b &&
                    (V(e, !1), 0 === e.strm.avail_out)
                  )
                    return w;
                }
                return (
                  (e.insert = 0),
                  t === c
                    ? (V(e, !0), 0 === e.strm.avail_out ? S : U)
                    : (e.strstart > e.block_start &&
                        (V(e, !1), e.strm.avail_out),
                      w)
                );
              }),
              new j(4, 4, 8, 4, F),
              new j(4, 5, 16, 8, F),
              new j(4, 6, 32, 32, F),
              new j(4, 4, 16, 16, H),
              new j(8, 16, 32, 32, H),
              new j(8, 16, 128, 128, H),
              new j(8, 32, 128, 256, H),
              new j(32, 128, 258, 1024, H),
              new j(32, 258, 258, 4096, H),
            ]),
              (r.deflateInit = function (e, t) {
                return G(e, t, y, 15, 8, 0);
              }),
              (r.deflateInit2 = G),
              (r.deflateReset = K),
              (r.deflateResetKeep = Y),
              (r.deflateSetHeader = function (e, t) {
                return !e || !e.state || 2 !== e.state.wrap
                  ? g
                  : ((e.state.gzhead = t), h);
              }),
              (r.deflate = function (e, t) {
                var r, n, i, a;
                if (!e || !e.state || 5 < t || t < 0) return e ? O(e, g) : g;
                if (
                  ((r = e.state),
                  !e.output ||
                    (!e.input && 0 !== e.avail_in) ||
                    (666 === r.status && t !== c))
                )
                  return O(e, 0 === e.avail_out ? -5 : g);
                if (
                  ((r.strm = e),
                  (o = r.last_flush),
                  (r.last_flush = t),
                  r.status === A &&
                    (2 === r.wrap
                      ? ((e.adler = 0),
                        L(r, 31),
                        L(r, 139),
                        L(r, 8),
                        r.gzhead
                          ? (L(
                              r,
                              (r.gzhead.text ? 1 : 0) +
                                (r.gzhead.hcrc ? 2 : 0) +
                                (r.gzhead.extra ? 4 : 0) +
                                (r.gzhead.name ? 8 : 0) +
                                (r.gzhead.comment ? 16 : 0)
                            ),
                            L(r, 255 & r.gzhead.time),
                            L(r, (r.gzhead.time >> 8) & 255),
                            L(r, (r.gzhead.time >> 16) & 255),
                            L(r, (r.gzhead.time >> 24) & 255),
                            L(
                              r,
                              9 === r.level
                                ? 2
                                : 2 <= r.strategy || r.level < 2
                                ? 4
                                : 0
                            ),
                            L(r, 255 & r.gzhead.os),
                            r.gzhead.extra &&
                              r.gzhead.extra.length &&
                              (L(r, 255 & r.gzhead.extra.length),
                              L(r, (r.gzhead.extra.length >> 8) & 255)),
                            r.gzhead.hcrc &&
                              (e.adler = p(
                                e.adler,
                                r.pending_buf,
                                r.pending,
                                0
                              )),
                            (r.gzindex = 0),
                            (r.status = 69))
                          : (L(r, 0),
                            L(r, 0),
                            L(r, 0),
                            L(r, 0),
                            L(r, 0),
                            L(
                              r,
                              9 === r.level
                                ? 2
                                : 2 <= r.strategy || r.level < 2
                                ? 4
                                : 0
                            ),
                            L(r, 3),
                            (r.status = P)))
                      : ((a = (y + ((r.w_bits - 8) << 4)) << 8),
                        (a |=
                          (2 <= r.strategy || r.level < 2
                            ? 0
                            : r.level < 6
                            ? 1
                            : 6 === r.level
                            ? 2
                            : 3) << 6),
                        0 !== r.strstart && (a |= 32),
                        (a += 31 - (a % 31)),
                        (r.status = P),
                        M(r, a),
                        0 !== r.strstart &&
                          (M(r, e.adler >>> 16), M(r, 65535 & e.adler)),
                        (e.adler = 1))),
                  69 === r.status)
                )
                  if (r.gzhead.extra) {
                    for (
                      n = r.pending;
                      r.gzindex < (65535 & r.gzhead.extra.length) &&
                      (r.pending !== r.pending_buf_size ||
                        (r.gzhead.hcrc &&
                          r.pending > n &&
                          (e.adler = p(
                            e.adler,
                            r.pending_buf,
                            r.pending - n,
                            n
                          )),
                        N(e),
                        (n = r.pending),
                        r.pending !== r.pending_buf_size));

                    )
                      L(r, 255 & r.gzhead.extra[r.gzindex]), r.gzindex++;
                    r.gzhead.hcrc &&
                      r.pending > n &&
                      (e.adler = p(e.adler, r.pending_buf, r.pending - n, n)),
                      r.gzindex === r.gzhead.extra.length &&
                        ((r.gzindex = 0), (r.status = 73));
                  } else r.status = 73;
                if (73 === r.status)
                  if (r.gzhead.name) {
                    n = r.pending;
                    do {
                      if (
                        r.pending === r.pending_buf_size &&
                        (r.gzhead.hcrc &&
                          r.pending > n &&
                          (e.adler = p(
                            e.adler,
                            r.pending_buf,
                            r.pending - n,
                            n
                          )),
                        N(e),
                        (n = r.pending),
                        r.pending === r.pending_buf_size)
                      ) {
                        i = 1;
                        break;
                      }
                    } while (
                      ((i =
                        r.gzindex < r.gzhead.name.length
                          ? 255 & r.gzhead.name.charCodeAt(r.gzindex++)
                          : 0),
                      L(r, i),
                      0 !== i)
                    );
                    r.gzhead.hcrc &&
                      r.pending > n &&
                      (e.adler = p(e.adler, r.pending_buf, r.pending - n, n)),
                      0 === i && ((r.gzindex = 0), (r.status = 91));
                  } else r.status = 91;
                if (91 === r.status)
                  if (r.gzhead.comment) {
                    n = r.pending;
                    do {
                      if (
                        r.pending === r.pending_buf_size &&
                        (r.gzhead.hcrc &&
                          r.pending > n &&
                          (e.adler = p(
                            e.adler,
                            r.pending_buf,
                            r.pending - n,
                            n
                          )),
                        N(e),
                        (n = r.pending),
                        r.pending === r.pending_buf_size)
                      ) {
                        i = 1;
                        break;
                      }
                    } while (
                      ((i =
                        r.gzindex < r.gzhead.comment.length
                          ? 255 & r.gzhead.comment.charCodeAt(r.gzindex++)
                          : 0),
                      L(r, i),
                      0 !== i)
                    );
                    r.gzhead.hcrc &&
                      r.pending > n &&
                      (e.adler = p(e.adler, r.pending_buf, r.pending - n, n)),
                      0 === i && (r.status = 103);
                  } else r.status = 103;
                if (
                  (103 === r.status &&
                    (r.gzhead.hcrc
                      ? (r.pending + 2 > r.pending_buf_size && N(e),
                        r.pending + 2 <= r.pending_buf_size &&
                          (L(r, 255 & e.adler),
                          L(r, (e.adler >> 8) & 255),
                          (e.adler = 0),
                          (r.status = P)))
                      : (r.status = P)),
                  0 !== r.pending)
                ) {
                  if ((N(e), 0 === e.avail_out)) return (r.last_flush = -1), h;
                } else if (0 === e.avail_in && x(t) <= x(o) && t !== c)
                  return O(e, -5);
                if (666 === r.status && 0 !== e.avail_in) return O(e, -5);
                if (
                  0 !== e.avail_in ||
                  0 !== r.lookahead ||
                  (t !== d && 666 !== r.status)
                ) {
                  var o =
                    2 === r.strategy
                      ? (function (e, t) {
                          for (var r; ; ) {
                            if (
                              0 === e.lookahead &&
                              (z(e), 0 === e.lookahead)
                            ) {
                              if (t === d) return w;
                              break;
                            }
                            if (
                              ((e.match_length = 0),
                              (r = u._tr_tally(e, 0, e.window[e.strstart])),
                              e.lookahead--,
                              e.strstart++,
                              r && (V(e, !1), 0 === e.strm.avail_out))
                            )
                              return w;
                          }
                          return (
                            (e.insert = 0),
                            t === c
                              ? (V(e, !0), 0 === e.strm.avail_out ? S : U)
                              : e.last_lit && (V(e, !1), 0 === e.strm.avail_out)
                              ? w
                              : k
                          );
                        })(r, t)
                      : 3 === r.strategy
                      ? (function (e, t) {
                          for (var r, n, i, a, o = e.window; ; ) {
                            if (e.lookahead <= I) {
                              if ((z(e), e.lookahead <= I && t === d)) return w;
                              if (0 === e.lookahead) break;
                            }
                            if (
                              ((e.match_length = 0),
                              e.lookahead >= C &&
                                0 < e.strstart &&
                                (n = o[(i = e.strstart - 1)]) === o[++i] &&
                                n === o[++i] &&
                                n === o[++i])
                            ) {
                              for (
                                a = e.strstart + I;
                                n === o[++i] &&
                                n === o[++i] &&
                                n === o[++i] &&
                                n === o[++i] &&
                                n === o[++i] &&
                                n === o[++i] &&
                                n === o[++i] &&
                                n === o[++i] &&
                                i < a;

                              );
                              (e.match_length = I - (a - i)),
                                e.match_length > e.lookahead &&
                                  (e.match_length = e.lookahead);
                            }
                            if (
                              (e.match_length >= C
                                ? ((r = u._tr_tally(e, 1, e.match_length - C)),
                                  (e.lookahead -= e.match_length),
                                  (e.strstart += e.match_length),
                                  (e.match_length = 0))
                                : ((r = u._tr_tally(
                                    e,
                                    0,
                                    e.window[e.strstart]
                                  )),
                                  e.lookahead--,
                                  e.strstart++),
                              r && (V(e, !1), 0 === e.strm.avail_out))
                            )
                              return w;
                          }
                          return (
                            (e.insert = 0),
                            t === c
                              ? (V(e, !0), 0 === e.strm.avail_out ? S : U)
                              : e.last_lit && (V(e, !1), 0 === e.strm.avail_out)
                              ? w
                              : k
                          );
                        })(r, t)
                      : s[r.level].func(r, t);
                  if (
                    ((o !== S && o !== U) || (r.status = 666),
                    o === w || o === S)
                  )
                    return 0 === e.avail_out && (r.last_flush = -1), h;
                  if (
                    o === k &&
                    (1 === t
                      ? u._tr_align(r)
                      : 5 !== t &&
                        (u._tr_stored_block(r, 0, 0, !1),
                        3 === t &&
                          (R(r.head),
                          0 === r.lookahead &&
                            ((r.strstart = 0),
                            (r.block_start = 0),
                            (r.insert = 0)))),
                    N(e),
                    0 === e.avail_out)
                  )
                    return (r.last_flush = -1), h;
                }
                return t !== c
                  ? h
                  : r.wrap <= 0
                  ? 1
                  : (2 === r.wrap
                      ? (L(r, 255 & e.adler),
                        L(r, (e.adler >> 8) & 255),
                        L(r, (e.adler >> 16) & 255),
                        L(r, (e.adler >> 24) & 255),
                        L(r, 255 & e.total_in),
                        L(r, (e.total_in >> 8) & 255),
                        L(r, (e.total_in >> 16) & 255),
                        L(r, (e.total_in >> 24) & 255))
                      : (M(r, e.adler >>> 16), M(r, 65535 & e.adler)),
                    N(e),
                    0 < r.wrap && (r.wrap = -r.wrap),
                    0 !== r.pending ? h : 1);
              }),
              (r.deflateEnd = function (e) {
                var t;
                return e && e.state
                  ? (t = e.state.status) !== A &&
                    69 !== t &&
                    73 !== t &&
                    91 !== t &&
                    103 !== t &&
                    t !== P &&
                    666 !== t
                    ? O(e, g)
                    : ((e.state = null), t === P ? O(e, -3) : h)
                  : g;
              }),
              (r.deflateSetDictionary = function (e, t) {
                var r,
                  n,
                  i,
                  a,
                  o,
                  s,
                  u,
                  d = t.length;
                if (!e || !e.state) return g;
                if (
                  2 === (a = (r = e.state).wrap) ||
                  (1 === a && r.status !== A) ||
                  r.lookahead
                )
                  return g;
                for (
                  1 === a && (e.adler = f(e.adler, t, d, 0)),
                    r.wrap = 0,
                    d >= r.w_size &&
                      (0 === a &&
                        (R(r.head),
                        (r.strstart = 0),
                        (r.block_start = 0),
                        (r.insert = 0)),
                      (u = new l.Buf8(r.w_size)),
                      l.arraySet(u, t, d - r.w_size, r.w_size, 0),
                      (t = u),
                      (d = r.w_size)),
                    o = e.avail_in,
                    s = e.next_in,
                    u = e.input,
                    e.avail_in = d,
                    e.next_in = 0,
                    e.input = t,
                    z(r);
                  r.lookahead >= C;

                ) {
                  for (
                    n = r.strstart, i = r.lookahead - (C - 1);
                    (r.ins_h =
                      ((r.ins_h << r.hash_shift) ^ r.window[n + C - 1]) &
                      r.hash_mask),
                      (r.prev[n & r.w_mask] = r.head[r.ins_h]),
                      (r.head[r.ins_h] = n),
                      n++,
                      --i;

                  );
                  (r.strstart = n), (r.lookahead = C - 1), z(r);
                }
                return (
                  (r.strstart += r.lookahead),
                  (r.block_start = r.strstart),
                  (r.insert = r.lookahead),
                  (r.lookahead = 0),
                  (r.match_length = r.prev_length = C - 1),
                  (r.match_available = 0),
                  (e.next_in = s),
                  (e.input = u),
                  (e.avail_in = o),
                  (r.wrap = a),
                  h
                );
              }),
              (r.deflateInfo = "pako deflate (from Nodeca project)");
          },
          {
            "../utils/common": 1,
            "./adler32": 3,
            "./crc32": 4,
            "./messages": 6,
            "./trees": 7,
          },
        ],
        6: [
          function (e, t, r) {
            "use strict";
            t.exports = {
              2: "need dictionary",
              1: "stream end",
              0: "",
              "-1": "file error",
              "-2": "stream error",
              "-3": "data error",
              "-4": "insufficient memory",
              "-5": "buffer error",
              "-6": "incompatible version",
            };
          },
          {},
        ],
        7: [
          function (e, t, r) {
            "use strict";
            var i = e("../utils/common"),
              s = 0,
              u = 1;
            function n(e) {
              for (var t = e.length; 0 <= --t; ) e[t] = 0;
            }
            var o = 29,
              d = 256,
              c = d + 1 + o,
              l = 30,
              f = 19,
              _ = 2 * c + 1,
              v = 15,
              a = 16,
              p = 7,
              h = 256,
              g = 16,
              y = 17,
              m = 18,
              D = [
                0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4,
                4, 4, 4, 5, 5, 5, 5, 0,
              ],
              T = [
                0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9,
                9, 10, 10, 11, 11, 12, 12, 13, 13,
              ],
              E = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
              C = [
                16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1,
                15,
              ],
              I = new Array(2 * (c + 2));
            n(I);
            var b = new Array(2 * l);
            n(b);
            var A = new Array(512);
            n(A);
            var P = new Array(256);
            n(P);
            var w = new Array(o);
            n(w);
            var k,
              S,
              U,
              O = new Array(l);
            function x(e, t, r, n, i) {
              (this.static_tree = e),
                (this.extra_bits = t),
                (this.extra_base = r),
                (this.elems = n),
                (this.max_length = i),
                (this.has_stree = e && e.length);
            }
            function R(e, t) {
              (this.dyn_tree = e), (this.max_code = 0), (this.stat_desc = t);
            }
            function N(e) {
              return e < 256 ? A[e] : A[256 + (e >>> 7)];
            }
            function V(e, t) {
              (e.pending_buf[e.pending++] = 255 & t),
                (e.pending_buf[e.pending++] = (t >>> 8) & 255);
            }
            function L(e, t, r) {
              e.bi_valid > a - r
                ? ((e.bi_buf |= (t << e.bi_valid) & 65535),
                  V(e, e.bi_buf),
                  (e.bi_buf = t >> (a - e.bi_valid)),
                  (e.bi_valid += r - a))
                : ((e.bi_buf |= (t << e.bi_valid) & 65535), (e.bi_valid += r));
            }
            function M(e, t, r) {
              L(e, r[2 * t], r[2 * t + 1]);
            }
            function B(e, t) {
              for (var r = 0; (r |= 1 & e), (e >>>= 1), (r <<= 1), 0 < --t; );
              return r >>> 1;
            }
            function z(e, t, r) {
              for (var n, i = new Array(v + 1), a = 0, o = 1; o <= v; o++)
                i[o] = a = (a + r[o - 1]) << 1;
              for (n = 0; n <= t; n++) {
                var s = e[2 * n + 1];
                0 !== s && (e[2 * n] = B(i[s]++, s));
              }
            }
            function F(e) {
              for (var t = 0; t < c; t++) e.dyn_ltree[2 * t] = 0;
              for (t = 0; t < l; t++) e.dyn_dtree[2 * t] = 0;
              for (t = 0; t < f; t++) e.bl_tree[2 * t] = 0;
              (e.dyn_ltree[2 * h] = 1),
                (e.opt_len = e.static_len = 0),
                (e.last_lit = e.matches = 0);
            }
            function H(e) {
              8 < e.bi_valid
                ? V(e, e.bi_buf)
                : 0 < e.bi_valid && (e.pending_buf[e.pending++] = e.bi_buf),
                (e.bi_buf = 0),
                (e.bi_valid = 0);
            }
            function j(e, t, r, n) {
              var i = 2 * t,
                a = 2 * r;
              return e[i] < e[a] || (e[i] === e[a] && n[t] <= n[r]);
            }
            function q(e, t, r) {
              for (
                var n = e.heap[r], i = r << 1;
                i <= e.heap_len &&
                (i < e.heap_len &&
                  j(t, e.heap[i + 1], e.heap[i], e.depth) &&
                  i++,
                !j(t, n, e.heap[i], e.depth));

              )
                (e.heap[r] = e.heap[i]), (r = i), (i <<= 1);
              e.heap[r] = n;
            }
            function Y(e, t, r) {
              var n,
                i,
                a,
                o,
                s = 0;
              if (0 !== e.last_lit)
                for (
                  ;
                  (n =
                    (e.pending_buf[e.d_buf + 2 * s] << 8) |
                    e.pending_buf[e.d_buf + 2 * s + 1]),
                    (i = e.pending_buf[e.l_buf + s]),
                    s++,
                    0 == n
                      ? M(e, i, t)
                      : (M(e, (a = P[i]) + d + 1, t),
                        0 !== (o = D[a]) && L(e, (i -= w[a]), o),
                        M(e, (a = N(--n)), r),
                        0 !== (o = T[a]) && L(e, (n -= O[a]), o)),
                    s < e.last_lit;

                );
              M(e, h, t);
            }
            function K(e, t) {
              var r,
                n,
                i,
                a = t.dyn_tree,
                o = t.stat_desc.static_tree,
                s = t.stat_desc.has_stree,
                u = t.stat_desc.elems,
                d = -1;
              for (e.heap_len = 0, e.heap_max = _, r = 0; r < u; r++)
                0 !== a[2 * r]
                  ? ((e.heap[++e.heap_len] = d = r), (e.depth[r] = 0))
                  : (a[2 * r + 1] = 0);
              for (; e.heap_len < 2; )
                (a[2 * (i = e.heap[++e.heap_len] = d < 2 ? ++d : 0)] = 1),
                  (e.depth[i] = 0),
                  e.opt_len--,
                  s && (e.static_len -= o[2 * i + 1]);
              for (t.max_code = d, r = e.heap_len >> 1; 1 <= r; r--) q(e, a, r);
              for (
                i = u;
                (r = e.heap[1]),
                  (e.heap[1] = e.heap[e.heap_len--]),
                  q(e, a, 1),
                  (n = e.heap[1]),
                  (e.heap[--e.heap_max] = r),
                  (e.heap[--e.heap_max] = n),
                  (a[2 * i] = a[2 * r] + a[2 * n]),
                  (e.depth[i] =
                    (e.depth[r] >= e.depth[n] ? e.depth[r] : e.depth[n]) + 1),
                  (a[2 * r + 1] = a[2 * n + 1] = i),
                  (e.heap[1] = i++),
                  q(e, a, 1),
                  2 <= e.heap_len;

              );
              (e.heap[--e.heap_max] = e.heap[1]),
                (function (e, t) {
                  for (
                    var r,
                      n,
                      i,
                      a,
                      o,
                      s = t.dyn_tree,
                      u = t.max_code,
                      d = t.stat_desc.static_tree,
                      c = t.stat_desc.has_stree,
                      l = t.stat_desc.extra_bits,
                      f = t.stat_desc.extra_base,
                      p = t.stat_desc.max_length,
                      h = 0,
                      g = 0;
                    g <= v;
                    g++
                  )
                    e.bl_count[g] = 0;
                  for (
                    s[2 * e.heap[e.heap_max] + 1] = 0, r = e.heap_max + 1;
                    r < _;
                    r++
                  )
                    p < (g = s[2 * s[2 * (n = e.heap[r]) + 1] + 1] + 1) &&
                      ((g = p), h++),
                      (s[2 * n + 1] = g),
                      u < n ||
                        (e.bl_count[g]++,
                        (a = 0),
                        f <= n && (a = l[n - f]),
                        (o = s[2 * n]),
                        (e.opt_len += o * (g + a)),
                        c && (e.static_len += o * (d[2 * n + 1] + a)));
                  if (0 !== h) {
                    do {
                      for (g = p - 1; 0 === e.bl_count[g]; ) g--;
                    } while (
                      (e.bl_count[g]--,
                      (e.bl_count[g + 1] += 2),
                      e.bl_count[p]--,
                      0 < (h -= 2))
                    );
                    for (g = p; 0 !== g; g--)
                      for (n = e.bl_count[g]; 0 !== n; )
                        u < (i = e.heap[--r]) ||
                          (s[2 * i + 1] !== g &&
                            ((e.opt_len += (g - s[2 * i + 1]) * s[2 * i]),
                            (s[2 * i + 1] = g)),
                          n--);
                  }
                })(e, t),
                z(a, d, e.bl_count);
            }
            function G(e, t, r) {
              var n,
                i,
                a = -1,
                o = t[1],
                s = 0,
                u = 7,
                d = 4;
              for (
                0 === o && ((u = 138), (d = 3)),
                  t[2 * (r + 1) + 1] = 65535,
                  n = 0;
                n <= r;
                n++
              )
                (i = o),
                  (o = t[2 * (n + 1) + 1]),
                  (++s < u && i === o) ||
                    (s < d
                      ? (e.bl_tree[2 * i] += s)
                      : 0 !== i
                      ? (i !== a && e.bl_tree[2 * i]++, e.bl_tree[2 * g]++)
                      : s <= 10
                      ? e.bl_tree[2 * y]++
                      : e.bl_tree[2 * m]++,
                    (a = i),
                    (d =
                      (s = 0) === o
                        ? ((u = 138), 3)
                        : i === o
                        ? ((u = 6), 3)
                        : ((u = 7), 4)));
            }
            function X(e, t, r) {
              var n,
                i,
                a = -1,
                o = t[1],
                s = 0,
                u = 7,
                d = 4;
              for (0 === o && ((u = 138), (d = 3)), n = 0; n <= r; n++)
                if (
                  ((i = o), (o = t[2 * (n + 1) + 1]), !(++s < u && i === o))
                ) {
                  if (s < d) for (; M(e, i, e.bl_tree), 0 != --s; );
                  else
                    0 !== i
                      ? (i !== a && (M(e, i, e.bl_tree), s--),
                        M(e, g, e.bl_tree),
                        L(e, s - 3, 2))
                      : s <= 10
                      ? (M(e, y, e.bl_tree), L(e, s - 3, 3))
                      : (M(e, m, e.bl_tree), L(e, s - 11, 7));
                  (a = i),
                    (d =
                      (s = 0) === o
                        ? ((u = 138), 3)
                        : i === o
                        ? ((u = 6), 3)
                        : ((u = 7), 4));
                }
            }
            n(O);
            var J = !1;
            function W(e, t, r, n) {
              L(e, 0 + (n ? 1 : 0), 3),
                (n = t),
                (t = r),
                (r = !0),
                H((e = e)),
                r && (V(e, t), V(e, ~t)),
                i.arraySet(e.pending_buf, e.window, n, t, e.pending),
                (e.pending += t);
            }
            (r._tr_init = function (e) {
              J ||
                ((function () {
                  for (
                    var e, t, r, n = new Array(v + 1), i = 0, a = 0;
                    a < o - 1;
                    a++
                  )
                    for (w[a] = i, e = 0; e < 1 << D[a]; e++) P[i++] = a;
                  for (P[i - 1] = a, a = r = 0; a < 16; a++)
                    for (O[a] = r, e = 0; e < 1 << T[a]; e++) A[r++] = a;
                  for (r >>= 7; a < l; a++)
                    for (O[a] = r << 7, e = 0; e < 1 << (T[a] - 7); e++)
                      A[256 + r++] = a;
                  for (t = 0; t <= v; t++) n[t] = 0;
                  for (e = 0; e <= 143; ) (I[2 * e + 1] = 8), e++, n[8]++;
                  for (; e <= 255; ) (I[2 * e + 1] = 9), e++, n[9]++;
                  for (; e <= 279; ) (I[2 * e + 1] = 7), e++, n[7]++;
                  for (; e <= 287; ) (I[2 * e + 1] = 8), e++, n[8]++;
                  for (z(I, c + 1, n), e = 0; e < l; e++)
                    (b[2 * e + 1] = 5), (b[2 * e] = B(e, 5));
                  (k = new x(I, D, d + 1, c, v)),
                    (S = new x(b, T, 0, l, v)),
                    (U = new x(new Array(0), E, 0, f, p));
                })(),
                (J = !0)),
                (e.l_desc = new R(e.dyn_ltree, k)),
                (e.d_desc = new R(e.dyn_dtree, S)),
                (e.bl_desc = new R(e.bl_tree, U)),
                (e.bi_buf = 0),
                (e.bi_valid = 0),
                F(e);
            }),
              (r._tr_stored_block = W),
              (r._tr_flush_block = function (e, t, r, n) {
                var i,
                  a,
                  o = 0;
                0 < e.level
                  ? (2 === e.strm.data_type &&
                      (e.strm.data_type = (function (e) {
                        for (var t = 4093624447, r = 0; r <= 31; r++, t >>>= 1)
                          if (1 & t && 0 !== e.dyn_ltree[2 * r]) return s;
                        if (
                          0 !== e.dyn_ltree[18] ||
                          0 !== e.dyn_ltree[20] ||
                          0 !== e.dyn_ltree[26]
                        )
                          return u;
                        for (r = 32; r < d; r++)
                          if (0 !== e.dyn_ltree[2 * r]) return u;
                        return s;
                      })(e)),
                    K(e, e.l_desc),
                    K(e, e.d_desc),
                    (o = (function (e) {
                      var t;
                      for (
                        G(e, e.dyn_ltree, e.l_desc.max_code),
                          G(e, e.dyn_dtree, e.d_desc.max_code),
                          K(e, e.bl_desc),
                          t = f - 1;
                        3 <= t && 0 === e.bl_tree[2 * C[t] + 1];
                        t--
                      );
                      return (e.opt_len += 3 * (t + 1) + 5 + 5 + 4), t;
                    })(e)),
                    (i = (e.opt_len + 3 + 7) >>> 3),
                    (a = (e.static_len + 3 + 7) >>> 3) <= i && (i = a))
                  : (i = a = r + 5),
                  r + 4 <= i && -1 !== t
                    ? W(e, t, r, n)
                    : 4 === e.strategy || a === i
                    ? (L(e, 2 + (n ? 1 : 0), 3), Y(e, I, b))
                    : (L(e, 4 + (n ? 1 : 0), 3),
                      (function (e, t, r, n) {
                        var i;
                        for (
                          L(e, t - 257, 5),
                            L(e, r - 1, 5),
                            L(e, n - 4, 4),
                            i = 0;
                          i < n;
                          i++
                        )
                          L(e, e.bl_tree[2 * C[i] + 1], 3);
                        X(e, e.dyn_ltree, t - 1), X(e, e.dyn_dtree, r - 1);
                      })(
                        e,
                        e.l_desc.max_code + 1,
                        e.d_desc.max_code + 1,
                        o + 1
                      ),
                      Y(e, e.dyn_ltree, e.dyn_dtree)),
                  F(e),
                  n && H(e);
              }),
              (r._tr_tally = function (e, t, r) {
                return (
                  (e.pending_buf[e.d_buf + 2 * e.last_lit] = (t >>> 8) & 255),
                  (e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t),
                  (e.pending_buf[e.l_buf + e.last_lit] = 255 & r),
                  e.last_lit++,
                  0 === t
                    ? e.dyn_ltree[2 * r]++
                    : (e.matches++,
                      t--,
                      e.dyn_ltree[2 * (P[r] + d + 1)]++,
                      e.dyn_dtree[2 * N(t)]++),
                  e.last_lit === e.lit_bufsize - 1
                );
              }),
              (r._tr_align = function (e) {
                L(e, 2, 3),
                  M(e, h, I),
                  16 === (e = e).bi_valid
                    ? (V(e, e.bi_buf), (e.bi_buf = 0), (e.bi_valid = 0))
                    : 8 <= e.bi_valid &&
                      ((e.pending_buf[e.pending++] = 255 & e.bi_buf),
                      (e.bi_buf >>= 8),
                      (e.bi_valid -= 8));
              });
          },
          { "../utils/common": 1 },
        ],
        8: [
          function (e, t, r) {
            "use strict";
            t.exports = function () {
              (this.input = null),
                (this.next_in = 0),
                (this.avail_in = 0),
                (this.total_in = 0),
                (this.output = null),
                (this.next_out = 0),
                (this.avail_out = 0),
                (this.total_out = 0),
                (this.msg = ""),
                (this.state = null),
                (this.data_type = 2),
                (this.adler = 0);
            };
          },
          {},
        ],
        "/lib/deflate.js": [
          function (e, t, r) {
            "use strict";
            var o = e("./zlib/deflate"),
              s = e("./utils/common"),
              u = e("./utils/strings"),
              n = e("./zlib/messages"),
              i = e("./zlib/zstream"),
              d = Object.prototype.toString;
            function a(e) {
              if (!(this instanceof a)) return new a(e);
              this.options = s.assign(
                {
                  level: -1,
                  method: 8,
                  chunkSize: 16384,
                  windowBits: 15,
                  memLevel: 8,
                  strategy: 0,
                  to: "",
                },
                e || {}
              );
              var t = this.options;
              if (
                (t.raw && 0 < t.windowBits
                  ? (t.windowBits = -t.windowBits)
                  : t.gzip &&
                    0 < t.windowBits &&
                    t.windowBits < 16 &&
                    (t.windowBits += 16),
                (this.err = 0),
                (this.msg = ""),
                (this.ended = !1),
                (this.chunks = []),
                (this.strm = new i()),
                (this.strm.avail_out = 0) !==
                  (e = o.deflateInit2(
                    this.strm,
                    t.level,
                    t.method,
                    t.windowBits,
                    t.memLevel,
                    t.strategy
                  )))
              )
                throw new Error(n[e]);
              if (
                (t.header && o.deflateSetHeader(this.strm, t.header),
                t.dictionary)
              ) {
                t =
                  "string" == typeof t.dictionary
                    ? u.string2buf(t.dictionary)
                    : "[object ArrayBuffer]" === d.call(t.dictionary)
                    ? new Uint8Array(t.dictionary)
                    : t.dictionary;
                if (0 !== (e = o.deflateSetDictionary(this.strm, t)))
                  throw new Error(n[e]);
                this._dict_set = !0;
              }
            }
            function c(e, t) {
              t = new a(t);
              if ((t.push(e, !0), t.err)) throw t.msg || n[t.err];
              return t.result;
            }
            (a.prototype.push = function (e, t) {
              var r,
                n,
                i = this.strm,
                a = this.options.chunkSize;
              if (this.ended) return !1;
              (n = t === ~~t ? t : !0 === t ? 4 : 0),
                "string" == typeof e
                  ? (i.input = u.string2buf(e))
                  : "[object ArrayBuffer]" === d.call(e)
                  ? (i.input = new Uint8Array(e))
                  : (i.input = e),
                (i.next_in = 0),
                (i.avail_in = i.input.length);
              do {
                if (
                  (0 === i.avail_out &&
                    ((i.output = new s.Buf8(a)),
                    (i.next_out = 0),
                    (i.avail_out = a)),
                  1 !== (r = o.deflate(i, n)) && 0 !== r)
                )
                  return this.onEnd(r), !(this.ended = !0);
              } while (
                ((0 !== i.avail_out &&
                  (0 !== i.avail_in || (4 !== n && 2 !== n))) ||
                  ("string" === this.options.to
                    ? this.onData(
                        u.buf2binstring(s.shrinkBuf(i.output, i.next_out))
                      )
                    : this.onData(s.shrinkBuf(i.output, i.next_out))),
                (0 < i.avail_in || 0 === i.avail_out) && 1 !== r)
              );
              return 4 === n
                ? ((r = o.deflateEnd(this.strm)),
                  this.onEnd(r),
                  (this.ended = !0),
                  0 === r)
                : 2 !== n || (this.onEnd(0), !(i.avail_out = 0));
            }),
              (a.prototype.onData = function (e) {
                this.chunks.push(e);
              }),
              (a.prototype.onEnd = function (e) {
                0 === e &&
                  ("string" === this.options.to
                    ? (this.result = this.chunks.join(""))
                    : (this.result = s.flattenChunks(this.chunks))),
                  (this.chunks = []),
                  (this.err = e),
                  (this.msg = this.strm.msg);
              }),
              (r.Deflate = a),
              (r.deflate = c),
              (r.deflateRaw = function (e, t) {
                return ((t = t || {}).raw = !0), c(e, t);
              }),
              (r.gzip = function (e, t) {
                return ((t = t || {}).gzip = !0), c(e, t);
              });
          },
          {
            "./utils/common": 1,
            "./utils/strings": 2,
            "./zlib/deflate": 5,
            "./zlib/messages": 6,
            "./zlib/zstream": 8,
          },
        ],
      },
      {},
      []
    )("/lib/deflate.js");
  });
  var Base64 = {
      _keyStr:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      encode: function (e) {
        var t,
          r,
          n,
          i,
          a,
          o,
          s = "",
          u = 0;
        for (e = Base64._utf8_encode(e); u < e.length; )
          (n = (o = e.charCodeAt(u++)) >> 2),
            (i = ((3 & o) << 4) | ((t = e.charCodeAt(u++)) >> 4)),
            (a = ((15 & t) << 2) | ((r = e.charCodeAt(u++)) >> 6)),
            (o = 63 & r),
            isNaN(t) ? (a = o = 64) : isNaN(r) && (o = 64),
            (s =
              s +
              this._keyStr.charAt(n) +
              this._keyStr.charAt(i) +
              this._keyStr.charAt(a) +
              this._keyStr.charAt(o));
        return s;
      },
      isEncode: function (e) {
        if (null === e || "" === e || "" === e.trim()) return !1;
        try {
          return btoa(atob(e)) == e;
        } catch (e) {
          return !1;
        }
      },
      decode: function (e) {
        var t,
          r,
          n,
          i,
          a,
          o,
          s = "",
          u = 0;
        for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); u < e.length; )
          (n = this._keyStr.indexOf(e.charAt(u++))),
            (t =
              ((15 & (i = this._keyStr.indexOf(e.charAt(u++)))) << 4) |
              ((a = this._keyStr.indexOf(e.charAt(u++))) >> 2)),
            (r = ((3 & a) << 6) | (o = this._keyStr.indexOf(e.charAt(u++)))),
            (s += String.fromCharCode((n << 2) | (i >> 4))),
            64 != a && (s += String.fromCharCode(t)),
            64 != o && (s += String.fromCharCode(r));
        return (s = Base64._utf8_decode(s));
      },
      _utf8_encode: function (e) {
        e = e.replace(/\r\n/g, "\n");
        for (var t = "", r = 0; r < e.length; r++) {
          var n = e.charCodeAt(r);
          n < 128
            ? (t += String.fromCharCode(n))
            : (127 < n && n < 2048
                ? (t += String.fromCharCode((n >> 6) | 192))
                : ((t += String.fromCharCode((n >> 12) | 224)),
                  (t += String.fromCharCode(((n >> 6) & 63) | 128))),
              (t += String.fromCharCode((63 & n) | 128)));
        }
        return t;
      },
      _utf8_decode: function (e) {
        var t,
          r = "",
          n = 0;
        for (c1 = c2 = 0; n < e.length; )
          (t = e.charCodeAt(n)) < 128
            ? ((r += String.fromCharCode(t)), n++)
            : 191 < t && t < 224
            ? ((c2 = e.charCodeAt(n + 1)),
              (r += String.fromCharCode(((31 & t) << 6) | (63 & c2))),
              (n += 2))
            : ((c2 = e.charCodeAt(n + 1)),
              (c3 = e.charCodeAt(n + 2)),
              (r += String.fromCharCode(
                ((15 & t) << 12) | ((63 & c2) << 6) | (63 & c3)
              )),
              (n += 3));
        return r;
      },
    },
    DTDHelpers = {
      forEach: function (e, t) {
        for (var r = 0; r < t.length; ++r) e(t[r], r);
      },
      format: function (e, r) {
        return (
          1 === r.length &&
            null !== r[0] &&
            "object" === _typeof(r[0]) &&
            (r = r[0]),
          e.replace(/{([^}]*)}/g, function (e, t) {
            return void 0 !== r[t] ? r[t] : e;
          })
        );
      },
      generateUUID: function () {
        var r = new Date().getTime();
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (e) {
            var t = (r + 16 * Math.random()) % 16 | 0;
            return (
              (r = Math.floor(r / 16)),
              ("x" === e ? t : (3 & t) | 8).toString(16)
            );
          }
        );
      },
      forEachObj: function (e, t) {
        for (var r in t) t.hasOwnProperty(r) && e(t[r], r);
        return {};
      },
      findObj: function (e, t) {
        for (var r in t) if (t.hasOwnProperty(r) && e(t[r], r)) return t[r];
        return null;
      },
      trimmer: function (e) {
        return (e = e && e.toString().trim());
      },
      filterObj: function (e, t) {
        var r,
          n = {};
        for (r in t) t.hasOwnProperty(r) && e(t[r], r) && (n[r] = t[r]);
        return n;
      },
      parseUrlParams: function (e, t) {
        (e = decodeURIComponent(e)),
          (t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"));
        e = new RegExp("[\\?&=]" + t + "=([^&#]*)").exec(e);
        return null === e || (e && "string" != typeof e[1] && e[1].length)
          ? ""
          : decodeURIComponent(e[1]).replace(/\+/g, " ");
      },
    },
    DTDTypeValidator = {
      isFunction: function (e) {
        return "function" == typeof e;
      },
      isString: function (e) {
        return "string" == typeof e;
      },
      isNull: function (e) {
        return null === e;
      },
      isArray: function (e) {
        return !!e && -1 < e.constructor.toString().indexOf("Array");
      },
      isObject: function (e) {
        return e === Object(e) && !DTDTypeValidator.isArray(e);
      },
      isNullOrEmpty: function (e) {
        if (void 0 === e) return !0;
        if (
          "function" == typeof e ||
          "[object Date]" === Object.prototype.toString.call(e)
        )
          return !1;
        if (DTDTypeValidator.isNumber(e) || DTDTypeValidator.isBoolean(e))
          return DTDTypeValidator.isNull(e);
        if (DTDTypeValidator.isNull(e) || 0 === DTDHelpers.trimmer(e).length)
          return !0;
        if ("object" !== _typeof(e)) return !1;
        for (var t in e) return !1;
        return !0;
      },
      isNumber: function (e) {
        return "number" == typeof e;
      },
      isInteger: function (e) {
        return "number" == typeof e && parseInt(e) === e;
      },
      isBoolean: function (e) {
        return "boolean" == typeof e;
      },
      isArrayEqual: function (e, t) {
        if (e === t) return !0;
        if (null === e || null === t) return !1;
        if (e.length !== t.length) return !1;
        for (var r = 0; r < e.length; r++) if (e[r] !== t[r]) return !1;
        return !0;
      },
      isEqual: function (e, t) {
        if (null === e && e === t) return !0;
        if (_typeof(e) === _typeof(t))
          switch (_typeof(e)) {
            case "number":
            case "string":
            case "boolean":
              return e === t;
            case "object":
              if (DTDTypeValidator.isArray(e) && DTDTypeValidator.isArray(t))
                return DTDTypeValidator.isArrayEqual(e, t);
              if (DTDTypeValidator.isObject(e) && DTDTypeValidator.isObject(t))
                return JSON.stringify(e) === JSON.stringify(t);
          }
        return !1;
      },
    },
    DTDTransformer = {
      delNotValidChars: function (e) {
        var t;
        return (
          "string" == typeof e &&
            ((t = new RegExp("\\p{C}", "ug")), (e = e.replace(t, ""))),
          e
        );
      },
      format: function (e, r) {
        return (
          1 === r.length &&
            null !== r[0] &&
            "object" === _typeof(r[0]) &&
            (r = r[0]),
          e.replace(/{([^}]*)}/g, function (e, t) {
            return void 0 !== r[t] ? r[t] && r[t].toString() : e;
          })
        );
      },
      languageToISO639_1: function (e) {
        var t = null;
        return (t =
          !DTDTypeValidator.isNullOrEmpty(e) && DTDTypeValidator.isString(e)
            ? (t = e.split("-"))[0].toLowerCase()
            : t);
      },
    },
    DTDSystemManager = (function () {
      var e,
        o = DTDTypeValidator,
        t = "name",
        r = "version",
        i = function (e, t) {
          return (
            "string" == typeof e &&
            -1 !== t.toLowerCase().indexOf(e.toLowerCase())
          );
        },
        a = {
          rgx: function (e, t) {
            for (var r, n, i, a, o, s = 0; s < t.length && !a; ) {
              for (
                var u = t[s], d = t[s + 1], c = (r = 0);
                c < u.length && !a;

              )
                if ((a = u[c++].exec(e)))
                  for (n = 0; n < d.length; n++)
                    (o = a[++r]),
                      "object" === _typeof((i = d[n])) && 0 < i.length
                        ? 2 == i.length
                          ? "function" == typeof i[1]
                            ? (this[i[0]] = i[1].call(this, o))
                            : (this[i[0]] = i[1])
                          : 3 == i.length
                          ? "function" != typeof i[1] ||
                            (i[1].exec && i[1].test)
                            ? (this[i[0]] = o ? o.replace(i[1], i[2]) : void 0)
                            : (this[i[0]] = o
                                ? i[1].call(this, o, i[2])
                                : void 0)
                          : 4 == i.length &&
                            (this[i[0]] = o
                              ? i[3].call(this, o.replace(i[1], i[2]))
                              : void 0)
                        : (this[i] = o || void 0);
              s += 2;
            }
          },
          str: function (e, t) {
            for (var r in t)
              if ("object" === _typeof(t[r]) && 0 < t[r].length) {
                for (var n = 0; n < t[r].length; n++)
                  if (i(t[r][n], e)) return "?" === r ? void 0 : r;
              } else if (i(t[r], e)) return "?" === r ? void 0 : r;
            return e;
          },
        },
        n = {
          os: {
            windows: {
              version: {
                ME: "4.90",
                "NT 3.11": "NT3.51",
                "NT 4.0": "NT4.0",
                2e3: "NT 5.0",
                XP: ["NT 5.1", "NT 5.2"],
                Vista: "NT 6.0",
                7: "NT 6.1",
                8: "NT 6.2",
                8.1: "NT 6.3",
                10: ["NT 6.4", "NT 10.0"],
                RT: "ARM",
              },
            },
          },
        },
        s = {
          os: [
            [/microsoft\s(windows)\s(vista|xp)/i],
            [t, r],
            [
              /(windows)\snt\s6\.2;\s(arm)/i,
              /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,
              /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i,
            ],
            [t, [r, a.str, n.os.windows.version]],
            [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
            [
              [t, "Windows"],
              [r, a.str, n.os.windows.version],
            ],
            [/\((bb)(10);/i],
            [[t, "BlackBerry"], r],
            [
              /(blackberry)\w*\/?([\w\.]*)/i,
              /(tizen|kaios)[\/\s]([\w\.]+)/i,
              /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i,
            ],
            [t, r],
            [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i],
            [[t, "Symbian"], r],
            [/\((series40);/i],
            [t],
            [/mozilla.+\(mobile;.+gecko.+firefox/i],
            [[t, "Firefox OS"], r],
            [
              /(nintendo|playstation)\s([wids34portablevu]+)/i,
              /(mint)[\/\s\(]?(\w*)/i,
              /(mageia|vectorlinux)[;\s]/i,
              /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,
              /(hurd|linux)\s?([\w\.]*)/i,
              /(gnu)\s?([\w\.]*)/i,
            ],
            [t, r],
            [/(cros)\s[\w]+\s([\w\.]+\w)/i],
            [[t, "Chromium OS"], r],
            [/(sunos)\s?([\w\.\d]*)/i],
            [[t, "Solaris"], r],
            [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i],
            [t, r],
            [/(haiku)\s(\w+)/i],
            [t, r],
            [
              /cfnetwork\/.+darwin/i,
              /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i,
            ],
            [
              [r, /_/g, "."],
              [t, "iOS"],
            ],
            [/(mac\sos\sx)\s?([\w\s\.]*)/i, /(macintosh|mac(?=_powerpc)\s)/i],
            [
              [t, "Mac OS"],
              [r, /_/g, "."],
            ],
            [
              /((?:open)?solaris)[\/\s-]?([\w\.]*)/i,
              /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,
              /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,
              /(unix)\s?([\w\.]*)/i,
            ],
            [t, r],
          ],
          bot: [
            "Slurp",
            "nuhk",
            "YandexBot",
            "YandexAccessibilityBot",
            "YandexMobileBot",
            "YandexDirectDyn",
            "yammybot",
            "Openbot",
            "MSNBot",
            "YandexScreenshotBot",
            "YandexImages",
            "YandexVideo",
            "YandexVideoParser",
            "YandexMedia",
            "YandexBlogs",
            "YandexFavicons",
            "YandexWebmaster",
            "YandexPagechecker",
            "YandexImageResizer",
            "YandexAdNet",
            "YandexDirect",
            "YaDirectFetcher",
            "YandexCalendar",
            "YandexSitelinks",
            "YandexMetrika",
            "YandexNews",
            "YandexNewslinks",
            "YandexCatalog",
            "YandexAntivirus",
            "YandexMarket",
            "YandexVertis",
            "YandexForDomain",
            "YandexSpravBot",
            "YandexSearchShop",
            "YandexMedianaBot",
            "YandexOntoDB",
            "YandexOntoDBAPI",
            "Googlebot",
            "Googlebot-Image",
            "Mediapartners-Google",
            "AdsBot-Google",
            "Mail.RU_Bot",
            "bingbot",
            "Accoona",
            "ia_archiver",
            "Ask Jeeves",
            "OmniExplorer_Bot",
            "W3C_Validator",
            "WebAlta",
            "YahooFeedSeeker",
            "Yahoo!",
            "Ezooms",
            "Tourlentabot",
            "MJ12bot",
            "AhrefsBot",
            "SearchBot",
            "SiteStatus",
            "Nigma.ru",
            "Baiduspider",
            "Statsbot",
            "SISTRIX",
            "AcoonBot",
            "findlinks",
            "proximic",
            "OpenindexSpider",
            "statdom.ru",
            "Exabot",
            "Spider",
            "SeznamBot",
            "oBot",
            "C-T bot",
            "Updownerbot",
            "Snoopy",
            "heritrix",
            "Yeti",
            "DomainVader",
            "DCPbot",
            "PaperLiBot",
          ],
        };
      function u() {
        var n = {};
        (this._get = function (e) {
          return void 0 !== n[e] ? n[e] : null;
        }),
          (this._set = function (e, t) {
            n[e] = t;
          }),
          (function () {
            try {
              var r =
                  window && window.navigator && window.navigator.userAgent
                    ? window.navigator.userAgent
                    : "",
                e = { name: void 0, version: void 0 };
              a.rgx.call(e, r, s.os),
                ((n = {
                  appId: null,
                  base64: !0,
                  osName: e.name || "unknown",
                  osVer: e.version || "unknown",
                  sdkVer: "2.0.5",
                  sdkVerCode: 20,
                  agent: r,
                  tzOffset: -60 * new Date().getTimezoneOffset(),
                  lang: DTDTransformer.languageToISO639_1(
                    "undefined" != typeof navigator &&
                      (navigator.language || navigator.userLanguage)
                  ),
                  resolution: window.screen.width + "x" + window.screen.height,
                  apiUrl: "https://statgw.devtodev.com/",
                  callbackDId: null,
                  isBot: !1,
                  engine: "Native",
                }).isBot = !!DTDHelpers.findObj(function (e, t) {
                  return r.includes(e);
                }, s.bot));
            } catch (e) {}
          })();
      }
      return (
        (u.prototype.setSdkVerCode = function (e) {
          "Native" !== this._get("engine") && this._set("sdkVerCode", e);
        }),
        (u.prototype.setSdkVer = function (e) {
          "Native" !== this._get("engine") && this._set("sdkVer", e);
        }),
        (u.prototype.setTestCustomUrl = function (e) {
          this._set("testName", e);
        }),
        (u.prototype.getTestCustomUrl = function () {
          return this._get("testName");
        }),
        (u.prototype.setApiUrl = function (e) {
          "/" == e.slice(-1) && (e = e.substring(0, e.length - 1)),
            this._set("apiUrl", e);
        }),
        (u.prototype.getApiUrl = function () {
          return this._get("apiUrl");
        }),
        (u.prototype.setEnv = function (e) {
          if (void 0 !== e)
            for (var t = ["engine", "base64"], r = t.length - 1; 0 <= r; r--)
              void 0 !== e[t[r]] && this._set(t[r], e[t[r]]);
        }),
        (u.prototype.isBase64 = function () {
          return this._get("base64", !0);
        }),
        (u.prototype.setAppId = function (e) {
          return this._set("appId", e);
        }),
        (u.prototype.getAppId = function () {
          return this._get("appId");
        }),
        (u.prototype.getSdkVer = function () {
          return this._get("sdkVer");
        }),
        (u.prototype.getSdkVerCode = function () {
          return this._get("sdkVerCode");
        }),
        (u.prototype.getUA = function () {
          return this._get("agent");
        }),
        (u.prototype.getTzOffset = function () {
          return this._get("tzOffset");
        }),
        (u.prototype.getLanguage = function () {
          return this._get("lang");
        }),
        (u.prototype.getOsName = function () {
          return this._get("osName");
        }),
        (u.prototype.getOsVer = function () {
          return this._get("osVer");
        }),
        (u.prototype.getDisplayResolution = function () {
          return this._get("resolution");
        }),
        (u.prototype.buildUrl = function (e, t) {
          var r = this._get("testName"),
            n = this._get("apiUrl");
          o.isString(r) && !o.isNullOrEmpty(r) && e.unshift(r);
          var i,
            a = "";
          for (i in t)
            (a += "" !== a ? "&" : ""),
              (a += i + "=" + encodeURIComponent(t[i]));
          return n + e.join("/") + "?" + a;
        }),
        (u.prototype.setCallbackDId = function (e) {
          (!o.isFunction(e) && null !== e) || this._set("callbackDId", e);
        }),
        (u.prototype.getCallbackDId = function () {
          return this._get("callbackDId");
        }),
        (u.prototype.isBot = function () {
          return this._get("isBot");
        }),
        (u.prototype.useXDR = function () {
          return !!window.XDomainRequest;
        }),
        (u.prototype.getEngine = function () {
          return this._get("engine");
        }),
        {
          getInstance: function () {
            return (e = e || new u());
          },
        }
      );
    })(),
    DTDLogger = (function () {
      "use strict";
      function r(e, t, r) {
        if (_ && p[e] <= p[_]) {
          var n,
            i =
              ((a = new Date()),
              (o = a.getDate()),
              (s = a.getMonth() + 1),
              (u = a.getFullYear()),
              (d = a.getHours()),
              (c = a.getMinutes()),
              (l = a.getSeconds()),
              (i = a.getMilliseconds()),
              u +
                "/" +
                (a = function (e) {
                  var t =
                      1 < arguments.length && void 0 !== arguments[1]
                        ? arguments[1]
                        : 2,
                    r = e.toString().length;
                  return (r < t ? "0".repeat(t - r) : "") + e;
                })(s) +
                "/" +
                a(o) +
                " " +
                a(d) +
                ":" +
                a(c) +
                ":" +
                a(l) +
                ":" +
                a(i, 3));
          if ((g.isNullOrEmpty(r) || (t = h.format(t, r)), void 0 !== f))
            f(e, t);
          else {
            switch (
              ((t = i + " [Devtodev " + v.getSdkVer() + "] " + e + " " + t),
              p[e])
            ) {
              case p.Error:
                n = console.error;
                break;
              case p.Warning:
                n = console.warn;
                break;
              case p.Info:
                n = console.info;
                break;
              case p.Debug:
                n = console.log;
            }
            void 0 !== n && n(t);
          }
        }
        var a, o, s, u, d, c, l, i;
      }
      function e() {}
      var f,
        p = { No: 0, Error: 1, Warning: 3, Info: 7, Debug: 15 },
        t = null,
        h = DTDTransformer,
        g = DTDTypeValidator,
        _ = "No",
        v = DTDSystemManager.getInstance();
      return (
        (e.prototype.setLogLevel = function (e) {
          g.isNullOrEmpty(e) || g.isNullOrEmpty(p[e])
            ? this.warning(
                "Invalid log level: {type}. Avaliable levels: [No, Error, Warning, Info, Debug]",
                { type: e }
              )
            : (_ = e);
        }),
        (e.prototype.getLogLevel = function () {
          return _;
        }),
        (e.prototype.warning = function (e, t) {
          r("Warning", e, t);
        }),
        (e.prototype.info = function (e, t) {
          r("Info", e, t);
        }),
        (e.prototype.error = function (e, t) {
          r("Error", e, t);
        }),
        (e.prototype.debug = function (e, t) {
          r("Debug", e, t);
        }),
        (e.prototype.setCallback = function (e) {
          f = e;
        }),
        {
          getInstance: function () {
            return (t = t || new e());
          },
        }
      );
    })(),
    DTDRequestHeader = {
      DeviceId: "DeviceId",
      PreviousDeviceId: "PreviousDeviceId",
      UserId: "UserId",
      PreviousUserId: "PreviousUserId",
      DevtodevId: "DevtodevId",
      CrossPlatformDevtodevId: "CrossPlatformDevtodevId",
      DevtodevIdTimestamp: "DevtodevIdTimestamp",
      Encoding: "X-Id-Encoding",
    },
    DTDRequestResponse = {
      DevtodevId: "devtodevId",
      CrossPlatformDevtodevId: "crossPlatformDevtodevId",
      DevtodevIdTimestamp: "devtodevIdTimestamp",
    },
    DTDDefaultsFields = {
      LogLevel: "logLevel",
      CurrentLevel: "currentLevel",
      AppVersion: "applicationVersion",
      Tracking: "trackingAvailability",
      UserId: "userId",
    },
    DTDKeys = {
      RemoteConfig: {
        ExperimentsSettings: {
          Key: "experiments",
          Id: "id",
          Group: "group",
          Conditions: "conditions",
          Parameters: "parameters",
          CompletionDate: "completionDate",
          IsTesting: "isTesting",
        },
        UserProperties: { Key: "userProperties", Country: "country" },
        Callback: "Callback",
        ConfigKey: "ConfigKey",
        Backend: {
          Country: "country",
          Level: "level",
          PayingUser: "payingUser",
        },
      },
      UserRemoteConfig: {
        Settings: "0",
        DefaultsConfig: "1",
        RemoteConfig: "2",
      },
      UserExperiments: { Ids: "0", Status: "1", Time: "4" },
    },
    DTDUserStorage = {
      UserId: "2",
      PrevUserId: "3",
      TimeSentBalance: "4",
      DevtodevId: "5",
      CrossPlatformDevtodevId: "6",
      RegistrationDate: "7",
      LastForeground: "8",
      SessionLength: "9",
      SessionStarted: "10",
      TutorialSteps: "11",
      CurrentLevel: "12",
      ReferralSatus: "14",
      CurrencyAccrual: "15",
      Profile: "16",
      UpdateProfile: "17",
      IsPayingUser: "19",
      UserExperiments: "20",
      Tracking: "21",
      IsDefault: "22",
      BackendAsk: "23",
      LastActive: "24",
      DeviceId: "25",
      UserProperties: "26",
      Experiments: "27",
      PrevDeviceId: "28",
      DefaultConfig: "29",
      DevtodevIdTimestamp: "31",
      DeviceCounting: "1",
    },
    DTDAppStorage = {
      UUID: "0",
      AppVersion: "1",
      TransactionIds: "2",
      Config: "4",
      IsMigration: "5",
    },
    DTDEventStorage = {
      PrimaryId: "0",
      PrimaryUserId: "1",
      language: "2",
      appVersion: "3",
      sdkVersion: "4",
      sdkCodeVersion: "5",
      Forced: "6",
      Params: "7",
      Code: "8",
      engine: "9",
    },
    AccrualTypes = { 0: "earned", 1: "bought" },
    DTDPeople = {
      Tester: "tester",
      Cheater: "cheater",
      Age: "age",
      Name: "name",
      Email: "email",
      Phone: "phone",
      Photo: "photo",
      Gender: "gender",
    },
    DTDRemoteConfigSource = {
      Ending: "ending",
      Remote: "remote",
      Defaults: "defaults",
    },
    DTDEventParams = {
      Code: "code",
      Timestamp: "timestamp",
      SessionId: "sessionId",
      InExperiments: "inExperiments",
      Level: "level",
    };
  (UTM_TERM = "term"),
    (UTM_MEDIUM = "medium"),
    (UTM_SOURCE = "source"),
    (UTM_CONTENT = "content"),
    (UTM_CAMPAIGN = "campaign"),
    (SP_CODE = "sp"),
    (SP_NET = "socialNetwork"),
    (SP_REASON = "postReason"),
    (SC_CODE = "sc"),
    (SC_NET = "socialNetwork"),
    (TR_CODE = "tr"),
    (TR_STEP = "step"),
    (RP_CODE = "rp"),
    (RP_PRICE = "price"),
    (RP_ORDER_ID = "orderId"),
    (RP_PRODUCT_ID = "productId"),
    (RP_CURRENCY = "currencyCode"),
    (VP_CODE = "vp"),
    (VP_PURCHASE_ID = "purchaseId"),
    (VP_PURCHASE_TYPE = "purchaseType"),
    (VP_PURCHASE_PRICE = "purchasePrice"),
    (VP_PURCHASE_AMOUNT = "purchaseAmount"),
    (VP_PURCHASE_CURRENCY = "purchasePriceCurrency"),
    (DI_CODE = "di"),
    (DI_OS_VER = "osVersion"),
    (DI_OS = "os"),
    (DI_UUID = "uuid"),
    (DI_UA = "userAgent"),
    (DI_TZ = "timeZoneOffset"),
    (DI_DISPLAY_RESOLUTION = "displayResolution"),
    (CE_CODE = "ce"),
    (CE_NAME = "name"),
    (CE_PARAMS = "parameters"),
    (LU_CODE = "lu"),
    (LU_LEVEL = "level"),
    (LU_SPENT = "spent"),
    (LU_EARND = "earned"),
    (LU_BOUGHT = "bought"),
    (LU_BALANCE = "balance"),
    (UE_CODE = "ue"),
    (UE_LN = "length"),
    (AL_CODE = "al"),
    (RF_CODE = "rf"),
    (SS_CODE = "ss"),
    (CA_CODE = "ca"),
    (CA_CURRENCY_NAME = "currencyName"),
    (CA_CURRENCY_AMOUNT = "currencyAmount"),
    (CA_TYPE = "accrualType"),
    (CA_SOURCE = "currencySource"),
    (PE_CODE = "pe"),
    (PE_NAME = "name"),
    (PE_PARAMS = "parameters"),
    (PE_SPENT = "spent"),
    (PE_EARND = "earned"),
    (PE_SOURCE = "source"),
    (PE_DIFFICULTY = "difficulty"),
    (PE_SUCCESS = "successfulCompletion"),
    (PE_DURATION = "duration"),
    (TS_CODE = "ts"),
    (TS_ALLOWED = "trackingAllowed"),
    (PL_CODE = "pl"),
    (PL_PARAMS = "parameters"),
    (CB_CODE = "cb"),
    (Int32Max = 2147483647),
    (Int32Min = -2147483647),
    (Int64Max = Number.MAX_SAFE_INTEGER),
    (Int64Min = Number.MIN_SAFE_INTEGER),
    (MT_INIT = "Initialize"),
    (ADRV_CODE = "adrv"),
    (ADRV_NETWORK = "ad_network"),
    (ADRV_UNIT = "ad_unit"),
    (ADRV_REVENUE = "revenue"),
    (ADRV_PLACEMENT = "placement"),
    (MES_PREFIX = "In the {method} method error has occurred: ");
  var ValidatorRules = (function () {
      "use strict";
      function w(e, t, r) {
        var n =
            !(3 < arguments.length && void 0 !== arguments[3]) || arguments[3],
          i =
            !(4 < arguments.length && void 0 !== arguments[4]) || arguments[4],
          a = !V.isNullOrEmpty(r),
          t = { arg: t, method: e };
        return (
          a ||
            ((e = "{arg} is empty!"),
            DTDTypeValidator.isNull(r) && (e = "{arg} is null!"),
            (i || n) && M(e, t, n)),
          a
        );
      }
      function d(e, t, r) {
        var n =
            !(3 < arguments.length && void 0 !== arguments[3]) || arguments[3],
          i = !0;
        return (
          V.isBoolean(r) ||
            ((i = !1),
            M(
              x,
              { method: e, arg: t, nType: "boolean", cType: _typeof(r) },
              n
            )),
          i
        );
      }
      function k(e, t, r, n, i) {
        var a =
            !(5 < arguments.length && void 0 !== arguments[5]) || arguments[5],
          o = { arg: t, method: e, nType: "number" },
          s = V.isNumber(r);
        return (
          s || ((s = !1), (o.cType = _typeof(r)), M(x, o, a)),
          (s = (s = s && c(e, t, r, a)) && u(e, t, r, n, i, a))
        );
      }
      function S(i, a, e, o, s, u) {
        var d = {};
        return (
          L(function (e, t) {
            var r = N.delNotValidChars(t),
              n = "The [" + r + "] key of the " + a,
              t = "The value of the " + a;
            B(i, n, r, !1) &&
              ((r = F(i, n, r, o)), z(i, t, e, s, u, !1) && (d[r] = e));
          }, e),
          d
        );
      }
      function U(e) {
        var t =
            1 < arguments.length && void 0 !== arguments[1]
              ? arguments[1]
              : "Referrer",
          r = [UTM_SOURCE, UTM_MEDIUM, UTM_CONTENT, UTM_CAMPAIGN, UTM_TERM],
          n = {};
        (i = e),
          (a = t),
          V.isNullOrEmpty(i) &&
            M("{method} has empty arguments!", { method: a }, !0),
          V.isObject(i) ||
            M(
              x,
              {
                method: a,
                arg: "Arguments",
                nType: "object",
                cType: _typeof(i),
              },
              !0
            );
        for (var i, a, o = r.length - 1; 0 <= o; o--) {
          var s,
            u,
            d = r[o];
          void 0 !== e[d] &&
            ((s = N.delNotValidChars(e[d])),
            B(
              t,
              (u = "The value of the utm data dictionary by [" + d + "] key"),
              s,
              !1
            ) && ((s = F(t, u, s, 255)), (n[d] = s)));
        }
        return (
          V.isNullOrEmpty(n) &&
            M("{method} has empty Resources dictionary!", { method: t }, !0),
          n
        );
      }
      function O(e, t, r) {
        var n = "The order id argument value",
          i = "The price argument value",
          a = "The product id parameter value",
          o = "The currency code parameter value",
          s = N.delNotValidChars(e[RP_ORDER_ID]),
          u = e[RP_PRICE],
          d = N.delNotValidChars(e[RP_PRODUCT_ID]),
          c = N.delNotValidChars(e[RP_CURRENCY]);
        if (
          (w(t, i, u) && k(t, i, u, Int64Min, Int64Max),
          B(t, n, s) && ((s = F(t, n, s, 65)), (e[RP_ORDER_ID] = s)),
          B(t, a, d) && (e[RP_PRODUCT_ID] = F(t, a, d, 255)),
          B(t, o, c) &&
            (function (e, t, r, n) {
              var i = !0;
              r.length !== n &&
                ((i = !1),
                M(
                  "{arg} Parameter length must be equal to [{size}]!",
                  { arg: t, method: e, size: n },
                  !(4 < arguments.length && void 0 !== arguments[4]) ||
                    arguments[4]
                ));
            })(t, o, c, 3),
          void 0 !== r.trIds && -1 !== r.trIds.indexOf(e[RP_ORDER_ID]))
        )
          throw (
            (R.info("This order({order}) has already been sent. Skipped", {
              order: s,
            }),
            null)
          );
        return e;
      }
      var x = "{arg} is [{cType}], but must be [{nType}]",
        o =
          (_defineProperty((e = {}), SC_CODE, SC_NET),
          _defineProperty(e, SP_CODE, SP_NET),
          _defineProperty(e, TR_CODE, TR_STEP),
          _defineProperty(e, CE_CODE, CE_NAME),
          _defineProperty(e, VP_CODE, VP_PURCHASE_ID),
          _defineProperty(e, PE_CODE, PE_NAME),
          e),
        R = DTDLogger.getInstance(),
        N = DTDTransformer,
        V = DTDTypeValidator,
        L = DTDHelpers.forEachObj,
        M = function (e, t) {
          if (
            !(2 < arguments.length && void 0 !== arguments[2]) ||
            arguments[2]
          )
            throw new Error(N.format(e, t));
          R.error(MES_PREFIX + e, t);
        },
        B = function (e, t, r) {
          var n =
              !(3 < arguments.length && void 0 !== arguments[3]) ||
              arguments[3],
            i = { arg: t, method: e, nType: "string" },
            t = w(
              e,
              t,
              r,
              n,
              !(4 < arguments.length && void 0 !== arguments[4]) || arguments[4]
            );
          return (
            t && ((t = V.isString(r)) || ((i.cType = _typeof(r)), M(x, i, n))),
            t
          );
        },
        u = function (e, t, r, n, i) {
          var a,
            o =
              !(5 < arguments.length && void 0 !== arguments[5]) ||
              arguments[5],
            t = { arg: t, method: e },
            e = !0;
          return (
            e &&
              r < n &&
              ((t.val = r),
              (t.min = n),
              (e = !(a =
                "{arg} [{val}] is less than the min [{min}] permitted value!"))),
            e &&
              i < r &&
              ((t.val = r),
              (t.max = i),
              (e = !(a =
                "{arg} [{val}] is greater than the max [{max}] permitted value!"))),
            e || M(a, t, o),
            e
          );
        },
        c = function (e, t, r) {
          var n =
              !(3 < arguments.length && void 0 !== arguments[3]) ||
              arguments[3],
            r = !isNaN(r);
          return r || M("{arg} is the NaN.", { arg: t, method: e }, n), r;
        },
        z = function (e, t, r, n, i) {
          var a =
              !(5 < arguments.length && void 0 !== arguments[5]) ||
              arguments[5],
            o = { arg: t, method: e, nType: "integer" },
            s = V.isInteger(r);
          return (
            s || ((s = !1), (o.cType = _typeof(r)), M(x, o, a)),
            (s = (s = s && c(e, t, r, a)) && u(e, t, r, n, i, a))
          );
        },
        F = function (e, t, r, n) {
          var i = r.substring(0, n);
          return (
            i != r &&
              R.warning(
                MES_PREFIX +
                  '{arg}: {value} is longer than it is permitted. The string was truncated to length "{maxLn}"!',
                { method: e, arg: t, maxLn: n, value: r }
              ),
            i
          );
        },
        e = function () {};
      return (
        (e.prototype.validAppId = function (e, t) {
          var r = "The application key argument value",
            t = N.delNotValidChars(t);
          return B(e, r, t) ? (t = F(e, r, t, 255)) : null;
        }),
        (e.prototype.validUserId = function (e, t) {
          var r = "The user id argument value",
            t = N.delNotValidChars(t);
          return B(e, r, t, !1, !1) ? F(e, r, t, 64) : null;
        }),
        (e.prototype.validReplaceId = function (e, t, r) {
          var n = "The user id argument value";
          return (
            (t = N.delNotValidChars(t)),
            (r = N.delNotValidChars(r)),
            V.isNullOrEmpty(t)
              ? (t = null)
              : B(e, n, t, !0) && (t = F(e, n, t, 64)),
            { prevId: t, id: (r = B(e, n, r) ? F(e, n, r, 64) : r) }
          );
        }),
        (e.prototype.validEvent = function (e, t) {
          var r,
            a,
            n,
            i,
            o,
            s,
            u,
            d,
            c,
            l,
            f,
            p,
            h,
            g,
            _,
            v,
            y,
            m,
            D,
            T,
            E,
            C,
            I,
            b,
            A =
              2 < arguments.length && void 0 !== arguments[2]
                ? arguments[2]
                : "system",
            P =
              3 < arguments.length && void 0 !== arguments[3]
                ? arguments[3]
                : {};
          switch (e) {
            case SC_CODE:
              return (
                (E = t),
                (C = A),
                (I = "The social network name argument value"),
                (b = N.delNotValidChars(E[SC_NET])),
                B(C, I, b) && (E[SC_NET] = F(C, I, b, 24)),
                E
              );
            case TR_CODE:
              return (function (e, t, r) {
                var n = e[TR_STEP];
                if (
                  (z(t, "The step argument value", n, Int32Min, Int32Max),
                  n < 1 &&
                    -1 === [0, -1, -2].indexOf(n) &&
                    M(
                      "A tutorial step can include only predefined values: 0(Skipped), -1(Start), -2(Finish), and it can also be a positive integer",
                      { method: t }
                    ),
                  void 0 !== r.steps && -1 !== r.steps.indexOf(n))
                )
                  throw (
                    (R.info(
                      "This tutorial step({step}) has already been sent. Skipped",
                      { step: n }
                    ),
                    null)
                  );
                return e;
              })(t, A, P);
            case SP_CODE:
              return (
                (v = t),
                (y = A),
                (E = "The social network name argument value"),
                (m = N.delNotValidChars(v[SC_NET])),
                (D = "The post reason argument value"),
                (T = N.delNotValidChars(v[SP_REASON])),
                B(y, E, m) && (v[SC_NET] = F(y, E, m, 24)),
                B(y, D, T) && (v[SP_REASON] = F(y, D, T, 32)),
                v
              );
            case RP_CODE:
              return O(t, A, P);
            case VP_CODE:
              return (
                (h = A),
                (m = "The purchase identifier"),
                (g = "The purchase type"),
                (y = "The purchase amount"),
                (D = (p = t)[VP_PURCHASE_AMOUNT]),
                (T = N.delNotValidChars(p[VP_PURCHASE_ID])),
                (v = N.delNotValidChars(p[VP_PURCHASE_TYPE])),
                (_ = _defineProperty({}, VP_PURCHASE_AMOUNT, D)),
                w(h, y, D) && z(h, y, D, 1, Int32Max),
                B(h, m, T) && (_[VP_PURCHASE_ID] = F(h, m, T, 32)),
                B(h, g, v) && (_[VP_PURCHASE_TYPE] = F(h, g, v, 96)),
                void 0 === p.r
                  ? ((m = "The purchase currency value"),
                    (T = N.delNotValidChars(p.c)),
                    (g = p.p),
                    (v = "The purchase price value"),
                    B(h, m, T) && (T = F(h, m, T, 24)),
                    w(h, v, g) &&
                      z(h, v, g, 1, Int32Max) &&
                      (_[VP_PURCHASE_PRICE] = _defineProperty({}, T, g)))
                  : (_[VP_PURCHASE_PRICE] = S(
                      h,
                      "resources dictionary",
                      p.r,
                      24,
                      1,
                      Int32Max
                    )),
                V.isNullOrEmpty(_[VP_PURCHASE_PRICE]) &&
                  M("resources dictionary is empty!", { method: h }, !0),
                _
              );
            case CE_CODE:
              return (
                (r = t),
                (a = A),
                (n = P),
                (i = "The custom event name"),
                (o = N.delNotValidChars(r[CE_NAME])),
                (s = r[CE_PARAMS]),
                (d = "The key of the parameters dictionary"),
                (l = !(c = {})),
                (f = void (u = 0) !== n.maxCeParams ? n.maxCeParams : 10),
                B(a, i, o) && ((o = F(a, i, o, 72)), (r[CE_NAME] = o)),
                L(function (e, t) {
                  var r, n, i;
                  u < f &&
                    ((r = N.delNotValidChars(t)),
                    (n = !1),
                    (i = N.format(
                      "The value of the parameters dictionary by [{trimKey}] key",
                      { trimKey: r }
                    )),
                    (t = e),
                    B(a, d, r, !1) &&
                      w(a, i, t, !1) &&
                      ((r = F(a, d, r, 32)),
                      V.isNumber(e)
                        ? (n = k(a, i, e, Int64Min, Int64Max, !1))
                        : V.isBoolean(e)
                        ? (n = !0)
                        : V.isString(e)
                        ? ((t = N.delNotValidChars(t)),
                          (n = B(a, i, t, !1)) && (t = F(a, d, t, 255)))
                        : M(
                            x,
                            {
                              arg: i,
                              method: a,
                              cType: _typeof(t),
                              nType: "boolean, integer, number, string",
                            },
                            !1
                          ),
                      n && ((c[r] = t), (l = !0)))),
                    u++;
                }, s),
                delete r[CE_PARAMS],
                l &&
                  ((r[CE_PARAMS] = c),
                  f < u &&
                    R.error(
                      "[CustomEventParameters] Limit reached [{amount}] when adding a new parameter",
                      { amount: f }
                    )),
                r
              );
            case LU_CODE:
              return (function (e, t) {
                var r,
                  n,
                  i = e[LU_LEVEL],
                  a = [LU_EARND, LU_SPENT, LU_BOUGHT, LU_BALANCE],
                  o = {};
                z(t, "The level argument value", i, 1, Int32Max - 1),
                  (o[LU_LEVEL] = i);
                for (var s = a.length - 1; 0 <= s; s--)
                  if (!V.isNullOrEmpty(e[(r = a[s])])) {
                    switch (r) {
                      case LU_EARND:
                        o[r] = S(
                          t,
                          (n = "earn dictionary"),
                          e[r],
                          24,
                          1,
                          Int32Max
                        );
                        break;
                      case LU_SPENT:
                        o[r] = S(
                          t,
                          (n = "spent dictionary"),
                          e[r],
                          24,
                          1,
                          Int32Max
                        );
                        break;
                      case LU_BOUGHT:
                        o[r] = S(
                          t,
                          (n = "bought dictionary"),
                          e[r],
                          24,
                          1,
                          Int32Max
                        );
                        break;
                      case LU_BALANCE:
                        o[r] = S(
                          t,
                          (n = "balances dictionary"),
                          e[r],
                          24,
                          Int32Min,
                          Int32Max
                        );
                    }
                    V.isNullOrEmpty(o[r]) &&
                      (M("{arg} is empty!", { method: t, arg: n }, !1),
                      delete o[r]);
                  }
                return o;
              })(t, A);
            case RF_CODE:
              return U(t, A);
            case ADRV_CODE:
              return (
                (g = t),
                (p = A),
                (h = "The network argument value"),
                (_ = "The placement argument value"),
                (n = "The unit argument value"),
                (i = N.delNotValidChars(g[ADRV_NETWORK])),
                (o = g[ADRV_REVENUE]),
                (s = N.delNotValidChars(g[ADRV_PLACEMENT])),
                (r = N.delNotValidChars(g[ADRV_UNIT])),
                (g = _defineProperty({}, "source", "sdk")),
                B(p, h, i) && (g[ADRV_NETWORK] = F(p, h, i, 100)),
                B(p, _, s, !1, !1) && (g[ADRV_PLACEMENT] = F(p, _, s, 100)),
                B(p, n, r, !1, !1) && (g[ADRV_UNIT] = F(p, n, r, 100)),
                k(p, "The revenue argument value", o, 0, Int64Max) &&
                  (g[ADRV_REVENUE] = o),
                g
              );
            case CB_CODE:
              return (function (e, t) {
                e = S(t, "balance", e, 24, Int64Min, Int64Max);
                return (
                  V.isNullOrEmpty(e) &&
                    M("balance is empty!", { method: t }, !0),
                  { balance: e }
                );
              })(t, A);
            default:
              return t;
          }
        }),
        (e.prototype.isExcluded = function (e, t, r) {
          var n,
            i = { code: t },
            a = !1;
          return (
            void 0 !== e[t] &&
              (0 === e[t].length
                ? ((a = !0),
                  R.info(
                    "Event [{code}] is excluded by project configuration",
                    i
                  ))
                : (V.isNullOrEmpty(o[t]) && (n = o[t]),
                  -1 !== e[t].indexOf(r[n]) &&
                    ((i[arg] = n),
                    R.info(
                      "Event [{code}] with {arg} argument is excluded by project configuration",
                      i
                    ),
                    (a = !0)))),
            a
          );
        }),
        (e.prototype.validCA = function (e, t, r, n, i, a) {
          var e = "CurrencyAccrual",
            o = "The currency name",
            s = "The currency amount",
            u = "The source",
            d = {},
            n = N.delNotValidChars(n),
            t = N.delNotValidChars(t);
          return (
            B(e, o, t) && (d[CA_CURRENCY_NAME] = F(e, o, t, 24)),
            B(e, u, n) && (d[CA_SOURCE] = F(e, u, n, 32)),
            w(e, s, r) &&
              z(e, s, r, 1, Int32Max) &&
              (d[CA_CURRENCY_AMOUNT] = r),
            void 0 === AccrualTypes[i] &&
              M(
                "Accrual type can include only predefined values: 0(earned), 1(bought), and it can also be a positive value",
                { method: e },
                !0
              ),
            void 0 !== a[AccrualTypes[i]] &&
              void 0 !== a[AccrualTypes[i]][n] &&
              void 0 !== a[AccrualTypes[i]][n][t] &&
              a[AccrualTypes[i]][n][t] + r > Int32Max &&
              M("{amountArg} is overflowed", { amountArg: s, method: e }, !0),
            (d[CA_TYPE] = i),
            d
          );
        }),
        (e.prototype.validLevel = function (e, t) {
          return z(e, "The level argument value", t, 1, Int32Max - 1);
        }),
        (e.prototype.validTraking = function (e, t) {
          return d(e, "status", t, !0);
        }),
        (e.prototype.validAppVer = function (e, t) {
          var r = "The app version argument value",
            t = N.delNotValidChars(t);
          return B(e, r, t) ? (t = F(e, r, t, 255)) : null;
        }),
        (e.prototype.validSdkCode = function (e, t) {
          return z(e, "The sdk code argument value", t, 1, Int32Max - 1);
        }),
        (e.prototype.validStartPe = function (e, t, r) {
          var n = "The event name argument value",
            i = "The source parameter value",
            a = N.delNotValidChars(t),
            t = {};
          return (
            B(e, n, a) && (t.name = F(e, n, a, 40)),
            V.isNullOrEmpty(r) ||
              (void 0 !== r[PE_SOURCE] &&
                ((a = N.delNotValidChars(r[PE_SOURCE])),
                B(e, i, a) && (t[PE_SOURCE] = F(e, i, a, 40))),
              void 0 !== r[PE_DIFFICULTY] &&
                z(
                  e,
                  "The difficulty parameter value",
                  r[PE_DIFFICULTY],
                  Int32Min,
                  Int32Max
                ) &&
                (t[PE_DIFFICULTY] = r[PE_DIFFICULTY])),
            t
          );
        }),
        (e.prototype.validStopPe = function (e, t, r) {
          var n,
            i,
            a = "The event name argument value",
            t = N.delNotValidChars(t),
            o = [PE_SPENT, PE_EARND],
            s = _defineProperty({}, PE_SUCCESS, !1);
          if ((B(e, a, t) && (s.name = F(e, a, t, 40)), !V.isNullOrEmpty(r))) {
            void 0 !== r[PE_DURATION] &&
              z(
                e,
                "The duration parameter value",
                r[PE_DURATION],
                0,
                Int32Max
              ) &&
              (s[PE_DURATION] = r[PE_DURATION]),
              void 0 !== r[PE_SUCCESS] &&
                d(e, "The success parameter value", r[PE_SUCCESS], !0) &&
                (s[PE_SUCCESS] = r[PE_SUCCESS]);
            for (var u = o.length - 1; 0 <= u; u--)
              if (void 0 !== r[(n = o[u])]) {
                switch (n) {
                  case PE_EARND:
                    (i = "Earn"),
                      (s[n] = S(e, "earn dictionary", r[n], 24, 1, Int64Max));
                    break;
                  case PE_SPENT:
                    (i = "Spent"),
                      (s[n] = S(e, "spent dictionary", r[n], 24, 1, Int64Max));
                }
                V.isNullOrEmpty(s[n]) &&
                  (M("{arg} dictionary is empty !", { method: e, arg: i }, !1),
                  delete s[n]);
              }
          }
          return s;
        }),
        (e.prototype.validPlKey = function (e, t) {
          var r =
              !(2 < arguments.length && void 0 !== arguments[2]) ||
              arguments[2],
            n = N.delNotValidChars(t),
            i = "The key argument",
            t = DTDPeople;
          if (B(e, i, n, r)) {
            switch ((n = F(e, i, n, 64)).toLowerCase()) {
              case t.Name:
              case t.Email:
              case t.Photo:
              case t.Phone:
              case t.Age:
              case t.Cheater:
              case t.Gender:
                n = n.toLowerCase();
            }
            return n;
          }
          return null;
        }),
        (e.prototype.validPlVal = function (e, t, r) {
          var n = DTDPeople,
            i = "The value argument",
            a = null,
            o = { arg: i };
          switch (
            (DTDTypeValidator.isNullOrEmpty(r) && M("{arg} is empty!", o, !0),
            t)
          ) {
            case n.Name:
            case n.Email:
            case n.Photo:
            case n.Phone:
              V.isString(r) ||
                M(
                  "Invalid value! The [{value}] value of the reserved key [{key}] must be String",
                  { key: t, value: r },
                  !0
                );
              break;
            case n.Age:
              V.isInteger(r) ||
                M(
                  "Invalid value! The [{value}] value of the reserved key [{key}] must be Integer",
                  { key: t, value: r },
                  !0
                ),
                r <= 0 &&
                  M(
                    'Invalid value! The [{value}] value of the reserved key [{key}] is less than the min [0] permitted value!"',
                    { key: t, value: r },
                    !0
                  );
              break;
            case n.Tester:
            case n.Cheater:
              V.isBoolean(r) ||
                M(
                  "Invalid value! The [{value}] value of the reserved key [{key}] must be Boolean",
                  { key: t, value: r },
                  !0
                );
              break;
            case n.Gender:
              -1 === [0, 1, 2].indexOf(r) &&
                M(
                  "Gender can only be specified with a predefined value: 0 (Unknown), 1 (Male), 2 (Female)",
                  {},
                  !0
                );
          }
          n = _typeof(r);
          return (
            -1 !== ["string", "number", "boolean"].indexOf(n)
              ? V.isNumber(r)
                ? k(e, i, r, Int64Min, Int64Max) && (a = r)
                : (a = V.isBoolean(r)
                    ? r
                    : ((a = N.delNotValidChars(r)),
                      DTDTypeValidator.isNullOrEmpty(a) &&
                        M("{arg} is empty!", o, !0),
                      F(e, i, r, 255)))
              : ((o.nType = "number, string or boolean"),
                (o.cType = _typeof(a)),
                M(x, o, !0)),
            a
          );
        }),
        (e.prototype.validMigration = function (e, t) {
          var r,
            n = {};
          for (r in t) V.isNullOrEmpty(t[r]) || (n[r] = t[r]);
          return n;
        }),
        e
      );
    })(),
    Task = (function () {
      var v = DTDTypeValidator.isNullOrEmpty,
        y = DTDLogger.getInstance();
      function e(e, t, r) {
        (this._xhr = null),
          (this._key = e),
          (this._structure = t),
          (this._callback = r);
      }
      return (
        (e.prototype = {
          run: function () {
            var e =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : { sync: !1, gzip: !0, method: "POST", timeout: 3e3 };
            this.abort();
            var t,
              r = this._structure.url,
              n = !!window.XDomainRequest,
              i = e.method || "GET",
              a = this._structure.body || {},
              o = this._structure.headers || {},
              s = this._structure.toBase64 || [],
              u = !!e.sync,
              d = this._callback,
              c = {
                Method: i,
                URL: r,
                Headers: {},
                EncodedHeaders: {},
                Content: {},
              };
            if (void 0 !== this._structure.auxiliary) {
              var l = this._structure.auxiliary;
              for (g in l) l.hasOwnProperty(g) && (c[g] = l[g]);
            }
            function f(e, t, r) {
              void 0 !== d && d(e, t, r);
            }
            if (n)
              y.warning("Cannot be sent because XDomainRequest is being used");
            else {
              var p = new window.XMLHttpRequest();
              "GET" !== i &&
                "HEAD" !== i &&
                ((n = "application/json"),
                (a = (function (e) {
                  var t = {};
                  for (g in e) e.hasOwnProperty(g) && !v(e[g]) && (t[g] = e[g]);
                  return t;
                })(a)),
                (c.Content = a),
                e.gzip
                  ? ((a = iampakopako.deflate(JSON.stringify(a), {
                      gzip: !0,
                      level: 9,
                    })),
                    (n = "application/gzip"))
                  : (a = JSON.stringify(a)),
                o["content-type"] ||
                  o["Content-Type"] ||
                  (o["Content-Type"] = n));
              var h,
                g,
                _ = !1;
              for (g in ((p.withCredentials = !0),
              u || (p.withCredentials = !!e.withCredentials),
              (p.timeout = 3e3),
              p.open(i, r, !u),
              o))
                o.hasOwnProperty(g) &&
                  !v(o[g]) &&
                  ((h = o[g]),
                  -1 != s.indexOf(g) &&
                    ((t = o[g]), (h = v(t) ? t : Base64.encode(t)), (_ = !0)),
                  (c.Headers[g] = o[g]),
                  (c.EncodedHeaders[g] = h),
                  p.setRequestHeader(g, h));
              _ &&
                ((g = "X-Id-Encoding"),
                p.setRequestHeader(g, "base64"),
                (c.Headers[g] = "base64"),
                (c.EncodedHeaders[g] = "base64")),
                (p.onload = function () {
                  var e,
                    t = null,
                    r = 1223 === p.status ? 204 : p.status;
                  if (0 !== r) {
                    e = p.response || p.responseText;
                    try {
                      e = JSON.parse(e);
                    } catch (e) {}
                  } else t = new Error("Internal XMLHttpRequest Error");
                  f(r, e, t);
                }),
                (p.onerror = function (e) {
                  ((e = !(e instanceof Error)
                    ? new Error("" + (e || "Unknown XMLHttpRequest Error"))
                    : e).statusCode = 0),
                    f(e.statusCode, {}, e);
                }),
                (p.ontimeout = function (e) {
                  ((e = !(e instanceof Error)
                    ? new Error("" + (e || "Unknown XMLHttpRequest Error"))
                    : e).statusCode = 0),
                    f(e.statusCode, {}, e);
                }),
                p.send("function" == typeof ArrayBufferView ? a : a.buffer),
                y.debug(JSON.stringify(c, null, 2));
            }
            this._xhr = p;
          },
          abort: function () {
            v(this._xhr) || this._xhr.abort();
          },
        }),
        e
      );
    })(),
    DTDApi = (function () {
      function e() {
        function a(e) {
          void 0 !== n[e] && (n[e].abort(), delete n[e]);
        }
        var n = {};
        (this._run = function (e, t, r) {
          a(e),
            (n[e] = new Task(
              e,
              t,
              function (n, i) {
                return function (e, t, r) {
                  n(e, t, r), a(i);
                };
              }.bind(this)(r, e)
            )),
            n[e].run();
        }),
          (this._stop = function (e) {
            a(e);
          });
      }
      return (
        (e.prototype = {
          run: function (e, t, r) {
            this._run(e, t, r);
          },
          stop: function (e) {
            this._stop(e);
          },
        }),
        e
      );
    })(),
    EventQueueManager = function (r, I) {
      var e = [
          "language",
          "sdkCodeVersion",
          "sdkVersion",
          "engine",
          "appVersion",
        ],
        b = DTDHelpers;
      function t(m, D, T, E) {
        (this._status = 0), (this._tempEvents = {});
        function C(e, t) {
          r.hasTask(_key) &&
            (r.removeTaskByKey(_key),
            I.stop(_key),
            _logger.info("Report has been abort")),
            (e = new DTDTimeManagerTask(
              function () {
                t();
              },
              e,
              _key
            )),
            r.addTask(e);
        }
        (this._checkedAbFreez = function () {
          var e = D.experiments().time() + E.getAbTimeout() - Date.now();
          0 < e ? C(e, this._run) : this._run();
        }),
          (this._run = function () {
            if (
              0 === this._status ||
              (0 < arguments.length &&
                void 0 !== arguments[0] &&
                arguments[0] &&
                3 !== this._status)
            ) {
              var e,
                n = this._run,
                t = T.getEventsByUser(D.getPrimaryId()),
                r = {},
                i = [],
                a = !0,
                o =
                  (_defineProperty(
                    (l = {}),
                    _DTDRequestHeader.DeviceId,
                    D.getDeviceId()
                  ),
                  _defineProperty(
                    l,
                    _DTDRequestHeader.PreviousDeviceId,
                    D.getPrevDeviceId()
                  ),
                  _defineProperty(l, _DTDRequestHeader.UserId, D.getId()),
                  _defineProperty(
                    l,
                    _DTDRequestHeader.PreviousUserId,
                    D.getPrevUserId()
                  ),
                  l,
                  D.haveBackendId() &&
                    (null !== D.getD2dCrossId() &&
                      (l[_DTDRequestHeader.CrossPlatformDevtodevId] =
                        D.getD2dCrossId()),
                    (l[_DTDRequestHeader.DevtodevId] = D.getD2dId()),
                    (l[_DTDRequestHeader.DevtodevIdTimestamp] = D.getD2dTm())),
                  {
                    headers: l,
                    auxiliary: {},
                    toBase64: [
                      _DTDRequestHeader.DeviceId,
                      _DTDRequestHeader.PreviousDeviceId,
                      _DTDRequestHeader.UserId,
                      _DTDRequestHeader.PreviousUserId,
                    ],
                    url: m.buildUrl(["v2", "analytics", "report"], {
                      appId: m.getAppId(),
                    }),
                  }),
                s = D.experiments(),
                u = {},
                d = this,
                c = b.generateUUID();
              for (e in ((this._status = 1), this._tempEvents))
                t.push(this._tempEvents[e]);
              this._tempEvents = {};
              for (
                var l, f = 0;
                f < Math.min(t.length, E.getCountForRequest());
                f++
              ) {
                var p = t[f],
                  h = _getHash(p),
                  g = p[_DTDEventStorage.PrimaryId],
                  _ =
                    void 0 !== p[_DTDEventStorage.Code]
                      ? p[_DTDEventStorage.Code]
                      : p[_DTDEventStorage.Params][_DTDEventParams.Code],
                  v = p[_DTDEventStorage.Params][_DTDEventParams.Timestamp];
                if (
                  (s.isOffer() || s.isExist()) &&
                  v >= s.time() &&
                  s.time() + E.getAbTimeout() < Date.now()
                ) {
                  var y = s.time() + E.getAbTimeout() - Date.now();
                  C(y, n), (this._status = 2);
                  break;
                }
                _isNullOrEmpty(r[h]) && ((r[h] = _createPackage(p)), i.push(h)),
                  void 0 !== g && (u[g] = g),
                  (a = !1),
                  s.isMark() &&
                    v >= s.time() &&
                    -1 === [DI_CODE].indexOf(_) &&
                    (p[_DTDEventStorage.Params][_DTDEventParams.InExperiments] =
                      s.experimentIds()),
                  (p[_DTDEventStorage.Params][_DTDEventParams.Code] = _),
                  r[h].events.push(p[_DTDEventStorage.Params]);
              }
              T.removeByPrimaryIds({}),
                a ||
                  ((reports =
                    (_defineProperty((l = {}), "registrationDate", D.getRg()),
                    _defineProperty(l, "packages", []),
                    l)),
                  _forEach(function (e, t) {
                    reports.packages.push(r[e]);
                  }, i),
                  (o.body = { reports: [reports] }),
                  (o.auxiliary["Content UUID"] = c),
                  _logger.info("Trying to send a report [{id}]", { id: c }),
                  I.run(_key, o, function (e, t, r) {
                    !(function (e, t, r) {
                      r = { id: r, status: e };
                      _isNullOrEmpty(t) && 200 === e
                        ? (T.removeByPrimaryIds(u),
                          setTimeout(function () {
                            d._run(!0);
                          }, 0),
                          _logger.info(
                            "Report [{id}] has been sent successfully",
                            r
                          ))
                        : (C(15e3, n),
                          (d._status = 0),
                          _logger.error(
                            "Report [{id}] submission failed. Status code: {status}",
                            r
                          ),
                          _logger.debug("The network queue is stopped"));
                    })(e, r, c);
                  })),
                2 !== this._status && (this._status = a ? 0 : 1);
            }
          });
      }
      return (
        (_forEach = b.forEach),
        (_isNullOrEmpty = DTDTypeValidator.isNullOrEmpty),
        (_DTDEventStorage = DTDEventStorage),
        (_DTDEventParams = DTDEventParams),
        (_key = "events"),
        (_DTDRequestHeader = DTDRequestHeader),
        (_logger = DTDLogger.getInstance()),
        (_getHash = function (r) {
          var n = [];
          return (
            _forEach(function (e, t) {
              _DTDEventStorage.hasOwnProperty(e) &&
                n.push(r[_DTDEventStorage[e]]);
            }, e),
            n.join("_")
          );
        }),
        (_createPackage = function (n) {
          var i = { events: [] };
          return (
            _forEach(function (e, t) {
              var r = _DTDEventStorage[e];
              _isNullOrEmpty(n[r]) || (i[e] = n[r]);
            }, e),
            i
          );
        }),
        (t.prototype = {
          start: function () {
            this._status = 0;
          },
          stop: function () {
            (this._tempEvents = {}), (this._status = 3);
          },
          add: function (e, t) {
            this._tempEvents[e] = t;
          },
          send: function () {
            0 == this._status
              ? this._run()
              : 2 == this._status && this._checkedAbFreez();
          },
        }),
        t
      );
    },
    ConfigManager = function (h, g) {
      function e(i, n, a, o, s, t) {
        function r(e, t, r) {
          if (((f = new Date().getTime()), _isNullOrEmpty(r) && 200 === e))
            (c = 3), _isFunction(s) && s(t), (_attempt = 0);
          else if (422 === e) (c = 3), (_attempt = 0);
          else {
            var n = d;
            switch (
              (202 === e
                ? ((c = 5),
                  (_retryTimeOutBack = t.retryAfter),
                  (n = _retryTimeOutBack),
                  _attempt++)
                : ((_attempt = 0), (c = 2)),
              i)
            ) {
              case "sdk":
                _logger.debug(
                  "Failed to get analytics configuration, using the default configuration and retrying after " +
                    parseInt(n / 1e3) +
                    " seconds"
                );
                break;
              case "d2dId":
                _logger.error("BackendIdentifiers unknown status code " + e);
            }
            p(n);
          }
        }
        function u() {
          var e = (function () {
            var e =
              (_defineProperty(
                (e = {}),
                _DTDRequestHeader.DeviceId,
                a.getDeviceId()
              ),
              _defineProperty(
                e,
                _DTDRequestHeader.PreviousDeviceId,
                a.getPrevDeviceId()
              ),
              _defineProperty(e, _DTDRequestHeader.UserId, a.getId()),
              _defineProperty(
                e,
                _DTDRequestHeader.PreviousUserId,
                a.getPrevUserId()
              ),
              e);
            a.haveBackendId() &&
              (null !== a.getD2dCrossId() &&
                (e[_DTDRequestHeader.CrossPlatformDevtodevId] =
                  a.getD2dCrossId()),
              (e[_DTDRequestHeader.DevtodevId] = a.getD2dId()));
            var t = {
                headers: e,
                toBase64: [
                  _DTDRequestHeader.DeviceId,
                  _DTDRequestHeader.PreviousDeviceId,
                  _DTDRequestHeader.UserId,
                  _DTDRequestHeader.PreviousUserId,
                ],
              },
              r = [];
            switch (i) {
              case "sdk":
                (t.body = {
                  sdkVersion: n.getSdkVer(),
                  appVersion: o.getAppVer(),
                  excludeVersion: o.getExcludeVer(),
                  sdkCodeVersion: n.getSdkVerCode(),
                }),
                  (r = ["v2", "analytics", "config"]);
                break;
              case "exp":
                r = ["v2", "remoteconfig", "experiments"];
                break;
              case "offer":
                r = ["v2", "remoteconfig", "offer"];
                break;
              case "d2dId":
                (r = ["v2", "analytics", "identification"]),
                  (t.body = { attempt: l });
            }
            return (t.url = n.buildUrl(r, { appId: n.getAppId() })), t;
          })();
          (c = 1), _isFunction(t) && t(), g.run(i, e, r);
        }
        function e() {
          h.removeTaskByKey(i), g.stop(i);
        }
        var d = 6e4,
          c = 0,
          l = 1,
          f = 0,
          p = function (e) {
            e = new DTDTimeManagerTask(u, e, i);
            h.removeTaskByKey(i), h.addTask(e);
          };
        (this._pause = function () {
          -1 != [1, 2].indexOf(c) && (e(), (c = 4));
        }),
          (this._start = function () {
            var e;
            -1 != [0, 4].indexOf(c)
              ? u()
              : 5 == c &&
                (0 < (e = f + _retryTimeOutBack - new Date().getTime())
                  ? p(e)
                  : u());
          }),
          (this._clear = function () {
            e(), (c = 0);
          });
      }
      return (
        (_DTDRequestHeader = DTDRequestHeader),
        (_isNullOrEmpty = DTDTypeValidator.isNullOrEmpty),
        (_isFunction = DTDTypeValidator.isFunction),
        (_logger = DTDLogger.getInstance()),
        (e.prototype = {
          start: function () {
            this._start();
          },
          clear: function () {
            this._clear();
          },
          pause: function () {
            this._pause();
          },
        }),
        e
      );
    },
    ManagerProgression = (function () {
      function e() {}
      var i = {},
        a = null,
        o = DTDLogger.getInstance();
      return (
        (e.prototype.start = function (e, t) {
          return (
            this.clear(),
            (a = e),
            (i = { startTime: Date.now(), startBundle: t }),
            o.info("Progression event '{name}' is started", { name: e }),
            !0
          );
        }),
        (e.prototype.finish = function (e, t) {
          if (null === a)
            o.warning(
              "Progression event can't be finished! Doesn't have any started progression events"
            );
          else {
            if (a == e) {
              o.info("Progression event '{name}' is finished", { name: e });
              var r,
                n = { name: e, parameters: {} };
              return (
                void 0 !== i.startBundle[PE_SOURCE] &&
                  (n.parameters[PE_SOURCE] = i.startBundle[PE_SOURCE]),
                (n.parameters.success = t[PE_SUCCESS]),
                void 0 === t[PE_DURATION]
                  ? 0 < (r = Math.ceil((Date.now() - i.startTime) / 1e3)) &&
                    (n.parameters[PE_DURATION] = r)
                  : (n.parameters[PE_DURATION] = t[PE_DURATION]),
                void 0 !== i.startBundle[PE_DIFFICULTY] &&
                  (n.parameters[PE_DIFFICULTY] = i.startBundle[PE_DIFFICULTY]),
                void 0 !== t[PE_EARND] && (n[PE_EARND] = t[PE_EARND]),
                void 0 !== t[PE_SPENT] && (n[PE_SPENT] = t[PE_SPENT]),
                (i = {}),
                (a = null),
                n
              );
            }
            o.warning(
              "Progression event can't be finished!\n\tStarted progression event name is [{currentName}]\n\tCurrent event name is [{name}]",
              { currentName: a, name: e }
            );
          }
          return !1;
        }),
        (e.prototype.getLocation = function () {
          return a;
        }),
        (e.prototype.clear = function () {
          (i = {}),
            null !== a &&
              o.info("Info Progression event [{name}] is cleared", { name: a }),
            (a = null);
        }),
        e
      );
    })(),
    SchedulerIntervel = function (n) {
      function e(e, t, r) {
        (this._delay = r),
          (this._callback = t),
          (this._key = e),
          (this._status = 0),
          (this._abort = function () {
            0 !== this._status && n.removeTaskByKey(this._key);
          }),
          (this._run = function () {
            var e = new DTDTimeManagerTask(
              this._onResponse.bind(this),
              this._delay,
              this._key
            );
            n.addTask(e), (this._status = 1);
          }),
          (this._onResponse = function () {
            this._run(), this._callback();
          });
      }
      return (
        (e.prototype = {
          start: function () {
            0 == this._status && this._run();
          },
          reset: function () {
            this._abort(), (this._status = 0), this.start();
          },
          pause: function () {
            this._abort(), (this._status = 0);
          },
          setDelay: function (e) {
            (this._delay = e), this.reset();
          },
        }),
        e
      );
    },
    DTDCookies2 = (function () {
      function e() {}
      var a = {};
      return (
        (e.prototype.isAvailable = function () {
          return void 0 !== window.navigator &&
            void 0 !== window.navigator.cookieEnabled
            ? window.navigator.cookieEnabled
            : ((window.document.cookie = "testcookie=test; max-age=10000"),
              1 !== (a = window.document.cookie).indexOf("testcookie=test") &&
                ((window.document.cookie = "testcookie=test; max-age=1"), !0));
        }),
        (e.prototype.setItem = function (e, t) {
          var r = new Date();
          r.setTime(Date.now() + 31536e7),
            (window.document.cookie =
              e + "=" + t + "; expires=" + r.toGMTString() + "; path=/");
        }),
        (e.prototype.getItem = function (e) {
          var t,
            r,
            n,
            i = null;
          for (a = window.document.cookie.split(";"), t = 0; t < a.length; t++)
            (n = (r = a[t]).indexOf("=")),
              DTDHelpers.trimmer(r.slice(0, n)) === e && (i = r.slice(n + 1));
          return i;
        }),
        (e.prototype.removeItem = function (e) {
          window.document.cookie =
            e + "=; expires='Thu, 01 Jan 1970 00:00:00 GMT'; path=/";
        }),
        e
      );
    })(),
    DTDLocalStorage2 = (function () {
      function e() {}
      return (
        (e.prototype.isAvailable = function () {
          var t = !1;
          try {
            "localStorage" in window &&
              null !== window.localStorage &&
              (window.localStorage.setItem("test", "yes"),
              window.localStorage.removeItem("test"),
              (t = !0));
          } catch (e) {
            t = !1;
          }
          return t;
        }),
        (e.prototype.setItem = function (e, t) {
          window.localStorage.setItem(e, t);
        }),
        (e.prototype.getItem = function (e) {
          e = window.localStorage.getItem(e);
          return (e = "undefined" === e ? null : e);
        }),
        (e.prototype.removeItem = function (e) {
          window.localStorage.removeItem(e);
        }),
        e
      );
    })(),
    BaseAdapter = function (o) {
      "use strict";
      var e,
        t = DTDHelpers;
      return (
        ((e = function (e, t) {
          function r(e) {
            var t =
                !(1 < arguments.length && void 0 !== arguments[1]) ||
                arguments[1],
              e = e.join("_");
            return (e = t ? Base64.encode(e) : e);
          }
          var n = t,
            i =
              (2 < arguments.length && void 0 !== arguments[2]
                ? arguments[2]
                : {}
              ).base64 || !1,
            a = e;
          (this._get = function () {
            var e =
                0 < arguments.length && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = r([a, o], !1);
            return (
              null === n.getItem(t)
                ? ((t = r([a, o])), n.getItem(t))
                : n.removeItem(t),
              (function (e) {
                return (
                  null !== e &&
                    (!(1 < arguments.length && void 0 !== arguments[1]) ||
                      arguments[1]) &&
                    Base64.isEncode(e) &&
                    (e = Base64.decode(e)),
                  JSON.parse(e)
                );
              })(n.getItem(t), i) || e
            );
          }),
            (this._set = function (e) {
              var t = r([a, o]);
              n.setItem(
                t,
                (function (e) {
                  var t =
                    !(1 < arguments.length && void 0 !== arguments[1]) ||
                    arguments[1];
                  return (
                    (e = JSON.stringify(e)), (e = t ? Base64.encode(e) : e)
                  );
                })(e, i)
              );
            });
        }).prototype.getByPrimaryId = function (e) {
          return this._get()[e];
        }),
        (e.prototype.removeByPrimaryId = function (e) {
          var t = this._get();
          delete t[e], this._set(t);
        }),
        (e.prototype.get = function () {
          return this._get();
        }),
        (e.prototype.set = function (e) {
          return this._set(e);
        }),
        (e.prototype.findPrimaryIdByCondition = function (e) {
          var r,
            n = this._get();
          for (r in n)
            if (
              n.hasOwnProperty(r) &&
              !t.findObj(function (e, t) {
                return n[r][t] != e;
              }, e)
            )
              return r;
          return null;
        }),
        e
      );
    },
    AppModel = (function () {
      function e(r) {
        var a = {};
        (this._getAttribute = function (e, t) {
          var r = (e = o.isArray(e) ? e : [e]).length;
          if (r) {
            for (var n = a, i = 0; i < r && n; ++i) {
              if (void 0 === n[e[i]]) {
                n = t;
                break;
              }
              n = n[e[i]];
            }
            return n;
          }
        }),
          (this._init = function () {
            (a = r.get()),
              null === this._getAttribute(n.UUID, null) &&
                ((a[n.UUID] = t.generateUUID()), this._setAttrs(a));
          }),
          (this._setAttr = function (e, t) {
            this._setAttrs(_defineProperty({}, e, t));
          }),
          (this._setAttrs = function (e) {
            for (var t in e) e.hasOwnProperty(t) && (a[t] = e[t]);
            r.set(a);
          }),
          this._init();
      }
      var n = DTDAppStorage,
        t = DTDHelpers,
        o = DTDTypeValidator;
      return (
        (e.prototype = {
          isMigration: function () {
            return this._getAttribute(n.IsMigration, 0);
          },
          addTransactionId: function (e) {
            var t = this.getTransactionIds();
            o.isNullOrEmpty(e) ||
              (t.push(e), this._setAttr(n.TransactionIds, t));
          },
          setAppVer: function (e) {
            this._setAttr(n.AppVersion, e);
          },
          setConfigSdk: function (e) {
            this._setAttr(n.Config, e);
          },
          isAllExcluded: function () {
            return this._getAttribute(n.Config + ".exclude.all", !1);
          },
          getEventsExcluded: function () {
            return this._getAttribute(n.Config + ".exclude.events", {});
          },
          getAppVer: function () {
            var e = [n.AppVersion];
            return this._getAttribute(e);
          },
          getMaxEventParams: function () {
            var e = [n.Config, "eventParamsCount"];
            return this._getAttribute(e, 20);
          },
          getTransactionIds: function () {
            var e = [n.TransactionIds];
            return this._getAttribute(e, []);
          },
          getSessionTimeout: function () {
            var e = [n.Config, "sessionTimeout"];
            return this._getAttribute(e, 6e5);
          },
          getCountForRequest: function () {
            var e = [n.Config, "countForRequest"];
            return this._getAttribute(e, 10);
          },
          getAbTimeout: function () {
            var e = [n.Config, "abTestStartTimeout"];
            return this._getAttribute(e, 3e4);
          },
          getExcludeVer: function () {
            var e = [n.Config, "exclude", "version"];
            return this._getAttribute(e, null);
          },
          sync: function () {
            this._init();
          },
          getTimeForRequest: function () {
            var e = [n.Config, "timeForRequest"];
            return this._getAttribute(e, 12e4);
          },
          getAliveTimeout: function () {
            var e = [n.Config, "aliveTimeout"];
            return this._getAttribute(e, 3e5);
          },
          getCATimeout: function () {
            var e = [n.Config, "currencyAggregationTimeout"];
            return this._getAttribute(e, 36e4);
          },
          getUUID: function () {
            var e = [n.UUID];
            return this._getAttribute(e);
          },
          setAttrs: function (e) {
            return this._setAttrs(e);
          },
        }),
        e
      );
    })(),
    AppsModel = (function () {
      "use strict";
      function e(e, t, r) {
        n.call(this, e, t, r);
      }
      var n = BaseAdapter("app");
      return ((e.prototype = Object.create(n.prototype)).constructor = e);
    })(),
    Experiment = (function () {
      function e() {
        var r = {};
        (this._getAttr = function (e) {
          return void 0 !== r[e]
            ? r[e]
            : 1 < arguments.length && void 0 !== arguments[1]
            ? arguments[1]
            : null;
        }),
          (this._clear = function () {
            r = {};
          }),
          (this._setAttr = function (e, t) {
            r[e] = t;
          }),
          (this._get = function () {
            return r;
          });
      }
      var t = DTDKeys.UserExperiments;
      return (
        (e.prototype = {
          time: function () {
            return this._getAttr(t.Time, 0);
          },
          isMark: function () {
            if (this.isActivated()) {
              var e = this.experimentIds()[0].id;
              return void 0 !== _experiments[e] && !_experiments[e].isTesting;
            }
            return !1;
          },
          isActivated: function () {
            return 3 == this._getAttr(t.Status);
          },
          isOffer: function () {
            return 2 == this._getAttr(t.Status);
          },
          isExist: function () {
            return 1 == this._getAttr(t.Status);
          },
          experimentIds: function () {
            return this._getAttr(t.Ids);
          },
          get: function () {
            return this._get();
          },
          getExperiments: function () {
            return _experiments;
          },
          setAttrs: function (e) {
            _attributes;
            for (var t in e) e.hasOwnProperty(t) && this._setAttr(t, e[t]);
          },
          getConfig: function () {
            var e = {};
            if (this.isActivated())
              for (var t = this.experimentIds(), r = 0; r < t.length; r++)
                if (void 0 !== _experiments[t[r].id])
                  for (
                    var n = _experiments[t[r].id].parameters.length - 1;
                    0 <= n;
                    n--
                  ) {
                    var i = _experiments[t[r].id].parameters[n].key,
                      a = _experiments[t[r].id].parameters[n].values;
                    e[i] = a[t[r].group];
                  }
            return e;
          },
          isTesting: function () {
            if (this.isActivated())
              for (var e = this.experimentIds(), t = 0; t < e.length; t++)
                if (
                  void 0 !== _experiments[e[t].id] &&
                  _experiments[e[t].id].isTesting
                )
                  return !0;
            return !1;
          },
          setExperiments: function (e) {
            for (var t = e.length - 1; 0 <= t; t--)
              _experiments[e[t].id] = e[t];
          },
          init: function (e) {},
        }),
        e
      );
    })(),
    UserModel = (function () {
      function e(r) {
        var n,
          o = {},
          e = new Experiment();
        (this._getExperiment = function () {
          return e;
        }),
          (this._getAttr = function (e, t) {
            var r = "string" == typeof e ? [e] : e,
              n = r.length;
            if (n) {
              for (var i = o, a = 0; a < n && i; ++a) {
                if (void 0 === i[r[a]]) {
                  i = t;
                  break;
                }
                i = i[r[a]];
              }
              return i;
            }
          }),
          (this._getPrimaryId = function () {
            return n;
          }),
          (this._sync = function () {
            o = r.getByPrimaryId(n);
          }),
          (this._clearBackendId = function (e) {
            return (
              (e[a.DevtodevId] = null),
              (e[a.CrossPlatformDevtodevId] = null),
              (e[a.DevtodevIdTimestamp] = null),
              e
            );
          }),
          (this._replaceUserId = function (e) {
            var t =
                1 < arguments.length && void 0 !== arguments[1]
                  ? arguments[1]
                  : 0,
              r = o[a.UserId],
              n = {};
            r !== e &&
              null !== e &&
              ((n[a.PrevUserId] = r),
              (n[a.UserId] = e),
              (n[a.PrevDeviceId] = r),
              (n[a.DeviceId] = e),
              (n[a.IsDefault] = t ? 1 : 0),
              (n = this._clearBackendId(n))),
              this._setAttrs(n);
          }),
          (this._create = function (e, t) {
            var r;
            (n = i.generateUUID()),
              (o = {}),
              this._setAttrs(
                (_defineProperty((r = {}), a.RegistrationDate, Date.now()),
                _defineProperty(r, a.UserId, e),
                _defineProperty(r, a.IsDefault, t ? 1 : 0),
                _defineProperty(r, a.DeviceId, e),
                r)
              ),
              this._sync();
          }),
          (this._init = function (e) {
            (n = e), this._sync(), this._setAttrs(this._clearBackendId({}));
          }),
          (this._setAttr = function (e, t) {
            this._setAttrs(_defineProperty({}, e, t));
          }),
          (this._setAttrs = function (e) {
            for (var t in e) e.hasOwnProperty(t) && (o[t] = e[t]);
            (o[a.LastActive] = Date.now()), r.setByPrimaryId(n, o);
          }),
          (this._removeAttribute = function (e) {
            delete o[e], r.setByPrimaryId(n, o), this._sync();
          });
      }
      var a = DTDUserStorage,
        i = DTDHelpers,
        o = DTDTypeValidator;
      return (
        (e.prototype = {
          sync: function () {
            this._sync();
          },
          replaceUserId: function (e) {
            this._replaceUserId(
              e,
              1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0
            );
          },
          create: function (e, t) {
            this._create(e, t);
          },
          init: function (e) {
            this._init(e);
          },
          setAttrs: function (e) {
            return this._setAttrs(e);
          },
          setDefault: function (e) {
            return this._setAttr(a.IsDefault, e ? 1 : 0);
          },
          isDefault: function () {
            return this._getAttr(a.IsDefault, 0);
          },
          isDeviceCounting: function () {
            return this._getAttr(a.DeviceCounting, 0);
          },
          setDeviceCounting: function (e) {
            return this._setAttr(a.DeviceCounting, e ? 1 : 0);
          },
          getRg: function () {
            return this._getAttr(a.RegistrationDate, null);
          },
          getLevel: function () {
            return this._getAttr(a.CurrentLevel, 1);
          },
          setLevel: function (e) {
            this._setAttr(a.CurrentLevel, e);
          },
          getPrimaryId: function () {
            return this._getPrimaryId();
          },
          getId: function () {
            return this._getAttr(a.UserId);
          },
          getDeviceId: function () {
            return this._getAttr(a.DeviceId) || this._getAttr(a.UserId);
          },
          getPrevDeviceId: function () {
            return this._getAttr(a.PrevDeviceId);
          },
          getSessionId: function () {
            return this._getAttr(a.SessionStarted);
          },
          resumeSession: function () {
            var e = Date.now();
            this._setAttr(a.LastForeground, e);
          },
          getSessionLength: function () {
            return this._getAttr(a.SessionLength, 0);
          },
          newSession: function (e) {
            var t;
            this._setAttrs(
              (_defineProperty((t = {}), a.SessionStarted, e),
              _defineProperty(t, a.LastForeground, e),
              _defineProperty(t, a.SessionLength, 0),
              t)
            );
          },
          incrementSession: function () {
            var e,
              t = Date.now(),
              r = Math.floor((t - this.getLastForeground()) / 1e3),
              n = this.getSessionLength();
            this._setAttrs(
              (_defineProperty((e = {}), a.SessionLength, n + r),
              _defineProperty(e, a.LastForeground, t),
              e)
            );
          },
          clearSessionLength: function () {
            this._setAttr(a.SessionLength, 0);
          },
          getLastForeground: function () {
            return this._getAttr(a.LastForeground, 0);
          },
          getPrevUserId: function () {
            return this._getAttr(a.PrevUserId);
          },
          setAttr: function (e, t) {
            return this._setAttr(a[e], t);
          },
          getD2dId: function () {
            return this._getAttr(a.DevtodevId, null);
          },
          getD2dCrossId: function () {
            return this._getAttr(a.CrossPlatformDevtodevId, null);
          },
          getD2dTm: function () {
            return this._getAttr(a.DevtodevIdTimestamp, null);
          },
          clearBackendId: function () {
            this._setAttrs(this._clearBackendId({}));
          },
          haveBackendId: function () {
            return null !== this._getAttr(a.DevtodevIdTimestamp, null);
          },
          setIsUserPay: function () {
            this._setAttr(a.IsPayingUser, 1);
          },
          canBalanceSentTime: function () {
            var e = this._getAttr(a.TimeSentBalance, 0);
            return new Date().getTime() >= e + 144e5;
          },
          refreshBalanceSentTime: function () {
            this._setAttr(a.TimeSentBalance, new Date().getTime());
          },
          turnOffRef: function () {
            this._setAttr(a.ReferralSatus, 0);
          },
          isTurnOnRef: function () {
            return this._getAttr(a.ReferralSatus, 1);
          },
          getTutorialSteps: function () {
            return this._getAttr(a.TutorialSteps, []);
          },
          insertTutorStep: function (e) {
            var t = this._getAttr(a.TutorialSteps, []);
            t.push(e), this._setAttr(a.TutorialSteps, t);
          },
          setCA: function (e) {
            var t = e[CA_SOURCE],
              r = AccrualTypes[e[CA_TYPE]],
              n = e[CA_CURRENCY_AMOUNT],
              i = e[CA_CURRENCY_NAME],
              e = this.getCA();
            o.isNullOrEmpty(e[r]) && (e[r] = {}),
              o.isNullOrEmpty(e[r][t]) && (e[r][t] = {}),
              o.isNullOrEmpty(e[r][t][i]) && (e[r][t][i] = 0),
              (e[r][t][i] += n),
              this._setAttr(a.CurrencyAccrual, e);
          },
          getCA: function () {
            return this._getAttr(a.CurrencyAccrual, {});
          },
          clearCA: function () {
            this._removeAttribute(a.CurrencyAccrual);
          },
          isTracking: function () {
            return !!this._getAttr(a.Tracking, 1);
          },
          setTracking: function (e) {
            this._setAttr(a.Tracking, e ? 1 : 0);
          },
          getCard: function () {
            return this._getAttr(a.Profile, {});
          },
          getCardField: function (e) {
            return this._getAttr([a.Profile, e], null);
          },
          clearCard: function () {
            this._removeAttribute(a.Profile);
          },
          clearCardChanges: function () {
            this._removeAttribute(a.UpdateProfile);
          },
          unsetCardField: function (e) {
            var t = this.getCard(),
              r = this.getCardChanges();
            delete t[e],
              (r[e] = null),
              this._setAttrs(
                (_defineProperty((e = {}), a.UpdateProfile, r),
                _defineProperty(e, a.Profile, t),
                e)
              );
          },
          setCardField: function (e, t) {
            var r = this.getCard(),
              n = this.getCardChanges();
            (r[e] = t),
              (n[e] = t),
              this._setAttrs(
                (_defineProperty((t = {}), a.UpdateProfile, n),
                _defineProperty(t, a.Profile, r),
                t)
              );
          },
          isPayingUser: function () {
            return this._getAttr(a.IsPayingUser, !1);
          },
          getCardChanges: function () {
            return this._getAttr(a.UpdateProfile, {});
          },
          setAbConfig: function (e) {
            var t;
            this._setAttrs(
              (_defineProperty((t = {}), a.Experiments, e.experiments),
              _defineProperty(t, a.UserProperties, e.userProperties),
              t)
            );
          },
          getUserPropery: function () {
            return this._getAttr(a.UserProperties, {});
          },
          setExperimentsForUser: function (e) {
            return this._setAttr(a.UserExperiments, e);
          },
          removeExperimentsForUser: function () {
            this._removeAttribute(a.UserExperiments);
          },
          experiments: function () {
            return this._getExperiment();
          },
          setDefaultConfig: function (e) {
            return this._setAttr(a.DefaultConfig, e);
          },
          getDefaultConfig: function () {
            return this._getAttr(a.DefaultConfig);
          },
          getRemoteConfig: function () {
            var e,
              t = this._getAttr(a.DefaultConfig);
            for (e in ((abConfig = this._getExperiment().getConfig()),
            abConfig))
              abConfig.hasOwnProperty(e) && (t[e] = abConfig[e]);
            return t;
          },
          getRemoteValue: function (e) {
            return this.getRemoteConfig()[e];
          },
        }),
        e
      );
    })(),
    UsersModel = (function () {
      "use strict";
      function e(e, t) {
        r.call(
          this,
          e,
          t,
          2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}
        );
      }
      var i = DTDUserStorage,
        r = BaseAdapter("users");
      return (
        (((e.prototype = Object.create(r.prototype)).constructor =
          e).prototype.setByPrimaryId = function (e, t) {
          var r = this._get();
          void 0 === r[e] && (r[e] = {}),
            (r[e] = t),
            (r[e][i.LastActive] = Date.now()),
            this._set(r);
        }),
        (e.prototype.lastActive = function () {
          var e,
            t = this._get(),
            r = null,
            n = 0;
          for (e in t)
            t.hasOwnProperty(e) &&
              "pId" !== e &&
              (null == r && (r = e),
              t[e][i.LastActive] > n && (n = t[(r = e)][i.LastActive]));
          return r;
        }),
        e
      );
    })(),
    EventsModel = (function () {
      "use strict";
      function e(e, t, r) {
        n.call(this, e, t, r);
      }
      var n = BaseAdapter("events"),
        i = DTDEventStorage;
      return (
        (((e.prototype = Object.create(n.prototype)).constructor =
          e).prototype.get = function () {
          return this._get([]);
        }),
        (e.prototype.add = function (e) {
          var t = this._get([]),
            r = 1;
          0 !== t.length && (r = t[t.length - 1][i.PrimaryId] + 1),
            (e[i.PrimaryId] = r),
            t.push(e),
            this._set(t);
        }),
        (e.prototype.removeByPrimaryIds = function (e) {
          for (var t = this._get([]), r = [], n = t.length - 1; 0 <= n; n--)
            void 0 === e[t[n][i.PrimaryId]] && r.unshift(t[n]);
          this._set(r);
        }),
        (e.prototype.removeByPrimaryUserId = function (e) {
          for (var t = this._get([]), r = [], n = t.length - 1; 0 <= n; n--)
            t[n][i.PrimaryUserId] !== e && r.unshift(t[n]);
          this._set(r);
        }),
        (e.prototype.getCountEventsByUser = function (e) {
          for (var t = this._get([]), r = 0, n = t.length - 1; 0 <= n; n--)
            t[n][i.PrimaryUserId] === e && r++;
          return r;
        }),
        (e.prototype.getEventsByUser = function (e) {
          for (var t = this._get([]), r = [], n = t.length - 1; 0 <= n; n--)
            t[n][i.PrimaryUserId] === e && r.unshift(t[n]);
          return r;
        }),
        e
      );
    })(),
    Storage = (function () {
      "use strict";
      function e() {}
      return (
        (e.prototype.setItem = function (e, t) {
          this._driver.setItem(e, t);
        }),
        (e.prototype.getItem = function (e) {
          return this._driver.getItem(e);
        }),
        (e.prototype.setDriver = function (e) {
          this._driver = e;
        }),
        (e.prototype.isAvailable = function () {
          return !!this._driver && this._driver.isAvailable();
        }),
        (e.prototype.removeItem = function (e) {
          return this._driver.removeItem(e);
        }),
        e
      );
    })(),
    StorageManager2 = (function () {
      function e(e) {
        var r = new Storage(),
          n = {};
        r.setDriver(e),
          (this._init = function (e, t) {
            (n.app = new AppsModel(e, r, t)),
              (n.user = new UsersModel(e, r, t)),
              (n.event = new EventsModel(e, r));
          }),
          (this._getAdaper = function (e) {
            return n[e];
          }),
          (this._isAvailable = function () {
            return r.isAvailable();
          });
      }
      return (
        (e.prototype.init = function (e) {
          this._init(
            e,
            1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}
          );
        }),
        (e.prototype.getApp = function (e) {
          return this._getAdaper("app");
        }),
        (e.prototype.getUser = function (e) {
          return this._getAdaper("user");
        }),
        (e.prototype.getEvent = function (e) {
          return this._getAdaper("event");
        }),
        (e.prototype.isAvailable = function () {
          return this._isAvailable();
        }),
        e
      );
    })();
  RemoteConfig = (function () {
    var r, n;
    return function (e, t) {
      (r = e),
        (n = t),
        Object.defineProperty(this, "stringValue", {
          get: function () {
            return String(r);
          },
        }),
        Object.defineProperty(this, "doubleValue", {
          get: function () {
            return Number(r);
          },
        }),
        Object.defineProperty(this, "longValue", {
          get: function () {
            var e = Number(r);
            return e && Math.floor(e);
          },
        }),
        Object.defineProperty(this, "booleanValue", {
          get: function () {
            return !!r;
          },
        }),
        Object.defineProperty(this, "source", {
          get: function () {
            return n;
          },
        });
    };
  })();
  var RemoteManager = function (s, a) {
    "use strict";
    function u(e, t, r) {
      if (r && e === r[_eventKeys.Code]) {
        var n = new DTDVerificationCondition();
        return !_(function (e, t) {
          return !(t !== PL_PARAMS
            ? n.checkConditions(e, r[t])
            : D(e, r[PL_PARAMS]));
        }, t);
      }
    }
    function d() {
      s.removeTaskByKey("clearAbTest"), l.removeExperimentsForUser();
    }
    function t(o) {
      var e,
        t,
        r = l.experiments(),
        n = r.getExperiments(),
        i = [];
      if (!r.isActivated() && !r.isOffer()) {
        for (var a in n)
          n.hasOwnProperty(a) &&
            (!(e = null) !== (a = n[a]).isTesting &&
              (e = _(function (e) {
                var n,
                  i,
                  t,
                  r,
                  a = e.code;
                return p.isNullOrEmpty(e.type)
                  ? a === PL_PARAMS
                    ? ((t = e),
                      !(
                        !(!(r = _userModel.getUserCard()) || y(t[PL_PARAMS])) &&
                        D(t[PL_PARAMS], r)
                      ))
                    : a === DI_CODE
                    ? !u(a, e, _deviceInfo)
                    : !u(a, e, o)
                  : "backend" === e.type
                  ? ((e = e),
                    (n = new DTDVerificationCondition()),
                    (i = l.getUserPropery()),
                    !!_(function (e, t) {
                      var r = !0;
                      switch (t) {
                        case g.Backend.Country:
                          r = n.checkConditions(e, i[g.Backend.Country]);
                          break;
                        case g.Backend.Level:
                          r = n.checkConditions(e, _userModel.getLevel());
                          break;
                        case g.Backend.PayingUser:
                          r = n.checkConditions(e, _userModel.isPayingUser());
                          break;
                        case "type":
                          r = !0;
                          break;
                        default:
                          r = !1;
                      }
                      return !r;
                    }, e))
                  : void 0;
              }, a.conditions || [])),
            y(e) && i.push({ id: a.id }));
        if (0 < i.length && !r.isActivated() && !r.isOffer()) {
          r.setAttrs(
            (_defineProperty((t = {}), h.Ids, i),
            _defineProperty(t, h.Status, 1),
            _defineProperty(t, h.Time, new Date().getTime()),
            t)
          ),
            l.setExperimentsForUser(r.get());
          r = new DTDTimeManagerTask(d, f.getAbTimeout(), "clearAbTest");
          return s.addTask(r), c(), 1;
        }
      }
    }
    function c() {
      var r,
        n,
        i = l.experiments();
      i.isExist() &&
        ((r = []),
        (n = i.getExpiriments()),
        v(function (e, t) {
          T(e.id, n) && r.push(e.id);
        }, i.experimentIds()),
        0 < r.length
          ? new a(
              "offer",
              o,
              l,
              f,
              function (e) {
                var t;
                e.involvedExperiments &&
                  (i.setAttrs(
                    (_defineProperty((t = {}), h.Ids, e.involvedExperiments),
                    _defineProperty(t, h.Status, 2),
                    t)
                  ),
                  l.setExperimentsForUser(i.get()));
              },
              { suitableExperiments: r }
            ).start()
          : l.removeExperimentsForUser());
    }
    function r() {
      var e,
        r = l.experiments().getExpiriments(),
        t = l.experiments().experimentIds(),
        n = [];
      y(t) ||
        ((e = l.experiments().isActivated()),
        v(function (e, t) {
          T(e.id, r) && n.push(e);
        }, t),
        0 === n.length
          ? l.removeExperimentsForUser()
          : n.length !== t.length &&
            (userExperiments.setAttrs(_defineProperty({}, h.Ids, n)),
            l.setExperimentsForUser(userExperiments.get())),
        e !== l.experiments().isActivated() && i());
    }
    var n,
      l,
      i,
      f,
      o,
      e,
      p = DTDHelpers,
      h = DTDKeys.UserExperiments,
      g = DTDKeys.RemoteConfig,
      _ = p.findObj,
      v = p.forEach,
      y = DTDTypeValidator.isNullOrEmpty,
      m = DTDLogger.getInstance(),
      D = function (e, n) {
        var i = new DTDVerificationCondition();
        return !_(function (e, t) {
          var r;
          return !(r = t !== PL_PARAMS ? i.checkConditions(e, n[t]) : r);
        }, e);
      },
      T = function (e, t) {
        return !!t[e] && (t[e].completionDate > Date.now() || t[e].isTesting);
      };
    return (
      ((e = function (e, t, r) {
        n = new a("exp", (o = r), (l = e), (f = t), function (e) {
          _remoteManager.setAbConfig(e);
        });
      }).prototype = {
        fetch: function (e) {
          n.clear(), n.start(), (i = e);
        },
        checkingCondition: function (e) {
          t(e);
        },
        start: function () {
          var e;
          l.experiments().isExist() || l.experiments().isOffer()
            ? (e = new Date().getTime() - l.experiments().time()) >=
              f.getAbTimeout()
              ? d()
              : ((e = new DTDTimeManagerTask(
                  d,
                  f.getAbTimeout() - e,
                  "clearAbTest"
                )),
                s.addTask(e))
            : l.experiments().isActivated();
        },
        activated: function () {
          var e;
          r(),
            l.experiments().isOffer()
              ? ((e = l.experiments()),
                s.removeTaskByKey("clearAbTest"),
                e.setAttrs(_defineProperty({}, h.Status, 3)),
                l.setExperimentsForUser(e.get()),
                m.info(
                  "Start experiment " +
                    JSON.stringify(_userModel.getExpiriments())
                ))
              : l.experiments().isActivated() &&
                m.info("Experiment already started");
        },
        setAbConfig: function (e) {
          _userModel.setAbConfig(e), r(), t();
        },
      }),
      e
    );
  };
  DTDVerificationCondition = (function () {
    var n = "NOT IN",
      i = ">",
      a = "<",
      o = "!=",
      s = ">=",
      u = "<=",
      o = "!=",
      t = DTDHelpers,
      d = DTDTypeValidator;
    function e() {}
    function r(e, r) {
      return d.isObject(e)
        ? !t.findObj(function (e, t) {
            switch (t) {
              case "IN":
              case n:
                return !(function (e, t, r) {
                  if (!d.isArray(t)) return !1;
                  if (!d.isString(r) && !d.isInteger(r)) return !1;
                  r = -1 < t.indexOf(r);
                  return e === n ? !r : r;
                })(t, e, r);
              case "==":
              case o:
                return !(function (e, t, r) {
                  r = d.isEqual(t, r);
                  return e === o ? !r : r;
                })(t, e, r);
              case i:
              case a:
              case s:
              case u:
                return !(function (e, t, r) {
                  if (_typeof(t) === _typeof(r))
                    if (d.isInteger(r))
                      switch (e) {
                        case s:
                          return t <= r;
                        case i:
                          return t < r;
                        case a:
                          return r < t;
                        case u:
                          return r <= t;
                      }
                    else if (d.isString(r)) {
                      var n = r.localeCompare(t);
                      switch (e) {
                        case s:
                        case i:
                          return 0 <= n;
                        case a:
                          return n < 0;
                        case u:
                          return n <= 0;
                      }
                    }
                  return !1;
                })(t, e, r);
              default:
                return !1;
            }
          }, e)
        : d.isEqual(e, r);
    }
    return (e.prototype.checkConditions = r), e;
  })();
  var DTDTimeManager = (function () {
      function e() {
        var e,
          t = null,
          a = {},
          o = [],
          r = 0;
        function n() {
          return e.apply(this, arguments);
        }
        (_clearAllTask = function () {
          (a = {}), (o = []);
        }),
          (_getNextTask = function () {
            if (0 !== o.length && o[0] <= parseInt(Date.now() / 1e3)) {
              var e = o[0];
              if (void 0 !== a[e]) {
                var t = a[e].shift();
                return 0 === a[e].length && (o.shift(), delete a[e]), t;
              }
            }
            return null;
          }),
          (_runTimer =
            ((e = function () {
              clearTimeout(t);
              for (var e = _getNextTask(); e; ) e.run(), (e = _getNextTask());
              t = setTimeout(_runTimer, 1e3);
            }),
            (n.toString = function () {
              return e.toString();
            }),
            n)),
          (this._addTask = function (e, t) {
            -1 === o.indexOf(e) &&
              (o.push(e),
              o.sort(function (e, t) {
                return parseFloat(e) - parseFloat(t);
              }),
              (a[e] = [])),
              a[e].push(t);
          }),
          (this._hasTask = function (e) {
            for (var t = o.length - 1; 0 <= t; t--)
              for (var r = a[o[t]].length - 1; 0 <= r; r--)
                if (a[o[t]][r].id == e) return !0;
            return !1;
          }),
          (this._removeTaskByKey = function (e) {
            for (var t = {}, r = [], n = o.length - 1; 0 <= n; n--) {
              t[o[n]] = [];
              for (var i = a[o[n]].length - 1; 0 <= i; i--)
                a[o[n]][i].id != e && t[o[n]].unshift(a[o[n]][i]);
              0 == t[o[n]].length ? delete t[o[n]] : r.unshift(o[n]);
            }
            (o = r), (a = t);
          }),
          (this._start = function () {
            0 == r && ((r = 1), (t = setTimeout(_runTimer, 0)));
          }),
          (this._stop = function () {
            (r = 0), clearTimeout(t), _clearAllTask();
          }),
          (this.pause = function () {
            (r = 0), clearTimeout(t);
          });
      }
      return (
        (e.prototype.start = function () {
          this._start();
        }),
        (e.prototype.stop = function () {
          this._stop();
        }),
        (e.prototype.pause = function () {
          this._pause();
        }),
        (e.prototype.performTimedTask = function (e) {
          this._addTask(e.deadline, e);
        }),
        (e.prototype.addTask = function (e) {
          this._addTask(e.deadline, e);
        }),
        (e.prototype.hasTask = function (e) {
          this._hasTask(e);
        }),
        (e.prototype.removeTaskByKey = function (e) {
          this._removeTaskByKey(e);
        }),
        (e.prototype.ignoreTimer = function (e) {}),
        e
      );
    })(),
    DTDTimeManagerTask = (function () {
      function e(e, t, r) {
        var n = Date.now();
        (n += t),
          (this.deadline = parseInt(n / 1e3)),
          (this._callback = e),
          (this.id = r || this.deadline);
      }
      return (
        (e.prototype.run = function () {
          this._callback();
        }),
        e
      );
    })(),
    EventListeners = (function () {
      function o(e, t, r) {
        e.addEventListener
          ? e.addEventListener(t, r, !1)
          : e.attachEvent("on" + t, r);
      }
      function s(e, t, r) {
        e.removeEventListener
          ? e.removeEventListener(t, r, !1)
          : e.detachEvent("on" + t, r);
      }
      function u() {
        return (
          window.document.fullscreenElement ||
          window.document.mozFullscreenElement ||
          window.document.webkitFullscreenElement
        );
      }
      var d = DTDLogger.getInstance();
      function e(e, t, r) {
        function n() {
          d.debug("Event onBlur"), e();
        }
        function i() {
          d.debug("Event onFocus"), t();
        }
        function a(e) {
          e
            ? (s(window, "blur", n),
              s(window, "focus", i),
              d.debug("Event full screen"))
            : (o(window, "blur", n),
              o(window, "focus", i),
              d.debug("Event normal screen")),
            r(e);
        }
        this._start = function () {
          o(window.document, "fullscreenchange", function () {
            a(u());
          }),
            o(window.document, "mozfullscreenchange", function () {
              a(u());
            }),
            o(window.document, "webkitfullscreenchange", function () {
              a(u());
            }),
            o(window.document, "msfullscreenchange", function () {
              a(u());
            }),
            o(window, "blur", n),
            o(window, "focus", i);
        };
      }
      return (
        (e.prototype.start = function () {
          this._start();
        }),
        e
      );
    })(),
    DTDClient = (function () {
      "use strict";
      function r() {
        return (
          !!m.isAllExcluded() &&
          (L.info("All events are excluded by project configuration"), !0)
        );
      }
      function s() {
        var e =
          (_defineProperty((e = {}), DI_OS_VER, Y.getOsVer()),
          _defineProperty(e, DI_DISPLAY_RESOLUTION, Y.getDisplayResolution()),
          _defineProperty(e, DI_OS, Y.getOsName()),
          _defineProperty(e, DI_UUID, m.getUUID()),
          _defineProperty(e, DI_UA, Y.getUA()),
          _defineProperty(e, DI_TZ, Y.getTzOffset()),
          e);
        return Z(DI_CODE, e);
      }
      function n() {
        var e =
          0 < arguments.length && void 0 !== arguments[0] && arguments[0]
            ? E.getCard()
            : E.getCardChanges();
        if (!S.isNullOrEmpty(e)) {
          e = _defineProperty({}, PL_PARAMS, e);
          return E.clearCardChanges(), Z(PL_CODE, e);
        }
      }
      function i(e) {
        (e = { timestamp: Date.now(), cheater: e }), Z("ch", e);
      }
      function a(e) {
        (e = { timestamp: Date.now(), tester: e }), Z("tstr", e);
      }
      function t() {
        if (E.isTracking()) {
          for (var e in (E.incrementSession(), N.pause(), Q(), q)) q[e].pause();
          b.pause(), C.pause(), I.stop();
        }
      }
      function o(e) {
        e && $();
      }
      function u() {
        E.incrementSession();
      }
      function d() {
        Z(AL_CODE);
      }
      function c() {
        L.debug("Currency accrual timer tick"), K();
      }
      function l() {
        Q(), re();
      }
      function f(e, t) {
        M.validLevel(e, t) &&
          (E.getLevel() != t
            ? (K(),
              E.setLevel(t),
              L.info('Level "{level}" is set successfully for user {user}', {
                level: E.getLevel(),
                user: E.getId(),
              }))
            : L.info("The current level is equal to the new level [{level}]", {
                level: t,
              }));
      }
      function p(e, t) {
        M.validAppVer(e, t) &&
          (m.setAppVer(t),
          L.info('App version "{version}" is set successfully', {
            version: m.getAppVer(),
          }));
      }
      function h() {
        for (var e in (s(),
        E.isTurnOnRef() &&
          ((function () {
            if (E.isTurnOnRef())
              try {
                var r,
                  e = {
                    utm_source: UTM_SOURCE,
                    utm_medium: UTM_MEDIUM,
                    utm_content: UTM_CONTENT,
                    utm_campaign: UTM_CAMPAIGN,
                    utm_term: UTM_TERM,
                  },
                  n = !0,
                  i = {},
                  a = window.document.URL;
                k.forEachObj(function (e, t) {
                  (r = k.parseUrlParams(a, t)),
                    S.isNullOrEmpty(r) || ((i[e] = r), (n = !1));
                }, e),
                  n || Z(RF_CODE, i);
              } catch (e) {}
          })(),
          K()),
        ne(),
        q))
          q[e].reset();
        te();
      }
      function g(e) {
        if (!V) throw "The SDK is not initialized yet!";
        return V;
      }
      function _(e) {
        var t = E.isTracking();
        e !== t &&
          (t
            ? (N.start(), C.clear(), C.start(), b.clear(), b.start(), A.start())
            : N.stop());
      }
      function v(e) {
        var t =
            1 < arguments.length && void 0 !== arguments[1]
              ? arguments[1]
              : null,
          r =
            !(2 < arguments.length && void 0 !== arguments[2]) || arguments[2],
          n = E.isTracking(),
          i = "User '{newName}' has been activated";
        B.clear(),
          S.isNullOrEmpty(e)
            ? ((i = "User '{newName}' has been created"),
              (t = r ? m.getUUID() : t),
              E.create(t, r))
            : ((i = "User '{newName}' has been activated"), E.init(e)),
          L.info(i, { newName: E.getId() }),
          _(n),
          E.isTracking() && h();
      }
      function e() {
        T = new EventListeners(t, $, o);
        var e = new DTDLocalStorage2();
        e.isAvailable() ||
          (L.info("Access to local storage not available"),
          (e = new DTDCookies2()).isAvailable() ||
            L.info("Access to cookies not available")),
          (y = new StorageManager2(e)).isAvailable() ||
            DTDLogger.getInstance().info("Access to storage not available");
      }
      var y,
        m,
        D,
        T,
        E,
        C,
        I,
        b,
        A,
        P = null,
        w = DTDEventParams,
        k = DTDHelpers,
        S = DTDTypeValidator,
        U = DTDEventStorage,
        O = DTDDefaultsFields,
        x = DTDUserStorage,
        R = new DTDApi(),
        N = new DTDTimeManager(),
        V = !1,
        L = DTDLogger.getInstance(),
        M = new ValidatorRules(),
        B = new ManagerProgression(),
        z = ConfigManager(N, R),
        F = EventQueueManager(N, R),
        H = SchedulerIntervel(N),
        j = RemoteManager(N, z),
        q = {},
        Y = DTDSystemManager.getInstance(),
        K = function () {
          var e = E.getCA();
          S.isNullOrEmpty(e) || Z(CA_CODE, e);
        },
        G = function (e) {
          var t =
              1 < arguments.length && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            r = Date.now();
          e === SS_CODE && (r = E.getSessionId()),
            (t[w.Timestamp] = r),
            (t[w.Code] = e);
          _defineProperty((r = {}), U.PrimaryUserId, E.getPrimaryId()),
            _defineProperty(r, U.language, Y.getLanguage()),
            _defineProperty(r, U.appVersion, m.getAppVer()),
            _defineProperty(r, U.sdkVersion, Y.getSdkVer()),
            _defineProperty(r, U.sdkCodeVersion, Y.getSdkVerCode()),
            _defineProperty(r, U.engine, Y.getEngine()),
            _defineProperty(r, U.Code, e),
            (r = k.filterObj(function (e, t) {
              return !S.isNullOrEmpty(e);
            }, r));
          return (
            S.isNullOrEmpty(B.getLocation()) ||
              -1 !==
                [
                  DI_CODE,
                  PL_CODE,
                  RF_CODE,
                  PE_CODE,
                  AL_CODE,
                  CA_CODE,
                  CB_CODE,
                  "tstr",
                  "ch",
                ].indexOf(e) ||
              (t.inProgress = [B.getLocation()]),
            -1 ===
              [DI_CODE, TS_CODE, LU_CODE, AL_CODE, RF_CODE, ADRV_CODE].indexOf(
                e
              ) && (t[w.Level] = E.getLevel()),
            -1 === [DI_CODE, TS_CODE, SS_CODE, AL_CODE].indexOf(e) &&
              (t[w.SessionId] = E.getSessionId()),
            (r[U.Params] = t),
            r
          );
        },
        X = function (e, t) {
          switch (e) {
            case DI_CODE:
              break;
            case LU_CODE:
              E.setLevel(t[LU_LEVEL]);
              break;
            case TR_CODE:
              E.insertTutorStep(t[TR_STEP]);
              break;
            case RP_CODE:
              m.addTransactionId(t[RP_ORDER_ID]), E.setIsUserPay(!0);
              break;
            case CB_CODE:
              E.refreshBalanceSentTime();
          }
        },
        J = function (e, t) {
          var r = E.isTracking();
          switch (e) {
            case TS_CODE:
              t[TS_ALLOWED] ||
                (D.removeByPrimaryUserId(E.getPrimaryId()),
                E.clearCA(),
                E.clearBackendId(),
                Q(),
                n()),
                E.setTracking(t[TS_ALLOWED]);
              break;
            case LU_CODE:
              r && K();
              break;
            case CA_CODE:
              r && E.clearCA();
              break;
            case RF_CODE:
              r && E.turnOffRef();
          }
        },
        W = function (e, t) {
          if (!r())
            return e !== RF_CODE || E.isTurnOnRef()
              ? e !== CB_CODE || E.canBalanceSentTime()
                ? e === LU_CODE && E.getLevel() == t[LU_LEVEL]
                  ? (L.info(
                      "The current level is equal to the new level [{level}]",
                      { level: t[LU_LEVEL] }
                    ),
                    !1)
                  : !M.isExcluded(m.getEventsExcluded(), e, t)
                : (L.info(
                    "The CurrentBalance event has already been sent less than 4 hours ago."
                  ),
                  !1)
              : (L.info("Referral data of the current user is already sent"),
                !1);
        },
        Z = function (e, t) {
          if (
            ((t = M.validEvent(
              e,
              t,
              2 < arguments.length && void 0 !== arguments[2]
                ? arguments[2]
                : "system",
              {
                steps: E.getTutorialSteps(),
                trIds: m.getTransactionIds(),
                maxCeParams: m.getMaxEventParams(),
              }
            )),
            e != TS_CODE && !E.isTracking())
          )
            return (
              L.info("Event [{code}] not created. Tracking is Disabled", {
                code: e,
              }),
              void X(e, t)
            );
          var r,
            n = !1;
          W(e, t) &&
            (J(e, t),
            (n =
              -1 !==
              [RP_CODE, TS_CODE, AL_CODE, LU_CODE, "tstr", "ch"].indexOf(e)),
            (r = G(e, t)),
            L.info("Create new event: " + JSON.stringify(r[U.Params], null, 2)),
            e === AL_CODE ? I.add(e, r) : D.add(r),
            X(e, t),
            (n || ee() >= m.getCountForRequest()) && re());
        },
        Q = function () {
          var e;
          0 < E.getSessionLength()
            ? ((e = _defineProperty({}, UE_LN, E.getSessionLength())),
              E.clearSessionLength(),
              Z(UE_CODE, e))
            : L.debug(
                "The user engagement event was not generated, session length is zero"
              );
        },
        $ = function () {
          if ((m.sync(), E.sync(), E.isTracking())) {
            for (var e in (N.start(), q)) q[e].start();
            ne(), C.start(), E.haveBackendId() || b.start();
          }
          I.start(), te();
        },
        ee = function () {
          var e = D.getCountEventsByUser(E.getPrimaryId()),
            t = E.getCardChanges();
          return S.isNullOrEmpty(t) || e++, e;
        },
        te = function () {
          0 < ee() && re();
        },
        re = function () {
          E.isTracking() && (n(), K()), I.send();
        },
        ne = function () {
          var e = Date.now();
          E.getSessionId() && e - E.getLastForeground() < m.getSessionTimeout()
            ? (E.resumeSession(),
              L.debug("Resume session {sessionId} for user {user}", {
                sessionId: E.getSessionId(),
                user: E.getId(),
              }))
            : (0 < E.getSessionLength() && Q(),
              E.newSession(e),
              L.debug("Start new session {sessionId} for user {user}", {
                sessionId: E.getSessionId(),
                user: E.getId(),
              }),
              Z(SS_CODE));
        };
      return (
        (e.prototype.getStorage = function () {
          return y;
        }),
        (e.prototype.close = function () {
          V = !1;
        }),
        (e.prototype.init = function (n, i) {
          var a =
            2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
          return (function (e) {
            var t,
              r = { appId: (e = M.validAppId(n, i)), ver: Y.getSdkVer() };
            if (
              (void 0 !== a[O.LogLevel] &&
                (L.setLogLevel(a[O.LogLevel]), delete a[O.LogLevel]),
              V)
            )
              throw "SDK is already initialized";
            Y.isBot() || Y.useXDR()
              ? ((t =
                  "DTDAnalytics SDK is not initialised with key '{appId}' and version '{ver}'"),
                Y.isBot() || Y.useXDR() || L.info(t, r))
              : (Y.setAppId(e),
                y.init(Y.getAppId(), { base64: Y.isBase64() }),
                (m = new AppModel(y.getApp())),
                (E = new UserModel(y.getUser())),
                (D = y.getEvent()),
                (q.session = new H("session", u, 5e3)),
                (q.alive = new H("alive", d, m.getAliveTimeout())),
                (q.queue = new H("queue", l, m.getTimeForRequest())),
                (q.ca = new H("ca", c, m.getCATimeout())),
                (I = new F(Y, E, D, m, 5e3)),
                (C = new z(
                  "sdk",
                  Y,
                  E,
                  m,
                  function (e) {
                    m.setConfigSdk(e),
                      q.alive.setDelay(m.getAliveTimeout()),
                      q.ca.setDelay(m.getCATimeout()),
                      q.queue.setDelay(m.getTimeForRequest()),
                      L.debug(
                        "The SDK analytics configuration has been received: " +
                          JSON.stringify(e, null, 2)
                      );
                  },
                  function () {
                    L.debug("Try get analytics configuration from server");
                  }
                )),
                (b = new z("d2dId", Y, E, m, function (e) {
                  var t,
                    r = DTDRequestResponse;
                  for (t in r)
                    r.hasOwnProperty(t) &&
                      void 0 !== e[r[t]] &&
                      E.setAttr(t, e[r[t]]);
                  var n = Y.getCallbackDId(),
                    i = E.getD2dId(),
                    a = E.getD2dTm(),
                    o =
                      "For user [{userId}] updated backendIdentifiers are: \r\ndevtodevId {devtodevId} \r\ndevtodevIdTimestamp: {d2dTimId}",
                    a = { userId: E.getDeviceId(), devtodevId: i, d2dTimId: a };
                  E.getD2dCrossId() &&
                    ((o += "\r\ncrossPlatformDevtodevId: {cDevtodevId}"),
                    (a.cDevtodevId = E.getD2dCrossId())),
                    L.debug(o, a),
                    null !== n && n(i);
                })),
                (A = new j(E, m, Y)),
                L.info(
                  "DTDAnalytics SDK is initialised with key '{appId}' and version '{ver}'",
                  r
                ),
                (function (e) {
                  var t = null,
                    r = "Initialize";
                  void 0 !== e[O.UserId] &&
                    (t = M.validUserId("Initialize", e[O.UserId]));
                  var n,
                    i = S.isNullOrEmpty(t) ? 1 : 0,
                    a = y.getUser().lastActive();
                  (i = i || t == m.getUUID()) && (t = m.getUUID()),
                    S.isNullOrEmpty(a)
                      ? (E.create(t, i), L.debug("It is clean SDK start"))
                      : i
                      ? E.init(a)
                      : ((n = y
                          .getUser()
                          .findPrimaryIdByCondition(
                            _defineProperty({}, x.UserId, t)
                          )),
                        S.isNullOrEmpty(n)
                          ? (E.init(a),
                            E.isDefault() || E.isDeviceCounting()
                              ? E.replaceUserId(t)
                              : E.create(t, i))
                          : E.init(n)),
                    void 0 !== e[O.Tracking] &&
                      ((i = e[O.Tracking]),
                      (n = E.isTracking()),
                      M.validTraking(r, i) &&
                        ((n === i && !1 !== i) ||
                          Z(TS_CODE, _defineProperty({}, TS_ALLOWED, i)))),
                    void 0 !== e[O.CurrentLevel] && f(r, e[O.CurrentLevel]),
                    void 0 !== e[O.AppVersion] && p(r, e[O.AppVersion]);
                })(a),
                (V = !0),
                T.start(),
                E.isTracking()
                  ? (N.start(), C.start(), b.start(), A.start(), h())
                  : L.info(
                      "DTDAnalytics not active! Tracking status is Disable!",
                      r
                    ),
                E.isDeviceCounting() && E.setDeviceCounting(0));
          })(i);
        }),
        (e.prototype.setLevel = function (e, t) {
          g() && f(e, t);
        }),
        (e.prototype.sendEvents = function () {
          g() && te();
        }),
        (e.prototype.addEvent = function (e, t, r) {
          g() && Z(t, r, e);
        }),
        (e.prototype.setTracking = function (e, t) {
          var r;
          g() &&
            M.validTraking(e, t) &&
            ((r = "Tracking status is already {status}"),
            t !== (e = E.isTracking()) &&
              (Z(TS_CODE, _defineProperty({}, TS_ALLOWED, t), !0),
              _(e),
              E.isTracking() && (h(), n(!0)),
              (r = "Tracking status is {status}")),
            L.info(r, { status: E.isTracking() ? "Enable" : "Disable" }));
        }),
        (e.prototype.setUserId = function (e, t) {
          if (g()) {
            var r,
              n,
              i = M.validUserId(e, t),
              a = null === i ? 1 : 0,
              o = !1;
            if (
              (S.isNullOrEmpty(i) && "" !== t
                ? (o = !(r = "UserId is empty"))
                : a == E.isDefault() && a
                ? (r = "It's already default user!")
                : i === E.getId()
                ? (r = "The current userId is equal to the new userId [{user}]")
                : ((n = { newUser: a ? "" : i, oldUser: E.getId() }),
                  (o = !0),
                  E.isDefault()
                    ? (E.replaceUserId(i, !1),
                      L.info(
                        "User '{oldUser}' has been renamed to '{newUser}'",
                        n
                      ))
                    : (Q(),
                      (e = _defineProperty({}, x.UserId, i)),
                      a && (e = _defineProperty({}, x.IsDefault, 1)),
                      (e = y.getUser().findPrimaryIdByCondition(e)),
                      L.info(
                        "The userId '{oldUser}' changed to '{newUser}'",
                        n
                      ),
                      v(e, i, a)),
                  E.haveBackendId() || (b.clear(), b.start())),
              !o)
            )
              throw (L.warning(r, { user: t }), null);
          }
        }),
        (e.prototype.setAppVer = function (e, t) {
          var r;
          g() &&
            ((r = m.getAppVer()),
            p(e, t),
            E.isTracking() && r != m.getAppVer() && (C.clear(), C.start()));
        }),
        (e.prototype.replaceUserId = function (e, t, r) {
          if (g()) {
            var n = M.validReplaceId(e, t, r),
              t = n.prevId,
              r = n.id,
              i = "The fromUserId is equal to the toUserId [{id}]!",
              a = !1,
              o = _defineProperty({}, x.UserId, t);
            S.isNullOrEmpty(t) && (o = _defineProperty({}, x.IsDefault, 1)),
              (e = y.getUser().findPrimaryIdByCondition(o)) !=
                (t = y
                  .getUser()
                  .findPrimaryIdByCondition(
                    _defineProperty({}, x.UserId, r)
                  )) &&
                (i = S.isNullOrEmpty(e)
                  ? "The userId: [{prevId}] not found!"
                  : (e != E.getPrimaryId()
                      ? t == E.getPrimaryId()
                        ? (v(e), E.replaceUserId(r, !1))
                        : ((o = new UserModel(y.getUser())).init(e),
                          o.replaceUserId(r, !1))
                      : (E.replaceUserId(r, !1), s()),
                    S.isNullOrEmpty(t) ||
                      (D.removeByPrimaryUserId(t),
                      y.getUser().removeByPrimaryId(t)),
                    (a = !0),
                    "User '{prevId}'renamed to '{id}'"));
            n = { prevId: n.prevId || "", id: n.id };
            if (!a) throw (L.warning(i + " Replace not possible!", n), null);
            L.info(i, n), E.haveBackendId() || (b.clear(), b.start());
          }
        }),
        (e.prototype.setCA = function (e, t, r, n, i) {
          g() &&
            E.isTracking() &&
            ((i = M.validCA(e, t, r, n, i, E.getCA())),
            E.setCA(i),
            L.info("Set currency accrual: {data}", {
              data: JSON.stringify(E.getCA()),
            }));
        }),
        (e.prototype.startPe = function (e, t) {
          g() &&
            ((e = M.validStartPe(
              e,
              t,
              2 < arguments.length && void 0 !== arguments[2]
                ? arguments[2]
                : {}
            )),
            (t = PE_CODE),
            r() ||
              M.isExcluded(m.getEventsExcluded(), t, e) ||
              B.start(e.name, e));
        }),
        (e.prototype.stopPe = function (e, t) {
          g() &&
            ((e = M.validStopPe(
              e,
              t,
              2 < arguments.length && void 0 !== arguments[2]
                ? arguments[2]
                : {}
            )),
            (t = PE_CODE),
            r() ||
              M.isExcluded(m.getEventsExcluded(), t, e) ||
              (!1 !== (e = B.finish(e.name, e)) && Z(t, e)));
        }),
        (e.prototype.setDefaultConfig = function (e) {
          E.setDefaultConfig(e);
        }),
        (e.prototype.getDefaultConfig = function () {
          return E.getDefaultConfig();
        }),
        (e.prototype.fetchExperiments = function (e) {
          A.fetch(e);
        }),
        (e.prototype.activateFetchedExperiments = function () {
          A.activated();
        }),
        (e.prototype.getAbConfig = function () {
          return E.experiments().getConfig();
        }),
        (e.prototype.getRemoteConfig = function () {
          return E.getRemoteConfig();
        }),
        (e.prototype.getRemoteValue = function (e) {
          e = E.getRemoteValue(e);
          return new RemoteConfig(e, DTDRemoteConfigSource.Ending);
        }),
        (e.prototype.getter = function (e) {
          if (g())
            switch (e) {
              case "appVer":
                return m.getAppVer();
              case "userId":
                return E.getId();
              case "level":
                return E.getLevel();
              case "tracking":
                return E.isTracking();
              case "deviceId":
                return E.getDeviceId();
              case "sdkVer":
                return Y.getSdkVer();
              default:
                return null;
            }
        }),
        (e.prototype.getCardField = function (e, t) {
          if (g()) {
            t = M.validPlKey(e, t);
            return E.getCardField(t);
          }
        }),
        (e.prototype.setCardField = function (e, t, r) {
          var n;
          g() &&
            ((n = M.validPlKey(e, t)),
            (e = M.validPlVal(e, n, r)),
            (r = E.getCard()),
            n === DTDPeople.Cheater
              ? i(e)
              : n === DTDPeople.Tester
              ? a(e)
              : (void 0 !== r[t] && r[t] == e) ||
                (E.setCardField(n, e),
                L.info(
                  "[User Card] Value [" +
                    e +
                    "] for the key [" +
                    n +
                    "] was set successfully"
                )));
        }),
        (e.prototype.unsetCardField = function (t, e) {
          g() &&
            ((e = S.isArray(e) ? e : [e]),
            k.forEach(function (e) {
              e = M.validPlKey(t, e, !1);
              null !== e &&
                (e === DTDPeople.Cheater
                  ? i(!1)
                  : e === DTDPeople.Tester
                  ? a(!1)
                  : E.unsetCardField(e));
            }, e),
            L.info(
              "User data has been successfully removed from the user profile",
              {}
            ));
        }),
        (e.prototype.cleareCard = function () {
          var e;
          g() &&
            ((e = PL_CODE),
            E.clearCard(),
            E.clearCardChanges(),
            L.info("All user data has been cleared successfully", { event: e }),
            Z(e, _defineProperty({}, PL_PARAMS, null)));
        }),
        (e.prototype.setCallbackDId = function (e) {
          var t;
          Y.setCallbackDId(e),
            V &&
              ((t = E.getD2dId()),
              (e = Y.getCallbackDId()),
              S.isNullOrEmpty(t) || S.isNullOrEmpty(e) || e(t));
        }),
        (e.prototype.setSDKVer = function (e, t) {
          M.validAppVer(e, t) &&
            (Y.setSdkVer(t),
            L.info('SDK version "{val}" is set successfully', {
              val: Y.getSdkVer(),
            }));
        }),
        (e.prototype.setSDKVerCode = function (e, t) {
          M.validSdkCode(e, t) &&
            (Y.setSdkVerCode(t),
            L.info('SDK version code "{val}" is set successfully', {
              val: Y.getSdkVerCode(),
            }));
        }),
        (e.prototype.getUser = function () {
          return E;
        }),
        (e.prototype.getApp = function () {
          return m;
        }),
        {
          getInstance: function () {
            return (P = P || new e());
          },
        }
      );
    })();
  (DTDRemoteConfig = (function () {
    var t;
    function e(e) {
      (t = e),
        Object.defineProperty(this, "defaults", {
          get: function () {
            return {};
          },
          set: function (e) {},
        }),
        Object.defineProperty(this, "remote", {
          get: function () {
            return {};
          },
        }),
        Object.defineProperty(this, "abtest", {
          get: function () {
            return {};
          },
        });
    }
    return (
      (e.prototype.configValue = function (e) {
        return t.getRemoteValue(e);
      }),
      (e.prototype.fetch = function (e) {}),
      (e.prototype.activateFetched = function () {
        t.activateFetchedExperiments(), t.sendEvents();
      }),
      e
    );
  })()),
    (DTDUserCard = (function () {
      function r(e, t) {
        null !== e && ((e = MES_PREFIX + e), i.error(e, { method: t })),
          i.error("Execution of the {method} method was canceled!", {
            method: t,
          });
      }
      var n,
        i = DTDLogger.getInstance(),
        a = DTDPeople;
      function e(e) {
        n = e;
      }
      return (
        (e.prototype.getName = function () {
          var t = "getName";
          try {
            return n.getCardField(t, a.Name);
          } catch (e) {
            r(e, t);
          }
        }),
        (e.prototype.setName = function (e) {
          var t = "setName";
          try {
            n.setCardField(t, a.Name, e);
          } catch (e) {
            r(e, t);
          }
        }),
        (e.prototype.getEmail = function () {
          var t = "getEmail";
          try {
            return n.getCardField(t, a.Email);
          } catch (e) {
            r(e, t);
          }
        }),
        (e.prototype.setEmail = function (e) {
          var t = "setEmail";
          try {
            n.setCardField(t, a.Email, e);
          } catch (e) {
            r(e, t);
          }
        }),
        (e.prototype.getPhone = function () {
          var t = "getPhone";
          try {
            return n.getCardField(t, a.Phone);
          } catch (e) {
            r(e, t);
          }
        }),
        (e.prototype.setPhone = function (e) {
          var t = "setPhone";
          try {
            n.setCardField(t, a.Phone, e);
          } catch (e) {
            r(e, t);
          }
        }),
        (e.prototype.getPhoto = function () {
          var t = "getPhoto";
          try {
            return n.getCardField(t, a.Photo);
          } catch (e) {
            r(e, t);
          }
        }),
        (e.prototype.setPhoto = function (e) {
          var t = "setPhoto";
          try {
            n.setCardField(t, a.Photo, e);
          } catch (e) {
            r(e, t);
          }
        }),
        (e.prototype.getGender = function () {
          var t = "getGender";
          try {
            return n.getCardField(t, a.Gender);
          } catch (e) {
            r(e, t);
          }
        }),
        (e.prototype.setGender = function (e) {
          var t = "setGender";
          try {
            n.setCardField(t, a.Gender, e);
          } catch (e) {
            r(e, t);
          }
        }),
        (e.prototype.getAge = function () {
          try {
            return n.getCardField("getAge", a.Age);
          } catch (e) {
            r(e, "getAge");
          }
        }),
        (e.prototype.setAge = function (e) {
          try {
            n.setCardField("setAge", a.Age, e);
          } catch (e) {
            r(e, "setAge");
          }
        }),
        (e.prototype.setTester = function (e) {
          var t = "setTester";
          try {
            n.setCardField(t, a.Tester, e);
          } catch (e) {
            r(e, t);
          }
        }),
        (e.prototype.setCheater = function (e) {
          var t = "setCheater";
          try {
            n.setCardField(t, a.Cheater, e);
          } catch (e) {
            r(e, t);
          }
        }),
        (e.prototype.set = function (e, t) {
          try {
            n.setCardField("set", e, t);
          } catch (e) {
            r(e, "set");
          }
        }),
        (e.prototype.getValue = function (e) {
          var t = "getValue";
          try {
            return n.getCardField(t, e);
          } catch (e) {
            r(e, t);
          }
        }),
        (e.prototype.unset = function (e) {
          try {
            n.unsetCardField("unset", e);
          } catch (e) {
            r(e, "unset");
          }
        }),
        (e.prototype.clearUser = function () {
          try {
            n.cleareCard();
          } catch (e) {
            r(e, "clearUser");
          }
        }),
        e
      );
    })());
  var DTDAnalitics = (function () {
      function s(e, t) {
        null !== e && ((e = MES_PREFIX + e), r.error(e, { method: t })),
          r.error("Execution of the {method} method was canceled!", {
            method: t,
          });
      }
      var t = DTDSystemManager.getInstance(),
        r = DTDLogger.getInstance(),
        u = DTDClient.getInstance(),
        n = new DTDRemoteConfig(u),
        o = DTDTypeValidator;
      function e(e) {
        t.setEnv(e),
          Object.defineProperty(this, "logLevel", {
            get: function () {
              return r.getLogLevel();
            },
            set: function (e) {
              r.setLogLevel(e);
            },
          }),
          Object.defineProperty(this, "user", {
            get: function () {
              return new DTDUserCard(u);
            },
          }),
          Object.defineProperty(this, "remoteConfig", {
            get: function () {
              return n;
            },
          });
      }
      return (
        (e.prototype.initialize = function (e, t) {
          var r = "Initialize";
          try {
            u.init(r, e, t);
          } catch (e) {
            s(e, r);
          }
        }),
        (e.prototype.getAppVersion = function () {
          try {
            return u.getter("appVer");
          } catch (e) {
            s(e, "getAppVersion");
          }
        }),
        (e.prototype.setAppVersion = function (e) {
          var t = "setAppVersion";
          try {
            u.setAppVer(t, e);
          } catch (e) {
            s(e, t);
          }
        }),
        (e.prototype.getUserId = function () {
          try {
            return u.getter("userId");
          } catch (e) {
            s(e, "getUserId");
          }
        }),
        (e.prototype.setUserId = function (e) {
          var t = "SetUserId";
          try {
            u.setUserId(t, e);
          } catch (e) {
            s(e, t);
          }
        }),
        (e.prototype.getCurrentLevel = function () {
          try {
            return u.getter("level");
          } catch (e) {
            s(e, "getCurrentLevel");
          }
        }),
        (e.prototype.setCurrentLevel = function (e) {
          var t = "SetCurrentLevel";
          try {
            u.setLevel(t, e);
          } catch (e) {
            s(e, t);
          }
        }),
        (e.prototype.setTrackingAvailability = function (e) {
          var t = "SetTrackingAvailability";
          try {
            u.setTracking(t, e);
          } catch (e) {
            s(e, t);
          }
        }),
        (e.prototype.getTrackingAvailability = function () {
          try {
            return u.getter("tracking");
          } catch (e) {
            s(e, "getTrackingAvailability");
          }
        }),
        (e.prototype.getDeviceId = function () {
          try {
            return u.getter("deviceId");
          } catch (e) {
            s(e, "getDeviceId");
          }
        }),
        (e.prototype.getSDKVersion = function () {
          try {
            return u.getter("sdkVer");
          } catch (e) {
            s(e, "getSDKVersion");
          }
        }),
        (e.prototype.socialNetworkConnect = function (e) {
          var t = "SocialNetworkConnect";
          try {
            u.addEvent(t, SC_CODE, _defineProperty({}, SC_NET, e));
          } catch (e) {
            s(e, t);
          }
        }),
        (e.prototype.socialNetworkPost = function (e, t) {
          var r,
            n = "SocialNetworkPost";
          try {
            u.addEvent(
              n,
              SP_CODE,
              (_defineProperty((r = {}), SP_NET, e),
              _defineProperty(r, SP_REASON, t),
              r)
            );
          } catch (e) {
            s(e, n);
          }
        }),
        (e.prototype.tutorial = function (e) {
          var t = "Tutorial";
          try {
            u.addEvent(t, TR_CODE, _defineProperty({}, TR_STEP, e));
          } catch (e) {
            s(e, t);
          }
        }),
        (e.prototype.realCurrencyPayment = function (e, t, r, n) {
          var i,
            a = "realCurrencyPayment";
          try {
            u.addEvent(
              a,
              RP_CODE,
              (_defineProperty((i = {}), RP_PRICE, t),
              _defineProperty(i, RP_ORDER_ID, e),
              _defineProperty(i, RP_PRODUCT_ID, r),
              _defineProperty(i, RP_CURRENCY, n),
              i)
            );
          } catch (e) {
            s(e, a);
          }
        }),
        (e.prototype.virtualCurrencyPayment = function (e, t, r) {
          var n = "virtualCurrencyPayment",
            i = arguments.length <= 3 ? 0 : arguments.length - 3,
            a =
              (_defineProperty((a = {}), VP_PURCHASE_ID, e),
              _defineProperty(a, VP_PURCHASE_TYPE, t),
              _defineProperty(a, VP_PURCHASE_AMOUNT, r),
              a);
          0 < i &&
            (1 == i && o.isObject(arguments.length <= 3 ? void 0 : arguments[3])
              ? (a.r = arguments.length <= 3 ? void 0 : arguments[3])
              : ((a.p = arguments.length <= 3 ? void 0 : arguments[3]),
                (a.c = arguments.length <= 4 ? void 0 : arguments[4])));
          try {
            u.addEvent(n, VP_CODE, a);
          } catch (e) {
            s(e, n);
          }
        }),
        (e.prototype.customEvent = function (e) {
          var t,
            r =
              1 < arguments.length && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            n = "customEvent";
          try {
            u.addEvent(
              n,
              CE_CODE,
              (_defineProperty((t = {}), CE_NAME, e),
              _defineProperty(t, CE_PARAMS, r),
              t)
            );
          } catch (e) {
            s(e, n);
          }
        }),
        (e.prototype.levelUp = function (e, t, r, n, i) {
          var a,
            o = "levelUp";
          try {
            u.addEvent(
              o,
              LU_CODE,
              (_defineProperty((a = {}), LU_LEVEL, e),
              _defineProperty(a, LU_BOUGHT, i),
              _defineProperty(a, LU_BALANCE, t),
              _defineProperty(a, LU_SPENT, r),
              _defineProperty(a, LU_EARND, n),
              a)
            );
          } catch (e) {
            s(e, o);
          }
        }),
        (e.prototype.currencyAccrual = function (e, t, r, n) {
          var i = "currencyAccrual";
          try {
            u.setCA(i, e, t, r, n);
          } catch (e) {
            s(e, i);
          }
        }),
        (e.prototype.replaceUserId = function (e, t) {
          var r = "replaceUserId";
          try {
            u.replaceUserId(r, e, t);
          } catch (e) {
            s(e, r);
          }
        }),
        (e.prototype.startProgressionEvent = function (e, t) {
          var r = "startProgressionEvent";
          try {
            u.startPe(r, e, t);
          } catch (e) {
            s(e, r);
          }
        }),
        (e.prototype.finishProgressionEvent = function (e, t) {
          var r = "finishProgressionEvent";
          try {
            u.stopPe(r, e, t);
          } catch (e) {
            s(e, r);
          }
        }),
        (e.prototype.referrer = function (e) {
          var t = "Referrer";
          try {
            u.addEvent(t, RF_CODE, e);
          } catch (e) {
            s(e, t);
          }
        }),
        (e.prototype.sendBufferedEvents = function () {
          try {
            u.sendEvents();
          } catch (e) {
            s(e, "sendBufferedEvents");
          }
        }),
        (e.prototype.setIdentifiersListener = function (e) {
          u.setCallbackDId(e);
        }),
        (e.prototype.adImpression = function (e, t, r, n) {
          var i,
            a = "adImpression";
          try {
            u.addEvent(
              a,
              ADRV_CODE,
              (_defineProperty((i = {}), ADRV_NETWORK, e),
              _defineProperty(i, ADRV_UNIT, n),
              _defineProperty(i, ADRV_REVENUE, t),
              _defineProperty(i, ADRV_PLACEMENT, r),
              i)
            );
          } catch (e) {
            s(e, a);
          }
        }),
        (e.prototype.setSDKVersion = function (e) {
          var t = "setSDKVersion";
          try {
            u.setSDKVer(t, e);
          } catch (e) {
            s(e, t);
          }
        }),
        (e.prototype.setSDKVersionCode = function (e) {
          var t = "setSDKVersionCode";
          try {
            u.setSDKVerCode(t, e);
          } catch (e) {
            s(e, t);
          }
        }),
        (e.prototype.onDebugMessage = function (e) {
          r.setCallback(e);
        }),
        (e.prototype.testLogs = function () {
          r.error("this is error message"),
            r.warning("this is warning message"),
            r.info("this is info message"),
            r.debug("this is debug message");
        }),
        (e.prototype.currentBalance = function (e) {
          var t = "currentBalance";
          try {
            u.addEvent(t, CB_CODE, e);
          } catch (e) {
            s(e, t);
          }
        }),
        e
      );
    })(),
    DTDAnaliticsTest = (function () {
      "use strict";
      function e() {
        DTDAnalitics.call(this, { base64: !1 }),
          Object.defineProperty(this, "testProxyUrl", {
            get: function () {
              return t.getApiUrl();
            },
            set: function (e) {
              t.setApiUrl(e);
            },
          }),
          Object.defineProperty(this, "testCustomUrl", {
            get: function () {
              return t.getTestCustomUrl();
            },
            set: function (e) {
              t.setTestCustomUrl(e);
            },
          });
      }
      var t = DTDSystemManager.getInstance();
      return ((e.prototype = Object.create(
        DTDAnalitics.prototype
      )).constructor = e);
    })(),
    DTDAnaliticsUnity = (function () {
      "use strict";
      function i(e, t) {
        return void 0 === e || "" == e || t == e;
      }
      function e(e) {
        DTDAnalitics.call(this, e);
      }
      var f = DTDClient.getInstance(),
        p = DTDSystemManager.getInstance(),
        h = DTDUserStorage,
        g = DTDTypeValidator;
      return (
        (((e.prototype = Object.create(DTDAnalitics.prototype)).constructor =
          e).prototype._migration = function (e, t, r, n, i) {
          p.setAppId(e);
          var a = f.getStorage(),
            o = DTDUserStorage,
            s = DTDAppStorage;
          a.init(p.getAppId(), { base64: p.isBase64() });
          var u = new AppModel(a.getApp()),
            e = new UserModel(a.getUser());
          if (u.isMigration()) _logger.warning("Already migration");
          else {
            a = a
              .getUser()
              .findPrimaryIdByCondition(_defineProperty({}, h.UserId, t));
            if (g.isNullOrEmpty(a)) {
              e.create(t, r);
              var d,
                c = _defineProperty({}, o.DeviceCounting, n),
                l = _defineProperty({}, s.IsMigration, 1);
              for (d in i)
                if (!g.isNullOrEmpty(i[d]))
                  switch (d) {
                    case "prevUserId":
                      (c[o.PrevUserId] = i[d]), (c[o.PrevDeviceId] = i[d]);
                      break;
                    case "trackingAvailable":
                      c[o.Tracking] = i[d];
                      break;
                    case "level":
                      c[o.CurrentLevel] = i[d];
                      break;
                    case "userCard":
                      c[o.Profile] = i[d];
                      break;
                    case "tutorCompletedSteps":
                      c[o.TutorialSteps] = i[d];
                      break;
                    case "transactionIds":
                      l[s.TransactionIds] = i[d];
                  }
              e.setAttrs(c), u.setAttrs(l);
            } else _logger.warning("User not empty");
          }
        }),
        (e.prototype.migrationUser = function (e, t) {
          var r, n;
          void 0 !== e &&
            void 0 !== t &&
            (void 0 !== (t = JSON.parse(t)).deviceId && (n = t.deviceId),
            void 0 !== t.userId && (r = t.userId),
            (n = i(r, n)),
            this._migration(e, r, n, 0, t));
        }),
        (e.prototype.migrationDevice = function (e, t) {
          var r, n;
          void 0 !== e &&
            void 0 !== t &&
            (void 0 !== (t = JSON.parse(t)).deviceId && (r = t.deviceId),
            void 0 !== t.userId && (n = t.userId),
            (n = i(n, r)),
            delete t.prevUserId,
            this._migration(e, r, n, 1, t));
        }),
        e
      );
    })(),
    DTDAnaliticsUnityTest = (function () {
      "use strict";
      function e() {
        DTDAnaliticsUnity.call(this, { engine: "unity" }),
          Object.defineProperty(this, "testProxyUrl", {
            get: function () {
              return t.getApiUrl();
            },
            set: function (e) {
              t.setApiUrl(e);
            },
          }),
          Object.defineProperty(this, "testCustomUrl", {
            get: function () {
              return t.getTestCustomUrl();
            },
            set: function (e) {
              t.setTestCustomUrl(e);
            },
          });
      }
      var t = DTDSystemManager.getInstance(),
        r = DTDClient.getInstance();
      return (
        (((e.prototype = Object.create(
          DTDAnaliticsUnity.prototype
        )).constructor = e).prototype.close = function () {
          r.close();
        }),
        (e.prototype.getClient = function () {
          return r;
        }),
        e
      );
    })();
  window.devtodev = new DTDAnalitics();
})(this);
