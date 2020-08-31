/**
 * A HOC for displaying a component with a background image.
 *
 * @author WebDevStudios
 * @since  2.0.0
 *
 * @param  {WPElement} WrappedComponent The wrapped component to display.
 * @return {Function}                   A function that accepts a single param, `props`, to display the wrapped component.
 */
export default function withBackgroundImage( WrappedComponent ) {
	/**
	 * @author WebDevStudios
	 * @since  2.0.0
	 *
	 * @param  {Object} [props] Properties passed to the component.
	 * @return {Element}        Element to render.
	 */
	return function ( props ) {
		const { backgroundImage, children, style, ...passthruProps } = props;

		const styles = { ...style };

		// Add background image styles.
		if ( backgroundImage && backgroundImage.hasOwnProperty( 'url' ) ) {
			styles.backgroundImage = `url(${ backgroundImage.url })`;
			styles.backgroundSize = 'cover';
			styles.backgroundPosition = 'center';
		}

		return (
			<WrappedComponent style={ styles } { ...passthruProps }>
				{ children }
			</WrappedComponent>
		);
	};
}
