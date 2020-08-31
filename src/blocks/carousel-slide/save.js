import { getColorClassName, InnerBlocks } from '@wordpress/block-editor';
import { getBlockDefaultClassName } from '@wordpress/blocks';
import { PREFIX, CONTAINER_CLASS } from '../../utils/config';
import withBackgroundImage from '../../utils/withBackgroundImage';
import withBackgroundVideo from '../../utils/withBackgroundVideo';

/**
 * Display inner blocks content with wrapping container div.
 *
 * @author WebDevStudios
 * @since  2.0.0
 *
 * @return {WPElement} Element to render.
 */
function InnerBlocksContent() {
	return (
		<div className={ CONTAINER_CLASS }>
			<InnerBlocks.Content />
		</div>
	);
}

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
			backgroundImage,
			backgroundVideo,
		},
	} = props;

	const classes = [
			getBlockDefaultClassName( `${ PREFIX }/carousel-slide` ),
		],
		styles = {};

	// Add custom color classes.
	classes.push( fontColor || customFontColor ? 'has-text-color' : null );
	classes.push( fontColor ? getColorClassName( 'color', fontColor ) : null );
	classes.push(
		backgroundColor || customBackgroundColor ? 'has-background' : null
	);
	classes.push(
		'color' === backgroundType && backgroundColor
			? getColorClassName( 'background-color', backgroundColor )
			: null
	);

	// Add custom color styles.
	styles.color = customFontColor ? customFontColor : undefined;
	styles.backgroundColor =
		'color' === backgroundType && customBackgroundColor
			? customBackgroundColor
			: undefined;

	/**
	 * Display inner blocks content with wrapping container div.
	 *
	 * @author WebDevStudios
	 * @since  2.0.0
	 *
	 * @return {WPElement} Element to render.
	 */
	const BlockContent = () => {
		const wrapProps = {
			className: classes.filter( Boolean ).join( ' ' ),
			style: { ...styles },
		};

		switch ( backgroundType ) {
			case 'video':
				const BlockWithBackgroundVideo = withBackgroundVideo( 'div' );

				return (
					<BlockWithBackgroundVideo
						backgroundVideo={ backgroundVideo }
						{ ...wrapProps }
					>
						<InnerBlocksContent />
					</BlockWithBackgroundVideo>
				);

			case 'image':
				const BlockWithBackgroundImage = withBackgroundImage( 'div' );

				return (
					<BlockWithBackgroundImage
						backgroundImage={ backgroundImage }
						{ ...wrapProps }
					>
						<InnerBlocksContent />
					</BlockWithBackgroundImage>
				);
		}

		return (
			<div { ...wrapProps }>
				<InnerBlocksContent />
			</div>
		);
	};

	return <BlockContent />;
}
