$(function($){

    var list = $('#photolist'), childs = $('li', list).bind('view', function(){
        var el = $(this), title = el.attr('title');
    }),cls = 'hover';
    
    var top = $('#top'), bottom = $('#bottom'), view = $('#view').bind('mousewheel', function(evt){
        list.trigger.apply(list, arguments);
        return false;
    }),desc = $('.desc',view),img = $('.img' , view);
    
	
	
    $.vertical(list, {
        childs: childs,
        fn: function(el){
        
        },
        animate: function(from, to, srcEvent){
			var currentTarget = $(srcEvent.currentTarget);
            $(top).css('visibility'   , $(currentTarget).is(childs.first()) ? 'hidden' : 'visible');
            $(bottom).css('visibility', $(currentTarget).is(childs.last()) ? 'hidden' : 'visible');
            childs.removeClass( cls );
			currentTarget.addClass(cls);
			desc.html(currentTarget.attr('desc'));
			img.stop(true,true).fadeOut('fast').attr('src',currentTarget.attr('src')+'?11111'+ Math.random()).fadeIn('fast')
        },
        handls: {
            top	  : top,
            bottom: bottom
        }
    });
});
