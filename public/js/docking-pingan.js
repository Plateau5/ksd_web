/**
 * Created by Arley Joe 2017-12-29 14:52:47
 */

/**
 * Toast轻提示扩展
 * @author Arley Joe 2017-12-29 14:56:57
 * @param str {String} : 提示文本
 * @param callback {Function} : 回调函数
 * @param type {Number} : 提示类型：0-success; 1-error; 2-warning
 */
var $toast = function(str, callback, type){
    var toast = '<div class="toast-container" id="toast">\n' +
        '        <p class="toast-content '+ ((type && type === 1) && 'error')  +'">\n' +
        '            <span class="toast-context">'+ str +'</span>\n' +
        '        </p>\n' +
        '    </div>';
    $('body').append(toast);
    $('#toast').fadeIn(600);
    var timer = setTimeout(function () {
        $('#toast').fadeOut(600,function () {
            callback && callback();
            $(this).remove();
        });
        clearTimeout(timer);
    }, 2000);
}


/**
 * 输入框焦点离开非空校验
 * @author Arley Joe 2017-12-29 14:56:57
 * @desc 所有必传项的input必须含有requireTrue类（class）,同时必须含有兄弟元素’tips_info‘
 */
function validateBlurEmpty () {
    $('.docking_container').on('blur', '.required', function () {
        var t = $(this);
        var v = $.trim(t.val());
        if (v == '') {
            var tipText = t.data('tips');
            t.siblings('.tips_info').show().find('.tips_text').text(tipText);
            return false;
        }
    });
    $('.docking_container').on('input', '.required', function () {
        var t = $(this);
        var v = $.trim(t.val());
        if (v != '') {
            t.siblings('.tips_info').hide();
        }
    });
}

/**
 * 输入框只允许输入数字或者两位小数方法
 * @author Arley Joe 2017年12月30日12:36:49
 * @param ele   {String} 输入框元素（Jquery对象）
 * @param max   {Number} 最大可输入值。
 */
function intOrFloat (ele, max) {
    ele.on("keyup", function () {
        var reg = /^\d{0,7}(\.\d{0,2})?$/g;
        var _this = $(this);
        var val = _this.val();
        if (reg.test(val)) {
            _this.siblings('.tips_info').hide();
            return true;
        } else {
            val = Number(val);
            if (!isNaN(val) && val != 0) {
                val = (/\d+(\.\d{1,2})?/g.exec(val))[0];
                _this.val(val);
                _this.siblings('.tips_info').hide().find('.tips_text').text("");
            } else {
                _this.val(0);
                _this.siblings('.tips_info').show().find('.tips_text').text("只允许输入数字,最多两位小数");
                return false;
            }
        }
        if (val > max) {
            _this.siblings('.tips_info').show().find('.tips_text').text("最大可输入数值为"+ max +".");
        } else {
            _this.siblings('.tips_info').hide().find('.tips_text').text("");
        }
    });
}

/**
 * 品牌、车系、车型、年份联动
 * @author Arley Joe 2017-12-30 12:43:01
 *
 */
function brandChoose (data) {
    var brandEle = $('#brand');     // 品牌
    var carSeriesEle = $('#carSeries');    // 车系
    var carModelEle = $('#carModel');    // 车型
    var carYearEle = $('#carYear');    // 车辆年款
    var carSeriseArr = [];      // 车系数据
    brandEle.on('change', function () {
        var _this = $(this);
        // 清空车系、车型、年款
        carModelEle.html('<option value="">请选择</option>');
        carSeriesEle.html('<option value="">请选择</option>');
        // 获取选中品牌的ID并根据此ID筛选该品牌下的车系、车型、年款
        var checkedBrand = _this.find('option:selected').val();     // 选中的品牌的ID
        carSeriseArr = jsonsql.query('select * from json where (work_city==' + checkedBrand + ')', data);  // 通过jsonsql查询车系数据
        if (carSeriseArr.length > 0) {
            var seriseStr = '<option value="">请选择</option>';
            for (var i = 0, len = carSeriseArr.length; i < len; i++) {
                seriseStr += '<option value=""></option>';
            }
            carSeriesEle.append(seriseStr);
        } else {
            $toast('该品牌下无相关车系，请选择其他品牌。');
        }
    });
    // 根据年款筛选车型。
    carYearEle.on('change', function () {
        var _this = $(this);
        // 车型
        carModelEle.html('<option value="">请选择</option>');
        // 获取选中车系的ID并根据此ID筛选该品牌下的车系、车型、年款
        var checkedBrand = _this.find('option:selected').val();     // 选中的品牌的ID
        var carModelArr = jsonsql.query('select * from json where (work_city==' + cityId + ')', carSeriseArr);  // 通过jsonsql查询车系数据
        if (carModelArr.length > 0) {
            var carModelStr = '<option value="">请选择</option>';
            for (var i = 0, len = carModelArr.length; i < len; i++) {
                carModelStr += '<option value=""></option>';
            }
            carModelEle.append(carModelStr);
        } else {
            $toast('该年款下无相关车型，请选择其他年款或其他车系。');
        }
    })
}

// 是否有工作
function isHaveWork () {
    var workInput = $('input[name="work"]');    // 是否有工作的input
    var workInfo = $('.work_info');     // 工作信息模块
    workInput.on("change", function () {
        var _this = $(this);
        var v = $.trim(_this.val());
        if (v == 1) {
            workInfo.show();
        } else if (v == 2) {
            workInfo.hide();
        }
    });
}

// 校验必填项是否填写完整
function verifyEmpty () {
    var isAleary = true;
    var inputs = $('input.required');
    var select = $('form[role="saveForm"] select');
    inputs.each(function () {
        var _this = $(this);
        var v = $.trim(_this.val());
        if (!v) {
            isAleary = false;
            _this.css({
                'border-color' : 'rgb(251, 39, 65)'
            });
            // return false;
        }
    });

    select.each(function () {
        var _this = $(this);
        var selected = _this.find('option:selected');
        var v = $.trim(selected.val());
        if (!v & v != '0') {
            isAleary = false;
            _this.css({
                'border-color' : 'rgb(251, 39, 65)'
            });
            // return false;
        }
    });

    return isAleary;
}


/**
 * 图片上传功能
 * @author Arley Joe 2017-11-2 11:44:28
 */
function uploadImage () {
    fileUpload({
        maxCount : 10,
        filesSize : 2,
        fileFormat : ['png', 'jpg', 'jpeg', 'svg', 'gif', 'bmp', 'raw', 'cdr'],
        needThumbnails : false,
        callback : function (btn) {
            onChoose(btn);
        }
    });
    // 上传逻辑
    var onChoose = function (btn) {
        var type = $.trim(btn.data('type'));
        var data = (btn.parents('.file_upload').find('.file_upload_btn')[0]).files[0];
        var fileExtension = data.name.substring(data.name.lastIndexOf('.'));    // 上传的文件的后缀名
        var fileCount = btn.parents('.img_md_box').find('.img_item').length;    // 该备案字段下现有图片总数
        var filingName = $.trim(btn.parents('.option_item').find('.options_name').text()).replace(/[*:：]/ig, '');   // 字段名称
        var fileName = filingName + '_' + (fileCount + 1) + fileExtension;
        var financeId = $.trim($('#financeId').val());
        var form = new FormData();
        form.append("file", data);
        form.append("file_type", type);
        form.append("finance_id", financeId);
        form.append("file_name", fileName);     // 用于后台重命名图片物理名字
        var url = contextPath + '';
        $.ajax({
            type : "post",
            url : url,
            data : form,
            async : false,
            timeout : 300000,
            processData: false,
            contentType: false,
            beforeSend : function () {
                //elem.loading.show();
                $('#loading').show();
                btn.removeClass('disabled');
                btn.parents('.img_md_box').find('.file_upload_btn').replaceWith('<input type="file" class="file_upload_btn" name="file"  value="上传图片" style="display: none" />');
            },
            complete : function () {
                $('#loading').hide();
            },
            success : function (res) {
                //elem.loading.hide();
                if (res.error_code == 0) {
                    $alert('图片上传成功');
                    var imgEle = '<a href="javascript:;" class="img_item head_photo" data-type="imgBox">' +
                        '             <img data-original="'+ res.image_url +'" src="'+ res.thumbnail +'" alt="'+ fileName +'"/>\n' +
                        '             <div class="img_md_operate_box">\n' +
                        '             <em class="img_md_operate_btn view" data-url="'+ res.image_url +'" style="margin-right: 0" title="查看"></em>\n'+
                        '             <em class="img_md_operate_btn delete" data-id="'+ res.file_id +'" title="删除"></em>' +
                        '             </div>\n' +
                        '             </a>';
                    if (type == '99') {
                        btn.parents('.img_md_box').find('.head_photo').replaceWith(imgEle);
                        $('#image_url').val(res.image_url);
                        var parents = btn.parents('.img_md_box');
                        parents[0].viewer.destroy();
                        viewLargeImage(parents[0]);
                        /*var viewer = new Viewer(parents[0], {
                            url: 'data-original',
                            interval : 2000,
                            loop : true
                        });*/
                    } else {
                        btn.before(imgEle);
                        /* 赋予新图片查看的实例属性 */
                        var parents = btn.parents('.img_md_box');
                        /*var count = parents.find('img').length;
                        var newImgEle = parents.find('img').eq(count - 1)[0];
                        parents[0].viewer.images.push(newImgEle);*/
                        // 销毁父元素
                        parents[0].viewer.destroy();
                        viewLargeImage(parents[0]);
                        /*var viewer = new Viewer(parents[0], {
                            url: 'data-original',
                            interval : 2000,
                            loop : true
                        });*/
                    }
                } else {
                    $alert('图片上传失败，请重试');
                }
            },
            error : function () {
                $alert('图片上传失败，请重试');
            }
        });
    }
}

/**
 * 删除图片
 * @author Arley Joe 2017-11-2 11:38:04
 */
function deleteImages () {
    var imagesParents = $('.docking_container');
    imagesParents.on('click', '.img_md_operate_box .delete', function (e) {
        var e = e || window.event;
        e.stopPropagation();
        e.preventDefault();
        var _this = $(this);
        var id  = $.trim(_this.data('id'));
        /*var ids = [];
        ids.push(id);
        ids = JSON.stringify(ids);*/
        redefineAjax({
            data : {
                file_ids : id
            },
            url : contextPath + '',
            success : function (res) {
                if (res.error_code == 0) {
                    $alert('图片删除成功', function () {
                        // 获取父元素
                        var parents = _this.parents('.img_md_box');
                        // 销毁父元素的viewer实例
                        parents[0].viewer.destroy();
                        _this.parents('.img_item').remove();
                        // 删除图片后从新实例化
                        /*var viewer = new Viewer(parents[0], {
                            url: 'data-original',
                            interval : 2000,
                            loop : true
                        });*/
                        viewLargeImage(parents[0]);
                    });
                } else {
                    $alert(res.error_msg);
                }
            },
            error : function () {
                $alert('图片删除异常，请稍后重试');
            }
        })
    })
}

/**
 * 查看图片跳转
 * @author Arley Joe 2017-11-2 11:33:18
 */
function viewImages () {
    var imagesParents = $('.merchants_edit');
    imagesParents.on('click', '.img_md_operate_box .view', function (e) {
        var e = e || window.event;
        e.stopPropagation();
        e.preventDefault();
        var _this = $(this);
        /*var url  = $.trim(_this.data('url'));
        window.open(url);*/
        var img = _this.parents('.img_md_operate_box').siblings('img');
        img.click();
    })
}




// 注册提交并继续事件
function bindSubmitEvent () {
    var btn = $('#saveAndGoNext');
    btn.off('click').on('click', function () {
        /*var t = $(this);
        var nextStep = $.trim(t.data('next'));
        var url = $.trim(t.data('url'));
        saveAndGoNext(t, nextStep, url);*/
        $toast('保存成功', function () {

        });
    });
}

// 提交逻辑
function saveAndGoNext (btn, nextPath, url) {
    var form = $('form[role="saveForm"]');
    var data = new FormData(form[0]);
    var verifyPass = verifyEmpty();
    if (verifyPass) {
        btn.off('click');
        redefineAjax({
            url : url,
            data : data,
            beforeSend : function () {
                $('#loading').show();
            },
            complete : function () {
                $('#loading').hide();
            },
            success : function (res) {
                if (res.error_code == 0) {
                    $toast('保存成功', function () {
                        locationTo({
                            action : nextPath
                        })
                    });
                } else {
                    $alert(res.error_msg);
                    bindSubmitEvent();
                }
            },
            error : function () {
                $alert('提交保存失败，请稍后重试。');
                bindSubmitEvent();
            }

        })
    } else {
        $alert('该页面还有资料未填写完整，请先补充完整再保存');
    }
}