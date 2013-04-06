<?php

/**
 * 订单脚本
 * @author ciogao@gmail.com
 *
 */
class OrderController extends Controller{
	public function init(){
		parent::init();
	}
	
	function indexAction(){
		var_dump($_SERVER);
		die;
	}

    /**
     * 统计某卖家名下所有买家订单的信息
     * 包括拍下次数，应付金额，实付金额，买家评论次数，卖家回评次数
     * ＠todo 多卖家
     */
    function tradescustomAction()
    {
//        $this->tokenModel = models_token::getInstance();
//        $a = $this->tokenModel->getAllSellersIds();

        $this->tradesModel = models_trades::getInstance();
        $where = array(
            'taobao_user_id' => 57584464,
        );
        $a = $this->tradesModel->getTradesBuyer($where);
        var_dump($a);
        die;
    }
}