<?php
/**
 * REST
 * @author ciogao@gmail.com
 * 
 * demo
 * 		$this->rest = rest_Server::instance();
 * 		$this->rest->method('POST');
 * 		$this->rest->paramsMustMap = array('username','pwd');
 * 		$this->rest->paramsMustValid($_POST);
 * 		$this->data = do_some_data_model();
 * 			if ($this->data == FALSE) {
 * 				$this->rest->error('',rest_Code::STATUS_SUCCESS_DO_ERROR_DB);
 * 			}
 * 		$this->rest->success($this->data);
 */
class rest_Server {

	public $format = 'JSON';

	private $data = array();
	private $status = 0;
	private $msg = null;
	
	private $status_msgs = null;	
	
	/**
	 * @var rest_Server
	 */
	private static $self=null;
	
	/**
	 * @static
	 * @return rest_Server
	 */
	public static function instance(){
		if (self::$self == null){
			self::$self = new self;
		}
		return self::$self;
	}

	protected function __construct(){
		$this->status_msgs = rest_Code::getCodes();
	}

	
	/**
	 * 成功执行
	 * @param array $data
	 * @param int $status
	 * @param string $msg
	 */
	public function success($data,$status = rest_Code::STATUS_SUCCESS,$msg = NULL){
		self::baseResponse($data, $status, $msg);
	}
	
	/**
	 * 出现错误
	 * @param array $data
	 * @param int $status
	 * @param string $msg
	 */
	public function error($data,$status = rest_Code::STATUS_ERROR,$msg = NULL){
		self::baseResponse($data, $status, $msg);
	}
	
	private function baseResponse($data,$status,$msg){
// 		self::checkMethod();
		$this->data = (array)$data;
		$this->status = (int)$status;
		$this->msg = (string)(
				($msg == NULL && isset($this->status_msgs[$status]))
				? $this->status_msgs[$status]
				: $msg
				);
		unset($data);
		self::mkheader();
		self::mkdata();	
	}
	
	/**
	 * 设置返回资源类型
	 */
	private function mkheader(){
		switch ($this->format){
			case 'JSON':
				$header = 'application/json';
				break;
			case 'XML':
				$header = 'application/xml';
				break;
			default:
				$header = 'application/json';
		}

		header("Content-type: $header");
	}
	
	/**
	 *　依资源类型,加工返回数据
	 */
	private function mkdata() {
		switch ($this->format){
			case 'JSON':
				self::byJson();
				break;
			case 'XML':
				self::byXml();
				break;
			default:
				self::byJson();
		}
	}
	
	private function byJson(){
		echo json_encode(array(
				'code' => $this->status,
				'msg' => $this->msg,
				'data' => $this->data
		));
		die;
	}
	
	private function byXml(){
		$xml = "<?xml version='1.0' encoding='utf-8'?>";
		$xml = '<xml>';
		$xml .= "<code>{$this->status}</code>";
		$xml .= "<msg>{$this->msg}</msg>";
		$xml .= '<data>';
		
		$xml .= self::toXml($this->data);
		
		$xml .= '</data>';
		$xml .= '</xml>';
		echo $xml;
		die;
	}
}