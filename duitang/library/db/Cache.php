<?php
/**
 * 单例cache
 * @author ciogao@gmail.com
 *
 */
class db_Cache {
	
	private $cache = null;
	
	/**
	 * @var db_Cache
	 */
	private static $self = null;

    /**
     * @static
     * @param int $cachehost
     * @param int $cacheport
     * @param string $cacheType
     * @param string $cacheSys
     * @return db_Cache
     */
	public static function instance($cachehost = 0,$cacheport = 0,$cacheType = 'memcached',$cacheSys = ''){
		if (self::$self == null){
			self::$self = new db_Cache($cacheSys,$cacheType,$cachehost,$cacheport);
		}
		return self::$self;
	}
	
	public function __construct($cacheSys,$cacheType,$cachehost,$cacheport){
		switch ($cacheType){
			case 'memcached':
				if ($cacheSys == 'sae') {
					$this->cache = memcache_init();
				}else{
					$this->cache = new Memcache();
					$a = $this->cache->connect($cachehost, $cacheport);
					if ($a == false) {
						echo '<pre><b>memcached Connection failed.  please check the *.ini cache</b></pre>';
						die;
					}		
				}
				break;
			case 'redis':
				
				break;
			default:
				;
		}
	}

    /**
     * 设置cahce
     * @param string $key
     * @param string|array|bool $value
     * @param int|string $lifetime
     * @return
     */
	public function set($key,$value,$lifetime = '60'){
		return $this->cache->set($key, $value, false, $lifetime);
	}
	
	/**
	 * 获取cache
	 * @param string $Key
	 * @return string|array|bool 
	 */
	public function get($Key){
		return $this->cache->get($Key);
	}
	
	/**
	 * 关闭cache连接
	 */
	public function close(){
		$this->cache->close();
	}
}
