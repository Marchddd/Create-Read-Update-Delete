// 首先要判断的事件是表单失去焦点onblur'
// 如果输入正确的则提示正确的信息，颜色是绿色的小图标变化
// 如果输入的不是6到16位，则采取className修改样式
// 因为修改的样式比较多，所以使用classNAME来修改样式

var inputname = document.querySelector('.name');
var password = document.querySelector(".password");
var nameerror = document.querySelector('.name_error');
var passworderror = document.querySelector('.password_error');
var remember = document.querySelector('#remember');
var password = document.querySelector('.password');

var passworderror1 = document.querySelector('.password_error1');
var iconfont = document.querySelectorAll('.iconfont');
var nameerror1 = document.querySelector('.name_error1');
var regester = document.querySelector('.regester');
var enroll = document.querySelector('.enroll');

var zhucecancle = document.querySelector('.zhuce_cancle')

var flag_name = false;
var flag_password = false;
var zhuce = document.querySelector('.zhuce');

var zhucename = document.querySelector('#zhucename');
var ps = document.querySelector('#ps');
var mail = document.querySelector('#mail');
var code = document.querySelector('#code');
var zhucecomplete = document.querySelector(".zhuce_complete");
var judgeemail = document.querySelector('.judgeemail');
var getcode = document.querySelector('.getcode');

//失去焦点事件
mail.onblur = function () {
    //根据表单里面值的长度，inputname.value.length,这个是用来设置样式
    //在这里可以使用一个当输入的格式错误的时候，将表单里面的内容制空
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

    if (reg.test(mail.value)) {
        judgeemail.style.opacity = 0;
        flag_name = true;
    } else {
        judgeemail.style.opacity = 1;
        flag_name = false;

    }
}


console.log(getcode);
getcode.onclick = function () {
    var time = 59;
    if (flag_name == true) {
        var timer = setInterval(function () {
            getcode.disabled = true;
            //判断剩余秒数
            if (time == 0) {
                clearInterval(timer);
                getcode.disabled = false;
                getcode.innerHTML = "重新获取验证码";
            } else {
                getcode.innerHTML = "还剩下" + time + '秒';
                time--;
            }
        }, 1000)
    }
}

// password.onblur = function () {
//     //根据表单里面值的长度，inputname.value.length,这个是用来设置样式
//     //在这里可以使用一个当输入的格式错误的时候，将表单里面的内容制空
//     var str = this.value;
//     // var reg = /^[0-9]$/;
//     if (this.value.length != 6) {
//         console.log("错误");
//         iconfont[1].className = "wrong iconfont";
//         iconfont[1].innerHTML = "&#xe630;"
//         passworderror1.className = 'wrong password_error1';//这里面没有添加原来的属性，稍后再弄
//         passworderror1.innerHTML = "您输入的格式不对";
//     } else {
//         console.log("正确");
//         // window.location.href = 'index.html';
//         iconfont[1].className = "right iconfont";
//         iconfont[1].innerHTML = "&#xec6b;"
//         passworderror1.className = 'right  name_error1';//这里面没有添加原来的属性，稍后再弄
//         passworderror1.innerHTML = "输入正确";
//         flag_password = true;
//     }
// }


//记住用户名的事件
if (localStorage.getItem('inputname') && localStorage.getItem('password')) {
    //如果有数据，就将数据提交给文本框
    inputname.value = localStorage.getItem('inputname');
    password.value = localStorage.getItem('password');
    remember.checked = true;
}

remember.addEventListener('change', function () {
    if (this.checked) {
        localStorage.setItem('inputname', inputname.value);
        localStorage.setItem('password', password.value);
    } else {
        localStorage.removeItem('inputname');
        localStorage.removeItem('password');
    }
})


regester.onclick = function () {
    $.ajax({
        type: 'POST',
        url: 'http://118.195.129.130:3000/user/login',
        data: {
            us: inputname.value,
            ps: password.value
        },
        success: function (result) {
            console.log(result, 'result');

            //window.location.href = 'index.html';
            //在这里添加一个判断条件，如果用户输入的用户名和密码是正确的，就可以跳转到另一个页面
            //跳转到另一个页面的同时，将id存储在LocalStorage当中
            if (result.err == 0) {
                // window.location.href = 'index.html';
                var datas = result.data;//没有存进去？

                console.log(datas);
                console.log(typeof datas);
                localStorage.setItem('id', datas[0]._id);
                location.replace('index.html');

            } else {
                alert("账户不存在或者是密码错误,请重新输入");
            }

        },
        error: function (err) {
            //如果失败

            console.log(err);
        }
    })

}
enroll.onclick = function () {
    //当点击注册的时候，开启注册事件
    zhuce.style.display = "block";
    //当点击完成注册的时候，调用接口
    zhucecomplete.onclick = function () {
        $.ajax({
            type: "post",
            url: "http://118.195.129.130:3000/user/reg",
            data: {
                us: zhucename.value,
                ps: ps.value,
                mail: mail.value,
                code: code.value,
            },
            success: function (result) {
                if (result.err == 0) {
                    alert("注册成功");
                    zhuce.style.display = "none";
                } else if (result.err == -1) {
                    alert("注册失败");
                }

            }
        })
    }
















    zhucecancle.onclick = function () {
        zhuce.style.display = "none";
    }
}
//睁眼闭眼效果切换
var flag = 0;
eye.onclick = function () {
    if (flag == 0) {
        password.type = 'text';
        eye.src = 'img/眼睛.png';
        flag = 1;
    } else {
        password.type = 'password';
        eye.src = 'img/闭眼睛.png';
        flag = 0;
    }
}
