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
        $this->_table   = 'avi_email_set';
        $this->_primary = 'id';
    }

    /**
     * 更新数据
     * @param $email_set
     * @return bool
     */
    function updateEmailSet($email_set)
    {
        if (!is_array($email_set) || count($email_set) < 1) return FALSE;

        $data = $this->mkdata($email_set);

        if ($this->exits(array('user_id' => $email_set['user_id']))) {
            return $this->update($data, array('user_id' => $email_set['user_id']));
        } else {
            return $this->insert($data);
        }
    }

    /**
     * 取得邮件设置
     * @param $user_id
     * @return array
     */
    function getEmailSet($user_id)
    {
        if ((int)$user_id < 1) return $this->mkdata();

        $set_info = $this->getRow('*',array('user_id' => $user_id));

        if (!is_array($set_info) || count($set_info) < 1) return $this->mkdata();

        return $set_info;
    }

    function mkdata($v = array())
    {
        return $data = array(
            'user_id'                => (int)$v['user_id'],
            'have_new_listen_me'     => (int)$v['have_new_listen_me'],
            'have_new_listen_album'  => (int)$v['have_new_listen_album'],
            'have_new_msg'           => (int)$v['have_new_msg'],
            'have_new_album_by_tag'  => (int)$v['have_new_album_by_tag'],
            'have_new_album_by_user' => (int)$v['have_new_album_by_user']
        );
    }
}