/*头部*/
$(function(){
	$("#nav .nav0").hover(function(){
		$(this).find(".nav00").addClass("hover");
		$(this).find(".subMenu").fadeIn(200);
		},function(){
			$(this).find(".nav00").removeClass("hover");
			$(this).find(".subMenu").fadeOut(200);
			});
			
			
/*配置表*/			
	for(j=0;j<=2;j++){
		$("tr.td_th").eq(j).nextAll("tr:even").css("background","#eaeaea");
		}
		
		
		
/*BANNER*/		
	$(".banner_but a:first").addClass("hover");	
	var newArray= new Array("url(images/001.jpg)","url(images/002.jpg)","url(images/003.jpg)","url(images/004.jpg)");		
	var imgUrl= new Array("http://223.202.1.53/2012bjautoshow/index.html","sealions_w_outward.html","http://www.zhonghuacar.com/tezhongche/jingwuche/haishi.aspx?id=12","http://www.zhonghuacar.com/tezhongche/jiuhuche/haishi.aspx?id=30","http://www.haier.com");		
	$(".banner_but > a").click(function(){
		//var imgUrl = $(this).attr("name");
		var i = $(this).index();
		$(this).addClass("hover").siblings(".banner_but a").removeClass("hover");
		/*$(".banner").animate({opacity:"0"},800,function(){
			$(".banner").css({"background-image":newArray[i],"opacity":"1"});
			});*/
		$(".banner").hide().css("background-image",newArray[i]).fadeIn(500);
		//alert(imgUrl[i]);		
		$(".banner a").attr("href",imgUrl[i])
		})
	t = setInterval("autoPlay()",10000);	
	})
var t=n=0,count = $(".banner_but a").size();	
function autoPlay(){
	n = n >= (count - 1) ? 0 : ++n;
	$(".banner_but a").eq(n).trigger('click');

	}