/**
 * Set inline CSS class.
 * @param {object} props - The block object.
 * @return {array} The inline CSS class.
 */
function TextOptionsClasses( props ) {
	return [
		props.attributes.textColor ? 'has-custom-font-color' : null
	];
}

export default TextOptionsClasses;
