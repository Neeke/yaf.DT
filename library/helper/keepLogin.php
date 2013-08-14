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
        if (!$keep) return false;

        $userinfo = models_user::getInstance()->getUserInfo();
        $user_id = (int)$userinfo['user_id'];



    }

    static public function getKeepLogin()
    {

    }

}