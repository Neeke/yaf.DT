<?php
/**
 * 分类
 * @author ciogao
 */
class models_class extends Models
{
    private static $_instance = NULL;

    /**
     * @return models_class
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
        $this->_table = 'avi_class';
        $this->_primary = 'cid';
    }

    /**
     * 获得所有默认分类
     * @return mixed
     */
    function getclass(){
        $this->db->cache_on();
        $classes = $this->db->getAll('select cid,class_name,parent_cid,pics_count from '.$this->_table.' where `type` = '.contast_class::CLASS_TYPE_CLASS.' order by parent_cid asc , '.$this->_primary.' asc');
        $this->db->cache_off();

        if (is_array($classes) && count($classes) > 0){
            foreach($classes as $v){
                if ($v['parent_cid'] == 0) $result[$v['cid']]['parent'] = $v;
                if (array_key_exists($v['parent_cid'],$result)) $result[$v['parent_cid']][] = $v;
            }
        }

        //@todo 计算结果$result入cache
        return $result;
    }

    function getClassById($id){
        $this->db->cache_on();
        $info = $this->db->getRow('select * from '.$this->_table.' where '.$this->_primary.' = ?',array($id));
        $this->db->cache_off();
        return $info;
    }

    function mkdata($value)
    {
        return $data = array(
            'class_name' => $value->cid,
            'parent_cid' => $value->parent_cid,
            'user_id' => $value->name,
            'tag_ids' => $value->pic_url,
            'pics_count' => $value->sort_order,
            'type' => $value->type,
            'created_time' => time(),
        );
    }
}