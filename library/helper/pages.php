<?php
/**
 * 分页
 * @author ciogao@gmail.com
 * Class helper_pages
 */
class helper_pages
{
    /**
     * 获取Cookie中start值
     * @param $key
     * @return int
     */
    static public function getStartCookie($key)
    {
        $start = 0;
        if (array_key_exists($key,$_COOKIE) && (int)$_COOKIE[$key] >= 0)
        {
            $start = (int)$_COOKIE[$key];
        }
        return $start <= 50 ? $start : 0 ;
    }

    static public function setStartCookie($key,$value)
    {
        setcookie($key,$value);
    }

    /*
     * 将整数转换到指定的区间
     * $num:需转换的整数
     * $min:最小值
     * $max:最大值
    */
    private static function to_limit_lng($num, $min, $max = 0)
    {
        $num = (int)($num);
        $min = (int)($min);
        $max = (int)($max);

        if ($num < $min) {
            return $min;
        }

        if ($max > 0 && $num > $max) {
            return $max;
        }
        return $num;
    }

    /*
     * 分页函数
     * $page : 当前页
     * $record_count : 总记录数
     * $page_size : 每页记录数
    */

    public static function page($page_url, $record_count, $page_size, $page)
    {
        if (!$page_url) {
            $page_url = $_SERVER['PHP_SELF'] . "?";
        } else {
            if (stripos($page_url, "?") === FALSE) {
                $page_url .= "?";
            } else {
                if (substr($page_url, -1) != "&") $page_url .= "&";
            }
        }

        if (!$record_count) return;

        $page_size  = self::to_limit_lng($page_size, 1, "");
        $page_count = ceil($record_count / $page_size);
        $page       = self::to_limit_lng($page, 1, $page_count);

        $page_str = "共 <font color='red'>" . $record_count . "</font> 条&nbsp;&nbsp;( <font color='red'>" . $page . "</font> / " . $page_count . " )&nbsp;&nbsp;";

        if ($page == 1) {
            $page_str .= "<a href='javascript:;' class='page'>首页</a>&nbsp;&nbsp;";
            $page_str .= "<a href='javascript:;' class='page'>上一页</a>&nbsp;&nbsp;";
        } else {
            $page_str .= "<a href='" . $page_url . "page=1' class='page'>首页</a>&nbsp;&nbsp";
            $page_str .= "<a href='" . $page_url . "page=" . ($page - 1) . "' class='page'>上一页</a>&nbsp;&nbsp";
        }

        if ($page == $page_count) {
            $page_str .= "<a href='javascript:;' class='page'>下一页</a>&nbsp;&nbsp;";
            $page_str .= "<a href='javascript:;' class='page'>末页</a>&nbsp;&nbsp;";
        } else {
            $page_str .= "<a href='" . $page_url . "page=" . ($page + 1) . "' class='page'>下一页</a>&nbsp;&nbsp;";
            $page_str .= "<a href='" . $page_url . "page=$page_count' class='page'>末页</a>&nbsp;&nbsp;";
        }

        $page_str .= '<input type="text" name="page" value="" size="4" class="inputText1" />';
        $page_str .= '<input type="button" value="Go" class="tMiddle" onclick="location.href=\'' . $page_url . 'page=' . '\' + this.previousSibling.value;" />';
        return $page_str;
    }

    public static function page1($page_url, $record_count, $page_size, $page)
    {
        if (!$page_url) {
            $page_url = $_SERVER['PHP_SELF'];
        } else {
            if (stripos($page_url, "?") === FALSE) {
//                $page_url .= "?";
            } else {
                if (substr($page_url, -1) != "&") $page_url .= "&";
            }
        }

        if (!$record_count) return;

        $page_size  = self::to_limit_lng($page_size, 1, "");
        $page_count = ceil($record_count / $page_size);
        $page       = self::to_limit_lng($page, 1, $page_count);

        $page_str = "共 <font color='red'>" . $record_count . "</font> 条&nbsp;&nbsp;( <font color='red'>" . $page . "</font> / " . $page_count . " )&nbsp;&nbsp;";

        if ($page == 1) {
            $page_str .= "<a href='javascript:;' class='page'>首页</a>&nbsp;&nbsp;";
            $page_str .= "<a href='javascript:;' class='page'>上一页</a>&nbsp;&nbsp;";
        } else {
            $page_str .= "<a href='" . $page_url . "/p/1' class='page'>首页</a>&nbsp;&nbsp";
            $page_str .= "<a href='" . $page_url . "/p/" . ($page - 1) . "' class='page'>上一页</a>&nbsp;&nbsp";
        }

        if ($page == $page_count) {
            $page_str .= "<a href='javascript:;' class='page'>下一页</a>&nbsp;&nbsp;";
            $page_str .= "<a href='javascript:;' class='page'>末页</a>&nbsp;&nbsp;";
        } else {
            $page_str .= "<a href='" . $page_url . "/p/" . ($page + 1) . "' class='page'>下一页</a>&nbsp;&nbsp;";
            $page_str .= "<a href='" . $page_url . "/p/$page_count' class='page'>末页</a>&nbsp;&nbsp;";
        }

        $page_str .= "<select name='page' onchange=\"window.location=this.options[this.selectedIndex].value\">\n";
        for ($i = 1; $i <= $page_count; $i++) {
            $URL = $page_url . "/p/$i";
            if ($page == $i) {
                $page_str .= "<option value='$i' selected>$i</option>\n";
            } else {
                $page_str .= "<option value=\"$URL\">$i</option>\n";
            }
        }
        $page_str .= "</select>";

        return $page_str;
    }


    public static function page2($page_url, $record_count, $page_size, $page)
    {

        if (!$page_url) {
            $page_url = $_SERVER['PHP_SELF'];
        } else {
            if (stripos($page_url, "?") === FALSE) {

            } else {
                if (substr($page_url, -1) != "&") $page_url .= "&";
            }
        }

        if (!$record_count) return;

        $page_size  = self::to_limit_lng($page_size, 1, "");
        $page_count = ceil($record_count / $page_size);
        $page       = self::to_limit_lng($page, 1, $page_count);

        $page_str = '<div class="page">';

        //上5页
        if ($page <= 5) {
            $page_str .= "";
        } else {
            $page_str .= "<a href='" . $page_url . "/p/" . ($page - 5) . "'>上5页</a>";
        }

        //上一页
        if ($page == 1) {
        } else {
            $page_str .= "<a href='" . $page_url . "/p/" . ($page - 1) . "' class='toppage'>上一页</a>";
        }

        $count = 4; //显示页码数
        $i     = ($page - (int)($count / 2) > 0) ? ($page - (int)($count / 2)) : 1; //起始页码
        $count = ($i + $count < $page_count) ? ($i + $count) : $page_count; //终止页码

        if ($page_count > 1) {
            while ($i <= $count) {
                if ($i == $page) {
                    $page_str .= "<a href='" . $page_url . "/p/" . $i . "' class='cur'>" . $i . "</a>";
                } else {
                    $page_str .= "<a href='" . $page_url . "/p/" . $i . "'>" . $i . "</a>";
                }
                $i++;
            }
        }


        //后一页
        if ($page == $page_count) {
        } else {
            $page_str .= "<a href='" . $page_url . "/p/" . ($page + 1) . "'  class='nextpage'>下一页</a>";
        }

        //后5页
        if ($page >= $page_count - 5) {
        } else {
            $page_str .= "<a href='" . $page_url . "/p/" . ($page + 5) . "'  class='next5page'>下5页</a>";
        }

        $page_str .= '</div>';
        return $page_str;
    }

}