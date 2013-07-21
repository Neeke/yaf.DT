<div class="msg-detail-content">
    <ul class="msg-detail-list">
        {{~ it.rows :value:index}}
        <li class="msg-detail-list-item {{? value.cells.others}}
            msg-item-fromothers
        {{?}}
        " data-msgid="{{!value.cells.msg_id}}">
            <a class="msg-avatar" href="{{!value.cells.sourc_url}}" target="_blank">
                <img src="{{!value.cells.avatar}}" alt=""/>
            </a>
            <div class="msg-content">
                <div class="msg-content-wrap">
                    <p>{{!value.cells.content}}</p>
                    <div class="msg-content-footer">
                        <span class="msg-content-date">{{!value.cells.dateline}}</span>
                    <span class="msg-content-opts">
                        <a href="javascript:;"><span>删除</span></a>
                    </span>
                    </div>
                </div>
            </div>
        </li>
        {{~}}
    </ul>
</div>