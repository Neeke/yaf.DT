<?php
/**
 * Controller base
 * @author ciogao@gmail.com
 *
 */
class Controller extends Yaf_Controller_Abstract {
    /**
     * @var Models
     */
    public $model;
    /**
     * @var db_Mysql
     */
    public $db ;
	public $meta;

	protected $appconfig = array();
	protected $userinfo = array();
    protected $modules = array();
	
	/**
	 * @var rest_Server
	 */
	protected $rest;
	
	/**
	 * @var rest_Check
	 */
	protected $check;
	
	/**
	 * @var rest_Quantity
	 */
	protected $quantity;
	
	/**
	 * @var rest_Modified
	 */
	protected $modified;

    /**
     * @var Yaf_Session
     */
    protected $session;

    /**
     * @var rest_Mkdata
     */
    protected $mkData;

	function init(){
		$this->userinfo = models_user::getInstance()->getUserInfo();
        $this->modules = explode(',',Yaf_Registry::get("config")->get('yaf')->get('modules'));

        self::check_login();

		$this->db = db_contect::db();
		$this->setmeta();
 		$this->check = rest_Check::instance();
 		$this->quantity = rest_Quantity::instance();
		$this->rest = rest_Server::instance();
 		$this->modified = rest_Modified::instance();
        $this->session = Yaf_Session::getInstance();
        $this->mkData = rest_Mkdata::instance();

		$this->appconfig = Yaf_Registry::get("config")->get('taobaoapp')->toArray();
	}

    /**
     * 检测状态
     */
    private function check_login(){
        $this->set('userinfo',$this->userinfo);
        if ($this->userinfo == FALSE
            && !($this->_request->module == 'Index' && $this->_request->controller == 'Index' && $this->_request->action == 'index')
            && !in_array($this->_request->module, $this->modules)
        ) {
            $this->redirect('/index');
        }
    }

	/**
	 * 设置menu的active状态
	 * @param string $action
	 */
	function setMenu($action = '/'){
		$this->set('this_menu',$action);
	}
	
	/**
	 * 取得meta值
	 */
	private function getmeta(){
		$this->db->cache_on(5000);
		$query = 'select * from yaf_config';
		$a = $this->db->getRow($query);
		$this->db->cache_off();
		$this->meta = $a;
	}
	
	/**
	 * 设置meta值
	 */
	private function setmeta(){
		self::getmeta();
		$this->set('title', $this->meta['title']);
		$this->set('proname', $this->meta['proname']);
		$this->set('webroot', $this->meta['webroot']);
	}

    /**
     * 设置变量到模板
     * @param $key
     * @param string $val
     */
    public function set($key, $val=''){
		$this->getView()->assign($key, $val);
	}
	
	
	function __destruct(){
        if ($this->db){
            $this->db->close();
        }
	}
}