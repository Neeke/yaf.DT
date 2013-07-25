<?php
/**
 * 将数字转换为汉字表示
 * @author ciogao@gmail.com
 * Date: 13-7-24 下午5:36
 *
 * php cli.php request_uri="/scripts/Inttostr/index" 123456
 *
 * @todo intArea的使用
 */
class InttostrController extends Controller
{
    private $number = 0;
    private $number_len = 0;
    static private $intToStr = array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九');
    private $intArea = array(
        10        => '十',
        100       => '百',
        1000      => '千',
        10000     => '万',
        100000000 => '亿',
    );
    private $str = '';

    public function init()
    {
        $this->number = $_SERVER['argv'][2];

        if (empty($this->number)) {
            throw new Exception('$number is empty, it`s will be like "123456"');
        }

        $this->number_len = strlen($this->number);
    }

    public function indexAction()
    {
        if ($this->isGreaterThan(100000000)) {
            $number_min_100000000    = substr($this->number, -9, 1);
            $number_max_100000000 = (int)substr($this->number, -8, 4);
            $number_max_10000 = (int)substr($this->number, -4);
            $a    = self::numberToStr($number_max_10000);
            $b    = self::numberToStr($number_max_100000000) . "万";
            $c    = self::numberToStr($number_min_100000000) . "亿";

        } elseif ($this->isLessThan(100000000) && $this->isGreaterThan(10000)) {
            $number_max_100000000 = (int)substr($this->number, 0, $this->number_len - 4);
            $number_max_10000 = (int)substr($this->number, -4);
            $a    = self::numberToStr($number_max_10000);
            $b    = self::numberToStr($number_max_100000000) . "万";
            $c    = "";

        } elseif ($this->isLessThan(10000))
        {
            $number_max_10000 = (int)substr($this->number, -$this->number_len);
            $a    = self::numberToStr($number_max_10000);
            $b    = "";
            $c    = "";
        }
        $this->str = $c . $b . $a;

        exit('the number ' . $this->number . ' cover to str is ' . $this->str . "\n");
    }

    /**
     * 读取数据并转换
     * @param $number
     * @return string
     */
    static private function numberToStr($number)
    {
        $number = (string)$number;
        $arr         = array();
        $is_number_0 = 0;
        $flag_end    = TRUE;
        $str         = '';
        $size_r      = strlen($number);
        for ($i = 0; $i < $size_r; $i++) {
            $arr[$i] = $number{$i};
        }
        $arrlen = count($arr);
        for ($j = 0; $j < $arrlen; $j++) {
            $ch = self::$intToStr[$arr[$arrlen - 1 - $j]];
            if ($ch == "零" && $is_number_0 == 0) {
                $is_number_0 = 1;
                $str         = $ch . $str;
                continue;
            } elseif ($ch == "零") {
                continue;
            }
            $is_number_0 = 0;
            switch ($j) {
                case 0:
                    $str      = $ch;
                    $flag_end = FALSE;
                    break;
                case 1:
                    $str = $ch . "十" . $str;
                    break;
                case 2:
                    $str = $ch . "百" . $str;
                    break;
                case 3:
                    $str = $ch . "千" . $str;
                    break;
            }
        }

        if ($flag_end === TRUE) {
            mb_internal_encoding("UTF-8");
            $str = mb_substr($str, 0, mb_strlen($str) - 1);
        }

        return $str;
    }

    /**
     * 是否超过某最小值
     * @param $minNum
     * @param $num
     * @return bool
     */
    private function isGreaterThan($minNum, $num = FALSE)
    {
        if ($num === FALSE) {
            $_num = $this->number;
        } else {
            $_num = (int)$num;
        }

        return $_num >= $minNum;
    }

    /**
     * 是否小于某最大值
     * @param $maxNum
     * @param bool $num
     * @return bool
     */
    private function isLessThan($maxNum, $num = FALSE)
    {
        if ($num === FALSE) {
            $_num = $this->number;
        } else {
            $_num = (int)$num;
        }

        return $_num < $maxNum;
    }
}