/**
 * WordPress dependencies
*/
const {
	withAPIData,
} = wp.components;

const { Component } = wp.element;

// Import all of our Text Options requirements.
import { TextOptionsInlineStyles } from '../../components/text-options';

class PostRenderer extends Component {
	constructor( props ) {
		super( ...props );
	}

	render() {
		const selectedPosts = this.props.selectedPostsJSONAlt.data;

		return (
			( selectedPosts !== undefined && selectedPosts.length > 0 ) ? (
				selectedPosts.map( post =>
					<li
						className="column"
						id={ `post-${ post.id }` }
						key={ `post-${ post.id }` }
						tabIndex="0"
					>
						{
							post._embedded !== undefined && post._embedded[ 'wp:featuredmedia' ] ? (
								<img
									src={ post._embedded[ 'wp:featuredmedia' ][ 0 ][ 'source_url' ] }
									alt=""
								/>
							) : (
								null
							)
						}
						<h3
							className="h1"
							style={ {
								...TextOptionsInlineStyles( this.props ),
							} }
						>{ post.title.rendered }</h3>
						<div
							dangerouslySetInnerHTML={ { __html: post.excerpt.rendered } }
							style={ {
								...TextOptionsInlineStyles( this.props ),
							} } />
					</li>
				)
			) : (
				null
			)
		);
	}
}

export default withAPIData( ( props ) => {
	const { posts } = props;

	if ( posts !== undefined && posts !== '[]' ) {
		const selectedPostsQuery = JSON.parse( posts ).map( item => {
			return `include[]=${ item.id }`;
		} );

		if ( selectedPostsQuery.length > 0 ) {
			const selectedPostsFilter = selectedPostsQuery.join( '&' );

			return {
				selectedPostsJSONAlt: `/wp/v2/posts?${ selectedPostsFilter }`,
			};
		}
	}
} )( PostRenderer );
