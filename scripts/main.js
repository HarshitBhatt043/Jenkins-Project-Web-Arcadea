"use strict";
window.DOMHandler = class {
  constructor(b, d) {
    this._iRuntime = b;
    this._componentId = d;
    this._hasTickCallback = !1;
    this._tickCallback = () => this.Tick();
  }
  Attach() {}
  PostToRuntime(b, d, k, p) {
    this._iRuntime.PostToRuntimeComponent(this._componentId, b, d, k, p);
  }
  PostToRuntimeAsync(b, d, k, p) {
    return this._iRuntime.PostToRuntimeComponentAsync(
      this._componentId,
      b,
      d,
      k,
      p
    );
  }
  _PostToRuntimeMaybeSync(b, d, k) {
    this._iRuntime.UsesWorker()
      ? this.PostToRuntime(b, d, k)
      : this._iRuntime
          ._GetLocalRuntime()
          ._OnMessageFromDOM({
            type: "event",
            component: this._componentId,
            handler: b,
            dispatchOpts: k || null,
            data: d,
            responseId: null,
          });
  }
  AddRuntimeMessageHandler(b, d) {
    this._iRuntime.AddRuntimeComponentMessageHandler(this._componentId, b, d);
  }
  AddRuntimeMessageHandlers(b) {
    for (const [d, k] of b) this.AddRuntimeMessageHandler(d, k);
  }
  GetRuntimeInterface() {
    return this._iRuntime;
  }
  GetComponentID() {
    return this._componentId;
  }
  _StartTicking() {
    this._hasTickCallback ||
      (this._iRuntime._AddRAFCallback(this._tickCallback),
      (this._hasTickCallback = !0));
  }
  _StopTicking() {
    this._hasTickCallback &&
      (this._iRuntime._RemoveRAFCallback(this._tickCallback),
      (this._hasTickCallback = !1));
  }
  Tick() {}
};
window.RateLimiter = class {
  constructor(b, d) {
    this._callback = b;
    this._interval = d;
    this._timerId = -1;
    this._lastCallTime = -Infinity;
    this._timerCallFunc = () => this._OnTimer();
    this._canRunImmediate = this._ignoreReset = !1;
  }
  SetCanRunImmediate(b) {
    this._canRunImmediate = !!b;
  }
  Call() {
    if (-1 === this._timerId) {
      var b = Date.now(),
        d = b - this._lastCallTime,
        k = this._interval;
      d >= k && this._canRunImmediate
        ? ((this._lastCallTime = b), this._RunCallback())
        : (this._timerId = self.setTimeout(
            this._timerCallFunc,
            Math.max(k - d, 4)
          ));
    }
  }
  _RunCallback() {
    this._ignoreReset = !0;
    this._callback();
    this._ignoreReset = !1;
  }
  Reset() {
    this._ignoreReset ||
      (this._CancelTimer(), (this._lastCallTime = Date.now()));
  }
  _OnTimer() {
    this._timerId = -1;
    this._lastCallTime = Date.now();
    this._RunCallback();
  }
  _CancelTimer() {
    -1 !== this._timerId &&
      (self.clearTimeout(this._timerId), (this._timerId = -1));
  }
  Release() {
    this._CancelTimer();
    this._timerCallFunc = this._callback = null;
  }
};
("use strict");
window.DOMElementHandler = class extends self.DOMHandler {
  constructor(b, d) {
    super(b, d);
    this._elementMap = new Map();
    this._autoAttach = !0;
    this.AddRuntimeMessageHandlers([
      ["create", (k) => this._OnCreate(k)],
      ["destroy", (k) => this._OnDestroy(k)],
      ["set-visible", (k) => this._OnSetVisible(k)],
      ["update-position", (k) => this._OnUpdatePosition(k)],
      ["update-state", (k) => this._OnUpdateState(k)],
      ["focus", (k) => this._OnSetFocus(k)],
      ["set-css-style", (k) => this._OnSetCssStyle(k)],
      ["set-attribute", (k) => this._OnSetAttribute(k)],
      ["remove-attribute", (k) => this._OnRemoveAttribute(k)],
    ]);
    this.AddDOMElementMessageHandler("get-element", (k) => k);
  }
  SetAutoAttach(b) {
    this._autoAttach = !!b;
  }
  AddDOMElementMessageHandler(b, d) {
    this.AddRuntimeMessageHandler(b, (k) => {
      const p = this._elementMap.get(k.elementId);
      return d(p, k);
    });
  }
  _OnCreate(b) {
    const d = b.elementId,
      k = this.CreateElement(d, b);
    this._elementMap.set(d, k);
    k.style.boxSizing = "border-box";
    b.isVisible || (k.style.display = "none");
    b = this._GetFocusElement(k);
    b.addEventListener("focus", (p) => this._OnFocus(d));
    b.addEventListener("blur", (p) => this._OnBlur(d));
    this._autoAttach && document.body.appendChild(k);
  }
  CreateElement(b, d) {
    throw Error("required override");
  }
  DestroyElement(b) {}
  _OnDestroy(b) {
    b = b.elementId;
    const d = this._elementMap.get(b);
    this.DestroyElement(d);
    this._autoAttach && d.parentElement.removeChild(d);
    this._elementMap.delete(b);
  }
  PostToRuntimeElement(b, d, k) {
    k || (k = {});
    k.elementId = d;
    this.PostToRuntime(b, k);
  }
  _PostToRuntimeElementMaybeSync(b, d, k) {
    k || (k = {});
    k.elementId = d;
    this._PostToRuntimeMaybeSync(b, k);
  }
  _OnSetVisible(b) {
    this._autoAttach &&
      (this._elementMap.get(b.elementId).style.display = b.isVisible
        ? ""
        : "none");
  }
  _OnUpdatePosition(b) {
    if (this._autoAttach) {
      var d = this._elementMap.get(b.elementId);
      d.style.left = b.left + "px";
      d.style.top = b.top + "px";
      d.style.width = b.width + "px";
      d.style.height = b.height + "px";
      b = b.fontSize;
      null !== b && (d.style.fontSize = b + "em");
    }
  }
  _OnUpdateState(b) {
    const d = this._elementMap.get(b.elementId);
    this.UpdateState(d, b);
  }
  UpdateState(b, d) {
    throw Error("required override");
  }
  _GetFocusElement(b) {
    return b;
  }
  _OnFocus(b) {
    this.PostToRuntimeElement("elem-focused", b);
  }
  _OnBlur(b) {
    this.PostToRuntimeElement("elem-blurred", b);
  }
  _OnSetFocus(b) {
    const d = this._GetFocusElement(this._elementMap.get(b.elementId));
    b.focus ? d.focus() : d.blur();
  }
  _OnSetCssStyle(b) {
    this._elementMap.get(b.elementId).style[b.prop] = b.val;
  }
  _OnSetAttribute(b) {
    this._elementMap.get(b.elementId).setAttribute(b.name, b.val);
  }
  _OnRemoveAttribute(b) {
    this._elementMap.get(b.elementId).removeAttribute(b.name);
  }
  GetElementById(b) {
    return this._elementMap.get(b);
  }
};
("use strict");
{
  const b = /(iphone|ipod|ipad|macos|macintosh|mac os x)/i.test(
    navigator.userAgent
  );
  let d = 0;
  function k(c) {
    const a = document.createElement("script");
    a.async = !1;
    a.type = "module";
    return c.isStringSrc
      ? new Promise((f) => {
          const g = "c3_resolve_" + d;
          ++d;
          self[g] = f;
          a.textContent = c.str + `\n\nself["${g}"]();`;
          document.head.appendChild(a);
        })
      : new Promise((f, g) => {
          a.onload = f;
          a.onerror = g;
          a.src = c;
          document.head.appendChild(a);
        });
  }
  let p = !1,
    z = !1;
  function y() {
    if (!p) {
      try {
        new Worker("blob://", {
          get type() {
            z = !0;
          },
        });
      } catch (c) {}
      p = !0;
    }
    return z;
  }
  let w = new Audio();
  const q = {
    "audio/webm; codecs=opus": !!w.canPlayType("audio/webm; codecs=opus"),
    "audio/ogg; codecs=opus": !!w.canPlayType("audio/ogg; codecs=opus"),
    "audio/webm; codecs=vorbis": !!w.canPlayType("audio/webm; codecs=vorbis"),
    "audio/ogg; codecs=vorbis": !!w.canPlayType("audio/ogg; codecs=vorbis"),
    "audio/mp4": !!w.canPlayType("audio/mp4"),
    "audio/mpeg": !!w.canPlayType("audio/mpeg"),
  };
  w = null;
  async function u(c) {
    c = await m(c);
    return new TextDecoder("utf-8").decode(c);
  }
  function m(c) {
    return new Promise((a, f) => {
      const g = new FileReader();
      g.onload = (v) => a(v.target.result);
      g.onerror = (v) => f(v);
      g.readAsArrayBuffer(c);
    });
  }
  const A = [];
  let D = 0;
  window.RealFile = window.File;
  const x = [],
    r = new Map(),
    h = new Map();
  let e = 0;
  const l = [];
  self.runOnStartup = function (c) {
    if ("function" !== typeof c)
      throw Error("runOnStartup called without a function");
    l.push(c);
  };
  const n = new Set(["cordova", "playable-ad", "instant-games"]);
  function t(c) {
    return n.has(c);
  }
  let F = !1;
  window.RuntimeInterface = class c {
    constructor(a) {
      this._useWorker = a.useWorker;
      this._messageChannelPort = null;
      this._baseUrl = "";
      this._scriptFolder = a.scriptFolder;
      this._workerScriptURLs = {};
      this._localRuntime = this._worker = null;
      this._domHandlers = [];
      this._jobScheduler = this._canvas = this._runtimeDomHandler = null;
      this._rafId = -1;
      this._rafFunc = () => this._OnRAFCallback();
      this._rafCallbacks = [];
      this._exportType = a.exportType;
      this._isFileProtocol = "file" === location.protocol.substr(0, 4);
      !this._useWorker ||
        ("undefined" !== typeof OffscreenCanvas &&
          navigator.userActivation &&
          y()) ||
        (this._useWorker = !1);
      if (
        "playable-ad" === this._exportType ||
        "instant-games" === this._exportType
      )
        this._useWorker = !1;
      if ("cordova" === this._exportType && this._useWorker)
        if (/android/i.test(navigator.userAgent)) {
          const f = /Chrome\/(\d+)/i.exec(navigator.userAgent);
          (f && 90 <= parseInt(f[1], 10)) || (this._useWorker = !1);
        } else this._useWorker = !1;
      this._localFileStrings = this._localFileBlobs = null;
      ("html5" !== this._exportType && "playable-ad" !== this._exportType) ||
        !this._isFileProtocol ||
        alert(
          "Exported games won't work until you upload them. (When running on the file: protocol, browsers block many features from working for security reasons.)"
        );
      "html5" !== this._exportType ||
        window.isSecureContext ||
        console.warn(
          "[Construct 3] Warning: the browser indicates this is not a secure context. Some features may be unavailable. Use secure (HTTPS) hosting to ensure all features are available."
        );
      this.AddRuntimeComponentMessageHandler(
        "runtime",
        "cordova-fetch-local-file",
        (f) => this._OnCordovaFetchLocalFile(f)
      );
      this.AddRuntimeComponentMessageHandler(
        "runtime",
        "create-job-worker",
        (f) => this._OnCreateJobWorker(f)
      );
      "cordova" === this._exportType
        ? document.addEventListener("deviceready", () => this._Init(a))
        : this._Init(a);
    }
    Release() {
      this._CancelAnimationFrame();
      this._messageChannelPort &&
        (this._messageChannelPort = this._messageChannelPort.onmessage = null);
      this._worker && (this._worker.terminate(), (this._worker = null));
      this._localRuntime &&
        (this._localRuntime.Release(), (this._localRuntime = null));
      this._canvas &&
        (this._canvas.parentElement.removeChild(this._canvas),
        (this._canvas = null));
    }
    GetCanvas() {
      return this._canvas;
    }
    GetBaseURL() {
      return this._baseUrl;
    }
    UsesWorker() {
      return this._useWorker;
    }
    GetExportType() {
      return this._exportType;
    }
    IsFileProtocol() {
      return this._isFileProtocol;
    }
    GetScriptFolder() {
      return this._scriptFolder;
    }
    IsiOSCordova() {
      return b && "cordova" === this._exportType;
    }
    IsiOSWebView() {
      const a = navigator.userAgent;
      return (
        (b && t(this._exportType)) ||
        navigator.standalone ||
        /crios\/|fxios\/|edgios\//i.test(a)
      );
    }
    async _Init(a) {
      "macos-wkwebview" === this._exportType &&
        this._SendWrapperMessage({ type: "ready" });
      if ("playable-ad" === this._exportType) {
        this._localFileBlobs = self.c3_base64files;
        this._localFileStrings = {};
        await this._ConvertDataUrisToBlobs();
        for (let g = 0, v = a.engineScripts.length; g < v; ++g) {
          var f = a.engineScripts[g].toLowerCase();
          this._localFileStrings.hasOwnProperty(f)
            ? (a.engineScripts[g] = {
                isStringSrc: !0,
                str: this._localFileStrings[f],
              })
            : this._localFileBlobs.hasOwnProperty(f) &&
              (a.engineScripts[g] = URL.createObjectURL(
                this._localFileBlobs[f]
              ));
        }
      }
      a.baseUrl
        ? (this._baseUrl = a.baseUrl)
        : ((f = location.origin),
          (this._baseUrl = ("null" === f ? "file:///" : f) + location.pathname),
          (f = this._baseUrl.lastIndexOf("/")),
          -1 !== f && (this._baseUrl = this._baseUrl.substr(0, f + 1)));
      a.workerScripts && (this._workerScriptURLs = a.workerScripts);
      f = new MessageChannel();
      this._messageChannelPort = f.port1;
      this._messageChannelPort.onmessage = (g) =>
        this._OnMessageFromRuntime(g.data);
      window.c3_addPortMessageHandler &&
        window.c3_addPortMessageHandler((g) => this._OnMessageFromDebugger(g));
      this._jobScheduler = new self.JobSchedulerDOM(this);
      await this._jobScheduler.Init();
      "object" === typeof window.StatusBar && window.StatusBar.hide();
      "object" === typeof window.AndroidFullScreen &&
        window.AndroidFullScreen.immersiveMode();
      this._useWorker
        ? await this._InitWorker(a, f.port2)
        : await this._InitDOM(a, f.port2);
    }
    _GetWorkerURL(a) {
      a = this._workerScriptURLs.hasOwnProperty(a)
        ? this._workerScriptURLs[a]
        : a.endsWith("/workermain.js") &&
          this._workerScriptURLs.hasOwnProperty("workermain.js")
        ? this._workerScriptURLs["workermain.js"]
        : "playable-ad" === this._exportType &&
          this._localFileBlobs.hasOwnProperty(a.toLowerCase())
        ? this._localFileBlobs[a.toLowerCase()]
        : a;
      a instanceof Blob && (a = URL.createObjectURL(a));
      return a;
    }
    async CreateWorker(a, f, g) {
      if (a.startsWith("blob:")) return new Worker(a, g);
      if ("cordova" === this._exportType && this._isFileProtocol)
        return (
          (a = await this.CordovaFetchLocalFileAsArrayBuffer(
            g.isC3MainWorker ? a : this._scriptFolder + a
          )),
          (a = new Blob([a], { type: "application/javascript" })),
          new Worker(URL.createObjectURL(a), g)
        );
      a = new URL(a, f);
      if (location.origin !== a.origin) {
        a = await fetch(a);
        if (!a.ok) throw Error("failed to fetch worker script");
        a = await a.blob();
        return new Worker(URL.createObjectURL(a), g);
      }
      return new Worker(a, g);
    }
    _GetWindowInnerWidth() {
      return Math.max(window.innerWidth, 1);
    }
    _GetWindowInnerHeight() {
      return Math.max(window.innerHeight, 1);
    }
    _GetCommonRuntimeOptions(a) {
      return {
        baseUrl: this._baseUrl,
        windowInnerWidth: this._GetWindowInnerWidth(),
        windowInnerHeight: this._GetWindowInnerHeight(),
        devicePixelRatio: window.devicePixelRatio,
        isFullscreen: c.IsDocumentFullscreen(),
        projectData: a.projectData,
        previewImageBlobs: window.cr_previewImageBlobs || this._localFileBlobs,
        previewProjectFileBlobs: window.cr_previewProjectFileBlobs,
        previewProjectFileSWUrls: window.cr_previewProjectFiles,
        swClientId: window.cr_swClientId || "",
        exportType: a.exportType,
        isDebug: -1 < self.location.search.indexOf("debug"),
        ife: !!self.ife,
        jobScheduler: this._jobScheduler.GetPortData(),
        supportedAudioFormats: q,
        opusWasmScriptUrl:
          window.cr_opusWasmScriptUrl || this._scriptFolder + "opus.wasm.js",
        opusWasmBinaryUrl:
          window.cr_opusWasmBinaryUrl || this._scriptFolder + "opus.wasm.wasm",
        isFileProtocol: this._isFileProtocol,
        isiOSCordova: this.IsiOSCordova(),
        isiOSWebView: this.IsiOSWebView(),
        isFBInstantAvailable: "undefined" !== typeof self.FBInstant,
      };
    }
    async _InitWorker(a, f) {
      var g = this._GetWorkerURL(a.workerMainUrl);
      this._worker = await this.CreateWorker(g, this._baseUrl, {
        type: "module",
        name: "Runtime",
        isC3MainWorker: !0,
      });
      this._canvas = document.createElement("canvas");
      this._canvas.style.display = "none";
      g = this._canvas.transferControlToOffscreen();
      document.body.appendChild(this._canvas);
      window.c3canvas = this._canvas;
      let v = a.workerDependencyScripts || [],
        C = a.engineScripts;
      v = await Promise.all(v.map((B) => this._MaybeGetCordovaScriptURL(B)));
      C = await Promise.all(C.map((B) => this._MaybeGetCordovaScriptURL(B)));
      if ("cordova" === this._exportType)
        for (let B = 0, E = a.projectScripts.length; B < E; ++B) {
          const G = a.projectScripts[B],
            H = G[0];
          if (
            H === a.mainProjectScript ||
            "scriptsInEvents.js" === H ||
            H.endsWith("/scriptsInEvents.js")
          )
            G[1] = await this._MaybeGetCordovaScriptURL(H);
        }
      this._worker.postMessage(
        Object.assign(this._GetCommonRuntimeOptions(a), {
          type: "init-runtime",
          isInWorker: !0,
          messagePort: f,
          canvas: g,
          workerDependencyScripts: v,
          engineScripts: C,
          projectScripts: a.projectScripts,
          mainProjectScript: a.mainProjectScript,
          projectScriptsStatus: self.C3_ProjectScriptsStatus,
        }),
        [f, g, ...this._jobScheduler.GetPortTransferables()]
      );
      this._domHandlers = x.map((B) => new B(this));
      this._FindRuntimeDOMHandler();
      self.c3_callFunction = (B, E) =>
        this._runtimeDomHandler._InvokeFunctionFromJS(B, E);
      "preview" === this._exportType &&
        (self.goToLastErrorScript = () =>
          this.PostToRuntimeComponent("runtime", "go-to-last-error-script"));
    }
    async _InitDOM(a, f) {
      this._canvas = document.createElement("canvas");
      this._canvas.style.display = "none";
      document.body.appendChild(this._canvas);
      window.c3canvas = this._canvas;
      this._domHandlers = x.map((B) => new B(this));
      this._FindRuntimeDOMHandler();
      var g = a.engineScripts.map((B) =>
        "string" === typeof B ? new URL(B, this._baseUrl).toString() : B
      );
      Array.isArray(a.workerDependencyScripts) &&
        g.unshift(...a.workerDependencyScripts);
      g = await Promise.all(g.map((B) => this._MaybeGetCordovaScriptURL(B)));
      await Promise.all(g.map((B) => k(B)));
      g = self.C3_ProjectScriptsStatus;
      const v = a.mainProjectScript,
        C = a.projectScripts;
      for (let [B, E] of C)
        if ((E || (E = B), B === v))
          try {
            (E = await this._MaybeGetCordovaScriptURL(E)),
              await k(E),
              "preview" !== this._exportType ||
                g[B] ||
                this._ReportProjectMainScriptError(
                  B,
                  "main script did not run to completion"
                );
          } catch (G) {
            this._ReportProjectMainScriptError(B, G);
          }
        else if (
          "scriptsInEvents.js" === B ||
          B.endsWith("/scriptsInEvents.js")
        )
          (E = await this._MaybeGetCordovaScriptURL(E)), await k(E);
      "preview" === this._exportType &&
      "object" !== typeof self.C3.ScriptsInEvents
        ? (this._RemoveLoadingMessage(),
          console.error(
            "[C3 runtime] Failed to load JavaScript code used in events. Check all your JavaScript code has valid syntax."
          ),
          alert(
            "Failed to load JavaScript code used in events. Check all your JavaScript code has valid syntax."
          ))
        : ((a = Object.assign(this._GetCommonRuntimeOptions(a), {
            isInWorker: !1,
            messagePort: f,
            canvas: this._canvas,
            runOnStartupFunctions: l,
          })),
          this._OnBeforeCreateRuntime(),
          (this._localRuntime = self.C3_CreateRuntime(a)),
          await self.C3_InitRuntime(this._localRuntime, a));
    }
    _ReportProjectMainScriptError(a, f) {
      this._RemoveLoadingMessage();
      console.error(`[Preview] Failed to load project main script (${a}): `, f);
      alert(
        `Failed to load project main script (${a}). Check all your JavaScript code has valid syntax. Press F12 and check the console for error details.`
      );
    }
    _OnBeforeCreateRuntime() {
      this._RemoveLoadingMessage();
    }
    _RemoveLoadingMessage() {
      const a = window.cr_previewLoadingElem;
      a &&
        (a.parentElement.removeChild(a), (window.cr_previewLoadingElem = null));
    }
    async _OnCreateJobWorker(a) {
      a = await this._jobScheduler._CreateJobWorker();
      return { outputPort: a, transferables: [a] };
    }
    _GetLocalRuntime() {
      if (this._useWorker) throw Error("not available in worker mode");
      return this._localRuntime;
    }
    PostToRuntimeComponent(a, f, g, v, C) {
      this._messageChannelPort.postMessage(
        {
          type: "event",
          component: a,
          handler: f,
          dispatchOpts: v || null,
          data: g,
          responseId: null,
        },
        C
      );
    }
    PostToRuntimeComponentAsync(a, f, g, v, C) {
      const B = e++,
        E = new Promise((G, H) => {
          h.set(B, { resolve: G, reject: H });
        });
      this._messageChannelPort.postMessage(
        {
          type: "event",
          component: a,
          handler: f,
          dispatchOpts: v || null,
          data: g,
          responseId: B,
        },
        C
      );
      return E;
    }
    ["_OnMessageFromRuntime"](a) {
      const f = a.type;
      if ("event" === f) return this._OnEventFromRuntime(a);
      if ("result" === f) this._OnResultFromRuntime(a);
      else if ("runtime-ready" === f) this._OnRuntimeReady();
      else if ("alert-error" === f)
        this._RemoveLoadingMessage(), alert(a.message);
      else if ("creating-runtime" === f) this._OnBeforeCreateRuntime();
      else throw Error(`unknown message '${f}'`);
    }
    _OnEventFromRuntime(a) {
      const f = a.component,
        g = a.handler,
        v = a.data,
        C = a.responseId;
      if ((a = r.get(f)))
        if ((a = a.get(g))) {
          var B = null;
          try {
            B = a(v);
          } catch (E) {
            console.error(`Exception in '${f}' handler '${g}':`, E);
            null !== C && this._PostResultToRuntime(C, !1, "" + E);
            return;
          }
          if (null === C) return B;
          B && B.then
            ? B.then((E) => this._PostResultToRuntime(C, !0, E)).catch((E) => {
                console.error(`Rejection from '${f}' handler '${g}':`, E);
                this._PostResultToRuntime(C, !1, "" + E);
              })
            : this._PostResultToRuntime(C, !0, B);
        } else console.warn(`[DOM] No handler '${g}' for component '${f}'`);
      else console.warn(`[DOM] No event handlers for component '${f}'`);
    }
    _PostResultToRuntime(a, f, g) {
      let v;
      g && g.transferables && (v = g.transferables);
      this._messageChannelPort.postMessage(
        { type: "result", responseId: a, isOk: f, result: g },
        v
      );
    }
    _OnResultFromRuntime(a) {
      const f = a.responseId,
        g = a.isOk;
      a = a.result;
      const v = h.get(f);
      g ? v.resolve(a) : v.reject(a);
      h.delete(f);
    }
    AddRuntimeComponentMessageHandler(a, f, g) {
      let v = r.get(a);
      v || ((v = new Map()), r.set(a, v));
      if (v.has(f))
        throw Error(`[DOM] Component '${a}' already has handler '${f}'`);
      v.set(f, g);
    }
    static AddDOMHandlerClass(a) {
      if (x.includes(a)) throw Error("DOM handler already added");
      x.push(a);
    }
    _FindRuntimeDOMHandler() {
      for (const a of this._domHandlers)
        if ("runtime" === a.GetComponentID()) {
          this._runtimeDomHandler = a;
          return;
        }
      throw Error("cannot find runtime DOM handler");
    }
    _OnMessageFromDebugger(a) {
      this.PostToRuntimeComponent("debugger", "message", a);
    }
    _OnRuntimeReady() {
      for (const a of this._domHandlers) a.Attach();
    }
    static IsDocumentFullscreen() {
      return !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        F
      );
    }
    static _SetWrapperIsFullscreenFlag(a) {
      F = !!a;
    }
    async GetRemotePreviewStatusInfo() {
      return await this.PostToRuntimeComponentAsync(
        "runtime",
        "get-remote-preview-status-info"
      );
    }
    _AddRAFCallback(a) {
      this._rafCallbacks.push(a);
      this._RequestAnimationFrame();
    }
    _RemoveRAFCallback(a) {
      a = this._rafCallbacks.indexOf(a);
      if (-1 === a) throw Error("invalid callback");
      this._rafCallbacks.splice(a, 1);
      this._rafCallbacks.length || this._CancelAnimationFrame();
    }
    _RequestAnimationFrame() {
      -1 === this._rafId &&
        this._rafCallbacks.length &&
        (this._rafId = requestAnimationFrame(this._rafFunc));
    }
    _CancelAnimationFrame() {
      -1 !== this._rafId &&
        (cancelAnimationFrame(this._rafId), (this._rafId = -1));
    }
    _OnRAFCallback() {
      this._rafId = -1;
      for (const a of this._rafCallbacks) a();
      this._RequestAnimationFrame();
    }
    TryPlayMedia(a) {
      this._runtimeDomHandler.TryPlayMedia(a);
    }
    RemovePendingPlay(a) {
      this._runtimeDomHandler.RemovePendingPlay(a);
    }
    _PlayPendingMedia() {
      this._runtimeDomHandler._PlayPendingMedia();
    }
    SetSilent(a) {
      this._runtimeDomHandler.SetSilent(a);
    }
    IsAudioFormatSupported(a) {
      return !!q[a];
    }
    async _WasmDecodeWebMOpus(a) {
      a = await this.PostToRuntimeComponentAsync(
        "runtime",
        "opus-decode",
        { arrayBuffer: a },
        null,
        [a]
      );
      return new Float32Array(a);
    }
    IsAbsoluteURL(a) {
      return (
        /^(?:[a-z\-]+:)?\/\//.test(a) ||
        "data:" === a.substr(0, 5) ||
        "blob:" === a.substr(0, 5)
      );
    }
    IsRelativeURL(a) {
      return !this.IsAbsoluteURL(a);
    }
    async _MaybeGetCordovaScriptURL(a) {
      return "cordova" === this._exportType &&
        (a.startsWith("file:") ||
          (this._isFileProtocol && this.IsRelativeURL(a)))
        ? (a.startsWith(this._baseUrl) && (a = a.substr(this._baseUrl.length)),
          (a = await this.CordovaFetchLocalFileAsArrayBuffer(a)),
          (a = new Blob([a], { type: "application/javascript" })),
          URL.createObjectURL(a))
        : a;
    }
    async _OnCordovaFetchLocalFile(a) {
      const f = a.filename;
      switch (a.as) {
        case "text":
          return await this.CordovaFetchLocalFileAsText(f);
        case "buffer":
          return await this.CordovaFetchLocalFileAsArrayBuffer(f);
        default:
          throw Error("unsupported type");
      }
    }
    _GetPermissionAPI() {
      const a =
        window.cordova &&
        window.cordova.plugins &&
        window.cordova.plugins.permissions;
      if ("object" !== typeof a) throw Error("Permission API is not loaded");
      return a;
    }
    _MapPermissionID(a, f) {
      a = a[f];
      if ("string" !== typeof a) throw Error("Invalid permission name");
      return a;
    }
    _HasPermission(a) {
      const f = this._GetPermissionAPI();
      return new Promise((g, v) =>
        f.checkPermission(
          this._MapPermissionID(f, a),
          (C) => g(!!C.hasPermission),
          v
        )
      );
    }
    _RequestPermission(a) {
      const f = this._GetPermissionAPI();
      return new Promise((g, v) =>
        f.requestPermission(
          this._MapPermissionID(f, a),
          (C) => g(!!C.hasPermission),
          v
        )
      );
    }
    async RequestPermissions(a) {
      if ("cordova" !== this.GetExportType() || this.IsiOSCordova()) return !0;
      for (const f of a)
        if (
          !(await this._HasPermission(f)) &&
          !1 === (await this._RequestPermission(f))
        )
          return !1;
      return !0;
    }
    async RequirePermissions(...a) {
      if (!1 === (await this.RequestPermissions(a)))
        throw Error("Permission not granted");
    }
    CordovaFetchLocalFile(a) {
      const f =
        window.cordova.file.applicationDirectory + "www/" + a.toLowerCase();
      return new Promise((g, v) => {
        window.resolveLocalFileSystemURL(
          f,
          (C) => {
            C.file(g, v);
          },
          v
        );
      });
    }
    async CordovaFetchLocalFileAsText(a) {
      a = await this.CordovaFetchLocalFile(a);
      return await u(a);
    }
    _CordovaMaybeStartNextArrayBufferRead() {
      if (A.length && !(8 <= D)) {
        D++;
        var a = A.shift();
        this._CordovaDoFetchLocalFileAsAsArrayBuffer(
          a.filename,
          a.successCallback,
          a.errorCallback
        );
      }
    }
    CordovaFetchLocalFileAsArrayBuffer(a) {
      return new Promise((f, g) => {
        A.push({
          filename: a,
          successCallback: (v) => {
            D--;
            this._CordovaMaybeStartNextArrayBufferRead();
            f(v);
          },
          errorCallback: (v) => {
            D--;
            this._CordovaMaybeStartNextArrayBufferRead();
            g(v);
          },
        });
        this._CordovaMaybeStartNextArrayBufferRead();
      });
    }
    async _CordovaDoFetchLocalFileAsAsArrayBuffer(a, f, g) {
      try {
        const v = await this.CordovaFetchLocalFile(a),
          C = await m(v);
        f(C);
      } catch (v) {
        g(v);
      }
    }
    _SendWrapperMessage(a) {
      if ("windows-webview2" === this._exportType)
        window.chrome.webview.postMessage(JSON.stringify(a));
      else if ("macos-wkwebview" === this._exportType)
        window.webkit.messageHandlers.C3Wrapper.postMessage(JSON.stringify(a));
      else throw Error("cannot send wrapper message");
    }
    async _ConvertDataUrisToBlobs() {
      const a = [];
      for (const [f, g] of Object.entries(this._localFileBlobs))
        a.push(this._ConvertDataUriToBlobs(f, g));
      await Promise.all(a);
    }
    async _ConvertDataUriToBlobs(a, f) {
      if ("object" === typeof f)
        (this._localFileBlobs[a] = new Blob([f.str], { type: f.type })),
          (this._localFileStrings[a] = f.str);
      else {
        let g = await this._FetchDataUri(f);
        g || (g = this._DataURIToBinaryBlobSync(f));
        this._localFileBlobs[a] = g;
      }
    }
    async _FetchDataUri(a) {
      try {
        return await (await fetch(a)).blob();
      } catch (f) {
        return (
          console.warn(
            "Failed to fetch a data: URI. Falling back to a slower workaround. This is probably because the Content Security Policy unnecessarily blocked it. Allow data: URIs in your CSP to avoid this.",
            f
          ),
          null
        );
      }
    }
    _DataURIToBinaryBlobSync(a) {
      a = this._ParseDataURI(a);
      return this._BinaryStringToBlob(a.data, a.mime_type);
    }
    _ParseDataURI(a) {
      var f = a.indexOf(",");
      if (0 > f) throw new URIError("expected comma in data: uri");
      var g = a.substring(5, f);
      a = a.substring(f + 1);
      f = g.split(";");
      g = f[0] || "";
      const v = f[2];
      a = "base64" === f[1] || "base64" === v ? atob(a) : decodeURIComponent(a);
      return { mime_type: g, data: a };
    }
    _BinaryStringToBlob(a, f) {
      var g = a.length;
      let v = g >> 2,
        C = new Uint8Array(g),
        B = new Uint32Array(C.buffer, 0, v),
        E,
        G;
      for (G = E = 0; E < v; ++E)
        B[E] =
          a.charCodeAt(G++) |
          (a.charCodeAt(G++) << 8) |
          (a.charCodeAt(G++) << 16) |
          (a.charCodeAt(G++) << 24);
      for (g &= 3; g--; ) (C[G] = a.charCodeAt(G)), ++G;
      return new Blob([C], { type: f });
    }
  };
}
("use strict");
{
  const b = self.RuntimeInterface;
  function d(c) {
    return (
      (c.sourceCapabilities && c.sourceCapabilities.firesTouchEvents) ||
      (c.originalEvent &&
        c.originalEvent.sourceCapabilities &&
        c.originalEvent.sourceCapabilities.firesTouchEvents)
    );
  }
  const k = new Map([
      ["OSLeft", "MetaLeft"],
      ["OSRight", "MetaRight"],
    ]),
    p = { dispatchRuntimeEvent: !0, dispatchUserScriptEvent: !0 },
    z = { dispatchUserScriptEvent: !0 },
    y = { dispatchRuntimeEvent: !0 };
  function w(c) {
    return new Promise((a, f) => {
      const g = document.createElement("link");
      g.onload = () => a(g);
      g.onerror = (v) => f(v);
      g.rel = "stylesheet";
      g.href = c;
      document.head.appendChild(g);
    });
  }
  function q(c) {
    return new Promise((a, f) => {
      const g = new Image();
      g.onload = () => a(g);
      g.onerror = (v) => f(v);
      g.src = c;
    });
  }
  async function u(c) {
    c = URL.createObjectURL(c);
    try {
      return await q(c);
    } finally {
      URL.revokeObjectURL(c);
    }
  }
  function m(c) {
    return new Promise((a, f) => {
      let g = new FileReader();
      g.onload = (v) => a(v.target.result);
      g.onerror = (v) => f(v);
      g.readAsText(c);
    });
  }
  async function A(c, a, f) {
    if (!/firefox/i.test(navigator.userAgent)) return await u(c);
    var g = await m(c);
    g = new DOMParser().parseFromString(g, "image/svg+xml");
    const v = g.documentElement;
    if (v.hasAttribute("width") && v.hasAttribute("height")) {
      const C = v.getAttribute("width"),
        B = v.getAttribute("height");
      if (!C.includes("%") && !B.includes("%")) return await u(c);
    }
    v.setAttribute("width", a + "px");
    v.setAttribute("height", f + "px");
    g = new XMLSerializer().serializeToString(g);
    c = new Blob([g], { type: "image/svg+xml" });
    return await u(c);
  }
  function D(c) {
    do {
      if (c.parentNode && c.hasAttribute("contenteditable")) return !0;
      c = c.parentNode;
    } while (c);
    return !1;
  }
  const x = new Set(["input", "textarea", "datalist", "select"]);
  function r(c) {
    return x.has(c.tagName.toLowerCase()) || D(c);
  }
  const h = new Set(["canvas", "body", "html"]);
  function e(c) {
    const a = c.target.tagName.toLowerCase();
    h.has(a) && c.preventDefault();
  }
  function l(c) {
    (c.metaKey || c.ctrlKey) && c.preventDefault();
  }
  self.C3_GetSvgImageSize = async function (c) {
    c = await u(c);
    if (0 < c.width && 0 < c.height) return [c.width, c.height];
    {
      c.style.position = "absolute";
      c.style.left = "0px";
      c.style.top = "0px";
      c.style.visibility = "hidden";
      document.body.appendChild(c);
      const a = c.getBoundingClientRect();
      document.body.removeChild(c);
      return [a.width, a.height];
    }
  };
  self.C3_RasterSvgImageBlob = async function (c, a, f, g, v) {
    c = await A(c, a, f);
    const C = document.createElement("canvas");
    C.width = g;
    C.height = v;
    C.getContext("2d").drawImage(c, 0, 0, a, f);
    return C;
  };
  let n = !1;
  document.addEventListener("pause", () => (n = !0));
  document.addEventListener("resume", () => (n = !1));
  function t() {
    try {
      return window.parent && window.parent.document.hasFocus();
    } catch (c) {
      return !1;
    }
  }
  function F() {
    const c = document.activeElement;
    if (!c) return !1;
    const a = c.tagName.toLowerCase(),
      f = new Set("email number password search tel text url".split(" "));
    return "textarea" === a
      ? !0
      : "input" === a
      ? f.has(c.type.toLowerCase() || "text")
      : D(c);
  }
  b.AddDOMHandlerClass(
    class extends self.DOMHandler {
      constructor(c) {
        super(c, "runtime");
        this._isFirstSizeUpdate = !0;
        this._simulatedResizeTimerId = -1;
        this._targetOrientation = "any";
        this._attachedDeviceMotionEvent = this._attachedDeviceOrientationEvent =
          !1;
        this._lastPointerRawUpdateEvent =
          this._pointerRawUpdateRateLimiter =
          this._debugHighlightElem =
            null;
        this._pointerRawMovementY = this._pointerRawMovementX = 0;
        c.AddRuntimeComponentMessageHandler("canvas", "update-size", (g) =>
          this._OnUpdateCanvasSize(g)
        );
        c.AddRuntimeComponentMessageHandler("runtime", "invoke-download", (g) =>
          this._OnInvokeDownload(g)
        );
        c.AddRuntimeComponentMessageHandler(
          "runtime",
          "raster-svg-image",
          (g) => this._OnRasterSvgImage(g)
        );
        c.AddRuntimeComponentMessageHandler(
          "runtime",
          "get-svg-image-size",
          (g) => this._OnGetSvgImageSize(g)
        );
        c.AddRuntimeComponentMessageHandler(
          "runtime",
          "set-target-orientation",
          (g) => this._OnSetTargetOrientation(g)
        );
        c.AddRuntimeComponentMessageHandler("runtime", "register-sw", () =>
          this._OnRegisterSW()
        );
        c.AddRuntimeComponentMessageHandler(
          "runtime",
          "post-to-debugger",
          (g) => this._OnPostToDebugger(g)
        );
        c.AddRuntimeComponentMessageHandler("runtime", "go-to-script", (g) =>
          this._OnPostToDebugger(g)
        );
        c.AddRuntimeComponentMessageHandler(
          "runtime",
          "before-start-ticking",
          () => this._OnBeforeStartTicking()
        );
        c.AddRuntimeComponentMessageHandler("runtime", "debug-highlight", (g) =>
          this._OnDebugHighlight(g)
        );
        c.AddRuntimeComponentMessageHandler(
          "runtime",
          "enable-device-orientation",
          () => this._AttachDeviceOrientationEvent()
        );
        c.AddRuntimeComponentMessageHandler(
          "runtime",
          "enable-device-motion",
          () => this._AttachDeviceMotionEvent()
        );
        c.AddRuntimeComponentMessageHandler("runtime", "add-stylesheet", (g) =>
          this._OnAddStylesheet(g)
        );
        c.AddRuntimeComponentMessageHandler("runtime", "alert", (g) =>
          this._OnAlert(g)
        );
        c.AddRuntimeComponentMessageHandler(
          "runtime",
          "hide-cordova-splash",
          () => this._OnHideCordovaSplash()
        );
        const a = new Set(["input", "textarea", "datalist"]);
        window.addEventListener("contextmenu", (g) => {
          const v = g.target,
            C = v.tagName.toLowerCase();
          a.has(C) || D(v) || g.preventDefault();
        });
        const f = c.GetCanvas();
        window.addEventListener("selectstart", e);
        window.addEventListener("gesturehold", e);
        f.addEventListener("selectstart", e);
        f.addEventListener("gesturehold", e);
        window.addEventListener("touchstart", e, { passive: !1 });
        "undefined" !== typeof PointerEvent
          ? (window.addEventListener("pointerdown", e, { passive: !1 }),
            f.addEventListener("pointerdown", e))
          : f.addEventListener("touchstart", e);
        this._mousePointerLastButtons = 0;
        window.addEventListener("mousedown", (g) => {
          1 === g.button && g.preventDefault();
        });
        window.addEventListener("mousewheel", l, { passive: !1 });
        window.addEventListener("wheel", l, { passive: !1 });
        window.addEventListener("resize", () => this._OnWindowResize());
        window.addEventListener("fullscreenchange", () =>
          this._OnFullscreenChange()
        );
        window.addEventListener("webkitfullscreenchange", () =>
          this._OnFullscreenChange()
        );
        window.addEventListener("mozfullscreenchange", () =>
          this._OnFullscreenChange()
        );
        window.addEventListener("fullscreenerror", (g) =>
          this._OnFullscreenError(g)
        );
        window.addEventListener("webkitfullscreenerror", (g) =>
          this._OnFullscreenError(g)
        );
        window.addEventListener("mozfullscreenerror", (g) =>
          this._OnFullscreenError(g)
        );
        c.IsiOSWebView() &&
          window.addEventListener("focusout", () => {
            F() || (document.scrollingElement.scrollTop = 0);
          });
        self.C3WrapperOnMessage = (g) => this._OnWrapperMessage(g);
        this._mediaPendingPlay = new Set();
        this._mediaRemovedPendingPlay = new WeakSet();
        this._isSilent = !1;
      }
      _OnBeforeStartTicking() {
        "cordova" === this._iRuntime.GetExportType()
          ? (document.addEventListener("pause", () =>
              this._OnVisibilityChange(!0)
            ),
            document.addEventListener("resume", () =>
              this._OnVisibilityChange(!1)
            ))
          : document.addEventListener("visibilitychange", () =>
              this._OnVisibilityChange(document.hidden)
            );
        return { isSuspended: !(!document.hidden && !n) };
      }
      Attach() {
        window.addEventListener("focus", () =>
          this._PostRuntimeEvent("window-focus")
        );
        window.addEventListener("blur", () => {
          this._PostRuntimeEvent("window-blur", { parentHasFocus: t() });
          this._mousePointerLastButtons = 0;
        });
        window.addEventListener("focusin", (a) => {
          r(a.target) && this._PostRuntimeEvent("keyboard-blur");
        });
        window.addEventListener("keydown", (a) =>
          this._OnKeyEvent("keydown", a)
        );
        window.addEventListener("keyup", (a) => this._OnKeyEvent("keyup", a));
        window.addEventListener("dblclick", (a) =>
          this._OnMouseEvent("dblclick", a, p)
        );
        window.addEventListener("wheel", (a) =>
          this._OnMouseWheelEvent("wheel", a)
        );
        "undefined" !== typeof PointerEvent
          ? (window.addEventListener("pointerdown", (a) => {
              this._HandlePointerDownFocus(a);
              this._OnPointerEvent("pointerdown", a);
            }),
            this._iRuntime.UsesWorker() &&
            "undefined" !== typeof window.onpointerrawupdate &&
            self === self.top
              ? ((this._pointerRawUpdateRateLimiter = new self.RateLimiter(
                  () => this._DoSendPointerRawUpdate(),
                  5
                )),
                this._pointerRawUpdateRateLimiter.SetCanRunImmediate(!0),
                window.addEventListener("pointerrawupdate", (a) =>
                  this._OnPointerRawUpdate(a)
                ))
              : window.addEventListener("pointermove", (a) =>
                  this._OnPointerEvent("pointermove", a)
                ),
            window.addEventListener("pointerup", (a) =>
              this._OnPointerEvent("pointerup", a)
            ),
            window.addEventListener("pointercancel", (a) =>
              this._OnPointerEvent("pointercancel", a)
            ))
          : (window.addEventListener("mousedown", (a) => {
              this._HandlePointerDownFocus(a);
              this._OnMouseEventAsPointer("pointerdown", a);
            }),
            window.addEventListener("mousemove", (a) =>
              this._OnMouseEventAsPointer("pointermove", a)
            ),
            window.addEventListener("mouseup", (a) =>
              this._OnMouseEventAsPointer("pointerup", a)
            ),
            window.addEventListener("touchstart", (a) => {
              this._HandlePointerDownFocus(a);
              this._OnTouchEvent("pointerdown", a);
            }),
            window.addEventListener("touchmove", (a) =>
              this._OnTouchEvent("pointermove", a)
            ),
            window.addEventListener("touchend", (a) =>
              this._OnTouchEvent("pointerup", a)
            ),
            window.addEventListener("touchcancel", (a) =>
              this._OnTouchEvent("pointercancel", a)
            ));
        const c = () => this._PlayPendingMedia();
        window.addEventListener("pointerup", c, !0);
        window.addEventListener("touchend", c, !0);
        window.addEventListener("click", c, !0);
        window.addEventListener("keydown", c, !0);
        window.addEventListener("gamepadconnected", c, !0);
      }
      _PostRuntimeEvent(c, a) {
        this.PostToRuntime(c, a || null, y);
      }
      _GetWindowInnerWidth() {
        return this._iRuntime._GetWindowInnerWidth();
      }
      _GetWindowInnerHeight() {
        return this._iRuntime._GetWindowInnerHeight();
      }
      _OnWindowResize() {
        const c = this._GetWindowInnerWidth(),
          a = this._GetWindowInnerHeight();
        this._PostRuntimeEvent("window-resize", {
          innerWidth: c,
          innerHeight: a,
          devicePixelRatio: window.devicePixelRatio,
          isFullscreen: b.IsDocumentFullscreen(),
        });
        this._iRuntime.IsiOSWebView() &&
          (-1 !== this._simulatedResizeTimerId &&
            clearTimeout(this._simulatedResizeTimerId),
          this._OnSimulatedResize(c, a, 0));
      }
      _ScheduleSimulatedResize(c, a, f) {
        -1 !== this._simulatedResizeTimerId &&
          clearTimeout(this._simulatedResizeTimerId);
        this._simulatedResizeTimerId = setTimeout(
          () => this._OnSimulatedResize(c, a, f),
          48
        );
      }
      _OnSimulatedResize(c, a, f) {
        const g = this._GetWindowInnerWidth(),
          v = this._GetWindowInnerHeight();
        this._simulatedResizeTimerId = -1;
        g != c || v != a
          ? this._PostRuntimeEvent("window-resize", {
              innerWidth: g,
              innerHeight: v,
              devicePixelRatio: window.devicePixelRatio,
              isFullscreen: b.IsDocumentFullscreen(),
            })
          : 10 > f && this._ScheduleSimulatedResize(g, v, f + 1);
      }
      _OnSetTargetOrientation(c) {
        this._targetOrientation = c.targetOrientation;
      }
      _TrySetTargetOrientation() {
        const c = this._targetOrientation;
        if (screen.orientation && screen.orientation.lock)
          screen.orientation
            .lock(c)
            .catch((a) =>
              console.warn("[Construct 3] Failed to lock orientation: ", a)
            );
        else
          try {
            let a = !1;
            screen.lockOrientation
              ? (a = screen.lockOrientation(c))
              : screen.webkitLockOrientation
              ? (a = screen.webkitLockOrientation(c))
              : screen.mozLockOrientation
              ? (a = screen.mozLockOrientation(c))
              : screen.msLockOrientation && (a = screen.msLockOrientation(c));
            a || console.warn("[Construct 3] Failed to lock orientation");
          } catch (a) {
            console.warn("[Construct 3] Failed to lock orientation: ", a);
          }
      }
      _OnFullscreenChange() {
        const c = b.IsDocumentFullscreen();
        c &&
          "any" !== this._targetOrientation &&
          this._TrySetTargetOrientation();
        this.PostToRuntime("fullscreenchange", {
          isFullscreen: c,
          innerWidth: this._GetWindowInnerWidth(),
          innerHeight: this._GetWindowInnerHeight(),
        });
      }
      _OnFullscreenError(c) {
        console.warn("[Construct 3] Fullscreen request failed: ", c);
        this.PostToRuntime("fullscreenerror", {
          isFullscreen: b.IsDocumentFullscreen(),
          innerWidth: this._GetWindowInnerWidth(),
          innerHeight: this._GetWindowInnerHeight(),
        });
      }
      _OnVisibilityChange(c) {
        c
          ? this._iRuntime._CancelAnimationFrame()
          : this._iRuntime._RequestAnimationFrame();
        this.PostToRuntime("visibilitychange", { hidden: c });
      }
      _OnKeyEvent(c, a) {
        "Backspace" === a.key && e(a);
        const f = k.get(a.code) || a.code;
        this._PostToRuntimeMaybeSync(
          c,
          {
            code: f,
            key: a.key,
            which: a.which,
            repeat: a.repeat,
            altKey: a.altKey,
            ctrlKey: a.ctrlKey,
            metaKey: a.metaKey,
            shiftKey: a.shiftKey,
            timeStamp: a.timeStamp,
          },
          p
        );
      }
      _OnMouseWheelEvent(c, a) {
        this.PostToRuntime(
          c,
          {
            clientX: a.clientX,
            clientY: a.clientY,
            pageX: a.pageX,
            pageY: a.pageY,
            deltaX: a.deltaX,
            deltaY: a.deltaY,
            deltaZ: a.deltaZ,
            deltaMode: a.deltaMode,
            timeStamp: a.timeStamp,
          },
          p
        );
      }
      _OnMouseEvent(c, a, f) {
        d(a) ||
          this._PostToRuntimeMaybeSync(
            c,
            {
              button: a.button,
              buttons: a.buttons,
              clientX: a.clientX,
              clientY: a.clientY,
              pageX: a.pageX,
              pageY: a.pageY,
              movementX: a.movementX || 0,
              movementY: a.movementY || 0,
              timeStamp: a.timeStamp,
            },
            f
          );
      }
      _OnMouseEventAsPointer(c, a) {
        if (!d(a)) {
          var f = this._mousePointerLastButtons;
          "pointerdown" === c && 0 !== f
            ? (c = "pointermove")
            : "pointerup" === c && 0 !== a.buttons && (c = "pointermove");
          this._PostToRuntimeMaybeSync(
            c,
            {
              pointerId: 1,
              pointerType: "mouse",
              button: a.button,
              buttons: a.buttons,
              lastButtons: f,
              clientX: a.clientX,
              clientY: a.clientY,
              pageX: a.pageX,
              pageY: a.pageY,
              movementX: a.movementX || 0,
              movementY: a.movementY || 0,
              width: 0,
              height: 0,
              pressure: 0,
              tangentialPressure: 0,
              tiltX: 0,
              tiltY: 0,
              twist: 0,
              timeStamp: a.timeStamp,
            },
            p
          );
          this._mousePointerLastButtons = a.buttons;
          this._OnMouseEvent(a.type, a, z);
        }
      }
      _OnPointerEvent(c, a) {
        this._pointerRawUpdateRateLimiter &&
          "pointermove" !== c &&
          this._pointerRawUpdateRateLimiter.Reset();
        var f = 0;
        "mouse" === a.pointerType && (f = this._mousePointerLastButtons);
        this._PostToRuntimeMaybeSync(
          c,
          {
            pointerId: a.pointerId,
            pointerType: a.pointerType,
            button: a.button,
            buttons: a.buttons,
            lastButtons: f,
            clientX: a.clientX,
            clientY: a.clientY,
            pageX: a.pageX,
            pageY: a.pageY,
            movementX: (a.movementX || 0) + this._pointerRawMovementX,
            movementY: (a.movementY || 0) + this._pointerRawMovementY,
            width: a.width || 0,
            height: a.height || 0,
            pressure: a.pressure || 0,
            tangentialPressure: a.tangentialPressure || 0,
            tiltX: a.tiltX || 0,
            tiltY: a.tiltY || 0,
            twist: a.twist || 0,
            timeStamp: a.timeStamp,
          },
          p
        );
        this._pointerRawMovementY = this._pointerRawMovementX = 0;
        "mouse" === a.pointerType &&
          ((f = "mousemove"),
          "pointerdown" === c
            ? (f = "mousedown")
            : "pointerup" === c && (f = "mouseup"),
          this._OnMouseEvent(f, a, z),
          (this._mousePointerLastButtons = a.buttons));
      }
      _OnPointerRawUpdate(c) {
        this._lastPointerRawUpdateEvent &&
          ((this._pointerRawMovementX +=
            this._lastPointerRawUpdateEvent.movementX || 0),
          (this._pointerRawMovementY +=
            this._lastPointerRawUpdateEvent.movementY || 0));
        this._lastPointerRawUpdateEvent = c;
        this._pointerRawUpdateRateLimiter.Call();
      }
      _DoSendPointerRawUpdate() {
        this._OnPointerEvent("pointermove", this._lastPointerRawUpdateEvent);
        this._lastPointerRawUpdateEvent = null;
      }
      _OnTouchEvent(c, a) {
        for (let f = 0, g = a.changedTouches.length; f < g; ++f) {
          const v = a.changedTouches[f];
          this._PostToRuntimeMaybeSync(
            c,
            {
              pointerId: v.identifier,
              pointerType: "touch",
              button: 0,
              buttons: 0,
              lastButtons: 0,
              clientX: v.clientX,
              clientY: v.clientY,
              pageX: v.pageX,
              pageY: v.pageY,
              movementX: a.movementX || 0,
              movementY: a.movementY || 0,
              width: 2 * (v.radiusX || v.webkitRadiusX || 0),
              height: 2 * (v.radiusY || v.webkitRadiusY || 0),
              pressure: v.force || v.webkitForce || 0,
              tangentialPressure: 0,
              tiltX: 0,
              tiltY: 0,
              twist: v.rotationAngle || 0,
              timeStamp: a.timeStamp,
            },
            p
          );
        }
      }
      _HandlePointerDownFocus(c) {
        window !== window.top && window.focus();
        this._IsElementCanvasOrDocument(c.target) &&
          document.activeElement &&
          !this._IsElementCanvasOrDocument(document.activeElement) &&
          document.activeElement.blur();
      }
      _IsElementCanvasOrDocument(c) {
        return (
          !c ||
          c === document ||
          c === window ||
          c === document.body ||
          "canvas" === c.tagName.toLowerCase()
        );
      }
      _AttachDeviceOrientationEvent() {
        this._attachedDeviceOrientationEvent ||
          ((this._attachedDeviceOrientationEvent = !0),
          window.addEventListener("deviceorientation", (c) =>
            this._OnDeviceOrientation(c)
          ),
          window.addEventListener("deviceorientationabsolute", (c) =>
            this._OnDeviceOrientationAbsolute(c)
          ));
      }
      _AttachDeviceMotionEvent() {
        this._attachedDeviceMotionEvent ||
          ((this._attachedDeviceMotionEvent = !0),
          window.addEventListener("devicemotion", (c) =>
            this._OnDeviceMotion(c)
          ));
      }
      _OnDeviceOrientation(c) {
        this.PostToRuntime(
          "deviceorientation",
          {
            absolute: !!c.absolute,
            alpha: c.alpha || 0,
            beta: c.beta || 0,
            gamma: c.gamma || 0,
            timeStamp: c.timeStamp,
            webkitCompassHeading: c.webkitCompassHeading,
            webkitCompassAccuracy: c.webkitCompassAccuracy,
          },
          p
        );
      }
      _OnDeviceOrientationAbsolute(c) {
        this.PostToRuntime(
          "deviceorientationabsolute",
          {
            absolute: !!c.absolute,
            alpha: c.alpha || 0,
            beta: c.beta || 0,
            gamma: c.gamma || 0,
            timeStamp: c.timeStamp,
          },
          p
        );
      }
      _OnDeviceMotion(c) {
        let a = null;
        var f = c.acceleration;
        f && (a = { x: f.x || 0, y: f.y || 0, z: f.z || 0 });
        f = null;
        var g = c.accelerationIncludingGravity;
        g && (f = { x: g.x || 0, y: g.y || 0, z: g.z || 0 });
        g = null;
        const v = c.rotationRate;
        v &&
          (g = { alpha: v.alpha || 0, beta: v.beta || 0, gamma: v.gamma || 0 });
        this.PostToRuntime(
          "devicemotion",
          {
            acceleration: a,
            accelerationIncludingGravity: f,
            rotationRate: g,
            interval: c.interval,
            timeStamp: c.timeStamp,
          },
          p
        );
      }
      _OnUpdateCanvasSize(c) {
        const a = this.GetRuntimeInterface().GetCanvas();
        a.style.width = c.styleWidth + "px";
        a.style.height = c.styleHeight + "px";
        a.style.marginLeft = c.marginLeft + "px";
        a.style.marginTop = c.marginTop + "px";
        this._isFirstSizeUpdate &&
          ((a.style.display = ""), (this._isFirstSizeUpdate = !1));
      }
      _OnInvokeDownload(c) {
        const a = c.url;
        c = c.filename;
        const f = document.createElement("a"),
          g = document.body;
        f.textContent = c;
        f.href = a;
        f.download = c;
        g.appendChild(f);
        f.click();
        g.removeChild(f);
      }
      async _OnRasterSvgImage(c) {
        var a = c.imageBitmapOpts;
        c = await self.C3_RasterSvgImageBlob(
          c.blob,
          c.imageWidth,
          c.imageHeight,
          c.surfaceWidth,
          c.surfaceHeight
        );
        a = a ? await createImageBitmap(c, a) : await createImageBitmap(c);
        return { imageBitmap: a, transferables: [a] };
      }
      async _OnGetSvgImageSize(c) {
        return await self.C3_GetSvgImageSize(c.blob);
      }
      async _OnAddStylesheet(c) {
        await w(c.url);
      }
      _PlayPendingMedia() {
        var c = [...this._mediaPendingPlay];
        this._mediaPendingPlay.clear();
        if (!this._isSilent)
          for (const a of c)
            (c = a.play()) &&
              c.catch((f) => {
                this._mediaRemovedPendingPlay.has(a) ||
                  this._mediaPendingPlay.add(a);
              });
      }
      TryPlayMedia(c) {
        if ("function" !== typeof c.play) throw Error("missing play function");
        this._mediaRemovedPendingPlay.delete(c);
        let a;
        try {
          a = c.play();
        } catch (f) {
          this._mediaPendingPlay.add(c);
          return;
        }
        a &&
          a.catch((f) => {
            this._mediaRemovedPendingPlay.has(c) ||
              this._mediaPendingPlay.add(c);
          });
      }
      RemovePendingPlay(c) {
        this._mediaPendingPlay.delete(c);
        this._mediaRemovedPendingPlay.add(c);
      }
      SetSilent(c) {
        this._isSilent = !!c;
      }
      _OnHideCordovaSplash() {
        navigator.splashscreen &&
          navigator.splashscreen.hide &&
          navigator.splashscreen.hide();
      }
      _OnDebugHighlight(c) {
        if (c.show) {
          this._debugHighlightElem ||
            ((this._debugHighlightElem = document.createElement("div")),
            (this._debugHighlightElem.id = "inspectOutline"),
            document.body.appendChild(this._debugHighlightElem));
          var a = this._debugHighlightElem;
          a.style.display = "";
          a.style.left = c.left - 1 + "px";
          a.style.top = c.top - 1 + "px";
          a.style.width = c.width + 2 + "px";
          a.style.height = c.height + 2 + "px";
          a.textContent = c.name;
        } else
          this._debugHighlightElem &&
            (this._debugHighlightElem.style.display = "none");
      }
      _OnRegisterSW() {
        window.C3_RegisterSW && window.C3_RegisterSW();
      }
      _OnPostToDebugger(c) {
        window.c3_postToMessagePort &&
          ((c.from = "runtime"), window.c3_postToMessagePort(c));
      }
      _InvokeFunctionFromJS(c, a) {
        return this.PostToRuntimeAsync("js-invoke-function", {
          name: c,
          params: a,
        });
      }
      _OnAlert(c) {
        alert(c.message);
      }
      _OnWrapperMessage(c) {
        "entered-fullscreen" === c
          ? (b._SetWrapperIsFullscreenFlag(!0), this._OnFullscreenChange())
          : "exited-fullscreen" === c
          ? (b._SetWrapperIsFullscreenFlag(!1), this._OnFullscreenChange())
          : console.warn("Unknown wrapper message: ", c);
      }
    }
  );
}
("use strict");
self.JobSchedulerDOM = class {
  constructor(b) {
    this._runtimeInterface = b;
    this._baseUrl = b.GetBaseURL();
    "preview" === b.GetExportType()
      ? (this._baseUrl += "workers/")
      : (this._baseUrl += b.GetScriptFolder());
    this._maxNumWorkers = Math.min(navigator.hardwareConcurrency || 2, 16);
    this._dispatchWorker = null;
    this._jobWorkers = [];
    this._outputPort = this._inputPort = null;
  }
  async Init() {
    if (this._hasInitialised) throw Error("already initialised");
    this._hasInitialised = !0;
    var b = this._runtimeInterface._GetWorkerURL("dispatchworker.js");
    this._dispatchWorker = await this._runtimeInterface.CreateWorker(
      b,
      this._baseUrl,
      { name: "DispatchWorker" }
    );
    b = new MessageChannel();
    this._inputPort = b.port1;
    this._dispatchWorker.postMessage({ type: "_init", "in-port": b.port2 }, [
      b.port2,
    ]);
    this._outputPort = await this._CreateJobWorker();
  }
  async _CreateJobWorker() {
    const b = this._jobWorkers.length;
    var d = this._runtimeInterface._GetWorkerURL("jobworker.js");
    d = await this._runtimeInterface.CreateWorker(d, this._baseUrl, {
      name: "JobWorker" + b,
    });
    const k = new MessageChannel(),
      p = new MessageChannel();
    this._dispatchWorker.postMessage({ type: "_addJobWorker", port: k.port1 }, [
      k.port1,
    ]);
    d.postMessage(
      {
        type: "init",
        number: b,
        "dispatch-port": k.port2,
        "output-port": p.port2,
      },
      [k.port2, p.port2]
    );
    this._jobWorkers.push(d);
    return p.port1;
  }
  GetPortData() {
    return {
      inputPort: this._inputPort,
      outputPort: this._outputPort,
      maxNumWorkers: this._maxNumWorkers,
    };
  }
  GetPortTransferables() {
    return [this._inputPort, this._outputPort];
  }
};
("use strict");
window.C3_IsSupported &&
  (window.c3_runtimeInterface = new self.RuntimeInterface({
    useWorker: !0,
    workerMainUrl: "workermain.js",
    engineScripts: ["scripts/c3runtime.js"],
    projectScripts: [],
    mainProjectScript: "",
    scriptFolder: "scripts/",
    workerDependencyScripts: ["box2d.wasm.js"],
    exportType: "html5",
  }));
("use strict");
self.RuntimeInterface.AddDOMHandlerClass(
  class extends self.DOMHandler {
    constructor(b) {
      super(b, "touch");
      this.AddRuntimeMessageHandler("request-permission", (d) =>
        this._OnRequestPermission(d)
      );
    }
    async _OnRequestPermission(b) {
      b = b.type;
      let d = !0;
      0 === b
        ? (d = await this._RequestOrientationPermission())
        : 1 === b && (d = await this._RequestMotionPermission());
      this.PostToRuntime("permission-result", { type: b, result: d });
    }
    async _RequestOrientationPermission() {
      if (
        !self.DeviceOrientationEvent ||
        !self.DeviceOrientationEvent.requestPermission
      )
        return !0;
      try {
        return (
          "granted" === (await self.DeviceOrientationEvent.requestPermission())
        );
      } catch (b) {
        return (
          console.warn("[Touch] Failed to request orientation permission: ", b),
          !1
        );
      }
    }
    async _RequestMotionPermission() {
      if (!self.DeviceMotionEvent || !self.DeviceMotionEvent.requestPermission)
        return !0;
      try {
        return "granted" === (await self.DeviceMotionEvent.requestPermission());
      } catch (b) {
        return (
          console.warn("[Touch] Failed to request motion permission: ", b), !1
        );
      }
    }
  }
);
("use strict");
self.RuntimeInterface.AddDOMHandlerClass(
  class extends self.DOMHandler {
    constructor(b) {
      super(b, "browser");
      this._exportType = "";
      this.AddRuntimeMessageHandlers([
        ["get-initial-state", (d) => this._OnGetInitialState(d)],
        ["ready-for-sw-messages", () => this._OnReadyForSWMessages()],
        ["alert", (d) => this._OnAlert(d)],
        ["close", () => this._OnClose()],
        ["set-focus", (d) => this._OnSetFocus(d)],
        ["vibrate", (d) => this._OnVibrate(d)],
        ["lock-orientation", (d) => this._OnLockOrientation(d)],
        ["unlock-orientation", () => this._OnUnlockOrientation()],
        ["navigate", (d) => this._OnNavigate(d)],
        ["request-fullscreen", (d) => this._OnRequestFullscreen(d)],
        ["exit-fullscreen", () => this._OnExitFullscreen()],
        ["set-hash", (d) => this._OnSetHash(d)],
      ]);
      window.addEventListener("online", () => this._OnOnlineStateChanged(!0));
      window.addEventListener("offline", () => this._OnOnlineStateChanged(!1));
      window.addEventListener("hashchange", () => this._OnHashChange());
      document.addEventListener("backbutton", () =>
        this._OnCordovaBackButton()
      );
    }
    _OnGetInitialState(b) {
      this._exportType = b.exportType;
      return {
        location: location.toString(),
        isOnline: !!navigator.onLine,
        referrer: document.referrer,
        title: document.title,
        isCookieEnabled: !!navigator.cookieEnabled,
        screenWidth: screen.width,
        screenHeight: screen.height,
        windowOuterWidth: window.outerWidth,
        windowOuterHeight: window.outerHeight,
        isScirraArcade: "undefined" !== typeof window.is_scirra_arcade,
      };
    }
    _OnReadyForSWMessages() {
      window.C3_RegisterSW &&
        window.OfflineClientInfo &&
        window.OfflineClientInfo.SetMessageCallback((b) =>
          this.PostToRuntime("sw-message", b.data)
        );
    }
    _OnOnlineStateChanged(b) {
      this.PostToRuntime("online-state", { isOnline: b });
    }
    _OnCordovaBackButton() {
      this.PostToRuntime("backbutton");
    }
    GetNWjsWindow() {
      return "nwjs" === this._exportType ? nw.Window.get() : null;
    }
    _OnAlert(b) {
      alert(b.message);
    }
    _OnClose() {
      navigator.app && navigator.app.exitApp
        ? navigator.app.exitApp()
        : navigator.device && navigator.device.exitApp
        ? navigator.device.exitApp()
        : window.close();
    }
    _OnSetFocus(b) {
      b = b.isFocus;
      if ("nwjs" === this._exportType) {
        const d = this.GetNWjsWindow();
        b ? d.focus() : d.blur();
      } else b ? window.focus() : window.blur();
    }
    _OnVibrate(b) {
      navigator.vibrate && navigator.vibrate(b.pattern);
    }
    _OnLockOrientation(b) {
      b = b.orientation;
      if (screen.orientation && screen.orientation.lock)
        screen.orientation
          .lock(b)
          .catch((d) =>
            console.warn("[Construct 3] Failed to lock orientation: ", d)
          );
      else
        try {
          let d = !1;
          screen.lockOrientation
            ? (d = screen.lockOrientation(b))
            : screen.webkitLockOrientation
            ? (d = screen.webkitLockOrientation(b))
            : screen.mozLockOrientation
            ? (d = screen.mozLockOrientation(b))
            : screen.msLockOrientation && (d = screen.msLockOrientation(b));
          d || console.warn("[Construct 3] Failed to lock orientation");
        } catch (d) {
          console.warn("[Construct 3] Failed to lock orientation: ", d);
        }
    }
    _OnUnlockOrientation() {
      try {
        screen.orientation && screen.orientation.unlock
          ? screen.orientation.unlock()
          : screen.unlockOrientation
          ? screen.unlockOrientation()
          : screen.webkitUnlockOrientation
          ? screen.webkitUnlockOrientation()
          : screen.mozUnlockOrientation
          ? screen.mozUnlockOrientation()
          : screen.msUnlockOrientation && screen.msUnlockOrientation();
      } catch (b) {}
    }
    _OnNavigate(b) {
      var d = b.type;
      if ("back" === d)
        navigator.app && navigator.app.backHistory
          ? navigator.app.backHistory()
          : window.history.back();
      else if ("forward" === d) window.history.forward();
      else if ("reload" === d) location.reload();
      else if ("url" === d) {
        d = b.url;
        const k = b.target;
        b = b.exportType;
        self.cordova && self.cordova.InAppBrowser
          ? self.cordova.InAppBrowser.open(d, "_system")
          : "preview" === b || "windows-webview2" === b
          ? window.open(d, "_blank")
          : this._isScirraArcade ||
            (2 === k
              ? (window.top.location = d)
              : 1 === k
              ? (window.parent.location = d)
              : (window.location = d));
      } else
        "new-window" === d &&
          ((d = b.url),
          (b = b.tag),
          self.cordova && self.cordova.InAppBrowser
            ? self.cordova.InAppBrowser.open(d, "_system")
            : window.open(d, b));
    }
    _OnRequestFullscreen(b) {
      if (
        "windows-webview2" === this._exportType ||
        "macos-wkwebview" === this._exportType
      )
        self.RuntimeInterface._SetWrapperIsFullscreenFlag(!0),
          this._iRuntime._SendWrapperMessage({
            type: "set-fullscreen",
            fullscreen: !0,
          });
      else {
        const d = { navigationUI: "auto" };
        b = b.navUI;
        1 === b
          ? (d.navigationUI = "hide")
          : 2 === b && (d.navigationUI = "show");
        b = document.documentElement;
        b.requestFullscreen
          ? b.requestFullscreen(d)
          : b.mozRequestFullScreen
          ? b.mozRequestFullScreen(d)
          : b.msRequestFullscreen
          ? b.msRequestFullscreen(d)
          : b.webkitRequestFullScreen &&
            ("undefined" !== typeof Element.ALLOW_KEYBOARD_INPUT
              ? b.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
              : b.webkitRequestFullScreen());
      }
    }
    _OnExitFullscreen() {
      "windows-webview2" === this._exportType ||
      "macos-wkwebview" === this._exportType
        ? (self.RuntimeInterface._SetWrapperIsFullscreenFlag(!1),
          this._iRuntime._SendWrapperMessage({
            type: "set-fullscreen",
            fullscreen: !1,
          }))
        : document.exitFullscreen
        ? document.exitFullscreen()
        : document.mozCancelFullScreen
        ? document.mozCancelFullScreen()
        : document.msExitFullscreen
        ? document.msExitFullscreen()
        : document.webkitCancelFullScreen && document.webkitCancelFullScreen();
    }
    _OnSetHash(b) {
      location.hash = b.hash;
    }
    _OnHashChange() {
      this.PostToRuntime("hashchange", { location: location.toString() });
    }
  }
);
("use strict");
{
  const b = {};
  let d = null,
    k = null;
  const p = {
    banner: "ca-app-pub-3940256099942544/2934735716",
    interstitial: "ca-app-pub-3940256099942544/4411468910",
    rewarded: "ca-app-pub-3940256099942544/1712485313",
    rewardedInterstitial: "ca-app-pub-3940256099942544/6978759866",
  };
  let z = !1;
  function y(u, m) {
    u(m, null);
  }
  function w(u, m) {
    b[u] = m;
    self.admob.configRequest(b);
  }
  async function q() {
    if ("android" === self.cordova.platformId)
      return self.C3AdUtilsMD5(self.device.uuid).toUpperCase();
    if ("ios" === self.cordova.platformId) {
      const u = await self.cordova.plugins.idfa.getInfo();
      if (!u.trackingLimited)
        return (z = !0), self.C3AdUtilsMD5(u.idfa).toUpperCase();
    }
  }
  self.C3AdUtils = {
    Success: function (u, m) {
      u(null, m);
    },
    Failure: y,
    StartAdmobPlus: async function (u, m) {
      m = "undefined" !== typeof m ? m : d.debug;
      return k
        ? k
        : (k = new Promise((A, D) => {
            document.addEventListener("deviceready", async () => {
              try {
                await self.admob.start();
                if (m) {
                  const x = await q();
                  w("testDeviceIds", [x]);
                }
                A(!0);
              } catch (x) {
                A(!1), y(u, "Initialization failure");
              }
            });
          }));
    },
    UpdateAdmobPlusRequest: w,
    SetInitConfigureOptions: function (u, m, A, D, x, r, h) {
      d ||
        ((d = {
          id: u,
          pubID: m,
          privacyPolicy: A,
          showFree: D,
          showConsent: x,
          debug: r,
          debugLocation: h,
        }),
        Object.freeze(d));
    },
    HasInitConfigurationOptions: function () {
      return !!d;
    },
    GetAdUnit: function (u, m) {
      if ("android" === self.cordova.platformId) return u;
      if ("ios" === self.cordova.platformId) {
        const A = !!p[m];
        return d.debug && !z && A
          ? (console.log("[C3 advert]", "USING TEST AD UNITS"), p[m])
          : u;
      }
    },
    get ConfigurationOptions() {
      return d;
    },
    get TestId() {
      return q();
    },
  };
}
("use strict");
{
  const b = self.C3AdUtils,
    d = b.Success,
    k = b.Failure,
    p = {
      get LOAD() {
        return self.admob.Events.bannerLoad;
      },
      get LOAD_FAIL() {
        return self.admob.Events.bannerLoadFail;
      },
    };
  class z {
    constructor(w, q, u, m) {
      if (!w) return k(m, "Unit ID not specified");
      if (!q) return k(m, "Ad size not specified");
      if (!u) return k(m, "Ad position not specified");
      this._adUnitId = w;
      this._position = u;
      this._size = "";
      switch (q) {
        case "portrait":
          this._size = 5;
          break;
        case "landscape":
          this._size = 5;
          break;
        case "standard":
          this._size = 0;
          break;
        case "large":
          this._size = 1;
          break;
        case "medium":
          this._size = 2;
          break;
        case "full":
          this._size = 3;
          break;
        case "leaderboard":
          this._size = 4;
          break;
        default:
          this._size = 5;
      }
      this._ad = null;
      this._adShowing = this._adLoading = !1;
    }
    Load(w, q) {
      if (this._ad) return d(q, "banner ad loaded");
      y.call(this, q);
      w = {
        adUnitId: b.GetAdUnit(this._adUnitId, "banner"),
        size: this._size,
        position: this._position,
        offset: 0,
        npa: "NON_PERSONALIZED" === w ? "1" : "0",
      };
      this._ad = new self.admob.BannerAd(w);
      this._ad.load();
    }
    async Show(w) {
      if (!this._ad) return k(w, "banner ad not created");
      if (this._adLoading) return k(w, "banner ad still loading");
      if (this._adShowing) return d(w, "banner ad already shown");
      await this._ad.show();
      this._adShowing = !0;
      d(w, "banner shown");
    }
    async Hide(w) {
      if (!this._ad) return k(w, "banner ad not created");
      if (this._adLoading) return k(w, "banner ad still loading");
      if (!this._adShowing) return d(w, "banner ad not being shown");
      await this._ad.hide();
      this._adShowing = !1;
      d(w, "banner ad hidden");
    }
    IsLoading() {
      return this._adLoading;
    }
    IsShowing() {
      return this._adShowing;
    }
  }
  function y(w) {
    const q = (m) => {
        this._adLoading = !1;
        d(w, "banner ad loaded");
        document.removeEventListener(p.LOAD, q);
        document.removeEventListener(p.LOAD_FAIL, u);
      },
      u = (m) => {
        this._ad = null;
        this._adLoading = !1;
        k(w, "banner ad failed to load");
        document.removeEventListener(p.LOAD, q);
        document.removeEventListener(p.LOAD_FAIL, u);
      };
    document.addEventListener(p.LOAD, q);
    document.addEventListener(p.LOAD_FAIL, u);
  }
  self.C3BannerAd = z;
}
("use strict");
{
  const b = self.C3AdUtils,
    d = b.Success,
    k = b.Failure,
    p = {
      get LOAD() {
        return self.admob.Events.interstitialLoad;
      },
      get LOAD_FAIL() {
        return self.admob.Events.interstitialLoadFail;
      },
      get SHOW() {
        return self.admob.Events.interstitialShow;
      },
      get SHOW_FAIL() {
        return self.admob.Events.interstitialShowFail;
      },
      get DISMISS() {
        return self.admob.Events.interstitialDismiss;
      },
    };
  class z {
    constructor(q, u) {
      if (!q) return k(u, "Unit ID not specified");
      this._adUnitId = q;
      this._ad = null;
      this._loadSuccess = this._adShowing = this._adLoading = !1;
      this._loadPromiseResolver = null;
      this._loadPromise = this.GetLoadPromise();
      document.addEventListener(p.DISMISS, async (m) => {
        this._adShowing = !1;
        this._adLoading = !0;
        this._loadSuccess = !1;
        this._loadPromise = null;
        this._loadPromise = this.GetLoadPromise();
        y.call(this);
        await this._ad.load();
      });
    }
    GetLoadPromise() {
      return this._loadPromise
        ? this._loadPromise
        : (this._loadPromise = new Promise((q) => {
            this._loadPromiseResolver = q;
          }));
    }
    ResolveLoadPromise(q) {
      this._loadSuccess = q;
      this._loadPromiseResolver && this._loadPromiseResolver(q);
      this._loadPromiseResolver = this._loadPromise = null;
      this._loadPromise = this.GetLoadPromise();
    }
    Load(q, u) {
      q = {
        adUnitId: b.GetAdUnit(this._adUnitId, "interstitial"),
        npa: "NON_PERSONALIZED" === q ? "1" : "0",
      };
      this._adLoading = !0;
      this._loadSuccess = this._adShowing = !1;
      this._loadPromise = null;
      this._loadPromise = this.GetLoadPromise();
      this._ad = new self.admob.InterstitialAd(q);
      y.call(this, u);
      this._ad.load();
    }
    async Show(q) {
      if (!this._ad) return k(q, "interstitial ad not created");
      if (this._adShowing) return d(q, "interstitial ad already shown");
      this._adLoading && (await this.GetLoadPromise());
      await (async () => {
        this._loadSuccess
          ? (w.call(this, q), await this._ad.show())
          : (y.call(this),
            (this._loadSuccess = !1),
            (this._loadPromise = null),
            this._ad.load(),
            await this.GetLoadPromise(),
            this._loadSuccess
              ? (w.call(this, q), await this._ad.show())
              : k(q, "interstitial ad failed to load"));
      })();
    }
    IsLoading() {
      return this._adLoading;
    }
    IsShowing() {
      return this._adShowing;
    }
  }
  function y(q) {
    const u = (A) => {
        this._adLoading = !1;
        this.ResolveLoadPromise(!0);
        q && d(q, "interstitial ad load");
        document.removeEventListener(p.LOAD, u);
        document.removeEventListener(p.LOAD_FAIL, m);
      },
      m = (A) => {
        this._adLoading = !1;
        this.ResolveLoadPromise(!1);
        q && k(q, "interstitial ad failed to load");
        document.removeEventListener(p.LOAD, u);
        document.removeEventListener(p.LOAD_FAIL, m);
      };
    document.addEventListener(p.LOAD, u);
    document.addEventListener(p.LOAD_FAIL, m);
  }
  function w(q) {
    const u = (A) => {
        this._adShowing = !0;
        q && d(q, "interstitial ad show");
        document.removeEventListener(p.SHOW, u);
        document.removeEventListener(p.SHOW_FAIL, m);
      },
      m = (A) => {
        this._adShowing = !1;
        q && k(q, "interstitial ad failed to show");
        document.removeEventListener(p.SHOW, u);
        document.removeEventListener(p.SHOW_FAIL, m);
      };
    document.addEventListener(p.SHOW, u);
    document.addEventListener(p.SHOW_FAIL, m);
  }
  self.C3InterstitialAd = z;
}
("use strict");
{
  const b = self.C3AdUtils,
    d = b.Success,
    k = b.Failure,
    p = {
      get LOAD() {
        return self.admob.Events.rewardedLoad;
      },
      get LOAD_FAIL() {
        return self.admob.Events.rewardedLoadFail;
      },
      get SHOW() {
        return self.admob.Events.rewardedShow;
      },
      get SHOW_FAIL() {
        return self.admob.Events.rewardedShowFail;
      },
      get DISMISS() {
        return self.admob.Events.rewardedDismiss;
      },
      get REWARD() {
        return self.admob.Events.rewardedReward;
      },
    };
  class z {
    constructor(q, u) {
      if (!q) return k(u, "Unit ID not specified");
      this._adUnitId = q;
      this._ad = null;
      this._loadSuccess = this._adShowing = this._adLoading = !1;
      this._loadPromiseResolver = null;
      this._loadPromise = this.GetLoadPromise();
      this._reward = null;
    }
    GetLoadPromise() {
      return this._loadPromise
        ? this._loadPromise
        : (this._loadPromise = new Promise((q) => {
            this._loadPromiseResolver = q;
          }));
    }
    ResolveLoadPromise(q) {
      this._loadSuccess = q;
      this._loadPromiseResolver && this._loadPromiseResolver(q);
      this._loadPromiseResolver = this._loadPromise = null;
      this._loadPromise = this.GetLoadPromise();
    }
    Load(q, u) {
      q = {
        adUnitId: b.GetAdUnit(this._adUnitId, "rewarded"),
        npa: "NON_PERSONALIZED" === q ? "1" : "0",
      };
      this._adLoading = !0;
      this._loadSuccess = this._adShowing = !1;
      this._loadPromise = null;
      this._loadPromise = this.GetLoadPromise();
      this._ad = new self.admob.RewardedAd(q);
      y.call(this, u);
      this._ad.load();
    }
    async Show(q) {
      if (!this._ad) return k(q, "rewarded ad not created");
      if (this._adShowing) return d(q, "rewarded ad already shown");
      this._adLoading && (await this.GetLoadPromise());
      await (async () => {
        this._loadSuccess
          ? (w.call(this, q), await this._ad.show())
          : (y.call(this),
            (this._loadSuccess = !1),
            (this._loadPromise = null),
            this._ad.load(),
            await this.GetLoadPromise(),
            this._loadSuccess
              ? (w.call(this, q), await this._ad.show())
              : k(q, "rewarded ad failed to load"));
      })();
    }
    IsLoading() {
      return this._adLoading;
    }
    IsShowing() {
      return this._adShowing;
    }
  }
  function y(q) {
    const u = (A) => {
        this._adLoading = !1;
        this.ResolveLoadPromise(!0);
        q && d(q, "rewarded ad load");
        document.removeEventListener(p.LOAD, u);
        document.removeEventListener(p.LOAD_FAIL, m);
      },
      m = (A) => {
        this._adLoading = !1;
        this.ResolveLoadPromise(!1);
        q && k(q, "rewarded ad failed to load");
        document.removeEventListener(p.LOAD, u);
        document.removeEventListener(p.LOAD_FAIL, m);
      };
    document.addEventListener(p.LOAD, u);
    document.addEventListener(p.LOAD_FAIL, m);
  }
  function w(q) {
    const u = (x) => {
        this._adShowing = !0;
      },
      m = (x) => {
        this._reward = x.reward;
      },
      A = (x) => {
        this._adShowing = !1;
        q && k(q, "rewarded ad failed to show");
        document.removeEventListener(p.SHOW, u);
        document.removeEventListener(p.SHOW_FAIL, A);
        document.removeEventListener(p.REWARD, m);
        document.removeEventListener(p.DISMISS, D);
      },
      D = (x) => {
        if (null !== this._reward) {
          x = String(this._reward.type);
          const r = String(this._reward.amount);
          q && d(q, JSON.stringify([x, r]));
        } else q && k(q, "closed with no reward");
        this._reward = null;
        this._adShowing = !1;
        this._adLoading = !0;
        this._loadSuccess = !1;
        this._loadPromise = null;
        this._loadPromise = this.GetLoadPromise();
        y.call(this);
        this._ad.load();
        document.removeEventListener(p.SHOW, u);
        document.removeEventListener(p.SHOW_FAIL, A);
        document.removeEventListener(p.REWARD, m);
        document.removeEventListener(p.DISMISS, D);
      };
    document.addEventListener(p.SHOW, u);
    document.addEventListener(p.SHOW_FAIL, A);
    document.addEventListener(p.REWARD, m);
    document.addEventListener(p.DISMISS, D);
  }
  self.C3RewardedAd = z;
}
("use strict");
{
  const b = self.C3AdUtils,
    d = b.Success,
    k = b.Failure,
    p = {
      get LOAD() {
        return self.admob.Events.rewardedInterstitialLoad;
      },
      get LOAD_FAIL() {
        return self.admob.Events.rewardedInterstitialLoadFail;
      },
      get SHOW() {
        return self.admob.Events.rewardedInterstitialShow;
      },
      get SHOW_FAIL() {
        return self.admob.Events.rewardedInterstitialShowFail;
      },
      get DISMISS() {
        return self.admob.Events.rewardedInterstitialDismiss;
      },
      get REWARD() {
        return self.admob.Events.rewardedInterstitialReward;
      },
    };
  class z {
    constructor(q, u) {
      if (!q) return k(u, "Unit ID not specified");
      this._adUnitId = q;
      this._ad = null;
      this._loadSuccess = this._adShowing = this._adLoading = !1;
      this._loadPromiseResolver = null;
      this._loadPromise = this.GetLoadPromise();
      this._reward = null;
    }
    GetLoadPromise() {
      return this._loadPromise
        ? this._loadPromise
        : (this._loadPromise = new Promise((q) => {
            this._loadPromiseResolver = q;
          }));
    }
    ResolveLoadPromise(q) {
      this._loadSuccess = q;
      this._loadPromiseResolver && this._loadPromiseResolver(q);
      this._loadPromiseResolver = this._loadPromise = null;
      this._loadPromise = this.GetLoadPromise();
    }
    Load(q, u) {
      q = {
        adUnitId: b.GetAdUnit(this._adUnitId, "rewardedInterstitial"),
        npa: "NON_PERSONALIZED" === q ? "1" : "0",
      };
      this._adLoading = !0;
      this._loadSuccess = this._adShowing = !1;
      this._loadPromise = null;
      this._loadPromise = this.GetLoadPromise();
      this._ad = new self.admob.RewardedInterstitialAd(q);
      y.call(this, u);
      this._ad.load();
    }
    async Show(q) {
      if (!this._ad) return k(q, "rewarded interstitial ad not created");
      if (this._adShowing)
        return d(q, "rewarded interstitial ad already shown");
      this._adLoading && (await this.GetLoadPromise());
      await (async () => {
        this._loadSuccess
          ? (w.call(this, q), await this._ad.show())
          : (y.call(this),
            (this._loadSuccess = !1),
            (this._loadPromise = null),
            this._ad.load(),
            await this.GetLoadPromise(),
            this._loadSuccess
              ? (w.call(this, q), await this._ad.show())
              : k(q, "rewarded interstitial ad failed to load"));
      })();
    }
    IsLoading() {
      return this._adLoading;
    }
    IsShowing() {
      return this._adShowing;
    }
  }
  function y(q) {
    const u = (A) => {
        this._adLoading = !1;
        this.ResolveLoadPromise(!0);
        q && d(q, "rewarded interstitial ad load");
        document.removeEventListener(p.LOAD, u);
        document.removeEventListener(p.LOAD_FAIL, m);
      },
      m = (A) => {
        this._adLoading = !1;
        this.ResolveLoadPromise(!1);
        q && k(q, "rewarded interstitial ad failed to load");
        document.removeEventListener(p.LOAD, u);
        document.removeEventListener(p.LOAD_FAIL, m);
      };
    document.addEventListener(p.LOAD, u);
    document.addEventListener(p.LOAD_FAIL, m);
  }
  function w(q) {
    const u = (x) => {
        this._adShowing = !0;
      },
      m = (x) => {
        this._reward = x.reward;
      },
      A = (x) => {
        this._adShowing = !1;
        q && k(q, "rewarded interstitial ad failed to show");
        document.removeEventListener(p.SHOW, u);
        document.removeEventListener(p.SHOW_FAIL, A);
        document.removeEventListener(p.REWARD, m);
        document.removeEventListener(p.DISMISS, D);
      },
      D = (x) => {
        if (null !== this._reward) {
          x = String(this._reward.type);
          const r = String(this._reward.amount);
          q && d(q, JSON.stringify([x, r]));
        } else q && k(q, "closed with no reward");
        this._reward = null;
        this._adShowing = !1;
        this._adLoading = !0;
        this._loadSuccess = !1;
        this._loadPromise = null;
        this._loadPromise = this.GetLoadPromise();
        y.call(this);
        this._ad.load();
        document.removeEventListener(p.SHOW, u);
        document.removeEventListener(p.SHOW_FAIL, A);
        document.removeEventListener(p.REWARD, m);
        document.removeEventListener(p.DISMISS, D);
      };
    document.addEventListener(p.SHOW, u);
    document.addEventListener(p.SHOW_FAIL, A);
    document.addEventListener(p.REWARD, m);
    document.addEventListener(p.DISMISS, D);
  }
  self.C3RewardedInterstitialAd = z;
}
("use strict");
{
  const b = self.C3AdUtils,
    d = b.Success,
    k = b.Failure,
    p = self.cordova ? "ios" === self.cordova.platformId : !1,
    z = self.cordova ? "android" === self.cordova.platformId : !1,
    y = z ? 1 : 2,
    w = z ? 2 : 1;
  class q {
    constructor() {
      this._adPersonalization = "UNKNOWN";
      this._inEEAorUnknown = "";
      this._consentStatusIndex = 0;
      this._consentStatusString = "UNKNOWN";
      this._trackingStatusString = "not-determined";
      this._hasConsentForm = !1;
    }
    async Reset() {
      b.ConfigurationOptions.debug && (await self.consent.reset());
    }
    GetAdPersonalization() {
      return this._adPersonalization;
    }
    async RequestTrackingAuthorization() {
      p && (await self.admob.requestTrackingAuthorization());
    }
    async GetTrackingAuthorizationStatus() {
      if (z) return (this._trackingStatusString = "not-determined");
      const e = self.cordova.plugins.idfa,
        l = await e.getInfo();
      if (!l.trackingLimited)
        return (this._trackingStatusString = "authorized");
      switch (l.trackingPermission) {
        case e.TRACKING_PERMISSION_NOT_DETERMINED:
          return (this._trackingStatusString = "not-determined");
        case e.TRACKING_PERMISSION_RESTRICTED:
          return (this._trackingStatusString = "denied");
        case e.TRACKING_PERMISSION_DENIED:
          return (this._trackingStatusString = "denied");
        case e.TRACKING_PERMISSION_AUTHORIZED:
          return (this._trackingStatusString = "authorized");
      }
    }
    async RequestIDFA(e) {
      if (z) return d(e, "not-determined");
      if (p)
        return (
          await x.call(this),
          "true" === this._inEEAorUnknown
            ? await this.RequestTrackingAuthorization()
            : (await this.GetTrackingAuthorizationStatus(),
              "not-determined" === this._trackingStatusString &&
                (await u.call(this),
                this._hasConsentForm
                  ? await this.ShowIDFAMessage()
                  : await this.RequestTrackingAuthorization())),
          await this.GetTrackingAuthorizationStatus(),
          d(e, this._trackingStatusString)
        );
    }
    async RequestInfoUpdateForTesting(e, l, n) {
      return await h.call(this, e, l, (t) => {
        t ? k(n, t.message) : k(n, "requestInfoUpdate error");
      });
    }
    async RequestInfoUpdateForTestingSkipErrors(e, l, n) {
      await h.call(this, e, l);
    }
    async ShowConsentForm(e, l = !1) {
      await m.call(this);
      switch (e) {
        case "eu":
          l = await u.call(this);
          A.call(this) && l && (await (await self.consent.loadForm()).show());
          break;
        case "always": {
          e = await u.call(this);
          const n = await x.call(this);
          e && "true" === n
            ? await (await self.consent.loadForm()).show()
            : e && l && (await (await self.consent.loadForm()).show());
        }
      }
      await m.call(this);
      await x.call(this);
      await D.call(this);
    }
    async ShowIDFAMessage(e) {
      await this.ShowConsentForm("always", !0);
    }
    async UpdateConsentStatus() {
      await m.call(this);
      await x.call(this);
      await D.call(this);
    }
    async SuccessResponse(e) {
      await this.GetTrackingAuthorizationStatus();
      d(
        e,
        `${this._consentStatusString}&&${this._trackingStatusString}&&${this._inEEAorUnknown}`
      );
    }
    async StatusUpdateSuccessResponse(e) {
      await this.UpdateConsentStatus();
      await this.GetTrackingAuthorizationStatus();
      d(
        e,
        `${this._consentStatusString}&&${this._trackingStatusString}&&${this._inEEAorUnknown}`
      );
    }
  }
  async function u() {
    return (this._hasConsentForm =
      (await self.consent.getFormStatus()) ===
      self.consent.FormStatus.Available);
  }
  async function m() {
    this._consentStatusIndex = await self.consent.getConsentStatus();
    switch (this._consentStatusIndex) {
      case w:
        return (this._consentStatusString = "REQUIRED");
      case y:
        return (this._consentStatusString = "NOT_REQUIRED");
      case 3:
        return (this._consentStatusString = "OBTAINED");
      case 0:
        return (this._consentStatusString = "UNKNOWN");
    }
  }
  function A() {
    switch (this._consentStatusIndex) {
      case w:
        return !0;
      case y:
        return !1;
      case 3:
        return !1;
      case 0:
        return !0;
    }
  }
  function D() {
    switch (this._consentStatusIndex) {
      case w:
        return (this._adPersonalization = "NON_PERSONALIZED");
      case y:
        return (this._adPersonalization = "PERSONALIZED");
      case 3:
        return (this._adPersonalization = "PERSONALIZED");
      case 0:
        return (this._adPersonalization = "NON_PERSONALIZED");
    }
  }
  async function x() {
    if (z)
      switch (this._consentStatusIndex) {
        case w:
          return (this._inEEAorUnknown = "true");
        case y:
          return (this._inEEAorUnknown = "false");
        case 3:
          return (this._inEEAorUnknown = "true");
        case 0:
          return (this._inEEAorUnknown = "true");
      }
    if (p)
      return (await r.call(this, "IABTCF_gdprApplies", "getInt"))
        ? (this._inEEAorUnknown = "true")
        : (this._inEEAorUnknown = "false");
  }
  async function r(e, l) {
    return new Promise((n, t) => {
      self.NativeStorage[l](
        e,
        (F) => n(F),
        (F) => n(1)
      );
    });
  }
  async function h(e, l, n) {
    let t = "",
      F = null;
    if (e) {
      switch (l) {
        case "EEA":
          t = self.consent.DebugGeography.EEA;
          break;
        case "NOT_EEA":
          t = self.consent.DebugGeography.NotEEA;
          break;
        default:
          t = self.consent.DebugGeography.Disabled;
      }
      F = [await b.TestId];
    }
    try {
      return (
        e
          ? await self.consent.requestInfoUpdate({
              debugGeography: t,
              testDeviceIds: F,
            })
          : await self.consent.requestInfoUpdate(),
        !0
      );
    } catch (c) {
      return n && n(c), !1;
    }
  }
  self.C3Consent = new q();
}
("use strict");
{
  const b = (r, h) => {
      let e = r[0],
        l = r[1],
        n = r[2],
        t = r[3];
      e = k(e, l, n, t, h[0], 7, -680876936);
      t = k(t, e, l, n, h[1], 12, -389564586);
      n = k(n, t, e, l, h[2], 17, 606105819);
      l = k(l, n, t, e, h[3], 22, -1044525330);
      e = k(e, l, n, t, h[4], 7, -176418897);
      t = k(t, e, l, n, h[5], 12, 1200080426);
      n = k(n, t, e, l, h[6], 17, -1473231341);
      l = k(l, n, t, e, h[7], 22, -45705983);
      e = k(e, l, n, t, h[8], 7, 1770035416);
      t = k(t, e, l, n, h[9], 12, -1958414417);
      n = k(n, t, e, l, h[10], 17, -42063);
      l = k(l, n, t, e, h[11], 22, -1990404162);
      e = k(e, l, n, t, h[12], 7, 1804603682);
      t = k(t, e, l, n, h[13], 12, -40341101);
      n = k(n, t, e, l, h[14], 17, -1502002290);
      l = k(l, n, t, e, h[15], 22, 1236535329);
      e = p(e, l, n, t, h[1], 5, -165796510);
      t = p(t, e, l, n, h[6], 9, -1069501632);
      n = p(n, t, e, l, h[11], 14, 643717713);
      l = p(l, n, t, e, h[0], 20, -373897302);
      e = p(e, l, n, t, h[5], 5, -701558691);
      t = p(t, e, l, n, h[10], 9, 38016083);
      n = p(n, t, e, l, h[15], 14, -660478335);
      l = p(l, n, t, e, h[4], 20, -405537848);
      e = p(e, l, n, t, h[9], 5, 568446438);
      t = p(t, e, l, n, h[14], 9, -1019803690);
      n = p(n, t, e, l, h[3], 14, -187363961);
      l = p(l, n, t, e, h[8], 20, 1163531501);
      e = p(e, l, n, t, h[13], 5, -1444681467);
      t = p(t, e, l, n, h[2], 9, -51403784);
      n = p(n, t, e, l, h[7], 14, 1735328473);
      l = p(l, n, t, e, h[12], 20, -1926607734);
      e = z(e, l, n, t, h[5], 4, -378558);
      t = z(t, e, l, n, h[8], 11, -2022574463);
      n = z(n, t, e, l, h[11], 16, 1839030562);
      l = z(l, n, t, e, h[14], 23, -35309556);
      e = z(e, l, n, t, h[1], 4, -1530992060);
      t = z(t, e, l, n, h[4], 11, 1272893353);
      n = z(n, t, e, l, h[7], 16, -155497632);
      l = z(l, n, t, e, h[10], 23, -1094730640);
      e = z(e, l, n, t, h[13], 4, 681279174);
      t = z(t, e, l, n, h[0], 11, -358537222);
      n = z(n, t, e, l, h[3], 16, -722521979);
      l = z(l, n, t, e, h[6], 23, 76029189);
      e = z(e, l, n, t, h[9], 4, -640364487);
      t = z(t, e, l, n, h[12], 11, -421815835);
      n = z(n, t, e, l, h[15], 16, 530742520);
      l = z(l, n, t, e, h[2], 23, -995338651);
      e = y(e, l, n, t, h[0], 6, -198630844);
      t = y(t, e, l, n, h[7], 10, 1126891415);
      n = y(n, t, e, l, h[14], 15, -1416354905);
      l = y(l, n, t, e, h[5], 21, -57434055);
      e = y(e, l, n, t, h[12], 6, 1700485571);
      t = y(t, e, l, n, h[3], 10, -1894986606);
      n = y(n, t, e, l, h[10], 15, -1051523);
      l = y(l, n, t, e, h[1], 21, -2054922799);
      e = y(e, l, n, t, h[8], 6, 1873313359);
      t = y(t, e, l, n, h[15], 10, -30611744);
      n = y(n, t, e, l, h[6], 15, -1560198380);
      l = y(l, n, t, e, h[13], 21, 1309151649);
      e = y(e, l, n, t, h[4], 6, -145523070);
      t = y(t, e, l, n, h[11], 10, -1120210379);
      n = y(n, t, e, l, h[2], 15, 718787259);
      l = y(l, n, t, e, h[9], 21, -343485551);
      r[0] = x(e, r[0]);
      r[1] = x(l, r[1]);
      r[2] = x(n, r[2]);
      r[3] = x(t, r[3]);
    },
    d = (r, h, e, l, n, t) => {
      h = x(x(h, r), x(l, t));
      return x((h << n) | (h >>> (32 - n)), e);
    },
    k = (r, h, e, l, n, t, F) => d((h & e) | (~h & l), r, h, n, t, F),
    p = (r, h, e, l, n, t, F) => d((h & l) | (e & ~l), r, h, n, t, F),
    z = (r, h, e, l, n, t, F) => d(h ^ e ^ l, r, h, n, t, F),
    y = (r, h, e, l, n, t, F) => d(e ^ (h | ~l), r, h, n, t, F),
    w = (r) => {
      const h = r.length,
        e = [1732584193, -271733879, -1732584194, 271733878];
      let l;
      for (l = 64; l <= r.length; l += 64) b(e, q(r.substring(l - 64, l)));
      r = r.substring(l - 64);
      const n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (l = 0; l < r.length; l++)
        n[l >> 2] |= r.charCodeAt(l) << (l % 4 << 3);
      n[l >> 2] |= 128 << (l % 4 << 3);
      if (55 < l) for (b(e, n), l = 0; 16 > l; l++) n[l] = 0;
      n[14] = 8 * h;
      b(e, n);
      return e;
    },
    q = (r) => {
      const h = [];
      for (let e = 0; 64 > e; e += 4)
        h[e >> 2] =
          r.charCodeAt(e) +
          (r.charCodeAt(e + 1) << 8) +
          (r.charCodeAt(e + 2) << 16) +
          (r.charCodeAt(e + 3) << 24);
      return h;
    },
    u = "0123456789abcdef".split(""),
    m = (r) => {
      let h = "";
      for (let e = 0; 4 > e; e++)
        h += u[(r >> (8 * e + 4)) & 15] + u[(r >> (8 * e)) & 15];
      return h;
    },
    A = (r) => {
      for (let h = 0; h < r.length; h++) r[h] = m(r[h]);
      return r.join("");
    },
    D = (r) => A(w(r));
  let x = (r, h) => (r + h) & 4294967295;
  D("hello");
  self.C3AdUtilsMD5 = D;
}
("use strict");
{
  const b = self.C3AdUtils,
    d = self.C3Consent,
    k = self.C3BannerAd,
    p = self.C3InterstitialAd,
    z = self.C3RewardedAd,
    y = self.C3RewardedInterstitialAd;
  let w = null,
    q = null,
    u = null,
    m = null,
    A = null;
  const D = {},
    x = (r, h) => {
      D[r] = h;
    };
  x("CreateBannerAdvert", async (r, h, e, l, n) => {
    (await b.StartAdmobPlus(n, e)) &&
      ((e = await d.GetAdPersonalization()),
      w || (w = new k(r, h, l, n)),
      w.Load(e, n));
  });
  x("ShowBannerAdvert", async (r) => {
    if (!w) return b.Failure(r, "banner ad not created");
    w.Show(r);
  });
  x("HideBannerAdvert", async (r) => {
    if (!w) return b.Failure(r, "banner ad not created");
    w.Hide(r);
  });
  x("CreateInterstitialAdvert", async (r, h, e) => {
    if (q) return b.Success(e, "interstitial ad already created");
    (await b.StartAdmobPlus(e, h)) &&
      ((h = await d.GetAdPersonalization()), (q = new p(r, e)), q.Load(h, e));
  });
  x("ShowInterstitialAdvert", async (r) => {
    if (!q) return b.Failure(r, "interstitial ad not created");
    q.Show(r);
  });
  x("CreateVideoAdvert", async (r, h, e) => {
    if (u || m) return b.Success(e, "video ad already created");
    (await b.StartAdmobPlus(e, h)) &&
      ((h = await d.GetAdPersonalization()), (u = new z(r, e)), u.Load(h, e));
  });
  x("ShowVideoAdvert", async (r) => {
    if (!u) return b.Failure(r, "video ad not created");
    u.Show(r);
  });
  x("CreateRewardedAdvert", async (r, h, e) => {
    if (m || u) return b.Success(e, "rewarded ad already created");
    (await b.StartAdmobPlus(e, h)) &&
      ((h = await d.GetAdPersonalization()), (m = new z(r, e)), m.Load(h, e));
  });
  x("ShowRewardedAdvert", async (r) => {
    if (!m) return b.Failure(r, "rewarded ad not created");
    m.Show(r);
  });
  x("CreateRewardedInterstitialAdvert", async (r, h, e) => {
    if (A) return b.Success(e, "rewarded interstitial ad already created");
    (await b.StartAdmobPlus(e, h)) &&
      ((h = await d.GetAdPersonalization()), (A = new y(r, e)), A.Load(h, e));
  });
  x("ShowRewardedInterstitialAdvert", async (r) => {
    if (!A) return b.Failure(r, "rewarded interstitial ad not created");
    A.Show(r);
  });
  x("Configure", async (r, h, e, l, n, t, F, c, a) => {
    const f = !b.HasInitConfigurationOptions();
    b.SetInitConfigureOptions(r, h, e, l, n, t, F);
    (await b.StartAdmobPlus(a, t)) &&
      (f && (await d.Reset()),
      (await d.RequestInfoUpdateForTesting(t, F, a)) &&
        (f
          ? c
            ? await d.ShowConsentForm("eu")
            : await d.UpdateConsentStatus()
          : await d.ShowConsentForm("always"),
        await d.SuccessResponse(a)));
  });
  x("RequestConsent", async (r) => {
    D.Configure(
      b.ConfigurationOptions.id,
      b.ConfigurationOptions.pubID,
      b.ConfigurationOptions.privacyPolicy,
      b.ConfigurationOptions.showFree,
      "always",
      b.ConfigurationOptions.debug,
      b.ConfigurationOptions.debugLocation,
      !1,
      r
    );
  });
  x("SetMaxAdContentRating", async (r, h) => {
    if (await b.StartAdmobPlus(h)) {
      if (!r) return b.Failure(h, "Label not specified");
      try {
        b.UpdateAdmobPlusRequest("maxAdContentRating", r), b.Success(h, "");
      } catch (e) {
        b.Failure(h, "invalid label");
      }
    }
  });
  x("TagForChildDirectedTreatment", async (r, h) => {
    if (await b.StartAdmobPlus(h))
      try {
        b.UpdateAdmobPlusRequest(
          "tagForChildDirectedTreatment",
          1 === r ? !0 : !1
        ),
          b.Success(h, "");
      } catch (e) {
        b.Failure(h, "invalid label");
      }
  });
  x("TagForUnderAgeOfConsent", async (r, h) => {
    if (await b.StartAdmobPlus(h))
      try {
        b.UpdateAdmobPlusRequest("tagForUnderAgeOfConsent", 1 === r ? !0 : !1),
          b.Success(h, "");
      } catch (e) {
        b.Failure(h, "invalid label");
      }
  });
  x("RequestIDFA", async (r) => {
    (await b.StartAdmobPlus(r)) && d.RequestIDFA(r);
  });
  x("StatusUpdate", async (r, h, e) => {
    (await b.StartAdmobPlus(e, r)) &&
      (await d.RequestInfoUpdateForTestingSkipErrors(r, h, e),
      await d.StatusUpdateSuccessResponse(e));
  });
  self.C3MobileAdvertsAPI || (self.C3MobileAdvertsAPI = {});
  self.C3MobileAdvertsAPI.real = D;
}
("use strict");
{
  const b = {},
    d = (m, A) => (b[m] = A),
    k = (m) => new Promise((A) => setTimeout(A, m));
  let p = null,
    z = null,
    y = null,
    w = null,
    q = null;
  function u(m, A) {
    const D = A.slice(0, -1);
    A = A[A.length - 1];
    console.log(m, D);
    return [D, A];
  }
  d("CreateBannerAdvert", async (...m) => {
    [, m] = u("CreateBannerAdvert", m);
    await k(50);
    p ? m("Banner already exists") : ((p = "ready"), m(null, "Created banner"));
  });
  d("ShowBannerAdvert", async (...m) => {
    [, m] = u("ShowBannerAdvert", m);
    await k(50);
    "ready" != p
      ? m("Banner cannot be shown")
      : ((p = "shown"), m(null, "Showed banner"));
  });
  d("HideBannerAdvert", async (...m) => {
    [, m] = u("HideBannerAdvert", m);
    await k(50);
    "shown" != p
      ? m("Banner cannot be hidden")
      : ((p = null), m(null, "Hid banner"));
  });
  d("CreateInterstitialAdvert", async (...m) => {
    [, m] = u("CreateInterstitialAdvert", m);
    await k(50);
    z
      ? m("Intersitial already exists")
      : ((z = "ready"), m(null, "Created interstitial"));
  });
  d("ShowInterstitialAdvert", async (...m) => {
    [, m] = u("ShowInterstitialAdvert", m);
    await k(50);
    "ready" != z
      ? m("Cannot show interstitial")
      : ((z = null), m(null, "Interstitial shown"));
  });
  d("CreateVideoAdvert", async (...m) => {
    [, m] = u("CreateVideoAdvert", m);
    await k(50);
    y ? m("Video already exists") : ((y = "ready"), m(null, "Created video"));
  });
  d("ShowVideoAdvert", async (...m) => {
    [, m] = u("ShowVideoAdvert", m);
    await k(50);
    "ready" != y
      ? m("Cannot show video")
      : ((y = null), m(null, '["example type", 20]'));
  });
  d("CreateRewardedAdvert", async (...m) => {
    [, m] = u("CreateRewardedAdvert", m);
    await k(50);
    w
      ? m("Rewarded already exists")
      : ((w = "ready"), m(null, "Created rewarded"));
  });
  d("ShowRewardedAdvert", async (...m) => {
    [, m] = u("ShowRewardedAdvert", m);
    await k(50);
    "ready" != w
      ? m("Cannot show rewarded")
      : ((w = null), m(null, '["example type", 20]'));
  });
  d("CreateRewardedInterstitialAdvert", async (...m) => {
    [, m] = u("CreateRewardedInterstitialAdvert", m);
    await k(50);
    q
      ? m("Rewarded intersitial already exists")
      : ((q = "ready"), m(null, "Created rewarded interstitial"));
  });
  d("ShowRewardedInterstitialAdvert", async (...m) => {
    [, m] = u("ShowRewardedInterstitialAdvert", m);
    await k(50);
    "ready" != q
      ? m("Cannot show rewarded interstitial")
      : ((q = null), m(null, "Rewarded interstitial shown"));
  });
  d("Configure", async (...m) => {
    [, m] = u("Configure", m);
    await k(50);
    m(null, "PERSONALIZED&&true");
  });
  d("RequestConsent", async (...m) => {
    [, m] = u("RequestConsent", m);
    await k(50);
    m(null, "PERSONALIZED&&true");
  });
  d("RequestIDFA", async (...m) => {
    [, m] = u("RequestIDFA", m);
    await k(50);
    m(null, "authorized");
  });
  self.C3MobileAdvertsAPI || (self.C3MobileAdvertsAPI = {});
  self.C3MobileAdvertsAPI.fake = b;
}
("use strict");
{
  let b = !1;
  self.RuntimeInterface.AddDOMHandlerClass(
    class extends self.DOMHandler {
      constructor(d) {
        super(d, "advert");
        d = (k) => [k, (p) => this._CallMethod(k, p)];
        this.AddRuntimeMessageHandlers([
          d("CreateBannerAdvert"),
          d("ShowBannerAdvert"),
          d("HideBannerAdvert"),
          d("CreateInterstitialAdvert"),
          d("ShowInterstitialAdvert"),
          d("CreateVideoAdvert"),
          d("ShowVideoAdvert"),
          d("CreateRewardedAdvert"),
          d("ShowRewardedAdvert"),
          d("CreateRewardedInterstitialAdvert"),
          d("ShowRewardedInterstitialAdvert"),
          d("Configure"),
          d("RequestConsent"),
          d("SetUserPersonalisation"),
          d("SetMaxAdContentRating"),
          d("TagForChildDirectedTreatment"),
          d("TagForUnderAgeOfConsent"),
          d("RequestIDFA"),
          d("StatusUpdate"),
        ]);
      }
      _GetPlugin() {}
      async _CallMethod(d, k) {
        let p;
        self.cordova && (p = self.C3MobileAdvertsAPI.real);
        if (!p)
          throw (
            (b ||
              ((b = !0),
              console.warn(
                "The Mobile Advert plugin is not loaded. Please note that it only works in Android or iOS exports"
              )),
            Error("advert plugin not loaded"))
          );
        return new Promise((z, y) => {
          (0, p[d])(...k, (w, q) => {
            w ? y(w) : z(q);
          });
        });
      }
    }
  );
}
