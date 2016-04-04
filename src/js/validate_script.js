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
            rules: {
                order_email: {
                  require_from_group: [1, ".mygroup"]
                },
                order_phone: {
                  require_from_group: [1, ".mygroup"]
                },
            },
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

function validationCallChange(form){
  var thisForm = $(form);
  var formSur = thisForm.serialize();
    $.ajax({
        url : thisForm.attr('action'),
        data: formSur,
        method:'POST',
        success : function(data){
            if ( data.trim() == 'true') {
                thisForm.trigger("reset");
                var messageSucces = thisForm.find('.message-succes').html();
                $('#call_success_change').find('.row-name').html(messageSucces);
                popNext();
            }
            else {
               thisForm.trigger('reset');
            }

        }
    });
    function popNext(){
        $.fancybox.open("#call_success_change",{
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

//ajax func for programmer

function someAjax(item, someUrl, successFunc, someData){

    $(document).on('click', item, function(e){

        e.preventDefault();

        var itemObject = $(this);

        $.ajax({
            url:someUrl,
            data:someData,
            method:'POST',
            success : function(data){
                successFunc(data, itemObject);
            }
        });

    });

}

/* example for someAjax func

    write like this
    someAjax('.link', '/programer_item.php', someFuncName, {action:'someAction', item_id:id});

*/

// change button when item added to basket

function lucky_cats_AddToBasket(data, itemObject){
    if($('.basked-icon-value').length){
        $('.basked-icon-value span').html(data);
    }else{
       $('.busked-icon').prepend('<span class="basked-icon-value"><span>'+data+'</span></span>');
    }

    $('.add-to-busked-wrap').addClass('active');

}

//busked func
function buskedFunc(){

    //busked call popup
    $('.fancybox-basked').fancybox({
        fitToView:true,
        autoSize:true,
        padding:0,
        wrapCSS:'busked-wrapper-fancybox'
    });

    // open fancybox by clicking text if item added
    $(document).on('click','.in-busket-text', function(){

        $.fancybox.open('#busked',{
            fitToView:true,
            autoSize:true,
            padding:0,
            wrapCSS:'busked-wrapper-fancybox'
        });

    });

    // open busked order form
    $(document).on('click','.busked-buttons-right-wrap .button', function(){

       $.fancybox.open('#order-form',{
            fitToView:true,
            autoSize:true,
            padding:0,
            wrapCSS:'busked-order-fancybox',
            afterLoad:function(){
                $('html').addClass('fancybox-lock');
                if($('html').is('.desktop')){
                    $('html').addClass('fancybox-margin');
                }
            },
            afterClose:function(){
                $('html').removeClass('fancybox-lock fancybox-margin');
            }
       });

    });

    //busked close popup
    $('.busked-callback-link').click(function(){

        $.fancybox.close();

    });

    //busked item sum
    function buskedItemSum(item){

        var itemSum = parseInt(item.find('.busked-description-price').data('price'))*parseInt(item.find('.count-input input').val());
        item.find('.busked-description-value-text').text(itemSum);

    }

    //busked all sum
    function buskedAllSum(){

        var sum = 0;

        $('.busked-item').each(function() {
           sum+=parseInt($(this).find('.busked-description-value-text').text());
        });

        $('.busked-sum-value-numb').text(sum);

        if($('.delivery-price-select').is('.jq-selectbox')){
            $('.delivery-price-sellect').styler('destroy');
        }

        if(sum < 5000){
            $('.delivery-price-select option').eq(0).attr('value','400').text('Доставка до 5000 руб. до подъезда в пределах МКАД');
        }else{
            $('.delivery-price-select option').eq(0).attr('value','0').text('Доставка свыше 5000 руб. до подъезда в пределах МКАД');
        }
        var orderSum = sum + parseInt($('.delivery-price-select option:selected').val());

        $('.busked-order-value-num').text(orderSum);
        $('.delivery-price').text(parseInt($('.delivery-price-select option:selected').val())+' руб.');
        $('.delivery-price-select').styler();

    }

    //change delivery price
    function changeDelivery(){

        $(document).on('change', '.delivery-price-select', function(){

            var deliveryPrice = parseInt($(this).find('option:checked').val());

            var itemsPrice = parseInt($('.busked-sum-value-numb').text());

            $('.delivery-price').text(deliveryPrice+' руб.');

            $('.busked-order-value-num').text(itemsPrice + deliveryPrice);

        });

    }

    //busked sum by load
    function buskedSumByLoad(){

        var itemsLength = $('.busked-item').length;
        var point = 1;

        $('.busked-item').each(function(){

            if($(this).find('.count-input input').val() == 1){
                $(this).find('.count-minus').addClass('disable');
            }

            buskedItemSum($(this));
            if(point>=itemsLength){
                buskedAllSum();
            }
            point++;
        });
    }

    //watch is there items in busked
    function isThereItemsInBusked(){

        var itemsLength = $('.busked-item').length;
        var emptyText = '<span class="empty-busked">Товаров нет.</span>';

        if(!itemsLength){

            $('.busked-buttons').addClass('hide');
            if(!$(".busked-items-wrap .empty-busked").length){
                $('.busked-items-wrap').prepend(emptyText);
            }

        }else{

            $('.busked-buttons').removeClass('hide');
            if($(".busked-items-wrap .empty-busked").length != 0){
                $('.busked-items-wrap .empty-busked').remove();
            }

        }

    };

    //busked item count change
    function buskedCountChange(){

        $(document).on('click', '.busked-description-count .count-button', function(){

            var parent = $(this).parent();
            var parentItem = $(this).parents('.busked-item');
            var inputValue = parseInt(parent.find('.count-input input').val());

            if(!$(this).is('.disable')){
                if($(this).is('.count-minus')){
                    inputValue--;
                    if(inputValue == 1){
                        $(this).addClass('disable');
                    }
                }
                else if($(this).is('.count-plus')){
                    inputValue++;
                    if(inputValue>1){
                        parent.find('.count-minus').removeClass('disable');
                    }
                }

                parent.find('input').val(inputValue);

                buskedItemSum(parentItem);
                buskedAllSum();

            }
        });

        var pattern = /^[0-9]\d*$/;
        var lastValue = 0;

        $(document).on('keydown', '.count-input input', function(){
            if(pattern.test($(this).val())){
                lastValue = $(this).val();
            }

        });

        $(document).on('keyup', '.count-input input', function(){

            var parent = $(this).parents('.busked-item');
            var thisValue = $(this).val();

            if(!pattern.test(thisValue)){
                $(this).val(lastValue);
            }
            else{
                if(parseInt($(this).val())>0){
                    $(this).parents('.busked-description-count').find('.count-minus').removeClass('disable');
                }
                else{
                    $(this).parents('.busked-description-count').find('.count-minus').addClass('disable');
                }
                buskedItemSum(parent);
                buskedAllSum();
            }

        });

    };

    //remove item from busked
    function removeItemFromBusked(){

        $(document).on('click','.busked-remove', function(){
            $(this).parents('.busked-item').remove();
            buskedSumByLoad();
            isThereItemsInBusked();
            var height = $('#busked').height();
            $('.busked-wrapper-fancybox .fancybox-inner').height(height);

        });

    };

    function loadItemsInBusked(data){

        if(data){
            $('.busked-items-wrap').html(data);

            var timer = setInterval(function(){
                if($('.busked-item').length != 0){
                    buskedSumByLoad();
                    isThereItemsInBusked();
                }
            },0);
        }else{
           isThereItemsInBusked();
        }

    };

    someAjax('.busked-link a', 'loadItemsInBusked.php', loadItemsInBusked);
    someAjax('.in-busket-text', 'loadItemsInBusked.php', loadItemsInBusked);

    buskedCountChange();
    removeItemFromBusked();
    changeDelivery();

};


$(document).ready(function(){
    validate('#call-popup .contact-form', {submitFunction:validationCall});
    validate('.contacts-form', {submitFunction:validationCall});
    $('.reqer-pass').each(function() {
       validate($(this), {submitFunction:validationCallChange});
    });
    Maskedinput();
    fancyboxForm();
    validate('.header-form-top',{submitFunction:validationCallEntrance});
    validate('.recover-form', {submitFunction:validationCallRecovery});
    validate('.registration-form', {submitFunction:validationCallREG});
    validate('.header-form-bottom');
    validate('.order-form-main', {submitFunction:validationCall});

    someAjax('.add-to-busked-wrap a', 'ajax.php', lucky_cats_AddToBasket);

});

$(window).load(function(){

    buskedFunc();

});