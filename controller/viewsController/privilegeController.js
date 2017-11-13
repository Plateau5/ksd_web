/**
 * Created by Arley on 2017/8/16.
 */

// 权限管理-主导航跳转
exports.VIEW_PRIVILEGE_system = function(req, res, next) {
    res.redirect('/privilege/roles/list');
};
// 权限管理-角色列表页跳转
exports.VIEW_PRIVILEGE_ROLE_LIST = function(req, res, next) {
    res.render('./privilege/rolesList', {title : '权限管理-角色列表'});
};
// 权限管理-角色管理-创建页跳转
exports.VIEW_PRIVILEGE_ROLE_CREATE = function(req, res, next) {
    res.render('./privilege/privilege', {title : '权限管理-创建角色'});
};
// 权限管理-角色管理-编辑页跳转
exports.VIEW_PRIVILEGE_ROLE_EDIT = function(req, res, next) {
    res.render('./privilege/privilege', {title : '权限管理-编辑角色'});
};
// 权限管理-人员管理-列表页跳转
exports.VIEW_PRIVILEGE_USER_LIST = function(req, res, next) {
    res.render('./privilege/personList', {title : '权限管理-人员列表'});
};
// 权限管理-人员管理-赋予角色跳转
exports.VIEW_PRIVILEGE_USER_ASSIGN_ROLES = function(req, res, next) {
    res.render('./privilege/assignRoles', {title : '权限管理-赋予角色'});
};