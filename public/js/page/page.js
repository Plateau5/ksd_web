$(function($){

	$("ul.pagesBox a").click(function(){
		var id = $(this).parents().find("form[role='form']").attr('id');
		var currentPage = $(this).attr('currentPage');
		var limit = $(this).attr('limit');
		var time = $("#laydate").val() || '';
		var cityId = Number($("select[id='city']").val());
		var alreadyReq = $("select[id='request_type']").val();
		if(cityId == ''){
			cityId = "";
		}
		var start_with = $("div[class='city day name']").find('.city_active').text();
		if (start_with == '全部') {
			start_with = "";
		}
		time && $("#"+id).append('<input type="hidden" id="time" name="time" value="'+ time+ '" />');
		start_with && $("#"+id).append('<input type="hidden" id="start_with" name="start_with" value="'+ start_with + '" />');
		cityId && $("#"+id).append('<input type="hidden" id="city_id" name="city_id" value="'+ cityId + '" />');
		if (alreadyReq != undefined && alreadyReq != "" && alreadyReq != '' && !isNaN(alreadyReq)) {
			$("#"+id).append('<input type="hidden" id="request_type" name="already_request" value="'+ alreadyReq + '" />');
		}
		$("#"+id).append('<input type="hidden" id="limit" name="limit" value='+limit+'>');
		$("#"+id).append('<input type="hidden" id="currentPage" name="currentPage" value='+currentPage+'>');
		$("#"+id).submit();
	});

	$(".forward").hover(function(){
		$(".forwardIcon").css('background','url(/static/img/employee/forward_disable.png)');
	},function(){
		$(".forwardIcon").css('background','url(/static/img/employee/forwardIcon.png)');
	});

	$(".next").hover(function(){
		$(".nextIcon").css('background','url(/static/img/employee/next_disable.png)');
	},function(){
		$(".nextIcon").css('background','url(/static/img/employee/nextIcon.png)');
	});

	$("li[class='inline cursor forward pagesDisable']").hover(function(){
		$(".forwardIcon").css('background','url(/static/img/employee/forward_disable.png)');
	},function(){
		$(".forwardIcon").css('background','url(/static/img/employee/forward_disable.png)');
	});

	$("li[class='inline cursor next pagesDisable']").hover(function(){
		$(".nextIcon").css('background','url(/static/img/employee/next_disable.png)');
	},function(){
		$(".nextIcon").css('background','url(/static/img/employee/next_disable.png)');
	});

	$("select[id='city']").change(function(){
		timeSearchList();
	});
	$("select[id='request_type']").change(function(){
		timeSearchList();
	});
	$("div.city").find('.city_search').on("click", function(){
		timeSearchList();
	});

	/*$("div[class='city day name']").find(".city_search").click(function(){
		timeSearchList();
	});*/


});
function timeSearchList(){
	var id = $("form[role='form']").attr('id');
	var time = $("#laydate").val() || '';

	var cityId = Number($("select[id='city']").val());
	var alreadyReq = $("select[id='request_type']").val();

	if(cityId == ''){
		cityId = "";
	}

	var start_with = $("div[class='city day name']").find('.city_active').text();
	if (start_with == '全部') {
		start_with = "";
	}
	time && $("#"+id).append('<input type="hidden" id="time" name="time" value="'+ time+ '" />');
	start_with && $("#"+id).append('<input type="hidden" id="start_with" name="start_with" value="'+ start_with + '" />');
	cityId && $("#"+id).append('<input type="hidden" id="city_id" name="city_id" value="'+ cityId + '" />');
	if (alreadyReq!=undefined && alreadyReq != "" && alreadyReq != '' && !isNaN(alreadyReq)) {
		$("#"+id).append('<input type="hidden" id="request_type" name="already_request" value="'+ alreadyReq + '" />');
	}
	//$('#city_id').val(cityId);
	$("#"+id).submit();

}
