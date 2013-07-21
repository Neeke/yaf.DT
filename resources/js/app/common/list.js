define(function(require) {
    var talk = require('app/common/talk');
    require('rest');

    function initEvts() {
        $('#albumList').on('click', '.js-collect', function(e) {
            var $el = $(this);
            collect($el.closest('.albumitem').attr('data-albumid'), $el);
        });

        $('#albumList').on('click', '.js-replay', function() {
            talk.showTalk('/api/album/replylist', '评论', {
                album_id: $(this).closest('.albumitem').attr('data-albumid')
            });
        });
    }

    function collect(id, $el) {
        var rest = $.restPost('/api/album/listen', {
            album_id: id
        });

        rest.done(function(msg) {
            alert(msg);
            var amount = $el.text();

            if ($.isNumeric(amount) && amount * 1 < 9999) {
                $el.text(amount * 1 + 1);
            }

            $el.addClass('checked');
        });

        rest.fail(function(msg) {
            alert(msg || '收藏失败');
        });
    }

    $(function() {
        initEvts();
    });
});