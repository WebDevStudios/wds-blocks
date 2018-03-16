const { Component } = wp.element;

class Loader extends Component {
	render() {
		const defaultLoader = window.origin + '/wp-includes/images/spinner-2x.gif';

		const className = this.props.className ?
			this.props.className :
			'wp-block-loader';

		const loader = this.props.loader ?
			this.props.loader :
			defaultLoader;

		const width = this.props.width ?
			this.props.width :
			'25';

		const height = this.props.width ?
			this.props.height :
			'25';

		return [
			<div key="" className={ className }>
				<img src={ loader } alt="loading" width={ width } height={ height } />
			</div>,
		];
	}
}

export default Loader;
