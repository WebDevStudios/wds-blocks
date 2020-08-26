import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { getBlockDefaultClassName } from '@wordpress/blocks';
import { PREFIX } from '../../utils/constants';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @author WebDevStudios
 * @since 2.0.0
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @param {Object} [props] Properties passed from the editor.
 * @return {WPElement} Element to render.
 */
export default function Save(props) {
	const {
		attributes: { title, clientId },
	} = props;

	const className = getBlockDefaultClassName('wdsblocks/accordion');

	return (
		<div className={className}>
			<RichText.Content
				tagName="button"
				type="button"
				className={`${className}__title`}
				value={title}
				aria-expanded="false"
				aria-controls={`${PREFIX}-${clientId}`}
			/>
			<div
				className={`${className}__content`}
				aria-hidden="true"
				tabindex="-1"
				id={`${PREFIX}-${clientId}`}
			>
				<div className={`${className}__content--inner`}>
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
