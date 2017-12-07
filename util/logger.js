/**
 * Created by Arley on 2017/12/07.
 */

var logger = require('./../util/log4');

exports.LOGOUT = function (str) {
    var logError = logger('error');
    logError.error(str);
    console.error(str);
    /*var logInfo = logger('out');
    logInfo.info(str);*/
};