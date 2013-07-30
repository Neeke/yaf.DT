<?php
/**
 *
 * @author ciogao@gmail.com
 *
 */
class models_invitedcodes extends Models
{
    private static $_instance = NULL;

    /**
     * @return models_invitedcodes
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
        $this->_table   = 'avi_invited_codes';
        $this->_primary = 'code_id';
    }

    /**
     * 生成邀请码
     * @param $user_id
     * @return array
     */
    public function createCodes($user_id)
    {
        $codes = array();
        for ($i = 0; $i < 5; $i++) {
            $codes[] = helper_string::rand_string(15);
        }

        $time = time();
        foreach ($codes as $v) {
            $data = array(
                'user_id'     => $user_id,
                'code_value'  => $v,
                'create_time' => $time
            );

            $this->insert($data);
            unset($data);
        }

        return $codes;
    }

    /**
     * 查看邀请码
     * @param $user_id
     * @return array
     */
    public function showCodes($user_id)
    {
        $this->db->cache_on();
        return $this->getAll(array('code_value','create_time'), array('user_id' => $user_id, 'flag' => contast_invitedcodes::CODES_FLAG_NOT_USED));
    }

    /**
     * 使用一个邀请码
     * @param $codes
     * @return bool
     */
    public function usedCodes($codes)
    {
        $update = array(
            'update_time' => time(),
            'flag'        => contast_invitedcodes::CODES_FLAG_USED
        );
        $where  = array(
            'code_value' => $codes,
            'flag'       => contast_invitedcodes::CODES_FLAG_NOT_USED
        );
        return $this->update($update, $where);
    }

    /**
     * 检测是否存在该邀请码
     * @param $codes
     * @return array|bool
     */
    public function checkCodes($codes)
    {
        return $this->exits(array('code_value' => $codes,'flag' => contast_invitedcodes::CODES_FLAG_NOT_USED));
    }

    public function mkdata($v)
    {
        return $data = array(
            'user_id'     => $v['user_id'],
            'code_value'  => $v['code_value'],
            'create_time' => time(),
            'update_time' => 0,
            'flag'        => array_key_exists('flag', $v) ? $v['flag'] : 0,
        );
    }
}