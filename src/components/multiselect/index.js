import './editor.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;

const { Component, Fragment } = wp.element;

class MultiSelect extends Component {
	static defaultProps = {
		tags: true,
		categories: true
	}

	constructor( props ) {
		super( props );

		this.APIRootURL = wpApiSettings.root + `wp/v2/`;

		this.state = {
			selectedItems: [],
			expanded: true,
			tags: [],
			categories: [],
			inputValue: props.value
		};
	}

	composeURL = suffix => {
		return this.APIRootURL + `${suffix}`;
	}

	componentDidMount() {
		if ( this.props.tags ) {
			const tagURL = this.composeURL( 'tags' );

			window.fetch( tagURL )
				.then( res => res.json() )
				.then( tags => this.setState({ tags }) );
		}

		if ( this.props.categories ) {
			const catURL = this.composeURL( 'categories' );

			window.fetch( catURL )
				.then( res => res.json() )
				.then( categories => this.setState({ categories }) );
		}
	}

	checkStatus = item => {

		const status = this.state.selectedItems.some( element => {
			return element === item;
		} );

		return status;
	}

	handleChange = item => () => {
		const inSelected = this.state.selectedItems.filter( selectedItem => selectedItem.id === item.id );

		if ( 0 < inSelected.length ) {
			return;
		}

		this.setState( ( prevState ) => {
			return {
				selectedItems: [ ...prevState.selectedItems, item ]
			}
		} );
	};

	handleInputClick = item => () => {
		const newSelected = this.state.selectedItems.filter( selectedItem => selectedItem.id !== item.id );

		this.setState({ selectedItems: newSelected });
	};

	renderDropdown = inputValue => {

		return (
			inputValue.map( ( item ) => (
				<Fragment key={ `${ item.name }-${ item.id } ` }>
					<input id={ item.id } type="checkbox" value={ item.name } onChange={ this.handleChange( item ) } ref={ input => this[ `checkbox${ item.name }` ] = input } checked={ this.checkStatus( item ) } />
					<label htmlFor={ item.id }>{ item.name }</label>
				</Fragment>
			) )
		);
	}

	toggleDropdown() {
		this.setState( {
			expanded: ! this.state.expanded,
		} );
	}

	hydrateInput( items ) {

		return (
			items.length > 0 ?
				items.map( ( item ) => (
					/* eslint-disable */
					<span key={ `${ item.name }-${ item.id } ` } className="item-pill" onClick={ this.handleInputClick( item ) }>
						{ item.name }
					</span>
					/* eslint-enable */
				) ) :
				'Select Items...'
		);
	}

	renderMultiSelect( items, selectedItems ) {
		return (
			<form>
				<div className="multiselect-wrapper">
					<div className={ 'select-input' }>
						{ this.hydrateInput( selectedItems ) }
					</div>
					<div className={ `select-dropdown ${ this.state.expanded ? 'shown' : 'hidden' }` }>
						{ this.renderDropdown( items ) }
					</div>

				</div>
			</form>
		)
	}

	render() {
		const { tags, categories } = this.state;
		console.log(categories);
		const { selectedItems } = this.state;

		return(
			<Fragment>
				{ this.renderMultiSelect( tags, selectedItems ) }
				{ this.renderMultiSelect( categories, selectedItems ) }
			</Fragment>
		)

		

	}
}

export default MultiSelect;
