/**
 * Created by Arley Joe on 2017-11-10 10:49:56
 */

var log4js = require('log4js'); // 日志模块
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
var logger = function(name){
    var logger1 = log4js.getLogger(name);
    logger1.level = 'INFO';
    return logger1;
};

module.exports = logger;