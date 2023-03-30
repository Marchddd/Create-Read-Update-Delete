var mygod = document.querySelector("#mygod");
var tbody = document.querySelector('tbody');

//在add这一部分的内容
var add = document.querySelector('.add');
var oBtnEnsure = add.querySelectorAll('button')[0];
var oBtnReset = add.querySelectorAll('button')[1];
var orintegral = add.querySelector('[name="integral"]');
var orus = add.querySelector('[name="us"]');
var orsex = add.querySelector('[name="sex"]');
var orage = add.querySelector('[name="age"');

//在遮罩层这一部分的内容
var zhezhao = document.querySelector('.zhezhao');
var zhezhaomain = document.querySelector('.zhezhao_main');

var fmosex = zhezhao.querySelector('[name="sex"]');
var fmoage = zhezhao.querySelector('[name="age"]');
var fmointegral = zhezhao.querySelector('[name="integral"]');

var zhezhaoEnsure = zhezhao.querySelectorAll('button')[0];
var zhezhaoCancle = zhezhao.querySelectorAll('button')[1];

var pages = document.querySelector('.pages');
var back = pages.querySelector('.back');

var goole = document.querySelector(".goole");
var btnall = document.querySelector('.btnall');
var allTheNumber = document.querySelector('.allTheNumber');
var mycompany = document.querySelector('#mycompany');

var zhelastxiugai = document.querySelector('.zhelastxiugai');

var kuaiyaojieshu = document.querySelector('.kuaiyaojieshu');

var mashangjieshugepi = document.querySelector('.mashangjieshugepi');
var mashangjieshu = document.querySelector('.mashangjieshu');
//页面之间的跳转
mygod.onclick = function () {
    window.location.href = 'god.html'
}
mymoney.onclick = function () {
    window.location.href = 'order.html';
}
mycompany.onclick = function () {
    //跳转到指定页面
    window.location.href = 'index.html';
}

//删除，嘿嘿，学长说先不删除
// function delId(id) {
//     var con;
//     con = confirm("你确定要删除吗");
//     if (con == true) {
//         //如果确认删除的话，调用删除的接口
//         $.ajax({
//             type: "post",
//             url: "http://118.195.129.130:3000/users/del_users",
//             dataType: "JSON",
//             data: {

//                 _id: id,
//             },
//             success: function (result) {
//                 console.log("删除成功！");
//                 myFunction();
//                 // buttondel.parentNode.parentNode.innerHTML = null;
//             },
//             error: function (err) {
//                 console.log(err);
//             }

//         })

//     }
// }

//修改,如果想要修改信息，必须获取正确的id值和正确的us也是就是用户名字，弹窗应该有age和sex两个可以修改的地方

function xiugai(obj) {
    mashangjieshugepi.style.display = "block";
    mashangjieshu.style.display = "block";
    kuaiyaojieshu.style.display = "none";
    zhezhao.style.display = "block";
    fmoage.value = obj.age;
    fmosex.value = obj.sex;

    // console.log(fmoage.value);
    //所以，这个请求就应该是在点击确认按钮之后，才开始生效
    zhezhaoEnsure.onclick = function () {

        $.ajax({
            type: "post",
            url: "http://118.195.129.130:3000/users/update_users",
            dataType: "json",
            data: {
                //这里面传的应该是当前行所在的用户的的各种值，需要获取,注意，用户名和Id值都是不可以改变的           
                _id: obj._id,
                us: obj.us,
                age: fmoage.value,
                sex: fmosex.value
            },
            success: function (result) {

                alert("修改成功");
                //之后，关闭页面
                zhezhao.style.display = "none";
                //此时再调用一下子这个整个页面的信息
                getAllPagesfunction()
                getNowPageData(nowNum, size)
            },
            error: function (err) {
                console.log(err)
            }
        })
    }
    // 当取消按钮被点击之后，关闭遮罩层
    zhezhaoCancle.onclick = function () {
        zhezhao.style.display = "none";
    }
}



//添加积分，只是需要传入正确的us就可以了在这里，其实性别和年龄都是不能修改的，但是可以传递过去，最后修改的也只是一个积分而已
function addscore(obj) {

    zhezhao.style.display = "block";
    kuaiyaojieshu.style.display = "block";

    mashangjieshugepi.style.display = "none";
    mashangjieshu.style.display = "none";

    fmoage.value = obj.age;
    fmosex.value = obj.sex;
    fmointegral.value = obj.integral;

    zhezhaoEnsure.onclick = function () {
        $.ajax({
            type: "post",
            url: "http://118.195.129.130:3000/users/integral",
            dataType: "json",
            data: {
                us: obj.us,
                age: obj.age,
                sex: obj.sex,
                integral: fmointegral.value,
            },

            success: function (result) {
                console.log("我看到你了");
                zhezhao.style.display = "none";

                getAllPagesfunction()
                getNowPageData(nowNum, size)
            },
            //在这里再调用一下刚才封装好的函数
            error: function (err) {
                console.log(err)
            }
        })
    }

    // 当取消按钮被点击之后，关闭遮罩层
    zhezhaoCancle.onclick = function () {
        zhezhao.style.display = "none";
    }
}

//点击查询用户总数
btnall.onclick = function () {
    //当点击查询按钮的时候，发起查询请求，连接接口
    $.ajax({
        type: "get",
        url: ("http://118.195.129.130:3000/users/allpage_users"),
        data: {

        },
        success: function (result) {

            //之后，就是将返回的结果给记录下来传递给表单
            allTheNumber.value = result.pages;
            console.log(result);
        }
    })
}

//当点击重置按钮的时候进行的操作
oBtnReset.onclick = function () {
    //将表单里面所有的内容全部清空
    var reset;
    reset = confirm("你确定要重置吗？");
    if (reset == true) {
        orintegral.value = null;
        orus.value = null;
        orsex.value = null;
        orage.value = null;
    }
}
back.onclick = function () {

}


//分页器的功能
//获取接口传过来的数据的总数
//获取总数
getAllPagesfunction();

function getAllPagesfunction() {
    //调用接口
    $.ajax({
        url: "http://118.195.129.130:3000/users/allpage_users",
        data: {

        },
        type: 'GET',
        success: function (data) {
            allNum = data.pages;

            localStorage.setItem('totalNum', data.pages)
            var page = Math.ceil(localStorage.getItem('totalNum') / size)
            allPage.innerHTML = page;
            nowPage.innerHTML = nowNum;
        }
    })
}


getNowPageData(1, 2)
//获取当前页的数据并且渲染
let nowNum = 1
let size = 2
function getNowPageData(nowNum, size) {
    $.ajax({
        url: "http://118.195.129.130:3000/users/getInfoByPage_users",
        type: "POST",
        data: {
            page: nowNum,
            per_page: size,
        },

        success: function (result) {//result是一个形参名，代表的是返回的数据
            tbody.innerHTML = null;
            console.log(result);
            var datas = result.data;
            for (var i = 0; i < datas.length; i++) {
                //创建tr行
                var tr = document.createElement('tr');
                tbody.appendChild(tr);
                //   tr.innerHTML = "<td>" + datas[i].page + "</td>" + "<td>" + datas[i].per_page + "</td>";

                var count = 0;
                for (var k in datas[i]) {
                    if (count != 3 && count != 5 && count != 8) {
                        //对于每一行里面的数,有几个内容创建几个单元格
                        var td = document.createElement('td');
                        //将对象里面的内容赋值给td
                        td.innerHTML = datas[i][k];
                        tr.appendChild(td);
                    }
                    count++;
                }
                //第三步，创建有删除和修改两项的单元格
                var td = document.createElement('td');
                td.innerHTML = ' <button>删除</button>' + "\t"
                    + ' <button onclick=xiugai(' + JSON.stringify(datas[i]) + ')>修改</button>' + "\t"
                    + '<button onclick=addscore(' + JSON.stringify(datas[i]) + ')>添加积分</button>'
                    ;
                tr.appendChild(td);

            }

        },
    })
}

//点击左按钮
left.onclick = function () {
    if (nowNum == 1) {
        nowNum = Math.ceil(localStorage.getItem('totalNum') / size) + 1;
    }
    nowNum--;
    // setNowPage();
    getAllPagesfunction()
    getNowPageData(nowNum, size)

}
//点击右按钮
right.onclick = function () {
    if (nowNum == Math.ceil(localStorage.getItem('totalNum') / size)) {
        nowNum = 0;
    }
    nowNum++;
    // setNowPage();
    getAllPagesfunction()
    getNowPageData(nowNum, size)
}

//设置点击退出登录的时候，进行的操作