import edit from './edit';
import save from './save';
import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';
import { PREFIX } from '../../utils/constants';
import './style.scss';

/**
 * Register block type definition.
 *
 * @author WebDevStudios
 * @since 2.0.0
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType('wdsblocks/accordion', {
	title: __('Accordion Block (wds)', 'wdsblocks'),
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
			selector: `.${PREFIX}-accordion__title`,
		},
		clientId: {
			type: 'string',
			default: 'accordion-item',
		},
	},
	edit,
	save,
});
