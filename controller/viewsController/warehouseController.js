/**
 * Created by Arley on 2017/8/6.
 */

// 仓库管理-主导航跳转路径
exports.VIEW_WAREHOUSE_SYSTEM = function(req, res, next) {
    // todo 首页根据权限循环路由，重定向。
    res.redirect('/gps/warehouse/list')
};

/**
 * GPS部分
 */
// GPS仓库列表页跳转
exports.VIEW_GPS_LIST = function(req, res, next) {
    res.render('./gps/warehouseList', { title: '仓库管理-GPS仓库列表'});
};
// GPS仓库-创建GPS仓库跳转
exports.VIEW_GPS_CREATE = function(req, res, next) {
    res.render('./gps/warehouseCreate', { title: '仓库管理-创建GPS仓库'});
};
// GPS仓库-GPS仓库详情页跳转
exports.VIEW_GPS_DETAIL = function(req, res, next) {
    res.render('./gps/warehouseDetail', { title: '仓库管理-GPS仓库详情'});
};
// GPS仓库-编辑GPS仓库页跳转
exports.VIEW_GPS_EDIT = function(req, res, next) {
    res.render('./gps/warehouseEdit', { title: '仓库管理-编辑GPS仓库'});
};
// GPS仓库-GPS仓库-新增入库页跳转
exports.VIEW_GPS_PUTIN = function(req, res, next) {
    res.render('./gps/warehousePutin', { title: '仓库管理-GPS入库'});
};
// GPS仓库-GPS仓库-申请单详情页页跳转
exports.VIEW_GPS_APPLY_DETAIL = function(req, res, next) {
    res.render('./gps/applyDetail', { title: '仓库管理-GPS申请'});
};
// GPS仓库-GPS仓库-申请单详情页页跳转
exports.VIEW_GPS_APPLY_CONFIRM = function(req, res, next) {
    // TODO 根据确认发送参数进行页面跳转，目前默认为当面交付。
    res.redirect('/gps/apply/toFace');
};
// GPS仓库-GPS仓库-申请单-当面交付页跳转
exports.VIEW_GPS_APPLY_TOFACE = function(req, res, next) {
    res.render('./gps/applyToface', { title: '仓库管理-GPS当面交付'});
};
// GPS仓库-GPS仓库-申请单-快递邮寄页跳转
exports.VIEW_GPS_APPLY_EXPRESS = function(req, res, next) {
    res.render('./gps/applyExpress', { title: '仓库管理-GPS快递发送'});
};
// GPS仓库-GPS仓库-申请单-不同意页跳转
exports.VIEW_GPS_APPLY_DISAGREE = function(req, res, next) {
    res.render('./gps/applyDisagree', { title: '仓库管理-GPS不同意'});
};


/**
 * 行政仓库部分
 */
// 行政仓库列表页跳转
exports.VIEW_ADMINISTRATIVE_LIST = function(req, res, next) {
    res.render('./administrative/list', { title: '仓库管理-行政仓库列表'});
};
// 行政仓库-创建行政仓库跳转
exports.VIEW_ADMINISTRATIVE_CREATE = function(req, res, next) {
    res.render('./administrative/create', { title: '仓库管理-新建行政仓库'});
};
// 行政仓库-编辑仓库跳转
exports.VIEW_ADMINISTRATIVE_EDIT = function(req, res, next) {
    res.render('./administrative/edit', { title: '仓库管理-编辑行政仓库'});
};
// 行政仓库-库存列表页跳转
exports.VIEW_ADMINISTRATIVE_EQUIPMENT_LIST = function(req, res, next) {
    res.render('./administrative/equipmentList', { title: '仓库管理-行政物品列表'});
};
// 行政仓库-新增入库页跳转
exports.VIEW_ADMINISTRATIVE_EQUIPMENT_CREATE = function(req, res, next) {
    res.render('./administrative/equipmentCreate', { title: '仓库管理-新建物品'});
};
// 行政仓库-库存编辑页跳转
exports.VIEW_ADMINISTRATIVE_EQUIPMENT_EDIT = function(req, res, next) {
    res.render('./administrative/equipmentEdit', { title: '仓库管理-编辑物品'});
};