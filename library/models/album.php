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
        $this->_table   = 'avi_album';
        $this->_primary = 'album_id';
    }

    /**
     * 浏览hist+1
     * @param $album_id
     * @return bool
     */
    function viewAlbum($album_id)
    {
        return $this->db->query('update ' . $this->_table . ' set hits = hits + 1 where album_id = ?', array($album_id));
    }

    /**
     * 评论数+1
     * @param $album_id
     * @return array|bool|string
     */
    function postsAlbum($album_id)
    {
        return $this->db->query('update ' . $this->_table . ' set posts = posts + 1 where album_id = ?', array($album_id));
    }

    /**
     * 当前用户名下的专辑
     * @param int $user_id
     * @param int $start
     * @param int $limit
     *
     * @return array
     */
    function myAlbum($user_id = 0, $start = 0, $limit = contast_album::PAGE_SIZE_DEFAULT)
    {
        $this->db->cache_on(3600);
        if ((int)$user_id < 1) {
            $userinfo = models_user::getInstance()->getUserInfo();
            $user_id  = (int)$userinfo['user_id'];
        }
        $this->db->cache_key('album_mine_'.$user_id);
        return $this->getAll('*', array('user_id' => $user_id, 'flag' => contast_album::FLAG_DEFAULT), '', $start, $limit);
    }

    /**
     * 随便看看
     * ＠todo 更好的随机算法　与tag_listened关联
     * @return array
     */
    function justlook()
    {
        $this->db->cache_on(1800);
        $sql = 'SELECT * FROM avi_album WHERE flag = 0 ORDER BY RAND() LIMIT 6';
        return $this->db->getAll($sql);
    }

    /**
     * 更新封面
     * @param $url
     * @param $album_id
     * @return bool
     */
    function updateCover($url, $album_id)
    {
        $data = array('face_url' => $url);
        return $this->update($data, array($this->_primary => (int)$album_id));
    }

    /**
     * 热门专辑
     * @return array
     */
    function hotAlbum()
    {
        $this->db->cache_on(3600);
        return $this->getAll('*', array('flag' => contast_album::FLAG_DEFAULT), array('hits' => 'desc'), 0, 6);
    }

    /**
     * 热门专辑
     * @return array
     */
    function newAlbum()
    {
        $this->db->cache_on(3600);
        return $this->getAll('*', array('flag' => contast_album::FLAG_DEFAULT), '', 0, 6);
    }

    /**
     * listed总数加１
     * @param $album_id
     * @return bool
     */
    public function addListened($album_id)
    {
        return $this->db->query('update ' . $this->_table . ' set likeit = likeit + 1 where album_id = ?', array($album_id));
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
        return $this->update(array('flag' => contast_album::FLAG_DEL), array('album_id' => $album_id, 'user_id' => $user_id));
    }


    function mkdata($v)
    {
        return $data = array(
            'album_name'   => $v['album_name'],
            'user_id'      => $v['user_id'],
            'class_id'     => '',
            'tag_ids'      => is_array($v['tag_ids']) ? implode(',', $v['tag_ids']) : $v['tag_ids'],
            'hits'         => 1,
            'album_remark' => $v['album_remark'],
            'created_time' => time(),
            'face_url'     => '',
            'is_open'      => (int)$v['is_open'],
            'likeit'       => 0,
            'items'        => (int)count($v['items']),
        );
    }
}