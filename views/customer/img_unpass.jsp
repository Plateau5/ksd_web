<!--照片不合格-->
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="per" uri="com/mvc/web/common/tag/permissionTag"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>客户-贷款管理</title>
    <jsp:include page="/WEB-INF/inc/metaData.jsp"></jsp:include>
    <link rel="stylesheet" href="${contextPath}/static/css/employee/listCon.css"/>
    <link rel="stylesheet" href="${contextPath}/static/css/employee/invite.css"/>
    <link rel="stylesheet" href="${contextPath}/static/css/question/edit.css">
    <link rel="stylesheet" href="${contextPath}/static/css/finance/imgUnpass.css"/>
    <link rel="stylesheet" href="${contextPath}/static/css/question/edit.css">
    <link rel="stylesheet" href="${contextPath}/static/css/requestpayout/disagree.css">
    <script src="${contextPath}/static/js/finance/img_unpass.js"></script>
    <script src="${contextPath}/static/js/finance/get_file.js"></script>
    <script src="${contextPath}/static/js/question/submit_form.js"></script>
</head>
<style>
    .error_prom{margin-left:82px;}
</style>
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

		<form action="${contextPath}/finance/getFile" id="getFile" method="post">
			<input id="finance_id_file" value="" name="finance_id" type="hidden">
			<input id="active" value="" name="active" type="hidden">
			<input id="url" value="" name="url" type="hidden">
			<input id="navigation" value="" name="navigation" type="hidden">
		</form>
        <!--listCon start-->
        <div class=" listCon relative">
            <div class="listConHeader inviteCon">
                <ul>
                    <li class="inline colorB"><a class="TS" href="${contextPath}/finance/system">贷款管理</a></li>
                    <li class="inline before colorB"><a class="TS" href="${contextPath}/finance/getCheckInList">已分配</a></li>
                    <li class="inline before"><a class="TS"  href="javascript:;">${user_name}</a></li>
                    <li class="inline before"><a href="javascript:;" style="cursor:default">资料不合格</a></li>
                </ul>
            </div>

            <form class="formML" id="message_info" enctype="multipart/form-data" method="post">
                <input type="hidden" id="finance_id" name="finance_id" value="${finance_id }">
                <input type="hidden" id="request_status" name="request_status" value="${vo.request_status}">
                <input type="hidden" id="reason" name="reason" value="">
                <input type="hidden" id="question_ids" name="question_ids" value="">
                <div class="form-item" style="height:30px;">
                    <label>
                        <span class="need">*</span>问题分类：</label>
                    <div>
                        <select name="parent_id" id="question_classify_name">
                            <c:forEach items="${list }" var="bean">
                                <option value="${bean.id }">${bean.value}</option>
                            </c:forEach>
                        </select>
                    </div>
                    <%--<div class="error_prom"></div>--%>
                </div>
                <div class="form-item">
                    <label>
                        <span class="need">*</span>问题详情：</label>
                    <div class="question_container">
                    	<c:if test="${empty child_list }">
	                    	<div class="question_container_prom">该分类暂无问题详情，请重新选择问题分类</div>
	                    </c:if>
                        <c:forEach items="${child_list }" var="bean">
                            <div class="question-con-box">
                                <div class="check">
                                    <div class="check_img icon_uncheck" data_id="${bean.id }"></div>
                                    <span>${bean.value}</span>
                                </div>
                                <%--<p class="question-con">${bean.content }</p>--%>
                                <input type="hidden" class="question-val" value="${bean.content}">
                            </div>
                        </c:forEach>
                    </div>

                </div>
                <div class="error_prom" style="clear:left;"></div>
                <div class="form-item" style="padding-top:20px;">
                    <label style="text-align: right;padding-right:20px;">备注：</label>
                    <textarea name="remark" id="remark" style="border:1px solid #e4e4e4;resize: none;margin-left:0;" placeholder="请输入内容(200字以内)" maxlength="200"></textarea>
                </div>
                <per:button code="1035">
                    <div class="form-item">
                        <div class="create_btn">
                            <input type="button" class="create_sub" id="message_sub" value="确认"/>
                            <a href="javascript:;" class="getFile" lang="${finance_id}">
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
<div id="delS">
    <div class="container">
        <div class="row section">

            <div class="col-xs-4 col-sm-offset-4 inviteBox delhtml">
                <div class="col-sm-8 invSBox">
                    <div class="col-sm-12 invSText">
                        <div>已通知贷前<span>${create_name}</span></div>

                        <img class="delSImg" src="${contextPath}/static/img/employee/successIcon.png" alt=""/>
                    </div>
                    <%--<div class="col-sm-8 countMin">--%>
                    <%----%>
                    <%--</div>--%>
                </div>
                <div class="col-sm-3 invSBtn cursor" id="sub_notice" >确定</div>
            </div>

        </div>
    </div>
</div>
</html>