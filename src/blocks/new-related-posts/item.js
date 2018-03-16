const { Component } = wp.element;

class Item extends Component {
	render() {
		const { handleClick, post, postName } = this.props;
		/* eslint-disable */
		return <li onClick={ () => handleClick( post ) }> { postName } </li>;
	}
}

export default Item;
