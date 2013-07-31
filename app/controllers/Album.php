<?php
/**
 * @author ciogao@gmail.com
 *         Class ItemsController
 */
class AlbumController extends Controller
{

    /**
     * @var models_album
     */
    private $model_Items;

    /**
     * @var models_album
     */
    private $model_album;

    /**
     * @var models_reply
     */
    private $model_reply;

    /**
     * @var models_albumListen
     */
    private $model_album_listen;

    private $page;

    public function init()
    {
        parent::init();
        $this->model_Items        = models_items::getInstance();
        $this->model_album        = models_album::getInstance();
        $this->model_album_listen = models_albumListen::getInstance();
        $this->model_reply        = models_reply::getInstance();
        $this->model              = models_user::getInstance();
    }

    public function indexAction()
    {
        $this->db->cache_on();
    }

    /**
     * 设置已经收听的album
     */
    private function setListededAlbumIds()
    {
        $this->set('listened_album_ids',$this->model_album_listen->myListenedAlbumIds($this->user_id));
    }

    /**
     * 我的相册
     */
    public function mineAction()
    {
        $this->setMenu('album/mine');

        $this->page = (int)$this->getRequest()->getParam('p', 1);
        $my_albums  = $this->model_album->myAlbum($this->user_id, ($this->page - 1) * contast_album::PAGE_SIZE_DEFAULT);

        $count = $this->model_album->count(array('user_id' => $this->user_id));

        $sPage = helper_pages::page2(helper_common::site_url('album/mine'), $count, contast_album::PAGE_SIZE_DEFAULT, $this->page);
        $this->set('sPage', $sPage);
        $this->set('myalbums', $my_albums);

        $this->setListededAlbumIds();
    }

    /**
     * 浏览相册
     */
    public function vAction()
    {
        $replys = array();

        $this->db->cache_on();
        $album_id   = (int)$this->getRequest()->getParam('a', 0);
        $this->model_album->viewAlbum($album_id);

        $album_info = $this->model_album->getRow('*', $album_id);
        $items      = $this->model_Items->getAll('*', array('album_id' => (int)$album_id,'flag' => contast_items::ITEMS_FLAG_YES));
        $userinfo   = $this->model->getRow('user_name,user_id', $album_info['user_id']);

//
//        if (is_array($items) && count($items) > 1){
//            foreach ($items as $v) {
//                $replys[$v['items_id']] = $this->model_reply->getAllByItemId($v['items_id']);
//            }
//        }
//        $this->set('replys', $replys);

        $this->db->cache_off();

        $this->set('album_info', $album_info);
        $this->set('items', $items);

        $this->set('userinfo', $userinfo);
    }


}
