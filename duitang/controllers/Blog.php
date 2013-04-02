<?php
class BlogController extends Controller {

	public function init() {
		parent::init();
		$this->setaction('blog');
	}

	public function indexAction() {
		$this->db->cache_on();
		$page = (int)$this->getRequest()->getParam('p',1);
		$classid = (int)$this->getRequest()->getParam('c',0);
		$search = $this->getRequest()->getQuery('s','');
		$every = 10;
		$page_max = 5;
		$page_url = 'blog/index';
		
		$where = 'where 1 = 1';
		if ($classid != 0) {
			$where .= ' and class_id = '.$classid;
			$page_url = 'blog/index/c/'.$classid;
			$this->set('classid',$classid);
		}
		
		if (!empty($search)) {
			$this->set('s',addslashes($search));
			$where .= ' and (title like "%'.addslashes($search).'%" or `keys` like "%'.addslashes($search).'%")';
		}
		
		$count = $this->db->getAll('select count(1) as a from yaf_blog '.$where);
		$count = $count[0]['a'];
		$page_str = helper_common::page($count, $every, $page, $page_max, $page_url);

		$start = $page==1?0:($page - 1)*$every;
		$end = $every;
		$list = $this->db->getAll("select blog_id,tags,title,`keys`,dateline,posts from yaf_blog $where order by blog_id desc limit $start, $end");
		$this->db->cache_off();

		$class = new moduls_tagclass();
		$classes = $class->getclass();
		$this->set('classes',$classes);
		
		$this->set('list', $list);
		$this->set('page_str', $page_str);
	}
	
	public function viewAction($id = 0){
		$id = abs($id);
		$this->db->cache_on();
		$info = $this->db->getRow('select * from yaf_blog where blog_id = ?',array($id));
		$posts = $this->db->getAll('select * from yaf_posts where blog_id = ?',array($id));
		$this->db->query('update yaf_blog set hits = hits + 1 where blog_id = ?',array($id));
		$this->db->cache_off();
		$this->set('info', $info);
		$this->set('posts',$posts);
	}
	
	public function replayAction(){
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
			$this->db->query('update yaf_blog set posts = posts + 1 where blog_id = ?',array($post['blog_id']));
			if ($back > 1) {
				helper_common::msg('提交成功');
			}
		}
	}
	
	public function delAction(){
		if ($_POST) {
			$post = $_POST;
			if (empty($post['blog_id'])) {
				helper_common::msg('请认真填写');
			}
				
			$blog_id =  (int)$this->getRequest()->getPost("blog_id",0);
			$a = $this->db->delete('yaf_blog', array('blog_id' => $blog_id));
			$this->rest->go_200($a,'删除成功');
		}
	}

}
