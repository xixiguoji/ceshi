//
$.ajaxPrefilter(function(options) {
    console.log(options.url);
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    }
    //全局统一挂载 complete 回调函数
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})