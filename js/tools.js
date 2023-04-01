//创建一个工具，专门用来将用户输入的东西中的标签转化为文本
function judgeStr(str) {
    var str = new String(str)
    if (str.replace(/(^\s*)|(\s*$)/g, "") == "") {
        return false
    }
    // console.log(str.replace(/</g, '&lt;').replace(/>/g, '&gt;'), str);
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // return str.replace(/(^\s*)|(\s*$)/g, "").replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
