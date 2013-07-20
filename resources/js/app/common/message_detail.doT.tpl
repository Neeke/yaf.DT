<div class="msg-detail-content">
    <ul class="msg-detal-list">
        {{~ it.rows :value:index}}
        <li class="msg-detal-list-item" data-msgid="{{!value.cells.msg_id}}">
            <a class="msg-avatar" href="{{!value.cells.sourc_url}}" target="_blank">
                <img src="{{!value.cells.avatar}}" alt=""/>
            </a>
            <div
            {{? value.cells.others}}
            class="msg-content-others"
            {{?? }}
            class="msg-content-mine"
            {{?}}
            >
                <p>{{!value.cells.content}}</p>
                <div class="msg-content-footer">
                    <span class="msg-content-date">{{!value.cells.dateline}}</span>
                    <span class="msg-content-opts">
                        <a href="javascript:;"><span>删除</span></a>
                    </span>
                </div>
            </div>
        </li>
        {{~}}
    </ul>
</div>