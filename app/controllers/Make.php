<?php
/**
 *
 * @author pangjn
 *
 */
class MakeController extends Controller
{
    public function init()
    {
        parent::init();
    }

    public function indexAction()
    {

    }

    public function albumAction()
    {
        $this->setMenu('make/album');
        $this->set('page_title', '做图集');
    }

    public function editalbumAction()
    {
        $this->setMenu('make/album');
        $album_id = $this->getRequest()->getParam('a',0);
        $this->setConfig(array('album_id' => $album_id));
    }
}