<?php

/**
 * 订单脚本
 * @author ciogao@gmail.com
 *
 */
class ExcelController extends Controller{
    private $excel;

	public function init(){
		parent::init();

        $this->excel = $_SERVER['argv'][2];
        if (empty($this->excel)) {
            throw new Exception('$excel is empty, it`s will be like "/var/ciogao/aa.xls"');
        }
	}
	
	function indexAction(){

        $data = new helper_Excel_reader();
        $data->setOutputEncoding('utf-8');
        $data->read($this->excel);

        $array_data = array();
//        echo '<pre>';
//        exit(print_r($data->sheets[0]));
        for ($i = 1; $i <= $data->sheets[0]['numRows']; $i++) {
            for ($j = 1; $j <= $data->sheets[0]['numCols']; $j++) {
                $array_data[] = $data->sheets[0]['cells'][$i][$j];
            }
        }
        foreach ($array_data as $email) {
            if (!empty($email)){
                $pwd = md5($email);
                $sql = "insert into avi_user(is_vip,user_email,user_pwd) values (1,'{$email}','{$pwd}')";
                $this->db->query($sql);
            }
        }
        echo '<pre>';
        exit(var_dump('done!'));
        die;
	}
}