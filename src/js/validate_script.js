/*валидация формы*/
function validate(form, options){
    var setings = {
        errorFunction:null,
        submitFunction:null,
        highlightFunction:null,
        unhighlightFunction:null
    }
    $.extend(setings, options);

    var $form = $(form);

    if ($form.length && $form.attr('novalidate') === undefined) {
        $form.on('submit', function(e) {
            e.preventDefault();
        });

        $form.validate({
            errorClass : 'errorText',
            focusCleanup : false,
            focusInvalid : false,
            invalidHandler: function(event, validator) {
                if(typeof(setings.errorFunction) === 'function'){
                    setings.errorFunction(form);
                }
            },
            errorPlacement: function(error, element) {
                error.appendTo( element.closest('.form_input'));
            },
            highlight: function(element, errorClass, validClass) {
                console.log($(element)+'  '+errorClass+'  '+validClass+' go');
                $(element).addClass('error');
                $(element).closest('.form_row').addClass('error').removeClass('valid');
                if( typeof(setings.highlightFunction) === 'function' ) {
                    setings.highlightFunction(form);
                }
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass('error');
                if($(element).closest('.form_row').is('.error')){
                    $(element).closest('.form_row').removeClass('error').addClass('valid');
                }

                if( typeof(setings.unhighlightFunction) === 'function' ) {
                    setings.unhighlightFunction(form);
                }

            },
            submitHandler: function(form) {
                if( typeof(setings.submitFunction) === 'function' ) {
                    setings.submitFunction(form);
                } else {
                    //$form.submit();
                }
            }
        });

        $('[required]',$form).each(function(){
            $(this).rules( "add", {
                required: true,
                messages: {
                    required: "Вы пропустили"
                }
            });
        });

        if($('[type="email"]',$form).length) {
            $('[type="email"]',$form).rules( "add",
            {
                messages: {
                    email: "Невалидный email"
                 }
            });
        }

        if($('.tel-mask[required]',$form).length){
            $('.tel-mask[required]',$form).rules("add",
            {
                messages:{
                    required:"Введите номер мобильного телефона."
                }
            });
        }

        $('[type="password"]',$form).each(function(){
            if($(this).is("#re_password") == true){
                $(this).rules("add", {
                    minlength:3,
                    equalTo:"#password",
                    messages:{
                        equalTo:"Неверный пароль.",
                        minlength:"Недостаточно символов."
                    }
                });
            }
            else{
                $(this).rules("add", {
                    minlength:3,
                    messages:{
                        minlength:"Недостаточно символов.",
                        required:"Вы пропустили."
                    }
                });
            }
        })
    }
}

/*Отправка формы с вызовом попапа*/
function validationCall(form){

  var thisForm = $(form);
  var formSur = thisForm.serialize();

    $.ajax({
        url : thisForm.attr('action'),
        data: formSur,
        method:'POST',
        success : function(data){
            if ( data.trim() == 'true') {
                thisForm.trigger("reset");
                popNext();
            }
            else {
               thisForm.trigger('reset');
            }

        }
    });

    function popNext(){
        $.fancybox.open("#call_success",{
            padding:0,
            fitToView:false,
            wrapCSS:"call-popup",
            autoSize:true,
            afterClose: function(){
                $('form').trigger("reset");
                clearTimeout(timer);
            }
        });
        var timer = null;

        timer = setTimeout(function(){
            $('form').trigger("reset");
            $.fancybox.close("#call_success");
        },2000);


    }
}


function validationCallEmail(form){

  var thisForm = $(form);
  var formSur = thisForm.serialize();

    $.ajax({
        url : thisForm.attr('action'),
        data: formSur,
        method:'POST',
        success : function(data){
            if ( data.trim() == 'true') {
                thisForm.trigger("reset");
                popNextEmail();
            }
            else {
               thisForm.trigger('reset');
            }

        }
    });

    function popNextEmail(){
        $.fancybox.open("#call_success_email",{
            padding:0,
            fitToView:false,
            wrapCSS:"call-popup_success",
            autoSize:true,
            'closeBtn': false,
            'helpers': {
                    'overlay' : {'closeClick': false}
                }
        });
    }
}

function validationCallPass(form){

  var thisForm = $(form);
  var formSur = thisForm.serialize();

    $.ajax({
        url : thisForm.attr('action'),
        data: formSur,
        method:'POST',
        success : function(data){
            if ( data.trim() == 'true') {
                thisForm.trigger("reset");
                popNextPass();
            }
            else {
               thisForm.trigger('reset');
            }

        }
    });

    function popNextPass(){
        $.fancybox.open("#call_success_pass",{
            padding:0,
            fitToView:false,
            wrapCSS:"call-popup_success",
            autoSize:true,
            'closeBtn': false,
            'helpers': {
                    'overlay' : {'closeClick': false}
                }
        });
    }
}
function validationCallName(form){

  var thisForm = $(form);
  var formSur = thisForm.serialize();

    $.ajax({
        url : thisForm.attr('action'),
        data: formSur,
        method:'POST',
        success : function(data){
            if ( data.trim() == 'true') {
                thisForm.trigger("reset");
                popNextPass();
            }
            else {
               thisForm.trigger('reset');
            }

        }
    });

    function popNextPass(){
        $.fancybox.open("#call_success_name",{
            padding:0,
            fitToView:false,
            wrapCSS:"call-popup_success",
            autoSize:true,
            'closeBtn': false,
            'helpers': {
                    'overlay' : {'closeClick': false}
                }
        });
    }
}
function validationCallSurname(form){

  var thisForm = $(form);
  var formSur = thisForm.serialize();

    $.ajax({
        url : thisForm.attr('action'),
        data: formSur,
        method:'POST',
        success : function(data){
            if ( data.trim() == 'true') {
                thisForm.trigger("reset");
                popNextPass();
            }
            else {
               thisForm.trigger('reset');
            }

        }
    });

    function popNextPass(){
        $.fancybox.open("#call_success_surname",{
            padding:0,
            fitToView:false,
            wrapCSS:"call-popup_success",
            autoSize:true,
            'closeBtn': false,
            'helpers': {
                    'overlay' : {'closeClick': false}
                }
        });
    }
}

/*маска на инпуте*/
function Maskedinput(){
    if($('.tel-mask')){
        $('.tel-mask').mask('+9 (999) 999-99-99 ');
    }
}

/*fansybox на форме*/
function fancyboxForm(){
  $('.fancybox-form').fancybox({
    openEffect  : 'fade',
    closeEffect : 'fade',
    autoResize:true,
    wrapCSS:'fancybox-form',
    'closeBtn' : true,
    fitToView:true,
    padding:'0'
  })
}

function validationCallEntrance(form){

  var thisForm = $(form);
  var formSur = thisForm.serialize();

    $.ajax({
        url : thisForm.attr('action'),
        data: formSur,
        method:'POST',
        success : function(data){
            if ( data.trim() == 'true') {
               $('.wrong-pass').removeClass('showThis');
            }
            else {
                thisForm.trigger('reset');
                $('.wrong-pass').addClass('showThis');
            }

        }
    });
}
function validationCallRecovery(form){

  var thisForm = $(form);
  var formSur = thisForm.serialize();

    $.ajax({
        url : thisForm.attr('action'),
        data: formSur,
        method:'POST',
        success : function(data){
            if ( data.trim() == 'true') {
               $('.wrong-pass').removeClass('showThis');
               $("#new-pass-false").addClass('hideThis');
               $(".recover-form").addClass('hideThis');
               $("#new-pass-succes").removeClass('hideThis');
            }
            else {
                thisForm.trigger('reset');
                $('.wrong-pass').addClass('showThis');
                $("#new-pass-false").removeClass('hideThis');
               $("#new-pass-succes").addClass('hideThis');
               $(".recover-form").removeClass('hideThis');
            }

        }
    });
}
function validationCallREG(form){
  var thisForm = $(form);
  var formSur = thisForm.serialize();
    $.ajax({
        url : thisForm.attr('action'),
        data: formSur,
        method:'POST',
        success : function(data){

            if ( data.trim() == 'true') {
                thisForm.trigger("reset");
                $('.wrong-pass').removeClass('showThis');
            }
            else {
               thisForm.trigger('reset');

                $('.wrong-pass').addClass('showThis');
            }

        }
    });
}
$(document).ready(function(){
   validate('#call-popup .contact-form', {submitFunction:validationCall});
   validate('.contacts-form', {submitFunction:validationCall});



   validate('.name-change', {submitFunction:validationCallName});
   validate('.surname-change', {submitFunction:validationCallSurname});
   validate('.email-change', {submitFunction:validationCallEmail});
   validate('.pass-change', {submitFunction:validationCallPass});

   Maskedinput();
   fancyboxForm();

   validate('.header-form-top',{submitFunction:validationCallEntrance});
    validate('.recover-form', {submitFunction:validationCallRecovery});
    validate('.registration-form', {submitFunction:validationCallREG});

   validate('.header-form-bottom');

});