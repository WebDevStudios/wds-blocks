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
		categories: true
	}

	constructor( props ) {
		super( props );

		this.APIRootURL = wpApiSettings.root + 'wp/v2/';

		const taxonomies = this.props.attributes.taxonomies ? JSON.parse( this.props.attributes.taxonomies ) : {};

		this.state = {
			selectedItems: taxonomies,
			tags: [],
			categories: []
		};
	}

	composeURL = suffix => {
		return this.APIRootURL + `${ suffix }`;
	}

	componentDidMount() {
		if ( this.props.tags ) {
			const tagURL = this.composeURL( 'tags' );

			window.fetch( tagURL )
				.then( res => res.json() )
				.then( tags => {
					this.setState( { tags } );
				} );
		}

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
	handleChange = item => () => {
		if ( ! this.state.selectedItems[ item.taxonomy ] ) {
			this.setState( ( prevState ) => {
				return {
					selectedItems: {
						...prevState.selectedItems,
						[ item.taxonomy ]: [ item ]
					}
				};
			} );

			this.props.onCategoryChange( {
				...this.state.selectedItems,
				[ item.taxonomy ]: [ item ]
			} );

			return;
		}

		const inSelected = this.state.selectedItems[ item.taxonomy ].filter( selectedItem => selectedItem.id === item.id );

		if ( 0 < inSelected.length ) {
			return;
		}

		this.setState( ( prevState ) => {
			return {
				selectedItems: {
					...prevState.selectedItems,
					[ item.taxonomy ]: [ ...prevState.selectedItems[ item.taxonomy ], item ]
				}
			};
		} );

		this.props.onCategoryChange( {
			...this.state.selectedItems,
			[ item.taxonomy ]: [ ...this.state.selectedItems[ item.taxonomy ], item ]
		} );
	};

	handleInputClick = item => () => {
		const newSelected = this.state.selectedItems[ item.taxonomy ].filter( selectedItem => selectedItem.id !== item.id );

		this.setState( ( prevState ) => {
			return {
				selectedItems: {
					...prevState.selectedItems,
					[ item.taxonomy ]: [ ...newSelected ]
				}
			};
		} );

		this.props.onCategoryChange( {
			...this.state.selectedItems,
			[ item.taxonomy ]: [ ...newSelected ]
		} );
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
