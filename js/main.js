(this.wordle = this.wordle || {}),
  (this.wordle.bundle = (function (t) {
    "use strict";
    function e(t) {
      return (e =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                "function" == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            })(t);
    }
    function n(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function o(t, e) {
      for (var n = 0; n < e.length; n++) {
        var o = e[n];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          "value" in o && (o.writable = !0),
          Object.defineProperty(t, o.key, o);
      }
    }
    function a(t, e, n) {
      return e && o(t.prototype, e), n && o(t, n), t;
    }
    function r(t, e, n) {
      return (
        e in t
          ? Object.defineProperty(t, e, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (t[e] = n),
        t
      );
    }
    function i(t, e) {
      if ("function" != typeof e && null !== e)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        e && l(t, e);
    }
    function s(t) {
      return (s = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function l(t, e) {
      return (l =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    function c() {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        );
      } catch (t) {
        return !1;
      }
    }
    function d(t, e, n) {
      return (d = c()
        ? Reflect.construct
        : function (t, e, n) {
            var o = [null];
            o.push.apply(o, e);
            var a = new (Function.bind.apply(t, o))();
            return n && l(a, n.prototype), a;
          }).apply(null, arguments);
    }
    function u(t) {
      var e = "function" == typeof Map ? new Map() : void 0;
      return (u = function (t) {
        if (
          null === t ||
          ((n = t), -1 === Function.toString.call(n).indexOf("[native code]"))
        )
          return t;
        var n;
        if ("function" != typeof t)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        if (void 0 !== e) {
          if (e.has(t)) return e.get(t);
          e.set(t, o);
        }
        function o() {
          return d(t, arguments, s(this).constructor);
        }
        return (
          (o.prototype = Object.create(t.prototype, {
            constructor: {
              value: o,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
          l(o, t)
        );
      })(t);
    }
    function h(t) {
      if (void 0 === t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return t;
    }
    function p(t) {
      var e = c();
      return function () {
        var n,
          o = s(t);
        if (e) {
          var a = s(this).constructor;
          n = Reflect.construct(o, arguments, a);
        } else n = o.apply(this, arguments);
        return (function (t, e) {
          return !e || ("object" != typeof e && "function" != typeof e)
            ? h(t)
            : e;
        })(this, n);
      };
    }
    function m(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) return f(t);
        })(t) ||
        (function (t) {
          if (
            ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
            null != t["@@iterator"]
          )
            return Array.from(t);
        })(t) ||
        v(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function v(t, e) {
      if (t) {
        if ("string" == typeof t) return f(t, e);
        var n = Object.prototype.toString.call(t).slice(8, -1);
        return (
          "Object" === n && t.constructor && (n = t.constructor.name),
          "Map" === n || "Set" === n
            ? Array.from(t)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? f(t, e)
            : void 0
        );
      }
    }
    function f(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, o = new Array(e); n < e; n++) o[n] = t[n];
      return o;
    }
    var g = new Date(2021, 5, 19, 0, 0, 0, 0);
    g.setDate(
      g.getDate() +
        (JSON.parse(window.localStorage.getItem("puzzle")) ||
          Math.round(Math.abs(new Date().setHours(0, 0, 0, 0) - g) / 864e5))
    );
    var b = document.createElement("template");
    b.innerHTML =
      "\n<style>\n  :host {\n    display: inline-block;\n  }\n  .tile {\n    width: 100%;\n    display: inline-flex;\n    justify-content: center;\n    align-items: center;\n    font-size: 2rem;\n    line-height: 2rem;\n    font-weight: bold;\n    vertical-align: middle;\n    box-sizing: border-box;\n    color: var(--tile-text-color);\n    text-transform: uppercase;\n    user-select: none;\n  }\n  .tile::before {\n    content: '';\n    display: inline-block;\n    padding-bottom: 100%;\n  }\n\n  /* Allow tiles to be smaller on small screens */\n  @media (max-height: 600px) {\n    .tile {\n      font-size: 1em;\n      line-height: 1em;\n    }\n  }\n\n  .tile[data-state='empty'] {\n    border: 2px solid var(--color-tone-4);\n  }\n  .tile[data-state='tbd'] {\n    background-color: var(--color-tone-7);\n    border: 2px solid var(--color-tone-3);\n    color: var(--color-tone-1);\n  }\n  .tile[data-state='correct'] {\n    background-color: var(--color-correct);\n  }\n  .tile[data-state='present'] {\n    background-color: var(--color-present);\n  }\n  .tile[data-state='absent'] {\n    background-color: var(--color-absent);\n  }\n\n  .tile[data-animation='pop'] {\n    animation-name: PopIn;\n    animation-duration: 100ms;\n  }\n\n  @keyframes PopIn {\n    from {\n      transform: scale(0.8);\n      opacity: 0;\n    }\n\n    40% {\n      transform: scale(1.1);\n      opacity: 1;\n    }\n  }\n  .tile[data-animation='flip-in'] {\n    animation-name: FlipIn;\n    animation-duration: 250ms;\n    animation-timing-function: ease-in;\n  }\n  @keyframes FlipIn {\n    0% {\n      transform: rotateX(0);\n    }\n    100% {\n      transform: rotateX(-90deg);\n    }\n  }\n  .tile[data-animation='flip-out'] {\n    animation-name: FlipOut;\n    animation-duration: 250ms;\n    animation-timing-function: ease-in;\n  }\n  @keyframes FlipOut {\n    0% {\n      transform: rotateX(-90deg);\n    }\n    100% {\n      transform: rotateX(0);\n    }\n  }\n</style>\n<div class=\"tile\" data-state=\"empty\" data-animation=\"idle\"></div>\n";
    var y = (function (t) {
      i(o, u(HTMLElement));
      var e = p(o);
      function o() {
        var t;
        return (
          n(this, o),
          r(h((t = e.call(this))), "_letter", ""),
          r(h(t), "_state", "empty"),
          r(h(t), "_animation", "idle"),
          r(h(t), "_last", !1),
          r(h(t), "_reveal", !1),
          t.attachShadow({ mode: "open" }),
          t
        );
      }
      return (
        a(
          o,
          [
            {
              key: "last",
              set: function (t) {
                this._last = t;
              },
            },
            {
              key: "connectedCallback",
              value: function () {
                var t = this;
                this.shadowRoot.appendChild(b.content.cloneNode(!0)),
                  (this.$tile = this.shadowRoot.querySelector(".tile")),
                  this.$tile.addEventListener("animationend", function (e) {
                    "PopIn" === e.animationName && (t._animation = "idle"),
                      "FlipIn" === e.animationName &&
                        ((t.$tile.dataset.state = t._state),
                        (t._animation = "flip-out")),
                      "FlipOut" === e.animationName &&
                        ((t._animation = "idle"),
                        t._last &&
                          t.dispatchEvent(
                            new CustomEvent("game-last-tile-revealed-in-row", {
                              bubbles: !0,
                              composed: !0,
                            })
                          )),
                      t._render();
                  }),
                  this._render();
              },
            },
            {
              key: "attributeChangedCallback",
              value: function (t, e, n) {
                switch (t) {
                  case "letter":
                    if (n === e) break;
                    var o = "null" === n ? "" : n;
                    (this._letter = o),
                      (this._state = o ? "tbd" : "empty"),
                      (this._animation = o ? "pop" : "idle");
                    break;
                  case "evaluation":
                    if (!n) break;
                    this._state = n;
                    break;
                  case "reveal":
                    (this._animation = "flip-in"), (this._reveal = !0);
                }
                this._render();
              },
            },
            {
              key: "_render",
              value: function () {
                this.$tile &&
                  ((this.$tile.textContent = this._letter),
                  ["empty", "tbd"].includes(this._state) &&
                    (this.$tile.dataset.state = this._state),
                  (["empty", "tbd"].includes(this._state) || this._reveal) &&
                    this.$tile.dataset.animation != this._animation &&
                    (this.$tile.dataset.animation = this._animation));
              },
            },
          ],
          [
            {
              key: "observedAttributes",
              get: function () {
                return ["letter", "evaluation", "reveal"];
              },
            },
          ]
        ),
        o
      );
    })();
    customElements.define("game-tile", y);
    var w = document.createElement("template");
    w.innerHTML =
      '\n  <style>\n    :host {\n      display: block;\n    }\n    :host([invalid]){\n      animation-name: Shake;\n      animation-duration: 600ms;\n    }\n    .row {\n      display: grid;\n      grid-template-columns: repeat(5, 1fr);\n      grid-gap: 5px;\n    }\n    .win {\n      animation-name: Bounce;\n      animation-duration: 1000ms;\n    }\n\n    @keyframes Bounce {\n      0%, 20% {\n        transform: translateY(0);\n      }\n      40% {\n        transform: translateY(-30px);\n      }\n      50% {\n        transform: translateY(5px);\n      }\n      60% {\n        transform: translateY(-15px);\n      }\n      80% {\n        transform: translateY(2px);\n      }\n      100% {\n        transform: translateY(0);\n      }\n    }\n\n    @keyframes Shake {\n      10%,\n      90% {\n        transform: translateX(-1px);\n      }\n\n      20%,\n      80% {\n        transform: translateX(2px);\n      }\n\n      30%,\n      50%,\n      70% {\n        transform: translateX(-4px);\n      }\n\n      40%,\n      60% {\n        transform: translateX(4px);\n      }\n    }\n  </style>\n  <div class="row"></div>\n';
    var x = (function (t) {
      i(o, u(HTMLElement));
      var e = p(o);
      function o() {
        var t;
        return (
          n(this, o),
          (t = e.call(this)).attachShadow({ mode: "open" }),
          (t._letters = ""),
          (t._evaluation = []),
          t._length,
          t
        );
      }
      return (
        a(
          o,
          [
            {
              key: "evaluation",
              get: function () {
                return this._evaluation;
              },
              set: function (t) {
                var e = this;
                (this._evaluation = t),
                  this.$tiles &&
                    this.$tiles.forEach(function (t, n) {
                      t.setAttribute("evaluation", e._evaluation[n]),
                        setTimeout(function () {
                          t.setAttribute("reveal", "");
                        }, 300 * n);
                    });
              },
            },
            {
              key: "connectedCallback",
              value: function () {
                var t = this;
                this.shadowRoot.appendChild(w.content.cloneNode(!0)),
                  (this.$row = this.shadowRoot.querySelector(".row"));
                for (
                  var e = function (e) {
                      var n = document.createElement("game-tile"),
                        o = t._letters[e];
                      o && n.setAttribute("letter", o),
                        t._evaluation[e] &&
                          (n.setAttribute("evaluation", t._evaluation[e]),
                          setTimeout(function () {
                            n.setAttribute("reveal", "");
                          }, 100 * e)),
                        e === t._length - 1 && (n.last = !0),
                        t.$row.appendChild(n);
                    },
                    n = 0;
                  n < this._length;
                  n++
                )
                  e(n);
                (this.$tiles = this.shadowRoot.querySelectorAll("game-tile")),
                  this.addEventListener("animationend", function (e) {
                    "Shake" === e.animationName && t.removeAttribute("invalid");
                  });
              },
            },
            {
              key: "attributeChangedCallback",
              value: function (t, e, n) {
                switch (t) {
                  case "letters":
                    this._letters = n || "";
                    break;
                  case "length":
                    this._length = parseInt(n, 10);
                    break;
                  case "win":
                    if (null === n) {
                      this.$tiles.forEach(function (t) {
                        t.classList.remove("win");
                      });
                      break;
                    }
                    this.$tiles.forEach(function (t, e) {
                      t.classList.add("win"),
                        (t.style.animationDelay = "".concat(100 * e, "ms"));
                    });
                }
                this._render();
              },
            },
            {
              key: "_render",
              value: function () {
                var t = this;
                this.$row &&
                  this.$tiles.forEach(function (e, n) {
                    var o = t._letters[n];
                    o
                      ? e.setAttribute("letter", o)
                      : e.removeAttribute("letter");
                  });
              },
            },
          ],
          [
            {
              key: "observedAttributes",
              get: function () {
                return ["letters", "length", "invalid", "win"];
              },
            },
          ]
        ),
        o
      );
    })();
    customElements.define("game-row", x);
    var k = document.createElement("template");
    k.innerHTML = "\n  <slot></slot>\n";
    var S = "darkTheme",
      _ = "colorBlindTheme",
      E = (function (t) {
        i(o, u(HTMLElement));
        var e = p(o);
        function o() {
          var t;
          n(this, o),
            r(h((t = e.call(this))), "isDarkTheme", !1),
            r(h(t), "isColorBlindTheme", !1),
            t.attachShadow({ mode: "open" });
          var a = JSON.parse(window.localStorage.getItem(S)),
            i = window.matchMedia("(prefers-color-scheme: dark)").matches,
            s = JSON.parse(window.localStorage.getItem(_));
          return (
            !0 === a || !1 === a ? t.setDarkTheme(a) : i && t.setDarkTheme(!0),
            (!0 !== s && !1 !== s) || t.setColorBlindTheme(s),
            t
          );
        }
        return (
          a(o, [
            {
              key: "setDarkTheme",
              value: function (t) {
                var e = document.querySelector("body");
                t && !e.classList.contains("nightmode")
                  ? e.classList.add("nightmode")
                  : e.classList.remove("nightmode"),
                  (this.isDarkTheme = t),
                  window.localStorage.setItem(S, JSON.stringify(t));
              },
            },
            {
              key: "setColorBlindTheme",
              value: function (t) {
                var e = document.querySelector("body");
                t && !e.classList.contains("colorblind")
                  ? e.classList.add("colorblind")
                  : e.classList.remove("colorblind"),
                  (this.isColorBlindTheme = t),
                  window.localStorage.setItem(_, JSON.stringify(t));
              },
            },
            {
              key: "connectedCallback",
              value: function () {
                var t = this;
                this.shadowRoot.appendChild(k.content.cloneNode(!0)),
                  this.shadowRoot.addEventListener(
                    "game-setting-change",
                    function (e) {
                      var n = e.detail,
                        o = n.name,
                        a = n.checked;
                      switch (o) {
                        case "dark-theme":
                          return void t.setDarkTheme(a);
                        case "color-blind-theme":
                          return void t.setColorBlindTheme(a);
                      }
                    }
                  );
              },
            },
          ]),
          o
        );
      })();
    function A(t, e) {
      return t === e || (t != t && e != e);
    }
    function I(t, e) {
      for (var n = t.length; n--; ) if (A(t[n][0], e)) return n;
      return -1;
    }
    customElements.define("game-theme-manager", E);
    var L = Array.prototype.splice;
    function j(t) {
      var e = -1,
        n = null == t ? 0 : t.length;
      for (this.clear(); ++e < n; ) {
        var o = t[e];
        this.set(o[0], o[1]);
      }
    }
    (j.prototype.clear = function () {
      (this.__data__ = []), (this.size = 0);
    }),
      (j.prototype.delete = function (t) {
        var e = this.__data__,
          n = I(e, t);
        return !(
          n < 0 ||
          (n == e.length - 1 ? e.pop() : L.call(e, n, 1), --this.size, 0)
        );
      }),
      (j.prototype.get = function (t) {
        var e = this.__data__,
          n = I(e, t);
        return n < 0 ? void 0 : e[n][1];
      }),
      (j.prototype.has = function (t) {
        return I(this.__data__, t) > -1;
      }),
      (j.prototype.set = function (t, e) {
        var n = this.__data__,
          o = I(n, t);
        return o < 0 ? (++this.size, n.push([t, e])) : (n[o][1] = e), this;
      });
    var C =
        "object" == ("undefined" == typeof global ? "undefined" : e(global)) &&
        global &&
        global.Object === Object &&
        global,
      T =
        "object" == ("undefined" == typeof self ? "undefined" : e(self)) &&
        self &&
        self.Object === Object &&
        self,
      z = C || T || Function("return this")(),
      M = z.Symbol,
      O = Object.prototype,
      R = O.hasOwnProperty,
      q = O.toString,
      N = M ? M.toStringTag : void 0,
      H = Object.prototype.toString,
      $ = M ? M.toStringTag : void 0;
    function P(t) {
      return null == t
        ? void 0 === t
          ? "[object Undefined]"
          : "[object Null]"
        : $ && $ in Object(t)
        ? (function (t) {
            var e = R.call(t, N),
              n = t[N];
            try {
              t[N] = void 0;
              var o = !0;
            } catch (t) {}
            var a = q.call(t);
            return o && (e ? (t[N] = n) : delete t[N]), a;
          })(t)
        : (function (t) {
            return H.call(t);
          })(t);
    }
    function D(t) {
      var n = e(t);
      return null != t && ("object" == n || "function" == n);
    }
    function B(t) {
      if (!D(t)) return !1;
      var e = P(t);
      return (
        "[object Function]" == e ||
        "[object GeneratorFunction]" == e ||
        "[object AsyncFunction]" == e ||
        "[object Proxy]" == e
      );
    }
    var G,
      F = z["__core-js_shared__"],
      J = (G = /[^.]+$/.exec((F && F.keys && F.keys.IE_PROTO) || ""))
        ? "Symbol(src)_1." + G
        : "",
      W = Function.prototype.toString,
      Y = /^\[object .+?Constructor\]$/,
      U = Function.prototype,
      X = Object.prototype,
      V = U.toString,
      K = X.hasOwnProperty,
      Q = RegExp(
        "^" +
          V.call(K)
            .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?"
            ) +
          "$"
      );
    function Z(t, e) {
      var n = (function (t, e) {
        return null == t ? void 0 : t[e];
      })(t, e);
      return (function (t) {
        return (
          !(!D(t) || ((e = t), J && J in e)) &&
          (B(t) ? Q : Y).test(
            (function (t) {
              if (null != t) {
                try {
                  return W.call(t);
                } catch (t) {}
                try {
                  return t + "";
                } catch (t) {}
              }
              return "";
            })(t)
          )
        );
        var e;
      })(n)
        ? n
        : void 0;
    }
    var tt = Z(z, "Map"),
      et = Z(Object, "create"),
      nt = Object.prototype.hasOwnProperty,
      ot = Object.prototype.hasOwnProperty;
    function at(t) {
      var e = -1,
        n = null == t ? 0 : t.length;
      for (this.clear(); ++e < n; ) {
        var o = t[e];
        this.set(o[0], o[1]);
      }
    }
    function rt(t, n) {
      var o,
        a,
        r = t.__data__;
      return (
        "string" == (a = e((o = n))) ||
        "number" == a ||
        "symbol" == a ||
        "boolean" == a
          ? "__proto__" !== o
          : null === o
      )
        ? r["string" == typeof n ? "string" : "hash"]
        : r.map;
    }
    function it(t) {
      var e = -1,
        n = null == t ? 0 : t.length;
      for (this.clear(); ++e < n; ) {
        var o = t[e];
        this.set(o[0], o[1]);
      }
    }
    function st(t) {
      var e = (this.__data__ = new j(t));
      this.size = e.size;
    }
    (at.prototype.clear = function () {
      (this.__data__ = et ? et(null) : {}), (this.size = 0);
    }),
      (at.prototype.delete = function (t) {
        var e = this.has(t) && delete this.__data__[t];
        return (this.size -= e ? 1 : 0), e;
      }),
      (at.prototype.get = function (t) {
        var e = this.__data__;
        if (et) {
          var n = e[t];
          return "__lodash_hash_undefined__" === n ? void 0 : n;
        }
        return nt.call(e, t) ? e[t] : void 0;
      }),
      (at.prototype.has = function (t) {
        var e = this.__data__;
        return et ? void 0 !== e[t] : ot.call(e, t);
      }),
      (at.prototype.set = function (t, e) {
        var n = this.__data__;
        return (
          (this.size += this.has(t) ? 0 : 1),
          (n[t] = et && void 0 === e ? "__lodash_hash_undefined__" : e),
          this
        );
      }),
      (it.prototype.clear = function () {
        (this.size = 0),
          (this.__data__ = {
            hash: new at(),
            map: new (tt || j)(),
            string: new at(),
          });
      }),
      (it.prototype.delete = function (t) {
        var e = rt(this, t).delete(t);
        return (this.size -= e ? 1 : 0), e;
      }),
      (it.prototype.get = function (t) {
        return rt(this, t).get(t);
      }),
      (it.prototype.has = function (t) {
        return rt(this, t).has(t);
      }),
      (it.prototype.set = function (t, e) {
        var n = rt(this, t),
          o = n.size;
        return n.set(t, e), (this.size += n.size == o ? 0 : 1), this;
      }),
      (st.prototype.clear = function () {
        (this.__data__ = new j()), (this.size = 0);
      }),
      (st.prototype.delete = function (t) {
        var e = this.__data__,
          n = e.delete(t);
        return (this.size = e.size), n;
      }),
      (st.prototype.get = function (t) {
        return this.__data__.get(t);
      }),
      (st.prototype.has = function (t) {
        return this.__data__.has(t);
      }),
      (st.prototype.set = function (t, e) {
        var n = this.__data__;
        if (n instanceof j) {
          var o = n.__data__;
          if (!tt || o.length < 199)
            return o.push([t, e]), (this.size = ++n.size), this;
          n = this.__data__ = new it(o);
        }
        return n.set(t, e), (this.size = n.size), this;
      });
    var lt = (function () {
      try {
        var t = Z(Object, "defineProperty");
        return t({}, "", {}), t;
      } catch (t) {}
    })();
    function ct(t, e, n) {
      "__proto__" == e && lt
        ? lt(t, e, { configurable: !0, enumerable: !0, value: n, writable: !0 })
        : (t[e] = n);
    }
    function dt(t, e, n) {
      ((void 0 !== n && !A(t[e], n)) || (void 0 === n && !(e in t))) &&
        ct(t, e, n);
    }
    var ut,
      ht,
      pt = function (t, e, n) {
        for (var o = -1, a = Object(t), r = n(t), i = r.length; i--; ) {
          var s = r[++o];
          if (!1 === e(a[s], s, a)) break;
        }
        return t;
      },
      mt =
        "object" == (void 0 === t ? "undefined" : e(t)) &&
        t &&
        !t.nodeType &&
        t,
      vt =
        mt &&
        "object" == ("undefined" == typeof module ? "undefined" : e(module)) &&
        module &&
        !module.nodeType &&
        module,
      ft = vt && vt.exports === mt ? z.Buffer : void 0,
      gt = (ft && ft.allocUnsafe, z.Uint8Array),
      bt = Object.create,
      yt = (function () {
        function t() {}
        return function (e) {
          if (!D(e)) return {};
          if (bt) return bt(e);
          t.prototype = e;
          var n = new t();
          return (t.prototype = void 0), n;
        };
      })(),
      wt =
        ((ut = Object.getPrototypeOf),
        (ht = Object),
        function (t) {
          return ut(ht(t));
        }),
      xt = Object.prototype;
    function kt(t) {
      var e = t && t.constructor;
      return t === (("function" == typeof e && e.prototype) || xt);
    }
    function St(t) {
      return null != t && "object" == e(t);
    }
    function _t(t) {
      return St(t) && "[object Arguments]" == P(t);
    }
    var Et = Object.prototype,
      At = Et.hasOwnProperty,
      It = Et.propertyIsEnumerable,
      Lt = _t(
        (function () {
          return arguments;
        })()
      )
        ? _t
        : function (t) {
            return St(t) && At.call(t, "callee") && !It.call(t, "callee");
          },
      jt = Array.isArray;
    function Ct(t) {
      return (
        "number" == typeof t && t > -1 && t % 1 == 0 && t <= 9007199254740991
      );
    }
    function Tt(t) {
      return null != t && Ct(t.length) && !B(t);
    }
    var zt =
        "object" == (void 0 === t ? "undefined" : e(t)) &&
        t &&
        !t.nodeType &&
        t,
      Mt =
        zt &&
        "object" == ("undefined" == typeof module ? "undefined" : e(module)) &&
        module &&
        !module.nodeType &&
        module,
      Ot = Mt && Mt.exports === zt ? z.Buffer : void 0,
      Rt =
        (Ot ? Ot.isBuffer : void 0) ||
        function () {
          return !1;
        },
      qt = Function.prototype,
      Nt = Object.prototype,
      Ht = qt.toString,
      $t = Nt.hasOwnProperty,
      Pt = Ht.call(Object),
      Dt = {};
    (Dt["[object Float32Array]"] =
      Dt["[object Float64Array]"] =
      Dt["[object Int8Array]"] =
      Dt["[object Int16Array]"] =
      Dt["[object Int32Array]"] =
      Dt["[object Uint8Array]"] =
      Dt["[object Uint8ClampedArray]"] =
      Dt["[object Uint16Array]"] =
      Dt["[object Uint32Array]"] =
        !0),
      (Dt["[object Arguments]"] =
        Dt["[object Array]"] =
        Dt["[object ArrayBuffer]"] =
        Dt["[object Boolean]"] =
        Dt["[object DataView]"] =
        Dt["[object Date]"] =
        Dt["[object Error]"] =
        Dt["[object Function]"] =
        Dt["[object Map]"] =
        Dt["[object Number]"] =
        Dt["[object Object]"] =
        Dt["[object RegExp]"] =
        Dt["[object Set]"] =
        Dt["[object String]"] =
        Dt["[object WeakMap]"] =
          !1);
    var Bt =
        "object" == (void 0 === t ? "undefined" : e(t)) &&
        t &&
        !t.nodeType &&
        t,
      Gt =
        Bt &&
        "object" == ("undefined" == typeof module ? "undefined" : e(module)) &&
        module &&
        !module.nodeType &&
        module,
      Ft = Gt && Gt.exports === Bt && C.process,
      Jt = (function () {
        try {
          return (
            (Gt && Gt.require && Gt.require("util").types) ||
            (Ft && Ft.binding && Ft.binding("util"))
          );
        } catch (t) {}
      })(),
      Wt = Jt && Jt.isTypedArray,
      Yt = Wt
        ? (function (t) {
            return function (e) {
              return t(e);
            };
          })(Wt)
        : function (t) {
            return St(t) && Ct(t.length) && !!Dt[P(t)];
          };
    function Ut(t, e) {
      if (
        ("constructor" !== e || "function" != typeof t[e]) &&
        "__proto__" != e
      )
        return t[e];
    }
    var Xt = Object.prototype.hasOwnProperty;
    function Vt(t, e, n) {
      var o = t[e];
      (Xt.call(t, e) && A(o, n) && (void 0 !== n || e in t)) || ct(t, e, n);
    }
    var Kt = /^(?:0|[1-9]\d*)$/;
    function Qt(t, n) {
      var o = e(t);
      return (
        !!(n = null == n ? 9007199254740991 : n) &&
        ("number" == o || ("symbol" != o && Kt.test(t))) &&
        t > -1 &&
        t % 1 == 0 &&
        t < n
      );
    }
    Object.prototype.hasOwnProperty;
    var Zt = Object.prototype.hasOwnProperty;
    function te(t) {
      return Tt(t)
        ? (function (t, e) {
            var n = jt(t),
              o = !n && Lt(t),
              a = !n && !o && Rt(t),
              r = !n && !o && !a && Yt(t),
              i = n || o || a || r,
              s = i
                ? (function (t, e) {
                    for (var n = -1, o = Array(t); ++n < t; ) o[n] = e(n);
                    return o;
                  })(t.length, String)
                : [],
              l = s.length;
            for (var c in t)
              (i &&
                ("length" == c ||
                  (a && ("offset" == c || "parent" == c)) ||
                  (r &&
                    ("buffer" == c ||
                      "byteLength" == c ||
                      "byteOffset" == c)) ||
                  Qt(c, l))) ||
                s.push(c);
            return s;
          })(t)
        : (function (t) {
            if (!D(t))
              return (function (t) {
                var e = [];
                if (null != t) for (var n in Object(t)) e.push(n);
                return e;
              })(t);
            var e = kt(t),
              n = [];
            for (var o in t)
              ("constructor" != o || (!e && Zt.call(t, o))) && n.push(o);
            return n;
          })(t);
    }
    function ee(t, e, n, o, a) {
      t !== e &&
        pt(
          e,
          function (r, i) {
            if ((a || (a = new st()), D(r)))
              !(function (t, e, n, o, a, r, i) {
                var s = Ut(t, n),
                  l = Ut(e, n),
                  c = i.get(l);
                if (c) dt(t, n, c);
                else {
                  var d,
                    u = r ? r(s, l, n + "", t, e, i) : void 0,
                    h = void 0 === u;
                  if (h) {
                    var p = jt(l),
                      m = !p && Rt(l),
                      v = !p && !m && Yt(l);
                    (u = l),
                      p || m || v
                        ? jt(s)
                          ? (u = s)
                          : St((d = s)) && Tt(d)
                          ? (u = (function (t, e) {
                              var n = -1,
                                o = t.length;
                              for (e || (e = Array(o)); ++n < o; ) e[n] = t[n];
                              return e;
                            })(s))
                          : m
                          ? ((h = !1), (u = l.slice()))
                          : v
                          ? ((h = !1),
                            (u = (function (t, e) {
                              var n,
                                o,
                                a =
                                  ((o = new (n = t.buffer).constructor(
                                    n.byteLength
                                  )),
                                  new gt(o).set(new gt(n)),
                                  o);
                              return new t.constructor(
                                a,
                                t.byteOffset,
                                t.length
                              );
                            })(l)))
                          : (u = [])
                        : (function (t) {
                            if (!St(t) || "[object Object]" != P(t)) return !1;
                            var e = wt(t);
                            if (null === e) return !0;
                            var n = $t.call(e, "constructor") && e.constructor;
                            return (
                              "function" == typeof n &&
                              n instanceof n &&
                              Ht.call(n) == Pt
                            );
                          })(l) || Lt(l)
                        ? ((u = s),
                          Lt(s)
                            ? (u = (function (t, e, n, o) {
                                var a = !n;
                                n || (n = {});
                                for (var r = -1, i = e.length; ++r < i; ) {
                                  var s = e[r],
                                    l = void 0;
                                  void 0 === l && (l = t[s]),
                                    a ? ct(n, s, l) : Vt(n, s, l);
                                }
                                return n;
                              })(s, te(s)))
                            : (D(s) && !B(s)) ||
                              (u = (function (t) {
                                return "function" != typeof t.constructor ||
                                  kt(t)
                                  ? {}
                                  : yt(wt(t));
                              })(l)))
                        : (h = !1);
                  }
                  h && (i.set(l, u), a(u, l, o, r, i), i.delete(l)),
                    dt(t, n, u);
                }
              })(t, e, i, n, ee, o, a);
            else {
              var s = o ? o(Ut(t, i), r, i + "", t, e, a) : void 0;
              void 0 === s && (s = r), dt(t, i, s);
            }
          },
          te
        );
    }
    function ne(t) {
      return t;
    }
    var oe,
      ae = Math.max,
      re = lt
        ? function (t, e) {
            return lt(t, "toString", {
              configurable: !0,
              enumerable: !1,
              value:
                ((n = e),
                function () {
                  return n;
                }),
              writable: !0,
            });
            var n;
          }
        : ne,
      ie = Date.now,
      se = (function (t) {
        var e = 0,
          n = 0;
        return function () {
          var o = ie(),
            a = 16 - (o - n);
          if (((n = o), a > 0)) {
            if (++e >= 800) return arguments[0];
          } else e = 0;
          return t.apply(void 0, arguments);
        };
      })(re),
      le =
        ((oe = function (t, e, n) {
          ee(t, e, n);
        }),
        (function (t, e) {
          return se(
            (function (t, e, n) {
              return (
                (e = ae(void 0 === e ? t.length - 1 : e, 0)),
                function () {
                  for (
                    var o = arguments,
                      a = -1,
                      r = ae(o.length - e, 0),
                      i = Array(r);
                    ++a < r;

                  )
                    i[a] = o[e + a];
                  a = -1;
                  for (var s = Array(e + 1); ++a < e; ) s[a] = o[a];
                  return (
                    (s[e] = n(i)),
                    (function (t, e, n) {
                      switch (n.length) {
                        case 0:
                          return t.call(e);
                        case 1:
                          return t.call(e, n[0]);
                        case 2:
                          return t.call(e, n[0], n[1]);
                        case 3:
                          return t.call(e, n[0], n[1], n[2]);
                      }
                      return t.apply(e, n);
                    })(t, this, s)
                  );
                }
              );
            })(t, void 0, ne),
            t + ""
          );
        })(function (t, n) {
          var o = -1,
            a = n.length,
            r = a > 1 ? n[a - 1] : void 0,
            i = a > 2 ? n[2] : void 0;
          for (
            r = oe.length > 3 && "function" == typeof r ? (a--, r) : void 0,
              i &&
                (function (t, n, o) {
                  if (!D(o)) return !1;
                  var a = e(n);
                  return (
                    !!("number" == a
                      ? Tt(o) && Qt(n, o.length)
                      : "string" == a && (n in o)) && A(o[n], t)
                  );
                })(n[0], n[1], i) &&
                ((r = a < 3 ? void 0 : r), (a = 1)),
              t = Object(t);
            ++o < a;

          ) {
            var s = n[o];
            s && oe(t, s, o);
          }
          return t;
        })),
      ce = "gameState",
      de = {
        boardState: null,
        evaluations: null,
        rowIndex: null,
        solution: null,
        gameStatus: null,
        lastPlayedTs: null,
        lastCompletedTs: null,
        restoringFromLocalStorage: null,
        hardMode: !1,
      };
    function ue() {
      var t = window.localStorage.getItem(ce) || JSON.stringify(de);
      return JSON.parse(t);
    }
    function he(t) {
      var e = ue();
      !(function (t) {
        window.localStorage.setItem(ce, JSON.stringify(t));
      })(le(e, t));
    }
    var pe = document.createElement("template");
    pe.innerHTML =
      '\n  <style>\n  .setting {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    border-bottom: 1px solid var(--color-tone-4);\n    padding: 16px 0;\n  }\n\n  a, a:visited {\n    color: var(--color-tone-2);\n  }\n\n  .title {\n    font-size: 18px;\n  }\n  .text {\n    padding-right: 8px;\n  }\n  .description {\n    font-size: 12px;\n    color: var(--color-tone-2);\n  }\n\n  #footnote {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    padding: 16px;\n    color: var(--color-tone-2);\n    font-size: 12px;\n    text-align: right;\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-end;\n  }\n\n  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {\n    .setting {\n      padding: 16px;\n    }\n  }\n\n  </style>\n  <div class="sections">\n    <section>\n      <div class="setting">\n        <div class="text">\n          <div class="title">Hard Mode</div>\n          <div class="description">Any revealed hints must be used in subsequent guesses</div>\n        </div>\n        <div class="control">\n          <game-switch id="hard-mode" name="hard-mode"></game-switch>\n        </div>\n      </div>\n      <div class="setting">\n        <div class="text">\n          <div class="title">Dark Theme</div>\n        </div>\n        <div class="control">\n          <game-switch id="dark-theme" name="dark-theme"></game-switch>\n        </div>\n      </div>\n      <div class="setting">\n        <div class="text">\n          <div class="title">Color Blind Mode</div>\n          <div class="description">High contrast colors</div>\n        </div>\n        <div class="control">\n          <game-switch id="color-blind-theme" name="color-blind-theme"></game-switch>\n        </div>\n      </div>\n    </section>\n\n    </div>\n  <div id="footnote">\n    <div>Credits to Josh Wardle and cesarnogueira</div>\n    <div>\n      <div id="puzzle-number"></div>\n      <div id="hash"></div>\n    </div>\n  </div>\n';
    var me = (function (t) {
      i(o, u(HTMLElement));
      var e = p(o);
      function o() {
        var t;
        return (
          n(this, o),
          r(h((t = e.call(this))), "gameApp", void 0),
          t.attachShadow({ mode: "open" }),
          t
        );
      }
      return (
        a(o, [
          {
            key: "connectedCallback",
            value: function () {
              var t,
                e = this;
              this.shadowRoot.appendChild(pe.content.cloneNode(!0)),
                (this.shadowRoot.querySelector("#hash").textContent =
                  null === (t = window.wordle) || void 0 === t
                    ? void 0
                    : t.hash),
                (this.shadowRoot.querySelector("#puzzle-number").textContent =
                  "#".concat(this.gameApp.dayOffset)),
                this.shadowRoot.addEventListener(
                  "game-switch-change",
                  function (t) {
                    t.stopPropagation();
                    var n = t.detail,
                      o = n.name,
                      a = n.checked,
                      r = n.disabled;
                    e.dispatchEvent(
                      new CustomEvent("game-setting-change", {
                        bubbles: !0,
                        composed: !0,
                        detail: { name: o, checked: a, disabled: r },
                      })
                    ),
                      e.render();
                  }
                ),
                this.render();
            },
          },
          {
            key: "render",
            value: function () {
              var t = document.querySelector("body");
              t.classList.contains("nightmode") &&
                this.shadowRoot
                  .querySelector("#dark-theme")
                  .setAttribute("checked", ""),
                t.classList.contains("colorblind") &&
                  this.shadowRoot
                    .querySelector("#color-blind-theme")
                    .setAttribute("checked", "");
              var e = ue();
              e.hardMode &&
                this.shadowRoot
                  .querySelector("#hard-mode")
                  .setAttribute("checked", ""),
                e.hardMode ||
                  "IN_PROGRESS" !== e.gameStatus ||
                  0 === e.rowIndex ||
                  (this.shadowRoot
                    .querySelector("#hard-mode")
                    .removeAttribute("checked"),
                  this.shadowRoot
                    .querySelector("#hard-mode")
                    .setAttribute("disabled", ""));
            },
          },
        ]),
        o
      );
    })();
    customElements.define("game-settings", me);
    var ve = document.createElement("template");
    ve.innerHTML =
      '\n  <style>\n    .toast {\n      position: relative;\n      margin: 16px;\n      background-color: var(--color-tone-1);\n      color: var(--color-tone-7);\n      padding: 16px;\n      border: none;\n      border-radius: 4px;\n      opacity: 1;\n      transition: opacity 300ms cubic-bezier(0.645, 0.045, 0.355, 1);\n      font-weight: 700;\n    }\n    .win {\n      background-color: var(--color-correct);\n      color: var(--tile-text-color);\n    }\n    .fade {\n      opacity: 0;\n    }\n  </style>\n  <div class="toast"></div>\n';
    var fe,
      ge = (function (t) {
        i(o, u(HTMLElement));
        var e = p(o);
        function o() {
          var t;
          return (
            n(this, o),
            r(h((t = e.call(this))), "_duration", void 0),
            t.attachShadow({ mode: "open" }),
            t
          );
        }
        return (
          a(o, [
            {
              key: "connectedCallback",
              value: function () {
                var t = this;
                this.shadowRoot.appendChild(ve.content.cloneNode(!0));
                var e = this.shadowRoot.querySelector(".toast");
                (e.textContent = this.getAttribute("text")),
                  (this._duration = this.getAttribute("duration") || 1e3),
                  "Infinity" !== this._duration &&
                    setTimeout(function () {
                      e.classList.add("fade");
                    }, this._duration),
                  e.addEventListener("transitionend", function (e) {
                    t.parentNode.removeChild(t);
                  });
              },
            },
          ]),
          o
        );
      })();
    function be() {
      dataLayer.push(arguments);
    }
    customElements.define("game-toast", ge),
      (window.dataLayer = window.dataLayer || []),
      be("js", g),
      be("config", "G-2SSGMHY3NP", {
        app_version:
          null === (fe = window.wordle) || void 0 === fe ? void 0 : fe.hash,
        debug_mode: !1,
      });
    var ye = [...words],
      we = "present",
      xe = "correct",
      ke = { unknown: 0, absent: 1, present: 2, correct: 3 };
    function Se(t, e) {
      var n = {};
      return (
        t.forEach(function (t, o) {
          if (e[o])
            for (var a = 0; a < t.length; a++) {
              var r = t[a],
                i = e[o][a],
                s = n[r] || "unknown";
              ke[i] > ke[s] && (n[r] = i);
            }
        }),
        n
      );
    }
    function _e(t) {
      var e = ["th", "st", "nd", "rd"],
        n = t % 100;
      return t + (e[(n - 20) % 10] || e[n] || e[0]);
    }
    var Ee = new Date(2021, 5, 19, 0, 0, 0, 0);
    function Ae(t, e) {
      var n = new Date(t),
        o = new Date(e).setHours(0, 0, 0, 0) - n.setHours(0, 0, 0, 0);
      return Math.round(o / 864e5);
    }
    function Ie(t) {
      return Ae(Ee, t);
    }
    var Le = "abcdefghijklmnopqrstuvwxyz",
      je = [].concat(m(Le.split("").slice(13)), m(Le.split("").slice(0, 13)));
    function Ce(t) {
      for (var e = "", n = 0; n < t.length; n++) {
        var o = Le.indexOf(t[n]);
        e += o >= 0 ? je[o] : "_";
      }
      return e;
    }
    var Te = "statistics",
      ze = "fail",
      Me = {
        currentStreak: 0,
        maxStreak: 0,
        guesses: r({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }, ze, 0),
        winPercentage: 0,
        gamesPlayed: 0,
        gamesWon: 0,
        averageGuesses: 0,
      };
    function Oe() {
      var t = window.localStorage.getItem(Te) || JSON.stringify(Me);
      return JSON.parse(t);
    }
    var Re = document.createElement("template");
    Re.innerHTML =
      "\n  <style>\n  .toaster {\n    position: absolute;\n    top: 10%;\n    left: 50%;\n    transform: translate(-50%, 0);\n    pointer-events: none;\n    width: fit-content;\n  }\n  #game-toaster {\n    z-index: "
        .concat(1e3, ";\n  }\n  #system-toaster {\n    z-index: ")
        .concat(
          4e3,
          ';\n  }\n\n  #game {\n    width: 100%;\n    max-width: var(--game-max-width);\n    margin: 0 auto;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n  }\n  header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    height: var(--header-height);\n    color: var(--color-tone-1);\n    border-bottom: 1px solid var(--color-tone-4);\n  }\n  header .title {\n    font-weight: 700;\n    font-size: 36px;\n    letter-spacing: 0.2rem;\n    text-transform: uppercase;\n    text-align: center;\n    position: absolute;\n    left: 0;\n    right: 0;\n    pointer-events: none;\n  }\n\n  @media (max-width: 360px) {\n    header .title {\n      font-size: 22px;\n      letter-spacing: 0.1rem;\n    }\n  }\n\n  #board-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-grow: 1;\n    overflow: hidden;\n  }\n  #board {\n    display: grid;\n    grid-template-rows: repeat(6, 1fr);\n    grid-gap: 5px;\n    padding:10px;\n    box-sizing: border-box;\n  }\n  button.icon {\n    background: none;\n    border: none;\n    cursor: pointer;\n    padding: 0 4px;\n  }\n\n  #debug-tools {\n    position: absolute;\n    bottom: 0;\n  }  .puzzle-selector {\n      color: var(--color-tone-1);\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n    }\n    .puzzle-selector-buttons {\n      display: flex;\n      flex-wrap: wrap;\n      justify-content: space-evenly;\n      align-items: center;\n      padding-left: 6px;\n      padding-right: 6px;\n    }\n    .puzzle-selector-buttons button {\n      background-color: var(--key-bg-correct);\n      color: var(--key-evaluated-text-color);\n      font-family: inherit;\n      font-weight: bold;\n      margin-left: 6px;\n      margin-right: 6px;\n      border-radius: 4px;\n      cursor: pointer;\n      border: none;\n      user-select: none;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      text-transform: uppercase;\n      -webkit-tap-highlight-color: rgba(0,0,0,0.3);\n      font-size: 2vh;\n      height: 4vh;\n      -webkit-filter: brightness(100%);\n    }\n    .puzzle-selector-buttons button:hover {\n      opacity: 0.9;\n    }\n\n  </style>\n  <game-theme-manager>\n    <div id="game">\n      <header>\n        <div class="menu">\n          <button id="help-button" class="icon" aria-label="help">\n            <game-icon icon="help"></game-icon>\n          </button>\n        </div>\n        <div class="title">\n         WORDLE unlimited\n        </div>\n        <div class="menu">\n          <button id="statistics-button" class="icon" aria-label="statistics">\n            <game-icon icon="statistics"></game-icon>\n          </button>\n          <button id="settings-button" class="icon" aria-label="settings">\n            <game-icon icon="settings"></game-icon>\n          </button>\n        </div>\n      </header>\n      <div class="puzzle-selector">\n    <h2>Puzzle Selector</h2>\n    <div class="puzzle-selector-buttons">\n      <button id="previous-button"> Previous </button>\n      <button id="today-button"> Today </button>\n      <button id="random-button"> Random </button>\n      <button id="next-button"> Next </button>\n    </div>\n      </div>\n        <div id="board-container">\n          <div id="board"></div>\n        </div>\n        <game-keyboard></game-keyboard>\n        <game-modal></game-modal>\n        <game-page></game-page>\n        <div class="toaster" id="game-toaster"></div>\n        <div class="toaster" id="system-toaster"></div>\n    </div>\n  </game-theme-manager>\n  <div id="debug-tools"></div>\n'
        );
    var qe = document.createElement("template");
    qe.innerHTML =
      '\n<button id="reveal">reveal</button>\n<button id="shake">shake</button>\n<button id="bounce">bounce</button>\n<button id="toast">toast</button>\n<button id="modal">modal</button>\n';
    var Ne = "IN_PROGRESS",
      He = "WIN",
      $e = "FAIL",
      Pe = ["Genius", "Magnificent", "Impressive", "Splendid", "Great", "Phew"],
      De = (function (t) {
        i(o, u(HTMLElement));
        var e = p(o);
        function o() {
          var t;
          n(this, o),
            r(h((t = e.call(this))), "tileIndex", 0),
            r(h(t), "rowIndex", 0),
            r(h(t), "solution", void 0),
            r(h(t), "boardState", void 0),
            r(h(t), "evaluations", void 0),
            r(h(t), "canInput", !0),
            r(h(t), "gameStatus", Ne),
            r(h(t), "letterEvaluations", {}),
            r(h(t), "$board", void 0),
            r(h(t), "$keyboard", void 0),
            r(h(t), "$game", void 0),
            r(h(t), "today", void 0),
            r(h(t), "lastPlayedTs", void 0),
            r(h(t), "lastCompletedTs", void 0),
            r(h(t), "hardMode", void 0),
            r(h(t), "dayOffset", void 0),
            t.attachShadow({ mode: "open" }),
            (t.today = g);
          var a = ue();
          return (
            (t.lastPlayedTs = a.lastPlayedTs),
            !t.lastPlayedTs || Ae(new Date(t.lastPlayedTs), t.today) >= 1
              ? ((t.boardState = new Array(6).fill("")),
                (t.evaluations = new Array(6).fill(null)),
                (t.solution = (function (t) {
                  var e;
                  return (e = Ie(t) % ye.length), ye[e];
                })(t.today)),
                (t.dayOffset = Ie(t.today)),
                (t.lastCompletedTs = a.lastCompletedTs),
                (t.hardMode = a.hardMode),
                (t.restoringFromLocalStorage = !1),
                he({
                  rowIndex: t.rowIndex,
                  boardState: t.boardState,
                  evaluations: t.evaluations,
                  solution: t.solution,
                  gameStatus: t.gameStatus,
                }),
                be("event", "level_start", { level_name: Ce(t.solution) }))
              : ((t.boardState = a.boardState),
                (t.evaluations = a.evaluations),
                (t.rowIndex = a.rowIndex),
                (t.solution = a.solution),
                (t.dayOffset = Ie(t.today)),
                (t.letterEvaluations = Se(t.boardState, t.evaluations)),
                (t.gameStatus = a.gameStatus),
                (t.lastCompletedTs = a.lastCompletedTs),
                (t.hardMode = a.hardMode),
                t.gameStatus !== Ne && (t.canInput = !1),
                (t.restoringFromLocalStorage = !0)),
            t
          );
        }
        return (
          a(o, [
            {
              key: "evaluateRow",
              value: function () {
                if (5 === this.tileIndex && !(this.rowIndex >= 6)) {
                  var t,
                    e = this.$board.querySelectorAll("game-row")[this.rowIndex],
                    n = this.boardState[this.rowIndex];
                  if (((t = n), !Ta.includes(t) && !ye.includes(t)))
                    return (
                      e.setAttribute("invalid", ""),
                      void this.addToast("Not in word list")
                    );
                  if (this.hardMode) {
                    var o = (function (t, e, n) {
                        if (!t || !e || !n) return { validGuess: !0 };
                        for (var o = 0; o < n.length; o++)
                          if (n[o] === xe && t[o] !== e[o])
                            return {
                              validGuess: !1,
                              errorMessage: ""
                                .concat(_e(o + 1), " letter must be ")
                                .concat(e[o].toUpperCase()),
                            };
                        for (var a = {}, r = 0; r < n.length; r++)
                          [xe, we].includes(n[r]) &&
                            (a[e[r]] ? (a[e[r]] += 1) : (a[e[r]] = 1));
                        var i = t.split("").reduce(function (t, e) {
                          return t[e] ? (t[e] += 1) : (t[e] = 1), t;
                        }, {});
                        for (var s in a)
                          if ((i[s] || 0) < a[s])
                            return {
                              validGuess: !1,
                              errorMessage: "Guess must contain ".concat(
                                s.toUpperCase()
                              ),
                            };
                        return { validGuess: !0 };
                      })(
                        n,
                        this.boardState[this.rowIndex - 1],
                        this.evaluations[this.rowIndex - 1]
                      ),
                      a = o.validGuess,
                      r = o.errorMessage;
                    if (!a)
                      return (
                        e.setAttribute("invalid", ""),
                        void this.addToast(r || "Not valid in hard mode")
                      );
                  }
                  var i = (function (t, e) {
                    for (
                      var n = Array(e.length).fill("absent"),
                        o = Array(e.length).fill(!0),
                        a = Array(e.length).fill(!0),
                        r = 0;
                      r < t.length;
                      r++
                    )
                      t[r] === e[r] &&
                        a[r] &&
                        ((n[r] = xe), (o[r] = !1), (a[r] = !1));
                    for (var i = 0; i < t.length; i++) {
                      var s = t[i];
                      if (o[i])
                        for (var l = 0; l < e.length; l++) {
                          var c = e[l];
                          if (a[l] && s === c) {
                            (n[i] = we), (a[l] = !1);
                            break;
                          }
                        }
                    }
                    return n;
                  })(n, this.solution);
                  (this.evaluations[this.rowIndex] = i),
                    (this.letterEvaluations = Se(
                      this.boardState,
                      this.evaluations
                    )),
                    (e.evaluation = this.evaluations[this.rowIndex]),
                    (this.rowIndex += 1);
                  var s = this.rowIndex >= 6,
                    l = i.every(function (t) {
                      return "correct" === t;
                    });
                  (s || l) &&
                    ((function (t) {
                      var e = t.isWin,
                        n = t.isStreak,
                        o = t.numGuesses,
                        a = Oe();
                      e
                        ? ((a.guesses[o] += 1),
                          n ? (a.currentStreak += 1) : (a.currentStreak = 1))
                        : ((a.currentStreak = 0), (a.guesses.fail += 1)),
                        (a.maxStreak = Math.max(a.currentStreak, a.maxStreak)),
                        (a.gamesPlayed += 1),
                        (a.gamesWon += e ? 1 : 0),
                        (a.winPercentage = Math.round(
                          (a.gamesWon / a.gamesPlayed) * 100
                        )),
                        (a.averageGuesses = Math.round(
                          Object.entries(a.guesses).reduce(function (t, e) {
                            var n = (function (t, e) {
                                return (
                                  (function (t) {
                                    if (Array.isArray(t)) return t;
                                  })(t) ||
                                  (function (t, e) {
                                    var n =
                                      null == t
                                        ? null
                                        : ("undefined" != typeof Symbol &&
                                            t[Symbol.iterator]) ||
                                          t["@@iterator"];
                                    if (null != n) {
                                      var o,
                                        a,
                                        r = [],
                                        i = !0,
                                        s = !1;
                                      try {
                                        for (
                                          n = n.call(t);
                                          !(i = (o = n.next()).done) &&
                                          (r.push(o.value), 2 !== r.length);
                                          i = !0
                                        );
                                      } catch (t) {
                                        (s = !0), (a = t);
                                      } finally {
                                        try {
                                          i || null == n.return || n.return();
                                        } finally {
                                          if (s) throw a;
                                        }
                                      }
                                      return r;
                                    }
                                  })(t) ||
                                  v(t, 2) ||
                                  (function () {
                                    throw new TypeError(
                                      "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                                    );
                                  })()
                                );
                              })(e),
                              o = n[0],
                              a = n[1];
                            return o !== ze ? (t += o * a) : t;
                          }, 0) / a.gamesWon
                        )),
                        (function (t) {
                          window.localStorage.setItem(Te, JSON.stringify(t));
                        })(a);
                    })({
                      isWin: l,
                      isStreak:
                        !!this.lastCompletedTs &&
                        1 === Ae(new Date(this.lastCompletedTs), g),
                      numGuesses: this.rowIndex,
                    }),
                    he({ lastCompletedTs: Date.now() }),
                    (this.gameStatus = l ? He : $e),
                    be("event", "level_end", {
                      level_name: Ce(this.solution),
                      num_guesses: this.rowIndex,
                      success: l,
                    })),
                    (this.tileIndex = 0),
                    (this.canInput = !1),
                    he({
                      rowIndex: this.rowIndex,
                      boardState: this.boardState,
                      evaluations: this.evaluations,
                      solution: this.solution,
                      gameStatus: this.gameStatus,
                      lastPlayedTs: Date.now(),
                    });
                }
              },
            },
            {
              key: "addLetter",
              value: function (t) {
                this.gameStatus === Ne &&
                  this.canInput &&
                  (this.tileIndex >= 5 ||
                    ((this.boardState[this.rowIndex] += t),
                    this.$board
                      .querySelectorAll("game-row")
                      [this.rowIndex].setAttribute(
                        "letters",
                        this.boardState[this.rowIndex]
                      ),
                    (this.tileIndex += 1)));
              },
            },
            {
              key: "removeLetter",
              value: function () {
                if (
                  this.gameStatus === Ne &&
                  this.canInput &&
                  !(this.tileIndex <= 0)
                ) {
                  this.boardState[this.rowIndex] = this.boardState[
                    this.rowIndex
                  ].slice(0, this.boardState[this.rowIndex].length - 1);
                  var t =
                    this.$board.querySelectorAll("game-row")[this.rowIndex];
                  this.boardState[this.rowIndex]
                    ? t.setAttribute("letters", this.boardState[this.rowIndex])
                    : t.removeAttribute("letters"),
                    t.removeAttribute("invalid"),
                    (this.tileIndex -= 1);
                }
              },
            },
            {
              key: "submitGuess",
              value: function () {
                if (this.gameStatus === Ne && this.canInput) {
                  if (5 !== this.tileIndex)
                    return (
                      this.$board
                        .querySelectorAll("game-row")
                        [this.rowIndex].setAttribute("invalid", ""),
                      void this.addToast("Not enough letters")
                    );
                  this.evaluateRow();
                }
              },
            },
            {
              key: "addToast",
              value: function (t, e) {
                var n =
                    arguments.length > 2 &&
                    void 0 !== arguments[2] &&
                    arguments[2],
                  o = document.createElement("game-toast");
                o.setAttribute("text", t),
                  e && o.setAttribute("duration", e),
                  n
                    ? this.shadowRoot
                        .querySelector("#system-toaster")
                        .prepend(o)
                    : this.shadowRoot.querySelector("#game-toaster").prepend(o);
              },
            },
            {
              key: "sizeBoard",
              value: function () {
                var t = this.shadowRoot.querySelector("#board-container"),
                  e = Math.min(Math.floor(t.clientHeight * (5 / 6)), 350),
                  n = 6 * Math.floor(e / 5);
                (this.$board.style.width = "".concat(e, "px")),
                  (this.$board.style.height = "".concat(n, "px"));
              },
            },
            {
              key: "showStatsModal",
              value: function () {
                var t = this.$game.querySelector("game-modal"),
                  e = document.createElement("game-stats");
                this.gameStatus === He &&
                  this.rowIndex <= 6 &&
                  e.setAttribute("highlight-guess", this.rowIndex),
                  (e.gameApp = this),
                  t.appendChild(e),
                  t.setAttribute("open", "");
              },
            },
            {
              key: "showHelpModal",
              value: function () {
                var t = this.$game.querySelector("game-modal");
                t.appendChild(document.createElement("game-help")),
                  t.setAttribute("open", "");
              },
            },
            {
              key: "connectedCallback",
              value: function () {
                var t = this;
                this.shadowRoot.appendChild(Re.content.cloneNode(!0)),
                  (this.$game = this.shadowRoot.querySelector("#game")),
                  (this.$board = this.shadowRoot.querySelector("#board")),
                  (this.$keyboard =
                    this.shadowRoot.querySelector("game-keyboard")),
                  this.sizeBoard();
                for (var e = 0; e < 6; e++) {
                  var n = document.createElement("game-row");
                  n.setAttribute("letters", this.boardState[e]),
                    n.setAttribute("length", 5),
                    this.evaluations[e] && (n.evaluation = this.evaluations[e]),
                    this.$board.appendChild(n);
                }
                this.$game.addEventListener("game-key-press", function (e) {
                  var n = e.detail.key;
                  "←" === n || "Backspace" === n
                    ? t.removeLetter()
                    : "↵" === n || "Enter" === n
                    ? t.submitGuess()
                    : Le.includes(n.toLowerCase()) &&
                      t.addLetter(n.toLowerCase());
                }),
                  this.$game.addEventListener(
                    "game-last-tile-revealed-in-row",
                    function (e) {
                      (t.$keyboard.letterEvaluations = t.letterEvaluations),
                        t.rowIndex < 6 && (t.canInput = !0);
                      var n =
                        t.$board.querySelectorAll("game-row")[t.rowIndex - 1];
                      (e.path || (e.composedPath && e.composedPath())).includes(
                        n
                      ) &&
                        ([He, $e].includes(t.gameStatus) &&
                          (t.restoringFromLocalStorage
                            ? t.showStatsModal()
                            : (t.gameStatus === He &&
                                (n.setAttribute("win", ""),
                                t.addToast(Pe[t.rowIndex - 1], 2e3)),
                              t.gameStatus === $e &&
                                t.addToast(t.solution.toUpperCase(), 1 / 0),
                              setTimeout(function () {
                                t.showStatsModal();
                              }, 2500))),
                        (t.restoringFromLocalStorage = !1));
                    }
                  ),
                  this.shadowRoot.addEventListener(
                    "game-setting-change",
                    function (e) {
                      var n = e.detail,
                        o = n.name,
                        a = n.checked,
                        r = n.disabled;
                      switch (o) {
                        case "hard-mode":
                          return void (r
                            ? t.addToast(
                                "Hard mode can only be enabled at the start of a round",
                                1500,
                                !0
                              )
                            : ((t.hardMode = a), he({ hardMode: a })));
                      }
                    }
                  ),
                  this.shadowRoot
                    .getElementById("today-button")
                    .addEventListener("click", function () {
                      window.localStorage.removeItem("gameState"),
                        window.localStorage.setItem(
                          "puzzle",
                          JSON.parse(
                            Math.round(
                              Math.abs(new Date().setHours(0, 0, 0, 0) - Ee) /
                                864e5
                            )
                          )
                        ),
                        window.location.reload();
                    }),
                  this.shadowRoot
                    .getElementById("random-button")
                    .addEventListener("click", function () {
                      window.localStorage.removeItem("gameState"),
                        window.localStorage.setItem(
                          "puzzle",
                          JSON.parse(Math.floor(Math.random() * ye.length))
                        ),
                        window.location.reload();
                    }),
                  this.shadowRoot
                    .getElementById("previous-button")
                    .addEventListener("click", function () {
                      var t =
                        JSON.parse(window.localStorage.getItem("puzzle")) ||
                        Math.abs(new Date().setHours(0, 0, 0, 0) - Ee) / 864e5;
                      window.localStorage.removeItem("gameState"),
                        window.localStorage.setItem(
                          "puzzle",
                          JSON.parse(Math.max(t - 1, 0))
                        ),
                        window.location.reload();
                    }),
                  this.shadowRoot
                    .getElementById("next-button")
                    .addEventListener("click", function () {
                      var t =
                        JSON.parse(window.localStorage.getItem("puzzle")) ||
                        Math.abs(new Date().setHours(0, 0, 0, 0) - Ee) / 864e5;
                      window.localStorage.removeItem("gameState"),
                        window.localStorage.setItem(
                          "puzzle",
                          JSON.parse(Math.min(t + 1, ye.length - 1))
                        ),
                        window.location.reload();
                    }),
                  this.shadowRoot
                    .getElementById("settings-button")
                    .addEventListener("click", function (e) {
                      var n = t.$game.querySelector("game-page"),
                        o = document.createTextNode("Settings");
                      n.appendChild(o);
                      var a = document.createElement("game-settings");
                      a.setAttribute("slot", "content"),
                        (a.gameApp = t),
                        n.appendChild(a),
                        n.setAttribute("open", "");
                    }),
                  this.shadowRoot
                    .getElementById("help-button")
                    .addEventListener("click", function (e) {
                      var n = t.$game.querySelector("game-page"),
                        o = document.createTextNode("How to play");
                      n.appendChild(o);
                      var a = document.createElement("game-help");
                      a.setAttribute("page", ""),
                        a.setAttribute("slot", "content"),
                        n.appendChild(a),
                        n.setAttribute("open", "");
                    }),
                  this.shadowRoot
                    .getElementById("statistics-button")
                    .addEventListener("click", function (e) {
                      t.showStatsModal();
                    }),
                  window.addEventListener("resize", this.sizeBoard.bind(this));
              },
            },
            { key: "disconnectedCallback", value: function () {} },
            {
              key: "debugTools",
              value: function () {
                var t = this;
                this.shadowRoot
                  .getElementById("debug-tools")
                  .appendChild(qe.content.cloneNode(!0)),
                  this.shadowRoot
                    .getElementById("toast")
                    .addEventListener("click", function (e) {
                      t.addToast("hello world");
                    }),
                  this.shadowRoot
                    .getElementById("modal")
                    .addEventListener("click", function (e) {
                      var n = t.$game.querySelector("game-modal");
                      (n.textContent = "hello plz"), n.setAttribute("open", "");
                    }),
                  this.shadowRoot
                    .getElementById("reveal")
                    .addEventListener("click", function () {
                      t.evaluateRow();
                    }),
                  this.shadowRoot
                    .getElementById("shake")
                    .addEventListener("click", function () {
                      t.$board
                        .querySelectorAll("game-row")
                        [t.rowIndex].setAttribute("invalid", "");
                    }),
                  this.shadowRoot
                    .getElementById("bounce")
                    .addEventListener("click", function () {
                      var e =
                        t.$board.querySelectorAll("game-row")[t.rowIndex - 1];
                      "" === e.getAttribute("win")
                        ? e.removeAttribute("win")
                        : e.setAttribute("win", "");
                    });
              },
            },
          ]),
          o
        );
      })();
    customElements.define("game-app", De);
    var Be = document.createElement("template");
    Be.innerHTML =
      "\n  <style>\n    .overlay {\n      display: none;\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      top: 0;\n      left: 0;\n      justify-content: center;\n      align-items: center;\n      background-color: var(--opacity-50);\n      z-index: ".concat(
        3e3,
        ';\n    }\n\n    :host([open]) .overlay {\n      display: flex;\n    }\n\n    .content {\n      position: relative;\n      border-radius: 8px;\n      border: 1px solid var(--color-tone-6);\n      background-color: var(--modal-content-bg);\n      color: var(--color-tone-1);\n      box-shadow: 0 4px 23px 0 rgba(0, 0, 0, 0.2);\n      width: 90%;\n      max-height: 90%;\n      overflow-y: auto;\n      animation: SlideIn 200ms;\n      max-width: var(--game-max-width);\n      padding: 16px;\n      box-sizing: border-box;\n    }\n\n    .content.closing {\n      animation: SlideOut 200ms;\n    }\n\n    .close-icon {\n      width: 24px;\n      height: 24px;\n      position: absolute;\n      top: 16px;\n      right: 16px;\n    }\n\n    game-icon {\n      position: fixed;\n      user-select: none;\n      cursor: pointer;\n    }\n\n    @keyframes SlideIn {\n      0% {\n        transform: translateY(30px);\n        opacity: 0;\n      }\n      100% {\n        transform: translateY(0px);\n        opacity: 1;\n      }\n    }\n    @keyframes SlideOut {\n      0% {\n        transform: translateY(0px);\n        opacity: 1;\n      }\n      90% {\n        opacity: 0;\n      }\n      100% {\n        opacity: 0;\n        transform: translateY(60px);\n      }\n    }\n  </style>\n  <div class="overlay">\n    <div class="content">\n      <slot></slot>\n      <div class="close-icon">\n        <game-icon icon="close"></game-icon>\n      </div>\n    </div>\n  </div>\n'
      );
    var Ge = (function (t) {
      i(o, u(HTMLElement));
      var e = p(o);
      function o() {
        var t;
        return n(this, o), (t = e.call(this)).attachShadow({ mode: "open" }), t;
      }
      return (
        a(o, [
          {
            key: "connectedCallback",
            value: function () {
              var t = this;
              this.shadowRoot.appendChild(Be.content.cloneNode(!0)),
                this.addEventListener("click", function (e) {
                  t.shadowRoot
                    .querySelector(".content")
                    .classList.add("closing");
                }),
                this.shadowRoot.addEventListener("animationend", function (e) {
                  "SlideOut" === e.animationName &&
                    (t.shadowRoot
                      .querySelector(".content")
                      .classList.remove("closing"),
                    t.removeChild(t.firstChild),
                    t.removeAttribute("open"));
                });
            },
          },
        ]),
        o
      );
    })();
    customElements.define("game-modal", Ge);
    var Fe = document.createElement("template");
    Fe.innerHTML =
      "\n  <style>\n  :host {\n    height: var(--keyboard-height);\n  }\n  #keyboard {\n    margin: 0 8px;\n    user-select: none;\n  }\n  \n  .row {\n    display: flex;\n    width: 100%;\n    margin: 0 auto 8px;\n    /* https://stackoverflow.com/questions/46167604/ios-html-disable-double-tap-to-zoom */\n    touch-action: manipulation;\n  }\n  \n  button {\n    font-family: inherit;\n    font-weight: bold;\n    border: 0;\n    padding: 0;\n    margin: 0 6px 0 0;\n    height: 58px;\n    border-radius: 4px;\n    cursor: pointer;\n    user-select: none;\n    background-color: var(--key-bg);\n    color: var(--key-text-color);\n    flex: 1;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    text-transform: uppercase;\n    -webkit-tap-highlight-color: rgba(0,0,0,0.3);\n  }\n\n  button:focus {\n    outline: none;\n  }\n\n  button.fade {\n    transition: background-color 0.1s ease, color 0.1s ease;\n  }\n  \n  button:last-of-type {\n    margin: 0;\n  }\n  \n  .half {\n    flex: 0.5;\n  }\n  \n  .one {\n    flex: 1;\n  }\n\n  .one-and-a-half {\n    flex: 1.5;\n    font-size: 12px;\n  }\n  \n  .two {\n    flex: 2;\n  }\n\n  button[data-state='correct'] {\n    background-color: var(--key-bg-correct);\n    color: var(--key-evaluated-text-color);\n  }\n\n  button[data-state='present'] {\n    background-color: var(--key-bg-present);\n    color: var(--key-evaluated-text-color);\n  }\n\n  button[data-state='absent'] {\n    background-color: var(--key-bg-absent);\n    color: var(--key-evaluated-text-color);\n  }\n\n  </style>\n  <div id=\"keyboard\"></div>\n";
    var Je = document.createElement("template");
    Je.innerHTML = "\n  <button>key</button>\n";
    var We = document.createElement("template");
    We.innerHTML = '\n  <div class="spacer"></div>\n';
    var Ye = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["-", "a", "s", "d", "f", "g", "h", "j", "k", "l", "-"],
        ["↵", "z", "x", "c", "v", "b", "n", "m", "←"],
      ],
      Ue = (function (t) {
        i(o, u(HTMLElement));
        var e = p(o);
        function o() {
          var t;
          return (
            n(this, o),
            r(h((t = e.call(this))), "_letterEvaluations", {}),
            t.attachShadow({ mode: "open" }),
            t
          );
        }
        return (
          a(o, [
            {
              key: "letterEvaluations",
              set: function (t) {
                (this._letterEvaluations = t), this._render();
              },
            },
            {
              key: "dispatchKeyPressEvent",
              value: function (t) {
                this.dispatchEvent(
                  new CustomEvent("game-key-press", {
                    bubbles: !0,
                    composed: !0,
                    detail: { key: t },
                  })
                );
              },
            },
            {
              key: "connectedCallback",
              value: function () {
                var t = this;
                this.shadowRoot.appendChild(Fe.content.cloneNode(!0)),
                  (this.$keyboard = this.shadowRoot.getElementById("keyboard")),
                  this.$keyboard.addEventListener("click", function (e) {
                    var n = e.target.closest("button");
                    n &&
                      t.$keyboard.contains(n) &&
                      t.dispatchKeyPressEvent(n.dataset.key);
                  }),
                  window.addEventListener("keydown", function (e) {
                    if (!0 !== e.repeat) {
                      var n = e.key,
                        o = e.metaKey,
                        a = e.ctrlKey;
                      o ||
                        a ||
                        ((Le.includes(n.toLowerCase()) ||
                          "Backspace" === n ||
                          "Enter" === n) &&
                          t.dispatchKeyPressEvent(n));
                    }
                  }),
                  this.$keyboard.addEventListener(
                    "transitionend",
                    function (e) {
                      var n = e.target.closest("button");
                      n &&
                        t.$keyboard.contains(n) &&
                        n.classList.remove("fade");
                    }
                  ),
                  Ye.forEach(function (e) {
                    var n = document.createElement("div");
                    n.classList.add("row"),
                      e.forEach(function (t) {
                        var e;
                        if ((t >= "a" && t <= "z") || "←" === t || "↵" === t) {
                          if (
                            (((e = Je.content.cloneNode(
                              !0
                            ).firstElementChild).dataset.key = t),
                            (e.textContent = t),
                            "←" === t)
                          ) {
                            var o = document.createElement("game-icon");
                            o.setAttribute("icon", "backspace"),
                              (e.textContent = ""),
                              e.appendChild(o),
                              e.classList.add("one-and-a-half");
                          }
                          "↵" == t &&
                            ((e.textContent = "enter"),
                            e.classList.add("one-and-a-half"));
                        } else (e = We.content.cloneNode(!0).firstElementChild).classList.add(1 === t.length ? "half" : "one");
                        n.appendChild(e);
                      }),
                      t.$keyboard.appendChild(n);
                  }),
                  this._render();
              },
            },
            {
              key: "_render",
              value: function () {
                for (var t in this._letterEvaluations) {
                  var e = this.$keyboard.querySelector(
                    '[data-key="'.concat(t, '"]')
                  );
                  (e.dataset.state = this._letterEvaluations[t]),
                    e.classList.add("fade");
                }
              },
            },
          ]),
          o
        );
      })();
    function Xe(t, e, n, o) {
      return new (n || (n = Promise))(function (a, r) {
        function i(t) {
          try {
            l(o.next(t));
          } catch (t) {
            r(t);
          }
        }
        function s(t) {
          try {
            l(o.throw(t));
          } catch (t) {
            r(t);
          }
        }
        function l(t) {
          var e;
          t.done
            ? a(t.value)
            : ((e = t.value),
              e instanceof n
                ? e
                : new n(function (t) {
                    t(e);
                  })).then(i, s);
        }
        l((o = o.apply(t, e || [])).next());
      });
    }
    function Ve(t, e) {
      var n,
        o,
        a,
        r,
        i = {
          label: 0,
          sent: function () {
            if (1 & a[0]) throw a[1];
            return a[1];
          },
          trys: [],
          ops: [],
        };
      return (
        (r = { next: s(0), throw: s(1), return: s(2) }),
        "function" == typeof Symbol &&
          (r[Symbol.iterator] = function () {
            return this;
          }),
        r
      );
      function s(r) {
        return function (s) {
          return (function (r) {
            if (n) throw new TypeError("Generator is already executing.");
            for (; i; )
              try {
                if (
                  ((n = 1),
                  o &&
                    (a =
                      2 & r[0]
                        ? o.return
                        : r[0]
                        ? o.throw || ((a = o.return) && a.call(o), 0)
                        : o.next) &&
                    !(a = a.call(o, r[1])).done)
                )
                  return a;
                switch (((o = 0), a && (r = [2 & r[0], a.value]), r[0])) {
                  case 0:
                  case 1:
                    a = r;
                    break;
                  case 4:
                    return i.label++, { value: r[1], done: !1 };
                  case 5:
                    i.label++, (o = r[1]), (r = [0]);
                    continue;
                  case 7:
                    (r = i.ops.pop()), i.trys.pop();
                    continue;
                  default:
                    if (
                      !(
                        (a = (a = i.trys).length > 0 && a[a.length - 1]) ||
                        (6 !== r[0] && 2 !== r[0])
                      )
                    ) {
                      i = 0;
                      continue;
                    }
                    if (3 === r[0] && (!a || (r[1] > a[0] && r[1] < a[3]))) {
                      i.label = r[1];
                      break;
                    }
                    if (6 === r[0] && i.label < a[1]) {
                      (i.label = a[1]), (a = r);
                      break;
                    }
                    if (a && i.label < a[2]) {
                      (i.label = a[2]), i.ops.push(r);
                      break;
                    }
                    a[2] && i.ops.pop(), i.trys.pop();
                    continue;
                }
                r = e.call(t, i);
              } catch (t) {
                (r = [6, t]), (o = 0);
              } finally {
                n = a = 0;
              }
            if (5 & r[0]) throw r[1];
            return { value: r[0] ? r[1] : void 0, done: !0 };
          })([r, s]);
        };
      }
    }
    customElements.define("game-keyboard", Ue),
      function () {
        (console.warn || console.log).apply(console, arguments);
      }.bind("[clipboard-polyfill]");
    var Ke,
      Qe,
      Ze,
      tn,
      en = "undefined" == typeof navigator ? void 0 : navigator,
      nn = null == en ? void 0 : en.clipboard;
    null === (Ke = null == nn ? void 0 : nn.read) ||
      void 0 === Ke ||
      Ke.bind(nn),
      null === (Qe = null == nn ? void 0 : nn.readText) ||
        void 0 === Qe ||
        Qe.bind(nn);
    var on =
        (null === (Ze = null == nn ? void 0 : nn.write) ||
          void 0 === Ze ||
          Ze.bind(nn),
        null === (tn = null == nn ? void 0 : nn.writeText) || void 0 === tn
          ? void 0
          : tn.bind(nn)),
      an = "undefined" == typeof window ? void 0 : window,
      rn = (null == an || an.ClipboardItem, an),
      sn = function () {
        this.success = !1;
      };
    function ln(t) {
      var e = new sn(),
        n = function (t, e, n) {
          for (var o in ((t.success = !0), e)) {
            var a = e[o],
              r = n.clipboardData;
            r.setData(o, a),
              "text/plain" === o && r.getData(o) !== a && (t.success = !1);
          }
          n.preventDefault();
        }.bind(this, e, t);
      document.addEventListener("copy", n);
      try {
        document.execCommand("copy");
      } finally {
        document.removeEventListener("copy", n);
      }
      return e.success;
    }
    function cn(t, e) {
      dn(t);
      var n = ln(e);
      return un(), n;
    }
    function dn(t) {
      var e = document.getSelection();
      if (e) {
        var n = document.createRange();
        n.selectNodeContents(t), e.removeAllRanges(), e.addRange(n);
      }
    }
    function un() {
      var t = document.getSelection();
      t && t.removeAllRanges();
    }
    var hn = document.createElement("template");
    hn.innerHTML =
      '\n  <style>\n    .container {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      padding: 16px 0; \n    }\n    h1 {\n      font-weight: 700;\n      font-size: 16px;\n      letter-spacing: 0.5px;\n      text-transform: uppercase;\n      text-align: center;\n      margin-bottom: 10px;\n    }\n  \n    #statistics {\n      display: flex;\n      margin-bottom: \n    }\n\n    .statistic-container {\n      flex: 1;\n    }\n\n    .statistic-container .statistic {\n      font-size: 36px;\n      font-weight: 400;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      text-align: center;\n      letter-spacing: 0.05em;\n      font-variant-numeric: proportional-nums;\n    }\n\n    .statistic.timer {\n      font-variant-numeric: initial;\n    }\n\n    .statistic-container .label {\n      font-size: 12px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      text-align: center;\n      width: 4.378em;\n    }\n\n    #guess-distribution {\n      width: 80%;\n    }\n\n    .graph-container {\n      width: 100%;\n      height: 20px;\n      display: flex;\n      align-items: center;\n      padding-bottom: 4px;\n      font-size: 14px;\n      line-height: 20px;\n    }\n\n    .graph-container .graph {\n      width: 100%;\n      height: 100%;\n      padding-left: 4px;\n    }\n\n    .graph-container .graph .graph-bar {\n      height: 100%;\n      /* Assume no wins */\n      width: 0%;\n      position: relative;\n      background-color: var(--color-absent);\n      display: flex;\n      justify-content: center;\n    }\n\n    .graph-container .graph .graph-bar.highlight {\n      background-color: var(--color-correct);\n    }\n\n    .graph-container .graph .graph-bar.align-right {\n      justify-content: flex-end;\n      padding-right: 8px;\n    }\n\n    .graph-container .graph .num-guesses {\n      font-weight: bold;\n      color: var(--tile-text-color);\n    }\n\n    #statistics,\n    #guess-distribution {\n      padding-bottom: 10px;\n    }\n\n    .footer {\n      display: flex;\n      width: 100%;\n      justify-content: center;\n    }\n\n    .countdown {\n      border-right: 1px solid var(--color-tone-1);\n      padding-right: 12px;\n      width: 50%;\n    }\n\n    .play-again {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      padding-left: 12px;\n      width: 50%;\n    }\n\n    button#play-again-button {\n      background-color: var(--key-bg-correct);\n      color: var(--key-evaluated-text-color);\n      font-family: inherit;\n      font-weight: bold;\n      border-radius: 4px;\n      cursor: pointer;\n      border: none;\n      user-select: none;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      text-transform: uppercase;\n      -webkit-tap-highlight-color: rgba(0,0,0,0.3);\n      width: 80%;\n      font-size: 20px;\n      height: 52px;\n      -webkit-filter: brightness(100%);\n    }\n    button#play-again-button:hover {\n      opacity: 0.9;\n    }\n\n    .share {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      padding-left: 12px;\n      width: 50%;\n    }\n\n    .no-data {\n      text-align: center;\n    }\n\n    button#share-button {\n      background-color: var(--key-bg-correct);\n      color: var(--key-evaluated-text-color);\n      font-family: inherit;\n      font-weight: bold;\n      border-radius: 4px;\n      cursor: pointer;\n      border: none;\n      user-select: none;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      text-transform: uppercase;\n      -webkit-tap-highlight-color: rgba(0,0,0,0.3);\n      width: 80%;\n      font-size: 20px;\n      height: 52px;\n      -webkit-filter: brightness(100%);\n    }\n    button#share-button:hover {\n      opacity: 0.9;\n    }\n    button#share-button game-icon {\n      width: 24px;\n      height: 24px;\n      padding-left: 8px;\n    }\n  </style>\n\n  <div class="container">\n    <h1>Statistics</h1>\n    <div id="statistics"></div>\n    <h1>Guess Distribution</h1>\n    <div id="guess-distribution"></div>\n    <div class="footer"></div>\n  </div>\n';
    var pn = document.createElement("template");
    pn.innerHTML =
      '\n  <div class="statistic-container">\n    <div class="statistic"></div>\n    <div class="label"></div>\n  </div>\n';
    var mn = document.createElement("template");
    mn.innerHTML =
      '\n    <div class="graph-container">\n      <div class="guess"></div>\n      <div class="graph">\n        <div class="graph-bar">\n          <div class="num-guesses">\n        </div>\n      </div>\n      </div>\n    </div>\n';
    var vn = document.createElement("template");
    vn.innerHTML =
      '\n  <div class="share">\n    <button id="share-button">\n      Share <game-icon icon="share"></game-icon>\n    </button>\n  </div>\n';
    var fn = {
        currentStreak: "Current Streak",
        maxStreak: "Max Streak",
        winPercentage: "Win %",
        gamesPlayed: "Played",
        gamesWon: "Won",
        averageGuesses: "Av. Guesses",
      },
      gn = (function (t) {
        i(o, u(HTMLElement));
        var e = p(o);
        function o() {
          var t;
          return (
            n(this, o),
            r(h((t = e.call(this))), "stats", {}),
            r(h(t), "gameApp", void 0),
            t.attachShadow({ mode: "open" }),
            (t.stats = Oe()),
            t
          );
        }
        return (
          a(o, [
            {
              key: "connectedCallback",
              value: function () {
                var t = this;
                this.shadowRoot.appendChild(hn.content.cloneNode(!0));
                var e = this.shadowRoot.getElementById("statistics"),
                  n = this.shadowRoot.getElementById("guess-distribution"),
                  o = Math.max.apply(
                    Math,
                    m(Object.values(this.stats.guesses))
                  );
                if (
                  Object.values(this.stats.guesses).every(function (t) {
                    return 0 === t;
                  })
                ) {
                  var a = document.createElement("div");
                  a.classList.add("no-data"),
                    (a.innerText = "No Data"),
                    n.appendChild(a);
                } else
                  for (
                    var r = 1;
                    r < Object.keys(this.stats.guesses).length;
                    r++
                  ) {
                    var i = r,
                      s = this.stats.guesses[r],
                      l = mn.content.cloneNode(!0),
                      c = Math.max(7, Math.round((s / o) * 100));
                    l.querySelector(".guess").textContent = i;
                    var d = l.querySelector(".graph-bar");
                    if (
                      ((d.style.width = "".concat(c, "%")),
                      "number" == typeof s)
                    ) {
                      (l.querySelector(".num-guesses").textContent = s),
                        s > 0 && d.classList.add("align-right");
                      var u = parseInt(
                        this.getAttribute("highlight-guess"),
                        10
                      );
                      u && r === u && d.classList.add("highlight");
                    }
                    n.appendChild(l);
                  }
                if (
                  (["gamesPlayed", "winPercentage"].forEach(function (n) {
                    var o = fn[n],
                      a = t.stats[n],
                      r = pn.content.cloneNode(!0);
                    (r.querySelector(".label").textContent = o),
                      (r.querySelector(".statistic").textContent = a),
                      e.appendChild(r);
                  }),
                  this.gameApp.gameStatus !== Ne)
                ) {
                  var h = this.shadowRoot.querySelector(".footer"),
                    p = vn.content.cloneNode(!0);
                  h.appendChild(p),
                    this.shadowRoot
                      .querySelector("button#share-button")
                      .addEventListener("click", function (e) {
                        e.preventDefault(),
                          e.stopPropagation(),
                          (function (t, e, n) {
                            try {
                              (o =
                                navigator.userAgent ||
                                navigator.vendor ||
                                window.opera),
                                (!/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                                  o
                                ) &&
                                  !/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                                    o.substr(0, 4)
                                  )) ||
                                navigator.userAgent
                                  .toLowerCase()
                                  .indexOf("firefox") > -1 ||
                                void 0 === navigator.share ||
                                !navigator.canShare ||
                                !navigator.canShare(t)
                                  ? (function (t) {
                                      return Xe(
                                        this,
                                        void 0,
                                        void 0,
                                        function () {
                                          return Ve(this, function (e) {
                                            if (on) return [2, on(t)];
                                            if (
                                              !(function (t) {
                                                return Xe(
                                                  this,
                                                  void 0,
                                                  void 0,
                                                  function () {
                                                    var e;
                                                    return Ve(
                                                      this,
                                                      function (n) {
                                                        if (
                                                          ((e =
                                                            "text/plain" in t),
                                                          "undefined" ==
                                                            typeof ClipboardEvent &&
                                                            void 0 !==
                                                              rn.clipboardData &&
                                                            void 0 !==
                                                              rn.clipboardData
                                                                .setData)
                                                        ) {
                                                          if (!e)
                                                            throw new Error(
                                                              "No `text/plain` value was specified."
                                                            );
                                                          if (
                                                            ((o =
                                                              t["text/plain"]),
                                                            rn.clipboardData.setData(
                                                              "Text",
                                                              o
                                                            ))
                                                          )
                                                            return [2, !0];
                                                          throw new Error(
                                                            "Copying failed, possibly because the user rejected it."
                                                          );
                                                        }
                                                        var o;
                                                        return ln(t) ||
                                                          navigator.userAgent.indexOf(
                                                            "Edge"
                                                          ) > -1 ||
                                                          cn(
                                                            document.body,
                                                            t
                                                          ) ||
                                                          (function (t) {
                                                            var e =
                                                              document.createElement(
                                                                "div"
                                                              );
                                                            e.setAttribute(
                                                              "style",
                                                              "-webkit-user-select: text !important"
                                                            ),
                                                              (e.textContent =
                                                                "temporary element"),
                                                              document.body.appendChild(
                                                                e
                                                              );
                                                            var n = cn(e, t);
                                                            return (
                                                              document.body.removeChild(
                                                                e
                                                              ),
                                                              n
                                                            );
                                                          })(t) ||
                                                          (function (t) {
                                                            var e =
                                                              document.createElement(
                                                                "div"
                                                              );
                                                            e.setAttribute(
                                                              "style",
                                                              "-webkit-user-select: text !important"
                                                            );
                                                            var n = e;
                                                            e.attachShadow &&
                                                              (n =
                                                                e.attachShadow({
                                                                  mode: "open",
                                                                }));
                                                            var o =
                                                              document.createElement(
                                                                "span"
                                                              );
                                                            (o.innerText = t),
                                                              n.appendChild(o),
                                                              document.body.appendChild(
                                                                e
                                                              ),
                                                              dn(o);
                                                            var a =
                                                              document.execCommand(
                                                                "copy"
                                                              );
                                                            return (
                                                              un(),
                                                              document.body.removeChild(
                                                                e
                                                              ),
                                                              a
                                                            );
                                                          })(t["text/plain"])
                                                          ? [2, !0]
                                                          : [2, !1];
                                                      }
                                                    );
                                                  }
                                                );
                                              })(
                                                (function (t) {
                                                  var e = {};
                                                  return (
                                                    (e["text/plain"] = t), e
                                                  );
                                                })(t)
                                              )
                                            )
                                              throw new Error(
                                                "writeText() failed"
                                              );
                                            return [2];
                                          });
                                        }
                                      );
                                    })(t.text).then(e, n)
                                  : navigator.share(t);
                            } catch (t) {
                              n();
                            }
                            var o;
                          })(
                            (function (t) {
                              var e = t.evaluations,
                                n = t.dayOffset,
                                o = t.rowIndex,
                                a = t.isHardMode,
                                r = t.isWin,
                                i = JSON.parse(window.localStorage.getItem(S)),
                                s = JSON.parse(window.localStorage.getItem(_)),
                                l = "Wordle ".concat(n);
                              (l += " ".concat(r ? o : "X", "/").concat(6)),
                                a && (l += "*");
                              var c = "";
                              return (
                                e.forEach(function (t) {
                                  t &&
                                    (t.forEach(function (t) {
                                      if (t) {
                                        var e = "";
                                        switch (t) {
                                          case xe:
                                            e = s ? "🟧" : "🟩";
                                            break;
                                          case we:
                                            e = s ? "🟦" : "🟨";
                                            break;
                                          case "absent":
                                            e = i ? "⬛" : "⬜";
                                        }
                                        c += e;
                                      }
                                    }),
                                    (c += "\n"));
                                }),
                                {
                                  text: ""
                                    .concat(l, "\n\n")
                                    .concat(c.trimEnd()),
                                }
                              );
                            })({
                              evaluations: t.gameApp.evaluations,
                              dayOffset: t.gameApp.dayOffset,
                              rowIndex: t.gameApp.rowIndex,
                              isHardMode: t.gameApp.hardMode,
                              isWin: t.gameApp.gameStatus === He,
                            }),
                            function () {
                              t.gameApp.addToast(
                                "Copied results to clipboard",
                                2e3,
                                !0
                              );
                            },
                            function () {
                              t.gameApp.addToast("Share failed", 2e3, !0);
                            }
                          );
                      });
                }
              },
            },
          ]),
          o
        );
      })();
    customElements.define("game-stats", gn);
    var bn = document.createElement("template");
    bn.innerHTML =
      '\n  <style>\n    :host {\n    }\n    .container {\n      display: flex;\n      justify-content: space-between;\n    }\n    .switch {\n      height: 20px;\n      width: 32px;\n      vertical-align: middle;\n      /* not quite right */\n      background: var(--color-tone-3);\n      border-radius: 999px;\n      display: block;\n      position: relative;\n    }\n    .knob {\n      display: block;\n      position: absolute;\n      left: 2px;\n      top: 2px;\n      height: calc(100% - 4px);\n      width: 50%;\n      border-radius: 8px;\n      background: var(--white);\n      transform: translateX(0);\n      transition: transform 0.3s;\n    }\n    :host([checked]) .switch {\n      background: var(--color-correct);\n    }\n    :host([checked]) .knob {\n      transform: translateX(calc(100% - 4px));\n    }\n    :host([disabled]) .switch {\n      opacity: 0.5;\n    }\n  </style>\n  <div class="container">\n    <label><slot></slot></label>\n    <div class="switch">\n      <span class="knob"></div>\n    </div>\n  </div>\n';
    var yn = (function (t) {
      i(o, u(HTMLElement));
      var e = p(o);
      function o() {
        var t;
        return n(this, o), (t = e.call(this)).attachShadow({ mode: "open" }), t;
      }
      return (
        a(
          o,
          [
            {
              key: "connectedCallback",
              value: function () {
                var t = this;
                this.shadowRoot.appendChild(bn.content.cloneNode(!0)),
                  this.shadowRoot
                    .querySelector(".container")
                    .addEventListener("click", function (e) {
                      e.stopPropagation(),
                        t.hasAttribute("checked")
                          ? t.removeAttribute("checked")
                          : t.setAttribute("checked", ""),
                        t.dispatchEvent(
                          new CustomEvent("game-switch-change", {
                            bubbles: !0,
                            composed: !0,
                            detail: {
                              name: t.getAttribute("name"),
                              checked: t.hasAttribute("checked"),
                              disabled: t.hasAttribute("disabled"),
                            },
                          })
                        );
                    });
              },
            },
          ],
          [
            {
              key: "observedAttributes",
              get: function () {
                return ["checked"];
              },
            },
          ]
        ),
        o
      );
    })();
    customElements.define("game-switch", yn);
    var wn = document.createElement("template");
    wn.innerHTML =
      '\n  <style>\n  .instructions {\n    font-size: 14px;\n    color: var(--color-tone-1)\n  }\n\n  .examples {\n    border-bottom: 1px solid var(--color-tone-4);\n    border-top: 1px solid var(--color-tone-4);\n  }\n\n  .example {\n    margin-top: 24px;\n    margin-bottom: 24px;\n  }\n\n  game-tile {\n    width: 40px;\n    height: 40px;\n  }\n\n  :host([page]) section {\n    padding: 16px;\n    padding-top: 0px;\n  }\n\n  </style>\n  <section>\n    <div class="instructions">\n      <p>Guess the <strong>WORDLE</strong> in 6 tries.</p>\n      <p>Each guess must be a valid 5 letter word. Hit the enter button to submit.</p>\n      <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>\n      <div class="examples">\n        <p><strong>Examples</strong></p>\n        <div class="example">\n          <div class="row">\n            <game-tile letter="w" evaluation="correct" reveal></game-tile>\n            <game-tile letter="e"></game-tile>\n            <game-tile letter="a"></game-tile>\n            <game-tile letter="r"></game-tile>\n            <game-tile letter="y"></game-tile>\n          </div>\n          <p>The letter <strong>W</strong> is in the word and in the correct spot.</p>\n        </div>\n        <div class="example">\n          <div class="row">\n            <game-tile letter="p"></game-tile>\n            <game-tile letter="i" evaluation="present" reveal></game-tile>\n            <game-tile letter="l"></game-tile>\n            <game-tile letter="l"></game-tile>\n            <game-tile letter="s"></game-tile>\n          </div>\n          <p>The letter <strong>I</strong> is in the word but in the wrong spot.</p>\n        </div>\n        <div class="example">\n          <div class="row">\n            <game-tile letter="v"></game-tile>\n            <game-tile letter="a"></game-tile>\n            <game-tile letter="g"></game-tile>\n            <game-tile letter="u" evaluation="absent" reveal></game-tile>\n            <game-tile letter="e"></game-tile>\n          </div>\n          <p>The letter <strong>U</strong> is not in the word in any spot.</p>\n        </div>\n      </div>\n      <p><strong>You can play as many WORDLEs as you want in this version!<strong></p>\n    </div>\n  </section>\n';
    var xn = (function (t) {
      i(o, u(HTMLElement));
      var e = p(o);
      function o() {
        var t;
        return n(this, o), (t = e.call(this)).attachShadow({ mode: "open" }), t;
      }
      return (
        a(o, [
          {
            key: "connectedCallback",
            value: function () {
              this.shadowRoot.appendChild(wn.content.cloneNode(!0));
            },
          },
        ]),
        o
      );
    })();
    customElements.define("game-help", xn);
    var kn = document.createElement("template");
    kn.innerHTML =
      "\n  <style>\n    .overlay {\n      display: none;\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      top: 0;\n      left: 0;\n      justify-content: center;\n      background-color: var(--color-background);\n      animation: SlideIn 100ms linear;\n      z-index: ".concat(
        2e3,
        ';\n    }\n\n    :host([open]) .overlay {\n      display: flex;\n    }\n\n    .content {\n      position: relative;\n      color: var(--color-tone-1);\n      padding: 0 32px;\n      max-width: var(--game-max-width);\n      width: 100%;\n      overflow-y: auto;\n      height: 100%;\n      display: flex;\n      flex-direction: column;\n    }\n\n    .content-container {\n      height: 100%;\n    }\n\n    .overlay.closing {\n      animation: SlideOut 150ms linear;\n    }\n\n    header {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      position: relative;\n    }\n\n    h1 {\n      font-weight: 700;\n      font-size: 16px;\n      letter-spacing: 0.5px;\n      text-transform: uppercase;\n      text-align: center;\n      margin-bottom: 10px;\n    }\n\n    game-icon {\n      position: absolute;\n      right: 0;\n      user-select: none;\n      cursor: pointer;\n    }\n\n    @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {\n      .content {\n        max-width: 100%;\n        padding: 0;\n      }\n      game-icon {\n        padding: 0 16px;\n      }\n    }\n\n    @keyframes SlideIn {\n      0% {\n        transform: translateY(30px);\n        opacity: 0;\n      }\n      100% {\n        transform: translateY(0px);\n        opacity: 1;\n      }\n    }\n    @keyframes SlideOut {\n      0% {\n        transform: translateY(0px);\n        opacity: 1;\n      }\n      90% {\n        opacity: 0;\n      }\n      100% {\n        opacity: 0;\n        transform: translateY(60px);\n      }\n    }\n  </style>\n  <div class="overlay">\n    <div class="content">\n      <header>\n        <h1><slot></slot></h1>\n        <game-icon icon="close"></game-icon>\n      </header>\n      <div class="content-container">\n        <slot name="content"></slot>\n      </div>\n    </div>\n  </div>\n'
      );
    var Sn = (function (t) {
      i(o, u(HTMLElement));
      var e = p(o);
      function o() {
        var t;
        return n(this, o), (t = e.call(this)).attachShadow({ mode: "open" }), t;
      }
      return (
        a(o, [
          {
            key: "connectedCallback",
            value: function () {
              var t = this;
              this.shadowRoot.appendChild(kn.content.cloneNode(!0)),
                this.shadowRoot
                  .querySelector("game-icon")
                  .addEventListener("click", function (e) {
                    t.shadowRoot
                      .querySelector(".overlay")
                      .classList.add("closing");
                  }),
                this.shadowRoot.addEventListener("animationend", function (e) {
                  "SlideOut" === e.animationName &&
                    (t.shadowRoot
                      .querySelector(".overlay")
                      .classList.remove("closing"),
                    Array.from(t.childNodes).forEach(function (e) {
                      t.removeChild(e);
                    }),
                    t.removeAttribute("open"));
                });
            },
          },
        ]),
        o
      );
    })();
    customElements.define("game-page", Sn);
    var _n = document.createElement("template");
    _n.innerHTML =
      '\n  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">\n    <path fill=var(--color-tone-3) />\n  </svg>\n';
    var En = {
        help: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z",
        settings:
          "M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z",
        backspace:
          "M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z",
        close:
          "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
        share:
          "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z",
        statistics:
          "M16,11V3H8v6H2v12h20V11H16z M10,5h4v14h-4V5z M4,11h4v8H4V11z M20,19h-4v-6h4V19z",
      },
      An = (function (t) {
        i(o, u(HTMLElement));
        var e = p(o);
        function o() {
          var t;
          return (
            n(this, o), (t = e.call(this)).attachShadow({ mode: "open" }), t
          );
        }
        return (
          a(o, [
            {
              key: "connectedCallback",
              value: function () {
                this.shadowRoot.appendChild(_n.content.cloneNode(!0));
                var t = this.getAttribute("icon");
                this.shadowRoot.querySelector("path").setAttribute("d", En[t]),
                  "backspace" === t &&
                    this.shadowRoot
                      .querySelector("path")
                      .setAttribute("fill", "var(--color-tone-1)"),
                  "share" === t &&
                    this.shadowRoot
                      .querySelector("path")
                      .setAttribute("fill", "var(--white)");
              },
            },
          ]),
          o
        );
      })();
    customElements.define("game-icon", An);
    var In = document.createElement("template");
    In.innerHTML = '\n  <div id="timer"></div>\n';
    var Ln = (function (t) {
      i(o, u(HTMLElement));
      var e = p(o);
      function o() {
        var t;
        n(this, o),
          r(h((t = e.call(this))), "targetEpochMS", void 0),
          r(h(t), "intervalId", void 0),
          r(h(t), "$timer", void 0),
          t.attachShadow({ mode: "open" });
        var a = g;
        return (
          a.setDate(a.getDate() + 1),
          a.setHours(0, 0, 0, 0),
          (t.targetEpochMS = a.getTime()),
          t
        );
      }
      return (
        a(o, [
          {
            key: "padDigit",
            value: function (t) {
              return t.toString().padStart(2, "0");
            },
          },
          {
            key: "updateTimer",
            value: function () {
              var t,
                e = g.getTime(),
                n = Math.floor(this.targetEpochMS - e);
              if (n <= 0) t = "00:00:00";
              else {
                var o = Math.floor((n % 864e5) / 36e5),
                  a = Math.floor((n % 36e5) / 6e4),
                  r = Math.floor((n % 6e4) / 1e3);
                t = ""
                  .concat(this.padDigit(o), ":")
                  .concat(this.padDigit(a), ":")
                  .concat(this.padDigit(r));
              }
              this.$timer.textContent = t;
            },
          },
          {
            key: "connectedCallback",
            value: function () {
              var t = this;
              this.shadowRoot.appendChild(In.content.cloneNode(!0)),
                (this.$timer = this.shadowRoot.querySelector("#timer")),
                (this.intervalId = setInterval(function () {
                  t.updateTimer();
                }, 200));
            },
          },
          {
            key: "disconnectedCallback",
            value: function () {
              clearInterval(this.intervalId);
            },
          },
        ]),
        o
      );
    })();
    return (
      customElements.define("countdown-timer", Ln),
      (t.CountdownTimer = Ln),
      (t.GameApp = De),
      (t.GameHelp = xn),
      (t.GameIcon = An),
      (t.GameKeyboard = Ue),
      (t.GameModal = Ge),
      (t.GamePage = Sn),
      (t.GameRow = x),
      (t.GameSettings = me),
      (t.GameStats = gn),
      (t.GameSwitch = yn),
      (t.GameThemeManager = E),
      (t.GameTile = y),
      (t.GameToast = ge),
      Object.defineProperty(t, "__esModule", { value: !0 }),
      t
    );
  })({}));
