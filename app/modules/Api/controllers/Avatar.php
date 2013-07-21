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
        $params                    = $this->allParams();
//        $this->rest->paramsMustMap = array('file');
//        $this->rest->paramsMustValid($params);

        $config['upload_path']   = './uploads/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';
        $config['max_size']      = '1024';
        $config['max_width']     = '3000';
        $config['max_height']    = '2000';
        $config['file_name']     = $this->user_id . '_tem_' . time();

        $upload = new helper_upload($config);

        if (!$upload->do_upload()) {
            $this->rest->error(rest_Code::STATUS_SUCCESS_DO_ERROR_FILE, $upload->display_errors());
        } else {
            $data_tem           = $upload->data();
            $data['avatar_url'] = './uploads/tem/' . $data_tem['file_name'];
            //缩减图片
            $filename = $data['avatar_url'];
            list($width, $height) = getimagesize($filename);
            $new_width  = 400;
            $new_height = 400 * ($height / $width);
            $image_p    = imagecreatetruecolor($new_width, $new_height);
            $image      = imagecreatefromjpeg($filename);
            imagecopyresampled($image_p, $image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);

            imagejpeg($image_p, "./uploads/tem/{$data_tem['file_name']}");
            imagedestroy($image_p);

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
        $list    = getimagesize($src_img);
        $x       = $list[0] * $x;
        $y       = $list[1] * $y;
        $source  = imagecreatefromjpeg($src_img);
        $croped  = imagecreatetruecolor($w, $h);
        imagecopy($croped, $source, 0, 0, $x, $y, $w, $h);
        imagejpeg($croped, './uploads/avatar/' . base64_encode($this->user_id) . '.jpg');
        imagedestroy($croped);
        unlink($src_img);
        $data['avatar'] = '/uploads/avatar/' . base64_encode($this->user_id) . '.jpg';
        $this->rest->success($data,rest_Code::STATUS_SUCCESS,'保存');
    }

}