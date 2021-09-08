$(function(){
    
    $('html').on('submit', 'form[name=validate_email]', function(e){
        e.preventDefault();
        $('.j_enter_email').find("button:contains(próximo)").text('')
        .append("<img src='images/loaders/loader2.gif'  style='width:25px;height:25px'><img/>");
        let form=$(this);
        let url = "source/controllers/controller.php";
        let user_email =  form.find("input[name='email']").val();

        $.post(url, {action:"validate_email",user_email: user_email}, function(response){
            
            if (response.validate_email !== true) {
                let animate = form.parents('div:eq(3)');
                animate.addClass('animate__animated animate__shakeX  animate__repeat-1').css('box-shadow','-2px 1px 5px 0px #ff0000ad');
                    animate.on('animationend',()=>{
                        animate.removeClass('animate__animated animate__shakeX  animate__repeat-1').css('box-shadow','none');
                        $('.j_enter_email').find("button:has('img')").html('próximo')
                    });
            }else{
              let interval = setTimeout(() => {
                   $('.j_enter_email').slideToggle().find("button:has('img')").html('próximo')
                   
                   $('.j_enter_password').slideToggle()
               .css('display','block').find(' span > img').attr('src', (response.user_photo)? response.user_photo :"images/default.png");
               $('.j_enter_password').find('h5 span').html(response.user_name)
               }, 2000);
            }
            console.log(response);
        },'json')
    });

    $('html').on('click','.j_login_with_other_account',function(e){
        e.preventDefault();
        $('.j_enter_password').slideToggle();
        $('.j_enter_email').slideToggle();

    })

    $('html').on('submit', 'form[name=validate_password]', function(e){
        e.preventDefault();
        $('.j_enter_password').find("button:contains(próximo)").text('')
        .append("<img src='images/loaders/loader2.gif'  style='width:25px;height:25px'><img/>");
        let form=$(this);
        let url = "source/controllers/controller.php";
        let user_password =  form.find("input[name='password']").val();
        
        $.post(url, {action:"validate_password",user_password: user_password}, function(response){
            
            if (response.validate_password !== true) {
                let animate = form.parents('div:eq(3)');
                animate.addClass('animate__animated animate__shakeX  animate__repeat-1').css('box-shadow','-2px 1px 5px 0px #ff0000ad');
                    animate.on('animationend',()=>{
                        animate.removeClass('animate__animated animate__shakeX  animate__repeat-1').css('box-shadow','none');
                        $('.j_enter_password').find("button:has('img')").html('próximo')
                    });
            }else{
                window.location= 'painel.php'; 
            }
        },'json')
    });
})























// let animate = form.parents('div:eq(3)');
            
// if (response.validate_email !== true) {
//     animate.addClass('animate__animated animate__shakeX  animate__repeat-1').css('box-shadow','-2px 1px 5px 0px #ff0000ad');
//     animate.on('animationend',()=>{
//         animate.removeClass('animate__animated animate__shakeX  animate__repeat-1').css('box-shadow','none');
//     });
// }else{
//     animate.addClass('animate__animated animate__bounceOutLeft');;
//    //console.log(animated);animate__backOutLeft,animate__bounceOutLeft
//     animate.on('animationend',()=>{
//         animate.removeClass('animate__animated animate__slideOutLeft').find('div:first').css('display','none');
//         $('.j_enter_password').css('display','block').find(' span > img').attr('src', response.user_photo);
//     });
// }