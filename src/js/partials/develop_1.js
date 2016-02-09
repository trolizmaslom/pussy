// header hover menus
function headerMenuHover(){

	$('.second-level').hover(
		function(){

			if($(window).width()>1024){
				$(this).find('ul').stop().slideDown(300);
			}

		},
		function(){

			if($(window).width()>1024){
				$(this).find('ul').stop().slideUp(300);
			}

		}
	);

	$('.second-level .second-level-icon').click(function(){

		var parent = $(this).parent();
		var id = parent.data('id');
		$('.second-level:not([data-id='+id+']) .second-level-icon.rotate').removeClass('rotate');
		$('.second-level:not([data-id='+id+']) ul').stop().slideUp(300);

		if($(this).is('.rotate')){
			$(this).removeClass('rotate');
			parent.find('ul').stop().slideUp(300);
		}
		else{
			$(this).addClass('rotate');
			parent.find('ul').stop().slideDown(300);
		}

	});

	$(window).resize(function(){

		if($(window).width()>1024){
			$('.second-level ul').removeAttr('style');
			$('.second-level .second-level-icon').removeClass('rotate');
		}

	});

};

//header sendwich func
function headerMenuSendwich(){

    $(document).click(function(e){

        var container = $('.header-navigate-wrap');

        if(container.has(e.target).length == 0 || $(e.target).parents('.sendwich-icon-wrap').is('.active')){
            $('.sendwich-icon-wrap').removeClass('active');
        }
        else if($(e.target).parents('.sendwich-icon-wrap').length != 0 && !$(e.target).parents('.sendwich-icon-wrap').is('.active')){
            $('.sendwich-icon-wrap').removeClass('active');
            $(e.target).parents('.sendwich-icon-wrap').addClass('active');
        }

    });

}

//header form func
function headerShowForm(){

	$(document).click(function (e) {

        var container = $(".enter-wrap");

        if(container.has(e.target).length == 0 || $(e.target).parent().is('.enter-wrap-link.active')){
        	$('.enter-wrap-link.active').removeClass('active');
        	$('.enter-wrap.show .header-form-wrap').slideUp(300);
        	$('.enter-wrap.show').removeClass('show');
        }
        else if($(e.target).parent().is('.enter-wrap-link:not(.active)') || $(e.target).is('.enter-wrap-link:not(.active)')){

        	$('.enter-wrap-link.active').removeClass('active');
        	$('.enter-wrap.show .header-form-wrap').slideUp(300);
        	$('.enter-wrap.show').removeClass('show');
        	var parent = $(e.target).parents('.enter-wrap');

        	$(e.target).parent().addClass('active');
        	parent.parent().find('.header-form-wrap').slideDown(300, function(){
                parent.addClass('show');
            });
        }

    });

    $('.fancybox-basked').fancybox({
        fitToView:true,
        autoSize:true,
        padding:0,
        wrapCSS:'busked-wrapper-fancybox'
    });

};

//busked func
function buskedFunc(){

    //busked item sum
    function buskedItemSum(item, functionName){
        var itemSum = parseInt(item.find('.busked-description-price').data('price'))*parseInt(item.find('.count-input input').val());
        item.find('.busked-description-value-text').text(itemSum);

        //calling callback func

        functionName;

    }

    //busked all sum
    function buskedAllSum(){

        var sum = 0;

        $('.busked-item').each(function() {
           sum+=parseInt($(this).find('.busked-description-value-text').text());
        });

        $('.busked-sum-value-numb').text(sum);
        $('.hidden-busked-sum').val(sum);

    }

    //busked sum by load
    function buskedSumByLoad(){

        var itemsLength = $('.busked-item').length;
        var point = 1;

        $('.busked-item').each(function(){
            buskedItemSum($(this));
            if(point>=itemsLength){
                buskedAllSum();
            }
            point++;
        });
    }

    buskedSumByLoad();

}

$(document).ready(function(){

	headerMenuHover();
	headerMenuSendwich();
	headerShowForm();

});

$(window).load(function(){

    buskedFunc();

});

$(window).resize(function(){

});