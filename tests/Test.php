<?php

require_once 'PHPUnit/Framework/TestCase.php';
require_once '../duitang/library/rest/Client.php';

/**
 * test case.
 */
class Test extends PHPUnit_Framework_TestCase {

    protected $a = null;
    /**
     * @var rest_Client
     */
    protected $c = null;

    protected $token = null;
	/**
	 * Prepares the environment before running a test.
	 */
	protected function setUp() {
		parent::setUp ();
		$this->a = 'a';
		$this->c = rest_Client::instance();
	}
	
	/**
	 * Cleans up the environment after running a test.
	 */
	protected function tearDown() {
		// TODO Auto-generated Test::tearDown()
		parent::tearDown ();
	}
	
	/**
	 * Constructs the test case.
	 */
	public function __construct() {
		// TODO Auto-generated constructor
	}
	
	/**
	 */
	public function A(){
		$this->assertEquals('a', $this->a);
		
		$data = array(
				'param1' => 'test',
				'param2' => 'test',
				);
		
		$this->c->method = 'GET';
		$this->c->data($data);
		$this->c->api = 'http://tbbundlesina.weiboyi.com/tbapp/apilist/demand';
		$this->c->go();
		$body = $this->c->getBody();
		var_dump($body);
	}
	
	/**
	 */
	public function B(){
		$a = 'https://www.taobao.com/asdf';
		$b = 'http://www.taobao.com';
		
		$pattern_1 = '/^http(s?):\/\//';
		$pattern_2 = '/^http:\/\/*taobao.com/';
		
		
		$status_1 = preg_match($pattern_1, $a);
		$status_2 = preg_match($pattern_1, $b);
		
		
		$status_3 = strpos($a, 'tmall.com');
		
		var_dump($status_1);
		var_dump($status_2);
		var_dump($status_3);
	}
	
	
	/**
	 */
	public function C(){
		if (self::c_1() != 'c_1_'
			|| self::c_2() != 'c_2'
			|| self::c_3() != 'c_3'	
				) {
			var_dump('asdf');
		}
	}
	
	function c_1(){
		echo 'c_1';
		return 'c_1';
	}
	function c_2(){
		echo 'c_2';
		return 'c_2';
	}
	function c_3(){
		echo 'c_3';
		return 'c_3';
	}
	
	
	/**
	 * 访问频次测试
	 */
	function quantity(){
		$data = array(
				'appkey' => 'test',
		);
		
		$this->c->method = 'POST';
		$this->c->data($data);
		$this->c->api = 'http://doyaf.sinaapp.com/test/test/index';
		$this->c->go();
		$body = $this->c->getBody();
		var_dump($body);
	}
	
	
	/**
	 * auth接口
	 */
	function auth(){
		$this->c->api = 'http://doyaf.sinaapp.com/api/oauth/token';
		$this->c->data(array('appkey' => '1','security' => 'aa'));
		$this->c->go();
		var_dump($this->c->getBody());die;
		$back = json_decode($this->c->getBody(),TRUE);
		$this->token = $back['data']['token'];
		var_dump($back);die;
	}
	
	/**
	 * @test
	 */
	function modified(){
// 		self::auth();
		$this->c->api = 'http://doyaf.sinaapp.com/test/apishort/set';
		$data = array(
				'token' => $this->token,
				'url' => 'http://www.a.com',
				);
		$this->c->data($data);
		$this->c->method = 'GET';
		$this->c->go();
		
		var_dump($this->c->getHeader());
		var_dump($this->c->getBody());
	}
	
}

