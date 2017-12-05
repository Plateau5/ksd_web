$(function(){

    ellipsis();

    //问题内容省略号
    function ellipsis() {
        $('.question-con').each(function(index){
            var val = $('.question-con').eq(index).html();
            var byte = getBt(val);
            if(byte >= 400){
                var new_inner = val.substring(0, 140) + "......";
                var inner = '<div class="detail-icon down-icon"></div>';
                $('.question-con').eq(index).html(new_inner);
                $('.question-con-box').append(inner);
            }
        });
    }

    //点击问题详细内容
    /*$('body').off('click').on('click', '.detail-icon', function(e){
        var e = e || window.event;
        e.preventDefault();
        e.stopPropagation();
        var question_val = $(this).parent().find('.question-val').val();
        var val = $(this).parent().find('question-con').text();
        var class_name = $(this).attr('class');
        if(class_name.indexOf('down-icon') >= 0){
            $(this).parent().find('.question-con').html(question_val);
            $(this).attr('class','detail-icon up-icon');
        }else{
            var byte = getBt(question_val);
            if(byte >= 400){
                var new_inner = question_val.substring(0, 140) + "......";
                $(this).parent().find('.question-con').html(new_inner);
            }
            $(this).attr('class','detail-icon down-icon');

        }
    });*/

    //动态获取问题列表
    $('#question_classify_name').change(function(){
        // OPERATIONTYPE：1：请款客服；2：合同客服；3：商户审核
        if (OPERATIONTYPE === 1 || OPERATIONTYPE === 2) {
            var url = contextPath + "/api/getQuestionByClassifyId";
        } else if (OPERATIONTYPE === 3) {
            var url = contextPath + "/api/getMerQuestionByClassifyId";
        }
        var question_classify = $(this).val();
        var inner = '';
        $.ajax({
            type: "post",
            url: url,
            dataType: "json",
            data: {parent_id: question_classify},
            async: false,
            success: function (data) {
                $('.check').remove();
                $('.question_container').empty();
                if(data.data.length == 0){
                    inner = '<div class="question_container_prom">该分类暂无问题详情，请重新选择问题分类</div>';
                    $('.question_container').append(inner);
                    return;
                }
                //$('.question_container').empty();
                $.each(data.data, function (n, value) {
                    inner += '<div class="question-con-box"><div class="check"><div class="check_img icon_uncheck" data_id="' + value.id + '"></div><span>' + value.value + '</span></div><input type="hidden" class="question-val" value="' + value.content +'"></div>';
                });
                $('.question_container').append(inner);
                ellipsis();
            }
        });
    });


    //确认提交
    $("#message_sub").click(function(){
        $("#message_sub").attr('disabled',true);
        var reason_arr = [];
        var ids_arr = [];
        var icon_check = $('.icon_check');
        for(var i = 0, len = icon_check.length; i < len; i++){
            var inner = icon_check.eq(i).next().html();
            var ids = icon_check.eq(i).attr('data_id');
            reason_arr.push(inner);
            ids_arr.push(ids);
        }
        if(reason_arr.length == 0){
            $('.question_container').next().html('(请先选择问题详情)');
            $("#message_sub").attr('disabled',false);
            return;
        }
        $('#reason').val(reason_arr.join(','));
        $('#question_ids').val(ids_arr.join(','));
        var url = contextPath + "/api/finance/disqualification";
        var vFD = new FormData(document.getElementById('message_info'));
        var oXHR = new XMLHttpRequest();
        oXHR.addEventListener('load', function(e) {
            var response = e.target.responseText;
            var data = JSON.parse(response);
            //成功
            if (data.error_code == '0') {
                window.location.href = contextPath + '/finance/getCheckInList';
                //window.history.go(-1);
            } else {
                alert(data.error_msg);
            }

        }, false);
        oXHR.addEventListener('error', function(e) {
            alert("输入参数异常");
            return;
        }, false);
        oXHR.addEventListener('abort', function() {}, false);
        oXHR.open('POST', url);
        oXHR.send(vFD);
        $("#message_sub").attr('disabled',false);
    });

   /* //关闭提示页
    $("#sub_notice").click(function(){
        $("#delS").css("display","none");
        window.location.href=contextPath + "/finance/getCheckInList";
    })*/

    //选择的提交逻辑
    //$('#disagree_sub').click(function(){
    //    $('#disagree_sub').attr('disabled',true);
    //    var url = contextPath + "/api/finance/disqualification";
    //    var finance_id = $('#finance_id').val();
    //    var request_status = $('#request_status').val();
    //    var check_obj = $('.icon_check');
    //    var question_id_arr = [];
    //    var remark_arr = [];
    //    for(var i = 0; i < check_obj.length; i++){
    //        var check_id = check_obj.eq(i).attr('data_id');
    //        var check_inner = check_obj.eq(i).next().html();
    //        question_id_arr.push(check_id);
    //        remark_arr.push(check_inner);
    //    }
    //    if(question_id_arr.length == 0){
    //        $('#disagree_sub').attr('disabled',false);
    //        return;
    //    }
    //    $.ajax({
    //        type:"post",
    //        url :url,
    //        dataType:"json",
    //        async:false,
    //        data:{
    //            finance_id : finance_id,
    //            request_status : request_status,
    //            question_ids : question_id_arr.join(','),
    //            remark : remark_arr.join(',')
    //        },
    //        error:function(xhr,status,err){
    //            alert("系统异常");
    //        },
    //        success:function(data){
    //            if(data.error_code =='0'){
    //                //成功跳转
    //                window.location.href = contextPath + '/requestPayout/getFile?finance_id=' + finance_id;
    //            }else{
    //                alert(data.error_msg);
    //            }
    //        }
    //    });
    //    $('#disagree_sub').attr('disabled',false);
    //})
});

//计算字节
function getBt(str){
    var char = str.match(/[^\x00-\xff]/ig);
    return str.length + (char == null ? 0 : char.length);
}