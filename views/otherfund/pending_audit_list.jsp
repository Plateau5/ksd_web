<!--待审批 -->
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    {{include('./../inc/cssSources')}}
    <link rel="stylesheet" href="/static/jedate/skin/jedate.css"/>
    <title>客户管理-其他款项</title>
</head>
<body>
<div id="wrapper" class="wrapper">
    <!-------- Part of header Begin -------->
    {{include('./../inc/header')}}
    <!-------- Part of header End -------->

    <!-------- Part of main Begin -------->
    <div id="section" class="section normal_width">
        <!---- Part of slide nav Begin ---->
        {{include('./../inc/customer_slide_nav')}}
        <!---- Part of slide na End ---->

        <!---- Part of Main info Begin ---->
        <div id="main" class="main">
            <form action="/otherfund/pending/list" method="POST" id="form_search" role="form">
            </form>
            <div class="operation_category">
                {{include('./../inc/operation_category')}}
            </div>
            <div class="filtrate">
                {{include('./../inc/filtrate')}}
            </div>
            <div class="business_list">
                <form action="${contextPath }/otherfund/getFile" method="post" id="to_order_detail">
                    <input type="hidden" name="active" value="active">
                    <input type="hidden" name="finance_id" value="" id="financeId">
                </form>
                <c:if test="${count >0 }">
                    <ul class="finance_list">
                        <c:forEach items="${list}" step="1" var="bean" varStatus="status">

                            <li class="list_item"  lang="${bean.finance_id}">
                                <div class="create_date">进件时间：${bean.create_time } / ${bean.city_name}</div>
                                <div class="list_item_detail">
                                    <div class="shake_box">
                                        <c:if test="${bean.is_throw eq 1}">
                                            <div class="shake shook_sign shuai">甩</div>
                                        </c:if>
                                    </div>
                                    <div class="user_info">
                                        <div class="user_photo" style="margin-top: 20px;">
                                            <div class="lender name_color${status.count}">${fn:substring(bean.user_name, 0, 1)}</div>
                                        </div>
                                        <div class="user_name nor_wrap">${bean.user_name}</div>
                                    </div>
                                    <div class="finance_desc">
                                        <dl class="effect_one">
                                            <dt class="font12">申请贷款产品</dt>
                                            <dd class="nor_wrap font14">${bean.product_name}</dd>
                                        </dl>
                                        <dl  class="effect_two">
                                            <dt class="font12">贷款类型</dt>
                                            <dd class="font14 overflow" title="<c:if test="${bean.car_type eq 0}">新车 </c:if><c:if test="${bean.car_type eq 1}">二手车 </c:if>">
                                                <c:if test="${bean.car_type eq 0}">新车 </c:if><c:if test="${bean.car_type eq 1}">二手车 </c:if>
                                            </dd>
                                        </dl>
                                        <dl class="effect_two">
                                            <dt class="font12">车系</dt>
                                            <dd class="nor_wrap font14">${bean.series_name}</dd>
                                        </dl>
                                        <dl class="effect_two">
                                            <dt class="font12">付款总额</dt>
                                            <dd class="font14">100000 元</dd>
                                        </dl>
                                        <dl class="effect_two">
                                            <dt class="font12">收款名称</dt>
                                            <dd class="font14">抵押方收款</dd>
                                        </dl>
                                        <dl  class="effect_two">
                                            <dt class="font12">${bean.position_desc}</dt>
                                            <dd class="nor_wrap font14">${bean.create_name}</dd>
                                        </dl>
                                    </div>
                                </div>

                            </li>
                        </c:forEach>
                    </ul>
                </c:if>
                <c:if test="${count eq 0 }">
                    {{include('./../inc/empty_data')}}
                </c:if>
                <!--分页部分 Begin-->
                <div class="page_box">
                    {{include('./../inc/pagination')}}
                </div>
                <!--分页部分 End-->
            </div>
        </div>
        <!---- Part of Main info End ---->
    </div>
</div>
</body>
{{include('./../inc/jsSources')}}
<script src="/static/jedate/jquery.jedate.min.js"></script>
<script>
    (function ($) {
        $(function() {
            initDateMinTodayForOrder('#filtrate_date');
            selectorChange();
            toOrderDetail();
        });
    })(jQuery,undefined);
</script>
</html>