<?php
/**
 * @author ciogao@gmail.com
 *
 */
class SettingsController extends Controller
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
    public function indexAction()
    {
        $this->setMenu('settings/index');
        $this->set('userinfo_all', $this->model->getUserInfoAll());
        $this->set('albums', $this->model_album->myAlbum());
        $this->set('page_title', '个人设置');
    }

    public function confirmationAction() {
        if (!spall_user::isConfirmMation()){
            $this->redirect('settings');
        }

        $this->setMenu('settings/confirmation');
        $this->set('page_title', '用户确认');
    }
}