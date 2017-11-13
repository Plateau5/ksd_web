/**
 * Created by Arley on 2017/8/15.
 */
// 问题列表页
exports.VIEW_QUESTION_LIST = function(req, res, next) {
    res.render('./question/list', { title: '问题管理-问题列表'});
};
exports.VIEW_QUESTION_HISRECORD = function(req, res, next) {
    res.render('./question/hisList', { title: '问题管理-历史记录'});
};
