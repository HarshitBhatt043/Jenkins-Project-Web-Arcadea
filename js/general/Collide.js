define((function(t,e,i){"use strict";var l=t("lib/util"),n={check:function(t,e,i){var n=t.childs(),r=n.length,c=Math.ceil(2*e.rad());for(i=i||1;r--;)if(e!==n[r].ball&&l.getPointDistance(e.pos(),n[r].ball.pos())<=c+Math.ceil(2*i))return!0;return!1}};i.exports=n}));