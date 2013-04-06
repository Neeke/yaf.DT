	(function ($) {
		$.fn.setwaterfall = function (options) {
			function findLowestIndex(Arr){var index = 0;var i;for (i in Arr){if(Arr[i]<Arr[index]){index = i;}}return index;};
			function findBigestIndex(Arr){var index = 0;var i;for (i in Arr){if(Arr[i]>Arr[index]){index = i;}}return index;};
			
		   var boxwidth = $(this).width()+parseInt($(this).css("paddingLeft"))*2+parseInt($(this).css("marginLeft"))*2;
		   var wrapWidth = $(this).parent().width();
		   var col = Math.floor(wrapWidth/boxwidth);
           var wrappadding = (wrapWidth % boxwidth) /2;
		   var row = Math.floor($(this).length/col) == $(this).length/col?$(this).length/col:(Math.floor($(this).length/col)+1);
		   var colhigharry = [];var colpos;var leftpos;var toppos;
		   for(var len = 0;len < col;len++){colhigharry.push(0);};
		   $(this).each(function(index){var pos = index;var col1height = 0;var col2height = 0;var col3height = 0;var col4height = 0;
					if(pos<col)
					{
						leftpos = boxwidth*pos + wrappadding + "px";
						$(this).css({"top":"0","left":leftpos});
						colhigharry[index] = $(this).height()+parseInt($(this).css("marginTop"))*2+parseInt($(this).css("paddingTop"))+parseInt($(this).css("paddingBottom"));
					}
					else
					{
					   colpos = findLowestIndex(colhigharry);
					   leftpos = boxwidth*colpos + wrappadding +"px";
					   toppos = colhigharry[colpos]+"px";
					   $(this).css({"top":toppos,"left":leftpos});
					   colhigharry[colpos] =  colhigharry[colpos] + $(this).height()+parseInt($(this).css("marginTop"))*2+parseInt($(this).css("paddingTop"))+parseInt($(this).css("paddingBottom"));
					}           
		   });
		   var wraphighindex = findBigestIndex(colhigharry);
		   var wraphigh = colhigharry[wraphighindex]+"px";
		   $(this).parent().height(wraphigh);           
		   var selector = $(this).selector;
		   window.onresize = function(){$(selector).setwaterfall();};
			}
		})(jQuery)	
			
	$(function(){
		var obj = $(".tu_list:gt(19)").remove();	
		var obj = $.makeArray(obj)		
		$(".tu_list").setwaterfall();
		var i=0;
		$(window).scroll(function () {

		if ($CONFIG.if_login == 0){
			$("#popup_layer,#login").show();
		}

			var clienth = document.documentElement.clientHeight;
			var scrollh = document.documentElement.scrollHeight;
			var scrollt = document.documentElement.scrollTop + document.body.scrollTop;
			if (clienth + scrollt + 200 > scrollh) {
				if(i<20){
					var arrays = obj.splice(0,6);			
					$.each(arrays,function(){
						   $(this).addClass("hiden");
							$(".box_left").append(this);
							i++;
						});							
					$(".hiden").animate({opacity:1},1000);
					$(".tu_list").setwaterfall();
			
				}
				
			}
		});		
});