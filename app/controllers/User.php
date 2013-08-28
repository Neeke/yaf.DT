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

    private $this_user_id;

    public function init()
    {
        parent::init();
        $this->model       = models_user::getInstance();
        $this->model_album = models_album::getInstance();

        $this->this_user_id = (int)$this->getRequest()->getActionName();
        $this->getRequest()->setActionName('index');
    }

    /**
     * 查看其他用户
     */
    public function indexAction()
    {
        $user_info = models_user::getInstance()->getUserInfoAll($this->this_user_id);

        spall_title::setPageTitle($user_info['user_name']);

        $this->setMenu('user/index');

        $this->page = (int)$this->getRequest()->getParam('p', 1);
        $my_albums  = $this->model_album->myAlbum($this->this_user_id, ($this->page - 1) * contast_album::PAGE_SIZE_DEFAULT);

        $count = $this->model_album->count(array('user_id' => $this->this_user_id, 'flag' => contast_album::FLAG_DEFAULT));

        $sPage = helper_pages::page2(helper_common::site_url('user/'.$this->this_user_id), $count, contast_album::PAGE_SIZE_DEFAULT, $this->page);
        $this->set('sPage', $sPage);
        $this->set('myalbums', $my_albums);
        $this->set('countAlbums',intval($count));

        $this->set('user_id',$user_info['user_id']);
        $this->set('userinfo',$user_info);

        $this->set('ifFollow',models_follower::getInstance()->ifFollow($this->this_user_id));

    }


}