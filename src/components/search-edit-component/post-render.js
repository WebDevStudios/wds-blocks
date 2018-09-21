/**
 * WordPress dependencies
*/
import { isUndefined, pickBy } from 'lodash';

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
		const selectedResults = this.props.selectedResults;

		return (
			( undefined !== selectedResults && null !== selectedResults ) ? (
				selectedResults.map( post =>
					this.displayResultMarkup( post )
				)
			) : (
				null
			)
		);
	}
}

export default withSelect( ( select, props ) => {
	const { posts } = props;
	const { getEntityRecords } = select( 'core' );

	if ( undefined !== posts && '[]' !== posts ) {
		const selectedResultsQuery = JSON.parse( posts ).map( item => {
			return item.id;
		} );

		if ( 0 < selectedResultsQuery.length ) {
			const postQuery = pickBy( {
				_embed: 'embed',
				orderby: 'include',
				include: selectedResultsQuery,
			} );

			return {
				selectedResults: getEntityRecords( 'postType', 'post', postQuery ),
			};
		}
	}
} )( PostRenderer );
