<%-- 未通过页面 --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <jsp:include page="/WEB-INF/inc/css_source.jsp"></jsp:include>
    <link rel="stylesheet" href="${contextPath}/static/css/orderDetails.css">
    <link rel="stylesheet" href="${contextPath}/static/css/customerService.css">
    <title>客户-历史订单记录</title>
</head>
<body>
<div id="wrapper" class="wrapper">
    <!-------- Part of header Begin -------->
    <jsp:include page="/WEB-INF/inc/head.jsp"></jsp:include>
    <!-------- Part of header End -------->

    <!-------- Part of main Begin -------->
    <div id="section" class="section normal_width">
        <!---- Part of slide nav Begin ---->
        <jsp:include page="/WEB-INF/inc/customer_slide_nav.jsp"></jsp:include>
        <!---- Part of slide na End ---->

        <!---- Part of Main info Begin ---->
        <div id="main" class="main">
            <form action="${contextPath}" method="POST" id="form_search" role="form">
            </form>
            <div class="crumbs_nav">
                <a href="${contextPath}${url_first}" class="crumbs_item">${navigation_first}</a>
                <a href="${contextPath}${url_second}" class="crumbs_item">${navigation_second }</a>
                <a href="javascript:window.history.back();" class="crumbs_item">查看资料</a>
                <a href="javascript:;" class="crumbs_item">申请记录（${user_name}）</a>
            </div>
            <div class="record_container">
                <div class="details_item operate_info">
                    <div class="detail_title">申请记录</div>
                    <div class="apply_record">
                        <ul class="record_list">
                            <!--操作记录列表-->
                            <c:forEach items="${list }" var="bean">
	                            <li class="list_item">
	                                <div class="record_item_info">
	                                    <div class="date">${bean.modify_time}</div>
	                                    <div class="text">
	                                        <div class="apply_desc">
	                                            <div class="desc_item apply_product"><span class="key">申请产品：</span><span class="value">${bean.product_name}</span></div>
	                                            <div class="desc_item"><span class="key">贷款类型：</span><span class="value"><c:if test="${bean.car_type eq 0}">新车</c:if><c:if test="${bean.car_type eq 1}">二手车</c:if></span></div>
	                                            <div class="desc_item"><span class="key">申请贷款：</span><span class="value">${bean.loan_amount}万</span></div>
	                                            <div class="desc_item"><span class="key">状态：</span><span class="value">${bean.status_value}</span></div>
	                                        </div>
	                                        <c:forEach items="${bean.data }" var="bean1">
		                                        <div class="record_log">
		                                            <div class="unpass_item">
		                                                <span class="key">${bean1.modify_name }：${bean1.reason }</span><span class="value"></span>
		                                            </div>
		                                        </div>
	                                        </c:forEach>
	                                    </div>
	                                </div>
	                            </li>
                            </c:forEach>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
        <!---- Part of Main info End ---->
    </div>
</div>
</body>
<jsp:include page="/WEB-INF/inc/js_source.jsp"></jsp:include>
<script>
    (function ($) {



        $(function() {


        });
    })(jQuery,undefined);
</script>
</html>