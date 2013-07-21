<div class="talk-detail-content">
    <ul class="talk-detail-list">
        {{~ it.rows :value:index}}
        <li class="talk-detail-list-item {{? value.cells.others}}
            talk-item-fromothers
        {{?}}
        " data-talkid="{{!value.cells.talk_id}}">
            <a class="talk-avatar" href="{{!value.cells.sourc_url}}" target="_blank">
                <img src="{{!value.cells.avatar}}" alt=""/>
            </a>
            <div class="talk-content">
                <div class="talk-content-wrap">
                    <p>{{!value.cells.content}}</p>
                    <div class="talk-content-footer">
                        <span class="talk-content-date">{{!value.cells.dateline}}</span>
                    <span class="talk-content-opts">
                        <a href="javascript:;"><span>删除</span></a>
                    </span>
                    </div>
                </div>
            </div>
        </li>
        {{~}}
    </ul>
</div>