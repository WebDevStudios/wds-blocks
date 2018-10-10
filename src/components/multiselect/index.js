import './editor.scss';

/**
 * External libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;

/**
 * Internal components.
 */
import Taxonomy from './taxonomy';

class MultiSelect extends Component {
	static defaultProps = {
		tags: true,
		categories: true,
	}

	constructor( props ) {
		super( props );

		this.APIRootURL = wpApiSettings.root + 'wp/v2/';

		const taxonomies = this.props.attributes.taxonomies ? JSON.parse( this.props.attributes.taxonomies ) : {};

		this.state = {
			selectedItems: taxonomies,
			tags: [],
			categories: [],
		};
	}

	composeURL = suffix => {
		return this.APIRootURL + `${ suffix }`;
	}

	componentDidMount() { // eslint-disable-line

		// Grab the tags from the API.
		if ( this.props.tags ) {
			const tagURL = this.composeURL( 'tags' );

			window.fetch( tagURL )
				.then( res => res.json() )
				.then( tags => {
					this.setState( { tags } );
				} );
		}

		// Grab the categories from the API.
		if ( this.props.categories ) {
			const catURL = this.composeURL( 'categories' );

			window.fetch( catURL )
				.then( res => res.json() )
				.then( categories => {
					this.setState( { categories } );
				} );
		}
	}

	// For handling dropdown change.
	handleChange = item => () => { // eslint-disable-line

		// If no items have been selected, allow for dynamic object property creation.
		if ( ! this.state.selectedItems[ item.taxonomy ] ) {
			this.setState( ( prevState ) => {
				return {
					selectedItems: {
						...prevState.selectedItems,
						[ item.taxonomy ]: [ item ],
					},
				};
			} );

			// Set attributes.
			this.props.onCategoryChange( {
				...this.state.selectedItems,
				[ item.taxonomy ]: [ item ],
			} );

			return;
		}

		const inSelected = this.state.selectedItems[ item.taxonomy ].filter( selectedItem => selectedItem.id === item.id );

		if ( 0 < inSelected.length ) {
			return;
		}

		// Set state.
		this.setState( ( prevState ) => {
			return {
				selectedItems: {
					...prevState.selectedItems,
					[ item.taxonomy ]: [ ...prevState.selectedItems[ item.taxonomy ], item ],
				},
			};
		} );

		// Set attributes.
		this.props.onCategoryChange( {
			...this.state.selectedItems,
			[ item.taxonomy ]: [ ...this.state.selectedItems[ item.taxonomy ], item ],
		} );
	};

	// Handle when an input item is clicked.
	handleInputClick = item => ( e ) => {
		if ( e.type === 'click' || e.key === ' ' ) {
			const newSelected = this.state.selectedItems[ item.taxonomy ].filter( selectedItem => selectedItem.id !== item.id );

			// Set state.
			this.setState( ( prevState ) => {
				return {
					selectedItems: {
						...prevState.selectedItems,
						[ item.taxonomy ]: [ ...newSelected ],
					},
				};
			} );

			// Set attributes.
			this.props.onCategoryChange( {
				...this.state.selectedItems,
				[ item.taxonomy ]: [ ...newSelected ],
			} );
		}
	};

	render() {
		const { tags, categories } = this.state;

		return (
			<div className="components-base-control multiselect-wrapper">
				<Taxonomy
					selectedItems={ this.state.selectedItems.post_tag }
					items={ tags }
					name={ __( 'Tags' ) }
					handleChange={ this.handleChange }
					handleInputClick={ this.handleInputClick }
				/>
				<Taxonomy
					selectedItems={ this.state.selectedItems.category }
					items={ categories }
					name={ __( 'Categories' ) }
					handleChange={ this.handleChange }
					handleInputClick={ this.handleInputClick }
				/>
			</div>
		);
	}
}

export default MultiSelect;
