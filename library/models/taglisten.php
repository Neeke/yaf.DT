<?php
/**
 * tag model
 * @author ciogao@gmail.com
 */
class models_taglisten extends Models
{
    private static $_instance = NULL;

    /**
     * @return models_taglisten
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
        $this->_table = 'avi_tag_listen';
        $this->_primary = 'id';
    }

    /**
     * 获取所有tag
     * @return array|bool|string
     */
    function getAllListened(){
        $this->db->cache_on();
        $tags = $this->db->getAll('select * from '.$this->_table.' order by '.$this->_primary.' desc');
        $this->db->cache_off();
        return $tags;
    }

    /**
     * 根据user_id获取tag
     * @param int $user_id
     * @return array|bool|string
     */
    function getTagsListenedByUser($user_id = 0){
        $this->db->cache_on();

        $sql = 'select t.tid,t.tag from '.$this->_table.' listened
                left join '.models_tag::getInstance()->_table.' t on
                t.tid = listened.tag_id
                where listened.user_id = ? order by '.$this->_primary.' asc';

        $tags = $this->db->getAll($sql,array((int)$user_id));
        $this->db->cache_off();
        return $tags;
    }

    function mkdata($value)
    {
        return $data = array(
            'user_id' => $value['user_id'],
            'tag_id' => $value['tag_id'],
            'dateline' => time(),
        );
    }
}