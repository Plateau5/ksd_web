/**
 * Created by Arley on 2017/8/6.
 */
exports.VIEW_CUSTOMER_DATA = function(req, res, next) {
    // isLogin();
    res.render('./customer/customerList', { title: '客户管理'});
};
exports.VIEW_CUSTOMER_DETAIL_DATA = function(req, res, next) {
    // isLogin();
    res.render('./customer/customerDetail', { title: '订单详情'});
};