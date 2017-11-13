/**
 * Created by Arley on 2017/8/16.
 */
// 加载必须文件
var express = require('express');
var router = require('./../../routes/index');
var common = require('./../common');
var request = require('request');
var COMMONUTIL = require('./../../util/commonUtil');  // 主加密方法类文件


// 数据统计主导航跳转
exports.VIEW_STATISTICS_SYSTEM = function(req, res, next) {
    // TODO 写权限跳转循环
    res.redirect('/statistics/business/list');
};

// 数据统计-业务统计跳转
exports.VIEW_STATISTICS_BUSINESS_LIST = function(req, res, next) {
    res.render('./dataStatistics/businessList', { title : '数据统计-业务量统计'});
};

// 数据统计-业务量统计-业务量统计视图数据获取
exports.API_STATISTICS_BUSINESS_DATA = function(req, res, next) {
    var body = req.body;
    common.httpRequest({
        url : contextPath + '/statistics/business',
        formData : body
    }, function (result) {
        var data = result;
        if (data.error_code === 0) {
            res.send(data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
};

// 数据统计-业务量统计-城市统计视图数据获取
exports.API_STATISTICS_CITY_DATA = function(req, res, next) {
    var body = req.body;
    common.httpRequest({
        url : contextPath + '/statistics/city',
        formData : body
    }, function (result) {
        var data = result;
        if (data.error_code === 0) {
            res.send(data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
};

// 数据统计-业务量统计-产品统计视图数据获取
exports.API_STATISTICS_PRODUCT_DATA = function(req, res, next) {
    var body = req.body;
    common.httpRequest({
        url : contextPath + '/statistics/product',
        formData : body
    }, function (result) {
        var data = result;
        if (data.error_code === 0) {
            res.send(data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
};


// 数据统计-人效统计首页跳转
exports.VIEW_STATISTICS_PERSON_SYSTEM = function(req, res, next) {
    // TODO 写权限跳转循环
    res.redirect('/statistics/person/order');
};
// 数据统计-人效统计-进件跳转
exports.VIEW_STATISTICS_PERSON_ORDER = function(req, res, next) {
    var body = req.body;
    common.httpRequest({
        url : contextPath + '/statistics/person/order',
        formData : body
    }, function (result) {
        var data = result;
        data.uri = '/statistics/person/order';
        data.title = '数据统计-人效统计';
        if (data.error_code === 0) {
            res.render('./dataStatistics/personList', data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
    //res.render('./dataStatistics/personList', { title : '数据统计-进件统计'});
};
// 数据统计-人效统计-请款跳转
exports.VIEW_STATISTICS_PERSON_REQUEST = function(req, res, next) {
    var body = req.body;
    common.httpRequest({
        url : contextPath + '/statistics/person/request',
        formData : body
    }, function (result) {
        var data = result;
        data.uri = '/statistics/person/request';
        data.title = '数据统计-人效统计';
        if (data.error_code === 0) {
            res.render('./dataStatistics/personList', data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
    //res.render('./dataStatistics/personList', { title : '数据统计-请款统计'});
};
// 数据统计-人效统计-归档跳转
exports.VIEW_STATISTICS_PERSON_PIGEONHOLE = function(req, res, next) {
    var body = req.body;
    common.httpRequest({
        url : contextPath + '/statistics/person/pigeonhole',
        formData : body
    }, function (result) {
        var data = result;
        data.uri = '/statistics/person/pigeonhole';
        data.title = '数据统计-人效统计';
        if (data.error_code === 0) {
            res.render('./dataStatistics/personList', data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
    // res.render('./dataStatistics/personList', { title : '数据统计-归档统计'});
};
// 数据统计-人效统计-个人业务量跳转
exports.VIEW_STATISTICS_PERSONAL = function(req, res, next) {
    var body = req.body;
    common.httpRequest({
        url : contextPath + '/statistics/personal',
        formData : body
    }, function (result) {
        var data = result;
        data.title = '人效统计-个人业务量';
        if (data.error_code === 0) {
            // res.send(data);
            res.render('./dataStatistics/personDetail', data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
};

// 数据统计-人效统计-个人进件统计视图数据获取
exports.API_STATISTICS_PERSONAL_ORDER_DATA = function(req, res, next) {
    var body = req.body;
    common.httpRequest({
        url : contextPath + '/statistics/personal/order',
        formData : body
    }, function (result) {
        var data = result;
        if (data.error_code === 0) {
            res.send(data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
};

// 数据统计-人效统计-个人请款统计视图数据获取
exports.API_STATISTICS_PERSONAL_REQUEST_DATA = function(req, res, next) {
    var body = req.body;
    common.httpRequest({
        url : contextPath + '/statistics/personal/request',
        formData : body
    }, function (result) {
        var data = result;
        if (data.error_code === 0) {
            res.send(data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
};

// 数据统计-人效统计-个人请款统计视图数据获取
exports.API_STATISTICS_PERSONAL_PIGEONHOLE_DATA = function(req, res, next) {
    var body = req.body;
    common.httpRequest({
        url : contextPath + '/statistics/personal/pigeonhole',
        formData : body
    }, function (result) {
        var data = result;
        if (data.error_code === 0) {
            res.send(data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
};

// 数据统计-人效统计-个人业务详情跳转
exports.VIEW_STATISTICS_PERSONAL_BUSINESS = function(req, res, next) {
    var body = req.body;
    common.httpRequest({
        url : contextPath + '/statistics/personal/business',
        formData : body
    }, function (result) {
        var data = result;
        data.title = '人效统计-个人业务详情';
        data.organizationId = data.organization_id;
        if (data.error_code === 0) {
            // res.send(data);
            res.render('./dataStatistics/personBusiness', data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
};