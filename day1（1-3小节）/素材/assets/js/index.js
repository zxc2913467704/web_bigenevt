$(function(){


     getUserinfo()


     function  renderAvatar(user){
          console.log(user)
          var name = user.data.nickname || user.data.username
          $('#welcome').html("欢迎&nbsp;&nbsp;" + name)
           
          if (user.data.user_pic !== null){
               // 渲染图片头像
                $('.layui-nav-img').attr("src",user.data.user_pic).show
                $("text-avatar").hide()
          }
          else{
               // 渲染文本头像
               var first = name[0].toUpperCase()
               $('.layui-nav-img').hide()
               $("text-avatar").html(first).show()

          }


         }






     function getUserinfo(){
          $.ajax({
             method:"GET",
             url:"/my/userinfo",
             headers:{
               Authorization :window.localStorage.getItem('token')
             },
             success:function(res){
                  if(res.status !==0){
                       console.log(res)
                       return layer.msg("获取用户信息失败")
                       
                  }
                  console.log(res)
                  renderAvatar(res )
             },

          //    响应成功或者失败都需要执行completa函数
          //    complete:function(res){
          //        console.log("ok")
          //        if(res.responseJSON.status === 1 || res.responseJSON.message =="身份认证失败！"){
          //           window.localStorage.removeItem('token');
          //           //跳转后台主页
          //           location.href="/day1（1-3小节）/素材/login.html"
          //        }
          //    }
          })
 
     }


     var layer = layui.layer

    $("#btnlogout").on('click',function(){

     layer.confirm('确定退出登录', {icon: 3, title:'提示'}, function(index){
          //do something
          console.log("ok")
          window.localStorage.removeItem('token');
          //跳转后台主页
          location.href="/day1（1-3小节）/素材/login.html"
          layer.close(index);
        });


    })

     

  


})