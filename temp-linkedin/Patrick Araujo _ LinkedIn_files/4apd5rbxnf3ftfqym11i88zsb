define("@ember/test-waiters/build-waiter",["exports","@babel/runtime/helpers/esm/defineProperty","@ember/debug","@ember/test-waiters/token","@ember/test-waiters/waiter-manager"],(function(e,t,r,n,i){"use strict"
Object.defineProperty(e,"__esModule",{value:!0})
e._resetWaiterNames=function(){o=new Set}
e.default=function(e){0
return new s(e)}
let o
class s{constructor(e){this.name=e}beginAsync(){return this}endAsync(){}waitUntil(){return!0}debugInfo(){return[]}reset(){}}}))
define("@ember/test-waiters/index",["exports","@ember/test-waiters/waiter-manager","@ember/test-waiters/build-waiter","@ember/test-waiters/wait-for-promise","@ember/test-waiters/wait-for"],(function(e,t,r,n,i){"use strict"
Object.defineProperty(e,"__esModule",{value:!0})
Object.defineProperty(e,"_reset",{enumerable:!0,get:function(){return t._reset}})
Object.defineProperty(e,"_resetWaiterNames",{enumerable:!0,get:function(){return r._resetWaiterNames}})
Object.defineProperty(e,"buildWaiter",{enumerable:!0,get:function(){return r.default}})
Object.defineProperty(e,"getPendingWaiterState",{enumerable:!0,get:function(){return t.getPendingWaiterState}})
Object.defineProperty(e,"getWaiters",{enumerable:!0,get:function(){return t.getWaiters}})
Object.defineProperty(e,"hasPendingWaiters",{enumerable:!0,get:function(){return t.hasPendingWaiters}})
Object.defineProperty(e,"register",{enumerable:!0,get:function(){return t.register}})
Object.defineProperty(e,"unregister",{enumerable:!0,get:function(){return t.unregister}})
Object.defineProperty(e,"waitFor",{enumerable:!0,get:function(){return i.default}})
Object.defineProperty(e,"waitForPromise",{enumerable:!0,get:function(){return n.default}})}))
define("@ember/test-waiters/token",["exports"],(function(e){"use strict"
Object.defineProperty(e,"__esModule",{value:!0})
e.default=void 0
e.default=class{}}))
define("@ember/test-waiters/types/index",["exports"],(function(e){"use strict"
Object.defineProperty(e,"__esModule",{value:!0})}))
define("@ember/test-waiters/wait-for-promise",["exports","@ember/test-waiters/build-waiter"],(function(e,t){"use strict"
Object.defineProperty(e,"__esModule",{value:!0})
e.default=function(e,t){let r=e
0
return r};(0,t.default)("@ember/test-waiters:promise-waiter")}))
define("@ember/test-waiters/wait-for",["exports","@ember/test-waiters/wait-for-promise","@ember/test-waiters/build-waiter"],(function(e,t,r){"use strict"
Object.defineProperty(e,"__esModule",{value:!0})
e.default=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r]
if(t.length<3){let[e,r]=t
return n(e,r)}{let[,,e,r]=t
return e}}
function n(e,t){return e}(0,r.default)("@ember/test-waiters:generator-waiter")}))
define("@ember/test-waiters/waiter-manager",["exports","ember","@ember/test"],(function(e,t,r){"use strict"
Object.defineProperty(e,"__esModule",{value:!0})
e._reset=function(){for(let e of o())e.isRegistered=!1
n.clear()}
e.getPendingWaiterState=s
e.getWaiters=o
e.hasPendingWaiters=a
e.register=function(e){n.set(e.name,e)}
e.unregister=function(e){n.delete(e.name)}
const n=function(){let e="TEST_WAITERS",t="undefined"!=typeof Symbol?Symbol.for(e):e,r=i(),n=r[t]
void 0===n&&(n=r[t]=new Map)
return n}()
function i(){if("undefined"!=typeof globalThis)return globalThis
if("undefined"!=typeof self)return self
if("undefined"!=typeof window)return window
if("undefined"!=typeof global)return global
throw new Error("unable to locate global object")}t.default.Test&&(0,r.registerWaiter)((()=>!a()))
function o(){let e=[]
n.forEach((t=>{e.push(t)}))
return e}function s(){let e={pending:0,waiters:{}}
n.forEach((t=>{if(!t.waitUntil()){e.pending++
let r=t.debugInfo()
e.waiters[t.name]=r||!0}}))
return e}function a(){return s().pending>0}}))
define("@glimmer/component/-private/base-component-manager",["exports","@babel/runtime/helpers/esm/defineProperty","@glimmer/component/-private/component"],(function(e,t,r){"use strict"
Object.defineProperty(e,"__esModule",{value:!0})
e.default=function(e,r,n){return class{static create(e){return new this(r(e))}constructor(r){(0,t.default)(this,"capabilities",n)
e(this,r)}createComponent(e,t){0
return new e(r(this),t.named)}getContext(e){return e}}}}))
define("@glimmer/component/-private/component",["exports","@babel/runtime/helpers/esm/defineProperty","@glimmer/component/-private/owner","@glimmer/component/-private/destroyables"],(function(e,t,r,n){"use strict"
Object.defineProperty(e,"__esModule",{value:!0})
e.default=e.ARGS_SET=void 0
e.ARGS_SET=void 0
0
e.default=class{constructor(e,n){(0,t.default)(this,"args",void 0)
0
this.args=n;(0,r.setOwner)(this,e)}get isDestroying(){return(0,n.isDestroying)(this)}get isDestroyed(){return(0,n.isDestroyed)(this)}willDestroy(){}}}))
define("@glimmer/component/-private/destroyables",["exports","ember"],(function(e,t){"use strict"
Object.defineProperty(e,"__esModule",{value:!0})
e.isDestroying=e.isDestroyed=void 0
e.isDestroying=t.default._isDestroying,e.isDestroyed=t.default._isDestroyed}))
define("@glimmer/component/-private/ember-component-manager",["exports","ember","@ember/object","@ember/application","@ember/component","@ember/runloop","@glimmer/component/-private/base-component-manager","@glimmer/component/-private/destroyables"],(function(e,t,r,n,i,o,s,a){"use strict"
Object.defineProperty(e,"__esModule",{value:!0})
e.default=void 0
const{setDestroyed:u,setDestroying:c}=a,f=(0,i.capabilities)("3.13",{destructor:!0,asyncLifecycleCallbacks:!1,updateHook:!1}),l=t.default.destroy,d=t.default._registerDestructor
class m extends((0,s.default)(n.setOwner,n.getOwner,f)){createComponent(e,t){const r=super.createComponent(e,t)
d(r,(()=>{r.willDestroy()}))
return r}destroyComponent(e){l(e)}}0
e.default=m}))
define("@glimmer/component/-private/owner",["exports","@ember/application"],(function(e,t){"use strict"
Object.defineProperty(e,"__esModule",{value:!0})
Object.defineProperty(e,"setOwner",{enumerable:!0,get:function(){return t.setOwner}})}))
define("@glimmer/component/index",["exports","@ember/component","@glimmer/component/-private/ember-component-manager","@glimmer/component/-private/component"],(function(e,t,r,n){"use strict"
Object.defineProperty(e,"__esModule",{value:!0})
e.default=void 0
let i=n.default
0;(0,t.setComponentManager)((e=>new r.default(e)),i)
e.default=i}))
define("ember-batcher/batcher",["exports","ember-test-waiters"],(function(e,t){"use strict"
Object.defineProperty(e,"__esModule",{value:!0})
e.mutateDOM=function(e){let t=n.beginAsync()
o.unshift([t,e])
f()}
e.readDOM=function(e){let t=r.beginAsync()
i.unshift([t,e])
f()}
e.visibilityChange=void 0
const r=(0,t.buildWaiter)("ember-batcher: readDOM"),n=(0,t.buildWaiter)("ember-batcher: mutateDOM"),i=[],o=[]
let s=()=>{}
e.visibilityChange=s
let a=!1,u=!1
const c="object"==typeof window&&"function"==typeof window.requestAnimationFrame?e=>{let t=()=>{if(!u){u=!0
e()}}
setTimeout(t,20)
return requestAnimationFrame(t)}:e=>setTimeout(e)
0
function f(){if(!a){a=!0
c((()=>{let e,t
for(e=0,t=i.length;e<t;e++){let[e,t]=i.pop()
t()
r.endAsync(e)}for(e=0,t=o.length;e<t;e++){let[e,t]=o.pop()
t()
n.endAsync(e)}a=!1
u=!1;(o.length>0||i.length>0)&&f()}))}}}))
define("ember-batcher/index",["exports","ember-batcher/batcher"],(function(e,t){"use strict"
Object.defineProperty(e,"__esModule",{value:!0})
Object.defineProperty(e,"mutateDOM",{enumerable:!0,get:function(){return t.mutateDOM}})
Object.defineProperty(e,"readDOM",{enumerable:!0,get:function(){return t.readDOM}})}))
define("ember-test-waiters/index",["exports","@ember/debug","@ember/test-waiters"],(function(e,t,r){"use strict"
Object.defineProperty(e,"__esModule",{value:!0})
Object.keys(r).forEach((function(t){"default"!==t&&"__esModule"!==t&&(t in e&&e[t]===r[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return r[t]}}))}))}))

//# sourceMappingURL=engine-vendor.map