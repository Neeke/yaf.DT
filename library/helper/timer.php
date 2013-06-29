<?php
/**
 * 时间辅助函数
 * @author ciogao@gmail.com
 */
class  Helper_timer
{
    /**
     * 获取当天起末时间戳
     */
    public static function day($time_ = 'today')
    {
        $time_tem      = !empty($time_) ? $time_ : time();
        $Y             = date('Y', $time_tem);
        $m             = date('m', $time_tem);
        $d             = date('d', $time_tem);
        $time['start'] = mktime(0, 0, 1, $m, $d, $Y);
        $time['end']   = mktime(23, 59, 59, $m, $d, $Y);
        return $time;
    }

    /**
     * 返回时间戳所在周的起未时间戳
     * 无传入时，返回当前周的时间戳
     *
     * @param string $time_
     * @return int|string
     */
    public static function week($time_ = '')
    {
        $time = $time_ ? $time_ : time();
        $day  = date('w', $time);
        if ($day == '1') {
            $cflag = '+0';
            $lflag = '-1';
        } else {
            $cflag = '-1';
            $lflag = '-2';
        }
        $start_time = strtotime(date('Y-m-d', strtotime("$cflag week Monday", $time)));
        $start_time = mktime(0, 0, 1, date('m', $start_time), date('d', $start_time), date('y', $start_time));
        $end_time   = $start_time + 7 * 24 * 3600 - 2;
        unset($time, $day);
        $time['start'] = $start_time;
        $time['end']   = $end_time;
        unset($start_time, $end_time, $lflag);
        return $time;
    }

    /**
     * 返回时间戳所在月的起未时间戳
     * 无传入时，返回当前月的时间戳
     * @param int|string $time_
     *
     * @return array $time
     */
    public static function month($time_ = '')
    {
        $time       = $time_ ? $time_ : time();
        $month      = date('m', $time);
        $start_time = mktime(0, 0, 1, $month, 1, date('y', $time));
        $end_time   = mktime(0, 0, 1, $month + 1, 1, date('y', $time)) - 2;
        unset($time, $month);
        $time['start'] = $start_time;
        $time['end']   = $end_time;
        unset($start_time, $end_time);
        return $time;
    }

    /**
     * 返回该时间戳距离现在多久  1小时前 1天前 1周前 1月前
     *
     * @param int $time_tem
     *
     * @return string 多久前
     */
    public static function how_long($time_tem = 0)
    {
        $time = time() - $time_tem;
        $str = '';
        switch ($time) {
            case ($time < 60):
                $str .= '刚刚';
                break;
            case ($time >= 60 && $time < 3600):
                $str .= ceil($time / 60) . '分钟前';
                break;
            case ($time < 86400):
                $str .= ceil($time / 3600) . '小时前';
                break;
            case ($time > 86400 && $time <= 86400 * 7):
                $str .= ceil($time / (86400)) . '天前';
                break;
            case ($time > 86400 * 7 && $time <= 86400 * 30):
                $str .= ceil($time / (86400 * 7)) . '周前';
                break;
            case ($time > 86400 * 30 && $time <= 86400 * 30 * 12):
                $str .= ceil($time / (86400 * 30)) . '月前';
                break;
        }
        return $str;
    }
}