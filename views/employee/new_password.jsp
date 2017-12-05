<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="per" uri="com/mvc/web/common/tag/permissionTag"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>


<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>初始化设置</title>
    {{include('./../inc/metaData')}}
    <link rel="stylesheet" href="{{markUri}}/static/css/employee/new_password.css"/>
</head>
<body>

<div id="password_upBox">
    <div class="password_upBox">
        <span class="pw_upBox_title">设置一个容易记忆的密码</span>
        <form name="password_form" class="password_form" method="post">
            <input type="password" id="new_pwd" placeholder="请输入6-16位新密码" name="new_pwd" placeholder="设置密码" class="password_new"/>
            <span style="color: #1DC6BC" id="error_new_pwd"></span>
            <input type="password" id="sub_pwd" placeholder="请输入6-16位确认密码" name="sub_pwd" placeholder="再次确认" class="password_new"/>
            <span style="color: #1DC6BC;" id="error_sub_pwd"></span>
            <div class="proProm2">
                <img src="{{markUri}}/static/img/employee/proProm.png" alt="">
                <span>...</span>
            </div>
            <input type="button" id="reset_pwd" disabled="disabled" value="确定" class="password_btn"/>
        </form>
    </div>
</div>
</body>
<script type="text/javascript" src="{{markUri}}/static/js/employee/new_password.js"></script>
</html>