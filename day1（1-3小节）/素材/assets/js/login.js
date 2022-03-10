$(function(){

    // 点击注册账号
    $('#link_reg').on('click',function(){
        $(".form1").hide()
        $(".form2").show()
        $('.login-box').hide()
        $('.reg-box').show()

    })

    $('#link_login').on('click',function(){
        $(".form2").hide()
        $(".form1").show()
        $('.login-box').show()
        $('.reg-box').hide()

    })

    
  //从layui中获取form对象
    var form =layui.form
// 提示框
    var layer =layui.layer

    //自定义规则
    form.verify({

        pwd:[/^[\S]{6,12}$/,'密码表现为6-12不能包含空格'],
    

        repwd: function(value){
            var pwd = $("#repass").val()
            if(pwd !== value ){
                return '密码不一致'
            }
        }
    })

    //  监听注册表单事件
    $('#form_reg').on('submit',function(e){
        //阻止默认提交行为
       e.preventDefault()
       $.post('/api/reguser',{username: $('#inputusername').val()  ,password:$('#repass').val()},
       function(res){
           console.log($('#inputusername').val() + $('#repass').val())
           if (res.status !== 0){
               return layer.msg( res.message );
           }
           
           layer.msg('注册成功');
        //模拟点击，自动跳转
        $('#link_login').click()
        })

    }) 
    
    


    //监听登录表单事件
    $('#form_login').submit( function(e){
        var that = $(this);
        e.preventDefault()
        $.ajax({
            url:"/api/login",
            method:"POST",
            //快速获取表单中的数据
            data: {
               username: $('#inputname1').val(),
                password:$('#repass1').val()

            } ,        
            success: function(res){
                console.log( that.serialize())
               
                if(res.status !== 0){
                    return layer.msg( "登录失败" )
                }
                layer.msg( "登录成功" )
                window.localStorage.setItem('token',res.token);
            //跳转后台主页
            
            location.href="/day1（1-3小节）/素材/index.html"
            }

        })


    })




})  