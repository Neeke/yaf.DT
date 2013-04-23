/**
 * @author ciogao@gmail.com
 */
var api_reg = '/api/user/reg';
var api_login = '/api/user/login';
var api_logout = '/api/user/logout';
var api_album_create = '/api/album/create';
var api_album_collection = '/api/album/collection';
var api_items_replay = '/api/items/replay';

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
                $('input[name=items_id]').val($(this).attr("data-items-id"));
            }else{
                $("#popup_layer,#login").show();
            }
        });
});

/*收藏图片*/
$(function(){
    $(".collection").click(function(){
        var album_id = $('input[name=albums]:checked').val();
        var items_id = $('input[name=items_id]').val();
        var message = W.message("处理中", "loading", 1000);
        $.ajax({
            type: "POST",
            url: api_album_collection,
            data: "items_id=" + items_id + "&album_id=" + album_id,
            success: function(msg) {
                message.close();
                $("#popup_layer,#Favorites").hide();
                if(msg.code != '1000') {
                    W.alert(msg.msg);
                } else {
                    W.alert(msg.msg, "success");
                    self.close();
                }
            },
            error:function ()
            {
                $("#popup_layer,#Favorites").show();
                W.alert("服务器有误，请联系管理员！");
                return false;
            }
        })
    });
});

/*回复评论*/
$(function(){
    $(".reply_submit").click(function(){
        var items_reply = $('textarea[name=items_reply]').val();

        if (items_reply == '' || items_reply == '添加你的评论...')
        {
            W.alert('请认真填写');
            return false;
        }

        var items_id = $('input[name=replay_items_id]').val();
        var message = W.message("处理中", "loading", 1000);
        $.ajax({
            type: "POST",
            url: api_items_replay,
            data: "items_id=" + items_id + "&content=" + items_reply,
            success: function(msg) {
                message.close();
                if(msg.code != '1000') {
                    W.alert(msg.msg);
                } else {
                    W.alert(msg.msg, "success");
                    self.close();
                }
            },
            error:function ()
            {
                $("#popup_layer,#Favorites").show();
                W.alert("服务器有误，请联系管理员！");
                return false;
            }
        })
    });
});

/*创建相册*/
function createAlbum() {
	new W.Tips({
		group: 'edit',
		target: "#createAlbum",
		autoHide: 0,
		width: 300,
		autoHide: false,
		type: "click",
		title: "创建相册",
		html: '<div class="policy_modifications"><table border="0" cellspacing="0" cellpadding="0"><tr><td>相册名：　<label class="policy_modifications_yes js_appendExtend"><input class="ipt_text" name="album_name" type="text" style="" value="" /></label></td></tr><tr><td>是否公开：　<input type="radio" name="isExtendRadio" class="js_extendRadioTrue" value="1"/><span>是</span><input type="radio" class="js_extendRadioFalse" name="isExtendRadio" value="0"/><span>否</span></td></tr></table></div>',

		bbar: [{
			text: "确定",
			handler: function() {
				var isExtendRadio = $('input[name=isExtendRadio]:checked').val();
				var album_name = $('input[name=album_name]').val();
				var self = this;
				var message = W.message("处理中", "loading", 1000);
				$.ajax({
					type: "POST",
					url: api_album_create,
					data: "is_open=" + isExtendRadio + "&album_name=" + album_name,
					success: function(msg) {
						message.close();
						if(msg.code != '1000') {
							W.alert(msg.msg);
						} else {
							W.alert("操作成功！", "success");
							self.close();
						}
					},
					error:function ()
					{
						W.alert("服务器有误，请联系管理员！");
						return false;
					}
				})
			}

		}, {
			text: "取消",
			type: "normal",
			handler: function() {
				this.close();
			}
		}],
		listeners: {}
	});
}
