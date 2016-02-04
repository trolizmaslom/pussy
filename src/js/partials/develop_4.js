function worksHeight(item){
    if($(window).width()>= 992){
        var device = 1;
        // if($(window).width()<= 1366){
        //     device = 0.987;
        // }
        // if($(window).width()<= 1024){
        //     device = 1.01;
        // }
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



$(document).ready(function(){
    worksHeight($('.grid_item'));
});

$(window).load(function(){

});

$(window).resize(function(){
    worksHeight($('.grid_item'));
});