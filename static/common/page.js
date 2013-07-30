function getValue(){
   document.getElementById('wena').value = document.getElementById('fil1').value;
}
function getValue1(){
   document.getElementById('wenb').value = document.getElementById('fil2').value;
}
function getValue2(){
   document.getElementById('wenc').value = document.getElementById('fil3').value;
}
function getValue3(){
   document.getElementById('wend').value = document.getElementById('fil4').value;
}
function getValue4(){
   document.getElementById('wene').value = document.getElementById('fil5').value;
}

function mytrim(str){ //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
} 
function addcomment(uid,id){
	if(uid=='' |uid<1){
		$("#newlayer").show();	
		$("#newlayer .bomb2").show();
		//return false;
	}
	else{
	var sid = id;
	var content =mytrim($("#u_content").val());
	if(content !=""){
	$.ajax({
        type: "POST",
        url: "http://story.faw-mazda.com/index.php/addapi/addcomment",
        data: "u_content=" + content+"&u_sid="+sid,            
        dataType: "xml",
        success: function (data) {
            if ($(data).find("result").text() == "1") {
            //alert('提交成功');//location.reload() ;
            	document.getElementById('cp_votealert').innerHTML="评论成功！";
            	$("#u_content").val('');
        		$("#ctbox").show();
            }
            else if($(data).find("result").text() == "-1")  { 
            	$("#newlayer").show();	
        		$("#newlayer .bomb2").show();
        		
            }
            else{
            	document.getElementById('cp_votealert').innerHTML="评论成功！";
            	$("#u_content").val('');
        		$("#ctbox").show();
            }
            
        }
    });
	}else{
		document.getElementById('cp_votealert').innerHTML="内容不能为空！";
		
		$("#ctbox").show();
	}
	}
}
//个人信息完善
function userinfo(){
	var uname =$("#u_realname").val();
	var usex =$('input[name=u_sex]:radio:checked').val();
	var mobile =$("#u_mobile").val();
	var email =$("#u_email").val();
	var address =$("#u_address").val();
	var alertinfo ="";
	if(uname=="" |mobile =="" |address =="" ){
		alertinfo="必填项不能为空!";
	}
	else if(funcChina(uname)){
		alertinfo+="名字不正确!";
	}
	else if(!isMobel(mobile)){
		alertinfo+="手机格式不正确!";
	}
	if(alertinfo ==""){
	$.ajax({
        type: "POST",
        url: "http://story.faw-mazda.com/index.php/addapi",
        data: "u_realname=" + uname + "&u_sex=" + usex+"&u_mobile="+mobile+"&u_email="+email+"&u_address="+address,            
        dataType: "xml",
        success: function (data) {
            if ($(data).find("result").text() == "1") {
            alert('提交成功');
			location.reload();
            }
            else if($(data).find("result").text() == "2")  { 
            	alert('您已经完善信息');location.reload();
            }else   { 
            	alert('提交失败');
            }
            
        }
    });
	}else{
		alert(alertinfo);
	}
}
function   funcChina(s){  
if(/^[\u4e00-\u9fa5]+$/.test(s))  
{  
//alert("不能含有汉字！");      
return   false;  
}  
return   true;  
}   
//手机验证
function isMobel(value)

{
 
if(/^13\d{9}$/g.test(value)||(/^15[0-35-9]\d{8}$/g.test(value))|| (/^18[05-9]\d{8}$/g.test(value)))
 
{ return true; }
 
else
 
{ return false; }
 
}

//QQ登录
function toQzoneLogin()
{
	window.location.href="https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=100280143&redirect_uri=http%3A%2F%2Fstory.faw-mazda.com%2Fqqback.html&scope=get_user_info";
	
} 
//新浪微博授权
//https://api.weibo.com/oauth2/authorize?client_id=3266480381&redirect_uri=http%3A%2F%2Fstory.faw-mazda.com%2Fsinaback&response_type=code
function usesina()
{
	window.location.href="https://api.weibo.com/oauth2/authorize?client_id=851666317&redirect_uri=http%3A%2F%2Fstory.faw-mazda.com%2Fsinaback&response_type=code";
	//window.open('https://api.weibo.com/oauth2/authorize?client_id=851666317&redirect_uri=http%3A%2F%2Fstory.faw-mazda.com%2Fsinaback&response_type=code', 'SinaLogin', 'width=600,height=410,menubar=0,scrollbars=0,status=1,titlebar=0,toobar=0,location=1,resizable=yes');
	
}


//投票
function vote(uid,sid,vid)
{
	alert('活动已结束，谢谢参与');
/*	if(uid=='' |uid<1){
		$("#newlayer").show();	
		$("#newlayer .bomb2").show();	
	}
	else{
	//alert(sid);
		//alert(vid);
		var myvid = parseInt($("#" + vid).html());
		//alert(myvid);
	$.ajax({
        type: "POST",
        url: "http://story.faw-mazda.com/index.php/vote/",
        data: "sid=" + sid ,            
        dataType: "xml",
        success: function (data) {
            if ($(data).find("result").text() == "1") {
            	  //投票成功
            	var notvote =parseInt($(data).find("notvote").text());
            	var award =parseInt($(data).find("award").text());
            	
            	if(notvote >0)
            	{
         
            		document.getElementById('p_votealert').innerHTML="您还需投票<strong>"+notvote+"</strong>次即可获得<strong>3</strong>次抽奖机会!";
            		$("#p_startaward").attr("style","display:none"); 
            		$("#vtbox").show();
            		
            	}
            	else{
            		if(award >0){
            		document.getElementById('p_votealert').innerHTML="您获得<b>3<b>抽奖机会!";
            		//$("#p_startaward").attr("style","display:block"); 
            		$("#vtbox").show();
            		//location.reload();
            		}
            		else{
            			
            			document.getElementById('p_votealert').innerHTML="投票成功!";
                		$("#p_startaward").attr("style","display:none"); 
                		$("#vtbox").show();
                		//location.reload();
            			
            		}
            	}
            	//document.getElementById(vid).innerHTML =myvid+1;
            	$("#" + vid).html(myvid+1)
            }
            else if($(data).find("result").text() == "2") { 
            	//活动结束
            	document.getElementById('p_votealert').innerHTML="活动结束!";
        		$("#p_startaward").attr("style","display:none"); 
        		$("#vtbox").show();
            }
            else  { 
            	//投票失败
            	document.getElementById('p_votealert').innerHTML="投票失败!";
        		$("#p_startaward").attr("style","display:none"); 
        		$("#vtbox").show();
            }
            
        }
    });
	}*/
}
//分享
function share(uid,sid,sourcetype,url,title,imageUrl )
{
	alert('活动已结束，谢谢参与');
/*	var myurl =url;
	var stitle ="亲，“那些年，我们一起开的Mazda6”活动中的《"+title+"》故事非常精彩，大家一起来参加！快来投票，一起分享，更有机会获得车模或手机充值卡哦！"//title;
	var myimg ="http://story.faw-mazda.com"+imageUrl;
$.ajax({
        type: "POST",
        url: "http://story.faw-mazda.com/index.php/login/checkuser/",       
        dataType: "xml",
        success: function (data) {
            if (parseInt($(data).find("result").text()) >0) {
            	myuid = parseInt($(data).find("result").text());
            	//alert(uid);
            	if(myuid=='' |myuid<1){
            		$("#newlayer").show();	
					$("#newlayer .bomb2").show();
            	}
            	else{
            	
            	$.ajax({
        type: "POST",
        url: "http://story.faw-mazda.com/index.php/share/",
        data: "sid=" + sid + "&sourcetype=" + sourcetype,            
        dataType: "xml",
        success: function (data) {
            if ($(data).find("result").text() == "1") {
            	//window.location.href="http://www.jiathis.com/send/?webid="+sourcetype+"&url="+myurl+"&title="+stitle;
            	window.open("http://www.jiathis.com/send/?webid="+sourcetype+"&url="+myurl+"&title="+stitle+"&pic="+myimg,"also"," left=0,top=0,width="+ (screen.availWidth - 10) +",height="+ (screen.availHeight-50) +",scrollbars,resizable=yes,toolbar=no")  
             }
            else if($(data).find("result").text() == "2") { 
            	$("#i_alert").val('活动结束!');
        		$("#itbox").show();
            }
                        else  { 
                        	$("#i_alert").val('分享失败!');
                    		$("#itbox").show();
                        }
                        
                    }
                });
            	}
            	
            }
            else  { 
            		$("#newlayer").show();	
					$("#newlayer .bomb2").show();
            }
        }
    });*/
}
//重载验证码
function fleshVerify(){
	var timenow = new Date().getTime();
	
	document.getElementById('verifyImg').src = "http://story.faw-mazda.com/index.php/reg/verify/"+timenow;
}
//用户注册提交
function regUser(){
	var username =document.getElementById('reg_user').value;
	var ulength = username.replace(/[^\x00-\xff]/g,"**").length;
	var userpw = document.getElementById('reg_pw').value;
	var pwlength = userpw.replace(/[^\x00-\xff]/g,"**").length;
	var regverify = document.getElementById('reg_verify').value;
	var velength = regverify.replace(/[^\x00-\xff]/g,"**").length;
	var alertinfo ='';
	if(ulength< 6 | ulength >15){
		alertinfo ='账号长度必须6~15位字符';
	}
	if(pwlength < 6 | pwlength > 12){
		alertinfo ='密码长度必须6~12位字符';
	}
	if(velength !=4){
		alertinfo ='验证码错误';
	}
	
	document.getElementById('reg_alert').innerHTML=alertinfo;
	if(alertinfo.length <1){
		   $.ajax({
	            type: "POST",
	            url: "http://story.faw-mazda.com/index.php/reg/",
	            data: "reg_user=" + username + "&reg_pw=" + userpw + "&reg_verify=" + regverify,            
	            dataType: "xml",
	            success: function (data) {
	                if ($(data).find("result").text() == "1") {
	                    $("#newlayer .bomb1").hide();
	                    $("#newlayer").hide();
	                    $("#login").html("<div class=\"login_b\">欢迎<b>"+$(data).find("nick").text()+"</b><a href=\"javascript:logout();\">退出</a><a href=\"/poststory/\">发表故事</a>|<a href=\"/mystory/\">我的故事</a></div>")
	                    location.reload();
	                }
	                else  {
	                	document.getElementById('reg_alert').innerHTML=$(data).find("alert").text();
	                }
	                
	            }
	        });
	}
		
	
	alertinfo = '';
	
}
function logUserI()
{
	var logintype = document.getElementById('login_type').value;;
	
	if(logintype==0){
		var username = $("#ilogin_user").val();//document.getElementById('login_user').value;
	var userpw = document.getElementById('ilogin_pw').value;
	//alert(username);
	//alert(userpw);
	if(username !="" && userpw !=""){
		$.ajax({
            type: "POST",
            url: "http://story.faw-mazda.com/index.php/login/",
            data: "login_user=" + username + "&login_pw=" + userpw + "&login_type=" + logintype,            
            dataType: "xml",
            success: function (data) {
                if ($(data).find("result").text() == "1") {
                    $("#i_login").html("欢迎<strong>"+$(data).find("nick").text()+"</strong><a class=\"esc\" href=\"/login/logout\">退出</a><a class=\"fb_esc\" title=\"发布故事\" href=\"/poststory\"></a><a class=\"my_esc\" title=\"我的故事\" href=\"/mystory\"></a>")
                   // location.reload();
                    $("#i_login").attr("style","display:block");//i_login
                	$("#i_loginoff").attr("style","display:none"); //.index_login_off
                }
                else  {
                	alert('失败');
                	//document.getElementById('login_alert').innerHTML=$(data).find("alert").text();
                }
                
            }
        });
		
	}else  {
    	document.getElementById('login_alert').innerHTML="用户名或密码不能为空";
    }
	}
	else{
		var username =document.getElementById('ilogin_user').value;
		
		var userpw = document.getElementById('ilogin_pw').value;
		if(username !="" && userpw !=""){
			$.ajax({
	            type: "POST",
	            url: "http://story.faw-mazda.com/api/cluboauth",
	            data: "login_user=" + username + "&login_pw=" + userpw + "&login_type=" + logintype,            
	            dataType: "xml",
	            success: function (data) {
	                if ($(data).find("result").text() == "1") {
	                	
	                	 $("#i_login").html("欢迎<strong>"+$(data).find("nick").text()+"</strong><a class=\"esc\" href=\"/login/logout\">退出</a><a class=\"fb_esc\" title=\"发布故事\" href=\"/poststory\"></a><a class=\"my_esc\" title=\"我的故事\" href=\"/mystory\"></a>")
	                     // location.reload();
	                      $("#i_login").attr("style","display:block");//i_login
	                  	$("#i_loginoff").attr("style","display:none"); //.index_login_off
	                   }
	                else  {
	                	alert('失败');
	                	//document.getElementById('login_clubalert').innerHTML=$(data).find("alert").text();
	                }
	                
	            }
	        });
			
		}else  {
	    	//document.getElementById('login_clubalert').innerHTML="用户名或密码不能为空";
	    }
	}
	}
//非首页站点注册用户登录
function loginUser(type){
	var logintype = type;
	var username =document.getElementById('login_user').value;
	
	var userpw = document.getElementById('login_pw').value;
	
	 //if ($('#typecheckBox').attr('checked'))
		// logintype = 1;
	//alert(logintype);
	if(logintype==0){
	if(username !="" && userpw !=""){
		$.ajax({
            type: "POST",
            url: "http://story.faw-mazda.com/index.php/login/",
            data: "login_user=" + username + "&login_pw=" + userpw + "&login_type=" + logintype,            
            dataType: "xml",
            success: function (data) {
                //alert($(data).find("result").text());
                if ($(data).find("result").text() == "1") {
                    //alert("提交成功" );
                    $("#newlayer .bomb2").hide();
                	$("#newlayer").hide();
                    $("#login").html("<div class=\"login_b\">欢迎<b>"+$(data).find("nick").text()+"</b><a href=\"javascript:logout();\">退出</a><a href=\"/poststory/\">发表故事</a>|<a href=\"/mystory/\">我的故事</a></div>")
                    //location.reload();
                }
                else  {
                	document.getElementById('login_alert').innerHTML=$(data).find("alert").text();
                }
                
            }
        });
		
	}else  {
    	document.getElementById('login_alert').innerHTML="用户名或密码不能为空";
    }
	}
	else{
		var username =document.getElementById('login_clubuser').value;
		
		var userpw = document.getElementById('login_clubpw').value;
		if(username !="" && userpw !=""){
			$.ajax({
	            type: "POST",
	            url: "http://story.faw-mazda.com/api/cluboauth",
	            data: "login_user=" + username + "&login_pw=" + userpw + "&login_type=" + logintype,            
	            dataType: "xml",
	            success: function (data) {
	                if ($(data).find("result").text() == "1") {
	                	
	                		$("#newlayer .bomb3").hide();
	                	
	                	$("#newlayer").hide();
	                    $("#login").html("<div class=\"login_b\">欢迎<b>"+$(data).find("nick").text()+"</b><a href=\"javascript:logout();\">退出</a><a href=\"/poststory/\">发表故事</a>|<a href=\"/mystory/\">我的故事</a></div>")
	                //location.reload();
	                }
	                else  {
	                	document.getElementById('login_clubalert').innerHTML=$(data).find("alert").text();
	                }
	                
	            }
	        });
			
		}else  {
	    	document.getElementById('login_clubalert').innerHTML="用户名或密码不能为空";
	    }
	}
}


/*图片自动缩放*/
function photo_auto(thisimg,img_w,img_h,img_place){
    var i_w=thisimg.width;
    var i_h=thisimg.height;
    if (img_w>0 && img_h>0) {
        if (i_w>=img_w) {
            if (i_h*img_w/i_w>=img_h){
                thisimg.style.width=parseInt(i_w*img_h/i_h)+"px";
                thisimg.style.height=img_h+"px";
                if (img_place=="center") thisimg.style.padding="0 "+parseInt((img_w-i_w*img_h/i_h)/2)+"px 0 "+(img_w-parseInt(i_w*img_h/i_h)-parseInt((img_w-i_w*img_h/i_h)/2))+"px";
            } else {
                thisimg.style.width=img_w+"px";
                thisimg.style.height=parseInt(i_h*img_w/i_w)+"px";
                if (img_place=="center") thisimg.style.padding=parseInt((img_h-i_h*img_w/i_w)/2)+"px 0 "+(img_h-parseInt(i_h*img_w/i_w)-parseInt((img_h-i_h*img_w/i_w)/2))+"px 0";
            }
        } else {
            if (i_h>=img_h) {
                thisimg.style.height=img_h+"px";
                thisimg.style.width=parseInt(i_w*img_h/i_h)+"px";
                if (img_place=="center") thisimg.style.padding="0 "+parseInt((img_w-i_w*img_h/i_h)/2)+"px 0 "+(img_w-parseInt(i_w*img_h/i_h)-parseInt((img_w-i_w*img_h/i_h)/2))+"px";
            } else {
                if (img_place=="center") thisimg.style.padding=parseInt((img_h-i_h)/2)+"px "+parseInt((img_w-i_w)/2)+"px "+(img_h-i_h-parseInt((img_h-i_h)/2))+"px "+(img_w-i_w-parseInt((img_w-i_w)/2))+"px";
            }
        }
    } else {
        if (img_w<1) {
            if (i_h>img_h) {
                if (img_h>0) {
                    thisimg.style.width=parseInt(i_w*img_h/i_h)+"px";
                    thisimg.style.height=img_h+"px";
                }
            } else {
                if (img_place=="center") thisimg.style.padding=parseInt((img_h-i_h)/2)+"px 0px "+(img_h-i_h-parseInt((img_h-i_h)/2))+"px";
            }
        } else {
            if (i_w>img_w) {
                thisimg.style.height=parseInt(i_h*img_w/i_w)+"px";
                thisimg.style.width=img_w+"px";
            } else {
                if (img_place=="center") thisimg.style.padding="0px "+parseInt((img_w-i_w)/2)+"px 0px "+(img_w-i_w-parseInt((img_w-i_w)/2))+"px";
            }
        }
    }
}

/*注册登录*/
document.writeln("<div id=\"newlayer\">");
document.writeln("<div class=\"layer_bg\"><\/div>");
document.writeln("<div class=\"bomb\" id=\"bomb\"> <a href=\"javascript:;\" class=\"close\" title=\"关闭\"><\/a>");
document.writeln("  <h2>个人信息填写<\/h2>");
document.writeln("  <ul class=\"xx_list\">");
document.writeln("    <li><em class=\"em_tit\"><tt>*<\/tt>真实姓名<\/em>");
document.writeln("      <input name=\"\"  id=\"u_realname\" class=\"ipt_b\"  maxlength=\"4\" type=\"text\" \/>");
document.writeln("    <\/li>");
document.writeln("    <li><em class=\"em_tit\"><tt>*<\/tt>性　　别<\/em>");
document.writeln("      <input name=\"u_sex\"  type=\"radio\" class=\"ipt_radio\" id=\"RadioGroup1_0\" value=\"男\" checked=\"checked\" \/>");
document.writeln("      <label>男<\/label>");
document.writeln("      <input type=\"radio\" class=\"ipt_radio\" name=\"u_sex\" value=\"女\" id=\"RadioGroup1_1\" \/>");
document.writeln("      <label>女<\/label>");
document.writeln("    <\/li>");
document.writeln("    <li><em class=\"em_tit\"><tt>*<\/tt>移动电话<\/em>");
document.writeln("      <input name=\"\" id=\"u_mobile\" class=\"ipt_b\" type=\"text\"  maxlength=\"11\"  \/>");
document.writeln("    <\/li>");
document.writeln("    <li><em class=\"em_tit\">电子邮箱<\/em>");
document.writeln("      <input name=\"\" id=\"u_email\" type=\"text\" class=\"ipt_b\"   maxlength=\"30\" \/>");
document.writeln("    <\/li>");
document.writeln("    <li><em class=\"em_tit\"><tt>*<\/tt>通信地址<\/em>");
document.writeln("      <input name=\"\" id=\"u_address\" type=\"text\" class=\"ipt_b\"  maxlength=\"25\"  \/>");
document.writeln("    <\/li>");
document.writeln("    <li class=\"tj\"><a class=\"but_tj1\" href=\"javascript:userinfo();\" title=\"提交\">提交<\/a><\/li>");
document.writeln("  <\/ul>");
document.writeln("<\/div>");
document.writeln("<div class=\"bomb1\" id=\"bomb1\"> <a href=\"javascript:;\" class=\"close\" title=\"关闭\"><\/a>");
document.writeln("  <h2>用户注册<\/h2>");
document.writeln("  <ul class=\"xx_list\">");
document.writeln("    <li><em class=\"em_tit\"><tt>*<\/tt>账　号<\/em>");
document.writeln("      <input name=\"\"  maxlength=\"15\"  id=\"reg_user\" class=\"ipt_b grey\" value=\"6~15位字符\" onfocus=\"if(this.value=='6~15位字符')this.value='',this.className='ipt_b'\"  onblur=\"if(this.value=='')this.value='6~15位字符',this.className='ipt_b grey'\" type=\"text\" \/>");
document.writeln("    <\/li>");
document.writeln("    <li><em class=\"em_tit\"><tt>*<\/tt>密　码<\/em>");
document.writeln("      <input name=\"\"  maxlength=\"12\"  id=\"reg_pw\"  class=\"ipt_b  grey\" value=\"\"  type=\"password\" \/>");
document.writeln("    <\/li>");
document.writeln("    <li><em class=\"em_tit\"><tt>*<\/tt>验证码<\/em>");
document.writeln("      <input name=\"\" id=\"reg_verify\" maxlength=\"4\"  class=\"ipt_b ipt_c\" type=\"text\" \/>");
document.writeln("      <img id=\"verifyImg\" src=\"http://story.faw-mazda.com/index.php/reg/verify\" width=\"37\" height=\"20\" \/><a href=\"javascript:fleshVerify();\" class=\"yanm\">看不清，换一张<\/a><\/li>   ");
document.writeln("    <li class=\"tj\"><p id=\"reg_alert\"><\/p><a class=\"but_tj1\" href=\"javascript:regUser();\" title=\"提交\">提交<\/a><\/li>");
document.writeln("  <\/ul>");
document.writeln("  <div class=\"list_right\">");
document.writeln("  已经有账号？请直接登录");
document.writeln("  <p><a href=\"login.html\" class=\"login_dl\" title=\"登录\"><span>登录<\/span><\/a><\/p>");
document.writeln("  您也可以用以下方式登录");
document.writeln("  <div class=\"name\">");
document.writeln("  <a href=\"javascript:usesina()\" title=\"新浪微博\" class=\"sina\">新浪微博<\/a><a href=\"javascript:toQzoneLogin()\" title=\"腾讯微博\" class=\"qq\">腾讯微博<\/a><a href=\"#\" title=\"壹马会\" class=\"yima\">壹马会<\/a>");
document.writeln("  <\/div>");
document.writeln("  <\/div>");
document.writeln("<\/div>");
document.writeln("");
document.writeln("<div class=\"bomb2\" id=\"bomb2\"> <a href=\"javascript:;\" class=\"close\" title=\"关闭\"><\/a>");
document.writeln("  <h2>用户登录<\/h2>");
document.writeln("  <ul class=\"xx_list\">");
document.writeln("    <li><em class=\"em_tit\"><tt>*<\/tt>账　号<\/em>");
document.writeln("      <input name=\"\" class=\"ipt_b\"  id=\"login_user\"  type=\"text\" maxlength=\"15\"  \/>");
document.writeln("    <\/li>");
document.writeln("    <li><em class=\"em_tit\"><tt>*<\/tt>密　码<\/em>");
document.writeln("      <input name=\"\" class=\"ipt_b\"  id=\"login_pw\" type=\"password\" maxlength=\"12\"  \/>");
document.writeln("    <\/li>      ");
document.writeln("    <li class=\"tj1\"><p id=\"login_alert\"><\/p><a class=\"but_tj1\" href=\"javascript:loginUser(0);\" title=\"登录\">登录<\/a><span>没有账号？<\/span><a href=\"javascript:;\" class=\"zuce\">注册<\/a><\/li>");
document.writeln("  <\/ul>");
document.writeln("  <div class=\"list_right\">  ");
document.writeln("  您也可以用以下方式登录");
document.writeln("  <div class=\"name\">");
document.writeln("  <a href=\"javascript:usesina()\" title=\"新浪微博\" class=\"sina\">新浪微博<\/a><a href=\"javascript:toQzoneLogin()\" title=\"腾讯微博\" class=\"qq\">腾讯微博<\/a><a href=\"javascript:;\" title=\"壹马会\" class=\"yima\">壹马会<\/a>");
document.writeln("  <\/div>");
document.writeln("  <\/div>");
document.writeln("<\/div>");
document.writeln("<div class=\"bomb3\" id=\"bomb3\"> <a href=\"javascript:;\" class=\"close\" title=\"关闭\"><\/a>");
document.writeln("  <h2>壹马会会员登录<\/h2>");
document.writeln("  <ul class=\"xx_list\">");
document.writeln("    <li><em class=\"em_tit\"><tt>*<\/tt>账　号<\/em>");
document.writeln("      <input name=\"\" id=\"login_clubuser\" class=\"ipt_b\" maxlength=\"15\"  type=\"text\" \/>");
document.writeln("    <\/li>");
document.writeln("    <li><em class=\"em_tit\"><tt>*<\/tt>密　码<\/em>");
document.writeln("      <input name=\"\" class=\"ipt_b\" id=\"login_clubpw\" type=\"password\"  \/>");
document.writeln("    <\/li>      ");
document.writeln("    <li class=\"tj1\"><p id=\"login_clubalert\"><\/p><a class=\"but_tj1\" href=\"javascript:loginUser(1);;\" title=\"登录\">登录<\/a><span>选择其他方式<\/span><a href=\"javascript:;\" class=\"dengluo\">登录<\/a><\/li>");
document.writeln("  <\/ul>");
document.writeln("  <div class=\"list_right\">  ");

document.writeln("  <\/div>");
document.writeln("<\/div>");
document.writeln("<\/div>")

$(function(){
	$(".close").click(function(){
		$("#newlayer .bomb2").hide();
		$("#newlayer .bomb1").hide();
		$("#newlayer .bomb").hide();
		$(".tbox").hide();		
		$("#newlayer").hide();
		//location.reload();
		});
	$("#p_alertok").click(function(){
		$("#newlayer .bomb2").hide();
		$("#newlayer .bomb1").hide();
		$("#newlayer .bomb").hide();
		$(".tbox").hide();		
		$("#newlayer").hide();	
		//location.reload();
		});
	$("#cp_alertok").click(function(){
		$("#newlayer .bomb2").hide();
		$("#newlayer .bomb1").hide();
		$("#newlayer .bomb").hide();
		$(".tbox").hide();		
		$("#newlayer").hide();	
		//location.reload();
		});
	$("#itbox").click(function(){
		$("#newlayer .bomb2").hide();
		$("#newlayer .bomb1").hide();
		$("#newlayer .bomb").hide();
		$(".tbox").hide();		
		$("#newlayer").hide();	
		//location.reload();
		});
	$("#login .login_a a.zuce,.index_login_on_k .my_tjzc,.dl .submit").click(function(aa){
		aa.preventDefault();
		alert('活动已结束，谢谢参与');
		//$("#newlayer").show();		
		//$("#newlayer .bomb1").show();	
		});
	$("#login .login_a a.dengl ,.dl .butmit").click(function(aa){		
		aa.preventDefault();
		alert('活动已结束，谢谢参与');
		//$("#newlayer").show();	
		//$("#newlayer .bomb2").show();	
		});
	$(".list_right .login_dl").click(function(bb){	
	    bb.preventDefault();	
		$("#newlayer .bomb1").hide();
		$("#newlayer .bomb2").show();
		});
	$(".xx_list .tj1 .zuce").click(function(cc){	
	    cc.preventDefault();
	    alert('活动已结束，谢谢参与');
		$("#newlayer .bomb2").hide();
		$("#newlayer .bomb1").show();
		});
	$(".xx_list .tj1 .dengluo").click(function(cc){	
	    cc.preventDefault();
		$("#newlayer .bomb3").hide();
		$("#newlayer .bomb1").hide();
		$("#newlayer .bomb2").show();
		});
	$(".yima").click(function(){		
		$("#newlayer .bomb2").hide();	
		$("#newlayer .bomb1").hide();
		$("#newlayer .bomb3").show();
		})
	$(".page a").not(":first").not(":last").click(function(){
		$(this).addClass("page_on").siblings().removeClass("page_on");
		});
		
	//搜索框
	var iptbox = $(".sea_ipt .ipt_sea");
	iptbox.focus(function(){
		if(iptbox.val()=="输入您想查找的关键字"){
			$(this).val("");
			}
		});
	iptbox.blur(function(){
		if(iptbox.val()==""){
			$(this).val("输入您想查找的关键字");
			}
		});
	//分享按钮
	
	var hoverHandle = function(evt){
		switch(evt.type){
			case 'mouseenter':
			$(this).addClass("fengxon");
			$(".fxbox",this).show();
			break;
			default:
				$(this).removeClass("fengxon");
				$(".fxbox",this).hide();
				break;
			
		}
	/**
			$(this).addClass("fengxon");
			$(".fxbox",this).show();
			}
			,function(){
				$(this).removeClass("fengxon");
				$(".fxbox",this).hide();
			})*/
	}	
		
	$('.story').delegate('.toup .fengx','hover',hoverHandle)
	//表单列表
	$(".form .list1 li:even").addClass("li_even");
	//活动介绍导航
	var $ats = $(".h2_tab a");
	$ats.click(function(){
		$(this).addClass("current").siblings().removeClass("current");
		var index = $ats.index(this);
		$("div.ats_box > .ats_on").eq(index).slideDown(500).siblings().slideUp(500);
		});	
	//获奖名单	
	$(".winners ul li:even").addClass("li_even");
	$(".winners ul li").hover(function(){
		$(this).addClass("hover");
		},function(){
		$(this).removeClass("hover");
			});
//	$(".title .wans").click(function(){
//		$("#newlayer").show();
//		$("#newlayer .bomb").show();	
//		});     
	//故事详情两列等高
/*	var leftheight = $(".sidebar").height();
	var rightheight = $(".section").height();
    if(leftheight > rightheight ) {
      $(".section").height(leftheight);
      }
      else {
      $(".sidebar").height(rightheight);
     }*/   
	//我的故事
	$(".table table tr:even").css("background","#eeeeee");
	$(".table table tr:odd").css("background","#f8f8f8");	
	
	//故事详情图片效果
	$(".pho_list > img:first").addClass("hover");	
	var imgsize = $(".pho_list img").length;
	if(imgsize==1){
		$(".pho_list").addClass("imgheight");
		}
		else{
			$(".pho_list > img").click(function(event,a,b){	
				var imgUrl = $(this).attr("name");
				var imgtitle = $(this).attr("alt");		
				$(this).addClass("hover").siblings().removeClass("hover");				
				$(".pho_img img").animate({opacity:"0"},500,function(){
				this.style.cssText="opacity: 0;filter:alpha(opacity=0)";
				$(this).attr("src",imgUrl);
				$(this).animate({opacity:"1"},500);
				$(".pho_txt").text(imgtitle);
				});
			});
			
			$("#right").click(function(){
				var imgt = $("#pho_list").find(".hover").next("img");				
				if(!imgt.length){
					alert("这是最后一个了~")
				}	
					imgt.trigger("click");
				})
			$("#left").click(function(){
				var imgt = $("#pho_list").find(".hover").prev("img");				
				if(!imgt.length){
					alert("到第一个了~")
				}	
					imgt.trigger("click");
				})
			}
	var firname=$(".pho_list img:first").attr("name");
	var firalt=$(".pho_list img:first").attr("alt");
	$(".pho_img img").attr("src",firname);
	$(".pho_txt").text(firalt);	
	
		//$(".toupiao").click(function(){
		//	$(".tbox").show();
			//});	
	
	$(".index_login_tab .dl_a").click(function(){
		$("#login_type").val(0);
		$(this).attr("class","dl_a hover");
		$(".index_login_tab .dl_d").attr("class","dl_d")
		});
	$(".index_login_tab .dl_d").click(function(){
		$("#login_type").val(1);
		$(this).attr("class","dl_d hover");
		$(".index_login_tab .dl_a").attr("class","dl_a")
		});

});

function show(){
		  document.getElementById("bottom").style.display="block";
		  document.getElementById("header").style.display="block";
		  document.getElementById("nav").style.display="block";
		  document.getElementById("logo").style.display="block";
}
function hide(){
		  document.getElementById("bottom").style.display="none";
		  document.getElementById("header").style.display="none";
		  document.getElementById("nav").style.display="none";
		  document.getElementById("logo").style.display="none";
}

function toupiao(){
	$(".tbox").show();
	}
function zhongjiang(){
	$("#newlayer").show();
	$("#newlayer .bomb").show();
	}
function login(){
	$("#newlayer").show();
	$("#newlayer .bomb2").show();
	}
function zuce(){
	$("#newlayer").show();
	$("#newlayer .bomb1").show();
	}
	
//首页FLASH高度
function offsetheight(){
    var offsetheight = $(document.body).height();
	if(offsetheight < 580){
		$("#box").css({"height":600})
		}
	else if(offsetheight > 600){
		$("#box").css({"height":"100%"})
		}
}
setInterval("offsetheight()",1);		
	
var isIE6= !!window.ActiveXObject&&!window.XMLHttpRequest; 
if(isIE6){
function footer(){
var z=""+(((document.body.scrollTop>0)?document.body.scrollTop:document.documentElement.scrollTop)+document.documentElement.clientHeight-document.getElementById("bomb").clientHeight)+"px";
document.getElementById("bomb").style.top=z;
var zz=""+(((document.body.scrollTop>0)?document.body.scrollTop:document.documentElement.scrollTop)+document.documentElement.clientHeight-document.getElementById("bomb1").clientHeight)+"px";
document.getElementById("bomb1").style.top=zz;
var zzz=""+(((document.body.scrollTop>0)?document.body.scrollTop:document.documentElement.scrollTop)+document.documentElement.clientHeight-document.getElementById("bomb2").clientHeight)+"px";
document.getElementById("bomb2").style.top=zzz;
var zzzz=""+(((document.body.scrollTop>0)?document.body.scrollTop:document.documentElement.scrollTop)+document.documentElement.clientHeight-document.getElementById("bomb3").clientHeight)+"px";
document.getElementById("bomb3").style.top=zzzz;
}
setInterval("footer()",1);}


function logout(){
	
	 $.ajax({
         type: "POST",
         url: "http://story.faw-mazda.com/index.php/login/jslogout",
         dataType: "xml",
         success: function (data) {
                 $("#login").html("<div class=\"login_a\">	<a class=\"zuce\" href=\"registered.html\">注册</a>	|	<a class=\"dengl\" href=\"login.html\">登录</a>	</div>")
                 $("#login .login_a a.zuce,.index_login_on_k .my_tjzc,.dl .submit").click(function(aa){
             		aa.preventDefault();
             		$("#newlayer").show();		
             		$("#newlayer .bomb1").show();	
             		}); 
                 $("#login .login_a a.dengl ,.dl .butmit").click(function(aa){		
             		aa.preventDefault();
             		$("#newlayer").show();	
             		$("#newlayer .bomb2").show();	
             		});
                
	 }
     });	
}
function ilogout(){
	
	 $.ajax({
        type: "POST",
        url: "http://story.faw-mazda.com/index.php/login/jslogout",
        dataType: "xml",
        success: function (data) {
                $("#login").html("<div class=\"login_a\">	<a class=\"zuce\" href=\"registered.html\">注册</a>	|	<a class=\"dengl\" href=\"login.html\">登录</a>	</div>")
            }
    });	
}