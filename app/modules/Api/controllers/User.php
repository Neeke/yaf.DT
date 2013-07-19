<?php
/**
 * Class UserController
 */
class UserController extends Controller
{

    /**
     * @var models_user
     */
    public $model;

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

        if ($result == FALSE) $this->rest->error(rest_Code::STATUS_SUCCESS_DO_ERROR);

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

        $result = $this->model->login($params['user_name'], $params['pwd']);
        if ($result == FALSE) $this->rest->error(rest_Code::STATUS_SUCCESS_DO_ERROR_DB_NULL, '登录失败');

        $this->rest->success();
    }

    /**
     * 个人设置
     */
    public function setAction()
    {
        $this->rest->method('POST');
        $params                   = $this->getRequest()->getPost();
        $this->rest->paramsCanMap = array('email', 'pwd', 'avatar', 'gender', 'email_set');
        $this->rest->paramsMustValid($params);

        /**
         * 更新email
         */
        if (array_key_exists('email',$params)){

        }

        if (array_key_exists('pwd',$params)){

        }

        if (array_key_exists('avatar',$params)){

        }

        if (array_key_exists('gender',$params)){

        }

        if (array_key_exists('email_set',$params)){

        }

        $this->rest->success('','','修改成功');
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
