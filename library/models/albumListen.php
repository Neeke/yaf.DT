<?php
/**
 * 相册订阅
 * @author ciogao@gmail.com
 */
class models_albumListen extends Models
{
    private static $_instance = NULL;

    /**
     * @return models_albumListen
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
        $this->_table = 'avi_album_listen';
        $this->_primary = 'id';
    }

    /**
     * 当前用户名下的专辑
     * @param int $user_id
     * @param int $limit
     *
     * @return array
     */
    function myListenedAlbum($user_id = 0,$limit = 20){
        $this->db->cache_on(3600);
        if ((int)$user_id < 1) {
            $userinfo = models_user::getInstance()->getUserInfo();
            $user_id = (int)$userinfo['user_id'];
        }
        return $this->getAll('*',array('user_id' => $user_id),'',0,$limit);
    }

    function mkdata($v)
    {
        return $data = array(
            'album_id' => $v['album_id'],
            'user_id' => $v['user_id'],
            'created_time' => time(),
        );
    }
}