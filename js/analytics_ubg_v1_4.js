function loadGoogleAnalytics(e){var t=document.getElementsByTagName("script")[0];function a(){dataLayer.push(arguments)}newScript=document.createElement("script"),newScript.async="",newScript.src="https://www.googletagmanager.com/gtag/js?id="+e,t.parentNode.insertBefore(newScript,t),window.dataLayer=window.dataLayer||[],a("js",new Date),a("config",e)}window.addEventListener("load",(function(){navigator.webdriver?loadGoogleAnalytics("G-LE1ZGTPC77"):loadGoogleAnalytics("G-E7D3EVY6HR")}));