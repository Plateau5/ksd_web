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
    var financeId = req.body.finance_id;
    var queryType = req.body.query_type;
    var url = req.body.url;
    common.getPageData({
        url : '/api/docking/table',
        title : '客户-录入资料',
        page : './customer/dockingPAHome',
        callback : function (data) {
            data.finance_id = financeId;
            data.query_type = queryType;
            data.url = url;
            /*data.carInfo = 1;
            data.renterInfo = 1;
            data.sponsorInfo = 1;
            data.fileInfo = 1;
            data.creditInfo = 1;*/
        }
    }, req, res, next);
};
// 平安对接-车辆信息页
exports.VIEW_DOCKING_PINGAN_CAR = function(req, res, next) {
    common.getPageData({
        url : '/api/pingan/carInfo/detail',
        title : '客户-车辆信息',
        page : './customer/dockingPACarInfo',
        callback : function (data) {
            var queryType = req.body.query_type;
            var finance_id = req.body.finance_id;
            data.query_type = queryType;
            var url = req.body.url;
            data.finance_id = finance_id;
            data.url = url;
        }
    }, req, res, next);
};
// 平安对接-承租人信息页
exports.VIEW_DOCKING_PINGAN_LENDER = function(req, res, next) {
    common.getPageData({
        url : '/api/pingan/renterInfo/detail',
        title : '客户-承租人信息',
        page : './customer/dockingPALenderInfo',
        callback : function (data) {
            var finance_id = req.body.finance_id;
            var url = req.body.url;
            var queryType = req.body.query_type;
            data.query_type = queryType;
            data.finance_id = finance_id;
            data.url = url;
        }
    }, req, res, next);
};
// 平安对接-担保人信息页
exports.VIEW_DOCKING_PINGAN_GUARGANTOR = function(req, res, next) {
    common.getPageData({
        url : '/api/pingan/sponsorInfos/detail',
        title : '客户-担保人信息',
        page : './customer/dockingPAGuarantorInfo',
        callback : function (data) {
            var finance_id = req.body.finance_id;
            var url = req.body.url;
            var queryType = req.body.query_type;
            data.query_type = queryType;
            data.finance_id = finance_id;
            data.url = url;
        }
    }, req, res, next);
};
// 平安对接-文件信息页
exports.VIEW_DOCKING_PINGAN_FILES = function(req, res, next) {
    common.getPageData({
        url : '/api/docking/document/list',
        title : '客户-文件信息',
        page : './customer/dockingPALenderFilesInfo',
        callback : function (data) {
            var finance_id = req.body.finance_id;
            var url = req.body.url;
            var queryType = req.body.query_type;
            data.query_type = queryType;
            data.finance_id = finance_id;
            data.url = url;
            var dataFiles = organizeData(data.data_material);
            data.dataFiles = dataFiles;
        }
    }, req, res, next);
};
// 平安对接-征信查询信息页
exports.VIEW_DOCKING_PINGAN_CREDIT = function(req, res, next) {
    common.getPageData({
        url : '/api/docking/credit/list',
        title : '客户-征信查询信息',
        page : './customer/dockingPACreditInfo',
        callback : function (data) {
            var finance_id = req.body.finance_id;
            var url = req.body.url;
            var queryType = req.body.query_type;
            data.query_type = queryType;
            data.finance_id = finance_id;
            data.url = url;
            /*var dataFiles = organizeData(data.data_material);
            data.dataFiles = dataFiles;*/
        }
    }, req, res, next);
};


var organizeData = function (d) {
    var dataFiles = [];
    var materialSeries = [];
    for (var i = 0, len = d.length; i < len; i++) {
        var o = {};
        if (d[i].material_type) {
            if (materialSeries.indexOf(d[i].material_type) === -1) {
                materialSeries.push(d[i].material_type);
                o.type = d[i].material_type;
                o.name = d[i].material_name;
                o.children = [];
                dataFiles[d[i].material_type] = o;
            } else {
                dataFiles[d[i].material_type].children.push(d[i]);
            }
        }
    }
    return dataFiles;
};














