<?php
class AdminController extends Controller
{

    public function init()
    {
        parent::init();
        $this->setaction('admin');
    }

    public function indexAction()
    {
        $this->db->cache_on();
        $page = (int)$this->getRequest()->getParam("p");
        $page = $page ? $page : 1;
        $every = 10;
        $page_max = 5;
        $page_url = 'admin/index';
        $count = $this->db->getAll('select count(1) as a from yaf_blog');
        $count = $count[0]['a'];
        $page_str = helper_common::page($count, $every, $page, $page_max, $page_url);

        $start = $page == 1 ? 0 : ($page - 1) * $every;
        $end = $every;
        $list = $this->db->getAll("select * from yaf_blog order by blog_id desc limit $start, $end");
        $this->db->cache_off();
        $this->set('list', $list);
        $this->set('page_str', $page_str);
    }

    public function viewAction($id = 0)
    {
        $id = abs($id);
        $info = self::getBlogById($id);
        $this->set('info', $info);
    }

    public function blogaddAction()
    {
        $blog_id = $this->getRequest()->getParam("id", 0);
        if ($blog_id != 0) {
            $info = self::getBlogById($blog_id);
            $this->set('info', $info);
        }

        $class = moduls_tagclass::getInstance();
        $classes = $class->getclass();
        $this->set('classes', $classes);

        $tags = $class->getTags();
        $this->set('tags', $tags);

        if ($_POST) {
            $post = $_POST;
            if (empty($post['title']) || empty($post['content']) || empty($post['class_id'])) {
                helper_common::msg('请认真填写');
            }

            $data['title'] = $post['title'];
            $data['class_id'] = $post['class_id'];
            $data['keys'] = $post['keys'];
            $data['content'] = $post['content'];
            $data['dateline'] = time();
            $data['tags'] = implode(',', $post['tags']);
            if (empty($post['blog_id'])) {
                $back = $this->db->insert('yaf_blog', $data);
            } else {
                $where = array('blog_id' => $post['blog_id']);
                $back = $this->db->update('yaf_blog', $data, $where);
            }

            if ($back > 1) {
                helper_common::msg('保存成功');
            }

            if ($back === TRUE) {
                helper_common::msg('修改成功', helper_common::site_url('admin'));
            }
        }
    }

    public function replayAction()
    {
        if ($_POST) {
            $post = $_POST;
            if (empty($post['email']) || empty($post['content'])) {
                helper_common::msg('请认真填写');
            }

            $data['email'] = $post['email'];
            $data['blog_id'] = $post['blog_id'];
            $data['content'] = $post['content'];
            $data['dateline'] = time();
            $back = $this->db->insert('yaf_posts', $data);
            if ($back > 1) {
                helper_common::msg('提交成功');
            }
        }
    }

    private function getBlogById($id)
    {
        return $this->db->getRow('select * from yaf_blog where blog_id = ?', array($id));
    }

}
