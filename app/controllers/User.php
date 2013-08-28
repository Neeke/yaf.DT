<?php
/**
 * 用户接口
 * @author ciogao@gmail.com
 *
 */
class UserController extends Controller
{
    /**
     * @var  models_album
     */
    private $model_album;

    public function init()
    {
        parent::init();
        $this->model       = models_user::getInstance();
        $this->model_album = models_album::getInstance();
    }

    /**
     * 查看其他用户
     */
    public function indexAction()
    {
        $this->set('page_title', '个人设置');
    }


}