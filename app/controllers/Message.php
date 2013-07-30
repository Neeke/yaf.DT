<?php
/**
 * 
 * @author pjn
 *
 */
class MessageController extends Controller
{
	public function init() {
		parent::init();
	}

    public function indexAction() {
        $this->set('page_title', '消息');
    }
}