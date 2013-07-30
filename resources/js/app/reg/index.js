define(function (require) {
    require('placeholder');
    require('rest');
    var util = require('util');

    $(function () {
        var $username = $('#username'),
            $email = $('#email'),
            $pwd = $('#pwd'),
            $invitationCode = $('#invitationCode');

        $username.add($email).add($pwd).add($invitationCode).placeholder();

        $('#submit').click(function () {
            var email = $email.val(),
                username = $username.val(),
                pwd = $pwd.val(),
                invitationCode = $invitationCode.val();

            var usernameLength = util.getCharCount($.trim(username));

            if (usernameLength < 6 || usernameLength > 24) {
                alert('用户名为3-12个汉字/6-24个英文');
                $username.focus();
                return;
            }

            if (!util.isEmail(email)) {
                alert('邮箱地址格式不正确');
                $email.focus();
                return;
            }

            var pwdLength = util.getCharCount($.trim(pwd));

            if (pwdLength < 6 || pwdLength > 20) {
                alert('密码为6-20个字符');
                $pwd.focus();
                return;
            }

            var rest = $.restPost('/api/user/reg', {
                email: email,
                user_name: username,
                pwd: pwd,
                invitationCode: invitationCode,
            });

            rest.done(function (msg, data) {
                alert(msg);
                location.href = data.redirect;
            });

            rest.fail(function (msg) {
                alert(msg || '注册失败!');
            });
        });
    });
});