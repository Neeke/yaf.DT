define(function(require) {

    require('rest');
    require('validate');
    var DK = require('dk');

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
            return false;
        });

        $('#cancelBtn').click(function() {
            $form.get(0).reset();
            $('#updatePassword').hide();
            return false;
        });
    }

    $(function() {
        $(document).on('click', '.js-edit', function() {
            $(this).closest('.js-userinfo-item').addClass('editing');
        });

        $(document).on('click', '.js-submit', function() {
            var $item = $(this).closest('.js-userinfo-item');

            $item.removeClass('editing');

            var rest = $.restPost('/api/user/set', $item.find('form').serialize());

            rest.done(function(msg) {
                alert(msg);
            });

            rest.fail(function(msg) {
                alert(msg);
            });
        });

        $('#updateAvatarBtn').click(function() {
            var win = new DK.Window({
                title: ''
            });
        });

        initUpdatePwd();
    });
});