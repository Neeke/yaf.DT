define(function(require) {
    var DK = require('dk');
    require('plupload');
    require('imagescale');
    var util = require('util');

    var $albumContainer;

    function addItem(id) {
        var tmpl = '<li>\
            <div class="libox">\
                <span class="up"></span>\
                <span class="down"></span>\
                <div class="thumb upload-item">\
                    <div class="upload-progress" id="progress{0}"></div>\
                </div>\
                <textarea placeholder="可以在这里写下图片描述..."></textarea>\
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
//            resize : {width : 118, height : 86, quality : 90},
//            flash_swf_url : '/resources/js/lib/plupload/plupload.flash.swf',
//            silverlight_xap_url : '../js/plupload.silverlight.xap',
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
                    var img = $(util.formatStr('<img src="{0}">', r.result));
                    $thumb.append(img);
                    img.imageScale({
                        width: 118,
                        height: 86
                    });
                }
            }
        });
    }

    $(function() {
        $albumContainer = $('#albumContainer');

        initPlupload();

        $albumContainer.on('click', '.js_removeitem', function() {
            $(this).closest('li').remove();
        });

        $albumContainer.on('click', '.js_edititem', function() {
            var win = new DK.Window({
                title: '编辑图片'
            });

            win.show();
        });
    });
});