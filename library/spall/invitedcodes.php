<?php
/**
 * @author ciogao@gmail.com
 * Date: 13-8-5 上午12:23
 */
class spall_invitedcodes
{

    /**
     * 是否已使用
     * @param $flag
     * @return string
     */
    static function getIfUsed($flag)
    {
        switch ($flag){
            case contast_invitedcodes::CODES_FLAG_USED:
                $str = '已使用';
                break;
            case contast_invitedcodes::CODES_FLAG_NOT_USED:
                $str = '未使用';
                break;
        }

        return $str;
    }

    /**
     * 获得邀请码过期时间
     * @param $create_time
     * @return int
     */
    static function getLifeCycle($create_time)
    {
        $cycle_time = (int)$create_time + contast_invitedcodes::CODES_LIFE_CYCLE;
        return $cycle_time;
    }
}