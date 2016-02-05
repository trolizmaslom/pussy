
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
};

$(document).ready(function(){

	headerMenuHover();

});

$(window).load(function(){

});

$(window).resize(function(){

});