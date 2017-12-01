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
    <link rel="stylesheet" href="/static/jedate/skin/jedate.css"/>
    <link rel="stylesheet" href="/static/css/merchants.css">
    <title>商户管理-编辑</title>
</head>
<body>
<div id="wrapper" class="wrapper">
    <!-------- Part of header Begin -------->
    {{include ('./../inc/header')}}
    <!-------- Part of header End -------->

    <!-------- Part of main Begin -------->
    <div id="section" class="section normal_width">
        <!---- Part of slide nav Begin ---->
        {{include ('./../inc/sideNav')}}
        <!---- Part of slide na End ---->

        <!---- Part of Main info Begin ---->
        <div id="main" class="main merchants_edit">
            <div class="crumbs_nav">
                <a href="{{markUri}}/supplier/manager" class="crumbs_item">商户管理</a>
                <a href="{{markUri}}/supplier/pass/list" class="crumbs_item">已通过</a>
                <a href="javascript:;" class="crumbs_item merchant_name" data-id="${supplier_id}">${name}</a>
                <a href="javascript:;" class="crumbs_item">编辑</a>
            </div>
            <form method="post" id="merchantsEdit">
                <input type="hidden" name="supplier_id" id="supplierId" value="${supplier_id}">
            <div class="form_content form_options merchants_create">
                    <!-- 基本信息 Begin -->
                    <div class="options_title">基本信息</div>
                    <div class="option_item">
                        <div class="column_name">
                            <span class="options_name"><span class="require_icon">*</span>商户名称：</span>
                        </div>
                        <div class="column_val">
                            <input type="text" class="requireTrue" data-text="商户名称" maxlength="30" name="name"  value="${detail.name}" placeholder="请输入商户名称"  />
                            <span class="tips_info">(*请输入商户名称)</span>
                        </div>
                    </div>
                    <div class="option_item" id="businessType">
                        <div class="column_name">
                            <span class="options_name"><span class="require_icon">*</span>业务类型：</span>
                        </div>
                        <div class="column_val">
                            <select name="car_type" id="carType">
                                <option <c:if test="${detail.car_type eq 0}">selected</c:if> value="0">新车</option>
                                <option <c:if test="${detail.car_type eq 1}">selected</c:if> value="1">二手车</option>
                                <option <c:if test="${detail.car_type eq 2}">selected</c:if> value="2">新车&二手车</option>
                            </select>
                        </div>
                    </div>
                    <div class="option_item" id="storeType">
                        <div class="column_name">
                            <span class="options_name"><span class="require_icon">*</span>店面类型：</span>
                        </div>
                        <div class="column_val">
                            <c:choose>
                                <c:when test="${detail.car_type eq 0}">
                                    <c:forEach items="${supplierTypeNEW}" var="bean" varStatus="type">
                                        <div class="form_group mar6">
                                            <input id="store_type_${type.count}"  type="radio" <c:if test="${bean.id == detail.type}">checked="checked"</c:if> class="have_system" name="type"  value="${bean.id}" />
                                            <label for="store_type_${type.count}" <c:if test="${bean.id == detail.type}">class="checked"</c:if>>${bean.value}</label>
                                        </div>
                                    </c:forEach>
                                </c:when>
                                <c:when test="${detail.car_type eq 1}">
                                    <c:forEach items="${supplierTypeOLD}" var="bean" varStatus="type">
                                        <div class="form_group mar6">
                                            <input id="store_type_${type.count}"  type="radio" <c:if test="${bean.id == detail.type}">checked="checked"</c:if> class="have_system" name="type"  value="${bean.id}" />
                                            <label for="store_type_${type.count}" <c:if test="${bean.id == detail.type}">class="checked"</c:if>>${bean.value}</label>
                                        </div>
                                    </c:forEach>
                                </c:when>
                                <c:when test="${detail.car_type eq 2}">
                                    <c:forEach items="${supplierType}" var="bean" varStatus="type">
                                        <div class="form_group mar6">
                                            <input id="store_type_${type.count}"  type="radio" <c:if test="${bean.id == detail.type}">checked="checked"</c:if> class="have_system" name="type"  value="${bean.id}" />
                                            <label for="store_type_${type.count}" <c:if test="${bean.id == detail.type}">class="checked"</c:if>>${bean.value}</label>
                                        </div>
                                    </c:forEach>
                                </c:when>
                            </c:choose>
                        </div>
                    </div>
                    <div class="option_item">
                        <div class="column_name">
                            <span class="options_name"><span class="require_icon">*</span>城&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;市：</span>
                        </div>
                        <div class="column_val">
                            <select name="city_id" id="businesssCity">
                                <c:forEach items="${cityList }" var="bean">
                                    <option value="${bean.id}" <c:if test="${bean.id eq detail.city_id}">selected</c:if>>${bean.name}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                    <div class="option_item">
                        <div class="column_name">
                            <span class="options_name"><span class="require_icon">*</span>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</span>
                        </div>
                        <div class="column_val">
                            <!--${detail.latitude},${detail.longitude}-->
                                <input type="hidden" name="latitude" id="latitude" value="${detail.latitude}">
                                <input type="hidden" name="longitude" id="longitude" value="${detail.longitude}">
                            <input type="text" id="businessAddress" class="business_address requireTrue" readonly="readonly" data-text="地址" data-location="[${detail.longitude},${detail.latitude}]" name="address"  value="${detail.address}" placeholder="请输入详细地址"  />
                            <span class="tips_info">(*请输入具体地址)</span>
                            <!-- 地图查询部分 -->
                            <div class="addr_result_box" style="display: none;">
                                <div class="input_content">
                                    <input type="text" autofocus="autofocus" class="map_search" id="mapSearch" placeholder="请输入详细地址进行搜索" />
                                </div>
                                <!-- 搜索结果 -->
                                <ul class="addr_list">

                                    <!-- 无数据 -->
                                    <li class="addr_item text_center no_data">
                                        该地址下无查询数据
                                    </li>
                                </ul>
                                <!-- 地图展示位置 -->
                                <div class="map_box" id="map">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="option_item">
                        <div class="column_name">
                            <span class="options_name">公司人数：</span>
                        </div>
                        <div class="column_val">
                            <input type="text" id="personCount" class="" name="company_num" oninput="checkNum($(this));" value="${detail.company_num}" placeholder="请输入公司人数(1-1000)" maxlength="3" max="1000" min="1"  />
                            <span>人</span>
                            <span class="tips_info">(*请输入公司人数)</span>
                        </div>
                    </div>
                    <div class="option_item">
                        <div class="column_name">
                            <span class="options_name">月&nbsp;销&nbsp;量&nbsp;：</span>
                        </div>
                        <div class="column_val">
                            <select name="sales_month" id="monthSales">
                                <option <c:if test="${detail.sales_month eq 1}">selected</c:if> value="1">0-10辆</option>
                                <option <c:if test="${detail.sales_month eq 2}">selected</c:if> value="2">10-20辆</option>
                                <option <c:if test="${detail.sales_month eq 3}">selected</c:if> value="3">20-40辆</option>
                                <option <c:if test="${detail.sales_month eq 4}">selected</c:if> value="4">40-80辆</option>
                                <option <c:if test="${detail.sales_month eq 5}">selected</c:if> value="5">80辆以上</option>
                            </select>
                        </div>
                    </div>
                    <div class="option_item" id="ownType">
                        <input type="hidden" name="old_own_type" value="${detail.own_type}">
                        <div class="column_name">
                            <span class="options_name">拥有类型：</span>
                        </div>
                        <div class="column_val">
                            <select name="own_type" id="ownTypeS">
                                <option <c:if test="${detail.own_type eq 1}">selected</c:if> value="1">私海</option>
                                <option <c:if test="${detail.own_type eq 2}">selected</c:if> value="2">公海</option>
                            </select>
                        </div>
                    </div>
                    <div class="option_item" id="ownPerson"style="<c:if test="${detail.own_type eq 2}">display:none;</c:if>">
                        <input type="hidden" id="ownPersonInput" name="follow_people" value="${detail.follow_people}">
                        <div class="column_name">
                            <span class="options_name">拥&nbsp;有&nbsp;者&nbsp;：</span>
                        </div>
                        <div class="column_val have_person_box">
                            <ul class="person_list">
                                <c:forEach items="${detail.emp_data}" var="bean">
                                    <li class="person" data-id="${bean.id}">${bean.name}<em class="delete_btn"></em></li>
                                </c:forEach>
                                <!-- 下面为添加按钮 -->
                                <li class="choose_box inline_block">
                                    <em class="add_city_btn" id="addOwnPersonBtn"></em>
                                    <div class="search_box" style="display: none;">
                                        <div class="search_input">
                                            <input class="m_search" type="text" />
                                        </div>
                                        <ul class="search_result">

                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 头图item -->
                    <div class="option_item" id="doorHead">
                        <div class="column_name">
                            <span class="options_name"><span class="require_icon">*</span>封面图：</span>
                        </div>
                        <div class="column_val">
                            <div class="img_md_box file_upload">
                            	<input type="hidden" name="image_url" value="${detail.image_url }" id="image_url">
                                <c:if test="${not empty detail.image_url}">
                                    <a href="javascript:;" class="img_item head_photo" target="_blank" data-type="imgBox">
                                        <img src="${detail.image_url}" alt=""/>
                                        <div class="img_md_operate_box">
                                            <em class="img_md_operate_btn view" data-url="${detail.image_url}" style="margin-right: 0" title="查看"></em>
                                                <!--<em class="img_md_operate_btn delete" data-id="99" title="删除"></em>-->
                                        </div>
                                    </a>
                                </c:if>
                                <a href="javascript:;" class="file_upload_layer add_img_md_btn" data-type="99"></a>
                                <input type="file" class="file_upload_btn"   value="上传图片" style="display: none" />
                            </div>
                        </div>
                    </div>
            </div>
            <!--联系人信息-->
                <input type="hidden" name="updateLinkList" id="updateLinkList" value="" />
                <input type="hidden" name="insertLinkList" id="insertLinkList" value="" />
                <input type="hidden" name="deleteLinkList" id="deleteLinkList" value="" />
            <input type="hidden" id="linkCount" value="${fn:length(detail.link_data)}">
            <c:forEach items="${detail.link_data}" var="bean" varStatus="link">
                <div class="form_content form_options merchants_create link_option his_link" id="linkPeople${link.count}">
                        <!-- 联系人信息 Begin -->
                        <c:if test="${fn:length(detail.link_data) == 1}">
                            <div class="options_title">联系人信息</div>
                        </c:if>
                        <c:if test="${fn:length(detail.link_data) > 1}">
                            <c:if test="${link.count == 1}">
                                <div class="options_title">联系人信息</div>
                            </c:if>
                            <c:if test="${link.count > 1}">
                                <div class="options_title">联系人信息(${link.count})</div>
                            </c:if>
                        </c:if>
                        <div class="option_item">
                            <div class="column_name">
                                <span class="options_name"><span class="require_icon">*</span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
                            </div>
                            <div class="column_val">
                                <input type="text" class="link_name requireTrue" data-text="联系人姓名" maxlength="20" data-id="${bean.id}" value="${bean.name}" placeholder="请输入联系人姓名"  />
                                <span class="tips_info">(*请输入联系人名称)</span>
                            </div>
                        </div>
                        <div class="option_item">
                            <div class="column_name">
                                <span class="options_name"><span class="require_icon">*</span>手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：</span>
                            </div>
                            <div class="column_val">
                                <input type="text" class="link_phone requireTrue" data-text="手机" verify="1"  oninput="checkNum($(this));" maxlength="11" value="${bean.phone}" placeholder="请输入手机号码"  />
                                <span class="tips_info">(*请输入手机号)</span>
                            </div>
                        </div>
                        <div class="option_item">
                            <div class="column_name">
                                <span class="options_name"><span class="require_icon">*</span>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务：</span>
                            </div>
                            <div class="column_val">
                                <select name="position_id" class="position_id">
                                    <option <c:if test="${bean.position_id eq 8}">selected</c:if> value="8">店长</option>
                                    <option <c:if test="${bean.position_id eq 6}">selected</c:if> value="6">门店经理</option>
                                    <option <c:if test="${bean.position_id eq 7}">selected</c:if> value="7">销售主管</option>
                                    <option <c:if test="${bean.position_id eq 9}">selected</c:if> value="9">销售专员</option>
                                </select>
                            </div>
                        </div>
                        <div class="option_item">
                            <div class="column_name">
                                <span class="options_name">微&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;信：</span>
                            </div>
                            <div class="column_val">
                                <input type="text" class="wechat" maxlength="30" value="${bean.wechat}" placeholder="请输入微信号"  />
                            </div>
                        </div>
                        <div class="option_item">
                            <div class="column_name">
                                <span class="options_name">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
                            </div>
                            <div class="column_val">
                                <select name="gender" class="gender">
                                    <option <c:if test="${bean.gender eq 1}">selected</c:if> value="1">男</option>
                                    <option <c:if test="${bean.gender eq 0}">selected</c:if> value="0">女</option>
                                </select>
                            </div>
                        </div>
                        <div class="option_item">
                            <div class="column_name">
                                <span class="options_name">生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日：</span>
                            </div>
                            <div class="column_val">
                                <input type="text" class="birthday wicon" name="birthday" value="${bean.birthday}" placeholder="请选择联系人生日" readonly="readonly" />
                            </div>
                        </div>
                        <div class="option_item whole_line remark_item">
                            <div class="column_name">
                                <span class="options_name">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                            </div>
                            <div class="column_val">
                                <textarea class="remark" cols="30" rows="10" maxlength="300" placeholder="请输入备注内容">${bean.remark}</textarea>
                            </div>
                        </div>
                    <div class="btn_box text_left clearfix">
                        <c:if test="${fn:length(detail.link_data) == link.count}">
                            <a href="javascript:" class="add_sm_btn" data-type="1" data-id="${bean.id}">添加联系人</a>
                        </c:if>
                        <c:if test="${fn:length(detail.link_data) > 1}">
                            <a href="javascript:" class="delete_sm_btn" data-type="1" data-id="${bean.id}">删除联系人</a>
                        </c:if>
                    </div>
                </div>
            </c:forEach>


            <!--证件信息-->
            <div class="form_content form_options merchants_create">
                    <!-- 证件信息 Begin -->
                    <div class="options_title">证件信息</div>
                    <div class="option_item">
                        <div class="column_name">
                            <span class="options_name"><span class="require_icon">*</span>备案类型：</span>
                        </div>
                        <div class="column_val">
                            <select name="id_type" id="recordType">
                                <option <c:if test="${detail.id_type eq 1}">selected</c:if> value="1">营业执照</option>
                                <option <c:if test="${detail.id_type eq 2}">selected</c:if> value="2">身份证</option>
                            </select>
                        </div>
                    </div>
                    <div class="option_item">
                        <div class="column_name">
                            <span class="options_name"><span class="require_icon">*</span>证件号码：</span>
                        </div>
                        <div class="column_val">
                            <input type="text" name="id_num" verify="1" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')" class="requireTrue" data-text="证件号码" maxlength="20" data-isChecked="1" value="${detail.id_num}" id="licenseNum" placeholder="如：11010019000101****" />
                            <span class="tips_info">(*请输入证件号码)</span>
                        </div>
                    </div>
            </div>

            <!--账户信息-->
                <input type="hidden" name="updateRecordList" id="updateRecordList" value="" />
                <input type="hidden" name="deleteRecordList"  id="deleteRecordList" value="" />
                <input type="hidden" name="insertRecordList"  id="insertRecordList" value="" />
            <input type="hidden" id="recordCount" value="${fn:length(detail.record_data)}">
            <c:forEach items="${detail.record_data}" var="bean" varStatus="record">
                <div class="form_content form_options merchants_create record_option his_record" id="recordInfo${record.count}">
                        <!-- 证件信息 Begin -->
                        <c:if test="${fn:length(detail.record_data) != 1}"><div class="options_title">账户信息${record.count}</div></c:if>
                        <c:if test="${fn:length(detail.record_data) == 1}"><div class="options_title">账户信息</div></c:if>
                        <div class="option_item">
                            <div class="column_name">
                                <span class="options_name"><span class="require_icon">*</span>账户类型：</span>
                            </div>
                            <div class="column_val">
                                <select class="account_type">
                                    <option <c:if test="${bean.account_type eq 1}">selected</c:if> value="1">公户</option>
                                    <option <c:if test="${bean.account_type eq 2}">selected</c:if> value="2">法人</option>
                                    <option <c:if test="${bean.account_type eq 3}">selected</c:if> value="3">其他合伙人</option>
                                    <option <c:if test="${bean.account_type eq 4}">selected</c:if> value="4">其他人员</option>
                                </select>
                            </div>
                        </div>
                        <div class="option_item">
                            <div class="column_name">
                                <span class="options_name"><span class="require_icon">*</span>账&nbsp;户&nbsp;名：</span>
                            </div>
                            <div class="column_val">
                                <input type="text" data-id="${bean.id}" value="${bean.account_name}" class="requireTrue account_name" data-text="账户名" maxlength="30" placeholder="请输入账户名" />
                                <span class="tips_info">(*请输入账户名)</span>
                            </div>
                        </div>
                        <div class="option_item">
                            <div class="column_name">
                                <span class="options_name"><span class="require_icon">*</span>银行卡号：</span>
                            </div>
                            <div class="column_val">
                                <input type="text" onkeyup="this.value=this.value.replace(/\D/g,'')" value="${bean.bank_no}" class="requireTrue bank_no" data-text="银行卡号" maxlength="30" placeholder="请输入银行卡号" />
                                <span class="tips_info">(*请输入银行卡号)</span>
                            </div>
                        </div>
                        <div class="option_item">
                            <div class="column_name">
                                <span class="options_name"><span class="require_icon">*</span>开&nbsp;户&nbsp;行：</span>
                            </div>
                            <div class="column_val">
                                <input type="text" class="requireTrue open_bank" data-text="开户行" maxlength="30" value="${bean.open_bank}" placeholder="请输入开户行" />
                                <span class="tips_info">(*请输入开户行)</span>
                            </div>
                        </div>
                    <div class="btn_box text_left clearfix">
                        <c:if test="${fn:length(detail.record_data) == record.count}">
                            <a href="javascript:" class="add_sm_btn"  data-type="2" data-id="${bean.id}">添加账户</a>
                        </c:if>
                        <c:if test="${fn:length(detail.record_data) > 1}">
                            <a href="javascript:" class="delete_sm_btn"  data-type="2" data-id="${bean.id}">删除账户</a>
                        </c:if>
                    </div>
                </div>
            </c:forEach>

            <!--备案信息图片-->
            <c:forEach items="${recordsMaterial}" var="bean1">
                <div class="form_content form_options merchants_create two_columns">
                        <div class="option_item whole_line">
                            <div class="column_name">
                                <span class="options_name long_text">${bean1.name}：</span>
                            </div>
                            <div class="column_val">
                                <div class="img_md_box file_upload">
                                    <c:forEach items="${fileList}" var="bean">
                                        <c:if test="${bean.file_type == bean1.id}">
                                            <a href="javascript:;" class="img_item">
                                                <img src="${bean.thumbnail_160_100}" alt="">
                                                <div class="img_md_operate_box">
                                                    <em class="img_md_operate_btn view" data-url="${bean.url}" title="查看"></em>
                                                    <em class="img_md_operate_btn delete" data-id="${bean.file_id}" title="删除"></em>
                                                </div>
                                            </a>
                                        </c:if>
                                    </c:forEach>
                                    <a href="javascript:;" class="file_upload_layer add_img_md_btn" data-type="${bean1.id}"></a>
                                    <input type="file" class="file_upload_btn"   value="上传图片" style="display: none" />
                                </div>
                            </div>
                        </div>
                </div>
            </c:forEach>

            <per:button code="1386">
                <div class="btn_box text_left pad_btm_50 clearfix">
                    <a href="javascript:" class="btn orange_btn confirm edit_confirm">保存</a>
                    <a href="javascript:" class="btn bg_btn edit_cancel" data-id="${supplier_id}">取消</a>
                </div>
            </per:button>
            </form>
        </div>
        <!---- Part of Main info End ---->
    </div>
</div>
<div class="loading" id="loading"></div>
</body>
{{include ('./../inc/jsSources')}}
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.0&key=3e145360a8017aacdab3696b6f64fa69" charset="utf-8"></script>
<script type="text/javascript" src="/static/dialog/dialog-layer.js"></script>
<script type="text/javascript" src="/static/js/jsonsql-0.1.js"></script>
<script src="/static/jedate/jquery.jedate.min.js"></script>
<script type="text/javascript" src="/static/js/merchants.js"></script>
<script type="text/javascript" src="/static/js/merchantsEdit.js"></script>
<script>
    var empList = ${empList};
    var merchantId = $.trim($('#supplierId').val());
    // storeType：店面类型
    var storeType = {
        newType : ${supplierTypeNEW},
        oldType : ${supplierTypeOLD},
        allType : ${supplierType}
    };
    (function ($) {

        $(function() {
            goMerchantDetail();     // 面包屑跳转详情页
        });
    })(jQuery,undefined);
</script>
</html>