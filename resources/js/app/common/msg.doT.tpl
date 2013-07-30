<li class="talk-detail-list-item {{? it.others}}
            talk-item-fromothers
        {{?}}
        " data-talkid="{{!it.talk_id}}">
    <a class="talk-avatar" href="{{!it.sourc_url}}" target="_blank">
        <img src="{{!it.avatar}}" alt=""/>
    </a>
    <div class="talk-content">
        <div class="talk-content-wrap">
            <p>{{!it.content}}</p>
            <div class="talk-content-footer">
                <span class="talk-content-date">{{!it.dateline}}</span>
                    <span class="talk-content-opts">
                        <a href="javascript:;"><span>删除</span></a>
                    </span>
            </div>
        </div>
    </div>
</li>