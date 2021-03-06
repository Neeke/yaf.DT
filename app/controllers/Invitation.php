<?php
/**
 * 邀请注册
 * @author pjn ciogao@gmail.com
 *
 */
class InvitationController extends Controller
{

    /**
     * @var models_invitedcodes
     */
    private $model_invitedcodes;

    private $if_make = false;

    public function init()
    {
        parent::init();

        if (!spall_user::haveinvitation()){
            $this->redirect(helper_common::site_url('settings'));
        }

        $this->model_invitedcodes = models_invitedcodes::getInstance();

        $action = $this->_request->getActionName();
        if ($action == 'make') {
            $this->if_make = true;
            $this->_request->setActionName('index');
        }
    }

    /**
     * 邀请码管理
     */
    public function indexAction()
    {
        $this->setMenu('invitation');
        $this->set('page_title', '邀请码');

        $result = $this->model_invitedcodes->showCodes($this->user_id);

        $create_time = 0;

        $count_not_used = 0;
        if (is_array($result)) {
            foreach($result as $v){
                if ($v['flag'] == contast_invitedcodes::CODES_FLAG_NOT_USED) {
                    $count_not_used++;
                    if ($create_time == 0) $create_time = $v['create_time'];
                }
            }
        }

        if (is_array($result) && count($result) > 0)
        {
//            $this->set('result_msg','您现在有以下邀请码，快让好友们来体验吧');
        }

        if ($create_time < time() - contast_invitedcodes::CODES_LIFE_CYCLE){
            $this->if_make = TRUE;
            $this->model_invitedcodes->expiredAllCodes($this->user_id);
        }

        if ($this->if_make){
            if (is_array($result) && $count_not_used > 0){
//                $this->set('result_msg','您尚有以下邀请码没用完，请先用完再生成好不');

            }else{
//                $this->set('result_msg','您已生成以下邀请码，快让好友们来体验吧');
                $result = $this->model_invitedcodes->createCodes($this->user_id);
            }
        }

        $this->set('result',$result);
    }
}