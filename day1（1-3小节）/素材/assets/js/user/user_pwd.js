$ (function(){

    var form =layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,

        samepwd: function(value){
            if(value==$("[name = oldPwd]").val()){
                return "新旧密码不能相同"

            }

        },

        repwd: function(value){
            if(value!==$("[name =newPwd]").val()){
                    return "两次密码不一致"
            }
        }


   })

   $('.layui-form').on("submit",function(e){
       var that = $(this);
       e.preventDefault()
       $.ajax({
           method :"POST",
           url:"/my/updatepwd",
           data:  $(that).serialize(),
           success:function(res){
               if(res.status !== 0){
                   console.log("555")
                   console.log(res)
                   return layer.msg("更新失败")

               }
               layer.msg("更新成功")
               //reset函数可以使表单重置为没有填写的状态但是只可以通过原生的doM 对象使用不可以使用jquery对象使用所以需要进行转化
               $('.layui-form')[0].reset()

           }

           
       })

   })


   






})