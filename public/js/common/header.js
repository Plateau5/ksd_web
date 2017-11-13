$(function(){
	
    /*var inner_logininfo = $.cookie('inner_logininfo');
    var logininfo = $.cookie('logininfo');
     if(!inner_logininfo || !logininfo){
    	 alert('Please login again');
         window.location.href=contextPath+"/login/logout";
     }*/
    //header_nav
    $(".navbar-nav>.leftLi>a").css("lineHeight","60px");
    $(".navbar-nav>.leftLi").each(function(index){
        $(".navbar-nav>.leftLi").eq(index).on('click',function(){
            $(".personal_email").attr("src","/static/img/header/messageIcon.png");
            $(".exit").attr("src","/static/img/header/exitIcon.png");
            $(".navbar-nav>.leftLi>a").css("color","#fff");
            $(".navbar-nav>li").css("borderBottom","none");
            $(this).find("a").css("color","#1DC6BC");
            $(this).css("borderBottom","3px solid #1DC6BC");
        })
    });

    $(".navbar-right>li>a").eq(0).on('click',function(){
        $(".personal_email").attr("src","/static/img/header/messageIcon.png");
        $(this).css("color","#fff");
    });

    $(".navbar-right>li>a").eq(1).on('click',function(){
        $(".exit").attr("src","/static/img/header/exitIcon.png");
        $(".personal_email").attr("src","/static/img/header/messageIcon.png");
        $(".navbar-nav>.leftLi").css("borderBottom","none");
        $(".navbar-nav>.leftLi").find("a").css("color","#fff");
        $(this).css("color","#fff");
    });

    $(".navbar-right>li>a").eq(2).on('click',function(){
        $(".exit").attr("src","/static/img/header/exitIcon.png");
        $(".personal_email").attr("src","/static/img/header/messageIcon.png");
        $(".navbar-nav>.leftLi").css("borderBottom","none");
        $(".navbar-nav>.leftLi").find("a").css("color","#fff");
        $(this).css("color","#fff");
    });

    $(".navbar-right>.rightLiF>a").hover(function(){
        $(this).css({
            "color":"#1DC6BC",
            "cursor":"hand"
        });
    },function(){
        $(this).css("color","#fff");
    });

    //通知
    $(".personal_email").click(function(){
        $(".personal_email").attr("src","/static/img/header/mesHIcon.png");
        $(".personal_email").hover(function(){
            $(this).attr("src","/static/img/header/mesHIcon.png");
        },function(){
            $(this).attr("src","/static/img/header/mesHIcon.png");
        });
    });

    $(".personal_email").hover(function(){
        $(this).attr("src","/static/img/header/mesHIcon.png");
    },function(){
        $(this).attr("src","/static/img/header/messageIcon.png");
    });

    //退出
    $(".exit").hover(function(){
        $(this).attr("src","/static/img/header/exitHIcon.png");
    },function(){
        $(this).attr("src","/static/img/header/exitIcon.png");
    });



    resetUpdataImg();

    setBottomBorder();
});

function resetUpdataImg() {
    var box = $(".updata_img");
    var ele = '<div class="updata_img_mask"></div>';


    box.each(function() {
        $(this).append(ele);
    });


    $(".updata_img_mask").off("click").on("click", function() {
        var _this = $(this)
        var num = 5;        //剩余允许上传图片的最多个数
        var count = $(".file_item").length;  //已上传的图片的个数
        if(count == 5) {
            return;
        }
        num -= count; //剩余允许上传的图片的个数
        if(num > 0) {
            var inputFile = $(this).siblings('input[type="file"]');
            if(inputFile.length) {
                inputFile.each(function() {
                    var block = $(this).css("display");
                    if(block == "block") {
                        $(this).click();
                        num++;
                    }
                });
            }
        }
    });

}


/*
* 统一设置详情页归档材料部分底边框
* */
function setBottomBorder () {
    var datumDesc = $(".datum_desc");
    if (datumDesc.length == 0) {
        return;
    }
    var datumNext = datumDesc.parent(".filed-detail").nextAll(".requestpayout_detail_remarks");
    if (datumNext.length == 0) {
        datumDesc.css({
            "border-bottom" : "none"
        });
    }

}


/**
 * 自定义jQuery的Ajax请求方法
 *  参数必选项：type,url,data,successHandler，其余为可选项。
 *
 *  @author Arley   06|12|2016
 *
 *  @param type     ：   请求类型，默认为“ POST ”
 *  @param url      ：   请求接口地址
 *  @param successHandler   ：   请求成功后的回调函数
 *  @param errorHandler     ：   请求失败后的回调函数
 *  @param beforeHandler    ：   请求发送前的执行函数
 *  @param conmleteHandler  ：   请求完成后的执行函数
 *  @param async    ：   异步或同步，默认为异步（true）
 *
 */

function $ajax (type, url, data, successHandler, errorHandler, beforeHandler, completeHandler, async) {
    if (!!type) {
        if (typeof type != 'string') {
            throw new Error("The parameter of 'type''s type must be a string.");
            return;
        }
    } else {
        throw new Error("The parameter of 'type' is not defined.");
    }

    if (!!url) {
        if (typeof url != 'string') {
            throw new Error("The parameter of 'url''s type must be a string.");
            return;
        }
    } else {
        throw new Error("The parameter of 'url' is not defined.");
    }

    var _data;
    if (typeof data == 'string') {
        var reg = /[-_=]/ig;
        if (reg.test(data)) {
            _data = data;
        } else {
            throw new Error("The parameter 'data' format is wrong.");
        }
    } else if (typeof data == 'object') {
        _data = data;
    } else {
        return  new Error('Parameter data is wrong');
    }

    if (!!successHandler && typeof successHandler != 'function') {
        return;
    }

    if (!!errorHandler && typeof errorHandler != 'function') {
        return;
    }

    if (!!beforeHandler && typeof beforeHandler != 'function') {
        return;
    }

    if (!!completeHandler && typeof completeHandler != 'function') {
        return;
    }

    if (!!async && async != false && async != true) {
        return;
    }

    $.ajax({
        type : type || 'post',
        url : url,
        data : _data,
        dataType : 'json',            //php接口GET方法时不对。
        async : async || true,
        timeout : 2000,
        contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
        beforeSend : beforeHandler,
        success : function (res) {
            try {
                if (res) {
                    var data = eval("("+ res +")");
                    successHandler(data);
                } else {
                    console.log(JSON.stringify(res));
                }
            } catch (e) {
                console.log(e.message);
                if (res) {
                    successHandler(res);
                } else {
                    console.log(JSON.stringify(res));
                }
            }
        },
        error : function (XMLHttpRequest, textStatus, errorThrown) {
            errorHandler();
        },
        complete : completeHandler
    });
    return true;
}


/**
 * 隐藏域表单提交方法（页面跳转）
 * @author Arley   29|03|2017
 *
 * @param opt {Object} 需要传入的跳转参数明细
 * 注意：页面跳转参数需在opt的queryString中配置：
 *     {
 *       action : '',
 *       method : '',
 *       enctype : 'multipart/form-data',
 *       param : {
 *              finance_id : 10056，
 *              pageNum : 9
 *              ……
 *          }
 *          ……
 *       }
 *
 */
function locationTo (opt) {
    var option = {
        action : '',
        method : 'post',
        enctype : 'application/x-www-form-urlencoded', //用于文件上传时间必须配置该项为‘'multipart/form-data'’
        param : {
            finance_id : ''
        }
    };
    var options = $.extend({}, option, opt);
    var form = document.createElement("form"); //隐藏域form元素
    var formId = form.id = "submitForm" + (new Date().getTime()); //动态创建form元素唯一标识符id
    form.action = options.action;
    form.method = options.method;
    form.enctype = options.enctype;
    form.style.display = 'none';
    document.body.appendChild(form);
    var inputEles = '', //form表单内部input元素
            arr = options.param;
    for (var key in arr) {
        inputEles += '<input type="hidden" name="'+ key +'" value="'+ arr[key] +'" />';
    }
    var thisForm = document.getElementById(formId);
    thisForm.innerHTML = inputEles;
    thisForm.submit();
}

function $alert (text, callback) {
    dialog("alert", {
        closeBtn : false,
        "title" : "提  醒",
        "button" : ["确定",""],
        "content" : text,
        onConfirm : function (d) {
            d.close();
            callback && callback();
        }
    });
}


/**
 * 判断当前窗口是否为USER屏幕最前端视口
 * @author Arley   01|12|2016
 *
 * 该方法必须声明全局变量：WINDOWFOCUS
 * 依赖于jQuery。
 *
 */
var WINDOWFOCUS = true; //该全局变量用于保存当前页面是否在屏幕最前端（即：未最小化或是未切换任务栏）
function windowInFocus () {
    $(window).on("focus", function () {
        WINDOWFOCUS = true;
    });
    $(window).on("blur", function () {
        WINDOWFOCUS = false;
    });
    return true;
}

/**
 *  按钮禁用方法(IE下适用IE8以上)
 *  注意：该方法与 rebind 方法共同使用，切传入事件句柄必须相同
 *
 *  @author Arley   01|12|2016
 *
 *  @param selector         ：   目标元素选择器          string类型       必选项
 *  @Param type             ：   解除绑定事件类型        string类型       必选项
 *  @param eventHandler     ：   目标元素事件句柄                         必选项
 *  @param callback         ：   禁用后需要执行的逻辑                     可选项
 */
function disabled(selector, event, eventHandler, callback) {
    if (typeof selector != 'string') {
        return;
    }
    if (typeof event != 'string') {
        return;
    }
    if (typeof eventHandler != 'function' || Boolean(eventHandler) == false) {
        return;
    }
    if (!!callback) {
        if (typeof callback != 'function') {
            return;
        }
    }
    var d = document.querySelectorAll(selector).item(0);
    if (d.removeEventListener) {
        d.removeEventListener(event, eventHandler, false);
    } else if (d.detachEvent) {   //兼容IE8及其他浏览器
        d.detachEvent('on' + event, eventHandler);
    } else {
        alert("该浏览器暂不支持这种方法，请选择其他方法")
    }
    callback && callback();
    return true;
}

/**
 *  按钮恢复绑定事件方法(IE下适用IE8以上)
 *  注意：该方法与 disabled 方法共同使用，切传入事件句柄必须相同
 *
 *  @author Arley   01|12|2016
 *
 *  @param selector         ： 目标元素选择器             string类型   必选项
 *  @Param type             :  解除绑定事件类型           string类型   必选项
 *  @param eventHandler     ： 目标元素事件句柄                        必选项
 *  @param callback         ： 重新绑定后需要执行的逻辑                 可选项
 */

function rebind (selector, event, eventHandler, callback) {
    if (typeof selector != 'string') {
        return;
    }
    if (typeof event != 'string') {
        return;
    }
    if (typeof eventHandler != 'function' || Boolean(eventHandler) == false) {
        return;
    }
    if (!!callback) {
        if (typeof callback != 'function') {
            return;
        }
    }
    var d = document.querySelectorAll(selector).item(0);
    if (d.addEventListener) {
        d.addEventListener(event, eventHandler, false);
    } else if (d.attachEvent) {  //兼容IE8及其他浏览器
        d.attachEvent('on' + event, eventHandler);
    } else {
        alert("该浏览器暂不支持这种方法，请选择其他方法");
    }
    callback && callback();
    return true;
}

/**
 * 扩展Date()方法的格式化
 * @author Arley   07|04|2017
 *
 * @param fmt {string} :  "yyyy/MM/dd qq hh/mm/ss" 注：该规则字符串可随意删减部分传入。
 * @returns {*}
 */
Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};























