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

		} );

	render() {
		const { tags, categories } = this.state;
		const selectedTags = this.state.selectedItems.post_tag;
		const selectedCategories = this.state.selectedItems.category;

		return (
			<div className="multiselect-wrapper">
				<Taxonomy
					selectedItems={ selectedTags }
					items={ tags }
					handleChange={ this.handleChange }
					checkStatus={ this.checkStatus }
					handleInputClick={ this.handleInputClick }
				/>
				<Taxonomy
					selectedItems={ selectedCategories }
					items={ categories }
					handleChange={ this.handleChange }
					checkStatus={ this.checkStatus }
					handleInputClick={ this.handleInputClick }
				/>
			</div>
		);
	}
}

export default MultiSelect;
