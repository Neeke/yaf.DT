define(function(require) {
    require('rest');
    require('doT');
    require('typeahead');
    require('hogan');
    var DK = require('dk');
    var Talk = require('app/common/talk');

    var tplMessage = require('./message.doT.tpl');
    var tplWriteMsg = require('./writeMsg.doT.tpl');
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

    function initWriteMsg() {
        var win, toId;

        $('#writeMsg').click(function() {
            if (!win) {
                win = new DK.Window({
                    html: tplWriteMsg,
                    title: '发送私信',
                    width: 440,
                    cls: 'win-with-typeahead',
                    height: 'auto',
                    bbar: [{
                        text: '确定',
                        handler: function() {
                            if (!win.el.find('.js-search-ctnr').hasClass('searching')) {
                                var rest = $.restPost('/api/sms/send', {
                                    'to_user_id': toId,
                                    'content': win.el.find('.js-content').val()
                                });

                                rest.done(function(msg) {
                                    win.close();
                                });

                                rest.fail(function(msg) {
                                    W.alert(msg);
                                });
                            }
                        }
                    }, {
                        text: '取消',
                        type: 'normal',
                        handler: function() {
                            this.close();
                        }
                    }]
                });
            }

            win.show();

            win.el.find('.js-change-user').on('click', function() {
                win.el.find('.js-search-ctnr').addClass('searching');
                $search.val('');
            });

            var $search = win.el.find('.js-search');

            $search.typeahead({
                valueKey: 'user_name',
                engine: Hogan,
                remote: {
                    url: '/api/user/search?user_name=%QUERY',
                    filter: function(res) {
                         if (res.code === 1000) {
                            return res.data;
                         } else {
                             return [];
                         }
                    }
                },
                template: '<div class="tt-user">' +
                    '<img src="{{avatar}}" alt=""/>' +
                    '<span class="tt-user-name">{{user_name}}</span>' +
                    '</div>'
            });

            $search.on('typeahead:selected', function(e, data) {
                toId = data.user_id;
                win.el.find('.js-label').text(data.user_name);
                win.el.find('.searching').removeClass('searching');
            });
        });
    }

    $(function() {
        $list = $('#list');
        fetchMessages();

        initWriteMsg();

        $list.on('click', '.js-markread', function() {
            var $item = $(this).closest('.js-messageitem');
            var rest = $.restPost('/api/sms/removefeed', {
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
