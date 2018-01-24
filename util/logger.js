/**
 * Created by Arley on 2017/12/07.
 */

var logger = require('./log4Config');

exports.logError = function (msg) {
    var logError = logger('error');
    // if (apiServerPath.indexOf('kuaishoudan.com') !== -1) {
        logError.error(msg);
    // }
    console.error(msg);
};

exports.logInfo = function (msg) {
    var logInfo = logger('info');
    // if (apiServerPath.indexOf('kuaishoudan.com') !== -1) {
        logInfo.info(msg);
    // }
    console.log(msg);
};