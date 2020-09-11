import FastAverageColor from 'fast-average-color';
import { useEffect, useState } from 'react';

/**
 * Retrieve current or new instance of `FastAverageColor`.
 *
 * @author WebDevStudios
 * @since  2.1.0
 *
 * @return {Object} Instance of `FastAverageColor`.
 */
function retrieveFastAverageColor() {
	if ( ! retrieveFastAverageColor.fastAverageColor ) {
		retrieveFastAverageColor.fastAverageColor = new FastAverageColor();
	}

	return retrieveFastAverageColor.fastAverageColor;
}

/**
 * The useMediaAverageColor hook handles state for determining the average color of a given media element by URL.
 *
 * @author WebDevStudios
 * @since  2.1.0
 *
 * @param  {?Element} mediaElement Media element to process.
 * @return {Object}                Object consisting of state variable.
 */
export default function useMediaAverageColor( mediaElement ) {
	const [ color, setColor ] = useState( null );

	useEffect( () => {
		if ( ! mediaElement ) {
			setColor( null );
			return;
		}

		// Attempt to retrieve average color.
		setColor( retrieveFastAverageColor().getColor( mediaElement ) );
	}, [ mediaElement ] );

	return { color };
}
