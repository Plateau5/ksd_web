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
    var url = '/api/finance/getAllotList';
    common.getCustomerList(url, '待分配', req, res, next);
};
// 客户-已分配跳转
exports.VIEW_CUSTOMER_LOAN_ALREADYALLOT = function(req, res, next) {
    var url = '/api/finance/getCheckInList';
    common.getCustomerList(url, '已分配', req, res, next);
};
// 客户-已录入跳转
exports.VIEW_CUSTOMER_LOAN_ENTERED = function(req, res, next) {
    var url = '/api/finance/getReviewList';
    common.getCustomerList(url, '已录入', req, res, next);
};
// 客户-已通过跳转
exports.VIEW_CUSTOMER_LOAN_PASSED = function(req, res, next) {
    var url = '/api/finance/getPassList';
    common.getCustomerList(url, '已通过', req, res, next);
};
// 客户-未通过跳转
exports.VIEW_CUSTOMER_LOAN_UNPASS = function(req, res, next) {
    var url = '/api/finance/getUnPassList';
    common.getCustomerList(url, '未通过', req, res, next);
};
// 客户-合同管理-跳转
exports.VIEW_CUSTOMER_COMPACT_SYSTEM = function(req, res, next) {
    res.redirect('/customer/compact/pendingPass');
};
// 客户-合同管理-待出合同
exports.VIEW_CUSTOMER_COMPACT_PENDINGPASS = function(req, res, next) {
    var url = '/api/compact/pendingPass/list';
    common.getCustomerList(url, '待出合同', req, res, next);
};
// 客户-合同管理-已通过
exports.VIEW_CUSTOMER_COMPACT_PASS = function(req, res, next) {
    var url = '/api/compact/pass/list';
    common.getCustomerList(url, '已通过', req, res, next);
};
// 客户-合同管理-未通过
exports.VIEW_CUSTOMER_COMPACT_UNPASS = function(req, res, next) {
    var url = '/api/compact/unpass/list';
    common.getCustomerList(url, '未通过', req, res, next);
};

// 客户-请款管理-跳转
exports.VIEW_CUSTOMER_RESQUESTPAYOUT_SYSTEM = function(req, res, next) {
    res.redirect('/customer/requestpayout/pendingDispose');
};
// 客户-请款管理-待请款
exports.VIEW_CUSTOMER_RESQUESTPAYOUT_PENDINGDISPOSE = function(req, res, next) {
    var url = '/api/requestPayout/pendingDispose/list';
    common.getCustomerList(url, '待请款', req, res, next);
};
// 客户-请款管理-待通过
exports.VIEW_CUSTOMER_RESQUESTPAYOUT_PENDINGPASS = function(req, res, next) {
    var url = '/api/requestPayout/pendingPass/list';
    common.getCustomerList(url, '待通过', req, res, next);
};
// 客户-请款管理-待审批
exports.VIEW_CUSTOMER_RESQUESTPAYOUT_PENDINGAUDIT = function(req, res, next) {
    var url = '/api/requestPayout/waitList';
    common.getCustomerList(url, '待审批', req, res, next);
};
// 客户-请款管理-已通过
exports.VIEW_CUSTOMER_RESQUESTPAYOUT_PASS = function(req, res, next) {
    var url = '/api/requestPayout/pass/list';
    common.getCustomerList(url, '已通过', req, res, next);
};
// 客户-请款管理-未通过
exports.VIEW_CUSTOMER_RESQUESTPAYOUT_UNPASS = function(req, res, next) {
    var url = '/api/requestPayout/unpass/list';
    common.getCustomerList(url, '未通过', req, res, next);
};

// 客户-审批管理-跳转
exports.VIEW_CUSTOMER_APPROVAL_SYSTEM = function(req, res, next) {
    res.redirect('/customer/approval/pendingAudit');
};
// 客户-审批管理-待审批
exports.VIEW_CUSTOMER_APPROVAL_PENDINGAUDIT = function(req, res, next) {
    var url = '/api/operation/waitList';
    common.getCustomerList(url, '待审批', req, res, next);
};
// 客户-审批管理-已通过
exports.VIEW_CUSTOMER_APPROVAL_PASS = function(req, res, next) {
    var url = '/api/operation/pass/list';
    common.getCustomerList(url, '已通过', req, res, next);
};
// 客户-审批管理-未通过
exports.VIEW_CUSTOMER_APPROVAL_UNPASS = function(req, res, next) {
    var url = '/api/operation/unpass/list';
    common.getCustomerList(url, '未通过', req, res, next);
};
// 客户-审批管理-已回款
exports.VIEW_CUSTOMER_APPROVAL_RETURN = function(req, res, next) {
    var url = '/api/operation/getReturnList';
    common.getCustomerList(url, '已回款', req, res, next);
};


// 客户-款项管理-跳转
exports.VIEW_CUSTOMER_FINANCIAL_SYSTEM = function(req, res, next) {
    res.redirect('/customer/financial/pendingReturn');
};
// 客户-款项管理-待回款
exports.VIEW_CUSTOMER_FINANCIAL_PENDINGRETURN = function(req, res, next) {
    var url = '/api/financial/pendingDispose/list';
    common.getCustomerList(url, '待回款', req, res, next);
};
// 客户-款项管理-待审批
exports.VIEW_CUSTOMER_FINANCIAL_PENDINGAUDIT = function(req, res, next) {
    var url = '/api/financial/getWaitList';
    common.getCustomerList(url, '待审批', req, res, next);
};
// 客户-款项管理-已通过
exports.VIEW_CUSTOMER_FINANCIAL_PASS = function(req, res, next) {
    var url = '/api/financial/pass/list';
    common.getCustomerList(url, '已通过', req, res, next);
};
// 客户-款项管理-未通过
exports.VIEW_CUSTOMER_FINANCIAL_UNPASS = function(req, res, next) {
    var url = '/api/financial/unpass/list';
    common.getCustomerList(url, '未通过', req, res, next);
};
// 客户-款项管理-已回款
exports.VIEW_CUSTOMER_FINANCIAL_RETURN = function(req, res, next) {
    var url = '/api/financial/getReturnList';
    common.getCustomerList(url, '已回款', req, res, next);
};

// 客户-归档管理-跳转
exports.VIEW_CUSTOMER_PIGEONHOLE_SYSTEM = function(req, res, next) {
    res.redirect('/customer/pigeonhole/pending');
};
// 客户-归档管理-待处理
exports.VIEW_CUSTOMER_PIGEONHOLE_PENDING = function(req, res, next) {
    var url = '/api/pigeonhole/getWaitList';
    common.getCustomerList(url, '待处理', req, res, next);
};
// 客户-归档管理-已归档
exports.VIEW_CUSTOMER_PIGEONHOLE_ARCHIVED = function(req, res, next) {
    var url = '/api/pigeonhole/getPigeonholeList';
    common.getCustomerList(url, '已归档', req, res, next);
};

// 客户-其他管理-跳转
exports.VIEW_CUSTOMER_OTHERFUND_SYSTEM = function(req, res, next) {
    res.redirect('/customer/otherfund/pendingAudit');
};
// 客户-其他管理-待审核
exports.VIEW_CUSTOMER_OTHERFUND_PENDINGAUDIT = function(req, res, next) {
    var url = '/api/otherfund/pending/list';
    common.getCustomerList(url, '待审核', req, res, next);
};
// 客户-其他管理-已通过
exports.VIEW_CUSTOMER_OTHERFUND_PASS = function(req, res, next) {
    var url = '/api/otherfund/pass/list';
    common.getCustomerList(url, '已通过', req, res, next);
};
// 客户-其他管理-未通过
exports.VIEW_CUSTOMER_OTHERFUND_UNPASS = function(req, res, next) {
    var url = '/api/otherfund/unpass/list';
    common.getCustomerList(url, '未通过', req, res, next);
};











// 客户-详情页跳转
exports.VIEW_CUSTOMER_DETAIL_DATA = function(req, res, next) {


    //res.render('./customer/customerDetail', { title: '订单详情'});
};