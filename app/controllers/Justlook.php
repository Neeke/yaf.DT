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
    private $model_Items;

    /**
     * @var models_album
     */
    private $model_album;

    public function init()
    {
        parent::init();
        $this->model_album = models_album::getInstance();
        $this->model       = models_user::getInstance();

        $this->page    = (int)$this->getRequest()->getParam('p', 1);
    }

    public function indexAction()
    {
        $this->db->cache_on();

        $this->setMenu('justlook');

        $my_albums = $this->model_album->myAlbum(1);

        $sPage = helper_pages::page1('/',30,6,$this->page);
        $this->set('sPage', $sPage);
        $this->set('myalbums', $my_albums);
    }

}
