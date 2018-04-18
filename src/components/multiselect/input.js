/**
 * Externals
 */
const { __ } = wp.i18n;

const InputPanel = ( props ) => {
	const { selectedItems, handleInputClick } = props;
	return (
		<div className={ 'select-input' }>
			{
				selectedItems && 0 < selectedItems.length ?
					selectedItems.map( ( item ) => (
						/* eslint-disable */
						<span key={ `${ item.name }-${ item.id } ` } className="item-pill" onClick={ handleInputClick( item ) }>
						{ item.name }
					</span>
						/* eslint-enable */
					) ) :
					__( 'Select Items...' )
			}
		</div>
	);
};

export default InputPanel;
