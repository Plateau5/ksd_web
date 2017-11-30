<!--待审批 -->
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    {{include ("./../inc/cssSources")}}
    <link rel="stylesheet" href="/static/jedate/skin/jedate.css"/>
    <title>客户-其他款项</title>
</head>
<body>
<div id="wrapper" class="wrapper">
    <!-------- Part of header Begin -------->
    {{include ('./../inc/header')}}
    <!-------- Part of header End -------->

    <!-------- Part of main Begin -------->
    <div id="section" class="section normal_width">
        <!---- Part of slide nav Begin ---->
        {{include ('./../inc/sideNav')}}
        <!---- Part of slide na End ---->

        <!---- Part of Main info Begin ---->
        <div id="main" class="main">
            <form action="/otherfund/pending/list" method="POST" id="form_search" role="form">
            </form>
            <div class="operation_category">
                <jsp:include page="/WEB-INF/inc/operation_category.jsp"></jsp:include>
            </div>
            <div class="filtrate">
                <jsp:include page="/WEB-INF/inc/filtrate.jsp"></jsp:include>
            </div>
            <div class="business_list">
                <form action="{{markUri}}/otherfund/getFile" method="post" id="to_order_detail">
                    <input type="hidden" name="active" value="active">
                    <input type="hidden" name="finance_id" value="" id="financeId">
                </form>
                <jsp:include page="/WEB-INF/inc/otherfund_customer_list.jsp"></jsp:include>
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
{{include ('./../inc/jsSources')}}
<script src="/static/jedate/jquery.jedate.min.js"></script>
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