<!-- 不同意 -->
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="per" uri="com/mvc/web/common/tag/permissionTag"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>客户管理-不同意</title>
    {{include('./../inc/metaData')}}
    <link rel="stylesheet" href="/static/css/employee/listCon.css">
    <link rel="stylesheet" href="/static/css/finance/imgUnpass.css"/>
    <link rel="stylesheet" href="/static/css/question/edit.css">
    <link rel="stylesheet" href="/static/css/requestpayout/disagree.css">
</head>
<style>
    body{overflow-x:hidden;}
    .form-item{margin-left:12px;}
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
            <div class="listConHeader inviteCon" style="line-height: normal;padding-left:12px;margin-top:32px;">
                <ul>
                    <li class="inline colorB"><a class="TS" href="${contextPath }/requestPayout/system">请款管理</a></li>
                    <li class="inline before"><a href="${contextPath }${url}">${navigation}</a></li>
                    <li class="inline before"><a href="javascript:window.history.back();">${vo.user_name }</a></li>
                    <li class="inline before"><a href="javascript:;" style="cursor:default">不同意</a></li>
                </ul>
            </div>
            <!--inviteCon end-->
            <form class="formML" id="select_info" enctype="multipart/form-data" method="post">
                <input type="hidden" name="finance_id" value="${finance_id }">
                <input type="hidden" name="request_status" value="${vo.request_status}">
                <input type="hidden" id="select_question_ids" name="question_ids" value="">
                <input type="hidden" id="select_reason" name="reason" value="">
                <input type="hidden" name="advance_id" value="${vo.advance_id}">
                <div class="form-item" style="height:30px;">
                    <label>
                        <span class="need">*</span>问题分类：</label>
                    <div>
                        <select name="parent_id" id="question_classify_name">
                         <c:forEach items="${list }" var="bean">
                            <option value="${bean.id }">${bean.value}</option>
                         </c:forEach>
                        </select>
                    </div>
                   <!-- <div class="error_prom"></div>-->
                </div>
                <div class="form-item">
                    <label>
                        <span class="need">*</span>问题标题：</label>
                    <div class="question_container">
                    <c:if test="${empty child_list }">
                    	<div class="question_container_prom">该分类暂无问题详情，请重新选择问题分类</div>
                    </c:if>
                    <c:forEach items="${child_list }" var="bean">
                        <div class="question-con-box">
                            <div class="check">
                                <div class="check_img icon_uncheck" data_id="${bean.id }"></div>
                                <span>${bean.value}</span>
                            </div>
                            <!--<p class="question-con">${bean.content}</p>-->
                            <input type="hidden" class="question-val" value="${bean.content}">
                        </div>
                    </c:forEach>
                    </div>
                    <!--<div class="error_prom"></div>-->
                </div>
                <div class="form-item" style="padding-top:20px;">
                    <label style="text-align: right;padding-right:20px;">备注：</label>
                    <textarea name="remark" id="remark" style="border:1px solid #e4e4e4;resize: none;margin-left:0;" placeholder="请输入内容(200字以内)" maxlength="200"></textarea>
                </div>
                <div class="form-item" style="height:20px;padding-top:20px;">
                    <div class="img_item updata_img">
                        <div class="file_btn">上传图片</div>
                        <input type="file" id="file_select1" class="cursor file_input" name="file" onchange="select_allow(this);" accept="image/jpeg,image/jpg,image/png"/>
                        <span class="file_prom">(最多5张图片，每张大小不超过5M)</span>
                    </div>
                </div>
                <div class="form-item" style="margin-top:0;padding-top:20px;">
                    <div class="file_box"></div>
                </div>
                <per:button code="1119">
                    <div class="form-item" style="margin-left: 0;margin-top:40px;padding-left: 96px;">
                        <div class="create_btn" style="margin-left: 0;">
                            <input type="button" class="create_sub" data-advance_id="${vo.advance_id}" id="disagree_sub" value="确认" data-url="${url}"  style="margin:0;"/>
                            <a href="javascript:window.history.back();">
                                <input type="button" class="cancel_btn" value="取消">
                            </a>
                        </div>
                    </div>
                </per:button>
            </form>
        </div>

        <!--listCon end-->

    </div>


</div>

<!--container end-->

</body>
<script src="/static/js/finance/img_unpass.js"></script>
<script src="/static/js/requestpayout/disagree.js"></script>
<script>
    var isCompact = false;
    $('.form-item').eq(0).css('marginTop','15px');
    $(function(){
        $('body').off('click').on('click','.check_img',function(e){
            var e = e || window.event;
            e.preventDefault();
            e.stopPropagation();
            var class_name = $(this).attr('class');
            if(class_name.indexOf('icon_uncheck') >= 0){
                $(this).removeClass('icon_uncheck').addClass('icon_check');
            }else{
                $(this).removeClass('icon_check').addClass('icon_uncheck');
            }

        });
    });


    // 上传图片按钮
    $(document).delegate('.updata_img_mask', 'mouseover', function(e) {
        e.preventDefault();
        var count = $(".file_item").length;  //已上传的图片的个数
        if(count != 5) {
            $(this).css("cursor","pointer");
            $('.file_btn').css('color', '#1DC6BC');
            $('.file_btn').css('background', 'url(/static/img/question/upload_icon_hover.png) left center no-repeat');
        } else {
            $(this).css("cursor","default");
        }
    });
    $(document).delegate('.updata_img_mask', 'mouseout', function(e) {
        e.preventDefault();
        $('.file_btn').css('color', '#535E6A');
        $('.file_btn').css('background', 'url(/static/img/question/upload_icon.png) left center no-repeat');
    });

    // 关于图片
    $(document).delegate('.file_item', 'mouseover', function(e) {
        e.preventDefault();
        $(this).find('.file_item_txt_bg').css('display', 'block')
    });
    $(document).delegate('.file_item', 'mouseout', function(e) {
        e.preventDefault();
        $(this).find('.file_item_txt_bg').css('display', 'none');
    });

    var file_ids_arr = [];
    $(document).delegate('.del_img_item', 'click', function(e) {
        e.preventDefault();
        var file_item = $('.file_item');
        $(this).parents('.file_item').remove();
        var id = $(this).attr('file_id');
        if (!id) {
            //自添加
            var num = $(this).attr('data_num');
            $('#file_select' + parseInt(num - 1)).remove();
            if(file_item.length == 5){
                var div_last = $('div[class *= "file_input"]');
                var data_num = div_last.attr('id');
                div_last.remove();
                var inner = '<input type="file" class="cursor file_input" id="file_select' + parseInt(data_num.slice(11,data_num.length)) + '" name="file" onchange="select_allow(this);" accept="image/jpeg,image/jpg,image/png"/>';
                $('.img_item').append(inner);
            }
        }else{
            //原始
            file_ids_arr.push(id);
            $('#file_ids').val(file_ids_arr.join(','));
            if(file_item.length == 5){
                var div_last = $('div[class *= "file_input"]');
                var data_num = div_last.attr('id');
                div_last.remove();
                var inner = '<input type="file" class="cursor file_input" id="file_select' + parseInt(data_num.slice(11,data_num.length)) + '" name="file" onchange="select_allow(this);" accept="image/jpeg,image/jpg,image/png"/>';
                $('.img_item').append(inner);
            }
        }


    });

    var image_edit = '';
    var num = 0;
    function select_allow(file) {
        var length = $('.file_item').length;
        if (length == '5') {
            return;
        }
        if (length == '4') {
            var inner2 = '<div class="cursor file_input" id="file_select'
                    + parseInt(num + 2) + '"></div>';
        } else {
            var inner2 = '<input type="file" class="cursor file_input" id="file_select'
                    + parseInt(num + 2)
                    + '" name="file" onchange="select_allow(this);" accept="image/jpeg,image/jpg,image/png"/>';
        }
        selectImage(file, inner2);
    }
    function selectImage(file, inner2) {
        if (!file.files || !file.files[0]) {
            return;
        }
        var filepath = file.value;
        var extname = filepath.substring(filepath.lastIndexOf(".") + 1,
                filepath.length);
        if (extname != 'jpg' && extname != 'jpeg' && extname != 'png') {
            alert('请使用正确格式的图片');
            $(this).parent().parent().parent().next().next().html("请使用正确格式的图片");
            if(file.outerHTML){
                file.outerHTML=file.outerHTML;
            } else{      //FF
                file.value="";
            }
            return;
        }
        var size = file.files[0].size;
        if (size > 5 * 1024 * 1024) {
            alert('图片大小超过5M');
            return;
        }
        num += 1;
        var name = file.files[0].name;
        var inner1 = '<div class="file_item"><img src="" alt="" class="input_img" id="img'
                + num
                + '"><div class="file_item_txt"><ul><li class="file_name">'
                + name
                + '</li><li class="file_size">'
                + (size / 1024 / 1024).toFixed(2)
                + 'M</li></ul></div><div class="file_item_txt_bg"><img src="/static/img/question/remove_icon.png" alt="" data_num="'
                + parseInt(num + 1) + '" class="cursor del_img_item"></div></div>';
        $('.file_box').append(inner1);
        $('.img_item').append(inner2);
        $('#file_select' + num).css('display', 'none');
        var reader = new FileReader();
        reader.onload = function(evt) {
            document.getElementById('img' + num).src = evt.target.result;
            image_edit = evt.target.result;
        };
        reader.readAsDataURL(file.files[0]);
    }


</script>
</html>
