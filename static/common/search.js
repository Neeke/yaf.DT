/*弹出框显示代码
document.writeln("<div id=\"popup_layer\">");
document.writeln("  <div class=\"layer_bg\"><\/div>");
document.writeln("  <div id=\"login\"> <a href=\"javascript:;\" title=\"关闭\" class=\"close\"><\/a>");
document.writeln("    <h1 class=\"pink\">登录<\/h1>");
document.writeln("    <div class=\"login_left\">");
document.writeln("      <ul>");
document.writeln("        <li>");
document.writeln("          <label class=\"label\">用户名:<\/label>");
document.writeln("          <input type=\"text\" class=\"ipt_text\" \/>");
document.writeln("        <\/li>");
document.writeln("        <li>");
document.writeln("          <label class=\"label\">密　码:<\/label>");
document.writeln("          <input type=\"text\" class=\"ipt_text\" \/>");
document.writeln("        <\/li>");
document.writeln("        <li>");
document.writeln("          <label>");
document.writeln("            <input type=\"checkbox\" class=\"ipt_checkbox\" \/>");
document.writeln("            两周内免登录<\/label>");
document.writeln("        <\/li>");
document.writeln("        <li class=\"li_tj\"><a href=\"javascript:;\" class=\"btn btn2\"><b>登录<\/b><\/a><a href=\"javascript:;\" class=\"pink forgetpass\">忘记密码<\/a><\/li>");
document.writeln("      <\/ul>");
document.writeln("    <\/div>");
document.writeln("    <div class=\"login_right\">");
document.writeln("      <p>还不是萌友？<\/p>");
document.writeln("      <p><a href=\"javascript:;\" class=\"btn btn1\"><b>现在注册<\/b><\/a><\/p>");
document.writeln("      <p><a href=\"#\" class=\"login_icon1\">用微博帐户登录<\/a><\/p>");
document.writeln("      <p><a href=\"#\" class=\"login_icon2\">用QQ帐号登录<\/a><\/p>");
document.writeln("      <p><a href=\"#\" class=\"login_icon3\">用淘宝帐户登录<\/a><\/p>");
document.writeln("    <\/div>");
document.writeln("  <\/div>");
document.writeln("  <div id=\"Incorrect\">");
document.writeln("    <p class=\"pink\">填写的格式不正确<\/p>");
document.writeln("    <a href=\"javascript:;\" class=\"btn btn2 close\"><b>返回<\/b><\/a> <\/div>");
document.writeln("  <div id=\"success\" class=\"close\">发布成功<\/div>");
document.writeln("  <div id=\"login_prompt\"> <a href=\"javascript:;\" title=\"关闭\" class=\"close\"><\/a>");
document.writeln("    <p class=\"pink\">需要登录后才能继续操作<br \/>");
document.writeln("      现在 <a href=\"#\" class=\"blue\">登录<\/a> 或 <a href=\"registered.html\" class=\"blue\">注册<\/a><\/p>");
document.writeln("  <\/div>");
document.writeln("  <div id=\"Favorites\"> <a href=\"javascript:;\" title=\"关闭\" class=\"close\"><\/a>");
document.writeln("    <h1 class=\"pink\">收藏<\/h1>");
document.writeln("    <div class=\"Favorites\"> <a href=\"javascript:;\"><img src=\"images\/photo05.jpg\" class=\"pho_left\" \/><\/a>");
document.writeln("      <h2>收藏到<\/h2>");
document.writeln("      <textarea name=\"\" cols=\"\" rows=\"5\">默认专辑");
document.writeln("汽车");
document.writeln("其它<\/textarea>");
document.writeln("      <div class=\"Favorites_a\">");
document.writeln("        <input name=\"\" type=\"text\" class=\"ipt_text\" \/>");
document.writeln("        <a href=\"javascript:;\" class=\"btn btn2\"><b>创建<\/b><\/a><\/div>");
document.writeln("    <\/div>");
document.writeln("  <\/div>");
document.writeln("<\/div>")
*/
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


/*登录*/
$(function(){
	$("#login_btn").click(function(){
		$("#Login_area,#before_logging").hide(300);
		$("#Login_area_two,#login_back").show(300);
		});
	$("#quit").click(function(){
		$("#Login_area_two,#login_back").hide(300);
		$("#Login_area,#before_logging").show(300);
		})
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



/*弹出层*/
$(function(){
	$(".close").click(function(){
	$("#popup_layer").hide(500);	
	
	})
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




/*滚动时提示登录*/


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