<?php
/**
 * feed
 * @author ciogao@gmail.com
 */
class models_smsfeed extends Models
{
    private static $_instance = NULL;

    /**
     * @return models_smsfeed
     */
    final public static function getInstance()
    {
        if (!isset(self::$_instance) || !self::$_instance instanceof self) {
            self::$_instance = new self;
        }
        return self::$_instance;
    }

    function __construct()
    {
        parent::__construct();
        $this->_table   = 'avi_msg_feed';
        $this->_primary = 'feed_id';
    }

    /**
     * 当前用户名下的专辑
     * @param int $user_id
     * @param int $start
     * @param int $limit
     *
     * @return array
     */
    function myFeed($user_id = 0, $start = 0, $limit = contast_album::PAGE_SIZE_DEFAULT)
    {
        $this->db->cache_on(3600);
        if ((int)$user_id < 1) {
            $userinfo = models_user::getInstance()->getUserInfo();
            $user_id  = (int)$userinfo['user_id'];
        }
        $info = $this->getAll('*', array('user_id_to' => $user_id), '', $start, $limit);
        foreach ($info as $k => $v) {
            $v['avatar']     = '/static/images/photo01.gif';
            $v['source_url'] = helper_common::site_url_user($v['user_id_from']);
            $info[$k]        = $v;
        }

        return $info;
    }

    function mkdata($v)
    {
        return $data = array(
            'user_id_from' => $v['album_name'],
            'user_id_to'   => $v['user_id'],
            'update_time'  => time(),
            'msg_count'    => 0,
            'content'      => $v['content'],
            'readed'       => 0,
            'type'         => 0,
        );
    }
}