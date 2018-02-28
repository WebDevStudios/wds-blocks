/**
 * Set inline styles.
 * @param {object} props - The block object.
 * @return {object} The inline text color CSS.
 */
export const TextOptionsInlineStyles = ( props ) => {
	return {
		color: props.attributes.textColor ? props.attributes.textColor : null,
	};
};
