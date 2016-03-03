(function($) {

	var jb = $('.justin'), // vyberieme justina
		loader = $('.loadin'), // loadovacia ikonka 
		siteWidth   = $('body').width(), // zistime sirku stranky
		justinWidth = jb.width(); // zistime sirku justina

	// ked klikneme, posunieme sa o sirku stranky MINUS sirku justina
	// pretoze keby sa posunieme o sirku stranky, justin vyleti von
	// ale ja chcem, aby zostal
	// ja nikdy nechcem, aby ma justin opustil
	// nikdy

	jb.on('click', function() {
		
		// hned po kliknuti zobrazime loading ikonku
		loader.fadeIn();

		// spustime animaciu
		// ked ako treti argument animacnej funkcie hodime dalsiu funkciu, tato sa spusti po skonceni animacie
		$(this).animate({ left: (siteWidth - justinWidth)  }, 4000, function() {

			// po skonceni animacie zasa loader skryjeme
			loader.fadeOut();

		});

	});



	/**
	 * DRUHA cast ulohy
	 * pre ukazu to spravim na kliknutim PRAVYM tlacitkom
	 */

	jb.on('contextmenu', function(event) {
		
		// hned po kliknuti zobrazime loading ikonku
		loader.fadeIn();

		// spustime animaciu 
		$(this).animate({ left: (siteWidth - justinWidth) }, 4000);

		// setTimeout spusti casovac 
		// po uvedenej dobe milisekund odpali funkciu, v ktorej zasa loader schovame
		setTimeout(function() {
			loader.fadeOut();
		}, 1500);

		// preventDefault, pretoze normalne ked kliknes pravym, vyskoci to menu kde je "inspect element" atd
		// a tomu chceme zabranit
		event.preventDefault();

	});

})(jQuery);