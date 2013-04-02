<?php
/**
 * 相册
 * @author firefly
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
        );
    }
}