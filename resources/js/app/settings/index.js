define(function(require) {

    require('validate');
    require('rest');
    var updateavatar = require('./updateavatar');


    function initUpdatePwd() {

        var $form = $('#updatePasswordForm');

        $form.validate({
            rules: {
                'pwd[old]': {
                    required: true,
                    minlength: 6
                },
                'pwd[new]': {
                    minlength: 6
                },
                'pwd[repeat]': {
                    equalTo: '#newPwd'
                }
            },
            messages: {
                oldPwd: '密码不能为空'
            }
        });

        $('#updatePasswordBtn').click(function() {
            $('#updatePassword').show();
        });

        $('#savePwdBtn').click(function() {
            var rest = $.restPost('/api/user/set',  $form.serialize());

            rest.done(function(msg) {
                alert(msg);
            });

            rest.fail(function(msg) {
                alert(msg);
            });
            return false;
        });

        $('#cancelBtn').click(function() {
            $form.get(0).reset();
            $('#updatePassword').hide();
            return false;
        });
    }

    function initForm() {
        var rest = $.restGet('/api/user/setinit');

        rest.done(function(msg, data) {
            $('input[name=gender][value=' + data.gender + ']').prop('checked', true);
            $('.js-avatar').attr('src', data.avatar);
        });
    }

    $(function() {

        initForm();

        $(document).on('click', '.js-edit', function() {
            $(this).closest('.js-userinfo-item').addClass('editing');
        });

        $(document).on('click', '.js-submit', function() {
            var $item = $(this).closest('.js-userinfo-item');

            $item.removeClass('editing');

            var rest = $.restPost('/api/user/set', $item.find('form').serialize());

            rest.done(function(msg) {
                alert(msg);
                location.reload();
            });

            rest.fail(function(msg) {
                alert(msg);
            });
        });

        updateavatar.initUpdateAvatar('.js-updateAvatarBtn');
        updateavatar.initCutAvatar();

        initUpdatePwd();
    });
});