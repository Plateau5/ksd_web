/**
 * Created by Arley on 2017/8/6.
 */
var fs = require('fs');     // 文件流系统中间件
var path=require("path");   // 路径解析中间件
var common = require('./../common');    // 主控制器文件
var qs = require('querystring');    // 查询字符串解析中间件
var urlParse = require('url');  // url解析控制中间件
var LOGERROR = require('./../../util/logger').logError;   // 错误日志打印
var ERRORTYPES = require('./../../util/ErrorTypesConf'); // 自定义错误类型配置


// 业务管理-主导航节点跳转
exports.VIEW_BUSINESS_SYSTEM = function(req, res, next) {
    try {
        if (common.checkPrivilege(1130, req)) {
            res.redirect(markUri + '/workflow/list');
        } else {
            throw new Error(ERRORTYPES.CheckPrivilege + ': The code 1331 | 1332 | 1333 is not defined.');
        }
    } catch (e) {
        LOGERROR(e.stack);
        res.redirect('/404');
    }
};

// 流程管理-审批流列表页跳转 1130
exports.VIEW_WORKFLOW_LIST = function(req, res, next) {
    common.getPageData({
        url : '/api/workflow/getList',
        title : '流程管理-审批流列表',
        page : './workflow/list'
    }, req, res, next);
};

// 流程管理-创建审批流页跳转 1131
exports.VIEW_WORKFLOW_CREATE = function(req, res, next) {
    var searchParam = urlParse.parse(req.url).query;
    common.getPageData({
        url : '/api/workflow/toCreate?' + searchParam,
        title : '流程管理-新建建审批流',
        page : './workflow/create'
    }, req, res, next);
};
// 流程管理-查看审批流详情页跳转 1133
exports.VIEW_WORKFLOW_DETAIL = function(req, res, next) {
    common.getPageData({
        url : '/api/workflow/toDetail',
        title : '流程管理-查看详情',
        page : './workflow/detail'
    }, req, res, next);
};
// 流程管理-编辑审批流页跳转
exports.VIEW_WORKFLOW_EDIT = function(req, res, next) {
    common.getPageData({
        url : '/api/workflow/toEdit',
        title : '流程管理-编辑审批流',
        page : './workflow/edit'
    }, req, res, next);
};