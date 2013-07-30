<?php
/**
 * @author ciogao@gmail.com
 */
class spall_album
{

    /**
     * @param $albums
     *
     * @return mixed
     */
    static public function albums($albums)
    {
        $str = '';
        if (is_array($albums) && count($albums) > 0) {
            foreach ($albums as $v) {
                $str .= '<a href="';
                $str .= helper_common::site_url_album($v['album_id']);
                $str .= '" title="' . $v['album_name'] . '">';
                $str .= '<img src="/static/images/photo03.jpg" />';
                $str .= '</a>';
            }
        }

        return $str;
    }

    /**
     * @param $action
     * @return bool
     */
    static public function ifJustlook($action)
    {
        if (array_key_exists($action, spall_menu::getJustlook())) {
            return TRUE;
        }

        return FALSE;
    }
}