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
registerBlockType( `${ PREFIX }/carousel`, {
	title: __( 'Carousel', 'wdsblocks' ),
	description: __(
		'A carousel with a call to action for each slide.',
		'wdsblocks'
	),
	icon: 'slides',
	category: 'wds-blocks',
	keywords: [ __( 'carousel, slider', 'wdsblocks' ) ],
	attributes: {
		showPreview: {
			type: 'boolean',
			default: true,
		},
		slideCount: {
			type: 'number',
			default: 0,
		},
	},
	providesContext: {
		[ `${ PREFIX }/carousel/showPreview` ]: 'showPreview',
	},
	supports: {
		align: [ 'wide', 'full' ],
		default: 'wide',
		html: false,
	},
	edit,
	save,
} );
