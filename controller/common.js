//var common = require('./common');
var COMMONUTIL = require('./../util/commonUtil');  // 主加密方法类文件
var extend = require('node.extend');
var request = require('request');
/*var app = require('./../app');
app.logger('common');*/
/**
 * 导航的选中状态
 * @author Arley Joe | 2017年7月24日15:02:16
 * @param req
 * @param res
 * @param next
 */
exports.startWith = function (req, res, next) {
    res.locals.startWith = function (nav) {
        var result = '';
        var _path = req.path;
        var navArr = nav.split(" || ");
        for(var i in navArr) {
            if (navArr[i]) {
                if (_path.indexOf(navArr[i]) !== -1) {
                    result = true;
                    break;
                } else {
                    result = false;
                }
            }
        }
        return result;
    };
    next();
};

/**
 * 请求头中Cookie的解析
 * @author Arley Joe 2017-8-22 16:44:58
 * @param req ： request实例
 * @param res ： response实例
 * @param next ： 程序执行下一步必须调用‘next();’
 * @returns {string} ： 格式化后的Cookie串
 */
exports.getCookies = function (req, res, next) {
    var cookiesObj = req.cookies;
    var cookies = [];
    for (var key in cookiesObj) {
        cookies.push(key.toString() + '=' + encodeURIComponent(cookiesObj[key]));
    }
    return cookies.join(';');
};

/**
 * 获取用户信息（头像、用户名）
 * @author Arley JOe 2017-8-24 10:43:32
 * @param req 请求头信息
 * @param res 响应信息
 * @param next 下一步
 */
exports.getUserInfo = function (req, res, next) {
    res.locals.getUserInfo = function () {
        var cookiesObj = req.cookies;
        var userInfo = {};
        for (var key in cookiesObj) {
            if (key !== 'JSESSIONID') {
                var _val = COMMONUTIL.decrypt(cookiesObj[key]);
                /*console.log(key + ' = ' + a);
                login_info = 管理员
                login_info_img = http://emp-file.img-cn-beijing.aliyuncs.com/6c387299-b919-4762-862f-b91f7dc5a8ba.jpg@100w_100h_100q.jpg*/
                userInfo[key] = _val.toString();
            }
        }
        /*console.log(userInfo);*/
        return userInfo;
    };
    next();
};

/**
 * 权限校验功能（Verify Permissions）
 * @author Arley Joe 2017-8-24 15:26:55
 * @params p {String || Number} : 权限code码。
 */
exports.verifyCode = function (req, res, next) {
    res.locals.verifyCode = function (p) {
        var privilegeCookie = COMMONUTIL.decrypt(req.cookies.logininfo);
        var privilegeArr = privilegeCookie.split(',');
        p = Number(p);
        for (var i = 0, len = privilegeArr.length; i < len; i++) {
            var _thisPrivilege = Number(privilegeArr[i]);
            if (p === _thisPrivilege) {
                return true;
            }
        }
        return false;
    };
    next();
};

exports.checkPrivilege = function (p, req) {
    var privilegeCookie = COMMONUTIL.decrypt(req.cookies.logininfo);
    var privilegeArr = privilegeCookie.split(',');
    p = Number(p);
    for (var i = 0, len = privilegeArr.length; i < len; i++) {
        var _thisPrivilege = Number(privilegeArr[i]);
        if (p === _thisPrivilege) {
            return true;
        }
    }
    return false;
};

/**
 *
 * @param opt
 * @param callback
 * @param req
 * @param res
 * @param next
 */
exports.httpRequest = function (opt, callback, req, res, next) {
    var cookies = this.getCookies(req, res, next);
    var option = {
        method : 'post',
        url : '',
        timeout : 10000,
        headers : {
            Cookie : cookies,
            ctype : 1
        }
    };
    var  options = extend(true, option, opt);
    request(options, function (error, response, body) {
        //logger.info("This is an index page! -- log4js");
        if (!error && response.statusCode === 200) {
            var result = null;
            try {
                result = JSON.parse(body);
                callback(result);
            } catch (e) {
                result = body;
                callback(result);
                console.error(e.message);
            }
        } else {
            res.redirect('/404');
        }
        res.end();
    });

};

/**
 * 获取客户列表页数据公用方法
 * @author Arley Joe 2017-11-14 11:31:11
 *
 */
exports.getCustomerList = function(url,title, req, res, next) {
    var body = req.body;
    var data = {};
    var localUrl = req.originalUrl;
    this.httpRequest({
        url : contextPath + url,
        formData : body
    }, function (result) {
        data = result;
        if (data.error_code === 0) {
            data.title = title;
            data.originUrl = localUrl;
            res.render('./customer/customerList', data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
};