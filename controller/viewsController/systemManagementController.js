/**
 * Created by Arley on 2017/8/6.
 */
// 系统管理主导航跳转
exports.VIEW_SYSTEMMANAGEMENT = function(req, res, next) {
    // todo 默认指向租户列表
    res.redirect('/company/list');
};
// 系统管理-租户管理-列表页跳转
exports.VIEW_SYSTEM_COMPANY_LIST = function(req, res, next) {
    res.render('./company/list', { title: '系统管理-租户管理'});
};
// 系统管理-租户管理-创建租户跳转
exports.VIEW_SYSTEM_COMPANY_CREATE = function(req, res, next) {
    res.render('./company/create', { title: '租户管理-创建租户'});
};
// 系统管理-租户管理-编辑租户跳转
exports.VIEW_SYSTEM_COMPANY_EDIT = function(req, res, next) {
    res.render('./company/edit', { title: '租户管理-编辑租户'});
};
// 系统管理-租户管理-查看租户详情跳转
exports.VIEW_SYSTEM_COMPANY_DETAIL = function(req, res, next) {
    res.render('./company/detail', { title: '租户管理-租户详情'});
};
// 系统管理-意见反馈-列表页跳转
exports.VIEW_SYSTEM_FEEDBACK_LIST = function(req, res, next) {
    res.render('./feedback/list', { title: '意见反馈-意见列表'});
};
// 系统管理-意见反馈-查看详情页跳转
exports.VIEW_SYSTEM_FEEDBACK_DETAIL = function(req, res, next) {
    res.render('./feedback/detail', { title: '意见反馈-查看详情'});
};