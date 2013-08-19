<?php
/**
 * @author ciogao@gmail.com
 * Date: 13-7-19 下午9:39
 */
class contast_user
{
    const GENDER_MAN   = 1;
    const GENDER_WOMAN = 2;

    const IS_VIP_YES = 1;
    const IS_VIP_NO  = 0;

    const IS_ADMIN_YES = 1;
    const IS_ADMIN_NO  = 0;

    const GROUP_SEMPLE_1  = 0;
    const GROUP_VIP_1     = 10;
    const GROUP_VIP_2     = 11;
    const GROUP_COMPANY_1 = 20;
    const GROUP_COMPANY_2 = 21;
    const GROUP_ADMIN_1   = 90;

    /**
     * 取得所有用户角色配置
     * @return array
     */
    static public function groupConfig()
    {
        return array(
            self::GROUP_SEMPLE_1  => array(
                'album_make' => 5, //可创建图集数
                'tag_listen' => 10, //可收听tag数
                'cost'       => 0, //年价值
                'coupon'     => 0, //月赠券
            ),
            self::GROUP_VIP_1     => array(
                'album_make' => 15,
                'tag_listen' => 30,
                'cost'       => 60,
                'coupon'     => 10,
            ),
            self::GROUP_VIP_2     => array(
                'album_make' => 30,
                'tag_listen' => 30,
                'cost'       => 100,
                'coupon'     => 10,
            ),
            self::GROUP_COMPANY_1 => array(
                'album_make' => 30,
                'tag_listen' => 30,
                'cost'       => 300,
                'coupon'     => 100,
            ),
            self::GROUP_COMPANY_2 => array(
                'album_make' => 60,
                'tag_listen' => 30,
                'cost'       => 500,
                'coupon'     => 100,
            ),
        );
    }

    /**
     * 取得某用户角色配置
     * @param $group_id
     * @return bool
     */
    static public function getGroupConfig($group_id)
    {
        $groupConfig = self::groupConfig();
        if (array_key_exists($group_id, $groupConfig)) return $groupConfig[$group_id];
        return FALSE;
    }
}