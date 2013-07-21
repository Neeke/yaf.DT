define(function(require) {

    require('rest');
    require('validate');
    var DK = require('dk');
    require('plupload');
    require('imagescale');
    require('jcrop');

    var avatarUrl;

    function initUpdatePwd() {

        var $form = $('#updatePasswordForm');

        $form.validate({
            rules: {
                'pwd[old]': {
                    required: true,
                    minlength: 6
                },
                'pwd[new]': {
                    minlength: 6
                },
                'pwd[repeat]': {
                    equalTo: '#newPwd'
                }
            },
            messages: {
                oldPwd: '密码不能为空'
            }
        });

        $('#updatePasswordBtn').click(function() {
            $('#updatePassword').show();
        });

        $('#savePwdBtn').click(function() {
            var rest = $.restPost('/api/user/set',  $form.serialize());
            return false;
        });

        $('#cancelBtn').click(function() {
            $form.get(0).reset();
            $('#updatePassword').hide();
            return false;
        });
    }

    function initUpdateAvatar() {
        $('#updateAvatarBtn').click(function () {
            var win = new DK.Window({
                title  : '',
                content: '#updateAvatarContent',
                bbar   : [{
                    type: 'normal',
                    text: '保存',
                    handler: function() {
                        var rest = $.restPost('/api/avatar/create', {
                            x: positionInfo.x,
                            y: positionInfo.y,
                            w: positionInfo.w,
                            h: positionInfo.h,
                            avatar_url: avatarUrl
                        });

                        rest.done(function(msg) {
                            alert(msg);
                        });

                        rest.fail(function(msg) {
                            alert(msg);
                        });

                        this.close();
                    }
                }]
            });
            win.show();

            setTimeout(function() {
                initPlupload();
            }, 1000);
        });
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
                    initCutImg();
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

    function initCutImg() {
        $('#srcAvatar').load(function() {
            imgHeight = $('#srcAvatar').height();
            imgWidth = $('#srcAvatar').width();

            $.Jcrop('#srcAvatar').destroy();

            $('#srcAvatar').Jcrop({
                boxWidth: 200,
                onChange: showPreview,
                onSelect: showPreview,
                aspectRatio: 1
            });
        });
    }

    $(function() {
        $(document).on('click', '.js-edit', function() {
            $(this).closest('.js-userinfo-item').addClass('editing');
        });

        $(document).on('click', '.js-submit', function() {
            var $item = $(this).closest('.js-userinfo-item');

            $item.removeClass('editing');

            var rest = $.restPost('/api/user/set', $item.find('form').serialize());

            rest.done(function(msg) {
                alert(msg);
            });

            rest.fail(function(msg) {
                alert(msg);
            });
        });

        initUpdateAvatar();

        initUpdatePwd();

        initCutImg();
    });


});