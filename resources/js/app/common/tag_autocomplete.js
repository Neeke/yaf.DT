define(function(require, exports) {

    function processAutocomplete($input) {
        $input.autocomplete({
            source: function( request, response) {
                var rest = $.restGet('/api/tag/search', {
                    tag_name: request.term
                });

                rest.done(function(msg, data) {
                    response($.map(data, function(item, index) {
                        return item.tag;
                    }));
                });
            },
            search: function() {
                // custom minLength
//                var term = extractLast( this.value );
//                if ( term.length < 2 ) {
//                    return false;
//                }
            },
            focus: function() {
                // prevent value inserted on focus
                return false;
            },
            select: function( event, ui ) {
                return;
                var terms = split( this.value );
                // remove the current input
                terms.pop();
                // add the selected item
                terms.push( ui.item.value );
                // add placeholder to get the comma-and-space at the end
                terms.push( "" );
                this.value = terms.join( ", " );
                return false;
            }
        });
    }

    exports.process = processAutocomplete;
});