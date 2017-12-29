/**
 * Created by Arley Joe 2017-12-29 14:52:47
 */

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

//只允许输入数字或者输入两位小数
function checkNum (ele) {
    ele.on("keyup input", function () {
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
                $(".is_return_msg").hide().text("");
            } else {
                _this.val("");
                $(".is_return_msg").show().text("只允许输入数字或两位小数");
            }
        }
        if (val > 9999999.99) {
            $(".is_return_msg").show().text("最大可输入数值为9999999.99.");
        } else {
            $(".is_return_msg").hide().text("");
        }
    });
}
