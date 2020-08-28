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
	const {
		attributes: {
			fontColor,
			customFontColor,
			backgroundType,
			backgroundColor,
			customBackgroundColor,
			backgroundImageURL,
			backgroundVideoURL,
		},
		className,
	} = props;

	const classes = [ className ],
		styles = {};

	// Add custom color classes.
	classes.push( fontColor || customFontColor ? 'has-text-color' : null );
	classes.push( fontColor ? getColorClassName( 'color', fontColor ) : null );
	classes.push(
		backgroundColor || customBackgroundColor ? 'has-background' : null
	);
	classes.push(
		backgroundColor
			? getColorClassName( 'background-color', backgroundColor )
			: null
	);
	classes.push(
		'color' === backgroundType && backgroundColor ? backgroundColor : null
	);

	// Add custom color styles.
	styles.color = customFontColor ? customFontColor : undefined;
	styles.backgroundColor =
		'color' === backgroundType && backgroundColor
			? backgroundColor
			: undefined;
	styles.backgroundImage =
		'image' === backgroundType && backgroundImageURL
			? `url(${ backgroundImageURL })`
			: undefined;

	return (
		<div
			className={ classes.filter( Boolean ).join( ' ' ) }
			style={ styles }
		>
			{ 'video' === backgroundType && backgroundVideoURL && (
				<video
					autoPlay
					muted
					loop
					aria-hidden="true"
					className="wp-block-cover__video-background"
				>
					<source src={ backgroundVideoURL } />
				</video>
			) }
			<InnerBlocks.Content />
		</div>
	);
}
