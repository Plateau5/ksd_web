<!-- 同意 -->
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="per" uri="com/mvc/web/common/tag/permissionTag"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>客户管理-同意</title>
    {{include('./../inc/metaData')}}
    <link rel="stylesheet" href="/static/dialog/dialog-layer.css">
    <link rel="stylesheet" href="/static/css/employee/listCon.css">
    <link rel="stylesheet" href="/static/css/question/edit.css">
    <link rel="stylesheet" href="/static/css/requestpayout/agree.css">
    <script src="/static/js/question/submit_form.js"></script>
</head>
<style>
    .file_item{
        margin-left: 0;
    }
</style>

<body>

{{include('./../inc/header')}}

<!--container start-->

<div class="container minWidth">
    <div class="row section">
        <!--navLeft start-->
        {{include('./../inc/customer_slide_nav')}}

        <!--navLeft end-->


        <!--listCon start-->
        <div class=" listCon relative">
            <div class="listConHeader inviteCon" style="line-height: normal;margin-top:32px;">
                <ul>
                    <li class="inline colorB"><a class="TS" href="${contextPath }/financial/system">款项管理</a></li>
                    <li class="inline before"><a href="${contextPath }/financial/getWaitList">待审批</a></li>
                    <li class="inline before"><a href="javascript:" id="goDetail" data-url="${contextPath }/financial/getFile" data-id="${finance_id}">${vo.user_name }</a></li>
                    <li class="inline before"><a href="javascript:;" style="cursor:default">同意</a></li>
                </ul>
            </div>

            <form class="formML" id="request_info_agree" enctype="multipart/form-data" method="post">
                <input type="hidden" id="finance_id" name="finance_id" value="${finance_id }">
                <input type="hidden" name="request_status" value="${vo.request_status}">
                <input type="hidden" name="orderNo" value="${orderNo}">
                <input type="hidden" name="advance_id" value="${vo.advance_id}">
                <div class="form-item" style="height:100px;">
                    <div>
                        <textarea id="content" name="remark" placeholder="请输入原因,最多可输入500个字" maxlength="500" onfocus="this.placeholder='';this.style.color='#535E6A';" onblur="if(this.placeholder=='') {this.placeholder='';this.style.color='#A4A8AB';}"></textarea>
                    </div>
                </div>
                <div class="form-item" style="height:20px;">
                    <div class="img_item updata_img"  style="margin-top:0;margin-left:0;">
                        <div class="file_btn">上传图片</div>
                        <input type="file" id="file_select1" class="cursor file_input" name="file" onchange="select_allow(this);"/>
                        <span class="file_prom">(最多5张图片，每张大小不超过5M)</span>
                    </div>
                </div>
                <div class="form-item" style="margin-top:0;margin-left:0;">
                    <div class="file_box" style="margin-left:0;"></div>
                </div>
                <per:button code="1118">
                    <div class="form-item">
                        <div class="create_btn"   style="margin-left: 0">
                            <input type="button" class="create_sub" id="argee_sub" value="确认" data-url="${contextParh }/financial/print?print_type=current&orderNo=${orderNo}"/>
                            <a href="javascript:" class="go_detail" data-url="${contextPath }/financial/getFile" data-id="${finance_id}">
                                <input type="button" class="cancel_btn" value="取消">
                            </a>
                        </div>
                    </div>
                </per:button>
            </form>
        </div>

        <!--listCon end-->

    </div>


</div>

<!--container end-->

</body>
<script src="/static/dialog/dialog-layer.js"></script>
<script src="/static/js/requestpayout/agree.js"></script>
<script>
    $('.form-item').eq(0).css('marginTop','32px');
    isFinancial = true;//判断是否为财务

    $(function () {
        pageJump("#goDetail, .go_detail",{
            url : "/financial/getWaitList",
            active : "wait"
        });
    });
</script>
</html>


