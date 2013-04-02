<?php
class Log_Logger extends Log_Base{
	
	const TYPE_INFO = 'INFO';
	const TYPE_WARN = 'WARN';
	const TYPE_ERRO = 'ERRO';
	
	/**
	 * @var Log_Logger
	 */
	private static $self = NULL;
	
	public static function instance($path = '') {
		if (self::$self == null){
			self::$self = new Log_Logger($path = '');
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