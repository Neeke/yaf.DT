<?php
class TestController extends Controller
{
	
	public function init(){
		parent::init();
	}
	
	public function indexAction(){
		$post = $this->getRequest()->getPost();
		$this->quantity->config(10,10,rest_Quantity::CONFIG_IP);
		$this->quantity->check('appkey');
		
		die;
	}
	
	public function testBAction(){
        echo '<pre>';
		$a = get_object_vars($this->rest);
		var_dump($a);

		
		var_dump(get_class_methods($this->rest));
		debug_print_backtrace();
		die;
	}
	
	public function aaAction(){
		var_dump($this->_request);
	}
}