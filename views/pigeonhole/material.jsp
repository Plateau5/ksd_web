<!-- 通知所需材料 -->
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="per" uri="com/mvc/web/common/tag/permissionTag"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>客户-请款材料</title>
    <jsp:include page="/WEB-INF/inc/metaData.jsp"></jsp:include>
    <link rel="stylesheet" href="${contextPath}/static/css/employee/listCon.css">
    <link rel="stylesheet" href="${contextPath}/static/css/question/edit.css">
    <link rel="stylesheet" href="${contextPath}/static/css/requestpayout/material.css">
</head>
<body>

<jsp:include page="/WEB-INF/inc/head.jsp"></jsp:include>

<!--container start-->

<div class="container minWidth">
    <div class="row section">
        <!--navLeft start-->
        <jsp:include page="/WEB-INF/inc/customer_slide_nav.jsp"></jsp:include>

        <!--navLeft end-->


        <!--listCon start-->
        <div class=" listCon relative">
            <div class="listConHeader inviteCon" style="line-height: normal;margin-top:32px;">
                <ul>
                    <li class="inline colorB"><a class="TS" href="${contextPath}/pigeonhole/system">归档管理</a></li>
                    <li class="inline before"><a href="${contextPath}/pigeonhole/getWaitList">待处理</a></li>
                    <li class="inline before"><a href="javascript:" class="marterial_back" data-id="${finance_id}">${vo.user_name}</a></li>
                    <li class="inline before"><a href="javascript:;" style="cursor:default">通知所需材料</a></li>
                </ul>
            </div>
            <div class="material_box" style="overflow: hidden;">
                <input type="hidden" id="finance_id" value="${finance_id}">
                <c:forEach items="${list }" var="bean">
	                <div class="check">
	                    <div class="check_img icon_uncheck" data-id="${bean.id }"></div>
	                    <span>${bean.name }</span>
	                </div>
                </c:forEach>
            </div>
            <div class="error_prom" style="margin-left:0;width: 100%;"></div>
            <form class="formML" style="width: 100%;">
            <div class="form-item" style="">
                <label style="text-align: left;padding-right:20px;width: 60px;">备注：</label>
                <textarea name="remark" id="remark" style="border:1px solid #e4e4e4;resize: none;margin-left:0;" placeholder="请输入内容(100字以内)" maxlength="100"></textarea>
            </div>
            </form >
            <per:button code="1123">
                <div class="material_btn">
                    <input type="button" class="material_sub" id="material_sub" data-advance_id="${vo.advance_id}" value="确认"/>
                    <a href="javascript:" id="marterialBack" data-url="${contextPath}/pigeonhole/getFile" data-id="${finance_id}">
                        <input type="button" class="cancel_btn" id="cancel_btn" value="取消">
                    </a>
                </div>
            </per:button>
        </div>
        <!--listCon end-->
    </div>
</div>
<!--container end-->

</body>
<script src="${contextPath}/static/js/requestpayout/sub_btn.js"></script>
<script src="${contextPath}/static/js/requestpayout/material.js"></script>
<script type="text/javascript">
    (function () {
        $(function(){
            $('body').off('click').on('click','.check_img',function(e){
                var e = e || window.event;
                e.preventDefault();
                e.stopPropagation();
                var class_name = $(this).attr('class');
                if(class_name.indexOf('icon_uncheck') >= 0){
                    $(this).removeClass('icon_uncheck').addClass('icon_check');
                }else{
                    $(this).removeClass('icon_check').addClass('icon_uncheck');
                }
                var checkedElem = $('.icon_check');
                if (checkedElem.length > 0) {
                    $('.error_prom').text('');
                } else {
                    $('.error_prom').text('(请先选择所需材料)');
                }
            });
        });
        //返回详情页
        function backToDetail () {
            var backBtn = $("#marterialBack, .marterial_back");
            backBtn.off("click").on("click", function () {
                var _this = $(this);
                var financeId = $.trim(_this.data("id"));
                locationTo({
                    action : contextPath + '/pigeonhole/getFile',
                    param : {
                        finance_id : financeId
                    }
                });
            });
        }

        $(function () {
            backToDetail();
        });
    })(jQuery, undefined)
</script>
</html>