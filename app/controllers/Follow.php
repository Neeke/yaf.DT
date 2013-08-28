<?php
/**
 * 关注用户
 * @author pjn
 *
 */
class FollowController extends Controller
{
    /**
     * @var  models_album
     */
    private $model_album;

    public function init()
    {
        parent::init();
    }

    /**
     * 查看其他用户
     */
    public function indexAction()
    {
        $this->set('page_title', '我关注的用户');
    }


}