<?php
/**
 * @author ciogao@gmail.com
 * Date: 13-7-1 上午11:36
 */
class SmsController extends Controller
{

    /**
     * @var models_smsfeed
     */
    private $model_sms_feed;

    public function init()
    {
        parent::init();
        $this->model_sms_feed = models_smsfeed::getInstance();
    }

    /**
     * feed列表
     * @todo start limit 格式
     */
    public function feedAction()
    {
        $this->rest->method('GET');

        $info = $this->model_sms_feed->myFeed($this->user_id);

        $this->mkData->setOffset(0,5);
        $this->mkData->config(count($info),'feed_id');
        $data = $this->mkData->make($info);
        $this->rest->success($data);
    }

    /**
     *发送短消息
     */
    public function sendAction()
    {

    }

    /**
     * 短消息列表
     */
    public function showAction()
    {

    }

    /**
     * 删除短消息
     */
    public function delAction()
    {

    }
}