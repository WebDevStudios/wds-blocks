/**
 * Set inline CSS class.
 * @param {object} props - The block object.
 * @return {array} The inline CSS class.
 */
export const OtherOptionsClasses = ( props ) => {
	return [
		props.attributes.animationType ? `animated ${ props.attributes.animationType }` : null,
	];
};
