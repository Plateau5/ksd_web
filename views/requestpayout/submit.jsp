<!-- 同意 -->
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="per" uri="com/mvc/web/common/tag/permissionTag"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>客户管理-请款管理</title>
    {{include('./../inc/metaData')}}
    <link rel="stylesheet" href="/static/css/employee/listCon.css">
    <link rel="stylesheet" href="/static/css/question/edit.css">
    <link rel="stylesheet" href="${contentPath}/static/dialog/dialog-layer.css">
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
            <div class="listConHeader inviteCon" style="line-height: normal;margin-top:15px;">
                <ul>
                    <li class="inline colorB"><a class="TS" href="${contextPath }/requestPayout/system">款项管理</a></li>
                    <li class="inline before"><a href="${contextPath }/requestPayout/pendingDispose/list">待处理</a></li>
                    <li class="inline before"><a class="backOrderDetail" data-id="${finance_id}" href="javascript:">${vo.user_name }</a></li>
                    <li class="inline before"><a href="javascript:;" style="cursor:default">确认提交</a></li>
                </ul>
            </div>

            <form class="formML" id="request_info_submit" enctype="multipart/form-data" method="post">
                <input type="hidden" id="finance_id" name="finance_id" value="${finance_id }" />
                <input type="hidden" id="type" name="type" value="1" />
                <input type="hidden"  name="advance_id" value="${vo.advance_id}" />
                <div class="form-item" style="height:100px;">
                    <div>
                        <textarea id="content" name="remark" placeholder="请输入原因,最多可输入500个字" maxlength="500" onfocus="this.placeholder='';this.style.color='#535E6A';" onblur="if(this.placeholder=='') {this.placeholder='';this.style.color='#A4A8AB';}"></textarea>
                    </div>
                </div>
                <div class="form-item" style="height:20px;">
                    <div class="img_item updata_img" style="margin-left: 0">
                        <div class="file_btn">上传图片</div>
                        <input type="file" id="file_select1" class="cursor file_input" name="file" accept="image/jpeg,image/jpg,image/png" onchange="select_allow(this);"/>
                        <span class="file_prom">(最多5张图片，每张大小不超过5M)</span>
                    </div>
                </div>
                <div class="form-item" style="margin-top:0;margin-left: 0">
                    <div class="file_box" style="margin-left: 0"></div>
                </div>
                <div class="form-item">
                    <div class="create_btn"  style="margin-left: 0">
                        <per:button code="1211">
                            <input type="button" class="create_sub" id="confirm_sub_t" value="确认" data-advance_id="${vo.advance_id}" data-url="/requestPayout/pendingDispose/list" />
                        </per:button>
                        <a href="javascript:window.history.back();">
                            <input type="button" class="cancel_btn" value="取消">
                        </a>
                    </div>
                </div>

            </form>
        </div>

        <!--listCon end-->

    </div>


</div>

<!--container end-->

</body>
<script src="/static/js/requestpayout/agree.js"></script>
<script src="/static/dialog/dialog-layer.js"></script>
<script>
    $('.form-item').eq(0).css('marginTop','32px');
    (function () {
        //面包屑点击人名返回详情页
        function backToOrderDetail () {
            var backBtn = $(".backOrderDetail");
            backBtn.off("click").on("click", function () {
                var _this = $(this);
                var financeId = $.trim(_this.data("id"));
                locationTo({ //${contextPath }/requestPayout/getFile?finance_id=${finance_id}&url=/requestPayout/pendingDispose/list&active=wait
                    action : contextPath + "/requestPayout/getFile",
                    param : {
                        finance_id : financeId,
                        url : "/requestPayout/pendingDispose/list",
                        active : 'wait'
                    }
                });
            });
        }
        /*确认提交按钮的点击逻辑*/
        function affirmSubmitThirdparty () {
            var ele = $("#confirm_sub_t");
            var url = contextPath + "/api/requestPayout/affirm/submit";

            //绑定事件
            ele.on("click", function (e) {
                var e = e || window.event;
                e.stopPropagation();    //阻断事件冒泡
                e.preventDefault();     //阻断默认事件
                affirmSubmitEvent();
            });
            //确定按钮的点击逻辑
            var affirmSubmitEvent  = function () {
                ele.off("click");
                var datas = new FormData(document.getElementById("request_info_submit"));
                $.ajax({
                    type : "post",
                    url : url,
                    data : datas,
                    async : true,
                    processData: false,
                    contentType: false,
                    success : function (req) {
                        var res = eval(req);
                        if (res.error_code == 0) {
                            //更改显示按钮
                            //t.hide().siblings(".requestpayout_passed").show();
                            window.location.href = contextPath +"/requestPayout/pendingDispose/list";
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
        $(function () {
            affirmSubmitThirdparty();
            backToOrderDetail();
        });
    })(window, undefined)
</script>
</html>


