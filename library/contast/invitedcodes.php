<?php
/**
 * @author ciogao@gmail.com
 * Date: 13-7-30 下午8:18
 */
class contast_invitedcodes
{
    const CODES_FLAG_USED = 1;

    const CODES_FLAG_NOT_USED = 0;

    /**
     * 每次可生成多少个邀请码
     */
    const CODES_EVERY_MAKE_COUNT = 5;

    /**
     * 邀请码长度
     */
    const CODES_STR_LEN = 15;

    /**
     * 邀请码有效期为一周
     */
    const CODES_LIFE_CYCLE = 604800;
}