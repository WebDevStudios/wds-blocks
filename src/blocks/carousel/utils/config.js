import { applyFilters } from '@wordpress/hooks';
import { PREFIX } from '../../../utils/config';

/**
 * Filter (GlideJS) carousel settings.
 *
 * @author WebDevStudios
 * @since  2.0.0
 *
 * @param  {Object} [settings] Carousel settings.
 */
export const GLIDE_SETTINGS = applyFilters(
	`${ PREFIX }.carouselSlide.carouselSettings`,
	{
		autoplay: 5000,
		focusAt: 'center',
		gap: 0,
		type: 'carousel',
	}
);

// Carousel InnerBlocks props.
export const INNER_BLOCKS_PROPS = {
	allowedBlocks: [ `${ PREFIX }/carousel-slide` ],
	template: [ [ `${ PREFIX }/carousel-slide`, {} ] ],
};
