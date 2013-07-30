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
        $this->set('page_title', '做图集');
    }

    public function editalbumAction()
    {
        $album_id = $this->getRequest()->getParam('a',0);
        $this->setConfig(array('album_id' => $album_id));
    }
}