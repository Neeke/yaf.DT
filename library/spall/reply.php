<?php
class spall_reply
{

    /**
     * 格式化相册评论
     * @param $reply_list
     * @return mixed
     */
    static public function mkDataForAlbumReply($reply_list)
    {
        foreach ($reply_list as $k => $v) {
            $v['avatar']     = spall_user::getAvatarUrl($v['user_id_from']);
            $v['source_url'] = helper_common::site_url_user($v['user_id_from']);
            $v['dateline']   = date('Y/m/d H:i:s', $v['dateline']);
            $v['content']    = spall_user::getUserName($v['user_id_from']) . ': ' . $v['content'];
            $reply_list[$k]  = $v;
        }

        return $reply_list;
    }

    /**
     * 格式化消息列表
     * @param $sms_list
     * @return mixed
     */
    static public function mkDataForSmsList($sms_list)
    {
        foreach ($sms_list as $k => $v) {
            $v['avatar']     = spall_user::getAvatarUrl($v['user_id_from']);
            $v['source_url'] = helper_common::site_url_user($v['user_id_from']);

            if (array_key_exists('dateline', $v)) $v['dateline'] = date('Y/m/d H:i:s', $v['dateline']);
            if (array_key_exists('update_time', $v)) $v['update_time'] = date('Y/m/d H:i:s', $v['update_time']);

            $v['content'] = spall_user::getUserName($v['user_id_from']) . ': ' . $v['content'];
            $sms_list[$k] = $v;
        }

        return $sms_list;
    }
}


