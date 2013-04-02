<?php
class ApiblogController extends Controller {
	
	private $MuestParams = array('token');
	
	public function init() {
		parent::init();
		$this->check->paramsMustMap = $this->MuestParams;
		$this->check->paramsMustValid($this->getRequest()->getQuery());
		$this->token();

		$this->quantity->config(10,10,rest_Quantity::CONFIG_IP);
		$this->quantity->check($this->appkey);
	}
	
	public function listAction(){
		$this->modified->ckModified();

		$this->db->cache_on();
		$page = (int)$this->getRequest()->getParam("p");
		$page = $page?$page:1;
		$every = 10;
		$page_max = 5;
		$page_url = 'blog/index';
		$count = $this->db->getAll('select count(1) as a from yaf_blog');
		$count = $count[0]['a'];
		$page_str = helper_common::page($count, $every, $page, $page_max, $page_url);

		$start = $page==1?0:($page - 1)*$every;
		$end = $every;
		$list = $this->db->getAll("select * from yaf_blog limit $start, $end");
		$this->db->cache_off();
		if ($_GET['aa'] == 'bb') {
			$list = array('asfd');
		}
		$this->rest->success($list);
	}
	
	public function infoAction(){
		$id = abs($this->getRequest()->getPost('blog_id',0));
		$this->db->cache_on();
		$info = $this->db->getRow('select * from yaf_blog where blog_id = ?',array($id));
		$this->db->cache_off();
		$this->rest->success($info);
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
			if ($back > 1) {
				helper_common::msg('提交成功');
			}
		}
	}

}
