var idnet_appid,ads_count=0,afg_channel_id=7503025976,ad_timing=180,ads_enabled=!1,lastAdTime=0,allowGamePause=!0,requestAndPlayAd=!1,clientOptionsLoadedEnum="loading",clientOptionsCheckCount=0;function InitExternEval(e){if(document.getElementById("gameContainer")||document.getElementById("unityContainer"))if(null!=e)if(idnet_appid=e){var t=new XMLHttpRequest;t.onreadystatechange=function(){if(4==t.readyState&&200==t.status)try{if(data=JSON.parse(t.responseText),!data.success)return;data.options.afg_channel_id&&(afg_channel_id=data.options.afg_channel_id),ads_enabled=data.options.ads_enabled,ad_timing=data.options.ad_timing,clientOptionsLoadedEnum="loaded",ads_enabled&&initaliseAfg()}catch(e){clientOptionsLoadedEnum="failed"}},t.open("GET","https://account.y8.com/api/v1/json/client_options/"+idnet_appid,!0),t.send()}else clientOptionsLoadedEnum="failed";else clientOptionsLoadedEnum="failed";else clientOptionsLoadedEnum="failed"}function initaliseAfg(){"loaded"==clientOptionsLoadedEnum&&(initAdDiv(),initAfg())}function canShowAds(){var e=new Date;return!(lastAdTime+1e3*ad_timing>e.getTime())}function getTopDomain(){var e;try{e=window.top.location.href}catch(t){e=document.referrer}return e||(e=window.location.href),e}function showAFG(){(screen.availHeight||screen.height-30)<=window.innerHeight||(requestAndPlayAd=!0,requestAds())}function loadScript(e,t){var n=document.createElement("script");n.type="text/javascript",n.readyState?n.onreadystatechange=function(){"loaded"!=n.readyState&&"complete"!=n.readyState||(n.onreadystatechange=null,t())}:n.onload=function(){t()},n.src=e,document.getElementsByTagName("head")[0].appendChild(n)}function afgLoaded(){init()}function jqueryLoaded(){}function initAfg(){loadScript("//imasdk.googleapis.com/js/sdkloader/ima3.js",afgLoaded)}function initAdDiv(){var e=document.getElementsByClassName("webgl-content")[0],t=document.createElement("div");t.id="adv_mainContainer",e.appendChild(t);var n=document.createElement("div");n.id="adv_content",t.appendChild(n);var a=document.createElement("video");a.id="adv_contentElement",n.appendChild(a);var d=document.createElement("div");d.id="adv_adContainer",n.appendChild(d)}function loadjscssfile(e,t){if("js"==t)(n=document.createElement("script")).setAttribute("type","text/javascript"),n.setAttribute("src",e),alert("called");else if("css"==t){var n;(n=document.createElement("link")).setAttribute("rel","stylesheet"),n.setAttribute("type","text/css"),n.setAttribute("href",e)}void 0!==n&&document.getElementsByTagName("head")[0].appendChild(n)}window.Y8ExternEval=function(e){void 0!==allowGamePause&&(allowGamePause="true"===e),"loaded"==clientOptionsLoadedEnum&&canShowAds()&&(ads_enabled?showAFG():setTimeScale("1"))};var adsManager,adsLoader,adDisplayContainer,intervalTimer,videoContent,domain=getTopDomain();function setTimeScale(e){gameInstance.SendMessage("IDNET(Idnet.cs)","SetAudio",e),allowGamePause&&gameInstance.SendMessage("IDNET(Idnet.cs)","SetTimeScale",e)}function init(){videoContent=document.getElementById("adv_contentElement");var e=document.getElementById("gameContainer")||document.getElementById("unityContainer"),t=e.offsetWidth,n=e.offsetHeight;document.getElementById("adv_mainContainer").style.width=t+"px",document.getElementById("adv_mainContainer").style.height=n+"px",createAdLoader()}function createAdLoader(){createAdDisplayContainer(),(adsLoader=new google.ima.AdsLoader(adDisplayContainer)).addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,onAdsManagerLoaded,!1),adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,onAdError,!1);videoContent.onended=function(){adsLoader.contentComplete()}}function requestAds(){if(canShowAds()){var e=new google.ima.AdsRequest,t=encodeURIComponent(domain);e.adTagUrl="https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_text_image&videoad_start_delay=0&max_ad_duration=30000&hl=en&description_url="+t+"&client=ca-games-pub-6129580795478709&channel="+afg_channel_id;var n=document.getElementById("gameContainer")||document.getElementById("unityContainer"),a=n.offsetWidth,d=n.offsetHeight;e.linearAdSlotWidth=a,e.linearAdSlotHeight=d,e.nonLinearAdSlotWidth=a,e.nonLinearAdSlotHeight=d,e.forceNonLinearFullSlot=!0,adsLoader.requestAds(e)}}function createAdDisplayContainer(){adDisplayContainer=new google.ima.AdDisplayContainer(document.getElementById("adv_adContainer"),videoContent)}function playAds(){if(canShowAds()){videoContent.load(),adDisplayContainer.initialize();try{var e=document.getElementById("gameContainer")||document.getElementById("unityContainer"),t=e.offsetWidth,n=e.offsetHeight;adsManager.init(t,n,google.ima.ViewMode.NORMAL),adsManager.start()}catch(e){videoContent.play()}}}function onAdsManagerLoaded(e){var t=new google.ima.AdsRenderingSettings;t.restoreCustomPlaybackStateOnAdBreakComplete=!0,(adsManager=e.getAdsManager(videoContent,t)).addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,onAdError),adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,onContentPauseRequested),adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,onContentResumeRequested),adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED,onAdEvent),adsManager.addEventListener(google.ima.AdEvent.Type.LOADED,onAdEvent),adsManager.addEventListener(google.ima.AdEvent.Type.STARTED,onAdEvent),adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE,onAdEvent),requestAndPlayAd&&(requestAndPlayAd=!1,playAds())}function onAdEvent(e){var t=e.getAd();switch(e.type){case google.ima.AdEvent.Type.LOADED:t.isLinear()||videoContent.play();break;case google.ima.AdEvent.Type.STARTED:t.isLinear()&&(intervalTimer=setInterval((function(){adsManager.getRemainingTime()}),300));break;case google.ima.AdEvent.Type.COMPLETE:t.isLinear()&&clearInterval(intervalTimer);break}}function onAdError(e){adsManager&&adsManager.destroy(),document.getElementById("adv_mainContainer").style.display="none",setTimeScale("1")}function onContentPauseRequested(){videoContent.pause();var e=new Date;lastAdTime=e.getTime(),setTimeScale("0"),document.getElementById("adv_mainContainer").style.display="block",document.getElementById("adv_adContainer").style.display="block",updateAdPosition()}function onContentResumeRequested(){videoContent.play(),document.getElementById("adv_mainContainer").style.display="none",setTimeScale("1")}function updateAdPosition(){var e=document.getElementById("gameContainer")||document.getElementById("unityContainer"),t=document.getElementById("adv_mainContainer"),n=e.offsetWidth,a=e.offsetHeight;t.style.width=n+"px",t.style.height=a+"px",t.style.top="0px",t.style.left="0px"}