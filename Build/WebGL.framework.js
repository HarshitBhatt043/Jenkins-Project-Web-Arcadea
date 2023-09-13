function unityFramework(e) {
  e = void 0 !== e ? e : {};
  var n =
      "(^|\\n)(\\s+at\\s+|)jsStackTrace(\\s+\\(|@)([^\\n]+):\\d+:\\d+(\\)|)(\\n|$)",
    i = te().match(new RegExp(n));
  i &&
    (e.stackTraceRegExp = new RegExp(
      n
        .replace("([^\\n]+)", i[4].replace(/[\\^${}[\]().*+?|]/g, "\\$&"))
        .replace("jsStackTrace", "[^\\n]+")
    ));
  var t = function (n) {
    if (!G) {
      (G = !0),
        1,
        "undefined" != typeof ENVIRONMENT_IS_PTHREAD &&
          ENVIRONMENT_IS_PTHREAD &&
          console.error("Pthread aborting at " + new Error().stack),
        void 0 !== n ? (y(n), v(n), (n = JSON.stringify(n))) : (n = "");
      var i = "abort(" + n + ") at " + re();
      if (!e.abortHandler || !e.abortHandler(i)) throw i;
    }
  };
  ("undefined" != typeof ENVIRONMENT_IS_PTHREAD && ENVIRONMENT_IS_PTHREAD) ||
    e.preRun.push(function () {
      var n =
        e.unityFileSystemInit ||
        function () {
          st.mkdir("/idbfs"),
            st.mount(ut, {}, "/idbfs"),
            e.addRunDependency("JS_FileSystem_Mount"),
            st.syncfs(!0, function (n) {
              n &&
                console.log(
                  "IndexedDB is not available. Data will not persist in cache and PlayerPrefs will not be saved."
                ),
                e.removeRunDependency("JS_FileSystem_Mount");
            });
        };
      n();
    }),
    (e.SetFullscreen = function (n) {
      if (void 0 !== Ne && Ne)
        if (void 0 === Ar) console.log("Player not loaded yet.");
        else {
          var i = Ar.canPerformEventHandlerRequests;
          (Ar.canPerformEventHandlerRequests = function () {
            return 1;
          }),
            e.ccall("SetFullscreen", null, ["number"], [n]),
            (Ar.canPerformEventHandlerRequests = i);
        }
      else console.log("Runtime not initialized yet.");
    });
  var r = [];
  function o(n, i, t) {
    if (void 0 === t)
      e.ccall("SendMessage", null, ["string", "string"], [n, i]);
    else if ("string" == typeof t)
      e.ccall(
        "SendMessageString",
        null,
        ["string", "string", "string"],
        [n, i, t]
      );
    else {
      if ("number" != typeof t)
        throw t + " is does not have a type which is supported by SendMessage.";
      e.ccall(
        "SendMessageFloat",
        null,
        ["string", "string", "number"],
        [n, i, t]
      );
    }
  }
  ("undefined" != typeof ENVIRONMENT_IS_PTHREAD && ENVIRONMENT_IS_PTHREAD) ||
    e.preRun.push(function () {
      !(function () {
        if (
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia
        ) {
          if (
            !navigator.mediaDevices ||
            !navigator.mediaDevices.enumerateDevices
          ) {
            if (
              "undefined" == typeof MediaStreamTrack ||
              void 0 === MediaStreamTrack.getSources
            )
              return void console.log(
                "Media Devices cannot be enumerated on this browser."
              );
            MediaStreamTrack.getSources(function (n) {
              for (var i = 0; i !== n.length; ++i) {
                var t = n[i];
                "video" === t.kind && e(t.label);
              }
            });
          }
          navigator.mediaDevices
            .enumerateDevices()
            .then(function (n) {
              n.forEach(function (n) {
                "videoinput" == n.kind && e(n.label);
              });
            })
            .catch(function (e) {
              console.log(e.name + ": " + error.message);
            });
        }
        function e(e) {
          var n = {
            deviceName: (e = e || "device #" + r.length),
            refCount: 0,
            video: null,
          };
          r.push(n);
        }
      })();
    }),
    (e.SendMessage = o);
  var a,
    u = {};
  for (a in e) e.hasOwnProperty(a) && (u[a] = e[a]);
  (e.arguments = []),
    (e.thisProgram = "./this.program"),
    (e.quit = function (e, n) {
      throw n;
    }),
    (e.preRun = []),
    (e.postRun = []);
  var l = !1,
    c = !1,
    s = !1,
    f = !1;
  (l = "object" == typeof window),
    (c = "function" == typeof importScripts),
    (s =
      "object" == typeof process && "function" == typeof require && !l && !c),
    (f = !l && !s && !c);
  var _,
    p,
    d = "";
  function m(n) {
    return e.locateFile ? e.locateFile(n, d) : d + n;
  }
  s
    ? ((d = __dirname + "/"),
      (e.read = function (e, n) {
        var i;
        return (
          _ || (_ = require("fs")),
          p || (p = require("path")),
          (e = p.normalize(e)),
          (i = _.readFileSync(e)),
          n ? i : i.toString()
        );
      }),
      (e.readBinary = function (n) {
        var i = e.read(n, !0);
        return i.buffer || (i = new Uint8Array(i)), R(i.buffer), i;
      }),
      process.argv.length > 1 &&
        (e.thisProgram = process.argv[1].replace(/\\/g, "/")),
      (e.arguments = process.argv.slice(2)),
      "undefined" != typeof module && (module.exports = e),
      process.on("uncaughtException", function (e) {
        if (!(e instanceof Sb)) throw e;
      }),
      process.on("unhandledRejection", function (e, n) {
        process.exit(1);
      }),
      (e.quit = function (e) {
        process.exit(e);
      }),
      (e.inspect = function () {
        return "[Emscripten Module object]";
      }))
    : f
    ? ("undefined" != typeof read &&
        (e.read = function (e) {
          return read(e);
        }),
      (e.readBinary = function (e) {
        var n;
        return "function" == typeof readbuffer
          ? new Uint8Array(readbuffer(e))
          : (R("object" == typeof (n = read(e, "binary"))), n);
      }),
      "undefined" != typeof scriptArgs
        ? (e.arguments = scriptArgs)
        : void 0 !== arguments && (e.arguments = arguments),
      "function" == typeof quit &&
        (e.quit = function (e) {
          quit(e);
        }))
    : (l || c) &&
      (l
        ? document.currentScript && (d = document.currentScript.src)
        : (d = self.location.href),
      (d =
        0 !== d.indexOf("blob:")
          ? d.split("/").slice(0, -1).join("/") + "/"
          : ""),
      (e.read = function (e) {
        var n = new XMLHttpRequest();
        return n.open("GET", e, !1), n.send(null), n.responseText;
      }),
      c &&
        (e.readBinary = function (e) {
          var n = new XMLHttpRequest();
          return (
            n.open("GET", e, !1),
            (n.responseType = "arraybuffer"),
            n.send(null),
            new Uint8Array(n.response)
          );
        }),
      (e.readAsync = function (e, n, i) {
        var t = new XMLHttpRequest();
        t.open("GET", e, !0),
          (t.responseType = "arraybuffer"),
          (t.onload = function () {
            200 == t.status || (0 == t.status && t.response)
              ? n(t.response)
              : i();
          }),
          (t.onerror = i),
          t.send(null);
      }),
      (e.setWindowTitle = function (e) {
        document.title = e;
      }));
  var y =
      e.print ||
      ("undefined" != typeof console
        ? console.log.bind(console)
        : "undefined" != typeof print
        ? print
        : null),
    v =
      e.printErr ||
      ("undefined" != typeof printErr
        ? printErr
        : ("undefined" != typeof console && console.warn.bind(console)) || y);
  for (a in u) u.hasOwnProperty(a) && (e[a] = u[a]);
  u = void 0;
  var h = 16;
  function g(e) {
    var n = me;
    return (me = (me + e + 15) & -16), n;
  }
  function b(e) {
    var n = se[we >> 2],
      i = (n + e + 15) & -16;
    if (((se[we >> 2] = i), i >= Be) && !Te()) return (se[we >> 2] = n), 0;
    return n;
  }
  function w(e, n) {
    return n || (n = h), (e = Math.ceil(e / n) * n);
  }
  function E(e) {
    switch (e) {
      case "i1":
      case "i8":
        return 1;
      case "i16":
        return 2;
      case "i32":
      case "float":
        return 4;
      case "i64":
      case "double":
        return 8;
      default:
        if ("*" === e[e.length - 1]) return 4;
        if ("i" === e[0]) {
          var n = parseInt(e.substr(1));
          return R(n % 8 == 0), n / 8;
        }
        return 0;
    }
  }
  function C(e) {
    C.shown || (C.shown = {}), C.shown[e] || ((C.shown[e] = 1), v(e));
  }
  var L = {
      "f64-rem": function (e, n) {
        return e % n;
      },
      debugger: function () {},
    },
    k = 1,
    A = new Array(0);
  function I(e, n) {
    for (var i = 0; i < 0; i++) if (!A[i]) return (A[i] = e), k + i;
    throw "Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.";
  }
  var S = {};
  function O(e, n) {
    if (e) {
      R(n), S[n] || (S[n] = {});
      var i = S[n];
      return (
        i[e] ||
          (1 === n.length
            ? (i[e] = function () {
                return j(n, e);
              })
            : 2 === n.length
            ? (i[e] = function (i) {
                return j(n, e, [i]);
              })
            : (i[e] = function () {
                return j(n, e, Array.prototype.slice.call(arguments));
              })),
        i[e]
      );
    }
  }
  function T(e, n, i) {
    return i
      ? +(e >>> 0) + 4294967296 * +(n >>> 0)
      : +(e >>> 0) + 4294967296 * +(0 | n);
  }
  function j(n, i, t) {
    return t && t.length
      ? e["dynCall_" + n].apply(null, [i].concat(t))
      : e["dynCall_" + n].call(null, i);
  }
  var B = 1024,
    G = 0;
  function R(e, n) {
    e || t("Assertion failed: " + n);
  }
  function x(n) {
    var i = e["_" + n];
    return (
      R(i, "Cannot call unknown function " + n + ", make sure it is exported"),
      i
    );
  }
  var D = {
      stackSave: function () {
        Ib();
      },
      stackRestore: function () {
        Ab();
      },
      arrayToC: function (e) {
        var n = kb(e.length);
        return Ye(e, n), n;
      },
      stringToC: function (e) {
        var n = 0;
        if (null != e && 0 !== e) {
          var i = 1 + (e.length << 2);
          Q(e, (n = kb(i)), i);
        }
        return n;
      },
    },
    P = { string: D.stringToC, array: D.arrayToC };
  function M(e, n, i, t, r) {
    var o = x(e),
      a = [],
      u = 0;
    if (t)
      for (var l = 0; l < t.length; l++) {
        var c = P[i[l]];
        c ? (0 === u && (u = Ib()), (a[l] = c(t[l]))) : (a[l] = t[l]);
      }
    var s = o.apply(null, a);
    return (
      (s = (function (e) {
        return "string" === n ? X(e) : "boolean" === n ? Boolean(e) : e;
      })(s)),
      0 !== u && Ab(u),
      s
    );
  }
  function F(e, n, i, t) {
    var r = (i = i || []).every(function (e) {
      return "number" === e;
    });
    return "string" !== n && r && !t
      ? x(e)
      : function () {
          return M(e, n, i, arguments);
        };
  }
  function N(e, n, i, r) {
    switch (("*" === (i = i || "i8").charAt(i.length - 1) && (i = "i32"), i)) {
      case "i1":
      case "i8":
        ae[e >> 0] = n;
        break;
      case "i16":
        le[e >> 1] = n;
        break;
      case "i32":
        se[e >> 2] = n;
        break;
      case "i64":
        (tempI64 = [
          n >>> 0,
          ((tempDouble = n),
          +Qe(tempDouble) >= 1
            ? tempDouble > 0
              ? (0 | tn(+en(tempDouble / 4294967296), 4294967295)) >>> 0
              : ~~+$e((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0
            : 0),
        ]),
          (se[e >> 2] = tempI64[0]),
          (se[(e + 4) >> 2] = tempI64[1]);
        break;
      case "float":
        _e[e >> 2] = n;
        break;
      case "double":
        pe[e >> 3] = n;
        break;
      default:
        t("invalid type for setValue: " + i);
    }
  }
  var U = 0,
    W = 1,
    z = 2,
    V = 4;
  function q(e, n, i, t) {
    var r, o;
    "number" == typeof e ? ((r = !0), (o = e)) : ((r = !1), (o = e.length));
    var a,
      u = "string" == typeof n ? n : null;
    if (
      ((a =
        i == V
          ? t
          : ["function" == typeof hb ? hb : g, kb, g, b][void 0 === i ? z : i](
              Math.max(o, u ? 1 : n.length)
            )),
      r)
    ) {
      var l;
      for (t = a, R(0 == (3 & a)), l = a + (-4 & o); t < l; t += 4)
        se[t >> 2] = 0;
      for (l = a + o; t < l; ) ae[t++ >> 0] = 0;
      return a;
    }
    if ("i8" === u)
      return (
        e.subarray || e.slice ? ue.set(e, a) : ue.set(new Uint8Array(e), a), a
      );
    for (var c, s, f, _ = 0; _ < o; ) {
      var p = e[_];
      0 !== (c = u || n[_])
        ? ("i64" == c && (c = "i32"),
          N(a + _, p, c),
          f !== c && ((s = E(c)), (f = c)),
          (_ += s))
        : _++;
    }
    return a;
  }
  function H(e) {
    return ye ? (Ne ? hb(e) : b(e)) : g(e);
  }
  function X(e, n) {
    if (0 === n || !e) return "";
    for (
      var i, t = 0, r = 0;
      (t |= i = ue[(e + r) >> 0]), (0 != i || n) && (r++, !n || r != n);

    );
    n || (n = r);
    var o = "";
    if (t < 128) {
      for (var a, u = 1024; n > 0; )
        (a = String.fromCharCode.apply(
          String,
          ue.subarray(e, e + Math.min(n, u))
        )),
          (o = o ? o + a : a),
          (e += u),
          (n -= u);
      return o;
    }
    return K(e);
  }
  var Y = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
  function J(e, n) {
    for (var i = n; e[i]; ) ++i;
    if (i - n > 16 && e.subarray && Y) return Y.decode(e.subarray(n, i));
    for (var t, r, o, a, u, l = ""; ; ) {
      if (!(t = e[n++])) return l;
      if (128 & t)
        if (((r = 63 & e[n++]), 192 != (224 & t)))
          if (
            ((o = 63 & e[n++]),
            224 == (240 & t)
              ? (t = ((15 & t) << 12) | (r << 6) | o)
              : ((a = 63 & e[n++]),
                240 == (248 & t)
                  ? (t = ((7 & t) << 18) | (r << 12) | (o << 6) | a)
                  : ((u = 63 & e[n++]),
                    (t =
                      248 == (252 & t)
                        ? ((3 & t) << 24) | (r << 18) | (o << 12) | (a << 6) | u
                        : ((1 & t) << 30) |
                          (r << 24) |
                          (o << 18) |
                          (a << 12) |
                          (u << 6) |
                          (63 & e[n++])))),
            t < 65536)
          )
            l += String.fromCharCode(t);
          else {
            var c = t - 65536;
            l += String.fromCharCode(55296 | (c >> 10), 56320 | (1023 & c));
          }
        else l += String.fromCharCode(((31 & t) << 6) | r);
      else l += String.fromCharCode(t);
    }
  }
  function K(e) {
    return J(ue, e);
  }
  function Z(e, n, i, t) {
    if (!(t > 0)) return 0;
    for (var r = i, o = i + t - 1, a = 0; a < e.length; ++a) {
      var u = e.charCodeAt(a);
      if (u >= 55296 && u <= 57343)
        u = (65536 + ((1023 & u) << 10)) | (1023 & e.charCodeAt(++a));
      if (u <= 127) {
        if (i >= o) break;
        n[i++] = u;
      } else if (u <= 2047) {
        if (i + 1 >= o) break;
        (n[i++] = 192 | (u >> 6)), (n[i++] = 128 | (63 & u));
      } else if (u <= 65535) {
        if (i + 2 >= o) break;
        (n[i++] = 224 | (u >> 12)),
          (n[i++] = 128 | ((u >> 6) & 63)),
          (n[i++] = 128 | (63 & u));
      } else if (u <= 2097151) {
        if (i + 3 >= o) break;
        (n[i++] = 240 | (u >> 18)),
          (n[i++] = 128 | ((u >> 12) & 63)),
          (n[i++] = 128 | ((u >> 6) & 63)),
          (n[i++] = 128 | (63 & u));
      } else if (u <= 67108863) {
        if (i + 4 >= o) break;
        (n[i++] = 248 | (u >> 24)),
          (n[i++] = 128 | ((u >> 18) & 63)),
          (n[i++] = 128 | ((u >> 12) & 63)),
          (n[i++] = 128 | ((u >> 6) & 63)),
          (n[i++] = 128 | (63 & u));
      } else {
        if (i + 5 >= o) break;
        (n[i++] = 252 | (u >> 30)),
          (n[i++] = 128 | ((u >> 24) & 63)),
          (n[i++] = 128 | ((u >> 18) & 63)),
          (n[i++] = 128 | ((u >> 12) & 63)),
          (n[i++] = 128 | ((u >> 6) & 63)),
          (n[i++] = 128 | (63 & u));
      }
    }
    return (n[i] = 0), i - r;
  }
  function Q(e, n, i) {
    return Z(e, ue, n, i);
  }
  function $(e) {
    for (var n = 0, i = 0; i < e.length; ++i) {
      var t = e.charCodeAt(i);
      t >= 55296 &&
        t <= 57343 &&
        (t = (65536 + ((1023 & t) << 10)) | (1023 & e.charCodeAt(++i))),
        t <= 127
          ? ++n
          : (n +=
              t <= 2047
                ? 2
                : t <= 65535
                ? 3
                : t <= 2097151
                ? 4
                : t <= 67108863
                ? 5
                : 6);
    }
    return n;
  }
  "undefined" != typeof TextDecoder && new TextDecoder("utf-16le");
  function ee(e) {
    var n = $(e) + 1,
      i = hb(n);
    return i && Z(e, ae, i, n), i;
  }
  function ne(e) {
    var n = $(e) + 1,
      i = kb(n);
    return Z(e, ae, i, n), i;
  }
  function ie(e) {
    return e.replace(/__Z[\w\d_]+/g, function (e) {
      return e === e ? e : e + " [" + e + "]";
    });
  }
  function te() {
    var e = new Error();
    if (!e.stack) {
      try {
        throw new Error(0);
      } catch (n) {
        e = n;
      }
      if (!e.stack) return "(no stack trace available)";
    }
    return e.stack.toString();
  }
  function re() {
    var n = te();
    return e.extraStackTrace && (n += "\n" + e.extraStackTrace()), ie(n);
  }
  var oe,
    ae,
    ue,
    le,
    ce,
    se,
    fe,
    _e,
    pe,
    de,
    me,
    ye,
    ve,
    he,
    ge,
    be,
    we,
    Ee = 16384,
    Ce = 65536,
    Le = 16777216,
    ke = 16777216;
  function Ae(e, n) {
    return e % n > 0 && (e += n - (e % n)), e;
  }
  function Ie(n) {
    e.buffer = oe = n;
  }
  function Se() {
    (e.HEAP8 = ae = new Int8Array(oe)),
      (e.HEAP16 = le = new Int16Array(oe)),
      (e.HEAP32 = se = new Int32Array(oe)),
      (e.HEAPU8 = ue = new Uint8Array(oe)),
      (e.HEAPU16 = ce = new Uint16Array(oe)),
      (e.HEAPU32 = fe = new Uint32Array(oe)),
      (e.HEAPF32 = _e = new Float32Array(oe)),
      (e.HEAPF64 = pe = new Float64Array(oe));
  }
  function Oe() {
    t(
      "Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " +
        Be +
        ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 "
    );
  }
  function Te() {
    var n = e.usingWasm ? Ce : Le,
      i = 2147483648 - n;
    if (se[we >> 2] > i) return !1;
    var t = Be;
    for (Be = Math.max(Be, ke); Be < se[we >> 2]; )
      Be =
        Be <= 536870912
          ? Ae(2 * Be, n)
          : Math.min(Ae((3 * Be + 2147483648) / 4, n), i);
    var r = e.reallocBuffer(Be);
    return r && r.byteLength == Be ? (Ie(r), Se(), !0) : ((Be = t), !1);
  }
  (de = me = ve = he = ge = be = we = 0),
    (ye = !1),
    e.reallocBuffer ||
      (e.reallocBuffer = function (e) {
        var n;
        try {
          if (ArrayBuffer.transfer) n = ArrayBuffer.transfer(oe, e);
          else {
            var i = ae;
            (n = new ArrayBuffer(e)), new Int8Array(n).set(i);
          }
        } catch (e) {
          return !1;
        }
        return !!pb(n) && n;
      });
  try {
    Function.prototype.call.bind(
      Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "byteLength").get
    )(new ArrayBuffer(4));
  } catch (e) {
    (function (e) {
      return e.byteLength;
    });
  }
  var je = e.TOTAL_STACK || 5242880,
    Be = e.TOTAL_MEMORY || 33554432;
  function Ge() {
    return Be;
  }
  function Re(n) {
    for (; n.length > 0; ) {
      var i = n.shift();
      if ("function" != typeof i) {
        var t = i.func;
        "number" == typeof t
          ? void 0 === i.arg
            ? e.dynCall_v(t)
            : e.dynCall_vi(t, i.arg)
          : t(void 0 === i.arg ? null : i.arg);
      } else i();
    }
  }
  Be < je &&
    v(
      "TOTAL_MEMORY should be larger than TOTAL_STACK, was " +
        Be +
        "! (TOTAL_STACK=" +
        je +
        ")"
    ),
    e.buffer
      ? (oe = e.buffer)
      : ("object" == typeof WebAssembly &&
        "function" == typeof WebAssembly.Memory
          ? ((e.wasmMemory = new WebAssembly.Memory({ initial: Be / Ce })),
            (oe = e.wasmMemory.buffer))
          : (oe = new ArrayBuffer(Be)),
        (e.buffer = oe)),
    Se();
  var xe = [],
    De = [],
    Pe = [],
    Me = [],
    Fe = [],
    Ne = !1;
  function Ue() {
    if (e.preRun)
      for (
        "function" == typeof e.preRun && (e.preRun = [e.preRun]);
        e.preRun.length;

      )
        He(e.preRun.shift());
    Re(xe);
  }
  function We() {
    Ne || ((Ne = !0), Re(De));
  }
  function ze() {
    Re(Pe);
  }
  function Ve() {
    Re(Me), !0;
  }
  function qe() {
    if (e.postRun)
      for (
        "function" == typeof e.postRun && (e.postRun = [e.postRun]);
        e.postRun.length;

      )
        Xe(e.postRun.shift());
    Re(Fe);
  }
  function He(e) {
    xe.unshift(e);
  }
  function Xe(e) {
    Fe.unshift(e);
  }
  function Ye(e, n) {
    ae.set(e, n);
  }
  function Je(e, n, i) {
    for (var t = 0; t < e.length; ++t) ae[n++ >> 0] = e.charCodeAt(t);
    i || (ae[n >> 0] = 0);
  }
  function Ke(e, n, i) {
    return e >= 0
      ? e
      : n <= 32
      ? 2 * Math.abs(1 << (n - 1)) + e
      : Math.pow(2, n) + e;
  }
  function Ze(e, n, i) {
    if (e <= 0) return e;
    var t = n <= 32 ? Math.abs(1 << (n - 1)) : Math.pow(2, n - 1);
    return e >= t && (n <= 32 || e > t) && (e = -2 * t + e), e;
  }
  var Qe = Math.abs,
    $e = Math.ceil,
    en = Math.floor,
    nn = Math.pow,
    tn = Math.min,
    rn = Math.clz32,
    on = Math.trunc,
    an = 0,
    un = null,
    ln = null;
  function cn(n) {
    an++, e.monitorRunDependencies && e.monitorRunDependencies(an);
  }
  function sn(n) {
    if (
      (an--,
      e.monitorRunDependencies && e.monitorRunDependencies(an),
      0 == an && (null !== un && (clearInterval(un), (un = null)), ln))
    ) {
      var i = ln;
      (ln = null), i();
    }
  }
  (e.preloadedImages = {}), (e.preloadedAudios = {});
  var fn = "data:application/octet-stream;base64,";
  function _n(e) {
    return String.prototype.startsWith ? e.startsWith(fn) : 0 === e.indexOf(fn);
  }
  function pn() {
    var n = "build.wast",
      i = "build.wasm",
      r = "build.temp.asm.js";
    _n(n) || (n = m(n)), _n(i) || (i = m(i)), _n(r) || (r = m(r));
    var o = { global: null, env: null, asm2wasm: L, parent: e },
      a = null;
    function u() {
      try {
        if (e.wasmBinary) return new Uint8Array(e.wasmBinary);
        if (e.readBinary) return e.readBinary(i);
        throw "both async and sync fetching of the wasm failed";
      } catch (e) {
        t(e);
      }
    }
    function s(n, r, s) {
      if ("object" != typeof WebAssembly)
        return v("no native wasm support detected"), !1;
      if (!(e.wasmMemory instanceof WebAssembly.Memory))
        return v("no native wasm Memory in use"), !1;
      function f(n, i) {
        (a = n.exports).memory &&
          (function (n) {
            var i = e.buffer;
            n.byteLength < i.byteLength &&
              v(
                "the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here"
              );
            var t = new Int8Array(i);
            new Int8Array(n).set(t), Ie(n), Se();
          })(a.memory),
          (e.asm = a),
          (e.usingWasm = !0),
          sn();
      }
      if (
        ((r.memory = e.wasmMemory),
        (o.global = { NaN: NaN, Infinity: 1 / 0 }),
        (o["global.Math"] = Math),
        (o.env = r),
        cn(),
        e.instantiateWasm)
      )
        try {
          return e.instantiateWasm(o, f);
        } catch (e) {
          return (
            v("Module.instantiateWasm callback failed with error: " + e), !1
          );
        }
      function _(e) {
        f(e.instance, e.module);
      }
      function p(n) {
        (e.wasmBinary || (!l && !c) || "function" != typeof fetch
          ? new Promise(function (e, n) {
              e(u());
            })
          : fetch(i, { credentials: "same-origin" })
              .then(function (e) {
                if (!e.ok)
                  throw "failed to load wasm binary file at '" + i + "'";
                return e.arrayBuffer();
              })
              .catch(function () {
                return u();
              })
        )
          .then(function (e) {
            return WebAssembly.instantiate(e, o);
          })
          .then(n)
          .catch(function (e) {
            v("failed to asynchronously prepare wasm: " + e), t(e);
          });
      }
      return (
        e.wasmBinary ||
        "function" != typeof WebAssembly.instantiateStreaming ||
        _n(i) ||
        "function" != typeof fetch
          ? p(_)
          : WebAssembly.instantiateStreaming(
              fetch(i, { credentials: "same-origin" }),
              o
            )
              .then(_)
              .catch(function (e) {
                v("wasm streaming compile failed: " + e),
                  v("falling back to ArrayBuffer instantiation"),
                  p(_);
              }),
        {}
      );
    }
    e.asmPreload = e.asm;
    var f = e.reallocBuffer;
    e.reallocBuffer = function (n) {
      return "asmjs" === _
        ? f(n)
        : (function (n) {
            n = Ae(n, e.usingWasm ? Ce : Le);
            var i = e.buffer.byteLength;
            if (e.usingWasm)
              try {
                return -1 !== e.wasmMemory.grow((n - i) / 65536)
                  ? (e.buffer = e.wasmMemory.buffer)
                  : null;
              } catch (e) {
                return null;
              }
          })(n);
    };
    var _ = "";
    e.asm = function (n, i, t) {
      if (!(i = i).table) {
        var r = e.wasmTableSize;
        void 0 === r && (r = 1024);
        var o = e.wasmMaxTableSize;
        "object" == typeof WebAssembly && "function" == typeof WebAssembly.Table
          ? (i.table =
              void 0 !== o
                ? new WebAssembly.Table({
                    initial: r,
                    maximum: o,
                    element: "anyfunc",
                  })
                : new WebAssembly.Table({ initial: r, element: "anyfunc" }))
          : (i.table = new Array(r)),
          (e.wasmTable = i.table);
      }
      var a;
      return (
        i.memoryBase || (i.memoryBase = e.STATIC_BASE),
        i.tableBase || (i.tableBase = 0),
        R((a = s(0, i)), "no binaryen method succeeded."),
        a
      );
    };
  }
  pn();
  var dn = [
    function () {
      return e.webglContextAttributes.premultipliedAlpha;
    },
    function () {
      return e.webglContextAttributes.preserveDrawingBuffer;
    },
    function (e) {
      throw new Error(
        'Internal Unity error: gles::GetProcAddress("' +
          X(e) +
          '") was called but gles::GetProcAddress() is not implemented on Unity WebGL. Please report a bug.'
      );
    },
    function () {
      return void 0 !== e.shouldQuit;
    },
    function () {
      for (var n in e.intervals) window.clearInterval(n);
      e.intervals = {};
      for (var i = 0; i < e.deinitializers.length; i++) e.deinitializers[i]();
      (e.deinitializers = []), "function" == typeof e.onQuit && e.onQuit();
    },
  ];
  function mn(e) {
    return dn[e]();
  }
  function yn(e) {
    return dn[e]();
  }
  function vn(e, n) {
    return dn[e](n);
  }
  (me = (de = B) + 3834320),
    De.push(
      {
        func: function () {
          Nm();
        },
      },
      {
        func: function () {
          Fm();
        },
      },
      {
        func: function () {
          Qg();
        },
      },
      {
        func: function () {
          Um();
        },
      },
      {
        func: function () {
          zm();
        },
      },
      {
        func: function () {
          dy();
        },
      },
      {
        func: function () {
          my();
        },
      },
      {
        func: function () {
          yy();
        },
      },
      {
        func: function () {
          vy();
        },
      },
      {
        func: function () {
          Wm();
        },
      },
      {
        func: function () {
          qm();
        },
      },
      {
        func: function () {
          hy();
        },
      },
      {
        func: function () {
          Hm();
        },
      },
      {
        func: function () {
          dg();
        },
      },
      {
        func: function () {
          gy();
        },
      },
      {
        func: function () {
          by();
        },
      },
      {
        func: function () {
          wy();
        },
      },
      {
        func: function () {
          Ey();
        },
      },
      {
        func: function () {
          Cy();
        },
      },
      {
        func: function () {
          Xm();
        },
      },
      {
        func: function () {
          Ly();
        },
      },
      {
        func: function () {
          Zg();
        },
      },
      {
        func: function () {
          Vg();
        },
      },
      {
        func: function () {
          qg();
        },
      },
      {
        func: function () {
          bg();
        },
      },
      {
        func: function () {
          wg();
        },
      },
      {
        func: function () {
          zg();
        },
      },
      {
        func: function () {
          $v();
        },
      },
      {
        func: function () {
          mg();
        },
      },
      {
        func: function () {
          bh();
        },
      },
      {
        func: function () {
          $m();
        },
      },
      {
        func: function () {
          Jm();
        },
      },
      {
        func: function () {
          Ev();
        },
      },
      {
        func: function () {
          Cv();
        },
      },
      {
        func: function () {
          Lv();
        },
      },
      {
        func: function () {
          kv();
        },
      },
      {
        func: function () {
          Av();
        },
      },
      {
        func: function () {
          Iv();
        },
      },
      {
        func: function () {
          Sv();
        },
      },
      {
        func: function () {
          Ov();
        },
      },
      {
        func: function () {
          Tv();
        },
      },
      {
        func: function () {
          jv();
        },
      },
      {
        func: function () {
          Bv();
        },
      },
      {
        func: function () {
          Gv();
        },
      },
      {
        func: function () {
          Rv();
        },
      },
      {
        func: function () {
          xv();
        },
      },
      {
        func: function () {
          Dv();
        },
      },
      {
        func: function () {
          Pv();
        },
      },
      {
        func: function () {
          Mv();
        },
      },
      {
        func: function () {
          vg();
        },
      },
      {
        func: function () {
          Fv();
        },
      },
      {
        func: function () {
          Qm();
        },
      },
      {
        func: function () {
          Nv();
        },
      },
      {
        func: function () {
          Uv();
        },
      },
      {
        func: function () {
          Wv();
        },
      },
      {
        func: function () {
          zv();
        },
      },
      {
        func: function () {
          Hv();
        },
      },
      {
        func: function () {
          Xv();
        },
      },
      {
        func: function () {
          eh();
        },
      },
      {
        func: function () {
          Yg();
        },
      },
      {
        func: function () {
          rh();
        },
      },
      {
        func: function () {
          oh();
        },
      },
      {
        func: function () {
          ah();
        },
      },
      {
        func: function () {
          uh();
        },
      },
      {
        func: function () {
          lh();
        },
      },
      {
        func: function () {
          ch();
        },
      },
      {
        func: function () {
          sh();
        },
      },
      {
        func: function () {
          nh();
        },
      },
      {
        func: function () {
          ih();
        },
      },
      {
        func: function () {
          th();
        },
      },
      {
        func: function () {
          fh();
        },
      },
      {
        func: function () {
          _h();
        },
      },
      {
        func: function () {
          ph();
        },
      },
      {
        func: function () {
          dh();
        },
      },
      {
        func: function () {
          mh();
        },
      },
      {
        func: function () {
          yh();
        },
      },
      {
        func: function () {
          vh();
        },
      },
      {
        func: function () {
          hh();
        },
      },
      {
        func: function () {
          gh();
        },
      },
      {
        func: function () {
          wh();
        },
      },
      {
        func: function () {
          Eh();
        },
      },
      {
        func: function () {
          Ch();
        },
      },
      {
        func: function () {
          Lh();
        },
      },
      {
        func: function () {
          kh();
        },
      },
      {
        func: function () {
          Ah();
        },
      },
      {
        func: function () {
          Ih();
        },
      },
      {
        func: function () {
          Sh();
        },
      },
      {
        func: function () {
          Oh();
        },
      },
      {
        func: function () {
          Th();
        },
      },
      {
        func: function () {
          jh();
        },
      },
      {
        func: function () {
          Jg();
        },
      },
      {
        func: function () {
          Bh();
        },
      },
      {
        func: function () {
          Gh();
        },
      },
      {
        func: function () {
          Rh();
        },
      },
      {
        func: function () {
          Uh();
        },
      },
      {
        func: function () {
          Wh();
        },
      },
      {
        func: function () {
          zh();
        },
      },
      {
        func: function () {
          Vh();
        },
      },
      {
        func: function () {
          qh();
        },
      },
      {
        func: function () {
          Hh();
        },
      },
      {
        func: function () {
          tb();
        },
      },
      {
        func: function () {
          ig();
        },
      },
      {
        func: function () {
          tg();
        },
      },
      {
        func: function () {
          rg();
        },
      },
      {
        func: function () {
          og();
        },
      },
      {
        func: function () {
          ub();
        },
      },
      {
        func: function () {
          ag();
        },
      },
      {
        func: function () {
          ob();
        },
      },
      {
        func: function () {
          ug();
        },
      },
      {
        func: function () {
          lg();
        },
      },
      {
        func: function () {
          cg();
        },
      },
      {
        func: function () {
          ab();
        },
      },
      {
        func: function () {
          sg();
        },
      },
      {
        func: function () {
          fg();
        },
      },
      {
        func: function () {
          _g();
        },
      },
      {
        func: function () {
          pg();
        },
      },
      {
        func: function () {
          Vm();
        },
      },
      {
        func: function () {
          xh();
        },
      },
      {
        func: function () {
          Kg();
        },
      },
      {
        func: function () {
          $g();
        },
      },
      {
        func: function () {
          eb();
        },
      },
      {
        func: function () {
          xy();
        },
      },
      {
        func: function () {
          Dy();
        },
      },
      {
        func: function () {
          qv();
        },
      },
      {
        func: function () {
          Yv();
        },
      },
      {
        func: function () {
          Jv();
        },
      },
      {
        func: function () {
          Kv();
        },
      },
      {
        func: function () {
          Zv();
        },
      },
      {
        func: function () {
          Qv();
        },
      },
      {
        func: function () {
          Nh();
        },
      },
      {
        func: function () {
          Vv();
        },
      },
      {
        func: function () {
          Xh();
        },
      },
      {
        func: function () {
          Yh();
        },
      },
      {
        func: function () {
          Jh();
        },
      },
      {
        func: function () {
          Kh();
        },
      },
      {
        func: function () {
          Dh();
        },
      },
      {
        func: function () {
          Ph();
        },
      },
      {
        func: function () {
          Mh();
        },
      },
      {
        func: function () {
          Fh();
        },
      },
      {
        func: function () {
          Eg();
        },
      },
      {
        func: function () {
          Zh();
        },
      },
      {
        func: function () {
          Qh();
        },
      },
      {
        func: function () {
          $h();
        },
      },
      {
        func: function () {
          eg();
        },
      },
      {
        func: function () {
          ng();
        },
      },
      {
        func: function () {
          gv();
        },
      },
      {
        func: function () {
          bv();
        },
      },
      {
        func: function () {
          py();
        },
      },
      {
        func: function () {
          ry();
        },
      },
      {
        func: function () {
          yg();
        },
      },
      {
        func: function () {
          hv();
        },
      },
      {
        func: function () {
          Ym();
        },
      },
      {
        func: function () {
          ky();
        },
      },
      {
        func: function () {
          ey();
        },
      },
      {
        func: function () {
          Ay();
        },
      },
      {
        func: function () {
          ib();
        },
      },
      {
        func: function () {
          ny();
        },
      },
      {
        func: function () {
          Iy();
        },
      },
      {
        func: function () {
          nb();
        },
      },
      {
        func: function () {
          Sy();
        },
      },
      {
        func: function () {
          iy();
        },
      },
      {
        func: function () {
          ty();
        },
      },
      {
        func: function () {
          Oy();
        },
      },
      {
        func: function () {
          dv();
        },
      },
      {
        func: function () {
          Ty();
        },
      },
      {
        func: function () {
          pv();
        },
      },
      {
        func: function () {
          _v();
        },
      },
      {
        func: function () {
          hg();
        },
      },
      {
        func: function () {
          Og();
        },
      },
      {
        func: function () {
          mv();
        },
      },
      {
        func: function () {
          jy();
        },
      },
      {
        func: function () {
          By();
        },
      },
      {
        func: function () {
          vv();
        },
      },
      {
        func: function () {
          Gy();
        },
      },
      {
        func: function () {
          Ry();
        },
      },
      {
        func: function () {
          yv();
        },
      },
      {
        func: function () {
          Hg();
        },
      },
      {
        func: function () {
          gg();
        },
      },
      {
        func: function () {
          Py();
        },
      },
      {
        func: function () {
          Cg();
        },
      },
      {
        func: function () {
          My();
        },
      },
      {
        func: function () {
          Fy();
        },
      },
      {
        func: function () {
          rb();
        },
      },
      {
        func: function () {
          Ny();
        },
      },
      {
        func: function () {
          Uy();
        },
      },
      {
        func: function () {
          Wy();
        },
      },
      {
        func: function () {
          Lg();
        },
      },
      {
        func: function () {
          zy();
        },
      },
      {
        func: function () {
          kg();
        },
      },
      {
        func: function () {
          Vy();
        },
      },
      {
        func: function () {
          Ag();
        },
      },
      {
        func: function () {
          qy();
        },
      },
      {
        func: function () {
          Hy();
        },
      },
      {
        func: function () {
          Ig();
        },
      },
      {
        func: function () {
          Km();
        },
      },
      {
        func: function () {
          Sg();
        },
      },
      {
        func: function () {
          Xy();
        },
      },
      {
        func: function () {
          Yy();
        },
      },
      {
        func: function () {
          Jy();
        },
      },
      {
        func: function () {
          Xg();
        },
      },
      {
        func: function () {
          jg();
        },
      },
      {
        func: function () {
          Tg();
        },
      },
      {
        func: function () {
          Bg();
        },
      },
      {
        func: function () {
          Ky();
        },
      },
      {
        func: function () {
          Gg();
        },
      },
      {
        func: function () {
          Zy();
        },
      },
      {
        func: function () {
          Qy();
        },
      },
      {
        func: function () {
          $y();
        },
      },
      {
        func: function () {
          Pg();
        },
      },
      {
        func: function () {
          xg();
        },
      },
      {
        func: function () {
          tv();
        },
      },
      {
        func: function () {
          iv();
        },
      },
      {
        func: function () {
          Dg();
        },
      },
      {
        func: function () {
          Rg();
        },
      },
      {
        func: function () {
          ev();
        },
      },
      {
        func: function () {
          nv();
        },
      },
      {
        func: function () {
          wv();
        },
      },
      {
        func: function () {
          Mg();
        },
      },
      {
        func: function () {
          Ug();
        },
      },
      {
        func: function () {
          rv();
        },
      },
      {
        func: function () {
          Fg();
        },
      },
      {
        func: function () {
          Ng();
        },
      },
      {
        func: function () {
          ov();
        },
      },
      {
        func: function () {
          av();
        },
      },
      {
        func: function () {
          uv();
        },
      },
      {
        func: function () {
          lv();
        },
      },
      {
        func: function () {
          cv();
        },
      },
      {
        func: function () {
          sv();
        },
      },
      {
        func: function () {
          fv();
        },
      },
      {
        func: function () {
          Wg();
        },
      },
      {
        func: function () {
          Zm();
        },
      },
      {
        func: function () {
          cy();
        },
      },
      {
        func: function () {
          ay();
        },
      },
      {
        func: function () {
          fy();
        },
      },
      {
        func: function () {
          uy();
        },
      },
      {
        func: function () {
          sy();
        },
      },
      {
        func: function () {
          _y();
        },
      },
      {
        func: function () {
          ly();
        },
      },
      {
        func: function () {
          oy();
        },
      },
      {
        func: function () {
          lb();
        },
      }
    );
  var hn = 3834320;
  (e.STATIC_BASE = de), (e.STATIC_BUMP = hn);
  var gn = me;
  function bn(n, i) {
    for (var t = "", r = 0; r < i; r++) t += String.fromCharCode(ue[n + r]);
    e.canvas.style.cursor =
      "url(data:image/cur;base64," + btoa(t) + "),default";
  }
  function wn(n) {
    e.canvas.style.cursor = n ? "default" : "none";
  }
  function En(e) {
    window.clearInterval(e);
  }
  function Cn(e) {
    var n = X(e);
    window.open(n, "_blank", "");
  }
  function Ln(n, i, t) {
    return (
      (e.noExitRuntime = !0),
      hr.safeSetInterval(function () {
        O(n, "vi")(i);
      }, t)
    );
  }
  me += 16;
  var kn = {
    numPendingSync: 0,
    syncInternal: 1e3,
    syncInProgress: !1,
    sync: function (e) {
      if (e) {
        if (0 == kn.numPendingSync) return;
      } else if (kn.syncInProgress) return void kn.numPendingSync++;
      (kn.syncInProgress = !0),
        st.syncfs(!1, function (e) {
          kn.syncInProgress = !1;
        }),
        (kn.numPendingSync = 0);
    },
  };
  function An() {
    e.setInterval(function () {
      kn.sync(!0);
    }, kn.syncInternal);
  }
  function In() {
    kn.sync(!1);
  }
  function Sn(e, n) {
    var i = X(e);
    switch (("function" == typeof dump && dump(i), n)) {
      case 0:
      case 1:
      case 4:
        return void console.error(i);
      case 2:
        return void console.warn(i);
      case 3:
      case 5:
        return void console.log(i);
      default:
        console.error("Unknown console message type!"), console.error(i);
    }
  }
  function On(e, n) {
    var i = re();
    return e && Q(i, e, n), $(i);
  }
  var Tn = { audioInstances: [], audioContext: {}, audioWebEnabled: 0 };
  function jn(e, n) {
    if (0 != Tn.audioWebEnabled) {
      var i = {
        gain: Tn.audioContext.createGain(),
        panner: Tn.audioContext.createPanner(),
        threeD: !1,
        playBuffer: function (i, t, r) {
          this.source.buffer = t;
          var o = this;
          (this.source.onended = function () {
            e && j("vi", e, [n]), o.setup();
          }),
            this.source.start(i, r);
        },
        setup: function () {
          (this.source = Tn.audioContext.createBufferSource()),
            this.setupPanning();
        },
        setupPanning: function () {
          this.threeD
            ? (this.source.disconnect(),
              this.source.connect(this.panner),
              this.panner.connect(this.gain))
            : (this.panner.disconnect(), this.source.connect(this.gain));
        },
      };
      return (
        (i.panner.rolloffFactor = 0),
        i.gain.connect(Tn.audioContext.destination),
        i.setup(),
        Tn.audioInstances.push(i) - 1
      );
    }
  }
  function Bn(e) {
    if (0 == Tn.audioWebEnabled) return 0;
    var n = Tn.audioInstances[e],
      i = 44100 / n.buffer.sampleRate;
    return n.buffer.length * i;
  }
  function Gn(e) {
    if (0 == Tn.audioWebEnabled) return 2;
    var n = Tn.audioInstances[e];
    return n.error ? 2 : n.buffer ? 0 : 1;
  }
  function Rn() {
    try {
      (window.AudioContext = window.AudioContext || window.webkitAudioContext),
        (Tn.audioContext = new AudioContext());
      var n = e.setInterval(function () {
        "suspended" === Tn.audioContext.state
          ? Tn.audioContext.resume()
          : e.clearInterval(n);
      }, 400);
      Tn.audioWebEnabled = 1;
    } catch (e) {
      alert("Web Audio API is not supported in this browser");
    }
  }
  function xn(e, n) {
    if (0 == Tn.audioWebEnabled) return 0;
    var i = { buffer: null, error: !1 },
      t = Tn.audioInstances.push(i) - 1,
      r = ue.buffer.slice(e, e + n);
    return (
      Tn.audioContext.decodeAudioData(
        r,
        function (e) {
          i.buffer = e;
        },
        function () {
          (i.error = !0), console.log("Decode error.");
        }
      ),
      t
    );
  }
  function Dn(e, n, i, t) {
    if (0 == Tn.audioWebEnabled) return 0;
    for (
      var r = { buffer: Tn.audioContext.createBuffer(e, n, i), error: !1 },
        o = 0;
      o < e;
      o++
    ) {
      var a = (t >> 2) + n * o,
        u = r.buffer;
      (
        u.copyToChannel ||
        function (e, n, i) {
          var t = e.subarray(0, Math.min(e.length, this.length - (0 | i)));
          this.getChannelData(0 | n).set(t, 0 | i);
        }
      ).apply(u, [_e.subarray(a, a + n), o, 0]);
    }
    return Tn.audioInstances.push(r) - 1;
  }
  function Pn(e, n, i, t) {
    if ((Yn(n, 0), 0 != Tn.audioWebEnabled)) {
      var r = Tn.audioInstances[e],
        o = Tn.audioInstances[n];
      if (r.buffer)
        try {
          o.playBuffer(Tn.audioContext.currentTime + t, r.buffer, i);
        } catch (e) {
          console.error("playBuffer error. Exception: " + e);
        }
      else console.log("Trying to play sound which is not loaded.");
    }
  }
  function Mn(e) {
    Tn.audioInstances[e] = null;
  }
  function Fn() {
    0 != Tn.audioWebEnabled &&
      "suspended" === Tn.audioContext.state &&
      Tn.audioContext.resume();
  }
  function Nn(e, n) {
    var i = Tn.audioInstances[e];
    i.threeD != n && ((i.threeD = n), i.setupPanning());
  }
  function Un(e, n, i, t, r, o) {
    0 != Tn.audioWebEnabled &&
      (Tn.audioContext.listener.forwardX
        ? (Tn.audioContext.listener.forwardX.setValueAtTime(
            -e,
            Tn.audioContext.currentTime
          ),
          Tn.audioContext.listener.forwardY.setValueAtTime(
            -n,
            Tn.audioContext.currentTime
          ),
          Tn.audioContext.listener.forwardZ.setValueAtTime(
            -i,
            Tn.audioContext.currentTime
          ),
          Tn.audioContext.listener.upX.setValueAtTime(
            t,
            Tn.audioContext.currentTime
          ),
          Tn.audioContext.listener.upY.setValueAtTime(
            r,
            Tn.audioContext.currentTime
          ),
          Tn.audioContext.listener.upZ.setValueAtTime(
            o,
            Tn.audioContext.currentTime
          ))
        : Tn.audioContext.listener.setOrientation(-e, -n, -i, t, r, o));
  }
  function Wn(e, n, i) {
    0 != Tn.audioWebEnabled &&
      (Tn.audioContext.listener.positionX
        ? (Tn.audioContext.listener.positionX.setValueAtTime(
            e,
            Tn.audioContext.currentTime
          ),
          Tn.audioContext.listener.positionY.setValueAtTime(
            n,
            Tn.audioContext.currentTime
          ),
          Tn.audioContext.listener.positionZ.setValueAtTime(
            i,
            Tn.audioContext.currentTime
          ))
        : Tn.audioContext.listener.setPosition(e, n, i));
  }
  function zn(e, n) {
    0 != Tn.audioWebEnabled && (Tn.audioInstances[e].source.loop = n);
  }
  function Vn(e, n, i) {
    if (0 != Tn.audioWebEnabled) {
      var t = Tn.audioInstances[e];
      (t.source.loopStart = n), (t.source.loopEnd = i);
    }
  }
  function qn(e, n) {
    if (0 != Tn.audioWebEnabled)
      try {
        Tn.audioInstances[e].source.playbackRate.setValueAtTime(
          n,
          Tn.audioContext.currentTime
        );
      } catch (e) {
        console.error(
          "Invalid audio pitch " + n + " specified to WebAudio backend!"
        );
      }
  }
  function Hn(e, n, i, t) {
    0 != Tn.audioWebEnabled && Tn.audioInstances[e].panner.setPosition(n, i, t);
  }
  function Xn(e, n) {
    if (0 != Tn.audioWebEnabled)
      try {
        Tn.audioInstances[e].gain.gain.setValueAtTime(
          n,
          Tn.audioContext.currentTime
        );
      } catch (e) {
        console.error(
          "Invalid audio volume " + n + " specified to WebAudio backend!"
        );
      }
  }
  function Yn(e, n) {
    if (0 != Tn.audioWebEnabled) {
      var i = Tn.audioInstances[e];
      if (i.source.buffer) {
        try {
          i.source.stop(Tn.audioContext.currentTime + n);
        } catch (e) {
          i.source.disconnect();
        }
        0 == n && ((i.source.onended = function () {}), i.setup());
      }
    }
  }
  function Jn(n, i) {
    var t = e.SystemInfo.browser;
    return n && Q(t, n, i), $(t);
  }
  function Kn(n, i) {
    var t = e.SystemInfo.browserVersion;
    return n && Q(t, n, i), $(t);
  }
  function Zn(n, i, t) {
    var r = K(n),
      o = "#canvas" == r ? e.canvas : document.querySelector(r);
    (pe[i >> 3] = o ? o.clientWidth : 0), (pe[t >> 3] = o ? o.clientHeight : 0);
  }
  function Qn(e, n) {
    return e && Q(document.URL, e, n), $(document.URL);
  }
  function $n(n, i) {
    var t = e.SystemInfo.gpu;
    return n && Q(t, n, i), $(t);
  }
  function ei(n, i) {
    var t = e.SystemInfo.language;
    return n && Q(t, n, i), $(t);
  }
  function ni() {
    return e.matchWebGLToCanvasSize || void 0 === e.matchWebGLToCanvasSize;
  }
  function ii() {
    return Be / 1048576;
  }
  function ti(n, i) {
    var t = e.SystemInfo.os + " " + e.SystemInfo.osVersion;
    return n && Q(t, n, i), $(t);
  }
  function ri() {
    return e.devicePixelRatio || window.devicePixelRatio || 1;
  }
  function oi(n, i) {
    (pe[n >> 3] = e.SystemInfo.width), (pe[i >> 3] = e.SystemInfo.height);
  }
  function ai(n, i) {
    return n && Q(e.streamingAssetsUrl, n, i), $(e.streamingAssetsUrl);
  }
  function ui() {
    return e.SystemInfo.hasCursorLock;
  }
  function li() {
    return e.SystemInfo.hasFullscreen;
  }
  function ci() {
    return e.SystemInfo.hasWebGL;
  }
  var si = { requestInstances: {}, nextRequestId: 1 };
  function fi(e) {
    si.requestInstances[e].abort();
  }
  function _i(n, i) {
    var t = X(n),
      r = X(i),
      o =
        e.companyName && e.productName && e.XMLHttpRequest
          ? new e.XMLHttpRequest({
              companyName: e.companyName,
              productName: e.productName,
              cacheControl: e.cacheControl(t),
            })
          : new XMLHttpRequest();
    return (
      o.open(r, t, !0),
      (o.responseType = "arraybuffer"),
      (si.requestInstances[si.nextRequestId] = o),
      si.nextRequestId++
    );
  }
  function pi(e, n, i) {
    var t = si.requestInstances[e].getAllResponseHeaders();
    return n && Q(t, n, i), $(t);
  }
  function di(e) {
    var n = si.requestInstances[e];
    (n.onload = null),
      (n.onerror = null),
      (n.ontimeout = null),
      (n.onabort = null),
      delete n,
      (si.requestInstances[e] = null);
  }
  function mi(e, n, i) {
    var t = si.requestInstances[e];
    try {
      if (i > 0) {
        var r = ue.subarray(n, n + i);
        t.send(r);
      } else t.send();
    } catch (e) {
      console.error(e.name + ": " + e.message);
    }
  }
  function yi(e, n, i) {
    si.requestInstances[e].onprogress = function (e) {
      i && e.lengthComputable && j("viii", i, [n, e.loaded, e.total]);
    };
  }
  function vi(e, n, i) {
    var t = X(n),
      r = X(i);
    si.requestInstances[e].setRequestHeader(t, r);
  }
  function hi(e, n, i) {
    var t = si.requestInstances[e];
    function r(e, r) {
      if (i) {
        var o = $(e) + 1,
          a = hb(o);
        Q(e, a, o), j("viiiiii", i, [n, t.status, 0, 0, a, r]), db(a);
      }
    }
    (t.onload = function (e) {
      if (i) {
        var r = new Uint8Array(t.response);
        if (0 != r.length) {
          var o = hb(r.length);
          ue.set(r, o), j("viiiiii", i, [n, t.status, o, r.length, 0, 0]);
        } else j("viiiiii", i, [n, t.status, 0, 0, 0, 0]);
      }
    }),
      (t.onerror = function (e) {
        r("Unknown error.", 2);
      }),
      (t.ontimeout = function (e) {
        r("Connection timed out.", 14);
      }),
      (t.onabort = function (e) {
        r("Aborted.", 17);
      });
  }
  function gi(e, n) {
    si.requestInstances[e].timeout = n;
  }
  function bi(e) {
    var n = X(e);
    document.onmouseup = function () {
      window.open(n), (document.onmouseup = null);
    };
  }
  function wi() {
    if (void 0 === window.guavamanEnterprisesRewired) return null;
    var e = JSON.stringify(window.guavamanEnterprisesRewired.GetClientInfo()),
      n = window.guavamanEnterprisesRewired.lengthBytesUTF8(e) + 1,
      i = hb(n);
    return window.guavamanEnterprisesRewired.stringToUTF8(e, i, n), i;
  }
  function Ei(e) {
    if (void 0 === window.guavamanEnterprisesRewired) return 0;
    var n = guavamanEnterprisesRewired.GetGamepad(e);
    return null === n ? 0 : n.axes.length;
  }
  function Ci(e, n) {
    if (void 0 === window.guavamanEnterprisesRewired) return 0;
    var i = guavamanEnterprisesRewired.GetGamepad(e);
    return null === i || n < 0 || n >= i.axes.length ? 0 : i.axes[n];
  }
  function Li(e) {
    if (void 0 === window.guavamanEnterprisesRewired) return 0;
    var n = guavamanEnterprisesRewired.GetGamepad(e);
    return null === n ? 0 : n.buttons.length;
  }
  function ki(e, n) {
    if (void 0 === window.guavamanEnterprisesRewired) return !1;
    var i = guavamanEnterprisesRewired.GetGamepad(e);
    if (null === i) return !1;
    if (n < 0 || n >= i.buttons.length) return !1;
    var t = i.buttons[n];
    return "object" == typeof t ? t.pressed : "number" == typeof t && t > 0;
  }
  function Ai(e, n) {
    if (void 0 === window.guavamanEnterprisesRewired) return 0;
    var i = guavamanEnterprisesRewired.GetGamepad(e);
    if (null === i) return 0;
    if (n < 0 || n >= i.buttons.length) return 0;
    var t = i.buttons[n];
    return "object" == typeof t ? t.value : "number" == typeof t ? t : 0;
  }
  function Ii(e) {
    if (void 0 === window.guavamanEnterprisesRewired) return !1;
    var n = guavamanEnterprisesRewired.GetGamepad(e);
    return null !== n && !!n.connected;
  }
  function Si(e) {
    if (void 0 === window.guavamanEnterprisesRewired) return 0;
    var n = guavamanEnterprisesRewired.GetGamepad(e);
    return null === n ? 0 : "standard" === n.mapping ? 1 : 0;
  }
  function Oi(e) {
    if (void 0 === window.guavamanEnterprisesRewired) return null;
    var n = guavamanEnterprisesRewired.GetGamepad(e);
    if (null === n) return null;
    var i = n.id;
    if (null === i) return null;
    var t = window.guavamanEnterprisesRewired.lengthBytesUTF8(i) + 1,
      r = hb(t);
    return window.guavamanEnterprisesRewired.stringToUTF8(i, r, t), r;
  }
  function Ti(e) {
    if (void 0 === window.guavamanEnterprisesRewired) return 0;
    var n = guavamanEnterprisesRewired.GetGamepad(e);
    return null === n
      ? 0
      : window.guavamanEnterprisesRewired.GetHashForString(n.id);
  }
  function ji() {
    if (void 0 === window.guavamanEnterprisesRewired) return -1;
    var e = window.guavamanEnterprisesRewired.GetGamepads();
    if (null === e) return -1;
    for (var n = -1, i = 0; i < e.length; i++)
      e[i] && e[i].connected && e[i].index > n && (n = e[i].index);
    return n;
  }
  function Bi() {
    if (void 0 === window.guavamanEnterprisesRewired) {
      var e = {
        IsGamepadAPIAvailable: function () {
          return (
            void 0 !==
            (navigator.getGamepads ||
              navigator.webkitGamepads ||
              navigator.mozGamepads ||
              navigator.gamepads ||
              navigator.webkitGetGamepads)
          );
        },
        GetGamepads: function () {
          var e =
            navigator.getGamepads ||
            navigator.webkitGamepads ||
            navigator.mozGamepads ||
            navigator.gamepads ||
            navigator.webkitGetGamepads;
          return void 0 !== e ? e.apply(navigator) : [];
        },
        GetCurrentGamepadCount: function () {
          var e = this.GetGamepads();
          if (null === e) return 0;
          for (var n = 0, i = 0; i < e.length; i++)
            e[i] && e[i].connected && n++;
          return n;
        },
        GamepadExists: function (e) {
          return null !== this.GetGamepad(e);
        },
        GetGamepad: function (e) {
          var n = this.GetGamepads();
          if (null === n) return null;
          for (var i = 0; i < n.length; i++)
            if (n[i] && n[i].index == e) return n[i];
          return null;
        },
        CheckEvent: function () {
          return !1 !== this.eventReceived && ((this.eventReceived = !1), !0);
        },
        GetClientInfo: function () {
          var e,
            n,
            i,
            t = navigator.appVersion,
            r = navigator.userAgent,
            o = navigator.appName,
            a = "" + parseFloat(navigator.appVersion),
            u = parseInt(navigator.appVersion, 10);
          -1 != (n = r.indexOf("Opera")) &&
            ((o = "Opera"),
            (a = r.substring(n + 6)),
            -1 != (n = r.indexOf("Version")) && (a = r.substring(n + 8))),
            -1 != (n = r.indexOf("OPR"))
              ? ((o = "Opera"), (a = r.substring(n + 4)))
              : -1 != (n = r.indexOf("Edge"))
              ? ((o = "Microsoft Edge"), (a = r.substring(n + 5)))
              : -1 != (n = r.indexOf("MSIE"))
              ? ((o = "Microsoft Internet Explorer"), (a = r.substring(n + 5)))
              : -1 != (n = r.indexOf("Chrome"))
              ? ((o = "Chrome"), (a = r.substring(n + 7)))
              : -1 != (n = r.indexOf("Safari"))
              ? ((o = "Safari"),
                (a = r.substring(n + 7)),
                -1 != (n = r.indexOf("Version")) && (a = r.substring(n + 8)))
              : -1 != (n = r.indexOf("Firefox"))
              ? ((o = "Firefox"), (a = r.substring(n + 8)))
              : -1 != r.indexOf("Trident/")
              ? ((o = "Microsoft Internet Explorer"),
                (a = r.substring(r.indexOf("rv:") + 3)))
              : (e = r.lastIndexOf(" ") + 1) < (n = r.lastIndexOf("/")) &&
                ((o = r.substring(e, n)),
                (a = r.substring(n + 1)),
                o.toLowerCase() == o.toUpperCase() && (o = navigator.appName)),
            -1 != (i = a.indexOf(";")) && (a = a.substring(0, i)),
            -1 != (i = a.indexOf(" ")) && (a = a.substring(0, i)),
            -1 != (i = a.indexOf(")")) && (a = a.substring(0, i)),
            (u = parseInt("" + a, 10)),
            isNaN(u) &&
              ((a = "" + parseFloat(navigator.appVersion)),
              (u = parseInt(navigator.appVersion, 10)));
          var l = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(t),
            c = "-",
            s = [
              { s: "Windows 10", r: /(Windows 10.0|Windows NT 10.0)/ },
              { s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/ },
              { s: "Windows 8", r: /(Windows 8|Windows NT 6.2)/ },
              { s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/ },
              { s: "Windows Vista", r: /Windows NT 6.0/ },
              { s: "Windows Server 2003", r: /Windows NT 5.2/ },
              { s: "Windows XP", r: /(Windows NT 5.1|Windows XP)/ },
              { s: "Windows 2000", r: /(Windows NT 5.0|Windows 2000)/ },
              { s: "Windows ME", r: /(Win 9x 4.90|Windows ME)/ },
              { s: "Windows 98", r: /(Windows 98|Win98)/ },
              { s: "Windows 95", r: /(Windows 95|Win95|Windows_95)/ },
              {
                s: "Windows NT 4.0",
                r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/,
              },
              { s: "Windows CE", r: /Windows CE/ },
              { s: "Windows 3.11", r: /Win16/ },
              { s: "Android", r: /Android/ },
              { s: "Open BSD", r: /OpenBSD/ },
              { s: "Sun OS", r: /SunOS/ },
              { s: "Linux", r: /(Linux|X11)/ },
              { s: "iOS", r: /(iPhone|iPad|iPod)/ },
              { s: "Mac OS X", r: /Mac OS X/ },
              { s: "Mac OS", r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
              { s: "QNX", r: /QNX/ },
              { s: "UNIX", r: /UNIX/ },
              { s: "BeOS", r: /BeOS/ },
              { s: "OS/2", r: /OS\/2/ },
              {
                s: "Search Bot",
                r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
              },
            ];
          for (var f in s) {
            var _ = s[f];
            if (_.r.test(r)) {
              c = _.s;
              break;
            }
          }
          var p = "-";
          switch (
            (/Windows/.test(c) &&
              ((p = /Windows (.*)/.exec(c)[1]), (c = "Windows")),
            c)
          ) {
            case "Mac OS X":
              p = /Mac OS X ([\.\_\d]+)/.exec(r)[1];
              break;
            case "Android":
              p = /Android ([\.\_\d]+)/.exec(r)[1];
              break;
            case "iOS":
              p =
                (p = /OS (\d+)_(\d+)_?(\d+)?/.exec(t))[1] +
                "." +
                p[2] +
                "." +
                (0 | p[3]);
          }
          return {
            browser: o,
            browserVersion: a,
            browserMajorVersion: u,
            mobile: l,
            os: c,
            osVersion: p,
          };
        },
        GetHashForString: function (e) {
          var n,
            i = 0;
          if (0 === e.length) return i;
          for (n = 0; n < e.length; n++)
            (i = (i << 5) - i + e.charCodeAt(n)), (i |= 0);
          return i;
        },
        lengthBytesUTF8: function (e) {
          for (var n = 0, i = 0; i < e.length; ++i) {
            var t = e.charCodeAt(i);
            t >= 55296 &&
              t <= 57343 &&
              (t = (65536 + ((1023 & t) << 10)) | (1023 & e.charCodeAt(++i))),
              t <= 127
                ? ++n
                : (n +=
                    t <= 2047
                      ? 2
                      : t <= 65535
                      ? 3
                      : t <= 2097151
                      ? 4
                      : t <= 67108863
                      ? 5
                      : 6);
          }
          return n;
        },
        stringToUTF8Array: function (e, n, i, t) {
          if (t > 0) {
            for (var r = i, o = i + t - 1, a = 0; a < e.length; ++a) {
              var u = e.charCodeAt(a);
              if (
                (u >= 55296 &&
                  u <= 57343 &&
                  (u =
                    (65536 + ((1023 & u) << 10)) | (1023 & e.charCodeAt(++a))),
                u <= 127)
              ) {
                if (i >= o) break;
                n[i++] = u;
              } else if (u <= 2047) {
                if (i + 1 >= o) break;
                (n[i++] = 192 | (u >> 6)), (n[i++] = 128 | (63 & u));
              } else if (u <= 65535) {
                if (i + 2 >= o) break;
                (n[i++] = 224 | (u >> 12)),
                  (n[i++] = 128 | ((u >> 6) & 63)),
                  (n[i++] = 128 | (63 & u));
              } else if (u <= 2097151) {
                if (i + 3 >= o) break;
                (n[i++] = 240 | (u >> 18)),
                  (n[i++] = 128 | ((u >> 12) & 63)),
                  (n[i++] = 128 | ((u >> 6) & 63)),
                  (n[i++] = 128 | (63 & u));
              } else if (u <= 67108863) {
                if (i + 4 >= o) break;
                (n[i++] = 248 | (u >> 24)),
                  (n[i++] = 128 | ((u >> 18) & 63)),
                  (n[i++] = 128 | ((u >> 12) & 63)),
                  (n[i++] = 128 | ((u >> 6) & 63)),
                  (n[i++] = 128 | (63 & u));
              } else {
                if (i + 5 >= o) break;
                (n[i++] = 252 | (u >> 30)),
                  (n[i++] = 128 | ((u >> 24) & 63)),
                  (n[i++] = 128 | ((u >> 18) & 63)),
                  (n[i++] = 128 | ((u >> 12) & 63)),
                  (n[i++] = 128 | ((u >> 6) & 63)),
                  (n[i++] = 128 | (63 & u));
              }
            }
            return (n[i] = 0), i - r;
          }
          return 0;
        },
        stringToUTF8: function (e, n, i) {
          return this.stringToUTF8Array(e, ue, n, i);
        },
      };
      window.guavamanEnterprisesRewired = e;
    }
  }
  function Gi(e) {
    var n = window.location.origin + window.location.pathname + "#" + X(e);
    window.history.replaceState(null, "", n);
  }
  function Ri(e, n, i, t, r, o, a) {
    var u = se[e >> 2],
      l = se[(e + 4) >> 2],
      c = se[n >> 2],
      s = se[(n + 4) >> 2];
    return u === c && l === s
      ? ((se[e >> 2] = i), (se[(e + 4) >> 2] = t), 1)
      : ((se[n >> 2] = u), (se[(n + 4) >> 2] = l), 0);
  }
  function xi(e, n, i, t) {
    var r = se[e >> 2],
      o = se[(e + 4) >> 2];
    return (
      (se[e >> 2] = vb(r, o, n, i)), (se[(e + 4) >> 2] = Cb()), 0 | (Lb(o), r)
    );
  }
  var Di = {};
  function Pi(n) {
    var i, t;
    Pi.called
      ? ((t = se[n >> 2]), (i = se[t >> 2]))
      : ((Pi.called = !0),
        (Di.USER = Di.LOGNAME = "web_user"),
        (Di.PATH = "/"),
        (Di.PWD = "/"),
        (Di.HOME = "/home/web_user"),
        (Di.LANG = "C.UTF-8"),
        (Di._ = e.thisProgram),
        (i = H(1024)),
        (t = H(256)),
        (se[t >> 2] = i),
        (se[n >> 2] = t));
    var r = [],
      o = 0;
    for (var a in Di)
      if ("string" == typeof Di[a]) {
        var u = a + "=" + Di[a];
        r.push(u), (o += u.length);
      }
    if (o > 1024) throw new Error("Environment size exceeded TOTAL_ENV_SIZE!");
    for (var l = 0; l < r.length; l++) {
      Je((u = r[l]), i), (se[(t + 4 * l) >> 2] = i), (i += u.length + 1);
    }
    se[(t + 4 * r.length) >> 2] = 0;
  }
  function Mi(e) {
    return hb(e);
  }
  function Fi() {
    return !!Fi.uncaught_exception;
  }
  var Ni = {
    last: 0,
    caught: [],
    infos: {},
    deAdjust: function (e) {
      if (!e || Ni.infos[e]) return e;
      for (var n in Ni.infos) {
        var i = +n;
        if (Ni.infos[i].adjusted === e) return i;
      }
      return e;
    },
    addRef: function (e) {
      e && Ni.infos[e].refcount++;
    },
    decRef: function (n) {
      if (n) {
        var i = Ni.infos[n];
        R(i.refcount > 0),
          i.refcount--,
          0 !== i.refcount ||
            i.rethrown ||
            (i.destructor && e.dynCall_vi(i.destructor, n),
            delete Ni.infos[n],
            Wi(n));
      }
    },
    clearRef: function (e) {
      e && (Ni.infos[e].refcount = 0);
    },
  };
  function Ui(e) {
    var n = Ni.infos[e];
    return (
      n && !n.caught && ((n.caught = !0), Fi.uncaught_exception--),
      n && (n.rethrown = !1),
      Ni.caught.push(e),
      Ni.addRef(Ni.deAdjust(e)),
      e
    );
  }
  function Wi(e) {
    try {
      return db(e);
    } catch (e) {}
  }
  function zi() {
    e.setThrew(0);
    var n = Ni.caught.pop();
    n && (Ni.decRef(Ni.deAdjust(n)), (Ni.last = 0));
  }
  function Vi() {
    return Ki.apply(null, arguments);
  }
  function qi() {
    return Ki.apply(null, arguments);
  }
  function Hi() {
    return Ki.apply(null, arguments);
  }
  function Xi() {
    throw ((G = !0), "Pure virtual function called!");
  }
  function Yi() {
    var e = Ni.caught.pop();
    throw (
      ((e = Ni.deAdjust(e)),
      Ni.infos[e].rethrown || (Ni.caught.push(e), (Ni.infos[e].rethrown = !0)),
      (Ni.last = e),
      e)
    );
  }
  function Ji(e) {
    throw (Ni.last || (Ni.last = e), e);
  }
  function Ki() {
    var n = Ni.last;
    if (!n) return 0 | (Lb(0), 0);
    var i = Ni.infos[n],
      t = i.type;
    if (!t) return 0 | (Lb(0), n);
    var r = Array.prototype.slice.call(arguments);
    e.___cxa_is_pointer_type(t);
    Ki.buffer || (Ki.buffer = hb(4)), (se[Ki.buffer >> 2] = n), (n = Ki.buffer);
    for (var o = 0; o < r.length; o++)
      if (r[o] && e.___cxa_can_catch(r[o], t, n))
        return (n = se[n >> 2]), (i.adjusted = n), 0 | (Lb(r[o]), n);
    return (n = se[n >> 2]), 0 | (Lb(t), n);
  }
  function Zi(e, n, i) {
    throw (
      ((Ni.infos[e] = {
        ptr: e,
        adjusted: e,
        type: n,
        destructor: i,
        refcount: 0,
        caught: !1,
        rethrown: !1,
      }),
      (Ni.last = e),
      "uncaught_exception" in Fi
        ? Fi.uncaught_exception++
        : (Fi.uncaught_exception = 1),
      e)
    );
  }
  function Qi() {}
  function $i() {}
  var et = {
    EPERM: 1,
    ENOENT: 2,
    ESRCH: 3,
    EINTR: 4,
    EIO: 5,
    ENXIO: 6,
    E2BIG: 7,
    ENOEXEC: 8,
    EBADF: 9,
    ECHILD: 10,
    EAGAIN: 11,
    EWOULDBLOCK: 11,
    ENOMEM: 12,
    EACCES: 13,
    EFAULT: 14,
    ENOTBLK: 15,
    EBUSY: 16,
    EEXIST: 17,
    EXDEV: 18,
    ENODEV: 19,
    ENOTDIR: 20,
    EISDIR: 21,
    EINVAL: 22,
    ENFILE: 23,
    EMFILE: 24,
    ENOTTY: 25,
    ETXTBSY: 26,
    EFBIG: 27,
    ENOSPC: 28,
    ESPIPE: 29,
    EROFS: 30,
    EMLINK: 31,
    EPIPE: 32,
    EDOM: 33,
    ERANGE: 34,
    ENOMSG: 42,
    EIDRM: 43,
    ECHRNG: 44,
    EL2NSYNC: 45,
    EL3HLT: 46,
    EL3RST: 47,
    ELNRNG: 48,
    EUNATCH: 49,
    ENOCSI: 50,
    EL2HLT: 51,
    EDEADLK: 35,
    ENOLCK: 37,
    EBADE: 52,
    EBADR: 53,
    EXFULL: 54,
    ENOANO: 55,
    EBADRQC: 56,
    EBADSLT: 57,
    EDEADLOCK: 35,
    EBFONT: 59,
    ENOSTR: 60,
    ENODATA: 61,
    ETIME: 62,
    ENOSR: 63,
    ENONET: 64,
    ENOPKG: 65,
    EREMOTE: 66,
    ENOLINK: 67,
    EADV: 68,
    ESRMNT: 69,
    ECOMM: 70,
    EPROTO: 71,
    EMULTIHOP: 72,
    EDOTDOT: 73,
    EBADMSG: 74,
    ENOTUNIQ: 76,
    EBADFD: 77,
    EREMCHG: 78,
    ELIBACC: 79,
    ELIBBAD: 80,
    ELIBSCN: 81,
    ELIBMAX: 82,
    ELIBEXEC: 83,
    ENOSYS: 38,
    ENOTEMPTY: 39,
    ENAMETOOLONG: 36,
    ELOOP: 40,
    EOPNOTSUPP: 95,
    EPFNOSUPPORT: 96,
    ECONNRESET: 104,
    ENOBUFS: 105,
    EAFNOSUPPORT: 97,
    EPROTOTYPE: 91,
    ENOTSOCK: 88,
    ENOPROTOOPT: 92,
    ESHUTDOWN: 108,
    ECONNREFUSED: 111,
    EADDRINUSE: 98,
    ECONNABORTED: 103,
    ENETUNREACH: 101,
    ENETDOWN: 100,
    ETIMEDOUT: 110,
    EHOSTDOWN: 112,
    EHOSTUNREACH: 113,
    EINPROGRESS: 115,
    EALREADY: 114,
    EDESTADDRREQ: 89,
    EMSGSIZE: 90,
    EPROTONOSUPPORT: 93,
    ESOCKTNOSUPPORT: 94,
    EADDRNOTAVAIL: 99,
    ENETRESET: 102,
    EISCONN: 106,
    ENOTCONN: 107,
    ETOOMANYREFS: 109,
    EUSERS: 87,
    EDQUOT: 122,
    ESTALE: 116,
    ENOTSUP: 95,
    ENOMEDIUM: 123,
    EILSEQ: 84,
    EOVERFLOW: 75,
    ECANCELED: 125,
    ENOTRECOVERABLE: 131,
    EOWNERDEAD: 130,
    ESTRPIPE: 86,
  };
  function nt(n) {
    return e.___errno_location && (se[e.___errno_location() >> 2] = n), n;
  }
  function it(e, n) {
    return nt(et.EPERM), -1;
  }
  var tt = {
      0: "Success",
      1: "Not super-user",
      2: "No such file or directory",
      3: "No such process",
      4: "Interrupted system call",
      5: "I/O error",
      6: "No such device or address",
      7: "Arg list too long",
      8: "Exec format error",
      9: "Bad file number",
      10: "No children",
      11: "No more processes",
      12: "Not enough core",
      13: "Permission denied",
      14: "Bad address",
      15: "Block device required",
      16: "Mount device busy",
      17: "File exists",
      18: "Cross-device link",
      19: "No such device",
      20: "Not a directory",
      21: "Is a directory",
      22: "Invalid argument",
      23: "Too many open files in system",
      24: "Too many open files",
      25: "Not a typewriter",
      26: "Text file busy",
      27: "File too large",
      28: "No space left on device",
      29: "Illegal seek",
      30: "Read only file system",
      31: "Too many links",
      32: "Broken pipe",
      33: "Math arg out of domain of func",
      34: "Math result not representable",
      35: "File locking deadlock error",
      36: "File or path name too long",
      37: "No record locks available",
      38: "Function not implemented",
      39: "Directory not empty",
      40: "Too many symbolic links",
      42: "No message of desired type",
      43: "Identifier removed",
      44: "Channel number out of range",
      45: "Level 2 not synchronized",
      46: "Level 3 halted",
      47: "Level 3 reset",
      48: "Link number out of range",
      49: "Protocol driver not attached",
      50: "No CSI structure available",
      51: "Level 2 halted",
      52: "Invalid exchange",
      53: "Invalid request descriptor",
      54: "Exchange full",
      55: "No anode",
      56: "Invalid request code",
      57: "Invalid slot",
      59: "Bad font file fmt",
      60: "Device not a stream",
      61: "No data (for no delay io)",
      62: "Timer expired",
      63: "Out of streams resources",
      64: "Machine is not on the network",
      65: "Package not installed",
      66: "The object is remote",
      67: "The link has been severed",
      68: "Advertise error",
      69: "Srmount error",
      70: "Communication error on send",
      71: "Protocol error",
      72: "Multihop attempted",
      73: "Cross mount point (not really error)",
      74: "Trying to read unreadable message",
      75: "Value too large for defined data type",
      76: "Given log. name not unique",
      77: "f.d. invalid for this operation",
      78: "Remote address changed",
      79: "Can   access a needed shared lib",
      80: "Accessing a corrupted shared lib",
      81: ".lib section in a.out corrupted",
      82: "Attempting to link in too many libs",
      83: "Attempting to exec a shared library",
      84: "Illegal byte sequence",
      86: "Streams pipe error",
      87: "Too many users",
      88: "Socket operation on non-socket",
      89: "Destination address required",
      90: "Message too long",
      91: "Protocol wrong type for socket",
      92: "Protocol not available",
      93: "Unknown protocol",
      94: "Socket type not supported",
      95: "Not supported",
      96: "Protocol family not supported",
      97: "Address family not supported by protocol family",
      98: "Address already in use",
      99: "Address not available",
      100: "Network interface is not configured",
      101: "Network is unreachable",
      102: "Connection reset by network",
      103: "Connection aborted",
      104: "Connection reset by peer",
      105: "No buffer space available",
      106: "Socket is already connected",
      107: "Socket is not connected",
      108: "Can't send after socket shutdown",
      109: "Too many references",
      110: "Connection timed out",
      111: "Connection refused",
      112: "Host is down",
      113: "Host is unreachable",
      114: "Socket already connected",
      115: "Connection already in progress",
      116: "Stale file handle",
      122: "Quota exceeded",
      123: "No medium (in tape drive)",
      125: "Operation canceled",
      130: "Previous owner died",
      131: "State not recoverable",
    },
    rt = {
      splitPath: function (e) {
        return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
          .exec(e)
          .slice(1);
      },
      normalizeArray: function (e, n) {
        for (var i = 0, t = e.length - 1; t >= 0; t--) {
          var r = e[t];
          "." === r
            ? e.splice(t, 1)
            : ".." === r
            ? (e.splice(t, 1), i++)
            : i && (e.splice(t, 1), i--);
        }
        if (n) for (; i; i--) e.unshift("..");
        return e;
      },
      normalize: function (e) {
        var n = "/" === e.charAt(0),
          i = "/" === e.substr(-1);
        return (
          (e = rt
            .normalizeArray(
              e.split("/").filter(function (e) {
                return !!e;
              }),
              !n
            )
            .join("/")) ||
            n ||
            (e = "."),
          e && i && (e += "/"),
          (n ? "/" : "") + e
        );
      },
      dirname: function (e) {
        var n = rt.splitPath(e),
          i = n[0],
          t = n[1];
        return i || t ? (t && (t = t.substr(0, t.length - 1)), i + t) : ".";
      },
      basename: function (e) {
        if ("/" === e) return "/";
        var n = e.lastIndexOf("/");
        return -1 === n ? e : e.substr(n + 1);
      },
      extname: function (e) {
        return rt.splitPath(e)[3];
      },
      join: function () {
        var e = Array.prototype.slice.call(arguments, 0);
        return rt.normalize(e.join("/"));
      },
      join2: function (e, n) {
        return rt.normalize(e + "/" + n);
      },
      resolve: function () {
        for (var e = "", n = !1, i = arguments.length - 1; i >= -1 && !n; i--) {
          var t = i >= 0 ? arguments[i] : st.cwd();
          if ("string" != typeof t)
            throw new TypeError("Arguments to path.resolve must be strings");
          if (!t) return "";
          (e = t + "/" + e), (n = "/" === t.charAt(0));
        }
        return (
          (n ? "/" : "") +
            (e = rt
              .normalizeArray(
                e.split("/").filter(function (e) {
                  return !!e;
                }),
                !n
              )
              .join("/")) || "."
        );
      },
      relative: function (e, n) {
        function i(e) {
          for (var n = 0; n < e.length && "" === e[n]; n++);
          for (var i = e.length - 1; i >= 0 && "" === e[i]; i--);
          return n > i ? [] : e.slice(n, i - n + 1);
        }
        (e = rt.resolve(e).substr(1)), (n = rt.resolve(n).substr(1));
        for (
          var t = i(e.split("/")),
            r = i(n.split("/")),
            o = Math.min(t.length, r.length),
            a = o,
            u = 0;
          u < o;
          u++
        )
          if (t[u] !== r[u]) {
            a = u;
            break;
          }
        var l = [];
        for (u = a; u < t.length; u++) l.push("..");
        return (l = l.concat(r.slice(a))).join("/");
      },
    },
    ot = {
      ttys: [],
      init: function () {},
      shutdown: function () {},
      register: function (e, n) {
        (ot.ttys[e] = { input: [], output: [], ops: n }),
          st.registerDevice(e, ot.stream_ops);
      },
      stream_ops: {
        open: function (e) {
          var n = ot.ttys[e.node.rdev];
          if (!n) throw new st.ErrnoError(et.ENODEV);
          (e.tty = n), (e.seekable = !1);
        },
        close: function (e) {
          e.tty.ops.flush(e.tty);
        },
        flush: function (e) {
          e.tty.ops.flush(e.tty);
        },
        read: function (e, n, i, t, r) {
          if (!e.tty || !e.tty.ops.get_char) throw new st.ErrnoError(et.ENXIO);
          for (var o = 0, a = 0; a < t; a++) {
            var u;
            try {
              u = e.tty.ops.get_char(e.tty);
            } catch (e) {
              throw new st.ErrnoError(et.EIO);
            }
            if (void 0 === u && 0 === o) throw new st.ErrnoError(et.EAGAIN);
            if (null == u) break;
            o++, (n[i + a] = u);
          }
          return o && (e.node.timestamp = Date.now()), o;
        },
        write: function (e, n, i, t, r) {
          if (!e.tty || !e.tty.ops.put_char) throw new st.ErrnoError(et.ENXIO);
          for (var o = 0; o < t; o++)
            try {
              e.tty.ops.put_char(e.tty, n[i + o]);
            } catch (e) {
              throw new st.ErrnoError(et.EIO);
            }
          return t && (e.node.timestamp = Date.now()), o;
        },
      },
      default_tty_ops: {
        get_char: function (e) {
          if (!e.input.length) {
            var n = null;
            if (s) {
              var i = new Buffer(256),
                t = 0,
                r = "win32" != process.platform,
                o = process.stdin.fd;
              if (r) {
                var a = !1;
                try {
                  (o = kn.openSync("/dev/stdin", "r")), (a = !0);
                } catch (e) {}
              }
              try {
                t = kn.readSync(o, i, 0, 256, null);
              } catch (e) {
                if (-1 == e.toString().indexOf("EOF")) throw e;
                t = 0;
              }
              a && kn.closeSync(o),
                (n = t > 0 ? i.slice(0, t).toString("utf-8") : null);
            } else
              "undefined" != typeof window && "function" == typeof window.prompt
                ? null !== (n = window.prompt("Input: ")) && (n += "\n")
                : "function" == typeof readline &&
                  null !== (n = readline()) &&
                  (n += "\n");
            if (!n) return null;
            e.input = os(n, !0);
          }
          return e.input.shift();
        },
        put_char: function (e, n) {
          null === n || 10 === n
            ? (y(J(e.output, 0)), (e.output = []))
            : 0 != n && e.output.push(n);
        },
        flush: function (e) {
          e.output &&
            e.output.length > 0 &&
            (y(J(e.output, 0)), (e.output = []));
        },
      },
      default_tty1_ops: {
        put_char: function (e, n) {
          null === n || 10 === n
            ? (v(J(e.output, 0)), (e.output = []))
            : 0 != n && e.output.push(n);
        },
        flush: function (e) {
          e.output &&
            e.output.length > 0 &&
            (v(J(e.output, 0)), (e.output = []));
        },
      },
    },
    at = {
      ops_table: null,
      mount: function (e) {
        return at.createNode(null, "/", 16895, 0);
      },
      createNode: function (e, n, i, t) {
        if (st.isBlkdev(i) || st.isFIFO(i)) throw new st.ErrnoError(et.EPERM);
        at.ops_table ||
          (at.ops_table = {
            dir: {
              node: {
                getattr: at.node_ops.getattr,
                setattr: at.node_ops.setattr,
                lookup: at.node_ops.lookup,
                mknod: at.node_ops.mknod,
                rename: at.node_ops.rename,
                unlink: at.node_ops.unlink,
                rmdir: at.node_ops.rmdir,
                readdir: at.node_ops.readdir,
                symlink: at.node_ops.symlink,
              },
              stream: { llseek: at.stream_ops.llseek },
            },
            file: {
              node: {
                getattr: at.node_ops.getattr,
                setattr: at.node_ops.setattr,
              },
              stream: {
                llseek: at.stream_ops.llseek,
                read: at.stream_ops.read,
                write: at.stream_ops.write,
                allocate: at.stream_ops.allocate,
                mmap: at.stream_ops.mmap,
                msync: at.stream_ops.msync,
              },
            },
            link: {
              node: {
                getattr: at.node_ops.getattr,
                setattr: at.node_ops.setattr,
                readlink: at.node_ops.readlink,
              },
              stream: {},
            },
            chrdev: {
              node: {
                getattr: at.node_ops.getattr,
                setattr: at.node_ops.setattr,
              },
              stream: st.chrdev_stream_ops,
            },
          });
        var r = st.createNode(e, n, i, t);
        return (
          st.isDir(r.mode)
            ? ((r.node_ops = at.ops_table.dir.node),
              (r.stream_ops = at.ops_table.dir.stream),
              (r.contents = {}))
            : st.isFile(r.mode)
            ? ((r.node_ops = at.ops_table.file.node),
              (r.stream_ops = at.ops_table.file.stream),
              (r.usedBytes = 0),
              (r.contents = null))
            : st.isLink(r.mode)
            ? ((r.node_ops = at.ops_table.link.node),
              (r.stream_ops = at.ops_table.link.stream))
            : st.isChrdev(r.mode) &&
              ((r.node_ops = at.ops_table.chrdev.node),
              (r.stream_ops = at.ops_table.chrdev.stream)),
          (r.timestamp = Date.now()),
          e && (e.contents[n] = r),
          r
        );
      },
      getFileDataAsRegularArray: function (e) {
        if (e.contents && e.contents.subarray) {
          for (var n = [], i = 0; i < e.usedBytes; ++i) n.push(e.contents[i]);
          return n;
        }
        return e.contents;
      },
      getFileDataAsTypedArray: function (e) {
        return e.contents
          ? e.contents.subarray
            ? e.contents.subarray(0, e.usedBytes)
            : new Uint8Array(e.contents)
          : new Uint8Array();
      },
      expandFileStorage: function (e, n) {
        if (
          (e.contents &&
            e.contents.subarray &&
            n > e.contents.length &&
            ((e.contents = at.getFileDataAsRegularArray(e)),
            (e.usedBytes = e.contents.length)),
          !e.contents || e.contents.subarray)
        ) {
          var i = e.contents ? e.contents.length : 0;
          if (i >= n) return;
          (n = Math.max(n, (i * (i < 1048576 ? 2 : 1.125)) | 0)),
            0 != i && (n = Math.max(n, 256));
          var t = e.contents;
          return (
            (e.contents = new Uint8Array(n)),
            void (
              e.usedBytes > 0 && e.contents.set(t.subarray(0, e.usedBytes), 0)
            )
          );
        }
        for (!e.contents && n > 0 && (e.contents = []); e.contents.length < n; )
          e.contents.push(0);
      },
      resizeFileStorage: function (e, n) {
        if (e.usedBytes != n) {
          if (0 == n) return (e.contents = null), void (e.usedBytes = 0);
          if (!e.contents || e.contents.subarray) {
            var i = e.contents;
            return (
              (e.contents = new Uint8Array(new ArrayBuffer(n))),
              i && e.contents.set(i.subarray(0, Math.min(n, e.usedBytes))),
              void (e.usedBytes = n)
            );
          }
          if ((e.contents || (e.contents = []), e.contents.length > n))
            e.contents.length = n;
          else for (; e.contents.length < n; ) e.contents.push(0);
          e.usedBytes = n;
        }
      },
      node_ops: {
        getattr: function (e) {
          var n = {};
          return (
            (n.dev = st.isChrdev(e.mode) ? e.id : 1),
            (n.ino = e.id),
            (n.mode = e.mode),
            (n.nlink = 1),
            (n.uid = 0),
            (n.gid = 0),
            (n.rdev = e.rdev),
            st.isDir(e.mode)
              ? (n.size = 4096)
              : st.isFile(e.mode)
              ? (n.size = e.usedBytes)
              : st.isLink(e.mode)
              ? (n.size = e.link.length)
              : (n.size = 0),
            (n.atime = new Date(e.timestamp)),
            (n.mtime = new Date(e.timestamp)),
            (n.ctime = new Date(e.timestamp)),
            (n.blksize = 4096),
            (n.blocks = Math.ceil(n.size / n.blksize)),
            n
          );
        },
        setattr: function (e, n) {
          void 0 !== n.mode && (e.mode = n.mode),
            void 0 !== n.timestamp && (e.timestamp = n.timestamp),
            void 0 !== n.size && at.resizeFileStorage(e, n.size);
        },
        lookup: function (e, n) {
          throw st.genericErrors[et.ENOENT];
        },
        mknod: function (e, n, i, t) {
          return at.createNode(e, n, i, t);
        },
        rename: function (e, n, i) {
          if (st.isDir(e.mode)) {
            var t;
            try {
              t = st.lookupNode(n, i);
            } catch (e) {}
            if (t)
              for (var r in t.contents) throw new st.ErrnoError(et.ENOTEMPTY);
          }
          delete e.parent.contents[e.name],
            (e.name = i),
            (n.contents[i] = e),
            (e.parent = n);
        },
        unlink: function (e, n) {
          delete e.contents[n];
        },
        rmdir: function (e, n) {
          var i = st.lookupNode(e, n);
          for (var t in i.contents) throw new st.ErrnoError(et.ENOTEMPTY);
          delete e.contents[n];
        },
        readdir: function (e) {
          var n = [".", ".."];
          for (var i in e.contents) e.contents.hasOwnProperty(i) && n.push(i);
          return n;
        },
        symlink: function (e, n, i) {
          var t = at.createNode(e, n, 41471, 0);
          return (t.link = i), t;
        },
        readlink: function (e) {
          if (!st.isLink(e.mode)) throw new st.ErrnoError(et.EINVAL);
          return e.link;
        },
      },
      stream_ops: {
        read: function (e, n, i, t, r) {
          var o = e.node.contents;
          if (r >= e.node.usedBytes) return 0;
          var a = Math.min(e.node.usedBytes - r, t);
          if ((R(a >= 0), a > 8 && o.subarray)) n.set(o.subarray(r, r + a), i);
          else for (var u = 0; u < a; u++) n[i + u] = o[r + u];
          return a;
        },
        write: function (e, n, i, t, r, o) {
          if (!t) return 0;
          var a = e.node;
          if (
            ((a.timestamp = Date.now()),
            n.subarray && (!a.contents || a.contents.subarray))
          ) {
            if (o)
              return (a.contents = n.subarray(i, i + t)), (a.usedBytes = t), t;
            if (0 === a.usedBytes && 0 === r)
              return (
                (a.contents = new Uint8Array(n.subarray(i, i + t))),
                (a.usedBytes = t),
                t
              );
            if (r + t <= a.usedBytes)
              return a.contents.set(n.subarray(i, i + t), r), t;
          }
          if (
            (at.expandFileStorage(a, r + t), a.contents.subarray && n.subarray)
          )
            a.contents.set(n.subarray(i, i + t), r);
          else for (var u = 0; u < t; u++) a.contents[r + u] = n[i + u];
          return (a.usedBytes = Math.max(a.usedBytes, r + t)), t;
        },
        llseek: function (e, n, i) {
          var t = n;
          if (
            (1 === i
              ? (t += e.position)
              : 2 === i && st.isFile(e.node.mode) && (t += e.node.usedBytes),
            t < 0)
          )
            throw new st.ErrnoError(et.EINVAL);
          return t;
        },
        allocate: function (e, n, i) {
          at.expandFileStorage(e.node, n + i),
            (e.node.usedBytes = Math.max(e.node.usedBytes, n + i));
        },
        mmap: function (e, n, i, t, r, o, a) {
          if (!st.isFile(e.node.mode)) throw new st.ErrnoError(et.ENODEV);
          var u,
            l,
            c = e.node.contents;
          if (2 & a || (c.buffer !== n && c.buffer !== n.buffer)) {
            (r > 0 || r + t < e.node.usedBytes) &&
              (c = c.subarray
                ? c.subarray(r, r + t)
                : Array.prototype.slice.call(c, r, r + t)),
              (l = !0);
            var s = n.buffer == ae.buffer;
            if (!(u = hb(t))) throw new st.ErrnoError(et.ENOMEM);
            (s ? ae : n).set(c, u);
          } else (l = !1), (u = c.byteOffset);
          return { ptr: u, allocated: l };
        },
        msync: function (e, n, i, t, r) {
          if (!st.isFile(e.node.mode)) throw new st.ErrnoError(et.ENODEV);
          if (2 & r) return 0;
          at.stream_ops.write(e, n, 0, t, i, !1);
          return 0;
        },
      },
    },
    ut = {
      dbs: {},
      indexedDB: function () {
        if ("undefined" != typeof indexedDB) return indexedDB;
        var e = null;
        return (
          "object" == typeof window &&
            (e =
              window.indexedDB ||
              window.mozIndexedDB ||
              window.webkitIndexedDB ||
              window.msIndexedDB),
          R(e, "IDBFS used, but indexedDB not supported"),
          e
        );
      },
      DB_VERSION: 21,
      DB_STORE_NAME: "FILE_DATA",
      mount: function (e) {
        return at.mount.apply(null, arguments);
      },
      syncfs: function (e, n, i) {
        ut.getLocalSet(e, function (t, r) {
          if (t) return i(t);
          ut.getRemoteSet(e, function (e, t) {
            if (e) return i(e);
            var o = n ? t : r,
              a = n ? r : t;
            ut.reconcile(o, a, i);
          });
        });
      },
      getDB: function (e, n) {
        var i,
          t = ut.dbs[e];
        if (t) return n(null, t);
        try {
          i = ut.indexedDB().open(e, ut.DB_VERSION);
        } catch (e) {
          return n(e);
        }
        if (!i) return n("Unable to connect to IndexedDB");
        (i.onupgradeneeded = function (e) {
          var n,
            i = e.target.result,
            t = e.target.transaction;
          (n = i.objectStoreNames.contains(ut.DB_STORE_NAME)
            ? t.objectStore(ut.DB_STORE_NAME)
            : i.createObjectStore(ut.DB_STORE_NAME)).indexNames.contains(
            "timestamp"
          ) || n.createIndex("timestamp", "timestamp", { unique: !1 });
        }),
          (i.onsuccess = function () {
            (t = i.result), (ut.dbs[e] = t), n(null, t);
          }),
          (i.onerror = function (e) {
            n(this.error), e.preventDefault();
          });
      },
      getLocalSet: function (e, n) {
        var i = {};
        function t(e) {
          return "." !== e && ".." !== e;
        }
        function r(e) {
          return function (n) {
            return rt.join2(e, n);
          };
        }
        for (
          var o = st.readdir(e.mountpoint).filter(t).map(r(e.mountpoint));
          o.length;

        ) {
          var a,
            u = o.pop();
          try {
            a = st.stat(u);
          } catch (e) {
            return n(e);
          }
          st.isDir(a.mode) &&
            o.push.apply(o, st.readdir(u).filter(t).map(r(u))),
            (i[u] = { timestamp: a.mtime });
        }
        return n(null, { type: "local", entries: i });
      },
      getRemoteSet: function (e, n) {
        var i = {};
        ut.getDB(e.mountpoint, function (e, t) {
          if (e) return n(e);
          try {
            var r = t.transaction([ut.DB_STORE_NAME], "readonly");
            (r.onerror = function (e) {
              n(this.error), e.preventDefault();
            }),
              (r
                .objectStore(ut.DB_STORE_NAME)
                .index("timestamp")
                .openKeyCursor().onsuccess = function (e) {
                var r = e.target.result;
                if (!r) return n(null, { type: "remote", db: t, entries: i });
                (i[r.primaryKey] = { timestamp: r.key }), r.continue();
              });
          } catch (e) {
            return n(e);
          }
        });
      },
      loadLocalEntry: function (e, n) {
        var i, t;
        try {
          (t = st.lookupPath(e).node), (i = st.stat(e));
        } catch (e) {
          return n(e);
        }
        return st.isDir(i.mode)
          ? n(null, { timestamp: i.mtime, mode: i.mode })
          : st.isFile(i.mode)
          ? ((t.contents = at.getFileDataAsTypedArray(t)),
            n(null, { timestamp: i.mtime, mode: i.mode, contents: t.contents }))
          : n(new Error("node type not supported"));
      },
      storeLocalEntry: function (e, n, i) {
        try {
          if (st.isDir(n.mode)) st.mkdir(e, n.mode);
          else {
            if (!st.isFile(n.mode))
              return i(new Error("node type not supported"));
            st.writeFile(e, n.contents, { canOwn: !0 });
          }
          st.chmod(e, n.mode), st.utime(e, n.timestamp, n.timestamp);
        } catch (e) {
          return i(e);
        }
        i(null);
      },
      removeLocalEntry: function (e, n) {
        try {
          st.lookupPath(e);
          var i = st.stat(e);
          st.isDir(i.mode) ? st.rmdir(e) : st.isFile(i.mode) && st.unlink(e);
        } catch (e) {
          return n(e);
        }
        n(null);
      },
      loadRemoteEntry: function (e, n, i) {
        var t = e.get(n);
        (t.onsuccess = function (e) {
          i(null, e.target.result);
        }),
          (t.onerror = function (e) {
            i(this.error), e.preventDefault();
          });
      },
      storeRemoteEntry: function (e, n, i, t) {
        var r = e.put(i, n);
        (r.onsuccess = function () {
          t(null);
        }),
          (r.onerror = function (e) {
            t(this.error), e.preventDefault();
          });
      },
      removeRemoteEntry: function (e, n, i) {
        var t = e.delete(n);
        (t.onsuccess = function () {
          i(null);
        }),
          (t.onerror = function (e) {
            i(this.error), e.preventDefault();
          });
      },
      reconcile: function (e, n, i) {
        var t = 0,
          r = [];
        Object.keys(e.entries).forEach(function (i) {
          var o = e.entries[i],
            a = n.entries[i];
          (!a || o.timestamp > a.timestamp) && (r.push(i), t++);
        });
        var o = [];
        if (
          (Object.keys(n.entries).forEach(function (i) {
            n.entries[i];
            e.entries[i] || (o.push(i), t++);
          }),
          !t)
        )
          return i(null);
        var a = 0,
          u = ("remote" === e.type ? e.db : n.db).transaction(
            [ut.DB_STORE_NAME],
            "readwrite"
          ),
          l = u.objectStore(ut.DB_STORE_NAME);
        function c(e) {
          return e
            ? c.errored
              ? void 0
              : ((c.errored = !0), i(e))
            : ++a >= t
            ? i(null)
            : void 0;
        }
        (u.onerror = function (e) {
          c(this.error), e.preventDefault();
        }),
          r.sort().forEach(function (e) {
            "local" === n.type
              ? ut.loadRemoteEntry(l, e, function (n, i) {
                  if (n) return c(n);
                  ut.storeLocalEntry(e, i, c);
                })
              : ut.loadLocalEntry(e, function (n, i) {
                  if (n) return c(n);
                  ut.storeRemoteEntry(l, e, i, c);
                });
          }),
          o
            .sort()
            .reverse()
            .forEach(function (e) {
              "local" === n.type
                ? ut.removeLocalEntry(e, c)
                : ut.removeRemoteEntry(l, e, c);
            });
      },
    },
    lt = {
      isWindows: !1,
      staticInit: function () {
        lt.isWindows = !!process.platform.match(/^win/);
        var e = process.binding("constants");
        e.fs && (e = e.fs),
          (lt.flagsForNodeMap = {
            1024: e.O_APPEND,
            64: e.O_CREAT,
            128: e.O_EXCL,
            0: e.O_RDONLY,
            2: e.O_RDWR,
            4096: e.O_SYNC,
            512: e.O_TRUNC,
            1: e.O_WRONLY,
          });
      },
      bufferFrom: function (e) {
        return Buffer.alloc ? Buffer.from(e) : new Buffer(e);
      },
      mount: function (e) {
        return R(s), lt.createNode(null, "/", lt.getMode(e.opts.root), 0);
      },
      createNode: function (e, n, i, t) {
        if (!st.isDir(i) && !st.isFile(i) && !st.isLink(i))
          throw new st.ErrnoError(et.EINVAL);
        var r = st.createNode(e, n, i);
        return (r.node_ops = lt.node_ops), (r.stream_ops = lt.stream_ops), r;
      },
      getMode: function (e) {
        var n;
        try {
          (n = kn.lstatSync(e)),
            lt.isWindows && (n.mode = n.mode | ((292 & n.mode) >> 2));
        } catch (e) {
          if (!e.code) throw e;
          throw new st.ErrnoError(et[e.code]);
        }
        return n.mode;
      },
      realPath: function (e) {
        for (var n = []; e.parent !== e; ) n.push(e.name), (e = e.parent);
        return n.push(e.mount.opts.root), n.reverse(), rt.join.apply(null, n);
      },
      flagsForNode: function (e) {
        (e &= -2097153), (e &= -2049), (e &= -32769), (e &= -524289);
        var n = 0;
        for (var i in lt.flagsForNodeMap)
          e & i && ((n |= lt.flagsForNodeMap[i]), (e ^= i));
        if (e) throw new st.ErrnoError(et.EINVAL);
        return n;
      },
      node_ops: {
        getattr: function (e) {
          var n,
            i = lt.realPath(e);
          try {
            n = kn.lstatSync(i);
          } catch (e) {
            if (!e.code) throw e;
            throw new st.ErrnoError(et[e.code]);
          }
          return (
            lt.isWindows && !n.blksize && (n.blksize = 4096),
            lt.isWindows &&
              !n.blocks &&
              (n.blocks = ((n.size + n.blksize - 1) / n.blksize) | 0),
            {
              dev: n.dev,
              ino: n.ino,
              mode: n.mode,
              nlink: n.nlink,
              uid: n.uid,
              gid: n.gid,
              rdev: n.rdev,
              size: n.size,
              atime: n.atime,
              mtime: n.mtime,
              ctime: n.ctime,
              blksize: n.blksize,
              blocks: n.blocks,
            }
          );
        },
        setattr: function (e, n) {
          var i = lt.realPath(e);
          try {
            if (
              (void 0 !== n.mode &&
                (kn.chmodSync(i, n.mode), (e.mode = n.mode)),
              void 0 !== n.timestamp)
            ) {
              var t = new Date(n.timestamp);
              kn.utimesSync(i, t, t);
            }
            void 0 !== n.size && kn.truncateSync(i, n.size);
          } catch (e) {
            if (!e.code) throw e;
            throw new st.ErrnoError(et[e.code]);
          }
        },
        lookup: function (e, n) {
          var i = rt.join2(lt.realPath(e), n),
            t = lt.getMode(i);
          return lt.createNode(e, n, t);
        },
        mknod: function (e, n, i, t) {
          var r = lt.createNode(e, n, i, t),
            o = lt.realPath(r);
          try {
            st.isDir(r.mode)
              ? kn.mkdirSync(o, r.mode)
              : kn.writeFileSync(o, "", { mode: r.mode });
          } catch (e) {
            if (!e.code) throw e;
            throw new st.ErrnoError(et[e.code]);
          }
          return r;
        },
        rename: function (e, n, i) {
          var t = lt.realPath(e),
            r = rt.join2(lt.realPath(n), i);
          try {
            kn.renameSync(t, r);
          } catch (e) {
            if (!e.code) throw e;
            throw new st.ErrnoError(et[e.code]);
          }
        },
        unlink: function (e, n) {
          var i = rt.join2(lt.realPath(e), n);
          try {
            kn.unlinkSync(i);
          } catch (e) {
            if (!e.code) throw e;
            throw new st.ErrnoError(et[e.code]);
          }
        },
        rmdir: function (e, n) {
          var i = rt.join2(lt.realPath(e), n);
          try {
            kn.rmdirSync(i);
          } catch (e) {
            if (!e.code) throw e;
            throw new st.ErrnoError(et[e.code]);
          }
        },
        readdir: function (e) {
          var n = lt.realPath(e);
          try {
            return kn.readdirSync(n);
          } catch (e) {
            if (!e.code) throw e;
            throw new st.ErrnoError(et[e.code]);
          }
        },
        symlink: function (e, n, i) {
          var t = rt.join2(lt.realPath(e), n);
          try {
            kn.symlinkSync(i, t);
          } catch (e) {
            if (!e.code) throw e;
            throw new st.ErrnoError(et[e.code]);
          }
        },
        readlink: function (e) {
          var n = lt.realPath(e);
          try {
            return (
              (n = kn.readlinkSync(n)),
              (n = rs.relative(rs.resolve(e.mount.opts.root), n))
            );
          } catch (e) {
            if (!e.code) throw e;
            throw new st.ErrnoError(et[e.code]);
          }
        },
      },
      stream_ops: {
        open: function (e) {
          var n = lt.realPath(e.node);
          try {
            st.isFile(e.node.mode) &&
              (e.nfd = kn.openSync(n, lt.flagsForNode(e.flags)));
          } catch (e) {
            if (!e.code) throw e;
            throw new st.ErrnoError(et[e.code]);
          }
        },
        close: function (e) {
          try {
            st.isFile(e.node.mode) && e.nfd && kn.closeSync(e.nfd);
          } catch (e) {
            if (!e.code) throw e;
            throw new st.ErrnoError(et[e.code]);
          }
        },
        read: function (e, n, i, t, r) {
          if (0 === t) return 0;
          try {
            return kn.readSync(e.nfd, lt.bufferFrom(n.buffer), i, t, r);
          } catch (e) {
            throw new st.ErrnoError(et[e.code]);
          }
        },
        write: function (e, n, i, t, r) {
          try {
            return kn.writeSync(e.nfd, lt.bufferFrom(n.buffer), i, t, r);
          } catch (e) {
            throw new st.ErrnoError(et[e.code]);
          }
        },
        llseek: function (e, n, i) {
          var t = n;
          if (1 === i) t += e.position;
          else if (2 === i && st.isFile(e.node.mode))
            try {
              t += kn.fstatSync(e.nfd).size;
            } catch (e) {
              throw new st.ErrnoError(et[e.code]);
            }
          if (t < 0) throw new st.ErrnoError(et.EINVAL);
          return t;
        },
      },
    },
    ct = {
      DIR_MODE: 16895,
      FILE_MODE: 33279,
      reader: null,
      mount: function (e) {
        R(c), ct.reader || (ct.reader = new FileReaderSync());
        var n = ct.createNode(null, "/", ct.DIR_MODE, 0),
          i = {};
        function t(e) {
          for (var t = e.split("/"), r = n, o = 0; o < t.length - 1; o++) {
            var a = t.slice(0, o + 1).join("/");
            i[a] || (i[a] = ct.createNode(r, t[o], ct.DIR_MODE, 0)), (r = i[a]);
          }
          return r;
        }
        function r(e) {
          var n = e.split("/");
          return n[n.length - 1];
        }
        return (
          Array.prototype.forEach.call(e.opts.files || [], function (e) {
            ct.createNode(
              t(e.name),
              r(e.name),
              ct.FILE_MODE,
              0,
              e,
              e.lastModifiedDate
            );
          }),
          (e.opts.blobs || []).forEach(function (e) {
            ct.createNode(t(e.name), r(e.name), ct.FILE_MODE, 0, e.data);
          }),
          (e.opts.packages || []).forEach(function (e) {
            e.metadata.files.forEach(function (n) {
              var i = n.filename.substr(1);
              ct.createNode(
                t(i),
                r(i),
                ct.FILE_MODE,
                0,
                e.blob.slice(n.start, n.end)
              );
            });
          }),
          n
        );
      },
      createNode: function (e, n, i, t, r, o) {
        var a = st.createNode(e, n, i);
        return (
          (a.mode = i),
          (a.node_ops = ct.node_ops),
          (a.stream_ops = ct.stream_ops),
          (a.timestamp = (o || new Date()).getTime()),
          R(ct.FILE_MODE !== ct.DIR_MODE),
          i === ct.FILE_MODE
            ? ((a.size = r.size), (a.contents = r))
            : ((a.size = 4096), (a.contents = {})),
          e && (e.contents[n] = a),
          a
        );
      },
      node_ops: {
        getattr: function (e) {
          return {
            dev: 1,
            ino: void 0,
            mode: e.mode,
            nlink: 1,
            uid: 0,
            gid: 0,
            rdev: void 0,
            size: e.size,
            atime: new Date(e.timestamp),
            mtime: new Date(e.timestamp),
            ctime: new Date(e.timestamp),
            blksize: 4096,
            blocks: Math.ceil(e.size / 4096),
          };
        },
        setattr: function (e, n) {
          void 0 !== n.mode && (e.mode = n.mode),
            void 0 !== n.timestamp && (e.timestamp = n.timestamp);
        },
        lookup: function (e, n) {
          throw new st.ErrnoError(et.ENOENT);
        },
        mknod: function (e, n, i, t) {
          throw new st.ErrnoError(et.EPERM);
        },
        rename: function (e, n, i) {
          throw new st.ErrnoError(et.EPERM);
        },
        unlink: function (e, n) {
          throw new st.ErrnoError(et.EPERM);
        },
        rmdir: function (e, n) {
          throw new st.ErrnoError(et.EPERM);
        },
        readdir: function (e) {
          var n = [".", ".."];
          for (var i in e.contents) e.contents.hasOwnProperty(i) && n.push(i);
          return n;
        },
        symlink: function (e, n, i) {
          throw new st.ErrnoError(et.EPERM);
        },
        readlink: function (e) {
          throw new st.ErrnoError(et.EPERM);
        },
      },
      stream_ops: {
        read: function (e, n, i, t, r) {
          if (r >= e.node.size) return 0;
          var o = e.node.contents.slice(r, r + t),
            a = ct.reader.readAsArrayBuffer(o);
          return n.set(new Uint8Array(a), i), o.size;
        },
        write: function (e, n, i, t, r) {
          throw new st.ErrnoError(et.EIO);
        },
        llseek: function (e, n, i) {
          var t = n;
          if (
            (1 === i
              ? (t += e.position)
              : 2 === i && st.isFile(e.node.mode) && (t += e.node.size),
            t < 0)
          )
            throw new st.ErrnoError(et.EINVAL);
          return t;
        },
      },
    };
  (me += 16), (me += 16);
  var st = {
      root: null,
      mounts: [],
      devices: {},
      streams: [],
      nextInode: 1,
      nameTable: null,
      currentPath: "/",
      initialized: !1,
      ignorePermissions: !0,
      trackingDelegate: {},
      tracking: { openFlags: { READ: 1, WRITE: 2 } },
      ErrnoError: null,
      genericErrors: {},
      filesystems: null,
      syncFSRequests: 0,
      handleFSError: function (e) {
        if (!(e instanceof st.ErrnoError)) throw e + " : " + re();
        return nt(e.errno);
      },
      lookupPath: function (e, n) {
        if (((n = n || {}), !(e = rt.resolve(st.cwd(), e))))
          return { path: "", node: null };
        var i = { follow_mount: !0, recurse_count: 0 };
        for (var t in i) void 0 === n[t] && (n[t] = i[t]);
        if (n.recurse_count > 8) throw new st.ErrnoError(et.ELOOP);
        for (
          var r = rt.normalizeArray(
              e.split("/").filter(function (e) {
                return !!e;
              }),
              !1
            ),
            o = st.root,
            a = "/",
            u = 0;
          u < r.length;
          u++
        ) {
          var l = u === r.length - 1;
          if (l && n.parent) break;
          if (
            ((o = st.lookupNode(o, r[u])),
            (a = rt.join2(a, r[u])),
            st.isMountpoint(o) &&
              (!l || (l && n.follow_mount)) &&
              (o = o.mounted.root),
            !l || n.follow)
          )
            for (var c = 0; st.isLink(o.mode); ) {
              var s = st.readlink(a);
              if (
                ((a = rt.resolve(rt.dirname(a), s)),
                (o = st.lookupPath(a, { recurse_count: n.recurse_count }).node),
                c++ > 40)
              )
                throw new st.ErrnoError(et.ELOOP);
            }
        }
        return { path: a, node: o };
      },
      getPath: function (e) {
        for (var n; ; ) {
          if (st.isRoot(e)) {
            var i = e.mount.mountpoint;
            return n ? ("/" !== i[i.length - 1] ? i + "/" + n : i + n) : i;
          }
          (n = n ? e.name + "/" + n : e.name), (e = e.parent);
        }
      },
      hashName: function (e, n) {
        for (var i = 0, t = 0; t < n.length; t++)
          i = ((i << 5) - i + n.charCodeAt(t)) | 0;
        return ((e + i) >>> 0) % st.nameTable.length;
      },
      hashAddNode: function (e) {
        var n = st.hashName(e.parent.id, e.name);
        (e.name_next = st.nameTable[n]), (st.nameTable[n] = e);
      },
      hashRemoveNode: function (e) {
        var n = st.hashName(e.parent.id, e.name);
        if (st.nameTable[n] === e) st.nameTable[n] = e.name_next;
        else
          for (var i = st.nameTable[n]; i; ) {
            if (i.name_next === e) {
              i.name_next = e.name_next;
              break;
            }
            i = i.name_next;
          }
      },
      lookupNode: function (e, n) {
        var i = st.mayLookup(e);
        if (i) throw new st.ErrnoError(i, e);
        for (
          var t = st.hashName(e.id, n), r = st.nameTable[t];
          r;
          r = r.name_next
        ) {
          var o = r.name;
          if (r.parent.id === e.id && o === n) return r;
        }
        return st.lookup(e, n);
      },
      createNode: function (e, n, i, t) {
        if (!st.FSNode) {
          (st.FSNode = function (e, n, i, t) {
            e || (e = this),
              (this.parent = e),
              (this.mount = e.mount),
              (this.mounted = null),
              (this.id = st.nextInode++),
              (this.name = n),
              (this.mode = i),
              (this.node_ops = {}),
              (this.stream_ops = {}),
              (this.rdev = t);
          }),
            (st.FSNode.prototype = {});
          var r = 365,
            o = 146;
          Object.defineProperties(st.FSNode.prototype, {
            read: {
              get: function () {
                return (this.mode & r) === r;
              },
              set: function (e) {
                e ? (this.mode |= r) : (this.mode &= -366);
              },
            },
            write: {
              get: function () {
                return (this.mode & o) === o;
              },
              set: function (e) {
                e ? (this.mode |= o) : (this.mode &= -147);
              },
            },
            isFolder: {
              get: function () {
                return st.isDir(this.mode);
              },
            },
            isDevice: {
              get: function () {
                return st.isChrdev(this.mode);
              },
            },
          });
        }
        var a = new st.FSNode(e, n, i, t);
        return st.hashAddNode(a), a;
      },
      destroyNode: function (e) {
        st.hashRemoveNode(e);
      },
      isRoot: function (e) {
        return e === e.parent;
      },
      isMountpoint: function (e) {
        return !!e.mounted;
      },
      isFile: function (e) {
        return 32768 == (61440 & e);
      },
      isDir: function (e) {
        return 16384 == (61440 & e);
      },
      isLink: function (e) {
        return 40960 == (61440 & e);
      },
      isChrdev: function (e) {
        return 8192 == (61440 & e);
      },
      isBlkdev: function (e) {
        return 24576 == (61440 & e);
      },
      isFIFO: function (e) {
        return 4096 == (61440 & e);
      },
      isSocket: function (e) {
        return 49152 == (49152 & e);
      },
      flagModes: {
        r: 0,
        rs: 1052672,
        "r+": 2,
        w: 577,
        wx: 705,
        xw: 705,
        "w+": 578,
        "wx+": 706,
        "xw+": 706,
        a: 1089,
        ax: 1217,
        xa: 1217,
        "a+": 1090,
        "ax+": 1218,
        "xa+": 1218,
      },
      modeStringToFlags: function (e) {
        var n = st.flagModes[e];
        if (void 0 === n) throw new Error("Unknown file open mode: " + e);
        return n;
      },
      flagsToPermissionString: function (e) {
        var n = ["r", "w", "rw"][3 & e];
        return 512 & e && (n += "w"), n;
      },
      nodePermissions: function (e, n) {
        return st.ignorePermissions ||
          ((-1 === n.indexOf("r") || 292 & e.mode) &&
            (-1 === n.indexOf("w") || 146 & e.mode) &&
            (-1 === n.indexOf("x") || 73 & e.mode))
          ? 0
          : et.EACCES;
      },
      mayLookup: function (e) {
        var n = st.nodePermissions(e, "x");
        return n || (e.node_ops.lookup ? 0 : et.EACCES);
      },
      mayCreate: function (e, n) {
        try {
          st.lookupNode(e, n);
          return et.EEXIST;
        } catch (e) {}
        return st.nodePermissions(e, "wx");
      },
      mayDelete: function (e, n, i) {
        var t;
        try {
          t = st.lookupNode(e, n);
        } catch (e) {
          return e.errno;
        }
        var r = st.nodePermissions(e, "wx");
        if (r) return r;
        if (i) {
          if (!st.isDir(t.mode)) return et.ENOTDIR;
          if (st.isRoot(t) || st.getPath(t) === st.cwd()) return et.EBUSY;
        } else if (st.isDir(t.mode)) return et.EISDIR;
        return 0;
      },
      mayOpen: function (e, n) {
        return e
          ? st.isLink(e.mode)
            ? et.ELOOP
            : st.isDir(e.mode) &&
              ("r" !== st.flagsToPermissionString(n) || 512 & n)
            ? et.EISDIR
            : st.nodePermissions(e, st.flagsToPermissionString(n))
          : et.ENOENT;
      },
      MAX_OPEN_FDS: 4096,
      nextfd: function (e, n) {
        (e = e || 0), (n = n || st.MAX_OPEN_FDS);
        for (var i = e; i <= n; i++) if (!st.streams[i]) return i;
        throw new st.ErrnoError(et.EMFILE);
      },
      getStream: function (e) {
        return st.streams[e];
      },
      createStream: function (e, n, i) {
        st.FSStream ||
          ((st.FSStream = function () {}),
          (st.FSStream.prototype = {}),
          Object.defineProperties(st.FSStream.prototype, {
            object: {
              get: function () {
                return this.node;
              },
              set: function (e) {
                this.node = e;
              },
            },
            isRead: {
              get: function () {
                return 1 != (2097155 & this.flags);
              },
            },
            isWrite: {
              get: function () {
                return 0 != (2097155 & this.flags);
              },
            },
            isAppend: {
              get: function () {
                return 1024 & this.flags;
              },
            },
          }));
        var t = new st.FSStream();
        for (var r in e) t[r] = e[r];
        e = t;
        var o = st.nextfd(n, i);
        return (e.fd = o), (st.streams[o] = e), e;
      },
      closeStream: function (e) {
        st.streams[e] = null;
      },
      chrdev_stream_ops: {
        open: function (e) {
          var n = st.getDevice(e.node.rdev);
          (e.stream_ops = n.stream_ops),
            e.stream_ops.open && e.stream_ops.open(e);
        },
        llseek: function () {
          throw new st.ErrnoError(et.ESPIPE);
        },
      },
      major: function (e) {
        return e >> 8;
      },
      minor: function (e) {
        return 255 & e;
      },
      makedev: function (e, n) {
        return (e << 8) | n;
      },
      registerDevice: function (e, n) {
        st.devices[e] = { stream_ops: n };
      },
      getDevice: function (e) {
        return st.devices[e];
      },
      getMounts: function (e) {
        for (var n = [], i = [e]; i.length; ) {
          var t = i.pop();
          n.push(t), i.push.apply(i, t.mounts);
        }
        return n;
      },
      syncfs: function (e, n) {
        "function" == typeof e && ((n = e), (e = !1)),
          st.syncFSRequests++,
          st.syncFSRequests > 1 &&
            console.log(
              "warning: " +
                st.syncFSRequests +
                " FS.syncfs operations in flight at once, probably just doing extra work"
            );
        var i = st.getMounts(st.root.mount),
          t = 0;
        function r(e) {
          return R(st.syncFSRequests > 0), st.syncFSRequests--, n(e);
        }
        function o(e) {
          if (e) return o.errored ? void 0 : ((o.errored = !0), r(e));
          ++t >= i.length && r(null);
        }
        i.forEach(function (n) {
          if (!n.type.syncfs) return o(null);
          n.type.syncfs(n, e, o);
        });
      },
      mount: function (e, n, i) {
        var t,
          r = "/" === i,
          o = !i;
        if (r && st.root) throw new st.ErrnoError(et.EBUSY);
        if (!r && !o) {
          var a = st.lookupPath(i, { follow_mount: !1 });
          if (((i = a.path), (t = a.node), st.isMountpoint(t)))
            throw new st.ErrnoError(et.EBUSY);
          if (!st.isDir(t.mode)) throw new st.ErrnoError(et.ENOTDIR);
        }
        var u = { type: e, opts: n, mountpoint: i, mounts: [] },
          l = e.mount(u);
        return (
          (l.mount = u),
          (u.root = l),
          r
            ? (st.root = l)
            : t && ((t.mounted = u), t.mount && t.mount.mounts.push(u)),
          l
        );
      },
      unmount: function (e) {
        var n = st.lookupPath(e, { follow_mount: !1 });
        if (!st.isMountpoint(n.node)) throw new st.ErrnoError(et.EINVAL);
        var i = n.node,
          t = i.mounted,
          r = st.getMounts(t);
        Object.keys(st.nameTable).forEach(function (e) {
          for (var n = st.nameTable[e]; n; ) {
            var i = n.name_next;
            -1 !== r.indexOf(n.mount) && st.destroyNode(n), (n = i);
          }
        }),
          (i.mounted = null);
        var o = i.mount.mounts.indexOf(t);
        R(-1 !== o), i.mount.mounts.splice(o, 1);
      },
      lookup: function (e, n) {
        return e.node_ops.lookup(e, n);
      },
      mknod: function (e, n, i) {
        var t = st.lookupPath(e, { parent: !0 }).node,
          r = rt.basename(e);
        if (!r || "." === r || ".." === r) throw new st.ErrnoError(et.EINVAL);
        var o = st.mayCreate(t, r);
        if (o) throw new st.ErrnoError(o);
        if (!t.node_ops.mknod) throw new st.ErrnoError(et.EPERM);
        return t.node_ops.mknod(t, r, n, i);
      },
      create: function (e, n) {
        return (
          (n = void 0 !== n ? n : 438),
          (n &= 4095),
          (n |= 32768),
          st.mknod(e, n, 0)
        );
      },
      mkdir: function (e, n) {
        return (
          (n = void 0 !== n ? n : 511),
          (n &= 1023),
          (n |= 16384),
          st.mknod(e, n, 0)
        );
      },
      mkdirTree: function (e, n) {
        for (var i = e.split("/"), t = "", r = 0; r < i.length; ++r)
          if (i[r]) {
            t += "/" + i[r];
            try {
              st.mkdir(t, n);
            } catch (e) {
              if (e.errno != et.EEXIST) throw e;
            }
          }
      },
      mkdev: function (e, n, i) {
        return (
          void 0 === i && ((i = n), (n = 438)), (n |= 8192), st.mknod(e, n, i)
        );
      },
      symlink: function (e, n) {
        if (!rt.resolve(e)) throw new st.ErrnoError(et.ENOENT);
        var i = st.lookupPath(n, { parent: !0 }).node;
        if (!i) throw new st.ErrnoError(et.ENOENT);
        var t = rt.basename(n),
          r = st.mayCreate(i, t);
        if (r) throw new st.ErrnoError(r);
        if (!i.node_ops.symlink) throw new st.ErrnoError(et.EPERM);
        return i.node_ops.symlink(i, t, e);
      },
      rename: function (e, n) {
        var i,
          t,
          r = rt.dirname(e),
          o = rt.dirname(n),
          a = rt.basename(e),
          u = rt.basename(n);
        try {
          (i = st.lookupPath(e, { parent: !0 }).node),
            (t = st.lookupPath(n, { parent: !0 }).node);
        } catch (e) {
          throw new st.ErrnoError(et.EBUSY);
        }
        if (!i || !t) throw new st.ErrnoError(et.ENOENT);
        if (i.mount !== t.mount) throw new st.ErrnoError(et.EXDEV);
        var l,
          c = st.lookupNode(i, a),
          s = rt.relative(e, o);
        if ("." !== s.charAt(0)) throw new st.ErrnoError(et.EINVAL);
        if ("." !== (s = rt.relative(n, r)).charAt(0))
          throw new st.ErrnoError(et.ENOTEMPTY);
        try {
          l = st.lookupNode(t, u);
        } catch (e) {}
        if (c !== l) {
          var f = st.isDir(c.mode),
            _ = st.mayDelete(i, a, f);
          if (_) throw new st.ErrnoError(_);
          if ((_ = l ? st.mayDelete(t, u, f) : st.mayCreate(t, u)))
            throw new st.ErrnoError(_);
          if (!i.node_ops.rename) throw new st.ErrnoError(et.EPERM);
          if (st.isMountpoint(c) || (l && st.isMountpoint(l)))
            throw new st.ErrnoError(et.EBUSY);
          if (t !== i && (_ = st.nodePermissions(i, "w")))
            throw new st.ErrnoError(_);
          try {
            st.trackingDelegate.willMovePath &&
              st.trackingDelegate.willMovePath(e, n);
          } catch (i) {
            console.log(
              "FS.trackingDelegate['willMovePath']('" +
                e +
                "', '" +
                n +
                "') threw an exception: " +
                i.message
            );
          }
          st.hashRemoveNode(c);
          try {
            i.node_ops.rename(c, t, u);
          } catch (e) {
            throw e;
          } finally {
            st.hashAddNode(c);
          }
          try {
            st.trackingDelegate.onMovePath &&
              st.trackingDelegate.onMovePath(e, n);
          } catch (i) {
            console.log(
              "FS.trackingDelegate['onMovePath']('" +
                e +
                "', '" +
                n +
                "') threw an exception: " +
                i.message
            );
          }
        }
      },
      rmdir: function (e) {
        var n = st.lookupPath(e, { parent: !0 }).node,
          i = rt.basename(e),
          t = st.lookupNode(n, i),
          r = st.mayDelete(n, i, !0);
        if (r) throw new st.ErrnoError(r);
        if (!n.node_ops.rmdir) throw new st.ErrnoError(et.EPERM);
        if (st.isMountpoint(t)) throw new st.ErrnoError(et.EBUSY);
        try {
          st.trackingDelegate.willDeletePath &&
            st.trackingDelegate.willDeletePath(e);
        } catch (n) {
          console.log(
            "FS.trackingDelegate['willDeletePath']('" +
              e +
              "') threw an exception: " +
              n.message
          );
        }
        n.node_ops.rmdir(n, i), st.destroyNode(t);
        try {
          st.trackingDelegate.onDeletePath &&
            st.trackingDelegate.onDeletePath(e);
        } catch (n) {
          console.log(
            "FS.trackingDelegate['onDeletePath']('" +
              e +
              "') threw an exception: " +
              n.message
          );
        }
      },
      readdir: function (e) {
        var n = st.lookupPath(e, { follow: !0 }).node;
        if (!n.node_ops.readdir) throw new st.ErrnoError(et.ENOTDIR);
        return n.node_ops.readdir(n);
      },
      unlink: function (e) {
        var n = st.lookupPath(e, { parent: !0 }).node,
          i = rt.basename(e),
          t = st.lookupNode(n, i),
          r = st.mayDelete(n, i, !1);
        if (r) throw new st.ErrnoError(r);
        if (!n.node_ops.unlink) throw new st.ErrnoError(et.EPERM);
        if (st.isMountpoint(t)) throw new st.ErrnoError(et.EBUSY);
        try {
          st.trackingDelegate.willDeletePath &&
            st.trackingDelegate.willDeletePath(e);
        } catch (n) {
          console.log(
            "FS.trackingDelegate['willDeletePath']('" +
              e +
              "') threw an exception: " +
              n.message
          );
        }
        n.node_ops.unlink(n, i), st.destroyNode(t);
        try {
          st.trackingDelegate.onDeletePath &&
            st.trackingDelegate.onDeletePath(e);
        } catch (n) {
          console.log(
            "FS.trackingDelegate['onDeletePath']('" +
              e +
              "') threw an exception: " +
              n.message
          );
        }
      },
      readlink: function (e) {
        var n = st.lookupPath(e).node;
        if (!n) throw new st.ErrnoError(et.ENOENT);
        if (!n.node_ops.readlink) throw new st.ErrnoError(et.EINVAL);
        return rt.resolve(st.getPath(n.parent), n.node_ops.readlink(n));
      },
      stat: function (e, n) {
        var i = st.lookupPath(e, { follow: !n }).node;
        if (!i) throw new st.ErrnoError(et.ENOENT);
        if (!i.node_ops.getattr) throw new st.ErrnoError(et.EPERM);
        return i.node_ops.getattr(i);
      },
      lstat: function (e) {
        return st.stat(e, !0);
      },
      chmod: function (e, n, i) {
        var t;
        "string" == typeof e
          ? (t = st.lookupPath(e, { follow: !i }).node)
          : (t = e);
        if (!t.node_ops.setattr) throw new st.ErrnoError(et.EPERM);
        t.node_ops.setattr(t, {
          mode: (4095 & n) | (-4096 & t.mode),
          timestamp: Date.now(),
        });
      },
      lchmod: function (e, n) {
        st.chmod(e, n, !0);
      },
      fchmod: function (e, n) {
        var i = st.getStream(e);
        if (!i) throw new st.ErrnoError(et.EBADF);
        st.chmod(i.node, n);
      },
      chown: function (e, n, i, t) {
        var r;
        "string" == typeof e
          ? (r = st.lookupPath(e, { follow: !t }).node)
          : (r = e);
        if (!r.node_ops.setattr) throw new st.ErrnoError(et.EPERM);
        r.node_ops.setattr(r, { timestamp: Date.now() });
      },
      lchown: function (e, n, i) {
        st.chown(e, n, i, !0);
      },
      fchown: function (e, n, i) {
        var t = st.getStream(e);
        if (!t) throw new st.ErrnoError(et.EBADF);
        st.chown(t.node, n, i);
      },
      truncate: function (e, n) {
        if (n < 0) throw new st.ErrnoError(et.EINVAL);
        var i;
        "string" == typeof e
          ? (i = st.lookupPath(e, { follow: !0 }).node)
          : (i = e);
        if (!i.node_ops.setattr) throw new st.ErrnoError(et.EPERM);
        if (st.isDir(i.mode)) throw new st.ErrnoError(et.EISDIR);
        if (!st.isFile(i.mode)) throw new st.ErrnoError(et.EINVAL);
        var t = st.nodePermissions(i, "w");
        if (t) throw new st.ErrnoError(t);
        i.node_ops.setattr(i, { size: n, timestamp: Date.now() });
      },
      ftruncate: function (e, n) {
        var i = st.getStream(e);
        if (!i) throw new st.ErrnoError(et.EBADF);
        if (0 == (2097155 & i.flags)) throw new st.ErrnoError(et.EINVAL);
        st.truncate(i.node, n);
      },
      utime: function (e, n, i) {
        var t = st.lookupPath(e, { follow: !0 }).node;
        t.node_ops.setattr(t, { timestamp: Math.max(n, i) });
      },
      open: function (n, i, t, r, o) {
        if ("" === n) throw new st.ErrnoError(et.ENOENT);
        var a;
        if (
          ((t = void 0 === t ? 438 : t),
          (t =
            64 & (i = "string" == typeof i ? st.modeStringToFlags(i) : i)
              ? (4095 & t) | 32768
              : 0),
          "object" == typeof n)
        )
          a = n;
        else {
          n = rt.normalize(n);
          try {
            a = st.lookupPath(n, { follow: !(131072 & i) }).node;
          } catch (e) {}
        }
        var u = !1;
        if (64 & i)
          if (a) {
            if (128 & i) throw new st.ErrnoError(et.EEXIST);
          } else (a = st.mknod(n, t, 0)), (u = !0);
        if (!a) throw new st.ErrnoError(et.ENOENT);
        if (
          (st.isChrdev(a.mode) && (i &= -513), 65536 & i && !st.isDir(a.mode))
        )
          throw new st.ErrnoError(et.ENOTDIR);
        if (!u) {
          var l = st.mayOpen(a, i);
          if (l) throw new st.ErrnoError(l);
        }
        512 & i && st.truncate(a, 0), (i &= -641);
        var c = st.createStream(
          {
            node: a,
            path: st.getPath(a),
            flags: i,
            seekable: !0,
            position: 0,
            stream_ops: a.stream_ops,
            ungotten: [],
            error: !1,
          },
          r,
          o
        );
        c.stream_ops.open && c.stream_ops.open(c),
          !e.logReadFiles ||
            1 & i ||
            (st.readFiles || (st.readFiles = {}),
            n in st.readFiles || ((st.readFiles[n] = 1), l("read file: " + n)));
        try {
          if (st.trackingDelegate.onOpenFile) {
            var s = 0;
            1 != (2097155 & i) && (s |= st.tracking.openFlags.READ),
              0 != (2097155 & i) && (s |= st.tracking.openFlags.WRITE),
              st.trackingDelegate.onOpenFile(n, s);
          }
        } catch (e) {
          console.log(
            "FS.trackingDelegate['onOpenFile']('" +
              n +
              "', flags) threw an exception: " +
              e.message
          );
        }
        return c;
      },
      close: function (e) {
        if (st.isClosed(e)) throw new st.ErrnoError(et.EBADF);
        e.getdents && (e.getdents = null);
        try {
          e.stream_ops.close && e.stream_ops.close(e);
        } catch (e) {
          throw e;
        } finally {
          st.closeStream(e.fd);
        }
        e.fd = null;
      },
      isClosed: function (e) {
        return null === e.fd;
      },
      llseek: function (e, n, i) {
        if (st.isClosed(e)) throw new st.ErrnoError(et.EBADF);
        if (!e.seekable || !e.stream_ops.llseek)
          throw new st.ErrnoError(et.ESPIPE);
        return (
          (e.position = e.stream_ops.llseek(e, n, i)),
          (e.ungotten = []),
          e.position
        );
      },
      read: function (e, n, i, t, r) {
        if (t < 0 || r < 0) throw new st.ErrnoError(et.EINVAL);
        if (st.isClosed(e)) throw new st.ErrnoError(et.EBADF);
        if (1 == (2097155 & e.flags)) throw new st.ErrnoError(et.EBADF);
        if (st.isDir(e.node.mode)) throw new st.ErrnoError(et.EISDIR);
        if (!e.stream_ops.read) throw new st.ErrnoError(et.EINVAL);
        var o = void 0 !== r;
        if (o) {
          if (!e.seekable) throw new st.ErrnoError(et.ESPIPE);
        } else r = e.position;
        var a = e.stream_ops.read(e, n, i, t, r);
        return o || (e.position += a), a;
      },
      write: function (e, n, i, t, r, o) {
        if (t < 0 || r < 0) throw new st.ErrnoError(et.EINVAL);
        if (st.isClosed(e)) throw new st.ErrnoError(et.EBADF);
        if (0 == (2097155 & e.flags)) throw new st.ErrnoError(et.EBADF);
        if (st.isDir(e.node.mode)) throw new st.ErrnoError(et.EISDIR);
        if (!e.stream_ops.write) throw new st.ErrnoError(et.EINVAL);
        1024 & e.flags && st.llseek(e, 0, 2);
        var a = void 0 !== r;
        if (a) {
          if (!e.seekable) throw new st.ErrnoError(et.ESPIPE);
        } else r = e.position;
        var u = e.stream_ops.write(e, n, i, t, r, o);
        a || (e.position += u);
        try {
          e.path &&
            st.trackingDelegate.onWriteToFile &&
            st.trackingDelegate.onWriteToFile(e.path);
        } catch (e) {
          console.log(
            "FS.trackingDelegate['onWriteToFile']('" +
              path +
              "') threw an exception: " +
              e.message
          );
        }
        return u;
      },
      allocate: function (e, n, i) {
        if (st.isClosed(e)) throw new st.ErrnoError(et.EBADF);
        if (n < 0 || i <= 0) throw new st.ErrnoError(et.EINVAL);
        if (0 == (2097155 & e.flags)) throw new st.ErrnoError(et.EBADF);
        if (!st.isFile(e.node.mode) && !st.isDir(e.node.mode))
          throw new st.ErrnoError(et.ENODEV);
        if (!e.stream_ops.allocate) throw new st.ErrnoError(et.EOPNOTSUPP);
        e.stream_ops.allocate(e, n, i);
      },
      mmap: function (e, n, i, t, r, o, a) {
        if (1 == (2097155 & e.flags)) throw new st.ErrnoError(et.EACCES);
        if (!e.stream_ops.mmap) throw new st.ErrnoError(et.ENODEV);
        return e.stream_ops.mmap(e, n, i, t, r, o, a);
      },
      msync: function (e, n, i, t, r) {
        return e && e.stream_ops.msync ? e.stream_ops.msync(e, n, i, t, r) : 0;
      },
      munmap: function (e) {
        return 0;
      },
      ioctl: function (e, n, i) {
        if (!e.stream_ops.ioctl) throw new st.ErrnoError(et.ENOTTY);
        return e.stream_ops.ioctl(e, n, i);
      },
      readFile: function (e, n) {
        if (
          (((n = n || {}).flags = n.flags || "r"),
          (n.encoding = n.encoding || "binary"),
          "utf8" !== n.encoding && "binary" !== n.encoding)
        )
          throw new Error('Invalid encoding type "' + n.encoding + '"');
        var i,
          t = st.open(e, n.flags),
          r = st.stat(e).size,
          o = new Uint8Array(r);
        return (
          st.read(t, o, 0, r, 0),
          "utf8" === n.encoding
            ? (i = J(o, 0))
            : "binary" === n.encoding && (i = o),
          st.close(t),
          i
        );
      },
      writeFile: function (e, n, i) {
        (i = i || {}).flags = i.flags || "w";
        var t = st.open(e, i.flags, i.mode);
        if ("string" == typeof n) {
          var r = new Uint8Array($(n) + 1),
            o = Z(n, r, 0, r.length);
          st.write(t, r, 0, o, void 0, i.canOwn);
        } else {
          if (!ArrayBuffer.isView(n)) throw new Error("Unsupported data type");
          st.write(t, n, 0, n.byteLength, void 0, i.canOwn);
        }
        st.close(t);
      },
      cwd: function () {
        return st.currentPath;
      },
      chdir: function (e) {
        var n = st.lookupPath(e, { follow: !0 });
        if (null === n.node) throw new st.ErrnoError(et.ENOENT);
        if (!st.isDir(n.node.mode)) throw new st.ErrnoError(et.ENOTDIR);
        var i = st.nodePermissions(n.node, "x");
        if (i) throw new st.ErrnoError(i);
        st.currentPath = n.path;
      },
      createDefaultDirectories: function () {
        st.mkdir("/tmp"), st.mkdir("/home"), st.mkdir("/home/web_user");
      },
      createDefaultDevices: function () {
        var e;
        if (
          (st.mkdir("/dev"),
          st.registerDevice(st.makedev(1, 3), {
            read: function () {
              return 0;
            },
            write: function (e, n, i, t, r) {
              return t;
            },
          }),
          st.mkdev("/dev/null", st.makedev(1, 3)),
          ot.register(st.makedev(5, 0), ot.default_tty_ops),
          ot.register(st.makedev(6, 0), ot.default_tty1_ops),
          st.mkdev("/dev/tty", st.makedev(5, 0)),
          st.mkdev("/dev/tty1", st.makedev(6, 0)),
          "undefined" != typeof crypto)
        ) {
          var n = new Uint8Array(1);
          e = function () {
            return crypto.getRandomValues(n), n[0];
          };
        } else
          e = s
            ? function () {
                return require("crypto").randomBytes(1)[0];
              }
            : function () {
                return (256 * Math.random()) | 0;
              };
        st.createDevice("/dev", "random", e),
          st.createDevice("/dev", "urandom", e),
          st.mkdir("/dev/shm"),
          st.mkdir("/dev/shm/tmp");
      },
      createSpecialDirectories: function () {
        st.mkdir("/proc"),
          st.mkdir("/proc/self"),
          st.mkdir("/proc/self/fd"),
          st.mount(
            {
              mount: function () {
                var e = st.createNode("/proc/self", "fd", 16895, 73);
                return (
                  (e.node_ops = {
                    lookup: function (e, n) {
                      var i = +n,
                        t = st.getStream(i);
                      if (!t) throw new st.ErrnoError(et.EBADF);
                      var r = {
                        parent: null,
                        mount: { mountpoint: "fake" },
                        node_ops: {
                          readlink: function () {
                            return t.path;
                          },
                        },
                      };
                      return (r.parent = r), r;
                    },
                  }),
                  e
                );
              },
            },
            {},
            "/proc/self/fd"
          );
      },
      createStandardStreams: function () {
        e.stdin
          ? st.createDevice("/dev", "stdin", e.stdin)
          : st.symlink("/dev/tty", "/dev/stdin"),
          e.stdout
            ? st.createDevice("/dev", "stdout", null, e.stdout)
            : st.symlink("/dev/tty", "/dev/stdout"),
          e.stderr
            ? st.createDevice("/dev", "stderr", null, e.stderr)
            : st.symlink("/dev/tty1", "/dev/stderr");
        var n = st.open("/dev/stdin", "r");
        R(0 === n.fd, "invalid handle for stdin (" + n.fd + ")");
        var i = st.open("/dev/stdout", "w");
        R(1 === i.fd, "invalid handle for stdout (" + i.fd + ")");
        var t = st.open("/dev/stderr", "w");
        R(2 === t.fd, "invalid handle for stderr (" + t.fd + ")");
      },
      ensureErrnoError: function () {
        st.ErrnoError ||
          ((st.ErrnoError = function (e, n) {
            (this.node = n),
              (this.setErrno = function (e) {
                for (var n in ((this.errno = e), et))
                  if (et[n] === e) {
                    this.code = n;
                    break;
                  }
              }),
              this.setErrno(e),
              (this.message = tt[e]),
              this.stack &&
                Object.defineProperty(this, "stack", {
                  value: new Error().stack,
                  writable: !0,
                });
          }),
          (st.ErrnoError.prototype = new Error()),
          (st.ErrnoError.prototype.constructor = st.ErrnoError),
          [et.ENOENT].forEach(function (e) {
            (st.genericErrors[e] = new st.ErrnoError(e)),
              (st.genericErrors[e].stack = "<generic error, no stack>");
          }));
      },
      staticInit: function () {
        st.ensureErrnoError(),
          (st.nameTable = new Array(4096)),
          st.mount(at, {}, "/"),
          st.createDefaultDirectories(),
          st.createDefaultDevices(),
          st.createSpecialDirectories(),
          (st.filesystems = { MEMFS: at, IDBFS: ut, NODEFS: lt, WORKERFS: ct });
      },
      init: function (n, i, t) {
        R(
          !st.init.initialized,
          "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)"
        ),
          (st.init.initialized = !0),
          st.ensureErrnoError(),
          (e.stdin = n || e.stdin),
          (e.stdout = i || e.stdout),
          (e.stderr = t || e.stderr),
          st.createStandardStreams();
      },
      quit: function () {
        st.init.initialized = !1;
        var n = e._fflush;
        n && n(0);
        for (var i = 0; i < st.streams.length; i++) {
          var t = st.streams[i];
          t && st.close(t);
        }
      },
      getMode: function (e, n) {
        var i = 0;
        return e && (i |= 365), n && (i |= 146), i;
      },
      joinPath: function (e, n) {
        var i = rt.join.apply(null, e);
        return n && "/" == i[0] && (i = i.substr(1)), i;
      },
      absolutePath: function (e, n) {
        return rt.resolve(n, e);
      },
      standardizePath: function (e) {
        return rt.normalize(e);
      },
      findObject: function (e, n) {
        var i = st.analyzePath(e, n);
        return i.exists ? i.object : (nt(i.error), null);
      },
      analyzePath: function (e, n) {
        try {
          e = (t = st.lookupPath(e, { follow: !n })).path;
        } catch (e) {}
        var i = {
          isRoot: !1,
          exists: !1,
          error: 0,
          name: null,
          path: null,
          object: null,
          parentExists: !1,
          parentPath: null,
          parentObject: null,
        };
        try {
          var t = st.lookupPath(e, { parent: !0 });
          (i.parentExists = !0),
            (i.parentPath = t.path),
            (i.parentObject = t.node),
            (i.name = rt.basename(e)),
            (t = st.lookupPath(e, { follow: !n })),
            (i.exists = !0),
            (i.path = t.path),
            (i.object = t.node),
            (i.name = t.node.name),
            (i.isRoot = "/" === t.path);
        } catch (e) {
          i.error = e.errno;
        }
        return i;
      },
      createFolder: function (e, n, i, t) {
        var r = rt.join2("string" == typeof e ? e : st.getPath(e), n),
          o = st.getMode(i, t);
        return st.mkdir(r, o);
      },
      createPath: function (e, n, i, t) {
        e = "string" == typeof e ? e : st.getPath(e);
        for (var r = n.split("/").reverse(); r.length; ) {
          var o = r.pop();
          if (o) {
            var a = rt.join2(e, o);
            try {
              st.mkdir(a);
            } catch (e) {}
            e = a;
          }
        }
        return a;
      },
      createFile: function (e, n, i, t, r) {
        var o = rt.join2("string" == typeof e ? e : st.getPath(e), n),
          a = st.getMode(t, r);
        return st.create(o, a);
      },
      createDataFile: function (e, n, i, t, r, o) {
        var a = n ? rt.join2("string" == typeof e ? e : st.getPath(e), n) : e,
          u = st.getMode(t, r),
          l = st.create(a, u);
        if (i) {
          if ("string" == typeof i) {
            for (var c = new Array(i.length), s = 0, f = i.length; s < f; ++s)
              c[s] = i.charCodeAt(s);
            i = c;
          }
          st.chmod(l, 146 | u);
          var _ = st.open(l, "w");
          st.write(_, i, 0, i.length, 0, o), st.close(_), st.chmod(l, u);
        }
        return l;
      },
      createDevice: function (e, n, i, t) {
        var r = rt.join2("string" == typeof e ? e : st.getPath(e), n),
          o = st.getMode(!!i, !!t);
        st.createDevice.major || (st.createDevice.major = 64);
        var a = st.makedev(st.createDevice.major++, 0);
        return (
          st.registerDevice(a, {
            open: function (e) {
              e.seekable = !1;
            },
            close: function (e) {
              t && t.buffer && t.buffer.length && t(10);
            },
            read: function (e, n, t, r, o) {
              for (var a = 0, u = 0; u < r; u++) {
                var l;
                try {
                  l = i();
                } catch (e) {
                  throw new st.ErrnoError(et.EIO);
                }
                if (void 0 === l && 0 === a) throw new st.ErrnoError(et.EAGAIN);
                if (null == l) break;
                a++, (n[t + u] = l);
              }
              return a && (e.node.timestamp = Date.now()), a;
            },
            write: function (e, n, i, r, o) {
              for (var a = 0; a < r; a++)
                try {
                  t(n[i + a]);
                } catch (e) {
                  throw new st.ErrnoError(et.EIO);
                }
              return r && (e.node.timestamp = Date.now()), a;
            },
          }),
          st.mkdev(r, o, a)
        );
      },
      createLink: function (e, n, i, t, r) {
        var o = rt.join2("string" == typeof e ? e : st.getPath(e), n);
        return st.symlink(i, o);
      },
      forceLoadFile: function (n) {
        if (n.isDevice || n.isFolder || n.link || n.contents) return !0;
        var i = !0;
        if ("undefined" != typeof XMLHttpRequest)
          throw new Error(
            "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread."
          );
        if (!e.read)
          throw new Error("Cannot load without read() or XMLHttpRequest.");
        try {
          (n.contents = os(e.read(n.url), !0)),
            (n.usedBytes = n.contents.length);
        } catch (e) {
          i = !1;
        }
        return i || nt(et.EIO), i;
      },
      createLazyFile: function (e, n, i, t, r) {
        function o() {
          (this.lengthKnown = !1), (this.chunks = []);
        }
        if (
          ((o.prototype.get = function (e) {
            if (!(e > this.length - 1 || e < 0)) {
              var n = e % this.chunkSize,
                i = (e / this.chunkSize) | 0;
              return this.getter(i)[n];
            }
          }),
          (o.prototype.setDataGetter = function (e) {
            this.getter = e;
          }),
          (o.prototype.cacheLength = function () {
            var e = new XMLHttpRequest();
            if (
              (e.open("HEAD", i, !1),
              e.send(null),
              !((e.status >= 200 && e.status < 300) || 304 === e.status))
            )
              throw new Error("Couldn't load " + i + ". Status: " + e.status);
            var n,
              t = Number(e.getResponseHeader("Content-length")),
              r = (n = e.getResponseHeader("Accept-Ranges")) && "bytes" === n,
              o = (n = e.getResponseHeader("Content-Encoding")) && "gzip" === n,
              a = 1048576;
            r || (a = t);
            var u = this;
            u.setDataGetter(function (e) {
              var n = e * a,
                r = (e + 1) * a - 1;
              if (
                ((r = Math.min(r, t - 1)),
                void 0 === u.chunks[e] &&
                  (u.chunks[e] = (function (e, n) {
                    if (e > n)
                      throw new Error(
                        "invalid range (" +
                          e +
                          ", " +
                          n +
                          ") or no bytes requested!"
                      );
                    if (n > t - 1)
                      throw new Error(
                        "only " + t + " bytes available! programmer error!"
                      );
                    var r = new XMLHttpRequest();
                    if (
                      (r.open("GET", i, !1),
                      t !== a &&
                        r.setRequestHeader("Range", "bytes=" + e + "-" + n),
                      "undefined" != typeof Uint8Array &&
                        (r.responseType = "arraybuffer"),
                      r.overrideMimeType &&
                        r.overrideMimeType(
                          "text/plain; charset=x-user-defined"
                        ),
                      r.send(null),
                      !(
                        (r.status >= 200 && r.status < 300) ||
                        304 === r.status
                      ))
                    )
                      throw new Error(
                        "Couldn't load " + i + ". Status: " + r.status
                      );
                    return void 0 !== r.response
                      ? new Uint8Array(r.response || [])
                      : os(r.responseText || "", !0);
                  })(n, r)),
                void 0 === u.chunks[e])
              )
                throw new Error("doXHR failed!");
              return u.chunks[e];
            }),
              (!o && t) ||
                ((a = t = 1),
                (t = this.getter(0).length),
                (a = t),
                console.log(
                  "LazyFiles on gzip forces download of the whole file when length is accessed"
                )),
              (this._length = t),
              (this._chunkSize = a),
              (this.lengthKnown = !0);
          }),
          "undefined" != typeof XMLHttpRequest)
        ) {
          if (!c)
            throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
          var a = new o();
          Object.defineProperties(a, {
            length: {
              get: function () {
                return this.lengthKnown || this.cacheLength(), this._length;
              },
            },
            chunkSize: {
              get: function () {
                return this.lengthKnown || this.cacheLength(), this._chunkSize;
              },
            },
          });
          var u = { isDevice: !1, contents: a };
        } else u = { isDevice: !1, url: i };
        var l = st.createFile(e, n, u, t, r);
        u.contents
          ? (l.contents = u.contents)
          : u.url && ((l.contents = null), (l.url = u.url)),
          Object.defineProperties(l, {
            usedBytes: {
              get: function () {
                return this.contents.length;
              },
            },
          });
        var s = {};
        return (
          Object.keys(l.stream_ops).forEach(function (e) {
            var n = l.stream_ops[e];
            s[e] = function () {
              if (!st.forceLoadFile(l)) throw new st.ErrnoError(et.EIO);
              return n.apply(null, arguments);
            };
          }),
          (s.read = function (e, n, i, t, r) {
            if (!st.forceLoadFile(l)) throw new st.ErrnoError(et.EIO);
            var o = e.node.contents;
            if (r >= o.length) return 0;
            var a = Math.min(o.length - r, t);
            if ((R(a >= 0), o.slice))
              for (var u = 0; u < a; u++) n[i + u] = o[r + u];
            else for (u = 0; u < a; u++) n[i + u] = o.get(r + u);
            return a;
          }),
          (l.stream_ops = s),
          l
        );
      },
      createPreloadedFile: function (n, i, t, r, o, a, u, l, c, s) {
        hr.init();
        var f = i ? rt.resolve(rt.join2(n, i)) : n;
        function _(t) {
          function _(e) {
            s && s(), l || st.createDataFile(n, i, e, r, o, c), a && a(), sn();
          }
          var p = !1;
          e.preloadPlugins.forEach(function (e) {
            p ||
              (e.canHandle(f) &&
                (e.handle(t, f, _, function () {
                  u && u(), sn();
                }),
                (p = !0)));
          }),
            p || _(t);
        }
        cn(),
          "string" == typeof t
            ? hr.asyncLoad(
                t,
                function (e) {
                  _(e);
                },
                u
              )
            : _(t);
      },
      indexedDB: function () {
        return (
          window.indexedDB ||
          window.mozIndexedDB ||
          window.webkitIndexedDB ||
          window.msIndexedDB
        );
      },
      DB_NAME: function () {
        return "EM_FS_" + window.location.pathname;
      },
      DB_VERSION: 20,
      DB_STORE_NAME: "FILE_DATA",
      saveFilesToDB: function (e, n, i) {
        (n = n || function () {}), (i = i || function () {});
        var t = st.indexedDB();
        try {
          var r = t.open(st.DB_NAME(), st.DB_VERSION);
        } catch (e) {
          return i(e);
        }
        (r.onupgradeneeded = function () {
          console.log("creating db"),
            r.result.createObjectStore(st.DB_STORE_NAME);
        }),
          (r.onsuccess = function () {
            var t = r.result.transaction([st.DB_STORE_NAME], "readwrite"),
              o = t.objectStore(st.DB_STORE_NAME),
              a = 0,
              u = 0,
              l = e.length;
            function c() {
              0 == u ? n() : i();
            }
            e.forEach(function (e) {
              var n = o.put(st.analyzePath(e).object.contents, e);
              (n.onsuccess = function () {
                ++a + u == l && c();
              }),
                (n.onerror = function () {
                  u++, a + u == l && c();
                });
            }),
              (t.onerror = i);
          }),
          (r.onerror = i);
      },
      loadFilesFromDB: function (e, n, i) {
        (n = n || function () {}), (i = i || function () {});
        var t = st.indexedDB();
        try {
          var r = t.open(st.DB_NAME(), st.DB_VERSION);
        } catch (e) {
          return i(e);
        }
        (r.onupgradeneeded = i),
          (r.onsuccess = function () {
            var t = r.result;
            try {
              var o = t.transaction([st.DB_STORE_NAME], "readonly");
            } catch (e) {
              return void i(e);
            }
            var a = o.objectStore(st.DB_STORE_NAME),
              u = 0,
              l = 0,
              c = e.length;
            function s() {
              0 == l ? n() : i();
            }
            e.forEach(function (e) {
              var n = a.get(e);
              (n.onsuccess = function () {
                st.analyzePath(e).exists && st.unlink(e),
                  st.createDataFile(
                    rt.dirname(e),
                    rt.basename(e),
                    n.result,
                    !0,
                    !0,
                    !0
                  ),
                  ++u + l == c && s();
              }),
                (n.onerror = function () {
                  l++, u + l == c && s();
                });
            }),
              (o.onerror = i);
          }),
          (r.onerror = i);
      },
    },
    ft = {
      DEFAULT_POLLMASK: 5,
      mappings: {},
      umask: 511,
      calculateAt: function (e, n) {
        if ("/" !== n[0]) {
          var i;
          if (-100 === e) i = st.cwd();
          else {
            var t = st.getStream(e);
            if (!t) throw new st.ErrnoError(et.EBADF);
            i = t.path;
          }
          n = rt.join2(i, n);
        }
        return n;
      },
      doStat: function (e, n, i) {
        try {
          var t = e(n);
        } catch (e) {
          if (
            e &&
            e.node &&
            rt.normalize(n) !== rt.normalize(st.getPath(e.node))
          )
            return -et.ENOTDIR;
          throw e;
        }
        return (
          (se[i >> 2] = t.dev),
          (se[(i + 4) >> 2] = 0),
          (se[(i + 8) >> 2] = t.ino),
          (se[(i + 12) >> 2] = t.mode),
          (se[(i + 16) >> 2] = t.nlink),
          (se[(i + 20) >> 2] = t.uid),
          (se[(i + 24) >> 2] = t.gid),
          (se[(i + 28) >> 2] = t.rdev),
          (se[(i + 32) >> 2] = 0),
          (se[(i + 36) >> 2] = t.size),
          (se[(i + 40) >> 2] = 4096),
          (se[(i + 44) >> 2] = t.blocks),
          (se[(i + 48) >> 2] = (t.atime.getTime() / 1e3) | 0),
          (se[(i + 52) >> 2] = 0),
          (se[(i + 56) >> 2] = (t.mtime.getTime() / 1e3) | 0),
          (se[(i + 60) >> 2] = 0),
          (se[(i + 64) >> 2] = (t.ctime.getTime() / 1e3) | 0),
          (se[(i + 68) >> 2] = 0),
          (se[(i + 72) >> 2] = t.ino),
          0
        );
      },
      doMsync: function (e, n, i, t) {
        var r = new Uint8Array(ue.subarray(e, e + i));
        st.msync(n, r, 0, i, t);
      },
      doMkdir: function (e, n) {
        return (
          "/" === (e = rt.normalize(e))[e.length - 1] &&
            (e = e.substr(0, e.length - 1)),
          st.mkdir(e, n, 0),
          0
        );
      },
      doMknod: function (e, n, i) {
        switch (61440 & n) {
          case 32768:
          case 8192:
          case 24576:
          case 4096:
          case 49152:
            break;
          default:
            return -et.EINVAL;
        }
        return st.mknod(e, n, i), 0;
      },
      doReadlink: function (e, n, i) {
        if (i <= 0) return -et.EINVAL;
        var t = st.readlink(e),
          r = Math.min(i, $(t)),
          o = ae[n + r];
        return Q(t, n, i + 1), (ae[n + r] = o), r;
      },
      doAccess: function (e, n) {
        if (-8 & n) return -et.EINVAL;
        var i;
        i = st.lookupPath(e, { follow: !0 }).node;
        var t = "";
        return (
          4 & n && (t += "r"),
          2 & n && (t += "w"),
          1 & n && (t += "x"),
          t && st.nodePermissions(i, t) ? -et.EACCES : 0
        );
      },
      doDup: function (e, n, i) {
        var t = st.getStream(i);
        return t && st.close(t), st.open(e, n, 0, i, i).fd;
      },
      doReadv: function (e, n, i, t) {
        for (var r = 0, o = 0; o < i; o++) {
          var a = se[(n + 8 * o) >> 2],
            u = se[(n + (8 * o + 4)) >> 2],
            l = st.read(e, ae, a, u, t);
          if (l < 0) return -1;
          if (((r += l), l < u)) break;
        }
        return r;
      },
      doWritev: function (e, n, i, t) {
        for (var r = 0, o = 0; o < i; o++) {
          var a = se[(n + 8 * o) >> 2],
            u = se[(n + (8 * o + 4)) >> 2],
            l = st.write(e, ae, a, u, t);
          if (l < 0) return -1;
          r += l;
        }
        return r;
      },
      varargs: 0,
      get: function (e) {
        return (ft.varargs += 4), se[(ft.varargs - 4) >> 2];
      },
      getStr: function () {
        return X(ft.get());
      },
      getStreamFromFD: function () {
        var e = st.getStream(ft.get());
        if (!e) throw new st.ErrnoError(et.EBADF);
        return e;
      },
      getSocketFromFD: function () {
        var e = pt.getSocket(ft.get());
        if (!e) throw new st.ErrnoError(et.EBADF);
        return e;
      },
      getSocketAddress: function (e) {
        var n = ft.get(),
          i = ft.get();
        if (e && 0 === n) return null;
        var t = gt(n, i);
        if (t.errno) throw new st.ErrnoError(t.errno);
        return (t.addr = yt.lookup_addr(t.addr) || t.addr), t;
      },
      get64: function () {
        var e = ft.get(),
          n = ft.get();
        return R(e >= 0 ? 0 === n : -1 === n), e;
      },
      getZero: function () {
        R(0 === ft.get());
      },
    };
  function _t(e, n) {
    ft.varargs = n;
    try {
      var i = ft.getStr();
      return st.unlink(i), 0;
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  var pt = {
    mount: function (n) {
      return (
        (e.websocket =
          e.websocket && "object" == typeof e.websocket ? e.websocket : {}),
        (e.websocket._callbacks = {}),
        (e.websocket.on = function (e, n) {
          return "function" == typeof n && (this._callbacks[e] = n), this;
        }),
        (e.websocket.emit = function (e, n) {
          "function" == typeof this._callbacks[e] &&
            this._callbacks[e].call(this, n);
        }),
        st.createNode(null, "/", 16895, 0)
      );
    },
    createSocket: function (e, n, i) {
      i && R((1 == n) == (6 == i));
      var t = {
          family: e,
          type: n,
          protocol: i,
          server: null,
          error: null,
          peers: {},
          pending: [],
          recv_queue: [],
          sock_ops: pt.websocket_sock_ops,
        },
        r = pt.nextname(),
        o = st.createNode(pt.root, r, 49152, 0);
      o.sock = t;
      var a = st.createStream({
        path: r,
        node: o,
        flags: st.modeStringToFlags("r+"),
        seekable: !1,
        stream_ops: pt.stream_ops,
      });
      return (t.stream = a), t;
    },
    getSocket: function (e) {
      var n = st.getStream(e);
      return n && st.isSocket(n.node.mode) ? n.node.sock : null;
    },
    stream_ops: {
      poll: function (e) {
        var n = e.node.sock;
        return n.sock_ops.poll(n);
      },
      ioctl: function (e, n, i) {
        var t = e.node.sock;
        return t.sock_ops.ioctl(t, n, i);
      },
      read: function (e, n, i, t, r) {
        var o = e.node.sock,
          a = o.sock_ops.recvmsg(o, t);
        return a ? (n.set(a.buffer, i), a.buffer.length) : 0;
      },
      write: function (e, n, i, t, r) {
        var o = e.node.sock;
        return o.sock_ops.sendmsg(o, n, i, t);
      },
      close: function (e) {
        var n = e.node.sock;
        n.sock_ops.close(n);
      },
    },
    nextname: function () {
      return (
        pt.nextname.current || (pt.nextname.current = 0),
        "socket[" + pt.nextname.current++ + "]"
      );
    },
    websocket_sock_ops: {
      createPeer: function (n, i, t) {
        var r;
        if (("object" == typeof i && ((r = i), (i = null), (t = null)), r))
          if (r._socket)
            (i = r._socket.remoteAddress), (t = r._socket.remotePort);
          else {
            var o = /ws[s]?:\/\/([^:]+):(\d+)/.exec(r.url);
            if (!o)
              throw new Error(
                "WebSocket URL must be in the format ws(s)://address:port"
              );
            (i = o[1]), (t = parseInt(o[2], 10));
          }
        else
          try {
            var a = e.websocket && "object" == typeof e.websocket,
              u = "ws:#".replace("#", "//");
            if (
              (a && "string" == typeof e.websocket.url && (u = e.websocket.url),
              "ws://" === u || "wss://" === u)
            ) {
              var c = i.split("/");
              u = u + c[0] + ":" + t + "/" + c.slice(1).join("/");
            }
            var f = "binary";
            a &&
              "string" == typeof e.websocket.subprotocol &&
              (f = e.websocket.subprotocol),
              (f = f.replace(/^ +| +$/g, "").split(/ *, */));
            var _ = s ? { protocol: f.toString() } : f;
            a &&
              null === e.websocket.subprotocol &&
              ((f = "null"), (_ = void 0)),
              ((r = new (s ? require("ws") : l ? window.WebSocket : WebSocket)(
                u,
                _
              )).binaryType = "arraybuffer");
          } catch (e) {
            throw new st.ErrnoError(et.EHOSTUNREACH);
          }
        var p = { addr: i, port: t, socket: r, dgram_send_queue: [] };
        return (
          pt.websocket_sock_ops.addPeer(n, p),
          pt.websocket_sock_ops.handlePeerEvents(n, p),
          2 === n.type &&
            void 0 !== n.sport &&
            p.dgram_send_queue.push(
              new Uint8Array([
                255,
                255,
                255,
                255,
                "p".charCodeAt(0),
                "o".charCodeAt(0),
                "r".charCodeAt(0),
                "t".charCodeAt(0),
                (65280 & n.sport) >> 8,
                255 & n.sport,
              ])
            ),
          p
        );
      },
      getPeer: function (e, n, i) {
        return e.peers[n + ":" + i];
      },
      addPeer: function (e, n) {
        e.peers[n.addr + ":" + n.port] = n;
      },
      removePeer: function (e, n) {
        delete e.peers[n.addr + ":" + n.port];
      },
      handlePeerEvents: function (n, i) {
        var t = !0,
          r = function () {
            e.websocket.emit("open", n.stream.fd);
            try {
              for (var t = i.dgram_send_queue.shift(); t; )
                i.socket.send(t), (t = i.dgram_send_queue.shift());
            } catch (e) {
              i.socket.close();
            }
          };
        function o(r) {
          if (
            (R("string" != typeof r && void 0 !== r.byteLength),
            0 != r.byteLength)
          ) {
            r = new Uint8Array(r);
            var o = t;
            if (
              ((t = !1),
              o &&
                10 === r.length &&
                255 === r[0] &&
                255 === r[1] &&
                255 === r[2] &&
                255 === r[3] &&
                r[4] === "p".charCodeAt(0) &&
                r[5] === "o".charCodeAt(0) &&
                r[6] === "r".charCodeAt(0) &&
                r[7] === "t".charCodeAt(0))
            ) {
              var a = (r[8] << 8) | r[9];
              return (
                pt.websocket_sock_ops.removePeer(n, i),
                (i.port = a),
                void pt.websocket_sock_ops.addPeer(n, i)
              );
            }
            n.recv_queue.push({ addr: i.addr, port: i.port, data: r }),
              e.websocket.emit("message", n.stream.fd);
          }
        }
        s
          ? (i.socket.on("open", r),
            i.socket.on("message", function (e, n) {
              n.binary && o(new Uint8Array(e).buffer);
            }),
            i.socket.on("close", function () {
              e.websocket.emit("close", n.stream.fd);
            }),
            i.socket.on("error", function (i) {
              (n.error = et.ECONNREFUSED),
                e.websocket.emit("error", [
                  n.stream.fd,
                  n.error,
                  "ECONNREFUSED: Connection refused",
                ]);
            }))
          : ((i.socket.onopen = r),
            (i.socket.onclose = function () {
              e.websocket.emit("close", n.stream.fd);
            }),
            (i.socket.onmessage = function (e) {
              o(e.data);
            }),
            (i.socket.onerror = function (i) {
              (n.error = et.ECONNREFUSED),
                e.websocket.emit("error", [
                  n.stream.fd,
                  n.error,
                  "ECONNREFUSED: Connection refused",
                ]);
            }));
      },
      poll: function (e) {
        if (1 === e.type && e.server) return e.pending.length ? 65 : 0;
        var n = 0,
          i =
            1 === e.type
              ? pt.websocket_sock_ops.getPeer(e, e.daddr, e.dport)
              : null;
        return (
          (e.recv_queue.length ||
            !i ||
            (i && i.socket.readyState === i.socket.CLOSING) ||
            (i && i.socket.readyState === i.socket.CLOSED)) &&
            (n |= 65),
          (!i || (i && i.socket.readyState === i.socket.OPEN)) && (n |= 4),
          ((i && i.socket.readyState === i.socket.CLOSING) ||
            (i && i.socket.readyState === i.socket.CLOSED)) &&
            (n |= 16),
          n
        );
      },
      ioctl: function (e, n, i) {
        if (21531 === n) {
          var t = 0;
          return (
            e.recv_queue.length && (t = e.recv_queue[0].data.length),
            (se[i >> 2] = t),
            0
          );
        }
        return et.EINVAL;
      },
      close: function (e) {
        if (e.server) {
          try {
            e.server.close();
          } catch (e) {}
          e.server = null;
        }
        for (var n = Object.keys(e.peers), i = 0; i < n.length; i++) {
          var t = e.peers[n[i]];
          try {
            t.socket.close();
          } catch (e) {}
          pt.websocket_sock_ops.removePeer(e, t);
        }
        return 0;
      },
      bind: function (e, n, i) {
        if (void 0 !== e.saddr || void 0 !== e.sport)
          throw new st.ErrnoError(et.EINVAL);
        if (((e.saddr = n), (e.sport = i), 2 === e.type)) {
          e.server && (e.server.close(), (e.server = null));
          try {
            e.sock_ops.listen(e, 0);
          } catch (e) {
            if (!(e instanceof st.ErrnoError)) throw e;
            if (e.errno !== et.EOPNOTSUPP) throw e;
          }
        }
      },
      connect: function (e, n, i) {
        if (e.server) throw new st.ErrnoError(et.EOPNOTSUPP);
        if (void 0 !== e.daddr && void 0 !== e.dport) {
          var t = pt.websocket_sock_ops.getPeer(e, e.daddr, e.dport);
          if (t)
            throw t.socket.readyState === t.socket.CONNECTING
              ? new st.ErrnoError(et.EALREADY)
              : new st.ErrnoError(et.EISCONN);
        }
        var r = pt.websocket_sock_ops.createPeer(e, n, i);
        throw (
          ((e.daddr = r.addr),
          (e.dport = r.port),
          new st.ErrnoError(et.EINPROGRESS))
        );
      },
      listen: function (n, i) {
        if (!s) throw new st.ErrnoError(et.EOPNOTSUPP);
        if (n.server) throw new st.ErrnoError(et.EINVAL);
        var t = require("ws").Server,
          r = n.saddr;
        (n.server = new t({ host: r, port: n.sport })),
          e.websocket.emit("listen", n.stream.fd),
          n.server.on("connection", function (i) {
            if (1 === n.type) {
              var t = pt.createSocket(n.family, n.type, n.protocol),
                r = pt.websocket_sock_ops.createPeer(t, i);
              (t.daddr = r.addr),
                (t.dport = r.port),
                n.pending.push(t),
                e.websocket.emit("connection", t.stream.fd);
            } else pt.websocket_sock_ops.createPeer(n, i), e.websocket.emit("connection", n.stream.fd);
          }),
          n.server.on("closed", function () {
            e.websocket.emit("close", n.stream.fd), (n.server = null);
          }),
          n.server.on("error", function (i) {
            (n.error = et.EHOSTUNREACH),
              e.websocket.emit("error", [
                n.stream.fd,
                n.error,
                "EHOSTUNREACH: Host is unreachable",
              ]);
          });
      },
      accept: function (e) {
        if (!e.server) throw new st.ErrnoError(et.EINVAL);
        var n = e.pending.shift();
        return (n.stream.flags = e.stream.flags), n;
      },
      getname: function (e, n) {
        var i, t;
        if (n) {
          if (void 0 === e.daddr || void 0 === e.dport)
            throw new st.ErrnoError(et.ENOTCONN);
          (i = e.daddr), (t = e.dport);
        } else (i = e.saddr || 0), (t = e.sport || 0);
        return { addr: i, port: t };
      },
      sendmsg: function (e, n, i, t, r, o) {
        if (2 === e.type) {
          if (
            ((void 0 !== r && void 0 !== o) || ((r = e.daddr), (o = e.dport)),
            void 0 === r || void 0 === o)
          )
            throw new st.ErrnoError(et.EDESTADDRREQ);
        } else (r = e.daddr), (o = e.dport);
        var a,
          u = pt.websocket_sock_ops.getPeer(e, r, o);
        if (1 === e.type) {
          if (
            !u ||
            u.socket.readyState === u.socket.CLOSING ||
            u.socket.readyState === u.socket.CLOSED
          )
            throw new st.ErrnoError(et.ENOTCONN);
          if (u.socket.readyState === u.socket.CONNECTING)
            throw new st.ErrnoError(et.EAGAIN);
        }
        if (
          (ArrayBuffer.isView(n) && ((i += n.byteOffset), (n = n.buffer)),
          (a = n.slice(i, i + t)),
          2 === e.type && (!u || u.socket.readyState !== u.socket.OPEN))
        )
          return (
            (u &&
              u.socket.readyState !== u.socket.CLOSING &&
              u.socket.readyState !== u.socket.CLOSED) ||
              (u = pt.websocket_sock_ops.createPeer(e, r, o)),
            u.dgram_send_queue.push(a),
            t
          );
        try {
          return u.socket.send(a), t;
        } catch (e) {
          throw new st.ErrnoError(et.EINVAL);
        }
      },
      recvmsg: function (e, n) {
        if (1 === e.type && e.server) throw new st.ErrnoError(et.ENOTCONN);
        var i = e.recv_queue.shift();
        if (!i) {
          if (1 === e.type) {
            var t = pt.websocket_sock_ops.getPeer(e, e.daddr, e.dport);
            if (t) {
              if (
                t.socket.readyState === t.socket.CLOSING ||
                t.socket.readyState === t.socket.CLOSED
              )
                return null;
              throw new st.ErrnoError(et.EAGAIN);
            }
            throw new st.ErrnoError(et.ENOTCONN);
          }
          throw new st.ErrnoError(et.EAGAIN);
        }
        var r = i.data.byteLength || i.data.length,
          o = i.data.byteOffset || 0,
          a = i.data.buffer || i.data,
          u = Math.min(n, r),
          l = { buffer: new Uint8Array(a, o, u), addr: i.addr, port: i.port };
        if (1 === e.type && u < r) {
          var c = r - u;
          (i.data = new Uint8Array(a, o + u, c)), e.recv_queue.unshift(i);
        }
        return l;
      },
    },
  };
  function dt(e) {
    for (var n = e.split("."), i = 0; i < 4; i++) {
      var t = Number(n[i]);
      if (isNaN(t)) return null;
      n[i] = t;
    }
    return (n[0] | (n[1] << 8) | (n[2] << 16) | (n[3] << 24)) >>> 0;
  }
  function mt(e) {
    var n,
      i,
      t,
      r,
      o = [];
    if (
      !/^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i.test(
        e
      )
    )
      return null;
    if ("::" === e) return [0, 0, 0, 0, 0, 0, 0, 0];
    for (
      (e =
        0 === e.indexOf("::")
          ? e.replace("::", "Z:")
          : e.replace("::", ":Z:")).indexOf(".") > 0
        ? (((n = (e = e.replace(new RegExp("[.]", "g"), ":")).split(":"))[
            n.length - 4
          ] = parseInt(n[n.length - 4]) + 256 * parseInt(n[n.length - 3])),
          (n[n.length - 3] =
            parseInt(n[n.length - 2]) + 256 * parseInt(n[n.length - 1])),
          (n = n.slice(0, n.length - 2)))
        : (n = e.split(":")),
        t = 0,
        r = 0,
        i = 0;
      i < n.length;
      i++
    )
      if ("string" == typeof n[i])
        if ("Z" === n[i]) {
          for (r = 0; r < 8 - n.length + 1; r++) o[i + r] = 0;
          t = r - 1;
        } else o[i + t] = yb(parseInt(n[i], 16));
      else o[i + t] = n[i];
    return [
      (o[1] << 16) | o[0],
      (o[3] << 16) | o[2],
      (o[5] << 16) | o[4],
      (o[7] << 16) | o[6],
    ];
  }
  var yt = {
    address_map: { id: 1, addrs: {}, names: {} },
    lookup_name: function (e) {
      var n,
        i = dt(e);
      if (null !== i) return e;
      if (null !== (i = mt(e))) return e;
      if (yt.address_map.addrs[e]) n = yt.address_map.addrs[e];
      else {
        var t = yt.address_map.id++;
        R(t < 65535, "exceeded max address mappings of 65535"),
          (n = "172.29." + (255 & t) + "." + (65280 & t)),
          (yt.address_map.names[n] = e),
          (yt.address_map.addrs[e] = n);
      }
      return n;
    },
    lookup_addr: function (e) {
      return yt.address_map.names[e] ? yt.address_map.names[e] : null;
    },
  };
  function vt(e) {
    return (
      (255 & e) +
      "." +
      ((e >> 8) & 255) +
      "." +
      ((e >> 16) & 255) +
      "." +
      ((e >> 24) & 255)
    );
  }
  function ht(e) {
    var n = "",
      i = 0,
      t = 0,
      r = 0,
      o = 0,
      a = 0,
      u = 0,
      l = [
        65535 & e[0],
        e[0] >> 16,
        65535 & e[1],
        e[1] >> 16,
        65535 & e[2],
        e[2] >> 16,
        65535 & e[3],
        e[3] >> 16,
      ],
      c = !0,
      s = "";
    for (u = 0; u < 5; u++)
      if (0 !== l[u]) {
        c = !1;
        break;
      }
    if (c) {
      if (((s = vt(l[6] | (l[7] << 16))), -1 === l[5]))
        return (n = "::ffff:"), (n += s);
      if (0 === l[5])
        return (
          (n = "::"),
          "0.0.0.0" === s && (s = ""),
          "0.0.0.1" === s && (s = "1"),
          (n += s)
        );
    }
    for (i = 0; i < 8; i++)
      0 === l[i] && (i - r > 1 && (a = 0), (r = i), a++),
        a > t && (o = i - (t = a) + 1);
    for (i = 0; i < 8; i++)
      t > 1 && 0 === l[i] && i >= o && i < o + t
        ? i === o && ((n += ":"), 0 === o && (n += ":"))
        : ((n += Number(wb(65535 & l[i])).toString(16)),
          (n += i < 7 ? ":" : ""));
    return n;
  }
  function gt(e, n) {
    var i,
      t = le[e >> 1],
      r = wb(le[(e + 2) >> 1]);
    switch (t) {
      case 2:
        if (16 !== n) return { errno: et.EINVAL };
        i = vt((i = se[(e + 4) >> 2]));
        break;
      case 10:
        if (28 !== n) return { errno: et.EINVAL };
        i = ht(
          (i = [
            se[(e + 8) >> 2],
            se[(e + 12) >> 2],
            se[(e + 16) >> 2],
            se[(e + 20) >> 2],
          ])
        );
        break;
      default:
        return { errno: et.EAFNOSUPPORT };
    }
    return { family: t, addr: i, port: r };
  }
  function bt(e, n, i, t) {
    switch (n) {
      case 2:
        (i = dt(i)),
          (le[e >> 1] = n),
          (se[(e + 4) >> 2] = i),
          (le[(e + 2) >> 1] = yb(t));
        break;
      case 10:
        (i = mt(i)),
          (se[e >> 2] = n),
          (se[(e + 8) >> 2] = i[0]),
          (se[(e + 12) >> 2] = i[1]),
          (se[(e + 16) >> 2] = i[2]),
          (se[(e + 20) >> 2] = i[3]),
          (le[(e + 2) >> 1] = yb(t)),
          (se[(e + 4) >> 2] = 0),
          (se[(e + 24) >> 2] = 0);
        break;
      default:
        return { errno: et.EAFNOSUPPORT };
    }
    return {};
  }
  function wt(e, n) {
    ft.varargs = n;
    try {
      var i = ft.get(),
        r = ft.get();
      switch (((ft.varargs = r), i)) {
        case 1:
          var o = ft.get(),
            a = ft.get(),
            u = ft.get();
          return R((l = pt.createSocket(o, a, u)).stream.fd < 64), l.stream.fd;
        case 2:
          var l = ft.getSocketFromFD(),
            c = ft.getSocketAddress();
          return l.sock_ops.bind(l, c.addr, c.port), 0;
        case 3:
          (l = ft.getSocketFromFD()), (c = ft.getSocketAddress());
          return l.sock_ops.connect(l, c.addr, c.port), 0;
        case 4:
          l = ft.getSocketFromFD();
          var s = ft.get();
          return l.sock_ops.listen(l, s), 0;
        case 5:
          l = ft.getSocketFromFD();
          var f = ft.get(),
            _ = (ft.get(), l.sock_ops.accept(l));
          if (f) R(!bt(f, _.family, yt.lookup_name(_.daddr), _.dport).errno);
          return _.stream.fd;
        case 6:
          (l = ft.getSocketFromFD()), (f = ft.get()), ft.get();
          return (
            R(
              !bt(f, l.family, yt.lookup_name(l.saddr || "0.0.0.0"), l.sport)
                .errno
            ),
            0
          );
        case 7:
          (l = ft.getSocketFromFD()), (f = ft.get()), ft.get();
          return l.daddr
            ? (R(!bt(f, l.family, yt.lookup_name(l.daddr), l.dport).errno), 0)
            : -et.ENOTCONN;
        case 11:
          l = ft.getSocketFromFD();
          var p = ft.get(),
            d = ft.get(),
            m = (ft.get(), ft.getSocketAddress(!0));
          return m
            ? l.sock_ops.sendmsg(l, ae, p, d, m.addr, m.port)
            : st.write(l.stream, ae, p, d);
        case 12:
          l = ft.getSocketFromFD();
          var y = ft.get(),
            v = ft.get();
          ft.get(), (f = ft.get()), ft.get();
          if (!(x = l.sock_ops.recvmsg(l, v))) return 0;
          if (f) R(!bt(f, l.family, yt.lookup_name(x.addr), x.port).errno);
          return ue.set(x.buffer, y), x.buffer.byteLength;
        case 14:
          return -et.ENOPROTOOPT;
        case 15:
          l = ft.getSocketFromFD();
          var h = ft.get(),
            g = ft.get(),
            b = ft.get(),
            w = ft.get();
          return 1 === h && 4 === g
            ? ((se[b >> 2] = l.error), (se[w >> 2] = 4), (l.error = null), 0)
            : -et.ENOPROTOOPT;
        case 16:
          (l = ft.getSocketFromFD()), (p = ft.get()), ft.get();
          var E,
            C = se[(p + 8) >> 2],
            L = se[(p + 12) >> 2],
            k = se[p >> 2],
            A = se[(p + 4) >> 2];
          if (k) {
            if ((c = gt(k, A)).errno) return -c.errno;
            (E = c.port), (f = yt.lookup_addr(c.addr) || c.addr);
          }
          for (var I = 0, S = 0; S < L; S++) I += se[(C + (8 * S + 4)) >> 2];
          var O = new Uint8Array(I),
            T = 0;
          for (S = 0; S < L; S++)
            for (
              var j = se[(C + (8 * S + 0)) >> 2],
                B = se[(C + (8 * S + 4)) >> 2],
                G = 0;
              G < B;
              G++
            )
              O[T++] = ae[(j + G) >> 0];
          return l.sock_ops.sendmsg(l, O, 0, I, f, E);
        case 17:
          for (
            l = ft.getSocketFromFD(),
              p = ft.get(),
              ft.get(),
              C = se[(p + 8) >> 2],
              L = se[(p + 12) >> 2],
              I = 0,
              S = 0;
            S < L;
            S++
          )
            I += se[(C + (8 * S + 4)) >> 2];
          var x;
          if (!(x = l.sock_ops.recvmsg(l, I))) return 0;
          if ((k = se[p >> 2]))
            R(!bt(k, l.family, yt.lookup_name(x.addr), x.port).errno);
          var D = 0,
            P = x.buffer.byteLength;
          for (S = 0; P > 0 && S < L; S++) {
            j = se[(C + (8 * S + 0)) >> 2];
            if ((B = se[(C + (8 * S + 4)) >> 2])) {
              (d = Math.min(B, P)), (y = x.buffer.subarray(D, D + d));
              ue.set(y, j + D), (D += d), (P -= d);
            }
          }
          return D;
        default:
          t("unsupported socketcall syscall " + i);
      }
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function Et(e, n) {
    ft.varargs = n;
    try {
      var i = ft.get();
      if (!i) return -et.EFAULT;
      var r = {
        sysname: 0,
        nodename: 65,
        domainname: 325,
        machine: 260,
        version: 195,
        release: 130,
        __size__: 390,
      };
      function o(e, n) {
        Je(n, i + r[e]);
      }
      return (
        o("sysname", "Emscripten"),
        o("nodename", "emscripten"),
        o("release", "1.0"),
        o("version", "#1"),
        o("machine", "x86-JS"),
        0
      );
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function Ct(e, n) {
    ft.varargs = n;
    try {
      var i = ft.getStreamFromFD(),
        r = (ft.get(), ft.get()),
        o = ft.get(),
        a = ft.get(),
        u = r;
      return (
        st.llseek(i, u, a),
        (se[o >> 2] = i.position),
        i.getdents && 0 === u && 0 === a && (i.getdents = null),
        0
      );
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function Lt(e, n) {
    ft.varargs = n;
    try {
      var i = ft.get(),
        r = ft.get(),
        o = ft.get(),
        a = ft.get();
      ft.get();
      R(i <= 64, "nfds must be less than or equal to 64"),
        R(!a, "exceptfds not supported");
      var u = 0,
        l = r ? se[r >> 2] : 0,
        c = r ? se[(r + 4) >> 2] : 0,
        s = o ? se[o >> 2] : 0,
        f = o ? se[(o + 4) >> 2] : 0,
        _ = a ? se[a >> 2] : 0,
        p = a ? se[(a + 4) >> 2] : 0,
        d = 0,
        m = 0,
        y = 0,
        v = 0,
        h = 0,
        g = 0,
        b = (r ? se[r >> 2] : 0) | (o ? se[o >> 2] : 0) | (a ? se[a >> 2] : 0),
        w =
          (r ? se[(r + 4) >> 2] : 0) |
          (o ? se[(o + 4) >> 2] : 0) |
          (a ? se[(a + 4) >> 2] : 0);
      function E(e, n, i, t) {
        return e < 32 ? n & t : i & t;
      }
      for (var C = 0; C < i; C++) {
        var L = 1 << C % 32;
        if (E(C, b, w, L)) {
          var k = st.getStream(C);
          if (!k) throw new st.ErrnoError(et.EBADF);
          var A = ft.DEFAULT_POLLMASK;
          k.stream_ops.poll && (A = k.stream_ops.poll(k)),
            1 & A && E(C, l, c, L) && (C < 32 ? (d |= L) : (m |= L), u++),
            4 & A && E(C, s, f, L) && (C < 32 ? (y |= L) : (v |= L), u++),
            2 & A && E(C, _, p, L) && (C < 32 ? (h |= L) : (g |= L), u++);
        }
      }
      return (
        r && ((se[r >> 2] = d), (se[(r + 4) >> 2] = m)),
        o && ((se[o >> 2] = y), (se[(o + 4) >> 2] = v)),
        a && ((se[a >> 2] = h), (se[(a + 4) >> 2] = g)),
        u
      );
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function kt(e, n) {
    ft.varargs = n;
    try {
      var i = ft.getStreamFromFD(),
        r = ft.get(),
        o = ft.get();
      return ft.doReadv(i, r, o);
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function At(e, n) {
    ft.varargs = n;
    try {
      var i = ft.getStreamFromFD(),
        r = ft.get(),
        o = ft.get();
      return ft.doWritev(i, r, o);
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function It(e, n) {
    ft.varargs = n;
    try {
      var i = ft.getStr(),
        r = ft.get();
      return st.chmod(i, r), 0;
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function St(e, n) {
    ft.varargs = n;
    try {
      for (
        var i = ft.get(), r = ft.get(), o = (ft.get(), 0), a = 0;
        a < r;
        a++
      ) {
        var u = i + 8 * a,
          l = se[u >> 2],
          c = le[(u + 4) >> 1],
          s = 32,
          f = st.getStream(l);
        f &&
          ((s = ft.DEFAULT_POLLMASK),
          f.stream_ops.poll && (s = f.stream_ops.poll(f))),
          (s &= 24 | c) && o++,
          (le[(u + 6) >> 1] = s);
      }
      return o;
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function Ot(e, n) {
    ft.varargs = n;
    try {
      var i = ft.get(),
        r = ft.get();
      if (0 === r) return -et.EINVAL;
      var o = st.cwd();
      return r < $(o) + 1 ? -et.ERANGE : (Q(o, i, r), i);
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function Tt(e, n) {
    ft.varargs = n;
    try {
      var i,
        r = ft.get(),
        o = ft.get(),
        a = ft.get(),
        u = ft.get(),
        l = ft.get(),
        c = ft.get();
      c <<= 12;
      var s = !1;
      if (-1 === l) {
        if (!(i = gb(Ee, o))) return -et.ENOMEM;
        bb(i, 0, o), (s = !0);
      } else {
        var f = st.getStream(l);
        if (!f) return -et.EBADF;
        var _ = st.mmap(f, ue, r, o, c, a, u);
        (i = _.ptr), (s = _.allocated);
      }
      return (
        (ft.mappings[i] = { malloc: i, len: o, allocated: s, fd: l, flags: u }),
        i
      );
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function jt(e, n) {
    ft.varargs = n;
    try {
      var i = ft.getStr(),
        r = (ft.getZero(), ft.get64());
      return st.truncate(i, r), 0;
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function Bt(e, n) {
    ft.varargs = n;
    try {
      var i = ft.getStr(),
        r = ft.get();
      return ft.doStat(st.stat, i, r);
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function Gt(e, n) {
    ft.varargs = n;
    try {
      var i = ft.getStr(),
        r = ft.get();
      return ft.doStat(st.lstat, i, r);
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function Rt(e, n) {
    ft.varargs = n;
    try {
      var i = ft.getStreamFromFD(),
        r = ft.get();
      return ft.doStat(st.stat, i.path, r);
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function xt(e, n) {
    ft.varargs = n;
    try {
      return 0;
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function Dt() {
    return xt.apply(null, arguments);
  }
  function Pt(e, n) {
    ft.varargs = n;
    try {
      var i = ft.getStreamFromFD(),
        r = ft.get(),
        o = ft.get();
      i.getdents || (i.getdents = st.readdir(i.path));
      for (var a = 0; i.getdents.length > 0 && a + 268 <= o; ) {
        var u,
          l,
          c = i.getdents.pop();
        if ("." === c[0]) (u = 1), (l = 4);
        else {
          var s = st.lookupNode(i.node, c);
          (u = s.id),
            (l = st.isChrdev(s.mode)
              ? 2
              : st.isDir(s.mode)
              ? 4
              : st.isLink(s.mode)
              ? 10
              : 8);
        }
        (se[(r + a) >> 2] = u),
          (se[(r + a + 4) >> 2] = i.position),
          (le[(r + a + 8) >> 1] = 268),
          (ae[(r + a + 10) >> 0] = l),
          Q(c, r + a + 11, 256),
          (a += 268);
      }
      return a;
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function Mt(e, n) {
    ft.varargs = n;
    try {
      var i = ft.getStreamFromFD();
      switch (ft.get()) {
        case 0:
          return (r = ft.get()) < 0
            ? -et.EINVAL
            : st.open(i.path, i.flags, 0, r).fd;
        case 1:
        case 2:
        case 13:
        case 14:
        case 13:
        case 14:
          return 0;
        case 3:
          return i.flags;
        case 4:
          var r = ft.get();
          return (i.flags |= r), 0;
        case 12:
        case 12:
          r = ft.get();
          return (le[(r + 0) >> 1] = 2), 0;
        case 16:
        case 8:
        default:
          return -et.EINVAL;
        case 9:
          return nt(et.EINVAL), -1;
      }
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function Ft(e, n) {
    ft.varargs = n;
    try {
      ft.getStr();
      var i = ft.get(),
        r = ft.get();
      return (
        R(64 === i),
        (se[(r + 4) >> 2] = 4096),
        (se[(r + 40) >> 2] = 4096),
        (se[(r + 8) >> 2] = 1e6),
        (se[(r + 12) >> 2] = 5e5),
        (se[(r + 16) >> 2] = 5e5),
        (se[(r + 20) >> 2] = st.nextInode),
        (se[(r + 24) >> 2] = 1e6),
        (se[(r + 28) >> 2] = 42),
        (se[(r + 44) >> 2] = 2),
        (se[(r + 36) >> 2] = 255),
        0
      );
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function Nt(e, n) {
    ft.varargs = n;
    try {
      var i = ft.getStreamFromFD(),
        r = ft.get(),
        o = ft.get();
      return st.read(i, ae, r, o);
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function Ut(e, n) {
    ft.varargs = n;
    try {
      var i = ft.getStr(),
        r = ft.get();
      return ft.doAccess(i, r);
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function Wt(e, n) {
    ft.varargs = n;
    try {
      var i = ft.getStr(),
        r = ft.getStr();
      return st.rename(i, r), 0;
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function zt(e, n) {
    ft.varargs = n;
    try {
      var i = ft.getStr(),
        r = ft.get();
      return ft.doMkdir(i, r);
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function Vt(e, n) {
    ft.varargs = n;
    try {
      var i = ft.getStreamFromFD(),
        r = ft.get(),
        o = ft.get();
      return st.write(i, ae, r, o);
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function qt(e, n) {
    ft.varargs = n;
    try {
      var i = ft.getStr();
      return st.rmdir(i), 0;
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  var Ht = {
    BUCKET_BUFFER_SIZE: 8192,
    mount: function (e) {
      return st.createNode(null, "/", 16895, 0);
    },
    createPipe: function () {
      var e = { buckets: [] };
      e.buckets.push({
        buffer: new Uint8Array(Ht.BUCKET_BUFFER_SIZE),
        offset: 0,
        roffset: 0,
      });
      var n = Ht.nextname(),
        i = Ht.nextname(),
        t = st.createNode(Ht.root, n, 4096, 0),
        r = st.createNode(Ht.root, i, 4096, 0);
      (t.pipe = e), (r.pipe = e);
      var o = st.createStream({
        path: n,
        node: t,
        flags: st.modeStringToFlags("r"),
        seekable: !1,
        stream_ops: Ht.stream_ops,
      });
      t.stream = o;
      var a = st.createStream({
        path: i,
        node: r,
        flags: st.modeStringToFlags("w"),
        seekable: !1,
        stream_ops: Ht.stream_ops,
      });
      return (r.stream = a), { readable_fd: o.fd, writable_fd: a.fd };
    },
    stream_ops: {
      poll: function (e) {
        var n = e.node.pipe;
        if (1 == (2097155 & e.flags)) return 260;
        if (n.buckets.length > 0)
          for (var i = 0; i < n.buckets.length; i++) {
            var t = n.buckets[i];
            if (t.offset - t.roffset > 0) return 65;
          }
        return 0;
      },
      ioctl: function (e, n, i) {
        return et.EINVAL;
      },
      read: function (e, n, i, t, r) {
        for (var o = e.node.pipe, a = 0, u = 0; u < o.buckets.length; u++) {
          var l = o.buckets[u];
          a += l.offset - l.roffset;
        }
        R(n instanceof ArrayBuffer || ArrayBuffer.isView(n));
        var c = n.subarray(i, i + t);
        if (t <= 0) return 0;
        if (0 == a) throw new st.ErrnoError(et.EAGAIN);
        var s = Math.min(a, t),
          f = s,
          _ = 0;
        for (u = 0; u < o.buckets.length; u++) {
          var p = o.buckets[u],
            d = p.offset - p.roffset;
          if (s <= d) {
            var m = p.buffer.subarray(p.roffset, p.offset);
            s < d ? ((m = m.subarray(0, s)), (p.roffset += s)) : _++, c.set(m);
            break;
          }
          m = p.buffer.subarray(p.roffset, p.offset);
          c.set(m), (c = c.subarray(m.byteLength)), (s -= m.byteLength), _++;
        }
        return (
          _ &&
            _ == o.buckets.length &&
            (_--, (o.buckets[_].offset = 0), (o.buckets[_].roffset = 0)),
          o.buckets.splice(0, _),
          f
        );
      },
      write: function (e, n, i, t, r) {
        var o = e.node.pipe;
        R(n instanceof ArrayBuffer || ArrayBuffer.isView(n));
        var a = n.subarray(i, i + t),
          u = a.byteLength;
        if (u <= 0) return 0;
        var l = null;
        0 == o.buckets.length
          ? ((l = {
              buffer: new Uint8Array(Ht.BUCKET_BUFFER_SIZE),
              offset: 0,
              roffset: 0,
            }),
            o.buckets.push(l))
          : (l = o.buckets[o.buckets.length - 1]),
          R(l.offset <= Ht.BUCKET_BUFFER_SIZE);
        var c = Ht.BUCKET_BUFFER_SIZE - l.offset;
        if (c >= u) return l.buffer.set(a, l.offset), (l.offset += u), u;
        c > 0 &&
          (l.buffer.set(a.subarray(0, c), l.offset),
          (l.offset += c),
          (a = a.subarray(c, a.byteLength)));
        for (
          var s = (a.byteLength / Ht.BUCKET_BUFFER_SIZE) | 0,
            f = a.byteLength % Ht.BUCKET_BUFFER_SIZE,
            _ = 0;
          _ < s;
          _++
        ) {
          var p = {
            buffer: new Uint8Array(Ht.BUCKET_BUFFER_SIZE),
            offset: Ht.BUCKET_BUFFER_SIZE,
            roffset: 0,
          };
          o.buckets.push(p),
            p.buffer.set(a.subarray(0, Ht.BUCKET_BUFFER_SIZE)),
            (a = a.subarray(Ht.BUCKET_BUFFER_SIZE, a.byteLength));
        }
        if (f > 0) {
          p = {
            buffer: new Uint8Array(Ht.BUCKET_BUFFER_SIZE),
            offset: a.byteLength,
            roffset: 0,
          };
          o.buckets.push(p), p.buffer.set(a);
        }
        return u;
      },
      close: function (e) {
        e.node.pipe.buckets = null;
      },
    },
    nextname: function () {
      return (
        Ht.nextname.current || (Ht.nextname.current = 0),
        "pipe[" + Ht.nextname.current++ + "]"
      );
    },
  };
  function Xt(e, n) {
    ft.varargs = n;
    try {
      var i = ft.get();
      if (0 == i) throw new st.ErrnoError(et.EFAULT);
      var r = Ht.createPipe();
      return (
        (se[i >> 2] = r.readable_fd), (se[(i + 4) >> 2] = r.writable_fd), 0
      );
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function Yt(e, n) {
    ft.varargs = n;
    try {
      var i = ft.getStr(),
        r = ft.get(),
        o = ft.get();
      return st.open(i, r, o).fd;
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function Jt(e, n) {
    ft.varargs = n;
    try {
      var i = ft.getStreamFromFD(),
        r = ft.get();
      switch (r) {
        case 21509:
        case 21505:
        case 21510:
        case 21511:
        case 21512:
        case 21506:
        case 21507:
        case 21508:
        case 21523:
        case 21524:
          return i.tty ? 0 : -et.ENOTTY;
        case 21519:
          if (!i.tty) return -et.ENOTTY;
          var o = ft.get();
          return (se[o >> 2] = 0), 0;
        case 21520:
          return i.tty ? -et.EINVAL : -et.ENOTTY;
        case 21531:
          o = ft.get();
          return st.ioctl(i, r, o);
        default:
          t("bad ioctl syscall " + r);
      }
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function Kt(e, n) {
    ft.varargs = n;
    try {
      var i = ft.getStreamFromFD();
      return st.close(i), 0;
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function Zt(e, n) {
    ft.varargs = n;
    try {
      var i = ft.getStreamFromFD(),
        r = ft.get();
      return i.fd === r ? r : ft.doDup(i.path, i.flags, r);
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function Qt(e, n) {
    ft.varargs = n;
    try {
      ft.get();
      var i = ft.get();
      return (
        bb(i, 0, 136),
        (se[i >> 2] = 1),
        (se[(i + 4) >> 2] = 2),
        (se[(i + 8) >> 2] = 3),
        (se[(i + 12) >> 2] = 4),
        0
      );
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function $t(e, n) {
    ft.varargs = n;
    try {
      var i = ft.getStr(),
        r = ft.get(),
        o = ft.get();
      return ft.doReadlink(i, r, o);
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function er(e, n) {
    ft.varargs = n;
    try {
      var i = ft.get(),
        r = ft.get(),
        o = ft.mappings[i];
      if (!o) return 0;
      if (r === o.len) {
        var a = st.getStream(o.fd);
        ft.doMsync(i, a, r, o.flags),
          st.munmap(a),
          (ft.mappings[i] = null),
          o.allocated && db(o.malloc);
      }
      return 0;
    } catch (e) {
      return (void 0 !== st && e instanceof st.ErrnoError) || t(e), -e.errno;
    }
  }
  function nr() {}
  function ir() {
    e.abort();
  }
  function tr(e, n) {
    Me.unshift({ func: e, arg: n });
  }
  function rr() {
    return (
      void 0 === rr.start && (rr.start = Date.now()),
      (1e3 * (Date.now() - rr.start)) | 0
    );
  }
  function or() {
    return s
      ? 1
      : "undefined" != typeof dateNow ||
        ((l || c) && self.performance && self.performance.now)
      ? 1e3
      : 1e6;
  }
  function ar() {
    t();
  }
  function ur() {
    return (
      s ||
      "undefined" != typeof dateNow ||
      ((l || c) && self.performance && self.performance.now)
    );
  }
  function lr(e, n) {
    var i;
    if (0 === e) i = 1e6;
    else {
      if (1 !== e || !ur()) return nt(et.EINVAL), -1;
      i = or();
    }
    return (se[n >> 2] = (i / 1e9) | 0), (se[(n + 4) >> 2] = i), 0;
  }
  function cr(e, n) {
    var i;
    if (0 === e) i = Date.now();
    else {
      if (1 !== e || !ur()) return nt(et.EINVAL), -1;
      i = ar();
    }
    return (
      (se[n >> 2] = (i / 1e3) | 0),
      (se[(n + 4) >> 2] = ((i % 1e3) * 1e3 * 1e3) | 0),
      0
    );
  }
  function sr(e) {
    var n = X(e);
    window.open(n);
  }
  function fr(e, n) {
    return e - n;
  }
  var _r = { error: null, errorMsg: null, loadedLibs: {}, loadedLibNames: {} };
  function pr(e) {
    if (_r.loadedLibs[e]) {
      var n = _r.loadedLibs[e];
      return (
        0 == --n.refcount &&
          (n.module.cleanups &&
            n.module.cleanups.forEach(function (e) {
              e();
            }),
          delete _r.loadedLibNames[n.name],
          delete _r.loadedLibs[e]),
        0
      );
    }
    return (_r.errorMsg = "Tried to dlclose() unopened handle: " + e), 1;
  }
  function dr(n, i) {
    t(
      "To use dlopen, you need to use Emscripten's linking support, see https://github.com/kripken/emscripten/wiki/Linking"
    );
    var r,
      o = [];
    if (0 === n) n = "__self__";
    else {
      var a = X(n),
        u = function (e) {
          var n = st.findObject(e);
          return n && !n.isFolder && !n.isDevice;
        };
      if (u(a)) n = a;
      else
        for (var l in (Di.LD_LIBRARY_PATH &&
          (o = Di.LD_LIBRARY_PATH.split(":")),
        o)) {
          var c = rt.join2(o[l], a);
          if (u(c)) {
            n = c;
            break;
          }
        }
    }
    if (_r.loadedLibNames[n]) {
      var s = _r.loadedLibNames[n];
      return _r.loadedLibs[s].refcount++, s;
    }
    if ("__self__" === n) {
      s = -1;
      r = e;
    } else {
      if (void 0 !== e.preloadedWasm && void 0 !== e.preloadedWasm[n])
        r = e.preloadedWasm[n];
      else {
        var f = st.findObject(n);
        if (!f || f.isFolder || f.isDevice)
          return (_r.errorMsg = "Could not find dynamic lib: " + n), 0;
        st.forceLoadFile(f);
        try {
          var _ = st.readFile(n, { encoding: "binary" });
          _ instanceof Uint8Array || (_ = new Uint8Array(_)),
            (r = loadWebAssemblyModule(_));
        } catch (e) {
          return (
            (_r.errorMsg = "Could not evaluate dynamic lib: " + n + "\n" + e), 0
          );
        }
      }
      s = 1;
      for (var p in _r.loadedLibs) _r.loadedLibs.hasOwnProperty(p) && s++;
      if (256 & i)
        for (var l in r) r.hasOwnProperty(l) && "_" == l[0] && (e[l] = r[l]);
    }
    return (
      (_r.loadedLibs[s] = { refcount: 1, name: n, module: r }),
      (_r.loadedLibNames[n] = s),
      s
    );
  }
  function mr(e, n) {
    if (((n = X(n)), _r.loadedLibs[e])) {
      var i = _r.loadedLibs[e];
      if (((n = "_" + n), i.module.hasOwnProperty(n))) {
        var t = i.module[n];
        return "function" == typeof t ? I(t) : t;
      }
      return (
        (_r.errorMsg =
          'Tried to lookup unknown symbol "' +
          n +
          '" in dynamic lib: ' +
          i.name),
        0
      );
    }
    return (_r.errorMsg = "Tried to dlsym() from an unopened handle: " + e), 0;
  }
  function yr(n, i) {
    if (
      ((hr.mainLoop.timingMode = n),
      (hr.mainLoop.timingValue = i),
      !hr.mainLoop.func)
    )
      return 1;
    if (0 == n)
      (hr.mainLoop.scheduler = function () {
        var e = 0 | Math.max(0, hr.mainLoop.tickStartTime + i - ar());
        setTimeout(hr.mainLoop.runner, e);
      }),
        (hr.mainLoop.method = "timeout");
    else if (1 == n)
      (hr.mainLoop.scheduler = function () {
        hr.requestAnimationFrame(hr.mainLoop.runner);
      }),
        (hr.mainLoop.method = "rAF");
    else if (2 == n) {
      if ("undefined" == typeof setImmediate) {
        var t = [],
          r = "setimmediate";
        addEventListener(
          "message",
          function (e) {
            (e.data !== r && e.data.target !== r) ||
              (e.stopPropagation(), t.shift()());
          },
          !0
        ),
          (setImmediate = function (n) {
            t.push(n),
              c
                ? (void 0 === e.setImmediates && (e.setImmediates = []),
                  e.setImmediates.push(n),
                  postMessage({ target: r }))
                : postMessage(r, "*");
          });
      }
      (hr.mainLoop.scheduler = function () {
        setImmediate(hr.mainLoop.runner);
      }),
        (hr.mainLoop.method = "immediate");
    }
    return 0;
  }
  function vr(n, i, t, r, o) {
    var a;
    (e.noExitRuntime = !0),
      R(
        !hr.mainLoop.func,
        "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters."
      ),
      (hr.mainLoop.func = n),
      (hr.mainLoop.arg = r),
      (a =
        void 0 !== r
          ? function () {
              e.dynCall_vi(n, r);
            }
          : function () {
              e.dynCall_v(n);
            });
    var u = hr.mainLoop.currentlyRunningMainloop;
    if (
      ((hr.mainLoop.runner = function () {
        if (!G)
          if (hr.mainLoop.queue.length > 0) {
            var n = Date.now(),
              i = hr.mainLoop.queue.shift();
            if ((i.func(i.arg), hr.mainLoop.remainingBlockers)) {
              var t = hr.mainLoop.remainingBlockers,
                r = t % 1 == 0 ? t - 1 : Math.floor(t);
              i.counted
                ? (hr.mainLoop.remainingBlockers = r)
                : ((r += 0.5),
                  (hr.mainLoop.remainingBlockers = (8 * t + r) / 9));
            }
            if (
              (console.log(
                'main loop blocker "' +
                  i.name +
                  '" took ' +
                  (Date.now() - n) +
                  " ms"
              ),
              hr.mainLoop.updateStatus(),
              u < hr.mainLoop.currentlyRunningMainloop)
            )
              return;
            setTimeout(hr.mainLoop.runner, 0);
          } else
            u < hr.mainLoop.currentlyRunningMainloop ||
              ((hr.mainLoop.currentFrameNumber =
                (hr.mainLoop.currentFrameNumber + 1) | 0),
              1 == hr.mainLoop.timingMode &&
              hr.mainLoop.timingValue > 1 &&
              hr.mainLoop.currentFrameNumber % hr.mainLoop.timingValue != 0
                ? hr.mainLoop.scheduler()
                : (0 == hr.mainLoop.timingMode &&
                    (hr.mainLoop.tickStartTime = ar()),
                  "timeout" === hr.mainLoop.method &&
                    e.ctx &&
                    (v(
                      "Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!"
                    ),
                    (hr.mainLoop.method = "")),
                  hr.mainLoop.runIter(a),
                  u < hr.mainLoop.currentlyRunningMainloop ||
                    ("object" == typeof SDL &&
                      SDL.audio &&
                      SDL.audio.queueNewAudioData &&
                      SDL.audio.queueNewAudioData(),
                    hr.mainLoop.scheduler())));
      }),
      o || (i && i > 0 ? yr(0, 1e3 / i) : yr(1, 1), hr.mainLoop.scheduler()),
      t)
    )
      throw "SimulateInfiniteLoop";
  }
  var hr = {
    mainLoop: {
      scheduler: null,
      method: "",
      currentlyRunningMainloop: 0,
      func: null,
      arg: 0,
      timingMode: 0,
      timingValue: 0,
      currentFrameNumber: 0,
      queue: [],
      pause: function () {
        (hr.mainLoop.scheduler = null), hr.mainLoop.currentlyRunningMainloop++;
      },
      resume: function () {
        hr.mainLoop.currentlyRunningMainloop++;
        var e = hr.mainLoop.timingMode,
          n = hr.mainLoop.timingValue,
          i = hr.mainLoop.func;
        (hr.mainLoop.func = null),
          vr(i, 0, !1, hr.mainLoop.arg, !0),
          yr(e, n),
          hr.mainLoop.scheduler();
      },
      updateStatus: function () {
        if (e.setStatus) {
          var n = e.statusMessage || "Please wait...",
            i = hr.mainLoop.remainingBlockers,
            t = hr.mainLoop.expectedBlockers;
          i
            ? i < t
              ? e.setStatus(n + " (" + (t - i) + "/" + t + ")")
              : e.setStatus(n)
            : e.setStatus("");
        }
      },
      runIter: function (n) {
        if (!G) {
          if (e.preMainLoop) if (!1 === e.preMainLoop()) return;
          try {
            n();
          } catch (e) {
            if (e instanceof Sb) return;
            throw (
              (e &&
                "object" == typeof e &&
                e.stack &&
                v("exception thrown: " + [e, e.stack]),
              e)
            );
          }
          e.postMainLoop && e.postMainLoop();
        }
      },
    },
    isFullscreen: !1,
    pointerLock: !1,
    moduleContextCreatedCallbacks: [],
    workers: [],
    init: function () {
      if ((e.preloadPlugins || (e.preloadPlugins = []), !hr.initted)) {
        hr.initted = !0;
        try {
          new Blob(), (hr.hasBlobConstructor = !0);
        } catch (e) {
          (hr.hasBlobConstructor = !1),
            console.log(
              "warning: no blob constructor, cannot create blobs with mimetypes"
            );
        }
        (hr.BlobBuilder =
          "undefined" != typeof MozBlobBuilder
            ? MozBlobBuilder
            : "undefined" != typeof WebKitBlobBuilder
            ? WebKitBlobBuilder
            : hr.hasBlobConstructor
            ? null
            : console.log("warning: no BlobBuilder")),
          (hr.URLObject =
            "undefined" != typeof window
              ? window.URL
                ? window.URL
                : window.webkitURL
              : void 0),
          e.noImageDecoding ||
            void 0 !== hr.URLObject ||
            (console.log(
              "warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available."
            ),
            (e.noImageDecoding = !0));
        var n = {
          canHandle: function (n) {
            return !e.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(n);
          },
          handle: function (n, i, t, r) {
            var o = null;
            if (hr.hasBlobConstructor)
              try {
                (o = new Blob([n], { type: hr.getMimetype(i) })).size !==
                  n.length &&
                  (o = new Blob([new Uint8Array(n).buffer], {
                    type: hr.getMimetype(i),
                  }));
              } catch (e) {
                C(
                  "Blob constructor present but fails: " +
                    e +
                    "; falling back to blob builder"
                );
              }
            if (!o) {
              var a = new hr.BlobBuilder();
              a.append(new Uint8Array(n).buffer), (o = a.getBlob());
            }
            var u = hr.URLObject.createObjectURL(o),
              l = new Image();
            (l.onload = function () {
              R(l.complete, "Image " + i + " could not be decoded");
              var r = document.createElement("canvas");
              (r.width = l.width),
                (r.height = l.height),
                r.getContext("2d").drawImage(l, 0, 0),
                (e.preloadedImages[i] = r),
                hr.URLObject.revokeObjectURL(u),
                t && t(n);
            }),
              (l.onerror = function (e) {
                console.log("Image " + u + " could not be decoded"), r && r();
              }),
              (l.src = u);
          },
        };
        e.preloadPlugins.push(n);
        var i = {
          canHandle: function (n) {
            return (
              !e.noAudioDecoding &&
              n.substr(-4) in { ".ogg": 1, ".wav": 1, ".mp3": 1 }
            );
          },
          handle: function (n, i, t, r) {
            var o = !1;
            function a(r) {
              o || ((o = !0), (e.preloadedAudios[i] = r), t && t(n));
            }
            function u() {
              o || ((o = !0), (e.preloadedAudios[i] = new Audio()), r && r());
            }
            if (!hr.hasBlobConstructor) return u();
            try {
              var l = new Blob([n], { type: hr.getMimetype(i) });
            } catch (e) {
              return u();
            }
            var c = hr.URLObject.createObjectURL(l),
              s = new Audio();
            s.addEventListener(
              "canplaythrough",
              function () {
                a(s);
              },
              !1
            ),
              (s.onerror = function (e) {
                o ||
                  (console.log(
                    "warning: browser could not fully decode audio " +
                      i +
                      ", trying slower base64 approach"
                  ),
                  (s.src =
                    "data:audio/x-" +
                    i.substr(-3) +
                    ";base64," +
                    (function (e) {
                      for (
                        var n =
                            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                          i = "",
                          t = 0,
                          r = 0,
                          o = 0;
                        o < e.length;
                        o++
                      )
                        for (t = (t << 8) | e[o], r += 8; r >= 6; ) {
                          var a = (t >> (r - 6)) & 63;
                          (r -= 6), (i += n[a]);
                        }
                      return (
                        2 == r
                          ? ((i += n[(3 & t) << 4]), (i += "=="))
                          : 4 == r && ((i += n[(15 & t) << 2]), (i += "=")),
                        i
                      );
                    })(n)),
                  a(s));
              }),
              (s.src = c),
              hr.safeSetTimeout(function () {
                a(s);
              }, 1e4);
          },
        };
        e.preloadPlugins.push(i);
        var t = e.canvas;
        t &&
          ((t.requestPointerLock =
            t.requestPointerLock ||
            t.mozRequestPointerLock ||
            t.webkitRequestPointerLock ||
            t.msRequestPointerLock ||
            function () {}),
          (t.exitPointerLock =
            document.exitPointerLock ||
            document.mozExitPointerLock ||
            document.webkitExitPointerLock ||
            document.msExitPointerLock ||
            function () {}),
          (t.exitPointerLock = t.exitPointerLock.bind(document)),
          document.addEventListener("pointerlockchange", r, !1),
          document.addEventListener("mozpointerlockchange", r, !1),
          document.addEventListener("webkitpointerlockchange", r, !1),
          document.addEventListener("mspointerlockchange", r, !1),
          e.elementPointerLock &&
            t.addEventListener(
              "click",
              function (n) {
                !hr.pointerLock &&
                  e.canvas.requestPointerLock &&
                  (e.canvas.requestPointerLock(), n.preventDefault());
              },
              !1
            ));
      }
      function r() {
        hr.pointerLock =
          document.pointerLockElement === e.canvas ||
          document.mozPointerLockElement === e.canvas ||
          document.webkitPointerLockElement === e.canvas ||
          document.msPointerLockElement === e.canvas;
      }
    },
    createContext: function (n, i, t, r) {
      if (i && e.ctx && n == e.canvas) return e.ctx;
      var o, a;
      if (i) {
        var u = { antialias: !1, alpha: !1 };
        if (r) for (var l in r) u[l] = r[l];
        (a = vo.createContext(n, u)) && (o = vo.getContext(a).GLctx);
      } else o = n.getContext("2d");
      return o
        ? (t &&
            (i ||
              R(
                void 0 === Jc,
                "cannot set in module if GLctx is used, but we are a non-GL context that would replace it"
              ),
            (e.ctx = o),
            i && vo.makeContextCurrent(a),
            (e.useWebGL = i),
            hr.moduleContextCreatedCallbacks.forEach(function (e) {
              e();
            }),
            hr.init()),
          o)
        : null;
    },
    destroyContext: function (e, n, i) {},
    fullscreenHandlersInstalled: !1,
    lockPointer: void 0,
    resizeCanvas: void 0,
    requestFullscreen: function (n, i, t) {
      (hr.lockPointer = n),
        (hr.resizeCanvas = i),
        (hr.vrDevice = t),
        void 0 === hr.lockPointer && (hr.lockPointer = !0),
        void 0 === hr.resizeCanvas && (hr.resizeCanvas = !1),
        void 0 === hr.vrDevice && (hr.vrDevice = null);
      var r = e.canvas;
      function o() {
        hr.isFullscreen = !1;
        var n = r.parentNode;
        (document.fullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement ||
          document.webkitFullscreenElement ||
          document.webkitCurrentFullScreenElement) === n
          ? ((r.exitFullscreen =
              document.exitFullscreen ||
              document.cancelFullScreen ||
              document.mozCancelFullScreen ||
              document.msExitFullscreen ||
              document.webkitCancelFullScreen ||
              function () {}),
            (r.exitFullscreen = r.exitFullscreen.bind(document)),
            hr.lockPointer && r.requestPointerLock(),
            (hr.isFullscreen = !0),
            hr.resizeCanvas
              ? hr.setFullscreenCanvasSize()
              : hr.updateCanvasDimensions(r))
          : (n.parentNode.insertBefore(r, n),
            n.parentNode.removeChild(n),
            hr.resizeCanvas
              ? hr.setWindowedCanvasSize()
              : hr.updateCanvasDimensions(r)),
          e.onFullScreen && e.onFullScreen(hr.isFullscreen),
          e.onFullscreen && e.onFullscreen(hr.isFullscreen);
      }
      hr.fullscreenHandlersInstalled ||
        ((hr.fullscreenHandlersInstalled = !0),
        document.addEventListener("fullscreenchange", o, !1),
        document.addEventListener("mozfullscreenchange", o, !1),
        document.addEventListener("webkitfullscreenchange", o, !1),
        document.addEventListener("MSFullscreenChange", o, !1));
      var a = document.createElement("div");
      r.parentNode.insertBefore(a, r),
        a.appendChild(r),
        (a.requestFullscreen =
          a.requestFullscreen ||
          a.mozRequestFullScreen ||
          a.msRequestFullscreen ||
          (a.webkitRequestFullscreen
            ? function () {
                a.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
              }
            : null) ||
          (a.webkitRequestFullScreen
            ? function () {
                a.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
              }
            : null)),
        t ? a.requestFullscreen({ vrDisplay: t }) : a.requestFullscreen();
    },
    requestFullScreen: function (e, n, i) {
      return (
        v(
          "Browser.requestFullScreen() is deprecated. Please call Browser.requestFullscreen instead."
        ),
        (hr.requestFullScreen = function (e, n, i) {
          return hr.requestFullscreen(e, n, i);
        }),
        hr.requestFullscreen(e, n, i)
      );
    },
    nextRAF: 0,
    fakeRequestAnimationFrame: function (e) {
      var n = Date.now();
      if (0 === hr.nextRAF) hr.nextRAF = n + 1e3 / 60;
      else for (; n + 2 >= hr.nextRAF; ) hr.nextRAF += 1e3 / 60;
      var i = Math.max(hr.nextRAF - n, 0);
      setTimeout(e, i);
    },
    requestAnimationFrame: function (e) {
      "undefined" == typeof window
        ? hr.fakeRequestAnimationFrame(e)
        : (window.requestAnimationFrame ||
            (window.requestAnimationFrame =
              window.requestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              window.msRequestAnimationFrame ||
              window.oRequestAnimationFrame ||
              hr.fakeRequestAnimationFrame),
          window.requestAnimationFrame(e));
    },
    safeCallback: function (e) {
      return function () {
        if (!G) return e.apply(null, arguments);
      };
    },
    allowAsyncCallbacks: !0,
    queuedAsyncCallbacks: [],
    pauseAsyncCallbacks: function () {
      hr.allowAsyncCallbacks = !1;
    },
    resumeAsyncCallbacks: function () {
      if (((hr.allowAsyncCallbacks = !0), hr.queuedAsyncCallbacks.length > 0)) {
        var e = hr.queuedAsyncCallbacks;
        (hr.queuedAsyncCallbacks = []),
          e.forEach(function (e) {
            e();
          });
      }
    },
    safeRequestAnimationFrame: function (e) {
      return hr.requestAnimationFrame(function () {
        G || (hr.allowAsyncCallbacks ? e() : hr.queuedAsyncCallbacks.push(e));
      });
    },
    safeSetTimeout: function (n, i) {
      return (
        (e.noExitRuntime = !0),
        setTimeout(function () {
          G || (hr.allowAsyncCallbacks ? n() : hr.queuedAsyncCallbacks.push(n));
        }, i)
      );
    },
    safeSetInterval: function (n, i) {
      return (
        (e.noExitRuntime = !0),
        setInterval(function () {
          G || (hr.allowAsyncCallbacks && n());
        }, i)
      );
    },
    getMimetype: function (e) {
      return {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        bmp: "image/bmp",
        ogg: "audio/ogg",
        wav: "audio/wav",
        mp3: "audio/mpeg",
      }[e.substr(e.lastIndexOf(".") + 1)];
    },
    getUserMedia: function (e) {
      window.getUserMedia ||
        (window.getUserMedia =
          navigator.getUserMedia || navigator.mozGetUserMedia),
        window.getUserMedia(e);
    },
    getMovementX: function (e) {
      return e.movementX || e.mozMovementX || e.webkitMovementX || 0;
    },
    getMovementY: function (e) {
      return e.movementY || e.mozMovementY || e.webkitMovementY || 0;
    },
    getMouseWheelDelta: function (e) {
      var n = 0;
      switch (e.type) {
        case "DOMMouseScroll":
          n = e.detail;
          break;
        case "mousewheel":
          n = e.wheelDelta;
          break;
        case "wheel":
          n = e.deltaY;
          break;
        default:
          throw "unrecognized mouse wheel event: " + e.type;
      }
      return n;
    },
    mouseX: 0,
    mouseY: 0,
    mouseMovementX: 0,
    mouseMovementY: 0,
    touches: {},
    lastTouches: {},
    calculateMouseEvent: function (n) {
      if (hr.pointerLock)
        "mousemove" != n.type && "mozMovementX" in n
          ? (hr.mouseMovementX = hr.mouseMovementY = 0)
          : ((hr.mouseMovementX = hr.getMovementX(n)),
            (hr.mouseMovementY = hr.getMovementY(n))),
          "undefined" != typeof SDL
            ? ((hr.mouseX = SDL.mouseX + hr.mouseMovementX),
              (hr.mouseY = SDL.mouseY + hr.mouseMovementY))
            : ((hr.mouseX += hr.mouseMovementX),
              (hr.mouseY += hr.mouseMovementY));
      else {
        var i = e.canvas.getBoundingClientRect(),
          t = e.canvas.width,
          r = e.canvas.height,
          o = void 0 !== window.scrollX ? window.scrollX : window.pageXOffset,
          a = void 0 !== window.scrollY ? window.scrollY : window.pageYOffset;
        if (
          "touchstart" === n.type ||
          "touchend" === n.type ||
          "touchmove" === n.type
        ) {
          var u = n.touch;
          if (void 0 === u) return;
          var l = u.pageX - (o + i.left),
            c = u.pageY - (a + i.top),
            s = { x: (l *= t / i.width), y: (c *= r / i.height) };
          if ("touchstart" === n.type)
            (hr.lastTouches[u.identifier] = s), (hr.touches[u.identifier] = s);
          else if ("touchend" === n.type || "touchmove" === n.type) {
            var f = hr.touches[u.identifier];
            f || (f = s),
              (hr.lastTouches[u.identifier] = f),
              (hr.touches[u.identifier] = s);
          }
          return;
        }
        var _ = n.pageX - (o + i.left),
          p = n.pageY - (a + i.top);
        (_ *= t / i.width),
          (p *= r / i.height),
          (hr.mouseMovementX = _ - hr.mouseX),
          (hr.mouseMovementY = p - hr.mouseY),
          (hr.mouseX = _),
          (hr.mouseY = p);
      }
    },
    asyncLoad: function (n, i, t, r) {
      var o = r ? "" : "al " + n;
      e.readAsync(
        n,
        function (e) {
          R(e, 'Loading data file "' + n + '" failed (no arrayBuffer).'),
            i(new Uint8Array(e)),
            o && sn();
        },
        function (e) {
          if (!t) throw 'Loading data file "' + n + '" failed.';
          t();
        }
      ),
        o && cn();
    },
    resizeListeners: [],
    updateResizeListeners: function () {
      var n = e.canvas;
      hr.resizeListeners.forEach(function (e) {
        e(n.width, n.height);
      });
    },
    setCanvasSize: function (n, i, t) {
      var r = e.canvas;
      hr.updateCanvasDimensions(r, n, i), t || hr.updateResizeListeners();
    },
    windowedWidth: 0,
    windowedHeight: 0,
    setFullscreenCanvasSize: function () {
      if ("undefined" != typeof SDL) {
        var n = fe[SDL.screen >> 2];
        (n |= 8388608), (se[SDL.screen >> 2] = n);
      }
      hr.updateCanvasDimensions(e.canvas), hr.updateResizeListeners();
    },
    setWindowedCanvasSize: function () {
      if ("undefined" != typeof SDL) {
        var n = fe[SDL.screen >> 2];
        (n &= -8388609), (se[SDL.screen >> 2] = n);
      }
      hr.updateCanvasDimensions(e.canvas), hr.updateResizeListeners();
    },
    updateCanvasDimensions: function (n, i, t) {
      i && t
        ? ((n.widthNative = i), (n.heightNative = t))
        : ((i = n.widthNative), (t = n.heightNative));
      var r = i,
        o = t;
      if (
        (e.forcedAspectRatio &&
          e.forcedAspectRatio > 0 &&
          (r / o < e.forcedAspectRatio
            ? (r = Math.round(o * e.forcedAspectRatio))
            : (o = Math.round(r / e.forcedAspectRatio))),
        (document.fullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement ||
          document.webkitFullscreenElement ||
          document.webkitCurrentFullScreenElement) === n.parentNode &&
          "undefined" != typeof screen)
      ) {
        var a = Math.min(screen.width / r, screen.height / o);
        (r = Math.round(r * a)), (o = Math.round(o * a));
      }
      hr.resizeCanvas
        ? (n.width != r && (n.width = r),
          n.height != o && (n.height = o),
          void 0 !== n.style &&
            (n.style.removeProperty("width"), n.style.removeProperty("height")))
        : (n.width != i && (n.width = i),
          n.height != t && (n.height = t),
          void 0 !== n.style &&
            (r != i || o != t
              ? (n.style.setProperty("width", r + "px", "important"),
                n.style.setProperty("height", o + "px", "important"))
              : (n.style.removeProperty("width"),
                n.style.removeProperty("height"))));
    },
    wgetRequests: {},
    nextWgetRequestHandle: 0,
    getNextWgetRequestHandle: function () {
      var e = hr.nextWgetRequestHandle;
      return hr.nextWgetRequestHandle++, e;
    },
  };
  function gr() {
    hr.mainLoop.pause(), (hr.mainLoop.func = null);
  }
  function br(e, n, i) {
    var t = Ar.findCanvasEventTarget(e);
    return t ? ((t.width = n), (t.height = i), 0) : -4;
  }
  function wr(e, n, i) {
    if ("string" == typeof e) {
      var t = Ib(),
        r = kb(e.length + 1);
      Q(e, r, e.length + 1);
      var o = br(r, n, i);
      return Ab(t), o;
    }
    return br(e, n, i);
  }
  function Er(e, n, i) {
    var t = Ar.findCanvasEventTarget(e);
    if (!t) return -4;
    if (t.canvasSharedPtr) {
      var r = se[t.canvasSharedPtr >> 2],
        o = se[(t.canvasSharedPtr + 4) >> 2];
      (se[n >> 2] = r), (se[i >> 2] = o);
    } else if (t.offscreenCanvas)
      (se[n >> 2] = t.offscreenCanvas.width),
        (se[i >> 2] = t.offscreenCanvas.height);
    else {
      if (t.controlTransferredOffscreen) return -4;
      (se[n >> 2] = t.width), (se[i >> 2] = t.height);
    }
    return 0;
  }
  function Cr(e, n, i) {
    return Er(e, n, i);
  }
  function Lr(e, n, i) {
    return Ar.findCanvasEventTarget(e) ? Er(e, n, i) : Cr(e, n, i);
  }
  function kr(e) {
    var n = Ib(),
      i = kb(8),
      t = i + 4;
    if ("string" == typeof e) {
      var r = kb(e.length + 1);
      Q(e, r, e.length + 1), (e = r);
    }
    Lr(e, i, t);
    var o = [se[i >> 2], se[t >> 2]];
    return Ab(n), o;
  }
  var Ar = {
      keyEvent: 0,
      mouseEvent: 0,
      wheelEvent: 0,
      uiEvent: 0,
      focusEvent: 0,
      deviceOrientationEvent: 0,
      deviceMotionEvent: 0,
      fullscreenChangeEvent: 0,
      pointerlockChangeEvent: 0,
      visibilityChangeEvent: 0,
      touchEvent: 0,
      lastGamepadState: null,
      lastGamepadStateFrame: null,
      numGamepadsConnected: 0,
      previousFullscreenElement: null,
      previousScreenX: null,
      previousScreenY: null,
      removeEventListenersRegistered: !1,
      _onGamepadConnected: function () {
        ++Ar.numGamepadsConnected;
      },
      _onGamepadDisconnected: function () {
        --Ar.numGamepadsConnected;
      },
      staticInit: function () {
        if ("undefined" != typeof window) {
          window.addEventListener("gamepadconnected", Ar._onGamepadConnected),
            window.addEventListener(
              "gamepaddisconnected",
              Ar._onGamepadDisconnected
            );
          var e = navigator.getGamepads
            ? navigator.getGamepads()
            : navigator.webkitGetGamepads
            ? navigator.webkitGetGamepads()
            : null;
          e && (Ar.numGamepadsConnected = e.length);
        }
      },
      removeAllEventListeners: function () {
        for (var e = Ar.eventHandlers.length - 1; e >= 0; --e)
          Ar._removeHandler(e);
        (Ar.eventHandlers = []),
          (Ar.deferredCalls = []),
          window.removeEventListener(
            "gamepadconnected",
            Ar._onGamepadConnected
          ),
          window.removeEventListener(
            "gamepaddisconnected",
            Ar._onGamepadDisconnected
          );
      },
      registerRemoveEventListeners: function () {
        Ar.removeEventListenersRegistered ||
          (Me.push(Ar.removeAllEventListeners),
          (Ar.removeEventListenersRegistered = !0));
      },
      findEventTarget: function (n) {
        try {
          return n
            ? ("number" == typeof n && (n = X(n)),
              "#window" === n
                ? window
                : "#document" === n
                ? document
                : "#screen" === n
                ? window.screen
                : "#canvas" === n
                ? e.canvas
                : "string" == typeof n
                ? document.getElementById(n)
                : n)
            : window;
        } catch (e) {
          return null;
        }
      },
      findCanvasEventTarget: function (n) {
        return (
          "number" == typeof n && (n = X(n)),
          n && "#canvas" !== n
            ? void 0 !== vo && vo.offscreenCanvases[n]
              ? vo.offscreenCanvases[n]
              : Ar.findEventTarget(n)
            : void 0 !== vo && vo.offscreenCanvases.canvas
            ? vo.offscreenCanvases.canvas
            : e.canvas
        );
      },
      deferredCalls: [],
      deferCall: function (e, n, i) {
        function t(e, n) {
          if (e.length != n.length) return !1;
          for (var i in e) if (e[i] != n[i]) return !1;
          return !0;
        }
        for (var r in Ar.deferredCalls) {
          var o = Ar.deferredCalls[r];
          if (o.targetFunction == e && t(o.argsList, i)) return;
        }
        Ar.deferredCalls.push({
          targetFunction: e,
          precedence: n,
          argsList: i,
        }),
          Ar.deferredCalls.sort(function (e, n) {
            return e.precedence < n.precedence;
          });
      },
      removeDeferredCalls: function (e) {
        for (var n = 0; n < Ar.deferredCalls.length; ++n)
          Ar.deferredCalls[n].targetFunction == e &&
            (Ar.deferredCalls.splice(n, 1), --n);
      },
      canPerformEventHandlerRequests: function () {
        return Ar.inEventHandler && Ar.currentEventHandler.allowsDeferredCalls;
      },
      runDeferredCalls: function () {
        if (Ar.canPerformEventHandlerRequests())
          for (var e = 0; e < Ar.deferredCalls.length; ++e) {
            var n = Ar.deferredCalls[e];
            Ar.deferredCalls.splice(e, 1),
              --e,
              n.targetFunction.apply(this, n.argsList);
          }
      },
      inEventHandler: 0,
      currentEventHandler: null,
      eventHandlers: [],
      isInternetExplorer: function () {
        return (
          -1 !== navigator.userAgent.indexOf("MSIE") ||
          navigator.appVersion.indexOf("Trident/") > 0
        );
      },
      removeAllHandlersOnTarget: function (e, n) {
        for (var i = 0; i < Ar.eventHandlers.length; ++i)
          Ar.eventHandlers[i].target != e ||
            (n && n != Ar.eventHandlers[i].eventTypeString) ||
            Ar._removeHandler(i--);
      },
      _removeHandler: function (e) {
        var n = Ar.eventHandlers[e];
        n.target.removeEventListener(
          n.eventTypeString,
          n.eventListenerFunc,
          n.useCapture
        ),
          Ar.eventHandlers.splice(e, 1);
      },
      registerOrRemoveHandler: function (e) {
        var n = function (n) {
          ++Ar.inEventHandler,
            (Ar.currentEventHandler = e),
            Ar.runDeferredCalls(),
            e.handlerFunc(n),
            Ar.runDeferredCalls(),
            --Ar.inEventHandler;
        };
        if (e.callbackfunc)
          (e.eventListenerFunc = n),
            e.target.addEventListener(e.eventTypeString, n, e.useCapture),
            Ar.eventHandlers.push(e),
            Ar.registerRemoveEventListeners();
        else
          for (var i = 0; i < Ar.eventHandlers.length; ++i)
            Ar.eventHandlers[i].target == e.target &&
              Ar.eventHandlers[i].eventTypeString == e.eventTypeString &&
              Ar._removeHandler(i--);
      },
      registerKeyEventCallback: function (n, i, t, r, o, a, u) {
        Ar.keyEvent || (Ar.keyEvent = hb(164));
        var l = {
          target: Ar.findEventTarget(n),
          allowsDeferredCalls: !Ar.isInternetExplorer(),
          eventTypeString: a,
          callbackfunc: r,
          handlerFunc: function (n) {
            var t = n || window.event,
              a = Ar.keyEvent;
            Q(t.key ? t.key : "", a + 0, 32),
              Q(t.code ? t.code : "", a + 32, 32),
              (se[(a + 64) >> 2] = t.location),
              (se[(a + 68) >> 2] = t.ctrlKey),
              (se[(a + 72) >> 2] = t.shiftKey),
              (se[(a + 76) >> 2] = t.altKey),
              (se[(a + 80) >> 2] = t.metaKey),
              (se[(a + 84) >> 2] = t.repeat),
              Q(t.locale ? t.locale : "", a + 88, 32),
              Q(t.char ? t.char : "", a + 120, 32),
              (se[(a + 152) >> 2] = t.charCode),
              (se[(a + 156) >> 2] = t.keyCode),
              (se[(a + 160) >> 2] = t.which),
              e.dynCall_iiii(r, o, a, i) && t.preventDefault();
          },
          useCapture: t,
        };
        Ar.registerOrRemoveHandler(l);
      },
      getBoundingClientRectOrZeros: function (e) {
        return e.getBoundingClientRect
          ? e.getBoundingClientRect()
          : { left: 0, top: 0 };
      },
      fillMouseEventData: function (n, i, t) {
        if (
          ((pe[n >> 3] = Ar.tick()),
          (se[(n + 8) >> 2] = i.screenX),
          (se[(n + 12) >> 2] = i.screenY),
          (se[(n + 16) >> 2] = i.clientX),
          (se[(n + 20) >> 2] = i.clientY),
          (se[(n + 24) >> 2] = i.ctrlKey),
          (se[(n + 28) >> 2] = i.shiftKey),
          (se[(n + 32) >> 2] = i.altKey),
          (se[(n + 36) >> 2] = i.metaKey),
          (le[(n + 40) >> 1] = i.button),
          (le[(n + 42) >> 1] = i.buttons),
          (se[(n + 44) >> 2] = i.movementX),
          (se[(n + 48) >> 2] = i.movementY),
          e.canvas)
        ) {
          var r = e.canvas.getBoundingClientRect();
          (se[(n + 60) >> 2] = i.clientX - r.left),
            (se[(n + 64) >> 2] = i.clientY - r.top);
        } else (se[(n + 60) >> 2] = 0), (se[(n + 64) >> 2] = 0);
        if (t) {
          r = Ar.getBoundingClientRectOrZeros(t);
          (se[(n + 52) >> 2] = i.clientX - r.left),
            (se[(n + 56) >> 2] = i.clientY - r.top);
        } else (se[(n + 52) >> 2] = 0), (se[(n + 56) >> 2] = 0);
        "wheel" !== i.type &&
          "mousewheel" !== i.type &&
          ((Ar.previousScreenX = i.screenX), (Ar.previousScreenY = i.screenY));
      },
      registerMouseEventCallback: function (n, i, t, r, o, a, u) {
        Ar.mouseEvent || (Ar.mouseEvent = hb(72));
        var l = {
          target: (n = Ar.findEventTarget(n)),
          allowsDeferredCalls:
            "mousemove" != a && "mouseenter" != a && "mouseleave" != a,
          eventTypeString: a,
          callbackfunc: r,
          handlerFunc: function (t) {
            var a = t || window.event;
            Ar.fillMouseEventData(Ar.mouseEvent, a, n),
              e.dynCall_iiii(r, o, Ar.mouseEvent, i) && a.preventDefault();
          },
          useCapture: t,
        };
        Ar.isInternetExplorer() &&
          "mousedown" == a &&
          (l.allowsDeferredCalls = !1),
          Ar.registerOrRemoveHandler(l);
      },
      registerWheelEventCallback: function (n, i, t, r, o, a, u) {
        Ar.wheelEvent || (Ar.wheelEvent = hb(104));
        var l = {
          target: (n = Ar.findEventTarget(n)),
          allowsDeferredCalls: !0,
          eventTypeString: a,
          callbackfunc: r,
          handlerFunc:
            "wheel" == a
              ? function (t) {
                  var a = t || window.event,
                    u = Ar.wheelEvent;
                  Ar.fillMouseEventData(u, a, n),
                    (pe[(u + 72) >> 3] = a.deltaX),
                    (pe[(u + 80) >> 3] = a.deltaY),
                    (pe[(u + 88) >> 3] = a.deltaZ),
                    (se[(u + 96) >> 2] = a.deltaMode),
                    e.dynCall_iiii(r, o, u, i) && a.preventDefault();
                }
              : function (t) {
                  var a = t || window.event;
                  Ar.fillMouseEventData(Ar.wheelEvent, a, n),
                    (pe[(Ar.wheelEvent + 72) >> 3] = a.wheelDeltaX || 0),
                    (pe[(Ar.wheelEvent + 80) >> 3] = -(a.wheelDeltaY
                      ? a.wheelDeltaY
                      : a.wheelDelta)),
                    (pe[(Ar.wheelEvent + 88) >> 3] = 0),
                    (se[(Ar.wheelEvent + 96) >> 2] = 0),
                    e.dynCall_iiii(r, o, Ar.wheelEvent, i) &&
                      a.preventDefault();
                },
          useCapture: t,
        };
        Ar.registerOrRemoveHandler(l);
      },
      pageScrollPos: function () {
        return window.pageXOffset > 0 || window.pageYOffset > 0
          ? [window.pageXOffset, window.pageYOffset]
          : void 0 !== document.documentElement.scrollLeft ||
            void 0 !== document.documentElement.scrollTop
          ? [
              document.documentElement.scrollLeft,
              document.documentElement.scrollTop,
            ]
          : [0 | document.body.scrollLeft, 0 | document.body.scrollTop];
      },
      registerUiEventCallback: function (n, i, t, r, o, a, u) {
        Ar.uiEvent || (Ar.uiEvent = hb(36));
        var l = {
          target: (n = "scroll" != a || n ? Ar.findEventTarget(n) : document),
          allowsDeferredCalls: !1,
          eventTypeString: a,
          callbackfunc: r,
          handlerFunc: function (t) {
            var a = t || window.event;
            if (a.target == n) {
              var u = Ar.pageScrollPos(),
                l = Ar.uiEvent;
              (se[l >> 2] = a.detail),
                (se[(l + 4) >> 2] = document.body.clientWidth),
                (se[(l + 8) >> 2] = document.body.clientHeight),
                (se[(l + 12) >> 2] = window.innerWidth),
                (se[(l + 16) >> 2] = window.innerHeight),
                (se[(l + 20) >> 2] = window.outerWidth),
                (se[(l + 24) >> 2] = window.outerHeight),
                (se[(l + 28) >> 2] = u[0]),
                (se[(l + 32) >> 2] = u[1]),
                e.dynCall_iiii(r, o, l, i) && a.preventDefault();
            }
          },
          useCapture: t,
        };
        Ar.registerOrRemoveHandler(l);
      },
      getNodeNameForTarget: function (e) {
        return e
          ? e == window
            ? "#window"
            : e == window.screen
            ? "#screen"
            : e && e.nodeName
            ? e.nodeName
            : ""
          : "";
      },
      registerFocusEventCallback: function (n, i, t, r, o, a, u) {
        Ar.focusEvent || (Ar.focusEvent = hb(256));
        var l = {
          target: Ar.findEventTarget(n),
          allowsDeferredCalls: !1,
          eventTypeString: a,
          callbackfunc: r,
          handlerFunc: function (n) {
            var t = n || window.event,
              a = Ar.getNodeNameForTarget(t.target),
              u = t.target.id ? t.target.id : "",
              l = Ar.focusEvent;
            Q(a, l + 0, 128),
              Q(u, l + 128, 128),
              e.dynCall_iiii(r, o, l, i) && t.preventDefault();
          },
          useCapture: t,
        };
        Ar.registerOrRemoveHandler(l);
      },
      tick: function () {
        return window.performance && window.performance.now
          ? window.performance.now()
          : Date.now();
      },
      fillDeviceOrientationEventData: function (e, n, i) {
        (pe[e >> 3] = Ar.tick()),
          (pe[(e + 8) >> 3] = n.alpha),
          (pe[(e + 16) >> 3] = n.beta),
          (pe[(e + 24) >> 3] = n.gamma),
          (se[(e + 32) >> 2] = n.absolute);
      },
      registerDeviceOrientationEventCallback: function (n, i, t, r, o, a, u) {
        Ar.deviceOrientationEvent || (Ar.deviceOrientationEvent = hb(40));
        var l = {
          target: Ar.findEventTarget(n),
          allowsDeferredCalls: !1,
          eventTypeString: a,
          callbackfunc: r,
          handlerFunc: function (t) {
            var a = t || window.event;
            Ar.fillDeviceOrientationEventData(Ar.deviceOrientationEvent, a, n),
              e.dynCall_iiii(r, o, Ar.deviceOrientationEvent, i) &&
                a.preventDefault();
          },
          useCapture: t,
        };
        Ar.registerOrRemoveHandler(l);
      },
      fillDeviceMotionEventData: function (e, n, i) {
        (pe[e >> 3] = Ar.tick()),
          (pe[(e + 8) >> 3] = n.acceleration.x),
          (pe[(e + 16) >> 3] = n.acceleration.y),
          (pe[(e + 24) >> 3] = n.acceleration.z),
          (pe[(e + 32) >> 3] = n.accelerationIncludingGravity.x),
          (pe[(e + 40) >> 3] = n.accelerationIncludingGravity.y),
          (pe[(e + 48) >> 3] = n.accelerationIncludingGravity.z),
          (pe[(e + 56) >> 3] = n.rotationRate.alpha),
          (pe[(e + 64) >> 3] = n.rotationRate.beta),
          (pe[(e + 72) >> 3] = n.rotationRate.gamma);
      },
      registerDeviceMotionEventCallback: function (n, i, t, r, o, a, u) {
        Ar.deviceMotionEvent || (Ar.deviceMotionEvent = hb(80));
        var l = {
          target: Ar.findEventTarget(n),
          allowsDeferredCalls: !1,
          eventTypeString: a,
          callbackfunc: r,
          handlerFunc: function (t) {
            var a = t || window.event;
            Ar.fillDeviceMotionEventData(Ar.deviceMotionEvent, a, n),
              e.dynCall_iiii(r, o, Ar.deviceMotionEvent, i) &&
                a.preventDefault();
          },
          useCapture: t,
        };
        Ar.registerOrRemoveHandler(l);
      },
      screenOrientation: function () {
        if (window.screen)
          return (
            window.screen.orientation ||
            window.screen.mozOrientation ||
            window.screen.webkitOrientation ||
            window.screen.msOrientation
          );
      },
      fillOrientationChangeEventData: function (e, n) {
        var i = Ar.screenOrientation(),
          t = [
            "portrait-primary",
            "portrait-secondary",
            "landscape-primary",
            "landscape-secondary",
          ].indexOf(i);
        -1 == t &&
          (t = ["portrait", "portrait", "landscape", "landscape"].indexOf(i)),
          (se[e >> 2] = 1 << t),
          (se[(e + 4) >> 2] = window.orientation);
      },
      registerOrientationChangeEventCallback: function (n, i, t, r, o, a, u) {
        Ar.orientationChangeEvent || (Ar.orientationChangeEvent = hb(8)),
          (n = n ? Ar.findEventTarget(n) : window.screen);
        "orientationchange" == a &&
          void 0 !== window.screen.mozOrientation &&
          (a = "mozorientationchange");
        var l = {
          target: n,
          allowsDeferredCalls: !1,
          eventTypeString: a,
          callbackfunc: r,
          handlerFunc: function (n) {
            var t = n || window.event,
              a = Ar.orientationChangeEvent;
            Ar.fillOrientationChangeEventData(a, t),
              e.dynCall_iiii(r, o, a, i) && t.preventDefault();
          },
          useCapture: t,
        };
        Ar.registerOrRemoveHandler(l);
      },
      fullscreenEnabled: function () {
        return (
          document.fullscreenEnabled ||
          document.mozFullScreenEnabled ||
          document.webkitFullscreenEnabled ||
          document.msFullscreenEnabled
        );
      },
      fillFullscreenChangeEventData: function (e, n) {
        var i =
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement,
          t = !!i;
        (se[e >> 2] = t), (se[(e + 4) >> 2] = Ar.fullscreenEnabled());
        var r = t ? i : Ar.previousFullscreenElement,
          o = Ar.getNodeNameForTarget(r),
          a = r && r.id ? r.id : "";
        Q(o, e + 8, 128),
          Q(a, e + 136, 128),
          (se[(e + 264) >> 2] = r ? r.clientWidth : 0),
          (se[(e + 268) >> 2] = r ? r.clientHeight : 0),
          (se[(e + 272) >> 2] = screen.width),
          (se[(e + 276) >> 2] = screen.height),
          t && (Ar.previousFullscreenElement = i);
      },
      registerFullscreenChangeEventCallback: function (n, i, t, r, o, a, u) {
        Ar.fullscreenChangeEvent || (Ar.fullscreenChangeEvent = hb(280));
        var l = {
          target: (n = n ? Ar.findEventTarget(n) : document),
          allowsDeferredCalls: !1,
          eventTypeString: a,
          callbackfunc: r,
          handlerFunc: function (n) {
            var t = n || window.event,
              a = Ar.fullscreenChangeEvent;
            Ar.fillFullscreenChangeEventData(a, t),
              e.dynCall_iiii(r, o, a, i) && t.preventDefault();
          },
          useCapture: t,
        };
        Ar.registerOrRemoveHandler(l);
      },
      resizeCanvasForFullscreen: function (e, n) {
        var i = __registerRestoreOldStyle(e),
          t = n.softFullscreen ? window.innerWidth : screen.width,
          r = n.softFullscreen ? window.innerHeight : screen.height,
          o = e.getBoundingClientRect(),
          a = o.right - o.left,
          u = o.bottom - o.top,
          l = kr(e.id),
          c = l[0],
          s = l[1];
        if (3 == n.scaleMode) Xr(e, (r - u) / 2, (t - a) / 2), (t = a), (r = u);
        else if (2 == n.scaleMode)
          if (t * s < c * r) {
            var f = (s * t) / c;
            Xr(e, (r - f) / 2, 0), (r = f);
          } else {
            var _ = (c * r) / s;
            Xr(e, 0, (t - _) / 2), (t = _);
          }
        e.style.backgroundColor || (e.style.backgroundColor = "black"),
          document.body.style.backgroundColor ||
            (document.body.style.backgroundColor = "black"),
          (e.style.width = t + "px"),
          (e.style.height = r + "px"),
          1 == n.filteringMode &&
            ((e.style.imageRendering = "optimizeSpeed"),
            (e.style.imageRendering = "-moz-crisp-edges"),
            (e.style.imageRendering = "-o-crisp-edges"),
            (e.style.imageRendering = "-webkit-optimize-contrast"),
            (e.style.imageRendering = "optimize-contrast"),
            (e.style.imageRendering = "crisp-edges"),
            (e.style.imageRendering = "pixelated"));
        var p = 2 == n.canvasResolutionScaleMode ? window.devicePixelRatio : 1;
        if (0 != n.canvasResolutionScaleMode) {
          var d = (t * p) | 0,
            m = (r * p) | 0;
          e.controlTransferredOffscreen
            ? wr(e.id, d, m)
            : ((e.width = d), (e.height = m)),
            e.GLctxObject && e.GLctxObject.GLctx.viewport(0, 0, d, m);
        }
        return i;
      },
      requestFullscreen: function (n, i) {
        if (
          ((0 == i.scaleMode && 0 == i.canvasResolutionScaleMode) ||
            Ar.resizeCanvasForFullscreen(n, i),
          n.requestFullscreen)
        )
          n.requestFullscreen();
        else if (n.msRequestFullscreen) n.msRequestFullscreen();
        else if (n.mozRequestFullScreen) n.mozRequestFullScreen();
        else if (n.mozRequestFullscreen) n.mozRequestFullscreen();
        else {
          if (!n.webkitRequestFullscreen)
            return void 0 === Ar.fullscreenEnabled() ? -1 : -3;
          n.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        return (
          i.canvasResizedCallback &&
            e.dynCall_iiii(
              i.canvasResizedCallback,
              37,
              0,
              i.canvasResizedCallbackUserData
            ),
          0
        );
      },
      fillPointerlockChangeEventData: function (e, n) {
        var i =
            document.pointerLockElement ||
            document.mozPointerLockElement ||
            document.webkitPointerLockElement ||
            document.msPointerLockElement,
          t = !!i;
        se[e >> 2] = t;
        var r = Ar.getNodeNameForTarget(i),
          o = i && i.id ? i.id : "";
        Q(r, e + 4, 128), Q(o, e + 132, 128);
      },
      registerPointerlockChangeEventCallback: function (n, i, t, r, o, a, u) {
        Ar.pointerlockChangeEvent || (Ar.pointerlockChangeEvent = hb(260));
        var l = {
          target: (n = n ? Ar.findEventTarget(n) : document),
          allowsDeferredCalls: !1,
          eventTypeString: a,
          callbackfunc: r,
          handlerFunc: function (n) {
            var t = n || window.event,
              a = Ar.pointerlockChangeEvent;
            Ar.fillPointerlockChangeEventData(a, t),
              e.dynCall_iiii(r, o, a, i) && t.preventDefault();
          },
          useCapture: t,
        };
        Ar.registerOrRemoveHandler(l);
      },
      registerPointerlockErrorEventCallback: function (n, i, t, r, o, a) {
        var u = {
          target: (n = n ? Ar.findEventTarget(n) : document),
          allowsDeferredCalls: !1,
          eventTypeString: a,
          callbackfunc: r,
          handlerFunc: function (n) {
            var t = n || window.event;
            e.dynCall_iiii(r, o, 0, i) && t.preventDefault();
          },
          useCapture: t,
        };
        Ar.registerOrRemoveHandler(u);
      },
      requestPointerLock: function (e) {
        if (e.requestPointerLock) e.requestPointerLock();
        else if (e.mozRequestPointerLock) e.mozRequestPointerLock();
        else if (e.webkitRequestPointerLock) e.webkitRequestPointerLock();
        else {
          if (!e.msRequestPointerLock)
            return document.body.requestPointerLock ||
              document.body.mozRequestPointerLock ||
              document.body.webkitRequestPointerLock ||
              document.body.msRequestPointerLock
              ? -3
              : -1;
          e.msRequestPointerLock();
        }
        return 0;
      },
      fillVisibilityChangeEventData: function (e, n) {
        var i = ["hidden", "visible", "prerender", "unloaded"].indexOf(
          document.visibilityState
        );
        (se[e >> 2] = document.hidden), (se[(e + 4) >> 2] = i);
      },
      registerVisibilityChangeEventCallback: function (n, i, t, r, o, a, u) {
        Ar.visibilityChangeEvent || (Ar.visibilityChangeEvent = hb(8));
        var l = {
          target: (n = n ? Ar.findEventTarget(n) : document),
          allowsDeferredCalls: !1,
          eventTypeString: a,
          callbackfunc: r,
          handlerFunc: function (n) {
            var t = n || window.event,
              a = Ar.visibilityChangeEvent;
            Ar.fillVisibilityChangeEventData(a, t),
              e.dynCall_iiii(r, o, a, i) && t.preventDefault();
          },
          useCapture: t,
        };
        Ar.registerOrRemoveHandler(l);
      },
      registerTouchEventCallback: function (n, i, t, r, o, a, u) {
        Ar.touchEvent || (Ar.touchEvent = hb(1684));
        var l = {
          target: (n = Ar.findEventTarget(n)),
          allowsDeferredCalls: "touchstart" == a || "touchend" == a,
          eventTypeString: a,
          callbackfunc: r,
          handlerFunc: function (t) {
            for (
              var a = t || window.event, u = {}, l = 0;
              l < a.touches.length;
              ++l
            ) {
              u[(c = a.touches[l]).identifier] = c;
            }
            for (l = 0; l < a.changedTouches.length; ++l) {
              (u[(c = a.changedTouches[l]).identifier] = c), (c.changed = !0);
            }
            for (l = 0; l < a.targetTouches.length; ++l) {
              var c;
              u[(c = a.targetTouches[l]).identifier].onTarget = !0;
            }
            var s = Ar.touchEvent,
              f = s;
            (se[(f + 4) >> 2] = a.ctrlKey),
              (se[(f + 8) >> 2] = a.shiftKey),
              (se[(f + 12) >> 2] = a.altKey),
              (se[(f + 16) >> 2] = a.metaKey),
              (f += 20);
            var _ = e.canvas ? e.canvas.getBoundingClientRect() : void 0,
              p = Ar.getBoundingClientRectOrZeros(n),
              d = 0;
            for (var l in u) {
              var m = u[l];
              if (
                ((se[f >> 2] = m.identifier),
                (se[(f + 4) >> 2] = m.screenX),
                (se[(f + 8) >> 2] = m.screenY),
                (se[(f + 12) >> 2] = m.clientX),
                (se[(f + 16) >> 2] = m.clientY),
                (se[(f + 20) >> 2] = m.pageX),
                (se[(f + 24) >> 2] = m.pageY),
                (se[(f + 28) >> 2] = m.changed),
                (se[(f + 32) >> 2] = m.onTarget),
                _
                  ? ((se[(f + 44) >> 2] = m.clientX - _.left),
                    (se[(f + 48) >> 2] = m.clientY - _.top))
                  : ((se[(f + 44) >> 2] = 0), (se[(f + 48) >> 2] = 0)),
                (se[(f + 36) >> 2] = m.clientX - p.left),
                (se[(f + 40) >> 2] = m.clientY - p.top),
                (f += 52),
                ++d >= 32)
              )
                break;
            }
            (se[s >> 2] = d), e.dynCall_iiii(r, o, s, i) && a.preventDefault();
          },
          useCapture: t,
        };
        Ar.registerOrRemoveHandler(l);
      },
      fillGamepadEventData: function (e, n) {
        pe[e >> 3] = n.timestamp;
        for (var i = 0; i < n.axes.length; ++i)
          pe[(e + 8 * i + 16) >> 3] = n.axes[i];
        for (i = 0; i < n.buttons.length; ++i)
          "object" == typeof n.buttons[i]
            ? (pe[(e + 8 * i + 528) >> 3] = n.buttons[i].value)
            : (pe[(e + 8 * i + 528) >> 3] = n.buttons[i]);
        for (i = 0; i < n.buttons.length; ++i)
          "object" == typeof n.buttons[i]
            ? (se[(e + 4 * i + 1040) >> 2] = n.buttons[i].pressed)
            : (se[(e + 4 * i + 1040) >> 2] = 1 == n.buttons[i]);
        (se[(e + 1296) >> 2] = n.connected),
          (se[(e + 1300) >> 2] = n.index),
          (se[(e + 8) >> 2] = n.axes.length),
          (se[(e + 12) >> 2] = n.buttons.length),
          Q(n.id, e + 1304, 64),
          Q(n.mapping, e + 1368, 64);
      },
      registerGamepadEventCallback: function (n, i, t, r, o, a, u) {
        Ar.gamepadEvent || (Ar.gamepadEvent = hb(1432));
        var l = {
          target: Ar.findEventTarget(n),
          allowsDeferredCalls: !0,
          eventTypeString: a,
          callbackfunc: r,
          handlerFunc: function (n) {
            var t = n || window.event,
              a = Ar.gamepadEvent;
            Ar.fillGamepadEventData(a, t.gamepad),
              e.dynCall_iiii(r, o, a, i) && t.preventDefault();
          },
          useCapture: t,
        };
        Ar.registerOrRemoveHandler(l);
      },
      registerBeforeUnloadEventCallback: function (n, i, t, r, o, a) {
        var u = {
          target: Ar.findEventTarget(n),
          allowsDeferredCalls: !1,
          eventTypeString: a,
          callbackfunc: r,
          handlerFunc: function (n) {
            var t = n || window.event,
              a = e.dynCall_iiii(r, o, 0, i);
            if ((a && (a = X(a)), a))
              return t.preventDefault(), (t.returnValue = a), a;
          },
          useCapture: t,
        };
        Ar.registerOrRemoveHandler(u);
      },
      battery: function () {
        return (
          navigator.battery || navigator.mozBattery || navigator.webkitBattery
        );
      },
      fillBatteryEventData: function (e, n) {
        (pe[e >> 3] = n.chargingTime),
          (pe[(e + 8) >> 3] = n.dischargingTime),
          (pe[(e + 16) >> 3] = n.level),
          (se[(e + 24) >> 2] = n.charging);
      },
      registerBatteryEventCallback: function (n, i, t, r, o, a, u) {
        Ar.batteryEvent || (Ar.batteryEvent = hb(32));
        var l = {
          target: Ar.findEventTarget(n),
          allowsDeferredCalls: !1,
          eventTypeString: a,
          callbackfunc: r,
          handlerFunc: function (n) {
            var t = n || window.event,
              a = Ar.batteryEvent;
            Ar.fillBatteryEventData(a, Ar.battery()),
              e.dynCall_iiii(r, o, a, i) && t.preventDefault();
          },
          useCapture: t,
        };
        Ar.registerOrRemoveHandler(l);
      },
      registerWebGlEventCallback: function (n, i, t, r, o, a, u) {
        n || (n = e.canvas);
        var l = {
          target: Ar.findEventTarget(n),
          allowsDeferredCalls: !1,
          eventTypeString: a,
          callbackfunc: r,
          handlerFunc: function (n) {
            var t = n || window.event;
            e.dynCall_iiii(r, o, 0, i) && t.preventDefault();
          },
          useCapture: t,
        };
        Ar.registerOrRemoveHandler(l);
      },
    },
    Ir = {};
  function Sr() {
    if (void 0 === Ar.fullscreenEnabled()) return -1;
    if ((Ar.removeDeferredCalls(Ar.requestFullscreen), document.exitFullscreen))
      document.exitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else {
      if (!document.webkitExitFullscreen) return -1;
      document.webkitExitFullscreen();
    }
    return (
      Ir.canvasResizedCallback &&
        e.dynCall_iiii(
          Ir.canvasResizedCallback,
          37,
          0,
          Ir.canvasResizedCallbackUserData
        ),
      0
    );
  }
  function Or() {
    if (
      (Ar.removeDeferredCalls(Ar.requestPointerLock), document.exitPointerLock)
    )
      document.exitPointerLock();
    else if (document.msExitPointerLock) document.msExitPointerLock();
    else if (document.mozExitPointerLock) document.mozExitPointerLock();
    else {
      if (!document.webkitExitPointerLock) return -1;
      document.webkitExitPointerLock();
    }
    return 0;
  }
  function Tr(e) {
    return void 0 === Ar.fullscreenEnabled()
      ? -1
      : (Ar.fillFullscreenChangeEventData(e), 0);
  }
  function jr() {
    Ar.numGamepadsConnected &&
      ((hr.mainLoop.currentFrameNumber === Ar.lastGamepadStateFrame &&
        hr.mainLoop.currentFrameNumber) ||
        ((Ar.lastGamepadState = navigator.getGamepads
          ? navigator.getGamepads()
          : navigator.webkitGetGamepads
          ? navigator.webkitGetGamepads
          : null),
        (Ar.lastGamepadStateFrame = hr.mainLoop.currentFrameNumber)));
  }
  function Br(e, n) {
    return (
      jr(),
      Ar.lastGamepadState
        ? e < 0 || e >= Ar.lastGamepadState.length
          ? -5
          : Ar.lastGamepadState[e]
          ? (Ar.fillGamepadEventData(n, Ar.lastGamepadState[e]), 0)
          : -7
        : -1
    );
  }
  function Gr(e, n) {
    e && (se[e >> 2] = hr.mainLoop.timingMode),
      n && (se[n >> 2] = hr.mainLoop.timingValue);
  }
  function Rr() {
    return Ar.numGamepadsConnected
      ? (jr(), Ar.lastGamepadState ? Ar.lastGamepadState.length : -1)
      : 0;
  }
  function xr() {
    return 0;
  }
  function Dr() {
    Ar.removeAllEventListeners();
  }
  function Pr(n) {
    return !e.ctx || e.ctx.isContextLost();
  }
  function Mr(e) {
    return e < 0 || (0 === e && 1 / e == -1 / 0);
  }
  function Fr(e, n) {
    R(0 == (3 & n));
    var i = e,
      t = n;
    function r(e) {
      var n;
      return (
        (t = (function (e, n) {
          return (
            "double" === n || "i64" === n
              ? 7 & e && (R(4 == (7 & e)), (e += 4))
              : R(0 == (3 & e)),
            e
          );
        })(t, e)),
        "double" === e
          ? ((n = pe[t >> 3]), (t += 8))
          : "i64" == e
          ? ((n = [se[t >> 2], se[(t + 4) >> 2]]), (t += 8))
          : (R(0 == (3 & t)), (e = "i32"), (n = se[t >> 2]), (t += 4)),
        n
      );
    }
    for (var o, a, u, l = []; ; ) {
      var c = i;
      if (0 === (o = ae[i >> 0])) break;
      if (((a = ae[(i + 1) >> 0]), 37 == o)) {
        var s = !1,
          f = !1,
          _ = !1,
          p = !1,
          d = !1;
        e: for (;;) {
          switch (a) {
            case 43:
              s = !0;
              break;
            case 45:
              f = !0;
              break;
            case 35:
              _ = !0;
              break;
            case 48:
              if (p) break e;
              p = !0;
              break;
            case 32:
              d = !0;
              break;
            default:
              break e;
          }
          i++, (a = ae[(i + 1) >> 0]);
        }
        var m = 0;
        if (42 == a) (m = r("i32")), i++, (a = ae[(i + 1) >> 0]);
        else
          for (; a >= 48 && a <= 57; )
            (m = 10 * m + (a - 48)), i++, (a = ae[(i + 1) >> 0]);
        var y,
          v = !1,
          h = -1;
        if (46 == a) {
          if (((h = 0), (v = !0), i++, 42 == (a = ae[(i + 1) >> 0])))
            (h = r("i32")), i++;
          else
            for (;;) {
              var g = ae[(i + 1) >> 0];
              if (g < 48 || g > 57) break;
              (h = 10 * h + (g - 48)), i++;
            }
          a = ae[(i + 1) >> 0];
        }
        switch ((h < 0 && ((h = 6), (v = !1)), String.fromCharCode(a))) {
          case "h":
            104 == ae[(i + 2) >> 0] ? (i++, (y = 1)) : (y = 2);
            break;
          case "l":
            108 == ae[(i + 2) >> 0] ? (i++, (y = 8)) : (y = 4);
            break;
          case "L":
          case "q":
          case "j":
            y = 8;
            break;
          case "z":
          case "t":
          case "I":
            y = 4;
            break;
          default:
            y = null;
        }
        switch ((y && i++, (a = ae[(i + 1) >> 0]), String.fromCharCode(a))) {
          case "d":
          case "i":
          case "u":
          case "o":
          case "x":
          case "X":
          case "p":
            var b = 100 == a || 105 == a,
              w = (u = r("i" + 8 * (y = y || 4)));
            if ((8 == y && (u = T(u[0], u[1], 117 == a)), y <= 4))
              u = (b ? Ze : Ke)(u & (Math.pow(256, y) - 1), 8 * y);
            var E = Math.abs(u),
              C = "";
            if (100 == a || 105 == a)
              I =
                8 == y && "object" == typeof i64Math
                  ? i64Math.stringify(w[0], w[1], null)
                  : Ze(u, 8 * y).toString(10);
            else if (117 == a)
              (I =
                8 == y && "object" == typeof i64Math
                  ? i64Math.stringify(w[0], w[1], !0)
                  : Ke(u, 8 * y).toString(10)),
                (u = Math.abs(u));
            else if (111 == a) I = (_ ? "0" : "") + E.toString(8);
            else if (120 == a || 88 == a) {
              if (
                ((C = _ && 0 != u ? "0x" : ""),
                8 == y && "object" == typeof i64Math)
              )
                if (w[1]) {
                  I = (w[1] >>> 0).toString(16);
                  for (var L = (w[0] >>> 0).toString(16); L.length < 8; )
                    L = "0" + L;
                  I += L;
                } else I = (w[0] >>> 0).toString(16);
              else if (u < 0) {
                (u = -u), (I = (E - 1).toString(16));
                for (var k = [], A = 0; A < I.length; A++)
                  k.push((15 - parseInt(I[A], 16)).toString(16));
                for (I = k.join(""); I.length < 2 * y; ) I = "f" + I;
              } else I = E.toString(16);
              88 == a && ((C = C.toUpperCase()), (I = I.toUpperCase()));
            } else
              112 == a &&
                (0 === E ? (I = "(nil)") : ((C = "0x"), (I = E.toString(16))));
            if (v) for (; I.length < h; ) I = "0" + I;
            for (
              u >= 0 && (s ? (C = "+" + C) : d && (C = " " + C)),
                "-" == I.charAt(0) && ((C = "-" + C), (I = I.substr(1)));
              C.length + I.length < m;

            )
              f ? (I += " ") : p ? (I = "0" + I) : (C = " " + C);
            (I = C + I).split("").forEach(function (e) {
              l.push(e.charCodeAt(0));
            });
            break;
          case "f":
          case "F":
          case "e":
          case "E":
          case "g":
          case "G":
            var I;
            if (((u = r("double")), isNaN(u))) (I = "nan"), (p = !1);
            else if (isFinite(u)) {
              var S = !1,
                O = Math.min(h, 20);
              if (103 == a || 71 == a) {
                (S = !0), (h = h || 1);
                var j = parseInt(u.toExponential(O).split("e")[1], 10);
                h > j && j >= -4
                  ? ((a = (103 == a ? "f" : "F").charCodeAt(0)), (h -= j + 1))
                  : ((a = (103 == a ? "e" : "E").charCodeAt(0)), h--),
                  (O = Math.min(h, 20));
              }
              101 == a || 69 == a
                ? ((I = u.toExponential(O)),
                  /[eE][-+]\d$/.test(I) &&
                    (I = I.slice(0, -1) + "0" + I.slice(-1)))
                : (102 != a && 70 != a) ||
                  ((I = u.toFixed(O)), 0 === u && Mr(u) && (I = "-" + I));
              var B = I.split("e");
              if (S && !_)
                for (
                  ;
                  B[0].length > 1 &&
                  -1 != B[0].indexOf(".") &&
                  ("0" == B[0].slice(-1) || "." == B[0].slice(-1));

                )
                  B[0] = B[0].slice(0, -1);
              else
                for (_ && -1 == I.indexOf(".") && (B[0] += "."); h > O++; )
                  B[0] += "0";
              (I = B[0] + (B.length > 1 ? "e" + B[1] : "")),
                69 == a && (I = I.toUpperCase()),
                u >= 0 && (s ? (I = "+" + I) : d && (I = " " + I));
            } else (I = (u < 0 ? "-" : "") + "inf"), (p = !1);
            for (; I.length < m; )
              f
                ? (I += " ")
                : (I =
                    !p || ("-" != I[0] && "+" != I[0])
                      ? (p ? "0" : " ") + I
                      : I[0] + "0" + I.slice(1));
            a < 97 && (I = I.toUpperCase()),
              I.split("").forEach(function (e) {
                l.push(e.charCodeAt(0));
              });
            break;
          case "s":
            var G = r("i8*"),
              x = G ? Eb(G) : "(null)".length;
            if ((v && (x = Math.min(x, h)), !f)) for (; x < m--; ) l.push(32);
            if (G) for (A = 0; A < x; A++) l.push(ue[G++ >> 0]);
            else l = l.concat(os("(null)".substr(0, x), !0));
            if (f) for (; x < m--; ) l.push(32);
            break;
          case "c":
            for (f && l.push(r("i8")); --m > 0; ) l.push(32);
            f || l.push(r("i8"));
            break;
          case "n":
            var D = r("i32*");
            se[D >> 2] = l.length;
            break;
          case "%":
            l.push(o);
            break;
          default:
            for (A = c; A < i + 2; A++) l.push(ae[A >> 0]);
        }
        i += 2;
      } else l.push(o), (i += 1);
    }
    return l;
  }
  function Nr(e) {
    if (!e || !e.callee || !e.callee.name) return [null, "", ""];
    e.callee.toString();
    var n = e.callee.name,
      i = "(",
      t = !0;
    for (var r in e) {
      var o = e[r];
      t || (i += ", "),
        (t = !1),
        (i +=
          "number" == typeof o || "string" == typeof o
            ? o
            : "(" + typeof o + ")");
    }
    i += ")";
    var a = e.callee.caller;
    return t && (i = ""), [(e = a ? a.arguments : []), n, i];
  }
  function Ur(e) {
    var n = te(),
      i = n.lastIndexOf("_emscripten_log"),
      t = n.lastIndexOf("_emscripten_get_callstack"),
      r = n.indexOf("\n", Math.max(i, t)) + 1;
    (n = n.slice(r)),
      8 & e &&
        "undefined" == typeof emscripten_source_map &&
        (C(
          'Source map information is not available, emscripten_log with EM_LOG_C_STACK will be ignored. Build with "--pre-js $EMSCRIPTEN/src/emscripten-source-map.min.js" linker flag to add source map loading to code.'
        ),
        (e ^= 8),
        (e |= 16));
    var o = null;
    if (128 & e)
      for (o = Nr(arguments); o[1].indexOf("_emscripten_") >= 0; ) o = Nr(o[0]);
    var a = n.split("\n");
    n = "";
    var u = new RegExp("\\s*(.*?)@(.*?):([0-9]+):([0-9]+)"),
      l = new RegExp("\\s*(.*?)@(.*):(.*)(:(.*))?"),
      c = new RegExp("\\s*at (.*?) \\((.*):(.*):(.*)\\)");
    for (var s in a) {
      var f = a[s],
        _ = "",
        p = "",
        d = 0,
        m = 0,
        y = c.exec(f);
      if (y && 5 == y.length) (_ = y[1]), (p = y[2]), (d = y[3]), (m = y[4]);
      else {
        if (((y = u.exec(f)) || (y = l.exec(f)), !(y && y.length >= 4))) {
          n += f + "\n";
          continue;
        }
        (_ = y[1]), (p = y[2]), (d = y[3]), (m = 0 | y[4]);
      }
      var v = _;
      v || (v = _);
      var h = !1;
      if (8 & e) {
        var g = emscripten_source_map.originalPositionFor({
          line: d,
          column: m,
        });
        (h = g && g.source) &&
          (64 & e &&
            (g.source = g.source.substring(
              g.source.replace(/\\/g, "/").lastIndexOf("/") + 1
            )),
          (n +=
            "    at " +
            v +
            " (" +
            g.source +
            ":" +
            g.line +
            ":" +
            g.column +
            ")\n"));
      }
      (16 & e || !h) &&
        (64 & e &&
          (p = p.substring(p.replace(/\\/g, "/").lastIndexOf("/") + 1)),
        (n +=
          (h ? "     = " + _ : "    at " + v) +
          " (" +
          p +
          ":" +
          d +
          ":" +
          m +
          ")\n")),
        128 & e &&
          o[0] &&
          (o[1] == _ &&
            o[2].length > 0 &&
            ((n = n.replace(/\s+$/, "")),
            (n += " with values: " + o[1] + o[2] + "\n")),
          (o = Nr(o[0])));
    }
    return (n = n.replace(/\s+$/, ""));
  }
  function Wr(e, n) {
    24 & e &&
      ((n = n.replace(/\s+$/, "")), (n += (n.length > 0 ? "\n" : "") + Ur(e))),
      1 & e
        ? 4 & e
          ? console.error(n)
          : 2 & e
          ? console.warn(n)
          : console.log(n)
        : 6 & e
        ? v(n)
        : y(n);
  }
  function zr(e, n) {
    var i = se[n >> 2];
    n += 4;
    var t = "";
    if (i)
      for (var r = Fr(i, n), o = 0; o < r.length; ++o)
        t += String.fromCharCode(r[o]);
    Wr(e, t);
  }
  function Vr(n, i) {
    throw (e.setThrew(n, i || 1), "longjmp");
  }
  function qr(e, n) {
    Vr(e, n);
  }
  function Hr() {
    return 1;
  }
  function Xr(e, n, i) {
    Ar.isInternetExplorer()
      ? ((e.style.marginLeft = e.style.marginRight = i + "px"),
        (e.style.marginTop = e.style.marginBottom = n + "px"))
      : ((e.style.paddingLeft = e.style.paddingRight = i + "px"),
        (e.style.paddingTop = e.style.paddingBottom = n + "px"));
  }
  function Yr(e, n) {
    return void 0 === Ar.fullscreenEnabled()
      ? -1
      : Ar.fullscreenEnabled()
      ? (e || (e = "#canvas"),
        (e = Ar.findEventTarget(e))
          ? e.requestFullscreen ||
            e.msRequestFullscreen ||
            e.mozRequestFullScreen ||
            e.mozRequestFullscreen ||
            e.webkitRequestFullscreen
            ? Ar.canPerformEventHandlerRequests()
              ? Ar.requestFullscreen(e, n)
              : n.deferUntilInEventHandler
              ? (Ar.deferCall(Ar.requestFullscreen, 1, [e, n]), 1)
              : -2
            : -3
          : -4)
      : -3;
  }
  function Jr(e, n) {
    var i = { scaleMode: 0, canvasResolutionScaleMode: 0, filteringMode: 0 };
    return (
      (i.deferUntilInEventHandler = n),
      (i.canvasResizedCallbackTargetThread = 2),
      Yr(e, i)
    );
  }
  function Kr(e, n) {
    return (
      e || (e = "#canvas"),
      (e = Ar.findEventTarget(e))
        ? e.requestPointerLock ||
          e.mozRequestPointerLock ||
          e.webkitRequestPointerLock ||
          e.msRequestPointerLock
          ? Ar.canPerformEventHandlerRequests()
            ? Ar.requestPointerLock(e)
            : n
            ? (Ar.deferCall(Ar.requestPointerLock, 2, [e]), 1)
            : -2
          : -1
        : -4
    );
  }
  function Zr(e, n, i, t, r) {
    return Ar.registerFocusEventCallback(e, n, i, t, 12, "blur", r), 0;
  }
  function Qr(e, n, i, t, r) {
    return Ar.registerMouseEventCallback(e, n, i, t, 7, "dblclick", r), 0;
  }
  function $r(e, n, i, t) {
    return (
      Ar.registerDeviceMotionEventCallback(
        window,
        e,
        n,
        i,
        17,
        "devicemotion",
        t
      ),
      0
    );
  }
  function eo(e, n, i, t) {
    return (
      Ar.registerDeviceOrientationEventCallback(
        window,
        e,
        n,
        i,
        16,
        "deviceorientation",
        t
      ),
      0
    );
  }
  function no(e, n, i, t, r) {
    return Ar.registerFocusEventCallback(e, n, i, t, 13, "focus", r), 0;
  }
  function io(e, n, i, t, r) {
    if (void 0 === Ar.fullscreenEnabled()) return -1;
    if (e) {
      if (!(e = Ar.findEventTarget(e))) return -4;
    } else e = document;
    return (
      Ar.registerFullscreenChangeEventCallback(
        e,
        n,
        i,
        t,
        19,
        "fullscreenchange",
        r
      ),
      Ar.registerFullscreenChangeEventCallback(
        e,
        n,
        i,
        t,
        19,
        "mozfullscreenchange",
        r
      ),
      Ar.registerFullscreenChangeEventCallback(
        e,
        n,
        i,
        t,
        19,
        "webkitfullscreenchange",
        r
      ),
      Ar.registerFullscreenChangeEventCallback(
        e,
        n,
        i,
        t,
        19,
        "msfullscreenchange",
        r
      ),
      0
    );
  }
  function to(e, n, i, t) {
    return navigator.getGamepads || navigator.webkitGetGamepads
      ? (Ar.registerGamepadEventCallback(
          window,
          e,
          n,
          i,
          26,
          "gamepadconnected",
          t
        ),
        0)
      : -1;
  }
  function ro(e, n, i, t) {
    return navigator.getGamepads || navigator.webkitGetGamepads
      ? (Ar.registerGamepadEventCallback(
          window,
          e,
          n,
          i,
          27,
          "gamepaddisconnected",
          t
        ),
        0)
      : -1;
  }
  function oo(e, n, i, t, r) {
    return Ar.registerKeyEventCallback(e, n, i, t, 2, "keydown", r), 0;
  }
  function ao(e, n, i, t, r) {
    return Ar.registerKeyEventCallback(e, n, i, t, 1, "keypress", r), 0;
  }
  function uo(e, n, i, t, r) {
    return Ar.registerKeyEventCallback(e, n, i, t, 3, "keyup", r), 0;
  }
  function lo(e, n, i, t, r) {
    return Ar.registerMouseEventCallback(e, n, i, t, 5, "mousedown", r), 0;
  }
  function co(e, n, i, t, r) {
    return Ar.registerMouseEventCallback(e, n, i, t, 8, "mousemove", r), 0;
  }
  function so(e, n, i, t, r) {
    return Ar.registerMouseEventCallback(e, n, i, t, 6, "mouseup", r), 0;
  }
  function fo(e, n, i, t, r) {
    return Ar.registerTouchEventCallback(e, n, i, t, 25, "touchcancel", r), 0;
  }
  function _o(e, n, i, t, r) {
    return Ar.registerTouchEventCallback(e, n, i, t, 23, "touchend", r), 0;
  }
  function po(e, n, i, t, r) {
    return Ar.registerTouchEventCallback(e, n, i, t, 24, "touchmove", r), 0;
  }
  function mo(e, n, i, t, r) {
    return Ar.registerTouchEventCallback(e, n, i, t, 22, "touchstart", r), 0;
  }
  function yo(e, n, i, t, r) {
    return void 0 !== (e = Ar.findEventTarget(e)).onwheel
      ? (Ar.registerWheelEventCallback(e, n, i, t, 9, "wheel", r), 0)
      : void 0 !== e.onmousewheel
      ? (Ar.registerWheelEventCallback(e, n, i, t, 9, "mousewheel", r), 0)
      : -1;
  }
  var vo = {
    counter: 1,
    lastError: 0,
    buffers: [],
    mappedBuffers: {},
    programs: [],
    framebuffers: [],
    renderbuffers: [],
    textures: [],
    uniforms: [],
    shaders: [],
    vaos: [],
    contexts: [],
    currentContext: null,
    offscreenCanvases: {},
    timerQueriesEXT: [],
    queries: [],
    samplers: [],
    transformFeedbacks: [],
    syncs: [],
    byteSizeByTypeRoot: 5120,
    byteSizeByType: [1, 1, 2, 2, 4, 4, 4, 2, 3, 4, 8],
    programInfos: {},
    stringCache: {},
    stringiCache: {},
    tempFixedLengthArray: [],
    packAlignment: 4,
    unpackAlignment: 4,
    init: function () {
      vo.miniTempBuffer = new Float32Array(vo.MINI_TEMP_BUFFER_SIZE);
      for (var e = 0; e < vo.MINI_TEMP_BUFFER_SIZE; e++)
        vo.miniTempBufferViews[e] = vo.miniTempBuffer.subarray(0, e + 1);
      for (e = 0; e < 32; e++) vo.tempFixedLengthArray.push(new Array(e));
    },
    recordError: function (e) {
      vo.lastError || (vo.lastError = e);
    },
    getNewId: function (e) {
      for (var n = vo.counter++, i = e.length; i < n; i++) e[i] = null;
      return n;
    },
    MINI_TEMP_BUFFER_SIZE: 256,
    miniTempBuffer: null,
    miniTempBufferViews: [0],
    getSource: function (e, n, i, t) {
      for (var r = "", o = 0; o < n; ++o) {
        var a;
        if (t) {
          var u = se[(t + 4 * o) >> 2];
          a = u < 0 ? X(se[(i + 4 * o) >> 2]) : X(se[(i + 4 * o) >> 2], u);
        } else a = X(se[(i + 4 * o) >> 2]);
        r += a;
      }
      return r;
    },
    createContext: function (e, n) {
      var i;
      void 0 === n.majorVersion &&
        void 0 === n.minorVersion &&
        ("undefined" != typeof WebGL2RenderingContext
          ? (n.majorVersion = 2)
          : (n.majorVersion = 1),
        (n.minorVersion = 0));
      var t = "?";
      function r(e) {
        t = e.statusMessage || t;
      }
      n.powerPreference = "high-performance";
      try {
        e.addEventListener("webglcontextcreationerror", r, !1);
        try {
          if (1 == n.majorVersion && 0 == n.minorVersion)
            i =
              e.getContext("webgl", n) || e.getContext("experimental-webgl", n);
          else {
            if (2 != n.majorVersion || 0 != n.minorVersion)
              throw (
                "Unsupported WebGL context version " +
                majorVersion +
                "." +
                minorVersion +
                "!"
              );
            i = e.getContext("webgl2", n);
          }
        } finally {
          e.removeEventListener("webglcontextcreationerror", r, !1);
        }
        if (!i) throw ":(";
      } catch (e) {
        return y("Could not create canvas: " + [t, e, JSON.stringify(n)]), 0;
      }
      return i ? vo.registerContext(i, n) : 0;
    },
    registerContext: function (e, n) {
      var i = hb(8);
      se[i >> 2] = n.explicitSwapControl;
      var t = { handle: i, attributes: n, version: n.majorVersion, GLctx: e };
      function r() {
        var e = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
        return !!e && parseInt(e[2], 10);
      }
      return (
        (t.supportsWebGL2EntryPoints =
          t.version >= 2 && (!1 === r() || r() >= 58)),
        e.canvas && (e.canvas.GLctxObject = t),
        (vo.contexts[i] = t),
        (void 0 === n.enableExtensionsByDefault ||
          n.enableExtensionsByDefault) &&
          vo.initExtensions(t),
        n.renderViaOffscreenBackBuffer ? 0 : i
      );
    },
    makeContextCurrent: function (n) {
      if (!n) return (Jc = e.ctx = vo.currentContext = null), !0;
      var i = vo.contexts[n];
      return !!i && ((Jc = e.ctx = i.GLctx), (vo.currentContext = i), !0);
    },
    getContext: function (e) {
      return vo.contexts[e];
    },
    deleteContext: function (e) {
      e &&
        (vo.currentContext === vo.contexts[e] && (vo.currentContext = null),
        "object" == typeof Ar &&
          Ar.removeAllHandlersOnTarget(vo.contexts[e].GLctx.canvas),
        vo.contexts[e] &&
          vo.contexts[e].GLctx.canvas &&
          (vo.contexts[e].GLctx.canvas.GLctxObject = void 0),
        db(vo.contexts[e]),
        (vo.contexts[e] = null));
    },
    initExtensions: function (e) {
      if ((e || (e = vo.currentContext), !e.initExtensionsDone)) {
        e.initExtensionsDone = !0;
        var n = e.GLctx;
        if (
          ((e.maxVertexAttribs = n.getParameter(n.MAX_VERTEX_ATTRIBS)),
          e.version < 2)
        ) {
          var i = n.getExtension("ANGLE_instanced_arrays");
          i &&
            ((n.vertexAttribDivisor = function (e, n) {
              i.vertexAttribDivisorANGLE(e, n);
            }),
            (n.drawArraysInstanced = function (e, n, t, r) {
              i.drawArraysInstancedANGLE(e, n, t, r);
            }),
            (n.drawElementsInstanced = function (e, n, t, r, o) {
              i.drawElementsInstancedANGLE(e, n, t, r, o);
            }));
          var t = n.getExtension("OES_vertex_array_object");
          t &&
            ((n.createVertexArray = function () {
              return t.createVertexArrayOES();
            }),
            (n.deleteVertexArray = function (e) {
              t.deleteVertexArrayOES(e);
            }),
            (n.bindVertexArray = function (e) {
              t.bindVertexArrayOES(e);
            }),
            (n.isVertexArray = function (e) {
              return t.isVertexArrayOES(e);
            }));
          var r = n.getExtension("WEBGL_draw_buffers");
          r &&
            (n.drawBuffers = function (e, n) {
              r.drawBuffersWEBGL(e, n);
            });
        }
        n.disjointTimerQueryExt = n.getExtension("EXT_disjoint_timer_query");
        var o = [
            "OES_texture_float",
            "OES_texture_half_float",
            "OES_standard_derivatives",
            "OES_vertex_array_object",
            "WEBGL_compressed_texture_s3tc",
            "WEBGL_depth_texture",
            "OES_element_index_uint",
            "EXT_texture_filter_anisotropic",
            "EXT_frag_depth",
            "WEBGL_draw_buffers",
            "ANGLE_instanced_arrays",
            "OES_texture_float_linear",
            "OES_texture_half_float_linear",
            "EXT_blend_minmax",
            "EXT_shader_texture_lod",
            "EXT_texture_norm16",
            "WEBGL_compressed_texture_pvrtc",
            "EXT_color_buffer_half_float",
            "WEBGL_color_buffer_float",
            "EXT_sRGB",
            "WEBGL_compressed_texture_etc1",
            "EXT_disjoint_timer_query",
            "WEBGL_compressed_texture_etc",
            "WEBGL_compressed_texture_astc",
            "EXT_color_buffer_float",
            "WEBGL_compressed_texture_s3tc_srgb",
            "EXT_disjoint_timer_query_webgl2",
            "WEBKIT_WEBGL_compressed_texture_pvrtc",
          ],
          a = n.getSupportedExtensions();
        a &&
          a.length > 0 &&
          n.getSupportedExtensions().forEach(function (e) {
            -1 != o.indexOf(e) && n.getExtension(e);
          });
      }
    },
    populateUniformTable: function (e) {
      var n = vo.programs[e];
      vo.programInfos[e] = {
        uniforms: {},
        maxUniformLength: 0,
        maxAttributeLength: -1,
        maxUniformBlockNameLength: -1,
      };
      for (
        var i = vo.programInfos[e],
          t = i.uniforms,
          r = Jc.getProgramParameter(n, Jc.ACTIVE_UNIFORMS),
          o = 0;
        o < r;
        ++o
      ) {
        var a = Jc.getActiveUniform(n, o),
          u = a.name;
        if (
          ((i.maxUniformLength = Math.max(i.maxUniformLength, u.length + 1)),
          -1 !== u.indexOf("]", u.length - 1))
        ) {
          var l = u.lastIndexOf("[");
          u = u.slice(0, l);
        }
        var c = Jc.getUniformLocation(n, u);
        if (null != c) {
          var s = vo.getNewId(vo.uniforms);
          (t[u] = [a.size, s]), (vo.uniforms[s] = c);
          for (var f = 1; f < a.size; ++f) {
            var _ = u + "[" + f + "]";
            (c = Jc.getUniformLocation(n, _)),
              (s = vo.getNewId(vo.uniforms)),
              (vo.uniforms[s] = c);
          }
        }
      }
    },
  };
  function ho(n, i) {
    var t,
      r = {};
    return (
      (r.alpha = !!se[i >> 2]),
      (r.depth = !!se[(i + 4) >> 2]),
      (r.stencil = !!se[(i + 8) >> 2]),
      (r.antialias = !!se[(i + 12) >> 2]),
      (r.premultipliedAlpha = !!se[(i + 16) >> 2]),
      (r.preserveDrawingBuffer = !!se[(i + 20) >> 2]),
      (r.preferLowPowerToHighPerformance = !!se[(i + 24) >> 2]),
      (r.failIfMajorPerformanceCaveat = !!se[(i + 28) >> 2]),
      (r.majorVersion = se[(i + 32) >> 2]),
      (r.minorVersion = se[(i + 36) >> 2]),
      (r.explicitSwapControl = se[(i + 44) >> 2]),
      (r.proxyContextToMainThread = se[(i + 48) >> 2]),
      (r.renderViaOffscreenBackBuffer = se[(i + 52) >> 2]),
      (t =
        ((n = X(n)) && "#canvas" !== n) || !e.canvas
          ? vo.offscreenCanvases[n]
            ? vo.offscreenCanvases[n].offscreenCanvas
            : Ar.findEventTarget(n)
          : e.canvas.id && vo.offscreenCanvases[e.canvas.id]
          ? vo.offscreenCanvases[e.canvas.id].offscreenCanvas ||
            Ar.findEventTarget(e.canvas.id)
          : e.canvas)
        ? r.explicitSwapControl
          ? 0
          : vo.createContext(t, r)
        : 0
    );
  }
  function go() {
    return ho.apply(null, arguments);
  }
  function bo(e) {
    vo.deleteContext(e);
  }
  function wo() {
    return bo.apply(null, arguments);
  }
  function Eo(e, n) {
    var i = vo.getContext(e),
      t = X(n);
    return (
      0 == t.indexOf("GL_") && (t = t.substr(3)),
      i.GLctx.getExtension(t) ? 1 : 0
    );
  }
  function Co() {
    return Eo.apply(null, arguments);
  }
  function Lo() {
    return vo.currentContext ? vo.currentContext.handle : 0;
  }
  function ko() {
    return Lo.apply(null, arguments);
  }
  function Ao(e) {
    (se[e >> 2] = 1),
      (se[(e + 4) >> 2] = 1),
      (se[(e + 8) >> 2] = 0),
      (se[(e + 12) >> 2] = 1),
      (se[(e + 16) >> 2] = 1),
      (se[(e + 20) >> 2] = 0),
      (se[(e + 24) >> 2] = 0),
      (se[(e + 28) >> 2] = 0),
      (se[(e + 32) >> 2] = 1),
      (se[(e + 36) >> 2] = 0),
      (se[(e + 40) >> 2] = 1),
      (se[(e + 44) >> 2] = 0),
      (se[(e + 48) >> 2] = 0),
      (se[(e + 52) >> 2] = 0);
  }
  function Io(e) {
    return vo.makeContextCurrent(e) ? 0 : -5;
  }
  function So(e) {
    Tb(e);
  }
  function Oo(e) {
    So(e);
  }
  function To(e, n) {
    return 0;
  }
  function jo(e, n, i, t) {
    var r,
      o = 0,
      a = 0,
      u = 0,
      l = 0,
      c = 0,
      s = 0;
    function f(e, n, i, t, r, o) {
      var a, u, l;
      return (
        (u = 10 === e ? 28 : 16),
        (r = 10 === e ? ht(r) : vt(r)),
        R(!bt((a = hb(u)), e, r, o).errno),
        (l = hb(32)),
        (se[(l + 4) >> 2] = e),
        (se[(l + 8) >> 2] = n),
        (se[(l + 12) >> 2] = i),
        (se[(l + 24) >> 2] = t),
        (se[(l + 20) >> 2] = a),
        (se[(l + 16) >> 2] = 10 === e ? 28 : 16),
        (se[(l + 28) >> 2] = 0),
        l
      );
    }
    if (
      (i &&
        ((u = se[i >> 2]),
        (l = se[(i + 4) >> 2]),
        (c = se[(i + 8) >> 2]),
        (s = se[(i + 12) >> 2])),
      c && !s && (s = 2 === c ? 17 : 6),
      !c && s && (c = 17 === s ? 2 : 1),
      0 === s && (s = 6),
      0 === c && (c = 1),
      !e && !n)
    )
      return -2;
    if (-1088 & u) return -1;
    if (0 !== i && 2 & se[i >> 2] && !e) return -1;
    if (32 & u) return -2;
    if (0 !== c && 1 !== c && 2 !== c) return -7;
    if (0 !== l && 2 !== l && 10 !== l) return -6;
    if (n && ((n = X(n)), (a = parseInt(n, 10)), isNaN(a)))
      return 1024 & u ? -2 : -8;
    if (!e)
      return (
        0 === l && (l = 2),
        0 == (1 & u) && (o = 2 === l ? mb(2130706433) : [0, 0, 0, 1]),
        (r = f(l, c, s, null, o, a)),
        (se[t >> 2] = r),
        0
      );
    if (null !== (o = dt((e = X(e)))))
      if (0 === l || 2 === l) l = 2;
      else {
        if (!(10 === l && 8 & u)) return -2;
        (o = [0, 0, mb(65535), o]), (l = 10);
      }
    else if (null !== (o = mt(e))) {
      if (0 !== l && 10 !== l) return -2;
      l = 10;
    }
    return null != o
      ? ((r = f(l, c, s, e, o, a)), (se[t >> 2] = r), 0)
      : 4 & u
      ? -2
      : ((o = dt((e = yt.lookup_name(e)))),
        0 === l ? (l = 2) : 10 === l && (o = [0, 0, mb(65535), o]),
        (r = f(l, c, s, null, o, a)),
        (se[t >> 2] = r),
        0);
  }
  function Bo(e) {
    return 0 === e
      ? 0
      : ((e = X(e)),
        Di.hasOwnProperty(e)
          ? (Bo.ret && db(Bo.ret), (Bo.ret = ee(Di[e])), Bo.ret)
          : 0);
  }
  function Go(e) {
    e = X(e);
    var n = hb(20),
      i = hb(e.length + 1);
    Q(e, i, e.length + 1), (se[n >> 2] = i);
    var t = hb(4);
    (se[t >> 2] = 0), (se[(n + 4) >> 2] = t);
    (se[(n + 8) >> 2] = 2), (se[(n + 12) >> 2] = 4);
    var r = hb(12);
    return (
      (se[r >> 2] = r + 8),
      (se[(r + 4) >> 2] = 0),
      (se[(r + 8) >> 2] = dt(yt.lookup_name(e))),
      (se[(n + 16) >> 2] = r),
      n
    );
  }
  function Ro(e, n, i) {
    if (2 !== i) return nt(et.EAFNOSUPPORT), null;
    var t = vt((e = se[e >> 2])),
      r = yt.lookup_addr(t);
    return r && (t = r), Go(q(os(t), "i8", W));
  }
  function xo(e, n, i, t, r, o, a) {
    var u = gt(e, n);
    if (u.errno) return -6;
    var l = u.port,
      c = u.addr,
      s = !1;
    if (i && t) {
      var f;
      if (1 & a || !(f = yt.lookup_addr(c))) {
        if (8 & a) return -2;
      } else c = f;
      Q(c, i, t) + 1 >= t && (s = !0);
    }
    r && o && Q((l = "" + l), r, o) + 1 >= o && (s = !0);
    return s ? -12 : 0;
  }
  function Do() {
    return Ee;
  }
  function Po(e) {
    return 0;
  }
  function Mo(e) {
    var n = Date.now();
    return (
      (se[e >> 2] = (n / 1e3) | 0),
      (se[(e + 4) >> 2] = ((n % 1e3) * 1e3) | 0),
      0
    );
  }
  function Fo(e) {
    Jc.activeTexture(e);
  }
  function No(e, n) {
    Jc.attachShader(vo.programs[e], vo.shaders[n]);
  }
  function Uo(e, n) {
    Jc.beginQuery(e, n ? vo.queries[n] : null);
  }
  function Wo(e) {
    Jc.beginTransformFeedback(e);
  }
  function zo(e, n, i) {
    (i = X(i)), Jc.bindAttribLocation(vo.programs[e], n, i);
  }
  function Vo(e, n) {
    var i = n ? vo.buffers[n] : null;
    35051 == e
      ? (Jc.currentPixelPackBufferBinding = n)
      : 35052 == e && (Jc.currentPixelUnpackBufferBinding = n),
      Jc.bindBuffer(e, i);
  }
  function qo(e, n, i) {
    var t = i ? vo.buffers[i] : null;
    Jc.bindBufferBase(e, n, t);
  }
  function Ho(e, n, i, t, r) {
    var o = i ? vo.buffers[i] : null;
    Jc.bindBufferRange(e, n, o, t, r);
  }
  function Xo(e, n) {
    Jc.bindFramebuffer(e, n ? vo.framebuffers[n] : null);
  }
  function Yo(e, n) {
    Jc.bindRenderbuffer(e, n ? vo.renderbuffers[n] : null);
  }
  function Jo(e, n) {
    Jc.bindSampler(e, n ? vo.samplers[n] : null);
  }
  function Ko(e, n) {
    Jc.bindTexture(e, n ? vo.textures[n] : null);
  }
  function Zo(e, n) {
    var i = n ? vo.transformFeedbacks[n] : null;
    !n || i ? Jc.bindTransformFeedback(e, i) : vo.recordError(1282);
  }
  function Qo(e) {
    Jc.bindVertexArray(vo.vaos[e]);
  }
  function $o(e) {
    Jc.blendEquation(e);
  }
  function ea(e, n) {
    Jc.blendEquationSeparate(e, n);
  }
  function na(e, n, i, t) {
    Jc.blendFuncSeparate(e, n, i, t);
  }
  function ia(e, n, i, t, r, o, a, u, l, c) {
    Jc.blitFramebuffer(e, n, i, t, r, o, a, u, l, c);
  }
  function ta(e, n, i, t) {
    if (i) {
      if (vo.currentContext.supportsWebGL2EntryPoints)
        return void Jc.bufferData(e, ue, t, i, n);
      Jc.bufferData(e, ue.subarray(i, i + n), t);
    } else Jc.bufferData(e, n, t);
  }
  function ra(e, n, i, t) {
    vo.currentContext.supportsWebGL2EntryPoints
      ? Jc.bufferSubData(e, n, ue, t, i)
      : Jc.bufferSubData(e, n, ue.subarray(t, t + i));
  }
  function oa(e) {
    return Jc.checkFramebufferStatus(e);
  }
  function aa(e) {
    Jc.clear(e);
  }
  function ua(e, n, i, t) {
    Jc.clearBufferfi(e, n, i, t);
  }
  function la(e, n, i) {
    Jc.clearBufferfv(e, n, _e, i >> 2);
  }
  function ca(e, n, i) {
    Jc.clearBufferuiv(e, n, fe, i >> 2);
  }
  function sa(e, n, i, t) {
    Jc.clearColor(e, n, i, t);
  }
  function fa(e) {
    Jc.clearDepth(e);
  }
  function _a(e) {
    Jc.clearStencil(e);
  }
  function pa(e, n, i, t) {
    t >>>= 0;
    var r = 4294967295 == (i >>>= 0) && 4294967295 == t ? -1 : T(i, t, !0);
    return Jc.clientWaitSync(vo.syncs[e], n, r);
  }
  function da(e, n, i, t) {
    Jc.colorMask(!!e, !!n, !!i, !!t);
  }
  function ma(e) {
    Jc.compileShader(vo.shaders[e]);
  }
  function ya(e, n, i, t, r, o, a, u) {
    vo.currentContext.supportsWebGL2EntryPoints
      ? Jc.compressedTexImage2D(e, n, i, t, r, o, ue, u, a)
      : Jc.compressedTexImage2D(
          e,
          n,
          i,
          t,
          r,
          o,
          u ? ue.subarray(u, u + a) : null
        );
  }
  function va(e, n, i, t, r, o, a, u, l) {
    vo.currentContext.supportsWebGL2EntryPoints
      ? Jc.compressedTexImage3D(e, n, i, t, r, o, a, ue, l, u)
      : Jc.compressedTexImage3D(
          e,
          n,
          i,
          t,
          r,
          o,
          a,
          l ? ue.subarray(l, l + u) : null
        );
  }
  function ha(e, n, i, t, r, o, a, u, l) {
    vo.currentContext.supportsWebGL2EntryPoints
      ? Jc.compressedTexSubImage2D(e, n, i, t, r, o, a, ue, l, u)
      : Jc.compressedTexSubImage2D(
          e,
          n,
          i,
          t,
          r,
          o,
          a,
          l ? ue.subarray(l, l + u) : null
        );
  }
  function ga(e, n, i, t, r, o, a, u, l, c, s) {
    vo.currentContext.supportsWebGL2EntryPoints
      ? Jc.compressedTexSubImage3D(e, n, i, t, r, o, a, u, l, ue, s, c)
      : Jc.compressedTexSubImage3D(
          e,
          n,
          i,
          t,
          r,
          o,
          a,
          u,
          l,
          s ? ue.subarray(s, s + c) : null
        );
  }
  function ba(e, n, i, t, r) {
    Jc.copyBufferSubData(e, n, i, t, r);
  }
  function wa(e, n, i, t, r, o, a, u) {
    Jc.copyTexImage2D(e, n, i, t, r, o, a, u);
  }
  function Ea(e, n, i, t, r, o, a, u) {
    Jc.copyTexSubImage2D(e, n, i, t, r, o, a, u);
  }
  function Ca() {
    var e = vo.getNewId(vo.programs),
      n = Jc.createProgram();
    return (n.name = e), (vo.programs[e] = n), e;
  }
  function La(e) {
    var n = vo.getNewId(vo.shaders);
    return (vo.shaders[n] = Jc.createShader(e)), n;
  }
  function ka(e) {
    Jc.cullFace(e);
  }
  function Aa(e, n) {
    for (var i = 0; i < e; i++) {
      var t = se[(n + 4 * i) >> 2],
        r = vo.buffers[t];
      r &&
        (Jc.deleteBuffer(r),
        (r.name = 0),
        (vo.buffers[t] = null),
        t == vo.currArrayBuffer && (vo.currArrayBuffer = 0),
        t == vo.currElementArrayBuffer && (vo.currElementArrayBuffer = 0));
    }
  }
  function Ia(e, n) {
    for (var i = 0; i < e; ++i) {
      var t = se[(n + 4 * i) >> 2],
        r = vo.framebuffers[t];
      r && (Jc.deleteFramebuffer(r), (r.name = 0), (vo.framebuffers[t] = null));
    }
  }
  function Sa(e) {
    if (e) {
      var n = vo.programs[e];
      n
        ? (Jc.deleteProgram(n),
          (n.name = 0),
          (vo.programs[e] = null),
          (vo.programInfos[e] = null))
        : vo.recordError(1281);
    }
  }
  function Oa(e, n) {
    for (var i = 0; i < e; i++) {
      var t = se[(n + 4 * i) >> 2],
        r = vo.queries[t];
      r && (Jc.deleteQuery(r), (vo.queries[t] = null));
    }
  }
  function Ta(e, n) {
    for (var i = 0; i < e; i++) {
      var t = se[(n + 4 * i) >> 2],
        r = vo.renderbuffers[t];
      r &&
        (Jc.deleteRenderbuffer(r), (r.name = 0), (vo.renderbuffers[t] = null));
    }
  }
  function ja(e, n) {
    for (var i = 0; i < e; i++) {
      var t = se[(n + 4 * i) >> 2],
        r = vo.samplers[t];
      r && (Jc.deleteSampler(r), (r.name = 0), (vo.samplers[t] = null));
    }
  }
  function Ba(e) {
    if (e) {
      var n = vo.shaders[e];
      n ? (Jc.deleteShader(n), (vo.shaders[e] = null)) : vo.recordError(1281);
    }
  }
  function Ga(e) {
    if (e) {
      var n = vo.syncs[e];
      n
        ? (Jc.deleteSync(n), (n.name = 0), (vo.syncs[e] = null))
        : vo.recordError(1281);
    }
  }
  function Ra(e, n) {
    for (var i = 0; i < e; i++) {
      var t = se[(n + 4 * i) >> 2],
        r = vo.textures[t];
      r && (Jc.deleteTexture(r), (r.name = 0), (vo.textures[t] = null));
    }
  }
  function xa(e, n) {
    for (var i = 0; i < e; i++) {
      var t = se[(n + 4 * i) >> 2],
        r = vo.transformFeedbacks[t];
      r &&
        (Jc.deleteTransformFeedback(r),
        (r.name = 0),
        (vo.transformFeedbacks[t] = null));
    }
  }
  function Da(e, n) {
    for (var i = 0; i < e; i++) {
      var t = se[(n + 4 * i) >> 2];
      Jc.deleteVertexArray(vo.vaos[t]), (vo.vaos[t] = null);
    }
  }
  function Pa(e) {
    Jc.depthFunc(e);
  }
  function Ma(e) {
    Jc.depthMask(!!e);
  }
  function Fa(e, n) {
    Jc.detachShader(vo.programs[e], vo.shaders[n]);
  }
  function Na(e) {
    Jc.disable(e);
  }
  function Ua(e) {
    Jc.disableVertexAttribArray(e);
  }
  function Wa(e, n, i) {
    Jc.drawArrays(e, n, i);
  }
  function za(e, n, i, t) {
    Jc.drawArraysInstanced(e, n, i, t);
  }
  function Va(e, n) {
    for (var i = vo.tempFixedLengthArray[e], t = 0; t < e; t++)
      i[t] = se[(n + 4 * t) >> 2];
    Jc.drawBuffers(i);
  }
  function qa(e, n, i, t) {
    Jc.drawElements(e, n, i, t);
  }
  function Ha(e, n, i, t, r) {
    Jc.drawElementsInstanced(e, n, i, t, r);
  }
  function Xa(e) {
    Jc.enable(e);
  }
  function Ya(e) {
    Jc.enableVertexAttribArray(e);
  }
  function Ja(e) {
    Jc.endQuery(e);
  }
  function Ka() {
    Jc.endTransformFeedback();
  }
  function Za(e, n) {
    var i = Jc.fenceSync(e, n);
    if (i) {
      var t = vo.getNewId(vo.syncs);
      return (i.name = t), (vo.syncs[t] = i), t;
    }
    return 0;
  }
  function Qa() {
    Jc.finish();
  }
  function $a() {
    Jc.flush();
  }
  function eu(e) {
    switch (e) {
      case 34962:
        e = 34964;
        break;
      case 34963:
        e = 34965;
        break;
      case 35051:
        e = 35053;
        break;
      case 35052:
        e = 35055;
        break;
      case 35982:
        e = 35983;
        break;
      case 36662:
        e = 36662;
        break;
      case 36663:
        e = 36663;
        break;
      case 35345:
        e = 35368;
    }
    var n = Jc.getParameter(e);
    return n ? 0 | n.name : 0;
  }
  function nu(e) {
    switch (e) {
      case 34962:
      case 34963:
      case 36662:
      case 36663:
      case 35051:
      case 35052:
      case 35882:
      case 35982:
      case 35345:
        return !0;
      default:
        return !1;
    }
  }
  function iu(n, i, t) {
    if (!nu(n))
      return (
        vo.recordError(1280),
        void v("GL_INVALID_ENUM in glFlushMappedBufferRange")
      );
    var r = vo.mappedBuffers[eu(n)];
    return r
      ? 16 & r.access
        ? i < 0 || t < 0 || i + t > r.length
          ? (vo.recordError(1281),
            void e.printError("invalid range in glFlushMappedBufferRange"))
          : void Jc.bufferSubData(
              n,
              r.offset,
              ue.subarray(r.mem + i, r.mem + i + t)
            )
        : (vo.recordError(1282),
          void e.printError(
            "buffer was not mapped with GL_MAP_FLUSH_EXPLICIT_BIT in glFlushMappedBufferRange"
          ))
      : (vo.recordError(1282),
        void e.printError(
          "buffer was never mapped in glFlushMappedBufferRange"
        ));
  }
  function tu(e, n, i, t) {
    Jc.framebufferRenderbuffer(e, n, i, vo.renderbuffers[t]);
  }
  function ru(e, n, i, t, r) {
    Jc.framebufferTexture2D(e, n, i, vo.textures[t], r);
  }
  function ou(e, n, i, t, r) {
    Jc.framebufferTextureLayer(e, n, vo.textures[i], t, r);
  }
  function au(e) {
    Jc.frontFace(e);
  }
  function uu(e, n) {
    for (var i = 0; i < e; i++) {
      var t = Jc.createBuffer();
      if (!t) {
        for (vo.recordError(1282); i < e; ) se[(n + 4 * i++) >> 2] = 0;
        return;
      }
      var r = vo.getNewId(vo.buffers);
      (t.name = r), (vo.buffers[r] = t), (se[(n + 4 * i) >> 2] = r);
    }
  }
  function lu(e, n) {
    for (var i = 0; i < e; ++i) {
      var t = Jc.createFramebuffer();
      if (!t) {
        for (vo.recordError(1282); i < e; ) se[(n + 4 * i++) >> 2] = 0;
        return;
      }
      var r = vo.getNewId(vo.framebuffers);
      (t.name = r), (vo.framebuffers[r] = t), (se[(n + 4 * i) >> 2] = r);
    }
  }
  function cu(e, n) {
    for (var i = 0; i < e; i++) {
      var t = Jc.createQuery();
      if (!t) {
        for (vo.recordError(1282); i < e; ) se[(n + 4 * i++) >> 2] = 0;
        return;
      }
      var r = vo.getNewId(vo.queries);
      (t.name = r), (vo.queries[r] = t), (se[(n + 4 * i) >> 2] = r);
    }
  }
  function su(e, n) {
    for (var i = 0; i < e; i++) {
      var t = Jc.createRenderbuffer();
      if (!t) {
        for (vo.recordError(1282); i < e; ) se[(n + 4 * i++) >> 2] = 0;
        return;
      }
      var r = vo.getNewId(vo.renderbuffers);
      (t.name = r), (vo.renderbuffers[r] = t), (se[(n + 4 * i) >> 2] = r);
    }
  }
  function fu(e, n) {
    for (var i = 0; i < e; i++) {
      var t = Jc.createSampler();
      if (!t) {
        for (vo.recordError(1282); i < e; ) se[(n + 4 * i++) >> 2] = 0;
        return;
      }
      var r = vo.getNewId(vo.samplers);
      (t.name = r), (vo.samplers[r] = t), (se[(n + 4 * i) >> 2] = r);
    }
  }
  function _u(e, n) {
    for (var i = 0; i < e; i++) {
      var t = Jc.createTexture();
      if (!t) {
        for (vo.recordError(1282); i < e; ) se[(n + 4 * i++) >> 2] = 0;
        return;
      }
      var r = vo.getNewId(vo.textures);
      (t.name = r), (vo.textures[r] = t), (se[(n + 4 * i) >> 2] = r);
    }
  }
  function pu(e, n) {
    for (var i = 0; i < e; i++) {
      var t = Jc.createTransformFeedback();
      if (!t) {
        for (vo.recordError(1282); i < e; ) se[(n + 4 * i++) >> 2] = 0;
        return;
      }
      var r = vo.getNewId(vo.transformFeedbacks);
      (t.name = r), (vo.transformFeedbacks[r] = t), (se[(n + 4 * i) >> 2] = r);
    }
  }
  function du(e, n) {
    for (var i = 0; i < e; i++) {
      var t = Jc.createVertexArray();
      if (!t) {
        for (vo.recordError(1282); i < e; ) se[(n + 4 * i++) >> 2] = 0;
        return;
      }
      var r = vo.getNewId(vo.vaos);
      (t.name = r), (vo.vaos[r] = t), (se[(n + 4 * i) >> 2] = r);
    }
  }
  function mu(e) {
    Jc.generateMipmap(e);
  }
  function yu(e, n, i, t, r, o, a) {
    e = vo.programs[e];
    var u = Jc.getActiveAttrib(e, n);
    if (u) {
      if (i > 0 && a) {
        var l = Q(u.name, a, i);
        t && (se[t >> 2] = l);
      } else t && (se[t >> 2] = 0);
      r && (se[r >> 2] = u.size), o && (se[o >> 2] = u.type);
    }
  }
  function vu(e, n, i, t, r, o, a) {
    e = vo.programs[e];
    var u = Jc.getActiveUniform(e, n);
    if (u) {
      if (i > 0 && a) {
        var l = Q(u.name, a, i);
        t && (se[t >> 2] = l);
      } else t && (se[t >> 2] = 0);
      r && (se[r >> 2] = u.size), o && (se[o >> 2] = u.type);
    }
  }
  function hu(e, n, i, t, r) {
    e = vo.programs[e];
    var o = Jc.getActiveUniformBlockName(e, n);
    if (o)
      if (r && i > 0) {
        var a = Q(o, r, i);
        t && (se[t >> 2] = a);
      } else t && (se[t >> 2] = 0);
  }
  function gu(e, n, i, t) {
    if (t)
      if (((e = vo.programs[e]), 35393 !== i)) {
        var r = Jc.getActiveUniformBlockParameter(e, n, i);
        if (r)
          if ("number" == typeof r) se[t >> 2] = r;
          else for (var o = 0; o < r.length; o++) se[(t + 4 * o) >> 2] = r[o];
      } else {
        var a = Jc.getActiveUniformBlockName(e, n);
        se[t >> 2] = a.length + 1;
      }
    else vo.recordError(1281);
  }
  function bu(e, n, i, t, r) {
    if (r)
      if (n > 0 && 0 == i) vo.recordError(1281);
      else {
        e = vo.programs[e];
        for (var o = [], a = 0; a < n; a++) o.push(se[(i + 4 * a) >> 2]);
        var u = Jc.getActiveUniforms(e, o, t);
        if (u) {
          var l = u.length;
          for (a = 0; a < l; a++) se[(r + 4 * a) >> 2] = u[a];
        }
      }
    else vo.recordError(1281);
  }
  function wu(e, n) {
    return Jc.getAttribLocation(vo.programs[e], X(n));
  }
  function Eu() {
    if (vo.lastError) {
      var e = vo.lastError;
      return (vo.lastError = 0), e;
    }
    return Jc.getError();
  }
  function Cu(e, n, i, t) {
    var r = Jc.getFramebufferAttachmentParameter(e, n, i);
    (r instanceof WebGLRenderbuffer || r instanceof WebGLTexture) &&
      (r = 0 | r.name),
      (se[t >> 2] = r);
  }
  function Lu(e, n, i, t) {
    if (i) {
      var r,
        o = Jc.getIndexedParameter(e, n);
      switch (typeof o) {
        case "boolean":
          r = o ? 1 : 0;
          break;
        case "number":
          r = o;
          break;
        case "object":
          if (null === o)
            switch (e) {
              case 35983:
              case 35368:
                r = 0;
                break;
              default:
                return void vo.recordError(1280);
            }
          else {
            if (!(o instanceof WebGLBuffer)) return void vo.recordError(1280);
            r = 0 | o.name;
          }
          break;
        default:
          return void vo.recordError(1280);
      }
      switch (t) {
        case "Integer64":
          (tempI64 = [
            r >>> 0,
            ((tempDouble = r),
            +Qe(tempDouble) >= 1
              ? tempDouble > 0
                ? (0 | tn(+en(tempDouble / 4294967296), 4294967295)) >>> 0
                : ~~+$e((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0
              : 0),
          ]),
            (se[i >> 2] = tempI64[0]),
            (se[(i + 4) >> 2] = tempI64[1]);
          break;
        case "Integer":
          se[i >> 2] = r;
          break;
        case "Float":
          _e[i >> 2] = r;
          break;
        case "Boolean":
          ae[i >> 0] = r ? 1 : 0;
          break;
        default:
          throw "internal emscriptenWebGLGetIndexed() error, bad type: " + t;
      }
    } else vo.recordError(1281);
  }
  function ku(e, n, i) {
    Lu(e, n, i, "Integer");
  }
  function Au(e, n, i) {
    if (n) {
      var t = void 0;
      switch (e) {
        case 36346:
          t = 1;
          break;
        case 36344:
          return void (
            "Integer" !== i &&
            "Integer64" !== i &&
            vo.recordError(1280)
          );
        case 34814:
        case 36345:
          t = 0;
          break;
        case 34466:
          t = Jc.getParameter(34467).length;
          break;
        case 33309:
          if (Jc.canvas.GLctxObject.version < 2)
            return void vo.recordError(1282);
          t = 2 * Jc.getSupportedExtensions().length;
          break;
        case 33307:
        case 33308:
          if (Jc.canvas.GLctxObject.version < 2)
            return void vo.recordError(1280);
          t = 33307 == e ? 3 : 0;
      }
      if (void 0 === t) {
        var r = Jc.getParameter(e);
        switch (typeof r) {
          case "number":
            t = r;
            break;
          case "boolean":
            t = r ? 1 : 0;
            break;
          case "string":
          default:
            return void vo.recordError(1280);
          case "object":
            if (null === r)
              switch (e) {
                case 34964:
                case 35725:
                case 34965:
                case 36006:
                case 36007:
                case 32873:
                case 34229:
                case 35097:
                case 36389:
                case 34068:
                  t = 0;
                  break;
                default:
                  return void vo.recordError(1280);
              }
            else {
              if (
                r instanceof Float32Array ||
                r instanceof Uint32Array ||
                r instanceof Int32Array ||
                r instanceof Array
              ) {
                for (var o = 0; o < r.length; ++o)
                  switch (i) {
                    case "Integer":
                      se[(n + 4 * o) >> 2] = r[o];
                      break;
                    case "Float":
                      _e[(n + 4 * o) >> 2] = r[o];
                      break;
                    case "Boolean":
                      ae[(n + o) >> 0] = r[o] ? 1 : 0;
                      break;
                    default:
                      throw "internal glGet error, bad type: " + i;
                  }
                return;
              }
              if (
                !(
                  r instanceof WebGLBuffer ||
                  r instanceof WebGLProgram ||
                  r instanceof WebGLFramebuffer ||
                  r instanceof WebGLRenderbuffer ||
                  r instanceof WebGLQuery ||
                  r instanceof WebGLSampler ||
                  r instanceof WebGLSync ||
                  r instanceof WebGLTransformFeedback ||
                  r instanceof WebGLVertexArrayObject ||
                  r instanceof WebGLTexture
                )
              )
                return void vo.recordError(1280);
              t = 0 | r.name;
            }
        }
      }
      switch (i) {
        case "Integer64":
          (tempI64 = [
            t >>> 0,
            ((tempDouble = t),
            +Qe(tempDouble) >= 1
              ? tempDouble > 0
                ? (0 | tn(+en(tempDouble / 4294967296), 4294967295)) >>> 0
                : ~~+$e((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0
              : 0),
          ]),
            (se[n >> 2] = tempI64[0]),
            (se[(n + 4) >> 2] = tempI64[1]);
          break;
        case "Integer":
          se[n >> 2] = t;
          break;
        case "Float":
          _e[n >> 2] = t;
          break;
        case "Boolean":
          ae[n >> 0] = t ? 1 : 0;
          break;
        default:
          throw "internal glGet error, bad type: " + i;
      }
    } else vo.recordError(1281);
  }
  function Iu(e, n) {
    Au(e, n, "Integer");
  }
  function Su(e, n, i, t, r) {
    if (t < 0) vo.recordError(1281);
    else {
      var o = Jc.getInternalformatParameter(e, n, 32937);
      if (o)
        switch (i) {
          case 32937:
            for (var a = Math.min(t, o.length), u = 0; u < a; u++) {
              var l = o[u];
              se[(r + 4 * u) >> 2] = l;
            }
            break;
          case 37760:
            if (t > 1) {
              l = o.length;
              se[r >> 2] = l;
            }
            break;
          default:
            vo.recordError(1280);
        }
      else vo.recordError(1280);
    }
  }
  function Ou(e, n, i, t, r) {
    vo.recordError(1282);
  }
  function Tu(e, n, i, t) {
    var r = Jc.getProgramInfoLog(vo.programs[e]);
    if ((null === r && (r = "(unknown error)"), n > 0 && t)) {
      var o = Q(r, t, n);
      i && (se[i >> 2] = o);
    } else i && (se[i >> 2] = 0);
  }
  function ju(e, n, i) {
    if (i)
      if (e >= vo.counter) vo.recordError(1281);
      else {
        var t = vo.programInfos[e];
        if (t)
          if (35716 == n) {
            var r = Jc.getProgramInfoLog(vo.programs[e]);
            null === r && (r = "(unknown error)"), (se[i >> 2] = r.length + 1);
          } else if (35719 == n) se[i >> 2] = t.maxUniformLength;
          else if (35722 == n) {
            if (-1 == t.maxAttributeLength) {
              e = vo.programs[e];
              var o = Jc.getProgramParameter(e, Jc.ACTIVE_ATTRIBUTES);
              t.maxAttributeLength = 0;
              for (var a = 0; a < o; ++a) {
                var u = Jc.getActiveAttrib(e, a);
                t.maxAttributeLength = Math.max(
                  t.maxAttributeLength,
                  u.name.length + 1
                );
              }
            }
            se[i >> 2] = t.maxAttributeLength;
          } else if (35381 == n) {
            if (-1 == t.maxUniformBlockNameLength) {
              e = vo.programs[e];
              var l = Jc.getProgramParameter(e, Jc.ACTIVE_UNIFORM_BLOCKS);
              t.maxUniformBlockNameLength = 0;
              for (a = 0; a < l; ++a) {
                var c = Jc.getActiveUniformBlockName(e, a);
                t.maxUniformBlockNameLength = Math.max(
                  t.maxUniformBlockNameLength,
                  c.length + 1
                );
              }
            }
            se[i >> 2] = t.maxUniformBlockNameLength;
          } else se[i >> 2] = Jc.getProgramParameter(vo.programs[e], n);
        else vo.recordError(1282);
      }
    else vo.recordError(1281);
  }
  function Bu(e, n, i) {
    if (i) {
      var t,
        r = vo.queries[e],
        o = Jc.getQueryParameter(r, n);
      (t = "boolean" == typeof o ? (o ? 1 : 0) : o), (se[i >> 2] = t);
    } else vo.recordError(1281);
  }
  function Gu(e, n, i) {
    i ? (se[i >> 2] = Jc.getQuery(e, n)) : vo.recordError(1281);
  }
  function Ru(e, n, i) {
    i ? (se[i >> 2] = Jc.getRenderbufferParameter(e, n)) : vo.recordError(1281);
  }
  function xu(e, n, i, t) {
    var r = Jc.getShaderInfoLog(vo.shaders[e]);
    if ((null === r && (r = "(unknown error)"), n > 0 && t)) {
      var o = Q(r, t, n);
      i && (se[i >> 2] = o);
    } else i && (se[i >> 2] = 0);
  }
  function Du(e, n, i, t) {
    var r = Jc.getShaderPrecisionFormat(e, n);
    (se[i >> 2] = r.rangeMin),
      (se[(i + 4) >> 2] = r.rangeMax),
      (se[t >> 2] = r.precision);
  }
  function Pu(e, n, i, t) {
    var r = Jc.getShaderSource(vo.shaders[e]);
    if (r)
      if (n > 0 && t) {
        var o = Q(r, t, n);
        i && (se[i >> 2] = o);
      } else i && (se[i >> 2] = 0);
  }
  function Mu(e, n, i) {
    if (i)
      if (35716 == n) {
        var t = Jc.getShaderInfoLog(vo.shaders[e]);
        null === t && (t = "(unknown error)"), (se[i >> 2] = t.length + 1);
      } else if (35720 == n) {
        var r = Jc.getShaderSource(vo.shaders[e]),
          o = null === r || 0 == r.length ? 0 : r.length + 1;
        se[i >> 2] = o;
      } else se[i >> 2] = Jc.getShaderParameter(vo.shaders[e], n);
    else vo.recordError(1281);
  }
  function Fu(e) {
    if (vo.stringCache[e]) return vo.stringCache[e];
    var n;
    switch (e) {
      case 7936:
      case 7937:
      case 37445:
      case 37446:
        n = q(os(Jc.getParameter(e)), "i8", U);
        break;
      case 7938:
        var i = Jc.getParameter(Jc.VERSION);
        n = q(
          os(
            (i =
              Jc.canvas.GLctxObject.version >= 2
                ? "OpenGL ES 3.0 (" + i + ")"
                : "OpenGL ES 2.0 (" + i + ")")
          ),
          "i8",
          U
        );
        break;
      case 7939:
        for (
          var t = Jc.getSupportedExtensions(), r = [], o = 0;
          o < t.length;
          ++o
        )
          r.push(t[o]), r.push("GL_" + t[o]);
        n = q(os(r.join(" ")), "i8", U);
        break;
      case 35724:
        var a = Jc.getParameter(Jc.SHADING_LANGUAGE_VERSION),
          u = a.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
        null !== u &&
          (3 == u[1].length && (u[1] = u[1] + "0"),
          (a = "OpenGL ES GLSL ES " + u[1] + " (" + a + ")")),
          (n = q(os(a), "i8", U));
        break;
      default:
        return vo.recordError(1280), 0;
    }
    return (vo.stringCache[e] = n), n;
  }
  function Nu(e, n) {
    if (Jc.canvas.GLctxObject.version < 2) return vo.recordError(1282), 0;
    var i = vo.stringiCache[e];
    if (i) return n < 0 || n >= i.length ? (vo.recordError(1281), 0) : i[n];
    if (7939 === e) {
      for (
        var t = Jc.getSupportedExtensions(), r = [], o = 0;
        o < t.length;
        ++o
      )
        r.push(q(os(t[o]), "i8", U)), r.push(q(os("GL_" + t[o]), "i8", U));
      return (
        (i = vo.stringiCache[e] = r),
        n < 0 || n >= i.length ? (vo.recordError(1281), 0) : i[n]
      );
    }
    return vo.recordError(1280), 0;
  }
  function Uu(e, n, i) {
    i ? (se[i >> 2] = Jc.getTexParameter(e, n)) : vo.recordError(1281);
  }
  function Wu(e, n) {
    return (e = vo.programs[e]), (n = X(n)), Jc.getUniformBlockIndex(e, n);
  }
  function zu(e, n, i, t) {
    if (t)
      if (n > 0 && (0 == i || 0 == t)) vo.recordError(1281);
      else {
        e = vo.programs[e];
        for (var r = [], o = 0; o < n; o++) r.push(X(se[(i + 4 * o) >> 2]));
        var a = Jc.getUniformIndices(e, r);
        if (a) {
          var u = a.length;
          for (o = 0; o < u; o++) se[(t + 4 * o) >> 2] = a[o];
        }
      }
    else vo.recordError(1281);
  }
  function Vu(e, n) {
    var i = 0;
    if (-1 !== (n = X(n)).indexOf("]", n.length - 1)) {
      var t = n.lastIndexOf("["),
        r = n.slice(t + 1, -1);
      if (r.length > 0 && (i = parseInt(r)) < 0) return -1;
      n = n.slice(0, t);
    }
    var o = vo.programInfos[e];
    if (!o) return -1;
    var a = o.uniforms[n];
    return a && i < a[0] ? a[1] + i : -1;
  }
  function qu(e, n, i, t) {
    if (i) {
      var r = Jc.getUniform(vo.programs[e], vo.uniforms[n]);
      if ("number" == typeof r || "boolean" == typeof r)
        switch (t) {
          case "Integer":
            se[i >> 2] = r;
            break;
          case "Float":
            _e[i >> 2] = r;
            break;
          default:
            throw "internal emscriptenWebGLGetUniform() error, bad type: " + t;
        }
      else
        for (var o = 0; o < r.length; o++)
          switch (t) {
            case "Integer":
              se[(i + 4 * o) >> 2] = r[o];
              break;
            case "Float":
              _e[(i + 4 * o) >> 2] = r[o];
              break;
            default:
              throw (
                "internal emscriptenWebGLGetUniform() error, bad type: " + t
              );
          }
    } else vo.recordError(1281);
  }
  function Hu(e, n, i) {
    qu(e, n, i, "Integer");
  }
  function Xu(e, n, i, t) {
    if (i) {
      var r = Jc.getVertexAttrib(e, n);
      if (34975 == n) se[i >> 2] = r.name;
      else if ("number" == typeof r || "boolean" == typeof r)
        switch (t) {
          case "Integer":
            se[i >> 2] = r;
            break;
          case "Float":
            _e[i >> 2] = r;
            break;
          case "FloatToInteger":
            se[i >> 2] = Math.fround(r);
            break;
          default:
            throw (
              "internal emscriptenWebGLGetVertexAttrib() error, bad type: " + t
            );
        }
      else
        for (var o = 0; o < r.length; o++)
          switch (t) {
            case "Integer":
              se[(i + 4 * o) >> 2] = r[o];
              break;
            case "Float":
              _e[(i + 4 * o) >> 2] = r[o];
              break;
            case "FloatToInteger":
              se[(i + 4 * o) >> 2] = Math.fround(r[o]);
              break;
            default:
              throw (
                "internal emscriptenWebGLGetVertexAttrib() error, bad type: " +
                t
              );
          }
    } else vo.recordError(1281);
  }
  function Yu(e, n, i) {
    Xu(e, n, i, "FloatToInteger");
  }
  function Ju(e, n, i) {
    for (var t = vo.tempFixedLengthArray[n], r = 0; r < n; r++)
      t[r] = se[(i + 4 * r) >> 2];
    Jc.invalidateFramebuffer(e, t);
  }
  function Ku(e) {
    return Jc.isEnabled(e);
  }
  function Zu(e) {
    var n = vo.vaos[e];
    return n ? Jc.isVertexArray(n) : 0;
  }
  function Qu(e) {
    Jc.linkProgram(vo.programs[e]),
      (vo.programInfos[e] = null),
      vo.populateUniformTable(e);
  }
  function $u(e, n, i, t) {
    if (26 != t && 10 != t)
      return (
        v(
          "glMapBufferRange is only supported when access is MAP_WRITE|INVALIDATE_BUFFER"
        ),
        0
      );
    if (!nu(e))
      return vo.recordError(1280), v("GL_INVALID_ENUM in glMapBufferRange"), 0;
    var r = hb(i);
    return r
      ? ((vo.mappedBuffers[eu(e)] = {
          offset: n,
          length: i,
          mem: r,
          access: t,
        }),
        r)
      : 0;
  }
  function el(e, n) {
    3333 == e ? (vo.packAlignment = n) : 3317 == e && (vo.unpackAlignment = n),
      Jc.pixelStorei(e, n);
  }
  function nl(e, n) {
    Jc.polygonOffset(e, n);
  }
  function il(e, n, i, t) {
    vo.recordError(1280);
  }
  function tl(e, n, i) {
    vo.recordError(1280);
  }
  function rl(e) {
    Jc.readBuffer(e);
  }
  function ol(e, n, i, t) {
    var r,
      o,
      a = e * i,
      u = ((r = a), (o = t), Math.floor((r + o - 1) / o) * o);
    return n <= 0 ? 0 : (n - 1) * u + a;
  }
  function al(e, n, i, t, r, o) {
    var a, u;
    switch (n) {
      case 6406:
      case 6409:
      case 6402:
      case 6403:
      case 36244:
        u = 1;
        break;
      case 6410:
      case 33319:
      case 33320:
        u = 2;
        break;
      case 6407:
      case 35904:
      case 36248:
        u = 3;
        break;
      case 6408:
      case 35906:
      case 36249:
        u = 4;
        break;
      default:
        return vo.recordError(1280), null;
    }
    switch (e) {
      case 5121:
      case 5120:
        a = 1 * u;
        break;
      case 5123:
      case 36193:
      case 5131:
      case 5122:
        a = 2 * u;
        break;
      case 5125:
      case 5126:
      case 5124:
        a = 4 * u;
        break;
      case 34042:
      case 35902:
      case 33640:
      case 35899:
      case 34042:
        a = 4;
        break;
      case 33635:
      case 32819:
      case 32820:
        a = 2;
        break;
      default:
        return vo.recordError(1280), null;
    }
    var l = ol(i, t, a, vo.unpackAlignment);
    switch (e) {
      case 5120:
        return ae.subarray(r, r + l);
      case 5121:
        return ue.subarray(r, r + l);
      case 5122:
        return le.subarray(r >> 1, (r + l) >> 1);
      case 5124:
        return se.subarray(r >> 2, (r + l) >> 2);
      case 5126:
        return _e.subarray(r >> 2, (r + l) >> 2);
      case 5125:
      case 34042:
      case 35902:
      case 33640:
      case 35899:
      case 34042:
        return fe.subarray(r >> 2, (r + l) >> 2);
      case 5123:
      case 33635:
      case 32819:
      case 32820:
      case 36193:
      case 5131:
        return ce.subarray(r >> 1, (r + l) >> 1);
      default:
        return vo.recordError(1280), null;
    }
  }
  function ul(e) {
    switch (e) {
      case 5120:
        return ae;
      case 5121:
        return ue;
      case 5122:
        return le;
      case 5123:
      case 33635:
      case 32819:
      case 32820:
      case 36193:
      case 5131:
        return ce;
      case 5124:
        return se;
      case 5125:
      case 34042:
      case 35902:
      case 33640:
      case 35899:
      case 34042:
        return fe;
      case 5126:
        return _e;
      default:
        return null;
    }
  }
  function ll(e) {
    switch (e) {
      case 5120:
      case 5121:
      default:
        return 0;
      case 5122:
      case 5123:
      case 33635:
      case 32819:
      case 32820:
      case 36193:
      case 5131:
        return 1;
      case 5124:
      case 5126:
      case 5125:
      case 34042:
      case 35902:
      case 33640:
      case 35899:
      case 34042:
        return 2;
    }
  }
  function cl(e, n, i, t, r, o, a) {
    if (vo.currentContext.supportsWebGL2EntryPoints)
      Jc.currentPixelPackBufferBinding
        ? Jc.readPixels(e, n, i, t, r, o, a)
        : Jc.readPixels(e, n, i, t, r, o, ul(o), a >> ll(o));
    else {
      var u = al(o, r, i, t, a);
      u ? Jc.readPixels(e, n, i, t, r, o, u) : vo.recordError(1280);
    }
  }
  function sl(e, n, i, t) {
    Jc.renderbufferStorage(e, n, i, t);
  }
  function fl(e, n, i, t, r) {
    Jc.renderbufferStorageMultisample(e, n, i, t, r);
  }
  function _l(e, n, i) {
    Jc.samplerParameteri(e ? vo.samplers[e] : null, n, i);
  }
  function pl(e, n, i, t) {
    Jc.scissor(e, n, i, t);
  }
  function dl(e, n, i, t) {
    var r = vo.getSource(e, n, i, t);
    Jc.shaderSource(vo.shaders[e], r);
  }
  function ml(e, n, i, t) {
    Jc.stencilFuncSeparate(e, n, i, t);
  }
  function yl(e) {
    Jc.stencilMask(e);
  }
  function vl(e, n, i, t) {
    Jc.stencilOpSeparate(e, n, i, t);
  }
  function hl(e, n, i, t, r, o, a, u, l) {
    if (vo.currentContext.supportsWebGL2EntryPoints)
      Jc.currentPixelUnpackBufferBinding
        ? Jc.texImage2D(e, n, i, t, r, o, a, u, l)
        : 0 != l
        ? Jc.texImage2D(e, n, i, t, r, o, a, u, ul(u), l >> ll(u))
        : Jc.texImage2D(e, n, i, t, r, o, a, u, null);
    else {
      var c = null;
      l && (c = al(u, a, t, r, l)), Jc.texImage2D(e, n, i, t, r, o, a, u, c);
    }
  }
  function gl(e, n, i, t, r, o, a, u, l, c) {
    Jc.currentPixelUnpackBufferBinding
      ? Jc.texImage3D(e, n, i, t, r, o, a, u, l, c)
      : 0 != c
      ? Jc.texImage3D(e, n, i, t, r, o, a, u, l, ul(l), c >> ll(l))
      : Jc.texImage3D(e, n, i, t, r, o, a, u, l, null);
  }
  function bl(e, n, i) {
    Jc.texParameterf(e, n, i);
  }
  function wl(e, n, i) {
    Jc.texParameteri(e, n, i);
  }
  function El(e, n, i) {
    var t = se[i >> 2];
    Jc.texParameteri(e, n, t);
  }
  function Cl(e, n, i, t, r) {
    Jc.texStorage2D(e, n, i, t, r);
  }
  function Ll(e, n, i, t, r, o) {
    Jc.texStorage3D(e, n, i, t, r, o);
  }
  function kl(e, n, i, t, r, o, a, u, l) {
    if (vo.currentContext.supportsWebGL2EntryPoints)
      Jc.currentPixelUnpackBufferBinding
        ? Jc.texSubImage2D(e, n, i, t, r, o, a, u, l)
        : 0 != l
        ? Jc.texSubImage2D(e, n, i, t, r, o, a, u, ul(u), l >> ll(u))
        : Jc.texSubImage2D(e, n, i, t, r, o, a, u, null);
    else {
      var c = null;
      l && (c = al(u, a, r, o, l)), Jc.texSubImage2D(e, n, i, t, r, o, a, u, c);
    }
  }
  function Al(e, n, i, t, r, o, a, u, l, c, s) {
    Jc.currentPixelUnpackBufferBinding
      ? Jc.texSubImage3D(e, n, i, t, r, o, a, u, l, c, s)
      : 0 != s
      ? Jc.texSubImage3D(e, n, i, t, r, o, a, u, l, c, ul(c), s >> ll(c))
      : Jc.texSubImage3D(e, n, i, t, r, o, a, u, l, c, null);
  }
  function Il(e, n, i, t) {
    e = vo.programs[e];
    for (var r = [], o = 0; o < n; o++) r.push(X(se[(i + 4 * o) >> 2]));
    Jc.transformFeedbackVaryings(e, r, t);
  }
  function Sl(e, n, i) {
    if (vo.currentContext.supportsWebGL2EntryPoints)
      Jc.uniform1fv(vo.uniforms[e], _e, i >> 2, n);
    else {
      var t;
      if (n <= vo.MINI_TEMP_BUFFER_SIZE) {
        t = vo.miniTempBufferViews[n - 1];
        for (var r = 0; r < n; ++r) t[r] = _e[(i + 4 * r) >> 2];
      } else t = _e.subarray(i >> 2, (i + 4 * n) >> 2);
      Jc.uniform1fv(vo.uniforms[e], t);
    }
  }
  function Ol(e, n) {
    Jc.uniform1i(vo.uniforms[e], n);
  }
  function Tl(e, n, i) {
    vo.currentContext.supportsWebGL2EntryPoints
      ? Jc.uniform1iv(vo.uniforms[e], se, i >> 2, n)
      : Jc.uniform1iv(vo.uniforms[e], se.subarray(i >> 2, (i + 4 * n) >> 2));
  }
  function jl(e, n, i) {
    vo.currentContext.supportsWebGL2EntryPoints
      ? Jc.uniform1uiv(vo.uniforms[e], fe, i >> 2, n)
      : Jc.uniform1uiv(vo.uniforms[e], fe.subarray(i >> 2, (i + 4 * n) >> 2));
  }
  function Bl(e, n, i) {
    if (vo.currentContext.supportsWebGL2EntryPoints)
      Jc.uniform2fv(vo.uniforms[e], _e, i >> 2, 2 * n);
    else {
      var t;
      if (2 * n <= vo.MINI_TEMP_BUFFER_SIZE) {
        t = vo.miniTempBufferViews[2 * n - 1];
        for (var r = 0; r < 2 * n; r += 2)
          (t[r] = _e[(i + 4 * r) >> 2]),
            (t[r + 1] = _e[(i + (4 * r + 4)) >> 2]);
      } else t = _e.subarray(i >> 2, (i + 8 * n) >> 2);
      Jc.uniform2fv(vo.uniforms[e], t);
    }
  }
  function Gl(e, n, i) {
    vo.currentContext.supportsWebGL2EntryPoints
      ? Jc.uniform2iv(vo.uniforms[e], se, i >> 2, 2 * n)
      : Jc.uniform2iv(vo.uniforms[e], se.subarray(i >> 2, (i + 8 * n) >> 2));
  }
  function Rl(e, n, i) {
    vo.currentContext.supportsWebGL2EntryPoints
      ? Jc.uniform2uiv(vo.uniforms[e], fe, i >> 2, 2 * n)
      : Jc.uniform2uiv(vo.uniforms[e], fe.subarray(i >> 2, (i + 8 * n) >> 2));
  }
  function xl(e, n, i) {
    if (vo.currentContext.supportsWebGL2EntryPoints)
      Jc.uniform3fv(vo.uniforms[e], _e, i >> 2, 3 * n);
    else {
      var t;
      if (3 * n <= vo.MINI_TEMP_BUFFER_SIZE) {
        t = vo.miniTempBufferViews[3 * n - 1];
        for (var r = 0; r < 3 * n; r += 3)
          (t[r] = _e[(i + 4 * r) >> 2]),
            (t[r + 1] = _e[(i + (4 * r + 4)) >> 2]),
            (t[r + 2] = _e[(i + (4 * r + 8)) >> 2]);
      } else t = _e.subarray(i >> 2, (i + 12 * n) >> 2);
      Jc.uniform3fv(vo.uniforms[e], t);
    }
  }
  function Dl(e, n, i) {
    vo.currentContext.supportsWebGL2EntryPoints
      ? Jc.uniform3iv(vo.uniforms[e], se, i >> 2, 3 * n)
      : Jc.uniform3iv(vo.uniforms[e], se.subarray(i >> 2, (i + 12 * n) >> 2));
  }
  function Pl(e, n, i) {
    vo.currentContext.supportsWebGL2EntryPoints
      ? Jc.uniform3uiv(vo.uniforms[e], fe, i >> 2, 3 * n)
      : Jc.uniform3uiv(vo.uniforms[e], fe.subarray(i >> 2, (i + 12 * n) >> 2));
  }
  function Ml(e, n, i) {
    if (vo.currentContext.supportsWebGL2EntryPoints)
      Jc.uniform4fv(vo.uniforms[e], _e, i >> 2, 4 * n);
    else {
      var t;
      if (4 * n <= vo.MINI_TEMP_BUFFER_SIZE) {
        t = vo.miniTempBufferViews[4 * n - 1];
        for (var r = 0; r < 4 * n; r += 4)
          (t[r] = _e[(i + 4 * r) >> 2]),
            (t[r + 1] = _e[(i + (4 * r + 4)) >> 2]),
            (t[r + 2] = _e[(i + (4 * r + 8)) >> 2]),
            (t[r + 3] = _e[(i + (4 * r + 12)) >> 2]);
      } else t = _e.subarray(i >> 2, (i + 16 * n) >> 2);
      Jc.uniform4fv(vo.uniforms[e], t);
    }
  }
  function Fl(e, n, i) {
    vo.currentContext.supportsWebGL2EntryPoints
      ? Jc.uniform4iv(vo.uniforms[e], se, i >> 2, 4 * n)
      : Jc.uniform4iv(vo.uniforms[e], se.subarray(i >> 2, (i + 16 * n) >> 2));
  }
  function Nl(e, n, i) {
    vo.currentContext.supportsWebGL2EntryPoints
      ? Jc.uniform4uiv(vo.uniforms[e], fe, i >> 2, 4 * n)
      : Jc.uniform4uiv(vo.uniforms[e], fe.subarray(i >> 2, (i + 16 * n) >> 2));
  }
  function Ul(e, n, i) {
    (e = vo.programs[e]), Jc.uniformBlockBinding(e, n, i);
  }
  function Wl(e, n, i, t) {
    if (vo.currentContext.supportsWebGL2EntryPoints)
      Jc.uniformMatrix3fv(vo.uniforms[e], !!i, _e, t >> 2, 9 * n);
    else {
      var r;
      if (9 * n <= vo.MINI_TEMP_BUFFER_SIZE) {
        r = vo.miniTempBufferViews[9 * n - 1];
        for (var o = 0; o < 9 * n; o += 9)
          (r[o] = _e[(t + 4 * o) >> 2]),
            (r[o + 1] = _e[(t + (4 * o + 4)) >> 2]),
            (r[o + 2] = _e[(t + (4 * o + 8)) >> 2]),
            (r[o + 3] = _e[(t + (4 * o + 12)) >> 2]),
            (r[o + 4] = _e[(t + (4 * o + 16)) >> 2]),
            (r[o + 5] = _e[(t + (4 * o + 20)) >> 2]),
            (r[o + 6] = _e[(t + (4 * o + 24)) >> 2]),
            (r[o + 7] = _e[(t + (4 * o + 28)) >> 2]),
            (r[o + 8] = _e[(t + (4 * o + 32)) >> 2]);
      } else r = _e.subarray(t >> 2, (t + 36 * n) >> 2);
      Jc.uniformMatrix3fv(vo.uniforms[e], !!i, r);
    }
  }
  function zl(e, n, i, t) {
    if (vo.currentContext.supportsWebGL2EntryPoints)
      Jc.uniformMatrix4fv(vo.uniforms[e], !!i, _e, t >> 2, 16 * n);
    else {
      var r;
      if (16 * n <= vo.MINI_TEMP_BUFFER_SIZE) {
        r = vo.miniTempBufferViews[16 * n - 1];
        for (var o = 0; o < 16 * n; o += 16)
          (r[o] = _e[(t + 4 * o) >> 2]),
            (r[o + 1] = _e[(t + (4 * o + 4)) >> 2]),
            (r[o + 2] = _e[(t + (4 * o + 8)) >> 2]),
            (r[o + 3] = _e[(t + (4 * o + 12)) >> 2]),
            (r[o + 4] = _e[(t + (4 * o + 16)) >> 2]),
            (r[o + 5] = _e[(t + (4 * o + 20)) >> 2]),
            (r[o + 6] = _e[(t + (4 * o + 24)) >> 2]),
            (r[o + 7] = _e[(t + (4 * o + 28)) >> 2]),
            (r[o + 8] = _e[(t + (4 * o + 32)) >> 2]),
            (r[o + 9] = _e[(t + (4 * o + 36)) >> 2]),
            (r[o + 10] = _e[(t + (4 * o + 40)) >> 2]),
            (r[o + 11] = _e[(t + (4 * o + 44)) >> 2]),
            (r[o + 12] = _e[(t + (4 * o + 48)) >> 2]),
            (r[o + 13] = _e[(t + (4 * o + 52)) >> 2]),
            (r[o + 14] = _e[(t + (4 * o + 56)) >> 2]),
            (r[o + 15] = _e[(t + (4 * o + 60)) >> 2]);
      } else r = _e.subarray(t >> 2, (t + 64 * n) >> 2);
      Jc.uniformMatrix4fv(vo.uniforms[e], !!i, r);
    }
  }
  function Vl(n) {
    if (!nu(n))
      return vo.recordError(1280), v("GL_INVALID_ENUM in glUnmapBuffer"), 0;
    var i = eu(n),
      t = vo.mappedBuffers[i];
    return t
      ? ((vo.mappedBuffers[i] = null),
        16 & t.access ||
          (vo.currentContext.supportsWebGL2EntryPoints
            ? Jc.bufferSubData(n, t.offset, ue, t.mem, t.length)
            : Jc.bufferSubData(
                n,
                t.offset,
                ue.subarray(t.mem, t.mem + t.length)
              )),
        db(t.mem),
        1)
      : (vo.recordError(1282),
        e.printError("buffer was never mapped in glUnmapBuffer"),
        0);
  }
  function ql(e) {
    Jc.useProgram(e ? vo.programs[e] : null);
  }
  function Hl(e) {
    Jc.validateProgram(vo.programs[e]);
  }
  function Xl(e, n, i, t, r) {
    Jc.vertexAttrib4f(e, n, i, t, r);
  }
  function Yl(e, n) {
    Jc.vertexAttrib4f(
      e,
      _e[n >> 2],
      _e[(n + 4) >> 2],
      _e[(n + 8) >> 2],
      _e[(n + 12) >> 2]
    );
  }
  function Jl(e, n, i, t, r) {
    var o = vo.currentContext.clientBuffers[e];
    if (!vo.currArrayBuffer)
      return (
        (o.size = n),
        (o.type = i),
        (o.normalized = !1),
        (o.stride = t),
        (o.ptr = r),
        void (o.clientside = !0)
      );
    (o.clientside = !1), Jc.vertexAttribIPointer(e, n, i, t, r);
  }
  function Kl(e, n, i, t, r, o) {
    Jc.vertexAttribPointer(e, n, i, !!t, r, o);
  }
  function Zl(e, n, i, t) {
    Jc.viewport(e, n, i, t);
  }
  var Ql = (me += 16);
  me += 48;
  var $l = q(os("GMT"), "i8", z);
  function ec(e, n) {
    var i = new Date(1e3 * se[e >> 2]);
    (se[n >> 2] = i.getUTCSeconds()),
      (se[(n + 4) >> 2] = i.getUTCMinutes()),
      (se[(n + 8) >> 2] = i.getUTCHours()),
      (se[(n + 12) >> 2] = i.getUTCDate()),
      (se[(n + 16) >> 2] = i.getUTCMonth()),
      (se[(n + 20) >> 2] = i.getUTCFullYear() - 1900),
      (se[(n + 24) >> 2] = i.getUTCDay()),
      (se[(n + 36) >> 2] = 0),
      (se[(n + 32) >> 2] = 0);
    var t = Date.UTC(i.getUTCFullYear(), 0, 1, 0, 0, 0, 0),
      r = ((i.getTime() - t) / 864e5) | 0;
    return (se[(n + 28) >> 2] = r), (se[(n + 40) >> 2] = $l), n;
  }
  function nc(e) {
    return ec(e, Ql);
  }
  function ic(e) {
    var n = dt(X(e));
    return null === n ? -1 : n;
  }
  var tc = $e,
    rc = $e;
  function oc(e, n) {
    return n < 0 || (0 === n && 1 / n < 0) ? -Qe(e) : Qe(e);
  }
  function ac(e) {
    return 0 | ((e |= 0) ? (31 - (0 | rn(e ^ (e - 1)))) | 0 : 32);
  }
  function uc(e) {
    return e;
  }
  function lc(e) {
    return Math.pow(2, e);
  }
  var cc = Qe,
    sc = Qe,
    fc = en,
    _c = en;
  function pc(e) {
    return Math.log(e) / Math.LN10;
  }
  function dc() {
    return pc.apply(null, arguments);
  }
  function mc(e) {
    return Math.log(e) / Math.LN2;
  }
  var yc = nn;
  function vc() {
    t("trap!");
  }
  var hc = on;
  function gc() {
    if (!gc.called) {
      (gc.called = !0), (se[fb() >> 2] = 60 * new Date().getTimezoneOffset());
      var e = new Date().getFullYear(),
        n = new Date(e, 0, 1),
        i = new Date(e, 6, 1);
      se[cb() >> 2] = Number(n.getTimezoneOffset() != i.getTimezoneOffset());
      var t = u(n),
        r = u(i),
        o = q(os(t), "i8", U),
        a = q(os(r), "i8", U);
      i.getTimezoneOffset() < n.getTimezoneOffset()
        ? ((se[_b() >> 2] = o), (se[(_b() + 4) >> 2] = a))
        : ((se[_b() >> 2] = a), (se[(_b() + 4) >> 2] = o));
    }
    function u(e) {
      var n = e.toTimeString().match(/\(([A-Za-z ]+)\)$/);
      return n ? n[1] : "GMT";
    }
  }
  function bc(e, n) {
    gc();
    var i = new Date(1e3 * se[e >> 2]);
    (se[n >> 2] = i.getSeconds()),
      (se[(n + 4) >> 2] = i.getMinutes()),
      (se[(n + 8) >> 2] = i.getHours()),
      (se[(n + 12) >> 2] = i.getDate()),
      (se[(n + 16) >> 2] = i.getMonth()),
      (se[(n + 20) >> 2] = i.getFullYear() - 1900),
      (se[(n + 24) >> 2] = i.getDay());
    var t = new Date(i.getFullYear(), 0, 1),
      r = ((i.getTime() - t.getTime()) / 864e5) | 0;
    (se[(n + 28) >> 2] = r), (se[(n + 36) >> 2] = -60 * i.getTimezoneOffset());
    var o = new Date(i.getFullYear(), 6, 1).getTimezoneOffset(),
      a = t.getTimezoneOffset(),
      u = 0 | (o != a && i.getTimezoneOffset() == Math.min(a, o));
    se[(n + 32) >> 2] = u;
    var l = se[(_b() + (u ? 4 : 0)) >> 2];
    return (se[(n + 40) >> 2] = l), n;
  }
  function wc(e) {
    return bc(e, Ql);
  }
  function Ec(e, n, i) {
    return ue.set(ue.subarray(n, n + i), e), e;
  }
  function Cc(e) {
    gc();
    var n = new Date(
        se[(e + 20) >> 2] + 1900,
        se[(e + 16) >> 2],
        se[(e + 12) >> 2],
        se[(e + 8) >> 2],
        se[(e + 4) >> 2],
        se[e >> 2],
        0
      ),
      i = se[(e + 32) >> 2],
      t = n.getTimezoneOffset(),
      r = new Date(n.getFullYear(), 0, 1),
      o = new Date(n.getFullYear(), 6, 1).getTimezoneOffset(),
      a = r.getTimezoneOffset(),
      u = Math.min(a, o);
    if (i < 0) se[(e + 32) >> 2] = Number(o != a && u == t);
    else if (i > 0 != (u == t)) {
      var l = Math.max(a, o),
        c = i > 0 ? u : l;
      n.setTime(n.getTime() + 6e4 * (c - t));
    }
    se[(e + 24) >> 2] = n.getDay();
    var s = ((n.getTime() - r.getTime()) / 864e5) | 0;
    return (se[(e + 28) >> 2] = s), (n.getTime() / 1e3) | 0;
  }
  function Lc(e) {
    var n = e / 1e3;
    if ((l || c) && self.performance && self.performance.now)
      for (var i = self.performance.now(); self.performance.now() - i < n; );
    else for (i = Date.now(); Date.now() - i < n; );
    return 0;
  }
  function kc(e, n) {
    var i = se[e >> 2],
      t = se[(e + 4) >> 2];
    return (
      0 !== n && ((se[n >> 2] = 0), (se[(n + 4) >> 2] = 0)),
      Lc(1e6 * i + t / 1e3)
    );
  }
  function Ac() {
    return 0;
  }
  function Ic() {
    return 0;
  }
  function Sc() {
    return 0;
  }
  function Oc() {
    return 0;
  }
  var Tc = {};
  function jc(e) {
    return Tc[e] || 0;
  }
  var Bc = 1;
  function Gc(e, n) {
    return 0 == e ? et.EINVAL : ((se[e >> 2] = Bc), (Tc[Bc] = 0), Bc++, 0);
  }
  function Rc(e) {
    return e in Tc ? (delete Tc[e], 0) : et.EINVAL;
  }
  function xc() {}
  function Dc() {}
  function Pc() {}
  function Mc() {}
  function Fc() {}
  function Nc() {}
  function Uc(n, i) {
    Uc.seen || (Uc.seen = {}),
      n in Uc.seen || (e.dynCall_v(i), (Uc.seen[n] = 1));
  }
  function Wc(e, n) {
    return e in Tc ? ((Tc[e] = n), 0) : et.EINVAL;
  }
  function zc() {
    return 0;
  }
  function Vc(e, n, i) {
    if (0 === e) return nt(et.EINVAL), -1;
    var t = X(e),
      r = X(n);
    return "" === t || -1 !== t.indexOf("=")
      ? (nt(et.EINVAL), -1)
      : ((Di.hasOwnProperty(t) && !i) || ((Di[t] = r), Pi(sb())), 0);
  }
  function qc(e, n, i) {
    return 0;
  }
  function Hc(e) {
    return (se[e >> 2] = 0), 0;
  }
  function Xc(e) {
    return e % 4 == 0 && (e % 100 != 0 || e % 400 == 0);
  }
  function Yc(e, n) {
    for (var i = 0, t = 0; t <= n; i += e[t++]);
    return i;
  }
  var Jc,
    Kc = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    Zc = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function Qc(e, n) {
    for (var i = new Date(e.getTime()); n > 0; ) {
      var t = Xc(i.getFullYear()),
        r = i.getMonth(),
        o = (t ? Kc : Zc)[r];
      if (!(n > o - i.getDate())) return i.setDate(i.getDate() + n), i;
      (n -= o - i.getDate() + 1),
        i.setDate(1),
        r < 11
          ? i.setMonth(r + 1)
          : (i.setMonth(0), i.setFullYear(i.getFullYear() + 1));
    }
    return i;
  }
  function $c(e, n, i, t) {
    var r = se[(t + 40) >> 2],
      o = {
        tm_sec: se[t >> 2],
        tm_min: se[(t + 4) >> 2],
        tm_hour: se[(t + 8) >> 2],
        tm_mday: se[(t + 12) >> 2],
        tm_mon: se[(t + 16) >> 2],
        tm_year: se[(t + 20) >> 2],
        tm_wday: se[(t + 24) >> 2],
        tm_yday: se[(t + 28) >> 2],
        tm_isdst: se[(t + 32) >> 2],
        tm_gmtoff: se[(t + 36) >> 2],
        tm_zone: r ? X(r) : "",
      },
      a = X(i),
      u = {
        "%c": "%a %b %d %H:%M:%S %Y",
        "%D": "%m/%d/%y",
        "%F": "%Y-%m-%d",
        "%h": "%b",
        "%r": "%I:%M:%S %p",
        "%R": "%H:%M",
        "%T": "%H:%M:%S",
        "%x": "%m/%d/%y",
        "%X": "%H:%M:%S",
      };
    for (var l in u) a = a.replace(new RegExp(l, "g"), u[l]);
    var c = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      s = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
    function f(e, n, i) {
      for (
        var t = "number" == typeof e ? e.toString() : e || "";
        t.length < n;

      )
        t = i[0] + t;
      return t;
    }
    function _(e, n) {
      return f(e, n, "0");
    }
    function p(e, n) {
      function i(e) {
        return e < 0 ? -1 : e > 0 ? 1 : 0;
      }
      var t;
      return (
        0 === (t = i(e.getFullYear() - n.getFullYear())) &&
          0 === (t = i(e.getMonth() - n.getMonth())) &&
          (t = i(e.getDate() - n.getDate())),
        t
      );
    }
    function d(e) {
      switch (e.getDay()) {
        case 0:
          return new Date(e.getFullYear() - 1, 11, 29);
        case 1:
          return e;
        case 2:
          return new Date(e.getFullYear(), 0, 3);
        case 3:
          return new Date(e.getFullYear(), 0, 2);
        case 4:
          return new Date(e.getFullYear(), 0, 1);
        case 5:
          return new Date(e.getFullYear() - 1, 11, 31);
        case 6:
          return new Date(e.getFullYear() - 1, 11, 30);
      }
    }
    function m(e) {
      var n = Qc(new Date(e.tm_year + 1900, 0, 1), e.tm_yday),
        i = new Date(n.getFullYear(), 0, 4),
        t = new Date(n.getFullYear() + 1, 0, 4),
        r = d(i),
        o = d(t);
      return p(r, n) <= 0
        ? p(o, n) <= 0
          ? n.getFullYear() + 1
          : n.getFullYear()
        : n.getFullYear() - 1;
    }
    var y = {
      "%a": function (e) {
        return c[e.tm_wday].substring(0, 3);
      },
      "%A": function (e) {
        return c[e.tm_wday];
      },
      "%b": function (e) {
        return s[e.tm_mon].substring(0, 3);
      },
      "%B": function (e) {
        return s[e.tm_mon];
      },
      "%C": function (e) {
        return _(((e.tm_year + 1900) / 100) | 0, 2);
      },
      "%d": function (e) {
        return _(e.tm_mday, 2);
      },
      "%e": function (e) {
        return f(e.tm_mday, 2, " ");
      },
      "%g": function (e) {
        return m(e).toString().substring(2);
      },
      "%G": function (e) {
        return m(e);
      },
      "%H": function (e) {
        return _(e.tm_hour, 2);
      },
      "%I": function (e) {
        var n = e.tm_hour;
        return 0 == n ? (n = 12) : n > 12 && (n -= 12), _(n, 2);
      },
      "%j": function (e) {
        return _(
          e.tm_mday + Yc(Xc(e.tm_year + 1900) ? Kc : Zc, e.tm_mon - 1),
          3
        );
      },
      "%m": function (e) {
        return _(e.tm_mon + 1, 2);
      },
      "%M": function (e) {
        return _(e.tm_min, 2);
      },
      "%n": function () {
        return "\n";
      },
      "%p": function (e) {
        return e.tm_hour >= 0 && e.tm_hour < 12 ? "AM" : "PM";
      },
      "%S": function (e) {
        return _(e.tm_sec, 2);
      },
      "%t": function () {
        return "\t";
      },
      "%u": function (e) {
        return (
          new Date(
            e.tm_year + 1900,
            e.tm_mon + 1,
            e.tm_mday,
            0,
            0,
            0,
            0
          ).getDay() || 7
        );
      },
      "%U": function (e) {
        var n = new Date(e.tm_year + 1900, 0, 1),
          i = 0 === n.getDay() ? n : Qc(n, 7 - n.getDay()),
          t = new Date(e.tm_year + 1900, e.tm_mon, e.tm_mday);
        if (p(i, t) < 0) {
          var r = Yc(Xc(t.getFullYear()) ? Kc : Zc, t.getMonth() - 1) - 31,
            o = 31 - i.getDate() + r + t.getDate();
          return _(Math.ceil(o / 7), 2);
        }
        return 0 === p(i, n) ? "01" : "00";
      },
      "%V": function (e) {
        var n,
          i = new Date(e.tm_year + 1900, 0, 4),
          t = new Date(e.tm_year + 1901, 0, 4),
          r = d(i),
          o = d(t),
          a = Qc(new Date(e.tm_year + 1900, 0, 1), e.tm_yday);
        return p(a, r) < 0
          ? "53"
          : p(o, a) <= 0
          ? "01"
          : ((n =
              r.getFullYear() < e.tm_year + 1900
                ? e.tm_yday + 32 - r.getDate()
                : e.tm_yday + 1 - r.getDate()),
            _(Math.ceil(n / 7), 2));
      },
      "%w": function (e) {
        return new Date(
          e.tm_year + 1900,
          e.tm_mon + 1,
          e.tm_mday,
          0,
          0,
          0,
          0
        ).getDay();
      },
      "%W": function (e) {
        var n = new Date(e.tm_year, 0, 1),
          i =
            1 === n.getDay()
              ? n
              : Qc(n, 0 === n.getDay() ? 1 : 7 - n.getDay() + 1),
          t = new Date(e.tm_year + 1900, e.tm_mon, e.tm_mday);
        if (p(i, t) < 0) {
          var r = Yc(Xc(t.getFullYear()) ? Kc : Zc, t.getMonth() - 1) - 31,
            o = 31 - i.getDate() + r + t.getDate();
          return _(Math.ceil(o / 7), 2);
        }
        return 0 === p(i, n) ? "01" : "00";
      },
      "%y": function (e) {
        return (e.tm_year + 1900).toString().substring(2);
      },
      "%Y": function (e) {
        return e.tm_year + 1900;
      },
      "%z": function (e) {
        var n = e.tm_gmtoff,
          i = n >= 0;
        return (
          (n = ((n = Math.abs(n) / 60) / 60) * 100 + (n % 60)),
          (i ? "+" : "-") + String("0000" + n).slice(-4)
        );
      },
      "%Z": function (e) {
        return e.tm_zone;
      },
      "%%": function () {
        return "%";
      },
    };
    for (var l in y)
      a.indexOf(l) >= 0 && (a = a.replace(new RegExp(l, "g"), y[l](o)));
    var v = os(a, !1);
    return v.length > n ? 0 : (Ye(v, e), v.length - 1);
  }
  function es(e) {
    switch (e) {
      case 30:
        return Ee;
      case 85:
        return 2147418112 / Ee;
      case 132:
      case 133:
      case 12:
      case 137:
      case 138:
      case 15:
      case 235:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
      case 149:
      case 13:
      case 10:
      case 236:
      case 153:
      case 9:
      case 21:
      case 22:
      case 159:
      case 154:
      case 14:
      case 77:
      case 78:
      case 139:
      case 80:
      case 81:
      case 82:
      case 68:
      case 67:
      case 164:
      case 11:
      case 29:
      case 47:
      case 48:
      case 95:
      case 52:
      case 51:
      case 46:
        return 200809;
      case 79:
        return 0;
      case 27:
      case 246:
      case 127:
      case 128:
      case 23:
      case 24:
      case 160:
      case 161:
      case 181:
      case 182:
      case 242:
      case 183:
      case 184:
      case 243:
      case 244:
      case 245:
      case 165:
      case 178:
      case 179:
      case 49:
      case 50:
      case 168:
      case 169:
      case 175:
      case 170:
      case 171:
      case 172:
      case 97:
      case 76:
      case 32:
      case 173:
      case 35:
        return -1;
      case 176:
      case 177:
      case 7:
      case 155:
      case 8:
      case 157:
      case 125:
      case 126:
      case 92:
      case 93:
      case 129:
      case 130:
      case 131:
      case 94:
      case 91:
        return 1;
      case 74:
      case 60:
      case 69:
      case 70:
      case 4:
        return 1024;
      case 31:
      case 42:
      case 72:
        return 32;
      case 87:
      case 26:
      case 33:
        return 2147483647;
      case 34:
      case 1:
        return 47839;
      case 38:
      case 36:
        return 99;
      case 43:
      case 37:
        return 2048;
      case 0:
        return 2097152;
      case 3:
        return 65536;
      case 28:
        return 32768;
      case 44:
        return 32767;
      case 75:
        return 16384;
      case 39:
        return 1e3;
      case 89:
        return 700;
      case 71:
        return 256;
      case 40:
        return 255;
      case 2:
        return 100;
      case 180:
        return 64;
      case 25:
        return 20;
      case 5:
        return 16;
      case 6:
        return 6;
      case 73:
        return 4;
      case 84:
        return (
          ("object" == typeof navigator && navigator.hardwareConcurrency) || 1
        );
    }
    return nt(et.EINVAL), -1;
  }
  function ns(e) {
    var n = (Date.now() / 1e3) | 0;
    return e && (se[e >> 2] = n), n;
  }
  function is(e) {
    return 0 === e || "" === (e = X(e)) || -1 !== e.indexOf("=")
      ? (nt(et.EINVAL), -1)
      : (Di.hasOwnProperty(e) && (delete Di[e], Pi(sb())), 0);
  }
  function ts(e, n) {
    var i;
    if (n) {
      (i = se[(n + 4) >> 2]), (i *= 1e3);
    } else i = Date.now();
    e = X(e);
    try {
      return st.utime(e, i, i), 0;
    } catch (e) {
      return st.handleFSError(e), -1;
    }
  }
  if (
    (st.staticInit(),
    De.unshift(function () {
      e.noFSInit || st.init.initialized || st.init();
    }),
    Pe.push(function () {
      st.ignorePermissions = !1;
    }),
    Me.push(function () {
      st.quit();
    }),
    (e.FS_createPath = st.createPath),
    (e.FS_createDataFile = st.createDataFile),
    De.unshift(function () {
      ot.init();
    }),
    Me.push(function () {
      ot.shutdown();
    }),
    s)
  ) {
    kn = require("fs");
    var rs = require("path");
    lt.staticInit();
  }
  function os(e, n, i) {
    var t = i > 0 ? i : $(e) + 1,
      r = new Array(t),
      o = Z(e, r, 0, r.length);
    return n && (r.length = o), r;
  }
  function as(n, i, t, r) {
    var o = Ib();
    try {
      return e.dynCall_dddi(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function us(n, i, t) {
    var r = Ib();
    try {
      return e.dynCall_ddi(n, i, t);
    } catch (n) {
      if ((Ab(r), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function ls(n, i, t) {
    var r = Ib();
    try {
      return e.dynCall_dfi(n, i, t);
    } catch (n) {
      if ((Ab(r), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function cs(n, i) {
    var t = Ib();
    try {
      return e.dynCall_di(n, i);
    } catch (n) {
      if ((Ab(t), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function ss(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_diddi(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function fs(n, i, t, r) {
    var o = Ib();
    try {
      return e.dynCall_didi(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function _s(n, i, t) {
    var r = Ib();
    try {
      return e.dynCall_dii(n, i, t);
    } catch (n) {
      if ((Ab(r), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function ps(n, i, t, r) {
    var o = Ib();
    try {
      return e.dynCall_diii(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function ds(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_diiii(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function ms(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_diji(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function ys(n, i, t, r) {
    var o = Ib();
    try {
      return e.dynCall_dji(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function vs(n) {
    var i = Ib();
    try {
      return e.dynCall_f(n);
    } catch (n) {
      if ((Ab(i), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function hs(n, i, t) {
    var r = Ib();
    try {
      return e.dynCall_fdi(n, i, t);
    } catch (n) {
      if ((Ab(r), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function gs(n, i) {
    var t = Ib();
    try {
      return e.dynCall_ff(n, i);
    } catch (n) {
      if ((Ab(t), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function bs(n, i, t) {
    var r = Ib();
    try {
      return e.dynCall_fff(n, i, t);
    } catch (n) {
      if ((Ab(r), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function ws(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      return e.dynCall_ffffffi(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Es(n, i, t, r, o, a, u, l, c, s, f, _) {
    var p = Ib();
    try {
      return e.dynCall_ffffffiiifii(n, i, t, r, o, a, u, l, c, s, f, _);
    } catch (n) {
      if ((Ab(p), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Cs(n, i, t, r, o, a) {
    var u = Ib();
    try {
      return e.dynCall_fffffi(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Ls(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_ffffi(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function ks(n, i, t, r) {
    var o = Ib();
    try {
      return e.dynCall_fffi(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function As(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      return e.dynCall_fffifffi(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Is(n, i, t, r, o, a, u, l, c) {
    var s = Ib();
    try {
      return e.dynCall_fffiiifii(n, i, t, r, o, a, u, l, c);
    } catch (n) {
      if ((Ab(s), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Ss(n, i, t) {
    var r = Ib();
    try {
      return e.dynCall_ffi(n, i, t);
    } catch (n) {
      if ((Ab(r), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Os(n, i, t, r, o, a) {
    var u = Ib();
    try {
      return e.dynCall_ffifii(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Ts(n, i) {
    var t = Ib();
    try {
      return e.dynCall_fi(n, i);
    } catch (n) {
      if ((Ab(t), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function js(n, i, t, r) {
    var o = Ib();
    try {
      return e.dynCall_fidi(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Bs(n, i, t) {
    var r = Ib();
    try {
      return e.dynCall_fif(n, i, t);
    } catch (n) {
      if ((Ab(r), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Gs(n, i, t, r) {
    var o = Ib();
    try {
      return e.dynCall_fiff(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Rs(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      return e.dynCall_fiffffii(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function xs(n, i, t, r, o, a, u, l, c, s, f, _) {
    var p = Ib();
    try {
      return e.dynCall_fiffffiiiiii(n, i, t, r, o, a, u, l, c, s, f, _);
    } catch (n) {
      if ((Ab(p), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Ds(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_fiffi(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Ps(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      return e.dynCall_fiffiii(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Ms(n, i, t, r) {
    var o = Ib();
    try {
      return e.dynCall_fifi(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Fs(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      return e.dynCall_fififiii(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Ns(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_fifii(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Us(n, i, t) {
    var r = Ib();
    try {
      return e.dynCall_fii(n, i, t);
    } catch (n) {
      if ((Ab(r), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Ws(n, i, t, r) {
    var o = Ib();
    try {
      return e.dynCall_fiif(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function zs(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_fiifi(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Vs(n, i, t, r, o, a) {
    var u = Ib();
    try {
      return e.dynCall_fiifii(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function qs(n, i, t, r) {
    var o = Ib();
    try {
      return e.dynCall_fiii(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Hs(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_fiiii(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Xs(n, i, t, r, o, a) {
    var u = Ib();
    try {
      return e.dynCall_fiiiii(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Ys(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      return e.dynCall_fiiiiii(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Js(n, i, t, r, o, a, u, l, c, s, f, _, p) {
    var d = Ib();
    try {
      return e.dynCall_fiiiiiifiifif(n, i, t, r, o, a, u, l, c, s, f, _, p);
    } catch (n) {
      if ((Ab(d), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Ks(n, i, t, r, o, a, u, l, c, s, f, _, p) {
    var d = Ib();
    try {
      return e.dynCall_fiiiiiifiiiif(n, i, t, r, o, a, u, l, c, s, f, _, p);
    } catch (n) {
      if ((Ab(d), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Zs(n, i, t, r) {
    var o = Ib();
    try {
      return e.dynCall_fji(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Qs(n) {
    var i = Ib();
    try {
      return e.dynCall_i(n);
    } catch (n) {
      if ((Ab(i), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function $s(n, i, t, r) {
    var o = Ib();
    try {
      return e.dynCall_iddi(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function ef(n, i, t) {
    var r = Ib();
    try {
      return e.dynCall_idi(n, i, t);
    } catch (n) {
      if ((Ab(r), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function nf(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_idiii(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function tf(n, i, t, r, o, a) {
    var u = Ib();
    try {
      return e.dynCall_iffffi(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function rf(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_ifffi(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function of(n, i, t, r) {
    var o = Ib();
    try {
      return e.dynCall_iffi(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function af(n, i, t) {
    var r = Ib();
    try {
      return e.dynCall_ifi(n, i, t);
    } catch (n) {
      if ((Ab(r), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function uf(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_ifiii(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function lf(n, i) {
    var t = Ib();
    try {
      return e.dynCall_ii(n, i);
    } catch (n) {
      if ((Ab(t), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function cf(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_iiddi(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function sf(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      return e.dynCall_iiddiii(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function ff(n, i, t, r) {
    var o = Ib();
    try {
      return e.dynCall_iidi(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function _f(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_iidii(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function pf(n, i, t, r, o, a) {
    var u = Ib();
    try {
      return e.dynCall_iidiii(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function df(n, i, t) {
    var r = Ib();
    try {
      return e.dynCall_iif(n, i, t);
    } catch (n) {
      if ((Ab(r), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function mf(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_iifff(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function yf(n, i, t, r, o, a) {
    var u = Ib();
    try {
      return e.dynCall_iifffi(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function vf(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_iiffi(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function hf(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      return e.dynCall_iiffiii(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function gf(n, i, t, r) {
    var o = Ib();
    try {
      return e.dynCall_iifi(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function bf(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_iifii(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function wf(n, i, t, r, o, a) {
    var u = Ib();
    try {
      return e.dynCall_iifiii(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Ef(n, i, t, r, o, a, u, l, c, s, f) {
    var _ = Ib();
    try {
      return e.dynCall_iifiiiijii(n, i, t, r, o, a, u, l, c, s, f);
    } catch (n) {
      if ((Ab(_), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Cf(n, i, t) {
    var r = Ib();
    try {
      return e.dynCall_iii(n, i, t);
    } catch (n) {
      if ((Ab(r), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Lf(n, i, t, r, o, a) {
    var u = Ib();
    try {
      return e.dynCall_iiidii(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function kf(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      return e.dynCall_iiidiii(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Af(n, i, t, r) {
    var o = Ib();
    try {
      return e.dynCall_iiif(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function If(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_iiiff(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Sf(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_iiifi(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Of(n, i, t, r, o, a) {
    var u = Ib();
    try {
      return e.dynCall_iiifii(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Tf(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      return e.dynCall_iiifiii(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function jf(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      return e.dynCall_iiifiiii(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Bf(n, i, t, r) {
    var o = Ib();
    try {
      return e.dynCall_iiii(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Gf(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      return e.dynCall_iiiidii(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Rf(n, i, t, r, o, a, u, l, c, s) {
    var f = Ib();
    try {
      return e.dynCall_iiiifffffi(n, i, t, r, o, a, u, l, c, s);
    } catch (n) {
      if ((Ab(f), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function xf(n, i, t, r, o, a, u, l, c, s, f) {
    var _ = Ib();
    try {
      return e.dynCall_iiiifffffii(n, i, t, r, o, a, u, l, c, s, f);
    } catch (n) {
      if ((Ab(_), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Df(n, i, t, r, o, a, u, l, c, s) {
    var f = Ib();
    try {
      return e.dynCall_iiiifffiii(n, i, t, r, o, a, u, l, c, s);
    } catch (n) {
      if ((Ab(f), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Pf(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      return e.dynCall_iiiiffi(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Mf(n, i, t, r, o, a, u, l, c) {
    var s = Ib();
    try {
      return e.dynCall_iiiiffiii(n, i, t, r, o, a, u, l, c);
    } catch (n) {
      if ((Ab(s), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Ff(n, i, t, r, o, a) {
    var u = Ib();
    try {
      return e.dynCall_iiiifi(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Nf(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      return e.dynCall_iiiifii(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Uf(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      return e.dynCall_iiiifiii(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Wf(n, i, t, r, o, a, u, l, c) {
    var s = Ib();
    try {
      return e.dynCall_iiiifiiii(n, i, t, r, o, a, u, l, c);
    } catch (n) {
      if ((Ab(s), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function zf(n, i, t, r, o, a, u, l, c, s) {
    var f = Ib();
    try {
      return e.dynCall_iiiifiiiii(n, i, t, r, o, a, u, l, c, s);
    } catch (n) {
      if ((Ab(f), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Vf(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_iiiii(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function qf(n, i, t, r, o, a, u, l, c) {
    var s = Ib();
    try {
      return e.dynCall_iiiiifiii(n, i, t, r, o, a, u, l, c);
    } catch (n) {
      if ((Ab(s), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Hf(n, i, t, r, o, a, u, l, c, s, f, _) {
    var p = Ib();
    try {
      return e.dynCall_iiiiifiiiiif(n, i, t, r, o, a, u, l, c, s, f, _);
    } catch (n) {
      if ((Ab(p), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Xf(n, i, t, r, o, a) {
    var u = Ib();
    try {
      return e.dynCall_iiiiii(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Yf(n, i, t, r, o, a, u, l, c) {
    var s = Ib();
    try {
      return e.dynCall_iiiiiifff(n, i, t, r, o, a, u, l, c);
    } catch (n) {
      if ((Ab(s), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Jf(n, i, t, r, o, a, u, l, c, s, f, _, p, d, m, y) {
    var v = Ib();
    try {
      return e.dynCall_iiiiiifffiiifiii(
        n,
        i,
        t,
        r,
        o,
        a,
        u,
        l,
        c,
        s,
        f,
        _,
        p,
        d,
        m,
        y
      );
    } catch (n) {
      if ((Ab(v), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Kf(
    n,
    i,
    t,
    r,
    o,
    a,
    u,
    l,
    c,
    s,
    f,
    _,
    p,
    d,
    m,
    y,
    v,
    h,
    g,
    b,
    w,
    E,
    C,
    L
  ) {
    var k = Ib();
    try {
      return e.dynCall_iiiiiiffiiiiiiiiiffffiii(
        n,
        i,
        t,
        r,
        o,
        a,
        u,
        l,
        c,
        s,
        f,
        _,
        p,
        d,
        m,
        y,
        v,
        h,
        g,
        b,
        w,
        E,
        C,
        L
      );
    } catch (n) {
      if ((Ab(k), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Zf(
    n,
    i,
    t,
    r,
    o,
    a,
    u,
    l,
    c,
    s,
    f,
    _,
    p,
    d,
    m,
    y,
    v,
    h,
    g,
    b,
    w,
    E,
    C,
    L,
    k
  ) {
    var A = Ib();
    try {
      return e.dynCall_iiiiiiffiiiiiiiiiffffiiii(
        n,
        i,
        t,
        r,
        o,
        a,
        u,
        l,
        c,
        s,
        f,
        _,
        p,
        d,
        m,
        y,
        v,
        h,
        g,
        b,
        w,
        E,
        C,
        L,
        k
      );
    } catch (n) {
      if ((Ab(A), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Qf(
    n,
    i,
    t,
    r,
    o,
    a,
    u,
    l,
    c,
    s,
    f,
    _,
    p,
    d,
    m,
    y,
    v,
    h,
    g,
    b,
    w,
    E,
    C
  ) {
    var L = Ib();
    try {
      return e.dynCall_iiiiiiffiiiiiiiiiiiiiii(
        n,
        i,
        t,
        r,
        o,
        a,
        u,
        l,
        c,
        s,
        f,
        _,
        p,
        d,
        m,
        y,
        v,
        h,
        g,
        b,
        w,
        E,
        C
      );
    } catch (n) {
      if ((Ab(L), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function $f(n, i, t, r, o, a, u, l, c, s) {
    var f = Ib();
    try {
      return e.dynCall_iiiiiifiif(n, i, t, r, o, a, u, l, c, s);
    } catch (n) {
      if ((Ab(f), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function e_(n, i, t, r, o, a, u, l, c, s) {
    var f = Ib();
    try {
      return e.dynCall_iiiiiifiii(n, i, t, r, o, a, u, l, c, s);
    } catch (n) {
      if ((Ab(f), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function n_(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      return e.dynCall_iiiiiii(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function i_(n, i, t, r, o, a, u, l, c, s, f, _) {
    var p = Ib();
    try {
      return e.dynCall_iiiiiiiffiii(n, i, t, r, o, a, u, l, c, s, f, _);
    } catch (n) {
      if ((Ab(p), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function t_(n, i, t, r, o, a, u, l, c, s, f) {
    var _ = Ib();
    try {
      return e.dynCall_iiiiiiifiif(n, i, t, r, o, a, u, l, c, s, f);
    } catch (n) {
      if ((Ab(_), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function r_(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      return e.dynCall_iiiiiiii(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function o_(n, i, t, r, o, a, u, l, c) {
    var s = Ib();
    try {
      return e.dynCall_iiiiiiiii(n, i, t, r, o, a, u, l, c);
    } catch (n) {
      if ((Ab(s), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function a_(n, i, t, r, o, a, u, l, c, s) {
    var f = Ib();
    try {
      return e.dynCall_iiiiiiiiii(n, i, t, r, o, a, u, l, c, s);
    } catch (n) {
      if ((Ab(f), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function u_(n, i, t, r, o, a, u, l, c, s, f) {
    var _ = Ib();
    try {
      return e.dynCall_iiiiiiiiiii(n, i, t, r, o, a, u, l, c, s, f);
    } catch (n) {
      if ((Ab(_), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function l_(n, i, t, r, o, a, u, l, c, s, f, _) {
    var p = Ib();
    try {
      return e.dynCall_iiiiiiiiiiii(n, i, t, r, o, a, u, l, c, s, f, _);
    } catch (n) {
      if ((Ab(p), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function c_(n, i, t, r, o, a, u, l, c, s, f, _, p) {
    var d = Ib();
    try {
      return e.dynCall_iiiiiiiiiiiii(n, i, t, r, o, a, u, l, c, s, f, _, p);
    } catch (n) {
      if ((Ab(d), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function s_(n, i, t, r, o, a, u, l, c, s, f, _, p, d) {
    var m = Ib();
    try {
      return e.dynCall_iiiiiiiiiiiiii(n, i, t, r, o, a, u, l, c, s, f, _, p, d);
    } catch (n) {
      if ((Ab(m), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function f_(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      return e.dynCall_iiiiij(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function __(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      return e.dynCall_iiiiiji(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function p_(n, i, t, r, o, a) {
    var u = Ib();
    try {
      return e.dynCall_iiiij(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function d_(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      return e.dynCall_iiiiji(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function m_(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      return e.dynCall_iiiijii(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function y_(n, i, t, r, o, a, u, l, c) {
    var s = Ib();
    try {
      return e.dynCall_iiiijiii(n, i, t, r, o, a, u, l, c);
    } catch (n) {
      if ((Ab(s), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function v_(n, i, t, r, o, a, u, l, c, s) {
    var f = Ib();
    try {
      return e.dynCall_iiiijjii(n, i, t, r, o, a, u, l, c, s);
    } catch (n) {
      if ((Ab(f), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function h_(n, i, t, r, o, a, u, l, c, s, f, _) {
    var p = Ib();
    try {
      return e.dynCall_iiiijjiiii(n, i, t, r, o, a, u, l, c, s, f, _);
    } catch (n) {
      if ((Ab(p), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function g_(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_iiij(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function b_(n, i, t, r, o, a) {
    var u = Ib();
    try {
      return e.dynCall_iiiji(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function w_(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      return e.dynCall_iiijii(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function E_(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      return e.dynCall_iiijiii(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function C_(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      return e.dynCall_iiijji(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function L_(n, i, t, r, o, a, u, l, c) {
    var s = Ib();
    try {
      return e.dynCall_iiijjii(n, i, t, r, o, a, u, l, c);
    } catch (n) {
      if ((Ab(s), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function k_(n, i, t, r) {
    var o = Ib();
    try {
      return e.dynCall_iij(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function A_(n, i, t, r, o, a, u, l, c) {
    var s = Ib();
    try {
      return e.dynCall_iijffffi(n, i, t, r, o, a, u, l, c);
    } catch (n) {
      if ((Ab(s), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function I_(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_iiji(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function S_(n, i, t, r, o, a) {
    var u = Ib();
    try {
      return e.dynCall_iijii(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function O_(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      return e.dynCall_iijiii(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function T_(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      return e.dynCall_iijji(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function j_(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      return e.dynCall_iijjii(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function B_(n, i, t, r, o, a, u, l, c) {
    var s = Ib();
    try {
      return e.dynCall_iijjiii(n, i, t, r, o, a, u, l, c);
    } catch (n) {
      if ((Ab(s), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function G_(n, i, t) {
    var r = Ib();
    try {
      return e.dynCall_ij(n, i, t);
    } catch (n) {
      if ((Ab(r), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function R_(n, i, t, r) {
    var o = Ib();
    try {
      return e.dynCall_iji(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function x_(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_ijii(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function D_(n, i, t, r, o, a) {
    var u = Ib();
    try {
      return e.dynCall_ijiii(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function P_(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      return e.dynCall_ijiiii(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function M_(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_ijj(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function F_(n, i, t, r, o, a) {
    var u = Ib();
    try {
      return e.dynCall_ijji(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function N_(n) {
    var i = Ib();
    try {
      return e.dynCall_j(n);
    } catch (n) {
      if ((Ab(i), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function U_(n, i, t) {
    var r = Ib();
    try {
      return e.dynCall_jdi(n, i, t);
    } catch (n) {
      if ((Ab(r), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function W_(n, i, t, r) {
    var o = Ib();
    try {
      return e.dynCall_jdii(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function z_(n, i, t) {
    var r = Ib();
    try {
      return e.dynCall_jfi(n, i, t);
    } catch (n) {
      if ((Ab(r), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function V_(n, i) {
    var t = Ib();
    try {
      return e.dynCall_ji(n, i);
    } catch (n) {
      if ((Ab(t), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function q_(n, i, t, r) {
    var o = Ib();
    try {
      return e.dynCall_jidi(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function H_(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_jidii(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function X_(n, i, t) {
    var r = Ib();
    try {
      return e.dynCall_jii(n, i, t);
    } catch (n) {
      if ((Ab(r), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Y_(n, i, t, r) {
    var o = Ib();
    try {
      return e.dynCall_jiii(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function J_(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_jiiii(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function K_(n, i, t, r, o, a) {
    var u = Ib();
    try {
      return e.dynCall_jiiiii(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Z_(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      return e.dynCall_jiiiiii(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Q_(n, i, t, r, o, a, u, l, c, s, f) {
    var _ = Ib();
    try {
      return e.dynCall_jiiiiiiiiii(n, i, t, r, o, a, u, l, c, s, f);
    } catch (n) {
      if ((Ab(_), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function $_(n, i, t, r, o, a) {
    var u = Ib();
    try {
      return e.dynCall_jiiji(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function ep(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_jiji(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function np(n, i, t, r, o, a) {
    var u = Ib();
    try {
      return e.dynCall_jijii(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function ip(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      return e.dynCall_jijiii(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function tp(n, i, t, r, o, a) {
    var u = Ib();
    try {
      return e.dynCall_jijj(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function rp(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      return e.dynCall_jijji(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function op(n, i, t, r) {
    var o = Ib();
    try {
      return e.dynCall_jji(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function ap(n, i, t, r, o) {
    var a = Ib();
    try {
      return e.dynCall_jjii(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function up(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      return e.dynCall_jjjji(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function lp(n) {
    var i = Ib();
    try {
      e.dynCall_v(n);
    } catch (n) {
      if ((Ab(i), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function cp(n, i) {
    var t = Ib();
    try {
      e.dynCall_vd(n, i);
    } catch (n) {
      if ((Ab(t), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function sp(n, i, t) {
    var r = Ib();
    try {
      e.dynCall_vdi(n, i, t);
    } catch (n) {
      if ((Ab(r), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function fp(n, i) {
    var t = Ib();
    try {
      e.dynCall_vf(n, i);
    } catch (n) {
      if ((Ab(t), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function _p(n, i, t) {
    var r = Ib();
    try {
      e.dynCall_vff(n, i, t);
    } catch (n) {
      if ((Ab(r), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function pp(n, i, t, r) {
    var o = Ib();
    try {
      e.dynCall_vfff(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function dp(n, i, t, r, o) {
    var a = Ib();
    try {
      e.dynCall_vffff(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function mp(n, i, t, r, o, a) {
    var u = Ib();
    try {
      e.dynCall_vffffi(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function yp(n, i, t, r, o) {
    var a = Ib();
    try {
      e.dynCall_vfffi(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function vp(n, i, t) {
    var r = Ib();
    try {
      e.dynCall_vfi(n, i, t);
    } catch (n) {
      if ((Ab(r), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function hp(n, i, t, r) {
    var o = Ib();
    try {
      e.dynCall_vfii(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function gp(n, i, t, r, o) {
    var a = Ib();
    try {
      e.dynCall_vfiii(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function bp(n, i) {
    var t = Ib();
    try {
      e.dynCall_vi(n, i);
    } catch (n) {
      if ((Ab(t), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function wp(n, i, t) {
    var r = Ib();
    try {
      e.dynCall_vid(n, i, t);
    } catch (n) {
      if ((Ab(r), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Ep(n, i, t, r) {
    var o = Ib();
    try {
      e.dynCall_vidd(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Cp(n, i, t, r) {
    var o = Ib();
    try {
      e.dynCall_vidi(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Lp(n, i, t, r, o, a) {
    var u = Ib();
    try {
      e.dynCall_vidiii(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function kp(n, i, t) {
    var r = Ib();
    try {
      e.dynCall_vif(n, i, t);
    } catch (n) {
      if ((Ab(r), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Ap(n, i, t, r) {
    var o = Ib();
    try {
      e.dynCall_viff(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Ip(n, i, t, r, o) {
    var a = Ib();
    try {
      e.dynCall_vifff(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Sp(n, i, t, r, o, a) {
    var u = Ib();
    try {
      e.dynCall_viffff(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Op(n, i, t, r, o, a, u, l, c, s, f, _, p, d, m, y, v, h, g) {
    var b = Ib();
    try {
      e.dynCall_viffffffffffffffffi(
        n,
        i,
        t,
        r,
        o,
        a,
        u,
        l,
        c,
        s,
        f,
        _,
        p,
        d,
        m,
        y,
        v,
        h,
        g
      );
    } catch (n) {
      if ((Ab(b), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Tp(n, i, t, r, o, a, u, l, c, s, f) {
    var _ = Ib();
    try {
      e.dynCall_viffffffffi(n, i, t, r, o, a, u, l, c, s, f);
    } catch (n) {
      if ((Ab(_), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function jp(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      e.dynCall_vifffffi(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Bp(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      e.dynCall_viffffi(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Gp(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      e.dynCall_viffffii(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Rp(n, i, t, r, o, a, u, l, c, s, f, _, p, d, m, y, v) {
    var h = Ib();
    try {
      e.dynCall_viffffiifffiiiiif(
        n,
        i,
        t,
        r,
        o,
        a,
        u,
        l,
        c,
        s,
        f,
        _,
        p,
        d,
        m,
        y,
        v
      );
    } catch (n) {
      if ((Ab(h), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function xp(n, i, t, r, o, a, u, l, c) {
    var s = Ib();
    try {
      e.dynCall_viffffiii(n, i, t, r, o, a, u, l, c);
    } catch (n) {
      if ((Ab(s), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Dp(n, i, t, r, o, a, u, l, c, s, f, _) {
    var p = Ib();
    try {
      e.dynCall_viffffiiifii(n, i, t, r, o, a, u, l, c, s, f, _);
    } catch (n) {
      if ((Ab(p), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Pp(n, i, t, r, o, a) {
    var u = Ib();
    try {
      e.dynCall_vifffi(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Mp(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      e.dynCall_vifffifi(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Fp(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      e.dynCall_vifffii(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Np(n, i, t, r, o) {
    var a = Ib();
    try {
      e.dynCall_viffi(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Up(n, i, t, r, o, a) {
    var u = Ib();
    try {
      e.dynCall_viffii(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Wp(n, i, t, r, o, a, u, l, c, s, f, _, p, d) {
    var m = Ib();
    try {
      e.dynCall_viffiifffffiii(n, i, t, r, o, a, u, l, c, s, f, _, p, d);
    } catch (n) {
      if ((Ab(m), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function zp(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      e.dynCall_viffiii(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Vp(n, i, t, r, o, a, u, l, c) {
    var s = Ib();
    try {
      e.dynCall_viffiiiif(n, i, t, r, o, a, u, l, c);
    } catch (n) {
      if ((Ab(s), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function qp(n, i, t, r, o, a, u, l, c) {
    var s = Ib();
    try {
      e.dynCall_viffiiiii(n, i, t, r, o, a, u, l, c);
    } catch (n) {
      if ((Ab(s), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Hp(n, i, t, r) {
    var o = Ib();
    try {
      e.dynCall_vifi(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Xp(n, i, t, r, o) {
    var a = Ib();
    try {
      e.dynCall_vifii(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Yp(n, i, t, r, o, a) {
    var u = Ib();
    try {
      e.dynCall_vifiii(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Jp(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      e.dynCall_vifiiii(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Kp(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      e.dynCall_vifijii(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Zp(n, i, t) {
    var r = Ib();
    try {
      e.dynCall_vii(n, i, t);
    } catch (n) {
      if ((Ab(r), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Qp(n, i, t, r) {
    var o = Ib();
    try {
      e.dynCall_viid(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function $p(n, i, t, r, o) {
    var a = Ib();
    try {
      e.dynCall_viidi(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function ed(n, i, t, r, o, a) {
    var u = Ib();
    try {
      e.dynCall_viidii(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function nd(n, i, t, r) {
    var o = Ib();
    try {
      e.dynCall_viif(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function id(n, i, t, r, o) {
    var a = Ib();
    try {
      e.dynCall_viiff(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function td(n, i, t, r, o, a) {
    var u = Ib();
    try {
      e.dynCall_viifff(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function rd(n, i, t, r, o, a, u, l, c, s, f, _) {
    var p = Ib();
    try {
      e.dynCall_viiffffffffi(n, i, t, r, o, a, u, l, c, s, f, _);
    } catch (n) {
      if ((Ab(p), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function od(n, i, t, r, o, a, u, l, c, s, f, _, p, d) {
    var m = Ib();
    try {
      e.dynCall_viiffffffffiii(n, i, t, r, o, a, u, l, c, s, f, _, p, d);
    } catch (n) {
      if ((Ab(m), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function ad(n, i, t, r, o, a, u, l, c, s, f) {
    var _ = Ib();
    try {
      e.dynCall_viifffffffi(n, i, t, r, o, a, u, l, c, s, f);
    } catch (n) {
      if ((Ab(_), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function ud(n, i, t, r, o, a, u, l, c, s) {
    var f = Ib();
    try {
      e.dynCall_viiffffffi(n, i, t, r, o, a, u, l, c, s);
    } catch (n) {
      if ((Ab(f), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function ld(n, i, t, r, o, a, u, l, c) {
    var s = Ib();
    try {
      e.dynCall_viifffffi(n, i, t, r, o, a, u, l, c);
    } catch (n) {
      if ((Ab(s), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function cd(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      e.dynCall_viiffffi(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function sd(n, i, t, r, o, a, u, l, c, s, f, _, p) {
    var d = Ib();
    try {
      e.dynCall_viiffffiiifii(n, i, t, r, o, a, u, l, c, s, f, _, p);
    } catch (n) {
      if ((Ab(d), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function fd(n, i, t, r, o, a, u, l, c, s, f, _, p) {
    var d = Ib();
    try {
      e.dynCall_viiffffiiiiii(n, i, t, r, o, a, u, l, c, s, f, _, p);
    } catch (n) {
      if ((Ab(d), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function _d(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      e.dynCall_viifffi(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function pd(n, i, t, r, o, a) {
    var u = Ib();
    try {
      e.dynCall_viiffi(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function dd(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      e.dynCall_viiffii(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function md(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      e.dynCall_viiffiii(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function yd(n, i, t, r, o) {
    var a = Ib();
    try {
      e.dynCall_viifi(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function vd(n, i, t, r, o, a) {
    var u = Ib();
    try {
      e.dynCall_viifii(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function hd(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      e.dynCall_viifiii(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function gd(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      e.dynCall_viifiiii(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function bd(n, i, t, r) {
    var o = Ib();
    try {
      e.dynCall_viii(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function wd(n, i, t, r, o, a) {
    var u = Ib();
    try {
      e.dynCall_viiidi(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Ed(n, i, t, r, o) {
    var a = Ib();
    try {
      e.dynCall_viiif(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Cd(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      e.dynCall_viiiffdi(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Ld(n, i, t, r, o, a, u, l, c, s, f, _, p, d) {
    var m = Ib();
    try {
      e.dynCall_viiiffffiiifii(n, i, t, r, o, a, u, l, c, s, f, _, p, d);
    } catch (n) {
      if ((Ab(m), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function kd(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      e.dynCall_viiifffi(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Ad(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      e.dynCall_viiiffi(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Id(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      e.dynCall_viiiffii(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Sd(n, i, t, r, o, a) {
    var u = Ib();
    try {
      e.dynCall_viiifi(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Od(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      e.dynCall_viiifii(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Td(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      e.dynCall_viiifiii(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function jd(n, i, t, r, o, a, u, l, c, s) {
    var f = Ib();
    try {
      e.dynCall_viiifiiiii(n, i, t, r, o, a, u, l, c, s);
    } catch (n) {
      if ((Ab(f), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Bd(n, i, t, r, o) {
    var a = Ib();
    try {
      e.dynCall_viiii(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Gd(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      e.dynCall_viiiidi(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Rd(n, i, t, r, o, a) {
    var u = Ib();
    try {
      e.dynCall_viiiif(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function xd(n, i, t, r, o, a, u, l, c, s, f) {
    var _ = Ib();
    try {
      e.dynCall_viiiiffffii(n, i, t, r, o, a, u, l, c, s, f);
    } catch (n) {
      if ((Ab(_), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Dd(n, i, t, r, o, a, u, l, c, s) {
    var f = Ib();
    try {
      e.dynCall_viiiiffiii(n, i, t, r, o, a, u, l, c, s);
    } catch (n) {
      if ((Ab(f), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Pd(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      e.dynCall_viiiifi(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Md(n, i, t, r, o, a, u, l, c, s) {
    var f = Ib();
    try {
      e.dynCall_viiiififfi(n, i, t, r, o, a, u, l, c, s);
    } catch (n) {
      if ((Ab(f), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Fd(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      e.dynCall_viiiifii(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Nd(n, i, t, r, o, a, u, l, c, s) {
    var f = Ib();
    try {
      e.dynCall_viiiifiifi(n, i, t, r, o, a, u, l, c, s);
    } catch (n) {
      if ((Ab(f), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Ud(n, i, t, r, o, a, u, l, c, s) {
    var f = Ib();
    try {
      e.dynCall_viiiifiiii(n, i, t, r, o, a, u, l, c, s);
    } catch (n) {
      if ((Ab(f), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Wd(n, i, t, r, o, a, u, l, c, s, f) {
    var _ = Ib();
    try {
      e.dynCall_viiiifiiiii(n, i, t, r, o, a, u, l, c, s, f);
    } catch (n) {
      if ((Ab(_), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function zd(n, i, t, r, o, a, u, l, c, s, f, _) {
    var p = Ib();
    try {
      e.dynCall_viiiifiiiiif(n, i, t, r, o, a, u, l, c, s, f, _);
    } catch (n) {
      if ((Ab(p), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Vd(n, i, t, r, o, a, u, l, c, s, f, _, p, d) {
    var m = Ib();
    try {
      e.dynCall_viiiifiiiiiiii(n, i, t, r, o, a, u, l, c, s, f, _, p, d);
    } catch (n) {
      if ((Ab(m), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function qd(n, i, t, r, o, a) {
    var u = Ib();
    try {
      e.dynCall_viiiii(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Hd(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      e.dynCall_viiiiidi(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Xd(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      e.dynCall_viiiiif(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Yd(n, i, t, r, o, a, u, l, c) {
    var s = Ib();
    try {
      e.dynCall_viiiiiffi(n, i, t, r, o, a, u, l, c);
    } catch (n) {
      if ((Ab(s), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Jd(n, i, t, r, o, a, u, l, c, s) {
    var f = Ib();
    try {
      e.dynCall_viiiiiffii(n, i, t, r, o, a, u, l, c, s);
    } catch (n) {
      if ((Ab(f), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Kd(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      e.dynCall_viiiiifi(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Zd(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      e.dynCall_viiiiii(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Qd(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      e.dynCall_viiiiiif(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function $d(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      e.dynCall_viiiiiii(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function em(n, i, t, r, o, a, u, l, c, s) {
    var f = Ib();
    try {
      e.dynCall_viiiiiiifi(n, i, t, r, o, a, u, l, c, s);
    } catch (n) {
      if ((Ab(f), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function nm(n, i, t, r, o, a, u, l, c) {
    var s = Ib();
    try {
      e.dynCall_viiiiiiii(n, i, t, r, o, a, u, l, c);
    } catch (n) {
      if ((Ab(s), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function im(n, i, t, r, o, a, u, l, c, s) {
    var f = Ib();
    try {
      e.dynCall_viiiiiiiii(n, i, t, r, o, a, u, l, c, s);
    } catch (n) {
      if ((Ab(f), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function tm(n, i, t, r, o, a, u, l, c, s, f) {
    var _ = Ib();
    try {
      e.dynCall_viiiiiiiiii(n, i, t, r, o, a, u, l, c, s, f);
    } catch (n) {
      if ((Ab(_), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function rm(n, i, t, r, o, a, u, l, c, s, f, _) {
    var p = Ib();
    try {
      e.dynCall_viiiiiiiiiii(n, i, t, r, o, a, u, l, c, s, f, _);
    } catch (n) {
      if ((Ab(p), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function om(n, i, t, r, o, a, u, l, c, s, f, _, p, d, m) {
    var y = Ib();
    try {
      e.dynCall_viiiiiiiiiiifii(n, i, t, r, o, a, u, l, c, s, f, _, p, d, m);
    } catch (n) {
      if ((Ab(y), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function am(n, i, t, r, o, a, u, l, c, s, f, _, p) {
    var d = Ib();
    try {
      e.dynCall_viiiiiiiiiiii(n, i, t, r, o, a, u, l, c, s, f, _, p);
    } catch (n) {
      if ((Ab(d), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function um(n, i, t, r, o, a, u, l, c, s, f, _, p, d) {
    var m = Ib();
    try {
      e.dynCall_viiiiiiiiiiiii(n, i, t, r, o, a, u, l, c, s, f, _, p, d);
    } catch (n) {
      if ((Ab(m), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function lm(n, i, t, r, o, a, u, l, c, s, f, _, p, d, m) {
    var y = Ib();
    try {
      e.dynCall_viiiiiiiiiiiiii(n, i, t, r, o, a, u, l, c, s, f, _, p, d, m);
    } catch (n) {
      if ((Ab(y), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function cm(n, i, t, r, o, a, u, l, c, s, f, _, p, d, m, y) {
    var v = Ib();
    try {
      e.dynCall_viiiiiiiiiiiiiii(
        n,
        i,
        t,
        r,
        o,
        a,
        u,
        l,
        c,
        s,
        f,
        _,
        p,
        d,
        m,
        y
      );
    } catch (n) {
      if ((Ab(v), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function sm(n, i, t, r, o, a, u, l, c, s, f, _, p, d, m, y, v, h, g) {
    var b = Ib();
    try {
      e.dynCall_viiiiiiiiiiiiiiiiii(
        n,
        i,
        t,
        r,
        o,
        a,
        u,
        l,
        c,
        s,
        f,
        _,
        p,
        d,
        m,
        y,
        v,
        h,
        g
      );
    } catch (n) {
      if ((Ab(b), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function fm(
    n,
    i,
    t,
    r,
    o,
    a,
    u,
    l,
    c,
    s,
    f,
    _,
    p,
    d,
    m,
    y,
    v,
    h,
    g,
    b,
    w,
    E,
    C
  ) {
    var L = Ib();
    try {
      e.dynCall_viiiiiiiiiiiiiiiiiiiiii(
        n,
        i,
        t,
        r,
        o,
        a,
        u,
        l,
        c,
        s,
        f,
        _,
        p,
        d,
        m,
        y,
        v,
        h,
        g,
        b,
        w,
        E,
        C
      );
    } catch (n) {
      if ((Ab(L), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function _m(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      e.dynCall_viiiij(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function pm(n, i, t, r, o, a, u, l, c, s, f) {
    var _ = Ib();
    try {
      e.dynCall_viiiijiiii(n, i, t, r, o, a, u, l, c, s, f);
    } catch (n) {
      if ((Ab(_), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function dm(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      e.dynCall_viiiji(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function mm(n, i, t, r, o, a, u, l, c) {
    var s = Ib();
    try {
      e.dynCall_viiijji(n, i, t, r, o, a, u, l, c);
    } catch (n) {
      if ((Ab(s), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function ym(n, i, t, r, o) {
    var a = Ib();
    try {
      e.dynCall_viij(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function vm(n, i, t, r, o, a) {
    var u = Ib();
    try {
      e.dynCall_viiji(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function hm(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      e.dynCall_viijii(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function gm(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      e.dynCall_viijiii(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function bm(n, i, t, r, o, a, u, l, c, s, f, _) {
    var p = Ib();
    try {
      e.dynCall_viijiijiii(n, i, t, r, o, a, u, l, c, s, f, _);
    } catch (n) {
      if ((Ab(p), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function wm(n, i, t, r, o, a, u, l, c, s) {
    var f = Ib();
    try {
      e.dynCall_viijijii(n, i, t, r, o, a, u, l, c, s);
    } catch (n) {
      if ((Ab(f), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Em(n, i, t, r, o, a, u, l, c, s, f) {
    var _ = Ib();
    try {
      e.dynCall_viijijiii(n, i, t, r, o, a, u, l, c, s, f);
    } catch (n) {
      if ((Ab(_), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Cm(n, i, t, r, o, a, u, l, c, s) {
    var f = Ib();
    try {
      e.dynCall_viijijj(n, i, t, r, o, a, u, l, c, s);
    } catch (n) {
      if ((Ab(f), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Lm(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      e.dynCall_viijj(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function km(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      e.dynCall_viijji(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Am(n, i, t, r) {
    var o = Ib();
    try {
      e.dynCall_vij(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Im(n, i, t, r, o) {
    var a = Ib();
    try {
      e.dynCall_viji(n, i, t, r, o);
    } catch (n) {
      if ((Ab(a), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Sm(n, i, t, r, o, a) {
    var u = Ib();
    try {
      e.dynCall_vijii(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Om(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      e.dynCall_vijiii(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Tm(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      e.dynCall_vijiji(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function jm(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      e.dynCall_vijji(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Bm(n, i, t, r, o, a, u, l) {
    var c = Ib();
    try {
      e.dynCall_vijjii(n, i, t, r, o, a, u, l);
    } catch (n) {
      if ((Ab(c), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Gm(n, i, t, r, o, a, u, l, c) {
    var s = Ib();
    try {
      e.dynCall_vijjji(n, i, t, r, o, a, u, l, c);
    } catch (n) {
      if ((Ab(s), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Rm(n, i, t, r) {
    var o = Ib();
    try {
      e.dynCall_vji(n, i, t, r);
    } catch (n) {
      if ((Ab(o), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function xm(n, i, t, r, o, a, u) {
    var l = Ib();
    try {
      e.dynCall_vjiiii(n, i, t, r, o, a, u);
    } catch (n) {
      if ((Ab(l), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  function Dm(n, i, t, r, o, a) {
    var u = Ib();
    try {
      e.dynCall_vjji(n, i, t, r, o, a);
    } catch (n) {
      if ((Ab(u), "number" != typeof n && "longjmp" !== n)) throw n;
      e.setThrew(1, 0);
    }
  }
  De.push(function () {
    pt.root = st.mount(pt, {}, null);
  }),
    De.push(function () {
      Ht.root = st.mount(Ht, {}, null);
    }),
    (ar = s
      ? function () {
          var e = process.hrtime();
          return 1e3 * e[0] + e[1] / 1e6;
        }
      : "undefined" != typeof dateNow
      ? dateNow
      : "object" == typeof self &&
        self.performance &&
        "function" == typeof self.performance.now
      ? function () {
          return self.performance.now();
        }
      : "object" == typeof performance && "function" == typeof performance.now
      ? function () {
          return performance.now();
        }
      : Date.now),
    (e.requestFullScreen = function (n, i, t) {
      v(
        "Module.requestFullScreen is deprecated. Please call Module.requestFullscreen instead."
      ),
        (e.requestFullScreen = e.requestFullscreen),
        hr.requestFullScreen(n, i, t);
    }),
    (e.requestFullscreen = function (e, n, i) {
      hr.requestFullscreen(e, n, i);
    }),
    (e.requestAnimationFrame = function (e) {
      hr.requestAnimationFrame(e);
    }),
    (e.setCanvasSize = function (e, n, i) {
      hr.setCanvasSize(e, n, i);
    }),
    (e.pauseMainLoop = function () {
      hr.mainLoop.pause();
    }),
    (e.resumeMainLoop = function () {
      hr.mainLoop.resume();
    }),
    (e.getUserMedia = function () {
      hr.getUserMedia();
    }),
    (e.createContext = function (e, n, i, t) {
      return hr.createContext(e, n, i, t);
    }),
    Ar.staticInit(),
    vo.init(),
    (we = g(4)),
    (ve = he = w(me)),
    (be = w((ge = ve + je))),
    (se[we >> 2] = be),
    (ye = !0),
    (e.wasmTableSize = 119143),
    (e.wasmMaxTableSize = 119143),
    (e.asmGlobalArg = {}),
    (e.asmLibraryArg = {
      abort: t,
      assert: R,
      enlargeMemory: Te,
      getTotalMemory: Ge,
      abortOnCannotGrowMemory: Oe,
      invoke_dddi: as,
      invoke_ddi: us,
      invoke_dfi: ls,
      invoke_di: cs,
      invoke_diddi: ss,
      invoke_didi: fs,
      invoke_dii: _s,
      invoke_diii: ps,
      invoke_diiii: ds,
      invoke_diji: ms,
      invoke_dji: ys,
      invoke_f: vs,
      invoke_fdi: hs,
      invoke_ff: gs,
      invoke_fff: bs,
      invoke_ffffffi: ws,
      invoke_ffffffiiifii: Es,
      invoke_fffffi: Cs,
      invoke_ffffi: Ls,
      invoke_fffi: ks,
      invoke_fffifffi: As,
      invoke_fffiiifii: Is,
      invoke_ffi: Ss,
      invoke_ffifii: Os,
      invoke_fi: Ts,
      invoke_fidi: js,
      invoke_fif: Bs,
      invoke_fiff: Gs,
      invoke_fiffffii: Rs,
      invoke_fiffffiiiiii: xs,
      invoke_fiffi: Ds,
      invoke_fiffiii: Ps,
      invoke_fifi: Ms,
      invoke_fififiii: Fs,
      invoke_fifii: Ns,
      invoke_fii: Us,
      invoke_fiif: Ws,
      invoke_fiifi: zs,
      invoke_fiifii: Vs,
      invoke_fiii: qs,
      invoke_fiiii: Hs,
      invoke_fiiiii: Xs,
      invoke_fiiiiii: Ys,
      invoke_fiiiiiifiifif: Js,
      invoke_fiiiiiifiiiif: Ks,
      invoke_fji: Zs,
      invoke_i: Qs,
      invoke_iddi: $s,
      invoke_idi: ef,
      invoke_idiii: nf,
      invoke_iffffi: tf,
      invoke_ifffi: rf,
      invoke_iffi: of,
      invoke_ifi: af,
      invoke_ifiii: uf,
      invoke_ii: lf,
      invoke_iiddi: cf,
      invoke_iiddiii: sf,
      invoke_iidi: ff,
      invoke_iidii: _f,
      invoke_iidiii: pf,
      invoke_iif: df,
      invoke_iifff: mf,
      invoke_iifffi: yf,
      invoke_iiffi: vf,
      invoke_iiffiii: hf,
      invoke_iifi: gf,
      invoke_iifii: bf,
      invoke_iifiii: wf,
      invoke_iifiiiijii: Ef,
      invoke_iii: Cf,
      invoke_iiidii: Lf,
      invoke_iiidiii: kf,
      invoke_iiif: Af,
      invoke_iiiff: If,
      invoke_iiifi: Sf,
      invoke_iiifii: Of,
      invoke_iiifiii: Tf,
      invoke_iiifiiii: jf,
      invoke_iiii: Bf,
      invoke_iiiidii: Gf,
      invoke_iiiifffffi: Rf,
      invoke_iiiifffffii: xf,
      invoke_iiiifffiii: Df,
      invoke_iiiiffi: Pf,
      invoke_iiiiffiii: Mf,
      invoke_iiiifi: Ff,
      invoke_iiiifii: Nf,
      invoke_iiiifiii: Uf,
      invoke_iiiifiiii: Wf,
      invoke_iiiifiiiii: zf,
      invoke_iiiii: Vf,
      invoke_iiiiifiii: qf,
      invoke_iiiiifiiiiif: Hf,
      invoke_iiiiii: Xf,
      invoke_iiiiiifff: Yf,
      invoke_iiiiiifffiiifiii: Jf,
      invoke_iiiiiiffiiiiiiiiiffffiii: Kf,
      invoke_iiiiiiffiiiiiiiiiffffiiii: Zf,
      invoke_iiiiiiffiiiiiiiiiiiiiii: Qf,
      invoke_iiiiiifiif: $f,
      invoke_iiiiiifiii: e_,
      invoke_iiiiiii: n_,
      invoke_iiiiiiiffiii: i_,
      invoke_iiiiiiifiif: t_,
      invoke_iiiiiiii: r_,
      invoke_iiiiiiiii: o_,
      invoke_iiiiiiiiii: a_,
      invoke_iiiiiiiiiii: u_,
      invoke_iiiiiiiiiiii: l_,
      invoke_iiiiiiiiiiiii: c_,
      invoke_iiiiiiiiiiiiii: s_,
      invoke_iiiiij: f_,
      invoke_iiiiiji: __,
      invoke_iiiij: p_,
      invoke_iiiiji: d_,
      invoke_iiiijii: m_,
      invoke_iiiijiii: y_,
      invoke_iiiijjii: v_,
      invoke_iiiijjiiii: h_,
      invoke_iiij: g_,
      invoke_iiiji: b_,
      invoke_iiijii: w_,
      invoke_iiijiii: E_,
      invoke_iiijji: C_,
      invoke_iiijjii: L_,
      invoke_iij: k_,
      invoke_iijffffi: A_,
      invoke_iiji: I_,
      invoke_iijii: S_,
      invoke_iijiii: O_,
      invoke_iijji: T_,
      invoke_iijjii: j_,
      invoke_iijjiii: B_,
      invoke_ij: G_,
      invoke_iji: R_,
      invoke_ijii: x_,
      invoke_ijiii: D_,
      invoke_ijiiii: P_,
      invoke_ijj: M_,
      invoke_ijji: F_,
      invoke_j: N_,
      invoke_jdi: U_,
      invoke_jdii: W_,
      invoke_jfi: z_,
      invoke_ji: V_,
      invoke_jidi: q_,
      invoke_jidii: H_,
      invoke_jii: X_,
      invoke_jiii: Y_,
      invoke_jiiii: J_,
      invoke_jiiiii: K_,
      invoke_jiiiiii: Z_,
      invoke_jiiiiiiiiii: Q_,
      invoke_jiiji: $_,
      invoke_jiji: ep,
      invoke_jijii: np,
      invoke_jijiii: ip,
      invoke_jijj: tp,
      invoke_jijji: rp,
      invoke_jji: op,
      invoke_jjii: ap,
      invoke_jjjji: up,
      invoke_v: lp,
      invoke_vd: cp,
      invoke_vdi: sp,
      invoke_vf: fp,
      invoke_vff: _p,
      invoke_vfff: pp,
      invoke_vffff: dp,
      invoke_vffffi: mp,
      invoke_vfffi: yp,
      invoke_vfi: vp,
      invoke_vfii: hp,
      invoke_vfiii: gp,
      invoke_vi: bp,
      invoke_vid: wp,
      invoke_vidd: Ep,
      invoke_vidi: Cp,
      invoke_vidiii: Lp,
      invoke_vif: kp,
      invoke_viff: Ap,
      invoke_vifff: Ip,
      invoke_viffff: Sp,
      invoke_viffffffffffffffffi: Op,
      invoke_viffffffffi: Tp,
      invoke_vifffffi: jp,
      invoke_viffffi: Bp,
      invoke_viffffii: Gp,
      invoke_viffffiifffiiiiif: Rp,
      invoke_viffffiii: xp,
      invoke_viffffiiifii: Dp,
      invoke_vifffi: Pp,
      invoke_vifffifi: Mp,
      invoke_vifffii: Fp,
      invoke_viffi: Np,
      invoke_viffii: Up,
      invoke_viffiifffffiii: Wp,
      invoke_viffiii: zp,
      invoke_viffiiiif: Vp,
      invoke_viffiiiii: qp,
      invoke_vifi: Hp,
      invoke_vifii: Xp,
      invoke_vifiii: Yp,
      invoke_vifiiii: Jp,
      invoke_vifijii: Kp,
      invoke_vii: Zp,
      invoke_viid: Qp,
      invoke_viidi: $p,
      invoke_viidii: ed,
      invoke_viif: nd,
      invoke_viiff: id,
      invoke_viifff: td,
      invoke_viiffffffffi: rd,
      invoke_viiffffffffiii: od,
      invoke_viifffffffi: ad,
      invoke_viiffffffi: ud,
      invoke_viifffffi: ld,
      invoke_viiffffi: cd,
      invoke_viiffffiiifii: sd,
      invoke_viiffffiiiiii: fd,
      invoke_viifffi: _d,
      invoke_viiffi: pd,
      invoke_viiffii: dd,
      invoke_viiffiii: md,
      invoke_viifi: yd,
      invoke_viifii: vd,
      invoke_viifiii: hd,
      invoke_viifiiii: gd,
      invoke_viii: bd,
      invoke_viiidi: wd,
      invoke_viiif: Ed,
      invoke_viiiffdi: Cd,
      invoke_viiiffffiiifii: Ld,
      invoke_viiifffi: kd,
      invoke_viiiffi: Ad,
      invoke_viiiffii: Id,
      invoke_viiifi: Sd,
      invoke_viiifii: Od,
      invoke_viiifiii: Td,
      invoke_viiifiiiii: jd,
      invoke_viiii: Bd,
      invoke_viiiidi: Gd,
      invoke_viiiif: Rd,
      invoke_viiiiffffii: xd,
      invoke_viiiiffiii: Dd,
      invoke_viiiifi: Pd,
      invoke_viiiififfi: Md,
      invoke_viiiifii: Fd,
      invoke_viiiifiifi: Nd,
      invoke_viiiifiiii: Ud,
      invoke_viiiifiiiii: Wd,
      invoke_viiiifiiiiif: zd,
      invoke_viiiifiiiiiiii: Vd,
      invoke_viiiii: qd,
      invoke_viiiiidi: Hd,
      invoke_viiiiif: Xd,
      invoke_viiiiiffi: Yd,
      invoke_viiiiiffii: Jd,
      invoke_viiiiifi: Kd,
      invoke_viiiiii: Zd,
      invoke_viiiiiif: Qd,
      invoke_viiiiiii: $d,
      invoke_viiiiiiifi: em,
      invoke_viiiiiiii: nm,
      invoke_viiiiiiiii: im,
      invoke_viiiiiiiiii: tm,
      invoke_viiiiiiiiiii: rm,
      invoke_viiiiiiiiiiifii: om,
      invoke_viiiiiiiiiiii: am,
      invoke_viiiiiiiiiiiii: um,
      invoke_viiiiiiiiiiiiii: lm,
      invoke_viiiiiiiiiiiiiii: cm,
      invoke_viiiiiiiiiiiiiiiiii: sm,
      invoke_viiiiiiiiiiiiiiiiiiiiii: fm,
      invoke_viiiij: _m,
      invoke_viiiijiiii: pm,
      invoke_viiiji: dm,
      invoke_viiijji: mm,
      invoke_viij: ym,
      invoke_viiji: vm,
      invoke_viijii: hm,
      invoke_viijiii: gm,
      invoke_viijiijiii: bm,
      invoke_viijijii: wm,
      invoke_viijijiii: Em,
      invoke_viijijj: Cm,
      invoke_viijj: Lm,
      invoke_viijji: km,
      invoke_vij: Am,
      invoke_viji: Im,
      invoke_vijii: Sm,
      invoke_vijiii: Om,
      invoke_vijiji: Tm,
      invoke_vijji: jm,
      invoke_vijjii: Bm,
      invoke_vijjji: Gm,
      invoke_vji: Rm,
      invoke_vjiiii: xm,
      invoke_vjji: Dm,
      _JS_Cursor_SetImage: bn,
      _JS_Cursor_SetShow: wn,
      _JS_Eval_ClearInterval: En,
      _JS_Eval_OpenURL: Cn,
      _JS_Eval_SetInterval: Ln,
      _JS_FileSystem_Initialize: An,
      _JS_FileSystem_Sync: In,
      _JS_Log_Dump: Sn,
      _JS_Log_StackTrace: On,
      _JS_Sound_Create_Channel: jn,
      _JS_Sound_GetLength: Bn,
      _JS_Sound_GetLoadState: Gn,
      _JS_Sound_Init: Rn,
      _JS_Sound_Load: xn,
      _JS_Sound_Load_PCM: Dn,
      _JS_Sound_Play: Pn,
      _JS_Sound_ReleaseInstance: Mn,
      _JS_Sound_ResumeIfNeeded: Fn,
      _JS_Sound_Set3D: Nn,
      _JS_Sound_SetListenerOrientation: Un,
      _JS_Sound_SetListenerPosition: Wn,
      _JS_Sound_SetLoop: zn,
      _JS_Sound_SetLoopPoints: Vn,
      _JS_Sound_SetPitch: qn,
      _JS_Sound_SetPosition: Hn,
      _JS_Sound_SetVolume: Xn,
      _JS_Sound_Stop: Yn,
      _JS_SystemInfo_GetBrowserName: Jn,
      _JS_SystemInfo_GetBrowserVersionString: Kn,
      _JS_SystemInfo_GetCanvasClientSize: Zn,
      _JS_SystemInfo_GetDocumentURL: Qn,
      _JS_SystemInfo_GetGPUInfo: $n,
      _JS_SystemInfo_GetLanguage: ei,
      _JS_SystemInfo_GetMatchWebGLToCanvasSize: ni,
      _JS_SystemInfo_GetMemory: ii,
      _JS_SystemInfo_GetOS: ti,
      _JS_SystemInfo_GetPreferredDevicePixelRatio: ri,
      _JS_SystemInfo_GetScreenSize: oi,
      _JS_SystemInfo_GetStreamingAssetsURL: ai,
      _JS_SystemInfo_HasCursorLock: ui,
      _JS_SystemInfo_HasFullscreen: li,
      _JS_SystemInfo_HasWebGL: ci,
      _JS_WebRequest_Abort: fi,
      _JS_WebRequest_Create: _i,
      _JS_WebRequest_GetResponseHeaders: pi,
      _JS_WebRequest_Release: di,
      _JS_WebRequest_Send: mi,
      _JS_WebRequest_SetProgressHandler: yi,
      _JS_WebRequest_SetRequestHeader: vi,
      _JS_WebRequest_SetResponseHandler: hi,
      _JS_WebRequest_SetTimeout: gi,
      _OpenWindow: bi,
      _Rewired_GetClientInfo: wi,
      _Rewired_GetGamepadAxisCount: Ei,
      _Rewired_GetGamepadAxisValue: Ci,
      _Rewired_GetGamepadButtonCount: Li,
      _Rewired_GetGamepadButtonIsPressed: ki,
      _Rewired_GetGamepadButtonValue: Ai,
      _Rewired_GetGamepadConnected: Ii,
      _Rewired_GetGamepadMapping: Si,
      _Rewired_GetGamepadName: Oi,
      _Rewired_GetGamepadNameHash: Ti,
      _Rewired_GetMaxGamepadId: ji,
      _Rewired_Initialize: Bi,
      _SaveToUrlExternal: Gi,
      __ZSt18uncaught_exceptionv: Fi,
      ___atomic_compare_exchange_8: Ri,
      ___atomic_fetch_add_8: xi,
      ___buildEnvironment: Pi,
      ___cxa_allocate_exception: Mi,
      ___cxa_begin_catch: Ui,
      ___cxa_end_catch: zi,
      ___cxa_find_matching_catch: Ki,
      ___cxa_find_matching_catch_2: Vi,
      ___cxa_find_matching_catch_3: qi,
      ___cxa_find_matching_catch_4: Hi,
      ___cxa_free_exception: Wi,
      ___cxa_pure_virtual: Xi,
      ___cxa_rethrow: Yi,
      ___cxa_throw: Zi,
      ___gxx_personality_v0: Qi,
      ___lock: $i,
      ___map_file: it,
      ___resumeException: Ji,
      ___setErrNo: nt,
      ___syscall10: _t,
      ___syscall102: wt,
      ___syscall122: Et,
      ___syscall140: Ct,
      ___syscall142: Lt,
      ___syscall145: kt,
      ___syscall146: At,
      ___syscall15: It,
      ___syscall168: St,
      ___syscall183: Ot,
      ___syscall192: Tt,
      ___syscall193: jt,
      ___syscall195: Bt,
      ___syscall196: Gt,
      ___syscall197: Rt,
      ___syscall199: Dt,
      ___syscall202: xt,
      ___syscall220: Pt,
      ___syscall221: Mt,
      ___syscall268: Ft,
      ___syscall3: Nt,
      ___syscall33: Ut,
      ___syscall38: Wt,
      ___syscall39: zt,
      ___syscall4: Vt,
      ___syscall40: qt,
      ___syscall42: Xt,
      ___syscall5: Yt,
      ___syscall54: Jt,
      ___syscall6: Kt,
      ___syscall63: Zt,
      ___syscall77: Qt,
      ___syscall85: $t,
      ___syscall91: er,
      ___unlock: nr,
      __addDays: Qc,
      __arraySum: Yc,
      __emscripten_do_request_fullscreen: Yr,
      __emscripten_sample_gamepad_data: jr,
      __emscripten_traverse_stack: Nr,
      __exit: So,
      __formatString: Fr,
      __inet_ntop4_raw: vt,
      __inet_ntop6_raw: ht,
      __inet_pton4_raw: dt,
      __inet_pton6_raw: mt,
      __isLeapYear: Xc,
      __read_sockaddr: gt,
      __reallyNegative: Mr,
      __setLetterbox: Xr,
      __write_sockaddr: bt,
      _abort: ir,
      _atexit: tr,
      _clock: rr,
      _clock_getres: lr,
      _clock_gettime: cr,
      _ctOpenWindow: sr,
      _difftime: fr,
      _dlclose: pr,
      _dlopen: dr,
      _dlsym: mr,
      _emscripten_asm_const_i: mn,
      _emscripten_asm_const_ii: vn,
      _emscripten_asm_const_sync_on_main_thread_i: yn,
      _emscripten_cancel_main_loop: gr,
      _emscripten_exit_fullscreen: Sr,
      _emscripten_exit_pointerlock: Or,
      _emscripten_get_callstack_js: Ur,
      _emscripten_get_canvas_element_size: Lr,
      _emscripten_get_canvas_element_size_calling_thread: Er,
      _emscripten_get_canvas_element_size_main_thread: Cr,
      _emscripten_get_fullscreen_status: Tr,
      _emscripten_get_gamepad_status: Br,
      _emscripten_get_main_loop_timing: Gr,
      _emscripten_get_now: ar,
      _emscripten_get_now_is_monotonic: ur,
      _emscripten_get_now_res: or,
      _emscripten_get_num_gamepads: Rr,
      _emscripten_has_threading_support: xr,
      _emscripten_html5_remove_all_event_listeners: Dr,
      _emscripten_is_webgl_context_lost: Pr,
      _emscripten_log: zr,
      _emscripten_log_js: Wr,
      _emscripten_longjmp: qr,
      _emscripten_memcpy_big: Ec,
      _emscripten_num_logical_cores: Hr,
      _emscripten_request_fullscreen: Jr,
      _emscripten_request_pointerlock: Kr,
      _emscripten_set_blur_callback_on_thread: Zr,
      _emscripten_set_canvas_element_size: br,
      _emscripten_set_dblclick_callback_on_thread: Qr,
      _emscripten_set_devicemotion_callback_on_thread: $r,
      _emscripten_set_deviceorientation_callback_on_thread: eo,
      _emscripten_set_focus_callback_on_thread: no,
      _emscripten_set_fullscreenchange_callback_on_thread: io,
      _emscripten_set_gamepadconnected_callback_on_thread: to,
      _emscripten_set_gamepaddisconnected_callback_on_thread: ro,
      _emscripten_set_keydown_callback_on_thread: oo,
      _emscripten_set_keypress_callback_on_thread: ao,
      _emscripten_set_keyup_callback_on_thread: uo,
      _emscripten_set_main_loop: vr,
      _emscripten_set_main_loop_timing: yr,
      _emscripten_set_mousedown_callback_on_thread: lo,
      _emscripten_set_mousemove_callback_on_thread: co,
      _emscripten_set_mouseup_callback_on_thread: so,
      _emscripten_set_touchcancel_callback_on_thread: fo,
      _emscripten_set_touchend_callback_on_thread: _o,
      _emscripten_set_touchmove_callback_on_thread: po,
      _emscripten_set_touchstart_callback_on_thread: mo,
      _emscripten_set_wheel_callback_on_thread: yo,
      _emscripten_webgl_create_context: go,
      _emscripten_webgl_destroy_context: wo,
      _emscripten_webgl_destroy_context_calling_thread: bo,
      _emscripten_webgl_do_create_context: ho,
      _emscripten_webgl_do_get_current_context: Lo,
      _emscripten_webgl_enable_extension: Co,
      _emscripten_webgl_enable_extension_calling_thread: Eo,
      _emscripten_webgl_get_current_context: ko,
      _emscripten_webgl_init_context_attributes: Ao,
      _emscripten_webgl_make_context_current: Io,
      _exit: Oo,
      _flock: To,
      _getaddrinfo: jo,
      _getenv: Bo,
      _gethostbyaddr: Ro,
      _gethostbyname: Go,
      _getnameinfo: xo,
      _getpagesize: Do,
      _getpwuid: Po,
      _gettimeofday: Mo,
      _glActiveTexture: Fo,
      _glAttachShader: No,
      _glBeginQuery: Uo,
      _glBeginTransformFeedback: Wo,
      _glBindAttribLocation: zo,
      _glBindBuffer: Vo,
      _glBindBufferBase: qo,
      _glBindBufferRange: Ho,
      _glBindFramebuffer: Xo,
      _glBindRenderbuffer: Yo,
      _glBindSampler: Jo,
      _glBindTexture: Ko,
      _glBindTransformFeedback: Zo,
      _glBindVertexArray: Qo,
      _glBlendEquation: $o,
      _glBlendEquationSeparate: ea,
      _glBlendFuncSeparate: na,
      _glBlitFramebuffer: ia,
      _glBufferData: ta,
      _glBufferSubData: ra,
      _glCheckFramebufferStatus: oa,
      _glClear: aa,
      _glClearBufferfi: ua,
      _glClearBufferfv: la,
      _glClearBufferuiv: ca,
      _glClearColor: sa,
      _glClearDepthf: fa,
      _glClearStencil: _a,
      _glClientWaitSync: pa,
      _glColorMask: da,
      _glCompileShader: ma,
      _glCompressedTexImage2D: ya,
      _glCompressedTexImage3D: va,
      _glCompressedTexSubImage2D: ha,
      _glCompressedTexSubImage3D: ga,
      _glCopyBufferSubData: ba,
      _glCopyTexImage2D: wa,
      _glCopyTexSubImage2D: Ea,
      _glCreateProgram: Ca,
      _glCreateShader: La,
      _glCullFace: ka,
      _glDeleteBuffers: Aa,
      _glDeleteFramebuffers: Ia,
      _glDeleteProgram: Sa,
      _glDeleteQueries: Oa,
      _glDeleteRenderbuffers: Ta,
      _glDeleteSamplers: ja,
      _glDeleteShader: Ba,
      _glDeleteSync: Ga,
      _glDeleteTextures: Ra,
      _glDeleteTransformFeedbacks: xa,
      _glDeleteVertexArrays: Da,
      _glDepthFunc: Pa,
      _glDepthMask: Ma,
      _glDetachShader: Fa,
      _glDisable: Na,
      _glDisableVertexAttribArray: Ua,
      _glDrawArrays: Wa,
      _glDrawArraysInstanced: za,
      _glDrawBuffers: Va,
      _glDrawElements: qa,
      _glDrawElementsInstanced: Ha,
      _glEnable: Xa,
      _glEnableVertexAttribArray: Ya,
      _glEndQuery: Ja,
      _glEndTransformFeedback: Ka,
      _glFenceSync: Za,
      _glFinish: Qa,
      _glFlush: $a,
      _glFlushMappedBufferRange: iu,
      _glFramebufferRenderbuffer: tu,
      _glFramebufferTexture2D: ru,
      _glFramebufferTextureLayer: ou,
      _glFrontFace: au,
      _glGenBuffers: uu,
      _glGenFramebuffers: lu,
      _glGenQueries: cu,
      _glGenRenderbuffers: su,
      _glGenSamplers: fu,
      _glGenTextures: _u,
      _glGenTransformFeedbacks: pu,
      _glGenVertexArrays: du,
      _glGenerateMipmap: mu,
      _glGetActiveAttrib: yu,
      _glGetActiveUniform: vu,
      _glGetActiveUniformBlockName: hu,
      _glGetActiveUniformBlockiv: gu,
      _glGetActiveUniformsiv: bu,
      _glGetAttribLocation: wu,
      _glGetError: Eu,
      _glGetFramebufferAttachmentParameteriv: Cu,
      _glGetIntegeri_v: ku,
      _glGetIntegerv: Iu,
      _glGetInternalformativ: Su,
      _glGetProgramBinary: Ou,
      _glGetProgramInfoLog: Tu,
      _glGetProgramiv: ju,
      _glGetQueryObjectuiv: Bu,
      _glGetQueryiv: Gu,
      _glGetRenderbufferParameteriv: Ru,
      _glGetShaderInfoLog: xu,
      _glGetShaderPrecisionFormat: Du,
      _glGetShaderSource: Pu,
      _glGetShaderiv: Mu,
      _glGetString: Fu,
      _glGetStringi: Nu,
      _glGetTexParameteriv: Uu,
      _glGetUniformBlockIndex: Wu,
      _glGetUniformIndices: zu,
      _glGetUniformLocation: Vu,
      _glGetUniformiv: Hu,
      _glGetVertexAttribiv: Yu,
      _glInvalidateFramebuffer: Ju,
      _glIsEnabled: Ku,
      _glIsVertexArray: Zu,
      _glLinkProgram: Qu,
      _glMapBufferRange: $u,
      _glPixelStorei: el,
      _glPolygonOffset: nl,
      _glProgramBinary: il,
      _glProgramParameteri: tl,
      _glReadBuffer: rl,
      _glReadPixels: cl,
      _glRenderbufferStorage: sl,
      _glRenderbufferStorageMultisample: fl,
      _glSamplerParameteri: _l,
      _glScissor: pl,
      _glShaderSource: dl,
      _glStencilFuncSeparate: ml,
      _glStencilMask: yl,
      _glStencilOpSeparate: vl,
      _glTexImage2D: hl,
      _glTexImage3D: gl,
      _glTexParameterf: bl,
      _glTexParameteri: wl,
      _glTexParameteriv: El,
      _glTexStorage2D: Cl,
      _glTexStorage3D: Ll,
      _glTexSubImage2D: kl,
      _glTexSubImage3D: Al,
      _glTransformFeedbackVaryings: Il,
      _glUniform1fv: Sl,
      _glUniform1i: Ol,
      _glUniform1iv: Tl,
      _glUniform1uiv: jl,
      _glUniform2fv: Bl,
      _glUniform2iv: Gl,
      _glUniform2uiv: Rl,
      _glUniform3fv: xl,
      _glUniform3iv: Dl,
      _glUniform3uiv: Pl,
      _glUniform4fv: Ml,
      _glUniform4iv: Fl,
      _glUniform4uiv: Nl,
      _glUniformBlockBinding: Ul,
      _glUniformMatrix3fv: Wl,
      _glUniformMatrix4fv: zl,
      _glUnmapBuffer: Vl,
      _glUseProgram: ql,
      _glValidateProgram: Hl,
      _glVertexAttrib4f: Xl,
      _glVertexAttrib4fv: Yl,
      _glVertexAttribIPointer: Jl,
      _glVertexAttribPointer: Kl,
      _glViewport: Zl,
      _gmtime: nc,
      _gmtime_r: ec,
      _inet_addr: ic,
      _llvm_ceil_f32: tc,
      _llvm_ceil_f64: rc,
      _llvm_copysign_f64: oc,
      _llvm_cttz_i32: ac,
      _llvm_eh_typeid_for: uc,
      _llvm_exp2_f32: lc,
      _llvm_fabs_f32: cc,
      _llvm_fabs_f64: sc,
      _llvm_floor_f32: fc,
      _llvm_floor_f64: _c,
      _llvm_log10_f32: pc,
      _llvm_log10_f64: dc,
      _llvm_log2_f32: mc,
      _llvm_pow_f64: yc,
      _llvm_trap: vc,
      _llvm_trunc_f32: hc,
      _localtime: wc,
      _localtime_r: bc,
      _longjmp: Vr,
      _mktime: Cc,
      _nanosleep: kc,
      _pthread_cond_destroy: Ac,
      _pthread_cond_init: Ic,
      _pthread_cond_timedwait: Sc,
      _pthread_cond_wait: Oc,
      _pthread_getspecific: jc,
      _pthread_key_create: Gc,
      _pthread_key_delete: Rc,
      _pthread_mutex_destroy: xc,
      _pthread_mutex_init: Dc,
      _pthread_mutexattr_destroy: Pc,
      _pthread_mutexattr_init: Mc,
      _pthread_mutexattr_setprotocol: Fc,
      _pthread_mutexattr_settype: Nc,
      _pthread_once: Uc,
      _pthread_setspecific: Wc,
      _sched_yield: zc,
      _setenv: Vc,
      _sigaction: qc,
      _sigemptyset: Hc,
      _strftime: $c,
      _sysconf: es,
      _time: ns,
      _tzset: gc,
      _unsetenv: is,
      _usleep: Lc,
      _utime: ts,
      emscriptenWebGLComputeImageSize: ol,
      emscriptenWebGLGet: Au,
      emscriptenWebGLGetBufferBinding: eu,
      emscriptenWebGLGetHeapForType: ul,
      emscriptenWebGLGetIndexed: Lu,
      emscriptenWebGLGetShiftForType: ll,
      emscriptenWebGLGetTexPixelData: al,
      emscriptenWebGLGetUniform: qu,
      emscriptenWebGLGetVertexAttrib: Xu,
      emscriptenWebGLValidateMapBufferTarget: nu,
      emscripten_get_canvas_element_size_js: kr,
      emscripten_set_canvas_element_size_js: wr,
      DYNAMICTOP_PTR: we,
      tempDoublePtr: gn,
      ABORT: G,
      STACKTOP: he,
      STACK_MAX: ge,
    });
  var Pm = e.asm(e.asmGlobalArg, e.asmLibraryArg, oe);
  e.asm = Pm;
  (e._SendMessage = function () {
    return e.asm._SendMessage.apply(null, arguments);
  }),
    (e._SendMessageFloat = function () {
      return e.asm._SendMessageFloat.apply(null, arguments);
    }),
    (e._SendMessageString = function () {
      return e.asm._SendMessageString.apply(null, arguments);
    }),
    (e._SetFullscreen = function () {
      return e.asm._SetFullscreen.apply(null, arguments);
    });
  var Mm,
    Fm = (e.__GLOBAL__sub_I_AIScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_AIScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    Nm = (e.__GLOBAL__sub_I_AccessibilityScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_AccessibilityScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    Um = (e.__GLOBAL__sub_I_AndroidJNIScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_AndroidJNIScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    Wm = (e.__GLOBAL__sub_I_AnimationClip_cpp = function () {
      return e.asm.__GLOBAL__sub_I_AnimationClip_cpp.apply(null, arguments);
    }),
    zm = (e.__GLOBAL__sub_I_AnimationScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_AnimationScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    Vm = (e.__GLOBAL__sub_I_AssetBundleFileSystem_cpp = function () {
      return e.asm.__GLOBAL__sub_I_AssetBundleFileSystem_cpp.apply(
        null,
        arguments
      );
    }),
    qm = (e.__GLOBAL__sub_I_AssetBundleScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_AssetBundleScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    Hm = (e.__GLOBAL__sub_I_AudioScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_AudioScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    Xm = (e.__GLOBAL__sub_I_ClothScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_ClothScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    Ym = (e.__GLOBAL__sub_I_DirectorScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_DirectorScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    Jm = (e.__GLOBAL__sub_I_External_ProphecySDK_BlitOperations_1_cpp =
      function () {
        return e.asm.__GLOBAL__sub_I_External_ProphecySDK_BlitOperations_1_cpp.apply(
          null,
          arguments
        );
      }),
    Km = (e.__GLOBAL__sub_I_External_Yoga_Yoga_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_External_Yoga_Yoga_0_cpp.apply(
        null,
        arguments
      );
    }),
    Zm =
      (e.__GLOBAL__sub_I_External_il2cpp_builds_external_baselib_Platforms_WebGL_Source_0_cpp =
        function () {
          return e.asm.__GLOBAL__sub_I_External_il2cpp_builds_external_baselib_Platforms_WebGL_Source_0_cpp.apply(
            null,
            arguments
          );
        }),
    Qm = (e.__GLOBAL__sub_I_GUITexture_cpp = function () {
      return e.asm.__GLOBAL__sub_I_GUITexture_cpp.apply(null, arguments);
    }),
    $m = (e.__GLOBAL__sub_I_GfxDeviceNull_cpp = function () {
      return e.asm.__GLOBAL__sub_I_GfxDeviceNull_cpp.apply(null, arguments);
    }),
    ey = (e.__GLOBAL__sub_I_GridScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_GridScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    ny = (e.__GLOBAL__sub_I_IMGUIScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_IMGUIScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    iy = (e.__GLOBAL__sub_I_InputLegacyScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_InputLegacyScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    ty = (e.__GLOBAL__sub_I_InputScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_InputScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    ry = (e.__GLOBAL__sub_I_LogAssert_cpp = function () {
      return e.asm.__GLOBAL__sub_I_LogAssert_cpp.apply(null, arguments);
    }),
    oy = (e.__GLOBAL__sub_I_Lump_libil2cpp_gc_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Lump_libil2cpp_gc_cpp.apply(null, arguments);
    }),
    ay = (e.__GLOBAL__sub_I_Lump_libil2cpp_icalls_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Lump_libil2cpp_icalls_cpp.apply(
        null,
        arguments
      );
    }),
    uy = (e.__GLOBAL__sub_I_Lump_libil2cpp_metadata_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Lump_libil2cpp_metadata_cpp.apply(
        null,
        arguments
      );
    }),
    ly = (e.__GLOBAL__sub_I_Lump_libil2cpp_mono_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Lump_libil2cpp_mono_cpp.apply(
        null,
        arguments
      );
    }),
    cy = (e.__GLOBAL__sub_I_Lump_libil2cpp_os_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Lump_libil2cpp_os_cpp.apply(null, arguments);
    }),
    sy = (e.__GLOBAL__sub_I_Lump_libil2cpp_utils_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Lump_libil2cpp_utils_cpp.apply(
        null,
        arguments
      );
    }),
    fy = (e.__GLOBAL__sub_I_Lump_libil2cpp_vm_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Lump_libil2cpp_vm_cpp.apply(null, arguments);
    }),
    _y = (e.__GLOBAL__sub_I_Lump_libil2cpp_vm_utils_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Lump_libil2cpp_vm_utils_cpp.apply(
        null,
        arguments
      );
    }),
    py = (e.__GLOBAL__sub_I_Mesh_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Mesh_cpp.apply(null, arguments);
    }),
    dy = (e.__GLOBAL__sub_I_Modules_Animation_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Animation_0_cpp.apply(
        null,
        arguments
      );
    }),
    my = (e.__GLOBAL__sub_I_Modules_Animation_2_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Animation_2_cpp.apply(
        null,
        arguments
      );
    }),
    yy = (e.__GLOBAL__sub_I_Modules_Animation_7_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Animation_7_cpp.apply(
        null,
        arguments
      );
    }),
    vy = (e.__GLOBAL__sub_I_Modules_Animation_Constraints_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Animation_Constraints_0_cpp.apply(
        null,
        arguments
      );
    }),
    hy = (e.__GLOBAL__sub_I_Modules_AssetBundle_Public_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_AssetBundle_Public_0_cpp.apply(
        null,
        arguments
      );
    }),
    gy = (e.__GLOBAL__sub_I_Modules_Audio_Public_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Audio_Public_0_cpp.apply(
        null,
        arguments
      );
    }),
    by = (e.__GLOBAL__sub_I_Modules_Audio_Public_1_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Audio_Public_1_cpp.apply(
        null,
        arguments
      );
    }),
    wy = (e.__GLOBAL__sub_I_Modules_Audio_Public_3_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Audio_Public_3_cpp.apply(
        null,
        arguments
      );
    }),
    Ey = (e.__GLOBAL__sub_I_Modules_Audio_Public_ScriptBindings_1_cpp =
      function () {
        return e.asm.__GLOBAL__sub_I_Modules_Audio_Public_ScriptBindings_1_cpp.apply(
          null,
          arguments
        );
      }),
    Cy = (e.__GLOBAL__sub_I_Modules_Audio_Public_sound_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Audio_Public_sound_0_cpp.apply(
        null,
        arguments
      );
    }),
    Ly = (e.__GLOBAL__sub_I_Modules_Cloth_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Cloth_0_cpp.apply(null, arguments);
    }),
    ky = (e.__GLOBAL__sub_I_Modules_DSPGraph_Public_1_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_DSPGraph_Public_1_cpp.apply(
        null,
        arguments
      );
    }),
    Ay = (e.__GLOBAL__sub_I_Modules_Grid_Public_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Grid_Public_0_cpp.apply(
        null,
        arguments
      );
    }),
    Iy = (e.__GLOBAL__sub_I_Modules_IMGUI_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_IMGUI_0_cpp.apply(null, arguments);
    }),
    Sy = (e.__GLOBAL__sub_I_Modules_IMGUI_1_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_IMGUI_1_cpp.apply(null, arguments);
    }),
    Oy = (e.__GLOBAL__sub_I_Modules_Input_Private_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Input_Private_0_cpp.apply(
        null,
        arguments
      );
    }),
    Ty = (e.__GLOBAL__sub_I_Modules_ParticleSystem_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_ParticleSystem_0_cpp.apply(
        null,
        arguments
      );
    }),
    jy = (e.__GLOBAL__sub_I_Modules_Physics2D_Public_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Physics2D_Public_0_cpp.apply(
        null,
        arguments
      );
    }),
    By = (e.__GLOBAL__sub_I_Modules_Physics2D_Public_1_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Physics2D_Public_1_cpp.apply(
        null,
        arguments
      );
    }),
    Gy = (e.__GLOBAL__sub_I_Modules_Physics_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Physics_0_cpp.apply(null, arguments);
    }),
    Ry = (e.__GLOBAL__sub_I_Modules_Physics_2_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Physics_2_cpp.apply(null, arguments);
    }),
    xy = (e.__GLOBAL__sub_I_Modules_Profiler_Public_1_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Profiler_Public_1_cpp.apply(
        null,
        arguments
      );
    }),
    Dy = (e.__GLOBAL__sub_I_Modules_Profiler_Runtime_1_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Profiler_Runtime_1_cpp.apply(
        null,
        arguments
      );
    }),
    Py = (e.__GLOBAL__sub_I_Modules_Subsystems_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Subsystems_0_cpp.apply(
        null,
        arguments
      );
    }),
    My = (e.__GLOBAL__sub_I_Modules_Terrain_Public_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Terrain_Public_0_cpp.apply(
        null,
        arguments
      );
    }),
    Fy = (e.__GLOBAL__sub_I_Modules_Terrain_Public_1_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Terrain_Public_1_cpp.apply(
        null,
        arguments
      );
    }),
    Ny = (e.__GLOBAL__sub_I_Modules_Terrain_Public_2_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Terrain_Public_2_cpp.apply(
        null,
        arguments
      );
    }),
    Uy = (e.__GLOBAL__sub_I_Modules_Terrain_Public_3_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Terrain_Public_3_cpp.apply(
        null,
        arguments
      );
    }),
    Wy = (e.__GLOBAL__sub_I_Modules_Terrain_VR_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Terrain_VR_0_cpp.apply(
        null,
        arguments
      );
    }),
    zy = (e.__GLOBAL__sub_I_Modules_TextCore_Native_FontEngine_0_cpp =
      function () {
        return e.asm.__GLOBAL__sub_I_Modules_TextCore_Native_FontEngine_0_cpp.apply(
          null,
          arguments
        );
      }),
    Vy = (e.__GLOBAL__sub_I_Modules_TextRendering_Public_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_TextRendering_Public_0_cpp.apply(
        null,
        arguments
      );
    }),
    qy = (e.__GLOBAL__sub_I_Modules_Tilemap_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Tilemap_0_cpp.apply(null, arguments);
    }),
    Hy = (e.__GLOBAL__sub_I_Modules_Tilemap_Public_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Tilemap_Public_0_cpp.apply(
        null,
        arguments
      );
    }),
    Xy = (e.__GLOBAL__sub_I_Modules_UI_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_UI_0_cpp.apply(null, arguments);
    }),
    Yy = (e.__GLOBAL__sub_I_Modules_UI_1_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_UI_1_cpp.apply(null, arguments);
    }),
    Jy = (e.__GLOBAL__sub_I_Modules_UI_2_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_UI_2_cpp.apply(null, arguments);
    }),
    Ky = (e.__GLOBAL__sub_I_Modules_UnityWebRequest_Public_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_UnityWebRequest_Public_0_cpp.apply(
        null,
        arguments
      );
    }),
    Zy = (e.__GLOBAL__sub_I_Modules_VFX_Public_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_VFX_Public_0_cpp.apply(
        null,
        arguments
      );
    }),
    Qy = (e.__GLOBAL__sub_I_Modules_VFX_Public_1_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_VFX_Public_1_cpp.apply(
        null,
        arguments
      );
    }),
    $y = (e.__GLOBAL__sub_I_Modules_VFX_Public_Systems_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_VFX_Public_Systems_0_cpp.apply(
        null,
        arguments
      );
    }),
    ev = (e.__GLOBAL__sub_I_Modules_VR_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_VR_0_cpp.apply(null, arguments);
    }),
    nv = (e.__GLOBAL__sub_I_Modules_VR_1_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_VR_1_cpp.apply(null, arguments);
    }),
    iv = (e.__GLOBAL__sub_I_Modules_Video_Public_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Video_Public_0_cpp.apply(
        null,
        arguments
      );
    }),
    tv = (e.__GLOBAL__sub_I_Modules_Video_Public_Base_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_Video_Public_Base_0_cpp.apply(
        null,
        arguments
      );
    }),
    rv = (e.__GLOBAL__sub_I_Modules_XR_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_XR_0_cpp.apply(null, arguments);
    }),
    ov = (e.__GLOBAL__sub_I_Modules_XR_Public_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_XR_Public_0_cpp.apply(
        null,
        arguments
      );
    }),
    av = (e.__GLOBAL__sub_I_Modules_XR_Stats_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_XR_Stats_0_cpp.apply(
        null,
        arguments
      );
    }),
    uv = (e.__GLOBAL__sub_I_Modules_XR_Subsystems_Display_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_XR_Subsystems_Display_0_cpp.apply(
        null,
        arguments
      );
    }),
    lv = (e.__GLOBAL__sub_I_Modules_XR_Subsystems_Input_Public_0_cpp =
      function () {
        return e.asm.__GLOBAL__sub_I_Modules_XR_Subsystems_Input_Public_0_cpp.apply(
          null,
          arguments
        );
      }),
    cv = (e.__GLOBAL__sub_I_Modules_XR_Subsystems_Input_Public_1_cpp =
      function () {
        return e.asm.__GLOBAL__sub_I_Modules_XR_Subsystems_Input_Public_1_cpp.apply(
          null,
          arguments
        );
      }),
    sv = (e.__GLOBAL__sub_I_Modules_XR_Subsystems_Meshing_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_XR_Subsystems_Meshing_0_cpp.apply(
        null,
        arguments
      );
    }),
    fv = (e.__GLOBAL__sub_I_Modules_XR_Tracing_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Modules_XR_Tracing_0_cpp.apply(
        null,
        arguments
      );
    }),
    _v = (e.__GLOBAL__sub_I_NoiseModule_cpp = function () {
      return e.asm.__GLOBAL__sub_I_NoiseModule_cpp.apply(null, arguments);
    }),
    pv = (e.__GLOBAL__sub_I_ParticleSystemGeometryJob_cpp = function () {
      return e.asm.__GLOBAL__sub_I_ParticleSystemGeometryJob_cpp.apply(
        null,
        arguments
      );
    }),
    dv = (e.__GLOBAL__sub_I_ParticleSystemScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_ParticleSystemScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    mv = (e.__GLOBAL__sub_I_Physics2DScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Physics2DScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    yv = (e.__GLOBAL__sub_I_PhysicsQuery_cpp = function () {
      return e.asm.__GLOBAL__sub_I_PhysicsQuery_cpp.apply(null, arguments);
    }),
    vv = (e.__GLOBAL__sub_I_PhysicsScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_PhysicsScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    hv =
      (e.__GLOBAL__sub_I_PlatformDependent_WebGL_External_baselib_builds_Source_0_cpp =
        function () {
          return e.asm.__GLOBAL__sub_I_PlatformDependent_WebGL_External_baselib_builds_Source_0_cpp.apply(
            null,
            arguments
          );
        }),
    gv = (e.__GLOBAL__sub_I_PlatformDependent_WebGL_Source_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_PlatformDependent_WebGL_Source_0_cpp.apply(
        null,
        arguments
      );
    }),
    bv = (e.__GLOBAL__sub_I_PlatformDependent_WebGL_Source_2_cpp = function () {
      return e.asm.__GLOBAL__sub_I_PlatformDependent_WebGL_Source_2_cpp.apply(
        null,
        arguments
      );
    }),
    wv = (e.__GLOBAL__sub_I_PluginInterfaceVR_cpp = function () {
      return e.asm.__GLOBAL__sub_I_PluginInterfaceVR_cpp.apply(null, arguments);
    }),
    Ev = (e.__GLOBAL__sub_I_Runtime_2D_Renderer_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_2D_Renderer_0_cpp.apply(
        null,
        arguments
      );
    }),
    Cv = (e.__GLOBAL__sub_I_Runtime_2D_Sorting_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_2D_Sorting_0_cpp.apply(
        null,
        arguments
      );
    }),
    Lv = (e.__GLOBAL__sub_I_Runtime_2D_SpriteAtlas_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_2D_SpriteAtlas_0_cpp.apply(
        null,
        arguments
      );
    }),
    kv = (e.__GLOBAL__sub_I_Runtime_Allocator_2_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Allocator_2_cpp.apply(
        null,
        arguments
      );
    }),
    Av = (e.__GLOBAL__sub_I_Runtime_Application_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Application_0_cpp.apply(
        null,
        arguments
      );
    }),
    Iv = (e.__GLOBAL__sub_I_Runtime_BaseClasses_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_BaseClasses_0_cpp.apply(
        null,
        arguments
      );
    }),
    Sv = (e.__GLOBAL__sub_I_Runtime_BaseClasses_1_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_BaseClasses_1_cpp.apply(
        null,
        arguments
      );
    }),
    Ov = (e.__GLOBAL__sub_I_Runtime_BaseClasses_2_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_BaseClasses_2_cpp.apply(
        null,
        arguments
      );
    }),
    Tv = (e.__GLOBAL__sub_I_Runtime_BaseClasses_3_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_BaseClasses_3_cpp.apply(
        null,
        arguments
      );
    }),
    jv = (e.__GLOBAL__sub_I_Runtime_Burst_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Burst_0_cpp.apply(null, arguments);
    }),
    Bv = (e.__GLOBAL__sub_I_Runtime_Camera_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Camera_0_cpp.apply(null, arguments);
    }),
    Gv = (e.__GLOBAL__sub_I_Runtime_Camera_1_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Camera_1_cpp.apply(null, arguments);
    }),
    Rv = (e.__GLOBAL__sub_I_Runtime_Camera_2_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Camera_2_cpp.apply(null, arguments);
    }),
    xv = (e.__GLOBAL__sub_I_Runtime_Camera_5_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Camera_5_cpp.apply(null, arguments);
    }),
    Dv = (e.__GLOBAL__sub_I_Runtime_Camera_6_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Camera_6_cpp.apply(null, arguments);
    }),
    Pv = (e.__GLOBAL__sub_I_Runtime_Camera_7_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Camera_7_cpp.apply(null, arguments);
    }),
    Mv = (e.__GLOBAL__sub_I_Runtime_Camera_8_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Camera_8_cpp.apply(null, arguments);
    }),
    Fv = (e.__GLOBAL__sub_I_Runtime_Camera_Culling_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Camera_Culling_0_cpp.apply(
        null,
        arguments
      );
    }),
    Nv = (e.__GLOBAL__sub_I_Runtime_Camera_RenderLoops_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Camera_RenderLoops_0_cpp.apply(
        null,
        arguments
      );
    }),
    Uv = (e.__GLOBAL__sub_I_Runtime_Camera_RenderLoops_2_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Camera_RenderLoops_2_cpp.apply(
        null,
        arguments
      );
    }),
    Wv = (e.__GLOBAL__sub_I_Runtime_Containers_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Containers_0_cpp.apply(
        null,
        arguments
      );
    }),
    zv = (e.__GLOBAL__sub_I_Runtime_Core_Callbacks_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Core_Callbacks_0_cpp.apply(
        null,
        arguments
      );
    }),
    Vv = (e.__GLOBAL__sub_I_Runtime_Director_Core_1_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Director_Core_1_cpp.apply(
        null,
        arguments
      );
    }),
    qv = (e.__GLOBAL__sub_I_Runtime_Export_Unsafe_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Export_Unsafe_0_cpp.apply(
        null,
        arguments
      );
    }),
    Hv = (e.__GLOBAL__sub_I_Runtime_File_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_File_0_cpp.apply(null, arguments);
    }),
    Xv = (e.__GLOBAL__sub_I_Runtime_Geometry_2_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Geometry_2_cpp.apply(
        null,
        arguments
      );
    }),
    Yv = (e.__GLOBAL__sub_I_Runtime_GfxDevice_1_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_GfxDevice_1_cpp.apply(
        null,
        arguments
      );
    }),
    Jv = (e.__GLOBAL__sub_I_Runtime_GfxDevice_2_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_GfxDevice_2_cpp.apply(
        null,
        arguments
      );
    }),
    Kv = (e.__GLOBAL__sub_I_Runtime_GfxDevice_3_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_GfxDevice_3_cpp.apply(
        null,
        arguments
      );
    }),
    Zv = (e.__GLOBAL__sub_I_Runtime_GfxDevice_4_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_GfxDevice_4_cpp.apply(
        null,
        arguments
      );
    }),
    Qv = (e.__GLOBAL__sub_I_Runtime_GfxDevice_5_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_GfxDevice_5_cpp.apply(
        null,
        arguments
      );
    }),
    $v = (e.__GLOBAL__sub_I_Runtime_GfxDevice_opengles_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_GfxDevice_opengles_0_cpp.apply(
        null,
        arguments
      );
    }),
    eh = (e.__GLOBAL__sub_I_Runtime_Graphics_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Graphics_0_cpp.apply(
        null,
        arguments
      );
    }),
    nh = (e.__GLOBAL__sub_I_Runtime_Graphics_10_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Graphics_10_cpp.apply(
        null,
        arguments
      );
    }),
    ih = (e.__GLOBAL__sub_I_Runtime_Graphics_11_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Graphics_11_cpp.apply(
        null,
        arguments
      );
    }),
    th = (e.__GLOBAL__sub_I_Runtime_Graphics_12_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Graphics_12_cpp.apply(
        null,
        arguments
      );
    }),
    rh = (e.__GLOBAL__sub_I_Runtime_Graphics_1_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Graphics_1_cpp.apply(
        null,
        arguments
      );
    }),
    oh = (e.__GLOBAL__sub_I_Runtime_Graphics_2_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Graphics_2_cpp.apply(
        null,
        arguments
      );
    }),
    ah = (e.__GLOBAL__sub_I_Runtime_Graphics_4_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Graphics_4_cpp.apply(
        null,
        arguments
      );
    }),
    uh = (e.__GLOBAL__sub_I_Runtime_Graphics_5_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Graphics_5_cpp.apply(
        null,
        arguments
      );
    }),
    lh = (e.__GLOBAL__sub_I_Runtime_Graphics_6_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Graphics_6_cpp.apply(
        null,
        arguments
      );
    }),
    ch = (e.__GLOBAL__sub_I_Runtime_Graphics_8_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Graphics_8_cpp.apply(
        null,
        arguments
      );
    }),
    sh = (e.__GLOBAL__sub_I_Runtime_Graphics_9_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Graphics_9_cpp.apply(
        null,
        arguments
      );
    }),
    fh = (e.__GLOBAL__sub_I_Runtime_Graphics_Billboard_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Graphics_Billboard_0_cpp.apply(
        null,
        arguments
      );
    }),
    _h = (e.__GLOBAL__sub_I_Runtime_Graphics_CommandBuffer_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Graphics_CommandBuffer_0_cpp.apply(
        null,
        arguments
      );
    }),
    ph = (e.__GLOBAL__sub_I_Runtime_Graphics_LOD_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Graphics_LOD_0_cpp.apply(
        null,
        arguments
      );
    }),
    dh = (e.__GLOBAL__sub_I_Runtime_Graphics_Mesh_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Graphics_Mesh_0_cpp.apply(
        null,
        arguments
      );
    }),
    mh = (e.__GLOBAL__sub_I_Runtime_Graphics_Mesh_1_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Graphics_Mesh_1_cpp.apply(
        null,
        arguments
      );
    }),
    yh = (e.__GLOBAL__sub_I_Runtime_Graphics_Mesh_2_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Graphics_Mesh_2_cpp.apply(
        null,
        arguments
      );
    }),
    vh = (e.__GLOBAL__sub_I_Runtime_Graphics_Mesh_4_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Graphics_Mesh_4_cpp.apply(
        null,
        arguments
      );
    }),
    hh = (e.__GLOBAL__sub_I_Runtime_Graphics_Mesh_5_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Graphics_Mesh_5_cpp.apply(
        null,
        arguments
      );
    }),
    gh = (e.__GLOBAL__sub_I_Runtime_Graphics_ScriptableRenderLoop_0_cpp =
      function () {
        return e.asm.__GLOBAL__sub_I_Runtime_Graphics_ScriptableRenderLoop_0_cpp.apply(
          null,
          arguments
        );
      }),
    bh = (e.__GLOBAL__sub_I_Runtime_Input_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Input_0_cpp.apply(null, arguments);
    }),
    wh = (e.__GLOBAL__sub_I_Runtime_Interfaces_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Interfaces_0_cpp.apply(
        null,
        arguments
      );
    }),
    Eh = (e.__GLOBAL__sub_I_Runtime_Interfaces_1_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Interfaces_1_cpp.apply(
        null,
        arguments
      );
    }),
    Ch = (e.__GLOBAL__sub_I_Runtime_Interfaces_2_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Interfaces_2_cpp.apply(
        null,
        arguments
      );
    }),
    Lh = (e.__GLOBAL__sub_I_Runtime_Jobs_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Jobs_0_cpp.apply(null, arguments);
    }),
    kh = (e.__GLOBAL__sub_I_Runtime_Jobs_1_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Jobs_1_cpp.apply(null, arguments);
    }),
    Ah = (e.__GLOBAL__sub_I_Runtime_Jobs_Internal_1_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Jobs_Internal_1_cpp.apply(
        null,
        arguments
      );
    }),
    Ih = (e.__GLOBAL__sub_I_Runtime_Jobs_ScriptBindings_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Jobs_ScriptBindings_0_cpp.apply(
        null,
        arguments
      );
    }),
    Sh = (e.__GLOBAL__sub_I_Runtime_Math_2_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Math_2_cpp.apply(null, arguments);
    }),
    Oh = (e.__GLOBAL__sub_I_Runtime_Math_Random_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Math_Random_0_cpp.apply(
        null,
        arguments
      );
    }),
    Th = (e.__GLOBAL__sub_I_Runtime_Misc_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Misc_0_cpp.apply(null, arguments);
    }),
    jh = (e.__GLOBAL__sub_I_Runtime_Misc_2_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Misc_2_cpp.apply(null, arguments);
    }),
    Bh = (e.__GLOBAL__sub_I_Runtime_Misc_3_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Misc_3_cpp.apply(null, arguments);
    }),
    Gh = (e.__GLOBAL__sub_I_Runtime_Misc_4_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Misc_4_cpp.apply(null, arguments);
    }),
    Rh = (e.__GLOBAL__sub_I_Runtime_Misc_5_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Misc_5_cpp.apply(null, arguments);
    }),
    xh = (e.__GLOBAL__sub_I_Runtime_Modules_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Modules_0_cpp.apply(null, arguments);
    }),
    Dh = (e.__GLOBAL__sub_I_Runtime_Mono_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Mono_0_cpp.apply(null, arguments);
    }),
    Ph = (e.__GLOBAL__sub_I_Runtime_Mono_2_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Mono_2_cpp.apply(null, arguments);
    }),
    Mh =
      (e.__GLOBAL__sub_I_Runtime_Mono_SerializationBackend_DirectMemoryAccess_0_cpp =
        function () {
          return e.asm.__GLOBAL__sub_I_Runtime_Mono_SerializationBackend_DirectMemoryAccess_0_cpp.apply(
            null,
            arguments
          );
        }),
    Fh =
      (e.__GLOBAL__sub_I_Runtime_Mono_SerializationBackend_DirectMemoryAccess_1_cpp =
        function () {
          return e.asm.__GLOBAL__sub_I_Runtime_Mono_SerializationBackend_DirectMemoryAccess_1_cpp.apply(
            null,
            arguments
          );
        }),
    Nh = (e.__GLOBAL__sub_I_Runtime_PluginInterface_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_PluginInterface_0_cpp.apply(
        null,
        arguments
      );
    }),
    Uh = (e.__GLOBAL__sub_I_Runtime_PreloadManager_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_PreloadManager_0_cpp.apply(
        null,
        arguments
      );
    }),
    Wh = (e.__GLOBAL__sub_I_Runtime_Profiler_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Profiler_0_cpp.apply(
        null,
        arguments
      );
    }),
    zh = (e.__GLOBAL__sub_I_Runtime_Profiler_2_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Profiler_2_cpp.apply(
        null,
        arguments
      );
    }),
    Vh = (e.__GLOBAL__sub_I_Runtime_Profiler_ExternalGPUProfiler_0_cpp =
      function () {
        return e.asm.__GLOBAL__sub_I_Runtime_Profiler_ExternalGPUProfiler_0_cpp.apply(
          null,
          arguments
        );
      }),
    qh = (e.__GLOBAL__sub_I_Runtime_Profiler_ScriptBindings_0_cpp =
      function () {
        return e.asm.__GLOBAL__sub_I_Runtime_Profiler_ScriptBindings_0_cpp.apply(
          null,
          arguments
        );
      }),
    Hh = (e.__GLOBAL__sub_I_Runtime_SceneManager_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_SceneManager_0_cpp.apply(
        null,
        arguments
      );
    }),
    Xh = (e.__GLOBAL__sub_I_Runtime_ScriptingBackend_Il2Cpp_0_cpp =
      function () {
        return e.asm.__GLOBAL__sub_I_Runtime_ScriptingBackend_Il2Cpp_0_cpp.apply(
          null,
          arguments
        );
      }),
    Yh = (e.__GLOBAL__sub_I_Runtime_Scripting_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Scripting_0_cpp.apply(
        null,
        arguments
      );
    }),
    Jh = (e.__GLOBAL__sub_I_Runtime_Scripting_2_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Scripting_2_cpp.apply(
        null,
        arguments
      );
    }),
    Kh = (e.__GLOBAL__sub_I_Runtime_Scripting_3_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Scripting_3_cpp.apply(
        null,
        arguments
      );
    }),
    Zh = (e.__GLOBAL__sub_I_Runtime_Scripting_APIUpdating_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Scripting_APIUpdating_0_cpp.apply(
        null,
        arguments
      );
    }),
    Qh = (e.__GLOBAL__sub_I_Runtime_Serialize_1_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Serialize_1_cpp.apply(
        null,
        arguments
      );
    }),
    $h = (e.__GLOBAL__sub_I_Runtime_Serialize_2_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Serialize_2_cpp.apply(
        null,
        arguments
      );
    }),
    eg = (e.__GLOBAL__sub_I_Runtime_Serialize_TransferFunctions_0_cpp =
      function () {
        return e.asm.__GLOBAL__sub_I_Runtime_Serialize_TransferFunctions_0_cpp.apply(
          null,
          arguments
        );
      }),
    ng = (e.__GLOBAL__sub_I_Runtime_Serialize_TransferFunctions_1_cpp =
      function () {
        return e.asm.__GLOBAL__sub_I_Runtime_Serialize_TransferFunctions_1_cpp.apply(
          null,
          arguments
        );
      }),
    ig = (e.__GLOBAL__sub_I_Runtime_Shaders_1_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Shaders_1_cpp.apply(null, arguments);
    }),
    tg = (e.__GLOBAL__sub_I_Runtime_Shaders_3_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Shaders_3_cpp.apply(null, arguments);
    }),
    rg = (e.__GLOBAL__sub_I_Runtime_Shaders_4_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Shaders_4_cpp.apply(null, arguments);
    }),
    og = (e.__GLOBAL__sub_I_Runtime_Shaders_GpuPrograms_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Shaders_GpuPrograms_0_cpp.apply(
        null,
        arguments
      );
    }),
    ag = (e.__GLOBAL__sub_I_Runtime_Shaders_ShaderImpl_2_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Shaders_ShaderImpl_2_cpp.apply(
        null,
        arguments
      );
    }),
    ug = (e.__GLOBAL__sub_I_Runtime_Transform_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Transform_0_cpp.apply(
        null,
        arguments
      );
    }),
    lg = (e.__GLOBAL__sub_I_Runtime_Transform_1_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Transform_1_cpp.apply(
        null,
        arguments
      );
    }),
    cg = (e.__GLOBAL__sub_I_Runtime_Utilities_2_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Utilities_2_cpp.apply(
        null,
        arguments
      );
    }),
    sg = (e.__GLOBAL__sub_I_Runtime_Utilities_5_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Utilities_5_cpp.apply(
        null,
        arguments
      );
    }),
    fg = (e.__GLOBAL__sub_I_Runtime_Utilities_6_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Utilities_6_cpp.apply(
        null,
        arguments
      );
    }),
    _g = (e.__GLOBAL__sub_I_Runtime_Utilities_7_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Utilities_7_cpp.apply(
        null,
        arguments
      );
    }),
    pg = (e.__GLOBAL__sub_I_Runtime_Utilities_9_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Utilities_9_cpp.apply(
        null,
        arguments
      );
    }),
    dg = (e.__GLOBAL__sub_I_Runtime_Video_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_Video_0_cpp.apply(null, arguments);
    }),
    mg = (e.__GLOBAL__sub_I_Runtime_VirtualFileSystem_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Runtime_VirtualFileSystem_0_cpp.apply(
        null,
        arguments
      );
    }),
    yg = (e.__GLOBAL__sub_I_Shader_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Shader_cpp.apply(null, arguments);
    }),
    vg = (e.__GLOBAL__sub_I_Shadows_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Shadows_cpp.apply(null, arguments);
    }),
    hg = (e.__GLOBAL__sub_I_ShapeModule_cpp = function () {
      return e.asm.__GLOBAL__sub_I_ShapeModule_cpp.apply(null, arguments);
    }),
    gg = (e.__GLOBAL__sub_I_SubsystemsScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_SubsystemsScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    bg = (e.__GLOBAL__sub_I_SwInterCollision_cpp = function () {
      return e.asm.__GLOBAL__sub_I_SwInterCollision_cpp.apply(null, arguments);
    }),
    wg = (e.__GLOBAL__sub_I_SwSolverKernel_cpp = function () {
      return e.asm.__GLOBAL__sub_I_SwSolverKernel_cpp.apply(null, arguments);
    }),
    Eg = (e.__GLOBAL__sub_I_TemplateInstantiations_cpp = function () {
      return e.asm.__GLOBAL__sub_I_TemplateInstantiations_cpp.apply(
        null,
        arguments
      );
    }),
    Cg = (e.__GLOBAL__sub_I_TerrainScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_TerrainScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    Lg = (e.__GLOBAL__sub_I_TextCoreScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_TextCoreScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    kg = (e.__GLOBAL__sub_I_TextRenderingScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_TextRenderingScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    Ag = (e.__GLOBAL__sub_I_TilemapScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_TilemapScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    Ig = (e.__GLOBAL__sub_I_UIElementsNativeScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_UIElementsNativeScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    Sg = (e.__GLOBAL__sub_I_UIScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_UIScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    Og = (e.__GLOBAL__sub_I_UVModule_cpp = function () {
      return e.asm.__GLOBAL__sub_I_UVModule_cpp.apply(null, arguments);
    }),
    Tg = (e.__GLOBAL__sub_I_UnityAdsSettings_cpp = function () {
      return e.asm.__GLOBAL__sub_I_UnityAdsSettings_cpp.apply(null, arguments);
    }),
    jg = (e.__GLOBAL__sub_I_UnityAnalyticsScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_UnityAnalyticsScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    Bg = (e.__GLOBAL__sub_I_UnityWebRequestScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_UnityWebRequestScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    Gg = (e.__GLOBAL__sub_I_VFXScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_VFXScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    Rg = (e.__GLOBAL__sub_I_VRScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_VRScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    xg = (e.__GLOBAL__sub_I_VideoScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_VideoScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    Dg = (e.__GLOBAL__sub_I_VideoYUV420Convert_cpp = function () {
      return e.asm.__GLOBAL__sub_I_VideoYUV420Convert_cpp.apply(
        null,
        arguments
      );
    }),
    Pg = (e.__GLOBAL__sub_I_VisualEffectAsset_cpp = function () {
      return e.asm.__GLOBAL__sub_I_VisualEffectAsset_cpp.apply(null, arguments);
    }),
    Mg = (e.__GLOBAL__sub_I_Wind_cpp = function () {
      return e.asm.__GLOBAL__sub_I_Wind_cpp.apply(null, arguments);
    }),
    Fg = (e.__GLOBAL__sub_I_XRAudio_cpp = function () {
      return e.asm.__GLOBAL__sub_I_XRAudio_cpp.apply(null, arguments);
    }),
    Ng = (e.__GLOBAL__sub_I_XRPreInit_cpp = function () {
      return e.asm.__GLOBAL__sub_I_XRPreInit_cpp.apply(null, arguments);
    }),
    Ug = (e.__GLOBAL__sub_I_XRScriptingClasses_cpp = function () {
      return e.asm.__GLOBAL__sub_I_XRScriptingClasses_cpp.apply(
        null,
        arguments
      );
    }),
    Wg = (e.__GLOBAL__sub_I_XRWindowsLocatableCamera_cpp = function () {
      return e.asm.__GLOBAL__sub_I_XRWindowsLocatableCamera_cpp.apply(
        null,
        arguments
      );
    }),
    zg = (e.__GLOBAL__sub_I_artifacts_WebGL_codegenerator_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_artifacts_WebGL_codegenerator_0_cpp.apply(
        null,
        arguments
      );
    }),
    Vg = (e.__GLOBAL__sub_I_nvcloth_src_0_cpp = function () {
      return e.asm.__GLOBAL__sub_I_nvcloth_src_0_cpp.apply(null, arguments);
    }),
    qg = (e.__GLOBAL__sub_I_nvcloth_src_1_cpp = function () {
      return e.asm.__GLOBAL__sub_I_nvcloth_src_1_cpp.apply(null, arguments);
    }),
    Hg = (e.__GLOBAL__sub_I_physx_source_physxextensions_src_2_cpp =
      function () {
        return e.asm.__GLOBAL__sub_I_physx_source_physxextensions_src_2_cpp.apply(
          null,
          arguments
        );
      }),
    Xg = (e.__GLOBAL__sub_I_umbra_cpp = function () {
      return e.asm.__GLOBAL__sub_I_umbra_cpp.apply(null, arguments);
    }),
    Yg =
      ((e.___cxa_can_catch = function () {
        return e.asm.___cxa_can_catch.apply(null, arguments);
      }),
      (e.___cxa_is_pointer_type = function () {
        return e.asm.___cxa_is_pointer_type.apply(null, arguments);
      }),
      (e.___cxx_global_var_init_104_1217 = function () {
        return e.asm.___cxx_global_var_init_104_1217.apply(null, arguments);
      })),
    Jg = (e.___cxx_global_var_init_131_1218 = function () {
      return e.asm.___cxx_global_var_init_131_1218.apply(null, arguments);
    }),
    Kg = (e.___cxx_global_var_init_18_10348 = function () {
      return e.asm.___cxx_global_var_init_18_10348.apply(null, arguments);
    }),
    Zg = (e.___cxx_global_var_init_18_1118 = function () {
      return e.asm.___cxx_global_var_init_18_1118.apply(null, arguments);
    }),
    Qg = (e.___cxx_global_var_init_192 = function () {
      return e.asm.___cxx_global_var_init_192.apply(null, arguments);
    }),
    $g = (e.___cxx_global_var_init_19_10349 = function () {
      return e.asm.___cxx_global_var_init_19_10349.apply(null, arguments);
    }),
    eb = (e.___cxx_global_var_init_20_10350 = function () {
      return e.asm.___cxx_global_var_init_20_10350.apply(null, arguments);
    }),
    nb = (e.___cxx_global_var_init_23_16 = function () {
      return e.asm.___cxx_global_var_init_23_16.apply(null, arguments);
    }),
    ib = (e.___cxx_global_var_init_3963 = function () {
      return e.asm.___cxx_global_var_init_3963.apply(null, arguments);
    }),
    tb = (e.___cxx_global_var_init_8306 = function () {
      return e.asm.___cxx_global_var_init_8306.apply(null, arguments);
    }),
    rb = (e.___cxx_global_var_init_89_7086 = function () {
      return e.asm.___cxx_global_var_init_89_7086.apply(null, arguments);
    }),
    ob = (e.___cxx_global_var_init_9560 = function () {
      return e.asm.___cxx_global_var_init_9560.apply(null, arguments);
    }),
    ab = (e.___cxx_global_var_init_9996 = function () {
      return e.asm.___cxx_global_var_init_9996.apply(null, arguments);
    }),
    ub = (e.___cxx_global_var_init_9_9359 = function () {
      return e.asm.___cxx_global_var_init_9_9359.apply(null, arguments);
    }),
    lb = (e.___emscripten_environ_constructor = function () {
      return e.asm.___emscripten_environ_constructor.apply(null, arguments);
    }),
    cb =
      ((e.___errno_location = function () {
        return e.asm.___errno_location.apply(null, arguments);
      }),
      (e.__get_daylight = function () {
        return e.asm.__get_daylight.apply(null, arguments);
      })),
    sb = (e.__get_environ = function () {
      return e.asm.__get_environ.apply(null, arguments);
    }),
    fb = (e.__get_timezone = function () {
      return e.asm.__get_timezone.apply(null, arguments);
    }),
    _b = (e.__get_tzname = function () {
      return e.asm.__get_tzname.apply(null, arguments);
    }),
    pb = (e._emscripten_replace_memory = function () {
      return e.asm._emscripten_replace_memory.apply(null, arguments);
    }),
    db = (e._free = function () {
      return e.asm._free.apply(null, arguments);
    }),
    mb = (e._htonl = function () {
      return e.asm._htonl.apply(null, arguments);
    }),
    yb = (e._htons = function () {
      return e.asm._htons.apply(null, arguments);
    }),
    vb = (e._i64Add = function () {
      return e.asm._i64Add.apply(null, arguments);
    }),
    hb =
      ((e._llvm_bswap_i16 = function () {
        return e.asm._llvm_bswap_i16.apply(null, arguments);
      }),
      (e._llvm_bswap_i32 = function () {
        return e.asm._llvm_bswap_i32.apply(null, arguments);
      }),
      (e._llvm_ctlz_i64 = function () {
        return e.asm._llvm_ctlz_i64.apply(null, arguments);
      }),
      (e._llvm_ctpop_i32 = function () {
        return e.asm._llvm_ctpop_i32.apply(null, arguments);
      }),
      (e._llvm_maxnum_f32 = function () {
        return e.asm._llvm_maxnum_f32.apply(null, arguments);
      }),
      (e._llvm_maxnum_f64 = function () {
        return e.asm._llvm_maxnum_f64.apply(null, arguments);
      }),
      (e._llvm_minnum_f32 = function () {
        return e.asm._llvm_minnum_f32.apply(null, arguments);
      }),
      (e._llvm_round_f32 = function () {
        return e.asm._llvm_round_f32.apply(null, arguments);
      }),
      (e._main = function () {
        return e.asm._main.apply(null, arguments);
      }),
      (e._malloc = function () {
        return e.asm._malloc.apply(null, arguments);
      })),
    gb = (e._memalign = function () {
      return e.asm._memalign.apply(null, arguments);
    }),
    bb =
      ((e._memcpy = function () {
        return e.asm._memcpy.apply(null, arguments);
      }),
      (e._memmove = function () {
        return e.asm._memmove.apply(null, arguments);
      }),
      (e._memset = function () {
        return e.asm._memset.apply(null, arguments);
      })),
    wb = (e._ntohs = function () {
      return e.asm._ntohs.apply(null, arguments);
    }),
    Eb =
      ((e._pthread_cond_broadcast = function () {
        return e.asm._pthread_cond_broadcast.apply(null, arguments);
      }),
      (e._pthread_mutex_lock = function () {
        return e.asm._pthread_mutex_lock.apply(null, arguments);
      }),
      (e._pthread_mutex_unlock = function () {
        return e.asm._pthread_mutex_unlock.apply(null, arguments);
      }),
      (e._realloc = function () {
        return e.asm._realloc.apply(null, arguments);
      }),
      (e._saveSetjmp = function () {
        return e.asm._saveSetjmp.apply(null, arguments);
      }),
      (e._sbrk = function () {
        return e.asm._sbrk.apply(null, arguments);
      }),
      (e._strlen = function () {
        return e.asm._strlen.apply(null, arguments);
      })),
    Cb =
      ((e._testSetjmp = function () {
        return e.asm._testSetjmp.apply(null, arguments);
      }),
      (e.establishStackSpace = function () {
        return e.asm.establishStackSpace.apply(null, arguments);
      }),
      (e.getTempRet0 = function () {
        return e.asm.getTempRet0.apply(null, arguments);
      })),
    Lb =
      ((e.runPostSets = function () {
        return e.asm.runPostSets.apply(null, arguments);
      }),
      (e.setTempRet0 = function () {
        return e.asm.setTempRet0.apply(null, arguments);
      })),
    kb =
      ((e.setThrew = function () {
        return e.asm.setThrew.apply(null, arguments);
      }),
      (e.stackAlloc = function () {
        return e.asm.stackAlloc.apply(null, arguments);
      })),
    Ab = (e.stackRestore = function () {
      return e.asm.stackRestore.apply(null, arguments);
    }),
    Ib = (e.stackSave = function () {
      return e.asm.stackSave.apply(null, arguments);
    });
  (e.dynCall_dddi = function () {
    return e.asm.dynCall_dddi.apply(null, arguments);
  }),
    (e.dynCall_ddi = function () {
      return e.asm.dynCall_ddi.apply(null, arguments);
    }),
    (e.dynCall_dfi = function () {
      return e.asm.dynCall_dfi.apply(null, arguments);
    }),
    (e.dynCall_di = function () {
      return e.asm.dynCall_di.apply(null, arguments);
    }),
    (e.dynCall_diddi = function () {
      return e.asm.dynCall_diddi.apply(null, arguments);
    }),
    (e.dynCall_didi = function () {
      return e.asm.dynCall_didi.apply(null, arguments);
    }),
    (e.dynCall_dii = function () {
      return e.asm.dynCall_dii.apply(null, arguments);
    }),
    (e.dynCall_diii = function () {
      return e.asm.dynCall_diii.apply(null, arguments);
    }),
    (e.dynCall_diiii = function () {
      return e.asm.dynCall_diiii.apply(null, arguments);
    }),
    (e.dynCall_diji = function () {
      return e.asm.dynCall_diji.apply(null, arguments);
    }),
    (e.dynCall_dji = function () {
      return e.asm.dynCall_dji.apply(null, arguments);
    }),
    (e.dynCall_f = function () {
      return e.asm.dynCall_f.apply(null, arguments);
    }),
    (e.dynCall_fdi = function () {
      return e.asm.dynCall_fdi.apply(null, arguments);
    }),
    (e.dynCall_ff = function () {
      return e.asm.dynCall_ff.apply(null, arguments);
    }),
    (e.dynCall_fff = function () {
      return e.asm.dynCall_fff.apply(null, arguments);
    }),
    (e.dynCall_ffffffi = function () {
      return e.asm.dynCall_ffffffi.apply(null, arguments);
    }),
    (e.dynCall_ffffffiiifii = function () {
      return e.asm.dynCall_ffffffiiifii.apply(null, arguments);
    }),
    (e.dynCall_fffffi = function () {
      return e.asm.dynCall_fffffi.apply(null, arguments);
    }),
    (e.dynCall_ffffi = function () {
      return e.asm.dynCall_ffffi.apply(null, arguments);
    }),
    (e.dynCall_fffi = function () {
      return e.asm.dynCall_fffi.apply(null, arguments);
    }),
    (e.dynCall_fffifffi = function () {
      return e.asm.dynCall_fffifffi.apply(null, arguments);
    }),
    (e.dynCall_fffiiifii = function () {
      return e.asm.dynCall_fffiiifii.apply(null, arguments);
    }),
    (e.dynCall_ffi = function () {
      return e.asm.dynCall_ffi.apply(null, arguments);
    }),
    (e.dynCall_ffifii = function () {
      return e.asm.dynCall_ffifii.apply(null, arguments);
    }),
    (e.dynCall_fi = function () {
      return e.asm.dynCall_fi.apply(null, arguments);
    }),
    (e.dynCall_fidi = function () {
      return e.asm.dynCall_fidi.apply(null, arguments);
    }),
    (e.dynCall_fif = function () {
      return e.asm.dynCall_fif.apply(null, arguments);
    }),
    (e.dynCall_fiff = function () {
      return e.asm.dynCall_fiff.apply(null, arguments);
    }),
    (e.dynCall_fiffffii = function () {
      return e.asm.dynCall_fiffffii.apply(null, arguments);
    }),
    (e.dynCall_fiffffiiiiii = function () {
      return e.asm.dynCall_fiffffiiiiii.apply(null, arguments);
    }),
    (e.dynCall_fiffi = function () {
      return e.asm.dynCall_fiffi.apply(null, arguments);
    }),
    (e.dynCall_fiffiii = function () {
      return e.asm.dynCall_fiffiii.apply(null, arguments);
    }),
    (e.dynCall_fifi = function () {
      return e.asm.dynCall_fifi.apply(null, arguments);
    }),
    (e.dynCall_fififiii = function () {
      return e.asm.dynCall_fififiii.apply(null, arguments);
    }),
    (e.dynCall_fifii = function () {
      return e.asm.dynCall_fifii.apply(null, arguments);
    }),
    (e.dynCall_fii = function () {
      return e.asm.dynCall_fii.apply(null, arguments);
    }),
    (e.dynCall_fiif = function () {
      return e.asm.dynCall_fiif.apply(null, arguments);
    }),
    (e.dynCall_fiifi = function () {
      return e.asm.dynCall_fiifi.apply(null, arguments);
    }),
    (e.dynCall_fiifii = function () {
      return e.asm.dynCall_fiifii.apply(null, arguments);
    }),
    (e.dynCall_fiii = function () {
      return e.asm.dynCall_fiii.apply(null, arguments);
    }),
    (e.dynCall_fiiii = function () {
      return e.asm.dynCall_fiiii.apply(null, arguments);
    }),
    (e.dynCall_fiiiii = function () {
      return e.asm.dynCall_fiiiii.apply(null, arguments);
    }),
    (e.dynCall_fiiiiii = function () {
      return e.asm.dynCall_fiiiiii.apply(null, arguments);
    }),
    (e.dynCall_fiiiiiifiifif = function () {
      return e.asm.dynCall_fiiiiiifiifif.apply(null, arguments);
    }),
    (e.dynCall_fiiiiiifiiiif = function () {
      return e.asm.dynCall_fiiiiiifiiiif.apply(null, arguments);
    }),
    (e.dynCall_fji = function () {
      return e.asm.dynCall_fji.apply(null, arguments);
    }),
    (e.dynCall_i = function () {
      return e.asm.dynCall_i.apply(null, arguments);
    }),
    (e.dynCall_iddi = function () {
      return e.asm.dynCall_iddi.apply(null, arguments);
    }),
    (e.dynCall_idi = function () {
      return e.asm.dynCall_idi.apply(null, arguments);
    }),
    (e.dynCall_idiii = function () {
      return e.asm.dynCall_idiii.apply(null, arguments);
    }),
    (e.dynCall_iffffi = function () {
      return e.asm.dynCall_iffffi.apply(null, arguments);
    }),
    (e.dynCall_ifffi = function () {
      return e.asm.dynCall_ifffi.apply(null, arguments);
    }),
    (e.dynCall_iffi = function () {
      return e.asm.dynCall_iffi.apply(null, arguments);
    }),
    (e.dynCall_ifi = function () {
      return e.asm.dynCall_ifi.apply(null, arguments);
    }),
    (e.dynCall_ifiii = function () {
      return e.asm.dynCall_ifiii.apply(null, arguments);
    }),
    (e.dynCall_ii = function () {
      return e.asm.dynCall_ii.apply(null, arguments);
    }),
    (e.dynCall_iiddi = function () {
      return e.asm.dynCall_iiddi.apply(null, arguments);
    }),
    (e.dynCall_iiddiii = function () {
      return e.asm.dynCall_iiddiii.apply(null, arguments);
    }),
    (e.dynCall_iidi = function () {
      return e.asm.dynCall_iidi.apply(null, arguments);
    }),
    (e.dynCall_iidii = function () {
      return e.asm.dynCall_iidii.apply(null, arguments);
    }),
    (e.dynCall_iidiii = function () {
      return e.asm.dynCall_iidiii.apply(null, arguments);
    }),
    (e.dynCall_iif = function () {
      return e.asm.dynCall_iif.apply(null, arguments);
    }),
    (e.dynCall_iifff = function () {
      return e.asm.dynCall_iifff.apply(null, arguments);
    }),
    (e.dynCall_iifffi = function () {
      return e.asm.dynCall_iifffi.apply(null, arguments);
    }),
    (e.dynCall_iiffi = function () {
      return e.asm.dynCall_iiffi.apply(null, arguments);
    }),
    (e.dynCall_iiffiii = function () {
      return e.asm.dynCall_iiffiii.apply(null, arguments);
    }),
    (e.dynCall_iifi = function () {
      return e.asm.dynCall_iifi.apply(null, arguments);
    }),
    (e.dynCall_iifii = function () {
      return e.asm.dynCall_iifii.apply(null, arguments);
    }),
    (e.dynCall_iifiii = function () {
      return e.asm.dynCall_iifiii.apply(null, arguments);
    }),
    (e.dynCall_iifiiiijii = function () {
      return e.asm.dynCall_iifiiiijii.apply(null, arguments);
    }),
    (e.dynCall_iii = function () {
      return e.asm.dynCall_iii.apply(null, arguments);
    }),
    (e.dynCall_iiidii = function () {
      return e.asm.dynCall_iiidii.apply(null, arguments);
    }),
    (e.dynCall_iiidiii = function () {
      return e.asm.dynCall_iiidiii.apply(null, arguments);
    }),
    (e.dynCall_iiif = function () {
      return e.asm.dynCall_iiif.apply(null, arguments);
    }),
    (e.dynCall_iiiff = function () {
      return e.asm.dynCall_iiiff.apply(null, arguments);
    }),
    (e.dynCall_iiifi = function () {
      return e.asm.dynCall_iiifi.apply(null, arguments);
    }),
    (e.dynCall_iiifii = function () {
      return e.asm.dynCall_iiifii.apply(null, arguments);
    }),
    (e.dynCall_iiifiii = function () {
      return e.asm.dynCall_iiifiii.apply(null, arguments);
    }),
    (e.dynCall_iiifiiii = function () {
      return e.asm.dynCall_iiifiiii.apply(null, arguments);
    }),
    (e.dynCall_iiii = function () {
      return e.asm.dynCall_iiii.apply(null, arguments);
    }),
    (e.dynCall_iiiidii = function () {
      return e.asm.dynCall_iiiidii.apply(null, arguments);
    }),
    (e.dynCall_iiiifffffi = function () {
      return e.asm.dynCall_iiiifffffi.apply(null, arguments);
    }),
    (e.dynCall_iiiifffffii = function () {
      return e.asm.dynCall_iiiifffffii.apply(null, arguments);
    }),
    (e.dynCall_iiiifffiii = function () {
      return e.asm.dynCall_iiiifffiii.apply(null, arguments);
    }),
    (e.dynCall_iiiiffi = function () {
      return e.asm.dynCall_iiiiffi.apply(null, arguments);
    }),
    (e.dynCall_iiiiffiii = function () {
      return e.asm.dynCall_iiiiffiii.apply(null, arguments);
    }),
    (e.dynCall_iiiifi = function () {
      return e.asm.dynCall_iiiifi.apply(null, arguments);
    }),
    (e.dynCall_iiiifii = function () {
      return e.asm.dynCall_iiiifii.apply(null, arguments);
    }),
    (e.dynCall_iiiifiii = function () {
      return e.asm.dynCall_iiiifiii.apply(null, arguments);
    }),
    (e.dynCall_iiiifiiii = function () {
      return e.asm.dynCall_iiiifiiii.apply(null, arguments);
    }),
    (e.dynCall_iiiifiiiii = function () {
      return e.asm.dynCall_iiiifiiiii.apply(null, arguments);
    }),
    (e.dynCall_iiiii = function () {
      return e.asm.dynCall_iiiii.apply(null, arguments);
    }),
    (e.dynCall_iiiiifiii = function () {
      return e.asm.dynCall_iiiiifiii.apply(null, arguments);
    }),
    (e.dynCall_iiiiifiiiiif = function () {
      return e.asm.dynCall_iiiiifiiiiif.apply(null, arguments);
    }),
    (e.dynCall_iiiiii = function () {
      return e.asm.dynCall_iiiiii.apply(null, arguments);
    }),
    (e.dynCall_iiiiiifff = function () {
      return e.asm.dynCall_iiiiiifff.apply(null, arguments);
    }),
    (e.dynCall_iiiiiifffiiifiii = function () {
      return e.asm.dynCall_iiiiiifffiiifiii.apply(null, arguments);
    }),
    (e.dynCall_iiiiiiffiiiiiiiiiffffiii = function () {
      return e.asm.dynCall_iiiiiiffiiiiiiiiiffffiii.apply(null, arguments);
    }),
    (e.dynCall_iiiiiiffiiiiiiiiiffffiiii = function () {
      return e.asm.dynCall_iiiiiiffiiiiiiiiiffffiiii.apply(null, arguments);
    }),
    (e.dynCall_iiiiiiffiiiiiiiiiiiiiii = function () {
      return e.asm.dynCall_iiiiiiffiiiiiiiiiiiiiii.apply(null, arguments);
    }),
    (e.dynCall_iiiiiifiif = function () {
      return e.asm.dynCall_iiiiiifiif.apply(null, arguments);
    }),
    (e.dynCall_iiiiiifiii = function () {
      return e.asm.dynCall_iiiiiifiii.apply(null, arguments);
    }),
    (e.dynCall_iiiiiii = function () {
      return e.asm.dynCall_iiiiiii.apply(null, arguments);
    }),
    (e.dynCall_iiiiiiiffiii = function () {
      return e.asm.dynCall_iiiiiiiffiii.apply(null, arguments);
    }),
    (e.dynCall_iiiiiiifiif = function () {
      return e.asm.dynCall_iiiiiiifiif.apply(null, arguments);
    }),
    (e.dynCall_iiiiiiii = function () {
      return e.asm.dynCall_iiiiiiii.apply(null, arguments);
    }),
    (e.dynCall_iiiiiiiii = function () {
      return e.asm.dynCall_iiiiiiiii.apply(null, arguments);
    }),
    (e.dynCall_iiiiiiiiii = function () {
      return e.asm.dynCall_iiiiiiiiii.apply(null, arguments);
    }),
    (e.dynCall_iiiiiiiiiii = function () {
      return e.asm.dynCall_iiiiiiiiiii.apply(null, arguments);
    }),
    (e.dynCall_iiiiiiiiiiii = function () {
      return e.asm.dynCall_iiiiiiiiiiii.apply(null, arguments);
    }),
    (e.dynCall_iiiiiiiiiiiii = function () {
      return e.asm.dynCall_iiiiiiiiiiiii.apply(null, arguments);
    }),
    (e.dynCall_iiiiiiiiiiiiii = function () {
      return e.asm.dynCall_iiiiiiiiiiiiii.apply(null, arguments);
    }),
    (e.dynCall_iiiiij = function () {
      return e.asm.dynCall_iiiiij.apply(null, arguments);
    }),
    (e.dynCall_iiiiiji = function () {
      return e.asm.dynCall_iiiiiji.apply(null, arguments);
    }),
    (e.dynCall_iiiij = function () {
      return e.asm.dynCall_iiiij.apply(null, arguments);
    }),
    (e.dynCall_iiiiji = function () {
      return e.asm.dynCall_iiiiji.apply(null, arguments);
    }),
    (e.dynCall_iiiijii = function () {
      return e.asm.dynCall_iiiijii.apply(null, arguments);
    }),
    (e.dynCall_iiiijiii = function () {
      return e.asm.dynCall_iiiijiii.apply(null, arguments);
    }),
    (e.dynCall_iiiijjii = function () {
      return e.asm.dynCall_iiiijjii.apply(null, arguments);
    }),
    (e.dynCall_iiiijjiiii = function () {
      return e.asm.dynCall_iiiijjiiii.apply(null, arguments);
    }),
    (e.dynCall_iiij = function () {
      return e.asm.dynCall_iiij.apply(null, arguments);
    }),
    (e.dynCall_iiiji = function () {
      return e.asm.dynCall_iiiji.apply(null, arguments);
    }),
    (e.dynCall_iiijii = function () {
      return e.asm.dynCall_iiijii.apply(null, arguments);
    }),
    (e.dynCall_iiijiii = function () {
      return e.asm.dynCall_iiijiii.apply(null, arguments);
    }),
    (e.dynCall_iiijji = function () {
      return e.asm.dynCall_iiijji.apply(null, arguments);
    }),
    (e.dynCall_iiijjii = function () {
      return e.asm.dynCall_iiijjii.apply(null, arguments);
    }),
    (e.dynCall_iij = function () {
      return e.asm.dynCall_iij.apply(null, arguments);
    }),
    (e.dynCall_iijffffi = function () {
      return e.asm.dynCall_iijffffi.apply(null, arguments);
    }),
    (e.dynCall_iiji = function () {
      return e.asm.dynCall_iiji.apply(null, arguments);
    }),
    (e.dynCall_iijii = function () {
      return e.asm.dynCall_iijii.apply(null, arguments);
    }),
    (e.dynCall_iijiii = function () {
      return e.asm.dynCall_iijiii.apply(null, arguments);
    }),
    (e.dynCall_iijji = function () {
      return e.asm.dynCall_iijji.apply(null, arguments);
    }),
    (e.dynCall_iijjii = function () {
      return e.asm.dynCall_iijjii.apply(null, arguments);
    }),
    (e.dynCall_iijjiii = function () {
      return e.asm.dynCall_iijjiii.apply(null, arguments);
    }),
    (e.dynCall_ij = function () {
      return e.asm.dynCall_ij.apply(null, arguments);
    }),
    (e.dynCall_iji = function () {
      return e.asm.dynCall_iji.apply(null, arguments);
    }),
    (e.dynCall_ijii = function () {
      return e.asm.dynCall_ijii.apply(null, arguments);
    }),
    (e.dynCall_ijiii = function () {
      return e.asm.dynCall_ijiii.apply(null, arguments);
    }),
    (e.dynCall_ijiiii = function () {
      return e.asm.dynCall_ijiiii.apply(null, arguments);
    }),
    (e.dynCall_ijj = function () {
      return e.asm.dynCall_ijj.apply(null, arguments);
    }),
    (e.dynCall_ijji = function () {
      return e.asm.dynCall_ijji.apply(null, arguments);
    }),
    (e.dynCall_j = function () {
      return e.asm.dynCall_j.apply(null, arguments);
    }),
    (e.dynCall_jdi = function () {
      return e.asm.dynCall_jdi.apply(null, arguments);
    }),
    (e.dynCall_jdii = function () {
      return e.asm.dynCall_jdii.apply(null, arguments);
    }),
    (e.dynCall_jfi = function () {
      return e.asm.dynCall_jfi.apply(null, arguments);
    }),
    (e.dynCall_ji = function () {
      return e.asm.dynCall_ji.apply(null, arguments);
    }),
    (e.dynCall_jidi = function () {
      return e.asm.dynCall_jidi.apply(null, arguments);
    }),
    (e.dynCall_jidii = function () {
      return e.asm.dynCall_jidii.apply(null, arguments);
    }),
    (e.dynCall_jii = function () {
      return e.asm.dynCall_jii.apply(null, arguments);
    }),
    (e.dynCall_jiii = function () {
      return e.asm.dynCall_jiii.apply(null, arguments);
    }),
    (e.dynCall_jiiii = function () {
      return e.asm.dynCall_jiiii.apply(null, arguments);
    }),
    (e.dynCall_jiiiii = function () {
      return e.asm.dynCall_jiiiii.apply(null, arguments);
    }),
    (e.dynCall_jiiiiii = function () {
      return e.asm.dynCall_jiiiiii.apply(null, arguments);
    }),
    (e.dynCall_jiiiiiiiiii = function () {
      return e.asm.dynCall_jiiiiiiiiii.apply(null, arguments);
    }),
    (e.dynCall_jiiji = function () {
      return e.asm.dynCall_jiiji.apply(null, arguments);
    }),
    (e.dynCall_jiji = function () {
      return e.asm.dynCall_jiji.apply(null, arguments);
    }),
    (e.dynCall_jijii = function () {
      return e.asm.dynCall_jijii.apply(null, arguments);
    }),
    (e.dynCall_jijiii = function () {
      return e.asm.dynCall_jijiii.apply(null, arguments);
    }),
    (e.dynCall_jijj = function () {
      return e.asm.dynCall_jijj.apply(null, arguments);
    }),
    (e.dynCall_jijji = function () {
      return e.asm.dynCall_jijji.apply(null, arguments);
    }),
    (e.dynCall_jji = function () {
      return e.asm.dynCall_jji.apply(null, arguments);
    }),
    (e.dynCall_jjii = function () {
      return e.asm.dynCall_jjii.apply(null, arguments);
    }),
    (e.dynCall_jjjji = function () {
      return e.asm.dynCall_jjjji.apply(null, arguments);
    }),
    (e.dynCall_v = function () {
      return e.asm.dynCall_v.apply(null, arguments);
    }),
    (e.dynCall_vd = function () {
      return e.asm.dynCall_vd.apply(null, arguments);
    }),
    (e.dynCall_vdi = function () {
      return e.asm.dynCall_vdi.apply(null, arguments);
    }),
    (e.dynCall_vf = function () {
      return e.asm.dynCall_vf.apply(null, arguments);
    }),
    (e.dynCall_vff = function () {
      return e.asm.dynCall_vff.apply(null, arguments);
    }),
    (e.dynCall_vfff = function () {
      return e.asm.dynCall_vfff.apply(null, arguments);
    }),
    (e.dynCall_vffff = function () {
      return e.asm.dynCall_vffff.apply(null, arguments);
    }),
    (e.dynCall_vffffi = function () {
      return e.asm.dynCall_vffffi.apply(null, arguments);
    }),
    (e.dynCall_vfffi = function () {
      return e.asm.dynCall_vfffi.apply(null, arguments);
    }),
    (e.dynCall_vfi = function () {
      return e.asm.dynCall_vfi.apply(null, arguments);
    }),
    (e.dynCall_vfii = function () {
      return e.asm.dynCall_vfii.apply(null, arguments);
    }),
    (e.dynCall_vfiii = function () {
      return e.asm.dynCall_vfiii.apply(null, arguments);
    }),
    (e.dynCall_vi = function () {
      return e.asm.dynCall_vi.apply(null, arguments);
    }),
    (e.dynCall_vid = function () {
      return e.asm.dynCall_vid.apply(null, arguments);
    }),
    (e.dynCall_vidd = function () {
      return e.asm.dynCall_vidd.apply(null, arguments);
    }),
    (e.dynCall_vidi = function () {
      return e.asm.dynCall_vidi.apply(null, arguments);
    }),
    (e.dynCall_vidiii = function () {
      return e.asm.dynCall_vidiii.apply(null, arguments);
    }),
    (e.dynCall_vif = function () {
      return e.asm.dynCall_vif.apply(null, arguments);
    }),
    (e.dynCall_viff = function () {
      return e.asm.dynCall_viff.apply(null, arguments);
    }),
    (e.dynCall_vifff = function () {
      return e.asm.dynCall_vifff.apply(null, arguments);
    }),
    (e.dynCall_viffff = function () {
      return e.asm.dynCall_viffff.apply(null, arguments);
    }),
    (e.dynCall_viffffffffffffffffi = function () {
      return e.asm.dynCall_viffffffffffffffffi.apply(null, arguments);
    }),
    (e.dynCall_viffffffffi = function () {
      return e.asm.dynCall_viffffffffi.apply(null, arguments);
    }),
    (e.dynCall_vifffffi = function () {
      return e.asm.dynCall_vifffffi.apply(null, arguments);
    }),
    (e.dynCall_viffffi = function () {
      return e.asm.dynCall_viffffi.apply(null, arguments);
    }),
    (e.dynCall_viffffii = function () {
      return e.asm.dynCall_viffffii.apply(null, arguments);
    }),
    (e.dynCall_viffffiifffiiiiif = function () {
      return e.asm.dynCall_viffffiifffiiiiif.apply(null, arguments);
    }),
    (e.dynCall_viffffiii = function () {
      return e.asm.dynCall_viffffiii.apply(null, arguments);
    }),
    (e.dynCall_viffffiiifii = function () {
      return e.asm.dynCall_viffffiiifii.apply(null, arguments);
    }),
    (e.dynCall_vifffi = function () {
      return e.asm.dynCall_vifffi.apply(null, arguments);
    }),
    (e.dynCall_vifffifi = function () {
      return e.asm.dynCall_vifffifi.apply(null, arguments);
    }),
    (e.dynCall_vifffii = function () {
      return e.asm.dynCall_vifffii.apply(null, arguments);
    }),
    (e.dynCall_viffi = function () {
      return e.asm.dynCall_viffi.apply(null, arguments);
    }),
    (e.dynCall_viffii = function () {
      return e.asm.dynCall_viffii.apply(null, arguments);
    }),
    (e.dynCall_viffiifffffiii = function () {
      return e.asm.dynCall_viffiifffffiii.apply(null, arguments);
    }),
    (e.dynCall_viffiii = function () {
      return e.asm.dynCall_viffiii.apply(null, arguments);
    }),
    (e.dynCall_viffiiiif = function () {
      return e.asm.dynCall_viffiiiif.apply(null, arguments);
    }),
    (e.dynCall_viffiiiii = function () {
      return e.asm.dynCall_viffiiiii.apply(null, arguments);
    }),
    (e.dynCall_vifi = function () {
      return e.asm.dynCall_vifi.apply(null, arguments);
    }),
    (e.dynCall_vifii = function () {
      return e.asm.dynCall_vifii.apply(null, arguments);
    }),
    (e.dynCall_vifiii = function () {
      return e.asm.dynCall_vifiii.apply(null, arguments);
    }),
    (e.dynCall_vifiiii = function () {
      return e.asm.dynCall_vifiiii.apply(null, arguments);
    }),
    (e.dynCall_vifijii = function () {
      return e.asm.dynCall_vifijii.apply(null, arguments);
    }),
    (e.dynCall_vii = function () {
      return e.asm.dynCall_vii.apply(null, arguments);
    }),
    (e.dynCall_viid = function () {
      return e.asm.dynCall_viid.apply(null, arguments);
    }),
    (e.dynCall_viidi = function () {
      return e.asm.dynCall_viidi.apply(null, arguments);
    }),
    (e.dynCall_viidii = function () {
      return e.asm.dynCall_viidii.apply(null, arguments);
    }),
    (e.dynCall_viif = function () {
      return e.asm.dynCall_viif.apply(null, arguments);
    }),
    (e.dynCall_viiff = function () {
      return e.asm.dynCall_viiff.apply(null, arguments);
    }),
    (e.dynCall_viifff = function () {
      return e.asm.dynCall_viifff.apply(null, arguments);
    }),
    (e.dynCall_viiffffffffi = function () {
      return e.asm.dynCall_viiffffffffi.apply(null, arguments);
    }),
    (e.dynCall_viiffffffffiii = function () {
      return e.asm.dynCall_viiffffffffiii.apply(null, arguments);
    }),
    (e.dynCall_viifffffffi = function () {
      return e.asm.dynCall_viifffffffi.apply(null, arguments);
    }),
    (e.dynCall_viiffffffi = function () {
      return e.asm.dynCall_viiffffffi.apply(null, arguments);
    }),
    (e.dynCall_viifffffi = function () {
      return e.asm.dynCall_viifffffi.apply(null, arguments);
    }),
    (e.dynCall_viiffffi = function () {
      return e.asm.dynCall_viiffffi.apply(null, arguments);
    }),
    (e.dynCall_viiffffiiifii = function () {
      return e.asm.dynCall_viiffffiiifii.apply(null, arguments);
    }),
    (e.dynCall_viiffffiiiiii = function () {
      return e.asm.dynCall_viiffffiiiiii.apply(null, arguments);
    }),
    (e.dynCall_viifffi = function () {
      return e.asm.dynCall_viifffi.apply(null, arguments);
    }),
    (e.dynCall_viiffi = function () {
      return e.asm.dynCall_viiffi.apply(null, arguments);
    }),
    (e.dynCall_viiffii = function () {
      return e.asm.dynCall_viiffii.apply(null, arguments);
    }),
    (e.dynCall_viiffiii = function () {
      return e.asm.dynCall_viiffiii.apply(null, arguments);
    }),
    (e.dynCall_viifi = function () {
      return e.asm.dynCall_viifi.apply(null, arguments);
    }),
    (e.dynCall_viifii = function () {
      return e.asm.dynCall_viifii.apply(null, arguments);
    }),
    (e.dynCall_viifiii = function () {
      return e.asm.dynCall_viifiii.apply(null, arguments);
    }),
    (e.dynCall_viifiiii = function () {
      return e.asm.dynCall_viifiiii.apply(null, arguments);
    }),
    (e.dynCall_viii = function () {
      return e.asm.dynCall_viii.apply(null, arguments);
    }),
    (e.dynCall_viiidi = function () {
      return e.asm.dynCall_viiidi.apply(null, arguments);
    }),
    (e.dynCall_viiif = function () {
      return e.asm.dynCall_viiif.apply(null, arguments);
    }),
    (e.dynCall_viiiffdi = function () {
      return e.asm.dynCall_viiiffdi.apply(null, arguments);
    }),
    (e.dynCall_viiiffffiiifii = function () {
      return e.asm.dynCall_viiiffffiiifii.apply(null, arguments);
    }),
    (e.dynCall_viiifffi = function () {
      return e.asm.dynCall_viiifffi.apply(null, arguments);
    }),
    (e.dynCall_viiiffi = function () {
      return e.asm.dynCall_viiiffi.apply(null, arguments);
    }),
    (e.dynCall_viiiffii = function () {
      return e.asm.dynCall_viiiffii.apply(null, arguments);
    }),
    (e.dynCall_viiifi = function () {
      return e.asm.dynCall_viiifi.apply(null, arguments);
    }),
    (e.dynCall_viiifii = function () {
      return e.asm.dynCall_viiifii.apply(null, arguments);
    }),
    (e.dynCall_viiifiii = function () {
      return e.asm.dynCall_viiifiii.apply(null, arguments);
    }),
    (e.dynCall_viiifiiiii = function () {
      return e.asm.dynCall_viiifiiiii.apply(null, arguments);
    }),
    (e.dynCall_viiii = function () {
      return e.asm.dynCall_viiii.apply(null, arguments);
    }),
    (e.dynCall_viiiidi = function () {
      return e.asm.dynCall_viiiidi.apply(null, arguments);
    }),
    (e.dynCall_viiiif = function () {
      return e.asm.dynCall_viiiif.apply(null, arguments);
    }),
    (e.dynCall_viiiiffffii = function () {
      return e.asm.dynCall_viiiiffffii.apply(null, arguments);
    }),
    (e.dynCall_viiiiffiii = function () {
      return e.asm.dynCall_viiiiffiii.apply(null, arguments);
    }),
    (e.dynCall_viiiifi = function () {
      return e.asm.dynCall_viiiifi.apply(null, arguments);
    }),
    (e.dynCall_viiiififfi = function () {
      return e.asm.dynCall_viiiififfi.apply(null, arguments);
    }),
    (e.dynCall_viiiifii = function () {
      return e.asm.dynCall_viiiifii.apply(null, arguments);
    }),
    (e.dynCall_viiiifiifi = function () {
      return e.asm.dynCall_viiiifiifi.apply(null, arguments);
    }),
    (e.dynCall_viiiifiiii = function () {
      return e.asm.dynCall_viiiifiiii.apply(null, arguments);
    }),
    (e.dynCall_viiiifiiiii = function () {
      return e.asm.dynCall_viiiifiiiii.apply(null, arguments);
    }),
    (e.dynCall_viiiifiiiiif = function () {
      return e.asm.dynCall_viiiifiiiiif.apply(null, arguments);
    }),
    (e.dynCall_viiiifiiiiiiii = function () {
      return e.asm.dynCall_viiiifiiiiiiii.apply(null, arguments);
    }),
    (e.dynCall_viiiii = function () {
      return e.asm.dynCall_viiiii.apply(null, arguments);
    }),
    (e.dynCall_viiiiidi = function () {
      return e.asm.dynCall_viiiiidi.apply(null, arguments);
    }),
    (e.dynCall_viiiiif = function () {
      return e.asm.dynCall_viiiiif.apply(null, arguments);
    }),
    (e.dynCall_viiiiiffi = function () {
      return e.asm.dynCall_viiiiiffi.apply(null, arguments);
    }),
    (e.dynCall_viiiiiffii = function () {
      return e.asm.dynCall_viiiiiffii.apply(null, arguments);
    }),
    (e.dynCall_viiiiifi = function () {
      return e.asm.dynCall_viiiiifi.apply(null, arguments);
    }),
    (e.dynCall_viiiiii = function () {
      return e.asm.dynCall_viiiiii.apply(null, arguments);
    }),
    (e.dynCall_viiiiiif = function () {
      return e.asm.dynCall_viiiiiif.apply(null, arguments);
    }),
    (e.dynCall_viiiiiii = function () {
      return e.asm.dynCall_viiiiiii.apply(null, arguments);
    }),
    (e.dynCall_viiiiiiifi = function () {
      return e.asm.dynCall_viiiiiiifi.apply(null, arguments);
    }),
    (e.dynCall_viiiiiiii = function () {
      return e.asm.dynCall_viiiiiiii.apply(null, arguments);
    }),
    (e.dynCall_viiiiiiiii = function () {
      return e.asm.dynCall_viiiiiiiii.apply(null, arguments);
    }),
    (e.dynCall_viiiiiiiiii = function () {
      return e.asm.dynCall_viiiiiiiiii.apply(null, arguments);
    }),
    (e.dynCall_viiiiiiiiiii = function () {
      return e.asm.dynCall_viiiiiiiiiii.apply(null, arguments);
    }),
    (e.dynCall_viiiiiiiiiiifii = function () {
      return e.asm.dynCall_viiiiiiiiiiifii.apply(null, arguments);
    }),
    (e.dynCall_viiiiiiiiiiii = function () {
      return e.asm.dynCall_viiiiiiiiiiii.apply(null, arguments);
    }),
    (e.dynCall_viiiiiiiiiiiii = function () {
      return e.asm.dynCall_viiiiiiiiiiiii.apply(null, arguments);
    }),
    (e.dynCall_viiiiiiiiiiiiii = function () {
      return e.asm.dynCall_viiiiiiiiiiiiii.apply(null, arguments);
    }),
    (e.dynCall_viiiiiiiiiiiiiii = function () {
      return e.asm.dynCall_viiiiiiiiiiiiiii.apply(null, arguments);
    }),
    (e.dynCall_viiiiiiiiiiiiiiiiii = function () {
      return e.asm.dynCall_viiiiiiiiiiiiiiiiii.apply(null, arguments);
    }),
    (e.dynCall_viiiiiiiiiiiiiiiiiiiiii = function () {
      return e.asm.dynCall_viiiiiiiiiiiiiiiiiiiiii.apply(null, arguments);
    }),
    (e.dynCall_viiiij = function () {
      return e.asm.dynCall_viiiij.apply(null, arguments);
    }),
    (e.dynCall_viiiijiiii = function () {
      return e.asm.dynCall_viiiijiiii.apply(null, arguments);
    }),
    (e.dynCall_viiiji = function () {
      return e.asm.dynCall_viiiji.apply(null, arguments);
    }),
    (e.dynCall_viiijji = function () {
      return e.asm.dynCall_viiijji.apply(null, arguments);
    }),
    (e.dynCall_viij = function () {
      return e.asm.dynCall_viij.apply(null, arguments);
    }),
    (e.dynCall_viiji = function () {
      return e.asm.dynCall_viiji.apply(null, arguments);
    }),
    (e.dynCall_viijii = function () {
      return e.asm.dynCall_viijii.apply(null, arguments);
    }),
    (e.dynCall_viijiii = function () {
      return e.asm.dynCall_viijiii.apply(null, arguments);
    }),
    (e.dynCall_viijiijiii = function () {
      return e.asm.dynCall_viijiijiii.apply(null, arguments);
    }),
    (e.dynCall_viijijii = function () {
      return e.asm.dynCall_viijijii.apply(null, arguments);
    }),
    (e.dynCall_viijijiii = function () {
      return e.asm.dynCall_viijijiii.apply(null, arguments);
    }),
    (e.dynCall_viijijj = function () {
      return e.asm.dynCall_viijijj.apply(null, arguments);
    }),
    (e.dynCall_viijj = function () {
      return e.asm.dynCall_viijj.apply(null, arguments);
    }),
    (e.dynCall_viijji = function () {
      return e.asm.dynCall_viijji.apply(null, arguments);
    }),
    (e.dynCall_vij = function () {
      return e.asm.dynCall_vij.apply(null, arguments);
    }),
    (e.dynCall_viji = function () {
      return e.asm.dynCall_viji.apply(null, arguments);
    }),
    (e.dynCall_vijii = function () {
      return e.asm.dynCall_vijii.apply(null, arguments);
    }),
    (e.dynCall_vijiii = function () {
      return e.asm.dynCall_vijiii.apply(null, arguments);
    }),
    (e.dynCall_vijiji = function () {
      return e.asm.dynCall_vijiji.apply(null, arguments);
    }),
    (e.dynCall_vijji = function () {
      return e.asm.dynCall_vijji.apply(null, arguments);
    }),
    (e.dynCall_vijjii = function () {
      return e.asm.dynCall_vijjii.apply(null, arguments);
    }),
    (e.dynCall_vijjji = function () {
      return e.asm.dynCall_vijjji.apply(null, arguments);
    }),
    (e.dynCall_vji = function () {
      return e.asm.dynCall_vji.apply(null, arguments);
    }),
    (e.dynCall_vjiiii = function () {
      return e.asm.dynCall_vjiiii.apply(null, arguments);
    }),
    (e.dynCall_vjji = function () {
      return e.asm.dynCall_vjji.apply(null, arguments);
    });
  function Sb(e) {
    (this.name = "ExitStatus"),
      (this.message = "Program terminated with exit(" + e + ")"),
      (this.status = e);
  }
  (e.asm = Pm),
    (e.ccall = M),
    (e.cwrap = F),
    (e.stackTrace = re),
    (e.addRunDependency = cn),
    (e.removeRunDependency = sn),
    (e.FS_createPath = st.createPath),
    (e.FS_createDataFile = st.createDataFile),
    (Sb.prototype = new Error()),
    (Sb.prototype.constructor = Sb);
  function Ob(n) {
    function i() {
      e.calledRun ||
        ((e.calledRun = !0),
        G ||
          (We(),
          ze(),
          e.onRuntimeInitialized && e.onRuntimeInitialized(),
          e._main && jb && e.callMain(n),
          qe()));
    }
    (n = n || e.arguments),
      an > 0 ||
        (Ue(),
        an > 0 ||
          e.calledRun ||
          (e.setStatus
            ? (e.setStatus("Running..."),
              setTimeout(function () {
                setTimeout(function () {
                  e.setStatus("");
                }, 1),
                  i();
              }, 1))
            : i()));
  }
  function Tb(n, i) {
    (i && e.noExitRuntime && 0 === n) ||
      (e.noExitRuntime ||
        ((G = !0), n, (he = Mm), Ve(), e.onExit && e.onExit(n)),
      e.quit(n, new Sb(n)));
  }
  function t(n) {
    throw (
      (e.onAbort && e.onAbort(n),
      void 0 !== n ? (y(n), v(n), (n = JSON.stringify(n))) : (n = ""),
      (G = !0),
      1,
      "abort(" + n + "). Build with -s ASSERTIONS=1 for more info.")
    );
  }
  if (
    ((ln = function n() {
      e.calledRun || Ob(), e.calledRun || (ln = n);
    }),
    (e.callMain = function (n) {
      (n = n || []), We();
      var i = n.length + 1,
        t = kb(4 * (i + 1));
      se[t >> 2] = ne(e.thisProgram);
      for (var r = 1; r < i; r++) se[(t >> 2) + r] = ne(n[r - 1]);
      se[(t >> 2) + i] = 0;
      try {
        Tb(e._main(i, t, 0), !0);
      } catch (n) {
        if (n instanceof Sb) return;
        if ("SimulateInfiniteLoop" == n) return void (e.noExitRuntime = !0);
        var o = n;
        n && "object" == typeof n && n.stack && (o = [n, n.stack]),
          v("exception thrown: " + o),
          e.quit(1, n);
      } finally {
        !0;
      }
    }),
    (e.run = Ob),
    (e.abort = t),
    e.preInit)
  )
    for (
      "function" == typeof e.preInit && (e.preInit = [e.preInit]);
      e.preInit.length > 0;

    )
      e.preInit.pop()();
  var jb = !0;
  e.noInitialRun && (jb = !1), (e.noExitRuntime = !0), Ob();
}
