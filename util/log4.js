/**
 * Created by Arley Joe on 2017-11-10 10:49:56
 */

var log4js = require('log4js'); // 日志模块
var logPath = '/home/work/apps/node/logs';
// var logPath = 'F:/logs';
log4js.configure({
    appenders: {
        console: { type: 'console' },
        default: { type: 'dateFile', filename: logPath + '/default', "pattern":"/KSD_WEB_yyyy-MM-dd.txt",alwaysIncludePattern:true, maxLogSize: 102400, backups: 7},
        info: { type: 'dateFile', filename: logPath + '/info',"pattern":"/KSD_WEB_yyyy-MM-dd.txt", alwaysIncludePattern:true, maxLogSize: 102400, backups: 7 },
        error: { type: 'dateFile', filename: logPath + '/error', "pattern":"/KSD_WEB_yyyy-MM-dd.txt",alwaysIncludePattern:true, maxLogSize: 10240, backups: 7},
        email : {
            type: 'smtp',
            recipients: 'qiaosl@jizhicar.com',
            sendInterval: 0,
            transport: 'SMTP',
            subject : '快收单异常-WEB',
            sender : 'ksd@kuaishoudan.com',
            SMTP: {
                host: 'smtp.kuaishoudan.com',
                secureConnection: true,
                port: 25,
                auth: {
                    user: 'ksd@kuaishoudan.com',
                    pass: 'kuaiSD2017'
                },
                debug: true
            }
            /*sender : 'arleyjoe@163.com',
            SMTP: {
                host: 'smtp.163.com',
                secureConnection: true,
                port: 465,
                auth: {
                    user: 'arleyjoe@163.com',
                    pass: 'ArleyJoe8023'
                },
                debug: true
            }*/
        }
    },
    categories: {
        console : {appenders: ['console'], level:'info'},
        default: { appenders: ['console','info'], level: 'info' },
        info: { appenders: ['console'], level: 'info' },
        error: { appenders: ['error', 'email'], level: 'error' },
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