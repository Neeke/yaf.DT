<?php
/**
 * Class HotController
 * @author ciogao@gmail.com
 */
class HotController extends Controller
{
    /**
     * @var models_album
     */
    private $model_album;

    /**
     * @var models_albumListen
     */
    private $model_album_listen;

    public function init()
    {
        parent::init();
        $this->model_album        = models_album::getInstance();
        $this->model_album_listen = models_albumListen::getInstance();
    }

    /**
     * 设置已经收听的album
     */
    private function setListededAlbumIds()
    {
        $this->set('listened_album_ids', $this->model_album_listen->myListenedAlbumIds($this->user_id));
    }

    public function indexAction()
    {
        $this->setMenu('hot');

        $my_albums = $this->model_album->hotAlbum();
        $this->set('myalbums', $my_albums);
        $this->setListededAlbumIds();
    }
}
