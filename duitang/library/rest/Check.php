<?php
/**
 * REST检测
 * @author ciogao@gmail.com 
 *
 */
class rest_Check
{
	function __construct(){
		$this->rest = rest_Server::instance();
	}
	
	/**
	 * @var Check
	 */
	private static $self=null;
	
	/**
	 * @static
	 * @return Check
	 */
	public static function instance(){
		if (self::$self == null){
			self::$self = new self;
		}
		return self::$self;
	}
	
	/**
	 * 必须具备的参数列表 少一不可
	 * @var array
	 */
	public $paramsMustMap = array();
	private $paramsMustToValid = array();
	
	/**
	 * 可供选择的参数列表　不可超出范围
	 * @var array
	*/
	public $paramsCanMap = array();
	private $paramsCanToValid = array();
	
	private $haveCheckedMethod = FALSE;
	private $haveValidedMustParams = FALSE;
	private $haveValidedCanParams = FALSE;
	
	private $method_ = 'GET';
	
	/**
	 * 检测必须存在的参数是否合法　少一不可
	 * @param array $data
	 */
	public function paramsMustValid($data){
		$this->paramsMustToValid = $data;
		self::validMustParams();
	}
	
	/**
	 * 检测某些参数是否在可供访问的参数列表内　不可超出
	 * @param array $data
	 */
	public function paramsCanValid($data){
		$this->paramsCanToValid = $data;
		self::validCanParams();
	}

	/**
	 * 设置method,同时检测
	 * @param string $method
	 */
	public function method($method = 'GET'){
		if ($method !== 'GET') {
			$this->method_ = $method;
		}
		self::checkMethod();
	}
	
	/**
	 * 检查method是否正确
	 */
	private function checkMethod(){
		$method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';
		if ($this->haveCheckedMethod == FALSE && $method != $this->method_) {
			$this->haveCheckedMethod = TRUE;
			$this->rest->error('', rest_Code::STATUS_ERROR_METHOD);
		}
	}
	
	/**
	 * 检查必须存在的params是否在合法范围　少一不可
	 * @todo 添加合法化验证　目前只是检测是否存在
	 */
	private function validMustParams(){
		foreach ($this->paramsMustMap as $v){
			if ($this->haveValidedMustParams == FALSE && !isset($this->paramsMustToValid[$v])) {
				$this->haveValidedMustParams = TRUE;
				$this->rest->error('api needs param '.$v,rest_Code::STATUS_ERROR_PARAMS_MUST);
			}
		}
	}
	
	/**
	 * 检查params是否在可供访问的列表内　　不可超出范畴
	 */
	private function validCanParams(){
		foreach ($this->paramsCanToValid as $k => $v){
			if ($this->haveValidedCanParams == FALSE && !in_array($v, $this->paramsCanMap)) {
				$this->haveValidedCanParams == TRUE;
				$this->rest->error('the param '.$v.' can not in',rest_Code::STATUS_ERROR_PARAMS_CAN);
			}
		}
	}
	
	/**
	 * 检查ID与密钥是否匹配
	 * @param string $client_id
	 * @param string $security
	 * @return boolean
	 */
	function security($client_id, $security){
		if ($client_id == 1 && $security == 'aa') {
			return true;
		}
		$this->rest->error('',rest_Code::STATUS_ERROR_API_VALIDE_AUTH);
	}
	
	function token(){ }

}