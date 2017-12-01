<%@ page import="java.lang.reflect.Field"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="per" uri="com/mvc/web/common/tag/permissionTag"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    {{include ("./../inc/cssSources")}}
    <link rel="stylesheet" href="/static/dialog/dialog-layer.css">
    <link rel="stylesheet" href="/static/css/customerService.css">
    <link rel="stylesheet" href="/static/css/merchants.css">
    <title>备案管理</title>
</head>
<body>
<div id="wrapper" class="wrapper">
    <!-------- Part of header Begin -------->
    {{include ('./../inc/header')}}
    <!-------- Part of header End -------->

    <!-------- Part of main Begin -------->
    <div id="section" class="section normal_width">
        <!---- Part of slide nav Begin ---->
        {{include ('./../inc/sideNav')}}
        <!---- Part of slide na End ---->

        <!---- Part of Main info Begin ---->
        <div id="main" class="main merchant_materials">
            <div class="crumbs_nav">
                <span>
                    <a href="{{markUri}}/records/manager" class="crumbs_item">备案管理</a>
                    <a href="javascript:;" class="crumbs_item">配置备案图片信息</a>
                </span>
                <!-- 删除按钮 -->
                <div class="crumbs_btn rf">
                    <per:button code="1376">
                        <a href="javascript:" class="delete_filing">删除字段</a>
                    </per:button>
                </div>
            </div>
            <div class="material_store filing_setting">
                <div class="store_title filing_setting_title">备案配置</div>
                <div class="material_text lf">备案信息开关：</div>
                <div class="form_container material_detail lf">
                    <per:button code="1378">
                        <c:if test="${status == 1 }">
                            <div class="r_radio inline_block" type="on" data-status="1">
                                <span>ON</span>
                                <span>OFF</span>
                                <div style="left: 28px"></div>
                            </div>
                        </c:if>
                        <c:if test="${status == 0 }">
                            <div class="r_radio inline_block off" type="off"  data-status="0">
                                <span>ON</span>
                                <span>OFF</span>
                                <div></div>
                            </div>
                        </c:if>
                    </per:button>
                    <div class="toast_info">（开启：所有商户必须备案审核通过后才能正常请款；关闭：所有商户可不备案也能正常请款）</div>
                </div>
            </div>
            <div class="material_store filing_material">
                <div class="store_title filing_material_title">备案所需材料</div>
                <div class=" material_text lf">备案信息(图片)：</div>
                <div class="form_container material_detail lf" id="filingDesc">
                    <c:forEach items="${list}" var="bean">
                        <div class="form_group lf
                        <c:if test="${bean.status eq 2}">checked hisChecked</c:if>
                        " fid="${bean.id}">
                            <!-- 身份证/营业执照id：101/102 -->
                            <input id="filing_${bean.id}" type="checkbox" class="" name="" data-id="${bean.id}" value="${bean.status}"
                                   <c:if test="${bean.status eq 2}">checked="checked"</c:if>
                            />
                            <label class="nor_wrap <c:if test="${bean.status eq 2}">checked</c:if>" for="filing_${bean.id}">${bean.account_name}</label>
                        </div>
                    </c:forEach>
                </div>
                <div class="add_btn_box clearfix">
                    <per:button code="1376">
                        <a href="javascript:;" class="add_btn">新建</a>
                    </per:button>
                </div>
            </div>
            <div class="btn_box clearfix text_left">
                <per:button code="1376">
                    <a href="javascript:" class="btn orange_btn confirm update_confirm">保存更新</a>
                </per:button>
            </div>


        </div>
        <!---- Part of Main info End ---->
    </div>
</div>
</body>
{{include ('./../inc/jsSources')}}
<script src="/static/dialog/dialog-layer.js"></script>
<script>
    (function ($) {
        var materials = {
            old : [],
            new : [],
            delete : [],
            checked : [],
            unchecked : []
        };
        // 页面加载后立即获取备案信息字段
        !function () {
            var filings = $('#filingDesc .form_group label');
            filings.each(function () {
                var _this = $(this);
                var m = $.trim(_this.text());
                materials.old.push(m);
            });
        }();

        // 新建字段的弹出层
        function createField () {
            var btn = $('.add_btn_box .add_btn');
            btn.off('click').on('click', function () {
                dialog('open', {
                    title : '新建字段',
                    content : '<input type="text" name="" style="width: 230px;\n' +
                    '                height: 30px;\n' +
                    '                border: 1px solid #e4e4e4;\n' +
                    '                text-indent: .8em;" class="new_field" id="newField" placeholder="请输入字段名称 如：身份证照片" maxlength="20" />' +
                              '<div class="error_msg" style="height: 20px; line-height:20px;font-size: 12px;padding-left: 184px;" id="createErrorTips"></div>',
                    maskClose : false,
                    onConfirm : function (d) {
                        onCreate(d);
                    },
                    onCancel : function (d) {
                        d.close();

                    }
                });
            });

            var onCreate = function (d) {
                var newField = $.trim($('#newField').val());
                if (newField == '' || newField.length == 0) {
                    $('#createErrorTips').show().text('(字段名称不能为空)');
                } else {
                    if ($.inArray(newField, materials.old) != -1) {
                        $('#createErrorTips').show().text('(该字段名称已经存在)');
                    } else {
                        var timestamp = new Date().getTime();
                        var newFieldEle = '<div class="form_group lf new_f" fid="'+ timestamp +'">\n' +
                            '                        <input id="filing_'+ timestamp +'" type="checkbox" data-id="'+ timestamp +'" class="" name="" value="'+ timestamp +'" checked="checked" />\n' +
                            '                        <label class="nor_wrap checked" for="filing_'+ timestamp +'">'+ newField +'</label>\n' +
                            '                    </div>';
                        $('#filingDesc').append(newFieldEle);
                        materials.old.push(newField);
                        resetCheckboxAndRadio('checkbox', ".new_f.form_group label", ".checked"); // 为新创建的复选框进行事件绑定
                        d.close();
                    }
                }
            };

            // 新建字段的输入校验
            $(document).on('input', '#newField', function () {
                var _this = $(this);
                var val = $.trim(_this.val());
                if ($.inArray(val, materials.old) != -1) {
                    $('#createErrorTips').show().text('(该字段名称已经存在)');
                } else {
                    $('#createErrorTips').hide().text('');
                }
            });
        }

        // 备案配置
        function recordSetting (ele, opt) {
            var oldStatus = $.trim($('.r_radio').data('status'));
            if (oldStatus == 0) {
                var status = 1;
            } else {
                var status = 0;
            };
            redefineAjax({
                data : {
                    status : status
                },
                url : contextPath + '/api/records/isopen',
                success : function (res) {
                    if (res.error_code == 0) {
                        if (status == 0) {
                            $alert('商户备案信息已关闭');
                            $('.r_radio').data('status', 0);
                        } else {
                            $alert('商户备案信息已开启');
                            $('.r_radio').data('status', 1);
                        }
                    } else {
                        $alert(res.error_msg, function () {
                            opt.restore(ele);
                        });
                    }
                },
                error : function () {
                    $alert('备案信息设置失败，请重试', function () {
                        opt.restore(ele);
                    });
                }
            })
        }

        // 删除字段部分
        function deleteFiling () {
            var btn = $('.delete_filing');
            // 获取全部备案信息字段
            var getAllfilings = function () {
                var elem = $('#filingDesc .form_group').not(':hidden');
                var delStr = '<div class="form_container delete_container" style="width: 80%;margin: 20px auto; line-height: 30px;overflow: hidden;">';
                elem.each(function () {
                    var _this = $(this);
                    var filingKey = $.trim(_this.find('input[type="checkbox"]').data('id'));
                    var filingName = $.trim(_this.find('label').text());
                    // if (filingKey != '101' && filingKey != '102'){  // 屏蔽掉身份证和营业执照
                        delStr += '<div class="form_group nowrap lf" style="width: 110px;margin-right: 10px; font-size: 12px;text-align: left;">\n' +
                            '               <input id="filing_'+ filingKey +'" type="checkbox" class="" name="" value="'+ filingKey +'" />\n' +
                            '               <label class="nor_wrap" for="filing_'+ filingKey +'">'+ filingName +'</label>\n' +
                            '      </div>';
                    // }
                });
                delStr += '</div>';
                return delStr
            };

            btn.off('click').on('click', function () {
                var delHtml = getAllfilings();
                dialog('open', {
                    title : '选择要删除的字段',
                    content : delHtml,
                    maskClose : false,
                    onConfirm : function (d) {
                        deleteMaterials();
                        d.close();
                    },
                    onCancel : function (d) {
                        d.close();

                    }
                });

                resetCheckboxAndRadio('checkbox', ".delete_container .form_group label", ".checked"); // 为新创建的复选框进行事件绑定
            });

            // 删除备案字段逻辑
            var deleteMaterials = function (){
                var checkedInput = $('.delete_container input[checked="checked"]');
                var deleteFilings = [];
                checkedInput.each(function () {
                    var _this = $(this);
                    var _thisId = $.trim(_this.val());
                    var _thisName = $.trim(_this.siblings('label').text());
                    materials.old.remove(_thisName);    // 删除总量数据中的当前项
                    deleteFilings.push(_thisId);        // 留存删除字段的ID。
                });
                // 删除页面备案字段
                for (var i = 0, len = deleteFilings.length; i < len; i++) {
                    var oldFilingELm = $('#filingDesc').find('.form_group[fid="'+ deleteFilings[i] +'"]');
                    if (oldFilingELm.hasClass('new_f')){
                        oldFilingELm.remove();
                    } else {
                        oldFilingELm.hide().addClass('delete_f');
                    }
                }
            }

        }

        /**
         *  备案字段的选中状态切换逻辑
         *  1. 字段选中
         *  2. 字段取消选中
         */
        function checkedFilings () {
            $(document).on('click', '#filingDesc .form_group label', function () {
                var _this = $(this);
                var parentGroup = _this.parents('.form_group');
                if (!parentGroup.hasClass('new_f')) {
                    if (_this.hasClass('checked')) {
                        parentGroup.removeClass('uncheck').addClass('checked');
                    } else {
                        parentGroup.removeClass('checked').addClass('uncheck');
                    }
                }
            });
        }

        // 获取更新数据
        function getUpdateData () {
            // 获取删除数据
            var deleteElem = $('.delete_f');    // 删除的字段（含有‘delete_f’类）
            var newElem = $('.new_f');      // 新增的字段
            var checkElem = $('.form_group.checked').not('.hisChecked');    // 新选中的字段（历史选中数据含有‘hisChecked’类）
            var uncheckedElem = $('.form_group.hisChecked.uncheck');        // 取消选中的字段（此处为历史选中取消状态）
            deleteElem.each(function () {
                var _this = $(this);
                var id = $.trim(_this.attr('fid'));
                var o = {id : id};
                materials.delete.push(o);
            });
            newElem.each(function (){
                var _this = $(this);
                var name = $.trim(_this.find('label').text());
                var o = {name: name};   // 保存数据对象
                materials.new.push(o);
            });
            checkElem.each(function (){
                var _this = $(this);
                var id = $.trim(_this.attr('fid'));
                var o = {id : id};
                materials.checked.push(o);
            });
            uncheckedElem.each(function () {
                var _this = $(this);
                var id = $.trim(_this.attr('fid'));
                var o = {id : id};
                materials.unchecked.push(o);
            });
            var data = materials;
            return data;
        };

        // 提交更新数据
        function updateFilings () {
            var btn = $('.update_confirm');
            btn.off('click').on('click', function () {
                var _this = $(this);
                updateEvent(_this);
            });
        }
        // 提交更新数据逻辑
        function updateEvent (btn) {
            btn.off('click');
            var updataData = getUpdateData();
            redefineAjax({
                data : {
                    add : JSON.stringify(updataData.new),
                    delete : JSON.stringify(updataData.delete),
                    checked : JSON.stringify(updataData.checked),
                    unchecked : JSON.stringify(updataData.unchecked)
                },
                url : contextPath + '/api/records/vindicate',
                success : function (res) {
                    if (res.error_code == 0) {
                        $alert('保存成功', function () {
                            window.location.reload();
                        });
                    } else {
                        $alert(res.error_msg, function () {
                            btn.on('click');
                            window.location.reload();
                        });
                    }
                },
                error : function () {
                    $alert('保存失败，请重新尝试', function () {
                        btn.on('click');
                        window.location.reload();
                    });
                }
            })
        }

        $(function() {
            resetCheckboxAndRadio('checkbox', ".form_group label", ".checked");
            radioSwitch({
                on : function (_this, options) {
                    dialog('open', {
                        title : '提醒',
                        content : '<div style="padding: 20px 0 20px;line-height:30px;font-size: 14px;"><span>商户备案信息开启，所有商户必须备案后才可正常请款，</span><br><span>确认开启？</span></div>',
                        onConfirm : function (d) {
                            d.close();
                            recordSetting(_this, options);
                        },
                        onCancel : function (d) {
                            d.close();
                            options.restore(_this);
                        }
                    });
                },
                off : function (_this, options) {
                    dialog('open', {
                        title : '提醒',
                        content : '<div style="padding: 20px 0 20px;line-height:30px;font-size: 14px;"><span>商户备案信息关闭，所有商户不须备案即可正常请款，</span><br><span>确认关闭？</span></div>',
                        onConfirm : function (d) {
                            d.close();
                            recordSetting(_this, options);
                        },
                        onCancel : function (d) {
                            d.close();
                            options.restore(_this);
                        }
                    });
                }
            });
            createField();  // 新建字段
            deleteFiling();     // 删除字段
            checkedFilings();   // 原始备案字段的交互
            updateFilings();    // 保存更新数据
        });
    })(jQuery,undefined);
</script>
</html>