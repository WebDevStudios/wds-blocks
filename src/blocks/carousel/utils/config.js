import { PREFIX } from '../../../utils/config';

// Carousel settings.
export const GLIDE_SETTINGS = {
	autoplay: 5000,
	focusAt: 'center',
	gap: 0,
	type: 'carousel',
};

// Carousel InnerBlocks props.
export const INNER_BLOCKS_PROPS = {
	allowedBlocks: [ `${ PREFIX }/carousel-slide` ],
	template: [ [ `${ PREFIX }/carousel-slide`, {} ] ],
};
