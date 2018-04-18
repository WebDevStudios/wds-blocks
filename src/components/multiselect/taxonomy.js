/**
 * Externals.
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;

/**
 * Internals.
 */
import InputPanel from './input';
import DropDown from './dropdown';

const Taxonomy = ( props ) => {
	const { selectedItems, items, handleChange, checkStatus, handleInputClick } = props;
	return (
		<Fragment>
			<InputPanel
				selectedItems={ selectedItems }
				handleInputClick={ handleInputClick }
			/>
			<DropDown
				items={ items }
				handleChange={ handleChange }
				checkStatus={ checkStatus }
			/>
		</Fragment>
	);
}

export default Taxonomy;
