"use strict";self.inputPort=null,self.jobQueue=[],self.jobWorkers=[],self.sentBlobs=[],self.sentBuffers=[],self.importedScripts=[],self.lastBroadcasts=new Map;class JobWorker{constructor(e,s){this._port=e,this._number=s,this._isReady=!1,this._isBusy=!1,this._port.onmessage=e=>this._OnMessage(e.data)}ImportScripts(e){this._port.postMessage({type:"_import_scripts",scripts:e})}SendBlob(e,s){this._port.postMessage({type:"_send_blob",blob:e,id:s})}SendBuffer(e,s){this._port.postMessage({type:"_send_buffer",buffer:e,id:s})}SendJob(e){if(this._isBusy||!this._isReady)throw new Error("cannot take job");this._isBusy=!0,this._port.postMessage(e,e.transferables)}_InitBroadcast(e){this._port.postMessage(e,e.transferables)}SendReady(){this._port.postMessage({type:"_ready"})}IsReady(){return this._isReady}_OnReady(){this._isReady=!0,this.MaybeStartNextJob()}IsBusy(){return this._isBusy}GetNumber(){return this._number}_OnMessage(e){switch(e.type){case"ready":return void this._OnReady();case"done":return void this._OnJobDone();default:return}}_OnJobDone(){this._isBusy=!1,this.MaybeStartNextJob()}MaybeStartNextJob(){if(this._isBusy||!this._isReady)return;const e=this._FindAvailableJob();if(-1===e)return;const s=self.jobQueue[e];s.isBroadcast?(s.doneFlags[this._number]=!0,s.doneFlags.every((e=>e))&&self.jobQueue.splice(e,1)):self.jobQueue.splice(e,1),this.SendJob(s)}_FindAvailableJob(){for(let e=0,s=self.jobQueue.length;e<s;++e){const s=self.jobQueue[e];if(!s.isBroadcast||this._number<s.doneFlags.length&&!s.doneFlags[this._number])return e}return-1}TestMessageChannel(){this._port.postMessage({type:"_testMessageChannel"})}}let number=0;function AddJobWorker(e){const s=new JobWorker(e,number++);self.jobWorkers.push(s);for(const[e,t]of self.sentBlobs)s.SendBlob(e,t);for(const[e,t]of self.sentBuffers)s.SendBuffer(e,t);for(const e of self.importedScripts)s.ImportScripts(e);for(const e of self.lastBroadcasts.values())s._InitBroadcast(e);s.SendReady()}function CancelJob(e){for(let s=0,t=self.jobQueue.length;s<t;++s)if(self.jobQueue[s].jobId===e)return void self.jobQueue.splice(s,1)}function OnInputPortMessage(e){const s=e.data,t=s.type;if("_cancel"!==t)if("_import_scripts"!==t)if("_send_blob"!==t)if("_send_buffer"!==t){if("_no_more_workers"===t)return self.sentBlobs.length=0,self.sentBuffers.length=0,self.importedScripts.length=0,void self.lastBroadcasts.clear();if("_testMessageChannel"!==t){self.jobQueue.push(s),s.isBroadcast&&(s.doneFlags=new Array(self.jobWorkers.length).fill(!1),s.transferables=[],self.lastBroadcasts.set(s.type,s));for(const e of self.jobWorkers)e.MaybeStartNextJob()}else self.jobWorkers[0].TestMessageChannel()}else{const e=s.buffer,t=s.id;for(const s of self.jobWorkers)s.SendBuffer(e,t);self.sentBuffers.push([e,t])}else{const e=s.blob,t=s.id;for(const s of self.jobWorkers)s.SendBlob(e,t);self.sentBlobs.push([e,t])}else{const e=s.scripts;for(const s of self.jobWorkers)s.ImportScripts(e);self.importedScripts.push(e)}else CancelJob(s.jobId)}self.addEventListener("message",(e=>{const s=e.data,t=s.type;"_init"===t?(self.inputPort=s["in-port"],self.inputPort.onmessage=OnInputPortMessage):"_addJobWorker"===t&&AddJobWorker(s.port)}));