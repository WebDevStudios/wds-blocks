const Item = ( props ) => {
	const { handleClick, post, postName } = props;
	/* eslint-disable */
	return <li onClick={ () => handleClick( post ) }> { postName } </li>;
}

export default Item;
