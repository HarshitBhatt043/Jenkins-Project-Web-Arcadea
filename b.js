!(function () {
  function e(e) {
    return 300 * (e /= 300) * e + 360;
  }
  function r(e, t) {
    return Math.atan2(t[1] - e[1], t[0] - e[0]);
  }
  function i(e, t) {
    return Math.sqrt(e * e + t * t);
  }
  function a(e) {
    var t;
    (t = ee.VERTEX_SHADER),
      (t = ee.createShader(t)),
      ee.shaderSource(
        t,
        "attribute vec2 p;varying vec2 uv;void main(){gl_Position=vec4(p,.0,1.);uv=.5*(p+1.);}"
      ),
      ee.compileShader(t);
    var r = t;
    return (
      (t = ee.FRAGMENT_SHADER),
      (t = ee.createShader(t)),
      ee.shaderSource(t, e),
      ee.compileShader(t),
      (e = ee.createProgram()),
      ee.attachShader(e, r),
      ee.attachShader(e, t),
      ee.linkProgram(e),
      ee.useProgram(e),
      (r = ee.getAttribLocation(e, "p")),
      ee.enableVertexAttribArray(r),
      ee.vertexAttribPointer(r, 2, ee.FLOAT, !1, 0, 0),
      [e]
    );
  }
  function o(e, t) {
    return e[t] || (e[t] = ee.getUniformLocation(e[0], t));
  }
  function n() {
    var e = ee.createTexture();
    return (
      ee.bindTexture(ee.TEXTURE_2D, e),
      ee.texParameteri(ee.TEXTURE_2D, ee.TEXTURE_MIN_FILTER, ee.LINEAR),
      ee.texParameteri(ee.TEXTURE_2D, ee.TEXTURE_MAG_FILTER, ee.LINEAR),
      ee.texParameteri(ee.TEXTURE_2D, ee.TEXTURE_WRAP_S, ee.CLAMP_TO_EDGE),
      ee.texParameteri(ee.TEXTURE_2D, ee.TEXTURE_WRAP_T, ee.CLAMP_TO_EDGE),
      e
    );
  }
  function s() {
    var e = ee.createFramebuffer();
    ee.bindFramebuffer(ee.FRAMEBUFFER, e);
    var t = n();
    return (
      ee.texImage2D(
        ee.TEXTURE_2D,
        0,
        ee.RGBA,
        re,
        ie,
        0,
        ee.RGBA,
        ee.UNSIGNED_BYTE,
        null
      ),
      ee.framebufferTexture2D(
        ee.FRAMEBUFFER,
        ee.COLOR_ATTACHMENT0,
        ee.TEXTURE_2D,
        t,
        0
      ),
      [e, t]
    );
  }
  function f() {
    this.T = function (e) {
      for (var t = 0; 24 > t; t++)
        this[String.fromCharCode(97 + t)] = e[t] || 0;
      0.01 > this.c && (this.c = 0.01),
        0.18 > (e = this.b + this.c + this.e) &&
          ((e = 0.18 / e), (this.b *= e), (this.c *= e), (this.e *= e));
    };
  }
  function u(e) {
    (e = e.split(V)),
      (this.frequency = u.M(e[0]) || 0),
      (this.duration = u.L(e[1]) || 0);
  }
  function l(e, t, r) {
    (this.C = e || new j()),
      this.J(),
      (this.D = t || 120),
      (this.loop = !0),
      (this.F = this.I = 0),
      (this.B = []),
      this.push.apply(this, r || []);
  }
  function h(e, t, r, i) {
    te.moveTo(e, t), te.lineTo(e + r, t + i);
  }
  function v(e, t, r, i, a, o) {
    for (te.save(), te.beginPath(), x(a), a = 0; a < e.length; a++) {
      var n = J["0123456789?abcdefghijklmnopqrstuvwxyz .-'/".indexOf(e[a])],
        s = oe[0] + t - (i + o) * (e.length - a),
        c = oe[1] + r,
        f = i,
        u = f - 4,
        l = f / 2 - 4;
      1 & n && h(s + 2, c - 1, u, 0),
        2 & n && h(f + s + 1, c, 0, f - 1),
        4 & n && h(f + s + 1, f + c + 1, 0, f - 1),
        8 & n && h(s + 2, 2 * f + c + 1, u, 0),
        16 & n && h(s - 1, c + f + 1, 0, f - 1),
        32 & n && h(s - 1, c, 0, f - 1),
        64 & n && h(s + 2, f + c, l, 0),
        128 & n && h(s + 2, c + 2, l, u),
        256 & n && h(f / 2 + s, c + 2, 0, u),
        512 & n && h(f + s - 2, c + 2, -l, u),
        1024 & n && h(f / 2 + s + 2, f + c, l, 0),
        2048 & n && h(f / 2 + s + 2, f + c + 2, l, u),
        4096 & n && h(f / 2 + s, f + c + 2, 0, u),
        8192 & n && h(s + 2, 2 * f + c - 2, l, 4 - f);
    }
    te.closePath(), te.stroke(), te.restore();
  }
  function b(e, t, r, i, a, o) {
    var n;
    (n = n || a.length), (o = o || 0);
    for (var s = 25 > i ? 10 : 0.5 * i, c = 0; c < n; c++)
      $[o](e, t + c, r + c, i, a[c] || a[0], s);
  }
  function m(e) {
    return Math.round(e[0] / 84) + "-" + Math.round(e[1] / 84);
  }
  function p(e) {
    for (var t, r = {}, a = 0; 9 > a; a++)
      if (!r[(t = m([e[0] + 84 * ((a % 3) - 1), e[1] + 84 * (~~(a / 3) - 1)]))])
        for (r[t] = 1, t = Q[t], a = 0; t && a < t.length; a++)
          if (i(e[1] - t[a][1], e[0] - t[a][0]) < t[a][2] + e[2]) return t[a];
  }
  function x(e, t, r) {
    te[["strokeStyle", "fillStyle", "lineWidth"][t || 0]] = r || we[e];
  }
  function y(e, t, r, i, a) {
    ee.bindFramebuffer(ee.FRAMEBUFFER, e[0]),
      ee.useProgram(r[0]),
      ee.uniform1i(
        o(r, "tex"),
        (function (e) {
          return (
            ee.activeTexture(ee.TEXTURE0 + 0),
            ee.bindTexture(ee.TEXTURE_2D, e),
            0
          );
        })(t)
      ),
      null != i && ee.uniform1f(o(r, "time"), i),
      a && ee.uniform3fv(o(r, "colors"), a),
      ee.drawArrays(ee.TRIANGLES, 0, 6);
  }
  function D(e, t) {
    for (var r = [], i = 0; i < t; i++) {
      var a = e.slice();
      (a[5] = 0.05 * (i - t / 2) + e[5]), r.push(X(a));
    }
    return r;
  }
  function k() {
    (Q = {}),
      (Ne = !1),
      (se = 0),
      (je = []),
      (We = 0.3),
      (ze = [
        (800 - (Oe = (Le = 21) * (Xe = 40))) / 2,
        (600 - Oe) / 2,
        370,
        270,
      ]),
      (He = []),
      (Ve = [10.5 * Xe, 10.5 * Xe, 16, 0, 150, 0, 0, 12, 0, 0]),
      (Ye = [
        [0, 1, 0, -1],
        [-1, 1, 0.5, 1],
      ]),
      (Ke = []),
      (Je = []),
      ($e = ""),
      (Qe = Math.PI / 2),
      (ne = Ze = 0),
      (wave = 1),
      (ce = [0, 0, 0, 0, 0, 0, 0, 0]),
      (et = {
        500: [1, Me],
        2500: [0, 10, 5, 10],
        8999: [5, "what are you doing?"],
        10500: [1, Re],
        10800: [8, 2],
        11e3: [0, 5, 5, 10],
        18e3: [0, 15, 15, 10],
        18001: [5, ""],
        25e3: [0, 15, 5, 10],
        31e3: [0, 5, 15, 10],
        37e3: [0, 10, 11, 11],
        37500: [1, Ae],
        46e3: [5, "are you trying to stop us?"],
        48500: [2, 10, 0, 0, 0, 10, 10, 10],
        49e3: [2, 10, 10, 10, 15, 10, 20, 10],
        49001: [4, Re, 1],
        49002: [4, Ae, 1],
        49003: [4, Me, 1],
        49500: [8, 3],
        50004: [2, 60, 60, 68, 55, 50, 45, 60],
        51e3: [4, Re, 138],
        51001: [4, Ae, 138],
        51002: [4, Me, 138],
        51003: [5, "we are perfection"],
        52e3: [0, 4, 10, 11],
        53e3: [0, 14, 10, 10],
        55550: [5, ""],
        61e3: [0, 10, 16, 11],
        61003: [5, "we are creation"],
        66550: [5, ""],
        67e3: [0, 16, 10, 11],
        68e3: [0, 6, 10, 10],
        72e3: [0, 10, 4, 11],
        80501: [2, 1e3, 0, 0, 0, 0, 0, 10],
        83e3: [0, 10, 9, 12],
        83500: [1, Ee],
        95050: [5, "you must stop this"],
        99950: [5, "is inevitable!"],
        99980: [8, 4],
        1e5: [0, 10, 1, 12],
        103050: [5, ""],
        106e3: [0, 1, 10, 12],
        111e3: [0, 19, 10, 12],
        116e3: [0, 10, 19, 12],
        14e4: [8, 5],
        140001: [5, "can't you understand?"],
        141600: [0, 10, 12, 10],
        141601: [0, 12, 13, 10],
        141602: [0, 12, 15, 10],
        141603: [0, 10, 16, 10],
        141604: [0, 8, 15, 10],
        141605: [0, 8, 13, 10],
        145050: [5, ""],
        156800: [6, "stop"],
        156900: [6, "now"],
        157e3: [0, 10, 14, 13],
        18e4: [6, "you"],
        180100: [6, "are"],
        180200: [6, "the"],
        180300: [6, "glitch"],
        181e3: [8, 6],
        182e3: [7, Ae],
        182050: [7, Ee],
        182100: [7, Re],
        182150: [7, Me],
        185100: [2, 300, 0, 300, 0, 0, 0, 0],
        187e3: [0, 10, 10, 14],
        189e3: [1, Ae],
        189001: [1, Ee],
        189002: [1, Re],
        189003: [1, Me],
        300100: [1, Me],
        305e3: [0, 10, 5, 10],
        308e3: [1, Re],
        31e4: [0, 10, 6, 11],
        311e3: [1, Me],
        315e3: [0, 14, 6, 10],
        317e3: [0, 14, 14, 10],
        319e3: [0, 6, 14, 10],
        32e4: [0, 6, 6, 10],
        335e3: [0, 11, 11, 12],
        336e3: [0, 9, 11, 12],
        337e3: [0, 11, 9, 12],
        338e3: [0, 9, 9, 12],
        35e4: [0, 19, 19, 11],
        352e3: [0, 1, 19, 11],
        354e3: [0, 1, 1, 11],
        355e3: [0, 19, 1, 11],
        365e3: [0, 10, 8, 10],
        366e3: [0, 11, 9, 10],
        367e3: [0, 12, 10, 10],
        368e3: [0, 11, 11, 10],
        369e3: [0, 10, 12, 10],
        37e4: [0, 9, 11, 10],
        371e3: [0, 8, 10, 10],
        372e3: [0, 9, 9, 10],
        395e3: [0, 1, 1, 12],
        395001: [0, 1, 19, 12],
        395002: [0, 19, 19, 12],
        395003: [0, 20, 1, 12],
        395004: [0, 10, 10, 12],
        425e3: [0, 0, 10, 13],
        425001: [0, 20, 10, 13],
        570001: [0, 10, 10, 13],
      }),
      (tt = void 0);
    for (var e = 0; e < Le; e++) {
      je.push([]);
      for (var t = 0; t < Le; t++) je[e].push([]);
    }
    for (e = 0; e < Le - 1; e++)
      10 != e &&
        ((et[45e4 + 6e3 * e] = [0, e, e, 10]),
        (et[453e3 + 6e3 * e] = [0, Le - e - 1, e, 10]));
    for (
      rt = Object.keys(et).map(function (e) {
        return parseInt(e);
      }),
        Ae.stop(),
        Ee.stop(),
        Re.stop(),
        Me.stop(),
        record = parseFloat(ae.getItem("agar3sjs13k-record") || 0),
        e = 0;
      xt && e < xt.length;
      e++
    )
      xt[e][3] = !1;
    (it = !1), M(), w();
  }
  function w() {
    if (
      (fe &&
        ((Ye = [
          [
            0, -0.5, -0.25, -1, -0.5, -0.4, -0.5, -0.25, 0, 0.25, 0.5, 0.4, 0.5,
            1, 0.25, 0.5,
          ],
          [
            -0.25, 0, -1, 0.25, 0.75, 0.5, 0.25, 0.2, 0.8, 0.2, 0.25, 0.5, 0.75,
            0.25, -1, 0,
          ],
        ]),
        (Ve[4] = 160),
        (Ve[2] = 20),
        (Ve[7] = 22)),
      le)
    ) {
      (Ze = 3e5), (wave = 7);
      for (var e = rt.length - 1; 0 <= e; e--) 3e5 > rt[e] && rt.splice(e, 1);
    }
  }
  function P(e, t, r, i, a) {
    te.moveTo(e, t), te.lineTo(e + (i ? a : r), t + (i ? r : a));
  }
  function T(e, t) {
    P(e, 0, t, !0, 0), P(0, e, t, void 0, 0);
  }
  function F() {
    ut = 0.01;
  }
  function A(e, t) {
    (ce[6] = 30), (bt = t || 30), (ne = 10), (vt = e);
  }
  function E() {
    return (
      "I reached " +
      Ze.toFixed() +
      " " +
      (fe ? "#evilMode " : "") +
      "points in #evilGlitch #js13k #js13kgames by @agar3s "
    );
  }
  function R(e, t) {
    return Math.random() * (e || 1) + (t || 0);
  }
  function M() {
    var e = R(10, 5);
    ce = [e, e, e, R(10, 5), R(10, 5), R(10, 5), 0];
  }
  function C(e, t, r, i) {
    14 == i[2] && ((r *= 2), N(nt)), yt.push([e, t, r, r, i]);
  }
  function I(e, t) {
    var i = _([
      e[0] + 10 * Math.cos((Math.PI * t) / 3),
      e[1] + 10 * Math.sin((Math.PI * t) / 3),
      4,
    ]);
    (i[13] = e),
      (i[9] = r(i, e)),
      (i[3] = i[9] + e[11]),
      (i[15] = 0),
      (i[16] = 0),
      He.push(i);
  }
  function _(e) {
    if (12 == (e = e.slice(0, 2).concat(wt[e[2]].slice(0)))[5] || 14 == e[5])
      for (var t = 0; 6 > t; t++) I(e, t);
    return e;
  }
  function B(e) {
    if (0.99 < e) return 1;
    var t = 1 / e;
    return (100 * e) % t > t / 2 ? 1 : 0;
  }
  function G(e, t) {
    return e ? R(2 * t, -t) : 0;
  }
  function U(e, t, r) {
    te.moveTo(e[0] * r, t[0] * r);
    for (var i = 1; i < e.length; i++) te.lineTo(e[i] * r, t[i] * r);
    te.lineTo(e[0] * r, t[0] * r);
  }
  function S(e, t, r, i, a, o) {
    for (var n = -i; n < i; n++) Je.push([e, t, R(Qe * n, r), a || 60, o]);
  }
  var q,
    L,
    X,
    N,
    O = new (function () {
      var e, t, r, i, a, o, n, s, c, u, l, h;
      (this.G = new f()),
        (this.r = function () {
          var e = this.G;
          (i = 100 / (e.f * e.f + 0.001)),
            (a = 100 / (e.g * e.g + 0.001)),
            (o = 1 - e.h * e.h * e.h * 0.01),
            (n = -e.i * e.i * e.i * 1e-6),
            e.a || ((l = 0.5 - e.n / 2), (h = 5e-5 * -e.o)),
            (s = 1 + e.l * e.l * (0 < e.l ? -0.9 : 10)),
            (c = 0),
            (u = 1 == e.m ? 0 : (1 - e.m) * (1 - e.m) * 2e4 + 32);
        }),
        (this.V = function () {
          this.r();
          var i = this.G;
          return (
            (e = i.b * i.b * 1e5),
            (t = i.c * i.c * 1e5),
            (r = i.e * i.e * 1e5 + 12),
            3 * (((e + t + r) / 3) | 0)
          );
        }),
        (this.U = function (f, v) {
          var b = 1 != (X = this.G).s || X.v,
            m = X.v * X.v * 0.1,
            g = 1 + 3e-4 * X.w,
            d = X.s * X.s * X.s * 0.1,
            p = 1 + 1e-4 * X.t,
            x = 1 != X.s,
            y = X.x * X.x,
            D = X.g,
            k = X.q || X.r,
            w = X.r * X.r * X.r * 0.2,
            P = X.q * X.q * (0 > X.q ? -1020 : 1020),
            T = X.p ? 32 + (((1 - X.p) * (1 - X.p) * 2e4) | 0) : 0,
            F = X.d,
            A = X.j / 2,
            E = X.k * X.k * 0.01,
            M = X.a,
            C = e,
            I = 1 / e,
            _ = 1 / t,
            B = 1 / r;
          0.8 < (X = (5 / (1 + X.u * X.u * 20)) * (0.01 + d)) && (X = 0.8);
          for (
            var G,
              U,
              S,
              q,
              L,
              X = 1 - X,
              N = !1,
              O = 0,
              j = 0,
              W = 0,
              z = 0,
              H = 0,
              V = 0,
              Y = 0,
              K = 0,
              J = 0,
              $ = 0,
              Q = Array(1024),
              Z = Array(32),
              ee = Q.length;
            ee--;

          )
            Q[ee] = 0;
          for (ee = Z.length; ee--; ) Z[ee] = R(2, -1);
          for (ee = 0; ee < v; ee++) {
            if (N) return ee;
            if (
              (T && ++J >= T && ((J = 0), this.r()),
              u && ++c >= u && ((u = 0), (i *= s)),
              (i *= o += n) > a && ((i = a), 0 < D && (N = !0)),
              (U = i),
              0 < A && (($ += E), (U *= 1 + Math.sin($) * A)),
              8 > (U |= 0) && (U = 8),
              M || (0 > (l += h) ? (l = 0) : 0.5 < l && (l = 0.5)),
              ++j > C)
            )
              switch (((j = 0), ++O)) {
                case 1:
                  C = t;
                  break;
                case 2:
                  C = r;
              }
            switch (O) {
              case 0:
                W = j * I;
                break;
              case 1:
                W = 1 + 2 * (1 - j * _) * F;
                break;
              case 2:
                W = 1 - j * B;
                break;
              case 3:
                (W = 0), (N = !0);
            }
            k && (0 > (S = 0 | (P += w)) ? (S = -S) : 1023 < S && (S = 1023)),
              b && g && (1e-5 > (m *= g) ? (m = 1e-5) : 0.1 < m && (m = 0.1)),
              (L = 0);
            for (var te = 8; te--; ) {
              if (++Y >= U && ((Y %= U), 3 == M))
                for (G = Z.length; G--; ) Z[G] = R(2, -1);
              switch (M) {
                case 0:
                  q = Y / U < l ? 0.5 : -0.5;
                  break;
                case 1:
                  q = 1 - (Y / U) * 2;
                  break;
                case 2:
                  q =
                    0.225 *
                      ((0 >
                      (q =
                        1.27323954 *
                          (q = 6.28318531 * (0.5 < (q = Y / U) ? q - 1 : q)) +
                        0.405284735 * q * q * (0 > q ? 1 : -1))
                        ? -1
                        : 1) *
                        q *
                        q -
                        q) +
                    q;
                  break;
                case 3:
                  q = Z[Math.abs(((32 * Y) / U) | 0)];
              }
              b &&
                ((G = V),
                0 > (d *= p) ? (d = 0) : 0.1 < d && (d = 0.1),
                x ? ((H += (q - V) * d), (H *= X)) : ((V = q), (H = 0)),
                (z += (V += H) - G),
                (q = z *= 1 - m)),
                k && ((Q[K % 1024] = q), (q += Q[(K - S + 1024) % 1024]), K++),
                (L += q);
            }
            (L *= 0.125 * W * y),
              (f[ee] = 1 <= L ? 32767 : -1 >= L ? -32768 : (32767 * L) | 0);
          }
          return v;
        });
    })(),
    j = window.AudioContext || window.webkitAudioContext;
  if (j) {
    (q = new j()), (L = q.createDynamicsCompressor());
    var W = q.createGain();
    (W.gain.value = window.chrome ? 0.2 : 0.4),
      L.connect(W),
      W.connect(q.destination),
      (X = function (e) {
        var t = [];
        return (
          (function (e, t, r) {
            O.G.T(e);
            var i = O.V();
            (e = new Uint8Array(4 * (((i + 1) / 2) | 0) + 44)),
              (i = 2 * O.U(new Uint16Array(e.buffer, 44), i));
            var a = new Uint32Array(e.buffer, 0, 44);
            for (
              a[0] = 1179011410,
                a[1] = i + 36,
                a[2] = 1163280727,
                a[3] = 544501094,
                a[4] = 16,
                a[5] = 65537,
                a[6] = 44100,
                a[7] = 88200,
                a[8] = 1048578,
                a[9] = 1635017060,
                a[10] = i,
                i += 44,
                a = 0;
              a < i;
              a += 3
            );
            t && t.decodeAudioData(e.buffer, r);
          })(e, q, function (e) {
            t.push(e);
          }),
          t
        );
      }),
      (N = function (e) {
        if (e[0]) {
          var t = q.createBufferSource();
          (t.context.sampleRate += ~~R(500)),
            (t.buffer = e[0]),
            t.start(0),
            t.connect(L),
            setTimeout(function () {
              t.disconnect(L);
            }, 1e3 * e[0].duration + 300);
        }
      });
  } else X = N = function () {};
  var z = 440 * Math.pow(Math.pow(2, 1 / 12), -9),
    H = /^[0-9.]+$/,
    V = /\s+/,
    Y = /(\d+)/,
    K = {};
  "B#-C C#-Db D D#-Eb E-Fb E#-F F#-Gb G G#-Ab A A#-Bb B-Cb"
    .split(" ")
    .forEach(function (e, t) {
      e.split("-").forEach(function (e) {
        K[e] = t;
      });
    }),
    (u.M = function (e) {
      return (
        (e = e.split(Y)),
        z *
          Math.pow(Math.pow(2, 1 / 12), K[e[0]]) *
          Math.pow(2, (e[1] || 4) - 4)
      );
    }),
    (u.L = function (e) {
      return H.test(e)
        ? parseFloat(e)
        : e
            .toLowerCase()
            .split("")
            .reduce(function (e, t) {
              return (
                e +
                ("w" === t
                  ? 4
                  : "h" === t
                  ? 2
                  : "q" === t
                  ? 1
                  : "e" === t
                  ? 0.5
                  : "s" === t
                  ? 0.25
                  : 0)
              );
            }, 0);
    }),
    (l.prototype.J = function () {
      var e = (this.gain = this.C.createGain());
      [
        ["bass", 100],
        ["mid", 1e3],
        ["treble", 2500],
      ].forEach(
        function (t, r) {
          ((r = this[t[0]] = this.C.createBiquadFilter()).type = "peaking"),
            (r.frequency.value = t[1]),
            e.connect((e = r));
        }.bind(this)
      ),
        e.connect(this.C.destination);
    }),
    (l.prototype.push = function () {
      return (
        Array.prototype.forEach.call(
          arguments,
          function (e) {
            this.B.push(e instanceof u ? e : new u(e));
          }.bind(this)
        ),
        this
      );
    }),
    (l.prototype.createOscillator = function () {
      return (
        this.stop(),
        (this.A = this.C.createOscillator()),
        this.K
          ? this.A.setPeriodicWave(
              this.C.createPeriodicWave.apply(this.C, this.K)
            )
          : (this.A.type = this.W || "square"),
        this.A.connect(this.gain),
        this
      );
    }),
    (l.prototype.R = function (e, t) {
      var r = (60 / this.D) * this.B[e].duration,
        i = r * (1 - (this.F || 0));
      return (
        this.H(this.B[e].frequency, t),
        this.I && this.B[e].frequency && this.S(e, t, i),
        this.H(0, t + i),
        t + r
      );
    }),
    (l.prototype.N = function (e) {
      return this.B[e < this.B.length - 1 ? e + 1 : 0];
    }),
    (l.prototype.O = function (e) {
      return e - Math.min(e, (60 / this.D) * this.I);
    }),
    (l.prototype.S = function (e, t, r) {
      var i = this.N(e);
      this.H(this.B[e].frequency, t + this.O(r)), this.P(i.frequency, t + r);
    }),
    (l.prototype.H = function (e, t) {
      this.A.frequency.setValueAtTime(e, t);
    }),
    (l.prototype.P = function (e, t) {
      this.A.frequency.linearRampToValueAtTime(e, t);
    }),
    (l.prototype.play = function (e) {
      return (
        (e = "number" == typeof e ? e : this.C.currentTime),
        this.createOscillator(),
        this.A.start(e),
        this.B.forEach(
          function (t, r) {
            e = this.R(r, e);
          }.bind(this)
        ),
        this.A.stop(e),
        (this.A.onended = this.loop ? this.play.bind(this, e) : null),
        this
      );
    }),
    (l.prototype.stop = function () {
      return (
        this.A &&
          ((this.A.onended = null), this.A.disconnect(), (this.A = null)),
        this
      );
    });
  var J = [
      8767, 518, 1115, 1039, 1126, 1133, 1149, 7, 1151, 1135, 5123, 1143, 5391,
      57, 4367, 121, 113, 1085, 1142, 4361, 30, 2672, 56, 694, 2230, 63, 1139,
      2111, 3187, 1133, 4353, 62, 8752, 10294, 10880, 4736, 8713, 0, 16, 1088,
      256, 8704,
    ],
    $ = [
      function (e, t, r, i, a, o) {
        v(e, (t += ((i + o) * e.length) / 2), r, i, a, o);
      },
      v,
    ],
    Q = {},
    Z = { preserveDrawingBuffer: !0 },
    ee = c.getContext("webgl", Z) || c.getContext("experimental-webgl", Z),
    te = g.getContext("2d"),
    re = 800,
    ie = 600,
    ae = localStorage,
    oe = [0, 0],
    ne = 0,
    se = 0,
    ce = [0, 0, 0, 0, 0, 0, 0],
    fe = !1,
    ue = !!ae.getItem("agar3sjs13k-gm"),
    le = !1;
  (d.style.webkitTransformOrigin = d.style.transformOrigin = "0 0"),
    (g.width = c.width = re),
    (g.height = c.height = ie),
    (c.style.top = "0px"),
    (c.style.left = "0px"),
    (document.oncontextmenu = function (e) {
      e.preventDefault();
    }),
    ee.viewport(0, 0, re, ie),
    ee.pixelStorei(ee.UNPACK_FLIP_Y_WEBGL, !0);
  var he = ee.createBuffer();
  ee.bindBuffer(ee.ARRAY_BUFFER, he),
    ee.bufferData(
      ee.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      ee.STATIC_DRAW
    );
  var ve = a(
    "precision highp float;uniform vec2 dim;uniform sampler2D tex;varying vec2 uv;uniform float time;uniform vec3 colors;void main(){vec2 a=uv*dim;vec4 b=texture2D(tex,uv);vec4 c=vec4(.0);float d=.02*sin(time)+.3;float e=.03;vec4 f=texture2D(tex,uv+vec2((-15./dim.x)*d,0));for(int g=0;g<9;g++){float h=float(mod(float(g),4.));float i=float(g/3);vec2 j=vec2(a.x+h,a.y+i);vec2 k=vec2(a.x-h,a.y+i);vec2 l=vec2(a.x+h,a.y-i);vec2 m=vec2(a.x-h,a.y-i);c+=texture2D(tex,j/dim)*e;c+=texture2D(tex,k/dim)*e;c+=texture2D(tex,l/dim)*e;c+=texture2D(tex,m/dim)*e;}b+=c;vec4 n=texture2D(tex,uv+vec2((8./dim.x)*d,0));vec4 o=texture2D(tex,uv+vec2((-7.5/dim.x)*d,0));float p=max(1.,sin(uv.y*dim.y*1.2)*2.5)*d;b.r=b.r+n.r*p;b.b=b.b+f.b*p;b.g=b.g+o.g*p;vec2 q=uv*sin(time);float r=fract(sin(dot(q.xy,vec2(12.,78.)))*43758.);vec3 s=vec3(r);b.rgb=mix(b.rgb,s,.015);gl_FragColor.rgba=b;}"
  );
  ee.uniform2f(o(ve, "dim"), re, ie);
  var be = a(
    "precision highp float;uniform vec2 dim;uniform sampler2D tex;varying vec2 uv;uniform float time;uniform vec3 colors;void main(){vec2 a=uv*dim;a-=dim/2.;float b=length(a);if(b<600.){float c=b/600.;a*=mix(1.,smoothstep(0.0,600./b,c),.125);}a+=dim/2.;vec4 d=texture2D(tex,a/dim);float e=distance(uv,vec2(.5,.5));d.rgb*=smoothstep(.8,.2*.8,e);gl_FragColor=d;}"
  );
  ee.uniform2f(o(be, "dim"), re, ie);
  var me = a(
    "precision highp float;uniform vec2 dim;uniform sampler2D tex;varying vec2 uv;uniform float time;uniform vec3 colors;void main(){float a=sin(time);vec4 b=texture2D(tex,uv);vec4 c=texture2D(tex,uv+vec2((-15./dim.x),0));vec4 d=texture2D(tex,uv+vec2((15./dim.x),0));vec4 e=texture2D(tex,uv+vec2((-7.5/dim.x),0));if(colors.r==1.){b.r=b.r+d.r*max(1.,sin(uv.y*dim.y*1.2))*a;}if(colors.g==1.){b.b=b.b+c.b*max(1.,sin(uv.y*dim.y*1.2))*a;}if(colors.b==1.){b.g=b.g+e.g*max(1.,sin(uv.y*dim.y*1.2))*a;}gl_FragColor.rgba=b.rgba;}"
  );
  ee.uniform2f(o(me, "dim"), re, ie);
  var ge = a(
    "precision highp float;uniform vec2 dim;uniform sampler2D tex;varying vec2 uv;uniform float time;uniform vec3 colors;void main(){float a=5.;float b=.5;vec2 c=uv*dim;vec2 d=c+vec2(floor(sin(c.y/a*time+time*time))*b*time,0);d=d/dim;vec4 e=texture2D(tex,d);gl_FragColor.rgba=e.rgba;}"
  );
  ee.uniform2f(o(ge, "dim"), re, ie);
  var de = a(
    "precision highp float;uniform vec2 dim;uniform sampler2D tex;varying vec2 uv;uniform float time;uniform vec3 colors;void main(){float a=.3;float b=.3;float c=10.*time;float d=10.*time;float e=dim.x;float f=dim.y;vec2 g=uv*dim;vec2 h=vec2(max(3.,min(float(e),g.x+sin(g.y/(153.25*a*a)*a+a*c+b*3.)*d)),max(3.,min(float(f),g.y+cos(g.x/(251.57*a*a)*a+a*c+b*2.4)*d)-3.));vec4 i=texture2D(tex,h/dim);gl_FragColor.rgba=i.rgba;}"
  );
  ee.uniform2f(o(de, "dim"), re, ie);
  var pe = a(
    "precision highp float;uniform vec2 dim;uniform sampler2D tex;varying vec2 uv;uniform float time;uniform vec3 colors;void main(){vec4 a=texture2D(tex,uv);if(time==.0){gl_FragColor.rgba=a.bgra;}else{gl_FragColor.rgba=a.rgba;}}"
  );
  ee.uniform2f(o(pe, "dim"), re, ie);
  var xe = a(
    "precision highp float;uniform vec2 dim;uniform sampler2D tex;varying vec2 uv;uniform float time;uniform vec3 colors;void main(){vec2 a=uv*dim;vec2 b=vec2(3.+floor(a.x/time)*time,a.y);vec4 c=texture2D(tex,b/dim);gl_FragColor.rgba=c.rgba;}"
  );
  ee.uniform2f(o(xe, "dim"), re, ie);
  var ye = s(),
    De = s(),
    ke = n(),
    we =
      "#FFF;rgba(40,77,153,0.6);rgba(234,34,37,0.6);rgba(180,0,50,0.3);#F952FF;rgba(0,77,153,0.6);rgb(72,255,206);rgba(0,0,0,0.1);rgba(7,8,12,0.2);rgb(40,145,160);#F66;#69F;#32F;#6FF;#066;#0FF;rgba(235,118,71,0.8);#559;#F6F;#2F2;#000;#973;rgba(0,0,0,0.71);rgb(2,1,2);rgba(255,102,192,0.8);rgba(255,102,102,0.8);rgba(252,233,128,0.8);rgba(150,127,254,0.8);rgba(179,72,108,0.8);rgba(179,88,52,0.8);rgba(128,108,26,0.8);rgba(128,155,15,0.8);rgba(128,131,51,0.8);hsla(324,50%, 60%, 0.88);hsla(360,50%, 60%, 0.88);hsla(10,50%, 60%, 0.88);hsla(20,50%, 60%, 0.88);hsla(30,50%, 60%, 0.88);rgba(7,8,12,0.2)".split(
        ";"
      ),
    Pe = [0, 0, 0];
  (c.onmousedown = function (e) {
    (Pe[2] = 3 == e.which ? 0 : 1),
      (Pe[3] = 3 == e.which ? 1 : 0),
      e.preventDefault();
  }),
    (c.onmouseup = function (e) {
      (Pe[2] = 0), (Pe[3] = 0), e.preventDefault();
    }),
    (c.onmousemove = function (e) {
      0 < ce[6] ||
        ((Pe[0] = (800 * e.offsetX) / c.offsetWidth),
        (Pe[1] = (600 * e.offsetY) / c.offsetHeight));
    });
  var Te = 0,
    Fe = { 65: 1, 87: 2, 68: 4, 83: 8 };
  (document.onkeydown = function (e) {
    var t = e.keyCode || e.which;
    Fe[t] && ((Te |= Fe[t]), e.preventDefault());
  }),
    (document.onkeyup = function (e) {
      var t = e.keyCode ? e.keyCode : e.which;
      Te & Fe[t] && ((Te ^= Fe[t]), e.preventDefault());
    });
  var Ae,
    Ee,
    Re,
    Me,
    Ce = new j();
  (g2e = "G2 e"),
    (c2e = "C2 e"),
    (lead =
      "Bb1 s;D2 s;Bb1 s;D2 s;Bb1 s;D2 s;Bb1 s;D2 s;Bb1 s;D2 s;Bb1 s;D2 s;Bb1 s;D2 s;Bb1 s;D2 s;Ab1 s;D2 s;Ab1 s;D2 s;Ab1 s;D2 s;Ab1 s;D2 s;Ab1 s;D2 s;Ab1 s;D2 s;Ab1 s;D2 s;Ab1 s;D2 s".split(
        ";"
      )),
    (harmony = [
      g2e,
      "G2b e",
      g2e,
      "G2b e",
      g2e,
      "G2b e",
      g2e,
      "G2b e",
      c2e,
      "G2b e",
      c2e,
      "G2b e",
      c2e,
      "G2b e",
      c2e,
      "G2b e",
    ]),
    (bass2 = "- w;D1 s;- s;D1 e;- q;- m;- w".split(";")),
    (bass = basebass = ["C1 e", "- e", "A1 e", "- e"]),
    (Ae = new l(Ce, 138, lead)),
    (Ee = new l(Ce, 138, harmony)),
    (Re = new l(Ce, 138, bass)),
    (Me = new l(Ce, 138, bass2)),
    (Ae.F = 0.81),
    (Ee.F = 0.55),
    (Re.F = 0.05),
    (Re.I = 0.35),
    (Me.F = 0.05),
    (Ae.gain.gain.value = 0.12),
    (Ee.gain.gain.value = 0.09),
    (Re.gain.gain.value = 0.11),
    (Me.gain.gain.value = 0.1);
  var Ie = X([
      3,
      0.2421,
      0.1876,
      0.1891,
      0.2844,
      0.5008,
      ,
      -0.0619,
      0.2484,
      ,
      0.0432,
      -0.7113,
      0.3743,
      0.007,
      8e-4,
      0.0474,
      -0.0023,
      0.705,
      0.7098,
      0.0034,
      0.011,
      0.0259,
      5e-4,
      0.42,
    ]),
    _e = D(
      [
        0,
        ,
        0.12,
        0.14,
        0.3,
        0.8,
        ,
        -0.3399,
        0.04,
        ,
        ,
        -0.04,
        ,
        0.51,
        -0.02,
        ,
        -0.74,
        ,
        0.21,
        0.24,
        ,
        ,
        0.02,
        0.41,
      ],
      6
    ),
    Be = X([
      1,
      ,
      0.38,
      ,
      0.03,
      0.03,
      ,
      0.8799,
      0.96,
      0.9411,
      0.9785,
      -0.9219,
      0.82,
      0.7513,
      0.6049,
      0.8,
      -0.6041,
      -0.8402,
      0.28,
      0.7,
      0.78,
      0.1423,
      -0.7585,
      0.5,
    ]),
    Ge = X([
      3,
      0.0597,
      0.11,
      0.2,
      0.2513,
      0.5277,
      ,
      0.5841,
      -0.0248,
      -0.076,
      0.5312,
      -0.2978,
      0.7065,
      -0.9091,
      0.4202,
      0.966,
      0.7036,
      0.4575,
      1,
      -0.9064,
      0.6618,
      0.0266,
      -0.0655,
      0.42,
    ]),
    Ue = X([
      2,
      ,
      0.09,
      0.06,
      0.45,
      0.27,
      0.02,
      -0.28,
      0.82,
      0.41,
      0.58,
      -0.88,
      0.07,
      0.448,
      -0.355,
      1,
      0.54,
      -0.073,
      1,
      ,
      ,
      ,
      ,
      0.42,
    ]),
    Se = X([
      3,
      0.002,
      0.6302,
      0.499,
      0.0804,
      0.5224,
      ,
      -0.0324,
      4e-4,
      0.5448,
      ,
      -0.7762,
      -0.1765,
      0.6762,
      -0.4386,
      0.7747,
      -0.0347,
      -0.2051,
      0.931,
      -0.0732,
      0.4693,
      0.1444,
      ,
      0.42,
    ]),
    qe = X([
      1,
      0.145,
      0.2094,
      0.4645,
      0.4954,
      0.7134,
      ,
      -0.1659,
      -0.8866,
      0.9733,
      ,
      -0.572,
      -0.7927,
      -0.1186,
      0.4699,
      0.6044,
      0.4604,
      0.1762,
      0.9998,
      0.0236,
      0.1554,
      ,
      0.659,
      0.42,
    ]);
  X([
    1,
    0.0076,
    0.66,
    ,
    ,
    0.09,
    ,
    0.96,
    0.32,
    0.1,
    0.97,
    -1,
    ,
    0.0615,
    -0.1587,
    1,
    ,
    -0.02,
    0.83,
    0.12,
    0.23,
    0.0231,
    -0.02,
    0.96,
  ]);
  var Le,
    Xe,
    Ne,
    Oe,
    je,
    We,
    ze,
    He,
    Ve,
    Ye,
    Ke,
    Je,
    $e,
    Qe,
    Ze,
    et,
    tt,
    rt,
    it,
    at = D(
      [
        3,
        0.0691,
        0.183,
        0.0949,
        0.5678,
        0.46,
        ,
        -1e-4,
        ,
        ,
        ,
        -0.542,
        -0.2106,
        -0.2402,
        -0.1594,
        ,
        -0.3133,
        -0.0707,
        0.1592,
        -0.4479,
        0.5788,
        0.0169,
        -0.919,
        0.42,
      ],
      8
    ),
    ot = X([
      3,
      0.0258,
      0.16,
      0.0251,
      0.16,
      0.05,
      ,
      -0.86,
      -0.4088,
      0.0956,
      0.256,
      -0.62,
      ,
      -6e-4,
      -0.0352,
      ,
      -0.0882,
      -0.0443,
      0.9219,
      -0.0531,
      0.8727,
      0.031,
      2e-4,
      0.6,
    ]),
    nt = X([
      0,
      0.95,
      0.34,
      0.03,
      0.05,
      0.51,
      ,
      0.96,
      0.84,
      0.05,
      0.51,
      -0.84,
      0.99,
      0.82,
      ,
      1,
      ,
      -0.88,
      0.87,
      1,
      0.5,
      0.21,
      0.94,
      0.65,
    ]),
    st = !0,
    ct = 0,
    ft = !1,
    ut = 0;
  k();
  var lt,
    ht = !1,
    vt = "",
    bt = 0,
    mt =
      ";now i see;i am creation;you are destruction;we are going to be;in this battle;forever".split(
        ";"
      ),
    gt = 0,
    pt = !1;
  document.getElementById("f").onclick = function (e) {
    document.fullscreenEnabled
      ? pt
        ? document.exitFullscreen()
        : document.body.requestFullscreen()
      : document.webkitFullscreenEnabled
      ? pt
        ? document.webkitExitFullscreen()
        : document.body.webkitRequestFullscreen()
      : document.mozFullScreenEnabled &&
        (pt
          ? document.mozCancelFullScreen()
          : document.body.mozRequestFullScreen()),
      (pt = !pt),
      e.preventDefault();
  };
  for (
    var xt = [
        [250, 320, 300, !1, 10, "start again", !1, !1, F],
        [
          120,
          460,
          250,
          !1,
          11,
          "twitter",
          !1,
          !1,
          function () {
            window.open(
              "https://twitter.com/home?status=" +
                encodeURIComponent(
                  E() + "http://js13kgames.com/entries/evil-glitch"
                )
            );
          },
        ],
        [
          430,
          460,
          250,
          !1,
          12,
          "facebook",
          !1,
          !1,
          function () {
            window.open(
              "https://www.facebook.com/sharer/sharer.php?u=" +
                encodeURIComponent(
                  "http://js13kgames.com/entries/evil-glitch"
                ) +
                "&description=" +
                encodeURIComponent(E())
            );
          },
        ],
        [240, 380, 320, !0, 13, "fire to start", !1, !1, F],
        [
          280,
          440,
          240,
          !0,
          13,
          "controls",
          !1,
          !1,
          function () {
            N(Ue),
              (ft = !ft),
              (xt[3][3] = !ft),
              (xt[5][3] = !ft && ue),
              (xt[4][5] = ft ? "go back" : "controls");
          },
        ],
        [
          280,
          130,
          240,
          ue,
          16,
          "evil mode",
          !1,
          !1,
          function () {
            (fe = le = !0), (ut = 0.01);
          },
        ],
      ],
      yt = [],
      Dt = [10, 10, 11, 11, 11, 12, 12, 10, 10, 11, 13, 10, 11, 12, 12],
      kt = 0,
      wt = [
        [
          15,
          0,
          0,
          0,
          1,
          [1, 0.25, -1, 0.25],
          [0, -0.75, 0, 0.75],
          0,
          3,
          0.1,
          1.1,
        ],
        [
          15,
          0,
          0,
          1,
          4,
          [1, 0.3, 0, -2, 0, 0.3],
          [0, 1, 0.3, 0, -0.3, -1],
          0,
          3,
          0.05,
          0.8,
        ],
        [
          8,
          0,
          0,
          2,
          2,
          [1, 0.25, -1, 0.25],
          [0, -0.5, 0, 0.5],
          0,
          3.5,
          0.15,
          1.6,
        ],
        [
          20,
          0,
          0,
          3,
          9,
          [
            0, 0.25, 0.75, 0.75, 1, 0.75, 0.75, 0.25, 0, -0.25, -0.75, -0.75,
            -1, -0.75, -0.75, -0.25,
          ],
          [
            -1, -0.75, -0.75, -0.25, 0, 0.25, 0.75, 0.75, 1, 0.75, 0.75, 0.25,
            0, -0.25, -0.75, -0.75,
          ],
          0,
          1,
          0.12,
          1.05,
        ],
        [
          12,
          0,
          0,
          4,
          5,
          [0, 0.25, 1, 0.25, 0, -0.25, -1, -0.25],
          [-1, -0.25, 0, 0.25, 1, 0.25, 0, -0.25],
          0,
          3,
          0.03,
          2.5,
          0,
          0,
          0,
        ],
        [3, 0, 0, 5, 150, [1, -1, -1], [0, 1, -1], 0, 0, 0, 1.4],
        [
          16,
          0,
          0,
          6,
          9,
          [1, 0.25, -1, 0.25],
          [0, -0.75, 0, 0.75],
          0,
          0,
          0,
          0.6,
          3.5,
        ],
        [
          18,
          0,
          0,
          7,
          8,
          [1, 0.25, -1, 0.25],
          [0, 0.75, 0, -0.75],
          0,
          0,
          0,
          0.8,
          2.5,
        ],
        [
          20,
          0,
          0,
          8,
          7,
          [1, 0.25, -1, 0.25],
          [0, 0.75, 0, -0.75],
          0,
          0,
          0,
          1.2,
          1.5,
        ],
        ,
        [
          Xe / 2,
          0,
          0,
          10,
          9,
          [
            [-1, 0, 0],
            [0, 0, 1],
            [-1, 1, 0],
          ],
          [
            [-1.5, -0.5, 0.5],
            [-0.5, 0.5, -1.5],
            [-1.5, -1.5, -0.5],
          ],
          100,
          0,
          7,
        ],
        [
          Xe / 2,
          0,
          0,
          11,
          10,
          [
            [-1, 0, 0, -1],
            [1, 0, 0, 1],
            [-1, 0, 1, 0],
            [-1, 0, 1, 0],
            [-1, 0, 0, -1],
            [1, 0, 0, 1],
          ],
          [
            [-1.25, -0.5, 0.8, 0.25],
            [-1.25, -0.5, 0.8, 0.25],
            [-1.25, -0.5, -1.25, -1.8],
            [0.25, -0.5, 0.25, 0.8],
            [0.25, -0.5, -1.8, -1.25],
            [0.25, -0.5, -1.8, -1.25],
          ],
          100,
          0,
          6,
        ],
        [
          0.8 * Xe,
          0,
          0,
          12,
          15,
          [
            [-0.5, 0, 0.5, 0],
            [-0.5, 0, 0],
            [0.5, 0, 0],
            [-0.5, 0, 0],
            [0.5, 0, 0],
          ],
          [
            [-0.75, -1, -0.75, -0.5],
            [-0.75, -0.5, 0.25],
            [-0.75, -0.5, 0.25],
            [-0.75, -1.75, -0.5],
            [-0.75, -1.75, -0.5],
          ],
          0.9,
          0,
          4,
          0.004,
        ],
        [
          1.2 * Xe,
          0,
          0,
          13,
          50,
          [
            [0, -0.75, 0],
            [0, 0.75, 0],
            [-0.75, 0.75, 0],
            [-0.75, 0.75, 0],
            [-0.35, 0.35, 0],
          ],
          [
            [-1, 0.5, 0],
            [-1, 0.5, 0],
            [0.5, 0.5, 0],
            [-0.5, -0.5, 1],
            [0.25, 0.25, -0.5],
          ],
          0.9,
          0,
          13,
          0.1,
        ],
        [
          2.5 * Xe,
          0,
          0,
          14,
          200,
          [],
          [],
          0.9,
          0,
          60,
          0.003,
          1,
          0,
          [6, 7, 6, 7, 8],
        ],
      ],
      Pt = { 10: 2800, 11: 2600, 12: 60, 13: 200 },
      Tt = 0,
      Ft = [],
      At = 0;
    6 > At;
    At++
  ) {
    var Et = ((At - 3) * Math.PI) / 3 + Math.PI / 6;
    Ft.push(Math.cos(Et), Math.sin(Et));
  }
  var Rt = {};
  for (At = 0; 1e4 > At; At++) Rt[(At / 1e4).toFixed(4)] = B(At / 1e4);
  var Mt,
    Ct = {
      10: function (e) {
        for (var t = 0; 9 > t; t++)
          if (4 != t) {
            var r = e[0] + ((t % 3) - 1) * Xe,
              i = e[1] + (~~(t / 3) - 1) * Xe;
            C(r, i, 0.65, [r, i, 1 == t ? 1 : 0]);
          }
        e[9] = Pt[10];
      },
      11: function (e) {
        for (var t = 0; 12 > t; t++)
          if (4 != t) {
            var r = e[0] + ((t % 3) - 1) * Xe,
              i = e[1] + (~~(t / 3) - 1) * Xe;
            C(r, i, 0.65, [r, i, 1 == t ? 3 : 2]);
          }
        e[9] = Pt[11];
      },
      12: function (e) {
        for (var t = 0; 2 > t; t++) {
          var r = _([e[0], e[1], 5]);
          (r[9] = e[3] + t * Math.PI), He.push(r);
        }
        e[9] = Pt[12];
      },
      13: function (e) {
        for (var t = 0; 6 > t; t++) {
          var r = _([e[0], e[1], 5]);
          (r[9] = e[3] + ((t - 3) * Math.PI) / 3), (r[12] += 0.5), He.push(r);
        }
        e[9] = 45;
      },
      14: function (e) {
        for (var t = 0; 6 > t; t++) {
          var r = _([e[0], e[1], 5]);
          (r[9] = e[3] + ((t - 3) * Math.PI) / 3 + Math.PI / 6),
            (r[12] -= 0.6),
            He.push(r);
        }
        if (
          (0 == e[13] % 16 &&
            (((r = _([e[0], e[1], e[15][e[14] % e[15].length]]))[9] = e[3] / 2),
            He.push(r),
            e[14]++),
          0 == e[13] % 100)
        )
          for (t = 0; 6 > t; t++) I(e, t);
        (e[9] = 70), e[13]++;
      },
    };
  requestAnimationFrame(function a(o) {
    if (
      (Mt || (Mt = o), (dt = Math.min(100, o - Mt) / 1e3), (Mt = o), se++, st)
    )
      30 < ++ct && (ct = 0);
    else if (lt) {
      switch (gt) {
        case 90:
          A("what", 30);
          break;
        case 120:
          A("have", 30);
          break;
        case 150:
          A("you", 30);
          break;
        case 180:
          A("done?", 120);
          break;
        case 185:
          ce = [100, 100, 100, 0, 0, 0, 0];
          break;
        case 215:
          (ce = [100, 100, 100, 100, 100, 100, 100]),
            Ae.stop(),
            Ee.stop(),
            (Ee.D = 1),
            Ee.play(),
            Re.stop(),
            (Re.D = 1),
            Re.play(),
            Me.stop();
          break;
        case 320:
          Ee.stop(), Re.stop(), (Ee.D = 138), (Re.D = 138), (vt = "");
          break;
        case 434:
          Tt = 0;
      }
      435 < gt && 1694 > gt && (vt = mt[~~((gt - 435) / 180)]),
        1694 < gt &&
          ((lt = !1),
          (Ze = 3e5),
          (wave = 7),
          (He = []),
          (Ke = []),
          (fe = !0),
          ae.setItem("agar3sjs13k-gm", "qyui"),
          w()),
        gt++;
    } else if (0 > ce[6]) {
      if (((o = dt), !Ne)) {
        t = o * Ve[4] * (0 < Ve[8] ? We : 1);
        var n = o * Ve[4] * (0 < Ve[8] ? 1.4 : 1);
        je[Math.round(Ve[1] / Xe)] &&
          1 == je[Math.round(Ve[1] / Xe)][Math.round(Ve[0] / Xe)] &&
          (n -= 0.5),
          Te & Fe[65] &&
            ((Ve[0] -= n),
            Ve[0] < Ve[2] && (Ve[0] = Ve[2]),
            Ve[0] > ze[2] && Ve[0] < Oe - ze[2] && (ze[0] += n),
            32 < ze[0] && (ze[0] = 32)),
          Te & Fe[87] &&
            ((Ve[1] -= n),
            Ve[1] < Ve[2] && (Ve[1] = Ve[2]),
            Ve[1] > ze[3] && Ve[1] < Oe - ze[3] && (ze[1] += n),
            27 < ze[1] && (ze[1] = 27)),
          Te & Fe[83] &&
            ((Ve[1] += n),
            Ve[1] > Oe - Ve[2] && (Ve[1] = Oe - Ve[2]),
            Ve[1] > ze[3] && Ve[1] < Oe - ze[3] && (ze[1] -= n),
            -272 > ze[1] && (ze[1] = -272)),
          Te & Fe[68] &&
            ((Ve[0] += n),
            Ve[0] > Oe - Ve[2] && (Ve[0] = Oe - Ve[2]),
            Ve[0] > ze[2] && Ve[0] < Oe - ze[2] && (ze[0] -= n),
            -67 > ze[0] && (ze[0] = -67)),
          (Ve[3] = r([Ve[0] + ze[0], Ve[1] + ze[1]], Pe)),
          (Ve[5] += 25 * t * (8 * Pe[2] + 1)),
          (Ve[5] %= 360),
          p(Ve) &&
            (N(qe),
            S(Ve[0], Ve[1], Ve[2], 10, 80, 6),
            (Ye = [[], []]),
            (Ne = !0),
            Ae.stop(),
            Ee.stop(),
            Re.stop(),
            Me.stop(),
            (xt[0][3] = !0),
            (t = 30 * dt),
            (it = Ze > record) &&
              ((record = Ze),
              ae.setItem("agar3sjs13k-record", Ze),
              (xt[1][3] = !0),
              (xt[2][3] = !0)),
            (se = 0)),
          Pe[2] && 0 >= Ve[6] && 0 >= Ve[8]
            ? (Ke.push([
                Ve[0] + G(1, 2 + Ve[7] / 30),
                Ve[1] + G(1, 2 + Ve[7] / 30),
                2,
                Ve[3] + G(1, 0.05 + 0.001 * Ve[7]),
              ]),
              N(_e[~~R(_e.length)]),
              (Ve[6] = 1 / Ve[7]))
            : (Ve[6] -= o),
          Pe[3] && 0 >= Ve[8] && 0 >= Ve[9]
            ? (N(Ue), (Ve[8] = 0.55), (Ve[9] = 1.2))
            : ((Ve[8] -= o), (Ve[9] -= o));
      }
      for (o = Ke.length - 1; 0 <= o; o--) {
        ((n = Ke[o])[0] += Math.cos(n[3]) * t * n[2]),
          (n[1] += Math.sin(n[3]) * t * n[2]),
          (-20 > n[0] || n[0] > Oe + 20 || -20 > n[1] || n[1] > Oe + 20) &&
            Ke.splice(o, 1),
          (s = p(n)) &&
            (0 < --s[6] && S(n[0], n[1], -n[3], 2, 10, 9),
            Ke.splice(o, 1),
            (s[4] = 200),
            9 < s[5] && N(at[~~R(at.length)]));
      }
      for (o = 0; o < Je.length; o++)
        ((n = Je[o])[0] += Math.cos(n[2]) * R(3, 2)),
          (n[1] += Math.sin(n[2]) * R(3, 2)),
          0 > --n[3] && Je.splice(o, 1);
      for (0 < Tt && (Tt -= 0.1), Q = {}, o = He.length - 1; 0 <= o; o--)
        e: if (((n = He[o]), (s = o), 0 >= n[6])) {
          if ((He.splice(s, 1), 5 != n[5]))
            if (
              (14 == n[5] && (lt = !0),
              S(n[0], n[1], n[2], wt[n[5]][0], 2 * wt[n[5]][0], n[5] + 24),
              9 < n[5])
            ) {
              for (
                var s = n[0],
                  c = n[1],
                  f = ((n = n[10]), ~~(s / Xe)),
                  u = ~~(c / Xe),
                  l = Math.ceil(n / Xe),
                  h = u - l;
                h < u + l;
                h++
              )
                if (void 0 !== je[h])
                  for (var v = f - l; v < f + l; v++)
                    (1 == je[h][v] ||
                      i((h + 0.5) * Xe - c, (v + 0.5) * Xe - s) <= n) &&
                      (je[h][v] = 0);
              (Tt = 4), N(Se);
            } else N(Ge);
        } else {
          if ((0 < n[4] && (n[4] -= 50), 10 > n[5])) {
            if (
              (0 < n[10] * (n[9] - n[3]) &&
                ((n[3] =
                  2 == n[5]
                    ? r(n, tt || [0, 0])
                    : 4 == n[5]
                    ? n[3] + (n[9] + n[11])
                    : r(n, Ve)),
                (n[10] = n[3] > n[9] ? n[11] : -n[11])),
              (c = p(n)),
              (n[9] =
                4 == n[5]
                  ? n[9] + n[10] * t
                  : 3 != n[5] || (c && 3 == c[5])
                  ? n[9] + (c ? -1 : 1) * n[10]
                  : n[9] + n[10]),
              5 == n[5] && (n[6] -= t / 10),
              5 < n[5] && 10 > n[5] && ((n[13] -= dt), 0 > n[13]))
            ) {
              C(
                (n = [
                  (0.5 + ~~(n[0] / Xe)) * Xe,
                  (0.5 + ~~(n[1] / Xe)) * Xe,
                  n[5] + 4,
                ])[0],
                n[1],
                1,
                n
              ),
                He.splice(s, 1);
              break e;
            }
            4 != n[5]
              ? ((n[0] += Math.cos(n[9]) * t * n[12]),
                (n[1] += Math.sin(n[9]) * t * n[12]))
              : (1 > n[13][6] && (n[10] *= 0.99),
                (n[15] = 2 * Xe * (1.2 - Math.cos(n[16]))),
                (n[16] += t / 200),
                (n[0] = n[13][0] + Math.cos(n[9]) * n[15]),
                (n[1] = n[13][1] + Math.sin(n[9]) * n[15]));
          } else
            for (
              n[9] -= t,
                12 <= n[5] && (n[3] += n[12] * t),
                0 > n[9] && !Ne && Ct[n[5]](n),
                n[10] += dt * n[11],
                s = n[0],
                c = n[1],
                f = n[10],
                u = ~~(s / Xe),
                v = (l = ~~(c / Xe)) - (h = Math.ceil(f / Xe));
              v < l + h;
              v++
            )
              if (void 0 !== je[v])
                for (var d = u - h; d < u + h; d++)
                  1 == je[v][d] ||
                    i((v + 0.5) * Xe - c, (d + 0.5) * Xe - s) >= f ||
                    (je[v][d] = 1);
          (s = m(n)), (Q[s] = Q[s] || []), Q[s].push(n);
        }
      if (0 < rt.length && Ze > rt[0])
        switch (((o = et[rt.splice(0, 1)[0]]), o.splice(0, 1)[0])) {
          case 0:
            (o[0] = (o[0] + 0.5) * Xe),
              (o[1] = (o[1] + 0.5) * Xe),
              C(o[0], o[1], 1, o);
            break;
          case 1:
            o[0].play();
            break;
          case 2:
            ce = o;
            break;
          case 3:
            N(o[0]);
            break;
          case 4:
            (o[0].D = o[1]), 138 == o[1] && (o[0].stop(), o[0].play());
            break;
          case 5:
            $e = o[0];
            break;
          case 6:
            A(o[0]);
            break;
          case 7:
            o[0].stop();
            break;
          case 8:
            wave = o[0];
        }
      else
        0 == rt.length &&
          (kt++ >= Dt.length && (kt = 0),
          (et[Ze + 5e3] = [0, ~~R(21), ~~R(21), Dt[kt]]),
          rt.push(Ze + 5e3));
      for (o = 0; o < yt.length; o++)
        ((n = yt[o])[2] -= dt),
          0 > n[2] &&
            (He.push(_(n[4])),
            9 < n[4][2] && ((ne = 10), N(Be)),
            3 == n[4][2] && (tt = He[He.length - 1]),
            yt.splice(o, 1));
    }
    if (st || Ne)
      switch (se) {
        case 240:
        case 280:
        case 500:
          M(), N(ot);
          break;
        case 700:
          se = 0;
      }
    for (o = 0; o < xt.length; o++)
      !(n = xt[o])[3] ||
      Pe[0] < n[0] ||
      Pe[0] > n[0] + n[2] ||
      Pe[1] < n[1] ||
      Pe[1] > n[1] + 42
        ? (n[6] = n[7] = !1)
        : ((n[7] = !0),
          1 == Pe[2]
            ? (n[6] = !0)
            : 0 == Pe[2] && n[6] && ((n[6] = !1), n[8]()));
    if ((te.save(), st)) {
      for (
        te.save(),
          te.beginPath(),
          x(23, 1),
          te.fillRect(0, 0, 800, 600),
          x(0),
          te.beginPath(),
          o = 0;
        10 > o;
        o++
      )
        (n = e(30 * o + ct)), x(1), P(0, n + 0.5, 800, void 0, 0);
      for (te.stroke(), te.beginPath(), o = 0; 10 > o; o++)
        (n = e(30 * o + ct)), x(2), P(0, 600 - n - 0.5, 800, void 0, 0);
      for (
        te.stroke(),
          x(2),
          te.beginPath(),
          P(0, 240, 800, void 0, 0),
          P(400, 240, -240, !0, 0),
          te.stroke(),
          x(1),
          te.beginPath(),
          P(0, 360, 800, void 0, 0),
          P(400, 360, 240, !0, 0),
          te.stroke(),
          te.beginPath(),
          o = 1;
        o < 800 / 60;
        o++
      )
        (n = o * o * 5 + 25),
          x(2),
          P(30 * o + 400, 240, -240, !0, n),
          P(30 * -o + 400, 240, -240, !0, -n);
      for (te.stroke(), te.beginPath(), o = 1; o < 800 / 60; o++)
        (n = o * o * 5 + 25),
          x(1),
          P(30 * o + 400, 360, 240, !0, n),
          P(30 * -o + 400, 360, 240, !0, -n);
      te.stroke(),
        ft
          ? (b("controls", 400, 130, 12, [0, 16]),
            b("move             awsd", 400, 251, 12, [0, 0]),
            b("fire       left click", 400, 290, 12, [0, 0]),
            b("warptime  right click", 400, 330, 12, [0, 0]))
          : (b("winners don't use drugs", 401, 50, 9, [0, 0]),
            b("evil glitch", 400, 270 - 50 * ut, 30 * (1 + ut), [0, 9, 0, 9])),
        b("made by agar3s", 401, 520, 9, [0, 10]),
        te.closePath(),
        te.fill(),
        te.stroke(),
        te.restore();
    } else if (!ht) {
      for (
        x(7, 1),
          te.fillRect(0, 0, 800, 600),
          x(
            -1,
            1,
            "rgba(" +
              ~~R(180, 0) +
              "," +
              ~~R(185, 0) +
              "," +
              ~~R(185, 0) +
              "," +
              R(0, 1) +
              ")"
          ),
          o = 0;
        6 > o;
        o++
      )
        te.fillRect(~~R(800), ~~R(600), 2, 2);
      for (
        te.save(),
          te.beginPath(),
          oe = Ne
            ? [0, 0]
            : [G(Pe[2] || 0 < Tt, Tt + 2), G(Pe[2] || 0 < Tt, Tt + 2)],
          x(-1, 1, "rgba(7,8,12," + (0.2 - (0 < Ve[8] ? 0.1 : 0)) + ")"),
          te.translate(ze[0] + oe[0], ze[1] + oe[1]),
          te.fillRect(0, 0, Oe, Oe),
          x(1),
          te.beginPath(),
          o = 0;
        o <= Le;
        o++
      )
        T(o * Xe - 0.5, Oe);
      for (te.stroke(), te.beginPath(), x(5), o = 0; o <= Le; o++)
        T(o * Xe + 0.5, Oe);
      for (
        te.stroke(),
          te.restore(),
          te.save(),
          te.beginPath(),
          x(8, 1),
          x(2),
          n = 0;
        n < Le;
        n++
      )
        for (o = 0; o < Le; o++)
          0 != je[n][o] &&
            (te.fillRect(
              o * Xe + ze[0] + oe[0],
              n * Xe + ze[1] + oe[1],
              Xe,
              Xe
            ),
            te.strokeRect(
              o * Xe + ze[0] + oe[0] - 0.5,
              n * Xe + ze[1] + oe[1] - 0.5,
              Xe + 2,
              Xe + 2
            ));
      for (te.stroke(), te.beginPath(), x(2), n = 0; n < Le; n++)
        for (o = 0; o < Le; o++)
          0 != je[n][o] &&
            te.strokeRect(
              o * Xe + ze[0] + oe[0] + 0.5,
              n * Xe + ze[1] + oe[1] + 0.5,
              Xe,
              Xe
            );
      for (
        te.fill(),
          te.closePath(),
          te.restore(),
          te.save(),
          te.beginPath(),
          o = 0;
        o < yt.length;
        o++
      )
        (c = (f = yt[o])[4][2]),
          (n = wt[c][0]),
          (s = f[2]),
          (s = 1 * (s /= f[3]) * (s - 2) + 1),
          (u = f[0] + ze[0] + oe[0]),
          (f = f[1] + ze[1] + oe[1]),
          14 == c
            ? ((c = u),
              te.translate(c, f),
              te.beginPath(),
              x(-1, 1, "rgba(210,0,0,0.9)"),
              te.arc(0, 0, Oe * (1 - s), 0, 2 * Math.PI),
              te.stroke(),
              te.fill(),
              te.beginPath(),
              x(0),
              0.3 > s
                ? (te.moveTo((-n * s) / 0.3, 0), te.lineTo((n * s) / 0.3, 0))
                : (x(0, 1),
                  te.bezierCurveTo(-n, 0, 0, (-n * s) / 3.5, n, 0),
                  te.bezierCurveTo(n, 0, 0, (n * s) / 3.5, -n, 0),
                  te.fill()),
              te.closePath(),
              te.translate(-c, -f))
            : (x(-1, 0, "rgba(38,82,255," + s + ")"),
              te.fillRect(u - s * n, f - s * n, s * n * 2, s * n * 2));
      for (
        te.closePath(),
          te.fill(),
          te.stroke(),
          te.restore(),
          te.save(),
          te.translate(Ve[0] + ze[0], Ve[1] + ze[1]),
          te.rotate(Ve[3] + Math.PI / 2),
          x(-1, 2, 2),
          x(6),
          te.beginPath(),
          U(Ye[0], Ye[1], Ve[2]),
          te.closePath(),
          te.stroke(),
          te.restore(),
          te.save(),
          o = 0;
        o < He.length;
        o++
      )
        if (
          !(
            20 > (c = He[o])[0] + ze[0] ||
            c[0] + ze[0] > re - 20 ||
            20 > c[1] + ze[1] ||
            c[1] + ze[1] > ie - 20
          )
        ) {
          if (
            ((n = c[0] + ze[0] + oe[0] + ((0.5 < R() ? 1 : -1) * c[4]) / 40),
            (s =
              c[1] +
              ze[1] +
              oe[1] +
              ((0.5 < R() ? 1 : -1) * c[4]) / 40 -
              (9 < c[5] ? 5 * Math.sin((se / 50) % (2 * Math.PI)) + 5 : 0)),
            te.translate(n, s),
            te.beginPath(),
            10 > c[5])
          )
            x(c[5] + 24),
              x(-1, 2, 2),
              te.rotate(c[9]),
              U(c[7], c[8], c[2]),
              te.rotate(-c[9]);
          else if (14 == c[5]) {
            for (
              f = "hsla(" + 20 * c[3] + ",50%,60%, 0.5)",
                x(-1, 2, 2),
                te.beginPath(),
                x(-1, 0, 0 < c[4] ? we[3] : f),
                f = c[2] / 3.5,
                te.arc(0, 0, f / 2, 0, 2 * Math.PI, !1),
                te.stroke(),
                te.beginPath(),
                te.bezierCurveTo(-f, 0, 0, -f, f, 0),
                te.bezierCurveTo(f, 0, 0, f, -f, 0),
                te.stroke(),
                te.rotate(c[3]),
                u = 0;
              6 > u;
              u++
            )
              (l = Ft[2 * u]),
                (h = Ft[2 * u + 1]),
                te.beginPath(),
                te.arc(4 * l * f, 4 * h * f, f, 0, 2 * Math.PI, !1),
                te.stroke(),
                te.beginPath(),
                te.arc(2 * l * f, 2 * h * f, f, 0, 2 * Math.PI, !1),
                te.stroke(),
                te.beginPath(),
                te.moveTo(l * f * 4, h * f * 4),
                te.lineTo(
                  4 * f * Ft[(2 * u + 2) % 12],
                  4 * f * Ft[(2 * u + 3) % 12]
                ),
                te.lineTo(
                  4 * f * Ft[(2 * u + 6) % 12],
                  4 * f * Ft[(2 * u + 7) % 12]
                ),
                te.moveTo(l * f * 2, h * f * 2),
                te.lineTo(
                  2 * f * Ft[(2 * u + 2) % 12],
                  2 * f * Ft[(2 * u + 3) % 12]
                ),
                te.lineTo(
                  2 * f * Ft[(2 * u + 6) % 12],
                  2 * f * Ft[(2 * u + 7) % 12]
                ),
                te.stroke();
            te.beginPath(), te.rotate(-c[3]);
          } else
            for (
              x(-1, 2, 2),
                f = (Pt[c[5]] - c[9]) / Pt[c[5]],
                f = 0 < c[4] ? -55 : ~~(200 * f) * Rt[f.toFixed(4)],
                x(16),
                u = 0;
              u < c[7].length;
              u++
            )
              (l = c[7][u]),
                (h = c[8][u]),
                (v = c[2]),
                (d = [
                  80 + c[4],
                  55 + f,
                  130 + ~~(f / 2),
                  0 < c[4] ? 0.9 : 0.2,
                ]),
                te.beginPath(),
                x(-1, 1, "rgba(" + d + ")"),
                U(l, h, v),
                te.closePath(),
                te.fill(),
                te.stroke();
          te.closePath(), te.stroke(), te.translate(-n, -s);
        }
      for (
        te.closePath(), te.restore(), te.save(), x(9, 1), o = 0;
        o < Ke.length;
        o++
      )
        20 > (n = Ke[o])[0] + ze[0] ||
          n[0] + ze[0] > re - 20 ||
          20 > n[1] + ze[1] ||
          n[1] + ze[1] > ie - 20 ||
          (te.beginPath(),
          te.arc(n[0] + ze[0], n[1] + ze[1], n[2], 0, 2 * Math.PI, !1),
          te.closePath(),
          te.fill());
      for (te.restore(), te.save(), o = 0; o < Je.length; o++)
        5 > (n = Je[o])[0] + ze[0] ||
          n[0] + ze[0] > re - 5 ||
          5 > n[1] + ze[1] ||
          n[1] + ze[1] > ie - 5 ||
          (te.beginPath(),
          x(n[4], 1),
          te.arc(
            n[0] + ze[0] + oe[0],
            n[1] + ze[1] + oe[1],
            2,
            0,
            2 * Math.PI,
            !1
          ),
          te.closePath(),
          te.fill());
      te.restore(),
        te.save(),
        b($e, 401, 501, 14, [26, 21, 21]),
        Ne
          ? (x(22, 1),
            te.fillRect(0, 0, Oe, Oe),
            fe && b("evil mode", 400, 80, 22, [0, 16]),
            it
              ? (b("-new record-", 400, 240, 22, [10, 18]),
                b("-share it-", 400, 400, 14, [24, 18]))
              : b("game over", 400, 240, 20, [0, 13]),
            b(Ze.toFixed(0), 400, 160, it ? 20 : 16, [0, 9]))
          : (b(6 < wave ? "evil" : wave + "/6", 400, 60, 9, [0, 3]),
            b(Ze.toFixed(0), 750, 60, 18, [32, 9], 1),
            b(
              Ze > record ? "record" : record.toFixed(0),
              750,
              110,
              9,
              [24, 3],
              1
            )),
        te.restore();
    }
    for (
      ht ||
        lt ||
        (te.save(),
        te.beginPath(),
        x(-1, 2, 2),
        te.translate(Pe[0], Pe[1]),
        x(6),
        te.translate(-10, -10),
        T(10, 20),
        te.stroke(),
        te.closePath(),
        te.restore()),
        te.save(),
        o = 0;
      o < xt.length;
      o++
    )
      (n = xt[o])[3] &&
        (x((s = n[7] ? 14 : n[4])),
        x(-1, 2, 2),
        te.strokeRect(n[0], n[1], n[2], 42),
        b(n[5], n[0] + n[2] / 2, n[1] + 9, 12, [0, s]));
    for (
      te.restore(),
        ht
          ? (te.save(),
            te.beginPath(),
            x(2, 1),
            te.fillRect(0, 0, 800, 600),
            b(
              vt,
              430,
              180,
              5 > vt.length ? 120 : 70,
              [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
            ),
            te.closePath(),
            te.fill(),
            te.restore())
          : !lt ||
            300 > gt ||
            ((o = [0, 0, 0, 0]),
            te.save(),
            te.beginPath(),
            436 > gt
              ? (x(-1, 1, "rgba(0,0,0," + (1 - (436 - gt) / 120) + ")"),
                te.fillRect(0, 0, 800, 600))
              : (x(23, 1), te.fillRect(0, 0, 800, 600), b(vt, 400, 250, 16, o)),
            te.closePath(),
            te.fill(),
            te.restore()),
        0 < ut && 0.51 == (ut += 0.05) && N(Ie),
        1 < ut && ((st = !1), (ut = 0), k()),
        0 < ut &&
          1 > ut &&
          (x(-1, 1, "rgba(220,220,220," + ut + ")"),
          te.fillRect(0, 0, 800, 600)),
        (ht = 0 < bt) && --bt,
        te.restore(),
        o = g,
        ee.bindTexture(ee.TEXTURE_2D, ke),
        ee.texImage2D(ee.TEXTURE_2D, 0, ee.RGBA, ee.RGBA, ee.UNSIGNED_BYTE, o),
        ne--,
        o = 0;
      o < ce.length;
      o++
    )
      ce[o]--;
    y(ye, ke, me, (se / 60) % 180, [
      0 < ne + 1 || 0 < ce[0] ? 1 : 0,
      0 < ne + 2 || 0 < ce[1] ? 1 : 0,
      0 < ne || 0 < ce[2] ? 1 : 0,
    ]),
      y(De, ye[1], ge, 0 < ne || 0 < ce[3] ? 15 : 0),
      y(ye, De[1], de, 0 < ne + 1 || 0 < ce[4] ? 1 : 0),
      y(De, ye[1], pe, 0 < ce[7] && 0 == se % 3 ? 0 : 1),
      y(ye, De[1], xe, 0 < ne || 0 < ce[5] ? 9 : 1),
      y(De, ye[1], ve, se),
      y(ye, De[1], be),
      ee.bindFramebuffer(ee.FRAMEBUFFER, null),
      ee.drawArrays(ee.TRIANGLES, 0, 6),
      ee.flush(),
      Ne || st || (Ze += 1e3 * dt * (0 < Ve[8] ? We : 1)),
      requestAnimationFrame(a);
  });
})();
