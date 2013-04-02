<?php
/**
 * Ap定义了如下的7个Hook,
 * 插件之间的执行顺序是先进先Call
 */
class UserPlugin extends Yaf_Plugin_Abstract {

	/**
	 * 这个是7个事件中, 最早的一个. 但是一些全局自定的工作, 还是应该放在Bootstrap中去完成
	 * @see Yaf_Plugin_Abstract::routerStartup()
	 */
	public function routerStartup(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response) {
		//echo "Plugin routerStartup called <br/>\n";
		//echo "Request with base uir:" . $request->getBaseUri() . "<br/>\n";
		//echo "Request with request uri:" .$request->getRequestUri() . "<br/>\n";
	}

	/**
	 * 此时路由一定正确完成, 否则这个事件不会触发
	 * @see Yaf_Plugin_Abstract::routerShutdown()
	 */
	public function routerShutdown(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response) {
		//echo "Plugin routerShutdown called <br/>\n";
		//echo "Request routed result:" ;
		//print_r($request);
		//echo "<br/>\n";
		//echo "Functional route:" . Yaf_Dispatcher::getInstance()->getRouter()->getCurrentRoute();
		//echo "<br/>\n";
	}

	public function dispatchLoopStartup(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response) {
		//echo "Plugin DispatchLoopStartup called <br/>\n";
	}

	/**
	 * 如果在一个请求处理过程中, 发生了forward, 则这个事件会被触发多次
	 * @see Yaf_Plugin_Abstract::preDispatch()
	 */
	public function preDispatch(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response) {
		//echo "Plugin PreDispatch called <br/>\n";
	}

	/**
	 * 此时动作已经执行结束, 视图也已经渲染完成. 和preDispatch类似, 此事件也可能触发多次
	 * @see Yaf_Plugin_Abstract::postDispatch()
	 */
	public function postDispatch(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response) {
		//echo "Plugin postDispatch called <br/>\n";
	}

	/**
	 * 此时表示所有的业务逻辑都已经运行完成, 但是响应还没有发送
	 * @see Yaf_Plugin_Abstract::dispatchLoopShutdown()
	 */
	public function dispatchLoopShutdown(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response) {
		//echo "Plugin DispatchLoopShutdown called <br/>\n";
	}

	public function preResponse(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response) {
		//echo "Plugin PreResponse called <br/>\n";
		//echo "Response is ready to send<br/>\n";
	}

}
