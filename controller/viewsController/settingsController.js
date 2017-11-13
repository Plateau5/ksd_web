/**
 * Created by Arley on 2017/8/16
 */

// 个人中心-导航跳转
exports.VIEW_userCenter = function(req, res, next) {
    res.render('./personal/editFile', { title: '个人中心-个人信息'});
};
// 个人中心-修改密码跳转
exports.VIEW_userCenter_resetPassword = function(req, res, next) {
    res.render('./personal/resetPassword', { title: '个人中心-修改密码'});
};