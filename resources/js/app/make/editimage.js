define(function(require) {
    var DK = require('dk');
    var util = require('util');

    var wins = {};

    function show(cfg) {
        if (wins[cfg.src]) {
            wins[cfg.src].show();
        } else {
            var $content = $("#editImage").clone();

            initEditForm($content, cfg.src);

            wins[cfg.src] = new DK.Window({
                title: '编辑图片',
                content: $content,
                width: 450,
                height: 480
            });
        }
    }

    function initEditForm($el, src) {
        $el.on('click', '.js-choose', function() {
            $(this).closest('li').find('.choose').removeClass('choose');
            $(this).addClass('choose');
        });

        $el.find('.js-editimage-thumb').attr('src', src);
    }

    function serialize() {
        var $items = $('.js-album-item');
        var data = [];

        $items.each(function(index, $item) {
            $item = $($item);
            var src = $item.find('.js-uploadimg').attr('data-src');

            var itemData = {
                pic_url: src,
                remark: $item.find('.js-remark').val()
            };

            if (wins[src]) {
                var $content = wins[src].getContent();
                var picAlign = $content.find('.js-pic-pos .choose').attr('data-align');
                var txtAlign = $content.find('.js-txt-pos .choose').attr('data-align');
                $.extend(itemData, {
                    txt_area: txtAlign,
                    pic_area: picAlign,
                    is_cover: $content.find('[name=is_cover]:checked').length ? '1' : '0'
                });
            }

            data.push(itemData);
        });

        return data;
    }

    return {
        show: show,
        serialize: serialize
    }
});