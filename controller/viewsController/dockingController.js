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
            formatCarInfoAmount(data);
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
            data.renterInfo = JSON.parse(data.renterInfo);
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
        }
    }, req, res, next);
};


/**
 * 文件信息部分数据格式化
 * @author Arley Joe 2018-1-4 14:39:06
 * @param d {Object} : 源数据
 * @return {Array}  ：返回值
 */
var organizeData = function (d) {
    var dataFiles = [];
    var materialSeries = [];
    for (var i = 0, len = d.length; i < len; i++) {
        var o = {};
        if (d[i].material_type) {
            if (materialSeries.indexOf(d[i].material_type) === -1) {
                materialSeries.push(d[i].material_type);
                o.type = d[i].material_type;
                if (d[i].material_name) {
                    o.name = d[i].material_name;
                }
                o.children = [];
                if (d[i].require === '1') {
                    o.children.unshift(d[i]);
                } else {
                    o.children.push(d[i]);
                }
                dataFiles[d[i].material_type] = o;
            } else {
                if (d[i].require === '1') {
                    dataFiles[d[i].material_type].children.unshift(d[i]);
                } else {
                    dataFiles[d[i].material_type].children.push(d[i]);
                }
                // dataFiles[d[i].material_type].children.push(d[i]);
            }
        }
    }
    return dataFiles;
};


/**
 * 格式化金额数据
 * @author Arley Joe 2018-1-9 14:47:47
 * @param d
 */
function formatCarInfoAmount (d) {
    (!d.buyTax && d.buyTax != 0) && (d.buyTax = 0);     // 购置税
    (!d.pawnValue && d.pawnValue != 0) && (d.pawnValue = 0);    // 车辆实际价格
    (!d.otherFee && d.otherFee != 0) && (d.otherFee = 0);       // 其他费用
    (!d.assure && d.assure != 0) && (d.assure = 0);     // 保险
    (!d.firstPayScale && d.firstPayScale != 0) && (d.firstPayScale = '20%');    // 首付比例
    (!d.cautionMoney && d.cautionMoney != 0) && (d.cautionMoney = 0);       // 保证金
    (!d.serviceCharge && d.serviceCharge != 0) && (d.serviceCharge = 0);        // 服务费
    (!d.attachFinance && d.attachFinance != 0) && (d.attachFinance = 0);        // 附加融资额
}













