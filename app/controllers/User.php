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
     * 个人设置
     */
    public function setAction()
    {
        $this->set('userinfo_all', $this->model->getUserInfoAll());
        $this->set('albums', $this->model_album->myAlbum());
    }


}