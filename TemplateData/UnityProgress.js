const rootPath="TemplateData";function UnityProgress(e,t){e.Module&&(e.logo||(e.logo=document.createElement("div"),e.logo.className="logo "+e.Module.splashScreenStyle,e.container.appendChild(e.logo)),e.progress||(e.progress=document.createElement("div"),e.progress.className="progress "+e.Module.splashScreenStyle,e.progress.empty=document.createElement("div"),e.progress.empty.className="empty",e.progress.appendChild(e.progress.empty),e.progress.full=document.createElement("div"),e.progress.full.className="full",e.progress.appendChild(e.progress.full),e.container.appendChild(e.progress),e.textProgress=document.createElement("div"),e.textProgress.className="text",e.container.appendChild(e.textProgress)),e.progress.full.style.width=100*t+"%",e.progress.empty.style.width=100*(1-t)+"%",t>=.9&&t<1?(e.textProgress.innerHTML='100% - Running, Wait.. <img src="TemplateData/gears.gif" class="spinner" />',e.progress.style.display="none"):e.textProgress.innerHTML="Loading - "+Math.floor(100*t)+'% <img src="'+rootPath+'/gears.gif" class="spinner" />',"complete"==t&&(SendMessage=e.SendMessage,e.logo.style.display="none",e.progress.style.display="none",e.textProgress.style.display="none"))}window.Game=function(){var e=function(){this.registerEvents()};e.prototype.registerEvents=function(){var e=this;window.addEventListener("keydown",(function(e){[8,37,38,39,40].indexOf(e.keyCode)>-1&&e.preventDefault()}),!1),document.onmousedown=function(){window.focus()},document.addEventListener("DOMContentLoaded",(function(){e.resize()}),!1),window.addEventListener("resize",(function(){setTimeout((function(){e.resize()}),1e3)}),!1)},e.prototype.getQueryVariable=function(e){for(var t=window.location.search.substring(1).split("&"),n=0;n<t.length;n++){var s=t[n].split("=");if(s[0]==e)return s[1]}return!1};return e.prototype.resize=function(){var e=this.getQueryVariable("ratio_tolerant");if(!this.fullscreen()){document.getElementsByTagName("body")[0].style.overflow="hidden";var t=document.getElementById("gameContainer"),n=document.getElementById("#canvas"),s=t.offsetWidth/t.offsetHeight,o=this.maxHeight(),r=window.innerWidth,i=r/o,l={width:t.offsetWidth,height:t.offsetHeight};"true"==e?l={width:r,height:o}:"false"==e&&(l=s>i?{width:r,height:r/s}:{width:o*s,height:o}),l={width:r,height:o},this.updateStyle(t,l),n&&this.updateStyle(n,l)}},e.prototype.maxHeight=function(){return window.innerHeight-43},e.prototype.updateStyle=function(e,t){e.setAttribute("width",t.width),e.setAttribute("height",t.height),e.style.width=t.width+"px",e.style.height=t.height+"px"},e.prototype.fullscreen=function(){return document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement},e}(),new Game;