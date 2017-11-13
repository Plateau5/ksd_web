/**
 * Created by Arley on 2017/8/6.
 */
// 机构列表页跳转
exports.VIEW_ORGANIZATION_LIST = function(req, res, next) {
    res.render('./organization/organizationList', { title: '机构管理'});
};
// 机构新增跳转
exports.VIEW_ORGANIZATION_TOADD = function(req, res, next) {
    res.render('./organization/create', { title: '机构管理-创建机构'});
};
// 查看机构详情
exports.VIEW_ORGANIZATION_DETAIL = function(req, res, next) {
    res.render('./organization/detail', { title: '机构管理-查看详情'});
};
// 编辑机构跳转
exports.VIEW_ORGANIZATION_TOEDIT = function(req, res, next) {
    res.render('./organization/edit', { title: '机构管理-编辑机构'});
};
// 机构管理-已发布产品列表跳转
exports.VIEW_ORGANIZATION_PRODUCT_PUBLISHLIST = function(req, res, next) {
    res.render('./organization/publishList', { title: '机构管理-产品列表'});
};
// 机构管理-产品新增跳转
exports.VIEW_ORGANIZATION_PRODUCT_TOADD = function(req, res, next) {
    res.render('./organization/productCreate', { title: '机构管理-新增产品'});
};
// 机构管理-仓库中产品列表跳转
exports.VIEW_ORGANIZATION_PRODUCT_WAREHOUSELIST = function(req, res, next) {
    res.render('./organization/warehouseList', { title: '机构管理-仓库中的产品'});
};
// 机构管理-产品编辑页跳转
exports.VIEW_ORGANIZATION_PRODUCT_TOEDIT = function(req, res, next) {
    res.render('./organization/productEdit', { title: '机构管理-编辑产品'});
};
// 机构管理-产品查看详情
exports.VIEW_ORGANIZATION_PRODUCT_DETAIL = function(req, res, next) {
    res.render('./organization/productDetail', { title: '机构管理-产品查看详情'});
};
// 机构管理-产品查看详情
exports.VIEW_ORGANIZATION_PRODUCT_MATERIAL = function(req, res, next) {
    res.render('./organization/material', { title: '机构管理-材料编辑'});
};