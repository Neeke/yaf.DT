<?php
/**
 * empty 提示
 * @todo 存库
 * @author ciogao@gmail.com
 *
 */
class spall_nullmsg
{
    private static $_msgs = array(
        'album/mine'  => '你还没有图集，现在去<a href="/make/album">做一个</a>？',
        'album/listened' => '还没有订阅图集',
        'whats/hot' => 'sorry，暂时还没有热门图集',
        'whats/new' => 'sorry，暂时还没有最新图集',
    );

    static public function get_nullmsgs()
    {
        return self::$_msgs;
    }

    static public function getNullMsgs($action)
    {
        return self::$_msgs[$action];
    }
}