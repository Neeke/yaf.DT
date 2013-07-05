define(function() {
    $(function () {
        var arrowNext = $('.arrow-next'), arrowPrev = $('.arrow-prev');
        $(document).on('click', '.arrow-next', function () {
            var _this = $(this);
            fadeobj = _this.closest('.slideritem');
            if (fadeobj.next('.slideritem').index() > 0) {
                fadeobj.fadeOut();
                fadeobj.next('.slideritem').fadeIn();
            }
            else {
                $('.slideritem').eq(0).fadeIn().siblings('.slideritem').fadeOut()
            }
        });
        $(document).on('click', '.arrow-prev', function () {
            var _this = $(this);
            fadeobj = _this.closest('.slideritem');
            if (fadeobj.prev('.slideritem').index() > 0) {
                fadeobj.fadeOut();
                fadeobj.prev('.slideritem').fadeIn();
            }
            else {
                $('.slideritem').eq(0).fadeIn().siblings('.slideritem').fadeOut()
            }
        });
        $('.collection-button').bind('click', function () {
            $(this).addClass('on');
        });
        $('.itemshow').each(function () {
            var _this = $(this), _index = _this.index(), size = $('.itemshow').size();
            //(_index+1)+'/'+size
            _this.append('<div class="curnum"><a href="javascript:;" class="arrow-prev">&lt;&lt;</a>' + _index + '/' + size + '<a href="javascript:;" class="arrow-next">&gt;&gt;</a></div>');
        });
    });
});