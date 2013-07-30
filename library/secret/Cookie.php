<?php
/**
 * @author ciogao
 * Date: 13-3-27 上午10:12
 */
class secret_Cookie extends secret_Mcrypt
{
    /**
     * 删除cookie
     *
     * @param array $args
     * @return boolean
     */
    public static function del($args)
    {
        $name = $args['name'];
        $domain = isset($args['domain']) ? $args['domain'] : null;
        return isset($_COOKIE[$name]) ? setcookie($name, '', time() - 86400, '/', $domain) : true;
    }

    /**
     * 得到指定cookie的值
     *
     * @param string $name
     * @return null|string
     */
    public static function get($name)
    {
        return isset($_COOKIE[$name]) ? parent::_decrypt($_COOKIE[$name]) : null;
    }

    /**
     * 设置cookie
     *
     * @param array $args
     * @return boolean
     */
    public static function set($args)
    {
        $name = $args['name'];
        $value = parent::_encrypt($args['value']);
        $expire = isset($args['expire']) ? $args['expire'] : null;
        $path = isset($args['path']) ? $args['path'] : '/';
        $domain = isset($args['domain']) ? $args['domain'] : null;
        $secure = isset($args['secure']) ? $args['secure'] : 0;
        return setcookie($name, $value, $expire, $path, $domain, $secure);
    }
}