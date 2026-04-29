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
define("@glimmer/component/-private/ember-component-manager",["exports","ember","@ember/object","@ember/application","@ember/component","@ember/runloop","@glimmer/component/-private/base-component-manager","@glimmer/component/-private/destroyables"],(function(e,t,r,n,o,i,s,a){"use strict"
Object.defineProperty(e,"__esModule",{value:!0})
e.default=void 0
const{setDestroyed:m,setDestroying:c}=a,l=(0,o.capabilities)("3.13",{destructor:!0,asyncLifecycleCallbacks:!1,updateHook:!1}),p=t.default.destroy,u=t.default._registerDestructor
class d extends((0,s.default)(n.setOwner,n.getOwner,l)){createComponent(e,t){const r=super.createComponent(e,t)
u(r,(()=>{r.willDestroy()}))
return r}destroyComponent(e){p(e)}}0
e.default=d}))
define("@glimmer/component/-private/owner",["exports","@ember/application"],(function(e,t){"use strict"
Object.defineProperty(e,"__esModule",{value:!0})
Object.defineProperty(e,"setOwner",{enumerable:!0,get:function(){return t.setOwner}})}))
define("@glimmer/component/index",["exports","@ember/component","@glimmer/component/-private/ember-component-manager","@glimmer/component/-private/component"],(function(e,t,r,n){"use strict"
Object.defineProperty(e,"__esModule",{value:!0})
e.default=void 0
let o=n.default
0;(0,t.setComponentManager)((e=>new r.default(e)),o)
e.default=o}))

//# sourceMappingURL=engine-vendor.map