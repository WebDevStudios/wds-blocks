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
registerBlockType('wdsblocks/carousel', {
    title: __('Carousel Block', 'wdsblocks'),
    icon: 'slides',
    category: 'wds-blocks',
    keywords: [__('carousel, slider', 'wdsblocks')],
    attributes: {},
    supports: {
        align: [ 'wide', 'full' ],
        default: 'wide',
    },
    edit,
    save,
});
