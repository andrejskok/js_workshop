var Slider = (function() {

	/**
	 * setup private properties
	 */
	var images   = null, // cache images
		selector = null; // selector for images, should we need it

	var	currentImg = null, // currently showing
		prevImg    = null, // prev to show
		nextImg    = null; // next to show


	/**
	 * initialize the slider
	 */
	function startItUp(data) {
		images = $(data.selector);
		selector = data.selector;
		images.not(':last').hide(); // hide all except last
	}


	/**
	 * find image to hide (current) and to show (prev)
	 */
	function findPrevImage() {
		currentImg = images.filter(':visible');
		prevImg = currentImg.prev( selector );

		// if there's no prev, we get the last
		if ( ! prevImg.length ) {
			prevImg = images.filter(':last');
		}
	}


	/**
	 * find image to hide (current) and to show (next)
	 */
	function findNextImage() {
		currentImg = images.filter(':visible');
		nextImg = currentImg.next( selector );

		// if there's no next, we get the first
		if ( ! nextImg.length ) {
			nextImg = images.filter(':first');
		}
	}


	/**
	 * if 'prev' was clicked
	 */
	function showPrevImage() {
		findPrevImage();
		doTheChange(prevImg);
	}


	/**
	 * if 'next' was clicked
	 */
	function showNextImage() {
		findPrevImage();
		doTheChange(prevImg);
	}


	/**
	 * we're gonna hide the old one and show the new
	 */
	function doTheChange(newImg) {

		// but only if there's nothing being animated
		if ( images.filter(':animated').length ) {
			return;
		}

		currentImg.fadeOut(750);
		newImg.fadeIn(750);
	}


	/**
	 * public methods
	 */
	return {
		init: startItUp,
		prev: showPrevImage,
		next: showNextImage
	}

}());