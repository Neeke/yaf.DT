<?php
/**
 * 首页
 */
class IndexController extends Controller {

    /**
     * @var models_tag
     */
    private $model_tag;
    /**
     * @var models_items
     */
    private $model_items;

	public function init() {
		parent::init();
		$this->setaction('index');

        $this->model_tag = models_tag::getInstance();
        $this->model_items = models_items::getInstance();
	}

	public function indexAction() {
        $tags = $this->model_tag->getTags();
        $this->set('tags',$tags);

        $items = $this->model_items->getIndexItems();
        $this->set('items', $items);
	}

}
