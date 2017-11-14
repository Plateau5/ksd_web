
$(function(){

    /*var document_h = document.body.scrollHeight;
    $('.bgmask').css('height',document_h + 'px');*/

    //新建问题、重命名按钮交互
    $('.create_question').each(function(index){
        mouse_hover($('.create_question').eq(index),'create_question');
    });
    $('.reset_classify_name').each(function(index){
        mouse_hover($('.reset_classify_name').eq(index),'reset_classify');
    });

    //没有分类时创建
    $('#create_sub_btn').click(function() {
        $('#create_sub_btn').attr('disabled',true);
    	var classify_value = $('#classify_new_value').val();
        if(classify_value == ''){
            $('#create_sub_btn').attr('disabled',false);
            return;
        }
        var url = contextPath + "/api/question/classify/create";
        var vFD = new FormData(document.getElementById('form_new_create'));
        var oXHR = new XMLHttpRequest();
        oXHR.addEventListener('load', function(e) {
            var response = e.target.responseText;
            var data = JSON.parse(response);
            //成功
            if (data.error_code == '0') {
            	window.location.reload();
            } else {
                alert(data.error_msg);
                $('#create_sub_btn').attr('disabled',false);
            }

        }, false);
        oXHR.addEventListener('error', function(e) {
            alert("输入参数异常");
            return;
        }, false);
        oXHR.addEventListener('abort', function() {}, false);
        oXHR.open('POST', url);
        oXHR.send(vFD);
    });

    //打开弹出框
    $('#create').click(function(){
        $('.bgmask').css('display','block');
        $('#create_container').css('display','block');
        $('#reset_container').css('display','none');
    });
    $('.reset_classify_name').click(function(){
        var name = $(this).parent().prev().find('span').html();
        var id = $(this).parent().prev().attr('lang');
        $('#classify_id').val(id);
        $('.bgmask').css('display','block');
        $('#create_question').css('display','none');
        $('#reset_container').css('display','block');
        $('#create_container').css('display','none');
        $('#reset_classify_value').attr({
            'placeholder' : name,
            'value' : name
        });
    });
    $('.create_question').click(function(){
        var parent_id = $(this).parents('.question_classify_right').prev().attr('lang');
        $('#parent_id').val(parent_id);
        $('.bgmask').css('display','block');
        $('#create_question').css('display','block');
        $('#reset_container').css('display','none');
        $('#create_container').css('display','none');
    });

    //关闭弹出框
    $('.cancel_btn').click(function(){
        cancel_bg();
    });
    $('.bgmask').click(function(){
        cancel_bg();
    });

    //问题分类校验
    $('#create_classify_value').blur(function(){
        var class_name = $('#create_classify_value').val();
        if(!class_name){
            $('#classify_info_create .reset_name .question_edit_error').text('标题不能为空');
            return;
        }
        $('#classify_info_create .reset_name .question_edit_error').text('');
    });

    //新建分类
    $('#create_sub').click(function(){
        $('#create_sub').attr('disabled',true);
        var classify_value = $('#create_classify_value').val();
        if(!classify_value){
            $('#classify_info_create .reset_name .question_edit_error').text('标题不能为空');
            $('#create_sub').attr('disabled',false);
            return;
        }
        $('#classify_info_create .reset_name .question_edit_error').text('');
        var url = contextPath + "/api/question/classify/create";
        var vFD = new FormData(document.getElementById('classify_info_create'));
        var oXHR = new XMLHttpRequest();
        oXHR.addEventListener('load', function(e) {
            var response = e.target.responseText;
            var data = JSON.parse(response);
            //成功
            if (data.error_code == '0') {
            	window.location.reload();
            } else {
                alert(data.error_msg);
                $('#create_sub').attr('disabled',false);
            }

        }, false);
        oXHR.addEventListener('error', function(e) {
            alert("输入参数异常");
            return;
        }, false);
        oXHR.addEventListener('abort', function() {}, false);
        oXHR.open('POST', url);
        oXHR.send(vFD);
    });

    //重命名校验
    $('#reset_classify_value').blur(function(){
        var classify_value = $('#reset_classify_value').val();
        if(!classify_value){
            $('#classify_info_reset .reset_name .question_edit_error').text('标题不能为空');
            $('#reset_sub').attr('disabled',false);
            return;
        }
        $('#classify_info_reset .reset_name .question_edit_error').text('');
    });

    //分类重命名
    $('#reset_sub').click(function(){
        $('#reset_sub').attr('disabled',true);
        var classify_value = $('#reset_classify_value').val();
        if(!classify_value){
            $('#classify_info_reset .reset_name .question_edit_error').text('标题不能为空');
            $('#reset_sub').attr('disabled',false);
            return;
        }
        $('#classify_info_reset .reset_name .question_edit_error').text('');
        var url = contextPath + "/api/question/classify/update";
        var vFD = new FormData(document.getElementById('classify_info_reset'));
        var oXHR = new XMLHttpRequest();
        oXHR.addEventListener('load', function(e) {
            var response = e.target.responseText;
            var data = JSON.parse(response);
            //成功
            if (data.error_code == '0') {
            	window.location.reload();
            } else {
                alert(data.error_msg);
                $('#reset_sub').attr('disabled',false);
            }

        }, false);
        oXHR.addEventListener('error', function(e) {
            alert("输入参数异常");
            return;
        }, false);
        oXHR.addEventListener('abort', function() {}, false);
        oXHR.open('POST', url);
        oXHR.send(vFD);
    });

    //新建问题校验
    $('#create_question_value').blur(function(){
        var title = $('#create_question_value').val();
        if(!title){
            $('#question_info_create .reset_name .question_edit_error').text('标题不能为空');
            return;
        }
        $('#question_info_create .reset_name .question_edit_error').text('');
    });

    //新建问题
    $('#create_question_sub').click(function(){
        $('#create_question_sub').attr('disabled',true);
        var url = contextPath + "/api/question/create";
        var parent_id = $('#parent_id').val();
        var title = $('#create_question_value').val();
        if(!title){
            $('#question_info_create .reset_name .question_edit_error').text('标题不能为空');
            $('#create_question_sub').attr('disabled',false);
            return;
        }
        $('#question_info_create .reset_name .question_edit_error').text('');
        $.ajax({
            type: "post",
            url: url,
            dataType: "json",
            data: {
                parent_id: parent_id,
                title: title
            },
            async: false,
            success: function (data) {
                if(data.error_code =='0'){
                    cancel_bg();
                    window.location.reload();
                }else{
                    alert(data.error_msg);
                }
            }
        });
        $('#create_question_sub').attr('disabled',false);
    });

    //问题编辑弹层
    $('.question_edit').click(function(){
        var parent_id = $(this).attr('data_parentId');
        //console.log(parent_id);
        var question_id = $(this).attr('data_id');
        var title = $(this).parent().prev().text();
        $('#question_parent_id').val(parent_id);
        $('#id').val(question_id);
        $('#title').val(title);
        $('.bgmask').css('display','block');
        $('.question_reset_container').css('display','block');
    });

    //问题title校验
    $('#title').blur(function(){
        var title = $('#title').val();
        if(!title){
            $('#question_info .reset_name .question_edit_error').text('标题不能为空');
            $('#sure_sub').attr('disabled',false);
            return;
        }
        $('#question_info .reset_name .question_edit_error').text('');
        $('#sure_sub').attr('disabled',false);
    });

     //问题编辑
    $('#sure_sub').click(function(){
        $('#sure_sub').attr('disabled',true);
        var title = $('#title').val();
        if(!title){
            $('#question_info .reset_name .question_edit_error').text('标题不能为空');
            $('#sure_sub').attr('disabled',false);
            return;
        }
        $('#question_info .reset_name .question_edit_error').text('');
        var parent_id = $('#question_parent_id').val();
        var id = $('#id').val();
        var url = contextPath + "/api/question/update";
        $.ajax({
            type: "post",
            url: url,
            dataType: "json",
            data: {
                parent_id: parent_id,
                id: id,
                title: title
            },
            async: false,
            success: function (data) {
                if(data.error_code =='0'){
                    cancel_bg();
                    window.location.reload();
                }else{
                    alert(data.error_msg);
                    $('#sure_sub').attr('disabled',false);
                }
            }
        });
    });

    //删除问题弹层
    $('.question_del').click(function(){
        var id = $(this).attr('data_id');
        $('#delete_id').val(id);
        $('.bgmask').css('display','block');
        $('#del_question').css('display','block');
    });

    //删除
    $('#delete_sub').click(function(){
        $('#delete_sub').attr('disabled',true);
        var url = contextPath + "/api/question/delete";
        var vFD = new FormData(document.getElementById('question_info_delete'));
        var location_url = contextPath + '/question/getList';
        send_form(url,vFD,location_url,0);
    });

});

function cancel_bg(){
    $('.bgmask').css('display','none');
    $('#create_question').css('display','none');
    $('#create_container').css('display','none');
    $('#reset_container').css('display','none');
    $('.delete_question_container').css('display','none');
    $('.question_reset_container').css('display','none');
    $('#classify_info_create .reset_name .question_edit_error').text('');
    $('#question_info .reset_name .question_edit_error').text('');
    $('#classify_info_reset .reset_name .question_edit_error').text('');
    $('#question_info_create .reset_name .question_edit_error').text('');
}

