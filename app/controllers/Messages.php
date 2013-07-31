<?php
/**
 * 
 * @author pjn
 *
 */
class MessagesController extends Controller
{
	public function init() {
		parent::init();
	}

    public function indexAction() {
        $this->setMenu('messages/index');
        $this->set('page_title', '消息');
    }
}