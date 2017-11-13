/**
 * Created by Arley on 2016/12/20.
 */

function workflowCreateAndEdit (createType, url, flowType) {
    var createDatas = {};
    var dialogType = 1;
    var characterClicked = null;
    var financeId = null;
    var principalList = $(".dialog_box .character_item");
    const principalCount = 6;
    principalList.each(function () {
        var character = $(this).text();
        if (character == '财务') {
            financeId = $(this).attr("lang");
        }
    });
    var elems = {
        dialog :  $(".dialog_box"),
        container : $(".add_principal_dialog"),
        win : $(window)
        //checkedInput : $(".list_box input")
    };
    //阻止body的滚动事件
    bindEvents("scroll", ".principal_list,.employee_list", function (e) {
        var e = e || window.event;
        e.stopPropagation();
        $(window).on("scroll", function () {
            return false;
        });
        return false;
    });
    //调出弹出层
    bindEvents("click", ".add_btn", function () {
        dialogType = 1;
        if(elems.dialog.is(":hidden")) {
            elems.dialog.show();
            setCharacterPosition();
            resetCharacterHeight();
        }
    });
    //计算弹出层位置
    function setCharacterPosition () {
        var winHeight = elems.win.height(),
                layerHeight = elems.container.height();
        elems.container.css({
            top : (winHeight - layerHeight)/2 - 50 + "px"
        });
    }
    //关闭弹出层
    function closeDialog () {
        elems.dialog.hide();
    }
    bindEvents("click", ".dialog_box .mask,.dialog_cancel" , function (e) {
        var e = e || window.event;
        e.stopPropagation();
        closeDialog();
    });
    /*左右两边的选中事件*/
    //左边的选中事件
    function characterClick (e) {
        var firstCharacter = $(".add_principal_dialog .character_item").eq(0);
        var t = $(e.target) || firstCharacter;
        (t[0] == document) && (t = firstCharacter);
        var characterLang = t.attr("lang");
        var employee = $(".employee_list");
        var employeeList = employee.find(".list_item");
        employeeList.hide();
        employeeList.each(function () {
            var _this = $(this);
            var employeeLang = _this.attr("lang");
            if (!!employeeLang && !!characterLang) {
                if (employeeLang == characterLang) {
                    _this.show();
                }
            }
        });
        resetCharacterHeight();
    }
    switcher(".add_principal_dialog .character_item", ".active", function (e) {
        characterClick(e);
    });
    //初始化选中第一个角色分类
    !function () {
        var firstCharacter = $(".add_principal_dialog .character_item").eq(0);
        firstCharacter.click();
    }();
    //右边人员的点击事件
    switcher(".add_principal_dialog .employee_item", ".active", function (e) {
        if (e.target.nodeName.toLowerCase() != 'li') {
            var t = $(e.target).parents(".employee_item");
        } else {
            var t = $(e.target);
        }

    });

    //重新计算角色列表的高度
    function resetCharacterHeight () {
        var characterBox = $(".principal_list");
        characterBox.css({
            height : ""
        });
        var principalH = $(".principal_list").height();
        var countH = $(".dialog_box .content").height();
        if (countH > principalH) {
            characterBox.css({
                height : countH
            });
        }
    }



    //弹出层确定按钮的点击事件
    bindEvents("click", ".dialog_confirm", function () {
        var emplogeeActive = elems.container.find(".employee_list .list_item.active");
        var priChecked = $.trim(elems.container.find(".principal_list .list_item.active").text()),
                employeeChecked = $.trim(emplogeeActive.find("span.employee_name").text()),
                employeeLang = emplogeeActive.find(".employee_name").attr("lang");

        if (!priChecked && !employeeChecked) {
            alert("您未选择任何角色及人员，请先选择");
            return;
        } else {
            if(!priChecked) {
                alert("您未选择任何角色");
                return;
            }
            if (!employeeChecked) {
                alert("您未选择角色下的负责人");
                return;
            }
        }
        var ele = '<div class="principal_item" lang="'+ employeeLang +'"><em class="close_icon"></em><span class="character"><span>'+ priChecked +'</span></span><span class="principal_name">'+ employeeChecked +'</span><div class="down_arrow"></div></div>';
        var t = $(".principal_opt .add_btn");

        var employeeId = emplogeeActive.find(".employee_name").attr("lang");
        //先判断是否存在
        var priOpt = $(".principal_opt .principal_item[lang='"+ employeeId +"']");
        if (priOpt.length == 0) {
            if (dialogType == 1) {
                t.before(ele);
                closeDialog();
            } else if (dialogType == 2) {
                closeDialog();
                characterClicked.attr("lang", employeeLang);
                characterClicked.find(".character span").text(priChecked);
                characterClicked.find(".principal_name").text(employeeChecked);
            }
        } else {
            alert("您已经选择过该负责人");
        }

        var responsibleArr = getChoosedCount();
        var respLen = responsibleArr.length;
        if (respLen >= principalCount) {
            $(".add_btn").hide();
        } else if (respLen < principalCount) {
            $(".add_btn").show();
        }
    });

    //负责人删除按钮事件
    $(".principal_opt").on("click", ".close_icon", function (e) {
        var e = e || window.event;
        e.stopPropagation();
        var t = $(this),
                parent = t.parents(".principal_item");
        var lang = parent.attr("lang");
        parent.remove();

        var responsibleArr = getChoosedCount();
        var respLen = responsibleArr.length;
        if (respLen < principalCount) {
            $(".add_btn").show();
        }
    });


    //更改负责人
    $(".principal_opt").on("click", ".character", function (e) {
        var e = e || window.event;
        e.stopPropagation();
        var t = $(this),
                parent = t.parents(".principal_item");
        var lang = parent.attr("lang");
        characterClicked = parent;//保存更改时的父级
        if (t.hasClass("character")) {
            if(elems.dialog.is(":hidden")) {
                elems.dialog.show();
                dialogType = 2;
                setCharacterPosition();

            }
        }

    });

    //输入框的监听
    !function () {
        var name = $("#create_workflow input[name='name']");
        var tipBox = $(".tips_info");
        name.off("focus").on("focus", function () {
            tipBox.show();
        }).off("blur").on("blur", function () {
            var val = $.trim($(this).val());
            if (!!val) {
                var len = val.gblen();
                if (len > 40) {
                    tipBox.text("(您输入的文字过多，最多20个字)");
                } else {
                    tipBox.hide();
                }
            } else {
                tipBox.text("(审批流名称不能为空)");
            }
        });
    }();

    //获取已选择负责人数
    function getChoosedCount () {
        var priOpt = $(".principal_opt .principal_item");
        var responsibleArr = [];
        priOpt.each(function () {
            var t = $(this);
            var lang = t.attr("lang");
            responsibleArr.push(lang);
        });

        return responsibleArr;
    }
    //表单验证
    function formValidata () {
        var form = $("#create_workflow");
        var name = form.find("input[name='name']");
        var applyToBusiness = form.find("input[name='applyto_business'][checked='checked']");
        var applyToCity = form.find("input[name='applyto_city'][checked='checked']");
        var riskType = form.find("input[name='risk_type'][checked='checked']");
        var isThrow = form.find("input[name='is_throw']:checked");
        var otherFunds = form.find("input[name='charge_type'][checked='checked']");

        /*var priOpt = $(".principal_opt .principal_item");
        var responsibleArr = [];
        priOpt.each(function () {
            var t = $(this);
            var lang = t.attr("lang");
            responsibleArr.push(lang);
        });*/
        var responsibleArr = getChoosedCount();
        form.find("input[name='responsible']").val(responsibleArr.join(','));
        var responsible = form.find("input[name='responsible']");

        if (!$.trim(name.val())) {
            $alert("请先填写审批流程名称");
            return false;
        }
        if (!applyToBusiness.val()) {
            $alert("请选择适用业务后再提交");
            return false;
        }
        if (!applyToCity.val()) {
            $alert("请选择适用城市后再提交");
            return false;
        }
        if (flowType == 1) {
            if (!riskType.val()) {
                $alert("请选择风险类型后再提交");
                return false;
            }
            if (!isThrow.val()) {
                $alert("请选择是否甩单后再提交");
                return false;
            }
        } else if (flowType == 2) {
            if (!otherFunds.val()) {
                $alert("请选择费用类型后再提交");
                return false;
            }
        }

        if (!responsible.val()) {
            $alert("请先添加负责人");
            return false;
        }

        if (responsibleArr.length < 2) {
            $alert("负责人必选选两个或两个以上");
            return false;
        }

        if (responsibleArr.length > principalCount) {
            $alert("您选择的负责人过多，最多选择" + principalCount + "个");
            return false;
        }

        /*var lastCharacter = responsibleArr[responsibleArr.length-1];
        var lastCharacterParent = $(".employee_name[lang='"+ lastCharacter +"']").parents(".employee_item").attr("lang");
        if (lastCharacterParent != financeId) {
             $alert("最后一个负责人必须为财务");
             return false;
        }*/

        var businessStr,cityStr,riskTypeStr,responsibleStr,chargeType,isThrowVal;
        businessStr = getVal(applyToBusiness).join(",");
        cityStr = getVal(applyToCity).join(",");
        riskTypeStr = (getVal(riskType) && getVal(riskType).length > 0) ? getVal(riskType).join(",") : '';
        isThrowVal = isThrow.val() || "";
        responsibleStr = responsibleArr.join(',');
        chargeType = (getVal(otherFunds)&& getVal(otherFunds).length > 0) ? getVal(otherFunds).join(",") : '';
        createDatas = {
            type : flowType,
            id : $.trim($("#workflow_id").val()),
            name : name.val().toString(),
            applyto_business : businessStr.toString(),
            applyto_city : cityStr.toString(),
            risk_type : riskTypeStr.toString(),
            is_throw : isThrowVal,
            responsible : responsibleStr,
            charge_type : chargeType
        };
        return true;
    }


    function getVal(target) {
        var valArr = [];
        if (!!target.length) {
            target.each(function () {
                var t = $(this);
                valArr.push(t.val());
            });
            return valArr;
        }

    }

    //页面底部确定按钮的事件绑定
    rebind(".create_confirm", "click", confirmEvent);


    //页面底部的取消按钮的点击事件
    bindEvents("click", ".create_cancel", function (e) {
        e.stopPropagation();
        //window.location.href = contextPath + "/workflow/list";
        /*locationTo({
            action : contextPath + '/workflow/list',
            param : {
                type : flowType
            }
        });*/
        window.history.back();
    });


    //页面底部确定按钮点击事件
    function confirmEvent () {
        disabled(".create_confirm", "click", confirmEvent, function () {
            $(".create_confirm").css({
                background: "#cccccc"
            });
        });
        var vali = formValidata();
        if (vali) {
            //Ajax逻辑
            $ajax("post", url, createDatas, function (res) {
                var datas = eval(res);
                if (datas.error_code == 0) {
                    if (createType == 0) {
                        $alert("审批流程创建成功", function () {
                            locationTo({
                                action : contextPath + '/workflow/list',
                                param : {
                                    type : flowType
                                }
                            })
                        });
                    } else if (createType == 1) {
                        $alert("审批流程更改成功", function () {
                            locationTo({
                                action : contextPath + '/workflow/list',
                                param : {
                                    type : flowType
                                }
                            })
                        });
                    }

                } else if (datas.error_code == 1021) {
                    var name = datas.name;
                    dialog("open", {
                        closeBtn : false,
                        "title" : "提醒",
                        "button" : ["继续修改","放弃创建"],
                        "content" : "您所编辑的内容已存在于'"+ name +"'审批流程中？",
                        "maskClose" : false,
                        onConfirm : function (d) {
                            rebind(".create_confirm", "click", confirmEvent, function () {
                                $(".create_confirm").css({
                                    background: "#1DC6BC"
                                });
                            });
                            d.close();
                        },
                        onCancel : function () {
                            // window.location.href = contextPath + "/workflow/list";
                            locationTo({
                                action : contextPath + '/workflow/list',
                                param : {
                                    type : flowType
                                }
                            })
                        }
                    });
                } else {
                    $alert(datas.error_msg);
                }
            }, function () {
                $alert('提交失败，请稍后重试');
            })
        } else {
            rebind(".create_confirm", "click", confirmEvent, function () {
                $(".create_confirm").css({
                    background: "#1DC6BC"
                });
            });
        }
    }
    function $alert (text, callback) {
        dialog("alert", {
            closeBtn : false,
            "title" : "网页提醒",
            "button" : ["确定",""],
            "content" : text,
            onConfirm : function (d) {
                rebind(".create_confirm", "click", confirmEvent, function () {
                    $(".create_confirm").css({
                        background: "#1DC6BC"
                    });
                });
                d.close();
                callback && callback();
            }
        });
    }
}

/*// 点击面包屑跳转回列表页
function goWorkflowList () {
    var btn = $('.goDetail')
    btn.off('click').on('click', function () {
        var _this = $(this);
        var type = $.trim(_this.data('type'));
        var cityId = $.trim(_this.data('city_id'));
        locationTo({
            action : contextPath + '/workflow/list',
            param : {
                type : type,
                city : cityId
            }
        })
    });
}*/

$(function() {

});