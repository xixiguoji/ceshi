$(function() {
    getUserInfo()
<<<<<<< HEAD
    $('#btnLogout').on('click', function() {
        //提示用户是否确认退出
        layer.Confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
        })
=======

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
>>>>>>> index
    })
})

//获取用户基本信息
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
                //调用 renderAvatar 渲染用户的头像
                renderAvatar(res.data)
            }
<<<<<<< HEAD
            //不论成功还是失败，最终都会调用complete 回调函数\
            // complete: function(res) {
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //         localStorage.removeItem('token')
            //         location.href = '/login.html'
            //     }) 
=======
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
>>>>>>> index
    })
}
//渲染用户的头像
function renderAvatar(user) {
    // debugger
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        console.log(first)
        $('.text-avatar').html(first).show()
            // debugger;
    }
}