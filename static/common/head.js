/*头部*/
document.write("<div class=\"header\"><a href=\"index.html\" class=\"logo\"><img src=\"images\/logo.jpg\" id=\"logo\" alt=\"好快省专业汽车养护品牌\" title=\"返回首页\"\/><\/a><div class=\"ser_phone\">服务热线：400-888-8888<\/div><div id=\"nav\" class=\"nav\"><ul><li class=\"wu\"><a href=\"index.html\" title=\"首页\" class=\"nav1\">首页<\/a><\/li><li><a href=\"about.html\" title=\"关于好快省\" class=\"nav2\">关于好快省<\/a><\/li><li><a href=\"curing.html\" title=\"爱车养护\" class=\"nav3\">爱车养护<\/a><\/li><li><a href=\"sheet_spray.html\" title=\"专业钣喷\" class=\"nav4\">专业钣喷<\/a><\/li><li><a href=\"Inquiry.html\" title=\"门店查询\" class=\"nav5\">门店查询<\/a><\/li><li><a href=\"member_services.html\" title=\"会员服务\" class=\"nav6\">会员服务<\/a><\/li><\/ul><\/div><\/div>");
var head=document.getElementById('nav').getElementsByTagName('a');
var head1=head.length;
var flag=0;
for(i=0;i<head1;i++){
head[i].onclick=function(){headnav(this.value)};
}

function headnav(v){
	if (flag!=v) {
		if (head[flag].className.indexOf(' nav_on')>=0) Guo[flag].className=head[flag].className.substring(0,head[flag].className.indexOf(' nav_on'));
		flag=v;
		head[v].className+=' ';
	}
}