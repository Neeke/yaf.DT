<?php
/**
 * 首页
 */
class LoginController extends Controller {

	public function indexAction() {

	}

    /**
     * 登出
     */
    public function outAction(){
        $this->rest->method('GET');
        $this->session->del('userinfo');
        $this->redirect(helper_common::site_url('login'));
    }
}
