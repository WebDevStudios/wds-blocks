import edit from './edit';
import save from './save';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { PREFIX } from '../../utils/config';
import './frontend/style.scss';

/**
 * Register block type definition.
 *
 * @author WebDevStudios
 * @since  2.0.0
 * @see    https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( `${ PREFIX }/carousel-slide`, {
	title: __( 'Slide', 'wdsblocks' ),
	description: __(
		'An individual carousel slide with optional title, content, and CTA button(s).',
		'wdsblocks'
	),
	icon: 'cover-image',
	category: 'wds-blocks',
	keywords: [ __( 'carousel, slide', 'wdsblocks' ) ],
	attributes: {
		fontColor: {
			type: 'string',
			default: undefined,
		},
		customFontColor: {
			type: 'string',
			default: undefined,
		},
		backgroundType: {
			type: 'string',
			default: 'none',
		},
		backgroundColor: {
			type: 'string',
			default: undefined,
		},
		customBackgroundColor: {
			type: 'string',
			default: undefined,
		},
		backgroundImage: {
			type: 'object',
			default: undefined,
		},
		backgroundVideo: {
			type: 'object',
			default: undefined,
		},
	},
	usesContext: [ `${ PREFIX }/carousel/showPreview` ],
	supports: {
		html: false,
	},
	parent: [ `${ PREFIX }/carousel` ],
	getEditWrapperProps() {
		return {
			className: 'glide__slide',
		};
	},
	edit,
	save,
} );
