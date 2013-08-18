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
     * 当前用户订阅的专辑
     * @param int $user_id
     * @param int $start
     * @param int $limit
     *
     * @return array
     */
    function myListenedAlbum($user_id = 0,$start = 0,$limit = contast_album::PAGE_SIZE_DEFAULT){
        $this->db->cache_on(100);
        if ((int)$user_id < 1) {
            $userinfo = models_user::getInstance()->getUserInfo();
            $user_id = (int)$userinfo['user_id'];
        }

        $this->db->cache_key('album_listened_info_'.$user_id);
        $sql = 'select album.* from '.models_album::getInstance()->_table.' album
                left join '. $this->_table .' listened
                on listened.album_id = album.album_id
                where listened.user_id = ? and listened.flag = ? limit '. (int)$start .','. (int)$limit .'
                ';

        return $this->db->getAll($sql,array($user_id,contast_albumlistened::FLAG_DEFAULT));
    }

    /**
     * 当前用户订阅的专辑 ids
     * @param $user_id
     * @return array
     */
    function myListenedAlbumIds($user_id = 0)
    {
        $this->db->cache_on(3600);
        if ((int)$user_id < 1) {
            $userinfo = models_user::getInstance()->getUserInfo();
            $user_id = (int)$userinfo['user_id'];
        }

        $this->db->cache_key('album_listened_'.$user_id);
        $result = $this->getAll('album_id',array('user_id' => $user_id,'flag' => contast_albumlistened::FLAG_DEFAULT));
        if (!is_array($result) || count($result) < 1) return array();

        foreach ($result as $v) {
            $ids[] = $v['album_id'];
        }
        return $ids;
    }

    /**
     * 订阅专辑
     * @param $user_id
     * @param $album_id
     * @return bool
     */
    function listen($user_id,$album_id)
    {
        $data = $this->mkdata(array('user_id' => $user_id,'album_id' => $album_id));
        return $this->insert($data);
    }

    /**
     * @param $user_id
     * @param $album_id
     * @return bool
     */
    function reListen($user_id,$album_id)
    {
        $data = array('flag' => contast_albumlistened::FLAG_DEFAULT);
        $where = array('user_id' => $user_id,'album_id' => $album_id);
        return $this->update($data,$where);
    }

    /**
     * 删除album
     * @param $album_id
     * @param $user_id
     * @return bool
     */
    public function remove($album_id, $user_id)
    {
        if (intval($album_id) < 1 || intval($user_id) < 1) return FALSE;
        return $this->update(array('flag' => contast_albumlistened::FLAG_DEL), array('album_id' => $album_id, 'user_id' => $user_id));
    }

    function mkdata($v)
    {
        return $data = array(
            'album_id' => $v['album_id'],
            'user_id' => $v['user_id'],
            'created_time' => time(),
            'flag' => 0,
        );
    }
}