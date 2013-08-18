define(function (require) {
    require('placeholder');
    require('rest');
    require('validate');
    var util = require('util');
    var $form = $('#regForm');

    function initValidate() {
        $form.validate({
            rules: {
                'user_name': {
                    required: true,
                    mincharlength: 6,
                    maxcharlength: 24,
                    exspecialchar: true
                },
                email: {
                    email: true,
                    required: true
                },
                pwd: {
                    required: true,
                    maxlength: 20,
                    minlength: 6
                },
                pwdRepeat: {
                    equalTo: '#pwd'
                }
            },
            messages: {
                'user_name': {
                    required: '用户名不能为空',
                    mincharlength: '用户名为3-12个汉字/6-24个英文',
                    maxcharlength: '用户名为3-12个汉字/6-24个英文',
                    exspecialchar: '用户名含有非法字符'
                },
                email: {
                    email: '邮箱地址格式不正确',
                    required: '邮箱不能为空'
                },
                pwd: {
                    required: '密码不能为空',
                    maxlength: '密码为6-20个字符',
                    minlength: '密码为6-20个字符'
                },
                pwdRepeat: '两次填写的密码不一致'
            },
            errorClass: 'validateError'
        });

    }

    $(function () {

        $form.find('input').placeholder();

        initValidate();

        $('#submit').click(function () {
            if ($form.valid()) {
                var rest = $.restPost('/api/user/reg', $('#regForm').serialize());

                rest.done(function (msg, data) {
                    util.alert(msg, function() {
                        location.href = data.redirect;
                    });

                });

                rest.fail(function (msg) {
                    util.alert(msg || '注册失败!');
                });
            }

            return false;
        });
    });
});