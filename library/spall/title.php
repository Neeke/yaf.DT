<?php
/**
 * @author ciogao@gmail.com
 * Date: 13-7-31 下午8:18
 */
class spall_title
{
    private $title = '';
    private static $_title = '不要集';

    private static $_keywords = '发现并收藏你喜欢的高清美女图片';

    private static $_pageTitle = array(
        'login'              => '女美图',
        'register'           => '申请账号',
        'resetpsw'           => '忘记密码',
        'register/listentag' => '关注标签',
        'explore'            => '随便看看',
        'hot'                => '热门',
        'new'                => '最新',
        'album/mine'         => '我的图集',
        'subscribe'          => '我的订阅',
        'tags/mine'          => '我关注的标签',
        'follow/index'       => '我关注的用户',
        'album/v'            => '图集名称',
        'make/album'         => '做图集',
        'settings/index'     => '设置',
        'messages/index'     => '消息',
        'invitation'         => '邀请码',
        'account'            => '账户',
        'feedback'           => '提问与建议',
        'contact'            => '联系我们',
    );

    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * 取得站点title
     * @return string
     */
    public static function getTitle()
    {
        return self::$_title;
    }

    /**
     * 取得页面title
     * @param $page_name
     * @return string
     */
    public static function getPageTitle($page_name)
    {
        if (array_key_exists($page_name, self::$_pageTitle)) {
            return self::$_pageTitle[$page_name];
        }
    }

    /**
     * @param $page_name
     * @return string
     */
    public static function getWebSiteTitle($page_name)
    {
        if ($page_name == 'login') {
            $title = self::getTitle() .' - ' . self::getPageTitle($page_name);
        }else{
            $title = self::getPageTitle($page_name) . ' - ' . self::getTitle();
        }
        return $title;
    }

    /**
     * 取得keywords
     * @return string
     */
    public static function getKeywords()
    {
        return self::$_keywords;
    }
}