<?php
/**
 * @author ciogao@gmail.com
 * Date: 13-8-28 下午8:15
 */
class FollowerController extends Controller
{

    /**
     * @var models_follower
     */
    public $model;

    public function init()
    {
        parent::init();
        $this->model = models_follower::getInstance();
    }

    /**
     * 关注某用户
     */
    public function followAction()
    {
        $this->rest->method('POST');

        $params = $this->allParams();

        $this->rest->paramsMustMap = array('user_id');
        $this->rest->paramsMustValid($params);

        $result = $this->model->follow($params['user_id']);

        if ($result){
            $this->rest->success('','','关注成功');
        }

        $this->rest->error('','出现错误');
    }

    /**
     * 关注某用户
     */
    public function unfollowAction()
    {
        $this->rest->method('POST');

        $params = $this->allParams();

        $this->rest->paramsMustMap = array('user_id');
        $this->rest->paramsMustValid($params);

        $result = $this->model->unFollow($params['user_id']);

        if ($result){
            $this->rest->success('','','取消关注成功');
        }

        $this->rest->error('','出现错误');
    }

}