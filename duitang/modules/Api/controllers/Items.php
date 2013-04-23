<?php
/**
 * @author ciogao@gmail.com
 *         Class ItemController
 */
class ItemsController extends Controller
{

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
        $data = $this->model_reply->mkdata($params);
        $back             = $this->model_reply->insert($data);
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
            $this->rest->go_200($a, '删除成功');
        }
    }
}