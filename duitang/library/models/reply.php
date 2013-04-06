<?php
/**
 *
 * 回复
 * @author ciogao@gmail.com
 *
 */
class models_reply extends Models
{
    private static $_instance = null;

    /**
     * @return models_reply
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
        $this->_table   = 'avi_reply';
        $this->_primary = 'reply_id';
    }

    /**
     * @param $item_id
     * @param $limit
     *
     * @return array
     */
    function getAllByItemId($item_id,$limit = 2)
    {
        $this->db->cache_on();
        return $this->getAll('*',
            array('items_id' => (int)$item_id),
            array('reply_id' => 'desc'),
            0,$limit
        );
    }

    /**
     * @param $item_ids
     *
     * @return array
     */
    function getAllByItemIds($item_ids)
    {
        $this->db->cache_on();
        return $this->getAll('*',
            array('items_id' => $item_ids),
            array('reply_id' => 'desc')
        );
    }

    function mkdata($tem)
    {
        return $data = array(
            'items_id'   => $tem->test,
            'user_id'    => $tem->test,
            'p_reply_id' => $tem->test,
            'content'    => $tem->test,
            'dateline'   => time(),
        );
    }
}