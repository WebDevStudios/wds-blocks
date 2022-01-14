import { applyFilters } from '@wordpress/hooks';
import { PREFIX } from '../../../utils/config';

/**
 * Filter props for call to action InnerBlocks.
 *
 * @author WebDevStudios
 * @since  2.3.0
 * @param {Object} props InnerBlocks props.
 */
export const INNER_BLOCKS_PROPS = applyFilters(
	`${ PREFIX }.callToAction.innerBlocksProps`,
	{
		allowedBlocks: [ 'core/buttons' ],
		template: [ [ 'core/buttons', { align: 'center' } ] ],
	}
);
