$.extend({
    vertical: function(list, options){
        options = $.extend({
            fn: $.noop,
            animate: $.noop,
            handls: {},
            mousewheel: true
        }, options);
        var childs = options.childs || list.children().filter(function(){
            return this.nodeType == 1
        });
        var active = childs.first(), index = 0, clientHeight = list.parents().height(), childHeight = active.outerHeight(), maxHeight = list.height() - clientHeight, offset = Math.floor(clientHeight / childHeight / 2 - 1) * childHeight;
        
        var scroll = function(evt, srcEvent){
            var el = $(this), currentTop = parseInt(list.css('top')), offsetTop = el.prop('offsetTop'), i = el.index(), toTop = Math.min(maxHeight, Math.max(0, offsetTop - offset));
            options.animate(currentTop, toTop, srcEvent);
            list.stop(true, true).animate({
                top: -toTop
            }, options.speed || 'fast', options.easing || 'swing', function(){
                list.css('top', -toTop);
                options.fn && options.fn(el, i);
            });
            return false;
        }
        
        var scrollBottom = function(evt){
            var next = active.next().filter(function(){
                return this.nodeType == 1
            });
            if (next.length) {
               	evt.currentTarget = next;
			    $(active = next).triggerHandler('scroll', evt);
            }
            return false;
        }
        
        var scrollTop = function(evt){
            var prev = active.prev().filter(function(){
                return this.nodeType == 1
            });
            if (prev.length) {
				evt.currentTarget = prev;
                $(active = prev).triggerHandler('scroll', evt);
            }
            return false;
        }
        
        childs.bind({
            'scroll': scroll,
            'click': function(evt){
                $(this).triggerHandler('scroll', evt);
                return false;
            }
        })
        
        options.handls.top && $(options.handls.top).bind('click', {
            from: 'handls'
        }, scrollTop);
        options.handls.bottom && $(options.handls.bottom).bind('click', {
            from: 'handls'
        }, scrollBottom);
        
        $(list).mousewheel(function(evt, delta){
            if (delta == -1) {
                scrollBottom(evt);
            }
            else {
                scrollTop(evt);
            }
            return false;
        });
    }
});
