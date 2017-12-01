

//确认
$('#material_sub').on('click',function(){
    var _this = $(this);
    var advanceId = $.trim(_this.data('advance_id'));
    $('#material_sub').attr('disabled',true);
    var material_obj = $('.icon_check');
    var material_arr = [];
    var ids = [];
    var remark = $.trim($('#remark').val());
    for(var i = 0; i < material_obj.length; i++){
        var arr_inner = material_obj.eq(i).next().text();
        var material_id = $.trim(material_obj.eq(i).data('id'));
        material_arr.push(arr_inner);
        ids.push(material_id);
    }
    if(material_arr.length == 0){
        $('.error_prom').text('(请先选择所需材料)');
        $('#material_sub').attr('disabled',false);
        return;
    } else {
        $('.error_prom').text('');
    }
    var url = contextPath + '/api/pigeonhole/material';
    var finance_id = $('#finance_id').val();
    var data = {
        finance_id : finance_id,
        material : material_arr.join(','),
        remark : remark,
        material_ids : ids.join(','),
        advance_id : advanceId
    };
    var location_url = contextPath + '/customer/pigeonhole/detail?finance_id=' + finance_id;
    sub_btn(url,data,$('#material_sub'),location_url);
});


