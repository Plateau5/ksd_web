<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="per" uri="com/mvc/web/common/tag/permissionTag"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>客户-客户详情</title>
    <jsp:include page="/WEB-INF/inc/metaData.jsp"></jsp:include>
    <link rel="stylesheet" href="${contextPath}/static/css/employee/listCon.css"/>
	<link rel="stylesheet" href="${contextPath}/static/dialog/dialog-layer.css"/>
    <link rel="stylesheet" href="${contextPath}/static/css/finance/detail.css"/>
    <link rel="stylesheet" href="${contextPath}/static/css/requestpayout/detail.css"/>
</head>
<body>

<!--header start-->
<jsp:include page="/WEB-INF/inc/head.jsp"></jsp:include>
<!--header end-->

<!--container start-->

<div class="container minWidth">
    <div class="row section">
        <!--navLeft start-->
		<jsp:include page="/WEB-INF/inc/customer_slide_nav.jsp"></jsp:include>
        <!--navLeft end-->
    <form action="${contextPath}/finance/file/download" id="finance_download" method="post">
        <input id="finance_download_finance_id" value="${finance_id}" name="finance_id" type="hidden">
        <input id="user_name" value="${vo.user_name}" name="user_name" type="hidden">
        <input id="material_type" value="" name="material_type" type="hidden">
    </form>

        <!--inviteCon start-->

        <div class="listCon">
            <div class="listConHeader inviteCon" style="margin-bottom:20px;">
                <ul class="crumbs_nav">
                    <li class="inline colorB first_nav"><a class="TS" href="${contextPath}/financial/system">款项管理</a></li>
                    <li class="inline before  second_nav"><a href="${contextPath}${url}">${navigation}</a></li>
                    <li class="inline before"><a href="javascript:;">${vo.user_name }</a></li>
                    <li class="inline before"><a href="javascript:;" style="cursor:default">查看资料</a></li>
                </ul>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding:0">
                <input type="hidden" id="finance_id" value="${finance_id}">
                <input type="hidden" id="request_status" value="${vo.request_status }">
                <input type="hidden" id="orderNo" value="${orderNo }">
                <!--img_file start-->
				<jsp:include page="/WEB-INF/inc/entry_info.jsp"></jsp:include>
                <!--img_file end-->
				<!-- 基本信息 Begin -->
				<jsp:include page="/WEB-INF/inc/customer_basic_info.jsp"></jsp:include>
				<!-- 基本信息 End -->
				<!-- 合同资料 Begin -->
				<jsp:include page="/WEB-INF/inc/compact_info.jsp"></jsp:include>
				<!-- 合同资料 End -->
				<c:if test="${is_show eq 1 }">
                <!--requestpayout_detail start-->
                <c:if test="${vo.status >=10 }">
	                <div class="img_detail_title">
	                    <div class="title_line"></div>
	                    <span>请款资料</span>
	                </div>
	                <div class="requestpayout_detail_container">
						<jsp:include page="/WEB-INF/inc/requestpayout_info.jsp"></jsp:include>
						<div class="requestpayout_detail_btn_box">
	                    	<%--<c:if test="${url eq '/financial/pass/list' || url eq '/financial/getReturnList'}">
								<a href="${contextParh }/financial/print?orderNo=${orderNo}" target="_blank">
									<div class="cursor requestpayout_detail_btn print_btn" id="print_btn">打印</div>
								</a>
	                    	</c:if>--%>
	                        <div class="cursor requestpayout_detail_btn requestpayout_download download_file" id="" alt="2" lang="${finance_id}">全部下载</div>
		                    <c:if test="${url eq '/financial/getWaitList' && vo.present_id eq present_id && vo.receipt_id eq 1}">
		                        <per:button code="1186">
		                        	 <a href="javascript:" class="go_forward" data-url="${contextParh }/financial/transfer" data-id="${finance_id}" data-advance_id="${vo.advance_id}">
		                                <div class="cursor requestpayout_detail_btn requestpayout_care" id="care_btn">转交他人</div>
		                            </a>
			                    </per:button>
			                    <per:button code="1175">     
			                        <a href="javascript:" class="go_forward" data-url="${contextParh }/financial/toDisagree" data-id="${finance_id}" data-advance_id="${vo.advance_id}">
				                        <div class="cursor requestpayout_detail_btn requestpayout_disagree" data-advance_id="${vo.advance_id}" data-id="${finance_id}">不同意</div>
			                        </a>
			                    </per:button>
			                    <per:button code="1176">  
			                        <a href="javascript:" class="go_forward" data-url="${contextParh }/financial/toAgree" data-id="${finance_id}" data-advance_id="${vo.advance_id}">
			                        	<div class="cursor requestpayout_detail_btn requestpayout_agree" data-advance_id="${vo.advance_id}" lang="${finance_id}">同意</div>
			                        </a>
			                    </per:button>
		                    </c:if>
		                    <c:if test="${url eq '/financial/pass/list' && vo.receipt_id eq 1 && (vo.is_allReturn eq 0 || empty vo.is_allReturn) && (vo.advance_status eq 10 || vo.advance_status eq 11)}">
			                    <per:button code="1158">  
									<a href="javascript:;" class="btn_item affirm_return_money" lang="${finance_id}" data-advance_id="${vo.advance_id}">
										<div class="cursor requestpayout_detail_btn requestpayout_affirm" alt="2" data-advance_id="${vo.advance_id}" lang="${finance_id}">确认回款</div>
									</a>
			                    </per:button>
		                    </c:if>
		                    <c:if test="${url eq '/financial/pendingDispose/list' && vo.receipt_id eq 1 && vo.risk_type eq 3 && vo.is_OperationCommit eq 0}">
								<per:button code="1215">
									<a href="javascript:;"  lang="${finance_id}" data-advance_id="${vo.advance_id}">
										<div class="cursor requestpayout_detail_btn already_cashed_check"  lang="${finance_id}" data-advance_id="${vo.advance_id}">已回款</div>
									</a>
								</per:button>
							</c:if>
	                    </div>
	                </div>
                </c:if>
                <!--requestpayout_detail end-->

				<!-- 归档资料 start -->
					<jsp:include page="/WEB-INF/inc/pigeonhole_info.jsp"></jsp:include>
				<!-- 归档资料 end -->
				</c:if>


				<%--操作记录部分--%>
				<!-- 操作记录 Begin -->
				<jsp:include page="/WEB-INF/inc/operate_logs.jsp"></jsp:include>
				<!-- 操作记录 End -->


            </div>

        </div>


        <!--inviteCon end-->


    </div>

</div>

<!--container end-->


<div class="bgmask"></div>


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
        <input type="button" class="term_sub" id="care_sub" value="确定"  data-url="${contextPath}/financial/getWaitList">
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

	/*已回款标记*/
	function alreadyCashed () {
		var btn = $(".already_cashed_check");
		btn.on("click", function () {
			var t = $(this);
			var finance_id = $.trim(t.attr("lang"));
			locationTo({
				action : contextPath + "/financial/return/result",
				param : {
					finance_id : finance_id
				}
			});
			//window.location.href = contextPath + "/financial/return/result?finance_id=" + finance_id;
		})
	}
	$(function () {
		alreadyCashed();
		pageJump(".go_forward");

	});
</script>
<script src="${contextPath}/static/js/finance/img_detail.js"></script>
<script src="${contextPath}/static/dialog/dialog-layer.js"></script>
<script src="${contextPath}/static/js/requestpayout/detail.js"></script>
</body>
</html>