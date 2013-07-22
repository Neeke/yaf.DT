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
    static public function avatar($uid,$h = '30',$type = '',$type_a = ''){
        $url = '/uploads/avatar/'.base64_encode($uid).'.jpg';
        $executeTime = ini_get('max_execution_time');
        ini_set('max_execution_time', 0);
        $headers = @get_headers($url);
        ini_set('max_execution_time', $executeTime);
        if ($headers) {
            $head = explode(' ', $headers[0]);
            if (!empty($head[1]) && intval($head[1]) < 400){

            }else{
                $url = '/resources/images/avatar_default.jpg';
            }
        }else{
            $url = '/resources/images/avatar_default.jpg';
        }
//        return '<a href="'.helper_common::site_url_user($uid).'" '.$type_a.'><img src="'.$url.'"  class="avatar" width="'.$h.'" height="'.$h.'" '.$type.'/></a>';
        return '<a href="javascript:;" '.$type_a.'><img src="'.$url.'"  class="avatar" width="'.$h.'" height="'.$h.'" '.$type.'/></a>';
    }

    /**
     * 获取username碎片
     * @param $uid
     * @return string
     */
    static public function username($uid){
        $user_model = models_user::getInstance();
        $user_model->getDB()->cache_on(3600);
        $user_info = $user_model->getRow('user_name',array('user_id' => (int)$uid));
        $user_model->getDB()->cache_off();
        if (is_array($user_info) && count($user_info) > 0){
            return $user_info['user_name'];
        }
        return 'Error';
    }

    /**
     * @param $gender
     * @return string
     */
    static public function gender($gender){

        switch (intval($gender)){
            case 0:
                $result = '泰国的,你懂';
                break;
            case contast_user::GENDER_MAN:
                $result = '爷们';
                break;
            case contast_user::GENDER_WOMAN:
                $result = '美女';
                break;
        }

        return $result;
    }
}