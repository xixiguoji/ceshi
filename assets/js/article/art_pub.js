$(function() {
    var layer = layui.layer
    var form = layui.form


    initCate()
    initEditor()

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败!')
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render(

                )
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')
        // 2. 裁剪选项
    var options = {
            aspectRatio: 400 / 280,
            preview: '.img-preview'
        }
        // 3. 初始化裁剪区域
    $image.cropper(options)

    //为选择封面的按钮 绑定点击事件处理函数
    $('#btnChooseImage').on('click', function() {
        $('#coverFile').click()
    })

    //监听 coverfile 的chenge事件 获取用户选择的文件
    $('#coverFile').on('change', function(e) {
        var files = e.target.files
        if (filse.length === 0) {
            return
        }
        var newImgURL = URL.createObjectURL(files[0])

        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    var art_state = '已发布'

    $("#btnSaves").on("click", function() {
        art_state = '草稿'
    })

    //为表单绑定submit 提交事件
    $('#form-pub').on('submit', function(e) {
        //1阻止表单的默认提交行为
        e.preventDefault()
            //2.基于 form表单 快速创建一个 FormData对象
        var fd = new FormData($(this)[0])
            //3,将文章的发布状态,存到fd中
        fd.append('state', art_state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作

                fd.append('cover_img', blob)
                publishArticle(fd)
            })
    })


    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败!')
                }
                layer.msg('发布文章成功')
                location.href = '/article/art_list.html'
            }
        })
    }
})