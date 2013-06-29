<?php
/**
 * 相册
 * @author ciogao@gmail.com
 */
class models_album extends Models
{
    private static $_instance = NULL;

    /**
     * @return models_album
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
        $this->_table = 'avi_album';
        $this->_primary = 'album_id';
    }

    /**
     * 浏览hist+1
     * @param $album_id
     * @return bool
     */
    function viewAlbum($album_id){
        return $this->update(array('hits' => 'hits + 1'),$album_id);
    }

    /**
     * 当前用户名下的专辑
     * @param int $user_id
     * @param int $limit
     *
     * @return array
     */
    function myAlbum($user_id = 0,$limit = 20){
        $this->db->cache_on(3600);
        if ((int)$user_id < 1) {
            $userinfo = models_user::getInstance()->getUserInfo();
            $user_id = (int)$userinfo['user_id'];
        }
        return $this->getAll('*',array('user_id' => $user_id),'',0,$limit);
    }

    /**
     * 热门专辑
     * @return array
     * @todo 封皮图片
     */
    function hotAlbum(){
        $this->db->cache_on(3600);
        return $this->getAll(array('album_id','album_name'),array(),array('hits' => 'desc'));
    }

    function mkdata($v)
    {
        return $data = array(
            'album_name' => $v['album_name'],
            'user_id' => $v['user_id'],
            'class_id' => '',
            'tag_ids' => '',
            'hits' => 1,
            'album_remark' => '',
            'created_time' => time(),
            'face_url' => '',
            'is_open' => (int)$v['is_open'],
        );
    }
}