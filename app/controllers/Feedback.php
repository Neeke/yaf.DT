<?php
/**
 * Class NewController
 * @author pjn
 */
class FeedbackController extends Controller
{

    public function init()
    {
        parent::init();
    }

    public function indexAction()
    {
        $this->setMenu('feedback/index');
        $this->set('page_title', '提问与建议');
    }

}
