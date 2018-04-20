/**
 * Externals
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

class DropDown extends Component {
	render() {
		const { items, handleChange, checkStatus } = this.props;

		return (
			<div className={ `select-dropdown` }>
				{ items.map( ( item ) => (
					<Fragment key={ `${ item.name }-${ item.id } ` }>
						<input
							id={ item.id }
							type="checkbox"
							value={ item.name }
							onChange={ handleChange( item ) }
							ref={ input => this[ `checkbox${ item.name }` ] = input }
							checked={ checkStatus }
						/>
						<label htmlFor={ item.id }>{ item.name }</label>
					</Fragment>
				) ) }
			</div>
		);
	}
}

export default DropDown;

