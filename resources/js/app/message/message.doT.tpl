<li class="js-messageitem" data-id="{{!it.feed_id}}">
    <div class="head-pic">
        <a href="{{!it.source_url}}">
            <img src="{{!it.avatar}}" width="40" height="40"></div>
    </a>
    <dl>
        <dt>
            {{=it.content}}
        </dt>
        <dd>
            <p>共{{!it.msg_count}}条消息<span>|</span>
                <a href="javascript:;" class="js-detail">
                    {{? it.type == '0' }}
                    回复
                    {{??}}
                    查看
                    {{?}}
                </a>
                <span>|</span>
                <a href="javascript:;" class="js-markread">
                    {{? it.type == '0' }}
                    删除
                    {{??}}
                    忽略
                    {{?}}
                </a>
            </p>
            <time>{{!it.update_time}}</time>
        </dd>
    </dl>
</li>