<!-- 查看材料-->
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
    <link rel="stylesheet" href="/static/css/finance/detail.css"/>
    <link rel="stylesheet" href="/static/dialog/dialog-layer.css"/>
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


        <!--inviteCon start-->

        <div class="listCon">
            <div class="listConHeader inviteCon" style="margin-bottom:20px;">
                <ul class="crumbs_nav">
                    <li class="inline colorB first_nav"><a class="TS" href="/otherfund/system">其他款项</a></li>
                    <li class="inline before second_nav"><a href="${url}">${navigation}</a></li>
                    <li class="inline before"><a href="javascript:;">${vo.user_name }</a></li>
                    <li class="inline before"><a href="javascript:;" style="cursor:default">查看资料</a></li>
                </ul>
            </div>
            <form action="/finance/file/download" id="finance_download" method="post">
                <input id="finance_download_finance_id" value="${finance_id}" name="finance_id" type="hidden">
                <input id="user_name" value="${vo.user_name}" name="user_name" type="hidden">
                <input id="material_type" value="" name="material_type" type="hidden">
            </form>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding:0">
                <input type="hidden" id="finance_id" value="${finance_id}">
                <input type="hidden" id="request_status" value="${vo.request_status }">
                <!--img_file start-->
                {{include('./../inc/entry_info')}}
                <!--img_file end-->
                <!-- 基本信息 Begin -->
                {{include('./../inc/customer_basic_info')}}
                <!-- 基本资料 End -->
                <!-- 合同资料 Begin -->
                {{include('./../inc/compact_info')}}
                <!-- 合同资料 End -->
                <!--requestpayout_detail start-->
                <div class="img_detail_title">
                    <div class="title_line"></div>
                    <span>请款资料</span>
                </div>
                <div class="requestpayout_detail_container">
                    {{include('./../inc/requestpayout_info')}}

                    <div class="requestpayout_detail_btn_box">
                    <c:if test="${not empty file_list2 }">
                        <per:button code="1038">
                            <div class="cursor requestpayout_detail_btn requestpayout_download download_file" id="" alt="2" lang="${finance_id}">全部下载</div>
                        </per:button>
                    </c:if>
                        <c:if test="${url eq '/otherfund/pending/list' && vo.present_id eq present_id  && vo.receipt_id !=1}">
                            <per:button code="1340">
                                <a href="javascript:" class="go_forward" data-id="${finance_id}" data-advance_id="${vo.advance_id}" data-url="${contextParh }/otherfund/transfer">
                                    <div class="cursor requestpayout_detail_btn requestpayout_care" id="care_btn">转交他人</div>
                                </a>
                            </per:button>
                            <per:button code="1339">
                                <a href="javascript:" class="go_forward" data-id="${finance_id}" data-advance_id="${vo.advance_id}" data-url="${contextParh }/otherfund/disagree">
                                    <div class="cursor requestpayout_detail_btn requestpayout_disagree">不同意</div>
                                </a>
                            </per:button>
                            <per:button code="1338">
                                <a href="javascript:" class="go_forward" data-id="${finance_id}" data-advance_id="${vo.advance_id}" data-url="${contextParh }/otherfund/agree">
                                    <div class="cursor requestpayout_detail_btn requestpayout_agree" lang="${finance_id}">同意</div>
                                </a>
                            </per:button>
                        </c:if>
                    </div>
                </div>
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

<!--转交他人-->
<div class="resquestpayout_term_container" id="care_container">
    <div class="term_title">转交他人</div>
    <div class="care_txt">
        确认将此订单转交给
        <select name="emp_id" id="emp_id">
            <option value="0">请选择</option>
            <c:forEach items="${emp_list }" var="bean">
                <option value="${bean.id}">${bean.name}</option>
            </c:forEach>
        </select>
    </div>
    <div class="care_btn">
        <input type="button" class="term_sub" id="care_sub" value="确定" data-url="/requestPayout/waitList">
        <input type="button" class="cancel_btn" value="取消">
    </div>
</div>
<script src="/static/js/finance/img_detail.js"></script>
<script src="/static/dialog/dialog-layer.js"></script>
<script src="/static/js/requestpayout/detail.js"></script>
<script>
    var btn = $('.detail_btn1').length;
    if(btn != '0'){
        $('.imgDetail').css('margin-top','25px');
    }else{
        $('.imgDetail').css('margin-top','0');
    }

    function complementDatumEvent () {
        var btn = $(".complement_datum");
        btn.off("click").on("click", function () {
            var _this = $(this);
            var  financeId = $.trim(_this.attr("lang"));
            var advanceId = $.trim(_this.data('advance_id'));
            var url = contextPath + "/api/requestPayout/sendNotice";
            var data = {
                finance_id : financeId,
                advance_id : advanceId
            };
            $ajax("POST", url, data, function (res) {
                var datas = eval(res);
                if (datas.error_code == 0) {
                    //nothing to do
                    $alert('已成功通知');
                } else {
                    $alert(datas.message);
                }
            }, function () {
                $alert(datas.message);
            })
        });
    }


    /*确认提交按钮的点击逻辑*/
    function affirmSubmitThirdparty () {
        var ele = $(".affirm_submit_thirdparty");
        var url = contextPath + "/api/requestPayout/affirm/submit";
        //绑定事件
        ele.on("click", function (e) {
            var e = e || window.event;
            e.stopPropagation();    //阻断事件冒泡
            e.preventDefault();     //阻断默认事件
            var finance_id = $(this).attr("lang");
            var reqType = $(this).attr("type");
            if (reqType == 2) {
                $alert("是否将该订单确认请款", function () {
                    affirmSubmitEvent(finance_id, reqType);
                });
            } else {
                locationTo({
                    action : contextPath + "/requestPayout/affirm/submit",
                    param : {
                        finance_id : finance_id,
                        type : reqType
                    }
                });
            }
        });

        //确定请款的点击逻辑
        var affirmSubmitEvent  = function (a, b) {
            ele.off("click");
            var datas = {
                finance_id : a,
                type : b
            };
            $.ajax({
                type : "post",
                url : url,
                data : datas,
                async : true,
                success : function (req) {
                    var res = eval(req);
                    if (res.error_code == 0) {
                        //更改显示按钮
                        //t.hide().siblings(".requestpayout_passed").show();
                        window.location.href = contextPath +"/requestPayout/pass/list";
                    } else {
                        $alert(res.error_msg);
                        ele.on("click", affirmSubmitEvent);
                    }
                },
                error : function () {
                    $alert("网络异常，请重试");
                    ele.on("click", affirmSubmitEvent);
                }
            });
        }

    }
    /*请款通过按钮的点击逻辑*/
    function requestpayoutPassed () {
        var ele = $(".requestpayout_passed");
        var url = contextPath + "/api/requestPayout/affirm/pass";
        ele.on("click", function (e) {
            var e = e || window.event;
            e.stopPropagation();    //阻断事件冒泡
            e.preventDefault();     //阻断默认事件
            passedEvent();
        });
        var passedEvent = function () {
            ele.off("click");
            var data = {
                finance_id : $.trim(ele.attr("lang")),
            };
            $ajax("post", url, data, function (req) {
                var res = eval(req);
                if (res.error_code == 0) {
                    //操作成功后跳转到待通过列表页
                    window.location.href = contextPath + "/requestPayout/pendingPass/list";
                } else {
                    //alert(res.error_msg);
                    dialog("alert",{
                        title : "提醒",
                        content : res.error_msg,
                        button : [],
                        maskClose : false,
                        //css : 'font-size: 16px',
                        onConfirm : function () {
                            window.location.href = contextPath + "/requestPayout/pendingPass/list";
                        }
                    })
                }
            },function () {
                $alert("网络异常，请重试");
                ele.on("click", passedEvent);
            });
        }
    }
    $(function () {
        complementDatumEvent();
        affirmSubmitThirdparty();
        requestpayoutPassed();
        pageJump(".go_forward");
    })
</script>
</body>
</html>
