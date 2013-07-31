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

    public function init()
    {
        parent::init();
        $this->model_album = models_album::getInstance();
    }

    public function indexAction()
    {
        $this->setMenu('hot');

        $my_albums = $this->model_album->hotAlbum();
        $this->set('myalbums', $my_albums);
    }
}
