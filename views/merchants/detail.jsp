<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="per" uri="com/mvc/web/common/tag/permissionTag" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    {{include ("./../inc/cssSources")}}
    <link rel="stylesheet" href="/static/dialog/dialog-layer.css">
    <link rel="stylesheet" href="/static/css/orderDetails.css">
    <link rel="stylesheet" href="/static/css/merchants.css">
    <title>商户详情</title>
</head>
<body>
<div id="wrapper" class="wrapper">
    <!-------- Part of header Begin -------->
    {{include ('./../inc/header')}}
    <!-------- Part of header End -------->
    <div id="section" class="section normal_width">
        <!---- Part of slide nav Begin ---->
        {{include ('./../inc/sideNav')}}
        <!---- Part of slide na End ---->

        <input type="hidden" id="supplierId" value="${detail.id}" />
        <input type="hidden" id="supplierName" value="${detail.name}" />
        <input type="hidden" name="type"/><!--标识：商户标签删除type=1,标签库删除标签type=2，新增公库及商户增加标签type=3，公库增加给商户type=4-->
        <!---- Part of Main info Begin ---->
        <div id="main" class="main">
            <div class="crumbs_nav">
                <a href="{{markUri}}/supplier/manager" class="crumbs_item">商户管理</a>
                <a href="{{markUri}}${url}" class="crumbs_item">${navigation}</a>
                <a href="javascript:;" class="crumbs_item">查看资料</a>
            </div>
            <div class="merchants_details">
                <div class="merchant_info">
                    <div class="merchant_photo">
                        <c:choose>
                            <c:when test="${not empty detail.image_url}">
                                <img src="${detail.image_url}" class="img_responsive" alt="商户封面图" target="商户封面图">
                            </c:when>
                            <c:otherwise>
                                <img src="{{markUri}}/static/img/merchant_photo.png" class="img_responsive" alt="商户封面图" target="商户封面图">
                            </c:otherwise>
                        </c:choose>
                    </div>
                    <div class="name"><em class="name_icon"></em><span>${detail.name}</span></div>
                    <div class="create_info">
                        <span class="founder">创建人：<samp>${detail.emp_name}</samp></span>
                        <span class="create_time">创建时间：<samp>${detail.create_time}</samp></span>
                        <span class="state">状态：<samp>
                            <c:forEach items="${supplierStatus}" var="bean">
                                <c:if test="${bean.id eq detail.status}">
                                    <td>${bean.value}</td>
                                </c:if>
                            </c:forEach>
                        </samp></span>
                    </div>


                    <div class="tags">
                        <div class="tags_title lf">标&nbsp;&nbsp;&nbsp;签：</div>
                        <div class="tags_manage lf">
                            <c:if test="${detail.flag eq 2 || detail.flag eq 3 || detail.flag eq 4}">
                            <ul class="tags_list lf" id="merchantTags">
                                <c:forEach items="${detail.child_list}" var="bean">
                                    <li class="tag nowrap lf" data-id="${bean.label_id}">
                                        <span>${bean.label_name}</span>
                                        <per:button code="1380">
                                            <em class="delete_btn"></em>
                                        </per:button>
                                    </li>
                                </c:forEach>
                                    <!--标签管理按钮-->
                                <per:button code="1380">
                                    <li class="tag_manage_btn lf">
                                        <input type="hidden" name="name"/><!--标签名字-->
                                        <span style="user-select: none;">管理</span>
                                        <div class="tags_warehouse" style="display: none;">
                                            <div class="add_container">
                                                <input type="text" name="" id="addTag" autofocus="autofocus" maxlength="20" value="" placeholder="添加标签" />
                                                <a href="" class="create_tag_btn">确认</a>
                                            </div>
                                            <ul class="warehouse_list">
                                                <c:forEach items="${supplierLabel}" var="bean">
                                                    <li class="tag_item nowrap
	                                                <c:forEach items="${detail.child_list}" var="bean2">
	                                                    <c:if test="${bean.label_id eq bean2.label_id}">active</c:if>
	                                                </c:forEach>
	                                                " data-id="${bean.label_id}" data-name="${bean.label_name}" title="${bean.label_name}">
                                                        <span>${bean.label_name}</span>
                                                        <a href="javascript:" class="delete_tag_btn"></a>
                                                    </li>
                                                </c:forEach>
                                            </ul>
                                        </div>
                                    </li>
                                </per:button>
                            </ul>
                            </c:if>
                            <c:if test="${detail.flag eq 1}">--</c:if>
                        </div>
                    </div>

                    <!-- 编辑删除操作 -->
                    <c:if test="${detail.flag eq 3}">
                        <div class="btn_box text_left setting_merchant">
                                <per:button code="1385">
                                    <a href="javascript:" class="edit_sm_btn">编辑</a>
                                </per:button>
                                <per:button code="1060">
                                    <a href="javascript:" class="delete_sm_btn">删除</a>
                                </per:button>
                        </div>
                    </c:if>
                </div>
                <div class="merchant_desc">
                    <!-- 基本信息部分 Begin -->
                    <div class="details_item base_info">
                        <div class="detail_title">基本信息</div>
                        <div class="detail_box">
                            <div class="classify_item">
                                <div class="classify_content">
                                    <ul class="items_list">
                                        <li class="item_row">
                                            <!-- If the text of 'item_name' is too long, add 'long_text' class to it. -->
                                            <div class="item_name">业务类型：</div>
                                            <div class="item_value">
                                                <c:choose>
                                                    <c:when test="${empty detail.car_type}">--</c:when>
                                                    <c:when test="${detail.car_type  eq 0}">新车</c:when>
                                                    <c:when test="${detail.car_type  eq 1}">二手车</c:when>
                                                    <c:when test="${detail.car_type  eq 2}">新车&二手车</c:when>
                                                </c:choose>
                                            </div>
                                        </li>
                                        <li class="item_row">
                                            <div class="item_name">店面类型：</div>
                                            <div class="item_value">
                                                <c:choose>
                                                    <c:when test="${empty detail.type_value}">--</c:when>
                                                    <c:otherwise>${detail.type_value}</c:otherwise>
                                                </c:choose>
                                            </div>
                                        </li>
                                        <li class="item_row">
                                            <div class="item_name">拥有类型：</div>
                                            <div class="item_value">
                                                <c:choose>
                                                    <c:when test="${empty detail.own_type}">--</c:when>
                                                    <c:when test="${detail.own_type  eq 1}">私海</c:when>
                                                    <c:when test="${detail.own_type  eq 2}">公海</c:when>
                                                </c:choose>
                                            </div>
                                        </li>
                                        <li class="item_row">
                                            <div class="item_name">拥有者：</div>
                                            <div class="item_value">
                                                <c:choose>
                                                    <c:when test="${empty detail.emp_str}">--</c:when>
                                                    <c:otherwise>${detail.emp_str}</c:otherwise>
                                                </c:choose>
                                            </div>
                                        </li>
                                        <li class="item_row">
                                            <div class="item_name">月销量：</div>
                                            <div class="item_value">
                                                <c:choose>
                                                    <c:when test="${empty detail.sales_month_value}">--</c:when>
                                                    <c:otherwise>${detail.sales_month_value}</c:otherwise>
                                                </c:choose>
                                            </div>
                                        </li>
                                        <li class="item_row">
                                            <div class="item_name">公司人数：</div>
                                            <div class="item_value">
                                                <c:choose>
                                                    <c:when test="${empty detail.company_num}">--</c:when>
                                                    <c:otherwise>${detail.company_num}人</c:otherwise>
                                                </c:choose>
                                            </div>
                                        </li>
                                        <li class="item_row">
                                            <div class="item_name">城市：</div>
                                            <div class="item_value">
                                                <c:choose>
                                                    <c:when test="${empty detail.city_name}">--</c:when>
                                                    <c:otherwise>${detail.city_name}</c:otherwise>
                                                </c:choose>
                                            </div>
                                        </li>
                                        <li class="item_row">
                                            <div class="item_name">地址：</div>
                                            <div class="item_value">
                                                <c:choose>
                                                    <c:when test="${empty detail.address}">--</c:when>
                                                    <c:otherwise>${detail.address}</c:otherwise>
                                                </c:choose>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 基本信息部分 End -->
                    <!-- 联系人信息部分 Begin -->
                    <div class="details_item base_info">
                        <div class="detail_title">联系人信息</div>
                        <div class="detail_box">
                            <c:forEach items="${detail.link_data}" var="bean" varStatus="link">
                                <div class="classify_item">
                                    <c:choose>
                                        <c:when test="${fn:length(detail.link_data) eq 1}"><div class="classify_title">联系人</div></c:when>
                                        <c:when test="${fn:length(detail.link_data) > 1}"><div class="classify_title">联系人(${link.count})</div></c:when>
                                    </c:choose>
                                    <div class="classify_content">
                                        <ul class="items_list">
                                            <li class="item_row">
                                                <!-- If the text of 'item_name' is too long, add 'long_text' class to it. -->
                                                <div class="item_name">姓名：</div>
                                                <div class="item_value">
                                                    <c:choose>
                                                        <c:when test="${empty bean.name}">--</c:when>
                                                        <c:otherwise>${bean.name}</c:otherwise>
                                                    </c:choose>
                                                </div>
                                            </li>
                                            <li class="item_row">
                                                <div class="item_name">手机：</div>
                                                <div class="item_value">
                                                    <c:choose>
                                                        <c:when test="${empty bean.phone}">--</c:when>
                                                        <c:otherwise>${bean.phone}</c:otherwise>
                                                    </c:choose>
                                                </div>
                                            </li>
                                            <li class="item_row">
                                                <div class="item_name">职务：</div>
                                                <div class="item_value">
                                                    <c:if test="${empty bean.position_id}">--</c:if>
                                                    <c:forEach items="${position}" var="beanPosition">
                                                        <c:if test="${beanPosition.id eq bean.position_id}">
                                                            ${beanPosition.value}
                                                        </c:if>
                                                    </c:forEach>
                                                </div>
                                            </li>
                                            <li class="item_row">
                                                <div class="item_name">微信：</div>
                                                <div class="item_value">
                                                    <c:choose>
                                                        <c:when test="${empty bean.wechat}">--</c:when>
                                                        <c:otherwise>${bean.wechat}</c:otherwise>
                                                    </c:choose>
                                                </div>
                                            </li>
                                            <li class="item_row">
                                                <div class="item_name">生日：</div>
                                                <div class="item_value">
                                                    <c:choose>
                                                        <c:when test="${empty bean.birthday}">--</c:when>
                                                        <c:otherwise>${bean.birthday}</c:otherwise>
                                                    </c:choose>
                                                </div>
                                            </li>
                                            <li class="item_row whole_line">
                                                <div class="item_name">备注：</div>
                                                <div class="item_value">
                                                    <c:choose>
                                                        <c:when test="${empty bean.remark}">--</c:when>
                                                        <c:otherwise>${bean.remark}</c:otherwise>
                                                    </c:choose>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </c:forEach>
                        </div>
                    </div>
                    <!-- 联系人信息部分 End -->
                    <!-- 备案信息部分 Begin -->
                    <div class="details_item base_info">
                        <div class="detail_title">备案信息</div>
                        <div class="detail_box">
                            <div class="classify_item">
                                <div class="classify_title">证件信息</div>
                                <div class="classify_content">
                                    <ul class="items_list">
                                        <li class="item_row">
                                            <div class="item_name">备案类型：</div>
                                            <div class="item_value">
                                                <c:choose>
                                                    <c:when test="${detail.id_type  eq 1}">
                                                        营业执照
                                                    </c:when>
                                                    <c:when test="${detail.id_type  eq 2}">
                                                        身份证
                                                    </c:when>
                                                    <c:otherwise>--</c:otherwise>
                                                </c:choose>
                                            </div>
                                        </li>
                                        <li class="item_row">
                                            <div class="item_name">证件号码：</div>
                                            <div class="item_value">
                                                <c:choose>
                                                    <c:when test="${empty detail.id_num}">--</c:when>
                                                    <c:otherwise>${detail.id_num}</c:otherwise>
                                                </c:choose>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <c:if test="${ detail.flag eq 2 || detail.flag eq 3 || detail.flag eq 4}">
                                <!--账户信息-->
                                <c:forEach items="${detail.record_data}" var="bean" varStatus="record">
                                    <div class="classify_item">
                                        <c:choose>
                                            <c:when test="${fn:length(detail.record_data) eq 1}">
                                                <c:choose>
                                                    <c:when test="${detail.flag eq 2 && bean.is_new eq 1}"><div class="classify_title new">账户信息</div></c:when>
                                                    <c:when test="${detail.flag eq 2 && bean.is_new eq 0}"><div class="classify_title">账户信息</div></c:when>
                                                    <c:otherwise><div class="classify_title">账户信息</div></c:otherwise>
                                                </c:choose>
                                            </c:when>
                                            <c:when test="${fn:length(detail.record_data) > 1}">
                                                <c:choose>
                                                    <c:when test="${detail.flag eq 2 && bean.is_new eq 1}"><div class="classify_title new">账户信息(${record.count})</div></c:when>
                                                    <c:when test="${detail.flag eq 2 && bean.is_new eq 0}"><div class="classify_title">账户信息(${record.count})</div></c:when>
                                                    <c:otherwise><div class="classify_title">账户信息(${record.count})</div></c:otherwise>
                                                </c:choose>
                                            </c:when>
                                        </c:choose>
                                        <div class="classify_content">
                                            <ul class="items_list">
                                                <li class="item_row">
                                                    <div class="item_name">账户类型：</div>
                                                    <div class="item_value">
                                                        <c:choose>
                                                            <c:when test="${empty bean.account_type}">--</c:when>
                                                            <c:otherwise>${bean.account_type_value}</c:otherwise>
                                                        </c:choose>
                                                    </div>
                                                </li>
                                                <li class="item_row">
                                                    <div class="item_name">账户名：</div>
                                                    <div class="item_value">
                                                        <c:choose>
                                                            <c:when test="${empty bean.account_name}">--</c:when>
                                                            <c:otherwise>${bean.account_name}</c:otherwise>
                                                        </c:choose>
                                                    </div>
                                                </li>
                                                <li class="item_row">
                                                    <div class="item_name">开户行：</div>
                                                    <div class="item_value">
                                                        <c:choose>
                                                            <c:when test="${empty bean.open_bank}">--</c:when>
                                                            <c:otherwise>${bean.open_bank}</c:otherwise>
                                                        </c:choose>
                                                    </div>
                                                </li>
                                                <li class="item_row">
                                                    <div class="item_name">银行卡号：</div>
                                                    <div class="item_value">
                                                        <c:choose>
                                                            <c:when test="${empty bean.bank_no}">--</c:when>
                                                            <c:otherwise>${bean.bank_no}</c:otherwise>
                                                        </c:choose>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </c:forEach>

                                <!--备案信息材料图片-->
                                <ul class="img_list">
                                    <c:forEach items="${fileList}" var="bean">
                                        <li class="list_item">
                                            <a href="${bean.url}" target="_blank" data-type="imgBox">
                                                <img src="${bean.thumbnail_120_90}" alt=""/>
                                            </a>
                                            <div class="img_desc nor_wrap">${bean.file_name}</div>
                                        </li>
                                    </c:forEach>
                                </ul>
                            </c:if>

                        </div>
                    </div>
                    <!-- 备案信息部分 End -->
                    <!-- 审核操作按钮部分 -->
                    <c:if test="${detail.flag eq 2}">
                        <div class="btn_box text_left pad_btm_50 clearfix">
                            <per:button code="1395">
                                <a href="javascript:;" class="btn orange_btn confirm audit_agree" data-url="/supplier/tocheck/agree">通过</a>
                            </per:button>
                            <per:button code="1396">
                                <a href="javascript:;" class="btn bg_btn audit_disagree" data-url="/supplier/tocheck/disagree">不通过</a>
                            </per:button>
                        </div>
                    </c:if>
                    <!-- 操作记录部分 Begin -->
                    <div class="details_item operate_info">
                        <div class="detail_title">操作记录</div>
                        <div class="detail_box operate_logs">
                            <ul class="log_list">
                                <c:forEach items="${operationList}" var="bean" varStatus="operation">
                                     <li class="list_item ">
                                         <div class="log_item_info">
                                             <div class="date">${bean.create_time}</div>
                                             <div class="text">${bean.modify_desc}&nbsp;${bean.position_desc}-${bean.create_name}&nbsp;&nbsp;${bean.reason}&nbsp;${bean.remark}</div>
                                         </div>
                                         <!--是否有图片-->
                                             <c:if test="${not empty bean.file_data}">
	                                            <div class="classify_img">
	                                                <ul class="img_list">
	                                                <c:forEach items="${bean.file_data }" var="materialList">
	                                                    <li class="img_item">
	                                                        <a href="${materialList.url }" target="_blank">
	                                                            <img src="${materialList.thumbnail }" alt="">
	                                                        </a>
	                                                    </li>
	                                                </c:forEach>    
	                                                </ul>
	                                            </div>
                                            </c:if>
                                     </li>
                                </c:forEach>
                            </ul>
                        </div>
                    </div>
                    <!-- 操作记录部分 End -->
                </div>
            </div>

            <!-- 工商查询按钮 -->
            <c:if test="${detail.flag eq 2 && detail.id_type == 1}">
                <per:button code="1397">
                    <div class="business_info_content">
                        <a href="javascript:" class="business_info_sm_btn"></a>
                        <div class="setting_merchant">
                            <div class="business_result" id="businessResDesc">
                                <div class="result_header text_right">
                                    <em class="close_btn">关 闭</em>
                                </div>
                                    <!--<div class="result_detail" id="businessResDesc">
                                        <div class="title">工商查询结果(仅供参考)</div>
                                        <ul class="detail_list">
                                            <li class="detail_item">
                                                <span class="item_name">企业名称：</span>
                                                <span class="item_value">北京极致车网科技有限公司</span>
                                            </li>
                                            <li class="detail_item">
                                                <span class="item_name">法定代表人：</span>
                                                <span class="item_value">12345687946547</span>
                                            </li>
                                            <li class="detail_item">
                                                <span class="item_name">注册资本：</span>
                                                <span class="item_value">10000万元</span>
                                            </li>
                                            <li class="detail_item">
                                                <span class="item_name">经营期限：</span>
                                                <span class="item_value">2015年05月05日 - 2019年05月05日</span>
                                            </li>
                                            <li class="detail_item">
                                                <span class="item_name">注册地址：</span>
                                                <span class="item_value">北京市西城区月坛南街69号</span>
                                            </li>
                                            <li class="detail_item">
                                                <span class="item_name">经营范围：</span>
                                                <span class="item_value">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus adipisci cumque, deserunt distinctio dolorem doloribus porro qui quisquam rem saepe sapiente sunt suscipit vel voluptatem! Doloribus explicabo hic nam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste officia reiciendis vitae! Accusamus adipisci aspernatur commodi cum distinctio earum eius excepturi, minus natus nobis optio praesentium quas repudiandae veritatis vero?</span>
                                            </li>
                                            <li class="detail_item">
                                                <span class="item_name">经营异常数量：</span>
                                                <span class="item_value">20 次</span>
                                            </li>
                                        </ul>
                                        <!-- 无工商数据信息展示 -->
                                    </div>-->
                            </div>
                        </div>
                    </div>
                </per:button>
            </c:if>
        </div>
        <!---- Part of Main info End ---->
    </div>

</div>
</body>
{{include ('./../inc/jsSources')}}
<script src="/static/dialog/dialog-layer.js"></script>
<script src="/static/js/merchants.js"></script>
<script>
    (function ($) {
        var credentialsType = '${detail.id_type}';  // 证件类型
        var credentialsNum = '${detail.id_num}';    // 证件号码
        var merchantId = $.trim($('#supplierId').val());    // 商户ID
        var merchantName = $.trim($('#supplierName').val());    // 商户NAME
        // 加载工商数据信息
        function getBusinessInfo () {
            redefineAjax({
                data : {
                    id_num : credentialsNum
                },
                url : contextPath + '/api/enterprise/info',
                success : function (res) {
                    if (res.error_code == 0){
                        renderBusinessInfo(true, res);
                    } else {
                        renderBusinessInfo(false, res);
                    }
                },
                error : function () {
                    renderBusinessInfo(false, res);
                }
            });

            /**
             * 渲染工商数据
             * @param data ：渲染数据源
             * @param type ：读取数据类型，true:获取成功，false：获取失败
             */
            var renderBusinessInfo = function (type, data) {
                var result = data.data;
                var htmlStr = '<div class="result_detail">';
                if (type) {
                    htmlStr += '<div class="title">工商查询结果(仅供参考)</div><ul class="detail_list">';
                    if (result.name && result.name != '') {
                        htmlStr += '<li class="detail_item">' +
                            '           <span class="item_name">企业名称：</span>' +
                            '           <span class="item_value">'+ result.name +'</span>' +
                            '       </li>';
                    }
                    if (result.legalPersonName && result.legalPersonName != '') {
                        htmlStr += '<li class="detail_item">' +
                            '           <span class="item_name">法定代表人：</span>' +
                            '           <span class="item_value">'+ result.legalPersonName +'</span>' +
                            '       </li>';
                    }
                    if (result.regCapital && result.regCapital != '') {
                        htmlStr += '<li class="detail_item">' +
                            '           <span class="item_name">注册资本：</span>' +
                            '           <span class="item_value">'+ result.regCapital +'</span>' +
                            '       </li>';
                    }
                    if (result.fromTime && result.toTime && result.fromTime != '' && result.toTime != '') {
                        htmlStr += '<li class="detail_item">' +
                            '           <span class="item_name">经营期限：</span>' +
                            '           <span class="item_value">'+ result.fromTime +' - '+ result.toTime +'</span>' +
                            '       </li>';
                    }
                    if (result.regLocation && result.regLocation != '') {
                        htmlStr += '<li class="detail_item">' +
                            '           <span class="item_name">注册地址：</span>' +
                            '           <span class="item_value">'+ result.regLocation +'</span>' +
                            '       </li>';
                    }
                    if (result.businessScope && result.businessScope != '') {
                        htmlStr += '<li class="detail_item">' +
                            '           <span class="item_name">经营范围：</span>' +
                            '           <span class="item_value">'+ result.businessScope +'</span>' +
                            '       </li>';
                    }
                    if (result.comAbnoInfo && result.comAbnoInfo != '') {
                        htmlStr += '<li class="detail_item">' +
                            '           <span class="item_name">经营异常数量：</span>' +
                            '           <span class="item_value">'+ result.comAbnoInfo +'</span>' +
                            '       </li>';
                    }
                    htmlStr += '</ul></div>';
                } else {
                    htmlStr +=      '<div class="no_business_info">\n' +
                        '               <em class="no_data_icon"></em>\n' +
                        '               <div class="tip_info font14 text_center bold">抱歉，暂无查询结果</div>\n' +
                        '           </div>' +
                        '       </div>';
                }

                $('#businessResDesc').append(htmlStr);
            }
        }

        // 展示工商信息内容
        function showBusinessInfo () {
            var btn = $('.business_info_sm_btn');   // 工商信息按钮
            var closeBtn = $('.business_result .close_btn');    // 工商数据层的关闭按钮
            var info = $('.business_result');       // 工商数据结果
            btn.off('click').on('click', function (e) {
                var e = e || window.event;
                e.stopPropagation();
                showBusinessInfo();
            });
            closeBtn.off('click').on('click', function (e) {
                var e = e || window.event;
                e.stopPropagation();
                showBusinessInfo();
            });
            var showBusinessInfo = function () {
                if (info.is(':hidden')) {
                    info.show();
                } else {
                    info.hide();
                }
            };

            // 阻断点击工商详情时间关闭层
            info.on('click', function (e) {
                var e = e || window.event;
                e.stopPropagation();
            });
            // 点击页面其他区域时间关闭工商详情弹出层
            $(document).on('click', function (e) {
                var e = e || window.event;
                e.stopPropagation();
                (info.is(':hidden')) ? false : info.hide();
            });
        }

        /* 跳转编辑页面 */
        function toEdit () {
            var btn = $('.edit_sm_btn');
            btn.off('click').on('click', function () {
                locationTo({
                    action : contextPath + '/supplier/toedit',
                    param : {
                        supplier_id : merchantId,
                        url : LOCALURL,
                        name : merchantName
                    }
                })
            });
        }

        /* 商户删除 */
        // 绑定删除操作
        function deleteMerchant () {
            var btn = $('.delete_sm_btn');
            btn.off('click').on('click', function () {
                var _this = $(this);
                dialog('open', {
                    title : '删除提醒',
                    content : '<div style="padding: 20px 0 20px;line-height:30px;font-size: 14px;"><span>删除商户后数据将无法恢复，</span><br><span>确认继续删除？</span></div>',
                    onConfirm : function (d) {
                        d.close();
                        deleteEvent(_this);
                    },
                    onCancel : function (d) {
                        d.close();
                    }
                });
            });
        }
        // 删除商户逻辑
        function deleteEvent (btn) {
            btn.off('click');
            redefineAjax({
                data : {
                    supplier_id : merchantId
                },
                url : contextPath + '/api/supplier/delete',
                success : function (res) {
                    if (res.error_code == 0) {
                        $alert('删除商户成功', function () {
                            window.location.href = contextPath + '/supplier/pass/list';
                        });
                    } else {
                        $alert(res.error_msg, function () {
                            deleteMerchant();
                        });
                    }
                },
                error : function () {
                    $alert('删除商户失败，请重新尝试', function () {
                        deleteMerchant();
                    });
                }
            })
        }



        $(function() {
            if (credentialsType == 1) {   // 只有证件类型为营业执照的时间加载。
                getBusinessInfo();  // 获取工商数据
                showBusinessInfo();     // 展示工商数据信息
            }
            toEdit();   // 跳转编辑页面
            deleteMerchant();       // 删除商户
            merchantsAddTag();      // 标签管理
            // 通过及不通过的跳转
            toNextPage('.audit_agree, .audit_disagree', {
                supplier_id : merchantId,
                name : merchantName
            });
        });
    })(jQuery,undefined);
</script>
</html>