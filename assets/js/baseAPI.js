//
$.ajaxPrefilter(function(options) {
    console.log(options.url);
    options.url = 'http://ajax.frontend.itheima.net' + options.url

<<<<<<< HEAD
    //统一为权限的接口 设置 headers 请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
=======
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    }
    //全局统一挂载 complete 回调函数
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
>>>>>>> index
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})