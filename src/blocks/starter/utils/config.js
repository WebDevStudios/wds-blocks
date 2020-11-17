import { applyFilters } from '@wordpress/hooks';
import { PREFIX } from '../../../utils/config';

// import { __ } from '@wordpress/i18n';

/**
 * Filter props for starter InnerBlocks.
 *
 * @author WebDevStudios
 * @since  2.0.0
 *
 * @param  {Object} [props] InnerBlocks props.
 */
export const INNER_BLOCKS_PROPS = applyFilters(
	`${ PREFIX }.starter.innerBlocksProps`,
	{
		allowedBlocks: [ 'core/paragraph', 'core/buttons', 'core/image' ],
		template: [

			/** Sample core block template structure
			[
				'core/heading',
				{
					content: __( 'Title', 'wdsblocks' ),
					level: 3,
					align: 'center',
				},
			],
			[
				'core/paragraph',
				{
					content: __( 'Content', 'wdsblocks' ),
					align: 'center',
				},
			],
			[
				'core/buttons',
				{ align: 'center' },
				[ [ 'core/button', { text: __( 'Read More', 'wdsblocks' ) } ] ],
			],
			*/
		],
	}
);
