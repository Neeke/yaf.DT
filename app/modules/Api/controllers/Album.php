<?php
/**
 * @author ciogao@gmail.com
 *         Class AlbumController
 */
class AlbumController extends Controller
{

    /**
     * @var models_album
     */
    private $model_album = NULL;

    /**
     * @var models_user
     */
    private $model_user = NULL;

    /**
     * @var models_collect
     */
    private $model_collect = NULL;

    /**
     * @var models_albumListen
     */
    private $models_albumListen = NULL;

    /**
     * @var models_items
     */
    private $models_items = NULL;

    /**
     * @var models_tag
     */
    private $model_tag = NULL;

    /**
     * @var models_replyalbum
     */
    private $models_album_replay = NULL;

    public function init()
    {
        parent::init();
        $this->model_album         = models_album::getInstance();
        $this->model_user          = models_user::getInstance();
        $this->model_tag           = models_tag::getInstance();
        $this->models_items        = models_items::getInstance();
        $this->models_album_replay = models_replyalbum::getInstance();
    }

    /**
     * 创建相册
     */
    public function createAction()
    {
        $this->rest->method('POST');
        $params                    = $this->getRequest()->getPost();
        $this->rest->paramsMustMap = array('album_name', 'is_open', 'items', 'tag_ids');
        $this->rest->paramsMustValid($params);

        if (!is_array($params['items']) || count($params['items']) < 1) {
            $this->rest->error(rest_Code::STATUS_ERROR_PARAMS_MUST);
        }

//        $this->rest->paramsMustMap = array('pic_url','remark','txt_area','pic_area','is_cover');
        $this->rest->paramsMustMap = array('items_pic');
        $this->rest->paramsMustValid($params['items'][0]);


        /**
         * 探测相册是否重名
         */
        if ($this->model_album->exits(array('album_name' => $params['album_name'], 'user_id' => $this->user_id))) {
            $this->rest->error(rest_Code::STATUS_SUCCESS_DO_ERROR_DB_REPEAT, '相册已存在');
        }

        $params['user_id'] = $this->user_id;

        /**
         * 创建自定标签
         */
        if (array_key_exists('tags', $params) && strlen($params['tags']) > 0) {
            $tag_ids           = $this->model_tag->insertBatch($params['tags']);
            $_tags             = explode(',', $params['tag_ids']);
            $_tag_ids          = array_merge($tag_ids,$_tags);
            $params['tag_ids'] = implode(',', $_tag_ids);
        }

        $data     = $this->model_album->mkdata($params);
        $this->db->getCache()->delete(contast_cacheKey::ALBUM_MINE.$this->user_id.'_0');
        $album_id = $this->model_album->insert($data);
        if ($album_id == FALSE) $this->rest->error(rest_Code::STATUS_SUCCESS_DO_ERROR);

        $this->model_user->addalbum();

        foreach ($params['items'] as $items) {
            $items['album_id'] = $album_id;
            $items['user_id']  = $this->user_id;
            $items['tag_ids']  = $params['tag_ids'];
            $_data             = $this->models_items->mkdata($items);
            $this->models_items->insert($_data);

            if (array_key_exists('is_cover', $items) && (int)$items['is_cover'] > 0) {
                $face_url = $items['items_pic'];
            }

            unset($_data);
        }

        if (!$face_url) $face_url = $params['items'][0]['items_pic'];

        if ($face_url) {
            $this->model_album->updateCover($face_url, $album_id);
        }

        $this->rest->success('', rest_Code::STATUS_SUCCESS, '创建成功');
    }

    /**
     * 编辑相册时初始化接口
     */
    public function editinitAction()
    {
        $this->rest->method('GET');
        $params = $this->allParams();

        $this->rest->paramsMustMap = array('album_id');
        $this->rest->paramsMustValid($params);

        $album_id = $params['album_id'];

        if ((int)$album_id < 1) $this->rest->error('', 'api needs params album_id');

        $album_info = $this->model_album->getRow(
            array('album_id', 'album_name', 'tag_ids', 'album_remark', 'face_url', 'created_time', 'is_open'),
            array('album_id' => $album_id, 'user_id' => $this->user_id)
        );

        $album_info['items'] = $this->models_items->getItemsByAlbumId($album_id);
        $album_info['tags']  = $this->model_tag->getTagByIds($album_info['tag_ids']);

        $this->rest->success($album_info);
    }

    /**
     * 编辑相册内容
     */
    public function modifyAction()
    {
        $this->rest->method('POST');

        $params                    = $this->getRequest()->getPost();
        $this->rest->paramsMustMap = array('album_name', 'is_open', 'items', 'tag_ids', 'album_id');
        $this->rest->paramsMustValid($params);

        if (!is_array($params['items']) || count($params['items']) < 1) {
            $this->rest->error(rest_Code::STATUS_ERROR_PARAMS_MUST);
        }

//        $this->rest->paramsMustMap = array('pic_url','remark','txt_area','pic_area','is_cover');
        $this->rest->paramsMustMap = array('items_pic');
        $this->rest->paramsMustValid($params['items'][0]);

        $album_id = $params['album_id'];

        /**
         * 探测相册是否属于当前用户
         */
        if (!$this->model_album->exits(array('album_id' => $album_id, 'user_id' => $this->user_id))) {
            $this->rest->error(rest_Code::STATUS_SUCCESS_DO_ERROR_DB_REPEAT, '相册不存在或权限错误');
        }

        $params['user_id'] = $this->user_id;


        /**
         * 创建自定标签
         */
        $tag_ids = array();
        if (array_key_exists('tags', $params) && strlen($params['tags']) > 0) {
            $tag_ids = $this->model_tag->insertBatch($params['tags']);
        }

        $_tags             = explode(',', $params['tag_ids']);
        $_tag_ids          = array_merge($tag_ids,$_tags);
        $params['tag_ids'] = implode(',', $_tag_ids);

        $data          = $this->model_album->mkdata($params);
        $update_result = $this->model_album->update($data, array('album_id' => $album_id));
        if ($update_result == FALSE) $this->rest->error(rest_Code::STATUS_SUCCESS_DO_ERROR);

        $items_ids = array();
        foreach ($params['items'] as $items) {
            $items['album_id'] = $album_id;
            $items['user_id']  = $this->user_id;
            $items['tag_ids']  = $params['tag_ids'];
            $_data             = $this->models_items->mkdata($items);

            if ((int)$items['items_id'] > 0) {
                $items_ids[] = (int)$items['items_id'];
                $this->models_items->update($_data, array('items_id' => $items['items_id']));
            } else {
                $this->models_items->insert($_data);
            }

            if (array_key_exists('is_cover', $items) && (int)$items['is_cover'] > 0) {
                $face_url = $items['items_pic'];
            }

            unset($_data);
        }

        $items_ids_delete = array_diff($items_ids, $this->models_items->getItemsIdsByAlbumId($album_id));
        $this->models_items->updateItemsForDelete($items_ids_delete);

        if (!$face_url) $face_url = $params['items'][0]['items_pic'];

        if ($face_url) {
            $this->model_album->updateCover($face_url, $album_id);
        }

        $this->rest->success('', rest_Code::STATUS_SUCCESS, '编辑完成');
    }

    /**
     * 我的相册
     */
    public function mineAction()
    {
        $this->rest->method('GET');

        $data = $this->model_album->myAlbum(1);

        if (!is_array($data) || count($data) < 1) {
            $this->rest->error(rest_Code::STATUS_SUCCESS_DO_ERROR_DB_NULL);
        }

        $start = $this->getRequest()->getParam('start', 0);
        $limit = $this->getRequest()->getParam('limit', contast_album::PAGE_SIZE_DEFAULT);

        $this->mkData->setOffset($start, $limit);
        $this->mkData->config(count($data), 'album_id');
        $data = $this->mkData->make($data);

        $this->rest->success($data);
    }

    /**
     * 收藏图片到相册
     */
    public function collectionAction()
    {
        $this->check->method('POST');
        $params                     = $this->getRequest()->getPost();
        $this->check->paramsMustMap = array('items_id', 'album_id');
        $this->check->paramsMustValid($params);

        if ((int)$this->getRequest()->getPost('album_id') < 1) {
            $this->rest->error(rest_Code::STATUS_ERROR_PARAMS);
        }

        $this->model_collect = models_collect::getInstance();
        if ($this->model_collect->exits(array('album_id' => $params['album_id'], 'user_id' => $this->userinfo['user_id'], 'items_id' => $params['items_id']))) {
            $this->rest->error(rest_Code::STATUS_SUCCESS_DO_ERROR_DB_REPEAT, '重复操作');
        }

        $params['user_id'] = $this->userinfo['user_id'];

        $data   = $this->model_collect->mkdata($params);
        $result = $this->model_collect->insert($data);

        $this->model_user->addcollect();
        if ($result == FALSE) $this->rest->error(rest_Code::STATUS_SUCCESS_DO_ERROR);

        $this->rest->success('', rest_Code::STATUS_SUCCESS, '收藏成功');
    }

    /**
     * 订阅图集
     */
    public function listenAction()
    {
        $this->rest->method('POST');
        $params                    = $this->getRequest()->getPost();
        $this->rest->paramsMustMap = array('album_id');
        $this->rest->paramsMustValid($params);

        if ((int)$this->getRequest()->getPost('album_id') < 1) {
            $this->rest->error(rest_Code::STATUS_ERROR_PARAMS);
        }

        $this->models_albumListen = models_albumListen::getInstance();
        $listened_result = $this->models_albumListen->getRow('flag',array('album_id' => $params['album_id'], 'user_id' => $this->userinfo['user_id']));
        $listened_flag = $listened_result['flag'];

        if ($listened_result && $listened_flag == contast_albumlistened::FLAG_DEFAULT) {
            $this->rest->error(rest_Code::STATUS_SUCCESS_DO_ERROR_DB_REPEAT, '请勿重复订阅');
        }

        $this->db->getCache()->delete(contast_cacheKey::ALBUM_LISTENED.$this->user_id);
        $this->db->getCache()->delete(contast_cacheKey::ALBUM_LISTENED_INFO.$this->user_id);

        if ($listened_result && $listened_flag == contast_albumlistened::FLAG_DEL){
            $result = $this->models_albumListen->reListen($this->user_id,$params['album_id']);
            $this->model_album->addListened($params['album_id']);
        }else{
            $result = $this->models_albumListen->listen($this->user_id,$params['album_id']);
            $this->model_album->addListened($params['album_id']);
        }

        if ($result == FALSE) $this->rest->error(rest_Code::STATUS_SUCCESS_DO_ERROR);

        $this->rest->success('', rest_Code::STATUS_SUCCESS, '订阅成功');
    }

    /**
     * 查看我的订阅
     */
    public function listenedAction()
    {
        $this->models_albumListen = models_albumListen::getInstance();
        $albums                   = $this->models_albumListen->myListenedAlbum();

        if (!is_array($albums) || count($albums) < 1) {
            $this->rest->error(rest_Code::STATUS_SUCCESS_DO_ERROR_DB_NULL);
        }

        $this->rest->success($albums);
    }

    /**
     * 取消订阅
     */
    public function listenedremoveAction()
    {
        $this->rest->method('POST');

        $params = $this->allParams();
        $this->rest->paramsMustMap = array('album_id');
        $this->rest->paramsMustValid($params);

        $this->models_albumListen = models_albumListen::getInstance();

        $this->db->update_cache(contast_cacheKey::ALBUM_LISTENED.$this->user_id);
        $result = $this->models_albumListen->remove($params['album_id'],$this->user_id);

        $this->db->update_cache(contast_cacheKey::ALBUM_LISTENED_INFO.$this->user_id);
        $this->model_album->removeListened($params['album_id']);
        if ($result) $this->rest->success('','','取消订阅成功');

        $this->rest->error();
    }

    /**
     * 评论相册
     */
    public function replyAction()
    {
        $this->rest->method('POST');
        $params                    = $this->allParams();
        $this->rest->paramsMustMap = array('album_id', 'content');
        $this->rest->paramsMustValid($params);

        $params['user_id_from'] = $this->user_id;
        $data                   = $this->models_album_replay->mkdata($params);
        $back                   = $this->models_album_replay->insert($data);

        spall_msgfeed::mkMsgFeedAlbumReply($this->userinfo['user_name'],$params['album_id']);

        if ($back > 1) {
            $this->model_album->postsAlbum($params['album_id']);
            $response = spall_reply::mkDataForAlbumReply(array($data));

            $this->rest->success($response[0], rest_Code::STATUS_SUCCESS, '评论成功');
        }
    }

    /**
     * 取得评论列表
     * @todo start limit
     */
    public function replylistAction()
    {
        $this->rest->method('GET');
        $params                    = $this->allParams();
        $this->rest->paramsMustMap = array('album_id');
        $this->rest->paramsMustValid($params);

        $this->getStartLimit();
        $info = $this->models_album_replay->getAllByAlbumId($params['album_id'],$this->start,$this->limit);

        $info = spall_reply::mkDataForAlbumReply($info);

        $this->mkData->setOffset($this->start, $this->limit);
        $this->mkData->config(count($info), 'reply_id');
        $data = $this->mkData->make($info);
        $this->rest->success($data);
    }

    /**
     * 删除album
     */
    public function removeAction()
    {
        $this->rest->method('POST');

        $params = $this->allParams();
        $this->rest->paramsMustMap = array('album_id');
        $this->rest->paramsMustValid($params);

        $this->db->getCache()->delete(contast_cacheKey::ALBUM_MINE.$this->user_id.'_0');
        $this->db->update_cache(contast_cacheKey::ALBUM_MINE.$this->user_id.'_all');
        $result = $this->model_album->remove($params['album_id'],$this->user_id);
        if ($result) $this->rest->success('','','删除成功');

        $this->rest->error();
    }

    /**
     * 查看某个相册
     */
    public function showAction()
    {

    }
}