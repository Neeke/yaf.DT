<?php
/**
 * 用户接口
 * @author Firefly
 *
 */
class UserController extends Controller
{
	public function init(){
		parent::init();
		$this->model = new models_user();
	}
	
	
	public function loginAction(){
		$username = $this->getRequest()->getPost('email');
		$pwd = md5($this->getRequest()->getPost('pwd'));
		$b = $this->model->is_user($username, $pwd);
		if ($b == FALSE) {
			$this->forward('notlogin',array('error' => '没有此用户'));
		}else{
			$session = Yaf_Session::getInstance();
			$session->username = $username;
			$this->redirect('/test/admin');
		}
		Yaf_Dispatcher::getInstance()->disableView();
	}
	
	public function notloginAction(){
		helper_common::msg($this->getRequest()->getParam('error'));
	}
	
	public function loginoutAction(){
		$session = Yaf_Session::getInstance();
		$session->del('id');$session->del('userinfo');
		$this->redirect(helper_common::site_url('index'));
	}
	
}