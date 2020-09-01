import { getColorClassName, InnerBlocks } from '@wordpress/block-editor';
import { getBlockDefaultClassName } from '@wordpress/blocks';
import Slide from './Components/Slide';
import { PREFIX } from '../../utils/config';

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

	// Define props relating to slide settings.
	const slideProps = {
		className: classes.filter( Boolean ).join( ' ' ),
		style: styles,
		fontColor,
		customFontColor,
		backgroundType,
		backgroundColor,
		customBackgroundColor,
		backgroundImage,
		backgroundVideo,
	};

	return (
		<Slide { ...slideProps }>
			<InnerBlocks.Content />
		</Slide>
	);
}
