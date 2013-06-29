<?php
/**
 * @author ciogao@gmail.com
 */
class spall_user
{
    /**
     * 返回用户头像
     *
     * @param int    $uid
     * @param string $h
     * @param string $type
     *
     * @return string 头像地址
     */
    static public function avatar($uid,$h = '30',$type = ''){
        $url = '/uploadfiles/userfile/'.base64_encode($uid).'.jpg';
        $executeTime = ini_get('max_execution_time');
        ini_set('max_execution_time', 0);
        $headers = @get_headers($url);
        ini_set('max_execution_time', $executeTime);
        if ($headers) {
            $head = explode(' ', $headers[0]);
            if (!empty($head[1]) && intval($head[1]) < 400){

            }else{
                $url = '/static/images/photo01.gif';
            }
        }else{
            $url = '/static/images/photo01.gif';
        }
        return '<a href="'.helper_common::site_url_user($uid).'"><img src="'.$url.'"  class="avatar" width="'.$h.'" height="'.$h.'" '.$type.'/></a>';
    }
}