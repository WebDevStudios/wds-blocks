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
		const selectedUsers = this.props.selectedUsersJSONAlt.data;

		return (
			( selectedUsers !== undefined && selectedUsers.length > 0 ) ? (
				selectedUsers.map( post =>
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
		const selectedUsersQuery = JSON.parse( posts ).map( item => {
			return `include[]=${ item.id }`;
		} );

		if ( selectedUsersQuery.length > 0 ) {
			const selectedUsersFilter = selectedUsersQuery.join( '&' );

			return {
				selectedUsersJSONAlt: `/wp/v2/users?&${ selectedUsersFilter }`,
			};
		}
	}
} )( PostRenderer );
