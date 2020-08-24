import edit from './edit';
import save from './save';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

/**
 * Register block type definition.
 *
 * @author WebDevStudios
 * @since 2.0.0
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType('wdsblocks/carousel-slide', {
    title: __('Carousel Slide Block', 'wdsblocks'),
    icon: 'cover-image',
    category: 'wds-blocks',
    keywords: [__('carousel', 'slider', 'wdsblocks')],
    attributes: {
        content: {
            type: 'array',
            source: 'children',
            selector: 'p',
        },
    },
    edit,
    save,
});
