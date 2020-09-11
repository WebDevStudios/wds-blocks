import { getColorClassName } from '@wordpress/block-editor';

/**
 * A HOC for displaying a component with background color.
 *
 * @author WebDevStudios
 * @since  2.0.0
 *
 * @param  {WPElement} WrappedComponent The wrapped component to display.
 * @return {Function}                   A function that accepts a single param, `props`, to display the wrapped component.
 */
export default function withBackgroundColor( WrappedComponent ) {
	/**
	 * @author WebDevStudios
	 * @since  2.0.0
	 *
	 * @param  {Object} [props] Properties passed to the component.
	 * @return {Element}        Element to render.
	 */
	return function ( props ) {
		const {
			backgroundColor,
			customBackgroundColor,
			className,
			style,
			children,
			...passthruProps
		} = props;

		const classes = [ className ],
			styles = { ...style };

		// Add background color classes.
		classes.push(
			backgroundColor || customBackgroundColor ? 'has-background' : null
		);
		classes.push(
			backgroundColor
				? getColorClassName( 'background-color', backgroundColor )
				: null
		);

		// Add custom background color style.
		styles.backgroundColor = customBackgroundColor
			? customBackgroundColor
			: undefined;

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
