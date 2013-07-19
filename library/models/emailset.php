<?php
/**
 * 邮件订阅
 * @author ciogao@gmail.com
 */
class models_emailset extends Models
{
    private static $_instance = NULL;

    /**
     * @return models_emailset
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
        $this->_table = 'avi_email_set';
        $this->_primary = 'id';
    }

    /**
     * 更新数据
     * @param $email_set
     * @return bool
     */
    function updateEmailSet($email_set){
        if (!is_array($email_set) || count($email_set) < 1) return FALSE;

        $data = $this->mkdata($email_set);

        if ($this->exits(array('user_id' => $email_set['user_id']))) {
            return $this->update($data,array('user_id' => $email_set['user_id']));
        }else{
            return $this->insert($data);
        }
    }

    function mkdata($v)
    {
        return $data = array(
            'user_id' => $v['user_id'],
            'have_new_listen_me' => $v['have_new_listen_me'],
            'have_new_listen_album' => $v['have_new_listen_album'],
            'have_new_msg' => $v['have_new_msg'],
            'have_new_album_by_tag' => $v['have_new_album_by_tag'],
            'have_new_album_by_user' => $v['have_new_album_by_user']
        );
    }
}