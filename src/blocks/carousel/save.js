import { InnerBlocks } from '@wordpress/block-editor';

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
 * @return {WPElement} Element to render.
 */
export default function Save( props ) {
	const { className } = props;

	return (
		<div className={ className }>
			<InnerBlocks.Content />
		</div>
	);
}
