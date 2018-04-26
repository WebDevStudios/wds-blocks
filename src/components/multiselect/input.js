/**
 * Externals
 */
const { __ } = wp.i18n;

const InputPanel = ( props ) => { // eslint-disable-line
	const { name, selectedItems, handleInputClick } = props;
	return (
		<div className={ 'select-input' }>
			{
				selectedItems && 0 < selectedItems.length ?
					selectedItems.map( ( post ) => {
						return (
						/* eslint-disable */
						<span key={ `${ post.name }-${ post.id } ` } tabindex="0" className="item-pill" onClick={ handleInputClick( post ) }>
						{ post.name }
					</span>
						/* eslint-enable */
						);
					} ) :
					<strong>{ __( 'Select ' ) + name + '.' }</strong>
			}
		</div>
	);
};

export default InputPanel;
