;(function($, window, document, undefined) {
	
	$.fn.parallax = function( options ) {

		// zakladene nastavenia 
		var settings = $.extend({
				friction: 0.1
			}, options);

		
		// ulozime si jquery verziu okna 
		var $win = $(window);


		// vratime object pre chaining tatum
		return this.each( function() {
			
			// element, ktoreho pozadie chceme scrollovat 
			var element = $(this),
				startingPosition = { // najdeme prvotne 
					left: element.css('backgroundPosition').split(' ')[0],
					top: parseInt(element.css('backgroundPosition').split(' ')[1], 10) // toto potrebujeme mat iba ako cislo, vymazat px
				};

			// spustime zmenu backgroundu
			render( element, startingPosition );

		});


		// vykona posuvanie
		function render(element, startingPosition) {
			// po kazdom scrollovani okna chceme zavolat funkciu, kde vypocivame novy background position stranky
			$win.on('scroll', function() {
				
				var	bgTop = element.offset().top, // chceme odchytit jeho poziciu v ramci stranky, kolko pixelov je od vrchu
					winTop = $win.scrollTop(); // chceme odchytit, kolko sme prescrollovali od vrchu stranky

				// vypocitame novu Y poziciu backgroundu
				var newBgTop = Math.floor( (bgTop + startingPosition.top - winTop) * settings.friction );

				// nastavime elementu novu poziciu 
				element.css({ backgroundPosition: startingPosition.left + ' ' + newBgTop + 'px' });	

			});
		}

	}

})(jQuery, window, document);