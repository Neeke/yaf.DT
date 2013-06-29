<?php
/**
 * 用户
 * @author ciogao@gmail.com
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
        $this->_table   = 'avi_user';
        $this->_primary = 'user_id';
    }

    /**
     * 检查该用户是否合法用户
     * @param string $username
     * @param string $pwd
     *
     * @return false || array
     */
    function is_user($username, $pwd)
    {
        $sql = 'select ' . $this->_primary . ' from ' . $this->_table . ' where user_name = ? and pwd = ?';
        $a   = $this->db->getOne($sql, array($username, $pwd));
        return $a;
    }

    /**
     * 获取已经登录的用户信息
     */
    public function getUserInfo()
    {
        $s = Yaf_Session::getInstance();
        if ($s->has('userinfo')) {
            $userinfo           = $s->get('userinfo');
            $array['user_id']   = $userinfo['user_id'];
            $array['user_name'] = $userinfo['user_name'];
            return $array;
        }
        return FALSE;
    }

    /**
     * 登录
     * @todo     非法检测 非空检测
     *
     * @param $user_name
     * @param $pwd
     *
     * @return boolean
     */
    public function login($user_name, $pwd)
    {
        $this->db->cache_off();
        $aResult = $this->db->getRow('select * from ' . $this->_table . ' where user_name = ? and user_pwd = ?', array($user_name, md5($pwd)));
        if ($aResult == FALSE) return FALSE;

        $session           = Yaf_Session::getInstance();
        $session->userinfo = $aResult;
        return TRUE;
    }

    /**
     * 相册总数加１
     * @return bool
     */
    public function addalbum()
    {
        $userinfo = $this->getUserInfo();
        $this->db->query('update '.$this->_table.' set album_count = album_count + 1 where user_id = ?', array($userinfo['user_id']));
        return TRUE;
    }

    /**
     * 收藏总数加１
     * @return bool
     */
    public function addcollect()
    {
        $userinfo = $this->getUserInfo();
        $this->db->query('update '.$this->_table.' set collect_count = collect_count + 1 where user_id = ?', array($userinfo['user_id']));
        return TRUE;
    }

    public function mkdata($v)
    {
        return array(
            'user_email'    => $v['email'],
            'user_name'     => $v['user_name'],
            'user_pwd'      => md5($v['pwd']),
            'remark'        => $v['remark'],
            'follower_count'  => $v['follower_count'],
            'items_count'   => $v['items_count'],
            'collect_count' => $v['collect_count'],
            'album_count'   => $v['album_count'],
            'interest_count'   => $v['interest_count'],
            'created_time'  => time(),
        );
    }

}