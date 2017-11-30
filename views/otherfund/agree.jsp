<!-- 同意 -->
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="per" uri="com/mvc/web/common/tag/permissionTag"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    {{include ("./../inc/cssSources")}}
    <link rel="stylesheet" href="{{markUri}}/static/dialog/dialog-layer.css">
    <link rel="stylesheet" href="{{markUri}}/static/css/finance.css">
    <title>客户-其他款项</title>
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
        <div id="main" class="main">
            <div class="crumbs_nav">
                <a href="/otherfund/system" class="crumbs_item">其他款项</a>
                <a href="/otherfund/pending/list" class="crumbs_item">待审批</a>
                <a href="javascript:window.history.back();" class="crumbs_item">{{vo.user_name}}</a>
                <a href="javascript:;" class="crumbs_item">同意</a>
            </div>
            <div class="cashed_mark">
                <form action="<!--/api/financial/return/submit-->" method="post" id="returnResult">
                    <input type="hidden" name="advance_id" value="{{vo.advance_id}}">
                    <input type="hidden" name="finance_id" value="{{finance_id}}">
                    <div class="form_row textarea_container">
                        <div class="column_r">
                            <textarea name="remark" id="remark" placeholder="请输入原因，最多500字"></textarea>
                        </div>
                    </div>
                    <div class="img_upload" style="padding-left: 0;">
                        <div class="img_upload_layer"><span class="text">上传图片</span><span class="text_tip">（最多5张图片，每张大小不超过5M）</span></div>
                        <input type="file" class="img_upload_btn" name="file" accept="image/jpeg,image/jpg,image/png" value="上传图片" style="display: none" />
                        <div class="error_msg img_error">请使用正确格式的图片</div>
                        <div class="img_box">
                            <!-- 上传图片缩略图 -->

                        </div>

                    </div>
                    <div class="error_msg is_return_msg" style="padding-left: 10%;height:auto;line-height: normal;">(请先填写备注信息)</div>
                </form>
                <per:button code="1338">
                    <div class="btn_box clearfix text_left" style="padding-left: 0;">
                        <a href="javascript:" class="btn orange_btn confirm return_confirm">确认</a>
                        <a href="javascript:" class="btn bg_btn return_cancel">取消</a>
                    </div>
                </per:button>
            </div>
        </div>
        <!---- Part of Main info End ---->
    </div>
</div>
</body>
{{include ('./../inc/jsSources')}}
<script src="/static/dialog/dialog-layer.js"></script>
<script>
    (function ($) {

        //绑定确定按钮的点击事件
        rebind(".return_confirm", "click", returnSubmit);
        //确定按钮的点击事件逻辑
        function returnSubmit () {
            disabled(".return_confirm", "click", returnSubmit);//禁用按钮
            var url = contextPath + "/api/requestPayout/agree";
            var data = new FormData(document.getElementById("returnResult"));
            $.ajax({
                type : "post",
                url : url,
                data : data,
                async : true,
                processData: false,
                contentType: false,
                success : function (req) {
                    var res = eval(req);
                    if (res.error_code == 0) {
                        window.location.href = contextPath + "/otherfund/pending/list";
                    } else {
                        $alert(res.error_msg, function () {
                            rebind(".return_confirm", "click", returnSubmit);
                        });
                    }
                },
                error : function () {
                    $alert("提交失败，请重试", function () {
                        rebind(".return_confirm", "click", returnSubmit);
                    });
                }
            });
        }

        //取消按钮的点击逻辑
        bindEvents("click", ".return_cancel", function () {
            window.history.back();
        });

        $(function() {
            imgUpload();
        });
    })(jQuery,undefined);
</script>
</html>