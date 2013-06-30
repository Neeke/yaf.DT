define(function(require) {
    require('placeholder');
    require('rest');

    $('#username,#email,#pwd').placeholder();

/*    var api_reg = '/api/user/reg';
    method: post
    params: email user_name pwd remark*/

    $('#submit').click(function() {
        var rest = $.restPost('/api/user/reg', {
            email: $('#email').val(),
            user_name: $('#username').val(),
            pwd: $('#pwd').val()
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