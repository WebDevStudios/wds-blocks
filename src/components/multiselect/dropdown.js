/**
 * Externals
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

class DropDown extends Component {
	render() {
		const { items, handleChange } = this.props;

		return (
			<div className={ 'select-dropdown' }>
				{ items.length > 0 ?
					items.map( ( itemObject ) => {
						const item = itemObject.post;

						// init [ {} ]
						// change [ { post: {}, checked: bool } ]

						return ( <Fragment key={ `${ item.name }-${ item.id } ` }>
							<input
								id={ item.id }
								type="checkbox"
								value={ item.name }
								onChange={ handleChange( item ) }
								ref={ input => this[ `checkbox${ item.name }` ] = input }
								checked={ item.checked } // true || false
							/>
							<label htmlFor={ item.id }>{ item.name }</label>
						</Fragment> );
					} ) : ( null ) }
			</div>
		);
	}
}

export default DropDown;

