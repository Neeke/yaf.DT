define(function(require) {
    require('rest');

    var MSG_REFRESH_INTERVAL = 1000 * 60;

    function fetchMsgCount() {
        var rest = $.restPost('/api/sms/bubbles');

        rest.done(function(msg, data) {
            if (data.bubbles * 1 > 0) {
                $('#msgCount').show().text(data.bubbles);
            }

        });
    }

    $(function() {
        fetchMsgCount();

        setInterval(fetchMsgCount, MSG_REFRESH_INTERVAL);
    });
});