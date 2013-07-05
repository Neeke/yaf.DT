define(function(require) {
    require('placeholder');
    require('rest');
    var util = require('util');

    $('#username,#email,#pwd').placeholder();

    $('#submit').click(function() {
        var email = $('#email').val(),
            username = $('#username').val(),
            pwd = $('#pwd').val();

        if (!util.isEmail(email)) {
            alert('邮箱地址格式不正确');
        }

        var rest = $.restPost('/api/user/reg', {
            email: email,
            user_name: username,
            pwd: pwd
        });

        rest.done(function(msg, data) {
            alert(msg);
            location.href = '/login';
        });

        rest.fail(function(msg) {
            alert(msg || '注册失败!');
        });
    });
});