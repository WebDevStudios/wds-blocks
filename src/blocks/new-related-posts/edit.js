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
		};

		this.apiURL = ( page ) => wpApiSettings.root + `wp/v2/posts?page=${ page }&per_page=5`;

		this.handleEvent = this.handleEvent.bind( this );
		this.fetchData = this.fetchData.bind( this );
		this.returnLayout = this.returnLayout.bind( this );
		this.returnQueryData = this.returnQueryData.bind( this );
	}

	handleEvent = clickedPost => {
		const { allPosts, queriedPosts, selectedPosts } = this.state;
		const inPosts = allPosts.some( result => result.id === clickedPost.id );
		// const alreadySelected = selectedPosts.some( result => result.id === clickedPost.id );
		// const inQuery = queriedPosts.some( result => result.id === clickedPost.id );

		this.setState( {
			allPosts: inPosts ?
				allPosts.filter( i => i.id !== clickedPost.id ) :
				[ ...allPosts, clickedPost ],
			selectedPosts: inPosts ?
				[ ...selectedPosts, clickedPost ] :
				selectedPosts.filter( i => i.id !== clickedPost.id ),
		} );
	};

	returnQueryData( responseQuery ) {
		this.setState( { queriedPosts: responseQuery } );
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
					textRef={ ( element ) => this.container = element }
					title="Posts"
					className="related-left-column"
					key=""
					posts={ this.state.queriedPosts.length > 0 ? this.state.queriedPosts : this.state.allPosts }
					handleEvent={ this.handleEvent }
				/>
				<Output
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
			<Search key="" className="wds-related-posts-search-form" onQueryChange={ this.returnQueryData } />,
			<div key="" className={ this.props.className }>
				{ ! this.state.isLoaded ? <Loader key="" /> : null }
				{ this.returnLayout() }
			</div>,
		];
	}
}

export default EditComponent;
