import Item from './item';

const Output = ( props ) => {
	const {
		className,
		handleEvent,
		posts,
		title,
	} = props;

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
};

export default Output;
