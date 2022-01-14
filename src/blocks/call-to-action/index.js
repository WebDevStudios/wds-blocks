import edit from './edit';
// import save from './save';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
// import { PREFIX } from '../../utils/config';
// import './frontend/style.scss';

const BLOCKNAME = 'call-to-action';

/**
 * Register block type definition.
 *
 * @author WebDevStudios
 * @since 2.0.0
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( `wdsblocks/${ BLOCKNAME }`, {
	title: __( 'Call To Action (WDS)', 'wdsblocks' ),
	description: __(
		'A call to action block with Richtext heading and buttons.',
		'wdsblocks'
	),
	icon: 'megaphone',
	category: 'wds-blocks',
	keywords: [
		__( 'action', 'wdsblocks' ),
		__( 'call', 'wdsblocks' ),
		__( 'call to action', 'wdsblocks' ),
	],
	supports: {
		align: [ 'full', 'wide' ],
		default: 'none',
		html: false,
		anchor: true,
	},
	attributes: {
		title: {
			type: 'string',
			default: '',
		},
		toggle: {
			type: 'boolean',
			default: false,
		},
		fontColor: {
			type: 'string',
			default: undefined,
		},
		customFontColor: {
			type: 'string',
			default: undefined,
		},
		backgroundColor: {
			type: 'string',
			default: undefined,
		},
		customBackgroundColor: {
			type: 'string',
			default: undefined,
		},
	},
	// example: {
	// 	innerBlocks: [
	// 		{
	// 			name: 'core/button',
	// 			attributes: {
	// 				content: __(
	// 					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et eros eu felis.'
	// 				),
	// 			},
	// 		},
	// 	],
	// },
	edit,
	// save,
} );
