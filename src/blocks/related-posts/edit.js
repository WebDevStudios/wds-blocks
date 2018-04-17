/**
 * External dependencies
 */
import classnames from 'classnames'; // Import NPM libraries here.

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
	InspectorControls,
} = wp.blocks;

const { Component, Fragment } = wp.element;

import Output from './output';
import Loader from '../../components/loader';
import Search from '../../components/search';
import PostOutput from './post';

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

		this.apiURL = ( page ) => wpApiSettings.root + `wp/v2/posts?_embed&page=${ page }&per_page=5`;

		this.handleEvent = this.handleEvent.bind( this );
		this.fetchData = this.fetchData.bind( this );
		this.returnLayout = this.returnLayout.bind( this );
		this.returnQuery = this.returnQuery.bind( this );
	}

	handleEvent = clickedPost => {
		const { selectedPosts } = this.state;

		const postContainer = clickedPost.e.target;
		const postDataObject = clickedPost.post;
		const postDataId = clickedPost.post.id;

		if ( postContainer.classList.contains( 'is-selected' ) ) {
			this.setState( {
				selectedPosts: selectedPosts.filter( post => post.id !== postDataId ),
			} );
		} else {
			this.setState( {
				selectedPosts: selectedPosts.concat( postDataObject ),
			} );
		}
	};

	returnQuery( response ) {
		this.setState( { query: response.string, queriedPosts: response.data } );
	}

	fetchData( page ) {
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
	componentDidMount() {
		const { selectedPostsJSON } = this.props.attributes;

		// Set state from existing attributes.
		this.setState( {
			selectedPostsJSON: selectedPostsJSON ? selectedPostsJSON : '[]',
			selectedPosts: selectedPostsJSON ? JSON.parse( selectedPostsJSON ) : [],
		} );

		if ( this.state.page === 1 && this.state.allPosts.length === 0 && this.state.queriedPosts.length === 0 ) {
			this.fetchData( this.state.page );
		}

		if ( !! this.props.focus ) {
			this.container.addEventListener( 'scroll', () => {
				if ( this.state.allPosts.length !== this.state.totalPosts && ( this.container.scrollTop === ( this.container.scrollHeight - this.container.offsetHeight ) ) ) {
					this.fetchData( this.state.page + 1 );
				} else {
					this.setState( { atEnd: true } );
				}
			} );
		}
	}

	returnLayout = () => {
		return (
			<Fragment>
				<Output
					activeClass={ this.state }
					textRef={ ( element ) => this.container = element }
					title={ this.state.query !== '' ? 'Quieried Posts' : 'Posts' }
					className="related-left-column"
					key=""
					posts={ this.state.query !== '' ? this.state.queriedPosts : this.state.allPosts }
					handleEvent={ this.handleEvent }
				/>
				<Output
					activeClass={ this.state }
					title="Selected Posts"
					className="related-right-column"
					key=""
					posts={ this.state.selectedPosts }
					handleEvent={ this.handleEvent }
					onChange={ this.props.setAttributes( {
						selectedPostsJSON: JSON.stringify( this.state.selectedPosts ),
						selectedPosts: this.state.selectedPosts,
					} ) }
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
				style={ ! this.props.focus && JSON.parse( this.props.attributes.selectedPostsJSON ).length > 0 ? {
					...BackgroundOptionsInlineStyles( this.props ),
					...TextOptionsInlineStyles( this.props ),
				} : {} }
			>

				{ ! this.props.focus && JSON.parse( this.props.attributes.selectedPostsJSON ).length > 0 ?
					BackgroundOptionsVideoOutput( this.props ) :
					null
				}

				<BlockTitle
					key="related-block-title"
					{ ...this.props }
				/>
				{ !! this.props.focus || JSON.parse( this.props.attributes.selectedPostsJSON ).length === 0 ? (
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
						<ul className="selected-posts-container" tabIndex="0">
							<PostOutput
								{ ...this.props }
							/>
						</ul>
					</div>
				) }
			</section>,
		];
	}
}

export default EditComponent;
