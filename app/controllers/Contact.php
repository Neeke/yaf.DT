<?php
/**
 * Class NewController
 * @author pjn
 */
class ContactController extends Controller
{

    public function init()
    {
        parent::init();
    }

    public function indexAction()
    {
        $this->setMenu('contact/index');
        $this->set('page_title', '联系我们');
    }

}
