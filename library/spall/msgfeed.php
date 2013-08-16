<?php
/**
 * @author ciogao@gmail.com
 * Date: 13-8-16 下午8:58
 */
class spall_msgfeed
{
    /**
     * 转换feed模板
     *
     * @param $template
     * @param array $data
     * @return string
     */
    static public function mkMsgFeed($template,$data = array())
    {
        if (!is_array($data) || count($data) < 1){
            return $template;
        }else{
            for ($i = 0;$i < count($data);$i++){
                $template_data[] = '{'. $i .'}';
            }

            return str_replace($template_data,$data,$template);
        }
    }

    /**
     * 生成评论相册的feed内容
     * @param $user_name
     * @param $album_id
     * @return string
     * @todo 重复feed时则更新
     */
    static public function mkMsgFeedAlbumReply($user_name,$album_id)
    {
        $album_info = models_album::getInstance()->getAlbumInfo($album_id);
        $album_user_id = $album_info['user_id'];
        $album_name = $album_info['album_name'];
        $feed = self::mkMsgFeed(contast_msgfeed::MSG_TEMPLATE_ALBUM_REPLY,array($user_name,helper_common::site_url_album($album_id),$album_name));
        return models_smsfeed::getInstance()->createFeed($album_user_id,$feed);
    }

    /**
     * 生成关注用户的feed内容
     * @param $user_id
     * @param $user_name
     * @return string
     */
    static public function mkMsgFeedUserListen($user_id,$user_name)
    {
        return self::mkMsgFeed(contast_msgfeed::MSG_TEMPLATE_USER_LISTEN,array(helper_common::site_url_user($user_id),$user_name));
    }

    /**
     * 生成注册完成后的feed内容
     * @return string
     */
    static public function mkMsgFeedAfterReg()
    {
        return self::mkMsgFeed(contast_msgfeed::MSG_TEMPLATE_AFTER_REG);
    }

    /**
     * 生成屏蔽相册后的feed内容
     * @param $album_name
     * @return string
     */
    static public function mkMsgFeedAlbumShield($album_name)
    {
        return self::mkMsgFeed(contast_msgfeed::MSG_TEMPLATE_ALBUM_SHIELD,array($album_name));
    }
}