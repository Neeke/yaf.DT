define(function(require) {
    var DK = require('dk');
    require('rest');
    require('plupload');
    require('imagescale');
    require('jcrop');

    var avatarUrl;

    function initUpdateAvatar(selector) {
        $(document).on('click', selector, function () {
            var win = new DK.Window({
                title  : '',
                content: '#updateAvatarContent',
                width: 500,
                height: 440,
                bbar   : [{
                    type: 'normal',
                    text: '保存',
                    handler: function() {
                        var self = this;
                        var rest = $.restPost('/api/avatar/create', {
                            x: positionInfo.x,
                            y: positionInfo.y,
                            w: positionInfo.w,
                            h: positionInfo.h,
                            avatar_url: avatarUrl
                        });

                        rest.done(function(msg) {
                            alert(msg);
                            self.close();
                            location.reload();
                        });

                        rest.fail(function(msg) {
                            alert(msg);
                            self.close();
                        });
                    }
                }]
            });
            win.show();
        });

        initPlupload();
    }

    function initPlupload() {
        var uploader = new plupload.Uploader({
            runtimes : 'html5,flash,silverlight,browserplus',
            browse_button : 'updateAvatar',
            container: 'uploadCtnr',
            max_file_size : '5mb',
            url : '/api/avatar/upload',
            filters : [
                {title : "Image files", extensions : "jpg,gif,png"}
            ]
        });

        uploader.init();

        uploader.bind('FilesAdded', function(up, files) {
            uploader.start();
        });

        uploader.bind('UploadProgress', function(up, file) {
            var $progress = $('#progress');
            $progress.css({
                width: file.percent + '%'
            });
        });

        uploader.bind('FileUploaded', function(up, file, res) {
            var $progress = $('#progress');
            $progress.remove();

            if (res.response) {
                var r = $.parseJSON(res.response);
                if (r && r.code === 1000) {
                    $('.js-avatar').attr('src', r.data.avatar_url);

                    avatarUrl = r.data.avatar_url;
                }
            }
        });
    }

    var positionInfo;
    var imgHeight, imgWidth;
    function showPreview(coords) {
        preview(coords, $('#avatarSmallPreview'), 40, 40);
        preview(coords, $('#avatarNormalPreview'), 100, 100);
    }

    function preview(coords, $el, width, height) {
        positionInfo = coords;
        var rx = width / coords.w;
        var ry = height / coords.h;

        $el.css({
            width: Math.round(rx * imgWidth) + 'px',
            height: Math.round(ry * imgHeight) + 'px',
            marginLeft: '-' + Math.round(rx * coords.x) + 'px',
            marginTop: '-' + Math.round(ry * coords.y) + 'px'
        });
    }

    function cropImg($srcAvatar) {
        imgHeight = $srcAvatar.get(0).height;
        imgWidth = $srcAvatar.get(0).width;

        $.Jcrop('#srcAvatar').destroy();
        $('.jcrop-holder').remove();

        $srcAvatar.Jcrop({
            boxWidth: 200,
            onChange: showPreview,
            onSelect: showPreview,
            aspectRatio: 1,
            setSelect: [25, 25, 200, 200]
        });
    }

    function initCutAvatar() {
        var $srcAvatar = $('#srcAvatar');
        var timer;
        $srcAvatar.load(function() {
            clearTimeout(timer);
            timer = setTimeout(function() {
                cropImg($srcAvatar);
            }, 100);
        });
    }

    return {
        initCutAvatar: initCutAvatar,
        initUpdateAvatar: initUpdateAvatar
    }
});