<?php
/**
 * 邀请注册
 * @author pjn
 *
 */
class InvitationController extends Controller
{

    public function init()
    {
        parent::init();
    }

    /**
     * 邀请码管理
     */
    public function indexAction()
    {
        $this->set('page_title', '邀请好友');
    }
}