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

	$('.sendwich-icon-wrap').click(function(){

		$('sendwich-icon-wrap').removeClass('active');
		$(this).toggleClass('active');

	});

}

//header form func
function headerShowForm(){

	$(document).click(function (e) {

        var container = $(".enter-wrap");

        if(container.has(e.target).length == 0 || $(e.target).parent().is('.enter-wrap-link.active')){
        	console.log(container.has(e.target).length);
        	$('.enter-wrap-link.active').removeClass('active');
        	$('.enter-wrap.show .header-form-wrap').slideUp(300);
        	$('.enter-wrap.show').removeClass('show');
        }
        else if($(e.target).parent().is('.enter-wrap-link:not(.active)')){
        	//console.log('s');
        	$('.enter-wrap-link.active').removeClass('active');
        	$('.enter-wrap.show .header-form-wrap').slideUp(300);
        	$('.enter-wrap.show').removeClass('show');
        	var parent = $(e.target).parents('.enter-wrap');
        	parent.addClass('show');
        	$(e.target).parent().addClass('active');
        	$('.enter-wrap.show .header-form-wrap').slideDown(300);
        }

    });

};


$(document).ready(function(){

	headerMenuHover();
	headerMenuSendwich();
	headerShowForm();

});

$(window).load(function(){

});

$(window).resize(function(){

});