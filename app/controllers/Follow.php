<?php
/**
 * 关注用户
 * @author pjn
 *
 */
class FollowController extends Controller
{
    /**
     * @var  models_follower
     */
    private $models_follower;

    public function init()
    {
        parent::init();
        $this->models_follower = models_follower::getInstance();
    }

    /**
     * 查看其他用户
     */
    public function indexAction()
    {
        $this->setMenu('follow/index');

        $this->set('follower_from_me_list',$this->models_follower->myFollowers());
    }


}