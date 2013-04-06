<?php
/**
 * 
 * @author ciogao@gmail.com
 *
 */
class models_collect extends Models
{
	private static $_instance = NULL;
		
	/**
	 * @return models_collect
	 */
	final public static function getInstance(){
        if (!isset(self::$_instance) || !self::$_instance instanceof self) {
            self::$_instance = new self;
        }
        return self::$_instance;
	}
	
	function __construct() {
		parent::__construct();
		$this->_table = 'avi_collect';
		$this->_primary = 'id';
	}

    public function mkdata($v){
		return $data = array(
				'user_id' => $v->test,
                'album_id' => $v->test,
				'items_id' => $v->test,
                'flag' =>  $v->test,
		);
	}
}