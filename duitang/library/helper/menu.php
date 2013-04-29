<?php
/**
 * 目录
 * @todo 存库
 * @author ciogao@gmail.com
 *
 */
class helper_menu {
	private static $_menu = array(
			'首页' => 'index',
			'分类' => 'group',
			'热门' => 'top',
			'周边' => 'periphery',
			'推广' => 'mission',
			'关于' => 'about',
			'Api' => 'api',
			);
	
	static public function get_menu(){
		return self::$_menu;
	}
}