<?php
/**
 * 分类
 */
class GroupController extends Controller
{

    /**
     * @var models_class
     */
    private $class_model;

    public function init()
    {
        parent::init();
        $this->setaction('group');
        $this->class_model = models_class::getInstance();
    }

    public function indexAction()
    {
        $class = $this->class_model->getclass();
        $this->set('classes', $class);
    }

    public function listAction(){

    }

}
