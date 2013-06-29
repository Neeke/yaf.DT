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

    /**
     * 获取所有tag
     * @return array|bool|string
     */
    function getTags(){
        $this->db->cache_on();
        $tags = $this->db->getAll('select * from '.$this->_table.' order by '.$this->_primary.' desc');
        $this->db->cache_off();
        return $tags;
    }

    /**
     * 根据user_id获取tag，默认user_id为0(系统定义标签)
     * @param int $user_id
     * @return array|bool|string
     */
    function getTagsByUser($user_id = 0){
        $this->db->cache_on();
        $tags = $this->db->getAll('select * from '.$this->_table.' where user_id = ? order by '.$this->_primary.' asc',array((int)$user_id));
        $this->db->cache_off();
        return $tags;
    }

    /**
     * 根据ids获取tag  1,2,3
     * @param $ids
     * @return array|bool|string
     */
    function getTagByIds($ids){
        $this->db->cache_on();

        if (count(explode(',',$ids)) < 2){
            $info = $this->db->getRow('select * from '.$this->_table.' where '.$this->_primary.' = ?',array($ids));
        }else{
            $info = $this->db->getAll('select * from '.$this->_table.' where '.$this->_primary.' in ('.$ids.')');
        }

        $this->db->cache_off();
        return $info;
    }

    /**
     * 根据tag名获取tag
     * @param $tag
     * @return array|bool|string
     */
    function getTagIdByTag($tag){
        $this->db->cache_on();
        $info = $this->db->getRow('select * from '.$this->_table.' where tag = ?',array($tag));
        $this->db->cache_off();
        return $info;
    }

    /**
     * 根据id获取tag名
     * @param $id
     * @return mixed
     */
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