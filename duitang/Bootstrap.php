<?php
class Bootstrap extends Yaf_Bootstrap_Abstract{
	public function _initSession($dispatcher) {
		/*
		 * start a session 
		 */
		Yaf_Session::getInstance()->start();
	}

	public function _initConfig() {
		$config = Yaf_Application::app()->getConfig();
		Yaf_Registry::set("config", $config);
	}
	
	public function _initXhprof(Yaf_Dispatcher $dispatcher){
		$if_xhprof = Yaf_Registry::get("config")->get('xhprof')->get('open');
		$if_xhprof = isset($if_xhprof) && (int)$if_xhprof > 0 ? 'open' : 'close';

		if ($if_xhprof == 'open') {
			$xhprof = new xhprofPlugin();
			$dispatcher->registerPlugin($xhprof);
		}
	}

// 	public function _initPlugin(Yaf_Dispatcher $dispatcher) {
// 		$user = new UserPlugin();
// 		$dispatcher->registerPlugin($user);
// 	}

// 	public function _initRoute(Yaf_Dispatcher $dispatcher) {
// 		//echo "_initRoute call second<br/>\n";
// 		$router = Yaf_Dispatcher::getInstance()->getRouter();
// 		/**
// 		 * add the routes defined in ini config file
// 		 */
// 		$router->addConfig(Yaf_Registry::get("config")->routes);
// 		/**
// 		 * test this route by access http://yourdomain.com/product/list/?/?/
// 		 */
// 		$route  = new Yaf_Route_Rewrite(
// 			"/product/list/:id/:name",
// 			array(
// 				"controller" => "product",
// 				"action"	 => "info",
// 			)
// 		);

// 		$router->addRoute('dummy', $route);
// 	}

	public function _initDefaultName(Yaf_Dispatcher $dispatcher) {
		/**
		 * actully this is unecessary, since all the parameters here is the default value of Yaf
		 */
		$dispatcher->setDefaultModule("Index")->setDefaultController("Index")->setDefaultAction("index");
	}
	
	public function _initDb(){
          db_contect::db();
	}
}
