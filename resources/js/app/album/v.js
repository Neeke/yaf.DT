define(function(require) {
    var Talk = require('app/common/talk');
    var util = require('util');
    require('rest');
    require('lazyload');
    var keymap = require('app/common/keymap');

    function gotoNext() {
        var _this = $('.arrow-next:visible');
        fadeobj = _this.closest('.slideritem');
        if (fadeobj.next('.slideritem').index() > 0) {
            fadeobj.fadeOut();
            var showing = fadeobj.next('.slideritem').fadeIn();

            scaleImages(showing.find('.showing'));

            $('.quark-button').show();
        }
        else {
            $('.slideritem').eq(1).fadeIn().siblings('.slideritem').fadeOut();
            $('.quark-button').hide();
        }
    }

    function gotoPrev() {
        var _this = $('.arrow-prev:visible');
        fadeobj = _this.closest('.slideritem');
        if (fadeobj.prev('.slideritem').index() > 0) {
            fadeobj.fadeOut();
            fadeobj.prev('.slideritem').fadeIn();
            $('.quark-button').show();
        }
        else {
            $('.slideritem').last().fadeIn().siblings('.slideritem').fadeOut();
            $('.quark-button').hide();
        }
    }

    $(function () {

        $(document).on('click', '.arrow-next', function () {
            gotoNext();
        });
        $(document).on('click', '.arrow-prev', function () {
            gotoPrev();
        });

        $(document).on('keyup', function(e) {
            if (e.keyCode === keymap.LEFT) {
                gotoPrev();
            } else if (e.keyCode === keymap.RIGHT) {
                gotoNext();
            }
        });

        $('.collection-button').bind('click', function () {
            $(this).addClass('on');
        });
        $('.itemshow').each(function () {
            var _this = $(this), _index = _this.index(), size = $('.itemshow').size();
            //(_index+1)+'/'+size
            _this.append('<div class="curnum"><a href="javascript:;" class="arrow-prev">&lt;&lt;</a>' + _index + '/' + size + '<a href="javascript:;" class="arrow-next">&gt;&gt;</a></div>');
        });
    });

    function scaleImages($img) {
        var $window = $(window);
        var height = $window.height(),
            width = $window.width();

        var w = $img.width(),
            h = $img.height();

        if (height / width > h / w || h > w) {
            $img.css({
                width: 'auto',
                height: height
            });
        } else {
            $img.css({
                width: width,
                height: 'auto'
            });
        }
    }

    $(function() {
        $(window).on('resize', function() {
            $('.showing').each(function() {
                scaleImages($(this));
            });
        });
    });

    function initOpts(id) {
        $(function() {
            $(document).on('click', '.js-collectbtn', function() {
                var $count = $(this).find('.js-count');

                var rest = $.restPost('/api/album/listen', {
                    album_id: id
                });

                rest.done(function(msg) {
                    $('.js-collectBtn').addClass('checked');

                    if ($count.length) {
                        $count.text(($count.text() * 1 || 0) + 1);
                    }
                });

                rest.fail(function(msg) {
                    util.alert(msg || '收藏失败');
                });
            });

            $(document).on('click', '.js-replaybtn', function() {
                var talk = new Talk({
                    fetchUrl: '/api/album/replylist',
                    title: '评论',
                    params: {
                        album_id: id
                    },
                    sendUrl: '/api/album/reply'
                });
                talk.showTalk();
            });

            $("img.showing").lazyload({
                event : "sporty"
            });

        });
    }

    return {
        initOpts: initOpts
    }
});