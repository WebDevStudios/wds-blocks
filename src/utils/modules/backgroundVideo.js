const videoClass = 'wp-block-cover__video-background';

/**
 * Handle functionality related to background videos.
 *
 * @author WebDevStudios
 * @since  2.0.0
 */
const wdsBlocksBackgroundVideo = {
	/**
	 * Initial Background Video setup.
	 *
	 * @author WebDevStudios
	 * @since  2.0.0
	 *
	 * @return {?boolean} Return false if no videos found.
	 */
	init: () => {
		// Target background video elements.
		const videos = document.querySelectorAll( `video.${ videoClass }` );

		// Exit if no videos found.
		if ( ! videos.length ) {
			return false;
		}

		// Iterate over videos.
		videos.forEach( ( video ) => {
			// Mute videos.
			video.muted = true;
		} );
	},
};

export default wdsBlocksBackgroundVideo;
