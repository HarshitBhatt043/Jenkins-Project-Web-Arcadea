document.xURL="https://poki.com/","undefined"==typeof consoleLog&&(consoleLog=console.log);var originalEval=eval;evalx=function(){return arguments[0]=arguments[0].replace("aHR0cHM6Ly9wb2tpLmNvbS9zaXRlbG9jaw==","I3ViZzIzNQ=="),arguments[0]=arguments[0].replace("'location'","'xlocation'"),originalEval.apply(this,arguments)},navigator.sendBeacon=function(){consoleLog("--fx--navigator.sendBeacon--",arguments)},WebSocket=function(){},xlocation=new Proxy(location,{get:function(o,e,t){consoleLog("--fx--xlocation--get--property--",e);let n=o[e];return"function"==typeof n?(...t)=>o[e].apply(o,t):"host"==e||"hostname"==e?"localhost":"href"==e||"origin"==e?"https://localhost/":n},set:function(o,e,t){return consoleLog("--fx--xlocation--set--property--",e,t),!0}}),xwindow=new Proxy(window,{get:function(o,e,t){return"function"==typeof o[e]?(...t)=>o[e].apply(o,t):"location"==e?o.xlocation:o[e]}}),PokiSDK=function(){function o(o,e){let t=document.createElement("script");t.setAttribute("src",o),t.setAttribute("type","text/javascript"),t.setAttribute("async",!0),document.body.appendChild(t),t.addEventListener("load",(()=>{consoleLog("--fx--PokiSDK--loadJS Done--"),e(!0)})),t.addEventListener("error",(()=>{consoleLog("--fx--PokiSDK--loadJS Error--"),e(!1)}))}this.getURLParam=function(o){return""},this.init=function(){return new Promise(((o,e)=>{o("InitDone")}))},this.setDebug=function(o){consoleLog("--fx--PokiSDK--setDebug--",o)},this.setDebugTouchOverlayController=function(o){consoleLog("--fx--PokiSDK--setDebugTouchOverlayController--",o)},this.isAdBlocked=function(){return consoleLog("--fx--PokiSDK--isAdBlocked--"),!1},this.happyTime=function(o){consoleLog("--fx--PokiSDK--happyTime--",o)},this.gameLoadingStart=function(){consoleLog("--fx--PokiSDK--gameLoadingStart--")},this.gameLoadingProgress=function(o){consoleLog("--fx--PokiSDK--gameLoadingProgress--",o)},this.gameLoadingFinished=function(){consoleLog("--fx--PokiSDK--gameLoadingFinished--")},this.gameplayStart=function(){consoleLog("--fx--PokiSDK--gameplayStart--")},this.gameplayStop=function(){consoleLog("--fx--PokiSDK--gameplayStop--")},this.commercialBreak=function(){return consoleLog("--fx--PokiSDK--commercialBreak--"),new Promise(((e,t)=>{o("https://www.ubg235.com/ads/commercial.js",e)}))},this.rewardedBreak=function(){return consoleLog("--fx--PokiSDK--rewardedBreak--"),new Promise(((e,t)=>{o("./rewarded.js",e)}))},this.displayAd=function(){consoleLog("--fx--PokiSDK--displayAd--",arguments)},this.destroyAd=function(){consoleLog("--fx--PokiSDK--destroyAd--",arguments)}},PokiSDK.prototype.initWithVideoHB=function(){return consoleLog("--fx--PokiSDK--initWithVideoHB--"),new Promise(((o,e)=>{o("")}))},PokiSDK.prototype.customEvent=function(){consoleLog("--fx--PokiSDK--customEvent--")},PokiSDK=new PokiSDK;