import Item from './item';

const { Component } = wp.element;

class Output extends Component {
	constructor( props ) {
		super( ...props );
	}

	render() {
		const {
			activeClass,
			className,
			handleEvent,
			posts,
			title,
			textRef,
		} = this.props;

		return (
			<div className={ className } tabIndex="0">
				<h3 key="">{ title }</h3>
				<ul ref={ textRef }>
					{ posts.map( ( result, index ) => (
						<Item
							isActive={ activeClass }
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
