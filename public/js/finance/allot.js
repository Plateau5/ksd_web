$(function(){
    //finance����


    $(".toAllot").click(function(){
		var finance_id = $(this).attr('lang');
		$("#to_allot_finance_id").val(finance_id);
		$("#toAllot").submit();
	});
});