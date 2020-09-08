import edit from './edit';
import save from './save';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { PREFIX } from '../../utils/config';
import './frontend/style.scss';

const BLOCKNAME = 'accordions';

/**
 * Register block type definition.
 *
 * @author WebDevStudios
 * @since 2.0.0
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( `wdsblocks/${ BLOCKNAME }`, {
	title: __( 'Accordions (WDS)', 'wdsblocks' ),
	description: __(
		'Adds a group of expand/collapse blocks with optional headline and description fields.',
		'wdsblocks'
	),
	icon: 'list-view',
	category: 'wds-blocks',
	keywords: [ __( 'accordion', 'accordions', 'wdsblocks' ) ],
	supports: {
		align: [ 'full' ],
		default: 'none',
		html: false,
		anchor: true,
	},
	attributes: {
		title: {
			type: 'array',
			source: 'children',
			selector: `.wp-block-${ PREFIX }-${ BLOCKNAME }__title`,
			default: __( 'Enter a title…', 'wdsblocks' ),
		},
		desc: {
			type: 'array',
			source: 'children',
			selector: `.wp-block-${ PREFIX }-${ BLOCKNAME }__desc`,
			default: __( 'Enter a short description…', 'wdsblocks' ),
		},
		openFirst: {
			type: 'boolean',
			default: false,
		},
		toggle: {
			type: 'boolean',
			default: false,
		},
		fontColor: {
			type: 'string',
			default: undefined,
		},
		backgroundColor: {
			type: 'string',
			default: undefined,
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
