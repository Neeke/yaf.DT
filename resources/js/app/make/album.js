define(function(require) {
    var DK = require('dk');
    require('plupload');
    require('imagescale');
    require('jqueryui');
    var util = require('util');
    var editimage = require('app/make/editimage');
    require('rest');

    var tag = require('app/make/tag');

    var $albumContainer;

    function addItem(id, src) {
        var tmpl;

        if (id) {
            tmpl = '<li class="js-album-item">\
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
        } else if (src) {
            tmpl = '<li class="js-album-item">\
                <div class="libox">\
                    <span class="up"></span>\
                    <span class="down"></span>\
                    <div class="thumb upload-item">\
                        <img class="js-uploadimg" data-src="{0}" src="{0}" alt=""/>\
                    </div>\
                    <textarea class="js-remark" placeholder="可以在这里写下图片描述..."></textarea>\
                    <span class="deledtpic js_removeitem"></span>\
                    <span class="bi js_edititem"></span>\
                </div>\
            </li>';

            $albumContainer.append(util.formatStr(tmpl, src));
        }
    }

    function initPlupload() {
        var uploader = new plupload.Uploader({
            runtimes : 'html5,flash,silverlight,browserplus',
            browse_button : 'pickfiles',
            container: 'albumContainer',
            max_file_size : '10mb',
            url : '/api/items/plupload',
            filters : [
                {title : "Image files", extensions : "jpg,jpeg,gif,png"}
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
        $('#albumContainer').sortable({
            distance: 10
        });
    }

    function initEditImage() {
        $albumContainer.on('click', '.js_edititem', function() {
            editimage.show({
                items_pic: $(this).closest('li').find('.js-uploadimg').attr('data-src')
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
            tags: tags.join(','),
            tag_ids: tag_ids.join(','),
            items: editimage.serialize(),
            album_name: $('#albumName').val(),
            is_open: $('input[name="is_open"]:checked').val()
        }
    }

    function init(album_id) {
        var isUpdate = !!album_id;

        $albumContainer = $('#albumContainer');

        initPlupload();

        initSortable();

        $albumContainer.on('click', '.js_removeitem', function() {
            $(this).closest('li').remove();
        });

        initEditImage();

        $('#submit').click(function() {
            var rest;
            if (isUpdate) {
                rest = $.restPost('/api/album/modify', $.extend({
                    album_id: album_id
                }, serialize()));
            } else {
                rest = $.restPost('/api/album/create', serialize());
            }


            rest.done(function(msg) {
                alert(msg);
                location.href = '/album/mine';
            });

            rest.fail(function(msg) {
                alert(msg || '创建失败！');
            });
        });

        if (typeof album_id !== 'undefined') {
            var rest = $.restGet('/api/album/editinit', {
                album_id: album_id
            });

            rest.done(function(msg, data) {
                initForm(data);
            });

            rest.fail(function(msg) {
                alert(msg || '初始化数据出错');
            });
        }
    }

    function initForm(data) {
        $.each(data.items || [], function(index, item) {
            addItem(null, item.items_pic);
            $('.js-remark:last').val(item.remark);
        });

        util.initForm($('#albumForm'), data);

        tag.init(data.tags);

        editimage.initItems(data.items);
    }

    return {
        init: init
    }
});