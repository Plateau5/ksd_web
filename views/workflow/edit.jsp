<%@ page import="java.lang.reflect.Field"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="per" uri="com/mvc/web/common/tag/permissionTag"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>




<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <jsp:include page="/WEB-INF/inc/css_source.jsp"></jsp:include>
    <link rel="stylesheet" href="${contextPath}/static/dialog/dialog-layer.css">
    <link rel="stylesheet" href="${contextPath}/static/css/manufacturing.css">
    <title>流程管理-编辑审批流</title>
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
            	<input id="workflow_id" type="hidden" name="id" value="${vo.id}">
                <div class="crumbs_nav">
                    <a href="${contextPath}/workflow/getList" class="crumbs_item">审批流程</a>
                    <a href="javascript:;" class="crumbs_item">编辑</a>
                </div>
                <div class="create_options form_options">
                    <form action="" id="create_workflow">
                        <div class="option_item">
                            <div class="column_name">
                                <em class="require_icon">*</em>
                                <span class="options_name">名称：</span>
                            </div>
                            <div class="column_val">
                                <input type="text" class="workflow_name" name="name" maxlength="20" placeholder="请输入名称" value="${vo.name }"/>
                                <span class="tips_info" style="display: none;">(*最多二十个字)</span>
                            </div>
                        </div>
                        <div class="option_item">
                            <div class="column_name">
                                <em class="require_icon">*</em>
                                <span class="options_name">适用业务：</span>
                            </div>
                            <div class="column_val">
                                <div class="form_group">
                                    <input id="newCars" type="checkbox" <c:if test="${fn:contains(vo.applyto_business,'0') }">checked="checked"</c:if> class="apply_scope" name="applyto_business"  value="0" />
                                    <label for="newCars" <c:if test="${fn:contains(vo.applyto_business,'0')}">class="checked"</c:if>>新车</label>
                                </div>
                                <div class="form_group">
                                    <input id="usedCars" type="checkbox" <c:if test="${fn:contains(vo.applyto_business,'1') }">checked="checked"</c:if> class="apply_scope" name="applyto_business" value="1" />
                                    <label for="usedCars" <c:if test="${fn:contains(vo.applyto_business,'1')}">class="checked"</c:if>>二手车</label>
                                </div>
                            </div>
                        </div>
                        <div class="option_item">
                            <div class="column_name">
                                <em class="require_icon">*</em>
                                <span class="options_name">适用城市：</span>
                            </div>
                            <div class="column_val">
                                <c:forEach items="${city_list }" var="bean">
                                    <div class="form_group">
                                        <input id="" type="checkbox" <c:if test="${fn:contains(vo.applyto_city,bean.id)}">checked="checked"</c:if> class="apply_city" name="applyto_city" value="${bean.id }" />
                                        <label for="" <c:if test="${fn:contains(vo.applyto_city,bean.id)}">class="checked"</c:if> >${bean.name }</label>
                                    </div>
                                </c:forEach>
                            </div>
                        </div>
                        <c:if test="${type eq 1}">
                            <div class="option_item">
                                <div class="column_name">
                                    <em class="require_icon">*</em>
                                    <span class="options_name">风险类型：</span>
                                </div>
                                <div class="column_val">
                                    <c:forEach items="${risk_list }" var="bean">
                                        <div class="form_group">
                                            <input type="checkbox" <c:if test="${fn:contains(vo.risk_type,bean.index) }">checked="checked"</c:if> class="loan_type" name="risk_type" value="${bean.index }" />
                                            <label <c:if test="${fn:contains(vo.risk_type,bean.index)}">class="checked"</c:if>>${bean.name}</label>
                                        </div>
                                    </c:forEach>
                                </div>
                            </div>
                            <div class="option_item">
                                <div class="column_name">
                                    <em class="require_icon">*</em>
                                    <span class="options_name">是否甩单：</span>
                                </div>
                                <div class="column_val">
                                    <div class="form_group mar6">
                                        <input id="order_type1" type="radio" <c:if test="${vo.is_throw eq 1 }">checked="checked"</c:if> class="have_system" name="is_throw" value="1" />
                                        <label for="order_type1">是</label>
                                    </div>
                                    <div class="form_group">
                                        <input id="order_type2" type="radio" <c:if test="${vo.is_throw eq 0 }">checked="checked"</c:if> class="have_system" name="is_throw" value="0" />
                                        <label for="order_type2">否</label>
                                    </div>
                                </div>
                            </div>
                        </c:if>
                        <c:if test="${type eq 2}">
                            <div class="option_item">
                                <div class="column_name">
                                    <em class="require_icon">*</em>
                                    <span class="options_name">费用类型：</span>
                                </div>
                                <div class="column_val">
                                    <c:forEach items="${charge_list }" var="bean">
                                        <div class="form_group">
                                            <input id="chargeType${bean.id}" type="checkbox" class="apply_city" <c:if test="${fn:contains(vo.charge_type,bean.id) }">checked="checked"</c:if> name="charge_type" value="${bean.id }" />
                                            <label for="chargeType${bean.id}" <c:if test="${fn:contains(vo.charge_type,bean.id)}">class="checked"</c:if>>${bean.name }</label>
                                        </div>
                                    </c:forEach>
                                </div>
                            </div>
                        </c:if>
                        <div class="option_item principal_opt">
                            <input type="hidden" id="responsible" name="responsible" value="${vo.responsible }">
                            <div class="column_name">
                                <em class="require_icon">*</em>
                                <span class="options_name">负责人：</span>
                            </div>
                            <div class="column_val">
                                <c:forEach items="${_list }" var="bean">
                                    <div class="principal_item" lang="${bean.id }">
                                        <em class="close_icon"></em>
			                                <span class="character nowrap">
			                                    <span title="${bean.position_desc }">${bean.position_desc }</span>
			                                </span>
                                        <span class="principal_name">${bean.name }</span>
                                        <div class="down_arrow"></div>
                                    </div>
                                </c:forEach>
                                <!-- 这里是添加负责人按钮，不用循环  -->
                                <div class="add_btn"></div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="btn_box clearfix create_wf_btn_box">
                    <a href="javascript:" class="btn orange_btn confirm create_confirm">确定</a>
                    <a href="javascript:" class="btn bg_btn create_cancel">取消</a>
                </div>
            </div>
            <div class="dialog_box" style="display: none;">
                <div class="mask"></div>
                <div class="add_principal_dialog">
                    <div class="add_title">添加负责人</div>
                    <div class="content">
                        <ul class="principal_list">
							<c:forEach items="${role_list }" var="bean">
	                            <li class="list_item character_item nor_wrap" lang="${bean.id}">${bean.name}</li>
							</c:forEach>
                        </ul>
                        <ul class="employee_list">
                        	<c:forEach items="${emp_list }" var="bean">
	                            <li class="list_item employee_item " lang="${bean.role_id }" style="display: none;" >
                                    <c:choose>
                                        <c:when test="${empty bean.image_url}">
                                            <img src="${contextPath}/static/img/employee/perIcon.png" alt="">
                                        </c:when>
                                        <c:otherwise>
                                            <img src="${bean.image_url}" alt="">
                                        </c:otherwise>
                                    </c:choose>
	                                <span class="employee_name" lang="${bean.id}">${bean.name }</span>
	                            </li>
							</c:forEach>
                        </ul>
                    </div>
                    <per:button code="1135">
                        <div class="btn_box">
                            <a href="javascript:" class="btn orange_btn confirm dialog_confirm">确定</a>
                            <a href="javascript:" class="btn bg_btn dialog_cancel">取消</a>
                        </div>
                    </per:button>
                </div>
            </div>





            <!---- Part of Main info End ---->
        </div>
        <!-------- Part of main End -------->

        <!-------- Part of footer Begin -------->
        <!--<div id="footer" class="footer"></div>-->
        <!-------- Part of footer End -------->
    </div>
</body>
<jsp:include page="/WEB-INF/inc/js_source.jsp"></jsp:include>
<script src="${contextPath}/static/dialog/dialog-layer.js" type="text/javascript" charset="UTF-8"></script>
<script src="${contextPath}/static/js/manufacturing.js" type="text/javascript" charset="UTF-8"></script>

<script>
    (function ($) {
        const URL = contextPath + "/api/workflow/update";
        const TYPE = 1;
        const FLOWTYPE = ${type};
        $(function() {
            workflowCreateAndEdit(TYPE, URL, FLOWTYPE);
            resetCheckboxAndRadio('checkbox', ".form_group label", ".checked");
        });
    })(jQuery,undefined);
</script>
</html>