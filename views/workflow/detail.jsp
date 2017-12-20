<%@ page import="java.lang.reflect.Field"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="per" uri="com/mvc/web/common/tag/permissionTag"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <jsp:include page="/WEB-INF/inc/css_source.jsp"></jsp:include>
    <link rel="stylesheet" href="${contextPath}/static/css/manufacturing.css">
    <title>流程管理-审批流详情</title>
</head>
<body>
    <div id="wrapper" class="wrapper">
        <!-------- Part of header Begin -------->
        <jsp:include page="/WEB-INF/inc/head.jsp"></jsp:include>
        <!-------- Part of header End -------->

        <!-------- Part of main Begin -------->
        <div id="section" class="section normal_width">
            <!---- Part of slide nav Begin ---->
            <jsp:include page="/WEB-INF/inc/business_setting_side_nav.jsp"></jsp:include>
            <!---- Part of slide na End ---->

            <!---- Part of Main info Begin ---->
            <div id="main" class="main pad_btm_100">
                <div class="crumbs_nav">
                    <a href="${contextPath}/workflow/getList" class="crumbs_item">审批流程</a>
                    <a href="javascript:;" class="crumbs_item">${vo.name}</a>
                </div>
                <div class="create_options form_options workflow_detail">
                    <h3 class="workflow_name">
                        <span class="name">${vo.name}</span>

                        <span class="creator">
                            <span>创建人：</span>
                            <span class="name">${vo.create_name}</span>
                        </span>
                        <span class="create_time">${vo.create_time}</span>
                    </h3>
                    <div class="content_info">
                        <div class="option_item">
                            <div class="column_name">
                                <span class="options_name">适用业务：</span>
                            </div>
                            <div class="column_val">
                                <div class="form_group">
                                    <label>${vo.applyto_business_value }</label>
                                </div>
                            </div>
                        </div>
                        <div class="option_item">
                            <div class="column_name">
                                <span class="options_name">适用城市：</span>
                            </div>
                            <div class="column_val">
                                <div class="form_group">
                                    <span>${vo.applyto_city_value }</span>
                                </div>
                            </div>
                        </div>
                        <c:if test="${type eq 1}">
                            <div class="option_item">
                                <div class="column_name">
                                    <span class="options_name">风险类型：</span>
                                </div>
                                <div class="column_val">
                                    <div class="form_group">
                                        <span>${vo.risk_type_value }</span>
                                    </div>
                                </div>
                            </div>
                            <div class="option_item">
                                <div class="column_name">
                                    <span class="options_name">是否甩单：</span>
                                </div>
                                <div class="column_val">
                                    <div class="form_group">
                                    <span>
                                    	<c:if test="${vo.is_throw eq 0 }">否</c:if>
                                    	<c:if test="${vo.is_throw eq 1 }">是</c:if>
                                    </span>
                                    </div>
                                </div>
                            </div>
                        </c:if>
                        <c:if test="${type eq 2}">
                            <div class="option_item">
                                <div class="column_name">
                                    <span class="options_name">费用类型：</span>
                                </div>
                                <div class="column_val">
                                    <div class="form_group">
                                        <span>${vo.charge_type_value }</span>
                                    </div>
                                </div>
                            </div>
                        </c:if>
                        <div class="option_item principal_opt">
                            <div class="column_name">
                                <span class="options_name">负责人：</span>
                            </div>
                            <div class="column_val">
                            <c:forEach items="${_list }" var="bean">
                                <div class="principal_item">
                                <span class="character detail_character  inline_block nowrap">
                                    <span title="${bean.position_desc }">${bean.position_desc }</span>
                                </span>
                                    <span class="principal_name">${bean.name }</span>
                                    <div class="down_arrow"></div>
                                </div>
                            </c:forEach>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <!---- Part of Main info End ---->
        </div>
    </div>
</body>
<jsp:include page="/WEB-INF/inc/js_source.jsp"></jsp:include>
<script src="${contextPath}/static/js/manufacturing.js" type="text/javascript" charset="UTF-8"></script>
<script>
    (function ($) {
        $(function() {
        });
    })(jQuery,undefined);
</script>
</html>