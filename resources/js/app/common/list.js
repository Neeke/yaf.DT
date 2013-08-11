define(function(require) {
    var Talk = require('app/common/talk');
    require('rest');

    function initEvts() {
        $('#albumList').on('click', '.js-collect', function(e) {
            var $el = $(this);
            collect($el.closest('.js-albumitem').attr('data-albumid'), $el);
        });

        $('#albumList').on('click', '.js-album-remove', function(e) {
            var $el = $(this);
            album_remove($el.closest('.js-albumitem').attr('data-albumid'), $el);
        });

        $('#albumList').on('click', '.js-album-listened-remove', function(e) {
            var $el = $(this);
            album_listened_remove($el.closest('.js-albumitem').attr('data-albumid'), $el);
        });

        $('#albumList').on('click', '.js-replay', function() {
            var talk = new Talk({
                fetchUrl: '/api/album/replylist',
                title: '评论',
                params: {
                    album_id: $(this).closest('.js-albumitem').attr('data-albumid')
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

    function album_remove(id, $el) {
        var rest = $.restPost('/api/album/remove', {
            album_id: id
        });

        rest.done(function(msg) {
            var amount = $el.text();

            if ($.isNumeric(amount) && amount * 1 < 9999) {
                $el.text(amount * 1 + 1);
            }

            $el.addClass('checked');
        });

        rest.fail(function(msg) {
            alert(msg || '删除失败');
        });
    }

    function album_listened_remove(id, $el) {
        var rest = $.restPost('/api/album/listenedremove', {
            album_id: id
        });

        rest.done(function(msg) {
            var amount = $el.text();

            if ($.isNumeric(amount) && amount * 1 < 9999) {
                $el.text(amount * 1 + 1);
            }

            $el.closest('.js-albumitem').remove();
        });

        rest.fail(function(msg) {
            alert(msg || '取消订阅失败');
        });
    }

    $(function() {
        initEvts();
    });
});