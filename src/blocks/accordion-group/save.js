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
		attributes: { title, desc, bkgColor },
	} = props;

	const className = getBlockDefaultClassName('wdsblocks/accordion-group');
	console.log(className);

	return (
		<div className={className} style={{ backgroundColor: bkgColor }}>
			<div className="wrap">
				<RichText.Content
					tagName="h2"
					className={`${className}__title`}
					value={title}
				/>
				<RichText.Content
					tagName="p"
					className={`${className}__desc`}
					value={desc}
				/>
				<div className={`${className}__content`}>
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
