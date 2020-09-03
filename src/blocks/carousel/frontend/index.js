import Glide from '@glidejs/glide';
import { GLIDE_SETTINGS } from '../utils/config';
import { PREFIX } from '../../../utils/config';

const carouselClass = `wp-block-${ PREFIX }-carousel`;

/**
 * Handle functionality related to carousel block.
 *
 * @author WebDevStudios
 * @since  2.0.0
 */
const wdsBlocksCarousel = {
	/**
	 * Initial Carousel setup.
	 *
	 * @author WebDevStudios
	 * @since  2.0.0
	 *
	 * @return {?boolean} Return false if no carousels found.
	 */
	init: () => {
		// Target carousel elements.
		const carousels = document.querySelectorAll( `.${ carouselClass }` );

		// Exit if no carousels found.
		if ( ! carousels.length ) {
			return false;
		}

		// Iterate over carousels.
		carousels.forEach( ( carousel ) =>
			// Init/mount carousel.
			new Glide( carousel, GLIDE_SETTINGS ).mount()
		);
	},
};

export default wdsBlocksCarousel;
