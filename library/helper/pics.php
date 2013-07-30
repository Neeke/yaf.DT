<?php
/**
 * 图片rgb&&灰度计算　辅助函数 
 * @author ciogao@gmail.com
 */
class  helper_pics
{
	/**
	 * @var Helper_pics
	 */
	private static $self=null;
	
	/**
	 * @static
	 * @return Helper_pics
	 */
	public static function instance(){
		if (self::$self == null){
			self::$self = new self;
		}
		return self::$self;
	}
	
	/**
	 * 设置背景资源(父资源)
	 */
	private static $pim = null;
	private static $pim_w = 0;
	private static $pim_h = 0;
	public function pim($pim){
		self::$pim = $pim;
		self::$pim_w = imagesx($pim);
		self::$pim_h = imagesy($pim);
	}

	/**
	 * 设置用于合并的子资源
	 */
	private $cim = null;
	private $cim_w = 0;
	private $cim_h = 0;
	public function cim($cim){
		$this->cim = $cim;
		$this->cim_w = imagesx($cim);
		$this->cim_h = imagesy($cim);
	}
	
	/**
	 * 设置将要处理的资源
	 */
	private static $im = null;
	private static $im_w = 0;
	private static $im_h = 0;
	public function im($im){
		self::$im = $im;
		self::$im_w = imagesx($im);
		self::$im_h = imagesy($im);
	}
	
	/**
	 * 设置合并透明度
	 */
	private static $pct = 20;
	public function pct($pct){
		self::$pct = $pct;
	}


    /**
     * 获得图片上某座标灰度
     * @param int $x
     * @param int $y
     * @internal param resource $im
     * @return int 0-255 灰度值
     */
	public function getgray($x, $y){  
		//获取($x, $y)处的rgb值  
		$rgb_     = imagecolorat(self::$im, $x, $y);  
		//计算灰度  
		/*
		$red     = ($rgb >> 16) & 0xFF;  
		$green   = ($rgb >> 8 )   & 0xFF;  
		$blue    = $rgb & 0xFF;  
		*/
		$rgb = imagecolorsforindex(self::$im, $rgb_);
		$red = $rgb['red'];
		$green = $rgb['green'];
		$blue = $rgb['blue'];
		
		$gray = round(.299*$red + .587*$green + .114*$blue);  
		  
		return $gray;  
	}

    /**
     * 获取图像区域的平均灰度
     * 总的灰度值/总的像素数
     *
     * @param int $x         起始坐标
     * @param int $y
     * @param int $width     延展属性
     * @param int $height
     * @internal param resource $im
     * @return int 0-255
     */
	public function getAvgGray($x, $y, $width, $height)
	{
		$gray = 0;
		$x_width     = $x+$width;
		$y_height     = $y+$height;

		for ($i = $x; $i <= $x_width; $i++) {
			for ($j = $y; $j <= $y_height; $j++) {
				$gray += self::getgray($i, $j);
			}
		}
		
		$avggray = round($gray/($width*$height));
		return $avggray;
	}
	
	/**
	 * 合并图片
	 * @param int $dst_x 父资源起始点
	 * @param int $dst_y
	 * @param int $src_x 子资源起始点
	 * @param int $src_y
	 * @param int $src_w 子资源延展属性
	 * @param int $src_h
	 */
	public function merge($dst_x, $dst_y, $src_x, $src_y, $src_w = 0, $src_h = 0){
		
		imagecopymerge(self::$pim, $this->cim, $dst_x, $dst_y, $src_x, $src_y, $src_w, $src_h, self::$pct);
	}
	
	/**
	 * 维真压缩图片
	 * @param int $maxwidth 最大宽
	 * @param int $maxheight　最大高
	 * @param string $name　保存文件名
	 * @param string $filetype　保存文件类型
	 */
	public function resize($maxwidth,$maxheight,$name,$filetype)
	{	
		if(($maxwidth && self::$im_w > $maxwidth) || ($maxheight && self::$im_h > $maxheight))
		{
            $resizewidth_tag = $resizeheight_tag = false;
            $widthratio = $heightratio = 0;
            $ratio = 1;

			if($maxwidth && self::$im_w>$maxwidth)
			{
				$widthratio = $maxwidth/self::$im_w;
				$resizewidth_tag = true;
			}
	
			if($maxheight && self::$im_h>$maxheight)
			{
				$heightratio = $maxheight/self::$im_h;
				$resizeheight_tag = true;
			}
	
			if($resizewidth_tag && $resizeheight_tag)
			{
				if($widthratio<$heightratio)
					$ratio = $widthratio;
				else
					$ratio = $heightratio;
			}
	
			if($resizewidth_tag && !$resizeheight_tag)
				$ratio = $widthratio;
			if($resizeheight_tag && !$resizewidth_tag)
				$ratio = $heightratio;
	
			$newwidth = self::$im_w * $ratio;
			$newheight = self::$im_h * $ratio;
	
			if(function_exists("imagecopyresampled"))
			{
				$newim = imagecreatetruecolor($newwidth,$newheight);
				imagecopyresampled($newim,self::$im,0,0,0,0,$newwidth,$newheight,self::$im_w,self::$im_h);
			}
			else
			{
				$newim = imagecreate($newwidth,$newheight);
				imagecopyresized($newim,self::$im,0,0,0,0,$newwidth,$newheight,self::$im_w,self::$im_h);
			}
	
			$name = $name.$filetype;
			imagejpeg($newim,$name);
			imagedestroy($newim);
		}
		else
		{
			$name = $name.$filetype;
			imagejpeg(self::$im,$name);
		}
	}
	
}