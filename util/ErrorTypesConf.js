var ErrorTypes = {
    CheckPrivilege : 'CheckPrivilege Error',    // 权限校验错误
    HttpRequest : 'HttpRequest Error',        // HTTP请求错误
    Route : 'Route Error',      // 请求路由错误,
    Param : 'Param Error',      // 请求参数错误（含参数错误，无法定位渲染页面<如：gps申请确认发送>）
};

module.exports = ErrorTypes;