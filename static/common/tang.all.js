/**
 * Created with JetBrains PhpStorm.
 * User: ciogao
 */
var api_reg = '/api/user/reg';

function submit(){
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
                location.reload();
            }
        }
    });
}