(function () {
  try {
    (function () {
      function cf(a, c, b, d) {
        var e = this;
        return E(window, "c.i", function () {
          function f(u) {
            (u = df(k, l, "", u)(k, l)) && (T(u.then) ? u.then(g) : g(u));
            return u;
          }
          function g(u) {
            u &&
              (T(u)
                ? m.push(u)
                : va(u) &&
                  y(function (D) {
                    var O = D[0];
                    D = D[1];
                    T(D) && ("u" === O ? m.push(D) : h(D, O));
                  }, La(u)));
          }
          function h(u, D, O) {
            e[D] = $l(k, l, O || p, D, u);
          }
          var k = window;
          (!k || (isNaN(a) && !a)) && be();
          var l = am(a, ef, c, b, d),
            m = [],
            p = [lh, df, mh];
          p.unshift(bm);
          var q = A(P, eb),
            r = M(l);
          l.id || Wa(Fc("Invalid Metrika id: " + l.id, !0));
          var t = ed.C("counters", {});
          if (t[r])
            return vb(k, r, "Duplicate counter " + r + " initialization"), t[r];
          t[r] = e;
          ed.D("counters", t);
          ed.Na("counter", e);
          y(function (u) {
            u(k, l);
          }, ce);
          y(f, fd);
          f(cm);
          h(dm(k, l, m), "destruct", [lh, mh]);
          Ob(k, C([k, q, f, 1, "a.i"], nh));
          y(f, W);
        })();
      }
      function em(a, c) {
        var b = "" + c,
          d = { id: 1, ba: "0" },
          e = fm(b);
        e
          ? (d.id = e)
          : -1 === b.indexOf(":")
          ? ((b = Da(b)), (d.id = b))
          : ((b = b.split(":")),
            (e = b[1]),
            (d.id = Da(b[0])),
            (d.ba = de(e) ? "1" : "0"));
        return [Ea(a, d), d];
      }
      function gm(a, c) {
        if ("*" === c) return !0;
        var b = Q(a);
        return c === b.host + b.pathname;
      }
      function hm(a, c) {
        var b = n(c, "target");
        b && a(b);
      }
      function im(a, c, b) {
        var d = n(b, "submitter");
        d || ((b = n(b, "target")) && (d = ee(a, b)));
        d && c(d);
      }
      function jm(a, c, b, d) {
        var e = fe(a, d);
        e &&
          y(function (f) {
            var g,
              h = null;
            try {
              var k = n(f, "css_selector"),
                l = Yb(k, a.document);
              h = oh(l);
            } catch (r) {}
            k = null;
            try {
              var m = n(f, "xpath"),
                p = km(m);
              var q = p
                ? n(a, "document.evaluate")
                  ? a.document.evaluate(
                      p,
                      a.document,
                      null,
                      a.XPathResult.FIRST_ORDERED_NODE_TYPE,
                      null
                    ).singleNodeValue
                  : null
                : null;
              k = oh(q);
            } catch (r) {}
            f = ((g = {}), (g.s = [k, h]), (g.b = e), g);
            c(f);
          }, b);
      }
      function oh(a) {
        return (a = Hb(a)) ? gd(ge(a)) : null;
      }
      function km(a) {
        if (!a) return "";
        a = a.match(lm);
        if (!a || 0 === a.length) return "";
        var c = mm();
        return (
          "//HTML/BODY/" +
          K(
            function (b, d) {
              var e = d[0],
                f = Da(d.slice(1));
              return "/" + c[e] + (f ? "[" + (f + 1) + "]" : "") + b;
            },
            "",
            a
          )
        );
      }
      function nm(a) {
        var c = n(a, "featurePolicy");
        return c
          ? "browsingTopics" in a && c.allowsFeature("browsing-topics")
          : !1;
      }
      function om(a, c, b, d) {
        var e = n(d, "data");
        if (ja(e)) {
          var f = e.split("*");
          e = f[0];
          var g = f[1];
          f = f[2];
          "sc.topics-response" === e
            ? (g &&
                ("1" === g && f
                  ? ((a = wb(a, f)), da(a) && c.D("cta", a))
                  : c.D("cta.e", g)),
              b())
            : "sc.frame" === e &&
              d.source &&
              d.source.postMessage("sc.topics", "*");
        }
      }
      function pm(a, c) {
        var b;
        if (
          "https://oauth.yandex.ru" === n(c, "origin") &&
          n(c, "source.window") &&
          "_ym_uid_request" === n(c.data, "_ym")
        ) {
          var d = c.source,
            e = ((b = {}), (b._ym_uid = a), b);
          d.postMessage(e, "https://oauth.yandex.ru");
        }
      }
      function ph(a, c) {
        void 0 === c && (c = !0);
        var b = Yb("canvas", a.document);
        if (b && (b = Gc(b))) {
          var d = he(a) || Hc(a),
            e = d[0];
          d = d[1];
          if (0.3 <= qh(a, b, { h: d, w: e }) / (d * e)) {
            H(a).D("hc", 1);
            return;
          }
        }
        c && R(a, C([a, !1], ph), 3e3);
      }
      function rh(a) {
        return {
          N: function (c, b) {
            qm(a).then(function (d) {
              c.J || (c.J = {});
              c.J.uah = d;
              b();
            }, b);
          },
        };
      }
      function rm(a) {
        var c = K(
          function (b, d) {
            var e = d[1],
              f = sm(a[d[0]]);
            f && b.push("" + e + "\n" + f);
            return b;
          },
          [],
          La(tm)
        );
        return I("\n", c);
      }
      function um(a) {
        return "che\n" + a;
      }
      function sm(a) {
        return ja(a)
          ? a
          : da(a)
          ? I(
              ",",
              A(function (c) {
                return '"' + c.brand + '";v="' + c.version + '"';
              }, a)
            )
          : ka(a)
          ? ""
          : a
          ? "?1"
          : "?0";
      }
      function ff(a) {
        var c = vm(a);
        return {
          N: function (b, d) {
            b.ha || (b.ha = {});
            b.ha.Mh = c(sh);
            d();
          },
          ra: function (b, d) {
            var e = b.Fi;
            V(e) || c(wm(e));
            d();
          },
        };
      }
      function sh(a) {
        var c = a.Je,
          b = a.Lh;
        y(function (f, g) {
          1 < b[g] && (a.od = g);
        }, c);
        var d = a.od,
          e = c.slice().splice(d - 1, 1);
        e.unshift(c[d]);
        return e;
      }
      function xm(a, c) {
        c.cookie.D(
          "hostIndex",
          I(
            ",",
            A(function (b, d) {
              return I("-", [d, b]);
            }, a)
          ),
          1440
        );
      }
      function th(a, c) {
        var b = a.C("hostIndex");
        return b
          ? A(function (d) {
              return Da(d.split("-")[1]);
            }, b.split(","))
          : A(v(0, P), c);
      }
      function zm(a, c) {
        var b = Am(a),
          d = [Bm(a) || Cm(a)];
        Dm(a) && d.push(b);
        d.unshift("mc.webvisor.org");
        var e = fa(a);
        b = Oa(a);
        var f = b.C("synced", {});
        d = la(function (g) {
          if (c[g]) {
            var h = (f[g] || 1) + 1440 < e(lb);
            h && delete f[g];
            return h;
          }
        }, d);
        b.D("synced", f);
        return A(function (g) {
          return { Pi: c[g], ai: g };
        }, d);
      }
      function Cm(a) {
        a = Em(a);
        return Fm[a] || a;
      }
      function Am(a) {
        a = uh(a);
        return Gm[a] || "ru";
      }
      function Hm(a, c, b, d) {
        var e = b.K;
        if (c.hj || de(c.ba) || !e) d();
        else {
          var f = ie(a),
            g = Ic(a, ""),
            h = function () {
              var t = vh(f);
              t = "" + t + Im(t, g);
              je(b, "gdpr", t);
              d();
            };
          if (3 === c.id) h();
          else {
            var k = H(a);
            if ((e = k.C("f1"))) e(h);
            else {
              var l = (e = vh(f)) ? A(v(ke, n), e.split(",")) : [];
              if (wh(l)) h();
              else {
                e = le(a);
                var m = Q(a);
                var p = /(^|\w+\.)yango(\.yandex)?\.com$/.test(m.hostname)
                  ? {
                      url: "https://yastatic.net/s3/taxi-front/yango-gdpr-popup/",
                      version: 2,
                      sf: Jm,
                      Af: "_inversed_buttons",
                    }
                  : void 0;
                var q =
                  (e = e || !!p) &&
                  (Za(m.href, "yagdprcheck=1") || g.C("yaGdprCheck"));
                m = g.C("gdpr");
                var r = J.resolve();
                g.C("yandex_login")
                  ? (l.push("13"), g.D("gdpr", Jc, 525600))
                  : e
                  ? L(m, Zb)
                    ? m === gf
                      ? l.push("12")
                      : l.push("3")
                    : hf(a) || Km(a)
                    ? l.push("17")
                    : (r = Lm(a).then(function (t) {
                        t && l.push("28");
                      }, F))
                  : l.push("14");
                r.then(function () {
                  var t = v(f, Mm);
                  wh(l)
                    ? (y(t, l), h())
                    : (me.push(h),
                      k.D("f1", function (u, D) {
                        var O = 0;
                        if (D) {
                          var N = mb(a, D) || "";
                          O += N.length;
                        }
                        me.push(u);
                        1e6 >= O && me.push(u);
                      }),
                      (0, jf[0])(a)
                        .then(U("params.eu"))
                        .then(function (u) {
                          if (u || q) {
                            g.D("gdpr_popup", gf);
                            Nm(a, c);
                            if (fb(a)) return Om(a, t, c);
                            var D = xh(a, f);
                            if (D)
                              return (
                                (u = Pm(a, t, D, c, p)),
                                u.then(C([a, c], Qm)),
                                u
                              );
                          }
                          u || t("8");
                          return J.resolve({ value: Jc, Nd: !0 });
                        })
                        .then(function (u) {
                          g.Eb("gdpr_popup");
                          if (u) {
                            var D = u.value;
                            u = u.Nd;
                            L(D, Zb) && g.D("gdpr", D, u ? void 0 : 525600);
                          }
                          D = $b(me, ha);
                          hd(a, D, 20)(Pa(E(a, "gdr"), F));
                          k.D("f1", ha);
                        })
                        ["catch"](E(a, "gdp.a")));
                });
              }
            }
          }
        }
      }
      function Qm(a, c) {
        if (le(a)) {
          var b = ie(a),
            d = Ea(a, c);
          d = d && d.params;
          b = A(v(Rm, n), kf(b));
          d && b.length && d("gdpr", ta(b));
        }
      }
      function Om(a, c, b) {
        var d = ne(a, b);
        return new J(function (e) {
          var f;
          if (d) {
            var g = d.$,
              h = w(v("4", c), v(null, e)),
              k = R(a, h, 2e3, "gdp.f.t");
            d.Uf(((f = {}), (f.type = "isYandex"), f))
              .then(function (l) {
                l.isYandex
                  ? (c("5"),
                    g.F(
                      ["GDPR-ok-view-default", "GDPR-ok-view-detailed"].concat(
                        lf
                      ),
                      function (m) {
                        e({ value: yh(m[1].type) });
                      }
                    ))
                  : (c("6"), e(null));
              })
              ["catch"](h)
              .then(C([a, k], ma));
          } else e({ value: gf, Nd: !0 });
        });
      }
      function Nm(a, c) {
        var b = ne(a, c);
        b &&
          b.$.F(["isYandex"], function () {
            var d;
            return (d = { type: "isYandex" }), (d.isYandex = le(a)), d;
          });
        return b;
      }
      function Sm(a, c, b) {
        a = b || uh(a);
        return L(a, c) ? a : "en";
      }
      function yh(a) {
        if (L(a, ["GDPR-ok-view-default", "GDPR-ok-view-detailed"])) return Jc;
        a = a.replace("GDPR-ok-view-detailed-", "");
        return L(a, Zb) ? a : Jc;
      }
      function zh(a, c, b) {
        var d = n(a, "AppMetricaInitializer"),
          e = n(d, "init");
        if (e)
          try {
            G(e, d)(mb(a, c));
          } catch (f) {}
        else Ah = R(a, C([a, c, 2 * b], zh), b, "ai.d");
        return function () {
          return ma(a, Ah);
        };
      }
      function Bh(a, c, b, d) {
        var e,
          f,
          g,
          h = b.Vh,
          k = b.Qh;
        b = b.isTrusted;
        a = mf(a, k);
        k = k.readOnly;
        d =
          ((e = {}),
          (e.fi = nf(
            ((f = {}),
            (f.a = h ? 1 : 0),
            (f.b = a),
            (f.c = d || 0),
            (f.d = k ? 1 : null),
            f)
          ).Ha()),
          e);
        ka(b) || (d.ite = xb(b));
        c.params(((g = {}), (g.__ym = d), g));
      }
      function Ch(a) {
        var c = n(a, "target");
        if (c) {
          var b = n(c, "value");
          if ((b = nb(b)) && !(100 <= Qa(b))) {
            var d = Pb(b),
              e = 0 < b.indexOf("@"),
              f = "tel" === n(c, "type") || (!e && Qa(d));
            if (e || f) {
              if (f) {
                if (Tm(b)) return;
                var g = b[0],
                  h = d[0];
                if (g !== h && "+" !== g) return;
                var k = b[1];
                if ("+" === g && k !== h) return;
                b = b[Qa(b) - 1];
                g = d[Qa(d) - 1];
                if (b !== g) return;
                b = d;
              }
              d = e ? 5 : 11;
              g = e ? 100 : 16;
              if (!(Qa(b) < d || Qa(b) > g))
                return (
                  (a = n(a, "isTrusted")),
                  { Qh: c, Vh: e, Dj: f, Rh: b, isTrusted: a }
                );
            }
          }
        }
      }
      function Um(a) {
        var c = n(a, "speechSynthesis.getVoices");
        if (c)
          return (
            (a = G(c, a.speechSynthesis)),
            pc(function (b) {
              return A(v(b, n), Vm);
            }, a())
          );
      }
      function Wm(a, c, b) {
        return I("x", A(w(P, Fa("concat", "" + a), v(b, n)), c));
      }
      function Xm(a, c) {
        var b = c.Gg;
        if (!Ym(a, b)) return "";
        var d = [];
        a: {
          var e = Zm(a, b);
          try {
            var f = C(e, w)()();
            break a;
          } catch (D) {
            if ("ccf" === D.message) {
              f = null;
              break a;
            }
            Wa(D);
          }
          f = void 0;
        }
        if (Ta(f)) var g = "";
        else
          try {
            g = f.toDataURL();
          } catch (D) {
            g = "";
          }
        (f = g) && d.push(f);
        var h = b.getContextAttributes();
        try {
          var k = na(b.getSupportedExtensions, "getSupportedExtensions")
            ? b.getSupportedExtensions() || []
            : [];
        } catch (D) {
          k = [];
        }
        k = I(";", k);
        f = of(b.getParameter(b.ALIASED_LINE_WIDTH_RANGE), b);
        e = of(b.getParameter(b.ALIASED_POINT_SIZE_RANGE), b);
        g = b.getParameter(b.ALPHA_BITS);
        h = h && h.antialias ? "yes" : "no";
        var l = b.getParameter(b.BLUE_BITS),
          m = b.getParameter(b.DEPTH_BITS),
          p = b.getParameter(b.GREEN_BITS),
          q =
            b.getExtension("EXT_texture_filter_anisotropic") ||
            b.getExtension("WEBKIT_EXT_texture_filter_anisotropic") ||
            b.getExtension("MOZ_EXT_texture_filter_anisotropic");
        if (q) {
          var r = b.getParameter(q.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
          0 === r && (r = 2);
        }
        r = {
          tj: k,
          "webgl aliased line width range": f,
          "webgl aliased point size range": e,
          "webgl alpha bits": g,
          "webgl antialiasing": h,
          "webgl blue bits": l,
          "webgl depth bits": m,
          "webgl green bits": p,
          "webgl max anisotropy": q ? r : null,
          "webgl max combined texture image units": b.getParameter(
            b.MAX_COMBINED_TEXTURE_IMAGE_UNITS
          ),
          "webgl max cube map texture size": b.getParameter(
            b.MAX_CUBE_MAP_TEXTURE_SIZE
          ),
          "webgl max fragment uniform vectors": b.getParameter(
            b.MAX_FRAGMENT_UNIFORM_VECTORS
          ),
          "webgl max render buffer size": b.getParameter(
            b.MAX_RENDERBUFFER_SIZE
          ),
          "webgl max texture image units": b.getParameter(
            b.MAX_TEXTURE_IMAGE_UNITS
          ),
          "webgl max texture size": b.getParameter(b.MAX_TEXTURE_SIZE),
          "webgl max varying vectors": b.getParameter(b.MAX_VARYING_VECTORS),
          "webgl max vertex attribs": b.getParameter(b.MAX_VERTEX_ATTRIBS),
          "webgl max vertex texture image units": b.getParameter(
            b.MAX_VERTEX_TEXTURE_IMAGE_UNITS
          ),
          "webgl max vertex uniform vectors": b.getParameter(
            b.MAX_VERTEX_UNIFORM_VECTORS
          ),
          "webgl max viewport dims": of(b.getParameter(b.MAX_VIEWPORT_DIMS), b),
          "webgl red bits": b.getParameter(b.RED_BITS),
          "webgl renderer": b.getParameter(b.RENDERER),
          "webgl shading language version": b.getParameter(
            b.SHADING_LANGUAGE_VERSION
          ),
          "webgl stencil bits": b.getParameter(b.STENCIL_BITS),
          "webgl vendor": b.getParameter(b.VENDOR),
          "webgl version": b.getParameter(b.VERSION),
        };
        pf(d, r, ": ");
        a: {
          try {
            var t = b.getExtension("WEBGL_debug_renderer_info");
            if (t) {
              var u = {
                "webgl unmasked vendor": b.getParameter(
                  t.UNMASKED_VENDOR_WEBGL
                ),
                "webgl unmasked renderer": b.getParameter(
                  t.UNMASKED_RENDERER_WEBGL
                ),
              };
              break a;
            }
          } catch (D) {}
          u = {};
        }
        pf(d, u);
        if (!b.getShaderPrecisionFormat) return I("~", d);
        pf(d, $m(b));
        return I("~", d);
      }
      function pf(a, c, b) {
        void 0 === b && (b = ":");
        y(function (d) {
          return a.push("" + d[0] + b + d[1]);
        }, La(c));
      }
      function an(a, c, b, d) {
        c = d.C("cc");
        d = C(["cc", ""], d.D);
        if (c) {
          var e = c.split("&");
          c = e[0];
          if ((e = (e = e[1]) && Da(e)) && 1440 < fa(a)(lb) - e) return d();
          b.D("cc", c);
        } else za(0)(c) || d();
      }
      function bn(a, c, b, d) {
        return qa(c, function (e) {
          if (!qf(e) && !id(a))
            if (((e = d.C("zzlc")), V(e) || Ta(e) || "na" === e)) {
              var f = $a(a);
              if (f && (e = ac(a))) {
                var g = f("iframe");
                z(g.style, {
                  display: "none",
                  width: "1px",
                  height: "1px",
                  visibility: "hidden",
                });
                f = rf(a, 68);
                var h = sf(a, 79);
                g.src =
                  "https://mc.yandex." +
                  (f || h ? "md" : "ru") +
                  Dh("L21ldHJpa2EvenpsYy5odG1s");
                e.appendChild(g);
                var k = 0,
                  l = ea(a).F(
                    a,
                    ["message"],
                    E(a, "zz.m", function (m) {
                      (m = n(m, "data")) &&
                        m.substr &&
                        "__ym__zz" === m.substr(0, 8) &&
                        (qc(g),
                        (m = m.substr(8)),
                        d.D("zzlc", m),
                        b.D("zzlc", m),
                        l(),
                        ma(a, k));
                    })
                  );
                k = R(a, w(l, v(g, qc)), 3e3);
              }
            } else b.D("zzlc", e);
        });
      }
      function cn(a, c, b) {
        var d, e;
        c = ob(v(a, n), dn);
        c = V(c) ? null : n(a, c);
        if (
          n(a, "navigator.onLine") &&
          c &&
          c &&
          n(c, "prototype.constructor.name")
        ) {
          var f = new c(((d = {}), (d.iceServers = []), d));
          a = n(f, "createDataChannel");
          T(a) &&
            (G(a, f, "y.metrika")(),
            (a = n(f, "createOffer")),
            T(a) &&
              !a.length &&
              ((a = G(a, f)()),
              (d = n(a, "then")),
              T(d) &&
                G(d, a, function (g) {
                  var h = n(f, "setLocalDescription");
                  T(h) && G(h, f, g, F, F)();
                })(),
              z(
                f,
                ((e = {}),
                (e.onicecandidate = function () {
                  var g,
                    h = n(f, "close");
                  if (T(h)) {
                    h = G(h, f);
                    try {
                      var k =
                        (g = n(f, "localDescription.sdp")) &&
                        g.match(/c=IN\s[\w\d]+\s([\w\d:.]+)/);
                    } catch (l) {
                      f.onicecandidate = F;
                      "closed" !== f.iceConnectionState && h();
                      return;
                    }
                    k && 0 < k.length && ((g = bc(k[1])), b.D("pp", g));
                    f.onicecandidate = F;
                    h();
                  }
                }),
                e)
              )));
        }
      }
      function en(a, c, b) {
        var d,
          e = jd(a, c);
        if (e) {
          e.$.F(["gpu-get"], function () {
            var h;
            return (h = {}), (h.type = "gpu-get"), (h.pu = b.C("pu")), h;
          });
          var f = n(a, "opener");
          if (f) {
            var g = R(a, C([a, c, b], Eh), 200, "pu.m");
            e.oe(f, ((d = {}), (d.type = "gpu-get"), d), function (h, k) {
              var l = n(k, "pu");
              l && (ma(a, g), b.D("pu", l));
            });
          } else Eh(a, c, b);
        }
      }
      function Eh(a, c, b) {
        var d = n(a, "location.host");
        a = kd(a, c);
        b.D("pu", "" + bc(d) + a);
      }
      function Fh(a, c, b) {
        c = Ic(a, void 0, c);
        c = Gh(a, c.C("phc_settings") || "");
        var d = n(c, "clientId"),
          e = n(c, "orderId"),
          f = n(c, "service_id"),
          g = n(c, "phones") || [];
        return d && e && g && f
          ? fn(a, b.nc, { fg: gn })(g)
              .then(function (h) {
                return hn(b, { Bb: d, Ob: e, Xf: f }, h.ma, g, h.Ba);
              })
              ["catch"](F)
          : J.resolve();
      }
      function gn(a, c, b) {
        a = jn(b.Rb);
        if ("href" === b.ke) {
          var d = b.rb;
          c = d.href;
          b = c.replace(a, b.ab);
          if (c !== b) return (d.href = b), !0;
        } else if (
          (a =
            null === (d = b.rb.textContent) || void 0 === d
              ? void 0
              : d.replace(a, b.ab)) &&
          a !== b.rb.textContent
        )
          return (b.rb.textContent = a), !0;
        return !1;
      }
      function hn(a, c, b, d, e) {
        var f;
        c.Bb &&
          c.Ob &&
          ((c.Bb === a.Bb && c.Ob === a.Ob) || z(a, c, { ma: {}, fb: !0 }),
          0 < e && ra(a.Ba, [e]),
          y(function (g) {
            var h,
              k,
              l = g[0];
            g = g[1];
            var m = +(a.ma[l] && a.ma[l][g] ? a.ma[l][g] : 0);
            z(a.ma, ((h = {}), (h[l] = ((k = {}), (k[g] = m), k)), h));
          }, d),
          y(function (g) {
            var h,
              k,
              l = g[0];
            g = g[1];
            var m = 1 + (a.ma[l] ? a.ma[l][g] : 0);
            z(a.ma, ((h = {}), (h[l] = ((k = {}), (k[g] = m), k)), h));
          }, b),
          a.pf &&
            (a.fb || b.length) &&
            ((c = Ea(a.l, a.nc)) &&
              c.params(
                "__ym",
                "phc",
                ((f = {}),
                (f.clientId = a.Bb),
                (f.orderId = a.Ob),
                (f.service_id = a.Xf),
                (f.phones = a.ma),
                (f.performance = a.Ba),
                f)
              ),
            (a.fb = !1)));
      }
      function kn(a) {
        a = $a(a);
        if (!a) return "";
        a = a("video");
        try {
          var c = Fa("canPlayType", a),
            b = pc(function (d) {
              return A(w(P, Fa("concat", d + "; codecs=")), ln);
            }, Hh);
          return A(c, Hh.concat(b));
        } catch (d) {
          return "canPlayType";
        }
      }
      function mn(a) {
        var c = n(a, "matchMedia");
        if (c && Ha("matchMedia", c)) {
          var b = Fa("matchMedia", a);
          return K(
            function (d, e) {
              d[e] = b("(" + e + ")");
              return d;
            },
            {},
            nn
          );
        }
      }
      function $m(a) {
        return K(
          function (c, b) {
            var d = b[0],
              e = b[1];
            c[d + " precision"] = n(e, "precision") || "n";
            c[d + " precision rangeMin"] = n(e, "rangeMin") || "n";
            c[d + " precision rangeMax"] = n(e, "rangeMax") || "n";
            return c;
          },
          {},
          [
            [
              "webgl vertex shader high float",
              a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.HIGH_FLOAT),
            ],
            [
              "webgl vertex shader medium",
              a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.MEDIUM_FLOAT),
            ],
            [
              "webgl vertex shader low float",
              a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.LOW_FLOAT),
            ],
            [
              "webgl fragment shader high float",
              a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_FLOAT),
            ],
            [
              "webgl fragment shader medium float",
              a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.MEDIUM_FLOAT),
            ],
            [
              "webgl fragment shader low float",
              a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.LOW_FLOAT),
            ],
            [
              "webgl vertex shader high int",
              a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.HIGH_INT),
            ],
            [
              "webgl vertex shader medium int",
              a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.MEDIUM_INT),
            ],
            [
              "webgl vertex shader low int",
              a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.LOW_INT),
            ],
            [
              "webgl fragment shader high int",
              a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_INT),
            ],
            [
              "webgl fragment shader medium int",
              a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.MEDIUM_INT),
            ],
            [
              "webgl fragment shader low int precision",
              a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.LOW_INT),
            ],
          ]
        );
      }
      function Zm(a, c) {
        return [
          function () {
            var b = c.createBuffer();
            (b && c.getParameter && Ha("getParameter", c.getParameter)) || tf();
            c.bindBuffer(c.ARRAY_BUFFER, b);
            var d = new a.Float32Array(on);
            c.bufferData(c.ARRAY_BUFFER, d, c.STATIC_DRAW);
            b.Xh = 3;
            b.ji = 3;
            d = c.createProgram();
            var e = c.createShader(c.VERTEX_SHADER);
            (d && e) || tf();
            return { ie: d, gj: e, fj: b };
          },
          function (b) {
            var d = b.ie,
              e = b.gj;
            c.shaderSource(
              e,
              "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}"
            );
            c.compileShader(e);
            c.attachShader(d, e);
            (d = c.createShader(c.FRAGMENT_SHADER)) || tf();
            return z(b, { lh: d });
          },
          function (b) {
            var d = b.ie,
              e = b.lh;
            c.shaderSource(
              e,
              "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}"
            );
            c.compileShader(e);
            c.attachShader(d, e);
            c.linkProgram(d);
            c.useProgram(d);
            return b;
          },
          function (b) {
            var d = b.ie;
            b = b.fj;
            d.ej = c.getAttribLocation(d, "attrVertex");
            d.li = c.getUniformLocation(d, "uniformOffset");
            c.enableVertexAttribArray(d.Nj);
            c.vertexAttribPointer(d.ej, b.Xh, c.FLOAT, !1, 0, 0);
            c.uniform2f(d.li, 1, 1);
            c.drawArrays(c.TRIANGLE_STRIP, 0, b.ji);
            return c.canvas;
          },
        ];
      }
      function Ym(a, c) {
        if (!T(a.Float32Array)) return !1;
        var b = n(c, "canvas");
        if (!b || !Ha("toDataUrl", b.toDataURL)) return !1;
        try {
          c.createBuffer();
        } catch (d) {
          return !1;
        }
        return !0;
      }
      function of(a, c) {
        c.clearColor(0, 0, 0, 1);
        c.enable(c.DEPTH_TEST);
        c.depthFunc(c.LEQUAL);
        c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
        return "[" + n(a, "0") + ", " + n(a, "1") + "]";
      }
      function pn(a, c) {
        if (n(c, "settings.ins")) {
          var b = H(a);
          if (!b.C("scip")) {
            var d = Oa(a),
              e = fa(a)(lb),
              f = uf(d.C("sci"));
            if (!(f && 1440 >= e - f)) {
              f = ua(a, "ci");
              var g = ["sync.cook.int"],
                h = function (l) {
                  l = b.C("scip", "") + l;
                  b.D("scip", l);
                },
                k = v("a", h);
              b.D("scip", "0");
              return f({ aa: { ia: g, Oa: 3e3, yb: !0 } }, [
                "https://an.yandex.ru/sync_cookie",
              ])
                .then(function (l) {
                  l = n(l.Sc, "CookieMatchUrls");
                  if (da(l) && Qa(l)) {
                    h("1");
                    var m = ua(a, "c");
                    l = A(function (p, q) {
                      return m({ aa: { ia: g, Oa: 3e3 } }, ["https://" + p])[
                        "catch"
                      ](w(v("b", h), v("" + q, h)));
                    }, la(ja, l));
                    return J.all(l);
                  }
                  k();
                }, k)
                .then(function () {
                  var l = b.C("scip");
                  !l || Za(l, "a") || Za(l, "b") || (d.D("sci", e), h("2"));
                }, F);
            }
          }
        }
      }
      function Ih(a) {
        return {
          N: function (c, b) {
            if (!c.K) return b();
            var d = H(a).C("fid");
            !Jh && d && (je(c, "fid", d), (Jh = !0));
            return b();
          },
        };
      }
      function qn(a, c) {
        var b = a.document;
        if (L(b.readyState, ["interactive", "complete"])) Ob(a, c);
        else {
          var d = ea(a),
            e = d.F,
            f = d.Zb,
            g = function () {
              f(b, ["DOMContentLoaded"], g);
              f(a, ["load"], g);
              c();
            };
          e(b, ["DOMContentLoaded"], g);
          e(a, ["load"], g);
        }
      }
      function vf(a) {
        return {
          N: function (c, b) {
            var d = c.K;
            if (d) {
              var e = H(a).C("adBlockEnabled");
              e && d.D("adb", e);
            }
            b();
          },
        };
      }
      function rn(a) {
        var c = E(a, "i.clch", sn);
        ea(a).F(a.document, ["click"], v(a, c), { passive: !1 });
        return function (b) {
          var d = Ga.Qa,
            e = a.Ya[Ga.kc],
            f = !!e._informer;
          e._informer = z({ domain: "metrika-informer.com" }, b);
          f || rc(a, { src: d + "//metrika-informer.com/metrika/informer.js" });
        };
      }
      function tn(a, c) {
        var b = Oa(a);
        if ("" === b.C("cc")) {
          var d = v("cc", b.D);
          d(0);
          var e = fa(a),
            f = H(a);
          f = w(
            U(un({ Sc: 1 }) + ".c"),
            ld(function (g) {
              d(g + "&" + e(lb));
            }),
            v("cc", f.D)
          );
          ua(
            a,
            "6",
            c
          )({ aa: { yb: !0, Ie: !1 } }, ["https://mc.yandex.md/cc"])
            .then(f)
            ["catch"](
              w(
                ld(function () {
                  var g = e(lb);
                  b.D("cc", "&" + g);
                }),
                E(a, "cc")
              )
            );
        }
      }
      function oe(a, c) {
        if (!c) return !1;
        var b = Q(a);
        return new RegExp(c).test("" + b.pathname + b.hash + b.search);
      }
      function vn(a, c) {
        return qa(c, function (b) {
          var d = n(b, "settings.dr");
          return { Ug: wn(a, d), isEnabled: n(b, "settings.auto_goals") };
        });
      }
      function xn(a, c, b, d, e) {
        b = wf(a.document.body, b);
        d = wf(a.document.body, d);
        L(e.target, [b, d]) && xf(a, c);
      }
      function Kh(a, c, b, d) {
        (b = yn(a, d, b)) && xf(a, c, b);
      }
      function Lh(a, c) {
        var b = Mh(a, c);
        return zn(a, b);
      }
      function Mh(a, c) {
        var b = wf(a.document.body, c);
        return b ? An(a, b) : "";
      }
      function xf(a, c, b) {
        if ((c = Ea(a, c)))
          (a = Kc(["dr", b || "" + Ua(a, 10, 99)])), c.params(Kc(["__ym", a]));
      }
      function wf(a, c) {
        var b = null;
        try {
          b = c ? Yb(c, a) : b;
        } catch (d) {}
        return b;
      }
      function Nh(a) {
        a = Aa(Dh(a));
        return A(function (c) {
          c = c.charCodeAt(0).toString(2);
          return Oh("0", 8, c);
        }, a);
      }
      function An(a, c) {
        if (!c) return "";
        var b = [],
          d = n(a, "document");
        yf(a, c, function (e) {
          if (e.nodeType === d.TEXT_NODE) var f = e.textContent;
          else
            e instanceof a.HTMLImageElement
              ? (f = e.alt)
              : e instanceof a.HTMLInputElement && (f = e.value);
          (f = f && f.trim()) && b.push(f);
        });
        return 0 === b.length ? "" : b.join(" ");
      }
      function Bn(a, c, b) {
        a = Ia(b);
        b = a[1];
        "track" === a[0] && c({ version: "0", sc: b });
      }
      function Cn(a, c, b) {
        if (b) {
          var d = b.version;
          (b = n(Dn, d + "." + b.sc)) &&
            ((c && L(b, En)) || a("ym-" + b + "-" + d));
        }
      }
      function Fn(a, c, b) {
        if ("rt" === b)
          return "https://" + Ph(a, c) + ".mc.yandex.ru/watch/3/1";
        if ("mf" === b) {
          b = Q(a);
          b = pe(b.protocol + "//" + b.hostname + b.pathname);
          c = kd(a, c);
          var d = "";
          do d += Ua(a);
          while (d.length < c.length);
          d = d.slice(0, c.length);
          a = "";
          for (var e = 0; e < c.length; e += 1)
            a += (c.charCodeAt(e) + d.charCodeAt(e) - 96) % 10;
          a = [d, a];
          return (
            "https://adstat.yandex.ru/track?service=metrika&id=" +
            a[1] +
            "&mask=" +
            a[0] +
            "&ref=" +
            b
          );
        }
      }
      function Gn(a, c, b) {
        var d,
          e = zf(c).Qb;
        return ua(a, "pi", c)({ K: Ja(((d = {}), (d[e] = 1), d)) }, [b]);
      }
      function Hn(a, c, b) {
        return new J(function (d, e) {
          if (Qh(a, qe, "isp")) {
            var f = F,
              g = function (h) {
                ("1" === h ? d : e)();
                f();
                Rh(qe, "isp");
              };
            f = ea(a).F(a, ["message"], C([b, g], E(a, "isp.stat.m", In)));
            R(a, g, 1500);
          } else e();
        });
      }
      function In(a, c, b) {
        var d = n(b, "data");
        if (ja(d)) {
          var e = d.split("*");
          d = e[0];
          var f = e[1];
          e = e[2];
          "sc.frame" === d && b.source
            ? b.source.postMessage("sc.images*" + a, "*")
            : "sc.image" === d && f === a && c(e);
        }
      }
      function Jn(a, c) {
        var b = Oa(a),
          d = "wv2rf:" + M(c),
          e = c.ic,
          f = Af(a),
          g = b.C(d),
          h = c.Yi;
        return V(f) || Ta(g)
          ? Ba(function (k, l) {
              qa(c, function (m) {
                var p = !!n(m, "settings.webvisor.forms");
                p = !n(m, "settings.x3") && p;
                f = Af(a) || n(m, "settings.eu");
                b.D(d, xb(p));
                l({ ic: e, Md: !!f, Df: p, hg: h });
              });
            })
          : Bf({ ic: e, Md: f, Df: !!Da(g), hg: h });
      }
      function Kn() {
        var a = K(
          function (c, b) {
            c[b[0]] = { gd: 0, Eg: 1 / b[1] };
            return c;
          },
          {},
          [
            ["blur", 0.0034],
            ["change", 0.0155],
            ["click", 0.01095],
            ["deviceRotation", 2e-4],
            ["focus", 0.0061],
            ["mousemove", 0.5132],
            ["scroll", 0.4795],
            ["selection", 0.0109],
            ["touchcancel", 2e-4],
            ["touchend", 0.0265],
            ["touchforcechange", 0.0233],
            ["touchmove", 0.1442],
            ["touchstart", 0.027],
            ["zoom", 0.0014],
          ]
        );
        return {
          Ag: function (c) {
            if (c.length)
              return {
                type: "activity",
                data: K(
                  function (b, d) {
                    var e = a[d];
                    return Math.round(b + e.gd * e.Eg);
                  },
                  0,
                  ca(a)
                ),
              };
          },
          mi: function (c) {
            c && (c = a[c.data.type || c.event]) && (c.gd += 1);
          },
        };
      }
      function Ln(a) {
        return {
          nh: function () {
            var c = a.document.querySelector("base[href]");
            return c ? c.getAttribute("href") : null;
          },
          ph: function () {
            if (a.document.doctype) {
              var c = z(
                  { name: "html", publicId: "", systemId: "" },
                  a.document.doctype
                ),
                b = c.publicId,
                d = c.systemId;
              return (
                "<!DOCTYPE " +
                I("", [
                  c.name,
                  b ? ' PUBLIC "' + b + '"' : "",
                  !b && d ? " SYSTEM" : "",
                  d ? ' "' + d + '"' : "",
                ]) +
                ">"
              );
            }
            return null;
          },
        };
      }
      function Mn(a, c, b) {
        var d = md(a),
          e = ea(a),
          f = fb(a),
          g = c.Ad(),
          h = !n(a, "postMessage") || (f && !n(a, "parent.postMessage")),
          k = v(d, P);
        if (h) {
          if (!g)
            return (
              R(a, G(d.T, d, "i", { wa: !1 }), 10), { zd: k, Qf: F, stop: F }
            );
          Wa(Sa());
        }
        d.F(["sr"], function (r) {
          var t,
            u = Sh(a, r.source);
          u &&
            Cf(
              a,
              r.source,
              ((t = {}), (t.type = "\u043d"), (t.frameId = c.ta().Z(u)), t)
            );
        });
        d.F(["sd"], function (r) {
          var t = r.data;
          r = r.source;
          (a === r || Sh(a, r)) &&
            d.T("sdr", { data: t.data, frameId: t.frameId });
        });
        if (f && !g) {
          var l = !1,
            m = 0,
            p = function () {
              var r;
              Cf(a, a.parent, ((r = {}), (r.type = "sr"), r));
              m = R(a, p, 100, "if.i");
            };
          p();
          var q = function (r) {
            d.ga(["\u043d"], q);
            ma(a, m);
            var t = Lc(a, r.origin).host;
            l ||
              r.source !== a.parent ||
              !r.data.frameId ||
              ("about:blank" !== Q(a).host && !L(t, b)) ||
              ((l = !0), d.T("i", { frameId: r.data.frameId, wa: !0 }));
          };
          d.F(["\u043d"], q);
          R(
            a,
            function () {
              d.ga(["\u043d"], q);
              ma(a, m);
              l || ((l = !0), d.T("i", { wa: !1 }));
            },
            2e3,
            "if.r"
          );
        }
        e = e.F(a, ["message"], function (r) {
          var t = wb(a, r.data);
          t &&
            t.type &&
            L(t.type, Nn) &&
            d.T(t.type, { data: t, source: r.source, origin: r.origin });
        });
        return {
          zd: k,
          Qf: function (r) {
            var t;
            return Cf(
              a,
              a.parent,
              ((t = {}), (t.frameId = c.Ad()), (t.data = r), (t.type = "sd"), t)
            );
          },
          stop: e,
        };
      }
      function Sh(a, c) {
        try {
          return ob(
            w(U("contentWindow"), za(c)),
            Aa(a.document.querySelectorAll("iframe"))
          );
        } catch (b) {
          return null;
        }
      }
      function Cf(a, c, b) {
        a = mb(a, b);
        c.postMessage(a, "*");
      }
      function Th() {
        return (
          cc() +
          cc() +
          "-" +
          cc() +
          "-" +
          cc() +
          "-" +
          cc() +
          "-" +
          cc() +
          cc() +
          cc()
        );
      }
      function cc() {
        return Math.floor(65536 * (1 + Math.random()))
          .toString(16)
          .substring(1);
      }
      function On(a, c) {
        if (ja(c)) return c;
        var b = a.textContent;
        if (ja(b)) return b;
        b = a.data;
        if (ja(b)) return b;
        b = a.nodeValue;
        return ja(b) ? b : "";
      }
      function Pn(a, c, b, d, e) {
        void 0 === d && (d = {});
        void 0 === e && (e = Ma(c));
        var f = z(
          K(
            function (h, k) {
              h[k.name] = k.value;
              return h;
            },
            {},
            Aa(c.attributes)
          ),
          d
        );
        z(f, Qn(c, e, f));
        var g =
          (d = K(
            function (h, k) {
              var l = k[0],
                m = re(a, c, l, k[1], b, e),
                p = m.value;
              ka(p) ? delete f[l] : (f[l] = p);
              return h || m.ob;
            },
            !1,
            La(f)
          )) && Gc(c);
        g && ((f.width = g.width), (f.height = g.height));
        return { ob: d, Bg: f };
      }
      function Qn(a, c, b) {
        var d = {};
        Df(a)
          ? (d.value = a.value || b.value)
          : "IMG" !== c || b.src || (d.src = "");
        return d;
      }
      function re(a, c, b, d, e, f) {
        void 0 === f && (f = Ma(c));
        var g = { ob: !1, value: d };
        if (Df(c))
          "value" === b
            ? !ka(d) &&
              "" !== d &&
              ((b = e.Md),
              (f = e.Df),
              (e = nd(a, c)),
              f
                ? ((b = Mc(a, c, b)),
                  (a = b.pb),
                  (c = b.gb),
                  (b = b.Ua),
                  (g.ob = !c && (e || a)))
                : ((g.ob = e), (b = !(c && dc("ym-record-keys", c)))),
              b || e) &&
              ((d = "" + d),
              (g.value = 0 < d.length ? Uh("\u2022", d.length) : ""))
            : "checked" === b &&
              L((c.getAttribute("type") || "").toLowerCase(), Rn)
            ? (g.value = c.checked ? "checked" : null)
            : Sn.test(b) && Ef(a, c) && (g.value = null);
        else if ("IMG" === f && "src" === b)
          (e = nd(a, c))
            ? ((g.ob = e),
              (g.value =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="))
            : (g.value =
                (c.getAttribute("srcset") ? c.currentSrc : "") || c.src);
        else if ("A" === f && "href" === b) g.value = d ? "#" : "";
        else if (
          L(b, ["srcset", "integrity", "crossorigin", "password"]) ||
          (2 < b.length && 0 === se(b, "on")) ||
          ("IFRAME" === f && "src" === b) ||
          ("SCRIPT" === f && L(b, ["src", "type"]))
        )
          g.value = null;
        return g;
      }
      function Ff(a, c, b, d) {
        void 0 === d && (d = "wv2");
        return {
          H: function (e, f) {
            return E(a, d + "." + b + "." + f, e, void 0, c);
          },
        };
      }
      function Tn(a, c, b, d, e) {
        function f() {
          l && l.stop();
        }
        if (!c.xb) return J.resolve(F);
        var g = ua(a, "4", c),
          h = { K: Ja() },
          k = new Un(a, b, function (m, p, q) {
            if (!g) return J.resolve();
            var r = "wv-data=" + gd(m, !0),
              t = E(a, "m.n.m.s");
            p = {};
            p["wv-part"] = "" + q;
            q = m.length;
            for (var u = 0, D = 255, O = 255, N, ia, wa; q; ) {
              N = 21 < q ? 21 : q;
              q -= N;
              do
                (ia = "string" === typeof m ? m.charCodeAt(u) : m[u]),
                  (u += 1),
                  255 < ia && ((wa = ia >> 8), (ia &= 255), (ia ^= wa)),
                  (D += ia),
                  (O += D);
              while (--N);
              D = (D & 255) + (D >> 8);
              O = (O & 255) + (O >> 8);
            }
            m = (((D & 255) + (D >> 8)) << 8) | ((O & 255) + (O >> 8));
            return g(
              z({}, h, {
                aa: { ca: r },
                J:
                  ((p["wv-check"] = "" + (65535 === m ? 0 : m)),
                  (p["wv-type"] = b.type),
                  p),
              }),
              c
            )["catch"](t);
          }),
          l = Vn(a, k, d, e);
        return qa(c, function (m) {
          m && H(a).D("isEU", n(m, "settings.eu"));
          H(a).C("oo") || (l && Vh(a, m) && l.start());
          return f;
        });
      }
      function Vn(a, c, b, d) {
        var e = a.document,
          f = [],
          g = ea(a),
          h = ":submit" + Math.random(),
          k = [],
          l = G(c.flush, c),
          m = oa(function (r, t) {
            E(a, "hfv." + r, function () {
              try {
                var u = t.type;
              } catch (D) {
                return;
              }
              u = L(u, d);
              c.push(t, { type: r });
              u && l();
            })();
          }),
          p = E(a, "sfv", function () {
            var r = b(a),
              t = Wn(a);
            y(function (u) {
              f.push(g.F(u.target, [u.event], m(u.type)));
            }, r);
            y(function (u) {
              f.push(
                g.F(
                  u.target,
                  [u.event],
                  E(a, "hff." + u.type + "." + u.event, function (D) {
                    y(Ba({ l: a, qa: D, flush: l }), u.O);
                  })
                )
              );
            }, t);
            k = Wh(a, "form", e);
            e.attachEvent &&
              ((r = Wh(a, "form *", e)),
              y(function (u) {
                f.push(g.F(u, ["submit"], m("form")));
              }, k),
              y(function (u) {
                Gf(u) && f.push(g.F(u, ["change"], m("formInput")));
              }, r));
            y(function (u) {
              var D = u.submit;
              if (T(D) || ("object" === typeof D && Xn.test("" + D)))
                (u[h] = D),
                  (u.submit = E(a, "fv", function () {
                    var O = { target: u, type: "submit" };
                    m("document")(O);
                    return u[h]();
                  }));
            }, k);
          }),
          q = E(a, "ufv", function () {
            y(ha, f);
            y(function (r) {
              r && (r.submit = r[h]);
            }, k);
            c.flush();
          });
        return { start: p, stop: q };
      }
      function Yn(a, c) {
        var b = la(function (e) {
            return 0 < e.O.length;
          }, c),
          d = Xh({ target: a.document, type: "document" });
        return A(w(P, d, Zn(a)), b);
      }
      function Yh(a, c) {
        var b = a.l,
          d = [],
          e = c.form;
        if (!c[Va] && e) {
          var f = e.elements;
          e = e.length;
          for (var g = 0; g < e; g += 1) {
            var h = f[g];
            te(h) && !h[Va] && ra(d, sc(b, h));
          }
        } else ra(d, sc(b, c));
        return d;
      }
      function Hf(a) {
        if (od) {
          od = !1;
          var c = yb(a.l),
            b = [];
          gb(a.l, b, 15) ? (a = []) : (S(b, c), (a = b));
          return a;
        }
      }
      function Zh(a) {
        if (!od) {
          od = !0;
          a = yb(a.l);
          var c = [];
          Qb(c, 14);
          S(c, a);
          return c;
        }
      }
      function $n(a, c, b) {
        var d = c[Va];
        if (d) {
          a: {
            var e = yb(a),
              f = c[Va];
            if (0 < f) {
              var g = [];
              c = If(a, c);
              var h = tc[f],
                k = c[0] + "x" + c[1],
                l = c[2] + "x" + c[3];
              if (k !== h.zf) {
                h.zf = k;
                if (gb(a, g, 9)) {
                  a = [];
                  break a;
                }
                S(g, e);
                S(g, f);
                S(g, c[0]);
                S(g, c[1]);
              }
              if (l !== h.size) {
                h.size = l;
                if (gb(a, g, 10)) {
                  a = [];
                  break a;
                }
                S(g, e);
                S(g, f);
                S(g, c[2]);
                S(g, c[3]);
              }
              if (g.length) {
                a = g;
                break a;
              }
            }
            a = [];
          }
          ra(b, a);
        }
        return d;
      }
      function Mc(a, c, b) {
        void 0 === b && (b = !1);
        if (!c) return { Ua: !1, gb: !1, pb: !1 };
        var d = c.getAttribute("type") || c.type;
        if ("button" === d) return { Ua: !1, gb: !1, pb: !1 };
        var e = la($h, [c.className, c.id, c.name]),
          f = c && dc("ym-record-keys", c);
        d = (d && L(d, ai)) || ab(bb(ao), e);
        var g;
        (g = d) ||
          ((g = c.placeholder),
          (g = ab(bb(bo), e) || ($h(g) && co.test(g || ""))));
        e = g;
        return {
          Ua: !f && (Jf(a, c) || (e && b) || (e && !d && !b)),
          gb: f,
          pb: e,
        };
      }
      function Jf(a, c) {
        return Ef(a, c) || pd(a, c) ? !0 : nd(a, c);
      }
      function $h(a) {
        return !!(a && 2 < a.length);
      }
      function Df(a) {
        try {
          var c = Ma(a);
          if (L(c, Kf)) {
            if ("INPUT" === c) {
              var b = a.type;
              return !b || L(b.toLocaleLowerCase(), eo);
            }
            return !0;
          }
        } catch (d) {}
        return !1;
      }
      function bi(a, c) {
        return c && dc("(ym-disable-submit|-metrika-noform)", c);
      }
      function fo(a, c) {
        return I(
          "",
          A(function (b) {
            return a.isNaN(b)
              ? go.test(b)
                ? ((b = b.toUpperCase() === b ? ho : io),
                  String.fromCharCode(Ua(a, b[0], b[1])))
                : b
              : "" + Ua(a, 0, 9);
          }, c.split(""))
        );
      }
      function nd(a, c) {
        if (ka(c)) return !1;
        if (Lf(c)) {
          var b = c.parentNode;
          return (ka(b) ? 0 : 11 === b.nodeType) ? !1 : nd(a, c.parentNode);
        }
        b = ci(a);
        if (!b) return !1;
        var d = b.call(c, ".ym-hide-content,.ym-hide-content *");
        return d &&
          b.call(c, ".ym-show-content,.ym-hide-content .ym-show-content *")
          ? !1
          : d;
      }
      function Vh(a, c) {
        var b = ec(a),
          d = b.C("visorc");
        L(d, ["w", "b"]) || (d = "");
        (di(a) && ei(a, ue, "visorc") && !jo.test(hb(a) || "")) || (d = "b");
        var e = n(c, "settings.webvisor.recp");
        if (!a.isFinite(e) || 0 > e || 1 < e) d = "w";
        d || (d = (H(a).C("hitId") % 1e4) / 1e4 < e ? "w" : "b");
        b.D("visorc", d, 30);
        return "w" === d;
      }
      function ko(a, c) {
        return {
          N: function (b, d) {
            b.K.Vb("we", Ib(c.xb));
            fi(a, c, b, "rn");
            d();
          },
        };
      }
      function gi(a, c, b) {
        if (hi.isEnabled(a)) return new hi(a, c);
        if (ii.isEnabled(a)) return new ii(a, b);
      }
      function ji(a, c) {
        var b = c[1][3],
          d = 0,
          e = new a.Uint8Array(c[0]);
        return $b([b], function (f, g) {
          if (!f) return e;
          f[0](a, f[2], e, d);
          d += f[1];
          g.push(f[3]);
          return e;
        });
      }
      function ki(a, c, b) {
        a = c(b);
        c = [F, 0, 0];
        var d = [0, c, c, void 0];
        return $b(a, function (e, f) {
          var g = e[0],
            h = e[1],
            k = e[2];
          if (0 === g) return k(d, h), d;
          if (void 0 === h || null === h) return d;
          var l = g >> 3;
          if (g & 1) uc(d, X(l)), (h = k(h)), l & 2 && uc(d, X(h[1])), uc(d, h);
          else if (g & 4)
            for (g = h.length - 1; 0 <= g; ) {
              var m = k(h[g]);
              m.push([0, 0, Mf]);
              m.push([0, X(l), uc]);
              m.unshift([0, 0, Nf]);
              ra(f, m);
              --g;
            }
          else if (g & 2) {
            k = e[2];
            var p = e[3],
              q = e[4],
              r = e[5],
              t = ca(h);
            for (g = t.length - 1; 0 <= g; )
              (m = t[g]),
                (m = [
                  [0, 0, Nf],
                  [q, h[m], r],
                  [k, m, p],
                  [0, 0, Mf],
                  [0, X(l), uc],
                ]),
                ra(f, m),
                --g;
          } else
            (m = k(h)),
              m.push([0, 0, Mf]),
              m.push([0, X(l), uc]),
              m.unshift([0, 0, Nf]),
              ra(f, m);
          return d;
        });
      }
      function Nf(a) {
        var c = a[1],
          b = a[0],
          d = a[2];
        a[3]
          ? ((a[0] = a[3][0]),
            (a[1] = a[3][1]),
            (a[2] = a[3][2]),
            (a[3] = a[3][3]))
          : ((a[0] = 0), (a[1] = [F, 0, 0]), (a[2] = a[1]));
        uc(a, X(b));
        b && ((a[2][3] = c[3]), (a[2] = d), (a[0] += b));
      }
      function Mf(a) {
        a[3] = [a[0], a[1], a[2], a[3]];
        a[1] = [F, 0, 0];
        a[2] = a[1];
        a[0] = 0;
      }
      function uc(a, c) {
        a[0] += c[1];
        a[2][3] = c;
        a[2] = c;
      }
      function li(a) {
        return [
          [1857, a.partsTotal, X],
          [1793, a.activity, X],
          [1744, a.textChangeMutation, lo],
          [1680, a.removedNodesMutation, mo],
          [1616, a.addedNodesMutation, no],
          [1552, a.attributesChangeMutation, oo],
          [1488, a.publishersHeader, po],
          [1424, a.articleInfo, qo],
          [1360, a.focusEvent, ro],
          [1296, a.fatalErrorEvent, so],
          [1232, a.deviceRotationEvent, to],
          [1168, a.keystrokesEvent, uo],
          [1104, a.resizeEvent, vo],
          [1040, a.zoomEvent, wo],
          [976, a.touchEvent, xo],
          [912, a.changeEvent, yo],
          [848, a.selectionEvent, zo],
          [784, a.scrollEvent, Ao],
          [720, a.mouseEvent, Bo],
          [656, a.Kj, Co],
          [592, a.page, Do],
          [513, a.end, vc],
          [449, a.partNum, X],
          [401, a.chunk, Eo],
          [257, a.frameId, sa],
          [193, a.event, X],
          [129, a.type, X],
          [65, a.stamp, X],
        ];
      }
      function Fo(a) {
        return [[84, a.Ci, li]];
      }
      function Go(a) {
        return [
          [129, a.position, sa],
          [81, a.name, ba],
        ];
      }
      function Ho(a) {
        return [[81, a.name, ba]];
      }
      function Io(a) {
        return [[81, a.name, ba]];
      }
      function qo(a) {
        return [
          [593, a.updateDate, ba],
          [532, a.rubric, Go],
          [449, a.chars, sa],
          [401, a.publicationDate, ba],
          [340, a.topics, Ho],
          [276, a.authors, Io],
          [209, a.pageTitle, ba],
          [145, a.pageUrlCanonical, ba],
          [65, a.id, X],
        ];
      }
      function Jo(a) {
        return [
          [513, a.chars, sa],
          [489, a.maxScrolled, qd],
          [385, a.involvedTime, sa],
          [321, a.height, sa],
          [257, a.width, sa],
          [193, a.y, sa],
          [129, a.x, sa],
          [65, a.id, X],
        ];
      }
      function po(a) {
        return [
          [129, a.involvedTime, sa],
          [84, a.articleMeta, Jo],
        ];
      }
      function ro(a) {
        return [[65, a.target, sa]];
      }
      function so(a) {
        return [
          [209, a.stack, ba],
          [145, a.Zg, ba],
          [81, a.code, ba],
        ];
      }
      function to(a) {
        return [
          [193, a.orientation, sa],
          [129, a.height, X],
          [65, a.width, X],
        ];
      }
      function uo(a) {
        return [[84, a.keystrokes, Ko]];
      }
      function Ko(a) {
        return [
          [273, a.modifier, ba],
          [193, a.isMeta, vc],
          [145, a.key, ba],
          [65, a.id, X],
        ];
      }
      function vo(a) {
        return [
          [257, a.pageHeight, X],
          [193, a.pageWidth, X],
          [129, a.height, X],
          [65, a.width, X],
        ];
      }
      function wo(a) {
        return [
          [193, a.y, sa],
          [129, a.x, sa],
          [105, a.level, qd],
        ];
      }
      function xo(a) {
        return [
          [129, a.target, sa],
          [84, a.touches, Lo],
        ];
      }
      function Lo(a) {
        return [
          [297, a.force, qd],
          [233, a.y, qd],
          [169, a.x, qd],
          [81, a.id, ba],
        ];
      }
      function yo(a) {
        return [
          [257, a.target, sa],
          [193, a.hidden, vc],
          [129, a.checked, vc],
          [81, a.value, ba],
        ];
      }
      function zo(a) {
        return [
          [257, a.endNode, X],
          [193, a.startNode, X],
          [129, a.end, sa],
          [65, a.start, sa],
        ];
      }
      function Ao(a) {
        return [
          [257, a.target, sa],
          [193, a.page, vc],
          [129, a.y, sa],
          [65, a.x, sa],
        ];
      }
      function Bo(a) {
        return [
          [193, a.target, sa],
          [129, a.y, X],
          [65, a.x, X],
        ];
      }
      function Co(a) {
        return [
          [148, a.changes, Mo],
          [65, a.target, sa],
        ];
      }
      function Mo(a) {
        return [
          [193, a.index, X],
          [145, a.op, ba],
          [81, a.style, ba],
        ];
      }
      function lo(a) {
        return [
          [209, a.value, ba],
          [129, a.index, X],
          [65, a.target, X],
        ];
      }
      function mo(a) {
        return [
          [129, a.index, X],
          [69, a.nodes, sa],
        ];
      }
      function no(a) {
        return [
          [129, a.index, X],
          [84, a.nodes, mi],
        ];
      }
      function oo(a) {
        return [
          [210, a.attributes, 81, ba, 145, ba],
          [129, a.index, X],
          [65, a.target, X],
        ];
      }
      function Do(a) {
        return [
          [852, a.content, mi],
          [785, a.tabId, ba],
          [705, a.recordStamp, No],
          [656, a.location, Oo],
          [592, a.viewport, ni],
          [528, a.screen, ni],
          [449, a.hasBase, vc],
          [401, a.base, ba],
          [337, a.referrer, ba],
          [273, a.ua, ba],
          [209, a.address, ba],
          [145, a.title, ba],
          [81, a.doctype, ba],
        ];
      }
      function Oo(a) {
        return [
          [209, a.path, ba],
          [145, a.protocol, ba],
          [81, a.host, ba],
        ];
      }
      function ni(a) {
        return [
          [129, a.height, sa],
          [65, a.width, sa],
        ];
      }
      function mi(a) {
        return [
          [513, a.hidden, vc],
          [449, a.prev, X],
          [385, a.next, X],
          [337, a.content, ba],
          [257, a.parent, X],
          [210, a.attributes, 81, ba, 145, ba],
          [145, a.name, ba],
          [65, a.id, X],
        ];
      }
      function ba(a) {
        var c = Po({}, a, [], 0);
        return c ? [Qo, c, a] : [oi, 0, 0];
      }
      function Eo(a) {
        return [Ro, a.length, a];
      }
      function vc(a) {
        return [oi, 1, a ? 1 : 0];
      }
      function No(a) {
        a = pi(a);
        var c = a[0],
          b = a[1],
          d = ((b >>> 28) | (c << 4)) >>> 0;
        c >>>= 24;
        return [
          qi,
          0 === c
            ? 0 === d
              ? 16384 > b
                ? 128 > b
                  ? 1
                  : 2
                : 2097152 > b
                ? 3
                : 4
              : 16384 > d
              ? 128 > d
                ? 5
                : 6
              : 2097152 > d
              ? 7
              : 8
            : 128 > c
            ? 9
            : 10,
          a,
        ];
      }
      function qd(a) {
        return [So, 4, a];
      }
      function sa(a) {
        return 0 > a ? [qi, 10, pi(a)] : X(a);
      }
      function X(a) {
        return [
          To,
          128 > a ? 1 : 16384 > a ? 2 : 2097152 > a ? 3 : 268435456 > a ? 4 : 5,
          a,
        ];
      }
      function To(a, c, b, d) {
        for (a = c; 127 < a; ) (b[d++] = (a & 127) | 128), (a >>>= 7);
        b[d] = a;
      }
      function oi(a, c, b, d) {
        b[d] = c;
      }
      function Ro(a, c, b, d) {
        for (a = 0; a < c.length; ++a) b[d + a] = c[a];
      }
      function ri(a) {
        return function (c, b, d, e) {
          for (var f, g = 0, h = 0; h < b.length; ++h)
            if (((c = b.charCodeAt(h)), 128 > c)) a ? (g += 1) : (d[e++] = c);
            else {
              if (2048 > c) {
                if (a) {
                  g += 2;
                  continue;
                }
                d[e++] = (c >> 6) | 192;
              } else {
                if (
                  55296 === (c & 64512) &&
                  56320 === ((f = b.charCodeAt(h + 1)) & 64512)
                ) {
                  if (a) {
                    g += 4;
                    continue;
                  }
                  c = 65536 + ((c & 1023) << 10) + (f & 1023);
                  ++h;
                  d[e++] = (c >> 18) | 240;
                  d[e++] = ((c >> 12) & 63) | 128;
                } else {
                  if (a) {
                    g += 3;
                    continue;
                  }
                  d[e++] = (c >> 12) | 224;
                }
                d[e++] = ((c >> 6) & 63) | 128;
              }
              d[e++] = (c & 63) | 128;
            }
          return a ? g : e;
        };
      }
      function So(a, c, b, d) {
        return Uo(a)(a, c, b, d);
      }
      function Vo(a, c, b, d) {
        var e = 0 > c ? 1 : 0;
        e && (c = -c);
        if (0 === c) rd(0 < 1 / c ? 0 : 2147483648, b, d);
        else if (a.isNaN(c)) rd(2143289344, b, d);
        else if (3.4028234663852886e38 < c)
          rd(((e << 31) | 2139095040) >>> 0, b, d);
        else if (1.1754943508222875e-38 > c)
          rd(((e << 31) | a.Math.round(c / 1.401298464324817e-45)) >>> 0, b, d);
        else {
          var f = a.Math.floor(a.Math.log(c) / Math.LN2);
          rd(
            ((e << 31) |
              ((f + 127) << 23) |
              (Math.round(c * a.Math.pow(2, -f) * 8388608) & 8388607)) >>>
              0,
            b,
            d
          );
        }
      }
      function rd(a, c, b) {
        c[b] = a & 255;
        c[b + 1] = (a >>> 8) & 255;
        c[b + 2] = (a >>> 16) & 255;
        c[b + 3] = a >>> 24;
      }
      function qi(a, c, b, d) {
        a = c[0];
        for (c = c[1]; a; )
          (b[d++] = (c & 127) | 128),
            (c = ((c >>> 7) | (a << 25)) >>> 0),
            (a >>>= 7);
        for (; 127 < c; ) (b[d++] = (c & 127) | 128), (c >>>= 7);
        b[d++] = c;
      }
      function pi(a) {
        if (!a) return [0, 0];
        var c = 0 > a;
        c && (a = -a);
        var b = a >>> 0;
        a = ((a - b) / 4294967296) >>> 0;
        c &&
          ((a = ~a >>> 0),
          (b = ~b >>> 0),
          4294967295 < ++b && ((b = 0), 4294967295 < ++a && (a = 0)));
        return [a, b];
      }
      function fi(a, c, b, d) {
        var e,
          f = b.J;
        f.wmode = "0";
        f["wv-hit"] = f["wv-hit"] || "" + wc(a);
        f["page-url"] = f["page-url"] || Q(a).href;
        d && (f[d] = f[d] || "" + Ua(a));
        a = {
          ha: { Ca: "webvisor/" + c.id },
          aa: z(b.aa || {}, {
            Xa: ((e = {}), (e["Content-Type"] = "text/plain"), e),
            $c: "POST",
          }),
          J: f,
        };
        z(b, a);
      }
      function Wo(a, c) {
        return qa(c, function (b) {
          var d = H(a);
          M(c);
          if (!d.C("dSync", !1))
            return (
              d.D("dSync", !0),
              si(a, b, {
                bb: c,
                Qb: "s",
                Rd: "ds",
                Ni: function (e, f, g) {
                  var h = e.Sc;
                  e = e.host;
                  if (n(h, "settings")) return Wa(Sa("ds.e"));
                  f = f(Y) - g;
                  g = e[1];
                  var k, l;
                  h = Ja(((k = {}), (k.di = h), (k.dit = f), (k.dip = g), k));
                  k = ((l = {}), (l["page-url"] = Q(a).href), l);
                  return ua(
                    a,
                    "S",
                    ti
                  )({ K: h, J: k }, ti)["catch"](E(a, "ds.rs"));
                },
              })
            );
        });
      }
      function si(a, c, b) {
        var d,
          e = b.bb,
          f = fa(a),
          g = Xo(a, c.userData, e),
          h = Yo(a),
          k = w(ui, C([Zo, $o], sd))(a),
          l = n(c, "settings.sbp");
        l && (b.data = z({}, l, ((d = {}), (d.c = e.id), d)));
        return h.length
          ? ap(a, f, g, c, k, b).then(function () {
              return bp(a, h, g, f, k, b);
            }, F)
          : J.resolve();
      }
      function Yo(a) {
        var c = td(a);
        a = w(Of, xc(["iPhone", "iPad"]))(a);
        return c ? cp : a ? dp : [];
      }
      function bp(a, c, b, d, e, f) {
        e = f.Ni;
        var g = void 0 === e ? F : e,
          h = f.Rd,
          k = d(Y);
        return ep(
          a,
          c,
          f
        )(
          Pa(
            function (l) {
              y(function (m) {
                m && ve(a, h + ".s", m);
              }, l);
              l = d(lb);
              b.D(h, l);
            },
            function (l) {
              b.D(h, d(lb));
              g(l, d, k);
            }
          )
        );
      }
      function ap(a, c, b, d, e, f) {
        var g = f.Rd,
          h = f.bb;
        return new J(function (k, l) {
          var m = b.C(g, 0);
          m = parseInt("" + m, 10);
          return c(lb) - m <= e.bg
            ? l()
            : fp(a)
            ? k(void 0)
            : qf(d)
            ? l()
            : k(gp(a, h));
        });
      }
      function ep(a, c, b) {
        var d = b.Qb,
          e = b.data,
          f = ua(a, d, b.bb);
        a = z({}, vi);
        e && z(a.J, e);
        return hp(
          A(function (g) {
            return ip(
              f(
                z({ aa: { Ie: !1, le: !0 } }, vi),
                A(function (h) {
                  var k = h[1],
                    l = h[2];
                  h = I(
                    "",
                    A(function (m) {
                      return String.fromCharCode(m.charCodeAt(0) + 10);
                    }, h[0].split(""))
                  );
                  return (
                    "http" + (l ? "s" : "") + "://" + h + ":" + k + "/" + jp[d]
                  );
                }, g)
              ).then(function (h) {
                return z({}, h, { host: g[h.jg] });
              })
            );
          }, c)
        );
      }
      function Xo(a, c, b) {
        var d = c || {},
          e = ua(a, "u", b),
          f = Oa(a);
        return {
          C: function (g, h) {
            return V(d[g]) ? f.C(g, h) : d[g];
          },
          D: function (g, h) {
            var k,
              l = "" + h;
            d[g] = l;
            f.D(g, l);
            return e(
              { J: ((k = {}), (k.key = g), (k.value = l), k) },
              [Ga.Qa + "//" + fc + "/user_storage_set"],
              {}
            )["catch"](E(a, "u.d.s.s"));
          },
        };
      }
      function kp(a) {
        return {
          N: function (c, b) {
            H(a).C("oo") || b();
          },
        };
      }
      function lp(a, c) {
        try {
          var b = c[0];
          var d = b[1];
        } catch (e) {
          return function () {
            return J.resolve();
          };
        }
        return function (e) {
          var f,
            g =
              ((f = {}),
              (f["browser-info"] = mp),
              (f["page-url"] = a.location && "" + a.location.href),
              f);
          return d && (e = mb(a, e))
            ? d(np, { Za: g, ia: [], ca: "site-info=" + pe(e) })["catch"](F)
            : J.resolve();
        };
      }
      function op(a, c) {
        if (n(a, "disableYaCounter" + c.id) || n(a, "Ya.disableMetrica")) {
          var b = M(c);
          delete H(a).C("counters", {})[b];
          Wa(Sa("oo.e"));
        }
      }
      function pp(a) {
        if (ud(a)) return null;
        var c = qp(a),
          b = c.Cf;
        V(b) &&
          ((c.Cf = null),
          rp(a).then(function (d) {
            c.Cf = d;
          }));
        return b ? 1 : null;
      }
      function sp(a, c, b) {
        b = b.J;
        if ((void 0 === b ? {} : b).nohit) return null;
        a = vd(a);
        if (!a) return null;
        var d = (b = null);
        n(a, "getEntriesByType") &&
          (d = n(a.getEntriesByType("navigation"), "0")) &&
          (b = tp);
        if (!b) {
          var e = n(a, "timing");
          e && ((b = up), (d = e));
        }
        if (!b) return null;
        a = vp(a, d, b);
        c = M(c);
        c = wp(c);
        return (c = xp(c, a)) && I(",", c);
      }
      function xp(a, c) {
        var b = a.length
          ? A(function (d, e) {
              var f = c[e];
              return f === d ? null : f;
            }, a)
          : c;
        a.length = 0;
        y(w(P, Fa("push", a)), c);
        return la(za(null), b).length === a.length ? null : b;
      }
      function vp(a, c, b) {
        return A(function (d) {
          var e = d[0],
            f = d[1];
          if (T(e)) return e(a, c) || null;
          if (1 === d.length) return c[e] ? Math.round(c[e]) : null;
          var g;
          !(g = c[e] && c[f]) &&
            (g = 0 === c[e] && 0 === c[f]) &&
            ((g = d[1]), (g = !(wi[d[0]] || wi[g])));
          if (!g) return null;
          d = Math.round(c[e]) - Math.round(c[f]);
          return 0 > d || 36e5 < d ? null : d;
        }, b);
      }
      function we(a, c) {
        try {
          var b = c.localStorage.getItem(a);
          return b && gd(ge(b));
        } catch (d) {}
        return null;
      }
      function ge(a) {
        for (var c = [], b = 0; b < a.length; b++) {
          var d = a.charCodeAt(b);
          128 > d
            ? c.push(d)
            : (127 < d && 2048 > d
                ? c.push((d >> 6) | 192)
                : (c.push((d >> 12) | 224), c.push(((d >> 6) & 63) | 128)),
              c.push((d & 63) | 128));
        }
        return c;
      }
      function gd(a, c) {
        void 0 === c && (c = !1);
        for (var b = a.length, d = b - (b % 3), e = [], f = 0; f < d; f += 3) {
          var g = (a[f] << 16) + (a[f + 1] << 8) + a[f + 2];
          e.push(
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="[
              (g >> 18) & 63
            ],
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="[
              (g >> 12) & 63
            ],
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="[
              (g >> 6) & 63
            ],
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="[
              g & 63
            ]
          );
        }
        switch (b - d) {
          case 1:
            b = a[d] << 4;
            e.push(
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="[
                (b >> 6) & 63
              ],
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="[
                b & 63
              ],
              "=",
              "="
            );
            break;
          case 2:
            (b = (a[d] << 10) + (a[d + 1] << 2)),
              e.push(
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="[
                  (b >> 12) & 63
                ],
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="[
                  (b >> 6) & 63
                ],
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="[
                  b & 63
                ],
                "="
              );
        }
        e = e.join("");
        return c ? xi(e, !0) : e;
      }
      function Dh(a, c) {
        void 0 === c && (c = !1);
        var b = a,
          d = "",
          e = 0;
        if (!b) return "";
        for (c && (b = xi(b)); b.length % 4; ) b += "=";
        do {
          var f =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(
                b.charAt(e++)
              ),
            g =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(
                b.charAt(e++)
              ),
            h =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(
                b.charAt(e++)
              ),
            k =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(
                b.charAt(e++)
              );
          if (0 > f || 0 > g || 0 > h || 0 > k) return "";
          var l = (f << 18) | (g << 12) | (h << 6) | k;
          f = (l >> 16) & 255;
          g = (l >> 8) & 255;
          l &= 255;
          d =
            64 === h
              ? d + String.fromCharCode(f)
              : 64 === k
              ? d + String.fromCharCode(f, g)
              : d + String.fromCharCode(f, g, l);
        } while (e < b.length);
        return d;
      }
      function xi(a, c) {
        void 0 === c && (c = !1);
        return a
          ? a.replace(c ? /[+/=]/g : /[-*_]/g, function (b) {
              return yp[b] || b;
            })
          : "";
      }
      function zp(a) {
        try {
          var c = Qa(a) ? a : [];
          return I(",", [a.name, a.description, w(Aa, ta, zb(Ap), wd(","))(c)]);
        } catch (b) {
          return "";
        }
      }
      function Ap(a) {
        return I(",", [a.description, a.suffixes, a.type]);
      }
      function Bp(a, c) {
        for (var b = "", d = 0; d < c; d += 1) b += a;
        return b;
      }
      function Cp(a, c, b, d, e, f, g, h) {
        var k = b.C(f);
        ka(k) && (b.D(f, g), e(a, c, b, d), (k = b.C(f, g)));
        V(h) || h.Vb(f, "" + k);
        return k;
      }
      function Dp(a, c) {
        if (xd(a)) {
          var b = hb(a).match(Ep);
          if (b && b.length) return b[1] === c;
        }
        return !1;
      }
      function xe(a, c, b) {
        return function (d) {
          var e,
            f,
            g = Ea(c, b);
          g &&
            Fp(a, d, c) &&
            ((g = G(g.params, g)),
            (d = Pf({ event: a, Ja: "products", ya: gc, Dh: "goods" }, d)) &&
              g &&
              g(((e = {}), (e.__ym = ((f = {}), (f.ecommerce = [d]), f)), e)));
        };
      }
      function Fp(a, c, b) {
        var d = !1,
          e = "";
        if (!va(c)) return vb(b, "", "Ecommerce data should be an object"), d;
        var f = c.goods;
        switch (a) {
          case "detail":
          case "add":
          case "remove":
            da(f) && f.length
              ? (d = Gp(function (g) {
                  return va(g) && (ja(g.id) || ye(b, g.id) || ja(g.name));
                }, f)) ||
                (e =
                  "All items in 'goods' should be objects and contain 'id' or 'name' field")
              : (e = "Ecommerce data should contain 'goods' non-empty array");
            break;
          case "purchase":
            ye(b, c.id) || ja(c.id)
              ? (d = !0)
              : (e =
                  "Purchase object should contain string or number 'id' field");
        }
        vb(b, "", e);
        return d;
      }
      function Hp(a, c, b) {
        if (b.J && b.J.nohit) return null;
        c = M(c);
        b = Ip(a);
        if (b[c]) return null;
        var d = H(a).C("fht", Infinity);
        a: {
          var e = n(a, "performance.getEntriesByType");
          if (T(e)) {
            if (
              ((a = la(
                w(P, U("name"), za("first-contentful-paint")),
                e.call(a.performance, "paint")
              )),
              a.length)
            ) {
              a = a[0].startTime;
              break a;
            }
          } else {
            var f = n(a, "chrome.loadTimes");
            e = yi(a);
            if (
              T(f) &&
              ((f = f.call(a.chrome)), (f = n(f, "firstPaintTime")), e && f)
            ) {
              a = 1e3 * f - e;
              break a;
            }
            if ((a = n(a, "performance.timing.msFirstPaint"))) {
              a -= e;
              break a;
            }
          }
          a = void 0;
        }
        return a && d > a ? ((b[c] = a), Math.round(a)) : null;
      }
      function yd(a, c) {
        return {
          N: function (b, d) {
            Qf(b)
              ? d()
              : qa(c, function (e) {
                  var f;
                  if ((e = n(e, "settings.hittoken")))
                    (e = ((f = {}), (f.hittoken = e), f)),
                      (b.J = z(b.J || {}, e));
                  d();
                });
          },
        };
      }
      function Jp(a, c) {
        function b() {
          q.hidden
            ? z(k.style, zd(["top", "right", "left", "background"], "initial"))
            : z(k.style, zd(["top", "right", "left"], "0"), {
                background: "rgba(0, 0, 0, .3)",
              });
          u.parentNode || (r.appendChild(p), r.appendChild(u));
          q.hidden = !q.hidden;
          r.hidden = !r.hidden;
          t.hidden = !t.hidden;
        }
        function d(N) {
          var ia = g();
          z(ia.style, yc("2px", "18px"), Nc, {
            left: "15px",
            top: "7px",
            background: "#2f3747",
            borderRadius: "2px",
          });
          ia.style.transform = "rotate(" + N + "deg)";
          return ia;
        }
        function e(N, ia, wa, Ab, Ad) {
          var ze = g();
          z(ze.style, yc(ia + "px", wa + "px"), Nc, {
            left: N + "px",
            bottom: 0,
            background: Ab,
            borderTopLeftRadius: Ad,
          });
          return ze;
        }
        var f = $a(a);
        if (!f) return F;
        var g = v("div", f),
          h = v("iframe", f),
          k = g();
        k.classList.add("__ym_wv_ign");
        z(k.style, zi, {
          bottom: "0",
          width: "100%",
          maxWidth: "initial",
          zIndex: "999999999",
        });
        var l = k.attachShadow ? k.attachShadow({ mode: "open" }) : k,
          m = g();
        z(m.style, yc("24px"), Nc, Rf, {
          top: "12px",
          right: "10px",
          background: "#3367dc",
          overflow: "hidden",
        });
        var p = g();
        z(
          p.style,
          {
            border: "2px solid transparent",
            animation: "__ym_wv_ign-spinner-animation 1s 0.21s infinite linear",
          },
          Rf,
          Nc,
          yc("48px"),
          zd(["top", "left"], "calc(50% - 24px)"),
          zd(["borderTopColor", "borderLeftColor"], "#fc0")
        );
        f = f("style");
        f.textContent =
          "@keyframes __ym_wv_ign-spinner-animation {to {transform: rotate(360deg);}}";
        p.appendChild(f);
        var q = g();
        q.id = "__ym_wv_ign__opener";
        z(q.style, yc("46px", "48px"), zi, {
          right: "0",
          bottom: "60px",
          cursor: "pointer",
          background: "#fff",
          borderRadius: "16px 0 0 16px",
          boxShadow:
            "0px 0px 1px rgba(67, 68, 69, 0.3), 0px 1px 2px rgba(67, 68, 69, 0.3)",
        });
        var r = g();
        z(r.style, Nc, zd(["top", "right", "bottom"], "0"), {
          width: "600px",
          background: "#fff",
        });
        var t = g();
        t.id = "__ym_wv_ign__closer";
        z(t.style, yc("32px"), Nc, Rf, {
          top: "12px",
          right: "612px",
          cursor: "pointer",
          background: "#fff",
        });
        f = h();
        f.src = "https://metrika.yandex.ru/widget/iframe-check";
        var u = h();
        z(u.style, yc("100%"), { border: "none" });
        u.src = "https://metrika.yandex.ru/widget/dashboard?id=" + c;
        r.hidden = !0;
        t.hidden = !0;
        t.appendChild(d(45));
        t.appendChild(d(-45));
        r.appendChild(f);
        m.appendChild(
          e(
            0,
            8,
            9,
            "linear-gradient(0deg, #ff324f, #ff324f), linear-gradient(158.67deg, #ff455c 12.6%, #ff1139 96.76%)"
          )
        );
        m.appendChild(e(8, 9, 16, "#04acff", "3px"));
        m.appendChild(e(17, 7, 24, "#ffdd13"));
        q.appendChild(m);
        l.appendChild(r);
        l.appendChild(t);
        var D = ["click", "touchstart"];
        h = ea(a);
        m = a.document.body;
        l = [
          h.F(q, D, b),
          h.F(t, D, b),
          h.F(
            f,
            ["load"],
            C([ha, [G(r.removeChild, r, f), G(l.appendChild, l, q)]], y)
          ),
          h.F(u, ["load"], G(r.removeChild, r, p)),
          G(m.removeChild, m, k),
        ];
        var O = C([ha, l], y);
        l.push(
          h.F(a, ["securitypolicyviolation"], function (N) {
            (N = n(N, "blockedURI")) &&
              0 <= N.indexOf("https://metrika.yandex.ru") &&
              O();
          })
        );
        m.appendChild(k);
        return O;
      }
      function zd(a, c) {
        return K(
          function (b, d) {
            b[d] = c;
            return b;
          },
          {},
          a
        );
      }
      function yc(a, c) {
        var b;
        return (b = {}), (b.width = a), (b.height = c || a), b;
      }
      function Kp(a, c) {
        var b = n(c, "origin"),
          d;
        if ((d = b)) d = Lp.test(b) || Mp.test(b);
        d &&
          ((b = wb(a, c.data)),
          "appendremote" === n(b, "action") && Np(a, c, b));
      }
      function Ai(a, c, b, d) {
        var e, f, g, h;
        void 0 === b && (b = "");
        void 0 === d && (d = "");
        var k = H(a),
          l = {};
        l.getCachedTags = Ae;
        l.form =
          ((e = {}),
          (e.closest = v(a, Bi)),
          (e.select = Op),
          (e.getData = v(a, Ci)),
          e);
        l.button =
          ((f = {}),
          (f.closest = v(a, ee)),
          (f.select = Sf),
          (f.getData = v(a, fe)),
          f);
        l.phone = ((g = {}), (g.hidePhones = C([a, null, [d]], Di)), g);
        l.status = ((h = {}), (h.checkStatus = C([a, Da(b)], Pp)), h);
        k.D("_u", l);
        c && rc(a, { src: c });
      }
      function Ei(a) {
        var c = a.lang;
        c = void 0 === c ? "" : c;
        var b = a.appVersion;
        b = void 0 === b ? "" : b;
        var d = a.fileId;
        d = void 0 === d ? "" : d;
        a = a.beta;
        a = void 0 === a ? !1 : a;
        b = I(".", ta(A(w(P, Da), b.split("."))));
        if (!L(d, Qp) || !L(c, ["ru", "en", "tr"])) return "";
        c =
          (a
            ? "https://s3.mds.yandex.net/internal-metrika-betas"
            : "https://yastatic.net/s3/metrika") +
          (b ? "/" + b : "") +
          "/form-selector/" +
          (d + "_" + c + ".js");
        return Fi(c) ? c : "";
      }
      function Rp(a, c) {
        var b = $a(a);
        if (b) {
          var d = b("div"),
            e = ac(a);
          if (e) {
            d.innerHTML =
              '<iframe name="RemoteIframe" allowtransparency="true" style="position: absolute; left: -999px; top: -999px; width: 1px; height: 1px;"></iframe>';
            var f = d.firstChild;
            f.onload = function () {
              var h = b("meta");
              h.setAttribute("http-equiv", "Content-Security-Policy");
              h.setAttribute("content", "script-src *");
              f.contentWindow.document.head.appendChild(h);
              rc(f.contentWindow, { src: c });
            };
            a._ym__remoteIframeEl = f;
            e.appendChild(d);
            d.removeChild(f);
            var g = null;
            d.attachShadow
              ? (g = d.attachShadow({ mode: "open" }))
              : d.createShadowRoot
              ? (g = d.createShadowRoot())
              : d.webkitCreateShadowRoot && (g = d.webkitCreateShadowRoot());
            g
              ? g.appendChild(f)
              : (e.appendChild(f), (a._ym__remoteIframeContainer = f));
          }
        }
      }
      function Pp(a) {
        var c,
          b = Gi(a);
        a = H(a).C("getCounters", Bd)();
        a = A(U("id"), a);
        return (c = { id: b }), (c.counterFound = !!b && L(b, a)), c;
      }
      function Di(a, c, b) {
        var d;
        c = Hi(a, c, { fg: Sp, hi: ((d = {}), (d.href = !0), d) });
        b = ta(
          A(function (f) {
            return "*" === f ? f : Pb(f);
          }, b)
        );
        var e = A(w(P, Fa("concat", [""]), Ii("reverse"), ha), b);
        b = Cd(a);
        d = Ji(a, b, 1e3);
        c = v(e, c);
        d.F(c);
        Tp(a, b);
        Ki(a, b);
        c();
      }
      function Sp(a, c, b) {
        var d = $a(a),
          e = b.rb,
          f = b.Rb,
          g = e.parentNode,
          h = e.textContent;
        if (!("text" === b.ke && h && d && g)) return !1;
        b = d("small");
        Li(b);
        var k = Mi(h).length;
        y(
          Fa("appendChild", b),
          K(
            function (l, m) {
              var p = l.nodes,
                q = l.mg,
                r = d("small");
              r.innerHTML = m;
              var t = Up.test(m);
              Li(r);
              t && (r.style.opacity = "" + (k - q - 1) / k);
              p.push(r);
              return { nodes: p, mg: q + (t ? 1 : 0) };
            },
            { nodes: [], mg: 0 },
            h
          ).nodes
        );
        Vp(a, c, b, f);
        g.insertBefore(b, e);
        e.textContent = "";
        return !0;
      }
      function Vp(a, c, b, d) {
        function e() {
          y(v(["style", "opacity", ""], Kc), Aa(b.childNodes));
          if (c) {
            var k = Ea(a, c);
            k && k.extLink("tel:" + d, {});
          }
          g();
          h();
        }
        var f = ea(a),
          g = F,
          h = F;
        g = f.F(b, ["mouseenter"], function (k) {
          if (k.target === b) {
            var l = R(a, e, 200, "ph.h.e");
            h();
            h = f.F(b, ["mouseleave"], function (m) {
              m.target === b && ma(a, l);
            });
          }
        });
      }
      function Ki(a, c) {
        Jb(a)(
          Pa(F, function () {
            var b,
              d = a.document.body,
              e =
                ((b = {}),
                (b.attributes = !0),
                (b.childList = !0),
                (b.subtree = !0),
                b);
            Ha("MutationObserver", a.MutationObserver) &&
              new MutationObserver(c.T).observe(d, e);
          })
        );
      }
      function Tp(a, c) {
        return ea(a).F(a, ["load"], c.T);
      }
      function Hi(a, c, b) {
        function d(k) {
          return f(a, c, k) ? h[k.Rb] && h[k.Rb].Yc : null;
        }
        var e,
          f = b.fg;
        b = b.hi;
        var g = void 0 === b ? ((e = {}), (e.href = !0), (e.text = !0), e) : b,
          h;
        return function (k) {
          return new J(function (l, m) {
            (k && k.length) || m();
            h = Ni()(k);
            Jb(a)(
              Pa(v({ ma: [], Ba: 0 }, l), function () {
                var p = fa(a),
                  q = p(Y),
                  r = g.href ? Wp(a, h) : [],
                  t = g.text ? Oi(a, h, a.document.body) : [];
                l({ ma: la(da, ta(A(d, r.concat(t)))), Ba: p(Y) - q });
              })
            );
          });
        };
      }
      function Wp(a, c) {
        var b = a.document.body;
        if (!b) return [];
        var d = Pi(c);
        return K(
          function (e, f) {
            var g = n(f, "href");
            try {
              var h = decodeURI(g || "");
            } catch (p) {
              h = "";
            }
            if ("tel:" === h.slice(0, 4)) {
              var k = (d.exec(h) || [])[0],
                l = k ? Pb(k) : "",
                m = c[l];
              V(m) ||
                (!l && "*" !== m.Yc[0]) ||
                (e.push({
                  ke: "href",
                  rb: f,
                  Rb: l,
                  ab: Qi(k, c[l].ab),
                  Qi: g,
                }),
                (g = Pb(h.slice(4))),
                (l = Ni()([l ? m.Yc : [g, ""]])),
                ra(e, Oi(a, l, f)));
            }
            return e;
          },
          [],
          Aa(b.querySelectorAll("a"))
        );
      }
      function Oi(a, c, b) {
        if (!b) return [];
        var d = [],
          e = Pi(c),
          f = ["script", "style"];
        yf(
          a,
          b,
          function (g) {
            var h = n(g, "parentNode.nodeName") || "";
            g === b ||
              L(h.toLowerCase(), f) ||
              ((h = ta(e.exec(g.textContent || "") || [])),
              y(function (k) {
                var l = Pb(k);
                V(c[l]) ||
                  d.push({
                    ke: "text",
                    rb: g,
                    Rb: l,
                    ab: Qi(k, c[l].ab),
                    Qi: g.textContent || "",
                  });
              }, h));
          },
          function (g) {
            return e.test(g.textContent || "") ? 1 : 0;
          },
          a.NodeFilter.SHOW_TEXT
        );
        return d;
      }
      function Ni() {
        return Tf(function (a, c) {
          var b = A(Pb, c),
            d = b[0];
          b = b[1];
          a[d] = { ab: b, Yc: c };
          var e = Ri(d);
          e !== d && (a[e] = { ab: Ri(b), Yc: c });
          return a;
        }, {});
      }
      function Qi(a, c) {
        for (
          var b = [], d = a.split(""), e = c.split(""), f = 0, g = 0;
          g < a.length && !(f >= e.length);
          g += 1
        ) {
          var h = d[g];
          "0" <= h && "9" >= h ? (b.push(e[f]), (f += 1)) : b.push(d[g]);
        }
        return I("", b) + c.slice(f + 1);
      }
      function Ri(a) {
        var c = { 7: "8", 8: "7" };
        return 11 === a.length && c[a[0]] ? "" + c[a[0]] + a.slice(1) : a;
      }
      function Pi(a) {
        return new RegExp("(?:" + I("|", A(Si, ca(a))) + ")");
      }
      function Ti(a, c, b, d) {
        if (c) {
          var e = [];
          c &&
            (a.document.documentElement.contains(c)
              ? yf(a, c, Fa("push", e), d)
              : ra(e, Ui(a, c, d)));
          y(b, e);
        }
      }
      function yf(a, c, b, d, e) {
        function f(g) {
          return T(d)
            ? d(g)
              ? a.NodeFilter.FILTER_ACCEPT
              : a.NodeFilter.FILTER_REJECT
            : a.NodeFilter.FILTER_ACCEPT;
        }
        void 0 === e && (e = -1);
        if (T(b) && f(c) === a.NodeFilter.FILTER_ACCEPT && (b(c), !Lf(c)))
          for (
            c = a.document.createTreeWalker(
              c,
              e,
              d ? { acceptNode: f } : null,
              !1
            );
            c.nextNode() && !1 !== b(c.currentNode);

          );
      }
      function Ui(a, c, b) {
        var d = [],
          e = w(P, Fa("push", d));
        T(b)
          ? ((b = b(c)), (ka(b) || b === a.NodeFilter.FILTER_ACCEPT) && e(c))
          : e(c);
        if (c.childNodes && 0 < c.childNodes.length) {
          c = c.childNodes;
          b = 0;
          for (var f = c.length; b < f; b += 1) {
            var g = Ui(a, c[b]);
            y(e, g);
          }
        }
        return d;
      }
      function Vi(a, c, b) {
        var d;
        a = [
          Wi(a, c, function (e) {
            d = e;
            e.Aa.F(b);
          }),
          function () {
            d && d.unsubscribe();
          },
        ];
        return C([Be, a], y);
      }
      function Xp(a, c, b, d) {
        var e, f, g;
        if (b) {
          var h = n(d, "ecommerce") || {};
          var k = n(d, "event") || "";
          h = va(h) && ja(k) ? Pf(k, h) : void 0;
          if (!h)
            a: {
              var l = d;
              !da(d) && ye(a, Qa(d)) && (l = Ia(l));
              if (
                da(l) &&
                ((h = l[0]),
                (k = l[1]),
                (l = l[2]),
                ja(k) && va(l) && "event" === h)
              ) {
                h = Pf(k, l);
                break a;
              }
              h = void 0;
            }
          if ((d = h || Yp(d)))
            pb(
              a,
              ((e = {}),
              (e.counterKey = c),
              (e.name = "ecommerce"),
              (e.data = d),
              e)
            ),
              b(((f = {}), (f.__ym = ((g = {}), (g.ecommerce = [d]), g)), f));
        }
      }
      function Yp(a) {
        var c = n(a, "ecommerce");
        if (va(c))
          return (
            (a = la(xc(Zp), ca(c))),
            (a = K(
              function (b, d) {
                b[d] = c[d];
                return b;
              },
              {},
              a
            )),
            0 === ca(a).length ? void 0 : a
          );
      }
      function Pf(a, c) {
        var b,
          d,
          e = ja(a) ? $p[a] : a;
        if (e) {
          var f = e.event,
            g = e.Ja,
            h = e.Dh,
            k = void 0 === h ? "items" : h,
            l = c.purchase || c;
          if ((h = l[k])) {
            e = A(v(e.ya, aq), h);
            var m = ((b = {}), (b[f] = g ? ((d = {}), (d[g] = e), d) : e), b);
            b = ca(l);
            g &&
              1 < b.length &&
              (m[f].actionField = K(
                function (p, q) {
                  if (q === k) return p;
                  if ("currency" === q) return (m.currencyCode = l.currency), p;
                  p[bq[q] || Uf[q] || q] = l[q];
                  return p;
                },
                {},
                b
              ));
            return m;
          }
        }
      }
      function aq(a, c) {
        var b = {};
        y(function (d) {
          var e = a[d] || Uf[d] || d;
          -1 !== d.indexOf("item_category")
            ? ((e = Uf.item_category),
              (b[e] = b[e] ? b[e] + ("/" + c[d]) : c[d]))
            : (b[e] = c[d]);
        }, ca(c));
        return b;
      }
      function cq(a, c, b) {
        var d,
          e,
          f = n(b, "target");
        if (f && ((f = ee(a, f)), (f = fe(a, f)))) {
          f = "?" + zc(f);
          var g = Kb(
            a,
            c,
            "Button goal. Counter " + c.id + ". Button: " + f + "."
          );
          b = n(b, "isTrusted");
          b = ka(b)
            ? void 0
            : ((d = {}), (d.__ym = ((e = {}), (e.ite = xb(b)), e)), d);
          Ce(a, c, "btn", g).reachGoal(f, b);
        }
      }
      function dq(a, c, b, d) {
        var e = n(d, "target");
        e &&
          ((d = n(d, "isTrusted")),
          (e = hc("button,input", a, e)) &&
            "submit" === e.type &&
            (e = Bi(a, e))) &&
          (b.push(e), R(a, C([!1, a, c, b, e, d], Xi), 300));
      }
      function Xi(a, c, b, d, e, f) {
        var g,
          h,
          k = Rb(c)(e, d),
          l = -1 !== k;
        if (a || l)
          l && d.splice(k, 1),
            (a = Ci(c, e)),
            (a = "?" + zc(a)),
            (d = C(
              [c, b, "Form goal. Counter " + b.id + ". Form: " + a + "."],
              Yi
            )),
            (f = ka(f)
              ? void 0
              : ((g = {}), (g.__ym = ((h = {}), (h.ite = xb(f)), h)), g)),
            Ce(c, b, "form", d).reachGoal(a, f);
      }
      function Yi(a, c, b) {
        return eq(a, c).then(w(C([Kb(a, c, b), F], sd), ha));
      }
      function Ci(a, c, b) {
        return Zi(a, c, ["i", "n", "p"], void 0, b);
      }
      function fq(a, c) {
        var b;
        a(((b = {}), (b.clickmap = V(c) ? !0 : c), b));
      }
      function gq(a, c, b, d, e) {
        var f,
          g = "clmap/" + e.id;
        c = ((f = {}), (f["page-url"] = c), (f["pointer-click"] = b), f);
        f = { K: Ja(), J: c, ha: { Ca: g } };
        d(f, e)["catch"](E(a, "c.s.c"));
      }
      function hq(a, c, b, d, e) {
        if (Oc(a, "ymDisabledClickmap") || !c || !c.element) return !1;
        a = Ma(c.element);
        if (
          (e && !e(c.element, a)) ||
          (L(c.button, [2, 3]) && "A" !== a) ||
          ab(za(a), d)
        )
          return !1;
        d = c.element;
        if (c && b) {
          if (50 > c.time - b.time) return !1;
          e = Math.abs(b.position.x - c.position.x);
          a = Math.abs(b.position.y - c.position.y);
          c = c.time - b.time;
          if (b.element === d && 2 > e && 2 > a && 1e3 > c) return !1;
        }
        for (; d; ) {
          if (iq(d)) return !1;
          d = d.parentElement;
        }
        return !0;
      }
      function jq(a, c) {
        var b = null;
        try {
          if ((b = c.target || c.srcElement))
            !b.ownerDocument && b.documentElement
              ? (b = b.documentElement)
              : b.ownerDocument !== a.document && (b = null);
        } catch (d) {}
        return b;
      }
      function kq(a) {
        var c = a.which;
        a = a.button;
        return c || void 0 === a
          ? c
          : 1 === a || 3 === a
          ? 1
          : 2 === a
          ? 3
          : 4 === a
          ? 2
          : 0;
      }
      function $i(a, c) {
        var b = ac(a),
          d = Vf(a);
        return {
          x: c.pageX || c.clientX + d.x - (b.clientLeft || 0) || 0,
          y: c.pageY || c.clientY + d.y - (b.clientTop || 0) || 0,
        };
      }
      function De(a, c) {
        return {
          N: function (b, d) {
            var e,
              f = b.K,
              g = b.Ia,
              h = b.J,
              k = b.aa;
            k = void 0 === k ? {} : k;
            if (f && h) {
              var l = fa(a);
              f.Vb("rqnl", 1);
              for (var m = Dd(a), p = 1; m[p]; ) p += 1;
              b.M || (b.M = {});
              b.M.Sb = p;
              m[p] =
                ((e = {}),
                (e.protocol = Ga.Qa),
                (e.host = fc),
                (e.resource = b.ha.Ca),
                (e.postParams = k.ca),
                (e.time = l(Y)),
                (e.counterType = c.ba),
                (e.params = h),
                (e.browserInfo = f.l()),
                (e.counterId = c.id),
                (e.ghid = wc(a)),
                e);
              g && (m[p].telemetry = g.l());
              Wf(a);
            }
            d();
          },
          ra: function (b, d) {
            aj(a, b);
            d();
          },
        };
      }
      function aj(a, c) {
        var b = Dd(a);
        c.K && !Ta(b) && c.M && (delete b[c.M.Sb], Wf(a));
      }
      function Wf(a) {
        var c = Dd(a);
        Oa(a).D("retryReqs", c);
      }
      function lq(a, c) {
        if (a.Wi()) {
          var b = bj(c);
          if (b && !dc("ym-disable-tracklink", b)) {
            var d = a.l,
              e = a.Pg,
              f = a.bb,
              g = a.sender,
              h = a.bh,
              k = f.xc,
              l = b.href;
            var m = nb(b.innerHTML && b.innerHTML.replace(/<\/?[^>]+>/gi, ""));
            m ||
              (m = (m = b.querySelector("img"))
                ? nb(m.getAttribute("title") || m.getAttribute("alt"))
                : "");
            m = l === m ? "" : m;
            var p = n(c, "isTrusted");
            if (dc("ym-external-link", b))
              Ee(d, f, { url: l, mb: !0, title: m, Gc: p, sender: g });
            else {
              k = k ? Lc(d, k).hostname : Q(d).hostname;
              h = RegExp("\\.(" + I("|", A(mq, h)) + ")$", "i");
              var q = b.protocol + "//" + b.hostname + b.pathname;
              h = cj.test(q) || cj.test(l) || h.test(l) || h.test(q);
              b = b.hostname;
              Fe(k) === Fe(b)
                ? h
                  ? Ee(d, f, { url: l, Ec: !0, Gc: p, title: m, sender: g })
                  : m && e.D("il", nb(m).slice(0, 100))
                : (l && nq.test(l)) ||
                  Ee(d, f, {
                    url: l,
                    Ic: !0,
                    mb: !0,
                    Ec: h,
                    Gc: p,
                    title: m,
                    sender: g,
                  });
            }
          }
        }
      }
      function Ee(a, c, b) {
        var d,
          e,
          f,
          g = Ja();
        void 0 !== b.Gc && g.D("ite", xb(b.Gc));
        b.Ec && g.D("dl", 1);
        b.mb && g.D("ln", 1);
        var h = b.lg || {};
        g = {
          K: g,
          M: { title: h.title || b.title, Ic: !!b.Ic, R: h.params },
          J:
            ((d = {}),
            (d["page-url"] = b.url),
            (d["page-ref"] = c.xc || Q(a).href),
            d),
        };
        d = "Link";
        b.Ec
          ? (d = b.mb ? "Ext link - File" : "File")
          : b.mb && (d = "Ext link");
        pb(
          a,
          ((e = {}),
          (e.counterKey = M(c)),
          (e.name = "event"),
          (e.data =
            ((f = {}),
            (f.schema = "Link click"),
            (f.name = (b.mb ? "external" : "internal") + " url: " + b.url),
            f)),
          e)
        );
        c = b
          .sender(g, c)
          .then(Kb(a, c, d + ". Counter " + c.id + ". Url: " + b.url, b.lg));
        return Pc(a, "cl.p.s", c, h.callback || F, h.ctx);
      }
      function oq(a, c) {
        var b,
          d,
          e =
            ((b = {}), (b.string = !0), (b.object = !0), (b["boolean"] = c), b)[
              typeof c
            ] || !1;
        a(((d = {}), (d.trackLinks = e), d));
      }
      function pq(a, c, b, d) {
        var e = Q(a),
          f = e.hostname;
        e = e.href;
        if ((c = Ed(c).url)) (a = Lc(a, c)), (f = a.hostname), (e = a.href);
        return [d + "://" + f + "/" + b, e || ""];
      }
      function dj(a) {
        return (a.split(":")[1] || "")
          .replace(/^\/*/, "")
          .replace(/^www\./, "")
          .split("/")[0];
      }
      function qq(a, c, b, d) {
        var e;
        if ((a = Ea(a, b))) {
          var f = d.data;
          b = "" + b.id;
          var g = d.sended || [];
          d.sended || (d.sended = g);
          L(b, g) ||
            !a.params ||
            (d.counter && "" + d.counter !== b) ||
            (a.params(f),
            g.push(b),
            d.parent && c.Uf(((e = {}), (e.type = "params"), (e.data = f), e)));
        }
      }
      function xh(a, c, b) {
        void 0 === b && (b = P);
        var d = md(a);
        b(d);
        var e = v(d, rq);
        Ge(a, c, function (f) {
          f.Aa.F(e);
        });
        return d;
      }
      function rq(a, c) {
        var b = n(c, "ymetrikaEvent");
        b && a.T(n(b, "type"), b);
      }
      function Ge(a, c, b, d) {
        void 0 === b && (b = F);
        void 0 === d && (d = !1);
        var e = Cd(a);
        if (c && T(c.push)) {
          var f = c.push;
          c.push = function () {
            var g = Ia(arguments),
              h = g[0];
            d && e.T(h);
            g = f.apply(c, g);
            d || e.T(h);
            return g;
          };
          a = {
            Aa: e,
            unsubscribe: function () {
              c.push = f;
            },
          };
          b(a);
          y(e.T, c);
          return a;
        }
      }
      function ie(a) {
        a = H(a);
        var c = a.C("dataLayer", []);
        a.D("dataLayer", c);
        return c;
      }
      function Mm(a, c) {
        var b, d;
        a.push(((b = {}), (b.ymetrikaEvent = ((d = {}), (d.type = c), d)), b));
      }
      function ej(a, c) {
        var b = jd(a, c),
          d = [],
          e = [];
        if (!b) return null;
        var f = C([a, b.oe], sq),
          g = v(f, tq);
        b.$.F(["initToParent"], function (h) {
          g(d, b.children[h[1].counterId]);
        }).F(["parentConnect"], function (h) {
          g(e, b.Ga[h[1].counterId]);
        });
        return {
          $: b.$,
          Jj: function (h, k) {
            return new J(function (l, m) {
              b.oe(h, k, function (p, q) {
                l([p, q]);
              });
              R(a, v(Sa(), m), 5100, "is.o");
            });
          },
          Tf: function (h) {
            var k = { Wf: [], Be: [], data: h };
            d.push(k);
            return f(b.children, k, h);
          },
          Uf: function (h) {
            var k = { Wf: [], Be: [], data: h };
            e.push(k);
            return f(b.Ga, k, h);
          },
        };
      }
      function tq(a, c, b) {
        c = la(function (d) {
          return !L(b.info.counterId, d.Be);
        }, c);
        y(function (d) {
          var e;
          b.info.counterId &&
            a(((e = {}), (e[b.info.counterId] = b), e), d, d.data);
        }, c);
      }
      function sq(a, c, b, d, e) {
        return new J(function (f, g) {
          var h = ca(b),
            k = w(d.resolve || P, ld(f)),
            l = w(d.reject || P, ld(g));
          d.resolve = k;
          d.reject = l;
          y(function (m) {
            var p;
            d.Be.push(+m);
            var q = b[m],
              r = R(a, v(Sa(), l), 5100, "is.m");
            c(
              q.window,
              z(e, ((p = {}), (p.toCounter = Da(m)), p)),
              function (t, u) {
                ma(a, r);
                d.Wf.push(m);
                d.resolve && d.resolve(u);
              }
            );
          }, h);
        })["catch"](E(a, "if.b"));
      }
      function uq(a) {
        var c = F,
          b = null,
          d = a.length;
        if (0 !== a.length && a[0]) {
          var e = a.slice(-1)[0];
          T(e) && ((c = e), (d = a.length + -1));
          var f = a.slice(-2)[0];
          T(f) && ((c = f), (b = e), (d = a.length + -2));
          d = a.slice(0, d);
          return { Qg: b, dc: c, R: 1 === d.length ? a[0] : Kc(d) };
        }
      }
      function Pc(a, c, b, d, e) {
        var f = C([a, d, e], Xf);
        return b.then(f, function (g) {
          f();
          ve(a, c, g);
        });
      }
      function Yf(a, c) {
        return {
          N: function (b, d) {
            var e,
              f,
              g = (b.M || {}).R,
              h = b.aa;
            h = void 0 === h ? {} : h;
            if (g && (fj(c, g), !h.ca && b.K && b.J)) {
              var k = mb(a, g),
                l = gj(a),
                m = b.K.C("pv");
              k &&
                !b.J.nohit &&
                (pb(
                  a,
                  ((e = {}),
                  (e.counterKey = M(c)),
                  (e.name = "params"),
                  (e.data = ((f = {}), (f.val = g), f)),
                  e)
                ),
                m
                  ? encodeURIComponent(k).length > Ga.rg
                    ? l.push([b.K, g])
                    : (b.J["site-info"] = k)
                  : ((h.ca = k),
                    (b.aa = h),
                    b.Pc || (b.Pc = {}),
                    (b.Pc.ii = !0)));
            }
            d();
          },
          ra: function (b, d) {
            var e = gj(a),
              f = Ea(a, c),
              g = f && f.params;
            g &&
              ((f = la(w(Qc, za(b.K)), e)),
              y(function (h) {
                g(h[1]);
                h = He(a)(h, e);
                e.splice(h, 1);
              }, f));
            d();
          },
        };
      }
      function Ie(a, c) {
        return function (b) {
          Zf(a, c, b);
        };
      }
      function vq(a, c) {
        $f(a)(function (b) {
          delete b[c];
        });
      }
      function Zf(a, c, b) {
        $f(a)(function (d) {
          d[c] = z(d[c] || {}, b);
        });
      }
      function $f(a) {
        a = H(a);
        var c = a.C("dsjf") || Ba({});
        a.Na("dsjf", c);
        return c;
      }
      function wq(a, c) {
        return function (b) {
          var d,
            e,
            f = Ea(a, c);
          f &&
            (va(b)
              ? Qa(ca(b))
                ? (b = hj(b)) &&
                  Qa(b) &&
                  f.params(
                    ((d = {}), (d.__ym = ((e = {}), (e.fpmh = b), e)), d)
                  )
                : Kb(a, c, "First party params error. Empty object.")()
              : Kb(a, c, "First party params error. Not an object.")());
        };
      }
      function hj(a) {
        return K(
          function (c, b) {
            var d = b[0],
              e = b[1],
              f = va(e);
            if (!ja(e) && !f) return c;
            e = f ? hj(e) : e;
            Qa(e) && c.push([d, e]);
            return c;
          },
          [],
          La(a)
        );
      }
      function ij(a, c, b) {
        void 0 === b && (b = 0);
        c = La(c);
        c = K(
          function (d, e) {
            var f = e[0],
              g = e[1],
              h = va(g);
            if (!ja(g) && !h) return d;
            h
              ? (g = ij(a, g, b + 1))
              : b || "yandex_cid" !== f
              ? ("phone_number" === f
                  ? (g = xq(g))
                  : "email" === f && (g = yq(g)),
                (g = jj(a, g)))
              : (g = J.resolve(g));
            d.push(
              g.then(function (k) {
                return [f, k];
              })
            );
            return d;
          },
          [],
          c
        );
        return J.all(c);
      }
      function yq(a) {
        var c = nb(a).toLowerCase().split("@"),
          b = c[0];
        c = c[1];
        if (!c) return a;
        c = c.replace("googlemail.com", "gmail.com");
        kj(c) && (c = "yandex.ru");
        "yandex.ru" === c
          ? (b = b.replace(ag, "-"))
          : "gmail.com" === c && (b = b.replace(ag, ""));
        a = se(b, "+");
        -1 !== a && (b = b.slice(0, a));
        return b + "@" + c;
      }
      function xq(a) {
        a = Pb(a);
        return "8" === a[0] ? "7" + a.slice(1) : a;
      }
      function jj(a, c) {
        return new J(function (b, d) {
          var e = new a.TextEncoder().encode(c);
          a.crypto.subtle.digest("SHA-256", e).then(function (f) {
            f = new a.Blob([f], { type: "application/octet-binary" });
            var g = new a.FileReader();
            g.onload = function (h) {
              h = n(h, "target.result") || "";
              var k = h.indexOf(",");
              -1 !== k ? b(h.substring(k + 1)) : d(Fc("fpm.i"));
            };
            g.readAsDataURL(f);
          }, d);
        });
      }
      function Ea(a, c) {
        var b = H(a).C("counters", {}),
          d = M(c);
        return b[d];
      }
      function lj(a, c) {
        H(a).D("dce:" + c, !0);
        var b = H(a).C("dclq:" + c);
        if (b) {
          var d = Fd(a, c);
          y(function (e) {
            d[e[0]].apply(d, e[1]);
          }, b);
          Gd(b);
        }
      }
      function Kb(a, c, b, d) {
        return mj(c)
          ? F
          : v(C([a, M(c)].concat(d ? [b + ". Params:", d] : [b]), vb), ha);
      }
      function vb() {
        var a = Ia(arguments),
          c = a.slice(2);
        Fd(a[0], a[1]).log.apply(vb, c);
      }
      function zq(a, c) {
        return {
          log: Rc(a, "log", c, F),
          warn: Rc(a, "log", c, F),
          error: Rc(a, "log", c, F),
        };
      }
      function Rc(a, c, b, d) {
        return function () {
          var e,
            f,
            g = Ia(arguments);
          pb(
            a,
            ((e = {}),
            (e.counterKey = b),
            (e.name = "log"),
            (e.data = ((f = {}), (f.args = g), (f.type = c), f)),
            e)
          );
          return d.apply(void 0, g);
        };
      }
      function qa(a, c) {
        var b = M(a);
        return nj()(Aq(b)).then(c);
      }
      function Bq(a, c, b) {
        var d, e;
        c = M(c);
        var f = bg(a);
        b = z({ eh: f(Y) }, b);
        pb(
          a,
          ((d = {}),
          (d.counterKey = c),
          (d.name = "counterSettings"),
          (d.data = ((e = {}), (e.settings = b), e)),
          d)
        );
        return nj()(Cq(c, b));
      }
      function Cq(a, c) {
        return function (b) {
          var d = b[a];
          d
            ? ((d.Bi = c),
              (d.Hf = !0),
              d.Gf ? d.Gf(c) : (d.promise = J.resolve(c)))
            : (b[a] = { promise: J.resolve(c), Bi: c, Hf: !0 });
        };
      }
      function cg(a) {
        return !ud(a) && dg(a);
      }
      function Hd(a) {
        return $a(a) ? v(a, Dq) : !1;
      }
      function Bb(a) {
        if (a.fetch) {
          var c = n(a, "AbortController");
          return C([a, c ? new c() : void 0], Eq);
        }
        return !1;
      }
      function dg(a) {
        var c = n(a, "navigator.sendBeacon");
        return c && Ha("sendBeacon", c)
          ? C([a, G(c, n(a, "navigator"))], Fq)
          : !1;
      }
      function Fq(a, c, b, d) {
        return new J(function (e, f) {
          var g;
          if (!n(a, "navigator.onLine")) return f();
          var h = z(d.Za, ((g = {}), (g["force-urlencoded"] = 1), g));
          g = b + "?" + zc(h) + (d.ca ? "&" + d.ca : "");
          return 2e3 < g.length ? f(Sa("sb.tlq")) : c(g) ? e("") : f();
        });
      }
      function Dq(a, c, b) {
        return new J(function (d, e) {
          var f,
            g,
            h = "_ymjsp" + Ua(a),
            k = z(((f = {}), (f.callback = h), f), b.Za),
            l = C([a, h], Gq);
          a[h] = function (p) {
            try {
              l(), qc(m), d(p);
            } catch (q) {
              e(q);
            }
          };
          k.wmode = "5";
          var m = rc(a, ((g = {}), (g.src = oj(c, b, k)), g));
          if (!m) return l(), e(Fc("jp.s"));
          f = v(m, qc);
          f = w(f, v(Sa(b.ia), e));
          g = Id(a, f, b.Oa || 1e4);
          g = C([a, g], ma);
          m.onload = g;
          m.onerror = w(l, g, f);
        });
      }
      function Gq(a, c) {
        try {
          delete a[c];
        } catch (b) {
          a[c] = void 0;
        }
      }
      function Sc(a) {
        var c = $a(a);
        return c ? C([a, c], Hq) : !1;
      }
      function Hq(a, c, b, d) {
        return new J(function (e, f) {
          var g = ac(a),
            h = c("img"),
            k = w(v(h, qc), v(Sa(d.ia), f)),
            l = Id(a, k, d.Oa || 3e3);
          h.onerror = k;
          h.onload = w(v(h, qc), v(null, e), C([a, l], ma));
          k = z({}, d.Za);
          delete k.wmode;
          h.src = oj(b, d, k);
          xd(a) &&
            (z(h.style, {
              position: "absolute",
              visibility: "hidden",
              width: "0px",
              height: "0px",
            }),
            g.appendChild(h));
        });
      }
      function Eq(a, c, b, d) {
        var e,
          f = z(d.yb ? ((e = {}), (e.wmode = "7"), e) : {}, d.Za),
          g = c || { signal: void 0, abort: F },
          h = a.fetch(b + "?" + zc(f), {
            method: d.$c,
            body: d.ca,
            credentials: !1 === d.Ie ? "omit" : "include",
            headers: d.Xa,
            signal: g.signal,
          }),
          k = v(d.ia, Sa);
        return new J(function (l, m) {
          d.Oa &&
            Id(
              a,
              function () {
                try {
                  g.abort();
                } catch (p) {}
                m(k());
              },
              d.Oa
            );
          return h
            .then(function (p) {
              if (!p.ok) {
                if (d.le) return Wa(pj(p));
                be(d.ia);
              }
              return d.le ? p.text() : d.yb ? p.json() : null;
            })
            .then(l)
            ["catch"](v(k(), m));
        });
      }
      function Cb(a) {
        var c;
        if ((c = n(a, "XMLHttpRequest")))
          if ((c = "withCredentials" in new a.XMLHttpRequest())) {
            a: {
              if (
                Iq.test(a.location.host) &&
                a.opera &&
                T(a.opera.version) &&
                ((c = a.opera.version()),
                "string" === typeof c && "12" === c.split(".")[0])
              ) {
                c = !0;
                break a;
              }
              c = !1;
            }
            c = !c;
          }
        return c ? v(a, Jq) : !1;
      }
      function Jq(a, c, b) {
        var d,
          e = new a.XMLHttpRequest(),
          f = b.ca,
          g = z(b.yb ? ((d = {}), (d.wmode = "7"), d) : {}, b.Za);
        return new J(function (h, k) {
          e.open(b.$c || "GET", c + "?" + zc(g), !0);
          e.withCredentials = !1 !== b.Ie;
          b.Oa && (e.timeout = b.Oa);
          qj(
            La,
            zb(function (m) {
              e.setRequestHeader(m[0], m[1]);
            })
          )(b.Xa);
          var l = C([a, e, Sa(b.ia), b.yb, b.le, h, k], Kq);
          e.onreadystatechange = l;
          try {
            e.send(f);
          } catch (m) {}
        });
      }
      function Kq(a, c, b, d, e, f, g, h) {
        if (4 === c.readyState)
          if ((200 === c.status || e || g(b), e))
            200 === c.status ? f(c.responseText) : g(pj(c));
          else {
            e = null;
            if (d)
              try {
                (e = wb(a, c.responseText)) || g(b);
              } catch (k) {
                g(b);
              }
            f(e);
          }
        return h;
      }
      function oj(a, c, b) {
        (b = zc(b)) && (a += "?" + b);
        c.ca && (a += (b ? "&" : "?") + c.ca);
        return a;
      }
      function Lq(a, c, b) {
        var d = A(Qc, Sb[c] || Tb);
        y(function (e) {
          return d.unshift(e);
        }, eg);
        return A(w(Tc([a, b]), ha), d);
      }
      function rj(a, c) {
        var b = Q(a),
          d = b.href,
          e = b.host,
          f = -1;
        if (!ja(c) || V(c)) return d;
        b = c.replace(sj, "");
        if (-1 !== b.search(Mq)) return b;
        var g = b.charAt(0);
        if (
          ("?" === g && ((f = d.search(/\?/)), -1 === f)) ||
          ("#" === g && ((f = d.search(/#/)), -1 === f))
        )
          return d + b;
        if (-1 !== f) return d.substr(0, f) + b;
        if ("/" === g) {
          if (((f = d.indexOf(e)), -1 !== f))
            return d.substr(0, f + e.length) + b;
        } else return (d = d.split("/")), (d[d.length - 1] = b), I("/", d);
        return "";
      }
      function Je(a, c) {
        return {
          N: function (b, d) {
            var e = tj(c);
            e = C([b, e, d], Nq);
            Oq(a, c, e);
          },
          ra: function (b, d) {
            var e = b.K,
              f = tj(c);
            if (e) {
              var g = f.va;
              f.Xe === e && g && (y(ha, g), (f.va = null));
            }
            d();
          },
        };
      }
      function Nq(a, c, b) {
        var d = a.K;
        d ? (Qf(a) ? ((c.Xe = d), b()) : c.va ? c.va.push(b) : b()) : b();
      }
      function Qf(a) {
        return (a = a.K) && a.C("pv") && !a.C("ar");
      }
      function Oq(a, c, b) {
        if (Ke(a) && fb(a)) {
          var d = Pq(c);
          if (!d.Th) {
            d.Th = !0;
            c = jd(a, c);
            if (!c) {
              b();
              return;
            }
            d.va = [];
            var e = function () {
              d.va && (y(ha, d.va), (d.va = null));
            };
            R(a, e, 3e3);
            c.$.F(["initToChild"], e);
          }
          d.va ? d.va.push(b) : b();
        } else b();
      }
      function uj(a, c) {
        return {
          N: function (b, d) {
            var e = b.K;
            if (e && (!c || c.Sf)) {
              var f = a.document.title;
              b.M && b.M.title && (f = b.M.title);
              var g = ic("getElementsByTagName", a.document);
              "string" !== typeof f &&
                g &&
                ((f = g("title")), (f = (f = n(f, "0.innerHtml")) ? f : ""));
              f = f.slice(0, Ga.sg);
              e.D("t", f);
            }
            d();
          },
        };
      }
      function Lb(a) {
        return function (c, b) {
          return {
            N: function (d, e) {
              var f = d.K,
                g = d.J;
              f &&
                g &&
                y(function (h) {
                  var k = Jd[h],
                    l = "bi",
                    m = f;
                  k || ((k = fg[h]), (l = "tel"), (m = je(d)));
                  k && ((k = B(l + ":" + h, k, null)(c, b, d)), m.Vb(h, k));
                }, a || Qq());
              e();
            },
          };
        };
      }
      function Rq(a, c) {
        var b = Kd(a);
        c.F(["initToParent"], function (d) {
          var e = d[0];
          d = d[1];
          window.window &&
            (b.children[d.counterId] = { info: d, window: e.source });
        })
          .F(["initToChild"], function (d) {
            var e = d[0];
            d = d[1];
            e.source === a.parent && c.T("parentConnect", [e, d]);
          })
          .F(["parentConnect"], function (d) {
            var e = d[1];
            e.counterId &&
              (b.Ga[e.counterId] = { info: e, window: d[0].source });
          });
      }
      function Sq(a) {
        if (Ha("MutationObserver", a.MutationObserver)) {
          var c = Kd(a).children,
            b = new a.MutationObserver(function () {
              y(function (d) {
                n(c[d], "window.window") || delete c[d];
              }, ca(c));
            });
          Jb(a)(
            Pa(F, function () {
              b.observe(a.document.body, { subtree: !0, childList: !0 });
            })
          );
        }
      }
      function Tq(a, c) {
        return function (b, d) {
          var e,
            f = { qc: fa(a)(Y), key: a.Math.random(), dir: 0 };
          b.length &&
            ((f.qc = Da(b[0])), (f.key = parseFloat(b[1])), (f.dir = Da(b[2])));
          z(d, c);
          var g =
            ((e = { data: d }),
            (e.__yminfo = I(":", ["__yminfo", f.qc, f.key, f.dir])),
            e);
          return { meta: f, $f: mb(a, g) || "" };
        };
      }
      function Jb(a, c) {
        function b(e) {
          n(c, d) ? e() : R(a, v(e, b), 100);
        }
        void 0 === c && (c = a);
        var d = (c.nodeType ? "contentWindow." : "") + "document.body";
        return Ba(function (e, f) {
          b(f);
        });
      }
      function Ld(a, c) {
        var b = c.Sd,
          d = b || "uid";
        b = b ? a.location.hostname : void 0;
        var e = ec(a),
          f = Oa(a),
          g = fa(a)(gg),
          h = vj(a, c),
          k = h[0];
        h = h[1];
        var l = e.C("d");
        wj(a, c);
        var m = !1;
        !h && k && ((h = k), (m = !0));
        if (!h) (h = I("", [g, Ua(a, 1e6, 999999999)])), (m = !0);
        else if (!l || 15768e3 < g - Da(l)) m = !0;
        m && !c.Sa && (e.D(d, h, 525600, b), e.D("d", "" + g, 525600, b));
        f.D(d, h);
        return h;
      }
      function Uq(a, c) {
        return !c.Sa && wj(a, c);
      }
      function vj(a, c) {
        var b = Oa(a),
          d = ec(a),
          e = c.Sd || "uid";
        return [b.C(e), d.C(e)];
      }
      function wc(a) {
        var c = H(a),
          b = c.C("hitId");
        b || ((b = Ua(a)), c.D("hitId", b));
        return b;
      }
      function fe(a, c, b) {
        var d = Ma(c);
        return d && Zi(a, c, ta(["p", Vq[d], "c"]), Sf, b);
      }
      function ee(a, c) {
        var b = hc(hg, a, c);
        if (!b) {
          var d = hc("div", a, c);
          d && (qb(hg + ",div", d).length || (b = d));
        }
        return b;
      }
      function Zi(a, c, b, d, e) {
        return K(
          function (f, g) {
            var h = null;
            g in xj
              ? (h = c.getAttribute && c.getAttribute(xj[g]))
              : g in Uc &&
                (h =
                  "p" === g
                    ? Uc[g](a, c, e)
                    : "c" === g
                    ? Uc[g](a, c, d)
                    : Uc[g](a, c));
            h &&
              ((h = h.slice(0, yj[g] || 100)), (f[g] = ig[g] ? "" + bc(h) : h));
            return f;
          },
          {},
          b
        );
      }
      function Wh(a, c, b) {
        if (Md(a)) return Aa(b.querySelectorAll(c));
        var d = zj(c.split(" "), b);
        return la(function (e, f) {
          return Rb(a)(e, d) === f;
        }, d);
      }
      function zj(a, c) {
        var b = ra([], a),
          d = b.shift();
        if (!d) return [];
        d = c.getElementsByTagName(d);
        return b.length ? pc(v(b, zj), Aa(d)) : Aa(d);
      }
      function Yb(a, c) {
        if (c.querySelector) return c.querySelector(a);
        var b = qb(a, c);
        return b && b.length ? b[0] : null;
      }
      function qb(a, c) {
        if (!c || !c.querySelectorAll) return [];
        var b = c.querySelectorAll(a);
        return b ? Aa(b) : [];
      }
      function bj(a) {
        var c = null;
        try {
          c = a.target || a.srcElement;
        } catch (b) {}
        if (c) {
          3 === c.nodeType && (c = c.parentNode);
          for (
            a = c && c.nodeName && ("" + c.nodeName).toLowerCase();
            n(c, "parentNode.nodeName") &&
            (("a" !== a && "area" !== a) ||
              (!c.href && !c.getAttribute("xlink:href")));

          )
            a =
              (c = c.parentNode) &&
              c.nodeName &&
              ("" + c.nodeName).toLowerCase();
          return c.href ? c : null;
        }
        return null;
      }
      function rc(a, c) {
        var b = a.document,
          d = z({ type: "text/javascript", charset: "utf-8", async: !0 }, c),
          e = $a(a);
        if (e) {
          var f = e("script");
          qj(
            La,
            zb(function (l) {
              var m = l[0];
              l = l[1];
              "async" === m && l ? (f.async = !0) : (f[m] = l);
            })
          )(d);
          try {
            var g = ic("getElementsByTagName", b),
              h = g("head")[0];
            if (!h) {
              var k = g("html")[0];
              h = e("head");
              k && k.appendChild(h);
            }
            h.insertBefore(f, h.firstChild);
            return f;
          } catch (l) {}
        }
      }
      function Rh(a, c) {
        var b = Aj(a);
        L(c, b.qb) &&
          ((b.qb = la(w(za(c), Ac), b.qb)),
          b.qb.length || (qc(b.hb), (b.hb = null)));
      }
      function Qh(a, c, b) {
        var d = Aj(c);
        L(b, d.qb) || d.qb.push(b);
        if (Ta(d.hb)) {
          b = $a(a);
          if (!b) return null;
          b = b("iframe");
          z(b.style, {
            display: "none",
            width: "1px",
            height: "1px",
            visibility: "hidden",
          });
          b.src = c;
          a = ac(a);
          if (!a) return null;
          a.appendChild(b);
          d.hb = b;
        } else
          (a = n(d.hb, "contentWindow")) && a.postMessage("frameReinit", "*");
        return d.hb;
      }
      function Wq(a, c) {
        var b = da(a) ? a : [a];
        c = c || document;
        if (c.querySelectorAll) {
          var d = I(
            ", ",
            A(function (e) {
              return "." + e;
            }, b)
          );
          return Aa(c.querySelectorAll(d));
        }
        if (c.getElementsByClassName)
          return pc(w(Fa("getElementsByClassName", c), Aa), b);
        d = c.getElementsByTagName("*");
        b = "(" + I("|", b) + ")";
        return la(v(b, dc), Aa(d));
      }
      function mf(a, c, b) {
        for (
          var d = "", e = Ae(), f = Ma(c) || "*";
          c && c.parentNode && !L(f, ["BODY", "HTML"]);

        )
          (d += e[f] || "*"),
            (d += Bj(a, c, b) || ""),
            (c = c.parentElement),
            (f = Ma(c) || "*");
        return nb(d, 128);
      }
      function Bj(a, c, b) {
        if ((a = Le(a, c))) {
          a = a.childNodes;
          for (var d = c && c.nodeName, e = 0, f = 0; f < a.length; f += 1)
            if (d === (a[f] && a[f].nodeName)) {
              if (c === a[f]) return e;
              (b && a[f] === b) || (e += 1);
            }
        }
        return 0;
      }
      function Le(a, c) {
        var b = n(a, "document");
        return c && c !== b.documentElement
          ? c === Bc(a)
            ? b.documentElement
            : n(c, "parentNode")
          : null;
      }
      function If(a, c) {
        var b = jg(a, c),
          d = b.left;
        b = b.top;
        var e = Me(a, c);
        return [d, b, e[0], e[1]];
      }
      function Me(a, c) {
        var b = n(a, "document");
        if (c === Bc(a) || c === b.documentElement) {
          b = ac(a);
          var d = Hc(a);
          return [
            Math.max(b.scrollWidth, d[0]),
            Math.max(b.scrollHeight, d[1]),
          ];
        }
        return (b = Gc(c))
          ? [b.width, b.height]
          : [c.offsetWidth, c.offsetHeight];
      }
      function jg(a, c) {
        var b = c,
          d = n(a, "document"),
          e = Ma(b);
        if (
          !b ||
          !b.ownerDocument ||
          "PARAM" === e ||
          b === Bc(a) ||
          b === d.documentElement
        )
          return { left: 0, top: 0 };
        if ((d = Gc(b)))
          return (
            (b = Vf(a)),
            { left: Math.round(d.left + b.x), top: Math.round(d.top + b.y) }
          );
        for (e = d = 0; b; )
          (d += b.offsetLeft), (e += b.offsetTop), (b = b.offsetParent);
        return { left: d, top: e };
      }
      function hc(a, c, b) {
        if (!(c && c.Element && c.Element.prototype && c.document && b))
          return null;
        if (
          c.Element.prototype.closest &&
          Ha("closest", c.Element.prototype.closest) &&
          b.closest
        )
          return b.closest(a);
        var d = ci(c);
        if (d) {
          for (; b && 1 === b.nodeType && !d.call(b, a); )
            b = b.parentElement || b.parentNode;
          return b && 1 === b.nodeType ? b : null;
        }
        if (Md(c)) {
          for (
            a = Aa((c.document || c.ownerDocument).querySelectorAll(a));
            b && 1 === b.nodeType && -1 === Rb(c)(b, a);

          )
            b = b.parentElement || b.parentNode;
          return b && 1 === b.nodeType ? b : null;
        }
        return null;
      }
      function Md(a) {
        return !(
          !Ha("querySelectorAll", n(a, "Element.prototype.querySelectorAll")) ||
          !a.document.querySelectorAll
        );
      }
      function qh(a, c, b) {
        var d = c.top,
          e = c.bottom,
          f = c.left,
          g = b.w;
        b = b.h;
        a = a.Math;
        c = a.min(a.max(c.right, 0), g) - a.min(a.max(f, 0), g);
        return (a.min(a.max(e, 0), b) - a.min(a.max(d, 0), b)) * c;
      }
      function Cj(a) {
        return Ne(a) && !ab(za(a.type), Xq)
          ? Oe(a)
            ? !a.checked
            : !a.value
          : Yq(a)
          ? !a.value
          : Zq(a)
          ? 0 > a.selectedIndex
          : !0;
      }
      function Ma(a) {
        if (a)
          try {
            var c = a.nodeName;
            if (ja(c)) return c;
            c = a.tagName;
            if (ja(c)) return c;
          } catch (b) {}
      }
      function Dj(a, c) {
        var b = a.document.getElementsByTagName("form");
        return Rb(a)(c, Aa(b));
      }
      function $q(a, c, b) {
        b = ic("dispatchEvent", b || a.document);
        var d = null,
          e = n(a, "Event.prototype.constructor");
        if (
          e &&
          (Ha("(Event|Object|constructor)", e) ||
            (kg(a) && "[object Event]" === "" + e))
        )
          try {
            d = new a.Event(c);
          } catch (f) {
            if ((a = ic("createEvent", n(a, "document"))) && T(a)) {
              try {
                d = a(c);
              } catch (g) {}
              d && d.initEvent && d.initEvent(c, !1, !1);
            }
          }
        d && b(d);
      }
      function Gc(a) {
        try {
          return a.getBoundingClientRect && a.getBoundingClientRect();
        } catch (c) {
          return "object" === typeof c &&
            null !== c &&
            16389 === (c.xf && c.xf & 65535)
            ? { top: 0, bottom: 0, left: 0, width: 0, height: 0, right: 0 }
            : null;
        }
      }
      function Vf(a) {
        var c = Bc(a),
          b = n(a, "document");
        return {
          x:
            a.pageXOffset ||
            (b.documentElement && b.documentElement.scrollLeft) ||
            (c && c.scrollLeft) ||
            0,
          y:
            a.pageYOffset ||
            (b.documentElement && b.documentElement.scrollTop) ||
            (c && c.scrollTop) ||
            0,
        };
      }
      function Hc(a) {
        var c = he(a);
        if (c) {
          var b = c[2];
          return [a.Math.round(c[0] * b), a.Math.round(c[1] * b)];
        }
        c = ac(a);
        return [
          n(c, "clientWidth") || a.innerWidth,
          n(c, "clientHeight") || a.innerHeight,
        ];
      }
      function he(a) {
        var c = n(a, "visualViewport.width"),
          b = n(a, "visualViewport.height");
        a = n(a, "visualViewport.scale");
        return ka(c) || ka(b) ? null : [Math.floor(c), Math.floor(b), a];
      }
      function ac(a) {
        var c = n(a, "document") || {},
          b = c.documentElement;
        return "CSS1Compat" === c.compatMode ? b : Bc(a) || b;
      }
      function Bc(a) {
        a = n(a, "document");
        try {
          return a.getElementsByTagName("body")[0];
        } catch (c) {
          return null;
        }
      }
      function dc(a, c) {
        try {
          return new RegExp("(?:^|\\s)" + a + "(?:\\s|$)").test(c.className);
        } catch (b) {
          return !1;
        }
      }
      function Cc(a) {
        var c;
        try {
          if ((c = a.target || a.srcElement))
            !c.ownerDocument && c.documentElement
              ? (c = c.documentElement)
              : c.ownerDocument !== document && (c = null);
        } catch (b) {}
        return c;
      }
      function qc(a) {
        var c = a && a.parentNode;
        c && c.removeChild(a);
      }
      function Hb(a) {
        return a ? a.innerText || "" : "";
      }
      function Lf(a) {
        if (ka(a)) return !1;
        a = a.nodeType;
        return 3 === a || 8 === a;
      }
      function Ej(a, c, b) {
        void 0 === c && (c = "");
        void 0 === b && (b = "_ym");
        var d = "" + b + c;
        d && (d += "_");
        return {
          Ld: ar(a),
          C: function (e, f) {
            var g = Fj(a, "" + d + e);
            return Ta(g) && !V(f) ? f : g;
          },
          D: function (e, f) {
            Gj(a, "" + d + e, f);
            return this;
          },
          Eb: function (e) {
            Hj(a, "" + d + e);
            return this;
          },
        };
      }
      function Gj(a, c, b) {
        var d = lg(a);
        a = mb(a, b);
        if (!Ta(a))
          try {
            d.setItem(c, a);
          } catch (e) {}
      }
      function Fj(a, c) {
        var b = lg(a);
        try {
          return wb(a, b.getItem(c));
        } catch (d) {}
        return null;
      }
      function Hj(a, c) {
        var b = lg(a);
        try {
          b.removeItem(c);
        } catch (d) {}
      }
      function lg(a) {
        try {
          return a.localStorage;
        } catch (c) {}
        return null;
      }
      function mb(a, c, b) {
        try {
          return a.JSON.stringify(c, null, b);
        } catch (d) {
          return null;
        }
      }
      function je(a, c, b) {
        void 0 === b && (b = null);
        a.Ia || (a.Ia = nf());
        c && a.Ia.Vb(c, b);
        return a.Ia;
      }
      function Pe(a) {
        return {
          N: function (c, b) {
            var d = a.document,
              e = c.K;
            if (e && mg(a)) {
              var f = ea(a),
                g = function (h) {
                  mg(a) || (f.Zb(d, Ij, g), b());
                  return h;
                };
              f.F(d, Ij, g);
              e.D("pr", "1");
            } else b();
          },
        };
      }
      function Nd(a) {
        return function (c, b, d) {
          return function (e, f) {
            var g = A(w(Qc, Tc([c, f]), ha), Jj[a] || []);
            g = ra(g, d);
            return Kj(c, b, g)(e);
          };
        };
      }
      function Kj(a, c, b) {
        var d = Ub(a, c);
        return function (e) {
          return Lj(b, e, !0)
            .then(function () {
              var f = e.ha || {},
                g = f.Kh,
                h = void 0 === g ? "" : g;
              g = f.Ca;
              var k = void 0 === g ? "" : g;
              f = f.Mh;
              f = A(
                function (l) {
                  return Ga.Qa + "//" + ("" + h + l || fc) + "/" + k;
                },
                void 0 === f ? [fc] : f
              );
              return d(e, f);
            })
            .then(function (f) {
              var g = f.Sc;
              f = f.jg;
              e.Ei = g;
              e.Fi = f;
              return Lj(b, e).then(v(g, P));
            });
        };
      }
      function Ub(a, c) {
        return function (b, d) {
          return Mj(a, c, d, b);
        };
      }
      function Mj(a, c, b, d, e, f) {
        var g;
        void 0 === e && (e = 0);
        void 0 === f && (f = 0);
        var h = z({ ia: [] }, d.aa),
          k = c[f],
          l = k[0];
        k = k[1];
        var m = b[e];
        (h.Xa && h.Xa["Content-Type"]) ||
          !h.ca ||
          ((h.Xa = z(
            {},
            h.Xa,
            ((g = {}),
            (g["Content-Type"] = "application/x-www-form-urlencoded"),
            g)
          )),
          (h.ca = "site-info=" + pe(h.ca)));
        h.$c = h.ca ? "POST" : "GET";
        h.Za = br(a, d, l);
        h.Ca = (d.ha || {}).Ca;
        h.ia.push(l);
        z(d.aa, h);
        g = "" + m + (d.Pc && d.Pc.ii ? "/1" : "");
        var p = 0;
        p = cr(a, g, h);
        return k(g, h)
          .then(function (q) {
            var r = p,
              t,
              u;
            pb(
              a,
              ((t = {}),
              (t.name = "requestSuccess"),
              (t.data = ((u = {}), (u.body = q), (u.requestId = r), u)),
              t)
            );
            return { Sc: q, jg: e };
          })
          ["catch"](function (q) {
            var r = p,
              t,
              u;
            pb(
              a,
              ((t = {}),
              (t.name = "requestFail"),
              (t.data = ((u = {}), (u.error = q), (u.requestId = r), u)),
              t)
            );
            r = f + 1 >= c.length;
            t = e + 1 >= b.length;
            r && t && Wa(q);
            return Mj(a, c, b, d, !t && r ? e + 1 : e, r ? 0 : f + 1);
          });
      }
      function br(a, c, b) {
        var d = z({}, c.J);
        a = fa(a);
        c.K && (d["browser-info"] = Ja(c.K.l()).D("st", a(gg)).Ha());
        !d.t && (c = c.Ia) && (c.D("ti", b), (d.t = c.Ha()));
        return d;
      }
      function cr(a, c, b) {
        var d,
          e,
          f,
          g = Ua(a),
          h = b.ia,
          k = b.ca,
          l = b.Xa,
          m = b.Za;
        b = b.$c;
        pb(
          a,
          ((d = {}),
          (d.name = "request"),
          (d.data =
            ((e = {}),
            (e.url = c),
            (e.requestId = g),
            (e.senderParams =
              ((f = {}),
              (f.rBody = k),
              (f.debugStack = h),
              (f.rHeaders = l),
              (f.rQuery = m),
              (f.verb = b),
              f)),
            e)),
          d)
        );
        return g;
      }
      function Nj(a, c, b, d) {
        a[c] || (a[c] = []);
        b && !ka(d) && Oj(a[c], b, d);
      }
      function Oj(a, c, b) {
        for (var d = [c, b], e = -1e4, f = 0; f < a.length; f += 1) {
          var g = a[f],
            h = g[0];
          g = g[1];
          if (b === g && h === c) return;
          if (b < g && b >= e) {
            a.splice(f, 0, d);
            return;
          }
          e = g;
        }
        a.push(d);
      }
      function Lj(a, c, b) {
        void 0 === b && (b = !1);
        return new J(function (d, e) {
          function f(k, l) {
            l();
            d();
          }
          var g = a.slice();
          g.push({ N: f, ra: f });
          var h = $b(g, function (k, l) {
            var m = b ? k.N : k.ra;
            if (m)
              try {
                m(c, l);
              } catch (p) {
                h(dr), e(p);
              }
            else l();
          });
          h(Pj);
        });
      }
      function Ob(a, c, b) {
        var d = b || "as";
        if (a.postMessage && !a.attachEvent) {
          b = ea(a);
          var e = "__ym__promise_" + Ua(a) + "_" + Ua(a),
            f = F;
          d = E(a, d, function (g) {
            try {
              var h = g.data;
            } catch (k) {
              return;
            }
            h === e && (f(), g.stopPropagation && g.stopPropagation(), c());
          });
          f = b.F(a, ["message"], d);
          a.postMessage(e, "*");
        } else R(a, c, 0, d);
      }
      function nh(a, c, b, d, e) {
        void 0 === d && (d = 1);
        void 0 === e && (e = "itc");
        c = $b(c, b);
        hd(a, c, d)(Pa(E(a, e), F));
      }
      function hd(a, c, b, d) {
        void 0 === b && (b = 1);
        void 0 === d && (d = Qj);
        ng = Infinity === b;
        return Ba(function (e, f) {
          function g() {
            try {
              var k = c(d(a, b));
              h = h.concat(k);
            } catch (l) {
              return e(l);
            }
            c(er);
            if (c(Od)) return f(h), Rj(a);
            ng ? (c(d(a, 1e4)), f(h), Rj(a)) : R(a, g, 100);
          }
          var h = [];
          fr(g);
        });
      }
      function Rj(a) {
        if (og.length) {
          var c = og.shift();
          ng ? c() : R(a, c, 100);
        } else pg = !1;
      }
      function fr(a) {
        pg ? og.push(a) : ((pg = !0), a());
      }
      function Bf(a) {
        return Ba(function (c, b) {
          b(a);
        });
      }
      function ip(a) {
        return Ba(function (c, b) {
          a.then(b, c);
        });
      }
      function gr(a) {
        var c = [],
          b = 0;
        return Ba(function (d, e) {
          y(function (f, g) {
            f(
              Pa(d, function (h) {
                try {
                  (c[g] = h), (b += 1), b === a.length && e(c);
                } catch (k) {
                  d(k);
                }
              })
            );
          }, a);
        });
      }
      function hp(a) {
        var c = [],
          b = !1;
        return Ba(function (d, e) {
          function f(g) {
            c.push(g) === a.length && d(c);
          }
          y(function (g) {
            g(
              Pa(f, function (h) {
                if (!b)
                  try {
                    e(h), (b = !0);
                  } catch (k) {
                    f(k);
                  }
              })
            );
          }, a);
        });
      }
      function Pa(a, c) {
        return function (b) {
          return b(a, c);
        };
      }
      function $b(a, c) {
        return Ba({ Ra: a, Od: c || P, ve: !1, xa: 0 });
      }
      function Pj(a) {
        function c() {
          function d() {
            b = !0;
            a.xa += 1;
          }
          b = !1;
          a.Od(a.Ra[a.xa], function () {
            d();
          });
          b || ((a.xa += 1), (d = v(a, Pj)));
        }
        for (var b = !0; !Od(a) && b; ) c();
      }
      function Qj(a, c) {
        return function (b) {
          var d = fa(a),
            e = d(Y);
          return Sj(function (f, g) {
            d(Y) - e >= c && g(Tj);
          })(b);
        };
      }
      function qg(a, c) {
        return function (b) {
          var d = fa(a),
            e = d(Y);
          return rg(function (f) {
            d(Y) - e >= c && Tj(f);
          })(b);
        };
      }
      function rg(a) {
        return function (c) {
          for (var b; c.Ra.length && !Od(c); )
            (b = c.Ra.pop()), (b = c.Od(b, c.Ra)), a(c);
          return b;
        };
      }
      function hr(a) {
        Od(a) && Wa(Fc("i"));
        var c = a.Od(a.Ra[a.xa]);
        a.xa += 1;
        return c;
      }
      function er(a) {
        a.ve = !1;
      }
      function Tj(a) {
        a.ve = !0;
      }
      function dr(a) {
        a.xa = a.Ra.length;
      }
      function Od(a) {
        return a.ve || a.Ra.length <= a.xa;
      }
      function yb(a) {
        a = fa(a);
        return Math.round(a(Uj) / 50);
      }
      function Uj(a) {
        var c = a.Ba,
          b = c[1];
        a = c[0] && b ? b() : Y(a) - a.Nh;
        return Math.round(a);
      }
      function gg(a) {
        return Math.round(Y(a) / 1e3);
      }
      function lb(a) {
        return Math.floor(Y(a) / 1e3 / 60);
      }
      function Y(a) {
        var c = a.De;
        return 0 !== c ? c : sg(a.l, a.Ba);
      }
      function bg(a) {
        var c = ea(a),
          b = Vj(a),
          d = { l: a, De: 0, Ba: b, Nh: sg(a, b) },
          e = b[1];
        (b[0] && e) ||
          c.F(a, ["beforeunload", "unload"], function () {
            0 === d.De && (d.De = sg(a, d.Ba));
          });
        return Ba(d);
      }
      function ir(a) {
        return (10 > a ? "0" : "") + a;
      }
      function Ji(a, c, b) {
        function d() {
          f = 0;
          g && ((g = !1), (f = R(a, d, b)), e.T(h));
        }
        var e = Cd(a),
          f,
          g = !1,
          h;
        c.F(function (k) {
          g = !0;
          h = k;
          f || d();
          return F;
        });
        return e;
      }
      function jr(a, c) {
        return a.clearInterval(c);
      }
      function kr(a, c, b, d) {
        return a.setInterval(E(a, "i.err." + (d || "def"), c), b);
      }
      function R(a, c, b, d) {
        return Id(a, E(a, "d.err." + (d || "def"), c), b);
      }
      function md(a) {
        var c = {};
        return {
          F: function (b, d) {
            y(function (e) {
              n(c, e) || (c[e] = Cd(a));
              c[e].F(d);
            }, b);
            return this;
          },
          ga: function (b, d) {
            y(function (e) {
              n(c, e) && c[e].ga(d);
            }, b);
            return this;
          },
          T: function (b, d) {
            return n(c, b) ? E(a, "e." + d, c[b].T)(d) : [];
          },
        };
      }
      function Cd(a) {
        var c = [],
          b = {};
        b.Ej = c;
        b.F = w(Fa("push", c), v(b, P));
        b.ga = w(Db(Rb(a))(c), Db(Fa("splice", c))(1), v(b, P));
        b.T = w(P, Db(ha), lr(c));
        return b;
      }
      function Wj(a, c, b, d, e, f) {
        a = mr(a);
        var g = a.F,
          h = a.ga;
        f = f ? h : g;
        if (c[f])
          if (a.Oi) c[f](b, d, e);
          else c[f]("on" + b, d);
      }
      function B(a, c, b) {
        return function () {
          return E(arguments[0], a, c, b).apply(this, arguments);
        };
      }
      function E(a, c, b, d, e) {
        var f = Wa,
          g = b || f;
        return function () {
          var h = d;
          try {
            h = g.apply(e || null, arguments);
          } catch (k) {
            ve(a, c, k);
          }
          return h;
        };
      }
      function sg(a, c) {
        var b = c || Vj(a),
          d = b[0];
        b = b[1];
        return !isNaN(d) && T(b)
          ? Math.round(b() + d)
          : a.Date.now
          ? a.Date.now()
          : new a.Date().getTime();
      }
      function Vj(a) {
        a = vd(a);
        var c = n(a, "timing.navigationStart"),
          b = n(a, "now");
        b && (b = G(b, a));
        return [c, b];
      }
      function vd(a) {
        return n(a, "performance") || n(a, "webkitPerformance");
      }
      function ve(a, c, b) {
        var d = "u.a.e",
          e = "";
        b &&
          ("object" === typeof b
            ? (b.unk && Wa(b),
              (d = b.message),
              (e =
                ("string" === typeof b.stack &&
                  b.stack.replace(/\n/g, "\\n")) ||
                "n.s.e.s"))
            : (d = "" + b));
        nr(d) ||
          ab(v(d, Za), or) ||
          (pr(d) && 0.1 <= a.Math.random()) ||
          y(w(P, Tc(["jserrs", d, c, e]), ha), Xj);
      }
      function be() {
        var a = Ia(arguments);
        return Wa(Sa(a));
      }
      function Sa(a) {
        var c = "";
        da(a) ? (c = I(".", a)) : ja(a) && (c = a);
        return Fc("err.kn(" + Ga.cc + ")" + c);
      }
      function pj(a) {
        return Fc(
          "http." +
            a.status +
            ".st." +
            a.statusText +
            ".rt." +
            ("" + a.responseText).substring(0, 50)
        );
      }
      function qr(a) {
        this.message = a;
      }
      function pb(a, c) {
        if (Qe(a)) {
          var b = c.oa;
          if (b) {
            var d = b.split(":");
            b = d[1];
            d = Yj(uf(d[0]));
            if ("1" === b || d) return;
          }
          b = rr(a);
          1e3 === b.length && b.shift();
          b.push(c);
        }
      }
      function Re(a, c) {
        return -1 < Q(a).href.indexOf("_ym_debug=" + c);
      }
      function di(a, c, b) {
        tg(a, "metrika_enabled", "1", 0, c, b, !0);
        var d = Zj(a);
        (d = d && d.metrika_enabled) && ak(a, "metrika_enabled", c, b, !0);
        return !!d;
      }
      function tg(a, c, b, d, e, f, g) {
        void 0 === g && (g = !1);
        if (ei(a, ue, c)) {
          var h = c + "=" + encodeURIComponent(b) + ";";
          h += "" + sr(a);
          if (d) {
            var k = new Date();
            k.setTime(k.getTime() + 6e4 * d);
            h += "expires=" + k.toUTCString() + ";";
          }
          e && ((d = e.replace(tr, "")), (h += "domain=" + d + ";"));
          try {
            (a.document.cookie = h + ("path=" + (f || "/"))),
              g || (bk(a)[c] = b);
          } catch (l) {}
        }
      }
      function ue(a, c) {
        var b = bk(a);
        return b ? b[c] || null : null;
      }
      function Zj(a) {
        try {
          var c = a.document.cookie;
          if (!ka(c)) {
            var b = {};
            y(function (d) {
              d = d.split("=");
              var e = d[1];
              b[nb(d[0])] = nb(ck(e));
            }, (c || "").split(";"));
            return b;
          }
        } catch (d) {}
        return null;
      }
      function ei(a, c, b) {
        return !ug.length || L(b, Pd)
          ? !0
          : K(
              function (d, e) {
                return d && e(a, c, b);
              },
              !0,
              ug
            );
      }
      function zc(a) {
        return a
          ? w(
              La,
              Tf(function (c, b) {
                var d = b[0],
                  e = b[1];
                V(e) || ka(e) || c.push(d + "=" + pe(e));
                return c;
              }, []),
              wd("&")
            )(a)
          : "";
      }
      function ur(a) {
        return a
          ? w(
              zb(function (c) {
                c = c.split("=");
                var b = c[1];
                return [c[0], ka(b) ? void 0 : ck(b)];
              }),
              Tf(function (c, b) {
                c[b[0]] = b[1];
                return c;
              }, {})
            )(a.split("&"))
          : {};
      }
      function ck(a) {
        var c = "";
        try {
          c = decodeURIComponent(a);
        } catch (b) {}
        return c;
      }
      function pe(a) {
        try {
          return encodeURIComponent(a);
        } catch (c) {}
        a = I(
          "",
          la(function (c) {
            return 55296 >= c.charCodeAt(0);
          }, a.split(""))
        );
        return encodeURIComponent(a);
      }
      function nb(a, c) {
        if (a) {
          var b = dk ? dk.call(a) : ("" + a).replace(sj, "");
          return c && b.length > c ? b.substring(0, c) : b;
        }
        return "";
      }
      function kj(a) {
        var c = a.match(ek);
        if (c) {
          a = c[1];
          if ((c = c[2])) return L(c, vg) ? c : !1;
          if (a) return vg[0];
        }
        return !1;
      }
      function Q(a) {
        return K(
          function (c, b) {
            var d = n(a, "location." + b);
            c[b] = d ? "" + d : "";
            return c;
          },
          {},
          vr
        );
      }
      function fk(a) {
        return K(
          function (c, b) {
            c[ef[b[0]].ea] = b[1];
            return c;
          },
          {},
          La(a)
        );
      }
      function jc(a) {
        y(function (c) {
          var b = c[1];
          ef[c[0]] = { ea: b.ea, Ta: b.Ta };
        }, La(a));
      }
      function am(a, c, b, d, e) {
        var f = "object" === typeof a ? a : { id: a, ba: d, lc: e, R: b };
        a = K(
          function (g, h) {
            var k = h[1],
              l = k.Ta;
            k = f[k.ea];
            g[h[0]] = l ? l(k) : k;
            return g;
          },
          {},
          La(c)
        );
        fj(a, a.R || {});
        return a;
      }
      function wr(a) {
        a = M(a);
        return (kc[a] && kc[a].Vi) || null;
      }
      function gk(a) {
        a = M(a);
        return kc[a] && kc[a].Ui;
      }
      function fj(a, c) {
        var b = M(a),
          d = n(c, "__ym.turbo_page"),
          e = n(c, "__ym.turbo_page_id");
        kc[b] || (kc[b] = {});
        if (d || e) (kc[b].Ui = d), (kc[b].Vi = e);
      }
      function hk(a) {
        return (
          Se(a) || td(a) || /mobile/i.test(hb(a)) || !V(n(a, "orientation"))
        );
      }
      function rf(a, c) {
        if (Qd(a) && c) {
          var b = hb(a).match(wg);
          if (b && b.length) return +b[1] >= c;
        }
        return !1;
      }
      function sf(a, c) {
        var b = hb(a);
        return b && (b = b.match(xr)) && 1 < b.length ? Da(b[1]) >= c : !1;
      }
      function mg(a) {
        return L(
          "prerender",
          A(v(n(a, "document"), n), [
            "webkitVisibilityState",
            "visibilityState",
          ])
        );
      }
      function Ua(a, c, b) {
        var d = V(b);
        V(c) && d
          ? ((d = 1), (c = 1073741824))
          : d
          ? (d = 1)
          : ((d = c), (c = b));
        return a.Math.floor(a.Math.random() * (c - d)) + d;
      }
      function yr() {
        var a = Ia(arguments),
          c = a[0];
        for (a = a.slice(1); a.length; ) {
          var b = a.shift(),
            d;
          for (d in b) Oc(b, d) && (c[d] = b[d]);
          Oc(b, "toString") && (c.toString = b.toString);
        }
        return c;
      }
      function zr(a) {
        return function (c) {
          return c ? a(c) : [];
        };
      }
      function ik(a) {
        return V(a)
          ? []
          : xg(
              function (c, b) {
                c.push([b, a[b]]);
                return c;
              },
              [],
              jk(a)
            );
      }
      function jk(a) {
        var c = [],
          b;
        for (b in a) Oc(a, b) && c.push(b);
        return c;
      }
      function uf(a) {
        try {
          return parseInt(a, 10);
        } catch (c) {
          return null;
        }
      }
      function ye(a, c) {
        return (
          a.isFinite(c) &&
          !a.isNaN(c) &&
          "[object Number]" === Object.prototype.toString.call(c)
        );
      }
      function Ar(a) {
        for (var c = [], b = a.length - 1; 0 <= b; --b)
          c[a.length - 1 - b] = a[b];
        return c;
      }
      function ra(a, c) {
        y(w(P, Fa("push", a)), c);
        return a;
      }
      function yg(a, c) {
        return Array.prototype.sort.call(c, a);
      }
      function Gd(a) {
        return a.splice(0, a.length);
      }
      function Aa(a) {
        return a
          ? da(a)
            ? a
            : Te
            ? Te(a)
            : "number" === typeof a.length && 0 <= a.length
            ? kk(a)
            : []
          : [];
      }
      function Br(a, c) {
        for (var b = 0; b < c.length; b += 1)
          if (b in c && a.call(c, c[b], b)) return !0;
        return !1;
      }
      function Cr(a, c) {
        return K(
          function (b, d, e) {
            d = a(d, e);
            return b.concat(da(d) ? d : [d]);
          },
          [],
          c
        );
      }
      function lk(a, c) {
        return K(
          function (b, d, e) {
            b.push(a(d, e));
            return b;
          },
          [],
          c
        );
      }
      function Dr(a, c) {
        if (!Qd(a)) return !0;
        try {
          c.call({ 0: !0, length: -Math.pow(2, 32) + 1 }, function () {
            throw 1;
          });
        } catch (b) {
          return !1;
        }
        return !0;
      }
      function Er(a, c) {
        for (var b = "", d = 0; d < c.length; d += 1)
          b += "" + (d ? a : "") + c[d];
        return b;
      }
      function Fr(a, c) {
        return 1 <= mk(za(a), c).length;
      }
      function Gr(a, c) {
        for (var b = 0; b < c.length; b += 1)
          if (a.call(c, c[b], b)) return c[b];
      }
      function mk(a, c) {
        return xg(
          function (b, d, e) {
            a(d, e) && b.push(d);
            return b;
          },
          [],
          c
        );
      }
      function sd(a, c, b) {
        return b ? a : c;
      }
      function Hr(a, c) {
        return K(
          function (b, d, e) {
            return b ? !!a(d, e) : !1;
          },
          !0,
          c
        );
      }
      function Xf(a, c, b) {
        try {
          if (T(c)) {
            var d = Ia(arguments).slice(3);
            ka(b) ? c.apply(null, d) : c.apply(b, d);
          }
        } catch (e) {
          Id(a, v(e, Wa), 0);
        }
      }
      function Wa(a) {
        throw a;
      }
      function Id(a, c, b) {
        return ic("setTimeout", a)(c, b);
      }
      function ma(a, c) {
        return ic("clearTimeout", a)(c);
      }
      function Bd() {
        return [];
      }
      function Dc() {
        return {};
      }
      function ic(a, c) {
        var b = n(c, a),
          d = n(c, "constructor.prototype." + a) || b;
        try {
          if (d && d.apply)
            return function () {
              return d.apply(c, arguments);
            };
        } catch (e) {
          return b;
        }
        return d;
      }
      function rb(a, c, b) {
        return function () {
          var d = H(arguments[0]),
            e = b ? "global" : "m1200",
            f = d.C(e, {}),
            g = n(f, a);
          g || ((g = x(c)), (f[a] = g), d.D(e, f));
          return g.apply(null, arguments);
        };
      }
      function Kc(a, c) {
        void 0 === c && (c = {});
        if (!a || 1 > a.length) return c;
        K(
          function (b, d, e) {
            if (e === a.length - 1) return b;
            e === a.length - 2 ? (b[d] = a[e + 1]) : Oc(b, d) || (b[d] = {});
            return b[d];
          },
          c,
          a
        );
        return c;
      }
      function Rd(a) {
        a = a.Ya = a.Ya || {};
        var c = (a._metrika = a._metrika || {});
        return {
          Na: function (b, d) {
            zg.call(c, b) || (c[b] = d);
            return this;
          },
          D: function (b, d) {
            c[b] = d;
            return this;
          },
          C: function (b, d) {
            var e = c[b];
            return zg.call(c, b) || V(d) ? e : d;
          },
        };
      }
      function Oc(a, c) {
        return ka(a) ? !1 : zg.call(a, c);
      }
      function x(a, c) {
        var b = [],
          d = [];
        var e = c ? c : P;
        return function () {
          var f = Ia(arguments),
            g = e.apply(void 0, f),
            h = Ag(g, d);
          if (-1 !== h) return b[h];
          f = a.apply(void 0, f);
          b.push(f);
          d.push(g);
          return f;
        };
      }
      function Rb(a) {
        if (Bg) return Bg;
        var c = !1;
        try {
          c = [].indexOf && 0 === [void 0].indexOf(void 0);
        } catch (d) {}
        var b =
          a.Array &&
          a.Array.prototype &&
          na(a.Array.prototype.indexOf, "indexOf");
        a = void 0;
        return (Bg = a =
          c && b
            ? function (d, e) {
                return b.call(e, d);
              }
            : Ir);
      }
      function Ir(a, c) {
        for (var b = 0; b < c.length; b += 1) if (c[b] === a) return b;
        return -1;
      }
      function ha(a, c) {
        return c ? a(c) : a();
      }
      function w() {
        var a = Ia(arguments),
          c = a.shift();
        return function () {
          var b = c.apply(void 0, arguments);
          return K(nk, b, a);
        };
      }
      function Tf(a, c) {
        return C([a, c], K);
      }
      function xg(a, c, b) {
        for (var d = 0, e = b.length; d < e; ) (c = a(c, b[d], d)), (d += 1);
        return c;
      }
      function bb(a) {
        return Fa("test", a);
      }
      function Fa(a, c) {
        return G(c[a], c);
      }
      function v(a, c) {
        return G(c, null, a);
      }
      function C(a, c) {
        return G.apply(void 0, Cg([c, null], a));
      }
      function Jr(a) {
        return function () {
          var c = Ia(arguments);
          return a.apply(c[0], [c[1]].concat(c.slice(2)));
        };
      }
      function Kr() {
        var a = Ia(arguments),
          c = a[0],
          b = a[1],
          d = a.slice(2);
        return function () {
          var e = Cg(d, Ia(arguments));
          if (Function.prototype.call)
            return Function.prototype.call.apply(c, Cg([b], e));
          if (b) {
            for (var f = "_b"; b[f]; ) f += "_" + f.length;
            b[f] = c;
            e = b[f] && ok(f, e, b);
            delete b[f];
            return e;
          }
          return ok(c, e);
        };
      }
      function ok(a, c, b) {
        void 0 === c && (c = []);
        b = b || {};
        var d = c.length,
          e = a;
        T(e) && ((e = "d"), (b[e] = a));
        var f;
        d
          ? 1 === d
            ? (f = b[e](c[0]))
            : 2 === d
            ? (f = b[e](c[0], c[1]))
            : 3 === d
            ? (f = b[e](c[0], c[1], c[2]))
            : 4 === d && (f = b[e](c[0], c[1], c[2], c[3]))
          : (f = b[e]());
        return f;
      }
      function Ia(a) {
        if (Te)
          try {
            return Te(a);
          } catch (c) {}
        return kk(a);
      }
      function kk(a) {
        for (var c = a.length, b = [], d = 0; d < c; d += 1) b.push(a[d]);
        return b;
      }
      function va(a) {
        return (
          !Ta(a) &&
          !V(a) &&
          "[object Object]" === Object.prototype.toString.call(a)
        );
      }
      function ka(a) {
        return V(a) || Ta(a);
      }
      function T(a) {
        return "function" === typeof a;
      }
      function Db(a) {
        return function (c) {
          return function (b) {
            return a(b, c);
          };
        };
      }
      function oa(a) {
        return function (c) {
          return function (b) {
            return a(c, b);
          };
        };
      }
      function nk(a, c) {
        return c(a);
      }
      function mq(a) {
        return a
          .replace(/\^/g, "\\^")
          .replace(/\$/g, "\\$")
          .replace(ag, "\\.")
          .replace(/\[/g, "\\[")
          .replace(/\]/g, "\\]")
          .replace(/\|/g, "\\|")
          .replace(/\(/g, "\\(")
          .replace(/\)/g, "\\)")
          .replace(/\?/g, "\\?")
          .replace(/\*/g, "\\*")
          .replace(/\+/g, "\\+")
          .replace(/\{/g, "\\{")
          .replace(/\}/g, "\\}");
      }
      function Lr(a) {
        return "" + a;
      }
      function Za(a, c) {
        return !(!a || -1 === se(a, c));
      }
      function Mr(a, c) {
        for (var b = 0, d = a.length - c.length, e = 0; e < a.length; e += 1) {
          b = a[e] === c[b] ? b + 1 : 0;
          if (b === c.length) return e - c.length + 1;
          if (!b && e > d) break;
        }
        return -1;
      }
      function ja(a) {
        return "string" === typeof a;
      }
      function na(a, c) {
        return Ha(c, a) && a;
      }
      function Ha(a, c) {
        var b = Ue(a, c);
        c && !b && Dg.push([a, c]);
        return b;
      }
      function Ue(a, c) {
        if (!c || "function" !== typeof c) return !1;
        try {
          var b = "" + c;
        } catch (h) {
          return !1;
        }
        var d = b.length;
        if (d > 35 + a.length) return !1;
        for (var e = d - 13, f = 0, g = 8; g < d; g += 1) {
          f =
            "[native code]"[f] === b[g] || (7 === f && "-" === b[g])
              ? f + 1
              : 0;
          if (12 === f) return !0;
          if (!f && g > e) break;
        }
        return !1;
      }
      function F() {}
      function Eg(a, c) {
        Eg =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (b, d) {
              b.__proto__ = d;
            }) ||
          function (b, d) {
            for (var e in d) d.hasOwnProperty(e) && (b[e] = d[e]);
          };
        return Eg(a, c);
      }
      function Ac(a) {
        return !a;
      }
      function cb(a, c) {
        return c;
      }
      function P(a) {
        return a;
      }
      function Na(a, c) {
        function b() {
          this.constructor = a;
        }
        Eg(a, c);
        a.prototype =
          null === c
            ? Object.create(c)
            : ((b.prototype = c.prototype), new b());
      }
      function Cg() {
        for (var a = 0, c = 0, b = arguments.length; c < b; c++)
          a += arguments[c].length;
        a = Array(a);
        var d = 0;
        for (c = 0; c < b; c++)
          for (var e = arguments[c], f = 0, g = e.length; f < g; f++, d++)
            a[d] = e[f];
        return a;
      }
      function n(a, c) {
        return a
          ? K(
              function (b, d) {
                if (ka(b)) return b;
                try {
                  return b[d];
                } catch (e) {}
                return null;
              },
              a,
              c.split(".")
            )
          : null;
      }
      function Nr(a) {
        return "[object Array]" === Object.prototype.toString.call(a);
      }
      function Or() {}
      function Pr(a, c) {
        return function () {
          a.apply(c, arguments);
        };
      }
      function Ka(a) {
        if (!(this instanceof Ka))
          throw new TypeError("Promises must be constructed via new");
        if ("function" !== typeof a) throw new TypeError("not a function");
        this.Ka = 0;
        this.Ke = !1;
        this.Pa = void 0;
        this.zb = [];
        pk(a, this);
      }
      function qk(a, c) {
        for (; 3 === a.Ka; ) a = a.Pa;
        0 === a.Ka
          ? a.zb.push(c)
          : ((a.Ke = !0),
            Ka.Le(function () {
              var b = 1 === a.Ka ? c.ni : c.ui;
              if (null === b) (1 === a.Ka ? Fg : Sd)(c.promise, a.Pa);
              else {
                try {
                  var d = b(a.Pa);
                } catch (e) {
                  Sd(c.promise, e);
                  return;
                }
                Fg(c.promise, d);
              }
            }));
      }
      function Fg(a, c) {
        try {
          if (c === a)
            throw new TypeError("A promise cannot be resolved with itself.");
          if (c && ("object" === typeof c || "function" === typeof c)) {
            var b = c.then;
            if (c instanceof Ka) {
              a.Ka = 3;
              a.Pa = c;
              Gg(a);
              return;
            }
            if ("function" === typeof b) {
              pk(Pr(b, c), a);
              return;
            }
          }
          a.Ka = 1;
          a.Pa = c;
          Gg(a);
        } catch (d) {
          Sd(a, d);
        }
      }
      function Sd(a, c) {
        a.Ka = 2;
        a.Pa = c;
        Gg(a);
      }
      function Gg(a) {
        2 === a.Ka &&
          0 === a.zb.length &&
          Ka.Le(function () {
            a.Ke || Ka.zg(a.Pa);
          });
        for (var c = 0, b = a.zb.length; c < b; c++) qk(a, a.zb[c]);
        a.zb = null;
      }
      function Qr(a, c, b) {
        this.ni = "function" === typeof a ? a : null;
        this.ui = "function" === typeof c ? c : null;
        this.promise = b;
      }
      function pk(a, c) {
        var b = !1;
        try {
          a(
            function (d) {
              b || ((b = !0), Fg(c, d));
            },
            function (d) {
              b || ((b = !0), Sd(c, d));
            }
          );
        } catch (d) {
          b || ((b = !0), Sd(c, d));
        }
      }
      function ak(a, c, b, d, e) {
        void 0 === e && (e = !1);
        return tg(a, c, "", -100, b, d, e);
      }
      function Ic(a, c, b) {
        void 0 === c && (c = "_ym_");
        void 0 === b && (b = "");
        var d = Rr(a),
          e = 1 === (d || "").split(".").length ? d : "." + d,
          f = b ? "_" + b : "";
        return {
          Eb: function (g, h, k) {
            ak(a, "" + c + g + f, h || e, k);
            return this;
          },
          C: function (g) {
            return ue(a, "" + c + g + f);
          },
          D: function (g, h, k, l, m) {
            tg(a, "" + c + g + f, h, k, l || e, m);
            return this;
          },
        };
      }
      function wb(a, c) {
        if (!c) return null;
        try {
          return a.JSON.parse(c);
        } catch (b) {
          return null;
        }
      }
      function bc(a) {
        a = "" + a;
        for (var c = 2166136261, b = a.length, d = 0; d < b; d += 1)
          (c ^= a.charCodeAt(d)),
            (c += (c << 1) + (c << 4) + (c << 7) + (c << 8) + (c << 24));
        return c >>> 0;
      }
      function bm(a, c, b, d) {
        var e = rk[b];
        return e
          ? function () {
              var f = Ia(arguments);
              try {
                var g = d.apply(void 0, f);
                var h = H(a);
                h.Na("mt", {});
                var k = h.C("mt"),
                  l = k[e];
                k[e] = l ? l + 1 : 1;
              } catch (m) {
                Wa(m);
              }
              return g;
            }
          : d;
      }
      function Lc(a, c) {
        var b = Sr(a);
        return b
          ? ((b.href = c),
            {
              protocol: b.protocol,
              host: b.host,
              port: b.port,
              hostname: b.hostname,
              hash: b.hash,
              search: b.search,
              query: b.search.replace(/^\?/, ""),
              pathname: b.pathname || "/",
              path: (b.pathname || "/") + b.search,
              href: b.href,
            })
          : {};
      }
      function sk(a) {
        return (a = Q(a).hash.split("#")[1]) ? a.split("?")[0] : "";
      }
      function Tr(a, c) {
        var b = sk(a);
        tk = kr(
          a,
          function () {
            var d = sk(a);
            d !== b && (c(), (b = d));
          },
          200,
          "t.h"
        );
        return G(jr, null, a, tk);
      }
      function Ur(a, c, b, d) {
        var e,
          f,
          g = c.ba,
          h = c.Ge,
          k = c.xc,
          l = H(a),
          m = Ja(((e = {}), (e.wh = 1), (e.pv = 1), e));
        e = n(d, "isTrusted");
        d && !ka(e) && m.D("ite", xb(e));
        de(g) && a.Ya && a.Ya.Direct && m.D("ad", "1");
        h && m.D("ut", "1");
        g = l.C("lastReferrer");
        d = Q(a).href;
        k = {
          J: ((f = {}), (f["page-url"] = k || d), (f["page-ref"] = g), f),
          K: m,
        };
        b(k, c)["catch"](E(a, "g.s"));
        l.D("lastReferrer", d);
      }
      function Vr(a, c, b) {
        function d() {
          r || ((q = !0), (t = !1), (r = !0), f());
        }
        function e() {
          m = !0;
          k(!1);
          c();
        }
        function f() {
          ma(a, l);
          if (m) k(!1);
          else {
            var N = Math.max(0, b - (t ? u : u + p(Y) - D));
            N ? (l = R(a, e, N, "u.t.d.c")) : e();
          }
        }
        function g() {
          t = q = r = !0;
          u += p(Y) - D;
          D = p(Y);
          f();
        }
        function h() {
          q || r || (u = 0);
          D = p(Y);
          q = r = !0;
          t = !1;
          f();
        }
        function k(N) {
          N = N ? O.F : O.Zb;
          N(a, ["blur"], g);
          N(a, ["focus"], h);
          N(a.document, ["click", "mousemove", "keydown", "scroll"], d);
        }
        var l = 0,
          m = !1;
        if (kg(a)) return (l = R(a, c, b, "u.t.d")), C([a, l], ma);
        var p = fa(a),
          q = !1,
          r = !1,
          t = !0,
          u = 0,
          D = p(Y),
          O = ea(a);
        k(!0);
        f();
        return function () {
          ma(a, l);
          k(!1);
        };
      }
      function df(a, c, b, d) {
        return function () {
          if (Ea(a, c)) {
            var e = Ia(arguments);
            return d.apply(void 0, e);
          }
        };
      }
      function sb(a, c) {
        a = [a[0] >>> 16, a[0] & 65535, a[1] >>> 16, a[1] & 65535];
        c = [c[0] >>> 16, c[0] & 65535, c[1] >>> 16, c[1] & 65535];
        var b = [0, 0, 0, 0];
        b[3] += a[3] * c[3];
        b[2] += b[3] >>> 16;
        b[3] &= 65535;
        b[2] += a[2] * c[3];
        b[1] += b[2] >>> 16;
        b[2] &= 65535;
        b[2] += a[3] * c[2];
        b[1] += b[2] >>> 16;
        b[2] &= 65535;
        b[1] += a[1] * c[3];
        b[0] += b[1] >>> 16;
        b[1] &= 65535;
        b[1] += a[2] * c[2];
        b[0] += b[1] >>> 16;
        b[1] &= 65535;
        b[1] += a[3] * c[1];
        b[0] += b[1] >>> 16;
        b[1] &= 65535;
        b[0] += a[0] * c[3] + a[1] * c[2] + a[2] * c[1] + a[3] * c[0];
        b[0] &= 65535;
        return [(b[0] << 16) | b[1], (b[2] << 16) | b[3]];
      }
      function lc(a, c) {
        a = [a[0] >>> 16, a[0] & 65535, a[1] >>> 16, a[1] & 65535];
        c = [c[0] >>> 16, c[0] & 65535, c[1] >>> 16, c[1] & 65535];
        var b = [0, 0, 0, 0];
        b[3] += a[3] + c[3];
        b[2] += b[3] >>> 16;
        b[3] &= 65535;
        b[2] += a[2] + c[2];
        b[1] += b[2] >>> 16;
        b[2] &= 65535;
        b[1] += a[1] + c[1];
        b[0] += b[1] >>> 16;
        b[1] &= 65535;
        b[0] += a[0] + c[0];
        b[0] &= 65535;
        return [(b[0] << 16) | b[1], (b[2] << 16) | b[3]];
      }
      function Vc(a, c) {
        c %= 64;
        if (32 === c) return [a[1], a[0]];
        if (32 > c)
          return [
            (a[0] << c) | (a[1] >>> (32 - c)),
            (a[1] << c) | (a[0] >>> (32 - c)),
          ];
        c -= 32;
        return [
          (a[1] << c) | (a[0] >>> (32 - c)),
          (a[0] << c) | (a[1] >>> (32 - c)),
        ];
      }
      function ib(a, c) {
        c %= 64;
        return 0 === c
          ? a
          : 32 > c
          ? [(a[0] << c) | (a[1] >>> (32 - c)), a[1] << c]
          : [a[1] << (c - 32), 0];
      }
      function xa(a, c) {
        return [a[0] ^ c[0], a[1] ^ c[1]];
      }
      function uk(a) {
        a = xa(a, [0, a[0] >>> 1]);
        a = sb(a, [4283543511, 3981806797]);
        a = xa(a, [0, a[0] >>> 1]);
        a = sb(a, [3301882366, 444984403]);
        return (a = xa(a, [0, a[0] >>> 1]));
      }
      function Wr(a, c) {
        void 0 === c && (c = 210);
        var b = a || "",
          d = c || 0,
          e = b.length - (b.length % 16);
        d = { V: [0, d], X: [0, d] };
        for (var f = 0; f < e; f += 16) {
          var g = d,
            h = [
              (a.charCodeAt(f + 4) & 255) |
                ((a.charCodeAt(f + 5) & 255) << 8) |
                ((a.charCodeAt(f + 6) & 255) << 16) |
                ((a.charCodeAt(f + 7) & 255) << 24),
              (a.charCodeAt(f) & 255) |
                ((a.charCodeAt(f + 1) & 255) << 8) |
                ((a.charCodeAt(f + 2) & 255) << 16) |
                ((a.charCodeAt(f + 3) & 255) << 24),
            ],
            k = [
              (a.charCodeAt(f + 12) & 255) |
                ((a.charCodeAt(f + 13) & 255) << 8) |
                ((a.charCodeAt(f + 14) & 255) << 16) |
                ((a.charCodeAt(f + 15) & 255) << 24),
              (a.charCodeAt(f + 8) & 255) |
                ((a.charCodeAt(f + 9) & 255) << 8) |
                ((a.charCodeAt(f + 10) & 255) << 16) |
                ((a.charCodeAt(f + 11) & 255) << 24),
            ];
          h = sb(h, Ve);
          h = Vc(h, 31);
          h = sb(h, We);
          g.V = xa(g.V, h);
          g.V = Vc(g.V, 27);
          g.V = lc(g.V, g.X);
          g.V = lc(sb(g.V, [0, 5]), [0, 1390208809]);
          k = sb(k, We);
          k = Vc(k, 33);
          k = sb(k, Ve);
          g.X = xa(g.X, k);
          g.X = Vc(g.X, 31);
          g.X = lc(g.X, g.V);
          g.X = lc(sb(g.X, [0, 5]), [0, 944331445]);
        }
        e = b.length % 16;
        f = b.length - e;
        g = [0, 0];
        h = [0, 0];
        switch (e) {
          case 15:
            h = xa(h, ib([0, b.charCodeAt(f + 14)], 48));
          case 14:
            h = xa(h, ib([0, b.charCodeAt(f + 13)], 40));
          case 13:
            h = xa(h, ib([0, b.charCodeAt(f + 12)], 32));
          case 12:
            h = xa(h, ib([0, b.charCodeAt(f + 11)], 24));
          case 11:
            h = xa(h, ib([0, b.charCodeAt(f + 10)], 16));
          case 10:
            h = xa(h, ib([0, b.charCodeAt(f + 9)], 8));
          case 9:
            (h = xa(h, [0, b.charCodeAt(f + 8)])),
              (h = sb(h, We)),
              (h = Vc(h, 33)),
              (h = sb(h, Ve)),
              (d.X = xa(d.X, h));
          case 8:
            g = xa(g, ib([0, b.charCodeAt(f + 7)], 56));
          case 7:
            g = xa(g, ib([0, b.charCodeAt(f + 6)], 48));
          case 6:
            g = xa(g, ib([0, b.charCodeAt(f + 5)], 40));
          case 5:
            g = xa(g, ib([0, b.charCodeAt(f + 4)], 32));
          case 4:
            g = xa(g, ib([0, b.charCodeAt(f + 3)], 24));
          case 3:
            g = xa(g, ib([0, b.charCodeAt(f + 2)], 16));
          case 2:
            g = xa(g, ib([0, b.charCodeAt(f + 1)], 8));
          case 1:
            (g = xa(g, [0, b.charCodeAt(f)])),
              (g = sb(g, Ve)),
              (g = Vc(g, 31)),
              (g = sb(g, We)),
              (d.V = xa(d.V, g));
        }
        d.V = xa(d.V, [0, b.length]);
        d.X = xa(d.X, [0, b.length]);
        d.V = lc(d.V, d.X);
        d.X = lc(d.X, d.V);
        d.V = uk(d.V);
        d.X = uk(d.X);
        d.V = lc(d.V, d.X);
        d.X = lc(d.X, d.V);
        return (
          ("00000000" + (d.V[0] >>> 0).toString(16)).slice(-8) +
          ("00000000" + (d.V[1] >>> 0).toString(16)).slice(-8) +
          ("00000000" + (d.X[0] >>> 0).toString(16)).slice(-8) +
          ("00000000" + (d.X[1] >>> 0).toString(16)).slice(-8)
        );
      }
      function Td(a, c, b) {
        var d = c.getAttribute("itemtype");
        b = qb('[itemprop~="' + b + '"]', c);
        return d
          ? la(function (e) {
              return e.parentNode && hc("[itemtype]", a, e.parentNode) === c;
            }, b)
          : b;
      }
      function db(a, c, b) {
        return (a = Td(a, c, b)) && a.length ? a[0] : null;
      }
      function Xa(a) {
        if (!a) return "";
        a = da(a) ? a : [a];
        return a.length ? a[0].getAttribute("content") || Hb(a[0]) : "";
      }
      function vk(a) {
        return a
          ? a.attributes && a.getAttribute("datetime")
            ? a.getAttribute("datetime")
            : Xa(a)
          : "";
      }
      function pd(a, c, b) {
        a =
          c &&
          (Za(c.className, "ym-disable-keys") ||
            Za(c.className, "-metrika-nokeys"));
        return b && c
          ? a || !!Wq(["ym-disable-keys", "-metrika-nokeys"], c).length
          : a;
      }
      function Ef(a, c) {
        return Ne(c)
          ? "password" === c.type ||
              (c.name && L(c.name.toLowerCase(), wk)) ||
              (c.id && L(c.id.toLowerCase(), wk))
          : !1;
      }
      function xk(a, c) {
        var b = Math.max(0, Math.min(c, 65535));
        ra(a, [b >> 8, b & 255]);
      }
      function Qb(a, c) {
        ra(a, [c & 255]);
      }
      function gb(a, c, b) {
        return -1 !== Rb(a)(b, Xr) ? (Qb(c, b), !1) : !0;
      }
      function S(a, c) {
        for (var b = Math.max(0, c | 0); 127 < b; )
          ra(a, [(b & 127) | 128]), (b >>= 7);
        ra(a, [b]);
      }
      function Hg(a, c) {
        S(a, c.length);
        for (var b = 0; b < c.length; b += 1) S(a, c.charCodeAt(b));
      }
      function Ig(a, c) {
        var b = c;
        255 < b.length && (b = b.substr(0, 255));
        a.push(b.length);
        for (var d = 0; d < b.length; d += 1) xk(a, b.charCodeAt(d));
      }
      function Yr(a, c) {
        var b = [];
        if (gb(a, b, 27)) return [];
        S(b, c);
        return b;
      }
      function Zr(a, c) {
        var b = Ma(c);
        if (!b) return (c[Va] = -1), null;
        var d = +c[Va];
        if (!isFinite(d) || 0 >= d) return null;
        if (c.attributes)
          for (var e = c; e; ) {
            if (e.attributes.oj) return null;
            e = e.parentElement;
          }
        e = 64;
        var f = Le(a, c),
          g = f && f[Va] ? f[Va] : 0;
        0 > g && (g = 0);
        b = (b || "").toUpperCase();
        var h = $r()[b];
        h || (e |= 2);
        var k = Bj(a, c);
        k || (e |= 4);
        var l = If(a, c);
        (f = f ? If(a, f) : null) &&
          l[0] === f[0] &&
          l[1] === f[1] &&
          l[2] === f[2] &&
          l[3] === f[3] &&
          (e |= 8);
        tc[d].zf = l[0] + "x" + l[1];
        tc[d].size = l[2] + "x" + l[3];
        c.id && "string" === typeof c.id && (e |= 32);
        f = [];
        if (gb(a, f, 1)) return null;
        S(f, d);
        Qb(f, e);
        S(f, g);
        h ? Qb(f, h) : Ig(f, b);
        k && S(f, k);
        e & 8 || (S(f, l[0]), S(f, l[1]), S(f, l[2]), S(f, l[3]));
        e & 32 && Ig(f, c.id);
        Qb(f, 0);
        return f;
      }
      function as(a, c) {
        var b = c[Va];
        if (!b || 0 > b || !Gf(c) || !c.form || bi(a, c.form)) return [];
        var d = Dj(a, c.form);
        if (0 > d) return [];
        if (Ne(c)) {
          var e = {
            text: 0,
            color: 0,
            qc: 0,
            sj: 0,
            "datetime-local": 0,
            email: 0,
            xf: 0,
            Ij: 0,
            search: 0,
            Mj: 0,
            time: 0,
            url: 0,
            month: 0,
            Oj: 0,
            password: 2,
            Hj: 3,
            qj: 4,
            file: 6,
            image: 7,
          };
          e = e[c.type];
        } else {
          e = { lj: 1, mj: 5 };
          var f = Ma(c);
          e = V(f) ? "" : e[f];
        }
        if ("number" !== typeof e) return [];
        f = -1;
        for (var g = c.form.elements, h = g.length, k = 0, l = 0; k < h; k += 1)
          if (g[k].name === c.name) {
            if (g[k] === c) {
              f = l;
              break;
            }
            l += 1;
          }
        if (0 > f) return [];
        g = [];
        if (gb(a, g, 7)) return [];
        S(g, b);
        S(g, d);
        S(g, e);
        Hg(g, c.name || "");
        S(g, f);
        return g;
      }
      function sc(a, c, b) {
        void 0 === b && (b = []);
        for (var d = []; c && !$n(a, c, b); c = Le(a, c)) d.push(c);
        y(function (e) {
          tc.counter += 1;
          var f = tc.counter;
          e[Va] = f;
          tc[f] = {};
          f = Zr(a, e);
          e = as(a, e);
          f && e && (ra(b, f), ra(b, e));
        }, bs(d));
        return b;
      }
      function cs(a) {
        var c = a.qa;
        if (!od || (c && !c.fromElement)) return Zh(a);
      }
      function ds(a) {
        var c = a.qa;
        if (c && !c.toElement) return Hf(a);
      }
      function yk(a) {
        var c = Cc(a.qa);
        if (c && te(c)) {
          var b = Yh(a, c),
            d = b.concat;
          var e = yb(a.l),
            f = [];
          gb(a.l, f, 17) ? (a = []) : (S(f, e), S(f, c[Va]), (a = f));
          return d.call(b, a);
        }
      }
      function zk(a) {
        var c = a.l,
          b = a.qa.target;
        if (b && te(b)) {
          c = sc(c, b);
          var d = c.concat;
          var e = yb(a.l),
            f = [];
          gb(a.l, f, 18) ? (a = []) : (S(f, e), S(f, b[Va]), (a = f));
          return d.call(c, a);
        }
      }
      function Ak(a) {
        var c = a.l,
          b = Cc(a.qa);
        if (!b || Ef(c, b) || pd(c, b)) return [];
        if (Gf(b)) {
          var d = H(c).C("isEU"),
            e = Mc(c, b, d),
            f = e.Ua;
          d = e.pb;
          e = e.gb;
          if (Oe(b)) var g = b.checked;
          else (g = b.value), (g = f ? I("", Bk(g.split(""))) : g);
          c = sc(c, b);
          f = c.concat;
          var h = yb(a.l);
          d = d && !e;
          e = [];
          gb(a.l, e, 39)
            ? (a = [])
            : (S(e, h),
              S(e, b[Va]),
              Ig(e, String(g)),
              Qb(e, d ? 1 : 0),
              (a = e));
          return f.call(c, a);
        }
      }
      function Xe(a) {
        var c = a.l,
          b = a.qa,
          d = Cc(b);
        if (!d || "SCROLLBAR" === d.nodeName) return [];
        var e = [],
          f = v(e, ra);
        d && te(d) ? f(Yh(a, d)) : f(sc(c, d));
        var g = $i(c, b);
        f = e.concat;
        a = yb(a.l);
        var h = b.type,
          k = [g.x, g.y];
        g = b.which;
        b = b.button;
        var l;
        var m = Me(c, d);
        var p = m[0];
        for (m = m[1]; d && (!p || !m); )
          if ((d = Le(c, d))) (m = Me(c, d)), (p = m[0]), (m = m[1]);
        d
          ? ((p = d[Va]),
            !p || 0 > p
              ? (c = [])
              : (m = ((l = {}),
                (l.mousemove = 2),
                (l.click = 32),
                (l.dblclick = 33),
                (l.mousedown = 4),
                (l.mouseup = 30),
                (l.touch = 12),
                l)[h])
              ? ((l = []),
                (d = jg(c, d)),
                gb(c, l, m)
                  ? (c = [])
                  : (S(l, a),
                    S(l, p),
                    S(l, Math.max(0, k[0] - d.left)),
                    S(l, Math.max(0, k[1] - d.top)),
                    /^mouse(up|down)|click$/.test(h) &&
                      ((c = g || b),
                      Qb(l, 2 > c ? 1 : c === (g ? 2 : 4) ? 4 : 2)),
                    (c = l)))
              : (c = []))
          : (c = []);
        return f.call(e, c);
      }
      function es(a) {
        var c = null,
          b = a.l,
          d = b.document;
        if (b.getSelection) {
          d = void 0;
          try {
            d = b.getSelection();
          } catch (g) {
            return [];
          }
          if (Ta(d)) return [];
          var e = "" + d;
          c = d.anchorNode;
        } else
          d.selection &&
            d.selection.createRange &&
            ((d = d.selection.createRange()),
            (e = d.text),
            (c = d.parentElement()));
        if ("string" !== typeof e) return [];
        try {
          for (; c && 1 !== c.nodeType; ) c = c.parentNode;
        } catch (g) {
          return [];
        }
        if (!c) return [];
        d = Mc(b, c).Ua || pd(b, c, !0);
        c = c.getElementsByTagName("*");
        for (var f = 0; f < c.length && !d; )
          (d = c[f]), (d = Mc(b, d).Ua || pd(b, d, !0)), (f += 1);
        if (e !== Jg)
          return (
            (Jg = e),
            (d = d ? I("", Bk(e.split(""))) : e),
            (e = yb(a.l)),
            0 === d.length
              ? (d = b = "")
              : 100 >= d.length
              ? ((b = d), (d = ""))
              : 200 >= d.length
              ? ((b = d.substr(0, 100)), (d = d.substr(100)))
              : ((b = d.substr(0, 97)), (d = d.substr(d.length - 97))),
            (c = []),
            gb(a.l, c, 29) ? (a = []) : (S(c, e), Hg(c, b), Hg(c, d), (a = c)),
            a
          );
      }
      function fs(a) {
        return Xe(a).concat(es(a) || []);
      }
      function Ck(a) {
        return (
          (a.shiftKey ? 2 : 0) |
          (a.ctrlKey ? 4 : 0) |
          (a.altKey ? 1 : 0) |
          (a.metaKey ? 8 : 0) |
          (a.ctrlKey || a.altKey ? 16 : 0)
        );
      }
      function Dk(a) {
        var c = [];
        Kg ||
          ((Kg = !0),
          Jg && ra(c, Yr(a.l, yb(a.l))),
          Ob(
            a.l,
            function () {
              Kg = !1;
            },
            "fv.c"
          ));
        return c;
      }
      function Ek(a, c, b, d) {
        c = Cc(c);
        if (!c || Jf(a, c)) return [];
        var e = Mc(a, c),
          f = e.pb,
          g = e.gb;
        e = e.Ua;
        var h = H(a);
        if (!g && ((f && h.C("isEU")) || pd(a, c))) a = [];
        else {
          f = sc(a, c);
          g = f.concat;
          var k = yb(a);
          h = [];
          if (gb(a, h, 38)) a = [];
          else {
            S(h, k);
            xk(h, b);
            Qb(h, d);
            a = c[Va];
            if (!a || 0 > a) a = 0;
            S(h, a);
            Qb(h, e ? 1 : 0);
            a = h;
          }
          a = g.call(f, a);
        }
        return a;
      }
      function gs(a) {
        var c = a.l,
          b = a.qa,
          d = b.keyCode,
          e = Ck(b),
          f = [],
          g = v(f, ra);
        if (
          {
            3: 1,
            8: 1,
            9: 1,
            13: 1,
            16: 1,
            17: 1,
            18: 1,
            19: 1,
            20: 1,
            27: 1,
            33: 1,
            34: 1,
            35: 1,
            36: 1,
            37: 1,
            38: 1,
            39: 1,
            40: 1,
            45: 1,
            46: 1,
            91: 1,
            92: 1,
            93: 1,
            106: 1,
            110: 1,
            111: 1,
            144: 1,
            145: 1,
          }[d] ||
          (112 <= d && 123 >= d) ||
          (96 <= d && 105 >= d) ||
          e & 16
        )
          19 === d && 4 === (e & -17) && (d = 144),
            g(Ek(c, b, d, e | 16)),
            (Lg = !1),
            Ob(
              c,
              function () {
                Lg = !0;
              },
              "fv.kd"
            ),
            !(67 === d && e & 4) || e & 1 || e & 2 || g(Dk(a));
        return f;
      }
      function hs(a) {
        var c = a.l;
        a = a.qa;
        var b = [];
        Lg &&
          !Mg &&
          0 !== a.which &&
          (ra(b, Ek(c, a, a.charCode || a.keyCode, Ck(a))),
          (Mg = !0),
          Ob(
            c,
            function () {
              Mg = !1;
            },
            "fv.kp"
          ));
        return b;
      }
      function Fk(a) {
        var c = a.l,
          b = Cc(a.qa);
        if (!b || bi(c, b)) return [];
        var d = [];
        if ("FORM" === b.nodeName) {
          for (var e = b.elements, f = 0; f < e.length; f += 1)
            Cj(e[f]) || ra(d, sc(c, e[f]));
          a = yb(a.l);
          e = Dj(c, b);
          if (0 > e) c = [];
          else {
            f = b.elements;
            var g = f.length;
            b = [];
            for (var h = 0; h < g; h += 1)
              if (!Cj(f[h])) {
                var k = f[h][Va];
                k && 0 < k && b.push(k);
              }
            f = [];
            if (gb(c, f, 11)) c = [];
            else {
              S(f, a);
              S(f, e);
              S(f, b.length);
              for (c = 0; c < b.length; c += 1) S(f, b[c]);
              c = f;
            }
          }
          ra(d, c);
        }
        return d;
      }
      function is(a) {
        var c = a.flush;
        a = Cc(a.qa);
        "BODY" === Ma(a) && c();
      }
      function sn(a, c) {
        var b,
          d = Cc(c),
          e = Ga.kc,
          f = Rd(a);
        if (d && dc("ym-advanced-informer", d)) {
          var g = f.C("ifc", 0) + 1;
          f.D("ifc", g);
          g = d.getAttribute("data-lang");
          var h = Da(d.getAttribute("data-cid") || "");
          if (h || 0 === h)
            (e = n(a, "Ya." + e + ".informer"))
              ? e(((b = {}), (b.i = d), (b.id = h), (b.lang = g), b))
              : f.D("ib", !0),
              (b = c || window.event),
              b.preventDefault ? b.preventDefault() : (b.returnValue = !1);
        }
      }
      function mh(a, c, b, d) {
        return function () {
          var e = Ia(arguments);
          e = d.apply(void 0, e);
          return V(e) ? Ea(a, c) : e;
        };
      }
      function lh(a, c, b, d) {
        return E(a, "cm." + b, d);
      }
      function $l(a, c, b, d, e) {
        return b.length && e
          ? C(
              K(
                function (f, g, h) {
                  return b[h] ? f.concat(C([a, c, d], g)) : f;
                },
                [],
                b
              ),
              w
            )()(e)
          : e;
      }
      var Wc = {
          construct: "Metrika2",
          callbackPostfix: "2",
          version: "6mv6as6uisvb01pi8xp1r0tb",
          host: "mc.yandex.ru",
        },
        Dg = [],
        ag = /\./g,
        Gk = na(String.prototype.indexOf, "indexOf"),
        se = Gk
          ? function (a, c) {
              return Gk.call(a, c);
            }
          : Mr,
        za = oa(function (a, c) {
          return a === c;
        }),
        ld = oa(function (a, c) {
          a(c);
          return c;
        }),
        Ba = oa(nk),
        Ta = za(null),
        V = za(void 0),
        Te = na(Array.from, "from"),
        Hk = na(Function.prototype.bind, "bind"),
        G = Hk ? Jr(Hk) : Kr,
        Ik = na(Array.prototype.reduce, "reduce"),
        K = Ik
          ? function (a, c, b) {
              return Ik.call(b, a, c);
            }
          : xg,
        qj = w,
        Be = w(P, ha),
        Bg,
        Ag = Rb(window),
        js = Db(Ag),
        zg = Object.prototype.hasOwnProperty,
        H = x(Rd),
        U = Db(n),
        Qa = U("length"),
        Tc = oa(C),
        Ii = oa(Fa),
        Jk = na(Array.prototype.every, "every"),
        Gp = Jk
          ? function (a, c) {
              return Jk.call(c, a);
            }
          : Hr,
        Ib = C([1, null], sd),
        xb = C([1, 0], sd),
        Mb = Boolean,
        Kk = na(Array.prototype.filter, "filter"),
        la = Kk
          ? function (a, c) {
              return Kk.call(c, a);
            }
          : mk,
        ta = v(Mb, la),
        Lk = oa(la),
        Mk = na(Array.prototype.find, "find"),
        ob = Mk
          ? function (a, c) {
              return Mk.call(c, a);
            }
          : Gr,
        Nk = na(Array.prototype.includes, "includes"),
        L = Nk
          ? function (a, c, b) {
              return Nk.call(c, a, b);
            }
          : Fr,
        xc = Db(L),
        Ok = na(Array.prototype.join, "join"),
        I = Ok
          ? function (a, c) {
              return Ok.call(c, a);
            }
          : Er,
        wd = oa(I),
        Pk = x(function (a) {
          a = n(a, "navigator") || {};
          var c = n(a, "userAgent") || "";
          return { nf: -1 < (n(a, "vendor") || "").indexOf("Apple"), kg: c };
        }),
        hb = x(U("navigator.userAgent")),
        wg = /Firefox\/([0-9]+)/i,
        Qd = x(function (a) {
          var c = n(a, "document.documentElement.style"),
            b = n(a, "InstallTrigger");
          a =
            -1 !== (n(a, "navigator.userAgent") || "").toLowerCase().search(wg);
          wg.lastIndex = 0;
          return !(!(c && "MozAppearance" in c) || ka(b)) || a;
        }),
        Qk = na(Array.isArray, "isArray"),
        da = Qk
          ? function (a) {
              return Qk(a);
            }
          : Nr,
        Rk = na(Array.prototype.map, "map"),
        A =
          Rk && Dr(window, Array.prototype.map)
            ? function (a, c) {
                return c && 0 < c.length ? Rk.call(c, a) : [];
              }
            : lk,
        y = A,
        Sk = na(Array.prototype.flatMap, "flatMap"),
        pc = Sk
          ? function (a, c) {
              return Sk.call(c, a);
            }
          : Cr,
        zb = oa(A),
        lr = Db(A),
        Tk = na(Array.prototype.some, "some"),
        ab = Tk
          ? function (a, c) {
              return Tk.call(c, a);
            }
          : Br,
        He = x(Rb),
        Qc = U("0"),
        ks = oa(yg),
        Uk = na(Array.prototype.reverse, "reverse"),
        bs = Uk
          ? function (a) {
              return Uk.call(a);
            }
          : Ar,
        Vk = Db(parseInt),
        Da = Vk(10),
        Ng = Vk(2),
        Wk = na(Object.keys, "keys"),
        Xk = na(Object.entries, "entries"),
        La = Xk ? zr(Xk) : ik,
        ca = Wk
          ? function (a) {
              return Wk(a);
            }
          : jk,
        Yk = na(Object.values, "values"),
        ls = w(ik, v(U("1"), lk)),
        ms = Yk
          ? function (a) {
              return Yk(a);
            }
          : ls,
        z = Object.assign || yr,
        Xh = oa(function (a, c) {
          return z({}, a, c);
        }),
        id = x(w(U("String.fromCharCode"), v("fromCharCode", Ha), Ac)),
        Se = x(w(hb, bb(/ipad|iphone|ipod/i))),
        Of = x(function (a) {
          return n(a, "navigator.platform") || "";
        }),
        xd = x(function (a) {
          a = Pk(a);
          var c = a.kg;
          return a.nf && !c.match("CriOS");
        }),
        ns = bb(
          /Android.*Version\/[0-9][0-9.]*\sChrome\/[0-9][0-9.]|Android.*Version\/[0-9][0-9.]*\s(?:Mobile\s)?Safari\/[0-9][0-9.]*\sChrome\/[0-9][0-9.]*|; wv\).*Chrome\/[0-9][0-9.]*\sMobile/
        ),
        os = bb(/; wv\)/),
        ud = x(function (a) {
          a = hb(a);
          return os(a) || ns(a);
        }),
        ps = /Chrome\/(\d+)\./,
        qs = x(function (a) {
          return (a = (n(a, "navigator.userAgent") || "").match(ps)) && a.length
            ? 76 <= Da(a[1])
            : !1;
        }),
        td = x(function (a) {
          var c = (hb(a) || "").toLowerCase();
          a = Of(a);
          return (
            Za(c, "android") &&
            Za(c, "mobile") &&
            /^android|linux armv/i.test(a)
          );
        }),
        rs =
          "other none unknown wifi ethernet bluetooth cellular wimax mixed".split(
            " "
          ),
        ss = x(function (a) {
          var c = n(a, "navigator.connection.type");
          if (V(c)) return null;
          a = He(a)(c, rs);
          return -1 === a ? c : "" + a;
        }),
        kg = x(w(U("document.addEventListener"), Ac)),
        Zk = x(function (a) {
          var c = n(a, "navigator") || {};
          return K(
            function (b, d) {
              return b || n(c, d);
            },
            "",
            ["language", "userLanguage", "browserLanguage", "systemLanguage"]
          );
        }),
        uh = x(function (a) {
          var c = n(a, "navigator") || {};
          a = Zk(a);
          ja(a) || ((a = ""), (c = n(c, "languages.0")), ja(c) && (a = c));
          return a.toLowerCase().split("-")[0];
        }),
        fb = x(function (a) {
          return (n(a, "top") || a) !== a;
        }),
        ts = x(U("top.contentWindow")),
        us = x(function (a) {
          var c = !1;
          try {
            c = a.navigator.javaEnabled();
          } catch (b) {}
          return c;
        }),
        vs = x(function (a) {
          var c =
              "__webdriver_evaluate __selenium_evaluate __webdriver_script_function __webdriver_script_func __webdriver_script_fn __fxdriver_evaluate __driver_unwrapped __webdriver_unwrapped __driver_evaluate __selenium_unwrapped __fxdriver_unwrapped".split(
                " "
              ),
            b = n(a, "external");
          b =
            -1 !==
            (n(b, "toString") ? "" + b.toString() : "").indexOf("Sequentum");
          var d = n(a, "document.documentElement"),
            e = ["selenium", "webdriver", "driver"];
          return !!(
            ab(v(a, n), [
              "_selenium",
              "callSelenium",
              "_Selenium_IDE_Recorder",
            ]) ||
            ab(v(n(a, "document"), n), c) ||
            b ||
            (d && ab(G(d.getAttribute, d), e))
          );
        }),
        ws = x(function (a) {
          return !!(
            ab(v(a, n), ["_phantom", "__nightmare", "callPhantom"]) ||
            /(PhantomJS)|(HeadlessChrome)/.test(hb(a)) ||
            n(a, "navigator.webdriver") ||
            (n(a, "isChrome") && !n(a, "chrome"))
          );
        }),
        xs = x(function (a) {
          return !(
            !n(a, "ia_document.shareURL") || !n(a, "ia_document.referrer")
          );
        }),
        Ud = x(function (a) {
          var c = hb(a) || "",
            b = c.match(/Mac OS X ([0-9]+)_([0-9]+)/);
          b = b ? [+b[1], +b[2]] : [0, 0];
          c = c.match(/iPhone OS ([1-9]+)_([0-9]+)/);
          return 14 <= (c ? +c[1] : 0)
            ? !0
            : (Se(a) || 10 < b[0] || (10 === b[0] && 13 <= b[1])) && xd(a);
        }),
        xr = /Edg\/(\d+)\./,
        Ke = x(function (a) {
          return Ud(a) || rf(a, 68) || sf(a, 79);
        }),
        ys = Wc.construct,
        fc = Wc.host,
        Og = kg(window),
        Ga = {
          vg: 24226447,
          og: 26302566,
          yg: 51533966,
          jj: 65446441,
          Qa: "https:",
          cc: "1200",
          kc: ys,
          ug: Og ? 512 : 2048,
          rg: Og ? 512 : 2048,
          sg: Og ? 100 : 400,
          kj: 100,
          wg: "noindex",
        },
        Vd = [],
        M = x(function (a) {
          return a.id + ":" + a.ba;
        }),
        kc = {},
        de = za("1"),
        zs = setTimeout;
      Ka.prototype["catch"] = function (a) {
        return this.then(null, a);
      };
      Ka.prototype.then = function (a, c) {
        var b = new this.constructor(Or);
        qk(this, new Qr(a, c, b));
        return b;
      };
      Ka.prototype["finally"] = function (a) {
        var c = this.constructor;
        return this.then(
          function (b) {
            return c.resolve(a()).then(function () {
              return b;
            });
          },
          function (b) {
            return c.resolve(a()).then(function () {
              return c.reject(b);
            });
          }
        );
      };
      Ka.all = function (a) {
        return new Ka(function (c, b) {
          function d(h, k) {
            try {
              if (k && ("object" === typeof k || "function" === typeof k)) {
                var l = k.then;
                if ("function" === typeof l) {
                  l.call(
                    k,
                    function (m) {
                      d(h, m);
                    },
                    b
                  );
                  return;
                }
              }
              e[h] = k;
              0 === --f && c(e);
            } catch (m) {
              b(m);
            }
          }
          if (!a || "undefined" === typeof a.length)
            return b(new TypeError("Promise.all accepts an array"));
          var e = Array.prototype.slice.call(a);
          if (0 === e.length) return c([]);
          for (var f = e.length, g = 0; g < e.length; g++) d(g, e[g]);
        });
      };
      Ka.resolve = function (a) {
        return a && "object" === typeof a && a.constructor === Ka
          ? a
          : new Ka(function (c) {
              c(a);
            });
      };
      Ka.reject = function (a) {
        return new Ka(function (c, b) {
          b(a);
        });
      };
      Ka.race = function (a) {
        return new Ka(function (c, b) {
          if (!a || "undefined" === typeof a.length)
            return b(new TypeError("Promise.race accepts an array"));
          for (var d = 0, e = a.length; d < e; d++) Ka.resolve(a[d]).then(c, b);
        });
      };
      Ka.Le =
        ("function" === typeof setImmediate &&
          function (a) {
            setImmediate(a);
          }) ||
        function (a) {
          zs(a, 0);
        };
      Ka.zg = function (a) {
        "undefined" !== typeof console &&
          console &&
          console.warn("Possible Unhandled Promise Rejection:", a);
      };
      var J = window.Promise,
        As = na(J, "Promise"),
        $k = na(n(J, "resolve"), "resolve"),
        al = na(n(J, "reject"), "reject"),
        bl = na(n(J, "all"), "all");
      if (As && $k && al && bl) {
        var Ye = function (a) {
          return new Promise(a);
        };
        Ye.resolve = G($k, J);
        Ye.reject = G(al, J);
        Ye.all = G(bl, J);
        J = Ye;
      } else J = Ka;
      var ce = [],
        fd = [],
        W = [],
        eb = [],
        Pg = [],
        mc = [],
        Yj = xc([26812653]),
        mj = x(w(U("id"), Yj), M),
        Vb = {
          id: "id",
          Ge: "ut",
          ba: "type",
          Sd: "ldc",
          Sa: "nck",
          xc: "url",
          kh: "referrer",
        },
        Bs = /^\d+$/,
        Xc = {
          id: function (a) {
            a = "" + (a || "0");
            Bs.test(a) || (a = "0");
            try {
              var c = Da(a);
            } catch (b) {
              c = 0;
            }
            return c;
          },
          ba: function (a) {
            return "" + (a || 0 === a ? a : "0");
          },
          Sa: Mb,
          Ge: Mb,
        };
      Vb.lc = "defer";
      Xc.lc = Mb;
      Vb.R = "params";
      Xc.R = function (a) {
        return va(a) || da(a) ? a : null;
      };
      Vb.Fe = "userParams";
      Vb.gg = "triggerEvent";
      Xc.gg = Mb;
      Vb.Sf = "sendTitle";
      Xc.Sf = function (a) {
        return !!a || V(a);
      };
      Vb.Ae = "trackHash";
      Xc.Ae = Mb;
      Vb.eg = "trackLinks";
      Vb.Vg = "enableAll";
      var ef = K(
          function (a, c) {
            var b = c[0];
            a[b] = { ea: c[1], Ta: Xc[b] };
            return a;
          },
          {},
          La(Vb)
        ),
        vr = "hash host hostname href pathname port protocol search".split(" "),
        vg =
          "ru by kz az kg lv md tj tm uz ee fr lt com co.il com.ge com.am com.tr com.ru".split(
            " "
          ),
        ek = /(?:^|\.)(?:(ya\.ru)|(?:yandex)\.(\w+|com?\.\w+))$/,
        Fe = x(function (a) {
          return (a ? a.replace(/^www\./, "") : "").toLowerCase();
        }),
        ui = x(function (a) {
          a = Q(a).hostname;
          var c = !1;
          a && (c = -1 !== a.search(ek));
          return c;
        }),
        cl = w(Q, U("protocol"), za("https:")),
        sr = x(function (a) {
          return qs(a) && cl(a) ? "SameSite=None;Secure;" : "";
        }),
        sj = /^\s+|\s+$/g,
        dk = na(String.prototype.trim, "trim"),
        dl = oa(function (a, c) {
          return c.replace(a, "");
        }),
        Mi = dl(/\s/g),
        Pb = dl(/\D/g),
        Pd = ["metrika_enabled"],
        ug = [],
        bk = rb("gsc", Zj),
        tr = /:\d+$/,
        Rr = x(function (a) {
          var c = (Q(a).host || "").split(".");
          return 1 === c.length
            ? c[0]
            : K(
                function (b, d, e) {
                  e += 1;
                  2 <= e &&
                    !b &&
                    ((e = I(".", c.slice(-e))), di(a, e) && (b = e));
                  return b;
                },
                "",
                c
              );
        }),
        ec = x(Ic),
        Qe = x(function (a) {
          var c = ec(a),
            b = "1" === c.C("debug"),
            d = Re(a, "1") || Re(a, "2"),
            e = a._ym_debug;
          (!e && !d) || b || ((a = Q(a)), c.D("debug", "1", void 0, a.host));
          return !!(b || e || d);
        }),
        rr = rb("debuggerEvents", Bd, !0),
        or = [
          "http.0.st..rt.",
          "network error occurred",
          "send beacon",
          "Content Security Policy",
          "DOM Exception 18",
        ],
        Wd,
        Fc = (function (a) {
          return function (c, b) {
            void 0 === b && (b = !1);
            if (Wd) var d = new Wd(c);
            else
              Ha("Error", a.Error)
                ? ((Wd = a.Error), (d = new a.Error(c)))
                : ((Wd = qr), (d = new Wd(c)));
            b && (d.unk = !0);
            return d;
          };
        })(window),
        pr = bb(/^http./),
        nr = bb(/^err.kn/),
        Xj = [],
        mr = x(function (a) {
          a = !(!a.addEventListener || !a.removeEventListener);
          return {
            Oi: a,
            F: a ? "addEventListener" : "attachEvent",
            ga: a ? "removeEventListener" : "detachEvent",
          };
        }),
        Cs = x(function (a) {
          var c = !1;
          if (!a.addEventListener) return c;
          try {
            var b = Object.defineProperty({}, "passive", {
              get: function () {
                c = !0;
                return 1;
              },
            });
            a.addEventListener("test", F, b);
          } catch (d) {}
          return c;
        }),
        Ds = oa(function (a, c) {
          return a ? z({ capture: !0, passive: !0 }, c || {}) : !!c;
        }),
        ea = x(function (a) {
          var c = Cs(a),
            b = Ds(c),
            d = {};
          return z(d, {
            F: function (e, f, g, h) {
              y(function (k) {
                var l = b(h);
                Wj(a, e, k, g, l, !1);
              }, f);
              return G(d.Zb, d, e, f, g, h);
            },
            Zb: function (e, f, g, h) {
              y(function (k) {
                var l = b(h);
                Wj(a, e, k, g, l, !0);
              }, f);
            },
          });
        }),
        fa = x(bg),
        Sj = oa(function (a, c) {
          for (var b = []; !Od(c); ) {
            var d = hr(c);
            a(d, function (e) {
              return e(c);
            });
            b.push(d);
          }
          return b;
        }),
        el = oa(function (a, c) {
          return Ba(function (b, d) {
            return c(b, function (e) {
              try {
                d(a(e));
              } catch (f) {
                b(f);
              }
            });
          });
        }),
        Qg = oa(function (a, c) {
          return Ba(function (b, d) {
            return c(b, function (e) {
              try {
                a(e)(Pa(b, d));
              } catch (f) {
                b(f);
              }
            });
          });
        }),
        og = [],
        pg = !1,
        ng = !1,
        fl = oa(function (a, c) {
          var b = c || {};
          return {
            l: v(b, P),
            C: function (d, e) {
              var f = b[d];
              return V(f) && !V(e) ? e : f;
            },
            D: function (d, e) {
              b[d] = e;
              return this;
            },
            Vb: function (d, e) {
              return "" === e || ka(e) ? this : this.D(d, e);
            },
            Ha: v(b, a),
          };
        }),
        Ja = fl(function (a) {
          var c = "";
          a = K(
            function (b, d) {
              var e = d[0],
                f = "" + e + ":" + d[1];
              "t" === e ? (c = f) : b.push(f);
              return b;
            },
            [],
            La(a)
          );
          c && a.push(c);
          return I(":", a);
        }),
        Rg,
        Jj =
          ((Rg = {}),
          (Rg.w = [
            [
              function (a, c) {
                return {
                  N: function (b, d) {
                    var e,
                      f = b.J;
                    f =
                      ((e = {}),
                      (e["page-url"] = (f && f["page-url"]) || ""),
                      (e.charset = "utf-8"),
                      e);
                    "0" !== c.ba && (f["cnt-class"] = c.ba);
                    b.K || (b.K = Ja());
                    e = b.K;
                    var g = b.aa;
                    f = {
                      ha: { Ca: "watch/" + c.id },
                      aa: z(void 0 === g ? {} : g, {
                        yb: !!e.C("pv") && !e.C("ar") && !e.C("wh"),
                      }),
                      J: z(b.J || {}, f),
                    };
                    z(b, f);
                    d();
                  },
                };
              },
              1,
            ],
          ]),
          Rg),
        Yc = v(Jj, Nj),
        jb = Nd("w"),
        Ij = ["webkitvisibilitychange", "visibilitychange"],
        nf = fl(function (a) {
          a = La(a);
          return I(
            "",
            A(function (c) {
              var b = c[0];
              c = c[1];
              return Ta(c) ? "" : b + "(" + c + ")";
            }, a)
          );
        }),
        gl =
          "A B BIG BODY BUTTON DD DIV DL DT EM FIELDSET FORM H1 H2 H3 H4 H5 H6 HR I IMG INPUT LI OL P PRE SELECT SMALL SPAN STRONG SUB SUP TABLE TBODY TD TEXTAREA TFOOT TH THEAD TR U UL ABBR AREA BLOCKQUOTE CAPTION CENTER CITE CODE CANVAS DFN EMBED FONT INS KBD LEGEND LABEL MAP OBJECT Q S SAMP STRIKE TT ARTICLE AUDIO ASIDE FOOTER HEADER MENU METER NAV PROGRESS SECTION TIME VIDEO NOINDEX NOBR MAIN svg circle clippath ellipse defs foreignobject g glyph glyphref image line lineargradient marker mask path pattern polygon polyline radialgradient rect set text textpath title".split(
            " "
          ),
        nq = /^\s*(data|javascript):/i,
        cj = new RegExp(
          I("", [
            "\\.(" +
              I(
                "|",
                "3gp 7z aac ac3 acs ai avi ape apk asf bmp bz2 cab cdr crc32 css csv cue divx dmg djvu? doc(x|m|b)? emf eps exe flac? flv iso swf gif t?gz jpe?g? js m3u8? m4a mp(3|4|e?g?) m4v md5 mkv mov msi ods og(g|m|v) psd rar rss rtf sea sfv sit sha1 svg tar tif?f torrent ts txt vob wave? wma wmv wmf webm ppt(x|m|b)? xls(x|m|b)? pdf phps png xpi g?zip".split(
                  " "
                )
              ) +
              ")$",
          ]),
          "i"
        ),
        Ra,
        rk =
          ((Ra = {}),
          (Ra.hit = "h"),
          (Ra.params = "p"),
          (Ra.reachGoal = "g"),
          (Ra.userParams = "up"),
          (Ra.trackHash = "th"),
          (Ra.accurateTrackBounce = "atb"),
          (Ra.notBounce = "nb"),
          (Ra.addFileExtension = "fe"),
          (Ra.extLink = "el"),
          (Ra.file = "fc"),
          (Ra.trackLinks = "tl"),
          (Ra.destruct = "d"),
          (Ra.setUserID = "ui"),
          (Ra.getClientID = "ci"),
          (Ra.clickmap = "cm"),
          (Ra.enableAll = "ea"),
          Ra),
        Es = x(function () {
          var a = 0;
          return function () {
            return (a += 1);
          };
        }),
        Fs = w(M, Es, ha),
        fg = {
          mc: function (a) {
            a = Rd(a).C("mt", {});
            a = La(a);
            return a.length
              ? K(
                  function (c, b, d) {
                    return "" + c + (d ? "-" : "") + b[0] + "-" + b[1];
                  },
                  "",
                  a
                )
              : null;
          },
          clc: function (a) {
            var c = H(a).C("cls", { jc: 0, x: 0, y: 0 }),
              b = c.jc,
              d = c.x;
            c = c.y;
            return b
              ? b + "-" + a.Math.floor(d / b) + "-" + a.Math.floor(c / b)
              : b + "-" + d + "-" + c;
          },
          rqnt: function (a, c, b) {
            a = b.J;
            return !a || a.nohit ? null : Fs(c);
          },
        },
        ar = x(function (a) {
          Gj(a, "_ymBRC", "1");
          var c = "1" !== Fj(a, "_ymBRC");
          c || Hj(a, "_ymBRC");
          return c;
        }),
        Oa = x(Ej),
        Zc = x(Ej, function (a, c, b) {
          return "" + c + b;
        }),
        Gs = x(U("document.documentElement")),
        Hs = x(function (a) {
          a = n(a, "document") || {};
          return ("" + (a.characterSet || a.charset || "")).toLowerCase();
        }),
        $a = x(w(U("document"), v("createElement", ic))),
        ci = x(function (a) {
          var c = n(a, "Element.prototype");
          return c
            ? (a = ob(
                function (b) {
                  var d = c[b];
                  return !!d && Ha(b, d);
                },
                [
                  "matches",
                  "webkitMatchesSelector",
                  "mozMatchesSelector",
                  "msMatchesSelector",
                  "oMatchesSelector",
                ]
              ))
              ? c[a]
              : null
            : null;
        }),
        Is = za("INPUT"),
        Ne = w(Ma, Is),
        Js = za("TEXTAREA"),
        Yq = w(Ma, Js),
        Ks = za("SELECT"),
        Zq = w(Ma, Ks),
        Oe = w(U("type"), bb(/^(checkbox|radio)$/)),
        Gf = w(Ma, bb(/^INPUT|SELECT|TEXTAREA$/)),
        te = w(Ma, bb(/^INPUT|SELECT|TEXTAREA|BUTTON$/)),
        Kf = "INPUT CHECKBOX RADIO TEXTAREA SELECT PROGRESS".split(" "),
        Xq = ["submit", "image", "hidden"],
        Ae = x(function () {
          for (var a = 59, c = {}, b = 0; b < gl.length; b += 1)
            (c[gl[b]] = String.fromCharCode(a)), (a += 1);
          return c;
        }),
        Aj = x(function (a) {
          return { vj: a, hb: null, qb: [] };
        }),
        yj = {},
        ig = {};
      yj.p = 500;
      var xj = { i: "id", n: "name", h: "href", ty: "type" };
      ig.h = !0;
      ig.c = !0;
      var Uc = {};
      Uc.p = mf;
      Uc.c = function (a, c, b) {
        (a = nb(n(c, "textContent"))) &&
          b &&
          ((b = b(c)),
          b.length && ab(w(U("textContent"), nb, za(a)), b) && (a = ""));
        Ne(c) && (a = nb((c.getAttribute && c.getAttribute("value")) || a));
        return a;
      };
      var $c,
        hg =
          "button," +
          A(
            function (a) {
              return 'input[type="' + a + '"]';
            },
            ["button", "submit", "reset", "file"]
          ).join(",") +
          ",a",
        Sf = v(hg, qb),
        Vq =
          (($c = {}),
          ($c.A = "h"),
          ($c.BUTTON = "i"),
          ($c.DIV = "i"),
          ($c.INPUT = "ty"),
          $c),
        hl = /\/$/,
        wj = rb("r", function (a, c) {
          var b = vj(a, c),
            d = b[0];
          return !b[1] && d;
        }),
        Kd = x(function () {
          return { Ga: {}, pending: {}, children: {} };
        }),
        Sg = U("postMessage"),
        Ls = B("s.f", function (a, c, b, d, e) {
          c = c(d);
          var f = Kd(a),
            g = I(":", [c.meta.qc, c.meta.key]);
          if (Sg(b)) {
            f.pending[g] = e;
            try {
              b.postMessage(c.$f, "*");
            } catch (h) {
              delete f.pending[g];
              return;
            }
            R(
              a,
              function () {
                delete f.pending[g];
              },
              5e3,
              "if.s"
            );
          }
        }),
        Ms = B("s.fh", function (a, c, b, d, e, f) {
          var g = null,
            h = null,
            k = Kd(a),
            l = null;
          try {
            (g = wb(a, f.data)), (h = g.__yminfo), (l = g.data);
          } catch (m) {
            return;
          }
          if (
            !ka(h) &&
            h.substring &&
            "__yminfo" === h.substring(0, 8) &&
            !ka(l) &&
            ((g = h.split(":")), 4 === g.length)
          )
            if (
              ((h = c.id),
              (c = g[1]),
              (a = g[2]),
              (g = g[3]),
              !da(l) && l.type && "0" === g && l.counterId)
            ) {
              if (!l.toCounter || l.toCounter == h) {
                k = null;
                try {
                  k = f.source;
                } catch (m) {}
                !Ta(k) &&
                  Sg(k) &&
                  ((f = d.T(l.type, [f, l])),
                  (e = A(w(P, Xh(e)), f.concat([{}]))),
                  (l = b([c, a, l.counterId], e)),
                  k.postMessage(l.$f, "*"));
              }
            } else
              g === "" + h &&
                da(l) &&
                la(function (m) {
                  return !(!m.hid || !m.counterId);
                }, l).length === l.length &&
                (b = k.pending[I(":", [c, a])]) &&
                b.apply(null, [f].concat(l));
        }),
        jd = x(function (a, c) {
          var b,
            d = ic("getElementsByTagName", n(a, "document")),
            e = Kd(a),
            f = Sg(a),
            g = md(a),
            h = ea(a);
          if (!d || !f) return null;
          d = d.call(a.document, "iframe");
          f = ((b = {}), (b.counterId = c.id), (b.hid = "" + wc(a)), b);
          Ke(a) && (f.duid = Ld(a, c));
          Rq(a, g);
          Sq(a);
          b = Tq(a, f);
          var k = C([a, v([], b)], Ls);
          y(function (l) {
            var m = null;
            try {
              m = l.contentWindow;
            } catch (p) {}
            m &&
              k(m, { type: "initToChild" }, function (p, q) {
                g.T("initToParent", [p, q]);
              });
          }, d);
          fb(a) &&
            k(a.parent, { type: "initToParent" }, function (l, m) {
              g.T("parentConnect", [l, m]);
            });
          h.F(a, ["message"], C([a, c, b, g, f], Ms));
          return { $: g, Ga: e.Ga, children: e.children, oe: k };
        }, w(cb, M)),
        kd = x(
          function (a, c) {
            if (!Ke(a) || !fb(a)) return Ld(a, c);
            var b = jd(a, c);
            return b && b.Ga[c.id]
              ? b.Ga[c.id].info.duid || Ld(a, c)
              : Ld(a, c);
          },
          function (a, c) {
            return "{" + c.Sd + c.Sa;
          }
        ),
        Ns = x(
          w(
            fa,
            Ba(function (a) {
              return -new a.l.Date().getTimezoneOffset();
            })
          )
        ),
        Os = w(
          fa,
          Ba(function (a) {
            a = new a.l.Date();
            return I(
              "",
              A(ir, [
                a.getFullYear(),
                a.getMonth() + 1,
                a.getDate(),
                a.getHours(),
                a.getMinutes(),
                a.getSeconds(),
              ])
            );
          })
        ),
        Ps = w(fa, Ba(gg)),
        yi = x(
          w(
            fa,
            Ba(function (a) {
              return a.Ba[0];
            })
          )
        ),
        Qs = x(function (a) {
          a = H(a);
          var c = a.C("counterNum", 0) + 1;
          a.D("counterNum", c);
          return c;
        }, w(cb, M)),
        pa,
        Jd =
          ((pa = {}),
          (pa.vf = v(Wc.version, P)),
          (pa.nt = ss),
          (pa.fu = function (a, c, b) {
            var d = b.J;
            if (!d) return null;
            c = (n(a, "document.referrer") || "").replace(hl, "");
            b = (d["page-ref"] || "").replace(hl, "");
            d = d["page-url"];
            a = Q(a).href !== d;
            c = c !== b;
            b = 0;
            a && c ? (b = 3) : c ? (b = 1) : a && (b = 2);
            return b;
          }),
          (pa.en = Hs),
          (pa.la = Zk),
          (pa.ut = function (a, c, b) {
            var d = b.M;
            b = b.J;
            d = d && d.Ic;
            b && (ui(a) || c.Ge || d) && (b.ut = Ga.wg);
            return null;
          }),
          (pa.v = v(Ga.cc, P)),
          (pa.cn = Qs),
          (pa.dp = function (a) {
            var c = H(a),
              b = c.C("bt", {});
            if (V(c.C("bt"))) {
              var d = n(a, "navigator.getBattery");
              try {
                b.p = d && d.call(a.navigator);
              } catch (e) {}
              c.D("bt", b);
              b.p &&
                b.p.then &&
                b.p.then(
                  E(a, "bi:dp.p", function (e) {
                    b.cj = n(e, "charging") && 0 === n(e, "chargingTime");
                  })
                );
            }
            return xb(b.cj);
          }),
          (pa.ls = x(function (a, c) {
            var b = Zc(a, c.id),
              d = fa(a),
              e = b.C("lsid");
            return +e ? e : ((d = Ua(a, 0, d(Y))), b.D("lsid", d), d);
          }, cb)),
          (pa.hid = wc),
          (pa.phid = function (a, c) {
            if (!fb(a)) return null;
            var b = jd(a, c);
            if (!b) return null;
            var d = ca(b.Ga);
            return d.length ? b.Ga[d[0]].info.hid : null;
          }),
          (pa.z = Ns),
          (pa.i = Os),
          (pa.et = Ps),
          (pa.c = w(U("navigator.cookieEnabled"), Ib)),
          (pa.rn = w(P, Ua)),
          (pa.rqn = function (a, c, b) {
            b = b.J;
            if (!b || b.nohit) return null;
            c = M(c);
            a = Zc(a, c);
            c = (a.C("reqNum", 0) || 0) + 1;
            a.D("reqNum", c);
            if (a.C("reqNum") === c) return c;
            a.Eb("reqNum");
            return null;
          }),
          (pa.u = kd),
          (pa.w = function (a) {
            a = Hc(a);
            return a[0] + "x" + a[1];
          }),
          (pa.s = function (a) {
            var c = n(a, "screen");
            if (c) {
              a = n(c, "width");
              var b = n(c, "height");
              c = n(c, "colorDepth") || n(c, "pixelDepth");
              return I("x", [a, b, c]);
            }
            return null;
          }),
          (pa.sk = U("devicePixelRatio")),
          (pa.ifr = w(fb, Ib)),
          (pa.j = w(us, Ib)),
          (pa.sti = function (a) {
            return fb(a) && ts(a) ? "1" : null;
          }),
          pa),
        Qq = x(function () {
          return ra(ca(Jd), ca(fg));
        }),
        Pq = x(Dc, M),
        tj = x(function () {
          return { Xe: null, va: [] };
        }, M),
        Mq = /^[a-z][\w.+-]+:/i,
        Tg,
        Tb = [
          [Pe, 1],
          [Je, 2],
          [Lb(), 3],
          [uj, 4],
        ],
        eg = [],
        tb = v(Tb, Oj),
        Sb = ((Tg = {}), (Tg.h = Tb), Tg),
        Z = v(Sb, Nj);
      tb(function (a) {
        return {
          N: function (c, b) {
            var d = c.J;
            if (!c.K || !d) return b();
            var e = d["page-ref"],
              f = d["page-url"];
            e && f !== e ? (d["page-ref"] = rj(a, e)) : delete d["page-ref"];
            d["page-url"] = rj(a, f).slice(0, Ga.ug);
            return b();
          },
        };
      }, -100);
      var Iq = /[^a-z0-9.:-]/,
        Ug,
        Vg = {},
        il = ta([
          cg && [cg, 0],
          Bb && [Bb, 1],
          [Cb, 2],
          Hd && [Hd, 3],
          [Sc, 4],
        ]),
        nc = ta([cg, Bb, Cb, Hd, Sc]),
        Wg = [Cb];
      Wg.unshift(Bb);
      Wg.push(Hd);
      var jl = ta(Wg),
        ad = ta([Sc]);
      ta([Bb, Cb]);
      var Rs = ta([Bb, Sc]),
        kl = ta([Bb, Cb, Hd, Sc]),
        ya = ((Ug = {}), (Ug.h = jl), Ug),
        Xg = x(function (a, c) {
          var b = Vg["*"] ? Vg["*"] : c && Vg[c];
          b || (b = c ? ya[c] || [] : nc);
          b = K(
            function (d, e) {
              var f = e(a);
              if (f) {
                var g = ob(w(Qc, za(e)), il);
                g && d.push([g[1], f]);
              }
              return d;
            },
            [],
            b
          );
          b.length || be();
          return b;
        }, cb),
        Yg,
        Ss = G(J.reject, J, Sa()),
        Ca = ((Yg = {}), (Yg.h = jb), Yg),
        ua = B(
          "g.sen",
          function (a, c, b) {
            var d = Xg(a, c);
            b = b ? Lq(a, c, b) : [];
            var e = Ca[c],
              f = e ? e(a, d, b) : jb(a, d, b);
            return function () {
              var g = Ia(arguments),
                h = g[0];
              g = g.slice(1);
              var k = h.aa;
              h = z(h, { aa: z(void 0 === k ? {} : k, { ia: [c] }) });
              return f.apply(null, [h].concat(g));
            };
          },
          Ss
        ),
        Aq = oa(function (a, c) {
          if (!c[a]) {
            var b,
              d = new J(function (e) {
                b = e;
              });
            c[a] = { Gf: b, promise: d, Hf: !1 };
          }
          return c[a].promise;
        }),
        nj = x(w(Dc, Ba)),
        Xd = x(function (a, c) {
          var b = n(a, "console"),
            d = n(b, "log");
          d = Ue("log", d) ? G(d, b) : F;
          var e = n(b, "warn");
          e = Ue("warn", e) ? G(e, b) : d;
          var f = n(b, "error");
          b = Ue("error", f) ? G(f, b) : d;
          return {
            log: Rc(a, "log", c, d),
            error: Rc(a, "error", c, b),
            warn: Rc(a, "warn", c, e),
          };
        }),
        Ts = B("dc.init", function (a, c) {
          function b(e) {
            for (var f = [], g = 1; g < arguments.length; g++)
              f[g - 1] = arguments[g];
            H(a).C("dce:" + c, !1) && d[e].apply(d, f);
            H(a)
              .C("dclq:" + c)
              .push([e, f]);
          }
          var d = Xd(a, c);
          H(a).Na("dclq:" + c, []);
          return Qe(a)
            ? { log: v("log", b), warn: v("warn", b), error: v("error", b) }
            : zq(a, c);
        }),
        Fd = x(Ts, cb),
        Us = B("p.dc", function (a, c) {
          var b = M(c);
          lj(a, "");
          lj(a, b);
        }),
        cm = B("h.p", function (a, c) {
          var b,
            d,
            e = ua(a, "h", c),
            f = c.xc || "" + Q(a).href,
            g = c.kh || a.document.referrer,
            h = {
              K: Ja(((b = {}), (b.pv = 1), b)),
              J: ((d = {}), (d["page-url"] = f), (d["page-ref"] = g), d),
              M: {},
            };
          h.M.R = c.R;
          h.M.Fe = c.Fe;
          c.lc && h.J && (h.J.nohit = "1");
          return e(h, c)
            .then(function (k) {
              k &&
                (c.lc ||
                  Kb(
                    a,
                    c,
                    "PageView. Counter " +
                      c.id +
                      ". URL: " +
                      f +
                      ". Referrer: " +
                      g,
                    c.R
                  )(),
                Ob(a, C([a, c, k], Bq)));
            })
            ["catch"](E(a, "h.g.s"));
        }),
        Zg = [
          "yandex_metrika_callback" + Wc.callbackPostfix,
          "yandex_metrika_callbacks" + Wc.callbackPostfix,
        ],
        Vs = B("cb.i", function (a) {
          var c = Zg[0],
            b = Zg[1];
          if (T(a[c])) a[c]();
          "object" === typeof a[b] &&
            y(function (d, e) {
              a[b][e] = null;
              Xf(a, d);
            }, a[b]);
          y(function (d) {
            try {
              delete a[d];
            } catch (e) {
              a[d] = void 0;
            }
          }, Zg);
        }),
        ll = x(function (a) {
          return (
            !!n(a, "crypto.subtle.digest") &&
            !!n(a, "TextEncoder") &&
            !!n(a, "FileReader") &&
            !!n(a, "Blob")
          );
        }),
        Ws = B("fpm", function (a, c) {
          if (!cl(a)) return F;
          var b = M(c);
          if (!ll(a)) return vb(a, b, "Not supported"), F;
          var d = Ea(a, c);
          return d
            ? function (e) {
                return new J(function (f, g) {
                  return va(e)
                    ? ca(e).length
                      ? f(
                          ij(a, e).then(function (h) {
                            var k, l;
                            h &&
                              h.length &&
                              d.params(
                                ((k = {}),
                                (k.__ym = ((l = {}), (l.fpp = h), l)),
                                k)
                              );
                          }, F)
                        )
                      : g(Sa("fpm.l"))
                    : g(Sa("fpm.o"));
                })["catch"](E(a, "fpm.en"));
              }
            : F;
        }),
        Ze = oa(function (a, c) {
          var b = {};
          $f(a)(function (d) {
            b = d[c] || {};
          });
          return b;
        }),
        Xs = B("c.c.cc", function (a) {
          var c = H(a),
            b = w(Ze(a), function (d) {
              var e,
                f = ((e = {}), (e.clickmap = !!d.clickmap), e);
              return z({}, d, f);
            });
          return E(a, "g.c.cc", w(G(c.C, c, "counters", {}), ca, zb(b)));
        }),
        Ys = B("gt.c.rs", function (a, c) {
          var b,
            d = M(c),
            e = c.id,
            f = c.ba,
            g = c.Lg,
            h = c.Ae,
            k = C([a, d], vq);
          Zf(
            a,
            d,
            ((b = {}),
            (b.id = e),
            (b.type = +f),
            (b.clickmap = g),
            (b.trackHash = !!h),
            b)
          );
          return k;
        }),
        gj = x(Bd),
        Ed = x(Dc, M),
        Zs = B("pa.int", function (a, c) {
          var b;
          return (
            (b = {}),
            (b.params = function () {
              var d,
                e,
                f = Ia(arguments),
                g = uq(f);
              if (!g) return null;
              f = g.Qg;
              var h = g.R;
              g = g.dc;
              if (!va(h) && !da(h)) return null;
              var k = ua(a, "1", c),
                l = Ed(c).url,
                m = !mj(c),
                p = "arams. Counter " + c.id,
                q = "P" + p,
                r = h,
                t = "";
              (t = n(h, "__ym.user_id")) && (q = "Set user id " + t);
              L("__ymu", ca(h)) && (q = "User p" + p);
              r.__ym &&
                ((r = z({}, h)),
                (r.__ym = K(
                  function (u, D) {
                    var O = n(h, "__ym." + D);
                    O && (u[D] = O);
                    return u;
                  },
                  {},
                  Vd
                )),
                ca(r.__ym).length || delete r.__ym,
                (m = !!ca(r).length));
              r = t ? void 0 : JSON.stringify(r);
              p = Kb(a, c, q, r);
              k = k(
                {
                  M: { R: h },
                  K: Ja(((d = {}), (d.pa = 1), (d.ar = 1), d)),
                  J: ((e = {}), (e["page-url"] = l || Q(a).href), e),
                },
                c
              ).then(m ? p : F);
              return Pc(a, "p.s", k, g, f);
            }),
            b
          );
        }),
        ne = x(ej, w(cb, M)),
        $s = B("y.p", function (a, c) {
          var b = ej(a, c);
          if (b) {
            var d = ie(a),
              e = C([a, b, c], qq);
            xh(a, d, function (f) {
              f.F(["params"], e);
            });
            b.$.F(["params"], w(U("1"), e));
          }
        }),
        Sr = x(function (a) {
          if ((a = $a(a))) return a("a");
        }),
        ml = { zj: bb(/[/&=?#]/) },
        Ce = B("go.in", function (a, c, b, d) {
          var e;
          void 0 === b && (b = "goal");
          return (
            (e = {}),
            (e.reachGoal = function (f, g, h, k) {
              var l, m;
              if (!f || (ml[b] && ml[b](f))) return null;
              var p = g,
                q = h || F;
              T(g) && ((q = g), (p = void 0), (k = h));
              var r = Kb(
                  a,
                  c,
                  "Reach goal. Counter: " + c.id + ". Goal id: " + f,
                  p
                ),
                t = "goal" === b;
              g = ua(a, "g", c);
              var u = pq(a, c, f, b);
              h = u[0];
              u = u[1];
              p = g(
                {
                  M: { R: p },
                  K: Ja(((l = {}), (l.ar = 1), l)),
                  J: ((m = {}), (m["page-url"] = h), (m["page-ref"] = u), m),
                },
                c
              ).then(function () {
                var D, O;
                t && r();
                pb(
                  a,
                  ((D = {}),
                  (D.counterKey = M(c)),
                  (D.name = "event"),
                  (D.data = ((O = {}), (O.schema = b), (O.name = f), O)),
                  D)
                );
                d && d();
              });
              return Pc(a, "g.s", p, q, k);
            }),
            e
          );
        }),
        at = B("guid.int", function (a, c) {
          var b;
          return (
            (b = {}),
            (b.getClientID = function (d) {
              var e = Ld(a, c);
              d && Xf(a, d, null, e);
              return e;
            }),
            b
          );
        }),
        tk,
        bt = B("th.e", function (a, c) {
          function b() {
            g ||
              (k = Oc(a, "onhashchange")
                ? ea(a).F(a, ["hashchange"], h)
                : Tr(a, h));
          }
          var d,
            e = ua(a, "t", c),
            f = Ie(a, M(c)),
            g = !1,
            h = E(a, "h.h.ch", G(Ur, null, a, c, e)),
            k = F;
          c.Ae && (b(), (g = !0));
          e = E(a, "tr.hs.h", function (l) {
            var m;
            l ? b() : k();
            g = !!l;
            f(((m = {}), (m.trackHash = g), m));
          });
          return (d = {}), (d.trackHash = e), (d.u = k), d;
        }),
        ct = oa(function (a, c) {
          ja(c) ? a.push(c) : y(w(P, Fa("push", a)), c);
        }),
        Dd = rb(
          "retryReqs",
          function (a) {
            var c = Oa(a),
              b = c.C("retryReqs", {}),
              d = fa(a)(Y);
            y(function (e) {
              var f = e[0];
              e = e[1];
              (!e || !e.time || e.time + 864e5 < d) && delete b[f];
            }, La(b));
            c.D("retryReqs", b);
            return b;
          },
          !0
        ),
        nl = w(function (a, c) {
          return se(a, c);
        }, za(0)),
        ol = Db(nl),
        dt = [ol("watch"), ol("clmap")],
        et = B("g.r", function (a) {
          var c = fa(a),
            b = Dd(a),
            d = c(Y),
            e = wc(a);
          return K(
            function (f, g) {
              var h = g[0],
                k = g[1];
              k &&
                ab(Ba(k.resource), dt) &&
                !k.d &&
                k.ghid &&
                k.ghid !== e &&
                k.time &&
                500 < d - k.time &&
                k.time + 864e5 > d &&
                2 >= k.browserInfo.rqnl &&
                ((k.d = 1),
                (h = {
                  protocol: k.protocol,
                  host: k.host,
                  Ca: k.resource,
                  zi: k.postParams,
                  R: k.params,
                  Dg: k.browserInfo,
                  xj: k.ghid,
                  time: k.time,
                  Sb: Da(h),
                  Og: k.counterId,
                  ba: k.counterType,
                }),
                k.telemetry && (h.Ia = k.telemetry),
                f.push(h));
              return f;
            },
            [],
            La(b)
          );
        }),
        ft = B("nb.p", function (a, c) {
          function b(D) {
            l() ||
              ((D = "number" === typeof D ? D : 15e3),
              (u = Vr(a, d(!1), D)),
              m());
          }
          function d(D) {
            return function (O) {
              var N, ia, wa;
              void 0 === O &&
                (O = ((N = {}), (N.ctx = {}), (N.callback = F), N));
              if (D || (!r && !k.Ld)) {
                r = !0;
                m();
                u && u();
                var Ab = p(Y);
                N = (Da(k.C("lastHit")) || 0) < Ab - 18e5;
                var Ad = 0.1 > Math.random();
                k.D("lastHit", Ab);
                Ab = Ja(((ia = {}), (ia.nb = 1), (ia.cl = t), (ia.ar = 1), ia));
                ia = Ed(c);
                ia = {
                  J: ((wa = {}), (wa["page-url"] = ia.url || Q(a).href), wa),
                  K: Ab,
                  M: { force: D },
                };
                wa = Xd(a, M(c)).warn;
                !O.callback && O.ctx && wa('"callback" argument missing');
                (wa = D || N || Ad) ||
                  ((wa = a.location.href),
                  (N = a.document.referrer),
                  (wa = !(wa && N ? dj(wa) === dj(N) : !wa && !N)));
                if (wa)
                  return (wa = g(ia, c)), Pc(a, "l.o.l", wa, O.callback, O.ctx);
              }
              return null;
            };
          }
          var e,
            f,
            g = ua(a, "n", c),
            h = M(c),
            k = Zc(a, c.id),
            l = v(v(h, Ze(a)), w(ha, U("accurateTrackBounce"))),
            m = v(((e = {}), (e.accurateTrackBounce = !0), e), Ie(a, h)),
            p = fa(a),
            q = p(Y),
            r = !1,
            t = 0,
            u;
          qa(c, function (D) {
            t = D.eh - q;
          });
          c.Me && b(c.Me);
          e = ((f = {}), (f.notBounce = d(!0)), (f.u = u), f);
          e.accurateTrackBounce = b;
          return e;
        }),
        iq = oa(dc)("(ym-disable-clickmap|ym-clickmap-ignore)"),
        gt = B("clm.p", function (a, c) {
          if (id(a)) return F;
          var b = ua(a, "m", c),
            d = M(c),
            e = fa(a),
            f = e(Y),
            g = v(v(d, Ze(a)), w(ha, U("clickmap"))),
            h,
            k = null;
          d = E(a, "clm.p.c", function (l) {
            var m = g();
            if (m) {
              var p = H(a),
                q = p.C("cls", { jc: 0, x: 0, y: 0 });
              p.D("cls", {
                jc: q.jc + 1,
                x: q.x + l.clientX,
                y: q.y + l.clientY,
              });
              p = "object" === typeof m ? m : {};
              q = p.filter;
              m = p.isTrackHash || !1;
              var r = A(function (u) {
                return ("" + u).toUpperCase();
              }, p.ignoreTags || []);
              V(h) && (h = p.quota || null);
              var t = !!p.quota;
              l = {
                element: jq(a, l),
                position: $i(a, l),
                button: kq(l),
                time: e(Y),
              };
              p = Q(a).href;
              if (hq(a, l, k, r, q)) {
                if (t) {
                  if (!h) return;
                  --h;
                }
                r = Me(a, l.element);
                q = r[0];
                r = r[1];
                t = jg(a, l.element);
                q = [
                  "rn",
                  Ua(a),
                  "x",
                  Math.floor((65535 * (l.position.x - t.left)) / (q || 1)),
                  "y",
                  Math.floor((65535 * (l.position.y - t.top)) / (r || 1)),
                  "t",
                  Math.floor((l.time - f) / 100),
                  "p",
                  mf(a, l.element),
                  "X",
                  l.position.x,
                  "Y",
                  l.position.y,
                ];
                q = I(":", q);
                m && (q += ":wh:1");
                gq(a, p, q, b, c);
                k = l;
              }
            }
          });
          return ea(a).F(n(a, "document"), ["click"], d);
        }),
        ht = B("trigger.in", function (a, c) {
          c.gg && Ob(a, C([a, "yacounter" + c.id + "inited"], $q), "t.i");
        }),
        it = B("c.m.p", function (a, c) {
          var b,
            d = M(c);
          return (b = {}), (b.clickmap = v(Ie(a, d), fq)), b;
        }),
        Bi = v("form", hc),
        Op = v("form", qb),
        eq = x(w(cb, Db(qa)(U("settings.form_goals"))), cb),
        jt = B("s.f.i", function (a, c) {
          var b = [],
            d = [],
            e = ea(a);
          b.push(e.F(a, ["click"], E(a, "s.f.c", C([a, c, d], dq))));
          b.push(
            e.F(
              a,
              ["submit"],
              E(a, "s.f.e", function (f) {
                var g = n(f, "target");
                f = n(f, "isTrusted");
                Xi(!0, a, c, d, g, f);
              })
            )
          );
          Yi(a, c, "Form goal. Counter " + c.id + ". Init.");
          return C([Be, b], y);
        }),
        kt = B("s.f.i", function (a, c) {
          return qa(c, function (b) {
            if (n(b, "settings.button_goals"))
              return (
                (b = ea(a).F(
                  a,
                  ["click"],
                  E(a, "c.t.c", w(C([a, c], df(a, c, "", cq))))
                )),
                Kb(a, c, "Button goal. Counter " + c.id + ". Init.")(),
                b
              );
          });
        }),
        Wb,
        Yd,
        $g,
        bd,
        Eb,
        Uf =
          ((Wb = {}),
          (Wb.transaction_id = "id"),
          (Wb.item_brand = "brand"),
          (Wb.index = "position"),
          (Wb.item_variant = "variant"),
          (Wb.value = "revenue"),
          (Wb.item_category = "category"),
          (Wb.item_list_name = "list"),
          Wb),
        gc =
          ((Yd = {}),
          (Yd.item_id = "id"),
          (Yd.item_name = "name"),
          (Yd.promotion_name = "coupon"),
          Yd),
        bq = (($g = {}), ($g.promotion_name = "name"), $g),
        pl =
          ((bd = {}),
          (bd.promotion_name = "name"),
          (bd.promotion_id = "id"),
          (bd.item_id = "product_id"),
          (bd.item_name = "product_name"),
          bd),
        Zp =
          "currencyCode add delete remove purchase checkout detail impressions click promoView promoClick".split(
            " "
          ),
        $p =
          ((Eb = {}),
          (Eb.view_item = { event: "detail", ya: gc, Ja: "products" }),
          (Eb.add_to_cart = { event: "add", ya: gc, Ja: "products" }),
          (Eb.remove_from_cart = { event: "remove", ya: gc, Ja: "products" }),
          (Eb.begin_checkout = { event: "checkout", ya: gc, Ja: "products" }),
          (Eb.purchase = { event: "purchase", ya: gc, Ja: "products" }),
          (Eb.view_item_list = { event: "impressions", ya: gc }),
          (Eb.select_item = { event: "click", Ja: "products", ya: gc }),
          (Eb.view_promotion = {
            event: "promoView",
            Ja: "promotions",
            ya: pl,
          }),
          (Eb.select_promotion = {
            event: "promoClick",
            Ja: "promotions",
            ya: pl,
          }),
          Eb),
        Wi = B("dl.w", function (a, c, b) {
          function d() {
            var g = n(a, c);
            (e = da(g) && Ge(a, g, b)) || (f = R(a, d, 1e3, "ec.dl"));
          }
          var e,
            f = 0;
          d();
          return function () {
            return ma(a, f);
          };
        }),
        lt = B("p.e", function (a, c) {
          var b = Ea(a, c);
          if (b) {
            var d = H(a);
            b = b.params;
            var e = E(a, "h.ee", C([a, M(c), b], Xp));
            return c.sd
              ? (d.D("ecs", 0), Vi(a, c.sd, e))
              : qa(c, function (f) {
                  if ((f = n(f, "settings.ecommerce")) && ja(f))
                    return d.D("ecs", 1), Vi(a, f, e);
                });
          }
        }),
        Si = x(function (a) {
          return I("[^\\d<>]*", a.split(""));
        }),
        jn = x(function (a) {
          return new RegExp(Si(a), "g");
        }),
        Up = /\S/,
        Li = v(
          [
            "style",
            "display:inline;margin:0;padding:0;font-size:inherit;color:inherit;line-height:inherit",
          ],
          Kc
        ),
        ql = x(function (a) {
          return id(a) || !Md(a);
        }),
        mt = B("phc.h", function (a, c) {
          if (!hk(a) && !ql(a))
            return qa(c, function (b) {
              if (!n(b, "settings.phchange")) {
                var d = Oa(a),
                  e =
                    Za(Q(a).search, "_ym_hide_phones=1") ||
                    d.C("_ym_hide_phones", 0);
                b = n(b, "settings.phhide");
                e && !b && ((b = ["*"]), d.D("_ym_hide_phones", 1));
                b && Di(a, c, b);
              }
            })["catch"](E(a, "phc.hs"));
        }),
        rl = x(function (a) {
          a = Q(a);
          a = ur(a.search.substring(1));
          a["_ym_status-check"] = a["_ym_status-check"] || "";
          a._ym_lang = a._ym_lang || "ru";
          return a;
        }),
        Gi = w(rl, U("_ym_status-check"), Da),
        nt = w(rl, U("_ym_lang")),
        Lp = /^http:\/\/([\w\-.]+\.)?webvisor\.com\/?$/,
        Mp =
          /^https:\/\/([\w\-.]+\.)?metri[kc]a\.yandex\.(ru|by|kz|com|com\.tr)\/?$/,
        Fi = bb(
          /^https:\/\/(yastatic\.net\/s3\/metrika|s3\.mds\.yandex\.net\/internal-metrika-betas|[\w-]+\.dev\.webvisor\.com|[\w-]+\.dev\.metrika\.yandex\.ru)\/(\w|-|\/|(\.)(?!\.))+\.js$/
        ),
        Qp = ["form", "button", "phone", "status"],
        ah = [],
        Np = x(
          function (a, c, b) {
            y(w(Tc([a, c, b]), ha), ah);
            if (b.inline) {
              c = Ei(b);
              var d = b.data;
              b = b.id;
              Ai(a, c, void 0 === b ? "" : b, void 0 === d ? "" : d);
            } else
              b.resource &&
                Fi(b.resource) &&
                ((a._ym__postMessageEvent = c),
                (a._ym__inpageMode = b.inpageMode),
                (a._ym__initMessage = b.initMessage),
                Rp(a, b.resource));
          },
          function (a, c, b) {
            return b.id;
          }
        ),
        ot = B("cs.init", function (a, c) {
          var b,
            d = Gi(a);
          if (d && c.id === d && "0" === c.ba) {
            var e = Ei(((b = {}), (b.lang = nt(a)), (b.fileId = "status"), b));
            R(a, C([a, e, "" + d], Ai), 0, "cs");
          }
        }),
        pt = B("suid.int", function (a, c) {
          var b;
          return (
            (b = {}),
            (b.setUserID = function (d, e, f) {
              if (ja(d) || ye(a, d)) {
                var g = Ea(a, c);
                d = Kc(["__ym", "user_id", d]);
                g.params(d, e || F, f);
              } else Xd(a, M(c)).error("Incorrect user ID");
            }),
            b
          );
        }),
        Nc = { position: "absolute" },
        zi = { position: "fixed" },
        Rf = { borderRadius: "50%" },
        qt = rb("siteStatistics", function (a, c) {
          if (!hk(a))
            return Jb(a)(
              Pa(
                F,
                C(
                  [
                    c,
                    w(
                      U("settings.sm"),
                      za(1),
                      C([C([a, c.id], Jp), F], sd),
                      ha
                    ),
                  ],
                  qa
                )
              )
            );
        }),
        rt = B("up.int", function (a, c) {
          var b;
          return (
            (b = {}),
            (b.userParams = E(a, "up.c", function (d, e, f) {
              var g,
                h = Ea(a, c),
                k = Fd(a, M(c)).warn;
              h
                ? va(d)
                  ? ((d = ((g = {}), (g.__ymu = d), g)),
                    (g = h.params) && g(d, e || F, f))
                  : k("Wrong user params")
                : k("No counter instance found");
            })),
            b
          );
        }),
        st = /[\*\.\?\(\)]/g,
        tt = x(function (a, c, b) {
          try {
            var d = b.replace("\\s", " ").replace(st, "");
            Fd(a, "").warn(
              'Function "' +
                d +
                '" has been overridden, this may cause issues with Metrika counter'
            );
          } catch (e) {}
        }, cb),
        ut = B("r.nn", function (a) {
          Qe(a) &&
            Ge(a, Dg, function (c) {
              c.Aa.F(function (b) {
                tt(a, b[1], b[0]);
                Dg.splice(100);
              });
            });
        }),
        vt = B("e.a.p", function (a, c) {
          var b,
            d = Ea(a, c);
          d = C(
            [
              w(P, Ba(!0)),
              ta(A(v(d, n), ["clickmap", "trackLinks", "accurateTrackBounce"])),
            ],
            A
          );
          c.Vg && d();
          return (b = {}), (b.enableAll = d), b;
        }),
        Ip = x(Dc),
        wt = B("fpi", function (a) {
          var c = vd(a);
          if (c && !a.document.hidden) {
            var b = ea(a).F(
              a,
              ["visibilitychange", "webkitvisibilitychange"],
              function () {
                a.document.hidden && (H(a).D("fht", c.now()), b());
              }
            );
            Jd.fp = Hp;
          }
        }),
        xt = v("add", xe),
        yt = v("remove", xe),
        zt = v("detail", xe),
        At = v("purchase", xe),
        Bt =
          "FB_IAB FBAV OKApp GSA/ yandex yango uber EatsKit YKeyboard iOSAppUslugi YangoEats PassportSDK".split(
            " "
          ),
        hf = x(function (a) {
          var c = Pk(a);
          a = c.kg;
          if (!c.nf) return !1;
          c = Fa("indexOf", a);
          c = ab(w(c, za(-1), Ac), Bt);
          var b = /CFNetwork\/[0-9][0-9.]*.*Darwin\/[0-9][0-9.]*/.test(a),
            d = /YaBrowser\/[\d.]+/.test(a),
            e = /Mobile/.test(a);
          return c || b || (d && e) || (!/Safari/.test(a) && e);
        }),
        Km = x(function (a) {
          var c = hb(a);
          return c ? Za(c, "YangoEats") || ud(a) : !1;
        }),
        Ep = /([0-9\\.]+) Safari/,
        Ct = /\sYptp\/\d\.(\d+)\s/,
        sl = x(function (a) {
          var c;
          a: {
            if ((c = hb(a)) && (c = Ct.exec(c)) && 1 < c.length) {
              c = Da(c[1]);
              break a;
            }
            c = 0;
          }
          return (50 <= c && 99 >= c) || sf(a, 79) ? !1 : !Ud(a) || hf(a);
        }),
        tl =
          "monospace;sans-serif;serif;Andale Mono;Arial;Arial Black;Arial Hebrew;Arial MT;Arial Narrow;Arial Rounded MT Bold;Arial Unicode MS;Bitstream Vera Sans Mono;Book Antiqua;Bookman Old Style;Calibri;Cambria;Cambria Math;Century;Century Gothic;Century Schoolbook;Comic Sans;Comic Sans MS;Consolas;Courier;Courier New;Garamond;Geneva;Georgia;Helvetica;Helvetica Neue;Impact;Lucida Bright;Lucida Calligraphy;Lucida Console;Lucida Fax;LUCIDA GRANDE;Lucida Handwriting;Lucida Sans;Lucida Sans Typewriter;Lucida Sans Unicode;Microsoft Sans Serif;Monaco;Monotype Corsiva;MS Gothic;MS Outlook;MS PGothic;MS Reference Sans Serif;MS Sans Serif;MS Serif;MYRIAD;MYRIAD PRO;Palatino;Palatino Linotype;Segoe Print;Segoe Script;Segoe UI;Segoe UI Light;Segoe UI Semibold;Segoe UI Symbol;Tahoma;Times;Times New Roman;Times New Roman PS;Trebuchet MS;Verdana;Wingdings;Wingdings 2;Wingdings 3".split(
            ";"
          ),
        Dt = x(function (a) {
          a = $a(a)("canvas");
          var c = n(a, "getContext");
          if (!c) return null;
          try {
            var b = G(c, a)("2d");
            b.font = "72px mmmmmmmmmmlli";
            var d = b.measureText("mmmmmmmmmmlli").width;
            return function (e) {
              b.font = "72px " + e;
              return b.measureText("mmmmmmmmmmlli").width === d;
            };
          } catch (e) {
            return null;
          }
        }),
        ul = na(String.prototype.repeat, "repeat"),
        Uh = ul
          ? function (a, c) {
              return ul.call(a, c);
            }
          : Bp,
        Oh = v(!0, function (a, c, b, d) {
          b = c.length && (b - d.length) / c.length;
          if (0 >= b) return d;
          c = Uh(c, b);
          return a ? c + d : d + c;
        }),
        Ve = [2277735313, 289559509],
        We = [1291169091, 658871167],
        Et = B("p.cd", function (a, c) {
          if (td(a) || Se(a)) {
            var b = Oa(a);
            if (ka(b.C("jn"))) {
              b.D("jn", !1);
              var d = a.chrome || xd(a) ? function () {} : /./,
                e = Xd(a, M(c));
              d.toString = function () {
                b.D("jn", !0);
                return "Yandex.Metrika counter is initialized";
              };
              e.log("%c%s", "color: inherit", d);
            }
          }
        }),
        Ft = x(function (a) {
          a = n(a, "navigator.plugins");
          return !!(a && Qa(a) && ab(w(U("name"), bb(/Chrome PDF Viewer/)), a));
        }),
        oc = oa(function (a, c) {
          return H(c).C(a, null);
        }),
        yp = { "*": "+", "-": "/", nj: "=", "+": "*", "/": "-", "=": "_" },
        Gt = x(function (a) {
          return T(n(a, "yandex.getSiteUid")) ? a.yandex.getSiteUid() : null;
        }),
        Ht = x(v("panoramaId", we)),
        It = x(function (a) {
          return we("pubcid.org", a) || we("_pubCommonId", a);
        }),
        Jt = x(v("_sharedid", we)),
        Kt = x(function (a, c) {
          if (c.Sa) return null;
          var b = Ic(a, "").C("_ga");
          return b && gd(ge(b));
        }, w(cb, M)),
        up = [
          ["domainLookupEnd", "domainLookupStart"],
          ["connectEnd", "connectStart"],
          ["responseStart", "requestStart"],
          ["responseEnd", "responseStart"],
          ["fetchStart", "navigationStart"],
          ["redirectEnd", "redirectStart"],
          [
            function (a, c) {
              return n(c, "redirectCount") || n(a, "navigation.redirectCount");
            },
          ],
          ["domInteractive", "domLoading"],
          ["domContentLoadedEventEnd", "domContentLoadedEventStart"],
          ["domComplete", "navigationStart"],
          ["loadEventStart", "navigationStart"],
          ["loadEventEnd", "loadEventStart"],
          ["domContentLoadedEventStart", "navigationStart"],
        ],
        ub,
        tp = [
          ["domainLookupEnd", "domainLookupStart"],
          ["connectEnd", "connectStart"],
          ["responseStart", "requestStart"],
          ["responseEnd", "responseStart"],
          ["fetchStart"],
          ["redirectEnd", "redirectStart"],
          ["redirectCount"],
          ["domInteractive", "responseEnd"],
          ["domContentLoadedEventEnd", "domContentLoadedEventStart"],
          ["domComplete"],
          ["loadEventStart"],
          ["loadEventEnd", "loadEventStart"],
          ["domContentLoadedEventStart"],
        ],
        wi =
          ((ub = {}),
          (ub.responseEnd = 1),
          (ub.domInteractive = 1),
          (ub.domContentLoadedEventStart = 1),
          (ub.domContentLoadedEventEnd = 1),
          (ub.domComplete = 1),
          (ub.loadEventStart = 1),
          (ub.loadEventEnd = 1),
          (ub.unloadEventStart = 1),
          (ub.unloadEventEnd = 1),
          (ub.secureConnectionStart = 1),
          ub),
        wp = x(Bd),
        qp = x(Dc),
        rp = x(function (a) {
          var c = n(a, "webkitRequestFileSystem");
          if (T(c) && !td(a))
            return new J(G(c, a, 0, 0))
              .then(function () {
                var d = n(a, "navigator.storage") || {};
                return d.estimate ? d.estimate() : {};
              })
              .then(function (d) {
                return (d = d.quota) && 12e7 > d ? !0 : !1;
              })
              ["catch"](v(!0, P));
          if (Qd(a))
            return (c = n(a, "navigator.serviceWorker")), J.resolve(V(c));
          c = n(a, "openDatabase");
          if (xd(a) && T(c)) {
            var b = !1;
            try {
              c(null, null, null, null);
            } catch (d) {
              b = !0;
            }
            return J.resolve(b);
          }
          return J.resolve(
            !n(a, "indexedDB") &&
              (n(a, "PointerEvent") || n(a, "MSPointerEvent"))
          );
        }),
        Lt = /(\?|&)turbo_uid=([\w\d]+)($|&)/,
        Mt = x(function (a, c) {
          var b = ec(a),
            d = Q(a).search.match(Lt);
          return d && 2 <= d.length
            ? ((d = d[2]), c.Sa || b.D("turbo_uid", d), d)
            : (b = b.C("turbo_uid"))
            ? b
            : "";
        }),
        Nt = B("pa.plgn", function (a, c) {
          var b = ne(a, c);
          b &&
            b.$.F(
              ["pluginInfo"],
              E(a, "c.plgn", function () {
                var d = H(a);
                d.D("cmc", d.C("cmc", 0) + 1);
                return fk(c);
              })
            );
        }),
        Nb,
        kb,
        Fm =
          ((Nb = {}),
          (Nb.am = "com.am"),
          (Nb.tr = "com.tr"),
          (Nb.ge = "com.ge"),
          (Nb.il = "co.il"),
          (Nb["\u0440\u0444"] = "ru"),
          (Nb["xn--p1ai"] = "ru"),
          (Nb["\u0431\u0435\u043b"] = "by"),
          (Nb["xn--90ais"] = "by"),
          Nb),
        vl = {
          "mc.edadeal.ru": /^([^/]+\.)?edadeal\.ru$/,
          "mc.yandexsport.ru": /^([^/]+\.)?yandexsport\.ru$/,
          "mc.kinopoisk.ru": /^([^/]+\.)?kinopoisk\.ru$/,
        },
        Gm =
          ((kb = {}),
          (kb.ka = "ge"),
          (kb.ro = "md"),
          (kb.tg = "tj"),
          (kb.tk = "tm"),
          (kb.et = "ee"),
          (kb.hy = "com.am"),
          (kb.he = "co.li"),
          (kb.ky = "kg"),
          (kb.be = "by"),
          (kb.tr = "com.tr"),
          (kb.kk = "kz"),
          kb),
        wl = /^https?:\/\//,
        Ot = {
          1882689622: 1,
          2318205080: 1,
          3115871109: 1,
          3604875100: 1,
          339366994: 1,
          2890452365: 1,
          849340123: 1,
          173872646: 1,
          2343947156: 1,
          655012937: 1,
          3724710748: 1,
          3364370932: 1,
          1996539654: 1,
          2065498185: 1,
          823651274: 1,
          12282461: 1,
          1555719328: 1,
          1417229093: 1,
          138396985: 1,
          3015043526: 1,
        },
        xl = x(function () {
          return K(
            function (a, c) {
              var b = bc(c + "/tag.js");
              a[b] = 1;
              return a;
            },
            {},
            [
              "mc.yandex.ru/metrika",
              "mc.yandex.com/metrika",
              "cdn.jsdelivr.net/npm/yandex-metrica-watch",
            ]
          );
        }),
        Pt = x(function (a) {
          a = vd(a);
          if (!a || !T(a.getEntriesByType)) return null;
          a = a.getEntriesByType("resource");
          var c = xl();
          return (a = ob(function (b) {
            b = b.name.replace(wl, "").split("?")[0];
            b = bc(b);
            return c[b];
          }, a))
            ? xb(a.transferSize)
            : null;
        }),
        mp = "ar:1:pv:1:v:" + Ga.cc + ":vf:" + Wc.version,
        np = Ga.Qa + "//" + fc + "/watch/" + Ga.og,
        yl = {},
        Qt = B("exps.int", function (a, c) {
          var b;
          return (
            (b = {}),
            (b.experiments = function (d, e, f) {
              var g, h;
              void 0 === e && (e = F);
              if (d && 0 < d.length) {
                var k = ua(a, "e", c),
                  l = Ed(c).url;
                d = k(
                  {
                    K: Ja(((g = {}), (g.ex = 1), (g.ar = 1), g)),
                    J:
                      ((h = {}),
                      (h["page-url"] = l || Q(a).href),
                      (h.exp = d),
                      h),
                  },
                  c
                );
                return Pc(a, "exps.s", d, e, f);
              }
            }),
            b
          );
        }),
        jf = [],
        Rt = B("p.fh", function (a, c) {
          var b, d;
          void 0 === c && (c = !0);
          var e = Oa(a),
            f = fa(a),
            g = e.C("wasSynced"),
            h = { id: 3, ba: "0" };
          return c && g && g.time + 864e5 > f(Y)
            ? J.resolve(g)
            : ua(
                a,
                "f",
                h
              )(
                {
                  K: Ja(((b = {}), (b.pv = 1), b)),
                  J:
                    ((d = {}),
                    (d["page-url"] = Q(a).href),
                    (d["page-ref"] = a.document.referrer),
                    d),
                },
                h
              )
                .then(function (k) {
                  var l;
                  k =
                    ((l = {}),
                    (l.time = f(Y)),
                    (l.params = n(k, "settings")),
                    (l.bkParams = n(k, "userData")),
                    l);
                  e.D("wasSynced", k);
                  return k;
                })
                ["catch"](E(a, "f.h"));
        }),
        St = oa(function (a, c) {
          0 === parseFloat(n(c, "settings.c_recp")) &&
            (a.Td.D("ymoo" + a.oa, a.dg(lb)),
            a.md && a.md.destruct && a.md.destruct());
        }),
        qf = w(U("settings.pcs"), za("1")),
        cp = [
          [
            ["'(-$&$&$'", 30102, 0],
            ["'(-$&$&$'", 29009, 0],
          ],
          [
            ["oWdZ[nc[jh_YW$Yec", 30103, 1],
            ["oWdZ[nc[jh_YW$Yec", 29010, 1],
          ],
        ],
        dp = [
          [["oWdZ[nc[jh_YW$Yec", 30103, 1]],
          [["oWdZ[nc[jh_YW$Yec", 29010, 1]],
        ],
        vi = { J: { t: 'UV|L7,!"T[rwe&D_>ZIb\\aW#98Y.PC6k' } },
        $o = { bg: 60, error: 15 },
        Zo = { bg: 5, error: 1 },
        ti = { id: 42822899, ba: "0" },
        zl = fc.split("."),
        Tt = zl.pop(),
        Al = I(".", zl),
        Em = x(function (a) {
          a = Q(a).hostname.split(".");
          return a[a.length - 1];
        }),
        Dm = x(function (a) {
          return (
            -1 !==
            Q(a).hostname.search(
              /(?:^|\.)(?:ya|yandex|beru|kinopoisk|edadeal)\.(?:\w+|com?\.\w+)$/
            )
          );
        }),
        Ut =
          /^(.*\.)?((yandex(-team)?)\.(com?\.)?[a-z]+|(auto|kinopoisk|beru|bringly)\.ru|ya\.(ru|cc)|yadi\.sk|yastatic\.net|.*\.yandex|turbopages\.org|turbo\.site|diplodoc\.(com|tech)|datalens\.tech)$/,
        le = x(function (a) {
          a = Q(a).hostname;
          var c = !1;
          a && (c = -1 !== a.search(Ut));
          return c;
        }),
        Vt =
          /^(.*\.)?((yandex(-team)?)\.(com?\.)?[a-z]+|(auto|kinopoisk|beru|bringly)\.ru|ya\.(ru|cc)|yadi\.sk|.*\.yandex|turbopages\.org|turbo\.site)$/,
        fp = x(function (a) {
          a = Q(a).hostname;
          var c = !1;
          a && (c = -1 !== a.search(Vt));
          return c;
        }),
        Bl = Ga.Qa + "//" + fc + "/metrika",
        qe = Bl + "/metrika_match.html",
        $e,
        jp = (($e = {}), ($e.s = "p"), ($e["8"] = "i"), $e),
        gp = rb("csp", function (a, c) {
          return ua(a, "s", c)({}, ["https://ymetrica1.com/watch/3/1"]);
        }),
        bh = "et w v z i u vf".split(" "),
        Cl = Nd("wv"),
        Wt = Nd("pub"),
        ii = (function () {
          function a(c, b) {
            this.l = c;
            this.type = b;
          }
          a.isEnabled = function (c) {
            return !!c.JSON;
          };
          a.prototype.Ha = function (c) {
            return Bf(mb(this.l, c));
          };
          a.prototype.tb = function (c) {
            var b = c.data;
            "string" !== typeof b && (b = mb(this.l, c.data));
            return b;
          };
          a.prototype.kb = function (c) {
            return encodeURIComponent(c).length;
          };
          a.prototype.se = function (c, b) {
            for (var d = Math.ceil(c.length / b), e = [], f = 0; f < b; f += 1)
              e.push(c.slice(f * d, d * (f + 1)));
            return e;
          };
          return a;
        })(),
        Uo = x(function (a) {
          function c(f, g, h, k) {
            d[0] = g;
            h[k] = e[3];
            h[k + 1] = e[2];
            h[k + 2] = e[1];
            h[k + 3] = e[0];
          }
          function b(f, g, h, k) {
            d[0] = g;
            h[k] = e[0];
            h[k + 1] = e[1];
            h[k + 2] = e[2];
            h[k + 3] = e[3];
          }
          if (
            "undefined" === typeof a.Float32Array ||
            "undefined" === typeof a.Uint8Array
          )
            return Vo;
          var d = new Float32Array([-0]),
            e = new Uint8Array(d.buffer);
          return 128 === e[3] ? b : c;
        }),
        Qo = ri(!1),
        Po = ri(!0),
        aa,
        Ec,
        Dl =
          ((aa = {}),
          (aa.mousemove = 0),
          (aa.mouseup = 1),
          (aa.mousedown = 2),
          (aa.click = 3),
          (aa.scroll = 4),
          (aa.windowblur = 5),
          (aa.windowfocus = 6),
          (aa.focus = 7),
          (aa.blur = 8),
          (aa.eof = 9),
          (aa.selection = 10),
          (aa.change = 11),
          (aa.input = 12),
          (aa.touchmove = 13),
          (aa.touchstart = 14),
          (aa.touchend = 15),
          (aa.touchcancel = 16),
          (aa.touchforcechange = 17),
          (aa.zoom = 18),
          (aa.resize = 19),
          (aa.keystroke = 20),
          (aa.deviceRotation = 21),
          (aa.fatalError = 22),
          (aa.hashchange = 23),
          (aa.stylechange = 24),
          (aa.articleInfo = 25),
          (aa.publishersHeader = 26),
          (aa.pageData = 27),
          (aa.mutationAdd = 28),
          (aa.mutationRemove = 29),
          (aa.mutationTextChange = 30),
          (aa.mutationAttributesChange = 31),
          aa),
        El =
          ((Ec = {}),
          (Ec.page = 0),
          (Ec.event = 1),
          (Ec.mutation = 2),
          (Ec.publishers = 3),
          (Ec.activity = 4),
          Ec),
        hi = (function () {
          function a(c, b) {
            var d,
              e,
              f = this;
            this.isSync = !1;
            this.Db = [];
            this.Xg =
              ((d = {}),
              (d.ad = "mutationAdd"),
              (d.re = "mutationRemove"),
              (d.tc = "mutationTextChange"),
              (d.ac = "mutationAttributesChange"),
              (d.page = "pageData"),
              d);
            this.Sg =
              ((e = {}),
              (e.ad = "addedNodesMutation"),
              (e.re = "removedNodesMutation"),
              (e.tc = "textChangeMutation"),
              (e.ac = "attributesChangeMutation"),
              (e.touchmove = "touchEvent"),
              (e.touchstart = "touchEvent"),
              (e.touchend = "touchEvent"),
              (e.touchforcechange = "touchEvent"),
              (e.touchcancel = "touchEvent"),
              (e.resize = "resizeEvent"),
              (e.scroll = "scrollEvent"),
              (e.change = "changeEvent"),
              (e.mousemove = "mouseEvent"),
              (e.mousedown = "mouseEvent"),
              (e.mouseup = "mouseEvent"),
              (e.click = "mouseEvent"),
              (e.focus = "focusEvent"),
              (e.blur = "focusEvent"),
              (e.deviceRotation = "deviceRotationEvent"),
              (e.zoom = "zoomEvent"),
              (e.keystroke = "keystrokesEvent"),
              (e.selection = "selectionEvent"),
              (e.stylechange = "stylechangeEvent"),
              (e.fatalError = "fatalErrorEvent"),
              (e.pageData = "page"),
              e);
            this.rh = function (g) {
              var h = g.type;
              return g.event ||
                ("publishersHeader" !== h && "articleInfo" !== h)
                ? { type: El[h], event: Dl[f.Xg[g.event] || g.event] }
                : { type: El.publishers, event: Dl[h] };
            };
            this.wf = function (g) {
              var h = !V(g.partNum),
                k = f.rh(g);
              k = {
                stamp: g.stamp,
                type: k.type,
                event: k.event,
                frameId: g.frameId,
                chunk: h ? g.data : void 0,
                partNum: g.partNum,
                end: g.end,
              };
              !h &&
                g.data &&
                (h = f.Sg[g.event] || g.event || g.type) &&
                (k[h] = g.data);
              return k;
            };
            this.l = c;
            this.type = b;
          }
          a.prototype.Ha = function (c, b) {
            var d = this;
            void 0 === b && (b = !1);
            var e = $b(c, this.wf),
              f = this.isSync || b ? Infinity : 10;
            e = hd(this.l, e, f);
            var g = [e];
            this.Db.push(e);
            return e(
              Qg(function (h) {
                h = ki(d.l, Fo, { Ci: h });
                h = hd(d.l, h, f, qg);
                g.push(h);
                d.Db.push(h);
                return h;
              })
            )(
              Qg(function (h) {
                h = ji(d.l, h.slice(-4));
                h = hd(d.l, h, f, qg);
                g.push(h);
                d.Db.push(h);
                return h;
              })
            )(
              el(function (h) {
                h = h[h.length - 1];
                y(function (k) {
                  k = He(d.l)(k, d.Db);
                  d.Db.splice(k, 1);
                }, g);
                return h;
              })
            );
          };
          a.prototype.tb = function (c) {
            return ki(this.l, li, this.wf(c))(rg(F));
          };
          a.prototype.kb = function (c) {
            return c[0];
          };
          a.prototype.se = function (c, b) {
            for (
              var d = ji(this.l, c)(rg(F)),
                e = Math.ceil(d.length / b),
                f = [],
                g = 0;
              g < b;
              g += 1
            )
              f.push(d.slice(g * e, e * (g + 1)));
            return f;
          };
          a.isEnabled = function (c) {
            var b = Qe(c),
              d = !1;
            try {
              d =
                (d = 2 === new c.Blob(["\u00e4"]).size) &&
                2 === new c.Blob([new c.Uint8Array([1, 2])]).size;
            } catch (e) {}
            return (
              !b && d && !(!c.Uint8Array || !n(c, "Uint8Array.prototype.slice"))
            );
          };
          return a;
        })(),
        Fl =
          "resize scroll mousemove mousedown click windowfocus keydown orientationchange change focus touchmove touchstart".split(
            " "
          ),
        Xt =
          "id pageTitle stamp chars authors updateDate publicationDate pageUrlCanonical topics rubric".split(
            " "
          ),
        Yt = (function () {
          function a(c, b, d, e, f) {
            var g = this;
            this.Fc = !1;
            this.meta = {};
            this.scroll = { x: 0, y: 0 };
            this.involvedTime = this.tf = 0;
            this.Ud = this.Bf = "";
            this.fa = [];
            this.pe = this.Yb = 0;
            this.wb = { h: 0, w: 0 };
            this.buffer = [];
            this.pg = Xt;
            this.flush = function () {
              g.pe = R(g.l, g.flush, 2500);
              var h = g.Cd();
              if (g.buffer.length || h) {
                var k = Gd(g.buffer);
                h && k.push(h);
                g.Bf = g.Ud;
                g.na.Ha(k)(
                  Pa(E(g.l, "p.b.st"), function (l) {
                    l && g.Ub(l);
                  })
                );
              }
            };
            this.Ub = e;
            this.na = d;
            this.bc = G(this.bc, this);
            this.Cd = G(this.Cd, this);
            this.flush = G(this.flush, this);
            this.l = c;
            this.oa = f;
            this.Tc = b;
            this.Pd = "pai" + b.id;
            this.Ib();
            this.Te = ea(this.l);
            this.time = fa(this.l);
            this.ig();
            this.Fd = H(this.l);
            this.Ee = null;
          }
          a.prototype.start = function () {
            this.pe = R(this.l, this.flush, 2500);
            if (!this.Fc) {
              this.Mi();
              var c = this.Fd.C(this.Pd, []),
                b = !c.length;
              c.push(G(this.Yh, this));
              this.Fd.Na(this.Pd, c);
              b && this.Kf();
              this.Ee = ea(this.l).F(this.l, ["click"], G(this.Ki, this));
              this.bc({ type: "page", target: this.l });
            }
          };
          a.prototype.stop = function () {
            this.$i();
            this.Fc = !0;
            this.flush();
            ma(this.l, this.pe);
          };
          a.prototype.qf = function (c) {
            return hc("html", this.l, c) !== this.l.document.documentElement;
          };
          a.prototype.Kf = function () {
            var c = this;
            E(this.l, "p.ic" + this.Tc.id, function () {
              if (!c.Fc) {
                var b = c.Fd.C(c.Pd),
                  d = c.Tc.dh();
                y(function (e) {
                  var f = A(function (g) {
                    return z({}, g);
                  }, d);
                  T(e) && e(f);
                }, b);
                c.Yb = R(c.l, G(c.Kf, c), 1e3, "p");
              }
            })();
          };
          a.prototype.Yh = function (c) {
            this.Fc || (this.aj(c), this.bj(), this.Hg());
          };
          a.prototype.Mg = function (c, b) {
            return (c.me || 0) <= (b.me || 0) ? b : c;
          };
          a.prototype.Ki = function (c) {
            if (this.fa.length) {
              c = bj(c);
              var b = Q(this.l).hostname,
                d;
              if ((d = c)) d = Fe(c.hostname) === Fe(b);
              d &&
                ((c = K(this.Mg, this.fa[0], this.fa).id),
                (b = wc(this.l)),
                Zc(this.l, this.oa.split(":")[0]).D("pai", c + "-" + b));
            }
          };
          a.prototype.bc = function (c) {
            var b = this;
            E(this.l, "p.ec." + this.Tc.id, function () {
              var d, e;
              try {
                var f = c.type;
                var g = c.target;
              } catch (p) {
                return;
              }
              var h = "page" === f;
              if ("scroll" === f || h) {
                var k = [
                  b.l,
                  b.l.document,
                  b.l.document.documentElement,
                  Bc(b.l),
                ];
                L(g, k) && b.Ib();
              }
              ("resize" === f || h) && b.ig();
              f = b.time(Y);
              var l = Math.min(f - b.tf, 5e3);
              b.involvedTime += Math.round(l);
              b.tf = f;
              if (b.meta && b.scroll && b.wb) {
                var m = b.wb.h * b.wb.w;
                b.fa = A(function (p) {
                  var q = z({}, p),
                    r = b.meta[q.id],
                    t = Gc(p.Cb);
                  if (!r || b.qf(q.element) || !t) return q;
                  p = b.l.Math;
                  r = p.max((b.scroll.y + b.wb.h - r.y) / r.height, 0);
                  var u = t.height * t.width;
                  t = qh(b.l, t, b.wb);
                  q.me = t / m;
                  q.visibility = t / u;
                  if (0.9 <= q.visibility || 0.1 <= q.me) q.involvedTime += l;
                  q.maxScrolled = p.round(1e4 * r) / 1e4;
                  return q;
                }, b.fa);
                pb(
                  b.l,
                  ((d = {}),
                  (d.name = "publishers"),
                  (d.counterKey = b.oa),
                  (d.data =
                    ((e = {}),
                    (e.involvedTime = b.involvedTime),
                    (e.contentItems = b.fa.map(function (p) {
                      var q;
                      return z(((q = {}), (q.contentElement = p.Cb), q), p);
                    })),
                    e)),
                  d)
                );
              }
            })();
          };
          a.prototype.aj = function (c) {
            var b = A(function (d) {
              return d.id;
            }, this.fa);
            this.fa = this.fa.concat(
              la(function (d) {
                return !L(d.id, b);
              }, c)
            );
          };
          a.prototype.ig = function () {
            var c = he(this.l) || Hc(this.l);
            this.wb = { w: c[0], h: c[1] };
          };
          a.prototype.bj = function () {
            var c = this;
            E(this.l, "p.um." + this.Tc.id, function () {
              var b = [];
              c.Ib();
              c.meta = K(
                function (d, e) {
                  var f;
                  if (c.qf(e.element)) b.push(e), delete d[e.id];
                  else {
                    var g =
                      ((f = {}),
                      (f.id = e.id),
                      (f.involvedTime = Math.max(e.involvedTime, 0)),
                      (f.maxScrolled = e.maxScrolled || 0),
                      (f.chars = e.update ? e.update("chars") || 0 : 0),
                      f);
                    e.Cb &&
                      (f = Gc(e.Cb)) &&
                      ((g.x = Math.max(Math.round(f.left) + c.scroll.x, 0)),
                      (g.y = Math.max(Math.round(f.top) + c.scroll.y, 0)),
                      (g.width = Math.round(f.width)),
                      (g.height = Math.round(f.height)));
                    d[e.id] = g;
                  }
                  return d;
                },
                {},
                c.fa
              );
              y(function (d) {
                d = He(c.l)(d, c.fa);
                c.fa.splice(d, 1);
              }, b);
            })();
          };
          a.prototype.Cd = function () {
            var c,
              b,
              d = A(v(this.meta, n), ca(this.meta));
            return d.length && ((this.Ud = mb(this.l, d)), this.Bf !== this.Ud)
              ? ((c = {}),
                (c.type = "publishersHeader"),
                (c.data =
                  ((b = {}),
                  (b.articleMeta = d || []),
                  (b.involvedTime = this.involvedTime),
                  b)),
                c)
              : null;
          };
          a.prototype.Hg = function () {
            var c = this;
            if (this.fa.length) {
              var b = A(
                function (d) {
                  var e,
                    f = K(
                      function (g, h) {
                        d[h] && (g[h] = d[h]);
                        return g;
                      },
                      {},
                      c.pg
                    );
                  d.Vf = !0;
                  return (
                    (e = {}),
                    (e.type = "articleInfo"),
                    (e.stamp = f.stamp),
                    (e.data = f),
                    e
                  );
                },
                la(function (d) {
                  return !d.Vf;
                }, this.fa)
              );
              b.length &&
                ((this.buffer = this.buffer.concat(b)),
                vb(this.l, this.oa, "Publisher content info found: ", b));
            }
          };
          a.prototype.Mi = function () {
            this.Te.F(this.l, Fl, this.bc);
          };
          a.prototype.$i = function () {
            this.Ee && this.Ee();
            this.Te.Zb(this.l, Fl, this.bc);
          };
          a.prototype.Ib = function () {
            this.scroll = {
              x:
                this.l.pageXOffset ||
                n(this.l, "document.documentElement.scrollLeft") ||
                0,
              y:
                this.l.pageYOffset ||
                n(this.l, "document.documentElement.scrollLeft") ||
                0,
            };
          };
          return a;
        })(),
        Zd,
        ch = ((Zd = {}), (Zd[1] = 500), (Zd[2] = 500), (Zd[3] = 0), Zd),
        Zt = ["topics", "rubric", "authors"],
        dh = (function () {
          function a(c, b) {
            var d,
              e = this;
            this.id = "a";
            this.Kd = !1;
            this.Fb = {};
            this.sb = {
              "schema.org":
                "Article NewsArticle Movie BlogPosting Review Recipe Answer".split(
                  " "
                ),
              yf: ["article"],
            };
            this.Ce = ((d = {}), (d.Answer = 3), (d.Review = 2), d);
            this.We = x(
              function (f, g, h) {
                vb(
                  e.l,
                  e.oa,
                  "Warning: invalid value " +
                    h +
                    " in " +
                    g +
                    " in field " +
                    f +
                    ", this item will be ignored"
                );
              },
              function (f, g, h) {
                return "" + f + g + h;
              }
            );
            this.dj = function (f) {
              Zt.forEach(function (g) {
                f[g] &&
                  (f[g] = f[g].reduce(function (h, k) {
                    var l = k.name,
                      m = k.position;
                    if (!l) return e.We(g, "name", l), h;
                    if ("string" === typeof m) {
                      l = uf(m);
                      if (null === l || e.l.isNaN(l))
                        return e.We(g, "position", m), h;
                      k.position = l;
                    }
                    h.push(k);
                    return h;
                  }, []));
              });
              return f;
            };
            this.Ng = x(function (f, g) {
              vb(
                e.l,
                e.oa,
                "Warning: content has only " +
                  g.chars +
                  " chars. Required " +
                  ch[g.type],
                g
              );
            });
            this.l = c;
            this.root = ac(c);
            this.oa = b;
          }
          a.prototype.La = function (c) {
            return c.element;
          };
          a.prototype.cf = function (c, b) {
            var d = this,
              e;
            E(this.l, "P.s." + b, function () {
              e = d.Fb[b].call(d, c);
            })();
            return e;
          };
          a.prototype.Ai = function (c) {
            var b = z({}, c);
            this.Kd &&
              !b.id &&
              L(c.type, [3, 2]) &&
              ((c = I(", ", A(U("name"), b.authors || []))),
              (b.pageTitle = c + ": " + b.pageTitle));
            b.pageTitle || (b.pageTitle = this.Bh(b.Cb));
            b.pageUrlCanonical ||
              ((c = b.id),
              (b.pageUrlCanonical = (
                "string" !== typeof c ? 0 : /^(https?:)\/\//.test(c)
              )
                ? b.id
                : this.zh()));
            b.id || (b.id = b.pageTitle || b.pageUrlCanonical);
            return b;
          };
          a.prototype.Ea = function (c) {
            var b = this,
              d = {},
              e = this.La(c);
            if (!e) return null;
            d.type = c.type;
            y(function (g) {
              d[g] = b.cf(c, g);
            }, ca(this.Fb));
            var f = fa(this.l);
            d.stamp = f(Uj);
            d.element = c.element;
            d.Cb = e;
            d = this.dj(this.Ai(d));
            d.id = d.id ? bc(d.id) : 1;
            d.update = function (g) {
              return b.La(c) ? b.cf(c, g) : void 0;
            };
            return d;
          };
          a.prototype.Bh = function (c) {
            for (var b = 1; 5 >= b; b += 1) {
              var d = Xa(Yb("h" + b, c));
              if (d) return d;
            }
          };
          a.prototype.zh = function () {
            var c = Yb('[rel="canonical"]', this.root);
            if (c) return c.href;
          };
          a.prototype.hf = function () {
            return 1;
          };
          a.prototype.wc = function () {
            return [];
          };
          a.prototype.dh = function () {
            var c = this,
              b = this.wc(),
              d = 1;
            return K(
              function (e, f) {
                var g = c.Ea({ element: f, type: c.hf(f) }) || [];
                da(g) || (g = [g]);
                g = K(
                  function (h, k) {
                    var l = h.values,
                      m = h.kf;
                    k && k.chars > ch[k.type] && !L(k.id, m)
                      ? (l.push(k), m.push(k.id))
                      : k && k.chars <= ch[k.type] && c.Ng(k.id, k);
                    return { values: l, kf: m };
                  },
                  { values: [], kf: A(U("id"), e) },
                  g
                ).values;
                return e.concat(
                  A(function (h) {
                    var k;
                    h = z(
                      ((k = { index: d, Vf: !1 }), (k.involvedTime = 0), k),
                      h
                    );
                    d += 1;
                    return h;
                  }, g)
                );
              },
              [],
              b
            );
          };
          return a;
        })(),
        Gl = (function (a) {
          function c() {
            var b,
              d = (null !== a && a.apply(this, arguments)) || this;
            d.id = "j";
            d.Kd = !0;
            d.Qe = I(",", [
              'script[type="application/ld+json"]',
              'script[type="application/json+ld"]',
              'script[type="ld+json"]',
              'script[type="json+ld"]',
            ]);
            d.Fb =
              ((b = {}),
              (b.id = function (e) {
                var f = e.data["@id"];
                e = e.data.mainEntity || e.data.mainEntityOfPage;
                !f && va(e) && (f = e["@id"]);
                return f;
              }),
              (b.chars = function (e) {
                var f = e.data;
                return ja(f.text) ? f.text.length : Hb(this.La(e)).length;
              }),
              (b.authors = function (e) {
                e = e.data;
                var f = [];
                f = f.concat(this.vc(e, "author"));
                f = f.concat(this.vc(e.mainEntity, "author"));
                return f.concat(this.vc(e.mainEntityOfPage, "author"));
              }),
              (b.pageTitle = function (e) {
                var f = e.data,
                  g = f.headline || "";
                f.alternativeHeadline && (g += " " + f.alternativeHeadline);
                "" === g &&
                  (f.name
                    ? (g = f.name)
                    : f.itemReviewed && (g = f.itemReviewed));
                3 === e.type && va(f.parentItem) && (g = f.parentItem.text);
                return g;
              }),
              (b.updateDate = function (e) {
                return e.data.dateModified || "";
              }),
              (b.publicationDate = function (e) {
                return e.data.datePublished || "";
              }),
              (b.pageUrlCanonical = function (e) {
                return e.data.url;
              }),
              (b.topics = function (e) {
                return this.vc(e.data, "about", ["name", "alternateName"]);
              }),
              (b.rubric = function (e) {
                var f = this,
                  g = this.La(e);
                e = ta(
                  A(function (h) {
                    h = wb(f.l, Hb(h));
                    if (va(h) || da(h)) {
                      var k = f.df(h);
                      if (k)
                        return K(
                          function (l, m) {
                            return l
                              ? l
                              : va(m) && "BreadcrumbList" === m["@type"]
                              ? m
                              : l;
                          },
                          null,
                          k
                        );
                      if ("BreadcrumbList" === h["@type"]) return h;
                    }
                    return null;
                  }, [e.element].concat(
                    qb(
                      this.Qe,
                      document.body === g ? document.documentElement : g
                    )
                  ))
                );
                return e.length && ((e = e[0].itemListElement), da(e))
                  ? ta(
                      A(function (h) {
                        return va(h) &&
                          h.item &&
                          va(h.item) &&
                          !f.l.isNaN(h.position)
                          ? {
                              name: h.item.name || h.name,
                              position: h.position,
                            }
                          : null;
                      }, e)
                    )
                  : [];
              }),
              b);
            return d;
          }
          Na(c, a);
          c.prototype.vc = function (b, d, e) {
            void 0 === e && (e = ["name"]);
            if (!b || !b[d]) return [];
            b = da(b[d]) ? b[d] : [b[d]];
            b = ta(
              A(function (f) {
                return f
                  ? "string" === typeof f
                    ? f
                    : K(
                        function (g, h) {
                          return g || "" + f[h];
                        },
                        "",
                        e
                      )
                  : null;
              }, b)
            );
            return A(function (f) {
              var g;
              return (g = {}), (g.name = f), g;
            }, b);
          };
          c.prototype.La = function (b) {
            var d = b.element,
              e = b.data || {};
            b = e["@id"];
            var f = e.url;
            e = null;
            f && ja(f) && (e = this.Ve(f));
            !e && b && ja(b) && (e = this.Ve(b));
            e ||
              ((e = b = d.parentNode),
              !hc("head", this.l, d) && b && 0 !== Hb(b).length) ||
              (e = this.l.document.body);
            return e;
          };
          c.prototype.Ve = function (b) {
            try {
              var d = Lc(this.l, b).hash;
              if (d) {
                var e = Yb(d, this.l.document.body);
                if (e) return e;
              }
            } catch (f) {}
            return null;
          };
          c.prototype.$d = function (b) {
            return this.Ce[b["@type"]] || 1;
          };
          c.prototype.Ea = function (b) {
            var d = this,
              e = b.element,
              f = b.data;
            if (
              !f &&
              ((f = wb(this.l, Hb(e))),
              !f || (!/schema\.org/.test(f["@context"]) && !da(f)))
            )
              return null;
            var g = this.df(f);
            if (g)
              return A(function (k) {
                return va(k) && L(k["@type"], d.sb["schema.org"])
                  ? a.prototype.Ea.call(d, {
                      element: e,
                      data: k,
                      type: d.$d(k),
                    })
                  : null;
              }, g);
            b.data = f;
            if ("QAPage" === b.data["@type"]) {
              var h = b.data.mainEntity || b.data.mainEntityOfPage;
              if (!h) return null;
            }
            "Question" === b.data["@type"] && (h = b.data);
            return h
              ? ((b = pc(v(h, n), ["acceptedAnswer", "suggestedAnswer"])),
                A(function (k) {
                  var l;
                  if (!va(k) || !L(k["@type"], d.sb["schema.org"])) return null;
                  k = {
                    element: e,
                    type: d.$d(k),
                    data: z(((l = {}), (l.parentItem = h), l), k),
                  };
                  return a.prototype.Ea.call(d, k);
                }, b))
              : L(b.data["@type"], this.sb["schema.org"])
              ? a.prototype.Ea.call(this, z(b, { type: this.$d(b.data) }))
              : null;
          };
          c.prototype.wc = function () {
            return qb(this.Qe, this.root);
          };
          c.prototype.df = function (b) {
            if (da(b)) return b;
            if (b && da(b["@graph"])) return b["@graph"];
          };
          return c;
        })(dh),
        eh = (function (a) {
          function c() {
            var b,
              d = (null !== a && a.apply(this, arguments)) || this;
            d.id = "s";
            d.Kd = !0;
            d.Zi = Fa(
              "exec",
              new RegExp("schema.org\\/(" + I("|", ca(d.Ce)) + ")$")
            );
            d.Fb =
              ((b = {}),
              (b.id = function (e) {
                e = e.element;
                var f = db(this.l, e, "identifier");
                return f
                  ? Xa(f)
                  : (f = db(this.l, e, "mainEntityOfPage")) &&
                    f.getAttribute("itemid")
                  ? f.getAttribute("itemid")
                  : null;
              }),
              (b.chars = function (e) {
                var f = 0;
                e = e.element;
                for (
                  var g = [
                      "articleBody",
                      "reviewBody",
                      "recipeInstructions",
                      "description",
                      "text",
                    ],
                    h = 0;
                  h < g.length;
                  h += 1
                ) {
                  var k = db(this.l, e, g[h]);
                  if (k) {
                    f = Xa(k).length;
                    break;
                  }
                }
                e = Hb(e);
                0 === f && e && (f += e.length);
                return f;
              }),
              (b.topics = function (e) {
                var f = this,
                  g = Td(this.l, e.element, "about");
                return A(function (h) {
                  var k = { name: Xa(h) };
                  if ((g = db(f.l, h, "name"))) k.name = Xa(g);
                  return k;
                }, g);
              }),
              (b.rubric = function (e) {
                var f = this;
                (e = Yb(
                  '[itemtype$="schema.org/BreadcrumbList"]',
                  e.element
                )) ||
                  (e = Yb(
                    '[itemtype$="schema.org/BreadcrumbList"]',
                    this.root
                  ));
                return e
                  ? A(function (g) {
                      return {
                        name: Xa(db(f.l, g, "name")),
                        position: Xa(db(f.l, g, "position")),
                      };
                    }, Td(this.l, e, "itemListElement"))
                  : [];
              }),
              (b.updateDate = function (e) {
                return (e = db(this.l, e.element, "dateModified")) ? vk(e) : "";
              }),
              (b.publicationDate = function (e) {
                return (e = db(this.l, e.element, "datePublished"))
                  ? vk(e)
                  : "";
              }),
              (b.pageUrlCanonical = function (e) {
                e = Td(this.l, e.element, "url");
                if (e.length) {
                  var f = e[0];
                  return f.href ? f.href : Xa(e);
                }
                return null;
              }),
              (b.pageTitle = function (e) {
                var f = "",
                  g = e.element,
                  h = db(this.l, g, "headline");
                h && (f += Xa(h));
                (h = db(this.l, g, "alternativeHeadline")) &&
                  (f += " " + Xa(h));
                "" === f &&
                  ((h = db(this.l, g, "name")) ||
                    (h = db(this.l, g, "itemReviewed")),
                  h && (f += Xa(h)));
                3 === e.type &&
                  (e = hc('[itemtype$="schema.org/Question"]', this.l, g)) &&
                  (e = db(this.l, e, "text")) &&
                  (f += Xa(e));
                return f;
              }),
              (b.authors = function (e) {
                var f = this;
                e = Td(this.l, e.element, "author");
                return A(function (g) {
                  var h,
                    k = ((h = {}), (h.name = ""), h);
                  /.+schema.org\/(Person|Organization)/.test(
                    g.getAttribute("itemtype") || ""
                  ) &&
                    (h = db(f.l, g, "name")) &&
                    (k.name = Xa(h));
                  k.name ||
                    (k.name =
                      g.getAttribute("content") ||
                      Hb(g) ||
                      g.getAttribute("href"));
                  return k;
                }, e);
              }),
              b);
            return d;
          }
          Na(c, a);
          c.prototype.hf = function (b) {
            b = b.getAttribute("itemtype") || "";
            return (b = this.Zi(b)) ? this.Ce[b[1]] : 1;
          };
          c.prototype.Ea = function (b) {
            return b.element && Hb(b.element).length
              ? a.prototype.Ea.call(this, b)
              : null;
          };
          c.prototype.wc = function () {
            var b = I(
              ",",
              A(function (d) {
                return '[itemtype$="schema.org/' + d + '"]';
              }, this.sb["schema.org"])
            );
            return qb(b, this.root);
          };
          return c;
        })(dh),
        Hl = (function (a) {
          function c(b, d) {
            var e,
              f = a.call(this, b, d) || this;
            f.id = "o";
            f.Fb =
              ((e = {}),
              (e.chars = function (g) {
                g = this.La(g);
                return Hb(g).length;
              }),
              (e.authors = function (g) {
                return this.yd(g.data.author);
              }),
              (e.pageTitle = function (g) {
                return this.Ac(g.data.title) || "";
              }),
              (e.updateDate = function (g) {
                return this.Ac(g.data.modified_time);
              }),
              (e.publicationDate = function (g) {
                return this.Ac(g.data.published_time);
              }),
              (e.pageUrlCanonical = function (g) {
                return this.Ac(g.data.url);
              }),
              (e.rubric = function (g) {
                return this.yd(g.data.section);
              }),
              (e.topics = function (g) {
                return this.yd(g.data.tag);
              }),
              e);
            f.Wg = new RegExp("^(og:)?((" + I("|", f.sb.yf) + "):)?");
            return f;
          }
          Na(c, a);
          c.prototype.yd = function (b) {
            var d;
            return b
              ? da(b)
                ? A(function (e) {
                    var f;
                    return (f = {}), (f.name = e ? "" + e : null), f;
                  }, b)
                : [((d = {}), (d.name = b ? "" + b : null), d)]
              : [];
          };
          c.prototype.Ac = function (b) {
            return da(b) ? (b.length ? "" + b[0] : null) : b ? "" + b : null;
          };
          c.prototype.wc = function () {
            var b = qb('meta[property="og:type"]', this.l.document.body);
            return [this.l.document.head].concat(b);
          };
          c.prototype.qh = function (b) {
            var d = this,
              e = b.element,
              f = {},
              g = this.La(b);
            e = qb("meta[property]", e === this.l.document.head ? e : g);
            if (e.length)
              y(function (h) {
                try {
                  if (
                    h.parentNode === g ||
                    h.parentNode === d.l.document.head
                  ) {
                    var k = h.getAttribute("property").replace(d.Wg, ""),
                      l = Xa(h);
                    f[k]
                      ? da(f[k])
                        ? f[k].push(l)
                        : (f[k] = [f[k], l])
                      : (f[k] = l);
                  }
                } catch (m) {
                  ve(d.l, "og.ed", m);
                }
              }, e);
            else return null;
            return L(f.type, this.sb.yf) ? z(b, { data: f }) : null;
          };
          c.prototype.La = function (b) {
            b = b.element;
            var d = this.l.document;
            return b === d.head ? d.body : b.parentNode;
          };
          c.prototype.Ea = function (b) {
            return (b = this.qh(b)) ? a.prototype.Ea.call(this, b) : null;
          };
          return c;
        })(dh),
        $d = {};
      Gl && ($d.json_ld = Gl);
      eh && (($d.schema = eh), ($d.microdata = eh));
      Hl && ($d.opengraph = Hl);
      var $t = B("p.p", function (a, c) {
          function b(m) {
            var p = z({}, l);
            p.aa.ca = m;
            return f(p, c)["catch"](E(a, "s.ww.p"));
          }
          var d,
            e = gi(a, "9", "8");
          if (!Ha("querySelectorAll", a.document.querySelectorAll) || !e)
            return J.resolve();
          var f = ua(a, "p", c),
            g = Ja(),
            h = Zc(a, c.id),
            k = h.C("pai");
          k && (h.Eb("pai"), g.D("pai", k));
          var l = { J: ((d = {}), (d["wv-type"] = e.type), d), K: g, aa: {} };
          return qa(
            c,
            E(a, "ps.s", function (m) {
              if ((m = n(m, "settings.publisher.schema"))) {
                gk(c) && (m = "microdata");
                var p = $d[m];
                if (p && e) {
                  var q = M(c);
                  p = new p(a, q);
                  p = new Yt(a, p, e, b, q);
                  p.start();
                  vb(a, q, 'Publishers analytics schema "' + m + '"');
                  return G(p.stop, p);
                }
              }
            })
          );
        }),
        au = (function () {
          function a(c, b) {
            this.type = "0";
            this.l = c;
            this.oh = b;
          }
          a.prototype.Ha = function (c) {
            return Bf(pc(G(this.tb, this), c));
          };
          a.prototype.tb = function (c, b) {
            var d = this,
              e = [],
              f = this.oh(this.l, b && b.type, c.type);
            f &&
              (e = pc(function (g) {
                return g({ l: d.l, qa: c }) || [];
              }, f));
            return e;
          };
          a.prototype.kb = function (c) {
            return c.length;
          };
          a.prototype.se = function (c) {
            return [c];
          };
          a.prototype.isEnabled = function () {
            return !0;
          };
          return a;
        })(),
        Il = (function () {
          function a(c, b, d) {
            this.Re = 0;
            this.ae = 1;
            this.bd = 5e3;
            this.l = c;
            this.na = b;
            this.Ub = d;
          }
          a.prototype.Wc = function () {
            this.Re = R(
              this.l,
              w(G(this.flush, this), G(this.Wc, this)),
              this.bd,
              "b.f"
            );
          };
          a.prototype.send = function (c, b) {
            var d = this.Ub(c, b || [], this.ae);
            this.ae += 1;
            return d;
          };
          a.prototype.push = function () {};
          a.prototype.flush = function () {};
          return a;
        })(),
        Un = (function (a) {
          function c(b, d, e) {
            b = a.call(this, b, d, e) || this;
            b.buffer = [];
            b.qg = 7500;
            b.bd = 3e4;
            b.Wc();
            return b;
          }
          Na(c, a);
          c.prototype.push = function (b, d) {
            var e = this.na.tb(b, d);
            ra(this.buffer, e);
            this.na.kb(this.buffer) > this.qg && this.flush();
          };
          c.prototype.flush = function () {
            var b = this.buffer;
            b.length && (this.send(b), (this.buffer = []));
          };
          return c;
        })(Il),
        jo = /opera mini/i,
        ai = ["phone", "email"],
        Jl =
          "first(-|\\.|_|\\s){0,2}name last(-|\\.|_|\\s){0,2}name zip postal address passport (bank|credit)(-|\\.|_|\\s){0,2}card card(-|\\.|_|\\s){0,2}number card(-|\\.|_|\\s){0,2}holder cvv card(-|\\.|_|\\s){0,2}exp card(-|\\.|_|\\s){0,2}name card.*month card.*year card.*month card.*year password birth(-|\\.|_|\\s){0,2}(day|date) second(-|\\.|_|\\s){0,2}name third(-|\\.|_|\\s){0,2}name patronymic middle(-|\\.|_|\\s){0,2}name birth(-|\\.|_|\\s){0,2}place house street city flat state contact.*".split(
            " "
          ),
        go = /^[\w\u0410-\u042f\u0430-\u044f]$/,
        ho = [65, 90],
        io = [97, 122],
        eo =
          "color radio checkbox date datetime-local email month number password range search tel text time url week".split(
            " "
          ),
        bo = new RegExp("(" + I("|", Jl) + ")", "i"),
        ao = new RegExp("(" + I("|", ai) + ")", "i"),
        wk = ["password", "passwd", "pswd"],
        co = new RegExp(
          "(" +
            I(
              "|",
              Jl.concat(
                "\u0438\u043c\u044f \u0444\u0430\u043c\u0438\u043b\u0438\u044f \u043e\u0442\u0447\u0435\u0441\u0442\u0432\u043e \u0438\u043d\u0434\u0435\u043a\u0441 \u0442\u0435\u043b\u0435\u0444\u043e\u043d \u0430\u0434\u0440\u0435\u0441 \u043f\u0430\u0441\u043f\u043e\u0440\u0442 \u043d\u043e\u043c\u0435\u0440(-|\\.|_|\\s){0,2}\u043a\u0430\u0440\u0442\u044b \u0434\u0430\u0442\u0430(-|\\.|_|\\s){0,2}\u0440\u043e\u0436\u0434\u0435\u043d\u0438\u044f \u0434\u043e\u043c \u0443\u043b\u0438\u0446\u0430 \u043a\u0432\u0430\u0440\u0442\u0438\u0440\u0430 \u0433\u043e\u0440\u043e\u0434 \u043e\u0431\u043b\u0430\u0441\u0442\u044c".split(
                  " "
                )
              )
            ) +
            ")",
          "i"
        ),
        Va = "metrikaId_" + Math.random(),
        tc = { counter: 0 },
        $r = x(function () {
          var a;
          return (
            (a = {}),
            (a.A = 1),
            (a.ABBR = 2),
            (a.ACRONYM = 3),
            (a.ADDRESS = 4),
            (a.APPLET = 5),
            (a.AREA = 6),
            (a.B = 7),
            (a.BASE = 8),
            (a.BASEFONT = 9),
            (a.BDO = 10),
            (a.BIG = 11),
            (a.BLOCKQUOTE = 12),
            (a.BODY = 13),
            (a.BR = 14),
            (a.BUTTON = 15),
            (a.CAPTION = 16),
            (a.CENTER = 17),
            (a.CITE = 18),
            (a.CODE = 19),
            (a.COL = 20),
            (a.COLGROUP = 21),
            (a.DD = 22),
            (a.DEL = 23),
            (a.DFN = 24),
            (a.DIR = 25),
            (a.DIV = 26),
            (a.DL = 27),
            (a.DT = 28),
            (a.EM = 29),
            (a.FIELDSET = 30),
            (a.FONT = 31),
            (a.FORM = 32),
            (a.FRAME = 33),
            (a.FRAMESET = 34),
            (a.H1 = 35),
            (a.H2 = 36),
            (a.H3 = 37),
            (a.H4 = 38),
            (a.H5 = 39),
            (a.H6 = 40),
            (a.HEAD = 41),
            (a.HR = 42),
            (a.HTML = 43),
            (a.I = 44),
            (a.IFRAME = 45),
            (a.IMG = 46),
            (a.INPUT = 47),
            (a.INS = 48),
            (a.ISINDEX = 49),
            (a.KBD = 50),
            (a.LABEL = 51),
            (a.LEGEND = 52),
            (a.LI = 53),
            (a.LINK = 54),
            (a.MAP = 55),
            (a.MENU = 56),
            (a.META = 57),
            (a.NOFRAMES = 58),
            (a.NOSCRIPT = 59),
            (a.OBJECT = 60),
            (a.OL = 61),
            (a.OPTGROUP = 62),
            (a.OPTION = 63),
            (a.P = 64),
            (a.PARAM = 65),
            (a.PRE = 66),
            (a.Q = 67),
            (a.S = 68),
            (a.SAMP = 69),
            (a.SCRIPT = 70),
            (a.SELECT = 71),
            (a.SMALL = 72),
            (a.SPAN = 73),
            (a.STRIKE = 74),
            (a.STRONG = 75),
            (a.STYLE = 76),
            (a.SUB = 77),
            (a.SUP = 78),
            (a.TABLE = 79),
            (a.TBODY = 80),
            (a.TD = 81),
            (a.TEXTAREA = 82),
            (a.TFOOT = 83),
            (a.TH = 84),
            (a.THEAD = 85),
            (a.TITLE = 86),
            (a.TR = 87),
            (a.TT = 88),
            (a.U = 89),
            (a.UL = 90),
            (a.VAR = 91),
            (a.NOINDEX = 100),
            a
          );
        }),
        Xr = [17, 18, 38, 32, 39, 15, 11, 7, 1],
        bu = (function () {
          var a =
            "first(-|\\.|_|\\s){0,2}name last(-|\\.|_|\\s){0,2}name zip postal phone address passport (bank|credit)(-|\\.|_|\\s){0,2}card card(-|\\.|_|\\s){0,2}number card(-|\\.|_|\\s){0,2}holder cvv card(-|\\.|_|\\s){0,2}exp card(-|\\.|_|\\s){0,2}name card.*month card.*year card.*month card.*year password email birth(-|\\.|_|\\s){0,2}(day|date) second(-|\\.|_|\\s){0,2}name third(-|\\.|_|\\s){0,2}name patronymic middle(-|\\.|_|\\s){0,2}name birth(-|\\.|_|\\s){0,2}place house street city flat state".split(
              " "
            );
          return {
            wj: new RegExp("(" + I("|", a) + ")", "i"),
            Gj: new RegExp(
              "(" +
                I(
                  "|",
                  a.concat(
                    "\u0438\u043c\u044f;\u0444\u0430\u043c\u0438\u043b\u0438\u044f;\u043e\u0442\u0447\u0435\u0441\u0442\u0432\u043e;\u0438\u043d\u0434\u0435\u043a\u0441;\u0442\u0435\u043b\u0435\u0444\u043e\u043d;\u0430\u0434\u0440\u0435\u0441;\u043f\u0430\u0441\u043f\u043e\u0440\u0442;\u041d\u043e\u043c\u0435\u0440(-|\\.|_|\\s){0,2}\u043a\u0430\u0440\u0442\u044b;\u0434\u0430\u0442\u0430(-|\\.|_|\\s){0,2} \u0440\u043e\u0436\u0434\u0435\u043d\u0438\u044f;\u0434\u043e\u043c;\u0443\u043b\u0438\u0446\u0430;\u043a\u0432\u0430\u0440\u0442\u0438\u0440\u0430;\u0433\u043e\u0440\u043e\u0434;\u043e\u0431\u043b\u0430\u0441\u0442\u044c".split(
                      ";"
                    )
                  )
                ) +
                ")",
              "i"
            ),
            uj: /ym-record-keys/i,
            ki: "\u2022",
            Fj: 88,
          };
        })(),
        Bk = zb(v(bu.ki, P)),
        od = !0,
        Jg = "",
        Kg = !1,
        Lg = !0,
        Mg = !1,
        Zn = oa(function (a, c) {
          var b = C([a, "efv." + c.event], E);
          c.O = A(w(P, b), c.O);
          return c;
        }),
        Kl = x(function (a) {
          var c = [],
            b = [],
            d = [];
          a.document.attachEvent &&
            !a.opera &&
            (c.push(Hf), b.push(cs), b.push(ds));
          a.document.addEventListener ? c.push(zk) : (b.push(yk), d.push(zk));
          return Yn(
            a,
            [
              { target: a, type: "window", event: "beforeunload", O: [F] },
              { target: a, type: "window", event: "unload", O: [F] },
              { event: "click", O: [Xe] },
              { event: "dblclick", O: [Xe] },
              { event: "mousedown", O: [Xe] },
              { event: "mouseup", O: [fs] },
              { event: "keydown", O: [gs] },
              { event: "keypress", O: [hs] },
              { event: "copy", O: [Dk] },
              { event: "blur", O: c },
              { event: "focusin", O: b },
              { event: "focusout", O: d },
            ]
              .concat(
                !a.document.attachEvent || a.opera
                  ? [
                      { target: a, type: "window", event: "focus", O: [Zh] },
                      { target: a, type: "window", event: "blur", O: [Hf] },
                    ]
                  : []
              )
              .concat(
                a.document.addEventListener
                  ? [
                      { event: "focus", O: [yk] },
                      { event: "change", O: [Ak] },
                      { event: "submit", O: [Fk] },
                    ]
                  : [
                      { type: "formInput", event: "change", O: [Ak] },
                      { type: "form", event: "submit", O: [Fk] },
                    ]
              )
          );
        }),
        Wn = x(function (a) {
          return Bc(a)
            ? [{ target: a, type: "document", event: "mouseleave", O: [is] }]
            : [];
        }),
        cu = ["submit", "beforeunload", "unload"],
        du = x(function (a, c) {
          var b = c(a);
          return K(
            function (d, e) {
              d[e.type + ":" + e.event] = e.O;
              return d;
            },
            {},
            b
          );
        }),
        eu = v(Kl, function (a, c, b, d) {
          return du(c, a)[b + ":" + d] || [];
        }),
        Xn = /^\s*function submit\(\)/,
        fu = B("fw.p", function (a, c) {
          var b;
          if (!(b = c.Tg || !c.xb)) {
            var d = H(a),
              e = !1;
            b = d.C("hitParam", {});
            var f = M(c);
            b[f] && ((d = d.C("counters", {})), (e = de(c.ba) && !d[f]));
            b[f] = 1;
            b = e;
          }
          if (b) return J.resolve(F);
          b = new au(a, eu);
          return Tn(a, c, b, Kl, cu);
        }),
        fh,
        Ll =
          ((fh = (function (a) {
            function c(b, d, e, f) {
              void 0 === f && (f = 0);
              d = a.call(this, b, d, e) || this;
              d.ze = 0;
              d.Ab = 0;
              d.ye = 0;
              d.buffer = [];
              d.bd = 2e3;
              d.$ = md(b);
              d.Wc();
              d.ye = f;
              return d;
            }
            Na(c, a);
            c.prototype.af = function (b) {
              return ta(this.$.T("ag", b));
            };
            c.prototype.$e = function (b, d) {
              var e = this;
              b(
                Pa(E(this.l, "wv2.b.st"), function (f) {
                  e.send(f, d);
                })
              );
            };
            c.prototype.Li = function (b, d) {
              var e = this;
              ma(this.l, this.Re);
              var f = Math.ceil(this.na.kb(d) / 63e4),
                g = this.na.se(d, f);
              y(function (h, k) {
                var l,
                  m = z(
                    {},
                    b,
                    ((l = {}),
                    (l.data = h),
                    (l.partNum = k + 1),
                    (l.end = k + 1 === f),
                    (l.partsTotal = g.length),
                    l)
                  );
                l = e.na.Ha([m], !1);
                e.$e(l, [m]);
              }, g);
              this.Wc();
            };
            c.prototype.send = function (b, d) {
              var e = this;
              this.$.T("se", d);
              return a.prototype.send.call(this, b, d).then(P, function () {
                e.$.T("see", d);
              });
            };
            c.bf = function (b, d, e, f, g) {
              c.ed["" + b + d] ||
                (this.ed[d] = new c(g, f, e, "m" === d ? 31457280 : 0));
              return this.ed[d];
            };
            c.prototype.Wh = function () {
              return this.ye && this.ze >= this.ye;
            };
            c.prototype.push = function (b) {
              var d = this;
              if (!this.Wh()) {
                this.$.T("p", b);
                var e = this.na.tb(b),
                  f = this.na.kb(e);
                7e5 < f
                  ? this.Li(b, e)
                  : ((e = this.af(this.buffer.concat([b]))),
                    (e = K(
                      function (g, h) {
                        return g + d.na.kb(d.na.tb(h));
                      },
                      0,
                      e
                    )),
                    this.Ab + e + f >= 7e5 * 0.7 && this.flush(),
                    this.buffer.push(b),
                    (this.Ab += f));
              }
            };
            c.prototype.F = function (b, d) {
              this.$.F([b], d);
            };
            c.prototype.ga = function (b, d) {
              this.$.ga([b], d);
            };
            c.prototype.flush = function (b) {
              var d = this.buffer.concat(this.af(this.buffer));
              d.length &&
                ((this.buffer = []),
                (this.ze += this.Ab),
                (this.Ab = 0),
                (b = this.na.Ha(d, b)),
                this.$e(b, d));
            };
            return c;
          })(Il)),
          (fh.ed = {}),
          fh),
        Ya = (function () {
          function a(c, b, d) {
            this.$h = "wv2.c";
            this.Nb = [];
            this.ja = [];
            this.l = c;
            this.L = Ff(c, this, d, this.$h);
            this.G = b;
            this.cb = this.G.th();
            this.start = this.L.H(this.start, "st");
            this.stop = this.L.H(this.stop, "sp");
          }
          a.prototype.start = function () {
            var c = this;
            this.Nb = A(function (b) {
              var d = b[0],
                e = b[2];
              b = G(c.L.H(b[1], d[0]), c);
              return c.cb.F(e || c.l, d, b);
            }, this.ja);
          };
          a.prototype.stop = function () {
            y(ha, this.Nb);
          };
          a.prototype.Z = function (c) {
            return this.G.ta().Z(c);
          };
          return a;
        })(),
        Rn = ["checkbox", "radio"],
        Sn = /pwd|value|password/i,
        gh = U("location.href"),
        gu = (function (a) {
          function c(b, d, e) {
            d = a.call(this, b, d, e) || this;
            d.sa = { elements: [], attributes: [] };
            d.index = 0;
            d.Wd = d.L.H(d.Wd, "o");
            d.nd = d.L.H(d.nd, "io");
            d.cd = d.L.H(d.cd, "ao");
            d.ee = d.L.H(d.ee, "a");
            d.ce = d.L.H(d.ce, "at");
            d.fe = d.L.H(d.fe, "r");
            d.de = d.L.H(d.de, "c");
            d.Aa = new b.MutationObserver(d.Wd);
            return d;
          }
          Na(c, a);
          c.prototype.start = function () {
            this.Aa.observe(this.l.document.documentElement, {
              attributes: !0,
              characterData: !0,
              childList: !0,
              subtree: !0,
              attributeOldValue: !0,
              characterDataOldValue: !0,
            });
          };
          c.prototype.stop = function () {
            this.Aa.disconnect();
          };
          c.prototype.cd = function (b) {
            var d = b.target;
            b = b.attributeName;
            var e = this.sa.elements.indexOf(d);
            -1 === e &&
              ((e = this.sa.elements.push(d) - 1),
              (this.sa.attributes[e] = {}));
            this.sa.attributes[e] || (this.sa.attributes[e] = {});
            e = this.sa.attributes[e];
            var f = d.getAttribute(b);
            e[b] = re(this.l, d, b, f, this.G.Hb()).value;
          };
          c.prototype.nd = function (b) {
            function d(k) {
              var l = Rb(e.l)(k, f);
              return -1 === l
                ? (f.push(k), (k = { wd: {} }), g.push(k), k)
                : g[l];
            }
            var e = this,
              f = [],
              g = [];
            y(function (k) {
              var l = k.attributeName,
                m = k.removedNodes,
                p = k.oldValue,
                q = k.target,
                r = k.nextSibling,
                t = k.previousSibling;
              switch (k.type) {
                case "attributes":
                  e.cd(k);
                  var u = d(q);
                  u.wd[l] || (u.wd[l] = re(e.l, q, l, p, e.G.Hb()).value);
                  break;
                case "childList":
                  m &&
                    y(function (D) {
                      u = d(D);
                      u.Ye ||
                        z(u, { Ye: q, ih: r ? r : void 0, jh: t ? t : void 0 });
                    }, Aa(m));
                  break;
                case "characterData":
                  (u = d(q)), u.Ze || (u.Ze = p);
              }
            }, b);
            var h = this.G.ta();
            y(function (k, l) {
              h.qe(k, g[l]);
            }, f);
          };
          c.prototype.Wd = function (b) {
            var d = this;
            if (gh(this.l)) {
              var e = this.G.stamp();
              this.nd(b);
              y(function (f) {
                var g = f.addedNodes,
                  h = f.removedNodes,
                  k = f.target;
                switch (f.type) {
                  case "childList":
                    h && h.length && d.fe(Aa(h), e);
                    g && g.length && d.ee(Aa(g), e);
                    break;
                  case "characterData":
                    d.de(k, e);
                }
              }, b);
              this.ce(e);
            } else this.stop();
          };
          c.prototype.ce = function (b) {
            var d = this;
            y(function (e, f) {
              var g = d.yc();
              d.G.Y(
                "mutation",
                { index: g, attributes: d.sa.attributes[f], target: d.Z(e) },
                "ac",
                b
              );
            }, this.sa.elements);
            this.sa.elements = [];
            this.sa.attributes = [];
          };
          c.prototype.ee = function (b, d) {
            var e = this,
              f = this.yc();
            this.G.ta().Cc({
              nodes: b,
              Vc: function (g) {
                g = A(function (h) {
                  h.node = void 0;
                  return h;
                }, g);
                e.G.Y("mutation", { index: f, nodes: g }, "ad", d);
              },
            });
          };
          c.prototype.fe = function (b, d) {
            var e = this,
              f = this.yc(),
              g = this.G.ta(),
              h = A(function (k) {
                var l = g.removeNode(k);
                Ti(e.l, k, function (m) {
                  g.removeNode(m);
                });
                return l;
              }, b);
            this.G.Y("mutation", { index: f, nodes: h }, "re", d);
          };
          c.prototype.de = function (b, d) {
            var e = this.yc();
            this.G.Y(
              "mutation",
              { value: b.textContent, target: this.Z(b), index: e },
              "tc",
              d
            );
          };
          c.prototype.yc = function () {
            var b = this.index;
            this.index += 1;
            return b;
          };
          return c;
        })(Ya),
        hu = (function () {
          function a(c, b) {
            var d = this;
            this.uc = [];
            this.eb = [];
            this.Vd = 1;
            this.Oe = this.Rf = 0;
            this.za = {};
            this.Lb = {};
            this.Gb = [];
            this.Hd = function (f) {
              return d.eb.length ? L(f, d.eb) : !1;
            };
            this.removeNode = function (f) {
              var g = d.Z(f),
                h = Ma(f);
              if (h)
                return (
                  (h = "NR:" + h.toLowerCase()),
                  d.Hd(h) && d.$.T(h, { data: { node: f, id: g } }),
                  g
                );
            };
            this.jb = function (f) {
              var g = Ma(f);
              if (g) {
                var h = f.__ym_indexer;
                return h
                  ? h
                  : ((h = d.Vd),
                    (f.__ym_indexer = h),
                    (d.Vd += 1),
                    (g = "NA:" + g.toLowerCase()),
                    d.Hd(g) && d.$.T(g, { data: { node: f, id: h } }),
                    h);
              }
              return null;
            };
            this.Lf = function () {
              d.Rf = R(d.l, w(G(d.da, d, !1), d.Lf), 50, "i.s");
            };
            this.Jf = function () {
              d.Oe = R(d.l, w(G(d.hd, d, !1), d.Jf), 50, "i.g");
            };
            this.Di = function (f) {
              null === d.za[f] && delete d.za[f];
            };
            this.l = c;
            var e = Ff(c, this, "i");
            this.$ = md(c);
            this.options = b;
            this.start = e.H(this.start, "st");
            this.stop = e.H(this.stop, "sp");
            this.Z = e.H(this.Z, "i");
            this.qe = e.H(this.qe, "o");
            this.Cc = e.H(this.Cc, "a");
            this.removeNode = e.H(this.removeNode, "r");
            this.da = e.H(this.da, "s");
            this.hd = e.H(this.hd, "g");
          }
          a.prototype.qe = function (c, b) {
            var d = this.jb(c);
            Ta(d) || (this.Lb[d] && this.Z(c), (this.Lb[d] = b));
          };
          a.prototype.F = function (c, b, d) {
            c = "" + b + c;
            this.eb.push(c);
            this.Hd(c) || this.eb.push(c);
            this.$.F([c], d);
          };
          a.prototype.ga = function (c, b, d) {
            var e = "" + b + c;
            this.eb = la(function (f) {
              return f !== e;
            }, this.eb);
            this.$.ga([e], d);
          };
          a.prototype.start = function () {
            this.Lf();
            this.Jf();
          };
          a.prototype.stop = function () {
            this.flush();
            ma(this.l, this.Oe);
            ma(this.l, this.Rf);
            this.uc = [];
            this.Gb = [];
            this.za = {};
            this.Lb = {};
          };
          a.prototype.Cc = function (c) {
            var b = this,
              d = [],
              e = 0,
              f = { Vc: c.Vc, result: [], Dc: 0, nodes: d };
            this.uc.push(f);
            y(function (g) {
              Ti(b.l, g, function (h) {
                var k = b.jb(h);
                Ta(k) ||
                  (d.push(h),
                  b.za[k] && b.Z(h),
                  (b.za[k] = { node: h, event: f, Xi: e }),
                  (e += 1));
              });
            }, c.nodes);
          };
          a.prototype.Z = function (c) {
            if (c === this.l) return 0;
            var b = this.jb(c),
              d = this.za[b],
              e = this.mh(b),
              f = e.Ye,
              g = e.wd,
              h = e.Ze,
              k = e.ih,
              l = e.jh;
            if (d) {
              e = d.event;
              d = d.Xi;
              var m = Gs(this.l) === c;
              k = k || c.nextSibling;
              var p = l || c.previousSibling;
              l = !m && k ? this.jb(k) : null;
              p = !m && p ? this.jb(p) : null;
              m = this.l;
              k = this.options;
              f = this.jb(f || c.parentNode || c.parentElement) || 0;
              var q = g,
                r = void 0;
              void 0 === p && (p = null);
              void 0 === l && (l = null);
              void 0 === q && (q = {});
              void 0 === r && (r = Ma(c));
              if (V(r)) c = void 0;
              else {
                g = {
                  id: b,
                  prev: p !== f ? p : null,
                  next: l !== f ? l : null,
                  parent: f,
                  name: r.toLowerCase(),
                  node: c,
                };
                if (Lf(c)) {
                  if (((h = On(c, h)), (g.attributes = {}), (g.content = h)))
                    if ((c = nd(m, c)))
                      (g.content = "" !== h.trim() ? fo(m, h) : h),
                        (g.hidden = c);
                } else
                  (h = Pn(m, c, k, q, r)),
                    (m = h.ob),
                    (g.attributes = h.Bg),
                    m && (g.hidden = m),
                    c.namespaceURI &&
                      Za(c.namespaceURI, "svg") &&
                      (g.namespace = c.namespaceURI);
                c = g;
              }
              if (V(c)) return;
              this.za[b] = null;
              this.Gb.push(b);
              e.result[d] = c;
              e.Dc += 1;
              e.nodes.length === e.Dc && e.Vc(e.result);
            }
            return b;
          };
          a.prototype.flush = function () {
            this.da(!0);
          };
          a.prototype.hd = function () {
            if (this.Gb.length) {
              var c = $b(this.Gb, this.Di),
                b = qg(this.l, 30);
              c(b);
            }
          };
          a.prototype.da = function (c) {
            var b = this;
            if (gh(this.l)) {
              var d = ca(this.za);
              d = K(
                function (e, f) {
                  b.za[f] && e.push(b.za[f].node);
                  return e;
                },
                [],
                d
              );
              d = $b(d, this.Z);
              c = c ? Sj(F) : Qj(this.l, 20);
              d(c);
              this.uc = la(function (e) {
                return e.Dc !== e.result.length;
              }, this.uc);
            }
          };
          a.prototype.mh = function (c) {
            if (Ta(c)) return {};
            var b = this.Lb[c];
            return b ? ((this.Lb[c] = null), this.Gb.push(c), b) : {};
          };
          return a;
        })(),
        iu = ["input", "change", "keyup", "paste", "cut"],
        ju = (function (a) {
          function c(b, d, e) {
            b = a.call(this, b, d, e) || this;
            b.inputs = {};
            b.rd = !1;
            b.Kc = b.L.H(b.Kc, "ii");
            b.Lc = b.L.H(b.Lc, "ir");
            b.Qc = b.L.H(b.Qc, "ri");
            b.Zc = b.L.H(b.Zc, "ur");
            b.Gd = b.L.H(b.Gd, "ce");
            b.Bc = b.L.H(b.Bc, "vc");
            return b;
          }
          Na(c, a);
          c.prototype.start = function () {
            var b = this,
              d = this.G.ta();
            this.rd = this.Ig();
            y(function (e) {
              e = e.toLowerCase();
              d.F(e, "NA:", G(b.Kc, b));
              d.F(e, "NR:", G(b.Lc, b));
            }, Kf);
            this.Nb = [
              this.cb.F(this.l.document, iu, G(this.Gd, this)),
              function () {
                y(function (e) {
                  e = e.toLowerCase();
                  d.ga(e, "NA:", b.Kc);
                  d.ga(e, "NR:", b.Lc);
                }, Kf);
                y(b.Zc, ca(b.inputs));
              },
            ];
          };
          c.prototype.Zc = function (b) {
            var d = this.inputs[b];
            if (d) {
              if (this.rd) {
                var e = d.xi;
                d = d.element;
                e && this.l.Object.defineProperty(d, this.zc(d), e);
              }
              delete this.inputs[b];
            }
          };
          c.prototype.Lc = function (b) {
            b && this.Zc(b.data.id);
          };
          c.prototype.Kc = function (b) {
            b && ((b = b.data), this.Qc(b.node, b.id));
          };
          c.prototype.zc = function (b) {
            return Oe(b) ? "checked" : "value";
          };
          c.prototype.Gd = function (b) {
            if ((b = b.target)) {
              var d = this.zc(b);
              this.Bc(b[d], b);
            }
          };
          c.prototype.Bc = function (b, d) {
            var e = this.Z(d),
              f = this.inputs[e];
            if (!f && ((f = this.Qc(f, e)), !f)) return;
            e = f.Kg;
            var g = f.value,
              h = this.zc(d),
              k = !b || L(typeof b, ["string", "boolean", "number"]),
              l = this.G.Hb().Md;
            k &&
              b !== g &&
              ((g = re(this.l, d, h, b, this.G.Hb()).value),
              e
                ? this.G.Y(
                    "event",
                    { target: this.Z(d), checked: !!b },
                    "change"
                  )
                : ((e = Mc(this.l, d, l)),
                  (l = e.gb),
                  this.G.Y(
                    "event",
                    { value: g, hidden: e.pb && !l, target: this.Z(d) },
                    "change"
                  )),
              (f.value = b));
          };
          c.prototype.Qc = function (b, d) {
            var e = this;
            if (
              !Df(b) ||
              "__ym_input_override_test" === b.getAttribute("class") ||
              this.inputs[d]
            )
              return null;
            var f = Oe(b),
              g = this.zc(b),
              h = { element: b, Kg: f, value: b[g] };
            this.inputs[d] = h;
            this.rd &&
              Ob(this.l, function () {
                var k =
                    e.l.Object.getOwnPropertyDescriptor(
                      Object.getPrototypeOf(b),
                      g
                    ) || {},
                  l = e.l.Object.getOwnPropertyDescriptor(b, g) || {},
                  m = z({}, k, l);
                if (Ha("((set)?(\\s?" + g + ")?)?", m.set)) {
                  try {
                    e.l.Object.defineProperty(
                      b,
                      g,
                      z({}, m, {
                        configurable: !0,
                        set: function (p) {
                          e.Bc(p, this);
                          return m.set.call(this, p);
                        },
                      })
                    );
                  } catch (p) {}
                  h.xi = m;
                }
              });
            return h;
          };
          c.prototype.Ig = function () {
            var b = !0,
              d = $a(this.l)("input");
            try {
              d = $a(this.l)("input");
              d.value = "INPUT_VALUE";
              d.style.setProperty("display", "none", "important");
              d.setAttribute("type", "text");
              d.setAttribute("class", "__ym_input_override_test");
              var e =
                  this.l.Object.getOwnPropertyDescriptor(
                    Object.getPrototypeOf(d),
                    "value"
                  ) || {},
                f = this.l.Object.getOwnPropertyDescriptor(d, "value") || {},
                g = z({}, e, f);
              this.l.Object.defineProperty(
                d,
                "value",
                z({}, g, {
                  configurable: !0,
                  set: function (h) {
                    return g.set.call(d, h);
                  },
                })
              );
              "INPUT_VALUE" !== d.value && (b = !1);
              d.value = "INPUT_TEST";
              "INPUT_TEST" !== d.value && (b = !1);
            } catch (h) {
              b = !1;
            }
            return b;
          };
          return c;
        })(Ya),
        ku = (function (a) {
          function c(b, d, e) {
            b = a.call(this, b, d, e) || this;
            b.Wa = {
              width: 0,
              height: 0,
              pageHeight: 0,
              pageWidth: 0,
              orientation: 0,
            };
            b.ja.push([["resize"], b.vi]);
            b.ja.push([["orientationchange"], b.ti]);
            return b;
          }
          Na(c, a);
          c.prototype.start = function () {
            a.prototype.start.call(this);
            this.Of();
          };
          c.prototype.vi = function () {
            var b = this.Ed();
            this.Jh(b) && ((this.Wa = b), this.Pf(b));
          };
          c.prototype.ti = function () {
            var b = this.Ed();
            this.Wa.orientation !== b.orientation &&
              ((this.Wa = b), this.Hi(b));
          };
          c.prototype.rf = function (b) {
            return !b.height || !b.width || !b.pageWidth || !b.pageHeight;
          };
          c.prototype.Jh = function (b) {
            return b.height !== this.Wa.height || b.width !== this.Wa.width;
          };
          c.prototype.Ed = function () {
            var b = this.G.ib(),
              d = Hc(this.l),
              e = d[0];
            d = d[1];
            b = b.Dd();
            return {
              width: e,
              height: d,
              pageWidth: b ? b.scrollWidth : 0,
              pageHeight: b ? b.scrollHeight : 0,
              orientation: this.G.ib().vh(),
            };
          };
          c.prototype.Hi = function (b) {
            var d;
            void 0 === d && (d = this.G.stamp());
            this.G.Y(
              "event",
              { width: b.width, height: b.height, orientation: b.orientation },
              "deviceRotation",
              d
            );
          };
          c.prototype.Pf = function (b, d) {
            void 0 === d && (d = this.G.stamp());
            this.G.Y(
              "event",
              {
                width: b.width,
                height: b.height,
                pageWidth: b.pageWidth,
                pageHeight: b.pageHeight,
              },
              "resize",
              d
            );
          };
          c.prototype.Of = function () {
            var b = this.Ed();
            this.rf(b)
              ? R(this.l, G(this.Of, this), 300)
              : (this.rf(this.Wa) && (this.Wa = b), this.Pf(b, 0));
          };
          return c;
        })(Ya),
        af = (function () {
          function a(c) {
            this.index = 0;
            this.vb = {};
            this.l = c;
          }
          a.prototype.pc = function (c, b, d) {
            void 0 === d && (d = {});
            var e = fa(this.l),
              f = this.index;
            this.index += 1;
            this.vb[f] = { Yb: 0, Tb: !1, gh: c, dd: [], Qd: e(Y) };
            var g = this;
            return function () {
              var h = Ia(arguments),
                k = d.fb && !g.vb[f].Tb,
                l = g.vb[f];
              ma(g.l, l.Yb);
              l.dd = h;
              l.Tb = !0;
              var m = e(Y);
              if (k || m - l.Qd >= b) c.apply(void 0, h), (l.Qd = m);
              l.Yb = R(
                g.l,
                function () {
                  k || (c.apply(void 0, h), (l.Qd = e(Y)));
                  l.Tb = !1;
                  l.dd = [];
                },
                b,
                "th"
              );
            };
          };
          a.prototype.flush = function () {
            var c = this;
            y(function (b) {
              var d = c.vb[b],
                e = d.Yb,
                f = d.gh,
                g = d.dd;
              d.Tb && ((c.vb[b].Tb = !1), f.apply(void 0, g), ma(c.l, e));
            }, ca(this.vb));
          };
          return a;
        })(),
        lu = (function (a) {
          function c(b, d, e) {
            d = a.call(this, b, d, e) || this;
            d.cg = [];
            d.He = { x: 0, y: 0 };
            d.Da = new af(b);
            d.Oc = d.L.H(d.Oc, "o");
            d.ja.push([["scroll"], d.wi]);
            return d;
          }
          Na(c, a);
          c.prototype.start = function () {
            a.prototype.start.call(this);
            this.G.Y(
              "event",
              {
                x: Math.max(this.l.scrollX, 0),
                y: Math.max(this.l.scrollY, 0),
                page: !0,
                target: -1,
              },
              "scroll",
              0
            );
          };
          c.prototype.stop = function () {
            a.prototype.stop.call(this);
            this.Da.flush();
          };
          c.prototype.wi = function (b) {
            if (this.G.ib().mf()) this.Oc(b);
            else {
              var d = b.target,
                e = la(function (f) {
                  return f[0] === d;
                }, this.cg).pop();
              e
                ? (e = e[1])
                : ((e = this.Da.pc(G(this.Oc, this), 100, { fb: !0 })),
                  this.cg.push([d, e]));
              e(b);
            }
          };
          c.prototype.Oc = function (b) {
            var d = this.G.ib().Dd();
            b = b.target;
            var e = this.Ib(b);
            d = d === b || this.l === b || this.l.document === b;
            var f = Math.max(e.left, 0);
            e = Math.max(e.top, 0);
            if (d) {
              if (this.He.x === f && this.He.y === e) return;
              this.He = { x: f, y: e };
            }
            this.G.Y(
              "event",
              { x: f, y: e, page: d, target: d ? -1 : this.Z(b) },
              "scroll"
            );
          };
          c.prototype.Ib = function (b) {
            var d = { left: 0, top: 0 };
            if (!b) return d;
            if (b.window === b)
              return { top: b.scrollY || 0, left: b.scrollX || 0 };
            var e = b.ownerDocument || b,
              f = b.documentElement,
              g = e.defaultView || e.parentWindow,
              h = e.body;
            return b !== e || ((b = this.G.ib().Dd()), b)
              ? L(b, [f, h])
                ? {
                    top: b.scrollTop || g.scrollY,
                    left: b.scrollLeft || g.scrollX,
                  }
                : { top: b.scrollTop || 0, left: b.scrollLeft || 0 }
              : d;
          };
          return c;
        })(Ya),
        mu = ["mousemove", "mousedown", "mouseup", "click"],
        nu = (function (a) {
          function c(b, d, e) {
            d = a.call(this, b, d, e) || this;
            d.ja.push([mu, d.ri]);
            d.Da = new af(b);
            d.Jc = d.L.H(d.Jc, "n");
            d.Ri = d.L.H(d.Da.pc(G(d.Jc, d), 100), "t");
            return d;
          }
          Na(c, a);
          c.prototype.stop = function () {
            a.prototype.stop.call(this);
            this.Da.flush();
          };
          c.prototype.ri = function (b) {
            var d = null;
            try {
              d = b.type;
            } catch (e) {
              return;
            }
            "mousemove" === d ? this.Ri(b) : this.Jc(b);
          };
          c.prototype.Jc = function (b) {
            var d = b.type,
              e = b.clientX;
            e = void 0 === e ? null : e;
            var f = b.clientY;
            f = void 0 === f ? null : f;
            b = b.target || this.l.document.elementFromPoint(e, f);
            this.G.Y("event", { x: e || 0, y: f || 0, target: this.Z(b) }, d);
          };
          return c;
        })(Ya),
        ou = ["focus", "blur"],
        pu = (function (a) {
          function c(b, d, e) {
            b = a.call(this, b, d, e) || this;
            b.ja.push([ou, b.hh]);
            return b;
          }
          Na(c, a);
          c.prototype.hh = function (b) {
            var d = b.target;
            b = b.type;
            this.G.Y(
              "event",
              {
                target: this.Z(
                  d === this.l ? this.l.document.documentElement : d
                ),
              },
              b
            );
          };
          return c;
        })(Ya),
        qu = x(function (a) {
          var c = na(a.getSelection, "getSelection");
          return c ? G(c, a) : F;
        }),
        ru = w(qu, ha),
        su = ["mousemove", "touchmove", "mousedown", "touchdown", "select"],
        tu = /text|search|password|tel|url/,
        uu = (function (a) {
          function c(b, d, e) {
            b = a.call(this, b, d, e) || this;
            b.Id = !1;
            b.ja.push([su, b.Hh]);
            return b;
          }
          Na(c, a);
          c.prototype.Hh = function (b) {
            var d = this.G,
              e = b.type,
              f = b.which;
            b = b.target;
            if ("mousemove" !== e || 1 === f)
              (e = "select" === e ? this.Ah(b) : this.yh()) && e.start !== e.end
                ? ((this.Id = !0), d.Y("event", e, "selection"))
                : this.Id &&
                  ((this.Id = !1),
                  d.Y("event", { start: 0, end: 0 }, "selection"));
          };
          c.prototype.yh = function () {
            var b = ru(this.l);
            if (b && 0 < b.rangeCount) {
              b = b.getRangeAt(0) || this.l.document.createRange();
              var d = this.Z(b.startContainer),
                e = this.Z(b.endContainer);
              if (!V(d) && !V(e))
                return {
                  start: b.startOffset,
                  end: b.endOffset,
                  startNode: d,
                  endNode: e,
                };
            }
          };
          c.prototype.Ah = function (b) {
            if (tu.test(b.type || "")) {
              var d = this.Z(b);
              if (!V(d))
                return {
                  start: b.selectionStart,
                  end: b.selectionEnd,
                  target: d,
                };
            }
          };
          return c;
        })(Ya),
        vu = { focus: "windowfocus", blur: "windowblur" },
        wu = (function (a) {
          function c(b, d, e) {
            b = a.call(this, b, d, e) || this;
            b.visibility = null;
            V(b.l.document.hidden)
              ? V(b.l.document.msHidden)
                ? V(b.l.document.webkitHidden) ||
                  (b.visibility = {
                    hidden: "webkitHidden",
                    event: "webkitvisibilitychange",
                  })
                : (b.visibility = {
                    hidden: "msHidden",
                    event: "msvisibilitychange",
                  })
              : (b.visibility = {
                  hidden: "hidden",
                  event: "visibilitychange",
                });
            b.handleEvent = b.L.H(b.handleEvent, "e");
            return b;
          }
          Na(c, a);
          c.prototype.start = function () {
            this.Nb = [
              this.cb.F(
                this.l,
                this.visibility ? [this.visibility.event] : ["focus", "blur"],
                G(this.handleEvent, this)
              ),
            ];
          };
          c.prototype.handleEvent = function (b) {
            this.G.Y(
              "event",
              {},
              vu[
                this.visibility
                  ? this.l.document[this.visibility.hidden]
                    ? "blur"
                    : "focus"
                  : b.type
              ]
            );
          };
          return c;
        })(Ya),
        xu = [
          "touchmove",
          "touchstart",
          "touchend",
          "touchcancel",
          "touchforcechange",
        ],
        yu = (function (a) {
          function c(b, d, e) {
            d = a.call(this, b, d, e) || this;
            d.Xc = {};
            d.scrolling = !1;
            d.Mf = 0;
            d.ja.push([["scroll"], d.Gi, d.l.document]);
            d.ja.push([xu, d.Ti, d.l.document]);
            d.Da = new af(b);
            d.Mb = d.L.H(d.Mb, "nh");
            d.Si = d.L.H(
              d.Da.pc(d.Mb, d.G.ib().mf() ? 0 : 50, { fb: !0 }),
              "th"
            );
            return d;
          }
          Na(c, a);
          c.prototype.Gi = function () {
            var b = this;
            this.scrolling = !0;
            ma(this.l, this.Mf);
            this.Mf = R(
              this.l,
              function () {
                b.scrolling = !1;
              },
              150
            );
          };
          c.prototype.Ti = function (b) {
            var d = this,
              e = "touchcancel" === b.type || "touchend" === b.type;
            b.changedTouches &&
              0 < b.changedTouches.length &&
              y(function (f) {
                var g = d.Ch(f);
                f.__ym_touch_id = g;
                e && delete d.Xc[f.identifier];
              }, Aa(b.changedTouches));
            "touchmove" === b.type
              ? this.scrolling
                ? this.Mb(b)
                : this.Si(b, this.G.stamp())
              : this.Mb(b);
          };
          c.prototype.Ch = function (b) {
            this.Xc[b.identifier] || (this.Xc[b.identifier] = Th());
            return this.Xc[b.identifier];
          };
          c.prototype.Mb = function (b, d) {
            void 0 === d && (d = this.G.stamp());
            var e = b.type,
              f = A(function (g) {
                return {
                  id: g.__ym_touch_id,
                  x: Math.round(g.clientX),
                  y: Math.round(g.clientY),
                  force: g.force,
                };
              }, Aa(b.changedTouches));
            0 < f.length &&
              this.G.Y("event", { touches: f, target: this.Z(b.target) }, e, d);
          };
          return c;
        })(Ya),
        zu = (function (a) {
          function c(b, d, e) {
            b = a.call(this, b, d, e) || this;
            b.ja.push([["load"], b.oi, b.l.document]);
            return b;
          }
          Na(c, a);
          c.prototype.oi = function (b) {
            b = b.target;
            "IMG" === Ma(b) &&
              b.getAttribute("srcset") &&
              this.G.Y(
                "mutation",
                { target: this.Z(b), attributes: { src: b.currentSrc } },
                "ac"
              );
          };
          return c;
        })(Ya),
        Au = (function (a) {
          function c(b, d, e) {
            d = a.call(this, b, d, e) || this;
            d.ng = 1;
            d.Da = new af(b);
            d.fc = d.L.H(d.fc, "z");
            return d;
          }
          Na(c, a);
          c.prototype.start = function () {
            if (this.jf()) {
              a.prototype.start.call(this);
              this.fc();
              var b = this.cb.F(
                n(this.l, "visualViewport"),
                ["resize"],
                this.Da.pc(this.fc, 10)
              );
              this.Nb.push(b);
            }
          };
          c.prototype.stop = function () {
            a.prototype.stop.call(this);
            this.Da.flush();
          };
          c.prototype.fc = function () {
            var b = this.jf();
            b && b !== this.ng && ((this.ng = b), this.Ii(b));
          };
          c.prototype.jf = function () {
            var b = he(this.l);
            return b ? b[2] : null;
          };
          c.prototype.Ii = function (b) {
            var d = Vf(this.l);
            this.G.Y("event", { x: d.x, y: d.y, level: b }, "zoom");
          };
          return c;
        })(Ya),
        ae,
        bf = {
          91: "super",
          93: "super",
          224: "super",
          18: "alt",
          17: "ctrl",
          16: "shift",
          9: "tab",
          8: "backspace",
          46: "delete",
        },
        Ml = { super: 1, rj: 2, alt: 3, shift: 4, Lj: 5, delete: 6, pj: 6 },
        Bu = [4, 9, 8, 32, 37, 38, 39, 40, 46],
        Nl =
          ((ae = {}),
          (ae["1"] = {
            91: "&#8984;",
            93: "&#8984;",
            224: "&#8984;",
            18: "&#8997;",
            17: "&#8963;",
            16: "&#8679;",
            9: "&#8677;",
            8: "&#9003;",
            46: "&#9003;",
          }),
          (ae["2"] = {
            91: "&#xff;",
            93: "&#xff;",
            224: "&#xff;",
            18: "Alt",
            17: "Ctrl",
            16: "Shift",
            9: "Tab",
            8: "Backspace",
            46: "Delete",
          }),
          (ae.bi = {
            32: "SPACEBAR",
            37: "&larr;",
            38: "&uarr;",
            39: "&rarr;",
            40: "&darr;",
            13: "Enter",
          }),
          ae),
        Cu = /flash/,
        Du = /ym-disable-keys/,
        Eu = /^&#/,
        Fu = (function (a) {
          function c(b, d, e) {
            d = a.call(this, b, d, e) || this;
            d.lb = {};
            d.Ma = 0;
            d.Fa = [];
            d.ag = [];
            d.rc = 0;
            d.Ff = 0;
            d.ja.push([["keydown"], d.Eh]);
            d.ja.push([["keyup"], d.Fh]);
            d.xg =
              -1 !== (n(b, "navigator.appVersion") || "").indexOf("Mac")
                ? "1"
                : "2";
            d.Hc = d.L.H(d.Hc, "v");
            d.ud = d.L.H(d.ud, "ec");
            d.Uc = d.L.H(d.Uc, "sk");
            d.Bd = d.L.H(d.Bd, "gk");
            d.te = d.L.H(d.te, "sc");
            d.ec = d.L.H(d.ec, "cc");
            d.reset = d.L.H(d.reset, "r");
            d.Rc = d.L.H(d.Rc, "rs");
            return d;
          }
          Na(c, a);
          c.prototype.Eh = function (b) {
            if (this.Hc(b) && !this.Uh(b)) {
              var d = b.keyCode;
              b.repeat ||
                this.lb[d] ||
                ((this.lb[b.keyCode] = !0),
                bf[b.keyCode] && !this.Ma
                  ? ((this.Ma += 1), this.te(b), this.reset(300))
                  : this.Ma
                  ? (this.Fg(), this.je(b), this.ud())
                  : (this.reset(), this.je(b)));
            }
          };
          c.prototype.Fh = function (b) {
            if (this.Hc(b)) {
              var d = b.keyCode,
                e = bf[b.keyCode];
              this.lb[b.keyCode] && (this.lb[d] = !1);
              e && this.Ma && ((this.Ma = 0), (this.lb = {}));
              1 === this.Fa.length &&
                ((b = this.Fa[0]),
                L(b.keyCode, Bu) && (this.Uc([b], !0), this.reset()));
              this.Fa = la(w(U("keyCode"), za(d), Ac), this.Fa);
              ma(this.l, this.rc);
            }
          };
          c.prototype.Hc = function (b) {
            var d = this.l.document.activeElement;
            d =
              d &&
              "OBJECT" === d.nodeName &&
              Cu.test(d.getAttribute("type") || "");
            b = b.target;
            if (!b) return !d;
            b =
              "INPUT" === b.nodeName &&
              "password" === b.getAttribute("type") &&
              Du.test(b.className);
            return !d && !b;
          };
          c.prototype.ud = function () {
            this.ag = this.Fa.slice(0);
            ma(this.l, this.rc);
            this.rc = R(this.l, v(this.ag, G(this.Uc, this)), 0, "e.c");
          };
          c.prototype.Uc = function (b, d) {
            void 0 === d && (d = !1);
            if (1 < b.length || d) {
              var e = this.Bd(b);
              this.G.Y("event", { keystrokes: e }, "keystroke");
            }
          };
          c.prototype.Bd = function (b) {
            var d = this;
            b = A(function (e) {
              e = e.keyCode;
              var f = bf[e],
                g = d.uh(e);
              return { id: e, key: g, isMeta: !!f && Eu.test(g), modifier: f };
            }, b);
            return yg(function (e, f) {
              return (Ml[e.modifier] || 100) - (Ml[f.modifier] || 100);
            }, b);
          };
          c.prototype.uh = function (b) {
            return Nl[this.xg][b] || Nl.bi[b] || String.fromCharCode(b);
          };
          c.prototype.je = function (b) {
            L(b, this.Fa) || this.Fa.push(b);
          };
          c.prototype.te = function (b) {
            this.je(b);
            this.ec();
          };
          c.prototype.ec = function () {
            this.Ma ? R(this.l, this.ec, 100) : (this.Fa = []);
          };
          c.prototype.Fg = function () {
            ma(this.l, this.Ff);
          };
          c.prototype.reset = function (b) {
            b ? (this.Ff = R(this.l, G(this.Rc, this), b)) : this.Rc();
          };
          c.prototype.Rc = function () {
            this.Ma = 0;
            this.Fa = [];
            this.lb = {};
            ma(this.l, this.rc);
          };
          c.prototype.Uh = function (b) {
            return b.target && "INPUT" === b.target.nodeName
              ? b.shiftKey || 32 === b.keyCode || "shift" === bf[b.keyCode]
              : !1;
          };
          return c;
        })(Ya),
        Nn = ["sr", "sd", "\u043d"],
        Gu = /allow-same-origin/,
        Hu = (function (a) {
          function c(b, d, e) {
            d = a.call(this, b, d, e) || this;
            d.Wb = [];
            d.xd = {};
            d.Xd = d.L.H(d.Xd, "fi");
            d.Yd = d.L.H(d.Yd, "sd");
            d.Zd = d.L.H(d.Zd, "src");
            d.Aa = new b.MutationObserver(d.Zd);
            return d;
          }
          Na(c, a);
          c.prototype.start = function () {
            a.prototype.start.call(this);
            this.G.Hb().ic && this.G.ta().F("iframe", "NA:", G(this.Xd, this));
            this.G.ef().zd().F(["sdr"], G(this.Yd, this));
          };
          c.prototype.stop = function () {
            a.prototype.stop.call(this);
            y(function (b) {
              b.G.stop();
            }, this.Wb);
          };
          c.prototype.Zd = function (b) {
            var d = b.pop().target;
            if (
              (b = ob(function (f) {
                return f.lf === d;
              }, this.Wb))
            ) {
              this.Wb = la(function (f) {
                return f.lf !== d;
              }, this.Wb);
              var e = b.G.Ad();
              try {
                b.G.stop();
              } catch (f) {}
              this.oc(d, e);
            }
          };
          c.prototype.Xd = function (b) {
            if (b) {
              var d = b.data.node;
              this.Aa.observe(d, { attributes: !0, attributeFilter: ["src"] });
              this.oc(d, b.data.id);
            }
          };
          c.prototype.oc = function (b, d) {
            var e = this;
            this.Sh(b) &&
              Jb(
                this.l,
                b
              )(
                Pa(F, function () {
                  var f = e.G.oc(b.contentWindow, d);
                  e.Wb.push({ G: f, lf: b });
                })
              );
          };
          c.prototype.Yd = function (b) {
            var d = this,
              e = b.frameId;
            b = b.data;
            this.xd[e] || (this.xd[e] = { data: [] });
            var f = this.xd[e];
            f.data = f.data.concat(b);
            this.l.isNaN(f.qd) &&
              y(function (g) {
                "page" === g.type && (f.qd = g.data.recordStamp - d.G.ff());
              }, f.data);
            this.l.isNaN(f.qd) ||
              (this.G.da(
                A(function (g) {
                  g.stamp += f.qd;
                  g.stamp = d.l.Math.max(0, g.stamp);
                  return g;
                }, f.data)
              ),
              (f.data = []));
          };
          c.prototype.Sh = function (b) {
            var d = b.getAttribute("src"),
              e = b.getAttribute("sandbox");
            return b.getAttribute("_ym_ignore") ||
              (e && !e.match(Gu)) ||
              (d &&
                "about:blank" !== d &&
                (d = Lc(this.l, d).host) &&
                Q(this.l).host !== d)
              ? !1
              : n(b, "contentWindow.location.href");
          };
          return c;
        })(Ya),
        Iu = x(function (a) {
          var c = n(a, "sessionStorage");
          if (!c) return null;
          try {
            var b = c.getItem("__ym_tab_guid");
            c = !1;
            var d = n(a, "opener.sessionStorage");
            try {
              c = !!d && b === d.getItem("__ym_tab_guid");
            } catch (e) {
              c = !0;
            }
            if (!b || c)
              (b = Th()), a.sessionStorage.setItem("__ym_tab_guid", b);
            return b;
          } catch (e) {
            return null;
          }
        }),
        Ju = (function (a) {
          function c(b, d, e) {
            b = a.call(this, b, d, e) || this;
            b.ne = b.L.H(b.ne, "ps");
            return b;
          }
          Na(c, a);
          c.prototype.start = function () {
            this.G.ta().Cc({
              nodes: [this.l.document.documentElement],
              Vc: this.ne,
            });
          };
          c.prototype.ne = function (b) {
            var d = this.G.xh(),
              e = d.nh(),
              f = Q(this.l),
              g = f.host,
              h = f.protocol;
            f = f.pathname;
            var k = Hc(this.l),
              l = k[0];
            k = k[1];
            this.G.Y(
              "page",
              {
                content: A(function (m) {
                  m.node = void 0;
                  return m;
                }, b),
                base: e || "",
                hasBase: !!e,
                viewport: { width: l, height: k },
                title: this.l.document.title,
                doctype: d.ph() || "",
                address: this.l.location.href,
                ua: this.l.navigator.userAgent,
                referrer: this.l.document.referrer,
                screen: {
                  width: this.l.screen.width,
                  height: this.l.screen.height,
                },
                location: { host: g, protocol: h, path: f },
                recordStamp: this.G.ff(),
                tabId: Iu(this.l),
              },
              "page",
              0
            );
          };
          return c;
        })(Ya),
        Ku = ["addRule", "removeRule", "insertRule", "deleteRule"],
        hh = [
          [
            (function (a) {
              function c(b, d, e) {
                b = a.call(this, b, d, e) || this;
                b.$a = {};
                b.Xb = {};
                b.Ne = 0;
                b.Mc = b.L.H(b.Mc, "a");
                b.ub = b.L.H(b.ub, "sr");
                b.Nc = b.L.H(b.Nc, "r");
                b.da = b.L.H(b.da, "d");
                return b;
              }
              Na(c, a);
              c.prototype.start = function () {
                var b = this.G.ta();
                b.F("style", "NA:", this.Mc);
                b.F("style", "NR:", this.Nc);
                this.da();
              };
              c.prototype.stop = function () {
                var b = this;
                a.prototype.stop.call(this);
                var d = this.G.ta();
                d.ga("style", "NA:", this.Mc);
                d.ga("style", "NR:", this.Nc);
                this.da();
                ma(this.l, this.Ne);
                y(function (e) {
                  b.$a[e].sheet && b.If(b.$a[e].sheet);
                }, ca(this.$a));
                this.$a = {};
              };
              c.prototype.da = function () {
                var b = this;
                y(function (d) {
                  var e = d[0];
                  d = d[1];
                  if (d.length) {
                    for (
                      var f = [], g = d[0].stamp, h = [], k = 0;
                      k < d.length;
                      k += 1
                    ) {
                      var l = d[k],
                        m = l.stamp;
                      delete l.stamp;
                      m <= g + 50 ? f.push(l) : (h.push(f), (g = m), (f = [l]));
                    }
                    f.length && h.push(f);
                    h.length &&
                      y(function (p) {
                        b.G.Y(
                          "event",
                          { target: Da(e), changes: p },
                          "stylechange",
                          g
                        );
                      }, h);
                    delete b.Xb[e];
                  }
                }, La(this.Xb));
                this.Ne = R(this.l, this.da, 100);
              };
              c.prototype.ub = function (b, d, e, f, g) {
                void 0 === f && (f = "");
                void 0 === g && (g = -1);
                this.Xb[b] || (this.Xb[b] = []);
                this.Xb[b].push({ op: d, style: f, index: g, stamp: e });
              };
              c.prototype.yi = function (b, d) {
                var e = this,
                  f = b.addRule,
                  g = b.removeRule,
                  h = b.insertRule,
                  k = b.deleteRule;
                T(f) &&
                  (b.addRule = function (l, m, p) {
                    e.ub(d, "a", e.G.stamp(), l + "{" + m + "}", p);
                    return f.call(b, l, m, p);
                  });
                T(g) &&
                  (b.removeRule = function (l) {
                    e.ub(d, "r", e.G.stamp(), "", l);
                    return g.call(b, l);
                  });
                T(h) &&
                  (b.insertRule = function (l, m) {
                    e.ub(d, "a", e.G.stamp(), l, m);
                    return h.call(b, l, m);
                  });
                T(k) &&
                  (b.deleteRule = function (l) {
                    e.ub(d, "r", e.G.stamp(), "", l);
                    return k.call(b, l);
                  });
              };
              c.prototype.If = function (b) {
                var d = this;
                y(function (e) {
                  var f = d.l.CSSStyleSheet.prototype[e];
                  T(f) && (b[e] = G(f, b));
                }, Ku);
              };
              c.prototype.$g = function (b) {
                try {
                  return b.cssRules || b.rules;
                } catch (d) {
                  return null;
                }
              };
              c.prototype.Mc = function (b) {
                var d = b.data;
                b = d.id;
                d = d.node;
                if (d.sheet && !d.getAttribute("src") && !d.innerText) {
                  var e = d.sheet,
                    f = this.$g(e);
                  if (f && f.length) {
                    for (var g = [], h = 0; h < f.length; h += 1)
                      g.push({ style: f[h].cssText, index: h, op: "a" });
                    this.G.Y("event", { changes: g, target: b }, "stylechange");
                  }
                  this.yi(e, b);
                  this.$a[b] = d;
                }
              };
              c.prototype.Nc = function (b) {
                b = b.data.id;
                var d = this.$a[b];
                d && (delete this.$a[b], d.sheet && this.If(d.sheet));
              };
              return c;
            })(Ya),
            "ss",
          ],
          [ju, "in"],
          [gu, "mu"],
          [ku, "r"],
          [lu, "sc"],
          [nu, "mo"],
          [pu, "f"],
          [uu, "se"],
          [wu, "wf"],
          [yu, "t"],
          [zu, "src"],
          [Au, "z"],
          [Fu, "ks"],
        ];
      hh.push([Hu, "if"]);
      hh.push([Ju, "pa"]);
      var Lu = x(function (a) {
          var c = a.document;
          return {
            Dd: function () {
              if (c.scrollingElement) return c.scrollingElement;
              var b =
                0 === c.compatMode.indexOf("CSS1") ? c.documentElement : c.body;
              return n(c, "documentElement.scrollHeight") >=
                n(c, "body.scrollHeight")
                ? b
                : null;
            },
            vh: function () {
              var b = a.screen;
              if (!b) return 0;
              var d = ob(v(b, n), [
                "orientation",
                "mozOrientation",
                "msOrientation",
              ]);
              return n(b, d + ".angle") || 0;
            },
            Cj: v(a, fb),
            mf: v(a, td),
            Bj: v(a, Se),
          };
        }),
        Mu = (function () {
          function a(c, b) {
            var d = this;
            this.Kb = 0;
            this.pd = [];
            this.Jb = null;
            this.wa = this.$b = this.Zf = !1;
            this.recordStamp = 0;
            this.xh = function () {
              return d.page;
            };
            this.Ad = function () {
              return d.Kb;
            };
            this.ff = function () {
              return d.recordStamp;
            };
            this.th = function () {
              return d.cb;
            };
            this.ef = function () {
              return d.Jb;
            };
            this.ta = function () {
              return d.Jd;
            };
            this.stamp = function () {
              return d.xe ? d.l.Math.max(d.xe(Y) - d.recordStamp, 0) : 0;
            };
            this.Hb = function () {
              return d.options;
            };
            this.ib = function () {
              return d.Cg;
            };
            this.Y = function (f, g, h, k) {
              void 0 === k && (k = d.stamp());
              f = d.sh(f, g, h, k);
              d.da(f);
            };
            this.sh = function (f, g, h, k) {
              void 0 === k && (k = d.stamp());
              return { type: f, data: g, stamp: k, frameId: d.Kb, event: h };
            };
            this.da = function (f) {
              f = da(f) ? f : [f];
              d.Zf && !d.$b
                ? d.wa
                  ? ((f = A(function (g) {
                      return g.frameId ? g : z(g, { frameId: d.Kb });
                    }, f)),
                    d.ef().Qf(f))
                  : d.Ub(f)
                : (d.pd = d.pd.concat(f));
            };
            this.l = c;
            var e = Ff(c, this, "R");
            this.ue = e.H(this.ue, "s");
            this.da = e.H(this.da, "sd");
            e = H(c);
            e.C("wv2e") && be();
            e.D("wv2e", !0);
            this.options = b;
            this.cb = ea(c);
            this.Jd = new hu(this.l, b);
            this.Cg = Lu(c);
            this.Pe = A(function (f) {
              return new f[0](c, d, f[1]);
            }, hh);
            this.Ph();
            this.page = Ln(this.l);
            this.ue();
          }
          a.prototype.start = function (c) {
            this.Zf = !0;
            this.Ub = c;
            this.Nf();
          };
          a.prototype.stop = function () {
            gh(this.l) &&
              (y(function (c) {
                return c.stop();
              }, this.Pe),
              this.Jd.stop(),
              this.Jb && this.Jb.stop(),
              this.wa || this.Y("event", {}, "eof"));
          };
          a.prototype.oc = function (c, b) {
            var d = new a(c, z({}, this.options, { frameId: b }));
            d.start(F);
            return d;
          };
          a.prototype.Ph = function () {
            var c = this;
            this.wa = !!this.options.frameId;
            this.Kb = this.options.frameId || 0;
            this.$b = !this.wa;
            var b = this.options.hg || [];
            b.push(Q(this.l).host);
            this.Jb = Mn(this.l, this, b);
            b = this.Jb.zd();
            fb(this.l)
              ? this.$b &&
                b.F(["i"], function (d) {
                  c.wa = d.wa;
                  c.$b = !1;
                  d.frameId && (c.Kb = d.frameId);
                  c.Nf();
                })
              : (this.$b = this.wa = !1);
          };
          a.prototype.Nf = function () {
            var c = Gd(this.pd);
            this.da(c);
          };
          a.prototype.ue = function () {
            this.xe = bg(this.l);
            this.recordStamp = this.xe(Y);
            y(function (c) {
              c.start();
            }, this.Pe);
            this.Jd.start();
          };
          return a;
        })(),
        Nu = (function () {
          return function (a, c, b) {
            var d = this;
            this.fd = this.Pb = !1;
            this.Va = [];
            this.uf = [];
            this.Se = [];
            this.send = function (e, f, g) {
              e = d.sender(e, d.nc);
              f && g && e.then(f, g);
              return e;
            };
            this.we = function (e, f, g) {
              return new J(function (h, k) {
                e.push([f, h, k, g]);
              });
            };
            this.Ih = function () {
              d.Va = yg(function (g, h) {
                return g[3].partNum - h[3].partNum;
              }, d.Va);
              var e = K(
                  function (g, h, k) {
                    h = h[3];
                    return g && k + 1 === h.partNum;
                  },
                  !0,
                  d.Va
                ),
                f = !!d.Va[d.Va.length - 1][3].end;
              return e && f;
            };
            this.vd = function (e) {
              nh(
                d.l,
                e.slice(),
                function (f) {
                  d.send(f[0], f[1], f[2]);
                },
                20,
                "s.w2.sf.fes"
              );
              Gd(e);
            };
            this.fh = function () {
              d.fd || ((d.fd = !0), d.vd(d.uf), d.vd(d.Se));
            };
            this.Jg = function (e) {
              return K(
                function (f, g) {
                  var h = "page" === g.type && !g.frameId,
                    k = "eof" === g.data.type || "eof" === g.event,
                    l = h && !!g.partNum;
                  return { ld: f.ld || l, kd: f.kd || h, jd: f.jd || k };
                },
                { kd: !1, jd: !1, ld: !1 },
                e
              );
            };
            this.Gh = function (e, f, g) {
              g
                ? ((e = d.we(d.Va, e, f[0])),
                  d.Ih() && (d.vd(d.Va), (d.Pb = !0)))
                : ((d.Pb = !0), (e = d.send(e)));
              return e;
            };
            this.gf = function (e, f, g) {
              var h;
              f = {
                J:
                  ((h = {}), (h["wv-part"] = "" + g), (h["wv-type"] = d.Ji), h),
                K: Ja(),
                aa: { ca: f },
              };
              e && f.K.D("bt", 1);
              return f;
            };
            this.Yg = function (e, f, g) {
              e = d.gf(!1, e, g);
              return d.Pb ? d.send(e) : d.we(d.Se, e, f);
            };
            this.ei = function (e, f, g) {
              e = d.gf(!0, e, g);
              if (d.Pb) return d.send(e);
              var h = d.Jg(f);
              g = h.kd;
              var k = h.jd;
              h = h.ld;
              var l;
              g && (l = d.Gh(e, f, h));
              d.fd
                ? g || (l = d.send(e))
                : (g || (l = d.we(d.uf, e, f)), (d.Pb || k) && d.fh());
              return l;
            };
            this.l = a;
            this.Ji = b;
            this.sender = ua(a, "W", c);
            this.nc = c;
          };
        })(),
        Ol = x(
          function (a) {
            var c = H(a),
              b = c.C("isEU");
            if (V(b)) {
              var d = Da(ue(a, "is_gdpr") || "");
              if (L(d, [0, 1])) c.D("isEU", d), (b = !!d);
              else if (((a = Oa(a).C("wasSynced")), (a = n(a, "params.eu"))))
                c.D("isEU", a), (b = !!a);
            }
            return b;
          },
          function (a) {
            return H(a).C("isEU");
          }
        ),
        Af = B("i.e", Ol),
        Ou = B("i.ep", function (a) {
          Ol(a);
        }),
        Pu = B("w2", function (a, c) {
          function b() {
            h = !0;
          }
          var d = H(a),
            e = M(c);
          if (
            !c.xb ||
            id(a) ||
            !a.MutationObserver ||
            !Ha("Element", a.Element)
          )
            return F;
          Ha("MutationObserver", a.MutationObserver) ||
            Fd(a, e).warn(
              "MutationObserver is overridden, webvisor is not guaranteed to work in this environment"
            );
          var f = Ba(function (k, l) {
              qa(c, l)["catch"](k);
            }),
            g = Jb(a)(Qg(C([a, c], Jn)))(
              el(function (k) {
                return new Mu(a, k);
              })
            ),
            h = !1;
          gr([g, f])(
            Pa(E(a, "wv2.R.c"), function (k) {
              var l = k[0];
              k = k[1];
              if (!h) {
                b = function () {
                  h || ((h = !0), l && l.stop());
                };
                var m = d.C("wv2Counter");
                if (!Vh(a, k) || m) b();
                else if (
                  (ea(a).F(a, ["beforeunload", "unload"], b),
                  d.D("wv2Counter", e),
                  d.D("stopRecorder", b),
                  (k = gi(a, "7", "6")))
                ) {
                  m = new Nu(a, c, k.type);
                  var p = Ll.bf(e, "m", G(m.ei, m), k, a),
                    q = Ll.bf(e, "e", G(m.Yg, m), k, a);
                  k = Kn();
                  m = k.mi;
                  q.F("ag", k.Ag);
                  q.F("p", m);
                  p.F("see", function (t) {
                    var u = !1;
                    y(function (D) {
                      "page" === D.type && (u = !0);
                    }, t);
                    u &&
                      (h ||
                        q.push({
                          type: "event",
                          event: "fatalError",
                          data: {
                            code: "invalid-snapshot",
                            Zg: "p.s.f",
                            stack: "",
                          },
                        }),
                      b());
                  });
                  var r = zb(function (t) {
                    "eof" === n(t, "data.type") || "eof" === t.event
                      ? (q.push(t), p.push(t), q.flush(!0), p.flush(!0))
                      : ("event" === t.type ? q : p).push(t);
                  });
                  R(a, b, 864e5);
                  Ob(a, function () {
                    var t, u;
                    pb(
                      a,
                      ((t = {}),
                      (t.counterKey = e),
                      (t.name = "webvisor"),
                      (t.data = ((u = {}), (u.version = 2), u)),
                      t)
                    );
                    l.start(r);
                  });
                }
              }
            })
          );
          return function () {
            return b();
          };
        }),
        Qu = B("w2.cs", function (a, c) {
          var b,
            d = M(c);
          Zf(a, d, ((b = {}), (b.webvisor = !!c.xb), b));
        }),
        Ru = ["rt", "mf"],
        zf = x(Dc, M),
        Ph = w(kd, bc),
        Su = rb("isp", function (a, c) {
          qa(c, function (b) {
            var d = ob(function (h) {
              return n(b, "settings." + h);
            }, Ru);
            if (d && Ud(a)) {
              var e = qf(b) && !le(a),
                f = zf(c);
              z(f, { Qb: d, status: e ? 3 : 4 });
              if (!e) {
                e = Fn(a, c, d);
                var g = function (h) {
                  f.status = h;
                };
                return ("mf" === d ? Hn : Gn)(a, c, e)
                  .then(v(1, g))
                  ["catch"](v(2, g));
              }
            }
          })["catch"](E(a, "l.isp"));
        }),
        Pl = B("fbq.o", function (a, c, b) {
          var d = n(a, "fbq");
          if (d && d.callMethod) {
            var e = function () {
              var g = Ia(arguments),
                h = d.apply(void 0, g);
              c(g);
              return h;
            };
            z(e, d);
            b && y(c, b);
            a.fbq = e;
          } else var f = R(a, C([a, c].concat(Aa(d && d.queue)), Pl), 1e3, "fbq.d");
          return G(ma, null, a, f);
        }),
        cd,
        Fb,
        dd,
        ih =
          ((cd = {}),
          (cd.add_to_wishlist = "add-to-wishlist"),
          (cd.begin_checkout = "begin-checkout"),
          (cd.generate_lead = "submit-lead"),
          (cd.add_payment_info = "add-payment-info"),
          cd),
        jh =
          ((Fb = {}),
          (Fb.AddToCart = "add-to-cart"),
          (Fb.Lead = "submit-lead"),
          (Fb.InitiateCheckout = "begin-checkout"),
          (Fb.Purchase = "purchase"),
          (Fb.CompleteRegistration = "register"),
          (Fb.Contact = "submit-contact"),
          (Fb.AddPaymentInfo = "add-payment-info"),
          (Fb.AddToWishlist = "add-to-wishlist"),
          (Fb.Subscribe = "subscribe"),
          Fb),
        Dn =
          ((dd = {}),
          (dd["1"] = ih),
          (dd["2"] = ih),
          (dd["3"] = ih),
          (dd["0"] = jh),
          dd),
        En = [jh.AddToCart, jh.Purchase],
        Tu = oa(function (a, c) {
          var b = n(c, "ecommerce"),
            d = n(c, "event") || "";
          if (!(b = b && d && { version: "3", sc: d }))
            a: {
              if (da(c) || Qa(c))
                if (((b = Ia(c)), (d = b[1]), "event" === b[0] && d)) {
                  b = { version: "2", sc: d };
                  break a;
                }
              b = void 0;
            }
          b ||
            (b = (b = n(c, "ecommerce")) && {
              version: "1",
              sc: I(",", ca(b)),
            });
          b && a(b);
        }),
        Uu = B("ag.e", function (a, c) {
          if ("0" === c.ba) {
            var b = [],
              d = E(a, "ag.s", C([ha, b], y));
            qa(c, function (e) {
              if (
                n(e, "settings.auto_goals") &&
                Ea(a, c) &&
                (e = Ce(a, c, "autogoal").reachGoal)
              ) {
                e = C([e, c.sd], Cn);
                var f = Tu(e);
                e = C([a, e], Bn);
                b.push(Pl(a, e));
                b.push(
                  Wi(a, "dataLayer", function (g) {
                    g.Aa.F(f);
                  })
                );
              }
            });
            return d;
          }
        }),
        Vu = /[^\d.,]/g,
        Wu = /[.,]$/,
        zn = B("ep.pp", function (a, c) {
          if (!c) return 0;
          a: {
            var b = c.replace(Vu, "").replace(Wu, "");
            var d = "0" === b[b.length - 1];
            for (var e = b.length; 0 < e && !(3 < b.length - e + 1 && d); --e) {
              var f = b[e - 1];
              if (L(f, [",", "."])) {
                d = f;
                break a;
              }
            }
            d = "";
          }
          b = d ? c.split(d) : [c];
          d = d ? b[1] : "00";
          b = parseFloat(Pb(b[0]) + "." + Pb(d));
          d = Math.pow(10, 8) - 0.01;
          a.isNaN(b)
            ? (b = 0)
            : ((b = a.Math.min(b, d)), (b = a.Math.max(b, 0)));
          return b;
        }),
        Xu = [
          [["EUR", "\u20ac"], "978"],
          [["USD", "\u0423\\.\u0415\\.", "\\$"], "840"],
          [["UAH", "\u0413\u0420\u041d", "\u20b4"], "980"],
          [
            "\u0422\u0413 KZT \u20b8 \u0422\u04a2\u0413 TENGE \u0422\u0415\u041d\u0413\u0415".split(
              " "
            ),
            "398",
          ],
          [["GBP", "\u00a3", "UKL"], "826"],
          [
            "RUR RUB \u0420 \u0420\u0423\u0411 \u20bd P \u0420UB P\u0423\u0411 P\u0423B PY\u0411 \u0420Y\u0411 \u0420\u0423B P\u0423\u0411".split(
              " "
            ),
            "643",
          ],
        ],
        Yu = x(function (a) {
          return new RegExp(a.join("|"), "i");
        }),
        Zu = B("ep.cp", function (a) {
          if (!a) return "643";
          var c = Mi(a);
          return (a = ob(function (b) {
            return Yu(b[0]).test(c);
          }, Xu))
            ? a[1]
            : "643";
        }),
        $u = x(function () {
          function a() {
            var k = h + "0",
              l = h + "1";
            f[k]
              ? f[l]
                ? ((h = h.slice(0, -1)), --g)
                : ((e[l] = b(8)), (f[l] = 1))
              : ((e[k] = b(8)), (f[k] = 1));
          }
          function c() {
            var k = h + "1";
            f[h + "0"]
              ? f[k]
                ? ((h = h.slice(0, -1)), --g)
                : ((h += "1"), (f[h] = 1))
              : ((h += "0"), (f[h] = 1));
          }
          function b(k) {
            void 0 === k && (k = 1);
            var l = d.slice(g, g + k);
            g += k;
            return l;
          }
          for (
            var d = Nh(
                "Cy2FcreLJLpYXW3BXFJqldVsGMwDcBw2BGnHL5uj1TKstzse3piMo3Osz+EqDotgqs1TIoZvKtMKDaSRFztgUS8qkqZcaETgKWM54tCpTXjV5vW5OrjBpC0jF4mspUBQGd95fNSfv+vz+g+Hze33Hg8by+Yen1PP6zsdl7PQCwX9mf+f7FMb9x/Pw+v2Pp8Xy74eTwuBwTt913u4On1XW6hxOO5nIzFam00tC218S0kaeugpqST+XliLOlMoTpRQkuewUxoy4CT3efWtdFjSAAm+1BkjIhyeU4vGOf13a6U8wzNY4bGo6DIUemE7N3SBojDr7ezXahpWF022y8mma1NuTnZbq8XZZlPStejfG/CsbPhV6/bSnA=="
              ).join(""),
              e = {},
              f = {},
              g = 1,
              h = "";
            g < d.length - 1;

          )
            ("0" === b() ? c : a)();
          return e;
        }),
        wn = B("ep.dec", function (a, c) {
          if (!c || id(a)) return [];
          var b = Nh(c),
            d = b[1],
            e = b[2],
            f = b.slice(3);
          if (2 !== Ng(b[0])) return [];
          b = $u();
          f = f.join("");
          e = Ng(d + e);
          var g = "";
          d = "";
          for (var h = 0; d.length < e && f[h]; )
            (g += f[h]),
              b[g] && ((d += String.fromCharCode(Ng(b[g]))), (g = "")),
              (h += 1);
          b = "";
          for (f = 0; f < d.length; )
            (e = d.charCodeAt(f)),
              128 > e
                ? ((b += String.fromCharCode(e)), f++)
                : 191 < e && 224 > e
                ? ((g = d.charCodeAt(f + 1)),
                  (b += String.fromCharCode(((e & 31) << 6) | (g & 63))),
                  (f += 2))
                : ((g = d.charCodeAt(f + 1)),
                  (b += String.fromCharCode(
                    ((e & 15) << 12) |
                      ((g & 63) << 6) |
                      (d.charCodeAt(f + 2) & 63)
                  )),
                  (f += 3));
          d = wb(a, b);
          return da(d) ? A(Lr, d) : [];
        }),
        yn = B("ep.ent", function (a, c, b) {
          a = "" + Ua(a, 10, 99);
          b = "" + 100 * c + b + a;
          if (16 < Qa(b)) return "";
          b = Oh("0", 16, b);
          c = b.slice(0, 8);
          b = b.slice(-8);
          c = (+c ^ 92844).toString(35);
          b = (+b ^ 92844).toString(35);
          return "" + c + "z" + b;
        }),
        Ql = w(Mh, Zu),
        Rl = B("ep.ctp", function (a, c, b, d) {
          var e = Ql(a, b),
            f = Lh(a, d);
          Kh(a, c, e, f);
          Ha("MutationObserver", a.MutationObserver) &&
            new a.MutationObserver(function () {
              var g = Ql(a, b),
                h = Lh(a, d);
              if (e !== g || f !== h) (e = g), (f = h), Kh(a, c, e, f);
            }).observe(a.document.body, {
              attributes: !0,
              childList: !0,
              subtree: !0,
              characterData: !0,
            });
        }),
        av = B("ep.chp", function (a, c, b, d, e) {
          b && xf(a, c);
          return d || e
            ? ea(a).F(
                a.document,
                ["click"],
                E(a, "ep.chp.cl", C([a, c, d, e], xn))
              )
            : F;
        }),
        ev = B("ep.i", function (a, c) {
          if (Md(a))
            return vn(a, c).then(function (b) {
              var d = b.Ug,
                e = d[0],
                f = d[1],
                g = d[2],
                h = d[3],
                k = d[4],
                l = d[5],
                m = d[6],
                p = d[7],
                q = d[8],
                r = d[9],
                t = d[10],
                u = d[11],
                D = d[12],
                O = d[13],
                N = d[14],
                ia = d[15];
              if (!b.isEnabled) return J.resolve(F);
              var wa = oe(a, e),
                Ab = oe(a, h),
                Ad = oe(a, m),
                ze = oe(a, q),
                bv = "" + e + f + g === "" + h + k + l;
              return new J(function (cv, dv) {
                Jb(a)(
                  Pa(dv, function () {
                    wa && Rl(a, c, f, g, t, u, D);
                    Ab && !bv && Rl(a, c, k, l, O, N, ia);
                    cv(av(a, c, Ad || ze, p, r));
                  })
                );
              });
            });
        }),
        dn = [
          "RTCPeerConnection",
          "mozRTCPeerConnection",
          "webkitRTCPeerConnection",
        ],
        un = w(ca, Qc),
        fv = B("cc.i", function (a, c) {
          var b = C([a, c], tn);
          b = C([a, b, 300, void 0], R);
          qa(c, b);
        }),
        gv = v("9-d5ve+.r%7", P),
        hv = B("ad", function (a, c) {
          if (!c.Sa) {
            var b = H(a);
            if (!b.C("adBlockEnabled")) {
              var d = function (m) {
                  L(m, ["2", "1"]) && b.D("adBlockEnabled", m);
                },
                e = ec(a),
                f = e.C("isad");
              if (f) d(f);
              else {
                var g = v("adStatus", b.D),
                  h = function (m) {
                    m = m ? "1" : "2";
                    d(m);
                    g("complete");
                    e.D("isad", m, 1200);
                    return m;
                  },
                  k = ua(a, "adb", c);
                if (!b.C("adStatus")) {
                  g("process");
                  var l = "metrika/a" + gv().replace(/[^a-v]+/g, "") + "t.gif";
                  qn(a, function () {
                    return k({ ha: { Ca: l } })
                      .then(v(!1, h))
                      ["catch"](v(!0, h));
                  });
                }
              }
            }
          }
        }),
        iv = B("pr.p", function (a, c) {
          var b, d;
          if (mg(a)) {
            var e = ua(a, "5", c),
              f = Ja(((b = {}), (b.pq = 1), (b.ar = 1), b));
            e(
              {
                K: f,
                J:
                  ((d = {}),
                  (d["page-url"] = Q(a).href),
                  (d["page-ref"] = n(a, "document.referrer") || ""),
                  d),
              },
              c
            )["catch"](E(a, "pr.p.s"));
          }
        }),
        Jh = !1,
        jv = B("fid", function (a) {
          var c,
            b = F;
          if (!T(a.PerformanceObserver)) return b;
          var d = H(a);
          if (d.C("fido")) return b;
          d.D("fido", !0);
          var e = new a.PerformanceObserver(
            E(a, "fid", function (f) {
              f = f.getEntries()[0];
              d.D("fid", a.Math.round(100 * (f.processingStart - f.startTime)));
              b();
            })
          );
          b = function () {
            return e.disconnect();
          };
          try {
            e.observe(
              ((c = {}), (c.type = "first-input"), (c.buffered = !0), c)
            );
          } catch (f) {}
          return b;
        }),
        kv = B(
          "lt.p",
          rb("lt.p", function (a) {
            var c;
            if (Ha("PerformanceObserver", a.PerformanceObserver)) {
              var b = 0,
                d = new a.PerformanceObserver(
                  E(a, "lt.o", function (e) {
                    e &&
                      e.getEntries &&
                      ((e = e.getEntries()),
                      (b = K(
                        function (f, g) {
                          return f + g.duration;
                        },
                        b,
                        e
                      )),
                      Rd(a).D("lt", b));
                  })
                );
              try {
                d.observe(
                  ((c = {}), (c.type = "longtask"), (c.buffered = !0), c)
                );
              } catch (e) {
                return;
              }
              return function () {
                return d.disconnect();
              };
            }
          })
        ),
        lv = x(w(U("performance.memory.jsHeapSizeLimit"), Fa("concat", ""))),
        mv = ["availWidth", "availHeight", "availTop"],
        nv =
          "appName vendor deviceMemory hardwareConcurrency maxTouchPoints appVersion productSub appCodeName vendorSub".split(
            " "
          ),
        ov = ["webgl", "experimental-webgl"],
        on = [-0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0],
        tf = v(Sa("ccf"), Wa),
        nn =
          "prefers-reduced-motion;prefers-reduced-transparency;prefers-color-scheme: dark;prefers-color-scheme: light;pointer: none;pointer: coarse;pointer: fine;any-pointer: none;any-pointer: coarse;any-pointer: fine;scan: interlace;scan: progressive;color-gamut: srgb;color-gamut: p3;color-gamut: rec2020;update: fast;update: slow;update: none;grid: 0;grid: 2;hover: hover;inverted-colors: inverted;inverted-colors: none".split(
            ";"
          ),
        Hh =
          "video/ogg video/mp4 video/webm audio/x-aiff audio/x-m4a audio/mpeg audio/aac audio/wav audio/ogg audio/mp4".split(
            " "
          ),
        ln = "theora vorbis 1 avc1.4D401E mp4a.40.2 vp8.0 mp4a.40.5".split(" "),
        fn = x(Hi),
        Gh = x(wb, cb),
        pv = B("phc.p", function (a, c) {
          if (!ql(a))
            return qa(c, function (b) {
              var d = c.id,
                e = Ic(a, void 0, d),
                f = e.C("phc_settings") || "";
              if ((b = n(b, "settings.phchange"))) {
                var g = mb(a, b) || "";
                g !== f && e.D("phc_settings", g);
              } else f && (b = Gh(a, f));
              e = n(b, "clientId");
              f = n(b, "orderId");
              b = n(b, "phones") || [];
              e &&
                f &&
                b.length &&
                ((f = {
                  Bb: "",
                  Ob: "",
                  Xf: 0,
                  ma: {},
                  Ba: [],
                  pf: !1,
                  fb: !0,
                  l: a,
                  nc: c,
                }),
                z(f, { pf: !0 }),
                Fh(a, d, f),
                (b = Cd(a)),
                (e = Ji(a, b, 1e3)),
                (d = G(Fh, null, a, d, f)),
                e.F(d),
                Ki(a, b));
            });
        }),
        kh = x(function (a, c) {
          var b = H(a),
            d = Oa(a),
            e = [],
            f = C([a, c, b, d], Cp);
          ud(a) || Dp(a, "14.1") || e.push(C([cn, "pp", ""], f));
          var g = !sl(a) || rf(a, 68);
          g && e.push(C([en, "pu", ""], f));
          !g ||
            d.Ld ||
            Ud(a) ||
            (e.push(C([bn, "zzlc", "na"], f)), e.push(C([an, "cc", ""], f)));
          return e.length
            ? {
                ra: function (h, k) {
                  if (0 === b.C("isEU"))
                    try {
                      y(Be, e);
                    } catch (l) {}
                  k();
                },
                N: function (h, k) {
                  var l = h.K;
                  if (l && 0 === b.C("isEU"))
                    try {
                      y(Ba(l), e);
                    } catch (m) {}
                  k();
                },
              }
            : {};
        }, w(cb, M)),
        qv = w(function (a) {
          return (a = n(a, "navigator.plugins")) && Qa(a)
            ? w(
                Aa,
                ta,
                ks(function (c, b) {
                  return c.name > b.name ? 1 : 2;
                }),
                zb(zp)
              )(a)
            : "";
        }, wd(",")),
        rv = (function (a) {
          return function (c) {
            var b = $a(c);
            if (!b) return "";
            b = b("canvas");
            var d = [],
              e = a(),
              f = e.ah;
            e = e.Rg;
            try {
              var g = Fa("getContext", b);
              d = A(w(P, g), e);
            } catch (h) {
              return "";
            }
            return (g = ob(P, d)) ? f(c, { canvas: b, Gg: g }) : "";
          };
        })(function () {
          return { Rg: ov, ah: Xm };
        }),
        Vm = ["name", "lang", "localService", "voiceURI", "default"],
        sv = B("p.tfs", function (a) {
          var c = H(a);
          if (!c.C("tfs")) {
            c.D("tfs", !0);
            c = ea(a);
            var b = F;
            b = c.F(a, ["message"], function (d) {
              var e = n(d, "origin");
              if (
                "https://iframe-toloka.com" === e ||
                "https://iframe-tasks.yandex" === e
              )
                if (((d = wb(a, d.data)), va(d) && "appendremote" === d.action))
                  if (
                    ((d = Oa(a)),
                    d.C("tfsc") ||
                      a.confirm(
                        "\u0414\u043e\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435 \u201c\u0420\u0430\u0437\u043c\u0435\u0442\u043a\u0430 \u0441\u0430\u0439\u0442\u043e\u0432\u201c \u043e\u0442 toloka.ai \u0437\u0430\u043f\u0440\u0430\u0448\u0438\u0432\u0430\u0435\u0442 \u0434\u043e\u0441\u0442\u0443\u043f \u043a \u0441\u043e\u0434\u0435\u0440\u0436\u0438\u043c\u043e\u043c\u0443 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b. \u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044c?"
                      ))
                  ) {
                    d.D("tfsc", 1);
                    var f, g;
                    H(a).D(
                      "_u",
                      ((f = {}),
                      (f.getCachedTags = Ae),
                      (f.button =
                        ((g = {}),
                        (g.closest = v(a, ee)),
                        (g.select = Sf),
                        (g.getData = v(a, fe)),
                        g)),
                      f)
                    );
                    rc(a, {
                      src: "https://yastatic.net/s3/metrika/2.1540128042.1/form-selector/button_ru.js",
                    });
                    b();
                  } else a.close();
            });
          }
        }),
        Tm = bb(/[a-z\u0430-\u044f\u0451,.]/gi),
        tv = B("ice", function (a, c, b) {
          (c = Ea(a, c)) && (b = Ch(b)) && Bh(a, c, b);
        }),
        uv = B("ice", function (a, c, b) {
          (c = Ea(a, c)) &&
            (b = Ch(b)) &&
            jj(a, b.Rh).then(C([a, c, b], Bh), E(a, "ice.s"));
        }),
        vv = ["text", "email", "tel"],
        wv = ["cc-", "name", "shipping"],
        xv = B("icei", function (a, c) {
          if (Md(a) && ll(a)) {
            var b = !1,
              d = [];
            Jb(a)(
              Pa(
                F,
                C(
                  [
                    c,
                    function (e) {
                      if (!(Af(a) || n(e, "settings.eu") || b)) {
                        var f = n(e, "settings.cf") ? uv : tv,
                          g = ea(a);
                        e = qb("input", a.document.body);
                        y(function (h) {
                          Jf(a, h) ||
                            !L(h.type, vv) ||
                            ab(Mb, A(v(h.autocomplete, Za), wv)) ||
                            d.push(g.F(h, ["blur"], C([a, c], f)));
                        }, e);
                      }
                    },
                  ],
                  qa
                )
              )
            );
            return function () {
              y(ha, d);
              b = !0;
            };
          }
        }),
        Ah,
        yv = B("p.ai", function (a, c) {
          if (ud(a) || hf(a))
            return qa(c, function (b) {
              var d;
              if ((b = n(b, "settings.sbp")))
                return zh(a, z({}, b, ((d = {}), (d.c = c.id), d)), 10);
            });
        }),
        zv =
          "architecture bitness model platformVersion uaFullVersion fullVersionList".split(
            " "
          ),
        Sl = rb("uah", function (a) {
          if (
            !Ha(
              "getHighEntropyValues",
              n(a, "navigator.userAgentData.getHighEntropyValues")
            )
          )
            return J.reject("0");
          try {
            return a.navigator.userAgentData.getHighEntropyValues(zv).then(
              function (c) {
                if (!va(c)) throw "2";
                return c;
              },
              function () {
                throw "1";
              }
            );
          } catch (c) {
            return J.reject("3");
          }
        }),
        Tl = new RegExp(
          I(
            "|",
            "yandex.com/bots;Googlebot;APIs-Google;Mediapartners-Google;AdsBot-Google;FeedFetcher-Google;Google-Read-Aloud;DuplexWeb-Google;Google Favicon;googleweblight;Lighthouse;Mail.RU_Bot;StackRambler;Slurp;msnbot;bingbot;www.baidu.com/search/spi_?der.htm".split(
              ";"
            )
          ).replace(/[./]/g, "\\$&")
        ),
        Lm = x(function (a) {
          var c = hb(a);
          return (c = Tl.test(c))
            ? J.resolve(c)
            : Sl(a).then(function (b) {
                try {
                  return K(
                    function (d, e) {
                      return d || Tl.test(e.brand);
                    },
                    !1,
                    b.brands
                  );
                } catch (d) {
                  return !1;
                }
              }, v(!1, P));
        }),
        Zb = ["0", "1", "2", "3"],
        Jc = Zb[0],
        gf = Zb[1],
        Av = Zb[2],
        lf = A(w(P, Fa("concat", "GDPR-ok-view-detailed-")), Zb),
        ke =
          "GDPR-ok GDPR-cross GDPR-cancel 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 GDPR-settings GDPR-ok-view-default GDPR-ok-view-detailed 21 22 23"
            .split(" ")
            .concat(lf)
            .concat(["28", "29", "30"]),
        Bv = "3 13 14 15 16 17 28".split(" "),
        kf = w(zb(U("ymetrikaEvent.type")), Lk(xc(ke))),
        Cv = {
          Zh: !0,
          url: "https://yastatic.net/s3/gdpr/v3/gdpr",
          Af: "",
          sf: "az be en es et fi fr hy ka kk ky lt lv no pt ro ru sl tg tr uz cs da de el hr it nl pl sk sv".split(
            " "
          ),
        },
        Pm = rb("gdpr", function (a, c, b, d, e) {
          function f(p) {
            c("10");
            b.F(
              ["GDPR-ok-view-default", "GDPR-ok-view-detailed"].concat(lf),
              function (q) {
                var r;
                q = q.type;
                l.Tf(((r = {}), (r.type = q), r));
                p({ value: yh(q) });
              }
            );
          }
          var g = void 0 === e ? Cv : e;
          e = g.url;
          var h = g.Af,
            k = g.Zh;
          g = Sm(a, g.sf, d.ij);
          var l = ne(a, d);
          if (!l) return J.resolve({ value: Jc, Nd: !0 });
          if (a._yaGdprLoaded)
            return new J(function (p) {
              c("7");
              f(p);
            });
          var m = rc(a, { src: "" + e + (k ? "" : g) + h + ".js" });
          return new J(function (p, q) {
            m
              ? (c("7"),
                (m.onerror = function () {
                  var r;
                  c("9");
                  l.Tf(((r = {}), (r.type = "GDPR-ok-view-default"), r));
                  p(null);
                }),
                (m.onload = v(p, f)))
              : (c("9"), q(Sa("gdp.e")));
          });
        }),
        Xb,
        Rm =
          ((Xb = {}),
          (Xb["GDPR-ok"] = "ok"),
          (Xb["GDPR-ok-view-default"] = "ok-default"),
          (Xb["GDPR-ok-view-detailed"] = "ok-detailed"),
          (Xb["GDPR-ok-view-detailed-0"] = "ok-detailed-all"),
          (Xb["GDPR-ok-view-detailed-1"] = "ok-detailed-tech"),
          (Xb["GDPR-ok-view-detailed-2"] = "ok-detailed-tech-analytics"),
          (Xb["GDPR-ok-view-detailed-3"] = "ok-detailed-tech-other"),
          Xb),
        Jm =
          "az be en es et fi fr hy ka kk ky lt lv no pt ro ru sl tg tr uz ar he sr uk zh".split(
            " "
          ),
        me = [],
        vh = w(kf, zb(js(ke)), wd(",")),
        wh = w(Lk(xc(ke)), Qa),
        Im = x(function (a, c) {
          var b = c.C("gdpr");
          return L(b, Zb) ? "-" + b : "";
        }),
        Ul = x(Bd),
        Dv = x(function () {
          var a = K(
            function (c, b) {
              "ru" !== b && (c[b] = Al + "." + b);
              return c;
            },
            {},
            vg
          );
          y(function (c) {
            a[c] = c;
          }, ca(vl));
          a["mc.webvisor.org"] = "mc.webvisor.org";
          return a;
        }),
        Bm = x(function (a) {
          a = Q(a).hostname;
          return (a = ob(w(U("1"), Ii("test"), Db(ha)(a)), La(vl))) && a[0];
        }),
        Vl = (function (a, c) {
          return function (b, d) {
            var e = M(d);
            e = Dv(e);
            var f = zm(b, e),
              g = H(b),
              h = fb(b);
            return Ud(b) || Qd(b)
              ? {}
              : {
                  N: function (k, l) {
                    var m = k.K;
                    m = !(m && m.C("pv"));
                    if (h || m || !f.length) return l();
                    if (g.C("startSync")) Ul(b).push(l);
                    else {
                      g.D("startSync", !0);
                      m = C([b, f, F, !1], a);
                      var p = jf[0];
                      if (!p) return l();
                      l();
                      p(b)
                        .then(m)
                        .then(F, w(ld(F), E(b, c)))
                        ["catch"](F);
                    }
                  },
                };
          };
        })(function (a, c, b, d) {
          var e = fa(a),
            f = H(a),
            g = Oa(a);
          b = Xg(a, "c");
          var h = Ub(a, b);
          return K(
            function (k, l) {
              function m() {
                var r = g.C("synced");
                f.D("startSync", !1);
                r && ((r[l.ai] = p), g.D("synced", r));
                r = Ul(a);
                y(ha, r);
                Gd(r);
              }
              var p,
                q = h({ aa: { ia: ["sync.cook"], Oa: 1500 } }, [
                  Ga.Qa +
                    "//" +
                    l.Pi +
                    "/sync_cookie_image_check" +
                    (d ? "_secondary" : ""),
                ])
                  .then(function () {
                    p = e(lb);
                    m();
                  })
                  ["catch"](function () {
                    p = e(lb) - 1435;
                    m();
                  });
              q = v(q, P);
              return k.then(q);
            },
            J.resolve(),
            c
          )["catch"](E(a, "ctl"));
        }, "sy.c"),
        wm = oa(function (a, c) {
          var b = c.od,
            d = c.Je,
            e = c.cookie,
            f = sh(c)[a];
          f = Ag(f, d);
          b !== f && ((b = th(e, d)), (b[f] += 1), xm(b, c));
        }),
        Ev = x(function (a) {
          var c;
          (c = n(a, "document.referrer"))
            ? ((c = Lc(a, c).host), (c = kj(c)), (c = Al + "." + (c || Tt)))
            : (c = fc);
          c = ["mc.webvisor.org", c];
          a = ec(a);
          return { cookie: a, Je: c, od: c.length - 1, Lh: th(a, c) };
        }),
        vm = w(Ev, Ba),
        Gb,
        tm =
          ((Gb = {}),
          (Gb.brands = "chu"),
          (Gb.architecture = "cha"),
          (Gb.bitness = "chb"),
          (Gb.uaFullVersion = "chf"),
          (Gb.fullVersionList = "chl"),
          (Gb.mobile = "chm"),
          (Gb.model = "cho"),
          (Gb.platform = "chp"),
          (Gb.platformVersion = "chv"),
          Gb),
        qm = x(function (a) {
          return Sl(a).then(rm, um);
        }),
        Fv = rb("ot", function (a, c) {
          if (Ke(a)) {
            var b = ea(a);
            return qa(
              c,
              E(a, "ot.s", function (d) {
                if (n(d, "settings.oauth")) {
                  var e = [],
                    f = kd(a, c);
                  e.push(b.F(a, ["message"], E(a, "ot.m", v(f, pm))));
                  Jb(a)(
                    Pa(
                      F,
                      E(a, "ot.b", function () {
                        function g(q) {
                          var r,
                            t = q.href;
                          t &&
                            nl(t, "https://oauth.yandex.ru/") &&
                            !Za(t, "_ym_uid=") &&
                            ((t = Za(t, "?") ? "&" : "?"),
                            (q.href +=
                              "" +
                              t +
                              zc(((r = {}), (r._ym_uid = f), (r.mc = "v"), r))),
                            b.F(
                              q,
                              ["click"],
                              E(a, "ot.click", function () {
                                var u = "et=" + l(Y);
                                q.href += "&" + u;
                              })
                            ));
                        }
                        var h,
                          k = a.document.body,
                          l = fa(a),
                          m = qb("a", k);
                        y(g, m);
                        if (Ha("MutationObserver", a.MutationObserver)) {
                          m = new a.MutationObserver(
                            E(
                              a,
                              "ot.m",
                              v(function (q) {
                                q = q.addedNodes;
                                for (var r = 0; r < q.length; r += 1) {
                                  var t = q[r];
                                  "A" === t.nodeName && g(t);
                                }
                              }, y)
                            )
                          );
                          var p =
                            ((h = {}), (h.childList = !0), (h.subtree = !0), h);
                          m.observe(k, p);
                          e.push(G(m.disconnect, m));
                        }
                      })
                    )
                  );
                  return C([Be, e], y);
                }
              })
            );
          }
        }),
        Gv = B("p.cta", function (a) {
          Jb(a)(
            Pa(F, function () {
              var c = H(a);
              if (nm(a.document)) {
                var b = 0;
                if (Qh(a, qe, "cta")) {
                  var d = F,
                    e = function () {
                      Rh(qe, "cta");
                      d();
                      ma(a, b);
                    };
                  d = ea(a).F(a, ["message"], B("p.cta.o", C([a, c, e], om)));
                  b = R(a, e, 1500);
                } else c.D("cta.e", "if");
              } else c.D("cta.e", "ns");
            })
          );
        }),
        lm = /(\D\d*)/g,
        mm = x(function () {
          var a = Ae();
          return K(
            function (c, b) {
              c[a[b]] = b;
              return c;
            },
            {},
            ca(a)
          );
        }),
        Hv = B("g.v.e", function (a, c) {
          return qa(
            c,
            E(a, "g.v.t", function (b) {
              var d = Ea(a, c);
              if (d && (b = n(b, "settings.goal_values"))) {
                var e = la(w(U("url"), v(a, gm)), b);
                if (0 !== e.length) {
                  b = ea(a);
                  var f = [];
                  e = C(
                    [
                      a,
                      function (g) {
                        var h;
                        return d.params(((h = {}), (h.__ym = g), h));
                      },
                      e,
                    ],
                    jm
                  );
                  f.push(b.F(a, ["click"], E(a, "g.v.c", C([e], hm))));
                  f.push(b.F(a, ["submit"], E(a, "g.v.s", C([a, e], im))));
                  return C([w(P, ha), f], y);
                }
              }
            })
          );
        }),
        Wl = {},
        Xl = x(Dc),
        fm = w(Fa("exec", /counterID=(\d+)/), U("1")),
        Yl = oa(function (a, c) {
          var b = Xl(a),
            d = Aa(c),
            e = d[0],
            f = d[1],
            g = d.slice(2);
          if (f) {
            d = em(a, e);
            var h = d[0],
              k = d[1];
            d = M(k);
            b[d] || (b[d] = {});
            b = b[d];
            c.Ue ||
              (Wl[f] &&
                K(
                  function (l, m) {
                    return l || !!m(a, k, g, h);
                  },
                  !1,
                  Wl[f]
                )) ||
              ("init" === f
                ? ((c.Ue = !0),
                  h
                    ? vb(
                        a,
                        "" + e,
                        "Duplicate counter " + e + " initialization"
                      )
                    : (a["yaCounter" + k.id] = new a.Ya[Ga.kc](z({}, g[0], k))))
                : h && h[f] && b.Oh
                ? (h[f].apply(h, g), (c.Ue = !0))
                : ((d = b.Yf),
                  d || ((d = []), (b.Yf = d)),
                  d.push(ra([e, f], g))));
          }
        }),
        Iv = rb("is", function (a) {
          if (!fb(a)) {
            var c = ec(a);
            if (Re(a, "0")) c.Eb("sup_debug");
            else {
              var b = Re(a, "2"),
                d = !!c.C("sup_debug");
              if (b || d)
                return (
                  (a._ym_debug = !0),
                  c.D("sup_debug", "1", 1440),
                  rc(a, { src: Bl + "/tag_debug.js" })
                );
            }
          }
        }),
        dm = B("destruct.e", function (a, c, b) {
          return function () {
            var d = H(a),
              e = c.id;
            y(function (f, g) {
              return T(f) && E(a, "dest.fr." + g, f)();
            }, b);
            delete d.C("counters")[M(c)];
            delete a["yaCounter" + e];
          };
        }),
        ed = H(window);
      ed.Na("hitParam", {});
      ed.Na("lastReferrer", window.location.href);
      (function () {
        W.push(function (a, c) {
          var b;
          return (
            (b = {}),
            (b.firstPartyParams = Ws(a, c)),
            (b.firstPartyParamsHashed = wq(a, c)),
            b
          );
        });
        Vd.push("fpp");
        Vd.push("fpmh");
      })();
      (function () {
        var a = H(window);
        a.Na("getCounters", Xs(window));
        fd.push(Ys);
        Pg.push(function (c, b) {
          b.counters = a.C("getCounters");
        });
      })();
      (function () {
        W.push(function (a, c) {
          var b;
          pb(
            a,
            ((b = {}),
            (b.counterKey = M(c)),
            (b.name = "counter"),
            (b.data = fk(c)),
            b)
          );
        });
      })();
      Ca["1"] = jb;
      W.push(Zs);
      ya["1"] = nc;
      tb(Yf, -1);
      Sb["1"] = [
        [Yf, -1],
        [Pe, 1],
        [Je, 2],
        [Lb(), 3],
      ];
      W.push($s);
      W.push(
        B("p.ar", function (a, c) {
          var b,
            d = ua(a, "a", c);
          return (
            (b = {}),
            (b.hit = function (e, f, g, h, k, l) {
              var m,
                p,
                q = { J: {}, K: Ja(((m = {}), (m.pv = 1), (m.ar = 1), m)) };
              if (e)
                return (
                  (f = va(f)
                    ? {
                        title: f.title,
                        Ef: f.referer,
                        R: f.params,
                        dc: f.callback,
                        l: f.ctx,
                      }
                    : { title: f, Ef: g, R: h, dc: k, l: l }),
                  (g = Ed(c)),
                  g.url !== e && ((g.ref = g.url), (g.url = e)),
                  (e = e || Q(a).href),
                  (g = f.Ef || g.ref || a.document.referrer),
                  (h = Kb(
                    a,
                    c,
                    "PageView. Counter " +
                      c.id +
                      ". URL: " +
                      e +
                      ". Referrer: " +
                      g,
                    f.R
                  )),
                  (k = z(q.M || {}, { R: f.R, title: f.title })),
                  (q = d(
                    z(q, {
                      M: k,
                      J: z(
                        q.J || {},
                        ((p = {}), (p["page-url"] = e), (p["page-ref"] = g), p)
                      ),
                    }),
                    c
                  ).then(h)),
                  Pc(a, "p.ar.s", q, f.dc || F, f.l)
                );
            }),
            b
          );
        })
      );
      Ca.a = jb;
      Sb.a = Tb;
      ya.a = kl;
      W.push(Ce);
      Ca.g = jb;
      ya.g = nc;
      Sb.g = Tb;
      W.push(at);
      W.push(bt);
      Sb.t = Tb;
      Ca.t = jb;
      ya.t = nc;
      W.push(
        B("cl.p", function (a, c) {
          function b(p, q, r, t) {
            void 0 === t && (t = {});
            r
              ? Ee(a, c, { url: r, mb: !0, Ec: p, Ic: q, sender: e, lg: t })
              : g.warn("Empty link");
          }
          var d,
            e = ua(a, "2", c),
            f = [],
            g = Xd(a, M(c)),
            h = M(c),
            k = E(a, "s.s.tr", v(Ie(a, h), oq));
          h = {
            l: a,
            bb: c,
            bh: f,
            sender: e,
            yj: H(a),
            Pg: Zc(a, c.id),
            Aj: wc(a),
            Wi: v(v(h, Ze(a)), w(ha, U("trackLinks"))),
          };
          h = E(a, "cl.p.c", v(h, lq));
          h = ea(a).F(a, ["click"], h);
          c.eg && k(c.eg);
          var l = E(a, "file.clc", C([!0, !1], b)),
            m = E(a, "e.l.l.clc", C([!1, !0], b));
          f = E(a, "add.f.e.clc", ct(f));
          return (
            (d = {}),
            (d.file = l),
            (d.extLink = m),
            (d.addFileExtension = f),
            (d.trackLinks = k),
            (d.u = h),
            d
          );
        })
      );
      Sb["2"] = Tb;
      Ca["2"] = jb;
      ya["2"] = nc;
      Ca.r = Nd("r");
      ya.r = kl;
      eb.push(
        B("p.r", function (a, c) {
          var b = et(a),
            d = ua(a, "r", c),
            e = E(a, "rts.p");
          return qa(
            c,
            C(
              [
                function (f, g) {
                  var h = { id: g.Og, ba: g.ba },
                    k = {
                      aa: { ca: g.zi },
                      K: Ja(g.Dg),
                      J: g.R,
                      M: { Sb: g.Sb },
                      ha: { Ca: g.Ca },
                    };
                  g.Ia && (k.Ia = nf(g.Ia));
                  h = d(k, h)["catch"](e);
                  return f.then(v(h, P));
                },
                J.resolve(),
                b,
              ],
              K
            )
          )["catch"](e);
        })
      );
      Z(
        "r",
        function (a) {
          return {
            N: function (c, b) {
              var d = c.K,
                e = void 0 === d ? Ja() : d,
                f = c.M.Sb,
                g = Dd(a);
              d = e.C("rqnl", 0) + 1;
              e.D("rqnl", d);
              if ((e = n(g, I(".", [f, "browserInfo"])))) (e.rqnl = d), Wf(a);
              b();
            },
            ra: function (c, b) {
              aj(a, c);
              b();
            },
          };
        },
        1
      );
      tb(De, 100);
      Z("1", De, 100);
      W.push(ft);
      Z("n", Pe, 1);
      Z("n", Je, 2);
      Z("n", Lb(), 3);
      Z("n", De, 100);
      Ca.n = jb;
      ya.n = nc;
      jc({ Me: { ea: "accurateTrackBounce" } });
      W.push(gt);
      Ca.m = Nd("cm");
      ya.m = Rs;
      Z("m", Lb(["u", "v", "vf"]), 1);
      Z("m", De, 2);
      jc({ Lg: { ea: "clickmap" } });
      W.push(ht);
      W.push(it);
      W.push(jt);
      W.push(kt);
      (function () {
        W.push(lt);
        Vd.push("ecommerce");
        jc({
          sd: {
            ea: "ecommerce",
            Ta: function (a) {
              if (a) return !0 === a ? "dataLayer" : "" + a;
            },
          },
        });
      })();
      W.push(mt);
      eb.push(ot);
      W.push(pt);
      Vd.push("user_id");
      eb.push(B("p.st", qt));
      W.push(rt);
      tb(function (a, c) {
        return {
          ra: function (b, d) {
            var e = Ea(a, c);
            e = e && e.userParams;
            var f = (b.M || {}).Fe;
            e && f && e(f);
            d();
          },
        };
      }, 0);
      ce.push(Us);
      mc.unshift(ut);
      Pd.push("_ym_debug");
      W.push(vt);
      mc.push(function (a) {
        var c = H(a);
        c.C("i") || (c.D("i", !0), ea(a).F(a, ["message"], v(a, Kp)));
      });
      (function () {
        var a,
          c = ((a = {}), (a.tp = w(cb, gk, Ib)), (a.tpid = w(cb, wr)), a);
        z(Jd, c);
      })();
      tb(yd, 20);
      Z("n", yd, 20);
      Z("1", yd, 20);
      mc.push(wt);
      W.push(function (a, c) {
        var b;
        return (
          (b = {}),
          (b.ecommerceAdd = B("ecm.a", xt(a, c))),
          (b.ecommerceRemove = B("ecm.r", yt(a, c))),
          (b.ecommerceDetail = B("ecm.d", zt(a, c))),
          (b.ecommercePurchase = B("ecm.p", At(a, c))),
          b
        );
      });
      (function () {
        var a,
          c = {};
        c.bu = Gt;
        c.pri = pp;
        c.wv = v(2, P);
        c.ds = sp;
        c.co = function (b) {
          return xb(H(b).C("jn"));
        };
        c.td = Mt;
        z(
          c,
          ((a = {}),
          (a.iss = w(vs, Ib)),
          (a.hdl = w(ws, Ib)),
          (a.iia = w(xs, Ib)),
          (a.cpf = w(Ft, Ib)),
          (a.ntf = x(function (b) {
            b = n(b, "Notification.permission");
            b = "denied" === b ? !1 : "granted" === b ? !0 : null;
            return Ta(b) ? null : b ? 2 : 1;
          })),
          (a.eu = oc("isEU")),
          (a.ns = yi),
          (a.np = function (b) {
            return Ua(b, 0, 100) ? null : gd(ge(nb(Of(b), 100)));
          }),
          a)
        );
        c.pani = Ht;
        c.pci = It;
        c.si = Jt;
        c.gi = Kt;
        z(Jd, c);
      })();
      (function () {
        var a = {};
        a.hc = oc("hc");
        a.oo = oc("oo");
        a.pmc = oc("cmc");
        a.lt = function (c) {
          var b = Rd(c).C("lt", null);
          return b ? c.Math.round(100 * b) : b;
        };
        a.re = w(Uq, Ib);
        a.aw = function (c) {
          c = ob(w(ka, Ac), [
            c.document.hidden,
            c.document.msHidden,
            c.document.webkitHidden,
          ]);
          return ka(c) ? null : xb(!c);
        };
        a.rcm = Pt;
        a.yu = function (c) {
          return (c = Ic(c, "").C("yandexuid")) && c.substring(0, 25);
        };
        a.ifc = oc("ifc");
        a.ifb = oc("ifb");
        a.ecs = oc("ecs");
        a.csi = oc("scip");
        z(fg, a);
      })();
      ya.er = ad;
      (function (a) {
        try {
          var c = Xg(a, "er"),
            b = lp(a, c);
          Xj.push(function (d, e, f, g) {
            var h, k, l, m, p;
            0.01 >= a.Math.random() ||
              b(
                ((h = {}),
                (h[d] =
                  ((k = {}),
                  (k[Ga.cc] =
                    ((l = {}),
                    (l[e] =
                      ((m = {}),
                      (m[f] = g
                        ? ((p = {}), (p[a.location.href] = g), p)
                        : a.location.href),
                      m)),
                    l)),
                  k)),
                h)
              );
          });
        } catch (d) {}
      })(window);
      (function () {
        ce.push(op);
        eg.unshift(kp);
        ah.push(function (a) {
          var c = void 0;
          void 0 === c && (c = !0);
          H(a).D("oo", c);
        });
      })();
      tb(function (a, c) {
        return {
          N: function (b, d) {
            var e = b.J,
              f = b.K;
            !yl[c.id] &&
              f.C("pv") &&
              c.exp &&
              !e.nohit &&
              ((e.exp = c.exp), (yl[c.id] = !0));
            d();
          },
        };
      }, -99);
      W.push(Qt);
      Sb.e = Tb;
      Ca.e = jb;
      ya.e = nc;
      jc({ exp: { ea: "experiments" } });
      rk.experiments = "ex";
      (function () {
        var a;
        jf.push(Rt);
        Ca.f = jb;
        z(ya, ((a = {}), (a.f = jl), a));
        Z("f", Lb(), 1);
        Z("f", uj, 2);
        Z("f", yd, 20);
      })();
      ce.push(function (a, c) {
        var b = { oa: M(c), md: Ea(a, c), dg: fa(a), Td: Oa(a) },
          d = b.dg(lb);
        if (!b.Td.Ld) {
          var e = b.Td.C("ymoo" + b.oa);
          if (e && 30 > d - e)
            (b = b.oa), delete H(a).C("counters", {})[b], Wa(Sa("uws"));
          else qa(c, St(b))["catch"](E(a, "d.f"));
        }
      });
      (function () {
        var a,
          c,
          b = [Cb];
        z(ya, ((a = {}), (a.s = b), (a.S = b), (a.u = ad), a));
        z(Ca, ((c = {}), (c.s = Ub), (c.S = jb), (c.u = Ub), c));
        Z("s");
        Z("u");
        Z("S", Lb(["v", "hid", "u", "vf", "rn"]), 1);
        W.push(B("s", Wo));
      })();
      Ca["8"] = Ub;
      ya["8"] = [dg];
      il.push([dg, 0]);
      W.push(
        B("p.us", function (a, c) {
          return qa(c, function (b) {
            if (n(b, "settings.sbp"))
              return si(a, b, { bb: c, Qb: "8", Rd: "cs" });
          });
        })
      );
      Z("p", Lb(bh), 1);
      Yc(
        "pub",
        function (a, c) {
          return {
            N: function (b, d) {
              fi(a, c, b);
              d();
            },
          };
        },
        1
      );
      Ca.p = Wt;
      ya.p = ta([Bb, Cb]);
      eb.push($t);
      jc({
        xb: { ea: "webvisor", Ta: Mb },
        Tg: { ea: "disableFormAnalytics", Ta: Mb },
      });
      Z("4", Lb(bh), 1);
      Ca["4"] = Cl;
      ya["4"] = ta([Bb, Cb, Sc]);
      eb.push(fu);
      (function () {
        Z("W", Lb(bh), 1);
        Yc("wv", ko, 1);
        ya.W = ta([Bb, Cb]);
        Ca.W = Cl;
        eb.push(Pu);
        W.push(Qu);
        jc({ xb: { ea: "webvisor" } });
        jc({ Yi: { ea: "trustedDomains" }, ic: { ea: "childIframe", Ta: Mb } });
        ah.push(function (a) {
          H(a).C("stopRecorder", F)();
        });
      })();
      W.push(Su);
      Z("pi");
      Ca.pi = Ub;
      ya.pi = ad;
      Yc(
        "w",
        function (a, c) {
          return {
            N: function (b, d) {
              if (b.K) {
                var e = zf(c),
                  f = e.status;
                "rt" === e.Qb &&
                  f &&
                  (b.K.D("rt", f),
                  b.ha || (b.ha = {}),
                  (b.ha.Kh = 1 === f ? Ph(a, c) + "." : ""));
              }
              d();
            },
          };
        },
        2
      );
      W.push(Uu);
      W.push(ev);
      ya["6"] = ta([Bb, Cb]);
      Ca["6"] = Ub;
      W.push(fv);
      W.push(Nt);
      (function () {
        Pg.push(function (a, c) {
          c.informer = rn(a);
        });
      })();
      tb(vf, 6);
      Z("1", vf, 6);
      Z("adb");
      Z("n", vf, 4);
      ya.adb = ad;
      Ca.adb = Kj;
      fd.push(hv);
      ya["5"] = nc;
      Ca["5"] = jb;
      Sb["5"] = la(w(Qc, xc([Pe, Je]), Ac), Tb);
      W.push(iv);
      Z("5", yd, 20);
      tb(Ih, 7);
      Z("n", Ih, 6);
      eb.push(jv);
      Ca.d = jb;
      Z("d", Lb(["hid", "u", "v", "vf"]), 1);
      ya.d = ad;
      Z(
        "n",
        function (a, c) {
          return {
            ra: function (b, d) {
              if (!b.M || !b.M.force) {
                var e = 0.002,
                  f = c.id === Ga.vg ? 1 : 0.002,
                  g,
                  h,
                  k,
                  l,
                  m;
                void 0 === e && (e = 1);
                void 0 === f && (f = 1);
                var p = vd(a);
                if (
                  p &&
                  T(p.getEntriesByType) &&
                  ((e = Math.random() > e), (f = Math.random() > f), !e || !f)
                ) {
                  p = p.getEntriesByType("resource");
                  for (
                    var q = {}, r = {}, t = {}, u = xl(), D = Q(a).href, O = 0;
                    O < p.length;
                    O += 1
                  ) {
                    var N = p[O],
                      ia = N.name.replace(wl, "").split("?")[0],
                      wa = bc(ia),
                      Ab =
                        ((g = {}),
                        (g.dns = Math.round(
                          N.domainLookupEnd - N.domainLookupStart
                        )),
                        (g.tcp = Math.round(N.connectEnd - N.connectStart)),
                        (g.duration = Math.round(N.duration)),
                        (g.response = Math.round(
                          N.responseEnd - N.requestStart
                        )),
                        g);
                    "script" !== N.initiatorType ||
                      e ||
                      (r[ia] = z(
                        Ab,
                        ((h = {}),
                        (h.name = N.name),
                        (h.decodedBodySize = N.decodedBodySize),
                        (h.transferSize = Math.round(N.transferSize)),
                        h)
                      ));
                    (!Ot[wa] && !u[wa]) ||
                      q[ia] ||
                      f ||
                      (q[ia] = z(Ab, ((k = {}), (k.pages = D), k)));
                  }
                  ca(q).length && (t.timings8 = q);
                  ca(r).length && (t.scripts = r);
                  if (ca(t).length)
                    ua(
                      a,
                      "d",
                      c
                    )(
                      {
                        K: Ja(((l = {}), (l.ar = 1), (l.pv = 1), l)),
                        aa: { ca: mb(a, t) || void 0 },
                        J: ((m = {}), (m["page-url"] = D), m),
                      },
                      { id: Ga.yg, ba: "0" }
                    )["catch"](E(a, "r.tim.ng2"));
                }
              }
              d();
            },
          };
        },
        7
      );
      ya.ci = [Cb];
      Ca.ci = Ub;
      eb.push(
        B("p.sci", function (a, c) {
          return qa(c, v(a, pn))["catch"](E(a, "ins.cs"));
        })
      );
      W.push(kv);
      eb.push(Et);
      W.push(pv);
      tb(kh, 8);
      Z("f", kh, 3);
      Z("n", kh, 5);
      fd.push(
        (function (a) {
          return B("fip", function (c) {
            if (!sl(c) || Qd(c)) {
              var b = Oa(c);
              if (!b.C("fip")) {
                var d = w(
                  zb(
                    w(function (e, f) {
                      return B("fip." + f, e)(c);
                    }, G(Wr, null))
                  ),
                  wd("-")
                )(a);
                b.D("fip", d);
              }
            }
          });
        })([
          rv,
          qv,
          function (a) {
            var c = n(a, "ApplePaySession"),
              b = Q(a).protocol;
            a = c && "https:" === b && !fb(a) ? c : void 0;
            c = "";
            if (!a) return c;
            try {
              c = "" + a.canMakePayments();
              b = "";
              var d = a.supportsVersion;
              if (T(d))
                for (var e = 1; 20 >= e; e += 1)
                  b += d.call(a, e) ? "" + e : "0";
              return b + c;
            } catch (f) {
              return c;
            }
          },
          function (a) {
            a = n(a, "navigator") || {};
            return a.doNotTrack || a.msDoNotTrack || "unknown";
          },
          function (a) {
            if ((a = Dt(a)))
              try {
                for (var c = [], b = 0; b < tl.length; b += 1) {
                  var d = a(tl[b]);
                  c.push(d);
                }
                var e = c;
              } catch (f) {
                e = [];
              }
            else e = [];
            return e ? I("x", e) : "";
          },
          function (a) {
            var c = void 0;
            void 0 === c && (c = nv);
            var b = n(a, "navigator") || {};
            c = A(v(b, n), c);
            c = I("x", c);
            try {
              var d = n(a, "navigator.getGamepads");
              var e = (na(d, "getGamepads") && a.navigator.getGamepads()) || [];
            } catch (f) {
              e = [];
            }
            return c + "x" + Qa(e);
          },
          lv,
          function (a) {
            a = n(a, "screen") || {};
            return I("x", A(v(a, n), mv));
          },
          function (a) {
            return I("x", Um(a) || []);
          },
          function (a) {
            a = kn(a);
            return da(a) ? I("x", a) : a;
          },
          function (a) {
            return (a = mn(a))
              ? I("x", A(C(["", ["matches", "media"]], Wm), ta(ms(a))))
              : "";
          },
        ])
      );
      tb(function (a) {
        return {
          N: function (c, b) {
            var d = c.K,
              e = Oa(a).C("fip");
            e && d && (d.D("fip", e), je(c, "fip", xb(e)));
            b();
          },
        };
      }, 9);
      Z(
        "h",
        function (a) {
          return {
            ra: function (c, b) {
              var d = c.Ei;
              Qf(c) && d && H(a).D("isEU", n(d, "settings.eu"));
              b();
            },
          };
        },
        3
      );
      fd.push(Ou);
      mc.push(sv);
      eb.push(xv);
      W.push(yv);
      jc({ hj: { ea: "yaDisableGDPR" }, ij: { ea: "yaGDPRLang" } });
      eg.push(function (a, c) {
        return { N: C([a, c], Hm) };
      });
      Pd.push("gdpr");
      Pd.push("gdpr_popup");
      ug.push(function (a, c) {
        var b = ie(a);
        b = kf(b);
        if (la(xc(Bv), b).length) return !0;
        b = c(a, "gdpr");
        return L(b, [Jc, Av]);
      });
      tb(Vl, 5);
      Z("1", Vl, 6);
      ya.c = ad;
      Ca.c = Ub;
      Yc("w", ff, 3);
      Yc("cm", ff, 1);
      Yc("wv", ff, 1);
      Z("1", rh, 7);
      tb(rh, 7);
      mc.push(B("hcp", ph));
      eb.push(B("p.ot", Fv));
      eb.push(Gv);
      Z(
        "n",
        function (a) {
          var c = H(a);
          return {
            N: function (b, d) {
              var e = b.M || {},
                f = c.C("cta"),
                g = c.C("cta.e");
              if (f || g) {
                e.R || (e.R = {});
                e.R.__ym || (e.R.__ym = {});
                var h = {};
                f
                  ? ((f = A(function (k) {
                      var l,
                        m = n(k, "topic");
                      k = n(k, "version");
                      return (l = {}), (l.topic = m), (l.version = k), l;
                    }, f)),
                    (h.ct = f))
                  : g && (h["ct.e"] = g);
                z(e.R.__ym, h);
                b.M = z(b.M || {}, e);
              }
              d();
            },
          };
        },
        7
      );
      Z("n", Yf, 8);
      W.push(Hv);
      W.push(function (a, c) {
        var b = Xl(a),
          d = M(c),
          e = b[d];
        e || ((e = {}), (b[d] = e));
        e.Oh = !0;
        if ((b = e.Yf)) (d = Yl(a)), y(d, b);
      });
      mc.push(function (a) {
        var c = n(a, "ym");
        if (c) {
          var b = n(c, "a");
          b || ((c.a = []), (b = c.a));
          var d = Yl(a);
          Ge(
            a,
            b,
            function (e) {
              e.Aa.F(d);
            },
            !0
          );
        }
      });
      Pd.push("_ym_sup_debug");
      mc.unshift(Iv);
      if (window.Ya && cf) {
        var Zl = Ga.kc;
        window.Ya[Zl] = cf;
        Vs(window);
        y(w(Tc([window, window.Ya[Zl]]), ha), Pg);
      }
      y(w(Tc([window]), ha), mc);
    })();
  } catch (cf) {}
}).call(this);
