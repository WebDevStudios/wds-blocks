import edit from './edit';
import save from './save';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { applyFilters } from '@wordpress/hooks';
import { PREFIX, CONTAINER_CLASS } from '../../utils/constants';
import './frontend/style.scss';

const BLOCKNAME = 'accordion-group';

/**
 * Register block type definition.
 *
 * @author WebDevStudios
 * @since 2.0.0
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType(`wdsblocks/${BLOCKNAME}`, {
	title: __('Accordion Group (wds)', 'wdsblocks'),
	description: __(
		'Adds a group of expand/collapse blocks with headline and description.',
		'wdsblocks'
	),
	icon: 'list-view',
	category: 'common',
	keywords: [__('accordion', 'wdsblocks')],
	supports: {
		anchor: true,
	},
	attributes: {
		title: {
			type: 'array',
			source: 'children',
			selector: `.wp-block-${PREFIX}-${BLOCKNAME}__title`,
		},
		desc: {
			type: 'array',
			source: 'children',
			selector: `.wp-block-${PREFIX}-${BLOCKNAME}__desc`,
		},
		bkgColor: {
			type: 'string',
			default: 'transparent',
		},
		containerClass: {
			type: 'string',
			default: CONTAINER_CLASS,
		},
	},
	edit,
	save,
});
