<?php
/**
 * Class WhatsController
 * @author ciogao@gmail.com
 */
class WhatsController extends Controller
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

    public function hotAction()
    {
        $this->setMenu('whats/hot');

        $my_albums = $this->model_album->hotAlbum();
        $this->set('myalbums', $my_albums);
    }

    public function newAction()
    {
        $this->setMenu('whats/new');


        $my_albums = $this->model_album->hotAlbum();
        $this->set('myalbums', $my_albums);
    }

}
