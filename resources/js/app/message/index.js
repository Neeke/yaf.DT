define(function(require) {
    require('rest');
    var DK = require('dk');
    require('doT');
    var Talk = require('app/common/talk');

    var tplMessage = require('./message.doT.tpl');
    var $list;

    function fetchMessages() {
        var rest = $.restGet('/api/sms/feed');

        rest.done(function(msg, data) {
            var pagebar = new DK.Pagebar({
                renderTo: '#pageinfo',
                total: data.total,
                limit: data.limit,

                start: data.start,
                onpagechanged: function() {

                }
            });
            renderMessages(data.rows);
        });
    }

    function renderMessages(messages) {
        var htmlArr = [];
        $.each(messages || [], function(index, message) {
            htmlArr.push(doT.template(tplMessage) (message.cells));
        });

        $list.append(htmlArr.join(''));
    }

    $(function() {
        $list = $('#list');
        fetchMessages();

        $list.on('click', '.js-markread', function() {
            var $item = $(this).closest('.js-messageitem');
            var rest = $.restPost('/api/sms/readfeed', {
                feed_id: $item.attr('data-id')
            });

            $item.fadeOut(function() {
                $item.remove();
            });
        });

        $list.on('click', '.js-detail', function() {
            var id = $(this).closest('.js-messageitem').attr('data-id');

            var talk = new Talk({
                fetchUrl: '/api/sms/detail',
                title: '对话',
                params: {
                    feed_id: id
                },
                sendUrl: '/api/sms/send'
            });
            talk.showTalk();
        });
    });
});
