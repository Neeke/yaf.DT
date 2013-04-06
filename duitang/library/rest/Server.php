<?php
/**
 * REST
 * @author ciogao@gmail.com
 *
 * demo
 *        $this->rest = rest_Server::instance();
 *        $this->rest->method('POST');
 *        $this->rest->paramsMustMap = array('username','pwd');
 *        $this->rest->paramsMustValid($_POST);
 *        $this->data = do_some_data_model();
 *            if ($this->data == FALSE) {
 *                $this->rest->error('',rest_Code::STATUS_SUCCESS_DO_ERROR_DB);
 *            }
 *        $this->rest->success($this->data);
 */
class rest_Server
{

    public $format = 'JSON';
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

    private $haveCheckedMethod = false;
    private $haveValidedMustParams = false;
    private $haveValidedCanParams = false;

    private $method_ = 'GET';
    private $data = array();
    private $status = 0;
    private $msg = null;

    private $status_msgs = null;

    /**
     * @var rest_Server
     */
    private static $self = null;

    /**
     * @static
     * @return rest_Server
     */
    public static function instance()
    {
        if (self::$self == null) {
            self::$self = new self;
        }
        return self::$self;
    }

    protected function __construct()
    {
        $this->status_msgs = rest_Code::getCodes();
    }

    /**
     * 检测必须存在的参数是否合法　少一不可
     * @param array $data
     */
    public function paramsMustValid($data)
    {
        $this->paramsMustToValid = $data;
        self::validMustParams();
    }

    /**
     * 检测某些参数是否在可供访问的参数列表内　不可超出
     * @param array $data
     */
    public function paramsCanValid($data)
    {
        $this->paramsCanToValid = $data;
        self::validCanParams();
    }

    /**
     * 设置method,同时检测
     *
     * @param string $method
     */
    public function method($method = 'GET')
    {
        if ($method !== 'GET') {
            $this->method_ = $method;
        }
        self::checkMethod();
    }

    /**
     * 成功执行
     * @param array  $data
     * @param int    $status
     * @param string $msg
     */
    public function success($data, $status = rest_Code::STATUS_SUCCESS, $msg = null)
    {
        self::baseResponse($data, $status, $msg);
    }

    /**
     * 出现错误
     * @param array  $data
     * @param int    $status
     * @param string $msg
     */
    public function error($data, $status = rest_Code::STATUS_ERROR, $msg = null)
    {
        self::baseResponse($data, $status, $msg);
    }

    /**
     * 检查method是否正确
     */
    private function checkMethod()
    {
        $method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';
        if ($this->haveCheckedMethod == false && $method != $this->method_) {
            $this->haveCheckedMethod = true;
            self::error('', rest_Code::STATUS_ERROR_METHOD);
        }
    }

    /**
     * 检查必须存在的params是否在合法范围　少一不可
     * @todo 添加合法化验证　目前只是检测是否存在
     */
    private function validMustParams()
    {
        foreach ($this->paramsMustMap as $v) {
            if ($this->haveValidedMustParams == false && !isset($this->paramsMustToValid[$v])) {
                $this->haveValidedMustParams = true;
                self::error('api needs param ' . $v, rest_Code::STATUS_ERROR_PARAMS);
            }
        }
    }

    /**
     * 检查params是否在可供访问的列表内　　不可超出范畴
     */
    private function validCanParams()
    {
        foreach ($this->paramsCanToValid as $k => $v) {
            if ($this->haveValidedCanParams == false && !in_array($v, $this->paramsCanMap)) {
                $this->haveValidedCanParams == true;
                self::error('the param ' . $v . ' can not in', rest_Code::STATUS_ERROR_PARAMS);
            }
        }
    }

    private function baseResponse($data, $status, $msg)
    {
        self::checkMethod();
        $this->data   = (array)$data;
        $this->status = (int)$status;
        $this->msg    = (string)(
        ($msg == null && isset($this->status_msgs[$status]))
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
    private function mkheader()
    {
        switch ($this->format) {
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
    private function mkdata()
    {
        switch ($this->format) {
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

    private function byJson()
    {
        echo json_encode(array(
            'code' => $this->status,
            'msg'  => $this->msg,
            'data' => $this->data
        ));
        die;
    }

    private function byXml()
    {
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

    private function toXml($data)
    {
        $xml = '';
        if (!is_array($data)) {
            return $data;
        }
        else {
            foreach ($data as $key => $value) {
                $xml .= "<$key>";
                if (is_array($value)) {
                    self::toXml($value);
                }
                else {
                    $xml .= "$value";
                }
                $xml .= "</$key>";
            }
            return $xml;
        }

    }
}