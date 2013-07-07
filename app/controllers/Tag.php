<?php
/**
 * 热门
 */
class TagController extends Controller {

	public function init() {
		parent::init();
	}

	public function mineAction() {
        $this->setMenu('tag/mine');
	}

}
