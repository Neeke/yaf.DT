define(function(require) {
    var util = require('util');
    require('rest');
    var tagAutocomplete = require('app/common/tag_autocomplete');

    var KEYMAP = {
        'BACKSPACE': 8,
        'ENTER': 13,
        'SPACE': 32
    };

    var settings = {
        limit: 10
    };

    var $createTag = $('#createTag'),
        $tagCtnr = $('#tagCtnr'),
        $suggestTags = $('#suggestTags');

    var tags = [];

    function addTag(name, id) {
        name = $.trim(name || '');
        if (!name || $.inArray(name, tags) > -1 || tags.length >= settings.limit) {
            return;
        }

        tags.push(name);
        var tpl = '<li class="tags-item"><a data-tid="{1}" href="javascript:;"><span>{0}</span><a class="tag-item-remove js-removetag" href="javascript:;"></a></a></li>';
        $tagCtnr.append(util.formatStr(tpl, name, id || ''));
    }

    function removeLastTag() {
        $tagCtnr.find('li:last').remove();
        tags.pop();
    }

    function fetchListenedTags() {
        var rest = $.restGet('/api/tag/listened');

        rest.done(function(msg, data) {
            $.each(data || [], function(i, e) {
                addListenedTag(e.tid, e.tag);
            });
        });
    }

    function addListenedTag(id, name) {

        var tpl = '<dd><a href="javascript:;" data-tid="{0}" data-name={1}>' +
            '<span>{1}</span></a></dd>';
        $suggestTags.append(util.formatStr(tpl, id, name));
    }

    $(function() {
        $createTag.on('keyup', function(e) {
            if (e.keyCode === KEYMAP.ENTER || e.keyCode === KEYMAP.SPACE) {
                addTag(this.value);
                this.value = '';
            }
        });

        $createTag.on('keydown', function(e) {
            if (e.keyCode === KEYMAP.BACKSPACE) {
                if (this.value === '') {
                    removeLastTag();
                }
            }
        });

        $(document).on('click', '.js-removetag', function() {
            var item = $(this).closest('.tags-item');
            var text = item.text();

            tags = $.grep(tags, function(e, i) {
                if (e === text) {
                    return false;
                } else {
                    return true;
                }
            });
            item.remove();
        });

        $suggestTags.on('click', 'a', function() {
            addTag($(this).attr('data-name'), $(this).attr('data-tid'));
        });

        fetchListenedTags();

        tagAutocomplete.process($createTag);
    });

    function init(tags) {
        $.each(tags || [], function(index, item) {
            addTag(item.tag, item.tid);
        });
    }

    return {
        init: init
    }
});