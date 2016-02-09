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
    var redFlag = true;
    var yelowFlag = true;

    $('.img-hovered-click1').click(function(){
        if (flagShtock1) {
            $(this).closest('.context').find('input').attr('type', 'text');
            $(this).find('img').attr('src' , 'images/in-ie8-not-belive.png' );
            flagShtock1 = false ;

        }
        else{
            $(this).closest('.context').find('input').attr('type', 'password');
            $(this).find('img').attr('src' , 'images/in-ie8-belive.png');
            flagShtock1 = true ;
        };

    });

    $('.img-hovered-click2').click(function(){
        if (flagShtock2) {
            $(this).closest('.context').find('input').attr('type', 'text');
            $(this).find('img').attr('src' , 'images/in-ie8-not-belive.png' );
            flagShtock2 = false ;
        }
        else{
            $(this).closest('.context').find('input').attr('type', 'password');
            $(this).find('img').attr('src' , 'images/in-ie8-belive.png');
            flagShtock2 = true ;
        };

    });

    $('.olways-click-some1').click(function(){

        if (redFlag){
            redFlag = false ;
            setTimeout(function(){
                $('.olways-click-some1').find('span').html('Отмена');

            }, 300);
            $(this).closest('.big-row-convert').find('.row-sample').css('margin-bottom', '24px');
            $(this).find('a').addClass('green-button');
            $(this).closest('.big-row-convert').find('.hipe-block').stop( true, true ).fadeIn( 300 );


        }
        else{
            redFlag = true ;
            setTimeout(function(){
                $('.olways-click-some1').find('span').html('Изменить');

            }, 300);
            $(this).closest('.big-row-convert').find('.row-sample').css('margin-bottom', '48px');
            $(this).find('a').removeClass('green-button');
            $(this).closest('.big-row-convert').find('.hipe-block').stop( true, true ).fadeOut(300);
        }

    });

    $('.olways-click-some2').click(function(){
        if (yelowFlag){
            yelowFlag = false ;
            setTimeout(function(){
                $('.olways-click-some2').find('span').html('Отмена');
            }, 300);
            $(this).closest('.big-row-convert').find('.row-sample').css('margin-bottom', '24px');
            $(this).find('a').addClass('green-button');
            $(this).closest('.big-row-convert').find('.hipe-block').stop( true, true ).fadeIn(300 );
        }
        else{
            yelowFlag = true ;
            setTimeout(function(){
                $('.olways-click-some2').find('span').html('Изменить');
            }, 300);
            $(this).closest('.big-row-convert').find('.row-sample').css('margin-bottom', '48px');
            $(this).find('a').removeClass('green-button');
            $(this).closest('.big-row-convert').find('.hipe-block').stop( true, true ).fadeOut(300);
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