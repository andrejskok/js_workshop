(function($) {

	$('#one').parallax({ friction: 0.2 });
	$('#two').parallax({ friction: 0.6 });
	$('#three').parallax({ friction: 0.3 });

	$('#one .toothless').parallax({ friction: .6 });
	$('#three .toothless').parallax({ friction: .5 });

	$('#nav').find('a').on('click', function(event) {
		event.preventDefault();
		$('html,body').animate({ scrollTop: $(this.hash).offset().top });	
	})

})(jQuery);