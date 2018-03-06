/**
 * Set inline styles.
 * @param {object} props - The block object.
 * @return {object} The inline text color CSS.
 */
function TextOptionsInlineStyles( props ) {
	return {
		color: props.attributes.textColor ? props.attributes.textColor : null,
	};
}

export default TextOptionsInlineStyles;
