<?php
/**
 * @author ciogao
 */
class spall_tag
{

    /**
     * @param $tags
     * @return mixed
     */
    static public function index_tag($tags){
        $str = '';
        if (is_array($tags) && count($tags) > 0){
            foreach ($tags as $v) {
                $str .= '<a href="';
                $str .= helper_common::site_url('tags/list/n/'.$v['tid']);
                $str .=  '">';
                $str .=  $v['tag'];
                $str .= '</a>';
            }
        }

        return$str;
    }
}