<?php
/**
 * 计算某区间内质数合
 * @author ciogao@gmail.com
 * Date: 13-5-26 下午9:57
 *
 * php cli.php request_uri="/scripts/prime/index" 100,300
 *
 *
 */
class PrimeController extends Controller
{
    private $areaRaw = '';
    private $area = array();
    private $sum = 0;

    public function init()
    {
        $this->areaRaw = $_SERVER['argv'][2];
        if (empty($this->areaRaw)) {
            throw new Exception('$area is empty, it`s will be like "100,3000"');
        }

        $area = explode(',', $this->areaRaw);
        if (count($area) < 2) {
            throw new Exception('$area is empty, it`s will be like "100,3000"');
        }

        $this->area = $area;
    }

    public function indexAction()
    {
        for ($i = intval($this->area[0]); $i <= intval($this->area[1]); $i++) {
            if ($this->isPrime($i)) {
                $this->sum += $i;
            }
        }

        exit('the primes in ' . $this->areaRaw . ' `s sum is ' . $this->sum . "\n");
    }

    /**
     * 是否质数
     * @param $num
     * @return bool
     */
    private function isPrime($num)
    {
        for ($i = 2; $i <= intval(sqrt($num)); $i++) {
            if ($num % $i == 0) {
                return FALSE;
            }
        }
        return TRUE;
    }
}