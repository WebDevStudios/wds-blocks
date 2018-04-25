const Item = ( props ) => {
	const { handleClick, post, postName, isActive } = props;

	// Set classname if post.id exists in selected posts.
	function className() {
		// If current post is in selectedPosts.
		if ( post && undefined !== isActive ) {
			if ( isActive.selectedPosts.filter( e => e.id === post.id ).length > 0 ) {
				return post.slug + ' is-selected';
			}

			return post.slug;
		}
	}
	/* eslint-disable */
	return (
		<li
			className={ className() }
			tabIndex="0"
			onClick={ ( ( e ) => handleClick( { e, post } ) ) }
			onKeyPress={ ( ( e ) => e.key === 'Enter' ? handleClick( { e, post } ) : null ) }
		>
			{ postName }
		</li>
	);
	/* eslint-enable */
};

export default Item;
