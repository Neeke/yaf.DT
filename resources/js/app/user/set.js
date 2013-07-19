define(function(require) {

    require('rest');

    $(function() {
        $(document).on('click', '.js-edit', function() {
            $(this).closest('.js-userinfo-item').addClass('editing');
        });

        $(document).on('click', '.js-submit', function() {
            var $item = $(this).closest('.js-userinfo-item');

            $item.removeClass('editing');

            var rest = $.restPost('/api/user/set', $item.find('form').serialize());

            rest.done(function(msg) {
                alert(msg);
            });

            rest.fail(function(msg) {
                alert(msg);
            });
        });
    });
});