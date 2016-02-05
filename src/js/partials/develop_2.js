$(document).ready(function(){

    var hert = $(window).height() - $('.header').height() - $('.footer').height() -$('.title-text').height() - parseInt($('.wrap-one-news').css('padding-bottom')) - parseInt($('.wrap-one-news').css('padding-top'));
    $('.news-lol-scroll').css('height', hert);

    $('.news-lol-scroll').jScrollPane({showArrows: true, autoReinitialise:true,verticalDragMaxHeight:20, contentWidth: '0px'});


    console.log();
/*

*/

});

$(window).load(function(){

});

$(window).resize(function(){

});