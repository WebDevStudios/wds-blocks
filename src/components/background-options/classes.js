/**
 * Set inline CSS class.
 * @param {object} props - The block object.
 * @return {array} The inline CSS class.
 */
export const BackgroundOptionsClasses = ( props ) => {
	return [
		{ 'has-image-background has-custom-background': 'image' === props.attributes.backgroundType },
		{ 'has-color-background has-custom-background': 'color' === props.attributes.backgroundType },
		{ 'has-video-background has-custom-background': 'video' === props.attributes.backgroundType },
	];
};
