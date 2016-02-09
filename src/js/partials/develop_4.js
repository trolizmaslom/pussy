$.scrollbarWidth=function(){var a,b,c;if(c===undefined){a=$('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');b=a.children();c=b.innerWidth()-b.height(99).innerWidth();a.remove()}return c};
var scrollBar = $.scrollbarWidth();


function worksHeight(item){
    if($(window).width()>= 992){
        var device = 1;
        item.each(function() {
            var coef = ($(this).data('height-normal'))*device;
            var width = $(this).width();
            $(this).height(parseFloat(coef*width));
        });
    }
    if($(window).width()<= 992){
        item.removeAttr('style');
    }
}

function paralaxCat(item){
    if(($(window).width() - scrollBar) > 992){
        $(window).scroll(function(event) {
            var scroll = $(window).scrollTop();
            item.each(function() {
                var dad = $(this).parent();
                var go = dad.offset().top - $(window).scrollTop() + 100;
                var p = parseFloat($(this).data('p') || 0);
                if(go<0){
                    $(this).css({
                        'transition': 'transform ease .7s',
                        'transform': 'translateY('+ -($(this).offset().top - $(window).scrollTop())*p+'px)'
                    });
                }
            });

        });
    }else{
        item.hide();
    }
}
function itemCard(){
    if($('.item-card-img-item')){
        function clickOnItem(){
            $('.item-card-img-item').click(function(event) {
                if($(this).is('.slick-current')){
                    return false;
                }
                var img = $(this).find('img').attr('src');
                $('.item-card-img-item').removeClass('slick-current');
                $(this).addClass('slick-current');
                $('.item-card-main-img').find('img').fadeOut('300', function() {
                    $(this).attr('src', img).fadeIn(500);
                });
            });
        }
        clickOnItem();

        //start slider
        if($('.item-card-img-item').length>4){

            $('.item-card-column').on('init beforeChange', function(){
              showHideArrow();
            });

            $('.item-card-column').slick({
                infinite: false,
                focusOnSelect:true,
                prevArrow:'<button type="button" class="slick-prev"></button>',
                nextArrow:'<button type="button" class="slick-next"></button>',
                vertical:true,
                draggable:false,
                arrows: true,
                slidesToShow: 4,
                slidesToScroll: 1
            });

            function showHideArrow(){
                var lastItem = $('.item-card-img-item').last().is('.slick-current');
                var firstItem = $('.item-card-img-item').first().is('.slick-current');
                if(firstItem){
                    $('.item-card .slick-prev').hide();
                }else{
                    $('.item-card .slick-prev').show();
                }
                if(lastItem){
                    $('.item-card .slick-next').hide();
                }else{
                    $('.item-card .slick-next').show();
                }
            }

            //fix to slider
            $('.item-card-left .slick-arrow').click(function(event) {
                showHideArrow();
                var img = $('.item-card-img-item.slick-current').find('img').attr('src');
                    $('.item-card-main-img').find('img').fadeOut('300', function() {
                        $(this).attr('src', img).fadeIn(500);
                    });

            });
        }
    }
}

function fancyboxItemCard(){
  $('.item-card-fancybox').fancybox({
    openEffect  : 'fade',
    closeEffect : 'fade',
    autoResize:true,
    wrapCSS:'item-card-fancy',
    'closeBtn' : true,
    fitToView:true,
    padding:'0'
  })
}

$(document).ready(function(){
    worksHeight($('.grid_item'));
    paralaxCat($('.parallax-cat'));
    itemCard();
    fancyboxItemCard();
});

$(window).load(function(){

});

$(window).resize(function(){
    worksHeight($('.grid_item'));
});