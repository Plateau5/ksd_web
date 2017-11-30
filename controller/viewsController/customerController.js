/**
 * Created by Arley on 2017/8/6.
 */

// var express = require('express');
// var router = require('./../../routes/index');
var fs = require('fs');
var path=require("path");
var common = require('./../common');
var qs = require('querystring');
var urlParse = require('url');

// var request = require('request');
// var COMMONUTIL = require('./../../util/commonUtil');  // 主加密方法类文件

// 下载资料-api 1038
exports.API_FILES_DOWNLOAD = function(req, res, next) {
    var url = '/finance/file/download';
    var filePath = path.join(__dirname, './');
    console.log(filePath);
    fs.readFile(filePath + "http://loan-file.oss-cn-beijing.aliyuncs.com/16780053671507799212784952491020.jpg", function(err, data){
        res.set({
            'Content-Type': 'application/octet-stream',  //告诉浏览器这是一个二进制文件
            'Content-Disposition': 'attachment; filename=upload.png'  //告诉浏览器这是一个附件要下载是png图片
        });
        res.end(data);
    });
    /*var body = req.body;
    try {
        common.httpRequest({
            url : contextPath + '/finance/file/download',
            formData : body
        }, function (result) {
            var data = result;
            res.end(data);
        }, req, res, next);
    } catch (err) {
        /!*logger.error(err);*!/
        console.log(err);
        res.statusCode = 500;
        return res.json({success: false, message: '服务器异常'});
    }*/
};


// 客户-主导航跳转
exports.VIEW_CUSTOMER_SYSTEM = function(req, res, next) {
    if (common.checkPrivilege(1016, req)) {
        res.redirect('/customer/loan/system');
    } else if (common.checkPrivilege(1260, req)) {
        res.redirect('/customer/compact/system');
    } else if (common.checkPrivilege(1225, req)) {
        res.redirect('/customer/requestpayout/system');
    } else if (common.checkPrivilege(1226, req)) {
        res.redirect('/customer/approval/system');
    } else if (common.checkPrivilege(1227, req)) {
        res.redirect('/customer/financial/system');
    } else if (common.checkPrivilege(1228, req)) {
        res.redirect('/customer/pigeonhole/system');
    } else if (common.checkPrivilege(1330, req)) {
        res.redirect('/customer/otherfund/system');
    }
};


// 客户-贷款管理跳转
exports.VIEW_CUSTOMER_LOAN_SYSTEM = function(req, res, next) {
    if (common.checkPrivilege(1017, req)) {
        res.redirect('/customer/loan/pendingAllot');
    } else if (common.checkPrivilege(1018, req)) {
        res.redirect('/customer/loan/alreadyAllot');
    } else if (common.checkPrivilege(1019, req)) {
        res.redirect('/customer/loan/entered');
    } else if (common.checkPrivilege(1020, req)) {
        res.redirect('/customer/loan/passed');
    } else if (common.checkPrivilege(1021, req)) {
        res.redirect('/customer/loan/unpass');
    }
};
// 客户-待分配跳转
// 客户管理-通知审核结果-页面 1236
exports.VIEW_CUSTOMER_HISTORY = function(req, res, next) {
    common.getPageData({
        url : '/api/finance/customer',
        title : '客户-历史记录',
        page : './customer/customerHis'
    }, req, res, next);
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
// 客户管理-订单分配页面跳转 1022
exports.VIEW_CUSTOMER_LOAN_ALLOT = function(req, res, next) {
    common.getPageData({
        url : '/api/finance/toAllot',
        title : '客户-订单分配',
        page : './customer/allotEmp'
    }, req, res, next);
};
// 客户管理-订单分配-api 1031
exports.API_CUSTOMER_LOAN_ALLOT = function(req, res, next) {
    common.publicForApi('/api/finance/allot', req, res, next);
};
// 客户管理-开始录入-api 1161
exports.API_CUSTOMER_LOAN_STARTAPPLYLOAN = function(req, res, next) {
    common.publicForApi('/api/finance/startApplyloan', req, res, next)
};
// 客户管理-资料不合格页面跳转 1037
exports.VIEW_CUSTOMER_LOAN_UNQUALIFIED = function(req, res, next) {
    common.getPageData({
        url : '/api/finance/picture/reason',
        title : '客户-发送不合格通知',
        page : './customer/imgUnpass'
    }, req, res, next);
};
// 客户管理-获取问题分类下的问题列表-api
exports.API_CUSTOMER_GETQUESTIONS = function(req, res, next) {
    common.publicForApi('/api/getQuestionByClassifyId', req, res, next);
};
// 客户管理-资料不合格-api
exports.API_CUSTOMER_LOAN_UNQUALIFIED = function(req, res, next) {
    common.publicForApi('/api/finance/disqualification', req, res, next);
};
// 客户管理-确认申请按钮-api 1032
exports.API_CUSTOMER_LOAN_CONFIRMAPPLYLOAN = function(req, res, next) {
    common.publicForApi('/api/finance/applyloan', req, res, next);
};
// 客户管理-通知审核结果-页面 1236
exports.VIEW_CUSTOMER_LOAN_NOTIFYRESULT = function(req, res, next) {
    common.getPageData({
        url : '/api/finance/toResult',
        title : '客户-通知审核结果',
        page : './customer/result'
    }, req, res, next);
};
// 客户管理-通知审核结果-审核不通过-页面 1034
/*exports.API_CUSTOMER_LOAN_AUDITUNPASS = function(req, res, next) {
    // common.publicForApi('/api/finance/unpass', req, res, next);
    var body = req.body;
    try {
        this.httpRequest({
            url : contextPath + '/api/finance/unpass',
            formData : body
        }, function (result) {
            var data = result;
            res.send(data);
        }, req, res, next);
    } catch (err) {
        /!*logger.error(err);*!/
        console.log(err);
        res.statusCode = 400;
        return res.json({success: false, message: '服务器异常'});
    }
};*/



// 客户-合同管理-跳转
exports.VIEW_CUSTOMER_COMPACT_SYSTEM = function(req, res, next) {
    if (common.checkPrivilege(1261, req)) {
        res.redirect('/customer/compact/pendingPass');
    } else if (common.checkPrivilege(1262, req)) {
        res.redirect('/customer/compact/pass');
    } else if (common.checkPrivilege(1263, req)) {
        res.redirect('/customer/compact/unpass');
    }
};
// 客户-合同管理-待出合同
exports.VIEW_CUSTOMER_COMPACT_PENDINGPASS = function(req, res, next) {
    var url = '/api/compact/pendingPass/list';
    common.getCustomerList(url, '待出合同', req, res, next);
};

// 客户-合同管理-同意页面 1264
exports.VIEW_CUSTOMER_COMPACT_AGREE = function(req, res, next) {
    common.getPageData({
        url : '/api/tocompact/agree',
        title : '合同管理-同意',
        page : './compact/agree'
    }, req, res, next);
};
// 客户-合同管理-不同意页面 1265
exports.VIEW_CUSTOMER_COMPACT_DISAGREE = function(req, res, next) {
    common.getPageData({
        url : '/api/tocompact/disagree',
        title : '合同管理-不同意',
        page : './compact/disagree'
    }, req, res, next);
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
    if (common.checkPrivilege(1202, req)) {
        res.redirect('/customer/requestpayout/pendingDispose');
    } else if (common.checkPrivilege(1203, req)) {
        res.redirect('/customer/requestpayout/pendingPass');
    } else if (common.checkPrivilege(1110, req)) {
        res.redirect('/customer/requestpayout/pendingAudit');
    } else if (common.checkPrivilege(1204, req)) {
        res.redirect('/customer/requestpayout/pass');
    } else if (common.checkPrivilege(1205, req)) {
        res.redirect('/customer/requestpayout/unpass');
    }
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
// 客户-请款管理-待请款-确认提交页面 1220
exports.VIEW_CUSTOMER_RESQUESTPAYOUT_AFFIRMSUBMIT = function(req, res, next) {
    common.getPageData({
        url : '/api/requestPayout/affirm/tosubmit',
        title : '请款管理-确认提交',
        page : './requestpayout/submit'
    }, req, res, next);
};
// 客户-请款管理-待请款-不同意页面 1116
exports.VIEW_CUSTOMER_RESQUESTPAYOUT_DISAGREE = function(req, res, next) {
    var searchParam = urlParse.parse(req.url).query;    // 获取查询参数
    common.getPageData({
        url : '/api/requestPayout/toDisagree?' + searchParam,
        title : '请款管理-不同意',
        page : './requestpayout/disagree'
    }, req, res, next);
};
// 客户-请款管理-待审核-同意页面 1115
exports.VIEW_CUSTOMER_RESQUESTPAYOUT_AGREE = function(req, res, next) {
    common.getPageData({
        url : '/api/requestPayout/toAgree',
        title : '请款管理-同意',
        page : './requestpayout/agree'
    }, req, res, next);
};
// 客户-请款管理-待审核-转交他人页面 1184
exports.VIEW_CUSTOMER_RESQUESTPAYOUT_TRANSFER = function(req, res, next) {
    common.getPageData({
        url : '/api/requestPayout/transfer',
        title : '请款管理-转交他人',
        page : './requestpayout/transfer'
    }, req, res, next);
};



// 客户-审批管理-跳转
exports.VIEW_CUSTOMER_APPROVAL_SYSTEM = function(req, res, next) {
    if (common.checkPrivilege(1162, req)) {
        res.redirect('/customer/approval/pendingAudit');
    } else if (common.checkPrivilege(1206, req)) {
        res.redirect('/customer/approval/pass');
    } else if (common.checkPrivilege(1207, req)) {
        res.redirect('/customer/approval/unpass');
    } else if (common.checkPrivilege(1164, req)) {
        res.redirect('/customer/approval/return');
    }
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
// 客户-审批管理-待审核-同意页面 1168
exports.VIEW_CUSTOMER_APPROVAL_AGREE = function(req, res, next) {
    common.getPageData({
        url : '/api/operation/toAgree',
        title : '审批管理-同意',
        page : './approval/agree'
    }, req, res, next);
};
// 客户-审批管理-待审核-不同意页面 1168
exports.VIEW_CUSTOMER_APPROVAL_DISAGREE = function(req, res, next) {
    common.getPageData({
        url : '/api/operation/toDisagree',
        title : '审批管理-同意',
        page : './approval/disagree'
    }, req, res, next);
};
// 客户-审批管理-待审核-不同意页面 1185
exports.VIEW_CUSTOMER_APPROVAL_TRANSFER = function(req, res, next) {
    common.getPageData({
        url : '/api/operation/transfer',
        title : '审批管理-同意',
        page : './approval/transfer'
    }, req, res, next);
};








// 客户-款项管理-跳转
exports.VIEW_CUSTOMER_FINANCIAL_SYSTEM = function(req, res, next) {
    if (common.checkPrivilege(1208, req)) {
        res.redirect('/customer/financial/pendingReturn');
    } else if (common.checkPrivilege(1170, req)) {
        res.redirect('/customer/financial/pendingAudit');
    } else if (common.checkPrivilege(1209, req)) {
        res.redirect('/customer/financial/pass');
    } else if (common.checkPrivilege(1210, req)) {
        res.redirect('/customer/financial/unpass');
    } else if (common.checkPrivilege(1172, req)) {
        res.redirect('/customer/financial/return');
    }
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
    if (common.checkPrivilege(1177, req)) {
        res.redirect('/customer/pigeonhole/pending');
    } else if (common.checkPrivilege(1178, req)) {
        res.redirect('/customer/pigeonhole/archived');
    }
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
    if (common.checkPrivilege(1331, req)) {
        res.redirect('/customer/otherfund/pendingAudit');
    } else if (common.checkPrivilege(1332, req)) {
        res.redirect('/customer/otherfund/pass');
    } else if (common.checkPrivilege(1333, req)) {
        res.redirect('/customer/otherfund/unpass');
    }
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



// 客户管理-详情页-贷款管理
exports.VIEW_CUSTOMER_LOAN_DETAIL = function(req, res, next) {
    var url = '/api/finance/getFile';
    common.getCustomerDetail(url, req, res, next);
};
// 客户管理-详情页-合同管理
exports.VIEW_CUSTOMER_COMPACT_DETAIL = function(req, res, next) {
    var url = '/api/compact/getFile';
    common.getCustomerDetail(url, req, res, next);
};
// 客户管理-详情页-请款管理
exports.VIEW_CUSTOMER_REQUESTPAYOUT_DETAIL = function(req, res, next) {
    var url = '/api/requestPayout/getFile';
    common.getCustomerDetail(url, req, res, next);
};
// 客户管理-详情页-审批管理
exports.VIEW_CUSTOMER_APPROVAL_DETAIL = function(req, res, next) {
    var url = '/api/operation/getFile';
    common.getCustomerDetail(url, req, res, next);
};
// 客户管理-详情页-款项管理
exports.VIEW_CUSTOMER_FINANCIAL_DETAIL = function(req, res, next) {
    var url = '/api/financial/getFile';
    common.getCustomerDetail(url, req, res, next);
};
// 客户管理-详情页-归档管理
exports.VIEW_CUSTOMER_PIGEONHOLE_DETAIL = function(req, res, next) {
    var url = '/api/pigeonhole/getFile';
    common.getCustomerDetail(url, req, res, next);
};
// 客户管理-详情页-其他管理
exports.VIEW_CUSTOMER_OTHERFUND_DETAIL = function(req, res, next) {
    var url = '/api/otherfund/getFile';
    common.getCustomerDetail(url, req, res, next);
};
































