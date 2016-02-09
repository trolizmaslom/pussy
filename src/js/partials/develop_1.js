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

};

//busked func
function buskedFunc(){

    //busked call popup
    $('.fancybox-basked').fancybox({
        fitToView:true,
        autoSize:true,
        padding:0,
        wrapCSS:'busked-wrapper-fancybox'
    });

    //busked close popup
    $('.busked-callback-link').click(function(){

        $.fancybox.close();

    });

    //busked item sum
    function buskedItemSum(item){

        var itemSum = parseInt(item.find('.busked-description-price').data('price'))*parseInt(item.find('.count-input input').val());
        item.find('.busked-description-value-text').text(itemSum);

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

    //busked item count change
    function buskedCountChange(){

        $('.busked-description-count .count-button').click(function(){
            var parent = $(this).parent();
            var parentItem = $(this).parents('.busked-item');
            var inputValue = parseInt(parent.find('.count-input input').val());

            if(!$(this).is('.disable')){
                if($(this).is('.count-minus')){
                    inputValue--;
                    if(inputValue == 0){
                        $(this).addClass('disable');
                    }
                }
                else if($(this).is('.count-plus')){
                    inputValue++;
                    if(inputValue>0){
                        parent.find('.count-minus').removeClass('disable');
                    }
                }

                parent.find('input').val(inputValue);

                buskedItemSum(parentItem);
                buskedAllSum();

            }
        });

        var pattern = /^[0-9]\d*$/;
        var lastValue = 0;

        $('.count-input input').keydown(function(){
            if(pattern.test($(this).val())){
                lastValue = $(this).val();
            }

        });

        $('.count-input input').keyup(function(){

            var parent = $(this).parents('.busked-item');
            var thisValue = $(this).val();

            if(!pattern.test(thisValue)){
                $(this).val(lastValue);
            }
            else{
                if(parseInt($(this).val())>0){
                    $(this).parents('.busked-description-count').find('.count-minus').removeClass('disable');
                }
                else{
                    $(this).parents('.busked-description-count').find('.count-minus').addClass('disable');
                }
                buskedItemSum(parent);
                buskedAllSum();
            }

        });

    };

    //remove item from busked
    function removeItemFromBusked(){

        $(document).on('click','.busked-remove', function(){
            $(this).parents('.busked-item').remove();
            buskedSumByLoad();
            var height = $('#busked').height();
            $('.busked-wrapper-fancybox .fancybox-inner').height(height);
        });

    };

    buskedCountChange();
    buskedSumByLoad();
    removeItemFromBusked();

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