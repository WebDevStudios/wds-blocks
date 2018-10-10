/**
 * Externals
 */
const { Component, Fragment } = wp.element;

class DropDown extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			selectedItems: this.props.selectedItems ? this.props.selectedItems : [],
		};
	}

	static getDerivedStateFromProps( nextProps, prevState ) {

		if ( nextProps.selectedItems !== undefined ) {
			return {
				selectedItems: nextProps.selectedItems
			};
		}

		return null;
	}

	render() {
		const { items, handleChange } = this.props;

		return (
			<div className={ 'select-dropdown' }>
				{ 0 < items.length ?
					items.map( ( post ) => {
						const matched = this.state.selectedItems.filter( selectedItem => selectedItem.id === post.id );

						return ( <Fragment key={ `${ post.name }-${ post.id } ` }>
							<input
								id={ post.id }
								type="checkbox"
								className={ matched && 0 < matched.length ? 'checked' : 'not-checked' }
								value={ post.name }
								onChange={ handleChange( post ) }
								ref={ input => this[ `checkbox${ post.name }` ] = input }
								checked={ !! matched.length } // true || false
								tabIndex="0"
							/>
							<label htmlFor={ post.id }>{ post.name }</label>
						</Fragment> );
					} ) : ( null ) }

			</div>
		);
	}
}

export default DropDown;

