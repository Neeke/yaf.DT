define(function(require) {
    require('./jquery.validate.js');

    (function ($) {
        $.extend($.validator.messages, {
            required: "必选字段",
            remote: "请修正该字段",
            email: "请输入正确格式的电子邮件",
            url: "请输入合法的网址",
            date: "请输入合法的日期",
            dateISO: "请输入合法的日期 (ISO).",
            number: "请输入合法的数字",
            digits: "只能输入整数",
            creditcard: "请输入合法的信用卡号",
            equalTo: "请再次输入相同的值",
            accept: "请输入拥有合法后缀名的字符串",
            maxlength: $.validator.format("请输入一个长度最多是 {0} 的字符串"),
            minlength: $.validator.format("请输入一个长度最少是 {0} 的字符串"),
            rangelength: $.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
            range: $.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
            max: $.validator.format("请输入一个最大为 {0} 的值"),
            min: $.validator.format("请输入一个最小为 {0} 的值")
        });

        $.validator.addMethod("mincharlength", function(value, element, param) {
            if (value) {
                value = value.replace(/[\u4E00-\u9FA5]|[^\x00-\xff]/ig, "cc");
                return value.length >= param * 1;
            }
            return false;
        }, "请至少输入{0}个字符");

        $.validator.addMethod("maxcharlength", function(value, element, param) {
            if (value) {
                value = value.replace(/[\u4E00-\u9FA5]|[^\x00-\xff]/ig, "cc");
                return value.length <= param * 1;
            }
            return true;
        }, "最多只能输入{0}个字符");

        $.validator.addMethod("QQ", function(value, element, param) {
            if (value) {
                return (/^[1-9]{1}[0-9]{4,19}$/).test(value) || W.util.isEmail(value);
            }
        }, "请正确填写QQ");

        //常用的名称规则
        //匹配中文|字母|数字|-|_
        $.validator.addMethod("exspecialchar", function(value, element, param) {
            if (value) {
                return (/^[a-zA-Z0-9\-_\u4e00-\u9fa5]*$/).test(value);
            }
            return true;
        }, "不能包含特殊字符");

        $.validator.addMethod("tel", function(value, element, param) {
            if (value) {
                return (/^\d{2,4}[\-\s]\d{7,8}([\-\s]\d{3,6}?)?$/).test(value);
            }
            return true;
        }, "格式为xxx-xxxxxxxx或xxx-xxxxxxxx-xxxx");
    }(jQuery));

});