<?php
/**
 * 图片
 * @author ciogao@gmail.com
 *
 */
class models_items extends Models
{
    private static $_instance = NULL;

    /**
     * @return models_items
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
        $this->_table   = 'avi_items';
        $this->_primary = 'items_id';
    }

    /**
     * 首页获取图片
     */
    function getIndexItems()
    {
        $this->db->cache_on();
        return $this->getAll(array('items_id', 'items_name', 'items_pic', 'reply_hits', 'like_hits', 'remark'),
            array('flag' => contast_items::ITEMS_FLAG_YES),
            array('items_id' => 'asc')
        );
    }

    /**
     * 依相册ID取得所有图片
     * @param $album_id
     * @return array|bool
     */
    function getItemsByAlbumId($album_id)
    {
        $this->db->cache_on();
        return $this->getAll(array('items_id', 'items_pic', 'remark', 'txt_area', 'pic_area', 'is_cover'),
            array('album_id' => $album_id, 'flag' => contast_items::ITEMS_FLAG_YES),
            array('is_cover' => 'desc', 'items_id' => 'asc'),
            0,100
        );
    }

    /**
     * 依相册ID取得所有图片id集合
     * @param $album_id
     * @return array|bool
     */
    function getItemsIdsByAlbumId($album_id)
    {
        $this->db->cache_on();
        $info = $this->getAll(array('items_id'),
            array('album_id' => $album_id, 'flag' => contast_items::ITEMS_FLAG_YES),
            array('is_cover' => 'desc', 'items_id' => 'asc')
        );
        $ids  = array();
        foreach ($info as $val) {
            $ids[] = $val['items_id'];
        }
        return $ids;
    }

    /**
     * 软删除
     * @param $items_ids
     * @return bool
     *
     * @todo mysql in操作
     */
    function updateItemsForDelete($items_ids)
    {
        if (!is_array($items_ids) || count($items_ids) < 1) {
            return FALSE;
        }

        foreach ($items_ids as $items_id) {
            $this->update(array('flag' => contast_items::ITEMS_FLAG_NO), array('items_id' => $items_id));
        }

        return TRUE;
    }

    /**
     * 浏览hist+1
     *
     * @param $items_id
     *
     * @return bool
     */
    function viewItems($items_id)
    {
        return $this->update(array('hits' => 'hits + 1'), $items_id);
    }

    function mkdata($v)
    {
        return $data = array(
            'items_name'       => $v['items_name'],
            'items_pic'        => $v['items_pic'],
            'items_pic_thumbs' => $v['items_pic_thumbs'],
            'user_id'          => (int)$v['user_id'],
            'album_id'         => (int)$v['album_id'],
            'tag_ids'          => is_array($v['tag_ids']) ? implode(',', $v['tag_ids']) : $v['tag_ids'],
            'reply_hits'       => (int)$v['reply_hits'],
            'collect_hits'     => (int)$v['collect_hits'],
            'like_hits'        => (int)$v['like_hits'],
            'created_time'     => time(),
            'update_time'      => time(),
            'remark'           => $v['remark'],
            'txt_area'         => (int)$v['txt_area'],
            'pic_area'         => (int)$v['pic_area'],
            'is_cover'         => (int)$v['is_cover'],
            'flag'             => (int)$v['flag'] > 0 ? (int)$v['flag'] : contast_items::ITEMS_FLAG_YES,
        );
    }
}