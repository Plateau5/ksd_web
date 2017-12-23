/**
 * Created by Arley Joe on 2017-12-20 17:09:53
 */

var XTemplate = require('xtemplate');
var xtpl = require('xtpl');
XTemplate.addCommand('contains', function (scopes, option, buffer) {
    return (option.params[0].indexOf(option.params[1]) !== -1) ? option.fn(scopes,buffer) : option.fn(scopes,buffer);
});
module.exports = XTemplate;

