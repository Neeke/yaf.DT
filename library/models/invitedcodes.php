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
        $time = time();
        for ($i = 0; $i < contast_invitedcodes::CODES_EVERY_MAKE_COUNT; $i++) {
            $codes[$i]['code_value'] = helper_string::rand_string(contast_invitedcodes::CODES_STR_LEN);
            $codes[$i]['create_time'] = $time;
        }

        foreach ($codes as $v) {
            $data = array(
                'user_id'     => $user_id,
                'code_value'  => $v['code_value'],
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
        $this->db->cache_on(1);
        return $this->getAll(array('code_value','create_time','flag'), array('user_id' => $user_id),array('code_id' => 'DESC'),0,5);
    }

    /**
     * 使某用户的所有邀请码过期
     * @param $user_id
     * @return bool
     */
    public function expiredAllCodes($user_id)
    {
        return $this->update(array('flag' => contast_invitedcodes::CODES_FLAG_USED),array('flag' => contast_invitedcodes::CODES_FLAG_NOT_USED,'user_id' => $user_id));
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
        $info = $this->getRow('flag,create_time',array('code_value' => $codes));
        if ($info)
        {
            $flag = $info['flag'];
            $time = $info['create_time'];
            if ($flag == contast_invitedcodes::CODES_FLAG_NOT_USED && $time > time() - contast_invitedcodes::CODES_LIFE_CYCLE){
                return TRUE;
            }
        }

        return FALSE;
    }

    public function mkdata($v)
    {
        return $data = array(
            'user_id'     => $v['user_id'],
            'code_value'  => $v['code_value'],
            'create_time' => time(),
            'update_time' => 0,
            'flag'        => array_key_exists('flag', $v) ? $v['flag'] : contast_invitedcodes::CODES_FLAG_NOT_USED,
        );
    }
}