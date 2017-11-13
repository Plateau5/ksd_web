
$(function(){
    $('body').off('click').on('click','.check_img',function(e){
        var e = e || window.event;
        e.preventDefault();
        e.stopPropagation();
        var class_check = $(this).attr('class');
        var checkImgLength = $(".check .check_img").length;
        var checkedLength;

        if(class_check.indexOf('icon_uncheck') >= 0){
            $(this).addClass('icon_check');
            $(this).removeClass('icon_uncheck');
            checkedLength = $(".check .icon_check").length;
        }else{
            $(this).addClass('icon_uncheck');
            $(this).removeClass('icon_check');
            checkedLength = $(".check .icon_check").length;
        }
        if(checkImgLength == checkedLength) {
            $(".select_all_btn .check_img").removeClass('icon_uncheck').addClass('icon_check');
        } else {
            $(".select_all_btn .check_img").removeClass('icon_check').addClass('icon_uncheck');
        }

        var checkedElem = $('.icon_check');
        if (checkedElem.length > 0) {
            $('.error_prom').text('');
        } else {
            $('.error_prom').text('(请先选择问题详情)');
        }
    });
});