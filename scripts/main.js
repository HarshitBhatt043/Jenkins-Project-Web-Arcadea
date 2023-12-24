"use strict";
{
  window.DOMHandler = class DOMHandler {
    constructor(iRuntime, componentId) {
      this._iRuntime = iRuntime;
      this._componentId = componentId;
      this._hasTickCallback = false;
      this._tickCallback = () => this.Tick();
    }
    Attach() {}
    PostToRuntime(handler, data, dispatchOpts, transferables) {
      this._iRuntime.PostToRuntimeComponent(
        this._componentId,
        handler,
        data,
        dispatchOpts,
        transferables
      );
    }
    PostToRuntimeAsync(handler, data, dispatchOpts, transferables) {
      return this._iRuntime.PostToRuntimeComponentAsync(
        this._componentId,
        handler,
        data,
        dispatchOpts,
        transferables
      );
    }
    _PostToRuntimeMaybeSync(name, data, dispatchOpts) {
      if (this._iRuntime.UsesWorker())
        this.PostToRuntime(name, data, dispatchOpts);
      else
        this._iRuntime._GetLocalRuntime()["_OnMessageFromDOM"]({
          type: "event",
          component: this._componentId,
          handler: name,
          dispatchOpts: dispatchOpts || null,
          data: data,
          responseId: null,
        });
    }
    AddRuntimeMessageHandler(handler, func) {
      this._iRuntime.AddRuntimeComponentMessageHandler(
        this._componentId,
        handler,
        func
      );
    }
    AddRuntimeMessageHandlers(list) {
      for (const [handler, func] of list)
        this.AddRuntimeMessageHandler(handler, func);
    }
    GetRuntimeInterface() {
      return this._iRuntime;
    }
    GetComponentID() {
      return this._componentId;
    }
    _StartTicking() {
      if (this._hasTickCallback) return;
      this._iRuntime._AddRAFCallback(this._tickCallback);
      this._hasTickCallback = true;
    }
    _StopTicking() {
      if (!this._hasTickCallback) return;
      this._iRuntime._RemoveRAFCallback(this._tickCallback);
      this._hasTickCallback = false;
    }
    Tick() {}
  };
  window.RateLimiter = class RateLimiter {
    constructor(callback, interval) {
      this._callback = callback;
      this._interval = interval;
      this._timerId = -1;
      this._lastCallTime = -Infinity;
      this._timerCallFunc = () => this._OnTimer();
      this._ignoreReset = false;
      this._canRunImmediate = false;
    }
    SetCanRunImmediate(c) {
      this._canRunImmediate = !!c;
    }
    Call() {
      if (this._timerId !== -1) return;
      const nowTime = Date.now();
      const timeSinceLastCall = nowTime - this._lastCallTime;
      const interval = this._interval;
      if (timeSinceLastCall >= interval && this._canRunImmediate) {
        this._lastCallTime = nowTime;
        this._RunCallback();
      } else
        this._timerId = self.setTimeout(
          this._timerCallFunc,
          Math.max(interval - timeSinceLastCall, 4)
        );
    }
    _RunCallback() {
      this._ignoreReset = true;
      this._callback();
      this._ignoreReset = false;
    }
    Reset() {
      if (this._ignoreReset) return;
      this._CancelTimer();
      this._lastCallTime = Date.now();
    }
    _OnTimer() {
      this._timerId = -1;
      this._lastCallTime = Date.now();
      this._RunCallback();
    }
    _CancelTimer() {
      if (this._timerId !== -1) {
        self.clearTimeout(this._timerId);
        this._timerId = -1;
      }
    }
    Release() {
      this._CancelTimer();
      this._callback = null;
      this._timerCallFunc = null;
    }
  };
}

("use strict");
{
  window.DOMElementHandler = class DOMElementHandler extends self.DOMHandler {
    constructor(iRuntime, componentId) {
      super(iRuntime, componentId);
      this._elementMap = new Map();
      this._autoAttach = true;
      this.AddRuntimeMessageHandlers([
        ["create", (e) => this._OnCreate(e)],
        ["destroy", (e) => this._OnDestroy(e)],
        ["set-visible", (e) => this._OnSetVisible(e)],
        ["update-position", (e) => this._OnUpdatePosition(e)],
        ["update-state", (e) => this._OnUpdateState(e)],
        ["focus", (e) => this._OnSetFocus(e)],
        ["set-css-style", (e) => this._OnSetCssStyle(e)],
        ["set-attribute", (e) => this._OnSetAttribute(e)],
        ["remove-attribute", (e) => this._OnRemoveAttribute(e)],
      ]);
      this.AddDOMElementMessageHandler("get-element", (elem) => elem);
    }
    SetAutoAttach(e) {
      this._autoAttach = !!e;
    }
    AddDOMElementMessageHandler(handler, func) {
      this.AddRuntimeMessageHandler(handler, (e) => {
        const elementId = e["elementId"];
        const elem = this._elementMap.get(elementId);
        return func(elem, e);
      });
    }
    _OnCreate(e) {
      const elementId = e["elementId"];
      const elem = this.CreateElement(elementId, e);
      this._elementMap.set(elementId, elem);
      elem.style.boxSizing = "border-box";
      if (!e["isVisible"]) elem.style.display = "none";
      const focusElem = this._GetFocusElement(elem);
      focusElem.addEventListener("focus", (e) => this._OnFocus(elementId));
      focusElem.addEventListener("blur", (e) => this._OnBlur(elementId));
      if (this._autoAttach) document.body.appendChild(elem);
    }
    CreateElement(elementId, e) {
      throw new Error("required override");
    }
    DestroyElement(elem) {}
    _OnDestroy(e) {
      const elementId = e["elementId"];
      const elem = this._elementMap.get(elementId);
      this.DestroyElement(elem);
      if (this._autoAttach) elem.parentElement.removeChild(elem);
      this._elementMap.delete(elementId);
    }
    PostToRuntimeElement(handler, elementId, data) {
      if (!data) data = {};
      data["elementId"] = elementId;
      this.PostToRuntime(handler, data);
    }
    _PostToRuntimeElementMaybeSync(handler, elementId, data) {
      if (!data) data = {};
      data["elementId"] = elementId;
      this._PostToRuntimeMaybeSync(handler, data);
    }
    _OnSetVisible(e) {
      if (!this._autoAttach) return;
      const elem = this._elementMap.get(e["elementId"]);
      elem.style.display = e["isVisible"] ? "" : "none";
    }
    _OnUpdatePosition(e) {
      if (!this._autoAttach) return;
      const elem = this._elementMap.get(e["elementId"]);
      elem.style.left = e["left"] + "px";
      elem.style.top = e["top"] + "px";
      elem.style.width = e["width"] + "px";
      elem.style.height = e["height"] + "px";
      const fontSize = e["fontSize"];
      if (fontSize !== null) elem.style.fontSize = fontSize + "em";
    }
    _OnUpdateState(e) {
      const elem = this._elementMap.get(e["elementId"]);
      this.UpdateState(elem, e);
    }
    UpdateState(elem, e) {
      throw new Error("required override");
    }
    _GetFocusElement(elem) {
      return elem;
    }
    _OnFocus(elementId) {
      this.PostToRuntimeElement("elem-focused", elementId);
    }
    _OnBlur(elementId) {
      this.PostToRuntimeElement("elem-blurred", elementId);
    }
    _OnSetFocus(e) {
      const elem = this._GetFocusElement(this._elementMap.get(e["elementId"]));
      if (e["focus"]) elem.focus();
      else elem.blur();
    }
    _OnSetCssStyle(e) {
      const elem = this._elementMap.get(e["elementId"]);
      const prop = e["prop"];
      const val = e["val"];
      if (prop.startsWith("--")) elem.style.setProperty(prop, val);
      else elem.style[prop] = val;
    }
    _OnSetAttribute(e) {
      const elem = this._elementMap.get(e["elementId"]);
      elem.setAttribute(e["name"], e["val"]);
    }
    _OnRemoveAttribute(e) {
      const elem = this._elementMap.get(e["elementId"]);
      elem.removeAttribute(e["name"]);
    }
    GetElementById(elementId) {
      return this._elementMap.get(elementId);
    }
  };
}

("use strict");
{
  const isiOSLike = /(iphone|ipod|ipad|macos|macintosh|mac os x)/i.test(
    navigator.userAgent
  );
  const isAndroid = /android/i.test(navigator.userAgent);
  let resolveCounter = 0;
  function AddScript(url) {
    const elem = document.createElement("script");
    elem.async = false;
    elem.type = "module";
    if (url.isStringSrc)
      return new Promise((resolve) => {
        const resolveName = "c3_resolve_" + resolveCounter;
        ++resolveCounter;
        self[resolveName] = resolve;
        elem.textContent = url.str + `\n\nself["${resolveName}"]();`;
        document.head.appendChild(elem);
      });
    else
      return new Promise((resolve, reject) => {
        elem.onload = resolve;
        elem.onerror = reject;
        elem.src = url;
        document.head.appendChild(elem);
      });
  }
  let didCheckWorkerModuleSupport = false;
  let isWorkerModuleSupported = false;
  function SupportsWorkerTypeModule() {
    if (!didCheckWorkerModuleSupport) {
      try {
        new Worker("blob://", {
          get type() {
            isWorkerModuleSupported = true;
          },
        });
      } catch (e) {}
      didCheckWorkerModuleSupport = true;
    }
    return isWorkerModuleSupported;
  }
  let tmpAudio = new Audio();
  const supportedAudioFormats = {
    "audio/webm; codecs=opus": !!tmpAudio.canPlayType(
      "audio/webm; codecs=opus"
    ),
    "audio/ogg; codecs=opus": !!tmpAudio.canPlayType("audio/ogg; codecs=opus"),
    "audio/webm; codecs=vorbis": !!tmpAudio.canPlayType(
      "audio/webm; codecs=vorbis"
    ),
    "audio/ogg; codecs=vorbis": !!tmpAudio.canPlayType(
      "audio/ogg; codecs=vorbis"
    ),
    "audio/mp4": !!tmpAudio.canPlayType("audio/mp4"),
    "audio/mpeg": !!tmpAudio.canPlayType("audio/mpeg"),
  };
  tmpAudio = null;
  async function BlobToString(blob) {
    const arrayBuffer = await BlobToArrayBuffer(blob);
    const textDecoder = new TextDecoder("utf-8");
    return textDecoder.decode(arrayBuffer);
  }
  function BlobToArrayBuffer(blob) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (e) => resolve(e.target.result);
      fileReader.onerror = (err) => reject(err);
      fileReader.readAsArrayBuffer(blob);
    });
  }
  const queuedArrayBufferReads = [];
  let activeArrayBufferReads = 0;
  const MAX_ARRAYBUFFER_READS = 8;
  window["RealFile"] = window["File"];
  const domHandlerClasses = [];
  const runtimeEventHandlers = new Map();
  const pendingResponsePromises = new Map();
  let nextResponseId = 0;
  const runOnStartupFunctions = [];
  self.runOnStartup = function runOnStartup(f) {
    if (typeof f !== "function")
      throw new Error("runOnStartup called without a function");
    runOnStartupFunctions.push(f);
  };
  const WEBVIEW_EXPORT_TYPES = new Set([
    "cordova",
    "playable-ad",
    "instant-games",
  ]);
  function IsWebViewExportType(exportType) {
    return WEBVIEW_EXPORT_TYPES.has(exportType);
  }
  let isWrapperFullscreen = false;
  window.RuntimeInterface = class RuntimeInterface {
    constructor(opts) {
      this._useWorker = opts.useWorker;
      this._messageChannelPort = null;
      this._runtimeBaseUrl = "";
      this._scriptFolder = opts.scriptFolder;
      this._workerScriptURLs = {};
      this._worker = null;
      this._localRuntime = null;
      this._domHandlers = [];
      this._runtimeDomHandler = null;
      this._canvas = null;
      this._isExportingToVideo = false;
      this._exportToVideoDuration = 0;
      this._jobScheduler = null;
      this._rafId = -1;
      this._rafFunc = () => this._OnRAFCallback();
      this._rafCallbacks = [];
      this._exportType = opts.exportType;
      this._isFileProtocol = location.protocol.substr(0, 4) === "file";
      if (
        this._useWorker &&
        (typeof OffscreenCanvas === "undefined" ||
          !navigator["userActivation"] ||
          !SupportsWorkerTypeModule())
      )
        this._useWorker = false;
      if (
        this._exportType === "playable-ad" ||
        this._exportType === "instant-games"
      )
        this._useWorker = false;
      if (this._exportType === "cordova" && this._useWorker)
        if (isAndroid) {
          const chromeVer = /Chrome\/(\d+)/i.exec(navigator.userAgent);
          if (!chromeVer || !(parseInt(chromeVer[1], 10) >= 90))
            this._useWorker = false;
        } else this._useWorker = false;
      this._localFileBlobs = null;
      this._localFileStrings = null;
      if (this._exportType === "html5" && !window.isSecureContext)
        console.warn(
          "[Construct] Warning: the browser indicates this is not a secure context. Some features may be unavailable. Use secure (HTTPS) hosting to ensure all features are available."
        );
      this.AddRuntimeComponentMessageHandler(
        "runtime",
        "cordova-fetch-local-file",
        (e) => this._OnCordovaFetchLocalFile(e)
      );
      this.AddRuntimeComponentMessageHandler(
        "runtime",
        "create-job-worker",
        (e) => this._OnCreateJobWorker(e)
      );
      if (this._exportType === "cordova")
        document.addEventListener("deviceready", () => this._Init(opts));
      else this._Init(opts);
    }
    Release() {
      this._CancelAnimationFrame();
      if (this._messageChannelPort) {
        this._messageChannelPort.onmessage = null;
        this._messageChannelPort = null;
      }
      if (this._worker) {
        this._worker.terminate();
        this._worker = null;
      }
      if (this._localRuntime) {
        this._localRuntime.Release();
        this._localRuntime = null;
      }
      if (this._canvas) {
        this._canvas.parentElement.removeChild(this._canvas);
        this._canvas = null;
      }
    }
    GetCanvas() {
      return this._canvas;
    }
    GetRuntimeBaseURL() {
      return this._runtimeBaseUrl;
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
      return isiOSLike && this._exportType === "cordova";
    }
    IsiOSWebView() {
      const ua = navigator.userAgent;
      return (
        (isiOSLike && IsWebViewExportType(this._exportType)) ||
        navigator["standalone"] ||
        /crios\/|fxios\/|edgios\//i.test(ua)
      );
    }
    IsAndroid() {
      return isAndroid;
    }
    IsAndroidWebView() {
      return isAndroid && IsWebViewExportType(this._exportType);
    }
    async _Init(opts) {
      if (this._exportType === "macos-wkwebview")
        this._SendWrapperMessage({ type: "ready" });
      if (this._exportType === "playable-ad") {
        this._localFileBlobs = self["c3_base64files"];
        this._localFileStrings = {};
        await this._ConvertDataUrisToBlobs();
        for (let i = 0, len = opts.engineScripts.length; i < len; ++i) {
          const src = opts.engineScripts[i];
          if (this._localFileStrings.hasOwnProperty(src))
            opts.engineScripts[i] = {
              isStringSrc: true,
              str: this._localFileStrings[src],
            };
          else if (this._localFileBlobs.hasOwnProperty(src))
            opts.engineScripts[i] = URL.createObjectURL(
              this._localFileBlobs[src]
            );
        }
      }
      if (opts.runtimeBaseUrl) this._runtimeBaseUrl = opts.runtimeBaseUrl;
      else {
        const origin = location.origin;
        this._runtimeBaseUrl =
          (origin === "null" ? "file:///" : origin) + location.pathname;
        const i = this._runtimeBaseUrl.lastIndexOf("/");
        if (i !== -1)
          this._runtimeBaseUrl = this._runtimeBaseUrl.substr(0, i + 1);
      }
      if (opts.workerScripts) this._workerScriptURLs = opts.workerScripts;
      const messageChannel = new MessageChannel();
      this._messageChannelPort = messageChannel.port1;
      this._messageChannelPort.onmessage = (e) =>
        this["_OnMessageFromRuntime"](e.data);
      if (window["c3_addPortMessageHandler"])
        window["c3_addPortMessageHandler"]((e) =>
          this._OnMessageFromDebugger(e)
        );
      this._jobScheduler = new self.JobSchedulerDOM(this);
      await this._jobScheduler.Init();
      if (typeof window["StatusBar"] === "object")
        window["StatusBar"]["hide"]();
      if (typeof window["AndroidFullScreen"] === "object")
        try {
          await new Promise((resolve, reject) => {
            window["AndroidFullScreen"]["immersiveMode"](resolve, reject);
          });
        } catch (err) {
          console.error("Failed to enter Android immersive mode: ", err);
        }
      if (this._useWorker) await this._InitWorker(opts, messageChannel.port2);
      else await this._InitDOM(opts, messageChannel.port2);
    }
    _GetWorkerURL(url) {
      let ret;
      if (this._workerScriptURLs.hasOwnProperty(url))
        ret = this._workerScriptURLs[url];
      else if (
        url.endsWith("/workermain.js") &&
        this._workerScriptURLs.hasOwnProperty("workermain.js")
      )
        ret = this._workerScriptURLs["workermain.js"];
      else if (
        this._exportType === "playable-ad" &&
        this._localFileBlobs.hasOwnProperty(url)
      )
        ret = this._localFileBlobs[url];
      else ret = url;
      if (ret instanceof Blob) ret = URL.createObjectURL(ret);
      return ret;
    }
    async CreateWorker(url, baseUrl, workerOpts) {
      if (url.startsWith("blob:")) return new Worker(url, workerOpts);
      if (this._exportType === "cordova" && this._isFileProtocol) {
        let filePath = "";
        if (workerOpts.isC3MainWorker) filePath = url;
        else filePath = this._scriptFolder + url;
        const arrayBuffer = await this.CordovaFetchLocalFileAsArrayBuffer(
          filePath
        );
        const blob = new Blob([arrayBuffer], {
          type: "application/javascript",
        });
        return new Worker(URL.createObjectURL(blob), workerOpts);
      }
      const absUrl = new URL(url, baseUrl);
      const isCrossOrigin = location.origin !== absUrl.origin;
      if (isCrossOrigin) {
        const response = await fetch(absUrl);
        if (!response.ok) throw new Error("failed to fetch worker script");
        const blob = await response.blob();
        return new Worker(URL.createObjectURL(blob), workerOpts);
      } else return new Worker(absUrl, workerOpts);
    }
    _GetWindowInnerWidth() {
      return Math.max(window.innerWidth, 1);
    }
    _GetWindowInnerHeight() {
      return Math.max(window.innerHeight, 1);
    }
    _GetCommonRuntimeOptions(opts) {
      return {
        runtimeBaseUrl: this._runtimeBaseUrl,
        previewUrl: location.href,
        windowInnerWidth: this._GetWindowInnerWidth(),
        windowInnerHeight: this._GetWindowInnerHeight(),
        devicePixelRatio: window.devicePixelRatio,
        isFullscreen: RuntimeInterface.IsDocumentFullscreen(),
        projectData: opts.projectData,
        previewImageBlobs:
          window["cr_previewImageBlobs"] || this._localFileBlobs,
        previewProjectFileBlobs: window["cr_previewProjectFileBlobs"],
        previewProjectFileSWUrls: window["cr_previewProjectFiles"],
        swClientId: window.cr_swClientId || "",
        exportType: opts.exportType,
        isDebug: new URLSearchParams(self.location.search).has("debug"),
        ife: !!self.ife,
        jobScheduler: this._jobScheduler.GetPortData(),
        supportedAudioFormats: supportedAudioFormats,
        opusWasmScriptUrl:
          window["cr_opusWasmScriptUrl"] || this._scriptFolder + "opus.wasm.js",
        opusWasmBinaryUrl:
          window["cr_opusWasmBinaryUrl"] ||
          this._scriptFolder + "opus.wasm.wasm",
        isFileProtocol: this._isFileProtocol,
        isiOSCordova: this.IsiOSCordova(),
        isiOSWebView: this.IsiOSWebView(),
        isFBInstantAvailable: typeof self["FBInstant"] !== "undefined",
      };
    }
    async _InitWorker(opts, port2) {
      const workerMainUrl = this._GetWorkerURL(opts.workerMainUrl);
      if (this._exportType === "preview") {
        this._worker = new Worker("previewworker.js", {
          type: "module",
          name: "Runtime",
        });
        await new Promise((resolve, reject) => {
          const messageHandler = (e) => {
            this._worker.removeEventListener("message", messageHandler);
            if (e.data && e.data["type"] === "ok") resolve();
            else reject();
          };
          this._worker.addEventListener("message", messageHandler);
          this._worker.postMessage({
            type: "construct-worker-init",
            import: new URL(workerMainUrl, this._runtimeBaseUrl).toString(),
          });
        });
      } else
        this._worker = await this.CreateWorker(
          workerMainUrl,
          this._runtimeBaseUrl,
          { type: "module", name: "Runtime", isC3MainWorker: true }
        );
      this._canvas = document.createElement("canvas");
      this._canvas.style.display = "none";
      const offscreenCanvas = this._canvas["transferControlToOffscreen"]();
      document.body.appendChild(this._canvas);
      window["c3canvas"] = this._canvas;
      if (self["C3_InsertHTMLPlaceholders"])
        self["C3_InsertHTMLPlaceholders"]();
      let workerDependencyScripts = opts.workerDependencyScripts || [];
      let engineScripts = opts.engineScripts;
      workerDependencyScripts = await Promise.all(
        workerDependencyScripts.map((url) =>
          this._MaybeGetCordovaScriptURL(url)
        )
      );
      engineScripts = await Promise.all(
        engineScripts.map((url) => this._MaybeGetCordovaScriptURL(url))
      );
      if (this._exportType === "cordova")
        for (let i = 0, len = opts.projectScripts.length; i < len; ++i) {
          const info = opts.projectScripts[i];
          const originalUrl = info[0];
          if (
            originalUrl === opts.mainProjectScript ||
            originalUrl === "scriptsInEvents.js" ||
            originalUrl.endsWith("/scriptsInEvents.js")
          )
            info[1] = await this._MaybeGetCordovaScriptURL(originalUrl);
        }
      this._worker.postMessage(
        Object.assign(this._GetCommonRuntimeOptions(opts), {
          type: "init-runtime",
          isInWorker: true,
          messagePort: port2,
          canvas: offscreenCanvas,
          workerDependencyScripts: workerDependencyScripts,
          engineScripts: engineScripts,
          projectScripts: opts.projectScripts,
          mainProjectScript: opts.mainProjectScript,
          projectScriptsStatus: self["C3_ProjectScriptsStatus"],
        }),
        [port2, offscreenCanvas, ...this._jobScheduler.GetPortTransferables()]
      );
      this._domHandlers = domHandlerClasses.map((C) => new C(this));
      this._FindRuntimeDOMHandler();
      this._runtimeDomHandler._EnableWindowResizeEvent();
      self["c3_callFunction"] = (name, params) =>
        this._runtimeDomHandler._InvokeFunctionFromJS(name, params);
      if (this._exportType === "preview")
        self["goToLastErrorScript"] = () =>
          this.PostToRuntimeComponent("runtime", "go-to-last-error-script");
    }
    async _InitDOM(opts, port2) {
      this._canvas = document.createElement("canvas");
      this._canvas.style.display = "none";
      document.body.appendChild(this._canvas);
      window["c3canvas"] = this._canvas;
      if (self["C3_InsertHTMLPlaceholders"])
        self["C3_InsertHTMLPlaceholders"]();
      this._domHandlers = domHandlerClasses.map((C) => new C(this));
      this._FindRuntimeDOMHandler();
      let engineScripts = opts.engineScripts.map((url) =>
        typeof url === "string"
          ? new URL(url, this._runtimeBaseUrl).toString()
          : url
      );
      if (Array.isArray(opts.workerDependencyScripts))
        engineScripts.unshift(...opts.workerDependencyScripts);
      engineScripts = await Promise.all(
        engineScripts.map((url) => this._MaybeGetCordovaScriptURL(url))
      );
      await Promise.all(engineScripts.map((url) => AddScript(url)));
      const scriptsStatus = self["C3_ProjectScriptsStatus"];
      const mainProjectScript = opts.mainProjectScript;
      const allProjectScripts = opts.projectScripts;
      for (let [originalUrl, loadUrl] of allProjectScripts) {
        if (!loadUrl) loadUrl = originalUrl;
        if (originalUrl === mainProjectScript)
          try {
            loadUrl = await this._MaybeGetCordovaScriptURL(loadUrl);
            await AddScript(loadUrl);
            if (this._exportType === "preview" && !scriptsStatus[originalUrl])
              this._ReportProjectMainScriptError(
                originalUrl,
                "main script did not run to completion"
              );
          } catch (err) {
            this._ReportProjectMainScriptError(originalUrl, err);
          }
        else if (
          originalUrl === "scriptsInEvents.js" ||
          originalUrl.endsWith("/scriptsInEvents.js")
        ) {
          loadUrl = await this._MaybeGetCordovaScriptURL(loadUrl);
          await AddScript(loadUrl);
        }
      }
      if (
        this._exportType === "preview" &&
        typeof self.C3.ScriptsInEvents !== "object"
      ) {
        this._RemoveLoadingMessage();
        const msg =
          "Failed to load JavaScript code used in events. Check all your JavaScript code has valid syntax.";
        console.error("[C3 runtime] " + msg);
        alert(msg);
        return;
      }
      const runtimeOpts = Object.assign(this._GetCommonRuntimeOptions(opts), {
        isInWorker: false,
        messagePort: port2,
        canvas: this._canvas,
        runOnStartupFunctions: runOnStartupFunctions,
      });
      this._runtimeDomHandler._EnableWindowResizeEvent();
      this._OnBeforeCreateRuntime();
      this._localRuntime = self["C3_CreateRuntime"](runtimeOpts);
      await self["C3_InitRuntime"](this._localRuntime, runtimeOpts);
    }
    _ReportProjectMainScriptError(url, err) {
      this._RemoveLoadingMessage();
      console.error(
        `[Preview] Failed to load project main script (${url}): `,
        err
      );
      alert(
        `Failed to load project main script (${url}). Check all your JavaScript code has valid syntax. Press F12 and check the console for error details.`
      );
    }
    _OnBeforeCreateRuntime() {
      this._RemoveLoadingMessage();
    }
    _RemoveLoadingMessage() {
      const loadingElem = window.cr_previewLoadingElem;
      if (loadingElem) {
        loadingElem.parentElement.removeChild(loadingElem);
        window.cr_previewLoadingElem = null;
      }
    }
    async _OnCreateJobWorker(e) {
      const outputPort = await this._jobScheduler._CreateJobWorker();
      return { outputPort: outputPort, transferables: [outputPort] };
    }
    _GetLocalRuntime() {
      if (this._useWorker) throw new Error("not available in worker mode");
      return this._localRuntime;
    }
    PostToRuntimeComponent(
      component,
      handler,
      data,
      dispatchOpts,
      transferables
    ) {
      this._messageChannelPort.postMessage(
        {
          type: "event",
          component: component,
          handler: handler,
          dispatchOpts: dispatchOpts || null,
          data: data,
          responseId: null,
        },
        transferables
      );
    }
    PostToRuntimeComponentAsync(
      component,
      handler,
      data,
      dispatchOpts,
      transferables
    ) {
      const responseId = nextResponseId++;
      const ret = new Promise((resolve, reject) => {
        pendingResponsePromises.set(responseId, { resolve, reject });
      });
      this._messageChannelPort.postMessage(
        {
          type: "event",
          component: component,
          handler: handler,
          dispatchOpts: dispatchOpts || null,
          data: data,
          responseId: responseId,
        },
        transferables
      );
      return ret;
    }
    ["_OnMessageFromRuntime"](data) {
      const type = data["type"];
      if (type === "event") return this._OnEventFromRuntime(data);
      else if (type === "result") this._OnResultFromRuntime(data);
      else if (type === "runtime-ready") this._OnRuntimeReady();
      else if (type === "alert-error") {
        this._RemoveLoadingMessage();
        alert(data["message"]);
      } else if (type === "creating-runtime") this._OnBeforeCreateRuntime();
      else throw new Error(`unknown message '${type}'`);
    }
    _OnEventFromRuntime(e) {
      const component = e["component"];
      const handler = e["handler"];
      const data = e["data"];
      const responseId = e["responseId"];
      const handlerMap = runtimeEventHandlers.get(component);
      if (!handlerMap) {
        console.warn(`[DOM] No event handlers for component '${component}'`);
        return;
      }
      const func = handlerMap.get(handler);
      if (!func) {
        console.warn(
          `[DOM] No handler '${handler}' for component '${component}'`
        );
        return;
      }
      let ret = null;
      try {
        ret = func(data);
      } catch (err) {
        console.error(`Exception in '${component}' handler '${handler}':`, err);
        if (responseId !== null)
          this._PostResultToRuntime(responseId, false, "" + err);
        return;
      }
      if (responseId === null) return ret;
      else if (ret && ret.then)
        ret
          .then((result) => this._PostResultToRuntime(responseId, true, result))
          .catch((err) => {
            console.error(
              `Rejection from '${component}' handler '${handler}':`,
              err
            );
            this._PostResultToRuntime(responseId, false, "" + err);
          });
      else this._PostResultToRuntime(responseId, true, ret);
    }
    _PostResultToRuntime(responseId, isOk, result) {
      let transferables;
      if (result && result["transferables"])
        transferables = result["transferables"];
      this._messageChannelPort.postMessage(
        { type: "result", responseId: responseId, isOk: isOk, result: result },
        transferables
      );
    }
    _OnResultFromRuntime(data) {
      const responseId = data["responseId"];
      const isOk = data["isOk"];
      const result = data["result"];
      const pendingPromise = pendingResponsePromises.get(responseId);
      if (isOk) pendingPromise.resolve(result);
      else pendingPromise.reject(result);
      pendingResponsePromises.delete(responseId);
    }
    AddRuntimeComponentMessageHandler(component, handler, func) {
      let handlerMap = runtimeEventHandlers.get(component);
      if (!handlerMap) {
        handlerMap = new Map();
        runtimeEventHandlers.set(component, handlerMap);
      }
      if (handlerMap.has(handler))
        throw new Error(
          `[DOM] Component '${component}' already has handler '${handler}'`
        );
      handlerMap.set(handler, func);
    }
    static AddDOMHandlerClass(Class) {
      if (domHandlerClasses.includes(Class))
        throw new Error("DOM handler already added");
      domHandlerClasses.push(Class);
    }
    _FindRuntimeDOMHandler() {
      for (const dh of this._domHandlers)
        if (dh.GetComponentID() === "runtime") {
          this._runtimeDomHandler = dh;
          return;
        }
      throw new Error("cannot find runtime DOM handler");
    }
    _OnMessageFromDebugger(e) {
      this.PostToRuntimeComponent("debugger", "message", e);
    }
    _OnRuntimeReady() {
      for (const h of this._domHandlers) h.Attach();
    }
    static IsDocumentFullscreen() {
      return !!(
        document["fullscreenElement"] ||
        document["webkitFullscreenElement"] ||
        document["mozFullScreenElement"] ||
        isWrapperFullscreen
      );
    }
    static _SetWrapperIsFullscreenFlag(f) {
      isWrapperFullscreen = !!f;
    }
    async GetRemotePreviewStatusInfo() {
      return await this.PostToRuntimeComponentAsync(
        "runtime",
        "get-remote-preview-status-info"
      );
    }
    _AddRAFCallback(f) {
      this._rafCallbacks.push(f);
      this._RequestAnimationFrame();
    }
    _RemoveRAFCallback(f) {
      const i = this._rafCallbacks.indexOf(f);
      if (i === -1) throw new Error("invalid callback");
      this._rafCallbacks.splice(i, 1);
      if (!this._rafCallbacks.length) this._CancelAnimationFrame();
    }
    _RequestAnimationFrame() {
      if (this._rafId === -1 && this._rafCallbacks.length)
        this._rafId = requestAnimationFrame(this._rafFunc);
    }
    _CancelAnimationFrame() {
      if (this._rafId !== -1) {
        cancelAnimationFrame(this._rafId);
        this._rafId = -1;
      }
    }
    _OnRAFCallback() {
      this._rafId = -1;
      for (const f of this._rafCallbacks) f();
      this._RequestAnimationFrame();
    }
    TryPlayMedia(mediaElem) {
      this._runtimeDomHandler.TryPlayMedia(mediaElem);
    }
    RemovePendingPlay(mediaElem) {
      this._runtimeDomHandler.RemovePendingPlay(mediaElem);
    }
    _PlayPendingMedia() {
      this._runtimeDomHandler._PlayPendingMedia();
    }
    SetSilent(s) {
      this._runtimeDomHandler.SetSilent(s);
    }
    IsAudioFormatSupported(typeStr) {
      return !!supportedAudioFormats[typeStr];
    }
    async _WasmDecodeWebMOpus(arrayBuffer) {
      const result = await this.PostToRuntimeComponentAsync(
        "runtime",
        "opus-decode",
        { arrayBuffer: arrayBuffer },
        null,
        [arrayBuffer]
      );
      return new Float32Array(result);
    }
    SetIsExportingToVideo(duration) {
      this._isExportingToVideo = true;
      this._exportToVideoDuration = duration;
    }
    IsExportingToVideo() {
      return this._isExportingToVideo;
    }
    GetExportToVideoDuration() {
      return this._exportToVideoDuration;
    }
    IsAbsoluteURL(url) {
      return (
        /^(?:[a-z\-]+:)?\/\//.test(url) ||
        url.substr(0, 5) === "data:" ||
        url.substr(0, 5) === "blob:"
      );
    }
    IsRelativeURL(url) {
      return !this.IsAbsoluteURL(url);
    }
    async _MaybeGetCordovaScriptURL(url) {
      if (
        this._exportType === "cordova" &&
        (url.startsWith("file:") ||
          (this._isFileProtocol && this.IsRelativeURL(url)))
      ) {
        let filename = url;
        if (filename.startsWith(this._runtimeBaseUrl))
          filename = filename.substr(this._runtimeBaseUrl.length);
        const arrayBuffer = await this.CordovaFetchLocalFileAsArrayBuffer(
          filename
        );
        const blob = new Blob([arrayBuffer], {
          type: "application/javascript",
        });
        return URL.createObjectURL(blob);
      } else return url;
    }
    async _OnCordovaFetchLocalFile(e) {
      const filename = e["filename"];
      switch (e["as"]) {
        case "text":
          return await this.CordovaFetchLocalFileAsText(filename);
        case "buffer":
          return await this.CordovaFetchLocalFileAsArrayBuffer(filename);
        default:
          throw new Error("unsupported type");
      }
    }
    _GetPermissionAPI() {
      const api =
        window["cordova"] &&
        window["cordova"]["plugins"] &&
        window["cordova"]["plugins"]["permissions"];
      if (typeof api !== "object")
        throw new Error("Permission API is not loaded");
      return api;
    }
    _MapPermissionID(api, permission) {
      const permissionID = api[permission];
      if (typeof permissionID !== "string")
        throw new Error("Invalid permission name");
      return permissionID;
    }
    _HasPermission(id) {
      const api = this._GetPermissionAPI();
      return new Promise((resolve, reject) =>
        api["checkPermission"](
          this._MapPermissionID(api, id),
          (status) => resolve(!!status["hasPermission"]),
          reject
        )
      );
    }
    _RequestPermission(id) {
      const api = this._GetPermissionAPI();
      return new Promise((resolve, reject) =>
        api["requestPermission"](
          this._MapPermissionID(api, id),
          (status) => resolve(!!status["hasPermission"]),
          reject
        )
      );
    }
    async RequestPermissions(permissions) {
      if (this.GetExportType() !== "cordova") return true;
      if (this.IsiOSCordova()) return true;
      for (const id of permissions) {
        const alreadyGranted = await this._HasPermission(id);
        if (alreadyGranted) continue;
        const granted = await this._RequestPermission(id);
        if (granted === false) return false;
      }
      return true;
    }
    async RequirePermissions(...permissions) {
      if ((await this.RequestPermissions(permissions)) === false)
        throw new Error("Permission not granted");
    }
    CordovaFetchLocalFile(filename) {
      const path =
        window["cordova"]["file"]["applicationDirectory"] + "www/" + filename;
      return new Promise((resolve, reject) => {
        window["resolveLocalFileSystemURL"](
          path,
          (entry) => {
            entry["file"](resolve, reject);
          },
          reject
        );
      });
    }
    async CordovaFetchLocalFileAsText(filename) {
      const file = await this.CordovaFetchLocalFile(filename);
      return await BlobToString(file);
    }
    _CordovaMaybeStartNextArrayBufferRead() {
      if (!queuedArrayBufferReads.length) return;
      if (activeArrayBufferReads >= MAX_ARRAYBUFFER_READS) return;
      activeArrayBufferReads++;
      const job = queuedArrayBufferReads.shift();
      this._CordovaDoFetchLocalFileAsAsArrayBuffer(
        job.filename,
        job.successCallback,
        job.errorCallback
      );
    }
    CordovaFetchLocalFileAsArrayBuffer(filename) {
      return new Promise((resolve, reject) => {
        queuedArrayBufferReads.push({
          filename: filename,
          successCallback: (result) => {
            activeArrayBufferReads--;
            this._CordovaMaybeStartNextArrayBufferRead();
            resolve(result);
          },
          errorCallback: (err) => {
            activeArrayBufferReads--;
            this._CordovaMaybeStartNextArrayBufferRead();
            reject(err);
          },
        });
        this._CordovaMaybeStartNextArrayBufferRead();
      });
    }
    async _CordovaDoFetchLocalFileAsAsArrayBuffer(
      filename,
      successCallback,
      errorCallback
    ) {
      try {
        const file = await this.CordovaFetchLocalFile(filename);
        const arrayBuffer = await BlobToArrayBuffer(file);
        successCallback(arrayBuffer);
      } catch (err) {
        errorCallback(err);
      }
    }
    _SendWrapperMessage(o) {
      if (this._exportType === "windows-webview2")
        window["chrome"]["webview"]["postMessage"](JSON.stringify(o));
      else if (this._exportType === "macos-wkwebview")
        window["webkit"]["messageHandlers"]["C3Wrapper"]["postMessage"](
          JSON.stringify(o)
        );
      else throw new Error("cannot send wrapper message");
    }
    async _ConvertDataUrisToBlobs() {
      const promises = [];
      for (const [filename, data] of Object.entries(this._localFileBlobs))
        promises.push(this._ConvertDataUriToBlobs(filename, data));
      await Promise.all(promises);
    }
    async _ConvertDataUriToBlobs(filename, data) {
      if (typeof data === "object") {
        this._localFileBlobs[filename] = new Blob([data["str"]], {
          type: data["type"],
        });
        this._localFileStrings[filename] = data["str"];
      } else {
        let blob = await this._FetchDataUri(data);
        if (!blob) blob = this._DataURIToBinaryBlobSync(data);
        this._localFileBlobs[filename] = blob;
      }
    }
    async _FetchDataUri(dataUri) {
      try {
        const response = await fetch(dataUri);
        return await response.blob();
      } catch (err) {
        console.warn(
          "Failed to fetch a data: URI. Falling back to a slower workaround. This is probably because the Content Security Policy unnecessarily blocked it. Allow data: URIs in your CSP to avoid this.",
          err
        );
        return null;
      }
    }
    _DataURIToBinaryBlobSync(datauri) {
      const o = this._ParseDataURI(datauri);
      return this._BinaryStringToBlob(o.data, o.mime_type);
    }
    _ParseDataURI(datauri) {
      const comma = datauri.indexOf(",");
      if (comma < 0) throw new URIError("expected comma in data: uri");
      const typepart = datauri.substring(5, comma);
      const datapart = datauri.substring(comma + 1);
      const typearr = typepart.split(";");
      const mimetype = typearr[0] || "";
      const encoding1 = typearr[1];
      const encoding2 = typearr[2];
      let decodeddata;
      if (encoding1 === "base64" || encoding2 === "base64")
        decodeddata = atob(datapart);
      else decodeddata = decodeURIComponent(datapart);
      return { mime_type: mimetype, data: decodeddata };
    }
    _BinaryStringToBlob(binstr, mime_type) {
      let len = binstr.length;
      let len32 = len >> 2;
      let a8 = new Uint8Array(len);
      let a32 = new Uint32Array(a8.buffer, 0, len32);
      let i, j;
      for (i = 0, j = 0; i < len32; ++i)
        a32[i] =
          binstr.charCodeAt(j++) |
          (binstr.charCodeAt(j++) << 8) |
          (binstr.charCodeAt(j++) << 16) |
          (binstr.charCodeAt(j++) << 24);
      let tailLength = len & 3;
      while (tailLength--) {
        a8[j] = binstr.charCodeAt(j);
        ++j;
      }
      return new Blob([a8], { type: mime_type });
    }
  };
}

("use strict");
{
  const RuntimeInterface = self.RuntimeInterface;
  function IsCompatibilityMouseEvent(e) {
    return (
      (e["sourceCapabilities"] &&
        e["sourceCapabilities"]["firesTouchEvents"]) ||
      (e["originalEvent"] &&
        e["originalEvent"]["sourceCapabilities"] &&
        e["originalEvent"]["sourceCapabilities"]["firesTouchEvents"])
    );
  }
  const KEY_CODE_ALIASES = new Map([
    ["OSLeft", "MetaLeft"],
    ["OSRight", "MetaRight"],
  ]);
  const DISPATCH_RUNTIME_AND_SCRIPT = {
    dispatchRuntimeEvent: true,
    dispatchUserScriptEvent: true,
  };
  const DISPATCH_SCRIPT_ONLY = { dispatchUserScriptEvent: true };
  const DISPATCH_RUNTIME_ONLY = { dispatchRuntimeEvent: true };
  function AddStyleSheet(cssUrl) {
    return new Promise((resolve, reject) => {
      const styleLink = document.createElement("link");
      styleLink.onload = () => resolve(styleLink);
      styleLink.onerror = (err) => reject(err);
      styleLink.rel = "stylesheet";
      styleLink.href = cssUrl;
      document.head.appendChild(styleLink);
    });
  }
  function FetchImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = url;
    });
  }
  async function BlobToImage(blob) {
    const blobUrl = URL.createObjectURL(blob);
    try {
      return await FetchImage(blobUrl);
    } finally {
      URL.revokeObjectURL(blobUrl);
    }
  }
  function BlobToString(blob) {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.onload = (e) => resolve(e.target.result);
      fileReader.onerror = (err) => reject(err);
      fileReader.readAsText(blob);
    });
  }
  async function BlobToSvgImage(blob, width, height) {
    if (!/firefox/i.test(navigator.userAgent)) return await BlobToImage(blob);
    let str = await BlobToString(blob);
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "image/svg+xml");
    const rootElem = doc.documentElement;
    if (rootElem.hasAttribute("width") && rootElem.hasAttribute("height")) {
      const widthStr = rootElem.getAttribute("width");
      const heightStr = rootElem.getAttribute("height");
      if (!widthStr.includes("%") && !heightStr.includes("%"))
        return await BlobToImage(blob);
    }
    rootElem.setAttribute("width", width + "px");
    rootElem.setAttribute("height", height + "px");
    const serializer = new XMLSerializer();
    str = serializer.serializeToString(doc);
    blob = new Blob([str], { type: "image/svg+xml" });
    return await BlobToImage(blob);
  }
  function IsInContentEditable(el) {
    do {
      if (el.parentNode && el.hasAttribute("contenteditable")) return true;
      el = el.parentNode;
    } while (el);
    return false;
  }
  const keyboardInputElementTagNames = new Set([
    "input",
    "textarea",
    "datalist",
    "select",
  ]);
  function IsKeyboardInputElement(elem) {
    return (
      keyboardInputElementTagNames.has(elem.tagName.toLowerCase()) ||
      IsInContentEditable(elem)
    );
  }
  const canvasOrDocTags = new Set(["canvas", "body", "html"]);
  function PreventDefaultOnCanvasOrDoc(e) {
    const tagName = e.target.tagName.toLowerCase();
    if (canvasOrDocTags.has(tagName)) e.preventDefault();
  }
  function BlockWheelZoom(e) {
    if (e.metaKey || e.ctrlKey) e.preventDefault();
  }
  self["C3_GetSvgImageSize"] = async function (blob) {
    const img = await BlobToImage(blob);
    if (img.width > 0 && img.height > 0) return [img.width, img.height];
    else {
      img.style.position = "absolute";
      img.style.left = "0px";
      img.style.top = "0px";
      img.style.visibility = "hidden";
      document.body.appendChild(img);
      const rc = img.getBoundingClientRect();
      document.body.removeChild(img);
      return [rc.width, rc.height];
    }
  };
  self["C3_RasterSvgImageBlob"] = async function (
    blob,
    imageWidth,
    imageHeight,
    surfaceWidth,
    surfaceHeight
  ) {
    const img = await BlobToSvgImage(blob, imageWidth, imageHeight);
    const canvas = document.createElement("canvas");
    canvas.width = surfaceWidth;
    canvas.height = surfaceHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, imageWidth, imageHeight);
    return canvas;
  };
  let isCordovaPaused = false;
  document.addEventListener("pause", () => (isCordovaPaused = true));
  document.addEventListener("resume", () => (isCordovaPaused = false));
  function ParentHasFocus() {
    try {
      return window.parent && window.parent.document.hasFocus();
    } catch (err) {
      return false;
    }
  }
  function KeyboardIsVisible() {
    const elem = document.activeElement;
    if (!elem) return false;
    const tagName = elem.tagName.toLowerCase();
    const inputTypes = new Set([
      "email",
      "number",
      "password",
      "search",
      "tel",
      "text",
      "url",
    ]);
    if (tagName === "textarea") return true;
    if (tagName === "input")
      return inputTypes.has(elem.type.toLowerCase() || "text");
    return IsInContentEditable(elem);
  }
  const DOM_COMPONENT_ID = "runtime";
  const HANDLER_CLASS = class RuntimeDOMHandler extends self.DOMHandler {
    constructor(iRuntime) {
      super(iRuntime, DOM_COMPONENT_ID);
      this._isFirstSizeUpdate = true;
      this._enableWindowResizeEvent = false;
      this._simulatedResizeTimerId = -1;
      this._targetOrientation = "any";
      this._attachedDeviceOrientationEvent = false;
      this._attachedDeviceMotionEvent = false;
      this._debugHighlightElem = null;
      this._isExportToVideo = false;
      this._exportVideoProgressMessage = "";
      this._exportVideoUpdateTimerId = -1;
      this._pointerRawUpdateRateLimiter = null;
      this._lastPointerRawUpdateEvent = null;
      this._pointerRawMovementX = 0;
      this._pointerRawMovementY = 0;
      this._enableAndroidVKDetection = false;
      this._lastWindowWidth = iRuntime._GetWindowInnerWidth();
      this._lastWindowHeight = iRuntime._GetWindowInnerHeight();
      this._virtualKeyboardHeight = 0;
      this._vkTranslateYOffset = 0;
      iRuntime.AddRuntimeComponentMessageHandler("canvas", "update-size", (e) =>
        this._OnUpdateCanvasSize(e)
      );
      iRuntime.AddRuntimeComponentMessageHandler(
        "runtime",
        "invoke-download",
        (e) => this._OnInvokeDownload(e)
      );
      iRuntime.AddRuntimeComponentMessageHandler(
        "runtime",
        "raster-svg-image",
        (e) => this._OnRasterSvgImage(e)
      );
      iRuntime.AddRuntimeComponentMessageHandler(
        "runtime",
        "get-svg-image-size",
        (e) => this._OnGetSvgImageSize(e)
      );
      iRuntime.AddRuntimeComponentMessageHandler(
        "runtime",
        "set-target-orientation",
        (e) => this._OnSetTargetOrientation(e)
      );
      iRuntime.AddRuntimeComponentMessageHandler("runtime", "register-sw", () =>
        this._OnRegisterSW()
      );
      iRuntime.AddRuntimeComponentMessageHandler(
        "runtime",
        "post-to-debugger",
        (e) => this._OnPostToDebugger(e)
      );
      iRuntime.AddRuntimeComponentMessageHandler(
        "runtime",
        "go-to-script",
        (e) => this._OnPostToDebugger(e)
      );
      iRuntime.AddRuntimeComponentMessageHandler(
        "runtime",
        "before-start-ticking",
        () => this._OnBeforeStartTicking()
      );
      iRuntime.AddRuntimeComponentMessageHandler(
        "runtime",
        "debug-highlight",
        (e) => this._OnDebugHighlight(e)
      );
      iRuntime.AddRuntimeComponentMessageHandler(
        "runtime",
        "enable-device-orientation",
        () => this._AttachDeviceOrientationEvent()
      );
      iRuntime.AddRuntimeComponentMessageHandler(
        "runtime",
        "enable-device-motion",
        () => this._AttachDeviceMotionEvent()
      );
      iRuntime.AddRuntimeComponentMessageHandler(
        "runtime",
        "add-stylesheet",
        (e) => this._OnAddStylesheet(e)
      );
      iRuntime.AddRuntimeComponentMessageHandler(
        "runtime",
        "script-create-worker",
        (e) => this._OnScriptCreateWorker(e)
      );
      iRuntime.AddRuntimeComponentMessageHandler("runtime", "alert", (e) =>
        this._OnAlert(e)
      );
      iRuntime.AddRuntimeComponentMessageHandler(
        "runtime",
        "hide-cordova-splash",
        () => this._OnHideCordovaSplash()
      );
      iRuntime.AddRuntimeComponentMessageHandler(
        "runtime",
        "set-exporting-to-video",
        (e) => this._SetExportingToVideo(e)
      );
      iRuntime.AddRuntimeComponentMessageHandler(
        "runtime",
        "export-to-video-progress",
        (e) => this._OnExportVideoProgress(e)
      );
      iRuntime.AddRuntimeComponentMessageHandler(
        "runtime",
        "exported-to-video",
        (e) => this._OnExportedToVideo(e)
      );
      iRuntime.AddRuntimeComponentMessageHandler(
        "runtime",
        "exported-to-image-sequence",
        (e) => this._OnExportedToImageSequence(e)
      );
      const allowDefaultContextMenuTagNames = new Set([
        "input",
        "textarea",
        "datalist",
      ]);
      window.addEventListener("contextmenu", (e) => {
        const t = e.target;
        const name = t.tagName.toLowerCase();
        if (
          !allowDefaultContextMenuTagNames.has(name) &&
          !IsInContentEditable(t)
        )
          e.preventDefault();
      });
      const canvas = iRuntime.GetCanvas();
      window.addEventListener("selectstart", PreventDefaultOnCanvasOrDoc);
      window.addEventListener("gesturehold", PreventDefaultOnCanvasOrDoc);
      canvas.addEventListener("selectstart", PreventDefaultOnCanvasOrDoc);
      canvas.addEventListener("gesturehold", PreventDefaultOnCanvasOrDoc);
      window.addEventListener("touchstart", PreventDefaultOnCanvasOrDoc, {
        passive: false,
      });
      if (typeof PointerEvent !== "undefined") {
        window.addEventListener("pointerdown", PreventDefaultOnCanvasOrDoc, {
          passive: false,
        });
        canvas.addEventListener("pointerdown", PreventDefaultOnCanvasOrDoc);
      } else canvas.addEventListener("touchstart", PreventDefaultOnCanvasOrDoc);
      this._mousePointerLastButtons = 0;
      window.addEventListener("mousedown", (e) => {
        if (e.button === 1) e.preventDefault();
      });
      window.addEventListener("mousewheel", BlockWheelZoom, { passive: false });
      window.addEventListener("wheel", BlockWheelZoom, { passive: false });
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
      window.addEventListener("fullscreenerror", (e) =>
        this._OnFullscreenError(e)
      );
      window.addEventListener("webkitfullscreenerror", (e) =>
        this._OnFullscreenError(e)
      );
      window.addEventListener("mozfullscreenerror", (e) =>
        this._OnFullscreenError(e)
      );
      if (iRuntime.IsiOSWebView())
        if (window["visualViewport"]) {
          let lastVisualViewportHeight = Infinity;
          window["visualViewport"].addEventListener("resize", () => {
            const curVisualViewportHeight = window["visualViewport"].height;
            if (curVisualViewportHeight > lastVisualViewportHeight)
              document.scrollingElement.scrollTop = 0;
            lastVisualViewportHeight = curVisualViewportHeight;
          });
        } else
          window.addEventListener("focusout", () => {
            if (!KeyboardIsVisible()) document.scrollingElement.scrollTop = 0;
          });
      self["C3WrapperOnMessage"] = (msg) => this._OnWrapperMessage(msg);
      this._mediaPendingPlay = new Set();
      this._mediaRemovedPendingPlay = new WeakSet();
      this._isSilent = false;
    }
    _OnBeforeStartTicking() {
      self.setTimeout(() => {
        this._enableAndroidVKDetection = true;
      }, 1e3);
      if (this._iRuntime.GetExportType() === "cordova") {
        document.addEventListener("pause", () =>
          this._OnVisibilityChange(true)
        );
        document.addEventListener("resume", () =>
          this._OnVisibilityChange(false)
        );
      } else
        document.addEventListener("visibilitychange", () =>
          this._OnVisibilityChange(document.hidden)
        );
      return { isSuspended: !!(document.hidden || isCordovaPaused) };
    }
    Attach() {
      window.addEventListener("focus", () =>
        this._PostRuntimeEvent("window-focus")
      );
      window.addEventListener("blur", () => {
        this._PostRuntimeEvent("window-blur", {
          parentHasFocus: ParentHasFocus(),
        });
        this._mousePointerLastButtons = 0;
      });
      window.addEventListener("focusin", (e) => {
        if (IsKeyboardInputElement(e.target))
          this._PostRuntimeEvent("keyboard-blur");
      });
      window.addEventListener("keydown", (e) => this._OnKeyEvent("keydown", e));
      window.addEventListener("keyup", (e) => this._OnKeyEvent("keyup", e));
      window.addEventListener("dblclick", (e) =>
        this._OnMouseEvent("dblclick", e, DISPATCH_RUNTIME_AND_SCRIPT)
      );
      window.addEventListener("wheel", (e) =>
        this._OnMouseWheelEvent("wheel", e)
      );
      if (typeof PointerEvent !== "undefined") {
        window.addEventListener("pointerdown", (e) => {
          this._HandlePointerDownFocus(e);
          this._OnPointerEvent("pointerdown", e);
        });
        if (
          this._iRuntime.UsesWorker() &&
          typeof window["onpointerrawupdate"] !== "undefined" &&
          self === self.top
        ) {
          this._pointerRawUpdateRateLimiter = new self.RateLimiter(
            () => this._DoSendPointerRawUpdate(),
            5
          );
          this._pointerRawUpdateRateLimiter.SetCanRunImmediate(true);
          window.addEventListener("pointerrawupdate", (e) =>
            this._OnPointerRawUpdate(e)
          );
        } else
          window.addEventListener("pointermove", (e) =>
            this._OnPointerEvent("pointermove", e)
          );
        window.addEventListener("pointerup", (e) =>
          this._OnPointerEvent("pointerup", e)
        );
        window.addEventListener("pointercancel", (e) =>
          this._OnPointerEvent("pointercancel", e)
        );
      } else {
        window.addEventListener("mousedown", (e) => {
          this._HandlePointerDownFocus(e);
          this._OnMouseEventAsPointer("pointerdown", e);
        });
        window.addEventListener("mousemove", (e) =>
          this._OnMouseEventAsPointer("pointermove", e)
        );
        window.addEventListener("mouseup", (e) =>
          this._OnMouseEventAsPointer("pointerup", e)
        );
        window.addEventListener("touchstart", (e) => {
          this._HandlePointerDownFocus(e);
          this._OnTouchEvent("pointerdown", e);
        });
        window.addEventListener("touchmove", (e) =>
          this._OnTouchEvent("pointermove", e)
        );
        window.addEventListener("touchend", (e) =>
          this._OnTouchEvent("pointerup", e)
        );
        window.addEventListener("touchcancel", (e) =>
          this._OnTouchEvent("pointercancel", e)
        );
      }
      const playFunc = () => this._PlayPendingMedia();
      window.addEventListener("pointerup", playFunc, true);
      window.addEventListener("touchend", playFunc, true);
      window.addEventListener("click", playFunc, true);
      window.addEventListener("keydown", playFunc, true);
      window.addEventListener("gamepadconnected", playFunc, true);
      if (
        this._iRuntime.IsAndroid() &&
        !this._iRuntime.IsAndroidWebView() &&
        navigator["virtualKeyboard"]
      ) {
        navigator["virtualKeyboard"]["overlaysContent"] = true;
        navigator["virtualKeyboard"].addEventListener("geometrychange", () => {
          this._OnAndroidVirtualKeyboardChange(
            this._GetWindowInnerHeight(),
            navigator["virtualKeyboard"]["boundingRect"]["height"]
          );
        });
      }
    }
    _OnAndroidVirtualKeyboardChange(windowHeight, vkHeight) {
      document.body.style.transform = "";
      this._vkTranslateYOffset = 0;
      if (vkHeight > 0) {
        const activeElement = document.activeElement;
        if (activeElement) {
          const rc = activeElement.getBoundingClientRect();
          const rcMidY = (rc.top + rc.bottom) / 2;
          const targetY = (windowHeight - vkHeight) / 2;
          let shiftY = rcMidY - targetY;
          if (shiftY > vkHeight) shiftY = vkHeight;
          if (shiftY < 0) shiftY = 0;
          if (shiftY > 0) {
            document.body.style.transform = `translateY(${-shiftY}px)`;
            this._vkTranslateYOffset = shiftY;
          }
        }
      }
    }
    _PostRuntimeEvent(name, data) {
      this.PostToRuntime(name, data || null, DISPATCH_RUNTIME_ONLY);
    }
    _GetWindowInnerWidth() {
      return this._iRuntime._GetWindowInnerWidth();
    }
    _GetWindowInnerHeight() {
      return this._iRuntime._GetWindowInnerHeight();
    }
    _EnableWindowResizeEvent() {
      this._enableWindowResizeEvent = true;
      this._lastWindowWidth = this._iRuntime._GetWindowInnerWidth();
      this._lastWindowHeight = this._iRuntime._GetWindowInnerHeight();
    }
    _OnWindowResize() {
      if (this._isExportToVideo) return;
      if (!this._enableWindowResizeEvent) return;
      const width = this._GetWindowInnerWidth();
      const height = this._GetWindowInnerHeight();
      if (this._iRuntime.IsAndroidWebView())
        if (this._enableAndroidVKDetection)
          if (
            this._lastWindowWidth === width &&
            height < this._lastWindowHeight
          ) {
            this._virtualKeyboardHeight = this._lastWindowHeight - height;
            this._OnAndroidVirtualKeyboardChange(
              this._lastWindowHeight,
              this._virtualKeyboardHeight
            );
            return;
          } else {
            if (this._virtualKeyboardHeight > 0) {
              this._virtualKeyboardHeight = 0;
              this._OnAndroidVirtualKeyboardChange(
                height,
                this._virtualKeyboardHeight
              );
            }
            this._lastWindowWidth = width;
            this._lastWindowHeight = height;
          }
        else {
          this._lastWindowWidth = width;
          this._lastWindowHeight = height;
        }
      this.PostToRuntime("window-resize", {
        innerWidth: width,
        innerHeight: height,
        devicePixelRatio: window.devicePixelRatio,
        isFullscreen: RuntimeInterface.IsDocumentFullscreen(),
      });
      if (this._iRuntime.IsiOSWebView()) {
        if (this._simulatedResizeTimerId !== -1)
          clearTimeout(this._simulatedResizeTimerId);
        this._OnSimulatedResize(width, height, 0);
      }
    }
    _ScheduleSimulatedResize(width, height, count) {
      if (this._simulatedResizeTimerId !== -1)
        clearTimeout(this._simulatedResizeTimerId);
      this._simulatedResizeTimerId = setTimeout(
        () => this._OnSimulatedResize(width, height, count),
        48
      );
    }
    _OnSimulatedResize(originalWidth, originalHeight, count) {
      const width = this._GetWindowInnerWidth();
      const height = this._GetWindowInnerHeight();
      this._simulatedResizeTimerId = -1;
      if (width != originalWidth || height != originalHeight)
        this.PostToRuntime("window-resize", {
          innerWidth: width,
          innerHeight: height,
          devicePixelRatio: window.devicePixelRatio,
          isFullscreen: RuntimeInterface.IsDocumentFullscreen(),
        });
      else if (count < 10)
        this._ScheduleSimulatedResize(width, height, count + 1);
    }
    _OnSetTargetOrientation(e) {
      this._targetOrientation = e["targetOrientation"];
    }
    _TrySetTargetOrientation() {
      const orientation = this._targetOrientation;
      if (screen["orientation"] && screen["orientation"]["lock"])
        screen["orientation"]
          ["lock"](orientation)
          .catch((err) =>
            console.warn("[Construct] Failed to lock orientation: ", err)
          );
      else
        try {
          let result = false;
          if (screen["lockOrientation"])
            result = screen["lockOrientation"](orientation);
          else if (screen["webkitLockOrientation"])
            result = screen["webkitLockOrientation"](orientation);
          else if (screen["mozLockOrientation"])
            result = screen["mozLockOrientation"](orientation);
          else if (screen["msLockOrientation"])
            result = screen["msLockOrientation"](orientation);
          if (!result) console.warn("[Construct] Failed to lock orientation");
        } catch (err) {
          console.warn("[Construct] Failed to lock orientation: ", err);
        }
    }
    _OnFullscreenChange() {
      if (this._isExportToVideo) return;
      const isDocFullscreen = RuntimeInterface.IsDocumentFullscreen();
      if (isDocFullscreen && this._targetOrientation !== "any")
        this._TrySetTargetOrientation();
      this.PostToRuntime("fullscreenchange", {
        isFullscreen: isDocFullscreen,
        innerWidth: this._GetWindowInnerWidth(),
        innerHeight: this._GetWindowInnerHeight(),
      });
    }
    _OnFullscreenError(e) {
      console.warn("[Construct] Fullscreen request failed: ", e);
      this.PostToRuntime("fullscreenerror", {
        isFullscreen: RuntimeInterface.IsDocumentFullscreen(),
        innerWidth: this._GetWindowInnerWidth(),
        innerHeight: this._GetWindowInnerHeight(),
      });
    }
    _OnVisibilityChange(isHidden) {
      if (isHidden) this._iRuntime._CancelAnimationFrame();
      else this._iRuntime._RequestAnimationFrame();
      this.PostToRuntime("visibilitychange", { hidden: isHidden });
    }
    _OnKeyEvent(name, e) {
      if (e.key === "Backspace") PreventDefaultOnCanvasOrDoc(e);
      if (this._isExportToVideo) return;
      const code = KEY_CODE_ALIASES.get(e.code) || e.code;
      this._PostToRuntimeMaybeSync(
        name,
        {
          code: code,
          key: e.key,
          which: e.which,
          repeat: e.repeat,
          altKey: e.altKey,
          ctrlKey: e.ctrlKey,
          metaKey: e.metaKey,
          shiftKey: e.shiftKey,
          timeStamp: e.timeStamp,
        },
        DISPATCH_RUNTIME_AND_SCRIPT
      );
    }
    _OnMouseWheelEvent(name, e) {
      if (this._isExportToVideo) return;
      this.PostToRuntime(
        name,
        {
          clientX: e.clientX,
          clientY: e.clientY + this._vkTranslateYOffset,
          pageX: e.pageX,
          pageY: e.pageY + this._vkTranslateYOffset,
          deltaX: e.deltaX,
          deltaY: e.deltaY,
          deltaZ: e.deltaZ,
          deltaMode: e.deltaMode,
          timeStamp: e.timeStamp,
        },
        DISPATCH_RUNTIME_AND_SCRIPT
      );
    }
    _OnMouseEvent(name, e, opts) {
      if (this._isExportToVideo) return;
      if (IsCompatibilityMouseEvent(e)) return;
      this._PostToRuntimeMaybeSync(
        name,
        {
          button: e.button,
          buttons: e.buttons,
          clientX: e.clientX,
          clientY: e.clientY + this._vkTranslateYOffset,
          pageX: e.pageX,
          pageY: e.pageY + this._vkTranslateYOffset,
          movementX: e.movementX || 0,
          movementY: e.movementY || 0,
          timeStamp: e.timeStamp,
        },
        opts
      );
    }
    _OnMouseEventAsPointer(name, e) {
      if (this._isExportToVideo) return;
      if (IsCompatibilityMouseEvent(e)) return;
      const pointerId = 1;
      const lastButtons = this._mousePointerLastButtons;
      if (name === "pointerdown" && lastButtons !== 0) name = "pointermove";
      else if (name === "pointerup" && e.buttons !== 0) name = "pointermove";
      this._PostToRuntimeMaybeSync(
        name,
        {
          pointerId: pointerId,
          pointerType: "mouse",
          button: e.button,
          buttons: e.buttons,
          lastButtons: lastButtons,
          clientX: e.clientX,
          clientY: e.clientY + this._vkTranslateYOffset,
          pageX: e.pageX,
          pageY: e.pageY + this._vkTranslateYOffset,
          movementX: e.movementX || 0,
          movementY: e.movementY || 0,
          width: 0,
          height: 0,
          pressure: 0,
          tangentialPressure: 0,
          tiltX: 0,
          tiltY: 0,
          twist: 0,
          timeStamp: e.timeStamp,
        },
        DISPATCH_RUNTIME_AND_SCRIPT
      );
      this._mousePointerLastButtons = e.buttons;
      this._OnMouseEvent(e.type, e, DISPATCH_SCRIPT_ONLY);
    }
    _OnPointerEvent(name, e) {
      if (this._isExportToVideo) return;
      if (this._pointerRawUpdateRateLimiter && name !== "pointermove")
        this._pointerRawUpdateRateLimiter.Reset();
      let lastButtons = 0;
      if (e.pointerType === "mouse")
        lastButtons = this._mousePointerLastButtons;
      this._PostToRuntimeMaybeSync(
        name,
        {
          pointerId: e.pointerId,
          pointerType: e.pointerType,
          button: e.button,
          buttons: e.buttons,
          lastButtons: lastButtons,
          clientX: e.clientX,
          clientY: e.clientY + this._vkTranslateYOffset,
          pageX: e.pageX,
          pageY: e.pageY + this._vkTranslateYOffset,
          movementX: (e.movementX || 0) + this._pointerRawMovementX,
          movementY: (e.movementY || 0) + this._pointerRawMovementY,
          width: e.width || 0,
          height: e.height || 0,
          pressure: e.pressure || 0,
          tangentialPressure: e["tangentialPressure"] || 0,
          tiltX: e.tiltX || 0,
          tiltY: e.tiltY || 0,
          twist: e["twist"] || 0,
          timeStamp: e.timeStamp,
        },
        DISPATCH_RUNTIME_AND_SCRIPT
      );
      this._pointerRawMovementX = 0;
      this._pointerRawMovementY = 0;
      if (e.pointerType === "mouse") {
        let mouseEventName = "mousemove";
        if (name === "pointerdown") mouseEventName = "mousedown";
        else if (name === "pointerup") mouseEventName = "mouseup";
        this._OnMouseEvent(mouseEventName, e, DISPATCH_SCRIPT_ONLY);
        this._mousePointerLastButtons = e.buttons;
      }
    }
    _OnPointerRawUpdate(e) {
      if (this._lastPointerRawUpdateEvent) {
        this._pointerRawMovementX +=
          this._lastPointerRawUpdateEvent.movementX || 0;
        this._pointerRawMovementY +=
          this._lastPointerRawUpdateEvent.movementY || 0;
      }
      this._lastPointerRawUpdateEvent = e;
      this._pointerRawUpdateRateLimiter.Call();
    }
    _DoSendPointerRawUpdate() {
      this._OnPointerEvent("pointermove", this._lastPointerRawUpdateEvent);
      this._lastPointerRawUpdateEvent = null;
    }
    _OnTouchEvent(fireName, e) {
      if (this._isExportToVideo) return;
      for (let i = 0, len = e.changedTouches.length; i < len; ++i) {
        const t = e.changedTouches[i];
        this._PostToRuntimeMaybeSync(
          fireName,
          {
            pointerId: t.identifier,
            pointerType: "touch",
            button: 0,
            buttons: 0,
            lastButtons: 0,
            clientX: t.clientX,
            clientY: t.clientY + this._vkTranslateYOffset,
            pageX: t.pageX,
            pageY: t.pageY + this._vkTranslateYOffset,
            movementX: e.movementX || 0,
            movementY: e.movementY || 0,
            width: (t["radiusX"] || t["webkitRadiusX"] || 0) * 2,
            height: (t["radiusY"] || t["webkitRadiusY"] || 0) * 2,
            pressure: t["force"] || t["webkitForce"] || 0,
            tangentialPressure: 0,
            tiltX: 0,
            tiltY: 0,
            twist: t["rotationAngle"] || 0,
            timeStamp: e.timeStamp,
          },
          DISPATCH_RUNTIME_AND_SCRIPT
        );
      }
    }
    _HandlePointerDownFocus(e) {
      if (window !== window.top) window.focus();
      if (
        this._IsElementCanvasOrDocument(e.target) &&
        document.activeElement &&
        !this._IsElementCanvasOrDocument(document.activeElement)
      )
        document.activeElement.blur();
    }
    _IsElementCanvasOrDocument(elem) {
      return (
        !elem ||
        elem === document ||
        elem === window ||
        elem === document.body ||
        elem.tagName.toLowerCase() === "canvas"
      );
    }
    _AttachDeviceOrientationEvent() {
      if (this._attachedDeviceOrientationEvent) return;
      this._attachedDeviceOrientationEvent = true;
      window.addEventListener("deviceorientation", (e) =>
        this._OnDeviceOrientation(e)
      );
      window.addEventListener("deviceorientationabsolute", (e) =>
        this._OnDeviceOrientationAbsolute(e)
      );
    }
    _AttachDeviceMotionEvent() {
      if (this._attachedDeviceMotionEvent) return;
      this._attachedDeviceMotionEvent = true;
      window.addEventListener("devicemotion", (e) => this._OnDeviceMotion(e));
    }
    _OnDeviceOrientation(e) {
      if (this._isExportToVideo) return;
      this.PostToRuntime(
        "deviceorientation",
        {
          absolute: !!e["absolute"],
          alpha: e["alpha"] || 0,
          beta: e["beta"] || 0,
          gamma: e["gamma"] || 0,
          timeStamp: e.timeStamp,
          webkitCompassHeading: e["webkitCompassHeading"],
          webkitCompassAccuracy: e["webkitCompassAccuracy"],
        },
        DISPATCH_RUNTIME_AND_SCRIPT
      );
    }
    _OnDeviceOrientationAbsolute(e) {
      if (this._isExportToVideo) return;
      this.PostToRuntime(
        "deviceorientationabsolute",
        {
          absolute: !!e["absolute"],
          alpha: e["alpha"] || 0,
          beta: e["beta"] || 0,
          gamma: e["gamma"] || 0,
          timeStamp: e.timeStamp,
        },
        DISPATCH_RUNTIME_AND_SCRIPT
      );
    }
    _OnDeviceMotion(e) {
      if (this._isExportToVideo) return;
      let accProp = null;
      const acc = e["acceleration"];
      if (acc)
        accProp = { x: acc["x"] || 0, y: acc["y"] || 0, z: acc["z"] || 0 };
      let withGProp = null;
      const withG = e["accelerationIncludingGravity"];
      if (withG)
        withGProp = {
          x: withG["x"] || 0,
          y: withG["y"] || 0,
          z: withG["z"] || 0,
        };
      let rotationRateProp = null;
      const rotationRate = e["rotationRate"];
      if (rotationRate)
        rotationRateProp = {
          alpha: rotationRate["alpha"] || 0,
          beta: rotationRate["beta"] || 0,
          gamma: rotationRate["gamma"] || 0,
        };
      this.PostToRuntime(
        "devicemotion",
        {
          acceleration: accProp,
          accelerationIncludingGravity: withGProp,
          rotationRate: rotationRateProp,
          interval: e["interval"],
          timeStamp: e.timeStamp,
        },
        DISPATCH_RUNTIME_AND_SCRIPT
      );
    }
    _OnUpdateCanvasSize(e) {
      const runtimeInterface = this.GetRuntimeInterface();
      if (runtimeInterface.IsExportingToVideo()) return;
      const canvas = runtimeInterface.GetCanvas();
      canvas.style.width = e["styleWidth"] + "px";
      canvas.style.height = e["styleHeight"] + "px";
      canvas.style.marginLeft = e["marginLeft"] + "px";
      canvas.style.marginTop = e["marginTop"] + "px";
      document.documentElement.style.setProperty(
        "--construct-scale",
        e["displayScale"]
      );
      if (this._isFirstSizeUpdate) {
        canvas.style.display = "";
        this._isFirstSizeUpdate = false;
      }
    }
    _OnInvokeDownload(e) {
      const url = e["url"];
      const filename = e["filename"];
      const a = document.createElement("a");
      const body = document.body;
      a.textContent = filename;
      a.href = url;
      a.download = filename;
      body.appendChild(a);
      a.click();
      body.removeChild(a);
    }
    async _OnRasterSvgImage(e) {
      const blob = e["blob"];
      const imageWidth = e["imageWidth"];
      const imageHeight = e["imageHeight"];
      const surfaceWidth = e["surfaceWidth"];
      const surfaceHeight = e["surfaceHeight"];
      const imageBitmapOpts = e["imageBitmapOpts"];
      const canvas = await self["C3_RasterSvgImageBlob"](
        blob,
        imageWidth,
        imageHeight,
        surfaceWidth,
        surfaceHeight
      );
      let ret;
      if (imageBitmapOpts)
        ret = await createImageBitmap(canvas, imageBitmapOpts);
      else ret = await createImageBitmap(canvas);
      return { imageBitmap: ret, transferables: [ret] };
    }
    async _OnGetSvgImageSize(e) {
      return await self["C3_GetSvgImageSize"](e["blob"]);
    }
    async _OnAddStylesheet(e) {
      await AddStyleSheet(e["url"]);
    }
    _PlayPendingMedia() {
      const mediaToTryPlay = [...this._mediaPendingPlay];
      this._mediaPendingPlay.clear();
      if (!this._isSilent)
        for (const mediaElem of mediaToTryPlay) {
          const playRet = mediaElem.play();
          if (playRet)
            playRet.catch((err) => {
              if (!this._mediaRemovedPendingPlay.has(mediaElem))
                this._mediaPendingPlay.add(mediaElem);
            });
        }
    }
    TryPlayMedia(mediaElem) {
      if (typeof mediaElem.play !== "function")
        throw new Error("missing play function");
      this._mediaRemovedPendingPlay.delete(mediaElem);
      let playRet;
      try {
        playRet = mediaElem.play();
      } catch (err) {
        this._mediaPendingPlay.add(mediaElem);
        return;
      }
      if (playRet)
        playRet.catch((err) => {
          if (!this._mediaRemovedPendingPlay.has(mediaElem))
            this._mediaPendingPlay.add(mediaElem);
        });
    }
    RemovePendingPlay(mediaElem) {
      this._mediaPendingPlay.delete(mediaElem);
      this._mediaRemovedPendingPlay.add(mediaElem);
    }
    SetSilent(s) {
      this._isSilent = !!s;
    }
    _OnHideCordovaSplash() {
      if (navigator["splashscreen"] && navigator["splashscreen"]["hide"])
        navigator["splashscreen"]["hide"]();
    }
    _OnDebugHighlight(e) {
      const show = e["show"];
      if (!show) {
        if (this._debugHighlightElem)
          this._debugHighlightElem.style.display = "none";
        return;
      }
      if (!this._debugHighlightElem) {
        this._debugHighlightElem = document.createElement("div");
        this._debugHighlightElem.id = "inspectOutline";
        document.body.appendChild(this._debugHighlightElem);
      }
      const elem = this._debugHighlightElem;
      elem.style.display = "";
      elem.style.left = e["left"] - 1 + "px";
      elem.style.top = e["top"] - 1 + "px";
      elem.style.width = e["width"] + 2 + "px";
      elem.style.height = e["height"] + 2 + "px";
      elem.textContent = e["name"];
    }
    _OnRegisterSW() {
      if (window["C3_RegisterSW"]) window["C3_RegisterSW"]();
    }
    _OnPostToDebugger(data) {
      if (!window["c3_postToMessagePort"]) return;
      data["from"] = "runtime";
      window["c3_postToMessagePort"](data);
    }
    _InvokeFunctionFromJS(name, params) {
      return this.PostToRuntimeAsync("js-invoke-function", {
        name: name,
        params: params,
      });
    }
    _OnScriptCreateWorker(e) {
      const url = e["url"];
      const opts = e["opts"];
      const port2 = e["port2"];
      const worker = new Worker(url, opts);
      worker.postMessage({ type: "construct-worker-init", port2: port2 }, [
        port2,
      ]);
    }
    _OnAlert(e) {
      alert(e["message"]);
    }
    _OnWrapperMessage(msg) {
      if (msg === "entered-fullscreen") {
        RuntimeInterface._SetWrapperIsFullscreenFlag(true);
        this._OnFullscreenChange();
      } else if (msg === "exited-fullscreen") {
        RuntimeInterface._SetWrapperIsFullscreenFlag(false);
        this._OnFullscreenChange();
      } else console.warn("Unknown wrapper message: ", msg);
    }
    _SetExportingToVideo(e) {
      this._isExportToVideo = true;
      const headerElem = document.createElement("h1");
      headerElem.id = "exportToVideoMessage";
      headerElem.textContent = e["message"];
      document.body.prepend(headerElem);
      document.body.classList.add("exportingToVideo");
      this.GetRuntimeInterface().GetCanvas().style.display = "";
      this._iRuntime.SetIsExportingToVideo(e["duration"]);
    }
    _OnExportVideoProgress(e) {
      this._exportVideoProgressMessage = e["message"];
      if (this._exportVideoUpdateTimerId === -1)
        this._exportVideoUpdateTimerId = setTimeout(
          () => this._DoUpdateExportVideoProgressMessage(),
          250
        );
    }
    _DoUpdateExportVideoProgressMessage() {
      this._exportVideoUpdateTimerId = -1;
      const headerElem = document.getElementById("exportToVideoMessage");
      if (headerElem) headerElem.textContent = this._exportVideoProgressMessage;
    }
    _OnExportedToVideo(e) {
      window.c3_postToMessagePort({
        type: "exported-video",
        blob: e["blob"],
        time: e["time"],
      });
    }
    _OnExportedToImageSequence(e) {
      window.c3_postToMessagePort({
        type: "exported-image-sequence",
        blobArr: e["blobArr"],
        time: e["time"],
        gif: e["gif"],
      });
    }
  };
  RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}

("use strict");
{
  const DISPATCH_WORKER_SCRIPT_NAME = "dispatchworker.js";
  const JOB_WORKER_SCRIPT_NAME = "jobworker.js";
  self.JobSchedulerDOM = class JobSchedulerDOM {
    constructor(runtimeInterface) {
      this._runtimeInterface = runtimeInterface;
      this._baseUrl = runtimeInterface.GetRuntimeBaseURL();
      if (runtimeInterface.GetExportType() === "preview")
        this._baseUrl += "workers/";
      else this._baseUrl += runtimeInterface.GetScriptFolder();
      this._maxNumWorkers = Math.min(navigator.hardwareConcurrency || 2, 16);
      this._dispatchWorker = null;
      this._jobWorkers = [];
      this._inputPort = null;
      this._outputPort = null;
    }
    _GetWorkerScriptFolder() {
      if (this._runtimeInterface.GetExportType() === "playable-ad")
        return this._runtimeInterface.GetScriptFolder();
      else return "";
    }
    async Init() {
      if (this._hasInitialised) throw new Error("already initialised");
      this._hasInitialised = true;
      const dispatchWorkerScriptUrl = this._runtimeInterface._GetWorkerURL(
        this._GetWorkerScriptFolder() + DISPATCH_WORKER_SCRIPT_NAME
      );
      this._dispatchWorker = await this._runtimeInterface.CreateWorker(
        dispatchWorkerScriptUrl,
        this._baseUrl,
        { name: "DispatchWorker" }
      );
      const messageChannel = new MessageChannel();
      this._inputPort = messageChannel.port1;
      this._dispatchWorker.postMessage(
        { type: "_init", "in-port": messageChannel.port2 },
        [messageChannel.port2]
      );
      this._outputPort = await this._CreateJobWorker();
    }
    async _CreateJobWorker() {
      const number = this._jobWorkers.length;
      const jobWorkerScriptUrl = this._runtimeInterface._GetWorkerURL(
        this._GetWorkerScriptFolder() + JOB_WORKER_SCRIPT_NAME
      );
      const jobWorker = await this._runtimeInterface.CreateWorker(
        jobWorkerScriptUrl,
        this._baseUrl,
        { name: "JobWorker" + number }
      );
      const dispatchChannel = new MessageChannel();
      const outputChannel = new MessageChannel();
      this._dispatchWorker.postMessage(
        { type: "_addJobWorker", port: dispatchChannel.port1 },
        [dispatchChannel.port1]
      );
      jobWorker.postMessage(
        {
          type: "init",
          number: number,
          "dispatch-port": dispatchChannel.port2,
          "output-port": outputChannel.port2,
        },
        [dispatchChannel.port2, outputChannel.port2]
      );
      this._jobWorkers.push(jobWorker);
      return outputChannel.port1;
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
}

("use strict");
{
  if (window["C3_IsSupported"]) {
    const enableWorker = false;
    window["c3_runtimeInterface"] = new self.RuntimeInterface({
      useWorker: enableWorker,
      workerMainUrl: "workermain.js",
      engineScripts: ["scripts/c3runtime.js"],
      projectScripts: [
        ["scripts/project/main.js"],
        ["scripts/project/scriptsInEvents.js"],
      ],
      mainProjectScript: "scripts/project/main.js",
      scriptFolder: "scripts/",
      workerDependencyScripts: [],
      exportType: "html5",
    });
  }
}
("use strict");
{
  function elemsForSelector(selector, isAll) {
    if (!selector) return [document.documentElement];
    else if (isAll) return Array.from(document.querySelectorAll(selector));
    else {
      const e = document.querySelector(selector);
      return e ? [e] : [];
    }
  }
  function noop() {}
  const DOM_COMPONENT_ID = "browser";
  const HANDLER_CLASS = class BrowserDOMHandler extends self.DOMHandler {
    constructor(iRuntime) {
      super(iRuntime, DOM_COMPONENT_ID);
      this._exportType = "";
      this.AddRuntimeMessageHandlers([
        ["get-initial-state", (e) => this._OnGetInitialState(e)],
        ["ready-for-sw-messages", () => this._OnReadyForSWMessages()],
        ["alert", (e) => this._OnAlert(e)],
        ["close", () => this._OnClose()],
        ["set-focus", (e) => this._OnSetFocus(e)],
        ["vibrate", (e) => this._OnVibrate(e)],
        ["lock-orientation", (e) => this._OnLockOrientation(e)],
        ["unlock-orientation", () => this._OnUnlockOrientation()],
        ["navigate", (e) => this._OnNavigate(e)],
        ["request-fullscreen", (e) => this._OnRequestFullscreen(e)],
        ["exit-fullscreen", () => this._OnExitFullscreen()],
        ["set-hash", (e) => this._OnSetHash(e)],
        ["set-document-css-style", (e) => this._OnSetDocumentCSSStyle(e)],
        ["get-document-css-style", (e) => this._OnGetDocumentCSSStyle(e)],
      ]);
      window.addEventListener("online", () => this._OnOnlineStateChanged(true));
      window.addEventListener("offline", () =>
        this._OnOnlineStateChanged(false)
      );
      window.addEventListener("hashchange", () => this._OnHashChange());
      document.addEventListener("backbutton", () =>
        this._OnCordovaBackButton()
      );
    }
    _OnGetInitialState(e) {
      this._exportType = e["exportType"];
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
        isConstructArcade: typeof window["is_scirra_arcade"] !== "undefined",
      };
    }
    _OnReadyForSWMessages() {
      if (!window["C3_RegisterSW"] || !window["OfflineClientInfo"]) return;
      window["OfflineClientInfo"]["SetMessageCallback"]((e) =>
        this.PostToRuntime("sw-message", e["data"])
      );
    }
    _OnOnlineStateChanged(isOnline) {
      this.PostToRuntime("online-state", { isOnline: isOnline });
    }
    _OnCordovaBackButton() {
      this.PostToRuntime("backbutton");
    }
    GetNWjsWindow() {
      if (this._exportType === "nwjs") return nw["Window"]["get"]();
      else return null;
    }
    _OnAlert(e) {
      alert(e["message"]);
    }
    _OnClose() {
      if (navigator["app"] && navigator["app"]["exitApp"])
        navigator["app"]["exitApp"]();
      else if (navigator["device"] && navigator["device"]["exitApp"])
        navigator["device"]["exitApp"]();
      else window.close();
    }
    _OnSetFocus(e) {
      const isFocus = e["isFocus"];
      if (this._exportType === "nwjs") {
        const win = this.GetNWjsWindow();
        if (isFocus) win["focus"]();
        else win["blur"]();
      } else if (isFocus) window.focus();
      else window.blur();
    }
    _OnVibrate(e) {
      if (navigator["vibrate"]) navigator["vibrate"](e["pattern"]);
    }
    _OnLockOrientation(e) {
      const orientation = e["orientation"];
      if (screen["orientation"] && screen["orientation"]["lock"])
        screen["orientation"]
          ["lock"](orientation)
          .catch((err) =>
            console.warn("[Construct] Failed to lock orientation: ", err)
          );
      else
        try {
          let result = false;
          if (screen["lockOrientation"])
            result = screen["lockOrientation"](orientation);
          else if (screen["webkitLockOrientation"])
            result = screen["webkitLockOrientation"](orientation);
          else if (screen["mozLockOrientation"])
            result = screen["mozLockOrientation"](orientation);
          else if (screen["msLockOrientation"])
            result = screen["msLockOrientation"](orientation);
          if (!result) console.warn("[Construct] Failed to lock orientation");
        } catch (err) {
          console.warn("[Construct] Failed to lock orientation: ", err);
        }
    }
    _OnUnlockOrientation() {
      try {
        if (screen["orientation"] && screen["orientation"]["unlock"])
          screen["orientation"]["unlock"]();
        else if (screen["unlockOrientation"]) screen["unlockOrientation"]();
        else if (screen["webkitUnlockOrientation"])
          screen["webkitUnlockOrientation"]();
        else if (screen["mozUnlockOrientation"])
          screen["mozUnlockOrientation"]();
        else if (screen["msUnlockOrientation"]) screen["msUnlockOrientation"]();
      } catch (err) {}
    }
    _OnNavigate(e) {
      const type = e["type"];
      if (type === "back")
        if (navigator["app"] && navigator["app"]["backHistory"])
          navigator["app"]["backHistory"]();
        else window.history.back();
      else if (type === "forward") window.history.forward();
      else if (type === "reload") location.reload();
      else if (type === "url") {
        const url = e["url"];
        const target = e["target"];
        const exportType = e["exportType"];
        if (self["cordova"] && self["cordova"]["InAppBrowser"])
          self["cordova"]["InAppBrowser"]["open"](url, "_system");
        else if (exportType === "preview" || exportType === "windows-webview2")
          window.open(url, "_blank");
        else if (!this._isConstructArcade)
          if (target === 2) window.top.location = url;
          else if (target === 1) window.parent.location = url;
          else window.location = url;
      } else if (type === "new-window") {
        const url = e["url"];
        const tag = e["tag"];
        if (self["cordova"] && self["cordova"]["InAppBrowser"])
          self["cordova"]["InAppBrowser"]["open"](url, "_system");
        else window.open(url, tag);
      }
    }
    _OnRequestFullscreen(e) {
      if (
        this._exportType === "windows-webview2" ||
        this._exportType === "macos-wkwebview"
      ) {
        self.RuntimeInterface._SetWrapperIsFullscreenFlag(true);
        this._iRuntime._SendWrapperMessage({
          type: "set-fullscreen",
          fullscreen: true,
        });
      } else {
        const opts = { navigationUI: "auto" };
        const navUI = e["navUI"];
        if (navUI === 1) opts["navigationUI"] = "hide";
        else if (navUI === 2) opts["navigationUI"] = "show";
        const elem = document.documentElement;
        let ret;
        if (elem["requestFullscreen"]) ret = elem["requestFullscreen"](opts);
        else if (elem["mozRequestFullScreen"])
          ret = elem["mozRequestFullScreen"](opts);
        else if (elem["msRequestFullscreen"])
          ret = elem["msRequestFullscreen"](opts);
        else if (elem["webkitRequestFullScreen"])
          if (typeof Element["ALLOW_KEYBOARD_INPUT"] !== "undefined")
            ret = elem["webkitRequestFullScreen"](
              Element["ALLOW_KEYBOARD_INPUT"]
            );
          else ret = elem["webkitRequestFullScreen"]();
        if (ret instanceof Promise) ret.catch(noop);
      }
    }
    _OnExitFullscreen() {
      if (
        this._exportType === "windows-webview2" ||
        this._exportType === "macos-wkwebview"
      ) {
        self.RuntimeInterface._SetWrapperIsFullscreenFlag(false);
        this._iRuntime._SendWrapperMessage({
          type: "set-fullscreen",
          fullscreen: false,
        });
      } else {
        let ret;
        if (document["exitFullscreen"]) ret = document["exitFullscreen"]();
        else if (document["mozCancelFullScreen"])
          ret = document["mozCancelFullScreen"]();
        else if (document["msExitFullscreen"])
          ret = document["msExitFullscreen"]();
        else if (document["webkitCancelFullScreen"])
          ret = document["webkitCancelFullScreen"]();
        if (ret instanceof Promise) ret.catch(noop);
      }
    }
    _OnSetHash(e) {
      location.hash = e["hash"];
    }
    _OnHashChange() {
      this.PostToRuntime("hashchange", { location: location.toString() });
    }
    _OnSetDocumentCSSStyle(e) {
      const prop = e["prop"];
      const value = e["value"];
      const selector = e["selector"];
      const isAll = e["is-all"];
      try {
        const arr = elemsForSelector(selector, isAll);
        for (const e of arr)
          if (prop.startsWith("--")) e.style.setProperty(prop, value);
          else e.style[prop] = value;
      } catch (err) {
        console.warn("[Browser] Failed to set style: ", err);
      }
    }
    _OnGetDocumentCSSStyle(e) {
      const prop = e["prop"];
      const selector = e["selector"];
      try {
        const elem = document.querySelector(selector);
        if (elem) {
          const computedStyle = window.getComputedStyle(elem);
          return { isOk: true, result: computedStyle.getPropertyValue(prop) };
        } else return { isOk: false };
      } catch (err) {
        console.warn("[Browser] Failed to get style: ", err);
        return { isOk: false };
      }
    }
  };
  self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
("use strict");
{
  const DOM_COMPONENT_ID = "mouse";
  const HANDLER_CLASS = class MouseDOMHandler extends self.DOMHandler {
    constructor(iRuntime) {
      super(iRuntime, DOM_COMPONENT_ID);
      this.AddRuntimeMessageHandlers([
        ["cursor", (e) => this._OnChangeCursorStyle(e)],
        ["request-pointer-lock", () => this._OnRequestPointerLock()],
        ["release-pointer-lock", () => this._OnReleasePointerLock()],
      ]);
      document.addEventListener("pointerlockchange", (e) =>
        this._OnPointerLockChange()
      );
      document.addEventListener("pointerlockerror", (e) =>
        this._OnPointerLockError()
      );
    }
    _OnChangeCursorStyle(e) {
      document.documentElement.style.cursor = e;
    }
    _OnRequestPointerLock() {
      this._iRuntime.GetCanvas().requestPointerLock();
    }
    _OnReleasePointerLock() {
      document.exitPointerLock();
    }
    _OnPointerLockChange() {
      this.PostToRuntime("pointer-lock-change", {
        "has-pointer-lock": !!document.pointerLockElement,
      });
    }
    _OnPointerLockError() {
      this.PostToRuntime("pointer-lock-error", {
        "has-pointer-lock": !!document.pointerLockElement,
      });
    }
  };
  self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
("use strict");
{
  const DOM_COMPONENT_ID = "gamepad";
  let didLogGetGamepadsError = false;
  const HANDLER_CLASS = class GamepadDOMHandler extends self.DOMHandler {
    constructor(iRuntime) {
      super(iRuntime, DOM_COMPONENT_ID);
      this._isSupported = !!navigator["getGamepads"];
      this._isReady = false;
      this.AddRuntimeMessageHandler("is-supported", () =>
        this._OnTestIsSupported()
      );
      this.AddRuntimeMessageHandler("ready", () => this._OnReady());
      this.AddRuntimeMessageHandler("vibrate", (e) =>
        this._OnGamepadVibrate(e)
      );
      this.AddRuntimeMessageHandler("reset-vibrate", (e) =>
        this._OnGamepadResetVibrate(e)
      );
      window.addEventListener("gamepadconnected", (e) =>
        this._OnGamepadConnected(e)
      );
      window.addEventListener("gamepaddisconnected", (e) =>
        this._OnGamepadDisconnected(e)
      );
      window.addEventListener("unload", () => this._OnWindowUnload());
    }
    _GetActiveGamepads() {
      try {
        return Array.from(navigator["getGamepads"]()).filter(
          (g) => g && g["connected"]
        );
      } catch (err) {
        if (!didLogGetGamepadsError) {
          console.warn("[Construct] Failed to access gamepads: ", err);
          didLogGetGamepadsError = true;
        }
        return [];
      }
    }
    _OnTestIsSupported(e) {
      return this._isSupported;
    }
    _OnReady() {
      this._isReady = true;
      for (const gamepad of this._GetActiveGamepads())
        this.PostToRuntime("gamepad-connected", {
          index: gamepad["index"],
          id: gamepad["id"],
        });
      if (this._isSupported) this._StartTicking();
    }
    _OnGamepadConnected(e) {
      if (!this._isReady) return;
      const gamepad = e["gamepad"];
      this.PostToRuntime("gamepad-connected", {
        index: gamepad["index"],
        id: gamepad["id"],
      });
    }
    _OnGamepadDisconnected(e) {
      if (!this._isReady) return;
      const gamepad = e["gamepad"];
      this.PostToRuntime("gamepad-disconnected", { index: gamepad["index"] });
    }
    Tick() {
      const gamepads = this._GetActiveGamepads();
      if (!gamepads.length) return;
      const data = gamepads.map((g) => ({
        index: g["index"],
        id: g["id"],
        buttons: g["buttons"].map((b) => ({
          pressed: b["pressed"],
          value: b["value"],
        })),
        axes: g["axes"],
      }));
      this.PostToRuntime("input-update", data);
    }
    _GetGamepadByIndex(index) {
      for (const g of this._GetActiveGamepads())
        if (g["index"] === index) return g;
      return null;
    }
    async _OnGamepadVibrate(e) {
      const gamepad = this._GetGamepadByIndex(e["index"]);
      if (!gamepad) return;
      const vibrationActuator = gamepad["vibrationActuator"];
      if (!vibrationActuator || !vibrationActuator["playEffect"]) return;
      try {
        await vibrationActuator["playEffect"]("dual-rumble", {
          duration: e["duration"],
          startDelay: 0,
          weakMagnitude: e["weakMag"],
          strongMagnitude: e["strongMag"],
        });
      } catch (err) {
        console.warn("[Gamepad] Failed to vibrate gamepad: ", err);
      }
    }
    _OnGamepadResetVibrate(e) {
      const gamepad = this._GetGamepadByIndex(e["index"]);
      if (!gamepad) return;
      const vibrationActuator = gamepad["vibrationActuator"];
      if (vibrationActuator && vibrationActuator["reset"])
        vibrationActuator["reset"]();
    }
    _OnWindowUnload() {
      for (const gamepad of this._GetActiveGamepads()) {
        const vibrationActuator = gamepad["vibrationActuator"];
        if (vibrationActuator && vibrationActuator["reset"])
          vibrationActuator["reset"]();
      }
    }
  };
  self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
("use strict");
{
  const DOM_COMPONENT_ID = "platform-info";
  const HANDLER_CLASS = class PlatformInfoDOMHandler extends self.DOMHandler {
    constructor(iRuntime) {
      super(iRuntime, DOM_COMPONENT_ID);
      this.AddRuntimeMessageHandlers([
        ["get-initial-state", () => this._OnGetInitialState()],
        ["request-wake-lock", () => this._OnRequestWakeLock()],
        ["release-wake-lock", () => this._OnReleaseWakeLock()],
      ]);
      window.addEventListener("resize", () => this._OnResize());
      this._screenWakeLock = null;
    }
    _OnGetInitialState() {
      return {
        screenWidth: screen.width,
        screenHeight: screen.height,
        windowOuterWidth: window.outerWidth,
        windowOuterHeight: window.outerHeight,
        safeAreaInset: this._GetSafeAreaInset(),
        supportsWakeLock: !!navigator["wakeLock"],
      };
    }
    _GetSafeAreaInset() {
      const elem = document.body;
      const elemStyle = elem.style;
      elemStyle.setProperty("--temp-sai-top", "env(safe-area-inset-top)");
      elemStyle.setProperty("--temp-sai-right", "env(safe-area-inset-right)");
      elemStyle.setProperty("--temp-sai-bottom", "env(safe-area-inset-bottom)");
      elemStyle.setProperty("--temp-sai-left", "env(safe-area-inset-left)");
      const computedStyle = getComputedStyle(elem);
      const ret = [
        computedStyle.getPropertyValue("--temp-sai-top"),
        computedStyle.getPropertyValue("--temp-sai-right"),
        computedStyle.getPropertyValue("--temp-sai-bottom"),
        computedStyle.getPropertyValue("--temp-sai-left"),
      ].map((str) => {
        const n = parseInt(str, 10);
        return isFinite(n) ? n : 0;
      });
      elemStyle.removeProperty("--temp-sai-top");
      elemStyle.removeProperty("--temp-sai-right");
      elemStyle.removeProperty("--temp-sai-bottom");
      elemStyle.removeProperty("--temp-sai-left");
      return ret;
    }
    _OnResize() {
      this.PostToRuntime("window-resize", {
        windowOuterWidth: window.outerWidth,
        windowOuterHeight: window.outerHeight,
        safeAreaInset: this._GetSafeAreaInset(),
      });
    }
    async _OnRequestWakeLock() {
      if (this._screenWakeLock) return;
      try {
        this._screenWakeLock = await navigator["wakeLock"]["request"]("screen");
        this._screenWakeLock.addEventListener("release", () =>
          this._OnWakeLockReleased()
        );
        console.log("[Construct] Screen wake lock acquired");
        this.PostToRuntime("wake-lock-acquired");
      } catch (err) {
        console.warn("[Construct] Failed to acquire screen wake lock: ", err);
        this.PostToRuntime("wake-lock-error");
      }
    }
    _OnReleaseWakeLock() {
      if (!this._screenWakeLock) return;
      this._screenWakeLock["release"]();
      this._screenWakeLock = null;
    }
    _OnWakeLockReleased() {
      console.log("[Construct] Screen wake lock released");
      this._screenWakeLock = null;
      this.PostToRuntime("wake-lock-released");
    }
  };
  self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
("use strict");
{
  const DOM_COMPONENT_ID = "sliderbar";
  function StopPropagation(e) {
    e.stopPropagation();
  }
  const HANDLER_CLASS = class SliderBarDOMHandler extends self.DOMElementHandler {
    constructor(iRuntime) {
      super(iRuntime, DOM_COMPONENT_ID);
    }
    CreateElement(elementId, e) {
      const elem = document.createElement("input");
      elem.type = "range";
      elem.style.position = "absolute";
      elem.style.userSelect = "none";
      elem.style.webkitUserSelect = "none";
      elem.addEventListener("pointerdown", StopPropagation);
      elem.addEventListener("pointermove", StopPropagation);
      elem.addEventListener("pointerrawupdate", StopPropagation);
      elem.addEventListener("pointerup", StopPropagation);
      elem.addEventListener("mousedown", StopPropagation);
      elem.addEventListener("mouseup", StopPropagation);
      elem.addEventListener("keydown", StopPropagation);
      elem.addEventListener("keyup", StopPropagation);
      elem.addEventListener("click", () =>
        this._PostToRuntimeElementMaybeSync("click", elementId)
      );
      elem.addEventListener("change", () =>
        this.PostToRuntimeElement("change", elementId, {
          value: parseFloat(elem.value),
        })
      );
      elem.addEventListener("input", () =>
        this.PostToRuntimeElement("input", elementId, {
          value: parseFloat(elem.value),
        })
      );
      if (e["id"]) elem.id = e["id"];
      if (e["className"]) elem.className = e["className"];
      this.UpdateState(elem, e);
      return elem;
    }
    UpdateState(elem, e) {
      elem.max = e["max"];
      elem.min = e["min"];
      elem.step = e["step"];
      elem.value = e["value"];
      elem.disabled = !e["isEnabled"];
      elem.title = e["title"];
    }
  };
  self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
("use strict");
{
  const DOM_COMPONENT_ID = "touch";
  const HANDLER_CLASS = class TouchDOMHandler extends self.DOMHandler {
    constructor(iRuntime) {
      super(iRuntime, DOM_COMPONENT_ID);
      this.AddRuntimeMessageHandler("request-permission", (e) =>
        this._OnRequestPermission(e)
      );
    }
    async _OnRequestPermission(e) {
      const type = e["type"];
      let result = true;
      if (type === 0) result = await this._RequestOrientationPermission();
      else if (type === 1) result = await this._RequestMotionPermission();
      this.PostToRuntime("permission-result", { type: type, result: result });
    }
    async _RequestOrientationPermission() {
      if (
        !self["DeviceOrientationEvent"] ||
        !self["DeviceOrientationEvent"]["requestPermission"]
      )
        return true;
      try {
        const state = await self["DeviceOrientationEvent"][
          "requestPermission"
        ]();
        return state === "granted";
      } catch (err) {
        console.warn("[Touch] Failed to request orientation permission: ", err);
        return false;
      }
    }
    async _RequestMotionPermission() {
      if (
        !self["DeviceMotionEvent"] ||
        !self["DeviceMotionEvent"]["requestPermission"]
      )
        return true;
      try {
        const state = await self["DeviceMotionEvent"]["requestPermission"]();
        return state === "granted";
      } catch (err) {
        console.warn("[Touch] Failed to request motion permission: ", err);
        return false;
      }
    }
  };
  self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
("use strict");
{
  const R_TO_D = 180 / Math.PI;
  const DOM_COMPONENT_ID = "audio";
  self.AudioDOMHandler = class AudioDOMHandler extends self.DOMHandler {
    constructor(iRuntime) {
      super(iRuntime, DOM_COMPONENT_ID);
      this._audioContext = null;
      this._destinationNode = null;
      this._hasUnblocked = false;
      this._hasAttachedUnblockEvents = false;
      this._unblockFunc = () => this._UnblockAudioContext();
      this._audioBuffers = [];
      this._audioInstances = [];
      this._lastAudioInstance = null;
      this._lastPlayedTag = "";
      this._loadedAudioUrls = new Set();
      this._lastTickCount = -1;
      this._pendingTags = new Map();
      this._masterVolume = 1;
      this._isSilent = false;
      this._timeScaleMode = 0;
      this._timeScale = 1;
      this._gameTime = 0;
      this._panningModel = "HRTF";
      this._distanceModel = "inverse";
      this._refDistance = 600;
      this._maxDistance = 1e4;
      this._rolloffFactor = 1;
      this._lastListenerPos = [0, 0, 0];
      this._playMusicAsSound = false;
      this._hasAnySoftwareDecodedMusic = false;
      this._supportsWebMOpus = this._iRuntime.IsAudioFormatSupported(
        "audio/webm; codecs=opus"
      );
      this._effects = new Map();
      this._analysers = new Set();
      this._isPendingPostFxState = false;
      this._hasStartedOfflineRender = false;
      this._microphoneTag = "";
      this._microphoneSource = null;
      self["C3Audio_OnMicrophoneStream"] = (localMediaStream, tag) =>
        this._OnMicrophoneStream(localMediaStream, tag);
      this._destMediaStreamNode = null;
      self["C3Audio_GetOutputStream"] = () => this._OnGetOutputStream();
      self["C3Audio_DOMInterface"] = this;
      this.AddRuntimeMessageHandlers([
        ["create-audio-context", (e) => this._CreateAudioContext(e)],
        ["play", (e) => this._Play(e)],
        ["stop", (e) => this._Stop(e)],
        ["stop-all", () => this._StopAll()],
        ["set-paused", (e) => this._SetPaused(e)],
        ["set-volume", (e) => this._SetVolume(e)],
        ["fade-volume", (e) => this._FadeVolume(e)],
        ["set-master-volume", (e) => this._SetMasterVolume(e)],
        ["set-muted", (e) => this._SetMuted(e)],
        ["set-silent", (e) => this._SetSilent(e)],
        ["set-looping", (e) => this._SetLooping(e)],
        ["set-playback-rate", (e) => this._SetPlaybackRate(e)],
        ["set-stereo-pan", (e) => this._SetStereoPan(e)],
        ["seek", (e) => this._Seek(e)],
        ["preload", (e) => this._Preload(e)],
        ["unload", (e) => this._Unload(e)],
        ["unload-all", () => this._UnloadAll()],
        ["set-suspended", (e) => this._SetSuspended(e)],
        ["add-effect", (e) => this._AddEffect(e)],
        ["set-effect-param", (e) => this._SetEffectParam(e)],
        ["remove-effects", (e) => this._RemoveEffects(e)],
        ["tick", (e) => this._OnTick(e)],
        ["load-state", (e) => this._OnLoadState(e)],
        ["offline-render-audio", (e) => this._OnOfflineRenderAudio(e)],
        ["offline-render-finish", () => this._OnOfflineRenderFinish()],
      ]);
    }
    async _CreateAudioContext(e) {
      if (e["isiOSCordova"] || e["isSafari"]) this._playMusicAsSound = true;
      this._timeScaleMode = e["timeScaleMode"];
      this._panningModel = ["equalpower", "HRTF", "soundfield"][
        e["panningModel"]
      ];
      this._distanceModel = ["linear", "inverse", "exponential"][
        e["distanceModel"]
      ];
      this._refDistance = e["refDistance"];
      this._maxDistance = e["maxDistance"];
      this._rolloffFactor = e["rolloffFactor"];
      if (this._iRuntime.IsExportingToVideo()) {
        this._playMusicAsSound = true;
        const sampleRate = 48e3;
        this._audioContext = new OfflineAudioContext({
          numberOfChannels: 2,
          sampleRate: sampleRate,
          length: Math.ceil(
            this._iRuntime.GetExportToVideoDuration() * sampleRate
          ),
        });
      } else {
        const opts = { latencyHint: e["latencyHint"] };
        if (!this.SupportsWebMOpus()) opts["sampleRate"] = 48e3;
        if (typeof AudioContext !== "undefined")
          this._audioContext = new AudioContext(opts);
        else if (typeof webkitAudioContext !== "undefined")
          this._audioContext = new webkitAudioContext(opts);
        else throw new Error("Web Audio API not supported");
        this._AttachUnblockEvents();
        this._audioContext.onstatechange = () => {
          if (this._audioContext.state !== "running")
            this._AttachUnblockEvents();
          this.PostToRuntime("audiocontext-state", {
            audioContextState: this._audioContext.state,
          });
        };
      }
      this._destinationNode = this._audioContext["createGain"]();
      this._destinationNode["connect"](this._audioContext["destination"]);
      const listenerPos = e["listenerPos"];
      this._lastListenerPos[0] = listenerPos[0];
      this._lastListenerPos[1] = listenerPos[1];
      this._lastListenerPos[2] = listenerPos[2];
      this._audioContext["listener"]["setPosition"](
        listenerPos[0],
        listenerPos[1],
        listenerPos[2]
      );
      this._audioContext["listener"]["setOrientation"](0, 0, 1, 0, -1, 0);
      self["C3_GetAudioContextCurrentTime"] = () => this.GetAudioCurrentTime();
      try {
        await Promise.all(
          e["preloadList"].map((o) =>
            this._GetAudioBuffer(o["originalUrl"], o["url"], o["type"], false)
          )
        );
      } catch (err) {
        console.error("[Construct] Preloading sounds failed: ", err);
      }
      return {
        sampleRate: this._audioContext["sampleRate"],
        audioContextState: this._audioContext.state,
        outputLatency: this._audioContext["outputLatency"] || 0,
      };
    }
    _AttachUnblockEvents() {
      if (this._hasAttachedUnblockEvents) return;
      this._hasUnblocked = false;
      window.addEventListener("pointerup", this._unblockFunc, true);
      window.addEventListener("touchend", this._unblockFunc, true);
      window.addEventListener("click", this._unblockFunc, true);
      window.addEventListener("keydown", this._unblockFunc, true);
      this._hasAttachedUnblockEvents = true;
    }
    _DetachUnblockEvents() {
      if (!this._hasAttachedUnblockEvents) return;
      this._hasUnblocked = true;
      window.removeEventListener("pointerup", this._unblockFunc, true);
      window.removeEventListener("touchend", this._unblockFunc, true);
      window.removeEventListener("click", this._unblockFunc, true);
      window.removeEventListener("keydown", this._unblockFunc, true);
      this._hasAttachedUnblockEvents = false;
    }
    _UnblockAudioContext() {
      if (this._hasUnblocked) return;
      const audioContext = this._audioContext;
      if (audioContext["state"] === "suspended" && audioContext["resume"])
        audioContext["resume"]();
      const buffer = audioContext["createBuffer"](1, 220, 22050);
      const source = audioContext["createBufferSource"]();
      source["buffer"] = buffer;
      source["connect"](audioContext["destination"]);
      source["start"](0);
      if (audioContext["state"] === "running") this._DetachUnblockEvents();
    }
    GetAudioContext() {
      return this._audioContext;
    }
    GetAudioCurrentTime() {
      return this._audioContext["currentTime"];
    }
    GetDestinationNode() {
      return this._destinationNode;
    }
    GetDestinationForTag(tag) {
      const fxChain = this._effects.get(tag.toLowerCase());
      if (fxChain) return fxChain[0].GetInputNode();
      else return this.GetDestinationNode();
    }
    AddEffectForTag(tag, effect) {
      tag = tag.toLowerCase();
      let fxChain = this._effects.get(tag);
      if (!fxChain) {
        fxChain = [];
        this._effects.set(tag, fxChain);
      }
      effect._SetIndex(fxChain.length);
      effect._SetTag(tag);
      fxChain.push(effect);
      this._ReconnectEffects(tag);
    }
    _ReconnectEffects(tag) {
      let destNode = this.GetDestinationNode();
      const fxChain = this._effects.get(tag);
      if (fxChain && fxChain.length) {
        destNode = fxChain[0].GetInputNode();
        for (let i = 0, len = fxChain.length; i < len; ++i) {
          const n = fxChain[i];
          if (i + 1 === len) n.ConnectTo(this.GetDestinationNode());
          else n.ConnectTo(fxChain[i + 1].GetInputNode());
        }
      }
      for (const ai of this.audioInstancesByTag(tag)) ai.Reconnect(destNode);
      if (this._microphoneSource && this._microphoneTag === tag) {
        this._microphoneSource["disconnect"]();
        this._microphoneSource["connect"](destNode);
      }
    }
    GetMasterVolume() {
      return this._masterVolume;
    }
    IsSilent() {
      return this._isSilent;
    }
    GetTimeScaleMode() {
      return this._timeScaleMode;
    }
    GetTimeScale() {
      return this._timeScale;
    }
    GetGameTime() {
      return this._gameTime;
    }
    IsPlayMusicAsSound() {
      return this._playMusicAsSound;
    }
    SupportsWebMOpus() {
      return this._supportsWebMOpus;
    }
    _SetHasAnySoftwareDecodedMusic() {
      this._hasAnySoftwareDecodedMusic = true;
    }
    GetPanningModel() {
      return this._panningModel;
    }
    GetDistanceModel() {
      return this._distanceModel;
    }
    GetReferenceDistance() {
      return this._refDistance;
    }
    GetMaxDistance() {
      return this._maxDistance;
    }
    GetRolloffFactor() {
      return this._rolloffFactor;
    }
    DecodeAudioData(audioData, needsSoftwareDecode) {
      if (needsSoftwareDecode)
        return this._iRuntime
          ._WasmDecodeWebMOpus(audioData)
          .then((rawAudio) => {
            const audioBuffer = this._audioContext["createBuffer"](
              1,
              rawAudio.length,
              48e3
            );
            const channelBuffer = audioBuffer["getChannelData"](0);
            channelBuffer.set(rawAudio);
            return audioBuffer;
          });
      else
        return new Promise((resolve, reject) => {
          this._audioContext["decodeAudioData"](audioData, resolve, reject);
        });
    }
    TryPlayMedia(mediaElem) {
      this._iRuntime.TryPlayMedia(mediaElem);
    }
    RemovePendingPlay(mediaElem) {
      this._iRuntime.RemovePendingPlay(mediaElem);
    }
    ReleaseInstancesForBuffer(buffer) {
      let j = 0;
      for (let i = 0, len = this._audioInstances.length; i < len; ++i) {
        const a = this._audioInstances[i];
        this._audioInstances[j] = a;
        if (a.GetBuffer() === buffer) a.Release();
        else ++j;
      }
      this._audioInstances.length = j;
    }
    ReleaseAllMusicBuffers() {
      let j = 0;
      for (let i = 0, len = this._audioBuffers.length; i < len; ++i) {
        const b = this._audioBuffers[i];
        this._audioBuffers[j] = b;
        if (b.IsMusic()) b.Release();
        else ++j;
      }
      this._audioBuffers.length = j;
    }
    *audioInstancesByTag(tag) {
      if (tag)
        for (const ai of this._audioInstances) {
          if (self.AudioDOMHandler.EqualsNoCase(ai.GetTag(), tag)) yield ai;
        }
      else if (this._lastAudioInstance && !this._lastAudioInstance.HasEnded())
        yield this._lastAudioInstance;
    }
    async _GetAudioBuffer(originalUrl, url, type, isMusic, dontCreate) {
      for (const ab of this._audioBuffers)
        if (ab.GetUrl() === url) {
          await ab.Load();
          return ab;
        }
      if (dontCreate) return null;
      if (
        isMusic &&
        (this._playMusicAsSound || this._hasAnySoftwareDecodedMusic)
      )
        this.ReleaseAllMusicBuffers();
      const ret = self.C3AudioBuffer.Create(
        this,
        originalUrl,
        url,
        type,
        isMusic
      );
      this._audioBuffers.push(ret);
      await ret.Load();
      if (!this._loadedAudioUrls.has(originalUrl)) {
        this.PostToRuntime("buffer-metadata", {
          originalUrl: originalUrl,
          duration: ret.GetDuration(),
        });
        this._loadedAudioUrls.add(originalUrl);
      }
      return ret;
    }
    async _GetAudioInstance(originalUrl, url, type, tag, isMusic) {
      for (const ai of this._audioInstances)
        if (ai.GetUrl() === url && (ai.CanBeRecycled() || isMusic)) {
          ai.SetTag(tag);
          return ai;
        }
      const buffer = await this._GetAudioBuffer(
        originalUrl,
        url,
        type,
        isMusic
      );
      const ret = buffer.CreateInstance(tag);
      this._audioInstances.push(ret);
      return ret;
    }
    _AddPendingTag(tag) {
      let info = this._pendingTags.get(tag);
      if (!info) {
        let resolve = null;
        const promise = new Promise((r) => (resolve = r));
        info = { pendingCount: 0, promise, resolve };
        this._pendingTags.set(tag, info);
      }
      info.pendingCount++;
    }
    _RemovePendingTag(tag) {
      const info = this._pendingTags.get(tag);
      if (!info) throw new Error("expected pending tag");
      info.pendingCount--;
      if (info.pendingCount === 0) {
        info.resolve();
        this._pendingTags.delete(tag);
      }
    }
    TagReady(tag) {
      if (!tag) tag = this._lastPlayedTag;
      const info = this._pendingTags.get(tag);
      if (info) return info.promise;
      else return Promise.resolve();
    }
    _MaybeStartTicking() {
      if (this._analysers.size > 0) {
        this._StartTicking();
        return;
      }
      for (const ai of this._audioInstances)
        if (ai.IsActive()) {
          this._StartTicking();
          return;
        }
    }
    Tick() {
      for (const a of this._analysers) a.Tick();
      const currentTime = this.GetAudioCurrentTime();
      for (const ai of this._audioInstances) ai.Tick(currentTime);
      const instStates = this._audioInstances
        .filter((a) => a.IsActive())
        .map((a) => a.GetState());
      this.PostToRuntime("state", {
        tickCount: this._lastTickCount,
        outputLatency: this._audioContext["outputLatency"] || 0,
        audioInstances: instStates,
        analysers: [...this._analysers].map((a) => a.GetData()),
      });
      if (instStates.length === 0 && this._analysers.size === 0)
        this._StopTicking();
    }
    PostTrigger(type, tag, aiid) {
      this.PostToRuntime("trigger", { type: type, tag: tag, aiid: aiid });
    }
    async _Play(e) {
      const originalUrl = e["originalUrl"];
      const url = e["url"];
      const type = e["type"];
      const isMusic = e["isMusic"];
      const tag = e["tag"];
      const isLooping = e["isLooping"];
      const volume = e["vol"];
      const position = e["pos"];
      const panning = e["panning"];
      const stereoPan = e["stereoPan"];
      let startTime = e["off"];
      if (startTime > 0 && !e["trueClock"])
        if (this._audioContext["getOutputTimestamp"]) {
          const outputTimestamp = this._audioContext["getOutputTimestamp"]();
          startTime =
            startTime -
            outputTimestamp["performanceTime"] / 1e3 +
            outputTimestamp["contextTime"];
        } else
          startTime =
            startTime -
            performance.now() / 1e3 +
            this._audioContext["currentTime"];
      this._lastPlayedTag = tag;
      this._AddPendingTag(tag);
      try {
        this._lastAudioInstance = await this._GetAudioInstance(
          originalUrl,
          url,
          type,
          tag,
          isMusic
        );
        if (panning) {
          this._lastAudioInstance.SetPannerEnabled(true);
          this._lastAudioInstance.SetPan(
            panning["x"],
            panning["y"],
            panning["angle"],
            panning["innerAngle"],
            panning["outerAngle"],
            panning["outerGain"]
          );
          if (panning.hasOwnProperty("uid"))
            this._lastAudioInstance.SetUID(panning["uid"]);
        } else if (typeof stereoPan === "number" && stereoPan !== 0) {
          this._lastAudioInstance.SetStereoPannerEnabled(true);
          this._lastAudioInstance.SetStereoPan(stereoPan);
        } else {
          this._lastAudioInstance.SetPannerEnabled(false);
          this._lastAudioInstance.SetStereoPannerEnabled(false);
        }
        this._lastAudioInstance.Play(isLooping, volume, position, startTime);
      } catch (err) {
        console.error("[Construct] Audio: error starting playback: ", err);
        return;
      } finally {
        this._RemovePendingTag(tag);
      }
      this._StartTicking();
    }
    _Stop(e) {
      const tag = e["tag"];
      for (const ai of this.audioInstancesByTag(tag)) ai.Stop();
    }
    _StopAll() {
      for (const ai of this._audioInstances) ai.Stop();
    }
    _SetPaused(e) {
      const tag = e["tag"];
      const paused = e["paused"];
      for (const ai of this.audioInstancesByTag(tag))
        if (paused) ai.Pause();
        else ai.Resume();
      this._MaybeStartTicking();
    }
    _SetVolume(e) {
      const tag = e["tag"];
      const vol = e["vol"];
      for (const ai of this.audioInstancesByTag(tag)) ai.SetVolume(vol);
    }
    _SetStereoPan(e) {
      const tag = e["tag"];
      const p = e["p"];
      for (const ai of this.audioInstancesByTag(tag)) {
        ai.SetStereoPannerEnabled(true);
        ai.SetStereoPan(p);
      }
    }
    async _FadeVolume(e) {
      const tag = e["tag"];
      const vol = e["vol"];
      const duration = e["duration"];
      const stopOnEnd = e["stopOnEnd"];
      await this.TagReady(tag);
      for (const ai of this.audioInstancesByTag(tag))
        ai.FadeVolume(vol, duration, stopOnEnd);
      this._MaybeStartTicking();
    }
    _SetMasterVolume(e) {
      this._masterVolume = e["vol"];
      this._destinationNode["gain"]["value"] = this._masterVolume;
    }
    _SetMuted(e) {
      const tag = e["tag"];
      const isMuted = e["isMuted"];
      for (const ai of this.audioInstancesByTag(tag)) ai.SetMuted(isMuted);
    }
    _SetSilent(e) {
      this._isSilent = e["isSilent"];
      this._iRuntime.SetSilent(this._isSilent);
      for (const ai of this._audioInstances) ai._UpdateMuted();
    }
    _SetLooping(e) {
      const tag = e["tag"];
      const isLooping = e["isLooping"];
      for (const ai of this.audioInstancesByTag(tag)) ai.SetLooping(isLooping);
    }
    async _SetPlaybackRate(e) {
      const tag = e["tag"];
      const rate = e["rate"];
      await this.TagReady(tag);
      for (const ai of this.audioInstancesByTag(tag)) ai.SetPlaybackRate(rate);
    }
    async _Seek(e) {
      const tag = e["tag"];
      const pos = e["pos"];
      await this.TagReady(tag);
      for (const ai of this.audioInstancesByTag(tag)) ai.Seek(pos);
    }
    async _Preload(e) {
      const originalUrl = e["originalUrl"];
      const url = e["url"];
      const type = e["type"];
      const isMusic = e["isMusic"];
      try {
        await this._GetAudioInstance(originalUrl, url, type, "", isMusic);
      } catch (err) {
        console.error("[Construct] Audio: error preloading: ", err);
      }
    }
    async _Unload(e) {
      const url = e["url"];
      const type = e["type"];
      const isMusic = e["isMusic"];
      const buffer = await this._GetAudioBuffer("", url, type, isMusic, true);
      if (!buffer) return;
      buffer.Release();
      const i = this._audioBuffers.indexOf(buffer);
      if (i !== -1) this._audioBuffers.splice(i, 1);
    }
    _UnloadAll() {
      for (const buffer of this._audioBuffers) buffer.Release();
      this._audioBuffers.length = 0;
    }
    _SetSuspended(e) {
      const isSuspended = e["isSuspended"];
      if (!isSuspended && this._audioContext["resume"])
        this._audioContext["resume"]();
      for (const ai of this._audioInstances) ai.SetSuspended(isSuspended);
      if (isSuspended && this._audioContext["suspend"])
        this._audioContext["suspend"]();
    }
    _OnTick(e) {
      this._timeScale = e["timeScale"];
      this._gameTime = e["gameTime"];
      this._lastTickCount = e["tickCount"];
      if (this._timeScaleMode !== 0)
        for (const ai of this._audioInstances) ai._UpdatePlaybackRate();
      const listenerPos = e["listenerPos"];
      if (
        listenerPos &&
        (this._lastListenerPos[0] !== listenerPos[0] ||
          this._lastListenerPos[1] !== listenerPos[1] ||
          this._lastListenerPos[2] !== listenerPos[2])
      ) {
        this._lastListenerPos[0] = listenerPos[0];
        this._lastListenerPos[1] = listenerPos[1];
        this._lastListenerPos[2] = listenerPos[2];
        this._audioContext["listener"]["setPosition"](
          listenerPos[0],
          listenerPos[1],
          listenerPos[2]
        );
      }
      for (const instPan of e["instPans"]) {
        const uid = instPan["uid"];
        for (const ai of this._audioInstances)
          if (ai.GetUID() === uid)
            ai.SetPanXYA(instPan["x"], instPan["y"], instPan["angle"]);
      }
    }
    async _AddEffect(e) {
      const type = e["type"];
      const tag = e["tag"];
      const params = e["params"];
      let effect;
      if (type === "filter") effect = new self.C3AudioFilterFX(this, ...params);
      else if (type === "delay")
        effect = new self.C3AudioDelayFX(this, ...params);
      else if (type === "convolution") {
        let buffer = null;
        try {
          buffer = await this._GetAudioBuffer(
            e["bufferOriginalUrl"],
            e["bufferUrl"],
            e["bufferType"],
            false
          );
        } catch (err) {
          console.log("[Construct] Audio: error loading convolution: ", err);
          return;
        }
        effect = new self.C3AudioConvolveFX(
          this,
          buffer.GetAudioBuffer(),
          ...params
        );
        effect._SetBufferInfo(
          e["bufferOriginalUrl"],
          e["bufferUrl"],
          e["bufferType"]
        );
      } else if (type === "flanger")
        effect = new self.C3AudioFlangerFX(this, ...params);
      else if (type === "phaser")
        effect = new self.C3AudioPhaserFX(this, ...params);
      else if (type === "gain")
        effect = new self.C3AudioGainFX(this, ...params);
      else if (type === "stereopan")
        effect = new self.C3AudioStereoPanFX(this, ...params);
      else if (type === "tremolo")
        effect = new self.C3AudioTremoloFX(this, ...params);
      else if (type === "ringmod")
        effect = new self.C3AudioRingModFX(this, ...params);
      else if (type === "distortion")
        effect = new self.C3AudioDistortionFX(this, ...params);
      else if (type === "compressor")
        effect = new self.C3AudioCompressorFX(this, ...params);
      else if (type === "analyser")
        effect = new self.C3AudioAnalyserFX(this, ...params);
      else throw new Error("invalid effect type");
      this.AddEffectForTag(tag, effect);
      this._PostUpdatedFxState();
    }
    _SetEffectParam(e) {
      const tag = e["tag"];
      const index = e["index"];
      const param = e["param"];
      const value = e["value"];
      const ramp = e["ramp"];
      const time = e["time"];
      const fxChain = this._effects.get(tag);
      if (!fxChain || index < 0 || index >= fxChain.length) return;
      fxChain[index].SetParam(param, value, ramp, time);
      this._PostUpdatedFxState();
    }
    _RemoveEffects(e) {
      const tag = e["tag"].toLowerCase();
      const fxChain = this._effects.get(tag);
      if (!fxChain || !fxChain.length) return;
      for (const effect of fxChain) effect.Release();
      this._effects.delete(tag);
      this._ReconnectEffects(tag);
    }
    _AddAnalyser(analyser) {
      this._analysers.add(analyser);
      this._MaybeStartTicking();
    }
    _RemoveAnalyser(analyser) {
      this._analysers.delete(analyser);
    }
    _PostUpdatedFxState() {
      if (this._isPendingPostFxState) return;
      this._isPendingPostFxState = true;
      Promise.resolve().then(() => this._DoPostUpdatedFxState());
    }
    _DoPostUpdatedFxState() {
      const fxstate = {};
      for (const [tag, fxChain] of this._effects)
        fxstate[tag] = fxChain.map((e) => e.GetState());
      this.PostToRuntime("fxstate", { fxstate: fxstate });
      this._isPendingPostFxState = false;
    }
    async _OnLoadState(e) {
      const saveLoadMode = e["saveLoadMode"];
      if (saveLoadMode !== 3) {
        const keepAudioInstances = [];
        for (const ai of this._audioInstances)
          if (
            (ai.IsMusic() && saveLoadMode === 1) ||
            (!ai.IsMusic() && saveLoadMode === 2)
          )
            keepAudioInstances.push(ai);
          else ai.Release();
        this._audioInstances = keepAudioInstances;
      }
      for (const fxChain of this._effects.values())
        for (const effect of fxChain) effect.Release();
      this._effects.clear();
      this._timeScale = e["timeScale"];
      this._gameTime = e["gameTime"];
      const listenerPos = e["listenerPos"];
      this._lastListenerPos[0] = listenerPos[0];
      this._lastListenerPos[1] = listenerPos[1];
      this._lastListenerPos[2] = listenerPos[2];
      this._audioContext["listener"]["setPosition"](
        listenerPos[0],
        listenerPos[1],
        listenerPos[2]
      );
      this._isSilent = e["isSilent"];
      this._iRuntime.SetSilent(this._isSilent);
      this._masterVolume = e["masterVolume"];
      this._destinationNode["gain"]["value"] = this._masterVolume;
      const promises = [];
      for (const fxChainData of Object.values(e["effects"]))
        promises.push(Promise.all(fxChainData.map((d) => this._AddEffect(d))));
      await Promise.all(promises);
      await Promise.all(
        e["playing"].map((d) => this._LoadAudioInstance(d, saveLoadMode))
      );
      this._MaybeStartTicking();
    }
    async _LoadAudioInstance(d, saveLoadMode) {
      if (saveLoadMode === 3) return;
      const originalUrl = d["bufferOriginalUrl"];
      const url = d["bufferUrl"];
      const type = d["bufferType"];
      const isMusic = d["isMusic"];
      const tag = d["tag"];
      const isLooping = d["isLooping"];
      const volume = d["volume"];
      const position = d["playbackTime"];
      if (isMusic && saveLoadMode === 1) return;
      if (!isMusic && saveLoadMode === 2) return;
      let ai = null;
      try {
        ai = await this._GetAudioInstance(originalUrl, url, type, tag, isMusic);
      } catch (err) {
        console.error("[Construct] Audio: error loading audio state: ", err);
        return;
      }
      ai.LoadPanState(d["pan"]);
      ai.LoadStereoPanState(d["stereoPan"]);
      ai.Play(isLooping, volume, position, 0);
      if (!d["isPlaying"]) ai.Pause();
      ai._LoadAdditionalState(d);
    }
    _OnMicrophoneStream(localMediaStream, tag) {
      if (this._microphoneSource) this._microphoneSource["disconnect"]();
      this._microphoneTag = tag.toLowerCase();
      this._microphoneSource =
        this._audioContext["createMediaStreamSource"](localMediaStream);
      this._microphoneSource["connect"](
        this.GetDestinationForTag(this._microphoneTag)
      );
    }
    _OnGetOutputStream() {
      if (!this._destMediaStreamNode) {
        this._destMediaStreamNode =
          this._audioContext["createMediaStreamDestination"]();
        this._destinationNode["connect"](this._destMediaStreamNode);
      }
      return this._destMediaStreamNode["stream"];
    }
    async _OnOfflineRenderAudio(e) {
      try {
        const time = e["time"];
        const suspendPromise = this._audioContext["suspend"](time);
        if (!this._hasStartedOfflineRender) {
          this._audioContext["startRendering"]()
            .then((buffer) => this._OnOfflineRenderCompleted(buffer))
            .catch((err) => this._OnOfflineRenderError(err));
          this._hasStartedOfflineRender = true;
        } else this._audioContext["resume"]();
        await suspendPromise;
      } catch (err) {
        this._OnOfflineRenderError(err);
      }
    }
    _OnOfflineRenderFinish() {
      this._audioContext["resume"]();
    }
    _OnOfflineRenderCompleted(buffer) {
      const channelArrayBuffers = [];
      for (let i = 0, len = buffer["numberOfChannels"]; i < len; ++i) {
        const f32arr = buffer["getChannelData"](i);
        channelArrayBuffers.push(f32arr.buffer);
      }
      this._iRuntime.PostToRuntimeComponent(
        "runtime",
        "offline-audio-render-completed",
        {
          duration: buffer["duration"],
          length: buffer["length"],
          numberOfChannels: buffer["numberOfChannels"],
          sampleRate: buffer["sampleRate"],
          channelData: channelArrayBuffers,
        },
        null,
        channelArrayBuffers
      );
    }
    _OnOfflineRenderError(err) {
      console.error(`[Audio] Offline rendering error: `, err);
    }
    static EqualsNoCase(a, b) {
      if (a.length !== b.length) return false;
      if (a === b) return true;
      return a.toLowerCase() === b.toLowerCase();
    }
    static ToDegrees(x) {
      return x * R_TO_D;
    }
    static DbToLinearNoCap(x) {
      return Math.pow(10, x / 20);
    }
    static DbToLinear(x) {
      return Math.max(Math.min(self.AudioDOMHandler.DbToLinearNoCap(x), 1), 0);
    }
    static LinearToDbNoCap(x) {
      return (Math.log(x) / Math.log(10)) * 20;
    }
    static LinearToDb(x) {
      return self.AudioDOMHandler.LinearToDbNoCap(Math.max(Math.min(x, 1), 0));
    }
    static e4(x, k) {
      return 1 - Math.exp(-k * x);
    }
  };
  self.RuntimeInterface.AddDOMHandlerClass(self.AudioDOMHandler);
}
("use strict");
{
  self.C3AudioBuffer = class C3AudioBuffer {
    constructor(audioDomHandler, originalUrl, url, type, isMusic) {
      this._audioDomHandler = audioDomHandler;
      this._originalUrl = originalUrl;
      this._url = url;
      this._type = type;
      this._isMusic = isMusic;
      this._api = "";
      this._loadState = "not-loaded";
      this._loadPromise = null;
    }
    Release() {
      this._loadState = "not-loaded";
      this._audioDomHandler = null;
      this._loadPromise = null;
    }
    static Create(audioDomHandler, originalUrl, url, type, isMusic) {
      const needsSoftwareDecode =
        type === "audio/webm; codecs=opus" &&
        !audioDomHandler.SupportsWebMOpus();
      if (isMusic && needsSoftwareDecode)
        audioDomHandler._SetHasAnySoftwareDecodedMusic();
      if (
        !isMusic ||
        audioDomHandler.IsPlayMusicAsSound() ||
        needsSoftwareDecode
      )
        return new self.C3WebAudioBuffer(
          audioDomHandler,
          originalUrl,
          url,
          type,
          isMusic,
          needsSoftwareDecode
        );
      else
        return new self.C3Html5AudioBuffer(
          audioDomHandler,
          originalUrl,
          url,
          type,
          isMusic
        );
    }
    CreateInstance(tag) {
      if (this._api === "html5")
        return new self.C3Html5AudioInstance(this._audioDomHandler, this, tag);
      else return new self.C3WebAudioInstance(this._audioDomHandler, this, tag);
    }
    _Load() {}
    Load() {
      if (!this._loadPromise) this._loadPromise = this._Load();
      return this._loadPromise;
    }
    IsLoaded() {}
    IsLoadedAndDecoded() {}
    HasFailedToLoad() {
      return this._loadState === "failed";
    }
    GetAudioContext() {
      return this._audioDomHandler.GetAudioContext();
    }
    GetApi() {
      return this._api;
    }
    GetOriginalUrl() {
      return this._originalUrl;
    }
    GetUrl() {
      return this._url;
    }
    GetContentType() {
      return this._type;
    }
    IsMusic() {
      return this._isMusic;
    }
    GetDuration() {}
  };
}
("use strict");
{
  self.C3Html5AudioBuffer = class C3Html5AudioBuffer extends (
    self.C3AudioBuffer
  ) {
    constructor(audioDomHandler, originalUrl, url, type, isMusic) {
      super(audioDomHandler, originalUrl, url, type, isMusic);
      this._api = "html5";
      this._audioElem = new Audio();
      this._audioElem.crossOrigin = "anonymous";
      this._audioElem.autoplay = false;
      this._audioElem.preload = "auto";
      this._loadResolve = null;
      this._loadReject = null;
      this._reachedCanPlayThrough = false;
      this._audioElem.addEventListener(
        "canplaythrough",
        () => (this._reachedCanPlayThrough = true)
      );
      this._outNode = this.GetAudioContext()["createGain"]();
      this._mediaSourceNode = null;
      this._audioElem.addEventListener("canplay", () => {
        if (this._loadResolve) {
          this._loadState = "loaded";
          this._loadResolve();
          this._loadResolve = null;
          this._loadReject = null;
        }
        if (this._mediaSourceNode || !this._audioElem) return;
        this._mediaSourceNode = this.GetAudioContext()[
          "createMediaElementSource"
        ](this._audioElem);
        this._mediaSourceNode["connect"](this._outNode);
      });
      this.onended = null;
      this._audioElem.addEventListener("ended", () => {
        if (this.onended) this.onended();
      });
      this._audioElem.addEventListener("error", (e) => this._OnError(e));
    }
    Release() {
      this._audioDomHandler.ReleaseInstancesForBuffer(this);
      this._outNode["disconnect"]();
      this._outNode = null;
      this._mediaSourceNode["disconnect"]();
      this._mediaSourceNode = null;
      if (this._audioElem && !this._audioElem.paused) this._audioElem.pause();
      this.onended = null;
      this._audioElem = null;
      super.Release();
    }
    _Load() {
      this._loadState = "loading";
      return new Promise((resolve, reject) => {
        this._loadResolve = resolve;
        this._loadReject = reject;
        this._audioElem.src = this._url;
      });
    }
    _OnError(e) {
      console.error(`[Construct] Audio '${this._url}' error: `, e);
      if (this._loadReject) {
        this._loadState = "failed";
        this._loadReject(e);
        this._loadResolve = null;
        this._loadReject = null;
      }
    }
    IsLoaded() {
      const ret = this._audioElem["readyState"] >= 4;
      if (ret) this._reachedCanPlayThrough = true;
      return ret || this._reachedCanPlayThrough;
    }
    IsLoadedAndDecoded() {
      return this.IsLoaded();
    }
    GetAudioElement() {
      return this._audioElem;
    }
    GetOutputNode() {
      return this._outNode;
    }
    GetDuration() {
      return this._audioElem["duration"];
    }
  };
}
("use strict");
{
  self.C3WebAudioBuffer = class C3WebAudioBuffer extends self.C3AudioBuffer {
    constructor(
      audioDomHandler,
      originalUrl,
      url,
      type,
      isMusic,
      needsSoftwareDecode
    ) {
      super(audioDomHandler, originalUrl, url, type, isMusic);
      this._api = "webaudio";
      this._audioData = null;
      this._audioBuffer = null;
      this._needsSoftwareDecode = !!needsSoftwareDecode;
    }
    Release() {
      this._audioDomHandler.ReleaseInstancesForBuffer(this);
      this._audioData = null;
      this._audioBuffer = null;
      super.Release();
    }
    async _Fetch() {
      if (this._audioData) return this._audioData;
      const iRuntime = this._audioDomHandler.GetRuntimeInterface();
      if (
        iRuntime.GetExportType() === "cordova" &&
        iRuntime.IsRelativeURL(this._url) &&
        iRuntime.IsFileProtocol()
      )
        this._audioData = await iRuntime.CordovaFetchLocalFileAsArrayBuffer(
          this._url
        );
      else {
        const response = await fetch(this._url);
        if (!response.ok)
          throw new Error(
            `error fetching audio data: ${response.status} ${response.statusText}`
          );
        this._audioData = await response.arrayBuffer();
      }
    }
    async _Decode() {
      if (this._audioBuffer) return this._audioBuffer;
      this._audioBuffer = await this._audioDomHandler.DecodeAudioData(
        this._audioData,
        this._needsSoftwareDecode
      );
      this._audioData = null;
    }
    async _Load() {
      try {
        this._loadState = "loading";
        await this._Fetch();
        await this._Decode();
        this._loadState = "loaded";
      } catch (err) {
        this._loadState = "failed";
        console.error(`[Construct] Failed to load audio '${this._url}': `, err);
      }
    }
    IsLoaded() {
      return !!(this._audioData || this._audioBuffer);
    }
    IsLoadedAndDecoded() {
      return !!this._audioBuffer;
    }
    GetAudioBuffer() {
      return this._audioBuffer;
    }
    GetDuration() {
      return this._audioBuffer ? this._audioBuffer["duration"] : 0;
    }
  };
}
("use strict");
{
  let nextAiId = 0;
  self.C3AudioInstance = class C3AudioInstance {
    constructor(audioDomHandler, buffer, tag) {
      this._audioDomHandler = audioDomHandler;
      this._buffer = buffer;
      this._tag = tag;
      this._aiId = nextAiId++;
      this._gainNode = this.GetAudioContext()["createGain"]();
      this._gainNode["connect"](this.GetDestinationNode());
      this._pannerNode = null;
      this._isPannerEnabled = false;
      this._pannerPosition = [0, 0, 0];
      this._pannerOrientation = [0, 0, 0];
      this._pannerConeParams = [0, 0, 0];
      this._stereoPannerNode = null;
      this._isStereoPannerEnabled = false;
      this._stereoPan = 0;
      this._isStopped = true;
      this._isPaused = false;
      this._resumeMe = false;
      this._isLooping = false;
      this._volume = 1;
      this._isMuted = false;
      this._playbackRate = 1;
      const timeScaleMode = this._audioDomHandler.GetTimeScaleMode();
      this._isTimescaled =
        (timeScaleMode === 1 && !this.IsMusic()) || timeScaleMode === 2;
      this._instUid = -1;
      this._fadeEndTime = -1;
      this._stopOnFadeEnd = false;
    }
    Release() {
      this._audioDomHandler = null;
      this._buffer = null;
      if (this._pannerNode) {
        this._pannerNode["disconnect"]();
        this._pannerNode = null;
      }
      if (this._stereoPannerNode) {
        this._stereoPannerNode["disconnect"]();
        this._stereoPannerNode = null;
      }
      this._gainNode["disconnect"]();
      this._gainNode = null;
    }
    GetAudioContext() {
      return this._audioDomHandler.GetAudioContext();
    }
    GetDestinationNode() {
      return this._audioDomHandler.GetDestinationForTag(this._tag);
    }
    GetCurrentTime() {
      if (this._isTimescaled) return this._audioDomHandler.GetGameTime();
      else return performance.now() / 1e3;
    }
    GetOriginalUrl() {
      return this._buffer.GetOriginalUrl();
    }
    GetUrl() {
      return this._buffer.GetUrl();
    }
    GetContentType() {
      return this._buffer.GetContentType();
    }
    GetBuffer() {
      return this._buffer;
    }
    IsMusic() {
      return this._buffer.IsMusic();
    }
    SetTag(tag) {
      this._tag = tag;
    }
    GetTag() {
      return this._tag;
    }
    GetAiId() {
      return this._aiId;
    }
    HasEnded() {}
    CanBeRecycled() {}
    IsPlaying() {
      return !this._isStopped && !this._isPaused && !this.HasEnded();
    }
    IsActive() {
      return !this._isStopped && !this.HasEnded();
    }
    GetPlaybackTime() {}
    GetDuration(applyPlaybackRate) {
      let ret = this._buffer.GetDuration();
      if (applyPlaybackRate) ret /= this._playbackRate || 0.001;
      return ret;
    }
    Play(isLooping, vol, seekPos, scheduledTime) {}
    Stop() {}
    Pause() {}
    IsPaused() {
      return this._isPaused;
    }
    Resume() {}
    SetVolume(v) {
      this._volume = v;
      this._gainNode["gain"]["cancelScheduledValues"](0);
      this._fadeEndTime = -1;
      this._gainNode["gain"]["value"] = this.GetOutputVolume();
    }
    FadeVolume(vol, duration, stopOnEnd) {
      if (this.IsMuted()) return;
      const gainParam = this._gainNode["gain"];
      gainParam["cancelScheduledValues"](0);
      const currentTime = this._audioDomHandler.GetAudioCurrentTime();
      const endTime = currentTime + duration;
      gainParam["setValueAtTime"](gainParam["value"], currentTime);
      gainParam["linearRampToValueAtTime"](vol, endTime);
      this._volume = vol;
      this._fadeEndTime = endTime;
      this._stopOnFadeEnd = stopOnEnd;
    }
    _UpdateVolume() {
      this.SetVolume(this._volume);
    }
    Tick(currentTime) {
      if (this._fadeEndTime !== -1 && currentTime >= this._fadeEndTime) {
        this._fadeEndTime = -1;
        if (this._stopOnFadeEnd) this.Stop();
        this._audioDomHandler.PostTrigger("fade-ended", this._tag, this._aiId);
      }
    }
    GetOutputVolume() {
      const ret = this._volume;
      return isFinite(ret) ? ret : 0;
    }
    SetMuted(m) {
      m = !!m;
      if (this._isMuted === m) return;
      this._isMuted = m;
      this._UpdateMuted();
    }
    IsMuted() {
      return this._isMuted;
    }
    IsSilent() {
      return this._audioDomHandler.IsSilent();
    }
    _UpdateMuted() {}
    SetLooping(l) {}
    IsLooping() {
      return this._isLooping;
    }
    SetPlaybackRate(r) {
      if (this._playbackRate === r) return;
      this._playbackRate = r;
      this._UpdatePlaybackRate();
    }
    _UpdatePlaybackRate() {}
    GetPlaybackRate() {
      return this._playbackRate;
    }
    Seek(pos) {}
    SetSuspended(s) {}
    SetPannerEnabled(e) {
      e = !!e;
      if (this._isPannerEnabled === e) return;
      this._isPannerEnabled = e;
      if (this._isPannerEnabled) {
        this.SetStereoPannerEnabled(false);
        if (!this._pannerNode) {
          this._pannerNode = this.GetAudioContext()["createPanner"]();
          this._pannerNode["panningModel"] =
            this._audioDomHandler.GetPanningModel();
          this._pannerNode["distanceModel"] =
            this._audioDomHandler.GetDistanceModel();
          this._pannerNode["refDistance"] =
            this._audioDomHandler.GetReferenceDistance();
          this._pannerNode["maxDistance"] =
            this._audioDomHandler.GetMaxDistance();
          this._pannerNode["rolloffFactor"] =
            this._audioDomHandler.GetRolloffFactor();
        }
        this._gainNode["disconnect"]();
        this._gainNode["connect"](this._pannerNode);
        this._pannerNode["connect"](this.GetDestinationNode());
      } else {
        this._pannerNode["disconnect"]();
        this._gainNode["disconnect"]();
        this._gainNode["connect"](this.GetDestinationNode());
      }
    }
    SetPan(x, y, angle, innerAngle, outerAngle, outerGain) {
      if (!this._isPannerEnabled) return;
      this.SetPanXYA(x, y, angle);
      const toDegrees = self.AudioDOMHandler.ToDegrees;
      if (this._pannerConeParams[0] !== toDegrees(innerAngle)) {
        this._pannerConeParams[0] = toDegrees(innerAngle);
        this._pannerNode["coneInnerAngle"] = toDegrees(innerAngle);
      }
      if (this._pannerConeParams[1] !== toDegrees(outerAngle)) {
        this._pannerConeParams[1] = toDegrees(outerAngle);
        this._pannerNode["coneOuterAngle"] = toDegrees(outerAngle);
      }
      if (this._pannerConeParams[2] !== outerGain) {
        this._pannerConeParams[2] = outerGain;
        this._pannerNode["coneOuterGain"] = outerGain;
      }
    }
    SetPanXYA(x, y, angle) {
      if (!this._isPannerEnabled) return;
      const pos = this._pannerPosition;
      const orient = this._pannerOrientation;
      const cosa = Math.cos(angle);
      const sina = Math.sin(angle);
      if (pos[0] !== x || pos[1] !== y || pos[2] !== 0) {
        pos[0] = x;
        pos[1] = y;
        pos[2] = 0;
        this._pannerNode["setPosition"](...pos);
      }
      if (orient[0] !== cosa || orient[1] !== sina || orient[2] !== 0) {
        orient[0] = cosa;
        orient[1] = sina;
        orient[2] = 0;
        this._pannerNode["setOrientation"](...orient);
      }
    }
    SetStereoPannerEnabled(e) {
      e = !!e;
      if (this._isStereoPannerEnabled === e) return;
      this._isStereoPannerEnabled = e;
      if (this._isStereoPannerEnabled) {
        this.SetPannerEnabled(false);
        this._stereoPannerNode = this.GetAudioContext()["createStereoPanner"]();
        this._gainNode["disconnect"]();
        this._gainNode["connect"](this._stereoPannerNode);
        this._stereoPannerNode["connect"](this.GetDestinationNode());
      } else {
        this._stereoPannerNode["disconnect"]();
        this._stereoPannerNode = null;
        this._gainNode["disconnect"]();
        this._gainNode["connect"](this.GetDestinationNode());
      }
    }
    SetStereoPan(p) {
      if (!this._isStereoPannerEnabled) return;
      if (this._stereoPan === p) return;
      this._stereoPannerNode["pan"]["value"] = p;
      this._stereoPan = p;
    }
    SetUID(uid) {
      this._instUid = uid;
    }
    GetUID() {
      return this._instUid;
    }
    GetResumePosition() {}
    Reconnect(toNode) {
      const outNode =
        this._stereoPannerNode || this._pannerNode || this._gainNode;
      outNode["disconnect"]();
      outNode["connect"](toNode);
    }
    GetState() {
      return {
        aiid: this.GetAiId(),
        tag: this._tag,
        duration: this.GetDuration(),
        volume: this._volume,
        isPlaying: this.IsPlaying(),
        playbackTime: this.GetPlaybackTime(),
        playbackRate: this.GetPlaybackRate(),
        uid: this._instUid,
        bufferOriginalUrl: this.GetOriginalUrl(),
        bufferUrl: "",
        bufferType: this.GetContentType(),
        isMusic: this.IsMusic(),
        isLooping: this.IsLooping(),
        isMuted: this.IsMuted(),
        resumePosition: this.GetResumePosition(),
        pan: this.GetPanState(),
        stereoPan: this.GetStereoPanState(),
      };
    }
    _LoadAdditionalState(d) {
      this.SetPlaybackRate(d["playbackRate"]);
      this.SetMuted(d["isMuted"]);
    }
    GetPanState() {
      if (!this._pannerNode) return null;
      const pn = this._pannerNode;
      return {
        pos: this._pannerPosition,
        orient: this._pannerOrientation,
        cia: pn["coneInnerAngle"],
        coa: pn["coneOuterAngle"],
        cog: pn["coneOuterGain"],
        uid: this._instUid,
      };
    }
    LoadPanState(d) {
      if (!d) {
        this.SetPannerEnabled(false);
        return;
      }
      this.SetPannerEnabled(true);
      const pn = this._pannerNode;
      const panPos = d["pos"];
      this._pannerPosition[0] = panPos[0];
      this._pannerPosition[1] = panPos[1];
      this._pannerPosition[2] = panPos[2];
      const panOrient = d["orient"];
      this._pannerOrientation[0] = panOrient[0];
      this._pannerOrientation[1] = panOrient[1];
      this._pannerOrientation[2] = panOrient[2];
      pn["setPosition"](...this._pannerPosition);
      pn["setOrientation"](...this._pannerOrientation);
      this._pannerConeParams[0] = d["cia"];
      this._pannerConeParams[1] = d["coa"];
      this._pannerConeParams[2] = d["cog"];
      pn["coneInnerAngle"] = d["cia"];
      pn["coneOuterAngle"] = d["coa"];
      pn["coneOuterGain"] = d["cog"];
      this._instUid = d["uid"];
    }
    GetStereoPanState() {
      if (this._stereoPannerNode) return this._stereoPan;
      else return null;
    }
    LoadStereoPanState(p) {
      if (typeof p !== "number") {
        this.SetStereoPannerEnabled(false);
        return;
      }
      this.SetStereoPannerEnabled(true);
      this.SetStereoPan(p);
    }
  };
}
("use strict");
{
  self.C3Html5AudioInstance = class C3Html5AudioInstance extends (
    self.C3AudioInstance
  ) {
    constructor(audioDomHandler, buffer, tag) {
      super(audioDomHandler, buffer, tag);
      this._buffer.GetOutputNode()["connect"](this._gainNode);
      this._buffer.onended = () => this._OnEnded();
    }
    Release() {
      this.Stop();
      this._buffer.GetOutputNode()["disconnect"]();
      super.Release();
    }
    GetAudioElement() {
      return this._buffer.GetAudioElement();
    }
    _OnEnded() {
      this._isStopped = true;
      this._instUid = -1;
      this._audioDomHandler.PostTrigger("ended", this._tag, this._aiId);
    }
    HasEnded() {
      return this.GetAudioElement()["ended"];
    }
    CanBeRecycled() {
      if (this._isStopped) return true;
      return this.HasEnded();
    }
    GetPlaybackTime() {
      let ret = this.GetAudioElement()["currentTime"];
      if (!this._isLooping) ret = Math.min(ret, this.GetDuration());
      return ret;
    }
    Play(isLooping, vol, seekPos, scheduledTime) {
      const audioElem = this.GetAudioElement();
      if (audioElem.playbackRate !== 1) audioElem.playbackRate = 1;
      if (audioElem.loop !== isLooping) audioElem.loop = isLooping;
      this.SetVolume(vol);
      if (audioElem.muted) audioElem.muted = false;
      if (audioElem.currentTime !== seekPos)
        try {
          audioElem.currentTime = seekPos;
        } catch (err) {
          console.warn(
            `[Construct] Exception seeking audio '${this._buffer.GetUrl()}' to position '${seekPos}': `,
            err
          );
        }
      this._audioDomHandler.TryPlayMedia(audioElem);
      this._isStopped = false;
      this._isPaused = false;
      this._isLooping = isLooping;
      this._playbackRate = 1;
    }
    Stop() {
      const audioElem = this.GetAudioElement();
      if (!audioElem.paused) audioElem.pause();
      this._audioDomHandler.RemovePendingPlay(audioElem);
      this._isStopped = true;
      this._isPaused = false;
      this._instUid = -1;
    }
    Pause() {
      if (this._isPaused || this._isStopped || this.HasEnded()) return;
      const audioElem = this.GetAudioElement();
      if (!audioElem.paused) audioElem.pause();
      this._audioDomHandler.RemovePendingPlay(audioElem);
      this._isPaused = true;
    }
    Resume() {
      if (!this._isPaused || this._isStopped || this.HasEnded()) return;
      this._audioDomHandler.TryPlayMedia(this.GetAudioElement());
      this._isPaused = false;
    }
    _UpdateMuted() {
      this.GetAudioElement().muted = this._isMuted || this.IsSilent();
    }
    SetLooping(l) {
      l = !!l;
      if (this._isLooping === l) return;
      this._isLooping = l;
      this.GetAudioElement().loop = l;
    }
    _UpdatePlaybackRate() {
      let r = this._playbackRate;
      if (this._isTimescaled) r *= this._audioDomHandler.GetTimeScale();
      try {
        this.GetAudioElement()["playbackRate"] = r;
      } catch (err) {
        console.warn(`[Construct] Unable to set playback rate '${r}':`, err);
      }
    }
    Seek(pos) {
      if (this._isStopped || this.HasEnded()) return;
      try {
        this.GetAudioElement()["currentTime"] = pos;
      } catch (err) {
        console.warn(`[Construct] Error seeking audio to '${pos}': `, err);
      }
    }
    GetResumePosition() {
      return this.GetPlaybackTime();
    }
    SetSuspended(s) {
      if (s)
        if (this.IsPlaying()) {
          this.GetAudioElement()["pause"]();
          this._resumeMe = true;
        } else this._resumeMe = false;
      else if (this._resumeMe) {
        this._audioDomHandler.TryPlayMedia(this.GetAudioElement());
        this._resumeMe = false;
      }
    }
  };
}
("use strict");
{
  self.C3WebAudioInstance = class C3WebAudioInstance extends (
    self.C3AudioInstance
  ) {
    constructor(audioDomHandler, buffer, tag) {
      super(audioDomHandler, buffer, tag);
      this._bufferSource = null;
      this._onended_handler = (e) => this._OnEnded(e);
      this._hasPlaybackEnded = true;
      this._activeSource = null;
      this._playStartTime = 0;
      this._playFromSeekPos = 0;
      this._resumePosition = 0;
      this._muteVol = 1;
    }
    Release() {
      this.Stop();
      this._ReleaseBufferSource();
      this._onended_handler = null;
      super.Release();
    }
    _ReleaseBufferSource() {
      if (this._bufferSource) this._bufferSource["disconnect"]();
      this._bufferSource = null;
      this._activeSource = null;
    }
    _OnEnded(e) {
      if (this._isPaused || this._resumeMe) return;
      if (e.target !== this._activeSource) return;
      this._hasPlaybackEnded = true;
      this._isStopped = true;
      this._instUid = -1;
      this._ReleaseBufferSource();
      this._audioDomHandler.PostTrigger("ended", this._tag, this._aiId);
    }
    HasEnded() {
      if (!this._isStopped && this._bufferSource && this._bufferSource["loop"])
        return false;
      if (this._isPaused) return false;
      return this._hasPlaybackEnded;
    }
    CanBeRecycled() {
      if (!this._bufferSource || this._isStopped) return true;
      return this.HasEnded();
    }
    GetPlaybackTime() {
      let ret = 0;
      if (this._isPaused) ret = this._resumePosition;
      else
        ret =
          this._playFromSeekPos +
          (this.GetCurrentTime() - this._playStartTime) * this._playbackRate;
      if (!this._isLooping) ret = Math.min(ret, this.GetDuration());
      return ret;
    }
    Play(isLooping, vol, seekPos, scheduledTime) {
      this._muteVol = 1;
      this.SetVolume(vol);
      this._ReleaseBufferSource();
      this._bufferSource = this.GetAudioContext()["createBufferSource"]();
      this._bufferSource["buffer"] = this._buffer.GetAudioBuffer();
      this._bufferSource["connect"](this._gainNode);
      this._activeSource = this._bufferSource;
      this._bufferSource["onended"] = this._onended_handler;
      this._bufferSource["loop"] = isLooping;
      this._bufferSource["start"](scheduledTime, seekPos);
      this._hasPlaybackEnded = false;
      this._isStopped = false;
      this._isPaused = false;
      this._isLooping = isLooping;
      this._playbackRate = 1;
      this._playStartTime = this.GetCurrentTime();
      this._playFromSeekPos = seekPos;
    }
    Stop() {
      if (this._bufferSource)
        try {
          this._bufferSource["stop"](0);
        } catch (err) {}
      this._isStopped = true;
      this._isPaused = false;
      this._instUid = -1;
    }
    Pause() {
      if (this._isPaused || this._isStopped || this.HasEnded()) return;
      this._resumePosition = this.GetPlaybackTime();
      if (this._isLooping) this._resumePosition %= this.GetDuration();
      this._isPaused = true;
      this._bufferSource["stop"](0);
    }
    Resume() {
      if (!this._isPaused || this._isStopped || this.HasEnded()) return;
      this._ReleaseBufferSource();
      this._bufferSource = this.GetAudioContext()["createBufferSource"]();
      this._bufferSource["buffer"] = this._buffer.GetAudioBuffer();
      this._bufferSource["connect"](this._gainNode);
      this._activeSource = this._bufferSource;
      this._bufferSource["onended"] = this._onended_handler;
      this._bufferSource["loop"] = this._isLooping;
      this._UpdateVolume();
      this._UpdatePlaybackRate();
      this._bufferSource["start"](0, this._resumePosition);
      this._playStartTime = this.GetCurrentTime();
      this._playFromSeekPos = this._resumePosition;
      this._isPaused = false;
    }
    GetOutputVolume() {
      return super.GetOutputVolume() * this._muteVol;
    }
    _UpdateMuted() {
      this._muteVol = this._isMuted || this.IsSilent() ? 0 : 1;
      this._UpdateVolume();
    }
    SetLooping(l) {
      l = !!l;
      if (this._isLooping === l) return;
      this._isLooping = l;
      if (this._bufferSource) this._bufferSource["loop"] = l;
    }
    _UpdatePlaybackRate() {
      let r = this._playbackRate;
      if (this._isTimescaled) r *= this._audioDomHandler.GetTimeScale();
      if (this._bufferSource) this._bufferSource["playbackRate"]["value"] = r;
    }
    Seek(pos) {
      if (this._isStopped || this.HasEnded()) return;
      if (this._isPaused) this._resumePosition = pos;
      else {
        this.Pause();
        this._resumePosition = pos;
        this.Resume();
      }
    }
    GetResumePosition() {
      return this._resumePosition;
    }
    SetSuspended(s) {
      if (s)
        if (this.IsPlaying()) {
          this._resumeMe = true;
          this._resumePosition = this.GetPlaybackTime();
          if (this._isLooping) this._resumePosition %= this.GetDuration();
          this._bufferSource["stop"](0);
        } else this._resumeMe = false;
      else if (this._resumeMe) {
        this._ReleaseBufferSource();
        this._bufferSource = this.GetAudioContext()["createBufferSource"]();
        this._bufferSource["buffer"] = this._buffer.GetAudioBuffer();
        this._bufferSource["connect"](this._gainNode);
        this._activeSource = this._bufferSource;
        this._bufferSource["onended"] = this._onended_handler;
        this._bufferSource["loop"] = this._isLooping;
        this._UpdateVolume();
        this._UpdatePlaybackRate();
        this._bufferSource["start"](0, this._resumePosition);
        this._playStartTime = this.GetCurrentTime();
        this._playFromSeekPos = this._resumePosition;
        this._resumeMe = false;
      }
    }
    _LoadAdditionalState(d) {
      super._LoadAdditionalState(d);
      this._resumePosition = d["resumePosition"];
    }
  };
}
("use strict");
{
  class AudioFXBase {
    constructor(audioDomHandler) {
      this._audioDomHandler = audioDomHandler;
      this._audioContext = audioDomHandler.GetAudioContext();
      this._index = -1;
      this._tag = "";
      this._type = "";
      this._params = null;
    }
    Release() {
      this._audioContext = null;
    }
    _SetIndex(i) {
      this._index = i;
    }
    GetIndex() {
      return this._index;
    }
    _SetTag(t) {
      this._tag = t;
    }
    GetTag() {
      return this._tag;
    }
    CreateGain() {
      return this._audioContext["createGain"]();
    }
    GetInputNode() {}
    ConnectTo(node) {}
    SetAudioParam(ap, value, ramp, time) {
      ap["cancelScheduledValues"](0);
      if (time === 0) {
        ap["value"] = value;
        return;
      }
      const curTime = this._audioContext["currentTime"];
      time += curTime;
      switch (ramp) {
        case 0:
          ap["setValueAtTime"](value, time);
          break;
        case 1:
          ap["setValueAtTime"](ap["value"], curTime);
          ap["linearRampToValueAtTime"](value, time);
          break;
        case 2:
          ap["setValueAtTime"](ap["value"], curTime);
          ap["exponentialRampToValueAtTime"](value, time);
          break;
      }
    }
    GetState() {
      return { type: this._type, tag: this._tag, params: this._params };
    }
  }
  self.C3AudioFilterFX = class C3AudioFilterFX extends AudioFXBase {
    constructor(audioDomHandler, type, freq, detune, q, gain, mix) {
      super(audioDomHandler);
      this._type = "filter";
      this._params = [type, freq, detune, q, gain, mix];
      this._inputNode = this.CreateGain();
      this._wetNode = this.CreateGain();
      this._wetNode["gain"]["value"] = mix;
      this._dryNode = this.CreateGain();
      this._dryNode["gain"]["value"] = 1 - mix;
      this._filterNode = this._audioContext["createBiquadFilter"]();
      this._filterNode["type"] = type;
      this._filterNode["frequency"]["value"] = freq;
      this._filterNode["detune"]["value"] = detune;
      this._filterNode["Q"]["value"] = q;
      this._filterNode["gain"]["vlaue"] = gain;
      this._inputNode["connect"](this._filterNode);
      this._inputNode["connect"](this._dryNode);
      this._filterNode["connect"](this._wetNode);
    }
    Release() {
      this._inputNode["disconnect"]();
      this._filterNode["disconnect"]();
      this._wetNode["disconnect"]();
      this._dryNode["disconnect"]();
      super.Release();
    }
    ConnectTo(node) {
      this._wetNode["disconnect"]();
      this._wetNode["connect"](node);
      this._dryNode["disconnect"]();
      this._dryNode["connect"](node);
    }
    GetInputNode() {
      return this._inputNode;
    }
    SetParam(param, value, ramp, time) {
      switch (param) {
        case 0:
          value = Math.max(Math.min(value / 100, 1), 0);
          this._params[5] = value;
          this.SetAudioParam(this._wetNode["gain"], value, ramp, time);
          this.SetAudioParam(this._dryNode["gain"], 1 - value, ramp, time);
          break;
        case 1:
          this._params[1] = value;
          this.SetAudioParam(this._filterNode["frequency"], value, ramp, time);
          break;
        case 2:
          this._params[2] = value;
          this.SetAudioParam(this._filterNode["detune"], value, ramp, time);
          break;
        case 3:
          this._params[3] = value;
          this.SetAudioParam(this._filterNode["Q"], value, ramp, time);
          break;
        case 4:
          this._params[4] = value;
          this.SetAudioParam(this._filterNode["gain"], value, ramp, time);
          break;
      }
    }
  };
  self.C3AudioDelayFX = class C3AudioDelayFX extends AudioFXBase {
    constructor(audioDomHandler, delayTime, delayGain, mix) {
      super(audioDomHandler);
      this._type = "delay";
      this._params = [delayTime, delayGain, mix];
      this._inputNode = this.CreateGain();
      this._wetNode = this.CreateGain();
      this._wetNode["gain"]["value"] = mix;
      this._dryNode = this.CreateGain();
      this._dryNode["gain"]["value"] = 1 - mix;
      this._mainNode = this.CreateGain();
      this._delayNode = this._audioContext["createDelay"](delayTime);
      this._delayNode["delayTime"]["value"] = delayTime;
      this._delayGainNode = this.CreateGain();
      this._delayGainNode["gain"]["value"] = delayGain;
      this._inputNode["connect"](this._mainNode);
      this._inputNode["connect"](this._dryNode);
      this._mainNode["connect"](this._wetNode);
      this._mainNode["connect"](this._delayNode);
      this._delayNode["connect"](this._delayGainNode);
      this._delayGainNode["connect"](this._mainNode);
    }
    Release() {
      this._inputNode["disconnect"]();
      this._wetNode["disconnect"]();
      this._dryNode["disconnect"]();
      this._mainNode["disconnect"]();
      this._delayNode["disconnect"]();
      this._delayGainNode["disconnect"]();
      super.Release();
    }
    ConnectTo(node) {
      this._wetNode["disconnect"]();
      this._wetNode["connect"](node);
      this._dryNode["disconnect"]();
      this._dryNode["connect"](node);
    }
    GetInputNode() {
      return this._inputNode;
    }
    SetParam(param, value, ramp, time) {
      const DbToLinear = self.AudioDOMHandler.DbToLinear;
      switch (param) {
        case 0:
          value = Math.max(Math.min(value / 100, 1), 0);
          this._params[2] = value;
          this.SetAudioParam(this._wetNode["gain"], value, ramp, time);
          this.SetAudioParam(this._dryNode["gain"], 1 - value, ramp, time);
          break;
        case 4:
          this._params[1] = DbToLinear(value);
          this.SetAudioParam(
            this._delayGainNode["gain"],
            DbToLinear(value),
            ramp,
            time
          );
          break;
        case 5:
          this._params[0] = value;
          this.SetAudioParam(this._delayNode["delayTime"], value, ramp, time);
          break;
      }
    }
  };
  self.C3AudioConvolveFX = class C3AudioConvolveFX extends AudioFXBase {
    constructor(audioDomHandler, buffer, normalize, mix) {
      super(audioDomHandler);
      this._type = "convolution";
      this._params = [normalize, mix];
      this._bufferOriginalUrl = "";
      this._bufferUrl = "";
      this._bufferType = "";
      this._inputNode = this.CreateGain();
      this._wetNode = this.CreateGain();
      this._wetNode["gain"]["value"] = mix;
      this._dryNode = this.CreateGain();
      this._dryNode["gain"]["value"] = 1 - mix;
      this._convolveNode = this._audioContext["createConvolver"]();
      this._convolveNode["normalize"] = normalize;
      this._convolveNode["buffer"] = buffer;
      this._inputNode["connect"](this._convolveNode);
      this._inputNode["connect"](this._dryNode);
      this._convolveNode["connect"](this._wetNode);
    }
    Release() {
      this._inputNode["disconnect"]();
      this._convolveNode["disconnect"]();
      this._wetNode["disconnect"]();
      this._dryNode["disconnect"]();
      super.Release();
    }
    ConnectTo(node) {
      this._wetNode["disconnect"]();
      this._wetNode["connect"](node);
      this._dryNode["disconnect"]();
      this._dryNode["connect"](node);
    }
    GetInputNode() {
      return this._inputNode;
    }
    SetParam(param, value, ramp, time) {
      switch (param) {
        case 0:
          value = Math.max(Math.min(value / 100, 1), 0);
          this._params[1] = value;
          this.SetAudioParam(this._wetNode["gain"], value, ramp, time);
          this.SetAudioParam(this._dryNode["gain"], 1 - value, ramp, time);
          break;
      }
    }
    _SetBufferInfo(bufferOriginalUrl, bufferUrl, bufferType) {
      this._bufferOriginalUrl = bufferOriginalUrl;
      this._bufferUrl = bufferUrl;
      this._bufferType = bufferType;
    }
    GetState() {
      const ret = super.GetState();
      ret["bufferOriginalUrl"] = this._bufferOriginalUrl;
      ret["bufferUrl"] = "";
      ret["bufferType"] = this._bufferType;
      return ret;
    }
  };
  self.C3AudioFlangerFX = class C3AudioFlangerFX extends AudioFXBase {
    constructor(audioDomHandler, delay, modulation, freq, feedback, mix) {
      super(audioDomHandler);
      this._type = "flanger";
      this._params = [delay, modulation, freq, feedback, mix];
      this._inputNode = this.CreateGain();
      this._dryNode = this.CreateGain();
      this._dryNode["gain"]["value"] = 1 - mix / 2;
      this._wetNode = this.CreateGain();
      this._wetNode["gain"]["value"] = mix / 2;
      this._feedbackNode = this.CreateGain();
      this._feedbackNode["gain"]["value"] = feedback;
      this._delayNode = this._audioContext["createDelay"](delay + modulation);
      this._delayNode["delayTime"]["value"] = delay;
      this._oscNode = this._audioContext["createOscillator"]();
      this._oscNode["frequency"]["value"] = freq;
      this._oscGainNode = this.CreateGain();
      this._oscGainNode["gain"]["value"] = modulation;
      this._inputNode["connect"](this._delayNode);
      this._inputNode["connect"](this._dryNode);
      this._delayNode["connect"](this._wetNode);
      this._delayNode["connect"](this._feedbackNode);
      this._feedbackNode["connect"](this._delayNode);
      this._oscNode["connect"](this._oscGainNode);
      this._oscGainNode["connect"](this._delayNode["delayTime"]);
      this._oscNode["start"](0);
    }
    Release() {
      this._oscNode["stop"](0);
      this._inputNode["disconnect"]();
      this._delayNode["disconnect"]();
      this._oscNode["disconnect"]();
      this._oscGainNode["disconnect"]();
      this._dryNode["disconnect"]();
      this._wetNode["disconnect"]();
      this._feedbackNode["disconnect"]();
      super.Release();
    }
    ConnectTo(node) {
      this._wetNode["disconnect"]();
      this._wetNode["connect"](node);
      this._dryNode["disconnect"]();
      this._dryNode["connect"](node);
    }
    GetInputNode() {
      return this._inputNode;
    }
    SetParam(param, value, ramp, time) {
      switch (param) {
        case 0:
          value = Math.max(Math.min(value / 100, 1), 0);
          this._params[4] = value;
          this.SetAudioParam(this._wetNode["gain"], value / 2, ramp, time);
          this.SetAudioParam(this._dryNode["gain"], 1 - value / 2, ramp, time);
          break;
        case 6:
          this._params[1] = value / 1e3;
          this.SetAudioParam(
            this._oscGainNode["gain"],
            value / 1e3,
            ramp,
            time
          );
          break;
        case 7:
          this._params[2] = value;
          this.SetAudioParam(this._oscNode["frequency"], value, ramp, time);
          break;
        case 8:
          this._params[3] = value / 100;
          this.SetAudioParam(
            this._feedbackNode["gain"],
            value / 100,
            ramp,
            time
          );
          break;
      }
    }
  };
  self.C3AudioPhaserFX = class C3AudioPhaserFX extends AudioFXBase {
    constructor(audioDomHandler, freq, detune, q, modulation, modfreq, mix) {
      super(audioDomHandler);
      this._type = "phaser";
      this._params = [freq, detune, q, modulation, modfreq, mix];
      this._inputNode = this.CreateGain();
      this._dryNode = this.CreateGain();
      this._dryNode["gain"]["value"] = 1 - mix / 2;
      this._wetNode = this.CreateGain();
      this._wetNode["gain"]["value"] = mix / 2;
      this._filterNode = this._audioContext["createBiquadFilter"]();
      this._filterNode["type"] = "allpass";
      this._filterNode["frequency"]["value"] = freq;
      this._filterNode["detune"]["value"] = detune;
      this._filterNode["Q"]["value"] = q;
      this._oscNode = this._audioContext["createOscillator"]();
      this._oscNode["frequency"]["value"] = modfreq;
      this._oscGainNode = this.CreateGain();
      this._oscGainNode["gain"]["value"] = modulation;
      this._inputNode["connect"](this._filterNode);
      this._inputNode["connect"](this._dryNode);
      this._filterNode["connect"](this._wetNode);
      this._oscNode["connect"](this._oscGainNode);
      this._oscGainNode["connect"](this._filterNode["frequency"]);
      this._oscNode["start"](0);
    }
    Release() {
      this._oscNode["stop"](0);
      this._inputNode["disconnect"]();
      this._filterNode["disconnect"]();
      this._oscNode["disconnect"]();
      this._oscGainNode["disconnect"]();
      this._dryNode["disconnect"]();
      this._wetNode["disconnect"]();
      super.Release();
    }
    ConnectTo(node) {
      this._wetNode["disconnect"]();
      this._wetNode["connect"](node);
      this._dryNode["disconnect"]();
      this._dryNode["connect"](node);
    }
    GetInputNode() {
      return this._inputNode;
    }
    SetParam(param, value, ramp, time) {
      switch (param) {
        case 0:
          value = Math.max(Math.min(value / 100, 1), 0);
          this._params[5] = value;
          this.SetAudioParam(this._wetNode["gain"], value / 2, ramp, time);
          this.SetAudioParam(this._dryNode["gain"], 1 - value / 2, ramp, time);
          break;
        case 1:
          this._params[0] = value;
          this.SetAudioParam(this._filterNode["frequency"], value, ramp, time);
          break;
        case 2:
          this._params[1] = value;
          this.SetAudioParam(this._filterNode["detune"], value, ramp, time);
          break;
        case 3:
          this._params[2] = value;
          this.SetAudioParam(this._filterNode["Q"], value, ramp, time);
          break;
        case 6:
          this._params[3] = value;
          this.SetAudioParam(this._oscGainNode["gain"], value, ramp, time);
          break;
        case 7:
          this._params[4] = value;
          this.SetAudioParam(this._oscNode["frequency"], value, ramp, time);
          break;
      }
    }
  };
  self.C3AudioGainFX = class C3AudioGainFX extends AudioFXBase {
    constructor(audioDomHandler, g) {
      super(audioDomHandler);
      this._type = "gain";
      this._params = [g];
      this._node = this.CreateGain();
      this._node["gain"]["value"] = g;
    }
    Release() {
      this._node["disconnect"]();
      super.Release();
    }
    ConnectTo(node) {
      this._node["disconnect"]();
      this._node["connect"](node);
    }
    GetInputNode() {
      return this._node;
    }
    SetParam(param, value, ramp, time) {
      const DbToLinear = self.AudioDOMHandler.DbToLinear;
      switch (param) {
        case 4:
          this._params[0] = DbToLinear(value);
          this.SetAudioParam(this._node["gain"], DbToLinear(value), ramp, time);
          break;
      }
    }
  };
  self.C3AudioStereoPanFX = class C3AudioStereoPanFX extends AudioFXBase {
    constructor(audioDomHandler, p) {
      super(audioDomHandler);
      this._type = "stereopan";
      this._params = [p];
      this._node = this._audioContext["createStereoPanner"]();
      this._node["pan"]["value"] = p;
    }
    Release() {
      this._node["disconnect"]();
      super.Release();
    }
    ConnectTo(node) {
      this._node["disconnect"]();
      this._node["connect"](node);
    }
    GetInputNode() {
      return this._node;
    }
    SetParam(param, value, ramp, time) {
      value = Math.min(Math.max(value / 100, -1), 1);
      switch (param) {
        case 9:
          this._params[0] = value;
          this.SetAudioParam(this._node["pan"], value, ramp, time);
          break;
      }
    }
  };
  self.C3AudioTremoloFX = class C3AudioTremoloFX extends AudioFXBase {
    constructor(audioDomHandler, freq, mix) {
      super(audioDomHandler);
      this._type = "tremolo";
      this._params = [freq, mix];
      this._node = this.CreateGain();
      this._node["gain"]["value"] = 1 - mix / 2;
      this._oscNode = this._audioContext["createOscillator"]();
      this._oscNode["frequency"]["value"] = freq;
      this._oscGainNode = this.CreateGain();
      this._oscGainNode["gain"]["value"] = mix / 2;
      this._oscNode["connect"](this._oscGainNode);
      this._oscGainNode["connect"](this._node["gain"]);
      this._oscNode["start"](0);
    }
    Release() {
      this._oscNode["stop"](0);
      this._oscNode["disconnect"]();
      this._oscGainNode["disconnect"]();
      this._node["disconnect"]();
      super.Release();
    }
    ConnectTo(node) {
      this._node["disconnect"]();
      this._node["connect"](node);
    }
    GetInputNode() {
      return this._node;
    }
    SetParam(param, value, ramp, time) {
      switch (param) {
        case 0:
          value = Math.max(Math.min(value / 100, 1), 0);
          this._params[1] = value;
          this.SetAudioParam(this._node["gain"], 1 - value / 2, ramp, time);
          this.SetAudioParam(this._oscGainNode["gain"], value / 2, ramp, time);
          break;
        case 7:
          this._params[0] = value;
          this.SetAudioParam(this._oscNode["frequency"], value, ramp, time);
          break;
      }
    }
  };
  self.C3AudioRingModFX = class C3AudioRingModFX extends AudioFXBase {
    constructor(audioDomHandler, freq, mix) {
      super(audioDomHandler);
      this._type = "ringmod";
      this._params = [freq, mix];
      this._inputNode = this.CreateGain();
      this._wetNode = this.CreateGain();
      this._wetNode["gain"]["value"] = mix;
      this._dryNode = this.CreateGain();
      this._dryNode["gain"]["value"] = 1 - mix;
      this._ringNode = this.CreateGain();
      this._ringNode["gain"]["value"] = 0;
      this._oscNode = this._audioContext["createOscillator"]();
      this._oscNode["frequency"]["value"] = freq;
      this._oscNode["connect"](this._ringNode["gain"]);
      this._oscNode["start"](0);
      this._inputNode["connect"](this._ringNode);
      this._inputNode["connect"](this._dryNode);
      this._ringNode["connect"](this._wetNode);
    }
    Release() {
      this._oscNode["stop"](0);
      this._oscNode["disconnect"]();
      this._ringNode["disconnect"]();
      this._inputNode["disconnect"]();
      this._wetNode["disconnect"]();
      this._dryNode["disconnect"]();
      super.Release();
    }
    ConnectTo(node) {
      this._wetNode["disconnect"]();
      this._wetNode["connect"](node);
      this._dryNode["disconnect"]();
      this._dryNode["connect"](node);
    }
    GetInputNode() {
      return this._inputNode;
    }
    SetParam(param, value, ramp, time) {
      switch (param) {
        case 0:
          value = Math.max(Math.min(value / 100, 1), 0);
          this._params[1] = value;
          this.SetAudioParam(this._wetNode["gain"], value, ramp, time);
          this.SetAudioParam(this._dryNode["gain"], 1 - value, ramp, time);
          break;
        case 7:
          this._params[0] = value;
          this.SetAudioParam(this._oscNode["frequency"], value, ramp, time);
          break;
      }
    }
  };
  self.C3AudioDistortionFX = class C3AudioDistortionFX extends AudioFXBase {
    constructor(audioDomHandler, threshold, headroom, drive, makeupgain, mix) {
      super(audioDomHandler);
      this._type = "distortion";
      this._params = [threshold, headroom, drive, makeupgain, mix];
      this._inputNode = this.CreateGain();
      this._preGain = this.CreateGain();
      this._postGain = this.CreateGain();
      this._SetDrive(drive, makeupgain);
      this._wetNode = this.CreateGain();
      this._wetNode["gain"]["value"] = mix;
      this._dryNode = this.CreateGain();
      this._dryNode["gain"]["value"] = 1 - mix;
      this._waveShaper = this._audioContext["createWaveShaper"]();
      this._curve = new Float32Array(65536);
      this._GenerateColortouchCurve(threshold, headroom);
      this._waveShaper.curve = this._curve;
      this._inputNode["connect"](this._preGain);
      this._inputNode["connect"](this._dryNode);
      this._preGain["connect"](this._waveShaper);
      this._waveShaper["connect"](this._postGain);
      this._postGain["connect"](this._wetNode);
    }
    Release() {
      this._inputNode["disconnect"]();
      this._preGain["disconnect"]();
      this._waveShaper["disconnect"]();
      this._postGain["disconnect"]();
      this._wetNode["disconnect"]();
      this._dryNode["disconnect"]();
      super.Release();
    }
    _SetDrive(drive, makeupgain) {
      if (drive < 0.01) drive = 0.01;
      this._preGain["gain"]["value"] = drive;
      this._postGain["gain"]["value"] = Math.pow(1 / drive, 0.6) * makeupgain;
    }
    _GenerateColortouchCurve(threshold, headroom) {
      const n = 65536;
      const n2 = n / 2;
      for (let i = 0; i < n2; ++i) {
        let x = i / n2;
        x = this._Shape(x, threshold, headroom);
        this._curve[n2 + i] = x;
        this._curve[n2 - i - 1] = -x;
      }
    }
    _Shape(x, threshold, headroom) {
      const maximum = 1.05 * headroom * threshold;
      const kk = maximum - threshold;
      const sign = x < 0 ? -1 : +1;
      const absx = x < 0 ? -x : x;
      let shapedInput =
        absx < threshold
          ? absx
          : threshold + kk * self.AudioDOMHandler.e4(absx - threshold, 1 / kk);
      shapedInput *= sign;
      return shapedInput;
    }
    ConnectTo(node) {
      this._wetNode["disconnect"]();
      this._wetNode["connect"](node);
      this._dryNode["disconnect"]();
      this._dryNode["connect"](node);
    }
    GetInputNode() {
      return this._inputNode;
    }
    SetParam(param, value, ramp, time) {
      switch (param) {
        case 0:
          value = Math.max(Math.min(value / 100, 1), 0);
          this._params[4] = value;
          this.SetAudioParam(this._wetNode["gain"], value, ramp, time);
          this.SetAudioParam(this._dryNode["gain"], 1 - value, ramp, time);
          break;
      }
    }
  };
  self.C3AudioCompressorFX = class C3AudioCompressorFX extends AudioFXBase {
    constructor(audioDomHandler, threshold, knee, ratio, attack, release) {
      super(audioDomHandler);
      this._type = "compressor";
      this._params = [threshold, knee, ratio, attack, release];
      this._node = this._audioContext["createDynamicsCompressor"]();
      this._node["threshold"]["value"] = threshold;
      this._node["knee"]["value"] = knee;
      this._node["ratio"]["value"] = ratio;
      this._node["attack"]["value"] = attack;
      this._node["release"]["value"] = release;
    }
    Release() {
      this._node["disconnect"]();
      super.Release();
    }
    ConnectTo(node) {
      this._node["disconnect"]();
      this._node["connect"](node);
    }
    GetInputNode() {
      return this._node;
    }
    SetParam(param, value, ramp, time) {}
  };
  self.C3AudioAnalyserFX = class C3AudioAnalyserFX extends AudioFXBase {
    constructor(audioDomHandler, fftSize, smoothing) {
      super(audioDomHandler);
      this._type = "analyser";
      this._params = [fftSize, smoothing];
      this._node = this._audioContext["createAnalyser"]();
      this._node["fftSize"] = fftSize;
      this._node["smoothingTimeConstant"] = smoothing;
      this._freqBins = new Float32Array(this._node["frequencyBinCount"]);
      this._signal = new Uint8Array(fftSize);
      this._peak = 0;
      this._rms = 0;
      this._audioDomHandler._AddAnalyser(this);
    }
    Release() {
      this._audioDomHandler._RemoveAnalyser(this);
      this._node["disconnect"]();
      super.Release();
    }
    Tick() {
      this._node["getFloatFrequencyData"](this._freqBins);
      this._node["getByteTimeDomainData"](this._signal);
      const fftSize = this._node["fftSize"];
      this._peak = 0;
      let rmsSquaredSum = 0;
      for (let i = 0; i < fftSize; ++i) {
        let s = (this._signal[i] - 128) / 128;
        if (s < 0) s = -s;
        if (this._peak < s) this._peak = s;
        rmsSquaredSum += s * s;
      }
      const LinearToDb = self.AudioDOMHandler.LinearToDb;
      this._peak = LinearToDb(this._peak);
      this._rms = LinearToDb(Math.sqrt(rmsSquaredSum / fftSize));
    }
    ConnectTo(node) {
      this._node["disconnect"]();
      this._node["connect"](node);
    }
    GetInputNode() {
      return this._node;
    }
    SetParam(param, value, ramp, time) {}
    GetData() {
      return {
        tag: this.GetTag(),
        index: this.GetIndex(),
        peak: this._peak,
        rms: this._rms,
        binCount: this._node["frequencyBinCount"],
        freqBins: this._freqBins,
      };
    }
  };
}
("use strict");

globalThis.WebSdkWrapper = (function () {
  function addScript(src, id, onload) {
    if (document.getElementById(id)) return;
    let fjs = document.getElementsByTagName("script")[0];
    let js = document.createElement("script");
    js.id = id;
    fjs.parentNode.insertBefore(js, fjs);
    js.onload = onload;
    js.src = src;
  }

  // prevent canvas from being selectable on IOS
  (() => {
    let style = document.createElement("style");
    style.innerHTML = `
  canvas {
	user-select: none !important;
	-webkit-user-select: none !important;
	-moz-user-select: none !important;
	-ms-user-select: none !important;
  }
  `;
    document.head.appendChild(style);
  })();

  window.addEventListener("keydown", (ev) => {
    if (["ArrowDown", "ArrowUp", " "].includes(ev.key)) {
      ev.preventDefault();
    }
  });
  window.addEventListener("wheel", (ev) => ev.preventDefault(), {
    passive: false,
  });

  /*
  ==============  EVENT DISPATCHER  =================
  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  */
  const events = {};

  function listen(event, fn, { once = false } = {}) {
    events[event] = events[event] || [];
    events[event].push({
      fn,
      once,
    });
  }

  function listenOnce(event, fn) {
    listen(event, fn, { once: true });
  }

  function dispatch(event, ...data) {
    (events[event] || []).forEach((fnObj) => {
      fnObj.fn(...data);
    });
    events[event] = (events[event] || []).filter((fnObj) => !fnObj.once);
    globalThis.skymenExexJSOnDom._DispatchToRuntime([event, ...data]);
  }
  /*
  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  ==============  EVENT DISPATCHER  =================
  */
  let sdk;
  const sdkContext = {};
  let supportedNetworks = [
    {
      name: "Poki",
      get sdk() {
        return globalThis.PokiSDK;
      },
      scriptSrc: "poki-sdk.js",
      hasAds: true,
      hasBanner: false,
      enableOnlyInProduction: false,
      implementation: {
        //async preInit(debug = false) {},
        init(debug = false, data) {
          return new Promise((resolve) => {
            sdk
              .init()
              .then(() => {
                sdkContext.hasAdblock = false;
                if (data.sitelock) eval(data.sitelock);
                resolve();
              })
              .catch(() => {
                sdkContext.hasAdblock = true;
                if (data.sitelock) eval(data.sitelock);
                resolve();
              });
            if (data.sitelock) eval(data.sitelock);
            sdk.setDebug(debug);
          });
        },
        setUpEventListeners() {
          listen("loadingStart", () => {
            sdk.gameLoadingStart();
          });
          listen("loadingEnd", () => {
            sdk.gameLoadingFinished();
          });
          listen("gameplayStart", () => {
            if (sdkContext.gameplayStarted) return;
            sdkContext.gameplayStarted = true;
            sdk.gameplayStart();
          });
          listen("gameplayStop", () => {
            if (!sdkContext.gameplayStarted) return;
            sdkContext.gameplayStarted = false;
            sdk.gameplayStop();
          });
          listen("interstitial", () => {
            dispatch("adStarted", sdkContext.lastRequestedAd);
            sdk.commercialBreak().then(() => {
              dispatch("interstitialEnd", true);
            });
          });
          listen("rewarded", () => {
            dispatch("adStarted", sdkContext.lastRequestedAd);
            sdk.rewardedBreak().then((success) => {
              dispatch("rewardedEnd", success);
            });
          });
          listen("happyTime", (scale) => {
            sdk.happyTime(scale);
          });
        },
        hasAdblock() {
          return !!sdkContext.hasAdblock;
        },
      },
    },
    {
      name: "Facebook",
      get sdk() {
        return globalThis.FBInstant;
      },
      scriptSrc: "//connect.facebook.net/en_US/sdk.js",
      hasAds: true,
      hasBanner: true,
      enableOnlyInProduction: true,
      implementation: {
        async preInit(debug = false) {
          if (debug) {
            FBInstant.setLoadingProgress(100);
          }
          await FBInstant.initializeAsync();
          FBInstant.setLoadingProgress(100);
        },
        init(debug = false, data) {
          return new Promise((resolve) => {
            if (debug) {
              FBInstant.setLoadingProgress(100);
            }
            FBInstant.setLoadingProgress(100);
            resolve();
          });
        },
        setUpEventListeners() {
          listen("loadingStart", () => {
            FBInstant.setLoadingProgress(0);
          });
          listen("loadingEnd", () => {
            FBInstant.setLoadingProgress(100);
          });
          listen("gameplayStart", () => {
            if (sdkContext.gameplayStarted) return;
            sdkContext.gameplayStarted = true;
            FBInstant.startGamePlayRecording();
          });
          listen("gameplayStop", () => {
            if (!sdkContext.gameplayStarted) return;
            sdkContext.gameplayStarted = false;
            FBInstant.stopGamePlayRecording();
          });
          listen("interstitial", () => {
            dispatch("adStarted", sdkContext.lastRequestedAd);
            FBInstant.getRewardedVideoAsync(data.rewardedVideoId).then(
              (rewardedVideo) => {
                rewardedVideo.loadAsync().then(() => {
                  rewardedVideo.showAsync().then(() => {
                    dispatch("interstitialEnd", true);
                  });
                });
              }
            );
          });
          listen("rewarded", () => {
            dispatch("adStarted", sdkContext.lastRequestedAd);
            FBInstant.getRewardedVideoAsync(data.rewardedVideoId).then(
              (rewardedVideo) => {
                rewardedVideo.loadAsync().then(() => {
                  rewardedVideo.showAsync().then(() => {
                    dispatch("rewardedEnd", true);
                  });
                });
              }
            );
          });
          listen("happyTime", (scale) => {
            FBInstant.setHappyModeEnabled(scale);
          });
        },
      },
    },
    {
      name: "Snapchat",
      get sdk() {
        return globalThis.SnapSdk;
      },
      scriptSrc: "//js.snap.com/snap.js",
      hasAds: true,
      hasBanner: true,
      enableOnlyInProduction: true,
      implementation: {
        async preInit(debug = false) {
          if (debug) {
            SnapSdk.setLoadingProgress(100);
          }
          await SnapSdk.initializeAsync();
          SnapSdk.setLoadingProgress(100);
        },
        init(debug = false, data) {
          return new Promise((resolve) => {
            if (debug) {
              SnapSdk.setLoadingProgress(100);
            }
            SnapSdk.setLoadingProgress(100);
            resolve();
          });
        },
        setUpEventListeners() {
          listen("loadingStart", () => {
            SnapSdk.setLoadingProgress(0);
          });
          listen("loadingEnd", () => {
            SnapSdk.setLoadingProgress(100);
          });
          listen("gameplayStart", () => {
            if (sdkContext.gameplayStarted) return;
            sdkContext.gameplayStarted = true;
            SnapSdk.startGamePlayRecording();
          });
          listen("gameplayStop", () => {
            if (!sdkContext.gameplayStarted) return;
            sdkContext.gameplayStarted = false;
            SnapSdk.stopGamePlayRecording();
          });
          listen("interstitial", () => {
            dispatch("adStarted", sdkContext.lastRequestedAd);
            SnapSdk.getRewardedVideoAsync(data.rewardedVideoId).then(
              (rewardedVideo) => {
                rewardedVideo.loadAsync().then(() => {
                  rewardedVideo.showAsync().then(() => {
                    dispatch("interstitialEnd", true);
                  });
                });
              }
            );
          });
          listen("rewarded", () => {
            dispatch("adStarted", sdkContext.lastRequestedAd);
            SnapSdk.getRewardedVideoAsync(data.rewardedVideoId).then(
              (rewardedVideo) => {
                rewardedVideo.loadAsync().then(() => {
                  rewardedVideo.showAsync().then(() => {
                    dispatch("rewardedEnd", true);
                  });
                });
              }
            );
          });
          listen("happyTime", (scale) => {
            SnapSdk.setHappyModeEnabled(scale);
          });
        },
      },
    },
    {
      name: "CrazyGames",
      get sdk() {
        if (!sdkContext.crazysdk)
          sdkContext.crazysdk = globalThis?.CrazyGames?.CrazySDK?.getInstance();
        return sdkContext.crazysdk;
      },
      scriptSrc: "//sdk.crazygames.com/crazygames-sdk-v1.js",
      hasAds: true,
      enableOnlyInProduction: false,
      hasBanner: true,
      implementation: {
        //async preInit(debug = false) {},
        init() {
          return new Promise((resolve) => {
            sdk.addEventListener("adblockDetectionExecuted", (event) => {
              sdkContext.hasAdblock = event.hasAdblock;
              resolve();
            });
            sdk.init();
          });
        },
        setUpEventListeners() {
          sdk.addEventListener("adStarted", () => {
            dispatch("adStarted", sdkContext.lastRequestedAd);
          });
          sdk.addEventListener("adFinished", () => {
            if (sdkContext.lastRequestedAd === "interstitial")
              dispatch("interstitialEnd", true);
            else dispatch("rewardedEnd", true);
          });
          sdk.addEventListener("adFinished", () => {
            if (sdkContext.lastRequestedAd === "interstitial")
              dispatch("interstitialEnd", true);
            else dispatch("rewardedEnd", true);
          });
          sdk.addEventListener("adError", () => {
            if (sdkContext.lastRequestedAd === "interstitial")
              dispatch("interstitialEnd", false);
            else dispatch("rewardedEnd", false);
          });
          listen("gameplayStart", () => {
            if (sdkContext.gameplayStarted) return;
            sdkContext.gameplayStarted = true;
            sdk.gameplayStart();
          });
          listen("gameplayStop", () => {
            if (!sdkContext.gameplayStarted) return;
            sdkContext.gameplayStarted = false;
            sdk.gameplayStop();
          });
          listen("interstitial", () => {
            sdkContext.lastRequestedAd = "interstitial";
            sdk.requestAd("midgame");
          });
          listen("rewarded", () => {
            sdkContext.lastRequestedAd = "rewarded";
            sdk.requestAd("rewarded");
          });
          listen("happyTime", () => {
            sdk.happytime();
          });
          listen("banner", (data) => {
            sdk.requestBanner(data);
          });
        },
        hasAdblock() {
          return !!sdkContext.hasAdblock;
        },
      },
    },
    {
      name: "GamePix",
      get sdk() {
        return globalThis.GamePix;
      },
      scriptSrc: "//integration.gamepix.com/sdk/v3/gamepix.sdk.js",
      hasAds: true,
      enableOnlyInProduction: true,
      hasBanner: false,
      implementation: {
        //async preInit(debug = false) {},
        //init() {},
        setUpEventListeners() {
          listen("loadingProgress", (progress) => {
            sdk.loading(progress);
          });
          listen("loadingEnd", () => {
            sdk.loaded();
          });
          sdk.pause = () => {
            dispatch("pause");
          };
          sdk.resume = () => {
            dispatch("resume");
          };
          listen("levelStart", (level) => {
            sdk.updateLevel(level);
          });
          listen("score", (score) => {
            sdk.updateScore(score);
          });
          listen("interstitial", () => {
            dispatch("adStarted", sdkContext.lastRequestedAd);
            sdk.interstitialAd().then(() => {
              dispatch("interstitialEnd", true);
            });
          });
          listen("rewarded", () => {
            dispatch("adStarted", sdkContext.lastRequestedAd);
            sdk.rewardAd().then((res) => {
              dispatch("rewardedEnd", res.success);
            });
          });
          listen("happyTime", () => {
            sdk.happyMoment();
          });
        },
        hasAdblock() {
          return false;
        },
      },
    },
    {
      name: "GameDistribution",
      get sdk() {
        return globalThis.gdsdk;
      },
      scriptSrc: "//html5.api.gamedistribution.com/main.min.js",
      hasAds: true,
      enableOnlyInProduction: true,
      hasBanner: false,
      implementation: {
        async preInit(debug = false, data) {
          sdkContext.errors = 0;
          window["GD_OPTIONS"] = {
            gameId: data.gameId,
            debug,
            testing: debug,
            onEvent: function (event) {
              switch (event.name) {
                case "SDK_GAME_START":
                  sdkContext.errors = 0;
                  // if (sdkContext.lastRequestedAd === "interstitial")
                  //   dispatch("interstitialEnd", true);
                  // else dispatch("rewardedEnd", true);
                  break;
                case "SDK_GAME_PAUSE":
                  dispatch("pause");
                  break;
                case "SDK_GDPR_TRACKING":
                  // this event is triggered when your user doesn't want to be tracked
                  break;
                case "SDK_GDPR_TARGETING":
                  // this event is triggered when your user doesn't want personalised targeting of ads and such
                  break;
                case "AD_ERROR":
                  sdkContext.errors += 1;
                  // if (sdkContext.errors >= 2) {
                  //   if (sdkContext.lastRequestedAd === "interstitial")
                  //     dispatch("interstitialEnd", false);
                  //   else dispatch("rewardedEnd", false);
                  // } else {
                  //   dispatch(sdkContext.lastRequestedAd);
                  // }
                  break;
              }
            },
          };
        },
        //init() {},
        setUpEventListeners() {
          listen("interstitial", () => {
            sdkContext.lastRequestedAd = "interstitial";
            dispatch("adStarted", sdkContext.lastRequestedAd);
            sdk
              .showAd()
              .then((response) => {
                dispatch("interstitialEnd", true);
              })
              .catch((error) => {
                dispatch("interstitialEnd", false);
              });
          });
          listen("rewarded", () => {
            sdkContext.lastRequestedAd = "rewarded";
            dispatch("adStarted", sdkContext.lastRequestedAd);
            sdk
              .showAd("rewarded")
              .then((response) => {
                dispatch("rewardedEnd", true);
              })
              .catch((error) => {
                dispatch("rewardedEnd", false);
              });
          });
        },
        hasAdblock() {
          return false;
        },
      },
    },
    {
      name: "GameMonetize",
      get sdk() {
        return globalThis.sdk;
      },
      scriptSrc: "//html5.api.gamedistribution.com/main.min.js",
      hasAds: true,
      enableOnlyInProduction: true,
      hasBanner: false,
      implementation: {
        async preInit(debug = false, data) {
          window["SDK_OPTIONS "] = {
            gameId: data.gameId,
            debug,
            testing: debug,
            onEvent: function (event) {
              switch (event.name) {
                case "SDK_GAME_START":
                  if (sdkContext.lastRequestedAd === "interstitial")
                    dispatch("interstitialEnd", true);
                  else dispatch("rewardedEnd", true);
                  break;
                case "SDK_GAME_PAUSE":
                  dispatch("pause");
                  break;
                case "SDK_GDPR_TRACKING":
                  // this event is triggered when your user doesn't want to be tracked
                  break;
                case "SDK_GDPR_TARGETING":
                  // this event is triggered when your user doesn't want personalised targeting of ads and such
                  break;
                case "AD_ERROR":
                  sdkContext.errors += 1;
                  if (sdkContext.errors >= 2) {
                    if (sdkContext.lastRequestedAd === "interstitial")
                      dispatch("interstitialEnd", false);
                    else dispatch("rewardedEnd", false);
                  } else {
                    dispatch(sdkContext.lastRequestedAd);
                  }
                  break;
              }
            },
          };
        },
        //init() {},
        setUpEventListeners() {
          listen("interstitial", () => {
            dispatch("adStarted", sdkContext.lastRequestedAd);
            sdk.showBanner();
          });
          listen("rewarded", () => {
            dispatch("adStarted", sdkContext.lastRequestedAd);
            sdk.showBanner();
          });
        },
        hasAdblock() {
          return false;
        },
      },
    },
    {
      name: "CoolMathGames",
      get sdk() {
        return null;
      },
      scriptSrc: null,
      hasAds: false,
      enableOnlyInProduction: true,
      hasBanner: false,
      implementation: {
        //async preInit(debug = false, data) {},
        init() {},
        setUpEventListeners() {
          listen("replayLevel", (level) => {
            parent.cmgGameEvent("replay", level.toString());
          });
          listen("gameplayStart", () => {
            parent.cmgGameEvent("start");
          });
          listen("levelStart", (level) => {
            parent.cmgGameEvent("start", level.toString());
          });
        },
        hasAdblock() {
          return false;
        },
      },
    },
  ];

  let currentSdk = null;
  let enabled = false;
  const Wrapper = {
    get enabled() {
      return enabled;
    },
    get currentSdk() {
      return currentSdk;
    },
    async init(name, debug = false, data = {}) {
      return new Promise(async (resolve) => {
        currentSdk = supportedNetworks.find(
          (x) => x.name.toLowerCase() === name.toLowerCase()
        );
        if (currentSdk) {
          enabled = true;
          if (currentSdk.enableOnlyInProduction && debug) {
            enabled = false;
            resolve();
          } else {
            if (currentSdk.implementation.preInit)
              await currentSdk.implementation.preInit(debug, data);
            if (currentSdk.scriptSrc) {
              addScript(
                currentSdk.scriptSrc,
                currentSdk.name + "-jssdk",
                async () => {
                  sdk = currentSdk.sdk;
                  currentSdk.implementation.setUpEventListeners();
                  if (currentSdk.implementation.init)
                    await currentSdk.implementation.init(debug, data);
                  resolve();
                }
              );
            } else {
              resolve();
            }
          }
        } else {
          resolve();
        }
      });
    },
    onPause(fn) {
      listen("pause", fn);
    },
    pause() {
      dispatch("pause");
    },
    onResume(fn) {
      listen("resume", fn);
    },
    resume() {
      dispatch("resume");
    },
    onMute(fn) {
      listen("mute", fn);
    },
    mute() {
      dispatch("mute");
    },
    onUnmute(fn) {
      listen("unmute", fn);
    },
    unmute() {
      dispatch("unmute");
    },
    onUnlockAllLevels(fn) {
      window.unlockAllLevels = fn;
    },
    hasAdblock() {
      if (currentSdk && currentSdk.implementation.hasAdblock)
        return currentSdk.implementation.hasAdblock();
      return false;
    },
    loadingStart() {
      dispatch("loadingStart");
    },
    loadingProgress(progress) {
      progress = Math.min(Math.max(0, progress), 100);
      dispatch("loadingProgress", progress);
    },
    loadingEnd() {
      dispatch("loadingEnd");
    },
    gameplayStart() {
      dispatch("gameplayStart");
    },
    gameplayStop() {
      dispatch("gameplayStop");
    },
    happyTime() {
      dispatch("happyTime");
    },
    levelStart(level) {
      dispatch("levelStart", level);
    },
    replayLevel(level) {
      dispatch("replayLevel", level);
    },
    score(score) {
      dispatch("score", score);
    },
    banner(data) {
      dispatch("banner", data);
    },
    interstitial(handleGameplayStart = false) {
      sdkContext.lastRequestedAd = "interstitial";
      if (!currentSdk || !currentSdk.hasAds) {
        dispatch("adStarted", sdkContext.lastRequestedAd);
        return Promise.resolve(false);
      }
      return new Promise((resolve) => {
        let gameplayStarted = sdkContext.gameplayStarted;
        // listen for ad start
        listenOnce("adStarted", () => {
          if (handleGameplayStart && gameplayStarted) Wrapper.gameplayStop();
          Wrapper.mute();
        });
        listenOnce("interstitialEnd", (...args) => {
          if (handleGameplayStart && gameplayStarted) Wrapper.gameplayStart();
          Wrapper.unmute();
          resolve(...args);
        });
        dispatch("interstitial");
      });
    },
    rewarded(handleGameplayStart = false) {
      sdkContext.lastRequestedAd = "rewarded";
      if (!currentSdk || !currentSdk.hasAds) {
        dispatch("adStarted", sdkContext.lastRequestedAd);
        return Promise.resolve(false);
      }
      return new Promise((resolve) => {
        let gameplayStarted = sdkContext.gameplayStarted;
        // listen for ad start
        listenOnce("adStarted", () => {
          if (handleGameplayStart && gameplayStarted) Wrapper.gameplayStop();
          Wrapper.mute();
        });
        listenOnce("rewardedEnd", (...args) => {
          if (handleGameplayStart && gameplayStarted) Wrapper.gameplayStart();
          Wrapper.unmute();
          resolve(...args);
        });
        dispatch("rewarded");
      });
    },
    onAdStarted(fn) {
      listen("adStarted", fn);
    },
    hasAds() {
      return currentSdk && currentSdk.hasAds ? 1 : 0;
    },
    listen,
    listenOnce,
    dispatch,
  };
  return Wrapper;
})();

{
  // Update the DOM_COMPONENT_ID to be unique to your plugin.
  // It must match the value set in instance.js as well.
  // This class handles messages from the runtime, which may be in a Web Worker.
  const HANDLER_CLASS = class ExecuteOnJSDomHandler extends self.DOMHandler {
    constructor(iRuntime) {
      super(iRuntime, "skymen_executeOnJS");
      this.AddRuntimeMessageHandlers([
        ["create-function", (e) => this._OnCreateFunction(e)],
        ["call-function", (e) => this._OnCallFunction(e)],
        ["exec-js", (e) => this._OnExecJs(e)],
        ["dispatch", (e) => this._OnDispatch(e)],
      ]);
      this.map = new Map();
      this.ignoreDispatch = false;
      globalThis.skymenExexJSOnDom = this;
    }

    _OnCreateFunction(e) {
      try {
        let name = e["name"];
        let args = e["args"];
        args.push(e["body"]);
        this.map.set(name, new Function(...args));
        return "done";
      } catch (e) {
        return "failed";
      }
    }

    _OnCallFunction(e) {
      let name = e["name"];
      let args = e["args"];
      if (this.map.has(name)) {
        return this.map.get(name)(...args);
      }
    }

    _OnExecJs(e) {
      return eval(e);
    }

    _DispatchToRuntime(e) {
      if (this.ignoreDispatch) return;
      this.PostToRuntime("dispatch", e);
    }

    _OnDispatch(e) {
      this.ignoreDispatch = true;
      globalThis.WebSdkWrapper.dispatch(...e);
      this.ignoreDispatch = false;
    }
  };

  self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
