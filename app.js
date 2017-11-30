var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var log4js = require('log4js'); // 日志模块
/*var logger =*/
var logs = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var crypto = require('crypto'); // 加密模块
var COMMONUTIL = require('./util/commonUtil');  // 主加密方法类文件

var index = require('./routes/index');
var common = require('./controller/common');
global.contextPath = 'http://localhost:8080';
global.markUri = '';
//global.contextPath = 'http://101.200.157.103:8898/api';
//global.contextPath = 'http://192.168.200.12:8899/api';
var app = express();

log4js.configure({
    appenders: {
        out: { type: 'console' },
        task: { type: 'dateFile', filename: 'logs/task',"pattern":"/yyyy-MM-dd.txt", alwaysIncludePattern:true, maxLogSize: 1024, backups: 7 },
        result: { type: 'dateFile', filename: 'logs/result',"pattern":"/yyyy-MM-dd.txt", alwaysIncludePattern:true, maxLogSize: 1024, backups: 7},
        error: { type: 'dateFile', filename: 'logs/error', "pattern":"/yyyy-MM-dd.txt",alwaysIncludePattern:true, maxLogSize: 1024, backups: 7},
        default: { type: 'dateFile', filename: 'logs/default', "pattern":"/yyyy-MM-dd.txt",alwaysIncludePattern:true, maxLogSize: 1024, backups: 7},
        rate: { type: 'dateFile', filename: 'logs/rate', "pattern":"/yyyy-MM-dd.txt",alwaysIncludePattern:true, maxLogSize: 1024, backups: 7}
    },
    categories: {
        debug : {appenders: ['out'], level:'info'},
        default: { appenders: ['out','default'], level: 'info' },
        task: { appenders: ['task'], level: 'info'},
        result: { appenders: ['result'], level: 'info' },
        error: { appenders: ['error'], level: 'error' },
        rate: { appenders: ['rate'], level: 'info' }
    },
    replaceConsole: true
});
//var logger = log4js.getLogger('debug');
exports.logger = function(name){
    var logger1 = log4js.getLogger(name);
    logger1.level = 'INFO';
    return logger1;
};


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'xtpl');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));
//combined:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
// common : remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]
// dev : method :url :status :response-time ms - :res[content-length]
// short : remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms
// tiny : method :url :status :res[content-length] - :response-time ms
//app.use(logs('common'));
app.use(log4js.connectLogger(this.logger('debug'), { level: 'auto', format : ':method :url HTTP/:http-version :status :res[content-length] :referrer :user-agent - :response-time ms' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', lessMiddleware(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(common.startWith);
app.use(common.getUserInfo);
app.use(common.verifyCode);
// 启动登录拦截功能。
/*app.use(function (req, res, next) {
    var url = req.originalUrl;//获取浏览器中当前访问的nodejs路由地址；
    var logininfo = req.cookies.logininfo; //获取客户端存取的cookie,userCookies为cookie的名称；//有时拿不到cookie值，可能是因为拦截器位置放错，获取该cookie的方式是依赖于nodejs自带的cookie模块，//因此，获取cookie必须在1,2步之后才能使用，否则拿到的cookie就是undefined.
    if((url !== '/login' && url !== '/' && url !== '/logout') && (logininfo === '' || logininfo === undefined || logininfo === null)){ //通过判断控制用户登录后不能访问登录页面；
        // console.log((url !== '/login' && url !== '/' && url !== '/logout'));
        // console.log((log_info !== ''));
        res.redirect('/login');    //页面重定向
        // res.clearCookie();
    } else {
        next();
    }
});*/

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render(err);
  // res.redirect('/404');
});

/*var proxy = require('express-http-proxy');
app.use(/http:\/\/localhost:3000\/api/ig, proxy('http://localhost:8080/api', {
    proxyReqPathResolver: function(req) {
        return require('url').parse(req.url).path;
    }
}));*/


module.exports = app;
