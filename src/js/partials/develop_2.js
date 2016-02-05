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

});

$(window).load(function(){

});

$(window).resize(function(){
    punishScrollPane ();
});