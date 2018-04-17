import './editor.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;

const { Component, Fragment } = wp.element;

class MultiSelect extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			selectedItems: [],
			expanded: true,
			inputValue: props.value,
		};
	}

	handleChange = ( event ) => {
		const selectedItems = this.state.selectedItems;
		const value = event.target.value;

		if ( selectedItems.length === 0 ) {
			selectedItems.push( value );
			this.setState( {
				selectedItems: selectedItems,
			} );
		} else {
			for ( let i = 0; i < selectedItems.length; i++ ) {
				if ( value === selectedItems[ i ] ) {
					selectedItems.splice( i, 1 );
					this.setState( {
						selectedItems: selectedItems,
					} );
					return;
				}
			}
			selectedItems.push( value );
			this.setState( {
				selectedItems: selectedItems,
			} );
		}
	}

	handleClick = ( event ) => {
		const selectedItems = this.state.selectedItems;
		const value = event.target.innerText;

		if ( selectedItems.length === 0 ) {
			selectedItems.push( value );
			this.setState( {
				selectedItems: selectedItems,
			} );
		} else {
			for ( let i = 0; i < selectedItems.length; i++ ) {
				if ( value === selectedItems[ i ] ) {
					selectedItems.splice( i, 1 );
					this.setState( {
						selectedItems: selectedItems,
					} );
					return;
				}
			}
			selectedItems.push( value );
			this.setState( {
				selectedItems: selectedItems,
			} );
		}
	}

	checkStatus = ( item ) => {
		// this[ `checkbox${ value }` ]

		const status = this.state.selectedItems.some( element => {
			return element === item;
		} );

		return status;
	}

	renderDropdown = () => {
		const inputValue = this.state.inputValue;

		return (
			inputValue.map( ( item, index ) => (
				<Fragment key={ `${ item }-${ index } ` }>
					<input id={ item } type="checkbox" value={ item } onChange={ this.handleChange } ref={ input => this[ `checkbox${ item }` ] = input } checked={ this.checkStatus( item ) } />
					<label htmlFor={ item }>{ item }</label>
				</Fragment>
			) )
		);
	}

	toggleDropdown() {
		this.setState( {
			expanded: ! this.state.expanded,
		} );
	}

	hydrateInput() {
		const items = this.state.selectedItems;
		return (
			items.length > 0 ?
				items.map( ( item, index ) => (
					/* eslint-disable */
					<span key={ `${ item }-${ index } ` } className="item-pill" onClick={ this.handleClick }>
						{ item }
					</span>
					/* eslint-enable */
				) ) :
				'Select Items...'
		);
	}

	render() {
		return (
			<form>
				<div className="multiselect-wrapper">
					<div className={ 'select-input' }>
						{ this.hydrateInput() }
					</div>
					<div className={ `select-dropdown ${ this.state.expanded ? 'shown' : 'hidden' }` }>
						{ this.renderDropdown() }
					</div>

				</div>
			</form>
		);
	}
}

export default MultiSelect;
