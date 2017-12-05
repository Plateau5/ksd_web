<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>找回密码</title>
    {{include('./../inc/common')}}
    <link rel="stylesheet" href="{{markUri}}/static/css/login/login.css">
    <link rel="stylesheet" href="{{markUri}}/static/css/employee/reset_password.css">

</head>

<body>

<!--忘记密码页  开始-->
<div id="forVIEW_password">

    <div class="forgetNav">
        <ul class="inline ulLeft">
            <li class="inline"><img src="{{markUri}}/static/img/header/headerLogo.png" alt=""></li>
            <!--<li class="inline">重置密码</li>-->
        </ul>
        <ul class="inline ulRight">
            <li class="cursor" id="login_button">登录</li>
        </ul>
    </div>

    <div class="forgetCon">

        <span class="pwdTitle">重置密码</span>

        <div class="fgProgress">
            <div class="proD"></div>
            <div class="proD proMask"></div>
            <div class="proRadius proF proActive">1</div>
            <span class="forMT proFf proActiveS">手机验证</span>
            <div class="proRadius proS">2</div>
            <span class="forMT proSs">设置密码</span>
            <div class="proRadius proT">3</div>
            <span class="forMT proTt">完成</span>
        </div>

        <!--first start-->
        <form action="" class="formFirst" method="post">

            <input type="hidden"  id="uid" value="">
            <input type="text" placeholder="输入手机号" id="phone" maxlength="11" name="phone" class="forInput phoneInp">
            <input type="text" placeholder="输入验证码" maxlength="4" id="verify_code" name="verify_code" class="forInput psInp">
            <div class="getCode getCodeW cursor" id="retrievepassword">获取验证码</div>
            <div class="getCode getCodeW" id="count1"><span>120</span>s后重新发送</div>
            <div class="proProm1">
                <img src="{{markUri}}/static/img/employee/proProm.png" alt="">
                <span>请输入正确的手机号</span>
            </div>
            <input type="button" value="下一步" class="forFSubBtn" id="next_step">
        </form>
        <!--first end-->

        <!--secode start-->
        <form action="" class="formSecode" method="post">
            <input type="password" placeholder="6-16位数字或字母" class="forInput pwInp" id="new_pwd" maxlength="16">
            <span style="color: #1DC6BC" id="error_new_pwd"></span>
            <input type="password" placeholder="请与上面输入密码一致" class="forInput mimaInp" id="sub_pwd">
            <span style="color: #1DC6BC" id="error_sub_pwd"></span>
            <div class="proProm2">
                <img src="{{markUri}}/static/img/employee/proProm.png" alt="">
                <span></span>
            </div>
            <input type="button" value="提交" disabled="disabled" class="forSSubBtn" id="reset_pwd">
        </form>
        <!--secode end-->

        <!--third start-->
        <div class="formThird">
            <img src="{{markUri}}/static/img/employee/pwdY.png" alt="">
            <span class="pwdT">新密码设置成功！</span>
            <span class="pwdP">请牢记您设置的新密码</span>
            <a href="javascript:;" id="back_login">返回登录</a>
        </div>
        <!--third end-->
    </div>

</div>
<!--忘记密码页  结束-->
<script src="{{markUri}}/static/js/employee/reset_password.js"></script>
<script src="{{markUri}}/static/js/common/jquery.md5.js"></script>
</body>
</html>
