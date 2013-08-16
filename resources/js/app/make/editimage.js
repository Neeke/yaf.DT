define(function(require) {
    var DK = require('dk');
    var util = require('util');

    var wins = {};

    var idSrcMap = {};

    var msg = {
        'remarkLength': '描述不能超过120字',
        'empty': '请至少上传一张图片',
        'max': '图片不能超过100张'
    }

    function createWin(cfg) {
        var $content = $("#editImage").clone();

        initEditForm($content, cfg);

        wins[cfg.items_pic] = new DK.Window({
            title: '编辑图片',
            content: $content,
            width: 450,
            height: 480
        });

        idSrcMap[cfg.items_pic] = cfg.items_id;
    }

    function show(cfg) {
        if (wins[cfg.items_pic]) {
            wins[cfg.items_pic].show();
        } else {
            createWin(cfg);
        }
    }

    function initEditForm($el, cfg) {
        $el.on('click', '.js-choose', function() {
            $(this).closest('li').find('.choose').removeClass('choose');
            $(this).addClass('choose');
        });

        $el.on('click', '.js-save', function() {
            wins[cfg.items_pic].close();
        });

        $el.find('.js-editimage-thumb').attr('src', cfg.items_pic);

        util.initForm($el, cfg);

        $el.find('.js-pic-pos .js-choose').filter('[data-align=' + (cfg.pic_area || 0) + ']').addClass('choose');
        $el.find('.js-txt-pos .js-choose').filter('[data-align=' + (cfg.txt_area || 0) + ']').addClass('choose');
    }

    function serialize() {
        var $items = $('.js-album-item');
        var data = [];

        $items.each(function(index, $item) {
            $item = $($item);
            var src = $item.find('.js-uploadimg').attr('data-src');

            var itemData = {
                items_pic: src,
                remark: $item.find('.js-remark').val(),
                items_id: idSrcMap[src]
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

    function initItems(items) {
        $.each(items || [], function(index, item) {
            createWin(item);
        });
    }

    function valid() {
        var length = serialize().length;
        if (!serialize().length) {
            util.alert(msg.empty);
            return false;
        } else if (length > 100) {
            util.alert(msg.max);
            return false;
        } else {
            var flag = true;
            $('#albumContainer').find('.js-remark').each(function(i, e) {
                if (e.value.length > 120) {
                    flag = false;
                    return false;
                }
            });

            if (!flag) {
                util.alert(msg.remarkLength);
                return false;
            }
        }

        return true;
    }

    $(function() {
        $('#albumContainer').on('blur', '.js-remark', function() {
            if (this.value.length > 120) {
                util.alert(msg.remarkLength);
            }
        });
    });

    return {
        show: show,
        serialize: serialize,
        initItems: initItems,
        valid: valid
    }
});