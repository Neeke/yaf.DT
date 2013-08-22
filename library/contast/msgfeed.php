<?php
/**
 * @author ciogao@gmail.com
 * Date: 13-7-21 下午3:59
 */
class contast_msgfeed
{
    const FEED_IS_READ_YES = 1;
    const FEED_IS_READ_NO  = 0;

    const FEEd_FLAG_DEFAULT = 0;
    const FEEd_FLAG_DELETE  = 1;

    const MSG_TEMPLATE_ALBUM_REPLY = '{0}在图集「<a href="{1}" target="_blank">{2}</a>」中回复了你';

    const MSG_TEMPLATE_USER_LISTEN = '「<a href="{0}" target="_blank">{1}</a>」最近关注了你';

    const MSG_TEMPLATE_AFTER_REG = '欢迎加入不要集！你可以在这里找到各种想看的美女图片，现在可以先「<a href="/explore">随便看看</a>」';

    const MSG_TEMPLATE_ALBUM_SHIELD = '很遗憾，你的图集「{0}」涉嫌违规已被管理员屏蔽';
}