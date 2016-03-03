var Slider = (function() {

	/**
	 * setup private properties
	 */
	var images   = null, // cache images
		parent   = null, // cache parent of images
		selector = null; // selector for images, should we need it

	var	currentImg = null, // currently showing
		prevImg    = null, // prev to show
		nextImg    = null; // next to show

	var transitionEvent = null; // store which event to use to check if css transition ended


	/**
	 * initialize the slider
	 */
	function startItUp(data) {
		images = $(data.selector);
		parent = images.parent();
		selector = data.selector;
		transitionEvent = whichTransitionEvent();

		images.not(':last').addClass('hide'); // hide all except last
	}


	/**
	 * find image to hide (current)
	 */
	function findCurrentImage() {
		currentImg = images.filter(':not(.hide)');
	}


	/**
	 * find image to show (prev)
	 */
	function findPrevImage() {
		findCurrentImage();
		prevImg = currentImg.prev( selector );

		// if there's no prev, we get the last
		if ( ! prevImg.length ) {
			prevImg = images.filter(':last');
		}
	}


	/**
	 * find image to show (next)
	 */
	function findNextImage() {
		findCurrentImage();
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
		findNextImage();
		doTheChange(nextImg);
	}


	/**
	 * if 'prev' was hovered over
	 * we add css will-change to slides that will change
	 *
	 * it is recommended to add will-change slightly before the elemets get animated and removed immediately after
	 */
	function preparePrevImage() {
		findPrevImage();
		currentImg.add(prevImg).addClass('change');
	}


	/**
	 * if 'next' was hovered over
	 * we add css will-change to slides that will change
	 *
	 * more about this adding/removing business https://dev.opera.com/articles/css-will-change-property/
	 */
	function prepareNextImage() {
		findNextImage();
		currentImg.add(nextImg).addClass('change');
	}


	/**
	 * which transition
	 */
	function whichTransitionEvent() {
		var t;
		var el = document.createElement('fakeelement');
		var transitions = {
			'transition':'transitionend',
			'OTransition':'oTransitionEnd',
			'MozTransition':'transitionend',
			'WebkitTransition':'webkitTransitionEnd'
		}

		for (t in transitions) {
			if ( el.style[t] !== undefined ) {
				return transitions[t];
			}
		}
	}


	/**
	 * we're gonna hide the old one and show the new
	 */
	function doTheChange(newImg) {

		// but only if there's nothing being animated
		if ( parent.data('animated') ) {
			return;
		}

		parent.data('animated', true);

		parent
			.off(transitionEvent)
			.on(transitionEvent, function(event) {
				parent.data('animated', false);
				$(event.target).removeClass('change');
			});

		currentImg.addClass('hide');
		newImg.removeClass('hide');
	}


	/**
	 * public methods
	 */
	return {
		init: startItUp,
		prev: showPrevImage,
		next: showNextImage,
		preparePrev: preparePrevImage,
		prepareNext: prepareNextImage
	}

}());