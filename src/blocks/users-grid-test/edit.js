/**
 * External dependencies
 */
import classnames from 'classnames'; // Import NPM libraries here.

/**
 * WordPress dependencies
 */
const {
	InspectorControls,
} = wp.blocks;

const { Component, Fragment } = wp.element;

import Output from './output';
import Loader from '../../components/loader';
import Search from '../../components/search';
import PostRenderer from './post-render';

// Import our Block Title component.
import BlockTitle from '../../components/block-title';

// Import all of our Background Options requirements.
import BackgroundOptions, { BackgroundOptionsClasses, BackgroundOptionsInlineStyles, BackgroundOptionsVideoOutput } from '../../components/background-options';

// Import all of our Text Options requirements.
import TextOptions, { TextOptionsInlineStyles } from '../../components/text-options';

// Import all of our Other Options requirements.
import OtherOptions, { OtherOptionsClasses } from '../../components/other-options';

class EditComponent extends Component {
	constructor( props ) {
		super( ...props );

		this.state = {
			page: 1,
			allPosts: [],
			selectedPostsJSON: '[]',
			selectedPosts: [],
			queriedPosts: [],
			isLoaded: false,
			atEnd: false,
			totalPosts: '',
			query: '',
		};

		this.apiURL = ( page ) => wpApiSettings.root + `wp/v2/users?&page=${ page }&per_page=6`;
		this.newApiURL = ( ids ) => wpApiSettings.root + `wp/v2/users?&${ ids }`;
	}

	handleChange = ( selected ) => {
		this.setState( {
			selectedPosts: selected,
			selectedPostsJSON: JSON.stringify( selected ),
		} );
		this.props.setAttributes( {
			selectedPosts: selected,
			selectedPostsJSON: JSON.stringify( selected.map( item => item.id ) ),
		} );
	}

	handleEvent = clickedPost => {
		const { selectedPosts } = this.state;

		const postContainer = clickedPost.e.target;
		const postDataObject = clickedPost.post;
		const postDataId = clickedPost.post.id;

		if ( postContainer.classList.contains( 'is-selected' ) ) {
			const selected = selectedPosts.filter( post => post.id !== postDataId );
			this.handleChange( selected );
		} else {
			const selected = selectedPosts.concat( postDataObject );
			this.handleChange( selected );
		}
	};

	returnQuery = response => {
		this.setState( {
			query: response.string,
			queriedPosts: response.data,
			isLoaded: response.isLoaded,
		} );
	}

	fetchData = page => {
		this.setState( { isLoaded: false } );

		window.fetch( this.apiURL( page ) )
			.then( response => {
				if ( response.status === 200 ) {
					const total = parseInt( response.headers.get( 'X-WP-Total' ) );
					this.setState( { totalPosts: total } );
					return response.json();
				}
				this.setState( { atEnd: true } );
				return [];
			} )
			.then( response => {
				this.setState( {
					page: page,
					allPosts: this.state.allPosts.concat( response ),
					isLoaded: true,
				} );
			} );
	}

	// Fetch data from ids of selected content.
	fetchSelectedData = props => {
		const { selectedPostsJSON } = props.attributes;

		this.setState( { isLoaded: false } );

		if ( selectedPostsJSON !== undefined ) {
			const selectedPostsQuery = JSON.parse( selectedPostsJSON ).map( item => {
				return `include[]=${ item }`;
			} );

			if ( selectedPostsQuery.length > 0 ) {
				const selectedPostsFilter = selectedPostsQuery.join( '&' );

				window.fetch( this.newApiURL( selectedPostsFilter ) )
					.then( response => {
						if ( response.status === 200 ) {
							return response.json();
						}
						return [];
					} )
					.then( response => {
						// Set state from existing attributes.
						this.setState( {
							selectedPostsJSON: JSON.stringify( response ),
							selectedPosts: response,
							isLoaded: true,
						} );
					} );
			}
		}
	}

	handleScroll = () => {
		if ( this.state.allPosts.length !== this.state.totalPosts && ( this.container.scrollTop === ( this.container.scrollHeight - this.container.offsetHeight ) ) ) {
			this.fetchData( this.state.page + 1 );
		} else {
			this.setState( { atEnd: true } );
		}
	}

	componentDidMount() {
		this.container.addEventListener( 'scroll', this.handleScroll );

		this.fetchSelectedData( this.props );

		if ( this.state.page === 1 && this.state.allPosts.length === 0 && this.state.queriedPosts.length === 0 ) {
			this.fetchData( this.state.page );
		}
	}

	componentDidUpdate() {
		if ( !! this.props.focus ) {
			this.container.addEventListener( 'scroll', this.handleScroll );
		}
	}

	componentWillUnmount() {
		this.container.removeEventListener( 'scroll', this.handleScroll() );
	}

	returnLayout = () => {
		return (
			<Fragment>
				<Output
					activeClass={ this.state }
					textRef={ ( element ) => this.container = element }
					title={ this.state.query !== '' ? 'Queried Users' : 'Users' }
					className="related-left-column"
					key="related-left-column"
					posts={ this.state.query !== '' ? this.state.queriedPosts : this.state.allPosts }
					handleEvent={ this.handleEvent }
				/>
				<Output
					activeClass={ this.state }
					title="Selected Users"
					className="related-right-column"
					key="related-right-column"
					posts={ this.state.selectedPosts }
					handleEvent={ this.handleEvent }
				/>
			</Fragment>
		);
	}

	render() {
		return [
			!! this.props.focus && (
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
					...BackgroundOptionsClasses( this.props ),
					...OtherOptionsClasses( this.props ),
				) }
				style={ ! this.props.focus && JSON.parse( this.state.selectedPostsJSON ).length > 0 ? {
					...BackgroundOptionsInlineStyles( this.props ),
					...TextOptionsInlineStyles( this.props ),
				} : {} }
			>

				{ ! this.props.focus && JSON.parse( this.state.selectedPostsJSON ).length > 0 ?
					BackgroundOptionsVideoOutput( this.props ) :
					null
				}

				<BlockTitle
					key="related-block-title"
					{ ...this.props }
				/>
				{ !! this.props.focus || JSON.parse( this.state.selectedPostsJSON ).length === 0 ? (
					[
						<Search
							key="related-block-search"
							className="wds-related-posts-search-form"
							onQueryChange={ this.returnQuery }
						/>,
						<div
							key="related-block-container-search"
							className="related-block-container-list"
						>
							{ ! this.state.isLoaded ? <Loader key="related-block-loader" /> : null }
							{ this.returnLayout() }
						</div>,
					]
				) : (
					<div
						key="related-block-container-list"
						tabIndex="0"
						className="related-block-container-list"
					>
						{ ! this.state.isLoaded ? <Loader key="selected-posts-block-loader" /> : null }
						{ JSON.parse( this.state.selectedPostsJSON ).length > 0 ? ( <ul className="selected-posts-container" tabIndex="0">
							<PostRenderer
								posts={ this.state.selectedPostsJSON }
								{ ...this.props }
							/>
						</ul> ) : ( null ) }
					</div>
				) }
			</section>,
		];
	}
}

export default EditComponent;
