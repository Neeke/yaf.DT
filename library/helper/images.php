<?php
/**
 * @author ciogao@gmail.com
 */
class helper_images
{
    /**
     * 等比例缩放
     * @param $backimg
     * @param $width
     * @param $height
     * @param $newsfile
     */
    static public function thumb_dbl($backimg, $width, $height, $newsfile)
    {
        list($s_w, $s_h, $exten) = getimagesize($backimg);
        if ($width && ($s_w < $s_h)) {
            $width = ($height / $s_h) * $s_w;
        } else {
            $height = ($width / $s_w) * $s_h;
        }

        $new = imagecreatetruecolor($width, $height);

        if ($exten == 1) {
            $old = imagecreatefromgif($backimg);
        } elseif ($exten == 2) {
            $old = imagecreatefromjpeg($backimg);
        } elseif ($exten == 3) {
            $old = imagecreatefrompng($backimg);
        }

        $otcs = imagecolortransparent($old);
        if ($otcs >= 0 && $otcs < imagecolorstotal($old)) {
            $tran = imagecolorsforindex($old, $otcs);
            print_r($tran);
            $newtran = imagecolorallocate($new, $tran["red"], $tran["green"], $tran["blue"]);
            imagefill($new, 0, 0, $newtran);
            imagecolortransparent($new, $newtran);
        }

        imagecopyresampled($new, $old, 0, 0, 0, 0, $width, $height, $s_w, $s_h);
        if ($exten == 1) {
            imagegif($new, $newsfile);
        } elseif ($exten == 2) {
            imagejpeg($new, $newsfile);
        } elseif ($exten == 3) {
            imagepng($new, $newsfile);
        }
        imagedestroy($new);
        imagedestroy($old);
    }

    /**
     * 图片裁剪
     * @param $backimg
     * @param $cut_x
     * @param $cut_y
     * @param $cut_width
     * @param $cut_height
     * @param $newfile
     */
    static public function cut_thumb($backimg, $cut_x, $cut_y, $cut_width, $cut_height, $newfile)
    {
        list($c_w, $c_h, $c_exten) = getimagesize($backimg);
        if ($c_exten == 1) {
            $back = imagecreatefromgif($backimg);
        } elseif ($c_exten == 2) {
            $back = imagecreatefromjpeg($backimg);
        } elseif ($c_exten == 3) {
            $back = imagecreatefrompng($backimg);
        }
        $c_new = imagecreatetruecolor($cut_width, $cut_height);
        imagecopyresampled($c_new, $back, 0, 0, $cut_x, $cut_y, $cut_width, $cut_height, $cut_width, $cut_height);
        if ($c_exten == 1) {
            imagegif($c_new, $newfile);
        } elseif ($c_exten == 2) {
            imagejpeg($c_new, $newfile);
        } elseif ($c_exten == 3) {
            imagepng($c_new, $newfile);
        }
        imagedestroy($back);
        imagedestroy($c_new);
        unlink($backimg);
    }

    /**
     * 相册图片裁剪
     * 横纵比大于1.5，则宽为1920，高等比
     * 横纵比不足或等于1.5，则高度缩放1280，宽等比
     *
     * @param $filepath
     * @return bool
     */
    static public function cut_thumb_for_items($filepath)
    {
        $max_width  = 1920;
        $max_height = 1280;

        list($c_w, $c_h, $c_exten) = getimagesize($filepath);

        if ($c_h < $max_height && $c_w < $max_width) return FALSE;

        if (intval(1000 * $c_w / $c_h) > intval(1000 * $max_width / $max_height)) {
            $cut_width = $max_width;
            $cut_height = $c_h * $cut_width / $c_w;
            $cut_x = $cut_y = 0;

        }else{
            $cut_height = ($c_h >= $max_height) ? $max_height : $c_h;
            $cut_width  = intval(1000 * $c_w * $cut_height/ $c_h) >= 1000 * $max_width ? $max_width : intval($c_w * $cut_height/ $c_h);
            $cut_x      = ($cut_width > $max_width) ? intval(($c_w - $cut_width) / 2) : 0;
            $cut_y      = 0;
        }

//        echo '<pre>';
//        exit(var_dump($c_w,$c_h,$cut_width,$cut_height,$cut_x,$cut_y));
        rename($filepath, $filepath . '.cut');

        if ($c_exten == 1) {
            $back = imagecreatefromgif($filepath . '.cut');
        } elseif ($c_exten == 2) {
            $back = imagecreatefromjpeg($filepath . '.cut');
        } elseif ($c_exten == 3) {
            $back = imagecreatefrompng($filepath . '.cut');
        }
        $c_new = imagecreatetruecolor($cut_width, $cut_height);

        imagecopyresampled($c_new, $back, 0, 0, $cut_x, $cut_y, $cut_width, $cut_height, $c_w, $c_h);
        if ($c_exten == 1) {
            imagegif($c_new, $filepath);
        } elseif ($c_exten == 2) {
            imagejpeg($c_new, $filepath);
        } elseif ($c_exten == 3) {
            imagepng($c_new, $filepath);
        }
        imagedestroy($back);
        imagedestroy($c_new);
        unlink($filepath . '.cut');
    }

}