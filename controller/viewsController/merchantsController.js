/**
 * Created by Arley on 2017/12/01
 */

// var express = require('express');
// var router = require('./../../routes/index');
var fs = require('fs');
var path=require("path");
var common = require('./../common');
var qs = require('querystring');
var urlParse = require('url');

// 商户-商户管理-主导航跳转 1366
exports.VIEW_MERCHANTS_SYSTEM = function(req, res, next) {
    if (common.checkPrivilege(1367, req)) {
        res.redirect(markUri + '/merchants/manage/system');
    } else if (common.checkPrivilege(1368, req)) {
        res.redirect(markUri + '/records/manage');
    }
};
// 商户-商户管理-侧导航跳转 1367
exports.VIEW_MERCHANTS_MANAGE_SYSTEM = function(req, res, next) {
    if (common.checkPrivilege(1370, req)) {
        res.redirect(markUri + '/merchants/pendingAudit');
    } else if (common.checkPrivilege(1371, req)) {
        res.redirect(markUri + '/merchants/pass');
    } else if (common.checkPrivilege(1372, req)) {
        res.redirect(markUri + '/merchants/unpass');
    } else if (common.checkPrivilege(1369, req)) {
        res.redirect(markUri + '/merchants/norecords');
    }
};
// 商户-商户管理-待审核 1370
exports.VIEW_MERCHANTS_PENDINGAUDIT = function(req, res, next) {
    common.getPageData({
        url : '/api/supplier/audit/list',
        title : '商户管理-待审核',
        page : './merchants/merchantsList'
    }, req, res, next);
};
// 商户-商户管理-已通过 1371
exports.VIEW_MERCHANTS_PASS = function(req, res, next) {
    common.getPageData({
        url : '/api/supplier/pass/list',
        title : '商户管理-已通过',
        page : './merchants/merchantsList'
    }, req, res, next);
};
// 商户-商户管理-未通过 1372
exports.VIEW_MERCHANTS_UNPASS = function(req, res, next) {
    common.getPageData({
        url : '/api/supplier/unpass/list',
        title : '商户管理-未通过',
        page : './merchants/merchantsList'
    }, req, res, next);
};
// 商户-商户管理-未备案 1369
exports.VIEW_MERCHANTS_NORECORDS = function(req, res, next) {
    common.getPageData({
        url : '/api/supplier/unrecords/list',
        title : '商户管理-未备案',
        page : './merchants/merchantsList'
    }, req, res, next);
};
// 商户-商户管理-备案管理 1368
exports.VIEW_RECORDS_MANAGE = function(req, res, next) {
    common.getPageData({
        url : '/api/records/manager',
        title : '商户管理-备案管理',
        page : './merchants/merchantsList'
    }, req, res, next);
};
// 商户-商户管理-详情页 1373
exports.VIEW_MERCHANTS_DETAIL = function(req, res, next) {
    common.getPageData({
        url : '/api/supplier/detail',
        title : '商户管理-详情页',
        page : './merchants/detail'
    }, req, res, next);
};
// 商户-商户管理-待审核-同意页面跳转 1395
exports.VIEW_MERCHANTS_AUDIT_AGREE = function(req, res, next) {
    common.getPageData({
        url : '/api/supplier/tocheck/agree',
        title : '商户管理-审核通过',
        page : './merchants/agree'
    }, req, res, next);
};
// 商户-商户管理-待审核-不同意页面跳转 1396
exports.VIEW_MERCHANTS_AUDIT_DISAGREE = function(req, res, next) {
    common.getPageData({
        url : '/api/supplier/tocheck/disagree',
        title : '商户管理-审核不通过',
        page : './merchants/disagree'
    }, req, res, next);
};
// 商户-商户管理-待审核-不同意页面跳转 1385
exports.VIEW_MERCHANTS_EDIT = function(req, res, next) {
    common.getPageData({
        url : '/api/supplier/toedit',
        title : '商户管理-编辑商户',
        page : './merchants/edit'
    }, req, res, next);
};









