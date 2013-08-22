<?php
/**
 * feed
 * @author ciogao@gmail.com
 */
class models_smsfeed extends Models
{
    private static $_instance = NULL;

    /**
     * @return models_smsfeed
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
        $this->_table   = 'avi_msg_feed';
        $this->_primary = 'feed_id';
    }

    /**
     * 当前用户名下的feed列表
     * @param int $user_id
     * @param int $start
     * @param int $limit
     *
     * @return array
     */
    function myFeed($user_id = 0, $start = 0, $limit = contast_album::PAGE_SIZE_DEFAULT)
    {
        $this->db->cache_on(3600);
        if ((int)$user_id < 1) {
            $user_id  = $this->user_id;
        }

        $this->db->cache_key(contast_cacheKey::SMS_FEED_ALL.$user_id);
        $info = $this->getAll('*', array('isread' => contast_msgfeed::FEED_IS_READ_NO,'user_id_to' => $user_id), array('isread' => 'ASC', 'update_time' => 'DESC'), $start, $limit);

        foreach ($info as $k => $v) {
            $v['avatar']     = '/static/images/photo01.gif';
            $v['source_url'] = helper_common::site_url_user($v['user_id_from']);
            $info[$k]        = $v;
        }

        return $info;
    }

    /**
     * 创建一个feed
     *
     * @param $to_user_id
     * @param $content
     * @param $user_id
     * @return int
     */
    function createFeed($to_user_id, $content, $user_id = 0)
    {
        if ((int)$user_id < 1) {
            $user_id  = $this->user_id;
        }

        $rawData = array(
            'user_id_from' => $user_id,
            'user_id_to'   => $to_user_id,
            'content'      => $content,
        );

        $insertData = $this->mkdata($rawData);

        return $this->insert($insertData);
    }

    /**
     * feed read
     * @param $feed_id
     * @return bool
     *
     * @todo read const
     */
    function readFeed($feed_id)
    {
        $user_id  = $this->user_id;

        $this->db->getCache()->delete(contast_cacheKey::SMS_BUBBLES.$user_id);
        $this->db->getCache()->delete(contast_cacheKey::SMS_FEED_ALL.$user_id);
        $this->db->getCache()->delete(contast_cacheKey::SMS_FEED_INFO.$feed_id);

        return $this->update(array('isread' => contast_msgfeed::FEED_IS_READ_YES, 'update_time' => time()), array('feed_id' => $feed_id, 'user_id_to' => $user_id));
    }

    /**
     * 取得feed气泡
     * @param $user_id
     * @return int
     */
    function bubbles($user_id)
    {
        if ((int)$user_id < 1) {
            $user_id  = $this->user_id;
        }
        $this->db->cache_key(contast_cacheKey::SMS_BUBBLES.$user_id);
        return (int)$this->count(array('user_id_to' => $user_id, 'isread' => contast_msgfeed::FEED_IS_READ_NO));
    }

    /**
     * 评论数+1
     * @param $feed_id
     * @return array|bool|string
     */
    function sendSms($feed_id)
    {
        return $this->db->query('update ' . $this->_table . ' set msg_count = msg_count + 1,isread = ? where user_id_to = ? and feed_id = ?', array(contast_msgfeed::FEED_IS_READ_YES, $this->user_id, $feed_id));
    }

    function mkdata($v)
    {
        return $data = array(
            'user_id_from' => $v['user_id_from'],
            'user_id_to'   => $v['user_id_to'],
            'update_time'  => time(),
            'msg_count'    => 1,
            'content'      => $v['content'],
            'isread'       => contast_msgfeed::FEED_IS_READ_NO,
            'type'         => 0,
        );
    }
}