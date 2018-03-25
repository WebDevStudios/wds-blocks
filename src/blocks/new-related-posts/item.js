const Item = ( props ) => {
	const { handleClick, post, postName, isActive } = props;

	function className() {
		// If current post is in selectedPosts.
		if ( post && undefined !== isActive ) {
			if ( isActive.indexOf( post ) > -1 ) {
				return post.slug + ' is-selected';
			}
			return post.slug;
		}
	}

	/* eslint-disable */
	return <li className={ className() } onClick={ ( ( e ) => handleClick( { e, post } ) ) }> { postName } </li>;
}

export default Item;
