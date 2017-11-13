
//校验函数
function validate_form(required,obj,reg,error_txt){
    var val = obj.val();
    var reg = reg;
    if(required == '1'){
        if(!val){
            obj.parent().parent().find('.trueImg').css('display','');
            obj.parent().parent().find('.formError').html('此项内容不能为空');
            obj.css('border-color','#FB2741');
            return;
        }
    }else{
        if(!val){
            obj.parent().parent().find('.trueImg').css('display','');
            obj.parent().parent().find('.formError').html('');
            obj.css('border-color','#ccc');
            return;
        }
    }
    if(!reg.test(val)){
        obj.parent().parent().find('.trueImg').css('display','');
        obj.parent().parent().find('.formError').html(error_txt);
        obj.css('border-color','#FB2741');
        return;
    }
    obj.parent().parent().find('.trueImg').css('display','inline-block');
    obj.parent().parent().find('.formError').html('');
    obj.css('border-color','#ccc');
}