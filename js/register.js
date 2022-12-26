// 注册功能模块
$(function(){
    //调用验证插件
    $('#registerForm').validate({
        //验证规则
        rules:{
            //用户名的验证
            username:{
                required:true,//非空
                rangelength:[3,6]//长度验证
            },
            //验证密码
            password:{
                required:true,//非空
                isPassword:true//自定义密码验证
        },
          //确认密码
          checkPassword:{
            required:true,//非空
            equalTo:'#password'//验证密码的一致性
        },
          //电话号码
        tel:{
            required: true,//非空
        isTel: true//自定义的电话号码验证
        }
        

        },
        //提示信息
        messages:{
            //用户名提示信息
            username:{
                required:'用户名不能为空',//非空提示
                rangelength:'长度在3-6位数之间'//长度验证提示
            },
            //验证密码提示
            password:{
                required:'密码不能为空',//非空
                isPassword:'亲!输入5-10个,以字母开头、可带数字、“_”、“.”的字符串哦!'
        },
        //确认密码提示信息
        checkPassword:{
            required:'请再次输入密码哦',//非空
            equalTo:"两次密码不一致"//验证密码的一致性
        },
           //电话号码提示信息
           tel:{
            required:'电话号码不能为空',//非空
        isTel: '电话号码格式不对'//自定义的电话号码验证
        }
        }
    })

   //密码自定义验证
   jQuery.validator.addMethod("isPassword" , function(value,element){
    var pwdReg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,9}$/;
    return this.optional(element) || (pwdReg.test(value));
});
   //手机号自定义验证
    jQuery.validator.addMethod("isTel", function(value,element){
    var telReg = /^[1]+[3,8,5,7]+\d{9}$/;
    return this.optional(element) || (telReg.test(value));
});

})