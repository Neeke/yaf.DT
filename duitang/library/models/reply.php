<?php
/**
 *
 * 回复
 * @author firefly
 *
 */
class models_reply extends Models
{
    private static $_instance = NULL;

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
        $this->_table = 'avi_reply';
        $this->_primary = 'reply_id';
    }

    function mkdata($tem)
    {
        return $data = array(
            'items_id' => $tem->test,
            'user_id' => $tem->test,
            'p_reply_id' => $tem->test,
            'content' => $tem->test,
            'dateline' => time(),
        );
    }
}