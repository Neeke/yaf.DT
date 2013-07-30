<?php
/**
 *
 * 回复album
 * @author ciogao@gmail.com
 *
 */
class models_replyalbum extends Models
{
    private static $_instance = NULL;

    /**
     * @return models_replyalbum
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
        $this->_table   = 'avi_reply_album';
        $this->_primary = 'reply_id';
    }

    /**
     * @param $album_id
     * @param int $start
     * @param int $limit
     *
     * @return array
     */
    function getAllByAlbumId($album_id, $start = 0,$limit = 50)
    {
        $this->db->cache_on(120);
        $info = $this->getAll('*',
            array('album_id' => (int)$album_id),
            array('reply_id' => 'desc'),
            $start, $limit
        );

        return $info;
    }

    function mkdata($tem)
    {
        return $data = array(
            'album_id'     => $tem['album_id'],
            'user_id_from' => $tem['user_id_from'],
            'user_id_to'   => $tem['user_id_to'],
            'p_reply_id'   => $tem['reply_id'],
            'content'      => $tem['content'],
            'dateline'     => time(),
        );
    }
}