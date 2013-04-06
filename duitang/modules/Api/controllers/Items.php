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
        if ($_POST) {
            $post = $_POST;
            if (empty($post['email']) || empty($post['content'])) {
                helper_common::msg('请认真填写');
            }

            $data['email']    = $post['email'];
            $data['blog_id']  = $post['blog_id'];
            $data['content']  = $post['content'];
            $data['dateline'] = time();
            $back             = $this->db->insert('yaf_posts', $data);
            $this->db->query('update yaf_blog set posts = posts + 1 where blog_id = ?', array($post['blog_id']));
            if ($back > 1) {
                helper_common::msg('提交成功');
            }
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