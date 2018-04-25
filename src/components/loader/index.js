const Loader = ( props ) => {
	const defaultLoader = window.origin + '/wp-includes/images/spinner-2x.gif';

	const className = props.className ?
		props.className :
		'wp-block-loader';

	const loader = props.loader ?
		props.loader :
		defaultLoader;

	const width = props.width ?
		props.width :
		'25';

	const height = props.width ?
		props.height :
		'25';

	return [
		<div key="" className={ className }>
			<img src={ loader } alt="loading" width={ width } height={ height } />
		</div>,
	];
};

export default Loader;
