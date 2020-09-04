import edit from './edit';
import save from './save';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { PREFIX } from '../../utils/config';
import './frontend/style.scss';

const BLOCKNAME = 'accordion';

/**
 * Register block type definition.
 *
 * @author WebDevStudios
 * @since 2.0.0
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( `wdsblocks/${ BLOCKNAME }`, {
	title: __( 'Accordion', 'wdsblocks' ),
	description: __(
		'An expand and collaspe editible content section.',
		'wdsblocks'
	),
	icon: 'sort',
	category: 'wds-blocks',
	keywords: [ __( 'accordion', 'wdsblocks' ) ],
	supports: {
		html: false,
		anchor: true,
	},
	parent: [ 'wdsblocks/accordion-group' ],
	attributes: {
		title: {
			type: 'array',
			source: 'children',
			selector: `.wp-block-${ PREFIX }-${ BLOCKNAME }__title`,
		},
		clientId: {
			type: 'string',
			default: `${ BLOCKNAME }-item`,
		},
	},
	example: {
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content: __(
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et eros eu felis.'
					),
				},
			},
		],
	},
	edit,
	save,
} );
