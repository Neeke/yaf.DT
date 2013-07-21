define(function(require) {
    require('doT');
    var DK = require('dk');
    var tpl = require('./talk.doT.tpl');

    function showTalk(url, title, params) {
        var win = new DK.Window({
            title: title,
            width: 600,
            height: 500
        });

        win.show();

        var rest = $.restGet(url, params);

        rest.done(function(msg, data) {
            preprocess(data.rows);
            var html = doT.template(tpl) (data);
            win.setHtml(html);
        });
    }

    function preprocess(data) {
        $.each(data || [], function(i, e) {
            if (e.cells.user_id_from == $CONFIG.user_id) {
                e.cells.others = true;
            }
        });
    }

    return {
        showTalk: showTalk
    }
});