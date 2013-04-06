<?php
class ApiController extends Controller
{

    public function init()
    {
        parent::init();
    }

    public function indexAction()
    {
        $TDlist = array(
            'Oauth登录与验证接口',
            'WarnLog预警系统',
        );

        $codelist = rest_Code::getCodes();

        $this->set('todo', $TDlist);
        $this->set('codelist', $codelist);
    }

    public function infoAction()
    {
        phpinfo();
    }

}
