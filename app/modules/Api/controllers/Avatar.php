<?php
/**
 * 头像
 * Class AvatarController
 */
class AvatarController extends Controller
{

    /**
     * @var models_user
     */
    public $model;

    public function init()
    {
        parent::init();
        $this->model = models_user::getInstance();
    }

    /**
     * upload
     * @todo form-data的mustValid
     */
    function uploadAction()
    {
        $this->rest->method('POST');
        $params = $this->allParams();
//        $this->rest->paramsMustMap = array('file');
//        $this->rest->paramsMustValid($params);

        $config['upload_path']   = './uploads/tem/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';
        $config['max_size']      = '5024';
        $config['max_width']     = '3000';
        $config['max_height']    = '2000';
        $config['file_name']     = $this->user_id . '_tem_' . time();

        $upload = new helper_upload($config);

        if (!$upload->do_upload()) {
            $this->rest->error(rest_Code::STATUS_SUCCESS_DO_ERROR_FILE, $upload->display_errors());
        } else {
            $data_tem           = $upload->data();
            $data['avatar_url'] = './uploads/tem/' . $data_tem['file_name'];

            helper_images::thumb_dbl($data['avatar_url'],500,500,$data['avatar_url']);

            $data['avatar_url'] = '/uploads/tem/' . $data_tem['file_name'];
            $this->rest->success($data);
        }
    }

    /**
     * 裁剪保存
     */
    function createAction()
    {
        $this->rest->method('POST');
        $params                    = $this->allParams();
        $this->rest->paramsMustMap = array('avatar_url', 'x', 'y', 'w', 'h');
        $this->rest->paramsMustValid($params);

        $x       = $params['x'];
        $y       = $params['y'];
        $w       = $params['w'];
        $h       = $params['h'];
        $src_img = '.'.$params['avatar_url'];

        $ext = pathinfo($src_img);
        $file_ext = strtolower($ext['extension']);

        $avatar = '/uploads/avatar/'.base64_encode($this->user_id).'.'.$file_ext;
        helper_images::cut_thumb($src_img,$x,$y,$w,$h,'.'.$avatar);

        $data['avatar'] = $avatar;
        $this->model->updateAvatar($avatar);

        $this->rest->success($data, rest_Code::STATUS_SUCCESS, '保存');
    }

}