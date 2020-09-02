import { getColorClassName } from '@wordpress/block-editor';

/**
 * A HOC for displaying a component with font color.
 *
 * @author WebDevStudios
 * @since  2.0.0
 *
 * @param  {WPElement} WrappedComponent The wrapped component to display.
 * @return {Function}                   A function that accepts a single param, `props`, to display the wrapped component.
 */
export default function withFontColor( WrappedComponent ) {
	/**
	 * @author WebDevStudios
	 * @since  2.0.0
	 *
	 * @param  {Object} [props] Properties passed to the component.
	 * @return {Element}        Element to render.
	 */
	return function ( props ) {
		const {
			fontColor,
			customFontColor,
			className,
			style,
			children,
			...passthruProps
		} = props;

		const classes = [ className ],
			styles = { ...style };

		// Add color classes.
		classes.push( fontColor || customFontColor ? 'has-text-color' : null );
		classes.push(
			fontColor ? getColorClassName( 'color', fontColor ) : null
		);

		// Add custom color style.
		styles.color = customFontColor ? customFontColor : undefined;

		return (
			<WrappedComponent
				className={ classes.filter( Boolean ).join( ' ' ) }
				style={ styles }
				{ ...passthruProps }
			>
				{ children }
			</WrappedComponent>
		);
	};
}
