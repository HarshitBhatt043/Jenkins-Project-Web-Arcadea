define((function(t,e,n){var o=t("lib/util"),i={click:"touchstart",mousedown:"touchstart",mouseup:"touchend"};n.exports=function(t,e,n,a){t.addEventListener?t.addEventListener(o.isMobile&&i[e]||e,n,a):t.attachEvent?t.attachEvent("on"+e,n):t["on"+e]=n}}));