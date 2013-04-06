<?php
/**
 * 用户接口
 * @author ciogao@gmail.com
 *
 */
class UserController extends Controller
{
	public function init(){
		parent::init();
		$this->model = new models_user();
	}


	
}