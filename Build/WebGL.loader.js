function createUnityInstance(e, r, n) {
  function t(e) {
    var r =
        "unhandledrejection" == e.type && "object" == typeof e.reason
          ? e.reason
          : "object" == typeof e.error
          ? e.error
          : null,
      n = r
        ? r.toString()
        : "string" == typeof e.message
        ? e.message
        : "string" == typeof e.reason
        ? e.reason
        : "";
    (r &&
      "string" == typeof r.stack &&
      (n +=
        "\n" +
        r.stack
          .substring(r.stack.lastIndexOf(n, 0) ? 0 : n.length)
          .replace(/(^\n*|\n*$)/g, "")),
    n && l.stackTraceRegExp && l.stackTraceRegExp.test(n)) &&
      a(
        n,
        e instanceof ErrorEvent
          ? e.filename
          : r && "string" == typeof r.fileName
          ? r.fileName
          : r && "string" == typeof r.sourceURL
          ? r.sourceURL
          : "",
        e instanceof ErrorEvent
          ? e.lineno
          : r && "number" == typeof r.lineNumber
          ? r.lineNumber
          : r && "number" == typeof r.line
          ? r.line
          : 0
      );
  }
  function o(e) {
    e.preventDefault();
  }
  function a(e, r, n) {
    l.startupErrorHandler
      ? l.startupErrorHandler(e, r, n)
      : (l.errorHandler && l.errorHandler(e, r, n)) ||
        (console.log("Invoking error handler due to\n" + e),
        "function" == typeof dump &&
          dump("Invoking error handler due to\n" + e),
        -1 != e.indexOf("UnknownError") ||
          -1 != e.indexOf("Program terminated with exit(0)") ||
          a.didShowErrorMessage) ||
        (-1 !=
        (e =
          "An error occurred running the Unity content on this page. See your browser JavaScript console for more info. The error was:\n" +
          e).indexOf("DISABLE_EXCEPTION_CATCHING")
          ? (e =
              "An exception has occurred, but exception handling has been disabled in this build. If you are the developer of this content, enable exceptions in your project WebGL player settings to be able to catch the exception or see the stack trace.")
          : -1 != e.indexOf("Cannot enlarge memory arrays")
          ? (e =
              "Out of memory. If you are the developer of this content, try allocating more memory to your WebGL build in the WebGL player settings.")
          : (-1 == e.indexOf("Invalid array buffer length") &&
              -1 == e.indexOf("Invalid typed array length") &&
              -1 == e.indexOf("out of memory") &&
              -1 == e.indexOf("could not allocate memory")) ||
            (e =
              "The browser could not allocate enough memory for the WebGL content. If you are the developer of this content, try allocating less memory to your WebGL build in the WebGL player settings."),
        alert(e),
        (a.didShowErrorMessage = !0));
  }
  function i(e, r) {
    if ("symbolsUrl" != e) {
      (d = l.downloadProgress[e]) ||
        (d = l.downloadProgress[e] =
          {
            started: !1,
            finished: !1,
            lengthComputable: !1,
            total: 0,
            loaded: 0,
          }),
        "object" != typeof r ||
          ("progress" != r.type && "load" != r.type) ||
          (d.started ||
            ((d.started = !0),
            (d.lengthComputable = r.lengthComputable),
            (d.total = r.total)),
          (d.loaded = r.loaded),
          "load" == r.type && (d.finished = !0));
      var t = 0,
        o = 0,
        a = 0,
        i = 0,
        s = 0;
      for (var e in l.downloadProgress) {
        var d;
        if (!(d = l.downloadProgress[e]).started) return 0;
        a++,
          d.lengthComputable
            ? ((t += d.loaded), (o += d.total), i++)
            : d.finished || s++;
      }
      n(0.9 * (a ? (a - s - (o ? (i * (o - t)) / o : 0)) / a : 0));
    }
  }
  function s() {
    new Promise(function (e, r) {
      var n = document.createElement("script");
      (n.src = l.frameworkUrl),
        (n.onload = function () {
          var r = unityFramework;
          (unityFramework = null), (n.onload = null), e(r);
        }),
        document.body.appendChild(n),
        l.deinitializers.push(function () {
          document.body.removeChild(n);
        });
    }).then(function (e) {
      e(l);
    });
    var e = (function (e) {
      return new Promise(function (r, n) {
        i(e);
        var t = new XMLHttpRequest();
        t.open("GET", l[e]),
          (t.responseType = "arraybuffer"),
          t.addEventListener("progress", function (r) {
            i(e, r);
          }),
          t.addEventListener("load", function (n) {
            i(e, n), r(new Uint8Array(t.response));
          }),
          t.send();
      });
    })("dataUrl");
    l.preRun.push(function () {
      l.addRunDependency("dataUrl"),
        e.then(function (e) {
          var r = new DataView(e.buffer, e.byteOffset, e.byteLength),
            n = 0,
            t = "UnityWebData1.0\0";
          if (
            !String.fromCharCode.apply(null, e.subarray(n, n + t.length)) == t
          )
            throw "unknown data format";
          n += t.length;
          var o = r.getUint32(n, !0);
          for (n += 4; n < o; ) {
            var a = r.getUint32(n, !0);
            n += 4;
            var i = r.getUint32(n, !0);
            n += 4;
            var s = r.getUint32(n, !0);
            n += 4;
            var d = String.fromCharCode.apply(null, e.subarray(n, n + s));
            n += s;
            for (
              var u = 0, c = d.indexOf("/", u) + 1;
              c > 0;
              u = c, c = d.indexOf("/", u) + 1
            )
              l.FS_createPath(d.substring(0, u), d.substring(u, c - 1), !0, !0);
            l.FS_createDataFile(d, null, e.subarray(a, a + i), !0, !0, !0);
          }
          l.removeRunDependency("dataUrl");
        });
    });
  }
  n = n || function () {};
  var l = {
    canvas: e,
    webglContextAttributes: { preserveDrawingBuffer: !1 },
    streamingAssetsUrl: "StreamingAssets",
    downloadProgress: {},
    deinitializers: [],
    intervals: {},
    setInterval: function (e, r) {
      var n = window.setInterval(e, r);
      return (this.intervals[n] = !0), n;
    },
    clearInterval: function (e) {
      delete this.intervals[e], window.clearInterval(e);
    },
    preRun: [],
    postRun: [],
    print: function (e) {
      console.log(e);
    },
    printErr: function (e) {
      console.error(e);
    },
    locateFile: function (e) {
      return "build.wasm" == e ? this.codeUrl : e;
    },
    disabledCanvasEvents: ["contextmenu", "dragstart"],
  };
  for (var d in r) l[d] = r[d];
  l.streamingAssetsUrl = new URL(l.streamingAssetsUrl, document.URL).href;
  var u = l.disabledCanvasEvents.slice();
  u.forEach(function (r) {
    e.addEventListener(r, o);
  }),
    window.addEventListener("error", t),
    window.addEventListener("unhandledrejection", t);
  var c = {
    Module: l,
    SetFullscreen: function () {
      return l.SetFullscreen
        ? l.SetFullscreen.apply(l, arguments)
        : void l.print("Failed to set Fullscreen mode: Player not loaded yet.");
    },
    SendMessage: function () {
      return l.SendMessage
        ? l.SendMessage.apply(l, arguments)
        : void l.print("Failed to execute SendMessage: Player not loaded yet.");
    },
    Quit: function () {
      return new Promise(function (r, n) {
        (l.shouldQuit = !0),
          (l.onQuit = r),
          u.forEach(function (r) {
            e.removeEventListener(r, o);
          }),
          window.removeEventListener("error", t),
          window.removeEventListener("unhandledrejection", t);
      });
    },
  };
  return (
    (l.SystemInfo = (function () {
      function e(e, r, n) {
        return (e = RegExp(e, "i").exec(r)) && e[n];
      }
      for (
        var r,
          n,
          t,
          o,
          a,
          i,
          s = navigator.userAgent + " ",
          l = [
            ["Firefox", "Firefox"],
            ["OPR", "Opera"],
            ["Edg", "Edge"],
            ["SamsungBrowser", "Samsung Browser"],
            ["Trident", "Internet Explorer"],
            ["MSIE", "Internet Explorer"],
            ["Chrome", "Chrome"],
            ["CriOS", "Chrome on iOS Safari"],
            ["FxiOS", "Firefox on iOS Safari"],
            ["Safari", "Safari"],
          ],
          d = 0;
        d < l.length;
        ++d
      )
        if ((n = e(l[d][0] + "[/ ](.*?)[ \\)]", s, 1))) {
          r = l[d][1];
          break;
        }
      "Safari" == r && (n = e("Version/(.*?) ", s, 1)),
        "Internet Explorer" == r && (n = e("rv:(.*?)\\)? ", s, 1) || n);
      for (
        var u = [
            ["Windows (.*?)[;)]", "Windows"],
            ["Android ([0-9_.]+)", "Android"],
            ["iPhone OS ([0-9_.]+)", "iPhoneOS"],
            ["iPad.*? OS ([0-9_.]+)", "iPadOS"],
            ["FreeBSD( )", "FreeBSD"],
            ["OpenBSD( )", "OpenBSD"],
            ["Linux|X11()", "Linux"],
            ["Mac OS X ([0-9_.]+)", "macOS"],
            ["bot|google|baidu|bing|msn|teoma|slurp|yandex", "Search Bot"],
          ],
          c = 0;
        c < u.length;
        ++c
      )
        if ((o = e(u[c][0], s, 1))) {
          (t = u[c][1]), (o = o.replace(/_/g, "."));
          break;
        }
      (o =
        {
          "NT 5.0": "2000",
          "NT 5.1": "XP",
          "NT 5.2": "Server 2003",
          "NT 6.0": "Vista",
          "NT 6.1": "7",
          "NT 6.2": "8",
          "NT 6.3": "8.1",
          "NT 10.0": "10",
        }[o] || o),
        (a = document.createElement("canvas")) &&
          ((gl = a.getContext("webgl2")),
          (glVersion = gl ? 2 : 0),
          gl || ((gl = a && a.getContext("webgl")) && (glVersion = 1)),
          gl &&
            (i =
              (gl.getExtension("WEBGL_debug_renderer_info") &&
                gl.getParameter(37446)) ||
              gl.getParameter(7937)));
      var f = "undefined" != typeof SharedArrayBuffer,
        g =
          "object" == typeof WebAssembly &&
          "function" == typeof WebAssembly.compile;
      return {
        width: screen.width,
        height: screen.height,
        userAgent: s.trim(),
        browser: r || "Unknown browser",
        browserVersion: n || "Unknown version",
        mobile: /Mobile|Android|iP(ad|hone)/.test(navigator.appVersion),
        os: t || "Unknown OS",
        osVersion: o || "Unknown OS Version",
        gpu: i || "Unknown GPU",
        language: navigator.userLanguage || navigator.language,
        hasWebGL: glVersion,
        hasCursorLock: !!document.body.requestPointerLock,
        hasFullscreen: !!document.body.requestFullscreen,
        hasThreads: f,
        hasWasm: g,
        hasWasmThreads: !1,
      };
    })()),
    (l.abortHandler = function (e) {
      return a(e, "", 0), !0;
    }),
    (Error.stackTraceLimit = Math.max(Error.stackTraceLimit || 0, 50)),
    new Promise(function (e, r) {
      l.SystemInfo.hasWebGL
        ? l.SystemInfo.hasWasm
          ? (1 == l.SystemInfo.hasWebGL &&
              l.print(
                'Warning: Your browser does not support "WebGL 2.0" Graphics API, switching to "WebGL 1.0"'
              ),
            (l.startupErrorHandler = r),
            n(0),
            l.postRun.push(function () {
              n(1), delete l.startupErrorHandler, e(c);
            }),
            s())
          : r("Your browser does not support WebAssembly.")
        : r("Your browser does not support WebGL.");
    })
  );
}
