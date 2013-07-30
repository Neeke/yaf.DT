<?php
/**
 * @author ciogao@gmail.com
 *         Class ItemsController
 */
class JustlookController extends Controller
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

    /**
     * ＠todo 更好的随机算法　与tag_listened关联
     */
    public function indexAction()
    {
        $this->db->cache_on();

        $this->setMenu('justlook');
        $this->setListededAlbumIds();

        $my_albums = $this->model_album->justlook();

        $this->set('myalbums', $my_albums);
    }

}
