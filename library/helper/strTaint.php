<?php
/**
 * @author ciogao@gmail.com
 * Date: 13-8-14 下午9:18
 */
class helper_strTaint
{
    /**
     * 混淆码的添加与删除
     * @param string $string
     * @param bool $decode 是否解码
     * @return mixed
     */
    static public function strTaint($string,$decode = FALSE) {
        $from = array('=','A','B','C','D','W','X','Y','Z');
        $to = array('|E','|F','|G','|H','|I','|S','|T','|U','|V');
        if (!$decode) {
            return str_replace($from, $to, $string);
        }
        return str_replace($to,$from,$string);
    }

    /**
     * 生成混淆后的str
     * @param $str
     * @return mixed
     */
    static public function mkTaint($str){
        return self::strTaint(base64_encode(json_encode(array('rawStr' => $str,time()))));
    }

    /**
     * 解析混淆码，得到str
     * @param string $str
     * @return mixed
     */
    static public function getTaint($str){
        $string = json_decode(base64_decode(self::strTaint($str,TRUE),TRUE),TRUE);
        return $string['rawStr'];
    }
}