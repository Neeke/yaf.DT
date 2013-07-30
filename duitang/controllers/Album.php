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

    public function init()
    {
        parent::init();
        $this->setaction('index');
        $this->model_Items = models_items::getInstance();
        $this->model_album = models_album::getInstance();
        $this->model_reply = models_reply::getInstance();
        $this->model       = models_user::getInstance();
    }

    public function indexAction()
    {
        $this->db->cache_on();
        $page    = (int)$this->getRequest()->getParam('p', 1);
        $classid = (int)$this->getRequest()->getParam('c', 0);
    }

    public function vAction()
    {
        $replys = array();

        $this->db->cache_on();
        $album_id   = (int)$this->getRequest()->getParam('a', 0);
        $album_info = $this->model_album->getRow('*', $album_id);
        $items      = $this->model_Items->getAll('*', array('album_id' => (int)$album_id));

        if (is_array($items) && count($items) > 1){
            foreach ($items as $v) {
                $replys[$v['items_id']] = $this->model_reply->getAllByItemId($v['items_id']);
            }
        }

        $this->db->cache_off();

        $this->set('album_info', $album_info);
        $this->set('items', $items);
        $this->set('replys', $replys);
        $this->set('userinfo_all', $this->model->getRow('*', $album_info['user_id']));
        $this->set('other_album_info',$this->model_album->myAlbum($album_info['user_id']));
    }


}
