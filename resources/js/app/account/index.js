define(function(require) {
    var util = require('util');

    var $withdraw, $recharge;

    $(function() {
        $withdraw = $('#withdraw');
        $recharge = $('#recharge');

        $withdraw.click(function() {
            util.alert('功能正在开发');
        });

        $recharge.click(function() {
            util.alert('功能正在开发');
        });
    });
});