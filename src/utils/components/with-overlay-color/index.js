import withBackgroundColor from '../with-background-color';

/**
 * A HOC for displaying a component with a background overlay color.
 *
 * @author WebDevStudios
 * @since  2.1.0
 * @param {WPElement} WrappedComponent The wrapped component to display.
 * @return {Function}                   A function that accepts a single param, `props`, to display the wrapped component.
 */
export default function withOverlayColor( WrappedComponent ) {
	/**
	 * @author WebDevStudios
	 * @since  2.0.0
	 * @param {Object} [props] Properties passed to the component.
	 * @return {Element}        Element to render.
	 */
	return function ( props ) {
		const {
			overlayColor,
			customOverlayColor,
			overlayOpacity,
			className,
			style,
			children,
			...passthruProps
		} = props;

		const classes = [ className ],
			styles = { ...style };

		const hasOverlay = overlayColor || customOverlayColor;

		// Add overlay class.
		classes.push( hasOverlay ? 'has-background-overlay' : null );

		// Use withBackgroundColor component to handle shared styling/classes.
		const OverlayComponent = withBackgroundColor( WrappedComponent ); // eslint-disable-line @wordpress/no-unused-vars-before-return

		return (
			<OverlayComponent
				className={ classes.filter( Boolean ).join( ' ' ) }
				style={ styles }
				{ ...passthruProps }
				backgroundColor={ overlayColor }
				customBackgroundColor={ customOverlayColor }
			>
				{ hasOverlay && !! overlayOpacity && (
					<div
						className="background-overlay"
						style={ {
							opacity: overlayOpacity / 100,
							backgroundColor: 'inherit',
							height: '100%',
							left: 0,
							position: 'absolute',
							top: 0,
							width: '100%',
							zIndex: 1,
						} }
					></div>
				) }
				{ children }
			</OverlayComponent>
		);
	};
}
