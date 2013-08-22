<?php
/**
 * @author pjn
 */
class AccountController extends Controller
{
    public function init()
    {
        parent::init();
    }

    public function indexAction()
    {
        $this->setMenu('account/index');
        $this->set('page_title', '账户');
    }
}
