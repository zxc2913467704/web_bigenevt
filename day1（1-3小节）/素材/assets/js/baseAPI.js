//每次调用$.get,post,ajax的时候会先调用ajaxprefilter这个函数，在这个
//函数中，可以拿到我们给Ajax提供的配置对象


$.ajaxPrefilter(function(options){
       
     //在发起真正的Ajax请求之前，统一拼接请求根路径
     options.url = " http://www.liulongbin.top:3007" + options.url
     //统一为有权限的接口设置header请求头
     if (options.url.indexOf("/my/") !== -1){
          options.headers={
               Authorization :window.localStorage.getItem('token')
          }
     }


     // 全局挂载complte

     options.complete = function(res){
          console.log("ok")
          if(res.responseJSON.status === 1 || res.responseJSON.message =="身份认证失败！"){
             window.localStorage.removeItem('token');
             //跳转后台主页
             location.href="/day1（1-3小节）/素材/login.html"
          }
      }



})