/*导航搜索框状态*/
$(function(){
	var $iptsearch = $("#ipt_search,#ipt_search_tag");
	$iptsearch.focus(function(){
		var text_val=$(this).val();
		if(text_val==this.defaultValue){
			$(this).val("");
			}
		});		
	$iptsearch.blur(function(){
		var text_val=$(this).val();
		if(text_val==""){
			$(this).val(this.defaultValue);
			}
		});
});


/*标签当前状态*/
$(function(){
	$(".rightlabel a").click(function(){
		$(this).addClass("current");
		})
});


/*首页喜欢与收藏的显示与隐藏*/
$(function(){
	$(".tu_img,.ly_list li,.tag_list ul li").hover(function(){
		$(this).addClass("current");
		},function(){			
		$(this).removeClass("current");
			});
	$(".tag_list ul li:first").css({"borderTop":0})	
	var hoverHandle = function(evt){
		switch(evt.type){
			case 'mouseenter':
			$(this).addClass("current");
			//$(".tu_img",this).show();
			break;
			default:
				$(this).removeClass("current");
				//$(".tu_img",this).hide();
				break;
			}
		}
	$('.box_left').delegate('.tu_list .tu_img','hover',hoverHandle)	
});


/*返回顶部*/
$(function() {    
	$backToTopEle = $('<div class="backToTop"><a href="javascript:;" class="backtop" title="返回顶部"></a><a href="javascript:bookmark();" class="addfavorites" title="加入收藏"></a></div>').appendTo($("body"));
	$(".backtop").click(function() {
            $("html, body").animate({ scrollTop: 0 }, 120);
    }), $backToTopFun = function() {
        var st = $(document).scrollTop(), winh = $(window).height();
        (st > 0)? $backToTopEle.show(): $backToTopEle.hide();
        //IE6下的定位
        if (!window.XMLHttpRequest) {
            $backToTopEle.css("top", st + winh - 166);
        }
    };
    $(window).bind("scroll", $backToTopFun);
    $(function() { $backToTopFun(); });
})();

/*加入收藏*/
function bookmark(){
    var title=document.title
    var url=document.location.href
    if (window.sidebar) {
        window.sidebar.addPanel(title, url,"");
    }else if( window.opera && window.print ){
        var mbm = document.createElement('a');
        mbm.setAttribute('rel','sidebar');
        mbm.setAttribute('href',url);
        mbm.setAttribute('title',title);
        mbm.click();
    }else if( document.all ) {
        window.external.AddFavorite( url, title);
    }
}