<!-- 分配页面 -->
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="per" uri="com/mvc/web/common/tag/permissionTag"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%--${finance_id}--%>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>客户-贷款管理</title>
    <jsp:include page="/WEB-INF/inc/metaData.jsp"></jsp:include>
    <link rel="stylesheet" href="${contextPath}/static/css/employee/listCon.css"/>
    <link rel="stylesheet" href="${contextPath}/static/css/employee/invite.css"/>
    <link rel="stylesheet" href="${contextPath}/static/css/finance/allot_emp_list.css"/>
    <script src="${contextPath}/static/js/employee/invite.js"></script>
    <script src="${contextPath}/static/js/finance/allot_emp.js"></script>
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


        <!--inviteCon start-->

        <div class="" style="padding-bottom:50px;padding-left:180px;">
            <div class="listConHeader inviteCon">
                <ul>
                    <li class="inline colorB"><a class="TS" href="${contextPath}/finance/getAllotList">待分配</a></li>
                    <li class="inline before"><a href="javascript:;" style="cursor:default">分配任务</a></li>
                </ul>
            </div>
            <!--form start-->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 allotEmp">

                <div class="allotEmpBox cursor">
                	<c:forEach items="${list}" var="bean">
                		<div class="personBox cursor">
	                        <div class="imgPerson">
		                        <c:choose>
		            				<c:when test="${empty bean.image_url}">
				                        <img src="${contextPath}/static/img/employee/perIcon.png" alt="">
		            				</c:when>
		            				<c:otherwise>
				                        <img src="${bean.image_url}" alt="">
		            				</c:otherwise>
		            			</c:choose>
	                        </div>
	                        <div class="personName">${bean.name }</div>
	                        <div class="personJob" >
	                            <span>${bean.count}</span>
	                           	 个贷款申请
	                        </div>
	                        <div class="personJob_address">
	                           	 所属区域：
	                            <span>${bean.city_name}</span>
	                        </div>
	                        <input type="hidden" name="audit_id" value="${bean.id}">
	                        <input type="hidden" name="audit_name" value="${bean.name}">
	                    </div>
                	</c:forEach>
                </div>
            </div>

            <a href="${contextPath}/finance/getAllotList"><input type="button" class="allotBtnN" id="allotBtnN" value="取消"  style="margin-bottom: 100px;" /></a>
            <input type="button" class="allotBtnY" disabled="disabled" id="allotBtnY" value="分配" lang="${finance_id}"/>
            <!--form end-->
        </div>


    </div>
</div>

<!--container end-->


</body>



<!--操作确认页  开始-->
<div id="delQ">
    <div class="container">
        <div class="row section">
            <input type="hidden" value="" name="delLang">
            <div class="col-xs-4 col-sm-offset-4 inviteBox delhtml" style="height:270px;">
                <div class="col-sm-8 invSBox">
                    <div class="col-sm-12 invSText">
                        <div>分配提醒
                            <span class="selected">选定人员将不可更改，确认继续分配？</span>
                            <span class="unselected">请选定人员</span>
                        </div>
                    </div>
                </div>
                <input type="hidden" id="audit_id" value="">
	            <input type="hidden" id="audit_name" value="">
	            <input type="hidden" id="finance_id" value="${finance_id}">
                <div class="col-sm-12 BTNMT">
                    <div class="col-sm-3 cursor inline delA" id="delQDBtn">确定</div>
                    <div class="col-sm-3 cursor inline delM" id="delQXBtn">取消</div>
                </div>
            </div>

        </div>
    </div>
</div>
<!--操作确认页  结束-->

<!--操作成功页  开始-->
<div id="delS">
    <div class="container">
        <div class="row section">

            <div class="col-xs-4 col-sm-offset-4 inviteBox delhtml">
                <div class="col-sm-8 invSBox">
                    <div class="col-sm-12 invSText">
                        <div>分配成功</div>
                        <%--<span><span class="countMin">5</span>秒后自动跳转......</span>--%>

                        <img class="delSImg" src="${contextPath}/static/img/employee/successIcon.png" alt=""/>
                    </div>
                    <%--<div class="col-sm-8 countMin">--%>
                    <%----%>
                    <%--</div>--%>
                </div>
                <div class="col-sm-3 invSBtn cursor" id="success_allot">
                	确定
                </div>
            </div>

        </div>
    </div>
</div>
<!--操作成功页  结束-->
</html>