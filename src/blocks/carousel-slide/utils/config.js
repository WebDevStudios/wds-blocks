import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { PREFIX } from '../../../utils/config';

/**
 * Filter props for slide InnerBlocks.
 *
 * @author WebDevStudios
 * @since  2.0.0
 *
 * @param  {Object} [props] InnerBlocks props.
 */
export const INNER_BLOCKS_PROPS = applyFilters(
	`${ PREFIX }.carouselSlide.innerBlocksProps`,
	{
		allowedBlocks: [ 'core/heading', 'core/paragraph', 'core/buttons' ],
		template: [
			[
				'core/heading',
				{
					content: __( 'Slide Title', 'wdsblocks' ),
					level: 4,
					align: 'center',
				},
			],
			[
				'core/paragraph',
				{
					content: __( 'Slide Content', 'wdsblocks' ),
					align: 'center',
				},
			],
			[
				'core/buttons',
				{ align: 'center' },
				[ [ 'core/button', { text: __( 'Read More', 'wdsblocks' ) } ] ],
			],
		],
	}
);
