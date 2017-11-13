<!-- 同意 -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="per" uri="com/mvc/web/common/tag/permissionTag"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    {{include('./../inc/cssSources')}}
    <link rel="stylesheet" href="${contentPath}/static/dialog/dialog-layer.css">
    <link rel="stylesheet" href="/static/css/customerService.css">
    <title>客户管理-同意</title>
</head>
<body>
<div id="wrapper" class="wrapper">
    <!-------- Part of header Begin -------->
    {{include('./../inc/header')}}
    <!-------- Part of header End -------->

    <!-------- Part of main Begin -------->
    <div id="section" class="section normal_width">
        <!---- Part of slide nav Begin ---->
        {{include('./../inc/customer_slide_nav')}}
        <!---- Part of slide na End ---->

        <!---- Part of Main info Begin ---->
        <div id="main" class="main">
            <div class="crumbs_nav">
                <a href="${contextPath }/compact/system" class="crumbs_item">合同管理</a>
                <a href="${contextPath }/compact/pendingPass/list" class="crumbs_item">待出合同</a>
                <a href="javascript:;" class="crumbs_item">邮件</a>
            </div>
            <div class="email_content">
                <form id="send_email">
                    <input type="hidden" value="${finance_id }" name="finance_id">
                    <input type="hidden" value="${vo.account }" name="email">
                    <input type="hidden" value="关于客户${vo.user_name}的贷款合同资料" name="subject">
                    <div class="recipient">
                        <span class="item_key">收件人：</span>
                        <span class="item_val">${vo.create_name }（${vo.account }）</span>
                    </div>
                    <div class="subject">
                        <span class="item_key">主题：</span>
                        <span class="item_val">关于客户<span>${vo.user_name}</span>的贷款合同资料</span>
                    </div>
                    <div class="file_upload">
                        <div class="file_upload_layer"><span class="text">上传附件</span><span class="text_tip">（20M以内）</span></div>
                        <input type="file" class="file_upload_btn" name="file"  value="上传附件" style="display: none" />
                        <div class="error_msg">请使用正确格式的文件</div>
                        <div class="file_box">
                            <!--<div class="file_item">
                                <img src="" alt="">
                                <span class="file_name">shenfenzheng.jpg</span>
                                <span class="file_size">0.27M</span>
                                <div class="remove_mask">
                                    <em class="remove_btn"></em>
                                </div>
                            </div>-->

                        </div>
                    </div>
                </form>
                <div class="btn_box clearfix text_left">
                    <per:button code="1266">
                        <a href="javascript:" class="btn orange_btn confirm send_compact">确认</a>
                        <a href="javascript:window.history.back();" class="btn bg_btn send_cancel">取消</a>
                    </per:button>
                </div>
            </div>
        </div>
        <!---- Part of Main info End ---->
    </div>
</div>
<div class="loading" id="loading"></div>
</body>
{{include('./../inc/jsSources')}}
<script src="/static/dialog/dialog-layer.js"></script>
<script>
    (function ($) {
        var elem = {
            confirm : $(".send_compact"),
            loading : $('#loading')
        };
        // 校验是否有附件
        function  verify () {
            var elem = $('.file_box');
            var files = elem.find('.file_item');
            if (files.length <= 0) {
                $alert('附件不能为空');
                return false;
            }
            return true;
        }
        // 绑定提交事件
        function sendEmail () {
            elem.confirm.off('click').on('click', function () {
                sendEmailEvent ();
            })
        }
        //提交逻辑
        function sendEmailEvent () {
            var valid = verify();
            if (valid) {
                elem.confirm.off("click");
                var data = new FormData($('#send_email')[0]);
                var url = contextPath + '/api/compact/agree';
                $.ajax({
                    type : "post",
                    url : url,
                    data : data,
                    async : true,
                    timeout : 300000,
                    processData: false,
                    contentType: false,
                    beforeSend : function () {
                        elem.loading.show();
                    },
                    success : function (res) {
                        elem.loading.hide();
                        if (res.error_code == 0) {
                            $alert('合同发送成功', function () {
                                window.location.href = contextPath + '/compact/pendingPass/list';
                            });
                        } else {
                            console.log(res.error_msg);
                            dialog('open', {
                                title : '提醒',
                                content: '发送失败，是否继续发送',
                                onConfirm : function () {
                                    sendEmail();
                                    elem.confirm.click();
                                },
                                onCancel : function () {
                                    window.location.href = contextPath + '/compact/pendingPass/list';
                                }
                            })
                        }
                    },
                    error : function () {
                        $alert('发送失败，重新发送', function () {
                            sendEmail();
                            elem.confirm.click();
                        });
                    }
                });
            }
        }


        $(function() {
            fileUpload({
                maxCount : 5,
                filesSize : 20,
                fileFormat : ['pages', 'doc', 'docx', 'dot', 'dotx', 'docm', 'dotm', 'pdf', 'bmp', 'jpg', 'png', 'jpeg', 'rar', 'zip', 'tar', 'cab', 'gif', 'svg', '7z']
            });
            sendEmail();
        });
    })(jQuery,undefined);
</script>
</html>