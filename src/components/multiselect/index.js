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

		this.state = {
			selectedItems: {},
			expanded: true,
			tags: [],
			categories: [],
			inputValue: props.value,
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
					const newTags = tags.map( tag => {
						return {
							post: tag,
							checked: false,
						};
					} );
					this.setState( { tags: newTags } );
				} );
		}

		if ( this.props.categories ) {
			const catURL = this.composeURL( 'categories' );

			window.fetch( catURL )
				.then( res => res.json() )
				.then( categories => {
					const newCategories = categories.map( cat => {
						return {
							post: cat,
							checked: false,
						};
					} );
					this.setState( { categories: newCategories } );
				} );
		}
	}

	handleChange = item => () => {
		if ( ! this.state.selectedItems[ item.taxonomy ] ) {
			this.setState( ( prevState ) => {
				return {
					selectedItems: {
						...prevState.selectedItems,
						[ item.taxonomy ]: [ { post: item, checked: true } ],
						// checked is false
					},
				};
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
					[ item.taxonomy ]: [ ...prevState.selectedItems[ item.taxonomy ], { post: item, checked: true } ],
					// check is true
				},
			};
		} );
	};

	handleInputClick = item => () => {
		const newSelected = this.state.selectedItems[ item.taxonomy ].filter( selectedItem => selectedItem.id !== item.id );

		this.setState( ( prevState ) => {
			return {
				selectedItems: {
					...prevState.selectedItems,
					[ item.taxonomy ]: [ ...newSelected ],
				},
			};
		} );
	};

	render() {
		// const { onCategoryChange } = this.props;
		const { tags, categories } = this.state;
		const selectedTags = this.state.selectedItems.post_tag;
		const selectedCategories = this.state.selectedItems.category;

		return (
			<div className="multiselect-wrapper">
				<Taxonomy
					selectedItems={ selectedTags }
					items={ tags }
					handleChange={ this.handleChange }
					handleInputClick={ this.handleInputClick }
					// onClick={ ( ( items ) => onCategoryChange( { items } ) ) }
				/>
				<Taxonomy
					selectedItems={ selectedCategories }
					items={ categories }
					handleChange={ this.handleChange }
					handleInputClick={ this.handleInputClick }
					// onClick={ ( ( items ) => onCategoryChange( { items } ) ) }
				/>
			</div>
		);
	}
}

export default MultiSelect;
