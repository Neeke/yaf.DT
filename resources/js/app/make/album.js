define(function(require) {
    var DK = require('dk');
    require('plupload');
    require('imagescale');
    require('jqueryui');
    var util = require('util');
    var editimage = require('app/make/editimage');
    require('rest');

    var $albumContainer;

    function addItem(id) {
        var tmpl = '<li class="js-album-item">\
            <div class="libox">\
                <span class="up"></span>\
                <span class="down"></span>\
                <div class="thumb upload-item">\
                    <div class="upload-progress" id="progress{0}"></div>\
                </div>\
                <textarea class="js-remark" placeholder="可以在这里写下图片描述..."></textarea>\
                <span class="deledtpic js_removeitem"></span>\
                <span class="bi js_edititem"></span>\
            </div>\
        </li>';

        $albumContainer.append(util.formatStr(tmpl, id));
    }

    function initPlupload() {
        var uploader = new plupload.Uploader({
            runtimes : 'html5,flash,silverlight,browserplus',
            browse_button : 'pickfiles',
            container: 'albumContainer',
            max_file_size : '10mb',
            url : '/api/items/plupload',
            filters : [
                {title : "Image files", extensions : "jpg,gif,png"},
                {title : "Zip files", extensions : "zip"}
            ]
        });

        uploader.init();

        uploader.bind('FilesAdded', function(up, files) {
            for (var i in files) {
                addItem(files[i].id);
            }
            uploader.start();
        });

        uploader.bind('UploadProgress', function(up, file) {
            var $progress = $('#progress' + file.id);
            $progress.css({
                width: file.percent + '%'
            });
        });

        uploader.bind('FileUploaded', function(up, file, res) {
            var $progress = $('#progress' + file.id);
            var $thumb = $progress.parent();
            $progress.remove();

            if (res.response) {
                var r = $.parseJSON(res.response);

                if (r && r.result) {
                    var img = $(util.formatStr('<img class="js-uploadimg" data-src="{0}" src="{0}">', r.result));
                    $thumb.append(img);
                    img.imageScale({
                        width: 118,
                        height: 86
                    });
                }
            }
        });
    }

    function initSortable() {
        $('#albumContainer').sortable();
    }

    function initEditImage() {
        $albumContainer.on('click', '.js_edititem', function() {
            editimage.show({
                src: $(this).closest('li').find('.js-uploadimg').attr('data-src')
            });
        });
    }

    function serialize() {
        var tags = [], tag_ids = [];
        $('#tagCtnr a').each(function(i, $e) {
            $e = $($e);
            var tid = $e.attr('data-tid');
            if (tid) {
                tag_ids.push(tid);
            } else {
                tags.push($e.text());
            }
        });

        return {
            tags: tags,
            tag_ids: tag_ids,
            items: editimage.serialize(),
            album_name: $('#albumName').val(),
            is_open: $('input[name="is_open"]:checked').val()
        }
    }

    function init(data) {
        $albumContainer = $('#albumContainer');

        initPlupload();

        initSortable();

        $albumContainer.on('click', '.js_removeitem', function() {
            $(this).closest('li').remove();
        });

        initEditImage();

        $('#submit').click(function() {
            var rest = $.restPost('/api/album/create', serialize());

            rest.done(function(msg) {
                alert(msg);
                location.href = '/album/mine';
            });

            rest.fail(function(msg) {
                alert(msg || '创建失败！');
            });
        });
    }

    return {
        init: init
    }
});