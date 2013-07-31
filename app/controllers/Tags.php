<?php
/**
 * 热门
 */
class TagsController extends Controller {

	public function init() {
		parent::init();
	}

	public function mineAction() {
        $this->setMenu('tags/mine');
	}

}
