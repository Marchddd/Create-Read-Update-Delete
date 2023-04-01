//想要获取所有的Input框来设置框里面的状态
var input = document.getElementsByTagName('input');
//从而获取到所有的Input框
//对Input框里面的内容进行判断
for (var i = 0; i < input.length; i++) {
    input[i].innerHTML += judgeStr(input[i].value);
}

