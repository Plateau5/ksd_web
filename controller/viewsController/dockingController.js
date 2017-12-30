/**
 * Created by Arley on 2017/12/28
 */

// var express = require('express');
// var router = require('./../../routes/index');
var fs = require('fs');
var path=require("path");
var common = require('./../common');
var qs = require('querystring');
var urlParse = require('url');
var LOGERROR = require('./../../util/logger').logError;   // 错误日志打印
var ERRORTYPES = require('./../../util/ErrorTypesConf'); // 自定义错误类型配置

// 平安对接-跳转录入首页 1429
exports.VIEW_DOCKING_PINGAN_HOME = function(req, res, next) {
    /*common.getPageData({
        url : '/api/docking/table',
        title : '待录入',
        page : './customer/dockingPAHome'
    }, req, res, next);*/
    var data = {};
    data.title = '客户-录入资料';
    data.originUrl = req.originalUrl;
    data.markUri = markUri;
    data.apiServerPath = apiServerPath;
    data.domain = domain;
    res.render('./customer/dockingPAHome', data);
};
// 平安对接-车辆信息页
exports.VIEW_DOCKING_PINGAN_CAR = function(req, res, next) {
    var data = {};
    data.title = '客户-车辆信息';
    data.originUrl = req.originalUrl;
    data.markUri = markUri;
    data.apiServerPath = apiServerPath;
    data.domain = domain;
    res.render('./customer/dockingPACarInfo', data);

    /*function calcRepaymentPlanTable () {
        var repaymentPlan = {
            monthlyPayment : [],    // 月供金额
            principal : [],     // 本金金额
            interest : [],      // 利息
        };
        for (var i = 0; i < 12; i ++) {
            Math.pow(x, y);
        }
    }*/
};
// 平安对接-承租人信息页
exports.VIEW_DOCKING_PINGAN_LENDER = function(req, res, next) {
    var data = {};
    data.title = '客户-承租人信息';
    data.originUrl = req.originalUrl;
    data.markUri = markUri;
    data.apiServerPath = apiServerPath;
    data.domain = domain;
    res.render('./customer/dockingPALenderInfo', data);
};
// 平安对接-担保人信息页
exports.VIEW_DOCKING_PINGAN_GUARGANTOR = function(req, res, next) {
    var data = {};
    data.title = '客户-担保人信息';
    data.originUrl = req.originalUrl;
    data.markUri = markUri;
    data.apiServerPath = apiServerPath;
    data.domain = domain;
    res.render('./customer/dockingPAGuarantorInfo', data);
};
// 平安对接-文件信息页
exports.VIEW_DOCKING_PINGAN_FILES = function(req, res, next) {
    var data = {};
    data.title = '客户-文件信息';
    data.originUrl = req.originalUrl;
    data.markUri = markUri;
    data.apiServerPath = apiServerPath;
    data.domain = domain;
    res.render('./customer/dockingPALenderFilesInfo', data);
};
// 平安对接-征信查询信息页
exports.VIEW_DOCKING_PINGAN_CREDIT = function(req, res, next) {
    var data = {};
    data.title = '客户-征信查询信息';
    data.originUrl = req.originalUrl;
    data.markUri = markUri;
    data.apiServerPath = apiServerPath;
    data.domain = domain;
    res.render('./customer/dockingPACreditInfo', data);
};

















