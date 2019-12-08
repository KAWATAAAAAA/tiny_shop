import $ from 'jquery'

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();				//显示 提示框
    $('[data-toggle="tooltip"]').mousemove(function () {	// 不是逻辑处理关键处 加入是为了更贴合用户体验

        $('.tooltip').addClass('show');
    });

    var $userAccountNum = $("#user-account-num");
    var $userPassword = $("#user-password");
    var $userPasswordConfirm = $("#userPassword_Confirm");

    /*keydown之后做判断是否给submit 放行*/

    var val_a = false;	//首先他们都是未通过
    var val_b = false;
    var val_b_confirm = false;
    var val_c = false;

    $userAccountNum.blur(function () {

        sendBeforeCheckTodoAjax($userAccountNum.val());
    });
    $userPasswordConfirm.keydown(function () {
        setTimeout(function () {
            var tipsMSG = "";
            if ($userPasswordConfirm.val() != $userPassword.val()) {
                val_b_confirm = false;
                tipsMSG = "两次输入不一致"
                showTips($userPasswordConfirm, val_b_confirm, tipsMSG);
            } else {
                val_b_confirm = true;
                showTips($userPasswordConfirm, val_b_confirm, tipsMSG);
            }
        }, 1000);

    });
    $userAccountNum.keydown(function () {

        setTimeout(function () {
            var value = $userAccountNum.val();
            var regExp = /(((^1){1}\d{10})|(^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$))/;	/*只可以是手机格式 或者 邮箱格式*/


            var tipsMSG = "";
            if (!value) {
                tipsMSG = "昵称不能为空"
                val_a = false;
                showTips($userAccountNum, val_a, tipsMSG);
            } else if (!regExp.test(value)) {
                val_a = false;
                tipsMSG = "输入不合法"
                showTips($userAccountNum, val_a, tipsMSG);
            } else
                val_a = true;
            showTips($userAccountNum, val_a, tipsMSG);
        }, 1000);


    });

    $userPassword.keydown(function () {

        setTimeout(function () {
            var value = $userPassword.val();
            var regExp = /^[^ ]{6,12}$/;	/*密码由6-12位数字、字母或特殊字符组成,不能包含空格*/

            var tipsMSG = "";
            if (!value) {
                tipsMSG = "密码不能为空"
                val_b = false;
                showTips($userPassword, val_b, tipsMSG);
            } else if (!regExp.test(value)) {
                val_b = false;
                tipsMSG = "输入不合法"
                showTips($userPassword, val_b, tipsMSG);
            } else
                val_b = true;
            showTips($userPassword, val_b, tipsMSG);

        }, 1000);

    });


    $("form").keydown(function (event) {

        console.log("按下的键，所对应的值：" + event.keyCode);
        $('.tooltip').removeClass('show'); /*输入的时候取消提示框*/
        if (event.keyCode == 13 && $('submit').attr('disabled') == 'disabled') {
            alert("yes");

        }

    });

    setInterval(function () {
        if (val_a && val_b) {
            console.log("All ready");
            $('#submit').removeAttr('disabled');
        } else {
            console.log("Not ready");
            $('#submit').attr('disabled', 'disabled');
        }
    }, 1000);

    /*小眼睛操作*/

    $('#eye').click(function () {

        var eye = $('#eye');
        var f = isEyeOpenClose();
        var seeType = $('#user-password');
        if (f) {
            console.log("睁眼 我就要移除睁开");
            eye.removeClass('eye');
            seeType.attr('type', 'password');
        } else {
            console.log("闭眼 我就要添加睁开");
            eye.addClass('eye');
            seeType.attr('type', 'text');
        }
    });

});

function showTips(elem, flag, msg) {

    if (flag) {
        elem.removeClass("failed");
        elem.addClass("passing");
        elem.parent().find(".input-ok").css("display", "block");
        elem.parent().find(".input-no").remove();
    } else {
        elem.removeClass("passing");
        elem.removeClass("failed");
        elem.addClass("failed");
        var isExist = elem.parent().find(".input-no");

        /*是否存在 错误提示框，有则改，无则造*/
        if (!(isExist.length > 0)) {
            var $tipsMSG = $('<div class="input-no">' + msg + '</div>');
            elem.parent().append($tipsMSG);
        } else {
            isExist.html(msg);
            console.log("None Error Tips");
        }
        elem.parent().find(".input-ok").css("display", "none");


        $('.tooltip').addClass('show'); //并且在输入有误后 show下输入提示
    }
}

function isEyeOpenClose() {
    console.log("眼睛是否睁开");

    var eyeOpenClassName = document.getElementsByClassName('eye')[0]; //用jq 获取的话 有数值就是jq的对象,无数值就是空
    console.log(eyeOpenClassName);
    if (eyeOpenClassName != undefined) //默认如果眼睛睁开存在
    {
        console.log("判断为睁开");
        return true;
    } else {
        console.log("判断为闭眼");
        return false;
    }
}
