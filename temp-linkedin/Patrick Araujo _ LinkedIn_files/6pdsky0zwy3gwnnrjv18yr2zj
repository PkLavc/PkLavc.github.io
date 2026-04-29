define("media-player",["exports"],(function(e){"use strict"
function t(e,t){var i=Object.keys(e)
if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e)
t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function i(e){for(var i=1;i<arguments.length;i++){var n=null!=arguments[i]?arguments[i]:{}
i%2?t(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):t(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function n(){n=function(){return e}
var e={},t=Object.prototype,i=t.hasOwnProperty,r=Object.defineProperty||function(e,t,i){e[t]=i.value},a="function"==typeof Symbol?Symbol:{},s=a.iterator||"@@iterator",o=a.asyncIterator||"@@asyncIterator",u=a.toStringTag||"@@toStringTag"
function l(e,t,i){return Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(e){l=function(e,t,i){return e[t]=i}}function c(e,t,i,n){var a=t&&t.prototype instanceof p?t:p,s=Object.create(a.prototype),o=new w(n||[])
return r(s,"_invoke",{value:S(e,i,o)}),s}function d(e,t,i){try{return{type:"normal",arg:e.call(t,i)}}catch(e){return{type:"throw",arg:e}}}e.wrap=c
var h={}
function p(){}function f(){}function m(){}var g={}
l(g,s,(function(){return this}))
var v=Object.getPrototypeOf,y=v&&v(v(I([])))
y&&y!==t&&i.call(y,s)&&(g=y)
var _=m.prototype=p.prototype=Object.create(g)
function b(e){["next","throw","return"].forEach((function(t){l(e,t,(function(e){return this._invoke(t,e)}))}))}function T(e,t){function n(r,a,s,o){var u=d(e[r],e,a)
if("throw"!==u.type){var l=u.arg,c=l.value
return c&&"object"==typeof c&&i.call(c,"__await")?t.resolve(c.__await).then((function(e){n("next",e,s,o)}),(function(e){n("throw",e,s,o)})):t.resolve(c).then((function(e){l.value=e,s(l)}),(function(e){return n("throw",e,s,o)}))}o(u.arg)}var a
r(this,"_invoke",{value:function(e,i){function r(){return new t((function(t,r){n(e,i,t,r)}))}return a=a?a.then(r,r):r()}})}function S(e,t,i){var n="suspendedStart"
return function(r,a){if("executing"===n)throw new Error("Generator is already running")
if("completed"===n){if("throw"===r)throw a
return P()}for(i.method=r,i.arg=a;;){var s=i.delegate
if(s){var o=k(s,i)
if(o){if(o===h)continue
return o}}if("next"===i.method)i.sent=i._sent=i.arg
else if("throw"===i.method){if("suspendedStart"===n)throw n="completed",i.arg
i.dispatchException(i.arg)}else"return"===i.method&&i.abrupt("return",i.arg)
n="executing"
var u=d(e,t,i)
if("normal"===u.type){if(n=i.done?"completed":"suspendedYield",u.arg===h)continue
return{value:u.arg,done:i.done}}"throw"===u.type&&(n="completed",i.method="throw",i.arg=u.arg)}}}function k(e,t){var i=t.method,n=e.iterator[i]
if(void 0===n)return t.delegate=null,"throw"===i&&e.iterator.return&&(t.method="return",t.arg=void 0,k(e,t),"throw"===t.method)||"return"!==i&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+i+"' method")),h
var r=d(n,e.iterator,t.arg)
if("throw"===r.type)return t.method="throw",t.arg=r.arg,t.delegate=null,h
var a=r.arg
return a?a.done?(t[e.resultName]=a.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,h):a:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,h)}function E(e){var t={tryLoc:e[0]}
1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function C(e){var t=e.completion||{}
t.type="normal",delete t.arg,e.completion=t}function w(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(E,this),this.reset(!0)}function I(e){if(e){var t=e[s]
if(t)return t.call(e)
if("function"==typeof e.next)return e
if(!isNaN(e.length)){var n=-1,r=function t(){for(;++n<e.length;)if(i.call(e,n))return t.value=e[n],t.done=!1,t
return t.value=void 0,t.done=!0,t}
return r.next=r}}return{next:P}}function P(){return{value:void 0,done:!0}}return f.prototype=m,r(_,"constructor",{value:m,configurable:!0}),r(m,"constructor",{value:f,configurable:!0}),f.displayName=l(m,u,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor
return!!t&&(t===f||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,m):(e.__proto__=m,l(e,u,"GeneratorFunction")),e.prototype=Object.create(_),e},e.awrap=function(e){return{__await:e}},b(T.prototype),l(T.prototype,o,(function(){return this})),e.AsyncIterator=T,e.async=function(t,i,n,r,a){void 0===a&&(a=Promise)
var s=new T(c(t,i,n,r),a)
return e.isGeneratorFunction(i)?s:s.next().then((function(e){return e.done?e.value:s.next()}))},b(_),l(_,u,"Generator"),l(_,s,(function(){return this})),l(_,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=Object(e),i=[]
for(var n in t)i.push(n)
return i.reverse(),function e(){for(;i.length;){var n=i.pop()
if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},e.values=I,w.prototype={constructor:w,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(C),!e)for(var t in this)"t"===t.charAt(0)&&i.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0
var e=this.tryEntries[0].completion
if("throw"===e.type)throw e.arg
return this.rval},dispatchException:function(e){if(this.done)throw e
var t=this
function n(i,n){return s.type="throw",s.arg=e,t.next=i,n&&(t.method="next",t.arg=void 0),!!n}for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r],s=a.completion
if("root"===a.tryLoc)return n("end")
if(a.tryLoc<=this.prev){var o=i.call(a,"catchLoc"),u=i.call(a,"finallyLoc")
if(o&&u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)
if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(o){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally")
if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n]
if(r.tryLoc<=this.prev&&i.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var a=r
break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null)
var s=a?a.completion:{}
return s.type=e,s.arg=t,a?(this.method="next",this.next=a.finallyLoc,h):this.complete(s)},complete:function(e,t){if("throw"===e.type)throw e.arg
return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),h},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var i=this.tryEntries[t]
if(i.finallyLoc===e)return this.complete(i.completion,i.afterLoc),C(i),h}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var i=this.tryEntries[t]
if(i.tryLoc===e){var n=i.completion
if("throw"===n.type){var r=n.arg
C(i)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,i){return this.delegate={iterator:I(e),resultName:t,nextLoc:i},"next"===this.method&&(this.arg=void 0),h}},e}function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function a(e,t,i,n,r,a,s){try{var o=e[a](s),u=o.value}catch(e){i(e)
return}o.done?t(u):Promise.resolve(u).then(n,r)}function s(e){return function(){var t=this,i=arguments
return new Promise((function(n,r){var s=e.apply(t,i)
function o(e){a(s,n,r,o,u,"next",e)}function u(e){a(s,n,r,o,u,"throw",e)}o(void 0)}))}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){for(var i=0;i<t.length;i++){var n=t[i]
n.enumerable=n.enumerable||!1
n.configurable=!0
"value"in n&&(n.writable=!0)
Object.defineProperty(e,S(n.key),n)}}function l(e,t,i){t&&u(e.prototype,t)
i&&u(e,i)
Object.defineProperty(e,"prototype",{writable:!1})
return e}function c(e,t,i){(t=S(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i
return e}function d(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}})
Object.defineProperty(e,"prototype",{writable:!1})
t&&p(e,t)}function h(e){h=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)}
return h(e)}function p(e,t){p=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){e.__proto__=t
return e}
return p(e,t)}function f(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}function m(e,t){if(t&&("object"==typeof t||"function"==typeof t))return t
if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined")
return f(e)}function g(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))
return!0}catch(e){return!1}}()
return function(){var i,n=h(e)
if(t){var r=h(this).constructor
i=Reflect.construct(n,arguments,r)}else i=n.apply(this,arguments)
return m(this,i)}}function v(){v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,i){var n=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=h(e)););return e}(e,t)
if(n){var r=Object.getOwnPropertyDescriptor(n,t)
return r.get?r.get.call(arguments.length<3?e:i):r.value}}
return v.apply(this,arguments)}function y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var i=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]
if(null!=i){var n,r,a,s,o=[],u=!0,l=!1
try{if(a=(i=i.call(e)).next,0===t){if(Object(i)!==i)return
u=!1}else for(;!(u=(n=a.call(i)).done)&&(o.push(n.value),o.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{if(!u&&null!=i.return&&(s=i.return(),Object(s)!==s))return}finally{if(l)throw r}}return o}}(e,t)||b(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(e){return function(e){if(Array.isArray(e))return T(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||b(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){if(e){if("string"==typeof e)return T(e,t)
var i=Object.prototype.toString.call(e).slice(8,-1)
"Object"===i&&e.constructor&&(i=e.constructor.name)
return"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?T(e,t):void 0}}function T(e,t){(null==t||t>e.length)&&(t=e.length)
for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i]
return n}function S(e){var t=function(e,t){if("object"!=typeof e||null===e)return e
var i=e[Symbol.toPrimitive]
if(void 0!==i){var n=i.call(e,t||"default")
if("object"!=typeof n)return n
throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string")
return"symbol"==typeof t?t:String(t)}var k="undefined"!=typeof window&&window&&"node"!==window.appEnvironment
k&&(window.VIDEOJS_NO_DYNAMIC_STYLE=!0)
var E="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{}
function C(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function w(e,t){return e(t={exports:{}},t.exports),t.exports}var I,P,x="undefined"!=typeof window?window:void 0!==E?E:"undefined"!=typeof self?self:{},A=(I=Object.freeze({__proto__:null,default:{}}))&&I.default||I,O=void 0!==E?E:"undefined"!=typeof window?window:{}
"undefined"!=typeof document?P=document:(P=O["__GLOBAL_DOCUMENT_CACHE@4"])||(P=O["__GLOBAL_DOCUMENT_CACHE@4"]=A)
var L=P,D=w((function(e){function t(){e.exports=t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t]
for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e}
e.exports.default=e.exports,e.exports.__esModule=!0
return t.apply(this,arguments)}e.exports=t
e.exports.default=e.exports,e.exports.__esModule=!0})),R=C(D),M=w((function(e,t){function i(e){if(e&&"object"==typeof e){var t=e.which||e.keyCode||e.charCode
t&&(e=t)}if("number"==typeof e)return s[e]
var i,a=String(e)
return(i=n[a.toLowerCase()])?i:(i=r[a.toLowerCase()])||(1===a.length?a.charCodeAt(0):void 0)}i.isEventKey=function(e,t){if(e&&"object"==typeof e){var i=e.which||e.keyCode||e.charCode
if(null==i)return!1
if("string"==typeof t){var a
if(a=n[t.toLowerCase()])return a===i
if(a=r[t.toLowerCase()])return a===i}else if("number"==typeof t)return t===i
return!1}}
var n=(t=e.exports=i).code=t.codes={backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,"pause/break":19,"caps lock":20,esc:27,space:32,"page up":33,"page down":34,end:35,home:36,left:37,up:38,right:39,down:40,insert:45,delete:46,command:91,"left command":91,"right command":93,"numpad *":106,"numpad +":107,"numpad -":109,"numpad .":110,"numpad /":111,"num lock":144,"scroll lock":145,"my computer":182,"my calculator":183,";":186,"=":187,",":188,"-":189,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'":222},r=t.aliases={windows:91,"⇧":16,"⌥":18,"⌃":17,"⌘":91,ctl:17,control:17,option:18,pause:19,break:19,caps:20,return:13,escape:27,spc:32,spacebar:32,pgup:33,pgdn:34,ins:45,del:46,cmd:91}

;/*!
   * Programatically add the following
   */
for(a=97;a<123;a++)n[String.fromCharCode(a)]=a-32
for(var a=48;a<58;a++)n[a-48]=a
for(a=1;a<13;a++)n["f"+a]=a+111
for(a=0;a<10;a++)n["numpad "+a]=a+96
var s=t.names=t.title={}
for(a in n)s[n[a]]=a
for(var o in r)n[o]=r[o]})),N=(M.code,M.codes,M.aliases,M.names,M.title,C(w((function(e){e.exports=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}
e.exports.default=e.exports,e.exports.__esModule=!0})))),U=w((function(e){function t(i,n){e.exports=t=Object.setPrototypeOf||function(e,t){e.__proto__=t
return e}
e.exports.default=e.exports,e.exports.__esModule=!0
return t(i,n)}e.exports=t
e.exports.default=e.exports,e.exports.__esModule=!0}))
C(U)
var B=C(w((function(e){e.exports=function(e,t){e.prototype=Object.create(t.prototype)
e.prototype.constructor=e
U(e,t)}
e.exports.default=e.exports,e.exports.__esModule=!0}))),F=function(e,t){var i,n=null
try{i=JSON.parse(e,t)}catch(e){n=e}return[n,i]}
var j=function(e){if(!e)return!1
var t=V.call(e)
return"[object Function]"===t||"function"==typeof e&&"[object RegExp]"!==t||"undefined"!=typeof window&&(e===window.setTimeout||e===window.alert||e===window.confirm||e===window.prompt)},V=Object.prototype.toString
var H=function(e,t){void 0===t&&(t=!1)
return function(i,n,r){if(i)e(i)
else if(n.statusCode>=400&&n.statusCode<=599){var a=r
if(t)if(x.TextDecoder){var s=function(e){void 0===e&&(e="")
return e.toLowerCase().split(";").reduce((function(e,t){var i=t.split("="),n=i[0],r=i[1]
return"charset"===n.trim()?r.trim():e}),"utf-8")}(n.headers&&n.headers["content-type"])
try{a=new TextDecoder(s).decode(r)}catch(e){}}else a=String.fromCharCode.apply(null,new Uint8Array(r))
e({cause:a})}else e(null,r)}}
K.httpHandler=H

;/**
   * @license
   * slighly modified parse-headers 2.0.2 <https://github.com/kesla/parse-headers/>
   * Copyright (c) 2014 David Björklund
   * Available under the MIT license
   * <https://github.com/kesla/parse-headers/blob/master/LICENCE>
   */var q=function(e){var t={}
if(!e)return t
e.trim().split("\n").forEach((function(e){var i=e.indexOf(":"),n=e.slice(0,i).trim().toLowerCase(),r=e.slice(i+1).trim()
void 0===t[n]?t[n]=r:Array.isArray(t[n])?t[n].push(r):t[n]=[t[n],r]}))
return t},W=K,G=K
K.XMLHttpRequest=x.XMLHttpRequest||function(){}
K.XDomainRequest="withCredentials"in new K.XMLHttpRequest?K.XMLHttpRequest:x.XDomainRequest
!function(e,t){for(var i=0;i<e.length;i++)t(e[i])}(["get","put","post","patch","head","delete"],(function(e){K["delete"===e?"del":e]=function(t,i,n){(i=z(t,i,n)).method=e.toUpperCase()
return X(i)}}))
function z(e,t,i){var n=e
if(j(t)){i=t
"string"==typeof e&&(n={uri:e})}else n=D({},t,{uri:e})
n.callback=i
return n}function K(e,t,i){return X(t=z(e,t,i))}function X(e){if(void 0===e.callback)throw new Error("callback argument missing")
var t=!1,i=function(i,n,r){if(!t){t=!0
e.callback(i,n,r)}}
function n(){var e=void 0
e=u.response?u.response:u.responseText||function(e){try{if("document"===e.responseType)return e.responseXML
var t=e.responseXML&&"parsererror"===e.responseXML.documentElement.nodeName
if(""===e.responseType&&!t)return e.responseXML}catch(e){}return null}(u)
if(m)try{e=JSON.parse(e)}catch(e){}return e}function r(e){clearTimeout(l)
e instanceof Error||(e=new Error(""+(e||"Unknown XMLHttpRequest Error")))
e.statusCode=0
return i(e,g)}function a(){if(!o){var t
clearTimeout(l)
t=e.useXDR&&void 0===u.status?200:1223===u.status?204:u.status
var r=g,a=null
if(0!==t){r={body:n(),statusCode:t,method:d,headers:{},url:c,rawRequest:u}
u.getAllResponseHeaders&&(r.headers=q(u.getAllResponseHeaders()))}else a=new Error("Internal XMLHttpRequest Error")
return i(a,r,r.body)}}var s,o,u=e.xhr||null
u||(u=e.cors||e.useXDR?new K.XDomainRequest:new K.XMLHttpRequest)
var l,c=u.url=e.uri||e.url,d=u.method=e.method||"GET",h=e.body||e.data,p=u.headers=e.headers||{},f=!!e.sync,m=!1,g={body:void 0,headers:{},statusCode:0,method:d,url:c,rawRequest:u}
if("json"in e&&!1!==e.json){m=!0
p.accept||p.Accept||(p.Accept="application/json")
if("GET"!==d&&"HEAD"!==d){p["content-type"]||p["Content-Type"]||(p["Content-Type"]="application/json")
h=JSON.stringify(!0===e.json?h:e.json)}}u.onreadystatechange=function(){4===u.readyState&&setTimeout(a,0)}
u.onload=a
u.onerror=r
u.onprogress=function(){}
u.onabort=function(){o=!0}
u.ontimeout=r
u.open(d,c,!f,e.username,e.password)
f||(u.withCredentials=!!e.withCredentials)
!f&&e.timeout>0&&(l=setTimeout((function(){if(!o){o=!0
u.abort("timeout")
var e=new Error("XMLHttpRequest timeout")
e.code="ETIMEDOUT"
r(e)}}),e.timeout))
if(u.setRequestHeader)for(s in p)p.hasOwnProperty(s)&&u.setRequestHeader(s,p[s])
else if(e.headers&&!function(e){for(var t in e)if(e.hasOwnProperty(t))return!1
return!0}(e.headers))throw new Error("Headers cannot be set on an XDomainRequest object")
"responseType"in e&&(u.responseType=e.responseType)
"beforeSend"in e&&"function"==typeof e.beforeSend&&e.beforeSend(u)
u.send(h||null)
return u}W.default=G
var Y=Object.create||function(){function e(){}return function(t){if(1!==arguments.length)throw new Error("Object.create shim only accepts one parameter.")
e.prototype=t
return new e}}()
function Q(e,t){this.name="ParsingError"
this.code=e.code
this.message=t||e.message}Q.prototype=Y(Error.prototype)
Q.prototype.constructor=Q
Q.Errors={BadSignature:{code:0,message:"Malformed WebVTT signature."},BadTimeStamp:{code:1,message:"Malformed time stamp."}}
function $(e){function t(e,t,i,n){return 3600*(0|e)+60*(0|t)+(0|i)+(0|n)/1e3}var i=e.match(/^(\d+):(\d{1,2})(:\d{1,2})?\.(\d{3})/)
return i?i[3]?t(i[1],i[2],i[3].replace(":",""),i[4]):i[1]>59?t(i[1],i[2],0,i[4]):t(0,i[1],i[2],i[4]):null}function J(){this.values=Y(null)}J.prototype={set:function(e,t){this.get(e)||""===t||(this.values[e]=t)},get:function(e,t,i){return i?this.has(e)?this.values[e]:t[i]:this.has(e)?this.values[e]:t},has:function(e){return e in this.values},alt:function(e,t,i){for(var n=0;n<i.length;++n)if(t===i[n]){this.set(e,t)
break}},integer:function(e,t){/^-?\d+$/.test(t)&&this.set(e,parseInt(t,10))},percent:function(e,t){if(t.match(/^([\d]{1,3})(\.[\d]*)?%$/)&&(t=parseFloat(t))>=0&&t<=100){this.set(e,t)
return!0}return!1}}
function Z(e,t,i,n){var r=n?e.split(n):[e]
for(var a in r)if("string"==typeof r[a]){var s=r[a].split(i)
if(2===s.length){t(s[0],s[1])}}}function ee(e,t,i){var n=e
function r(){var t=$(e)
if(null===t)throw new Q(Q.Errors.BadTimeStamp,"Malformed timestamp: "+n)
e=e.replace(/^[^\sa-zA-Z-]+/,"")
return t}function a(){e=e.replace(/^\s+/,"")}a()
t.startTime=r()
a()
if("--\x3e"!==e.substr(0,3))throw new Q(Q.Errors.BadTimeStamp,"Malformed time stamp (time stamps must be separated by '--\x3e'): "+n)
e=e.substr(3)
a()
t.endTime=r()
a()
!function(e,t){var n=new J
Z(e,(function(e,t){switch(e){case"region":for(var r=i.length-1;r>=0;r--)if(i[r].id===t){n.set(e,i[r].region)
break}break
case"vertical":n.alt(e,t,["rl","lr"])
break
case"line":var a=t.split(","),s=a[0]
n.integer(e,s)
n.percent(e,s)&&n.set("snapToLines",!1)
n.alt(e,s,["auto"])
2===a.length&&n.alt("lineAlign",a[1],["start","center","end"])
break
case"position":a=t.split(",")
n.percent(e,a[0])
2===a.length&&n.alt("positionAlign",a[1],["start","center","end"])
break
case"size":n.percent(e,t)
break
case"align":n.alt(e,t,["start","center","end","left","right"])}}),/:/,/\s/)
t.region=n.get("region",null)
t.vertical=n.get("vertical","")
try{t.line=n.get("line","auto")}catch(e){}t.lineAlign=n.get("lineAlign","start")
t.snapToLines=n.get("snapToLines",!0)
t.size=n.get("size",100)
try{t.align=n.get("align","center")}catch(e){t.align=n.get("align","middle")}try{t.position=n.get("position","auto")}catch(e){t.position=n.get("position",{start:0,left:0,center:50,middle:50,end:100,right:100},t.align)}t.positionAlign=n.get("positionAlign",{start:"start",left:"start",center:"center",middle:"center",end:"end",right:"end"},t.align)}(e,t)}var te=L.createElement&&L.createElement("textarea"),ie={c:"span",i:"i",b:"b",u:"u",ruby:"ruby",rt:"rt",v:"span",lang:"span"},ne={white:"rgba(255,255,255,1)",lime:"rgba(0,255,0,1)",cyan:"rgba(0,255,255,1)",red:"rgba(255,0,0,1)",yellow:"rgba(255,255,0,1)",magenta:"rgba(255,0,255,1)",blue:"rgba(0,0,255,1)",black:"rgba(0,0,0,1)"},re={v:"title",lang:"lang"},ae={rt:"ruby"}
function se(e,t){function i(){if(!t)return null
var e=t.match(/^([^<]*)(<[^>]*>?)?/)
return function(e){t=t.substr(e.length)
return e}(e[1]?e[1]:e[2])}function n(e){te.innerHTML=e
e=te.textContent
te.textContent=""
return e}function r(e,t){return!ae[t.localName]||ae[t.localName]===e.localName}function a(t,i){var n=ie[t]
if(!n)return null
var r=e.document.createElement(n),a=re[t]
a&&i&&(r[a]=i.trim())
return r}for(var s,o=e.document.createElement("div"),u=o,l=[];null!==(s=i());)if("<"!==s[0])u.appendChild(e.document.createTextNode(n(s)))
else{if("/"===s[1]){if(l.length&&l[l.length-1]===s.substr(2).replace(">","")){l.pop()
u=u.parentNode}continue}var c,d=$(s.substr(1,s.length-2))
if(d){c=e.document.createProcessingInstruction("timestamp",d)
u.appendChild(c)
continue}var h=s.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/)
if(!h)continue
if(!(c=a(h[1],h[3])))continue
if(!r(u,c))continue
if(h[2]){var p=h[2].split(".")
p.forEach((function(e){var t=/^bg_/.test(e),i=t?e.slice(3):e
if(ne.hasOwnProperty(i)){var n=t?"background-color":"color",r=ne[i]
c.style[n]=r}}))
c.className=p.join(" ")}l.push(h[1])
u.appendChild(c)
u=c}return o}var oe=[[1470,1470],[1472,1472],[1475,1475],[1478,1478],[1488,1514],[1520,1524],[1544,1544],[1547,1547],[1549,1549],[1563,1563],[1566,1610],[1645,1647],[1649,1749],[1765,1766],[1774,1775],[1786,1805],[1807,1808],[1810,1839],[1869,1957],[1969,1969],[1984,2026],[2036,2037],[2042,2042],[2048,2069],[2074,2074],[2084,2084],[2088,2088],[2096,2110],[2112,2136],[2142,2142],[2208,2208],[2210,2220],[8207,8207],[64285,64285],[64287,64296],[64298,64310],[64312,64316],[64318,64318],[64320,64321],[64323,64324],[64326,64449],[64467,64829],[64848,64911],[64914,64967],[65008,65020],[65136,65140],[65142,65276],[67584,67589],[67592,67592],[67594,67637],[67639,67640],[67644,67644],[67647,67669],[67671,67679],[67840,67867],[67872,67897],[67903,67903],[67968,68023],[68030,68031],[68096,68096],[68112,68115],[68117,68119],[68121,68147],[68160,68167],[68176,68184],[68192,68223],[68352,68405],[68416,68437],[68440,68466],[68472,68479],[68608,68680],[126464,126467],[126469,126495],[126497,126498],[126500,126500],[126503,126503],[126505,126514],[126516,126519],[126521,126521],[126523,126523],[126530,126530],[126535,126535],[126537,126537],[126539,126539],[126541,126543],[126545,126546],[126548,126548],[126551,126551],[126553,126553],[126555,126555],[126557,126557],[126559,126559],[126561,126562],[126564,126564],[126567,126570],[126572,126578],[126580,126583],[126585,126588],[126590,126590],[126592,126601],[126603,126619],[126625,126627],[126629,126633],[126635,126651],[1114109,1114109]]
function ue(e){for(var t=0;t<oe.length;t++){var i=oe[t]
if(e>=i[0]&&e<=i[1])return!0}return!1}function le(e){var t=[],i=""
if(!e||!e.childNodes)return"ltr"
function n(e,t){for(var i=t.childNodes.length-1;i>=0;i--)e.push(t.childNodes[i])}function r(e){if(!e||!e.length)return null
var t=e.pop(),i=t.textContent||t.innerText
if(i){var a=i.match(/^.*(\n|\r)/)
if(a){e.length=0
return a[0]}return i}if("ruby"===t.tagName)return r(e)
if(t.childNodes){n(e,t)
return r(e)}}n(t,e)
for(;i=r(t);)for(var a=0;a<i.length;a++)if(ue(i.charCodeAt(a)))return"rtl"
return"ltr"}function ce(){}ce.prototype.applyStyles=function(e,t){t=t||this.div
for(var i in e)e.hasOwnProperty(i)&&(t.style[i]=e[i])}
ce.prototype.formatStyle=function(e,t){return 0===e?0:e+t}
function de(e,t,i){ce.call(this)
this.cue=t
this.cueDiv=se(e,t.text)
var n={color:"rgba(255, 255, 255, 1)",backgroundColor:"rgba(0, 0, 0, 0.8)",position:"relative",left:0,right:0,top:0,bottom:0,display:"inline",writingMode:""===t.vertical?"horizontal-tb":"lr"===t.vertical?"vertical-lr":"vertical-rl",unicodeBidi:"plaintext"}
this.applyStyles(n,this.cueDiv)
this.div=e.document.createElement("div")
n={direction:le(this.cueDiv),writingMode:""===t.vertical?"horizontal-tb":"lr"===t.vertical?"vertical-lr":"vertical-rl",unicodeBidi:"plaintext",textAlign:"middle"===t.align?"center":t.align,font:i.font,whiteSpace:"pre-line",position:"absolute"}
this.applyStyles(n)
this.div.appendChild(this.cueDiv)
var r=0
switch(t.positionAlign){case"start":r=t.position
break
case"center":r=t.position-t.size/2
break
case"end":r=t.position-t.size}""===t.vertical?this.applyStyles({left:this.formatStyle(r,"%"),width:this.formatStyle(t.size,"%")}):this.applyStyles({top:this.formatStyle(r,"%"),height:this.formatStyle(t.size,"%")})
this.move=function(e){this.applyStyles({top:this.formatStyle(e.top,"px"),bottom:this.formatStyle(e.bottom,"px"),left:this.formatStyle(e.left,"px"),right:this.formatStyle(e.right,"px"),height:this.formatStyle(e.height,"px"),width:this.formatStyle(e.width,"px")})}}de.prototype=Y(ce.prototype)
de.prototype.constructor=de
function he(e){var t,i,n,r
if(e.div){i=e.div.offsetHeight
n=e.div.offsetWidth
r=e.div.offsetTop
var a=(a=e.div.childNodes)&&(a=a[0])&&a.getClientRects&&a.getClientRects()
e=e.div.getBoundingClientRect()
t=a?Math.max(a[0]&&a[0].height||0,e.height/a.length):0}this.left=e.left
this.right=e.right
this.top=e.top||r
this.height=e.height||i
this.bottom=e.bottom||r+(e.height||i)
this.width=e.width||n
this.lineHeight=void 0!==t?t:e.lineHeight}he.prototype.move=function(e,t){t=void 0!==t?t:this.lineHeight
switch(e){case"+x":this.left+=t
this.right+=t
break
case"-x":this.left-=t
this.right-=t
break
case"+y":this.top+=t
this.bottom+=t
break
case"-y":this.top-=t
this.bottom-=t}}
he.prototype.overlaps=function(e){return this.left<e.right&&this.right>e.left&&this.top<e.bottom&&this.bottom>e.top}
he.prototype.overlapsAny=function(e){for(var t=0;t<e.length;t++)if(this.overlaps(e[t]))return!0
return!1}
he.prototype.within=function(e){return this.top>=e.top&&this.bottom<=e.bottom&&this.left>=e.left&&this.right<=e.right}
he.prototype.overlapsOppositeAxis=function(e,t){switch(t){case"+x":return this.left<e.left
case"-x":return this.right>e.right
case"+y":return this.top<e.top
case"-y":return this.bottom>e.bottom}}
he.prototype.intersectPercentage=function(e){return Math.max(0,Math.min(this.right,e.right)-Math.max(this.left,e.left))*Math.max(0,Math.min(this.bottom,e.bottom)-Math.max(this.top,e.top))/(this.height*this.width)}
he.prototype.toCSSCompatValues=function(e){return{top:this.top-e.top,bottom:e.bottom-this.bottom,left:this.left-e.left,right:e.right-this.right,height:this.height,width:this.width}}
he.getSimpleBoxPosition=function(e){var t=e.div?e.div.offsetHeight:e.tagName?e.offsetHeight:0,i=e.div?e.div.offsetWidth:e.tagName?e.offsetWidth:0,n=e.div?e.div.offsetTop:e.tagName?e.offsetTop:0
return{left:(e=e.div?e.div.getBoundingClientRect():e.tagName?e.getBoundingClientRect():e).left,right:e.right,top:e.top||n,height:e.height||t,bottom:e.bottom||n+(e.height||t),width:e.width||i}}
function pe(e,t,i,n){var r=new he(t),a=t.cue,s=function(e){if("number"==typeof e.line&&(e.snapToLines||e.line>=0&&e.line<=100))return e.line
if(!e.track||!e.track.textTrackList||!e.track.textTrackList.mediaElement)return-1
for(var t=e.track,i=t.textTrackList,n=0,r=0;r<i.length&&i[r]!==t;r++)"showing"===i[r].mode&&n++
return-1*++n}(a),o=[]
if(a.snapToLines){var u
switch(a.vertical){case"":o=["+y","-y"]
u="height"
break
case"rl":o=["+x","-x"]
u="width"
break
case"lr":o=["-x","+x"]
u="width"}var l=r.lineHeight,c=l*Math.round(s),d=i[u]+l,h=o[0]
if(Math.abs(c)>d){c=c<0?-1:1
c*=Math.ceil(d/l)*l}if(s<0){c+=""===a.vertical?i.height:i.width
o=o.reverse()}r.move(h,c)}else{var p=r.lineHeight/i.height*100
switch(a.lineAlign){case"center":s-=p/2
break
case"end":s-=p}switch(a.vertical){case"":t.applyStyles({top:t.formatStyle(s,"%")})
break
case"rl":t.applyStyles({left:t.formatStyle(s,"%")})
break
case"lr":t.applyStyles({right:t.formatStyle(s,"%")})}o=["+y","-x","+x","-y"]
r=new he(t)}var f=function(e,t){for(var r,a=new he(e),s=1,o=0;o<t.length;o++){for(;e.overlapsOppositeAxis(i,t[o])||e.within(i)&&e.overlapsAny(n);)e.move(t[o])
if(e.within(i))return e
var u=e.intersectPercentage(i)
if(s>u){r=new he(e)
s=u}e=new he(a)}return r||a}(r,o)
t.move(f.toCSSCompatValues(i))}function fe(){}fe.StringDecoder=function(){return{decode:function(e){if(!e)return""
if("string"!=typeof e)throw new Error("Error - expected string data.")
return decodeURIComponent(encodeURIComponent(e))}}}
fe.convertCueToDOMTree=function(e,t){return e&&t?se(e,t):null}
fe.processCues=function(e,t,i){if(!e||!t||!i)return null
for(;i.firstChild;)i.removeChild(i.firstChild)
var n=e.document.createElement("div")
n.style.position="absolute"
n.style.left="0"
n.style.right="0"
n.style.top="0"
n.style.bottom="0"
n.style.margin="1.5%"
i.appendChild(n)
if(function(e){for(var t=0;t<e.length;t++)if(e[t].hasBeenReset||!e[t].displayState)return!0
return!1}(t)){var r=[],a=he.getSimpleBoxPosition(n),s={font:Math.round(.05*a.height*100)/100+"px sans-serif"}
!function(){for(var i,o,u=0;u<t.length;u++){o=t[u]
i=new de(e,o,s)
n.appendChild(i.div)
pe(0,i,a,r)
o.displayState=i.div
r.push(he.getSimpleBoxPosition(i))}}()}else for(var o=0;o<t.length;o++)n.appendChild(t[o].displayState)}
fe.Parser=function(e,t,i){if(!i){i=t
t={}}t||(t={})
this.window=e
this.vttjs=t
this.state="INITIAL"
this.buffer=""
this.decoder=i||new TextDecoder("utf8")
this.regionList=[]}
fe.Parser.prototype={reportOrThrowError:function(e){if(!(e instanceof Q))throw e
this.onparsingerror&&this.onparsingerror(e)},parse:function(e){var t=this
e&&(t.buffer+=t.decoder.decode(e,{stream:!0}))
function i(){for(var e=t.buffer,i=0;i<e.length&&"\r"!==e[i]&&"\n"!==e[i];)++i
var n=e.substr(0,i)
"\r"===e[i]&&++i
"\n"===e[i]&&++i
t.buffer=e.substr(i)
return n}function n(e){e.match(/X-TIMESTAMP-MAP/)?Z(e,(function(e,i){if("X-TIMESTAMP-MAP"===e)!function(e){var i=new J
Z(e,(function(e,t){switch(e){case"MPEGT":i.integer(e+"S",t)
break
case"LOCA":i.set(e+"L",$(t))}}),/[^\d]:/,/,/)
t.ontimestampmap&&t.ontimestampmap({MPEGTS:i.get("MPEGTS"),LOCAL:i.get("LOCAL")})}(i)}),/=/):Z(e,(function(e,i){if("Region"===e)!function(e){var i=new J
Z(e,(function(e,t){switch(e){case"id":i.set(e,t)
break
case"width":i.percent(e,t)
break
case"lines":i.integer(e,t)
break
case"regionanchor":case"viewportanchor":var n=t.split(",")
if(2!==n.length)break
var r=new J
r.percent("x",n[0])
r.percent("y",n[1])
if(!r.has("x")||!r.has("y"))break
i.set(e+"X",r.get("x"))
i.set(e+"Y",r.get("y"))
break
case"scroll":i.alt(e,t,["up"])}}),/=/,/\s/)
if(i.has("id")){var n=new(t.vttjs.VTTRegion||t.window.VTTRegion)
n.width=i.get("width",100)
n.lines=i.get("lines",3)
n.regionAnchorX=i.get("regionanchorX",0)
n.regionAnchorY=i.get("regionanchorY",100)
n.viewportAnchorX=i.get("viewportanchorX",0)
n.viewportAnchorY=i.get("viewportanchorY",100)
n.scroll=i.get("scroll","")
t.onregion&&t.onregion(n)
t.regionList.push({id:i.get("id"),region:n})}}(i)}),/:/)}try{var r
if("INITIAL"===t.state){if(!/\r\n|\n/.test(t.buffer))return this
var a=(r=i()).match(/^WEBVTT([ \t].*)?$/)
if(!a||!a[0])throw new Q(Q.Errors.BadSignature)
t.state="HEADER"}for(var s=!1;t.buffer;){if(!/\r\n|\n/.test(t.buffer))return this
s?s=!1:r=i()
switch(t.state){case"HEADER":/:/.test(r)?n(r):r||(t.state="ID")
continue
case"NOTE":r||(t.state="ID")
continue
case"ID":if(/^NOTE($|[ \t])/.test(r)){t.state="NOTE"
break}if(!r)continue
t.cue=new(t.vttjs.VTTCue||t.window.VTTCue)(0,0,"")
try{t.cue.align="center"}catch(e){t.cue.align="middle"}t.state="CUE"
if(-1===r.indexOf("--\x3e")){t.cue.id=r
continue}case"CUE":try{ee(r,t.cue,t.regionList)}catch(e){t.reportOrThrowError(e)
t.cue=null
t.state="BADCUE"
continue}t.state="CUETEXT"
continue
case"CUETEXT":var o=-1!==r.indexOf("--\x3e")
if(!r||o&&(s=!0)){t.oncue&&t.oncue(t.cue)
t.cue=null
t.state="ID"
continue}t.cue.text&&(t.cue.text+="\n")
t.cue.text+=r.replace(/\u2028/g,"\n").replace(/u2029/g,"\n")
continue
case"BADCUE":r||(t.state="ID")
continue}}}catch(e){t.reportOrThrowError(e)
"CUETEXT"===t.state&&t.cue&&t.oncue&&t.oncue(t.cue)
t.cue=null
t.state="INITIAL"===t.state?"BADWEBVTT":"BADCUE"}return this},flush:function(){var e=this
try{e.buffer+=e.decoder.decode()
if(e.cue||"HEADER"===e.state){e.buffer+="\n\n"
e.parse()}if("INITIAL"===e.state)throw new Q(Q.Errors.BadSignature)}catch(t){e.reportOrThrowError(t)}e.onflush&&e.onflush()
return this}}
var me=fe,ge={"":1,lr:1,rl:1},ve={start:1,center:1,end:1,left:1,right:1,auto:1,"line-left":1,"line-right":1}
function ye(e){return"string"==typeof e&&(!!ve[e.toLowerCase()]&&e.toLowerCase())}function _e(e,t,i){this.hasBeenReset=!1
var n="",r=!1,a=e,s=t,o=i,u=null,l="",c=!0,d="auto",h="start",p="auto",f="auto",m=100,g="center"
Object.defineProperties(this,{id:{enumerable:!0,get:function(){return n},set:function(e){n=""+e}},pauseOnExit:{enumerable:!0,get:function(){return r},set:function(e){r=!!e}},startTime:{enumerable:!0,get:function(){return a},set:function(e){if("number"!=typeof e)throw new TypeError("Start time must be set to a number.")
a=e
this.hasBeenReset=!0}},endTime:{enumerable:!0,get:function(){return s},set:function(e){if("number"!=typeof e)throw new TypeError("End time must be set to a number.")
s=e
this.hasBeenReset=!0}},text:{enumerable:!0,get:function(){return o},set:function(e){o=""+e
this.hasBeenReset=!0}},region:{enumerable:!0,get:function(){return u},set:function(e){u=e
this.hasBeenReset=!0}},vertical:{enumerable:!0,get:function(){return l},set:function(e){var t=function(e){return"string"==typeof e&&!!ge[e.toLowerCase()]&&e.toLowerCase()}(e)
if(!1===t)throw new SyntaxError("Vertical: an invalid or illegal direction string was specified.")
l=t
this.hasBeenReset=!0}},snapToLines:{enumerable:!0,get:function(){return c},set:function(e){c=!!e
this.hasBeenReset=!0}},line:{enumerable:!0,get:function(){return d},set:function(e){if("number"!=typeof e&&"auto"!==e)throw new SyntaxError("Line: an invalid number or illegal string was specified.")
d=e
this.hasBeenReset=!0}},lineAlign:{enumerable:!0,get:function(){return h},set:function(e){var t=ye(e)
if(t){h=t
this.hasBeenReset=!0}else console.warn("lineAlign: an invalid or illegal string was specified.")}},position:{enumerable:!0,get:function(){return p},set:function(e){if(e<0||e>100)throw new Error("Position must be between 0 and 100.")
p=e
this.hasBeenReset=!0}},positionAlign:{enumerable:!0,get:function(){return f},set:function(e){var t=ye(e)
if(t){f=t
this.hasBeenReset=!0}else console.warn("positionAlign: an invalid or illegal string was specified.")}},size:{enumerable:!0,get:function(){return m},set:function(e){if(e<0||e>100)throw new Error("Size must be between 0 and 100.")
m=e
this.hasBeenReset=!0}},align:{enumerable:!0,get:function(){return g},set:function(e){var t=ye(e)
if(!t)throw new SyntaxError("align: an invalid or illegal alignment string was specified.")
g=t
this.hasBeenReset=!0}}})
this.displayState=void 0}_e.prototype.getCueAsHTML=function(){return WebVTT.convertCueToDOMTree(window,this.text)}
var be=_e,Te={"":!0,up:!0}
function Se(e){return"number"==typeof e&&e>=0&&e<=100}var ke=function(){var e=100,t=3,i=0,n=100,r=0,a=100,s=""
Object.defineProperties(this,{width:{enumerable:!0,get:function(){return e},set:function(t){if(!Se(t))throw new Error("Width must be between 0 and 100.")
e=t}},lines:{enumerable:!0,get:function(){return t},set:function(e){if("number"!=typeof e)throw new TypeError("Lines must be set to a number.")
t=e}},regionAnchorY:{enumerable:!0,get:function(){return n},set:function(e){if(!Se(e))throw new Error("RegionAnchorX must be between 0 and 100.")
n=e}},regionAnchorX:{enumerable:!0,get:function(){return i},set:function(e){if(!Se(e))throw new Error("RegionAnchorY must be between 0 and 100.")
i=e}},viewportAnchorY:{enumerable:!0,get:function(){return a},set:function(e){if(!Se(e))throw new Error("ViewportAnchorY must be between 0 and 100.")
a=e}},viewportAnchorX:{enumerable:!0,get:function(){return r},set:function(e){if(!Se(e))throw new Error("ViewportAnchorX must be between 0 and 100.")
r=e}},scroll:{enumerable:!0,get:function(){return s},set:function(e){var t=function(e){return"string"==typeof e&&!!Te[e.toLowerCase()]&&e.toLowerCase()}(e)
!1===t?console.warn("Scroll: an invalid or illegal string was specified."):s=t}}})},Ee=w((function(e){var t=e.exports={WebVTT:me,VTTCue:be,VTTRegion:ke}
x.vttjs=t
x.WebVTT=t.WebVTT
var i=t.VTTCue,n=t.VTTRegion,r=x.VTTCue,a=x.VTTRegion
t.shim=function(){x.VTTCue=i
x.VTTRegion=n}
t.restore=function(){x.VTTCue=r
x.VTTRegion=a}
x.VTTCue||t.shim()})),Ce=(Ee.WebVTT,Ee.VTTCue,Ee.VTTRegion,w((function(e){e.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))
return!0}catch(e){return!1}}
e.exports.default=e.exports,e.exports.__esModule=!0})))
C(Ce)
var we=w((function(e){function t(i,n,r){if(Ce()){e.exports=t=Reflect.construct
e.exports.default=e.exports,e.exports.__esModule=!0}else{e.exports=t=function(e,t,i){var n=[null]
n.push.apply(n,t)
var r=new(Function.bind.apply(e,n))
i&&U(r,i.prototype)
return r}
e.exports.default=e.exports,e.exports.__esModule=!0}return t.apply(null,arguments)}e.exports=t
e.exports.default=e.exports,e.exports.__esModule=!0})),Ie=C(we),Pe=C(w((function(e){e.exports=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}})
t&&U(e,t)}
e.exports.default=e.exports,e.exports.__esModule=!0}))),xe=w((function(e,t){i=/^((?:[a-zA-Z0-9+\-.]+:)?)(\/\/[^\/?#]*)?((?:[^\/?#]*\/)*[^;?#]*)?(;[^?#]*)?(\?[^#]*)?(#.*)?$/,n=/^([^\/?#]*)(.*)$/,r=/(?:\/|^)\.(?=\/)/g,a=/(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g,s={buildAbsoluteURL:function(e,t,i){i=i||{}
e=e.trim()
if(!(t=t.trim())){if(!i.alwaysNormalize)return e
var r=s.parseURL(e)
if(!r)throw new Error("Error trying to parse base URL.")
r.path=s.normalizePath(r.path)
return s.buildURLFromParts(r)}var a=s.parseURL(t)
if(!a)throw new Error("Error trying to parse relative URL.")
if(a.scheme){if(!i.alwaysNormalize)return t
a.path=s.normalizePath(a.path)
return s.buildURLFromParts(a)}var o=s.parseURL(e)
if(!o)throw new Error("Error trying to parse base URL.")
if(!o.netLoc&&o.path&&"/"!==o.path[0]){var u=n.exec(o.path)
o.netLoc=u[1]
o.path=u[2]}o.netLoc&&!o.path&&(o.path="/")
var l={scheme:o.scheme,netLoc:a.netLoc,path:null,params:a.params,query:a.query,fragment:a.fragment}
if(!a.netLoc){l.netLoc=o.netLoc
if("/"!==a.path[0])if(a.path){var c=o.path,d=c.substring(0,c.lastIndexOf("/")+1)+a.path
l.path=s.normalizePath(d)}else{l.path=o.path
if(!a.params){l.params=o.params
a.query||(l.query=o.query)}}}null===l.path&&(l.path=i.alwaysNormalize?s.normalizePath(a.path):a.path)
return s.buildURLFromParts(l)},parseURL:function(e){var t=i.exec(e)
return t?{scheme:t[1]||"",netLoc:t[2]||"",path:t[3]||"",params:t[4]||"",query:t[5]||"",fragment:t[6]||""}:null},normalizePath:function(e){e=e.split("").reverse().join("").replace(r,"")
for(;e.length!==(e=e.replace(a,"")).length;);return e.split("").reverse().join("")},buildURLFromParts:function(e){return e.scheme+e.netLoc+e.path+e.params+e.query+e.fragment}},e.exports=s
var i,n,r,a,s})),Ae="http://example.com",Oe=function(){function e(){this.listeners={}}var t=e.prototype
t.on=function(e,t){this.listeners[e]||(this.listeners[e]=[])
this.listeners[e].push(t)}
t.off=function(e,t){if(!this.listeners[e])return!1
var i=this.listeners[e].indexOf(t)
this.listeners[e]=this.listeners[e].slice(0)
this.listeners[e].splice(i,1)
return i>-1}
t.trigger=function(e){var t=this.listeners[e]
if(t)if(2===arguments.length)for(var i=t.length,n=0;n<i;++n)t[n].call(this,arguments[1])
else for(var r=Array.prototype.slice.call(arguments,1),a=t.length,s=0;s<a;++s)t[s].apply(this,r)}
t.dispose=function(){this.listeners={}}
t.pipe=function(e){this.on("data",(function(t){e.push(t)}))}
return e}()
function Le(e){for(var t,i=(t=e,x.atob?x.atob(t):Buffer.from(t,"base64").toString("binary")),n=new Uint8Array(i.length),r=0;r<i.length;r++)n[r]=i.charCodeAt(r)
return n}
/*! @name m3u8-parser @version 4.7.0 @license Apache-2.0 */var De=function(e){B(t,e)
function t(){var t;(t=e.call(this)||this).buffer=""
return t}t.prototype.push=function(e){var t
this.buffer+=e
t=this.buffer.indexOf("\n")
for(;t>-1;t=this.buffer.indexOf("\n")){this.trigger("data",this.buffer.substring(0,t))
this.buffer=this.buffer.substring(t+1)}}
return t}(Oe),Re=String.fromCharCode(9),Me=function(e){var t=/([0-9.]*)?@?([0-9.]*)?/.exec(e||""),i={}
t[1]&&(i.length=parseInt(t[1],10))
t[2]&&(i.offset=parseInt(t[2],10))
return i},Ne=function(e){for(var t,i=e.split(new RegExp('(?:^|,)((?:[^=]*)=(?:"[^"]*"|[^,]*))')),n={},r=i.length;r--;)if(""!==i[r]){(t=/([^=]*)=(.*)/.exec(i[r]).slice(1))[0]=t[0].replace(/^\s+|\s+$/g,"")
t[1]=t[1].replace(/^\s+|\s+$/g,"")
t[1]=t[1].replace(/^['"](.*)['"]$/g,"$1")
n[t[0]]=t[1]}return n},Ue=function(e){B(t,e)
function t(){var t;(t=e.call(this)||this).customParsers=[]
t.tagMappers=[]
return t}var i=t.prototype
i.push=function(e){var t,i,n=this
if(0!==(e=e.trim()).length)if("#"===e[0]){this.tagMappers.reduce((function(t,i){var n=i(e)
return n===e?t:t.concat([n])}),[e]).forEach((function(e){for(var r=0;r<n.customParsers.length;r++)if(n.customParsers[r].call(n,e))return
if(0===e.indexOf("#EXT")){e=e.replace("\r","")
if(t=/^#EXTM3U/.exec(e))n.trigger("data",{type:"tag",tagType:"m3u"})
else if(t=/^#EXTINF:?([0-9\.]*)?,?(.*)?$/.exec(e)){i={type:"tag",tagType:"inf"}
t[1]&&(i.duration=parseFloat(t[1]))
t[2]&&(i.title=t[2])
n.trigger("data",i)}else if(t=/^#EXT-X-TARGETDURATION:?([0-9.]*)?/.exec(e)){i={type:"tag",tagType:"targetduration"}
t[1]&&(i.duration=parseInt(t[1],10))
n.trigger("data",i)}else if(t=/^#EXT-X-VERSION:?([0-9.]*)?/.exec(e)){i={type:"tag",tagType:"version"}
t[1]&&(i.version=parseInt(t[1],10))
n.trigger("data",i)}else if(t=/^#EXT-X-MEDIA-SEQUENCE:?(\-?[0-9.]*)?/.exec(e)){i={type:"tag",tagType:"media-sequence"}
t[1]&&(i.number=parseInt(t[1],10))
n.trigger("data",i)}else if(t=/^#EXT-X-DISCONTINUITY-SEQUENCE:?(\-?[0-9.]*)?/.exec(e)){i={type:"tag",tagType:"discontinuity-sequence"}
t[1]&&(i.number=parseInt(t[1],10))
n.trigger("data",i)}else if(t=/^#EXT-X-PLAYLIST-TYPE:?(.*)?$/.exec(e)){i={type:"tag",tagType:"playlist-type"}
t[1]&&(i.playlistType=t[1])
n.trigger("data",i)}else if(t=/^#EXT-X-BYTERANGE:?(.*)?$/.exec(e)){i=R(Me(t[1]),{type:"tag",tagType:"byterange"})
n.trigger("data",i)}else if(t=/^#EXT-X-ALLOW-CACHE:?(YES|NO)?/.exec(e)){i={type:"tag",tagType:"allow-cache"}
t[1]&&(i.allowed=!/NO/.test(t[1]))
n.trigger("data",i)}else if(t=/^#EXT-X-MAP:?(.*)$/.exec(e)){i={type:"tag",tagType:"map"}
if(t[1]){var a=Ne(t[1])
a.URI&&(i.uri=a.URI)
a.BYTERANGE&&(i.byterange=Me(a.BYTERANGE))}n.trigger("data",i)}else if(t=/^#EXT-X-STREAM-INF:?(.*)$/.exec(e)){i={type:"tag",tagType:"stream-inf"}
if(t[1]){i.attributes=Ne(t[1])
if(i.attributes.RESOLUTION){var s=i.attributes.RESOLUTION.split("x"),o={}
s[0]&&(o.width=parseInt(s[0],10))
s[1]&&(o.height=parseInt(s[1],10))
i.attributes.RESOLUTION=o}i.attributes.BANDWIDTH&&(i.attributes.BANDWIDTH=parseInt(i.attributes.BANDWIDTH,10))
i.attributes["PROGRAM-ID"]&&(i.attributes["PROGRAM-ID"]=parseInt(i.attributes["PROGRAM-ID"],10))}n.trigger("data",i)}else if(t=/^#EXT-X-MEDIA:?(.*)$/.exec(e)){i={type:"tag",tagType:"media"}
t[1]&&(i.attributes=Ne(t[1]))
n.trigger("data",i)}else if(t=/^#EXT-X-ENDLIST/.exec(e))n.trigger("data",{type:"tag",tagType:"endlist"})
else if(t=/^#EXT-X-DISCONTINUITY/.exec(e))n.trigger("data",{type:"tag",tagType:"discontinuity"})
else if(t=/^#EXT-X-PROGRAM-DATE-TIME:?(.*)$/.exec(e)){i={type:"tag",tagType:"program-date-time"}
if(t[1]){i.dateTimeString=t[1]
i.dateTimeObject=new Date(t[1])}n.trigger("data",i)}else if(t=/^#EXT-X-KEY:?(.*)$/.exec(e)){i={type:"tag",tagType:"key"}
if(t[1]){i.attributes=Ne(t[1])
if(i.attributes.IV){"0x"===i.attributes.IV.substring(0,2).toLowerCase()&&(i.attributes.IV=i.attributes.IV.substring(2))
i.attributes.IV=i.attributes.IV.match(/.{8}/g)
i.attributes.IV[0]=parseInt(i.attributes.IV[0],16)
i.attributes.IV[1]=parseInt(i.attributes.IV[1],16)
i.attributes.IV[2]=parseInt(i.attributes.IV[2],16)
i.attributes.IV[3]=parseInt(i.attributes.IV[3],16)
i.attributes.IV=new Uint32Array(i.attributes.IV)}}n.trigger("data",i)}else if(t=/^#EXT-X-START:?(.*)$/.exec(e)){i={type:"tag",tagType:"start"}
if(t[1]){i.attributes=Ne(t[1])
i.attributes["TIME-OFFSET"]=parseFloat(i.attributes["TIME-OFFSET"])
i.attributes.PRECISE=/YES/.test(i.attributes.PRECISE)}n.trigger("data",i)}else if(t=/^#EXT-X-CUE-OUT-CONT:?(.*)?$/.exec(e)){i={type:"tag",tagType:"cue-out-cont"}
t[1]?i.data=t[1]:i.data=""
n.trigger("data",i)}else if(t=/^#EXT-X-CUE-OUT:?(.*)?$/.exec(e)){i={type:"tag",tagType:"cue-out"}
t[1]?i.data=t[1]:i.data=""
n.trigger("data",i)}else if(t=/^#EXT-X-CUE-IN:?(.*)?$/.exec(e)){i={type:"tag",tagType:"cue-in"}
t[1]?i.data=t[1]:i.data=""
n.trigger("data",i)}else if((t=/^#EXT-X-SKIP:(.*)$/.exec(e))&&t[1]){(i={type:"tag",tagType:"skip"}).attributes=Ne(t[1])
i.attributes.hasOwnProperty("SKIPPED-SEGMENTS")&&(i.attributes["SKIPPED-SEGMENTS"]=parseInt(i.attributes["SKIPPED-SEGMENTS"],10))
i.attributes.hasOwnProperty("RECENTLY-REMOVED-DATERANGES")&&(i.attributes["RECENTLY-REMOVED-DATERANGES"]=i.attributes["RECENTLY-REMOVED-DATERANGES"].split(Re))
n.trigger("data",i)}else if((t=/^#EXT-X-PART:(.*)$/.exec(e))&&t[1]){(i={type:"tag",tagType:"part"}).attributes=Ne(t[1]);["DURATION"].forEach((function(e){i.attributes.hasOwnProperty(e)&&(i.attributes[e]=parseFloat(i.attributes[e]))}));["INDEPENDENT","GAP"].forEach((function(e){i.attributes.hasOwnProperty(e)&&(i.attributes[e]=/YES/.test(i.attributes[e]))}))
i.attributes.hasOwnProperty("BYTERANGE")&&(i.attributes.byterange=Me(i.attributes.BYTERANGE))
n.trigger("data",i)}else if((t=/^#EXT-X-SERVER-CONTROL:(.*)$/.exec(e))&&t[1]){(i={type:"tag",tagType:"server-control"}).attributes=Ne(t[1]);["CAN-SKIP-UNTIL","PART-HOLD-BACK","HOLD-BACK"].forEach((function(e){i.attributes.hasOwnProperty(e)&&(i.attributes[e]=parseFloat(i.attributes[e]))}));["CAN-SKIP-DATERANGES","CAN-BLOCK-RELOAD"].forEach((function(e){i.attributes.hasOwnProperty(e)&&(i.attributes[e]=/YES/.test(i.attributes[e]))}))
n.trigger("data",i)}else if((t=/^#EXT-X-PART-INF:(.*)$/.exec(e))&&t[1]){(i={type:"tag",tagType:"part-inf"}).attributes=Ne(t[1]);["PART-TARGET"].forEach((function(e){i.attributes.hasOwnProperty(e)&&(i.attributes[e]=parseFloat(i.attributes[e]))}))
n.trigger("data",i)}else if((t=/^#EXT-X-PRELOAD-HINT:(.*)$/.exec(e))&&t[1]){(i={type:"tag",tagType:"preload-hint"}).attributes=Ne(t[1]);["BYTERANGE-START","BYTERANGE-LENGTH"].forEach((function(e){if(i.attributes.hasOwnProperty(e)){i.attributes[e]=parseInt(i.attributes[e],10)
var t="BYTERANGE-LENGTH"===e?"length":"offset"
i.attributes.byterange=i.attributes.byterange||{}
i.attributes.byterange[t]=i.attributes[e]
delete i.attributes[e]}}))
n.trigger("data",i)}else if((t=/^#EXT-X-RENDITION-REPORT:(.*)$/.exec(e))&&t[1]){(i={type:"tag",tagType:"rendition-report"}).attributes=Ne(t[1]);["LAST-MSN","LAST-PART"].forEach((function(e){i.attributes.hasOwnProperty(e)&&(i.attributes[e]=parseInt(i.attributes[e],10))}))
n.trigger("data",i)}else n.trigger("data",{type:"tag",data:e.slice(4)})}else n.trigger("data",{type:"comment",text:e.slice(1)})}))}else this.trigger("data",{type:"uri",uri:e})}
i.addParser=function(e){var t=this,i=e.expression,n=e.customType,r=e.dataParser,a=e.segment
"function"!=typeof r&&(r=function(e){return e})
this.customParsers.push((function(e){if(i.exec(e)){t.trigger("data",{type:"custom",data:r(e),customType:n,segment:a})
return!0}}))}
i.addTagMapper=function(e){var t=e.expression,i=e.map
this.tagMappers.push((function(e){return t.test(e)?i(e):e}))}
return t}(Oe),Be=function(e){var t={}
Object.keys(e).forEach((function(i){t[(n=i,n.toLowerCase().replace(/-(\w)/g,(function(e){return e[1].toUpperCase()})))]=e[i]
var n}))
return t},Fe=function(e){var t=e.serverControl,i=e.targetDuration,n=e.partTargetDuration
if(t){var r="#EXT-X-SERVER-CONTROL",a="holdBack",s="partHoldBack",o=i&&3*i,u=n&&2*n
if(i&&!t.hasOwnProperty(a)){t[a]=o
this.trigger("info",{message:r+" defaulting HOLD-BACK to targetDuration * 3 ("+o+")."})}if(o&&t[a]<o){this.trigger("warn",{message:r+" clamping HOLD-BACK ("+t[a]+") to targetDuration * 3 ("+o+")"})
t[a]=o}if(n&&!t.hasOwnProperty(s)){t[s]=3*n
this.trigger("info",{message:r+" defaulting PART-HOLD-BACK to partTargetDuration * 3 ("+t[s]+")."})}if(n&&t[s]<u){this.trigger("warn",{message:r+" clamping PART-HOLD-BACK ("+t[s]+") to partTargetDuration * 2 ("+u+")."})
t[s]=u}}},je=function(e){B(t,e)
function t(){var t;(t=e.call(this)||this).lineStream=new De
t.parseStream=new Ue
t.lineStream.pipe(t.parseStream)
var i,n,r=N(t),a=[],s={},o=!1,u=function(){},l={AUDIO:{},VIDEO:{},"CLOSED-CAPTIONS":{},SUBTITLES:{}},c=0
t.manifest={allowCache:!0,discontinuityStarts:[],segments:[]}
var d=0,h=0
t.on("end",(function(){if(!s.uri&&(s.parts||s.preloadHints)){!s.map&&i&&(s.map=i)
!s.key&&n&&(s.key=n)
s.timeline||"number"!=typeof c||(s.timeline=c)
t.manifest.preloadSegment=s}}))
t.parseStream.on("data",(function(e){var t,p;({tag:function(){({version:function(){e.version&&(this.manifest.version=e.version)},"allow-cache":function(){this.manifest.allowCache=e.allowed
if(!("allowed"in e)){this.trigger("info",{message:"defaulting allowCache to YES"})
this.manifest.allowCache=!0}},byterange:function(){var t={}
if("length"in e){s.byterange=t
t.length=e.length
"offset"in e||(e.offset=d)}if("offset"in e){s.byterange=t
t.offset=e.offset}d=t.offset+t.length},endlist:function(){this.manifest.endList=!0},inf:function(){if(!("mediaSequence"in this.manifest)){this.manifest.mediaSequence=0
this.trigger("info",{message:"defaulting media sequence to zero"})}if(!("discontinuitySequence"in this.manifest)){this.manifest.discontinuitySequence=0
this.trigger("info",{message:"defaulting discontinuity sequence to zero"})}e.duration>0&&(s.duration=e.duration)
if(0===e.duration){s.duration=.01
this.trigger("info",{message:"updating zero segment duration to a small value"})}this.manifest.segments=a},key:function(){if(e.attributes)if("NONE"!==e.attributes.METHOD)if(e.attributes.URI)if("com.apple.streamingkeydelivery"!==e.attributes.KEYFORMAT)if("urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed"!==e.attributes.KEYFORMAT){e.attributes.METHOD||this.trigger("warn",{message:"defaulting key method to AES-128"})
n={method:e.attributes.METHOD||"AES-128",uri:e.attributes.URI}
void 0!==e.attributes.IV&&(n.iv=e.attributes.IV)}else{if(-1===["SAMPLE-AES","SAMPLE-AES-CTR","SAMPLE-AES-CENC"].indexOf(e.attributes.METHOD)){this.trigger("warn",{message:"invalid key method provided for Widevine"})
return}"SAMPLE-AES-CENC"===e.attributes.METHOD&&this.trigger("warn",{message:"SAMPLE-AES-CENC is deprecated, please use SAMPLE-AES-CTR instead"})
if("data:text/plain;base64,"!==e.attributes.URI.substring(0,23)){this.trigger("warn",{message:"invalid key URI provided for Widevine"})
return}if(!e.attributes.KEYID||"0x"!==e.attributes.KEYID.substring(0,2)){this.trigger("warn",{message:"invalid key ID provided for Widevine"})
return}this.manifest.contentProtection=this.manifest.contentProtection||{}
this.manifest.contentProtection["com.widevine.alpha"]={attributes:{schemeIdUri:e.attributes.KEYFORMAT,keyId:e.attributes.KEYID.substring(2)},pssh:Le(e.attributes.URI.split(",")[1])}}else{this.manifest.contentProtection=this.manifest.contentProtection||{}
this.manifest.contentProtection["com.apple.fps.1_0"]={attributes:e.attributes}}else this.trigger("warn",{message:"ignoring key declaration without URI"})
else n=null
else this.trigger("warn",{message:"ignoring key declaration without attribute list"})},"media-sequence":function(){isFinite(e.number)?this.manifest.mediaSequence=e.number:this.trigger("warn",{message:"ignoring invalid media sequence: "+e.number})},"discontinuity-sequence":function(){if(isFinite(e.number)){this.manifest.discontinuitySequence=e.number
c=e.number}else this.trigger("warn",{message:"ignoring invalid discontinuity sequence: "+e.number})},"playlist-type":function(){/VOD|EVENT/.test(e.playlistType)?this.manifest.playlistType=e.playlistType:this.trigger("warn",{message:"ignoring unknown playlist type: "+e.playlist})},map:function(){i={}
e.uri&&(i.uri=e.uri)
e.byterange&&(i.byterange=e.byterange)
n&&(i.key=n)},"stream-inf":function(){this.manifest.playlists=a
this.manifest.mediaGroups=this.manifest.mediaGroups||l
if(e.attributes){s.attributes||(s.attributes={})
R(s.attributes,e.attributes)}else this.trigger("warn",{message:"ignoring empty stream-inf attributes"})},media:function(){this.manifest.mediaGroups=this.manifest.mediaGroups||l
if(e.attributes&&e.attributes.TYPE&&e.attributes["GROUP-ID"]&&e.attributes.NAME){var i=this.manifest.mediaGroups[e.attributes.TYPE]
i[e.attributes["GROUP-ID"]]=i[e.attributes["GROUP-ID"]]||{}
t=i[e.attributes["GROUP-ID"]];(p={default:/yes/i.test(e.attributes.DEFAULT)}).default?p.autoselect=!0:p.autoselect=/yes/i.test(e.attributes.AUTOSELECT)
e.attributes.LANGUAGE&&(p.language=e.attributes.LANGUAGE)
e.attributes.URI&&(p.uri=e.attributes.URI)
e.attributes["INSTREAM-ID"]&&(p.instreamId=e.attributes["INSTREAM-ID"])
e.attributes.CHARACTERISTICS&&(p.characteristics=e.attributes.CHARACTERISTICS)
e.attributes.FORCED&&(p.forced=/yes/i.test(e.attributes.FORCED))
t[e.attributes.NAME]=p}else this.trigger("warn",{message:"ignoring incomplete or missing media group"})},discontinuity:function(){c+=1
s.discontinuity=!0
this.manifest.discontinuityStarts.push(a.length)},"program-date-time":function(){if(void 0===this.manifest.dateTimeString){this.manifest.dateTimeString=e.dateTimeString
this.manifest.dateTimeObject=e.dateTimeObject}s.dateTimeString=e.dateTimeString
s.dateTimeObject=e.dateTimeObject},targetduration:function(){if(!isFinite(e.duration)||e.duration<0)this.trigger("warn",{message:"ignoring invalid target duration: "+e.duration})
else{this.manifest.targetDuration=e.duration
Fe.call(this,this.manifest)}},start:function(){e.attributes&&!isNaN(e.attributes["TIME-OFFSET"])?this.manifest.start={timeOffset:e.attributes["TIME-OFFSET"],precise:e.attributes.PRECISE}:this.trigger("warn",{message:"ignoring start declaration without appropriate attribute list"})},"cue-out":function(){s.cueOut=e.data},"cue-out-cont":function(){s.cueOutCont=e.data},"cue-in":function(){s.cueIn=e.data},skip:function(){this.manifest.skip=Be(e.attributes)
this.warnOnMissingAttributes_("#EXT-X-SKIP",e.attributes,["SKIPPED-SEGMENTS"])},part:function(){var t=this
o=!0
var i=this.manifest.segments.length,n=Be(e.attributes)
s.parts=s.parts||[]
s.parts.push(n)
if(n.byterange){n.byterange.hasOwnProperty("offset")||(n.byterange.offset=h)
h=n.byterange.offset+n.byterange.length}var r=s.parts.length-1
this.warnOnMissingAttributes_("#EXT-X-PART #"+r+" for segment #"+i,e.attributes,["URI","DURATION"])
this.manifest.renditionReports&&this.manifest.renditionReports.forEach((function(e,i){e.hasOwnProperty("lastPart")||t.trigger("warn",{message:"#EXT-X-RENDITION-REPORT #"+i+" lacks required attribute(s): LAST-PART"})}))},"server-control":function(){var t=this.manifest.serverControl=Be(e.attributes)
if(!t.hasOwnProperty("canBlockReload")){t.canBlockReload=!1
this.trigger("info",{message:"#EXT-X-SERVER-CONTROL defaulting CAN-BLOCK-RELOAD to false"})}Fe.call(this,this.manifest)
t.canSkipDateranges&&!t.hasOwnProperty("canSkipUntil")&&this.trigger("warn",{message:"#EXT-X-SERVER-CONTROL lacks required attribute CAN-SKIP-UNTIL which is required when CAN-SKIP-DATERANGES is set"})},"preload-hint":function(){var t=this.manifest.segments.length,i=Be(e.attributes),n=i.type&&"PART"===i.type
s.preloadHints=s.preloadHints||[]
s.preloadHints.push(i)
if(i.byterange&&!i.byterange.hasOwnProperty("offset")){i.byterange.offset=n?h:0
n&&(h=i.byterange.offset+i.byterange.length)}var r=s.preloadHints.length-1
this.warnOnMissingAttributes_("#EXT-X-PRELOAD-HINT #"+r+" for segment #"+t,e.attributes,["TYPE","URI"])
if(i.type)for(var a=0;a<s.preloadHints.length-1;a++){var o=s.preloadHints[a]
o.type&&(o.type===i.type&&this.trigger("warn",{message:"#EXT-X-PRELOAD-HINT #"+r+" for segment #"+t+" has the same TYPE "+i.type+" as preload hint #"+a}))}},"rendition-report":function(){var t=Be(e.attributes)
this.manifest.renditionReports=this.manifest.renditionReports||[]
this.manifest.renditionReports.push(t)
var i=this.manifest.renditionReports.length-1,n=["LAST-MSN","URI"]
o&&n.push("LAST-PART")
this.warnOnMissingAttributes_("#EXT-X-RENDITION-REPORT #"+i,e.attributes,n)},"part-inf":function(){this.manifest.partInf=Be(e.attributes)
this.warnOnMissingAttributes_("#EXT-X-PART-INF",e.attributes,["PART-TARGET"])
this.manifest.partInf.partTarget&&(this.manifest.partTargetDuration=this.manifest.partInf.partTarget)
Fe.call(this,this.manifest)}}[e.tagType]||u).call(r)},uri:function(){s.uri=e.uri
a.push(s)
if(this.manifest.targetDuration&&!("duration"in s)){this.trigger("warn",{message:"defaulting segment duration to the target duration"})
s.duration=this.manifest.targetDuration}n&&(s.key=n)
s.timeline=c
i&&(s.map=i)
h=0
s={}},comment:function(){},custom:function(){if(e.segment){s.custom=s.custom||{}
s.custom[e.customType]=e.data}else{this.manifest.custom=this.manifest.custom||{}
this.manifest.custom[e.customType]=e.data}}})[e.type].call(r)}))
return t}var i=t.prototype
i.warnOnMissingAttributes_=function(e,t,i){var n=[]
i.forEach((function(e){t.hasOwnProperty(e)||n.push(e)}))
n.length&&this.trigger("warn",{message:e+" lacks required attribute(s): "+n.join(", ")})}
i.push=function(e){this.lineStream.push(e)}
i.end=function(){this.lineStream.push("\n")
this.trigger("end")}
i.addParser=function(e){this.parseStream.addParser(e)}
i.addTagMapper=function(e){this.parseStream.addTagMapper(e)}
return t}(Oe),Ve={mp4:/^(av0?1|avc0?[1234]|vp0?9|flac|opus|mp3|mp4a|mp4v|stpp.ttml.im1t)/,webm:/^(vp0?[89]|av0?1|opus|vorbis)/,ogg:/^(vp0?[89]|theora|flac|opus|vorbis)/,video:/^(av0?1|avc0?[1234]|vp0?[89]|hvc1|hev1|theora|mp4v)/,audio:/^(mp4a|flac|vorbis|opus|ac-[34]|ec-3|alac|mp3|speex|aac)/,text:/^(stpp.ttml.im1t)/,muxerVideo:/^(avc0?1)/,muxerAudio:/^(mp4a)/,muxerText:/a^/},He=["video","audio","text"],qe=["Video","Audio","Text"],We=function(e){return e?e.replace(/avc1\.(\d+)\.(\d+)/i,(function(e,t,i){return"avc1."+("00"+Number(t).toString(16)).slice(-2)+"00"+("00"+Number(i).toString(16)).slice(-2)})):e},Ge=function(e){void 0===e&&(e="")
var t=e.split(","),i=[]
t.forEach((function(e){e=e.trim()
var t
He.forEach((function(n){var r=Ve[n].exec(e.toLowerCase())
if(r&&!(r.length<=1)){t=n
var a=e.substring(0,r[1].length),s=e.replace(a,"")
i.push({type:a,details:s,mediaType:n})}}))
t||i.push({type:e,details:"",mediaType:"unknown"})}))
return i},ze=function(e){void 0===e&&(e="")
return Ve.audio.test(e.trim().toLowerCase())},Ke=function(e){if(e&&"string"==typeof e){var t=e.toLowerCase().split(",").map((function(e){return We(e.trim())})),i="video"
1===t.length&&ze(t[0])?i="audio":1===t.length&&function(e){void 0===e&&(e="")
return Ve.text.test(e.trim().toLowerCase())}(t[0])&&(i="application")
var n="mp4"
t.every((function(e){return Ve.mp4.test(e)}))?n="mp4":t.every((function(e){return Ve.webm.test(e)}))?n="webm":t.every((function(e){return Ve.ogg.test(e)}))&&(n="ogg")
return i+"/"+n+';codecs="'+e+'"'}},Xe=function(e){void 0===e&&(e="")
return x.MediaSource&&x.MediaSource.isTypeSupported&&x.MediaSource.isTypeSupported(Ke(e))||!1},Ye=function(e){void 0===e&&(e="")
return e.toLowerCase().split(",").every((function(e){e=e.trim()
for(var t=0;t<qe.length;t++){if(Ve["muxer"+qe[t]].test(e))return!0}return!1}))},Qe="mp4a.40.2",$e=/^(audio|video|application)\/(x-|vnd\.apple\.)?mpegurl/i,Je=/^application\/dash\+xml/i,Ze=function(e){return $e.test(e)?"hls":Je.test(e)?"dash":"application/vnd.videojs.vhs+json"===e?"vhs-json":null},et="http://example.com",tt=function(e,t){if(/^[a-z]+:/i.test(t))return t;/^data:/.test(e)&&(e=x.location&&x.location.href||"")
var i="function"==typeof x.URL,n=/^\/\//.test(e),r=!x.location&&!/\/\//i.test(e)
i?e=new x.URL(e,x.location||et):/\/\//i.test(e)||(e=xe.buildAbsoluteURL(x.location&&x.location.href||"",e))
if(i){var a=new URL(t,e)
return r?a.href.slice(18):n?a.href.slice(a.protocol.length):a.href}return xe.buildAbsoluteURL(e,t)}
function it(e,t){void 0===t&&(t=Object)
return t&&"function"==typeof t.freeze?t.freeze(e):e}var nt=it({HTML:"text/html",isHTML:function(e){return e===nt.HTML},XML_APPLICATION:"application/xml",XML_TEXT:"text/xml",XML_XHTML_APPLICATION:"application/xhtml+xml",XML_SVG_IMAGE:"image/svg+xml"}),rt=it({HTML:"http://www.w3.org/1999/xhtml",isHTML:function(e){return e===rt.HTML},SVG:"http://www.w3.org/2000/svg",XML:"http://www.w3.org/XML/1998/namespace",XMLNS:"http://www.w3.org/2000/xmlns/"}),at={freeze:it,MIME_TYPE:nt,NAMESPACE:rt},st=at.NAMESPACE
function ot(e){return""!==e}function ut(e,t){e.hasOwnProperty(t)||(e[t]=!0)
return e}function lt(e){if(!e)return[]
var t=function(e){return e?e.split(/[\t\n\f\r ]+/).filter(ot):[]}(e)
return Object.keys(t.reduce(ut,{}))}function ct(e,t){for(var i in e)t[i]=e[i]}function dt(e,t){var i=e.prototype
if(!(i instanceof t)){function n(){}n.prototype=t.prototype
ct(i,n=new n)
e.prototype=i=n}if(i.constructor!=e){"function"!=typeof e&&console.error("unknown Class:"+e)
i.constructor=e}}var ht={},pt=ht.ELEMENT_NODE=1,ft=ht.ATTRIBUTE_NODE=2,mt=ht.TEXT_NODE=3,gt=ht.CDATA_SECTION_NODE=4,vt=ht.ENTITY_REFERENCE_NODE=5,yt=ht.ENTITY_NODE=6,_t=ht.PROCESSING_INSTRUCTION_NODE=7,bt=ht.COMMENT_NODE=8,Tt=ht.DOCUMENT_NODE=9,St=ht.DOCUMENT_TYPE_NODE=10,kt=ht.DOCUMENT_FRAGMENT_NODE=11,Et=ht.NOTATION_NODE=12,Ct={},wt={},It=(Ct.INDEX_SIZE_ERR=(wt[1]="Index size error",1),Ct.DOMSTRING_SIZE_ERR=(wt[2]="DOMString size error",2),Ct.HIERARCHY_REQUEST_ERR=(wt[3]="Hierarchy request error",3)),Pt=(Ct.WRONG_DOCUMENT_ERR=(wt[4]="Wrong document",4),Ct.INVALID_CHARACTER_ERR=(wt[5]="Invalid character",5),Ct.NO_DATA_ALLOWED_ERR=(wt[6]="No data allowed",6),Ct.NO_MODIFICATION_ALLOWED_ERR=(wt[7]="No modification allowed",7),Ct.NOT_FOUND_ERR=(wt[8]="Not found",8)),xt=(Ct.NOT_SUPPORTED_ERR=(wt[9]="Not supported",9),Ct.INUSE_ATTRIBUTE_ERR=(wt[10]="Attribute in use",10))
Ct.INVALID_STATE_ERR=(wt[11]="Invalid state",11),Ct.SYNTAX_ERR=(wt[12]="Syntax error",12),Ct.INVALID_MODIFICATION_ERR=(wt[13]="Invalid modification",13),Ct.NAMESPACE_ERR=(wt[14]="Invalid namespace",14),Ct.INVALID_ACCESS_ERR=(wt[15]="Invalid access",15)
function At(e,t){if(t instanceof Error)var i=t
else{i=this
Error.call(this,wt[e])
this.message=wt[e]
Error.captureStackTrace&&Error.captureStackTrace(this,At)}i.code=e
t&&(this.message=this.message+": "+t)
return i}At.prototype=Error.prototype
ct(Ct,At)
function Ot(){}Ot.prototype={length:0,item:function(e){return this[e]||null},toString:function(e,t){for(var i=[],n=0;n<this.length;n++)li(this[n],i,e,t)
return i.join("")}}
function Lt(e,t){this._node=e
this._refresh=t
Dt(this)}function Dt(e){var t=e._node._inc||e._node.ownerDocument._inc
if(e._inc!=t){var i=e._refresh(e._node)
hi(e,"length",i.length)
ct(i,e)
e._inc=t}}Lt.prototype.item=function(e){Dt(this)
return this[e]}
dt(Lt,Ot)
function Rt(){}function Mt(e,t){for(var i=e.length;i--;)if(e[i]===t)return i}function Nt(e,t,i,n){n?t[Mt(t,n)]=i:t[t.length++]=i
if(e){i.ownerElement=e
var r=e.ownerDocument
if(r){n&&qt(r,e,n)
!function(e,t,i){e&&e._inc++
var n=i.namespaceURI
n===st.XMLNS&&(t._nsMap[i.prefix?i.localName:""]=i.value)}(r,e,i)}}}function Ut(e,t,i){var n=Mt(t,i)
if(!(n>=0))throw At(Pt,new Error(e.tagName+"@"+i))
for(var r=t.length-1;n<r;)t[n]=t[++n]
t.length=r
if(e){var a=e.ownerDocument
if(a){qt(a,e,i)
i.ownerElement=null}}}Rt.prototype={length:0,item:Ot.prototype.item,getNamedItem:function(e){for(var t=this.length;t--;){var i=this[t]
if(i.nodeName==e)return i}},setNamedItem:function(e){var t=e.ownerElement
if(t&&t!=this._ownerElement)throw new At(xt)
var i=this.getNamedItem(e.nodeName)
Nt(this._ownerElement,this,e,i)
return i},setNamedItemNS:function(e){var t,i=e.ownerElement
if(i&&i!=this._ownerElement)throw new At(xt)
t=this.getNamedItemNS(e.namespaceURI,e.localName)
Nt(this._ownerElement,this,e,t)
return t},removeNamedItem:function(e){var t=this.getNamedItem(e)
Ut(this._ownerElement,this,t)
return t},removeNamedItemNS:function(e,t){var i=this.getNamedItemNS(e,t)
Ut(this._ownerElement,this,i)
return i},getNamedItemNS:function(e,t){for(var i=this.length;i--;){var n=this[i]
if(n.localName==t&&n.namespaceURI==e)return n}return null}}
function Bt(){}Bt.prototype={hasFeature:function(e,t){return!0},createDocument:function(e,t,i){var n=new Ht
n.implementation=this
n.childNodes=new Ot
n.doctype=i||null
i&&n.appendChild(i)
if(t){var r=n.createElementNS(e,t)
n.appendChild(r)}return n},createDocumentType:function(e,t,i){var n=new Zt
n.name=e
n.nodeName=e
n.publicId=t||""
n.systemId=i||""
return n}}
function Ft(){}Ft.prototype={firstChild:null,lastChild:null,previousSibling:null,nextSibling:null,attributes:null,parentNode:null,childNodes:null,ownerDocument:null,nodeValue:null,namespaceURI:null,prefix:null,localName:null,insertBefore:function(e,t){return zt(this,e,t)},replaceChild:function(e,t){this.insertBefore(e,t)
t&&this.removeChild(t)},removeChild:function(e){return Gt(this,e)},appendChild:function(e){return this.insertBefore(e,null)},hasChildNodes:function(){return null!=this.firstChild},cloneNode:function(e){return di(this.ownerDocument||this,this,e)},normalize:function(){for(var e=this.firstChild;e;){var t=e.nextSibling
if(t&&t.nodeType==mt&&e.nodeType==mt){this.removeChild(t)
e.appendData(t.data)}else{e.normalize()
e=t}}},isSupported:function(e,t){return this.ownerDocument.implementation.hasFeature(e,t)},hasAttributes:function(){return this.attributes.length>0},lookupPrefix:function(e){for(var t=this;t;){var i=t._nsMap
if(i)for(var n in i)if(i[n]==e)return n
t=t.nodeType==ft?t.ownerDocument:t.parentNode}return null},lookupNamespaceURI:function(e){for(var t=this;t;){var i=t._nsMap
if(i&&e in i)return i[e]
t=t.nodeType==ft?t.ownerDocument:t.parentNode}return null},isDefaultNamespace:function(e){return null==this.lookupPrefix(e)}}
function jt(e){return("<"==e?"&lt;":">"==e&&"&gt;")||"&"==e&&"&amp;"||'"'==e&&"&quot;"||"&#"+e.charCodeAt()+";"}ct(ht,Ft)
ct(ht,Ft.prototype)
function Vt(e,t){if(t(e))return!0
if(e=e.firstChild)do{if(Vt(e,t))return!0}while(e=e.nextSibling)}function Ht(){}function qt(e,t,i,n){e&&e._inc++
i.namespaceURI===st.XMLNS&&delete t._nsMap[i.prefix?i.localName:""]}function Wt(e,t,i){if(e&&e._inc){e._inc++
var n=t.childNodes
if(i)n[n.length++]=i
else{for(var r=t.firstChild,a=0;r;){n[a++]=r
r=r.nextSibling}n.length=a}}}function Gt(e,t){var i=t.previousSibling,n=t.nextSibling
i?i.nextSibling=n:e.firstChild=n
n?n.previousSibling=i:e.lastChild=i
Wt(e.ownerDocument,e)
return t}function zt(e,t,i){var n=t.parentNode
n&&n.removeChild(t)
if(t.nodeType===kt){var r=t.firstChild
if(null==r)return t
var a=t.lastChild}else r=a=t
var s=i?i.previousSibling:e.lastChild
r.previousSibling=s
a.nextSibling=i
s?s.nextSibling=r:e.firstChild=r
null==i?e.lastChild=a:i.previousSibling=a
do{r.parentNode=e}while(r!==a&&(r=r.nextSibling))
Wt(e.ownerDocument||e,e)
t.nodeType==kt&&(t.firstChild=t.lastChild=null)
return t}Ht.prototype={nodeName:"#document",nodeType:Tt,doctype:null,documentElement:null,_inc:1,insertBefore:function(e,t){if(e.nodeType==kt){for(var i=e.firstChild;i;){var n=i.nextSibling
this.insertBefore(i,t)
i=n}return e}null==this.documentElement&&e.nodeType==pt&&(this.documentElement=e)
return zt(this,e,t),e.ownerDocument=this,e},removeChild:function(e){this.documentElement==e&&(this.documentElement=null)
return Gt(this,e)},importNode:function(e,t){return ci(this,e,t)},getElementById:function(e){var t=null
Vt(this.documentElement,(function(i){if(i.nodeType==pt&&i.getAttribute("id")==e){t=i
return!0}}))
return t},getElementsByClassName:function(e){var t=lt(e)
return new Lt(this,(function(i){var n=[]
t.length>0&&Vt(i.documentElement,(function(r){if(r!==i&&r.nodeType===pt){var a=r.getAttribute("class")
if(a){var s=e===a
if(!s){var o=lt(a)
s=t.every((u=o,function(e){return u&&-1!==u.indexOf(e)}))}s&&n.push(r)}}var u}))
return n}))},createElement:function(e){var t=new Kt
t.ownerDocument=this
t.nodeName=e
t.tagName=e
t.localName=e
t.childNodes=new Ot;(t.attributes=new Rt)._ownerElement=t
return t},createDocumentFragment:function(){var e=new ni
e.ownerDocument=this
e.childNodes=new Ot
return e},createTextNode:function(e){var t=new Qt
t.ownerDocument=this
t.appendData(e)
return t},createComment:function(e){var t=new $t
t.ownerDocument=this
t.appendData(e)
return t},createCDATASection:function(e){var t=new Jt
t.ownerDocument=this
t.appendData(e)
return t},createProcessingInstruction:function(e,t){var i=new ri
i.ownerDocument=this
i.tagName=i.target=e
i.nodeValue=i.data=t
return i},createAttribute:function(e){var t=new Xt
t.ownerDocument=this
t.name=e
t.nodeName=e
t.localName=e
t.specified=!0
return t},createEntityReference:function(e){var t=new ii
t.ownerDocument=this
t.nodeName=e
return t},createElementNS:function(e,t){var i=new Kt,n=t.split(":"),r=i.attributes=new Rt
i.childNodes=new Ot
i.ownerDocument=this
i.nodeName=t
i.tagName=t
i.namespaceURI=e
if(2==n.length){i.prefix=n[0]
i.localName=n[1]}else i.localName=t
r._ownerElement=i
return i},createAttributeNS:function(e,t){var i=new Xt,n=t.split(":")
i.ownerDocument=this
i.nodeName=t
i.name=t
i.namespaceURI=e
i.specified=!0
if(2==n.length){i.prefix=n[0]
i.localName=n[1]}else i.localName=t
return i}}
dt(Ht,Ft)
function Kt(){this._nsMap={}}Kt.prototype={nodeType:pt,hasAttribute:function(e){return null!=this.getAttributeNode(e)},getAttribute:function(e){var t=this.getAttributeNode(e)
return t&&t.value||""},getAttributeNode:function(e){return this.attributes.getNamedItem(e)},setAttribute:function(e,t){var i=this.ownerDocument.createAttribute(e)
i.value=i.nodeValue=""+t
this.setAttributeNode(i)},removeAttribute:function(e){var t=this.getAttributeNode(e)
t&&this.removeAttributeNode(t)},appendChild:function(e){return e.nodeType===kt?this.insertBefore(e,null):function(e,t){var i=t.parentNode
if(i){var n=e.lastChild
i.removeChild(t)
n=e.lastChild}n=e.lastChild
t.parentNode=e
t.previousSibling=n
t.nextSibling=null
n?n.nextSibling=t:e.firstChild=t
e.lastChild=t
Wt(e.ownerDocument,e,t)
return t}(this,e)},setAttributeNode:function(e){return this.attributes.setNamedItem(e)},setAttributeNodeNS:function(e){return this.attributes.setNamedItemNS(e)},removeAttributeNode:function(e){return this.attributes.removeNamedItem(e.nodeName)},removeAttributeNS:function(e,t){var i=this.getAttributeNodeNS(e,t)
i&&this.removeAttributeNode(i)},hasAttributeNS:function(e,t){return null!=this.getAttributeNodeNS(e,t)},getAttributeNS:function(e,t){var i=this.getAttributeNodeNS(e,t)
return i&&i.value||""},setAttributeNS:function(e,t,i){var n=this.ownerDocument.createAttributeNS(e,t)
n.value=n.nodeValue=""+i
this.setAttributeNode(n)},getAttributeNodeNS:function(e,t){return this.attributes.getNamedItemNS(e,t)},getElementsByTagName:function(e){return new Lt(this,(function(t){var i=[]
Vt(t,(function(n){n===t||n.nodeType!=pt||"*"!==e&&n.tagName!=e||i.push(n)}))
return i}))},getElementsByTagNameNS:function(e,t){return new Lt(this,(function(i){var n=[]
Vt(i,(function(r){r===i||r.nodeType!==pt||"*"!==e&&r.namespaceURI!==e||"*"!==t&&r.localName!=t||n.push(r)}))
return n}))}}
Ht.prototype.getElementsByTagName=Kt.prototype.getElementsByTagName
Ht.prototype.getElementsByTagNameNS=Kt.prototype.getElementsByTagNameNS
dt(Kt,Ft)
function Xt(){}Xt.prototype.nodeType=ft
dt(Xt,Ft)
function Yt(){}Yt.prototype={data:"",substringData:function(e,t){return this.data.substring(e,e+t)},appendData:function(e){e=this.data+e
this.nodeValue=this.data=e
this.length=e.length},insertData:function(e,t){this.replaceData(e,0,t)},appendChild:function(e){throw new Error(wt[It])},deleteData:function(e,t){this.replaceData(e,t,"")},replaceData:function(e,t,i){i=this.data.substring(0,e)+i+this.data.substring(e+t)
this.nodeValue=this.data=i
this.length=i.length}}
dt(Yt,Ft)
function Qt(){}Qt.prototype={nodeName:"#text",nodeType:mt,splitText:function(e){var t=this.data,i=t.substring(e)
t=t.substring(0,e)
this.data=this.nodeValue=t
this.length=t.length
var n=this.ownerDocument.createTextNode(i)
this.parentNode&&this.parentNode.insertBefore(n,this.nextSibling)
return n}}
dt(Qt,Yt)
function $t(){}$t.prototype={nodeName:"#comment",nodeType:bt}
dt($t,Yt)
function Jt(){}Jt.prototype={nodeName:"#cdata-section",nodeType:gt}
dt(Jt,Yt)
function Zt(){}Zt.prototype.nodeType=St
dt(Zt,Ft)
function ei(){}ei.prototype.nodeType=Et
dt(ei,Ft)
function ti(){}ti.prototype.nodeType=yt
dt(ti,Ft)
function ii(){}ii.prototype.nodeType=vt
dt(ii,Ft)
function ni(){}ni.prototype.nodeName="#document-fragment"
ni.prototype.nodeType=kt
dt(ni,Ft)
function ri(){}ri.prototype.nodeType=_t
dt(ri,Ft)
function ai(){}ai.prototype.serializeToString=function(e,t,i){return si.call(e,t,i)}
Ft.prototype.toString=si
function si(e,t){var i=[],n=9==this.nodeType&&this.documentElement||this,r=n.prefix,a=n.namespaceURI
if(a&&null==r){if(null==(r=n.lookupPrefix(a)))var s=[{namespace:a,prefix:null}]}li(this,i,e,t,s)
return i.join("")}function oi(e,t,i){var n=e.prefix||"",r=e.namespaceURI
if(!r)return!1
if("xml"===n&&r===st.XML||r===st.XMLNS)return!1
for(var a=i.length;a--;){var s=i[a]
if(s.prefix===n)return s.namespace!==r}return!0}function ui(e,t,i){e.push(" ",t,'="',i.replace(/[<&"]/g,jt),'"')}function li(e,t,i,n,r){r||(r=[])
if(n){if(!(e=n(e)))return
if("string"==typeof e){t.push(e)
return}}switch(e.nodeType){case pt:var a=e.attributes,s=a.length,o=e.firstChild,u=e.tagName,l=u
if(!(i=st.isHTML(e.namespaceURI)||i)&&!e.prefix&&e.namespaceURI){for(var c,d=0;d<a.length;d++)if("xmlns"===a.item(d).name){c=a.item(d).value
break}if(!c)for(var h=r.length-1;h>=0;h--){if(""===(p=r[h]).prefix&&p.namespace===e.namespaceURI){c=p.namespace
break}}if(c!==e.namespaceURI)for(h=r.length-1;h>=0;h--){var p
if((p=r[h]).namespace===e.namespaceURI){p.prefix&&(l=p.prefix+":"+u)
break}}}t.push("<",l)
for(var f=0;f<s;f++){"xmlns"==(m=a.item(f)).prefix?r.push({prefix:m.localName,namespace:m.value}):"xmlns"==m.nodeName&&r.push({prefix:"",namespace:m.value})}for(f=0;f<s;f++){var m
if(oi(m=a.item(f),0,r)){ui(t,(g=m.prefix||"")?"xmlns:"+g:"xmlns",v=m.namespaceURI)
r.push({prefix:g,namespace:v})}li(m,t,i,n,r)}if(u===l&&oi(e,0,r)){var g,v
ui(t,(g=e.prefix||"")?"xmlns:"+g:"xmlns",v=e.namespaceURI)
r.push({prefix:g,namespace:v})}if(o||i&&!/^(?:meta|link|img|br|hr|input)$/i.test(u)){t.push(">")
if(i&&/^script$/i.test(u))for(;o;){o.data?t.push(o.data):li(o,t,i,n,r.slice())
o=o.nextSibling}else for(;o;){li(o,t,i,n,r.slice())
o=o.nextSibling}t.push("</",l,">")}else t.push("/>")
return
case Tt:case kt:for(o=e.firstChild;o;){li(o,t,i,n,r.slice())
o=o.nextSibling}return
case ft:return ui(t,e.name,e.value)
case mt:return t.push(e.data.replace(/[<&]/g,jt).replace(/]]>/g,"]]&gt;"))
case gt:return t.push("<![CDATA[",e.data,"]]>")
case bt:return t.push("\x3c!--",e.data,"--\x3e")
case St:var y=e.publicId,_=e.systemId
t.push("<!DOCTYPE ",e.name)
if(y){t.push(" PUBLIC ",y)
_&&"."!=_&&t.push(" ",_)
t.push(">")}else if(_&&"."!=_)t.push(" SYSTEM ",_,">")
else{var b=e.internalSubset
b&&t.push(" [",b,"]")
t.push(">")}return
case _t:return t.push("<?",e.target," ",e.data,"?>")
case vt:return t.push("&",e.nodeName,";")
default:t.push("??",e.nodeName)}}function ci(e,t,i){var n
switch(t.nodeType){case pt:(n=t.cloneNode(!1)).ownerDocument=e
case kt:break
case ft:i=!0}n||(n=t.cloneNode(!1))
n.ownerDocument=e
n.parentNode=null
if(i)for(var r=t.firstChild;r;){n.appendChild(ci(e,r,i))
r=r.nextSibling}return n}function di(e,t,i){var n=new t.constructor
for(var r in t){var a=t[r]
"object"!=typeof a&&a!=n[r]&&(n[r]=a)}t.childNodes&&(n.childNodes=new Ot)
n.ownerDocument=e
switch(n.nodeType){case pt:var s=t.attributes,o=n.attributes=new Rt,u=s.length
o._ownerElement=n
for(var l=0;l<u;l++)n.setAttributeNode(di(e,s.item(l),!0))
break
case ft:i=!0}if(i)for(var c=t.firstChild;c;){n.appendChild(di(e,c,i))
c=c.nextSibling}return n}function hi(e,t,i){e[t]=i}try{if(Object.defineProperty){Object.defineProperty(Lt.prototype,"length",{get:function(){Dt(this)
return this.$$length}})
Object.defineProperty(Ft.prototype,"textContent",{get:function(){return L_(this)},set:function(e){switch(this.nodeType){case pt:case kt:for(;this.firstChild;)this.removeChild(this.firstChild);(e||String(e))&&this.appendChild(this.ownerDocument.createTextNode(e))
break
default:this.data=e
this.value=e
this.nodeValue=e}}})
function L_(e){switch(e.nodeType){case pt:case kt:var t=[]
e=e.firstChild
for(;e;){7!==e.nodeType&&8!==e.nodeType&&t.push(L_(e))
e=e.nextSibling}return t.join("")
default:return e.nodeValue}}hi=function(e,t,i){e["$$"+t]=i}}}catch(D_){}var pi={DocumentType:Zt,DOMException:At,DOMImplementation:Bt,Element:Kt,Node:Ft,NodeList:Ot,XMLSerializer:ai},fi=w((function(e,t){var i=at.freeze
t.XML_ENTITIES=i({amp:"&",apos:"'",gt:">",lt:"<",quot:'"'})
t.HTML_ENTITIES=i({lt:"<",gt:">",amp:"&",quot:'"',apos:"'",Agrave:"À",Aacute:"Á",Acirc:"Â",Atilde:"Ã",Auml:"Ä",Aring:"Å",AElig:"Æ",Ccedil:"Ç",Egrave:"È",Eacute:"É",Ecirc:"Ê",Euml:"Ë",Igrave:"Ì",Iacute:"Í",Icirc:"Î",Iuml:"Ï",ETH:"Ð",Ntilde:"Ñ",Ograve:"Ò",Oacute:"Ó",Ocirc:"Ô",Otilde:"Õ",Ouml:"Ö",Oslash:"Ø",Ugrave:"Ù",Uacute:"Ú",Ucirc:"Û",Uuml:"Ü",Yacute:"Ý",THORN:"Þ",szlig:"ß",agrave:"à",aacute:"á",acirc:"â",atilde:"ã",auml:"ä",aring:"å",aelig:"æ",ccedil:"ç",egrave:"è",eacute:"é",ecirc:"ê",euml:"ë",igrave:"ì",iacute:"í",icirc:"î",iuml:"ï",eth:"ð",ntilde:"ñ",ograve:"ò",oacute:"ó",ocirc:"ô",otilde:"õ",ouml:"ö",oslash:"ø",ugrave:"ù",uacute:"ú",ucirc:"û",uuml:"ü",yacute:"ý",thorn:"þ",yuml:"ÿ",nbsp:" ",iexcl:"¡",cent:"¢",pound:"£",curren:"¤",yen:"¥",brvbar:"¦",sect:"§",uml:"¨",copy:"©",ordf:"ª",laquo:"«",not:"¬",shy:"­­",reg:"®",macr:"¯",deg:"°",plusmn:"±",sup2:"²",sup3:"³",acute:"´",micro:"µ",para:"¶",middot:"·",cedil:"¸",sup1:"¹",ordm:"º",raquo:"»",frac14:"¼",frac12:"½",frac34:"¾",iquest:"¿",times:"×",divide:"÷",forall:"∀",part:"∂",exist:"∃",empty:"∅",nabla:"∇",isin:"∈",notin:"∉",ni:"∋",prod:"∏",sum:"∑",minus:"−",lowast:"∗",radic:"√",prop:"∝",infin:"∞",ang:"∠",and:"∧",or:"∨",cap:"∩",cup:"∪",int:"∫",there4:"∴",sim:"∼",cong:"≅",asymp:"≈",ne:"≠",equiv:"≡",le:"≤",ge:"≥",sub:"⊂",sup:"⊃",nsub:"⊄",sube:"⊆",supe:"⊇",oplus:"⊕",otimes:"⊗",perp:"⊥",sdot:"⋅",Alpha:"Α",Beta:"Β",Gamma:"Γ",Delta:"Δ",Epsilon:"Ε",Zeta:"Ζ",Eta:"Η",Theta:"Θ",Iota:"Ι",Kappa:"Κ",Lambda:"Λ",Mu:"Μ",Nu:"Ν",Xi:"Ξ",Omicron:"Ο",Pi:"Π",Rho:"Ρ",Sigma:"Σ",Tau:"Τ",Upsilon:"Υ",Phi:"Φ",Chi:"Χ",Psi:"Ψ",Omega:"Ω",alpha:"α",beta:"β",gamma:"γ",delta:"δ",epsilon:"ε",zeta:"ζ",eta:"η",theta:"θ",iota:"ι",kappa:"κ",lambda:"λ",mu:"μ",nu:"ν",xi:"ξ",omicron:"ο",pi:"π",rho:"ρ",sigmaf:"ς",sigma:"σ",tau:"τ",upsilon:"υ",phi:"φ",chi:"χ",psi:"ψ",omega:"ω",thetasym:"ϑ",upsih:"ϒ",piv:"ϖ",OElig:"Œ",oelig:"œ",Scaron:"Š",scaron:"š",Yuml:"Ÿ",fnof:"ƒ",circ:"ˆ",tilde:"˜",ensp:" ",emsp:" ",thinsp:" ",zwnj:"‌",zwj:"‍",lrm:"‎",rlm:"‏",ndash:"–",mdash:"—",lsquo:"‘",rsquo:"’",sbquo:"‚",ldquo:"“",rdquo:"”",bdquo:"„",dagger:"†",Dagger:"‡",bull:"•",hellip:"…",permil:"‰",prime:"′",Prime:"″",lsaquo:"‹",rsaquo:"›",oline:"‾",euro:"€",trade:"™",larr:"←",uarr:"↑",rarr:"→",darr:"↓",harr:"↔",crarr:"↵",lceil:"⌈",rceil:"⌉",lfloor:"⌊",rfloor:"⌋",loz:"◊",spades:"♠",clubs:"♣",hearts:"♥",diams:"♦"})
t.entityMap=t.HTML_ENTITIES})),mi=(fi.XML_ENTITIES,fi.HTML_ENTITIES,fi.entityMap,at.NAMESPACE),gi=/[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,vi=new RegExp("[\\-\\.0-9"+gi.source.slice(1,-1)+"\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"),yi=new RegExp("^"+gi.source+vi.source+"*(?::"+gi.source+vi.source+"*)?$")
function _i(e,t){this.message=e
this.locator=t
Error.captureStackTrace&&Error.captureStackTrace(this,_i)}_i.prototype=new Error
_i.prototype.name=_i.name
function bi(){}bi.prototype={parse:function(e,t,i){var n=this.domBuilder
n.startDocument()
wi(t,t={})
!function(e,t,i,n,r){function a(e){if(e>65535){var t=55296+((e-=65536)>>10),i=56320+(1023&e)
return String.fromCharCode(t,i)}return String.fromCharCode(e)}function s(e){var t=e.slice(1,-1)
if(t in i)return i[t]
if("#"===t.charAt(0))return a(parseInt(t.substr(1).replace("x","0x")))
r.error("entity not found:"+e)
return e}function o(t){if(t>m){var i=e.substring(m,t).replace(/&#?\w+;/g,s)
h&&u(m)
n.characters(i,0,t-m)
m=t}}function u(t,i){for(;t>=c&&(i=d.exec(e));){l=i.index
c=l+i[0].length
h.lineNumber++}h.columnNumber=t-l+1}var l=0,c=0,d=/.*(?:\r\n?|\n)|.*$/g,h=n.locator,p=[{currentNSMap:t}],f={},m=0
for(;;){try{var g=e.indexOf("<",m)
if(g<0){if(!e.substr(m).match(/^\s*$/)){var v=n.doc,y=v.createTextNode(e.substr(m))
v.appendChild(y)
n.currentElement=y}return}g>m&&o(g)
switch(e.charAt(g+1)){case"/":var _=e.indexOf(">",g+3),b=e.substring(g+2,_).replace(/[ \t\n\r]+$/g,""),T=p.pop()
if(_<0){b=e.substring(g+2).replace(/[\s<].*/,"")
r.error("end tag name: "+b+" is not complete:"+T.tagName)
_=g+1+b.length}else if(b.match(/\s</)){b=b.replace(/[\s<].*/,"")
r.error("end tag name: "+b+" maybe not complete")
_=g+1+b.length}var S=T.localNSMap,k=T.tagName==b
if(k||T.tagName&&T.tagName.toLowerCase()==b.toLowerCase()){n.endElement(T.uri,T.localName,b)
if(S)for(var E in S)n.endPrefixMapping(E)
k||r.fatalError("end tag name: "+b+" is not match the current start tagName:"+T.tagName)}else p.push(T)
_++
break
case"?":h&&u(g)
_=Pi(e,g,n)
break
case"!":h&&u(g)
_=Ii(e,g,n,r)
break
default:h&&u(g)
var C=new xi,w=p[p.length-1].currentNSMap,I=(_=Si(e,g,C,w,s,r),C.length)
if(!C.closed&&Ci(e,_,C.tagName,f)){C.closed=!0
i.nbsp||r.warning("unclosed xml attribute")}if(h&&I){for(var P=Ti(h,{}),x=0;x<I;x++){var A=C[x]
u(A.offset)
A.locator=Ti(h,{})}n.locator=P
ki(C,n,w)&&p.push(C)
n.locator=h}else ki(C,n,w)&&p.push(C)
mi.isHTML(C.uri)&&!C.closed?_=Ei(e,_,C.tagName,s,n):_++}}catch(e){if(e instanceof _i)throw e
r.error("element parse error: "+e)
_=-1}_>m?m=_:o(Math.max(g,m)+1)}}(e,t,i,n,this.errorHandler)
n.endDocument()}}
function Ti(e,t){t.lineNumber=e.lineNumber
t.columnNumber=e.columnNumber
return t}function Si(e,t,i,n,r,a){function s(e,t,n){i.attributeNames.hasOwnProperty(e)&&a.fatalError("Attribute "+e+" redefined")
i.addValue(e,t,n)}for(var o,u=++t,l=0;;){var c=e.charAt(u)
switch(c){case"=":if(1===l){o=e.slice(t,u)
l=3}else{if(2!==l)throw new Error("attribute equal must after attrName")
l=3}break
case"'":case'"':if(3===l||1===l){if(1===l){a.warning('attribute value must after "="')
o=e.slice(t,u)}t=u+1
if(!((u=e.indexOf(c,t))>0))throw new Error("attribute value no end '"+c+"' match")
s(o,d=e.slice(t,u).replace(/&#?\w+;/g,r),t-1)
l=5}else{if(4!=l)throw new Error('attribute value must after "="')
s(o,d=e.slice(t,u).replace(/&#?\w+;/g,r),t)
a.warning('attribute "'+o+'" missed start quot('+c+")!!")
t=u+1
l=5}break
case"/":switch(l){case 0:i.setTagName(e.slice(t,u))
case 5:case 6:case 7:l=7
i.closed=!0
case 4:case 1:case 2:break
default:throw new Error("attribute invalid close char('/')")}break
case"":a.error("unexpected end of input")
0==l&&i.setTagName(e.slice(t,u))
return u
case">":switch(l){case 0:i.setTagName(e.slice(t,u))
case 5:case 6:case 7:break
case 4:case 1:if("/"===(d=e.slice(t,u)).slice(-1)){i.closed=!0
d=d.slice(0,-1)}case 2:2===l&&(d=o)
if(4==l){a.warning('attribute "'+d+'" missed quot(")!')
s(o,d.replace(/&#?\w+;/g,r),t)}else{mi.isHTML(n[""])&&d.match(/^(?:disabled|checked|selected)$/i)||a.warning('attribute "'+d+'" missed value!! "'+d+'" instead!!')
s(d,d,t)}break
case 3:throw new Error("attribute value missed!!")}return u
case"":c=" "
default:if(c<=" ")switch(l){case 0:i.setTagName(e.slice(t,u))
l=6
break
case 1:o=e.slice(t,u)
l=2
break
case 4:var d=e.slice(t,u).replace(/&#?\w+;/g,r)
a.warning('attribute "'+d+'" missed quot(")!!')
s(o,d,t)
case 5:l=6}else switch(l){case 2:i.tagName
mi.isHTML(n[""])&&o.match(/^(?:disabled|checked|selected)$/i)||a.warning('attribute "'+o+'" missed value!! "'+o+'" instead2!!')
s(o,o,t)
t=u
l=1
break
case 5:a.warning('attribute space is required"'+o+'"!!')
case 6:l=1
t=u
break
case 3:l=4
t=u
break
case 7:throw new Error("elements closed character '/' and '>' must be connected to")}}u++}}function ki(e,t,i){for(var n=e.tagName,r=null,a=e.length;a--;){var s=e[a],o=s.qName,u=s.value
if((h=o.indexOf(":"))>0)var l=s.prefix=o.slice(0,h),c=o.slice(h+1),d="xmlns"===l&&c
else{c=o
l=null
d="xmlns"===o&&""}s.localName=c
if(!1!==d){if(null==r){r={}
wi(i,i={})}i[d]=r[d]=u
s.uri=mi.XMLNS
t.startPrefixMapping(d,u)}}for(a=e.length;a--;){if(l=(s=e[a]).prefix){"xml"===l&&(s.uri=mi.XML)
"xmlns"!==l&&(s.uri=i[l||""])}}var h
if((h=n.indexOf(":"))>0){l=e.prefix=n.slice(0,h)
c=e.localName=n.slice(h+1)}else{l=null
c=e.localName=n}var p=e.uri=i[l||""]
t.startElement(p,c,n,e)
if(!e.closed){e.currentNSMap=i
e.localNSMap=r
return!0}t.endElement(p,c,n)
if(r)for(l in r)t.endPrefixMapping(l)}function Ei(e,t,i,n,r){if(/^(?:script|textarea)$/i.test(i)){var a=e.indexOf("</"+i+">",t),s=e.substring(t+1,a)
if(/[&<]/.test(s)){if(/^script$/i.test(i)){r.characters(s,0,s.length)
return a}s=s.replace(/&#?\w+;/g,n)
r.characters(s,0,s.length)
return a}}return t+1}function Ci(e,t,i,n){var r=n[i]
if(null==r){(r=e.lastIndexOf("</"+i+">"))<t&&(r=e.lastIndexOf("</"+i))
n[i]=r}return r<t}function wi(e,t){for(var i in e)t[i]=e[i]}function Ii(e,t,i,n){if("-"===e.charAt(t+2)){if("-"===e.charAt(t+3)){if((r=e.indexOf("--\x3e",t+4))>t){i.comment(e,t+4,r-t-4)
return r+3}n.error("Unclosed comment")
return-1}return-1}if("CDATA["==e.substr(t+3,6)){var r=e.indexOf("]]>",t+9)
i.startCDATA()
i.characters(e,t+9,r-t-9)
i.endCDATA()
return r+3}var a=function(e,t){var i,n=[],r=/'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g
r.lastIndex=t
r.exec(e)
for(;i=r.exec(e);){n.push(i)
if(i[1])return n}}(e,t),s=a.length
if(s>1&&/!doctype/i.test(a[0][0])){var o=a[1][0],u=!1,l=!1
if(s>3)if(/^public$/i.test(a[2][0])){u=a[3][0]
l=s>4&&a[4][0]}else/^system$/i.test(a[2][0])&&(l=a[3][0])
var c=a[s-1]
i.startDTD(o,u,l)
i.endDTD()
return c.index+c[0].length}return-1}function Pi(e,t,i){var n=e.indexOf("?>",t)
if(n){var r=e.substring(t,n).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/)
if(r){r[0].length
i.processingInstruction(r[1],r[2])
return n+2}return-1}return-1}function xi(){this.attributeNames={}}xi.prototype={setTagName:function(e){if(!yi.test(e))throw new Error("invalid tagName:"+e)
this.tagName=e},addValue:function(e,t,i){if(!yi.test(e))throw new Error("invalid attribute:"+e)
this.attributeNames[e]=this.length
this[this.length++]={qName:e,value:t,offset:i}},length:0,getLocalName:function(e){return this[e].localName},getLocator:function(e){return this[e].locator},getQName:function(e){return this[e].qName},getURI:function(e){return this[e].uri},getValue:function(e){return this[e].value}}
var Ai={XMLReader:bi,ParseError:_i},Oi=pi.DOMImplementation,Li=at.NAMESPACE,Di=Ai.ParseError,Ri=Ai.XMLReader
function Mi(e){this.options=e||{locator:{}}}Mi.prototype.parseFromString=function(e,t){var i=this.options,n=new Ri,r=i.domBuilder||new Ni,a=i.errorHandler,s=i.locator,o=i.xmlns||{},u=/\/x?html?$/.test(t),l=u?fi.HTML_ENTITIES:fi.XML_ENTITIES
s&&r.setDocumentLocator(s)
n.errorHandler=function(e,t,i){if(!e){if(t instanceof Ni)return t
e=t}var n={},r=e instanceof Function
i=i||{}
function a(t){var a=e[t]
!a&&r&&(a=2==e.length?function(i){e(t,i)}:e)
n[t]=a&&function(e){a("[xmldom "+t+"]\t"+e+Bi(i))}||function(){}}a("warning")
a("error")
a("fatalError")
return n}(a,r,s)
n.domBuilder=i.domBuilder||r
u&&(o[""]=Li.HTML)
o.xml=o.xml||Li.XML
e&&"string"==typeof e?n.parse(e,o,l):n.errorHandler.error("invalid doc source")
return r.doc}
function Ni(){this.cdata=!1}function Ui(e,t){t.lineNumber=e.lineNumber
t.columnNumber=e.columnNumber}Ni.prototype={startDocument:function(){this.doc=(new Oi).createDocument(null,null,null)
this.locator&&(this.doc.documentURI=this.locator.systemId)},startElement:function(e,t,i,n){var r=this.doc,a=r.createElementNS(e,i||t),s=n.length
ji(this,a)
this.currentElement=a
this.locator&&Ui(this.locator,a)
for(var o=0;o<s;o++){e=n.getURI(o)
var u=n.getValue(o),l=(i=n.getQName(o),r.createAttributeNS(e,i))
this.locator&&Ui(n.getLocator(o),l)
l.value=l.nodeValue=u
a.setAttributeNode(l)}},endElement:function(e,t,i){var n=this.currentElement
n.tagName
this.currentElement=n.parentNode},startPrefixMapping:function(e,t){},endPrefixMapping:function(e){},processingInstruction:function(e,t){var i=this.doc.createProcessingInstruction(e,t)
this.locator&&Ui(this.locator,i)
ji(this,i)},ignorableWhitespace:function(e,t,i){},characters:function(e,t,i){if(e=Fi.apply(this,arguments)){if(this.cdata)var n=this.doc.createCDATASection(e)
else n=this.doc.createTextNode(e)
this.currentElement?this.currentElement.appendChild(n):/^\s*$/.test(e)&&this.doc.appendChild(n)
this.locator&&Ui(this.locator,n)}},skippedEntity:function(e){},endDocument:function(){this.doc.normalize()},setDocumentLocator:function(e){(this.locator=e)&&(e.lineNumber=0)},comment:function(e,t,i){e=Fi.apply(this,arguments)
var n=this.doc.createComment(e)
this.locator&&Ui(this.locator,n)
ji(this,n)},startCDATA:function(){this.cdata=!0},endCDATA:function(){this.cdata=!1},startDTD:function(e,t,i){var n=this.doc.implementation
if(n&&n.createDocumentType){var r=n.createDocumentType(e,t,i)
this.locator&&Ui(this.locator,r)
ji(this,r)
this.doc.doctype=r}},warning:function(e){console.warn("[xmldom warning]\t"+e,Bi(this.locator))},error:function(e){console.error("[xmldom error]\t"+e,Bi(this.locator))},fatalError:function(e){throw new Di(e,this.locator)}}
function Bi(e){if(e)return"\n@"+(e.systemId||"")+"#[line:"+e.lineNumber+",col:"+e.columnNumber+"]"}function Fi(e,t,i){return"string"==typeof e?e.substr(t,i):e.length>=t+i||t?new java.lang.String(e,t,i)+"":e}"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,(function(e){Ni.prototype[e]=function(){return null}}))
function ji(e,t){e.currentElement?e.currentElement.appendChild(t):e.doc.appendChild(t)}var Vi={__DOMHandler:Ni,DOMParser:Mi,DOMImplementation:pi.DOMImplementation,XMLSerializer:pi.XMLSerializer}.DOMParser,Hi=function(e){return!!e&&"object"==typeof e},qi=function e(){for(var t=arguments.length,i=new Array(t),n=0;n<t;n++)i[n]=arguments[n]
return i.reduce((function(t,i){if("object"!=typeof i)return t
Object.keys(i).forEach((function(n){Array.isArray(t[n])&&Array.isArray(i[n])?t[n]=t[n].concat(i[n]):Hi(t[n])&&Hi(i[n])?t[n]=e(t[n],i[n]):t[n]=i[n]}))
return t}),{})},Wi=function(e){return Object.keys(e).map((function(t){return e[t]}))},Gi=function(e){return e.reduce((function(e,t){return e.concat(t)}),[])},zi=function(e){if(!e.length)return[]
for(var t=[],i=0;i<e.length;i++)t.push(e[i])
return t},Ki=function(e,t){for(var i=0;i<e.length;i++)if(t(e[i]))return i
return-1},Xi="INVALID_NUMBER_OF_PERIOD",Yi="DASH_EMPTY_MANIFEST",Qi="DASH_INVALID_XML",$i="NO_BASE_URL",Ji="SEGMENT_TIME_UNSPECIFIED",Zi="UNSUPPORTED_UTC_TIMING_SCHEME",en=function(e){var t=e.baseUrl,i=void 0===t?"":t,n=e.source,r=void 0===n?"":n,a=e.range,s=void 0===a?"":a,o=e.indexRange,u=void 0===o?"":o,l={uri:r,resolvedUri:tt(i||"",r)}
if(s||u){var c,d=(s||u).split("-"),h=x.BigInt?x.BigInt(d[0]):parseInt(d[0],10),p=x.BigInt?x.BigInt(d[1]):parseInt(d[1],10)
h<Number.MAX_SAFE_INTEGER&&"bigint"==typeof h&&(h=Number(h))
p<Number.MAX_SAFE_INTEGER&&"bigint"==typeof p&&(p=Number(p))
"bigint"==typeof(c="bigint"==typeof p||"bigint"==typeof h?x.BigInt(p)-x.BigInt(h)+x.BigInt(1):p-h+1)&&c<Number.MAX_SAFE_INTEGER&&(c=Number(c))
l.byterange={length:c,offset:h}}return l},tn=function(e){e&&"number"!=typeof e&&(e=parseInt(e,10))
return isNaN(e)?null:e},nn={static:function(e){var t=e.duration,i=e.timescale,n=void 0===i?1:i,r=e.sourceDuration,a=e.periodDuration,s=tn(e.endNumber),o=t/n
return"number"==typeof s?{start:0,end:s}:"number"==typeof a?{start:0,end:a/o}:{start:0,end:r/o}},dynamic:function(e){var t=e.NOW,i=e.clientOffset,n=e.availabilityStartTime,r=e.timescale,a=void 0===r?1:r,s=e.duration,o=e.periodStart,u=void 0===o?0:o,l=e.minimumUpdatePeriod,c=void 0===l?0:l,d=e.timeShiftBufferDepth,h=void 0===d?1/0:d,p=tn(e.endNumber),f=(t+i)/1e3,m=n+u,g=f+c-m,v=Math.ceil(g*a/s),y=Math.floor((f-m-h)*a/s),_=Math.floor((f-m)*a/s)
return{start:Math.max(0,y),end:"number"==typeof p?p:Math.min(v,_)}}},rn=function(e){var t=e.type,i=e.duration,n=e.timescale,r=void 0===n?1:n,a=e.periodDuration,s=e.sourceDuration,o=nn[t](e),u=function(e,t){for(var i=[],n=e;n<t;n++)i.push(n)
return i}(o.start,o.end).map(function(e){return function(t){var i=e.duration,n=e.timescale,r=void 0===n?1:n,a=e.periodStart,s=e.startNumber
return{number:(void 0===s?1:s)+t,duration:i/r,timeline:a,time:t*i}}}(e))
if("static"===t){var l=u.length-1,c="number"==typeof a?a:s
u[l].duration=c-i/r*l}return u},an=function(e){var t=e.baseUrl,i=e.initialization,n=void 0===i?{}:i,r=e.sourceDuration,a=e.indexRange,s=void 0===a?"":a,o=e.periodStart,u=e.presentationTime,l=e.number,c=void 0===l?0:l,d=e.duration
if(!t)throw new Error($i)
var h=en({baseUrl:t,source:n.sourceURL,range:n.range}),p=en({baseUrl:t,source:t,indexRange:s})
p.map=h
if(d){var f=rn(e)
if(f.length){p.duration=f[0].duration
p.timeline=f[0].timeline}}else if(r){p.duration=r
p.timeline=o}p.presentationTime=u||o
p.number=c
return[p]},sn=function(e,t,i){var n,r=e.sidx.map?e.sidx.map:null,a=e.sidx.duration,s=e.timeline||0,o=e.sidx.byterange,u=o.offset+o.length,l=t.timescale,c=t.references.filter((function(e){return 1!==e.referenceType})),d=[],h=e.endList?"static":"dynamic",p=e.sidx.timeline,f=p,m=e.mediaSequence||0
n="bigint"==typeof t.firstOffset?x.BigInt(u)+t.firstOffset:u+t.firstOffset
for(var g=0;g<c.length;g++){var v=t.references[g],y=v.referencedSize,_=v.subsegmentDuration,b=void 0
b="bigint"==typeof n?n+x.BigInt(y)-x.BigInt(1):n+y-1
var T=an({baseUrl:i,timescale:l,timeline:s,periodStart:p,presentationTime:f,number:m,duration:_,sourceDuration:a,indexRange:n+"-"+b,type:h})[0]
r&&(T.map=r)
d.push(T)
n+="bigint"==typeof n?x.BigInt(y):y
f+=_/l
m++}e.segments=d
return e},on=["AUDIO","SUBTITLES"],un=1/60,ln=function(e){return(t=e,i=function(e){return e.timeline},Wi(t.reduce((function(e,t){t.forEach((function(t){e[i(t)]=t}))
return e}),{}))).sort((function(e,t){return e.timeline>t.timeline?1:-1}))
var t,i},cn=function(e){var t,i,n=[]
t=e,i=function(e,t,i,r){n=n.concat(e.playlists||[])},on.forEach((function(e){for(var n in t.mediaGroups[e])for(var r in t.mediaGroups[e][n]){var a=t.mediaGroups[e][n][r]
i(a,e,n,r)}}))
return n},dn=function(e){var t=e.playlist,i=e.mediaSequence
t.mediaSequence=i
t.segments.forEach((function(e,i){e.number=t.mediaSequence+i}))},hn=function(e){var t=e.oldManifest,i=e.newManifest,n=t.playlists.concat(cn(t)),r=i.playlists.concat(cn(i))
i.timelineStarts=ln([t.timelineStarts,i.timelineStarts])
!function(e){var t=e.oldPlaylists,i=e.newPlaylists,n=e.timelineStarts
i.forEach((function(e){e.discontinuitySequence=Ki(n,(function(t){return t.timeline===e.timeline}))
var i=function(e,t){for(var i=0;i<e.length;i++)if(e[i].attributes.NAME===t)return e[i]
return null}(t,e.attributes.NAME)
if(i&&!e.sidx){var r=e.segments[0],a=Ki(i.segments,(function(e){return Math.abs(e.presentationTime-r.presentationTime)<un}))
if(-1!==a){if(i.segments[a].discontinuity&&!r.discontinuity){r.discontinuity=!0
e.discontinuityStarts.unshift(0)
e.discontinuitySequence--}dn({playlist:e,mediaSequence:i.segments[a].number})}else{dn({playlist:e,mediaSequence:i.mediaSequence+i.segments.length})
e.segments[0].discontinuity=!0
e.discontinuityStarts.unshift(0);(!i.segments.length&&e.timeline>i.timeline||i.segments.length&&e.timeline>i.segments[i.segments.length-1].timeline)&&e.discontinuitySequence--}}}))}({oldPlaylists:n,newPlaylists:r,timelineStarts:i.timelineStarts})
return i},pn=function(e){return e&&e.uri+"-"+function(e){var t
t="bigint"==typeof e.offset||"bigint"==typeof e.length?x.BigInt(e.offset)+x.BigInt(e.length)-x.BigInt(1):e.offset+e.length-1
return e.offset+"-"+t}(e.byterange)},fn=function(e){return Wi(e.reduce((function(e,t){var i=t.attributes.id+(t.attributes.lang||"")
if(e[i]){if(t.segments){var n
t.segments[0]&&(t.segments[0].discontinuity=!0);(n=e[i].segments).push.apply(n,t.segments)}t.attributes.contentProtection&&(e[i].attributes.contentProtection=t.attributes.contentProtection)}else{e[i]=t
e[i].attributes.timelineStarts=[]}e[i].attributes.timelineStarts.push({start:t.attributes.periodStart,timeline:t.attributes.periodStart})
return e}),{})).map((function(e){e.discontinuityStarts=(t=e.segments||[],i="discontinuity",t.reduce((function(e,t,n){t[i]&&e.push(n)
return e}),[]))
var t,i
return e}))},mn=function(e,t){var i=pn(e.sidx),n=i&&t[i]&&t[i].sidx
n&&sn(e,n,e.sidx.resolvedUri)
return e},gn=function(e,t){void 0===t&&(t={})
if(!Object.keys(t).length)return e
for(var i in e)e[i]=mn(e[i],t)
return e},vn=function(e){var t,i=e.attributes,n=e.segments,r=e.sidx,a=e.discontinuityStarts,s={attributes:(t={NAME:i.id,AUDIO:"audio",SUBTITLES:"subs",RESOLUTION:{width:i.width,height:i.height},CODECS:i.codecs,BANDWIDTH:i.bandwidth},t["PROGRAM-ID"]=1,t),uri:"",endList:"static"===i.type,timeline:i.periodStart,resolvedUri:"",targetDuration:i.duration,discontinuityStarts:a,timelineStarts:i.timelineStarts,segments:n}
i.contentProtection&&(s.contentProtection=i.contentProtection)
r&&(s.sidx=r)
return s},yn=function(e){var t=e.attributes
return"video/mp4"===t.mimeType||"video/webm"===t.mimeType||"video"===t.contentType},_n=function(e){var t=e.attributes
return"audio/mp4"===t.mimeType||"audio/webm"===t.mimeType||"audio"===t.contentType},bn=function(e){var t=e.attributes
return"text/vtt"===t.mimeType||"text"===t.contentType},Tn=function(e){return e?Object.keys(e).reduce((function(t,i){var n=e[i]
return t.concat(n.playlists)}),[]):[]},Sn=function(e){var t,i=e.dashPlaylists,n=e.locations,r=e.sidxMapping,a=void 0===r?{}:r,s=e.previousManifest
if(!i.length)return{}
var o=i[0].attributes,u=o.sourceDuration,l=o.type,c=o.suggestedPresentationDelay,d=o.minimumUpdatePeriod,h=fn(i.filter(yn)).map(vn),p=fn(i.filter(_n)),f=fn(i.filter(bn)),m=i.map((function(e){return e.attributes.captionServices})).filter(Boolean),g={allowCache:!0,discontinuityStarts:[],segments:[],endList:!0,mediaGroups:(t={AUDIO:{},VIDEO:{}},t["CLOSED-CAPTIONS"]={},t.SUBTITLES={},t),uri:"",duration:u,playlists:gn(h,a)}
d>=0&&(g.minimumUpdatePeriod=1e3*d)
n&&(g.locations=n)
"dynamic"===l&&(g.suggestedPresentationDelay=c)
var v,y,_=0===g.playlists.length,b=p.length?function(e,t,i){void 0===t&&(t={})
void 0===i&&(i=!1)
var n,r=e.reduce((function(e,r){var a=r.attributes.role&&r.attributes.role.value||"",s=r.attributes.lang||"",o=r.attributes.label||"main"
if(s&&!r.attributes.label){var u=a?" ("+a+")":""
o=""+r.attributes.lang+u}e[o]||(e[o]={language:s,autoselect:!0,default:"main"===a,playlists:[],uri:""})
var l=mn(function(e,t){var i,n=e.attributes,r=e.segments,a=e.sidx,s=e.mediaSequence,o=e.discontinuitySequence,u=e.discontinuityStarts,l={attributes:(i={NAME:n.id,BANDWIDTH:n.bandwidth,CODECS:n.codecs},i["PROGRAM-ID"]=1,i),uri:"",endList:"static"===n.type,timeline:n.periodStart,resolvedUri:"",targetDuration:n.duration,discontinuitySequence:o,discontinuityStarts:u,timelineStarts:n.timelineStarts,mediaSequence:s,segments:r}
n.contentProtection&&(l.contentProtection=n.contentProtection)
a&&(l.sidx=a)
if(t){l.attributes.AUDIO="audio"
l.attributes.SUBTITLES="subs"}return l}(r,i),t)
e[o].playlists.push(l)
void 0===n&&"main"===a&&((n=r).default=!0)
return e}),{})
n||(r[Object.keys(r)[0]].default=!0)
return r}(p,a,_):null,T=f.length?function(e,t){void 0===t&&(t={})
return e.reduce((function(e,i){var n=i.attributes.lang||"text"
e[n]||(e[n]={language:n,default:!1,autoselect:!1,playlists:[],uri:""})
e[n].playlists.push(mn(function(e){var t,i=e.attributes,n=e.segments,r=e.mediaSequence,a=e.discontinuityStarts,s=e.discontinuitySequence
if(void 0===n){n=[{uri:i.baseUrl,timeline:i.periodStart,resolvedUri:i.baseUrl||"",duration:i.sourceDuration,number:0}]
i.duration=i.sourceDuration}var o=((t={NAME:i.id,BANDWIDTH:i.bandwidth})["PROGRAM-ID"]=1,t)
i.codecs&&(o.CODECS=i.codecs)
return{attributes:o,uri:"",endList:"static"===i.type,timeline:i.periodStart,resolvedUri:i.baseUrl||"",targetDuration:i.duration,timelineStarts:i.timelineStarts,discontinuityStarts:a,discontinuitySequence:s,mediaSequence:r,segments:n}}(i),t))
return e}),{})}(f,a):null,S=h.concat(Tn(b),Tn(T)),k=S.map((function(e){return e.timelineStarts}))
g.timelineStarts=ln(k)
v=S,y=g.timelineStarts,v.forEach((function(e){e.mediaSequence=0
e.discontinuitySequence=Ki(y,(function(t){return t.timeline===e.timeline}))
e.segments&&e.segments.forEach((function(e,t){e.number=t}))}))
b&&(g.mediaGroups.AUDIO.audio=b)
T&&(g.mediaGroups.SUBTITLES.subs=T)
m.length&&(g.mediaGroups["CLOSED-CAPTIONS"].cc=m.reduce((function(e,t){if(!t)return e
t.forEach((function(t){var i=t.channel,n=t.language
e[n]={autoselect:!1,default:!1,instreamId:i,language:n}
t.hasOwnProperty("aspectRatio")&&(e[n].aspectRatio=t.aspectRatio)
t.hasOwnProperty("easyReader")&&(e[n].easyReader=t.easyReader)
t.hasOwnProperty("3D")&&(e[n]["3D"]=t["3D"])}))
return e}),{}))
return s?hn({oldManifest:s,newManifest:g}):g},kn=function(e,t,i){var n=e.NOW,r=e.clientOffset,a=e.availabilityStartTime,s=e.timescale,o=void 0===s?1:s,u=e.periodStart,l=void 0===u?0:u,c=e.minimumUpdatePeriod,d=(n+r)/1e3+(void 0===c?0:c)-(a+l)
return Math.ceil((d*o-t)/i)},En=function(e,t){for(var i=e.type,n=e.minimumUpdatePeriod,r=void 0===n?0:n,a=e.media,s=void 0===a?"":a,o=e.sourceDuration,u=e.timescale,l=void 0===u?1:u,c=e.startNumber,d=void 0===c?1:c,h=e.periodStart,p=[],f=-1,m=0;m<t.length;m++){var g=t[m],v=g.d,y=g.r||0,_=g.t||0
f<0&&(f=_)
_&&_>f&&(f=_)
var b=void 0
if(y<0){var T=m+1
b=T===t.length?"dynamic"===i&&r>0&&s.indexOf("$Number$")>0?kn(e,f,v):(o*l-f)/v:(t[T].t-f)/v}else b=y+1
for(var S=d+p.length+b,k=d+p.length;k<S;){p.push({number:k,duration:v/l,time:f,timeline:h})
f+=v
k++}}return p},Cn=/\$([A-z]*)(?:(%0)([0-9]+)d)?\$/g,wn=function(e,t){return e.replace(Cn,function(e){return function(t,i,n,r){if("$$"===t)return"$"
if(void 0===e[i])return t
var a=""+e[i]
if("RepresentationID"===i)return a
r=n?parseInt(r,10):1
return a.length>=r?a:""+new Array(r-a.length+1).join("0")+a}}(t))},In=function(e,t){var i={RepresentationID:e.id,Bandwidth:e.bandwidth||0},n=e.initialization,r=void 0===n?{sourceURL:"",range:""}:n,a=en({baseUrl:e.baseUrl,source:wn(r.sourceURL,i),range:r.range}),s=function(e,t){return e.duration||t?e.duration?rn(e):En(e,t):[{number:e.startNumber||1,duration:e.sourceDuration,time:0,timeline:e.periodStart}]}(e,t)
return s.map((function(t){i.Number=t.number
i.Time=t.time
var n=wn(e.media||"",i),r=e.timescale||1,s=e.presentationTimeOffset||0,o=e.periodStart+(t.time-s)/r
return{uri:n,timeline:t.timeline,duration:t.duration,resolvedUri:tt(e.baseUrl||"",n),map:a,number:t.number,presentationTime:o}}))},Pn=function(e,t){var i=e.duration,n=e.segmentUrls,r=void 0===n?[]:n,a=e.periodStart
if(!i&&!t||i&&t)throw new Error(Ji)
var s,o=r.map((function(t){return function(e,t){var i=e.baseUrl,n=e.initialization,r=void 0===n?{}:n,a=en({baseUrl:i,source:r.sourceURL,range:r.range}),s=en({baseUrl:i,source:t.media,range:t.mediaRange})
s.map=a
return s}(e,t)}))
i&&(s=rn(e))
t&&(s=En(e,t))
return s.map((function(t,i){if(o[i]){var n=o[i],r=e.timescale||1,s=e.presentationTimeOffset||0
n.timeline=t.timeline
n.duration=t.duration
n.number=t.number
n.presentationTime=a+(t.time-s)/r
return n}})).filter((function(e){return e}))},xn=function(e){var t,i,n=e.attributes,r=e.segmentInfo
if(r.template){i=In
t=qi(n,r.template)}else if(r.base){i=an
t=qi(n,r.base)}else if(r.list){i=Pn
t=qi(n,r.list)}var a={attributes:n}
if(!i)return a
var s=i(t,r.segmentTimeline)
if(t.duration){var o=t,u=o.duration,l=o.timescale,c=void 0===l?1:l
t.duration=u/c}else s.length?t.duration=s.reduce((function(e,t){return Math.max(e,Math.ceil(t.duration))}),0):t.duration=0
a.attributes=t
a.segments=s
if(r.base&&t.indexRange){a.sidx=s[0]
a.segments=[]}return a},An=function(e,t){return zi(e.childNodes).filter((function(e){return e.tagName===t}))},On=function(e){return e.textContent.trim()},Ln=function(e){var t=/P(?:(\d*)Y)?(?:(\d*)M)?(?:(\d*)D)?(?:T(?:(\d*)H)?(?:(\d*)M)?(?:([\d.]*)S)?)?/.exec(e)
if(!t)return 0
var i=t.slice(1),n=i[0],r=i[1],a=i[2],s=i[3],o=i[4],u=i[5]
return 31536e3*parseFloat(n||0)+2592e3*parseFloat(r||0)+86400*parseFloat(a||0)+3600*parseFloat(s||0)+60*parseFloat(o||0)+parseFloat(u||0)},Dn={mediaPresentationDuration:function(e){return Ln(e)},availabilityStartTime:function(e){return function(e){/^\d+-\d+-\d+T\d+:\d+:\d+(\.\d+)?$/.test(e)&&(e+="Z")
return Date.parse(e)}(e)/1e3},minimumUpdatePeriod:function(e){return Ln(e)},suggestedPresentationDelay:function(e){return Ln(e)},type:function(e){return e},timeShiftBufferDepth:function(e){return Ln(e)},start:function(e){return Ln(e)},width:function(e){return parseInt(e,10)},height:function(e){return parseInt(e,10)},bandwidth:function(e){return parseInt(e,10)},startNumber:function(e){return parseInt(e,10)},timescale:function(e){return parseInt(e,10)},presentationTimeOffset:function(e){return parseInt(e,10)},duration:function(e){var t=parseInt(e,10)
return isNaN(t)?Ln(e):t},d:function(e){return parseInt(e,10)},t:function(e){return parseInt(e,10)},r:function(e){return parseInt(e,10)},DEFAULT:function(e){return e}},Rn=function(e){return e&&e.attributes?zi(e.attributes).reduce((function(e,t){var i=Dn[t.name]||Dn.DEFAULT
e[t.name]=i(t.value)
return e}),{}):{}},Mn={"urn:uuid:1077efec-c0b2-4d02-ace3-3c1e52e2fb4b":"org.w3.clearkey","urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed":"com.widevine.alpha","urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95":"com.microsoft.playready","urn:uuid:f239e769-efa3-4850-9c16-a903c6932efb":"com.adobe.primetime"},Nn=function(e,t){return t.length?Gi(e.map((function(e){return t.map((function(t){return tt(e,On(t))}))}))):e},Un=function(e){var t=An(e,"SegmentTemplate")[0],i=An(e,"SegmentList")[0],n=i&&An(i,"SegmentURL").map((function(e){return qi({tag:"SegmentURL"},Rn(e))})),r=An(e,"SegmentBase")[0],a=i||t,s=a&&An(a,"SegmentTimeline")[0],o=i||r||t,u=o&&An(o,"Initialization")[0],l=t&&Rn(t)
l&&u?l.initialization=u&&Rn(u):l&&l.initialization&&(l.initialization={sourceURL:l.initialization})
var c={template:l,segmentTimeline:s&&An(s,"S").map((function(e){return Rn(e)})),list:i&&qi(Rn(i),{segmentUrls:n,initialization:Rn(u)}),base:r&&qi(Rn(r),{initialization:Rn(u)})}
Object.keys(c).forEach((function(e){c[e]||delete c[e]}))
return c},Bn=function(e,t,i){return function(n){var r=Rn(n),a=Nn(t,An(n,"BaseURL")),s=An(n,"Role")[0],o={role:Rn(s)},u=qi(e,r,o),l=An(n,"Accessibility")[0],c=function(e){if("urn:scte:dash:cc:cea-608:2015"===e.schemeIdUri)return("string"!=typeof e.value?[]:e.value.split(";")).map((function(e){var t,i
i=e
if(/^CC\d=/.test(e)){var n=e.split("=")
t=n[0]
i=n[1]}else/^CC\d$/.test(e)&&(t=e)
return{channel:t,language:i}}))
if("urn:scte:dash:cc:cea-708:2015"===e.schemeIdUri)return("string"!=typeof e.value?[]:e.value.split(";")).map((function(e){var t={channel:void 0,language:void 0,aspectRatio:1,easyReader:0,"3D":0}
if(/=/.test(e)){var i=e.split("="),n=i[0],r=i[1],a=void 0===r?"":r
t.channel=n
t.language=e
a.split(",").forEach((function(e){var i=e.split(":"),n=i[0],r=i[1]
"lang"===n?t.language=r:"er"===n?t.easyReader=Number(r):"war"===n?t.aspectRatio=Number(r):"3D"===n&&(t["3D"]=Number(r))}))}else t.language=e
t.channel&&(t.channel="SERVICE"+t.channel)
return t}))}(Rn(l))
c&&(u=qi(u,{captionServices:c}))
var d=An(n,"Label")[0]
if(d&&d.childNodes.length){var h=d.childNodes[0].nodeValue.trim()
u=qi(u,{label:h})}var p=An(n,"ContentProtection").reduce((function(e,t){var i=Rn(t),n=Mn[i.schemeIdUri]
if(n){e[n]={attributes:i}
var r=An(t,"cenc:pssh")[0]
if(r){var a=On(r),s=a&&Le(a)
e[n].pssh=s}}return e}),{})
Object.keys(p).length&&(u=qi(u,{contentProtection:p}))
var f=Un(n),m=An(n,"Representation"),g=qi(i,f)
return Gi(m.map(function(e,t,i){return function(n){var r=An(n,"BaseURL"),a=Nn(t,r),s=qi(e,Rn(n)),o=Un(n)
return a.map((function(e){return{segmentInfo:qi(i,o),attributes:qi(s,{baseUrl:e})}}))}}(u,a,g)))}},Fn=function(e,t){return function(i,n){var r=Nn(t,An(i.node,"BaseURL")),a=qi(e,{periodStart:i.attributes.start})
"number"==typeof i.attributes.duration&&(a.periodDuration=i.attributes.duration)
var s=An(i.node,"AdaptationSet"),o=Un(i.node)
return Gi(s.map(Bn(a,r,o)))}},jn=function(e){if(""===e)throw new Error(Yi)
var t,i,n=new Vi
try{i=(t=n.parseFromString(e,"application/xml"))&&"MPD"===t.documentElement.tagName?t.documentElement:null}catch(e){}if(!i||i&&i.getElementsByTagName("parsererror").length>0)throw new Error(Qi)
return i},Vn=function(e,t){void 0===t&&(t={})
var i=function(e,t){void 0===t&&(t={})
var i=t,n=i.manifestUri,r=void 0===n?"":n,a=i.NOW,s=void 0===a?Date.now():a,o=i.clientOffset,u=void 0===o?0:o,l=An(e,"Period")
if(!l.length)throw new Error(Xi)
var c=An(e,"Location"),d=Rn(e),h=Nn([r],An(e,"BaseURL"))
d.type=d.type||"static"
d.sourceDuration=d.mediaPresentationDuration||0
d.NOW=s
d.clientOffset=u
c.length&&(d.locations=c.map(On))
var p=[]
l.forEach((function(e,t){var i=Rn(e),n=p[t-1]
i.start=function(e){var t=e.attributes,i=e.priorPeriodAttributes,n=e.mpdType
return"number"==typeof t.start?t.start:i&&"number"==typeof i.start&&"number"==typeof i.duration?i.start+i.duration:i||"static"!==n?null:0}({attributes:i,priorPeriodAttributes:n?n.attributes:null,mpdType:d.type})
p.push({node:e,attributes:i})}))
return{locations:d.locations,representationInfo:Gi(p.map(Fn(d,h)))}}(jn(e),t),n=i.representationInfo.map(xn)
return Sn({dashPlaylists:n,locations:i.locations,sidxMapping:t.sidxMapping,previousManifest:t.previousManifest})},Hn=function(e){return function(e){var t=An(e,"UTCTiming")[0]
if(!t)return null
var i=Rn(t)
switch(i.schemeIdUri){case"urn:mpeg:dash:utc:http-head:2014":case"urn:mpeg:dash:utc:http-head:2012":i.method="HEAD"
break
case"urn:mpeg:dash:utc:http-xsdate:2014":case"urn:mpeg:dash:utc:http-iso:2014":case"urn:mpeg:dash:utc:http-xsdate:2012":case"urn:mpeg:dash:utc:http-iso:2012":i.method="GET"
break
case"urn:mpeg:dash:utc:direct:2014":case"urn:mpeg:dash:utc:direct:2012":i.method="DIRECT"
i.value=Date.parse(i.value)
break
default:throw new Error(Zi)}return i}(jn(e))},qn=Math.pow(2,32),Wn=function(e){var t,i=new DataView(e.buffer,e.byteOffset,e.byteLength)
return i.getBigUint64?(t=i.getBigUint64(0))<Number.MAX_SAFE_INTEGER?Number(t):t:i.getUint32(0)*qn+i.getUint32(4)},Gn=function(e){var t=new DataView(e.buffer,e.byteOffset,e.byteLength),i={version:e[0],flags:new Uint8Array(e.subarray(1,4)),references:[],referenceId:t.getUint32(4),timescale:t.getUint32(8)},n=12
if(0===i.version){i.earliestPresentationTime=t.getUint32(n)
i.firstOffset=t.getUint32(n+4)
n+=8}else{i.earliestPresentationTime=Wn(e.subarray(n))
i.firstOffset=Wn(e.subarray(n+8))
n+=16}n+=2
var r=t.getUint16(n)
n+=2
for(;r>0;n+=12,r--)i.references.push({referenceType:(128&e[n])>>>7,referencedSize:2147483647&t.getUint32(n),subsegmentDuration:t.getUint32(n+4),startsWithSap:!!(128&e[n+8]),sapType:(112&e[n+8])>>>4,sapDeltaTime:268435455&t.getUint32(n+8)})
return i},zn=function(e){return function(e){return"function"===ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer instanceof ArrayBuffer}(e)},Kn=function(e){if(e instanceof Uint8Array)return e
Array.isArray(e)||zn(e)||e instanceof ArrayBuffer||(e="number"!=typeof e||"number"==typeof e&&e!=e?0:[e])
return new Uint8Array(e&&e.buffer||e,e&&e.byteOffset||0,e&&e.byteLength||0)},Xn=x.BigInt||Number,Yn=[Xn("0x1"),Xn("0x100"),Xn("0x10000"),Xn("0x1000000"),Xn("0x100000000"),Xn("0x10000000000"),Xn("0x1000000000000"),Xn("0x100000000000000"),Xn("0x10000000000000000")],Qn=function(e,t){var i=void 0===t?{}:t,n=i.signed,r=void 0!==n&&n,a=i.le,s=void 0!==a&&a
e=Kn(e)
var o=s?"reduce":"reduceRight",u=(e[o]?e[o]:Array.prototype[o]).call(e,(function(t,i,n){var r=s?n:Math.abs(n+1-e.length)
return t+Xn(i)*Yn[r]}),Xn(0))
if(r){var l=Yn[e.length]/Xn(2)-Xn(1)
if((u=Xn(u))>l){u-=l
u-=l
u-=Xn(2)}}return Number(u)},$n=function(e,t){var i=(void 0===t?{}:t).le,n=void 0!==i&&i;("bigint"!=typeof e&&"number"!=typeof e||"number"==typeof e&&e!=e)&&(e=0)
e=Xn(e)
for(var r,a=(r=e,Math.ceil(function(e){return e.toString(2).length}(r)/8)),s=new Uint8Array(new ArrayBuffer(a)),o=0;o<a;o++){var u=n?o:Math.abs(o+1-s.length)
s[u]=Number(e/Yn[o]&Xn(255))
if(e<0){s[u]=Math.abs(~s[u])
s[u]-=0===o?1:2}}return s},Jn=function(e,t){"string"!=typeof e&&e&&"function"==typeof e.toString&&(e=e.toString())
if("string"!=typeof e)return new Uint8Array
t||(e=unescape(encodeURIComponent(e)))
for(var i=new Uint8Array(e.length),n=0;n<e.length;n++)i[n]=e.charCodeAt(n)
return i},Zn=function(e,t,i){var n=void 0===i?{}:i,r=n.offset,a=void 0===r?0:r,s=n.mask,o=void 0===s?[]:s
e=Kn(e)
var u=(t=Kn(t)).every?t.every:Array.prototype.every
return t.length&&e.length-a>=t.length&&u.call(t,(function(t,i){return t===(o[i]?o[i]&e[a+i]:e[a+i])}))},er=Kn([73,68,51]),tr=function e(t,i){void 0===i&&(i=0)
if((t=Kn(t)).length-i<10||!Zn(t,er,{offset:i}))return i
i+=function(e,t){void 0===t&&(t=0)
var i=(e=Kn(e))[t+5],n=e[t+6]<<21|e[t+7]<<14|e[t+8]<<7|e[t+9]
return(16&i)>>4?n+20:n+10}(t,i)
return e(t,i)},ir=function(e){return"string"==typeof e?Jn(e):e},nr=function e(t,i,n){void 0===n&&(n=!1)
i=function(e){return Array.isArray(e)?e.map((function(e){return ir(e)})):[ir(e)]}(i)
t=Kn(t)
var r=[]
if(!i.length)return r
for(var a=0;a<t.length;){var s=(t[a]<<24|t[a+1]<<16|t[a+2]<<8|t[a+3])>>>0,o=t.subarray(a+4,a+8)
if(0===s)break
var u=a+s
if(u>t.length){if(n)break
u=t.length}var l=t.subarray(a+8,u)
Zn(o,i[0])&&(1===i.length?r.push(l):r.push.apply(r,e(l,i.slice(1),n)))
a=u}return r},rr={EBML:Kn([26,69,223,163]),DocType:Kn([66,130]),Segment:Kn([24,83,128,103]),SegmentInfo:Kn([21,73,169,102]),Tracks:Kn([22,84,174,107]),Track:Kn([174]),TrackNumber:Kn([215]),DefaultDuration:Kn([35,227,131]),TrackEntry:Kn([174]),TrackType:Kn([131]),FlagDefault:Kn([136]),CodecID:Kn([134]),CodecPrivate:Kn([99,162]),VideoTrack:Kn([224]),AudioTrack:Kn([225]),Cluster:Kn([31,67,182,117]),Timestamp:Kn([231]),TimestampScale:Kn([42,215,177]),BlockGroup:Kn([160]),BlockDuration:Kn([155]),Block:Kn([161]),SimpleBlock:Kn([163])},ar=[128,64,32,16,8,4,2,1],sr=function(e,t,i,n){void 0===i&&(i=!0)
void 0===n&&(n=!1)
var r=function(e){for(var t=1,i=0;i<ar.length&&!(e&ar[i]);i++)t++
return t}(e[t]),a=e.subarray(t,t+r)
i&&((a=Array.prototype.slice.call(e,t,t+r))[0]^=ar[r-1])
return{length:r,value:Qn(a,{signed:n}),bytes:a}},or=function e(t){return"string"==typeof t?t.match(/.{1,2}/g).map((function(t){return e(t)})):"number"==typeof t?$n(t):t},ur=function e(t,i,n){if(n>=i.length)return i.length
var r=sr(i,n,!1)
if(Zn(t.bytes,r.bytes))return n
var a=sr(i,n+r.length)
return e(t,i,n+a.length+a.value+r.length)},lr=function e(t,i){i=function(e){return Array.isArray(e)?e.map((function(e){return or(e)})):[or(e)]}(i)
t=Kn(t)
var n=[]
if(!i.length)return n
for(var r=0;r<t.length;){var a=sr(t,r,!1),s=sr(t,r+a.length),o=r+a.length+s.length
if(127===s.value){s.value=ur(a,t,o)
s.value!==t.length&&(s.value-=o)}var u=o+s.value>t.length?t.length:o+s.value,l=t.subarray(o,u)
Zn(i[0],a.bytes)&&(1===i.length?n.push(l):n=n.concat(e(l,i.slice(1))))
r+=a.length+s.length+l.length}return n},cr=Kn([0,0,0,1]),dr=Kn([0,0,1]),hr=Kn([0,0,3]),pr=function(e){for(var t=[],i=1;i<e.length-2;){if(Zn(e.subarray(i,i+3),hr)){t.push(i+2)
i++}i++}if(0===t.length)return e
var n=e.length-t.length,r=new Uint8Array(n),a=0
for(i=0;i<n;a++,i++){if(a===t[0]){a++
t.shift()}r[i]=e[a]}return r},fr=function(e,t,i,n){void 0===n&&(n=1/0)
e=Kn(e)
i=[].concat(i)
for(var r,a=0,s=0;a<e.length&&(s<n||r);){var o=void 0
Zn(e.subarray(a),cr)?o=4:Zn(e.subarray(a),dr)&&(o=3)
if(o){s++
if(r)return pr(e.subarray(r,a))
var u=void 0
"h264"===t?u=31&e[a+o]:"h265"===t&&(u=e[a+o]>>1&63);-1!==i.indexOf(u)&&(r=a+o)
a+=o+("h264"===t?1:2)}else a++}return e.subarray(0,0)},mr={webm:Kn([119,101,98,109]),matroska:Kn([109,97,116,114,111,115,107,97]),flac:Kn([102,76,97,67]),ogg:Kn([79,103,103,83]),ac3:Kn([11,119]),riff:Kn([82,73,70,70]),avi:Kn([65,86,73]),wav:Kn([87,65,86,69]),"3gp":Kn([102,116,121,112,51,103]),mp4:Kn([102,116,121,112]),fmp4:Kn([115,116,121,112]),mov:Kn([102,116,121,112,113,116]),moov:Kn([109,111,111,118]),moof:Kn([109,111,111,102])},gr={aac:function(e){var t=tr(e)
return Zn(e,[255,16],{offset:t,mask:[255,22]})},mp3:function(e){var t=tr(e)
return Zn(e,[255,2],{offset:t,mask:[255,6]})},webm:function(e){var t=lr(e,[rr.EBML,rr.DocType])[0]
return Zn(t,mr.webm)},mkv:function(e){var t=lr(e,[rr.EBML,rr.DocType])[0]
return Zn(t,mr.matroska)},mp4:function(e){return!gr["3gp"](e)&&!gr.mov(e)&&(!(!Zn(e,mr.mp4,{offset:4})&&!Zn(e,mr.fmp4,{offset:4}))||(!(!Zn(e,mr.moof,{offset:4})&&!Zn(e,mr.moov,{offset:4}))||void 0))},mov:function(e){return Zn(e,mr.mov,{offset:4})},"3gp":function(e){return Zn(e,mr["3gp"],{offset:4})},ac3:function(e){var t=tr(e)
return Zn(e,mr.ac3,{offset:t})},ts:function(e){if(e.length<189&&e.length>=1)return 71===e[0]
for(var t=0;t+188<e.length&&t<188;){if(71===e[t]&&71===e[t+188])return!0
t+=1}return!1},flac:function(e){var t=tr(e)
return Zn(e,mr.flac,{offset:t})},ogg:function(e){return Zn(e,mr.ogg)},avi:function(e){return Zn(e,mr.riff)&&Zn(e,mr.avi,{offset:8})},wav:function(e){return Zn(e,mr.riff)&&Zn(e,mr.wav,{offset:8})},h264:function(e){return function(e,t,i){return fr(e,"h264",t,i)}(e,7,3).length},h265:function(e){return function(e,t,i){return fr(e,"h265",t,i)}(e,[32,33],3).length}},vr=Object.keys(gr).filter((function(e){return"ts"!==e&&"h264"!==e&&"h265"!==e})).concat(["ts","h264","h265"])
vr.forEach((function(e){var t=gr[e]
gr[e]=function(e){return t(Kn(e))}}))
var yr,_r,br,Tr,Sr=gr,kr=function(e){e=Kn(e)
for(var t=0;t<vr.length;t++){var i=vr[t]
if(Sr[i](e))return i}return""},Er=9e4
0
0
0
yr=function(e){return e*Er},_r=function(e,t){return e*t},br=function(e){return e/Er},Tr=function(e,t){return e/t}
for(var Cr,wr=Er,Ir="7.19.0",Pr={},xr=function(e,t){Pr[e]=Pr[e]||[]
t&&(Pr[e]=Pr[e].concat(t))
return Pr[e]},Ar=function(e,t){var i=xr(e).indexOf(t)
if(i<=-1)return!1
Pr[e]=Pr[e].slice()
Pr[e].splice(i,1)
return!0},Or={prefixed:!0},Lr=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror","fullscreen"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror","-webkit-full-screen"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror","-moz-full-screen"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError","-ms-fullscreen"]],Dr=Lr[0],Rr=0;Rr<Lr.length;Rr++)if(Lr[Rr][1]in L){Cr=Lr[Rr]
break}if(Cr){for(var Mr=0;Mr<Cr.length;Mr++)Or[Dr[Mr]]=Cr[Mr]
Or.prefixed=Cr[0]!==Dr[0]}var Nr=[]
var Ur=function e(t){var i,n="info",r=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r]
i("log",n,t)}
i=function(e,t){return function(i,n,r){var a=t.levels[n],s=new RegExp("^("+a+")$")
"log"!==i&&r.unshift(i.toUpperCase()+":")
r.unshift(e+":")
if(Nr){Nr.push([].concat(r))
var o=Nr.length-1e3
Nr.splice(0,o>0?o:0)}if(x.console){var u=x.console[i]
u||"debug"!==i||(u=x.console.info||x.console.log)
u&&a&&s.test(i)&&u[Array.isArray(r)?"apply":"call"](x.console,r)}}}(t,r)
r.createLogger=function(i){return e(t+": "+i)}
r.levels={all:"debug|log|warn|error",off:"",debug:"debug|log|warn|error",info:"log|warn|error",warn:"warn|error",error:"error",DEFAULT:n}
r.level=function(e){if("string"==typeof e){if(!r.levels.hasOwnProperty(e))throw new Error('"'+e+'" in not a valid log level')
n=e}return n};(r.history=function(){return Nr?[].concat(Nr):[]}).filter=function(e){return(Nr||[]).filter((function(t){return new RegExp(".*"+e+".*").test(t[0])}))}
r.history.clear=function(){Nr&&(Nr.length=0)}
r.history.disable=function(){if(null!==Nr){Nr.length=0
Nr=null}}
r.history.enable=function(){null===Nr&&(Nr=[])}
r.error=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r]
return i("error",n,t)}
r.warn=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r]
return i("warn",n,t)}
r.debug=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r]
return i("debug",n,t)}
return r}("VIDEOJS"),Br=Ur.createLogger,Fr=Object.prototype.toString,jr=function(e){return qr(e)?Object.keys(e):[]}
function Vr(e,t){jr(e).forEach((function(i){return t(e[i],i)}))}function Hr(e){for(var t=arguments.length,i=new Array(t>1?t-1:0),n=1;n<t;n++)i[n-1]=arguments[n]
if(Object.assign)return R.apply(void 0,[e].concat(i))
i.forEach((function(t){t&&Vr(t,(function(t,i){e[i]=t}))}))
return e}function qr(e){return!!e&&"object"==typeof e}function Wr(e){return qr(e)&&"[object Object]"===Fr.call(e)&&e.constructor===Object}function Gr(e,t){if(!e||!t)return""
if("function"==typeof x.getComputedStyle){var i
try{i=x.getComputedStyle(e)}catch(e){return""}return i?i.getPropertyValue(t)||i[t]:""}return""}var zr,Kr=x.navigator&&x.navigator.userAgent||"",Xr=/AppleWebKit\/([\d.]+)/i.exec(Kr),Yr=Xr?parseFloat(Xr.pop()):null,Qr=/iPod/i.test(Kr),$r=(zr=Kr.match(/OS (\d+)_/i))&&zr[1]?zr[1]:null,Jr=/Android/i.test(Kr),Zr=function(){var e=Kr.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i)
if(!e)return null
var t=e[1]&&parseFloat(e[1]),i=e[2]&&parseFloat(e[2])
return t&&i?parseFloat(e[1]+"."+e[2]):t||null}(),ea=Jr&&Zr<5&&Yr<537,ta=/Firefox/i.test(Kr),ia=/Edg/i.test(Kr),na=!ia&&(/Chrome/i.test(Kr)||/CriOS/i.test(Kr)),ra=function(){var e=Kr.match(/(Chrome|CriOS)\/(\d+)/)
return e&&e[2]?parseFloat(e[2]):null}(),aa=function(){var e=/MSIE\s(\d+)\.\d/.exec(Kr),t=e&&parseFloat(e[1])
!t&&/Trident\/7.0/i.test(Kr)&&/rv:11.0/.test(Kr)&&(t=11)
return t}(),sa=/Safari/i.test(Kr)&&!na&&!Jr&&!ia,oa=/Windows/i.test(Kr),ua=Boolean(ga()&&("ontouchstart"in x||x.navigator.maxTouchPoints||x.DocumentTouch&&x.document instanceof x.DocumentTouch)),la=/iPad/i.test(Kr)||sa&&ua&&!/iPhone/i.test(Kr),ca=/iPhone/i.test(Kr)&&!la,da=ca||la||Qr,ha=(sa||da)&&!na,pa=Object.freeze({__proto__:null,IS_IPOD:Qr,IOS_VERSION:$r,IS_ANDROID:Jr,ANDROID_VERSION:Zr,IS_NATIVE_ANDROID:ea,IS_FIREFOX:ta,IS_EDGE:ia,IS_CHROME:na,CHROME_VERSION:ra,IE_VERSION:aa,IS_SAFARI:sa,IS_WINDOWS:oa,TOUCH_ENABLED:ua,IS_IPAD:la,IS_IPHONE:ca,IS_IOS:da,IS_ANY_SAFARI:ha})
function fa(e){return"string"==typeof e&&Boolean(e.trim())}function ma(e){if(e.indexOf(" ")>=0)throw new Error("class has illegal whitespace characters")}function ga(){return L===x.document}function va(e){return qr(e)&&1===e.nodeType}function ya(){try{return x.parent!==x.self}catch(e){return!0}}function _a(e){return function(t,i){if(!fa(t))return L[e](null)
fa(i)&&(i=L.querySelector(i))
var n=va(i)?i:L
return n[e]&&n[e](t)}}function ba(e,t,i,n){void 0===e&&(e="div")
void 0===t&&(t={})
void 0===i&&(i={})
var r=L.createElement(e)
Object.getOwnPropertyNames(t).forEach((function(e){var i=t[e]
if(-1!==e.indexOf("aria-")||"role"===e||"type"===e){Ur.warn("Setting attributes in the second argument of createEl()\nhas been deprecated. Use the third argument instead.\ncreateEl(type, properties, attributes). Attempting to set "+e+" to "+i+".")
r.setAttribute(e,i)}else"textContent"===e?Ta(r,i):r[e]===i&&"tabIndex"!==e||(r[e]=i)}))
Object.getOwnPropertyNames(i).forEach((function(e){r.setAttribute(e,i[e])}))
n&&ja(r,n)
return r}function Ta(e,t){void 0===e.textContent?e.innerText=t:e.textContent=t
return e}function Sa(e,t){t.firstChild?t.insertBefore(e,t.firstChild):t.appendChild(e)}function ka(e,t){ma(t)
return e.classList?e.classList.contains(t):(i=t,new RegExp("(^|\\s)"+i+"($|\\s)")).test(e.className)
var i}function Ea(e,t){e.classList?e.classList.add(t):ka(e,t)||(e.className=(e.className+" "+t).trim())
return e}function Ca(e,t){if(!e){Ur.warn("removeClass was called with an element that doesn't exist")
return null}if(e.classList)e.classList.remove(t)
else{ma(t)
e.className=e.className.split(/\s+/).filter((function(e){return e!==t})).join(" ")}return e}function wa(e,t,i){var n=ka(e,t)
"function"==typeof i&&(i=i(e,t))
"boolean"!=typeof i&&(i=!n)
if(i!==n){i?Ea(e,t):Ca(e,t)
return e}}function Ia(e,t){Object.getOwnPropertyNames(t).forEach((function(i){var n=t[i]
null==n||!1===n?e.removeAttribute(i):e.setAttribute(i,!0===n?"":n)}))}function Pa(e){var t={},i=",autoplay,controls,playsinline,loop,muted,default,defaultMuted,"
if(e&&e.attributes&&e.attributes.length>0)for(var n=e.attributes,r=n.length-1;r>=0;r--){var a=n[r].name,s=n[r].value
"boolean"!=typeof e[a]&&-1===i.indexOf(","+a+",")||(s=null!==s)
t[a]=s}return t}function xa(e,t){return e.getAttribute(t)}function Aa(e,t,i){e.setAttribute(t,i)}function Oa(e,t){e.removeAttribute(t)}function La(){L.body.focus()
L.onselectstart=function(){return!1}}function Da(){L.onselectstart=function(){return!0}}function Ra(e){if(e&&e.getBoundingClientRect&&e.parentNode){var t=e.getBoundingClientRect(),i={};["bottom","height","left","right","top","width"].forEach((function(e){void 0!==t[e]&&(i[e]=t[e])}))
i.height||(i.height=parseFloat(Gr(e,"height")))
i.width||(i.width=parseFloat(Gr(e,"width")))
return i}}function Ma(e){if(!e||e&&!e.offsetParent)return{left:0,top:0,width:0,height:0}
for(var t=e.offsetWidth,i=e.offsetHeight,n=0,r=0;e.offsetParent&&e!==L[Or.fullscreenElement];){n+=e.offsetLeft
r+=e.offsetTop
e=e.offsetParent}return{left:n,top:r,width:t,height:i}}function Na(e,t){var i={x:0,y:0}
if(da)for(var n=e;n&&"html"!==n.nodeName.toLowerCase();){var r=Gr(n,"transform")
if(/^matrix/.test(r)){var a=r.slice(7,-1).split(/,\s/).map(Number)
i.x+=a[4]
i.y+=a[5]}else if(/^matrix3d/.test(r)){var s=r.slice(9,-1).split(/,\s/).map(Number)
i.x+=s[12]
i.y+=s[13]}n=n.parentNode}var o={},u=Ma(t.target),l=Ma(e),c=l.width,d=l.height,h=t.offsetY-(l.top-u.top),p=t.offsetX-(l.left-u.left)
if(t.changedTouches){p=t.changedTouches[0].pageX-l.left
h=t.changedTouches[0].pageY+l.top
if(da){p-=i.x
h-=i.y}}o.y=1-Math.max(0,Math.min(1,h/d))
o.x=Math.max(0,Math.min(1,p/c))
return o}function Ua(e){return qr(e)&&3===e.nodeType}function Ba(e){for(;e.firstChild;)e.removeChild(e.firstChild)
return e}function Fa(e){"function"==typeof e&&(e=e())
return(Array.isArray(e)?e:[e]).map((function(e){"function"==typeof e&&(e=e())
return va(e)||Ua(e)?e:"string"==typeof e&&/\S/.test(e)?L.createTextNode(e):void 0})).filter((function(e){return e}))}function ja(e,t){Fa(t).forEach((function(t){return e.appendChild(t)}))
return e}function Va(e,t){return ja(Ba(e),t)}function Ha(e){return void 0===e.button&&void 0===e.buttons||(0===e.button&&void 0===e.buttons||("mouseup"===e.type&&0===e.button&&0===e.buttons||0===e.button&&1===e.buttons))}var qa,Wa=_a("querySelector"),Ga=_a("querySelectorAll"),za=Object.freeze({__proto__:null,isReal:ga,isEl:va,isInFrame:ya,createEl:ba,textContent:Ta,prependTo:Sa,hasClass:ka,addClass:Ea,removeClass:Ca,toggleClass:wa,setAttributes:Ia,getAttributes:Pa,getAttribute:xa,setAttribute:Aa,removeAttribute:Oa,blockTextSelection:La,unblockTextSelection:Da,getBoundingClientRect:Ra,findPosition:Ma,getPointerPosition:Na,isTextNode:Ua,emptyEl:Ba,normalizeContent:Fa,appendContent:ja,insertContent:Va,isSingleLeftClick:Ha,$:Wa,$$:Ga}),Ka=!1,Xa=function(){if(!1!==qa.options.autoSetup){var e=Array.prototype.slice.call(L.getElementsByTagName("video")),t=Array.prototype.slice.call(L.getElementsByTagName("audio")),i=Array.prototype.slice.call(L.getElementsByTagName("video-js")),n=e.concat(t,i)
if(n&&n.length>0)for(var r=0,a=n.length;r<a;r++){var s=n[r]
if(!s||!s.getAttribute){Ya(1)
break}if(void 0===s.player){null!==s.getAttribute("data-setup")&&qa(s)}}else Ka||Ya(1)}}
function Ya(e,t){if(ga()){t&&(qa=t)
x.setTimeout(Xa,e)}}function Qa(){Ka=!0
x.removeEventListener("load",Qa)}ga()&&("complete"===L.readyState?Qa():x.addEventListener("load",Qa))
var $a,Ja=function(e){var t=L.createElement("style")
t.className=e
return t},Za=function(e,t){e.styleSheet?e.styleSheet.cssText=t:e.textContent=t},es=3
function ts(){return es++}x.WeakMap||($a=function(){function e(){this.vdata="vdata"+Math.floor(x.performance&&x.performance.now()||Date.now())
this.data={}}var t=e.prototype
t.set=function(e,t){var i=e[this.vdata]||ts()
e[this.vdata]||(e[this.vdata]=i)
this.data[i]=t
return this}
t.get=function(e){var t=e[this.vdata]
if(t)return this.data[t]
Ur("We have no data for this element",e)}
t.has=function(e){return e[this.vdata]in this.data}
t.delete=function(e){var t=e[this.vdata]
if(t){delete this.data[t]
delete e[this.vdata]}}
return e}())
var is,ns=x.WeakMap?new WeakMap:new $a
function rs(e,t){if(ns.has(e)){var i=ns.get(e)
if(0===i.handlers[t].length){delete i.handlers[t]
e.removeEventListener?e.removeEventListener(t,i.dispatcher,!1):e.detachEvent&&e.detachEvent("on"+t,i.dispatcher)}if(Object.getOwnPropertyNames(i.handlers).length<=0){delete i.handlers
delete i.dispatcher
delete i.disabled}0===Object.getOwnPropertyNames(i).length&&ns.delete(e)}}function as(e,t,i,n){i.forEach((function(i){e(t,i,n)}))}function ss(e){if(e.fixed_)return e
function t(){return!0}function i(){return!1}if(!e||!e.isPropagationStopped||!e.isImmediatePropagationStopped){var n=e||x.event
e={}
for(var r in n)"layerX"!==r&&"layerY"!==r&&"keyLocation"!==r&&"webkitMovementX"!==r&&"webkitMovementY"!==r&&("returnValue"===r&&n.preventDefault||(e[r]=n[r]))
e.target||(e.target=e.srcElement||L)
e.relatedTarget||(e.relatedTarget=e.fromElement===e.target?e.toElement:e.fromElement)
e.preventDefault=function(){n.preventDefault&&n.preventDefault()
e.returnValue=!1
n.returnValue=!1
e.defaultPrevented=!0}
e.defaultPrevented=!1
e.stopPropagation=function(){n.stopPropagation&&n.stopPropagation()
e.cancelBubble=!0
n.cancelBubble=!0
e.isPropagationStopped=t}
e.isPropagationStopped=i
e.stopImmediatePropagation=function(){n.stopImmediatePropagation&&n.stopImmediatePropagation()
e.isImmediatePropagationStopped=t
e.stopPropagation()}
e.isImmediatePropagationStopped=i
if(null!==e.clientX&&void 0!==e.clientX){var a=L.documentElement,s=L.body
e.pageX=e.clientX+(a&&a.scrollLeft||s&&s.scrollLeft||0)-(a&&a.clientLeft||s&&s.clientLeft||0)
e.pageY=e.clientY+(a&&a.scrollTop||s&&s.scrollTop||0)-(a&&a.clientTop||s&&s.clientTop||0)}e.which=e.charCode||e.keyCode
null!==e.button&&void 0!==e.button&&(e.button=1&e.button?0:4&e.button?1:2&e.button?2:0)}e.fixed_=!0
return e}var os=["touchstart","touchmove"]
function us(e,t,i){if(Array.isArray(t))return as(us,e,t,i)
ns.has(e)||ns.set(e,{})
var n=ns.get(e)
n.handlers||(n.handlers={})
n.handlers[t]||(n.handlers[t]=[])
i.guid||(i.guid=ts())
n.handlers[t].push(i)
if(!n.dispatcher){n.disabled=!1
n.dispatcher=function(t,i){if(!n.disabled){t=ss(t)
var r=n.handlers[t.type]
if(r)for(var a=r.slice(0),s=0,o=a.length;s<o&&!t.isImmediatePropagationStopped();s++)try{a[s].call(e,t,i)}catch(e){Ur.error(e)}}}}if(1===n.handlers[t].length)if(e.addEventListener){var r=!1;(function(){if("boolean"!=typeof is){is=!1
try{var e=Object.defineProperty({},"passive",{get:function(){is=!0}})
x.addEventListener("test",null,e)
x.removeEventListener("test",null,e)}catch(e){}}return is})()&&os.indexOf(t)>-1&&(r={passive:!0})
e.addEventListener(t,n.dispatcher,r)}else e.attachEvent&&e.attachEvent("on"+t,n.dispatcher)}function ls(e,t,i){if(ns.has(e)){var n=ns.get(e)
if(n.handlers){if(Array.isArray(t))return as(ls,e,t,i)
var r=function(e,t){n.handlers[t]=[]
rs(e,t)}
if(void 0!==t){var a=n.handlers[t]
if(a)if(i){if(i.guid)for(var s=0;s<a.length;s++)a[s].guid===i.guid&&a.splice(s--,1)
rs(e,t)}else r(e,t)}else for(var o in n.handlers)Object.prototype.hasOwnProperty.call(n.handlers||{},o)&&r(e,o)}}}function cs(e,t,i){var n=ns.has(e)?ns.get(e):{},r=e.parentNode||e.ownerDocument
"string"==typeof t?t={type:t,target:e}:t.target||(t.target=e)
t=ss(t)
n.dispatcher&&n.dispatcher.call(e,t,i)
if(r&&!t.isPropagationStopped()&&!0===t.bubbles)cs.call(null,r,t,i)
else if(!r&&!t.defaultPrevented&&t.target&&t.target[t.type]){ns.has(t.target)||ns.set(t.target,{})
var a=ns.get(t.target)
if(t.target[t.type]){a.disabled=!0
"function"==typeof t.target[t.type]&&t.target[t.type]()
a.disabled=!1}}return!t.defaultPrevented}function ds(e,t,i){if(Array.isArray(t))return as(ds,e,t,i)
var n=function n(){ls(e,t,n)
i.apply(this,arguments)}
n.guid=i.guid=i.guid||ts()
us(e,t,n)}function hs(e,t,i){var n=function n(){ls(e,t,n)
i.apply(this,arguments)}
n.guid=i.guid=i.guid||ts()
us(e,t,n)}var ps,fs=Object.freeze({__proto__:null,fixEvent:ss,on:us,off:ls,trigger:cs,one:ds,any:hs}),ms=30,gs=function(e,t,i){t.guid||(t.guid=ts())
var n=t.bind(e)
n.guid=i?i+"_"+t.guid:t.guid
return n},vs=function(e,t){var i=x.performance.now()
return function(){var n=x.performance.now()
if(n-i>=t){e.apply(void 0,arguments)
i=n}}},ys=function(){}
ys.prototype.allowedEvents_={}
ys.prototype.on=function(e,t){var i=this.addEventListener
this.addEventListener=function(){}
us(this,e,t)
this.addEventListener=i}
ys.prototype.addEventListener=ys.prototype.on
ys.prototype.off=function(e,t){ls(this,e,t)}
ys.prototype.removeEventListener=ys.prototype.off
ys.prototype.one=function(e,t){var i=this.addEventListener
this.addEventListener=function(){}
ds(this,e,t)
this.addEventListener=i}
ys.prototype.any=function(e,t){var i=this.addEventListener
this.addEventListener=function(){}
hs(this,e,t)
this.addEventListener=i}
ys.prototype.trigger=function(e){var t=e.type||e
"string"==typeof e&&(e={type:t})
e=ss(e)
this.allowedEvents_[t]&&this["on"+t]&&this["on"+t](e)
cs(this,e)}
ys.prototype.dispatchEvent=ys.prototype.trigger
ys.prototype.queueTrigger=function(e){var t=this
ps||(ps=new Map)
var i=e.type||e,n=ps.get(this)
if(!n){n=new Map
ps.set(this,n)}var r=n.get(i)
n.delete(i)
x.clearTimeout(r)
var a=x.setTimeout((function(){if(0===n.size){n=null
ps.delete(t)}t.trigger(e)}),0)
n.set(i,a)}
var _s=function(e){return"function"==typeof e.name?e.name():"string"==typeof e.name?e.name:e.name_?e.name_:e.constructor&&e.constructor.name?e.constructor.name:typeof e},bs=function(e){return e instanceof ys||!!e.eventBusEl_&&["on","one","off","trigger"].every((function(t){return"function"==typeof e[t]}))},Ts=function(e){return"string"==typeof e&&/\S/.test(e)||Array.isArray(e)&&!!e.length},Ss=function(e,t,i){if(!e||!e.nodeName&&!bs(e))throw new Error("Invalid target for "+_s(t)+"#"+i+"; must be a DOM node or evented object.")},ks=function(e,t,i){if(!Ts(e))throw new Error("Invalid event type for "+_s(t)+"#"+i+"; must be a non-empty string or array.")},Es=function(e,t,i){if("function"!=typeof e)throw new Error("Invalid listener for "+_s(t)+"#"+i+"; must be a function.")},Cs=function(e,t,i){var n,r,a,s=t.length<3||t[0]===e||t[0]===e.eventBusEl_
if(s){n=e.eventBusEl_
t.length>=3&&t.shift()
r=t[0]
a=t[1]}else{n=t[0]
r=t[1]
a=t[2]}Ss(n,e,i)
ks(r,e,i)
Es(a,e,i)
return{isTargetingSelf:s,target:n,type:r,listener:a=gs(e,a)}},ws=function(e,t,i,n){Ss(e,e,t)
e.nodeName?fs[t](e,i,n):e[t](i,n)},Is={on:function(){for(var e=this,t=arguments.length,i=new Array(t),n=0;n<t;n++)i[n]=arguments[n]
var r=Cs(this,i,"on"),a=r.isTargetingSelf,s=r.target,o=r.type,u=r.listener
ws(s,"on",o,u)
if(!a){var l=function(){return e.off(s,o,u)}
l.guid=u.guid
var c=function(){return e.off("dispose",l)}
c.guid=u.guid
ws(this,"on","dispose",l)
ws(s,"on","dispose",c)}},one:function(){for(var e=this,t=arguments.length,i=new Array(t),n=0;n<t;n++)i[n]=arguments[n]
var r=Cs(this,i,"one"),a=r.isTargetingSelf,s=r.target,o=r.type,u=r.listener
if(a)ws(s,"one",o,u)
else{var l=function t(){e.off(s,o,t)
for(var i=arguments.length,n=new Array(i),r=0;r<i;r++)n[r]=arguments[r]
u.apply(null,n)}
l.guid=u.guid
ws(s,"one",o,l)}},any:function(){for(var e=this,t=arguments.length,i=new Array(t),n=0;n<t;n++)i[n]=arguments[n]
var r=Cs(this,i,"any"),a=r.isTargetingSelf,s=r.target,o=r.type,u=r.listener
if(a)ws(s,"any",o,u)
else{var l=function t(){e.off(s,o,t)
for(var i=arguments.length,n=new Array(i),r=0;r<i;r++)n[r]=arguments[r]
u.apply(null,n)}
l.guid=u.guid
ws(s,"any",o,l)}},off:function(e,t,i){if(!e||Ts(e))ls(this.eventBusEl_,e,t)
else{var n=e,r=t
Ss(n,this,"off")
ks(r,this,"off")
Es(i,this,"off")
i=gs(this,i)
this.off("dispose",i)
if(n.nodeName){ls(n,r,i)
ls(n,"dispose",i)}else if(bs(n)){n.off(r,i)
n.off("dispose",i)}}},trigger:function(e,t){Ss(this.eventBusEl_,this,"trigger")
var i=e&&"string"!=typeof e?e.type:e
if(!Ts(i)){var n="Invalid event type for "+_s(this)+"#trigger; must be a non-empty string or object with a type key that has a non-empty value."
if(!e)throw new Error(n);(this.log||Ur).error(n)}return cs(this.eventBusEl_,e,t)}}
function Ps(e,t){void 0===t&&(t={})
var i=t.eventBusKey
if(i){if(!e[i].nodeName)throw new Error('The eventBusKey "'+i+'" does not refer to an element.')
e.eventBusEl_=e[i]}else e.eventBusEl_=ba("span",{className:"vjs-event-bus"})
Hr(e,Is)
e.eventedCallbacks&&e.eventedCallbacks.forEach((function(e){e()}))
e.on("dispose",(function(){e.off();[e,e.el_,e.eventBusEl_].forEach((function(e){e&&ns.has(e)&&ns.delete(e)}))
x.setTimeout((function(){e.eventBusEl_=null}),0)}))
return e}var xs={state:{},setState:function(e){var t,i=this
"function"==typeof e&&(e=e())
Vr(e,(function(e,n){i.state[n]!==e&&((t=t||{})[n]={from:i.state[n],to:e})
i.state[n]=e}))
t&&bs(this)&&this.trigger({changes:t,type:"statechanged"})
return t}}
function As(e,t){Hr(e,xs)
e.state=Hr({},e.state,t)
"function"==typeof e.handleStateChanged&&bs(e)&&e.on("statechanged",e.handleStateChanged)
return e}var Os=function(e){return"string"!=typeof e?e:e.replace(/./,(function(e){return e.toLowerCase()}))},Ls=function(e){return"string"!=typeof e?e:e.replace(/./,(function(e){return e.toUpperCase()}))}
function Ds(){for(var e={},t=arguments.length,i=new Array(t),n=0;n<t;n++)i[n]=arguments[n]
i.forEach((function(t){t&&Vr(t,(function(t,i){if(Wr(t)){Wr(e[i])||(e[i]={})
e[i]=Ds(e[i],t)}else e[i]=t}))}))
return e}var Rs=function(){function e(){this.map_={}}var t=e.prototype
t.has=function(e){return e in this.map_}
t.delete=function(e){var t=this.has(e)
delete this.map_[e]
return t}
t.set=function(e,t){this.map_[e]=t
return this}
t.forEach=function(e,t){for(var i in this.map_)e.call(t,this.map_[i],i,this)}
return e}(),Ms=x.Map?x.Map:Rs,Ns=function(){function e(){this.set_={}}var t=e.prototype
t.has=function(e){return e in this.set_}
t.delete=function(e){var t=this.has(e)
delete this.set_[e]
return t}
t.add=function(e){this.set_[e]=1
return this}
t.forEach=function(e,t){for(var i in this.set_)e.call(t,i,i,this)}
return e}(),Us=x.Set?x.Set:Ns,Bs=function(){function e(e,t,i){var n=this
!e&&this.play?this.player_=e=this:this.player_=e
this.isDisposed_=!1
this.parentComponent_=null
this.options_=Ds({},this.options_)
t=this.options_=Ds(this.options_,t)
this.id_=t.id||t.el&&t.el.id
if(!this.id_){var r=e&&e.id&&e.id()||"no_player"
this.id_=r+"_component_"+ts()}this.name_=t.name||null
t.el?this.el_=t.el:!1!==t.createEl&&(this.el_=this.createEl())
t.className&&this.el_&&t.className.split(" ").forEach((function(e){return n.addClass(e)}))
if(!1!==t.evented){Ps(this,{eventBusKey:this.el_?"el_":null})
this.handleLanguagechange=this.handleLanguagechange.bind(this)
this.on(this.player_,"languagechange",this.handleLanguagechange)}As(this,this.constructor.defaultState)
this.children_=[]
this.childIndex_={}
this.childNameIndex_={}
this.setTimeoutIds_=new Us
this.setIntervalIds_=new Us
this.rafIds_=new Us
this.namedRafs_=new Ms
this.clearingTimersOnDispose_=!1
!1!==t.initChildren&&this.initChildren()
this.ready(i)
!1!==t.reportTouchActivity&&this.enableTouchActivity()}var t=e.prototype
t.dispose=function(){if(!this.isDisposed_){this.readyQueue_&&(this.readyQueue_.length=0)
this.trigger({type:"dispose",bubbles:!1})
this.isDisposed_=!0
if(this.children_)for(var e=this.children_.length-1;e>=0;e--)this.children_[e].dispose&&this.children_[e].dispose()
this.children_=null
this.childIndex_=null
this.childNameIndex_=null
this.parentComponent_=null
if(this.el_){this.el_.parentNode&&this.el_.parentNode.removeChild(this.el_)
this.el_=null}this.player_=null}}
t.isDisposed=function(){return Boolean(this.isDisposed_)}
t.player=function(){return this.player_}
t.options=function(e){if(!e)return this.options_
this.options_=Ds(this.options_,e)
return this.options_}
t.el=function(){return this.el_}
t.createEl=function(e,t,i){return ba(e,t,i)}
t.localize=function(e,t,i){void 0===i&&(i=e)
var n=this.player_.language&&this.player_.language(),r=this.player_.languages&&this.player_.languages(),a=r&&r[n],s=n&&n.split("-")[0],o=r&&r[s],u=i
a&&a[e]?u=a[e]:o&&o[e]&&(u=o[e])
t&&(u=u.replace(/\{(\d+)\}/g,(function(e,i){var n=t[i-1],r=n
void 0===n&&(r=e)
return r})))
return u}
t.handleLanguagechange=function(){}
t.contentEl=function(){return this.contentEl_||this.el_}
t.id=function(){return this.id_}
t.name=function(){return this.name_}
t.children=function(){return this.children_}
t.getChildById=function(e){return this.childIndex_[e]}
t.getChild=function(e){if(e)return this.childNameIndex_[e]}
t.getDescendant=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i]
t=t.reduce((function(e,t){return e.concat(t)}),[])
for(var n=this,r=0;r<t.length;r++)if(!(n=n.getChild(t[r]))||!n.getChild)return
return n}
t.addChild=function(t,i,n){void 0===i&&(i={})
void 0===n&&(n=this.children_.length)
var r,a
if("string"==typeof t){a=Ls(t)
var s=i.componentClass||a
i.name=a
var o=e.getComponent(s)
if(!o)throw new Error("Component "+s+" does not exist")
if("function"!=typeof o)return null
r=new o(this.player_||this,i)}else r=t
r.parentComponent_&&r.parentComponent_.removeChild(r)
this.children_.splice(n,0,r)
r.parentComponent_=this
"function"==typeof r.id&&(this.childIndex_[r.id()]=r)
if(a=a||r.name&&Ls(r.name())){this.childNameIndex_[a]=r
this.childNameIndex_[Os(a)]=r}if("function"==typeof r.el&&r.el()){var u=null
this.children_[n+1]&&(this.children_[n+1].el_?u=this.children_[n+1].el_:va(this.children_[n+1])&&(u=this.children_[n+1]))
this.contentEl().insertBefore(r.el(),u)}return r}
t.removeChild=function(e){"string"==typeof e&&(e=this.getChild(e))
if(e&&this.children_){for(var t=!1,i=this.children_.length-1;i>=0;i--)if(this.children_[i]===e){t=!0
this.children_.splice(i,1)
break}if(t){e.parentComponent_=null
this.childIndex_[e.id()]=null
this.childNameIndex_[Ls(e.name())]=null
this.childNameIndex_[Os(e.name())]=null
var n=e.el()
n&&n.parentNode===this.contentEl()&&this.contentEl().removeChild(e.el())}}}
t.initChildren=function(){var t=this,i=this.options_.children
if(i){var n,r=this.options_,a=e.getComponent("Tech");(n=Array.isArray(i)?i:Object.keys(i)).concat(Object.keys(this.options_).filter((function(e){return!n.some((function(t){return"string"==typeof t?e===t:e===t.name}))}))).map((function(e){var n,r
if("string"==typeof e)r=i[n=e]||t.options_[n]||{}
else{n=e.name
r=e}return{name:n,opts:r}})).filter((function(t){var i=e.getComponent(t.opts.componentClass||Ls(t.name))
return i&&!a.isTech(i)})).forEach((function(e){var i=e.name,n=e.opts
void 0!==r[i]&&(n=r[i])
if(!1!==n){!0===n&&(n={})
n.playerOptions=t.options_.playerOptions
var a=t.addChild(i,n)
a&&(t[i]=a)}}))}}
t.buildCSSClass=function(){return""}
t.ready=function(e,t){void 0===t&&(t=!1)
if(e)if(this.isReady_)t?e.call(this):this.setTimeout(e,1)
else{this.readyQueue_=this.readyQueue_||[]
this.readyQueue_.push(e)}}
t.triggerReady=function(){this.isReady_=!0
this.setTimeout((function(){var e=this.readyQueue_
this.readyQueue_=[]
e&&e.length>0&&e.forEach((function(e){e.call(this)}),this)
this.trigger("ready")}),1)}
t.$=function(e,t){return Wa(e,t||this.contentEl())}
t.$$=function(e,t){return Ga(e,t||this.contentEl())}
t.hasClass=function(e){return ka(this.el_,e)}
t.addClass=function(e){Ea(this.el_,e)}
t.removeClass=function(e){Ca(this.el_,e)}
t.toggleClass=function(e,t){wa(this.el_,e,t)}
t.show=function(){this.removeClass("vjs-hidden")}
t.hide=function(){this.addClass("vjs-hidden")}
t.lockShowing=function(){this.addClass("vjs-lock-showing")}
t.unlockShowing=function(){this.removeClass("vjs-lock-showing")}
t.getAttribute=function(e){return xa(this.el_,e)}
t.setAttribute=function(e,t){Aa(this.el_,e,t)}
t.removeAttribute=function(e){Oa(this.el_,e)}
t.width=function(e,t){return this.dimension("width",e,t)}
t.height=function(e,t){return this.dimension("height",e,t)}
t.dimensions=function(e,t){this.width(e,!0)
this.height(t)}
t.dimension=function(e,t,i){if(void 0===t){if(!this.el_)return 0
var n=this.el_.style[e],r=n.indexOf("px")
return-1!==r?parseInt(n.slice(0,r),10):parseInt(this.el_["offset"+Ls(e)],10)}null!==t&&t==t||(t=0);-1!==(""+t).indexOf("%")||-1!==(""+t).indexOf("px")?this.el_.style[e]=t:this.el_.style[e]="auto"===t?"":t+"px"
i||this.trigger("componentresize")}
t.currentDimension=function(e){var t=0
if("width"!==e&&"height"!==e)throw new Error("currentDimension only accepts width or height value")
t=Gr(this.el_,e)
if(0===(t=parseFloat(t))||isNaN(t)){var i="offset"+Ls(e)
t=this.el_[i]}return t}
t.currentDimensions=function(){return{width:this.currentDimension("width"),height:this.currentDimension("height")}}
t.currentWidth=function(){return this.currentDimension("width")}
t.currentHeight=function(){return this.currentDimension("height")}
t.focus=function(){this.el_.focus()}
t.blur=function(){this.el_.blur()}
t.handleKeyDown=function(e){if(this.player_){M.isEventKey(e,"Tab")||e.stopPropagation()
this.player_.handleKeyDown(e)}}
t.handleKeyPress=function(e){this.handleKeyDown(e)}
t.emitTapEvents=function(){var e,t=0,i=null
this.on("touchstart",(function(n){if(1===n.touches.length){i={pageX:n.touches[0].pageX,pageY:n.touches[0].pageY}
t=x.performance.now()
e=!0}}))
this.on("touchmove",(function(t){if(t.touches.length>1)e=!1
else if(i){var n=t.touches[0].pageX-i.pageX,r=t.touches[0].pageY-i.pageY
Math.sqrt(n*n+r*r)>10&&(e=!1)}}))
var n=function(){e=!1}
this.on("touchleave",n)
this.on("touchcancel",n)
this.on("touchend",(function(n){i=null
if(!0===e){if(x.performance.now()-t<200){n.preventDefault()
this.trigger("tap")}}}))}
t.enableTouchActivity=function(){if(this.player()&&this.player().reportUserActivity){var e,t=gs(this.player(),this.player().reportUserActivity)
this.on("touchstart",(function(){t()
this.clearInterval(e)
e=this.setInterval(t,250)}))
var i=function(i){t()
this.clearInterval(e)}
this.on("touchmove",t)
this.on("touchend",i)
this.on("touchcancel",i)}}
t.setTimeout=function(e,t){var i,n=this
e=gs(this,e)
this.clearTimersOnDispose_()
i=x.setTimeout((function(){n.setTimeoutIds_.has(i)&&n.setTimeoutIds_.delete(i)
e()}),t)
this.setTimeoutIds_.add(i)
return i}
t.clearTimeout=function(e){if(this.setTimeoutIds_.has(e)){this.setTimeoutIds_.delete(e)
x.clearTimeout(e)}return e}
t.setInterval=function(e,t){e=gs(this,e)
this.clearTimersOnDispose_()
var i=x.setInterval(e,t)
this.setIntervalIds_.add(i)
return i}
t.clearInterval=function(e){if(this.setIntervalIds_.has(e)){this.setIntervalIds_.delete(e)
x.clearInterval(e)}return e}
t.requestAnimationFrame=function(e){var t,i=this
if(!this.supportsRaf_)return this.setTimeout(e,1e3/60)
this.clearTimersOnDispose_()
e=gs(this,e)
t=x.requestAnimationFrame((function(){i.rafIds_.has(t)&&i.rafIds_.delete(t)
e()}))
this.rafIds_.add(t)
return t}
t.requestNamedAnimationFrame=function(e,t){var i=this
if(!this.namedRafs_.has(e)){this.clearTimersOnDispose_()
t=gs(this,t)
var n=this.requestAnimationFrame((function(){t()
i.namedRafs_.has(e)&&i.namedRafs_.delete(e)}))
this.namedRafs_.set(e,n)
return e}}
t.cancelNamedAnimationFrame=function(e){if(this.namedRafs_.has(e)){this.cancelAnimationFrame(this.namedRafs_.get(e))
this.namedRafs_.delete(e)}}
t.cancelAnimationFrame=function(e){if(!this.supportsRaf_)return this.clearTimeout(e)
if(this.rafIds_.has(e)){this.rafIds_.delete(e)
x.cancelAnimationFrame(e)}return e}
t.clearTimersOnDispose_=function(){var e=this
if(!this.clearingTimersOnDispose_){this.clearingTimersOnDispose_=!0
this.one("dispose",(function(){[["namedRafs_","cancelNamedAnimationFrame"],["rafIds_","cancelAnimationFrame"],["setTimeoutIds_","clearTimeout"],["setIntervalIds_","clearInterval"]].forEach((function(t){var i=t[0],n=t[1]
e[i].forEach((function(t,i){return e[n](i)}))}))
e.clearingTimersOnDispose_=!1}))}}
e.registerComponent=function(t,i){if("string"!=typeof t||!t)throw new Error('Illegal component name, "'+t+'"; must be a non-empty string.')
var n=e.getComponent("Tech"),r=n&&n.isTech(i),a=e===i||e.prototype.isPrototypeOf(i.prototype)
if(r||!a){var s
s=r?"techs must be registered using Tech.registerTech()":"must be a Component subclass"
throw new Error('Illegal component, "'+t+'"; '+s+".")}t=Ls(t)
e.components_||(e.components_={})
var o=e.getComponent("Player")
if("Player"===t&&o&&o.players){var u=o.players,l=Object.keys(u)
if(u&&l.length>0&&l.map((function(e){return u[e]})).every(Boolean))throw new Error("Can not register Player component after player has been created.")}e.components_[t]=i
e.components_[Os(t)]=i
return i}
e.getComponent=function(t){if(t&&e.components_)return e.components_[t]}
return e}()
Bs.prototype.supportsRaf_="function"==typeof x.requestAnimationFrame&&"function"==typeof x.cancelAnimationFrame
Bs.registerComponent("Component",Bs)
function Fs(e,t,i,n){!function(e,t,i){if("number"!=typeof t||t<0||t>i)throw new Error("Failed to execute '"+e+"' on 'TimeRanges': The index provided ("+t+") is non-numeric or out of bounds (0-"+i+").")}(e,n,i.length-1)
return i[n][t]}function js(e){var t
t=void 0===e||0===e.length?{length:0,start:function(){throw new Error("This TimeRanges object is empty")},end:function(){throw new Error("This TimeRanges object is empty")}}:{length:e.length,start:Fs.bind(null,"start",0,e),end:Fs.bind(null,"end",1,e)}
x.Symbol&&x.Symbol.iterator&&(t[x.Symbol.iterator]=function(){return(e||[]).values()})
return t}function Vs(e,t){return Array.isArray(e)?js(e):void 0===e||void 0===t?js():js([[e,t]])}function Hs(e,t){var i,n,r=0
if(!t)return 0
e&&e.length||(e=Vs(0,0))
for(var a=0;a<e.length;a++){i=e.start(a);(n=e.end(a))>t&&(n=t)
r+=n-i}return r/t}function qs(e){if(e instanceof qs)return e
if("number"==typeof e)this.code=e
else if("string"==typeof e)this.message=e
else if(qr(e)){"number"==typeof e.code&&(this.code=e.code)
Hr(this,e)}this.message||(this.message=qs.defaultMessages[this.code]||"")}qs.prototype.code=0
qs.prototype.message=""
qs.prototype.status=null
qs.errorTypes=["MEDIA_ERR_CUSTOM","MEDIA_ERR_ABORTED","MEDIA_ERR_NETWORK","MEDIA_ERR_DECODE","MEDIA_ERR_SRC_NOT_SUPPORTED","MEDIA_ERR_ENCRYPTED"]
qs.defaultMessages={1:"You aborted the media playback",2:"A network error caused the media download to fail part-way.",3:"The media playback was aborted due to a corruption problem or because the media used features your browser did not support.",4:"The media could not be loaded, either because the server or network failed or because the format is not supported.",5:"The media is encrypted and we do not have the keys to decrypt it."}
for(var Ws=0;Ws<qs.errorTypes.length;Ws++){qs[qs.errorTypes[Ws]]=Ws
qs.prototype[qs.errorTypes[Ws]]=Ws}function Gs(e){return null!=e&&"function"==typeof e.then}function zs(e){Gs(e)&&e.then(null,(function(e){}))}var Ks=function(e){return["kind","label","language","id","inBandMetadataTrackDispatchType","mode","src"].reduce((function(t,i,n){e[i]&&(t[i]=e[i])
return t}),{cues:e.cues&&Array.prototype.map.call(e.cues,(function(e){return{startTime:e.startTime,endTime:e.endTime,text:e.text,id:e.id}}))})},Xs=function(e){var t=e.$$("track"),i=Array.prototype.map.call(t,(function(e){return e.track}))
return Array.prototype.map.call(t,(function(e){var t=Ks(e.track)
e.src&&(t.src=e.src)
return t})).concat(Array.prototype.filter.call(e.textTracks(),(function(e){return-1===i.indexOf(e)})).map(Ks))},Ys=function(e,t){e.forEach((function(e){var i=t.addRemoteTextTrack(e).track
!e.src&&e.cues&&e.cues.forEach((function(e){return i.addCue(e)}))}))
return t.textTracks()},Qs="vjs-modal-dialog",$s=function(e){B(t,e)
function t(t,i){var n;(n=e.call(this,t,i)||this).handleKeyDown_=function(e){return n.handleKeyDown(e)}
n.close_=function(e){return n.close(e)}
n.opened_=n.hasBeenOpened_=n.hasBeenFilled_=!1
n.closeable(!n.options_.uncloseable)
n.content(n.options_.content)
n.contentEl_=ba("div",{className:Qs+"-content"},{role:"document"})
n.descEl_=ba("p",{className:Qs+"-description vjs-control-text",id:n.el().getAttribute("aria-describedby")})
Ta(n.descEl_,n.description())
n.el_.appendChild(n.descEl_)
n.el_.appendChild(n.contentEl_)
return n}var i=t.prototype
i.createEl=function(){return e.prototype.createEl.call(this,"div",{className:this.buildCSSClass(),tabIndex:-1},{"aria-describedby":this.id()+"_description","aria-hidden":"true","aria-label":this.label(),role:"dialog"})}
i.dispose=function(){this.contentEl_=null
this.descEl_=null
this.previouslyActiveEl_=null
e.prototype.dispose.call(this)}
i.buildCSSClass=function(){return Qs+" vjs-hidden "+e.prototype.buildCSSClass.call(this)}
i.label=function(){return this.localize(this.options_.label||"Modal Window")}
i.description=function(){var e=this.options_.description||this.localize("This is a modal window.")
this.closeable()&&(e+=" "+this.localize("This modal can be closed by pressing the Escape key or activating the close button."))
return e}
i.open=function(){if(!this.opened_){var e=this.player()
this.trigger("beforemodalopen")
this.opened_=!0;(this.options_.fillAlways||!this.hasBeenOpened_&&!this.hasBeenFilled_)&&this.fill()
this.wasPlaying_=!e.paused()
this.options_.pauseOnOpen&&this.wasPlaying_&&e.pause()
this.on("keydown",this.handleKeyDown_)
this.hadControls_=e.controls()
e.controls(!1)
this.show()
this.conditionalFocus_()
this.el().setAttribute("aria-hidden","false")
this.trigger("modalopen")
this.hasBeenOpened_=!0}}
i.opened=function(e){"boolean"==typeof e&&this[e?"open":"close"]()
return this.opened_}
i.close=function(){if(this.opened_){var e=this.player()
this.trigger("beforemodalclose")
this.opened_=!1
this.wasPlaying_&&this.options_.pauseOnOpen&&e.play()
this.off("keydown",this.handleKeyDown_)
this.hadControls_&&e.controls(!0)
this.hide()
this.el().setAttribute("aria-hidden","true")
this.trigger("modalclose")
this.conditionalBlur_()
this.options_.temporary&&this.dispose()}}
i.closeable=function(e){if("boolean"==typeof e){var t=this.closeable_=!!e,i=this.getChild("closeButton")
if(t&&!i){var n=this.contentEl_
this.contentEl_=this.el_
i=this.addChild("closeButton",{controlText:"Close Modal Dialog"})
this.contentEl_=n
this.on(i,"close",this.close_)}if(!t&&i){this.off(i,"close",this.close_)
this.removeChild(i)
i.dispose()}}return this.closeable_}
i.fill=function(){this.fillWith(this.content())}
i.fillWith=function(e){var t=this.contentEl(),i=t.parentNode,n=t.nextSibling
this.trigger("beforemodalfill")
this.hasBeenFilled_=!0
i.removeChild(t)
this.empty()
Va(t,e)
this.trigger("modalfill")
n?i.insertBefore(t,n):i.appendChild(t)
var r=this.getChild("closeButton")
r&&i.appendChild(r.el_)}
i.empty=function(){this.trigger("beforemodalempty")
Ba(this.contentEl())
this.trigger("modalempty")}
i.content=function(e){void 0!==e&&(this.content_=e)
return this.content_}
i.conditionalFocus_=function(){var e=L.activeElement,t=this.player_.el_
this.previouslyActiveEl_=null
if(t.contains(e)||t===e){this.previouslyActiveEl_=e
this.focus()}}
i.conditionalBlur_=function(){if(this.previouslyActiveEl_){this.previouslyActiveEl_.focus()
this.previouslyActiveEl_=null}}
i.handleKeyDown=function(e){e.stopPropagation()
if(M.isEventKey(e,"Escape")&&this.closeable()){e.preventDefault()
this.close()}else if(M.isEventKey(e,"Tab")){for(var t,i=this.focusableEls_(),n=this.el_.querySelector(":focus"),r=0;r<i.length;r++)if(n===i[r]){t=r
break}L.activeElement===this.el_&&(t=0)
if(e.shiftKey&&0===t){i[i.length-1].focus()
e.preventDefault()}else if(!e.shiftKey&&t===i.length-1){i[0].focus()
e.preventDefault()}}}
i.focusableEls_=function(){var e=this.el_.querySelectorAll("*")
return Array.prototype.filter.call(e,(function(e){return(e instanceof x.HTMLAnchorElement||e instanceof x.HTMLAreaElement)&&e.hasAttribute("href")||(e instanceof x.HTMLInputElement||e instanceof x.HTMLSelectElement||e instanceof x.HTMLTextAreaElement||e instanceof x.HTMLButtonElement)&&!e.hasAttribute("disabled")||e instanceof x.HTMLIFrameElement||e instanceof x.HTMLObjectElement||e instanceof x.HTMLEmbedElement||e.hasAttribute("tabindex")&&-1!==e.getAttribute("tabindex")||e.hasAttribute("contenteditable")}))}
return t}(Bs)
$s.prototype.options_={pauseOnOpen:!0,temporary:!0}
Bs.registerComponent("ModalDialog",$s)
var Js=function(e){B(t,e)
function t(t){var i
void 0===t&&(t=[]);(i=e.call(this)||this).tracks_=[]
Object.defineProperty(N(i),"length",{get:function(){return this.tracks_.length}})
for(var n=0;n<t.length;n++)i.addTrack(t[n])
return i}var i=t.prototype
i.addTrack=function(e){var t=this,i=this.tracks_.length
""+i in this||Object.defineProperty(this,i,{get:function(){return this.tracks_[i]}})
if(-1===this.tracks_.indexOf(e)){this.tracks_.push(e)
this.trigger({track:e,type:"addtrack",target:this})}e.labelchange_=function(){t.trigger({track:e,type:"labelchange",target:t})}
bs(e)&&e.addEventListener("labelchange",e.labelchange_)}
i.removeTrack=function(e){for(var t,i=0,n=this.length;i<n;i++)if(this[i]===e){(t=this[i]).off&&t.off()
this.tracks_.splice(i,1)
break}t&&this.trigger({track:t,type:"removetrack",target:this})}
i.getTrackById=function(e){for(var t=null,i=0,n=this.length;i<n;i++){var r=this[i]
if(r.id===e){t=r
break}}return t}
return t}(ys)
Js.prototype.allowedEvents_={change:"change",addtrack:"addtrack",removetrack:"removetrack",labelchange:"labelchange"}
for(var Zs in Js.prototype.allowedEvents_)Js.prototype["on"+Zs]=null
var eo=function(e,t){for(var i=0;i<e.length;i++)Object.keys(e[i]).length&&t.id!==e[i].id&&(e[i].enabled=!1)},to=function(e){B(t,e)
function t(t){var i
void 0===t&&(t=[])
for(var n=t.length-1;n>=0;n--)if(t[n].enabled){eo(t,t[n])
break}(i=e.call(this,t)||this).changing_=!1
return i}var i=t.prototype
i.addTrack=function(t){var i=this
t.enabled&&eo(this,t)
e.prototype.addTrack.call(this,t)
if(t.addEventListener){t.enabledChange_=function(){if(!i.changing_){i.changing_=!0
eo(i,t)
i.changing_=!1
i.trigger("change")}}
t.addEventListener("enabledchange",t.enabledChange_)}}
i.removeTrack=function(t){e.prototype.removeTrack.call(this,t)
if(t.removeEventListener&&t.enabledChange_){t.removeEventListener("enabledchange",t.enabledChange_)
t.enabledChange_=null}}
return t}(Js),io=function(e,t){for(var i=0;i<e.length;i++)Object.keys(e[i]).length&&t.id!==e[i].id&&(e[i].selected=!1)},no=function(e){B(t,e)
function t(t){var i
void 0===t&&(t=[])
for(var n=t.length-1;n>=0;n--)if(t[n].selected){io(t,t[n])
break}(i=e.call(this,t)||this).changing_=!1
Object.defineProperty(N(i),"selectedIndex",{get:function(){for(var e=0;e<this.length;e++)if(this[e].selected)return e
return-1},set:function(){}})
return i}var i=t.prototype
i.addTrack=function(t){var i=this
t.selected&&io(this,t)
e.prototype.addTrack.call(this,t)
if(t.addEventListener){t.selectedChange_=function(){if(!i.changing_){i.changing_=!0
io(i,t)
i.changing_=!1
i.trigger("change")}}
t.addEventListener("selectedchange",t.selectedChange_)}}
i.removeTrack=function(t){e.prototype.removeTrack.call(this,t)
if(t.removeEventListener&&t.selectedChange_){t.removeEventListener("selectedchange",t.selectedChange_)
t.selectedChange_=null}}
return t}(Js),ro=function(e){B(t,e)
function t(){return e.apply(this,arguments)||this}var i=t.prototype
i.addTrack=function(t){var i=this
e.prototype.addTrack.call(this,t)
this.queueChange_||(this.queueChange_=function(){return i.queueTrigger("change")})
this.triggerSelectedlanguagechange||(this.triggerSelectedlanguagechange_=function(){return i.trigger("selectedlanguagechange")})
t.addEventListener("modechange",this.queueChange_);-1===["metadata","chapters"].indexOf(t.kind)&&t.addEventListener("modechange",this.triggerSelectedlanguagechange_)}
i.removeTrack=function(t){e.prototype.removeTrack.call(this,t)
if(t.removeEventListener){this.queueChange_&&t.removeEventListener("modechange",this.queueChange_)
this.selectedlanguagechange_&&t.removeEventListener("modechange",this.triggerSelectedlanguagechange_)}}
return t}(Js),ao=function(){function e(e){void 0===e&&(e=[])
this.trackElements_=[]
Object.defineProperty(this,"length",{get:function(){return this.trackElements_.length}})
for(var t=0,i=e.length;t<i;t++)this.addTrackElement_(e[t])}var t=e.prototype
t.addTrackElement_=function(e){var t=this.trackElements_.length
""+t in this||Object.defineProperty(this,t,{get:function(){return this.trackElements_[t]}});-1===this.trackElements_.indexOf(e)&&this.trackElements_.push(e)}
t.getTrackElementByTrack_=function(e){for(var t,i=0,n=this.trackElements_.length;i<n;i++)if(e===this.trackElements_[i].track){t=this.trackElements_[i]
break}return t}
t.removeTrackElement_=function(e){for(var t=0,i=this.trackElements_.length;t<i;t++)if(e===this.trackElements_[t]){this.trackElements_[t].track&&"function"==typeof this.trackElements_[t].track.off&&this.trackElements_[t].track.off()
"function"==typeof this.trackElements_[t].off&&this.trackElements_[t].off()
this.trackElements_.splice(t,1)
break}}
return e}(),so=function(){function e(t){e.prototype.setCues_.call(this,t)
Object.defineProperty(this,"length",{get:function(){return this.length_}})}var t=e.prototype
t.setCues_=function(e){var t=this.length||0,i=0,n=e.length
this.cues_=e
this.length_=e.length
var r=function(e){""+e in this||Object.defineProperty(this,""+e,{get:function(){return this.cues_[e]}})}
if(t<n){i=t
for(;i<n;i++)r.call(this,i)}}
t.getCueById=function(e){for(var t=null,i=0,n=this.length;i<n;i++){var r=this[i]
if(r.id===e){t=r
break}}return t}
return e}(),oo={alternative:"alternative",captions:"captions",main:"main",sign:"sign",subtitles:"subtitles",commentary:"commentary"},uo={alternative:"alternative",descriptions:"descriptions",main:"main","main-desc":"main-desc",translation:"translation",commentary:"commentary"},lo={subtitles:"subtitles",captions:"captions",descriptions:"descriptions",chapters:"chapters",metadata:"metadata"},co={disabled:"disabled",hidden:"hidden",showing:"showing"},ho=function(e){B(t,e)
function t(t){var i
void 0===t&&(t={})
i=e.call(this)||this
var n={id:t.id||"vjs_track_"+ts(),kind:t.kind||"",language:t.language||""},r=t.label||"",a=function(e){Object.defineProperty(N(i),e,{get:function(){return n[e]},set:function(){}})}
for(var s in n)a(s)
Object.defineProperty(N(i),"label",{get:function(){return r},set:function(e){if(e!==r){r=e
this.trigger("labelchange")}}})
return i}return t}(ys),po=function(e){var t=["protocol","hostname","port","pathname","search","hash","host"],i=L.createElement("a")
i.href=e
for(var n={},r=0;r<t.length;r++)n[t[r]]=i[t[r]]
"http:"===n.protocol&&(n.host=n.host.replace(/:80$/,""))
"https:"===n.protocol&&(n.host=n.host.replace(/:443$/,""))
n.protocol||(n.protocol=x.location.protocol)
n.host||(n.host=x.location.host)
return n},fo=function(e){if(!e.match(/^https?:\/\//)){var t=L.createElement("a")
t.href=e
e=t.href}return e},mo=function(e){if("string"==typeof e){var t=/^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/.exec(e)
if(t)return t.pop().toLowerCase()}return""},go=function(e,t){void 0===t&&(t=x.location)
var i=po(e)
return(":"===i.protocol?t.protocol:i.protocol)+i.host!==t.protocol+t.host},vo=Object.freeze({__proto__:null,parseUrl:po,getAbsoluteURL:fo,getFileExtension:mo,isCrossOrigin:go}),yo=function(e,t){var i=new x.WebVTT.Parser(x,x.vttjs,x.WebVTT.StringDecoder()),n=[]
i.oncue=function(e){t.addCue(e)}
i.onparsingerror=function(e){n.push(e)}
i.onflush=function(){t.trigger({type:"loadeddata",target:t})}
i.parse(e)
if(n.length>0){x.console&&x.console.groupCollapsed&&x.console.groupCollapsed("Text Track parsing errors for "+t.src)
n.forEach((function(e){return Ur.error(e)}))
x.console&&x.console.groupEnd&&x.console.groupEnd()}i.flush()},_o=function(e,t){var i={uri:e},n=go(e)
n&&(i.cors=n)
var r="use-credentials"===t.tech_.crossOrigin()
r&&(i.withCredentials=r)
W(i,gs(this,(function(e,i,n){if(e)return Ur.error(e,i)
t.loaded_=!0
"function"!=typeof x.WebVTT?t.tech_&&t.tech_.any(["vttjsloaded","vttjserror"],(function(e){if("vttjserror"!==e.type)return yo(n,t)
Ur.error("vttjs failed to load, stopping trying to process "+t.src)})):yo(n,t)})))},bo=function(e){B(t,e)
function t(t){var i
void 0===t&&(t={})
if(!t.tech)throw new Error("A tech was not provided.")
var n=Ds(t,{kind:lo[t.kind]||"subtitles",language:t.language||t.srclang||""}),r=co[n.mode]||"disabled",a=n.default
"metadata"!==n.kind&&"chapters"!==n.kind||(r="hidden");(i=e.call(this,n)||this).tech_=n.tech
i.cues_=[]
i.activeCues_=[]
i.preload_=!1!==i.tech_.preloadTextTracks
var s=new so(i.cues_),o=new so(i.activeCues_),u=!1
i.timeupdateHandler=gs(N(i),(function(){if(!this.tech_.isDisposed())if(this.tech_.isReady_){this.activeCues=this.activeCues
if(u){this.trigger("cuechange")
u=!1}this.rvf_=this.tech_.requestVideoFrameCallback(this.timeupdateHandler)}else this.rvf_=this.tech_.requestVideoFrameCallback(this.timeupdateHandler)}))
i.tech_.one("dispose",(function(){i.stopTracking()}))
"disabled"!==r&&i.startTracking()
Object.defineProperties(N(i),{default:{get:function(){return a},set:function(){}},mode:{get:function(){return r},set:function(e){if(co[e]&&r!==e){r=e
this.preload_||"disabled"===r||0!==this.cues.length||_o(this.src,this)
this.stopTracking()
"disabled"!==r&&this.startTracking()
this.trigger("modechange")}}},cues:{get:function(){return this.loaded_?s:null},set:function(){}},activeCues:{get:function(){if(!this.loaded_)return null
if(0===this.cues.length)return o
for(var e=this.tech_.currentTime(),t=[],i=0,n=this.cues.length;i<n;i++){var r=this.cues[i];(r.startTime<=e&&r.endTime>=e||r.startTime===r.endTime&&r.startTime<=e&&r.startTime+.5>=e)&&t.push(r)}u=!1
if(t.length!==this.activeCues_.length)u=!0
else for(var a=0;a<t.length;a++)-1===this.activeCues_.indexOf(t[a])&&(u=!0)
this.activeCues_=t
o.setCues_(this.activeCues_)
return o},set:function(){}}})
if(n.src){i.src=n.src
i.preload_||(i.loaded_=!0);(i.preload_||"subtitles"!==n.kind&&"captions"!==n.kind)&&_o(i.src,N(i))}else i.loaded_=!0
return i}var i=t.prototype
i.startTracking=function(){this.rvf_=this.tech_.requestVideoFrameCallback(this.timeupdateHandler)}
i.stopTracking=function(){if(this.rvf_){this.tech_.cancelVideoFrameCallback(this.rvf_)
this.rvf_=void 0}}
i.addCue=function(e){var t=e
if(x.vttjs&&!(e instanceof x.vttjs.VTTCue)){t=new x.vttjs.VTTCue(e.startTime,e.endTime,e.text)
for(var i in e)i in t||(t[i]=e[i])
t.id=e.id
t.originalCue_=e}for(var n=this.tech_.textTracks(),r=0;r<n.length;r++)n[r]!==this&&n[r].removeCue(t)
this.cues_.push(t)
this.cues.setCues_(this.cues_)}
i.removeCue=function(e){for(var t=this.cues_.length;t--;){var i=this.cues_[t]
if(i===e||i.originalCue_&&i.originalCue_===e){this.cues_.splice(t,1)
this.cues.setCues_(this.cues_)
break}}}
return t}(ho)
bo.prototype.allowedEvents_={cuechange:"cuechange"}
var To=function(e){B(t,e)
function t(t){var i
void 0===t&&(t={})
var n=Ds(t,{kind:uo[t.kind]||""})
i=e.call(this,n)||this
var r=!1
Object.defineProperty(N(i),"enabled",{get:function(){return r},set:function(e){if("boolean"==typeof e&&e!==r){r=e
this.trigger("enabledchange")}}})
n.enabled&&(i.enabled=n.enabled)
i.loaded_=!0
return i}return t}(ho),So=function(e){B(t,e)
function t(t){var i
void 0===t&&(t={})
var n=Ds(t,{kind:oo[t.kind]||""})
i=e.call(this,n)||this
var r=!1
Object.defineProperty(N(i),"selected",{get:function(){return r},set:function(e){if("boolean"==typeof e&&e!==r){r=e
this.trigger("selectedchange")}}})
n.selected&&(i.selected=n.selected)
return i}return t}(ho),ko=function(e){B(t,e)
function t(t){var i,n
void 0===t&&(t={})
i=e.call(this)||this
var r=new bo(t)
i.kind=r.kind
i.src=r.src
i.srclang=r.language
i.label=r.label
i.default=r.default
Object.defineProperties(N(i),{readyState:{get:function(){return n}},track:{get:function(){return r}}})
n=0
r.addEventListener("loadeddata",(function(){n=2
i.trigger({type:"load",target:N(i)})}))
return i}return t}(ys)
ko.prototype.allowedEvents_={load:"load"}
ko.NONE=0
ko.LOADING=1
ko.LOADED=2
ko.ERROR=3
var Eo={audio:{ListClass:to,TrackClass:To,capitalName:"Audio"},video:{ListClass:no,TrackClass:So,capitalName:"Video"},text:{ListClass:ro,TrackClass:bo,capitalName:"Text"}}
Object.keys(Eo).forEach((function(e){Eo[e].getterName=e+"Tracks"
Eo[e].privateName=e+"Tracks_"}))
var Co={remoteText:{ListClass:ro,TrackClass:bo,capitalName:"RemoteText",getterName:"remoteTextTracks",privateName:"remoteTextTracks_"},remoteTextEl:{ListClass:ao,TrackClass:ko,capitalName:"RemoteTextTrackEls",getterName:"remoteTextTrackEls",privateName:"remoteTextTrackEls_"}},wo=R({},Eo,Co)
Co.names=Object.keys(Co)
Eo.names=Object.keys(Eo)
wo.names=[].concat(Co.names).concat(Eo.names)
var Io=function(e){B(t,e)
function t(t,i){var n
void 0===t&&(t={})
void 0===i&&(i=function(){})
t.reportTouchActivity=!1;(n=e.call(this,null,t,i)||this).onDurationChange_=function(e){return n.onDurationChange(e)}
n.trackProgress_=function(e){return n.trackProgress(e)}
n.trackCurrentTime_=function(e){return n.trackCurrentTime(e)}
n.stopTrackingCurrentTime_=function(e){return n.stopTrackingCurrentTime(e)}
n.disposeSourceHandler_=function(e){return n.disposeSourceHandler(e)}
n.queuedHanders_=new Set
n.hasStarted_=!1
n.on("playing",(function(){this.hasStarted_=!0}))
n.on("loadstart",(function(){this.hasStarted_=!1}))
wo.names.forEach((function(e){var i=wo[e]
t&&t[i.getterName]&&(n[i.privateName]=t[i.getterName])}))
n.featuresProgressEvents||n.manualProgressOn()
n.featuresTimeupdateEvents||n.manualTimeUpdatesOn();["Text","Audio","Video"].forEach((function(e){!1===t["native"+e+"Tracks"]&&(n["featuresNative"+e+"Tracks"]=!1)}))
!1===t.nativeCaptions||!1===t.nativeTextTracks?n.featuresNativeTextTracks=!1:!0!==t.nativeCaptions&&!0!==t.nativeTextTracks||(n.featuresNativeTextTracks=!0)
n.featuresNativeTextTracks||n.emulateTextTracks()
n.preloadTextTracks=!1!==t.preloadTextTracks
n.autoRemoteTextTracks_=new wo.text.ListClass
n.initTrackListeners()
t.nativeControlsForTouch||n.emitTapEvents()
n.constructor&&(n.name_=n.constructor.name||"Unknown Tech")
return n}var i=t.prototype
i.triggerSourceset=function(e){var t=this
this.isReady_||this.one("ready",(function(){return t.setTimeout((function(){return t.triggerSourceset(e)}),1)}))
this.trigger({src:e,type:"sourceset"})}
i.manualProgressOn=function(){this.on("durationchange",this.onDurationChange_)
this.manualProgress=!0
this.one("ready",this.trackProgress_)}
i.manualProgressOff=function(){this.manualProgress=!1
this.stopTrackingProgress()
this.off("durationchange",this.onDurationChange_)}
i.trackProgress=function(e){this.stopTrackingProgress()
this.progressInterval=this.setInterval(gs(this,(function(){var e=this.bufferedPercent()
this.bufferedPercent_!==e&&this.trigger("progress")
this.bufferedPercent_=e
1===e&&this.stopTrackingProgress()})),500)}
i.onDurationChange=function(e){this.duration_=this.duration()}
i.buffered=function(){return Vs(0,0)}
i.bufferedPercent=function(){return Hs(this.buffered(),this.duration_)}
i.stopTrackingProgress=function(){this.clearInterval(this.progressInterval)}
i.manualTimeUpdatesOn=function(){this.manualTimeUpdates=!0
this.on("play",this.trackCurrentTime_)
this.on("pause",this.stopTrackingCurrentTime_)}
i.manualTimeUpdatesOff=function(){this.manualTimeUpdates=!1
this.stopTrackingCurrentTime()
this.off("play",this.trackCurrentTime_)
this.off("pause",this.stopTrackingCurrentTime_)}
i.trackCurrentTime=function(){this.currentTimeInterval&&this.stopTrackingCurrentTime()
this.currentTimeInterval=this.setInterval((function(){this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})}),250)}
i.stopTrackingCurrentTime=function(){this.clearInterval(this.currentTimeInterval)
this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})}
i.dispose=function(){this.clearTracks(Eo.names)
this.manualProgress&&this.manualProgressOff()
this.manualTimeUpdates&&this.manualTimeUpdatesOff()
e.prototype.dispose.call(this)}
i.clearTracks=function(e){var t=this;(e=[].concat(e)).forEach((function(e){for(var i=t[e+"Tracks"]()||[],n=i.length;n--;){var r=i[n]
"text"===e&&t.removeRemoteTextTrack(r)
i.removeTrack(r)}}))}
i.cleanupAutoTextTracks=function(){for(var e=this.autoRemoteTextTracks_||[],t=e.length;t--;){var i=e[t]
this.removeRemoteTextTrack(i)}}
i.reset=function(){}
i.crossOrigin=function(){}
i.setCrossOrigin=function(){}
i.error=function(e){if(void 0!==e){this.error_=new qs(e)
this.trigger("error")}return this.error_}
i.played=function(){return this.hasStarted_?Vs(0,0):Vs()}
i.play=function(){}
i.setScrubbing=function(){}
i.scrubbing=function(){}
i.setCurrentTime=function(){this.manualTimeUpdates&&this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})}
i.initTrackListeners=function(){var e=this
Eo.names.forEach((function(t){var i=Eo[t],n=function(){e.trigger(t+"trackchange")},r=e[i.getterName]()
r.addEventListener("removetrack",n)
r.addEventListener("addtrack",n)
e.on("dispose",(function(){r.removeEventListener("removetrack",n)
r.removeEventListener("addtrack",n)}))}))}
i.addWebVttScript_=function(){var e=this
if(!x.WebVTT)if(L.body.contains(this.el())){if(!this.options_["vtt.js"]&&Wr(Ee)&&Object.keys(Ee).length>0){this.trigger("vttjsloaded")
return}var t=L.createElement("script")
t.src=this.options_["vtt.js"]||"https://vjs.zencdn.net/vttjs/0.14.1/vtt.min.js"
t.onload=function(){e.trigger("vttjsloaded")}
t.onerror=function(){e.trigger("vttjserror")}
this.on("dispose",(function(){t.onload=null
t.onerror=null}))
x.WebVTT=!0
this.el().parentNode.appendChild(t)}else this.ready(this.addWebVttScript_)}
i.emulateTextTracks=function(){var e=this,t=this.textTracks(),i=this.remoteTextTracks(),n=function(e){return t.addTrack(e.track)},r=function(e){return t.removeTrack(e.track)}
i.on("addtrack",n)
i.on("removetrack",r)
this.addWebVttScript_()
var a=function(){return e.trigger("texttrackchange")},s=function(){a()
for(var e=0;e<t.length;e++){var i=t[e]
i.removeEventListener("cuechange",a)
"showing"===i.mode&&i.addEventListener("cuechange",a)}}
s()
t.addEventListener("change",s)
t.addEventListener("addtrack",s)
t.addEventListener("removetrack",s)
this.on("dispose",(function(){i.off("addtrack",n)
i.off("removetrack",r)
t.removeEventListener("change",s)
t.removeEventListener("addtrack",s)
t.removeEventListener("removetrack",s)
for(var e=0;e<t.length;e++){t[e].removeEventListener("cuechange",a)}}))}
i.addTextTrack=function(e,t,i){if(!e)throw new Error("TextTrack kind is required but was not provided")
return function(e,t,i,n,r){void 0===r&&(r={})
var a=e.textTracks()
r.kind=t
i&&(r.label=i)
n&&(r.language=n)
r.tech=e
var s=new wo.text.TrackClass(r)
a.addTrack(s)
return s}(this,e,t,i)}
i.createRemoteTextTrack=function(e){var t=Ds(e,{tech:this})
return new Co.remoteTextEl.TrackClass(t)}
i.addRemoteTextTrack=function(e,t){var i=this
void 0===e&&(e={})
var n=this.createRemoteTextTrack(e)
if(!0!==t&&!1!==t){Ur.warn('Calling addRemoteTextTrack without explicitly setting the "manualCleanup" parameter to `true` is deprecated and default to `false` in future version of video.js')
t=!0}this.remoteTextTrackEls().addTrackElement_(n)
this.remoteTextTracks().addTrack(n.track)
!0!==t&&this.ready((function(){return i.autoRemoteTextTracks_.addTrack(n.track)}))
return n}
i.removeRemoteTextTrack=function(e){var t=this.remoteTextTrackEls().getTrackElementByTrack_(e)
this.remoteTextTrackEls().removeTrackElement_(t)
this.remoteTextTracks().removeTrack(e)
this.autoRemoteTextTracks_.removeTrack(e)}
i.getVideoPlaybackQuality=function(){return{}}
i.requestPictureInPicture=function(){var e=this.options_.Promise||x.Promise
if(e)return e.reject()}
i.disablePictureInPicture=function(){return!0}
i.setDisablePictureInPicture=function(){}
i.requestVideoFrameCallback=function(e){var t=this,i=ts()
if(this.paused()){this.queuedHanders_.add(i)
this.one("playing",(function(){if(t.queuedHanders_.has(i)){t.queuedHanders_.delete(i)
e()}}))}else this.requestNamedAnimationFrame(i,e)
return i}
i.cancelVideoFrameCallback=function(e){this.queuedHanders_.has(e)?this.queuedHanders_.delete(e):this.cancelNamedAnimationFrame(e)}
i.setPoster=function(){}
i.playsinline=function(){}
i.setPlaysinline=function(){}
i.overrideNativeAudioTracks=function(){}
i.overrideNativeVideoTracks=function(){}
i.canPlayType=function(){return""}
t.canPlayType=function(){return""}
t.canPlaySource=function(e,i){return t.canPlayType(e.type)}
t.isTech=function(e){return e.prototype instanceof t||e instanceof t||e===t}
t.registerTech=function(e,i){t.techs_||(t.techs_={})
if(!t.isTech(i))throw new Error("Tech "+e+" must be a Tech")
if(!t.canPlayType)throw new Error("Techs must have a static canPlayType method on them")
if(!t.canPlaySource)throw new Error("Techs must have a static canPlaySource method on them")
e=Ls(e)
t.techs_[e]=i
t.techs_[Os(e)]=i
"Tech"!==e&&t.defaultTechOrder_.push(e)
return i}
t.getTech=function(e){if(e){if(t.techs_&&t.techs_[e])return t.techs_[e]
e=Ls(e)
if(x&&x.videojs&&x.videojs[e]){Ur.warn("The "+e+" tech was added to the videojs object when it should be registered using videojs.registerTech(name, tech)")
return x.videojs[e]}}}
return t}(Bs)
wo.names.forEach((function(e){var t=wo[e]
Io.prototype[t.getterName]=function(){this[t.privateName]=this[t.privateName]||new t.ListClass
return this[t.privateName]}}))
Io.prototype.featuresVolumeControl=!0
Io.prototype.featuresMuteControl=!0
Io.prototype.featuresFullscreenResize=!1
Io.prototype.featuresPlaybackRate=!1
Io.prototype.featuresProgressEvents=!1
Io.prototype.featuresSourceset=!1
Io.prototype.featuresTimeupdateEvents=!1
Io.prototype.featuresNativeTextTracks=!1
Io.prototype.featuresVideoFrameCallback=!1
Io.withSourceHandlers=function(e){e.registerSourceHandler=function(t,i){var n=e.sourceHandlers
n||(n=e.sourceHandlers=[])
void 0===i&&(i=n.length)
n.splice(i,0,t)}
e.canPlayType=function(t){for(var i,n=e.sourceHandlers||[],r=0;r<n.length;r++)if(i=n[r].canPlayType(t))return i
return""}
e.selectSourceHandler=function(t,i){for(var n=e.sourceHandlers||[],r=0;r<n.length;r++)if(n[r].canHandleSource(t,i))return n[r]
return null}
e.canPlaySource=function(t,i){var n=e.selectSourceHandler(t,i)
return n?n.canHandleSource(t,i):""};["seekable","seeking","duration"].forEach((function(e){var t=this[e]
"function"==typeof t&&(this[e]=function(){return this.sourceHandler_&&this.sourceHandler_[e]?this.sourceHandler_[e].apply(this.sourceHandler_,arguments):t.apply(this,arguments)})}),e.prototype)
e.prototype.setSource=function(t){var i=e.selectSourceHandler(t,this.options_)
i||(e.nativeSourceHandler?i=e.nativeSourceHandler:Ur.error("No source handler found for the current source."))
this.disposeSourceHandler()
this.off("dispose",this.disposeSourceHandler_)
i!==e.nativeSourceHandler&&(this.currentSource_=t)
this.sourceHandler_=i.handleSource(t,this,this.options_)
this.one("dispose",this.disposeSourceHandler_)}
e.prototype.disposeSourceHandler=function(){if(this.currentSource_){this.clearTracks(["audio","video"])
this.currentSource_=null}this.cleanupAutoTextTracks()
if(this.sourceHandler_){this.sourceHandler_.dispose&&this.sourceHandler_.dispose()
this.sourceHandler_=null}}}
Bs.registerComponent("Tech",Io)
Io.registerTech("Tech",Io)
Io.defaultTechOrder_=[]
var Po={},xo={},Ao={}
function Oo(e,t,i){e.setTimeout((function(){return Uo(t,Po[t.type],i,e)}),1)}function Lo(e,t,i,n){void 0===n&&(n=null)
var r="call"+Ls(i),a=e.reduce(No(r),n),s=a===Ao,o=s?null:t[i](a)
!function(e,t,i,n){for(var r=e.length-1;r>=0;r--){var a=e[r]
a[t]&&a[t](n,i)}}(e,i,o,s)
return o}var Do={buffered:1,currentTime:1,duration:1,muted:1,played:1,paused:1,seekable:1,volume:1,ended:1},Ro={setCurrentTime:1,setMuted:1,setVolume:1},Mo={play:1,pause:1}
function No(e){return function(t,i){return t===Ao?Ao:i[e]?i[e](t):t}}function Uo(e,t,i,n,r,a){void 0===e&&(e={})
void 0===t&&(t=[])
void 0===r&&(r=[])
void 0===a&&(a=!1)
var s=t,o=s[0],u=s.slice(1)
if("string"==typeof o)Uo(e,Po[o],i,n,r,a)
else if(o){var l=function(e,t){var i=xo[e.id()],n=null
if(null==i){n=t(e)
xo[e.id()]=[[t,n]]
return n}for(var r=0;r<i.length;r++){var a=i[r],s=a[0],o=a[1]
s===t&&(n=o)}if(null===n){n=t(e)
i.push([t,n])}return n}(n,o)
if(!l.setSource){r.push(l)
return Uo(e,u,i,n,r,a)}l.setSource(Hr({},e),(function(t,s){if(t)return Uo(e,u,i,n,r,a)
r.push(l)
Uo(s,e.type===s.type?u:Po[s.type],i,n,r,a)}))}else u.length?Uo(e,u,i,n,r,a):a?i(e,r):Uo(e,Po["*"],i,n,r,!0)}var Bo={opus:"video/ogg",ogv:"video/ogg",mp4:"video/mp4",mov:"video/mp4",m4v:"video/mp4",mkv:"video/x-matroska",m4a:"audio/mp4",mp3:"audio/mpeg",aac:"audio/aac",caf:"audio/x-caf",flac:"audio/flac",oga:"audio/ogg",wav:"audio/wav",m3u8:"application/x-mpegURL",mpd:"application/dash+xml",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",png:"image/png",svg:"image/svg+xml",webp:"image/webp"},Fo=function(e){void 0===e&&(e="")
var t=mo(e)
return Bo[t.toLowerCase()]||""},jo=function e(t){if(Array.isArray(t)){var i=[]
t.forEach((function(t){t=e(t)
Array.isArray(t)?i=i.concat(t):qr(t)&&i.push(t)}))
t=i}else t="string"==typeof t&&t.trim()?[Vo({src:t})]:qr(t)&&"string"==typeof t.src&&t.src&&t.src.trim()?[Vo(t)]:[]
return t}
function Vo(e){if(!e.type){var t=Fo(e.src)
t&&(e.type=t)}return e}var Ho=function(e){B(t,e)
function t(t,i,n){var r,a=Ds({createEl:!1},i)
r=e.call(this,t,a,n)||this
if(i.playerOptions.sources&&0!==i.playerOptions.sources.length)t.src(i.playerOptions.sources)
else for(var s=0,o=i.playerOptions.techOrder;s<o.length;s++){var u=Ls(o[s]),l=Io.getTech(u)
u||(l=Bs.getComponent(u))
if(l&&l.isSupported()){t.loadTech_(u)
break}}return r}return t}(Bs)
Bs.registerComponent("MediaLoader",Ho)
var qo=function(e){B(t,e)
function t(t,i){var n;(n=e.call(this,t,i)||this).options_.controlText&&n.controlText(n.options_.controlText)
n.handleMouseOver_=function(e){return n.handleMouseOver(e)}
n.handleMouseOut_=function(e){return n.handleMouseOut(e)}
n.handleClick_=function(e){return n.handleClick(e)}
n.handleKeyDown_=function(e){return n.handleKeyDown(e)}
n.emitTapEvents()
n.enable()
return n}var i=t.prototype
i.createEl=function(e,t,i){void 0===e&&(e="div")
void 0===t&&(t={})
void 0===i&&(i={})
t=Hr({className:this.buildCSSClass(),tabIndex:0},t)
"button"===e&&Ur.error("Creating a ClickableComponent with an HTML element of "+e+" is not supported; use a Button instead.")
i=Hr({role:"button"},i)
this.tabIndex_=t.tabIndex
var n=ba(e,t,i)
n.appendChild(ba("span",{className:"vjs-icon-placeholder"},{"aria-hidden":!0}))
this.createControlTextEl(n)
return n}
i.dispose=function(){this.controlTextEl_=null
e.prototype.dispose.call(this)}
i.createControlTextEl=function(e){this.controlTextEl_=ba("span",{className:"vjs-control-text"},{"aria-live":"polite"})
e&&e.appendChild(this.controlTextEl_)
this.controlText(this.controlText_,e)
return this.controlTextEl_}
i.controlText=function(e,t){void 0===t&&(t=this.el())
if(void 0===e)return this.controlText_||"Need Text"
var i=this.localize(e)
this.controlText_=e
Ta(this.controlTextEl_,i)
this.nonIconControl||this.player_.options_.noUITitleAttributes||t.setAttribute("title",i)}
i.buildCSSClass=function(){return"vjs-control vjs-button "+e.prototype.buildCSSClass.call(this)}
i.enable=function(){if(!this.enabled_){this.enabled_=!0
this.removeClass("vjs-disabled")
this.el_.setAttribute("aria-disabled","false")
void 0!==this.tabIndex_&&this.el_.setAttribute("tabIndex",this.tabIndex_)
this.on(["tap","click"],this.handleClick_)
this.on("keydown",this.handleKeyDown_)}}
i.disable=function(){this.enabled_=!1
this.addClass("vjs-disabled")
this.el_.setAttribute("aria-disabled","true")
void 0!==this.tabIndex_&&this.el_.removeAttribute("tabIndex")
this.off("mouseover",this.handleMouseOver_)
this.off("mouseout",this.handleMouseOut_)
this.off(["tap","click"],this.handleClick_)
this.off("keydown",this.handleKeyDown_)}
i.handleLanguagechange=function(){this.controlText(this.controlText_)}
i.handleClick=function(e){this.options_.clickHandler&&this.options_.clickHandler.call(this,arguments)}
i.handleKeyDown=function(t){if(M.isEventKey(t,"Space")||M.isEventKey(t,"Enter")){t.preventDefault()
t.stopPropagation()
this.trigger("click")}else e.prototype.handleKeyDown.call(this,t)}
return t}(Bs)
Bs.registerComponent("ClickableComponent",qo)
var Wo=function(e){B(t,e)
function t(t,i){var n;(n=e.call(this,t,i)||this).update()
n.update_=function(e){return n.update(e)}
t.on("posterchange",n.update_)
return n}var i=t.prototype
i.dispose=function(){this.player().off("posterchange",this.update_)
e.prototype.dispose.call(this)}
i.createEl=function(){return ba("div",{className:"vjs-poster",tabIndex:-1})}
i.update=function(e){var t=this.player().poster()
this.setSrc(t)
t?this.show():this.hide()}
i.setSrc=function(e){var t=""
e&&(t='url("'+e+'")')
this.el_.style.backgroundImage=t}
i.handleClick=function(e){if(this.player_.controls()){var t=this.player_.usingPlugin("eme")&&this.player_.eme.sessions&&this.player_.eme.sessions.length>0
!this.player_.tech(!0)||(aa||ia)&&t||this.player_.tech(!0).focus()
this.player_.paused()?zs(this.player_.play()):this.player_.pause()}}
return t}(qo)
Bs.registerComponent("PosterImage",Wo)
var Go="#222",zo={monospace:"monospace",sansSerif:"sans-serif",serif:"serif",monospaceSansSerif:'"Andale Mono", "Lucida Console", monospace',monospaceSerif:'"Courier New", monospace',proportionalSansSerif:"sans-serif",proportionalSerif:"serif",casual:'"Comic Sans MS", Impact, fantasy',script:'"Monotype Corsiva", cursive',smallcaps:'"Andale Mono", "Lucida Console", monospace, sans-serif'}
function Ko(e,t){var i
if(4===e.length)i=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]
else{if(7!==e.length)throw new Error("Invalid color code provided, "+e+"; must be formatted as e.g. #f0e or #f604e2.")
i=e.slice(1)}return"rgba("+parseInt(i.slice(0,2),16)+","+parseInt(i.slice(2,4),16)+","+parseInt(i.slice(4,6),16)+","+t+")"}function Xo(e,t,i){try{e.style[t]=i}catch(e){return}}var Yo=function(e){B(t,e)
function t(t,i,n){var r
r=e.call(this,t,i,n)||this
var a=function(e){return r.updateDisplay(e)}
t.on("loadstart",(function(e){return r.toggleDisplay(e)}))
t.on("texttrackchange",a)
t.on("loadedmetadata",(function(e){return r.preselectTrack(e)}))
t.ready(gs(N(r),(function(){if(t.tech_&&t.tech_.featuresNativeTextTracks)this.hide()
else{t.on("fullscreenchange",a)
t.on("playerresize",a)
x.addEventListener("orientationchange",a)
t.on("dispose",(function(){return x.removeEventListener("orientationchange",a)}))
for(var e=this.options_.playerOptions.tracks||[],i=0;i<e.length;i++)this.player_.addRemoteTextTrack(e[i],!0)
this.preselectTrack()}})))
return r}var i=t.prototype
i.preselectTrack=function(){for(var e,t,i,n={captions:1,subtitles:1},r=this.player_.textTracks(),a=this.player_.cache_.selectedLanguage,s=0;s<r.length;s++){var o=r[s]
if(a&&a.enabled&&a.language&&a.language===o.language&&o.kind in n)o.kind===a.kind?i=o:i||(i=o)
else if(a&&!a.enabled){i=null
e=null
t=null}else o.default&&("descriptions"!==o.kind||e?o.kind in n&&!t&&(t=o):e=o)}i?i.mode="showing":t?t.mode="showing":e&&(e.mode="showing")}
i.toggleDisplay=function(){this.player_.tech_&&this.player_.tech_.featuresNativeTextTracks?this.hide():this.show()}
i.createEl=function(){return e.prototype.createEl.call(this,"div",{className:"vjs-text-track-display"},{translate:"yes","aria-live":"off","aria-atomic":"true"})}
i.clearDisplay=function(){"function"==typeof x.WebVTT&&x.WebVTT.processCues(x,[],this.el_)}
i.updateDisplay=function(){var e=this.player_.textTracks(),t=this.options_.allowMultipleShowingTracks
this.clearDisplay()
if(t){for(var i=[],n=0;n<e.length;++n){var r=e[n]
"showing"===r.mode&&i.push(r)}this.updateForTrack(i)}else{for(var a=null,s=null,o=e.length;o--;){var u=e[o]
"showing"===u.mode&&("descriptions"===u.kind?a=u:s=u)}if(s){"off"!==this.getAttribute("aria-live")&&this.setAttribute("aria-live","off")
this.updateForTrack(s)}else if(a){"assertive"!==this.getAttribute("aria-live")&&this.setAttribute("aria-live","assertive")
this.updateForTrack(a)}}}
i.updateDisplayState=function(e){for(var t=this.player_.textTrackSettings.getValues(),i=e.activeCues,n=i.length;n--;){var r=i[n]
if(r){var a=r.displayState
t.color&&(a.firstChild.style.color=t.color)
t.textOpacity&&Xo(a.firstChild,"color",Ko(t.color||"#fff",t.textOpacity))
t.backgroundColor&&(a.firstChild.style.backgroundColor=t.backgroundColor)
t.backgroundOpacity&&Xo(a.firstChild,"backgroundColor",Ko(t.backgroundColor||"#000",t.backgroundOpacity))
t.windowColor&&(t.windowOpacity?Xo(a,"backgroundColor",Ko(t.windowColor,t.windowOpacity)):a.style.backgroundColor=t.windowColor)
t.edgeStyle&&("dropshadow"===t.edgeStyle?a.firstChild.style.textShadow="2px 2px 3px #222, 2px 2px 4px #222, 2px 2px 5px "+Go:"raised"===t.edgeStyle?a.firstChild.style.textShadow="1px 1px #222, 2px 2px #222, 3px 3px "+Go:"depressed"===t.edgeStyle?a.firstChild.style.textShadow="1px 1px #ccc, 0 1px #ccc, -1px -1px #222, 0 -1px "+Go:"uniform"===t.edgeStyle&&(a.firstChild.style.textShadow="0 0 4px #222, 0 0 4px #222, 0 0 4px #222, 0 0 4px "+Go))
if(t.fontPercent&&1!==t.fontPercent){var s=x.parseFloat(a.style.fontSize)
a.style.fontSize=s*t.fontPercent+"px"
a.style.height="auto"
a.style.top="auto"}t.fontFamily&&"default"!==t.fontFamily&&("small-caps"===t.fontFamily?a.firstChild.style.fontVariant="small-caps":a.firstChild.style.fontFamily=zo[t.fontFamily])}}}
i.updateForTrack=function(e){Array.isArray(e)||(e=[e])
if("function"==typeof x.WebVTT&&!e.every((function(e){return!e.activeCues}))){for(var t=[],i=0;i<e.length;++i)for(var n=e[i],r=0;r<n.activeCues.length;++r)t.push(n.activeCues[r])
x.WebVTT.processCues(x,t,this.el_)
for(var a=0;a<e.length;++a){for(var s=e[a],o=0;o<s.activeCues.length;++o){var u=s.activeCues[o].displayState
Ea(u,"vjs-text-track-cue")
Ea(u,"vjs-text-track-cue-"+(s.language?s.language:a))
s.language&&Aa(u,"lang",s.language)}this.player_.textTrackSettings&&this.updateDisplayState(s)}}}
return t}(Bs)
Bs.registerComponent("TextTrackDisplay",Yo)
var Qo=function(e){B(t,e)
function t(){return e.apply(this,arguments)||this}t.prototype.createEl=function(){var t=this.player_.isAudio(),i=this.localize(t?"Audio Player":"Video Player"),n=ba("span",{className:"vjs-control-text",textContent:this.localize("{1} is loading.",[i])}),r=e.prototype.createEl.call(this,"div",{className:"vjs-loading-spinner",dir:"ltr"})
r.appendChild(n)
return r}
return t}(Bs)
Bs.registerComponent("LoadingSpinner",Qo)
var $o=function(e){B(t,e)
function t(){return e.apply(this,arguments)||this}var i=t.prototype
i.createEl=function(e,t,i){void 0===t&&(t={})
void 0===i&&(i={})
0
var n=ba("button",t=Hr({className:this.buildCSSClass()},t),i=Hr({type:"button"},i))
n.appendChild(ba("span",{className:"vjs-icon-placeholder"},{"aria-hidden":!0}))
this.createControlTextEl(n)
return n}
i.addChild=function(e,t){void 0===t&&(t={})
var i=this.constructor.name
Ur.warn("Adding an actionable (user controllable) child to a Button ("+i+") is not supported; use a ClickableComponent instead.")
return Bs.prototype.addChild.call(this,e,t)}
i.enable=function(){e.prototype.enable.call(this)
this.el_.removeAttribute("disabled")}
i.disable=function(){e.prototype.disable.call(this)
this.el_.setAttribute("disabled","disabled")}
i.handleKeyDown=function(t){M.isEventKey(t,"Space")||M.isEventKey(t,"Enter")?t.stopPropagation():e.prototype.handleKeyDown.call(this,t)}
return t}(qo)
Bs.registerComponent("Button",$o)
var Jo=function(e){B(t,e)
function t(t,i){var n;(n=e.call(this,t,i)||this).mouseused_=!1
n.on("mousedown",(function(e){return n.handleMouseDown(e)}))
return n}var i=t.prototype
i.buildCSSClass=function(){return"vjs-big-play-button"}
i.handleClick=function(e){var t=this.player_.play()
if(this.mouseused_&&e.clientX&&e.clientY){var i=this.player_.usingPlugin("eme")&&this.player_.eme.sessions&&this.player_.eme.sessions.length>0
zs(t)
!this.player_.tech(!0)||(aa||ia)&&i||this.player_.tech(!0).focus()}else{var n=this.player_.getChild("controlBar"),r=n&&n.getChild("playToggle")
if(r){var a=function(){return r.focus()}
Gs(t)?t.then(a,(function(){})):this.setTimeout(a,1)}else this.player_.tech(!0).focus()}}
i.handleKeyDown=function(t){this.mouseused_=!1
e.prototype.handleKeyDown.call(this,t)}
i.handleMouseDown=function(e){this.mouseused_=!0}
return t}($o)
Jo.prototype.controlText_="Play Video"
Bs.registerComponent("BigPlayButton",Jo)
var Zo=function(e){B(t,e)
function t(t,i){var n;(n=e.call(this,t,i)||this).controlText(i&&i.controlText||n.localize("Close"))
return n}var i=t.prototype
i.buildCSSClass=function(){return"vjs-close-button "+e.prototype.buildCSSClass.call(this)}
i.handleClick=function(e){this.trigger({type:"close",bubbles:!1})}
i.handleKeyDown=function(t){if(M.isEventKey(t,"Esc")){t.preventDefault()
t.stopPropagation()
this.trigger("click")}else e.prototype.handleKeyDown.call(this,t)}
return t}($o)
Bs.registerComponent("CloseButton",Zo)
var eu=function(e){B(t,e)
function t(t,i){var n
void 0===i&&(i={})
n=e.call(this,t,i)||this
i.replay=void 0===i.replay||i.replay
n.on(t,"play",(function(e){return n.handlePlay(e)}))
n.on(t,"pause",(function(e){return n.handlePause(e)}))
i.replay&&n.on(t,"ended",(function(e){return n.handleEnded(e)}))
return n}var i=t.prototype
i.buildCSSClass=function(){return"vjs-play-control "+e.prototype.buildCSSClass.call(this)}
i.handleClick=function(e){this.player_.paused()?zs(this.player_.play()):this.player_.pause()}
i.handleSeeked=function(e){this.removeClass("vjs-ended")
this.player_.paused()?this.handlePause(e):this.handlePlay(e)}
i.handlePlay=function(e){this.removeClass("vjs-ended")
this.removeClass("vjs-paused")
this.addClass("vjs-playing")
this.controlText("Pause")}
i.handlePause=function(e){this.removeClass("vjs-playing")
this.addClass("vjs-paused")
this.controlText("Play")}
i.handleEnded=function(e){var t=this
this.removeClass("vjs-playing")
this.addClass("vjs-ended")
this.controlText("Replay")
this.one(this.player_,"seeked",(function(e){return t.handleSeeked(e)}))}
return t}($o)
eu.prototype.controlText_="Play"
Bs.registerComponent("PlayToggle",eu)
var tu=function(e,t){e=e<0?0:e
var i=Math.floor(e%60),n=Math.floor(e/60%60),r=Math.floor(e/3600),a=Math.floor(t/60%60),s=Math.floor(t/3600);(isNaN(e)||e===1/0)&&(r=n=i="-")
return(r=r>0||s>0?r+":":"")+(n=((r||a>=10)&&n<10?"0"+n:n)+":")+(i=i<10?"0"+i:i)},iu=tu
function nu(e,t){void 0===t&&(t=e)
return iu(e,t)}var ru=function(e){B(t,e)
function t(t,i){var n;(n=e.call(this,t,i)||this).on(t,["timeupdate","ended"],(function(e){return n.updateContent(e)}))
n.updateTextNode_()
return n}var i=t.prototype
i.createEl=function(){var t=this.buildCSSClass(),i=e.prototype.createEl.call(this,"div",{className:t+" vjs-time-control vjs-control"}),n=ba("span",{className:"vjs-control-text",textContent:this.localize(this.labelText_)+" "},{role:"presentation"})
i.appendChild(n)
this.contentEl_=ba("span",{className:t+"-display"},{"aria-live":"off",role:"presentation"})
i.appendChild(this.contentEl_)
return i}
i.dispose=function(){this.contentEl_=null
this.textNode_=null
e.prototype.dispose.call(this)}
i.updateTextNode_=function(e){var t=this
void 0===e&&(e=0)
e=nu(e)
if(this.formattedTime_!==e){this.formattedTime_=e
this.requestNamedAnimationFrame("TimeDisplay#updateTextNode_",(function(){if(t.contentEl_){var e=t.textNode_
if(e&&t.contentEl_.firstChild!==e){e=null
Ur.warn("TimeDisplay#updateTextnode_: Prevented replacement of text node element since it was no longer a child of this node. Appending a new node instead.")}t.textNode_=L.createTextNode(t.formattedTime_)
t.textNode_&&(e?t.contentEl_.replaceChild(t.textNode_,e):t.contentEl_.appendChild(t.textNode_))}}))}}
i.updateContent=function(e){}
return t}(Bs)
ru.prototype.labelText_="Time"
ru.prototype.controlText_="Time"
Bs.registerComponent("TimeDisplay",ru)
var au=function(e){B(t,e)
function t(){return e.apply(this,arguments)||this}var i=t.prototype
i.buildCSSClass=function(){return"vjs-current-time"}
i.updateContent=function(e){var t
t=this.player_.ended()?this.player_.duration():this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime()
this.updateTextNode_(t)}
return t}(ru)
au.prototype.labelText_="Current Time"
au.prototype.controlText_="Current Time"
Bs.registerComponent("CurrentTimeDisplay",au)
var su=function(e){B(t,e)
function t(t,i){var n,r=function(e){return n.updateContent(e)};(n=e.call(this,t,i)||this).on(t,"durationchange",r)
n.on(t,"loadstart",r)
n.on(t,"loadedmetadata",r)
return n}var i=t.prototype
i.buildCSSClass=function(){return"vjs-duration"}
i.updateContent=function(e){var t=this.player_.duration()
this.updateTextNode_(t)}
return t}(ru)
su.prototype.labelText_="Duration"
su.prototype.controlText_="Duration"
Bs.registerComponent("DurationDisplay",su)
var ou=function(e){B(t,e)
function t(){return e.apply(this,arguments)||this}t.prototype.createEl=function(){var t=e.prototype.createEl.call(this,"div",{className:"vjs-time-control vjs-time-divider"},{"aria-hidden":!0}),i=e.prototype.createEl.call(this,"div"),n=e.prototype.createEl.call(this,"span",{textContent:"/"})
i.appendChild(n)
t.appendChild(i)
return t}
return t}(Bs)
Bs.registerComponent("TimeDivider",ou)
var uu=function(e){B(t,e)
function t(t,i){var n;(n=e.call(this,t,i)||this).on(t,"durationchange",(function(e){return n.updateContent(e)}))
return n}var i=t.prototype
i.buildCSSClass=function(){return"vjs-remaining-time"}
i.createEl=function(){var t=e.prototype.createEl.call(this)
!1!==this.options_.displayNegative&&t.insertBefore(ba("span",{},{"aria-hidden":!0},"-"),this.contentEl_)
return t}
i.updateContent=function(e){if("number"==typeof this.player_.duration()){var t
t=this.player_.ended()?0:this.player_.remainingTimeDisplay?this.player_.remainingTimeDisplay():this.player_.remainingTime()
this.updateTextNode_(t)}}
return t}(ru)
uu.prototype.labelText_="Remaining Time"
uu.prototype.controlText_="Remaining Time"
Bs.registerComponent("RemainingTimeDisplay",uu)
var lu=function(e){B(t,e)
function t(t,i){var n;(n=e.call(this,t,i)||this).updateShowing()
n.on(n.player(),"durationchange",(function(e){return n.updateShowing(e)}))
return n}var i=t.prototype
i.createEl=function(){var t=e.prototype.createEl.call(this,"div",{className:"vjs-live-control vjs-control"})
this.contentEl_=ba("div",{className:"vjs-live-display"},{"aria-live":"off"})
this.contentEl_.appendChild(ba("span",{className:"vjs-control-text",textContent:this.localize("Stream Type")+" "}))
this.contentEl_.appendChild(L.createTextNode(this.localize("LIVE")))
t.appendChild(this.contentEl_)
return t}
i.dispose=function(){this.contentEl_=null
e.prototype.dispose.call(this)}
i.updateShowing=function(e){this.player().duration()===1/0?this.show():this.hide()}
return t}(Bs)
Bs.registerComponent("LiveDisplay",lu)
var cu=function(e){B(t,e)
function t(t,i){var n;(n=e.call(this,t,i)||this).updateLiveEdgeStatus()
if(n.player_.liveTracker){n.updateLiveEdgeStatusHandler_=function(e){return n.updateLiveEdgeStatus(e)}
n.on(n.player_.liveTracker,"liveedgechange",n.updateLiveEdgeStatusHandler_)}return n}var i=t.prototype
i.createEl=function(){var t=e.prototype.createEl.call(this,"button",{className:"vjs-seek-to-live-control vjs-control"})
this.textEl_=ba("span",{className:"vjs-seek-to-live-text",textContent:this.localize("LIVE")},{"aria-hidden":"true"})
t.appendChild(this.textEl_)
return t}
i.updateLiveEdgeStatus=function(){if(!this.player_.liveTracker||this.player_.liveTracker.atLiveEdge()){this.setAttribute("aria-disabled",!0)
this.addClass("vjs-at-live-edge")
this.controlText("Seek to live, currently playing live")}else{this.setAttribute("aria-disabled",!1)
this.removeClass("vjs-at-live-edge")
this.controlText("Seek to live, currently behind live")}}
i.handleClick=function(){this.player_.liveTracker.seekToLiveEdge()}
i.dispose=function(){this.player_.liveTracker&&this.off(this.player_.liveTracker,"liveedgechange",this.updateLiveEdgeStatusHandler_)
this.textEl_=null
e.prototype.dispose.call(this)}
return t}($o)
cu.prototype.controlText_="Seek to live, currently playing live"
Bs.registerComponent("SeekToLive",cu)
var du=function(e,t,i){e=Number(e)
return Math.min(i,Math.max(t,isNaN(e)?t:e))},hu=function(e){B(t,e)
function t(t,i){var n;(n=e.call(this,t,i)||this).handleMouseDown_=function(e){return n.handleMouseDown(e)}
n.handleMouseUp_=function(e){return n.handleMouseUp(e)}
n.handleKeyDown_=function(e){return n.handleKeyDown(e)}
n.handleClick_=function(e){return n.handleClick(e)}
n.handleMouseMove_=function(e){return n.handleMouseMove(e)}
n.update_=function(e){return n.update(e)}
n.bar=n.getChild(n.options_.barName)
n.vertical(!!n.options_.vertical)
n.enable()
return n}var i=t.prototype
i.enabled=function(){return this.enabled_}
i.enable=function(){if(!this.enabled()){this.on("mousedown",this.handleMouseDown_)
this.on("touchstart",this.handleMouseDown_)
this.on("keydown",this.handleKeyDown_)
this.on("click",this.handleClick_)
this.on(this.player_,"controlsvisible",this.update)
this.playerEvent&&this.on(this.player_,this.playerEvent,this.update)
this.removeClass("disabled")
this.setAttribute("tabindex",0)
this.enabled_=!0}}
i.disable=function(){if(this.enabled()){var e=this.bar.el_.ownerDocument
this.off("mousedown",this.handleMouseDown_)
this.off("touchstart",this.handleMouseDown_)
this.off("keydown",this.handleKeyDown_)
this.off("click",this.handleClick_)
this.off(this.player_,"controlsvisible",this.update_)
this.off(e,"mousemove",this.handleMouseMove_)
this.off(e,"mouseup",this.handleMouseUp_)
this.off(e,"touchmove",this.handleMouseMove_)
this.off(e,"touchend",this.handleMouseUp_)
this.removeAttribute("tabindex")
this.addClass("disabled")
this.playerEvent&&this.off(this.player_,this.playerEvent,this.update)
this.enabled_=!1}}
i.createEl=function(t,i,n){void 0===i&&(i={})
void 0===n&&(n={})
i.className=i.className+" vjs-slider"
i=Hr({tabIndex:0},i)
n=Hr({role:"slider","aria-valuenow":0,"aria-valuemin":0,"aria-valuemax":100,tabIndex:0},n)
return e.prototype.createEl.call(this,t,i,n)}
i.handleMouseDown=function(e){var t=this.bar.el_.ownerDocument
"mousedown"===e.type&&e.preventDefault()
"touchstart"!==e.type||na||e.preventDefault()
La()
this.addClass("vjs-sliding")
this.trigger("slideractive")
this.on(t,"mousemove",this.handleMouseMove_)
this.on(t,"mouseup",this.handleMouseUp_)
this.on(t,"touchmove",this.handleMouseMove_)
this.on(t,"touchend",this.handleMouseUp_)
this.handleMouseMove(e,!0)}
i.handleMouseMove=function(e){}
i.handleMouseUp=function(){var e=this.bar.el_.ownerDocument
Da()
this.removeClass("vjs-sliding")
this.trigger("sliderinactive")
this.off(e,"mousemove",this.handleMouseMove_)
this.off(e,"mouseup",this.handleMouseUp_)
this.off(e,"touchmove",this.handleMouseMove_)
this.off(e,"touchend",this.handleMouseUp_)
this.update()}
i.update=function(){var e=this
if(this.el_&&this.bar){var t=this.getProgress()
if(t===this.progress_)return t
this.progress_=t
this.requestNamedAnimationFrame("Slider#update",(function(){var i=e.vertical()?"height":"width"
e.bar.el().style[i]=(100*t).toFixed(2)+"%"}))
return t}}
i.getProgress=function(){return Number(du(this.getPercent(),0,1).toFixed(4))}
i.calculateDistance=function(e){var t=Na(this.el_,e)
return this.vertical()?t.y:t.x}
i.handleKeyDown=function(t){if(M.isEventKey(t,"Left")||M.isEventKey(t,"Down")){t.preventDefault()
t.stopPropagation()
this.stepBack()}else if(M.isEventKey(t,"Right")||M.isEventKey(t,"Up")){t.preventDefault()
t.stopPropagation()
this.stepForward()}else e.prototype.handleKeyDown.call(this,t)}
i.handleClick=function(e){e.stopPropagation()
e.preventDefault()}
i.vertical=function(e){if(void 0===e)return this.vertical_||!1
this.vertical_=!!e
this.vertical_?this.addClass("vjs-slider-vertical"):this.addClass("vjs-slider-horizontal")}
return t}(Bs)
Bs.registerComponent("Slider",hu)
var pu=function(e,t){return du(e/t*100,0,100).toFixed(2)+"%"},fu=function(e){B(t,e)
function t(t,i){var n;(n=e.call(this,t,i)||this).partEls_=[]
n.on(t,"progress",(function(e){return n.update(e)}))
return n}var i=t.prototype
i.createEl=function(){var t=e.prototype.createEl.call(this,"div",{className:"vjs-load-progress"}),i=ba("span",{className:"vjs-control-text"}),n=ba("span",{textContent:this.localize("Loaded")}),r=L.createTextNode(": ")
this.percentageEl_=ba("span",{className:"vjs-control-text-loaded-percentage",textContent:"0%"})
t.appendChild(i)
i.appendChild(n)
i.appendChild(r)
i.appendChild(this.percentageEl_)
return t}
i.dispose=function(){this.partEls_=null
this.percentageEl_=null
e.prototype.dispose.call(this)}
i.update=function(e){var t=this
this.requestNamedAnimationFrame("LoadProgressBar#update",(function(){var e=t.player_.liveTracker,i=t.player_.buffered(),n=e&&e.isLive()?e.seekableEnd():t.player_.duration(),r=t.player_.bufferedEnd(),a=t.partEls_,s=pu(r,n)
if(t.percent_!==s){t.el_.style.width=s
Ta(t.percentageEl_,s)
t.percent_=s}for(var o=0;o<i.length;o++){var u=i.start(o),l=i.end(o),c=a[o]
if(!c){c=t.el_.appendChild(ba())
a[o]=c}if(c.dataset.start!==u||c.dataset.end!==l){c.dataset.start=u
c.dataset.end=l
c.style.left=pu(u,r)
c.style.width=pu(l-u,r)}}for(var d=a.length;d>i.length;d--)t.el_.removeChild(a[d-1])
a.length=i.length}))}
return t}(Bs)
Bs.registerComponent("LoadProgressBar",fu)
var mu=function(e){B(t,e)
function t(t,i){var n;(n=e.call(this,t,i)||this).update=vs(gs(N(n),n.update),ms)
return n}var i=t.prototype
i.createEl=function(){return e.prototype.createEl.call(this,"div",{className:"vjs-time-tooltip"},{"aria-hidden":"true"})}
i.update=function(e,t,i){var n=Ma(this.el_),r=Ra(this.player_.el()),a=e.width*t
if(r&&n){var s=e.left-r.left+a,o=e.width-a+(r.right-e.right),u=n.width/2
s<u?u+=u-s:o<u&&(u=o)
u<0?u=0:u>n.width&&(u=n.width)
u=Math.round(u)
this.el_.style.right="-"+u+"px"
this.write(i)}}
i.write=function(e){Ta(this.el_,e)}
i.updateTime=function(e,t,i,n){var r=this
this.requestNamedAnimationFrame("TimeTooltip#updateTime",(function(){var a,s=r.player_.duration()
if(r.player_.liveTracker&&r.player_.liveTracker.isLive()){var o=r.player_.liveTracker.liveWindow(),u=o-t*o
a=(u<1?"":"-")+nu(u,o)}else a=nu(i,s)
r.update(e,t,a)
n&&n()}))}
return t}(Bs)
Bs.registerComponent("TimeTooltip",mu)
var gu=function(e){B(t,e)
function t(t,i){var n;(n=e.call(this,t,i)||this).update=vs(gs(N(n),n.update),ms)
return n}var i=t.prototype
i.createEl=function(){return e.prototype.createEl.call(this,"div",{className:"vjs-play-progress vjs-slider-bar"},{"aria-hidden":"true"})}
i.update=function(e,t){var i=this.getChild("timeTooltip")
if(i){var n=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime()
i.updateTime(e,t,n)}}
return t}(Bs)
gu.prototype.options_={children:[]}
da||Jr||gu.prototype.options_.children.push("timeTooltip")
Bs.registerComponent("PlayProgressBar",gu)
var vu=function(e){B(t,e)
function t(t,i){var n;(n=e.call(this,t,i)||this).update=vs(gs(N(n),n.update),ms)
return n}var i=t.prototype
i.createEl=function(){return e.prototype.createEl.call(this,"div",{className:"vjs-mouse-display"})}
i.update=function(e,t){var i=this,n=t*this.player_.duration()
this.getChild("timeTooltip").updateTime(e,t,n,(function(){i.el_.style.left=e.width*t+"px"}))}
return t}(Bs)
vu.prototype.options_={children:["timeTooltip"]}
Bs.registerComponent("MouseTimeDisplay",vu)
var yu=function(e){B(t,e)
function t(t,i){var n;(n=e.call(this,t,i)||this).setEventHandlers_()
return n}var i=t.prototype
i.setEventHandlers_=function(){var e=this
this.update_=gs(this,this.update)
this.update=vs(this.update_,ms)
this.on(this.player_,["ended","durationchange","timeupdate"],this.update)
this.player_.liveTracker&&this.on(this.player_.liveTracker,"liveedgechange",this.update)
this.updateInterval=null
this.enableIntervalHandler_=function(t){return e.enableInterval_(t)}
this.disableIntervalHandler_=function(t){return e.disableInterval_(t)}
this.on(this.player_,["playing"],this.enableIntervalHandler_)
this.on(this.player_,["ended","pause","waiting"],this.disableIntervalHandler_)
"hidden"in L&&"visibilityState"in L&&this.on(L,"visibilitychange",this.toggleVisibility_)}
i.toggleVisibility_=function(e){if("hidden"===L.visibilityState){this.cancelNamedAnimationFrame("SeekBar#update")
this.cancelNamedAnimationFrame("Slider#update")
this.disableInterval_(e)}else{this.player_.ended()||this.player_.paused()||this.enableInterval_()
this.update()}}
i.enableInterval_=function(){this.updateInterval||(this.updateInterval=this.setInterval(this.update,ms))}
i.disableInterval_=function(e){if(!(this.player_.liveTracker&&this.player_.liveTracker.isLive()&&e&&"ended"!==e.type)&&this.updateInterval){this.clearInterval(this.updateInterval)
this.updateInterval=null}}
i.createEl=function(){return e.prototype.createEl.call(this,"div",{className:"vjs-progress-holder"},{"aria-label":this.localize("Progress Bar")})}
i.update=function(t){var i=this
if("hidden"!==L.visibilityState){var n=e.prototype.update.call(this)
this.requestNamedAnimationFrame("SeekBar#update",(function(){var e=i.player_.ended()?i.player_.duration():i.getCurrentTime_(),t=i.player_.liveTracker,r=i.player_.duration()
t&&t.isLive()&&(r=i.player_.liveTracker.liveCurrentTime())
if(i.percent_!==n){i.el_.setAttribute("aria-valuenow",(100*n).toFixed(2))
i.percent_=n}if(i.currentTime_!==e||i.duration_!==r){i.el_.setAttribute("aria-valuetext",i.localize("progress bar timing: currentTime={1} duration={2}",[nu(e,r),nu(r,r)],"{1} of {2}"))
i.currentTime_=e
i.duration_=r}i.bar&&i.bar.update(Ra(i.el()),i.getProgress())}))
return n}}
i.userSeek_=function(e){this.player_.liveTracker&&this.player_.liveTracker.isLive()&&this.player_.liveTracker.nextSeekedFromUser()
this.player_.currentTime(e)}
i.getCurrentTime_=function(){return this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime()}
i.getPercent=function(){var e,t=this.getCurrentTime_(),i=this.player_.liveTracker
if(i&&i.isLive()){e=(t-i.seekableStart())/i.liveWindow()
i.atLiveEdge()&&(e=1)}else e=t/this.player_.duration()
return e}
i.handleMouseDown=function(t){if(Ha(t)){t.stopPropagation()
this.videoWasPlaying=!this.player_.paused()
this.player_.pause()
e.prototype.handleMouseDown.call(this,t)}}
i.handleMouseMove=function(e,t){void 0===t&&(t=!1)
if(Ha(e)){t||this.player_.scrubbing()||this.player_.scrubbing(!0)
var i,n=this.calculateDistance(e),r=this.player_.liveTracker
if(r&&r.isLive()){if(n>=.99){r.seekToLiveEdge()
return}var a=r.seekableStart(),s=r.liveCurrentTime();(i=a+n*r.liveWindow())>=s&&(i=s)
i<=a&&(i=a+.1)
if(i===1/0)return}else(i=n*this.player_.duration())===this.player_.duration()&&(i-=.1)
this.userSeek_(i)}}
i.enable=function(){e.prototype.enable.call(this)
var t=this.getChild("mouseTimeDisplay")
t&&t.show()}
i.disable=function(){e.prototype.disable.call(this)
var t=this.getChild("mouseTimeDisplay")
t&&t.hide()}
i.handleMouseUp=function(t){e.prototype.handleMouseUp.call(this,t)
t&&t.stopPropagation()
this.player_.scrubbing(!1)
this.player_.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})
this.videoWasPlaying?zs(this.player_.play()):this.update_()}
i.stepForward=function(){this.userSeek_(this.player_.currentTime()+5)}
i.stepBack=function(){this.userSeek_(this.player_.currentTime()-5)}
i.handleAction=function(e){this.player_.paused()?this.player_.play():this.player_.pause()}
i.handleKeyDown=function(t){var i=this.player_.liveTracker
if(M.isEventKey(t,"Space")||M.isEventKey(t,"Enter")){t.preventDefault()
t.stopPropagation()
this.handleAction(t)}else if(M.isEventKey(t,"Home")){t.preventDefault()
t.stopPropagation()
this.userSeek_(0)}else if(M.isEventKey(t,"End")){t.preventDefault()
t.stopPropagation()
i&&i.isLive()?this.userSeek_(i.liveCurrentTime()):this.userSeek_(this.player_.duration())}else if(/^[0-9]$/.test(M(t))){t.preventDefault()
t.stopPropagation()
var n=10*(M.codes[M(t)]-M.codes[0])/100
i&&i.isLive()?this.userSeek_(i.seekableStart()+i.liveWindow()*n):this.userSeek_(this.player_.duration()*n)}else if(M.isEventKey(t,"PgDn")){t.preventDefault()
t.stopPropagation()
this.userSeek_(this.player_.currentTime()-60)}else if(M.isEventKey(t,"PgUp")){t.preventDefault()
t.stopPropagation()
this.userSeek_(this.player_.currentTime()+60)}else e.prototype.handleKeyDown.call(this,t)}
i.dispose=function(){this.disableInterval_()
this.off(this.player_,["ended","durationchange","timeupdate"],this.update)
this.player_.liveTracker&&this.off(this.player_.liveTracker,"liveedgechange",this.update)
this.off(this.player_,["playing"],this.enableIntervalHandler_)
this.off(this.player_,["ended","pause","waiting"],this.disableIntervalHandler_)
"hidden"in L&&"visibilityState"in L&&this.off(L,"visibilitychange",this.toggleVisibility_)
e.prototype.dispose.call(this)}
return t}(hu)
yu.prototype.options_={children:["loadProgressBar","playProgressBar"],barName:"playProgressBar"}
da||Jr||yu.prototype.options_.children.splice(1,0,"mouseTimeDisplay")
Bs.registerComponent("SeekBar",yu)
var _u=function(e){B(t,e)
function t(t,i){var n;(n=e.call(this,t,i)||this).handleMouseMove=vs(gs(N(n),n.handleMouseMove),ms)
n.throttledHandleMouseSeek=vs(gs(N(n),n.handleMouseSeek),ms)
n.handleMouseUpHandler_=function(e){return n.handleMouseUp(e)}
n.handleMouseDownHandler_=function(e){return n.handleMouseDown(e)}
n.enable()
return n}var i=t.prototype
i.createEl=function(){return e.prototype.createEl.call(this,"div",{className:"vjs-progress-control vjs-control"})}
i.handleMouseMove=function(e){var t=this.getChild("seekBar")
if(t){var i=t.getChild("playProgressBar"),n=t.getChild("mouseTimeDisplay")
if(i||n){var r=t.el(),a=Ma(r),s=Na(r,e).x
s=du(s,0,1)
n&&n.update(a,s)
i&&i.update(a,t.getProgress())}}}
i.handleMouseSeek=function(e){var t=this.getChild("seekBar")
t&&t.handleMouseMove(e)}
i.enabled=function(){return this.enabled_}
i.disable=function(){this.children().forEach((function(e){return e.disable&&e.disable()}))
if(this.enabled()){this.off(["mousedown","touchstart"],this.handleMouseDownHandler_)
this.off(this.el_,"mousemove",this.handleMouseMove)
this.removeListenersAddedOnMousedownAndTouchstart()
this.addClass("disabled")
this.enabled_=!1
if(this.player_.scrubbing()){var e=this.getChild("seekBar")
this.player_.scrubbing(!1)
e.videoWasPlaying&&zs(this.player_.play())}}}
i.enable=function(){this.children().forEach((function(e){return e.enable&&e.enable()}))
if(!this.enabled()){this.on(["mousedown","touchstart"],this.handleMouseDownHandler_)
this.on(this.el_,"mousemove",this.handleMouseMove)
this.removeClass("disabled")
this.enabled_=!0}}
i.removeListenersAddedOnMousedownAndTouchstart=function(){var e=this.el_.ownerDocument
this.off(e,"mousemove",this.throttledHandleMouseSeek)
this.off(e,"touchmove",this.throttledHandleMouseSeek)
this.off(e,"mouseup",this.handleMouseUpHandler_)
this.off(e,"touchend",this.handleMouseUpHandler_)}
i.handleMouseDown=function(e){var t=this.el_.ownerDocument,i=this.getChild("seekBar")
i&&i.handleMouseDown(e)
this.on(t,"mousemove",this.throttledHandleMouseSeek)
this.on(t,"touchmove",this.throttledHandleMouseSeek)
this.on(t,"mouseup",this.handleMouseUpHandler_)
this.on(t,"touchend",this.handleMouseUpHandler_)}
i.handleMouseUp=function(e){var t=this.getChild("seekBar")
t&&t.handleMouseUp(e)
this.removeListenersAddedOnMousedownAndTouchstart()}
return t}(Bs)
_u.prototype.options_={children:["seekBar"]}
Bs.registerComponent("ProgressControl",_u)
var bu=function(e){B(t,e)
function t(t,i){var n;(n=e.call(this,t,i)||this).on(t,["enterpictureinpicture","leavepictureinpicture"],(function(e){return n.handlePictureInPictureChange(e)}))
n.on(t,["disablepictureinpicturechanged","loadedmetadata"],(function(e){return n.handlePictureInPictureEnabledChange(e)}))
n.on(t,["loadedmetadata","audioonlymodechange","audiopostermodechange"],(function(){if("audio"===t.currentType().substring(0,5)||t.audioPosterMode()||t.audioOnlyMode()){t.isInPictureInPicture()&&t.exitPictureInPicture()
n.hide()}else n.show()}))
n.disable()
return n}var i=t.prototype
i.buildCSSClass=function(){return"vjs-picture-in-picture-control "+e.prototype.buildCSSClass.call(this)}
i.handlePictureInPictureEnabledChange=function(){L.pictureInPictureEnabled&&!1===this.player_.disablePictureInPicture()?this.enable():this.disable()}
i.handlePictureInPictureChange=function(e){this.player_.isInPictureInPicture()?this.controlText("Exit Picture-in-Picture"):this.controlText("Picture-in-Picture")
this.handlePictureInPictureEnabledChange()}
i.handleClick=function(e){this.player_.isInPictureInPicture()?this.player_.exitPictureInPicture():this.player_.requestPictureInPicture()}
return t}($o)
bu.prototype.controlText_="Picture-in-Picture"
Bs.registerComponent("PictureInPictureToggle",bu)
var Tu=function(e){B(t,e)
function t(t,i){var n;(n=e.call(this,t,i)||this).on(t,"fullscreenchange",(function(e){return n.handleFullscreenChange(e)}))
!1===L[t.fsApi_.fullscreenEnabled]&&n.disable()
return n}var i=t.prototype
i.buildCSSClass=function(){return"vjs-fullscreen-control "+e.prototype.buildCSSClass.call(this)}
i.handleFullscreenChange=function(e){this.player_.isFullscreen()?this.controlText("Non-Fullscreen"):this.controlText("Fullscreen")}
i.handleClick=function(e){this.player_.isFullscreen()?this.player_.exitFullscreen():this.player_.requestFullscreen()}
return t}($o)
Tu.prototype.controlText_="Fullscreen"
Bs.registerComponent("FullscreenToggle",Tu)
var Su=function(e){B(t,e)
function t(){return e.apply(this,arguments)||this}t.prototype.createEl=function(){var t=e.prototype.createEl.call(this,"div",{className:"vjs-volume-level"})
t.appendChild(e.prototype.createEl.call(this,"span",{className:"vjs-control-text"}))
return t}
return t}(Bs)
Bs.registerComponent("VolumeLevel",Su)
var ku=function(e){B(t,e)
function t(t,i){var n;(n=e.call(this,t,i)||this).update=vs(gs(N(n),n.update),ms)
return n}var i=t.prototype
i.createEl=function(){return e.prototype.createEl.call(this,"div",{className:"vjs-volume-tooltip"},{"aria-hidden":"true"})}
i.update=function(e,t,i,n){if(!i){var r=Ra(this.el_),a=Ra(this.player_.el()),s=e.width*t
if(!a||!r)return
var o=e.left-a.left+s,u=e.width-s+(a.right-e.right),l=r.width/2
o<l?l+=l-o:u<l&&(l=u)
l<0?l=0:l>r.width&&(l=r.width)
this.el_.style.right="-"+l+"px"}this.write(n+"%")}
i.write=function(e){Ta(this.el_,e)}
i.updateVolume=function(e,t,i,n,r){var a=this
this.requestNamedAnimationFrame("VolumeLevelTooltip#updateVolume",(function(){a.update(e,t,i,n.toFixed(0))
r&&r()}))}
return t}(Bs)
Bs.registerComponent("VolumeLevelTooltip",ku)
var Eu=function(e){B(t,e)
function t(t,i){var n;(n=e.call(this,t,i)||this).update=vs(gs(N(n),n.update),ms)
return n}var i=t.prototype
i.createEl=function(){return e.prototype.createEl.call(this,"div",{className:"vjs-mouse-display"})}
i.update=function(e,t,i){var n=this,r=100*t
this.getChild("volumeLevelTooltip").updateVolume(e,t,i,r,(function(){i?n.el_.style.bottom=e.height*t+"px":n.el_.style.left=e.width*t+"px"}))}
return t}(Bs)
Eu.prototype.options_={children:["volumeLevelTooltip"]}
Bs.registerComponent("MouseVolumeLevelDisplay",Eu)
var Cu=function(e){B(t,e)
function t(t,i){var n;(n=e.call(this,t,i)||this).on("slideractive",(function(e){return n.updateLastVolume_(e)}))
n.on(t,"volumechange",(function(e){return n.updateARIAAttributes(e)}))
t.ready((function(){return n.updateARIAAttributes()}))
return n}var i=t.prototype
i.createEl=function(){return e.prototype.createEl.call(this,"div",{className:"vjs-volume-bar vjs-slider-bar"},{"aria-label":this.localize("Volume Level"),"aria-live":"polite"})}
i.handleMouseDown=function(t){Ha(t)&&e.prototype.handleMouseDown.call(this,t)}
i.handleMouseMove=function(e){var t=this.getChild("mouseVolumeLevelDisplay")
if(t){var i=this.el(),n=Ra(i),r=this.vertical(),a=Na(i,e)
a=r?a.y:a.x
a=du(a,0,1)
t.update(n,a,r)}if(Ha(e)){this.checkMuted()
this.player_.volume(this.calculateDistance(e))}}
i.checkMuted=function(){this.player_.muted()&&this.player_.muted(!1)}
i.getPercent=function(){return this.player_.muted()?0:this.player_.volume()}
i.stepForward=function(){this.checkMuted()
this.player_.volume(this.player_.volume()+.1)}
i.stepBack=function(){this.checkMuted()
this.player_.volume(this.player_.volume()-.1)}
i.updateARIAAttributes=function(e){var t=this.player_.muted()?0:this.volumeAsPercentage_()
this.el_.setAttribute("aria-valuenow",t)
this.el_.setAttribute("aria-valuetext",t+"%")}
i.volumeAsPercentage_=function(){return Math.round(100*this.player_.volume())}
i.updateLastVolume_=function(){var e=this,t=this.player_.volume()
this.one("sliderinactive",(function(){0===e.player_.volume()&&e.player_.lastVolume_(t)}))}
return t}(hu)
Cu.prototype.options_={children:["volumeLevel"],barName:"volumeLevel"}
da||Jr||Cu.prototype.options_.children.splice(0,0,"mouseVolumeLevelDisplay")
Cu.prototype.playerEvent="volumechange"
Bs.registerComponent("VolumeBar",Cu)
var wu=function(e){B(t,e)
function t(t,i){var n
void 0===i&&(i={})
i.vertical=i.vertical||!1
if(void 0===i.volumeBar||Wr(i.volumeBar)){i.volumeBar=i.volumeBar||{}
i.volumeBar.vertical=i.vertical}n=e.call(this,t,i)||this
!function(e,t){t.tech_&&!t.tech_.featuresVolumeControl&&e.addClass("vjs-hidden")
e.on(t,"loadstart",(function(){t.tech_.featuresVolumeControl?e.removeClass("vjs-hidden"):e.addClass("vjs-hidden")}))}(N(n),t)
n.throttledHandleMouseMove=vs(gs(N(n),n.handleMouseMove),ms)
n.handleMouseUpHandler_=function(e){return n.handleMouseUp(e)}
n.on("mousedown",(function(e){return n.handleMouseDown(e)}))
n.on("touchstart",(function(e){return n.handleMouseDown(e)}))
n.on("mousemove",(function(e){return n.handleMouseMove(e)}))
n.on(n.volumeBar,["focus","slideractive"],(function(){n.volumeBar.addClass("vjs-slider-active")
n.addClass("vjs-slider-active")
n.trigger("slideractive")}))
n.on(n.volumeBar,["blur","sliderinactive"],(function(){n.volumeBar.removeClass("vjs-slider-active")
n.removeClass("vjs-slider-active")
n.trigger("sliderinactive")}))
return n}var i=t.prototype
i.createEl=function(){var t="vjs-volume-horizontal"
this.options_.vertical&&(t="vjs-volume-vertical")
return e.prototype.createEl.call(this,"div",{className:"vjs-volume-control vjs-control "+t})}
i.handleMouseDown=function(e){var t=this.el_.ownerDocument
this.on(t,"mousemove",this.throttledHandleMouseMove)
this.on(t,"touchmove",this.throttledHandleMouseMove)
this.on(t,"mouseup",this.handleMouseUpHandler_)
this.on(t,"touchend",this.handleMouseUpHandler_)}
i.handleMouseUp=function(e){var t=this.el_.ownerDocument
this.off(t,"mousemove",this.throttledHandleMouseMove)
this.off(t,"touchmove",this.throttledHandleMouseMove)
this.off(t,"mouseup",this.handleMouseUpHandler_)
this.off(t,"touchend",this.handleMouseUpHandler_)}
i.handleMouseMove=function(e){this.volumeBar.handleMouseMove(e)}
return t}(Bs)
wu.prototype.options_={children:["volumeBar"]}
Bs.registerComponent("VolumeControl",wu)
var Iu=function(e){B(t,e)
function t(t,i){var n
n=e.call(this,t,i)||this
!function(e,t){t.tech_&&!t.tech_.featuresMuteControl&&e.addClass("vjs-hidden")
e.on(t,"loadstart",(function(){t.tech_.featuresMuteControl?e.removeClass("vjs-hidden"):e.addClass("vjs-hidden")}))}(N(n),t)
n.on(t,["loadstart","volumechange"],(function(e){return n.update(e)}))
return n}var i=t.prototype
i.buildCSSClass=function(){return"vjs-mute-control "+e.prototype.buildCSSClass.call(this)}
i.handleClick=function(e){var t=this.player_.volume(),i=this.player_.lastVolume_()
if(0===t){var n=i<.1?.1:i
this.player_.volume(n)
this.player_.muted(!1)}else this.player_.muted(!this.player_.muted())}
i.update=function(e){this.updateIcon_()
this.updateControlText_()}
i.updateIcon_=function(){var e=this.player_.volume(),t=3
da&&this.player_.tech_&&this.player_.tech_.el_&&this.player_.muted(this.player_.tech_.el_.muted)
0===e||this.player_.muted()?t=0:e<.33?t=1:e<.67&&(t=2)
for(var i=0;i<4;i++)Ca(this.el_,"vjs-vol-"+i)
Ea(this.el_,"vjs-vol-"+t)}
i.updateControlText_=function(){var e=this.player_.muted()||0===this.player_.volume()?"Unmute":"Mute"
this.controlText()!==e&&this.controlText(e)}
return t}($o)
Iu.prototype.controlText_="Mute"
Bs.registerComponent("MuteToggle",Iu)
var Pu=function(e){B(t,e)
function t(t,i){var n
void 0===i&&(i={})
void 0!==i.inline?i.inline=i.inline:i.inline=!0
if(void 0===i.volumeControl||Wr(i.volumeControl)){i.volumeControl=i.volumeControl||{}
i.volumeControl.vertical=!i.inline}(n=e.call(this,t,i)||this).handleKeyPressHandler_=function(e){return n.handleKeyPress(e)}
n.on(t,["loadstart"],(function(e){return n.volumePanelState_(e)}))
n.on(n.muteToggle,"keyup",(function(e){return n.handleKeyPress(e)}))
n.on(n.volumeControl,"keyup",(function(e){return n.handleVolumeControlKeyUp(e)}))
n.on("keydown",(function(e){return n.handleKeyPress(e)}))
n.on("mouseover",(function(e){return n.handleMouseOver(e)}))
n.on("mouseout",(function(e){return n.handleMouseOut(e)}))
n.on(n.volumeControl,["slideractive"],n.sliderActive_)
n.on(n.volumeControl,["sliderinactive"],n.sliderInactive_)
return n}var i=t.prototype
i.sliderActive_=function(){this.addClass("vjs-slider-active")}
i.sliderInactive_=function(){this.removeClass("vjs-slider-active")}
i.volumePanelState_=function(){this.volumeControl.hasClass("vjs-hidden")&&this.muteToggle.hasClass("vjs-hidden")&&this.addClass("vjs-hidden")
this.volumeControl.hasClass("vjs-hidden")&&!this.muteToggle.hasClass("vjs-hidden")&&this.addClass("vjs-mute-toggle-only")}
i.createEl=function(){var t="vjs-volume-panel-horizontal"
this.options_.inline||(t="vjs-volume-panel-vertical")
return e.prototype.createEl.call(this,"div",{className:"vjs-volume-panel vjs-control "+t})}
i.dispose=function(){this.handleMouseOut()
e.prototype.dispose.call(this)}
i.handleVolumeControlKeyUp=function(e){M.isEventKey(e,"Esc")&&this.muteToggle.focus()}
i.handleMouseOver=function(e){this.addClass("vjs-hover")
us(L,"keyup",this.handleKeyPressHandler_)}
i.handleMouseOut=function(e){this.removeClass("vjs-hover")
ls(L,"keyup",this.handleKeyPressHandler_)}
i.handleKeyPress=function(e){M.isEventKey(e,"Esc")&&this.handleMouseOut()}
return t}(Bs)
Pu.prototype.options_={children:["muteToggle","volumeControl"]}
Bs.registerComponent("VolumePanel",Pu)
var xu=function(e){B(t,e)
function t(t,i){var n
n=e.call(this,t,i)||this
i&&(n.menuButton_=i.menuButton)
n.focusedChild_=-1
n.on("keydown",(function(e){return n.handleKeyDown(e)}))
n.boundHandleBlur_=function(e){return n.handleBlur(e)}
n.boundHandleTapClick_=function(e){return n.handleTapClick(e)}
return n}var i=t.prototype
i.addEventListenerForItem=function(e){if(e instanceof Bs){this.on(e,"blur",this.boundHandleBlur_)
this.on(e,["tap","click"],this.boundHandleTapClick_)}}
i.removeEventListenerForItem=function(e){if(e instanceof Bs){this.off(e,"blur",this.boundHandleBlur_)
this.off(e,["tap","click"],this.boundHandleTapClick_)}}
i.removeChild=function(t){"string"==typeof t&&(t=this.getChild(t))
this.removeEventListenerForItem(t)
e.prototype.removeChild.call(this,t)}
i.addItem=function(e){var t=this.addChild(e)
t&&this.addEventListenerForItem(t)}
i.createEl=function(){var t=this.options_.contentElType||"ul"
this.contentEl_=ba(t,{className:"vjs-menu-content"})
this.contentEl_.setAttribute("role","menu")
var i=e.prototype.createEl.call(this,"div",{append:this.contentEl_,className:"vjs-menu"})
i.appendChild(this.contentEl_)
us(i,"click",(function(e){e.preventDefault()
e.stopImmediatePropagation()}))
return i}
i.dispose=function(){this.contentEl_=null
this.boundHandleBlur_=null
this.boundHandleTapClick_=null
e.prototype.dispose.call(this)}
i.handleBlur=function(e){var t=e.relatedTarget||L.activeElement
if(!this.children().some((function(e){return e.el()===t}))){var i=this.menuButton_
i&&i.buttonPressed_&&t!==i.el().firstChild&&i.unpressButton()}}
i.handleTapClick=function(e){if(this.menuButton_){this.menuButton_.unpressButton()
var t=this.children()
if(!Array.isArray(t))return
var i=t.filter((function(t){return t.el()===e.target}))[0]
if(!i)return
"CaptionSettingsMenuItem"!==i.name()&&this.menuButton_.focus()}}
i.handleKeyDown=function(e){if(M.isEventKey(e,"Left")||M.isEventKey(e,"Down")){e.preventDefault()
e.stopPropagation()
this.stepForward()}else if(M.isEventKey(e,"Right")||M.isEventKey(e,"Up")){e.preventDefault()
e.stopPropagation()
this.stepBack()}}
i.stepForward=function(){var e=0
void 0!==this.focusedChild_&&(e=this.focusedChild_+1)
this.focus(e)}
i.stepBack=function(){var e=0
void 0!==this.focusedChild_&&(e=this.focusedChild_-1)
this.focus(e)}
i.focus=function(e){void 0===e&&(e=0)
var t=this.children().slice()
t.length&&t[0].hasClass("vjs-menu-title")&&t.shift()
if(t.length>0){e<0?e=0:e>=t.length&&(e=t.length-1)
this.focusedChild_=e
t[e].el_.focus()}}
return t}(Bs)
Bs.registerComponent("Menu",xu)
var Au=function(e){B(t,e)
function t(t,i){var n
void 0===i&&(i={});(n=e.call(this,t,i)||this).menuButton_=new $o(t,i)
n.menuButton_.controlText(n.controlText_)
n.menuButton_.el_.setAttribute("aria-haspopup","true")
var r=$o.prototype.buildCSSClass()
n.menuButton_.el_.className=n.buildCSSClass()+" "+r
n.menuButton_.removeClass("vjs-control")
n.addChild(n.menuButton_)
n.update()
n.enabled_=!0
var a=function(e){return n.handleClick(e)}
n.handleMenuKeyUp_=function(e){return n.handleMenuKeyUp(e)}
n.on(n.menuButton_,"tap",a)
n.on(n.menuButton_,"click",a)
n.on(n.menuButton_,"keydown",(function(e){return n.handleKeyDown(e)}))
n.on(n.menuButton_,"mouseenter",(function(){n.addClass("vjs-hover")
n.menu.show()
us(L,"keyup",n.handleMenuKeyUp_)}))
n.on("mouseleave",(function(e){return n.handleMouseLeave(e)}))
n.on("keydown",(function(e){return n.handleSubmenuKeyDown(e)}))
return n}var i=t.prototype
i.update=function(){var e=this.createMenu()
if(this.menu){this.menu.dispose()
this.removeChild(this.menu)}this.menu=e
this.addChild(e)
this.buttonPressed_=!1
this.menuButton_.el_.setAttribute("aria-expanded","false")
this.items&&this.items.length<=this.hideThreshold_?this.hide():this.show()}
i.createMenu=function(){var e=new xu(this.player_,{menuButton:this})
this.hideThreshold_=0
if(this.options_.title){var t=ba("li",{className:"vjs-menu-title",textContent:Ls(this.options_.title),tabIndex:-1}),i=new Bs(this.player_,{el:t})
e.addItem(i)}this.items=this.createItems()
if(this.items)for(var n=0;n<this.items.length;n++)e.addItem(this.items[n])
return e}
i.createItems=function(){}
i.createEl=function(){return e.prototype.createEl.call(this,"div",{className:this.buildWrapperCSSClass()},{})}
i.buildWrapperCSSClass=function(){var t="vjs-menu-button"
!0===this.options_.inline?t+="-inline":t+="-popup"
return"vjs-menu-button "+t+" "+$o.prototype.buildCSSClass()+" "+e.prototype.buildCSSClass.call(this)}
i.buildCSSClass=function(){var t="vjs-menu-button"
!0===this.options_.inline?t+="-inline":t+="-popup"
return"vjs-menu-button "+t+" "+e.prototype.buildCSSClass.call(this)}
i.controlText=function(e,t){void 0===t&&(t=this.menuButton_.el())
return this.menuButton_.controlText(e,t)}
i.dispose=function(){this.handleMouseLeave()
e.prototype.dispose.call(this)}
i.handleClick=function(e){this.buttonPressed_?this.unpressButton():this.pressButton()}
i.handleMouseLeave=function(e){this.removeClass("vjs-hover")
ls(L,"keyup",this.handleMenuKeyUp_)}
i.focus=function(){this.menuButton_.focus()}
i.blur=function(){this.menuButton_.blur()}
i.handleKeyDown=function(e){if(M.isEventKey(e,"Esc")||M.isEventKey(e,"Tab")){this.buttonPressed_&&this.unpressButton()
if(!M.isEventKey(e,"Tab")){e.preventDefault()
this.menuButton_.focus()}}else if((M.isEventKey(e,"Up")||M.isEventKey(e,"Down"))&&!this.buttonPressed_){e.preventDefault()
this.pressButton()}}
i.handleMenuKeyUp=function(e){(M.isEventKey(e,"Esc")||M.isEventKey(e,"Tab"))&&this.removeClass("vjs-hover")}
i.handleSubmenuKeyPress=function(e){this.handleSubmenuKeyDown(e)}
i.handleSubmenuKeyDown=function(e){if(M.isEventKey(e,"Esc")||M.isEventKey(e,"Tab")){this.buttonPressed_&&this.unpressButton()
if(!M.isEventKey(e,"Tab")){e.preventDefault()
this.menuButton_.focus()}}}
i.pressButton=function(){if(this.enabled_){this.buttonPressed_=!0
this.menu.show()
this.menu.lockShowing()
this.menuButton_.el_.setAttribute("aria-expanded","true")
if(da&&ya())return
this.menu.focus()}}
i.unpressButton=function(){if(this.enabled_){this.buttonPressed_=!1
this.menu.unlockShowing()
this.menu.hide()
this.menuButton_.el_.setAttribute("aria-expanded","false")}}
i.disable=function(){this.unpressButton()
this.enabled_=!1
this.addClass("vjs-disabled")
this.menuButton_.disable()}
i.enable=function(){this.enabled_=!0
this.removeClass("vjs-disabled")
this.menuButton_.enable()}
return t}(Bs)
Bs.registerComponent("MenuButton",Au)
var Ou=function(e){B(t,e)
function t(t,i){var n,r=i.tracks;(n=e.call(this,t,i)||this).items.length<=1&&n.hide()
if(!r)return N(n)
var a=gs(N(n),n.update)
r.addEventListener("removetrack",a)
r.addEventListener("addtrack",a)
r.addEventListener("labelchange",a)
n.player_.on("ready",a)
n.player_.on("dispose",(function(){r.removeEventListener("removetrack",a)
r.removeEventListener("addtrack",a)
r.removeEventListener("labelchange",a)}))
return n}return t}(Au)
Bs.registerComponent("TrackButton",Ou)
var Lu=["Tab","Esc","Up","Down","Right","Left"],Du=function(e){B(t,e)
function t(t,i){var n;(n=e.call(this,t,i)||this).selectable=i.selectable
n.isSelected_=i.selected||!1
n.multiSelectable=i.multiSelectable
n.selected(n.isSelected_)
n.selectable?n.multiSelectable?n.el_.setAttribute("role","menuitemcheckbox"):n.el_.setAttribute("role","menuitemradio"):n.el_.setAttribute("role","menuitem")
return n}var i=t.prototype
i.createEl=function(t,i,n){this.nonIconControl=!0
var r=e.prototype.createEl.call(this,"li",Hr({className:"vjs-menu-item",tabIndex:-1},i),n)
r.replaceChild(ba("span",{className:"vjs-menu-item-text",textContent:this.localize(this.options_.label)}),r.querySelector(".vjs-icon-placeholder"))
return r}
i.handleKeyDown=function(t){Lu.some((function(e){return M.isEventKey(t,e)}))||e.prototype.handleKeyDown.call(this,t)}
i.handleClick=function(e){this.selected(!0)}
i.selected=function(e){if(this.selectable)if(e){this.addClass("vjs-selected")
this.el_.setAttribute("aria-checked","true")
this.controlText(", selected")
this.isSelected_=!0}else{this.removeClass("vjs-selected")
this.el_.setAttribute("aria-checked","false")
this.controlText("")
this.isSelected_=!1}}
return t}(qo)
Bs.registerComponent("MenuItem",Du)
var Ru=function(e){B(t,e)
function t(t,i){var n,r=i.track,a=t.textTracks()
i.label=r.label||r.language||"Unknown"
i.selected="showing"===r.mode;(n=e.call(this,t,i)||this).track=r
n.kinds=(i.kinds||[i.kind||n.track.kind]).filter(Boolean)
var s=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i]
n.handleTracksChange.apply(N(n),t)},o=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i]
n.handleSelectedLanguageChange.apply(N(n),t)}
t.on(["loadstart","texttrackchange"],s)
a.addEventListener("change",s)
a.addEventListener("selectedlanguagechange",o)
n.on("dispose",(function(){t.off(["loadstart","texttrackchange"],s)
a.removeEventListener("change",s)
a.removeEventListener("selectedlanguagechange",o)}))
if(void 0===a.onchange){var u
n.on(["tap","click"],(function(){if("object"!=typeof x.Event)try{u=new x.Event("change")}catch(e){}u||(u=L.createEvent("Event")).initEvent("change",!0,!0)
a.dispatchEvent(u)}))}n.handleTracksChange()
return n}var i=t.prototype
i.handleClick=function(t){var i=this.track,n=this.player_.textTracks()
e.prototype.handleClick.call(this,t)
if(n)for(var r=0;r<n.length;r++){var a=n[r];-1!==this.kinds.indexOf(a.kind)&&(a===i?"showing"!==a.mode&&(a.mode="showing"):"disabled"!==a.mode&&(a.mode="disabled"))}}
i.handleTracksChange=function(e){var t="showing"===this.track.mode
t!==this.isSelected_&&this.selected(t)}
i.handleSelectedLanguageChange=function(e){if("showing"===this.track.mode){var t=this.player_.cache_.selectedLanguage
if(t&&t.enabled&&t.language===this.track.language&&t.kind!==this.track.kind)return
this.player_.cache_.selectedLanguage={enabled:!0,language:this.track.language,kind:this.track.kind}}}
i.dispose=function(){this.track=null
e.prototype.dispose.call(this)}
return t}(Du)
Bs.registerComponent("TextTrackMenuItem",Ru)
var Mu=function(e){B(t,e)
function t(t,i){i.track={player:t,kind:i.kind,kinds:i.kinds,default:!1,mode:"disabled"}
i.kinds||(i.kinds=[i.kind])
i.label?i.track.label=i.label:i.track.label=i.kinds.join(" and ")+" off"
i.selectable=!0
i.multiSelectable=!1
return e.call(this,t,i)||this}var i=t.prototype
i.handleTracksChange=function(e){for(var t=this.player().textTracks(),i=!0,n=0,r=t.length;n<r;n++){var a=t[n]
if(this.options_.kinds.indexOf(a.kind)>-1&&"showing"===a.mode){i=!1
break}}i!==this.isSelected_&&this.selected(i)}
i.handleSelectedLanguageChange=function(e){for(var t=this.player().textTracks(),i=!0,n=0,r=t.length;n<r;n++){var a=t[n]
if(["captions","descriptions","subtitles"].indexOf(a.kind)>-1&&"showing"===a.mode){i=!1
break}}i&&(this.player_.cache_.selectedLanguage={enabled:!1})}
return t}(Ru)
Bs.registerComponent("OffTextTrackMenuItem",Mu)
var Nu=function(e){B(t,e)
function t(t,i){void 0===i&&(i={})
i.tracks=t.textTracks()
return e.call(this,t,i)||this}t.prototype.createItems=function(e,t){void 0===e&&(e=[])
void 0===t&&(t=Ru)
var i
this.label_&&(i=this.label_+" off")
e.push(new Mu(this.player_,{kinds:this.kinds_,kind:this.kind_,label:i}))
this.hideThreshold_+=1
var n=this.player_.textTracks()
Array.isArray(this.kinds_)||(this.kinds_=[this.kind_])
for(var r=0;r<n.length;r++){var a=n[r]
if(this.kinds_.indexOf(a.kind)>-1){var s=new t(this.player_,{track:a,kinds:this.kinds_,kind:this.kind_,selectable:!0,multiSelectable:!1})
s.addClass("vjs-"+a.kind+"-menu-item")
e.push(s)}}return e}
return t}(Ou)
Bs.registerComponent("TextTrackButton",Nu)
var Uu=function(e){B(t,e)
function t(t,i){var n,r=i.track,a=i.cue,s=t.currentTime()
i.selectable=!0
i.multiSelectable=!1
i.label=a.text
i.selected=a.startTime<=s&&s<a.endTime;(n=e.call(this,t,i)||this).track=r
n.cue=a
return n}t.prototype.handleClick=function(t){e.prototype.handleClick.call(this)
this.player_.currentTime(this.cue.startTime)}
return t}(Du)
Bs.registerComponent("ChaptersTrackMenuItem",Uu)
var Bu=function(e){B(t,e)
function t(t,i,n){var r;(r=e.call(this,t,i,n)||this).selectCurrentItem_=function(){r.items.forEach((function(e){e.selected(r.track_.activeCues[0]===e.cue)}))}
return r}var i=t.prototype
i.buildCSSClass=function(){return"vjs-chapters-button "+e.prototype.buildCSSClass.call(this)}
i.buildWrapperCSSClass=function(){return"vjs-chapters-button "+e.prototype.buildWrapperCSSClass.call(this)}
i.update=function(t){if(!t||!t.track||"chapters"===t.track.kind){var i=this.findChaptersTrack()
if(i!==this.track_){this.setTrack(i)
e.prototype.update.call(this)}else(!this.items||i&&i.cues&&i.cues.length!==this.items.length)&&e.prototype.update.call(this)}}
i.setTrack=function(e){if(this.track_!==e){this.updateHandler_||(this.updateHandler_=this.update.bind(this))
if(this.track_){var t=this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_)
t&&t.removeEventListener("load",this.updateHandler_)
this.track_.removeEventListener("cuechange",this.selectCurrentItem_)
this.track_=null}this.track_=e
if(this.track_){this.track_.mode="hidden"
var i=this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_)
i&&i.addEventListener("load",this.updateHandler_)
this.track_.addEventListener("cuechange",this.selectCurrentItem_)}}}
i.findChaptersTrack=function(){for(var e=this.player_.textTracks()||[],t=e.length-1;t>=0;t--){var i=e[t]
if(i.kind===this.kind_)return i}}
i.getMenuCaption=function(){return this.track_&&this.track_.label?this.track_.label:this.localize(Ls(this.kind_))}
i.createMenu=function(){this.options_.title=this.getMenuCaption()
return e.prototype.createMenu.call(this)}
i.createItems=function(){var e=[]
if(!this.track_)return e
var t=this.track_.cues
if(!t)return e
for(var i=0,n=t.length;i<n;i++){var r=t[i],a=new Uu(this.player_,{track:this.track_,cue:r})
e.push(a)}return e}
return t}(Nu)
Bu.prototype.kind_="chapters"
Bu.prototype.controlText_="Chapters"
Bs.registerComponent("ChaptersButton",Bu)
var Fu=function(e){B(t,e)
function t(t,i,n){var r
r=e.call(this,t,i,n)||this
var a=t.textTracks(),s=gs(N(r),r.handleTracksChange)
a.addEventListener("change",s)
r.on("dispose",(function(){a.removeEventListener("change",s)}))
return r}var i=t.prototype
i.handleTracksChange=function(e){for(var t=this.player().textTracks(),i=!1,n=0,r=t.length;n<r;n++){var a=t[n]
if(a.kind!==this.kind_&&"showing"===a.mode){i=!0
break}}i?this.disable():this.enable()}
i.buildCSSClass=function(){return"vjs-descriptions-button "+e.prototype.buildCSSClass.call(this)}
i.buildWrapperCSSClass=function(){return"vjs-descriptions-button "+e.prototype.buildWrapperCSSClass.call(this)}
return t}(Nu)
Fu.prototype.kind_="descriptions"
Fu.prototype.controlText_="Descriptions"
Bs.registerComponent("DescriptionsButton",Fu)
var ju=function(e){B(t,e)
function t(t,i,n){return e.call(this,t,i,n)||this}var i=t.prototype
i.buildCSSClass=function(){return"vjs-subtitles-button "+e.prototype.buildCSSClass.call(this)}
i.buildWrapperCSSClass=function(){return"vjs-subtitles-button "+e.prototype.buildWrapperCSSClass.call(this)}
return t}(Nu)
ju.prototype.kind_="subtitles"
ju.prototype.controlText_="Subtitles"
Bs.registerComponent("SubtitlesButton",ju)
var Vu=function(e){B(t,e)
function t(t,i){var n
i.track={player:t,kind:i.kind,label:i.kind+" settings",selectable:!1,default:!1,mode:"disabled"}
i.selectable=!1
i.name="CaptionSettingsMenuItem";(n=e.call(this,t,i)||this).addClass("vjs-texttrack-settings")
n.controlText(", opens "+i.kind+" settings dialog")
return n}t.prototype.handleClick=function(e){this.player().getChild("textTrackSettings").open()}
return t}(Ru)
Bs.registerComponent("CaptionSettingsMenuItem",Vu)
var Hu=function(e){B(t,e)
function t(t,i,n){return e.call(this,t,i,n)||this}var i=t.prototype
i.buildCSSClass=function(){return"vjs-captions-button "+e.prototype.buildCSSClass.call(this)}
i.buildWrapperCSSClass=function(){return"vjs-captions-button "+e.prototype.buildWrapperCSSClass.call(this)}
i.createItems=function(){var t=[]
if((!this.player().tech_||!this.player().tech_.featuresNativeTextTracks)&&this.player().getChild("textTrackSettings")){t.push(new Vu(this.player_,{kind:this.kind_}))
this.hideThreshold_+=1}return e.prototype.createItems.call(this,t)}
return t}(Nu)
Hu.prototype.kind_="captions"
Hu.prototype.controlText_="Captions"
Bs.registerComponent("CaptionsButton",Hu)
var qu=function(e){B(t,e)
function t(){return e.apply(this,arguments)||this}t.prototype.createEl=function(t,i,n){var r=e.prototype.createEl.call(this,t,i,n),a=r.querySelector(".vjs-menu-item-text")
if("captions"===this.options_.track.kind){a.appendChild(ba("span",{className:"vjs-icon-placeholder"},{"aria-hidden":!0}))
a.appendChild(ba("span",{className:"vjs-control-text",textContent:" "+this.localize("Captions")}))}return r}
return t}(Ru)
Bs.registerComponent("SubsCapsMenuItem",qu)
var Wu=function(e){B(t,e)
function t(t,i){var n
void 0===i&&(i={});(n=e.call(this,t,i)||this).label_="subtitles";["en","en-us","en-ca","fr-ca"].indexOf(n.player_.language_)>-1&&(n.label_="captions")
n.menuButton_.controlText(Ls(n.label_))
return n}var i=t.prototype
i.buildCSSClass=function(){return"vjs-subs-caps-button "+e.prototype.buildCSSClass.call(this)}
i.buildWrapperCSSClass=function(){return"vjs-subs-caps-button "+e.prototype.buildWrapperCSSClass.call(this)}
i.createItems=function(){var t=[]
if((!this.player().tech_||!this.player().tech_.featuresNativeTextTracks)&&this.player().getChild("textTrackSettings")){t.push(new Vu(this.player_,{kind:this.label_}))
this.hideThreshold_+=1}return t=e.prototype.createItems.call(this,t,qu)}
return t}(Nu)
Wu.prototype.kinds_=["captions","subtitles"]
Wu.prototype.controlText_="Subtitles"
Bs.registerComponent("SubsCapsButton",Wu)
var Gu=function(e){B(t,e)
function t(t,i){var n,r=i.track,a=t.audioTracks()
i.label=r.label||r.language||"Unknown"
i.selected=r.enabled;(n=e.call(this,t,i)||this).track=r
n.addClass("vjs-"+r.kind+"-menu-item")
var s=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i]
n.handleTracksChange.apply(N(n),t)}
a.addEventListener("change",s)
n.on("dispose",(function(){a.removeEventListener("change",s)}))
return n}var i=t.prototype
i.createEl=function(t,i,n){var r=e.prototype.createEl.call(this,t,i,n),a=r.querySelector(".vjs-menu-item-text")
if("main-desc"===this.options_.track.kind){a.appendChild(ba("span",{className:"vjs-icon-placeholder"},{"aria-hidden":!0}))
a.appendChild(ba("span",{className:"vjs-control-text",textContent:" "+this.localize("Descriptions")}))}return r}
i.handleClick=function(t){e.prototype.handleClick.call(this,t)
this.track.enabled=!0
if(this.player_.tech_.featuresNativeAudioTracks)for(var i=this.player_.audioTracks(),n=0;n<i.length;n++){var r=i[n]
r!==this.track&&(r.enabled=r===this.track)}}
i.handleTracksChange=function(e){this.selected(this.track.enabled)}
return t}(Du)
Bs.registerComponent("AudioTrackMenuItem",Gu)
var zu=function(e){B(t,e)
function t(t,i){void 0===i&&(i={})
i.tracks=t.audioTracks()
return e.call(this,t,i)||this}var i=t.prototype
i.buildCSSClass=function(){return"vjs-audio-button "+e.prototype.buildCSSClass.call(this)}
i.buildWrapperCSSClass=function(){return"vjs-audio-button "+e.prototype.buildWrapperCSSClass.call(this)}
i.createItems=function(e){void 0===e&&(e=[])
this.hideThreshold_=1
for(var t=this.player_.audioTracks(),i=0;i<t.length;i++){var n=t[i]
e.push(new Gu(this.player_,{track:n,selectable:!0,multiSelectable:!1}))}return e}
return t}(Ou)
zu.prototype.controlText_="Audio Track"
Bs.registerComponent("AudioTrackButton",zu)
var Ku=function(e){B(t,e)
function t(t,i){var n,r=i.rate,a=parseFloat(r,10)
i.label=r
i.selected=a===t.playbackRate()
i.selectable=!0
i.multiSelectable=!1;(n=e.call(this,t,i)||this).label=r
n.rate=a
n.on(t,"ratechange",(function(e){return n.update(e)}))
return n}var i=t.prototype
i.handleClick=function(t){e.prototype.handleClick.call(this)
this.player().playbackRate(this.rate)}
i.update=function(e){this.selected(this.player().playbackRate()===this.rate)}
return t}(Du)
Ku.prototype.contentElType="button"
Bs.registerComponent("PlaybackRateMenuItem",Ku)
var Xu=function(e){B(t,e)
function t(t,i){var n;(n=e.call(this,t,i)||this).menuButton_.el_.setAttribute("aria-describedby",n.labelElId_)
n.updateVisibility()
n.updateLabel()
n.on(t,"loadstart",(function(e){return n.updateVisibility(e)}))
n.on(t,"ratechange",(function(e){return n.updateLabel(e)}))
n.on(t,"playbackrateschange",(function(e){return n.handlePlaybackRateschange(e)}))
return n}var i=t.prototype
i.createEl=function(){var t=e.prototype.createEl.call(this)
this.labelElId_="vjs-playback-rate-value-label-"+this.id_
this.labelEl_=ba("div",{className:"vjs-playback-rate-value",id:this.labelElId_,textContent:"1x"})
t.appendChild(this.labelEl_)
return t}
i.dispose=function(){this.labelEl_=null
e.prototype.dispose.call(this)}
i.buildCSSClass=function(){return"vjs-playback-rate "+e.prototype.buildCSSClass.call(this)}
i.buildWrapperCSSClass=function(){return"vjs-playback-rate "+e.prototype.buildWrapperCSSClass.call(this)}
i.createItems=function(){for(var e=this.playbackRates(),t=[],i=e.length-1;i>=0;i--)t.push(new Ku(this.player(),{rate:e[i]+"x"}))
return t}
i.updateARIAAttributes=function(){this.el().setAttribute("aria-valuenow",this.player().playbackRate())}
i.handleClick=function(e){var t=this.player().playbackRate(),i=this.playbackRates(),n=(i.indexOf(t)+1)%i.length
this.player().playbackRate(i[n])}
i.handlePlaybackRateschange=function(e){this.update()}
i.playbackRates=function(){var e=this.player()
return e.playbackRates&&e.playbackRates()||[]}
i.playbackRateSupported=function(){return this.player().tech_&&this.player().tech_.featuresPlaybackRate&&this.playbackRates()&&this.playbackRates().length>0}
i.updateVisibility=function(e){this.playbackRateSupported()?this.removeClass("vjs-hidden"):this.addClass("vjs-hidden")}
i.updateLabel=function(e){this.playbackRateSupported()&&(this.labelEl_.textContent=this.player().playbackRate()+"x")}
return t}(Au)
Xu.prototype.controlText_="Playback Rate"
Bs.registerComponent("PlaybackRateMenuButton",Xu)
var Yu=function(e){B(t,e)
function t(){return e.apply(this,arguments)||this}var i=t.prototype
i.buildCSSClass=function(){return"vjs-spacer "+e.prototype.buildCSSClass.call(this)}
i.createEl=function(t,i,n){void 0===t&&(t="div")
void 0===i&&(i={})
void 0===n&&(n={})
i.className||(i.className=this.buildCSSClass())
return e.prototype.createEl.call(this,t,i,n)}
return t}(Bs)
Bs.registerComponent("Spacer",Yu)
var Qu=function(e){B(t,e)
function t(){return e.apply(this,arguments)||this}var i=t.prototype
i.buildCSSClass=function(){return"vjs-custom-control-spacer "+e.prototype.buildCSSClass.call(this)}
i.createEl=function(){return e.prototype.createEl.call(this,"div",{className:this.buildCSSClass(),textContent:" "})}
return t}(Yu)
Bs.registerComponent("CustomControlSpacer",Qu)
var $u=function(e){B(t,e)
function t(){return e.apply(this,arguments)||this}t.prototype.createEl=function(){return e.prototype.createEl.call(this,"div",{className:"vjs-control-bar",dir:"ltr"})}
return t}(Bs)
$u.prototype.options_={children:["playToggle","volumePanel","currentTimeDisplay","timeDivider","durationDisplay","progressControl","liveDisplay","seekToLive","remainingTimeDisplay","customControlSpacer","playbackRateMenuButton","chaptersButton","descriptionsButton","subsCapsButton","audioTrackButton","fullscreenToggle"]}
"exitPictureInPicture"in L&&$u.prototype.options_.children.splice($u.prototype.options_.children.length-1,0,"pictureInPictureToggle")
Bs.registerComponent("ControlBar",$u)
var Ju=function(e){B(t,e)
function t(t,i){var n;(n=e.call(this,t,i)||this).on(t,"error",(function(e){return n.open(e)}))
return n}var i=t.prototype
i.buildCSSClass=function(){return"vjs-error-display "+e.prototype.buildCSSClass.call(this)}
i.content=function(){var e=this.player().error()
return e?this.localize(e.message):""}
return t}($s)
Ju.prototype.options_=R({},$s.prototype.options_,{pauseOnOpen:!1,fillAlways:!0,temporary:!1,uncloseable:!0})
Bs.registerComponent("ErrorDisplay",Ju)
var Zu="vjs-text-track-settings",el=["#000","Black"],tl=["#00F","Blue"],il=["#0FF","Cyan"],nl=["#0F0","Green"],rl=["#F0F","Magenta"],al=["#F00","Red"],sl=["#FFF","White"],ol=["#FF0","Yellow"],ul=["1","Opaque"],ll=["0.5","Semi-Transparent"],cl=["0","Transparent"],dl={backgroundColor:{selector:".vjs-bg-color > select",id:"captions-background-color-%s",label:"Color",options:[el,sl,al,nl,tl,ol,rl,il]},backgroundOpacity:{selector:".vjs-bg-opacity > select",id:"captions-background-opacity-%s",label:"Transparency",options:[ul,ll,cl]},color:{selector:".vjs-fg-color > select",id:"captions-foreground-color-%s",label:"Color",options:[sl,el,al,nl,tl,ol,rl,il]},edgeStyle:{selector:".vjs-edge-style > select",id:"%s",label:"Text Edge Style",options:[["none","None"],["raised","Raised"],["depressed","Depressed"],["uniform","Uniform"],["dropshadow","Dropshadow"]]},fontFamily:{selector:".vjs-font-family > select",id:"captions-font-family-%s",label:"Font Family",options:[["proportionalSansSerif","Proportional Sans-Serif"],["monospaceSansSerif","Monospace Sans-Serif"],["proportionalSerif","Proportional Serif"],["monospaceSerif","Monospace Serif"],["casual","Casual"],["script","Script"],["small-caps","Small Caps"]]},fontPercent:{selector:".vjs-font-percent > select",id:"captions-font-size-%s",label:"Font Size",options:[["0.50","50%"],["0.75","75%"],["1.00","100%"],["1.25","125%"],["1.50","150%"],["1.75","175%"],["2.00","200%"],["3.00","300%"],["4.00","400%"]],default:2,parser:function(e){return"1.00"===e?null:Number(e)}},textOpacity:{selector:".vjs-text-opacity > select",id:"captions-foreground-opacity-%s",label:"Transparency",options:[ul,ll]},windowColor:{selector:".vjs-window-color > select",id:"captions-window-color-%s",label:"Color"},windowOpacity:{selector:".vjs-window-opacity > select",id:"captions-window-opacity-%s",label:"Transparency",options:[cl,ll,ul]}}
dl.windowColor.options=dl.backgroundColor.options
function hl(e,t){t&&(e=t(e))
if(e&&"none"!==e)return e}var pl=function(e){B(t,e)
function t(t,i){var n
i.temporary=!1;(n=e.call(this,t,i)||this).updateDisplay=n.updateDisplay.bind(N(n))
n.fill()
n.hasBeenOpened_=n.hasBeenFilled_=!0
n.endDialog=ba("p",{className:"vjs-control-text",textContent:n.localize("End of dialog window.")})
n.el().appendChild(n.endDialog)
n.setDefaults()
void 0===i.persistTextTrackSettings&&(n.options_.persistTextTrackSettings=n.options_.playerOptions.persistTextTrackSettings)
n.on(n.$(".vjs-done-button"),"click",(function(){n.saveSettings()
n.close()}))
n.on(n.$(".vjs-default-button"),"click",(function(){n.setDefaults()
n.updateDisplay()}))
Vr(dl,(function(e){n.on(n.$(e.selector),"change",n.updateDisplay)}))
n.options_.persistTextTrackSettings&&n.restoreSettings()
return n}var i=t.prototype
i.dispose=function(){this.endDialog=null
e.prototype.dispose.call(this)}
i.createElSelect_=function(e,t,i){var n=this
void 0===t&&(t="")
void 0===i&&(i="label")
var r=dl[e],a=r.id.replace("%s",this.id_),s=[t,a].join(" ").trim()
return["<"+i+' id="'+a+'" class="'+("label"===i?"vjs-label":"")+'">',this.localize(r.label),"</"+i+">",'<select aria-labelledby="'+s+'">'].concat(r.options.map((function(e){var t=a+"-"+e[1].replace(/\W+/g,"")
return['<option id="'+t+'" value="'+e[0]+'" ','aria-labelledby="'+s+" "+t+'">',n.localize(e[1]),"</option>"].join("")}))).concat("</select>").join("")}
i.createElFgColor_=function(){var e="captions-text-legend-"+this.id_
return['<fieldset class="vjs-fg-color vjs-track-setting">','<legend id="'+e+'">',this.localize("Text"),"</legend>",this.createElSelect_("color",e),'<span class="vjs-text-opacity vjs-opacity">',this.createElSelect_("textOpacity",e),"</span>","</fieldset>"].join("")}
i.createElBgColor_=function(){var e="captions-background-"+this.id_
return['<fieldset class="vjs-bg-color vjs-track-setting">','<legend id="'+e+'">',this.localize("Background"),"</legend>",this.createElSelect_("backgroundColor",e),'<span class="vjs-bg-opacity vjs-opacity">',this.createElSelect_("backgroundOpacity",e),"</span>","</fieldset>"].join("")}
i.createElWinColor_=function(){var e="captions-window-"+this.id_
return['<fieldset class="vjs-window-color vjs-track-setting">','<legend id="'+e+'">',this.localize("Window"),"</legend>",this.createElSelect_("windowColor",e),'<span class="vjs-window-opacity vjs-opacity">',this.createElSelect_("windowOpacity",e),"</span>","</fieldset>"].join("")}
i.createElColors_=function(){return ba("div",{className:"vjs-track-settings-colors",innerHTML:[this.createElFgColor_(),this.createElBgColor_(),this.createElWinColor_()].join("")})}
i.createElFont_=function(){return ba("div",{className:"vjs-track-settings-font",innerHTML:['<fieldset class="vjs-font-percent vjs-track-setting">',this.createElSelect_("fontPercent","","legend"),"</fieldset>",'<fieldset class="vjs-edge-style vjs-track-setting">',this.createElSelect_("edgeStyle","","legend"),"</fieldset>",'<fieldset class="vjs-font-family vjs-track-setting">',this.createElSelect_("fontFamily","","legend"),"</fieldset>"].join("")})}
i.createElControls_=function(){var e=this.localize("restore all settings to the default values")
return ba("div",{className:"vjs-track-settings-controls",innerHTML:['<button type="button" class="vjs-default-button" title="'+e+'">',this.localize("Reset"),'<span class="vjs-control-text"> '+e+"</span>","</button>",'<button type="button" class="vjs-done-button">'+this.localize("Done")+"</button>"].join("")})}
i.content=function(){return[this.createElColors_(),this.createElFont_(),this.createElControls_()]}
i.label=function(){return this.localize("Caption Settings Dialog")}
i.description=function(){return this.localize("Beginning of dialog window. Escape will cancel and close the window.")}
i.buildCSSClass=function(){return e.prototype.buildCSSClass.call(this)+" vjs-text-track-settings"}
i.getValues=function(){var e=this
return function(e,t,i){void 0===i&&(i=0)
return jr(e).reduce((function(i,n){return t(i,e[n],n)}),i)}(dl,(function(t,i,n){var r,a,s=(r=e.$(i.selector),a=i.parser,hl(r.options[r.options.selectedIndex].value,a))
void 0!==s&&(t[n]=s)
return t}),{})}
i.setValues=function(e){var t=this
Vr(dl,(function(i,n){!function(e,t,i){if(t)for(var n=0;n<e.options.length;n++)if(hl(e.options[n].value,i)===t){e.selectedIndex=n
break}}(t.$(i.selector),e[n],i.parser)}))}
i.setDefaults=function(){var e=this
Vr(dl,(function(t){var i=t.hasOwnProperty("default")?t.default:0
e.$(t.selector).selectedIndex=i}))}
i.restoreSettings=function(){var e
try{e=JSON.parse(x.localStorage.getItem(Zu))}catch(e){Ur.warn(e)}e&&this.setValues(e)}
i.saveSettings=function(){if(this.options_.persistTextTrackSettings){var e=this.getValues()
try{Object.keys(e).length?x.localStorage.setItem(Zu,JSON.stringify(e)):x.localStorage.removeItem(Zu)}catch(e){Ur.warn(e)}}}
i.updateDisplay=function(){var e=this.player_.getChild("textTrackDisplay")
e&&e.updateDisplay()}
i.conditionalBlur_=function(){this.previouslyActiveEl_=null
var e=this.player_.controlBar,t=e&&e.subsCapsButton,i=e&&e.captionsButton
t?t.focus():i&&i.focus()}
return t}($s)
Bs.registerComponent("TextTrackSettings",pl)
var fl=function(e){B(t,e)
function t(t,i){var n,r=i.ResizeObserver||x.ResizeObserver
null===i.ResizeObserver&&(r=!1)
var a=Ds({createEl:!r,reportTouchActivity:!1},i);(n=e.call(this,t,a)||this).ResizeObserver=i.ResizeObserver||x.ResizeObserver
n.loadListener_=null
n.resizeObserver_=null
n.debouncedHandler_=function(e,t,i,n){void 0===n&&(n=x)
var r,a=function(){var a=this,s=arguments,o=function(){r=null
o=null
i||e.apply(a,s)}
!r&&i&&e.apply(a,s)
n.clearTimeout(r)
r=n.setTimeout(o,t)}
a.cancel=function(){n.clearTimeout(r)
r=null}
return a}((function(){n.resizeHandler()}),100,!1,N(n))
if(r){n.resizeObserver_=new n.ResizeObserver(n.debouncedHandler_)
n.resizeObserver_.observe(t.el())}else{n.loadListener_=function(){if(n.el_&&n.el_.contentWindow){var e=n.debouncedHandler_,t=n.unloadListener_=function(){ls(this,"resize",e)
ls(this,"unload",t)
t=null}
us(n.el_.contentWindow,"unload",t)
us(n.el_.contentWindow,"resize",e)}}
n.one("load",n.loadListener_)}return n}var i=t.prototype
i.createEl=function(){return e.prototype.createEl.call(this,"iframe",{className:"vjs-resize-manager",tabIndex:-1},{"aria-hidden":"true"})}
i.resizeHandler=function(){this.player_&&this.player_.trigger&&this.player_.trigger("playerresize")}
i.dispose=function(){this.debouncedHandler_&&this.debouncedHandler_.cancel()
if(this.resizeObserver_){this.player_.el()&&this.resizeObserver_.unobserve(this.player_.el())
this.resizeObserver_.disconnect()}this.loadListener_&&this.off("load",this.loadListener_)
this.el_&&this.el_.contentWindow&&this.unloadListener_&&this.unloadListener_.call(this.el_.contentWindow)
this.ResizeObserver=null
this.resizeObserver=null
this.debouncedHandler_=null
this.loadListener_=null
e.prototype.dispose.call(this)}
return t}(Bs)
Bs.registerComponent("ResizeManager",fl)
var ml={trackingThreshold:20,liveTolerance:15},gl=function(e){B(t,e)
function t(t,i){var n,r=Ds(ml,i,{createEl:!1});(n=e.call(this,t,r)||this).handleVisibilityChange_=function(e){return n.handleVisibilityChange(e)}
n.trackLiveHandler_=function(){return n.trackLive_()}
n.handlePlay_=function(e){return n.handlePlay(e)}
n.handleFirstTimeupdate_=function(e){return n.handleFirstTimeupdate(e)}
n.handleSeeked_=function(e){return n.handleSeeked(e)}
n.seekToLiveEdge_=function(e){return n.seekToLiveEdge(e)}
n.reset_()
n.on(n.player_,"durationchange",(function(e){return n.handleDurationchange(e)}))
n.on(n.player_,"canplay",(function(){return n.toggleTracking()}))
aa&&"hidden"in L&&"visibilityState"in L&&n.on(L,"visibilitychange",n.handleVisibilityChange_)
return n}var i=t.prototype
i.handleVisibilityChange=function(){this.player_.duration()===1/0&&(L.hidden?this.stopTracking():this.startTracking())}
i.trackLive_=function(){var e=this.player_.seekable()
if(e&&e.length){var t=Number(x.performance.now().toFixed(4)),i=-1===this.lastTime_?0:(t-this.lastTime_)/1e3
this.lastTime_=t
this.pastSeekEnd_=this.pastSeekEnd()+i
var n=this.liveCurrentTime(),r=this.player_.currentTime(),a=this.player_.paused()||this.seekedBehindLive_||Math.abs(n-r)>this.options_.liveTolerance
this.timeupdateSeen_&&n!==1/0||(a=!1)
if(a!==this.behindLiveEdge_){this.behindLiveEdge_=a
this.trigger("liveedgechange")}}}
i.handleDurationchange=function(){this.toggleTracking()}
i.toggleTracking=function(){if(this.player_.duration()===1/0&&this.liveWindow()>=this.options_.trackingThreshold){this.player_.options_.liveui&&this.player_.addClass("vjs-liveui")
this.startTracking()}else{this.player_.removeClass("vjs-liveui")
this.stopTracking()}}
i.startTracking=function(){if(!this.isTracking()){this.timeupdateSeen_||(this.timeupdateSeen_=this.player_.hasStarted())
this.trackingInterval_=this.setInterval(this.trackLiveHandler_,ms)
this.trackLive_()
this.on(this.player_,["play","pause"],this.trackLiveHandler_)
if(this.timeupdateSeen_)this.on(this.player_,"seeked",this.handleSeeked_)
else{this.one(this.player_,"play",this.handlePlay_)
this.one(this.player_,"timeupdate",this.handleFirstTimeupdate_)}}}
i.handleFirstTimeupdate=function(){this.timeupdateSeen_=!0
this.on(this.player_,"seeked",this.handleSeeked_)}
i.handleSeeked=function(){var e=Math.abs(this.liveCurrentTime()-this.player_.currentTime())
this.seekedBehindLive_=this.nextSeekedFromUser_&&e>2
this.nextSeekedFromUser_=!1
this.trackLive_()}
i.handlePlay=function(){this.one(this.player_,"timeupdate",this.seekToLiveEdge_)}
i.reset_=function(){this.lastTime_=-1
this.pastSeekEnd_=0
this.lastSeekEnd_=-1
this.behindLiveEdge_=!0
this.timeupdateSeen_=!1
this.seekedBehindLive_=!1
this.nextSeekedFromUser_=!1
this.clearInterval(this.trackingInterval_)
this.trackingInterval_=null
this.off(this.player_,["play","pause"],this.trackLiveHandler_)
this.off(this.player_,"seeked",this.handleSeeked_)
this.off(this.player_,"play",this.handlePlay_)
this.off(this.player_,"timeupdate",this.handleFirstTimeupdate_)
this.off(this.player_,"timeupdate",this.seekToLiveEdge_)}
i.nextSeekedFromUser=function(){this.nextSeekedFromUser_=!0}
i.stopTracking=function(){if(this.isTracking()){this.reset_()
this.trigger("liveedgechange")}}
i.seekableEnd=function(){for(var e=this.player_.seekable(),t=[],i=e?e.length:0;i--;)t.push(e.end(i))
return t.length?t.sort()[t.length-1]:1/0}
i.seekableStart=function(){for(var e=this.player_.seekable(),t=[],i=e?e.length:0;i--;)t.push(e.start(i))
return t.length?t.sort()[0]:0}
i.liveWindow=function(){var e=this.liveCurrentTime()
return e===1/0?0:e-this.seekableStart()}
i.isLive=function(){return this.isTracking()}
i.atLiveEdge=function(){return!this.behindLiveEdge()}
i.liveCurrentTime=function(){return this.pastSeekEnd()+this.seekableEnd()}
i.pastSeekEnd=function(){var e=this.seekableEnd();-1!==this.lastSeekEnd_&&e!==this.lastSeekEnd_&&(this.pastSeekEnd_=0)
this.lastSeekEnd_=e
return this.pastSeekEnd_}
i.behindLiveEdge=function(){return this.behindLiveEdge_}
i.isTracking=function(){return"number"==typeof this.trackingInterval_}
i.seekToLiveEdge=function(){this.seekedBehindLive_=!1
if(!this.atLiveEdge()){this.nextSeekedFromUser_=!1
this.player_.currentTime(this.liveCurrentTime())}}
i.dispose=function(){this.off(L,"visibilitychange",this.handleVisibilityChange_)
this.stopTracking()
e.prototype.dispose.call(this)}
return t}(Bs)
Bs.registerComponent("LiveTracker",gl)
var vl,yl=function(e){var t=e.el()
if(t.hasAttribute("src")){e.triggerSourceset(t.src)
return!0}var i=e.$$("source"),n=[],r=""
if(!i.length)return!1
for(var a=0;a<i.length;a++){var s=i[a].src
s&&-1===n.indexOf(s)&&n.push(s)}if(!n.length)return!1
1===n.length&&(r=n[0])
e.triggerSourceset(r)
return!0},_l=Object.defineProperty({},"innerHTML",{get:function(){return this.cloneNode(!0).innerHTML},set:function(e){var t=L.createElement(this.nodeName.toLowerCase())
t.innerHTML=e
for(var i=L.createDocumentFragment();t.childNodes.length;)i.appendChild(t.childNodes[0])
this.innerText=""
x.Element.prototype.appendChild.call(this,i)
return this.innerHTML}}),bl=function(e,t){for(var i={},n=0;n<e.length&&!((i=Object.getOwnPropertyDescriptor(e[n],t))&&i.set&&i.get);n++);i.enumerable=!0
i.configurable=!0
return i},Tl=function(e){var t=e.el()
if(!t.resetSourceWatch_){var i={},n=function(e){return bl([e.el(),x.HTMLMediaElement.prototype,x.Element.prototype,_l],"innerHTML")}(e),r=function(i){return function(){for(var n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a]
var s=i.apply(t,r)
yl(e)
return s}};["append","appendChild","insertAdjacentHTML"].forEach((function(e){if(t[e]){i[e]=t[e]
t[e]=r(i[e])}}))
Object.defineProperty(t,"innerHTML",Ds(n,{set:r(n.set)}))
t.resetSourceWatch_=function(){t.resetSourceWatch_=null
Object.keys(i).forEach((function(e){t[e]=i[e]}))
Object.defineProperty(t,"innerHTML",n)}
e.one("sourceset",t.resetSourceWatch_)}},Sl=Object.defineProperty({},"src",{get:function(){return this.hasAttribute("src")?fo(x.Element.prototype.getAttribute.call(this,"src")):""},set:function(e){x.Element.prototype.setAttribute.call(this,"src",e)
return e}}),kl=function(e){if(e.featuresSourceset){var t=e.el()
if(!t.resetSourceset_){var i=function(e){return bl([e.el(),x.HTMLMediaElement.prototype,Sl],"src")}(e),n=t.setAttribute,r=t.load
Object.defineProperty(t,"src",Ds(i,{set:function(n){var r=i.set.call(t,n)
e.triggerSourceset(t.src)
return r}}))
t.setAttribute=function(i,r){var a=n.call(t,i,r);/src/i.test(i)&&e.triggerSourceset(t.src)
return a}
t.load=function(){var i=r.call(t)
if(!yl(e)){e.triggerSourceset("")
Tl(e)}return i}
t.currentSrc?e.triggerSourceset(t.currentSrc):yl(e)||Tl(e)
t.resetSourceset_=function(){t.resetSourceset_=null
t.load=r
t.setAttribute=n
Object.defineProperty(t,"src",i)
t.resetSourceWatch_&&t.resetSourceWatch_()}}}},El=function(e,t,i,n){void 0===n&&(n=!0)
var r=function(i){return Object.defineProperty(e,t,{value:i,enumerable:!0,writable:!0})},a={configurable:!0,enumerable:!0,get:function(){var e=i()
r(e)
return e}}
n&&(a.set=r)
return Object.defineProperty(e,t,a)},Cl=function(e){B(t,e)
function t(t,i){var n
n=e.call(this,t,i)||this
var r=t.source,a=!1
r&&(n.el_.currentSrc!==r.src||t.tag&&3===t.tag.initNetworkState_)?n.setSource(r):n.handleLateInit_(n.el_)
t.enableSourceset&&n.setupSourcesetHandling_()
n.isScrubbing_=!1
if(n.el_.hasChildNodes()){for(var s=n.el_.childNodes,o=s.length,u=[];o--;){var l=s[o]
if("track"===l.nodeName.toLowerCase())if(n.featuresNativeTextTracks){n.remoteTextTrackEls().addTrackElement_(l)
n.remoteTextTracks().addTrack(l.track)
n.textTracks().addTrack(l.track)
a||n.el_.hasAttribute("crossorigin")||!go(l.src)||(a=!0)}else u.push(l)}for(var c=0;c<u.length;c++)n.el_.removeChild(u[c])}n.proxyNativeTracks_()
n.featuresNativeTextTracks&&a&&Ur.warn("Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\nThis may prevent text tracks from loading.")
n.restoreMetadataTracksInIOSNativePlayer_();(ua||ca||ea)&&!0===t.nativeControlsForTouch&&n.setControls(!0)
n.proxyWebkitFullscreen_()
n.triggerReady()
return n}var i=t.prototype
i.dispose=function(){this.el_&&this.el_.resetSourceset_&&this.el_.resetSourceset_()
t.disposeMediaElement(this.el_)
this.options_=null
e.prototype.dispose.call(this)}
i.setupSourcesetHandling_=function(){kl(this)}
i.restoreMetadataTracksInIOSNativePlayer_=function(){var e,t=this.textTracks(),i=function(){e=[]
for(var i=0;i<t.length;i++){var n=t[i]
"metadata"===n.kind&&e.push({track:n,storedMode:n.mode})}}
i()
t.addEventListener("change",i)
this.on("dispose",(function(){return t.removeEventListener("change",i)}))
var n=function i(){for(var n=0;n<e.length;n++){var r=e[n]
"disabled"===r.track.mode&&r.track.mode!==r.storedMode&&(r.track.mode=r.storedMode)}t.removeEventListener("change",i)}
this.on("webkitbeginfullscreen",(function(){t.removeEventListener("change",i)
t.removeEventListener("change",n)
t.addEventListener("change",n)}))
this.on("webkitendfullscreen",(function(){t.removeEventListener("change",i)
t.addEventListener("change",i)
t.removeEventListener("change",n)}))}
i.overrideNative_=function(e,t){var i=this
if(t===this["featuresNative"+e+"Tracks"]){var n=e.toLowerCase()
this[n+"TracksListeners_"]&&Object.keys(this[n+"TracksListeners_"]).forEach((function(e){i.el()[n+"Tracks"].removeEventListener(e,i[n+"TracksListeners_"][e])}))
this["featuresNative"+e+"Tracks"]=!t
this[n+"TracksListeners_"]=null
this.proxyNativeTracksForType_(n)}}
i.overrideNativeAudioTracks=function(e){this.overrideNative_("Audio",e)}
i.overrideNativeVideoTracks=function(e){this.overrideNative_("Video",e)}
i.proxyNativeTracksForType_=function(e){var t=this,i=Eo[e],n=this.el()[i.getterName],r=this[i.getterName]()
if(this["featuresNative"+i.capitalName+"Tracks"]&&n&&n.addEventListener){var a={change:function(i){var n={type:"change",target:r,currentTarget:r,srcElement:r}
r.trigger(n)
"text"===e&&t[Co.remoteText.getterName]().trigger(n)},addtrack:function(e){r.addTrack(e.track)},removetrack:function(e){r.removeTrack(e.track)}},s=function(){for(var e=[],t=0;t<r.length;t++){for(var i=!1,a=0;a<n.length;a++)if(n[a]===r[t]){i=!0
break}i||e.push(r[t])}for(;e.length;)r.removeTrack(e.shift())}
this[i.getterName+"Listeners_"]=a
Object.keys(a).forEach((function(e){var i=a[e]
n.addEventListener(e,i)
t.on("dispose",(function(t){return n.removeEventListener(e,i)}))}))
this.on("loadstart",s)
this.on("dispose",(function(e){return t.off("loadstart",s)}))}}
i.proxyNativeTracks_=function(){var e=this
Eo.names.forEach((function(t){e.proxyNativeTracksForType_(t)}))}
i.createEl=function(){var e=this.options_.tag
if(!e||!this.options_.playerElIngest&&!this.movingMediaElementInDOM){if(e){var i=e.cloneNode(!0)
e.parentNode&&e.parentNode.insertBefore(i,e)
t.disposeMediaElement(e)
e=i}else{e=L.createElement("video")
var n=Ds({},this.options_.tag&&Pa(this.options_.tag))
ua&&!0===this.options_.nativeControlsForTouch||delete n.controls
Ia(e,Hr(n,{id:this.options_.techId,class:"vjs-tech"}))}e.playerId=this.options_.playerId}void 0!==this.options_.preload&&Aa(e,"preload",this.options_.preload)
void 0!==this.options_.disablePictureInPicture&&(e.disablePictureInPicture=this.options_.disablePictureInPicture)
for(var r=["loop","muted","playsinline","autoplay"],a=0;a<r.length;a++){var s=r[a],o=this.options_[s]
if(void 0!==o){o?Aa(e,s,s):Oa(e,s)
e[s]=o}}return e}
i.handleLateInit_=function(e){if(0!==e.networkState&&3!==e.networkState)if(0!==e.readyState){var t=["loadstart"]
t.push("loadedmetadata")
e.readyState>=2&&t.push("loadeddata")
e.readyState>=3&&t.push("canplay")
e.readyState>=4&&t.push("canplaythrough")
this.ready((function(){t.forEach((function(e){this.trigger(e)}),this)}))}else{var i=!1,n=function(){i=!0}
this.on("loadstart",n)
var r=function(){i||this.trigger("loadstart")}
this.on("loadedmetadata",r)
this.ready((function(){this.off("loadstart",n)
this.off("loadedmetadata",r)
i||this.trigger("loadstart")}))}}
i.setScrubbing=function(e){this.isScrubbing_=e}
i.scrubbing=function(){return this.isScrubbing_}
i.setCurrentTime=function(e){try{this.isScrubbing_&&this.el_.fastSeek&&ha?this.el_.fastSeek(e):this.el_.currentTime=e}catch(e){Ur(e,"Video is not ready. (Video.js)")}}
i.duration=function(){var e=this
if(this.el_.duration===1/0&&Jr&&na&&0===this.el_.currentTime){this.on("timeupdate",(function t(){if(e.el_.currentTime>0){e.el_.duration===1/0&&e.trigger("durationchange")
e.off("timeupdate",t)}}))
return NaN}return this.el_.duration||NaN}
i.width=function(){return this.el_.offsetWidth}
i.height=function(){return this.el_.offsetHeight}
i.proxyWebkitFullscreen_=function(){var e=this
if("webkitDisplayingFullscreen"in this.el_){var t=function(){this.trigger("fullscreenchange",{isFullscreen:!1})
this.el_.controls&&!this.options_.nativeControlsForTouch&&this.controls()&&(this.el_.controls=!1)},i=function(){if("webkitPresentationMode"in this.el_&&"picture-in-picture"!==this.el_.webkitPresentationMode){this.one("webkitendfullscreen",t)
this.trigger("fullscreenchange",{isFullscreen:!0,nativeIOSFullscreen:!0})}}
this.on("webkitbeginfullscreen",i)
this.on("dispose",(function(){e.off("webkitbeginfullscreen",i)
e.off("webkitendfullscreen",t)}))}}
i.supportsFullScreen=function(){if("function"==typeof this.el_.webkitEnterFullScreen){var e=x.navigator&&x.navigator.userAgent||""
if(/Android/.test(e)||!/Chrome|Mac OS X 10.5/.test(e))return!0}return!1}
i.enterFullScreen=function(){var e=this.el_
if(e.paused&&e.networkState<=e.HAVE_METADATA){zs(this.el_.play())
this.setTimeout((function(){e.pause()
try{e.webkitEnterFullScreen()}catch(e){this.trigger("fullscreenerror",e)}}),0)}else try{e.webkitEnterFullScreen()}catch(e){this.trigger("fullscreenerror",e)}}
i.exitFullScreen=function(){this.el_.webkitDisplayingFullscreen?this.el_.webkitExitFullScreen():this.trigger("fullscreenerror",new Error("The video is not fullscreen"))}
i.requestPictureInPicture=function(){return this.el_.requestPictureInPicture()}
i.requestVideoFrameCallback=function(t){return this.featuresVideoFrameCallback?this.el_.requestVideoFrameCallback(t):e.prototype.requestVideoFrameCallback.call(this,t)}
i.cancelVideoFrameCallback=function(t){this.featuresVideoFrameCallback?this.el_.cancelVideoFrameCallback(t):e.prototype.cancelVideoFrameCallback.call(this,t)}
i.src=function(e){if(void 0===e)return this.el_.src
this.setSrc(e)}
i.reset=function(){t.resetMediaElement(this.el_)}
i.currentSrc=function(){return this.currentSource_?this.currentSource_.src:this.el_.currentSrc}
i.setControls=function(e){this.el_.controls=!!e}
i.addTextTrack=function(t,i,n){return this.featuresNativeTextTracks?this.el_.addTextTrack(t,i,n):e.prototype.addTextTrack.call(this,t,i,n)}
i.createRemoteTextTrack=function(t){if(!this.featuresNativeTextTracks)return e.prototype.createRemoteTextTrack.call(this,t)
var i=L.createElement("track")
t.kind&&(i.kind=t.kind)
t.label&&(i.label=t.label);(t.language||t.srclang)&&(i.srclang=t.language||t.srclang)
t.default&&(i.default=t.default)
t.id&&(i.id=t.id)
t.src&&(i.src=t.src)
return i}
i.addRemoteTextTrack=function(t,i){var n=e.prototype.addRemoteTextTrack.call(this,t,i)
this.featuresNativeTextTracks&&this.el().appendChild(n)
return n}
i.removeRemoteTextTrack=function(t){e.prototype.removeRemoteTextTrack.call(this,t)
if(this.featuresNativeTextTracks)for(var i=this.$$("track"),n=i.length;n--;)t!==i[n]&&t!==i[n].track||this.el().removeChild(i[n])}
i.getVideoPlaybackQuality=function(){if("function"==typeof this.el().getVideoPlaybackQuality)return this.el().getVideoPlaybackQuality()
var e={}
if(void 0!==this.el().webkitDroppedFrameCount&&void 0!==this.el().webkitDecodedFrameCount){e.droppedVideoFrames=this.el().webkitDroppedFrameCount
e.totalVideoFrames=this.el().webkitDecodedFrameCount}x.performance&&"function"==typeof x.performance.now?e.creationTime=x.performance.now():x.performance&&x.performance.timing&&"number"==typeof x.performance.timing.navigationStart&&(e.creationTime=x.Date.now()-x.performance.timing.navigationStart)
return e}
return t}(Io)
El(Cl,"TEST_VID",(function(){if(ga()){var e=L.createElement("video"),t=L.createElement("track")
t.kind="captions"
t.srclang="en"
t.label="English"
e.appendChild(t)
return e}}))
Cl.isSupported=function(){try{Cl.TEST_VID.volume=.5}catch(e){return!1}return!(!Cl.TEST_VID||!Cl.TEST_VID.canPlayType)}
Cl.canPlayType=function(e){return Cl.TEST_VID.canPlayType(e)}
Cl.canPlaySource=function(e,t){return Cl.canPlayType(e.type)}
Cl.canControlVolume=function(){try{var e=Cl.TEST_VID.volume
Cl.TEST_VID.volume=e/2+.1
var t=e!==Cl.TEST_VID.volume
if(t&&da){x.setTimeout((function(){Cl&&Cl.prototype&&(Cl.prototype.featuresVolumeControl=e!==Cl.TEST_VID.volume)}))
return!1}return t}catch(e){return!1}}
Cl.canMuteVolume=function(){try{var e=Cl.TEST_VID.muted
Cl.TEST_VID.muted=!e
Cl.TEST_VID.muted?Aa(Cl.TEST_VID,"muted","muted"):Oa(Cl.TEST_VID,"muted")
return e!==Cl.TEST_VID.muted}catch(e){return!1}}
Cl.canControlPlaybackRate=function(){if(Jr&&na&&ra<58)return!1
try{var e=Cl.TEST_VID.playbackRate
Cl.TEST_VID.playbackRate=e/2+.1
return e!==Cl.TEST_VID.playbackRate}catch(e){return!1}}
Cl.canOverrideAttributes=function(){try{var e=function(){}
Object.defineProperty(L.createElement("video"),"src",{get:e,set:e})
Object.defineProperty(L.createElement("audio"),"src",{get:e,set:e})
Object.defineProperty(L.createElement("video"),"innerHTML",{get:e,set:e})
Object.defineProperty(L.createElement("audio"),"innerHTML",{get:e,set:e})}catch(e){return!1}return!0}
Cl.supportsNativeTextTracks=function(){return ha||da&&na}
Cl.supportsNativeVideoTracks=function(){return!(!Cl.TEST_VID||!Cl.TEST_VID.videoTracks)}
Cl.supportsNativeAudioTracks=function(){return!(!Cl.TEST_VID||!Cl.TEST_VID.audioTracks)}
Cl.Events=["loadstart","suspend","abort","error","emptied","stalled","loadedmetadata","loadeddata","canplay","canplaythrough","playing","waiting","seeking","seeked","ended","durationchange","timeupdate","progress","play","pause","ratechange","resize","volumechange"];[["featuresMuteControl","canMuteVolume"],["featuresPlaybackRate","canControlPlaybackRate"],["featuresSourceset","canOverrideAttributes"],["featuresNativeTextTracks","supportsNativeTextTracks"],["featuresNativeVideoTracks","supportsNativeVideoTracks"],["featuresNativeAudioTracks","supportsNativeAudioTracks"]].forEach((function(e){var t=e[0],i=e[1]
El(Cl.prototype,t,(function(){return Cl[i]()}),!0)}))
Cl.prototype.featuresVolumeControl=Cl.canControlVolume()
Cl.prototype.movingMediaElementInDOM=!da
Cl.prototype.featuresFullscreenResize=!0
Cl.prototype.featuresProgressEvents=!0
Cl.prototype.featuresTimeupdateEvents=!0
Cl.prototype.featuresVideoFrameCallback=!(!Cl.TEST_VID||!Cl.TEST_VID.requestVideoFrameCallback)
Cl.patchCanPlayType=function(){if(Zr>=4&&!ta&&!na){vl=Cl.TEST_VID&&Cl.TEST_VID.constructor.prototype.canPlayType
Cl.TEST_VID.constructor.prototype.canPlayType=function(e){return e&&/^application\/(?:x-|vnd\.apple\.)mpegurl/i.test(e)?"maybe":vl.call(this,e)}}}
Cl.unpatchCanPlayType=function(){var e=Cl.TEST_VID.constructor.prototype.canPlayType
vl&&(Cl.TEST_VID.constructor.prototype.canPlayType=vl)
return e}
Cl.patchCanPlayType()
Cl.disposeMediaElement=function(e){if(e){e.parentNode&&e.parentNode.removeChild(e)
for(;e.hasChildNodes();)e.removeChild(e.firstChild)
e.removeAttribute("src")
"function"==typeof e.load&&function(){try{e.load()}catch(e){}}()}}
Cl.resetMediaElement=function(e){if(e){for(var t=e.querySelectorAll("source"),i=t.length;i--;)e.removeChild(t[i])
e.removeAttribute("src")
"function"==typeof e.load&&function(){try{e.load()}catch(e){}}()}};["muted","defaultMuted","autoplay","controls","loop","playsinline"].forEach((function(e){Cl.prototype[e]=function(){return this.el_[e]||this.el_.hasAttribute(e)}}));["muted","defaultMuted","autoplay","loop","playsinline"].forEach((function(e){Cl.prototype["set"+Ls(e)]=function(t){this.el_[e]=t
t?this.el_.setAttribute(e,e):this.el_.removeAttribute(e)}}));["paused","currentTime","buffered","volume","poster","preload","error","seeking","seekable","ended","playbackRate","defaultPlaybackRate","disablePictureInPicture","played","networkState","readyState","videoWidth","videoHeight","crossOrigin"].forEach((function(e){Cl.prototype[e]=function(){return this.el_[e]}}));["volume","src","poster","preload","playbackRate","defaultPlaybackRate","disablePictureInPicture","crossOrigin"].forEach((function(e){Cl.prototype["set"+Ls(e)]=function(t){this.el_[e]=t}}));["pause","load","play"].forEach((function(e){Cl.prototype[e]=function(){return this.el_[e]()}}))
Io.withSourceHandlers(Cl)
Cl.nativeSourceHandler={}
Cl.nativeSourceHandler.canPlayType=function(e){try{return Cl.TEST_VID.canPlayType(e)}catch(e){return""}}
Cl.nativeSourceHandler.canHandleSource=function(e,t){if(e.type)return Cl.nativeSourceHandler.canPlayType(e.type)
if(e.src){var i=mo(e.src)
return Cl.nativeSourceHandler.canPlayType("video/"+i)}return""}
Cl.nativeSourceHandler.handleSource=function(e,t,i){t.setSrc(e.src)}
Cl.nativeSourceHandler.dispose=function(){}
Cl.registerSourceHandler(Cl.nativeSourceHandler)
Io.registerTech("Html5",Cl)
var wl=["progress","abort","suspend","emptied","stalled","loadedmetadata","loadeddata","timeupdate","resize","volumechange","texttrackchange"],Il={canplay:"CanPlay",canplaythrough:"CanPlayThrough",playing:"Playing",seeked:"Seeked"},Pl=["tiny","xsmall","small","medium","large","xlarge","huge"],xl={}
Pl.forEach((function(e){var t="x"===e.charAt(0)?"x-"+e.substring(1):e
xl[e]="vjs-layout-"+t}))
var Al={tiny:210,xsmall:320,small:425,medium:768,large:1440,xlarge:2560,huge:1/0},Ol=function(e){B(t,e)
function t(i,n,r){var a
i.id=i.id||n.id||"vjs_video_"+ts();(n=Hr(t.getTagSettings(i),n)).initChildren=!1
n.createEl=!1
n.evented=!1
n.reportTouchActivity=!1
if(!n.language)if("function"==typeof i.closest){var s=i.closest("[lang]")
s&&s.getAttribute&&(n.language=s.getAttribute("lang"))}else for(var o=i;o&&1===o.nodeType;){if(Pa(o).hasOwnProperty("lang")){n.language=o.getAttribute("lang")
break}o=o.parentNode}(a=e.call(this,null,n,r)||this).boundDocumentFullscreenChange_=function(e){return a.documentFullscreenChange_(e)}
a.boundFullWindowOnEscKey_=function(e){return a.fullWindowOnEscKey(e)}
a.boundUpdateStyleEl_=function(e){return a.updateStyleEl_(e)}
a.boundApplyInitTime_=function(e){return a.applyInitTime_(e)}
a.boundUpdateCurrentBreakpoint_=function(e){return a.updateCurrentBreakpoint_(e)}
a.boundHandleTechClick_=function(e){return a.handleTechClick_(e)}
a.boundHandleTechDoubleClick_=function(e){return a.handleTechDoubleClick_(e)}
a.boundHandleTechTouchStart_=function(e){return a.handleTechTouchStart_(e)}
a.boundHandleTechTouchMove_=function(e){return a.handleTechTouchMove_(e)}
a.boundHandleTechTouchEnd_=function(e){return a.handleTechTouchEnd_(e)}
a.boundHandleTechTap_=function(e){return a.handleTechTap_(e)}
a.isFullscreen_=!1
a.log=Br(a.id_)
a.fsApi_=Or
a.isPosterFromTech_=!1
a.queuedCallbacks_=[]
a.isReady_=!1
a.hasStarted_=!1
a.userActive_=!1
a.debugEnabled_=!1
a.audioOnlyMode_=!1
a.audioPosterMode_=!1
a.audioOnlyCache_={playerHeight:null,hiddenChildren:[]}
if(!a.options_||!a.options_.techOrder||!a.options_.techOrder.length)throw new Error("No techOrder specified. Did you overwrite videojs.options instead of just changing the properties you want to override?")
a.tag=i
a.tagAttributes=i&&Pa(i)
a.language(a.options_.language)
if(n.languages){var u={}
Object.getOwnPropertyNames(n.languages).forEach((function(e){u[e.toLowerCase()]=n.languages[e]}))
a.languages_=u}else a.languages_=t.prototype.options_.languages
a.resetCache_()
a.poster_=n.poster||""
a.controls_=!!n.controls
i.controls=!1
i.removeAttribute("controls")
a.changingSrc_=!1
a.playCallbacks_=[]
a.playTerminatedQueue_=[]
i.hasAttribute("autoplay")?a.autoplay(!0):a.autoplay(a.options_.autoplay)
n.plugins&&Object.keys(n.plugins).forEach((function(e){if("function"!=typeof a[e])throw new Error('plugin "'+e+'" does not exist')}))
a.scrubbing_=!1
a.el_=a.createEl()
Ps(N(a),{eventBusKey:"el_"})
if(a.fsApi_.requestFullscreen){us(L,a.fsApi_.fullscreenchange,a.boundDocumentFullscreenChange_)
a.on(a.fsApi_.fullscreenchange,a.boundDocumentFullscreenChange_)}a.fluid_&&a.on(["playerreset","resize"],a.boundUpdateStyleEl_)
var l=Ds(a.options_)
n.plugins&&Object.keys(n.plugins).forEach((function(e){a[e](n.plugins[e])}))
n.debug&&a.debug(!0)
a.options_.playerOptions=l
a.middleware_=[]
a.playbackRates(n.playbackRates)
a.initChildren()
a.isAudio("audio"===i.nodeName.toLowerCase())
a.controls()?a.addClass("vjs-controls-enabled"):a.addClass("vjs-controls-disabled")
a.el_.setAttribute("role","region")
a.isAudio()?a.el_.setAttribute("aria-label",a.localize("Audio Player")):a.el_.setAttribute("aria-label",a.localize("Video Player"))
a.isAudio()&&a.addClass("vjs-audio")
a.flexNotSupported_()&&a.addClass("vjs-no-flex")
ua&&a.addClass("vjs-touch-enabled")
da||a.addClass("vjs-workinghover")
t.players[a.id_]=N(a)
var c=Ir.split(".")[0]
a.addClass("vjs-v"+c)
a.userActive(!0)
a.reportUserActivity()
a.one("play",(function(e){return a.listenForUserActivity_(e)}))
a.on("stageclick",(function(e){return a.handleStageClick_(e)}))
a.on("keydown",(function(e){return a.handleKeyDown(e)}))
a.on("languagechange",(function(e){return a.handleLanguagechange(e)}))
a.breakpoints(a.options_.breakpoints)
a.responsive(a.options_.responsive)
a.on("ready",(function(){a.audioPosterMode(a.options_.audioPosterMode)
a.audioOnlyMode(a.options_.audioOnlyMode)}))
return a}var i=t.prototype
i.dispose=function(){var i=this
this.trigger("dispose")
this.off("dispose")
ls(L,this.fsApi_.fullscreenchange,this.boundDocumentFullscreenChange_)
ls(L,"keydown",this.boundFullWindowOnEscKey_)
if(this.styleEl_&&this.styleEl_.parentNode){this.styleEl_.parentNode.removeChild(this.styleEl_)
this.styleEl_=null}t.players[this.id_]=null
this.tag&&this.tag.player&&(this.tag.player=null)
this.el_&&this.el_.player&&(this.el_.player=null)
if(this.tech_){this.tech_.dispose()
this.isPosterFromTech_=!1
this.poster_=""}this.playerElIngest_&&(this.playerElIngest_=null)
this.tag&&(this.tag=null)
xo[this.id()]=null
wo.names.forEach((function(e){var t=wo[e],n=i[t.getterName]()
n&&n.off&&n.off()}))
e.prototype.dispose.call(this)}
i.createEl=function(){var t,i=this.tag,n=this.playerElIngest_=i.parentNode&&i.parentNode.hasAttribute&&i.parentNode.hasAttribute("data-vjs-player"),r="video-js"===this.tag.tagName.toLowerCase()
n?t=this.el_=i.parentNode:r||(t=this.el_=e.prototype.createEl.call(this,"div"))
var a=Pa(i)
if(r){t=this.el_=i
i=this.tag=L.createElement("video")
for(;t.children.length;)i.appendChild(t.firstChild)
ka(t,"video-js")||Ea(t,"video-js")
t.appendChild(i)
n=this.playerElIngest_=t
Object.keys(t).forEach((function(e){try{i[e]=t[e]}catch(e){}}))}i.setAttribute("tabindex","-1")
a.tabindex="-1"
if(aa||na&&oa){i.setAttribute("role","application")
a.role="application"}i.removeAttribute("width")
i.removeAttribute("height")
"width"in a&&delete a.width
"height"in a&&delete a.height
Object.getOwnPropertyNames(a).forEach((function(e){r&&"class"===e||t.setAttribute(e,a[e])
r&&i.setAttribute(e,a[e])}))
i.playerId=i.id
i.id+="_html5_api"
i.className="vjs-tech"
i.player=t.player=this
this.addClass("vjs-paused")
if(!0!==x.VIDEOJS_NO_DYNAMIC_STYLE){this.styleEl_=Ja("vjs-styles-dimensions")
var s=Wa(".vjs-styles-defaults"),o=Wa("head")
o.insertBefore(this.styleEl_,s?s.nextSibling:o.firstChild)}this.fill_=!1
this.fluid_=!1
this.width(this.options_.width)
this.height(this.options_.height)
this.fill(this.options_.fill)
this.fluid(this.options_.fluid)
this.aspectRatio(this.options_.aspectRatio)
this.crossOrigin(this.options_.crossOrigin||this.options_.crossorigin)
for(var u=i.getElementsByTagName("a"),l=0;l<u.length;l++){var c=u.item(l)
Ea(c,"vjs-hidden")
c.setAttribute("hidden","hidden")}i.initNetworkState_=i.networkState
i.parentNode&&!n&&i.parentNode.insertBefore(t,i)
Sa(i,t)
this.children_.unshift(i)
this.el_.setAttribute("lang",this.language_)
this.el_.setAttribute("translate","no")
this.el_=t
return t}
i.crossOrigin=function(e){if(!e)return this.techGet_("crossOrigin")
"anonymous"===e||"use-credentials"===e?this.techCall_("setCrossOrigin",e):Ur.warn('crossOrigin must be "anonymous" or "use-credentials", given "'+e+'"')}
i.width=function(e){return this.dimension("width",e)}
i.height=function(e){return this.dimension("height",e)}
i.dimension=function(e,t){var i=e+"_"
if(void 0===t)return this[i]||0
if(""!==t&&"auto"!==t){var n=parseFloat(t)
if(isNaN(n))Ur.error('Improper value "'+t+'" supplied for for '+e)
else{this[i]=n
this.updateStyleEl_()}}else{this[i]=void 0
this.updateStyleEl_()}}
i.fluid=function(e){var t=this
if(void 0===e)return!!this.fluid_
this.fluid_=!!e
bs(this)&&this.off(["playerreset","resize"],this.boundUpdateStyleEl_)
if(e){this.addClass("vjs-fluid")
this.fill(!1)
!function(e,t){if(bs(e))t()
else{e.eventedCallbacks||(e.eventedCallbacks=[])
e.eventedCallbacks.push(t)}}(this,(function(){t.on(["playerreset","resize"],t.boundUpdateStyleEl_)}))}else this.removeClass("vjs-fluid")
this.updateStyleEl_()}
i.fill=function(e){if(void 0===e)return!!this.fill_
this.fill_=!!e
if(e){this.addClass("vjs-fill")
this.fluid(!1)}else this.removeClass("vjs-fill")}
i.aspectRatio=function(e){if(void 0===e)return this.aspectRatio_
if(!/^\d+\:\d+$/.test(e))throw new Error("Improper value supplied for aspect ratio. The format should be width:height, for example 16:9.")
this.aspectRatio_=e
this.fluid(!0)
this.updateStyleEl_()}
i.updateStyleEl_=function(){if(!0!==x.VIDEOJS_NO_DYNAMIC_STYLE){var e,t,i,n=(void 0!==this.aspectRatio_&&"auto"!==this.aspectRatio_?this.aspectRatio_:this.videoWidth()>0?this.videoWidth()+":"+this.videoHeight():"16:9").split(":"),r=n[1]/n[0]
e=void 0!==this.width_?this.width_:void 0!==this.height_?this.height_/r:this.videoWidth()||300
t=void 0!==this.height_?this.height_:e*r
i=/^[^a-zA-Z]/.test(this.id())?"dimensions-"+this.id():this.id()+"-dimensions"
this.addClass(i)
Za(this.styleEl_,"\n      ."+i+" {\n        width: "+e+"px;\n        height: "+t+"px;\n      }\n\n      ."+i+".vjs-fluid {\n        padding-top: "+100*r+"%;\n      }\n    ")}else{var a="number"==typeof this.width_?this.width_:this.options_.width,s="number"==typeof this.height_?this.height_:this.options_.height,o=this.tech_&&this.tech_.el()
if(o){a>=0&&(o.width=a)
s>=0&&(o.height=s)}}}
i.loadTech_=function(e,t){var i=this
this.tech_&&this.unloadTech_()
var n=Ls(e),r=e.charAt(0).toLowerCase()+e.slice(1)
if("Html5"!==n&&this.tag){Io.getTech("Html5").disposeMediaElement(this.tag)
this.tag.player=null
this.tag=null}this.techName_=n
this.isReady_=!1
var a=this.autoplay();("string"==typeof this.autoplay()||!0===this.autoplay()&&this.options_.normalizeAutoplay)&&(a=!1)
var s={source:t,autoplay:a,nativeControlsForTouch:this.options_.nativeControlsForTouch,playerId:this.id(),techId:this.id()+"_"+r+"_api",playsinline:this.options_.playsinline,preload:this.options_.preload,loop:this.options_.loop,disablePictureInPicture:this.options_.disablePictureInPicture,muted:this.options_.muted,poster:this.poster(),language:this.language(),playerElIngest:this.playerElIngest_||!1,"vtt.js":this.options_["vtt.js"],canOverridePoster:!!this.options_.techCanOverridePoster,enableSourceset:this.options_.enableSourceset,Promise:this.options_.Promise}
wo.names.forEach((function(e){var t=wo[e]
s[t.getterName]=i[t.privateName]}))
Hr(s,this.options_[n])
Hr(s,this.options_[r])
Hr(s,this.options_[e.toLowerCase()])
this.tag&&(s.tag=this.tag)
t&&t.src===this.cache_.src&&this.cache_.currentTime>0&&(s.startTime=this.cache_.currentTime)
var o=Io.getTech(e)
if(!o)throw new Error("No Tech named '"+n+"' exists! '"+n+"' should be registered using videojs.registerTech()'")
this.tech_=new o(s)
this.tech_.ready(gs(this,this.handleTechReady_),!0)
Ys(this.textTracksJson_||[],this.tech_)
wl.forEach((function(e){i.on(i.tech_,e,(function(t){return i["handleTech"+Ls(e)+"_"](t)}))}))
Object.keys(Il).forEach((function(e){i.on(i.tech_,e,(function(t){0===i.tech_.playbackRate()&&i.tech_.seeking()?i.queuedCallbacks_.push({callback:i["handleTech"+Il[e]+"_"].bind(i),event:t}):i["handleTech"+Il[e]+"_"](t)}))}))
this.on(this.tech_,"loadstart",(function(e){return i.handleTechLoadStart_(e)}))
this.on(this.tech_,"sourceset",(function(e){return i.handleTechSourceset_(e)}))
this.on(this.tech_,"waiting",(function(e){return i.handleTechWaiting_(e)}))
this.on(this.tech_,"ended",(function(e){return i.handleTechEnded_(e)}))
this.on(this.tech_,"seeking",(function(e){return i.handleTechSeeking_(e)}))
this.on(this.tech_,"play",(function(e){return i.handleTechPlay_(e)}))
this.on(this.tech_,"firstplay",(function(e){return i.handleTechFirstPlay_(e)}))
this.on(this.tech_,"pause",(function(e){return i.handleTechPause_(e)}))
this.on(this.tech_,"durationchange",(function(e){return i.handleTechDurationChange_(e)}))
this.on(this.tech_,"fullscreenchange",(function(e,t){return i.handleTechFullscreenChange_(e,t)}))
this.on(this.tech_,"fullscreenerror",(function(e,t){return i.handleTechFullscreenError_(e,t)}))
this.on(this.tech_,"enterpictureinpicture",(function(e){return i.handleTechEnterPictureInPicture_(e)}))
this.on(this.tech_,"leavepictureinpicture",(function(e){return i.handleTechLeavePictureInPicture_(e)}))
this.on(this.tech_,"error",(function(e){return i.handleTechError_(e)}))
this.on(this.tech_,"posterchange",(function(e){return i.handleTechPosterChange_(e)}))
this.on(this.tech_,"textdata",(function(e){return i.handleTechTextData_(e)}))
this.on(this.tech_,"ratechange",(function(e){return i.handleTechRateChange_(e)}))
this.on(this.tech_,"loadedmetadata",this.boundUpdateStyleEl_)
this.usingNativeControls(this.techGet_("controls"))
this.controls()&&!this.usingNativeControls()&&this.addTechControlsListeners_()
this.tech_.el().parentNode===this.el()||"Html5"===n&&this.tag||Sa(this.tech_.el(),this.el())
if(this.tag){this.tag.player=null
this.tag=null}}
i.unloadTech_=function(){var e=this
wo.names.forEach((function(t){var i=wo[t]
e[i.privateName]=e[i.getterName]()}))
this.textTracksJson_=Xs(this.tech_)
this.isReady_=!1
this.tech_.dispose()
this.tech_=!1
if(this.isPosterFromTech_){this.poster_=""
this.trigger("posterchange")}this.isPosterFromTech_=!1}
i.tech=function(e){void 0===e&&Ur.warn("Using the tech directly can be dangerous. I hope you know what you're doing.\nSee https://github.com/videojs/video.js/issues/2617 for more info.\n")
return this.tech_}
i.addTechControlsListeners_=function(){this.removeTechControlsListeners_()
this.on(this.tech_,"click",this.boundHandleTechClick_)
this.on(this.tech_,"dblclick",this.boundHandleTechDoubleClick_)
this.on(this.tech_,"touchstart",this.boundHandleTechTouchStart_)
this.on(this.tech_,"touchmove",this.boundHandleTechTouchMove_)
this.on(this.tech_,"touchend",this.boundHandleTechTouchEnd_)
this.on(this.tech_,"tap",this.boundHandleTechTap_)}
i.removeTechControlsListeners_=function(){this.off(this.tech_,"tap",this.boundHandleTechTap_)
this.off(this.tech_,"touchstart",this.boundHandleTechTouchStart_)
this.off(this.tech_,"touchmove",this.boundHandleTechTouchMove_)
this.off(this.tech_,"touchend",this.boundHandleTechTouchEnd_)
this.off(this.tech_,"click",this.boundHandleTechClick_)
this.off(this.tech_,"dblclick",this.boundHandleTechDoubleClick_)}
i.handleTechReady_=function(){this.triggerReady()
this.cache_.volume&&this.techCall_("setVolume",this.cache_.volume)
this.handleTechPosterChange_()
this.handleTechDurationChange_()}
i.handleTechLoadStart_=function(){this.removeClass("vjs-ended")
this.removeClass("vjs-seeking")
this.error(null)
this.handleTechDurationChange_()
if(this.paused()){this.hasStarted(!1)
this.trigger("loadstart")}else{this.trigger("loadstart")
this.trigger("firstplay")}this.manualAutoplay_(!0===this.autoplay()&&this.options_.normalizeAutoplay?"play":this.autoplay())}
i.manualAutoplay_=function(e){var t=this
if(this.tech_&&"string"==typeof e){var i,n=function(){var e=t.muted()
t.muted(!0)
var i=function(){t.muted(e)}
t.playTerminatedQueue_.push(i)
var n=t.play()
if(Gs(n))return n.catch((function(e){i()
throw new Error("Rejection at manualAutoplay. Restoring muted value. "+(e||""))}))}
"any"!==e||this.muted()?i="muted"!==e||this.muted()?this.play():n():Gs(i=this.play())&&(i=i.catch(n))
if(Gs(i))return i.then((function(){t.trigger({type:"autoplay-success",autoplay:e})})).catch((function(){t.trigger({type:"autoplay-failure",autoplay:e})}))}}
i.updateSourceCaches_=function(e){void 0===e&&(e="")
var t=e,i=""
if("string"!=typeof t){t=e.src
i=e.type}this.cache_.source=this.cache_.source||{}
this.cache_.sources=this.cache_.sources||[]
t&&!i&&(i=function(e,t){if(!t)return""
if(e.cache_.source.src===t&&e.cache_.source.type)return e.cache_.source.type
var i=e.cache_.sources.filter((function(e){return e.src===t}))
if(i.length)return i[0].type
for(var n=e.$$("source"),r=0;r<n.length;r++){var a=n[r]
if(a.type&&a.src&&a.src===t)return a.type}return Fo(t)}(this,t))
this.cache_.source=Ds({},e,{src:t,type:i})
for(var n=this.cache_.sources.filter((function(e){return e.src&&e.src===t})),r=[],a=this.$$("source"),s=[],o=0;o<a.length;o++){var u=Pa(a[o])
r.push(u)
u.src&&u.src===t&&s.push(u.src)}s.length&&!n.length?this.cache_.sources=r:n.length||(this.cache_.sources=[this.cache_.source])
this.cache_.src=t}
i.handleTechSourceset_=function(e){var t=this
if(!this.changingSrc_){var i=function(e){return t.updateSourceCaches_(e)},n=this.currentSource().src,r=e.src
n&&!/^blob:/.test(n)&&/^blob:/.test(r)&&(!this.lastSource_||this.lastSource_.tech!==r&&this.lastSource_.player!==n)&&(i=function(){})
i(r)
e.src||this.tech_.any(["sourceset","loadstart"],(function(e){if("sourceset"!==e.type){var i=t.techGet("currentSrc")
t.lastSource_.tech=i
t.updateSourceCaches_(i)}}))}this.lastSource_={player:this.currentSource().src,tech:e.src}
this.trigger({src:e.src,type:"sourceset"})}
i.hasStarted=function(e){if(void 0===e)return this.hasStarted_
if(e!==this.hasStarted_){this.hasStarted_=e
if(this.hasStarted_){this.addClass("vjs-has-started")
this.trigger("firstplay")}else this.removeClass("vjs-has-started")}}
i.handleTechPlay_=function(){this.removeClass("vjs-ended")
this.removeClass("vjs-paused")
this.addClass("vjs-playing")
this.hasStarted(!0)
this.trigger("play")}
i.handleTechRateChange_=function(){if(this.tech_.playbackRate()>0&&0===this.cache_.lastPlaybackRate){this.queuedCallbacks_.forEach((function(e){return e.callback(e.event)}))
this.queuedCallbacks_=[]}this.cache_.lastPlaybackRate=this.tech_.playbackRate()
this.trigger("ratechange")}
i.handleTechWaiting_=function(){var e=this
this.addClass("vjs-waiting")
this.trigger("waiting")
var t=this.currentTime()
this.on("timeupdate",(function i(){if(t!==e.currentTime()){e.removeClass("vjs-waiting")
e.off("timeupdate",i)}}))}
i.handleTechCanPlay_=function(){this.removeClass("vjs-waiting")
this.trigger("canplay")}
i.handleTechCanPlayThrough_=function(){this.removeClass("vjs-waiting")
this.trigger("canplaythrough")}
i.handleTechPlaying_=function(){this.removeClass("vjs-waiting")
this.trigger("playing")}
i.handleTechSeeking_=function(){this.addClass("vjs-seeking")
this.trigger("seeking")}
i.handleTechSeeked_=function(){this.removeClass("vjs-seeking")
this.removeClass("vjs-ended")
this.trigger("seeked")}
i.handleTechFirstPlay_=function(){if(this.options_.starttime){Ur.warn("Passing the `starttime` option to the player will be deprecated in 6.0")
this.currentTime(this.options_.starttime)}this.addClass("vjs-has-started")
this.trigger("firstplay")}
i.handleTechPause_=function(){this.removeClass("vjs-playing")
this.addClass("vjs-paused")
this.trigger("pause")}
i.handleTechEnded_=function(){this.addClass("vjs-ended")
this.removeClass("vjs-waiting")
if(this.options_.loop){this.currentTime(0)
this.play()}else this.paused()||this.pause()
this.trigger("ended")}
i.handleTechDurationChange_=function(){this.duration(this.techGet_("duration"))}
i.handleTechClick_=function(e){this.controls_&&(void 0!==this.options_&&void 0!==this.options_.userActions&&void 0!==this.options_.userActions.click&&!1===this.options_.userActions.click||(void 0!==this.options_&&void 0!==this.options_.userActions&&"function"==typeof this.options_.userActions.click?this.options_.userActions.click.call(this,e):this.paused()?zs(this.play()):this.pause()))}
i.handleTechDoubleClick_=function(e){if(this.controls_){Array.prototype.some.call(this.$$(".vjs-control-bar, .vjs-modal-dialog"),(function(t){return t.contains(e.target)}))||void 0!==this.options_&&void 0!==this.options_.userActions&&void 0!==this.options_.userActions.doubleClick&&!1===this.options_.userActions.doubleClick||(void 0!==this.options_&&void 0!==this.options_.userActions&&"function"==typeof this.options_.userActions.doubleClick?this.options_.userActions.doubleClick.call(this,e):this.isFullscreen()?this.exitFullscreen():this.requestFullscreen())}}
i.handleTechTap_=function(){this.userActive(!this.userActive())}
i.handleTechTouchStart_=function(){this.userWasActive=this.userActive()}
i.handleTechTouchMove_=function(){this.userWasActive&&this.reportUserActivity()}
i.handleTechTouchEnd_=function(e){e.cancelable&&e.preventDefault()}
i.handleStageClick_=function(){this.reportUserActivity()}
i.toggleFullscreenClass_=function(){this.isFullscreen()?this.addClass("vjs-fullscreen"):this.removeClass("vjs-fullscreen")}
i.documentFullscreenChange_=function(e){var t=e.target.player
if(!t||t===this){var i=this.el(),n=L[this.fsApi_.fullscreenElement]===i
!n&&i.matches?n=i.matches(":"+this.fsApi_.fullscreen):!n&&i.msMatchesSelector&&(n=i.msMatchesSelector(":"+this.fsApi_.fullscreen))
this.isFullscreen(n)}}
i.handleTechFullscreenChange_=function(e,t){var i=this
if(t){if(t.nativeIOSFullscreen){this.addClass("vjs-ios-native-fs")
this.tech_.one("webkitendfullscreen",(function(){i.removeClass("vjs-ios-native-fs")}))}this.isFullscreen(t.isFullscreen)}}
i.handleTechFullscreenError_=function(e,t){this.trigger("fullscreenerror",t)}
i.togglePictureInPictureClass_=function(){this.isInPictureInPicture()?this.addClass("vjs-picture-in-picture"):this.removeClass("vjs-picture-in-picture")}
i.handleTechEnterPictureInPicture_=function(e){this.isInPictureInPicture(!0)}
i.handleTechLeavePictureInPicture_=function(e){this.isInPictureInPicture(!1)}
i.handleTechError_=function(){var e=this.tech_.error()
this.error(e)}
i.handleTechTextData_=function(){var e=null
arguments.length>1&&(e=arguments[1])
this.trigger("textdata",e)}
i.getCache=function(){return this.cache_}
i.resetCache_=function(){this.cache_={currentTime:0,initTime:0,inactivityTimeout:this.options_.inactivityTimeout,duration:NaN,lastVolume:1,lastPlaybackRate:this.defaultPlaybackRate(),media:null,src:"",source:{},sources:[],playbackRates:[],volume:1}}
i.techCall_=function(e,t){this.ready((function(){if(e in Ro)return function(e,t,i,n){return t[i](e.reduce(No(i),n))}(this.middleware_,this.tech_,e,t)
if(e in Mo)return Lo(this.middleware_,this.tech_,e,t)
try{this.tech_&&this.tech_[e](t)}catch(e){Ur(e)
throw e}}),!0)}
i.techGet_=function(e){if(this.tech_&&this.tech_.isReady_){if(e in Do)return function(e,t,i){return e.reduceRight(No(i),t[i]())}(this.middleware_,this.tech_,e)
if(e in Mo)return Lo(this.middleware_,this.tech_,e)
try{return this.tech_[e]()}catch(t){if(void 0===this.tech_[e]){Ur("Video.js: "+e+" method not defined for "+this.techName_+" playback technology.",t)
throw t}if("TypeError"===t.name){Ur("Video.js: "+e+" unavailable on "+this.techName_+" playback technology element.",t)
this.tech_.isReady_=!1
throw t}Ur(t)
throw t}}}
i.play=function(){var e=this,t=this.options_.Promise||x.Promise
return t?new t((function(t){e.play_(t)})):this.play_()}
i.play_=function(e){var t=this
void 0===e&&(e=zs)
this.playCallbacks_.push(e)
var i=Boolean(!this.changingSrc_&&(this.src()||this.currentSrc()))
if(this.waitToPlay_){this.off(["ready","loadstart"],this.waitToPlay_)
this.waitToPlay_=null}if(this.isReady_&&i){var n=this.techGet_("play")
null===n?this.runPlayTerminatedQueue_():this.runPlayCallbacks_(n)}else{this.waitToPlay_=function(e){t.play_()}
this.one(["ready","loadstart"],this.waitToPlay_)
i||!ha&&!da||this.load()}}
i.runPlayTerminatedQueue_=function(){var e=this.playTerminatedQueue_.slice(0)
this.playTerminatedQueue_=[]
e.forEach((function(e){e()}))}
i.runPlayCallbacks_=function(e){var t=this.playCallbacks_.slice(0)
this.playCallbacks_=[]
this.playTerminatedQueue_=[]
t.forEach((function(t){t(e)}))}
i.pause=function(){this.techCall_("pause")}
i.paused=function(){return!1!==this.techGet_("paused")}
i.played=function(){return this.techGet_("played")||Vs(0,0)}
i.scrubbing=function(e){if(void 0===e)return this.scrubbing_
this.scrubbing_=!!e
this.techCall_("setScrubbing",this.scrubbing_)
e?this.addClass("vjs-scrubbing"):this.removeClass("vjs-scrubbing")}
i.currentTime=function(e){if(void 0===e){this.cache_.currentTime=this.techGet_("currentTime")||0
return this.cache_.currentTime}e<0&&(e=0)
if(this.isReady_&&!this.changingSrc_&&this.tech_&&this.tech_.isReady_){this.techCall_("setCurrentTime",e)
this.cache_.initTime=0}else{this.cache_.initTime=e
this.off("canplay",this.boundApplyInitTime_)
this.one("canplay",this.boundApplyInitTime_)}}
i.applyInitTime_=function(){this.currentTime(this.cache_.initTime)}
i.duration=function(e){if(void 0===e)return void 0!==this.cache_.duration?this.cache_.duration:NaN;(e=parseFloat(e))<0&&(e=1/0)
if(e!==this.cache_.duration){this.cache_.duration=e
e===1/0?this.addClass("vjs-live"):this.removeClass("vjs-live")
isNaN(e)||this.trigger("durationchange")}}
i.remainingTime=function(){return this.duration()-this.currentTime()}
i.remainingTimeDisplay=function(){return Math.floor(this.duration())-Math.floor(this.currentTime())}
i.buffered=function(){var e=this.techGet_("buffered")
e&&e.length||(e=Vs(0,0))
return e}
i.bufferedPercent=function(){return Hs(this.buffered(),this.duration())}
i.bufferedEnd=function(){var e=this.buffered(),t=this.duration(),i=e.end(e.length-1)
i>t&&(i=t)
return i}
i.volume=function(e){var t
if(void 0===e){t=parseFloat(this.techGet_("volume"))
return isNaN(t)?1:t}t=Math.max(0,Math.min(1,parseFloat(e)))
this.cache_.volume=t
this.techCall_("setVolume",t)
t>0&&this.lastVolume_(t)}
i.muted=function(e){if(void 0===e)return this.techGet_("muted")||!1
this.techCall_("setMuted",e)}
i.defaultMuted=function(e){return void 0!==e?this.techCall_("setDefaultMuted",e):this.techGet_("defaultMuted")||!1}
i.lastVolume_=function(e){if(void 0===e||0===e)return this.cache_.lastVolume
this.cache_.lastVolume=e}
i.supportsFullScreen=function(){return this.techGet_("supportsFullScreen")||!1}
i.isFullscreen=function(e){if(void 0===e)return this.isFullscreen_
var t=this.isFullscreen_
this.isFullscreen_=Boolean(e)
this.isFullscreen_!==t&&this.fsApi_.prefixed&&this.trigger("fullscreenchange")
this.toggleFullscreenClass_()}
i.requestFullscreen=function(e){var t=this.options_.Promise||x.Promise
if(t){var i=this
return new t((function(t,n){function r(){i.off("fullscreenerror",s)
i.off("fullscreenchange",a)}function a(){r()
t()}function s(e,t){r()
n(t)}i.one("fullscreenchange",a)
i.one("fullscreenerror",s)
var o=i.requestFullscreenHelper_(e)
if(o){o.then(r,r)
o.then(t,n)}}))}return this.requestFullscreenHelper_()}
i.requestFullscreenHelper_=function(e){var t,i=this
if(!this.fsApi_.prefixed){t=this.options_.fullscreen&&this.options_.fullscreen.options||{}
void 0!==e&&(t=e)}if(this.fsApi_.requestFullscreen){var n=this.el_[this.fsApi_.requestFullscreen](t)
n&&n.then((function(){return i.isFullscreen(!0)}),(function(){return i.isFullscreen(!1)}))
return n}this.tech_.supportsFullScreen()&&!0==!this.options_.preferFullWindow?this.techCall_("enterFullScreen"):this.enterFullWindow()}
i.exitFullscreen=function(){var e=this.options_.Promise||x.Promise
if(e){var t=this
return new e((function(e,i){function n(){t.off("fullscreenerror",a)
t.off("fullscreenchange",r)}function r(){n()
e()}function a(e,t){n()
i(t)}t.one("fullscreenchange",r)
t.one("fullscreenerror",a)
var s=t.exitFullscreenHelper_()
if(s){s.then(n,n)
s.then(e,i)}}))}return this.exitFullscreenHelper_()}
i.exitFullscreenHelper_=function(){var e=this
if(this.fsApi_.requestFullscreen){var t=L[this.fsApi_.exitFullscreen]()
t&&zs(t.then((function(){return e.isFullscreen(!1)})))
return t}this.tech_.supportsFullScreen()&&!0==!this.options_.preferFullWindow?this.techCall_("exitFullScreen"):this.exitFullWindow()}
i.enterFullWindow=function(){this.isFullscreen(!0)
this.isFullWindow=!0
this.docOrigOverflow=L.documentElement.style.overflow
us(L,"keydown",this.boundFullWindowOnEscKey_)
L.documentElement.style.overflow="hidden"
Ea(L.body,"vjs-full-window")
this.trigger("enterFullWindow")}
i.fullWindowOnEscKey=function(e){M.isEventKey(e,"Esc")&&!0===this.isFullscreen()&&(this.isFullWindow?this.exitFullWindow():this.exitFullscreen())}
i.exitFullWindow=function(){this.isFullscreen(!1)
this.isFullWindow=!1
ls(L,"keydown",this.boundFullWindowOnEscKey_)
L.documentElement.style.overflow=this.docOrigOverflow
Ca(L.body,"vjs-full-window")
this.trigger("exitFullWindow")}
i.disablePictureInPicture=function(e){if(void 0===e)return this.techGet_("disablePictureInPicture")
this.techCall_("setDisablePictureInPicture",e)
this.options_.disablePictureInPicture=e
this.trigger("disablepictureinpicturechanged")}
i.isInPictureInPicture=function(e){if(void 0===e)return!!this.isInPictureInPicture_
this.isInPictureInPicture_=!!e
this.togglePictureInPictureClass_()}
i.requestPictureInPicture=function(){if("pictureInPictureEnabled"in L&&!1===this.disablePictureInPicture())return this.techGet_("requestPictureInPicture")}
i.exitPictureInPicture=function(){if("pictureInPictureEnabled"in L)return L.exitPictureInPicture()}
i.handleKeyDown=function(e){var t=this.options_.userActions
if(t&&t.hotkeys){(function(e){var t=e.tagName.toLowerCase()
if(e.isContentEditable)return!0
if("input"===t)return-1===["button","checkbox","hidden","radio","reset","submit"].indexOf(e.type)
return-1!==["textarea"].indexOf(t)})(this.el_.ownerDocument.activeElement)||("function"==typeof t.hotkeys?t.hotkeys.call(this,e):this.handleHotkeys(e))}}
i.handleHotkeys=function(e){var t=this.options_.userActions?this.options_.userActions.hotkeys:{},i=t.fullscreenKey,n=void 0===i?function(e){return M.isEventKey(e,"f")}:i,r=t.muteKey,a=void 0===r?function(e){return M.isEventKey(e,"m")}:r,s=t.playPauseKey,o=void 0===s?function(e){return M.isEventKey(e,"k")||M.isEventKey(e,"Space")}:s
if(n.call(this,e)){e.preventDefault()
e.stopPropagation()
var u=Bs.getComponent("FullscreenToggle")
!1!==L[this.fsApi_.fullscreenEnabled]&&u.prototype.handleClick.call(this,e)}else if(a.call(this,e)){e.preventDefault()
e.stopPropagation()
Bs.getComponent("MuteToggle").prototype.handleClick.call(this,e)}else if(o.call(this,e)){e.preventDefault()
e.stopPropagation()
Bs.getComponent("PlayToggle").prototype.handleClick.call(this,e)}}
i.canPlayType=function(e){for(var t,i=0,n=this.options_.techOrder;i<n.length;i++){var r=n[i],a=Io.getTech(r)
a||(a=Bs.getComponent(r))
if(a){if(a.isSupported()&&(t=a.canPlayType(e)))return t}else Ur.error('The "'+r+'" tech is undefined. Skipped browser support check for that tech.')}return""}
i.selectSource=function(e){var t,i=this,n=this.options_.techOrder.map((function(e){return[e,Io.getTech(e)]})).filter((function(e){var t=e[0],i=e[1]
if(i)return i.isSupported()
Ur.error('The "'+t+'" tech is undefined. Skipped browser support check for that tech.')
return!1})),r=function(e,t,i){var n
e.some((function(e){return t.some((function(t){if(n=i(e,t))return!0}))}))
return n},a=function(e,t){var n=e[0]
if(e[1].canPlaySource(t,i.options_[n.toLowerCase()]))return{source:t,tech:n}}
return(this.options_.sourceOrder?r(e,n,(t=a,function(e,i){return t(i,e)})):r(n,e,a))||!1}
i.handleSrc_=function(e,t){var i=this
if(void 0===e)return this.cache_.src||""
this.resetRetryOnError_&&this.resetRetryOnError_()
var n=jo(e)
if(n.length){this.changingSrc_=!0
t||(this.cache_.sources=n)
this.updateSourceCaches_(n[0])
Oo(this,n[0],(function(e,r){i.middleware_=r
t||(i.cache_.sources=n)
i.updateSourceCaches_(e)
if(i.src_(e)){if(n.length>1)return i.handleSrc_(n.slice(1))
i.changingSrc_=!1
i.setTimeout((function(){this.error({code:4,message:this.localize(this.options_.notSupportedMessage)})}),0)
i.triggerReady()}else{a=r,s=i.tech_,a.forEach((function(e){return e.setTech&&e.setTech(s)}))
var a,s}}))
if(this.options_.retryOnError&&n.length>1){var r=function(){i.error(null)
i.handleSrc_(n.slice(1),!0)},a=function(){i.off("error",r)}
this.one("error",r)
this.one("playing",a)
this.resetRetryOnError_=function(){i.off("error",r)
i.off("playing",a)}}}else this.setTimeout((function(){this.error({code:4,message:this.localize(this.options_.notSupportedMessage)})}),0)}
i.src=function(e){return this.handleSrc_(e,!1)}
i.src_=function(e){var t,i,n=this,r=this.selectSource([e])
if(!r)return!0
if(!(t=r.tech,i=this.techName_,Ls(t)===Ls(i))){this.changingSrc_=!0
this.loadTech_(r.tech,r.source)
this.tech_.ready((function(){n.changingSrc_=!1}))
return!1}this.ready((function(){this.tech_.constructor.prototype.hasOwnProperty("setSource")?this.techCall_("setSource",e):this.techCall_("src",e.src)
this.changingSrc_=!1}),!0)
return!1}
i.load=function(){this.techCall_("load")}
i.reset=function(){var e=this,t=this.options_.Promise||x.Promise
if(this.paused()||!t)this.doReset_()
else{zs(this.play().then((function(){return e.doReset_()})))}}
i.doReset_=function(){this.tech_&&this.tech_.clearTracks("text")
this.resetCache_()
this.poster("")
this.loadTech_(this.options_.techOrder[0],null)
this.techCall_("reset")
this.resetControlBarUI_()
bs(this)&&this.trigger("playerreset")}
i.resetControlBarUI_=function(){this.resetProgressBar_()
this.resetPlaybackRate_()
this.resetVolumeBar_()}
i.resetProgressBar_=function(){this.currentTime(0)
var e=this.controlBar,t=e.durationDisplay,i=e.remainingTimeDisplay
t&&t.updateContent()
i&&i.updateContent()}
i.resetPlaybackRate_=function(){this.playbackRate(this.defaultPlaybackRate())
this.handleTechRateChange_()}
i.resetVolumeBar_=function(){this.volume(1)
this.trigger("volumechange")}
i.currentSources=function(){var e=this.currentSource(),t=[]
0!==Object.keys(e).length&&t.push(e)
return this.cache_.sources||t}
i.currentSource=function(){return this.cache_.source||{}}
i.currentSrc=function(){return this.currentSource()&&this.currentSource().src||""}
i.currentType=function(){return this.currentSource()&&this.currentSource().type||""}
i.preload=function(e){if(void 0===e)return this.techGet_("preload")
this.techCall_("setPreload",e)
this.options_.preload=e}
i.autoplay=function(e){if(void 0===e)return this.options_.autoplay||!1
var t
if("string"==typeof e&&/(any|play|muted)/.test(e)||!0===e&&this.options_.normalizeAutoplay){this.options_.autoplay=e
this.manualAutoplay_("string"==typeof e?e:"play")
t=!1}else this.options_.autoplay=!!e
t=void 0===t?this.options_.autoplay:t
this.tech_&&this.techCall_("setAutoplay",t)}
i.playsinline=function(e){if(void 0!==e){this.techCall_("setPlaysinline",e)
this.options_.playsinline=e
return this}return this.techGet_("playsinline")}
i.loop=function(e){if(void 0===e)return this.techGet_("loop")
this.techCall_("setLoop",e)
this.options_.loop=e}
i.poster=function(e){if(void 0===e)return this.poster_
e||(e="")
if(e!==this.poster_){this.poster_=e
this.techCall_("setPoster",e)
this.isPosterFromTech_=!1
this.trigger("posterchange")}}
i.handleTechPosterChange_=function(){if((!this.poster_||this.options_.techCanOverridePoster)&&this.tech_&&this.tech_.poster){var e=this.tech_.poster()||""
if(e!==this.poster_){this.poster_=e
this.isPosterFromTech_=!0
this.trigger("posterchange")}}}
i.controls=function(e){if(void 0===e)return!!this.controls_
e=!!e
if(this.controls_!==e){this.controls_=e
this.usingNativeControls()&&this.techCall_("setControls",e)
if(this.controls_){this.removeClass("vjs-controls-disabled")
this.addClass("vjs-controls-enabled")
this.trigger("controlsenabled")
this.usingNativeControls()||this.addTechControlsListeners_()}else{this.removeClass("vjs-controls-enabled")
this.addClass("vjs-controls-disabled")
this.trigger("controlsdisabled")
this.usingNativeControls()||this.removeTechControlsListeners_()}}}
i.usingNativeControls=function(e){if(void 0===e)return!!this.usingNativeControls_
e=!!e
if(this.usingNativeControls_!==e){this.usingNativeControls_=e
if(this.usingNativeControls_){this.addClass("vjs-using-native-controls")
this.trigger("usingnativecontrols")}else{this.removeClass("vjs-using-native-controls")
this.trigger("usingcustomcontrols")}}}
i.error=function(e){var t=this
if(void 0===e)return this.error_||null
xr("beforeerror").forEach((function(i){var n=i(t,e)
qr(n)&&!Array.isArray(n)||"string"==typeof n||"number"==typeof n||null===n?e=n:t.log.error("please return a value that MediaError expects in beforeerror hooks")}))
if(this.options_.suppressNotSupportedError&&e&&4===e.code){var i=function(){this.error(e)}
this.options_.suppressNotSupportedError=!1
this.any(["click","touchstart"],i)
this.one("loadstart",(function(){this.off(["click","touchstart"],i)}))}else if(null!==e){this.error_=new qs(e)
this.addClass("vjs-error")
Ur.error("(CODE:"+this.error_.code+" "+qs.errorTypes[this.error_.code]+")",this.error_.message,this.error_)
this.trigger("error")
xr("error").forEach((function(e){return e(t,t.error_)}))}else{this.error_=e
this.removeClass("vjs-error")
this.errorDisplay&&this.errorDisplay.close()}}
i.reportUserActivity=function(e){this.userActivity_=!0}
i.userActive=function(e){if(void 0===e)return this.userActive_
if((e=!!e)!==this.userActive_){this.userActive_=e
if(this.userActive_){this.userActivity_=!0
this.removeClass("vjs-user-inactive")
this.addClass("vjs-user-active")
this.trigger("useractive")}else{this.tech_&&this.tech_.one("mousemove",(function(e){e.stopPropagation()
e.preventDefault()}))
this.userActivity_=!1
this.removeClass("vjs-user-active")
this.addClass("vjs-user-inactive")
this.trigger("userinactive")}}}
i.listenForUserActivity_=function(){var e,t,i,n=gs(this,this.reportUserActivity),r=function(t){n()
this.clearInterval(e)}
this.on("mousedown",(function(){n()
this.clearInterval(e)
e=this.setInterval(n,250)}))
this.on("mousemove",(function(e){if(e.screenX!==t||e.screenY!==i){t=e.screenX
i=e.screenY
n()}}))
this.on("mouseup",r)
this.on("mouseleave",r)
var a,s=this.getChild("controlBar")
if(s&&!da&&!Jr){s.on("mouseenter",(function(e){0!==this.player().options_.inactivityTimeout&&(this.player().cache_.inactivityTimeout=this.player().options_.inactivityTimeout)
this.player().options_.inactivityTimeout=0}))
s.on("mouseleave",(function(e){this.player().options_.inactivityTimeout=this.player().cache_.inactivityTimeout}))}this.on("keydown",n)
this.on("keyup",n)
this.setInterval((function(){if(this.userActivity_){this.userActivity_=!1
this.userActive(!0)
this.clearTimeout(a)
var e=this.options_.inactivityTimeout
e<=0||(a=this.setTimeout((function(){this.userActivity_||this.userActive(!1)}),e))}}),250)}
i.playbackRate=function(e){if(void 0===e)return this.tech_&&this.tech_.featuresPlaybackRate?this.cache_.lastPlaybackRate||this.techGet_("playbackRate"):1
this.techCall_("setPlaybackRate",e)}
i.defaultPlaybackRate=function(e){return void 0!==e?this.techCall_("setDefaultPlaybackRate",e):this.tech_&&this.tech_.featuresPlaybackRate?this.techGet_("defaultPlaybackRate"):1}
i.isAudio=function(e){if(void 0===e)return!!this.isAudio_
this.isAudio_=!!e}
i.enableAudioOnlyUI_=function(){var e=this
this.addClass("vjs-audio-only-mode")
var t=this.children(),i=this.getChild("ControlBar"),n=i&&i.currentHeight()
t.forEach((function(t){if(t!==i&&t.el_&&!t.hasClass("vjs-hidden")){t.hide()
e.audioOnlyCache_.hiddenChildren.push(t)}}))
this.audioOnlyCache_.playerHeight=this.currentHeight()
this.height(n)
this.trigger("audioonlymodechange")}
i.disableAudioOnlyUI_=function(){this.removeClass("vjs-audio-only-mode")
this.audioOnlyCache_.hiddenChildren.forEach((function(e){return e.show()}))
this.height(this.audioOnlyCache_.playerHeight)
this.trigger("audioonlymodechange")}
i.audioOnlyMode=function(e){var t=this
if("boolean"!=typeof e||e===this.audioOnlyMode_)return this.audioOnlyMode_
this.audioOnlyMode_=e
var i=this.options_.Promise||x.Promise
if(i){if(e){var n=[]
this.isInPictureInPicture()&&n.push(this.exitPictureInPicture())
this.isFullscreen()&&n.push(this.exitFullscreen())
this.audioPosterMode()&&n.push(this.audioPosterMode(!1))
return i.all(n).then((function(){return t.enableAudioOnlyUI_()}))}return i.resolve().then((function(){return t.disableAudioOnlyUI_()}))}if(e){this.isInPictureInPicture()&&this.exitPictureInPicture()
this.isFullscreen()&&this.exitFullscreen()
this.enableAudioOnlyUI_()}else this.disableAudioOnlyUI_()}
i.enablePosterModeUI_=function(){(this.tech_&&this.tech_).hide()
this.addClass("vjs-audio-poster-mode")
this.trigger("audiopostermodechange")}
i.disablePosterModeUI_=function(){(this.tech_&&this.tech_).show()
this.removeClass("vjs-audio-poster-mode")
this.trigger("audiopostermodechange")}
i.audioPosterMode=function(e){var t=this
if("boolean"!=typeof e||e===this.audioPosterMode_)return this.audioPosterMode_
this.audioPosterMode_=e
var i=this.options_.Promise||x.Promise
if(i){if(e){if(this.audioOnlyMode()){return this.audioOnlyMode(!1).then((function(){t.enablePosterModeUI_()}))}return i.resolve().then((function(){t.enablePosterModeUI_()}))}return i.resolve().then((function(){t.disablePosterModeUI_()}))}if(e){this.audioOnlyMode()&&this.audioOnlyMode(!1)
this.enablePosterModeUI_()}else this.disablePosterModeUI_()}
i.addTextTrack=function(e,t,i){if(this.tech_)return this.tech_.addTextTrack(e,t,i)}
i.addRemoteTextTrack=function(e,t){if(this.tech_)return this.tech_.addRemoteTextTrack(e,t)}
i.removeRemoteTextTrack=function(e){void 0===e&&(e={})
var t=e.track
t||(t=e)
if(this.tech_)return this.tech_.removeRemoteTextTrack(t)}
i.getVideoPlaybackQuality=function(){return this.techGet_("getVideoPlaybackQuality")}
i.videoWidth=function(){return this.tech_&&this.tech_.videoWidth&&this.tech_.videoWidth()||0}
i.videoHeight=function(){return this.tech_&&this.tech_.videoHeight&&this.tech_.videoHeight()||0}
i.language=function(e){if(void 0===e)return this.language_
if(this.language_!==String(e).toLowerCase()){this.language_=String(e).toLowerCase()
bs(this)&&this.trigger("languagechange")}}
i.languages=function(){return Ds(t.prototype.options_.languages,this.languages_)}
i.toJSON=function(){var e=Ds(this.options_),t=e.tracks
e.tracks=[]
for(var i=0;i<t.length;i++){var n=t[i];(n=Ds(n)).player=void 0
e.tracks[i]=n}return e}
i.createModal=function(e,t){var i=this;(t=t||{}).content=e||""
var n=new $s(this,t)
this.addChild(n)
n.on("dispose",(function(){i.removeChild(n)}))
n.open()
return n}
i.updateCurrentBreakpoint_=function(){if(this.responsive())for(var e=this.currentBreakpoint(),t=this.currentWidth(),i=0;i<Pl.length;i++){var n=Pl[i]
if(t<=this.breakpoints_[n]){if(e===n)return
e&&this.removeClass(xl[e])
this.addClass(xl[n])
this.breakpoint_=n
break}}}
i.removeCurrentBreakpoint_=function(){var e=this.currentBreakpointClass()
this.breakpoint_=""
e&&this.removeClass(e)}
i.breakpoints=function(e){if(void 0===e)return Hr(this.breakpoints_)
this.breakpoint_=""
this.breakpoints_=Hr({},Al,e)
this.updateCurrentBreakpoint_()
return Hr(this.breakpoints_)}
i.responsive=function(e){if(void 0===e)return this.responsive_
if((e=Boolean(e))!==this.responsive_){this.responsive_=e
if(e){this.on("playerresize",this.boundUpdateCurrentBreakpoint_)
this.updateCurrentBreakpoint_()}else{this.off("playerresize",this.boundUpdateCurrentBreakpoint_)
this.removeCurrentBreakpoint_()}return e}}
i.currentBreakpoint=function(){return this.breakpoint_}
i.currentBreakpointClass=function(){return xl[this.breakpoint_]||""}
i.loadMedia=function(e,t){var i=this
if(e&&"object"==typeof e){this.reset()
this.cache_.media=Ds(e)
var n=this.cache_.media,r=n.artwork,a=n.poster,s=n.src,o=n.textTracks
!r&&a&&(this.cache_.media.artwork=[{src:a,type:Fo(a)}])
s&&this.src(s)
a&&this.poster(a)
Array.isArray(o)&&o.forEach((function(e){return i.addRemoteTextTrack(e,!1)}))
this.ready(t)}}
i.getMedia=function(){if(!this.cache_.media){var e=this.poster(),t={src:this.currentSources(),textTracks:Array.prototype.map.call(this.remoteTextTracks(),(function(e){return{kind:e.kind,label:e.label,language:e.language,src:e.src}}))}
if(e){t.poster=e
t.artwork=[{src:t.poster,type:Fo(t.poster)}]}return t}return Ds(this.cache_.media)}
t.getTagSettings=function(e){var t={sources:[],tracks:[]},i=Pa(e),n=i["data-setup"]
ka(e,"vjs-fill")&&(i.fill=!0)
ka(e,"vjs-fluid")&&(i.fluid=!0)
if(null!==n){var r=F(n||"{}"),a=r[0],s=r[1]
a&&Ur.error(a)
Hr(i,s)}Hr(t,i)
if(e.hasChildNodes())for(var o=e.childNodes,u=0,l=o.length;u<l;u++){var c=o[u],d=c.nodeName.toLowerCase()
"source"===d?t.sources.push(Pa(c)):"track"===d&&t.tracks.push(Pa(c))}return t}
i.flexNotSupported_=function(){var e=L.createElement("i")
return!("flexBasis"in e.style||"webkitFlexBasis"in e.style||"mozFlexBasis"in e.style||"msFlexBasis"in e.style||"msFlexOrder"in e.style)}
i.debug=function(e){if(void 0===e)return this.debugEnabled_
if(e){this.trigger("debugon")
this.previousLogLevel_=this.log.level
this.log.level("debug")
this.debugEnabled_=!0}else{this.trigger("debugoff")
this.log.level(this.previousLogLevel_)
this.previousLogLevel_=void 0
this.debugEnabled_=!1}}
i.playbackRates=function(e){if(void 0===e)return this.cache_.playbackRates
if(Array.isArray(e)&&e.every((function(e){return"number"==typeof e}))){this.cache_.playbackRates=e
this.trigger("playbackrateschange")}}
return t}(Bs)
wo.names.forEach((function(e){var t=wo[e]
Ol.prototype[t.getterName]=function(){if(this.tech_)return this.tech_[t.getterName]()
this[t.privateName]=this[t.privateName]||new t.ListClass
return this[t.privateName]}}))
Ol.prototype.crossorigin=Ol.prototype.crossOrigin
Ol.players={}
var Ll=x.navigator
Ol.prototype.options_={techOrder:Io.defaultTechOrder_,html5:{},inactivityTimeout:2e3,playbackRates:[],liveui:!1,children:["mediaLoader","posterImage","textTrackDisplay","loadingSpinner","bigPlayButton","liveTracker","controlBar","errorDisplay","textTrackSettings","resizeManager"],language:Ll&&(Ll.languages&&Ll.languages[0]||Ll.userLanguage||Ll.language)||"en",languages:{},notSupportedMessage:"No compatible source was found for this media.",normalizeAutoplay:!1,fullscreen:{options:{navigationUI:"hide"}},breakpoints:{},responsive:!1,audioOnlyMode:!1,audioPosterMode:!1};["ended","seeking","seekable","networkState","readyState"].forEach((function(e){Ol.prototype[e]=function(){return this.techGet_(e)}}))
wl.forEach((function(e){Ol.prototype["handleTech"+Ls(e)+"_"]=function(){return this.trigger(e)}}))
Bs.registerComponent("Player",Ol)
var Dl="plugin",Rl="activePlugins_",Ml={},Nl=function(e){return Ml.hasOwnProperty(e)},Ul=function(e){return Nl(e)?Ml[e]:void 0},Bl=function(e,t){e[Rl]=e[Rl]||{}
e[Rl][t]=!0},Fl=function(e,t,i){var n=(i?"before":"")+"pluginsetup"
e.trigger(n,t)
e.trigger(n+":"+t.name,t)},jl=function(e,t){t.prototype.name=e
return function(){Fl(this,{name:e,plugin:t,instance:null},!0)
for(var i=arguments.length,n=new Array(i),r=0;r<i;r++)n[r]=arguments[r]
var a=Ie(t,[this].concat(n))
this[e]=function(){return a}
Fl(this,a.getEventHash())
return a}},Vl=function(){function e(t){if(this.constructor===e)throw new Error("Plugin must be sub-classed; not directly instantiated.")
this.player=t
this.log||(this.log=this.player.log.createLogger(this.name))
Ps(this)
delete this.trigger
As(this,this.constructor.defaultState)
Bl(t,this.name)
this.dispose=this.dispose.bind(this)
t.on("dispose",this.dispose)}var t=e.prototype
t.version=function(){return this.constructor.VERSION}
t.getEventHash=function(e){void 0===e&&(e={})
e.name=this.name
e.plugin=this.constructor
e.instance=this
return e}
t.trigger=function(e,t){void 0===t&&(t={})
return cs(this.eventBusEl_,e,this.getEventHash(t))}
t.handleStateChanged=function(e){}
t.dispose=function(){var e=this.name,t=this.player
this.trigger("dispose")
this.off()
t.off("dispose",this.dispose)
t[Rl][e]=!1
this.player=this.state=null
t[e]=jl(e,Ml[e])}
e.isBasic=function(t){var i="string"==typeof t?Ul(t):t
return"function"==typeof i&&!e.prototype.isPrototypeOf(i.prototype)}
e.registerPlugin=function(t,i){if("string"!=typeof t)throw new Error('Illegal plugin name, "'+t+'", must be a string, was '+typeof t+".")
if(Nl(t))Ur.warn('A plugin named "'+t+'" already exists. You may want to avoid re-registering plugins!')
else if(Ol.prototype.hasOwnProperty(t))throw new Error('Illegal plugin name, "'+t+'", cannot share a name with an existing player method!')
if("function"!=typeof i)throw new Error('Illegal plugin for "'+t+'", must be a function, was '+typeof i+".")
Ml[t]=i
t!==Dl&&(e.isBasic(i)?Ol.prototype[t]=function(e,t){var i=function(){Fl(this,{name:e,plugin:t,instance:null},!0)
var i=t.apply(this,arguments)
Bl(this,e)
Fl(this,{name:e,plugin:t,instance:i})
return i}
Object.keys(t).forEach((function(e){i[e]=t[e]}))
return i}(t,i):Ol.prototype[t]=jl(t,i))
return i}
e.deregisterPlugin=function(e){if(e===Dl)throw new Error("Cannot de-register base plugin.")
if(Nl(e)){delete Ml[e]
delete Ol.prototype[e]}}
e.getPlugins=function(e){void 0===e&&(e=Object.keys(Ml))
var t
e.forEach((function(e){var i=Ul(e)
i&&((t=t||{})[e]=i)}))
return t}
e.getPluginVersion=function(e){var t=Ul(e)
return t&&t.VERSION||""}
return e}()
Vl.getPlugin=Ul
Vl.BASE_PLUGIN_NAME=Dl
Vl.registerPlugin(Dl,Vl)
Ol.prototype.usingPlugin=function(e){return!!this[Rl]&&!0===this[Rl][e]}
Ol.prototype.hasPlugin=function(e){return!!Nl(e)}
var Hl=function(e){return 0===e.indexOf("#")?e.slice(1):e}
function ql(e,t,i){var n=ql.getPlayer(e)
if(n){t&&Ur.warn('Player "'+e+'" is already initialised. Options will not be applied.')
i&&n.ready(i)
return n}var r="string"==typeof e?Wa("#"+Hl(e)):e
if(!va(r))throw new TypeError("The element or ID supplied is not valid. (videojs)")
r.ownerDocument.defaultView&&r.ownerDocument.body.contains(r)||Ur.warn("The element supplied is not included in the DOM")
t=t||{}
xr("beforesetup").forEach((function(e){var i=e(r,Ds(t))
qr(i)&&!Array.isArray(i)?t=Ds(t,i):Ur.error("please return an object in beforesetup hooks")}))
var a=Bs.getComponent("Player")
n=new a(r,t,i)
xr("setup").forEach((function(e){return e(n)}))
return n}ql.hooks_=Pr
ql.hooks=xr
ql.hook=function(e,t){xr(e,t)}
ql.hookOnce=function(e,t){xr(e,[].concat(t).map((function(t){return function i(){Ar(e,i)
return t.apply(void 0,arguments)}})))}
ql.removeHook=Ar
if(!0!==x.VIDEOJS_NO_DYNAMIC_STYLE&&ga()){var Wl=Wa(".vjs-styles-defaults")
if(!Wl){Wl=Ja("vjs-styles-defaults")
var Gl=Wa("head")
Gl&&Gl.insertBefore(Wl,Gl.firstChild)
Za(Wl,"\n      .video-js {\n        width: 300px;\n        height: 150px;\n      }\n\n      .vjs-fluid {\n        padding-top: 56.25%\n      }\n    ")}}Ya(1,ql)
ql.VERSION=Ir
ql.options=Ol.prototype.options_
ql.getPlayers=function(){return Ol.players}
ql.getPlayer=function(e){var t,i=Ol.players
if("string"==typeof e){var n=Hl(e),r=i[n]
if(r)return r
t=Wa("#"+n)}else t=e
if(va(t)){var a=t,s=a.player,o=a.playerId
if(s||i[o])return s||i[o]}}
ql.getAllPlayers=function(){return Object.keys(Ol.players).map((function(e){return Ol.players[e]})).filter(Boolean)}
ql.players=Ol.players
ql.getComponent=Bs.getComponent
ql.registerComponent=function(e,t){Io.isTech(t)&&Ur.warn("The "+e+" tech was registered as a component. It should instead be registered using videojs.registerTech(name, tech)")
Bs.registerComponent.call(Bs,e,t)}
ql.getTech=Io.getTech
ql.registerTech=Io.registerTech
ql.use=function(e,t){Po[e]=Po[e]||[]
Po[e].push(t)}
Object.defineProperty(ql,"middleware",{value:{},writeable:!1,enumerable:!0})
Object.defineProperty(ql.middleware,"TERMINATOR",{value:Ao,writeable:!1,enumerable:!0})
ql.browser=pa
ql.TOUCH_ENABLED=ua
ql.extend=function(e,t){void 0===t&&(t={})
var i=function(){e.apply(this,arguments)},n={}
if("object"==typeof t){t.constructor!==Object.prototype.constructor&&(i=t.constructor)
n=t}else"function"==typeof t&&(i=t)
Pe(i,e)
e&&(i.super_=e)
for(var r in n)n.hasOwnProperty(r)&&(i.prototype[r]=n[r])
return i}
ql.mergeOptions=Ds
ql.bind=gs
ql.registerPlugin=Vl.registerPlugin
ql.deregisterPlugin=Vl.deregisterPlugin
ql.plugin=function(e,t){Ur.warn("videojs.plugin() is deprecated; use videojs.registerPlugin() instead")
return Vl.registerPlugin(e,t)}
ql.getPlugins=Vl.getPlugins
ql.getPlugin=Vl.getPlugin
ql.getPluginVersion=Vl.getPluginVersion
ql.addLanguage=function(e,t){var i
e=(""+e).toLowerCase()
ql.options.languages=Ds(ql.options.languages,((i={})[e]=t,i))
return ql.options.languages[e]}
ql.log=Ur
ql.createLogger=Br
ql.createTimeRange=ql.createTimeRanges=Vs
ql.formatTime=nu
ql.setFormatTime=function(e){iu=e}
ql.resetFormatTime=function(){iu=tu}
ql.parseUrl=po
ql.isCrossOrigin=go
ql.EventTarget=ys
ql.on=us
ql.one=ds
ql.off=ls
ql.trigger=cs
ql.xhr=W
ql.TextTrack=bo
ql.AudioTrack=To
ql.VideoTrack=So;["isEl","isTextNode","createEl","hasClass","addClass","removeClass","toggleClass","setAttributes","getAttributes","emptyEl","appendContent","insertContent"].forEach((function(e){ql[e]=function(){Ur.warn("videojs."+e+"() is deprecated; use videojs.dom."+e+"() instead")
return za[e].apply(null,arguments)}}))
ql.computedStyle=Gr
ql.dom=za
ql.url=vo
ql.defineLazyProperty=El
ql.addLanguage("en",{"Non-Fullscreen":"Exit Fullscreen"})

;/*! @name @videojs/http-streaming @version 2.14.0 @license Apache-2.0 */var zl=function(e,t){if(/^[a-z]+:/i.test(t))return t;/^data:/.test(e)&&(e=x.location&&x.location.href||"")
var i="function"==typeof x.URL,n=/^\/\//.test(e),r=!x.location&&!/\/\//i.test(e)
i?e=new x.URL(e,x.location||Ae):/\/\//i.test(e)||(e=xe.buildAbsoluteURL(x.location&&x.location.href||"",e))
if(i){var a=new URL(t,e)
return r?a.href.slice(18):n?a.href.slice(a.protocol.length):a.href}return xe.buildAbsoluteURL(e,t)},Kl=function(e,t,i){return e&&i&&i.responseURL&&t!==i.responseURL?i.responseURL:t},Xl=function(e){return ql.log.debug?ql.log.debug.bind(ql,"VHS:",e+" >"):function(){}},Yl=1/30,Ql=.1,$l=function(e,t){var i,n=[]
if(e&&e.length)for(i=0;i<e.length;i++)t(e.start(i),e.end(i))&&n.push([e.start(i),e.end(i)])
return ql.createTimeRanges(n)},Jl=function(e,t){return $l(e,(function(e,i){return e-Ql<=t&&i+Ql>=t}))},Zl=function(e,t){return $l(e,(function(e){return e-Yl>=t}))},ec=function(e){var t=[]
if(!e||!e.length)return""
for(var i=0;i<e.length;i++)t.push(e.start(i)+" => "+e.end(i))
return t.join(", ")},tc=function(e){for(var t=[],i=0;i<e.length;i++)t.push({start:e.start(i),end:e.end(i)})
return t},ic=function(e){if(e&&e.length&&e.end)return e.end(e.length-1)},nc=function(e,t){var i=0
if(!e||!e.length)return i
for(var n=0;n<e.length;n++){var r=e.start(n),a=e.end(n)
t>a||(i+=t>r&&t<=a?a-t:a-r)}return i},rc=ql.createTimeRange,ac=function(e,t){if(!t.preload)return t.duration
var i=0;(t.parts||[]).forEach((function(e){i+=e.duration}));(t.preloadHints||[]).forEach((function(t){"PART"===t.type&&(i+=e.partTargetDuration)}))
return i},sc=function(e){return(e.segments||[]).reduce((function(e,t,i){t.parts?t.parts.forEach((function(n,r){e.push({duration:n.duration,segmentIndex:i,partIndex:r,part:n,segment:t})})):e.push({duration:t.duration,segmentIndex:i,partIndex:null,segment:t,part:null})
return e}),[])},oc=function(e){var t=e.segments&&e.segments.length&&e.segments[e.segments.length-1]
return t&&t.parts||[]},uc=function(e){var t=e.preloadSegment
if(t){var i=t.parts,n=(t.preloadHints||[]).reduce((function(e,t){return e+("PART"===t.type?1:0)}),0)
return n+=i&&i.length?i.length:0}},lc=function(e,t){if(t.endList)return 0
if(e&&e.suggestedPresentationDelay)return e.suggestedPresentationDelay
var i=oc(t).length>0
return i&&t.serverControl&&t.serverControl.partHoldBack?t.serverControl.partHoldBack:i&&t.partTargetDuration?3*t.partTargetDuration:t.serverControl&&t.serverControl.holdBack?t.serverControl.holdBack:t.targetDuration?3*t.targetDuration:0},cc=function(e,t,i){void 0===t&&(t=e.mediaSequence+e.segments.length)
if(t<e.mediaSequence)return 0
var n=function(e,t){var i=0,n=t-e.mediaSequence,r=e.segments[n]
if(r){if(void 0!==r.start)return{result:r.start,precise:!0}
if(void 0!==r.end)return{result:r.end-r.duration,precise:!0}}for(;n--;){if(void 0!==(r=e.segments[n]).end)return{result:i+r.end,precise:!0}
i+=ac(e,r)
if(void 0!==r.start)return{result:i+r.start,precise:!0}}return{result:i,precise:!1}}(e,t)
if(n.precise)return n.result
var r=function(e,t){for(var i,n=0,r=t-e.mediaSequence;r<e.segments.length;r++){if(void 0!==(i=e.segments[r]).start)return{result:i.start-n,precise:!0}
n+=ac(e,i)
if(void 0!==i.end)return{result:i.end-n,precise:!0}}return{result:-1,precise:!1}}(e,t)
return r.precise?r.result:n.result+i},dc=function(e,t,i){if(!e)return 0
"number"!=typeof i&&(i=0)
if(void 0===t){if(e.totalDuration)return e.totalDuration
if(!e.endList)return x.Infinity}return cc(e,t,i)},hc=function(e){var t=e.defaultDuration,i=e.durationList,n=e.startIndex,r=e.endIndex,a=0
if(n>r){var s=[r,n]
n=s[0]
r=s[1]}if(n<0){for(var o=n;o<Math.min(0,r);o++)a+=t
n=0}for(var u=n;u<r;u++)a+=i[u].duration
return a},pc=function(e,t,i,n){if(!e||!e.segments)return null
if(e.endList)return dc(e)
if(null===t)return null
t=t||0
var r=cc(e,e.mediaSequence+e.segments.length,t)
i&&(r-=n="number"==typeof n?n:lc(null,e))
return Math.max(0,r)},fc=function(e){return e.excludeUntil&&e.excludeUntil>Date.now()},mc=function(e){return e.excludeUntil&&e.excludeUntil===1/0},gc=function(e){var t=fc(e)
return!e.disabled&&!t},vc=function(e,t){return t.attributes&&t.attributes[e]},yc=function(e,t){if(1===e.playlists.length)return!0
var i=t.attributes.BANDWIDTH||Number.MAX_VALUE
return 0===e.playlists.filter((function(e){return!!gc(e)&&(e.attributes.BANDWIDTH||0)<i})).length},_c=function(e,t){return!(!e&&!t||!e&&t||e&&!t)&&(e===t||(!(!e.id||!t.id||e.id!==t.id)||(!(!e.resolvedUri||!t.resolvedUri||e.resolvedUri!==t.resolvedUri)||!(!e.uri||!t.uri||e.uri!==t.uri))))},bc=function(e,t){var i=e&&e.mediaGroups&&e.mediaGroups.AUDIO||{},n=!1
for(var r in i){for(var a in i[r])if(n=t(i[r][a]))break
if(n)break}return!!n},Tc=function(e){if(!e||!e.playlists||!e.playlists.length){return bc(e,(function(e){return e.playlists&&e.playlists.length||e.uri}))}for(var t=function(t){var i=e.playlists[t],n=i.attributes&&i.attributes.CODECS
return n&&n.split(",").every((function(e){return ze(e)}))||bc(e,(function(e){return _c(i,e)}))?"continue":{v:!1}},i=0;i<e.playlists.length;i++){var n=t(i)
if("continue"!==n&&"object"==typeof n)return n.v}return!0},Sc={liveEdgeDelay:lc,duration:dc,seekable:function(e,t,i){var n=t||0,r=pc(e,t,!0,i)
return null===r?rc():rc(n,r)},getMediaInfoForTime:function(e){for(var t=e.playlist,i=e.currentTime,n=e.startingSegmentIndex,r=e.startingPartIndex,a=e.startTime,s=e.experimentalExactManifestTimings,o=i-a,u=sc(t),l=0,c=0;c<u.length;c++){var d=u[c]
if(n===d.segmentIndex&&("number"!=typeof r||"number"!=typeof d.partIndex||r===d.partIndex)){l=c
break}}if(o<0){if(l>0)for(var h=l-1;h>=0;h--){var p=u[h]
o+=p.duration
if(s){if(o<0)continue}else if(o+Yl<=0)continue
return{partIndex:p.partIndex,segmentIndex:p.segmentIndex,startTime:a-hc({defaultDuration:t.targetDuration,durationList:u,startIndex:l,endIndex:h})}}return{partIndex:u[0]&&u[0].partIndex||null,segmentIndex:u[0]&&u[0].segmentIndex||0,startTime:i}}if(l<0){for(var f=l;f<0;f++)if((o-=t.targetDuration)<0)return{partIndex:u[0]&&u[0].partIndex||null,segmentIndex:u[0]&&u[0].segmentIndex||0,startTime:i}
l=0}for(var m=l;m<u.length;m++){var g=u[m]
o-=g.duration
if(s){if(o>0)continue}else if(o-Yl>=0)continue
return{partIndex:g.partIndex,segmentIndex:g.segmentIndex,startTime:a+hc({defaultDuration:t.targetDuration,durationList:u,startIndex:l,endIndex:m})}}return{segmentIndex:u[u.length-1].segmentIndex,partIndex:u[u.length-1].partIndex,startTime:i}},isEnabled:gc,isDisabled:function(e){return e.disabled},isBlacklisted:fc,isIncompatible:mc,playlistEnd:pc,isAes:function(e){for(var t=0;t<e.segments.length;t++)if(e.segments[t].key)return!0
return!1},hasAttribute:vc,estimateSegmentRequestTime:function(e,t,i,n){void 0===n&&(n=0)
return vc("BANDWIDTH",i)?(e*i.attributes.BANDWIDTH-8*n)/t:NaN},isLowestEnabledRendition:yc,isAudioOnly:Tc,playlistMatch:_c,segmentDurationWithParts:ac},kc=ql.log,Ec=function(e,t){return e+"-"+t},Cc=function(e,t){e.mediaGroups&&["AUDIO","SUBTITLES"].forEach((function(i){if(e.mediaGroups[i])for(var n in e.mediaGroups[i])for(var r in e.mediaGroups[i][n]){var a=e.mediaGroups[i][n][r]
t(a,i,n,r)}}))},wc=function(e){var t=e.playlist,i=e.uri,n=e.id
t.id=n
t.playlistErrors_=0
i&&(t.uri=i)
t.attributes=t.attributes||{}},Ic=function(e,t){e.uri=t
for(var i=0;i<e.playlists.length;i++)if(!e.playlists[i].uri){var n="placeholder-uri-"+i
e.playlists[i].uri=n}var r=Tc(e)
Cc(e,(function(t,i,n,a){var s="placeholder-uri-"+i+"-"+n+"-"+a
if(!t.playlists||!t.playlists.length){if(r&&"AUDIO"===i&&!t.uri)for(var o=0;o<e.playlists.length;o++){var u=e.playlists[o]
if(u.attributes&&u.attributes.AUDIO&&u.attributes.AUDIO===n)return}t.playlists=[R({},t)]}t.playlists.forEach((function(t,i){var n=Ec(i,s)
if(t.uri)t.resolvedUri=t.resolvedUri||zl(e.uri,t.uri)
else{t.uri=0===i?s:n
t.resolvedUri=t.uri}t.id=t.id||n
t.attributes=t.attributes||{}
e.playlists[t.id]=t
e.playlists[t.uri]=t}))}))
!function(e){for(var t=e.playlists.length;t--;){var i=e.playlists[t]
wc({playlist:i,id:Ec(t,i.uri)})
i.resolvedUri=zl(e.uri,i.uri)
e.playlists[i.id]=i
e.playlists[i.uri]=i
i.attributes.BANDWIDTH||kc.warn("Invalid playlist STREAM-INF detected. Missing BANDWIDTH attribute.")}}(e)
!function(e){Cc(e,(function(t){t.uri&&(t.resolvedUri=zl(e.uri,t.uri))}))}(e)},Pc=ql.mergeOptions,xc=ql.EventTarget,Ac=function(e,t){if(!e)return t
var i=Pc(e,t)
e.preloadHints&&!t.preloadHints&&delete i.preloadHints
if(e.parts&&!t.parts)delete i.parts
else if(e.parts&&t.parts)for(var n=0;n<t.parts.length;n++)e.parts&&e.parts[n]&&(i.parts[n]=Pc(e.parts[n],t.parts[n]))
!e.skipped&&t.skipped&&(i.skipped=!1)
e.preload&&!t.preload&&(i.preload=!1)
return i},Oc=function(e,t){!e.resolvedUri&&e.uri&&(e.resolvedUri=zl(t,e.uri))
e.key&&!e.key.resolvedUri&&(e.key.resolvedUri=zl(t,e.key.uri))
e.map&&!e.map.resolvedUri&&(e.map.resolvedUri=zl(t,e.map.uri))
e.map&&e.map.key&&!e.map.key.resolvedUri&&(e.map.key.resolvedUri=zl(t,e.map.key.uri))
e.parts&&e.parts.length&&e.parts.forEach((function(e){e.resolvedUri||(e.resolvedUri=zl(t,e.uri))}))
e.preloadHints&&e.preloadHints.length&&e.preloadHints.forEach((function(e){e.resolvedUri||(e.resolvedUri=zl(t,e.uri))}))},Lc=function(e){var t=e.segments||[],i=e.preloadSegment
if(i&&i.parts&&i.parts.length){if(i.preloadHints)for(var n=0;n<i.preloadHints.length;n++)if("MAP"===i.preloadHints[n].type)return t
i.duration=e.targetDuration
i.preload=!0
t.push(i)}return t},Dc=function(e,t){return e===t||e.segments&&t.segments&&e.segments.length===t.segments.length&&e.endList===t.endList&&e.mediaSequence===t.mediaSequence&&e.preloadSegment===t.preloadSegment},Rc=function(e,t,i){void 0===i&&(i=Dc)
var n=Pc(e,{}),r=n.playlists[t.id]
if(!r)return null
if(i(r,t))return null
t.segments=Lc(t)
var a=Pc(r,t)
a.preloadSegment&&!t.preloadSegment&&delete a.preloadSegment
if(r.segments){if(t.skip){t.segments=t.segments||[]
for(var s=0;s<t.skip.skippedSegments;s++)t.segments.unshift({skipped:!0})}a.segments=function(e,t,i){var n=e.slice(),r=t.slice()
i=i||0
for(var a,s=[],o=0;o<r.length;o++){var u=n[o+i],l=r[o]
if(u){a=u.map||a
s.push(Ac(u,l))}else{a&&!l.map&&(l.map=a)
s.push(l)}}return s}(r.segments,t.segments,t.mediaSequence-r.mediaSequence)}a.segments.forEach((function(e){Oc(e,a.resolvedUri)}))
for(var o=0;o<n.playlists.length;o++)n.playlists[o].id===t.id&&(n.playlists[o]=a)
n.playlists[t.id]=a
n.playlists[t.uri]=a
Cc(e,(function(e,i,n,r){if(e.playlists)for(var a=0;a<e.playlists.length;a++)t.id===e.playlists[a].id&&(e.playlists[a]=t)}))
return n},Mc=function(e,t){var i=e.segments||[],n=i[i.length-1],r=n&&n.parts&&n.parts[n.parts.length-1],a=r&&r.duration||n&&n.duration
return t&&a?1e3*a:500*(e.partTargetDuration||e.targetDuration||10)},Nc=function(e){B(t,e)
function t(t,i,n){var r
void 0===n&&(n={})
r=e.call(this)||this
if(!t)throw new Error("A non-empty playlist URL or object is required")
r.logger_=Xl("PlaylistLoader")
var a=n,s=a.withCredentials,o=void 0!==s&&s,u=a.handleManifestRedirects,l=void 0!==u&&u
r.src=t
r.vhs_=i
r.withCredentials=o
r.handleManifestRedirects=l
var c=i.options_
r.customTagParsers=c&&c.customTagParsers||[]
r.customTagMappers=c&&c.customTagMappers||[]
r.experimentalLLHLS=c&&c.experimentalLLHLS||!1
ql.browser.IE_VERSION&&(r.experimentalLLHLS=!1)
r.state="HAVE_NOTHING"
r.handleMediaupdatetimeout_=r.handleMediaupdatetimeout_.bind(N(r))
r.on("mediaupdatetimeout",r.handleMediaupdatetimeout_)
return r}var i=t.prototype
i.handleMediaupdatetimeout_=function(){var e=this
if("HAVE_METADATA"===this.state){var t=this.media(),i=zl(this.master.uri,t.uri)
this.experimentalLLHLS&&(i=function(e,t){if(t.endList||!t.serverControl)return e
var i={}
if(t.serverControl.canBlockReload){var n=t.preloadSegment,r=t.mediaSequence+t.segments.length
if(n){var a=n.parts||[],s=uc(t)-1
s>-1&&s!==a.length-1&&(i._HLS_part=s);(s>-1||a.length)&&r--}i._HLS_msn=r}t.serverControl&&t.serverControl.canSkipUntil&&(i._HLS_skip=t.serverControl.canSkipDateranges?"v2":"YES")
if(Object.keys(i).length){var o=new x.URL(e);["_HLS_skip","_HLS_msn","_HLS_part"].forEach((function(e){i.hasOwnProperty(e)&&o.searchParams.set(e,i[e])}))
e=o.toString()}return e}(i,t))
this.state="HAVE_CURRENT_METADATA"
this.request=this.vhs_.xhr({uri:i,withCredentials:this.withCredentials},(function(t,i){if(e.request){if(t)return e.playlistRequestError(e.request,e.media(),"HAVE_METADATA")
e.haveMetadata({playlistString:e.request.responseText,url:e.media().uri,id:e.media().id})}}))}}
i.playlistRequestError=function(e,t,i){var n=t.uri,r=t.id
this.request=null
i&&(this.state=i)
this.error={playlist:this.master.playlists[r],status:e.status,message:"HLS playlist request error at URL: "+n+".",responseText:e.responseText,code:e.status>=500?4:2}
this.trigger("error")}
i.parseManifest_=function(e){var t=this,i=e.url
return function(e){var t=e.onwarn,i=e.oninfo,n=e.manifestString,r=e.customTagParsers,a=void 0===r?[]:r,s=e.customTagMappers,o=void 0===s?[]:s,u=e.experimentalLLHLS,l=new je
t&&l.on("warn",t)
i&&l.on("info",i)
a.forEach((function(e){return l.addParser(e)}))
o.forEach((function(e){return l.addTagMapper(e)}))
l.push(n)
l.end()
var c=l.manifest
if(!u){["preloadSegment","skip","serverControl","renditionReports","partInf","partTargetDuration"].forEach((function(e){c.hasOwnProperty(e)&&delete c[e]}))
c.segments&&c.segments.forEach((function(e){["parts","preloadHints"].forEach((function(t){e.hasOwnProperty(t)&&delete e[t]}))}))}if(!c.targetDuration){var d=10
c.segments&&c.segments.length&&(d=c.segments.reduce((function(e,t){return Math.max(e,t.duration)}),0))
t&&t("manifest has no targetDuration defaulting to "+d)
c.targetDuration=d}var h=oc(c)
if(h.length&&!c.partTargetDuration){var p=h.reduce((function(e,t){return Math.max(e,t.duration)}),0)
if(t){t("manifest has no partTargetDuration defaulting to "+p)
kc.error("LL-HLS manifest has parts but lacks required #EXT-X-PART-INF:PART-TARGET value. See https://datatracker.ietf.org/doc/html/draft-pantos-hls-rfc8216bis-09#section-4.4.3.7. Playback is not guaranteed.")}c.partTargetDuration=p}return c}({onwarn:function(e){var n=e.message
return t.logger_("m3u8-parser warn for "+i+": "+n)},oninfo:function(e){var n=e.message
return t.logger_("m3u8-parser info for "+i+": "+n)},manifestString:e.manifestString,customTagParsers:this.customTagParsers,customTagMappers:this.customTagMappers,experimentalLLHLS:this.experimentalLLHLS})}
i.haveMetadata=function(e){var t=e.playlistString,i=e.playlistObject,n=e.url,r=e.id
this.request=null
this.state="HAVE_METADATA"
var a=i||this.parseManifest_({url:n,manifestString:t})
a.lastRequest=Date.now()
wc({playlist:a,uri:n,id:r})
var s=Rc(this.master,a)
this.targetDuration=a.partTargetDuration||a.targetDuration
this.pendingMedia_=null
if(s){this.master=s
this.media_=this.master.playlists[r]}else this.trigger("playlistunchanged")
this.updateMediaUpdateTimeout_(Mc(this.media(),!!s))
this.trigger("loadedplaylist")}
i.dispose=function(){this.trigger("dispose")
this.stopRequest()
x.clearTimeout(this.mediaUpdateTimeout)
x.clearTimeout(this.finalRenditionTimeout)
this.off()}
i.stopRequest=function(){if(this.request){var e=this.request
this.request=null
e.onreadystatechange=null
e.abort()}}
i.media=function(e,t){var i=this
if(!e)return this.media_
if("HAVE_NOTHING"===this.state)throw new Error("Cannot switch media playlist from "+this.state)
if("string"==typeof e){if(!this.master.playlists[e])throw new Error("Unknown playlist URI: "+e)
e=this.master.playlists[e]}x.clearTimeout(this.finalRenditionTimeout)
if(t){var n=(e.partTargetDuration||e.targetDuration)/2*1e3||5e3
this.finalRenditionTimeout=x.setTimeout(this.media.bind(this,e,!1),n)}else{var r=this.state,a=!this.media_||e.id!==this.media_.id,s=this.master.playlists[e.id]
if(s&&s.endList||e.endList&&e.segments.length){if(this.request){this.request.onreadystatechange=null
this.request.abort()
this.request=null}this.state="HAVE_METADATA"
this.media_=e
if(a){this.trigger("mediachanging")
"HAVE_MASTER"===r?this.trigger("loadedmetadata"):this.trigger("mediachange")}}else{this.updateMediaUpdateTimeout_(Mc(e,!0))
if(a){this.state="SWITCHING_MEDIA"
if(this.request){if(e.resolvedUri===this.request.url)return
this.request.onreadystatechange=null
this.request.abort()
this.request=null}this.media_&&this.trigger("mediachanging")
this.pendingMedia_=e
this.request=this.vhs_.xhr({uri:e.resolvedUri,withCredentials:this.withCredentials},(function(t,n){if(i.request){e.lastRequest=Date.now()
e.resolvedUri=Kl(i.handleManifestRedirects,e.resolvedUri,n)
if(t)return i.playlistRequestError(i.request,e,r)
i.haveMetadata({playlistString:n.responseText,url:e.uri,id:e.id})
"HAVE_MASTER"===r?i.trigger("loadedmetadata"):i.trigger("mediachange")}}))}}}}
i.pause=function(){if(this.mediaUpdateTimeout){x.clearTimeout(this.mediaUpdateTimeout)
this.mediaUpdateTimeout=null}this.stopRequest()
"HAVE_NOTHING"===this.state&&(this.started=!1)
"SWITCHING_MEDIA"===this.state?this.media_?this.state="HAVE_METADATA":this.state="HAVE_MASTER":"HAVE_CURRENT_METADATA"===this.state&&(this.state="HAVE_METADATA")}
i.load=function(e){var t=this
if(this.mediaUpdateTimeout){x.clearTimeout(this.mediaUpdateTimeout)
this.mediaUpdateTimeout=null}var i=this.media()
if(e){var n=i?(i.partTargetDuration||i.targetDuration)/2*1e3:5e3
this.mediaUpdateTimeout=x.setTimeout((function(){t.mediaUpdateTimeout=null
t.load()}),n)}else this.started?i&&!i.endList?this.trigger("mediaupdatetimeout"):this.trigger("loadedplaylist"):this.start()}
i.updateMediaUpdateTimeout_=function(e){var t=this
if(this.mediaUpdateTimeout){x.clearTimeout(this.mediaUpdateTimeout)
this.mediaUpdateTimeout=null}this.media()&&!this.media().endList&&(this.mediaUpdateTimeout=x.setTimeout((function(){t.mediaUpdateTimeout=null
t.trigger("mediaupdatetimeout")
t.updateMediaUpdateTimeout_(e)}),e))}
i.start=function(){var e=this
this.started=!0
if("object"!=typeof this.src)this.request=this.vhs_.xhr({uri:this.src,withCredentials:this.withCredentials},(function(t,i){if(e.request){e.request=null
if(t){e.error={status:i.status,message:"HLS playlist request error at URL: "+e.src+".",responseText:i.responseText,code:2}
"HAVE_NOTHING"===e.state&&(e.started=!1)
return e.trigger("error")}e.src=Kl(e.handleManifestRedirects,e.src,i)
var n=e.parseManifest_({manifestString:i.responseText,url:e.src})
e.setupInitialPlaylist(n)}}))
else{this.src.uri||(this.src.uri=x.location.href)
this.src.resolvedUri=this.src.uri
setTimeout((function(){e.setupInitialPlaylist(e.src)}),0)}}
i.srcUri=function(){return"string"==typeof this.src?this.src:this.src.uri}
i.setupInitialPlaylist=function(e){this.state="HAVE_MASTER"
if(e.playlists){this.master=e
Ic(this.master,this.srcUri())
e.playlists.forEach((function(e){e.segments=Lc(e)
e.segments.forEach((function(t){Oc(t,e.resolvedUri)}))}))
this.trigger("loadedplaylist")
this.request||this.media(this.master.playlists[0])}else{var t=this.srcUri()||x.location.href
this.master=function(e,t){var i=Ec(0,t),n={mediaGroups:{AUDIO:{},VIDEO:{},"CLOSED-CAPTIONS":{},SUBTITLES:{}},uri:x.location.href,resolvedUri:x.location.href,playlists:[{uri:t,id:i,resolvedUri:t,attributes:{}}]}
n.playlists[i]=n.playlists[0]
n.playlists[t]=n.playlists[0]
return n}(0,t)
this.haveMetadata({playlistObject:e,url:t,id:this.master.playlists[0].id})
this.trigger("loadedmetadata")}}
return t}(xc),Uc=ql.xhr,Bc=ql.mergeOptions,Fc=function(e,t,i,n){var r="arraybuffer"===e.responseType?e.response:e.responseText
if(!t&&r){e.responseTime=Date.now()
e.roundTripTime=e.responseTime-e.requestTime
e.bytesReceived=r.byteLength||r.length
e.bandwidth||(e.bandwidth=Math.floor(e.bytesReceived/e.roundTripTime*8*1e3))}i.headers&&(e.responseHeaders=i.headers)
t&&"ETIMEDOUT"===t.code&&(e.timedout=!0)
t||e.aborted||200===i.statusCode||206===i.statusCode||0===i.statusCode||(t=new Error("XHR Failed with a response of: "+(e&&(r||e.responseText))))
n(t,e)},jc=function(){var e=function e(t,i){t=Bc({timeout:45e3},t)
var n=e.beforeRequest||ql.Vhs.xhr.beforeRequest
if(n&&"function"==typeof n){var r=n(t)
r&&(t=r)}var a=(!0===ql.Vhs.xhr.original?Uc:ql.Vhs.xhr)(t,(function(e,t){return Fc(a,e,t,i)})),s=a.abort
a.abort=function(){a.aborted=!0
return s.apply(a,arguments)}
a.uri=t.uri
a.requestTime=Date.now()
return a}
e.original=!0
return e},Vc=function(e){var t,i={}
e.byterange&&(i.Range="bytes="+(t=e.byterange).offset+"-"+("bigint"==typeof t.offset||"bigint"==typeof t.length?x.BigInt(t.offset)+x.BigInt(t.length)-x.BigInt(1):t.offset+t.length-1))
return i},Hc=function(e,t){return e.start(t)+"-"+e.end(t)},qc=function(e,t){var i=e.toString(16)
return"00".substring(0,2-i.length)+i+(t%2?" ":"")},Wc=function(e){return e>=32&&e<126?String.fromCharCode(e):"."},Gc=function(e){var t={}
Object.keys(e).forEach((function(i){var n=e[i]
ArrayBuffer.isView(n)?t[i]={bytes:n.buffer,byteOffset:n.byteOffset,byteLength:n.byteLength}:t[i]=n}))
return t},zc=function(e){var t=e.byterange||{length:1/0,offset:0}
return[t.length,t.offset,e.resolvedUri].join(",")},Kc=function(e){return e.resolvedUri},Xc=function(e){for(var t=Array.prototype.slice.call(e),i=16,n="",r=0;r<t.length/i;r++)n+=t.slice(r*i,r*i+i).map(qc).join("")+" "+t.slice(r*i,r*i+i).map(Wc).join("")+"\n"
return n},Yc=Object.freeze({__proto__:null,createTransferableMessage:Gc,initSegmentId:zc,segmentKeyId:Kc,hexDump:Xc,tagDump:function(e){var t=e.bytes
return Xc(t)},textRanges:function(e){var t,i=""
for(t=0;t<e.length;t++)i+=Hc(e,t)+" "
return i}}),Qc=function(e){var t=e.playlist,i=e.time,n=void 0===i?void 0:i,r=e.callback
if(!r)throw new Error("getProgramTime: callback must be provided")
if(!t||void 0===n)return r({message:"getProgramTime: playlist and time must be provided"})
var a=function(e,t){if(!t||!t.segments||0===t.segments.length)return null
for(var i,n=0,r=0;r<t.segments.length&&!(e<=(n=(i=t.segments[r]).videoTimingInfo?i.videoTimingInfo.transmuxedPresentationEnd:n+i.duration));r++);var a=t.segments[t.segments.length-1]
if(a.videoTimingInfo&&a.videoTimingInfo.transmuxedPresentationEnd<e)return null
if(e>n){if(e>n+.25*a.duration)return null
i=a}return{segment:i,estimatedStart:i.videoTimingInfo?i.videoTimingInfo.transmuxedPresentationStart:n-i.duration,type:i.videoTimingInfo?"accurate":"estimate"}}(n,t)
if(!a)return r({message:"valid programTime was not found"})
if("estimate"===a.type)return r({message:"Accurate programTime could not be determined. Please seek to e.seekTime and try again",seekTime:a.estimatedStart})
var s={mediaSeconds:n},o=function(e,t){if(!t.dateTimeObject)return null
var i=t.videoTimingInfo.transmuxerPrependedSeconds,n=e-(t.videoTimingInfo.transmuxedPresentationStart+i)
return new Date(t.dateTimeObject.getTime()+1e3*n)}(n,a.segment)
o&&(s.programDateTime=o.toISOString())
return r(null,s)},$c=function e(t){var i=t.programTime,n=t.playlist,r=t.retryCount,a=void 0===r?2:r,s=t.seekTo,o=t.pauseAfterSeek,u=void 0===o||o,l=t.tech,c=t.callback
if(!c)throw new Error("seekToProgramTime: callback must be provided")
if(void 0===i||!n||!s)return c({message:"seekToProgramTime: programTime, seekTo and playlist must be provided"})
if(!n.endList&&!l.hasStarted_)return c({message:"player must be playing a live stream to start buffering"})
if(!function(e){if(!e.segments||0===e.segments.length)return!1
for(var t=0;t<e.segments.length;t++)if(!e.segments[t].dateTimeObject)return!1
return!0}(n))return c({message:"programDateTime tags must be provided in the manifest "+n.resolvedUri})
var d=function(e,t){var i
try{i=new Date(e)}catch(e){return null}if(!t||!t.segments||0===t.segments.length)return null
var n=t.segments[0]
if(i<n.dateTimeObject)return null
for(var r=0;r<t.segments.length-1;r++){n=t.segments[r]
if(i<t.segments[r+1].dateTimeObject)break}var a,s=t.segments[t.segments.length-1],o=s.dateTimeObject,u=s.videoTimingInfo?(a=s.videoTimingInfo).transmuxedPresentationEnd-a.transmuxedPresentationStart-a.transmuxerPrependedSeconds:s.duration+.25*s.duration
if(i>new Date(o.getTime()+1e3*u))return null
i>o&&(n=s)
return{segment:n,estimatedStart:n.videoTimingInfo?n.videoTimingInfo.transmuxedPresentationStart:Sc.duration(t,t.mediaSequence+t.segments.indexOf(n)),type:n.videoTimingInfo?"accurate":"estimate"}}(i,n)
if(!d)return c({message:i+" was not found in the stream"})
var h=d.segment,p=function(e,t){var i,n
try{i=new Date(e)
n=new Date(t)}catch(e){}var r=i.getTime()
return(n.getTime()-r)/1e3}(h.dateTimeObject,i)
if("estimate"!==d.type){var f=h.start+p
l.one("seeked",(function(){return c(null,l.currentTime())}))
u&&l.pause()
s(f)}else{if(0===a)return c({message:i+" is not buffered yet. Try again"})
s(d.estimatedStart+p)
l.one("seeked",(function(){e({programTime:i,playlist:n,retryCount:a-1,seekTo:s,pauseAfterSeek:u,tech:l,callback:c})}))}},Jc=function(e,t){if(4===e.readyState)return t()},Zc=function(e,t,i){var n,r=[],a=!1,s=function(e,t,n,r){t.abort()
a=!0
return i(e,t,n,r)},o=function(e,t){if(!a){if(e)return s(e,t,"",r)
var i=t.responseText.substring(r&&r.byteLength||0,t.responseText.length)
r=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i]
if((t=t.filter((function(e){return e&&(e.byteLength||e.length)&&"string"!=typeof e}))).length<=1)return Kn(t[0])
var n=t.reduce((function(e,t,i){return e+(t.byteLength||t.length)}),0),r=new Uint8Array(n),a=0
t.forEach((function(e){e=Kn(e)
r.set(e,a)
a+=e.byteLength}))
return r}(r,Jn(i,!0))
n=n||tr(r)
if(r.length<10||n&&r.length<n+2)return Jc(t,(function(){return s(e,t,"",r)}))
var o=kr(r)
return"ts"===o&&r.length<188||!o&&r.length<376?Jc(t,(function(){return s(e,t,"",r)})):s(null,t,o,r)}},u={uri:e,beforeSend:function(e){e.overrideMimeType("text/plain; charset=x-user-defined")
e.addEventListener("progress",(function(t){t.total
t.loaded
return Fc(e,null,{statusCode:e.status},o)}))}},l=t(u,(function(e,t){return Fc(l,e,t,o)}))
return l},ed=ql.EventTarget,td=ql.mergeOptions,id=function(e,t){if(!Dc(e,t))return!1
if(e.sidx&&t.sidx&&(e.sidx.offset!==t.sidx.offset||e.sidx.length!==t.sidx.length))return!1
if(!e.sidx&&t.sidx||e.sidx&&!t.sidx)return!1
if(e.segments&&!t.segments||!e.segments&&t.segments)return!1
if(!e.segments&&!t.segments)return!0
for(var i=0;i<e.segments.length;i++){var n=e.segments[i],r=t.segments[i]
if(n.uri!==r.uri)return!1
if(n.byterange||r.byterange){var a=n.byterange,s=r.byterange
if(a&&!s||!a&&s)return!1
if(a.offset!==s.offset||a.length!==s.length)return!1}}return!0},nd=function(e,t){var i,n,r={}
for(var a in e){var s=e[a].sidx
if(s){var o=pn(s)
if(!t[o])break
var u=t[o].sidxInfo;(i=u,n=s,(Boolean(!i.map&&!n.map)||Boolean(i.map&&n.map&&i.map.byterange.offset===n.map.byterange.offset&&i.map.byterange.length===n.map.byterange.length))&&i.uri===n.uri&&i.byterange.offset===n.byterange.offset&&i.byterange.length===n.byterange.length)&&(r[o]=t[o])}}return r},rd=function(e){B(t,e)
function t(t,i,n,r){var a
void 0===n&&(n={});(a=e.call(this)||this).masterPlaylistLoader_=r||N(a)
r||(a.isMaster_=!0)
var s=n,o=s.withCredentials,u=void 0!==o&&o,l=s.handleManifestRedirects,c=void 0!==l&&l
a.vhs_=i
a.withCredentials=u
a.handleManifestRedirects=c
if(!t)throw new Error("A non-empty playlist URL or object is required")
a.on("minimumUpdatePeriod",(function(){a.refreshXml_()}))
a.on("mediaupdatetimeout",(function(){a.refreshMedia_(a.media().id)}))
a.state="HAVE_NOTHING"
a.loadedPlaylists_={}
a.logger_=Xl("DashPlaylistLoader")
if(a.isMaster_){a.masterPlaylistLoader_.srcUrl=t
a.masterPlaylistLoader_.sidxMapping_={}}else a.childPlaylist_=t
return a}var i=t.prototype
i.requestErrored_=function(e,t,i){if(!this.request)return!0
this.request=null
if(e){this.error="object"!=typeof e||e instanceof Error?{status:t.status,message:"DASH request error at URL: "+t.uri,response:t.response,code:2}:e
i&&(this.state=i)
this.trigger("error")
return!0}}
i.addSidxSegments_=function(e,t,i){var n=this,r=e.sidx&&pn(e.sidx)
if(e.sidx&&r&&!this.masterPlaylistLoader_.sidxMapping_[r]){var a=Kl(this.handleManifestRedirects,e.sidx.resolvedUri),s=function(a,s){if(!n.requestErrored_(a,s,t)){var o,u=n.masterPlaylistLoader_.sidxMapping_
try{o=Gn(Kn(s.response).subarray(8))}catch(e){n.requestErrored_(e,s,t)
return}u[r]={sidxInfo:e.sidx,sidx:o}
sn(e,o,e.sidx.resolvedUri)
return i(!0)}}
this.request=Zc(a,this.vhs_.xhr,(function(t,i,r,o){if(t)return s(t,i)
if(!r||"mp4"!==r)return s({status:i.status,message:"Unsupported "+(r||"unknown")+" container type for sidx segment at URL: "+a,response:"",playlist:e,internal:!0,blacklistDuration:1/0,code:2},i)
var u=e.sidx.byterange,l=u.offset,c=u.length
if(o.length>=c+l)return s(t,{response:o.subarray(l,l+c),status:i.status,uri:i.uri})
n.request=n.vhs_.xhr({uri:a,responseType:"arraybuffer",headers:Vc({byterange:e.sidx.byterange})},s)}))}else this.mediaRequest_=x.setTimeout((function(){return i(!1)}),0)}
i.dispose=function(){this.trigger("dispose")
this.stopRequest()
this.loadedPlaylists_={}
x.clearTimeout(this.minimumUpdatePeriodTimeout_)
x.clearTimeout(this.mediaRequest_)
x.clearTimeout(this.mediaUpdateTimeout)
this.mediaUpdateTimeout=null
this.mediaRequest_=null
this.minimumUpdatePeriodTimeout_=null
if(this.masterPlaylistLoader_.createMupOnMedia_){this.off("loadedmetadata",this.masterPlaylistLoader_.createMupOnMedia_)
this.masterPlaylistLoader_.createMupOnMedia_=null}this.off()}
i.hasPendingRequest=function(){return this.request||this.mediaRequest_}
i.stopRequest=function(){if(this.request){var e=this.request
this.request=null
e.onreadystatechange=null
e.abort()}}
i.media=function(e){var t=this
if(!e)return this.media_
if("HAVE_NOTHING"===this.state)throw new Error("Cannot switch media playlist from "+this.state)
var i=this.state
if("string"==typeof e){if(!this.masterPlaylistLoader_.master.playlists[e])throw new Error("Unknown playlist URI: "+e)
e=this.masterPlaylistLoader_.master.playlists[e]}var n=!this.media_||e.id!==this.media_.id
if(n&&this.loadedPlaylists_[e.id]&&this.loadedPlaylists_[e.id].endList){this.state="HAVE_METADATA"
this.media_=e
if(n){this.trigger("mediachanging")
this.trigger("mediachange")}}else if(n){this.media_&&this.trigger("mediachanging")
this.addSidxSegments_(e,i,(function(n){t.haveMetadata({startingState:i,playlist:e})}))}}
i.haveMetadata=function(e){var t=e.startingState,i=e.playlist
this.state="HAVE_METADATA"
this.loadedPlaylists_[i.id]=i
this.mediaRequest_=null
this.refreshMedia_(i.id)
"HAVE_MASTER"===t?this.trigger("loadedmetadata"):this.trigger("mediachange")}
i.pause=function(){if(this.masterPlaylistLoader_.createMupOnMedia_){this.off("loadedmetadata",this.masterPlaylistLoader_.createMupOnMedia_)
this.masterPlaylistLoader_.createMupOnMedia_=null}this.stopRequest()
x.clearTimeout(this.mediaUpdateTimeout)
this.mediaUpdateTimeout=null
if(this.isMaster_){x.clearTimeout(this.masterPlaylistLoader_.minimumUpdatePeriodTimeout_)
this.masterPlaylistLoader_.minimumUpdatePeriodTimeout_=null}"HAVE_NOTHING"===this.state&&(this.started=!1)}
i.load=function(e){var t=this
x.clearTimeout(this.mediaUpdateTimeout)
this.mediaUpdateTimeout=null
var i=this.media()
if(e){var n=i?i.targetDuration/2*1e3:5e3
this.mediaUpdateTimeout=x.setTimeout((function(){return t.load()}),n)}else if(this.started)if(i&&!i.endList){if(this.isMaster_&&!this.minimumUpdatePeriodTimeout_){this.trigger("minimumUpdatePeriod")
this.updateMinimumUpdatePeriodTimeout_()}this.trigger("mediaupdatetimeout")}else this.trigger("loadedplaylist")
else this.start()}
i.start=function(){var e=this
this.started=!0
this.isMaster_?this.requestMaster_((function(t,i){e.haveMaster_()
e.hasPendingRequest()||e.media_||e.media(e.masterPlaylistLoader_.master.playlists[0])})):this.mediaRequest_=x.setTimeout((function(){return e.haveMaster_()}),0)}
i.requestMaster_=function(e){var t=this
this.request=this.vhs_.xhr({uri:this.masterPlaylistLoader_.srcUrl,withCredentials:this.withCredentials},(function(i,n){if(t.requestErrored_(i,n))"HAVE_NOTHING"===t.state&&(t.started=!1)
else{var r=n.responseText!==t.masterPlaylistLoader_.masterXml_
t.masterPlaylistLoader_.masterXml_=n.responseText
n.responseHeaders&&n.responseHeaders.date?t.masterLoaded_=Date.parse(n.responseHeaders.date):t.masterLoaded_=Date.now()
t.masterPlaylistLoader_.srcUrl=Kl(t.handleManifestRedirects,t.masterPlaylistLoader_.srcUrl,n)
if(!r)return e(n,r)
t.handleMaster_()
t.syncClientServerClock_((function(){return e(n,r)}))}}))}
i.syncClientServerClock_=function(e){var t=this,i=Hn(this.masterPlaylistLoader_.masterXml_)
if(null===i){this.masterPlaylistLoader_.clientOffset_=this.masterLoaded_-Date.now()
return e()}if("DIRECT"===i.method){this.masterPlaylistLoader_.clientOffset_=i.value-Date.now()
return e()}this.request=this.vhs_.xhr({uri:zl(this.masterPlaylistLoader_.srcUrl,i.value),method:i.method,withCredentials:this.withCredentials},(function(n,r){if(t.request){if(n){t.masterPlaylistLoader_.clientOffset_=t.masterLoaded_-Date.now()
return e()}var a
a="HEAD"===i.method?r.responseHeaders&&r.responseHeaders.date?Date.parse(r.responseHeaders.date):t.masterLoaded_:Date.parse(r.responseText)
t.masterPlaylistLoader_.clientOffset_=a-Date.now()
e()}}))}
i.haveMaster_=function(){this.state="HAVE_MASTER"
this.isMaster_?this.trigger("loadedplaylist"):this.media_||this.media(this.childPlaylist_)}
i.handleMaster_=function(){this.mediaRequest_=null
var e=this.masterPlaylistLoader_.master,t=function(e){var t=e.masterXml,i=e.srcUrl,n=e.clientOffset,r=e.sidxMapping,a=e.previousManifest,s=Vn(t,{manifestUri:i,clientOffset:n,sidxMapping:r,previousManifest:a})
Ic(s,i)
return s}({masterXml:this.masterPlaylistLoader_.masterXml_,srcUrl:this.masterPlaylistLoader_.srcUrl,clientOffset:this.masterPlaylistLoader_.clientOffset_,sidxMapping:this.masterPlaylistLoader_.sidxMapping_,previousManifest:e})
e&&(t=function(e,t,i){for(var n=!0,r=td(e,{duration:t.duration,minimumUpdatePeriod:t.minimumUpdatePeriod,timelineStarts:t.timelineStarts}),a=0;a<t.playlists.length;a++){var s=t.playlists[a]
if(s.sidx){var o=pn(s.sidx)
i&&i[o]&&i[o].sidx&&sn(s,i[o].sidx,s.sidx.resolvedUri)}var u=Rc(r,s,id)
if(u){r=u
n=!1}}Cc(t,(function(e,t,i,a){if(e.playlists&&e.playlists.length){var s=e.playlists[0].id,o=Rc(r,e.playlists[0],id)
if(o){(r=o).mediaGroups[t][i][a].playlists[0]=r.playlists[s]
n=!1}}}))
t.minimumUpdatePeriod!==e.minimumUpdatePeriod&&(n=!1)
return n?null:r}(e,t,this.masterPlaylistLoader_.sidxMapping_))
this.masterPlaylistLoader_.master=t||e
var i=this.masterPlaylistLoader_.master.locations&&this.masterPlaylistLoader_.master.locations[0]
i&&i!==this.masterPlaylistLoader_.srcUrl&&(this.masterPlaylistLoader_.srcUrl=i);(!e||t&&t.minimumUpdatePeriod!==e.minimumUpdatePeriod)&&this.updateMinimumUpdatePeriodTimeout_()
return Boolean(t)}
i.updateMinimumUpdatePeriodTimeout_=function(){var e=this.masterPlaylistLoader_
if(e.createMupOnMedia_){e.off("loadedmetadata",e.createMupOnMedia_)
e.createMupOnMedia_=null}if(e.minimumUpdatePeriodTimeout_){x.clearTimeout(e.minimumUpdatePeriodTimeout_)
e.minimumUpdatePeriodTimeout_=null}var t=e.master&&e.master.minimumUpdatePeriod
if(0===t)if(e.media())t=1e3*e.media().targetDuration
else{e.createMupOnMedia_=e.updateMinimumUpdatePeriodTimeout_
e.one("loadedmetadata",e.createMupOnMedia_)}"number"!=typeof t||t<=0?t<0&&this.logger_("found invalid minimumUpdatePeriod of "+t+", not setting a timeout"):this.createMUPTimeout_(t)}
i.createMUPTimeout_=function(e){var t=this.masterPlaylistLoader_
t.minimumUpdatePeriodTimeout_=x.setTimeout((function(){t.minimumUpdatePeriodTimeout_=null
t.trigger("minimumUpdatePeriod")
t.createMUPTimeout_(e)}),e)}
i.refreshXml_=function(){var e=this
this.requestMaster_((function(t,i){if(i){e.media_&&(e.media_=e.masterPlaylistLoader_.master.playlists[e.media_.id])
e.masterPlaylistLoader_.sidxMapping_=function(e,t){var i=nd(e.playlists,t)
Cc(e,(function(e,n,r,a){if(e.playlists&&e.playlists.length){var s=e.playlists
i=td(i,nd(s,t))}}))
return i}(e.masterPlaylistLoader_.master,e.masterPlaylistLoader_.sidxMapping_)
e.addSidxSegments_(e.media(),e.state,(function(t){e.refreshMedia_(e.media().id)}))}}))}
i.refreshMedia_=function(e){var t=this
if(!e)throw new Error("refreshMedia_ must take a media id")
this.media_&&this.isMaster_&&this.handleMaster_()
var i=this.masterPlaylistLoader_.master.playlists,n=!this.media_||this.media_!==i[e]
n?this.media_=i[e]:this.trigger("playlistunchanged")
if(!this.mediaUpdateTimeout){!function e(){t.media().endList||(t.mediaUpdateTimeout=x.setTimeout((function(){t.trigger("mediaupdatetimeout")
e()}),Mc(t.media(),Boolean(n))))}()}this.trigger("loadedplaylist")}
return t}(ed),ad={GOAL_BUFFER_LENGTH:30,MAX_GOAL_BUFFER_LENGTH:60,BACK_BUFFER_LENGTH:30,GOAL_BUFFER_LENGTH_RATE:1,INITIAL_BANDWIDTH:4194304,BANDWIDTH_VARIANCE:1.2,BUFFER_LOW_WATER_LINE:0,MAX_BUFFER_LOW_WATER_LINE:30,EXPERIMENTAL_MAX_BUFFER_LOW_WATER_LINE:16,BUFFER_LOW_WATER_LINE_RATE:1,BUFFER_HIGH_WATER_LINE:30},sd=function(e){e.on=e.addEventListener
e.off=e.removeEventListener
return e},od=function(e){return function(){var t=function(e){try{return URL.createObjectURL(new Blob([e],{type:"application/javascript"}))}catch(i){var t=new BlobBuilder
t.append(e)
return URL.createObjectURL(t.getBlob())}}(e),i=sd(new Worker(t))
i.objURL=t
var n=i.terminate
i.on=i.addEventListener
i.off=i.removeEventListener
i.terminate=function(){URL.revokeObjectURL(t)
return n.call(this)}
return i}},ud=function(e){return"var browserWorkerPolyFill = "+sd.toString()+";\nbrowserWorkerPolyFill(self);\n"+e},ld=function(e){return e.toString().replace(/^function.+?{/,"").slice(0,-1)},cd=ud(ld((function(){var e=function(){this.init=function(){var e={}
this.on=function(t,i){e[t]||(e[t]=[])
e[t]=e[t].concat(i)}
this.off=function(t,i){var n
if(!e[t])return!1
n=e[t].indexOf(i)
e[t]=e[t].slice()
e[t].splice(n,1)
return n>-1}
this.trigger=function(t){var i,n,r,a
if(i=e[t])if(2===arguments.length){r=i.length
for(n=0;n<r;++n)i[n].call(this,arguments[1])}else{a=[]
n=arguments.length
for(n=1;n<arguments.length;++n)a.push(arguments[n])
r=i.length
for(n=0;n<r;++n)i[n].apply(this,a)}}
this.dispose=function(){e={}}}}
e.prototype.pipe=function(e){this.on("data",(function(t){e.push(t)}))
this.on("done",(function(t){e.flush(t)}))
this.on("partialdone",(function(t){e.partialFlush(t)}))
this.on("endedtimeline",(function(t){e.endTimeline(t)}))
this.on("reset",(function(t){e.reset(t)}))
return e}
e.prototype.push=function(e){this.trigger("data",e)}
e.prototype.flush=function(e){this.trigger("done",e)}
e.prototype.partialFlush=function(e){this.trigger("partialdone",e)}
e.prototype.endTimeline=function(e){this.trigger("endedtimeline",e)}
e.prototype.reset=function(e){this.trigger("reset",e)}
var t,i,n,r,a,s,o,u,l,c,d,h,p,f,m,g,v,y,_,b,T,S,k,E,C,w,I,P,x,A,O,L,D,R,M,N,U=e,B=Math.pow(2,32),F={getUint64:function(e){var t,i=new DataView(e.buffer,e.byteOffset,e.byteLength)
return i.getBigUint64?(t=i.getBigUint64(0))<Number.MAX_SAFE_INTEGER?Number(t):t:i.getUint32(0)*B+i.getUint32(4)},MAX_UINT32:B},j=F.MAX_UINT32
!function(){var e
k={avc1:[],avcC:[],btrt:[],dinf:[],dref:[],esds:[],ftyp:[],hdlr:[],mdat:[],mdhd:[],mdia:[],mfhd:[],minf:[],moof:[],moov:[],mp4a:[],mvex:[],mvhd:[],pasp:[],sdtp:[],smhd:[],stbl:[],stco:[],stsc:[],stsd:[],stsz:[],stts:[],styp:[],tfdt:[],tfhd:[],traf:[],trak:[],trun:[],trex:[],tkhd:[],vmhd:[]}
if("undefined"!=typeof Uint8Array){for(e in k)k.hasOwnProperty(e)&&(k[e]=[e.charCodeAt(0),e.charCodeAt(1),e.charCodeAt(2),e.charCodeAt(3)])
E=new Uint8Array(["i".charCodeAt(0),"s".charCodeAt(0),"o".charCodeAt(0),"m".charCodeAt(0)])
w=new Uint8Array(["a".charCodeAt(0),"v".charCodeAt(0),"c".charCodeAt(0),"1".charCodeAt(0)])
C=new Uint8Array([0,0,0,1])
I=new Uint8Array([0,0,0,0,0,0,0,0,118,105,100,101,0,0,0,0,0,0,0,0,0,0,0,0,86,105,100,101,111,72,97,110,100,108,101,114,0])
P=new Uint8Array([0,0,0,0,0,0,0,0,115,111,117,110,0,0,0,0,0,0,0,0,0,0,0,0,83,111,117,110,100,72,97,110,100,108,101,114,0])
x={video:I,audio:P}
L=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,12,117,114,108,32,0,0,0,1])
O=new Uint8Array([0,0,0,0,0,0,0,0])
D=new Uint8Array([0,0,0,0,0,0,0,0])
R=D
M=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0])
N=D
A=new Uint8Array([0,0,0,1,0,0,0,0,0,0,0,0])}}()
t=function(e){var t,i,n=[],r=0
for(t=1;t<arguments.length;t++)n.push(arguments[t])
t=n.length
for(;t--;)r+=n[t].byteLength
i=new Uint8Array(r+8)
new DataView(i.buffer,i.byteOffset,i.byteLength).setUint32(0,i.byteLength)
i.set(e,4)
for(t=0,r=8;t<n.length;t++){i.set(n[t],r)
r+=n[t].byteLength}return i}
i=function(){return t(k.dinf,t(k.dref,L))}
n=function(e){return t(k.esds,new Uint8Array([0,0,0,0,3,25,0,0,0,4,17,64,21,0,6,0,0,0,218,192,0,0,218,192,5,2,e.audioobjecttype<<3|e.samplingfrequencyindex>>>1,e.samplingfrequencyindex<<7|e.channelcount<<3,6,1,2]))}
r=function(){return t(k.ftyp,E,C,E,w)}
g=function(e){return t(k.hdlr,x[e])}
a=function(e){return t(k.mdat,e)}
m=function(e){var i=new Uint8Array([0,0,0,0,0,0,0,2,0,0,0,3,0,1,95,144,e.duration>>>24&255,e.duration>>>16&255,e.duration>>>8&255,255&e.duration,85,196,0,0])
if(e.samplerate){i[12]=e.samplerate>>>24&255
i[13]=e.samplerate>>>16&255
i[14]=e.samplerate>>>8&255
i[15]=255&e.samplerate}return t(k.mdhd,i)}
f=function(e){return t(k.mdia,m(e),g(e.type),o(e))}
s=function(e){return t(k.mfhd,new Uint8Array([0,0,0,0,(4278190080&e)>>24,(16711680&e)>>16,(65280&e)>>8,255&e]))}
o=function(e){return t(k.minf,"video"===e.type?t(k.vmhd,A):t(k.smhd,O),i(),y(e))}
u=function(e,i){for(var n=[],r=i.length;r--;)n[r]=b(i[r])
return t.apply(null,[k.moof,s(e)].concat(n))}
l=function(e){for(var i=e.length,n=[];i--;)n[i]=h(e[i])
return t.apply(null,[k.moov,d(4294967295)].concat(n).concat(c(e)))}
c=function(e){for(var i=e.length,n=[];i--;)n[i]=T(e[i])
return t.apply(null,[k.mvex].concat(n))}
d=function(e){var i=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,2,0,1,95,144,(4278190080&e)>>24,(16711680&e)>>16,(65280&e)>>8,255&e,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255])
return t(k.mvhd,i)}
v=function(e){var i,n,r=e.samples||[],a=new Uint8Array(4+r.length)
for(n=0;n<r.length;n++){i=r[n].flags
a[n+4]=i.dependsOn<<4|i.isDependedOn<<2|i.hasRedundancy}return t(k.sdtp,a)}
y=function(e){return t(k.stbl,_(e),t(k.stts,N),t(k.stsc,R),t(k.stsz,M),t(k.stco,D))}
!function(){var e,i
_=function(n){return t(k.stsd,new Uint8Array([0,0,0,0,0,0,0,1]),"video"===n.type?e(n):i(n))}
e=function(e){var i,n,r=e.sps||[],a=e.pps||[],s=[],o=[]
for(i=0;i<r.length;i++){s.push((65280&r[i].byteLength)>>>8)
s.push(255&r[i].byteLength)
s=s.concat(Array.prototype.slice.call(r[i]))}for(i=0;i<a.length;i++){o.push((65280&a[i].byteLength)>>>8)
o.push(255&a[i].byteLength)
o=o.concat(Array.prototype.slice.call(a[i]))}n=[k.avc1,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,(65280&e.width)>>8,255&e.width,(65280&e.height)>>8,255&e.height,0,72,0,0,0,72,0,0,0,0,0,0,0,1,19,118,105,100,101,111,106,115,45,99,111,110,116,114,105,98,45,104,108,115,0,0,0,0,0,0,0,0,0,0,0,0,0,24,17,17]),t(k.avcC,new Uint8Array([1,e.profileIdc,e.profileCompatibility,e.levelIdc,255].concat([r.length],s,[a.length],o))),t(k.btrt,new Uint8Array([0,28,156,128,0,45,198,192,0,45,198,192]))]
if(e.sarRatio){var u=e.sarRatio[0],l=e.sarRatio[1]
n.push(t(k.pasp,new Uint8Array([(4278190080&u)>>24,(16711680&u)>>16,(65280&u)>>8,255&u,(4278190080&l)>>24,(16711680&l)>>16,(65280&l)>>8,255&l])))}return t.apply(null,n)}
i=function(e){return t(k.mp4a,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,(65280&e.channelcount)>>8,255&e.channelcount,(65280&e.samplesize)>>8,255&e.samplesize,0,0,0,0,(65280&e.samplerate)>>8,255&e.samplerate,0,0]),n(e))}}()
p=function(e){var i=new Uint8Array([0,0,0,7,0,0,0,0,0,0,0,0,(4278190080&e.id)>>24,(16711680&e.id)>>16,(65280&e.id)>>8,255&e.id,0,0,0,0,(4278190080&e.duration)>>24,(16711680&e.duration)>>16,(65280&e.duration)>>8,255&e.duration,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,(65280&e.width)>>8,255&e.width,0,0,(65280&e.height)>>8,255&e.height,0,0])
return t(k.tkhd,i)}
b=function(e){var i,n,r,a,s,o
i=t(k.tfhd,new Uint8Array([0,0,0,58,(4278190080&e.id)>>24,(16711680&e.id)>>16,(65280&e.id)>>8,255&e.id,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0]))
s=Math.floor(e.baseMediaDecodeTime/j)
o=Math.floor(e.baseMediaDecodeTime%j)
n=t(k.tfdt,new Uint8Array([1,0,0,0,s>>>24&255,s>>>16&255,s>>>8&255,255&s,o>>>24&255,o>>>16&255,o>>>8&255,255&o]))
0
if("audio"===e.type){r=S(e,92)
return t(k.traf,i,n,r)}a=v(e)
r=S(e,a.length+92)
return t(k.traf,i,n,r,a)}
h=function(e){e.duration=e.duration||4294967295
return t(k.trak,p(e),f(e))}
T=function(e){var i=new Uint8Array([0,0,0,0,(4278190080&e.id)>>24,(16711680&e.id)>>16,(65280&e.id)>>8,255&e.id,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1])
"video"!==e.type&&(i[i.length-1]=0)
return t(k.trex,i)}
!function(){var e,i,n
n=function(e,t){var i=0,n=0,r=0,a=0
if(e.length){void 0!==e[0].duration&&(i=1)
void 0!==e[0].size&&(n=2)
void 0!==e[0].flags&&(r=4)
void 0!==e[0].compositionTimeOffset&&(a=8)}return[0,0,i|n|r|a,1,(4278190080&e.length)>>>24,(16711680&e.length)>>>16,(65280&e.length)>>>8,255&e.length,(4278190080&t)>>>24,(16711680&t)>>>16,(65280&t)>>>8,255&t]}
i=function(e,i){var r,a,s,o,u,l
i+=20+16*(o=e.samples||[]).length
s=n(o,i);(a=new Uint8Array(s.length+16*o.length)).set(s)
r=s.length
for(l=0;l<o.length;l++){u=o[l]
a[r++]=(4278190080&u.duration)>>>24
a[r++]=(16711680&u.duration)>>>16
a[r++]=(65280&u.duration)>>>8
a[r++]=255&u.duration
a[r++]=(4278190080&u.size)>>>24
a[r++]=(16711680&u.size)>>>16
a[r++]=(65280&u.size)>>>8
a[r++]=255&u.size
a[r++]=u.flags.isLeading<<2|u.flags.dependsOn
a[r++]=u.flags.isDependedOn<<6|u.flags.hasRedundancy<<4|u.flags.paddingValue<<1|u.flags.isNonSyncSample
a[r++]=61440&u.flags.degradationPriority
a[r++]=15&u.flags.degradationPriority
a[r++]=(4278190080&u.compositionTimeOffset)>>>24
a[r++]=(16711680&u.compositionTimeOffset)>>>16
a[r++]=(65280&u.compositionTimeOffset)>>>8
a[r++]=255&u.compositionTimeOffset}return t(k.trun,a)}
e=function(e,i){var r,a,s,o,u,l
i+=20+8*(o=e.samples||[]).length
s=n(o,i);(r=new Uint8Array(s.length+8*o.length)).set(s)
a=s.length
for(l=0;l<o.length;l++){u=o[l]
r[a++]=(4278190080&u.duration)>>>24
r[a++]=(16711680&u.duration)>>>16
r[a++]=(65280&u.duration)>>>8
r[a++]=255&u.duration
r[a++]=(4278190080&u.size)>>>24
r[a++]=(16711680&u.size)>>>16
r[a++]=(65280&u.size)>>>8
r[a++]=255&u.size}return t(k.trun,r)}
S=function(t,n){return"audio"===t.type?e(t,n):i(t,n)}}()
var V,H,q,W,G,z,K,X,Y=a,Q=u,$=function(e){var t,i=r(),n=l(e);(t=new Uint8Array(i.byteLength+n.byteLength)).set(i)
t.set(n,i.byteLength)
return t},J=function(e,t){var i={size:0,flags:{isLeading:0,dependsOn:1,isDependedOn:0,hasRedundancy:0,degradationPriority:0,isNonSyncSample:1}}
i.dataOffset=t
i.compositionTimeOffset=e.pts-e.dts
i.duration=e.duration
i.size=4*e.length
i.size+=e.byteLength
if(e.keyFrame){i.flags.dependsOn=2
i.flags.isNonSyncSample=0}return i},Z=function(e){var t,i,n=[],r=[]
r.byteLength=0
r.nalCount=0
r.duration=0
n.byteLength=0
for(t=0;t<e.length;t++)if("access_unit_delimiter_rbsp"===(i=e[t]).nalUnitType){if(n.length){n.duration=i.dts-n.dts
r.byteLength+=n.byteLength
r.nalCount+=n.length
r.duration+=n.duration
r.push(n)}(n=[i]).byteLength=i.data.byteLength
n.pts=i.pts
n.dts=i.dts}else{"slice_layer_without_partitioning_rbsp_idr"===i.nalUnitType&&(n.keyFrame=!0)
n.duration=i.dts-n.dts
n.byteLength+=i.data.byteLength
n.push(i)}r.length&&(!n.duration||n.duration<=0)&&(n.duration=r[r.length-1].duration)
r.byteLength+=n.byteLength
r.nalCount+=n.length
r.duration+=n.duration
r.push(n)
return r},ee=function(e){var t,i,n=[],r=[]
n.byteLength=0
n.nalCount=0
n.duration=0
n.pts=e[0].pts
n.dts=e[0].dts
r.byteLength=0
r.nalCount=0
r.duration=0
r.pts=e[0].pts
r.dts=e[0].dts
for(t=0;t<e.length;t++)if((i=e[t]).keyFrame){if(n.length){r.push(n)
r.byteLength+=n.byteLength
r.nalCount+=n.nalCount
r.duration+=n.duration}(n=[i]).nalCount=i.length
n.byteLength=i.byteLength
n.pts=i.pts
n.dts=i.dts
n.duration=i.duration}else{n.duration+=i.duration
n.nalCount+=i.length
n.byteLength+=i.byteLength
n.push(i)}r.length&&n.duration<=0&&(n.duration=r[r.length-1].duration)
r.byteLength+=n.byteLength
r.nalCount+=n.nalCount
r.duration+=n.duration
r.push(n)
return r},te=function(e){var t
if(!e[0][0].keyFrame&&e.length>1){t=e.shift()
e.byteLength-=t.byteLength
e.nalCount-=t.nalCount
e[0][0].dts=t.dts
e[0][0].pts=t.pts
e[0][0].duration+=t.duration}return e},ie=function(e,t){var i,n,r,a,s,o=t||0,u=[]
for(i=0;i<e.length;i++){a=e[i]
for(n=0;n<a.length;n++){s=a[n]
o+=(r=J(s,o)).size
u.push(r)}}return u},ne=function(e){var t,i,n,r,a,s,o=0,u=e.byteLength,l=e.nalCount,c=new Uint8Array(u+4*l),d=new DataView(c.buffer)
for(t=0;t<e.length;t++){r=e[t]
for(i=0;i<r.length;i++){a=r[i]
for(n=0;n<a.length;n++){s=a[n]
d.setUint32(o,s.data.byteLength)
o+=4
c.set(s.data,o)
o+=s.data.byteLength}}}return c},re=[33,16,5,32,164,27],ae=[33,65,108,84,1,2,4,8,168,2,4,8,17,191,252],se=function(e){for(var t=[];e--;)t.push(0)
return t},oe=function(){if(!V){var e={96e3:[re,[227,64],se(154),[56]],88200:[re,[231],se(170),[56]],64e3:[re,[248,192],se(240),[56]],48e3:[re,[255,192],se(268),[55,148,128],se(54),[112]],44100:[re,[255,192],se(268),[55,163,128],se(84),[112]],32e3:[re,[255,192],se(268),[55,234],se(226),[112]],24e3:[re,[255,192],se(268),[55,255,128],se(268),[111,112],se(126),[224]],16e3:[re,[255,192],se(268),[55,255,128],se(268),[111,255],se(269),[223,108],se(195),[1,192]],12e3:[ae,se(268),[3,127,248],se(268),[6,255,240],se(268),[13,255,224],se(268),[27,253,128],se(259),[56]],11025:[ae,se(268),[3,127,248],se(268),[6,255,240],se(268),[13,255,224],se(268),[27,255,192],se(268),[55,175,128],se(108),[112]],8e3:[ae,se(268),[3,121,16],se(47),[7]]}
V=(t=e,Object.keys(t).reduce((function(e,i){e[i]=new Uint8Array(t[i].reduce((function(e,t){return e.concat(t)}),[]))
return e}),{}))}var t
return V},ue=9e4
z=function(e,t){return H(G(e,t))}
K=function(e,t){return q(W(e),t)}
X=function(e,t,i){return W(i?e:e-t)}
var le=ue,ce=H=function(e){return e*ue},de=(q=function(e,t){return e*t},W=function(e){return e/ue}),he=(G=function(e,t){return e/t},z),pe=K,fe=X,me=function(e,t,i,n){var r,a,s,o,u,l=0,c=0,d=0
if(t.length){r=he(e.baseMediaDecodeTime,e.samplerate)
a=Math.ceil(le/(e.samplerate/1024))
if(i&&n){l=r-Math.max(i,n)
d=(c=Math.floor(l/a))*a}if(!(c<1||d>le/2)){(s=oe()[e.samplerate])||(s=t[0].data)
for(o=0;o<c;o++){u=t[0]
t.splice(0,0,{data:s,dts:u.dts-a,pts:u.pts-a})}e.baseMediaDecodeTime-=Math.floor(pe(d,e.samplerate))
return d}}},ge=function(e,t,i){if(t.minSegmentDts>=i)return e
t.minSegmentDts=1/0
return e.filter((function(e){if(e.dts>=i){t.minSegmentDts=Math.min(t.minSegmentDts,e.dts)
t.minSegmentPts=t.minSegmentDts
return!0}return!1}))},ve=function(e){var t,i,n=[]
for(t=0;t<e.length;t++){i=e[t]
n.push({size:i.data.byteLength,duration:1024})}return n},ye=function(e){var t,i,n=0,r=new Uint8Array(function(e){var t,i=0
for(t=0;t<e.length;t++)i+=e[t].data.byteLength
return i}(e))
for(t=0;t<e.length;t++){i=e[t]
r.set(i.data,n)
n+=i.data.byteLength}return r},_e=le,be=function(e){delete e.minSegmentDts
delete e.maxSegmentDts
delete e.minSegmentPts
delete e.maxSegmentPts},Te=function(e,t){var i,n=e.minSegmentDts
t||(n-=e.timelineStartInfo.dts)
i=e.timelineStartInfo.baseMediaDecodeTime
i+=n
i=Math.max(0,i)
if("audio"===e.type){i*=e.samplerate/_e
i=Math.floor(i)}return i},Se=function(e,t){if("number"==typeof t.pts){void 0===e.timelineStartInfo.pts&&(e.timelineStartInfo.pts=t.pts)
void 0===e.minSegmentPts?e.minSegmentPts=t.pts:e.minSegmentPts=Math.min(e.minSegmentPts,t.pts)
void 0===e.maxSegmentPts?e.maxSegmentPts=t.pts:e.maxSegmentPts=Math.max(e.maxSegmentPts,t.pts)}if("number"==typeof t.dts){void 0===e.timelineStartInfo.dts&&(e.timelineStartInfo.dts=t.dts)
void 0===e.minSegmentDts?e.minSegmentDts=t.dts:e.minSegmentDts=Math.min(e.minSegmentDts,t.dts)
void 0===e.maxSegmentDts?e.maxSegmentDts=t.dts:e.maxSegmentDts=Math.max(e.maxSegmentDts,t.dts)}},ke=function(e){for(var t=0,i={payloadType:-1,payloadSize:0},n=0,r=0;t<e.byteLength&&128!==e[t];){for(;255===e[t];){n+=255
t++}n+=e[t++]
for(;255===e[t];){r+=255
t++}r+=e[t++]
if(!i.payload&&4===n){if("GA94"===String.fromCharCode(e[t+3],e[t+4],e[t+5],e[t+6])){i.payloadType=n
i.payloadSize=r
i.payload=e.subarray(t,t+r)
break}i.payload=void 0}t+=r
n=0
r=0}return i},Ee=function(e){return 181!==e.payload[0]||49!=(e.payload[1]<<8|e.payload[2])||"GA94"!==String.fromCharCode(e.payload[3],e.payload[4],e.payload[5],e.payload[6])||3!==e.payload[7]?null:e.payload.subarray(8,e.payload.length-1)},Ce=function(e,t){var i,n,r,a,s=[]
if(!(64&t[0]))return s
n=31&t[0]
for(i=0;i<n;i++){a={type:3&t[(r=3*i)+2],pts:e}
if(4&t[r+2]){a.ccData=t[r+3]<<8|t[r+4]
s.push(a)}}return s},we=function(e){for(var t,i,n=e.byteLength,r=[],a=1;a<n-2;)if(0===e[a]&&0===e[a+1]&&3===e[a+2]){r.push(a+2)
a+=2}else a++
if(0===r.length)return e
t=n-r.length
i=new Uint8Array(t)
var s=0
for(a=0;a<t;s++,a++){if(s===r[0]){s++
r.shift()}i[a]=e[s]}return i},Ie=4,Pe=function e(t){t=t||{}
e.prototype.init.call(this)
this.parse708captions_="boolean"!=typeof t.parse708captions||t.parse708captions
this.captionPackets_=[]
this.ccStreams_=[new Be(0,0),new Be(0,1),new Be(1,0),new Be(1,1)]
this.parse708captions_&&(this.cc708Stream_=new De({captionServices:t.captionServices}))
this.reset()
this.ccStreams_.forEach((function(e){e.on("data",this.trigger.bind(this,"data"))
e.on("partialdone",this.trigger.bind(this,"partialdone"))
e.on("done",this.trigger.bind(this,"done"))}),this)
if(this.parse708captions_){this.cc708Stream_.on("data",this.trigger.bind(this,"data"))
this.cc708Stream_.on("partialdone",this.trigger.bind(this,"partialdone"))
this.cc708Stream_.on("done",this.trigger.bind(this,"done"))}};(Pe.prototype=new U).push=function(e){var t,i,n
if("sei_rbsp"===e.nalUnitType&&(t=ke(e.escapedRBSP)).payload&&t.payloadType===Ie&&(i=Ee(t)))if(e.dts<this.latestDts_)this.ignoreNextEqualDts_=!0
else if(e.dts===this.latestDts_&&this.ignoreNextEqualDts_){this.numSameDts_--
this.numSameDts_||(this.ignoreNextEqualDts_=!1)}else{n=Ce(e.pts,i)
this.captionPackets_=this.captionPackets_.concat(n)
this.latestDts_!==e.dts&&(this.numSameDts_=0)
this.numSameDts_++
this.latestDts_=e.dts}}
Pe.prototype.flushCCStreams=function(e){this.ccStreams_.forEach((function(t){return"flush"===e?t.flush():t.partialFlush()}),this)}
Pe.prototype.flushStream=function(e){if(this.captionPackets_.length){this.captionPackets_.forEach((function(e,t){e.presortIndex=t}))
this.captionPackets_.sort((function(e,t){return e.pts===t.pts?e.presortIndex-t.presortIndex:e.pts-t.pts}))
this.captionPackets_.forEach((function(e){e.type<2?this.dispatchCea608Packet(e):this.dispatchCea708Packet(e)}),this)
this.captionPackets_.length=0
this.flushCCStreams(e)}else this.flushCCStreams(e)}
Pe.prototype.flush=function(){return this.flushStream("flush")}
Pe.prototype.partialFlush=function(){return this.flushStream("partialFlush")}
Pe.prototype.reset=function(){this.latestDts_=null
this.ignoreNextEqualDts_=!1
this.numSameDts_=0
this.activeCea608Channel_=[null,null]
this.ccStreams_.forEach((function(e){e.reset()}))}
Pe.prototype.dispatchCea608Packet=function(e){this.setsTextOrXDSActive(e)?this.activeCea608Channel_[e.type]=null:this.setsChannel1Active(e)?this.activeCea608Channel_[e.type]=0:this.setsChannel2Active(e)&&(this.activeCea608Channel_[e.type]=1)
null!==this.activeCea608Channel_[e.type]&&this.ccStreams_[(e.type<<1)+this.activeCea608Channel_[e.type]].push(e)}
Pe.prototype.setsChannel1Active=function(e){return 4096==(30720&e.ccData)}
Pe.prototype.setsChannel2Active=function(e){return 6144==(30720&e.ccData)}
Pe.prototype.setsTextOrXDSActive=function(e){return 256==(28928&e.ccData)||4138==(30974&e.ccData)||6186==(30974&e.ccData)}
Pe.prototype.dispatchCea708Packet=function(e){this.parse708captions_&&this.cc708Stream_.push(e)}
var xe={127:9834,4128:32,4129:160,4133:8230,4138:352,4140:338,4144:9608,4145:8216,4146:8217,4147:8220,4148:8221,4149:8226,4153:8482,4154:353,4156:339,4157:8480,4159:376,4214:8539,4215:8540,4216:8541,4217:8542,4218:9168,4219:9124,4220:9123,4221:9135,4222:9126,4223:9121,4256:12600},Ae=function(e){return 32<=e&&e<=127||160<=e&&e<=255},Oe=function(e){this.windowNum=e
this.reset()}
Oe.prototype.reset=function(){this.clearText()
this.pendingNewLine=!1
this.winAttr={}
this.penAttr={}
this.penLoc={}
this.penColor={}
this.visible=0
this.rowLock=0
this.columnLock=0
this.priority=0
this.relativePositioning=0
this.anchorVertical=0
this.anchorHorizontal=0
this.anchorPoint=0
this.rowCount=1
this.virtualRowCount=this.rowCount+1
this.columnCount=41
this.windowStyle=0
this.penStyle=0}
Oe.prototype.getText=function(){return this.rows.join("\n")}
Oe.prototype.clearText=function(){this.rows=[""]
this.rowIdx=0}
Oe.prototype.newLine=function(e){this.rows.length>=this.virtualRowCount&&"function"==typeof this.beforeRowOverflow&&this.beforeRowOverflow(e)
if(this.rows.length>0){this.rows.push("")
this.rowIdx++}for(;this.rows.length>this.virtualRowCount;){this.rows.shift()
this.rowIdx--}}
Oe.prototype.isEmpty=function(){return 0===this.rows.length||1===this.rows.length&&""===this.rows[0]}
Oe.prototype.addText=function(e){this.rows[this.rowIdx]+=e}
Oe.prototype.backspace=function(){if(!this.isEmpty()){var e=this.rows[this.rowIdx]
this.rows[this.rowIdx]=e.substr(0,e.length-1)}}
var Le=function(e,t,i){this.serviceNum=e
this.text=""
this.currentWindow=new Oe(-1)
this.windows=[]
this.stream=i
"string"==typeof t&&this.createTextDecoder(t)}
Le.prototype.init=function(e,t){this.startPts=e
for(var i=0;i<8;i++){this.windows[i]=new Oe(i)
"function"==typeof t&&(this.windows[i].beforeRowOverflow=t)}}
Le.prototype.setCurrentWindow=function(e){this.currentWindow=this.windows[e]}
Le.prototype.createTextDecoder=function(e){if("undefined"==typeof TextDecoder)this.stream.trigger("log",{level:"warn",message:"The `encoding` option is unsupported without TextDecoder support"})
else try{this.textDecoder_=new TextDecoder(e)}catch(t){this.stream.trigger("log",{level:"warn",message:"TextDecoder could not be created with "+e+" encoding. "+t})}}
var De=function e(t){t=t||{}
e.prototype.init.call(this)
var i,n=this,r=t.captionServices||{},a={}
Object.keys(r).forEach((function(e){i=r[e];/^SERVICE/.test(e)&&(a[e]=i.encoding)}))
this.serviceEncodings=a
this.current708Packet=null
this.services={}
this.push=function(e){if(3===e.type){n.new708Packet()
n.add708Bytes(e)}else{null===n.current708Packet&&n.new708Packet()
n.add708Bytes(e)}}}
De.prototype=new U
De.prototype.new708Packet=function(){null!==this.current708Packet&&this.push708Packet()
this.current708Packet={data:[],ptsVals:[]}}
De.prototype.add708Bytes=function(e){var t=e.ccData,i=t>>>8,n=255&t
this.current708Packet.ptsVals.push(e.pts)
this.current708Packet.data.push(i)
this.current708Packet.data.push(n)}
De.prototype.push708Packet=function(){var e=this.current708Packet,t=e.data,i=null,n=null,r=0,a=t[r++]
e.seq=a>>6
e.sizeCode=63&a
for(;r<t.length;r++){n=31&(a=t[r++])
7===(i=a>>5)&&n>0&&(i=a=t[r++])
this.pushServiceBlock(i,r,n)
n>0&&(r+=n-1)}}
De.prototype.pushServiceBlock=function(e,t,i){var n,r=t,a=this.current708Packet.data,s=this.services[e]
s||(s=this.initService(e,r))
for(;r<t+i&&r<a.length;r++){n=a[r]
Ae(n)?r=this.handleText(r,s):24===n?r=this.multiByteCharacter(r,s):16===n?r=this.extendedCommands(r,s):128<=n&&n<=135?r=this.setCurrentWindow(r,s):152<=n&&n<=159?r=this.defineWindow(r,s):136===n?r=this.clearWindows(r,s):140===n?r=this.deleteWindows(r,s):137===n?r=this.displayWindows(r,s):138===n?r=this.hideWindows(r,s):139===n?r=this.toggleWindows(r,s):151===n?r=this.setWindowAttributes(r,s):144===n?r=this.setPenAttributes(r,s):145===n?r=this.setPenColor(r,s):146===n?r=this.setPenLocation(r,s):143===n?s=this.reset(r,s):8===n?s.currentWindow.backspace():12===n?s.currentWindow.clearText():13===n?s.currentWindow.pendingNewLine=!0:14===n?s.currentWindow.clearText():141===n&&r++}}
De.prototype.extendedCommands=function(e,t){var i=this.current708Packet.data[++e]
Ae(i)&&(e=this.handleText(e,t,{isExtended:!0}))
return e}
De.prototype.getPts=function(e){return this.current708Packet.ptsVals[Math.floor(e/2)]}
De.prototype.initService=function(e,t){var i,n,r=this;(i="SERVICE"+e)in this.serviceEncodings&&(n=this.serviceEncodings[i])
this.services[e]=new Le(e,n,r)
this.services[e].init(this.getPts(t),(function(t){r.flushDisplayed(t,r.services[e])}))
return this.services[e]}
De.prototype.handleText=function(e,t,i){var n,r,a,s,o=i&&i.isExtended,u=i&&i.isMultiByte,l=this.current708Packet.data,c=o?4096:0,d=l[e],h=l[e+1],p=t.currentWindow
if(t.textDecoder_&&!o){if(u){r=[d,h]
e++}else r=[d]
n=t.textDecoder_.decode(new Uint8Array(r))}else n=(s=xe[a=c|d]||a,4096&a&&a===s?"":String.fromCharCode(s))
p.pendingNewLine&&!p.isEmpty()&&p.newLine(this.getPts(e))
p.pendingNewLine=!1
p.addText(n)
return e}
De.prototype.multiByteCharacter=function(e,t){var i=this.current708Packet.data,n=i[e+1],r=i[e+2]
Ae(n)&&Ae(r)&&(e=this.handleText(++e,t,{isMultiByte:!0}))
return e}
De.prototype.setCurrentWindow=function(e,t){var i=7&this.current708Packet.data[e]
t.setCurrentWindow(i)
return e}
De.prototype.defineWindow=function(e,t){var i=this.current708Packet.data,n=i[e],r=7&n
t.setCurrentWindow(r)
var a=t.currentWindow
n=i[++e]
a.visible=(32&n)>>5
a.rowLock=(16&n)>>4
a.columnLock=(8&n)>>3
a.priority=7&n
n=i[++e]
a.relativePositioning=(128&n)>>7
a.anchorVertical=127&n
n=i[++e]
a.anchorHorizontal=n
n=i[++e]
a.anchorPoint=(240&n)>>4
a.rowCount=15&n
n=i[++e]
a.columnCount=63&n
n=i[++e]
a.windowStyle=(56&n)>>3
a.penStyle=7&n
a.virtualRowCount=a.rowCount+1
return e}
De.prototype.setWindowAttributes=function(e,t){var i=this.current708Packet.data,n=i[e],r=t.currentWindow.winAttr
n=i[++e]
r.fillOpacity=(192&n)>>6
r.fillRed=(48&n)>>4
r.fillGreen=(12&n)>>2
r.fillBlue=3&n
n=i[++e]
r.borderType=(192&n)>>6
r.borderRed=(48&n)>>4
r.borderGreen=(12&n)>>2
r.borderBlue=3&n
n=i[++e]
r.borderType+=(128&n)>>5
r.wordWrap=(64&n)>>6
r.printDirection=(48&n)>>4
r.scrollDirection=(12&n)>>2
r.justify=3&n
n=i[++e]
r.effectSpeed=(240&n)>>4
r.effectDirection=(12&n)>>2
r.displayEffect=3&n
return e}
De.prototype.flushDisplayed=function(e,t){for(var i=[],n=0;n<8;n++)t.windows[n].visible&&!t.windows[n].isEmpty()&&i.push(t.windows[n].getText())
t.endPts=e
t.text=i.join("\n\n")
this.pushCaption(t)
t.startPts=e}
De.prototype.pushCaption=function(e){if(""!==e.text){this.trigger("data",{startPts:e.startPts,endPts:e.endPts,text:e.text,stream:"cc708_"+e.serviceNum})
e.text=""
e.startPts=e.endPts}}
De.prototype.displayWindows=function(e,t){var i=this.current708Packet.data[++e],n=this.getPts(e)
this.flushDisplayed(n,t)
for(var r=0;r<8;r++)i&1<<r&&(t.windows[r].visible=1)
return e}
De.prototype.hideWindows=function(e,t){var i=this.current708Packet.data[++e],n=this.getPts(e)
this.flushDisplayed(n,t)
for(var r=0;r<8;r++)i&1<<r&&(t.windows[r].visible=0)
return e}
De.prototype.toggleWindows=function(e,t){var i=this.current708Packet.data[++e],n=this.getPts(e)
this.flushDisplayed(n,t)
for(var r=0;r<8;r++)i&1<<r&&(t.windows[r].visible^=1)
return e}
De.prototype.clearWindows=function(e,t){var i=this.current708Packet.data[++e],n=this.getPts(e)
this.flushDisplayed(n,t)
for(var r=0;r<8;r++)i&1<<r&&t.windows[r].clearText()
return e}
De.prototype.deleteWindows=function(e,t){var i=this.current708Packet.data[++e],n=this.getPts(e)
this.flushDisplayed(n,t)
for(var r=0;r<8;r++)i&1<<r&&t.windows[r].reset()
return e}
De.prototype.setPenAttributes=function(e,t){var i=this.current708Packet.data,n=i[e],r=t.currentWindow.penAttr
n=i[++e]
r.textTag=(240&n)>>4
r.offset=(12&n)>>2
r.penSize=3&n
n=i[++e]
r.italics=(128&n)>>7
r.underline=(64&n)>>6
r.edgeType=(56&n)>>3
r.fontStyle=7&n
return e}
De.prototype.setPenColor=function(e,t){var i=this.current708Packet.data,n=i[e],r=t.currentWindow.penColor
n=i[++e]
r.fgOpacity=(192&n)>>6
r.fgRed=(48&n)>>4
r.fgGreen=(12&n)>>2
r.fgBlue=3&n
n=i[++e]
r.bgOpacity=(192&n)>>6
r.bgRed=(48&n)>>4
r.bgGreen=(12&n)>>2
r.bgBlue=3&n
n=i[++e]
r.edgeRed=(48&n)>>4
r.edgeGreen=(12&n)>>2
r.edgeBlue=3&n
return e}
De.prototype.setPenLocation=function(e,t){var i=this.current708Packet.data,n=i[e],r=t.currentWindow.penLoc
t.currentWindow.pendingNewLine=!0
n=i[++e]
r.row=15&n
n=i[++e]
r.column=63&n
return e}
De.prototype.reset=function(e,t){var i=this.getPts(e)
this.flushDisplayed(i,t)
return this.initService(t.serviceNum,e)}
var Re={42:225,92:233,94:237,95:243,96:250,123:231,124:247,125:209,126:241,127:9608,304:174,305:176,306:189,307:191,308:8482,309:162,310:163,311:9834,312:224,313:160,314:232,315:226,316:234,317:238,318:244,319:251,544:193,545:201,546:211,547:218,548:220,549:252,550:8216,551:161,552:42,553:39,554:8212,555:169,556:8480,557:8226,558:8220,559:8221,560:192,561:194,562:199,563:200,564:202,565:203,566:235,567:206,568:207,569:239,570:212,571:217,572:249,573:219,574:171,575:187,800:195,801:227,802:205,803:204,804:236,805:210,806:242,807:213,808:245,809:123,810:125,811:92,812:94,813:95,814:124,815:126,816:196,817:228,818:214,819:246,820:223,821:165,822:164,823:9474,824:197,825:229,826:216,827:248,828:9484,829:9488,830:9492,831:9496},Me=function(e){if(null===e)return""
e=Re[e]||e
return String.fromCharCode(e)},Ne=[4352,4384,4608,4640,5376,5408,5632,5664,5888,5920,4096,4864,4896,5120,5152],Ue=function(){for(var e=[],t=15;t--;)e.push("")
return e},Be=function e(t,i){e.prototype.init.call(this)
this.field_=t||0
this.dataChannel_=i||0
this.name_="CC"+(1+(this.field_<<1|this.dataChannel_))
this.setConstants()
this.reset()
this.push=function(e){var t,i,n,r,a
if((t=32639&e.ccData)!==this.lastControlCode_){4096==(61440&t)?this.lastControlCode_=t:t!==this.PADDING_&&(this.lastControlCode_=null)
n=t>>>8
r=255&t
if(t!==this.PADDING_)if(t===this.RESUME_CAPTION_LOADING_)this.mode_="popOn"
else if(t===this.END_OF_CAPTION_){this.mode_="popOn"
this.clearFormatting(e.pts)
this.flushDisplayed(e.pts)
i=this.displayed_
this.displayed_=this.nonDisplayed_
this.nonDisplayed_=i
this.startPts_=e.pts}else if(t===this.ROLL_UP_2_ROWS_){this.rollUpRows_=2
this.setRollUp(e.pts)}else if(t===this.ROLL_UP_3_ROWS_){this.rollUpRows_=3
this.setRollUp(e.pts)}else if(t===this.ROLL_UP_4_ROWS_){this.rollUpRows_=4
this.setRollUp(e.pts)}else if(t===this.CARRIAGE_RETURN_){this.clearFormatting(e.pts)
this.flushDisplayed(e.pts)
this.shiftRowsUp_()
this.startPts_=e.pts}else if(t===this.BACKSPACE_)"popOn"===this.mode_?this.nonDisplayed_[this.row_]=this.nonDisplayed_[this.row_].slice(0,-1):this.displayed_[this.row_]=this.displayed_[this.row_].slice(0,-1)
else if(t===this.ERASE_DISPLAYED_MEMORY_){this.flushDisplayed(e.pts)
this.displayed_=Ue()}else if(t===this.ERASE_NON_DISPLAYED_MEMORY_)this.nonDisplayed_=Ue()
else if(t===this.RESUME_DIRECT_CAPTIONING_){if("paintOn"!==this.mode_){this.flushDisplayed(e.pts)
this.displayed_=Ue()}this.mode_="paintOn"
this.startPts_=e.pts}else if(this.isSpecialCharacter(n,r)){a=Me((n=(3&n)<<8)|r)
this[this.mode_](e.pts,a)
this.column_++}else if(this.isExtCharacter(n,r)){"popOn"===this.mode_?this.nonDisplayed_[this.row_]=this.nonDisplayed_[this.row_].slice(0,-1):this.displayed_[this.row_]=this.displayed_[this.row_].slice(0,-1)
a=Me((n=(3&n)<<8)|r)
this[this.mode_](e.pts,a)
this.column_++}else if(this.isMidRowCode(n,r)){this.clearFormatting(e.pts)
this[this.mode_](e.pts," ")
this.column_++
14&~r||this.addFormatting(e.pts,["i"])
1&~r||this.addFormatting(e.pts,["u"])}else if(this.isOffsetControlCode(n,r))this.column_+=3&r
else if(this.isPAC(n,r)){var s=Ne.indexOf(7968&t)
if("rollUp"===this.mode_){s-this.rollUpRows_+1<0&&(s=this.rollUpRows_-1)
this.setRollUp(e.pts,s)}if(s!==this.row_){this.clearFormatting(e.pts)
this.row_=s}1&r&&-1===this.formatting_.indexOf("u")&&this.addFormatting(e.pts,["u"])
16&~t||(this.column_=4*((14&t)>>1))
this.isColorPAC(r)&&(14&~r||this.addFormatting(e.pts,["i"]))}else if(this.isNormalChar(n)){0===r&&(r=null)
a=Me(n)
a+=Me(r)
this[this.mode_](e.pts,a)
this.column_+=a.length}}else this.lastControlCode_=null}}
Be.prototype=new U
Be.prototype.flushDisplayed=function(e){var t=this.displayed_.map((function(e,t){try{return e.trim()}catch(e){this.trigger("log",{level:"warn",message:"Skipping a malformed 608 caption at index "+t+"."})
return""}}),this).join("\n").replace(/^\n+|\n+$/g,"")
t.length&&this.trigger("data",{startPts:this.startPts_,endPts:e,text:t,stream:this.name_})}
Be.prototype.reset=function(){this.mode_="popOn"
this.topRow_=0
this.startPts_=0
this.displayed_=Ue()
this.nonDisplayed_=Ue()
this.lastControlCode_=null
this.column_=0
this.row_=14
this.rollUpRows_=2
this.formatting_=[]}
Be.prototype.setConstants=function(){if(0===this.dataChannel_){this.BASE_=16
this.EXT_=17
this.CONTROL_=(20|this.field_)<<8
this.OFFSET_=23}else if(1===this.dataChannel_){this.BASE_=24
this.EXT_=25
this.CONTROL_=(28|this.field_)<<8
this.OFFSET_=31}this.PADDING_=0
this.RESUME_CAPTION_LOADING_=32|this.CONTROL_
this.END_OF_CAPTION_=47|this.CONTROL_
this.ROLL_UP_2_ROWS_=37|this.CONTROL_
this.ROLL_UP_3_ROWS_=38|this.CONTROL_
this.ROLL_UP_4_ROWS_=39|this.CONTROL_
this.CARRIAGE_RETURN_=45|this.CONTROL_
this.RESUME_DIRECT_CAPTIONING_=41|this.CONTROL_
this.BACKSPACE_=33|this.CONTROL_
this.ERASE_DISPLAYED_MEMORY_=44|this.CONTROL_
this.ERASE_NON_DISPLAYED_MEMORY_=46|this.CONTROL_}
Be.prototype.isSpecialCharacter=function(e,t){return e===this.EXT_&&t>=48&&t<=63}
Be.prototype.isExtCharacter=function(e,t){return(e===this.EXT_+1||e===this.EXT_+2)&&t>=32&&t<=63}
Be.prototype.isMidRowCode=function(e,t){return e===this.EXT_&&t>=32&&t<=47}
Be.prototype.isOffsetControlCode=function(e,t){return e===this.OFFSET_&&t>=33&&t<=35}
Be.prototype.isPAC=function(e,t){return e>=this.BASE_&&e<this.BASE_+8&&t>=64&&t<=127}
Be.prototype.isColorPAC=function(e){return e>=64&&e<=79||e>=96&&e<=127}
Be.prototype.isNormalChar=function(e){return e>=32&&e<=127}
Be.prototype.setRollUp=function(e,t){if("rollUp"!==this.mode_){this.row_=14
this.mode_="rollUp"
this.flushDisplayed(e)
this.nonDisplayed_=Ue()
this.displayed_=Ue()}if(void 0!==t&&t!==this.row_)for(var i=0;i<this.rollUpRows_;i++){this.displayed_[t-i]=this.displayed_[this.row_-i]
this.displayed_[this.row_-i]=""}void 0===t&&(t=this.row_)
this.topRow_=t-this.rollUpRows_+1}
Be.prototype.addFormatting=function(e,t){this.formatting_=this.formatting_.concat(t)
var i=t.reduce((function(e,t){return e+"<"+t+">"}),"")
this[this.mode_](e,i)}
Be.prototype.clearFormatting=function(e){if(this.formatting_.length){var t=this.formatting_.reverse().reduce((function(e,t){return e+"</"+t+">"}),"")
this.formatting_=[]
this[this.mode_](e,t)}}
Be.prototype.popOn=function(e,t){var i=this.nonDisplayed_[this.row_]
i+=t
this.nonDisplayed_[this.row_]=i}
Be.prototype.rollUp=function(e,t){var i=this.displayed_[this.row_]
i+=t
this.displayed_[this.row_]=i}
Be.prototype.shiftRowsUp_=function(){var e
for(e=0;e<this.topRow_;e++)this.displayed_[e]=""
for(e=this.row_+1;e<15;e++)this.displayed_[e]=""
for(e=this.topRow_;e<this.row_;e++)this.displayed_[e]=this.displayed_[e+1]
this.displayed_[this.row_]=""}
Be.prototype.paintOn=function(e,t){var i=this.displayed_[this.row_]
i+=t
this.displayed_[this.row_]=i}
var Fe={CaptionStream:Pe,Cea608Stream:Be,Cea708Stream:De},je={H264_STREAM_TYPE:27,ADTS_STREAM_TYPE:15,METADATA_STREAM_TYPE:21},Ve="shared",He=function(e,t){var i=1
e>t&&(i=-1)
for(;Math.abs(t-e)>4294967296;)e+=8589934592*i
return e},qe=function e(t){var i,n
e.prototype.init.call(this)
this.type_=t||Ve
this.push=function(e){if(this.type_===Ve||e.type===this.type_){void 0===n&&(n=e.dts)
e.dts=He(e.dts,n)
e.pts=He(e.pts,n)
i=e.dts
this.trigger("data",e)}}
this.flush=function(){n=i
this.trigger("done")}
this.endTimeline=function(){this.flush()
this.trigger("endedtimeline")}
this.discontinuity=function(){n=void 0
i=void 0}
this.reset=function(){this.discontinuity()
this.trigger("reset")}}
qe.prototype=new U
var We,Ge=qe,ze=He,Ke=function(e,t,i){var n,r=""
for(n=t;n<i;n++)r+="%"+("00"+e[n].toString(16)).slice(-2)
return r},Xe=function(e,t,i){return decodeURIComponent(Ke(e,t,i))},Ye=function(e){return e[0]<<21|e[1]<<14|e[2]<<7|e[3]},Qe={TXXX:function(e){var t
if(3===e.data[0]){for(t=1;t<e.data.length;t++)if(0===e.data[t]){e.description=Xe(e.data,1,t)
e.value=Xe(e.data,t+1,e.data.length).replace(/\0*$/,"")
break}e.data=e.value}},WXXX:function(e){var t
if(3===e.data[0])for(t=1;t<e.data.length;t++)if(0===e.data[t]){e.description=Xe(e.data,1,t)
e.url=Xe(e.data,t+1,e.data.length)
break}},PRIV:function(e){var t,i
for(t=0;t<e.data.length;t++)if(0===e.data[t]){e.owner=(i=e.data,unescape(Ke(i,0,t)))
break}e.privateData=e.data.subarray(t+1)
e.data=e.privateData}}
We=function(e){var t,i={descriptor:e&&e.descriptor},n=0,r=[],a=0
We.prototype.init.call(this)
this.dispatchType=je.METADATA_STREAM_TYPE.toString(16)
if(i.descriptor)for(t=0;t<i.descriptor.length;t++)this.dispatchType+=("00"+i.descriptor[t].toString(16)).slice(-2)
this.push=function(e){var t,i,s,o,u
if("timed-metadata"===e.type){if(e.dataAlignmentIndicator){a=0
r.length=0}if(0===r.length&&(e.data.length<10||e.data[0]!=="I".charCodeAt(0)||e.data[1]!=="D".charCodeAt(0)||e.data[2]!=="3".charCodeAt(0)))this.trigger("log",{level:"warn",message:"Skipping unrecognized metadata packet"})
else{r.push(e)
a+=e.data.byteLength
if(1===r.length){n=Ye(e.data.subarray(6,10))
n+=10}if(!(a<n)){t={data:new Uint8Array(n),frames:[],pts:r[0].pts,dts:r[0].dts}
for(u=0;u<n;){t.data.set(r[0].data.subarray(0,n-u),u)
u+=r[0].data.byteLength
a-=r[0].data.byteLength
r.shift()}i=10
if(64&t.data[5]){i+=4
i+=Ye(t.data.subarray(10,14))
n-=Ye(t.data.subarray(16,20))}do{if((s=Ye(t.data.subarray(i+4,i+8)))<1){this.trigger("log",{level:"warn",message:"Malformed ID3 frame encountered. Skipping metadata parsing."})
return}(o={id:String.fromCharCode(t.data[i],t.data[i+1],t.data[i+2],t.data[i+3]),data:t.data.subarray(i+10,i+s+10)}).key=o.id
if(Qe[o.id]){Qe[o.id](o)
if("com.apple.streaming.transportStreamTimestamp"===o.owner){var l=o.data,c=(1&l[3])<<30|l[4]<<22|l[5]<<14|l[6]<<6|l[7]>>>2
c*=4
c+=3&l[7]
o.timeStamp=c
if(void 0===t.pts&&void 0===t.dts){t.pts=o.timeStamp
t.dts=o.timeStamp}this.trigger("timestamp",o)}}t.frames.push(o)
i+=10
i+=s}while(i<n)
this.trigger("data",t)}}}}}
We.prototype=new U
var $e,Je,Ze,et=We,tt=Ge,it=188;($e=function(){var e=new Uint8Array(it),t=0
$e.prototype.init.call(this)
this.push=function(i){var n,r=0,a=it
if(t){(n=new Uint8Array(i.byteLength+t)).set(e.subarray(0,t))
n.set(i,t)
t=0}else n=i
for(;a<n.byteLength;)if(71!==n[r]||71!==n[a]){r++
a++}else{this.trigger("data",n.subarray(r,a))
r+=it
a+=it}if(r<n.byteLength){e.set(n.subarray(r),0)
t=n.byteLength-r}}
this.flush=function(){if(t===it&&71===e[0]){this.trigger("data",e)
t=0}this.trigger("done")}
this.endTimeline=function(){this.flush()
this.trigger("endedtimeline")}
this.reset=function(){t=0
this.trigger("reset")}}).prototype=new U
Je=function(){var e,t,i,n
Je.prototype.init.call(this)
n=this
this.packetsWaitingForPmt=[]
this.programMapTable=void 0
e=function(e,n){var r=0
n.payloadUnitStartIndicator&&(r+=e[r]+1)
"pat"===n.type?t(e.subarray(r),n):i(e.subarray(r),n)}
t=function(e,t){t.section_number=e[7]
t.last_section_number=e[8]
n.pmtPid=(31&e[10])<<8|e[11]
t.pmtPid=n.pmtPid}
i=function(e,t){var i,r
if(1&e[5]){n.programMapTable={video:null,audio:null,"timed-metadata":{}}
i=3+((15&e[1])<<8|e[2])-4
r=12+((15&e[10])<<8|e[11])
for(;r<i;){var a=e[r],s=(31&e[r+1])<<8|e[r+2]
a===je.H264_STREAM_TYPE&&null===n.programMapTable.video?n.programMapTable.video=s:a===je.ADTS_STREAM_TYPE&&null===n.programMapTable.audio?n.programMapTable.audio=s:a===je.METADATA_STREAM_TYPE&&(n.programMapTable["timed-metadata"][s]=a)
r+=5+((15&e[r+3])<<8|e[r+4])}t.programMapTable=n.programMapTable}}
this.push=function(t){var i={},n=4
i.payloadUnitStartIndicator=!!(64&t[1])
i.pid=31&t[1]
i.pid<<=8
i.pid|=t[2];(48&t[3])>>>4>1&&(n+=t[n]+1)
if(0===i.pid){i.type="pat"
e(t.subarray(n),i)
this.trigger("data",i)}else if(i.pid===this.pmtPid){i.type="pmt"
e(t.subarray(n),i)
this.trigger("data",i)
for(;this.packetsWaitingForPmt.length;)this.processPes_.apply(this,this.packetsWaitingForPmt.shift())}else void 0===this.programMapTable?this.packetsWaitingForPmt.push([t,n,i]):this.processPes_(t,n,i)}
this.processPes_=function(e,t,i){i.pid===this.programMapTable.video?i.streamType=je.H264_STREAM_TYPE:i.pid===this.programMapTable.audio?i.streamType=je.ADTS_STREAM_TYPE:i.streamType=this.programMapTable["timed-metadata"][i.pid]
i.type="pes"
i.data=e.subarray(t)
this.trigger("data",i)}}
Je.prototype=new U
Je.STREAM_TYPES={h264:27,adts:15}
Ze=function(){var e,t=this,i=!1,n={data:[],size:0},r={data:[],size:0},a={data:[],size:0},s=function(e,i,n){var r,a,s=new Uint8Array(e.size),o={type:i},u=0,l=0
if(e.data.length&&!(e.size<9)){o.trackId=e.data[0].pid
for(u=0;u<e.data.length;u++){a=e.data[u]
s.set(a.data,l)
l+=a.data.byteLength}!function(e,t){var i,n=e[0]<<16|e[1]<<8|e[2]
t.data=new Uint8Array
if(1===n){t.packetLength=6+(e[4]<<8|e[5])
t.dataAlignmentIndicator=!!(4&e[6])
if(192&(i=e[7])){t.pts=(14&e[9])<<27|(255&e[10])<<20|(254&e[11])<<12|(255&e[12])<<5|(254&e[13])>>>3
t.pts*=4
t.pts+=(6&e[13])>>>1
t.dts=t.pts
if(64&i){t.dts=(14&e[14])<<27|(255&e[15])<<20|(254&e[16])<<12|(255&e[17])<<5|(254&e[18])>>>3
t.dts*=4
t.dts+=(6&e[18])>>>1}}t.data=e.subarray(9+e[8])}}(s,o)
r="video"===i||o.packetLength<=e.size
if(n||r){e.size=0
e.data.length=0}r&&t.trigger("data",o)}}
Ze.prototype.init.call(this)
this.push=function(o){({pat:function(){},pes:function(){var e,t
switch(o.streamType){case je.H264_STREAM_TYPE:e=n
t="video"
break
case je.ADTS_STREAM_TYPE:e=r
t="audio"
break
case je.METADATA_STREAM_TYPE:e=a
t="timed-metadata"
break
default:return}o.payloadUnitStartIndicator&&s(e,t,!0)
e.data.push(o)
e.size+=o.data.byteLength},pmt:function(){var n={type:"metadata",tracks:[]}
null!==(e=o.programMapTable).video&&n.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+e.video,codec:"avc",type:"video"})
null!==e.audio&&n.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+e.audio,codec:"adts",type:"audio"})
i=!0
t.trigger("data",n)}})[o.type]()}
this.reset=function(){n.size=0
n.data.length=0
r.size=0
r.data.length=0
this.trigger("reset")}
this.flushStreams_=function(){s(n,"video")
s(r,"audio")
s(a,"timed-metadata")}
this.flush=function(){if(!i&&e){var n={type:"metadata",tracks:[]}
null!==e.video&&n.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+e.video,codec:"avc",type:"video"})
null!==e.audio&&n.tracks.push({timelineStartInfo:{baseMediaDecodeTime:0},id:+e.audio,codec:"adts",type:"audio"})
t.trigger("data",n)}i=!1
this.flushStreams_()
this.trigger("done")}}
Ze.prototype=new U
var nt={PAT_PID:0,MP2T_PACKET_LENGTH:it,TransportPacketStream:$e,TransportParseStream:Je,ElementaryStream:Ze,TimestampRolloverStream:tt,CaptionStream:Fe.CaptionStream,Cea608Stream:Fe.Cea608Stream,Cea708Stream:Fe.Cea708Stream,MetadataStream:et}
for(var rt in je)je.hasOwnProperty(rt)&&(nt[rt]=je[rt])
var at,st=nt,ot=le,ut=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350]
at=function(e){var t,i=0
at.prototype.init.call(this)
this.skipWarn_=function(e,t){this.trigger("log",{level:"warn",message:"adts skiping bytes "+e+" to "+t+" in frame "+i+" outside syncword"})}
this.push=function(n){var r,a,s,o,u,l=0
e||(i=0)
if("audio"===n.type){if(t&&t.length){s=t;(t=new Uint8Array(s.byteLength+n.data.byteLength)).set(s)
t.set(n.data,s.byteLength)}else t=n.data
for(var c;l+7<t.length;)if(255===t[l]&&240==(246&t[l+1])){if("number"==typeof c){this.skipWarn_(c,l)
c=null}a=2*(1&~t[l+1])
r=(3&t[l+3])<<11|t[l+4]<<3|(224&t[l+5])>>5
u=(o=1024*(1+(3&t[l+6])))*ot/ut[(60&t[l+2])>>>2]
if(t.byteLength-l<r)break
this.trigger("data",{pts:n.pts+i*u,dts:n.dts+i*u,sampleCount:o,audioobjecttype:1+(t[l+2]>>>6&3),channelcount:(1&t[l+2])<<2|(192&t[l+3])>>>6,samplerate:ut[(60&t[l+2])>>>2],samplingfrequencyindex:(60&t[l+2])>>>2,samplesize:16,data:t.subarray(l+7+a,l+r)})
i++
l+=r}else{"number"!=typeof c&&(c=l)
l++}if("number"==typeof c){this.skipWarn_(c,l)
c=null}t=t.subarray(l)}}
this.flush=function(){i=0
this.trigger("done")}
this.reset=function(){t=void 0
this.trigger("reset")}
this.endTimeline=function(){t=void 0
this.trigger("endedtimeline")}}
at.prototype=new U
var lt,ct=at
lt=function(e){var t=e.byteLength,i=0,n=0
this.length=function(){return 8*t}
this.bitsAvailable=function(){return 8*t+n}
this.loadWord=function(){var r=e.byteLength-t,a=new Uint8Array(4),s=Math.min(4,t)
if(0===s)throw new Error("no bytes available")
a.set(e.subarray(r,r+s))
i=new DataView(a.buffer).getUint32(0)
n=8*s
t-=s}
this.skipBits=function(e){var r
if(n>e){i<<=e
n-=e}else{e-=n
e-=8*(r=Math.floor(e/8))
t-=r
this.loadWord()
i<<=e
n-=e}}
this.readBits=function(e){var r=Math.min(n,e),a=i>>>32-r;(n-=r)>0?i<<=r:t>0&&this.loadWord()
return(r=e-r)>0?a<<r|this.readBits(r):a}
this.skipLeadingZeros=function(){var e
for(e=0;e<n;++e)if(i&2147483648>>>e){i<<=e
n-=e
return e}this.loadWord()
return e+this.skipLeadingZeros()}
this.skipUnsignedExpGolomb=function(){this.skipBits(1+this.skipLeadingZeros())}
this.skipExpGolomb=function(){this.skipBits(1+this.skipLeadingZeros())}
this.readUnsignedExpGolomb=function(){var e=this.skipLeadingZeros()
return this.readBits(e+1)-1}
this.readExpGolomb=function(){var e=this.readUnsignedExpGolomb()
return 1&e?1+e>>>1:-1*(e>>>1)}
this.readBoolean=function(){return 1===this.readBits(1)}
this.readUnsignedByte=function(){return this.readBits(8)}
this.loadWord()}
var dt,ht,pt,ft=lt
ht=function(){var e,t,i=0
ht.prototype.init.call(this)
this.push=function(n){var r
if(t){(r=new Uint8Array(t.byteLength+n.data.byteLength)).set(t)
r.set(n.data,t.byteLength)
t=r}else t=n.data
for(var a=t.byteLength;i<a-3;i++)if(1===t[i+2]){e=i+5
break}for(;e<a;)switch(t[e]){case 0:if(0!==t[e-1]){e+=2
break}if(0!==t[e-2]){e++
break}i+3!==e-2&&this.trigger("data",t.subarray(i+3,e-2))
do{e++}while(1!==t[e]&&e<a)
i=e-2
e+=3
break
case 1:if(0!==t[e-1]||0!==t[e-2]){e+=3
break}this.trigger("data",t.subarray(i+3,e-2))
i=e-2
e+=3
break
default:e+=3}t=t.subarray(i)
e-=i
i=0}
this.reset=function(){t=null
i=0
this.trigger("reset")}
this.flush=function(){t&&t.byteLength>3&&this.trigger("data",t.subarray(i+3))
t=null
i=0
this.trigger("done")}
this.endTimeline=function(){this.flush()
this.trigger("endedtimeline")}}
ht.prototype=new U
pt={100:!0,110:!0,122:!0,244:!0,44:!0,83:!0,86:!0,118:!0,128:!0,138:!0,139:!0,134:!0}
dt=function(){var e,t,i,n,r,a,s,o=new ht
dt.prototype.init.call(this)
e=this
this.push=function(e){if("video"===e.type){t=e.trackId
i=e.pts
n=e.dts
o.push(e)}}
o.on("data",(function(s){var o={trackId:t,pts:i,dts:n,data:s,nalUnitTypeCode:31&s[0]}
switch(o.nalUnitTypeCode){case 5:o.nalUnitType="slice_layer_without_partitioning_rbsp_idr"
break
case 6:o.nalUnitType="sei_rbsp"
o.escapedRBSP=r(s.subarray(1))
break
case 7:o.nalUnitType="seq_parameter_set_rbsp"
o.escapedRBSP=r(s.subarray(1))
o.config=a(o.escapedRBSP)
break
case 8:o.nalUnitType="pic_parameter_set_rbsp"
break
case 9:o.nalUnitType="access_unit_delimiter_rbsp"}e.trigger("data",o)}))
o.on("done",(function(){e.trigger("done")}))
o.on("partialdone",(function(){e.trigger("partialdone")}))
o.on("reset",(function(){e.trigger("reset")}))
o.on("endedtimeline",(function(){e.trigger("endedtimeline")}))
this.flush=function(){o.flush()}
this.partialFlush=function(){o.partialFlush()}
this.reset=function(){o.reset()}
this.endTimeline=function(){o.endTimeline()}
s=function(e,t){var i,n=8,r=8
for(i=0;i<e;i++){0!==r&&(r=(n+t.readExpGolomb()+256)%256)
n=0===r?n:r}}
r=function(e){for(var t,i,n=e.byteLength,r=[],a=1;a<n-2;)if(0===e[a]&&0===e[a+1]&&3===e[a+2]){r.push(a+2)
a+=2}else a++
if(0===r.length)return e
t=n-r.length
i=new Uint8Array(t)
var s=0
for(a=0;a<t;s++,a++){if(s===r[0]){s++
r.shift()}i[a]=e[s]}return i}
a=function(e){var t,i,n,r,a,o,u,l,c,d,h,p,f=0,m=0,g=0,v=0,y=[1,1]
i=(t=new ft(e)).readUnsignedByte()
r=t.readUnsignedByte()
n=t.readUnsignedByte()
t.skipUnsignedExpGolomb()
if(pt[i]){3===(a=t.readUnsignedExpGolomb())&&t.skipBits(1)
t.skipUnsignedExpGolomb()
t.skipUnsignedExpGolomb()
t.skipBits(1)
if(t.readBoolean()){h=3!==a?8:12
for(p=0;p<h;p++)t.readBoolean()&&s(p<6?16:64,t)}}t.skipUnsignedExpGolomb()
if(0===(o=t.readUnsignedExpGolomb()))t.readUnsignedExpGolomb()
else if(1===o){t.skipBits(1)
t.skipExpGolomb()
t.skipExpGolomb()
u=t.readUnsignedExpGolomb()
for(p=0;p<u;p++)t.skipExpGolomb()}t.skipUnsignedExpGolomb()
t.skipBits(1)
l=t.readUnsignedExpGolomb()
c=t.readUnsignedExpGolomb()
0===(d=t.readBits(1))&&t.skipBits(1)
t.skipBits(1)
if(t.readBoolean()){f=t.readUnsignedExpGolomb()
m=t.readUnsignedExpGolomb()
g=t.readUnsignedExpGolomb()
v=t.readUnsignedExpGolomb()}if(t.readBoolean()&&t.readBoolean()){switch(t.readUnsignedByte()){case 1:y=[1,1]
break
case 2:y=[12,11]
break
case 3:y=[10,11]
break
case 4:y=[16,11]
break
case 5:y=[40,33]
break
case 6:y=[24,11]
break
case 7:y=[20,11]
break
case 8:y=[32,11]
break
case 9:y=[80,33]
break
case 10:y=[18,11]
break
case 11:y=[15,11]
break
case 12:y=[64,33]
break
case 13:y=[160,99]
break
case 14:y=[4,3]
break
case 15:y=[3,2]
break
case 16:y=[2,1]
break
case 255:y=[t.readUnsignedByte()<<8|t.readUnsignedByte(),t.readUnsignedByte()<<8|t.readUnsignedByte()]}y&&(y[0],y[1])}return{profileIdc:i,levelIdc:n,profileCompatibility:r,width:16*(l+1)-2*f-2*m,height:(2-d)*(c+1)*16-2*g-2*v,sarRatio:y}}}
dt.prototype=new U
var mt,gt={H264Stream:dt,NalByteStream:ht},vt=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350],yt=function(e,t){var i=e[t+6]<<21|e[t+7]<<14|e[t+8]<<7|e[t+9]
i=i>=0?i:0
return(16&e[t+5])>>4?i+20:i+10},_t=function e(t,i){return t.length-i<10||t[i]!=="I".charCodeAt(0)||t[i+1]!=="D".charCodeAt(0)||t[i+2]!=="3".charCodeAt(0)?i:e(t,i+=yt(t,i))},bt=function(e){return e[0]<<21|e[1]<<14|e[2]<<7|e[3]},Tt={isLikelyAacData:function(e){var t=_t(e,0)
return e.length>=t+2&&!(255&~e[t])&&!(240&~e[t+1])&&16==(22&e[t+1])},parseId3TagSize:yt,parseAdtsSize:function(e,t){var i=(224&e[t+5])>>5,n=e[t+4]<<3
return 6144&e[t+3]|n|i},parseType:function(e,t){return e[t]==="I".charCodeAt(0)&&e[t+1]==="D".charCodeAt(0)&&e[t+2]==="3".charCodeAt(0)?"timed-metadata":!0&e[t]&&!(240&~e[t+1])?"audio":null},parseSampleRate:function(e){for(var t=0;t+5<e.length;){if(255===e[t]&&240==(246&e[t+1]))return vt[(60&e[t+2])>>>2]
t++}return null},parseAacTimestamp:function(e){var t,i,n
t=10
if(64&e[5]){t+=4
t+=bt(e.subarray(10,14))}do{if((i=bt(e.subarray(t+4,t+8)))<1)return null
if("PRIV"===String.fromCharCode(e[t],e[t+1],e[t+2],e[t+3])){n=e.subarray(t+10,t+i+10)
for(var r=0;r<n.byteLength;r++)if(0===n[r]){var a=unescape(function(e,t,i){var n,r=""
for(n=t;n<i;n++)r+="%"+("00"+e[n].toString(16)).slice(-2)
return r}(n,0,r))
if("com.apple.streaming.transportStreamTimestamp"===a){var s=n.subarray(r+1),o=(1&s[3])<<30|s[4]<<22|s[5]<<14|s[6]<<6|s[7]>>>2
o*=4
return o+=3&s[7]}break}}t+=10
t+=i}while(t<e.byteLength)
return null}};(mt=function(){var e=new Uint8Array,t=0
mt.prototype.init.call(this)
this.setTimestamp=function(e){t=e}
this.push=function(i){var n,r,a,s,o=0,u=0
if(e.length){s=e.length;(e=new Uint8Array(i.byteLength+s)).set(e.subarray(0,s))
e.set(i,s)}else e=i
for(;e.length-u>=3;)if(e[u]!=="I".charCodeAt(0)||e[u+1]!=="D".charCodeAt(0)||e[u+2]!=="3".charCodeAt(0))if(255&~e[u]||240&~e[u+1])u++
else{if(e.length-u<7)break
if(u+(o=Tt.parseAdtsSize(e,u))>e.length)break
a={type:"audio",data:e.subarray(u,u+o),pts:t,dts:t}
this.trigger("data",a)
u+=o}else{if(e.length-u<10)break
if(u+(o=Tt.parseId3TagSize(e,u))>e.length)break
r={type:"timed-metadata",data:e.subarray(u,u+o)}
this.trigger("data",r)
u+=o}n=e.length-u
e=n>0?e.subarray(u):new Uint8Array}
this.reset=function(){e=new Uint8Array
this.trigger("reset")}
this.endTimeline=function(){e=new Uint8Array
this.trigger("endedtimeline")}}).prototype=new U
var St,kt,Et,Ct,wt=mt,It=["audioobjecttype","channelcount","samplerate","samplingfrequencyindex","samplesize"],Pt=["width","height","profileIdc","levelIdc","profileCompatibility","sarRatio"],xt=gt.H264Stream,At=Tt.isLikelyAacData,Ot=le,Lt=function(e,t){t.stream=e
this.trigger("log",t)},Dt=function(e,t){for(var i=Object.keys(t),n=0;n<i.length;n++){var r=i[n]
"headOfPipeline"!==r&&t[r].on&&t[r].on("log",Lt.bind(e,r))}},Rt=function(e,t){var i
if(e.length!==t.length)return!1
for(i=0;i<e.length;i++)if(e[i]!==t[i])return!1
return!0},Mt=function(e,t,i,n,r,a){return{start:{dts:e,pts:e+(i-t)},end:{dts:e+(n-t),pts:e+(r-i)},prependedContentDuration:a,baseMediaDecodeTime:e}}
kt=function(e,t){var i,n=[],r=0,a=0,s=1/0
i=(t=t||{}).firstSequenceNumber||0
kt.prototype.init.call(this)
this.push=function(t){Se(e,t)
e&&It.forEach((function(i){e[i]=t[i]}))
n.push(t)}
this.setEarliestDts=function(e){r=e}
this.setVideoBaseMediaDecodeTime=function(e){s=e}
this.setAudioAppendStart=function(e){a=e}
this.flush=function(){var o,u,l,c,d,h,p
if(0!==n.length){o=ge(n,e,r)
e.baseMediaDecodeTime=Te(e,t.keepOriginalTimestamps)
p=me(e,o,a,s)
e.samples=ve(o)
l=Y(ye(o))
n=[]
u=Q(i,[e])
c=new Uint8Array(u.byteLength+l.byteLength)
i++
c.set(u)
c.set(l,u.byteLength)
be(e)
d=Math.ceil(1024*Ot/e.samplerate)
if(o.length){h=o.length*d
this.trigger("segmentTimingInfo",Mt(he(e.baseMediaDecodeTime,e.samplerate),o[0].dts,o[0].pts,o[0].dts+h,o[0].pts+h,p||0))
this.trigger("timingInfo",{start:o[0].pts,end:o[0].pts+h})}this.trigger("data",{track:e,boxes:c})
this.trigger("done","AudioSegmentStream")}else this.trigger("done","AudioSegmentStream")}
this.reset=function(){be(e)
n=[]
this.trigger("reset")}}
kt.prototype=new U
St=function(e,t){var i,n,r,a=[],s=[]
i=(t=t||{}).firstSequenceNumber||0
St.prototype.init.call(this)
delete e.minPTS
this.gopCache_=[]
this.push=function(t){Se(e,t)
if("seq_parameter_set_rbsp"===t.nalUnitType&&!n){n=t.config
e.sps=[t.data]
Pt.forEach((function(t){e[t]=n[t]}),this)}if("pic_parameter_set_rbsp"===t.nalUnitType&&!r){r=t.data
e.pps=[t.data]}a.push(t)}
this.flush=function(){for(var n,r,o,u,l,c,d,h,p=0;a.length&&"access_unit_delimiter_rbsp"!==a[0].nalUnitType;)a.shift()
if(0!==a.length){n=Z(a)
if(!(o=ee(n))[0][0].keyFrame)if(r=this.getGopForFusion_(a[0],e)){p=r.duration
o.unshift(r)
o.byteLength+=r.byteLength
o.nalCount+=r.nalCount
o.pts=r.pts
o.dts=r.dts
o.duration+=r.duration}else o=te(o)
if(s.length){var f
if(!(f=t.alignGopsAtEnd?this.alignGopsAtEnd_(o):this.alignGopsAtStart_(o))){this.gopCache_.unshift({gop:o.pop(),pps:e.pps,sps:e.sps})
this.gopCache_.length=Math.min(6,this.gopCache_.length)
a=[]
this.resetStream_()
this.trigger("done","VideoSegmentStream")
return}be(e)
o=f}Se(e,o)
e.samples=ie(o)
l=Y(ne(o))
e.baseMediaDecodeTime=Te(e,t.keepOriginalTimestamps)
this.trigger("processedGopsInfo",o.map((function(e){return{pts:e.pts,dts:e.dts,byteLength:e.byteLength}})))
d=o[0]
h=o[o.length-1]
this.trigger("segmentTimingInfo",Mt(e.baseMediaDecodeTime,d.dts,d.pts,h.dts+h.duration,h.pts+h.duration,p))
this.trigger("timingInfo",{start:o[0].pts,end:o[o.length-1].pts+o[o.length-1].duration})
this.gopCache_.unshift({gop:o.pop(),pps:e.pps,sps:e.sps})
this.gopCache_.length=Math.min(6,this.gopCache_.length)
a=[]
this.trigger("baseMediaDecodeTime",e.baseMediaDecodeTime)
this.trigger("timelineStartInfo",e.timelineStartInfo)
u=Q(i,[e])
c=new Uint8Array(u.byteLength+l.byteLength)
i++
c.set(u)
c.set(l,u.byteLength)
this.trigger("data",{track:e,boxes:c})
this.resetStream_()
this.trigger("done","VideoSegmentStream")}else{this.resetStream_()
this.trigger("done","VideoSegmentStream")}}
this.reset=function(){this.resetStream_()
a=[]
this.gopCache_.length=0
s.length=0
this.trigger("reset")}
this.resetStream_=function(){be(e)
n=void 0
r=void 0}
this.getGopForFusion_=function(t){var i,n,r,a,s,o=1/0
for(s=0;s<this.gopCache_.length;s++){r=(a=this.gopCache_[s]).gop
if(e.pps&&Rt(e.pps[0],a.pps[0])&&e.sps&&Rt(e.sps[0],a.sps[0])&&(!(r.dts<e.timelineStartInfo.dts)&&(i=t.dts-r.dts-r.duration)>=-1e4&&i<=45e3&&(!n||o>i))){n=a
o=i}}return n?n.gop:null}
this.alignGopsAtStart_=function(e){var t,i,n,r,a,o,u,l
a=e.byteLength
o=e.nalCount
u=e.duration
t=i=0
for(;t<s.length&&i<e.length;){n=s[t]
r=e[i]
if(n.pts===r.pts)break
if(r.pts>n.pts)t++
else{i++
a-=r.byteLength
o-=r.nalCount
u-=r.duration}}if(0===i)return e
if(i===e.length)return null;(l=e.slice(i)).byteLength=a
l.duration=u
l.nalCount=o
l.pts=l[0].pts
l.dts=l[0].dts
return l}
this.alignGopsAtEnd_=function(e){var t,i,n,r,a,o,u
t=s.length-1
i=e.length-1
a=null
o=!1
for(;t>=0&&i>=0;){n=s[t]
r=e[i]
if(n.pts===r.pts){o=!0
break}if(n.pts>r.pts)t--
else{t===s.length-1&&(a=i)
i--}}if(!o&&null===a)return null
if(0===(u=o?i:a))return e
var l=e.slice(u),c=l.reduce((function(e,t){e.byteLength+=t.byteLength
e.duration+=t.duration
e.nalCount+=t.nalCount
return e}),{byteLength:0,duration:0,nalCount:0})
l.byteLength=c.byteLength
l.duration=c.duration
l.nalCount=c.nalCount
l.pts=l[0].pts
l.dts=l[0].dts
return l}
this.alignGopsWith=function(e){s=e}}
St.prototype=new U
Ct=function(e,t){this.numberOfTracks=0
this.metadataStream=t
void 0!==(e=e||{}).remux?this.remuxTracks=!!e.remux:this.remuxTracks=!0
"boolean"==typeof e.keepOriginalTimestamps?this.keepOriginalTimestamps=e.keepOriginalTimestamps:this.keepOriginalTimestamps=!1
this.pendingTracks=[]
this.videoTrack=null
this.pendingBoxes=[]
this.pendingCaptions=[]
this.pendingMetadata=[]
this.pendingBytes=0
this.emittedTracks=0
Ct.prototype.init.call(this)
this.push=function(e){if(e.text)return this.pendingCaptions.push(e)
if(e.frames)return this.pendingMetadata.push(e)
this.pendingTracks.push(e.track)
this.pendingBytes+=e.boxes.byteLength
if("video"===e.track.type){this.videoTrack=e.track
this.pendingBoxes.push(e.boxes)}if("audio"===e.track.type){this.audioTrack=e.track
this.pendingBoxes.unshift(e.boxes)}}}
Ct.prototype=new U
Ct.prototype.flush=function(e){var t,i,n,r,a=0,s={captions:[],captionStreams:{},metadata:[],info:{}},o=0
if(this.pendingTracks.length<this.numberOfTracks){if("VideoSegmentStream"!==e&&"AudioSegmentStream"!==e)return
if(this.remuxTracks)return
if(0===this.pendingTracks.length){this.emittedTracks++
if(this.emittedTracks>=this.numberOfTracks){this.trigger("done")
this.emittedTracks=0}return}}if(this.videoTrack){o=this.videoTrack.timelineStartInfo.pts
Pt.forEach((function(e){s.info[e]=this.videoTrack[e]}),this)}else if(this.audioTrack){o=this.audioTrack.timelineStartInfo.pts
It.forEach((function(e){s.info[e]=this.audioTrack[e]}),this)}if(this.videoTrack||this.audioTrack){1===this.pendingTracks.length?s.type=this.pendingTracks[0].type:s.type="combined"
this.emittedTracks+=this.pendingTracks.length
n=$(this.pendingTracks)
s.initSegment=new Uint8Array(n.byteLength)
s.initSegment.set(n)
s.data=new Uint8Array(this.pendingBytes)
for(r=0;r<this.pendingBoxes.length;r++){s.data.set(this.pendingBoxes[r],a)
a+=this.pendingBoxes[r].byteLength}for(r=0;r<this.pendingCaptions.length;r++){(t=this.pendingCaptions[r]).startTime=fe(t.startPts,o,this.keepOriginalTimestamps)
t.endTime=fe(t.endPts,o,this.keepOriginalTimestamps)
s.captionStreams[t.stream]=!0
s.captions.push(t)}for(r=0;r<this.pendingMetadata.length;r++){(i=this.pendingMetadata[r]).cueTime=fe(i.pts,o,this.keepOriginalTimestamps)
s.metadata.push(i)}s.metadata.dispatchType=this.metadataStream.dispatchType
this.pendingTracks.length=0
this.videoTrack=null
this.pendingBoxes.length=0
this.pendingCaptions.length=0
this.pendingBytes=0
this.pendingMetadata.length=0
this.trigger("data",s)
for(r=0;r<s.captions.length;r++){t=s.captions[r]
this.trigger("caption",t)}for(r=0;r<s.metadata.length;r++){i=s.metadata[r]
this.trigger("id3Frame",i)}}if(this.emittedTracks>=this.numberOfTracks){this.trigger("done")
this.emittedTracks=0}}
Ct.prototype.setRemux=function(e){this.remuxTracks=e}
Et=function(e){var t,i,n=this,r=!0
Et.prototype.init.call(this)
e=e||{}
this.baseMediaDecodeTime=e.baseMediaDecodeTime||0
this.transmuxPipeline_={}
this.setupAacPipeline=function(){var r={}
this.transmuxPipeline_=r
r.type="aac"
r.metadataStream=new st.MetadataStream
r.aacStream=new wt
r.audioTimestampRolloverStream=new st.TimestampRolloverStream("audio")
r.timedMetadataTimestampRolloverStream=new st.TimestampRolloverStream("timed-metadata")
r.adtsStream=new ct
r.coalesceStream=new Ct(e,r.metadataStream)
r.headOfPipeline=r.aacStream
r.aacStream.pipe(r.audioTimestampRolloverStream).pipe(r.adtsStream)
r.aacStream.pipe(r.timedMetadataTimestampRolloverStream).pipe(r.metadataStream).pipe(r.coalesceStream)
r.metadataStream.on("timestamp",(function(e){r.aacStream.setTimestamp(e.timeStamp)}))
r.aacStream.on("data",(function(a){if(!("timed-metadata"!==a.type&&"audio"!==a.type||r.audioSegmentStream)){i=i||{timelineStartInfo:{baseMediaDecodeTime:n.baseMediaDecodeTime},codec:"adts",type:"audio"}
r.coalesceStream.numberOfTracks++
r.audioSegmentStream=new kt(i,e)
r.audioSegmentStream.on("log",n.getLogTrigger_("audioSegmentStream"))
r.audioSegmentStream.on("timingInfo",n.trigger.bind(n,"audioTimingInfo"))
r.adtsStream.pipe(r.audioSegmentStream).pipe(r.coalesceStream)
n.trigger("trackinfo",{hasAudio:!!i,hasVideo:!!t})}}))
r.coalesceStream.on("data",this.trigger.bind(this,"data"))
r.coalesceStream.on("done",this.trigger.bind(this,"done"))
Dt(this,r)}
this.setupTsPipeline=function(){var r={}
this.transmuxPipeline_=r
r.type="ts"
r.metadataStream=new st.MetadataStream
r.packetStream=new st.TransportPacketStream
r.parseStream=new st.TransportParseStream
r.elementaryStream=new st.ElementaryStream
r.timestampRolloverStream=new st.TimestampRolloverStream
r.adtsStream=new ct
r.h264Stream=new xt
r.captionStream=new st.CaptionStream(e)
r.coalesceStream=new Ct(e,r.metadataStream)
r.headOfPipeline=r.packetStream
r.packetStream.pipe(r.parseStream).pipe(r.elementaryStream).pipe(r.timestampRolloverStream)
r.timestampRolloverStream.pipe(r.h264Stream)
r.timestampRolloverStream.pipe(r.adtsStream)
r.timestampRolloverStream.pipe(r.metadataStream).pipe(r.coalesceStream)
r.h264Stream.pipe(r.captionStream).pipe(r.coalesceStream)
r.elementaryStream.on("data",(function(a){var s
if("metadata"===a.type){s=a.tracks.length
for(;s--;)t||"video"!==a.tracks[s].type?i||"audio"!==a.tracks[s].type||((i=a.tracks[s]).timelineStartInfo.baseMediaDecodeTime=n.baseMediaDecodeTime):(t=a.tracks[s]).timelineStartInfo.baseMediaDecodeTime=n.baseMediaDecodeTime
if(t&&!r.videoSegmentStream){r.coalesceStream.numberOfTracks++
r.videoSegmentStream=new St(t,e)
r.videoSegmentStream.on("log",n.getLogTrigger_("videoSegmentStream"))
r.videoSegmentStream.on("timelineStartInfo",(function(t){if(i&&!e.keepOriginalTimestamps){i.timelineStartInfo=t
r.audioSegmentStream.setEarliestDts(t.dts-n.baseMediaDecodeTime)}}))
r.videoSegmentStream.on("processedGopsInfo",n.trigger.bind(n,"gopInfo"))
r.videoSegmentStream.on("segmentTimingInfo",n.trigger.bind(n,"videoSegmentTimingInfo"))
r.videoSegmentStream.on("baseMediaDecodeTime",(function(e){i&&r.audioSegmentStream.setVideoBaseMediaDecodeTime(e)}))
r.videoSegmentStream.on("timingInfo",n.trigger.bind(n,"videoTimingInfo"))
r.h264Stream.pipe(r.videoSegmentStream).pipe(r.coalesceStream)}if(i&&!r.audioSegmentStream){r.coalesceStream.numberOfTracks++
r.audioSegmentStream=new kt(i,e)
r.audioSegmentStream.on("log",n.getLogTrigger_("audioSegmentStream"))
r.audioSegmentStream.on("timingInfo",n.trigger.bind(n,"audioTimingInfo"))
r.audioSegmentStream.on("segmentTimingInfo",n.trigger.bind(n,"audioSegmentTimingInfo"))
r.adtsStream.pipe(r.audioSegmentStream).pipe(r.coalesceStream)}n.trigger("trackinfo",{hasAudio:!!i,hasVideo:!!t})}}))
r.coalesceStream.on("data",this.trigger.bind(this,"data"))
r.coalesceStream.on("id3Frame",(function(e){e.dispatchType=r.metadataStream.dispatchType
n.trigger("id3Frame",e)}))
r.coalesceStream.on("caption",this.trigger.bind(this,"caption"))
r.coalesceStream.on("done",this.trigger.bind(this,"done"))
Dt(this,r)}
this.setBaseMediaDecodeTime=function(n){var r=this.transmuxPipeline_
e.keepOriginalTimestamps||(this.baseMediaDecodeTime=n)
if(i){i.timelineStartInfo.dts=void 0
i.timelineStartInfo.pts=void 0
be(i)
r.audioTimestampRolloverStream&&r.audioTimestampRolloverStream.discontinuity()}if(t){r.videoSegmentStream&&(r.videoSegmentStream.gopCache_=[])
t.timelineStartInfo.dts=void 0
t.timelineStartInfo.pts=void 0
be(t)
r.captionStream.reset()}r.timestampRolloverStream&&r.timestampRolloverStream.discontinuity()}
this.setAudioAppendStart=function(e){i&&this.transmuxPipeline_.audioSegmentStream.setAudioAppendStart(e)}
this.setRemux=function(t){var i=this.transmuxPipeline_
e.remux=t
i&&i.coalesceStream&&i.coalesceStream.setRemux(t)}
this.alignGopsWith=function(e){t&&this.transmuxPipeline_.videoSegmentStream&&this.transmuxPipeline_.videoSegmentStream.alignGopsWith(e)}
this.getLogTrigger_=function(e){var t=this
return function(i){i.stream=e
t.trigger("log",i)}}
this.push=function(e){if(r){var t=At(e)
t&&"aac"!==this.transmuxPipeline_.type?this.setupAacPipeline():t||"ts"===this.transmuxPipeline_.type||this.setupTsPipeline()
r=!1}this.transmuxPipeline_.headOfPipeline.push(e)}
this.flush=function(){r=!0
this.transmuxPipeline_.headOfPipeline.flush()}
this.endTimeline=function(){this.transmuxPipeline_.headOfPipeline.endTimeline()}
this.reset=function(){this.transmuxPipeline_.headOfPipeline&&this.transmuxPipeline_.headOfPipeline.reset()}
this.resetCaptions=function(){this.transmuxPipeline_.captionStream&&this.transmuxPipeline_.captionStream.reset()}}
Et.prototype=new U
var Nt,Ut,Bt,Ft={Transmuxer:Et,VideoSegmentStream:St,AudioSegmentStream:kt,AUDIO_PROPERTIES:It,VIDEO_PROPERTIES:Pt,generateSegmentTimingInfo:Mt},jt=function(e){return e>>>0},Vt=function(e){var t=""
t+=String.fromCharCode(e[0])
t+=String.fromCharCode(e[1])
t+=String.fromCharCode(e[2])
return t+=String.fromCharCode(e[3])},Ht=jt,qt=function e(t,i){var n,r,a,s,o,u=[]
if(!i.length)return null
for(n=0;n<t.byteLength;){r=Ht(t[n]<<24|t[n+1]<<16|t[n+2]<<8|t[n+3])
a=Vt(t.subarray(n+4,n+8))
s=r>1?n+r:t.byteLength
a===i[0]&&(1===i.length?u.push(t.subarray(n+8,s)):(o=e(t.subarray(n+8,s),i.slice(1))).length&&(u=u.concat(o)))
n=s}return u},Wt=jt,Gt=F.getUint64,zt=function(e){var t={version:e[0],flags:new Uint8Array(e.subarray(1,4))}
1===t.version?t.baseMediaDecodeTime=Gt(e.subarray(4)):t.baseMediaDecodeTime=Wt(e[4]<<24|e[5]<<16|e[6]<<8|e[7])
return t},Kt=function(e){return{isLeading:(12&e[0])>>>2,dependsOn:3&e[0],isDependedOn:(192&e[1])>>>6,hasRedundancy:(48&e[1])>>>4,paddingValue:(14&e[1])>>>1,isNonSyncSample:1&e[1],degradationPriority:e[2]<<8|e[3]}},Xt=function(e){var t,i={version:e[0],flags:new Uint8Array(e.subarray(1,4)),samples:[]},n=new DataView(e.buffer,e.byteOffset,e.byteLength),r=1&i.flags[2],a=4&i.flags[2],s=1&i.flags[1],o=2&i.flags[1],u=4&i.flags[1],l=8&i.flags[1],c=n.getUint32(4),d=8
if(r){i.dataOffset=n.getInt32(d)
d+=4}if(a&&c){t={flags:Kt(e.subarray(d,d+4))}
d+=4
if(s){t.duration=n.getUint32(d)
d+=4}if(o){t.size=n.getUint32(d)
d+=4}if(l){1===i.version?t.compositionTimeOffset=n.getInt32(d):t.compositionTimeOffset=n.getUint32(d)
d+=4}i.samples.push(t)
c--}for(;c--;){t={}
if(s){t.duration=n.getUint32(d)
d+=4}if(o){t.size=n.getUint32(d)
d+=4}if(u){t.flags=Kt(e.subarray(d,d+4))
d+=4}if(l){1===i.version?t.compositionTimeOffset=n.getInt32(d):t.compositionTimeOffset=n.getUint32(d)
d+=4}i.samples.push(t)}return i},Yt=function(e){var t,i=new DataView(e.buffer,e.byteOffset,e.byteLength),n={version:e[0],flags:new Uint8Array(e.subarray(1,4)),trackId:i.getUint32(4)},r=1&n.flags[2],a=2&n.flags[2],s=8&n.flags[2],o=16&n.flags[2],u=32&n.flags[2],l=65536&n.flags[0],c=131072&n.flags[0]
t=8
if(r){t+=4
n.baseDataOffset=i.getUint32(12)
t+=4}if(a){n.sampleDescriptionIndex=i.getUint32(t)
t+=4}if(s){n.defaultSampleDuration=i.getUint32(t)
t+=4}if(o){n.defaultSampleSize=i.getUint32(t)
t+=4}u&&(n.defaultSampleFlags=i.getUint32(t))
l&&(n.durationIsEmpty=!0)
!r&&c&&(n.baseDataOffsetIsMoof=!0)
return n},Qt="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},$t="undefined"!=typeof window?window:void 0!==Qt?Qt:"undefined"!=typeof self?self:{},Jt=we,Zt=Fe.CaptionStream,ei=function(e,t){for(var i=e,n=0;n<t.length;n++){var r=t[n]
if(i<r.size)return r
i-=r.size}return null},ti=function(e,t){var i=qt(e,["moof","traf"]),n=qt(e,["mdat"]),r={},a=[]
n.forEach((function(e,t){var n=i[t]
a.push({mdat:e,traf:n})}))
a.forEach((function(e){var i,n,a=e.mdat,s=e.traf,o=qt(s,["tfhd"]),u=Yt(o[0]),l=u.trackId,c=qt(s,["tfdt"]),d=c.length>0?zt(c[0]).baseMediaDecodeTime:0,h=qt(s,["trun"])
if(t===l&&h.length>0){i=function(e,t,i){var n=t,r=i.defaultSampleDuration||0,a=i.defaultSampleSize||0,s=i.trackId,o=[]
e.forEach((function(e){var t=Xt(e).samples
t.forEach((function(e){void 0===e.duration&&(e.duration=r)
void 0===e.size&&(e.size=a)
e.trackId=s
e.dts=n
void 0===e.compositionTimeOffset&&(e.compositionTimeOffset=0)
if("bigint"==typeof n){e.pts=n+$t.BigInt(e.compositionTimeOffset)
n+=$t.BigInt(e.duration)}else{e.pts=n+e.compositionTimeOffset
n+=e.duration}}))
o=o.concat(t)}))
return o}(h,d,u)
n=function(e,t,i){var n,r,a,s,o=new DataView(e.buffer,e.byteOffset,e.byteLength),u={logs:[],seiNals:[]}
for(r=0;r+4<e.length;r+=a){a=o.getUint32(r)
r+=4
if(!(a<=0))switch(31&e[r]){case 6:var l=e.subarray(r+1,r+1+a),c=ei(r,t)
n={nalUnitType:"sei_rbsp",size:a,data:l,escapedRBSP:Jt(l),trackId:i}
if(c){n.pts=c.pts
n.dts=c.dts
s=c}else{if(!s){u.logs.push({level:"warn",message:"We've encountered a nal unit without data at "+r+" for trackId "+i+". See mux.js#223."})
break}n.pts=s.pts
n.dts=s.dts}u.seiNals.push(n)}}return u}(a,i,l)
r[l]||(r[l]={seiNals:[],logs:[]})
r[l].seiNals=r[l].seiNals.concat(n.seiNals)
r[l].logs=r[l].logs.concat(n.logs)}}))
return r},ii=function(){var e,t,i,n,r,a,s=!1
this.isInitialized=function(){return s}
this.init=function(t){e=new Zt
s=!0
a=!!t&&t.isPartial
e.on("data",(function(e){e.startTime=e.startPts/n
e.endTime=e.endPts/n
r.captions.push(e)
r.captionStreams[e.stream]=!0}))
e.on("log",(function(e){r.logs.push(e)}))}
this.isNewInit=function(e,t){return!(e&&0===e.length||t&&"object"==typeof t&&0===Object.keys(t).length)&&(i!==e[0]||n!==t[i])}
this.parse=function(e,a,s){var o
if(!this.isInitialized())return null
if(!a||!s)return null
if(this.isNewInit(a,s)){i=a[0]
n=s[i]}else if(null===i||!n){t.push(e)
return null}for(;t.length>0;){var u=t.shift()
this.parse(u,a,s)}o=function(e,t,i){if(null===t)return null
var n=ti(e,t)[t]||{}
return{seiNals:n.seiNals,logs:n.logs,timescale:i}}(e,i,n)
o&&o.logs&&(r.logs=r.logs.concat(o.logs))
if(null===o||!o.seiNals)return r.logs.length?{logs:r.logs,captions:[],captionStreams:[]}:null
this.pushNals(o.seiNals)
this.flushStream()
return r}
this.pushNals=function(t){if(!this.isInitialized()||!t||0===t.length)return null
t.forEach((function(t){e.push(t)}))}
this.flushStream=function(){if(!this.isInitialized())return null
a?e.partialFlush():e.flush()}
this.clearParsedCaptions=function(){r.captions=[]
r.captionStreams={}
r.logs=[]}
this.resetCaptionStream=function(){if(!this.isInitialized())return null
e.reset()}
this.clearAllCaptions=function(){this.clearParsedCaptions()
this.resetCaptionStream()}
this.reset=function(){t=[]
i=null
n=null
r?this.clearParsedCaptions():r={captions:[],captionStreams:{},logs:[]}
this.resetCaptionStream()}
this.reset()},ni=jt,ri=function(e){return("00"+e.toString(16)).slice(-2)},ai=F.getUint64
0
Nt=function(e,t){var i=qt(t,["moof","traf"]).reduce((function(t,i){var n,r,a=qt(i,["tfhd"])[0],s=ni(a[4]<<24|a[5]<<16|a[6]<<8|a[7]),o=e[s]||9e4,u=qt(i,["tfdt"])[0],l=new DataView(u.buffer,u.byteOffset,u.byteLength)
"bigint"==typeof(n=1===u[0]?ai(u.subarray(4,12)):l.getUint32(4))?r=n/$t.BigInt(o):"number"!=typeof n||isNaN(n)||(r=n/o)
r<Number.MAX_SAFE_INTEGER&&(r=Number(r))
r<t&&(t=r)
return t}),1/0)
return"bigint"==typeof i||isFinite(i)?i:0}
0
0
Bt=function(e){var t=0===e[0]?12:20
return ni(e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3])}
Ut=function(e){var t=qt(e,["moov","trak"]),i=[]
t.forEach((function(e){var t,n,r={},a=qt(e,["tkhd"])[0]
if(a){n=(t=new DataView(a.buffer,a.byteOffset,a.byteLength)).getUint8(0)
r.id=0===n?t.getUint32(12):t.getUint32(20)}var s=qt(e,["mdia","hdlr"])[0]
if(s){var o=Vt(s.subarray(8,12))
r.type="vide"===o?"video":"soun"===o?"audio":o}var u=qt(e,["mdia","minf","stbl","stsd"])[0]
if(u){var l=u.subarray(8)
r.codec=Vt(l.subarray(4,8))
var c,d=qt(l,[r.codec])[0]
if(d)if(/^[asm]vc[1-9]$/i.test(r.codec)){c=d.subarray(78)
if("avcC"===Vt(c.subarray(4,8))&&c.length>11){r.codec+="."
r.codec+=ri(c[9])
r.codec+=ri(c[10])
r.codec+=ri(c[11])}else r.codec="avc1.4d400d"}else if(/^mp4[a,v]$/i.test(r.codec)){c=d.subarray(28)
if("esds"===Vt(c.subarray(4,8))&&c.length>20&&0!==c[19]){r.codec+="."+ri(c[19])
r.codec+="."+ri(c[20]>>>2&63).replace(/^0/,"")}else r.codec="mp4a.40.2"}else r.codec=r.codec.toLowerCase()}var h=qt(e,["mdia","mdhd"])[0]
h&&(r.timescale=Bt(h))
i.push(r)}))
return i}
var si=Nt,oi=Ut,ui=function(e){var t=31&e[1]
t<<=8
return t|=e[2]},li=function(e){return!!(64&e[1])},ci=function(e){var t=0;(48&e[3])>>>4>1&&(t+=e[4]+1)
return t},di=function(e){switch(e){case 5:return"slice_layer_without_partitioning_rbsp_idr"
case 6:return"sei_rbsp"
case 7:return"seq_parameter_set_rbsp"
case 8:return"pic_parameter_set_rbsp"
case 9:return"access_unit_delimiter_rbsp"
default:return null}},hi={parseType:function(e,t){var i=ui(e)
return 0===i?"pat":i===t?"pmt":t?"pes":null},parsePat:function(e){var t=li(e),i=4+ci(e)
t&&(i+=e[i]+1)
return(31&e[i+10])<<8|e[i+11]},parsePmt:function(e){var t={},i=li(e),n=4+ci(e)
i&&(n+=e[n]+1)
if(1&e[n+5]){var r
r=3+((15&e[n+1])<<8|e[n+2])-4
for(var a=12+((15&e[n+10])<<8|e[n+11]);a<r;){var s=n+a
t[(31&e[s+1])<<8|e[s+2]]=e[s]
a+=5+((15&e[s+3])<<8|e[s+4])}return t}},parsePayloadUnitStartIndicator:li,parsePesType:function(e,t){switch(t[ui(e)]){case je.H264_STREAM_TYPE:return"video"
case je.ADTS_STREAM_TYPE:return"audio"
case je.METADATA_STREAM_TYPE:return"timed-metadata"
default:return null}},parsePesTime:function(e){if(!li(e))return null
var t=4+ci(e)
if(t>=e.byteLength)return null
var i,n=null
if(192&(i=e[t+7])){(n={}).pts=(14&e[t+9])<<27|(255&e[t+10])<<20|(254&e[t+11])<<12|(255&e[t+12])<<5|(254&e[t+13])>>>3
n.pts*=4
n.pts+=(6&e[t+13])>>>1
n.dts=n.pts
if(64&i){n.dts=(14&e[t+14])<<27|(255&e[t+15])<<20|(254&e[t+16])<<12|(255&e[t+17])<<5|(254&e[t+18])>>>3
n.dts*=4
n.dts+=(6&e[t+18])>>>1}}return n},videoPacketContainsKeyFrame:function(e){for(var t=4+ci(e),i=e.subarray(t),n=0,r=0,a=!1;r<i.byteLength-3;r++)if(1===i[r+2]){n=r+5
break}for(;n<i.byteLength;)switch(i[n]){case 0:if(0!==i[n-1]){n+=2
break}if(0!==i[n-2]){n++
break}r+3!==n-2&&"slice_layer_without_partitioning_rbsp_idr"===di(31&i[r+3])&&(a=!0)
do{n++}while(1!==i[n]&&n<i.length)
r=n-2
n+=3
break
case 1:if(0!==i[n-1]||0!==i[n-2]){n+=3
break}"slice_layer_without_partitioning_rbsp_idr"===di(31&i[r+3])&&(a=!0)
r=n-2
n+=3
break
default:n+=3}i=i.subarray(r)
n-=r
r=0
i&&i.byteLength>3&&"slice_layer_without_partitioning_rbsp_idr"===di(31&i[r+3])&&(a=!0)
return a}},pi=ze,fi={}
fi.ts=hi
fi.aac=Tt
var mi=le,gi=188,vi=71,yi=function(e,t,i){for(var n,r,a,s,o=0,u=gi,l=!1;u<=e.byteLength;)if(e[o]!==vi||e[u]!==vi&&u!==e.byteLength){o++
u++}else{n=e.subarray(o,u)
if("pes"===fi.ts.parseType(n,t.pid)){r=fi.ts.parsePesType(n,t.table)
a=fi.ts.parsePayloadUnitStartIndicator(n)
if("audio"===r&&a&&(s=fi.ts.parsePesTime(n))){s.type="audio"
i.audio.push(s)
l=!0}}if(l)break
o+=gi
u+=gi}o=(u=e.byteLength)-gi
l=!1
for(;o>=0;)if(e[o]!==vi||e[u]!==vi&&u!==e.byteLength){o--
u--}else{n=e.subarray(o,u)
if("pes"===fi.ts.parseType(n,t.pid)){r=fi.ts.parsePesType(n,t.table)
a=fi.ts.parsePayloadUnitStartIndicator(n)
if("audio"===r&&a&&(s=fi.ts.parsePesTime(n))){s.type="audio"
i.audio.push(s)
l=!0}}if(l)break
o-=gi
u-=gi}},_i=function(e,t,i){for(var n,r,a,s,o,u,l,c=0,d=gi,h=!1,p={data:[],size:0};d<e.byteLength;)if(e[c]!==vi||e[d]!==vi){c++
d++}else{n=e.subarray(c,d)
if("pes"===fi.ts.parseType(n,t.pid)){r=fi.ts.parsePesType(n,t.table)
a=fi.ts.parsePayloadUnitStartIndicator(n)
if("video"===r){if(a&&!h&&(s=fi.ts.parsePesTime(n))){s.type="video"
i.video.push(s)
h=!0}if(!i.firstKeyFrame){if(a&&0!==p.size){o=new Uint8Array(p.size)
u=0
for(;p.data.length;){l=p.data.shift()
o.set(l,u)
u+=l.byteLength}if(fi.ts.videoPacketContainsKeyFrame(o)){var f=fi.ts.parsePesTime(o)
if(f){i.firstKeyFrame=f
i.firstKeyFrame.type="video"}else console.warn("Failed to extract PTS/DTS from PES at first keyframe. This could be an unusual TS segment, or else mux.js did not parse your TS segment correctly. If you know your TS segments do contain PTS/DTS on keyframes please file a bug report! You can try ffprobe to double check for yourself.")}p.size=0}p.data.push(n)
p.size+=n.byteLength}}}if(h&&i.firstKeyFrame)break
c+=gi
d+=gi}c=(d=e.byteLength)-gi
h=!1
for(;c>=0;)if(e[c]!==vi||e[d]!==vi){c--
d--}else{n=e.subarray(c,d)
if("pes"===fi.ts.parseType(n,t.pid)){r=fi.ts.parsePesType(n,t.table)
a=fi.ts.parsePayloadUnitStartIndicator(n)
if("video"===r&&a&&(s=fi.ts.parsePesTime(n))){s.type="video"
i.video.push(s)
h=!0}}if(h)break
c-=gi
d-=gi}},bi=function(e){var t={pid:null,table:null},i={}
!function(e,t){for(var i,n=0,r=gi;r<e.byteLength;)if(e[n]!==vi||e[r]!==vi){n++
r++}else{i=e.subarray(n,r)
switch(fi.ts.parseType(i,t.pid)){case"pat":t.pid=fi.ts.parsePat(i)
break
case"pmt":var a=fi.ts.parsePmt(i)
t.table=t.table||{}
Object.keys(a).forEach((function(e){t.table[e]=a[e]}))}n+=gi
r+=gi}}(e,t)
for(var n in t.table)if(t.table.hasOwnProperty(n)){switch(t.table[n]){case je.H264_STREAM_TYPE:i.video=[]
_i(e,t,i)
0===i.video.length&&delete i.video
break
case je.ADTS_STREAM_TYPE:i.audio=[]
yi(e,t,i)
0===i.audio.length&&delete i.audio}}return i},Ti=function(e,t){var i
i=fi.aac.isLikelyAacData(e)?function(e){for(var t,i=!1,n=0,r=null,a=null,s=0,o=0;e.length-o>=3;){switch(fi.aac.parseType(e,o)){case"timed-metadata":if(e.length-o<10){i=!0
break}if((s=fi.aac.parseId3TagSize(e,o))>e.length){i=!0
break}if(null===a){t=e.subarray(o,o+s)
a=fi.aac.parseAacTimestamp(t)}o+=s
break
case"audio":if(e.length-o<7){i=!0
break}if((s=fi.aac.parseAdtsSize(e,o))>e.length){i=!0
break}if(null===r){t=e.subarray(o,o+s)
r=fi.aac.parseSampleRate(t)}n++
o+=s
break
default:o++}if(i)return null}if(null===r||null===a)return null
var u=mi/r
return{audio:[{type:"audio",dts:a,pts:a},{type:"audio",dts:a+1024*n*u,pts:a+1024*n*u}]}}(e):bi(e)
if(!i||!i.audio&&!i.video)return null
!function(e,t){if(e.audio&&e.audio.length){var i=t;(void 0===i||isNaN(i))&&(i=e.audio[0].dts)
e.audio.forEach((function(e){e.dts=pi(e.dts,i)
e.pts=pi(e.pts,i)
e.dtsTime=e.dts/mi
e.ptsTime=e.pts/mi}))}if(e.video&&e.video.length){var n=t;(void 0===n||isNaN(n))&&(n=e.video[0].dts)
e.video.forEach((function(e){e.dts=pi(e.dts,n)
e.pts=pi(e.pts,n)
e.dtsTime=e.dts/mi
e.ptsTime=e.pts/mi}))
if(e.firstKeyFrame){var r=e.firstKeyFrame
r.dts=pi(r.dts,n)
r.pts=pi(r.pts,n)
r.dtsTime=r.dts/mi
r.ptsTime=r.pts/mi}}}(i,t)
return i},Si=function(){function e(e,t){this.options=t||{}
this.self=e
this.init()}var t=e.prototype
t.init=function(){this.transmuxer&&this.transmuxer.dispose()
this.transmuxer=new Ft.Transmuxer(this.options)
!function(e,t){t.on("data",(function(t){var i=t.initSegment
t.initSegment={data:i.buffer,byteOffset:i.byteOffset,byteLength:i.byteLength}
var n=t.data
t.data=n.buffer
e.postMessage({action:"data",segment:t,byteOffset:n.byteOffset,byteLength:n.byteLength},[t.data])}))
t.on("done",(function(t){e.postMessage({action:"done"})}))
t.on("gopInfo",(function(t){e.postMessage({action:"gopInfo",gopInfo:t})}))
t.on("videoSegmentTimingInfo",(function(t){var i={start:{decode:de(t.start.dts),presentation:de(t.start.pts)},end:{decode:de(t.end.dts),presentation:de(t.end.pts)},baseMediaDecodeTime:de(t.baseMediaDecodeTime)}
t.prependedContentDuration&&(i.prependedContentDuration=de(t.prependedContentDuration))
e.postMessage({action:"videoSegmentTimingInfo",videoSegmentTimingInfo:i})}))
t.on("audioSegmentTimingInfo",(function(t){var i={start:{decode:de(t.start.dts),presentation:de(t.start.pts)},end:{decode:de(t.end.dts),presentation:de(t.end.pts)},baseMediaDecodeTime:de(t.baseMediaDecodeTime)}
t.prependedContentDuration&&(i.prependedContentDuration=de(t.prependedContentDuration))
e.postMessage({action:"audioSegmentTimingInfo",audioSegmentTimingInfo:i})}))
t.on("id3Frame",(function(t){e.postMessage({action:"id3Frame",id3Frame:t})}))
t.on("caption",(function(t){e.postMessage({action:"caption",caption:t})}))
t.on("trackinfo",(function(t){e.postMessage({action:"trackinfo",trackInfo:t})}))
t.on("audioTimingInfo",(function(t){e.postMessage({action:"audioTimingInfo",audioTimingInfo:{start:de(t.start),end:de(t.end)}})}))
t.on("videoTimingInfo",(function(t){e.postMessage({action:"videoTimingInfo",videoTimingInfo:{start:de(t.start),end:de(t.end)}})}))
t.on("log",(function(t){e.postMessage({action:"log",log:t})}))}(this.self,this.transmuxer)}
t.pushMp4Captions=function(e){if(!this.captionParser){this.captionParser=new ii
this.captionParser.init()}var t=new Uint8Array(e.data,e.byteOffset,e.byteLength),i=this.captionParser.parse(t,e.trackIds,e.timescales)
this.self.postMessage({action:"mp4Captions",captions:i&&i.captions||[],logs:i&&i.logs||[],data:t.buffer},[t.buffer])}
t.probeMp4StartTime=function(e){var t=e.timescales,i=e.data,n=si(t,i)
this.self.postMessage({action:"probeMp4StartTime",startTime:n,data:i},[i.buffer])}
t.probeMp4Tracks=function(e){var t=e.data,i=oi(t)
this.self.postMessage({action:"probeMp4Tracks",tracks:i,data:t},[t.buffer])}
t.probeTs=function(e){var t=e.data,i=e.baseStartTime,n="number"!=typeof i||isNaN(i)?void 0:i*le,r=Ti(t,n),a=null
if(r){(a={hasVideo:r.video&&2===r.video.length||!1,hasAudio:r.audio&&2===r.audio.length||!1}).hasVideo&&(a.videoStart=r.video[0].ptsTime)
a.hasAudio&&(a.audioStart=r.audio[0].ptsTime)}this.self.postMessage({action:"probeTs",result:a,data:t},[t.buffer])}
t.clearAllMp4Captions=function(){this.captionParser&&this.captionParser.clearAllCaptions()}
t.clearParsedMp4Captions=function(){this.captionParser&&this.captionParser.clearParsedCaptions()}
t.push=function(e){var t=new Uint8Array(e.data,e.byteOffset,e.byteLength)
this.transmuxer.push(t)}
t.reset=function(){this.transmuxer.reset()}
t.setTimestampOffset=function(e){var t=e.timestampOffset||0
this.transmuxer.setBaseMediaDecodeTime(Math.round(ce(t)))}
t.setAudioAppendStart=function(e){this.transmuxer.setAudioAppendStart(Math.ceil(ce(e.appendStart)))}
t.setRemux=function(e){this.transmuxer.setRemux(e.remux)}
t.flush=function(e){this.transmuxer.flush()
self.postMessage({action:"done",type:"transmuxed"})}
t.endTimeline=function(){this.transmuxer.endTimeline()
self.postMessage({action:"endedtimeline",type:"transmuxed"})}
t.alignGopsWith=function(e){this.transmuxer.alignGopsWith(e.gopsToAlignWith.slice())}
return e}()
self.onmessage=function(e){if("init"===e.data.action&&e.data.options)this.messageHandlers=new Si(self,e.data.options)
else{this.messageHandlers||(this.messageHandlers=new Si(self))
e.data&&e.data.action&&"init"!==e.data.action&&this.messageHandlers[e.data.action]&&this.messageHandlers[e.data.action](e.data)}}}))),dd=od(cd),hd=function(e){var t=e.transmuxer,i=e.bytes,n=e.audioAppendStart,r=e.gopsToAlignWith,a=e.remux,s=e.onData,o=e.onTrackInfo,u=e.onAudioTimingInfo,l=e.onVideoTimingInfo,c=e.onVideoSegmentTimingInfo,d=e.onAudioSegmentTimingInfo,h=e.onId3,p=e.onCaptions,f=e.onDone,m=e.onEndedTimeline,g=e.onTransmuxerLog,v=e.isEndOfTimeline,y={buffer:[]},_=v
t.onmessage=function(i){if(t.currentTransmux===e){"data"===i.data.action&&function(e,t,i){var n=e.data.segment,r=n.type,a=n.initSegment,s=n.captions,o=n.captionStreams,u=n.metadata,l=n.videoFrameDtsTime,c=n.videoFramePtsTime
t.buffer.push({captions:s,captionStreams:o,metadata:u})
var d=e.data.segment.boxes||{data:e.data.segment.data},h={type:r,data:new Uint8Array(d.data,d.data.byteOffset,d.data.byteLength),initSegment:new Uint8Array(a.data,a.byteOffset,a.byteLength)}
void 0!==l&&(h.videoFrameDtsTime=l)
void 0!==c&&(h.videoFramePtsTime=c)
i(h)}(i,y,s)
"trackinfo"===i.data.action&&o(i.data.trackInfo)
"gopInfo"===i.data.action&&function(e,t){t.gopInfo=e.data.gopInfo}(i,y)
"audioTimingInfo"===i.data.action&&u(i.data.audioTimingInfo)
"videoTimingInfo"===i.data.action&&l(i.data.videoTimingInfo)
"videoSegmentTimingInfo"===i.data.action&&c(i.data.videoSegmentTimingInfo)
"audioSegmentTimingInfo"===i.data.action&&d(i.data.audioSegmentTimingInfo)
"id3Frame"===i.data.action&&h([i.data.id3Frame],i.data.id3Frame.dispatchType)
"caption"===i.data.action&&p(i.data.caption)
if("endedtimeline"===i.data.action){_=!1
m()}"log"===i.data.action&&g(i.data.log)
if("transmuxed"===i.data.type&&!_){t.onmessage=null
!function(e){var t=e.transmuxedData,i=e.callback
t.buffer=[]
i(t)}({transmuxedData:y,callback:f})
pd(t)}}}
n&&t.postMessage({action:"setAudioAppendStart",appendStart:n})
Array.isArray(r)&&t.postMessage({action:"alignGopsWith",gopsToAlignWith:r})
void 0!==a&&t.postMessage({action:"setRemux",remux:a})
if(i.byteLength){var b=i instanceof ArrayBuffer?i:i.buffer,T=i instanceof ArrayBuffer?0:i.byteOffset
t.postMessage({action:"push",data:b,byteOffset:T,byteLength:i.byteLength},[b])}v&&t.postMessage({action:"endTimeline"})
t.postMessage({action:"flush"})},pd=function(e){e.currentTransmux=null
if(e.transmuxQueue.length){e.currentTransmux=e.transmuxQueue.shift()
"function"==typeof e.currentTransmux?e.currentTransmux():hd(e.currentTransmux)}},fd=function(e,t){e.postMessage({action:t})
pd(e)},md=function(e,t){if(t.currentTransmux)t.transmuxQueue.push(fd.bind(null,t,e))
else{t.currentTransmux=e
fd(t,e)}},gd=function(e){if(e.transmuxer.currentTransmux)e.transmuxer.transmuxQueue.push(e)
else{e.transmuxer.currentTransmux=e
hd(e)}},vd=function(e){md("reset",e)},yd=function(e){var t=new dd
t.currentTransmux=null
t.transmuxQueue=[]
var i=t.terminate
t.terminate=function(){t.currentTransmux=null
t.transmuxQueue.length=0
return i.call(t)}
t.postMessage({action:"init",options:e})
return t},_d=function(e){var t=e.transmuxer,i=e.endAction||e.action,n=e.callback,r=R({},e,{endAction:null,transmuxer:null,callback:null})
t.addEventListener("message",(function r(a){if(a.data.action===i){t.removeEventListener("message",r)
if(a.data.data){a.data.data=new Uint8Array(a.data.data,e.byteOffset||0,e.byteLength||a.data.data.byteLength)
e.data&&(e.data=a.data.data)}n(a.data)}}))
if(e.data){var a=e.data instanceof ArrayBuffer
r.byteOffset=a?0:e.data.byteOffset
r.byteLength=e.data.byteLength
var s=[a?e.data:e.data.buffer]
t.postMessage(r,s)}else t.postMessage(r)},bd=2,Td=-101,Sd=-102,kd=function(e){e.forEach((function(e){e.abort()}))},Ed=function(e,t){return t.timedout?{status:t.status,message:"HLS request timed-out at URL: "+t.uri,code:Td,xhr:t}:t.aborted?{status:t.status,message:"HLS request aborted at URL: "+t.uri,code:Sd,xhr:t}:e?{status:t.status,message:"HLS request errored at URL: "+t.uri,code:bd,xhr:t}:"arraybuffer"===t.responseType&&0===t.response.byteLength?{status:t.status,message:"Empty HLS response at URL: "+t.uri,code:bd,xhr:t}:null},Cd=function(e,t,i){return function(n,r){var a=r.response,s=Ed(n,r)
if(s)return i(s,e)
if(16!==a.byteLength)return i({status:r.status,message:"Invalid HLS key at URL: "+r.uri,code:bd,xhr:r},e)
for(var o=new DataView(a),u=new Uint32Array([o.getUint32(0),o.getUint32(4),o.getUint32(8),o.getUint32(12)]),l=0;l<t.length;l++)t[l].bytes=u
return i(null,e)}},wd=function(e,t){var i=kr(e.map.bytes)
if("mp4"!==i){var n=e.map.resolvedUri||e.map.uri
return t({internal:!0,message:"Found unsupported "+(i||"unknown")+" container for initialization segment at URL: "+n,code:bd})}_d({action:"probeMp4Tracks",data:e.map.bytes,transmuxer:e.transmuxer,callback:function(i){var n=i.tracks,r=i.data
e.map.bytes=r
n.forEach((function(t){e.map.tracks=e.map.tracks||{}
if(!e.map.tracks[t.type]){e.map.tracks[t.type]=t
if("number"==typeof t.id&&t.timescale){e.map.timescales=e.map.timescales||{}
e.map.timescales[t.id]=t.timescale}}}))
return t(null)}})},Id=function(e){var t=e.segment,i=e.finishProcessingFn,n=e.responseType
return function(e,r){var a=Ed(e,r)
if(a)return i(a,t)
var s="arraybuffer"!==n&&r.responseText?function(e){for(var t=new Uint8Array(new ArrayBuffer(e.length)),i=0;i<e.length;i++)t[i]=e.charCodeAt(i)
return t.buffer}(r.responseText.substring(t.lastReachedChar||0)):r.response
t.stats=function(e){return{bandwidth:e.bandwidth,bytesReceived:e.bytesReceived||0,roundTripTime:e.roundTripTime||0}}(r)
t.key?t.encryptedBytes=new Uint8Array(s):t.bytes=new Uint8Array(s)
return i(null,t)}},Pd=function(e){var t=e.segment,i=e.bytes,n=e.trackInfoFn,r=e.timingInfoFn,a=e.videoSegmentTimingInfoFn,s=e.audioSegmentTimingInfoFn,o=e.id3Fn,u=e.captionsFn,l=e.isEndOfTimeline,c=e.endedTimelineFn,d=e.dataFn,h=e.doneFn,p=e.onTransmuxerLog,f=t.map&&t.map.tracks||{},m=Boolean(f.audio&&f.video),g=r.bind(null,t,"audio","start"),v=r.bind(null,t,"audio","end"),y=r.bind(null,t,"video","start"),_=r.bind(null,t,"video","end")
_d({action:"probeTs",transmuxer:t.transmuxer,data:i,baseStartTime:t.baseStartTime,callback:function(e){t.bytes=i=e.data
var r=e.result
if(r){n(t,{hasAudio:r.hasAudio,hasVideo:r.hasVideo,isMuxed:m})
n=null
r.hasAudio&&!m&&g(r.audioStart)
r.hasVideo&&y(r.videoStart)
g=null
y=null}gd({bytes:i,transmuxer:t.transmuxer,audioAppendStart:t.audioAppendStart,gopsToAlignWith:t.gopsToAlignWith,remux:m,onData:function(e){e.type="combined"===e.type?"video":e.type
d(t,e)},onTrackInfo:function(e){if(n){m&&(e.isMuxed=!0)
n(t,e)}},onAudioTimingInfo:function(e){if(g&&void 0!==e.start){g(e.start)
g=null}v&&void 0!==e.end&&v(e.end)},onVideoTimingInfo:function(e){if(y&&void 0!==e.start){y(e.start)
y=null}_&&void 0!==e.end&&_(e.end)},onVideoSegmentTimingInfo:function(e){a(e)},onAudioSegmentTimingInfo:function(e){s(e)},onId3:function(e,i){o(t,e,i)},onCaptions:function(e){u(t,[e])},isEndOfTimeline:l,onEndedTimeline:function(){c()},onTransmuxerLog:p,onDone:function(e){if(h){e.type="combined"===e.type?"video":e.type
h(null,t,e)}}})}})},xd=function(e){var t=e.segment,i=e.bytes,n=e.trackInfoFn,r=e.timingInfoFn,a=e.videoSegmentTimingInfoFn,s=e.audioSegmentTimingInfoFn,o=e.id3Fn,u=e.captionsFn,l=e.isEndOfTimeline,c=e.endedTimelineFn,d=e.dataFn,h=e.doneFn,p=e.onTransmuxerLog,f=new Uint8Array(i)
if(function(e){return nr(e,["moof"]).length>0}(f)){t.isFmp4=!0
var m=t.map.tracks,g={isFmp4:!0,hasVideo:!!m.video,hasAudio:!!m.audio}
m.audio&&m.audio.codec&&"enca"!==m.audio.codec&&(g.audioCodec=m.audio.codec)
m.video&&m.video.codec&&"encv"!==m.video.codec&&(g.videoCodec=m.video.codec)
m.video&&m.audio&&(g.isMuxed=!0)
n(t,g)
var v=function(e){d(t,{data:f,type:g.hasAudio&&!g.isMuxed?"audio":"video"})
e&&e.length&&u(t,e)
h(null,t,{})}
_d({action:"probeMp4StartTime",timescales:t.map.timescales,data:f,transmuxer:t.transmuxer,callback:function(e){var n=e.data,a=e.startTime
i=n.buffer
t.bytes=f=n
g.hasAudio&&!g.isMuxed&&r(t,"audio","start",a)
g.hasVideo&&r(t,"video","start",a)
m.video&&n.byteLength&&t.transmuxer?_d({action:"pushMp4Captions",endAction:"mp4Captions",transmuxer:t.transmuxer,data:f,timescales:t.map.timescales,trackIds:[m.video.id],callback:function(e){i=e.data.buffer
t.bytes=f=e.data
e.logs.forEach((function(e){p(ql.mergeOptions(e,{stream:"mp4CaptionParser"}))}))
v(e.captions)}}):v()}})}else if(t.transmuxer){void 0===t.container&&(t.container=kr(f))
if("ts"===t.container||"aac"===t.container)Pd({segment:t,bytes:i,trackInfoFn:n,timingInfoFn:r,videoSegmentTimingInfoFn:a,audioSegmentTimingInfoFn:s,id3Fn:o,captionsFn:u,isEndOfTimeline:l,endedTimelineFn:c,dataFn:d,doneFn:h,onTransmuxerLog:p})
else{n(t,{hasAudio:!1,hasVideo:!1})
h(null,t,{})}}else h(null,t,{})},Ad=function(e,t){var i,n=e.id,r=e.key,a=e.encryptedBytes,s=e.decryptionWorker
s.addEventListener("message",(function e(i){if(i.data.source===n){s.removeEventListener("message",e)
var r=i.data.decrypted
t(new Uint8Array(r.bytes,r.byteOffset,r.byteLength))}}))
i=r.bytes.slice?r.bytes.slice():new Uint32Array(Array.prototype.slice.call(r.bytes))
s.postMessage(Gc({source:n,encrypted:a,key:i,iv:r.iv}),[a.buffer,i.buffer])},Od=function(e){var t=e.activeXhrs,i=e.decryptionWorker,n=e.trackInfoFn,r=e.timingInfoFn,a=e.videoSegmentTimingInfoFn,s=e.audioSegmentTimingInfoFn,o=e.id3Fn,u=e.captionsFn,l=e.isEndOfTimeline,c=e.endedTimelineFn,d=e.dataFn,h=e.doneFn,p=e.onTransmuxerLog,f=0,m=!1
return function(e,g){if(!m){if(e){m=!0
kd(t)
return h(e,g)}if((f+=1)===t.length){var v=function(){if(g.encryptedBytes)return function(e){var t=e.decryptionWorker,i=e.segment,n=e.trackInfoFn,r=e.timingInfoFn,a=e.videoSegmentTimingInfoFn,s=e.audioSegmentTimingInfoFn,o=e.id3Fn,u=e.captionsFn,l=e.isEndOfTimeline,c=e.endedTimelineFn,d=e.dataFn,h=e.doneFn,p=e.onTransmuxerLog
Ad({id:i.requestId,key:i.key,encryptedBytes:i.encryptedBytes,decryptionWorker:t},(function(e){i.bytes=e
xd({segment:i,bytes:i.bytes,trackInfoFn:n,timingInfoFn:r,videoSegmentTimingInfoFn:a,audioSegmentTimingInfoFn:s,id3Fn:o,captionsFn:u,isEndOfTimeline:l,endedTimelineFn:c,dataFn:d,doneFn:h,onTransmuxerLog:p})}))}({decryptionWorker:i,segment:g,trackInfoFn:n,timingInfoFn:r,videoSegmentTimingInfoFn:a,audioSegmentTimingInfoFn:s,id3Fn:o,captionsFn:u,isEndOfTimeline:l,endedTimelineFn:c,dataFn:d,doneFn:h,onTransmuxerLog:p})
xd({segment:g,bytes:g.bytes,trackInfoFn:n,timingInfoFn:r,videoSegmentTimingInfoFn:a,audioSegmentTimingInfoFn:s,id3Fn:o,captionsFn:u,isEndOfTimeline:l,endedTimelineFn:c,dataFn:d,doneFn:h,onTransmuxerLog:p})}
g.endOfAllRequests=Date.now()
if(g.map&&g.map.encryptedBytes&&!g.map.bytes)return Ad({decryptionWorker:i,id:g.requestId+"-init",encryptedBytes:g.map.encryptedBytes,key:g.map.key},(function(e){g.map.bytes=e
wd(g,(function(e){if(e){kd(t)
return h(e,g)}v()}))}))
v()}}}},Ld=function(e){var t=e.segment,i=e.progressFn
e.trackInfoFn
e.timingInfoFn
e.videoSegmentTimingInfoFn
e.audioSegmentTimingInfoFn
e.id3Fn
e.captionsFn
e.isEndOfTimeline
e.endedTimelineFn
e.dataFn
return function(e){if(!e.target.aborted){t.stats=ql.mergeOptions(t.stats,function(e){var t=e.target,i={bandwidth:1/0,bytesReceived:0,roundTripTime:Date.now()-t.requestTime||0}
i.bytesReceived=e.loaded
i.bandwidth=Math.floor(i.bytesReceived/i.roundTripTime*8*1e3)
return i}(e))
!t.stats.firstBytesReceivedAt&&t.stats.bytesReceived&&(t.stats.firstBytesReceivedAt=Date.now())
return i(e,t)}}},Dd=function(e){var t=e.xhr,i=e.xhrOptions,n=e.decryptionWorker,r=e.segment,a=e.abortFn,s=e.progressFn,o=e.trackInfoFn,u=e.timingInfoFn,l=e.videoSegmentTimingInfoFn,c=e.audioSegmentTimingInfoFn,d=e.id3Fn,h=e.captionsFn,p=e.isEndOfTimeline,f=e.endedTimelineFn,m=e.dataFn,g=e.doneFn,v=e.onTransmuxerLog,y=[],_=Od({activeXhrs:y,decryptionWorker:n,trackInfoFn:o,timingInfoFn:u,videoSegmentTimingInfoFn:l,audioSegmentTimingInfoFn:c,id3Fn:d,captionsFn:h,isEndOfTimeline:p,endedTimelineFn:f,dataFn:m,doneFn:g,onTransmuxerLog:v})
if(r.key&&!r.key.bytes){var b=[r.key]
r.map&&!r.map.bytes&&r.map.key&&r.map.key.resolvedUri===r.key.resolvedUri&&b.push(r.map.key)
var T=t(ql.mergeOptions(i,{uri:r.key.resolvedUri,responseType:"arraybuffer"}),Cd(r,b,_))
y.push(T)}if(r.map&&!r.map.bytes){if(r.map.key&&(!r.key||r.key.resolvedUri!==r.map.key.resolvedUri)){var S=t(ql.mergeOptions(i,{uri:r.map.key.resolvedUri,responseType:"arraybuffer"}),Cd(r,[r.map.key],_))
y.push(S)}var k=ql.mergeOptions(i,{uri:r.map.resolvedUri,responseType:"arraybuffer",headers:Vc(r.map)}),E=function(e){var t=e.segment,i=e.finishProcessingFn
return function(e,n){var r=Ed(e,n)
if(r)return i(r,t)
var a=new Uint8Array(n.response)
if(t.map.key){t.map.encryptedBytes=a
return i(null,t)}t.map.bytes=a
wd(t,(function(e){if(e){e.xhr=n
e.status=n.status
return i(e,t)}i(null,t)}))}}({segment:r,finishProcessingFn:_}),C=t(k,E)
y.push(C)}var w=ql.mergeOptions(i,{uri:r.part&&r.part.resolvedUri||r.resolvedUri,responseType:"arraybuffer",headers:Vc(r)}),I=t(w,Id({segment:r,finishProcessingFn:_,responseType:w.responseType}))
I.addEventListener("progress",Ld({segment:r,progressFn:s,trackInfoFn:o,timingInfoFn:u,videoSegmentTimingInfoFn:l,audioSegmentTimingInfoFn:c,id3Fn:d,captionsFn:h,isEndOfTimeline:p,endedTimelineFn:f,dataFn:m}))
y.push(I)
var P={}
y.forEach((function(e){e.addEventListener("loadend",function(e){var t=e.loadendState,i=e.abortFn
return function(e){if(e.target.aborted&&i&&!t.calledAbortFn){i()
t.calledAbortFn=!0}}}({loadendState:P,abortFn:a}))}))
return function(){return kd(y)}},Rd=Xl("CodecUtils"),Md=function(e,t){var i=t.attributes||{}
return e&&e.mediaGroups&&e.mediaGroups.AUDIO&&i.AUDIO&&e.mediaGroups.AUDIO[i.AUDIO]},Nd=function(e){var t={}
e.forEach((function(e){var i=e.mediaType,n=e.type,r=e.details
t[i]=t[i]||[]
t[i].push(We(""+n+r))}))
Object.keys(t).forEach((function(e){if(t[e].length>1){Rd("multiple "+e+" codecs found as attributes: "+t[e].join(", ")+". Setting playlist codecs to null so that we wait for mux.js to probe segments for real codecs.")
t[e]=null}else t[e]=t[e][0]}))
return t},Ud=function(e){var t=0
e.audio&&t++
e.video&&t++
return t},Bd=function(e,t){var i=t.attributes||{},n=Nd(function(e){var t=e.attributes||{}
if(t.CODECS)return Ge(t.CODECS)}(t)||[])
if(Md(e,t)&&!n.audio&&!function(e,t){if(!Md(e,t))return!0
var i=t.attributes||{},n=e.mediaGroups.AUDIO[i.AUDIO]
for(var r in n)if(!n[r].uri&&!n[r].playlists)return!0
return!1}(e,t)){var r=Nd(function(e,t){if(!e.mediaGroups.AUDIO||!t)return null
var i=e.mediaGroups.AUDIO[t]
if(!i)return null
for(var n in i){var r=i[n]
if(r.default&&r.playlists)return Ge(r.playlists[0].attributes.CODECS)}return null}(e,i.AUDIO)||[])
r.audio&&(n.audio=r.audio)}return n},Fd=Xl("PlaylistSelector"),jd=function(e){if(e&&e.playlist){var t=e.playlist
return JSON.stringify({id:t.id,bandwidth:e.bandwidth,width:e.width,height:e.height,codecs:t.attributes&&t.attributes.CODECS||""})}},Vd=function(e,t){if(!e)return""
var i=x.getComputedStyle(e)
return i?i[t]:""},Hd=function(e,t){var i=e.slice()
e.sort((function(e,n){var r=t(e,n)
return 0===r?i.indexOf(e)-i.indexOf(n):r}))},qd=function(e,t){var i,n
e.attributes.BANDWIDTH&&(i=e.attributes.BANDWIDTH)
i=i||x.Number.MAX_VALUE
t.attributes.BANDWIDTH&&(n=t.attributes.BANDWIDTH)
return i-(n=n||x.Number.MAX_VALUE)},Wd=function(e,t,i,n,r,a){if(e){var s={bandwidth:t,width:i,height:n,limitRenditionByPlayerDimensions:r},o=e.playlists
if(Sc.isAudioOnly(e)){o=a.getAudioTrackPlaylists_()
s.audioOnly=!0}var u=o.map((function(e){var t=e.attributes&&e.attributes.RESOLUTION&&e.attributes.RESOLUTION.width,i=e.attributes&&e.attributes.RESOLUTION&&e.attributes.RESOLUTION.height
return{bandwidth:e.attributes&&e.attributes.BANDWIDTH||x.Number.MAX_VALUE,width:t,height:i,playlist:e}}))
Hd(u,(function(e,t){return e.bandwidth-t.bandwidth}))
var l=(u=u.filter((function(e){return!Sc.isIncompatible(e.playlist)}))).filter((function(e){return Sc.isEnabled(e.playlist)}))
l.length||(l=u.filter((function(e){return!Sc.isDisabled(e.playlist)})))
var c=l.filter((function(e){return e.bandwidth*ad.BANDWIDTH_VARIANCE<t})),d=c[c.length-1],h=c.filter((function(e){return e.bandwidth===d.bandwidth}))[0]
if(!1===r){var p=h||l[0]||u[0]
if(p&&p.playlist){var f="sortedPlaylistReps"
h&&(f="bandwidthBestRep")
l[0]&&(f="enabledPlaylistReps")
Fd("choosing "+jd(p)+" using "+f+" with options",s)
return p.playlist}Fd("could not choose a playlist with options",s)
return null}var m=c.filter((function(e){return e.width&&e.height}))
Hd(m,(function(e,t){return e.width-t.width}))
var g=m.filter((function(e){return e.width===i&&e.height===n}))
d=g[g.length-1]
var v,y,_,b,T=g.filter((function(e){return e.bandwidth===d.bandwidth}))[0]
if(!T){y=(v=m.filter((function(e){return e.width>i||e.height>n}))).filter((function(e){return e.width===v[0].width&&e.height===v[0].height}))
d=y[y.length-1]
_=y.filter((function(e){return e.bandwidth===d.bandwidth}))[0]}if(a.experimentalLeastPixelDiffSelector){var S=m.map((function(e){e.pixelDiff=Math.abs(e.width-i)+Math.abs(e.height-n)
return e}))
Hd(S,(function(e,t){return e.pixelDiff===t.pixelDiff?t.bandwidth-e.bandwidth:e.pixelDiff-t.pixelDiff}))
b=S[0]}var k=b||_||T||h||l[0]||u[0]
if(k&&k.playlist){var E="sortedPlaylistReps"
b?E="leastPixelDiffRep":_?E="resolutionPlusOneRep":T?E="resolutionBestRep":h?E="bandwidthBestRep":l[0]&&(E="enabledPlaylistReps")
Fd("choosing "+jd(k)+" using "+E+" with options",s)
return k.playlist}Fd("could not choose a playlist with options",s)
return null}},Gd=function(){var e=this.useDevicePixelRatio&&x.devicePixelRatio||1
return Wd(this.playlists.master,this.systemBandwidth,parseInt(Vd(this.tech_.el(),"width"),10)*e,parseInt(Vd(this.tech_.el(),"height"),10)*e,this.limitRenditionByPlayerDimensions,this.masterPlaylistController_)},zd=function(e){var t=e.inbandTextTracks,i=e.metadataArray,n=e.timestampOffset,r=e.videoDuration
if(i){var a=x.WebKitDataCue||x.VTTCue,s=t.metadataTrack_
if(s){i.forEach((function(e){var t=e.cueTime+n
!("number"!=typeof t||x.isNaN(t)||t<0)&&t<1/0&&e.frames.forEach((function(e){var i=new a(t,t,e.value||e.url||e.data||"")
i.frame=e
i.value=e
!function(e){Object.defineProperties(e.frame,{id:{get:function(){ql.log.warn("cue.frame.id is deprecated. Use cue.value.key instead.")
return e.value.key}},value:{get:function(){ql.log.warn("cue.frame.value is deprecated. Use cue.value.data instead.")
return e.value.data}},privateData:{get:function(){ql.log.warn("cue.frame.privateData is deprecated. Use cue.value.data instead.")
return e.value.data}}})}(i)
s.addCue(i)}))}))
if(s.cues&&s.cues.length){for(var o=s.cues,u=[],l=0;l<o.length;l++)o[l]&&u.push(o[l])
var c=u.reduce((function(e,t){var i=e[t.startTime]||[]
i.push(t)
e[t.startTime]=i
return e}),{}),d=Object.keys(c).sort((function(e,t){return Number(e)-Number(t)}))
d.forEach((function(e,t){var i=c[e],n=Number(d[t+1])||r
i.forEach((function(e){e.endTime=n}))}))}}}},Kd=function(e,t,i){var n,r
if(i&&i.cues){n=i.cues.length
for(;n--;)(r=i.cues[n]).startTime>=e&&r.endTime<=t&&i.removeCue(r)}},Xd=function(e){return"number"==typeof e&&isFinite(e)},Yd=1/60,Qd=function(e){var t=e.startOfSegment,i=e.duration,n=e.segment,r=e.part,a=e.playlist,s=a.mediaSequence,o=a.id,u=a.segments,l=void 0===u?[]:u,c=e.mediaIndex,d=e.partIndex,h=e.timeline,p=l.length-1,f="mediaIndex/partIndex increment"
e.getMediaInfoForTime?f="getMediaInfoForTime ("+e.getMediaInfoForTime+")":e.isSyncRequest&&(f="getSyncSegmentCandidate (isSyncRequest)")
e.independent&&(f+=" with independent "+e.independent)
var m="number"==typeof d,g=e.segment.uri?"segment":"pre-segment",v=m?uc({preloadSegment:n})-1:0
return g+" ["+(s+c)+"/"+(s+p)+"]"+(m?" part ["+d+"/"+v+"]":"")+" segment start/end ["+n.start+" => "+n.end+"]"+(m?" part start/end ["+r.start+" => "+r.end+"]":"")+" startOfSegment ["+t+"] duration ["+i+"] timeline ["+h+"] selected by ["+f+"] playlist ["+o+"]"},$d=function(e){return e+"TimingInfo"},Jd=function(e){var t=e.timelineChangeController,i=e.currentTimeline,n=e.segmentTimeline,r=e.loaderType,a=e.audioDisabled
if(i===n)return!1
if("audio"===r){var s=t.lastTimelineChange({type:"main"})
return!s||s.to!==n}if("main"===r&&a){var o=t.pendingTimelineChange({type:"audio"})
return!o||o.to!==n}return!1},Zd=function(e){var t=e.segmentDuration,i=e.maxDuration
return!!t&&Math.round(t)>i+Yl},eh=function(e,t){if("hls"!==t)return null
var i=function(e){var t=0;["video","audio"].forEach((function(i){var n=e[i+"TimingInfo"]
if(n){var r,a=n.start,s=n.end
"bigint"==typeof a||"bigint"==typeof s?r=x.BigInt(s)-x.BigInt(a):"number"==typeof a&&"number"==typeof s&&(r=s-a)
void 0!==r&&r>t&&(t=r)}}))
"bigint"==typeof t&&t<Number.MAX_SAFE_INTEGER&&(t=Number(t))
return t}({audioTimingInfo:e.audioTimingInfo,videoTimingInfo:e.videoTimingInfo})
if(!i)return null
var n=e.playlist.targetDuration,r=Zd({segmentDuration:i,maxDuration:2*n}),a=Zd({segmentDuration:i,maxDuration:n}),s="Segment with index "+e.mediaIndex+" from playlist "+e.playlist.id+" has a duration of "+i+" when the reported duration is "+e.duration+" and the target duration is "+n+". For HLS content, a duration in excess of the target duration may result in playback issues. See the HLS specification section on EXT-X-TARGETDURATION for more details: https://tools.ietf.org/html/draft-pantos-http-live-streaming-23#section-4.3.3.1"
return r||a?{severity:r?"warn":"info",message:s}:null},th=function(e){B(t,e)
function t(t,i){var n
n=e.call(this)||this
if(!t)throw new TypeError("Initialization settings are required")
if("function"!=typeof t.currentTime)throw new TypeError("No currentTime getter specified")
if(!t.mediaSource)throw new TypeError("No MediaSource specified")
n.bandwidth=t.bandwidth
n.throughput={rate:0,count:0}
n.roundTrip=NaN
n.resetStats_()
n.mediaIndex=null
n.partIndex=null
n.hasPlayed_=t.hasPlayed
n.currentTime_=t.currentTime
n.seekable_=t.seekable
n.seeking_=t.seeking
n.duration_=t.duration
n.mediaSource_=t.mediaSource
n.vhs_=t.vhs
n.loaderType_=t.loaderType
n.currentMediaInfo_=void 0
n.startingMediaInfo_=void 0
n.segmentMetadataTrack_=t.segmentMetadataTrack
n.goalBufferLength_=t.goalBufferLength
n.sourceType_=t.sourceType
n.sourceUpdater_=t.sourceUpdater
n.inbandTextTracks_=t.inbandTextTracks
n.state_="INIT"
n.timelineChangeController_=t.timelineChangeController
n.shouldSaveSegmentTimingInfo_=!0
n.parse708captions_=t.parse708captions
n.useDtsForTimestampOffset_=t.useDtsForTimestampOffset
n.captionServices_=t.captionServices
n.experimentalExactManifestTimings=t.experimentalExactManifestTimings
n.checkBufferTimeout_=null
n.error_=void 0
n.currentTimeline_=-1
n.pendingSegment_=null
n.xhrOptions_=null
n.pendingSegments_=[]
n.audioDisabled_=!1
n.isPendingTimestampOffset_=!1
n.gopBuffer_=[]
n.timeMapping_=0
n.safeAppend_=ql.browser.IE_VERSION>=11
n.appendInitSegment_={audio:!0,video:!0}
n.playlistOfLastInitSegment_={audio:null,video:null}
n.callQueue_=[]
n.loadQueue_=[]
n.metadataQueue_={id3:[],caption:[]}
n.waitingOnRemove_=!1
n.quotaExceededErrorRetryTimeout_=null
n.activeInitSegmentId_=null
n.initSegments_={}
n.cacheEncryptionKeys_=t.cacheEncryptionKeys
n.keyCache_={}
n.decrypter_=t.decrypter
n.syncController_=t.syncController
n.syncPoint_={segmentIndex:0,time:0}
n.transmuxer_=n.createTransmuxer_()
n.triggerSyncInfoUpdate_=function(){return n.trigger("syncinfoupdate")}
n.syncController_.on("syncinfoupdate",n.triggerSyncInfoUpdate_)
n.mediaSource_.addEventListener("sourceopen",(function(){n.isEndOfStream_()||(n.ended_=!1)}))
n.fetchAtBuffer_=!1
n.logger_=Xl("SegmentLoader["+n.loaderType_+"]")
Object.defineProperty(N(n),"state",{get:function(){return this.state_},set:function(e){if(e!==this.state_){this.logger_(this.state_+" -> "+e)
this.state_=e
this.trigger("statechange")}}})
n.sourceUpdater_.on("ready",(function(){n.hasEnoughInfoToAppend_()&&n.processCallQueue_()}))
"main"===n.loaderType_&&n.timelineChangeController_.on("pendingtimelinechange",(function(){n.hasEnoughInfoToAppend_()&&n.processCallQueue_()}))
"audio"===n.loaderType_&&n.timelineChangeController_.on("timelinechange",(function(){n.hasEnoughInfoToLoad_()&&n.processLoadQueue_()
n.hasEnoughInfoToAppend_()&&n.processCallQueue_()}))
return n}var i=t.prototype
i.createTransmuxer_=function(){return yd({remux:!1,alignGopsAtEnd:this.safeAppend_,keepOriginalTimestamps:!0,parse708captions:this.parse708captions_,captionServices:this.captionServices_})}
i.resetStats_=function(){this.mediaBytesTransferred=0
this.mediaRequests=0
this.mediaRequestsAborted=0
this.mediaRequestsTimedout=0
this.mediaRequestsErrored=0
this.mediaTransferDuration=0
this.mediaSecondsLoaded=0
this.mediaAppends=0}
i.dispose=function(){this.trigger("dispose")
this.state="DISPOSED"
this.pause()
this.abort_()
this.transmuxer_&&this.transmuxer_.terminate()
this.resetStats_()
this.checkBufferTimeout_&&x.clearTimeout(this.checkBufferTimeout_)
this.syncController_&&this.triggerSyncInfoUpdate_&&this.syncController_.off("syncinfoupdate",this.triggerSyncInfoUpdate_)
this.off()}
i.setAudio=function(e){this.audioDisabled_=!e
e?this.appendInitSegment_.audio=!0:this.sourceUpdater_.removeAudio(0,this.duration_())}
i.abort=function(){if("WAITING"===this.state){this.abort_()
this.state="READY"
this.paused()||this.monitorBuffer_()}else this.pendingSegment_&&(this.pendingSegment_=null)}
i.abort_=function(){this.pendingSegment_&&this.pendingSegment_.abortRequests&&this.pendingSegment_.abortRequests()
this.pendingSegment_=null
this.callQueue_=[]
this.loadQueue_=[]
this.metadataQueue_.id3=[]
this.metadataQueue_.caption=[]
this.timelineChangeController_.clearPendingTimelineChange(this.loaderType_)
this.waitingOnRemove_=!1
x.clearTimeout(this.quotaExceededErrorRetryTimeout_)
this.quotaExceededErrorRetryTimeout_=null}
i.checkForAbort_=function(e){if("APPENDING"===this.state&&!this.pendingSegment_){this.state="READY"
return!0}return!this.pendingSegment_||this.pendingSegment_.requestId!==e}
i.error=function(e){if(void 0!==e){this.logger_("error occurred:",e)
this.error_=e}this.pendingSegment_=null
return this.error_}
i.endOfStream=function(){this.ended_=!0
this.transmuxer_&&vd(this.transmuxer_)
this.gopBuffer_.length=0
this.pause()
this.trigger("ended")}
i.buffered_=function(){var e=this.getMediaInfo_()
if(!this.sourceUpdater_||!e)return ql.createTimeRanges()
if("main"===this.loaderType_){var t=e.hasAudio,i=e.hasVideo,n=e.isMuxed
if(i&&t&&!this.audioDisabled_&&!n)return this.sourceUpdater_.buffered()
if(i)return this.sourceUpdater_.videoBuffered()}return this.sourceUpdater_.audioBuffered()}
i.initSegmentForMap=function(e,t){void 0===t&&(t=!1)
if(!e)return null
var i=zc(e),n=this.initSegments_[i]
t&&!n&&e.bytes&&(this.initSegments_[i]=n={resolvedUri:e.resolvedUri,byterange:e.byterange,bytes:e.bytes,tracks:e.tracks,timescales:e.timescales})
return n||e}
i.segmentKey=function(e,t){void 0===t&&(t=!1)
if(!e)return null
var i=Kc(e),n=this.keyCache_[i]
this.cacheEncryptionKeys_&&t&&!n&&e.bytes&&(this.keyCache_[i]=n={resolvedUri:e.resolvedUri,bytes:e.bytes})
var r={resolvedUri:(n||e).resolvedUri}
n&&(r.bytes=n.bytes)
return r}
i.couldBeginLoading_=function(){return this.playlist_&&!this.paused()}
i.load=function(){this.monitorBuffer_()
if(this.playlist_){if("INIT"===this.state&&this.couldBeginLoading_())return this.init_()
!this.couldBeginLoading_()||"READY"!==this.state&&"INIT"!==this.state||(this.state="READY")}}
i.init_=function(){this.state="READY"
this.resetEverything()
return this.monitorBuffer_()}
i.playlist=function(e,t){void 0===t&&(t={})
if(e){var i=this.playlist_,n=this.pendingSegment_
this.playlist_=e
this.xhrOptions_=t
if("INIT"===this.state){e.syncInfo={mediaSequence:e.mediaSequence,time:0}
"main"===this.loaderType_&&this.syncController_.setDateTimeMappingForStart(e)}var r=null
i&&(i.id?r=i.id:i.uri&&(r=i.uri))
this.logger_("playlist update ["+r+" => "+(e.id||e.uri)+"]")
this.trigger("syncinfoupdate")
if("INIT"===this.state&&this.couldBeginLoading_())return this.init_()
if(i&&i.uri===e.uri){var a=e.mediaSequence-i.mediaSequence
this.logger_("live window shift ["+a+"]")
if(null!==this.mediaIndex){this.mediaIndex-=a
if(this.mediaIndex<0){this.mediaIndex=null
this.partIndex=null}else{var s=this.playlist_.segments[this.mediaIndex]
if(this.partIndex&&(!s.parts||!s.parts.length||!s.parts[this.partIndex])){var o=this.mediaIndex
this.logger_("currently processing part (index "+this.partIndex+") no longer exists.")
this.resetLoader()
this.mediaIndex=o}}}if(n){n.mediaIndex-=a
if(n.mediaIndex<0){n.mediaIndex=null
n.partIndex=null}else{n.mediaIndex>=0&&(n.segment=e.segments[n.mediaIndex])
n.partIndex>=0&&n.segment.parts&&(n.part=n.segment.parts[n.partIndex])}}this.syncController_.saveExpiredSegmentInfo(i,e)}else{null!==this.mediaIndex&&(e.endList?this.resyncLoader():this.resetLoader())
this.currentMediaInfo_=void 0
this.trigger("playlistupdate")}}}
i.pause=function(){if(this.checkBufferTimeout_){x.clearTimeout(this.checkBufferTimeout_)
this.checkBufferTimeout_=null}}
i.paused=function(){return null===this.checkBufferTimeout_}
i.resetEverything=function(e){this.ended_=!1
this.appendInitSegment_={audio:!0,video:!0}
this.resetLoader()
this.remove(0,1/0,e)
if(this.transmuxer_){this.transmuxer_.postMessage({action:"clearAllMp4Captions"})
this.transmuxer_.postMessage({action:"reset"})}}
i.resetLoader=function(){this.fetchAtBuffer_=!1
this.resyncLoader()}
i.resyncLoader=function(){this.transmuxer_&&vd(this.transmuxer_)
this.mediaIndex=null
this.partIndex=null
this.syncPoint_=null
this.isPendingTimestampOffset_=!1
this.callQueue_=[]
this.loadQueue_=[]
this.metadataQueue_.id3=[]
this.metadataQueue_.caption=[]
this.abort()
this.transmuxer_&&this.transmuxer_.postMessage({action:"clearParsedMp4Captions"})}
i.remove=function(e,t,i,n){void 0===i&&(i=function(){})
void 0===n&&(n=!1)
t===1/0&&(t=this.duration_())
if(t<=e)this.logger_("skipping remove because end ${end} is <= start ${start}")
else if(this.sourceUpdater_&&this.getMediaInfo_()){var r=1,a=function(){0===--r&&i()}
if(n||!this.audioDisabled_){r++
this.sourceUpdater_.removeAudio(e,t,a)}if(n||"main"===this.loaderType_){this.gopBuffer_=function(e,t,i,n){for(var r=Math.ceil((t-n)*wr),a=Math.ceil((i-n)*wr),s=e.slice(),o=e.length;o--&&!(e[o].pts<=a););if(-1===o)return s
for(var u=o+1;u--&&!(e[u].pts<=r););u=Math.max(u,0)
s.splice(u,o-u+1)
return s}(this.gopBuffer_,e,t,this.timeMapping_)
r++
this.sourceUpdater_.removeVideo(e,t,a)}for(var s in this.inbandTextTracks_)Kd(e,t,this.inbandTextTracks_[s])
Kd(e,t,this.segmentMetadataTrack_)
a()}else this.logger_("skipping remove because no source updater or starting media info")}
i.monitorBuffer_=function(){this.checkBufferTimeout_&&x.clearTimeout(this.checkBufferTimeout_)
this.checkBufferTimeout_=x.setTimeout(this.monitorBufferTick_.bind(this),1)}
i.monitorBufferTick_=function(){"READY"===this.state&&this.fillBuffer_()
this.checkBufferTimeout_&&x.clearTimeout(this.checkBufferTimeout_)
this.checkBufferTimeout_=x.setTimeout(this.monitorBufferTick_.bind(this),500)}
i.fillBuffer_=function(){if(!this.sourceUpdater_.updating()){var e=this.chooseNextRequest_()
if(e){if("number"==typeof e.timestampOffset){this.isPendingTimestampOffset_=!1
this.timelineChangeController_.pendingTimelineChange({type:this.loaderType_,from:this.currentTimeline_,to:e.timeline})}this.loadSegment_(e)}}}
i.isEndOfStream_=function(e,t,i){void 0===e&&(e=this.mediaIndex)
void 0===t&&(t=this.playlist_)
void 0===i&&(i=this.partIndex)
if(!t||!this.mediaSource_)return!1
var n="number"==typeof e&&t.segments[e],r=e+1===t.segments.length,a=!n||!n.parts||i+1===n.parts.length
return t.endList&&"open"===this.mediaSource_.readyState&&r&&a}
i.chooseNextRequest_=function(){var e=this.buffered_(),t=ic(e)||0,i=nc(e,this.currentTime_()),n=!this.hasPlayed_()&&i>=1,r=i>=this.goalBufferLength_(),a=this.playlist_.segments
if(!a.length||n||r)return null
this.syncPoint_=this.syncPoint_||this.syncController_.getSyncPoint(this.playlist_,this.duration_(),this.currentTimeline_,this.currentTime_())
var s={partIndex:null,mediaIndex:null,startOfSegment:null,playlist:this.playlist_,isSyncRequest:Boolean(!this.syncPoint_)}
if(s.isSyncRequest)s.mediaIndex=function(e,t,i){t=t||[]
for(var n=[],r=0,a=0;a<t.length;a++){var s=t[a]
if(e===s.timeline){n.push(a)
if((r+=s.duration)>i)return a}}return 0===n.length?0:n[n.length-1]}(this.currentTimeline_,a,t)
else if(null!==this.mediaIndex){var o=a[this.mediaIndex],u="number"==typeof this.partIndex?this.partIndex:-1
s.startOfSegment=o.end?o.end:t
if(o.parts&&o.parts[u+1]){s.mediaIndex=this.mediaIndex
s.partIndex=u+1}else s.mediaIndex=this.mediaIndex+1}else{var l=Sc.getMediaInfoForTime({experimentalExactManifestTimings:this.experimentalExactManifestTimings,playlist:this.playlist_,currentTime:this.fetchAtBuffer_?t:this.currentTime_(),startingPartIndex:this.syncPoint_.partIndex,startingSegmentIndex:this.syncPoint_.segmentIndex,startTime:this.syncPoint_.time}),c=l.segmentIndex,d=l.startTime,h=l.partIndex
s.getMediaInfoForTime=this.fetchAtBuffer_?"bufferedEnd "+t:"currentTime "+this.currentTime_()
s.mediaIndex=c
s.startOfSegment=d
s.partIndex=h}var p=a[s.mediaIndex],f=p&&"number"==typeof s.partIndex&&p.parts&&p.parts[s.partIndex]
if(!p||"number"==typeof s.partIndex&&!f)return null
if("number"!=typeof s.partIndex&&p.parts){s.partIndex=0
f=p.parts[0]}if(!i&&f&&!f.independent)if(0===s.partIndex){var m=a[s.mediaIndex-1],g=m.parts&&m.parts.length&&m.parts[m.parts.length-1]
if(g&&g.independent){s.mediaIndex-=1
s.partIndex=m.parts.length-1
s.independent="previous segment"}}else if(p.parts[s.partIndex-1].independent){s.partIndex-=1
s.independent="previous part"}var v=this.mediaSource_&&"ended"===this.mediaSource_.readyState
return s.mediaIndex>=a.length-1&&v&&!this.seeking_()?null:this.generateSegmentInfo_(s)}
i.generateSegmentInfo_=function(e){var t=e.independent,i=e.playlist,n=e.mediaIndex,r=e.startOfSegment,a=e.isSyncRequest,s=e.partIndex,o=e.forceTimestampOffset,u=e.getMediaInfoForTime,l=i.segments[n],c="number"==typeof s&&l.parts[s],d={requestId:"segment-loader-"+Math.random(),uri:c&&c.resolvedUri||l.resolvedUri,mediaIndex:n,partIndex:c?s:null,isSyncRequest:a,startOfSegment:r,playlist:i,bytes:null,encryptedBytes:null,timestampOffset:null,timeline:l.timeline,duration:c&&c.duration||l.duration,segment:l,part:c,byteLength:0,transmuxer:this.transmuxer_,getMediaInfoForTime:u,independent:t},h=void 0!==o?o:this.isPendingTimestampOffset_
d.timestampOffset=this.timestampOffsetForSegment_({segmentTimeline:l.timeline,currentTimeline:this.currentTimeline_,startOfSegment:r,buffered:this.buffered_(),overrideCheck:h})
var p=ic(this.sourceUpdater_.audioBuffered())
"number"==typeof p&&(d.audioAppendStart=p-this.sourceUpdater_.audioTimestampOffset())
this.sourceUpdater_.videoBuffered().length&&(d.gopsToAlignWith=function(e,t,i){if(null==t||!e.length)return[]
var n,r=Math.ceil((t-i+3)*wr)
for(n=0;n<e.length&&!(e[n].pts>r);n++);return e.slice(n)}(this.gopBuffer_,this.currentTime_()-this.sourceUpdater_.videoTimestampOffset(),this.timeMapping_))
return d}
i.timestampOffsetForSegment_=function(e){return i=(t=e).segmentTimeline,n=t.currentTimeline,r=t.startOfSegment,a=t.buffered,t.overrideCheck||i!==n?i<n?r:a.length?a.end(a.length-1):r:null
var t,i,n,r,a}
i.earlyAbortWhenNeeded_=function(e){if(!this.vhs_.tech_.paused()&&this.xhrOptions_.timeout&&this.playlist_.attributes.BANDWIDTH&&!(Date.now()-(e.firstBytesReceivedAt||Date.now())<1e3)){var t=this.currentTime_(),i=e.bandwidth,n=this.pendingSegment_.duration,r=Sc.estimateSegmentRequestTime(n,i,this.playlist_,e.bytesReceived),a=function(e,t,i){void 0===i&&(i=1)
return((e.length?e.end(e.length-1):0)-t)/i}(this.buffered_(),t,this.vhs_.tech_.playbackRate())-1
if(!(r<=a)){var s=function(e){var t=e.master,i=e.currentTime,n=e.bandwidth,r=e.duration,a=e.segmentDuration,s=e.timeUntilRebuffer,o=e.currentTimeline,u=e.syncController,l=t.playlists.filter((function(e){return!Sc.isIncompatible(e)})),c=l.filter(Sc.isEnabled)
c.length||(c=l.filter((function(e){return!Sc.isDisabled(e)})))
var d=c.filter(Sc.hasAttribute.bind(null,"BANDWIDTH")).map((function(e){var t=u.getSyncPoint(e,r,o,i)?1:2
return{playlist:e,rebufferingImpact:Sc.estimateSegmentRequestTime(a,n,e)*t-s}})),h=d.filter((function(e){return e.rebufferingImpact<=0}))
Hd(h,(function(e,t){return qd(t.playlist,e.playlist)}))
if(h.length)return h[0]
Hd(d,(function(e,t){return e.rebufferingImpact-t.rebufferingImpact}))
return d[0]||null}({master:this.vhs_.playlists.master,currentTime:t,bandwidth:i,duration:this.duration_(),segmentDuration:n,timeUntilRebuffer:a,currentTimeline:this.currentTimeline_,syncController:this.syncController_})
if(s){var o=r-a-s.rebufferingImpact,u=.5
a<=Yl&&(u=1)
if(s.playlist&&s.playlist.uri!==this.playlist_.uri&&!(o<u)){this.bandwidth=s.playlist.attributes.BANDWIDTH*ad.BANDWIDTH_VARIANCE+1
this.trigger("earlyabort")}}}}}
i.handleAbort_=function(e){this.logger_("Aborting "+Qd(e))
this.mediaRequestsAborted+=1}
i.handleProgress_=function(e,t){this.earlyAbortWhenNeeded_(t.stats)
this.checkForAbort_(t.requestId)||this.trigger("progress")}
i.handleTrackInfo_=function(e,t){this.earlyAbortWhenNeeded_(e.stats)
if(!this.checkForAbort_(e.requestId)&&!this.checkForIllegalMediaSwitch(t)){t=t||{}
if(!function(e,t){if(!e&&!t||!e&&t||e&&!t)return!1
if(e===t)return!0
var i=Object.keys(e).sort(),n=Object.keys(t).sort()
if(i.length!==n.length)return!1
for(var r=0;r<i.length;r++){var a=i[r]
if(a!==n[r])return!1
if(e[a]!==t[a])return!1}return!0}(this.currentMediaInfo_,t)){this.appendInitSegment_={audio:!0,video:!0}
this.startingMediaInfo_=t
this.currentMediaInfo_=t
this.logger_("trackinfo update",t)
this.trigger("trackinfo")}if(!this.checkForAbort_(e.requestId)){this.pendingSegment_.trackInfo=t
this.hasEnoughInfoToAppend_()&&this.processCallQueue_()}}}
i.handleTimingInfo_=function(e,t,i,n){this.earlyAbortWhenNeeded_(e.stats)
if(!this.checkForAbort_(e.requestId)){var r=this.pendingSegment_,a=$d(t)
r[a]=r[a]||{}
r[a][i]=n
this.logger_("timinginfo: "+t+" - "+i+" - "+n)
this.hasEnoughInfoToAppend_()&&this.processCallQueue_()}}
i.handleCaptions_=function(e,t){var i=this
this.earlyAbortWhenNeeded_(e.stats)
if(!this.checkForAbort_(e.requestId))if(0!==t.length){if(this.pendingSegment_.hasAppendedData_){var n=null===this.sourceUpdater_.videoTimestampOffset()?this.sourceUpdater_.audioTimestampOffset():this.sourceUpdater_.videoTimestampOffset(),r={}
t.forEach((function(e){r[e.stream]=r[e.stream]||{startTime:1/0,captions:[],endTime:0}
var t=r[e.stream]
t.startTime=Math.min(t.startTime,e.startTime+n)
t.endTime=Math.max(t.endTime,e.endTime+n)
t.captions.push(e)}))
Object.keys(r).forEach((function(e){var t=r[e],a=t.startTime,s=t.endTime,o=t.captions,u=i.inbandTextTracks_
i.logger_("adding cues from "+a+" -> "+s+" for "+e)
!function(e,t,i){if(!e[i]){t.trigger({type:"usage",name:"vhs-608"})
t.trigger({type:"usage",name:"hls-608"})
var n=i;/^cc708_/.test(i)&&(n="SERVICE"+i.split("_")[1])
var r=t.textTracks().getTrackById(n)
if(r)e[i]=r
else{var a=i,s=i,o=!1,u=(t.options_.vhs&&t.options_.vhs.captionServices||{})[n]
if(u){a=u.label
s=u.language
o=u.default}e[i]=t.addRemoteTextTrack({kind:"captions",id:n,default:o,label:a,language:s},!1).track}}}(u,i.vhs_.tech_,e)
Kd(a,s,u[e])
!function(e){var t=e.inbandTextTracks,i=e.captionArray,n=e.timestampOffset
if(i){var r=x.WebKitDataCue||x.VTTCue
i.forEach((function(e){var i=e.stream
t[i].addCue(new r(e.startTime+n,e.endTime+n,e.text))}))}}({captionArray:o,inbandTextTracks:u,timestampOffset:n})}))
this.transmuxer_&&this.transmuxer_.postMessage({action:"clearParsedMp4Captions"})}else this.metadataQueue_.caption.push(this.handleCaptions_.bind(this,e,t))}else this.logger_("SegmentLoader received no captions from a caption event")}
i.handleId3_=function(e,t,i){this.earlyAbortWhenNeeded_(e.stats)
if(!this.checkForAbort_(e.requestId)){if(this.pendingSegment_.hasAppendedData_){var n=null===this.sourceUpdater_.videoTimestampOffset()?this.sourceUpdater_.audioTimestampOffset():this.sourceUpdater_.videoTimestampOffset()
!function(e,t,i){if(!e.metadataTrack_){e.metadataTrack_=i.addRemoteTextTrack({kind:"metadata",label:"Timed Metadata"},!1).track
e.metadataTrack_.inBandMetadataTrackDispatchType=t}}(this.inbandTextTracks_,i,this.vhs_.tech_)
zd({inbandTextTracks:this.inbandTextTracks_,metadataArray:t,timestampOffset:n,videoDuration:this.duration_()})}else this.metadataQueue_.id3.push(this.handleId3_.bind(this,e,t,i))}}
i.processMetadataQueue_=function(){this.metadataQueue_.id3.forEach((function(e){return e()}))
this.metadataQueue_.caption.forEach((function(e){return e()}))
this.metadataQueue_.id3=[]
this.metadataQueue_.caption=[]}
i.processCallQueue_=function(){var e=this.callQueue_
this.callQueue_=[]
e.forEach((function(e){return e()}))}
i.processLoadQueue_=function(){var e=this.loadQueue_
this.loadQueue_=[]
e.forEach((function(e){return e()}))}
i.hasEnoughInfoToLoad_=function(){if("audio"!==this.loaderType_)return!0
var e=this.pendingSegment_
return!!e&&(!this.getCurrentMediaInfo_()||!Jd({timelineChangeController:this.timelineChangeController_,currentTimeline:this.currentTimeline_,segmentTimeline:e.timeline,loaderType:this.loaderType_,audioDisabled:this.audioDisabled_}))}
i.getCurrentMediaInfo_=function(e){void 0===e&&(e=this.pendingSegment_)
return e&&e.trackInfo||this.currentMediaInfo_}
i.getMediaInfo_=function(e){void 0===e&&(e=this.pendingSegment_)
return this.getCurrentMediaInfo_(e)||this.startingMediaInfo_}
i.hasEnoughInfoToAppend_=function(){if(!this.sourceUpdater_.ready())return!1
if(this.waitingOnRemove_||this.quotaExceededErrorRetryTimeout_)return!1
var e=this.pendingSegment_,t=this.getCurrentMediaInfo_()
if(!e||!t)return!1
var i=t.hasAudio,n=t.hasVideo,r=t.isMuxed
return!(n&&!e.videoTimingInfo)&&(!(i&&!this.audioDisabled_&&!r&&!e.audioTimingInfo)&&!Jd({timelineChangeController:this.timelineChangeController_,currentTimeline:this.currentTimeline_,segmentTimeline:e.timeline,loaderType:this.loaderType_,audioDisabled:this.audioDisabled_}))}
i.handleData_=function(e,t){this.earlyAbortWhenNeeded_(e.stats)
if(!this.checkForAbort_(e.requestId))if(!this.callQueue_.length&&this.hasEnoughInfoToAppend_()){var i=this.pendingSegment_
this.setTimeMapping_(i.timeline)
this.updateMediaSecondsLoaded_(i.part||i.segment)
if("closed"!==this.mediaSource_.readyState){if(e.map){e.map=this.initSegmentForMap(e.map,!0)
i.segment.map=e.map}e.key&&this.segmentKey(e.key,!0)
i.isFmp4=e.isFmp4
i.timingInfo=i.timingInfo||{}
if(i.isFmp4){this.trigger("fmp4")
i.timingInfo.start=i[$d(t.type)].start}else{var n,r=this.getCurrentMediaInfo_(),a="main"===this.loaderType_&&r&&r.hasVideo
a&&(n=i.videoTimingInfo.start)
i.timingInfo.start=this.trueSegmentStart_({currentStart:i.timingInfo.start,playlist:i.playlist,mediaIndex:i.mediaIndex,currentVideoTimestampOffset:this.sourceUpdater_.videoTimestampOffset(),useVideoTimingInfo:a,firstVideoFrameTimeForData:n,videoTimingInfo:i.videoTimingInfo,audioTimingInfo:i.audioTimingInfo})}this.updateAppendInitSegmentStatus(i,t.type)
this.updateSourceBufferTimestampOffset_(i)
if(i.isSyncRequest){this.updateTimingInfoEnd_(i)
this.syncController_.saveSegmentTimingInfo({segmentInfo:i,shouldSaveTimelineMapping:"main"===this.loaderType_})
var s=this.chooseNextRequest_()
if(s.mediaIndex!==i.mediaIndex||s.partIndex!==i.partIndex){this.logger_("sync segment was incorrect, not appending")
return}this.logger_("sync segment was correct, appending")}i.hasAppendedData_=!0
this.processMetadataQueue_()
this.appendData_(i,t)}}else this.callQueue_.push(this.handleData_.bind(this,e,t))}
i.updateAppendInitSegmentStatus=function(e,t){"main"!==this.loaderType_||"number"!=typeof e.timestampOffset||e.changedTimestampOffset||(this.appendInitSegment_={audio:!0,video:!0})
this.playlistOfLastInitSegment_[t]!==e.playlist&&(this.appendInitSegment_[t]=!0)}
i.getInitSegmentAndUpdateState_=function(e){var t=e.type,i=e.initSegment,n=e.map,r=e.playlist
if(n){var a=zc(n)
if(this.activeInitSegmentId_===a)return null
i=this.initSegmentForMap(n,!0).bytes
this.activeInitSegmentId_=a}if(i&&this.appendInitSegment_[t]){this.playlistOfLastInitSegment_[t]=r
this.appendInitSegment_[t]=!1
this.activeInitSegmentId_=null
return i}return null}
i.handleQuotaExceededError_=function(e,t){var i=this,n=e.segmentInfo,r=e.type,a=e.bytes,s=this.sourceUpdater_.audioBuffered(),o=this.sourceUpdater_.videoBuffered()
s.length>1&&this.logger_("On QUOTA_EXCEEDED_ERR, found gaps in the audio buffer: "+tc(s).join(", "))
o.length>1&&this.logger_("On QUOTA_EXCEEDED_ERR, found gaps in the video buffer: "+tc(o).join(", "))
var u=s.length?s.start(0):0,l=s.length?s.end(s.length-1):0,c=o.length?o.start(0):0,d=o.length?o.end(o.length-1):0
if(l-u<=1&&d-c<=1){this.logger_("On QUOTA_EXCEEDED_ERR, single segment too large to append to buffer, triggering an error. Appended byte length: "+a.byteLength+", audio buffer: "+tc(s).join(", ")+", video buffer: "+tc(o).join(", ")+", ")
this.error({message:"Quota exceeded error with append of a single segment of content",excludeUntil:1/0})
this.trigger("error")}else{this.waitingOnRemove_=!0
this.callQueue_.push(this.appendToSourceBuffer_.bind(this,{segmentInfo:n,type:r,bytes:a}))
var h=this.currentTime_()-1
this.logger_("On QUOTA_EXCEEDED_ERR, removing audio/video from 0 to "+h)
this.remove(0,h,(function(){i.logger_("On QUOTA_EXCEEDED_ERR, retrying append in 1s")
i.waitingOnRemove_=!1
i.quotaExceededErrorRetryTimeout_=x.setTimeout((function(){i.logger_("On QUOTA_EXCEEDED_ERR, re-processing call queue")
i.quotaExceededErrorRetryTimeout_=null
i.processCallQueue_()}),1e3)}),!0)}}
i.handleAppendError_=function(e,t){var i=e.segmentInfo,n=e.type,r=e.bytes
if(t)if(22!==t.code){this.logger_("Received non QUOTA_EXCEEDED_ERR on append",t)
this.error(n+" append of "+r.length+"b failed for segment #"+i.mediaIndex+" in playlist "+i.playlist.id)
this.trigger("appenderror")}else this.handleQuotaExceededError_({segmentInfo:i,type:n,bytes:r})}
i.appendToSourceBuffer_=function(e){var t=e.segmentInfo,i=e.type,n=e.initSegment,r=e.data,a=e.bytes
if(!a){var s=[r],o=r.byteLength
if(n){s.unshift(n)
o+=n.byteLength}a=function(e){var t,i=0
if(e.bytes){t=new Uint8Array(e.bytes)
e.segments.forEach((function(e){t.set(e,i)
i+=e.byteLength}))}return t}({bytes:o,segments:s})}this.sourceUpdater_.appendBuffer({segmentInfo:t,type:i,bytes:a},this.handleAppendError_.bind(this,{segmentInfo:t,type:i,bytes:a}))}
i.handleSegmentTimingInfo_=function(e,t,i){if(this.pendingSegment_&&t===this.pendingSegment_.requestId){var n=this.pendingSegment_.segment,r=e+"TimingInfo"
n[r]||(n[r]={})
n[r].transmuxerPrependedSeconds=i.prependedContentDuration||0
n[r].transmuxedPresentationStart=i.start.presentation
n[r].transmuxedDecodeStart=i.start.decode
n[r].transmuxedPresentationEnd=i.end.presentation
n[r].transmuxedDecodeEnd=i.end.decode
n[r].baseMediaDecodeTime=i.baseMediaDecodeTime}}
i.appendData_=function(e,t){var i=t.type,n=t.data
if(n&&n.byteLength&&("audio"!==i||!this.audioDisabled_)){var r=this.getInitSegmentAndUpdateState_({type:i,initSegment:t.initSegment,playlist:e.playlist,map:e.isFmp4?e.segment.map:null})
this.appendToSourceBuffer_({segmentInfo:e,type:i,initSegment:r,data:n})}}
i.loadSegment_=function(e){var t=this
this.state="WAITING"
this.pendingSegment_=e
this.trimBackBuffer_(e)
"number"==typeof e.timestampOffset&&this.transmuxer_&&this.transmuxer_.postMessage({action:"clearAllMp4Captions"})
this.hasEnoughInfoToLoad_()?this.updateTransmuxerAndRequestSegment_(e):this.loadQueue_.push((function(){var i=R({},e,{forceTimestampOffset:!0})
R(e,t.generateSegmentInfo_(i))
t.isPendingTimestampOffset_=!1
t.updateTransmuxerAndRequestSegment_(e)}))}
i.updateTransmuxerAndRequestSegment_=function(e){var t=this
if(this.shouldUpdateTransmuxerTimestampOffset_(e.timestampOffset)){this.gopBuffer_.length=0
e.gopsToAlignWith=[]
this.timeMapping_=0
this.transmuxer_.postMessage({action:"reset"})
this.transmuxer_.postMessage({action:"setTimestampOffset",timestampOffset:e.timestampOffset})}var i=this.createSimplifiedSegmentObj_(e),n=this.isEndOfStream_(e.mediaIndex,e.playlist,e.partIndex),r=null!==this.mediaIndex,a=e.timeline!==this.currentTimeline_&&e.timeline>0,s=n||r&&a
this.logger_("Requesting "+Qd(e))
if(i.map&&!i.map.bytes){this.logger_("going to request init segment.")
this.appendInitSegment_={video:!0,audio:!0}}e.abortRequests=Dd({xhr:this.vhs_.xhr,xhrOptions:this.xhrOptions_,decryptionWorker:this.decrypter_,segment:i,abortFn:this.handleAbort_.bind(this,e),progressFn:this.handleProgress_.bind(this),trackInfoFn:this.handleTrackInfo_.bind(this),timingInfoFn:this.handleTimingInfo_.bind(this),videoSegmentTimingInfoFn:this.handleSegmentTimingInfo_.bind(this,"video",e.requestId),audioSegmentTimingInfoFn:this.handleSegmentTimingInfo_.bind(this,"audio",e.requestId),captionsFn:this.handleCaptions_.bind(this),isEndOfTimeline:s,endedTimelineFn:function(){t.logger_("received endedtimeline callback")},id3Fn:this.handleId3_.bind(this),dataFn:this.handleData_.bind(this),doneFn:this.segmentRequestFinished_.bind(this),onTransmuxerLog:function(i){var n=i.message,r=i.level,a=i.stream
t.logger_(Qd(e)+" logged from transmuxer stream "+a+" as a "+r+": "+n)}})}
i.trimBackBuffer_=function(e){var t=function(e,t,i){var n=t-ad.BACK_BUFFER_LENGTH
e.length&&(n=Math.max(n,e.start(0)))
var r=t-i
return Math.min(r,n)}(this.seekable_(),this.currentTime_(),this.playlist_.targetDuration||10)
t>0&&this.remove(0,t)}
i.createSimplifiedSegmentObj_=function(e){var t=e.segment,i=e.part,n={resolvedUri:i?i.resolvedUri:t.resolvedUri,byterange:i?i.byterange:t.byterange,requestId:e.requestId,transmuxer:e.transmuxer,audioAppendStart:e.audioAppendStart,gopsToAlignWith:e.gopsToAlignWith,part:e.part},r=e.playlist.segments[e.mediaIndex-1]
r&&r.timeline===t.timeline&&(r.videoTimingInfo?n.baseStartTime=r.videoTimingInfo.transmuxedDecodeEnd:r.audioTimingInfo&&(n.baseStartTime=r.audioTimingInfo.transmuxedDecodeEnd))
if(t.key){var a=t.key.iv||new Uint32Array([0,0,0,e.mediaIndex+e.playlist.mediaSequence])
n.key=this.segmentKey(t.key)
n.key.iv=a}t.map&&(n.map=this.initSegmentForMap(t.map))
return n}
i.saveTransferStats_=function(e){this.mediaRequests+=1
if(e){this.mediaBytesTransferred+=e.bytesReceived
this.mediaTransferDuration+=e.roundTripTime}}
i.saveBandwidthRelatedStats_=function(e,t){this.pendingSegment_.byteLength=t.bytesReceived
if(e<Yd)this.logger_("Ignoring segment's bandwidth because its duration of "+e+" is less than the min to record "+Yd)
else{this.bandwidth=t.bandwidth
this.roundTrip=t.roundTripTime}}
i.handleTimeout_=function(){this.mediaRequestsTimedout+=1
this.bandwidth=1
this.roundTrip=NaN
this.trigger("bandwidthupdate")}
i.segmentRequestFinished_=function(e,t,i){if(this.callQueue_.length)this.callQueue_.push(this.segmentRequestFinished_.bind(this,e,t,i))
else{this.saveTransferStats_(t.stats)
if(this.pendingSegment_&&t.requestId===this.pendingSegment_.requestId)if(e){this.pendingSegment_=null
this.state="READY"
if(e.code===Sd)return
this.pause()
if(e.code===Td){this.handleTimeout_()
return}this.mediaRequestsErrored+=1
this.error(e)
this.trigger("error")}else{var n=this.pendingSegment_
this.saveBandwidthRelatedStats_(n.duration,t.stats)
n.endOfAllRequests=t.endOfAllRequests
i.gopInfo&&(this.gopBuffer_=function(e,t,i){if(!t.length)return e
if(i)return t.slice()
for(var n=t[0].pts,r=0;r<e.length&&!(e[r].pts>=n);r++);return e.slice(0,r).concat(t)}(this.gopBuffer_,i.gopInfo,this.safeAppend_))
this.state="APPENDING"
this.trigger("appending")
this.waitForAppendsToComplete_(n)}}}
i.setTimeMapping_=function(e){var t=this.syncController_.mappingForTimeline(e)
null!==t&&(this.timeMapping_=t)}
i.updateMediaSecondsLoaded_=function(e){"number"==typeof e.start&&"number"==typeof e.end?this.mediaSecondsLoaded+=e.end-e.start:this.mediaSecondsLoaded+=e.duration}
i.shouldUpdateTransmuxerTimestampOffset_=function(e){return null!==e&&("main"===this.loaderType_&&e!==this.sourceUpdater_.videoTimestampOffset()||!this.audioDisabled_&&e!==this.sourceUpdater_.audioTimestampOffset())}
i.trueSegmentStart_=function(e){var t=e.currentStart,i=e.playlist,n=e.mediaIndex,r=e.firstVideoFrameTimeForData,a=e.currentVideoTimestampOffset,s=e.useVideoTimingInfo,o=e.videoTimingInfo,u=e.audioTimingInfo
if(void 0!==t)return t
if(!s)return u.start
var l=i.segments[n-1]
return 0!==n&&l&&void 0!==l.start&&l.end===r+a?o.start:r}
i.waitForAppendsToComplete_=function(e){var t=this.getCurrentMediaInfo_(e)
if(t){var i=t.hasAudio,n=t.hasVideo,r=t.isMuxed,a="main"===this.loaderType_&&n,s=!this.audioDisabled_&&i&&!r
e.waitingOnAppends=0
if(e.hasAppendedData_){a&&e.waitingOnAppends++
s&&e.waitingOnAppends++
a&&this.sourceUpdater_.videoQueueCallback(this.checkAppendsDone_.bind(this,e))
s&&this.sourceUpdater_.audioQueueCallback(this.checkAppendsDone_.bind(this,e))}else{e.timingInfo||"number"!=typeof e.timestampOffset||(this.isPendingTimestampOffset_=!0)
e.timingInfo={start:0}
e.waitingOnAppends++
if(!this.isPendingTimestampOffset_){this.updateSourceBufferTimestampOffset_(e)
this.processMetadataQueue_()}this.checkAppendsDone_(e)}}else{this.error({message:"No starting media returned, likely due to an unsupported media format.",blacklistDuration:1/0})
this.trigger("error")}}
i.checkAppendsDone_=function(e){if(!this.checkForAbort_(e.requestId)){e.waitingOnAppends--
0===e.waitingOnAppends&&this.handleAppendsDone_()}}
i.checkForIllegalMediaSwitch=function(e){var t=function(e,t,i){return"main"===e&&t&&i?i.hasAudio||i.hasVideo?t.hasVideo&&!i.hasVideo?"Only audio found in segment when we expected video. We can't switch to audio only from a stream that had video. To get rid of this message, please add codec information to the manifest.":!t.hasVideo&&i.hasVideo?"Video found in segment when we expected only audio. We can't switch to a stream with video from an audio only stream. To get rid of this message, please add codec information to the manifest.":null:"Neither audio nor video found in segment.":null}(this.loaderType_,this.getCurrentMediaInfo_(),e)
if(t){this.error({message:t,blacklistDuration:1/0})
this.trigger("error")
return!0}return!1}
i.updateSourceBufferTimestampOffset_=function(e){if(null!==e.timestampOffset&&"number"==typeof e.timingInfo.start&&!e.changedTimestampOffset&&"main"===this.loaderType_){var t=!1
e.timestampOffset-=this.getSegmentStartTimeForTimestampOffsetCalculation_({videoTimingInfo:e.segment.videoTimingInfo,audioTimingInfo:e.segment.audioTimingInfo,timingInfo:e.timingInfo})
e.changedTimestampOffset=!0
if(e.timestampOffset!==this.sourceUpdater_.videoTimestampOffset()){this.sourceUpdater_.videoTimestampOffset(e.timestampOffset)
t=!0}if(e.timestampOffset!==this.sourceUpdater_.audioTimestampOffset()){this.sourceUpdater_.audioTimestampOffset(e.timestampOffset)
t=!0}t&&this.trigger("timestampoffset")}}
i.getSegmentStartTimeForTimestampOffsetCalculation_=function(e){var t=e.videoTimingInfo,i=e.audioTimingInfo,n=e.timingInfo
return this.useDtsForTimestampOffset_?t&&"number"==typeof t.transmuxedDecodeStart?t.transmuxedDecodeStart:i&&"number"==typeof i.transmuxedDecodeStart?i.transmuxedDecodeStart:n.start:n.start}
i.updateTimingInfoEnd_=function(e){e.timingInfo=e.timingInfo||{}
var t=this.getMediaInfo_(),i="main"===this.loaderType_&&t&&t.hasVideo&&e.videoTimingInfo?e.videoTimingInfo:e.audioTimingInfo
i&&(e.timingInfo.end="number"==typeof i.end?i.end:i.start+e.duration)}
i.handleAppendsDone_=function(){this.pendingSegment_&&this.trigger("appendsdone")
if(this.pendingSegment_){var e=this.pendingSegment_
this.updateTimingInfoEnd_(e)
this.shouldSaveSegmentTimingInfo_&&this.syncController_.saveSegmentTimingInfo({segmentInfo:e,shouldSaveTimelineMapping:"main"===this.loaderType_})
var t=eh(e,this.sourceType_)
t&&("warn"===t.severity?ql.log.warn(t.message):this.logger_(t.message))
this.recordThroughput_(e)
this.pendingSegment_=null
this.state="READY"
if(e.isSyncRequest){this.trigger("syncinfoupdate")
if(!e.hasAppendedData_){this.logger_("Throwing away un-appended sync request "+Qd(e))
return}}this.logger_("Appended "+Qd(e))
this.addSegmentMetadataCue_(e)
this.fetchAtBuffer_=!0
if(this.currentTimeline_!==e.timeline){this.timelineChangeController_.lastTimelineChange({type:this.loaderType_,from:this.currentTimeline_,to:e.timeline})
"main"!==this.loaderType_||this.audioDisabled_||this.timelineChangeController_.lastTimelineChange({type:"audio",from:this.currentTimeline_,to:e.timeline})}this.currentTimeline_=e.timeline
this.trigger("syncinfoupdate")
var i=e.segment,n=e.part,r=i.end&&this.currentTime_()-i.end>3*e.playlist.targetDuration,a=n&&n.end&&this.currentTime_()-n.end>3*e.playlist.partTargetDuration
if(r||a){this.logger_("bad "+(r?"segment":"part")+" "+Qd(e))
this.resetEverything()}else{null!==this.mediaIndex&&this.trigger("bandwidthupdate")
this.trigger("progress")
this.mediaIndex=e.mediaIndex
this.partIndex=e.partIndex
this.isEndOfStream_(e.mediaIndex,e.playlist,e.partIndex)&&this.endOfStream()
this.trigger("appended")
e.hasAppendedData_&&this.mediaAppends++
this.paused()||this.monitorBuffer_()}}else{this.state="READY"
this.paused()||this.monitorBuffer_()}}
i.recordThroughput_=function(e){if(e.duration<Yd)this.logger_("Ignoring segment's throughput because its duration of "+e.duration+" is less than the min to record "+Yd)
else{var t=this.throughput.rate,i=Date.now()-e.endOfAllRequests+1,n=Math.floor(e.byteLength/i*8*1e3)
this.throughput.rate+=(n-t)/++this.throughput.count}}
i.addSegmentMetadataCue_=function(e){if(this.segmentMetadataTrack_){var t=e.segment,i=t.start,n=t.end
if(Xd(i)&&Xd(n)){Kd(i,n,this.segmentMetadataTrack_)
var r=x.WebKitDataCue||x.VTTCue,a={custom:t.custom,dateTimeObject:t.dateTimeObject,dateTimeString:t.dateTimeString,bandwidth:e.playlist.attributes.BANDWIDTH,resolution:e.playlist.attributes.RESOLUTION,codecs:e.playlist.attributes.CODECS,byteLength:e.byteLength,uri:e.uri,timeline:e.timeline,playlist:e.playlist.id,start:i,end:n},s=new r(i,n,JSON.stringify(a))
s.value=a
this.segmentMetadataTrack_.addCue(s)}}}
return t}(ql.EventTarget)
function ih(){}var nh,rh=function(e){return"string"!=typeof e?e:e.replace(/./,(function(e){return e.toUpperCase()}))},ah=["video","audio"],sh=function(e,t){var i=t[e+"Buffer"]
return i&&i.updating||t.queuePending[e]},oh=function e(t,i){if(0!==i.queue.length){var n=0,r=i.queue[n]
if("mediaSource"!==r.type){if("mediaSource"!==t&&i.ready()&&"closed"!==i.mediaSource.readyState&&!sh(t,i)){if(r.type!==t){n=function(e,t){for(var i=0;i<t.length;i++){var n=t[i]
if("mediaSource"===n.type)return null
if(n.type===e)return i}return null}(t,i.queue)
if(null===n)return
r=i.queue[n]}i.queue.splice(n,1)
i.queuePending[t]=r
r.action(t,i)
if(r.doneFn);else{i.queuePending[t]=null
e(t,i)}}}else if(!i.updating()&&"closed"!==i.mediaSource.readyState){i.queue.shift()
r.action(i)
r.doneFn&&r.doneFn()
e("audio",i)
e("video",i)}}},uh=function(e,t){var i=t[e+"Buffer"],n=rh(e)
if(i){i.removeEventListener("updateend",t["on"+n+"UpdateEnd_"])
i.removeEventListener("error",t["on"+n+"Error_"])
t.codecs[e]=null
t[e+"Buffer"]=null}},lh=function(e,t){return e&&t&&-1!==Array.prototype.indexOf.call(e.sourceBuffers,t)},ch=function(e,t,i){return function(n,r){var a=r[n+"Buffer"]
if(lh(r.mediaSource,a)){r.logger_("Appending segment "+t.mediaIndex+"'s "+e.length+" bytes to "+n+"Buffer")
try{a.appendBuffer(e)}catch(e){r.logger_("Error with code "+e.code+" "+(22===e.code?"(QUOTA_EXCEEDED_ERR) ":"")+"when appending segment "+t.mediaIndex+" to "+n+"Buffer")
r.queuePending[n]=null
i(e)}}}},dh=function(e,t){return function(i,n){var r=n[i+"Buffer"]
if(lh(n.mediaSource,r)){n.logger_("Removing "+e+" to "+t+" from "+i+"Buffer")
try{r.remove(e,t)}catch(r){n.logger_("Remove "+e+" to "+t+" from "+i+"Buffer failed")}}}},hh=function(e){return function(t,i){var n=i[t+"Buffer"]
if(lh(i.mediaSource,n)){i.logger_("Setting "+t+"timestampOffset to "+e)
n.timestampOffset=e}}},ph=function(e){return function(t,i){e()}},fh=function(e){return function(t){if("open"===t.mediaSource.readyState){t.logger_("Calling mediaSource endOfStream("+(e||"")+")")
try{t.mediaSource.endOfStream(e)}catch(e){ql.log.warn("Failed to call media source endOfStream",e)}}}},mh=function(e){return function(t){t.logger_("Setting mediaSource duration to "+e)
try{t.mediaSource.duration=e}catch(e){ql.log.warn("Failed to set media source duration",e)}}},gh=function(){return function(e,t){if("open"===t.mediaSource.readyState){var i=t[e+"Buffer"]
if(lh(t.mediaSource,i)){t.logger_("calling abort on "+e+"Buffer")
try{i.abort()}catch(t){ql.log.warn("Failed to abort on "+e+"Buffer",t)}}}}},vh=function(e,t){return function(i){var n=rh(e),r=Ke(t)
i.logger_("Adding "+e+"Buffer with codec "+t+" to mediaSource")
var a=i.mediaSource.addSourceBuffer(r)
a.addEventListener("updateend",i["on"+n+"UpdateEnd_"])
a.addEventListener("error",i["on"+n+"Error_"])
i.codecs[e]=t
i[e+"Buffer"]=a}},yh=function(e){return function(t){var i=t[e+"Buffer"]
uh(e,t)
if(lh(t.mediaSource,i)){t.logger_("Removing "+e+"Buffer with codec "+t.codecs[e]+" from mediaSource")
try{t.mediaSource.removeSourceBuffer(i)}catch(t){ql.log.warn("Failed to removeSourceBuffer "+e+"Buffer",t)}}}},_h=function(e){return function(t,i){var n=i[t+"Buffer"],r=Ke(e)
if(lh(i.mediaSource,n)&&i.codecs[t]!==e){i.logger_("changing "+t+"Buffer codec from "+i.codecs[t]+" to "+e)
n.changeType(r)
i.codecs[t]=e}}},bh=function(e){var t=e.type,i=e.sourceUpdater,n=e.action,r=e.doneFn,a=e.name
i.queue.push({type:t,action:n,doneFn:r,name:a})
oh(t,i)},Th=function(e,t){return function(i){if(t.queuePending[e]){var n=t.queuePending[e].doneFn
t.queuePending[e]=null
n&&n(t[e+"Error_"])}oh(e,t)}},Sh=function(e){B(t,e)
function t(t){var i;(i=e.call(this)||this).mediaSource=t
i.sourceopenListener_=function(){return oh("mediaSource",N(i))}
i.mediaSource.addEventListener("sourceopen",i.sourceopenListener_)
i.logger_=Xl("SourceUpdater")
i.audioTimestampOffset_=0
i.videoTimestampOffset_=0
i.queue=[]
i.queuePending={audio:null,video:null}
i.delayedAudioAppendQueue_=[]
i.videoAppendQueued_=!1
i.codecs={}
i.onVideoUpdateEnd_=Th("video",N(i))
i.onAudioUpdateEnd_=Th("audio",N(i))
i.onVideoError_=function(e){i.videoError_=e}
i.onAudioError_=function(e){i.audioError_=e}
i.createdSourceBuffers_=!1
i.initializedEme_=!1
i.triggeredReady_=!1
return i}var i=t.prototype
i.initializedEme=function(){this.initializedEme_=!0
this.triggerReady()}
i.hasCreatedSourceBuffers=function(){return this.createdSourceBuffers_}
i.hasInitializedAnyEme=function(){return this.initializedEme_}
i.ready=function(){return this.hasCreatedSourceBuffers()&&this.hasInitializedAnyEme()}
i.createSourceBuffers=function(e){if(!this.hasCreatedSourceBuffers()){this.addOrChangeSourceBuffers(e)
this.createdSourceBuffers_=!0
this.trigger("createdsourcebuffers")
this.triggerReady()}}
i.triggerReady=function(){if(this.ready()&&!this.triggeredReady_){this.triggeredReady_=!0
this.trigger("ready")}}
i.addSourceBuffer=function(e,t){bh({type:"mediaSource",sourceUpdater:this,action:vh(e,t),name:"addSourceBuffer"})}
i.abort=function(e){bh({type:e,sourceUpdater:this,action:gh(e),name:"abort"})}
i.removeSourceBuffer=function(e){this.canRemoveSourceBuffer()?bh({type:"mediaSource",sourceUpdater:this,action:yh(e),name:"removeSourceBuffer"}):ql.log.error("removeSourceBuffer is not supported!")}
i.canRemoveSourceBuffer=function(){return!ql.browser.IE_VERSION&&!ql.browser.IS_FIREFOX&&x.MediaSource&&x.MediaSource.prototype&&"function"==typeof x.MediaSource.prototype.removeSourceBuffer}
t.canChangeType=function(){return x.SourceBuffer&&x.SourceBuffer.prototype&&"function"==typeof x.SourceBuffer.prototype.changeType}
i.canChangeType=function(){return this.constructor.canChangeType()}
i.changeType=function(e,t){this.canChangeType()?bh({type:e,sourceUpdater:this,action:_h(t),name:"changeType"}):ql.log.error("changeType is not supported!")}
i.addOrChangeSourceBuffers=function(e){var t=this
if(!e||"object"!=typeof e||0===Object.keys(e).length)throw new Error("Cannot addOrChangeSourceBuffers to undefined codecs")
Object.keys(e).forEach((function(i){var n=e[i]
if(!t.hasCreatedSourceBuffers())return t.addSourceBuffer(i,n)
t.canChangeType()&&t.changeType(i,n)}))}
i.appendBuffer=function(e,t){var i=this,n=e.segmentInfo,r=e.type,a=e.bytes
this.processedAppend_=!0
if("audio"!==r||!this.videoBuffer||this.videoAppendQueued_){bh({type:r,sourceUpdater:this,action:ch(a,n||{mediaIndex:-1},t),doneFn:t,name:"appendBuffer"})
if("video"===r){this.videoAppendQueued_=!0
if(!this.delayedAudioAppendQueue_.length)return
var s=this.delayedAudioAppendQueue_.slice()
this.logger_("queuing delayed audio "+s.length+" appendBuffers")
this.delayedAudioAppendQueue_.length=0
s.forEach((function(e){i.appendBuffer.apply(i,e)}))}}else{this.delayedAudioAppendQueue_.push([e,t])
this.logger_("delayed audio append of "+a.length+" until video append")}}
i.audioBuffered=function(){return lh(this.mediaSource,this.audioBuffer)&&this.audioBuffer.buffered?this.audioBuffer.buffered:ql.createTimeRange()}
i.videoBuffered=function(){return lh(this.mediaSource,this.videoBuffer)&&this.videoBuffer.buffered?this.videoBuffer.buffered:ql.createTimeRange()}
i.buffered=function(){var e=lh(this.mediaSource,this.videoBuffer)?this.videoBuffer:null,t=lh(this.mediaSource,this.audioBuffer)?this.audioBuffer:null
return t&&!e?this.audioBuffered():e&&!t?this.videoBuffered():function(e,t){var i=null,n=null,r=0,a=[],s=[]
if(!(e&&e.length&&t&&t.length))return ql.createTimeRange()
for(var o=e.length;o--;){a.push({time:e.start(o),type:"start"})
a.push({time:e.end(o),type:"end"})}o=t.length
for(;o--;){a.push({time:t.start(o),type:"start"})
a.push({time:t.end(o),type:"end"})}a.sort((function(e,t){return e.time-t.time}))
for(o=0;o<a.length;o++){"start"===a[o].type?2==++r&&(i=a[o].time):"end"===a[o].type&&1==--r&&(n=a[o].time)
if(null!==i&&null!==n){s.push([i,n])
i=null
n=null}}return ql.createTimeRanges(s)}(this.audioBuffered(),this.videoBuffered())}
i.setDuration=function(e,t){void 0===t&&(t=ih)
bh({type:"mediaSource",sourceUpdater:this,action:mh(e),name:"duration",doneFn:t})}
i.endOfStream=function(e,t){void 0===e&&(e=null)
void 0===t&&(t=ih)
"string"!=typeof e&&(e=void 0)
bh({type:"mediaSource",sourceUpdater:this,action:fh(e),name:"endOfStream",doneFn:t})}
i.removeAudio=function(e,t,i){void 0===i&&(i=ih)
this.audioBuffered().length&&0!==this.audioBuffered().end(0)?bh({type:"audio",sourceUpdater:this,action:dh(e,t),doneFn:i,name:"remove"}):i()}
i.removeVideo=function(e,t,i){void 0===i&&(i=ih)
this.videoBuffered().length&&0!==this.videoBuffered().end(0)?bh({type:"video",sourceUpdater:this,action:dh(e,t),doneFn:i,name:"remove"}):i()}
i.updating=function(){return!(!sh("audio",this)&&!sh("video",this))}
i.audioTimestampOffset=function(e){if(void 0!==e&&this.audioBuffer&&this.audioTimestampOffset_!==e){bh({type:"audio",sourceUpdater:this,action:hh(e),name:"timestampOffset"})
this.audioTimestampOffset_=e}return this.audioTimestampOffset_}
i.videoTimestampOffset=function(e){if(void 0!==e&&this.videoBuffer&&this.videoTimestampOffset!==e){bh({type:"video",sourceUpdater:this,action:hh(e),name:"timestampOffset"})
this.videoTimestampOffset_=e}return this.videoTimestampOffset_}
i.audioQueueCallback=function(e){this.audioBuffer&&bh({type:"audio",sourceUpdater:this,action:ph(e),name:"callback"})}
i.videoQueueCallback=function(e){this.videoBuffer&&bh({type:"video",sourceUpdater:this,action:ph(e),name:"callback"})}
i.dispose=function(){var e=this
this.trigger("dispose")
ah.forEach((function(t){e.abort(t)
e.canRemoveSourceBuffer()?e.removeSourceBuffer(t):e[t+"QueueCallback"]((function(){return uh(t,e)}))}))
this.videoAppendQueued_=!1
this.delayedAudioAppendQueue_.length=0
this.sourceopenListener_&&this.mediaSource.removeEventListener("sourceopen",this.sourceopenListener_)
this.off()}
return t}(ql.EventTarget),kh=function(e){return decodeURIComponent(escape(String.fromCharCode.apply(null,e)))},Eh=new Uint8Array("\n\n".split("").map((function(e){return e.charCodeAt(0)}))),Ch=function(e){B(t,e)
function t(t,i){var n
void 0===i&&(i={});(n=e.call(this,t,i)||this).mediaSource_=null
n.subtitlesTrack_=null
n.loaderType_="subtitle"
n.featuresNativeTextTracks_=t.featuresNativeTextTracks
n.shouldSaveSegmentTimingInfo_=!1
return n}var i=t.prototype
i.createTransmuxer_=function(){return null}
i.buffered_=function(){if(!this.subtitlesTrack_||!this.subtitlesTrack_.cues||!this.subtitlesTrack_.cues.length)return ql.createTimeRanges()
var e=this.subtitlesTrack_.cues,t=e[0].startTime,i=e[e.length-1].startTime
return ql.createTimeRanges([[t,i]])}
i.initSegmentForMap=function(e,t){void 0===t&&(t=!1)
if(!e)return null
var i=zc(e),n=this.initSegments_[i]
if(t&&!n&&e.bytes){var r=Eh.byteLength+e.bytes.byteLength,a=new Uint8Array(r)
a.set(e.bytes)
a.set(Eh,e.bytes.byteLength)
this.initSegments_[i]=n={resolvedUri:e.resolvedUri,byterange:e.byterange,bytes:a}}return n||e}
i.couldBeginLoading_=function(){return this.playlist_&&this.subtitlesTrack_&&!this.paused()}
i.init_=function(){this.state="READY"
this.resetEverything()
return this.monitorBuffer_()}
i.track=function(e){if(void 0===e)return this.subtitlesTrack_
this.subtitlesTrack_=e
"INIT"===this.state&&this.couldBeginLoading_()&&this.init_()
return this.subtitlesTrack_}
i.remove=function(e,t){Kd(e,t,this.subtitlesTrack_)}
i.fillBuffer_=function(){var e=this,t=this.chooseNextRequest_()
if(t)if(null!==this.syncController_.timestampOffsetForTimeline(t.timeline))this.loadSegment_(t)
else{this.syncController_.one("timestampoffset",(function(){e.state="READY"
e.paused()||e.monitorBuffer_()}))
this.state="WAITING_ON_TIMELINE"}}
i.timestampOffsetForSegment_=function(){return null}
i.chooseNextRequest_=function(){return this.skipEmptySegments_(e.prototype.chooseNextRequest_.call(this))}
i.skipEmptySegments_=function(e){for(;e&&e.segment.empty;){if(e.mediaIndex+1>=e.playlist.segments.length){e=null
break}e=this.generateSegmentInfo_({playlist:e.playlist,mediaIndex:e.mediaIndex+1,startOfSegment:e.startOfSegment+e.duration,isSyncRequest:e.isSyncRequest})}return e}
i.stopForError=function(e){this.error(e)
this.state="READY"
this.pause()
this.trigger("error")}
i.segmentRequestFinished_=function(e,t,i){var n=this
if(this.subtitlesTrack_){this.saveTransferStats_(t.stats)
if(this.pendingSegment_)if(e){e.code===Td&&this.handleTimeout_()
e.code===Sd?this.mediaRequestsAborted+=1:this.mediaRequestsErrored+=1
this.stopForError(e)}else{var r=this.pendingSegment_
this.saveBandwidthRelatedStats_(r.duration,t.stats)
this.state="APPENDING"
this.trigger("appending")
var a=r.segment
a.map&&(a.map.bytes=t.map.bytes)
r.bytes=t.bytes
if("function"!=typeof x.WebVTT&&this.subtitlesTrack_&&this.subtitlesTrack_.tech_){var s,o=function(){n.subtitlesTrack_.tech_.off("vttjsloaded",s)
n.stopForError({message:"Error loading vtt.js"})}
s=function(){n.subtitlesTrack_.tech_.off("vttjserror",o)
n.segmentRequestFinished_(e,t,i)}
this.state="WAITING_ON_VTTJS"
this.subtitlesTrack_.tech_.one("vttjsloaded",s)
this.subtitlesTrack_.tech_.one("vttjserror",o)}else{a.requested=!0
try{this.parseVTTCues_(r)}catch(e){this.stopForError({message:e.message})
return}this.updateTimeMapping_(r,this.syncController_.timelines[r.timeline],this.playlist_)
r.cues.length?r.timingInfo={start:r.cues[0].startTime,end:r.cues[r.cues.length-1].endTime}:r.timingInfo={start:r.startOfSegment,end:r.startOfSegment+r.duration}
if(r.isSyncRequest){this.trigger("syncinfoupdate")
this.pendingSegment_=null
this.state="READY"}else{r.byteLength=r.bytes.byteLength
this.mediaSecondsLoaded+=a.duration
r.cues.forEach((function(e){n.subtitlesTrack_.addCue(n.featuresNativeTextTracks_?new x.VTTCue(e.startTime,e.endTime,e.text):e)}))
!function(e){var t=e.cues
if(t)for(var i=0;i<t.length;i++){for(var n=[],r=0,a=0;a<t.length;a++)t[i].startTime===t[a].startTime&&t[i].endTime===t[a].endTime&&t[i].text===t[a].text&&++r>1&&n.push(t[a])
n.length&&n.forEach((function(t){return e.removeCue(t)}))}}(this.subtitlesTrack_)
this.handleAppendsDone_()}}}else{this.state="READY"
this.mediaRequestsAborted+=1}}else this.state="READY"}
i.handleData_=function(){}
i.updateTimingInfoEnd_=function(){}
i.parseVTTCues_=function(e){var t,i=!1
if("function"==typeof x.TextDecoder)t=new x.TextDecoder("utf8")
else{t=x.WebVTT.StringDecoder()
i=!0}var n=new x.WebVTT.Parser(x,x.vttjs,t)
e.cues=[]
e.timestampmap={MPEGTS:0,LOCAL:0}
n.oncue=e.cues.push.bind(e.cues)
n.ontimestampmap=function(t){e.timestampmap=t}
n.onparsingerror=function(e){ql.log.warn("Error encountered when parsing cues: "+e.message)}
if(e.segment.map){var r=e.segment.map.bytes
i&&(r=kh(r))
n.parse(r)}var a=e.bytes
i&&(a=kh(a))
n.parse(a)
n.flush()}
i.updateTimeMapping_=function(e,t,i){var n=e.segment
if(t)if(e.cues.length){var r=e.timestampmap,a=r.MPEGTS/wr-r.LOCAL+t.mapping
e.cues.forEach((function(e){e.startTime+=a
e.endTime+=a}))
if(!i.syncInfo){var s=e.cues[0].startTime,o=e.cues[e.cues.length-1].startTime
i.syncInfo={mediaSequence:i.mediaSequence+e.mediaIndex,time:Math.min(s,o-n.duration)}}}else n.empty=!0}
return t}(th),wh=function(e,t){for(var i=e.cues,n=0;n<i.length;n++){var r=i[n]
if(t>=r.adStartTime&&t<=r.adEndTime)return r}return null},Ih=[{name:"VOD",run:function(e,t,i,n,r){if(i!==1/0){return{time:0,segmentIndex:0,partIndex:null}}return null}},{name:"ProgramDateTime",run:function(e,t,i,n,r){if(!Object.keys(e.timelineToDatetimeMappings).length)return null
var a=null,s=null,o=sc(t)
r=r||0
for(var u=0;u<o.length;u++){var l=o[t.endList||0===r?u:o.length-(u+1)],c=l.segment,d=e.timelineToDatetimeMappings[c.timeline]
if(d&&c.dateTimeObject){var h=c.dateTimeObject.getTime()/1e3+d
if(c.parts&&"number"==typeof l.partIndex)for(var p=0;p<l.partIndex;p++)h+=c.parts[p].duration
var f=Math.abs(r-h)
if(null!==s&&(0===f||s<f))break
s=f
a={time:h,segmentIndex:l.segmentIndex,partIndex:l.partIndex}}}return a}},{name:"Segment",run:function(e,t,i,n,r){var a=null,s=null
r=r||0
for(var o=sc(t),u=0;u<o.length;u++){var l=o[t.endList||0===r?u:o.length-(u+1)],c=l.segment,d=l.part&&l.part.start||c&&c.start
if(c.timeline===n&&void 0!==d){var h=Math.abs(r-d)
if(null!==s&&s<h)break
if(!a||null===s||s>=h){s=h
a={time:d,segmentIndex:l.segmentIndex,partIndex:l.partIndex}}}}return a}},{name:"Discontinuity",run:function(e,t,i,n,r){var a=null
r=r||0
if(t.discontinuityStarts&&t.discontinuityStarts.length)for(var s=null,o=0;o<t.discontinuityStarts.length;o++){var u=t.discontinuityStarts[o],l=t.discontinuitySequence+o+1,c=e.discontinuities[l]
if(c){var d=Math.abs(r-c.time)
if(null!==s&&s<d)break
if(!a||null===s||s>=d){s=d
a={time:c.time,segmentIndex:u,partIndex:null}}}}return a}},{name:"Playlist",run:function(e,t,i,n,r){if(t.syncInfo){return{time:t.syncInfo.time,segmentIndex:t.syncInfo.mediaSequence-t.mediaSequence,partIndex:null}}return null}}],Ph=function(e){B(t,e)
function t(t){var i;(i=e.call(this)||this).timelines=[]
i.discontinuities=[]
i.timelineToDatetimeMappings={}
i.logger_=Xl("SyncController")
return i}var i=t.prototype
i.getSyncPoint=function(e,t,i,n){var r=this.runStrategies_(e,t,i,n)
return r.length?this.selectSyncPoint_(r,{key:"time",value:n}):null}
i.getExpiredTime=function(e,t){if(!e||!e.segments)return null
var i=this.runStrategies_(e,t,e.discontinuitySequence,0)
if(!i.length)return null
var n=this.selectSyncPoint_(i,{key:"segmentIndex",value:0})
n.segmentIndex>0&&(n.time*=-1)
return Math.abs(n.time+hc({defaultDuration:e.targetDuration,durationList:e.segments,startIndex:n.segmentIndex,endIndex:0}))}
i.runStrategies_=function(e,t,i,n){for(var r=[],a=0;a<Ih.length;a++){var s=Ih[a],o=s.run(this,e,t,i,n)
if(o){o.strategy=s.name
r.push({strategy:s.name,syncPoint:o})}}return r}
i.selectSyncPoint_=function(e,t){for(var i=e[0].syncPoint,n=Math.abs(e[0].syncPoint[t.key]-t.value),r=e[0].strategy,a=1;a<e.length;a++){var s=Math.abs(e[a].syncPoint[t.key]-t.value)
if(s<n){n=s
i=e[a].syncPoint
r=e[a].strategy}}this.logger_("syncPoint for ["+t.key+": "+t.value+"] chosen with strategy ["+r+"]: [time:"+i.time+", segmentIndex:"+i.segmentIndex+("number"==typeof i.partIndex?",partIndex:"+i.partIndex:"")+"]")
return i}
i.saveExpiredSegmentInfo=function(e,t){var i=t.mediaSequence-e.mediaSequence
if(i>86400)ql.log.warn("Not saving expired segment info. Media sequence gap "+i+" is too large.")
else for(var n=i-1;n>=0;n--){var r=e.segments[n]
if(r&&void 0!==r.start){t.syncInfo={mediaSequence:e.mediaSequence+n,time:r.start}
this.logger_("playlist refresh sync: [time:"+t.syncInfo.time+", mediaSequence: "+t.syncInfo.mediaSequence+"]")
this.trigger("syncinfoupdate")
break}}}
i.setDateTimeMappingForStart=function(e){this.timelineToDatetimeMappings={}
if(e.segments&&e.segments.length&&e.segments[0].dateTimeObject){var t=e.segments[0],i=t.dateTimeObject.getTime()/1e3
this.timelineToDatetimeMappings[t.timeline]=-i}}
i.saveSegmentTimingInfo=function(e){var t=e.segmentInfo,i=e.shouldSaveTimelineMapping,n=this.calculateSegmentTimeMapping_(t,t.timingInfo,i),r=t.segment
if(n){this.saveDiscontinuitySyncInfo_(t)
t.playlist.syncInfo||(t.playlist.syncInfo={mediaSequence:t.playlist.mediaSequence+t.mediaIndex,time:r.start})}var a=r.dateTimeObject
r.discontinuity&&i&&a&&(this.timelineToDatetimeMappings[r.timeline]=-a.getTime()/1e3)}
i.timestampOffsetForTimeline=function(e){return void 0===this.timelines[e]?null:this.timelines[e].time}
i.mappingForTimeline=function(e){return void 0===this.timelines[e]?null:this.timelines[e].mapping}
i.calculateSegmentTimeMapping_=function(e,t,i){var n,r,a=e.segment,s=e.part,o=this.timelines[e.timeline]
if("number"==typeof e.timestampOffset){o={time:e.startOfSegment,mapping:e.startOfSegment-t.start}
if(i){this.timelines[e.timeline]=o
this.trigger("timestampoffset")
this.logger_("time mapping for timeline "+e.timeline+": [time: "+o.time+"] [mapping: "+o.mapping+"]")}n=e.startOfSegment
r=t.end+o.mapping}else{if(!o)return!1
n=t.start+o.mapping
r=t.end+o.mapping}if(s){s.start=n
s.end=r}(!a.start||n<a.start)&&(a.start=n)
a.end=r
return!0}
i.saveDiscontinuitySyncInfo_=function(e){var t=e.playlist,i=e.segment
if(i.discontinuity)this.discontinuities[i.timeline]={time:i.start,accuracy:0}
else if(t.discontinuityStarts&&t.discontinuityStarts.length)for(var n=0;n<t.discontinuityStarts.length;n++){var r=t.discontinuityStarts[n],a=t.discontinuitySequence+n+1,s=r-e.mediaIndex,o=Math.abs(s)
if(!this.discontinuities[a]||this.discontinuities[a].accuracy>o){var u=void 0
u=s<0?i.start-hc({defaultDuration:t.targetDuration,durationList:t.segments,startIndex:e.mediaIndex,endIndex:r}):i.end+hc({defaultDuration:t.targetDuration,durationList:t.segments,startIndex:e.mediaIndex+1,endIndex:r})
this.discontinuities[a]={time:u,accuracy:o}}}}
i.dispose=function(){this.trigger("dispose")
this.off()}
return t}(ql.EventTarget),xh=function(e){B(t,e)
function t(){var t;(t=e.call(this)||this).pendingTimelineChanges_={}
t.lastTimelineChanges_={}
return t}var i=t.prototype
i.clearPendingTimelineChange=function(e){this.pendingTimelineChanges_[e]=null
this.trigger("pendingtimelinechange")}
i.pendingTimelineChange=function(e){var t=e.type,i=e.from,n=e.to
if("number"==typeof i&&"number"==typeof n){this.pendingTimelineChanges_[t]={type:t,from:i,to:n}
this.trigger("pendingtimelinechange")}return this.pendingTimelineChanges_[t]}
i.lastTimelineChange=function(e){var t=e.type,i=e.from,n=e.to
if("number"==typeof i&&"number"==typeof n){this.lastTimelineChanges_[t]={type:t,from:i,to:n}
delete this.pendingTimelineChanges_[t]
this.trigger("timelinechange")}return this.lastTimelineChanges_[t]}
i.dispose=function(){this.trigger("dispose")
this.pendingTimelineChanges_={}
this.lastTimelineChanges_={}
this.off()}
return t}(ql.EventTarget),Ah=ud(ld((function(){function e(e,t,i){return e(i={path:t,exports:{},require:function(e,t){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==t&&i.path)}},i.exports),i.exports}var t=e((function(e){function t(e,t){for(var i=0;i<t.length;i++){var n=t[i]
n.enumerable=n.enumerable||!1
n.configurable=!0
"value"in n&&(n.writable=!0)
Object.defineProperty(e,n.key,n)}}e.exports=function(e,i,n){i&&t(e.prototype,i)
n&&t(e,n)
return e}
e.exports.default=e.exports,e.exports.__esModule=!0})),i=e((function(e){function t(i,n){e.exports=t=Object.setPrototypeOf||function(e,t){e.__proto__=t
return e}
e.exports.default=e.exports,e.exports.__esModule=!0
return t(i,n)}e.exports=t
e.exports.default=e.exports,e.exports.__esModule=!0})),n=e((function(e){e.exports=function(e,t){e.prototype=Object.create(t.prototype)
e.prototype.constructor=e
i(e,t)}
e.exports.default=e.exports,e.exports.__esModule=!0})),r=function(){function e(){this.listeners={}}var t=e.prototype
t.on=function(e,t){this.listeners[e]||(this.listeners[e]=[])
this.listeners[e].push(t)}
t.off=function(e,t){if(!this.listeners[e])return!1
var i=this.listeners[e].indexOf(t)
this.listeners[e]=this.listeners[e].slice(0)
this.listeners[e].splice(i,1)
return i>-1}
t.trigger=function(e){var t=this.listeners[e]
if(t)if(2===arguments.length)for(var i=t.length,n=0;n<i;++n)t[n].call(this,arguments[1])
else for(var r=Array.prototype.slice.call(arguments,1),a=t.length,s=0;s<a;++s)t[s].apply(this,r)}
t.dispose=function(){this.listeners={}}
t.pipe=function(e){this.on("data",(function(t){e.push(t)}))}
return e}()

;/*! @name aes-decrypter @version 3.1.2 @license Apache-2.0 */
var a=null,s=function(){function e(e){a||(a=function(){var e,t,i,n,r,a,s,o,u=[[[],[],[],[],[]],[[],[],[],[],[]]],l=u[0],c=u[1],d=l[4],h=c[4],p=[],f=[]
for(e=0;e<256;e++)f[(p[e]=e<<1^283*(e>>7))^e]=e
for(t=i=0;!d[t];t^=n||1,i=f[i]||1){a=(a=i^i<<1^i<<2^i<<3^i<<4)>>8^255&a^99
d[t]=a
h[a]=t
o=16843009*p[r=p[n=p[t]]]^65537*r^257*n^16843008*t
s=257*p[a]^16843008*a
for(e=0;e<4;e++){l[e][t]=s=s<<24^s>>>8
c[e][a]=o=o<<24^o>>>8}}for(e=0;e<5;e++){l[e]=l[e].slice(0)
c[e]=c[e].slice(0)}return u}())
this._tables=[[a[0][0].slice(),a[0][1].slice(),a[0][2].slice(),a[0][3].slice(),a[0][4].slice()],[a[1][0].slice(),a[1][1].slice(),a[1][2].slice(),a[1][3].slice(),a[1][4].slice()]]
var t,i,n,r=this._tables[0][4],s=this._tables[1],o=e.length,u=1
if(4!==o&&6!==o&&8!==o)throw new Error("Invalid aes key size")
var l=e.slice(0),c=[]
this._key=[l,c]
for(t=o;t<4*o+28;t++){n=l[t-1]
if(t%o==0||8===o&&t%o==4){n=r[n>>>24]<<24^r[n>>16&255]<<16^r[n>>8&255]<<8^r[255&n]
if(t%o==0){n=n<<8^n>>>24^u<<24
u=u<<1^283*(u>>7)}}l[t]=l[t-o]^n}for(i=0;t;i++,t--){n=l[3&i?t:t-4]
c[i]=t<=4||i<4?n:s[0][r[n>>>24]]^s[1][r[n>>16&255]]^s[2][r[n>>8&255]]^s[3][r[255&n]]}}e.prototype.decrypt=function(e,t,i,n,r,a){var s,o,u,l,c=this._key[1],d=e^c[0],h=n^c[1],p=i^c[2],f=t^c[3],m=c.length/4-2,g=4,v=this._tables[1],y=v[0],_=v[1],b=v[2],T=v[3],S=v[4]
for(l=0;l<m;l++){s=y[d>>>24]^_[h>>16&255]^b[p>>8&255]^T[255&f]^c[g]
o=y[h>>>24]^_[p>>16&255]^b[f>>8&255]^T[255&d]^c[g+1]
u=y[p>>>24]^_[f>>16&255]^b[d>>8&255]^T[255&h]^c[g+2]
f=y[f>>>24]^_[d>>16&255]^b[h>>8&255]^T[255&p]^c[g+3]
g+=4
d=s
h=o
p=u}for(l=0;l<4;l++){r[(3&-l)+a]=S[d>>>24]<<24^S[h>>16&255]<<16^S[p>>8&255]<<8^S[255&f]^c[g++]
s=d
d=h
h=p
p=f
f=s}}
return e}(),o=function(e){n(t,e)
function t(){var t;(t=e.call(this,r)||this).jobs=[]
t.delay=1
t.timeout_=null
return t}var i=t.prototype
i.processJob_=function(){this.jobs.shift()()
this.jobs.length?this.timeout_=setTimeout(this.processJob_.bind(this),this.delay):this.timeout_=null}
i.push=function(e){this.jobs.push(e)
this.timeout_||(this.timeout_=setTimeout(this.processJob_.bind(this),this.delay))}
return t}(r),u=function(e){return e<<24|(65280&e)<<8|(16711680&e)>>8|e>>>24},l=function(){function e(t,i,n,r){var a=e.STEP,s=new Int32Array(t.buffer),l=new Uint8Array(t.byteLength),c=0
this.asyncStream_=new o
this.asyncStream_.push(this.decryptChunk_(s.subarray(c,c+a),i,n,l))
for(c=a;c<s.length;c+=a){n=new Uint32Array([u(s[c-4]),u(s[c-3]),u(s[c-2]),u(s[c-1])])
this.asyncStream_.push(this.decryptChunk_(s.subarray(c,c+a),i,n,l))}this.asyncStream_.push((function(){r(null,(e=l).subarray(0,e.byteLength-e[e.byteLength-1]))

;/*! @name pkcs7 @version 1.0.4 @license Apache-2.0 */
var e}))}e.prototype.decryptChunk_=function(e,t,i,n){return function(){var r=function(e,t,i){var n,r,a,o,l,c,d,h,p,f=new Int32Array(e.buffer,e.byteOffset,e.byteLength>>2),m=new s(Array.prototype.slice.call(t)),g=new Uint8Array(e.byteLength),v=new Int32Array(g.buffer)
n=i[0]
r=i[1]
a=i[2]
o=i[3]
for(p=0;p<f.length;p+=4){l=u(f[p])
c=u(f[p+1])
d=u(f[p+2])
h=u(f[p+3])
m.decrypt(l,c,d,h,v,p)
v[p]=u(v[p]^n)
v[p+1]=u(v[p+1]^r)
v[p+2]=u(v[p+2]^a)
v[p+3]=u(v[p+3]^o)
n=l
r=c
a=d
o=h}return g}(e,t,i)
n.set(r,e.byteOffset)}}
t(e,null,[{key:"STEP",get:function(){return 32e3}}])
return e}()
self.onmessage=function(e){var t=e.data,i=new Uint8Array(t.encrypted.bytes,t.encrypted.byteOffset,t.encrypted.byteLength),n=new Uint32Array(t.key.bytes,t.key.byteOffset,t.key.byteLength/4),r=new Uint32Array(t.iv.bytes,t.iv.byteOffset,t.iv.byteLength/4)
new l(i,n,r,(function(e,i){self.postMessage(function(e){var t={}
Object.keys(e).forEach((function(i){var n=e[i]
ArrayBuffer.isView(n)?t[i]={bytes:n.buffer,byteOffset:n.byteOffset,byteLength:n.byteLength}:t[i]=n}))
return t}({source:t.source,decrypted:i}),[i.buffer])}))}}))),Oh=od(Ah),Lh=function(e){var t=e.default?"main":"alternative"
e.characteristics&&e.characteristics.indexOf("public.accessibility.describes-video")>=0&&(t="main-desc")
return t},Dh=function(e,t){e.abort()
e.pause()
if(t&&t.activePlaylistLoader){t.activePlaylistLoader.pause()
t.activePlaylistLoader=null}},Rh=function(e,t){t.activePlaylistLoader=e
e.load()},Mh={AUDIO:function(e,t){return function(){var i=t.segmentLoaders[e],n=t.mediaTypes[e],r=t.blacklistCurrentPlaylist
Dh(i,n)
var a=n.activeTrack(),s=n.activeGroup(),o=(s.filter((function(e){return e.default}))[0]||s[0]).id,u=n.tracks[o]
if(a!==u){ql.log.warn("Problem encountered loading the alternate audio track.Switching back to default.")
for(var l in n.tracks)n.tracks[l].enabled=n.tracks[l]===u
n.onTrackChanged()}else r({message:"Problem encountered loading the default audio track."})}},SUBTITLES:function(e,t){return function(){var i=t.segmentLoaders[e],n=t.mediaTypes[e]
ql.log.warn("Problem encountered loading the subtitle track.Disabling subtitle track.")
Dh(i,n)
var r=n.activeTrack()
r&&(r.mode="disabled")
n.onTrackChanged()}}},Nh={AUDIO:function(e,t,i){if(t){var n=i.tech,r=i.requestOptions,a=i.segmentLoaders[e]
t.on("loadedmetadata",(function(){var e=t.media()
a.playlist(e,r);(!n.paused()||e.endList&&"none"!==n.preload())&&a.load()}))
t.on("loadedplaylist",(function(){a.playlist(t.media(),r)
n.paused()||a.load()}))
t.on("error",Mh[e](e,i))}},SUBTITLES:function(e,t,i){var n=i.tech,r=i.requestOptions,a=i.segmentLoaders[e],s=i.mediaTypes[e]
t.on("loadedmetadata",(function(){var e=t.media()
a.playlist(e,r)
a.track(s.activeTrack());(!n.paused()||e.endList&&"none"!==n.preload())&&a.load()}))
t.on("loadedplaylist",(function(){a.playlist(t.media(),r)
n.paused()||a.load()}))
t.on("error",Mh[e](e,i))}},Uh={AUDIO:function(e,t){var i=t.vhs,n=t.sourceType,r=t.segmentLoaders[e],a=t.requestOptions,s=t.master.mediaGroups,o=t.mediaTypes[e],u=o.groups,l=o.tracks,c=o.logger_,d=t.masterPlaylistLoader,h=Tc(d.master)
if(!s[e]||0===Object.keys(s[e]).length){s[e]={main:{default:{default:!0}}}
h&&(s[e].main.default.playlists=d.master.playlists)}for(var p in s[e]){u[p]||(u[p]=[])
for(var f in s[e][p]){var m=s[e][p][f],g=void 0
if(h){c("AUDIO group '"+p+"' label '"+f+"' is a master playlist")
m.isMasterPlaylist=!0
g=null}else g="vhs-json"===n&&m.playlists?new Nc(m.playlists[0],i,a):m.resolvedUri?new Nc(m.resolvedUri,i,a):m.playlists&&"dash"===n?new rd(m.playlists[0],i,a,d):null
m=ql.mergeOptions({id:f,playlistLoader:g},m)
Nh[e](e,m.playlistLoader,t)
u[p].push(m)
if(void 0===l[f]){var v=new ql.AudioTrack({id:f,kind:Lh(m),enabled:!1,language:m.language,default:m.default,label:f})
l[f]=v}}}r.on("error",Mh[e](e,t))},SUBTITLES:function(e,t){var i=t.tech,n=t.vhs,r=t.sourceType,a=t.segmentLoaders[e],s=t.requestOptions,o=t.master.mediaGroups,u=t.mediaTypes[e],l=u.groups,c=u.tracks,d=t.masterPlaylistLoader
for(var h in o[e]){l[h]||(l[h]=[])
for(var p in o[e][h])if(!o[e][h][p].forced){var f=o[e][h][p],m=void 0
if("hls"===r)m=new Nc(f.resolvedUri,n,s)
else if("dash"===r){if(!f.playlists.filter((function(e){return e.excludeUntil!==1/0})).length)return
m=new rd(f.playlists[0],n,s,d)}else"vhs-json"===r&&(m=new Nc(f.playlists?f.playlists[0]:f.resolvedUri,n,s))
f=ql.mergeOptions({id:p,playlistLoader:m},f)
Nh[e](e,f.playlistLoader,t)
l[h].push(f)
if(void 0===c[p]){var g=i.addRemoteTextTrack({id:p,kind:"subtitles",default:f.default&&f.autoselect,language:f.language,label:p},!1).track
c[p]=g}}}a.on("error",Mh[e](e,t))},"CLOSED-CAPTIONS":function(e,t){var i=t.tech,n=t.master.mediaGroups,r=t.mediaTypes[e],a=r.groups,s=r.tracks
for(var o in n[e]){a[o]||(a[o]=[])
for(var u in n[e][o]){var l=n[e][o][u]
if(/^(?:CC|SERVICE)/.test(l.instreamId)){var c=i.options_.vhs&&i.options_.vhs.captionServices||{},d={label:u,language:l.language,instreamId:l.instreamId,default:l.default&&l.autoselect}
c[d.instreamId]&&(d=ql.mergeOptions(d,c[d.instreamId]))
void 0===d.default&&delete d.default
a[o].push(ql.mergeOptions({id:u},l))
if(void 0===s[u]){var h=i.addRemoteTextTrack({id:d.instreamId,kind:"captions",default:d.default,language:d.language,label:d.label},!1).track
s[u]=h}}}}}},Bh=function e(t,i){for(var n=0;n<t.length;n++){if(_c(i,t[n]))return!0
if(t[n].playlists&&e(t[n].playlists,i))return!0}return!1},Fh={AUDIO:function(e,t){return function(){var i=t.mediaTypes[e].tracks
for(var n in i)if(i[n].enabled)return i[n]
return null}},SUBTITLES:function(e,t){return function(){var i=t.mediaTypes[e].tracks
for(var n in i)if("showing"===i[n].mode||"hidden"===i[n].mode)return i[n]
return null}}},jh=function(e){["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach((function(t){Uh[t](t,e)}))
var t=e.mediaTypes,i=e.masterPlaylistLoader,n=e.tech,r=e.vhs,a=e.segmentLoaders,s=a.AUDIO,o=a.main;["AUDIO","SUBTITLES"].forEach((function(i){t[i].activeGroup=function(e,t){return function(i){var n=t.masterPlaylistLoader,r=t.mediaTypes[e].groups,a=n.media()
if(!a)return null
var s=null
a.attributes[e]&&(s=r[a.attributes[e]])
var o=Object.keys(r)
if(!s)if("AUDIO"===e&&o.length>1&&Tc(t.master))for(var u=0;u<o.length;u++){var l=r[o[u]]
if(Bh(l,a)){s=l
break}}else r.main?s=r.main:1===o.length&&(s=r[o[0]])
return void 0===i?s:null!==i&&s&&s.filter((function(e){return e.id===i.id}))[0]||null}}(i,e)
t[i].activeTrack=Fh[i](i,e)
t[i].onGroupChanged=function(e,t){return function(){var i=t.segmentLoaders,n=i[e],r=i.main,a=t.mediaTypes[e],s=a.activeTrack(),o=a.getActiveGroup(),u=a.activePlaylistLoader,l=a.lastGroup_
if(!o||!l||o.id!==l.id){a.lastGroup_=o
a.lastTrack_=s
Dh(n,a)
if(o&&!o.isMasterPlaylist)if(o.playlistLoader){n.resyncLoader()
Rh(o.playlistLoader,a)}else u&&r.resetEverything()}}}(i,e)
t[i].onGroupChanging=function(e,t){return function(){var i=t.segmentLoaders[e]
t.mediaTypes[e].lastGroup_=null
i.abort()
i.pause()}}(i,e)
t[i].onTrackChanged=function(e,t){return function(){var i=t.masterPlaylistLoader,n=t.segmentLoaders,r=n[e],a=n.main,s=t.mediaTypes[e],o=s.activeTrack(),u=s.getActiveGroup(),l=s.activePlaylistLoader,c=s.lastTrack_
if(!c||!o||c.id!==o.id){s.lastGroup_=u
s.lastTrack_=o
Dh(r,s)
if(u)if(u.isMasterPlaylist){if(!o||!c||o.id===c.id)return
var d=t.vhs.masterPlaylistController_,h=d.selectPlaylist()
if(d.media()===h)return
s.logger_("track change. Switching master audio from "+c.id+" to "+o.id)
i.pause()
a.resetEverything()
d.fastQualityChange_(h)}else{if("AUDIO"===e){if(!u.playlistLoader){a.setAudio(!0)
a.resetEverything()
return}r.setAudio(!0)
a.setAudio(!1)}if(l!==u.playlistLoader){r.track&&r.track(o)
r.resetEverything()
Rh(u.playlistLoader,s)}else Rh(u.playlistLoader,s)}}}}(i,e)
t[i].getActiveGroup=function(e,t){var i=t.mediaTypes
return function(){var t=i[e].activeTrack()
return t?i[e].activeGroup(t):null}}(i,e)}))
var u=t.AUDIO.activeGroup()
if(u){var l=(u.filter((function(e){return e.default}))[0]||u[0]).id
t.AUDIO.tracks[l].enabled=!0
t.AUDIO.onGroupChanged()
t.AUDIO.onTrackChanged()
if(t.AUDIO.getActiveGroup().playlistLoader){o.setAudio(!1)
s.setAudio(!0)}else o.setAudio(!0)}i.on("mediachange",(function(){["AUDIO","SUBTITLES"].forEach((function(e){return t[e].onGroupChanged()}))}))
i.on("mediachanging",(function(){["AUDIO","SUBTITLES"].forEach((function(e){return t[e].onGroupChanging()}))}))
var c=function(){t.AUDIO.onTrackChanged()
n.trigger({type:"usage",name:"vhs-audio-change"})
n.trigger({type:"usage",name:"hls-audio-change"})}
n.audioTracks().addEventListener("change",c)
n.remoteTextTracks().addEventListener("change",t.SUBTITLES.onTrackChanged)
r.on("dispose",(function(){n.audioTracks().removeEventListener("change",c)
n.remoteTextTracks().removeEventListener("change",t.SUBTITLES.onTrackChanged)}))
n.clearTracks("audio")
for(var d in t.AUDIO.tracks)n.audioTracks().addTrack(t.AUDIO.tracks[d])},Vh=["mediaRequests","mediaRequestsAborted","mediaRequestsTimedout","mediaRequestsErrored","mediaTransferDuration","mediaBytesTransferred","mediaAppends"],Hh=function(e){return this.audioSegmentLoader_[e]+this.mainSegmentLoader_[e]},qh=function(e){B(t,e)
function t(t){var i
i=e.call(this)||this
var n=t.src,r=t.handleManifestRedirects,a=t.withCredentials,s=t.tech,o=t.bandwidth,u=t.externVhs,l=t.useCueTags,c=t.blacklistDuration,d=t.enableLowInitialPlaylist,h=t.sourceType,p=t.cacheEncryptionKeys,f=t.experimentalBufferBasedABR,m=t.experimentalLeastPixelDiffSelector,g=t.captionServices
if(!n)throw new Error("A non-empty playlist URL or JSON manifest string is required")
var v=t.maxPlaylistRetries
null==v&&(v=1/0)
nh=u
i.experimentalBufferBasedABR=Boolean(f)
i.experimentalLeastPixelDiffSelector=Boolean(m)
i.withCredentials=a
i.tech_=s
i.vhs_=s.vhs
i.sourceType_=h
i.useCueTags_=l
i.blacklistDuration=c
i.maxPlaylistRetries=v
i.enableLowInitialPlaylist=d
if(i.useCueTags_){i.cueTagsTrack_=i.tech_.addTextTrack("metadata","ad-cues")
i.cueTagsTrack_.inBandMetadataTrackDispatchType=""}i.requestOptions_={withCredentials:a,handleManifestRedirects:r,maxPlaylistRetries:v,timeout:null}
i.on("error",i.pauseLoading)
i.mediaTypes_=function(){var e={};["AUDIO","SUBTITLES","CLOSED-CAPTIONS"].forEach((function(t){e[t]={groups:{},tracks:{},activePlaylistLoader:null,activeGroup:ih,activeTrack:ih,getActiveGroup:ih,onGroupChanged:ih,onTrackChanged:ih,lastTrack_:null,logger_:Xl("MediaGroups["+t+"]")}}))
return e}()
i.mediaSource=new x.MediaSource
i.handleDurationChange_=i.handleDurationChange_.bind(N(i))
i.handleSourceOpen_=i.handleSourceOpen_.bind(N(i))
i.handleSourceEnded_=i.handleSourceEnded_.bind(N(i))
i.mediaSource.addEventListener("durationchange",i.handleDurationChange_)
i.mediaSource.addEventListener("sourceopen",i.handleSourceOpen_)
i.mediaSource.addEventListener("sourceended",i.handleSourceEnded_)
i.seekable_=ql.createTimeRanges()
i.hasPlayed_=!1
i.syncController_=new Ph(t)
i.segmentMetadataTrack_=s.addRemoteTextTrack({kind:"metadata",label:"segment-metadata"},!1).track
i.decrypter_=new Oh
i.sourceUpdater_=new Sh(i.mediaSource)
i.inbandTextTracks_={}
i.timelineChangeController_=new xh
var y={vhs:i.vhs_,parse708captions:t.parse708captions,useDtsForTimestampOffset:t.useDtsForTimestampOffset,captionServices:g,mediaSource:i.mediaSource,currentTime:i.tech_.currentTime.bind(i.tech_),seekable:function(){return i.seekable()},seeking:function(){return i.tech_.seeking()},duration:function(){return i.duration()},hasPlayed:function(){return i.hasPlayed_},goalBufferLength:function(){return i.goalBufferLength()},bandwidth:o,syncController:i.syncController_,decrypter:i.decrypter_,sourceType:i.sourceType_,inbandTextTracks:i.inbandTextTracks_,cacheEncryptionKeys:p,sourceUpdater:i.sourceUpdater_,timelineChangeController:i.timelineChangeController_,experimentalExactManifestTimings:t.experimentalExactManifestTimings}
i.masterPlaylistLoader_="dash"===i.sourceType_?new rd(n,i.vhs_,i.requestOptions_):new Nc(n,i.vhs_,i.requestOptions_)
i.setupMasterPlaylistLoaderListeners_()
i.mainSegmentLoader_=new th(ql.mergeOptions(y,{segmentMetadataTrack:i.segmentMetadataTrack_,loaderType:"main"}),t)
i.audioSegmentLoader_=new th(ql.mergeOptions(y,{loaderType:"audio"}),t)
i.subtitleSegmentLoader_=new Ch(ql.mergeOptions(y,{loaderType:"vtt",featuresNativeTextTracks:i.tech_.featuresNativeTextTracks}),t)
i.setupSegmentLoaderListeners_()
if(i.experimentalBufferBasedABR){i.masterPlaylistLoader_.one("loadedplaylist",(function(){return i.startABRTimer_()}))
i.tech_.on("pause",(function(){return i.stopABRTimer_()}))
i.tech_.on("play",(function(){return i.startABRTimer_()}))}Vh.forEach((function(e){i[e+"_"]=Hh.bind(N(i),e)}))
i.logger_=Xl("MPC")
i.triggeredFmp4Usage=!1
if("none"===i.tech_.preload()){i.loadOnPlay_=function(){i.loadOnPlay_=null
i.masterPlaylistLoader_.load()}
i.tech_.one("play",i.loadOnPlay_)}else i.masterPlaylistLoader_.load()
i.timeToLoadedData__=-1
i.mainAppendsToLoadedData__=-1
i.audioAppendsToLoadedData__=-1
var _="none"===i.tech_.preload()?"play":"loadstart"
i.tech_.one(_,(function(){var e=Date.now()
i.tech_.one("loadeddata",(function(){i.timeToLoadedData__=Date.now()-e
i.mainAppendsToLoadedData__=i.mainSegmentLoader_.mediaAppends
i.audioAppendsToLoadedData__=i.audioSegmentLoader_.mediaAppends}))}))
return i}var i=t.prototype
i.mainAppendsToLoadedData_=function(){return this.mainAppendsToLoadedData__}
i.audioAppendsToLoadedData_=function(){return this.audioAppendsToLoadedData__}
i.appendsToLoadedData_=function(){var e=this.mainAppendsToLoadedData_(),t=this.audioAppendsToLoadedData_()
return-1===e||-1===t?-1:e+t}
i.timeToLoadedData_=function(){return this.timeToLoadedData__}
i.checkABR_=function(){var e=this.selectPlaylist()
e&&this.shouldSwitchToMedia_(e)&&this.switchMedia_(e,"abr")}
i.switchMedia_=function(e,t,i){var n=this.media(),r=n&&(n.id||n.uri),a=e.id||e.uri
if(r&&r!==a){this.logger_("switch media "+r+" -> "+a+" from "+t)
this.tech_.trigger({type:"usage",name:"vhs-rendition-change-"+t})}this.masterPlaylistLoader_.media(e,i)}
i.startABRTimer_=function(){var e=this
this.stopABRTimer_()
this.abrTimer_=x.setInterval((function(){return e.checkABR_()}),250)}
i.stopABRTimer_=function(){if(!this.tech_.scrubbing||!this.tech_.scrubbing()){x.clearInterval(this.abrTimer_)
this.abrTimer_=null}}
i.getAudioTrackPlaylists_=function(){var e=this.master(),t=e&&e.playlists||[]
if(!e||!e.mediaGroups||!e.mediaGroups.AUDIO)return t
var i,n=e.mediaGroups.AUDIO,r=Object.keys(n)
if(Object.keys(this.mediaTypes_.AUDIO.groups).length)i=this.mediaTypes_.AUDIO.activeTrack()
else{var a=n.main||r.length&&n[r[0]]
for(var s in a)if(a[s].default){i={label:s}
break}}if(!i)return t
var o=[]
for(var u in n)if(n[u][i.label]){var l=n[u][i.label]
if(l.playlists&&l.playlists.length)o.push.apply(o,l.playlists)
else if(l.uri)o.push(l)
else if(e.playlists.length)for(var c=0;c<e.playlists.length;c++){var d=e.playlists[c]
d.attributes&&d.attributes.AUDIO&&d.attributes.AUDIO===u&&o.push(d)}}return o.length?o:t}
i.setupMasterPlaylistLoaderListeners_=function(){var e=this
this.masterPlaylistLoader_.on("loadedmetadata",(function(){var t=e.masterPlaylistLoader_.media(),i=1.5*t.targetDuration*1e3
yc(e.masterPlaylistLoader_.master,e.masterPlaylistLoader_.media())?e.requestOptions_.timeout=0:e.requestOptions_.timeout=i
if(t.endList&&"none"!==e.tech_.preload()){e.mainSegmentLoader_.playlist(t,e.requestOptions_)
e.mainSegmentLoader_.load()}jh({sourceType:e.sourceType_,segmentLoaders:{AUDIO:e.audioSegmentLoader_,SUBTITLES:e.subtitleSegmentLoader_,main:e.mainSegmentLoader_},tech:e.tech_,requestOptions:e.requestOptions_,masterPlaylistLoader:e.masterPlaylistLoader_,vhs:e.vhs_,master:e.master(),mediaTypes:e.mediaTypes_,blacklistCurrentPlaylist:e.blacklistCurrentPlaylist.bind(e)})
e.triggerPresenceUsage_(e.master(),t)
e.setupFirstPlay()
!e.mediaTypes_.AUDIO.activePlaylistLoader||e.mediaTypes_.AUDIO.activePlaylistLoader.media()?e.trigger("selectedinitialmedia"):e.mediaTypes_.AUDIO.activePlaylistLoader.one("loadedmetadata",(function(){e.trigger("selectedinitialmedia")}))}))
this.masterPlaylistLoader_.on("loadedplaylist",(function(){e.loadOnPlay_&&e.tech_.off("play",e.loadOnPlay_)
var t=e.masterPlaylistLoader_.media()
if(!t){e.excludeUnsupportedVariants_()
var i
e.enableLowInitialPlaylist&&(i=e.selectInitialPlaylist())
i||(i=e.selectPlaylist())
if(!i||!e.shouldSwitchToMedia_(i))return
e.initialMedia_=i
e.switchMedia_(e.initialMedia_,"initial")
if(!("vhs-json"===e.sourceType_&&e.initialMedia_.segments))return
t=e.initialMedia_}e.handleUpdatedMediaPlaylist(t)}))
this.masterPlaylistLoader_.on("error",(function(){e.blacklistCurrentPlaylist(e.masterPlaylistLoader_.error)}))
this.masterPlaylistLoader_.on("mediachanging",(function(){e.mainSegmentLoader_.abort()
e.mainSegmentLoader_.pause()}))
this.masterPlaylistLoader_.on("mediachange",(function(){var t=e.masterPlaylistLoader_.media(),i=1.5*t.targetDuration*1e3
yc(e.masterPlaylistLoader_.master,e.masterPlaylistLoader_.media())?e.requestOptions_.timeout=0:e.requestOptions_.timeout=i
e.mainSegmentLoader_.playlist(t,e.requestOptions_)
e.mainSegmentLoader_.load()
e.tech_.trigger({type:"mediachange",bubbles:!0})}))
this.masterPlaylistLoader_.on("playlistunchanged",(function(){var t=e.masterPlaylistLoader_.media()
if("playlist-unchanged"!==t.lastExcludeReason_){if(e.stuckAtPlaylistEnd_(t)){e.blacklistCurrentPlaylist({message:"Playlist no longer updating.",reason:"playlist-unchanged"})
e.tech_.trigger("playliststuck")}}}))
this.masterPlaylistLoader_.on("renditiondisabled",(function(){e.tech_.trigger({type:"usage",name:"vhs-rendition-disabled"})
e.tech_.trigger({type:"usage",name:"hls-rendition-disabled"})}))
this.masterPlaylistLoader_.on("renditionenabled",(function(){e.tech_.trigger({type:"usage",name:"vhs-rendition-enabled"})
e.tech_.trigger({type:"usage",name:"hls-rendition-enabled"})}))}
i.handleUpdatedMediaPlaylist=function(e){this.useCueTags_&&this.updateAdCues_(e)
this.mainSegmentLoader_.playlist(e,this.requestOptions_)
this.updateDuration(!e.endList)
if(!this.tech_.paused()){this.mainSegmentLoader_.load()
this.audioSegmentLoader_&&this.audioSegmentLoader_.load()}}
i.triggerPresenceUsage_=function(e,t){var i=e.mediaGroups||{},n=!0,r=Object.keys(i.AUDIO)
for(var a in i.AUDIO)for(var s in i.AUDIO[a]){i.AUDIO[a][s].uri||(n=!1)}if(n){this.tech_.trigger({type:"usage",name:"vhs-demuxed"})
this.tech_.trigger({type:"usage",name:"hls-demuxed"})}if(Object.keys(i.SUBTITLES).length){this.tech_.trigger({type:"usage",name:"vhs-webvtt"})
this.tech_.trigger({type:"usage",name:"hls-webvtt"})}if(nh.Playlist.isAes(t)){this.tech_.trigger({type:"usage",name:"vhs-aes"})
this.tech_.trigger({type:"usage",name:"hls-aes"})}if(r.length&&Object.keys(i.AUDIO[r[0]]).length>1){this.tech_.trigger({type:"usage",name:"vhs-alternate-audio"})
this.tech_.trigger({type:"usage",name:"hls-alternate-audio"})}if(this.useCueTags_){this.tech_.trigger({type:"usage",name:"vhs-playlist-cue-tags"})
this.tech_.trigger({type:"usage",name:"hls-playlist-cue-tags"})}}
i.shouldSwitchToMedia_=function(e){var t=this.masterPlaylistLoader_.media()||this.masterPlaylistLoader_.pendingMedia_,i=this.tech_.currentTime(),n=this.bufferLowWaterLine(),r=this.bufferHighWaterLine()
return function(e){var t=e.currentPlaylist,i=e.buffered,n=e.currentTime,r=e.nextPlaylist,a=e.bufferLowWaterLine,s=e.bufferHighWaterLine,o=e.duration,u=e.experimentalBufferBasedABR,l=e.log
if(!r){ql.log.warn("We received no playlist to switch to. Please check your stream.")
return!1}var c="allowing switch "+(t&&t.id||"null")+" -> "+r.id
if(!t){l(c+" as current playlist is not set")
return!0}if(r.id===t.id)return!1
var d=Boolean(Jl(i,n).length)
if(!t.endList){if(!d&&"number"==typeof t.partTargetDuration){l("not "+c+" as current playlist is live llhls, but currentTime isn't in buffered.")
return!1}l(c+" as current playlist is live")
return!0}var h=nc(i,n),p=u?ad.EXPERIMENTAL_MAX_BUFFER_LOW_WATER_LINE:ad.MAX_BUFFER_LOW_WATER_LINE
if(o<p){l(c+" as duration < max low water line ("+o+" < "+p+")")
return!0}var f=r.attributes.BANDWIDTH,m=t.attributes.BANDWIDTH
if(f<m&&(!u||h<s)){var g=c+" as next bandwidth < current bandwidth ("+f+" < "+m+")"
u&&(g+=" and forwardBuffer < bufferHighWaterLine ("+h+" < "+s+")")
l(g)
return!0}if((!u||f>m)&&h>=a){var v=c+" as forwardBuffer >= bufferLowWaterLine ("+h+" >= "+a+")"
u&&(v+=" and next bandwidth > current bandwidth ("+f+" > "+m+")")
l(v)
return!0}l("not "+c+" as no switching criteria met")
return!1}({buffered:this.tech_.buffered(),currentTime:i,currentPlaylist:t,nextPlaylist:e,bufferLowWaterLine:n,bufferHighWaterLine:r,duration:this.duration(),experimentalBufferBasedABR:this.experimentalBufferBasedABR,log:this.logger_})}
i.setupSegmentLoaderListeners_=function(){var e=this
if(!this.experimentalBufferBasedABR){this.mainSegmentLoader_.on("bandwidthupdate",(function(){var t=e.selectPlaylist()
e.shouldSwitchToMedia_(t)&&e.switchMedia_(t,"bandwidthupdate")
e.tech_.trigger("bandwidthupdate")}))
this.mainSegmentLoader_.on("progress",(function(){e.trigger("progress")}))}this.mainSegmentLoader_.on("error",(function(){e.blacklistCurrentPlaylist(e.mainSegmentLoader_.error())}))
this.mainSegmentLoader_.on("appenderror",(function(){e.error=e.mainSegmentLoader_.error_
e.trigger("error")}))
this.mainSegmentLoader_.on("syncinfoupdate",(function(){e.onSyncInfoUpdate_()}))
this.mainSegmentLoader_.on("timestampoffset",(function(){e.tech_.trigger({type:"usage",name:"vhs-timestamp-offset"})
e.tech_.trigger({type:"usage",name:"hls-timestamp-offset"})}))
this.audioSegmentLoader_.on("syncinfoupdate",(function(){e.onSyncInfoUpdate_()}))
this.audioSegmentLoader_.on("appenderror",(function(){e.error=e.audioSegmentLoader_.error_
e.trigger("error")}))
this.mainSegmentLoader_.on("ended",(function(){e.logger_("main segment loader ended")
e.onEndOfStream()}))
this.mainSegmentLoader_.on("earlyabort",(function(t){if(!e.experimentalBufferBasedABR){e.delegateLoaders_("all",["abort"])
e.blacklistCurrentPlaylist({message:"Aborted early because there isn't enough bandwidth to complete the request without rebuffering."},120)}}))
var t=function(){if(!e.sourceUpdater_.hasCreatedSourceBuffers())return e.tryToCreateSourceBuffers_()
var t=e.getCodecsOrExclude_()
t&&e.sourceUpdater_.addOrChangeSourceBuffers(t)}
this.mainSegmentLoader_.on("trackinfo",t)
this.audioSegmentLoader_.on("trackinfo",t)
this.mainSegmentLoader_.on("fmp4",(function(){if(!e.triggeredFmp4Usage){e.tech_.trigger({type:"usage",name:"vhs-fmp4"})
e.tech_.trigger({type:"usage",name:"hls-fmp4"})
e.triggeredFmp4Usage=!0}}))
this.audioSegmentLoader_.on("fmp4",(function(){if(!e.triggeredFmp4Usage){e.tech_.trigger({type:"usage",name:"vhs-fmp4"})
e.tech_.trigger({type:"usage",name:"hls-fmp4"})
e.triggeredFmp4Usage=!0}}))
this.audioSegmentLoader_.on("ended",(function(){e.logger_("audioSegmentLoader ended")
e.onEndOfStream()}))}
i.mediaSecondsLoaded_=function(){return Math.max(this.audioSegmentLoader_.mediaSecondsLoaded+this.mainSegmentLoader_.mediaSecondsLoaded)}
i.load=function(){this.mainSegmentLoader_.load()
this.mediaTypes_.AUDIO.activePlaylistLoader&&this.audioSegmentLoader_.load()
this.mediaTypes_.SUBTITLES.activePlaylistLoader&&this.subtitleSegmentLoader_.load()}
i.smoothQualityChange_=function(e){void 0===e&&(e=this.selectPlaylist())
this.fastQualityChange_(e)}
i.fastQualityChange_=function(e){var t=this
void 0===e&&(e=this.selectPlaylist())
if(e!==this.masterPlaylistLoader_.media()){this.switchMedia_(e,"fast-quality")
this.mainSegmentLoader_.resetEverything((function(){ql.browser.IE_VERSION||ql.browser.IS_EDGE?t.tech_.setCurrentTime(t.tech_.currentTime()+.04):t.tech_.setCurrentTime(t.tech_.currentTime())}))}else this.logger_("skipping fastQualityChange because new media is same as old")}
i.play=function(){if(!this.setupFirstPlay()){this.tech_.ended()&&this.tech_.setCurrentTime(0)
this.hasPlayed_&&this.load()
var e=this.tech_.seekable()
return this.tech_.duration()===1/0&&this.tech_.currentTime()<e.start(0)?this.tech_.setCurrentTime(e.end(e.length-1)):void 0}}
i.setupFirstPlay=function(){var e=this,t=this.masterPlaylistLoader_.media()
if(!t||this.tech_.paused()||this.hasPlayed_)return!1
if(!t.endList){var i=this.seekable()
if(!i.length)return!1
if(ql.browser.IE_VERSION&&0===this.tech_.readyState()){this.tech_.one("loadedmetadata",(function(){e.trigger("firstplay")
e.tech_.setCurrentTime(i.end(0))
e.hasPlayed_=!0}))
return!1}this.trigger("firstplay")
this.tech_.setCurrentTime(i.end(0))}this.hasPlayed_=!0
this.load()
return!0}
i.handleSourceOpen_=function(){this.tryToCreateSourceBuffers_()
if(this.tech_.autoplay()){var e=this.tech_.play()
void 0!==e&&"function"==typeof e.then&&e.then(null,(function(e){}))}this.trigger("sourceopen")}
i.handleSourceEnded_=function(){if(this.inbandTextTracks_.metadataTrack_){var e=this.inbandTextTracks_.metadataTrack_.cues
if(e&&e.length){var t=this.duration()
e[e.length-1].endTime=isNaN(t)||Math.abs(t)===1/0?Number.MAX_VALUE:t}}}
i.handleDurationChange_=function(){this.tech_.trigger("durationchange")}
i.onEndOfStream=function(){var e=this.mainSegmentLoader_.ended_
if(this.mediaTypes_.AUDIO.activePlaylistLoader){var t=this.mainSegmentLoader_.getCurrentMediaInfo_()
e=!t||t.hasVideo?e&&this.audioSegmentLoader_.ended_:this.audioSegmentLoader_.ended_}if(e){this.stopABRTimer_()
this.sourceUpdater_.endOfStream()}}
i.stuckAtPlaylistEnd_=function(e){if(!this.seekable().length)return!1
var t=this.syncController_.getExpiredTime(e,this.duration())
if(null===t)return!1
var i=nh.Playlist.playlistEnd(e,t),n=this.tech_.currentTime(),r=this.tech_.buffered()
if(!r.length)return i-n<=Ql
var a=r.end(r.length-1)
return a-n<=Ql&&i-a<=Ql}
i.blacklistCurrentPlaylist=function(e,t){void 0===e&&(e={})
var i=e.playlist||this.masterPlaylistLoader_.media()
t=t||e.blacklistDuration||this.blacklistDuration
if(i){i.playlistErrors_++
var n,r=this.masterPlaylistLoader_.master.playlists,a=r.filter(gc),s=1===a.length&&a[0]===i
if(1===r.length&&t!==1/0){ql.log.warn("Problem encountered with playlist "+i.id+". Trying again since it is the only playlist.")
this.tech_.trigger("retryplaylist")
return this.masterPlaylistLoader_.load(s)}if(s){var o=!1
r.forEach((function(e){if(e!==i){var t=e.excludeUntil
if(void 0!==t&&t!==1/0){o=!0
delete e.excludeUntil}}}))
if(o){ql.log.warn("Removing other playlists from the exclusion list because the last rendition is about to be excluded.")
this.tech_.trigger("retryplaylist")}}n=i.playlistErrors_>this.maxPlaylistRetries?1/0:Date.now()+1e3*t
i.excludeUntil=n
e.reason&&(i.lastExcludeReason_=e.reason)
this.tech_.trigger("blacklistplaylist")
this.tech_.trigger({type:"usage",name:"vhs-rendition-blacklisted"})
this.tech_.trigger({type:"usage",name:"hls-rendition-blacklisted"})
var u=this.selectPlaylist()
if(u){var l=e.internal?this.logger_:ql.log.warn,c=e.message?" "+e.message:""
l((e.internal?"Internal problem":"Problem")+" encountered with playlist "+i.id+"."+c+" Switching to playlist "+u.id+".")
u.attributes.AUDIO!==i.attributes.AUDIO&&this.delegateLoaders_("audio",["abort","pause"])
u.attributes.SUBTITLES!==i.attributes.SUBTITLES&&this.delegateLoaders_("subtitle",["abort","pause"])
this.delegateLoaders_("main",["abort","pause"])
var d=u.targetDuration/2*1e3||5e3,h="number"==typeof u.lastRequest&&Date.now()-u.lastRequest<=d
return this.switchMedia_(u,"exclude",s||h)}this.error="Playback cannot continue. No available working or supported playlists."
this.trigger("error")}else{this.error=e
"open"!==this.mediaSource.readyState?this.trigger("error"):this.sourceUpdater_.endOfStream("network")}}
i.pauseLoading=function(){this.delegateLoaders_("all",["abort","pause"])
this.stopABRTimer_()}
i.delegateLoaders_=function(e,t){var i=this,n=[],r="all"===e;(r||"main"===e)&&n.push(this.masterPlaylistLoader_)
var a=[];(r||"audio"===e)&&a.push("AUDIO")
if(r||"subtitle"===e){a.push("CLOSED-CAPTIONS")
a.push("SUBTITLES")}a.forEach((function(e){var t=i.mediaTypes_[e]&&i.mediaTypes_[e].activePlaylistLoader
t&&n.push(t)}));["main","audio","subtitle"].forEach((function(t){var r=i[t+"SegmentLoader_"]
!r||e!==t&&"all"!==e||n.push(r)}))
n.forEach((function(e){return t.forEach((function(t){"function"==typeof e[t]&&e[t]()}))}))}
i.setCurrentTime=function(e){var t=Jl(this.tech_.buffered(),e)
if(!this.masterPlaylistLoader_||!this.masterPlaylistLoader_.media())return 0
if(!this.masterPlaylistLoader_.media().segments)return 0
if(t&&t.length)return e
this.mainSegmentLoader_.resetEverything()
this.mainSegmentLoader_.abort()
if(this.mediaTypes_.AUDIO.activePlaylistLoader){this.audioSegmentLoader_.resetEverything()
this.audioSegmentLoader_.abort()}if(this.mediaTypes_.SUBTITLES.activePlaylistLoader){this.subtitleSegmentLoader_.resetEverything()
this.subtitleSegmentLoader_.abort()}this.load()}
i.duration=function(){if(!this.masterPlaylistLoader_)return 0
var e=this.masterPlaylistLoader_.media()
return e?e.endList?this.mediaSource?this.mediaSource.duration:nh.Playlist.duration(e):1/0:0}
i.seekable=function(){return this.seekable_}
i.onSyncInfoUpdate_=function(){var e
if(this.masterPlaylistLoader_){var t=this.masterPlaylistLoader_.media()
if(t){var i=this.syncController_.getExpiredTime(t,this.duration())
if(null!==i){var n=this.masterPlaylistLoader_.master,r=nh.Playlist.seekable(t,i,nh.Playlist.liveEdgeDelay(n,t))
if(0!==r.length){if(this.mediaTypes_.AUDIO.activePlaylistLoader){t=this.mediaTypes_.AUDIO.activePlaylistLoader.media()
if(null===(i=this.syncController_.getExpiredTime(t,this.duration())))return
if(0===(e=nh.Playlist.seekable(t,i,nh.Playlist.liveEdgeDelay(n,t))).length)return}var a,s
if(this.seekable_&&this.seekable_.length){a=this.seekable_.end(0)
s=this.seekable_.start(0)}e?e.start(0)>r.end(0)||r.start(0)>e.end(0)?this.seekable_=r:this.seekable_=ql.createTimeRanges([[e.start(0)>r.start(0)?e.start(0):r.start(0),e.end(0)<r.end(0)?e.end(0):r.end(0)]]):this.seekable_=r
if(!this.seekable_||!this.seekable_.length||this.seekable_.end(0)!==a||this.seekable_.start(0)!==s){this.logger_("seekable updated ["+ec(this.seekable_)+"]")
this.tech_.trigger("seekablechanged")}}}}}}
i.updateDuration=function(e){if(this.updateDuration_){this.mediaSource.removeEventListener("sourceopen",this.updateDuration_)
this.updateDuration_=null}if("open"===this.mediaSource.readyState)if(e){var t=this.seekable()
if(!t.length)return;(isNaN(this.mediaSource.duration)||this.mediaSource.duration<t.end(t.length-1))&&this.sourceUpdater_.setDuration(t.end(t.length-1))}else{var i=this.tech_.buffered(),n=nh.Playlist.duration(this.masterPlaylistLoader_.media())
i.length>0&&(n=Math.max(n,i.end(i.length-1)))
this.mediaSource.duration!==n&&this.sourceUpdater_.setDuration(n)}else{this.updateDuration_=this.updateDuration.bind(this,e)
this.mediaSource.addEventListener("sourceopen",this.updateDuration_)}}
i.dispose=function(){var e=this
this.trigger("dispose")
this.decrypter_.terminate()
this.masterPlaylistLoader_.dispose()
this.mainSegmentLoader_.dispose()
this.loadOnPlay_&&this.tech_.off("play",this.loadOnPlay_);["AUDIO","SUBTITLES"].forEach((function(t){var i=e.mediaTypes_[t].groups
for(var n in i)i[n].forEach((function(e){e.playlistLoader&&e.playlistLoader.dispose()}))}))
this.audioSegmentLoader_.dispose()
this.subtitleSegmentLoader_.dispose()
this.sourceUpdater_.dispose()
this.timelineChangeController_.dispose()
this.stopABRTimer_()
this.updateDuration_&&this.mediaSource.removeEventListener("sourceopen",this.updateDuration_)
this.mediaSource.removeEventListener("durationchange",this.handleDurationChange_)
this.mediaSource.removeEventListener("sourceopen",this.handleSourceOpen_)
this.mediaSource.removeEventListener("sourceended",this.handleSourceEnded_)
this.off()}
i.master=function(){return this.masterPlaylistLoader_.master}
i.media=function(){return this.masterPlaylistLoader_.media()||this.initialMedia_}
i.areMediaTypesKnown_=function(){var e=!!this.mediaTypes_.AUDIO.activePlaylistLoader,t=!!this.mainSegmentLoader_.getCurrentMediaInfo_(),i=!e||!!this.audioSegmentLoader_.getCurrentMediaInfo_()
return!(!t||!i)}
i.getCodecsOrExclude_=function(){var e=this,t={main:this.mainSegmentLoader_.getCurrentMediaInfo_()||{},audio:this.audioSegmentLoader_.getCurrentMediaInfo_()||{}}
t.video=t.main
var i=Bd(this.master(),this.media()),n={},r=!!this.mediaTypes_.AUDIO.activePlaylistLoader
t.main.hasVideo&&(n.video=i.video||t.main.videoCodec||"avc1.4d400d")
t.main.isMuxed&&(n.video+=","+(i.audio||t.main.audioCodec||Qe))
if(t.main.hasAudio&&!t.main.isMuxed||t.audio.hasAudio||r){n.audio=i.audio||t.main.audioCodec||t.audio.audioCodec||Qe
t.audio.isFmp4=t.main.hasAudio&&!t.main.isMuxed?t.main.isFmp4:t.audio.isFmp4}if(n.audio||n.video){var a,s={};["video","audio"].forEach((function(e){if(n.hasOwnProperty(e)&&!(r=t[e].isFmp4,o=n[e],r?Xe(o):Ye(o))){var i=t[e].isFmp4?"browser":"muxer"
s[i]=s[i]||[]
s[i].push(n[e])
"audio"===e&&(a=i)}var r,o}))
if(r&&a&&this.media().attributes.AUDIO){var o=this.media().attributes.AUDIO
this.master().playlists.forEach((function(t){(t.attributes&&t.attributes.AUDIO)===o&&t!==e.media()&&(t.excludeUntil=1/0)}))
this.logger_("excluding audio group "+o+" as "+a+' does not support codec(s): "'+n.audio+'"')}if(!Object.keys(s).length){if(this.sourceUpdater_.hasCreatedSourceBuffers()&&!this.sourceUpdater_.canChangeType()){var u=[];["video","audio"].forEach((function(t){var i=(Ge(e.sourceUpdater_.codecs[t]||"")[0]||{}).type,r=(Ge(n[t]||"")[0]||{}).type
i&&r&&i.toLowerCase()!==r.toLowerCase()&&u.push('"'+e.sourceUpdater_.codecs[t]+'" -> "'+n[t]+'"')}))
if(u.length){this.blacklistCurrentPlaylist({playlist:this.media(),message:"Codec switching not supported: "+u.join(", ")+".",blacklistDuration:1/0,internal:!0})
return}}return n}var l=Object.keys(s).reduce((function(e,t){e&&(e+=", ")
return e+=t+' does not support codec(s): "'+s[t].join(",")+'"'}),"")+"."
this.blacklistCurrentPlaylist({playlist:this.media(),internal:!0,message:l,blacklistDuration:1/0})}else this.blacklistCurrentPlaylist({playlist:this.media(),message:"Could not determine codecs for playlist.",blacklistDuration:1/0})}
i.tryToCreateSourceBuffers_=function(){if("open"===this.mediaSource.readyState&&!this.sourceUpdater_.hasCreatedSourceBuffers()&&this.areMediaTypesKnown_()){var e=this.getCodecsOrExclude_()
if(e){this.sourceUpdater_.createSourceBuffers(e)
var t=[e.video,e.audio].filter(Boolean).join(",")
this.excludeIncompatibleVariants_(t)}}}
i.excludeUnsupportedVariants_=function(){var e=this,t=this.master().playlists,i=[]
Object.keys(t).forEach((function(n){var r=t[n]
if(-1===i.indexOf(r.id)){i.push(r.id)
var a=Bd(e.master,r),s=[]
!a.audio||Ye(a.audio)||Xe(a.audio)||s.push("audio codec "+a.audio)
!a.video||Ye(a.video)||Xe(a.video)||s.push("video codec "+a.video)
a.text&&"stpp.ttml.im1t"===a.text&&s.push("text codec "+a.text)
if(s.length){r.excludeUntil=1/0
e.logger_("excluding "+r.id+" for unsupported: "+s.join(", "))}}}))}
i.excludeIncompatibleVariants_=function(e){var t=this,i=[],n=this.master().playlists,r=Nd(Ge(e)),a=Ud(r),s=r.video&&Ge(r.video)[0]||null,o=r.audio&&Ge(r.audio)[0]||null
Object.keys(n).forEach((function(e){var r=n[e]
if(-1===i.indexOf(r.id)&&r.excludeUntil!==1/0){i.push(r.id)
var u=[],l=Bd(t.masterPlaylistLoader_.master,r),c=Ud(l)
if(l.audio||l.video){c!==a&&u.push('codec count "'+c+'" !== "'+a+'"')
if(!t.sourceUpdater_.canChangeType()){var d=l.video&&Ge(l.video)[0]||null,h=l.audio&&Ge(l.audio)[0]||null
d&&s&&d.type.toLowerCase()!==s.type.toLowerCase()&&u.push('video codec "'+d.type+'" !== "'+s.type+'"')
h&&o&&h.type.toLowerCase()!==o.type.toLowerCase()&&u.push('audio codec "'+h.type+'" !== "'+o.type+'"')}if(u.length){r.excludeUntil=1/0
t.logger_("blacklisting "+r.id+": "+u.join(" && "))}}}}))}
i.updateAdCues_=function(e){var t=0,i=this.seekable()
i.length&&(t=i.start(0))
!function(e,t,i){void 0===i&&(i=0)
if(e.segments)for(var n,r=i,a=0;a<e.segments.length;a++){var s=e.segments[a]
n||(n=wh(t,r+s.duration/2))
if(n){if("cueIn"in s){n.endTime=r
n.adEndTime=r
r+=s.duration
n=null
continue}if(r<n.endTime){r+=s.duration
continue}n.endTime+=s.duration}else{if("cueOut"in s){(n=new x.VTTCue(r,r+s.duration,s.cueOut)).adStartTime=r
n.adEndTime=r+parseFloat(s.cueOut)
t.addCue(n)}if("cueOutCont"in s){var o=s.cueOutCont.split("/").map(parseFloat),u=o[0],l=o[1];(n=new x.VTTCue(r,r+s.duration,"")).adStartTime=r-u
n.adEndTime=n.adStartTime+l
t.addCue(n)}}r+=s.duration}}(e,this.cueTagsTrack_,t)}
i.goalBufferLength=function(){var e=this.tech_.currentTime(),t=ad.GOAL_BUFFER_LENGTH,i=ad.GOAL_BUFFER_LENGTH_RATE,n=Math.max(t,ad.MAX_GOAL_BUFFER_LENGTH)
return Math.min(t+e*i,n)}
i.bufferLowWaterLine=function(){var e=this.tech_.currentTime(),t=ad.BUFFER_LOW_WATER_LINE,i=ad.BUFFER_LOW_WATER_LINE_RATE,n=Math.max(t,ad.MAX_BUFFER_LOW_WATER_LINE),r=Math.max(t,ad.EXPERIMENTAL_MAX_BUFFER_LOW_WATER_LINE)
return Math.min(t+e*i,this.experimentalBufferBasedABR?r:n)}
i.bufferHighWaterLine=function(){return ad.BUFFER_HIGH_WATER_LINE}
return t}(ql.EventTarget),Wh=function(e,t,i){var n,r,a,s=e.masterPlaylistController_,o=s[(e.options_.smoothQualityChange?"smooth":"fast")+"QualityChange_"].bind(s)
if(t.attributes){var u=t.attributes.RESOLUTION
this.width=u&&u.width
this.height=u&&u.height
this.bandwidth=t.attributes.BANDWIDTH}this.codecs=Bd(s.master(),t)
this.playlist=t
this.id=i
this.enabled=(n=e.playlists,r=t.id,a=o,function(e){var t=n.master.playlists[r],i=mc(t),s=gc(t)
if(void 0===e)return s
e?delete t.disabled:t.disabled=!0
if(e!==s&&!i){a()
e?n.trigger("renditionenabled"):n.trigger("renditiondisabled")}return e})},Gh=["seeking","seeked","pause","playing","error"],zh=function(){function e(e){var t=this
this.masterPlaylistController_=e.masterPlaylistController
this.tech_=e.tech
this.seekable=e.seekable
this.allowSeeksWithinUnsafeLiveWindow=e.allowSeeksWithinUnsafeLiveWindow
this.liveRangeSafeTimeDelta=e.liveRangeSafeTimeDelta
this.media=e.media
this.consecutiveUpdates=0
this.lastRecordedTime=null
this.timer_=null
this.checkCurrentTimeTimeout_=null
this.logger_=Xl("PlaybackWatcher")
this.logger_("initialize")
var i=function(){return t.monitorCurrentTime_()},n=function(){return t.monitorCurrentTime_()},r=function(){return t.techWaiting_()},a=function(){return t.cancelTimer_()},s=this.masterPlaylistController_,o=["main","subtitle","audio"],u={}
o.forEach((function(e){u[e]={reset:function(){return t.resetSegmentDownloads_(e)},updateend:function(){return t.checkSegmentDownloads_(e)}}
s[e+"SegmentLoader_"].on("appendsdone",u[e].updateend)
s[e+"SegmentLoader_"].on("playlistupdate",u[e].reset)
t.tech_.on(["seeked","seeking"],u[e].reset)}))
var l=function(e){["main","audio"].forEach((function(i){s[i+"SegmentLoader_"][e]("appended",t.seekingAppendCheck_)}))}
this.seekingAppendCheck_=function(){if(t.fixesBadSeeks_()){t.consecutiveUpdates=0
t.lastRecordedTime=t.tech_.currentTime()
l("off")}}
this.clearSeekingAppendCheck_=function(){return l("off")}
this.watchForBadSeeking_=function(){t.clearSeekingAppendCheck_()
l("on")}
this.tech_.on("seeked",this.clearSeekingAppendCheck_)
this.tech_.on("seeking",this.watchForBadSeeking_)
this.tech_.on("waiting",r)
this.tech_.on(Gh,a)
this.tech_.on("canplay",n)
this.tech_.one("play",i)
this.dispose=function(){t.clearSeekingAppendCheck_()
t.logger_("dispose")
t.tech_.off("waiting",r)
t.tech_.off(Gh,a)
t.tech_.off("canplay",n)
t.tech_.off("play",i)
t.tech_.off("seeking",t.watchForBadSeeking_)
t.tech_.off("seeked",t.clearSeekingAppendCheck_)
o.forEach((function(e){s[e+"SegmentLoader_"].off("appendsdone",u[e].updateend)
s[e+"SegmentLoader_"].off("playlistupdate",u[e].reset)
t.tech_.off(["seeked","seeking"],u[e].reset)}))
t.checkCurrentTimeTimeout_&&x.clearTimeout(t.checkCurrentTimeTimeout_)
t.cancelTimer_()}}var t=e.prototype
t.monitorCurrentTime_=function(){this.checkCurrentTime_()
this.checkCurrentTimeTimeout_&&x.clearTimeout(this.checkCurrentTimeTimeout_)
this.checkCurrentTimeTimeout_=x.setTimeout(this.monitorCurrentTime_.bind(this),250)}
t.resetSegmentDownloads_=function(e){var t=this.masterPlaylistController_[e+"SegmentLoader_"]
this[e+"StalledDownloads_"]>0&&this.logger_("resetting possible stalled download count for "+e+" loader")
this[e+"StalledDownloads_"]=0
this[e+"Buffered_"]=t.buffered_()}
t.checkSegmentDownloads_=function(e){var t=this.masterPlaylistController_,i=t[e+"SegmentLoader_"],n=i.buffered_(),r=function(e,t){if(e===t)return!1
if(!e&&t||!t&&e)return!0
if(e.length!==t.length)return!0
for(var i=0;i<e.length;i++)if(e.start(i)!==t.start(i)||e.end(i)!==t.end(i))return!0
return!1}(this[e+"Buffered_"],n)
this[e+"Buffered_"]=n
if(r)this.resetSegmentDownloads_(e)
else{this[e+"StalledDownloads_"]++
this.logger_("found #"+this[e+"StalledDownloads_"]+" "+e+" appends that did not increase buffer (possible stalled download)",{playlistId:i.playlist_&&i.playlist_.id,buffered:tc(n)})
if(!(this[e+"StalledDownloads_"]<10)){this.logger_(e+" loader stalled download exclusion")
this.resetSegmentDownloads_(e)
this.tech_.trigger({type:"usage",name:"vhs-"+e+"-download-exclusion"})
"subtitle"!==e&&t.blacklistCurrentPlaylist({message:"Excessive "+e+" segment downloading detected."},1/0)}}}
t.checkCurrentTime_=function(){if(!this.tech_.paused()&&!this.tech_.seeking()){var e=this.tech_.currentTime(),t=this.tech_.buffered()
if(this.lastRecordedTime===e&&(!t.length||e+Ql>=t.end(t.length-1)))return this.techWaiting_()
if(this.consecutiveUpdates>=5&&e===this.lastRecordedTime){this.consecutiveUpdates++
this.waiting_()}else if(e===this.lastRecordedTime)this.consecutiveUpdates++
else{this.consecutiveUpdates=0
this.lastRecordedTime=e}}}
t.cancelTimer_=function(){this.consecutiveUpdates=0
if(this.timer_){this.logger_("cancelTimer_")
clearTimeout(this.timer_)}this.timer_=null}
t.fixesBadSeeks_=function(){if(!this.tech_.seeking())return!1
var e,t=this.seekable(),i=this.tech_.currentTime()
if(this.afterSeekableWindow_(t,i,this.media(),this.allowSeeksWithinUnsafeLiveWindow)){e=t.end(t.length-1)}if(this.beforeSeekableWindow_(t,i)){var n=t.start(0)
e=n+(n===t.end(0)?0:Ql)}if(void 0!==e){this.logger_("Trying to seek outside of seekable at time "+i+" with seekable range "+ec(t)+". Seeking to "+e+".")
this.tech_.setCurrentTime(e)
return!0}for(var r=this.masterPlaylistController_.sourceUpdater_,a=this.tech_.buffered(),s=r.audioBuffer?r.audioBuffered():null,o=r.videoBuffer?r.videoBuffered():null,u=this.media(),l=u.partTargetDuration?u.partTargetDuration:2*(u.targetDuration-Yl),c=[s,o],d=0;d<c.length;d++)if(c[d]){if(nc(c[d],i)<l)return!1}var h=Zl(a,i)
if(0===h.length)return!1
e=h.start(0)+Ql
this.logger_("Buffered region starts ("+h.start(0)+")  just beyond seek point ("+i+"). Seeking to "+e+".")
this.tech_.setCurrentTime(e)
return!0}
t.waiting_=function(){if(!this.techWaiting_()){var e=this.tech_.currentTime(),t=this.tech_.buffered(),i=Jl(t,e)
if(i.length&&e+3<=i.end(0)){this.cancelTimer_()
this.tech_.setCurrentTime(e)
this.logger_("Stopped at "+e+" while inside a buffered region ["+i.start(0)+" -> "+i.end(0)+"]. Attempting to resume playback by seeking to the current time.")
this.tech_.trigger({type:"usage",name:"vhs-unknown-waiting"})
this.tech_.trigger({type:"usage",name:"hls-unknown-waiting"})}else;}}
t.techWaiting_=function(){var e=this.seekable(),t=this.tech_.currentTime()
if(this.tech_.seeking()||null!==this.timer_)return!0
if(this.beforeSeekableWindow_(e,t)){var i=e.end(e.length-1)
this.logger_("Fell out of live window at time "+t+". Seeking to live point (seekable end) "+i)
this.cancelTimer_()
this.tech_.setCurrentTime(i)
this.tech_.trigger({type:"usage",name:"vhs-live-resync"})
this.tech_.trigger({type:"usage",name:"hls-live-resync"})
return!0}var n=this.tech_.vhs.masterPlaylistController_.sourceUpdater_,r=this.tech_.buffered()
if(this.videoUnderflow_({audioBuffered:n.audioBuffered(),videoBuffered:n.videoBuffered(),currentTime:t})){this.cancelTimer_()
this.tech_.setCurrentTime(t)
this.tech_.trigger({type:"usage",name:"vhs-video-underflow"})
this.tech_.trigger({type:"usage",name:"hls-video-underflow"})
return!0}var a=Zl(r,t)
if(a.length>0){var s=a.start(0)-t
this.logger_("Stopped at "+t+", setting timer for "+s+", seeking to "+a.start(0))
this.cancelTimer_()
this.timer_=setTimeout(this.skipTheGap_.bind(this),1e3*s,t)
return!0}return!1}
t.afterSeekableWindow_=function(e,t,i,n){void 0===n&&(n=!1)
if(!e.length)return!1
var r=e.end(e.length-1)+Ql
!i.endList&&n&&(r=e.end(e.length-1)+3*i.targetDuration)
return t>r}
t.beforeSeekableWindow_=function(e,t){return!!(e.length&&e.start(0)>0&&t<e.start(0)-this.liveRangeSafeTimeDelta)}
t.videoUnderflow_=function(e){var t=e.videoBuffered,i=e.audioBuffered,n=e.currentTime
if(t){var r
if(t.length&&i.length){var a=Jl(t,n-3),s=Jl(t,n),o=Jl(i,n)
o.length&&!s.length&&a.length&&(r={start:a.end(0),end:o.end(0)})}else{Zl(t,n).length||(r=this.gapFromVideoUnderflow_(t,n))}if(r){this.logger_("Encountered a gap in video from "+r.start+" to "+r.end+". Seeking to current time "+n)
return!0}return!1}}
t.skipTheGap_=function(e){var t=this.tech_.buffered(),i=this.tech_.currentTime(),n=Zl(t,i)
this.cancelTimer_()
if(0!==n.length&&i===e){this.logger_("skipTheGap_:","currentTime:",i,"scheduled currentTime:",e,"nextRange start:",n.start(0))
this.tech_.setCurrentTime(n.start(0)+Yl)
this.tech_.trigger({type:"usage",name:"vhs-gap-skip"})
this.tech_.trigger({type:"usage",name:"hls-gap-skip"})}}
t.gapFromVideoUnderflow_=function(e,t){for(var i=function(e){if(e.length<2)return ql.createTimeRanges()
for(var t=[],i=1;i<e.length;i++){var n=e.end(i-1),r=e.start(i)
t.push([n,r])}return ql.createTimeRanges(t)}(e),n=0;n<i.length;n++){var r=i.start(n),a=i.end(n)
if(t-r<4&&t-r>2)return{start:r,end:a}}return null}
return e}(),Kh={errorInterval:30,getSource:function(e){return e(this.tech({IWillNotUseThisInPlugins:!0}).currentSource_||this.currentSource())}},Xh=function e(t,i){var n=0,r=0,a=ql.mergeOptions(Kh,i)
t.ready((function(){t.trigger({type:"usage",name:"vhs-error-reload-initialized"})
t.trigger({type:"usage",name:"hls-error-reload-initialized"})}))
var s=function(){r&&t.currentTime(r)},o=function(e){if(null!=e){r=t.duration()!==1/0&&t.currentTime()||0
t.one("loadedmetadata",s)
t.src(e)
t.trigger({type:"usage",name:"vhs-error-reload"})
t.trigger({type:"usage",name:"hls-error-reload"})
t.play()}},u=function(){if(Date.now()-n<1e3*a.errorInterval){t.trigger({type:"usage",name:"vhs-error-reload-canceled"})
t.trigger({type:"usage",name:"hls-error-reload-canceled"})}else{if(a.getSource&&"function"==typeof a.getSource){n=Date.now()
return a.getSource.call(t,o)}ql.log.error("ERROR: reloadSourceOnError - The option getSource must be a function!")}},l=function e(){t.off("loadedmetadata",s)
t.off("error",u)
t.off("dispose",e)}
t.on("error",u)
t.on("dispose",l)
t.reloadSourceOnError=function(i){l()
e(t,i)}},Yh="2.14.0",Qh={PlaylistLoader:Nc,Playlist:Sc,utils:Yc,STANDARD_PLAYLIST_SELECTOR:Gd,INITIAL_PLAYLIST_SELECTOR:function(){var e=this,t=this.playlists.master.playlists.filter(Sc.isEnabled)
Hd(t,(function(e,t){return qd(e,t)}))
return t.filter((function(t){return!!Bd(e.playlists.master,t).video}))[0]||null},lastBandwidthSelector:Gd,movingAverageBandwidthSelector:function(e){var t=-1,i=-1
if(e<0||e>1)throw new Error("Moving average bandwidth decay must be between 0 and 1.")
return function(){var n=this.useDevicePixelRatio&&x.devicePixelRatio||1
if(t<0){t=this.systemBandwidth
i=this.systemBandwidth}if(this.systemBandwidth>0&&this.systemBandwidth!==i){t=e*this.systemBandwidth+(1-e)*t
i=this.systemBandwidth}return Wd(this.playlists.master,t,parseInt(Vd(this.tech_.el(),"width"),10)*n,parseInt(Vd(this.tech_.el(),"height"),10)*n,this.limitRenditionByPlayerDimensions,this.masterPlaylistController_)}},comparePlaylistBandwidth:qd,comparePlaylistResolution:function(e,t){var i,n
e.attributes.RESOLUTION&&e.attributes.RESOLUTION.width&&(i=e.attributes.RESOLUTION.width)
i=i||x.Number.MAX_VALUE
t.attributes.RESOLUTION&&t.attributes.RESOLUTION.width&&(n=t.attributes.RESOLUTION.width)
return i===(n=n||x.Number.MAX_VALUE)&&e.attributes.BANDWIDTH&&t.attributes.BANDWIDTH?e.attributes.BANDWIDTH-t.attributes.BANDWIDTH:i-n},xhr:jc()}
Object.keys(ad).forEach((function(e){Object.defineProperty(Qh,e,{get:function(){ql.log.warn("using Vhs."+e+" is UNSAFE be sure you know what you are doing")
return ad[e]},set:function(t){ql.log.warn("using Vhs."+e+" is UNSAFE be sure you know what you are doing")
"number"!=typeof t||t<0?ql.log.warn("value of Vhs."+e+" must be greater than or equal to 0"):ad[e]=t}})}))
var $h="videojs-vhs",Jh=function(e,t){for(var i=t.media(),n=-1,r=0;r<e.length;r++)if(e[r].id===i.id){n=r
break}e.selectedIndex_=n
e.trigger({selectedIndex:n,type:"change"})}
Qh.canPlaySource=function(){return ql.log.warn("HLS is no longer a tech. Please remove it from your player's techOrder.")}
var Zh=function(e){var t=e.player,i=e.sourceKeySystems,n=e.audioMedia,r=e.mainPlaylists
if(!t.eme.initializeMediaKeys)return Promise.resolve()
var a=function(e,t){return e.reduce((function(e,i){if(!i.contentProtection)return e
var n=t.reduce((function(e,t){var n=i.contentProtection[t]
n&&n.pssh&&(e[t]={pssh:n.pssh})
return e}),{})
Object.keys(n).length&&e.push(n)
return e}),[])}(n?r.concat([n]):r,Object.keys(i)),s=[],o=[]
a.forEach((function(e){o.push(new Promise((function(e,i){t.tech_.one("keysessioncreated",e)})))
s.push(new Promise((function(i,n){t.eme.initializeMediaKeys({keySystems:e},(function(e){e?n(e):i()}))})))}))
return Promise.race([Promise.all(s),Promise.race(o)])},ep=function(e){var t=e.player,i=function(e,t,i){if(!e)return e
var n={}
t&&t.attributes&&t.attributes.CODECS&&(n=Nd(Ge(t.attributes.CODECS)))
i&&i.attributes&&i.attributes.CODECS&&(n.audio=i.attributes.CODECS)
var r=Ke(n.video),a=Ke(n.audio),s={}
for(var o in e){s[o]={}
a&&(s[o].audioContentType=a)
r&&(s[o].videoContentType=r)
t.contentProtection&&t.contentProtection[o]&&t.contentProtection[o].pssh&&(s[o].pssh=t.contentProtection[o].pssh)
"string"==typeof e[o]&&(s[o].url=e[o])}return ql.mergeOptions(e,s)}(e.sourceKeySystems,e.media,e.audioMedia)
if(!i)return!1
t.currentSource().keySystems=i
if(i&&!t.eme){ql.log.warn("DRM encrypted source cannot be decrypted without a DRM plugin")
return!1}return!0},tp=function(){if(!x.localStorage)return null
var e=x.localStorage.getItem($h)
if(!e)return null
try{return JSON.parse(e)}catch(e){return null}}
Qh.supportsNativeHls=function(){if(!L||!L.createElement)return!1
var e=L.createElement("video")
if(!ql.getTech("Html5").isSupported())return!1
return["application/vnd.apple.mpegurl","audio/mpegurl","audio/x-mpegurl","application/x-mpegurl","video/x-mpegurl","video/mpegurl","application/mpegurl"].some((function(t){return/maybe|probably/i.test(e.canPlayType(t))}))}()
Qh.supportsNativeDash=!!(L&&L.createElement&&ql.getTech("Html5").isSupported())&&/maybe|probably/i.test(L.createElement("video").canPlayType("application/dash+xml"))
Qh.supportsTypeNatively=function(e){return"hls"===e?Qh.supportsNativeHls:"dash"===e&&Qh.supportsNativeDash}
Qh.isSupported=function(){return ql.log.warn("HLS is no longer a tech. Please remove it from your player's techOrder.")}
var ip=function(e){B(t,e)
function t(t,i,n){var r
r=e.call(this,i,ql.mergeOptions(n.hls,n.vhs))||this
n.hls&&Object.keys(n.hls).length&&ql.log.warn("Using hls options is deprecated. Please rename `hls` to `vhs` in your options object.")
"number"==typeof n.initialBandwidth&&(r.options_.bandwidth=n.initialBandwidth)
r.logger_=Xl("VhsHandler")
if(i.options_&&i.options_.playerId){var a=ql(i.options_.playerId)
a.hasOwnProperty("hls")||Object.defineProperty(a,"hls",{get:function(){ql.log.warn("player.hls is deprecated. Use player.tech().vhs instead.")
i.trigger({type:"usage",name:"hls-player-access"})
return N(r)},configurable:!0})
a.hasOwnProperty("vhs")||Object.defineProperty(a,"vhs",{get:function(){ql.log.warn("player.vhs is deprecated. Use player.tech().vhs instead.")
i.trigger({type:"usage",name:"vhs-player-access"})
return N(r)},configurable:!0})
a.hasOwnProperty("dash")||Object.defineProperty(a,"dash",{get:function(){ql.log.warn("player.dash is deprecated. Use player.tech().vhs instead.")
return N(r)},configurable:!0})
r.player_=a}r.tech_=i
r.source_=t
r.stats={}
r.ignoreNextSeekingEvent_=!1
r.setOptions_()
if(r.options_.overrideNative&&i.overrideNativeAudioTracks&&i.overrideNativeVideoTracks){i.overrideNativeAudioTracks(!0)
i.overrideNativeVideoTracks(!0)}else if(r.options_.overrideNative&&(i.featuresNativeVideoTracks||i.featuresNativeAudioTracks))throw new Error("Overriding native HLS requires emulated tracks. See https://git.io/vMpjB")
r.on(L,["fullscreenchange","webkitfullscreenchange","mozfullscreenchange","MSFullscreenChange"],(function(e){var t=L.fullscreenElement||L.webkitFullscreenElement||L.mozFullScreenElement||L.msFullscreenElement
t&&t.contains(r.tech_.el())?r.masterPlaylistController_.fastQualityChange_():r.masterPlaylistController_.checkABR_()}))
r.on(r.tech_,"seeking",(function(){this.ignoreNextSeekingEvent_?this.ignoreNextSeekingEvent_=!1:this.setCurrentTime(this.tech_.currentTime())}))
r.on(r.tech_,"error",(function(){this.tech_.error()&&this.masterPlaylistController_&&this.masterPlaylistController_.pauseLoading()}))
r.on(r.tech_,"play",r.play)
return r}var i=t.prototype
i.setOptions_=function(){var e=this
this.options_.withCredentials=this.options_.withCredentials||!1
this.options_.handleManifestRedirects=!1!==this.options_.handleManifestRedirects
this.options_.limitRenditionByPlayerDimensions=!1!==this.options_.limitRenditionByPlayerDimensions
this.options_.useDevicePixelRatio=this.options_.useDevicePixelRatio||!1
this.options_.smoothQualityChange=this.options_.smoothQualityChange||!1
this.options_.useBandwidthFromLocalStorage=void 0!==this.source_.useBandwidthFromLocalStorage?this.source_.useBandwidthFromLocalStorage:this.options_.useBandwidthFromLocalStorage||!1
this.options_.useNetworkInformationApi=this.options_.useNetworkInformationApi||!1
this.options_.useDtsForTimestampOffset=this.options_.useDtsForTimestampOffset||!1
this.options_.customTagParsers=this.options_.customTagParsers||[]
this.options_.customTagMappers=this.options_.customTagMappers||[]
this.options_.cacheEncryptionKeys=this.options_.cacheEncryptionKeys||!1
"number"!=typeof this.options_.blacklistDuration&&(this.options_.blacklistDuration=300)
if("number"!=typeof this.options_.bandwidth&&this.options_.useBandwidthFromLocalStorage){var t=tp()
if(t&&t.bandwidth){this.options_.bandwidth=t.bandwidth
this.tech_.trigger({type:"usage",name:"vhs-bandwidth-from-local-storage"})
this.tech_.trigger({type:"usage",name:"hls-bandwidth-from-local-storage"})}if(t&&t.throughput){this.options_.throughput=t.throughput
this.tech_.trigger({type:"usage",name:"vhs-throughput-from-local-storage"})
this.tech_.trigger({type:"usage",name:"hls-throughput-from-local-storage"})}}"number"!=typeof this.options_.bandwidth&&(this.options_.bandwidth=ad.INITIAL_BANDWIDTH)
this.options_.enableLowInitialPlaylist=this.options_.enableLowInitialPlaylist&&this.options_.bandwidth===ad.INITIAL_BANDWIDTH;["withCredentials","useDevicePixelRatio","limitRenditionByPlayerDimensions","bandwidth","smoothQualityChange","customTagParsers","customTagMappers","handleManifestRedirects","cacheEncryptionKeys","playlistSelector","initialPlaylistSelector","experimentalBufferBasedABR","liveRangeSafeTimeDelta","experimentalLLHLS","useNetworkInformationApi","useDtsForTimestampOffset","experimentalExactManifestTimings","experimentalLeastPixelDiffSelector"].forEach((function(t){void 0!==e.source_[t]&&(e.options_[t]=e.source_[t])}))
this.limitRenditionByPlayerDimensions=this.options_.limitRenditionByPlayerDimensions
this.useDevicePixelRatio=this.options_.useDevicePixelRatio}
i.src=function(e,t){var i=this
if(e){this.setOptions_()
this.options_.src=0===(n=this.source_.src).toLowerCase().indexOf("data:application/vnd.videojs.vhs+json,")?JSON.parse(n.substring(n.indexOf(",")+1)):n
var n
this.options_.tech=this.tech_
this.options_.externVhs=Qh
this.options_.sourceType=Ze(t)
this.options_.seekTo=function(e){i.tech_.setCurrentTime(e)}
this.options_.smoothQualityChange&&ql.log.warn("smoothQualityChange is deprecated and will be removed in the next major version")
this.masterPlaylistController_=new qh(this.options_)
var r=ql.mergeOptions({liveRangeSafeTimeDelta:Ql},this.options_,{seekable:function(){return i.seekable()},media:function(){return i.masterPlaylistController_.media()},masterPlaylistController:this.masterPlaylistController_})
this.playbackWatcher_=new zh(r)
this.masterPlaylistController_.on("error",(function(){var e=ql.players[i.tech_.options_.playerId],t=i.masterPlaylistController_.error
"object"!=typeof t||t.code?"string"==typeof t&&(t={message:t,code:3}):t.code=3
e.error(t)}))
var a=this.options_.experimentalBufferBasedABR?Qh.movingAverageBandwidthSelector(.55):Qh.STANDARD_PLAYLIST_SELECTOR
this.masterPlaylistController_.selectPlaylist=this.selectPlaylist?this.selectPlaylist.bind(this):a.bind(this)
this.masterPlaylistController_.selectInitialPlaylist=Qh.INITIAL_PLAYLIST_SELECTOR.bind(this)
this.playlists=this.masterPlaylistController_.masterPlaylistLoader_
this.mediaSource=this.masterPlaylistController_.mediaSource
Object.defineProperties(this,{selectPlaylist:{get:function(){return this.masterPlaylistController_.selectPlaylist},set:function(e){this.masterPlaylistController_.selectPlaylist=e.bind(this)}},throughput:{get:function(){return this.masterPlaylistController_.mainSegmentLoader_.throughput.rate},set:function(e){this.masterPlaylistController_.mainSegmentLoader_.throughput.rate=e
this.masterPlaylistController_.mainSegmentLoader_.throughput.count=1}},bandwidth:{get:function(){var e=this.masterPlaylistController_.mainSegmentLoader_.bandwidth,t=x.navigator.connection||x.navigator.mozConnection||x.navigator.webkitConnection,i=1e7
if(this.options_.useNetworkInformationApi&&t){var n=1e3*t.downlink*1e3
e=n>=i&&e>=i?Math.max(e,n):n}return e},set:function(e){this.masterPlaylistController_.mainSegmentLoader_.bandwidth=e
this.masterPlaylistController_.mainSegmentLoader_.throughput={rate:0,count:0}}},systemBandwidth:{get:function(){var e,t=1/(this.bandwidth||1)
e=this.throughput>0?1/this.throughput:0
return Math.floor(1/(t+e))},set:function(){ql.log.error('The "systemBandwidth" property is read-only')}}})
this.options_.bandwidth&&(this.bandwidth=this.options_.bandwidth)
this.options_.throughput&&(this.throughput=this.options_.throughput)
Object.defineProperties(this.stats,{bandwidth:{get:function(){return i.bandwidth||0},enumerable:!0},mediaRequests:{get:function(){return i.masterPlaylistController_.mediaRequests_()||0},enumerable:!0},mediaRequestsAborted:{get:function(){return i.masterPlaylistController_.mediaRequestsAborted_()||0},enumerable:!0},mediaRequestsTimedout:{get:function(){return i.masterPlaylistController_.mediaRequestsTimedout_()||0},enumerable:!0},mediaRequestsErrored:{get:function(){return i.masterPlaylistController_.mediaRequestsErrored_()||0},enumerable:!0},mediaTransferDuration:{get:function(){return i.masterPlaylistController_.mediaTransferDuration_()||0},enumerable:!0},mediaBytesTransferred:{get:function(){return i.masterPlaylistController_.mediaBytesTransferred_()||0},enumerable:!0},mediaSecondsLoaded:{get:function(){return i.masterPlaylistController_.mediaSecondsLoaded_()||0},enumerable:!0},mediaAppends:{get:function(){return i.masterPlaylistController_.mediaAppends_()||0},enumerable:!0},mainAppendsToLoadedData:{get:function(){return i.masterPlaylistController_.mainAppendsToLoadedData_()||0},enumerable:!0},audioAppendsToLoadedData:{get:function(){return i.masterPlaylistController_.audioAppendsToLoadedData_()||0},enumerable:!0},appendsToLoadedData:{get:function(){return i.masterPlaylistController_.appendsToLoadedData_()||0},enumerable:!0},timeToLoadedData:{get:function(){return i.masterPlaylistController_.timeToLoadedData_()||0},enumerable:!0},buffered:{get:function(){return tc(i.tech_.buffered())},enumerable:!0},currentTime:{get:function(){return i.tech_.currentTime()},enumerable:!0},currentSource:{get:function(){return i.tech_.currentSource_},enumerable:!0},currentTech:{get:function(){return i.tech_.name_},enumerable:!0},duration:{get:function(){return i.tech_.duration()},enumerable:!0},master:{get:function(){return i.playlists.master},enumerable:!0},playerDimensions:{get:function(){return i.tech_.currentDimensions()},enumerable:!0},seekable:{get:function(){return tc(i.tech_.seekable())},enumerable:!0},timestamp:{get:function(){return Date.now()},enumerable:!0},videoPlaybackQuality:{get:function(){return i.tech_.getVideoPlaybackQuality()},enumerable:!0}})
this.tech_.one("canplay",this.masterPlaylistController_.setupFirstPlay.bind(this.masterPlaylistController_))
this.tech_.on("bandwidthupdate",(function(){i.options_.useBandwidthFromLocalStorage&&function(e){if(!x.localStorage)return!1
var t=tp()
t=t?ql.mergeOptions(t,e):e
try{x.localStorage.setItem($h,JSON.stringify(t))}catch(e){return!1}}({bandwidth:i.bandwidth,throughput:Math.round(i.throughput)})}))
this.masterPlaylistController_.on("selectedinitialmedia",(function(){(e=i).representations=function(){var t=e.masterPlaylistController_.master(),i=Tc(t)?e.masterPlaylistController_.getAudioTrackPlaylists_():t.playlists
return i?i.filter((function(e){return!mc(e)})).map((function(t,i){return new Wh(e,t,t.id)})):[]}
var e}))
this.masterPlaylistController_.sourceUpdater_.on("createdsourcebuffers",(function(){i.setupEme_()}))
this.on(this.masterPlaylistController_,"progress",(function(){this.tech_.trigger("progress")}))
this.on(this.masterPlaylistController_,"firstplay",(function(){this.ignoreNextSeekingEvent_=!0}))
this.setupQualityLevels_()
if(this.tech_.el()){this.mediaSourceUrl_=x.URL.createObjectURL(this.masterPlaylistController_.mediaSource)
this.tech_.src(this.mediaSourceUrl_)}}}
i.createKeySessions_=function(){var e=this,t=this.masterPlaylistController_.mediaTypes_.AUDIO.activePlaylistLoader
this.logger_("waiting for EME key session creation")
Zh({player:this.player_,sourceKeySystems:this.source_.keySystems,audioMedia:t&&t.media(),mainPlaylists:this.playlists.master.playlists}).then((function(){e.logger_("created EME key session")
e.masterPlaylistController_.sourceUpdater_.initializedEme()})).catch((function(t){e.logger_("error while creating EME key session",t)
e.player_.error({message:"Failed to initialize media keys for EME",code:3})}))}
i.handleWaitingForKey_=function(){this.logger_("waitingforkey fired, attempting to create any new key sessions")
this.createKeySessions_()}
i.setupEme_=function(){var e=this,t=this.masterPlaylistController_.mediaTypes_.AUDIO.activePlaylistLoader,i=ep({player:this.player_,sourceKeySystems:this.source_.keySystems,media:this.playlists.media(),audioMedia:t&&t.media()})
this.player_.tech_.on("keystatuschange",(function(t){"output-restricted"===t.status&&e.masterPlaylistController_.blacklistCurrentPlaylist({playlist:e.masterPlaylistController_.media(),message:"DRM keystatus changed to "+t.status+". Playlist will fail to play. Check for HDCP content.",blacklistDuration:1/0})}))
this.handleWaitingForKey_=this.handleWaitingForKey_.bind(this)
this.player_.tech_.on("waitingforkey",this.handleWaitingForKey_)
11!==ql.browser.IE_VERSION&&i?this.createKeySessions_():this.masterPlaylistController_.sourceUpdater_.initializedEme()}
i.setupQualityLevels_=function(){var e=this,t=ql.players[this.tech_.options_.playerId]
if(t&&t.qualityLevels&&!this.qualityLevels_){this.qualityLevels_=t.qualityLevels()
this.masterPlaylistController_.on("selectedinitialmedia",(function(){!function(e,t){t.representations().forEach((function(t){e.addQualityLevel(t)}))
Jh(e,t.playlists)}(e.qualityLevels_,e)}))
this.playlists.on("mediachange",(function(){Jh(e.qualityLevels_,e.playlists)}))}}
t.version=function(){return{"@videojs/http-streaming":Yh,"mux.js":"6.0.1","mpd-parser":"0.21.0","m3u8-parser":"4.7.0","aes-decrypter":"3.1.2"}}
i.version=function(){return this.constructor.version()}
i.canChangeType=function(){return Sh.canChangeType()}
i.play=function(){this.masterPlaylistController_.play()}
i.setCurrentTime=function(e){this.masterPlaylistController_.setCurrentTime(e)}
i.duration=function(){return this.masterPlaylistController_.duration()}
i.seekable=function(){return this.masterPlaylistController_.seekable()}
i.dispose=function(){this.playbackWatcher_&&this.playbackWatcher_.dispose()
this.masterPlaylistController_&&this.masterPlaylistController_.dispose()
this.qualityLevels_&&this.qualityLevels_.dispose()
if(this.player_){delete this.player_.vhs
delete this.player_.dash
delete this.player_.hls}this.tech_&&this.tech_.vhs&&delete this.tech_.vhs
this.tech_&&delete this.tech_.hls
if(this.mediaSourceUrl_&&x.URL.revokeObjectURL){x.URL.revokeObjectURL(this.mediaSourceUrl_)
this.mediaSourceUrl_=null}this.tech_&&this.tech_.off("waitingforkey",this.handleWaitingForKey_)
e.prototype.dispose.call(this)}
i.convertToProgramTime=function(e,t){return Qc({playlist:this.masterPlaylistController_.media(),time:e,callback:t})}
i.seekToProgramTime=function(e,t,i,n){void 0===i&&(i=!0)
void 0===n&&(n=2)
return $c({programTime:e,playlist:this.masterPlaylistController_.media(),retryCount:n,pauseAfterSeek:i,seekTo:this.options_.seekTo,tech:this.options_.tech,callback:t})}
return t}(ql.getComponent("Component")),np={name:"videojs-http-streaming",VERSION:Yh,canHandleSource:function(e,t){void 0===t&&(t={})
var i=ql.mergeOptions(ql.options,t)
return np.canPlayType(e.type,i)},handleSource:function(e,t,i){void 0===i&&(i={})
var n=ql.mergeOptions(ql.options,i)
t.vhs=new ip(e,t,n)
ql.hasOwnProperty("hls")||Object.defineProperty(t,"hls",{get:function(){ql.log.warn("player.tech().hls is deprecated. Use player.tech().vhs instead.")
return t.vhs},configurable:!0})
t.vhs.xhr=jc()
t.vhs.src(e.src,e.type)
return t.vhs},canPlayType:function(e,t){void 0===t&&(t={})
var i=ql.mergeOptions(ql.options,t),n=i.vhs,r=(n=void 0===n?{}:n).overrideNative,a=void 0===r?!ql.browser.IS_ANY_SAFARI:r,s=i.hls,o=(s=void 0===s?{}:s).overrideNative,u=void 0!==o&&o,l=Ze(e)
return l&&(!Qh.supportsTypeNatively(l)||u||a)?"maybe":""}}
Xe("avc1.4d400d,mp4a.40.2")&&ql.getTech("Html5").registerSourceHandler(np,0)
ql.VhsHandler=ip
Object.defineProperty(ql,"HlsHandler",{get:function(){ql.log.warn("videojs.HlsHandler is deprecated. Use videojs.VhsHandler instead.")
return ip},configurable:!0})
ql.VhsSourceHandler=np
Object.defineProperty(ql,"HlsSourceHandler",{get:function(){ql.log.warn("videojs.HlsSourceHandler is deprecated. Use videojs.VhsSourceHandler instead.")
return np},configurable:!0})
ql.Vhs=Qh
Object.defineProperty(ql,"Hls",{get:function(){ql.log.warn("videojs.Hls is deprecated. Use videojs.Vhs instead.")
return Qh},configurable:!0})
if(!ql.use){ql.registerComponent("Hls",Qh)
ql.registerComponent("Vhs",Qh)}ql.options.vhs=ql.options.vhs||{}
ql.options.hls=ql.options.hls||{}
if(!ql.getPlugin||!ql.getPlugin("reloadSourceOnError")){(ql.registerPlugin||ql.plugin)("reloadSourceOnError",(function(e){Xh(this,e)}))}
/*! @name videojs-contrib-quality-levels @version 2.1.0 @license Apache-2.0 */function rp(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}var ap=function e(t){var i=this
if(ql.browser.IS_IE8){i=L.createElement("custom")
for(var n in e.prototype)"constructor"!==n&&(i[n]=e.prototype[n])}i.id=t.id
i.label=i.id
i.width=t.width
i.height=t.height
i.bitrate=t.bandwidth
i.enabled_=t.enabled
Object.defineProperty(i,"enabled",{get:function(){return i.enabled_()},set:function(e){i.enabled_(e)}})
return i},sp=function(e){!function(e,t){e.prototype=Object.create(t.prototype)
e.prototype.constructor=e
e.__proto__=t}(t,e)
function t(){var i,n=rp(rp(i=e.call(this)||this))
if(ql.browser.IS_IE8){n=L.createElement("custom")
for(var r in t.prototype)"constructor"!==r&&(n[r]=t.prototype[r])}n.levels_=[]
n.selectedIndex_=-1
Object.defineProperty(n,"selectedIndex",{get:function(){return n.selectedIndex_}})
Object.defineProperty(n,"length",{get:function(){return n.levels_.length}})
return n||rp(i)}var i=t.prototype
i.addQualityLevel=function(e){var t=this.getQualityLevelById(e.id)
if(t)return t
var i=this.levels_.length
t=new ap(e)
""+i in this||Object.defineProperty(this,i,{get:function(){return this.levels_[i]}})
this.levels_.push(t)
this.trigger({qualityLevel:t,type:"addqualitylevel"})
return t}
i.removeQualityLevel=function(e){for(var t=null,i=0,n=this.length;i<n;i++)if(this[i]===e){t=this.levels_.splice(i,1)[0]
this.selectedIndex_===i?this.selectedIndex_=-1:this.selectedIndex_>i&&this.selectedIndex_--
break}t&&this.trigger({qualityLevel:e,type:"removequalitylevel"})
return t}
i.getQualityLevelById=function(e){for(var t=0,i=this.length;t<i;t++){var n=this[t]
if(n.id===e)return n}return null}
i.dispose=function(){this.selectedIndex_=-1
this.levels_.length=0}
return t}(ql.EventTarget)
sp.prototype.allowedEvents_={change:"change",addqualitylevel:"addqualitylevel",removequalitylevel:"removequalitylevel"}
for(var op in sp.prototype.allowedEvents_)sp.prototype["on"+op]=null
var up="2.1.0",lp=ql.registerPlugin||ql.plugin,cp=function(e){return function(e){var t=e.qualityLevels,i=new sp
e.on("dispose",(function n(){i.dispose()
e.qualityLevels=t
e.off("dispose",n)}))
e.qualityLevels=function(){return i}
e.qualityLevels.VERSION=up
return i}(this,ql.mergeOptions({},e))}
lp("qualityLevels",cp)
cp.VERSION=up
var dp=ql.getComponent("Component"),hp=ql.dom,pp=function(e){d(i,e)
var t=g(i)
function i(e){var n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=r.checked,s=void 0!==a&&a,u=r.readonly,l=void 0!==u&&u
o(this,i);(n=t.apply(this,arguments))._player=e
n._isReadonly=l
n._isReadonly||n.on(["tap","click"],n._onClick)
s&&n.check()
return n}l(i,[{key:"createEl",value:function(){var e=hp.createEl("div",{className:"vjs-toggle"})
this._toggleSwitch=hp.createEl("div",{className:"vjs-toggle-input vjs-toggle-switch"})
e.appendChild(this._toggleSwitch)
return e}},{key:"check",value:function(){this._toggleSwitch.setAttribute("data-toggled",!0)
this._toggleSwitch.classList.add("vjs-toggle-switch--toggled")
this._isChecked=!0
this.trigger("check")}},{key:"uncheck",value:function(){this._toggleSwitch.removeAttribute("data-toggled")
this._toggleSwitch.classList.remove("vjs-toggle-switch--toggled")
this._isChecked=!1
this.trigger("uncheck")}},{key:"_onClick",value:function(){this._isChecked?this.uncheck():this.check()}}])
return i}(dp)
ql.registerComponent("Toggle",pp)
ql.getComponent("Menu").prototype.handleBlur=function(e){var t=e.relatedTarget||document.activeElement
if(t===this.contentEl()&&e.target)e.target.focus()
else if(!this.children().some((function(e){return e.el()===t}))){var i=this.menuButton_
i&&i.buttonPressed_&&t!==i.el().firstChild&&i.unpressButton()}}
function fp(e,t){if(!t)throw new Error("Assertion Failed: ".concat(e))}function mp(e,t){t||console.warn(e)}function gp(e){return(e instanceof window.HTMLAnchorElement||e instanceof window.HTMLAreaElement)&&e.hasAttribute("href")||(e instanceof window.HTMLInputElement||e instanceof window.HTMLSelectElement||e instanceof window.HTMLTextAreaElement||e instanceof window.HTMLButtonElement)&&!e.hasAttribute("disabled")||e instanceof window.HTMLIFrameElement||e instanceof window.HTMLObjectElement||e instanceof window.HTMLEmbedElement||e.hasAttribute("tabindex")&&-1!==e.getAttribute("tabindex")||e.hasAttribute("contenteditable")}var vp=ql.getComponent("Player")
function yp(e){var t=e.split(":")
return"vjs-".concat(t[0],"-").concat(t[1])}var _p=["auto","16:9","4:3","1:1","4:5"],bp=function(e){d(i,e)
var t=g(i)
function i(e,n){var r
o(this,i);(r=t.call(this,e,n))._focusableControls=r._getFocusableControls()
r._focusableControls.forEach((function(e){r.on(e,"keydown",r._handleKeydown)}))
return r}l(i,[{key:"_handleKeydown",value:function(e){!this.isFullscreen()||"Tab"!==e.key&&9!==e.keyCode||this._trapFullscreenTap(e)}},{key:"_trapFullscreenTap",value:function(e){if(k){var t,i=this._focusableControls.indexOf(e.target)
e.shiftKey?0===i&&(t=this._focusableControls.length-1):i===this._focusableControls.length-1&&(t=0)
if(void 0!==t){this._focusableControls[t].focus()
e.preventDefault()}}}},{key:"_getFocusableControls",value:function(){var e=this.controlBar.children(),t=[]
e.forEach((function(e){var i=e.el()
if(gp(i))t.push(i)
else if(i.children){var n=Array.from(i.children).find((function(e){return gp(e)}))
n&&t.push(n)}}))
return t}},{key:"aspectRatio",value:function(e){if(void 0===e)return this.aspectRatio_
fp("media-player: Aspect ratio ".concat(e," is not supported"),_p.indexOf(e)>-1)
this.aspectRatio_&&"auto"!==this.aspectRatio_&&this.removeClass(yp(this.aspectRatio_))
"auto"!==e&&this.addClass(yp(e))
this.aspectRatio_=e
return e}},{key:"resetPlaybackRate_",value:function(){var e=this.playbackRate()
this.playbackRate(e)}},{key:"reset",value:function(){var e=this
this._isResetting=!0
var t=this.volume(),n=this.muted(),r=this.playbackRate()
this.one("playerreset",(function(){e.volume(t)
e.muted(n)
e.defaultPlaybackRate(r)
e._isResetting=!1}))
v(h(i.prototype),"reset",this).call(this)}},{key:"isResetting",value:function(){return this._isResetting||!1}}])
return i}(vp)
ql.registerComponent("Player",bp)
var Tp=ql.getComponent("Component"),Sp=ql.dom,kp=function(e){d(i,e)
var t=g(i)
function i(e){var n
o(this,i);(n=t.apply(this,arguments))._isShowing=!0
n.addClass("vjs-custom-captions-display")
n.hide()
n._hasPlayed=!1
n._showOnPlayed=!1
n.on(e,"playerreset",n._onPlayerReset)
n.on(e,"playing",n._onPlaying)
return n}l(i,[{key:"contentEl",value:function(){return this._cue}},{key:"hide",value:function(){if(this._isShowing){v(h(i.prototype),"hide",this).call(this)
this._showOnPlayed=!1
this._isShowing=!1
this.trigger("hide")}}},{key:"show",value:function(){this._hasPlayed?v(h(i.prototype),"show",this).call(this):this._showOnPlayed=!0
if(!this._isShowing){this._isShowing=!0
this.trigger("show")}}},{key:"createEl",value:function(){this._display=Sp.createEl("div",void 0,{class:"vjs-custom-captions-display"})
this._cue=Sp.createEl("div",void 0,{class:"vjs-custom-captions-cue",id:this.id()})
return Sp.appendContent(this._display,this._cue)}},{key:"setText",value:function(e){Sp.textContent(this.contentEl(),e)}},{key:"_onPlaying",value:function(){this._hasPlayed=!0
this._showOnPlayed&&this.show()}},{key:"_onPlayerReset",value:function(){var e=this._isShowing
this.hide()
this._hasPlayed=!1
this._showOnPlayed=e}}])
return i}(Tp)
ql.registerComponent("CustomCaptionsDisplay",kp)
var Ep=ql.mergeOptions,Cp=ql.getComponent("Button"),wp="vjs-captions-active",Ip="captions",Pp={useCustomCaptions:!1,selected:!1},xp=function(e){d(i,e)
var t=g(i)
function i(e,n){var r
o(this,i);(r=t.call(this,e,Ep({},Pp,n)))._player=e
r._isActive=!1
r.options_.useCustomCaptions||r.hide()
r.controlText("Show Captions")
r.addClass("vjs-captions-toggle")
if(r._player.usingPlugin("userPreferences")){r._userPrefs=r._player.userPreferences()
r.one(r._player,"play",r._handlePlay)
r.on(r._player,"playerreset",(function(){r.off(r._player,"off",r._handlePlay)
r.one(r._player,"play",r._handlePlay)}))}if(r.options_.useCustomCaptions)r._player.ready((function(){var e=r._player.getChild("customCaptionsDisplay")
r.on(e,"show",r.activate)
r.on(e,"hide",r.deactivate)}))
else{var a=r._player.textTracks()
if(a){r.on(a,"addtrack",r._handleAddTrack)
r.on(a,"removetrack",r._handleRemoveTrack)}}return r}l(i,[{key:"handleClick",value:function(){this._isActive?this.deactivate():this.activate()
this._userPrefs&&this._userPrefs.set(Ip,this._isActive)}},{key:"activate",value:function(){this.options_.useCustomCaptions?this._player.getChild("customCaptionsDisplay").show():this._textTrack&&(this._textTrack.mode="showing")
this._player.usingPlugin("tracking")&&this._player.tracking().setIsCcVisible(!0)
this.addClass(wp)
this.controlText("Hide Captions")
this._isActive=!0
this.trigger("activate")}},{key:"deactivate",value:function(){if(this._isActive){this.options_.useCustomCaptions?this._player.getChild("customCaptionsDisplay").hide():this._textTrack&&(this._textTrack.mode="hidden")
this._player.usingPlugin("tracking")&&this._player.tracking().setIsCcVisible(!1)
this.removeClass(wp)
this.controlText("Show Captions")
this._isActive=!1
this.trigger("deactivate")}}},{key:"_handleAddTrack",value:function(e){if(e.track&&("captions"===e.track.kind||this.options_.shouldIncludeSubtitles&&"subtitles"===e.track.kind)){this._textTrack=e.track
this.show()
"showing"===this._textTrack.mode&&this.activate()}}},{key:"_handleRemoveTrack",value:function(e){if(e.track&&"captions"===e.track.kind){this._textTrack=null
this.deactivate()
this.hide()}}},{key:"_handlePlay",value:function(){this._userPrefs&&this._userPrefs.get(Ip)&&this.activate()}}])
return i}(Cp)
ql.registerComponent("CaptionsToggle",xp)
function Ap(e,t,i){var n,r,a,s,o
null==t&&(t=100)
function u(){var l=Date.now()-s
if(l<t&&l>=0)n=setTimeout(u,t-l)
else{n=null
if(!i){o=e.apply(a,r)
a=r=null}}}var l=function(){a=this
r=arguments
s=Date.now()
var l=i&&!n
n||(n=setTimeout(u,t))
if(l){o=e.apply(a,r)
a=r=null}return o}
l.clear=function(){if(n){clearTimeout(n)
n=null}}
l.flush=function(){if(n){o=e.apply(a,r)
a=r=null
clearTimeout(n)
n=null}}
return l}Ap.debounce=Ap
var Op=Ap,Lp=ql.getComponent("TextTrackMenuItem"),Dp=ql.dom,Rp=function(e){d(i,e)
var t=g(i)
function i(){o(this,i)
return t.apply(this,arguments)}l(i,[{key:"createEl",value:function(e,t,n){var r=v(h(i.prototype),"createEl",this).call(this,e,t,n)
if("subtitles"===this.options_.track.kind){this.options_.label="English (auto-generated)"
r.removeChild(r.querySelector(".vjs-menu-item-text"))
var a=Dp.createEl("span",void 0,{class:"vjs-menu-item-text"})
Dp.textContent(a,this.localize(this.options_.label))
r.appendChild(a)}return r}}])
return i}(Lp)
ql.registerComponent("CaptionsMenuItem",Rp)
var Mp=ql.getComponent("TextTrackButton"),Np=ql.getComponent("OffTextTrackMenuItem"),Up="vjs-captions-active",Bp="captionsLang",Fp=function(e){d(i,e)
var t=g(i)
function i(e){var n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
o(this,i);(n=t.call(this,e,r))._player=e
n.controlText("Open Captions Menu")
n._isMenuOpen=!1
n._hasManuallyDisabled=!1
n.addClass("vjs-captions-menu-toggle")
r.id&&n.setAttribute("id",r.id)
var a=e.textTracks()
n.sort=r.sort
n.reEnableCaptions=Op(n._reEnableCaptions,300,!0)
n.on("captionMenuItemSelected",(function(e,t){var i=t.track
n.trigger("captionChange",i)}))
if(n._player.usingPlugin("userPreferences")){n._userPrefs=n._player.userPreferences()
n.on(n._player,"playerreset",(function(){n.removeClass(Up)}))}a&&n.on(a,"change",n._handleChangeTrack)
n.on("dispose",n._onDispose)
n.on(n._player,"loadedmetadata",n._handleLoadedMetaData)
return n}l(i,[{key:"createItems",value:function(){var e=this,t=[]
this.removeClass(Up);(t=v(h(i.prototype),"createItems",this).call(this,t,Rp)).shift()
"function"==typeof this.sort?t.sort(this.sort):!1!==this.sort&&t.sort((function(e,t){var i=e.track.label.toLowerCase(),n=t.track.label.toLowerCase()
return i<n?-1:n<i?1:0}))
1===t.length&&"CC1"===t[0].track.label&&(t[0].el().textContent="CC")
var n=new Np(this.player_,{kinds:this.kinds_,kind:this.kind_,label:"Off"})
t.unshift(n)
n.on(["tap","click"],this._offMenuItemSelected.bind(this))
t.forEach((function(t){var i=t.track
"showing"===i.mode&&"Off"!==i.label&&e.addClass(Up)
t.on(["tap","click"],(function(){e.trigger("captionMenuItemSelected",t)}))}))
this._items=t
return t}},{key:"handleClick",value:function(e){v(h(i.prototype),"handleClick",this).call(this,e)
this._isMenuOpen=!this._isMenuOpen
this.controlText(this._isMenuOpen?"Close Captions Menu":"Open Captions Menu")}},{key:"handleSubmenuKeyDown",value:function(e){v(h(i.prototype),"handleSubmenuKeyDown",this).call(this,e)
"Escape"===e.key&&e.stopPropagation()}},{key:"_handleChangeTrack",value:function(){var e=this.items.find((function(e){return"showing"===e.track.mode})),t=!!e
if(this._hasManuallyDisabled||t){if(t){this.addClass(Up)
this._activeTrack=e.track}else{this.removeClass(Up)
this._activeTrack=void 0}this._player.usingPlugin("tracking")&&this._player.tracking().setIsCcVisible(t)
if(this._userPrefs){this._userPrefs.set(Bp,this._activeTrack?this._activeTrack.language:"")
this.options({selectedLanguage:null})}this._hasManuallyDisabled=!1}else{this.reEnableCaptions()
this._hasManuallyDisabled=!1}}},{key:"_handleLoadedMetaData",value:function(){var e=this._player.textTracks(),t=this._userPrefs&&this._userPrefs.get(Bp),i=this.options_.selectedLanguage||t
if(e&&i)for(var n=0;n<e.length;n++){var r=e[n]
if(r.language===i){r.mode="showing"
this.trigger("captionChange",r)}}}},{key:"_offMenuItemSelected",value:function(){this._hasManuallyDisabled=!0}},{key:"_onDispose",value:function(){this.reEnableCaptions.clear()}},{key:"_reEnableCaptions",value:function(){if(this._activeTrack){this._activeTrack.mode="showing"
this.trigger("captionChange",this._activeTrack)}}}])
return i}(Mp)
Fp.prototype.kinds_=["captions","subtitles"]
ql.registerComponent("CaptionsMenuToggle",Fp)
var jp=function(e){d(i,e)
var t=g(i)
function i(e,n){var r,a=n.disabled,s=void 0!==a&&a
o(this,i);(r=t.apply(this,arguments)).controlText("Previous")
r.addClass("vjs-previous-button")
s&&r.disable()
return r}l(i,[{key:"handleClick",value:function(){this.trigger("previous")}}])
return i}(ql.getComponent("Button"))
ql.registerComponent("PreviousButton",jp)
var Vp=function(e){d(i,e)
var t=g(i)
function i(e,n){var r,a=n.disabled,s=void 0!==a&&a
o(this,i);(r=t.apply(this,arguments)).controlText("Next")
r.addClass("vjs-next-button")
s&&r.disable()
return r}l(i,[{key:"handleClick",value:function(){this.trigger("next")}}])
return i}(ql.getComponent("Button"))
ql.registerComponent("NextButton",Vp)
var Hp=".vjs-play-control:not(.vjs-playing):not(.vjs-ended)",qp=".vjs-play-control.vjs-playing:not(.vjs-ended)",Wp=".vjs-play-control.vjs-ended",Gp=".vjs-tech",zp=".vjs-poster",Kp=".vjs-mute-control",Xp=".vjs-fullscreen-control",Yp=".vjs-captions-toggle.vjs-captions-active",Qp=".vjs-captions-toggle:not(.vjs-captions-active)",$p=".vjs-subtitles-menu-item",Jp=".vjs-captions-menu-item",Zp=".vjs-menu-item",ef=".vjs-progress-holder",tf=".vjs-volume-control",nf=".vjs-back-to-start-button",rf=".vjs-big-play-button",af="PLAY_CONTROL",sf="PAUSE_CONTROL",of="REPLAY_CONTROL",uf="MUTE_CONTROL",lf="UNMUTE_CONTROL",cf="POSTER_CONTROL",df="MEDIA_CONTROL",hf="FULLSCREEN_CONTROL",pf="UNFULLSCREEN_CONTROL",ff="CAPTIONS_ON_CONTROL",mf="CAPTIONS_OFF_CONTROL",gf="MENU_CAPTIONS_ON_CONTROL",vf="MENU_CAPTIONS_OFF_CONTROL",yf="PROGRESS_SCRUBBER_CONTROL",_f="VOLUME_SLIDER_CONTROL",bf="BACK_TO_START_CONTROL",Tf="PLAY_OVERLAY_CONTROL",Sf="SKIP_AHEAD_CONTROL",kf="SKIP_BACK_CONTROL",Ef="THEATER_MODE_CONTROL",Cf="PLAYBACK_RATE_CONTROL",wf=ql.getComponent("Button"),If=10,Pf=function(e){d(i,e)
var t=g(i)
function i(e,n){var r,a=n.duration,s=void 0===a?If:a
o(this,i);(r=t.apply(this,arguments))._player=e
r._duration=s
e.playerInteraction().registerControl(r.el(),Sf)
r.controlText("Skip ahead")
r.addClass("vjs-skip-ahead-button")
return r}l(i,[{key:"handleClick",value:function(){var e=this._player.currentTime()+this._duration
e>this._player.duration()&&(e=this._player.duration())
this._player.currentTime(e)
this.trigger("skipAhead")}}])
return i}(wf)
ql.registerComponent("SkipAheadButton",Pf)
var xf=ql.getComponent("Button"),Af=10,Of=function(e){d(i,e)
var t=g(i)
function i(e,n){var r,a=n.duration,s=void 0===a?Af:a
o(this,i);(r=t.apply(this,arguments))._player=e
r._duration=s
e.playerInteraction().registerControl(r.el(),kf)
r.controlText("Skip back")
r.addClass("vjs-skip-back-button")
return r}l(i,[{key:"handleClick",value:function(){var e=this._player.currentTime()-this._duration,t=e<0?0:e
this._player.currentTime(t)
this.trigger("skipBack")}}])
return i}(xf)
ql.registerComponent("SkipBackButton",Of)
var Lf=function(e){d(i,e)
var t=g(i)
function i(e){var n
o(this,i);(n=t.apply(this,arguments))._player=e
n.controlText("Back to start")
n.addClass("vjs-back-to-start-button")
return n}l(i,[{key:"handleClick",value:function(){this._player.currentTime(0)
!ql.browser.IS_IOS&&this._player.usingPlugin("a11yNotification")&&this._player.a11yNotification().fillWithContent(this.controlText_)
this.trigger("backToStart")}}])
return i}(ql.getComponent("Button"))
ql.registerComponent("BackToStartButton",Lf)
var Df=function(e){d(i,e)
var t=g(i)
function i(e){var n
o(this,i);(n=t.apply(this,arguments))._player=e
n._player.playerInteraction().registerControl(n.el(),Ef)
n.controlText("Theater mode")
n.addClass("vjs-theater-mode-button")
n.isTheaterModeEnabled=!1
return n}l(i,[{key:"handleClick",value:function(){this.isTheaterModeEnabled=!this.isTheaterModeEnabled
if(this.isTheaterModeEnabled){this.addClass("vjs-theater-mode-button--enabled")
this.controlText("Theater mode default view")
this.trigger("activate")}else{this.removeClass("vjs-theater-mode-button--enabled")
this.controlText("Theater mode")
this.trigger("deactivate")}}}])
return i}(ql.getComponent("Button"))
ql.registerComponent("TheaterModeButton",Df)
var Rf=ql.getComponent("PlaybackRateMenuButton"),Mf=ql.getComponent("PlaybackRateMenuItem"),Nf=ql.dom,Uf=function(e){d(i,e)
var t=g(i)
function i(){var e
o(this,i);(e=t.apply(this,arguments)).player().playerInteraction().registerControl(e.getChild("PlaybackRateMenuButton").el(),Cf)
return e}l(i,[{key:"createEl",value:function(){var e=v(h(i.prototype),"createEl",this).call(this)
this.labelEl_.setAttribute("aria-hidden",!0)
return e}},{key:"createItems",value:function(){var e=this,t=this.playbackRates(),i=[]
t&&t.forEach((function(t){var n=new Mf(e.player(),{rate:"".concat(t,"x")}),r=Nf.createEl("span",{className:"vjs-icon-placeholder"})
Nf.prependTo(r,n.el())
n.addClass("vjs-menu-item-checkable")
i.push(n)}))
return i}},{key:"handleClick",value:function(){this.buttonPressed_?this.unpressButton():this.pressButton()}},{key:"handleSubmenuKeyDown",value:function(e){v(h(i.prototype),"handleSubmenuKeyDown",this).call(this,e)
"Escape"===e.key&&e.stopPropagation()}}])
return i}(Rf)
ql.registerComponent("PlaybackRateMenuButton",Uf)
var Bf=function(e){d(i,e)
var t=g(i)
function i(e){var n
o(this,i);(n=t.apply(this,arguments)).addClass("vjs-poster-background")
n.setBackground()
n.on(e,"playerreset",n._playerReset)
n.on(e,"posterchange",n.setBackground)
return n}l(i,[{key:"setBackground",value:function(){var e=this.player().poster()
this.el().style.backgroundImage=e?"url(".concat(e,")"):"none"}},{key:"_playerReset",value:function(){this.el().style.backgroundImage="none"}}])
return i}(ql.getComponent("Component"))
ql.registerComponent("PosterBackground",Bf)
var Ff=ql.getComponent("Component"),jf=ql.dom,Vf="LEFT",Hf="RIGHT",qf={LEFT:"vjs-tooltip-left",RIGHT:"vjs-tooltip-right"},Wf=function(e){d(i,e)
var t=g(i)
function i(e){var n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=r.control,s=r.text
o(this,i)
fp("tooltip: must be pased a control",a);(n=t.apply(this,arguments)).player=e
n._control=a
n.setText(s)
n.on(a,"focus",n._onFocus)
n.on(a,"focusout",n._onFocusout)
n.on(a,"keydown",n._onKeydown)
n.on(a,"mouseenter",n._onMouseenter)
n.on(a,"mouseleave",n._onMouseleave)
n.on(n.player,"fullscreenchange",n._exitFullscreen)
n.on(n._tooltipContainer,"click",(function(e){if(e.target.classList.contains("vjs-tooltip-container")){e.preventDefault()
e.stopPropagation()}}))
return n}l(i,[{key:"createEl",value:function(){var e=qf[this.options_.side]||""
this._tooltip=v(h(i.prototype),"createEl",this).call(this,"div",{className:"vjs-tooltip"},{"aria-hidden":"true",role:"tooltip"})
this._tooltipContainer=v(h(i.prototype),"createEl",this).call(this,"div",{className:"vjs-tooltip-container ".concat(e)})
this._tooltipContainer.appendChild(this._tooltip)
return this._tooltipContainer}},{key:"show",value:function(){if(!this._isShowing){this.addClass("vjs-tooltip-active")
this._isShowing=!0}}},{key:"hide",value:function(){if(this._isShowing){this.removeClass("vjs-tooltip-active")
this._isShowing=!1}}},{key:"setText",value:function(e){var t=this.player.localize(e)
jf.textContent(this._tooltip,t)}},{key:"_onKeydown",value:function(e){"Escape"!==e.key&&"Esc"!==e.key||!this._isShowing||this.hide()}},{key:"_exitFullscreen",value:function(){this._isShowing&&this.hide()}},{key:"_onFocus",value:function(){this.show()}},{key:"_onFocusout",value:function(){this.hide()}},{key:"_onMouseenter",value:function(){this.show()}},{key:"_onMouseleave",value:function(){this.hide()}}])
return i}(Ff)
Wf.prototype.options_={name:"ControlTooltip"}
ql.registerComponent("ControlTooltip",Wf)
var Gf=function(e){d(i,e)
var t=g(i)
function i(){o(this,i)
return t.apply(this,arguments)}l(i,[{key:"handleClick",value:function(){var e=this
v(h(i.prototype),"handleClick",this).apply(this,arguments)
this.player().one("fullscreenchange",(function(){e.el().focus()}))}}])
return i}(ql.getComponent("FullscreenToggle"))
ql.registerComponent("FullscreenToggle",Gf)
var zf=function(e){d(i,e)
var t=g(i)
function i(e,n){var r
o(this,i)
r=t.call(this,e,n)
e.ready((function(){n.inline?e.controlBar.addClass("vjs-control-bar--inline"):e.controlBar.addClass("vjs-control-bar--tier")}))
return r}return l(i)}(ql.getComponent("ProgressControl"))
ql.registerComponent("ProgressControl",zf)
var Kf=ql.getComponent("Menu"),Xf=ql.dom,Yf="vjs-settings-menu-sub-menu-active",Qf=function(e){d(i,e)
var t=g(i)
function i(){var e
o(this,i);(e=t.apply(this,arguments))._selectedSubMenuItem=null
e.on("focusout",e._onFocusout)
return e}l(i,[{key:"createEl",value:function(){var e=v(h(i.prototype),"createEl",this).apply(this,arguments)
Xf.addClass(e,"vjs-settings-menu")
this._subMenus=Xf.createEl("div",{className:"vjs-settings-menu-sub-menus"})
e.appendChild(this._subMenus)
return e}},{key:"addItem",value:function(e){var t=this,i=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).index
this.addChild(e,void 0,i)
var n=e.getMenu()
if(n){this._subMenus.appendChild(n.el())
this.on(e,"select",(function(){return t._onSelectSubMenu(e)}))
this.on(e,"deselect",(function(){return t._onDeselectSubMenu(e)}))}}},{key:"_onFocusout",value:function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).relatedTarget
if(this.menuButton_&&!this.el().contains(e)){this._selectedSubMenuItem&&this._selectedSubMenuItem.selected(!1)
this.menuButton_.el().contains(e)||this.menuButton_.unpressButton()}}},{key:"_onSelectSubMenu",value:function(e){var t=e.getMenu()
if(t){t.focus()
this.addClass(Yf)
this._selectedSubMenuItem=e}}},{key:"_onDeselectSubMenu",value:function(e){if(e.getMenu()){this.removeClass(Yf)
this.hasClass("vjs-lock-showing")&&e.focus()
this._selectedSubMenuItem=null}}}])
return i}(Kf)
ql.registerComponent("SettingsMenu",Qf)
var $f=ql.getComponent("MenuItem"),Jf=ql.dom,Zf=ql.mergeOptions,em="vjs-settings-menu-item-active",tm={selectable:!0,valueText:void 0},im=function(e){d(i,e)
var t=g(i)
function i(e,n){o(this,i)
return t.call(this,e,Zf({},tm,n))}l(i,[{key:"createMenu",value:function(){}},{key:"getMenu",value:function(){return this._menu}},{key:"createEl",value:function(){var e=this,t=v(h(i.prototype),"createEl",this).apply(this,arguments),n=this.options_,r=n.valueText,a=n.icon
Jf.addClass(t,"vjs-settings-menu-item")
this._menu=this.createMenu()
this._value=Jf.createEl("div",{className:"vjs-settings-menu-item-value"})
r&&this.setValueText(r)
t.appendChild(this._value)
a&&Jf.prependTo(Jf.createEl("span",{className:"vjs-icon-placeholder"}),t)
if(this._menu){var s=new i(this.player(),{label:this.options_.label,icon:!0,selectable:!1})
s.addClass("vjs-settings-menu-item-header")
s.on(["tap","click"],(function(){e.selected(!1)}))
this._menu.addChild(s,void 0,0)
Jf.addClass(t,"vjs-settings-menu-item-expandable")
t.appendChild(Jf.createEl("span",{className:"vjs-icon-placeholder"}))
t.setAttribute("aria-haspopup","true")
t.setAttribute("aria-expanded","false")}return t}},{key:"setValueText",value:function(e){e&&Jf.textContent(this._value,this.localize(e))}},{key:"selected",value:function(e){v(h(i.prototype),"selected",this).apply(this,arguments)
this.selectable&&(e?this._select():this._deselect())}},{key:"handleClick",value:function(){v(h(i.prototype),"handleClick",this).apply(this,arguments)
this.trigger("clicked")}},{key:"_select",value:function(){if(this._menu){this._menu.addClass(em)
this.el().setAttribute("aria-expanded","true")}this.trigger("select")}},{key:"_deselect",value:function(){if(this._menu){this._menu.removeClass(em)
this.el().setAttribute("aria-expanded","false")}this.trigger("deselect")}}])
return i}($f)
ql.registerComponent("SettingsMenuItem",im)
function nm(e){return!!e||!1===e||0===e}var rm=ql.mergeOptions,am=ql.getComponent("SettingsMenuItem"),sm=ql.getComponent("Toggle"),om={multiselectable:!0,selected:!0},um=function(e){d(i,e)
var t=g(i)
function i(e,n){var r
o(this,i)
var a=(r=t.call(this,e,rm({},om,n))).options_,s=a.userPrefsKey,u=a.enableUserPrefs,l=a.className
r.addClass("vjs-settings-toggle-menu-item")
l&&r.addClass(l)
if(u&&e.usingPlugin("userPreferences")){r._userPrefs=e.userPreferences()
r._userPrefsKey=s
e.ready((function(){var e=r._userPrefs.get(s)
nm(e)&&r.selected(e)}))}return r}l(i,[{key:"createEl",value:function(){var e=v(h(i.prototype),"createEl",this).apply(this,arguments)
this._toggle=this._createToggle()
e.appendChild(this._toggle.el())
return e}},{key:"handleClick",value:function(){this.selected(!this.isSelected_)
this._userPrefs&&this._userPrefs.set(this._userPrefsKey,this.isSelected_)}},{key:"selected",value:function(e){if(nm(e)&&e!==this._lastSelected){v(h(i.prototype),"selected",this).apply(this,arguments)
if(e){this.setValueText("On")
this._toggle.check()}else{this.setValueText("Off")
this._toggle.uncheck()}this._lastSelected=e}return this.isSelected_}},{key:"_createToggle",value:function(){return new sm(this.player(),{readonly:!0})}}])
return i}(am)
ql.registerComponent("SettingsToggleMenuItem",um)
var lm=ql.getComponent("SettingsMenu"),cm=function(e){d(i,e)
var t=g(i)
function i(){var e
o(this,i);(e=t.apply(this,arguments)).addClass("vjs-settings-menu-button")
return e}l(i,[{key:"createMenu",value:function(){var e=new lm(this.player(),{menuButton:this})
this.hideThreshold_=0
this.items||(this.items=this.createItems())
this.items.forEach((function(t){e.addItem(t)}))
return e}},{key:"createItems",value:function(){var e,t=this,i=this.options_&&this.options_.items||[]
if(Array.isArray(i)){e=i
i={}}else e=Object.keys(i)
return e.map((function(e){var n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:""
return e.charAt(0).toUpperCase()+e.slice(1)}(e),r=ql.getComponent(n)
fp("settings-menu: Component ".concat(n," must exist"),r)
var a=new r(t.player(),i[e]||{})
a.addClass("vjs-settings-menu-button-item")
return a}))}}])
return i}(ql.getComponent("MenuButton"))
cm.prototype.controlText_="Settings"
ql.registerComponent("SettingsMenuButton",cm)
var dm=ql.mergeOptions,hm=ql.getComponent("SettingsToggleMenuItem"),pm=function(e){d(i,e)
var t=g(i)
function i(){o(this,i)
return t.apply(this,arguments)}return l(i)}(hm)
pm.prototype.options_=dm(hm.prototype.options_,{label:"Autoplay",name:"AutoplaySetting",enableUserPrefs:!0,userPrefsKey:"autoplay",className:"vjs-autoplay-setting"})
ql.registerComponent("AutoplaySetting",pm)
var fm=ql.mergeOptions,mm=ql.getComponent("SettingsToggleMenuItem"),gm=function(e){d(i,e)
var t=g(i)
function i(){o(this,i)
return t.apply(this,arguments)}return l(i)}(mm)
gm.prototype.options_=fm(mm.prototype.options_,{label:"Auto-advance",name:"AutoAdvanceSetting",enableUserPrefs:!0,userPrefsKey:"auto-advance",className:"vjs-auto-advance-setting"})
ql.registerComponent("AutoAdvanceSetting",gm)
var vm=ql.mergeOptions,ym=ql.getComponent("SettingsMenu"),_m=ql.getComponent("SettingsMenuItem"),bm={multiselectable:!1,selected:!1},Tm="quality-adapt",Sm="quality-prog"
function km(e){return"auto"===e?"Auto":"".concat(e,"p")}var Em=function(e){d(i,e)
var t=g(i)
function i(e,n){var r
o(this,i)
r=t.call(this,e,vm({},bm,n))
fp("quality-setting: The qualityLevels plugin is required",e.hasPlugin("qualityLevels"))
r.addClass("vjs-quality-setting")
r._qualityLevels=e.qualityLevels()
r._items=[]
r._qualities=[]
r._selectedHeight=null
if(e.usingPlugin("userPreferences")){r._userPrefs=e.userPreferences()
r._userPrefsKey=r.options_.userPrefsKey}r.on(r._qualityLevels,"addqualitylevel",r._onAddQualityLevel)
r.on(r._qualityLevels,"removequalitylevel",r._onRemoveQualityLevel)
r.on(r.player_,"sourceset",r._onSourceSet)
r.on(r.player_,"loadedmetadata",r._onLoadedMetadata)
r.on(r.player_,"playerreset",r._onPlayerReset)
return r}l(i,[{key:"createMenu",value:function(){var e=new ym(this.player_)
e.addClass("vjs-quality-setting-sub-menu")
return e}},{key:"_onSourceSet",value:function(){this._isAdaptive()&&this._onAddQualityLevel({qualityLevel:{height:"auto"}})}},{key:"_onLoadedMetadata",value:function(){this._qualityLevels.length?this.enable():this.disable()
var e=this._userPrefs&&this._userPrefs.get(this._getUserPrefKey()),t=this._items[e]&&e
if(!t)if(this._isAdaptive())t="auto"
else{var i=this._qualityLevels,n=i[i.selectedIndex]
t=n&&n.height}var r=this._items[t]
r&&r.selected(!0)}},{key:"_onPlayerReset",value:function(){var e=this
this._qualities.forEach((function(t){e._removeQualityLevelMenuItem({height:t})}))
this._qualities=[]
this._selectedHeight=null}},{key:"_onAddQualityLevel",value:function(e){var t=e.qualityLevel,i=t.height
if(i&&-1===this._qualities.indexOf(i)){this._qualities.push(i)
this._qualities.sort((function(e,t){return e-t}))
this._addQualityLevelMenuItem(t)}}},{key:"_onRemoveQualityLevel",value:function(e){var t=e.qualityLevel,i=t.height,n=i?this._qualities.indexOf(i):null
if(i&&n>-1){this._qualities.splice(n,1)
this._removeQualityLevelMenuItem(t)}}},{key:"_addQualityLevelMenuItem",value:function(e){var t=this,i=e.height,n=new _m(this.player_,{icon:!0,label:km(i),selected:!1})
this.on(n,"select",(function(){t.trigger("change",e)
t._onSelectQuality(e)}))
this.on(n,"clicked",(function(){t._userPrefs&&t._selectedHeight&&t._userPrefs.set(t._getUserPrefKey(),t._selectedHeight)}))
n.addClass("vjs-quality-setting-level")
n.addClass("vjs-menu-item-checkable")
this._items[i]=n
var r=this._qualities.indexOf(i)
this._menu.addItem(n,{index:r>-1?r+1:void 0})}},{key:"_removeQualityLevelMenuItem",value:function(e){var t=e.height,i=this._items[t]
this._menu.removeChild(i)
i.dispose()
delete this._items[t]}},{key:"_onSelectQuality",value:function(e){var t=e.height
if(this._selectedHeight!==t){var i=this._qualityLevels,n=this._items[this._selectedHeight]
n&&n.selected(!1)
if(this._isAdaptive())for(var r=0;r<i.length;r++){var a=i[r]
a.enabled=a.height===t||"auto"===t}else{var s=i.levels_.findIndex((function(e){return e.height===t}))
i.selectedIndex_=s
i.trigger({type:"change",selectedIndex:s})}this.setValueText(km(t))
this._selectedHeight=t
this.selected(!1)}}},{key:"_isAdaptive",value:function(){return!!this.player_.tech({IWillNotUseThisInPlugins:!0}).vhs}},{key:"_getUserPrefKey",value:function(){var e=this._userPrefsKey
e||(e=this._isAdaptive()?Tm:Sm)
return e}}])
return i}(_m)
Em.prototype.options_=vm(_m.prototype.options_,{label:"Quality",name:"QualitySetting"})
ql.registerComponent("QualitySetting",Em)
var Cm=function(e){d(i,e)
var t=g(i)
function i(){o(this,i)
return t.apply(this,arguments)}l(i,[{key:"createEl",value:function(){return v(h(i.prototype),"createEl",this).call(this,"div",{className:"vjs-time-display vjs-control"},{translate:"no"})}}])
return i}(ql.getComponent("Component"))
Cm.prototype.options_={name:"TimeDisplay",children:["currentTimeDisplay","timeDivider","durationDisplay"]}
ql.registerComponent("TimeDisplay",Cm)
var wm=ql.getComponent("Component"),Im=ql.dom,Pm=function(e){d(i,e)
var t=g(i)
function i(e){var n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=r.id,s=r.hideOnInactivity,u=void 0===s||s,l=r.hideBeforeStart,c=void 0===l||l
o(this,i);(n=t.apply(this,arguments)).addClass("vjs-player-banner")
u&&n.addClass("vjs-hide-on-inactivity")
c&&n.addClass("vjs-hide-before-start")
a&&n.contentEl().setAttribute("id",a)
return n}l(i,[{key:"fillWith",value:function(e){Im.insertContent(this.contentEl(),e)}}])
return i}(wm)
ql.registerComponent("PlayerBanner",Pm)
var xm=ql.getComponent("Component"),Am=ql.dom,Om=function(e){d(i,e)
var t=g(i)
function i(){o(this,i)
return t.apply(this,arguments)}l(i,[{key:"createEl",value:function(){this._display=Am.createEl("div",void 0,{class:"media-player-audio-animated-background"})
this._animationSandbox=Am.createEl("iframe",{sandbox:"allow-same-origin"},{class:"media-player-animation-container"})
this._display.appendChild(this._animationSandbox)
return this._display}},{key:"setAnimation",value:function(e){if(e){this._animationSvg=e
var t=this._animationSandbox.contentWindow.document.body
t.style.margin=0
t.appendChild(this._animationSvg)}}},{key:"pauseAnimation",value:function(){var e
null===(e=this._animationSvg)||void 0===e||e.pauseAnimations()}},{key:"unpauseAnimation",value:function(){var e
null===(e=this._animationSvg)||void 0===e||e.unpauseAnimations()}}])
return i}(xm)
ql.registerComponent("AudioAnimatedBackground",Om)
function Lm(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[]
e&&"function"==typeof e[t]&&e[t].apply(e,_(i))}function Dm(){return window.performance&&window.performance.timing&&"function"==typeof window.performance.now?Math.round(window.performance.now())+(window.performance.timing.navigationStart||1):(new Date).getTime()}var Rm="MediaPlaybackErrorV2Event",Mm="MediaRenderedEvent",Nm="CAPTION",Um="CUSTOM",Bm="ABORTED",Fm="NETWORK",jm="DECODING",Vm="SOURCE_FILE",Hm="ENCRYPTION",qm="INIT",Wm="SEEK",Gm={EDGECAST:"ecst",AKAMAI:"akam"},zm="STREAMING",Km="PROGRESSIVE",Xm="HLS",Ym="DASH",Qm="VIDEO",$m="HTML5",Jm={FREE:"FREE",PAID:"PAID",ENTERPRISE:"ENTERPRISE",GUEST:"GUEST"},Zm=Object.keys(Gm).map((function(e){return Gm[e]})),eg=["ads","assessments","career_video","learning","linkedin","live_video","messaging","slideshare","stories","ugc.aws","ugc.inhouse","ugc"],tg={IS_LIVE:"IS_LIVE",WAS_LIVE:"WAS_LIVE",PRE_RECORDED:"PRE_RECORDED"}
function ig(e){var t
if(!e||"function"!=typeof e.currentSource)return!1
var i=e.currentSource()
return"application/dash+xml"===(null==i||null===(t=i.type)||void 0===t?void 0:t.toLowerCase())}function ng(e){var t,n=e.staticMediaHeader,r=e.player,a=e.primaryMediaTrackingId,s=r.tech(!0).vhs,o=!!s,u=ig(r),l=i(i({},n),{},{primaryMediaTrackingId:a,userBandwidth:navigator.connection&&1e3*navigator.connection.downlink*1e3,playerEstimatedBandwidth:null==s||null===(t=s.stats)||void 0===t?void 0:t.bandwidth})
o&&(l.streamProtocol=u?Ym:Xm)
return l}function rg(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=t.cdnProvider,n=t.accountAccessType,r=t.mediaSource,a=t.contextTrackingId,s=t.fetchCDN,o=void 0!==s&&s
i&&fp("media-player: rum: cdnProvider must be a valid param",Zm.includes(i))
n&&fp("media-player: rum: accountAccessType must be a valid param",Jm[n])
r&&mp("media-player: rum: mediaSource must be a valid param",eg.includes(r))
var u={deliveryMode:!!e.tech({IWillNotUseThisInPlugins:!0}).vhs?zm:Km,playerType:$m,mediaType:Qm,cdnProvider:i}
o&&function(e,t){fetch(t,{method:"HEAD"}).then((function(t){var i=t.headers
e.cdnProvider=i.get("x-cdn")}))}(u,e.currentSource().src)
n&&(u.accountAccessType=n)
r&&(u.mediaSource=r)
a&&(u.contextTrackingId=a)
return u}function ag(e,t){return"live_video"!==e?tg.PRE_RECORDED:t.duration()===1/0?tg.IS_LIVE:tg.WAS_LIVE}var sg=function(){function e(t){o(this,e)
this._bufferingRanges={}
this.staticMediaHeader={}
this.mediaLiveState=null
this.mediaTrackingObject={objectUrn:""}
this.player=t}l(e,[{key:"setPrimaryMediaTrackingId",value:function(e){this._primaryMediaTrackingId=e}},{key:"_getMediaHeader",value:function(){return ng({staticMediaHeader:this.staticMediaHeader,player:this.player,primaryMediaTrackingId:this._primaryMediaTrackingId})}},{key:"_buildMediaPlaybackErrorEventBeacon",value:function(e,t,i){var n={mobileHeader:null,mediaHeader:this._getMediaHeader(),mediaTrackingObject:this.mediaTrackingObject,mediaLiveState:this.mediaLiveState,errorType:e}
"string"==typeof t&&(n.errorMessage=t)
"string"==typeof i&&""!==i&&(n.url=i)
return{eventName:Rm,eventBody:n}}},{key:"_buildMediaRenderedEvent",value:function(e){this._ensureInitCalled()
return{eventName:Mm,eventBody:{mobileHeader:null,mediaHeader:this._getMediaHeader(),mediaLiveState:this.mediaLiveState,mediaTrackingObject:this.mediaTrackingObject,perceivedTimeToFirstFrameDuration:e}}}},{key:"_ensureInitCalled",value:function(){if("number"!=typeof this._initializationStartTs)throw new Error("initializationStart not called")}},{key:"_throwErrorIfInvalidBuffering",value:function(e,t){this._ensureInitCalled()
if("number"!=typeof e)throw new TypeError("bufferingId not a number")
if(t){if("object"===r(this._bufferingRanges[e]))throw new Error("duplicate bufferingId")}else if("object"!==r(this._bufferingRanges[e])||void 0!==this._bufferingRanges[e].end)throw new Error("incorrect bufferingId or wrong buffering type")}},{key:"setTrackingId",value:function(e){this.mediaTrackingObject.trackingId=e}},{key:"setObjectUrn",value:function(e){this.mediaTrackingObject.objectUrn=e}},{key:"setStaticMediaHeader",value:function(e){this.staticMediaHeader=e}},{key:"setMediaLiveState",value:function(e){fp("rum-video-tracking: Must provide a valid mediaLiveState",tg[e])
this.mediaLiveState=e}},{key:"initializationStart",value:function(){this._initializationStartTs=Dm()}},{key:"initializationEnd",value:function(){this._ensureInitCalled()
this._initializationEndTs=Dm()}},{key:"mediaRenderStart",value:function(){this._renderStart=Dm()}},{key:"mediaRenderEnd",value:function(e){if(!this._renderStart)throw new Error("mediaRenderStart not called before mediaRenderEnd")
return this._buildMediaRenderedEvent((e||Dm())-this._renderStart)}},{key:"bufferingStart",value:function(e){var t=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).type,i=void 0===t?null:t
this._throwErrorIfInvalidBuffering(e,!0)
this._bufferingRanges[e]={start:Dm(),type:i}}},{key:"bufferingEnd",value:function(e){this._throwErrorIfInvalidBuffering(e,!1)
this._bufferingRanges[e].end=Dm()}},{key:"mediaPlaybackError",value:function(e,t,i){var n=i
if("string"==typeof n&&""!==n){var r=n.match("^[^?]+")
n=y(r,1)[0]}return this._buildMediaPlaybackErrorEventBeacon(e,t,n)}}])
return e}(),og={0:Um,1:Bm,2:Fm,3:jm,4:Vm,5:Hm},ug=function(e){d(i,e)
var t=g(i)
function i(e,n){var r,a=n.mediaUrn,s=n.trackingId,u=n.mediaHeader,l=n.onTrack,c=n.resetMediaRenderStartOnPause,d=void 0!==c&&c,h=n.primaryMediaTrackingId,p=n.suppressMediaRenderWhenOutOfViewport,f=void 0!==p&&p
o(this,i);(r=t.apply(this,arguments))._bufferId=0
r._resetMediaRenderStartOnPause=d
r._suppressMediaRenderWhenOutOfViewport=f
r.setState({mediaUrn:a,trackingId:s,mediaHeader:u,onTrack:l,primaryMediaTrackingId:h})
r.on(e,"sourceset",r._onSourceset)
r.on(e,"loadstart",r._onLoadStart)
r.on(e,"loadedmetadata",r._onLoadedMetadata)
r.on(e,"loadeddata",r._onLoadedData)
r.on(e,"play",r._onPlay)
r.on(e,"playing",r._onPlaying)
r.on(e,"pause",r._onPause)
r.on(e,"waiting",r._onWaiting)
r.on(e,"error",r._onError)
r.on(e,"dispose",r._onDispose)
r.on(e,"playerreset",r._onPlayerReset)
r.on(e,"autoplay-failure",r._onAutoplayFailure)
var m=r.player.textTracks()
m&&r.on(m,"addtrack",r._onAddTrack)
e.ready((function(){r.player.usingPlugin("playlist")&&r.on(e.playlist(),"itemchange",(function(e){var t=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).plugins
fp("rum must be updated on playlist item change",(void 0===t?{}:t).rum)}))}))
return r}l(i,[{key:"createNewSession",value:function(e){var t=e.mediaUrn,i=e.trackingId,n=e.primaryMediaTrackingId
this.setState({mediaUrn:t,trackingId:i,primaryMediaTrackingId:n})
this.tracker.setPrimaryMediaTrackingId(n)}},{key:"handleStateChanged",value:function(e){var t=e.changes
if(t.mediaUrn||t.trackingId){var i=this.state.mediaUrn,n=t.trackingId
fp("rum: mediaUrn is required when updating trackingId",i)
n&&n.from!==n.to&&this.player.generateTrackingId().setTrackingId(n.to)
this.tracker=new sg(this.player)
this.tracker.setObjectUrn(i)
this.tracker.setTrackingId(this.player.generateTrackingId().getTrackingId())}t.primaryMediaTrackingId&&this.tracker.setPrimaryMediaTrackingId(t.primaryMediaTrackingId.to)}},{key:"getEventHash",value:function(){return arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}}},{key:"_setInitializationStart",value:function(){if(!this._isInitializationStarted){this.tracker.setStaticMediaHeader(rg(this.player,this.state.mediaHeader))
this.tracker.initializationStart()
this._isInitializationStarted=!0}}},{key:"_setInitializationEnd",value:function(){if(!this._isInitializationEnded){this.tracker.initializationEnd()
this._isInitializationEnded=!0}}},{key:"_setMediaRenderStart",value:function(){if(!this._isMediaRenderStarted){this.tracker.mediaRenderStart()
this._isMediaRenderStarted=!0}}},{key:"_setMediaRenderEnd",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null
if(!this._isMediaRenderEnded){this._trigger(this.tracker.mediaRenderEnd(e))
this._isMediaRenderEnded=!0}}},{key:"_setBufferingStart",value:function(){if(!this._isBuffering){this._isBuffering=!0
this._bufferId++
var e=null
this.player.seeking()?e=Wm:this._hasPlayed||(e=qm)
this.tracker.bufferingStart(this._bufferId,{type:e})}}},{key:"_setBufferingEnd",value:function(){if(this._isBuffering){this.tracker.bufferingEnd(this._bufferId)
this._isBuffering=!1}}},{key:"_onSourceset",value:function(){this._reset()}},{key:"_onLoadStart",value:function(){"none"!==this.player.preload()&&this._setInitializationStart()}},{key:"_onLoadedMetadata",value:function(){var e=this.state.mediaHeader,t=(e=void 0===e?{}:e).mediaSource
this.tracker.setMediaLiveState(ag(t,this.player))}},{key:"_onLoadedData",value:function(){this._setInitializationStart()
this._setInitializationEnd()}},{key:"_onPlay",value:function(){this._setInitializationStart()
this._setMediaRenderStart()}},{key:"_onPause",value:function(){this._setBufferingEnd()
this._resetMediaRenderStartOnPause&&this._isMediaRenderStarted&&!this._isMediaRenderEnded&&(this._isMediaRenderStarted=!1)}},{key:"_onAutoplayFailure",value:function(){this._setBufferingEnd()}},{key:"_onPlaying",value:function(){this._hasPlayed=!0
this._setBufferingEnd()
if(!this._suppressMediaRenderWhenOutOfViewport||(e=this.player.el(),t=e.getBoundingClientRect(),i=t.top,n=t.left,r=t.bottom,a=t.right,s=window,o=s.innerWidth,u=s.innerHeight,(i>=0&&i<=u||r>=0&&r<=u)&&(n>=0&&n<=o||a>=0&&a<=o))){var e,t,i,n,r,a,s,o,u
this._setMediaRenderEnd(this._mediaRenderEndTime)}else this._mediaRenderEndTime=Dm()}},{key:"_onWaiting",value:function(){this._setBufferingStart()}},{key:"_onError",value:function(){this._setBufferingEnd()
var e=this.player.error(),t=this.player.currentSrc(),i=this.tracker.mediaPlaybackError(og[e.code],e.message,t)
this._trigger(i)}},{key:"_onAddTrack",value:function(e){var t=e.track
t&&"captions"===t.kind&&!this.player.options().html5.nativeTextTracks&&this.one(t,"loadeddata",this._onCaptionsLoad)}},{key:"_onCaptionsLoad",value:function(){var e=this.player.log.history().find((function(e){var t=y(e,3)[2]
return t&&"ParsingError"===t.name}))
if(e){var t=[].find.call(this.player.textTracks(),(function(e){return"captions"===e.kind})),i=this.tracker.mediaPlaybackError(Nm,e[2].message,t.src)
this._trigger(i)}}},{key:"_onPlayerReset",value:function(){this._reset()}},{key:"_onDispose",value:function(){this._reset()}},{key:"_trigger",value:function(e){var t=e.eventBody,i=e.eventName
this.trigger(i,t)
this.trigger("track",{eventName:i,eventData:t})
Lm(this.state,"onTrack",[i,t])}},{key:"_reset",value:function(){this._setBufferingEnd()
this._isInitializationStarted=!1
this._isInitializationEnded=!1
this._isBuffering=!1
this._isMediaRenderStarted=!1
this._isMediaRenderEnded=!1
this._hasPlayed=!1
this._mediaRenderEndTime=null}}])
return i}(ql.getPlugin("plugin"))
ql.registerPlugin("rum",ug)
var lg=Object.assign||function(e,t){Object.keys(t).forEach((function(i){e[i]=t[i]}))
return e},cg=ql.getPlugin("plugin"),dg={viewQuartile:.25,viewMidpoint:.5,viewThirdQuartile:.75,viewCompletion:.97},hg=Object.keys(dg),pg=function(e){d(i,e)
var t=g(i)
function i(e,n){var r,a=n.pageContext,s=n.onTrack
o(this,i)
r=t.apply(this,arguments)
fp("moat: pageContext is required field which must be a value referring to SponsoredVideoViewEvent.pageContext",a)
r.setState({pageContext:a,onTrack:s})
r._setInitialState()
r.on(e,"ended",r._onEnded)
r.on(e,"playing",r._onPlaying)
r.on(e,"pause",r._onPause)
r.on(e,"loadedmetadata",r._onLoadedMetadata)
r.on(e,"timeupdate",r._onTimeUpdate)
r.on(e,"playerreset",r._onPlayerreset)
r.on(e.playerInteraction(),"interact",r._onInteract)
return r}l(i,[{key:"getEventHash",value:function(){return arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}}},{key:"_setInitialState",value:function(){lg(this,{_elapsedPlaybackTime:0,_currentTime:0,_previousTime:0,_hasFiredViewVideo:!1,_hasFiredViewPlayStart:!1})}},{key:"_onInteract",value:function(e,t){var i,n,r=t.controlId,a=t.meta
switch(r){case df:i=this.player.paused()?"pauseVideo":"playVideo"
n="video_play_pause"
break
case cf:case Tf:i="playVideo"
n="video_thumbnail_play"
break
case af:i="playVideo"
n="video_toolbar_play_pause"
break
case sf:i="pauseVideo"
n="video_toolbar_play_pause"
break
case hf:i="fullscreenVideo"
n="video_toolbar_fullscreen_toggle"
break
case pf:i="unfullscreenVideo"
n="video_toolbar_fullscreen_toggle"
break
case yf:i="seekVideo"
n="video_toolbar_scrubber"
break
case of:i="replayVideo"
n="video_toolbar_replay"}i&&n&&this.fireVideoActionEvent(i,n,a)}},{key:"_didSeekOccur",value:function(){return Math.abs(this._currentTime-this._previousTime)>2}},{key:"_maybeFireViewVideoEvent",value:function(){var e=this
this._hasFiredViewVideo||this._elapsedPlaybackTime>2&&this.fireVideoViewEvent("viewVideo",(function(){e._hasFiredViewVideo=!0
e._elapsedPlaybackTime=0}))}},{key:"_trigger",value:function(e,t,i){this.trigger(e,lg(t,i))
this.trigger("track",{eventName:e,eventData:t,meta:i})
Lm(this.state,"onTrack",[e,t,i])}},{key:"_onEnded",value:function(){this.fireVideoViewEvent("viewFullCompletion")}},{key:"_onPause",value:function(){this.resetElapsedPlaybackTime()}},{key:"_onPlaying",value:function(){var e=this
this._hasFiredViewPlayStart||this.fireVideoViewEvent("viewPlayStart",(function(){e._hasFiredViewPlayStart=!0}))}},{key:"_onLoadedMetadata",value:function(){this.computeThresholds()}},{key:"_onTimeUpdate",value:function(){this.updateCurrentPlayerPosition()}},{key:"_onPlayerreset",value:function(){this._setInitialState()}},{key:"computeThresholds",value:function(){var e=1e3*this.player.duration()
this._thresholds=hg.reduce((function(t,i){var n=dg[i]
t[i]=Math.floor(n*e)
return t}),{})}},{key:"fireElapsedThresholdEvents",value:function(){var e=this
if(this._thresholds){var t=Math.floor(1e3*this._previousTime),i=Math.floor(1e3*this._currentTime)
hg.forEach((function(n){var r=e._thresholds[n]
t<r&&i>=r&&e.fireVideoViewEvent(n)}))}}},{key:"fireVideoViewEvent",value:function(e,t){var i=!this.player.muted()&&this.player.volume()>0,n=this.player.duration()
if(n){var r={videoDuration:1e3*n,isVideoAudible:i,videoUIContext:this.state.pageContext,timestamp:Date.now()}
this._trigger("viewEvent",{eventName:e,trackingParams:r})
"function"==typeof t&&t()}}},{key:"fireVideoActionEvent",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}
this._trigger("actionEvent",{actionName:e,controlName:t,timestamp:Date.now()},i)}},{key:"updateCurrentPlayerPosition",value:function(){this._previousTime=this._currentTime||0
this._currentTime=this.player.currentTime()||0
if(this._didSeekOccur())this.resetElapsedPlaybackTime()
else{this._elapsedPlaybackTime+=this._currentTime-this._previousTime
this._maybeFireViewVideoEvent()
this.fireElapsedThresholdEvents()}}},{key:"resetElapsedPlaybackTime",value:function(){this._elapsedPlaybackTime=0}}])
return i}(cg)
ql.registerPlugin("moat",pg)
var fg={PLAYER_ASK_TO_PLAY_EVENT:"PlayerAskToPlayEvent",PLAYER_BEACON_EVENT:"PlayerBeaconEvent",PLAYER_PLAY_PAUSE_EVENT:"PlayerPlayPauseEvent",PLAYER_PLAYBACK_EXIT_EVENT:"PlayerPlaybackExitEvent",PLAYER_PLAYBACK_STALL_EVENT:"PlayerPlaybackStallEvent",PLAYER_SEEK_EVENT:"PlayerSeekEvent",MULTIVARIANT_PLAYLIST_FETCHED_EVENT:"MultivariantPlaylistFetchedEvent",MEDIA_PLAYLIST_FETCHED_EVENT:"MediaPlaylistFetchedEvent",SEGMENT_FETCHED_EVENT:"SegmentFetchedEvent"},mg={AUTOPLAY_ON_LOAD:"AUTOPLAY_ON_LOAD",DISALLOW_BACKGROUND_PLAYBACK:"DISALLOW_BACKGROUND_PLAYBACK",ENTERED_VIEWPORT:"ENTERED_VIEWPORT",EXITED_VIEWPORT:"EXITED_VIEWPORT",USER_TRIGGERED:"USER_TRIGGERED",VIDEO_PRIORITY_CHANGED:"VIDEO_PRIORITY_CHANGED",VIDEO_AUTOLOOPED:"VIDEO_AUTOLOOPED"},gg={ENTERED_VIEWPORT:"ENTERED_VIEWPORT",USER_TRIGGERED:"USER_TRIGGERED",AUTO_TRIGGERED:"AUTO_TRIGGERED",UNKNOWN:"UNKNOWN"},vg="ERROR",yg="END",_g="PLAYING",bg="STALLING",Tg="UNKNOWN",Sg="ENDED",kg="STARTED",Eg="ON",Cg="OFF",wg="NOT_MEASURED",Ig={CAPTIONS_ON_CONTROL:!0,CAPTIONS_OFF_CONTROL:!0,MENU_CAPTIONS_ON_CONTROL:!0,MENU_CAPTIONS_OFF_CONTROL:!0},Pg="LOCAL",xg="BROWSER_CACHE",Ag="CDN_CACHE_HIT",Og="CDN_CACHE_MISS",Lg="UNKNOWN",Dg="timing-allow-origin",Rg="x-cache",Mg="x-cdn",Ng=ql.getPlugin("plugin"),Ug=[3e3,7e3,2e4,3e4],Bg=function(e){d(n,e)
var t=g(n)
function n(e,i){var r,a=i.mediaUrn,s=i.trackingId,u=i.mediaHeader,l=i.onTrack,c=i.primaryMediaTrackingId
o(this,n)
r=t.apply(this,arguments)
fp("tracking: playerInteraction plugin is required",e.hasPlugin("playerInteraction"))
r._qualityLevels=e.qualityLevels()
r._hasRenderedFirstFrame=!1
r._isPlaying=!1
r._isStalled=!1
r._isCcVisible=Cg
r._volume=r._getVolume()
r._fullscreenState=r._getFullScreenState()
r._isVisible=null
r._pauseReason=null
r._playReason=null
r._staticMediaHeader=null
r._currentPlaylist=null
r._currentTime=0
r._currentBeaconInterval=null
r._multivariantPlaylistDetails={}
r._mediaPlaylistDetails={}
r._firstSegmentDetails={}
r.setState({mediaUrn:a,trackingId:s,mediaHeader:u,onTrack:l,primaryMediaTrackingId:c})
var d=r._onUnload.bind(f(r)),h=Op(r._onSeeked,300),p=Op(r._onVolumeChange,300)
r.on(e.playerInteraction(),"interact",r._onPlayerInteraction)
r.on(e,"fullscreenchange",r._onFullscreenChange)
r.on(e,"pause",r._onPause)
r.on(e,"play",r._onPlay)
r.on(e,"error",r._onError)
r.on(e,"playing",r._onPlaying)
r.on(e,"timeupdate",r._onTimeupdate)
r.on(e,"ratechange",r._onRateChange)
r.on(e,"seeked",h)
r.on(e,"seeking",r._onSeeking)
r.on(e,"volumechange",p)
r.on(e,"waiting",r._onWaiting)
r.on(e,"sourceset",r._onSourceSet)
r.on(e,"playerreset",r._onPlayerReset)
r.on(e,"loadstart",r._onLoadStart)
r.one(e,"loadedmetadata",r._onLoadedMetadata)
r.one(e,"play",r._onFirstPlayOfSource)
r._isFetchRequestFiringEnabled=e.xhrHooks().enabled
r._isFetchRequestFiringEnabled&&r.on(e.xhrHooks(),"response",r._onXhrResponse)
var m="onpagehide"in window?"pagehide":"beforeunload"
window.addEventListener(m,d)
r.on("dispose",(function(){window.removeEventListener(m,d)
h.clear()
p.clear()}))
e.ready((function(){var t=e.playerVisibility()
t.ready((function(){r._isVisible=t.isVisible()
r.on(t,"visibilityChange",r._onVisibilityChange)}))
e.usingPlugin("playlist")&&r.on(e.playlist(),"itemchange",(function(e){var t=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).plugins
fp("tracking must be updated on playlist item change",(void 0===t?{}:t).tracking)}))}))
return r}l(n,[{key:"getEventHash",value:function(){return arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}}},{key:"_getPlaybackExitState",value:function(){if(this.player.ended())return yg
if(this._isStalled)return bg
var e=this._pauseReason
return e?[mg.DISALLOW_BACKGROUND_PLAYBACK,mg.USER_TRIGGERED,mg.EXITED_VIEWPORT,mg.VIDEO_PRIORITY_CHANGED].includes(e)?_g:Tg:_g}},{key:"setPauseReason",value:function(e){fp("tracking: A valid reason must be supplied to setPauseReason",mg[e])
this._pauseReason=e}},{key:"setPlayReason",value:function(e){fp("tracking: A valid reason must be supplied to setPlayReason",mg[e])
this._playReason=e}},{key:"createNewSession",value:function(e){var t=e.mediaUrn,i=e.trackingId,n=e.primaryMediaTrackingId
this.setState({mediaUrn:t,trackingId:i,primaryMediaTrackingId:n})}},{key:"handleStateChanged",value:function(e){var t=e.changes
if(t.mediaUrn||t.trackingId){var i=this.state.mediaUrn,n=t.trackingId
fp("tracking: mediaUrn is required when updating trackingId",i)
this.stopBeaconPolling()
n&&n.from!==n.to&&this.player.generateTrackingId().setTrackingId(n.to)
this._mediaTrackingObject={objectUrn:i,trackingId:this.player.generateTrackingId().getTrackingId()}
this._userInteracted=!1
this._previousTimeElapsed=0
this._playbackRate=null}t.primaryMediaTrackingId&&(this._primaryMediaTrackingId=t.primaryMediaTrackingId.to)}},{key:"getPlayerState",value:function(){var e=this._qualityLevels[this._qualityLevels.selectedIndex],t=e?e.bitrate:this.player.currentSource().bitRate
this._playbackRate||(this._playbackRate=this.player.playbackRate())
var i={bitrate:t||null,casting:wg,ccVisible:this._isCcVisible,downloaded:wg,fullScreen:this._fullscreenState,isAudioOnly:!1,isPlaying:this._isPlaying,isVisible:this._isVisible,length:this._getDuration(),speed:this._playbackRate,timeElapsed:this._currentTime,volume:this._volume,mediaUrl:this._currentPlaylist||this.player.currentSrc()},n=this.state.mediaHeader,r=(n=void 0===n?{}:n).mediaSource
i.mediaLiveState=ag(r,this.player)
var a=ig(this.player),s=this._getVhsPlaylistLoader()
if(a&&s){var o
i.mediaInstanceId=null===(o=s.media())||void 0===o?void 0:o.attributes.NAME}return i}},{key:"startBeaconPolling",value:function(){this._isPolling=!0
this._currentTime=this.player.currentTime()
this._currentBeaconInterval=Ug[0]
this._fireBeaconEvent()}},{key:"restartBeaconPolling",value:function(){this._isPolling&&this.startBeaconPolling()}},{key:"stopBeaconPolling",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0]
if(this._isPolling){this._isPolling=!1
this._currentBeaconInterval=null
e&&this._fireBeaconEvent()
this._lastBeaconTime=null}}},{key:"checkBeaconProgress",value:function(){this._currentTime=this.player.currentTime()
if((this._currentTime-(this._lastBeaconTime||0))/this._playbackRate*1e3>=this._currentBeaconInterval){this._fireBeaconEvent()
this._currentBeaconInterval=Ug[Ug.indexOf(this._currentBeaconInterval)+1]||Ug[Ug.length-1]}}},{key:"dispose",value:function(){this.stopBeaconPolling()
this._isStalled&&this._endStall()
v(h(n.prototype),"dispose",this).call(this)}},{key:"setIsCcVisible",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0]
this._isCcVisible=e?Eg:Cg}},{key:"_resetFirstAskToPlay",value:function(){this._firstAskToPlayTime=null
this.off(this.player,"play",this._onFirstPlayOfSource)
this.one(this.player,"play",this._onFirstPlayOfSource)}},{key:"_resetHlsStateProperties",value:function(){this._multivariantPlaylistDetails={}
this._mediaPlaylistDetails={}
this._firstSegmentDetails={}}},{key:"_onPlayerReset",value:function(){this._playReason=null
this._pauseReason=null
this._staticMediaHeader=null
this._currentTime=0
this._isStalled&&this._endStall()
this._hasRenderedFirstFrame=!1
this._resetFirstAskToPlay()
this._resetHlsStateProperties()}},{key:"_onSegmentMetadataChange",value:function(){this._setSegmentMetadata()}},{key:"_setSegmentMetadata",value:function(){var e=this._metadataTrack&&this._metadataTrack.activeCues[0]
if(e&&e.value){var t=this.player.tech().vhs.representations().find((function(t){return t.id===e.value.playlist}))
this._currentPlaylist=t&&t.playlist&&t.playlist.resolvedUri}}},{key:"_onLoadedMetadata",value:function(){this._metadataTrack=this.player.textTracks().tracks_.find((function(e){return"segment-metadata"===e.label}))
if(this._metadataTrack){this._setSegmentMetadata()
this.on(this._metadataTrack,"cuechange",this._onSegmentMetadataChange)}}},{key:"_onLoadStart",value:function(){this._getMediaHeader()}},{key:"_onFirstPlayOfSource",value:function(){this._firstAskToPlayTime=Dm()
this._triggerFetchedEventsIfNecessary()}},{key:"_onPlay",value:function(){this._isPlaying=!0
this._volume=this._getVolume()
this._trigger(fg.PLAYER_PLAY_PAUSE_EVENT,{mediaTrackingObject:this._mediaTrackingObject,mediaHeader:this._getMediaHeader(),reason:this._playReason||mg.USER_TRIGGERED,state:this.getPlayerState(),createdTime:Date.now()})
this._trigger(fg.PLAYER_ASK_TO_PLAY_EVENT,{mediaTrackingObject:this._mediaTrackingObject,mediaHeader:this._getMediaHeader(),reason:(e=this._playReason,gg[e]||gg.AUTO_TRIGGERED),createdTime:Date.now()})
var e
this._playReason=null}},{key:"_onPlaying",value:function(){this._isPlaying=!0
this._playbackRate=this.player.playbackRate()
this._hasRenderedFirstFrame=!0
this._isStalled&&this._endStall()
this._isPolling||this.startBeaconPolling()}},{key:"_onError",value:function(){this._firePlaybackExitEvent(vg)
this._isStalled&&this._endStall()}},{key:"_onPause",value:function(){this._isPlaying=!1
this._trigger(fg.PLAYER_PLAY_PAUSE_EVENT,{mediaTrackingObject:this._mediaTrackingObject,mediaHeader:this._getMediaHeader(),reason:this._pauseReason||mg.USER_TRIGGERED,state:this.getPlayerState(),createdTime:Date.now()})
this._firePlaybackExitEvent(this._getPlaybackExitState())
this._isStalled&&this._endStall()
this._pauseReason=null
this.stopBeaconPolling()}},{key:"_endStall",value:function(){this._isStalled=!1
this._firePlaybackStallEvent(Sg)}},{key:"_firePlaybackExitEvent",value:function(e){this._trigger(fg.PLAYER_PLAYBACK_EXIT_EVENT,{mediaTrackingObject:this._mediaTrackingObject,mediaHeader:this._getMediaHeader(),state:e||Tg,createdTime:Date.now()})}},{key:"_firePlaybackStallEvent",value:function(e){this._trigger(fg.PLAYER_PLAYBACK_STALL_EVENT,{mediaTrackingObject:this._mediaTrackingObject,mediaHeader:this._getMediaHeader(),playerState:this.getPlayerState(),stallState:e,createdTime:Date.now()})}},{key:"_onWaiting",value:function(){this._isPlaying=!1
if(!this._isStalled&&this._hasRenderedFirstFrame&&!this._isSeeking){this._isStalled=!0
this._firePlaybackStallEvent(kg)}this.stopBeaconPolling()}},{key:"_onSourceSet",value:function(){this._isPlaying=!1
this.stopBeaconPolling()
this._hasRenderedFirstFrame=!1
this._resetFirstAskToPlay()
this._resetHlsStateProperties()
this._isStalled&&this._endStall()}},{key:"_onVolumeChange",value:function(){this.restartBeaconPolling()
this._volume=this._getVolume()}},{key:"_onFullscreenChange",value:function(){this.restartBeaconPolling()
this._fullscreenState=this._getFullScreenState()}},{key:"_onRateChange",value:function(){this.restartBeaconPolling()
this._playbackRate=this.player.playbackRate()}},{key:"_onSeeking",value:function(){this._isSeeking=!0
this._isStalled&&this._endStall()}},{key:"_onTimeupdate",value:function(){this._isSeeking||this.player.seeking()||(this._previousTimeElapsed=this.player.currentTime())
this.player.seeking()||this.player.paused()||!this._isPolling||this.checkBeaconProgress()}},{key:"_onSeeked",value:function(){this._trigger(fg.PLAYER_SEEK_EVENT,{mediaTrackingObject:this._mediaTrackingObject,mediaHeader:this._getMediaHeader(),previousTimeElapsed:this._previousTimeElapsed,state:this.getPlayerState(),createdTime:Date.now()})
this._isSeeking=!1}},{key:"_onPlayerInteraction",value:function(e,t){var i=t.controlId
this._userInteracted=!0
Ig[i]&&this.restartBeaconPolling()}},{key:"_onUnload",value:function(){this.stopBeaconPolling()}},{key:"_onVisibilityChange",value:function(e,t){var i=t.isVisible
this.restartBeaconPolling()
this._isVisible=i}},{key:"_persistXhrResponseDetails",value:function(e){var t=e.vhsPlaylistLoader,n=e.xhr,r=e.performanceStartTime,a=e.performanceEndTime,s=e.responseSource,o=new URL(n.uri,window.location).href,u={fileSize:n.bytesReceived,performanceStartTime:r,performanceEndTime:a,responseSource:s},l=t.master
l&&[{details:this._multivariantPlaylistDetails,doesXhrMatch:function(){return l.uri===o}},{details:this._mediaPlaylistDetails,doesXhrMatch:function(){var e
return(null===(e=t.media())||void 0===e?void 0:e.resolvedUri)===o}},{details:this._firstSegmentDetails,doesXhrMatch:function(){var e
return null===(e=t.media())||void 0===e?void 0:e.segments.find((function(e){return e.resolvedUri===o}))}}].forEach((function(e){var t=e.details,a=e.doesXhrMatch
!t.performanceEndTime&&a()&&(n.aborted||n.status<200||n.status>299?t.performanceStartTime=t.performanceStartTime||r:Object.assign(t,i(i({},u),{},{performanceStartTime:t.performanceStartTime||r})))}))}},{key:"_triggerFetchedEventsIfNecessary",value:function(){var e=this
this._isFetchRequestFiringEnabled&&this._firstAskToPlayTime&&[{details:this._multivariantPlaylistDetails,eventName:fg.MULTIVARIANT_PLAYLIST_FETCHED_EVENT},{details:this._mediaPlaylistDetails,eventName:fg.MEDIA_PLAYLIST_FETCHED_EVENT},{details:this._firstSegmentDetails,eventName:fg.SEGMENT_FETCHED_EVENT}].forEach((function(t){var n=t.details,r=t.eventName
if(n.performanceEndTime&&!n.hasTriggeredFetchedEvent){var a,s,o,u,l,c,d,h,p,f,m=(a=i(i({},n),{},{firstAskToPlayTime:e._firstAskToPlayTime}),s=a.fileSize,o=a.performanceStartTime,u=a.performanceEndTime,l=a.responseSource,c=a.firstAskToPlayTime,h=(d=u<=c||l===Pg||l===xg)||l===Lg?null:l===Ag,p=u-o,f=function(e){var t,i,n,r,a=e.firstAskToPlayTime,s=e.performanceStartTime,o=e.performanceEndTime
return o<=a?0:(i=(t={time:a,startTime:s,endTime:o}).time,n=t.startTime,r=t.endTime,i&&i>n&&i<r?o-a:o-s)}({firstAskToPlayTime:c,performanceStartTime:o,performanceEndTime:u}),{fileSize:s,fetchDuration:p,perceivedFetchDuration:f,wasPreloaded:d,wasCdnCacheHit:h})
e._trigger(r,{mediaTrackingObject:e._mediaTrackingObject,mediaHeader:e._getMediaHeader(),playerState:e.getPlayerState(),mediaFetchObject:m})
n.hasTriggeredFetchedEvent=!0}}))}},{key:"_getVhsPlaylistLoader",value:function(){var e=this.player.tech(!0).vhs
return null==e?void 0:e.playlists}},{key:"_onXhrResponse",value:function(e,t){var i=t.xhr,n=t.performanceStartTime,r=t.performanceEndTime,a=t.responseSource,s=this._getVhsPlaylistLoader()
if(s&&!this._firstSegmentDetails.performanceEndTime){this._persistXhrResponseDetails({vhsPlaylistLoader:s,xhr:i,performanceStartTime:n,performanceEndTime:r,responseSource:a})
this._triggerFetchedEventsIfNecessary()}}},{key:"_runBeaconInterval",value:function(e){var t=this,i=this.getPlayerState().timeElapsed
if(i===this._beaconTimeElapsed&&e>0)this.stopBeaconPolling(!1)
else{this._beaconTimeElapsed=i
var n=Ug[Ug.indexOf(e)+1]||Ug[Ug.length-1]
this._fireBeaconEvent()
this._beaconPoll=this.player.setTimeout((function(){return t._runBeaconInterval(n)}),n)}}},{key:"_cancelBeaconInterval",value:function(){if(this._beaconPoll){this.player.clearTimeout(this._beaconPoll)
this._beaconPoll=null}}},{key:"_fireBeaconEvent",value:function(){var e,t=nm(this._lastBeaconTime)?this._lastBeaconTime:this._currentTime
e=Math.round((this._currentTime-t)/this._playbackRate*1e3)
this._lastBeaconTime=this._currentTime
this._trigger(fg.PLAYER_BEACON_EVENT,{mediaTrackingObject:this._mediaTrackingObject,mediaHeader:this._getMediaHeader(),isAutoplaying:this._isAutoplaying(),timeSinceLastBeacon:e,state:this.getPlayerState(),createdTime:Date.now()})}},{key:"_isAutoplaying",value:function(){return!this._userInteracted&&!!this.player.autoplay()}},{key:"_getFullScreenState",value:function(){return this.player.isFullscreen()?Eg:Cg}},{key:"_getDuration",value:function(){var e=this.player.duration()
return e&&isFinite(e)?e:0}},{key:"_getVolume",value:function(){return this.player.muted()?0:Math.round(100*this.player.volume())}},{key:"_getMediaHeader",value:function(){this._staticMediaHeader=this._staticMediaHeader||rg(this.player,this.state.mediaHeader)
return ng({staticMediaHeader:this._staticMediaHeader,player:this.player,primaryMediaTrackingId:this._primaryMediaTrackingId})}},{key:"_trigger",value:function(e,t,i){this.trigger(e,t)
this.trigger("track",{eventName:e,eventData:t,meta:i})
Lm(this.state,"onTrack",[e,t,i])}}])
return n}(Ng)
ql.registerPlugin("tracking",Bg)
var Fg=function(e){d(i,e)
var t=g(i)
function i(e){var n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=r.allowUnmutedBackgroundPlayback,s=void 0!==a&&a,u=r.visibilityChangeDelay,l=void 0===u?1e3:u
o(this,i)
n=t.apply(this,arguments)
fp("playbackAudit: tracking plugin is required",e.hasPlugin("tracking"))
n._isVisible=null
n._checkVisibilityTimer=null
n._allowUnmutedBackgroundPlayback=s
n._visibilityChangeDelay=l
n.on(e,"timeupdate",n._onTimeupdate)
n.on(e,"pause",n._onPause)
n.on(e,"playerreset",n._onPlayerreset)
e.ready((function(){var t=e.playerVisibility()
t.ready((function(){n._isVisible=t.isVisible()
n.on(t,"visibilityChange",n._onVisibilityChange)}))}))
return n}l(i,[{key:"_isMuted",value:function(){return this.player.muted()||0===this.player.volume()}},{key:"_shouldPause",value:function(){return!this._isVisible&&!this.player.paused()&&!this.player.isFullscreen()&&(!this._allowUnmutedBackgroundPlayback||this._isMuted())}},{key:"_clearVisibilityTimer",value:function(){this.player.clearTimeout(this._checkVisibilityTimer)
this._checkVisibilityTimer=null}},{key:"_onVisibilityChange",value:function(e,t){var i=t.isVisible
this._isVisible=i
i&&this._clearVisibilityTimer()}},{key:"_onPlayerreset",value:function(){this._clearVisibilityTimer()}},{key:"_onPause",value:function(){this._clearVisibilityTimer()}},{key:"_onTimeupdate",value:function(){var e=this
!this._checkVisibilityTimer&&this._shouldPause()&&(this._checkVisibilityTimer=this.player.setTimeout((function(){if(e._shouldPause()){e.player.tracking().setPauseReason(mg.DISALLOW_BACKGROUND_PLAYBACK)
e.player.pause()}e._clearVisibilityTimer()}),this._visibilityChangeDelay))}}])
return i}(ql.getPlugin("plugin"))
ql.registerPlugin("playbackAudit",Fg)
var jg=function(e){d(i,e)
var t=g(i)
function i(e){var n,r=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).onInteract
o(this,i);(n=t.apply(this,arguments))._registeredControls={}
n.setState({onInteract:r})
e.ready((function(){n._attachControlEventListeners()}))
return n}l(i,[{key:"registerControl",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}
fp("playerInteraction: A valid control el must be supplied to the `registerControl` method",e)
fp("playerInteraction: A controlId must be supplied to the `registerControl` method",t)
this._registeredControls[t]||(this._registeredControls[t]=lg({el:e},i))}},{key:"unregisterControl",value:function(e){delete this._registeredControls[e]}},{key:"_attachControlEventListeners",value:function(){this.on(this.player,["click"],this._onInteraction)
var e=this.player.getDescendant("controlBar","volumePanel","volumeControl"),t=this.player.getDescendant("controlBar","progressControl","seekBar"),i=this.player.getDescendant("controlBar","captionsMenuToggle")
e&&this.on(e,["mouseup"],this._onInteraction)
t&&this.on(t,["click"],this._onInteraction)
i&&this.on(i,["captionMenuItemSelected"],this._onCaptionsMenuItemSelected)}},{key:"_onCaptionsMenuItemSelected",value:function(e,t){var i,n=t.el()
n.matches($p)||n.matches(Jp)?i=gf:n.matches(Zp)&&(i=vf)
this._triggerInteract(i)}},{key:"_onInteraction",value:function(e){var t=this._getControlId(e)
t&&this._triggerInteract(t,{isUserInitiated:e.isTrusted})}},{key:"_getControlId",value:function(e){var t=this,i=e.target,n=e.currentTarget
return i.matches(Kp)?this.player.muted()?uf:lf:i.matches(Xp)?this.player.isFullscreen()?pf:hf:i.matches(Hp)?af:i.matches(qp)?sf:i.matches(Wp)?of:i.matches(Yp)?ff:i.matches(Qp)?mf:i.matches(zp)?cf:i.matches(Gp)?df:i.matches(nf)?bf:n.matches(ef)?yf:n.matches(tf)?_f:i.matches(rf)?Tf:Object.keys(this._registeredControls).find((function(e){var n=t._registeredControls[e]
return i===n.el}))}},{key:"_triggerInteract",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
this.trigger("interact",{controlId:e,meta:t})
Lm(this.state,"onInteract",[e,t])}}])
return i}(ql.getPlugin("plugin"))
ql.registerPlugin("playerInteraction",jg)
var Vg=function(e){d(i,e)
var t=g(i)
function i(e){var n
o(this,i);(n=t.apply(this,arguments))._background=e.addChild("PosterBackground")
n.on(e,"sourceset",n._onSourceSet)
return n}l(i,[{key:"_onSourceSet",value:function(){var e=this.player.tech().el()
this.player.el().insertBefore(this._background.el(),e)}}])
return i}(ql.getPlugin("plugin"))
ql.registerPlugin("posterBackground",Vg)
var Hg=ql.getComponent("ModalDialog"),qg=ql.mergeOptions,Wg="vjs-screen-active",Gg=function(e){d(i,e)
var t=g(i)
function i(e){var n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=r.id,s=r.classNames
o(this,i);(n=t.apply(this,arguments))._player=e
n.addClass("vjs-screen")
a&&n.contentEl().setAttribute("id",a);(s||[]).forEach((function(e){n.setAttribute("class",e)}))
n.fill()
n.on("modalopen",n._onOpen)
n.on("modalclose",n._onClose)
return n}l(i,[{key:"_onOpen",value:function(){this._player.addClass(Wg)
this.trigger("show")}},{key:"_onClose",value:function(){this._player.removeClass(Wg)
this.trigger("hide")}}])
return i}(Hg)
Gg.prototype.options_=qg(Hg.prototype.options_,{uncloseable:!0,pauseOnOpen:!0,temporary:!1})
ql.registerComponent("Screen",Gg)
var zg=function(e){d(i,e)
var t=g(i)
function i(e){var n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
o(this,i);(n=t.apply(this,arguments))._player=e
n._options=r
n.screen=n._createScreen()
n.on(n._player,"play",n._onPlay)
n.on(n._player,"sourceset",n._onSourceset)
n.on("dispose",n._onDispose)
n._player.ready((function(){n.screen&&n.screen.open()}))
return n}l(i,[{key:"_createScreen",value:function(){var e=this,t=new Gg(this._player,this._options)
t.content()
t.addClass("vjs-start-screen")
t.on(["show","hide"],(function(t){e.trigger(t.type,{screen:e.screen})}))
this._player.addChild(t)
return t}},{key:"_onPlay",value:function(){this.screen.close()}},{key:"_onSourceset",value:function(){this.screen.open()}},{key:"_onDispose",value:function(){this._player.removeChild(this.screen)
this.screen=null}}])
return i}(ql.getPlugin("plugin"))
ql.registerPlugin("startScreen",zg)
var Kg=function(e){d(i,e)
var t=g(i)
function i(e){var n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
o(this,i);(n=t.apply(this,arguments))._player=e
n.screen=n._createScreen(r)
n.on(n._player,"ended",n._onEnded)
n.on(n._player,"play",n._onPlay)
n.on(n._player,"sourceset",n._onSourceset)
n.on(n._player,"playerreset",n._onPlayerreset)
n.on("dispose",n._onDispose)
n.enable()
return n}l(i,[{key:"enable",value:function(){this._isEnabled=!0
this._isEnded&&this.screen.open()}},{key:"disable",value:function(){this._isEnabled=!1
this._isEnded&&this.screen.close()}},{key:"enabled",value:function(){return this._isEnabled}},{key:"_createScreen",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=t.id,n=t.classNames,r=t.closeable,a=void 0===r||r,s=new Gg(this._player,{id:i,classNames:n,uncloseable:!a})
s.addClass("vjs-end-screen")
s.on(["show","hide"],(function(t){e.trigger(t.type,{screen:e.screen})}))
this._player.addChild(s)
return s}},{key:"_onEnded",value:function(){this._isEnded=!0
!this._player.loop()&&this.enabled()&&this.screen.open()}},{key:"_onPlay",value:function(){this._isEnded=!1
this.screen.close()}},{key:"_onSourceset",value:function(){this._isEnded=!1
this.screen.close()}},{key:"_onPlayerreset",value:function(){this._isEnded=!1
this.screen.close()}},{key:"_onDispose",value:function(){this._player.removeChild(this.screen)
this.screen=null}}])
return i}(ql.getPlugin("plugin"))
ql.registerPlugin("endScreen",Kg)
var Xg=function(e){d(i,e)
var t=g(i)
function i(e,n){var r
o(this,i);(r=t.apply(this,arguments))._player=e
r._options=n
r.screen=r._createScreen()
r._player.ready((function(){r._disableErrorDisplay()}))
r.on(r._player,"error",r._onError)
r.on(r._player,"play",r._onPlay)
r.on(r._player,"sourceset",r._onSourceset)
r.on(r._player,"playerreset",r._onPlayerreset)
r.on("dispose",r._onDispose)
return r}l(i,[{key:"_createScreen",value:function(){var e=this,t=new Gg(this._player,this._options)
t.addClass("vjs-error-screen")
t.on(["show","hide"],(function(t){e.trigger(t.type,{screen:e.screen,error:e._player.error()})}))
this._player.addChild(t)
return t}},{key:"_disableErrorDisplay",value:function(){var e=this._player.getChild("errorDisplay")
e&&e.dispose()}},{key:"_onError",value:function(){this.screen.open()}},{key:"_onPlay",value:function(){this.screen.close()}},{key:"_onSourceset",value:function(){this.screen.close()}},{key:"_onPlayerreset",value:function(){this.screen.close()}},{key:"_onDispose",value:function(){this._player.removeChild(this.screen)
this.screen=null}}])
return i}(ql.getPlugin("plugin"))
ql.registerPlugin("errorScreen",Xg)
var Yg=ql.getComponent("Component"),Qg=function(e){d(i,e)
var t=g(i)
function i(e,n){var r
o(this,i);(r=t.call(this,e,n))._player=e
return r}l(i,[{key:"createControl",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=new Yg(this._player)
e.id&&t.setAttribute("id",e.id)
e.className&&t.setAttribute("class",e.className)
t.addClass("vjs-control")
return this._player.getChild("controlBar").addChild(t,{},e.index)}}])
return i}(ql.getPlugin("plugin"))
ql.registerPlugin("customControl",Qg)
var $g="video_toolbar_mute_unmute",Jg="video_toolbar_fullscreen_toggle",Zg="video_toolbar_closed_caption_toggle",ev={PLAY_CONTROL:"video_toolbar_play_pause",PAUSE_CONTROL:"video_toolbar_play_pause",REPLAY_CONTROL:"video_toolbar_replay",MUTE_CONTROL:$g,UNMUTE_CONTROL:$g,FULLSCREEN_CONTROL:Jg,UNFULLSCREEN_CONTROL:Jg,PROGRESS_SCRUBBER_CONTROL:"video_toolbar_scrubber",VOLUME_SLIDER_CONTROL:"video_toolbar_volume_slider",BACK_TO_START_CONTROL:"video_toolbar_back_to_start",THEATER_MODE_CONTROL:"video_toolbar_theater_mode",PLAY_OVERLAY_CONTROL:"video_thumbnail_play",POSTER_CONTROL:"video_thumbnail_play",CAPTIONS_ON_CONTROL:Zg,CAPTIONS_OFF_CONTROL:Zg,MENU_CAPTIONS_ON_CONTROL:Zg,MENU_CAPTIONS_OFF_CONTROL:Zg,PLAYBACK_RATE_CONTROL:"video_settings_playback_speed",SKIP_BACK_CONTROL:"video_skip_back",SKIP_AHEAD_CONTROL:"video_skip_ahead"},tv="SHORT_PRESS",iv="DRAG",nv="SWIPE_RIGHT",rv="SWIPE_LEFT",av=function(e){d(i,e)
var t=g(i)
function i(e){var n,r=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).onTrack
o(this,i);(n=t.apply(this,arguments)).setState({onTrack:r})
fp("control-interaction: playerInteraction plugin is required",e.hasPlugin("playerInteraction"))
n.on(e.playerInteraction(),"interact",n._onPlayerInteraction)
n.on(e,"volumechange",n._onVolumechange)
return n}l(i,[{key:"_onPlayerInteraction",value:function(e,t){var i=t.controlId,n=ev[i]
mp("media-player: control-interaction: controlId ".concat(i," was registered with the playerInteraction plugin but no associated control name was found."),n)
if(n){var r,a={controlName:n}
i===_f?r=this._previousVolume<this._currentVolume?nv:rv:i===yf&&(r=iv)
r&&(a.eventInfo={interactionType:r})
this.fireControlInteractionEvent(a)}}},{key:"_onVolumechange",value:function(){var e=this.player.volume()
this._previousVolume=Number.isNaN(this._currentVolume)?e:this._currentVolume
this._currentVolume=e}},{key:"fireControlInteractionEvent",value:function(e){var t=e.controlName,i=e.eventInfo,n=(void 0===i?{}:i).interactionType||tv
fp("controlInteraction: controlName must be a property on eventData",t)
this.trigger("track",e)
Lm(this.state,"onTrack",[t,n])}}])
return i}(ql.getPlugin("plugin"))
ql.registerPlugin("controlInteraction",av)
var sv=ql.getPlugin("plugin"),ov=ql.mergeOptions,uv={namespace:void 0,disableCaching:void 0},lv="media-player-prefs",cv="rate",dv="volume",hv="muted",pv=function(e){d(i,e)
var t=g(i)
function i(e,n){var r
o(this,i)
r=t.apply(this,arguments)
var a=ov(uv,n).namespace
r._disableCaching=n.disableCaching
r._key=a?"".concat(a,":").concat(lv):lv
r.one(r.player,"loadstart",r._onLoadStart)
r.player.ready((function(){r.on(r.player,"ratechange",r._onRatechange)
r.on(r.player,"volumechange",r._onVolumechange)}))
return r}l(i,[{key:"set",value:function(e,t){if(!this._cache||this._cache[e]!==t){var i=ov(this._cache,c({},e,t))
try{this.localStorage.setItem(this._key,JSON.stringify(i))}catch(e){}this._cache=i}}},{key:"save",value:function(e){try{this.localStorage.setItem(this._key,JSON.stringify(e))}catch(e){}}},{key:"get",value:function(e){if(this._cache&&!this._disableCaching)return this._cache[e]
try{var t=this.localStorage.getItem(this._key)
this._cache=t?JSON.parse(t):{}}catch(e){this._cache={}}return this._cache[e]}},{key:"_onLoadStart",value:function(){this._setInitialRate()
this._setInitialVolume()}},{key:"_onRatechange",value:function(){this.player.isResetting()||this.set(cv,this.player.playbackRate())}},{key:"_onVolumechange",value:function(){if(!this.player.isResetting()){this.set(hv,this.player.muted())
this.set(dv,this.player.volume())}}},{key:"_setInitialVolume",value:function(){var e=this.get(dv),t=this.get(hv)
nm(e)&&this.player.volume(e)
nm(t)&&!nm(this.player.options_.muted)&&this.player.muted(t)}},{key:"_setInitialRate",value:function(){var e=this.get(cv),t=this.player.getChild("controlBar").getChild("playbackRateMenuButton")
if(e&&t&&t.playbackRates().indexOf(e)>-1){this.player.defaultPlaybackRate(e)
this.player.playbackRate(e)}}}])
return i}(sv)
if(k)try{pv.prototype.localStorage=window.localStorage}catch(R_){}ql.registerPlugin("userPreferences",pv)
var fv=function(e){d(i,e)
var t=g(i)
function i(e){var n
o(this,i);(n=t.apply(this,arguments)).on(e,"play",n._onPlay)
n.on(e,"pause",n._onPause)
n.on(e,"ended",n._onEnded)
return n}l(i,[{key:"_onPlay",value:function(){this.setText("Pause tooltip")}},{key:"_onPause",value:function(){this.setText("Play tooltip")}},{key:"_onEnded",value:function(){this.setText("Replay tooltip")}}],[{key:"getDefaultText",value:function(){return"Play tooltip"}}])
return i}(Wf)
ql.registerComponent("PlayToggleTooltip",fv)
var mv=function(e){d(i,e)
var t=g(i)
function i(e){var n
o(this,i);(n=t.apply(this,arguments)).on(e,"fullscreenchange",n._onFullscreenchange)
return n}l(i,[{key:"_onFullscreenchange",value:function(){this.player.isFullscreen()?this.setText("Exit fullscreen tooltip"):this.setText("Fullscreen tooltip")}}],[{key:"getDefaultText",value:function(){return"Fullscreen tooltip"}}])
return i}(Wf)
ql.registerComponent("FullscreenToggleTooltip",mv)
var gv=function(e){d(i,e)
var t=g(i)
function i(e){var n,r=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).control
o(this,i);(n=t.apply(this,arguments)).on(r,"activate",n._onActivate)
n.on(r,"deactivate",n._onDeactivate)
return n}l(i,[{key:"_onActivate",value:function(){this.setText("Hide captions tooltip")}},{key:"_onDeactivate",value:function(){this.setText("Show captions tooltip")}}],[{key:"getDefaultText",value:function(){return"Show captions tooltip"}}])
return i}(Wf)
ql.registerComponent("CaptionsToggleTooltip",gv)
var vv=function(e){d(i,e)
var t=g(i)
function i(){o(this,i)
return t.apply(this,arguments)}l(i,null,[{key:"getDefaultText",value:function(){return"Captions Menu tooltip"}}])
return i}(Wf)
ql.registerComponent("CaptionsMenuToggleTooltip",vv)
var yv=function(e){d(i,e)
var t=g(i)
function i(){o(this,i)
return t.apply(this,arguments)}l(i,null,[{key:"getDefaultText",value:function(){return"Skip back tooltip"}}])
return i}(Wf)
ql.registerComponent("SkipBackTooltip",yv)
var _v=function(e){d(i,e)
var t=g(i)
function i(){o(this,i)
return t.apply(this,arguments)}l(i,null,[{key:"getDefaultText",value:function(){return"Skip ahead tooltip"}}])
return i}(Wf)
ql.registerComponent("SkipAheadTooltip",_v)
var bv=function(e){d(i,e)
var t=g(i)
function i(){o(this,i)
return t.apply(this,arguments)}l(i,null,[{key:"getDefaultText",value:function(){return"Back to start tooltip"}}])
return i}(Wf)
ql.registerComponent("BackToStartTooltip",bv)
var Tv=function(e){d(i,e)
var t=g(i)
function i(e){var n,r=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).control
o(this,i);(n=t.apply(this,arguments)).on(r,"activate",n._onActivate)
n.on(r,"deactivate",n._onDeactivate)
return n}l(i,[{key:"_onActivate",value:function(){this.setText("Deactivate theater mode tooltip")}},{key:"_onDeactivate",value:function(){this.setText("Activate theater mode tooltip")}}],[{key:"getDefaultText",value:function(){return"Activate theater mode tooltip"}}])
return i}(Wf)
ql.registerComponent("TheaterModeTooltip",Tv)
var Sv=function(e){d(i,e)
var t=g(i)
function i(){o(this,i)
return t.apply(this,arguments)}l(i,null,[{key:"getDefaultText",value:function(){return"Previous tooltip"}}])
return i}(Wf)
ql.registerComponent("PreviousTooltip",Sv)
var kv=function(e){d(i,e)
var t=g(i)
function i(){o(this,i)
return t.apply(this,arguments)}l(i,null,[{key:"getDefaultText",value:function(){return"Next tooltip"}}])
return i}(Wf)
ql.registerComponent("NextTooltip",kv)
var Ev=function(e){d(i,e)
var t=g(i)
function i(){o(this,i)
return t.apply(this,arguments)}l(i,null,[{key:"getDefaultText",value:function(){return"Settings tooltip"}}])
return i}(Wf)
ql.registerComponent("SettingsMenuTooltip",Ev)
var Cv=function(e){d(i,e)
var t=g(i)
function i(){o(this,i)
return t.apply(this,arguments)}l(i,null,[{key:"getDefaultText",value:function(){return"Playback speed tooltip"}}])
return i}(Wf)
ql.registerComponent("PlaybackRateMenuTooltip",Cv)
var wv=ql.getPlugin("plugin"),Iv=ql.getComponent("ControlTooltip"),Pv={PlayToggle:fv,SkipBackButton:yv,SkipAheadButton:_v,BackToStartButton:bv,TheaterModeButton:Tv,PreviousButton:Sv,NextButton:kv,CaptionsToggle:gv,"CaptionsMenuToggle.CaptionsMenuToggle":vv,FullscreenToggle:mv,"SettingsMenuButton.SettingsMenuButton":Ev,"PlaybackRateMenuButton.PlaybackRateMenuButton":Cv},xv=function(e){d(i,e)
var t=g(i)
function i(e){var n
o(this,i);(n=t.apply(this,arguments))._player=e
e.ready((function(){n._controlBar=e.getChild("controlBar")
n._controls=n._controlBar.children()
n._middleIndex=n._getMiddleIndex()
Object.keys(Pv).forEach((function(e){var t=Pv[e]
fp("tooltip: The tooltip class must provide a getDefaultText method","function"==typeof t.getDefaultText)
var i=n._controlBar.getDescendant(e.split("."))
if(i){var r=i,a=e.split(".")
a.length>1&&(r=n._controlBar.getChild(a[0]))
n.addTooltip(i,{side:n._getSide(r),TooltipClass:t})}}))
n._middleIndex=null}))
return n}l(i,[{key:"addTooltip",value:function(e,t){var i=t.side,n=t.TooltipClass,r=void 0===n?Iv:n,a=new r(this._player,{control:e,side:i,text:r.getDefaultText()})
e.addChild(a)}},{key:"_getSide",value:function(e){var t=this._middleIndex||this._getMiddleIndex()
if(t){return this._controls.indexOf(e)>t?Hf:Vf}return null}},{key:"_getMiddleIndex",value:function(){var e=this._controlBar.getChild("CustomControlSpacer"),t=e&&this._controls.indexOf(e)
return t>-1?t:null}}])
return i}(wv)
ql.registerPlugin("controlTooltips",xv)
var Av=function(e){d(i,e)
var t=g(i)
function i(e){var n,r=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).autoplay,a=void 0===r||r
o(this,i);(n=t.apply(this,arguments))._autoplay=a
e.ready((function(){var t=e.getDescendant("controlBar","nextButton"),i=e.getDescendant("controlBar","previousButton")
t&&n.on(t,"next",(function(){n.next({autoplay:a&&!e.paused()})}))
i&&n.on(i,"previous",(function(){n.previous({autoplay:a&&!e.paused()})}))
n.on(e,"ended",n._onEnded)}))
return n}l(i,[{key:"previous",value:function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).autoplay
this.player.options({autoplay:!!e&&"play"})
this.trigger("previous")}},{key:"next",value:function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).autoplay
this.player.options({autoplay:!!e&&"play"})
this.trigger("next")}},{key:"setCurrentItem",value:function(e){var t=this,i=e.source,n=e.autoplay,r=e.plugins,a=void 0===r?{}:r,s=e.poster,o=e.tracks
fp("playlist setCurrentItem(): source is required",i)
this.player.paused()||this.player.pause()
this.player.reset()
nm(n)&&this.player.options({autoplay:n})
Object.keys(a).forEach((function(e){t.player[e]().setState(a[e])}))
this.player.poster(s)
this.player.src(i)
Array.isArray(o)&&o.forEach((function(e){var i=e.label,n=e.srclang,r=e.src
t.player.addRemoteTextTrack({kind:"captions",label:i,srclang:n,src:r})}))
this.trigger("itemchange",e)}},{key:"_onEnded",value:function(){var e=this.player,t=e.getDescendant("controlBar","settingsMenuButton"),i=t&&t.menu.getChild("autoplaySetting"),n=!i||i.selected(),r=this._autoplay&&n&&!e.loop()
this.trigger("ended",{autoplay:r,next:this.next.bind(this)})}}])
return i}(ql.getPlugin("plugin"))
ql.registerPlugin("playlist",Av)
ql.registerPlugin("disableContextMenu",(function(){this.on("contextmenu",(function(e){e.preventDefault()}))}))
var Ov=ql.getPlugin("plugin"),Lv=function(e){d(i,e)
var t=g(i)
function i(e,n){var r,a=n.topBufferSize,s=void 0===a?5:a
o(this,i);(r=t.apply(this,arguments))._topBufferSize=s
r.on(e,"ready",r._onReady)
r.on(e,"dispose",r._onDispose)
return r}l(i,[{key:"_onReady",value:function(){var e=this
this._controlBar=this.player.getChild("controlBar")
this._controlBarResizeObserver=new ResizeObserver((function(){e._setMaxHeight()}))
this._controlBarResizeObserver.observe(this._controlBar.el())}},{key:"_setMaxHeight",value:function(){if(this._controlBar&&this._controlBar.el()){var e=this.player.el().getBoundingClientRect().top,t=this._controlBar.children().find((function(e){return null!==e.el().offsetParent}))
if(t){var i=t.el().getBoundingClientRect().top,n=Math.abs(e-i)-this._topBufferSize
this._controlBar.el().querySelectorAll(".vjs-slider-vertical").forEach((function(e){e.parentElement.style.maxHeight="".concat(n,"px")}))
this.trigger("heightchange")}}}},{key:"_onDispose",value:function(){this._controlBarResizeObserver&&this._controlBarResizeObserver.unobserve(this._controlBar.el())}}])
return i}(Ov)
ql.registerPlugin("verticalSliderMaxHeight",Lv)
ql.registerPlugin("throwErrors",(function(){var e=ql.log.error
ql.log.error=function(){for(var t=arguments.length,i=new Array(t),n=0;n<t;n++)i[n]=arguments[n]
if(i[0]instanceof Error)throw i[0]
e.apply(e,i)}}))
var Dv=function(e){d(i,e)
var t=g(i)
function i(e,n){var r,a=n.checkInterval,s=void 0===a?1e3:a
o(this,i);(r=t.apply(this,arguments)).setRateRanges()
r.on(e,"playbackrateschange",r.setRateRanges)
r.on(e,"ratechange",r.restrictRate)
r.on(e,"timeupdate",function(e,t){fp("throttle requires a wait time",t&&!Number.isNaN(t))
var i=window.performance.now()
return function(){var n=window.performance.now()
if(n-i>=t){e.apply(void 0,arguments)
i=n}}}((function(){return r.restrictRate()}),s))
return r}l(i,[{key:"setRateRanges",value:function(){var e=this.player.playbackRates()
this.maxRate=!!e.length&&Math.max.apply(Math,_(e))
this.minRate=!!e.length&&Math.min.apply(Math,_(e))}},{key:"restrictRate",value:function(){if(!1!==this.maxRate&&!1!==this.minRate){var e=this.player.tech(!0).el().playbackRate
e>this.maxRate&&this.player.playbackRate(this.maxRate)
e<this.minRate&&this.player.playbackRate(this.minRate)}}}])
return i}(ql.getPlugin("plugin"))
ql.registerPlugin("restrictPlaybackRate",Dv)
ql.registerPlugin("useMercado",(function(){this.addClass("media-player--use-mercado")}))
var Rv=function(e){d(i,e)
var t=g(i)
function i(e){var n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=r.rootMargin,s=r.threshold,u=void 0===s?0:s
o(this,i)
n=t.apply(this,arguments)
if(!k)return m(n)
n._threshold=u
n._isInViewport=null
n._isDocumentVisible=!document.hidden
var l=n._onDocumentVisibilityChange.bind(f(n))
document.addEventListener("visibilitychange",l)
var c=new window.IntersectionObserver(n._onInViewportChange.bind(f(n)),{rootMargin:a,threshold:u})
c.observe(e.el())
n.on(e,"dispose",(function(){document.removeEventListener("visibilitychange",l)
c.disconnect()
c=void 0}))
return n}l(i,[{key:"ready",value:function(e){this._isReady?e():this.on("ready",e)}},{key:"isVisible",value:function(){fp("player-visibility: isVisible should not be called before `ready`",this._isReady)
return this._isVisible}},{key:"isInViewport",value:function(){fp("player-visibility: isInViewport should not be called before `ready`",this._isReady)
return this._isInViewport}},{key:"isDocumentVisible",value:function(){return this._isDocumentVisible}},{key:"_onInViewportChange",value:function(e){var t=this
e.forEach((function(e){var i=e.isIntersecting,n=e.intersectionRatio
t._isInViewport=i&&n>=t._threshold}))
this._setIsVisible()
if(this._isReady)this.trigger("inViewportChange",{isInViewport:this._isInViewport})
else{this._isReady=!0
this.trigger("ready")}}},{key:"_onDocumentVisibilityChange",value:function(){this._isDocumentVisible=!document.hidden
this._setIsVisible()
this.trigger("documentVisibilityChange",{isDocumentVisible:this._isDocumentVisible})}},{key:"_setIsVisible",value:function(){var e=this._isVisible
this._isVisible=this._isDocumentVisible&&this._isInViewport
this._isReady&&this._isVisible!==e&&this.trigger("visibilityChange",{isVisible:this._isVisible,isDocumentVisible:this._isDocumentVisible,isInViewport:this._isInViewport})}}])
return i}(ql.getPlugin("plugin"))
ql.registerPlugin("playerVisibility",Rv)
var Mv=ql.getPlugin("plugin"),Nv=["ready","loadstart","loadeddata","loadedmetadata","canplay","autoplay-success","autoplay-failure"],Uv=function(e){d(i,e)
var t=g(i)
function i(e){var n
o(this,i);(n=t.apply(this,arguments)).Promise=e.options().Promise||window.Promise
n._setupEventPromises()
n.on(e,"playerreset",n._onReset)
return n}l(i,[{key:"waitForEvent",value:function(e){fp("lifecycle: Must be a supported event",Nv.includes(e))
return this._eventPromises[e]}},{key:"_setupEventPromises",value:function(){var e=this
this._eventPromises={}
Nv.forEach((function(t){e._eventPromises[t]=new e.Promise((function(i){e.one(e.player,t,i)
e.one(e.player,"playerreset",(function(){e.off(e.player,t,i)}))}))}))}},{key:"_onReset",value:function(){this._setupEventPromises()}}])
return i}(Mv)
ql.registerPlugin("lifecycle",Uv)
var Bv=ql.getPlugin("plugin"),Fv="vjs-is-playing",jv=function(e){d(i,e)
var t=g(i)
function i(e){var n
o(this,i);(n=t.apply(this,arguments))._poster=null
n.on(e,"play",n._onPlay)
n.on(e,"pause",n._onPause)
n.on(e,"playerreset",n._onReset)
n.one(e,"loadstart",(function(){n.on(e,"posterchange",n._onPosterChange)
n.on(e,"autoplay-failure",n._onAutoplayFailure)}))
return n}l(i,[{key:"_onPlay",value:function(){this.player.addClass(Fv)}},{key:"_onPause",value:function(){this.player.removeClass(Fv)}},{key:"_onReset",value:function(){this._poster=null
this.player.autoplay()||this.player.removeClass(Fv)}},{key:"_onPosterChange",value:function(){var e=this.player.poster()
if(e&&this.player.autoplay()&&e!==this._poster){this._poster=e
this.player.poster("")}}},{key:"_onAutoplayFailure",value:function(){if(this._poster){this.player.poster(this._poster)
this._poster=null}}}])
return i}(Bv)
ql.registerPlugin("smoothMediaChange",jv)
ql.registerPlugin("menuOverflow",(function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=t.offset,n=void 0===i?80:i,r=t.maxHeight
this.on(["ready","playerresize","loadedmetadata"],(function(){var t=e.el().querySelectorAll(".vjs-menu-button-popup .vjs-menu-content"),i=e.currentHeight()
t.forEach((function(e){e.setAttribute("tabindex","-1")
var t=Math.max(i-n,24)
r&&(t=Math.min(t,r))
e.style.maxHeight="".concat(t,"px")}))}))}))
var Vv=ql.getPlugin("plugin"),Hv=function(e){d(i,e)
var t=g(i)
function i(e){var n
o(this,i)
n=t.apply(this,arguments)
e.options({liveTracker:{liveTolerance:2}})
n.on(e,"play",n._onPlay)
n.on(e,"pause",n._onPause)
n.on(e,"ended",n._onEnded)
return n}l(i,[{key:"_onPlay",value:function(){this.player.liveTracker&&this.player.liveTracker.isLive()&&this._maintainLiveEdge()}},{key:"_onPause",value:function(){this.player.clearTimeout(this._maintainLiveEdgeTimeout)}},{key:"_onEnded",value:function(){this.player.clearTimeout(this._maintainLiveEdgeTimeout)
this._startedPlaybackDuringLive=!1}},{key:"_maintainLiveEdge",value:function(){this.player.liveTracker.liveCurrentTime()-this.player.currentTime()>2&&this.player.liveTracker.seekToLiveEdge()
this._maintainLiveEdgeTimeout=this.player.setTimeout(this._maintainLiveEdge.bind(this),1e3)}},{key:"dispose",value:function(){this.player.clearTimeout(this._maintainLiveEdgeTimeout)
v(h(i.prototype),"dispose",this).call(this)}}])
return i}(Vv)
ql.registerPlugin("maintainLiveEdge",Hv)
var qv,Wv=function(e){d(i,e)
var t=g(i)
function i(e){var n,r=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).events,a=void 0===r?["tap","click","keydown"]:r
o(this,i);(n=t.apply(this,arguments)).on(e,a,(function(e){if(!e.isTrusted){e.preventDefault()
e.stopPropagation()}}))
return n}return l(i)}(ql.getPlugin("plugin"))
ql.registerPlugin("disableScriptInteraction",Wv)
ql.registerPlugin("setAriaLiveToOff",(function(){var e=this
this.ready((function(){e.el().querySelectorAll(".vjs-control-text[aria-live=polite]").forEach((function(e){ql.browser.IS_ANDROID||ql.browser.IS_WINDOWS||e.setAttribute("aria-live","off")}))}))}))
var Gv=new Uint8Array(16)
function zv(){if(!qv&&!(qv="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported")
return qv(Gv)}var Kv=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i
for(var Xv=[],Yv=0;Yv<256;++Yv)Xv.push((Yv+256).toString(16).substr(1))
function Qv(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=(Xv[e[t+0]]+Xv[e[t+1]]+Xv[e[t+2]]+Xv[e[t+3]]+"-"+Xv[e[t+4]]+Xv[e[t+5]]+"-"+Xv[e[t+6]]+Xv[e[t+7]]+"-"+Xv[e[t+8]]+Xv[e[t+9]]+"-"+Xv[e[t+10]]+Xv[e[t+11]]+Xv[e[t+12]]+Xv[e[t+13]]+Xv[e[t+14]]+Xv[e[t+15]]).toLowerCase()
if(!function(e){return"string"==typeof e&&Kv.test(e)}(i))throw TypeError("Stringified UUID is invalid")
return i}function $v(e,t,i){var n=(e=e||{}).random||(e.rng||zv)()
n[6]=15&n[6]|64
n[8]=63&n[8]|128
if(t){i=i||0
for(var r=0;r<16;++r)t[i+r]=n[r]
return t}return Qv(n)}var Jv=function(e){d(i,e)
var t=g(i)
function i(e){var n
o(this,i);(n=t.apply(this,arguments))._sourceSet=!1
n.generateNewTrackingId()
n.on(e,"sourceset",(function(t){if(n._sourceSet){var i=t.src||""
i.length&&n._isSrcInCurrentSources(i,e.currentSources())||n.generateNewTrackingId()}else n._sourceSet=!0}))
return n}l(i,[{key:"generateNewTrackingId",value:function(){this.trackingId=$v()}},{key:"getTrackingId",value:function(){return this.clientTrackingId||this.trackingId}},{key:"setTrackingId",value:function(e){this.clientTrackingId=e}},{key:"_isSrcInCurrentSources",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]
return t.length>1&&t.find((function(t){return t.src.length&&e.indexOf(t.src)>-1}))}}])
return i}(ql.getPlugin("plugin"))
ql.registerPlugin("generateTrackingId",Jv)
var Zv=function(e){d(r,e)
var t,i=g(r)
function r(e,t){var n
o(this,r);(n=i.call(this,e,t))._player=e
n._animationUri=t.animationUri
n._animationSvg=null
n._fetchAnimationUri()
n.on(n._player,"play",n._onPlay)
n.on(n._player,"pause",n._onPause)
return n}l(r,[{key:"_onPlay",value:function(){if(this._background)this._background.unpauseAnimation()
else{this._background=this._player.addChild("AudioAnimatedBackground")
this._background.setAnimation(this._animationSvg)
this._background.on(["tap","click"],this._handlePlayPauseToggle.bind(this))}}},{key:"_onPause",value:function(){var e
null===(e=this._background)||void 0===e||e.pauseAnimation()}},{key:"_handlePlayPauseToggle",value:function(){this._player.paused()?this._player.play():this._player.pause()}},{key:"_fetchAnimationUri",value:(t=s(n().mark((function e(){var t=this
return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:fetch(this._animationUri).then((function(e){return"image/svg+xml"===e.headers.get("content-type")?e.text():null})).then((function(e){var i=(new DOMParser).parseFromString(e,"image/svg+xml"),n=null==i?void 0:i.querySelector("svg")
if(n){t._animationSvg=document.importNode(n,!0)
t._background&&t._background.setAnimation(t._animationSvg)}})).catch((function(){return null}))
case 1:case"end":return e.stop()}}),e,this)}))),function(){return t.apply(this,arguments)})}])
return r}(ql.getPlugin("plugin"))
ql.registerPlugin("audioAnimatedBackground",Zv)
var ey=function(e,t){if(!e.responseHeaders)return null
var i=t.toLowerCase(),n=Object.entries(e.responseHeaders).find((function(e){return y(e,1)[0].toLowerCase()===i}))
return n&&n[1]},ty=function(e){var t,i,n,r,a=(t=e.uri,null===(i=performance)||void 0===i||null===(n=i.getEntriesByName)||void 0===n||null===(r=n.call(i,t,"resource"))||void 0===r?void 0:r.pop())
return 304===(null==a?void 0:a.responseStatus)||0===(null==a?void 0:a.transferSize)},iy=function(e){return!!ey(e,Mg)},ny=function(e){return function(e){return"*"===ey(e,Dg)}(e)?ty(e)?xg:function(e){if(!iy(e))return!1
var t=ey(e,Rg)
return!(!t||"string"!=typeof t)&&t.toLowerCase().includes("hit")}(e)?Ag:iy(e)?Og:Lg:Lg},ry=ql.getPlugin("plugin"),ay=function(e,t,i){e.beforeRequest=function(e){!function(e,t,i){var n=Dm()
t?i.xhrHooksResponseCallback=function(t,i){e.trigger("response",{xhr:t,performanceStartTime:n,performanceEndTime:Dm(),responseSource:i?Pg:ny(t)})}:i.beforeSend=function(t){t.addEventListener("loadend",(function(){e.trigger("response",{xhr:t,performanceStartTime:n,performanceEndTime:Dm(),responseSource:ny(t)})}))}}(t,i,e)
return e}},sy=function(e){d(i,e)
var t=g(i)
function i(e){var n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
o(this,i);(n=t.apply(this,arguments)).enabled=r.enabled
if(!n.enabled)return m(n)
var a=f(n)
e.ready((function(){var t=ql.Vhs.xhr._fromWebMediaPrefetchingPlugin,i=new window.Proxy(e.tech(!0),{set:function(e,i,n){if("vhs"!==i){var r
return(r=window.Reflect).set.apply(r,arguments)}e[i]=function(e,t,i){return new window.Proxy(e,{set:function(e,n,r){var a
"xhr"===n&&ay(r,t,i)
return(a=window.Reflect).set.apply(a,arguments)}})}(n,a,t)
return!0}})
e.tech_=i}))
return n}return l(i)}(ry)
ql.registerPlugin("xhrHooks",sy)
var oy=function(e){d(i,e)
var t=g(i)
function i(e){var n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
o(this,i);(n=t.apply(this,arguments)).enabled=r.enabled
if(!n.enabled)return m(n)
e.ready((function(){var t,i=null===(t=e.xhrHooks)||void 0===t?void 0:t.call(e)
null!=i&&i.enabled&&i.on("response",(function(t,i){var r=i.xhr
if(ig(e)&&(!r.responseType||"text"===r.responseType)){var a=r.responseText
if(a){var s=ey(r,"content-type")
if((null==s?void 0:s.includes("application/dash+xml"))||a.trim().startsWith("<MPD")){var o=function(e){var t={}
try{var i=(new Vi).parseFromString(e,"application/xml"),n=i.getElementsByTagName("parsererror")
if(n&&n.length>0)return t
for(var r=i.getElementsByTagName("AdaptationSet"),a=[],s=0;s<r.length;s++){var o=r[s],u=o.getAttribute("contentType"),l=o.getAttribute("mimeType")
if(!(u&&"video"!==u||l&&!l.startsWith("video/"))){var c=o.getElementsByTagName("Representation")
if("video"===u||(null==l?void 0:l.startsWith("video/")))for(var d=0;d<c.length;d++)a.push(c[d])
else for(var h=0;h<c.length;h++){var p=c[h],f=p.getAttribute("mimeType")
f&&f.startsWith("video/")&&a.push(p)}}}a.forEach((function(e){var i=e.getAttribute("id"),n=e.getAttribute("qualityRanking")
if(i&&n){var r=parseInt(n,10)
isNaN(r)||(t[i]=r)}}))}catch(e){}return t}(a)
n._injectScoreWhenPlaylistsReady(o)}}}}))}))
return n}l(i,[{key:"_injectScoreWhenPlaylistsReady",value:function(e){var t=this
if(this._canInjectScore())this._injectScore(e)
else{this.on(this.player,"loadedmetadata",(function i(){if(t._canInjectScore()){t._injectScore(e)
t.off(t.player,"loadedmetadata",i)}}))}}},{key:"_canInjectScore",value:function(){var e,t,i,n,r=this.player.tech(!0),a=(null==r||null===(e=r.vhs)||void 0===e||null===(t=e.playlists)||void 0===t?void 0:t.master)||(null==r||null===(i=r.vhs)||void 0===i||null===(n=i.playlists)||void 0===n?void 0:n.main)
return!!(a&&a.playlists&&a.playlists.length>0)}},{key:"_injectScore",value:function(e){var t,i,n,r,a=this.player.tech(!0)
!function(e,t){e&&e.playlists&&t&&e.playlists.forEach((function(e){var i,n=null===(i=e.attributes)||void 0===i?void 0:i.NAME
if(n&&"number"==typeof t[n]){var r=1/(t[n]+1)
e.attributes||(e.attributes={})
e.attributes.SCORE=r}}))}((null==a||null===(t=a.vhs)||void 0===t||null===(i=t.playlists)||void 0===i?void 0:i.master)||(null==a||null===(n=a.vhs)||void 0===n||null===(r=n.playlists)||void 0===r?void 0:r.main),e)}}])
return i}(ql.getPlugin("plugin"))
ql.registerPlugin("dashScoreInjector",oy)
var uy=ql.getPlugin("plugin"),ly=function(e){d(i,e)
var t=g(i)
function i(e){var n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
o(this,i);(n=t.apply(this,arguments)).enabled=r.enabled
if(!n.enabled)return m(n)
e.ready((function(){e.on("pause",(function(){return function(e){var t,i=null===(t=e.tech(!0).vhs)||void 0===t?void 0:t.masterPlaylistController_
i&&[i.mainSegmentLoader_,i.audioSegmentLoader_,i.subtitleSegmentLoader_].forEach((function(e){if(e){e.abort()
e.pause()}}))}(e)}))
e.on("play",(function(){return function(e){var t,i=null===(t=e.tech(!0).vhs)||void 0===t?void 0:t.masterPlaylistController_
i&&i.load()}(e)}))}))
return n}return l(i)}(uy)
ql.registerPlugin("stopBufferingHlsOnPause",ly)
var cy=function(e){var t=e.getBoundingClientRect(),i=t.top,n=t.bottom,r=window.innerHeight
return i>=0&&i<r&&n<=window.innerHeight},dy=function(e){var t=e.getBoundingClientRect(),i=t.height
return t.top+i/2-window.innerHeight/2},hy=function(e,t){var i=e.player,n=t.player
if(!i.paused()&&n.paused())return-1
if(i.paused()&&!n.paused())return 1
var r=i.tech(!0).el_,a=n.tech(!0).el_,s=cy(r),o=cy(a)
if(s&&!o)return-1
if(!s&&o)return 1
if(s&&o)return 0
var u=dy(r),l=dy(a)
return u>=0&&l<0?-1:u<0&&l>=0?1:Math.abs(u)-Math.abs(l)},py=function(e){var t=e.duration()
if(t===1/0)return!1
if(!t)return!1
var i=e.buffered()
if(0===i.length)return!1
var n=i.end(i.length-1)
if(t-n<=.09)return!0
var r=e.tech(!0).vhs.masterPlaylistController_.goalBufferLength()
return n-e.currentTime()>=r},fy=function(e){if(0!==e.length){var t=ql.getAllPlayers().filter((function(e){return!e.paused()})),i=e.find((function(e){return!e.player.paused()}))
return t.length>0&&!i&&!t.every(py)?null:function(e){return e.sort(hy).at(0)}(e)}},my=function(){function e(){var t=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).allowMultipleActiveEntries,i=void 0!==t&&t
o(this,e)
this.entries=[]
this.activeEntries=[]
this.allowMultipleActiveEntries=i}l(e,[{key:"push",value:function(e){this.entries.push(e)
this.run()}},{key:"remove",value:function(e){var t=this.entries.indexOf(e)
t<0||this.entries.splice(t,1)}},{key:"run",value:function(){var e=this,t=fy(this.entries)
if(t&&(!this.activeEntries.length||this.allowMultipleActiveEntries&&!t.player.paused())){this.activeEntries.push(t)
this.remove(t)
var i=t.origXhr,n=t.options,r=t.callback,a=t.eventListeners,s=t.returnedRequestObjectProxyHandler,o=i(n,(function(i,n){r(i,n)
e.activeEntries.splice(e.activeEntries.indexOf(t),1)
e.run()}))
s.get=function(i,n){if("abort"===n)return function(){o.abort.apply(o)
e.activeEntries.splice(e.activeEntries.indexOf(t),1)
e.run()}
var r=o[n]
return"function"==typeof r?r.bind(o):r}
a.forEach((function(e){var t=e.event,i=e.callback
o.addEventListener(t,i)}))}}}])
return e}(),gy=ql.getPlugin("plugin"),vy=function(e,t,i){return new window.Proxy(e,{set:function(e,n,r){if("xhr"!==n){var a
return(a=window.Reflect).set.apply(a,arguments)}e[n]=function(e,t,i){return function(n,r){var a={origXhr:e,player:i,options:n,callback:r,eventListeners:[]},s={url:n.uri,uri:n.uri,abort:function(){t.remove(a)},addEventListener:function(e,t){a.eventListeners.push({event:e,callback:t})}},o={},u=new window.Proxy(s,o)
a.returnedRequestObjectProxyHandler=o
t.push(a)
return u}}(r,t,i)
return!0}})},yy=function(e){d(i,e)
var t=g(i)
function i(e){var n,r,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
o(this,i);(r=t.apply(this,arguments)).enabled=a.enabled
if(!r.enabled)return m(r)
null!==(n=ql.requestQueuePlugin)&&void 0!==n&&n.requestQueue||(ql.requestQueuePlugin={requestQueue:new my({allowMultipleActiveEntries:a.allowMultipleActiveEntries})})
var s=ql.requestQueuePlugin.requestQueue
e.on("play",(function(){return ql.requestQueuePlugin.requestQueue.run()}))
e.on("pause",(function(){return ql.requestQueuePlugin.requestQueue.run()}))
e.ready((function(){var t=new window.Proxy(e.tech(!0),{set:function(t,i,n){if("vhs"!==i){var r
return(r=window.Reflect).set.apply(r,arguments)}t[i]=vy(n,s,e)
return!0}})
e.tech_=t}))
return r}return l(i)}(gy)
ql.registerPlugin("requestQueue",yy)
var _y=ql.getPlugin("plugin"),by=function(e){var t=e.origVhs,i=e.player,n=e.viewportDistanceForLoading
return new window.Proxy(t,{set:function(e,t,r){var a
"masterPlaylistController_"===t&&function(e){var t=e.player,i=e.mpc,n=e.viewportDistanceForLoading,r=void 0===n?0:n,a=i.goalBufferLength.bind(i)
i.goalBufferLength=function(){return 0}
var s=new window.IntersectionObserver((function(e){e.forEach((function(e){if(e.isIntersecting){i.goalBufferLength=a
s.disconnect()}}))}),{rootMargin:"".concat(r,"px")})
s.observe(t.el())}({player:i,mpc:r,viewportDistanceForLoading:n})
return(a=window.Reflect).set.apply(a,arguments)}})},Ty=function(e){d(i,e)
var t=g(i)
function i(e){var n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
o(this,i);(n=t.apply(this,arguments)).enabled=r.enabled
if(!n.enabled)return m(n)
e.ready((function(){var t=new window.Proxy(e.tech(!0),{set:function(t,i,n){if("vhs"!==i){var a
return(a=window.Reflect).set.apply(a,arguments)}t[i]=by({origVhs:n,player:e,viewportDistanceForLoading:r.viewportDistanceForLoading})
return!0}})
e.tech_=t}))
return n}return l(i)}(_y)
ql.registerPlugin("delayedSegmentLoading",Ty)
var Sy=ql.getPlugin("plugin"),ky={VIDEO_LOAD_START:"video-load-start-UGC",VIDEO_LOAD_SUCCESS:"video-load-success-UGC",VIDEO_LOAD_FAILURE:"video-load-failure-UGC"},Ey={VIDEO_LOAD_START:"video-load-start-Ads",VIDEO_LOAD_SUCCESS:"video-load-success-Ads",VIDEO_LOAD_FAILURE:"video-load-failure-Ads"},Cy={VIDEO_LOAD_START:"video-load-start-Learning",VIDEO_LOAD_SUCCESS:"video-load-success-Learning",VIDEO_LOAD_FAILURE:"video-load-failure-Learning"},wy={VIDEO_LOAD_START:"video-load-start-Messaging",VIDEO_LOAD_SUCCESS:"video-load-success-Messaging",VIDEO_LOAD_FAILURE:"video-load-failure-Messaging"},Iy={VIDEO_LOAD_START:"video-load-start-Live",VIDEO_LOAD_SUCCESS:"video-load-success-Live",VIDEO_LOAD_FAILURE:"video-load-failure-Live"},Py=function(e){d(i,e)
var t=g(i)
function i(e){var n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
o(this,i)
n=t.apply(this,arguments)
var a=r.clientSensor,s=r.mediaSource,u=r.useOldGroupName
if(!a)return m(n)
var l=u?"media-infra":"media-player",c=function(e){if(!e||"string"!=typeof e)return null
switch(e.toLowerCase()){case"ugc":return ky
case"ads":return Ey
case"learning":return Cy
case"messaging":return wy
case"live_video":return Iy
default:return null}}(s)
if(!c)return m(n)
a.incrementMetricCounter({groupName:l,metricName:c.VIDEO_LOAD_START})
e.ready((function(){e.one("error",(function(){return a.incrementMetricCounter({groupName:l,metricName:c.VIDEO_LOAD_FAILURE})}))
e.one("loadedmetadata",(function(){return a.incrementMetricCounter({groupName:l,metricName:c.VIDEO_LOAD_SUCCESS})}))}))
return n}return l(i)}(Sy)
ql.registerPlugin("sensors",Py)
function xy(e){return e>=200&&e<=299}var Ay=ql.getPlugin("plugin"),Oy={},Ly=function(e){return[e.uri,e.responseType,e.headers&&e.headers.Range].filter((function(e){return void 0!==e})).join("|||||")},Dy=function(e){d(i,e)
var t=g(i)
function i(e){var n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
o(this,i);(n=t.apply(this,arguments))._enabled=r.enabled&&ql.Vhs
if(!n._enabled)return m(n)
if(ql.Vhs.xhr._fromXhrCachePlugin)return m(n)
n._overrideVhsXhr()
return n}l(i,[{key:"enabled",get:function(){return this._enabled}},{key:"_overrideVhsXhr",value:function(){ql.Vhs.xhr=function(e,t){var i=Oy[Ly(e)]
if(null!=i&&i.callbacks){i.callbacks.push(t)
return i.request}if(null!=i&&i.error||null==i||!i.response||!xy(i.response.statusCode))return ql.xhr(e,t)
var n=i.request,r=i.error,a=i.response
ql.log.debug("[XHR-CACHE] Retrieved cache result for: ".concat(n.url))
setTimeout((function(){return t(r,a)}))
return n}
ql.Vhs.xhr._fromXhrCachePlugin=!0}},{key:"requestAndCache",value:function(e,t){var i=Ly(e),n=Oy[i]
if(!n){var r=ql.xhr(e,(function(e,t){var n=Oy[i]
ql.log.debug("[XHR-CACHE] Caching result for: ".concat(r.url))
Oy[i]={request:r,error:e,response:t}
if(null!=n&&n.callbacks){n.callbacks.forEach((function(i){return i(e,t)}))
delete n.callbacks}}))
Oy[i]={request:r,callbacks:[t]}
return r}n.callbacks.push(t)}},{key:"clearCache",value:function(){Object.keys(Oy).forEach((function(e){return delete Oy[e]}))}}])
return i}(Ay)
ql.registerPlugin("xhrCache",Dy)
var Ry=/^(audio|video|application)\/(x-|vnd\.apple\.)?mpegurl/i,My=/^application\/dash\+xml/i
const Ny=function(e){const t={}
e.byterange&&(t.Range=function(e){let t
const i=e.offset
t="bigint"==typeof e.offset||"bigint"==typeof e.length?x.BigInt(e.offset)+x.BigInt(e.length)-x.BigInt(1):e.offset+e.length-1
return"bytes="+i+"-"+t}(e.byterange))
return t}
var Uy=1.2,By={mp4:/^(av0?1|avc0?[1234]|vp0?9|flac|opus|mp3|mp4a|mp4v|stpp.ttml.im1t)/,webm:/^(vp0?[89]|av0?1|opus|vorbis)/,ogg:/^(vp0?[89]|theora|flac|opus|vorbis)/,video:/^(av0?1|avc0?[1234]|vp0?[89]|hvc1|hev1|theora|mp4v)/,audio:/^(mp4a|flac|vorbis|opus|ac-[34]|ec-3|alac|mp3|speex|aac)/,text:/^(stpp.ttml.im1t)/,muxerVideo:/^(avc0?1)/,muxerAudio:/^(mp4a)/,muxerText:/a^/},Fy=function(e){void 0===e&&(e="")
return By.audio.test(e.trim().toLowerCase())}
const{createTimeRange:jy}=ql,Vy=function(e){return e.excludeUntil&&e.excludeUntil>Date.now()},Hy=function(e){const t=Vy(e)
return!e.disabled&&!t},qy=(e,t)=>!(!e&&!t||!e&&t||e&&!t)&&(e===t||(!(!e.id||!t.id||e.id!==t.id)||(!(!e.resolvedUri||!t.resolvedUri||e.resolvedUri!==t.resolvedUri)||!(!e.uri||!t.uri||e.uri!==t.uri)))),Wy=function(e,t){const i=e&&e.mediaGroups&&e.mediaGroups.AUDIO||{}
let n=!1
for(const e in i){for(const r in i[e]){n=t(i[e][r])
if(n)break}if(n)break}return!!n}
var Gy=Hy,zy=function(e){return e.disabled},Ky=function(e){return e.excludeUntil&&e.excludeUntil===1/0},Xy=e=>{if(!e||!e.playlists||!e.playlists.length){return Wy(e,(e=>e.playlists&&e.playlists.length||e.uri))}for(let t=0;t<e.playlists.length;t++){const i=e.playlists[t],n=i.attributes&&i.attributes.CODECS
if(n&&n.split(",").every((e=>Fy(e))))continue
if(!Wy(e,(e=>qy(i,e))))return!1}return!0}
const Yy=e=>ql.log.debug?ql.log.debug.bind(ql,"VHS:",`${e} >`):function(){},Qy=(Yy("CodecUtils"),Yy("PlaylistSelector")),$y=function(e){if(!e||!e.playlist)return
const t=e.playlist
return JSON.stringify({id:t.id,bandwidth:e.bandwidth,width:e.width,height:e.height,codecs:t.attributes&&t.attributes.CODECS||""})},Jy=function(e,t){if(!e)return""
const i=x.getComputedStyle(e)
return i?i[t]:""},Zy=function(e,t){const i=e.slice()
e.sort((function(e,n){const r=t(e,n)
return 0===r?i.indexOf(e)-i.indexOf(n):r}))}
const e_=function(){const e=this.useDevicePixelRatio&&x.devicePixelRatio||1
return function(e,t,i,n,r,a){if(!e)return
const s={bandwidth:t,width:i,height:n,limitRenditionByPlayerDimensions:r}
let o=e.playlists
if(Xy(e)){o=a.getAudioTrackPlaylists_()
s.audioOnly=!0}let u=o.map((e=>{let t
const i=e.attributes&&e.attributes.RESOLUTION&&e.attributes.RESOLUTION.width,n=e.attributes&&e.attributes.RESOLUTION&&e.attributes.RESOLUTION.height
t=e.attributes&&e.attributes.BANDWIDTH
t=t||x.Number.MAX_VALUE
return{bandwidth:t,width:i,height:n,playlist:e}}))
Zy(u,((e,t)=>e.bandwidth-t.bandwidth))
u=u.filter((e=>!Ky(e.playlist)))
let l=u.filter((e=>Gy(e.playlist)))
l.length||(l=u.filter((e=>!zy(e.playlist))))
const c=l.filter((e=>e.bandwidth*Uy<t))
let d=c[c.length-1]
const h=c.filter((e=>e.bandwidth===d.bandwidth))[0]
if(!1===r){const e=h||l[0]||u[0]
if(e&&e.playlist){let t="sortedPlaylistReps"
h&&(t="bandwidthBestRep")
l[0]&&(t="enabledPlaylistReps")
Qy(`choosing ${$y(e)} using ${t} with options`,s)
return e.playlist}Qy("could not choose a playlist with options",s)
return null}const p=c.filter((e=>e.width&&e.height))
Zy(p,((e,t)=>e.width-t.width))
const f=p.filter((e=>e.width===i&&e.height===n))
d=f[f.length-1]
const m=f.filter((e=>e.bandwidth===d.bandwidth))[0]
let g,v,y,_
if(!m){g=p.filter((e=>e.width>i||e.height>n))
v=g.filter((e=>e.width===g[0].width&&e.height===g[0].height))
d=v[v.length-1]
y=v.filter((e=>e.bandwidth===d.bandwidth))[0]}if(a.experimentalLeastPixelDiffSelector){const e=p.map((e=>{e.pixelDiff=Math.abs(e.width-i)+Math.abs(e.height-n)
return e}))
Zy(e,((e,t)=>e.pixelDiff===t.pixelDiff?t.bandwidth-e.bandwidth:e.pixelDiff-t.pixelDiff))
_=e[0]}const b=_||y||m||h||l[0]||u[0]
if(b&&b.playlist){let e="sortedPlaylistReps"
_?e="leastPixelDiffRep":y?e="resolutionPlusOneRep":m?e="resolutionBestRep":h?e="bandwidthBestRep":l[0]&&(e="enabledPlaylistReps")
Qy(`choosing ${$y(b)} using ${e} with options`,s)
return b.playlist}Qy("could not choose a playlist with options",s)
return null}(this.playlists.master,this.systemBandwidth,parseInt(Jy(this.tech_.el(),"width"),10)*e,parseInt(Jy(this.tech_.el(),"height"),10)*e,this.limitRenditionByPlayerDimensions,this.masterPlaylistController_)}
var t_=function(e){var t=new je
t.push(e)
t.end()
return t.manifest},i_=function(e){var t=t_(e.body)
t.resolvedUri=e.url
t.playlists.forEach((function(e){e.resolvedUri=tt(t.resolvedUri,e.uri)}))
return t},n_=function(e){var t=t_(e.body)
t.resolvedUri=e.url
t.segments.forEach((function(e){return function(e){var t=e.segment,i=e.playlistUri
t.resolvedUri=tt(i,t.uri)
t.key&&(t.key.resolvedUri=tt(i,t.key.uri))
t.map&&(t.map.resolvedUri=tt(i,t.map.uri))}({segment:e,playlistUri:t.resolvedUri})}))
return t},r_=function(e){var t=e.player,i=e.options
return new window.Promise((function(e){t.xhrCache().requestAndCache(i,(function(t,i){e(t?null:i)}))}))},a_=function(){var e=s(n().mark((function e(t){var i,r,a
return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i=t.player,r=t.uri
e.next=3
return r_({player:i,options:{uri:r}})
case 3:if((a=e.sent)&&xy(a.statusCode)&&a.body){e.next=6
break}throw new Error("Error prefetching multivariant playlist: ".concat(null==a?void 0:a.statusCode,", ").concat(null==a?void 0:a.body))
case 6:return e.abrupt("return",i_(a))
case 7:case"end":return e.stop()}}),e)})))
return function(t){return e.apply(this,arguments)}}(),s_=function(){var e=s(n().mark((function e(t){var r,a,s,o,u,l
return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=t.player,a=t.prefetchedMain
s=r.tech(!0),o=s.vhs
e.t0=e_
e.t1=i
e.t2=i({},o)
e.t3={}
e.t4={master:a}
e.t5={get systemBandwidth(){return o.systemBandwidth},playlists:e.t4}
e.t6=(0,e.t1)(e.t2,e.t3,e.t5)
if(!(u=e.t0.apply.call(e.t0,e.t6)).cached){e.next=12
break}return e.abrupt("return",u)
case 12:e.next=14
return r_({player:r,options:{uri:u.resolvedUri}})
case 14:if((l=e.sent)&&xy(l.statusCode)&&l.body){e.next=17
break}throw new Error("Error variant playlist: ".concat(null==l?void 0:l.statusCode,", ").concat(null==l?void 0:l.body))
case 17:u.segments=n_(l).segments
u.cached=!0
return e.abrupt("return",u)
case 20:case"end":return e.stop()}}),e)})))
return function(t){return e.apply(this,arguments)}}(),o_=function(){var e=s(n().mark((function e(t){var i,r,a,s
return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i=t.player,r=t.prefetchedVariant
if(!(a=r.segments[0]).cached){e.next=4
break}return e.abrupt("return",a)
case 4:e.next=6
return r_({player:i,options:(n=a,{uri:n.resolvedUri,headers:Ny(n),responseType:"arraybuffer"})})
case 6:if((s=e.sent)&&xy(s.statusCode)&&s.body){e.next=9
break}throw new Error("Error prefetching segment: ".concat(null==s?void 0:s.statusCode,", ").concat(null==s?void 0:s.body))
case 9:a.cached=!0
return e.abrupt("return",a)
case 11:case"end":return e.stop()}var n}),e)})))
return function(t){return e.apply(this,arguments)}}(),u_=function(e){d(r,e)
var t,i=g(r)
function r(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
o(this,r);(t=i.apply(this,arguments))._options=n
t._player=e
return t}l(r,[{key:"enabled",get:function(){return this._options.enabled&&this._player.xhrCache()&&this._player.xhrCache().enabled}},{key:"prefetchToFirstSegment",value:(t=s(n().mark((function e(t){var i,r,a,o,u,l,c,d=this
return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.enabled){e.next=2
break}return e.abrupt("return")
case 2:i=this._player
r=i.currentSource()
a=null==r?void 0:r.type.toLowerCase()
if(["hls","dash"].includes((h=a,Ry.test(h)?"hls":My.test(h)?"dash":"application/vnd.videojs.vhs+json"===h?"vhs-json":null))){e.next=7
break}return e.abrupt("return")
case 7:if(o=t.find((function(e){return e.type.toLowerCase()===(null==r?void 0:r.type.toLowerCase())}))){e.next=10
break}return e.abrupt("return")
case 10:u=!1
c=function(){var e=s(n().mark((function e(){var t
return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!u&&py(i)){e.next=2
break}return e.abrupt("return")
case 2:u=!0
e.prev=3
if(l){e.next=8
break}e.next=7
return a_({player:i,uri:o.src})
case 7:l=e.sent
case 8:if(py(i)){e.next=11
break}u=!1
return e.abrupt("return")
case 11:e.next=13
return s_({player:i,prefetchedMain:l})
case 13:t=e.sent
if(py(i)){e.next=17
break}u=!1
return e.abrupt("return")
case 17:e.next=19
return o_({player:i,prefetchedVariant:t})
case 19:e.next=25
break
case 21:e.prev=21
e.t0=e.catch(3)
ql.log.debug("[PREFETCH] Unable to prefetch, error:",e.t0)
d._player.off("timeupdate",c)
case 25:u=!1
case 26:case"end":return e.stop()}}),e,null,[[3,21]])})))
return function(){return e.apply(this,arguments)}}()
this._player.on("timeupdate",c)
this._player.one("sourceset",(function(){d._player.off("timeupdate",c)}))
case 14:case"end":return e.stop()}var h}),e,this)}))),function(e){return t.apply(this,arguments)})}])
return r}(ql.getPlugin("plugin"))
ql.registerPlugin("prefetch",u_)
var l_=function(){return window.mediaInfraWebMediaPrefetching},c_=function(e){var t={method:e.method,headers:e.headers,body:e.body}
e.withCredentials&&(t.credentials="include")
return new Request(e.uri,t)},d_=function(e){return e&&["arraybuffer","video/mp4","video/mp2t","application/octet-stream"].find((function(t){return e.includes(t)}))?"arraybuffer":"text"},h_=function(){function e(t){var i=t.requestOptions,n=t.callback,r=t.prefetchCacheKey,a=t.shouldHookIntoActiveRequests
o(this,e)
this._callback=n
this._prefetchCacheKey=r
this._shouldHookIntoActiveRequests=a
this.uri=i.uri
this.url=i.uri
this.aborted=!1
this.response=null
this.responseText=null
this.responseType=null
this.responseURL=null
this.status=0
this.timeout=i.timeout
this.requestType=i.requestType
this._fetchPromise=this._fetch(i)}l(e,[{key:"addEventListener",value:function(){}},{key:"removeEventListener",value:function(){}},{key:"abort",value:function(){this.aborted=!0
this._xhrRequest&&this._xhrRequest.abort()}},{key:"_handleCacheResult",value:(i=s(n().mark((function e(t,i){var r,a
return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:ql.log.debug("[WEB_MEDIA_PREFETCHING] Retrieved cache result for: ".concat(t.url),t)
r=Array.from(t.headers.entries()).reduce((function(e,t){var i=y(t,2),n=i[0],r=i[1]
e[n]=r
return e}),{})
if("text"!==(a=d_(t.headers.get("content-type")))){e.next=9
break}e.next=6
return t.text()
case 6:this.responseText=e.sent
e.next=12
break
case 9:e.next=11
return t.arrayBuffer()
case 11:this.response=e.sent
case 12:this.responseUrl=t.url
this.status=t.status
this.statusText=t.statusText
this.responseType=a
this.responseTime=Date.now()
this.bytesReceived=this.response?this.response.byteLength:this.responseText.length
this.roundTripTime=1
this.bandwidth=1
this.responseHeaders=r
this._callback(null,{url:t.url,headers:r,statusCode:t.status})
i.xhrHooksResponseCallback&&i.xhrHooksResponseCallback(this,!0)
case 23:case"end":return e.stop()}}),e,this)}))),function(e,t){return i.apply(this,arguments)})},{key:"_handleNoCacheResult",value:function(e){var t=this
ql.log.debug("[WEB_MEDIA_PREFETCHING] No cache result for: ".concat(e.uri))
var i=ql.xhr(e,(function(n,r){t.responseUrl=i.responseUrl
t.status=i.status
t.statusText=i.statusText
t.responseType=i.responseType
t.response=i.response
"text"===d_(t.responseType)&&(t.responseText=i.responseText)
if(!n){t.responseTime=Date.now()
t.roundTripTime=t.responseTime-t.requestTime
t.bytesReceived="arraybuffer"===i.responseType?i.response.byteLength:i.responseText.length
t.bandwidth=Math.floor(t.bytesReceived/t.roundTripTime*8*1e3)}t.responseHeaders=r.headers
n&&"ETIMEDOUT"===n.code&&(t.timedout=!0)
t._callback(n,r)
e.xhrHooksResponseCallback&&e.xhrHooksResponseCallback(t,!1)}))
this.requestTime=Date.now()}},{key:"_fetch",value:(t=s(n().mark((function e(t){var i,r,a
return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i=c_(t)
r=l_()
e.prev=2
if(!this._shouldHookIntoActiveRequests||!r){e.next=13
break}e.next=6
return r.getResponse(i)
case 6:if((a=e.sent)||!r.isActiveRequest(i)){e.next=11
break}e.next=10
return new window.Promise((function(e){r.registerActiveRequestCallback(i,e)}))
case 10:a=e.sent
case 11:e.next=20
break
case 13:if(this._cache){e.next=17
break}e.next=16
return window.caches.open(this._prefetchCacheKey)
case 16:this._cache=e.sent
case 17:e.next=19
return this._cache.match(i)
case 19:a=e.sent
case 20:if(!a){e.next=24
break}e.next=23
return this._handleCacheResult(a,t)
case 23:return e.abrupt("return")
case 24:e.next=29
break
case 26:e.prev=26
e.t0=e.catch(2)
ql.log.error("Error occurred while checking prefetch cache for a request",e.t0)
case 29:r&&r.removeRequestFromQueue(i)
this._handleNoCacheResult(t)
case 31:case"end":return e.stop()}}),e,this,[[2,26]])}))),function(e){return t.apply(this,arguments)})}])
var t,i
return e}()
function p_(){try{var e=l_()
if(e){var t=this.playlists.master.playlists,i=t.map((function(e){return e.resolvedUri})),n=e.getPrefetchUrl(i),r=n&&t.find((function(e){return e.resolvedUri===n}))
if(r)return r}}catch(e){ql.log.error("Error occurred while checking prefetch cache for playlist selection",e)}finally{this.masterPlaylistController_.selectPlaylist=ql.Vhs.STANDARD_PLAYLIST_SELECTOR.bind(this)}return this.masterPlaylistController_.selectPlaylist()}var f_=function(e){d(i,e)
var t=g(i)
function i(e){var n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
o(this,i);(n=t.apply(this,arguments))._enabled=r.enabled&&ql.Vhs
if(!n._enabled)return m(n)
n._shouldHookIntoActiveRequests=r.shouldHookIntoActiveRequests
e.ready((function(){n._setUpPlaylistSelector()}))
if(ql.Vhs.xhr._fromWebMediaPrefetchingPlugin)return m(n)
n._overrideVhsXhr()
return n}l(i,[{key:"enabled",get:function(){return this._enabled}},{key:"_overrideVhsXhr",value:function(){var e=this
ql.Vhs.xhr=function(t,i){return new h_({requestOptions:t,callback:i,prefetchCacheKey:"media-infra-prefetch-cache",shouldHookIntoActiveRequests:e._shouldHookIntoActiveRequests})}
ql.Vhs.xhr._fromWebMediaPrefetchingPlugin=!0}},{key:"_setUpPlaylistSelector",value:function(){var e=new window.Proxy(this.player.tech(!0),{set:function(e,t,i){var n
"vhs"===t&&(i.selectPlaylist=p_.bind(i))
return(n=window.Reflect).set.apply(n,arguments)}})
this.player.tech_=e}}])
return i}(ql.getPlugin("plugin"))
ql.registerPlugin("webMediaPrefetching",f_)
var m_=function(e){d(i,e)
var t=g(i)
function i(e){var n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
o(this,i);(n=t.apply(this,arguments))._enabled=r.enabled&&ql.Vhs
if(!n.enabled)return m(n)
e.ready((function(){n._waitForVhsHandler()}))
return n}l(i,[{key:"enabled",get:function(){return this._enabled}},{key:"ready",value:function(e){var t=this.enabled&&this._vhsHandler
if(!e)return t
t?e():this.on("plugin-ready",(function(){e()}))}},{key:"setPlaylistSelector",value:function(e){var t,i=this.player.tech(!0).vhs
if(i){var n=e.bind(this._vhsHandler)
null!==(t=i.masterPlaylistController_)&&void 0!==t&&t.selectPlaylist&&(i.masterPlaylistController_.selectPlaylist=n)
this._vhsHandler.selectPlaylist=n}}},{key:"setPlaylistSelectorToDefault",value:function(){this.setPlaylistSelector(ql.Vhs.STANDARD_PLAYLIST_SELECTOR)}},{key:"_waitForVhsHandler",value:function(){var e=this,t=new window.Proxy(this.player.tech(!0),{set:function(t,i,n){var r,a=(r=window.Reflect).set.apply(r,arguments)
"vhs"===i&&function(t){e._vhsHandler=t
e.trigger("plugin-ready")}(n)
return a}})
this.player.tech_=t}}])
return i}(ql.getPlugin("plugin"))
ql.registerPlugin("playlistSelectorManager",m_)
var g_=function(e){d(i,e)
var t=g(i)
function i(e){var n,r,a,s,u=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
o(this,i);(s=t.apply(this,arguments))._enabled=u.enabled
if(!s._enabled)return m(s)
var l=null===(n=e.xhrHooks)||void 0===n?void 0:n.call(e),c=null===(r=e.dashScoreInjector)||void 0===r?void 0:r.call(e),d=null===(a=e.playlistSelectorManager)||void 0===a?void 0:a.call(e)
if(null==l||!l.enabled||null==c||!c.enabled||null==d||!d.enabled)return m(s)
e.ready((function(){s._setupScoreBasedPlaylistSelector()}))
return s}l(i,[{key:"enabled",get:function(){return this._enabled}},{key:"_setupScoreBasedPlaylistSelector",value:function(){var e,t,i=null===(e=(t=this.player).playlistSelectorManager)||void 0===e?void 0:e.call(t)
i&&i.ready((function(){i.setPlaylistSelector((function(){var e,t,i,n,r,a=null===(e=this.playlists)||void 0===e?void 0:e.master
if(!a||null===(t=a.playlists)||void 0===t||!t.length)return ql.Vhs.STANDARD_PLAYLIST_SELECTOR.call(this)
var s=Boolean(a.playlists.some((function(e){var t
return"number"==typeof(null===(t=e.attributes)||void 0===t?void 0:t.SCORE)}))),o=null!==(i=this.limitRenditionByPlayerDimensions)&&void 0!==i&&i
return function(e){var t=e.main,i=e.playerBandwidth,n=e.playerWidth,r=e.playerHeight,a=e.limitRenditionByPlayerDimensions,s=e.useScoreAttribute
if(t){var o=_(t.playlists).sort((function(e,t){return s&&(e.attributes.SCORE||t.attributes.SCORE)?e.attributes.SCORE&&!t.attributes.SCORE?-1:!e.attributes.SCORE&&t.attributes.SCORE?1:t.attributes.SCORE-e.attributes.SCORE:t.attributes.BANDWIDTH-e.attributes.BANDWIDTH})).filter((function(e){return!e.disabled})),u=o.filter((function(e){var t=e.excludeUntil
return!t||t<=Date.now()})),l=u.filter((function(e){var t=e.attributes.BANDWIDTH
return t&&t<=i}))
if(!a||!l.length){var c=l[0],d=_(u.length?u:o).sort((function(e,t){var i=t.attributes.BANDWIDTH-e.attributes.BANDWIDTH
return 0===i&&s&&(e.attributes.SCORE||t.attributes.SCORE)?e.attributes.SCORE&&!t.attributes.SCORE?1:!e.attributes.SCORE&&t.attributes.SCORE?-1:e.attributes.SCORE-t.attributes.SCORE:i})).at(-1)
return c||d}var h=_(l.filter((function(e){return e.attributes.RESOLUTION}))).sort((function(e,t){return e.attributes.RESOLUTION.height-t.attributes.RESOLUTION.height}))
return h.find((function(e){var t=e.attributes.RESOLUTION,i=t.width,a=t.height
return n<=i&&r<=a}))||h.at(-1)}}({main:a,playerBandwidth:this.systemBandwidth,playerWidth:(null===(n=this.player_.tech_.el_)||void 0===n?void 0:n.width)||0,playerHeight:(null===(r=this.player_.tech_.el_)||void 0===r?void 0:r.height)||0,limitRenditionByPlayerDimensions:o,useScoreAttribute:s})}))}))}}])
return i}(ql.getPlugin("plugin"))
ql.registerPlugin("scoreAbrManager",g_)
var v_=ql.getPlugin("plugin"),y_=function(e){d(i,e)
var t=g(i)
function i(e){var n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
o(this,i);(n=t.apply(this,arguments)).enabled=r.enabled
if(!n.enabled||!ql.browser.IS_ANY_SAFARI)return m(n)
e.on("loadstart",(function(){var t=e.tech(!0).vhs
t&&t.playlists.on("loadedmetadata",(function(){t.representations().forEach((function(e){var t,i
null!==(t=e.codecs)&&void 0!==t&&null!==(i=t.video)&&void 0!==i&&i.toLowerCase().includes("av01")&&e.enabled(!1)}))}))}))
return n}return l(i)}(v_)
ql.registerPlugin("disableSafariAv1",y_)
var __=ql.dom,b_=function(e){d(i,e)
var t=g(i)
function i(){var e
o(this,i);(e=t.apply(this,arguments)).timerId
e.el_=__.createEl("div",{className:"visually-hidden"})
e.el_.setAttribute("aria-live","polite")
return e}l(i,[{key:"dispose",value:function(){this.timerId&&this.clearTimeout(this.timerId)
v(h(i.prototype),"dispose",this).call(this)}},{key:"fillWith",value:function(e){var t=this
this.el_.textContent=e
this.timerId=this.setTimeout((function(){t.el_.textContent=""}),300)}}])
return i}(ql.getComponent("Component"))
ql.registerComponent("A11yNotificationArea",b_)
var T_=function(e){d(i,e)
var t=g(i)
function i(e,n){var r
o(this,i);(r=t.call(this,e,n))._enabled=n.enabled
r._player=e
if(!r.enabled)return m(r)
r.a11yAreaComponent=new b_(r._player)
r._player.addChild(r.a11yAreaComponent)
return r}l(i,[{key:"enabled",get:function(){return this._enabled}},{key:"fillWithContent",value:function(e){this.a11yAreaComponent.fillWith(e)}}])
return i}(ql.getPlugin("plugin"))
ql.registerPlugin("a11yNotification",T_)
var S_=ql.getPlugin("plugin"),k_="vjs-interstitial-control-bar",E_="vjs-interstitial-progress-control",C_=function(e){var t=e.player,i=e.mediaUrn,n=e.trackingId,r=e.primaryMediaTrackingId
if(t){t.tracking&&t.tracking().createNewSession({mediaUrn:i,trackingId:n,primaryMediaTrackingId:r})
t.rum&&t.rum().createNewSession({mediaUrn:i,trackingId:n,primaryMediaTrackingId:r})}},w_=function(e){var t=e.player,i=e.tracks
if(null!=i&&i.length)for(var n=t.remoteTextTracks(),r=function(e){var r=n[e]
i.find((function(e){return e.src===r.src}))&&t.removeRemoteTextTrack(r)},a=0;a<n.length;a++)r(a)},I_=function(e){var t=e.player,n=e.tracksToRemove,r=e.tracksToAdd,a=function(e){for(var t=e.remoteTextTracks(),i=0;i<t.length;i++){var n=t[i]
if("showing"===n.mode)return n}return null}(t)
w_({player:t,tracks:n})
null==r||r.forEach((function(e){a&&e.kind===a.kind&&e.srclang===a.language&&(e=i(i({},e),{},{mode:"showing"}))
t.addRemoteTextTrack(e,!0)}))},P_=function(e){var t=e.options,n=e.sources,r=t.plugins.interstitials,a=r.items.filter((function(e){return 0===e.timestamp}))
if(null==a||!a.length)return t
r.primaryContent={sources:n}
t.tracks&&(r.primaryContent.tracks=t.tracks)
var s=i(i({},t),{},{sources:a[0].sources})
a[0].tracks&&(s.tracks=a[0].tracks)
var o=s.plugins,u=o.rum,l=o.tracking,c=(null==l?void 0:l.mediaUrn)||(null==u?void 0:u.mediaUrn)
c&&(r.primaryContent.mediaUrn=c)
var d=$v()
r.primaryContent.trackingId=d
r.items.forEach((function(e){e.trackingId=$v()}))
if(u){u.trackingId=a[0].trackingId
u.mediaUrn=a[0].mediaUrn
u.primaryMediaTrackingId=d}if(l){l.trackingId=a[0].trackingId
l.mediaUrn=a[0].mediaUrn
l.primaryMediaTrackingId=d}return s},x_=function(e){d(i,e)
var t=g(i)
function i(e){var r,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
o(this,i);(r=t.apply(this,arguments))._updateOptions(a)
if(0===r._interstitialItems.length)return m(r)
r._player=e
r._interstitialItemIndex=0
r._watchForSourceChanges()
r._watchForTextTrackAdditions()
e.ready((function(){r._configureProgressControlForInterstitial()
setTimeout((function(){r._stopWatchingForTextTrackAdditions=!0}),0)
r._player.one("play",s(n().mark((function e(){return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r._player.autoplay(!0)
e.next=3
return r._player.prefetch().prefetchToFirstSegment(r._primaryContent.sources)
case 3:case"end":return e.stop()}}),e)}))))
r._endedListener=r._onEnded.bind(f(r))
r._player.on("ended",r._endedListener)}))
return r}l(i,[{key:"_updateOptions",value:function(e){var t
this._interstitialItems=(null==e||null===(t=e.items)||void 0===t?void 0:t.filter((function(e){return 0===e.timestamp})))||[]
this._primaryContent=null==e?void 0:e.primaryContent}},{key:"_handlePrimarySourceChange",value:function(e){if(this._primaryContent.sources){w_({player:this._player,tracks:this._currentItemTracks()})
w_({player:this._player,tracks:this._primaryContent.tracks})
var t=P_({options:this._player.options(),sources:e})
this._player.options(t)
this._updateOptions(t.plugins.interstitials)
this._setSourceToFirstInterstitial()}else this._primaryContent.sources=e}},{key:"_watchForSourceChanges",value:function(){var e=this
this._origSource=this._player.src.bind(this._player)
this._player.src=function(t){var i,n
if(!t||e._isDisposed||null===(i=e._player.options().plugins.interstitials)||void 0===i||null===(n=i.items)||void 0===n||!n.length||e._player.options().sources===t)return e._origSource(t)
e._handlePrimarySourceChange(t)}}},{key:"_watchForTextTrackAdditions",value:function(){var e=this,t=this._player.addRemoteTextTrack
this._player.addRemoteTextTrack=function(){for(var i,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a]
var s=r[0],o=s.src,u=s.kind,l=s.label,c=s.srclang,d=((null===(i=e._interstitialItems[0])||void 0===i?void 0:i.tracks)||[]).map((function(e){return e.src}))
if(e._stopWatchingForTextTrackAdditions||"metadata"===u||d.includes(o))return t.apply(e._player,r)
e._primaryContent.tracks=(e._primaryContent.tracks||[]).concat({src:o,kind:u,label:l,srclang:c})}}},{key:"_configureProgressControlForInterstitial",value:function(){var e
if(null!==(e=this._player.controlBar)&&void 0!==e&&e.progressControl){this._player.controlBar.progressControl.disable()
this._player.controlBar.addClass(k_)
this._player.controlBar.progressControl.addClass(E_)}}},{key:"_setSourceToFirstInterstitial",value:function(){this._interstitialItemIndex=0
var e=this._interstitialItems[this._interstitialItemIndex]
this._setSourceToInterstitial({nextItem:e})}},{key:"_setSourceToNextInterstitial",value:function(){var e=this._interstitialItemIndex+1,t=this._interstitialItems[e]
if(!t)return null
var i=this._interstitialItems[this._interstitialItemIndex]
this._interstitialItemIndex=e
this._setSourceToInterstitial({currentItem:i,nextItem:t})
return t}},{key:"_setSourceToInterstitial",value:function(e){var t=e.currentItem,i=e.nextItem
if(i){this._configureProgressControlForInterstitial()
I_({player:this._player,tracksToRemove:null==t?void 0:t.tracks,tracksToAdd:i.tracks})
this._setSrc(i.sources)
C_({player:this._player,mediaUrn:i.mediaUrn,trackingId:i.trackingId,primaryMediaTrackingId:this._primaryContent.trackingId})}}},{key:"_setSrc",value:function(e){this._origSource(e)}},{key:"_onEnded",value:function(){if(null!==this._interstitialItemIndex){this._setSourceToNextInterstitial()||this.skipToPrimaryContent()}}},{key:"_currentItemTracks",value:function(){var e
return null===(e=this._interstitialItems[this._interstitialItemIndex])||void 0===e?void 0:e.tracks}},{key:"_configureProgressControlForPrimaryContent",value:function(){this._player.controlBar.progressControl.enable()
this._player.controlBar.removeClass(k_)
this._player.controlBar.progressControl.removeClass(E_)}},{key:"skipToPrimaryContent",value:function(){this._player.off("ended",this._endedListener)
I_({player:this._player,tracksToRemove:this._currentItemTracks(),tracksToAdd:this._primaryContent.tracks})
this._interstitialItemIndex=null
this._configureProgressControlForPrimaryContent()
this._setSrc(this._primaryContent.sources)
C_({player:this._player,mediaUrn:this._primaryContent.mediaUrn,trackingId:this._primaryContent.trackingId})}},{key:"isPlayingInterstitial",value:function(){return"number"==typeof this._interstitialItemIndex}},{key:"isFinalSource",value:function(){var e=this._player.src()
return!!this._primaryContent.sources.find((function(t){return t.src===e}))}},{key:"dispose",value:function(){v(h(i.prototype),"dispose",this).call(this)
this._isDisposed=!0}}])
return i}(S_)
ql.registerPlugin("interstitials",x_)
var A_={rum:1,xhrHooks:1,tracking:2,dashScoreInjector:3,playlistSelectorManager:4,scoreAbrManager:5},O_=function(e){return A_[e]||1/0}
e.createPlayer=function(e){var t,n,r,a,s,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}).exposeGlobalVideojsForDebugging&&!window.vjsForDebug&&(window.vjsForDebug=ql)
var u,l={customCaptionsDisplay:!1,playerBanner:!1,children:{playerBanner:{},mediaLoader:{},posterImage:{},bigPlayButton:{},loadingSpinner:{},controlBar:{},errorDisplay:{},customCaptionsDisplay:{},textTrackDisplay:{},resizeManager:{},liveTracker:{}},controlBar:{skipBackButton:!1,skipAheadButton:!1,previousButton:!1,nextButton:!1,settingsMenuButton:!1,backToStartButton:!1,theaterModeButton:!1,fullscreenToggle:!1,captionsToggle:!1,captionsMenuToggle:!1,muteToggle:!1,remainingTimeDisplay:!1,children:i(i({},null!==(t=o.controlBar)&&void 0!==t&&null!==(n=t.progressControl)&&void 0!==n&&n.inline?{playToggle:{},progressControl:{}}:{progressControl:{},playToggle:{}}),{},{backToStartButton:{},skipBackButton:{},skipAheadButton:{},previousButton:{},nextButton:{},liveDisplay:{},timeDisplay:{},remainingTimeDisplay:{},customControlSpacer:{},playbackRateMenuButton:{},captionsToggle:{},captionsMenuToggle:{},settingsMenuButton:{},volumePanel:{inline:!1},muteToggle:{},theaterModeButton:{},fullscreenToggle:{}})},plugins:{disableContextMenu:!0,lifecycle:!0,qualityLevels:!0,verticalSliderMaxHeight:!0,menuOverflow:!0,setAriaLiveToOff:!0,generateTrackingId:!0,xhrHooks:{enabled:!1},dashScoreInjector:{enabled:!1},stopBufferingHlsOnPause:{enabled:!1},requestQueue:{enabled:!1},delayedSegmentLoading:{enabled:!1},webMediaPrefetching:{enabled:!1},playlistSelectorManager:{enabled:!1},scoreAbrManager:{enabled:!1},disableSafariAv1:{enabled:!1}},controls:!0,fluid:!0,responsive:!0,aspectRatio:"auto",enableSourceset:!0,techOrder:["html5"],noUITitleAttributes:!(null===(r=o.plugins)||void 0===r||!r.controlTooltips),html5:{vhs:{withCredentials:!1,limitRenditionByPlayerDimensions:!1,experimentalBufferBasedABR:!0,useNetworkInformationApi:!0,cacheEncryptionKeys:!0},nativeTextTracks:ql.browser.IS_IPHONE}},c=ql.mergeOptions(l,o,{autoplay:!0===o.autoplay?"any":o.autoplay||!1}),d=c.plugins
delete c.plugins
c.plugins={};(u=d,Object.keys(u).sort((function(e,t){return O_(e)-O_(t)}))).forEach((function(e){c.plugins[e]=d[e]}))
null!==(a=c.plugins.interstitials)&&void 0!==a&&null!==(s=a.items)&&void 0!==s&&s.length&&(c=P_({options:c,sources:c.sources}))
return ql(e,c)}
e.videojs=ql
Object.defineProperty(e,"__esModule",{value:!0})}))

//# sourceMappingURL=media-player.amd.map