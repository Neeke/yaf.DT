<?php
/**
 * 短链接口信息
 * @author ciogao@gmail.com
 *
 */
class ApishortController extends Controller {

	const SHORTURL_BASE = 'http://www.dido.cc/';
	const SHORTURL_TOKEN = 'from_Dido.cc';
	
	const SET_COUNT_MAX = 30;
	const SET_TIME_UNIT = 30;
	
	const STATUS_COUNT_MAX = 30;
	const STATUS_TIME_UNIT = 30;
	
	public function init() {
		parent::init();
		$this->model = moduls_short_modul::getInstance();
	}

	/**
	 * 设置短链
	 */
	public function setAction(){
		$this->check->method('POST');
		
		$post = $this->getRequest()->getPost();
		$this->check->paramsMustMap = array('token','url');
		$this->check->paramsMustValid($post);
		
		if ($post['token'] != md5(session_id())) {
			$this->rest->error('',rest_Code::STATUS_ERROR_API_VALIDE_TOKEN);
		}
		
		if (preg_match('/^http(s?):\/\//', $post['url']) != 1) {
			$this->rest->error('',rest_Code::STATUS_ERROR_API_VALIDE,'源链接地址不正确');
		}
		
		$this->appkey = $post['token'];
		$this->quantity->config(self::SET_COUNT_MAX,self::SET_TIME_UNIT,rest_Quantity::CONFIG_KEY_AND_IP);
		$this->quantity->check($this->appkey.__FUNCTION__);
		
		$data['shorturl'] = self::SHORTURL_BASE.$this->model->setUrl($post['url']);
		if ($data['shorturl'] == FALSE) {
			$this->rest->error('',rest_Code::STATUS_SUCCESS_DO_ERROR_DB);
		}
		
		$this->rest->success($data);
	}
	
	/**
	 * 取得短链并返回 
	 */
	public function getAction(){
		$this->check->method('POST');
		
		$post = $this->getRequest()->getPost();
		$this->check->paramsMustMap = array('token','key');
		$this->check->paramsMustValid($post);
		
		if ($post['token'] != self::SHORTURL_TOKEN) {
			$this->rest->error('',rest_Code::STATUS_ERROR_API_VALIDE_TOKEN);
		}
		
		$c = new helper_clientinfo();
		$data = array(
				'ua' => $post['ua']?$post['ua']:$c->user_agent(),
				'referer' => $post['referer']?$post['referer']:$c->referer(),
				'ip' => $post['ip']?$post['ip']:$c->getIP(),
				'dateline' => time(),
		);
		$urlinfo = $this->model->getUrl($post['key'],$data);
		
		if ($urlinfo == FALSE) {
			$this->rest->error('',rest_Code::STATUS_SUCCESS_DO_ERROR_DB);
		}
		
		$this->rest->success($urlinfo);
	}
	
	/**
	 * 取得短链统计信息
	 */
	public function statusAction(){
		$this->check->method('GET');
		
		$get = $this->getRequest()->getQuery();
		$this->check->paramsMustMap = array('token','url');
		$this->check->paramsMustValid($get);
		
		if ($get['token'] != md5(session_id())) {
			$this->rest->error('',rest_Code::STATUS_ERROR_API_VALIDE_TOKEN);
		}
		
		$url = explode(self::SHORTURL_BASE, $get['url']);
				
		if ($url[0] == $get['url']) {
			$this->rest->error('',rest_Code::STATUS_SUCCESS_DO_ERROR_DB,'短链错误');
		}
		
		$this->appkey = $get['token'];
		$this->quantity->config(self::STATUS_COUNT_MAX,self::STATUS_TIME_UNIT,rest_Quantity::CONFIG_KEY_AND_IP);
		$this->quantity->check($this->appkey.__FUNCTION__);

		$urlinfo = $this->model->getUrlStatus($url[1]);
		
		if ($urlinfo == FALSE) {
			$this->rest->error('',rest_Code::STATUS_SUCCESS_DO_ERROR_DB);
		}
		
		$this->rest->success($urlinfo);
	}
}