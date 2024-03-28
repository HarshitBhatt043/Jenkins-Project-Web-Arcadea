var loadTimeData;class LoadTimeData{constructor(){this.data_}set data(t){expect(!this.data_,"Re-setting data."),this.data_=t}valueExists(t){return t in this.data_}getValue(t){expect(this.data_,"No data. Did you remember to include strings.js?");const e=this.data_[t];return expect(void 0!==e,"Could not find value for "+t),e}getString(t){const e=this.getValue(t);return expectIsType(t,e,"string"),e}getStringF(t,e){const a=this.getString(t);if(!a)return"";const n=Array.prototype.slice.call(arguments);return n[0]=a,this.substituteString.apply(this,n)}substituteString(t,e){const a=arguments;return t.replace(/\$(.|$|\n)/g,(function(t){return expect(t.match(/\$[$1-9]/),"Unescaped $ found in localized string."),"$$"===t?"$":a[t[1]]}))}getSubstitutedStringPieces(t,e){const a=arguments;return(t.match(/(\$[1-9])|(([^$]|\$([^1-9]|$))+)/g)||[]).map((function(t){return t.match(/^\$[1-9]$/)?{value:a[t[1]],arg:t}:(expect((t.match(/\$/g)||[]).length%2==0,"Unescaped $ found in localized string."),{value:t.replace(/\$\$/g,"$"),arg:null})}))}getBoolean(t){const e=this.getValue(t);return expectIsType(t,e,"boolean"),e}getInteger(t){const e=this.getValue(t);return expectIsType(t,e,"number"),expect(e===Math.floor(e),"Number isn't integer: "+e),e}overrideValues(t){expect("object"==typeof t,"Replacements must be a dictionary object.");for(const e in t)this.data_[e]=t[e]}resetForTesting(){this.data_={}}}function expect(t,e){if(!t)throw new Error("Unexpected condition on "+document.location.href+": "+e)}function expectIsType(t,e,a){expect(typeof e===a,"["+e+"] ("+t+") is not a "+a)}expect(!loadTimeData,"should only include this file once"),loadTimeData=new LoadTimeData,window.loadTimeData=loadTimeData;