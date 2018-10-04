/**
 * External dependencies
 */
import classnames from 'classnames'; // Import NPM libraries here.

/**
 * WordPress dependencies
 */
const {
	InspectorControls,
} = wp.editor;

const { Component, Fragment } = wp.element;

import Output from './output';
import Loader from '../../components/loader';
import Search from '../../components/search';
import PostRenderer from './post-render';
import './style.scss';
import './editor.scss';

// Import our Block Title component.
import BlockTitle from '../../components/block-title';

// Import all of our Background Options requirements.
import BackgroundOptions, { BackgroundOptionsClasses, BackgroundOptionsInlineStyles, BackgroundOptionsVideoOutput } from '../../components/background-options';

// Import all of our Text Options requirements.
import TextOptions, { TextOptionsInlineStyles, TextOptionsClasses } from '../../components/text-options';

// Import all of our Other Options requirements.
import OtherOptions, { OtherOptionsClasses } from '../../components/other-options';

class SearchEditComponent extends Component {
	constructor( props ) {
		super( ...props );

		this.state = {
			page: 1,
			allResults: [],
			selectedResultsJSON: '[]',
			selectedResults: [],
			queriedResults: [],
			isLoaded: false,
			atEnd: false,
			totalResults: '',
			query: '',
		};

		const queryFor = props.attributes.queryFor ? props.attributes.queryFor : 'posts';

		this.apiURL = ( page ) => wpApiSettings.root + `wp/v2/${ queryFor }?_embed&page=${ page }&per_page=6`;
		this.newApiURL = ( ids ) => wpApiSettings.root + `wp/v2/${ queryFor }?_embed&${ ids }&orderby=include`;
	}

	handleChange = ( selected ) => {
		this.setState( {
			selectedResults: selected,
			selectedResultsJSON: JSON.stringify( selected ),
		} );
		this.props.setAttributes( {
			selectedResults: selected,
			selectedResultsJSON: JSON.stringify( selected.map( item => item.id ) ),
		} );
	}

	handleEvent = clickedPost => {
		const { selectedResults } = this.state;

		const postContainer = clickedPost.e.target;
		const postDataObject = clickedPost.post;
		const postDataId = clickedPost.post.id;

		if ( postContainer.classList.contains( 'is-selected' ) ) {
			const selected = selectedResults.filter( post => post.id !== postDataId );
			this.handleChange( selected );
		} else {
			const selected = selectedResults.concat( postDataObject );
			this.handleChange( selected );
		}
	};

	returnQuery = response => {
		this.setState( {
			query: response.string,
			queriedResults: response.data,
			isLoaded: response.isLoaded,
		} );
	}

	fetchData = page => {
		this.setState( { isLoaded: false } );

		window.fetch( this.apiURL( page ) )
			.then( response => {
				if ( response.status === 200 ) {
					const total = parseInt( response.headers.get( 'X-WP-Total' ) );
					this.setState( { totalResults: total } );
					return response.json();
				}
				this.setState( { atEnd: true } );
				return [];
			} )
			.then( response => {
				this.setState( {
					page: page,
					allResults: this.state.allResults.concat( response ),
					isLoaded: true,
				} );
			} );
	}

	// Fetch data from ids of selected content.
	fetchSelectedData = props => {
		const { selectedResultsJSON } = props.attributes;

		this.setState( { isLoaded: false } );

		if ( selectedResultsJSON !== undefined ) {
			const selectedResultsQuery = JSON.parse( selectedResultsJSON ).map( item => {
				return `include[]=${ item }`;
			} );

			if ( selectedResultsQuery.length > 0 ) {
				const selectedResultsFilter = selectedResultsQuery.join( '&' );

				window.fetch( this.newApiURL( selectedResultsFilter ) )
					.then( response => {
						if ( response.status === 200 ) {
							return response.json();
						}
						return [];
					} )
					.then( response => {
						// Set state from existing attributes.
						this.setState( {
							selectedResultsJSON: JSON.stringify( response ),
							selectedResults: response,
							isLoaded: true,
						} );
					} );
			}
		}
	}

	handleScroll = () => {
		if ( this.state.allResults.length !== this.state.totalResults && ( this.container.scrollTop === ( this.container.scrollHeight - this.container.offsetHeight ) ) ) {
			this.fetchData( this.state.page + 1 );
		} else {
			this.setState( { atEnd: true } );
		}
	}

	componentDidMount() {
		this.container.addEventListener( 'scroll', this.handleScroll );

		this.fetchSelectedData( this.props );

		if ( this.state.page === 1 && this.state.allResults.length === 0 && this.state.queriedResults.length === 0 ) {
			this.fetchData( this.state.page );
		}
	}

	componentDidUpdate() {
		if ( !! this.props.isSelected ) {
			this.container.addEventListener( 'scroll', this.handleScroll );
		}
	}

	componentWillUnmount() {
		this.setState( { isLoaded: false } );
	}

	returnLayout = () => {
		return (
			<Fragment>
				<Output
					activeClass={ this.state }
					textRef={ ( element ) => this.container = element }
					title={ this.state.query !== '' ? `Queried ${ this.props.attributes.queryFor }` : this.props.attributes.queryFor }
					className="search-left-column"
					key={ `${ this.props.className }-left-column` }
					posts={ this.state.query !== '' ? this.state.queriedResults : this.state.allResults }
					handleEvent={ this.handleEvent }
					queryFor={ this.props.attributes.queryFor }
				/>
				<Output
					activeClass={ this.state }
					title={ `Selected ${ this.props.attributes.queryFor }` }
					className="search-right-column"
					key={ `${ this.props.className }-right-column` }
					posts={ this.state.selectedResults }
					handleEvent={ this.handleEvent }
					queryFor={ this.props.attributes.queryFor }
				/>
			</Fragment>
		);
	}

	render() {
		return [
			!! this.props.isSelected && (
				<InspectorControls key="inspector">
					{ BackgroundOptions( this.props ) }
					{ TextOptions( this.props ) }
					{ OtherOptions( this.props ) }
				</InspectorControls>
			),
			<section
				key={ this.props.className }
				className={ classnames(
					this.props.className,
					'wds-search-component-container',
					...BackgroundOptionsClasses( this.props ),
					...OtherOptionsClasses( this.props ),
					...TextOptionsClasses( this.props ),
				) }
				style={ ! this.props.isSelected && JSON.parse( this.state.selectedResultsJSON ).length > 0 ? {
					...BackgroundOptionsInlineStyles( this.props ),
					...TextOptionsInlineStyles( this.props ),
				} : {} }
			>

				{ ! this.props.isSelected && JSON.parse( this.state.selectedResultsJSON ).length > 0 ?
					BackgroundOptionsVideoOutput( this.props ) :
					null
				}

				<BlockTitle
					key="search-block-title"
					{ ...this.props }
				/>
				{ !! this.props.isSelected || JSON.parse( this.state.selectedResultsJSON ).length === 0 ? (
					[
						<Search
							key="search-component"
							className="wds-search-form"
							onQueryChange={ this.returnQuery }
							queryFor={ this.props.attributes.queryFor }
						/>,
						<div
							key="users-grid-container-search"
							className="search-container-list"
						>
							{ ! this.state.isLoaded ? <Loader key="search-loader" /> : null }
							{ this.returnLayout() }
						</div>,
					]
				) : (
					<div
						key="search-container-list"
						tabIndex="0"
						className="search-container-list"
					>
						{ ! this.state.isLoaded ? <Loader key="search-loader" /> : null }
						{ JSON.parse( this.state.selectedResultsJSON ).length > 0 ? ( <ul className="search-selected-container" tabIndex="0">
							<PostRenderer
								posts={ this.state.selectedResultsJSON }
								{ ...this.props }
							/>
						</ul> ) : ( null ) }
					</div>
				) }
			</section>,
		];
	}
}

export default SearchEditComponent;
