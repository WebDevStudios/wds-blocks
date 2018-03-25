const { Component, Fragment } = wp.element;

import Output from './output';
import Loader from '../../components/loader';
import Search from '../../components/search';

// Import our Block Title component.
import BlockTitle from '../../components/block-title';

class EditComponent extends Component {
	constructor( props ) {
		super( ...props );

		this.state = {
			page: 1,
			allPosts: [],
			selectedPosts: [],
			queriedPosts: [],
			isLoaded: false,
			atEnd: false,
			totalPosts: '',
			query: '',
		};

		this.apiURL = ( page ) => wpApiSettings.root + `wp/v2/posts?page=${ page }&per_page=5`;

		this.handleEvent = this.handleEvent.bind( this );
		this.fetchData = this.fetchData.bind( this );
		this.returnLayout = this.returnLayout.bind( this );
		this.returnQuery = this.returnQuery.bind( this );
	}

	handleEvent = clickedPost => {
		const { selectedPosts } = this.state;

		const postContainer = clickedPost.e.target;
		const postData = clickedPost.post;

		if ( postContainer.classList.contains( 'is-selected' ) ) {
			const i = selectedPosts.indexOf( postData );

			if ( i !== -1 ) {
				selectedPosts.splice( i, 1 );
			}
		} else {
			this.setState( {
				selectedPosts: selectedPosts.concat( postData ),
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
		if ( this.state.page === 1 && this.state.allPosts.length === 0 && this.state.queriedPosts.length === 0 ) {
			this.fetchData( this.state.page );
		}

		this.container.addEventListener( 'scroll', () => {
			if ( this.state.allPosts.length !== this.state.totalPosts && ( this.container.scrollTop === ( this.container.scrollHeight - this.container.offsetHeight ) ) ) {
				this.fetchData( this.state.page + 1 );
			} else {
				this.setState( { atEnd: true } );
			}
		} );
	}

	returnLayout = () => {
		return (
			<Fragment>
				<Output
					activeClass={ this.state.selectedPosts }
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
					onChange={ this.props.setAttributes( { selectedPosts: this.state.selectedPosts } ) }
				/>
			</Fragment>
		);
	}

	render() {
		return [
			<BlockTitle key=""
				{ ...this.props }
			/>,
			<Search
				key=""
				className="wds-related-posts-search-form"
				onQueryChange={ this.returnQuery }
			/>,
			<div key="" className={ this.props.className }>
				{ ! this.state.isLoaded ? <Loader key="" /> : null }
				{ this.returnLayout() }
			</div>,
		];
	}
}

export default EditComponent;
