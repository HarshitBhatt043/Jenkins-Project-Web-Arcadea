define((function(n,e,t){"use strict";var i=n("lib/addEvent"),l=n("lib/CustEvent"),o=n("lib/util"),s=l(),r=0;t.exports=function(n){var e=n.getElementsByClassName("button")[0],t=n.getElementsByClassName("text")[0],l=document.getElementById("txtAr"),u={show:function(){n.style.display=""},hide:function(){n.style.display="none"},level:function(n){r=n,t.innerHTML="level "+n},on:function(n,e){s.add(n,e)},off:function(n,e){s.remove(n,e)}};return i(e,"click",(function(){s.fire("start",r)})),o.isAndroid?l.innerHTML="GO":l.innerHTML="▶",u}}));