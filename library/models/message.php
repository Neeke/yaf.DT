<?php
/**
 * 消息
 * @author ciogao@gmail.com
 *
 */
class models_message extends Models
{
    private static $_instance = NULL;

    /**
     * @return models_message
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
        $this->_table = 'avi_message';
        $this->_primary = 'mid';
    }

    /**
     * 获取所有msg
     * @return array|bool
     */
    function getAllＭsg()
    {
        $this->db->cache_on();
        $back = $this->db->getAll('select * from ' . $this->_table);
        if (is_array($back) && count($back) > 0) {
            return $back;
        }
        return FALSE;
    }

    /**
     * 获取所有卖家taobao_user_id列表
     * @return array|bool
     */
    function getAllSellersIds()
    {
        $this->db->cache_on();
        $back = $this->db->getAll('select taobao_user_id from ' . $this->_table);
        if (is_array($back) && count($back) > 0) {
            return $back;
        }
        return FALSE;
    }
}