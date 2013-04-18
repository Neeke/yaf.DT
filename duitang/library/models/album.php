<?php
/**
 * 相册
 * @author ciogao@gmail.com
 */
class models_album extends Models
{
    private static $_instance = null;

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
     * @return array
     */
    function myAlbum(){
        $this->db->cache_on(3600);
        $userinfo = models_user::getInstance()->getUserInfo();
        return $this->getAll('*',array('user_id' => $userinfo['user_id']));
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
            'album_name' => $v->test,
            'user_id' => $v->test,
            'class_id' => $v->test,
            'tag_ids' => $v->test,
            'hits' => $v->test,
            'remark' => $v->test,
            'dateline' => time(),
            'face_url' => $v->test,
        );
    }
}