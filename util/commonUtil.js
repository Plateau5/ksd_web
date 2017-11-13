/**
 * Created by Arley on 2017/8/21.
 */
var crypto = require('crypto');
var COMMONUTIL = {};
/**
 *  MD5加密算法
 * @type {*|Function}
 */
COMMONUTIL.md5 = function (value) {
    return crypto.createHash('md5').update(value).digest('hex');
};


/**
 * AES加密解密算法
 * @type {*|Function}
 */
var iv = 'DFrsd454DF$f#sd@';    // 加密私钥
var key = 'HLjmc2loveGame12';   // 向量
/**
 * 加密方法
 * @param data     需要加密的数据
 * @returns string
 */
COMMONUTIL.encrypt = function (data) {
    data = decodeURIComponent(data);
    var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    var crypted = cipher.update(data, 'utf8', 'binary');
    crypted += cipher.final('binary');
    crypted = new Buffer(crypted, 'binary').toString('base64');
    return crypted;
};

/**
 * 解密方法
 * @param crypted  密文
 * @returns string
 */
COMMONUTIL.decrypt = function (crypted) {
    crypted = decodeURIComponent(crypted);
    crypted = new Buffer(crypted, 'base64').toString('binary');
    var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    var decoded = decipher.update(crypted, 'binary', 'utf8');
    decoded += decipher.final('utf8');
    return decoded;
};

// 测试数据
/*console.log('加密的key:', key.toString('hex'));
console.log('加密的iv:', iv);
var data = decodeURIComponent("o78fQZqdeQzZ6DP2QaPioF6%2B5%2FYKPjQh9x3l5%2FydlSTbMoKog1QFIFDzYaYzV4HrpBA8Vv0o7w%2FreBvTlbz8X%2BGPv%2FU3rVWt46TWfldkkOjlw%2B0UzP%2FqxXwOYwVuKdoKY%2FJ3R3ITS%2FsnBhSt6dVx%2F4Syxf4XUOd2H6H%2BVHmaNeNOwVKn4Tn47%2Fz0wUUr%2FGzLKpvNTYv%2FftcfG2grF1G1H3uJMDCjWzp40SnEeBOXms3PFIPReCSWuIPGvby4pGL1ez76S7%2BhFz8FmdZ87s4ttDCneFZvI7wiNQwjjY9izRmITaS9w6iR2uMGhv5HBG4CMk8K5EpQ1L9J9uPLMCoym5cEFtIvHPiFQtfoqjj1wtE7GGd8saevrwlx6P2ZahdrhmFiHDwNZrvGQOmNy%2FNMSFpAOzoNS2JiRkEh5%2B%2F8c%2BI%2B5BDNOOKelR9c3NUQAWFAycOjLOSBmCYR5lRD%2FAAM276SY9WU2qtPgTa3inNDSzmcaWePRxUTWwQRi9DtzF%2FaZChRZwznRA6EiWc%2Bu6ehLks2JgyV7BNywYJm2iyS6MEzR9L834KPK7Mb6Uhni%2Fq%2FvFDSIgk5cT%2FZOWC6XVBJiqYxbK3mOAhWUxSNhrE00hDj0KX7tiBv4iwc%2FHFrjRmEIqeSmky8l%2Bg6XM%2BKBHMqejWRGVsEgvSy%2B17jfENEsgVSEuUH%2B9OzPvv0LzcNiQw8I7cCB9OMVOF6XSvtvVdpldT0gDHhd9DVQXyajdphWKXOIIm5Jqz%2Bfk%2BKDlWSSrvWNoxQXvbTn4fx1KqgmY1P5IE%2BFUryDSWrBIgmWCk1sfK%2BYeT0YWhxl1JywFdlQDwVjhF5T0u6pbPQqGF5LnO%2FhUQT23Q%2BU%2FYBfu%2FaK4Lw0jweGYpggnrRIjZ%2FFej2lyWJvEviqJIguLw2sG0VuoOZENJ0r%2FUVsC5ailXKsprcfOCq3rZaYM11SUicHwE016gU0qyH7JbSU1OA0s%2Bs%2BJBgvPPUb2lLXS92oxlMc%2Fso6VnFHoJVXhuwioP33fW6WeMHcOjgwTpQ9Ap6NpDJ8ao74%2BcL53M3yi779%2BbwM92rcDlsXI6swH%2BV1%2FWUlUBoUkHCiinRWTN7ezVQlV4P2NEEm5eoHuzq8YTUmMwb6jjxyOFPJZHezoRvLOnWKEKFWsGq7GYaVszYk7tU%2FDQtAc5v5Slg7i8O5VZBPYxmFznhqkQQNsd%2F9%2FruvSdc9gGullrvRm2SM%2BSmMCTxJNWs6JQ7m8yO4%2B5MxFAPSxLpsZVdhNJh%2FA12knic%2FA7bFeygSMofj66Uuyk4UChF4TBrFIWLpE4odZDyMxJaVZGIMXsosMhxg7cW0yJkc3L9cfVbmy7UuKBk0aBmdklAVOWpI8LZLjOvRjU0oCURVL10MCrxJad0REPGSVS45TjsQ6IF74lRXi31s2odtQef%2Btjrom7ZmUWGT0FGBvlH3Y6WdLFTIpDDmTNvQP%2BVmdSganJQgVZZGF1%2BFIvt8M4afNZ5Ls3zcKJ9L0r6egdnP%2FUOvRGnv4qrcQDPeARBcpWASXg%2FzLoOGMMrFLtPIrl2knuVC3XB85E5CiEHNRuQMaqrEzcHmvr05wN%2Fzlzku%2BpKWnZRvGZU0LL%2F5uJScY212rtH5TWwsjyKnVOcyiZH2CJuENWIT54KRAuIVUxHgRyB9rHE%2Fitwm6BYkrUdDXKFn2LuL63BCjpPXR4RzPqybPKitH%2BFm7T2d%2B7LtQaWFF9o9YYf1hmyzJncD1iUVjq4vmO%2Bh8nLLMQWdAvwErHvoYrrzfRSeUmj0F%2FvtPBQOPQVxVX5XrJq%2FHepyMeHDQFkJnGl2i0qv%2BK9LbUDigZL3wCzfSJBwET4UxkUZPr99M8mwR%2B01is04nWv2j0SFwt48sQqwSd5DxwR%2Fg3fM7fPSuG3VN6k2Z7AoNzX0TtDBd5D5pb1Vv%2FRgYo2oOYa%2FJXKFB5mlSAU2YxOZKSgl5SdoJWHtO9rR7hZBSGyrK9jiap3gFLffO%2Bwy0kunxSKFfuq%2BGF3ReP7xksYiBcClmoadWF2sEuLdhHySjFty47azxB%2BanfbMdQh4F0N0pYphSwp1QvN1FJi6ACpnQqP%2FT%2FWyCT7TUnASzHYOIJ9BoW5rcS8o1rt3ScO");
var data1 = 'C2026CD0CB1CCFBFBCDDEFA4C6903196';
var data2 = 'WR89x8aPuJcwGYkA7Ae9wQ==';
var data3 = 'upwRPRu2RdcZChzdaP5oFg==';
var data4 = 'c6AN+6DA8V+iSzy+lpSH87lS8hAHYCznXVpWDylic2FUQoidMq5o0lxgn7Vt9t5wJseqtMsV02v6cp4cEdcVp7dOvY0+y318BgaJx0r6HlpqPQPESyYPMxC5kmX5C6S2SdyE/7m6w7/CDn9QiLuScw==';
var data5 = 'DY16djr3+zqAzaG6NaQZkiu4dTl5Bpd3LTAtldjPxEg1IeM2QXxYyXSqGFjRcHlV';
var data6 = 'D316wMBOqac37h3dFpA1NQ==';
console.log("测试： "+data);
console.log("需要加密的数据:", data);
var crypted = COMMONUTIL.encrypt(data);
console.log("数据加密后:", crypted);
var dec = COMMONUTIL.decrypt(data2);
console.log("数据解密后:", dec);*/

module.exports = COMMONUTIL;