$(function(){
     var form =  layui.form
     initUserInfo()

     
     form.verify({
          nikename: function(value){
                if (value.length>6){
                    return "昵称长度必须在1-6个字符之间"
                }
          }

     })
     

     function initUserInfo(){
         $.ajax({
             method :"GET",
             url: "/my/userinfo ",
             success: function (res){
                 if(res.status !==0 ){
                 return  layer.msg("获取用户信息失败")
                 }
                 console.log("用户信息" )
                 console.log(res )
                 // 快速为表单赋值
                 
                form.val("formuserinfo",res.data  )
             }
         })
     }

$("#btnreset").on("click" ,function(e){
    //阻止默认重置行为
    e.preventDefault()
    initUserInfo()
    

})

$(".layui-form").on("submit",function(e){
    var that = $(this);
    //阻止默认提交行为
    e.preventDefault()
    // 发起ajax数据请求
    $.ajax({
        method:"POST",
        url:"/my/userinfo",
        data:$(that).serialize(),
        success:function(res){
            if(res.status !== 0){
                return  layer.msg("更新用户信息失败")
            }

          layer.msg("更新用户信息成功")
          console.log(1)
          //调用父页面的方法重新渲染用户头像和信息
          window.parent.getUserinfo() 

        }
    })

})


})