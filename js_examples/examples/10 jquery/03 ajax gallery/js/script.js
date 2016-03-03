(function($) {

	var galeria = $('#galeria');

	galeria.on('click', '#strankovanie a', function(event) {

		event.preventDefault();

		var href = $(this).attr('href');

		$.ajax({
			url: href,
			success: function(data) {
	
				var newGallery = $(data).find('.riadok, #strankovanie');
				
				newGallery.hide();
				
				galeria.html( newGallery );

				newGallery.fadeIn();

			}
		});

	});

}(jQuery));