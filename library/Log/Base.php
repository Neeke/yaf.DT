<?php
/**
 * 日志base类
 * @author ciogao@gmail.com
 *
 */
class Log_Base
{
	const DEFAULT_LOG_MARK = "\n";
	
    protected $_path;
    protected $_mark = "\n";
    protected $_filename = '';
    protected $_filepost = '.log';
    
    function setPath($path){
    	$base_path = dirname(APPLICATION_PATH).'/log/';
        $this->_path = $base_path.$path.'/'.self::mkdirpre();
    }
    
    function setMark($mark = ''){
    	$this->_mark = $mark != '' ? $mark : self::DEFAULT_LOG_MARK;
    }
    
    function setLog($filename = ''){
    	$this->_filename = $this->_path.'/'.$filename.'_'.self::mkprename().$this->_filepost;
    }

    /**
     * 写入log
     * @param string $log
     * @param string $filename
     */
    public function log($log,$filename = '')
    {    	
    	if (empty($this->_filename)) {
        	$this->_filename = $this->_path.'/'.$filename.'_'.self::mkprename().$this->_filepost; 
    	}   
        $this->writelog($log);
    }

    /**
     * 创建文件前缀
     * @return string
     */
    private static function mkprename(){
    	return date('Y-m-d',time());
    }

    /**
     * 写日志
     * @param string $data
     */
    private function writelog($data)
    {
    	self::touchDir();
    	$fp = fopen($this->_filename,"a");
    	fputs($fp,$data.$this->_mark);
    	fclose($fp);
    }

    /**
     * 创建文件夹名称
     * @return string
     */
    private static function mkdirpre(){
    	return date('Y-m',time());
    }
    
    /**
     * 探测目标文件夹
     */
    private function touchDir(){
    	if(!file_exists($this->_path)){
    		$this->mkdirs($this->_path);
    	}
    }
    
    /**
     * 创建目录
     * @param string $dir
     * @return boolean
     */
    private function mkdirs($dir)
    {
        if(!is_dir($dir)){
            if(!$this->mkdirs(dirname($dir))){
                return false;
            }
            if(!mkdir($dir,0777)){
                return false;
            }
        }
        return true;
    }
}