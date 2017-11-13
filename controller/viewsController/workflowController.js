/**
 * Created by Arley on 2017/8/6.
 */
// 流程管理-审批流列表页跳转
exports.VIEW_WORKFLOW_LIST = function(req, res, next) {
    res.render('./workflow/workflowList', { title: '流程管理-审批流列表'});
};

// 流程管理-创建审批流页跳转
exports.VIEW_WORKFLOW_CREATE = function(req, res, next) {
    res.render('./workflow/create', { title: '流程管理-新建建审批流'});
};
// 流程管理-查看审批流详情页跳转
exports.VIEW_WORKFLOW_DETAIL = function(req, res, next) {
    res.render('./workflow/detail', { title: '流程管理-查看详情'});
};
// 流程管理-编辑审批流页跳转
exports.VIEW_WORKFLOW_EDIT = function(req, res, next) {
    res.render('./workflow/edit', { title: '流程管理-编辑审批流'});
};