<?php
class TestController extends Controller
{
	
	public function init(){
		parent::init();
	}
	
	public function indexAction(){

		$this->quantity->config(10,10,rest_Quantity::CONFIG_IP);
		$this->quantity->check('appkey');

		die;
	}
	
	public function testAction(){
		$a = get_object_vars($this->rest);
		var_dump($a);

		
		var_dump(get_class_methods($this->rest));
		debug_print_backtrace();
		die;
	}
	
	public function logtestAction(){
		$loger = Log_Logger::instance();
		
		$log = __FUNCTION__.' | '.'logtest';
		$loger->setPath('paipai');
// 		$loger->setLog('test');
		$loger->info($log);
		$loger->warn($log);
		$loger->error($log);
		die;
	}
}