(function(global, $) {

    function rest(type, url, data, callback) {
        if (typeof data === "function") {
            callback = data;
            data = {};
        }

        var der = $.Deferred();

        $.ajax({
            type: type,
            url: url,
            data: data,
            success: function(rs) {
                if (rs.code === 1000) {
                    if (typeof callback === 'function') {
                        callback.call(this, rs.msg, rs.data);
                    }
                    der.resolveWith(this, [rs.msg, rs.data]);
                } else {
                    der.rejectWith(this, [rs.msg]);
                }
            },
            error: function() {
                der.rejectWith(this);
            }
        });

        return der.promise();
    }

    $.extend({
        restGet: function() {
            return rest.apply(this, ['GET'].concat(Array.prototype.slice.call(arguments, 0)));
        },
        restPost: function() {
            return rest.apply(this, ['POST'].concat(Array.prototype.slice.call(arguments, 0)));
        }
    });
}) (this, jQuery);
