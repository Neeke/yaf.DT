<?php
/**
 * 
 * @author ciogao@gmail.com
 *
 */
class AboutController extends Controller
{
	public function init() {
		parent::init();
		$this->setaction('about');
	}
	
	public function indexAction() {
		//加载模板;
	}
}