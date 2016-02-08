function punishScrollPane (){
    var hert = $(window).height() - $('.header').height() - $('.footer').height() -$('.title-text').height() - parseInt($('.wrap-one-news').css('padding-bottom')) - parseInt($('.wrap-one-news').css('padding-top')) -parseInt($('.fix-class').css('padding-top'));

    if  (hert<250) {
        hert = 250;
    }

    $('.news-lol-scroll').css('height', hert);

    $('.news-lol-scroll').jScrollPane({showArrows: false, autoReinitialise:true,verticalDragMaxHeight:10, contentWidth: '0px', verticalDragMaxHeight:20});
}

$(document).ready(function(){
    punishScrollPane ();

    var flagShtock1 = true;

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

    var flagShtock2 = true;

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


    var redFlag = true;
    var yelowFlag = true;

    $('.olways-click-some1').click(function(){

        if (redFlag){
            redFlag = false ;
            $(this).find('span').html('Отмена');
            $(this).find('a').addClass('green-button');
            $(this).closest('.big-row-convert').find('.hipe-block').stop( true, true ).fadeIn( "slow" ); //.css('display', 'block');
        }
        else{
            redFlag = true ;
            $(this).find('span').html('Изменить');
            $(this).find('a').removeClass('green-button');
            $(this).closest('.big-row-convert').find('.hipe-block').stop( true, true ).fadeOut("slow"); //.css('display', 'block');
        }

    });

    $('.olways-click-some2').click(function(){
        if (yelowFlag){
            yelowFlag = false ;
            $(this).find('span').html('Отмена');
            $(this).find('a').addClass('green-button');
            $(this).closest('.big-row-convert').find('.hipe-block').stop( true, true ).fadeIn( "slow" ); //.css('display', 'block');
        }
        else{
            yelowFlag = true ;
            $(this).find('span').html('Изменить');
            $(this).find('a').removeClass('green-button');
            $(this).closest('.big-row-convert').find('.hipe-block').stop( true, true ).fadeOut("slow"); //.css('display', 'block');
        }
    });

    $('.subm-closest-form').click(function(){
        $(this).closest('.hipe-block').find('form').submit();
    })




});

$(window).load(function(){

});

$(window).resize(function(){
    punishScrollPane ();
});