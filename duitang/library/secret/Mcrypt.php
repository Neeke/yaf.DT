<?php
/**
 * @author ciogao
 * Date: 13-3-27 上午10:10
 */
class secret_Mcrypt
{
    /**
     * 解密
     *
     * @param string $encryptedText 已加密字符串
     * @param string $key  密钥
     * @return string
     */
    public static function _decrypt($encryptedText, $key = null)
    {
        $key = $key === null ? Yaf_Registry::get("config")->get('secret')->get('key') : $key;
        $cryptText = base64_decode($encryptedText);
        $ivSize = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB);
        $iv = mcrypt_create_iv($ivSize, MCRYPT_RAND);
        $decryptText = mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $key, $cryptText, MCRYPT_MODE_ECB, $iv);
        return trim($decryptText);
    }

    /**
     * 加密
     *
     * @param string $plainText    未加密字符串
     * @param string $key         密钥
     * @return string
     */
    public static function _encrypt($plainText, $key = null)
    {
        $key = $key === null ? Yaf_Registry::get("config")->get('secret')->get('key') : $key;
        $ivSize = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB);
        $iv = mcrypt_create_iv($ivSize, MCRYPT_RAND);
        $encryptText = mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $key, $plainText, MCRYPT_MODE_ECB, $iv);
        return trim(base64_encode($encryptText));
    }
}