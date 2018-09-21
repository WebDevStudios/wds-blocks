/**
 * WordPress dependencies
*/
const {
	withSelect,
} = wp.data;

const { Component } = wp.element;

// Import all of our Text Options requirements.
import { TextOptionsInlineStyles } from '../../components/text-options';

class PostRenderer extends Component {
	constructor( props ) {
		super( ...props );
	}

	displayResultMarkup( post ) {
		if ( 'users' === this.props.attributes.queryFor ) {
			return (
				<li
					className="column"
					id={ `post-${ post.id }` }
					key={ `post-${ post.id }` }
					tabIndex="0"
				>
					<h3
						className="h1"
						style={ {
							...TextOptionsInlineStyles( this.props ),
						} }
					>{ post.name }</h3>
					<img
						src={ post.avatar_urls[ 96 ] }
						alt=""
					/>
					{ post.description ? <p>{ post.description }</p> : null }
				</li>
			);
		}

		return (
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
					} }
				/>
			</li>
		);
	}

	render() {
		const selectedResults = this.props.selectedResultsJSONAlt.data;

		return (
			( undefined !== selectedResults && 0 < selectedResults.length ) ? (
				selectedResults.map( post =>
					this.displayResultMarkup( post )
				)
			) : (
				null
			)
		);
	}
}

export default withSelect( ( props ) => {
	const { posts } = props;

	if ( undefined !== posts && '[]' !== posts ) {
		const selectedResultsQuery = JSON.parse( posts ).map( item => {
			return `include[]=${ item.id }&orderby=include`;
		} );

		if ( 0 < selectedResultsQuery.length ) {
			const selectedResultsFilter = selectedResultsQuery.join( '&' );

			return {
				selectedResultsJSONAlt: `/wp/v2/${ props.attributes.queryFor }?_embed&${ selectedResultsFilter }&orderby=include`,
			};
		}
	}
} )( PostRenderer );
