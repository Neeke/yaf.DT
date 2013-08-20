<?php
/**
 * msg
 * @author ciogao@gmail.com
 */
class models_msg extends Models
{
    private static $_instance = NULL;

    /**
     * @return models_msg
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
        $this->_table   = 'avi_msg';
        $this->_primary = 'msg_id';
    }

    /**
     * 当前用户名下的专辑
     * @param int $user_id
     * @param int $feed_id
     * @param int $start
     * @param int $limit
     *
     * @return array
     */
    function getMsgsByFeedid($user_id = 0, $feed_id = 0, $start = 0, $limit = contast_album::PAGE_SIZE_DEFAULT)
    {
        $this->db->cache_on(3600);
        if ((int)$user_id < 1) {
            $user_id = $this->user_id;
        }
        $info = $this->getAll('*', array('feed_id' => $feed_id), '', $start, $limit);

        if (!is_array($info) || count($info) < 1) return FALSE;

        if ($info[0]['user_id_from'] != $user_id && $info[0]['user_id_to'] != $user_id) return FALSE;

        foreach ($info as $k => $v) {
            $v['avatar']     = '/static/images/photo01.gif';
            $v['source_url'] = helper_common::site_url_user($v['user_id_from']);
            $info[$k]        = $v;
        }

        return $info;
    }


    /**
     * ＠todo 返回格式化 user_id_to
     *
     * @param $feed_id
     * @param $user_id_to
     * @param $content
     * @return bool
     */
    function send($feed_id, $user_id_to, $content)
    {
        $user_id = $this->user_id;

        $data = array(
            'feed_id'      => $feed_id,
            'user_id_from' => $user_id,
            'user_id_to'   => $user_id_to,
            'content'      => $content,
            'dateline'     => time(),
        );

        $this->db->getCache()->delete(contast_cacheKey::SMS_FEED_ALL.$user_id);
        return $this->insert($data);
    }

    function mkdata($v)
    {
        return $data = array(
            'feed_id'      => $v['feed_id'],
            'user_id_from' => $v['user_id_from'],
            'user_id_to'   => $v['user_id_to'],
            'content'      => $v['content'],
            'dateline'     => time(),
        );
    }
}