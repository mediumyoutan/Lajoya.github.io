(function($) {
	'use strict';
	

	jQuery(document).ready(function(){
		
		/*PRELOADER JS*/
			$(window).load(function() { 
				$('.loader_wrap').fadeOut();
				$('.preloader').delay(350).fadeOut('slow'); 
			}); 
		/*END PRELOADER JS*/
		
		/*  Stellar for background scrolling  */
		(function () {

			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			 
			} else {
				$(window).stellar({
					horizontalScrolling: false,
					responsive: true
				});
			}

		}());
	/* End Stellar for background scrolling  */		
	}); 
	

})(jQuery);	