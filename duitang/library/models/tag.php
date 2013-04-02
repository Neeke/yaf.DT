<?php
/**
 * tag
 * @author ciogao
 */
class models_tag extends Models
{
    private static $_instance = NULL;

    /**
     * @return models_tag
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
        $this->_table = 'avi_tag';
        $this->_primary = 'tid';
    }

    function getTags(){
        $this->db->cache_on();
        $classes = $this->db->getAll('select * from '.$this->_table.' order by '.$this->_primary.' desc');
        $this->db->cache_off();
        return $classes;
    }

    function getTagById($id){
        $this->db->cache_on();
        $info = $this->db->getRow('select * from '.$this->_table.' where '.$this->_primary.' = ?',array($id));
        $this->db->cache_off();
        return $info;
    }

    function getTagIdByTag($tag){
        $this->db->cache_on();
        $info = $this->db->getRow('select * from '.$this->_table.' where tag = ?',array($tag));
        $this->db->cache_off();
        return $info;
    }

    function getTag($id){
        $this->db->cache_on();
        $info = $this->db->getRow('select * from '.$this->_table.' where '.$this->_primary.' = ?',array($id));
        $this->db->cache_off();
        return $info['tag'];
    }

    function mkdata($value)
    {
        return $data = array(
            'user_id' => $value->user_id,
            'tag' => $value->tag,
        );
    }
}