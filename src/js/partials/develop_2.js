function punishScrollPane (){
    var hert = $(window).height() - $('.header').height() - $('.footer').height() -$('.title-text').height() - parseInt($('.wrap-one-news').css('padding-bottom')) - parseInt($('.wrap-one-news').css('padding-top')) -parseInt($('.fix-class').css('padding-top'));

    if  (hert<250) {
        hert = 250;
    }

    $('.news-lol-scroll').css('height', hert);

    $('.news-lol-scroll').jScrollPane({showArrows: false, autoReinitialise:true,verticalDragMaxHeight:10, contentWidth: '0px', verticalDragMaxHeight:20});
}

function convertationLook() {
    var flagShtock1 = true;
    var flagShtock2 = true;
    var triggerButton = true;

    $('.img-hovered-click1').click(function(){
        if (flagShtock1) {
            $(this).closest('.context').find('input[type=password]').attr('type', 'text');
            $(this).find('img').attr('src' , template_url+'images/in-ie8-not-belive.png' );
            flagShtock1 = false ;
        }
        else{
            $(this).closest('.context').find('input[type=text]').attr('type', 'password');
            $(this).find('img').attr('src' , template_url+'images/in-ie8-belive.png');
            flagShtock1 = true ;
        };
    });

    $('.img-hovered-click2').click(function(){
        if (flagShtock2) {
            $(this).closest('.context').find('input[type=password]').attr('type', 'text');
            $(this).find('img').attr('src' , template_url+'images/in-ie8-not-belive.png' );
            flagShtock2 = false ;
        }
        else{
            $(this).closest('.context').find('input[type=text]').attr('type', 'password');
            $(this).find('img').attr('src' , template_url+'images/in-ie8-belive.png');
            flagShtock2 = true ;
        };

    });

    $('.olways-click-some').click(function(){
        if(triggerButton){
            triggerButton = false;
                var button = $(this);

            if (!button.hasClass('opened')){
                button.addClass('opened')
                setTimeout(function(){
                    button.find('span').html('Отмена');
                }, 300);
                button.closest('.big-row-convert').find('.row-sample').css('margin-bottom', '24px');
                button.find('a').addClass('green-button');
                button.closest('.big-row-convert').find('.hipe-block').stop( true, true ).slideDown( 300, function(){
                    triggerButton = true;
                } );


            }
            else{
                button.removeClass('opened')
                setTimeout(function(){
                    button.find('span').html('Изменить');
                }, 300);
                button.closest('.big-row-convert').find('.row-sample').css('margin-bottom', '48px');
                button.find('a').removeClass('green-button');
                button.closest('.big-row-convert').find('.hipe-block').stop( true, true ).slideUp(300, function(){
                    triggerButton = true;
                });
            }

        }
    });


    $('.subm-closest-form').click(function(){
        $(this).closest('.hipe-block').find('form').submit();
    });

    $('.reset-page').on('click', function(){
        location.reload();
    });
}

$(document).ready(function(){

    punishScrollPane ();
    convertationLook();


});

$(window).load(function(){

});

$(window).resize(function(){
    punishScrollPane ();
});