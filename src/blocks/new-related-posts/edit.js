const { Component, Fragment } = wp.element;

import Output from './output';
import Loader from '../../components/loader';

// Import our Block Title component.
import BlockTitle from '../../components/block-title';

class EditComponent extends Component {
	constructor( props ) {
		super( ...props );

		this.state = {
			allPosts: [],
			selectedPosts: [],
			isLoaded: false,
		};

		this.handleEvent = this.handleEvent.bind( this );
		this.returnLayout = this.returnLayout.bind( this );
	}

	handleEvent = clickedPost => {
		const { allPosts, selectedPosts } = this.state;
		const inPosts = allPosts.some( result => result.id === clickedPost.id );

		this.setState( {
			allPosts: inPosts ?
				allPosts.filter( i => i.id !== clickedPost.id ) :
				[ ...allPosts, clickedPost ],
			selectedPosts: inPosts ?
				[ ...selectedPosts, clickedPost ] :
				selectedPosts.filter( i => i.id !== clickedPost.id ),
		} );
	};

	componentDidMount() {
		const apiURL = wpApiSettings.root + 'wp/v2/posts?per_page=100';

		return window.fetch( apiURL )
			.then( response => {
				response.json().then( data => ( {
					data: data,
					status: response.status,
				} ) ).then( res => {
					if ( res.status === 200 ) {
						this.setState( { allPosts: res.data, isLoaded: true } );
					}
				} );
			} );
	}

	returnLayout = () => {
		return (
			<Fragment>
				<Output
					title="Posts"
					className="related-left-column"
					key=""
					posts={ this.state.allPosts }
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
			<div key="" className={ this.props.className }>
				{ ! this.state.isLoaded ? <Loader key="" /> : null }
				{ this.returnLayout() }
			</div>,
		];
	}
}

export default EditComponent;
