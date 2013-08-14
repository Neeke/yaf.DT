<?php
/**
 * @author ciogao@gmail.com
 * Date: 13-8-14 下午8:06
 */
class helper_keepLogin
{
    /**
     * 保持登录状态
     * @param bool $keep
     * @return bool
     */
    static public function setKeepLogin($keep = FALSE)
    {
        if (!$keep) return FALSE;

        $userinfo = models_user::getInstance()->getUserInfo();

        $keepLogin = array(
            'user_id'    => $userinfo['user_id'],
            'user_email' => $userinfo['user_email'],
        );

        $cookie = helper_strTaint::mkTaint(json_encode($keepLogin));
        setcookie('userinfo', $cookie, time() + 60 * 60 * 24 * 30, '/');
        return TRUE;
    }

    /**
     * 取得cookie userinfo，并自动登录
     */
    static public function getKeepLogin()
    {
        $userinfo = $_COOKIE['userinfo'];
        $userinfo = json_decode(helper_strTaint::getTaint($userinfo), TRUE);
        $result = models_user::getInstance()->loginByCookie($userinfo['user_email'],$userinfo['user_id']);

        return $result;
    }

}