<?php
/**
 * @author ciogao@gmail.com
 *         Class ItemController
 */
class ItemsController extends Controller
{

    /**
     * @var models_items
     */
    private $model_items = NULL;
    /**
     * @var models_reply
     */
    private $model_reply = NULL;

    public function init()
    {
        parent::init();
        $this->model_items = models_items::getInstance();
        $this->model_reply = models_reply::getInstance();
    }

    public function replayAction()
    {
        $this->rest->method('POST');
        $params                    = $this->getRequest()->getPost();
        $this->rest->paramsMustMap = array('items_id', 'content');
        $this->rest->paramsMustValid($params);

        $params['user_id'] = $this->userinfo['user_id'];
        $data              = $this->model_reply->mkdata($params);
        $back              = $this->model_reply->insert($data);
//        $this->db->query('update yaf_blog set posts = posts + 1 where blog_id = ?', array($post['blog_id']));
        if ($back > 1) {
            $this->rest->success('', rest_Code::STATUS_SUCCESS, '评论成功');
        }
    }

    public function delAction()
    {
        if ($_POST) {
            $post = $_POST;
            if (empty($post['blog_id'])) {
                helper_common::msg('请认真填写');
            }

            $blog_id = (int)$this->getRequest()->getPost("blog_id", 0);
            $a       = $this->db->delete('yaf_blog', array('blog_id' => $blog_id));
            $this->rest->success($a, '删除成功');
        }
    }

    /**
     * 上传图片 发布
     */
    public function uploadAction()
    {
        $this->rest->method('POST');
        $params                    = $this->getRequest()->getPost();
        $this->rest->paramsMustMap = array('album_id', 'remark');
        $this->rest->paramsMustValid($params);

        $config['upload_path']   = './uploads/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';
        $config['max_size']      = '1024';
        $config['max_width']     = '3000';
        $config['max_height']    = '2000';
        $config['file_name']     = $this->userinfo['user_id'] . '_' . $this->getRequest()->getPost("album_id", 0) . '_' . time();

        $upload = new helper_upload($config);

        if (!$upload->do_upload()) {
            $this->rest->error(rest_Code::STATUS_ERROR, $upload->display_errors());
        } else {
            $data_  = $upload->data();
            $data   = array(
                'album_id'     => $this->getRequest()->getPost("album_id", 0),
                'items_pic'    => '/uploads/' . $data_['file_name'],
                'items_name'   => 1,
                'user_id'      => $this->userinfo['user_id'],
                'created_time' => time(),
                'update_time'  => time(),
                'flag'         => contast_items::ITEMS_FLAG_YES,
                'remark'       => $this->getRequest()->getPost("remark", 0),
                'tag_ids'      => (string)$this->getRequest()->getPost("tags_ids"),
            );
            $result = $this->model_items->insert($data);

            $this->rest->success($result);
        }
    }

    /**
     * 取得plupload实例
     */
    public function pluploadAction()
    {
        helper_plupload::upload();
    }

    /**
     * 新建
     */
    public function createAction()
    {

    }

    /**
     * 查看某张图片
     */
    public function showAction()
    {

    }

    /**
     * 喜欢某张图片
     */
    public function likeitAction()
    {

    }
}