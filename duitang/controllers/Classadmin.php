<?php
/**
 * 默认的控制器
 * 当然, 默认的控制器, 动作, 模块都是可用通过配置修改的
 * 也可以通过$dispater->setDefault*Name来修改
 */
class ClassadminController extends Controller {

	public function init() {
		parent::init();
		$this->setaction('admin');
	}

	public function indexAction() {
		$this->db->cache_on();
		$page = (int)$this->getRequest()->getParam("p");
		$page = $page?$page:1;
		$every = 10;
		$page_max = 5;
		$page_url = 'classadmin/index';
		$count = $this->db->getAll('select count(1) as a from yaf_blog_class');
		$count = $count[0]['a'];
		$page_str = helper_common::page($count, $every, $page, $page_max, $page_url);

		$start = $page==1?0:($page - 1)*$every;
		$end = $every;
		$list = $this->db->getAll("select * from yaf_blog_class limit $start, $end");
		$this->db->cache_off();
		$this->set('list', $list);
		$this->set('page_str', $page_str);
	}
	
	public function viewAction($id = 0){
		$id = abs($id);
		$info = self::getBlogById($id);
		$this->set('info', $info);
	}
	
	public function infoAction(){
		$id = abs($this->getRequest()->getPost('classid',0));
		$class = new moduls_tagclass();
		$info = $class->getClassById($id);
		$this->rest->success($info);
	}
	
	public function classaddAction(){
		$classid = $this->getRequest()->getParam("classid",0);
		if (empty($classid)) {
			$class = new moduls_tagclass();
			$classes = $class->getclass();
			$this->set('classes',$classes);
		}
		
		if ($_POST) {
			$post = $_POST;
			if (empty($post['title']) || empty($post['keys'])) {
				$this->rest->error(rest_Code::STATUS_ERROR_PARAMS,'请认真填写',array('url' => '?'));
			}

			$data['classname'] = $post['title'];
			$data['keys'] = $post['keys'];
			if (empty($post['classid'])) {
				$back = $this->db->insert('yaf_blog_class', $data);
			}else{
				$where = array('id' => $post['classid']);
				$back = $this->db->update('yaf_blog_class', $data, $where);
			}

			if ($back > 1) {
				$this->rest->success(array('url' => helper_common::site_url('classadmin')),rest_Code::STATUS_SUCCESS,'保存成功');
			}
			
			if ($back === TRUE) {
				$this->rest->success(array('url' => helper_common::site_url('classadmin')),rest_Code::STATUS_SUCCESS,'修改成功');
			}
		}
	}
	
	public function delAction(){
		$classid = $this->getRequest()->getPost("classid",0);
		$back = $this->db->delete('yaf_blog_class', array('id' => $classid));
		if ($back) {
			$msg ='删除成功';
		}else{
			$msg ='操作失败';
		}
		$this->rest->success(array('url' => helper_common::site_url('classadmin')),rest_Code::STATUS_SUCCESS,$msg);
	}

}
