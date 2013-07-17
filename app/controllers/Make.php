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

    }

    public function editalbumAction()
    {
        $album_id = $this->getRequest()->getParam('a',0);
        $this->set('config',array('album_id' => $album_id));

    }
}