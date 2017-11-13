<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="per" uri="com/mvc/web/common/tag/permissionTag"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>客户管理-客户详情</title>
    {{include('./../inc/metaData')}}
    <link rel="stylesheet" href="/static/css/employee/listCon.css"/>
    <link rel="stylesheet" href="/static/css/finance/detail.css"/>
    <link rel="stylesheet" href="/static/css/requestpayout/detail.css"/>
</head>
<body>

<!--header start-->
{{include('./../inc/header')}}
<!--header end-->

<!--container start-->

<div class="container minWidth">
    <div class="row section">
        <!--navLeft start-->
        {{include('./../inc/customer_slide_nav')}}
        <!--navLeft end-->
	<form action="/finance/picture/reason" id="picture_reason_form" method="post">
        <input id="finance_id_picture_reason" value="${finance_id}" name="finance_id" type="hidden">
        <input value="${vo.user_name}" name="user_name" type="hidden">
        <input value="${vo.create_name}" name="create_name" type="hidden">
        <input type="hidden" id="reason_inner" name="reason_inner" value="">
    </form>
    <form action="/finance/file/download" id="finance_download" method="post">
        <input id="finance_download_finance_id" value="${finance_id}" name="finance_id" type="hidden">
        <input id="user_name" value="${vo.user_name}" name="user_name" type="hidden">
        <input id="material_type" value="" name="material_type" type="hidden">
    </form>

        <!--inviteCon start-->

        <div class="listCon">
            <div class="listConHeader inviteCon" style="margin-bottom:20px;">
                <ul class="crumbs_nav">
                    <li class="inline colorB first_nav"><a class="TS" href="/pigeonhole/system">归档管理</a></li>
                    <li class="inline before second_nav"><a href="${url}">${navigation}</a></li>
                    <li class="inline before"><a href="javascript:;">${vo.user_name }</a></li>
                    <li class="inline before"><a href="javascript:;" style="cursor:default">查看资料</a></li>
                </ul>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding:0">
                <input type="hidden" id="finance_id" value="${finance_id}">
                <input type="hidden" id="request_status" value="${vo.request_status }">
                <!--img_file start-->
				{{include('./../inc/entry_info')}}
                <!--img_file end-->
				<!-- 基本信息 Begin -->
				{{include('./../inc/customer_basic_info')}}
				<!-- 基本信息 End -->
				<!-- 合同资料 Begin -->
				{{include('./../inc/compact_info')}}
				<!-- 合同资料 End -->
                <!--requestpayout_detail start-->
                <c:if test="${vo.status >=10 }">
					<div class="img_detail_title">
						<div class="title_line"></div>
						<span>请款资料</span>
					</div>
					<div class="requestpayout_detail_container">
						{{include('./../inc/requestpayout_info')}}
						<div class="requestpayout_detail_btn_box">
							<div class="cursor requestpayout_detail_btn requestpayout_download download_file" id="" alt="2" lang="${finance_id}">全部下载</div>
							<c:if test="${vo.status eq 12}">
								<c:if test="${vo.is_pigeonhole eq 0}">
									<per:button code="1121">
										<div class="cursor requestpayout_detail_btn requestpayout_flied" id="flied_btn" lang="${finance_id}" data-advance_id="${vo.advance_id}">确认归档</div>
									</per:button>
								</c:if>
								<c:if test="${not empty vo.pigeonhole_material && vo.express_type eq 0 && day > 0}">
									<per:button code="1124">
										<div class="cursor requestpayout_detail_btn requestpayout_time" id="term_btn" lang="${finance_id}" data-advance_id="${vo.advance_id}">期限提醒</div>
									</per:button>
								</c:if>
								<c:if test="${empty vo.pigeonhole_material}">
									<per:button code="1117">
										<a href="javascript:" class="go_forward" data-id="${finance_id}" data-url="${contextParh }/pigeonhole/toMaterial" data-advance_id="${vo.advance_id}">
											<div class="cursor requestpayout_detail_btn requestpayout_material" id="" lang="${finance_id}">通知所需材料</div>
										</a>
									</per:button>
								</c:if>
							</c:if>
						</div>
					</div>
                </c:if>
                <!--requestpayout_detail end-->

				<!-- 归档资料 start -->
				{{include('./../inc/pigeonhole_info')}}
				<!-- 归档资料 end -->



				<!--操作记录部分-->
				<!-- 操作记录 Begin -->
				{{include('./../inc/operate_logs')}}
				<!-- 操作记录 End -->


            </div>

        </div>


        <!--inviteCon end-->


    </div>

</div>

<!--container end-->


<div class="bgmask"></div>
<!--期限提醒-->
<div class="resquestpayout_term_container" id="term_container">
    <div class="term_title">期限提醒</div>
    <div class="term_time">
        已超过
        <span type="text" id="day"  name="day"  maxlength="3" readonly="readonly">${day}</span>
        天未归档，请尽快归档。
    </div>
    <div class="term_btn">
        <input type="button" class="term_sub" data-advance_id="${vo.advance_id}" id="term_sub" value="确定"  data-url="/pigeonhole/getWaitList">
        <input type="button" class="cancel_btn" value="取消">
    </div>
</div>

<!--确认归档-->
<div class="resquestpayout_term_container" id="flied_container">
    <div class="term_title">确认归档</div>
    <div class="flied_txt">
        您确定将此订单归档吗？
    </div>
    <div class="flied_btn">
        <input type="button" class="flied_sub" data-advance_id="${vo.advance_id}" id="flied_sub" value="确定"  data-url="/pigeonhole/getWaitList">
        <input type="button" class="cancel_btn" value="取消">
    </div>
</div>

<!--转交他人-->
<div class="resquestpayout_term_container" id="care_container">
    <div class="term_title">转交他人</div>
    <div class="care_txt">
        确认将此订单转交给
        <select name="emp_id" id="emp_id">
            <c:forEach items="${emp_list }" var="bean">
                <option value="${bean.id}">${bean.name}</option>
            </c:forEach>
        </select>
    </div>
    <div class="care_btn">
        <input type="button" class="term_sub" id="care_sub" value="确定"  data-url="/pigeonhole/getWaitList">
        <input type="button" class="cancel_btn" value="取消">
    </div>
</div>
<script>
    var btn = $('.detail_btn1').length;
    if(btn != '0'){
        $('.imgDetail').css('margin-top','25px');
    }else{
        $('.imgDetail').css('margin-top','0');
    }
	pageJump(".go_forward",{
		car_type : ${vo.car_type}
	});
</script>
<script src="/static/js/finance/img_detail.js"></script>
<script src="/static/js/requestpayout/detail.js"></script>
</body>
</html>