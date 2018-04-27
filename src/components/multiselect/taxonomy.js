/**
 * Externals.
 */
const { Fragment } = wp.element;

/**
 * Internals.
 */
import InputPanel from './input';
import DropDown from './dropdown';

const Taxonomy = ( props ) => { // eslint-disable-line
	const { name, selectedItems, items, handleChange, handleInputClick } = props;

	return (
		<Fragment>
			<InputPanel
				selectedItems={ selectedItems }
				handleInputClick={ handleInputClick }
				name={ name }
			/>
			<DropDown
				selectedItems={ selectedItems }
				items={ items }
				handleChange={ handleChange }
			/>
		</Fragment>
	);
};

export default Taxonomy;
