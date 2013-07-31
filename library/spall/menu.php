<?php
/**
 * 目录
 * @todo 存库
 * @author ciogao@gmail.com
 *
 */
class spall_menu
{
    private static $_menu = array(
        'nav01' => array(
            'explore' => '随便看看',
            'hot'     => '热门',
            'new'     => '最新',
        ),

        'nav02' => array(
            'main'       => '我的',
            'album/mine' => '我的图集',
            'subscribe'  => '我的订阅',
            'tags/mine'   => '我的标签',
        ),

//        'nav03' => array(
//            'main' => '品牌推荐',
//            'ad/1' => '品牌推荐1',
//            'ad/2' => '品牌推荐2',
//            'ad/3' => '品牌推荐3',
//        ),
    );

    static public function get_menu()
    {
        return self::$_menu;
    }

    static public function getJustlook()
    {
        return self::$_menu['nav01'];
    }
}