export const BackgroundOptionsInlineStyles = ( props ) => {
	return {
		backgroundColor: 'color' === props.attributes.backgroundType ? props.attributes.backgroundColor : null,
		backgroundImage: 'image' === props.attributes.backgroundType && props.attributes.backgroundImage ? `url(${ props.attributes.backgroundImage.url })` : null,
	};
};
