$(function() {
    getUserInfo()

    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' },
            function(index) {
                //1清空本地存储中的 token
                localStorage.removeItem('token')
                    //2重新跳转到登录页面
                location.href = '/login.html'
                    // 关闭 confirm 询问框
                layer.close(index)
            })
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        Headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        },
        //不论成功还是失败,最终都会调用 complete 回调函数
        complete: function(res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                //1前置清空 token
                console.log(res);
                localStorage.removeItem('token')
                    //2强制跳转登录界面
                location.href = '/login.html'
            }
        }
    })
}

function renderAvatar(user) {
    // debugger
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avater').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        console.log(first)
        $('.text-avatar').html(first).show()
            // debugger;
    }
}