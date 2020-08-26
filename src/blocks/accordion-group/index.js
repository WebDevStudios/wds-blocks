import edit from './edit';
import save from './save';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { PREFIX } from '../../utils/constants';
import './frontend/style.scss';

const blockname = 'accordion-group';

/**
 * Register block type definition.
 *
 * @author WebDevStudios
 * @since 2.0.0
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType(`wdsblocks/${blockname}`, {
	title: __('Accordion Group (wds)', 'wdsblocks'),
	description: __('Adds a section of expand/collapse blocks.', 'wdsblocks'),
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
			selector: `.wp-block-${PREFIX}-${blockname}__title`,
		},
		desc: {
			type: 'array',
			source: 'children',
			selector: `.wp-block-${PREFIX}-${blockname}-__desc`,
		},
		bkgColor: {
			type: 'string',
			default: 'transparent',
		},
	},
	edit,
	save,
});
