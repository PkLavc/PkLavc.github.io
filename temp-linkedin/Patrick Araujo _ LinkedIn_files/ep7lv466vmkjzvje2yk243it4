"use strict";(()=>{var e=Object.defineProperty,t=(t,s,r)=>(((t,s,r)=>{s in t?e(t,s,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[s]=r})(t,"symbol"!=typeof s?s+"":s,r),r),s=(e,t,s)=>{if(!t.has(e))throw TypeError("Cannot "+s)},r=(e,t,r)=>(s(e,t,"read from private field"),r?r.call(e):t.get(e)),n=(e,t,s)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once")
t instanceof WeakSet?t.add(e):t.set(e,s)},i=(e,t,r,n)=>(s(e,t,"write to private field"),n?n.call(e,r):t.set(e,r),r)
var a,o=()=>{if(!window||"node"!==window.appEnvironment){let e=document.getElementsByName("renderingMode")
return 1!==e.length?null:e[0].getAttribute("data-mode")}return null},h=class{constructor(e,s=!1,r=!1,n){t(this,"type")
t(this,"bubbles")
t(this,"cancelable")
t(this,"target")
t(this,"defaultPrevented")
this.type=e,this.bubbles=s,this.cancelable=r,this.target=n,this.defaultPrevented=void 0}stopPropagation(){}preventDefault(){this.defaultPrevented=!0}},l=class{constructor(){n(this,a,new Map)}dispatchEvent(e){var t
let{type:s}=e
r(this,a).has(s)&&(null==(t=r(this,a).get(s))||t.forEach((t=>{"function"==typeof t?t.call(this,e):t.handleEvent(e)})))}addEventListener(e,t){if(r(this,a).has(e)){let s=r(this,a).get(e)
void 0!==s&&s.push(t)}else r(this,a).set(e,[t])}removeEventListener(e,t){if(r(this,a).has(e)){let s=r(this,a).get(e),n=void 0===s?-1:s.indexOf(t);-1!==n&&(null==s||s.splice(n,1))}}}
a=new WeakMap
function u(){return!!(window&&window.performance&&window.performance.getEntriesByName)}function d(e){if("string"!=typeof e)throw new Error("Expecting to receive a string but got "+typeof e)}var p,c,g,f,w=class{constructor(){t(this,"requestHeaders",{})
t(this,"url")
t(this,"method")
t(this,"data","")
t(this,"async",!0)
t(this,"requestResponseManager")
var e
this.requestResponseManager=null==(e=null==window?void 0:window._bpr)?void 0:e.clientRequestResponseManager}INSPECT(){}attachPostData(e){"POST"===this.method&&(this.data=e,d(this.url),this.url=A(this.url,e))}markFullfillment(){if(u()){d(this.url)
let{start:e,end:t,measure:s}=this.createMarkerNames()
window.performance.getEntriesByName(e).length>0?(window.performance.mark(t),window.performance.measure(s,e,t)):window.jet&&window.jet.error(new Error(`start marker not found: ${e}`),["bpr","perf_measure"],!1)}}emitStartMarker(){if(u()){let{start:e}=this.createMarkerNames()
0===window.performance.getEntriesByName(e).length&&window.performance.mark(e)}}createMarkerNames(){d(this.url)
let e=`mark_bigpipe_${this.url}`
return{measure:`${e}_phase`,start:`${e}_start`,end:`${e}_end`}}},m=new WeakMap,v=class extends w{constructor(e,s,a){super()
n(this,p,0)
n(this,c,new Set)
n(this,g,void 0)
n(this,f,void 0)
t(this,"status",0)
t(this,"readyState",0)
t(this,"response")
t(this,"responseText")
t(this,"responseHeaders")
i(this,g,e),i(this,f,s),this.requestResponseManager=a
for(let e in s)r(this,c).add(e)
let o=["loadstart","load","loadend"]
for(let t of o)e.addEventListener(t,(e=>{let s=`on${t}`,n=r(this,f)[s]
n&&"function"==typeof n&&n.call(e.target,e)}))}getHeader(e){return"Content-Type"===e?"application/json":this.responseHeaders?this.responseHeaders[e]:void 0}getAllHeaders(){return this.readyState<2?"":this.responseHeaders?Object.entries(this.responseHeaders).reduce(((e,t)=>{let[s,r]=t
return e+`${s}: ${r}\r\n`}),"Content-Type: application/json\r\n"):"Content-Type: application/json\r\n"}addEvent(e,t){r(this,g).addEventListener(e,t)}removeEvent(e,t){r(this,g).removeEventListener(e,t)}isKnownKey(e){return r(this,c).has(e)}getState(){return void 0===this.url?0:this.requestResponseManager.hasResponse(this.url)?(i(this,p,2),r(this,p)):I(this.url)||!this.requestResponseManager.isBufferingRequests()?(i(this,p,1),r(this,p)):r(this,p)}open(e,t,s=!0){this.method=e.toUpperCase(),this.url=t,this.async=s,this.readyState=1}setRequestHeader(e,t){this.requestHeaders[e]?this.requestHeaders[e]+=`,${t}`:this.requestHeaders[e]=t}send(){d(this.url),this.emitStartMarker(),this.requestResponseManager.addRequest(this.url,this),this.readyState=1,r(this,g).dispatchEvent(new h("loadstart"))}resolve(){this.send(),this.fulfill(),this.remove()}refire(){i(this,p,1),r(this,f).send(this.data),this.remove()}fulfill(){d(this.url)
let e=this.requestResponseManager.getResponse(this.url)
!function(e){if(!("object"==typeof e&&null!==e&&"url"in e&&"status"in e&&"data"in e))throw new Error(`Expecting to receive a response but got ${typeof e} ${JSON.stringify(e)}`)}(e)
let{status:t,headers:s={},data:r}=e
this.status=t,this.headers(s),this.body(r),this.markFullfillment()}checkRequestBypass(){d(this.method),F(this.method,J(this.method,this.requestHeaders))&&i(this,p,1)}remove(){d(this.url),this.requestResponseManager.removeRequest(this.url,this)}headers(e){this.responseHeaders=e,this.async?this.stateChange(2):this.readyState=2}stateChange(e){this.readyState=e,"function"==typeof r(this,f).onreadystatechange&&r(this,f).onreadystatechange(new h("readystatechange")),r(this,g).dispatchEvent(new h("readystatechange")),4===this.readyState&&r(this,g).dispatchEvent(new h("load",!1,!1,r(this,f))),(0===this.readyState||4===this.readyState)&&r(this,g).dispatchEvent(new h("loadend",!1,!1,r(this,f)))}body(e){this.async&&this.stateChange(3),this.responseText=e,this.response=e,this.async?this.stateChange(4):this.readyState=4}}
p=new WeakMap,c=new WeakMap,g=new WeakMap,f=new WeakMap
var R=e=>new Proxy(XMLHttpRequest,{construct:t=>function(e,t){let s=new l,r=new Proxy(e,{set:(e,t,s)=>(e[t]=s,!0),get(e,t){let s=function(e,t){let s=e[t]
return"function"==typeof s?s.bind(e):s}(e,t)
switch(t){case"getResponseHeader":return function(e,t){return s=>{let r=m.get(e)
return y(r),1===r.getState()?t(s):r.getHeader(s)}}(r,s)
case"getAllResponseHeaders":return function(e,t){return()=>{let s=m.get(e)
return y(s),1===s.getState()?t():s.getAllHeaders()}}(r,s)
case"setRequestHeader":return function(e,t){return(s,r)=>{t(s,r)
let n=m.get(e)
y(n),0===n.getState()&&n.setRequestHeader(s,r)}}(r,s)
case"addEventListener":return function(e,t){return(s,r,n)=>{t(s,r,n)
let i=m.get(e)
y(i),i.addEvent(s,r)}}(r,s)
case"removeEventListener":return function(e,t){return(s,r)=>{t(s,r)
let n=m.get(e)
y(n),n.removeEvent(s,r)}}(r,s)
case"send":return function(e,t){return(s="")=>{let r=m.get(e)
if(y(r),1!==r.readyState&&1!==r.getState())throw new DOMException("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.")
switch(r.checkRequestBypass(),r.attachPostData(s),r.getState()){case 1:t(s)
break
case 2:r.resolve()
break
case 0:r.send()
break
default:return t(s)}}}(r,s)
case"open":return function(e,t){return(s,r,n=!0,i=null,a=null)=>{let o=m.get(e)
y(o),0===o.getState()&&o.open(s,r,n),t(s,r,n,i,a)}}(r,s)
default:return function(e,t,s,r){let n=m.get(e)
y(n)
let i=n.getState(),a=!n.isKnownKey(s)
if(1===i||a)return r
let o=n[s]
if(void 0!==o)return o
let h=t[s]
return function(e){return"function"==typeof e}(h)?0===i?h.bind(t):h.bind(e):r}(r,e,t,s)}}}),n=new v(s,r,t)
return m.set(r,n),r}(new t,e)})
function y(e){if(!(e instanceof v))throw new Error("Expecting a ShadowXHR but got "+typeof e)}var M,b=class{constructor(){n(this,M,void 0)}setup(e){i(this,M,XMLHttpRequest),window.XMLHttpRequest=R(e)}reset(e){window.XMLHttpRequest=r(this,M)}}
M=new WeakMap
function E(e,t){let s=document.querySelector(`meta[name="${e}"]`)
return s&&s.getAttribute("content")||t}var q=E("bigpipeResponseTimeout","12000"),S="string"==typeof q?parseInt(q):q,k=JSON.parse(E("bigpipeDenylistUrls","[]")),P=JSON.parse(E("bigpipeBlacklistUrls","[]"))
k.push(...P)
var H,T,_,L=k.map((e=>new RegExp(e))),$="true"===E("bigpipeFirstLineJsonRecovery","false"),B=class{constructor(e){n(this,H,new Map)
n(this,T,new Map)
n(this,_,!0)
t(this,"debugSentinel")}isBufferingRequests(){return r(this,_)}freeAllRequests(){i(this,_,!1)}hasResponse(e){return r(this,T).has(e)}hasRequest(e){return r(this,H).has(e)}removeRequest(e,t){var s,n
this.hasRequest(e)&&(null==(s=r(this,H).get(e))||s.delete(t),0===(null==(n=r(this,H).get(e))?void 0:n.size)&&r(this,H).delete(e))}addRequest(e,t){var s
r(this,H).has(e)?null==(s=r(this,H).get(e))||s.add(t):r(this,H).set(e,new Set([t]))}getResponse(e){if(this.hasResponse(e))return r(this,T).get(e)}fulfillAllPendingRequests(){for(let[e]of r(this,H))this.fulfillPendingRequestsFor(e)}fulfillPendingRequestsFor(e){var t
if(r(this,H).has(e))for(let s of null!=(t=r(this,H).get(e))?t:[])this.hasResponse(e)&&(s.fulfill(),s.remove())}refirePending(){for(let[e,t]of r(this,H))t.forEach((e=>e.refire())),r(this,T).delete(e)}addResponse(e){let{url:t}=e
r(this,T).set(t,e)}reset(){r(this,H).clear(),r(this,T).clear()}}
H=new WeakMap,T=new WeakMap,_=new WeakMap
var W,N,x,C,O,D,j="mark_data_streaming"
W=new WeakMap,N=new WeakMap,x=new WeakMap,C=new WeakMap,O=new WeakMap,D=new WeakMap
function A(e,t){return t?`${e};${t}`:e}var I=e=>L.some((t=>t.test(e))),F=(e,t)=>"GET"!==e&&!t,J=(e,t={})=>"POST"===e&&"GET"===t["x-http-method-override"]
window._bpr=class{constructor(e){n(this,W,!1)
n(this,N,!1)
n(this,x,!1)
n(this,C,!1)
t(this,"requestResponseManager")
n(this,O,setTimeout((()=>{this.handleResponseTimeout()}),S))
n(this,D,[])
this.requestResponseManager=e,this.registerTransport(new b),this.attachDataletEventListener()}static create(){return new this(new B)}get isTerminated(){return r(this,N)}get isRendered(){return r(this,x)}get isLoaded(){return r(this,C)}getRenderMode(){return o()}isBigPipeMode(){return(()=>{let e=o()
return null!==e&&["BIGPIPE","SSRPIPE"].includes(e)})()}response(e){let t
t="object"!=typeof e?function(e,t){try{return JSON.parse(e)}catch(s){if(t){let t=null==e?void 0:e.split("\n")[0]
return JSON.parse(t)}throw s}}(this.getResponseData(e),$):e
let{request:s}=t,{status:r,body:n,headers:i={}}=t,a=this.getResponseData(n)
t.method&&"POST"===t.method&&(s=A(s,t.encodedRequestBody))
let o={url:s,status:r,headers:i,data:a}
this.requestResponseManager.addResponse(o),this.requestResponseManager.fulfillPendingRequestsFor(s)}done(){if(r(this,N))throw new Error("Terminator cannot be called multiple times.")
i(this,N,!0),this.requestResponseManager.freeAllRequests(),this.clearResponseTimer(),this.requestResponseManager.fulfillAllPendingRequests(),this.requestResponseManager.refirePending(),r(this,x)&&this.reset()}rendered(){if(r(this,x))throw new Error("Initial page render cannot be called multiple times.")
i(this,x,!0),r(this,N)&&this.reset()}registerTransport(e){r(this,D).indexOf(e)<0&&(r(this,D).push(e),e.setup(this.requestResponseManager))}get clientRequestResponseManager(){return this.requestResponseManager}measureStreamingStart(){!1===r(this,W)&&(i(this,W,!0),u()&&window.performance.mark(`${j}_start`))}measureStreamingEnd(){if(u()){let e=`${j}_start`,t=`${j}_end`,s=`${j}_phase`
window.performance.getEntriesByName(e).length>0&&(window.performance.mark(t),window.performance.measure(s,e,t))}}attachDataletEventListener(){let e="datalet-bpr-guid",t=s=>{let r=s.target
if(r instanceof Element&&"IMG"===r.tagName){let s=r.classList
s=s||[],1===s.length&&s[0].substring(0,16)===e&&(this.measureStreamingStart(),this.response(s[0])),1===s.length&&"terminatorlet"===s[0]&&(this.measureStreamingEnd(),this.done(),document.removeEventListener("load",t,!0))}}
document.addEventListener("load",t,!0)}getResponseData(e){var t
let s=document.getElementById(e),r="{}"
return s&&(s.normalize(),r=(null==(t=s.firstChild)?void 0:t.nodeValue)||""),r}handleResponseTimeout(){console.info(`Terminator datalet is not seen within ${q} ms.`)}reset(){if(r(this,C))throw new Error("Bigpipe Client cannot be reset multiple times.")
this.requestResponseManager.reset(),i(this,C,!0),r(this,D).forEach((e=>e.reset(this.requestResponseManager)))}clearResponseTimer(){r(this,O)&&clearTimeout(r(this,O))}}.create()
window._bigpipeClient=window._bpr
window._getRenderMode=window._bpr.getRenderMode.bind(window._bpr)
window._isBigPipeMode=window._bpr.isBigPipeMode.bind(window._bpr)})()

//# sourceMappingURL=bigpipe-v2.min.map