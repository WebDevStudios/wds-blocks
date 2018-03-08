/**
 * Set Button Link output.
 * @param {object} props - The block object.
 * @return {string} The button markup.
 */
export const ButtonLinkOutput = props => {
	if ( ! props.attributes.buttonUrl ) {
		return null;
	}

	return (
		<a className="button" href={ props.attributes.buttonUrl }>
			{ props.attributes.buttonText }
		</a>
	);
};
