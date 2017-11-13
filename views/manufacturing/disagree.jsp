<!-- 不同意 -->
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="per" uri="com/mvc/web/common/tag/permissionTag"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>客户管理-不同意</title>
    {{include('./../inc/metaData')}}
    <link rel="stylesheet" href="/static/css/employee/listCon.css">
    <link rel="stylesheet" href="/static/css/finance/imgUnpass.css"/>
    <link rel="stylesheet" href="/static/css/question/edit.css">
    <link rel="stylesheet" href="/static/css/requestpayout/disagree.css">
</head>
<style>
    .form-item{
        margin-left:12px;
    }
    .error{
        width: auto;
        height: 30px;
        color: #FB2741;
        font-size: 12px;
        text-align: left;
        line-height: 30px;
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
            <div class="listConHeader inviteCon" style="line-height: normal;padding-left:12px;margin-top:32px;">
                <ul>
                    <li class="inline colorB"><a class="TS" href="${contextPath }/operation/system">审批管理</a></li>
                    <li class="inline before"><a href="${contextPath }/operation/getWaitList">待审批</a></li>
                    <li class="inline before"><a href="javascript:window.history.back();">${vo.user_name }</a></li>
                    <li class="inline before"><a href="javascript:;" style="cursor:default">不同意</a></li>
                </ul>
            </div>
	            <!--照片不合格 开始-->
	            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
	                <form action="" id="send_info" enctype="multipart/form-data" method="post">
                        <input type="hidden" name="finance_id" value="${finance_id }">
                        <input type="hidden" name="request_status" value="${vo.request_status}">
                        <input type="hidden" name="question_ids" value="">
                        <input type="hidden" name="reason" value="">
                        <input type="hidden" name="advance_id" value="${vo.advance_id}">
	                    <textarea class="reasonBox" id="remark" name="remark" placeholder="备注：（如缺少资料等）" style="margin-left:0;" maxlength="200" onfocus="this.style.color = '#535E6A';" onblur="if(this.value==''){this.style.color = '#A4A8AB'}else{this.style.color = '#535E6A';}"></textarea>
                        <div class="form-item" style="height:20px;margin-left:0;">
                            <div class="img_item updata_img" style="margin-left:0;">
                                <div class="file_btn">上传图片</div>
                                <input type="file" id="file_select1" class="cursor file_input" name="file" onchange="select_allow(this);" accept="image/jpeg,image/jpg,image/png"/>
                                <span class="file_prom">(最多5张图片，每张大小不超过5M)</span>
                            </div>
                        </div>
                        <div class="form-item" style="margin-top:0;margin-left:-20px;">
                            <div class="file_box" style="margin-left:0;">


                            </div>
                        </div>
                        <span class="error"></span>
                        <!--<input type="button" class="send" id="sendBtn" value="确认发送"/>-->
                        <per:button code="1119">
                            <div class="form-item" style="margin-left: 0;">
                                <div class="create_btn" style="margin-left: 0;">
                                    <input type="button" class="send" data-advance_id="${vo.advance_id}" id="sendBtn" value="确认发送" data-url="/operation/getWaitList"  style="margin:0;"/>
                                    <a href="javascript:window.history.back();">
                                        <input type="button" class="cancel_btn" value="取消">
                                    </a>
                                </div>
                            </div>
                        </per:button>

	                </form>

	            </div>
	            <!--照片不合格 结束-->
            <!--inviteCon end-->
        </div>

        <!--listCon end-->

    </div>


</div>

<!--container end-->

</body>
<script src="/static/js/finance/img_unpass.js"></script>
<script src="/static/js/requestpayout/disagree.js"></script>
<script>
    $('.form-item').eq(0).css('marginTop','15px');
</script>
</html>
