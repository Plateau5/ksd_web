/**
 * Created by Arley Joe on 2017-11-10 10:49:56
 */

var log4js = require('log4js'); // 日志模块
log4js.configure({
    appenders: {
        out: { type: 'console' },  // todo 此处为console
        task: { type: 'dateFile', filename: 'F:/logs/task',"pattern":"/yyyy-MM-dd.txt", alwaysIncludePattern:true, maxLogSize: 1024, backups: 7 },
        result: { type: 'dateFile', filename: 'F:/logs/result',"pattern":"/yyyy-MM-dd.txt", alwaysIncludePattern:true, maxLogSize: 1024, backups: 7},
        error: { type: 'dateFile', filename: 'F:/logs/error', "pattern":"/yyyy-MM-dd.txt",alwaysIncludePattern:true, maxLogSize: 1024, backups: 7},
        default: { type: 'dateFile', filename: 'F:/logs/default', "pattern":"/yyyy-MM-dd.txt",alwaysIncludePattern:true, maxLogSize: 1024, backups: 7},
        rate: { type: 'dateFile', filename: 'F:/logs/rate', "pattern":"/yyyy-MM-dd.txt",alwaysIncludePattern:true, maxLogSize: 1024, backups: 7},
        email : {
            type: 'smtp',
            recipients: 'qiaosl@jizhicar.com',
            sendInterval: 0,
            transport: 'SMTP',
            subject : '快收单异常-WEB',
            /*sender : 'arleyjoe@163.com',
            SMTP: {
                host: 'smtp.kuaishoudan.com',
                secureConnection: true,
                port: 25,
                auth: {
                    user: 'ksd@kuaishoudan.com',
                    pass: 'kuaiSD2017'
                },
                debug: true
            }*/
            sender : 'arleyjoe@163.com',
            SMTP: {
                host: 'smtp.163.com',
                secureConnection: true,
                port: 465,
                auth: {
                    user: 'arleyjoe@163.com',
                    pass: 'ArleyJoe8023'
                },
                debug: true
            }
        }
    },
    categories: {
        debug : {appenders: ['out'], level:'info'},
        default: { appenders: ['out','default'], level: 'info' },
        task: { appenders: ['task'], level: 'info'},
        result: { appenders: ['result'], level: 'info' },
        error: { appenders: ['error', 'email'], level: 'error' },
        rate: { appenders: ['rate'], level: 'info' },
        email : { appenders: [ 'email' ], level: 'error' }
    },
    replaceConsole: true
});
//var logger = log4js.getLogger('debug');
var logger = function(name){
    var logger = log4js.getLogger(name);
    // logger1.level = 'INFO';
    return logger;
};

module.exports = logger;