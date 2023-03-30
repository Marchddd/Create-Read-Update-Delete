var tbody = document.querySelector('tbody');
var add = document.querySelector('.add');
//确定按钮
var oBtnEnsure = add.querySelectorAll('button')[0];
//重置按钮
var oBtnReset = add.querySelectorAll('button')[1];


var oIptid = add.querySelector('[name="id"]');
var oIptname = add.querySelector('[name="name"]');
// console.log("下面是你想要的");
// console.log(oIptname);
var oIptprice = add.querySelector('[name="price"]');
var oIptdesc = add.querySelector('[name="desc"]');

var oIpttype = add.querySelector('[name="type"]');
var oIptdetail = add.querySelector('[name="detail"]');
var oIptv = add.querySelector('[name="v"]');

var goole = document.querySelector(".goole");

var zhezhaomain = document.querySelector('.zhezhao_main');
var zhezhao = document.querySelector('.zhezhao');

var fmoIptnumbering = zhezhaomain.querySelector('[name="numbering"]');
var fmoIptname = zhezhaomain.querySelector('[name="name"]');
var fmoIptprice = zhezhaomain.querySelector('[name="price"]');
var fmoIptdesc = zhezhaomain.querySelector('[name="desc"]');

var fmoIpttype = zhezhaomain.querySelector('[name="type"]');
var fmoIpttypeid = zhezhaomain.querySelector('[name="typeid"]');
var fmoIptid = zhezhaomain.querySelector('[name="id"]');

var zhezhaoEnsure = zhezhao.querySelectorAll('button')[0];
var zhezhaoCancle = zhezhao.querySelectorAll('button')[1];
var pages = document.querySelector('.pages');
var back = pages.querySelector('.back');
var btnall = document.querySelector('.btnall');
var allTheNumber = document.querySelector('.allTheNumber');
var mymoney = document.querySelector('#mymoney');
var zhelastxiugai = document.querySelector('.zhelastxiugai');
var wuhu = document.querySelectorAll('.wuhu');



//点击删除事件
function delId(id) {
    var con;
    con = confirm("你确定要删除吗");
    if (con == true) {
        //如果确认删除的话，调用删除的接口
        $.ajax({
            type: "post",
            url: "http://118.195.129.130:3000/food/del",
            dataType: "JSON",
            data: {

                _id: id,
            },
            success: function (result) {
                console.log("删除成功！");
                // setNowPage();
                AllTheNumber();
                getAllPagesfunction()
                getNowPageData(nowNum, size)
                // buttondel.parentNode.parentNode.innerHTML = null;
            },
            error: function (err) {
                console.log(err);
            }

        })

    }
}

//点击修改事件,没有问题

function xiugai(obj) {
    // console.log("下面是你想要的");
    // console.log(obj);
    zhezhao.style.display = "block";


    //我是想要把初始值放进去的，然后但是如果修改了怎么办？
    fmoIptname.value = obj.name;
    console.log(obj.oIptname);
    fmoIptprice.value = obj.price;
    fmoIptdesc.value = obj.desc;
    fmoIpttype.value = obj.typename;
    fmoIpttypeid.value = obj.typeid;
    fmoIptid.value = obj._id;
    //所以，这个请求就应该是在点击确认按钮之后，才开始生效
    zhezhaoEnsure.onclick = function () {
        //当确认按钮被点击之后，可以判断一下文本框的格式是否正确
        if (fmoIptname.value == "") {
            alert("菜品框中没有输入内容");
            return;
        }
        if (fmoIptprice.value == "") {
            alert("价格框中没有输入内容");

            return;
        } else {
            let str1 = "" + fmoIptprice.value;
            let reg = /^[0-9]*$/;
            if (!reg.test(str1)) {
                alert("请在价格框中输入纯数字");
                return;
            }
        }
        if (fmoIptdesc.value == "") {
            alert("描述框中没有输入内容");
            return;
        }
        if (fmoIpttype.value == "") {
            alert("描述框中没有输入内容");
            return;
        }
        if (fmoIpttypeid.value == "") {
            alert("0:面,1:米 2:饮品,3:水果 框内没有输入内容");
        } else {
            let str1 = "" + fmoIpttypeid.value;
            console.log(str1);
            let reg = /^[0-3]*$/;
            if (!reg.test(str1)) {
                alert("请在有数字对应类型的框中输入正确的数字");
                return;
            }
        }

        $.ajax({
            type: "post",
            url: "http://118.195.129.130:3000/food/update",
            dataType: "json",
            data: {
                //这里面传的应该是当前行所在的用户的的各种值，需要获取
                name: fmoIptname.value,
                price: fmoIptprice.value,
                desc: fmoIptdesc.value,
                typename: fmoIpttype.value,
                typeid: fmoIpttypeid.value,
                _id: fmoIptid.value,
            },
            success: function (result) {
                //要修改对应行里面里面的内容，这里打印一下返回回来的数据
                //这里，只要输入对应行的Id值，就能够修改成功，但是用户一般情况下是不能接触到这个id值的，所以，我们希望
                //通过获取当前所在的行数来获取这个id值，不对，应该是给每一个数据添加一个特定的属性，但是却不是Id值，可以是
                //添加所对应的时间，就可以是name
                // console.log(result);
                //console.log("修改接口调用成功");            
                alert("修改成功");
                //之后，关闭页面
                zhezhao.style.display = "none";
                //此时再调用一下子这个整个页面的信息
                // setNowPage();
                getAllPagesfunction()
                getNowPageData(nowNum, size)
            }

        })
    }
    // 当取消按钮被点击之后，关闭遮罩层
    zhezhaoCancle.onclick = function () {
        zhezhao.style.display = "none";
    }

}


//当点击添加按钮的时候
oBtnEnsure.onclick = function () {

    //在这里判断文本框中是否有内容，如果没有内容，可以直接跳出弹框说明哪一个框内没有内容
    //同时判断框内的内容是否符合格式

    if (oIptname.value == "") {
        alert("菜品框中没有输入内容");
        return;
    }
    if (oIptprice.value == "") {
        alert("价格框中没有输入内容");

        return;
    } else {
        let str1 = "" + oIptprice.value;
        let reg = /^[0-9]*$/;
        if (!reg.test(str1)) {
            alert("请在价格框中输入纯数字");
            return;
        }
    }
    if (oIptdesc.value == "") {
        alert("描述框中没有输入内容");
        return;
    }
    if (oIpttype.value == "") {
        alert("描述框中没有输入内容");
        return;
    }
    if (oIptdetail.value == "") {
        alert("0:面,1:米 2:饮品,3:水果 框内没有输入内容");
    } else {
        let str1 = "" + oIptdetail.value;
        console.log(str1);
        let reg = /^[0-3]*$/;
        if (!reg.test(str1)) {
            alert("请在有数字对应类型的框中输入正确的数字");
            return;
        }
    }


    $.ajax({
        type: "post",
        url: "http://118.195.129.130:3000/food/add",
        dataType: "json",

        data: {
            name: oIptname.value,
            price: oIptprice.value,
            desc: oIptdesc.value,
            typename: oIpttype.value,
            typeid: oIptdetail.value,
        },

        success: function (result) {
            console.log(result);
            var datas = result.datas;
            var tr = document.createElement('tr');
            tbody.appendChild(tr);

            for (var j in datas) {
                var td = document.createElement('td');

                td.innerHTML = datas[j];
                tr.appendChild(td);
            }

            // setNowPage();
            AllTheNumber();
            getAllPagesfunction()
                ; getNowPageData(nowNum, size)
        },
        //在这里再调用一下刚才封装好的函数

    })
}


//当点击重置按钮的时候，执行的操作，没有bug
oBtnReset.onclick = function () {
    //将表单里面所有的内容全部清空
    var reset;
    reset = confirm("你确定要重置吗？");
    if (reset == true) {
        // oIptnumbering.value = null;
        oIptname.value = null;
        oIptprice.value = null;
        oIptdesc.value = null;
        oIpttype.value = null;
        oIptdetail.value = null;
        oIptid.value = null;
    }
}

//当点击搜索也就是查询按钮的时候，执行的操作
goole.onclick = function () {
    console.log("查询框被点击了");
    //添加一个判断条件，如果框里面的内容为空
    if (zhelastxiugai.value == '') {
        alert("请在查询框中输入内容");
        return;
    }

    $.ajax({
        type: "post",
        url: "http://118.195.129.130:3000/food/getInfoByKw",
        dataType: "JSON",

        data: {
            kw: zhelastxiugai.value,
        },

        //将参数传递过去之后，可以接收一下接口即将返回过来的参数,可是我有问题的是，如何知道数据返回来的类型呢，我又该如何将它
        //赋值到渲染到表单上呢？
        success: function (result) {
            console.log(result);
            //之后，将查询得到的结果给返回过来
            //也就是重新加载页面，加载页面之后能够拥有
            var datas = result.data;
            console.log(typeof datas);
            //之后将根据获取得到的结果来重新刷新页面
            console.log(datas instanceof Array);
            //这里，返回来的就是一个数组，如果是数组的话，接下来，就应该能够使得数组中的内容给打印出来
            tbody.innerHTML = null;
            for (var i = 0; i < datas.length; i++) {
                //创建tr行
                var tr = document.createElement('tr');
                tbody.appendChild(tr);
                //   tr.innerHTML = "<td>" + datas[i].page + "</td>" + "<td>" + datas[i].per_page + "</td>";
                var count = 0;
                for (var k in datas[i]) {
                    if (count != 0 && count != 6) {
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
                td.innerHTML = ' <button onclick=delId(' + JSON.stringify(datas[i]._id) + ')>删除</button>' + "\t"
                    + ' <button onclick=xiugai(' + JSON.stringify(datas[i]) + ')>修改</button>';
                tr.appendChild(td);

                var buttondel = td.querySelectorAll('button')[0];
                var buttonxiugai = td.querySelectorAll('button')[1];

            }
            console.log(datas);
            // myFunction();
            // back.onclick = function () {
            //     setNowPage();
            // }
        }
    })
}
//点击查询物品总量
AllTheNumber();

function AllTheNumber() {
    //当点击查询按钮的时候，发起查询请求，连接接口
    $.ajax({
        type: "get",
        url: ("http://118.195.129.130:3000/food/allpage"),
        data: {

        },
        success: function (result) {

            //之后，就是将返回的结果给记录下来传递给表单
            allTheNumber.value = result.pages;

        }
    })
}

mymoney.onclick = function () {
    window.location.href = 'order.html';
    // for (var i = 0; i < wuhu.length; i++) {
    //     wuhu[i].style.backgroundColor = "#e0edfe";
    // }
    // mymoney.style.backgroundColor = "#e1cced"

}

mygod.onclick = function () {
    window.location.href = 'god.html'
    mygod.className = " changeColor "
}

mycompany.onclick = function () {
    //跳转到指定页面
    window.location.href = 'index.html';

}

//分页器的功能
//获取接口传过来的数据的总数
//获取总数
getAllPagesfunction();

function getAllPagesfunction() {
    //调用接口
    $.ajax({
        url: "http://118.195.129.130:3000/food/allpage",
        data: {

        },
        type: 'GET',
        success: function (data) {
            allNum = data.pages;
            console.log("下面是你想要的数据");
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
        url: "http://118.195.129.130:3000/food/getInfoByPage",
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
                var count = 0;
                //   tr.innerHTML = "<td>" + datas[i].page + "</td>" + "<td>" + datas[i].per_page + "</td>";
                for (var k in datas[i]) {

                    if (count != 0 && count != 6) {
                        //对于每一行里面的数,有几个内容创建几个单元格
                        var td = document.createElement('td');
                        //将对象里面的内容赋值给td
                        td.innerHTML = datas[i][k];
                        if (count == 5) {
                            if (datas[i][k] == 0) {
                                td.innerHTML = "面";
                            } else if (datas[i][k] == 1) {
                                td.innerHTML = "米";
                            } else if (datas[i][k] == 2) {
                                td.innerHTML = "饮品";
                            } else if (datas[i][k] == 3) {
                                td.innerHTML = "水果";
                            }
                        }
                        tr.appendChild(td);
                    }

                    count++;
                }
                //第三步，创建有删除和修改两项的单元格
                var td = document.createElement('td');
                td.innerHTML = ' <button backgroundColor="#ffeded" color="red"  onclick=delId(' + JSON.stringify(datas[i]._id) + ')>删除</button>' + "\t"
                    + ' <button onclick=xiugai(' + JSON.stringify(datas[i]) + ')>修改</button>';
                tr.appendChild(td);

                var buttondel = td.querySelectorAll('button')[0];
                buttondel.className = "tableDelete";
                var buttonxiugai = td.querySelectorAll('button')[1];
                buttonxiugai.className = "tableXiugai";

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



