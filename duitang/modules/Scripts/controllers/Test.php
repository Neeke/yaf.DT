<?php

/**
 * 订单脚本
 * @author ciogao@gmail.com
 *
 */
class TestController extends Controller{
	public function init(){
		parent::init();
	}
	
	function indexAction(){

        for($i = 1;$i < 1000000; $i++){
            $this->db->insert('test',
                $data = array(
                    'a_id' => rand(1,9),
                    'key_id' => rand(90,900),
                    'key_value' => 'test',
                ));
        }
        die;
	}
}