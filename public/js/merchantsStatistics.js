/**
 * Created by Arley Joe on 2018/01/31
 */
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
            x : 30,
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
            y : 10
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
                            return params.value = formatterFn(params);
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
                            return params.value = formatterFn(params);
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
                            return params.value = formatterFn(params);
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
                            return params.value = formatterFn(params);
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
 * @returns {*}
 */
function formatterFn (params) {
    if(params.value == 0){
        return ''
    } else {
        return params.value = params.value + '户';
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
            x : 30,
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
            y : 10
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
                boundaryGap: true,
                rawdate : [1,2,1,2,1,2,2]
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