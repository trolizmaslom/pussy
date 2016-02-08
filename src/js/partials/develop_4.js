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
                if($(this).is('.active')){
                    console.log('clikc on actie');
                    return false;
                }
                var img = $(this).find('img').attr('src');
                $('.item-card-img-item').removeClass('active');
                $(this).addClass('active');
                $('.item-card-main-img').find('img').attr('src', img);
            });
        }
        clickOnItem();
    }
}

$(document).ready(function(){
    worksHeight($('.grid_item'));
    paralaxCat($('.parallax-cat'));
    itemCard();
});

$(window).load(function(){

});

$(window).resize(function(){
    worksHeight($('.grid_item'));
});