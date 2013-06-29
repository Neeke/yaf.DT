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

    public function myAction()
    {
        $this->setaction();
        $user_id = (int)$this->getRequest()->getParam('u', 0);

        $this->set('userinfo_all', $this->model->getRow('*', $user_id));
        $this->set('albums', $this->model_album->myAlbum());

    }


}