<!-- 未通过 -->
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="per" uri="com/mvc/web/common/tag/permissionTag"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <jsp:include page="/WEB-INF/inc/css_source.jsp"></jsp:include>
    <link rel="stylesheet" href="${contextPath}/static/jedate/skin/jedate.css"/>
    <link rel="stylesheet" href="${contentPath}/static/css/manufacturing.css">
    <title>客户-审批管理</title>
</head>
<style>
    .overflow{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
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
            <form action="${contextPath}/operation/unpass/list" method="POST" id="form_search" role="form">
            </form>
            <div class="operation_category">
                <jsp:include page="/WEB-INF/inc/operation_category.jsp"></jsp:include>
            </div>
            <div class="filtrate">
                <jsp:include page="/WEB-INF/inc/filtrate.jsp"></jsp:include>
            </div>
            <div class="business_list">
                <form action="${contextPath }/operation/getFile" method="post" id="to_order_detail">
                    <input type="hidden" name="active" value="active">
                    <input type="hidden" name="finance_id" value="" id="financeId">
                </form>
                <jsp:include page="/WEB-INF/inc/customers_list.jsp"></jsp:include>
                <!--分页部分 Begin-->
                <div class="page_box">
                    <jsp:include page="/WEB-INF/inc/page_list.jsp"></jsp:include>
                </div>
                <!--分页部分 End-->
            </div>
        </div>
        <!---- Part of Main info End ---->
    </div>
</div>
</body>
<jsp:include page="/WEB-INF/inc/js_source.jsp"></jsp:include>
<script src="${contextPath}/static/jedate/jquery.jedate.min.js"></script>
<script src="${contextPath}/static/js/manufacturing.js" type="text/javascript" charset="UTF-8"></script>
<script>
    (function ($) {
        $(function() {

            initDateMinTodayForOrder('#filtrate_date');
            selectChange();
            toOrderDetail();
        });
    })(jQuery,undefined);
</script>
</html>