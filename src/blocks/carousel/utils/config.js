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
	`${ PREFIX }.carousel.glideSettings`,
	{
		autoplay: 5000,
		focusAt: 'center',
		gap: 0,
		type: 'carousel',
	}
);

/**
 * Filter props for carousel InnerBlocks.
 *
 * @author WebDevStudios
 * @since  2.0.0
 *
 * @param  {Object} [props] InnerBlocks props.
 */
export const INNER_BLOCKS_PROPS = applyFilters(
	`${ PREFIX }.carousel.innerBlocksProps`,
	{
		allowedBlocks: [ `${ PREFIX }/carousel-slide` ],
		template: [ [ `${ PREFIX }/carousel-slide`, {} ] ],
	}
);
