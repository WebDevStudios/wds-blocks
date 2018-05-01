import Item from './item';

const Output = ( props ) => {
	const {
		activeClass,
		className,
		handleEvent,
		posts,
		title,
		textRef,
	} = props;

	return (
		<div className={ className } tabIndex="0">
			<h3 key="">{ title }</h3>
			<ul ref={ textRef } className={ `${ className }-container` }>
				{ posts.map( ( result, index ) => (
					<Item
						isActive={ activeClass }
						key={ `${ result.id }-${ index }` }
						postName={ result.name ? result.name : result.title.rendered }
						post={ result }
						handleClick={ handleEvent }
					/>
				) ) }
			</ul>
		</div>
	);
};

export default Output;
