define(function(require) {
    var rest = require('rest');
    var DK = require('dk');

    $(function() {
        $(document).on('click', '.js-unfollow', function() {
            var $item =  $(this).closest('.js-follow-item');

            var name = $item.find('.js-name').text(),
                userId = $(this).attr('data-userid');

            DK.confirm('确定取消关注' + name + '吗？', function(flag) {
                if (flag) {
                    var rest = $.restPost('/api/follower/unfollow', {
                        user_id: userId
                    });

                    rest.done(function() {
                        $item.remove();
                    });

                    rest.fail(function(msg) {
                        W.alert(msg || '取消关注失败');
                    });
                }
            });


        });
    });
});