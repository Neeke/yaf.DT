/**
 * @author ciogao@gmail.com
 */
var api_reg = '/api/user/reg';
var api_login = '/api/user/login';
var api_logout = '/api/user/logout';

function reg(){
    var email = $('input[name=email]').val();
    var user_name = $('input[name=user_name]').val();
    var pwd = $('input[name=pwd]').val();
    var pwdre = $('input[name=pwdre]').val();
    var remark = $('textarea[name=remark]').val();


    if (pwd == '') {
        W.alert('请输入密码');
        return false;
    }

    if (pwd != pwdre) {
        W.alert('两次输入密码不同');
        return false;
    }

    var message = W.message("处理中", "loading", 1000);
    return $.ajax({
        type: "POST",
        url: api_reg,
        data: "email=" + email + '&user_name=' + user_name + '&pwd=' + pwd + '&remark=' + remark,
        dataType: "json",
        success: function(msg) {
            message.close();

            if(msg.code != 1000) {
                W.alert(msg.msg);
            } else {
                W.alert("操作成功！", "success");
               // location.reload();
            }
        }
    });
}

function login(){
    $("#popup_layer").hide();
    var user_name = $('input[name=user_name]').val();
    var pwd = $('input[name=pwd]').val();

    if (pwd == '' || user_name == '') {
        W.alert('请认真填写用户名密码');
        return false;
    }

    var message = W.message("处理中", "loading", 1000);
    return $.ajax({
        type: "POST",
        url: api_login,
        data: 'user_name=' + user_name + '&pwd=' + pwd,
        dataType: "json",
        success: function(msg) {
            message.close();
            if(msg.code != 1000) {
                W.alert(msg.msg);
            } else {
                W.alert("操作成功！", "success");
                location.reload();
            }
        }
    });
}

function logout(){
    var message = W.message("处理中", "loading", 1000);
    return $.ajax({
        type: "POST",
        url: api_logout,
        dataType: "json",
        success: function(msg) {
            message.close();
            if(msg.code != 1000) {
                W.alert(msg.msg);
            } else {
                W.alert("成功退出", "success");
            }
        }
    });
}

    /*登录*/
$(function(){
    $("#login_btn").click(function(){
        $("#Login_area,#before_logging").hide(300);
        $("#Login_area_two,#login_back").show(300);
    });

    $(".secelt_btn").click(function(){
        $(".secelt_up").show(300);
        $(".secelt_up").mouseover(function(){
            $(".secelt_up").css('display','block');
        }).mouseout(function(){
           $(".secelt_up").css('display','none');
       });
    });

    $("#quit").click(function(){
        logout();
        $("#Login_area_two,#login_back").hide(300);
        $("#Login_area,#before_logging").show(300);
    });
});

/*弹出收藏框*/
$(function(){
        $(".icon_collect").click(function(){
            if ($CONFIG.if_login && $CONFIG.if_login == 1){
                $("#popup_layer,#Favorites").show();
            }else{
                $("#popup_layer,#login").show();
            }
        });
});