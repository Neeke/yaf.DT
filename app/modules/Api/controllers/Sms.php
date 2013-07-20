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
     *已读feed
     */
    public function readfeedAction()
    {
        $this->rest->method('POST');

        $params = $this->allParams();

        $this->rest->paramsMustMap = array('feed_id');
        $this->rest->paramsCanValid($params);

        $info = $this->model_sms_feed->readFeed($params['feed_id']);

        if ($info == false) $this->rest->error(rest_Code::STATUS_SUCCESS_DO_ERROR_DB);

        $this->rest->success('','');
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