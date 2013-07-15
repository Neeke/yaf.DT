define(function(require) {
    var util = require('util');
    require('rest');

    var KEYMAP = {
        'BACKSPACE': 8,
        'ENTER': 13
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
        var tpl = '<a data-tid="{1}" href="javascript:;"><span>{0}</span></a>';
        $tagCtnr.append(util.formatStr(tpl, name, id));
    }

    function removeLastTag() {
        $tagCtnr.find('a:last').remove();
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
            if (e.keyCode === KEYMAP.ENTER) {
                addTag(this.value);
                this.value = '';
            } else if (e.keyCode === KEYMAP.BACKSPACE) {
                if (this.value === '') {
                    removeLastTag();
                }
            }
        });

        $suggestTags.on('click', 'a', function() {
            addTag($(this).attr('data-name'), $(this).attr('data-tid'));
        });

        fetchListenedTags();
    });
});