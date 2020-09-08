import { InnerBlocks } from '@wordpress/block-editor';
import { getBlockDefaultClassName } from '@wordpress/blocks';
import Slide from './components/Slide';
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
	const { attributes } = props;

	// Define props relating to slide settings.
	const slideProps = {
		...attributes,
		className: `${ getBlockDefaultClassName(
			`${ PREFIX }/carousel-slide`
		) } glide__slide`,
	};

	return (
		<Slide { ...slideProps }>
			<div className="slide-content">
				<InnerBlocks.Content />
			</div>
		</Slide>
	);
}
