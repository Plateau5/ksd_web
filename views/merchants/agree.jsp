<!-- 通知回款结果 -->
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
    <link rel="stylesheet" href="${contentPath}/static/dialog/dialog-layer.css">
    <link rel="stylesheet" href="${contentPath}/static/css/manufacturing.css">
    <title>商户管理-通过</title>
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
                <a href="{{markUri}}/supplier/manager" class="crumbs_item">商户管理</a>
                <a href="{{markUri}}/supplier/audit/list" class="crumbs_item">待审批</a>
                <a href="javascript:window.history.back();" class="crumbs_item">${name}</a>
                <a href="javascript:;" class="crumbs_item">通过</a>
            </div>
            <div class="cashed_mark">
                <form action="" method="post" id="returnResult">
                    <input type="hidden" name="supplier_id" value="${supplier_id}">
                    <input type="hidden" name="is_agree" value="1">
                    <div class="form_row textarea_container">
                        <div class="column_l" style="width: 4%;">备注：</div>
                        <div class="column_r" style="width: 90%;">
                            <textarea name="remark" id="remark" maxlength="200" placeholder="请输入备注信息"></textarea>
                        </div>
                    </div>
                    <div class="img_upload"  style="padding-left: 7%;">
                        <div class="img_upload_layer"><span class="text">上传图片</span><span class="text_tip">（最多5张图片，每张大小不超过5M）</span></div>
                        <input type="file" class="img_upload_btn" name="file" accept="image/jpeg,image/jpg,image/png" value="上传图片" style="display: none" />
                        <div class="img_box">
                            <!-- 上传图片缩略图 -->

                        </div>

                    </div>
                </form>
                <div class="btn_box clearfix text_left"   style="padding-left: 7%;">
                    <per:button  code="1374">
                        <a href="javascript:" class="btn orange_btn confirm submit_confirm">确认</a>
                        <a href="javascript:" class="btn bg_btn submit_cancel">取消</a>
                    </per:button>
                </div>
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
        rebind(".submit_confirm", "click", returnSubmit);
        //确定按钮的点击事件逻辑
        function returnSubmit () {
            disabled(".submit_confirm", "click", returnSubmit);//禁用按钮
            var url = contextPath + "/api/supplier/records/check";
            var data = new FormData(document.getElementById("returnResult"));
            $.ajax({
                type : "post",
                url : url,
                data : data,
                async : false,
                processData: false,
                contentType: false,
                success : function (req) {
                    var res = eval(req);
                    if (res.error_code == 0) {
                        $alert('提交成功', function () {
                            window.location.href = contextPath + "/supplier/audit/list";
                        });
                    } else {
                        $alert(res.error_msg, function (){
                            rebind( ".submit_confirm", "click", returnSubmit);
                        });
                    }
                },
                error : function () {
                    $alert("提交异常，请稍后重试");
                    rebind( ".submit_confirm", "click", returnSubmit);
                }
            });
        }

        //取消按钮的点击逻辑
        bindEvents("click", ".submit_cancel", function () {
            window.history.back();
        });




        $(function() {
            imgUpload();
        });
    })(jQuery,undefined);
</script>
</html>