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

}