<?php
/**
 * 用户
 * @author Firefly
 *
 */
class models_user extends Models
{
    private static $_instance = NULL;

    /**
     * @return models_user
     */
    final public static function getInstance()
    {
        if (!isset(self::$_instance) || !self::$_instance instanceof self) {
            self::$_instance = new self;
        }
        return self::$_instance;
    }

    function __construct()
    {
        parent::__construct();
        $this->_table = 'avi_user';
        $this->_primary = 'user_id';
    }

    /**
     * 检查该用户是否合法用户
     * @param string $username
     * @param string $pwd
     * @return false || array
     */
    function is_user($username, $pwd)
    {
        $sql = 'select ' . $this->_primary . ' from ' . $this->_table . ' where user_name = ? and pwd = ?';
        $a = $this->db->getOne($sql, array($username, $pwd));
        return $a;
    }

    /**
     * 获取已经登录的用户信息
     */
    public function getUserInfo()
    {
        $s = Yaf_Session::getInstance();
        if ($s->has('userinfo')) {
            $userinfo = $s->get('userinfo');
            $array['user_id'] = $userinfo['user_id'];
            $array['user_name'] = $userinfo['user_name'];
            return $array;
        }
        return FALSE;
    }

    /**
     * 登录
     * @todo 非法检测 非空检测
     * @param $user_id
     * @return boolean
     */
    public function login($user_id)
    {
        $this->db->cache_off();
        $a = $this->db->getRow('select * from ' . $this->_table . ' where ' . $this->_primary . ' = ?', array($user_id));
        $session = Yaf_Session::getInstance();
        $session->userinfo = $a;
        return TRUE;
    }

    public function mkdata($v)
    {
        return array(
            'email' => $v->test,
            'user_name' => $v->test,
            'pwd' => $v->test,
            'remark' => $v->test,
            'created_time' => time(),
        );
    }

}