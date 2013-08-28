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

        $this->page = (int)$this->getRequest()->getParam('p', 1);
        $follower_from_me_list  = $this->models_follower->myFollowers(($this->page - 1) * contast_follower::PAGE_SIZE_DEFAULT);

        $count = $this->models_follower->myFollowersCount();

        $sPage = helper_pages::page2(helper_common::site_url('follow/index'), $count, contast_follower::PAGE_SIZE_DEFAULT, $this->page);
        $this->set('sPage', $sPage);
        $this->set('follower_from_me_list', $follower_from_me_list);
        $this->set('follower_from_me_count',$count);
    }

}