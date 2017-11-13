
$(function(){

    //校验
    $("#old_pwd").blur(function(){
        old_pwd();
    });
    $("#old_pwd").keyup(function(){
        old_pwd();
    });

    $("#new_old").blur(function(){
        new_pwd();
    });
    $("#new_pwd").keyup(function(){
        new_pwd();
    });

    $("#sub_pwd").blur(function(){
        sub_pwd();
    });
    $("#sub_pwd").keyup(function(){
        sub_pwd();
    });

    //确认

    $('#edit_pwd_sure').click(function(){
        var attr = $(this).attr('disabled');
        if( attr == 'disabled'  ){
            return;
        }
        var url = contextPath + "/api/personal/resetpassword";
        var old_pwd = $("#old_pwd").val();
        var new_pwd = $("#new_pwd").val();
        var sub_pwd = $("#sub_pwd").val();
        $.post(url,{old_pwd:old_pwd,new_pwd:new_pwd,sub_pwd:sub_pwd},function(data){
            if(data.error_code == '0'){
                var h = $(window).height();
                $("#delS").css({
                    'height' : h + 'px',
                    'display' : 'block'
                });
            }else if(data.error_code == '1003'){
            	$('#old_pwd').parent().next().css('display','');
                $('#old_pwd').parent().next().next().html('旧密码输入错误');
                $('#old_pwd').css('border','1px solid #FB2741');
            }else{
            	alert(data.error_msg);
            }
        });
    });

    $('#delSBtn').click(function(){
        window.location.href = contextPath + "/login/logout";
    });
});

var flag1 = 1, flag2 = 1, flag3 = 1;
function old_pwd(){
    var val = $('#old_pwd').val();
    if( !val ){
        $('#old_pwd').parent().next().css('display','');
        $('#old_pwd').parent().next().next().html('');
        $('#old_pwd').css('border','1px solid #ccc');
        flag1 = 1;
    }else if( val.length < 6 || val.length > 16){
        $('#old_pwd').parent().next().css('display','');
        $('#old_pwd').parent().next().next().html('请输入6-16位字符');
        $('#old_pwd').css('border','1px solid #FB2741');
        flag1 = 1;
    }else{
        $('#old_pwd').parent().next().css('display','inline-block');
        $('#old_pwd').parent().next().next().html('');
        $('#old_pwd').css('border','1px solid #ccc');
        flag1 = 0;
    }
    flag(flag1, flag2, flag3);
}

function new_pwd(){
    var val = $('#new_pwd').val();
    var val2 = $('#sub_pwd').val();
    if( !val ){
        $('#new_pwd').parent().next().css('display','');
        $('#new_pwd').parent().next().next().html('');
        $('#new_pwd').css('border','1px solid #ccc');
        flag2 = 1;
    }else if( val.length < 6 || val.length > 16){
        $('#new_pwd').parent().next().css('display','');
        $('#new_pwd').parent().next().next().html('请输入6-16位字符');
        $('#new_pwd').css('border','1px solid #FB2741');
        flag2 = 1;
    }else if( val2 && val2 != val){
        $('#new_pwd').parent().next().css('display','inline-block');
        $('#new_pwd').parent().next().next().html('');
        $('#new_pwd').css('border','1px solid #ccc');
        $('#sub_pwd').parent().next().css('display','');
        $('#sub_pwd').parent().next().next().html('与新密码输入不一致');
        $('#sub_pwd').css('border','1px solid #FB2741');
        flag2 = 1;
        flag3 = 1;
    }else if(val2 && val2 == val){
        $('#new_pwd').parent().next().css('display','inline-block');
        $('#new_pwd').parent().next().next().html('');
        $('#new_pwd').css('border','1px solid #ccc');
        $('#sub_pwd').parent().next().css('display','inline-block');
        $('#sub_pwd').parent().next().next().html('');
        $('#sub_pwd').css('border','1px solid #ccc');
        flag2 = 0;
        flag3 = 0;
    }else{
        $('#new_pwd').parent().next().css('display','inline-block');
        $('#new_pwd').parent().next().next().html('');
        $('#new_pwd').css('border','1px solid #ccc');
        flag2 = 0;
    }
    flag(flag1, flag2, flag3);
}

function sub_pwd(){
    var val1 = $('#new_pwd').val();
    var val2 = $('#sub_pwd').val();
    if( !val2 ){
        $('#sub_pwd').parent().next().css('display','');
        $('#sub_pwd').parent().next().next().html('');
        $('#sub_pwd').css('border','1px solid #ccc');
        flag3 = 1;
    }else if( val1 == val2){
        $('#sub_pwd').parent().next().css('display','inline-block');
        $('#sub_pwd').parent().next().next().html('');
        $('#sub_pwd').css('border','1px solid #ccc');
        flag3 = 0;
        flag2 = 0;
    }else{
        $('#sub_pwd').parent().next().css('display','');
        $('#sub_pwd').parent().next().next().html('与新密码输入不一致');
        $('#sub_pwd').css('border','1px solid #FB2741');
        flag3 = 1;
    }
    flag(flag1, flag2, flag3);
}

function flag(num1, num2, num3){
    var flag;
    if( (num1 == 0) && (num2 == 0) && (num3 == 0)){
        $('#edit_pwd_sure').css('backgroundColor' , '#1DC6BC');
        $('#edit_pwd_sure').removeAttr('disabled');
        return;
    }
    $('#edit_pwd_sure').css('backgroundColor' , '#A0A0A0');
    $('#edit_pwd_sure').attr('disabled' , true);
}