import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { PREFIX } from '../../../utils/config';

// Slide InnerBlocks props.
export const INNER_BLOCKS_PROPS = {
	/**
	 * Filter allowed blocks for slide InnerBlocks.
	 *
	 * @author WebDevStudios
	 * @since  2.0.0
	 *
	 * @param  {Array} [allowedBlocks] Allowed blocks for slide InnerBlocks.
	 */
	allowedBlocks: applyFilters(
		`${ PREFIX }.carouselSlide.innerBlocksAllowedBlocks`,
		[ 'core/heading', 'core/paragraph', 'core/buttons' ]
	),

	/**
	 * Filter template for slide InnerBlocks.
	 *
	 * @author WebDevStudios
	 * @since  2.0.0
	 *
	 * @param  {Array} [template] Template for slide InnerBlocks.
	 */
	template: applyFilters( `${ PREFIX }.carouselSlide.innerBlocksTemplate`, [
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
	] ),
};
