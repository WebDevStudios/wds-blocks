import edit from './edit';
import save from './save';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import './frontend/style.scss';

/**
 * Register block type definition.
 *
 * @author WebDevStudios
 * @since  2.0.0
 * @see    https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'wdsblocks/carousel-slide', {
	title: __( 'Slide', 'wdsblocks' ),
	icon: 'cover-image',
	category: 'wds-blocks',
	keywords: [ __( 'carousel, slide', 'wdsblocks' ) ],
	attributes: {
		fontColor: {
			type: 'string',
			default: '',
		},
	},
	supports: {
		html: false,
	},
	edit,
	save,
} );
