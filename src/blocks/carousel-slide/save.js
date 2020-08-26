import { getColorClassName, InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @author WebDevStudios
 * @since  2.0.0
 * @see    https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @param  {Object} [props] Properties passed from the editor.
 * @return {WPElement}      Element to render.
 */
export default function Save( props ) {
	const { attributes: { fontColor, customFontColor }, className } = props;

	const classes = [ className ],
		styles = {};

	// Add custom color classes.
	classes.push( fontColor || customFontColor ? 'has-text-color' : null );
	classes.push( fontColor ? getColorClassName( 'color', fontColor ) : null );

	// Add custom color styles.
	styles.color = customFontColor ? customFontColor : undefined;

	return (
		<div className={ classes.filter( Boolean ).join( ' ' ) } style={ styles }>
			<InnerBlocks.Content />
		</div>
	);
}
