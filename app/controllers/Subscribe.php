<?php
/**
 * @author ciogao@gmail.com
 *         Class SubscribeController
 */
class SubscribeController extends Controller
{
    /**
     * @var models_album
     */
    private $model_album;

    /**
     * @var models_albumListen
     */
    private $model_album_listen;

    private $page;

    public function init()
    {
        parent::init();
        $this->model_album        = models_album::getInstance();
        $this->model_album_listen = models_albumListen::getInstance();
        $this->model              = models_user::getInstance();
    }

    /**
     * 设置已经收听的album
     */
    private function setListededAlbumIds()
    {
        $this->set('listened_album_ids',$this->model_album_listen->myListenedAlbumIds($this->user_id));
    }

    /**
     * 我的订阅
     */
    public function indexAction()
    {
        $this->setMenu('subscribe');

        $this->page = (int)$this->getRequest()->getParam('p', 1);
        $my_albums  = $this->model_album_listen->myListenedAlbum($this->user_id, ($this->page - 1) * contast_album::PAGE_SIZE_DEFAULT);

        $count = $this->model_album_listen->count(array('user_id' => $this->user_id,'flag' => contast_album::FLAG_DEFAULT));
        $sPage = helper_pages::page2(helper_common::site_url('album/listened'), $count, contast_album::PAGE_SIZE_DEFAULT, $this->page);
        $this->set('sPage', $sPage);
        $this->set('myalbums', $my_albums);

        $this->setListededAlbumIds();
    }
}
