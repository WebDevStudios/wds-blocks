export const OtherOptionsClasses = ( props ) => {
	return [
		props.attributes.animationType ? `animated ${ props.attributes.animationType }` : null,
	];
};
