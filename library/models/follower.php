<?php
/**
 * 用户关注
 * @author ciogao@gmail.com
 *
 */
class models_follower extends Models
{
    private static $_instance = NULL;

    /**
     * @return models_follower
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
        parent::__construct('user');
        $this->_table   = 'avi_follower';
        $this->_primary = 'fid';

        $this->getUser();
    }

    /**
     * 检查是否已关注
     * @param $user_id
     * @return array|bool
     */
    public function ifFollow($user_id)
    {
        $this->db->cache_off();
        return $this->exits(array(
            'from_user_id' => $this->user_id,
            'to_user_id'   => $user_id,
            'flag'         => contast_follower::FLAG_DEFAULT)
        );
    }

    /**
     * 关注用户
     * @param $user_id
     * @return array|bool|string
     */
    public function follow($user_id)
    {
        $data = $this->mkdata(array(
            'from_user_id' => $this->user_id,
            'to_user_id'   => $user_id,
        ));

        $this->db->getCache()->delete(contast_cacheKey::FOLLOWER_INFO . $this->user_id.'_0');
        return $this->insert($data);
    }

    /**
     * 取消关注
     * @param $user_id
     * @return bool
     */
    public function unFollow($user_id)
    {
        $data = array(
            'flag' => contast_follower::FLAG_DELETE,
        );

        $where = array(
            'from_user_id' => $this->user_id,
            'to_user_id'   => $user_id,
        );

        $this->db->getCache()->delete(contast_cacheKey::FOLLOWER_INFO . $this->user_id.'_0');
        return $this->update($data, $where);
    }

    /**
     * 我关注的用户count
     * @return array
     */
    public function myFollowersCount()
    {
        $this->db->cache_off();
        return $this->count(array('from_user_id' => $this->user_id, 'flag' => contast_follower::FLAG_DEFAULT));
    }

    /**
     * 我关注的用户
     * @param int $start
     * @param int $limit
     * @return array|bool
     */
    public function myFollowers($start = 0, $limit = contast_follower::PAGE_SIZE_DEFAULT)
    {
        $this->db->cache_key(contast_cacheKey::FOLLOWER_INFO . $this->user_id.'_'.$start);
        return $this->getAll('*', array('from_user_id' => $this->user_id, 'flag' => contast_follower::FLAG_DEFAULT),'', $start, $limit);
    }

    public function mkdata($v)
    {
        return array(
            'from_user_id' => $v['from_user_id'],
            'to_user_id'   => $v['to_user_id'],
            'create_time'  => time(),
            'flag'         => contast_follower::FLAG_DEFAULT,
        );
    }

}