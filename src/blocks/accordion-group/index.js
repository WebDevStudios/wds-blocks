import edit from './edit';
import save from './save';
import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';
import { PREFIX } from '../../utils/constants';
import './frontend/style.scss';

/**
 * Register block type definition.
 *
 * @author WebDevStudios
 * @since 2.0.0
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType('wdsblocks/accordion-group', {
	title: __('Accordion Group (wds)', 'wdsblocks'),
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
			selector: `.${PREFIX}-accordion-group__title`,
		},
		desc: {
			type: 'array',
			source: 'children',
			selector: `.${PREFIX}-accordion-group__desc`,
		},
		bkgColor: {
			type: 'string',
			default: 'transparent',
		},
	},
	edit,
	save,
});
