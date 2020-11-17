import { PREFIX } from '../../../utils/config';

const starterClass = `wp-block-${ PREFIX }-starter`;

/**
 * Handle functionality related to the starter block block.
 *
 * @author WebDevStudios
 * @since  2.0.0
 */
const wdsBlocksStarter = {

	/**
	 * Initial starter block setup.
	 *
	 * @author WebDevStudios
	 * @since  2.0.0
	 *
	 * @return {?boolean} Return false if no the starter block found.
	 */
	init: () => {

		// Target starter block elements.
		const starter = document.querySelectorAll( `.${ starterClass }` );

		// Exit if no the starter block found.
		if ( ! starter.length ) {
			return false;
		}
	},
};

export default wdsBlocksStarter;
