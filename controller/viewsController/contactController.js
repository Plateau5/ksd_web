/**
 * Created by Arley on 2017/8/16.
 */

// 人员信息主导航跳转
exports.VIEW_EMPLOYEE_SYSTEM = function(req, res, next) {
    res.redirect('/employee/list');
};
// 通讯录列表页跳转
exports.VIEW_EMPLOYEE_LIST = function(req, res, next) {
    res.render('./employee/list', {title : '人员信息-通讯录'});
};
// 邀请同事页跳转
exports.VIEW_EMPLOYEE_INVITE = function(req, res, next) {
    res.render('./employee/invite', {title : '人员信息-邀请同事'});
};
// 员工个人详情页跳转
exports.VIEW_EMPLOYEE_DETAIL = function(req, res, next) {
    res.render('./employee/information', {title : '人员信息-个人详情'});
};
// 部门页跳转
exports.VIEW_DEPARTMENT = function(req, res, next) {
    res.render('./contacts/department', {title : '人员信息-部门'});
};