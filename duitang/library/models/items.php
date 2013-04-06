<?php
/**
 * 图片
 * @author ciogao@gmail.com
 *
 */
class models_items extends Models
{
    private static $_instance = null;

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
        $this->_table = 'avi_items';
        $this->_primary = 'items_id';
    }

    /**
     * 首页获取图片
     */
    function getIndexItems(){
        $this->db->cache_on();
        return $this->getAll(array('items_id','items_name','items_pic','reply_hits','like_hits','remark'),
                                           array('flag' => contast_items::ITEMS_FLAG_YES),
                                           array('items_id' => 'asc')
        );
    }

    /**
     * 浏览hist+1
     *
     * @param $items_id
     *
     * @return bool
     */
    function viewItems($items_id){
        return $this->update(array('hits' => 'hits + 1'),$items_id);
    }

    function mkdata($v)
    {
        return $data = array(
            'items_name' => $v->test,
            'items_pic' => $v->test,
            'user_id' => $v->test,
            'class_id' => $v->test,
            'tag_ids' => $v->test,
            'reply_hits' => $v->test,
            'collect_hits' => $v->test,
            'like_hits' => $v->test,
            'created_time' => $v->test,
            'update_time' => $v->test,
            'remark' => $v->test,
        );
    }
}