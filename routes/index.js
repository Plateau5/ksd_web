var express = require('express');
var router = express.Router();
var request = require('request');
// Require the controllers.
var homeCtrl = require('../controller/viewsController/homeController');
var customerCtrl = require('../controller/viewsController/customerController');
var organizationCtrl = require('../controller/viewsController/organizationController');
var workflowCtrl = require('../controller/viewsController/workflowController');
var questionCtrl = require('../controller/viewsController/questionController');
var warehouseCtrl = require('../controller/viewsController/warehouseController');
var contactCtrl = require('../controller/viewsController/contactController');
var statisticsCtrl = require('../controller/viewsController/statisticsController');
var systemManagementCtrl = require('../controller/viewsController/systemManagementController');
var settingsCtrl = require('../controller/viewsController/settingsController');
var privilegeCtrl = require('../controller/viewsController/privilegeController');

/* GET login page. */
// 根路径
// router.get('/', homeCtrl.LOGIN_PAGE);res.cookie('username', 'koby', {maxAge: 900000 });
router.get('/', homeCtrl.LOGIN_PAGE);
// 登出路径
router.get('/logout', homeCtrl.LOGIN_PAGE);
// 登录页跳转
router.get('/login', homeCtrl.LOGIN_PAGE);
// 登录提交
router.post('/login', homeCtrl.LOGIN_CONTROL);


// 首页访问路由
router.get('/home', homeCtrl.VIEW_HOME_DATA);

router.post('/api/message/getNotice', homeCtrl.API_MESSAGE_GETNOTICE);


// 客户访问路径
router.all('/customer/system', customerCtrl.VIEW_CUSTOMER_SYSTEM);
// 客户-贷款管理-访问路径
router.all('/customer/loan/system', customerCtrl.VIEW_CUSTOMER_LOAN_SYSTEM);
// 客户-贷款管理-待分配
router.all('/customer/loan/pendingAllot', customerCtrl.VIEW_CUSTOMER_LOAN_PENDINGALLOT);
// 客户管理访问路径
router.all('/customer/detail', customerCtrl.VIEW_CUSTOMER_DETAIL_DATA);


// 机构管理访问路径
router.get('/organization', organizationCtrl.VIEW_ORGANIZATION_LIST);
// 机构管理首页访问路径
router.get('/organization/list', organizationCtrl.VIEW_ORGANIZATION_LIST);
// 机构管理-创建机构跳转
router.post('/organization/toAdd', organizationCtrl.VIEW_ORGANIZATION_TOADD);
// 机构管理-查看详情跳转
router.post('/organization/detail', organizationCtrl.VIEW_ORGANIZATION_DETAIL);
// 机构管理-查看详情跳转
router.post('/organization/toEdit', organizationCtrl.VIEW_ORGANIZATION_TOEDIT);
// 机构管理-已发布产品列表跳转
router.post('/organization/product/publishList', organizationCtrl.VIEW_ORGANIZATION_PRODUCT_PUBLISHLIST);
// 机构管理-产品新增跳转
router.post('/organization/product/toAdd', organizationCtrl.VIEW_ORGANIZATION_PRODUCT_TOADD);
// 机构管理-仓库中产品列表跳转
router.post('/organization/product/warehouseList', organizationCtrl.VIEW_ORGANIZATION_PRODUCT_WAREHOUSELIST);
// 机构管理-产品编辑页跳转
router.post('/organization/product/toEdit', organizationCtrl.VIEW_ORGANIZATION_PRODUCT_TOEDIT);
// 机构管理-查看产品详情页跳转
router.post('/organization/product/detail', organizationCtrl.VIEW_ORGANIZATION_PRODUCT_DETAIL);
// 机构管理-产品请款材料编辑跳转
router.post('/organization/product/material', organizationCtrl.VIEW_ORGANIZATION_PRODUCT_MATERIAL);
// TODO 增加操作按钮API接口路径。

// 流程管理-审批流列表页跳转
router.get('/workflow', workflowCtrl.VIEW_WORKFLOW_LIST);
// 流程管理-审批流列表页跳转
router.get('/workflow/list', workflowCtrl.VIEW_WORKFLOW_LIST);
// 流程管理-创建审批流页跳转
router.get('/workflow/toCreate', workflowCtrl.VIEW_WORKFLOW_CREATE);
// 流程管理-查看审批流详情页跳转
router.post('/workflow/toDetail', workflowCtrl.VIEW_WORKFLOW_DETAIL);
// 流程管理-编辑审批流页跳转
router.post('/workflow/toEdit', workflowCtrl.VIEW_WORKFLOW_EDIT);
// TODO 增加操作按钮API接口路径。

// 问题管理-问题列表
router.get('/question/list', questionCtrl.VIEW_QUESTION_LIST);
// 问题管理-问题历史记录
router.post('/question/historyRecord', questionCtrl.VIEW_QUESTION_HISRECORD);


// 仓库管理
router.get('/warehouse/system', warehouseCtrl.VIEW_WAREHOUSE_SYSTEM);
// GPS仓库列表页跳转
router.get('/gps/warehouse/list', warehouseCtrl.VIEW_GPS_LIST);
// GPS仓库-创建GPS仓库跳转
router.get('/gps/warehouse/create', warehouseCtrl.VIEW_GPS_CREATE);
// GPS仓库-GPS仓库详情页跳转
router.post('/gps/warehouse/detail', warehouseCtrl.VIEW_GPS_DETAIL);
// GPS仓库-编辑GPS仓库页跳转
router.post('/gps/warehouse/edit', warehouseCtrl.VIEW_GPS_EDIT);
// GPS仓库-GPS仓库-新增入库页跳转
router.post('/gps/warehouse/putin', warehouseCtrl.VIEW_GPS_PUTIN);
// GPS仓库-GPS仓库-申请单详情页页跳转 todo 修改下面页面接收方法为POST。
router.get('/gps/apply/detail', warehouseCtrl.VIEW_GPS_APPLY_DETAIL);
// GPS仓库-GPS仓库-申请单确认发送点击跳转
router.get('/gps/apply/confirmSend', warehouseCtrl.VIEW_GPS_APPLY_CONFIRM);
// GPS仓库-GPS仓库-申请单-当面交付页跳转
router.get('/gps/apply/toFace', warehouseCtrl.VIEW_GPS_APPLY_TOFACE);
// GPS仓库-GPS仓库-申请单-快递邮寄页跳转
router.post('/gps/apply/express', warehouseCtrl.VIEW_GPS_APPLY_EXPRESS);
// GPS仓库-GPS仓库-申请单-不同意页跳转
router.post('/gps/apply/disagree', warehouseCtrl.VIEW_GPS_APPLY_DISAGREE);

// 行政仓库列表页跳转
router.get('/administrative/warehouse/list', warehouseCtrl.VIEW_ADMINISTRATIVE_LIST);
// 行政仓库-创建行政仓库跳转
router.get('/administrative/warehouse/create', warehouseCtrl.VIEW_ADMINISTRATIVE_CREATE);
// 行政仓库-编辑仓库跳转
router.post('/administrative/warehouse/edit', warehouseCtrl.VIEW_ADMINISTRATIVE_EDIT);
// 行政仓库-库存列表页跳转
router.post('/administrative/equipment/list', warehouseCtrl.VIEW_ADMINISTRATIVE_EQUIPMENT_LIST);
// 行政仓库-新增入库页跳转
router.post('/administrative/equipment/create', warehouseCtrl.VIEW_ADMINISTRATIVE_EQUIPMENT_CREATE);
// 行政仓库-库存编辑页跳转
router.post('/administrative/equipment/edit', warehouseCtrl.VIEW_ADMINISTRATIVE_EQUIPMENT_EDIT);


// 人员信息主导航跳转
router.get('/employee/system', contactCtrl.VIEW_EMPLOYEE_SYSTEM);
// 通讯录列表页跳转
router.get('/employee/list', contactCtrl.VIEW_EMPLOYEE_LIST);
// 邀请同事页跳转
router.get('/employee/invite', contactCtrl.VIEW_EMPLOYEE_INVITE);
// 员工个人详情页跳转
router.post('/employee/detail', contactCtrl.VIEW_EMPLOYEE_DETAIL);
// 部门页跳转
router.get('/department', contactCtrl.VIEW_DEPARTMENT);

// 数据统计主导航跳转
router.get('/statistics/system', statisticsCtrl.VIEW_STATISTICS_SYSTEM);
// 数据统计-业务统计跳转
router.get('/statistics/business/list', statisticsCtrl.VIEW_STATISTICS_BUSINESS_LIST);
// 数据统计-业务量统计-业务量统计视图数据获取
router.post('/api/statistics/business', statisticsCtrl.API_STATISTICS_BUSINESS_DATA);
// 数据统计-业务量统计-城市统计视图数据获取
router.post('/api/statistics/city', statisticsCtrl.API_STATISTICS_CITY_DATA);
// 数据统计-业务量统计-产品统计视图数据获取
router.post('/api/statistics/product', statisticsCtrl.API_STATISTICS_PRODUCT_DATA);
// 数据统计-人效统计导航跳转
router.get('/statistics/person/system', statisticsCtrl.VIEW_STATISTICS_PERSON_SYSTEM);
// 数据统计-人效统计-进件跳转
router.all('/statistics/person/order', statisticsCtrl.VIEW_STATISTICS_PERSON_ORDER);
// 数据统计-人效统计-请款跳转
router.all('/statistics/person/request', statisticsCtrl.VIEW_STATISTICS_PERSON_REQUEST);
// 数据统计-人效统计-归档跳转
router.all('/statistics/person/pigeonhole', statisticsCtrl.VIEW_STATISTICS_PERSON_PIGEONHOLE);
// 数据统计-人效统计-个人主页跳转
router.post('/statistics/personal', statisticsCtrl.VIEW_STATISTICS_PERSONAL);
// 数据统计-人效统计-个人进件统计视图数据获取
router.post('/api/statistics/personal/order', statisticsCtrl.API_STATISTICS_PERSONAL_ORDER_DATA);
// 数据统计-人效统计-个人请款统计视图数据获取
router.post('/api/statistics/personal/request', statisticsCtrl.API_STATISTICS_PERSONAL_REQUEST_DATA);
// 数据统计-人效统计-个人归档统计视图数据获取
router.post('/api/statistics/personal/pigeonhole', statisticsCtrl.API_STATISTICS_PERSONAL_PIGEONHOLE_DATA);
// 数据统计-人效统计-个人业务量统计跳转
router.post('/statistics/personal/business', statisticsCtrl.VIEW_STATISTICS_PERSONAL_BUSINESS);

// 系统管理主导航跳转
router.get('/systemManagement', systemManagementCtrl.VIEW_SYSTEMMANAGEMENT);
// 系统管理-租户管理-列表页跳转
router.get('/company/list', systemManagementCtrl.VIEW_SYSTEM_COMPANY_LIST);
// 系统管理-租户管理-创建租户跳转
router.get('/company/create', systemManagementCtrl.VIEW_SYSTEM_COMPANY_CREATE);
// 系统管理-租户管理-编辑租户跳转
router.post('/company/edit', systemManagementCtrl.VIEW_SYSTEM_COMPANY_EDIT);
// 系统管理-租户管理-查看租户详情跳转
router.post('/company/detail', systemManagementCtrl.VIEW_SYSTEM_COMPANY_DETAIL);
// 系统管理-意见反馈-列表页跳转
router.all('/feedback/list', systemManagementCtrl.VIEW_SYSTEM_FEEDBACK_LIST);
// 系统管理-意见反馈-查看详情页跳转
router.all('/feedback/detail', systemManagementCtrl.VIEW_SYSTEM_FEEDBACK_DETAIL);


// 权限管理-主导航跳转
router.get('/privilege/system', privilegeCtrl.VIEW_PRIVILEGE_system);
// 权限管理-角色列表页跳转
router.get('/privilege/roles/list', privilegeCtrl.VIEW_PRIVILEGE_ROLE_LIST);
// 权限管理-角色管理-创建页跳转
router.get('/privilege/roles/create', privilegeCtrl.VIEW_PRIVILEGE_ROLE_CREATE);
// 权限管理-角色管理-编辑页跳转
router.post('/privilege/roles/edit', privilegeCtrl.VIEW_PRIVILEGE_ROLE_EDIT);
// 权限管理-人员管理-列表页跳转
router.get('/privilege/user/list', privilegeCtrl.VIEW_PRIVILEGE_USER_LIST);
// 权限管理-人员管理-赋予角色跳转
router.post('/privilege/user/toAssignRoles', privilegeCtrl.VIEW_PRIVILEGE_USER_ASSIGN_ROLES);



// 个人中心-导航跳转
router.get('/userCenter/information', settingsCtrl.VIEW_userCenter);
// 个人中心-重设密码跳转
router.get('/userCenter/resetPassword', settingsCtrl.VIEW_userCenter_resetPassword);









/*router.get('/statistics', function (req, res, next) {
    request(contextPath + '/home', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //var data = JSON.parse(response.body);
            res.send(response);
        }
    });
});*/
// If router is undefined redirect to 404 page.
router.get('*', function(req, res, next) {
    res.render('./errorpage/404', {title: '404'});
});

module.exports = router;
