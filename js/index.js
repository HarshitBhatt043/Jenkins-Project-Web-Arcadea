var app={fontsLoaded:!1,deviceReady:!1,started:!1,initialize:function(){this.bindEvents()},bindEvents:function(){document.addEventListener("deviceready",this.onDeviceReady,!1)},onDeviceReady:function(){setTimeout((function(){navigator.splashscreen.hide()}),100),app.deviceReady=!0,app.startTheGameIfWeCan()},receivedEvent:function(e){},fontsLoaded:function(){app.fontsLoaded=!0,app.startTheGameIfWeCan()},startTheGameIfWeCan:function(){if(app.started)return!1;app.started=!0,Game.init(),Game.start()}};app.initialize();