<?php
/**
 * 首页
 */
class LoginController extends Controller {

	public function indexAction() {

        /**
         * 如果目前正在登录状态
         */
        if ($this->user_id) {
            $this->redirect(helper_common::site_url('explore'));
        }

        /**
         * 根据cookie自动登录
         */
        $keey_login_result = helper_keepLogin::getKeepLogin();
        if ($keey_login_result) {
            $this->redirect(helper_common::site_url('explore'));
        }

        $this->setMenu('login');
	}

    /**
     * 登出
     */
    public function outAction(){
        $this->rest->method('GET');
        $this->session->del('userinfo');
        setcookie('userinfo', '', time()-1, '/');
        $this->redirect(helper_common::site_url('login'));
    }
}
