/**
 * Created by Arley on 2017/8/6.
 */

var express = require('express');
var router = require('./../../routes/index');
var common = require('./../common');
var request = require('request');
var COMMONUTIL = require('./../../util/commonUtil');  // 主加密方法类文件


// 客户-主导航跳转
exports.VIEW_CUSTOMER_SYSTEM = function(req, res, next) {
    // TODO 增加根据权限跳转
    res.redirect('/customer/loan/system');
};
// 客户-贷款管理跳转
exports.VIEW_CUSTOMER_LOAN_SYSTEM = function(req, res, next) {
    res.redirect('/customer/loan/pendingAllot');
};
// 客户-待分配跳转
exports.VIEW_CUSTOMER_LOAN_PENDINGALLOT = function(req, res, next) {
    var body = req.body;
    common.httpRequest({
        url : contextPath + '/api/finance/getAllotList',
        formData : body
    }, function (result) {
        var data = result;
        if (data.error_code === 0) {
            data.title = '待分配';
            data.originUrl = '/customer/loan/pendingAllot';
            res.render('./customer/customerList', data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);

    //res.render('./customer/customerDetail', { title: '订单详情'});
};


// 客户-详情页跳转
exports.VIEW_CUSTOMER_DETAIL_DATA = function(req, res, next) {


    //res.render('./customer/customerDetail', { title: '订单详情'});
};