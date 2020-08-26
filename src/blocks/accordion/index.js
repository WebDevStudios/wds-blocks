import edit from './edit';
import save from './save';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { PREFIX } from '../../utils/constants';
import './frontend/style.scss';

const blockname = 'accordion';

/**
 * Register block type definition.
 *
 * @author WebDevStudios
 * @since 2.0.0
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType(`wdsblocks/${blockname}`, {
	title: __('Accordion (wds)', 'wdsblocks'),
	description: __(
		'An expand/collaspe editible content section.',
		'wdsblocks'
	),
	icon: 'sort',
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
		clientId: {
			type: 'string',
			default: `wp-block-${PREFIX}-${blockname}-item`,
		},
	},
	edit,
	save,
});
