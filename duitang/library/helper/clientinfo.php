<?php 
/**
 * 获取客户端信息
 * @author firefly
 *
 */
class helper_clientinfo
{
	/**
	 * user_agent
	 * @return unknown
	 */
	public static function user_agent()
	{
		return $_SERVER['HTTP_USER_AGENT'];
	}
				 
	/**
	 * 来源
	 * @return unknown|string
	 */
	public static function referer()
	{
		if(!empty($_SERVER['HTTP_REFERER'])) return  $_SERVER['HTTP_REFERER'];
		return "";
	}
	
	/**
	 * 当前url
	 * @return string
	 */
	public static function nowurl()
	{
		return "http://".$_SERVER ['HTTP_HOST'].$_SERVER['PHP_SELF'];
	}

	/**
	 * 语言
	 * @return unknown
	 */
	public static function language()
	{
		return $_SERVER['HTTP_ACCEPT_LANGUAGE'];
	}

	/**
	 * ip
	 * @return Ambigous <unknown, string>
	 */
	public static function getIP(){
		if (getenv('HTTP_CLIENT_IP')){
			$ip = getenv('HTTP_CLIENT_IP');
		}else if (getenv('HTTP_X_FORWARDED_FOR')){
			$ip = getenv('HTTP_X_FORWARDED_FOR');
		}else if (getenv('REMOTE_ADDR')){
			$ip = getenv('REMOTE_ADDR');
		}else{
			$ip = $_SERVER['REMOTE_ADDR'];
		}
		return $ip;
	}
}