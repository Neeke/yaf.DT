define(function(require) {
    var Talk = require('app/common/talk');
    require('rest');

    function initEvts() {
        $('#albumList').on('click', '.js-collect', function(e) {
            var $el = $(this);
            collect($el.closest('.albumitem').attr('data-albumid'), $el);
        });

        $('#albumList').on('click', '.js-replay', function() {
            var talk = new Talk({
                fetchUrl: '/api/album/replylist',
                title: '评论',
                params: {
                    album_id: $(this).closest('.albumitem').attr('data-albumid')
                },
                sendUrl: '/api/album/reply'
            });
            talk.showTalk();
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