define(function(require) {
    require('doT');
    var DK = require('dk');
    var tplWinContent = require('./talk.doT.tpl');
    var tplMsg = require('./msg.doT.tpl');

    function getMsgHtml(msg) {
        return doT.template(tplMsg) (preprocess(msg));
    }

    function preprocess(data) {
        if (data.user_id_from != $CONFIG.user_id) {
            data.others = true;
        }
        return data;
    }

    function Talk(cfg) {
        var win = new DK.Window({
            title: cfg.title || '对话',
            html: tplWinContent,
            width: 600,
            height: 500
        });

        win.el.on('click', '.js-send', function() {
            var rest = $.restPost(cfg.sendUrl, $.extend(cfg.params, {
                content: win.el.find('textarea').val()
            }));

            rest.done(function(msg, data) {
                win.el.find('.js-content').prepend(getMsgHtml(data));
            });
        });

        function showTalk() {
            win.show();

            var rest = $.restGet(cfg.fetchUrl, cfg.params);

            rest.done(function(msg, data) {
                $.each(data.rows || [], function(i, msg) {
                    win.el.find('.js-content').append(getMsgHtml(msg.cells));
                });

            });
        }

        return {
            showTalk: showTalk
        };
    }

    return Talk;
});