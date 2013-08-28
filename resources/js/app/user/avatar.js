define(function(require) {
    var rest = require('rest');

    var $followBtn, $unfollowBtn;
    $(function() {
        $followBtn = $('#follow');
        $unfollowBtn = $('#unfollow');

        $followBtn.click(function() {
            var rest = $.restPost('/api/follower/follow', {
                user_id: $CONFIG.user_id
            });

            rest.done(function() {
                $unfollowBtn.show();
                $followBtn.hide();
            });

            rest.fail(function(msg) {
                W.alert(msg || '关注失败');
            });
        });

        $unfollowBtn.click(function() {
            var rest = $.restPost('/api/follower/unfollow', {
                user_id: $CONFIG.user_id
            });

            rest.done(function() {
                $unfollowBtn.hide();
                $followBtn.show();
            });

            rest.fail(function(msg) {
                W.alert(msg || '取消关注失败');
            });
        });

    });
});
