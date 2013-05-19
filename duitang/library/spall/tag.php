<?php
/**
 * @author ciogao@gmail.com
 */
class spall_tag
{

    /**
     * 首页的tag
     * @param $tags
     * @return mixed
     */
    static public function index_tag($tags)
    {
        $str = '';
        if (is_array($tags) && count($tags) > 0) {
            foreach ($tags as $v) {
                $str .= '<a href="';
                $str .= helper_common::site_url('tags/list/n/' . $v['tid']);
                $str .= '">';
                $str .= $v['tag'];
                $str .= '</a>';
            }
        }

        return $str;
    }

    /**
     * 发布图片时使用
     * @param $tags
     * @return string
     */
    static public function do_use_tags($tags)
    {
        $str = '';
        if (is_array($tags) && count($tags) > 0){
            foreach ($tags as $v){
                $str .= '<a href="javascript:;" class="btn_block do_use_tag"';
                $str .= 'data-tag-id="'. $v['tid']. '"';
                $str .= 'data-tag-name="' .$v['tag'] . '">';
                $str .= $v['tag'];
                $str .= '</a> ';
            }
        }

        return $str;
    }

    /**
     * 展示图片时使用
     * @param $tags
     * @return string
     */
    static public function itmes_view_tags($tags)
    {
        $str = '';
        if (is_array($tags) && count($tags) > 0){
            foreach ($tags as $v){
                $str .= '<a href="';
                $str .= helper_common::site_url('tags/list/n/' . $v['tid']).'" class="btn_block do_use_tag"';
                $str .= '">';
                $str .= $v['tag'];
                $str .= '</a> ';
            }
        }

        return $str;
    }
}