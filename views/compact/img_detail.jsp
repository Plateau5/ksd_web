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
    <link rel="stylesheet" href="/static/dialog/dialog-layer.css"/>
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
        <form action="/finance/file/download" id="finance_download" method="post">
            <input id="finance_download_finance_id" value="${finance_id}" name="finance_id" type="hidden">
            <input id="user_name" value="${vo.user_name}" name="user_name" type="hidden">
            <input id="material_type" value="" name="material_type" type="hidden">
        </form>

        <!--inviteCon start-->

        <div class="listCon">
            <div class="listConHeader inviteCon" style="margin-bottom:20px;">
                <ul class="crumbs_nav">
                    <li class="inline colorB first_nav"><a class="TS" href="/compact/system">合同管理</a></li>
                    <li class="inline before second_nav"><a href="${url}">${navigation}</a></li>
                    <li class="inline before"><a href="javascript:;">${vo.user_name }</a></li>
                    <li class="inline before"><a href="javascript:;" style="cursor:default">查看资料</a></li>
                </ul>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding:0">
                <input type="hidden" id="finance_id" value="${finance_id}">
                <input type="hidden" id="request_status" value="${vo.request_status }">
                <input type="hidden" id="orderNo" value="${orderNo }">
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
                                <c:if test="${url eq '/financial/getWaitList' && vo.present_id eq present_id}">
                                    <!--<per:button code="1186">-->
                                        <!--<a href="javascript:" class="go_forward" data-url="${contextParh }/financial/transfer" data-id="${finance_id}">-->
                                            <!--<div class="cursor requestpayout_detail_btn requestpayout_care" id="care_btn">转交他人</div>-->
                                        <!--</a>-->
                                    <!--</per:button>-->
                                    <per:button code="1175">
                                        <a href="javascript:" class="go_forward" data-url="${contextParh }/compact/disagree" data-id="${finance_id}" data-advance_id="${vo.advance_id}">
                                            <div class="cursor requestpayout_detail_btn requestpayout_disagree">不同意</div>
                                        </a>
                                    </per:button>
                                    <per:button code="1176">
                                        <a href="javascript:" class="go_forward" data-url="${contextParh }/compact/agree" data-id="${finance_id}" data-advance_id="${vo.advance_id}">
                                            <div class="cursor requestpayout_detail_btn requestpayout_agree" lang="${finance_id}">同意</div>
                                        </a>
                                    </per:button>
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

<script>
    var btn = $('.detail_btn1').length;
    if(btn != '0'){
        $('.imgDetail').css('margin-top','25px');
    }else{
        $('.imgDetail').css('margin-top','0');
    }
    $(function () {
        pageJump(".go_forward");

    });
</script>
<script src="/static/js/finance/img_detail.js"></script>
<script src="/static/dialog/dialog-layer.js"></script>
<script src="/static/js/requestpayout/detail.js"></script>
</body>
</html>