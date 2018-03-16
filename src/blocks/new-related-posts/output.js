const { Component } = wp.element;

import Item from './item';

class Output extends Component {
	render() {
		const {
			className,
			handleEvent,
			posts,
			title,
		} = this.props;

		return (
			<div className={ className }>
				<h3 key="">{ title }</h3>
				<ul>
					{ posts.map( ( result, index ) => (
						<Item
							key={ `${ result.id }-${ index }` }
							postName={ result.title.rendered }
							post={ result }
							handleClick={ handleEvent }
						/>
					) ) }
				</ul>
			</div>
		);
	}
}

export default Output;
