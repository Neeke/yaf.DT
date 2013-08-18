<?php
/**
 * Class NewController
 * @author ciogao@gmail.com
 */
class NewController extends Controller
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
        $this->setMenu('new');


        $my_albums = $this->model_album->newAlbum();
        $this->set('myalbums', $my_albums);
    }

}
