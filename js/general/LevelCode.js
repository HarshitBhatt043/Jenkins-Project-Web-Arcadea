define((function(n,e,r){"use strict";var o,i=n("lib/md5"),t={};for(o=1;o<=60;o++)t[i(o+"Handsome")]=o;r.exports={encode:function(n){var e;for(e in t)if(t[e]==n)return e},decode:function(n){return t[n]}}}));