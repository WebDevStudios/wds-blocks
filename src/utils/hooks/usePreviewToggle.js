import { useState } from 'react';

/**
 * The usePreviewToggle hook handles state for toggling between "edit" and "preview" modes.
 *
 * @author WebDevStudios
 * @since  2.0.0
 *
 * @return {Object} Object consisting of state variable and state toggle function.
 */
export default function usePreviewToggle() {
	const [ showPreview, setPreview ] = useState( true );

	/**
	 * Toggle between "edit" and "preview" modes by setting `showPreview` to the boolean inverse of its current value.
	 *
	 * @author WebDevStudios
	 * @since  2.0.0
	 */
	const togglePreview = () => {
		setPreview( ! showPreview );
	};

	/**
	 * Toggle block to "edit" mode on double click.
	 *
	 * @author WebDevStudios
	 * @since  2.0.0
	 */
	const doubleClick = () => {
		if ( showPreview ) {
			togglePreview();
		}
	};

	return {
		showPreview,
		togglePreview,
		doubleClick,
	};
}
