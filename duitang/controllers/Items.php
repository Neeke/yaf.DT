<?php
/**
 * @author ciogao@gmail.com
 * Class ItemsController
 */
class ItemsController extends Controller {

    /**
     * @var models_items
     */
    private $mItems;

    /**
     * @var models_reply
     */
    private $mReply;

	public function init() {
		parent::init();
		$this->setaction('index');
        $this->mItems = models_items::getInstance();
        $this->mReply = models_reply::getInstance();
	}

	public function indexAction() {
		$this->db->cache_on();
		$page = (int)$this->getRequest()->getParam('p',1);
		$classid = (int)$this->getRequest()->getParam('c',0);
	}
	
	public function vAction(){
//		$this->db->cache_on();
//		$info = $this->db->getRow('select * from yaf_blog where blog_id = ?',array($id));
//		$posts = $this->db->getAll('select * from yaf_posts where blog_id = ?',array($id));
//		$this->db->query('update yaf_blog set hits = hits + 1 where blog_id = ?',array($id));
//		$this->db->cache_off();

        $this->db->cache_on();
        $items_id = (int)$this->getRequest()->getParam('i',0);
        $iteminfo = $this->mItems->getRow('*',$items_id);

        $replyinfo = $this->mReply->getAllByItemId($items_id);
        $this->db->cache_off();

        $this->set('iteminfo',$iteminfo);
        $this->set('replyinfo',$replyinfo);
	}


}
