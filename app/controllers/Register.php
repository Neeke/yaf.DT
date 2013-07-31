<?php
/**
 * 
 * @author ciogao@gmail.com
 *
 */
class RegisterController extends Controller
{
	public function init() {
		parent::init();
	}

    public function indexAction() {
        $this->setMenu('register');
    }

    public function listentagAction() {
        $this->setMenu('register/listentag');
    }
}