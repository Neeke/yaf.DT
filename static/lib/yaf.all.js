(function(f,g){if(typeof console==="undefined"){window.console={log:function(){}}
}var a={version:"1.1",components:{},register:{},layouts:{register:{}},zIndex:{no:g,low:0,middle:1000,high:10000,getMax:function(h,i){h=h||"low";
if(this.hasOwnProperty(h)){return this[h||"low"]+=(i||1)
}}},_isDeferred:function(h){return h&&typeof h.done==="function"&&typeof h.fail==="function"
},getCmp:function(i){var h=this.components[i];
return h&&h.proxy||h
},getCmps:function(i){i=i||{};
var h=[];
f.each(this.components,function(m,l){var j=true;
f.each(i,function(n,k){if(l[n]!==k){return j=false
}});
if(j){h.push(l.proxy||l)
}});
return h
},addCmp:function(i,h){if(typeof i==="string"||typeof i==="number"){this.components[i]=h
}},removeCmp:function(h){delete this.components[h]
},getAutoID:function(h){this.autoID=this.autoID||0;
this.autoID++;
return(h||"yafCmp")+this.autoID
},extend:function(h,i){f.each(i.prototype,function(l,j){h.prototype[l]=h.prototype[l]||j
})
},setDefaultOpts:function(i,h){f.extend(a.register[i].opts,h)
},createComponent:e,test:{effCompare:function(){var j=a.util.asArray(arguments),h=j.length,l=100,k;
if(h>=2){if(typeof j[h-1]==="number"){l=j[h-1]
}f.each(j,function(i,n){if(typeof n==="function"){var m=new Date().getTime();
for(k=0;
k<l;
k++){n()
}console.log(i+"--"+(new Date().getTime()-m))
}})
}}},module:function(h,i){if(!h||typeof h!=="string"){console.log("error namespace : "+h)
}if(typeof window[h]==="undefined"){if(typeof i==="function"){window[h]=i()||{}
}else{window[h]={}
}}else{console.log("namespace "+h+" already exists")
}}};
function c(i){if(i instanceof Array){var h=this;
this.proxy=this.proxy||{};
f.each(i,function(j,k){if(typeof h[k]==="function"){h.proxy[k]=function(){return h[k]&&h[k].apply(h,arguments)
}
}else{h.proxy[k]=h[k]
}});
this.proxy.constructor=this.constructor;
return this.proxy
}return this
}function e(h){if(typeof h.xtype==="string"){var i=this;
i[h.xtype]=function(k){this.superClass=h.extend;
k=k||{};
f.extend(true,this,h.opts);
this.id=this.id||a.getAutoID(this.autoIdPrefix);
if(typeof k==="string"||typeof k==="number"){this.config={};
f.extend(this.config,h.opts);
this.initialize(k)
}else{f.extend(this,k);
this.config={};
f.extend(this.config,i[h.xtype].opts,k);
this.initialize()
}a.addCmp(this.id,this);
return c.call(this,this.constructor.api)
};
if(h.extend){a.extend(this[h.xtype],h.extend);
if(h.api){h.api=f.unique(h.api.concat(h.extend.api))
}else{h.api=h.extend.api
}}var j=h.xtype.toLowerCase();
this.register[j]=this[h.xtype];
f.extend(this.register[j].prototype,h.methods);
this[h.xtype].prototype.xtype=j;
this[h.xtype].api=h.api;
this[h.xtype].opts=h.opts
}}a.Tools={types:{close:{title:"关闭",cls:"yafTool yafTool_close",defaultHandler:function(j,i,h,k){h.close?h.close():h.hide()
}},gear:{title:"设置",cls:"yafTool yafTool_gear",defaultHandler:function(j,i,h,k){}},help:{title:"帮助",cls:"yafTool yafTool_help",defaultHandler:function(j,i,h,k){}},more:{title:"更多",cls:"yafTool yafTool_more",defaultHandler:function(j,i,h,k){}}},renderTools:function(j,i){var h=this;
if(j instanceof Array&&j.length){f.each(j,function(n,p){var m,o,l;
if(typeof p==="string"){if(!a.Tools.types.hasOwnProperty(p)){return
}l=p;
m=a.Tools.types[p];
o=m.defaultHandler
}else{if(a.util.isObject(p)){l=p.id;
m=a.Tools.types[p.id]||p;
o=p.handler||m.defaultHandler||f.noop
}else{return
}}var k=f('<a class="'+m.cls+'"></a>').text(m.text||"").attr("href","javascript:void(0)");
k.click(function(q){o.call(h,q,k,h);
q.stopPropagation()
});
k.appendTo(i)
})
}}};
a.EventManager={events:{},addListener:function(j,i,h,k){this.events[j]=this.events[j]||[];
this.events[j].push({handler:i,scope:h,params:k})
},removeListener:function(j,i,h){this.events[j]=f.grep(this.events[j],function(m){var l=h||m.scope;
var k=i||m.handler;
return m.scope!==l||m.handler!==k
})
},trigger:function(l,m){var j=this.events[l],h,k;
if(!j){return
}for(h=0;
k=j[h];
h++){if(k.handler.apply(k.scope||this,m||k.params||[])===false){return false
}}}};
var b={userData:null,name:location.hostname,expiresDays:360,init:function(){if(!b.userData){try{b.userData=document.createElement("INPUT");
b.userData.type="hidden";
b.userData.style.display="none";
b.userData.style.behavior="url('#default#userData')";
b.userData.addBehavior("#default#userData");
document.body.appendChild(b.userData);
var h=new Date();
h.setDate(h.getDate()+b.expiresDays);
b.userData.expires=h.toUTCString()
}catch(i){return false
}}return true
},clear:function(){},setItem:function(h,i){if(b.init()){b.userData.load(b.name);
b.userData.setAttribute(h,i);
b.userData.save(b.name)
}},getItem:function(h){if(b.init()){b.userData.load(b.name);
return b.userData.getAttribute(h)
}},removeItem:function(h){if(b.init()){b.userData.load(b.name);
b.userData.removeAttribute(h);
b.userData.save(b.name)
}}};
a.UserData=b;
a.localStorage=window.localStorage||a.UserData;
a.restGet=function(i,l,m,h,j){var k=f.Deferred();
f.ajax({url:i,type:j||"get",data:l,dataType:"json"}).done(function(n){if(n&&n.code===1000){if(typeof m==="function"){m.call(this,n)
}k.resolve()
}else{k.reject(n)
}}).fail(function(){k.reject()
});
return k.promise()
};
a.restPost=function(i,j,k,h){return a.restGet(i,j,k,h,"post")
};
var d=document.createElement("INPUT");
a.support={placeholder:"placeholder" in d,css3Animation:"webkitAnimation" in d.style||"oAnimation" in d.style||"mozAnimation" in d.style||"animation" in d.style};
window.W=window.yaf=a
})(jQuery);
(function(b,a,c){a.util={isTouchDevice:"ontouchstart" in window,ie6:b.browser.msie&&/^6/.test(b.browser.version),ie7:b.browser.msie&&/^7/.test(b.browser.version),encodeHtmlChar:function(d){if(d){return b("<span></span>").text(d).html()
}return""
},asArray:function(d,f,e){return Array.prototype.slice.call(d,f||0,e||d.length)
},isObject:function(d){return !!d&&Object.prototype.toString.call(d)==="[object Object]"
},isEmail:function(d){return/^[a-zA-Z_0-9-\.]{1,100}@[a-zA-Z_0-9-]{1,50}(\.[a-zA-Z_0-9-]{1,50}){0,2}\.[a-zA-Z]{2,4}$/.test(d)
},isDateStr:function(d){return/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(d)
},isUrl:function(d){return/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(d)
},isPhoneNo:function(d){return/^(\+86)?1[3458]\d{9}$/.test(d)
},setCookie:function(e,f,d,g){b.cookie(e,f,{expires:d,path:g})
},getCookie:function(d){return b.cookie(d)
},deleteCookie:function(d,e){b.cookie(d,null,{expires:-1,path:e})
},getCharCount:function(d){if(d){return d.replace(/[\u4E00-\u9FA5]|[^\x00-\xff]/ig,"cc").length
}return 0
},deserializeQueryString:function(k){if(k){var e={};
if(k.charAt(0)==="?"){k=k.substring(1)
}var j=k.split("&");
for(var f=0;
f<j.length;
f++){var d=j[f].indexOf("=");
if(d==-1){continue
}var h=j[f].substring(0,d);
var g=j[f].substring(d+1);
e[h]=g
}return e
}},formatDate:function(){var f=a.util.asArray(arguments),j,e,g;
for(g=0;
g<2&&g<f.length;
g++){if(typeof f[g]==="string"){j=f[g]
}else{if(f[g] instanceof Date){if(/Invalid|NaN/.test(f[g])){return
}e=f[g]
}}}j=j||"Y-m-d H:i:s";
e=e||new Date();
function h(d){return d<10?"0"+d:d
}var k={Y:e.getFullYear(),m:h(e.getMonth()+1),d:h(e.getDate()),H:h(e.getHours()),i:h(e.getMinutes()),s:h(e.getSeconds())};
return j.replace(/[YmdHis]/g,function(d,i){return k[d]||""
})
},parseDate:function(f){if(typeof f==="string"){var d=f.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);
function e(g){return g*1
}if(d&&d.length>3){return new Date(e(d[1]),e(d[2])-1,e(d[3]))
}d=f.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}) *$/);
if(d&&d.length>5){return new Date(e(d[1]),e(d[2])-1,e(d[3]),e(d[4]),e(d[5]))
}d=f.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
if(d&&d.length>6){return new Date(e(d[1]),e(d[2])-1,e(d[3]),e(d[4]),e(d[5]),e(d[6]))
}d=f.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);
if(d&&d.length>7){return new Date(e(d[1]),e(d[2])-1,e(d[3]),e(d[4]),e(d[5]),e(d[6]),e(d[7]))
}}return null
},formatStr:function(e){var d=a.util.asArray(arguments,1);
return e.replace(/\{(\d+)\}/g,function(f,g){return d[g]
})
}}
})(jQuery,yaf);
(function(b,a,c){a.createComponent({xtype:"Component",opts:{},extend:c,api:["el","show","hide","destroy","getWidth","setWidth","getHeight","setHeight","addListener","removeListener","trigger","render"],methods:{initialize:function(){var d=this;
d.status={initialized:false};
d.events=d.events||{};
d.doListeners();
d.el=b(d.el||"<div></div>");
d.id&&d.el.attr("id",d.id);
if(d.initComponent()===false){d.destroy();
return
}d.style&&d.el.css(d.style);
d.renderTo&&d.render(d.renderTo);
d.cmpCls&&d.el.addClass(d.cmpCls);
d.cls&&d.el.addClass(d.cls);
d.parentCmp&&d.parentCmp.addItems(d);
if(d.animateTarget){d.animateTarget=b(d.animateTarget);
d.effect=d.effect||"animateTarget"
}d.doInitStatus();
d.status.initialized=true
},initComponent:function(){},doListeners:function(){var d;
for(d in (this.config||this).listeners){if(this.config.listeners.hasOwnProperty(d)){this.addListener(d,this.listeners[d])
}}},setHeight:function(d){this.el.height(d);
this.height=d
},getHeight:function(){return this.el.height()||this.height
},getWidth:function(){return this.el.width()||this.width
},setWidth:function(d){this.width=d;
this.el.width(d)
},resize:function(d){this.el.css(d)
},addListener:function(g){var g=arguments[0];
a.EventManager.addListener.apply(this,arguments);
if(/^(before|after).+/.test(g)){var e=g.replace(/^(before|after)/,""),d=this;
if(typeof this[e]==="function"&&!this[e].original){var f=this[e];
this[e]=function(){if(d.trigger("before"+e,arguments)===false){return false
}var i=this[e].original.apply(this,arguments);
var h=a.util.asArray(arguments);
if(a._isDeferred(i)){i.done(function(){h.unshift("resolved");
d.trigger("after"+e,h)
}).fail(function(){h.unshift("rejected");
d.trigger("after"+e,h)
})
}else{h.unshift(i);
d.trigger("after"+e,h)
}return i
};
this[e].original=f
}else{if(typeof this[e]!=="function"){this.untreatedListeners=this.untreatedListeners||{};
this.untreatedListeners[g]=function(){d.trigger(g)
}
}}}},removeListener:function(){a.EventManager.removeListener.apply(this,arguments)
},trigger:function(){return a.EventManager.trigger.apply(this,arguments)
},render:function(d){this.el.appendTo(d)
},doInitStatus:function(){},effects:{der:c,normal:{show:function(){this.el.show();
this.effects.der.resolveWith(self)
},hide:function(){this.el.hide();
this.effects.der.resolveWith(this)
}},fade:{show:function(){var d=this;
this.el.fadeIn(function(){d.effects.der.resolveWith(d)
})
},hide:function(){var d=this;
this.el.fadeOut(function(){d.effects.der.resolveWith(d)
})
}},animateTarget:{show:function(){if(this.animateTarget.length){var d=this;
this.animateHelper=this.animateHelper||b('<div class="'+this.cmpCls+'_animateHelper"></div>').appendTo("body");
this.el.css({display:"block",visibility:"hidden"});
var e=this.animateTarget.offset();
var f=this.el.offset();
this.animateHelper.css({display:"block",width:this.animateTarget.width(),height:this.animateTarget.height(),left:e.left,top:e.top,opacity:"0.5"}).animate({height:""+this.getHeight(),width:""+this.getWidth(),left:""+f.left,top:""+f.top,opacity:"0.1"},"normal",function(){d.animateHelper.hide();
d.el.css({visibility:"visible"});
d.effects.der.resolveWith(d)
})
}},hide:function(){if(this.animateTarget.length){var d=this;
this.animateHelper=this.animateHelper||b('<div class="'+this.cmpCls+'_animateHelper"></div>').appendTo("body");
var e=this.animateTarget.offset();
var f=this.el.offset();
this.el.hide();
this.animateHelper.css({display:"block",height:this.getHeight(),width:this.getWidth(),left:f.left,top:f.top}).animate({width:""+this.animateTarget.width(),height:""+this.animateTarget.height(),left:""+e.left,top:""+e.top},"normal",function(){d.animateHelper.hide();
d.effects.der.resolveWith(d)
})
}}}},show:function(){var d=this;
if(!this.status.hidden){return false
}if(!this.effects.der||this.effects.der.state()!=="pending"){this.effects.der=b.Deferred();
(this.effects[this.effect||"normal"]||this.effects.normal).show.apply(this,arguments);
this.effects.der.done(function(){d.status.hidden=false
})
}return this.effects.der.promise()
},hide:function(){var d=this;
if(this.status.hidden){return false
}if(!this.effects.der||this.effects.der.state()!=="pending"){this.effects.der=b.Deferred();
(this.effects[this.effect||"normal"]||this.effects.normal).hide.apply(this,arguments);
this.effects.der.done(function(){d.status.hidden=true
})
}return this.effects.der.promise()
},destroy:function(){if(this.status){if(this.proxy){var d=this;
b.each(this.proxy,function(f){delete d.proxy[f]
})
}if(this.container&&this.container.destroy){this.container.destroy()
}if(this.parentCmp){this.parentCmp.removeItem(this,true)
}this.el.remove();
a.removeCmp(this.id);
var e;
for(e in this){if(this.hasOwnProperty(e)){delete this[e]
}}}}}})
})(jQuery,yaf);
(function(d,a,e){var c={type:"important",size:"small",btnCls:"",handler:d.noop,text:"",el:e,scope:e,renderTo:e,handlerArgs:e,status:{},processingText:e,timing:false};
var b={initComponent:function(f){if(f){this.doExistBtn(f)
}else{if(this.btnEl){this.doExistBtn(this.btnEl)
}else{this.createDom()
}this.doHandler();
this.el.appendTo(this.renderTo);
if(this.disabled){this.disable()
}}},doExistBtn:function(h){this.el=d(h);
this.text=this.config.text=this.el.text();
if(this.el.length){var g=this.el.attr("class"),f=this;
d.each(g.split(" "),function(j,k){if(/^btn_[a-z]*_[a-z]*$/.test(k)){f.btnCls=k;
return false
}});
this.doBtnCls()
}},doBtnCls:function(){if(this.btnCls){var f=this.btnCls.split("_");
this.size=f[1]||this.size;
this.type=f[2]||this.type
}else{this.btnCls=this.btnCls||"btn_"+this.size+"_"+this.type
}this.disabledCls=this.disabledCls||"btn_"+this.size+"_disabled"
},createDom:function(){this.doBtnCls();
this.el=d("<a></a>");
this.el.attr({href:a.util.ie6?"###":"javascript:void(0)","class":this.btnCls}).addClass(this.cls);
if(typeof this.text==="number"){this.text+=""
}var f=d('<span class="btn_wrap"></span>').text(this.text||"");
this.el.append(f)
},doHandler:function(){var f=this;
f.el.click(function(g){if(!f.status.disabled){f.process();
g.stopPropagation()
}else{g.stopPropagation();
g.preventDefault()
}})
},process:function(f){var g=this;
if(!g.status.disabled){var h;
if(g.handlerArgs instanceof Array){h=g.handler.apply(g.scope||g,g.handlerArgs)
}else{h=g.handler.call(g.scope||g,f,g,g.scope)
}if(a._isDeferred(h)){g.block();
h.always(function(){if(!g.der||g.der.state()!=="pending"){if(g.timing){g.block(g.timing,g.blockingText)
}else{g.done()
}}})
}else{if(g.timing){g.block(g.timing,g.blockingText)
}}}},block:function(g,f){this.disable();
if(d.isNumeric(g)){return this.time(g,f)
}else{if(this.processingText){this.setText(this.processingText)
}}},done:function(){this.enable();
this.setText(this.config.text);
if(this.der){this.der.resolveWith(this)
}},disable:function(){this.el.removeClass(this.btnCls).addClass(this.disabledCls);
this.status.disabled=true
},enable:function(){this.el.addClass(this.btnCls).removeClass(this.disabledCls);
this.status.disabled=false
},setHanlder:function(f){this.handler=f;
this.doHandler()
},setText:function(f){this.text=f;
this.el.find(".btn_wrap").text(this.text||"")
},time:function(i,h){this.der&&this.der.reject();
this.der=d.Deferred();
var f=this;
h=h||"";
if(this.interval){clearInterval(this.interval)
}this.interval=setInterval(function(){i--;
if(i<=0){clearInterval(f.interval);
f.der.resolveWith(f)
}else{f.der.notify(i)
}},1000);
this.disable();
function g(l){var k=[i];
var j=h.replace(/\{(.*)\}/,function(m,n){return k[n]||""
});
f.setText(j)
}g();
this.der.progress(g).done(function(){f.done()
});
return this.der.promise()
}};
a.createComponent({xtype:"Button",opts:c,methods:b,extend:a.Component,api:["setText","block","setHanlder","enable","disable","done","process"]})
})(jQuery,yaf);
(function(d,a,e){var c={items:[],src:e,content:e,contentHeight:"auto",height:"inherit",layout:{type:e},cmpCls:"yafCtnr",lazyLoad:false};
var b={initComponent:function(){this.addListener("contentchanged",function(){if(this.outward){this.outward.trigger("contentchanged")
}});
if(typeof this.layout==="string"){var f=this.layout;
this.layout={type:f}
}if(!this.lazyLoad){this.load()
}if(typeof this.height==="number"){this.el.height(this.height)
}},doLoader:function(){var g=this;
this.el.addClass(this.cmpCls+"_loading");
var f=this.loader.complete;
this.loader.complete=function(){g.el.removeClass(g.cmpCls+"_loading");
typeof f==="function"&&f.apply(g,arguments)
};
var h=this.loader.success;
this.loader.success=function(){typeof h==="function"&&h.apply(g,arguments)
};
return d.ajax(this.loader)
},doLayout:function(){},setLoader:function(f){this.loader=f;
this.el.empty();
this.doLoader()
},getContent:function(){return this.content
},setContent:function(f){f=d(f);
if(f.length&&this.el.children().get(0)!==f.get(0)){this.content=f;
if(this.outward){this.outward.content=this.content
}this.el.empty().append(this.content.show());
this.trigger("contentchanged")
}},getHtml:function(){return this.html
},setHtml:function(g){var f=this;
f.el.html(this.html=g||this.html);
f.el.find("img").on("load",function(){f.trigger("contentchanged")
});
f.trigger("contentchanged")
},getText:function(){return this.text
},setText:function(f){this.el.text(this.text=f||this.text).addClass(this.cmpCls+"Text");
this.trigger("contentchanged")
},empty:function(g){if(this.items&&this.cfgItems){var f=this.items.slice(0);
d.each(f,function(h,j){j&&j.destroy&&j.destroy()
})
}this.el.empty();
this.status.loaded=false;
if(g!==false){this.trigger("contentchanged")
}},reload:function(){this.empty(false);
this.load()
},load:function(){if(this.status.loaded){return false
}if(this.config.items instanceof Array&&this.config.items.length){this.renderItems()
}else{if(d(this.content).length){this.setContent(this.content)
}else{if(this.config.html){this.setHtml()
}else{if(this.config.text){this.setText()
}else{if(this.config.src){this.iframe=d('<iframe class="yafIframeContent" border="0" frameborder="0" src="about:blank" allowTransparency="true"></iframe>').appendTo(this.el);
this.iframe.attr("src",this.src)
}}}}}if(this.config.loader){this.doLoader()
}this.status.loaded=true
},renderItems:function(){var f=this;
this.items=[];
if(this.outward){this.outward.items=this.items
}if(this.outward){this.outward.items=this.items
}d.each(this.config.items,function(g,j){var h=f.renderItem(j);
if(h){h.render(this.el);
f.items.push(h)
}});
this.doLayout()
},renderItem:function(g,h){if(typeof g.layout==="string"){g.layout={type:g.layout}
}var f=a.register[g.xtype||(g.layout?g.layout.type?g.layout.type+"ctnr":"container":"container")];
g.renderTo=h||this.el;
if(f){return new f(g)
}},addItems:function(f){},removeItem:function(f){},destroy:function(){if(this.items&&this.items.length){var f=this.items.slice(0);
d.each(f,function(g,h){h&&h.destroy&&h.destroy()
})
}else{if(this.iframe){this.iframe.contentWindow.location="about:blank"
}}a.Component.prototype.destroy.apply(this,arguments)
}};
a.createComponent({xtype:"Container",opts:c,methods:b,extend:a.Component,api:["hide","show","status","render","doLoader","trigger","removeListener","addListener","load","destroy","addItems","removeItem","renderItem","renderItems","setText","setContent","setHtml","reload","getContent","getHtml","getText","setLoader"]})
})(jQuery,yaf);
(function(d,a,e){var c={activeTab:0,tab:"top",tabCls:"",contentHeight:"auto",height:"inherit",cmpCls:"yafTabCtnr",layout:{},lazyTab:true};
var b={renderItems:function(){var f=this;
this.tabBodyEl=d('<div class="'+this.cmpCls+'_tabbody"></div>');
if(this.tab==="top"){this.tabHeadEl=d('<div class="'+this.cmpCls+'_tabhead"></div>');
this.tabHeadList=d("<ul></ul>");
this.tabCls&&this.tabHeadEl.addClass(this.tabCls);
this.el.append(this.tabHeadEl.append(this.tabHeadList)).append(this.tabBodyEl)
}else{if(this.tab==="bottom"){}else{if(this.tab==="left"){}else{if(this.tab==="right"){}}}}if(this.config.items){this.items=[];
if(this.config.activeTab>=this.config.items.length){this.config.activeTab=0
}d.each(this.config.items,function(g,j){var h=f.renderItem(j,f.tabBodyEl);
f.items.push(h);
if(f.config.activeTab==g){f.setActiveTab(g)
}else{h.hide()
}})
}},renderItem:function(k){var g=this;
var f=d("<span></span>").text(k.tabTitle||k.title);
var i=d('<a href="javascript:void(0)"></a>').append(f);
if(k.icon){var h=d('<span class="'+this.cmpCls+'_icon"></span>');
h.addClass(k.icon);
f.prepend(h)
}this.tabHeadList.append(d("<li></li>").append(i));
k.lazyLoad=this.lazyTab;
var j=a.Container.prototype.renderItem.apply(this,arguments);
if(j){i.click(function(l){g.setActiveTab(j);
l.preventDefault();
l.stopPropagation()
});
j.tabTitleEl=i;
return j
}},setActiveTab:function(g){var h,f;
if(typeof g==="number"){if(g>=0&&g<this.items.length){h=this.items[g]
}}else{if(typeof g==="string"){h=a.getCmp(g)
}else{h=g
}}f=d.inArray(h,this.items);
if(h&&f>-1){if(this.activeTabItem!==h){if(this.activeTabItem){this.activeTabItem.hide();
this.activeTabItem.tabTitleEl.removeClass("activeTab")
}h.tabTitleEl.addClass("activeTab");
this.activeTabItem=h;
if(!h.status.loaded){h.load();
this.trigger("ontabinited",[h,f])
}h.show()
}}}};
a.createComponent({xtype:"TabCtnr",opts:c,methods:b,extend:a.Container,api:["setActiveTab","hide","show","status","render","doLoader","trigger","removeListener","addListener","load","destroy","addItems","removeItem","renderItem","renderItems","setText","setContent","setHtml","reload"]})
})(jQuery,yaf);
(function(d,a,e){var c={cmpCls:"yafWindow",style:{},lazyLoad:true,layout:{},frameHeight:50,frameWidth:20,tbar:["close"],width:500,height:300,renderTo:"body",autoShow:false,title:e,icon:e,minWidth:150,minHeight:100,modal:true,floor:"middle",defaultBtnType:"strong"};
var b={locate:function(f){var g={"margin-top":-(this.getHeight()/2)+"px","margin-left":-(this.getWidth()/2)+"px",position:"fixed"};
if(a.util.ie6){g.position="absolute"
}this.el.addClass("absoluteCenter").css(g)
},doContainer:function(){var h=this;
if(!h.layout||typeof h.layout==="string"){var g=h.layout;
h.layout={type:g}
}var f={items:h.items,height:h.contentHeight||"inherit",content:h.content,src:h.src,html:h.html,outward:h,el:h.bodyEl,text:h.text,loader:h.loader,lazyLoad:h.lazyLoad,listeners:h.untreatedListeners};
var i=h.container=new a.register[h.layout.type?h.layout.type+"ctnr":"container"](d.extend(f,h.layout));
h.proxy=h.proxy||{};
if(h.constructor.api instanceof Array){d.each(i,function(l,j){if(!(l in h.proxy)){h.proxy[l]=j
}})
}this.addListener("afterresize",function(){this.container.resize({height:this.contentHeight})
})
},initComponent:function(h){var f=this;
f.buildDom();
if(typeof f.height==="number"){f.contentHeight=f.height-f.frameHeight;
f.bodyEl.height(f.contentHeight)
}f.el.width(f.width);
f.initHead();
f.initButtons();
f.doDraggable();
f.doResizable();
var g={"z-index":a.zIndex.getMax(f.floor)};
if(f.modal!==false){if(!f.floor){f.floor="low";
g["z-index"]=a.zIndex.getMax(f.floor,2)
}f.initMask(g["z-index"]-1)
}f.el.css(g);
if(a.util.ie6){f.ie6Mask=d('<iframe border="0" frameborder="0" cellspacing="0" class="ie6mask" src="about:blank"></iframe>');
f.el.append(f.ie6Mask);
setTimeout(function(){f.status&&f.ie6Mask.css({height:f.el.innerHeight(),width:f.el.innerWidth()})
},100)
}f.doContainer();
f.addListener("contentchanged",function(){if(f.height==="auto"&&!f.status.hidden){setTimeout(function(){f.status&&f.locate("contentchanged");
if(a.util.ie6){f.status&&f.ie6Mask.css({height:f.el.innerHeight(),width:f.el.innerWidth()})
}},0)
}});
f.addListener("afterresize",function(){f.locate("center")
});
f.status.loaded=true
},doInitStatus:function(){this.status.hidden=true;
this.autoShow&&this.show()
},initMask:function(h){var f=this;
f.mask=d('<div class="'+f.cmpCls+'_mask"></div>').css({"z-index":h,width:d(window).width(),height:d(window).height(),top:document.documentElement?document.documentElement.scrollTop:document.body.scrollTop});
if(!a.maskResizeEvent){a.maskResizeEvent=true;
var g;
d(window).resize(function(){clearTimeout(g);
g=setTimeout(function(){d("."+f.cmpCls+"_mask").css({width:d(window).width(),height:d(window).height()})
},100)
});
d(window).scroll(function(){d("."+f.cmpCls+"_mask").css({top:document.documentElement?document.documentElement.scrollTop:document.body.scrollTop})
})
}if(a.util.ie6){this.mask.append('<iframe border="0" frameborder="0" cellspacing="0" class="" src="about:blank"></iframe>')
}if(d.isNumeric(this.modal)){this.mask.css({opacity:this.modal,filter:"alpha(opacity="+this.modal*100+")"})
}this.mask.appendTo("body")
},doDraggable:function(){if(this.draggable===true){this.el.draggable({handle:".yafWindow_tl"})
}else{if(a.util.isObject(this.draggable)){this.el.draggable(d.extend(this.draggable,{handler:".yafWindow_tl"}))
}}},doResizable:function(){if(this.height==="auto"){return
}var f=this;
var g={alsoResize:this.bodyEl,minWidth:this.minWidth,minHeight:this.minHeight,autoHide:true,stop:function(i,h){f.contentHeight=h.size.height;
f.trigger("afterresize")
}};
if(this.resizable===true){this.el.resizable(g)
}else{if(a.util.isObject(this.resizable)){this.el.resizable(d.extend(this.resizable,g))
}}},initHead:function(){if(this.title||(this.tbar&&this.tbar.length)||this.icon){if(this.icon){var f=d('<span class="'+this.cmpCls+'_head_icon"></span>');
f.addClass(this.icon);
this.headEl.append(f)
}this.titleEl=d('<span class="'+this.cmpCls+'_head_title"></span>');
this.titleEl.append(d("<span></span>").html(this.title));
var g=d('<span class="'+this.cmpCls+'_head_tools"></span>');
a.Tools.renderTools.call(this,this.tbar,g);
this.headEl.show().append(this.titleEl).append(g)
}else{this.headEl.hide()
}},initButtons:function(){var f=this;
f.bbar=f.buttons||f.bbar;
f.buttons=[];
if(f.bbar instanceof Array&&f.bbar.length){f.footEl=d('<div class="'+f.cmpCls+'_foot"></div>');
f.footEl.appendTo(f.el.find("."+f.cmpCls+"_bc"));
d.each(f.bbar,function(h,j){var g=new a.Button({renderTo:f.footEl,btnCls:j.cls,cls:f.cmpCls+"_btn",type:j.type||f.defaultBtnType,scope:f,size:j.size,text:j.text,handler:j.handler,disabled:j.disabled});
f.buttons.push(g)
})
}},buildDom:function(){var n=d("<div></div>").addClass(this.cmpCls+"_tl");
var k=d("<div></div>").addClass(this.cmpCls+"_tr");
var h=d("<div></div>").addClass(this.cmpCls+"_tc");
n.append(k.append(h));
var i=d("<div></div>").addClass(this.cmpCls+"_ml");
var f=d("<div></div>").addClass(this.cmpCls+"_mr");
var l=d("<div></div>").addClass(this.cmpCls+"_mc");
i.append(f.append(l));
var g=d("<div></div>").addClass(this.cmpCls+"_bl");
var m=d("<div></div>").addClass(this.cmpCls+"_br");
var j=d("<div></div>").addClass(this.cmpCls+"_bc");
g.append(m.append(j));
this.headEl=d('<div class="'+this.cmpCls+'_head"></div>');
this.headEl.appendTo(h);
this.bodyEl=d('<div class="'+this.cmpCls+'_body"></div>').appendTo(l);
this.el.append(n).append(i).append(g)
},getHeight:function(){return this.el.height()||this.height*1||0+this.frameHeight
},getWidth:function(){return this.el.width()||this.width*1||0+this.frameWidth
},setContentHeight:function(f){this.contentHeight=f;
this.bodyEl.height(f)
},show:function(){var f=this;
if(!f.status.hidden){return false
}if(f.modal!==false){if(a.util.ie6){f.mask.height(d(window).height())
}f.mask.show()
}f.el.css({display:"block",visibility:"hidden"});
f.locate("center");
f.el.css({display:"none",visibility:"visible"});
var g=a.Component.prototype.show.apply(this,arguments);
if(a._isDeferred(g)){g.done(function(){f.container&&f.container.load()
})
}return g
},close:function(){if(this.closeAction==="destroy"){this.destroy()
}else{this.hide()
}},hide:function(){var f=a.Component.prototype.hide.apply(this,arguments);
if(this.modal!==false){this.mask.hide()
}return f
},destroy:function(){if(this.modal!==false){this.mask.remove()
}d.each(this.buttons||[],function(f,g){g&&g.destroy&&g.destroy()
});
a.Component.prototype.destroy.apply(this,arguments)
},getTitle:function(){return this.title
},setTitle:function(f){this.title=f||"";
this.titleEl.html(this.title)
}};
a.createComponent({xtype:"Window",opts:c,methods:b,extend:yaf.Component,api:["content","status","setTitle","getTitle","destroy","show","hide","trigger","addListener","removeListener","close","setContentHeight","setHeight","setWidth","getWidth","getHeight"]});
a.baseMessageBox=function(k,h,f){var j={success:"yafMessage_success",error:"yafMessage_error",info:"yafMessage_info",loading:"yafMessage_loading",question:"yafMessage_question"}[h||"info"];
var g=d('<div class="yafMessage_ctnr"></div>');
var i=d('<span class="yafMessage_content '+j+'"></span>').html(k);
i.css({display:"inline-block"});
f.content=g.append(i);
f.autoShow=true;
f.height="auto";
f.width=400;
f.floor="high";
f.closeAction="destroy";
f.modal=0;
return new a.Window(f)
};
a.confirm=function(g,f,h){if(typeof f==="function"){h=f;
f="question"
}a.baseMessageBox(g,f,{title:"提示",tbar:[{id:"close",handler:function(){if(typeof h==="function"){h.call(this,false)
}this.close()
}}],bbar:[{text:"确定",handler:function(){if(typeof h==="function"){h.call(this,true)
}this.close()
}},{text:"取消",cls:"btn_small_normal",handler:function(){if(typeof h==="function"){h.call(this,false)
}this.close()
}}]})
};
a.alert=function(g,f,h){if(typeof f==="function"){h=f;
f="info"
}a.baseMessageBox(g,f,{title:"提示",tbar:[{id:"close",handler:function(){if(typeof h==="function"){h.call(this,false)
}this.close()
}}],bbar:[{text:"确定",handler:function(){if(typeof h==="function"){h.call(this,true)
}this.close()
}}]})
};
a.message=function(i,f,h){if(typeof f==="number"){h=f;
f="info"
}var g=a.baseMessageBox(i,f,{tbar:[]});
if(typeof h!=="number"){h=2
}if(h!==0){setTimeout(function(){g.status&&g.close()
},1000*h)
}return{close:function(){g.close&&g.close()
}}
}
})(jQuery,yaf);
(function(d,a,e){var c={template:"default",cmpCls:"yafTips",style:{},tbar:[],width:300,height:"auto",offset:{x:5,y:5},anchorOffset:{x:0,y:0},lazyLoad:true,title:e,icon:e,target:e,autoShow:false,trackMouse:false,floor:"middle",modal:false,group:e,type:"click",anchor:"bottom",autoHide:1,defaultBtnType:"important"};
var b={initComponent:function(){var f=this;
f.offset.x=f.offset.x||0;
f.offset.y=f.offset.y||0;
f.target=d(f.target);
f.renderTo="body";
if(!f.autoShow){f.respond();
if(typeof f.autoHide!=="number"&&!f.trackMouse){f.tbar.push("close")
}}else{f.currentTarget=f.target
}a.Window.prototype.initComponent.apply(f,arguments)
},respond:function(){var f=this;
if(this.autoHide===true){this.autoHide=0
}this.eventType="bind";
try{if(this.target.length===d(this.target.selector).length){this.eventType="live"
}}catch(g){}finally{}this.target[this.eventType](this.type,function(h){f.currentTarget=d(this);
f.show();
f.trigger("ontargetchanged",[f,f.currentTarget]);
clearTimeout(f.hideTimer)
});
this.el.add(this.target).bind("mouseover",function(){clearTimeout(f.hideTimer)
}).bind("mouseleave",function(){if(typeof f.autoHide=="number"){clearTimeout(f.hideTimer);
f.hideTimer=setTimeout(function(){f.status&&f.hide()
},f.autoHide*1000)
}});
if(this.trackMouse){this.autoHide=0;
this.target.mousemove(function(h){if(!f.status.hidden){f.el.css({left:h.pageX+f.offset.x+"px",top:h.pageY+f.offset.y+"px"})
}})
}},locate:function(p){if(!p||!p.length){return
}else{if(p==="contentchanged"){this.locate(this.currentTarget);
return
}}var n=this.getHeight(),s=this.getWidth(),l=this.anchor,i=p.offset(),o=d(p).width(),g=d(p).height(),k,f,m={},r=window.scrollY||document.body.scrollTop,t=window.scrollX||document.body.scrollLeft,q=document.documentElement;
if(q){k=window.innerWidth||q.clientWidth;
f=window.innerHeight||q.clientHeight;
r=window.scrollY||q.scrollTop;
t=window.scrollX||q.scrollLeft
}else{k=document.body.offsetWidth;
f=document.body.offsetHeight;
r=document.body.scrollTop;
t=document.body.scrollLeft
}k-=25;
f-=25;
space={top:i.top-r,left:i.left-t,right:k-i.left-o+t,bottom:f-i.top-g+r};
if(l=="auto"){l="bottom"
}if(/^(top|bottom)$/.test(l)&&space.bottom<=n+this.offset.y){if(space.top<=n+this.offset.y){l="left"
}else{l="top"
}}if(space.left<=s+this.offset.x&&l=="left"){l="right"
}if(space.right<=s+this.offset.x&&l=="right"){l="left"
}switch(l){case"left":m.top=i.top+(g-n)/2;
m.left=i.left-s-this.offset.x;
break;
case"right":m.top=i.top+(g-n)/2;
m.left=i.left+o+this.offset.x;
break;
case"top":m.left=i.left-s/2+o/2+this.offset.x;
m.top=i.top-n-this.offset.y;
break;
case"bottom":default:m.left=i.left-s/2+o/2+this.offset.x;
m.top=i.top+g+this.offset.y
}this.currentAnchor=l;
this.anchorLeft=s/2-7-this.offset.x+this.anchorOffset.x;
this.anchorTop=n/2-7-this.offset.y+this.anchorOffset.y;
if(m.left<t){var j=m.left;
m.left=t+5;
this.anchorLeft+=j-m.left
}else{if(m.left+s>t+k){var j=m.left;
m.left=t+k-5-s;
this.anchorLeft+=j-m.left
}}if(m.top<r){}this.locateAnchor(l,s,n);
this.el.css(m)
},getTarget:function(){return this.target
},getCurrentTarget:function(){return this.currentTarget
},locateAnchor:function(i,f,j){var g=this;
var k={top:{selector:"."+this.cmpCls+"_bc",css:{top:j,bottom:"auto",left:g.anchorLeft},cls:g.cmpCls+"_anchor"},bottom:{selector:"."+this.cmpCls+"_tc",css:{top:-8,bottom:"auto",left:g.anchorLeft},cls:g.cmpCls+"_anchor"},left:{selector:"."+this.cmpCls+"_mr",css:{right:-8,left:"auto",top:g.anchorTop},cls:g.cmpCls+"_anchor anchor_left"},right:{selector:"."+this.cmpCls+"_ml",css:{left:-8,right:"auto",top:g.anchorTop},cls:g.cmpCls+"_anchor anchor_right"}}[i];
this.anchorEl=this.anchorEl||d("<span></span>");
this.anchorEl.removeClass().addClass(k.cls);
this.el.find(k.selector).addClass("tipsAnchorWrap").append(this.anchorEl.css(k.css))
},show:function(f){if(f){f=d(f);
if(f.length){this.currentTarget=f
}}this.container&&this.container.load();
this.trackMouse||this.locate(this.currentTarget);
if(this.group){d.each(a.getCmps({group:this.group}),function(g,h){h.hide()
})
}return a.Component.prototype.show.apply(this,arguments)
},destroy:function(){if(this.eventType==="bind"){this.target.unbind(this.type)
}else{this.target.die(this.type)
}clearTimeout(self.hideTimer);
a.Window.prototype.destroy.apply(this,arguments)
}};
a.createComponent({xtype:"Tips",opts:c,methods:b,extend:a.Window,api:["getTarget","getCurrentTarget"]})
})(jQuery,yaf);