var lightbox = (function() {

	/**
	 * setup private properties
	 */
	var gallery  = null, // cache gallery
		newImage = null,
		overlay  = null;


	/**
	 * init
	 */
	function startItUp(data) {

		// cache the images
		gallery = document.querySelector(data.selector);

		// create the overlay and append it to body
		overlay = document.createElement('div');
		overlay.id = 'overlay';

		newImage = document.createElement('img');
		overlay.appendChild(newImage);

		document.getElementsByTagName('body')[0].appendChild(overlay);

		// attach event handlers
		setupHandlers();

	}


	/**
	 * attach click and keyboard handlers
	 */
	function setupHandlers() {

		// clicked on image
		gallery.addEventListener('click', function(event) {
			if ( event.target && event.target.tagName.toLowerCase() === 'img' ) {
				attachImage( event.target );
				showLightbox();
				event.preventDefault();
			}
		}, false);

		// clicked on overlay
		overlay.addEventListener('click', function(event) {
			hideLightbox();
		}, false);

		// clicked on overlay
		document.addEventListener('keyup', function(event) {
			var which = event.keyCode || event.which;

			if ( !keys ) {
				var keys = { esc: 27 };
			}

			switch( which ) {
				case keys.esc:
					hideLightbox();
				break;
			}
		}, false);

	}


	/**
	 * attach image
	 */
	function attachImage(clickedElement) {
		newImage.src = clickedElement.parentNode.href;
	}


	/**
	 * show it
	 */
	function showLightbox() {
		// overlay.style.display = 'block';
		overlay.classList.add('show');
	}


	/**
	 * hide it
	 */
	function hideLightbox() {
		// overlay.style.display = 'none';
		overlay.classList.remove('show');
	}



	/**
	 * public methods
	 */
	return {
		init: startItUp,
		show: showLightbox,
		hide: hideLightbox
	}

}());