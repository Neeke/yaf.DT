define(function(require) {
    var updateavatar = require('./updateavatar');
    require('rest');
    require('placeholder');
    var util = require('util');

    var $username;

    function initAvatar() {
        var rest = $.restGet('/api/user/setinit');

        rest.done(function(msg, data) {
            $('input[name=gender][value=' + data.gender + ']').prop('checked', true);

            $('.js-avatar').attr('src', data.avatar);
        });
    }

    function submitForm() {
        var username = $.trim($username.val());
        var usernameLength = util.getCharCount($.trim(username));

        if (usernameLength < 6 || usernameLength > 24) {
            util.alert('用户名为3-12个汉字/6-24个英文');
            $username.focus();
            return;
        }

        var rest = $.restPost('/api/user/confirmation', {
            user_name: $username.val()
        });

        rest.done(function(msg,data) {
            util.alert(msg || '修改成功');
            location.href = data.redirect;
        });

        rest.fail(function(msg) {
            util.alert(msg || '修改失败');
        });
    }

    function initForm() {
        $username = $('#username');

        $username.placeholder();

        $username.on('keypress', function(e) {
            if (e.keyCode === 13) {
                submitForm();
            }
        });

        $('#submit').click(function() {
            submitForm();
        });

    }


    $(function() {
        initAvatar();
        initForm();
        updateavatar.initUpdateAvatar('.js-updateAvatarBtn');
        updateavatar.initCutAvatar();
    });
});