/**
 * Created by Arley Joe on 2018/01/31
 */
/**
 * 计算周、季度数据
 * @author Arley Joe 2018年2月2日10:32:23
 * @param type {Number} : 1-季度；2-周
 */
function getTime (option) {
    var options = {
        type : option.type || 1,
        time : option.time || ($('#serverTime').val()+ '').trim().number() || new Date().getTime(),
        minDate : option.minDate || '1970-01-01',
        maxDate : option.maxDate || '',
        callback : option.callback || null
    };
    const step = 86400000;       // 一天毫秒数
    var result = [];
    var date = '',      // 当前服务器时间或者最大时间
        minYear = '',   // 最小年份
        maxYear = '';   // 最大年份
    if (options.maxDate != '') {
        date = new Date(options.maxDate).getTime();
        maxYear = options.maxDate.slice(0,4).number();
    } else {
        date = options.time;
        maxYear = new Date(options.time).getFullYear();
    }
    if (options.minDate != '') {
        minYear = options.minDate.slice(0,4).number();
    } else {
        minYear = 1970;
    }
    if (options.type === 1) {   // 季度
        var _thisQ = new Date(date).getQuarter();        // 当前季度
        var _minQ = new Date(options.minDate).getQuarter();     // 最小季度
        var _thisYear = maxYear;      // 当前年份
        for (var i = 0; i < 100000; i++) {
            var d = {};
            if (_thisQ <= _minQ && _thisYear <= minYear) {
                break;
            }
            if (_thisQ === 1) {
                _thisQ = 4;
                _thisYear--;
            } else {
                _thisQ--;
            }
            switch (_thisQ) {
                case 1:
                    d.name = _thisYear + "年Q1";
                    d.value = _thisYear + "-01," + _thisYear + '-03';
                    break;
                case 2:
                    d.name = _thisYear + "年Q2";
                    d.value = _thisYear + "-04," + _thisYear + '-06';
                    break;
                case 3:
                    d.name = _thisYear + "年Q3";
                    d.value = _thisYear + "-07," + _thisYear + '-09';
                    break;
                case 4:
                    d.name = _thisYear + "年Q4";
                    d.value = _thisYear + "-10," + _thisYear + '-12';
                    break;
            }
            result.push(d);
        }
        // console.log(result);

    } else if (options.type === 2) {    // 周数据
        var _week = new Date(date).getDay();   // 当前日期是周几
        _week === 0 && (_week = 7);         // 重置周日
        var minTime = new Date(options.minDate).getTime();      // 最小日期的时间戳
        var endWeek = date - step * _week;     // 最大周日的时间戳
        for (var k = 0; k < 100000000; k++) {
            var dateStr = new Date(endWeek).format('yyyy-MM-dd');
            result.push(dateStr);
            endWeek -= step * 7;
            if (endWeek < minTime) {
                break;
            }
        }
    }
    return result;
}


/**
 * 获取城市数据
 * @author Arley Joe 2018年1月31日10:32:52
 * @return {Array}
 */
function getCityList () {
    var cityList = [];
    redefineAjax({
        url : contextPath + '/api/listcity',
        async : false,
        success : function (res) {
            if (res.error_code == 0) {
                cityList = res.data;
            }
        },
        error : function () {
            cityList = [];
        }
    });
    return cityList;
}

/**
 * 创建城市下拉选择元素
 * @author Arley Joe 2018年1月31日10:41:27
 * @param selector {String} 目标元素
 */
function createCityElem (selector) {
    var target = $(selector);
    var cityList = getCityList();
    if (cityList.length > 0) {
        var cityStr = '<option value="">全部</option>';
        for (var i = 0, len = cityList.length; i < len; i++) {
            cityStr += '<option value="'+ cityList[i].id +'">'+ cityList[i].name +'</option>';
        }
        target.html(cityStr);
    }
}

/**
 * 创建商户趋势变化统计折线视图
 * @param target
 * @param data
 */
function merchantsLineChart (target, data) {
    var lineChart = echarts.init(document.getElementById(target));
    var option = {
        title : {
            text: '商户趋势变化(户)',
            x : 15,
            y : 10,
            textStyle: {
                fontSize: 14,
                fontWeight: 'normal',
                color: '#535e4a'          // 主标题文字颜色
            }
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {
                show : true,
                type : 'cross'
            }
        },
        legend: {
            data:data.legend,
            y : 10,
            textStyle : {
                color : '#999999'
            }
        },
        grid: {
            zlevel: 1000,
            left: 80,
            right: 80,
            bottom: 60,
            top: 80
        },
        color: ['#8ED06E','#1DC6BC','#FFB762', '#FD7459'],
        toolbox: {
            show : true,
            right: 30,
            top : 10,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                // restore : {show: false},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                splitNumber:1,
                boundaryGap : false,
                data : data.xaxis,
                axisLabel:{
                    interval:0
                },
                splitLine: {           // 分隔线
                    show: false
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine: {           // 分隔线
                    show: false
                }
            }
        ],
        series : [
            {
                name:data.legend[0],
                type:'line',
                smooth:true,
                data: data.yaxis.name0,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter : function (params) {
                            return params.value = formatterFn(params, '户');
                        }
                    }
                }
            },
            {
                name:data.legend[1],
                type:'line',
                smooth:true,
                data: data.yaxis.name1,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter : function (params) {
                            return params.value = formatterFn(params, '户');
                        }
                    }
                }
            },
            {
                name:data.legend[2],
                type:'line',
                smooth:true,
                data: data.yaxis.name2,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter : function (params) {
                            return params.value = formatterFn(params, '户');
                        }
                    }
                }
            },
            {
                name:data.legend[3],
                type:'line',
                smooth:true,
                data: data.yaxis.name3,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter : function (params) {
                            return params.value = formatterFn(params, '户');
                        }
                    }
                }
            }
        ]
    };

    lineChart.setOption(option);
}


/**
 * 格式化series的数据显示格式。
 * @param params {Array || Object} : echarts的官方提供参数
 * @param unit {String} ： 单位
 * @returns {*}
 */
function formatterFn (params, unit) {
    if(params.value == 0){
        return ''
    } else {
        return params.value = params.value + unit;
    }
}

/**
 * 创建商户类型统计柱状视图
 * @param target
 * @param data
 */
function merchantsTypeBarChart (target, data) {
    var barChart = echarts.init(document.getElementById(target));
    var option = {
        title : {
            text: '商户店面类型统计(户)',
            x : 15,
            y : 10,
            textStyle: {
                fontSize: 14,
                fontWeight: 'normal',
                color: '#535e4a'          // 主标题文字颜色
            }
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {
                show : true,
                type : 'cross'
            }
        },
        legend: {
            data:data.legend,
            y : 10,
            textStyle : {
                color : '#999999'
            }
        },
        grid: {
            zlevel: 1000,
            left: 80,
            right: 80,
            bottom: 60,
            top: 80
        },
        color: ['#80D4FA','#BFE9FC'],
        toolbox: {
            show : true,
            right: 30,
            top : 10,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type:  ['line', 'bar', 'stack', 'tiled']},
                // restore : {show: false},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : data.xaxis,
                axisLabel:{
                    interval:0
                },
                splitLine: {           // 分隔线
                    show: false
                },
                boundaryGap: true
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine: {           // 分隔线
                    show: false
                }
            }
        ],
        series : [
            {
                name:data.legend[0],
                type:'bar',
                smooth:true,
                data: data.yaxis.pass,
                stack : '总量',
                /*itemStyle : { normal: {label : {show: true, position: 'insideTop'}}},
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter : function (params) {
                            return params.value = formatterFn(params);
                        }
                    }
                }*/
            },
            {
                name:data.legend[1],
                type:'bar',
                smooth:true,
                data: data.yaxis.unpass,
                stack : '总量',
            }
        ]
    };

    barChart.setOption(option);
    var ecConfig = echarts.config;
    function eConsole(param) {
        var barIndex = param.dataIndex;
        if (typeof barIndex != 'undefined') {
            var type = typeBarIds[barIndex];
            var name = param.name;
            var cityId = $('#typeCityId').find('option:selected').val().trim();
            locationTo({
                action : contextPath + markUri + '/statistics/merchants/typeList',
                param : {
                    type : type,
                    name : name,
                    city_id : cityId,
                    order_by : 1
                }
            });
        }
    }
    barChart.on('click', eConsole);
}

/**
 * 创建商户订单各类型总量柱状图
 * @param target
 * @param data
 */
function merchantsOrderTypeBarChart (target, data) {
    var barChart = echarts.init(document.getElementById(target));
    var option = {
        title : {
            text: '贡献值：' + data.contribution,
            x : 14,
            y : 5,
            textStyle: {
                fontSize: 12,
                fontWeight: 'normal',
                color: '#535e4a'          // 主标题文字颜色
            }
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {
                show : true,
                type : 'cross'
            }
        },
        legend: {
            data:data.legend,
            y : 10,
            textStyle : {
                color : '#999999'
            }
        },
        grid: {
            zlevel: 1000,
            left: 60,
            right: 60,
            bottom: 60,
            top: 50
        },
        color: ['#80D4FA','#BFE9FC'],
        toolbox: {
            show : true,
            right: 30,
            top : 10,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type:  ['line', 'bar']},
                // restore : {show: false},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : data.xaxis,
                axisLabel:{
                    interval:0
                },
                splitLine: {           // 分隔线
                    show: false
                },
                boundaryGap: true
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine: {           // 分隔线
                    show: false
                }
            }
        ],
        series : [
            {
                name:'',
                type:'bar',
                smooth:true,
                data: data.yaxis,
                stack : '总量',
                // itemStyle : { normal: {label : {show: true, position: 'insideTop'}}},
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter : function (params) {
                            return params.value = formatterFn(params, '单');
                        }
                    }
                }
            }
        ]
    };

    barChart.setOption(option);
}

/**
 * 创建商户趋势变化统计折线视图
 * @param target
 * @param data
 */
function merchantsOrdersLineChart (target, data) {
    var lineChart = echarts.init(document.getElementById(target));
    var option = {
        /*title : {
            text: '进件通过率统计(单)',
            x : 12,
            y : 10,
            textStyle: {
                fontSize: 14,
                fontWeight: 'normal',
                color: '#535e4a'          // 主标题文字颜色
            }
        },*/
        tooltip : {
            trigger: 'axis',
            axisPointer : {
                show : true,
                type : 'cross'
            }
        },
        legend: {
            data:data.legend,
            y : 10,
            textStyle : {
                color : '#999999'
            }
        },
        grid: {
            zlevel: 1000,
            left: 80,
            right: 80,
            bottom: 60,
            top: 65
        },
        color: ['#8ED06E','#1DC6BC','#FD7459', '#717ACC', '#59B7FD'],
        toolbox: {
            show : true,
            right: 30,
            top : 10,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                // restore : {show: false},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                splitNumber:1,
                boundaryGap : false,
                data : data.xaxis,
                axisLabel:{
                    interval:0
                },
                splitLine: {           // 分隔线
                    show: false
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine: {           // 分隔线
                    show: false
                }
            }
        ],
        series : [
            {
                name:data.legend[0],
                type:'line',
                smooth:true,
                data: data.yaxis.name0,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter : function (params) {
                            return params.value = formatterFn(params, '单');
                        }
                    }
                }
            },
            {
                name:data.legend[1],
                type:'line',
                smooth:true,
                data: data.yaxis.name1,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter : function (params) {
                            return params.value = formatterFn(params, '单');
                        }
                    }
                }
            },
            {
                name:data.legend[2],
                type:'line',
                smooth:true,
                data: data.yaxis.name2,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter : function (params) {
                            return params.value = formatterFn(params, '单');
                        }
                    }
                }
            },
            {
                name:data.legend[3],
                type:'line',
                smooth:true,
                data: data.yaxis.name3,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter : function (params) {
                            return params.value = formatterFn(params, '单');
                        }
                    }
                }
            },
            {
                name:data.legend[4],
                type:'line',
                smooth:true,
                data: data.yaxis.name4,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter : function (params) {
                            return params.value = formatterFn(params, '单');
                        }
                    }
                }
            }
        ]
    };

    lineChart.setOption(option);
}
