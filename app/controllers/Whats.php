<?php
/**
 * Class WhatsController
 * @author ciogao@gmail.com
 */
class WhatsController extends Controller
{
    public function init()
    {
        parent::init();
    }

    public function hotAction()
    {
        $this->setMenu('whats/hot');
    }

    public function newAction()
    {
        $this->setMenu('whats/new');
    }

}
