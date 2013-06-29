<?php
/**
 * Class UserController
 */
class UserController extends Controller
{

    public function init()
    {
        parent::init();
        $this->model = models_user::getInstance();
    }

    /**
     * 注册
     */
    public function regAction()
    {
        $this->rest->method('POST');

        $params                    = $this->getRequest()->getPost();
        $this->rest->paramsMustMap = array('email', 'pwd', 'user_name');
        $this->rest->paramsMustValid($params);

        if ($this->model->exits(array('user_email' => $params['email']))) {
            $this->rest->error(rest_Code::STATUS_SUCCESS_DO_ERROR_DB_REPEAT, 'email已存在');
        }

        if ($this->model->exits(array('user_name' => $params['user_name']))) {
            $this->rest->error(rest_Code::STATUS_SUCCESS_DO_ERROR_DB_REPEAT, '用户名已存在');
        }

        $data   = $this->model->mkdata($params);
        $result = $this->model->insert($data);

        if ($result == false) $this->rest->error(rest_Code::STATUS_SUCCESS_DO_ERROR);

        $this->rest->success('', rest_Code::STATUS_SUCCESS, '注册成功，请登录');
    }

    /**
     * 登录
     */
    public function loginAction()
    {
        $this->rest->method('POST');

        $params                    = $this->getRequest()->getPost();
        $this->rest->paramsMustMap = array('pwd', 'user_name');
        $this->rest->paramsMustValid($params);

        $result = $this->model->login($params['user_name'],$params['pwd']);
        if ($result == false) $this->rest->error(rest_Code::STATUS_SUCCESS_DO_ERROR_DB_NULL,'登录失败');

        $this->rest->success();
    }

    /**
     * 登出
     */
    public function logoutAction()
    {
        $this->rest->method('GET');
        $this->session->del('userinfo');
        $this->rest->success();
    }

}
