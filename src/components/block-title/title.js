/**
 * Set Block Title output.
 * @param {object} props - The block object.
 * @return {string} The Block Title container.
 */
export const BlockTitleOutput = ( props ) => {
	if ( ! props.attributes.blockTitle ) {
		return null;
	}

	return (
		<header className="content-block-header">
			<h2>{ props.attributes.blockTitle }</h2>
		</header>
	);
};
