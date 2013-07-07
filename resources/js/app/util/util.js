define(function(require) {

    return {
        //是否为手持设备
        isTouchDevice: 'ontouchstart' in window,
        /**
         * 对特殊字符进行编码
         */
        encodeHtmlChar: function(input) {
            return String(input).replace(/["<>& ]/g, function(all) {
                return "&" + {
                    '"': 'quot',
                    '<': 'lt',
                    '>': 'gt',
                    '&': 'amp',
                    ' ': 'nbsp'
                } [all] + ";";
            });
        },
        asArray: function(arr, start, end) {
            return Array.prototype.slice.call(arr, start || 0, end || arr.length);
        },
        isObject: function(o) {
            return !!o && Object.prototype.toString.call(o) === "[object Object]";
        },
        isEmail: function(email) {
            return (/^[a-zA-Z_0-9\-\.]{1,100}@[a-zA-Z_0-9\-]{1,50}(\.[a-zA-Z_0-9\-]{1,50}){0,2}\.[a-zA-Z]{2,4}$/).test(email);
        },
        isDateStr: function(date) {
            return (/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/).test(date);
        },
        isUrl: function(url) {
            return (/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i).test(url);
        },
        isPhoneNo: function(no) {
            return (/^(\+86)?1[3458]\d{9}$/).test(no);
        },
        getCharCount: function(str) {
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
                for(var i = 0; i < pairs.length; i++) {
                    var sign = pairs[i].indexOf("=");
                    //如果没有找到=号，那么就跳过，跳到下一个字符串（下一个循环）。
                    if(sign === -1) {
                        continue;
                    }

                    var aKey = pairs[i].substring(0, sign);
                    var aValue = pairs[i].substring(sign + 1);

                    args[aKey] = aValue;
                }

                return args;
            }
        },
        formatDate: function() {

            var args = this.asArray(arguments), format, date, i;

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

            return format.replace(/[YmdHis]/g, function(key, pos) {
                return d[key] || "";
            });
        },
        /**
         * 解析事件串
         * @param  目前仅支持 格式 - "2012-12-12 12:12:12"
         * @return Date
         */
        parseDate: function(str) {
            function parse(number) {
                return number * 1;
            }

            if(typeof str === 'string') {
                var results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);


                if(results && results.length > 3) {
                    return new Date(parse(results[1]), parse(results[2]) - 1, parse(results[3]));
                }
                results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}) *$/);
                if(results && results.length > 5) {
                    return new Date(parse(results[1]), parse(results[2]) - 1, parse(results[3]), parse(results[4]), parse(results[5]));
                }
                results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
                if(results && results.length > 6) {
                    return new Date(parse(results[1]), parse(results[2]) - 1, parse(results[3]), parse(results[4]), parse(results[5]), parse(results[6]));
                }
                results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);
                if(results && results.length > 7) {
                    return new Date(parse(results[1]), parse(results[2]) - 1, parse(results[3]), parse(results[4]), parse(results[5]), parse(results[6]), parse(results[7]));
                }
            }
            return null;
        },
        formatStr: function(format) {
            var args = this.asArray(arguments, 1);
            return format.replace(/\{(\d+)\}/g, function(m, i) {
                return args[i];
            });
        },
        /**
         * 使用豆点分割的方式格式化数字
         * @param  number
         * @param  accuracy 保留小数位数
         * @return
         */
        formatNumber: function(number, accuracy) {
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

            number = String(number).replace(reg, function(r) {
                return r + ",";
            });

            return number;
        }
    };
});