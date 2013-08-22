<li class="js-messageitem" data-id="{{!it.feed_id}}">
    <div class="head-pic">
        <a href="{{!it.source_url}}">
            <img src="{{!it.avatar}}" width="40" height="40"></div>
    </a>
    <dl {{? it.type == '0' }}class="js-detail"{{?}}>
        <dt>
            {{=it.content}}
        </dt>
        <dd>
            <p>
                {{? it.type == '0' }}
                共{{!it.msg_count}}条消息<span>|</span>
                <a href="javascript:;" class="js-detail">
                    回复
                </a>
                <span>|</span>
                {{?}}
                <a href="javascript:;" class="js-markread">
                    {{? it.type != '0' }}
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