<?php
/**
 * @author ciogao@gmail.com
 */
class spall_user
{
    /**
     * 返回用户头像
     *
     * @param int $uid
     * @param string $h
     * @param string $type
     *
     * @param string $type_a
     * @return string 头像地址
     */
    static public function avatar($uid, $h = '30', $type = '', $type_a = '')
    {
        $ext = array('jpg', 'jpeg', 'png', 'gif');

        $user_model = models_user::getInstance();

        $user_info = $user_model->getUserInfoAll();
        if (!empty($user_info['face_url'])) {
            $url         = 'http://' . $_SERVER['HTTP_HOST'] . $user_info['face_url'];
            $executeTime = ini_get('max_execution_time');
            ini_set('max_execution_time', 0);
            $headers = get_headers($url);

            ini_set('max_execution_time', $executeTime);
            if ($headers) {
                $head = explode(' ', $headers[0]);
                if (!empty($head[1]) && intval($head[1]) < 400) {

                } else {
                    $url = '/resources/images/avatar_default.jpg';
                }
            } else {
                $url = '/resources/images/avatar_default.jpg';
            }
        } else {
            $url = '/resources/images/avatar_default.jpg';
        }

//        return '<a href="'.helper_common::site_url_user($uid).'" '.$type_a.'><img src="'.$url.'"  class="avatar" width="'.$h.'" height="'.$h.'" '.$type.'/></a>';
        return '<a href="/settings" ' . $type_a . '><img src="' . $url . '"  class="avatar" width="' . $h . '" height="' . $h . '" ' . $type . '/></a>';
    }

    /**
     * 返回用户头像资源路径
     *
     * @param $uid
     * @param $h
     * @return string
     */
    static public function avatarSource($uid, $h = 0)
    {
        $user_model = models_user::getInstance();

        $user_info = $user_model->getUserInfoAll();
        if (!empty($user_info['face_url'])) {
            $url         = 'http://' . $_SERVER['HTTP_HOST'] . $user_info['face_url'];
            $executeTime = ini_get('max_execution_time');
            ini_set('max_execution_time', 0);
            $headers = get_headers($url);

            ini_set('max_execution_time', $executeTime);
            if ($headers) {
                $head = explode(' ', $headers[0]);
                if (!empty($head[1]) && intval($head[1]) < 400) {

                } else {
                    $url = '/resources/images/avatar_default.jpg';
                }
            } else {
                $url = '/resources/images/avatar_default.jpg';
            }
        } else {
            $url = '/resources/images/avatar_default.jpg';
        }

        return $url;
    }

    /**
     * 取得头像url
     * @param $user_id
     * @return string
     */
    static public function getAvatarUrl($user_id)
    {
        $user_model = models_user::getInstance();
        $info       = $user_model->getAvatarByUserId($user_id);
        if (is_array($info) && !empty($info['face_url'])) return $info['face_url'];
        return '/resources/images/avatar_default.jpg';
    }

    /**
     * 取得用户姓名
     * @param $user_id
     * @return string
     */
    static public function getUserName($user_id)
    {
        $user_model = models_user::getInstance();

        $user_info = $user_model->getUserInfo();
        if ($user_id == $user_info['user_id']) return '我';

        $info = $user_model->getUsernameByUserId($user_id);
        if (is_array($info) && !empty($info['user_name'])) return $info['user_name'];

        return '';
    }

    /**
     * 获取username碎片
     * @param $uid
     * @return string
     */
    static public function username($uid)
    {
        $user_model = models_user::getInstance();
        $user_model->getDB()->cache_on(3600);
        $user_info = $user_model->getRow('user_name', array('user_id' => (int)$uid));
        $user_model->getDB()->cache_off();
        if (is_array($user_info) && count($user_info) > 0) {
            return $user_info['user_name'];
        }
        return 'Error';
    }

    /**
     * @param $gender
     * @return string
     */
    static public function gender($gender)
    {

        switch (intval($gender)) {
            case 0:
                $result = '泰国的,你懂';
                break;
            case contast_user::GENDER_MAN:
                $result = '宅男';
                break;
            case contast_user::GENDER_WOMAN:
                $result = '腐女';
                break;
        }

        return $result;
    }

    /**
     * 是否需要确认用户名
     * @return bool
     */
    static public function isConfirmMation()
    {
        $user_info = models_user::getInstance()->getUserInfo();
        return $user_info['is_vip'] == contast_user::IS_VIP_YES && $user_info['user_name'] == '';
    }

    /**
     * 是否可使用邀请码
     * @return bool
     */
    static public function haveinvitation()
    {
        $user_info = models_user::getInstance()->getUserInfo();
        return $user_info['is_vip'] == contast_user::IS_VIP_YES || $user_info['is_admin'] == contast_user::IS_ADMIN_YES;
    }
}