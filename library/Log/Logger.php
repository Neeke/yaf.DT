<?php
/**
 * 日志类
 * @auther ciogao@gmail.com
 * Class Log_Logger
 */
class Log_Logger extends Log_Base{
	
	const TYPE_INFO = 'INFO';
	const TYPE_WARN = 'WARN';
	const TYPE_ERRO = 'ERRO';
	
	/**
	 * @var Log_Logger
	 */
	private static $self = NULL;
	
	public static function instance($path_ = '') {
		if (self::$self == NULL){
			self::$self = new Log_Logger($path = $path_);
		}
		return self::$self;
	}
	
	function __construct($path = ''){
		if ($path != '') {
			parent::setPath($path);
		}
	}
	
	function info($string){
		$log = date('Y-m-d H:i:s',time()).' | '.self::TYPE_INFO.' | '.$string;
		$this->log($log,$this->_filename);
	}
	
	function warn($string){
		$log = date('Y-m-d H:i:s',time()).' | '.self::TYPE_WARN.' | '.$string;
		$this->log($log,$this->_filename);
	}
	
	function error($string){
		$log = date('Y-m-d H:i:s',time()).' | '.self::TYPE_ERRO.' | '.$string;
		$this->log($log,$this->_filename);
	}
}