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

    var flagShtock = true;

    $('.img-hovered-click').click(function(){
        if (flagShtock) {
            $('.hide-pass').attr('type', 'text');
            flagShtock = false ;
            $('.img-hovered-click>img').attr('src' , 'images/in-ie8-not-belive.png' );

        }
        else{
            $('.hide-pass').attr('type', 'password');
            $('.img-hovered-click>img').attr('src' , 'images/in-ie8-belive.png');
            flagShtock = true ;
        };

    });

    $('.fun-move-rich-man').click(function(){
        console.log($(this).closest('.row-sample').find('.hipe-block'));   //.fadeOut( "slow" );
        $(this).closest('.row-sample').find('.hipe-block').css('display', 'block');
    });

});

$(window).load(function(){

});

$(window).resize(function(){
    punishScrollPane ();
});