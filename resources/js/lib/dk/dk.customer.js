define(function () {

    var DK;

    DK = W = (function ($, window, document, undefined) {

        if (typeof console === "undefined") {
            window.console = {log: function () {
            }};
        }

        /**
         * 创建组件的核心方法
         **/
        function createComponent(cfg) {

            if (typeof cfg.xtype === "string") {
                var self = this;
                self[cfg.xtype] = function (c) {
                    this.superClass = cfg.extend;
                    c = c || {};

                    $.extend(true, this, cfg.opts);

                    this.id = this.id || W.getAutoID(this.autoIdPrefix);

                    if (typeof c === "string" || typeof c === "number") {
                        this.config = {};
                        $.extend(this.config, cfg.opts);
                        this.initialize(c);
                    }
                    else {
                        $.extend(this, c);
                        this.config = {};
                        $.extend(this.config, self[cfg.xtype].opts, c);
                        this.initialize();
                    }

                    //注册组件
                    W.addCmp(this.id, this);
                    return this.proxy || this;
                };

                if (cfg.extend) {
                    W.extend(self[cfg.xtype], cfg.extend);

                    if (cfg.api) {
                        cfg.api = $.unique(cfg.api.concat(cfg.extend.api));
                    }
                    else {
                        cfg.api = cfg.extend.api;
                    }
                }

                var xtype = cfg.xtype.toLowerCase();
                self.register[xtype] = self[cfg.xtype];
                $.extend(self.register[xtype].prototype, cfg.methods);
                self[cfg.xtype].prototype.xtype = xtype;
                self[cfg.xtype].api = cfg.api;
                self[cfg.xtype].opts = cfg.opts;
            }
        }

        /**
         　　 * @author pjn
         　　* @version 1.1
         * @description 新增业务组件Grid
         *              新增tb主题
         　　 */
        var W = {
            version        : "1.1",
            // 所有组件实例的集合
            components     : {},
            // 组件实例分组
            register       : {},
            layouts        : {
                register: {}
            },
            zIndex         : {
                no    : undefined,
                low   : 0,
                middle: 1000,
                high  : 10000,
                getMax: function (lvl, step) {
                    lvl = lvl || "low";
                    if (this.hasOwnProperty(lvl)) {
                        return this[lvl || "low"] += (step || 1);
                    }
                }
            },
            isCmp          : function (cmp) {
                return cmp && cmp.status;
            },
            _isDeferred    : function (der) {
                return der && typeof der.done === "function" && typeof der.fail === "function";
            },
            getCmp         : function (id) {
                var cmp = this.components[id];
                return cmp && cmp.proxy || cmp;
            },
            getCmps        : function (filters) {
                filters = filters || {};
                var cmps = [];
                $.each(this.components, function (k, v) {
                    var flag = true;
                    $.each(filters, function (fk, fv) {
                        if (v[fk] !== fv) {
                            return flag = false;
                        }
                    });

                    if (flag) {
                        cmps.push(v.proxy || v);
                    }
                });
                return cmps;
            },
            addCmp         : function (id, cmp) {
                if (typeof id === "string" || typeof id === "number") {
                    this.components[id] = cmp;
                }
            },
            removeCmp      : function (id) {
                delete this.components[id];
            },
            getAutoID      : function (prefix) {
                this.autoID = this.autoID || 0;
                this.autoID++;
                return (prefix || "DKCmp") + this.autoID;
            },
            /**
             * 仅用于prototype方式的继承
             **/
            extend         : function (subCls, superCls) {
                $.each(superCls.prototype, function (k, v) {
                    subCls.prototype[k] = subCls.prototype[k] || v;
                });
            },
            setDefaultOpts : function (xtype, opts) {
                $.extend(W.register[xtype].opts, opts);
            },
            createComponent: createComponent,
            /**
             * 做测试用到的函数集合
             **/
            test           : {
                effCompare: function () {
                    var args = W.util.asArray(arguments), len = args.length, times = 100, i;
                    if (len >= 2) {
                        if (typeof args[len - 1] === "number") {
                            times = args[len - 1];
                        }
                        $.each(args, function (j, e) {
                            if (typeof e === "function") {
                                var s = new Date().getTime();
                                for (i = 0; i < times; i++) {
                                    e();
                                }
                                console.log(j + "--" + (new Date().getTime() - s));
                            }
                        });
                    }
                }
            },
            module         : function (ns, callback) {
                if (!ns || typeof ns !== "string") {
                    console.log("error namespace : " + ns);
                }
                if (typeof window[ns] === "undefined") {
                    if (typeof callback === "function") {
                        window[ns] = callback() || {};
                    }
                    else {
                        window[ns] = {};
                    }
                }
                else {
                    console.log("namespace " + ns + " already exists");
                }
            }
        };

        W.Tools = {
            types      : {
                close: {
                    title         : "关闭",
                    cls           : "DKTool DKTool_close",
                    defaultHandler: function (event, tool, panel, params) {
                        if (panel.close) {
                            panel.close();
                        }
                        else {
                            panel.hide();
                        }
                    }
                },
                gear : {
                    title         : "设置",
                    cls           : "DKTool DKTool_gear",
                    defaultHandler: function (event, tool, panel, params) {

                    }
                },
                help : {
                    title         : "帮助",
                    cls           : "DKTool DKTool_help",
                    defaultHandler: function (event, tool, panel, params) {
                    }
                },
                more : {
                    title         : "更多",
                    cls           : "DKTool DKTool_more",
                    defaultHandler: function (event, tool, panel, params) {

                    }
                }
            },
            renderTools: function (tools, el) {
                var self = this;
                if (tools instanceof Array && tools.length) {
                    $.each(tools, function (i, e) {
                        var tool, handler, name;
                        if (typeof e === "string") {
                            if (!W.Tools.types.hasOwnProperty(e)) {
                                return;
                            }
                            name = e;
                            tool = W.Tools.types[e];
                            handler = tool.defaultHandler;
                        }
                        else if (W.util.isObject(e)) {
                            name = e.id;
                            tool = W.Tools.types[e.id] || e;
                            handler = e.handler || tool.defaultHandler || $.noop;
                        }
                        else {
                            return;
                        }
                        var toolEl = $('<a href="javascript:void(0)" class="' + tool.cls + '"></a>').text(tool.text || "");
                        toolEl.click(function (e) {
                            handler.call(self, e, toolEl, self);
                            //e.preventDefault();
                            e.stopPropagation();
                        });
                        toolEl.appendTo(el);
                    });
                }
            }
        };

        //事件管理
        W.EventManager = {
            events        : {},
            addListener   : function (type, handler, scope, params) {
                this.events = this.events || {};
                this.events[type] = this.events[type] || [];
                this.events[type].push({
                    handler: handler,
                    scope  : scope,
                    params : params
                });
            },
            removeListener: function (type, handler, scope) {
                if (this.events) {
                    this.events[type] = $.grep(this.events[type], function (e) {
                        var s = scope || e.scope;
                        var h = handler || e.handler;
                        return e.scope !== s || e.handler !== h;
                    });
                }
            },
            trigger       : function (type, params) {
                if (this.events) {
                    var fns = this.events[type], i, fn;
                    if (!fns) {
                        return;
                    }
                    for (i = 0; fn = fns[i]; i++) {
                        if (fn.handler.apply(fn.scope || this, params || fn.params || []) === false) {
                            return false;
                        }
                    }
                }
            }
        };

        /**
         * ie6/7中使用userData做本地存储
         */
        var UserData = {
            userData   : null,
            name       : location.hostname,
            expiresDays: 360,
            init       : function () {
                if (!UserData.userData) {
                    try {
                        UserData.userData = document.createElement('INPUT');
                        UserData.userData.type = "hidden";
                        UserData.userData.style.display = "none";
                        UserData.userData.style.behavior = "url('#default#userData')";
                        UserData.userData.addBehavior("#default#userData");
                        document.body.appendChild(UserData.userData);
                        var expires = new Date();
                        expires.setDate(expires.getDate() + UserData.expiresDays);
                        UserData.userData.expires = expires.toUTCString();
                    } catch (e) {
                        return false;
                    }
                }
                return true;
            },
            clear      : function () {

            },
            setItem    : function (key, value) {

                if (UserData.init()) {
                    UserData.userData.load(UserData.name);
                    UserData.userData.setAttribute(key, value);
                    UserData.userData.save(UserData.name);
                }
            },
            getItem    : function (key) {
                if (UserData.init()) {
                    UserData.userData.load(UserData.name);
                    return UserData.userData.getAttribute(key);
                }
            },
            removeItem : function (key) {
                if (UserData.init()) {
                    UserData.userData.load(UserData.name);
                    UserData.userData.removeAttribute(key);
                    UserData.userData.save(UserData.name);
                }

            }
        };
        W.UserData = UserData;
        W.localStorage = window.localStorage || W.UserData;

        W.restGet = function (url, data, success, error, type) {
            var der = $.Deferred();
            $.ajax({
                url     : url,
                type    : type || "get",
                data    : data,
                dataType: "json"
            }).done(function (data) {
                    if (data && data.code === 1000) {
                        if (typeof success === "function") {
                            success.call(this, data);
                        }
                        der.resolve();
                    }
                    else {
                        der.reject(data);
                    }
                }).fail(function () {
                    der.reject();
                });
            return der.promise();
        };

        W.restPost = function (url, data, success, error) {
            return W.restGet(url, data, success, error, "post");
        };

        var supportTester = document.createElement("INPUT");
        W.support = {
            placeholder  : "placeholder" in supportTester,
            css3Animation: "webkitAnimation" in supportTester.style || "oAnimation" in supportTester.style || "mozAnimation" in supportTester.style || "animation" in supportTester.style
        };

        return W;
    })(jQuery, window, document);
    (function ($, W, window, undefined) {
        W.util = {
            //是否为手持设备
            isTouchDevice         : 'ontouchstart' in window,
            //浏览器是否为ie6
            ie6                   : typeof document.body.style.maxHeight === "undefined",
            /**
             * 对特殊字符进行编码
             */
            encodeHtmlChar        : function (input) {
                return String(input).replace(/["<>& ]/g, function (all) {
                    return "&" + {
                        '"': 'quot',
                        '<': 'lt',
                        '>': 'gt',
                        '&': 'amp',
                        ' ': 'nbsp'
                    } [all] + ";";
                });
            },
            asArray               : function (arr, start, end) {
                return Array.prototype.slice.call(arr, start || 0, end || arr.length);
            },
            isObject              : function (o) {
                return !!o && Object.prototype.toString.call(o) === "[object Object]";
            },
            isEmail               : function (email) {
                return (/^[a-zA-Z_0-9\-\.]{1,100}@[a-zA-Z_0-9\-]{1,50}(\.[a-zA-Z_0-9\-]{1,50}){0,2}\.[a-zA-Z]{2,4}$/).test(email);
            },
            isDateStr             : function (date) {
                return (/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/).test(date);
            },
            isUrl                 : function (url) {
                return (/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i).test(url);
            },
            isPhoneNo             : function (no) {
                return (/^(\+86)?1[3458]\d{9}$/).test(no);
            },
            /**
             * 设置cookie
             * @param {[type]} name    [description]
             * @param {[type]} value   [description]
             * @param {[type]} expires 单位天
             * @param {[type]} path    [description]
             */
            setCookie             : function (name, value, expires, path) {
                $.cookie(name, value, {
                    expires: expires,
                    path   : path
                });
            },
            getCookie             : function (name) {
                return $.cookie(name);
            },
            deleteCookie          : function (name, path) {
                $.cookie(name, null, {expires: -1, path: path});
            },
            getCharCount          : function (str) {
                if (str) {
                    return str.replace(/[\u4E00-\u9FA5]|[^\x00-\xff]/ig, "cc").length;
                }
                return 0;
            },
            deserializeQueryString: function (queryString) {
                if (queryString) {
                    var args = {};

                    if (queryString.charAt(0) === "?") {
                        queryString = queryString.substring(1);
                    }

                    //这里的pairs是一个字符串数组
                    var pairs = queryString.split("&");
                    for (var i = 0; i < pairs.length; i++) {
                        var sign = pairs[i].indexOf("=");
                        //如果没有找到=号，那么就跳过，跳到下一个字符串（下一个循环）。
                        if (sign === -1) {
                            continue;
                        }

                        var aKey = pairs[i].substring(0, sign);
                        var aValue = pairs[i].substring(sign + 1);

                        args[aKey] = aValue;
                    }

                    return args;
                }
            },
            formatDate            : function () {

                var args = W.util.asArray(arguments), format, date, i;

                for (i = 0; i < 2 && i < args.length; i++) {
                    if (typeof args[i] === "string") {
                        format = args[i];
                    }
                    else if (args[i] instanceof Date) {
                        if (/Invalid|NaN/.test(args[i])) {
                            return;
                        }
                        date = args[i];
                    }
                }

                format = format || "Y-m-d H:i:s";

                date = date || new Date();


                function pad(num) {
                    return num < 10 ? "0" + num : num;
                }

                var d = {
                    Y: date.getFullYear(),
                    m: pad(date.getMonth() + 1),
                    d: pad(date.getDate()),
                    H: pad(date.getHours()),
                    i: pad(date.getMinutes()),
                    s: pad(date.getSeconds())
                };

                return format.replace(/[YmdHis]/g, function (key, pos) {
                    return d[key] || "";
                });
            },
            /**
             * 解析事件串
             * @param  目前仅支持 格式 - "2012-12-12 12:12:12"
             * @return Date
             */
            parseDate             : function (str) {
                function parse(number) {
                    return number * 1;
                }

                if (typeof str === 'string') {
                    var results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);


                    if (results && results.length > 3) {
                        return new Date(parse(results[1]), parse(results[2]) - 1, parse(results[3]));
                    }
                    results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}) *$/);
                    if (results && results.length > 5) {
                        return new Date(parse(results[1]), parse(results[2]) - 1, parse(results[3]), parse(results[4]), parse(results[5]));
                    }
                    results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
                    if (results && results.length > 6) {
                        return new Date(parse(results[1]), parse(results[2]) - 1, parse(results[3]), parse(results[4]), parse(results[5]), parse(results[6]));
                    }
                    results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);
                    if (results && results.length > 7) {
                        return new Date(parse(results[1]), parse(results[2]) - 1, parse(results[3]), parse(results[4]), parse(results[5]), parse(results[6]), parse(results[7]));
                    }
                }
                return null;
            },
            formatStr             : function (format) {
                var args = W.util.asArray(arguments, 1);
                return format.replace(/\{(\d+)\}/g, function (m, i) {
                    return args[i];
                });
            },
            /**
             * 使用豆点分割的方式格式化数字
             * @param  number
             * @param  accuracy 保留小数位数
             * @return
             */
            formatNumber          : function (number, accuracy) {
                var reg = /(\d)(?=(\d{3})+(\.|$))/g;

                if (!$.isNumeric(number)) {
                    return number;
                }

                if ($.isNumeric(accuracy)) {
                    accuracy = parseInt(accuracy, 10) || 0;
                }
                else {
                    accuracy = 2;
                }

                number = Math.round(number * Math.pow(10, accuracy)) / Math.pow(10, accuracy);

                number = String(number).replace(reg, function (r) {
                    return r + ",";
                });

                return number;
            }
        };

        function jsonStringify(obj) {
            var key, i, result = [], valueStr;
            if ($.isPlainObject(obj)) {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        var value = obj[key];
                        valueStr = _toJsonStr(value);

                        if (valueStr !== false) {
                            result.push('"' + key + '":' + valueStr);
                        }
                    }
                }
                return "{" + result.join(",") + "}";
            }
            else if (obj instanceof Array) {
                for (i = 0; i < obj.length; i++) {
                    valueStr = _toJsonStr(obj[i]);
                    if (valueStr !== false) {
                        result.push(valueStr);
                    }
                }
                return "[" + result.join(",") + "]";
            }
            return "null";
        }

        function _toJsonStr(value) {
            var valueStr;
            if (typeof value === "string") {
                valueStr = '"' + value + '"';
            }
            else if (value instanceof Array) {
                valueStr = jsonStringify(value);
            }
            else if (value === undefined) {
                valueStr = false;
            }
            else if (value === null) {
                valueStr = "null";
            }
            else if (typeof value === "number") {
                valueStr = value;
            }
            else {
                valueStr = jsonStringify(value);
            }
            return valueStr;
        }

        W.util.jsonStringify = ("JSON" in window) && JSON.stringify ? JSON.stringify : jsonStringify;

    })(jQuery, DK, window);
    (function ($, W, undefined) {
        W.createComponent({
            xtype  : "Component",
            opts   : {},
            extend : undefined,
            api    : ["status", "el", "show", "hide", "destroy", "getWidth", "setWidth", "getHeight", "setHeight", "addListener", "removeListener", "trigger", "render"],
            methods: {
                initialize    : function () {

                    var api = this.constructor.api,
                        self = this;

                    self.status = {
                        initialized: false
                    };

                    self.events = self.events || {};

                    //初始化组件容器
                    self.el = $(self.el || "<div></div>");

                    if (self.id) {
                        self.el.attr("id", self.id);
                    }

                    if (api instanceof Array) {
                        self.proxy = self.proxy || {
                            constructor: self.constructor
                        };

                        $.each(api, function (i, e) {
                            if (e in self.proxy) {
                                return;
                            }

                            if (typeof self[e] === "function") {
                                self.proxy[e] = function () {
                                    return self[e] && self[e].apply(self, arguments);
                                };
                            }
                            else {
                                self.proxy[e] = self[e];
                            }
                        });
                    }

                    //调用组件子类的初始化方法
                    if (self.initComponent() === false) {
                        self.destroy();
                        return;
                    }
                    self.doListeners();
                    if (self.style) {
                        self.el.css(self.style);
                    }

                    //统一调用render方法
                    if (self.renderTo) {
                        self.render(self.renderTo);
                    }

                    if (self.cmpCls) {
                        self.el.addClass(self.cmpCls);
                    }

                    if (self.cls) {
                        self.el.addClass(self.cls);
                    }

                    if (self.parentCmp) {
                        self.parentCmp.addItems(self);

                    }

                    if (self.animateTarget) {
                        self.animateTarget = $(self.animateTarget);
                        self.effect = self.effect || "animateTarget";
                    }

                    self.doInitStatus();
                    //调用初始化事件方法

                    self.status.initialized = true;
                },
                initComponent : function () {

                },
                doListeners   : function () {
                    var k;
                    for (k in (this.config || this).listeners) {
                        if (this.config.listeners.hasOwnProperty(k)) {
                            this.addListener(k, this.listeners[k]);
                        }
                    }
                },
                setHeight     : function (height) {
                    this.el.height(height);
                    this.height = height;
                },
                getHeight     : function () {
                    return this.el.height() || this.height;
                },
                getWidth      : function () {
                    return this.el.width() || this.width;
                },
                setWidth      : function (width) {
                    this.width = width;
                    this.el.width(width);
                },
                resize        : function (size) {
                    this.el.css(size);
                },
                addListener   : function (type, handler, scope, ars) {
                    var self = this,
                        proxy = self.proxy || self;

                    W.EventManager.addListener.apply(proxy, [type, handler, scope, ars]);
                    if (/^(before|after)\w+/.test(type)) {
                        var name = type.replace(/^(before|after)/, "");
                        if (typeof self[name] === "function" && !self[name].original) {
                            var tmp = self[name];
                            self[name] = function () {
                                if (self.trigger("before" + name, arguments) === false) {
                                    return false;
                                }
                                var ret = self[name].original.apply(self, arguments);

                                var args = W.util.asArray(arguments);


                                //简单的判断时候为延迟函数
                                if (W._isDeferred(ret)) {
                                    ret.done(function () {
                                        args.unshift("resolved");
                                        self.trigger("after" + name, args);
                                    }).fail(function () {
                                            args.unshift("rejected");
                                            self.trigger("after" + name, args);
                                        });
                                }
                                else {
                                    args.unshift(ret);
                                    self.trigger("after" + name, args);
                                }

                                return ret;
                            };
                            self[name].original = tmp;
                        }
                    }
                },
                removeListener: function () {
                    W.EventManager.removeListener.apply(this.proxy || this, arguments);
                },
                trigger       : function () {
                    return W.EventManager.trigger.apply(this.proxy || this, arguments);
                },
                render        : function (renderTo) {
                    if (W.isCmp(renderTo) && renderTo.getOutWard) {
                        this.outward = renderTo.getOutWard();
                        this.el.appendTo(renderTo.el);
                    }
                    else {
                        this.el.appendTo(renderTo);
                    }
                    this.status.rendered = true;
                },
                doInitStatus  : function () {

                },
                effects       : {
                    //show|hide公用一个deferrred
                    der          : undefined,
                    normal       : {
                        show: function () {
                            this.el.show();
                            this.effects.der.resolveWith(this);

                        },
                        hide: function () {
                            this.el.hide();
                            this.effects.der.resolveWith(this);
                        }
                    },
                    fade         : {
                        show: function () {
                            var self = this;
                            this.el.fadeIn(function () {
                                self.effects.der.resolveWith(self);
                            });
                        },
                        hide: function () {
                            var self = this;
                            this.el.fadeOut(function () {
                                self.effects.der.resolveWith(self);
                            });
                        }
                    },
                    /**
                     *
                     * @type {Object}
                     */
                    animateTarget: {
                        show: function () {
                            if (this.animateTarget.length) {
                                var self = this;
                                this.animateHelper = this.animateHelper || $('<div class="' + this.cmpCls + '_animateHelper"></div>').appendTo("body");
                                this.el.css({
                                    display   : "block",
                                    visibility: "hidden"
                                });
                                var offset = this.animateTarget.offset();
                                var winOffset = this.el.offset();

                                this.animateHelper.css({
                                    display: "block",
                                    width  : this.animateTarget.width(),
                                    height : this.animateTarget.height(),
                                    left   : offset.left,
                                    top    : offset.top,
                                    opacity: "0.5"
                                }).animate({
                                        height : "" + this.getHeight(),
                                        width  : "" + this.getWidth(),
                                        left   : "" + winOffset.left,
                                        top    : "" + winOffset.top,
                                        opacity: "0.1"
                                    }, "normal", function () {
                                        self.animateHelper.hide();
                                        self.el.css({
                                            visibility: "visible"
                                        });
                                        self.effects.der.resolveWith(self);
                                    });
                            }
                        },
                        hide: function () {
                            if (this.animateTarget.length) {
                                var self = this;
                                this.animateHelper = this.animateHelper || $('<div class="' + this.cmpCls + '_animateHelper"></div>').appendTo("body");
                                var offset = this.animateTarget.offset();
                                var winOffset = this.el.offset();
                                this.el.hide();
                                this.animateHelper.css({
                                    display: "block",
                                    height : this.getHeight(),
                                    width  : this.getWidth(),
                                    left   : winOffset.left,
                                    top    : winOffset.top
                                }).animate({
                                        width : "" + this.animateTarget.width(),
                                        height: "" + this.animateTarget.height(),
                                        left  : "" + offset.left,
                                        top   : "" + offset.top
                                    }, "normal", function () {
                                        self.animateHelper.hide();
                                        self.effects.der.resolveWith(self);
                                    });

                            }
                        }
                    }
                },
                show          : function () {
                    var self = this;
                    if (!this.status.hidden) {
                        return false;
                    }
                    if (!this.effects.der || this.effects.der.state() !== "pending") {
                        this.effects.der = $.Deferred();
                        (this.effects[this.effect || "normal"] || this.effects.normal).show.apply(this, arguments);
                        this.effects.der.done(function () {
                            self.status.hidden = false;
                        });
                    }
                    return this.effects.der.promise();
                },
                hide          : function () {
                    var self = this;
                    if (this.status.hidden) {
                        return false;
                    }
                    if (!this.effects.der || this.effects.der.state() !== "pending") {
                        this.effects.der = $.Deferred();
                        (this.effects[this.effect || "normal"] || this.effects.normal).hide.apply(this, arguments);
                        this.effects.der.done(function () {
                            self.status.hidden = true;
                        });
                    }
                    return this.effects.der.promise();
                },
                destroy       : function () {
                    if (this.status) {
                        if (this.proxy) {
                            var self = this;
                            $.each(this.proxy, function (k) {
                                delete self.proxy[k];
                            });
                        }

                        if (this.container && this.container.destroy) {
                            this.container.destroy();
                        }

                        if (this.parentCmp) {
                            //第二个参数true表示不再次调用组件的destroy
                            this.parentCmp.removeItem(this, true);
                        }
                        this.el.remove();
                        W.removeCmp(this.id);
                        //删除对象内的所有自身属性
                        var i;
                        for (i in this) {
                            if (this.hasOwnProperty(i)) {
                                delete this[i];
                            }
                        }
                    }
                }
            }
        });
    })(jQuery, DK);
    (function ($, W, undefined) {

        var opts = {
            type          : "important",
            size          : "small",
            btnCls        : "",
            handler       : $.noop,
            text          : "",
            el            : undefined,
            scope         : undefined,
            renderTo      : undefined,
            handlerArgs   : undefined,
            status        : {},
            processingText: undefined,
            timing        : false
        };

        var methods = {
            initComponent: function (args) {
                if (args) {
                    this.doExistBtn(args);
                }
                else {
                    if (this.btnEl) {
                        this.doExistBtn(this.btnEl);
                    }
                    else {
                        this.createDom();
                    }
                    this.doHandler();
                    this.el.appendTo(this.renderTo);
                    if (this.disabled) {
                        this.disable();
                    }
                }
            },
            doExistBtn   : function (btn) {
                this.el = $(btn);
                this.text = this.config.text = this.el.text();
                if (this.el.length) {
                    var btnCls = this.el.attr("class"), self = this;
                    $.each(btnCls.split(" "), function (i, e) {
                        if (/^btn_[a-z]*_[a-z]*$/.test(e)) {
                            self.btnCls = e;
                            return false;
                        }
                    });
                    this.doBtnCls();
                }
            },
            doBtnCls     : function () {
                if (this.btnCls) {
                    var arr = this.btnCls.split("_");
                    this.size = arr[1] || this.size;
                    this.type = arr[2] || this.type;
                }
                else {
                    this.btnCls = this.btnCls || "btn_" + this.size + "_" + this.type;
                }
                this.disabledCls = this.disabledCls || "btn_" + this.size + "_disabled";
            },
            createDom    : function () {
                this.doBtnCls();

                this.el = W.util.ie6 ? $('<a href="###"></a>') : $('<a href="javascript:void(0)"></a>');
                this.el.attr({
                    "class": this.btnCls
                }).addClass(this.cls);
                if (typeof this.text === "number") {
                    this.text += "";
                }
                var span = $("<span class=\"btn_wrap\"></span>").text(this.text || "");
                this.el.append(span);

            },
            doHandler    : function () {
                var self = this;
                self.el.click(function (evt) {
                    if (!self.status.disabled) {
                        self.process();
                        evt.stopPropagation();
                    }
                    else {
                        evt.stopPropagation();
                        evt.preventDefault();
                    }
                });
            },
            process      : function (evt) {
                var self = this;
                if (!self.status.disabled) {

                    var ret;

                    if (self.handlerArgs instanceof Array) {
                        ret = self.handler.apply(self.scope || self, self.handlerArgs);
                    }
                    else {
                        ret = self.handler.call(self.scope || self, evt, self, self.scope);
                    }

                    if (W._isDeferred(ret)) {
                        self.block();
                        ret.always(function () {
                            if (!self.der || self.der.state() !== "pending") {
                                if (self.timing) {
                                    self.block(self.timing, self.blockingText);
                                }
                                else {
                                    self.done();
                                }
                            }
                        });
                    }
                    else if (self.timing) {
                        self.block(self.timing, self.blockingText);
                    }

                }
            },
            block        : function (seconds, text) {
                this.disable();
                if ($.isNumeric(seconds)) {
                    return this.time(seconds, text);
                }
                else {
                    if (this.processingText) {
                        this.setText(this.processingText);
                    }
                }
            },
            done         : function () {
                this.enable();
                this.setText(this.config.text);
                if (this.der) {
                    this.der.resolveWith(this);
                }
            },
            disable      : function () {
                this.el.removeClass(this.btnCls).addClass(this.disabledCls);
                this.status.disabled = true;
            },
            enable       : function () {
                this.el.addClass(this.btnCls).removeClass(this.disabledCls);
                this.status.disabled = false;
            },
            /*destroy: function() {
             W.Component.prototype.destroy.apply(this, arguments);
             },
             show: function() {
             this.el.show();
             },
             hide: function() {
             this.el.hide();
             },*/
            setHanlder   : function (handler) {
                this.handler = handler;
                this.doHandler();
            },
            setText      : function (text) {
                this.text = text;
                this.el.find(".btn_wrap").text(this.text || "");
            },
            /**
             * 定时
             * @param  {[type]} seconds [disaebld的时间（秒）]
             * @param  {[type]} text    [disabled显示的文本]
             * @return {[type]}         [description]
             */
            time         : function (seconds, text) {
                var self = this;
                if (self.der) {
                    self.der.reject();
                }
                self.der = $.Deferred();
                text = text || "";

                if (self.interval) {
                    clearInterval(self.interval);
                }
                self.interval = setInterval(function () {
                    seconds--;
                    if (seconds <= 0) {
                        clearInterval(self.interval);
                        self.der.resolveWith(self);
                    }
                    else {
                        self.der.notify(seconds);
                    }

                }, 1000);

                self.disable();

                function progress(remind) {
                    var replacement = [seconds];

                    var t = text.replace(/\{(\w*)\}/, function (para, key) {
                        return replacement[key] || "";
                    });
                    self.setText(t);
                }

                progress();
                self.der.progress(progress).done(function () {
                    self.done();
                });

                return self.der.promise();
            }
        };

        W.createComponent({
            xtype  : "Button",
            opts   : opts,
            methods: methods,
            extend : W.Component,
            api    : ["setText", "block", "setHanlder", "enable", "disable", "done", "process"]
        });

    })(jQuery, DK);
    (function ($, W, undefined) {
        var opts = {
            start     : undefined,
            limit     : undefined,
            total     : undefined,
            page      : undefined,
            totalPages: undefined,
            listeners : {
                onpagechanged: function () {
                }
            }
        };

        var methods = {
            initComponent : function () {
                this.el = $("<div class='DKPagebar'></div>");
                this.buildBar();
            },
            destroyButtons: function () {
                if (this.buttons && this.buttons.length) {
                    $.each(this.buttons, function (i, e) {
                        if (e && e.status) {
                            e.destroy();
                        }
                    });
                }
            },
            destroy       : function () {
                this.destroyButtons();
                W.Component.prototype.destroy.apply(this, arguments);
            },
            empty         : function () {
                this.destroyButtons();
                this.el.empty();
            },
            getLimit      : function () {
                return this.limit;
            },
            getTotal      : function () {
                return this.total;
            },
            getStart      : function () {
                return this.start;
            },
            page          : function (page) {
                if (!this.status.disable) {
                    if (page >= this.totalPages && this.totalPages >= 1) {
                        page = this.totalPages - 1;
                    }
                    else if (page < 0) {
                        page = 0;
                    }
                    this.start = page * this.limit;
                    if (this.trigger("onpagechanged", [this.start, this.limit, page]) !== false) {
                        this.reload();
                    }
                }
            },
            reload        : function (info) {
                this.empty();
                if (info) {
                    this.start = info.start === 0 ? 0 : (info.start || this.start);
                    this.limit = info.limit === 0 ? 0 : (info.limit || this.limit);
                    this.total = info.total === 0 ? 0 : (info.total || this.total);
                }
                this.buildBar();
            },
            /**
             * 组装pagebar
             * @return {[type]} [description]
             */
            buildBar      : function () {
                //this.destroyPageInfo();
                this.buttons = [];
                var self = this, start = this.start * 1 || 0, limit = this.limit * 1 || 20, total = this.total * 1 || 0, totalPages, currentPage, pages = {}, sp = {};

                this.totalPages = totalPages = Math.ceil(total / limit);
                currentPage = Math.ceil((start + 1) / limit);

                pages[totalPages - 1] = totalPages - 1;
                pages[0] = 0;

                pages[currentPage - 1] = currentPage - 1;
                pages[currentPage] = currentPage;
                pages[currentPage + 1] = currentPage + 1;
                pages[currentPage - 2] = currentPage - 2;
                pages[currentPage - 3] = currentPage - 3;
                pages.length = totalPages;

                this.pageInfo = {
                    start      : start,
                    limit      : limit,
                    total      : total,
                    currentPage: currentPage,
                    totalPages : totalPages
                };
                var pageTags = [];

                //使用类数组处理, 简化逻辑判断
                $.each(W.util.asArray(pages), function (i, e) {
                    if (e !== undefined) {
                        pageTags.push({
                            text   : e + 1,
                            current: e + 1 === currentPage
                        });
                    }
                    else {
                        if (!sp[i > currentPage ? "before" : "after"]) {
                            sp[i > currentPage ? "before" : "after"] = true;
                            pageTags.push({
                                separate: true
                            });
                        }
                    }
                });

                var prev = new W.Button({
                    text       : "上一页",
                    type       : "simple",
                    cls        : "btn_prev",
                    disabledCls: "btn_simple_disabled",
                    disabled   : currentPage <= 1,
                    renderTo   : self.el,
                    handler    : function () {
                        self.page(currentPage - 2);
                    }
                });

                $.each(pageTags, function (i, e) {
                    var tag;
                    if (e.separate) {
                        self.el.append("...");
                    }
                    else {

                        if (!e.current) {
                            var cfg = {
                                renderTo: self.el,
                                text    : e.text,
                                type    : "simple",
                                handler : function () {
                                    self.page(e.text - 1);
                                }
                            };
                            self.buttons.push(new W.Button(cfg));
                        }
                        else {
                            self.el.append("<span class='DKPageBar_current'>" + e.text + "</span>");
                        }

                    }

                });

                var next = new W.Button({
                    text       : "下一页",
                    type       : "simple",
                    cls        : "btn_next",
                    disabledCls: "btn_simple_disabled",
                    disabled   : currentPage >= totalPages,
                    renderTo   : self.el,
                    handler    : function () {
                        self.page(currentPage);
                    }
                });

                this.el.append("&nbsp;&nbsp;共" + totalPages + "页&nbsp;&nbsp;到第<input type='text'/>页&nbsp;");

                var gotoBtn = new W.Button({
                    text    : "前往",
                    type    : "normal",
                    cls     : "btn_goto",
                    disabled: currentPage > totalPages,
                    renderTo: self.el,
                    handler : function () {
                        var input = self.el.find("input");
                        var page = (input.val() * 1);

                        if (page > totalPages) {
                            page = totalPages;
                        }
                        else if (page < 1 || isNaN(page)) {
                            page = 1;
                        }

                        self.page(Math.round(page) - 1);

                        // self.pageInfo.start = (Math.round(page) - 1) * self.pageInfo.limit;
                        // self.reload();
                    }
                });
                this.buttons.push(prev);
                this.buttons.push(next);

                if (this.limit >= this.total) {
                    this.hide();
                }
                else {
                    this.show();
                }
            },
            disable       : function () {
                this.status.disable = true;
            },
            enable        : function () {
                this.status.disable = false;
            }
        };

        W.createComponent({
            xtype  : "Pagebar",
            opts   : opts,
            methods: methods,
            extend : W.Component,
            api    : ["reload", "page", "getStart", "getLimit", "getTotal", "disable", "enable"]
        });

    })(jQuery, DK);
    (function ($, W, undefined) {
        var opts = {
            items        : [],
            src          : undefined,
            content      : undefined,
            contentHeight: "auto",
            height       : "inherit",
            layout       : {
                type: undefined
            },
            cmpCls       : "DKCtnr",
            lazyLoad     : false
        };

        var methods = {
            initComponent: function () {
                var self = this;

                if (typeof self.layout === "string") {
                    var l = self.layout;
                    self.layout = {
                        type: l
                    };
                }
                if (!self.lazyLoad) {
                    self.load();
                }
                if (typeof self.height === "number") {
                    self.el.height(self.height);
                }
            },
            doLoader     : function () {
                var self = this;
                self.el.addClass(self.cmpCls + "_loading");
                var complete = self.loader.complete;
                self.loader.complete = function () {
                    self.el.removeClass(self.cmpCls + "_loading");
                    if (typeof complete === "function") {
                        complete.apply(self, arguments);
                    }
                };

                var success = self.loader.success;
                self.loader.success = function () {
                    if (typeof success === "function") {
                        success.apply(self.proxy || self, arguments);
                    }
                };

                return $.ajax(self.loader);
            },
            doLayout     : function () {

            },
            setLoader    : function (loader) {
                this.loader = loader;
                this.el.empty();
                return this.doLoader();
            },
            getContent   : function () {
                return this.content;
            },
            setContent   : function (content) {
                content = $(content);
                if (content.length && this.el.children().get(0) !== content.get(0)) {

                    this.content = content;
                    if (this.outward) {
                        this.outward.content = this.content;
                    }
                    this.el.empty().append(this.content.show());
                    this.trigger("contentchanged");
                }
            },
            getHtml      : function () {
                return this.html;
            },
            setHtml      : function (html) {
                var self = this;
                self.el.html(this.html = html || this.html);

                //当内容中有图片时,图片load后会影响内容尺寸
                self.el.find("img").on("load", function () {
                    self.trigger("contentchanged");
                });
                self.trigger("contentchanged");
            },
            getText      : function () {
                return this.text;
            },
            setText      : function (text) {
                this.el.text(this.text = text || this.text).addClass(this.cmpCls + "Text");
                this.trigger("contentchanged");
            },
            empty        : function (fire) {
                if (this.items && this.cfgItems) {
                    var items = this.items.slice(0);
                    //这里不直接用this.items循环
                    //因为this.items在this.parentCmp.removeItem(this, true)
                    //后长度发生变化,$.each找到的项就不正确了
                    $.each(items, function (i, e) {
                        if (e && e.destroy) {
                            e.destroy();
                        }
                    });
                }
                this.el.empty();
                this.status.loaded = false;
                if (fire !== false) {
                    this.trigger("contentchanged");
                }
            },
            reload       : function () {
                this.empty(false);
                this.load();
            },
            load         : function () {
                if (this.status.loaded) {
                    return false;
                }
                if (this.config.items instanceof Array && this.config.items.length) {
                    //DK组件子元素
                    this.renderItems();
                }
                else if ($(this.content).length) {
                    //content
                    this.setContent(this.content);
                }
                else if (this.config.html) {
                    this.setHtml();
                }
                else if (this.config.text) {
                    this.setText();
                }
                else if (this.config.src) {
                    //iframe
                    this.iframe = $('<iframe class="DKIframeContent" border="0" frameborder="0" src="about:blank" allowTransparency="true"></iframe>').appendTo(this.el);
                    this.iframe.attr("src", this.src);
                }
                if (this.config.loader) {
                    this.doLoader();
                }
                this.status.loaded = true;
            },
            renderItems  : function () {
                var self = this;
                this.items = [];

                if (this.outward) {
                    this.outward.items = this.items;
                }
                $.each(this.config.items, function (i, e) {
                    self.addItem(e);
                });
                this.doLayout();
            },
            renderItem   : function (item, renderTo) {
                if (typeof item.layout === "string") {
                    item.layout = {
                        type: item.layout
                    };
                }
                var constructor = W.register[item.xtype || (item.layout ? item.layout.type ? item.layout.type + "ctnr" : "container" : "container")];
                item.renderTo = renderTo || this.el;
                if (constructor) {
                    //item.height = item.height || this.contentHeight;
                    return new constructor(item);
                }
            },
            addItem      : function (e) {
                var self = this;
                var item = W.isCmp(e) ? e : self.renderItem(e);
                if (item) {
                    item.render(self);
                    self.items.push(item);
                    self.trigger("contentchanged");
                }
            },
            addItems     : function (items) {

            },
            removeItem   : function (item) {

            },
            getItems     : function () {
                return this.items;
            },
            getOutWard   : function () {
                return this.outward;
            },
            destroy      : function () {
                if (this.items && this.items.length) {
                    var items = this.items.slice(0);
                    //这里不直接用this.items循环
                    //因为this.items在this.parentCmp.removeItem(this, true)
                    //后长度发生变化,$.each找到的项就不正确了
                    $.each(items, function (i, e) {
                        if (e && e.destroy) {
                            e.destroy();
                        }
                    });
                }
                else if (this.iframe) {
                    this.iframe.contentWindow.location = "about:blank";
                }
                W.Component.prototype.destroy.apply(this, arguments);
            }
        };

        W.createComponent({
            xtype  : "Container",
            opts   : opts,
            methods: methods,
            extend : W.Component,
            api    : ["getOutWard" , "hide", "show", "status", "render", "doLoader", "trigger", "removeListener", "addListener", "load", "destroy", "addItems", "removeItem", "renderItem", "renderItems", "setText", "setContent", "setHtml", "reload", "getContent", "getHtml", "getText", "setLoader", "addItem", "getItems"]
        });

    })(jQuery, DK);
    (function ($, W, undefined) {

        var opts = {
            cmpCls        : "DKWindow",
            style         : {
            },
            lazyLoad      : true,
            layout        : {},
            frameHeight   : 50,
            frameWidth    : 20,
            tbar          : ["close"],
            width         : 500,
            height        : 300,
            autoShow      : false,
            title         : undefined,
            icon          : undefined,
            minWidth      : 150,
            minHeight     : 100,
            modal         : true,
            floor         : "middle",
            defaultBtnType: "strong"
        };

        var methods = {
            locate          : function (position) {
                var css = {
                    "margin-top" : -(this.getHeight() / 2) + "px",
                    "margin-left": -(this.getWidth() / 2) + "px",
                    position     : "fixed"
                };

                if (W.util.ie6) {
                    css.position = "absolute";
                }

                this.el.addClass("absoluteCenter").css(css);
            },
            doContainer     : function () {
                var self = this;
                if (!self.layout || typeof self.layout === "string") {
                    var l = self.layout;
                    self.layout = {
                        type: l
                    };
                }
                self.proxy = self.proxy || {};

                var cfg = {
                    proxy    : self.proxy,
                    items    : self.items,
                    height   : self.contentHeight || "inherit",
                    content  : self.content,
                    src      : self.src,
                    html     : self.html,
                    outward  : self,
                    el       : self.bodyEl,
                    text     : self.text,
                    loader   : self.loader,
                    lazyLoad : self.lazyLoad,
                    listeners: self.untreatedListeners
                };

                var c = self.container = new W.register[self.layout.type ? self.layout.type + "ctnr" : "container"]($.extend(cfg, self.layout));

                if (self.constructor.api instanceof Array) {
                    $.each(c, function (k, v) {
                        if (!(k in self.proxy)) {
                            self.proxy[k] = v;
                        }
                    });
                }


                this.addListener("afterresize", function () {
                    this.container.resize({height: this.contentHeight});
                });
            },
            initComponent   : function (mustLoad) {

                var self = this;
                /*            if (self.lazyLoad && !mustLoad) {

                 self.addListener("beforeshow", function() {
                 if (!self.status.loaded) {
                 W.Window.prototype.initComponent.call(self, true);
                 }
                 });
                 return;
                 }*/

                self.buildDom();

                if (typeof self.height === "number") {
                    self.contentHeight = self.height - self.frameHeight;
                    self.bodyEl.height(self.contentHeight);
                }

                if (W.util.ie6 && self.width === "auto") {
                    self.width = 600;
                }
                self.el.width(self.width);
                self.initHead();
                self.initButtons();
                self.doDraggable();
                self.doResizable();

                var css = {
                    "z-index": W.zIndex.getMax(self.floor)
                };

                if (self.modal !== false) {
                    if (!self.floor) {
                        self.floor = "low";
                        css["z-index"] = W.zIndex.getMax(self.floor, 2);
                    }
                    self.initMask(css["z-index"] - 1);
                }

                self.el.css(css);

                if (W.util.ie6) {
                    self.ie6Mask = $('<iframe border="0" frameborder="0" cellspacing="0" class="ie6mask" src="about:blank"></iframe>');
                    self.el.append(self.ie6Mask);
                    setTimeout(function () {
                        if (self.status) {
                            self.ie6Mask.css({
                                height: self.el.innerHeight(),
                                width : self.el.innerWidth()
                            });
                        }
                    }, 100);
                }

                //这里要加入到afterinitialize事件中
                self.doContainer();
                self.addListener("contentchanged", function () {
                    if (self.height === "auto" && !self.status.hidden) {
                        setTimeout(function () {
                            if (self.status) {
                                self.locate("contentchanged");
                            }
                            if (W.util.ie6) {
                                if (self.status) {
                                    self.ie6Mask.css({
                                        height: self.el.innerHeight(),
                                        width : self.el.innerWidth()
                                    });
                                }
                            }
                        }, 0);
                    }
                });
                self.addListener("afterresize", function () {
                    self.locate("center");
                });
                self.status.loaded = true;
            },
            doInitStatus    : function () {
                this.status.hidden = true;
                if (this.autoShow) {
                    this.show();
                }
            },
            initMask        : function (zIndex) {
                var self = this,
                    css = {
                        "z-index": zIndex,
                        width    : $(window).width(),
                        height   : $(window).height()
                    };

                self.mask = $('<div class="' + self.cmpCls + '_mask"></div>');

                if (W.util.ie6) {

                    css.top = $(document).scrollTop();
                    css.left = $(document).scrollLeft();

                    this.mask.append('<iframe border="0" frameborder="0" cellspacing="0" class="" src="about:blank"></iframe>');
                    $(window).scroll(function () {
                        $("." + self.cmpCls + "_mask").css({
                            top : $(document).scrollTop(),
                            left: $(document).scrollLeft()
                        });
                    });
                }

                self.mask.css(css);

                if (!W.maskResizeEvent) {
                    W.maskResizeEvent = true;
                    var timer;
                    $(window).resize(function () {
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            $("." + self.cmpCls + "_mask").css({
                                width : $(window).width(),
                                height: $(window).height()
                            });
                        }, 100);

                    });
                }

                if ($.isNumeric(this.modal)) {
                    this.mask.css({
                        opacity: this.modal,
                        filter : "alpha(opacity=" + this.modal * 100 + ")"
                    });
                }

                if (this.status.rendered) {
                    this.mask.appendTo("body");
                }
            },
            doDraggable     : function () {
                /*if (this.draggable === true) {
                 this.el.draggable({
                 handle: ".DKWindow_tl"
                 });
                 }
                 else if (W.util.isObject(this.draggable)) {
                 this.el.draggable($.extend(this.draggable, {
                 handler: ".DKWindow_tl"
                 }));
                 }*/
            },
            doResizable     : function () {
                /*if (this.height === "auto") {
                 return;
                 }
                 var self = this;
                 var opts = {
                 alsoResize: this.bodyEl,
                 minWidth: this.minWidth,
                 minHeight: this.minHeight,
                 autoHide: true,
                 stop: function(e, ui) {
                 self.contentHeight = ui.size.height;
                 self.trigger("afterresize");
                 }
                 };

                 if (this.resizable === true) {
                 this.el.resizable(opts);
                 }
                 else if (W.util.isObject(this.resizable)) {
                 this.el.resizable($.extend(this.resizable, opts));
                 }*/

            },
            initHead        : function () {
                if (this.title || (this.tbar && this.tbar.length) || this.icon) {
                    if (this.icon) {
                        var icon = $('<span class="' + this.cmpCls + '_head_icon"></span>');
                        icon.addClass(this.icon);
                        this.headEl.append(icon);
                    }
                    this.titleEl = $('<span class="' + this.cmpCls + '_head_title"></span>');
                    this.titleEl.append($('<span></span>').html(this.title));
                    var tbar = $('<span class="' + this.cmpCls + '_head_tools"></span>');
                    W.Tools.renderTools.call(this, this.tbar, tbar);
                    this.headEl.show().append(this.titleEl).append(tbar);
                    this.status.headerinited = true;
                }
                else {
                    this.headEl.hide();
                }
            },
            initButtons     : function () {
                var self = this;
                self.bbar = self.buttons || self.bbar;
                self.buttons = [];
                if (self.bbar instanceof Array && self.bbar.length) {
                    self.footEl = $('<div class="' + self.cmpCls + '_foot"></div>');
                    self.footEl.appendTo(self.el.find("." + self.cmpCls + "_bc"));
                    $.each(self.bbar, function (i, e) {
                        var button = new W.Button({
                            renderTo: self.footEl,
                            btnCls  : e.cls,
                            id      : e.id,
                            cls     : self.cmpCls + "_btn",
                            type    : e.type || self.defaultBtnType,
                            scope   : self.proxy || self,
                            size    : e.size,
                            text    : e.text,
                            handler : e.handler,
                            disabled: e.disabled
                        });
                        self.buttons.push(button);

                    });
                }
            },
            buildDom        : function () {
                var tl = $("<div></div>").addClass(this.cmpCls + "_tl");
                var tr = $("<div></div>").addClass(this.cmpCls + "_tr");
                var tc = $("<div></div>").addClass(this.cmpCls + "_tc");
                tl.append(tr.append(tc));

                var ml = $("<div></div>").addClass(this.cmpCls + "_ml");
                var mr = $("<div></div>").addClass(this.cmpCls + "_mr");
                var mc = $("<div></div>").addClass(this.cmpCls + "_mc");
                ml.append(mr.append(mc));


                var bl = $("<div></div>").addClass(this.cmpCls + "_bl");
                var br = $("<div></div>").addClass(this.cmpCls + "_br");
                var bc = $("<div></div>").addClass(this.cmpCls + "_bc");
                bl.append(br.append(bc));

                this.headEl = $('<div class="' + this.cmpCls + '_head"></div>');
                this.headEl.appendTo(tc);
                this.bodyEl = $('<div class="' + this.cmpCls + '_body"></div>').appendTo(mc);

                this.el.append(tl).append(ml).append(bl);
            },
            getHeight       : function () {
                return this.el.height() || this.height * 1 || 0 + this.frameHeight;
            },
            getWidth        : function () {
                return this.el.width() || this.width * 1 || 0 + this.frameWidth;
            },
            setContentHeight: function (height) {
                this.contentHeight = height;
                this.bodyEl.height(height);
            },
            show            : function () {
                var self = this;

                if (!self.status.rendered) {
                    self.render("body");
                    if (self.mask) {
                        self.mask.appendTo("body");
                    }
                }

                if (!self.status.hidden) {
                    return false;
                }
                if (self.modal !== false) {
                    if (W.util.ie6) {
                        self.mask.height($(window).height());
                    }
                    self.mask.show();
                }

                //增加显示效果的时候先进行定位
                self.el.css({
                    display   : "block",
                    visibility: "hidden"
                });
                self.locate("center");
                self.el.css({
                    display   : "none",
                    visibility: "visible"
                });

                var der = W.Component.prototype.show.apply(this, arguments);
                if (W._isDeferred(der)) {
                    //处理lazyload
                    der.done(function () {
                        if (self.container) {
                            self.container.load();
                        }
                    });
                }

                return der;
            },
            close           : function () {
                if (this.closeAction === "destroy") {
                    this.destroy();
                }
                else {
                    this.hide();
                }
            },
            hide            : function () {
                var der = W.Component.prototype.hide.apply(this, arguments);
                if (this.modal !== false) {
                    this.mask.hide();
                }
                return der;
            },
            destroy         : function () {
                if (this.modal !== false) {
                    this.mask.remove();
                }
                $.each(this.buttons || [], function (i, e) {
                    if (e && e.destroy) {
                        e.destroy();
                    }
                });
                W.Component.prototype.destroy.apply(this, arguments);
            },
            getTitle        : function () {
                return this.title;
            },
            setTitle        : function (title) {
                if (typeof title !== 'undefined') {
                    this.title = title || "";
                }

                if (!this.status.headerinited) {
                    this.initHead();
                } else {
                    this.titleEl.html(this.title);
                }
            }
        };

        W.createComponent({
            xtype  : "Window",
            opts   : opts,
            methods: methods,
            extend : W.Component,
            api    : ["content", "status", "setTitle", "getTitle", "destroy", "show", "hide", "trigger", "addListener", "removeListener", "close", "setContentHeight", "setHeight", "setWidth", "getWidth", "getHeight"]
        });

        W.baseMessageBox = function (msg, type, windowCfg) {
            var msgCls = {
                success : "DKMessage_success",
                error   : "DKMessage_error",
                info    : "DKMessage_info",
                loading : "DKMessage_loading",
                question: "DKMessage_question"
            } [type || "info"];

            var ctnr = $('<div class="DKMessage_ctnr"></div>');
            var content = $('<span class="DKMessage_content ' + msgCls + '"></span>').html(msg);

            // text方法给span加入了displayinline的属性
            content.css({
                "display": "inline-block"
            });

            return new W.Window($.extend({
                content    : ctnr.append(content),
                autoShow   : true,
                width      : 400,
                height     : "auto",
                floor      : "high",
                closeAction: "destroy",
                modal      : 0
            }, windowCfg));
        };

        W.confirm = function (msg, type, callback) {
            if (typeof type === "function") {
                callback = type;
                type = "question";
            }

            var win = W.getCmp("DKConfirmWin");
            if (win) {
                win.destroy();
            }

            W.baseMessageBox(msg, type, {
                title: "提示",
                id   : "DKConfirmWin",
                tbar : [
                    {
                        id     : "close",
                        handler: function () {
                            if (typeof callback === "function") {
                                callback.call(this, false);
                            }
                            this.close();
                        }
                    }
                ],
                bbar : [
                    {
                        text   : "确定",
                        handler: function () {
                            if (typeof callback === "function") {
                                callback.call(this, true);
                            }
                            this.close();
                        }
                    },
                    {
                        text   : "取消",
                        cls    : "btn_small_normal",
                        handler: function () {
                            if (typeof callback === "function") {
                                callback.call(this, false);
                            }
                            this.close();
                        }
                    }
                ]
            });
        };

        W.alert = function (msg, type, callback) {
            if (typeof type === "function") {
                callback = type;
                type = "info";
            }

            var win = W.getCmp("DKAlertWin");
            if (win) {
                win.destroy();
            }

            W.baseMessageBox(msg, type, {
                title: "提示",
                id   : "DKAlertWin",
                tbar : [
                    {
                        id     : "close",
                        handler: function () {
                            if (typeof callback === "function") {
                                callback.call(this, false);
                            }
                            this.close();
                        }
                    }
                ],
                bbar : [
                    {
                        text   : "确定",
                        handler: function () {
                            if (typeof callback === "function") {
                                callback.call(this, true);
                            }
                            this.close();
                        }
                    }
                ]
            });
        };

        W.message = function (msg, type, duration) {
            if (typeof type === "number") {
                duration = type;
                type = "info";
            }

            var callback = W.util.asArray(arguments).pop();

            var win = W.getCmp("DKMessageWin");
            if (win) {
                win.destroy();
            }
            win = W.baseMessageBox(msg, type, {
                id  : "DKMessageWin",
                tbar: []
            });

            if (typeof duration !== "number") {
                duration = 2;
            }
            if (duration !== 0) {
                setTimeout(function () {
                    if (win.status) {
                        win.close();
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                }, 1000 * duration);
            }

            return {
                close: function () {
                    if (win.close) {
                        win.close();
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                }
            };
        };

    })(jQuery, DK);
    (function ($, W, undefined) {
        var opts = {
            template      : "default",
            cmpCls        : "DKTips",
            style         : {
            },
            tbar          : [],
            width         : 300,
            height        : "auto",
            offset        : {
                x: 5,
                y: 5
            },
            anchorOffset  : {
                x: 0,
                y: 0
            },
            lazyLoad      : true,
            title         : undefined,
            icon          : undefined,
            target        : undefined,
            autoShow      : false,
            trackMouse    : false,
            floor         : "middle",
            modal         : false,
            group         : undefined,
            // [click, mouseover]
            type          : "click",
            // [top, bottom, left, right]
            anchor        : "bottom",
            // 自动隐藏事件, 单位秒, false不隐藏
            autoHide      : 1,
            defaultBtnType: "important"
        };

        var methods = {
            initComponent   : function () {
                var self = this;
                self.offset.x = self.offset.x || 0;
                self.offset.y = self.offset.y || 0;
                self.target = $(self.target);

                if (!self.autoShow) {
                    self.respond();
                    if (typeof self.autoHide !== "number" && !self.trackMouse) {
                        self.tbar.push("close");
                    }
                }
                else {
                    self.currentTarget = self.target;
                }
                W.Window.prototype.initComponent.apply(self, arguments);
            },
            respond         : function () {
                var self = this;
                if (this.autoHide === true) {
                    this.autoHide = 0;
                }

                //对绑定事件类型做容错处理
                this.eventType = "bind";
                try {
                    if (this.target.length === $(this.target.selector).length) {
                        this.eventType = "live";
                    }
                } catch (e) {

                } finally {

                }

                this.target[this.eventType](this.type, function (evt) {
                    self.currentTarget = $(this);
                    self.show();
                    self.trigger("ontargetchanged", [self, self.currentTarget]);
                    clearTimeout(self.hideTimer);
                });

                this.el.add(this.target).bind("mouseover",function () {
                    clearTimeout(self.hideTimer);
                }).bind("mouseleave", function () {
                        if (typeof self.autoHide === "number") {
                            clearTimeout(self.hideTimer);
                            self.hideTimer = setTimeout(function () {
                                if (self.status) {
                                    self.hide();
                                }
                            }, self.autoHide * 1000);
                        }
                    });

                if (this.trackMouse) {
                    this.autoHide = 0;
                    this.target.mousemove(function (e) {
                        if (!self.status.hidden) {
                            self.el.css({
                                left: e.pageX + self.offset.x + "px",
                                top : e.pageY + self.offset.y + "px"
                            });
                        }
                    });
                }
            },
            locate          : function (target) {
                if (!target || !target.length) {
                    return;
                }
                else if (target === "contentchanged") {
                    //当anchor在下方,内容高度有变化时重新定位
                    this.locate(this.currentTarget);
                    return;
                }
                var h = this.getHeight(),
                    w = this.getWidth(),
                    anchor = this.anchor,
                    offset = target.offset(),
                    tw = $(target).width(),
                    th = $(target).height(),
                    ww,
                    wh,
                    space,
                    position = {},
                    scrollY = window.scrollY || document.body.scrollTop,
                    scrollX = window.scrollX || document.body.scrollLeft,
                    de = document.documentElement;

                if (de) {
                    ww = window.innerWidth || de.clientWidth;
                    wh = window.innerHeight || de.clientHeight;
                    scrollY = window.scrollY || de.scrollTop;
                    scrollX = window.scrollX || de.scrollLeft;
                }
                else {
                    ww = document.body.offsetWidth;
                    wh = document.body.offsetHeight;
                    scrollY = document.body.scrollTop;
                    scrollX = document.body.scrollLeft;
                }

                ww -= 25;
                wh -= 25;

                space = {
                    top   : offset.top - scrollY,
                    left  : offset.left - scrollX,
                    right : ww - offset.left - tw + scrollX,
                    bottom: wh - offset.top - th + scrollY
                };

                if (anchor === "auto") {
                    anchor = "bottom";
                }

                if (/^(top|bottom)$/.test(anchor) && space.bottom <= h + this.offset.y) {
                    if (space.top <= h + this.offset.y) {
                        // 上下位置都不够时, 放在下面
                        anchor = "left";
                    }
                    else {
                        anchor = "top";
                    }
                }


                if (space.left <= w + this.offset.x && anchor === "left") {
                    anchor = "right";
                }
                if (space.right <= w + this.offset.x && anchor === "right") {
                    anchor = "left";
                }

                switch (anchor) {
                    case "left":
                    {
                        position.top = offset.top + (th - h) / 2;
                        position.left = offset.left - w - this.offset.x;
                    }
                        break;
                    case "right":
                    {
                        position.top = offset.top + (th - h) / 2;
                        position.left = offset.left + tw + this.offset.x;
                    }
                        break;
                    case "top":
                    {
                        position.left = offset.left - w / 2 + tw / 2 + this.offset.x;
                        position.top = offset.top - h - this.offset.y;
                    }
                        break;
                    default:
                    {
                        position.left = offset.left - w / 2 + tw / 2 + this.offset.x;
                        position.top = offset.top + th + this.offset.y;
                    }
                }

                this.currentAnchor = anchor;

                this.anchorLeft = w / 2 - 7 - this.offset.x + this.anchorOffset.x;
                this.anchorTop = h / 2 - 7 - this.offset.y + this.anchorOffset.y;

                var tmp;
                if (position.left < scrollX) {
                    tmp = position.left;
                    position.left = scrollX + 5;
                    this.anchorLeft += tmp - position.left;
                }
                else if (position.left + w > scrollX + ww) {
                    tmp = position.left;
                    position.left = scrollX + ww - 5 - w;
                    this.anchorLeft += tmp - position.left;
                }

                if (position.top < 2) {
                    position.top = 2;
                }
                this.locateAnchor(anchor, w, h);
                this.el.css(position);
            },
            getTarget       : function () {
                return this.target;
            },
            getCurrentTarget: function () {
                return this.currentTarget;
            },
            /**
             * 处理指针样式位置
             **/
            locateAnchor    : function (anchor, w, h) {
                var self = this;
                var info = {
                    top   : {
                        selector: "." + this.cmpCls + "_bc",
                        css     : {
                            top   : W.util.ie6 ? h : "auto",
                            bottom: W.util.ie6 ? "auto" : -8,
                            left  : self.anchorLeft
                        },
                        cls     : self.cmpCls + "_anchor"
                    },
                    bottom: {
                        selector: "." + this.cmpCls + "_tc",
                        css     : {
                            top   : -8,
                            bottom: "auto",
                            left  : self.anchorLeft
                        },
                        cls     : self.cmpCls + "_anchor"
                    },
                    left  : {
                        selector: "." + this.cmpCls + "_mr",
                        css     : {
                            right: -8,
                            left : "auto",
                            top  : self.anchorTop
                        },
                        cls     : self.cmpCls + "_anchor anchor_left"
                    },
                    right : {
                        selector: "." + this.cmpCls + "_ml",
                        css     : {
                            left : -8,
                            right: "auto",
                            top  : self.anchorTop
                        },
                        cls     : self.cmpCls + "_anchor anchor_right"
                    }
                } [anchor];
                this.anchorEl = this.anchorEl || $('<span></span>');
                this.anchorEl.removeClass().addClass(info.cls);
                this.el.find(info.selector).addClass("tipsAnchorWrap").append(this.anchorEl.css(info.css));
            },
            show            : function (target) {
                var self = this;
                if (!self.status.rendered) {
                    self.render("body");
                }
                if (target) {
                    target = $(target);
                    if (target.length) {
                        self.currentTarget = target;
                    }
                }

                if (self.container) {
                    self.container.load();
                }

                if (!self.trackMouse) {
                    self.locate(self.currentTarget);
                }
                if (self.group) {
                    $.each(W.getCmps({group: this.group}), function (i, e) {
                        e.hide();
                    });
                }
                return W.Component.prototype.show.apply(self, arguments);
            },
            destroy         : function () {
                //解除绑定的dom事件
                if (this.eventType === "bind") {
                    this.target.unbind(this.type);
                }
                else {
                    this.target.die(this.type);
                }
                clearTimeout(this.hideTimer);
                W.Window.prototype.destroy.apply(this, arguments);
            }
        };

        W.createComponent({
            xtype  : "Tips",
            opts   : opts,
            methods: methods,
            extend : W.Window,
            api    : ["getTarget", "getCurrentTarget", 'locate']
        });
    })(jQuery, DK);
    return W;
});