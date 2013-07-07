<?php
/**
 * @author ciogao@gmail.com
 * Date: 13-7-1 上午11:30
 */
class TagController extends Controller
{

    /**
     * @var models_tag
     */
    private $model_tag;

    /**
     * @var models_taglisten
     */
    private $models_taglisten;

    public function init()
    {
        parent::init();
        $this->model_tag        = models_tag::getInstance();
        $this->models_taglisten = models_taglisten::getInstance();
    }

    /**
     * 创建tag
     */
    public function createAction()
    {
        $this->rest->error();
    }

    /**
     * 系统推荐tag
     */
    public function systemAction()
    {
        $this->check->method('GET');
        $data = $this->model_tag->getSystemTags();
        $this->rest->success($data);
    }

    /**
     * 关注某tag
     */
    public function listenAction()
    {
        $this->rest->method('POST');
        $params                     = $this->getRequest()->getPost();
        $this->rest->paramsMustMap = array('tag_id');
        $this->rest->paramsMustValid($params);

        $where = array('tag_id' => $params['tag_id'], 'user_id' => $this->user_id);
        if ($this->models_taglisten->exits($where)) {
            $this->rest->error(rest_Code::STATUS_SUCCESS_DO_ERROR_DB_REPEAT, '已经关注过该标签');
        }

        $params['user_id'] = $this->user_id;

        $data   = $this->models_taglisten->mkdata($params);

        $result = $this->models_taglisten->insert($data);
        if ($result) {
            $this->rest->success($result,'','关注成功');
        }

        $this->rest->error(rest_Code::STATUS_SUCCESS_DO_ERROR_DB);
    }

    /**
     * 我的tag
     */
    public function mineAction()
    {

    }

    /**
     * 已经关注的tag列表
     */
    public function listenedAction()
    {
        $this->rest->method('GET');
        $params                     = $this->getRequest()->getPost();
        $this->rest->paramsCanMap = array('user_id');
        $this->rest->paramsCanValid($params);

        $tags = $this->models_taglisten->getTagsListenedByUser($this->user_id);
        if (is_array($tags) && count($tags) > 0){
            $this->rest->success($tags);
        }

        $this->rest->error(rest_Code::STATUS_SUCCESS_DO_ERROR_DB);
    }

    /**
     * tag搜索
     */
    public function searchAction()
    {
        $this->rest->method('GET');

        $params = $this->getRequest()->getQuery();

        $this->rest->paramsMustMap = array('tag_name');
        $this->rest->paramsMustValid($params);

        $tags = $this->model_tag->getTagsSearch($params['tag_name']);
        if (is_array($tags) && count($tags) > 0){
            $this->rest->success($tags);
        }

        $this->rest->success('','','没有找到您想要的标签');
    }
}